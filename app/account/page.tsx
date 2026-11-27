"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

type Subscription = {
  status: string;
  trial_end: string | null;
  current_period_end: string | null;
  workflow_ids: string[];
  billing_interval: string | null;
  stripe_customer_id: string | null;
};

export default function AccountPage() {
  const [email, setEmail] = useState("");
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    async function loadAccount() {
      try {
        const supabase = createSupabaseBrowserClient();
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError) throw userError;
        if (!user) {
          window.location.href = "/auth/login";
          return;
        }
        setEmail(user.email ?? "");
        const { data, error } = await supabase
          .from("subscriptions")
          .select("status,trial_end,current_period_end,workflow_ids,billing_interval,stripe_customer_id")
          .eq("user_id", user.id)
          .maybeSingle();
        if (error && error.code !== "42P01") throw error;
        if (active) setSubscription(data as Subscription | null);
      } catch (error) {
        if (active) setMessage(error instanceof Error ? error.message : "Unable to load your account.");
      }
    }
    void loadAccount();
    return () => { active = false; };
  }, []);

  async function openBillingPortal() {
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch("/api/stripe/portal", { method: "POST" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to open billing settings.");
      if (!data.url) throw new Error("The billing portal did not return a link.");
      window.location.href = data.url;
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to open billing settings.");
      setBusy(false);
    }
  }

  async function signOut() {
    await createSupabaseBrowserClient().auth.signOut();
    window.location.href = "/";
  }

  const trialDate = subscription?.trial_end ? new Date(subscription.trial_end).toLocaleDateString() : null;

  return (
    <main className="tool-page">
      <section className="auth-card account-card">
        <a className="brand" href="/"><img src="/run-logo.jpg" width="44" height="44" alt="RunAudit" /><span>RunAudit</span></a>
        <p className="eyebrow">YOUR RUNAUDIT ACCOUNT</p>
        <h1>Welcome to RunAudit</h1>
        <p>{email}</p>
        <h2>Your trial and subscription</h2>
        {subscription ? (
          <>
            <p>Account status: <strong>{subscription.status}</strong></p>
            {trialDate && <p>Your trial is scheduled to end: <strong>{trialDate}</strong></p>}
            <p>Billing interval: {subscription.billing_interval === "year" ? "Annual" : "Monthly"}</p>
            <p>Selected workflows: {subscription.workflow_ids?.length ?? 0}</p>
            {subscription.stripe_customer_id && <button className="button button-primary" disabled={busy} onClick={openBillingPortal}>{busy ? "Opening billing settings…" : "Manage billing and payment method"}</button>}
          </>
        ) : (
          <>
            <p>Your account is ready. Choose the workflows you want to evaluate to begin your 14-day free trial. No payment is due today.</p>
            <a className="button button-primary" href="/checkout">Choose workflows and start my trial</a>
          </>
        )}
        {message && <p role="alert" className="auth-message">{message}</p>}
        <button className="button button-secondary" onClick={signOut}>Sign out</button>
      </section>
    </main>
  );
}
