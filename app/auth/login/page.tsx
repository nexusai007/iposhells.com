"use client";
import { FormEvent, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
export default function LoginPage() {
 const [email,setEmail]=useState("");const [password,setPassword]=useState("");const [message,setMessage]=useState("");const [busy,setBusy]=useState(false);
 async function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();setBusy(true);setMessage("");try{const {error}=await createSupabaseBrowserClient().auth.signInWithPassword({email,password});if(error)throw error;window.location.href="/account";}catch(err){setMessage(err instanceof Error?err.message:"Unable to sign in.");}finally{setBusy(false);}}
 return <main className="tool-page"><section className="auth-card"><a className="brand" href="/"><img src="/run-logo.jpg" width="44" height="44" alt="Runaudit"/><span>Runaudit</span></a><p className="eyebrow">CUSTOMER ACCESS</p><h1>Sign in to Runaudit</h1><form onSubmit={submit}><label>Email address<input type="email" required autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)}/></label><label>Password<input type="password" required autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)}/></label><button className="button button-primary" disabled={busy}>{busy?"Signing in…":"Sign in"}</button></form>{message&&<p role="alert" className="auth-message">{message}</p>}<p>New here? <a href="/auth/signup">Start your free trial</a></p></section></main>;
}
