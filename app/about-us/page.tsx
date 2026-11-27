import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Runaudit | Workflow Intelligence & Accountable Automation",
  description: "Learn about Runaudit's approach to workflow discovery, operational efficiency, governance, and accountable automation.",
  alternates: { canonical: "/about-us" },
  openGraph: {
    type: "website",
    url: "https://runaudit.io/about-us",
    siteName: "Runaudit",
    title: "About Runaudit | Workflow Intelligence & Accountable Automation",
    description: "Our approach to understanding manual work, prioritizing workflow improvements, and building responsible automation."
  },
  twitter: {
    card: "summary",
    title: "About Runaudit",
    description: "Workflow intelligence, operational efficiency, and accountable automation."
  }
};

const principles = [
  {
    title: "Understand the work first",
    description: "Start with the people, processes, systems, and constraints involved. A useful automation plan begins with an accurate picture of today's work."
  },
  {
    title: "Measure the opportunity",
    description: "Make assumptions visible, estimate the cost of repetitive work, and distinguish recovered employee capacity from guaranteed cash savings."
  },
  {
    title: "Design for oversight",
    description: "Consider permissions, data handling, human review, exception paths, and traceable activity as part of workflow design."
  },
  {
    title: "Improve continuously",
    description: "Review how workflows perform, learn from exceptions, and refine processes as operational needs change."
  }
];

export default function AboutUsPage() {
  return (
    <main className="tool-page">
      <header className="tool-header">
        <a className="brand" href="/" aria-label="Runaudit home">
          <img src="/runaudit-logo.svg" alt="Runaudit logo" width="44" height="44" />
          <span>Runaudit</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="/overview">Overview</a>
          <a href="/roi-calculator">ROI calculator</a>
          <a href="/pricing">Pricing</a>
        </nav>
      </header>
      <section className="tool-intro">
        <p className="eyebrow">ABOUT RUNAUDIT</p>
        <h1>Make workflow improvement more measurable and accountable.</h1>
        <p>Runaudit helps leadership teams examine where repetitive work consumes time, assess opportunities to improve workforce capacity, and plan automation with governance in view.</p>
      </section>
      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">OUR APPROACH</p>
          <h2>Clarity before automation. Oversight throughout.</h2>
          <p>Automation should solve a defined operational problem—not introduce a new one. Runaudit's approach connects process understanding, financial assumptions, workflow design, and ongoing review.</p>
        </div>
        <div className="three-grid">
          {principles.map((principle, index) => (
            <article className="info-card" key={principle.title}>
              <span className="card-number">0{index + 1}</span>
              <h3>{principle.title}</h3>
              <p>{principle.description}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="contact-section">
        <p className="eyebrow">TAKE THE NEXT STEP</p>
        <h2>Start with the work you want to improve.</h2>
        <p>Estimate the potential value of recovered employee capacity, then explore the workflow categories and pricing.</p>
        <div className="hero-actions" style={{ justifyContent: "center" }}>
          <a className="button button-light" href="/roi-calculator">Calculate your opportunity</a>
          <a className="button button-secondary" href="/pricing">Explore pricing</a>
        </div>
      </section>
      <footer className="site-footer">
        <a className="brand footer-brand" href="/">
          <img src="/runaudit-logo.svg" alt="" width="38" height="38" />
          <span>Runaudit</span>
        </a>
        <p>Workflow audits and governed automation.</p>
        <small>© {new Date().getFullYear()} Runaudit. All rights reserved.</small>
      </footer>
    </main>
  );
}
