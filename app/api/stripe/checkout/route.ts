import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getWorkflow, type BillingInterval } from "@/lib/catalog";

export async function POST(request: Request) {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return NextResponse.json({ error: "Please sign in before starting your trial." }, { status: 401 });

    const secret = process.env.STRIPE_SECRET_KEY;
    const site = process.env.NEXT_PUBLIC_SITE_URL;
    if (!secret || !site) return NextResponse.json({ error: "Trial checkout is not configured yet. Please contact RunAudit." }, { status: 503 });

    const body = await request.json();
    const ids: string[] = Array.isArray(body.workflowIds)
      ? body.workflowIds.filter((id: unknown): id is string => typeof id === "string")
      : [];
    const interval = body.interval as BillingInterval;
    if (!ids.length || ids.length > 15 || !["month", "year"].includes(interval)) {
      return NextResponse.json({ error: "Choose at least one valid workflow and a billing interval." }, { status: 400 });
    }

    const workflows = [...new Set(ids)].map(getWorkflow);
    if (workflows.some(workflow => !workflow)) {
      return NextResponse.json({ error: "One or more selected workflows are invalid." }, { status: 400 });
    }

    const stripe = new Stripe(secret);
    const { data: existing, error: subscriptionError } = await supabase
      .from("subscriptions")
      .select("stripe_customer_id,status")
      .eq("user_id", user.id)
      .maybeSingle();
    if (subscriptionError) throw new Error("RunAudit billing database is not ready. Please apply the Supabase migration before starting a trial.");
    if (existing?.status === "trialing" || existing?.status === "active") {
      return NextResponse.json({ error: "Your account already has a trial or active subscription. Open My Account to manage it." }, { status: 409 });
    }

    const line_items = workflows.map(workflow => ({
      quantity: 1,
      price_data: {
        currency: "usd",
        unit_amount: workflow!.monthlyUsd * 100 * (interval === "year" ? 12 : 1),
        product_data: { name: workflow!.name, metadata: { workflow_id: workflow!.id } },
        recurring: { interval }
      }
    }));

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items,
      customer: existing?.stripe_customer_id || undefined,
      customer_email: existing?.stripe_customer_id ? undefined : user.email || undefined,
      payment_method_collection: "if_required",
      allow_promotion_codes: true,
      subscription_data: {
        trial_period_days: 14,
        trial_settings: { end_behavior: { missing_payment_method: "cancel" } },
        metadata: {
          supabase_user_id: user.id,
          workflow_ids: workflows.map(workflow => workflow!.id).join(","),
          billing_interval: interval
        }
      },
      metadata: { supabase_user_id: user.id, workflow_ids: workflows.map(workflow => workflow!.id).join(","), billing_interval: interval },
      success_url: `${site}/account?checkout=success`,
      cancel_url: `${site}/checkout?checkout=cancelled`
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("RunAudit trial checkout error", error);
    return NextResponse.json({ error: "Unable to create secure trial checkout. Please try again or contact RunAudit." }, { status: 500 });
  }
}
