"use client";

import { FormEvent, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      const { error } = await createSupabaseBrowserClient().auth.signInWithPassword({ email, password });
      if (error) throw error;
      window.location.href = "/account";
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to sign in.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="tool-page">
      <section className="auth-card">
        <a className="brand" href="/"><img src="/run-logo.jpg" width="44" height="44" alt="RunAudit" /><span>RunAudit</span></a>
        <p className="eyebrow">CUSTOMER ACCESS</p>
        <h1>Sign in to RunAudit</h1>
        <form onSubmit={submit}>
          <label>Email address<input type="email" required autoComplete="email" value={email} onChange={event => setEmail(event.target.value)} /></label>
          <label>Password<input type="password" required autoComplete="current-password" value={password} onChange={event => setPassword(event.target.value)} /></label>
          <button className="button button-primary" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button>
        </form>
        {message && <p role="alert" className="auth-message">{message}</p>}
        <p>New to RunAudit? <a href="/auth/signup">Start your 14-day free trial</a></p>
      </section>
    </main>
  );
}
