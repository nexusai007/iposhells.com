import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | CFO Accountability & Audit Confidence",
  description: "Meet the RunAudit leadership team and learn how structured automation supports finance, compliance, internal controls, and audit-ready documentation.",
  alternates: { canonical: "/about-us" },
  openGraph: {
    title: "About RunAudit | Structured Automation for CFO Accountability",
    description: "Learn how RunAudit helps finance and compliance teams standardize workflows, support internal controls, and reduce manual overhead.",
    url: "https://runaudit.io/about-us",
    siteName: "Runaudit",
    type: "website"
  }
};

const confidenceReasons = [
  {
    title: "Executive & Financial Leadership",
    description: "Guided by CEO Rick Plotnikoff, CFO Bob Shepard, and COO Dave Smith, our leadership team understands the pressures of financial reporting, governance, and executive sign-off."
  },
  {
    title: "Controlled, Traceable Automation",
    description: "Our Agentic Workflow System is designed to support structured workflows and clear documentation—helping teams reduce repetitive manual work while keeping steps reviewable and traceable."
  },
  {
    title: "Confidentiality & Access Discipline",
    description: "We treat client financial and audit materials as confidential, with processes designed around controlled access, careful handling, and clear operational boundaries."
  },
  {
    title: "Measurable Cost Efficiency",
    description: "By streamlining repetitive compliance and operational workflows, we aim to help finance organizations reduce administrative effort and recurring costs while maintaining governance."
  },
  {
    title: "Low-Risk Adoption & Rollout",
    description: "A structured rollout lets teams validate workflows, review data handling, and scale at a controlled pace—with attention to active reporting cycles."
  }
];

const standards = [
  {
    title: "Sarbanes-Oxley (SOX) Discipline",
    description: "Informed by the governance, accountability, and investor-protection principles established by the Sarbanes-Oxley Act of 2002."
  },
  {
    title: "Public & Regulated Scope",
    description: "Designed with awareness of the demands facing U.S. public companies, issuers, and SEC-registered broker-dealers."
  },
  {
    title: "Internal Control Support (ICFR)",
    description: "Helps teams organize documentation and workflow records that can support evaluations of internal control over financial reporting."
  },
  {
    title: "Documentation, Risk & Independence",
    description: "Prioritizes clear audit trails, risk awareness, and role separation as part of disciplined workflow design."
  },
  {
    title: "Inspection & Governance Readiness",
    description: "Designed to keep records structured, consistent, and easier to review during audits and oversight reviews."
  }
];

export default function AboutUsPage() {
  return (
    <main className="about-shell">
      <header className="site-header">
        <a className="brand" href="/" aria-label="Runaudit home">
          <img src="/run-logo.jpg" alt="Runaudit logo" width="48" height="48" />
          <span>Runaudit</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="/">Home</a><a href="/overview">Overview</a><a href="/pricing">Pricing</a><a href="/roi-calculator">ROI Calculator</a>
        </nav>
      </header>

      <section className="about-hero">
        <div className="about-hero-copy">
          <p className="eyebrow">ABOUT RUNAUDIT</p>
          <h1>Structured Automation Built for CFO Accountability and Audit Confidence.</h1>
          <p className="about-hero-lede">Find opportunities to save thousands in labor through structured automation—with human oversight, clear accountability, and a controlled path to adoption.</p>
        </div>
        <div className="about-hero-card">
          <span className="about-card-kicker">LEADERSHIP</span>
          <h2>Experience where it matters.</h2>
          <p>CEO Rick Plotnikoff, CFO Bob Shepard, and COO Dave Smith bring hands-on experience supporting organizations in high-scrutiny financial, operational, and regulatory environments.</p>
          <div className="about-leaders">
            <div><strong>Rick Plotnikoff</strong><span>Chief Executive Officer</span></div>
            <div><strong>Bob Shepard</strong><span>Chief Financial Officer</span></div>
            <div><strong>Dave Smith</strong><span>Chief Operating Officer</span></div>
          </div>
        </div>
      </section>

      <section className="about-intro section">
        <div className="section-heading">
          <p className="eyebrow">CONTROL · ACCOUNTABILITY · MEASURABLE RETURN</p>
          <h2>Built around the questions CFOs need answered.</h2>
          <p>When a CFO commits budget to a new workflow or compliance system, the decision comes down to control, accountability, and measurable return. At RunAudit, our leadership team brings hands-on experience supporting organizations through high-scrutiny financial, operational, and regulatory environments.</p>
          <p>Through our Agentic Workflow System, we help finance and compliance teams standardize documentation, strengthen internal-control processes, and reduce manual overhead—while keeping human review and clear audit trails central to the workflow.</p>
        </div>
      </section>

      <section className="section about-confidence">
        <div className="section-heading">
          <p className="eyebrow">SAFETY AND SECURITY</p>
          <h2>Why CFOs &amp; Audit Leaders Subscribe With Confidence</h2>
          <p>Practical workflow support, designed to respect the standards and responsibilities finance teams work under.</p>
        </div>
        <div className="about-reason-grid">
          {confidenceReasons.map((item, index) => <article className="about-reason-card" key={item.title}>
            <span className="about-number">0{index + 1}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>)}
        </div>
      </section>

      <section className="section about-standards">
        <div className="section-heading">
          <p className="eyebrow">PUBLIC-COMPANY &amp; REGULATORY CONTEXT</p>
          <h2>Aligned with Rigorous PCAOB &amp; Public-Company Standards</h2>
          <p>We structure our workflows to support finance teams operating under—or preparing for—high-scrutiny public-company and regulatory expectations. RunAudit supports documentation and workflow discipline; it is not a substitute for independent audit, legal, or compliance advice.</p>
        </div>
        <div className="about-standards-list">
          {standards.map((item, index) => <article className="about-standard" key={item.title}>
            <span className="about-standard-number">{index + 1}</span>
            <div><h3>{item.title}</h3><p>{item.description}</p></div>
          </article>)}
        </div>
      </section>

      <section className="about-cta">
        <p className="eyebrow">PARTNER WITH RUNAUDIT</p>
        <h2>Bring more control to your finance and compliance workflows.</h2>
        <p>Ready to see how structured automation can support your team? Explore the RunAudit overview and calculate your potential opportunity.</p>
        <div className="hero-actions" style={{ justifyContent: "center" }}>
          <a className="button button-light" href="/auth/signup">Start your 14-day free trial</a>
          <a className="button button-secondary" href="/roi-calculator">Calculate Your Opportunity</a>
        </div>
        <p className="about-trial-note">Create your account free. No card is required to begin the 14-day trial. Add a payment method only if you choose to continue after the trial.</p>
        <a className="about-pricing-link" href="/pricing">View RunAudit pricing</a>
      </section>

      <footer className="site-footer">
        <a className="brand footer-brand" href="/"><img src="/run-logo.jpg" alt="" width="38" height="38" /><span>Runaudit</span></a>
        <p>Structured workflows. Clear accountability.</p>
        <small>© {new Date().getFullYear()} Runaudit. All rights reserved.</small>
      </footer>
    </main>
  );
}
