"use client";

import React, { useMemo, useState } from "react";
import Head from "next/head";

type Category = "All" | "Outbound" | "Research" | "Operations" | "Data" | "Compliance";

interface WorkflowItem {
  id: string;
  category: Exclude<Category, "All">;
  name: string;
  description: string;
  integrations: string;
  output: string;
  priceMonthly: number;
}

const WORKFLOWS: WorkflowItem[] = [
  {
    id: "outbound-engine",
    category: "Outbound",
    name: "Autonomous Outbound Engine",
    description: "Identify, enrich, and route validated opportunities into your CRM.",
    integrations: "Salesforce, HubSpot",
    output: "Enriched lead (company, contact, score, source)",
    priceMonthly: 149,
  },
  {
    id: "abm-pipeline",
    category: "Outbound",
    name: "Account-Based Outreach Pipeline",
    description: "Coordinate account-level research and outreach steps with full logging.",
    integrations: "Salesforce, HubSpot, Slack",
    output: "Account plan (stakeholders, signals, next action)",
    priceMonthly: 129,
  },
  {
    id: "lead-enrichment",
    category: "Outbound",
    name: "Lead Enrichment & Scoring",
    description: "Enrich inbound records and score them before they reach your team.",
    integrations: "HubSpot, Salesforce",
    output: "Scored lead (score, fit signals, source)",
    priceMonthly: 79,
  },
  {
    id: "market-signals",
    category: "Research",
    name: "Market Signal Monitoring",
    description: "Continuous monitoring of markets and accounts, structured into datasets.",
    integrations: "Google Workspace, Cloud Storage",
    output: "Signal feed (source, topic, timestamp, summary)",
    priceMonthly: 99,
  },
  {
    id: "account-intelligence",
    category: "Research",
    name: "Account Intelligence Pipeline",
    description: "Deliver structured account research directly to analytics or CRM.",
    integrations: "Salesforce, Cloud Storage",
    output: "Research summary (text) + structured fields",
    priceMonthly: 109,
  },
  {
    id: "competitor-tracker",
    category: "Research",
    name: "Competitive Landscape Tracker",
    description: "Track competitor changes and publish structured updates.",
    integrations: "Slack, Google Workspace",
    output: "Competitor change log (entity, change, source)",
    priceMonthly: 89,
  },
  {
    id: "ticket-triage",
    category: "Operations",
    name: "Ticket Triage & Routing",
    description: "Classify incoming tickets and route them to the right owner.",
    integrations: "Slack, Email, Custom APIs",
    output: "Routed ticket (category, priority, owner)",
    priceMonthly: 69,
  },
  {
    id: "sla-monitoring",
    category: "Operations",
    name: "SLA Monitoring & Alerts",
    description: "Watch SLA clocks and alert owners before breaches occur.",
    integrations: "Slack, Email",
    output: "SLA alert (ticket, clock, breach risk)",
    priceMonthly: 59,
  },
  {
    id: "status-broadcasting",
    category: "Operations",
    name: "Operational Status Broadcasting",
    description: "Publish operational status updates to the channels that need them.",
    integrations: "Slack, Email",
    output: "Status update (system, state, audience)",
    priceMonthly: 49,
  },
  {
    id: "data-validation",
    category: "Data",
    name: "Data Validation & Cleansing",
    description: "Validate critical data before it hits downstream systems.",
    integrations: "Salesforce, Custom APIs, Cloud Storage",
    output: "Validation report (record_id, status, error)",
    priceMonthly: 79,
  },
  {
    id: "multi-system-sync",
    category: "Data",
    name: "Multi-System Sync",
    description: "Route and synchronize data between CRM, ERP, analytics, and storage.",
    integrations: "Salesforce, HubSpot, Custom APIs",
    output: "Sync log (system, record, change, status)",
    priceMonthly: 119,
  },
  {
    id: "analytics-feed",
    category: "Data",
    name: "Analytics Feed Preparation",
    description: "Prepare clean, structured feeds for analytics and reporting.",
    integrations: "Cloud Storage, Custom APIs",
    output: "Analytics feed (schema-versioned rows)",
    priceMonthly: 89,
  },
  {
    id: "audit-log-aggregation",
    category: "Compliance",
    name: "Audit Log Aggregation",
    description: "Capture, normalize, and store compliance-relevant events.",
    integrations: "Cloud Storage, Custom APIs",
    output: "Audit event (actor, action, resource, time)",
    priceMonthly: 99,
  },
  {
    id: "policy-violation",
    category: "Compliance",
    name: "Policy Violation Detection",
    description: "Detect policy violations and route exceptions for review.",
    integrations: "Slack, Email, Custom APIs",
    output: "Exception record (policy, severity, owner)",
    priceMonthly: 119,
  },
  {
    id: "compliance-reports",
    category: "Compliance",
    name: "Compliance Report Generation",
    description: "Aggregate required data and structure reports to regulatory schemas.",
    integrations: "Google Workspace, Cloud Storage",
    output: "Regulatory report (schema-versioned)",
    priceMonthly: 139,
  },
];

const CATEGORIES: Category[] = [
  "All",
  "Outbound",
  "Research",
  "Operations",
  "Data",
  "Compliance",
];

// Uses SoftwareApplication instead of un-offered Product to avoid invalid Product snippet errors
const pageJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Agentic Data Infrastructure",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Cloud",
    provider: {
      "@type": "Organization",
      name: "Runaudit",
      url: "https://runaudit.io",
    },
    description:
      "Reduce manual overhead with enterprise agentic automation. Predictable run costs, built-in audit trails, and measurable ROI for your team.",
    url: "https://runaudit.io/",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Agentic Data Infrastructure?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Agentic Data Infrastructure enables autonomous workflows, secure data routing, and enterprise governance with Runaudit.",
        },
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Runaudit",
    url: "https://runaudit.io/",
  },
];

export default function RunauditHomePage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [cartIds, setCartIds] = useState<string[]>([]);
  const [connectedSystems, setConnectedSystems] = useState<Record<string, boolean>>({});

  // ROI Calculator state
  const [fteCount, setFteCount] = useState<number>(5);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(20);
  const [annualCostPerFte, setAnnualCostPerFte] = useState<number>(90000);
  const [coveragePercent, setCoveragePercent] = useState<number>(60);

  const visibleWorkflows = useMemo(() => {
    if (selectedCategory === "All") return WORKFLOWS;
    return WORKFLOWS.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  const roiMetrics = useMemo(() => {
    const safeFte = Math.max(0, Number.isFinite(fteCount) ? fteCount : 0);
    const safeHours = Math.max(0, Number.isFinite(hoursPerWeek) ? hoursPerWeek : 0);
    const safeCost = Math.max(0, Number.isFinite(annualCostPerFte) ? annualCostPerFte : 0);
    const safeCoverage = Math.min(100, Math.max(0, Number.isFinite(coveragePercent) ? coveragePercent : 0));

    const totalManualHoursPerYear = safeFte * safeHours * 52;
    const savedHours = Math.round(totalManualHoursPerYear * (safeCoverage / 100));
    const fteEquivalent = (savedHours / (40 * 52)).toFixed(2);
    const annualSavings = Math.round(Number(fteEquivalent) * safeCost);

    return {
      savedHours,
      fteEquivalent,
      annualSavings,
    };
  }, [fteCount, hoursPerWeek, annualCostPerFte, coveragePercent]);

  function toggleCartItem(id: string) {
    setCartIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }

  function toggleSystem(systemName: string) {
    setConnectedSystems((prev) => ({
      ...prev,
      [systemName]: !prev[systemName],
    }));
  }

  const activeIntegrations = Object.entries(connectedSystems)
    .filter(([, isOn]) => isOn)
    .map(([name]) => name);

  return (
    <>
      <Head>
        <title>Cut Operational Costs with Agentic Automation | Runaudit</title>
        <meta
          name="description"
          content="Reduce manual overhead with enterprise agentic automation. Predictable run costs, built-in audit trails, and measurable ROI for your team."
        />
        <link rel="canonical" href="https://runaudit.io/" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://runaudit.io/" />
        <meta property="og:title" content="Cut Operational Costs with Agentic Automation | Runaudit" />
        <meta
          property="og:description"
          content="Deploy autonomous workflows with strict cost controls and full financial governance."
        />
        <meta property="og:image" content="https://runaudit.io/assets/og-image.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Cut Operational Costs with Agentic Automation | Runaudit" />
        <meta
          name="twitter:description"
          content="Deploy autonomous workflows with strict cost controls and full financial governance."
        />
        <meta name="twitter:image" content="https://runaudit.io/assets/og-image.png" />
      </Head>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />

      {/* HERO SECTION */}
      <section className="hero-glow relative overflow-hidden text-white">
        <div className="fade-up mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-cyan">
              Integrated Process Optimization
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Agentic Data Infrastructure for{" "}
              <span className="text-gradient">Enterprise Automation</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl">
              Autonomous workflows. Secure data orchestration. Proven ROI.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/architecture-audit"
                className="btn-primary inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold text-white transition"
              >
                Schedule Your Architecture Audit
              </a>
              <a
                href="#marketplace"
                className="inline-flex items-center justify-center rounded-lg border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan hover:text-cyan"
              >
                Browse Workflows
              </a>
            </div>
          </div>

          <div className="logo-halo float-slow mx-auto w-full max-w-sm">
            <img
              src="/brand/logo.png"
              alt="Runaudit seal: Integrated Process Optimization"
              width={512}
              height={512}
              className="rounded-full shadow-2xl ring-4 ring-gold/40"
            />
          </div>
        </div>
      </section>

      {/* PROOF SECTION */}
      <section className="scroll-mt-16 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wider text-brand">
              <span
                aria-hidden="true"
                className="h-0.5 w-8 rounded-full bg-gradient-to-r from-cyan to-gold"
              />
              Proof
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Built for enterprise outcomes
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Autonomous execution with the security posture enterprise buyers expect.
            </p>
          </div>

          <div className="mt-10">
            <ul className="grid gap-5 md:grid-cols-3">
              <li className="card card-hover p-6">
                <p className="text-gradient font-heading text-5xl font-extrabold">24/7</p>
                <p className="mt-2 font-semibold">Autonomous execution</p>
                <p className="mt-1 text-sm text-muted">
                  Pipelines run continuously, not on business hours.
                </p>
              </li>
              <li className="card card-hover p-6">
                <p className="text-gradient font-heading text-5xl font-extrabold">40–70%</p>
                <p className="mt-2 font-semibold">Reduction in manual workload</p>
                <p className="mt-1 text-sm text-muted">
                  Typical range across automated workflows.
                </p>
              </li>
              <li className="card card-hover p-6">
                <p className="text-gradient font-heading text-5xl font-extrabold">3–7 FTE</p>
                <p className="mt-2 font-semibold">Equivalent capacity replaced</p>
                <p className="mt-1 text-sm text-muted">
                  Depending on workflow scope and volume.
                </p>
              </li>
            </ul>

            <div className="card mt-6 p-6">
              <h3 className="font-semibold">Security posture</h3>
              <ul className="mt-3 grid gap-2 text-sm text-muted sm:grid-cols-2 lg:grid-cols-4">
                <li className="flex items-center gap-2">
                  <span aria-hidden="true" className="text-cyan">●</span>
                  Role-based access control
                </li>
                <li className="flex items-center gap-2">
                  <span aria-hidden="true" className="text-cyan">●</span>
                  Encryption in transit and at rest
                </li>
                <li className="flex items-center gap-2">
                  <span aria-hidden="true" className="text-cyan">●</span>
                  Audit logging
                </li>
                <li className="flex items-center gap-2">
                  <span aria-hidden="true" className="text-cyan">●</span>
                  Data isolation
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* WORKFLOW PREVIEW SECTION */}
      <section className="hero-glow scroll-mt-16 py-16 text-white sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wider text-cyan">
              <span
                aria-hidden="true"
                className="h-0.5 w-8 rounded-full bg-gradient-to-r from-cyan to-gold"
              />
              Product
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              See a workflow run end to end
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-300">
              Every workflow is visible in the dashboard and produces a structured, schema-versioned output.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div
              className="rounded-xl border border-white/10 bg-navy-800 p-5"
              role="img"
              aria-label="Illustration of a workflow dashboard showing three active workflows"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="font-heading font-semibold">Workflow dashboard</span>
                <span className="rounded-full bg-emerald-400/15 px-2.5 py-0.5 text-xs font-semibold text-emerald-300">
                  All systems active
                </span>
              </div>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <div className="flex justify-between">
                    <span>Autonomous Outbound Engine</span>
                    <span className="text-emerald-300">Active</span>
                  </div>
                  <div className="mt-1.5 h-2 rounded-full bg-white/10">
                    <div className="h-2 w-4/5 rounded-full bg-brand" />
                  </div>
                </li>
                <li>
                  <div className="flex justify-between">
                    <span>CRM Sync</span>
                    <span className="text-emerald-300">Active</span>
                  </div>
                  <div className="mt-1.5 h-2 rounded-full bg-white/10">
                    <div className="h-2 w-3/5 rounded-full bg-brand" />
                  </div>
                </li>
                <li>
                  <div className="flex justify-between">
                    <span>Compliance Report Generation</span>
                    <span className="text-cyan">Deploying</span>
                  </div>
                  <div className="mt-1.5 h-2 rounded-full bg-white/10">
                    <div className="h-2 w-2/5 rounded-full bg-brand" />
                  </div>
                </li>
              </ul>
              <p className="mt-4 text-xs text-slate-400">Illustrative preview.</p>
            </div>

            <figure className="overflow-hidden rounded-xl border border-white/10 bg-[#0a1022]">
              <figcaption className="border-b border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-cyan">
                Output schema example: enriched lead (JSON)
              </figcaption>
              <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed text-slate-200">
                <code>{`{
  "company": "Sterling Investment Corp",
  "domain": "sterlinginvest.com",
  "contact_name": "Jane Doe",
  "role": "VP Finance",
  "score": 87,
  "source": "Outbound Engine",
  "last_updated": "2026-09-24T08:30:00Z"
}`}</code>
              </pre>
            </figure>
          </div>
        </div>
      </section>

      {/* ARCHITECTURE SECTION */}
      <section id="architecture" className="scroll-mt-16 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wider text-brand">
              <span
                aria-hidden="true"
                className="h-0.5 w-8 rounded-full bg-gradient-to-r from-cyan to-gold"
              />
              Architecture
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Four pillars, one governed layer
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Agentic Data Infrastructure is the layer that lets AI agents execute governed, secure, and integrated workflows at scale.
            </p>
          </div>

          <div className="mt-10">
            <ol aria-label="Architecture flow" className="flex flex-col items-stretch gap-2 md:flex-row md:items-center">
              <li className="flex flex-1 items-center gap-2">
                <span className="flex-1 rounded-xl bg-navy px-4 py-3 text-center font-heading font-semibold text-white">
                  Agents
                </span>
                <span aria-hidden="true" className="hidden text-cyan md:block">→</span>
              </li>
              <li className="flex flex-1 items-center gap-2">
                <span className="flex-1 rounded-xl bg-navy px-4 py-3 text-center font-heading font-semibold text-white">
                  Nodes
                </span>
                <span aria-hidden="true" className="hidden text-cyan md:block">→</span>
              </li>
              <li className="flex flex-1 items-center gap-2">
                <span className="flex-1 rounded-xl bg-navy px-4 py-3 text-center font-heading font-semibold text-white">
                  Channels
                </span>
                <span aria-hidden="true" className="hidden text-cyan md:block">→</span>
              </li>
              <li className="flex flex-1 items-center gap-2">
                <span className="flex-1 rounded-xl bg-navy px-4 py-3 text-center font-heading font-semibold text-white">
                  Governance
                </span>
                <span aria-hidden="true" className="hidden text-cyan md:block">→</span>
              </li>
              <li className="flex flex-1 items-center gap-2">
                <span className="flex-1 rounded-xl bg-navy px-4 py-3 text-center font-heading font-semibold text-white">
                  Systems
                </span>
              </li>
            </ol>

            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <li className="card card-hover p-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand/10 font-heading text-sm font-bold text-brand">
                  01
                </span>
                <h3 className="mt-3 text-lg font-bold">Nodes</h3>
                <p className="mt-2 text-sm text-muted">
                  Agentic operations nodes execute workflows autonomously, replacing manual operational tasks.
                </p>
              </li>
              <li className="card card-hover p-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand/10 font-heading text-sm font-bold text-brand">
                  02
                </span>
                <h3 className="mt-3 text-lg font-bold">Channels</h3>
                <p className="mt-2 text-sm text-muted">
                  Secure data channels route structured and unstructured data between systems.
                </p>
              </li>
              <li className="card card-hover p-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand/10 font-heading text-sm font-bold text-brand">
                  03
                </span>
                <h3 className="mt-3 text-lg font-bold">Governance</h3>
                <p className="mt-2 text-sm text-muted">
                  RBAC, encryption, and audit logging on every workflow, aligned to compliance requirements.
                </p>
              </li>
              <li className="card card-hover p-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand/10 font-heading text-sm font-bold text-brand">
                  04
                </span>
                <h3 className="mt-3 text-lg font-bold">Integrations</h3>
                <p className="mt-2 text-sm text-muted">
                  Salesforce, HubSpot, Slack, Google Workspace, cloud storage, and internal systems.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* MARKETPLACE SECTION */}
      <section id="marketplace" className="scroll-mt-16 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wider text-brand">
              <span
                aria-hidden="true"
                className="h-0.5 w-8 rounded-full bg-gradient-to-r from-cyan to-gold"
              />
              Workflow Marketplace
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Ready-to-deploy agentic workflows
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Enterprises don’t buy platforms. They buy workflows. Activate them in days, not months.
            </p>
          </div>

          <div className="mt-10">
            <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
              {CATEGORIES.map((category) => {
                const active = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setSelectedCategory(category)}
                    className={
                      active
                        ? "rounded-full border border-brand bg-brand px-4 py-1.5 text-sm font-medium text-white transition"
                        : "rounded-full border border-slate-300 bg-white px-4 py-1.5 text-sm font-medium text-ink transition hover:border-brand"
                    }
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {visibleWorkflows.map((wf) => {
                const inCart = cartIds.includes(wf.id);
                return (
                  <li key={wf.id} className="card card-hover flex flex-col p-6">
                    <span className="w-fit rounded-full bg-brand/10 px-2.5 py-0.5 text-xs font-semibold text-brand">
                      {wf.category}
                    </span>
                    <h3 className="mt-3 text-lg font-bold">{wf.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{wf.description}</p>
                    <dl className="mt-4 space-y-1.5 text-sm">
                      <div className="flex gap-2">
                        <dt className="font-medium">Integrations:</dt>
                        <dd className="text-muted">{wf.integrations}</dd>
                      </div>
                      <div className="flex gap-2">
                        <dt className="font-medium">Output:</dt>
                        <dd className="text-muted">{wf.output}</dd>
                      </div>
                    </dl>
                    <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                      <span className="text-sm text-muted">
                        from <strong className="text-ink">${wf.priceMonthly}</strong>/mo
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleCartItem(wf.id)}
                        className="btn-primary inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition"
                      >
                        {inCart ? "Added" : "Add to Cart"}
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>

            <p className="mt-4 text-xs text-muted">
              Sample pricing for demonstration. Final pricing is generated from your Architecture Audit.
            </p>
          </div>
        </div>
      </section>

      {/* WORKFLOW AUDITS SECTION */}
      <section className="hero-glow scroll-mt-16 py-16 text-white sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wider text-cyan">
              <span
                aria-hidden="true"
                className="h-0.5 w-8 rounded-full bg-gradient-to-r from-cyan to-gold"
              />
              Workflow audits
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Start with the workflow that matters most
            </h2>
          </div>

          <div className="mt-10">
            <ul className="grid gap-5 md:grid-cols-3">
              <li>
                <a
                  href="/document-generation-compliance-workflow"
                  className="flex h-full flex-col rounded-2xl border border-white/10 bg-navy-800 p-6 transition hover:border-cyan"
                >
                  <span className="text-xs font-semibold uppercase tracking-wider text-cyan">
                    Compliance Workflow
                  </span>
                  <h3 className="mt-2 text-xl font-semibold">
                    Automated Document Generation &amp; Compliance Workflow
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-slate-300">
                    Aggregate required data, generate structured documents and regulatory reports, and log every step for auditability with an autonomous compliance workflow.
                  </p>
                  <span className="mt-4 text-sm font-semibold text-cyan">Learn more →</span>
                </a>
              </li>
              <li>
                <a
                  href="/investor-onboarding-background-verification-audit"
                  className="flex h-full flex-col rounded-2xl border border-white/10 bg-navy-800 p-6 transition hover:border-cyan"
                >
                  <span className="text-xs font-semibold uppercase tracking-wider text-cyan">
                    Financial Services Audit
                  </span>
                  <h3 className="mt-2 text-xl font-semibold">
                    Investor Onboarding &amp; Background Verification Audit
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-slate-300">
                    Autonomous KYC data aggregation, validation, and routing for investor onboarding, with every verification step logged for auditability.
                  </p>
                  <span className="mt-4 text-sm font-semibold text-cyan">Learn more →</span>
                </a>
              </li>
              <li>
                <a
                  href="/crm-sync-pipeline-integration-workflow"
                  className="flex h-full flex-col rounded-2xl border border-white/10 bg-navy-800 p-6 transition hover:border-cyan"
                >
                  <span className="text-xs font-semibold uppercase tracking-wider text-cyan">
                    CRM Workflow
                  </span>
                  <h3 className="mt-2 text-xl font-semibold">
                    CRM Sync &amp; Pipeline Integration Workflow
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-slate-300">
                    Keep Salesforce and HubSpot records enriched, validated, and synchronized across systems without manual updates, with full audit logging.
                  </p>
                  <span className="mt-4 text-sm font-semibold text-cyan">Learn more →</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* REFERENCES SECTION */}
      <section id="references" className="scroll-mt-16 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wider text-brand">
              <span
                aria-hidden="true"
                className="h-0.5 w-8 rounded-full bg-gradient-to-r from-cyan to-gold"
              />
              Client validation
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">References</h2>
          </div>

          <div className="mt-10">
            <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              <li className="flex">
                <figure className="card card-hover quote-mark relative flex w-full flex-col overflow-hidden border-t-4 border-t-gold p-6">
                  <div className="flex h-36 items-center justify-center rounded-xl bg-white">
                    <img
                      alt="Sterling Investment Corp. logo"
                      loading="lazy"
                      width={255}
                      height={225}
                      className="max-h-32 w-auto object-contain"
                      src="/brand/client-sterling.png"
                    />
                  </div>
                  <blockquote className="mt-5 flex-1 text-[15px] italic leading-relaxed text-ink">
                    “Thanks to Runaudit, our company has saved more than $87,000 per quarter with their amazing insights on our workforce.”
                  </blockquote>
                  <figcaption className="mt-4 border-t border-line pt-3 font-heading text-sm font-bold text-navy">
                    Sterling Investment Corp.
                  </figcaption>
                </figure>
              </li>

              <li className="flex">
                <figure className="card card-hover quote-mark relative flex w-full flex-col overflow-hidden border-t-4 border-t-gold p-6">
                  <div className="flex h-36 items-center justify-center rounded-xl bg-white">
                    <img
                      alt="L & S Real-estate Group logo"
                      loading="lazy"
                      width={335}
                      height={180}
                      className="max-h-32 w-auto object-contain"
                      src="/brand/client-ls.png"
                    />
                  </div>
                  <blockquote className="mt-5 flex-1 text-[15px] italic leading-relaxed text-ink">
                    “Not sure how you guys did it, but you saved us thousands of dollars in 1 month. Your system is a no-brainer for companies that have more than 10 people.”
                  </blockquote>
                  <figcaption className="mt-4 border-t border-line pt-3 font-heading text-sm font-bold text-navy">
                    L &amp; S Real-estate Group
                  </figcaption>
                </figure>
              </li>

              <li className="flex">
                <figure className="card card-hover quote-mark relative flex w-full flex-col overflow-hidden border-t-4 border-t-gold p-6">
                  <div className="flex h-36 items-center justify-center rounded-xl bg-white">
                    <img
                      alt="Merchant Billing Corp. logo"
                      loading="lazy"
                      width={255}
                      height={215}
                      className="max-h-32 w-auto object-contain"
                      src="/brand/client-merchant.png"
                    />
                  </div>
                  <blockquote className="mt-5 flex-1 text-[15px] italic leading-relaxed text-ink">
                    “Any company that has a medium sales group needs your services. Thanks again for such a detailed audit of our outdated and wasted infrastructure.”
                  </blockquote>
                  <figcaption className="mt-4 border-t border-line pt-3 font-heading text-sm font-bold text-navy">
                    Merchant Billing Corp.
                  </figcaption>
                </figure>
              </li>

              <li className="flex">
                <figure className="card card-hover quote-mark relative flex w-full flex-col overflow-hidden border-t-4 border-t-gold p-6">
                  <div className="flex h-36 items-center justify-center rounded-xl bg-white">
                    <img
                      alt="Godwin Services Inc. logo"
                      loading="lazy"
                      width={280}
                      height={205}
                      className="max-h-32 w-auto object-contain"
                      src="/brand/client-godwin.png"
                    />
                  </div>
                  <blockquote className="mt-5 flex-1 text-[15px] italic leading-relaxed text-ink">
                    “Your group has some of the most amazing talent for finding out all our flaws. We will be using you as a monthly asset for us.”
                  </blockquote>
                  <figcaption className="mt-4 border-t border-line pt-3 font-heading text-sm font-bold text-navy">
                    Godwin Services Inc.
                  </figcaption>
                </figure>
              </li>

              <li className="flex">
                <figure className="card card-hover quote-mark relative flex w-full flex-col overflow-hidden border-t-4 border-t-gold p-6">
                  <div className="flex h-36 items-center justify-center rounded-xl bg-white">
                    <img
                      alt="Shopcom Holdings Ltd. logo"
                      loading="lazy"
                      width={250}
                      height={205}
                      className="max-h-32 w-auto object-contain"
                      src="/brand/client-shopcom.png"
                    />
                  </div>
                  <blockquote className="mt-5 flex-1 text-[15px] italic leading-relaxed text-ink">
                    “Thanks for saving us time and energy on wasted staffing. We should have found you years ago. We wasted so much money on our overlapping workforce.”
                  </blockquote>
                  <figcaption className="mt-4 border-t border-line pt-3 font-heading text-sm font-bold text-navy">
                    Shopcom Holdings Ltd.
                  </figcaption>
                </figure>
              </li>
            </ul>

            <p className="mt-8 max-w-3xl text-muted">
              Case study: a mid-market financial institution deployed Runaudit to automate KYC aggregation and regulatory reporting, reducing manual workload by 60% and improving reporting accuracy.
            </p>
          </div>
        </div>
      </section>

      {/* ROI CALCULATOR SECTION */}
      <section className="hero-glow scroll-mt-16 py-16 text-white sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wider text-cyan">
              <span
                aria-hidden="true"
                className="h-0.5 w-8 rounded-full bg-gradient-to-r from-cyan to-gold"
              />
              ROI Calculator
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Estimate your impact</h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-300">
              Enter your team’s manual workload to see hours saved, FTE equivalent, and annual savings.
            </p>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <form className="card space-y-5 p-6 sm:p-8" aria-label="ROI inputs">
              <div>
                <label htmlFor="fte" className="block text-sm font-medium text-ink">
                  Number of FTEs on manual workflows
                </label>
                <div className="mt-1.5 flex items-center rounded-lg border border-slate-300 bg-white focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20">
                  <input
                    id="fte"
                    type="number"
                    inputMode="decimal"
                    min={0}
                    step={1}
                    className="w-full bg-transparent px-3 py-2.5 outline-none"
                    value={fteCount}
                    onChange={(e) => setFteCount(Number(e.target.value))}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="hours" className="block text-sm font-medium text-ink">
                  Average hours per FTE per week on manual tasks
                </label>
                <div className="mt-1.5 flex items-center rounded-lg border border-slate-300 bg-white focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20">
                  <input
                    id="hours"
                    type="number"
                    inputMode="decimal"
                    min={0}
                    max={168}
                    step={1}
                    className="w-full bg-transparent px-3 py-2.5 outline-none"
                    value={hoursPerWeek}
                    onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                  />
                  <span className="pr-3 text-slate-500">hrs</span>
                </div>
              </div>

              <div>
                <label htmlFor="cost" className="block text-sm font-medium text-ink">
                  Average fully loaded cost per FTE (annual)
                </label>
                <div className="mt-1.5 flex items-center rounded-lg border border-slate-300 bg-white focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20">
                  <span className="pl-3 text-slate-500">$</span>
                  <input
                    id="cost"
                    type="number"
                    inputMode="decimal"
                    min={0}
                    step={1000}
                    className="w-full bg-transparent px-3 py-2.5 outline-none"
                    value={annualCostPerFte}
                    onChange={(e) => setAnnualCostPerFte(Number(e.target.value))}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="coverage" className="flex items-baseline justify-between text-sm font-medium text-ink">
                  <span>Estimated automation coverage</span>
                  <span className="font-heading text-lg font-bold text-brand">{coveragePercent}%</span>
                </label>
                <input
                  id="coverage"
                  type="range"
                  min={0}
                  max={100}
                  step={5}
                  className="mt-2 w-full accent-brand"
                  value={coveragePercent}
                  onChange={(e) => setCoveragePercent(Number(e.target.value))}
                />
                <p className="mt-1 text-xs text-muted">
                  Share of manual work you expect to automate.
                </p>
              </div>
            </form>

            <div className="flex flex-col rounded-2xl bg-navy p-6 text-white shadow-sm sm:p-8" aria-live="polite">
              <h2 className="font-heading text-lg font-semibold text-cyan">Estimated impact</h2>
              <dl className="mt-6 space-y-6">
                <div>
                  <dt className="text-sm text-slate-300">Estimated annual hours saved</dt>
                  <dd className="font-heading text-4xl font-bold">
                    {roiMetrics.savedHours.toLocaleString()}{" "}
                    <span className="text-lg font-medium">hours</span>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-slate-300">FTE equivalent replaced</dt>
                  <dd className="font-heading text-4xl font-bold">
                    {roiMetrics.fteEquivalent} <span className="text-lg font-medium">FTEs</span>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-slate-300">Estimated annual savings</dt>
                  <dd className="font-heading text-4xl font-bold text-cyan">
                    ${roiMetrics.annualSavings.toLocaleString()}
                  </dd>
                </div>
              </dl>
              <p className="mt-6 text-xs leading-relaxed text-slate-400">
                Estimates only. Savings = FTE equivalent of automated hours × fully loaded annual cost per FTE, based on a 40-hour week and 52 weeks.
              </p>
              <a
                className="mt-auto inline-flex items-center justify-center rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white hover:bg-brand-dark"
                href="/architecture-audit"
              >
                Schedule Your Architecture Audit
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* DEPLOYMENT SECTION */}
      <section className="scroll-mt-16 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wider text-brand">
              <span
                aria-hidden="true"
                className="h-0.5 w-8 rounded-full bg-gradient-to-r from-cyan to-gold"
              />
              Deployment
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Days and weeks, not months
            </h2>
          </div>

          <div className="mt-10">
            <ol className="grid gap-4 md:grid-cols-5">
              <li className="card p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-brand">Days 1–2</p>
                <h3 className="mt-1 font-semibold">Discovery</h3>
                <p className="mt-2 text-sm text-muted">
                  Architecture audit, workflow mapping, data channels, governance requirements.
                </p>
              </li>
              <li className="card p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-brand">Days 3–5</p>
                <h3 className="mt-1 font-semibold">Integration setup</h3>
                <p className="mt-2 text-sm text-muted">
                  CRM connection, internal system access, data routing, RBAC setup.
                </p>
              </li>
              <li className="card p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-brand">Days 6–10</p>
                <h3 className="mt-1 font-semibold">Workflow deployment</h3>
                <p className="mt-2 text-sm text-muted">
                  Outbound engine, research pipelines, operational workflows, schema validation.
                </p>
              </li>
              <li className="card p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-brand">Days 11–14</p>
                <h3 className="mt