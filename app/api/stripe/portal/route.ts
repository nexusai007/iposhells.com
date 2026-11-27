import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST() {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Please sign in first." }, { status: 401 });

    const { data, error } = await supabase.from("subscriptions")
      .select("stripe_customer_id")
      .eq("user_id", user.id)
      .maybeSingle();
    if (error) throw error;
    if (!data?.stripe_customer_id) return NextResponse.json({ error: "No billing profile is linked to this account yet." }, { status: 404 });

    const secret = process.env.STRIPE_SECRET_KEY;
    const site = process.env.NEXT_PUBLIC_SITE_URL;
    if (!secret || !site) return NextResponse.json({ error: "Billing settings are not configured." }, { status: 503 });

    const stripe = new Stripe(secret);
    const session = await stripe.billingPortal.sessions.create({
      customer: data.stripe_customer_id,
      return_url: `${site}/account`
    });
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("RunAudit billing portal error", error);
    return NextResponse.json({ error: "Unable to open billing settings." }, { status: 500 });
  }
}
