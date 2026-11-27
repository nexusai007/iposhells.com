const workflowAreas = [
  { number: "01", title: "Workflow discovery", description: "Map the work your teams do today, identify friction, and prioritize processes that are strong candidates for automation." },
  { number: "02", title: "Integration and orchestration", description: "Connect the systems and data channels your operation relies on, with clear ownership and controlled access." },
  { number: "03", title: "Governance and auditability", description: "Design workflows with permissions, traceable activity, and review points that support responsible operations." }
];

const leadership = [
  { name: "Bob Shepard", role: "Chief Financial Officer" },
  { name: "Dave Smith", role: "Chief Operating Officer" },
  { name: "Rick Plotnikoff", role: "Chief Executive Officer" }
];

const testimonials = [
  { company: "Sterling Investment Corp.", logo: "/brand/client-sterling.webp", quote: "Thanks to Run Audit, our company has saved more than $87,000 per quarter with their amazing insights on our workforce." },
  { company: "L & S Real-estate Group", logo: "/brand/client-ls.webp", quote: "Not sure how you guys did it, but you saved us thousands of dollars in 1 month. Your system is a no-brainer for companies that have more than 10 people." },
  { company: "Merchant Billing Corp.", logo: "/brand/client-merchant.webp", quote: "Any company that has a medium sales group needs your services. Thanks again for such a detailed audit of our outdated and wasted infrastructure." },
  { company: "Godwin Services Inc.", logo: "/brand/client-godwin.webp", quote: "Your group has some of the most amazing talent for finding out all our flaws. We will be using you as a monthly asset for us." },
  { company: "Shopcom Holdings Ltd.", logo: "/brand/client-shopcom.webp", quote: "Thanks for saving us time and energy on wasted staffing. We should have found you years ago. We wasted so much money on our overlapping workforce." }
];

const workflowExamples = [
  ["Operations", "Ticket triage and routing", "Classify requests, prioritize work, and route tasks to the right team."],
  ["Data", "Data validation and cleansing", "Check records for quality and consistency before they reach downstream systems."],
  ["Research", "Market and account intelligence", "Organize research signals into structured information for teams to act on."],
  ["Compliance", "Document and report preparation", "Collect required information and prepare consistent, reviewable outputs."],
  ["Sales", "Lead enrichment and scoring", "Enrich prospect records and help teams prioritize follow-up."],
  ["Integrations", "CRM and system synchronization", "Coordinate information across business tools and reduce repetitive updates."]
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="/" aria-label="Run Audit home">
          <img src="/runaudit-logo.webp" alt="Run Audit — Secure Workflows. Verified Audit Trails." width="180" height="72" />
        </a>
        <nav aria-label="Main navigation">
          <a href="/about-us">About Us</a><a href="/overview">Watch overview</a><a href="/roi-calculator">ROI Calculator</a><a href="/pricing">Pricing</a><a href="#workflows">Workflows</a>
          <a href="#governance">Governance</a><a className="nav-cta" href="/roi-calculator">Explore ROI</a>
        </nav>
      </header>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">CEO & CFO WORKFLOW INTELLIGENCE · OPERATIONAL EFFICIENCY</p>
          <h1>Reduce manual work. Control labor costs. Grow with confidence.</h1>
          <p className="hero-lede">Identify where repetitive work consumes time and budget. Prioritize automation opportunities, improve workforce capacity, and build more accountable operations—with secure workflows and verified audit trails.</p>
          <div className="hero-actions"><a className="button button-primary" href="/roi-calculator">Calculate Your Opportunity</a><a className="button button-secondary" href="/overview">Watch the 75-second overview</a></div>
          <p className="hero-note">A clearer view of labor-intensive work, operational opportunity, and accountable automation.</p>
        </div>
        <div className="hero-panel" aria-label="Workflow audit framework">
          <div className="panel-top"><span className="status-dot" /> WORKFLOW REVIEW</div>
          <div className="panel-title">From process to progress</div>
          {[
            ["01","Discover","Understand the work and its constraints"],
            ["02","Assess","Find risk, friction, and opportunity"],
            ["03","Design","Define an integrated, governed workflow"],
            ["04","Improve","Measure outcomes and refine over time"]
          ].map(([number,title,detail]) => <div className="process-step" key={number}><span>{number}</span><div><b>{title}</b><small>{detail}</small></div></div>)}
          <div className="panel-foot">A clear path from manual effort to measurable improvement.</div>
        </div>
      </section>
      <section className="trust-strip" aria-label="Run Audit principles"><span><a href="/roi-calculator">Estimate your ROI</a></span><i /><span><a href="/pricing">View workflow prices</a></span><i /><span>Operational clarity</span><i /><span>Connected systems</span><i /><span>Governed automation</span><i /><span>Measurable outcomes</span></section>
      <section className="section" id="approach">
        <div className="section-heading"><p className="eyebrow">THE RUNAUDIT APPROACH</p><h2>Find the cost of manual work before adding more headcount.</h2><p>For CEOs and CFOs, the starting point is financial clarity: which processes consume the most employee time, where delays create avoidable cost, and which improvements can be measured. Effective automation begins with understanding the process, the people involved, the data, and the controls it requires.</p></div>
        <div className="three-grid">{workflowAreas.map(item => <article className="info-card" key={item.number}><span className="card-number">{item.number}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}</div>
      </section>
      <section className="section section-dark" id="workflows">
        <div className="section-heading"><p className="eyebrow">WORKFLOW OPPORTUNITIES</p><h2>Target repetitive work across the operation.</h2><p>Every organization is different. These examples illustrate common areas where workflow assessment and automation can help.</p></div>
        <div className="workflow-grid">{workflowExamples.map(([category,title,description]) => <article className="workflow-card" key={title}><span>{category}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
      </section>
      <section className="section governance" id="governance">
        <div className="governance-copy"><p className="eyebrow">BUILT AROUND RESPONSIBLE OPERATIONS</p><h2>Improve productivity without losing oversight.</h2><p>Runaudit puts governance into the workflow design conversation from the beginning. Access, data handling, human review, and activity records should be considered before automation is put into production.</p></div>
        <ul className="governance-list"><li><b>Access control</b><span>Define who and what can access each workflow.</span></li><li><b>Traceability</b><span>Plan for clear records of actions, changes, and decisions.</span></li><li><b>Human review</b><span>Keep appropriate review and approval points in the process.</span></li><li><b>Continuous improvement</b><span>Review performance and adjust workflows as needs change.</span></li></ul>
      </section>
      <section className="section team-section" id="who-we-are">
        <div className="section-heading"><p className="eyebrow">WHO WE ARE</p><h2>Why top-tier companies trust us.</h2><p>Our leadership team brings deep public-company experience, including work involving PCAOB audits and the demands of complex regulatory environments.</p></div>
        <div className="team-grid">{leadership.map(person => <article className="team-card" key={person.name}><h3>{person.name}</h3><p className="team-role">{person.role}</p></article>)}</div>
        <p className="team-footnote">Experienced leadership. Practical perspective. A commitment to accountable operations.</p>
      </section>
      <section className="section client-proof" id="client-stories">
        <div className="section-heading"><p className="eyebrow">CLIENT EXPERIENCE</p><h2>Trusted by companies that value measurable results.</h2><p>Five client stories and their original company identities, presented with the Run Audit brand.</p></div>
        <div className="client-logo-grid">{testimonials.map(item => <article className="client-logo-card" key={item.company}><img src={item.logo} alt={item.company + " logo"} /><span>{item.company}</span></article>)}</div>
        <div className="testimonial-grid">{testimonials.map(item => <article className="testimonial-card" key={item.company}><div className="testimonial-mark">“</div><blockquote>{item.quote}</blockquote><p className="testimonial-company">{item.company}</p></article>)}</div>
      </section>
      <section className="contact-section" id="next-step"><p className="eyebrow">EXPLORE RUNAUDIT</p><h2>See how Runaudit works.</h2><p>Explore the Runaudit overview and calculate the potential value of improving repetitive workflows.</p><div className="hero-actions" style={{justifyContent:"center"}}><a className="button button-light" href="/overview">Watch the overview</a><a className="button button-secondary" href="/pricing">Review workflow pricing</a></div></section>
      <footer className="site-footer"><a className="brand footer-brand" href="/"><img src="/runaudit-logo.webp" alt="Run Audit" width="150" height="64" /></a><p>Workflow audits and governed automation.</p><nav aria-label="Footer navigation"><a href="/about-us">About Us</a> · <a href="/overview">Overview</a> · <a href="/roi-calculator">ROI Calculator</a> · <a href="/pricing">Pricing</a></nav><small>© {new Date().getFullYear()} Runaudit. All rights reserved.</small></footer>
    </main>
  );
}