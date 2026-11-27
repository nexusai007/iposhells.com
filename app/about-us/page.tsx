import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Runaudit | Executive Workflow Governance & Audit Readiness",
  description: "Meet Runaudit's leadership and learn how our controlled, traceable workflow approach supports finance teams, operational efficiency, and public-company governance expectations.",
  alternates: { canonical: "/about-us" },
  openGraph: {
    type: "website",
    url: "https://runaudit.io/about-us",
    siteName: "Runaudit",
    title: "About Runaudit | Executive Workflow Governance & Audit Readiness",
    description: "Executive leadership, controlled workflows, confidentiality, measurable cost efficiency, and structured rollout."
  },
  twitter: {
    card: "summary",
    title: "About Runaudit",
    description: "Executive leadership, controlled workflows, and accountable operational improvement."
  }
};

const trustPillars = [
  {
    title: "Executive & Financial Leadership",
    description: <>Guided by <strong>CEO Rick Plotnikoff</strong>, <strong>CFO Bob Shepard</strong>, and <strong>COO Dave Smith</strong>, our leadership team understands the real pressures of financial reporting, governance, and executive sign-off.</>
  },
  {
    title: "Controlled, Traceable Automation",
    description: "Our Agentic Workflow System is engineered to support structured workflows and clear documentation—helping teams eliminate repetitive manual work while keeping every step reviewable and traceable."
  },
  {
    title: "Confidentiality & Access Discipline",
    description: "We treat client financial and audit materials as strictly confidential, designing processes around controlled access, secure handling, and clear operational boundaries."
  },
  {
    title: "Measurable Cost Efficiency",
    description: "By streamlining repetitive compliance and operational workflows, we help finance organizations reduce administrative drag and lower recurring costs without cutting corners on governance."
  },
  {
    title: "Low-Risk Adoption & Rollout",
    description: "We support structured onboarding so your team can validate workflows, review data handling, and scale at a controlled pace rather than disrupting active reporting cycles."
  }
];

const standards = [
  {
    title: "Sarbanes-Oxley (SOX) Discipline",
    description: "Grounded in the governance, accountability, and investor-protection principles established by the Sarbanes-Oxley Act of 2002."
  },
  {
    title: "Public & Regulated Scope",
    description: "Built with awareness of the demands facing U.S. public companies, issuers, and SEC-registered broker-dealers."
  },
  {
    title: "Internal Control Support (ICFR)",
    description: "Helps teams organize documentation and workflow records that support evaluations of internal control over financial reporting."
  },
  {
    title: "Documentation, Risk & Independence",
    description: "Prioritizes clear audit trails, risk awareness, and role separation that go well beyond informal private-company practices."
  },
  {
    title: "Inspection & Governance Readiness",
    description: "Designed to keep records structured, consistent, and straightforward to review during audits or oversight reviews."
  }
];

export default function AboutUsPage() {
  return (
    <main className="tool-page about-page">
      <header className="tool-header">
        <a className="brand" href="/" aria-label="Runaudit home">
          <img src="/runaudit-logo.svg" alt="Runaudit logo" width="148" height="48" />
          <span>Runaudit</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="/overview">Overview</a>
          <a href="/roi-calculator">ROI calculator</a>
          <a href="/pricing">Pricing</a>
        </nav>
      </header>

      <section className="tool-intro about-hero">
        <p className="eyebrow">ABOUT RUNAUDIT</p>
        <h1>Executive discipline. Controlled workflows. Verifiable accountability.</h1>
        <p>Runaudit is built for finance and executive teams that need operational efficiency without losing sight of governance, documentation, confidentiality, and oversight.</p>
      </section>

      <section className="section about-trust-section">
        <div className="section-heading">
          <p className="eyebrow">WHY RUNAUDIT</p>
          <h2>Built around the realities of executive finance.</h2>
          <p>Our approach brings leadership experience, controlled automation, and disciplined rollout together to help organizations improve repetitive workflows while maintaining reviewability and accountability.</p>
        </div>
        <div className="about-pillar-grid">
          {trustPillars.map((pillar, index) => (
            <article className="info-card about-pillar-card" key={pillar.title}>
              <span className="card-number">0{index + 1}</span>
              <h3>{pillar.title}</h3>
              <p>{pillar.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section about-standards-section">
        <div className="section-heading">
          <p className="eyebrow">GOVERNANCE & PUBLIC-COMPANY EXPECTATIONS</p>
          <h2>Aligned with rigorous PCAOB & public-company standards.</h2>
          <p>We structure our workflows to support finance teams operating under—or preparing for—high-scrutiny public-company and regulatory expectations:</p>
        </div>
        <div className="about-standards-grid">
          {standards.map((item, index) => (
            <article className="about-standard" key={item.title}>
              <span className="about-standard-number">0{index + 1}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="about-standards-note">Runaudit's workflow approach is intended to support documentation, control, and review processes. References to PCAOB, SOX, SEC-registered entities, and ICFR describe the operating environments we aim to support; they do not imply PCAOB approval, certification, an audit opinion, or a guarantee of regulatory compliance.</p>
      </section>

      <section className="contact-section">
        <p className="eyebrow">TAKE THE NEXT STEP</p>
        <h2>Bring greater control to the work behind your numbers.</h2>
        <p>Explore the Runaudit workflow approach and estimate the potential value of reducing repetitive administrative work.</p>
        <div className="hero-actions" style={{ justifyContent: "center" }}>
          <a className="button button-light" href="/roi-calculator">Calculate your opportunity</a>
          <a className="button button-secondary" href="/overview">Explore Runaudit</a>
        </div>
      </section>

      <footer className="site-footer">
        <a className="brand footer-brand" href="/" aria-label="Runaudit home">
          <img src="/runaudit-logo.svg" alt="Runaudit" width="128" height="42" />
          <span>Runaudit</span>
        </a>
        <p>Secure workflows. Verified audit trails.</p>
        <small>© {new Date().getFullYear()} Runaudit. All rights reserved.</small>
      </footer>
    </main>
  );
}
