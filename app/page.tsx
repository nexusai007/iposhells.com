const workflowAreas = [
  { number: "01", title: "Workflow discovery", description: "Map the work your teams do today, identify friction, and prioritize processes that are strong candidates for automation." },
  { number: "02", title: "Integration and orchestration", description: "Connect the systems and data channels your operation relies on, with clear ownership and controlled access." },
  { number: "03", title: "Governance and auditability", description: "Design workflows with permissions, traceable activity, and review points that support responsible operations." }
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
        <a className="brand" href="/" aria-label="Runaudit home">
          <img src="/run-logo.jpg" alt="Runaudit logo" width="48" height="48" />
          <span>Runaudit</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#approach">Approach</a><a href="#workflows">Workflows</a>
          <a href="#governance">Governance</a><a className="nav-cta" href="#trial">14-day free trial</a>
        </nav>
      </header>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">CEO & CFO WORKFLOW INTELLIGENCE · OPERATIONAL EFFICIENCY</p>
          <h1>Reduce manual work. Control labor costs. Grow with confidence.</h1>
          <p className="hero-lede">Identify where repetitive work consumes time and budget. Prioritize automation opportunities, improve workforce capacity, and build more accountable operations—with secure workflows and verified audit trails.</p>
          <div className="hero-actions"><a className="button button-primary" href="#approach">Explore Your Automation Opportunities</a><a className="button button-secondary" href="#workflows">See Workflow Use Cases</a></div>
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
      <section className="trust-strip" aria-label="Runaudit principles"><span>Operational clarity</span><i /><span>Connected systems</span><i /><span>Governed automation</span><i /><span>Measurable outcomes</span></section>
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
      <section className="contact-section" id="trial"><p className="eyebrow">START WITH ZERO RISK</p><h2>Try Runaudit free for 14 days.</h2><p>Start your 14-day trial for $0. No credit card is required to begin. You can evaluate Runaudit before choosing a monthly or annual subscription. Any paid subscription price and billing terms should be clearly shown before you subscribe.</p></section>
      <footer className="site-footer"><a className="brand footer-brand" href="/"><img src="/run-logo.jpg" alt="" width="38" height="38" /><span>Runaudit</span></a><p>Workflow audits and governed automation.</p><small>© {new Date().getFullYear()} Runaudit. All rights reserved.</small></footer>
    </main>
  );
}