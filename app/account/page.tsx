import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
export default async function AccountPage() {
 const supabase=await createSupabaseServerClient();const {data:{user}}=await supabase.auth.getUser();if(!user)redirect("/auth/login");
 const {data:subscription}=await supabase.from("subscriptions").select("status,trial_end,current_period_end,workflow_ids,billing_interval").eq("user_id",user.id).maybeSingle();
 return <main className="tool-page"><section className="auth-card account-card"><a className="brand" href="/"><img src="/run-logo.jpg" width="44" height="44" alt="Runaudit"/><span>Runaudit</span></a><p className="eyebrow">YOUR ACCOUNT</p><h1>Welcome to Runaudit</h1><p>{user.email}</p><h2>Trial and subscription</h2>{subscription?<><p>Status: <strong>{subscription.status}</strong></p>{subscription.trial_end&&<p>Trial ends: {new Date(subscription.trial_end).toLocaleDateString()}</p>}<p>Selected workflows: {subscription.workflow_ids?.length??0}</p></>:<p>Your 14-day trial is ready to configure. Choose the workflows you want to evaluate.</p>}<Link className="button button-primary" href="/checkout">Choose workflows and billing</Link><form action="/auth/signout" method="post"><button className="button button-secondary">Sign out</button></form></section></main>;
}
