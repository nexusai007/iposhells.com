"use client";

import { FormEvent, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/auth/callback?next=/account` }
      });
      if (error) throw error;
      setMessage("Check your email and confirm your address. Then sign in to choose your workflows and activate your 14-day trial.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to create your account.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="tool-page">
      <section className="auth-card">
        <a className="brand" href="/"><img src="/run-logo.jpg" width="44" height="44" alt="RunAudit" /><span>RunAudit</span></a>
        <p className="eyebrow">14-DAY FREE TRIAL · $0 TO START</p>
        <h1>Create your account</h1>
        <p>Create your account free. No credit card is required to register. After confirming your email, choose the workflows you want to try.</p>
        <form onSubmit={submit}>
          <label>Email address<input type="email" required autoComplete="email" value={email} onChange={event => setEmail(event.target.value)} /></label>
          <label>Password<input type="password" required minLength={10} autoComplete="new-password" value={password} onChange={event => setPassword(event.target.value)} /><small>Use at least 10 characters.</small></label>
          <button className="button button-primary" disabled={busy}>{busy ? "Creating account…" : "Create my free account"}</button>
        </form>
        {message && <p role="status" className="auth-message">{message}</p>}
        <p>Already registered? <a href="/auth/login">Sign in</a></p>
        <p><a href="/">Return to RunAudit</a></p>
      </section>
    </main>
  );
}
