import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function POST(request:Request){
 const secret=process.env.STRIPE_SECRET_KEY;const webhookSecret=process.env.STRIPE_WEBHOOK_SECRET;
 if(!secret||!webhookSecret)return NextResponse.json({error:"Stripe webhook is not configured."},{status:503});
 const signature=request.headers.get("stripe-signature");if(!signature)return NextResponse.json({error:"Missing Stripe signature."},{status:400});
 const stripe=new Stripe(secret);const raw=await request.text();let event:Stripe.Event;
 try{event=stripe.webhooks.constructEvent(raw,signature,webhookSecret);}catch{return NextResponse.json({error:"Invalid webhook signature."},{status:400});}
 const admin=createSupabaseAdminClient();
 const {data:seen}=await admin.from("stripe_webhook_events").select("event_id").eq("event_id",event.id).maybeSingle();
 if(seen)return NextResponse.json({received:true,duplicate:true});
 try{
  let subscription:Stripe.Subscription|undefined;
  if(event.type==="checkout.session.completed"){
   const session=event.data.object as Stripe.Checkout.Session;
   if(typeof session.subscription==="string")subscription=await stripe.subscriptions.retrieve(session.subscription);
  }else if(event.type==="customer.subscription.created"||event.type==="customer.subscription.updated"||event.type==="customer.subscription.deleted"){
   subscription=event.data.object as Stripe.Subscription;
  }
  if(subscription){
   const userId=subscription.metadata.supabase_user_id;
   if(!userId)return NextResponse.json({error:"Subscription is missing account metadata."},{status:400});
   const workflowIds=(subscription.metadata.workflow_ids||"").split(",").filter(Boolean);
   const customerId=typeof subscription.customer==="string"?subscription.customer:subscription.customer.id;
   const item=subscription.items.data[0];const price=item?.price;
   const {error}=await admin.from("subscriptions").upsert({
    user_id:userId,stripe_customer_id:customerId,stripe_subscription_id:subscription.id,status:subscription.status,
    billing_interval:subscription.metadata.billing_interval||price?.recurring?.interval||"month",
    workflow_ids:workflowIds,currency:price?.currency||"usd",amount_total:price?.unit_amount??null,
    trial_start:subscription.trial_start?new Date(subscription.trial_start*1000).toISOString():null,
    trial_end:subscription.trial_end?new Date(subscription.trial_end*1000).toISOString():null,
    current_period_end:item?.current_period_end?new Date(item.current_period_end*1000).toISOString():null,
    cancel_at_period_end:subscription.cancel_at_period_end,updated_at:new Date().toISOString()
   },{onConflict:"user_id"});
   if(error)throw error;
  }
  const {error:logError}=await admin.from("stripe_webhook_events").insert({event_id:event.id,event_type:event.type});
  if(logError&&logError.code!=="23505")throw logError;
  return NextResponse.json({received:true});
 }catch(error){console.error("Stripe webhook processing failed",error);return NextResponse.json({error:"Webhook processing failed; Stripe may retry."},{status:500});}
}
