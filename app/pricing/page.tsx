const packages = [
  {
    name: "Core Ops & Controls",
    label: "A focused starting point",
    monthly: 249,
    annual: 2490,
    standalone: 276,
    workflows: [
      "Operational Status Broadcasting",
      "SLA Monitoring & Alerts",
      "Ticket Triage & Routing",
      "Audit Log Aggregation"
    ],
    description: "Operational visibility, service monitoring, ticket routing, and audit-log aggregation in one focused package."
  },
  {
    name: "Finance, Data & Governance",
    label: "Most Popular",
    monthly: 699,
    annual: 6990,
    standalone: 821,
    featured: true,
    workflows: [
      "Everything in Core Ops & Controls",
      "Data Validation & Cleansing",
      "Analytics Feed Preparation",
      "Multi-System Sync",
      "Policy Violation Detection",
      "Compliance Report Generation"
    ],
    description: "A broader control and data foundation for finance, operations, and governance teams."
  },
  {
    name: "Enterprise Suite",
    label: "Best overall value",
    monthly: 1199,
    annual: 11990,
    standalone: 1475,
    workflows: [
      "All workflows in Finance, Data & Governance",
      "Lead Enrichment & Scoring",
      "Competitive Landscape Tracker",
      "Market Signal Monitoring",
      "Account Intelligence Pipeline",
      "Account-Based Outreach Pipeline",
      "Autonomous Outbound Engine"
    ],
    description: "The complete Run Audit portfolio—operations, finance, governance, intelligence, and growth—together in one enterprise-ready package."
  }
];

const addOns = [
  ["Lead Enrichment & Scoring", 79],
  ["Competitive Landscape Tracker", 89],
  ["Market Signal Monitoring", 99],
  ["Account Intelligence Pipeline", 109],
  ["Account-Based Outreach Pipeline", 129],
  ["Autonomous Outbound Engine", 149]
] as const;

export const metadata = {
  title: "Run Audit Plans & Pricing | Transparent Workflow Packages",
  description: "Compare Run Audit workflow packages for operational controls, finance, data governance, and enterprise-wide automation.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    type: "website",
    url: "https://runaudit.io/pricing",
    siteName: "Run Audit",
    title: "Run Audit Plans & Pricing",
    description: "Explore Run Audit packages for operational controls, finance, data governance, and enterprise workflows."
  },
  twitter: {
    card: "summary",
    title: "Run Audit Plans & Pricing",
    description: "Explore Run Audit workflow packages."
  }
};

function money(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

export default function PricingPage() {
  return (
    <main className="tool-page pricing-page">
      <header className="tool-header">
        <a className="brand" href="/"><img src="/run-logo.jpg" alt="Run Audit logo" width="44" height="44"/><span>Run Audit</span></a>
        <nav><a href="/roi-calculator">ROI calculator</a><a href="/overview">Overview</a></nav>
      </header>

      <section className="tool-intro pricing-intro">
        <p className="eyebrow">RUN AUDIT PLANS</p>
        <h1>Clear packages. Stronger operational control.</h1>
        <p>Choose a package that fits your organization today. Each plan brings together complementary workflows, with transparent USD pricing and a clear path to expand as your needs grow.</p>
        <p className="pricing-billing-note">All prices are in USD. Monthly plans are billed monthly; annual plans are billed annually at the published annual price.</p>
      </section>

      <section className="package-grid" aria-label="Run Audit packages">
        {packages.map((plan) => (
          <article className={plan.name === "Enterprise Suite" ? "package-card package-enterprise package-featured" : plan.featured ? "package-card package-featured" : "package-card"} key={plan.name}>
            <div className="package-topline">
              <span className="package-label">{plan.label}</span>
              {plan.name === "Enterprise Suite" ? <span className="package-badge">Best Overall Value</span> : plan.featured ? <span className="package-badge">Most Popular</span> : null}
            </div>
            <h2>{plan.name}</h2>
            <p className="package-description">{plan.description}</p>
            <div className="package-price">{money(plan.monthly)}<span> / month</span></div>
            <p className="package-annual">{money(plan.annual)} / year <span>· equivalent to 10 months</span></p>
            <p className="package-value">Individual workflow total: {money(plan.standalone)} / month</p>
            {plan.name === "Enterprise Suite" ? <div className="enterprise-value-callout"><strong>Full-Suite Savings: all 15 workflows in one complete platform.</strong><span>Save $276 every month — $3,312 over 12 months — compared with purchasing all 15 workflows individually at their monthly list prices.</span><span>That is approximately 19% less. More capability, fewer separate purchases, and stronger overall value.</span></div> : null}
            <ul className="package-workflows">
              {plan.workflows.map((workflow) => <li key={workflow}>{workflow}</li>)}
            </ul>
            <a className={plan.name === "Enterprise Suite" || plan.featured ? "button button-primary" : "button button-secondary"} href="/roi-calculator">{plan.name === "Enterprise Suite" ? "See what the full suite could unlock" : "Calculate your opportunity"}</a>
          </article>
        ))}
      </section>

      <section className="enterprise-why">
        <p className="eyebrow">WHY ORGANIZATIONS CHOOSE THE FULL SUITE</p>
        <h2>Why buy pieces when you can own the full suite?</h2>
        <div className="enterprise-why-grid">
          <article><h3>Cover the whole operation</h3><p>Bring operational workflows, data quality, governance, market intelligence, and pipeline automation into one portfolio instead of assembling capabilities one at a time.</p></article>
          <article><h3>Keep options open</h3><p>Start with the priorities in front of you and have the remaining workflows available as your teams and requirements evolve.</p></article>
          <article><h3>Make the value visible</h3><p>Use the full workflow set to identify opportunities across departments—not just within a single team or process.</p></article>
        </div>
        <p className="enterprise-urgency">If your organization expects to use several workflows, compare the full-suite investment before buying them one at a time. The Enterprise Suite delivers the strongest published per-workflow value across the complete Run Audit portfolio.</p>
      </section>

      <section className="enterprise-panel">
        <div>
          <p className="eyebrow">BUILT FOR COMPLEX REQUIREMENTS</p>
          <h2>Custom Enterprise</h2>
          <p>For multi-department deployments, tailored workflow combinations, higher usage requirements, and guided implementation. Scope the opportunity with our team before agreeing on commercial terms.</p>
        </div>
        <a className="button button-primary" href="/roi-calculator">Start with your ROI</a>
      </section>

      <section className="addons-section">
        <div className="addons-heading">
          <p className="eyebrow">EXPAND AS YOU GROW</p>
          <h2>Growth &amp; Pipeline workflows</h2>
          <p>These six workflows are included in the Enterprise Suite and can be discussed as additions to a lower-tier package where available.</p>
        </div>
        <div className="addons-grid">
          {addOns.map(([name, price]) => (
            <article className="addon-row" key={name}>
              <span>{name}</span><strong>{money(price)}<small> / workflow / month</small></strong>
            </article>
          ))}
        </div>
      </section>

      <section className="pricing-faq">
        <h2>Plan details</h2>
        <div><h3>Can we change packages later?</h3><p>Package fit can be reviewed as your workflow requirements change. Confirm any changes to scope, billing, and effective dates before making a plan change.</p></div>
        <div><h3>What about implementation and usage?</h3><p>Integration scope, usage limits, and any implementation services should be confirmed in writing before purchase. Custom Enterprise is available for more involved deployments.</p></div>
        <div><h3>Is a free trial available?</h3><p>Trial availability and payment terms will be published once the checkout and billing process has been fully verified.</p></div>
      </section>

      <section className="pricing-note">
        <h2>Find the right starting point</h2>
        <p>Estimate the opportunity for your organization and identify where workflow improvements may have the greatest impact.</p>
        <a className="button button-primary" href="/roi-calculator">Calculate your opportunity</a>
      </section>

      <footer className="site-footer">
        <a className="brand footer-brand" href="/"><img src="/run-logo.jpg" alt="" width="38" height="38"/><span>Run Audit</span></a>
        <p>Workflow audits and governed automation.</p>
        <small>© {new Date().getFullYear()} Run Audit. All rights reserved.</small>
      </footer>
    </main>
  );
}
