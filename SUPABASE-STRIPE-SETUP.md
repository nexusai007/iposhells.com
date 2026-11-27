# RunAudit 14-day trial setup

This release adds email/password accounts, a 14-day Stripe subscription trial, account status, and a Stripe billing portal. It starts in Stripe test mode. Do not enable live payments until the complete test checklist passes.

## 1. Supabase project
Create or select the Supabase project intended for RunAudit. In Project Settings → API, copy the Project URL and anon/public key. Keep the service_role key private.

## 2. Apply the database migration
In Supabase → SQL Editor, run `supabase/migrations/202611270001_initial_billing.sql`.

The migration creates a subscriptions table with row-level security so each signed-in customer can read only their own record. Webhook event records are service-role only.

## 3. Supabase authentication
In Authentication → URL Configuration:
- Set Site URL to `https://runaudit.io` after the domain is verified.
- Add `https://runaudit.io/auth/callback` to allowed redirect URLs.
- Add the exact Vercel preview URL plus `/auth/callback` while testing.
- Enable email confirmation.
- Configure reliable SMTP before public launch.

## 4. Vercel environment variables
In Vercel → RunAudit project → Settings → Environment Variables, add these values for Preview and Production as appropriate:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server only)
- `STRIPE_SECRET_KEY` (Stripe test secret initially)
- `STRIPE_WEBHOOK_SECRET` (test webhook signing secret)
- `NEXT_PUBLIC_SITE_URL` (exact preview or production URL)

Never put secret keys in GitHub, browser code, or variables prefixed with `NEXT_PUBLIC_`.

## 5. Stripe test-mode configuration
Use Stripe TEST mode only:
- Add a webhook endpoint at `https://YOUR-VERCEL-PREVIEW-DOMAIN/api/stripe/webhook`.
- Subscribe to `checkout.session.completed`, `customer.subscription.created`, `customer.subscription.updated`, and `customer.subscription.deleted`.
- Put the endpoint signing secret in `STRIPE_WEBHOOK_SECRET`.
- Enable and configure the Stripe Customer Portal so customers can add a payment method and manage/cancel their subscription.

The checkout creates a 14-day subscription trial. No card is required to begin. At trial end, Stripe is configured to cancel if the customer has not added a payment method. If the customer adds a payment method and continues, the selected workflows renew at the price and interval shown before checkout.

## 6. End-to-end test checklist
- Create a test customer account and confirm the email.
- Sign in and select one or more workflows.
- Complete Stripe test checkout and confirm the trial is visible in the Stripe dashboard.
- Confirm the webhook creates/updates only the matching customer's subscription row.
- Verify a customer cannot read another customer's subscription row.
- Open the billing portal and test adding a payment method and cancellation.
- Verify a trial without a payment method cancels at the end of the trial.
- Check mobile layout, confirmation emails, and password handling.
- Keep Stripe in test mode until all checks pass and production launch is explicitly approved.

## Launch requirements
A code deployment alone does not activate signup. The owner must connect the correct Supabase project, set the six environment variables in Vercel, apply the migration, configure email delivery, and register the Stripe webhook. No credentials are stored in this repository.
