const workflows = [
  ["Autonomous Outbound Engine",149],["Account-Based Outreach Pipeline",129],["Lead Enrichment & Scoring",79],["Market Signal Monitoring",99],["Account Intelligence Pipeline",109],["Competitive Landscape Tracker",89],["Ticket Triage & Routing",69],["SLA Monitoring & Alerts",59],["Operational Status Broadcasting",49],["Data Validation & Cleansing",79],["Multi-System Sync",119],["Analytics Feed Preparation",89],["Audit Log Aggregation",99],["Policy Violation Detection",119],["Compliance Report Generation",139]
];

export const metadata = {
  title: "Run Audit Workflow Pricing | Transparent USD Pricing",
  description: "Explore Run Audit workflow pricing in USD per workflow, per month, and compare options for operational efficiency and accountable automation.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    type: "website",
    url: "https://runaudit.io/pricing",
    siteName: "Run Audit",
    title: "Run Audit Workflow Pricing",
    description: "Compare transparent workflow pricing in USD per workflow, per month."
  },
  twitter: {
    card: "summary",
    title: "Run Audit Workflow Pricing",
    description: "Compare transparent workflow pricing in USD."
  }
};

export default function PricingPage() {
  return <main className="tool-page"><header className="tool-header"><a className="brand" href="/"><img src="/run-logo.jpg" alt="Run Audit logo" width="44" height="44"/><span>Run Audit</span></a><nav><a href="/roi-calculator">ROI calculator</a><a href="/overview">Overview</a></nav></header><section className="tool-intro"><p className="eyebrow">TRANSPARENT WORKFLOW PRICING</p><h1>Choose the workflows your operation needs.</h1><p>Published marketplace prices are in USD per workflow, per month. Select the workflows that match your priorities. Your total depends on the workflows selected and any applicable usage terms presented before purchase.</p></section><section className="price-grid">{workflows.map(([name,price])=><article className="price-card" key={name}><h2>{name}</h2><p><strong>${price}</strong><span> / workflow / month</span></p></article>)}</section><section className="pricing-note"><h2>Explore your opportunity</h2><p>Pricing is shown in USD per workflow, per month. Contact the Run Audit team to discuss workflow fit, implementation scope, and commercial terms.</p><a className="button button-primary" href="/roi-calculator">Calculate your opportunity</a></section><footer className="site-footer"><a className="brand footer-brand" href="/"><img src="/run-logo.jpg" alt="" width="38" height="38"/><span>Run Audit</span></a><p>Workflow audits and governed automation.</p><small>© {new Date().getFullYear()} Run Audit. All rights reserved.</small></footer></main>;
}
