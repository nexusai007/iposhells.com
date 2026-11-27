create extension if not exists pgcrypto;

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade unique,
  stripe_customer_id text unique,
  stripe_subscription_id text unique,
  status text not null default 'trialing' check (status in ('incomplete','incomplete_expired','trialing','active','past_due','canceled','unpaid','paused')),
  billing_interval text check (billing_interval in ('month','year')),
  workflow_ids text[] not null default '{}',
  currency text not null default 'usd',
  amount_total integer,
  trial_start timestamptz,
  trial_end timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.subscriptions enable row level security;
create policy "Users can read their own subscription"
  on public.subscriptions for select
  using (auth.uid() = user_id);

create table if not exists public.stripe_webhook_events (
  event_id text primary key,
  event_type text not null,
  processed_at timestamptz not null default now()
);
alter table public.stripe_webhook_events enable row level security;
revoke all on public.stripe_webhook_events from anon, authenticated;
grant all on public.stripe_webhook_events to service_role;

create index if not exists subscriptions_stripe_customer_idx on public.subscriptions(stripe_customer_id);
create index if not exists subscriptions_status_idx on public.subscriptions(status);
