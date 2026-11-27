"use client";

import { useState } from "react";
import { WORKFLOWS, type BillingInterval } from "@/lib/catalog";

export default function CheckoutPage() {
  const [selected, setSelected] = useState<string[]>(["audit-log-aggregation", "compliance-report-generation"]);
  const [interval, setInterval] = useState<BillingInterval>("month");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const total = WORKFLOWS.filter(workflow => selected.includes(workflow.id))
    .reduce((sum, workflow) => sum + workflow.monthlyUsd, 0);

  async function startTrial() {
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workflowIds: selected, interval })
      });
      const data = await response.json();
      if (!response.ok) {
        if (response.status === 401) throw new Error("Please sign in first. Your account is not lost—sign in and return here to continue.");
        throw new Error(data.error || "Unable to start checkout.");
      }
      if (!data.url) throw new Error("Secure checkout did not return a link.");
      window.location.href = data.url;
    } catch (error) {
      setError(error instanceof Error ? error.message : "Checkout could not be started.");
      setBusy(false);
    }
  }

  return (
    <main className="tool-page">
      <header className="tool-header">
        <a className="brand" href="/"><img src="/run-logo.jpg" alt="RunAudit" width="44" height="44" /><span>RunAudit</span></a>
        <nav><a href="/account">My account</a><a href="/pricing">Pricing</a></nav>
      </header>
      <section className="tool-intro">
        <p className="eyebrow">YOUR 14-DAY RUNAUDIT TRIAL</p>
        <h1>Choose the workflows you want to evaluate.</h1>
        <p>Select one or more workflows. Prices are shown in USD. Your first 14 days are free; no payment is due today and no card is required to begin the trial.</p>
      </section>
      <section className="checkout-layout">
        <div className="checkout-list">
          {WORKFLOWS.map(workflow => (
            <label className="workflow-option" key={workflow.id}>
              <input
                type="checkbox"
                checked={selected.includes(workflow.id)}
                onChange={event => setSelected(current => event.target.checked
                  ? [...current, workflow.id]
                  : current.filter(id => id !== workflow.id))}
              />
              <span><strong>{workflow.name}</strong><small>${workflow.monthlyUsd} USD per workflow / month after trial</small></span>
            </label>
          ))}
        </div>
        <aside className="results-card">
          <p className="eyebrow">YOUR TRIAL SELECTION</p>
          <label className="billing-choice">Billing interval
            <select value={interval} onChange={event => setInterval(event.target.value as BillingInterval)}>
              <option value="month">Monthly</option>
              <option value="year">Annual (12 × monthly price)</option>
            </select>
          </label>
          <div className="result-line"><span>Workflows selected</span><strong>{selected.length}</strong></div>
          <div className="result-line"><span>Price after trial</span><strong>${total.toLocaleString("en-US")} / {interval === "month" ? "month" : "year"}</strong></div>
          <div className="result-line result-highlight"><span>Due today</span><strong>$0 for 14 days</strong></div>
          <p className="fine-print">After the 14-day trial, the selected plan renews at the displayed interval and price only if you add a payment method and continue. If no payment method is added before the trial ends, the subscription is configured to cancel. Applicable taxes may be added by Stripe.</p>
          <button className="button button-primary" disabled={busy || selected.length === 0} onClick={startTrial}>{busy ? "Opening secure checkout…" : "Start my 14-day free trial"}</button>
          {error && <p role="alert" className="auth-message">{error} <a href="/auth/login">Sign in</a></p>}
          <p className="fine-print">Secure checkout is provided by Stripe. Your account is managed through RunAudit.</p>
        </aside>
      </section>
    </main>
  );
}
