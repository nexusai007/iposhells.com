# Runaudit Supabase + Stripe test setup

## 1. Create Supabase project
Create a new project in the Supabase dashboard. In Project Settings → API, copy the Project URL and anon/public key. Keep the service_role key private.

## 2. Apply database migration
In Supabase → SQL Editor, run the contents of `supabase/migrations/202611270001_initial_billing.sql`.

The migration creates a user-owned subscriptions table with row-level security and a service-role-only Stripe webhook event ledger. Do not disable RLS.

## 3. Configure local/Vercel environment
Copy `.env.example` values into local environment variables and Vercel Project Settings → Environment Variables. Use Stripe TEST keys only:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY (server only; never prefix NEXT_PUBLIC)
- STRIPE_SECRET_KEY (test secret; server only)
- STRIPE_WEBHOOK_SECRET (test webhook signing secret; server only)
- NEXT_PUBLIC_SITE_URL

Do not commit actual credentials.

## 4. Configure Supabase Auth
In Authentication → URL Configuration, set Site URL to the verified preview URL during testing and add redirect URLs:
- http://localhost:3000/auth/callback
- https://YOUR-VERCEL-PREVIEW-DOMAIN/auth/callback
- https://runaudit.io/auth/callback (only after domain is verified)

Enable email confirmation. Configure SMTP before public launch so confirmation messages reliably arrive.

## 5. Configure Stripe TEST mode
Use Stripe test mode. Create a webhook endpoint:
`https://YOUR-VERCEL-PREVIEW-DOMAIN/api/stripe/webhook`
Subscribe to:
- checkout.session.completed
- customer.subscription.created
- customer.subscription.updated
- customer.subscription.deleted

Copy the endpoint signing secret to STRIPE_WEBHOOK_SECRET. Enable the Customer Portal in Stripe test mode and configure allowed customer self-service actions.

The checkout API creates Stripe Price Data from the server-side workflow catalogue; browser-supplied amounts are never trusted. Annual pricing is 12 × monthly with no unapproved discount. A 14-day trial is created in Stripe with no card required initially; missing payment method at trial end is configured to cancel.

## 6. Test checklist
- Sign up with a test email and confirm the email.
- Sign in, choose one or more workflows, select monthly or annual, and complete Stripe test checkout.
- Verify a trialing subscription row appears for that authenticated user.
- Verify webhook retries are idempotently acknowledged.
- Verify users can read only their own subscription row.
- Open the Stripe customer portal and test cancellation/payment method changes.
- Test missing payment method at trial end in Stripe test clocks or a controlled test subscription.
- Do not switch to live keys or deploy public billing until all checks pass.

## Important limitations
This repository implements the integration foundation. A Supabase project, environment variables, email delivery, Stripe webhook endpoint, and preview deployment still must be configured by the account owner. No production billing is enabled by this code alone.
