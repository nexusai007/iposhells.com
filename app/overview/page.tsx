"use client";

import { useEffect, useMemo, useState } from "react";

const scenes = [
  {
    label: "THE CHALLENGE",
    headline: "Automation is accelerating.",
    subhead: "But are costs, decisions and risks fully visible?",
    narration: "Automation is accelerating. But are costs, decisions and risks fully visible? Leaders need more than automation. They need clarity about what it costs, what it changes, and whether it stays within control.",
    visual: ["COST", "RISK", "VISIBILITY"],
  },
  {
    label: "ONE CONTROL LAYER",
    headline: "Bring the picture together.",
    subhead: "Financial intelligence. Workflow visibility. Accountable automation.",
    narration: "Runaudit is designed to bring operational performance, financial visibility and automation governance together in one place.",
    visual: ["FINANCE", "OPERATIONS", "GOVERNANCE"],
  },
  {
    label: "THE CFO VIEW",
    headline: "Understand cost. Measure capacity.",
    subhead: "Connect every reported measure to its source and assumptions.",
    narration: "See workflow costs, operational trends, exceptions and recovered capacity. Connect every reported measure to its source and assumptions. Recovered capacity is not automatically a cash saving.",
    visual: ["WORKFLOW COST", "CAPACITY", "VERIFIED VALUE"],
  },
  {
    label: "THE CONTROL VIEW",
    headline: "Know what happened.",
    subhead: "What acted. What was approved. What happened next.",
    narration: "Create an accountable record of automated activity, permissions, human approvals, policy checks and exceptions, with evidence ready to review.",
    visual: ["IDENTITY", "POLICY", "APPROVAL", "ACTION", "EVIDENCE"],
  },
  {
    label: "THE OUTCOME",
    headline: "Every action. Every dollar.",
    subhead: "Every decision. Accounted for.",
    narration: "Give finance, operations, risk and audit teams a shared view of automation performance and accountability. Runaudit. Secure workflows. Verified audit trails.",
    visual: ["FINANCE", "OPERATIONS", "RISK", "AUDIT"],
  },
];

export default function OverviewPage() {
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const sceneIndex = Math.min(4, Math.floor(elapsed / 15));
  const scene = scenes[sceneIndex];
  const progress = (elapsed / 75) * 100;
  const remaining = 75 - elapsed;

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setElapsed((current) => {
        if (current >= 74) {
          setPlaying(false);
          return 75;
        }
        return current + 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [playing]);



  const visualItems = useMemo(() => scene.visual, [scene]);

  function start() {
    if (elapsed >= 75) setElapsed(0);
    setPlaying(true);
  }
  function restart() {
    setPlaying(false);
    setElapsed(0);
    if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
  }

  return (
    <main className="overview-shell">
      <div className="overview-topbar">
        <a href="/" className="overview-brand"><img src="/run-logo.jpg" alt="Runaudit logo" /><span>RUN<span className="gold">AUDIT</span></span></a>
        <a className="overview-back" href="/">Back to Runaudit</a>
      </div>

      <section className="overview-stage" aria-label="Runaudit 75-second animated overview">
        <div className="overview-orb orb-one" />
        <div className="overview-orb orb-two" />
        <div className="overview-grid" />
        <div className="overview-stage-logo"><img src="/run-logo.jpg" alt="Runaudit — Secure workflows. Verified audit trails." /></div>
        <div className="overview-copy" key={sceneIndex}>
          <p className="overview-kicker">RUN<span className="gold">AUDIT</span> / 0{sceneIndex + 1} · {scene.label}</p>
          <div className="overview-rule" />
          <h1>{scene.headline}</h1>
          <p className="overview-subhead">{scene.subhead}</p>
          <div className="overview-tags">
            {visualItems.map((item, index) => <span key={item} style={{ animationDelay: `${index * 120}ms` }}>{item}</span>)}
          </div>
        </div>
        <div className="overview-footer-lockup">
          <span>SECURE WORKFLOWS</span><i /> <span>VERIFIED AUDIT TRAILS</span>
        </div>
        <div className="overview-watermark">RUNAUDIT</div>
      </section>

      <section className="overview-controls">
        <div className="overview-progress-row"><span>00:{String(Math.min(elapsed, 75)).padStart(2, "0")}</span><div className="overview-progress"><span style={{ width: `${progress}%` }} /></div><span>01:15</span></div>
        <div className="overview-control-row">
          <div className="overview-buttons">
            <button className="overview-play" onClick={playing ? () => setPlaying(false) : start}>{playing ? "Pause" : elapsed >= 75 ? "Replay overview" : "Play overview"}</button>
            <button className="overview-restart" onClick={restart}>Restart</button>
          </div>
          <span className="overview-duration">{remaining === 0 ? "Complete" : `${remaining}s remaining`}</span>
        </div>
        <p className="overview-caption" aria-live="polite">{scene.narration}</p>
        <p className="overview-disclaimer">Narration transcript shown on screen. Professionally recorded voiceover will be added in the final audio master.</p>
        <p className="overview-disclaimer">Product vision overview. Visuals are illustrative and do not represent live customer data or imply certifications, customer results, or features not yet released.</p>
      </section>

      <section className="overview-cta">
        <div><p className="overview-kicker">SEE THE OPPORTUNITY</p><h2>Make automation more accountable.</h2></div>
        <div className="overview-cta-actions"><a href="/roi-calculator">Calculate your opportunity</a><a href="/roi-calculator">Explore ROI calculator</a></div>
      </section>

      <style jsx>{`
        .overview-shell{min-height:100vh;background:#050b16;color:#f4f6fa;padding:0 5vw 48px;font-family:Arial,sans-serif}
        .overview-topbar{height:88px;display:flex;align-items:center;justify-content:space-between;max-width:1440px;margin:auto}
        .overview-brand{display:flex;align-items:center;gap:12px;color:#f6f0e5;text-decoration:none;font-weight:800;letter-spacing:3px;font-size:18px}
        .overview-brand img{width:52px;height:52px;object-fit:cover;border-radius:8px}
        .gold{color:#dfb96e}.overview-back{color:#c6cfda;text-decoration:none;font-size:14px}
        .overview-stage{position:relative;isolation:isolate;overflow:hidden;min-height:590px;max-width:1440px;margin:0 auto;border:1px solid #26374a;border-radius:22px;background:radial-gradient(ellipse at 78% 44%,#123b3a 0%,#0b1b2c 32%,#07101e 70%,#050b16 100%);display:flex;align-items:center;padding:70px 7%;box-shadow:0 25px 90px #0008}
        .overview-grid{position:absolute;inset:0;z-index:-1;opacity:.23;background-image:linear-gradient(#73949a18 1px,transparent 1px),linear-gradient(90deg,#73949a18 1px,transparent 1px);background-size:48px 48px;mask-image:linear-gradient(90deg,transparent,#000 45%,#000)}
        .overview-orb{position:absolute;border-radius:50%;filter:blur(2px);z-index:-1;animation:float 9s ease-in-out infinite}
        .orb-one{width:280px;height:280px;right:12%;top:22%;border:1px solid #35c99b66;box-shadow:0 0 90px #22b88624,inset 0 0 70px #22b88618}
        .orb-two{width:130px;height:130px;right:30%;bottom:15%;border:1px solid #dfb96e66;animation-delay:-4s}
        .overview-stage-logo{position:absolute;right:32px;top:26px;width:160px;height:160px;overflow:hidden;border-radius:14px;box-shadow:0 12px 42px #0007}
        .overview-stage-logo img{width:100%;height:100%;object-fit:cover}
        .overview-copy{max-width:730px;animation:reveal .75s ease both}
        .overview-kicker{font-size:13px;letter-spacing:3px;color:#d9b66d;font-weight:700}
        .overview-rule{width:150px;height:2px;background:linear-gradient(90deg,#dfb96e,#2bd39a);margin:22px 0 32px}
        .overview-copy h1{font-size:clamp(40px,5vw,68px);line-height:1.04;letter-spacing:-2px;margin:0 0 20px;max-width:750px}
        .overview-subhead{font-size:clamp(20px,2.2vw,28px);line-height:1.35;color:#d2dbe5;max-width:680px;margin:0}
        .overview-tags{display:flex;flex-wrap:wrap;gap:12px;margin-top:42px}
        .overview-tags span{border:1px solid #3b6a68;background:#0a242bba;color:#e5e9ed;border-radius:9px;padding:13px 17px;font-size:12px;letter-spacing:1.5px;font-weight:700;animation:tagin .5s ease both}
        .overview-footer-lockup{position:absolute;left:7%;bottom:30px;display:flex;align-items:center;gap:15px;font-size:12px;letter-spacing:2px;color:#e8e1d5}
        .overview-footer-lockup i{width:5px;height:5px;background:#dfb96e;border-radius:50%}
        .overview-watermark{position:absolute;right:36px;bottom:26px;font-size:12px;letter-spacing:5px;color:#ffffff28;font-weight:800}
        .overview-controls{max-width:1440px;margin:22px auto 0;padding:0 8px}
        .overview-progress-row{display:flex;align-items:center;gap:16px;color:#9caabd;font-size:12px;font-variant-numeric:tabular-nums}
        .overview-progress{height:5px;background:#1c2a3a;flex:1;border-radius:8px;overflow:hidden}
        .overview-progress span{display:block;height:100%;background:linear-gradient(90deg,#dfb96e,#2bd39a);transition:width .4s linear}
        .overview-control-row{display:flex;align-items:center;justify-content:space-between;gap:18px;margin-top:18px;flex-wrap:wrap}
        .overview-buttons{display:flex;gap:10px}
        button{border:0;border-radius:8px;padding:13px 21px;font-weight:700;cursor:pointer}
        .overview-play{background:linear-gradient(120deg,#e4c17b,#c99b4d);color:#101722}.overview-restart{background:#152337;color:#e7edf3;border:1px solid #35465b}
        .overview-duration{font-size:13px;color:#9ba9ba}
        .overview-caption{border-left:2px solid #d8b267;padding:10px 16px;color:#d6dfe9;line-height:1.55;margin:20px 0 8px;max-width:1000px}
        .overview-disclaimer{color:#8291a3;font-size:11px;line-height:1.5}
        .overview-cta{max-width:1440px;margin:38px auto 0;padding:28px 0;border-top:1px solid #253346;display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap}
        .overview-cta h2{font-size:clamp(25px,3vw,38px);margin:8px 0}
        .overview-cta-actions{display:flex;gap:12px;flex-wrap:wrap}.overview-cta-actions a{padding:13px 18px;border-radius:8px;text-decoration:none;font-weight:700;background:#d9b56c;color:#111b27}.overview-cta-actions a+ a{background:#142337;color:#f4f6fa;border:1px solid #405168}
        @keyframes reveal{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
        @keyframes tagin{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes float{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-24px) scale(1.05)}}
        @media(max-width:700px){.overview-shell{padding:0 16px 32px}.overview-topbar{height:72px}.overview-stage{min-height:640px;padding:54px 24px 100px}.overview-stage-logo{width:94px;height:94px;right:18px;top:18px}.overview-copy{padding-top:110px}.overview-copy h1{font-size:42px;letter-spacing:-1px}.overview-subhead{font-size:20px}.overview-footer-lockup{left:24px;bottom:24px;font-size:9px;gap:8px}.overview-watermark{display:none}.overview-cta-actions{width:100%}.overview-cta-actions a{flex:1;text-align:center}.overview-control-row{align-items:flex-start;flex-direction:column}}
        @media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;transition-duration:.01ms!important}}
      `}</style>
    </main>
  );
}
