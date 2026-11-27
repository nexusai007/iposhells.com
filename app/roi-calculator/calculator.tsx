"use client";

import { useMemo, useState } from "react";

const money = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);

export default function RoiCalculator() {
  const [employees, setEmployees] = useState(25);
  const [hourlyCost, setHourlyCost] = useState(45);
  const [hours, setHours] = useState(4);
  const [recovery, setRecovery] = useState(30);
  const [annualPlatformCost, setAnnualPlatformCost] = useState(0);
  const result = useMemo(() => {
    const annualWorkCost = employees * hourlyCost * hours * 52;
    const recoverableCapacity = annualWorkCost * recovery / 100;
    const netValue = recoverableCapacity - annualPlatformCost;
    return { annualWorkCost, recoverableCapacity, netValue, roi: annualPlatformCost > 0 ? netValue / annualPlatformCost * 100 : null };
  }, [employees, hourlyCost, hours, recovery, annualPlatformCost]);

  return <main className="tool-page">
    <header className="tool-header"><a className="brand" href="/"><img src="/run-logo.jpg" alt="Runaudit logo" width="44" height="44" /><span>Runaudit</span></a><nav><a href="/pricing">Workflow pricing</a><a href="/overview">Watch overview</a></nav></header>
    <section className="tool-intro"><p className="eyebrow">EXECUTIVE ROI ESTIMATOR</p><h1>What is manual work costing your business?</h1><p>Estimate the annual value of employee time spent on repetitive work. Adjust the assumptions to reflect your organization. This is a planning estimate—not a promise of savings or a guarantee of automation results.</p></section>
    <section className="calculator-layout">
      <div className="calculator-card">
        <h2>Your operating assumptions</h2>
        <label>Number of employees<input type="number" min="1" max="100000" value={employees} onChange={e=>setEmployees(Math.max(1,Number(e.target.value)||1))}/></label>
        <label>Average fully loaded hourly labor cost (USD)<input type="number" min="1" max="10000" value={hourlyCost} onChange={e=>setHourlyCost(Math.max(1,Number(e.target.value)||1))}/></label>
        <label>Hours per employee per week spent on repetitive work<input type="number" min="0" max="80" step="0.5" value={hours} onChange={e=>setHours(Math.min(80,Math.max(0,Number(e.target.value)||0)))}/></label>
        <label>Share of that time you believe could be recovered: <strong>{recovery}%</strong><input type="range" min="5" max="80" step="5" value={recovery} onChange={e=>setRecovery(Number(e.target.value))}/><small>Choose a conservative assumption. Actual results depend on process fit, implementation, adoption, and oversight.</small></label>
        <label>Annual Runaudit subscription cost (USD, optional)<input type="number" min="0" max="10000000" value={annualPlatformCost} onChange={e=>setAnnualPlatformCost(Math.max(0,Number(e.target.value)||0))}/><small>Enter the subscription total you are evaluating. Workflow prices are listed separately.</small></label>
      </div>
      <aside className="results-card" aria-live="polite"><p className="eyebrow">YOUR ESTIMATE</p><div className="result-line"><span>Annual labor time cost in scope</span><strong>{money(result.annualWorkCost)}</strong></div><div className="result-line result-highlight"><span>Potential value of recovered capacity</span><strong>{money(result.recoverableCapacity)}</strong></div>{annualPlatformCost>0?<><div className="result-line"><span>Annual subscription cost entered</span><strong>{money(annualPlatformCost)}</strong></div><div className="result-line"><span>Estimated net value</span><strong>{money(result.netValue)}</strong></div><div className="result-line"><span>Estimated ROI</span><strong>{result.roi!.toFixed(0)}%</strong></div></>:<p className="result-note">Enter an annual subscription cost to estimate net value and ROI. Recovered employee capacity is not necessarily cash savings.</p>}<a className="button button-primary" href="/pricing">Explore workflow pricing</a><a className="button button-secondary" href="/overview">Watch the executive overview</a><p className="fine-print">Illustrative model: employees × hourly cost × weekly hours × 52 weeks. Potential recovered capacity applies your selected recovery percentage. It does not account for implementation costs, workflow usage limits, taxes, or indirect costs.</p></aside>
    </section>
  </main>;
}
