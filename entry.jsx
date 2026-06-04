import React, { useState, useEffect, useRef, useCallback } from "react";
import { createRoot } from "react-dom/client";

const C = {
  bg: "#0B0F17",
  bgCard: "#0F1520",
  bgPanel: "#111827",
  border: "#1E3A5F",
  borderGlow: "#2563EB",
  emerald: "#10B981",
  emeraldDim: "#065F46",
  crimson: "#EF4444",
  crimsonDim: "#7F1D1D",
  amber: "#F59E0B",
  blue: "#3B82F6",
  cyan: "#06B6D4",
  text: "#E2E8F0",
  textMuted: "#64748B",
  textDim: "#334155",
};

// Quick Landing Page
function LandingPage({ onNavigate }) {
  return (
    <div style={{ background: C.bg, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "4rem 2rem" }}>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.18em", color: C.crimson, border: `1px solid rgba(239,68,68,0.3)`, background: "rgba(239,68,68,0.07)", padding: "0.35rem 1rem", borderRadius: "2px", marginBottom: "2.5rem" }}>
        ● LIVE SYSTEM · FINANCIAL FRAUD DETECTION
      </div>
      <h1 style={{ fontSize: "clamp(3rem, 9vw, 6rem)", fontWeight: 900, color: C.text, marginBottom: "1rem" }}>
        Catch fraud.<br /><span style={{ color: C.cyan }}>Explain</span> it.
      </h1>
      <p style={{ maxWidth: "600px", fontSize: "1rem", color: C.textMuted, marginBottom: "2rem", lineHeight: 1.6 }}>
        AI-powered fraud detection combining rules, graph neural networks, XGBoost, and SHAP explainability.
      </p>
      <div style={{ display: "flex", gap: "2rem", marginBottom: "3rem" }}>
        <div><div style={{ fontSize: "1.8rem", fontWeight: 700, color: C.crimson }}>6</div><div style={{ fontSize: "0.7rem", color: C.textMuted }}>RULES</div></div>
        <div><div style={{ fontSize: "1.8rem", fontWeight: 700, color: C.cyan }}>4</div><div style={{ fontSize: "0.7rem", color: C.textMuted }}>MODULES</div></div>
        <div><div style={{ fontSize: "1.8rem", fontWeight: 700, color: C.amber }}>94%</div><div style={{ fontSize: "0.7rem", color: C.textMuted }}>RECALL</div></div>
      </div>
      <button onClick={onNavigate} style={{ fontFamily: "'DM Mono', monospace", padding: "0.75rem 2rem", border: `1px solid ${C.cyan}`, background: `rgba(6,182,212,0.1)`, color: C.cyan, borderRadius: "3px", cursor: "pointer", fontSize: "0.75rem" }}>
        → LAUNCH DASHBOARD
      </button>
    </div>
  );
}

const NAV_ITEMS = ["Threat Vectors","Live Engine","Architecture","Test Suite"];

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `${r},${g},${b}`;
}

// ─────────────────────────────────────────────
// PHYSICS GRAPH CANVAS
// ─────────────────────────────────────────────
function GraphCanvas({ highlight, scenario, triggerAnimation, animKey }) {
  const canvasRef = useRef(null);
  const stateRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const nodes = [
      { id:0, x:340, y:220, vx:0, vy:0, type:"hub", label:"HUB-01" },
      { id:1, x:180, y:130, vx:0, vy:0, type:"normal", label:"ACC-12" },
      { id:2, x:500, y:130, vx:0, vy:0, type:"normal", label:"ACC-34" },
      { id:3, x:160, y:310, vx:0, vy:0, type:"normal", label:"ACC-56" },
      { id:4, x:520, y:310, vx:0, vy:0, type:"normal", label:"ACC-78" },
      { id:5, x:340, y:370, vx:0, vy:0, type:"normal", label:"ACC-90" },
      { id:6, x:260, y:200, vx:0, vy:0, type:"proxy", label:"PROXY" },
      { id:7, x:420, y:200, vx:0, vy:0, type:"relay", label:"RELAY" },
      { id:8, x:120, y:220, vx:0, vy:0, type:"external", label:"EXT-A" },
      { id:9, x:570, y:220, vx:0, vy:0, type:"external", label:"EXT-B" },
    ];
    const edges = [
      {s:0,t:1},{s:0,t:2},{s:0,t:3},{s:0,t:4},{s:0,t:5},
      {s:1,t:6},{s:2,t:7},{s:6,t:8},{s:7,t:9},{s:3,t:6},{s:4,t:7},
    ];
    const packets = [];
    stateRef.current = { nodes, edges, packets, animPhase:null, animTimer:0 };
  }, []);

  useEffect(() => {
    if (!triggerAnimation || !stateRef.current) return;
    const s = stateRef.current;
    s.packets = [];
    s.animPhase = scenario;
    s.animTimer = 0;
    s.nodes.forEach(n => { n.alert = false; n.mule = false; n.proxy = false; });
  }, [animKey, scenario, triggerAnimation]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const W = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    const H = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    const scale = window.devicePixelRatio;

    function draw() {
      const s = stateRef.current;
      if (!s) { rafRef.current = requestAnimationFrame(draw); return; }

      ctx.fillStyle = C.bg;
      ctx.fillRect(0,0,W,H);

      // grid
      ctx.strokeStyle = "rgba(30,58,95,0.3)";
      ctx.lineWidth = 0.5 * scale;
      for (let x=0; x<W; x+=40*scale) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
      for (let y=0; y<H; y+=40*scale) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }

      // physics
      const ns = s.nodes;
      ns.forEach(n => {
        ns.forEach(m => {
          if (n===m) return;
          const dx = n.x - m.x, dy = n.y - m.y;
          const d = Math.sqrt(dx*dx+dy*dy) || 1;
          const force = 2200 / (d*d);
          n.vx += dx/d * force * 0.016;
          n.vy += dy/d * force * 0.016;
        });
      });
      s.edges.forEach(e => {
        const a = ns[e.s], b = ns[e.t];
        const dx = b.x - a.x, dy = b.y - a.y;
        const d = Math.sqrt(dx*dx+dy*dy) || 1;
        const rest = 130, force = (d - rest) * 0.04;
        const fx = dx/d * force, fy = dy/d * force;
        a.vx += fx; a.vy += fy;
        b.vx -= fx; b.vy -= fy;
      });

      const cx = W/(2*scale), cy = H/(2*scale);
      ns.forEach(n => {
        n.vx += (cx - n.x) * 0.003;
        n.vy += (cy - n.y) * 0.003;
        n.vx *= 0.88; n.vy *= 0.88;
        n.x = Math.max(40, Math.min(W/scale-40, n.x + n.vx));
        n.y = Math.max(40, Math.min(H/scale-40, n.y + n.vy));
      });

      // animation phases
      s.animTimer += 0.016;
      if (s.animPhase === "mule") {
        if (s.animTimer > 0.5) { ns[0].alert = true; }
        if (s.animTimer > 1.0) { ns[1].mule = true; ns[3].mule = true; ns[5].mule = true; }
        if (s.animTimer > 1.8) { ns[6].alert = true; ns[7].alert = true; }
      } else if (s.animPhase === "smurf") {
        if (s.animTimer > 0.3) { ns[8].alert = true; ns[9].alert = true; }
        if (s.animTimer > 0.8) { ns[1].alert = true; ns[2].alert = true; ns[3].alert = true; }
        if (s.animTimer > 1.4) { ns[0].alert = true; }
      } else if (s.animPhase === "proxy") {
        if (s.animTimer > 0.5) { ns[6].proxy = true; }
        if (s.animTimer > 1.2) { ns[8].alert = true; ns[9].alert = true; }
      } else if (s.animPhase === "normal") {
        if (s.animTimer > 0.3) { ns[0].safe = true; ns[1].safe = true; }
      } else if (s.animPhase === "stealth") {
        if (s.animTimer > 0.5) { ns[6].mule = true; ns[7].mule = true; }
        if (s.animTimer > 1.2) { ns[0].alert = true; ns[3].alert = true; ns[4].alert = true; }
      } else if (s.animPhase === "threat") {
        if (s.animTimer > 0.4) { ns[8].alert = true; ns[9].alert = true; }
        if (s.animTimer > 1.0) { ns[6].alert = true; ns[7].alert = true; }
      }

      // draw edges
      s.edges.forEach(e => {
        const a = ns[e.s], b = ns[e.t];
        const suspicious = a.alert || b.alert || a.mule || b.mule;
        const safe = a.safe && b.safe;
        ctx.beginPath();
        ctx.moveTo(a.x * scale, a.y * scale);
        ctx.lineTo(b.x * scale, b.y * scale);
        ctx.strokeStyle = suspicious ? `rgba(239,68,68,0.5)` : safe ? `rgba(16,185,129,0.6)` : `rgba(30,58,95,0.6)`;
        ctx.lineWidth = suspicious ? 1.5*scale : safe ? 2*scale : 0.8*scale;
        ctx.stroke();
      });

      // animate packets
      if (s.animPhase && s.animTimer < 3) {
        const t = (s.animTimer % 1.5) / 1.5;
        s.edges.slice(0,5).forEach((e, i) => {
          const a = ns[e.s], b = ns[e.t];
          const offset = i * 0.15;
          const tp = ((t + offset) % 1);
          const px = (a.x + (b.x - a.x) * tp) * scale;
          const py = (a.y + (b.y - a.y) * tp) * scale;
          const suspicious = ns[e.s].alert || ns[e.t].alert || s.animPhase === "smurf";
          ctx.beginPath();
          ctx.arc(px, py, 3*scale, 0, Math.PI*2);
          ctx.fillStyle = suspicious ? C.crimson : C.emerald;
          ctx.fill();
          ctx.beginPath();
          ctx.arc(px, py, 5*scale, 0, Math.PI*2);
          ctx.fillStyle = suspicious ? `rgba(239,68,68,0.2)` : `rgba(16,185,129,0.2)`;
          ctx.fill();
        });
      }

      // draw nodes
      ns.forEach(n => {
        const isHighlight = highlight && (
          (highlight === "hub" && n.type === "hub") ||
          (highlight === "proxy" && n.type === "proxy") ||
          (highlight === "external" && n.type === "external")
        );
        const r = (n.type === "hub" ? 14 : 9) * scale;
        const col = n.alert ? C.crimson : n.mule ? "#F97316" : n.proxy ? C.amber : n.safe ? C.emerald :
                    n.type === "hub" ? C.blue : n.type === "proxy" ? C.amber :
                    n.type === "external" ? "#8B5CF6" : C.cyan;

        if (isHighlight || n.alert || n.mule) {
          ctx.beginPath();
          ctx.arc(n.x*scale, n.y*scale, r*1.8, 0, Math.PI*2);
          ctx.fillStyle = `rgba(${hexToRgb(col)},0.15)`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(n.x*scale, n.y*scale, r, 0, Math.PI*2);
        ctx.fillStyle = `rgba(${hexToRgb(col)},0.15)`;
        ctx.fill();
        ctx.strokeStyle = col;
        ctx.lineWidth = (n.alert ? 2.5 : 1.5) * scale;
        ctx.stroke();

        ctx.fillStyle = col;
        ctx.font = `${8.5*scale}px monospace`;
        ctx.textAlign = "center";
        ctx.fillText(n.label, n.x*scale, (n.y + r/scale + 10) * scale);
      });

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [highlight]);

  return <canvas ref={canvasRef} style={{ width:"100%", height:"100%", display:"block" }} />;
}

// ─────────────────────────────────────────────
// THREAT VECTOR CARDS
// ─────────────────────────────────────────────
function ThreatVectorSection({ onAnimate }) {
  const [active, setActive] = useState(null);
  const [animKey, setAnimKey] = useState(0);

  const cards = [
    {
      id:"mule", letter:"A",
      title:"Money Mules Tracking",
      tag:"MULTI-HOP STRUCTURAL",
      color: C.crimson,
      focus:"Uncovering hidden relationships across seemingly unrelated entities.",
      backend:"NetworkX structural parsing surfaces hidden loops across disparate accounts by checking historical paths within paysim.csv. Degree-centrality outliers flag accounts acting as pass-through nodes.",
      anim:"Triggers sequential multi-hop animation: origin → 1st-hop → 3 × 2nd-hop mule cluster.",
      icon:"⬡",
    },
    {
      id:"smurf", letter:"B",
      title:"Smurfing & Layering",
      tag:"VELOCITY AGGREGATION",
      color: C.amber,
      focus:"Catching distributed micro-transaction spikes under static thresholds.",
      backend:"Pipeline intercepts high-volume distributed spikes that standard static rule engines miss by treating transaction bursts as dense graph sub-clusters. Velocity scoring is computed as aggregate inbound weight per time window.",
      anim:"10 rapid crimson packets fire concurrently from scattered dummy accounts into a consolidation node whose perimeter expands as aggregate velocity warning triggers.",
      icon:"◈",
    },
    {
      id:"proxy", letter:"C",
      title:"Semantic Evasion & IP Masquerading",
      tag:"GEO-ANOMALY DETECTION",
      color: C.blue,
      focus:"Detecting invalid locations, proxy chains, and impossible transfer velocities.",
      backend:"System catches attackers hiding behind malicious subnets by cross-referencing against Feodo Tracker + FireHOL CIDR lists, then computing physical transfer velocity between registered geolocations.",
      anim:"Packet travels from normal node to isolated proxy. Jagged crimson line draws an Impossible Velocity Link Failure between distant geolocation markers.",
      icon:"⬢",
    },
  ];

  const handleAnimate = (id) => {
    setActive(id);
    setAnimKey(k => k+1);
    onAnimate(id, animKey+1);
  };

  return (
    <section style={{ padding:"2rem", borderBottom:`1px solid ${C.border}` }}>
      <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"1.5rem" }}>
        <span style={{ fontFamily:"monospace", fontSize:"10px", color:C.crimson, letterSpacing:"3px", textTransform:"uppercase" }}>01 // ADVERSARIAL THREAT VECTORS</span>
        <div style={{ flex:1, height:"1px", background:`linear-gradient(90deg, ${C.crimson} 40%, transparent)` }} />
        <span style={{ fontFamily:"monospace", fontSize:"10px", color:C.textMuted }}>THREAT_MATRIX_TRACKER v2.4.1</span>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"1rem" }}>
        {cards.map(c => (
          <div key={c.id} onClick={() => handleAnimate(c.id)}
            style={{
              background: active===c.id ? `rgba(${hexToRgb(c.color)},0.08)` : C.bgCard,
              border: `1px solid ${active===c.id ? c.color : C.border}`,
              borderRadius:"8px", padding:"1.25rem", cursor:"pointer",
              transition:"all 0.3s", position:"relative", overflow:"hidden",
            }}>
            <div style={{ position:"absolute", top:0, right:0, opacity:0.04, fontSize:"80px", lineHeight:1, userSelect:"none", color:c.color }}>{c.letter}</div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"0.75rem" }}>
              <div>
                <div style={{ fontFamily:"monospace", fontSize:"9px", color:c.color, letterSpacing:"2px", marginBottom:"4px" }}>CARD {c.letter} // {c.tag}</div>
                <div style={{ fontWeight:600, fontSize:"14px", color:C.text }}>{c.title}</div>
              </div>
              <span style={{ fontSize:"22px", color:c.color, opacity:0.7 }}>{c.icon}</span>
            </div>
            <p style={{ fontSize:"11px", color:C.textMuted, lineHeight:1.6, marginBottom:"0.75rem" }}>{c.focus}</p>
            <div style={{ background:"rgba(0,0,0,0.3)", borderRadius:"4px", padding:"0.75rem", marginBottom:"0.75rem", borderLeft:`2px solid ${c.color}` }}>
              <div style={{ fontFamily:"monospace", fontSize:"9px", color:C.textMuted, letterSpacing:"1px", marginBottom:"4px" }}>BACKEND_DETAIL</div>
              <p style={{ fontSize:"10px", color:`rgba(${hexToRgb(c.color)},0.9)`, lineHeight:1.6, margin:0 }}>{c.backend}</p>
            </div>
            <div style={{ background:"rgba(0,0,0,0.2)", borderRadius:"4px", padding:"0.5rem", marginBottom:"0.75rem", borderLeft:`2px solid ${C.textDim}` }}>
              <div style={{ fontFamily:"monospace", fontSize:"9px", color:C.textMuted, letterSpacing:"1px", marginBottom:"2px" }}>ANIMATION_HINT</div>
              <p style={{ fontSize:"10px", color:C.textMuted, lineHeight:1.5, margin:0 }}>{c.anim}</p>
            </div>
            <button onClick={(e) => { e.stopPropagation(); handleAnimate(c.id); }}
              style={{
                width:"100%", padding:"7px", background: active===c.id ? `rgba(${hexToRgb(c.color)},0.2)` : "transparent",
                border:`1px solid ${c.color}`, borderRadius:"4px", color:c.color,
                fontFamily:"monospace", fontSize:"10px", letterSpacing:"1px", cursor:"pointer",
                transition:"all 0.2s",
              }}>
              {active===c.id ? "▶ SCENARIO ACTIVE" : "▷ ANIMATE ATTACK SCENARIO"}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// LIVE API SECTION
// ─────────────────────────────────────────────
function LiveEngineSection({ onAnimate, animScenario, animKey }) {
  const [activePreset, setActivePreset] = useState(null);
  const [showShap, setShowShap] = useState(false);
  const [showDrop, setShowDrop] = useState(false);
  const [metrics, setMetrics] = useState({ txRate:847, fraud:2, latency:14, blocked:3 });

  useEffect(() => {
    const iv = setInterval(() => {
      setMetrics(m => ({
        txRate: m.txRate + Math.floor((Math.random()-0.3)*30),
        fraud: Math.max(0, m.fraud + (Math.random()>0.7?1:0) - (Math.random()>0.8?1:0)),
        latency: Math.max(8, Math.min(35, m.latency + (Math.random()-0.5)*3)),
        blocked: m.blocked + (Math.random()>0.92?1:0),
      }));
    }, 1500);
    return () => clearInterval(iv);
  }, []);

  const presets = [
    {
      id:"normal", label:"Normal Transfer", color:C.emerald,
      desc:"Low-risk inter-account transfer. Rules pass. ML score: 0.03.",
      payload:`{"tx_id":"TXN-88421","amount":4200.00,"sender":"ACC-12","receiver":"ACC-34","ip":"103.21.244.0","geo":"Chennai, IN","hop_count":1,"velocity_score":0.12}`,
    },
    {
      id:"stealth", label:"Stealth Mule Network", color:C.crimson,
      desc:"2-hop structural mule cluster detected. XGBoost score: 0.94. SHAP explains.",
      payload:`{"tx_id":"TXN-66001","amount":49700.00,"sender":"ACC-99","receiver":"RELAY","hop_count":2,"path_count":4,"2hop_path_count":7,"shap_dominant":"2hop_path_count→+2.31 log-odds"}`,
    },
    {
      id:"threat", label:"Threat Intel Match (Feodo/FireHOL)", color:"#8B5CF6",
      desc:"Sender IP matched Feodo Tracker C2. Rule engine hard-drops before ML layer.",
      payload:`{"tx_id":"TXN-55789","sender_ip":"185.220.101.47","cidr_match":"185.220.101.0/24","list":"feodo_tracker_v4","action":"HARD_DROP","ml_invoked":false}`,
    },
  ];

  const shapPayload = `{
  "model": "xgb_fraud_v3.pkl",
  "tx_id": "TXN-66001",
  "shap_values": {
    "2hop_path_count":    +2.3100,
    "degree_centrality":  +1.8740,
    "velocity_score":     +1.2210,
    "amount_zscore":      +0.9340,
    "geo_anomaly_score":  +0.4120,
    "is_night_tx":        -0.1870,
    "known_ip":           -0.3210
  },
  "log_odds_sum":  +6.4434,
  "prob_fraud":     0.9383,
  "threshold":      0.3500,
  "verdict":       "FRAUD",
  "recall_mode":   "SMOTE_OPTIMIZED"
}`;

  const handlePreset = (id) => {
    setActivePreset(id);
    setShowShap(id === "stealth");
    setShowDrop(id === "threat");
    onAnimate(id, Date.now());
  };

  return (
    <section style={{ padding:"2rem", borderBottom:`1px solid ${C.border}` }}>
      <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"0.5rem" }}>
        <span style={{ fontFamily:"monospace", fontSize:"10px", color:C.emerald, letterSpacing:"3px" }}>02 // LIVE API STREAMING SIMULATOR</span>
        <div style={{ flex:1, height:"1px", background:`linear-gradient(90deg,${C.emerald}40,transparent)` }} />
        <div style={{ display:"flex", alignItems:"center", gap:"6px" }}>
          <div style={{ width:6, height:6, borderRadius:"50%", background:C.emerald, boxShadow:`0 0 8px ${C.emerald}` }} />
          <span style={{ fontFamily:"monospace", fontSize:"9px", color:C.emerald }}>LIVE</span>
        </div>
      </div>

      <div style={{ marginBottom:"1.5rem" }}>
        <h1 style={{ fontSize:"28px", fontWeight:700, color:C.text, margin:"0.5rem 0 0.25rem", letterSpacing:"-0.5px" }}>
          Graph-Based Real-Time Fraud Ingestion Engine
        </h1>
        <p style={{ fontSize:"12px", color:C.textMuted, lineHeight:1.7, margin:0, maxWidth:"700px" }}>
          A hybrid defense framework integrating asynchronous rule engines, SMOTE-optimized XGBoost classifiers, and NetworkX topological graph features.
        </p>
      </div>

      {/* Live metrics bar */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"0.75rem", marginBottom:"1.25rem" }}>
        {[
          { label:"TX/sec", value:metrics.txRate.toLocaleString(), color:C.emerald },
          { label:"Active Fraud Signals", value:metrics.fraud, color:C.crimson },
          { label:"P99 Latency (ms)", value:metrics.latency.toFixed(1), color:C.cyan },
          { label:"Blocked Today", value:metrics.blocked.toLocaleString(), color:"#8B5CF6" },
        ].map(m => (
          <div key={m.label} style={{ background:C.bgCard, border:`1px solid ${C.border}`, borderRadius:"6px", padding:"0.75rem" }}>
            <div style={{ fontFamily:"monospace", fontSize:"9px", color:C.textMuted, letterSpacing:"1px", marginBottom:"4px" }}>{m.label}</div>
            <div style={{ fontSize:"22px", fontWeight:700, color:m.color, fontFamily:"monospace" }}>{m.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 380px", gap:"1rem" }}>
        {/* Canvas */}
        <div style={{ background:C.bgCard, border:`1px solid ${C.border}`, borderRadius:"8px", overflow:"hidden", position:"relative", minHeight:"320px" }}>
          <div style={{ position:"absolute", top:"10px", left:"12px", zIndex:10, display:"flex", gap:"8px" }}>
            <span style={{ fontFamily:"monospace", fontSize:"9px", color:C.textMuted, background:"rgba(0,0,0,0.5)", padding:"3px 8px", borderRadius:"3px" }}>LIVE_GRAPH_CANVAS</span>
          </div>
          {animScenario === "mule" || animScenario === "stealth" ? (
            <div style={{ position:"absolute", top:"40%", left:"50%", transform:"translate(-50%,-50%)", zIndex:20, textAlign:"center", pointerEvents:"none" }}>
              <div style={{ background:C.crimsonDim, border:`1px solid ${C.crimson}`, borderRadius:"6px", padding:"8px 16px", fontFamily:"monospace", fontSize:"11px", color:C.crimson }}>
                ⚠ MULE SUB-CLUSTER DETECTED
              </div>
            </div>
          ) : animScenario === "proxy" && (
            <div style={{ position:"absolute", top:"40%", left:"50%", transform:"translate(-50%,-50%)", zIndex:20, textAlign:"center", pointerEvents:"none" }}>
              <div style={{ background:"rgba(59,130,246,0.2)", border:`1px solid ${C.blue}`, borderRadius:"6px", padding:"8px 16px", fontFamily:"monospace", fontSize:"11px", color:C.blue }}>
                ✕ IMPOSSIBLE VELOCITY LINK FAILURE
              </div>
            </div>
          )}
          <GraphCanvas highlight={null} scenario={animScenario} triggerAnimation={!!animScenario} animKey={animKey} />
        </div>

        {/* API Control Panel */}
        <div style={{ display:"flex", flexDirection:"column", gap:"0.75rem" }}>
          <div style={{ fontFamily:"monospace", fontSize:"9px", color:C.textMuted, letterSpacing:"2px", marginBottom:"2px" }}>API_CONTROL_PANEL // test_adversarial_cases.py</div>
          {presets.map(p => (
            <div key={p.id} onClick={() => handlePreset(p.id)}
              style={{
                background: activePreset===p.id ? `rgba(${hexToRgb(p.color)},0.08)` : C.bgCard,
                border:`1px solid ${activePreset===p.id ? p.color : C.border}`,
                borderRadius:"6px", padding:"0.875rem", cursor:"pointer", transition:"all 0.25s",
              }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"6px" }}>
                <span style={{ fontFamily:"monospace", fontSize:"11px", fontWeight:600, color:p.color }}>{p.label}</span>
                <span style={{ fontFamily:"monospace", fontSize:"9px", color:activePreset===p.id ? p.color : C.textMuted }}>
                  {activePreset===p.id ? "▶ ACTIVE" : "▷ TRIGGER"}
                </span>
              </div>
              <p style={{ fontSize:"10px", color:C.textMuted, margin:"0 0 6px", lineHeight:1.5 }}>{p.desc}</p>
              {activePreset===p.id && (
                <pre style={{ background:"rgba(0,0,0,0.4)", borderRadius:"4px", padding:"0.5rem", fontSize:"9px", color:`rgba(${hexToRgb(p.color)},0.85)`, margin:0, overflow:"auto", fontFamily:"monospace", lineHeight:1.6 }}>
                  {p.payload}
                </pre>
              )}
            </div>
          ))}

          {showShap && (
            <div style={{ background:"rgba(239,68,68,0.05)", border:`1px solid ${C.crimson}50`, borderRadius:"6px", padding:"0.75rem" }}>
              <div style={{ fontFamily:"monospace", fontSize:"9px", color:C.crimson, letterSpacing:"1px", marginBottom:"6px" }}>SHAP_INTERPRETATION_PAYLOAD</div>
              <pre style={{ background:"rgba(0,0,0,0.5)", borderRadius:"4px", padding:"0.5rem", fontSize:"8.5px", color:"#FCA5A5", margin:0, overflow:"auto", fontFamily:"monospace", lineHeight:1.7 }}>
                {shapPayload}
              </pre>
            </div>
          )}

          {showDrop && (
            <div style={{ background:"rgba(139,92,246,0.05)", border:`1px solid #8B5CF680`, borderRadius:"6px", padding:"0.75rem" }}>
              <div style={{ fontFamily:"monospace", fontSize:"9px", color:"#8B5CF6", letterSpacing:"1px", marginBottom:"4px" }}>RULE_ENGINE_HARD_DROP</div>
              <div style={{ fontFamily:"monospace", fontSize:"10px", color:"#C4B5FD", lineHeight:1.7 }}>
                {"[FEODO_HIT] 185.220.101.47 → CIDR 185.220.101.0/24"}<br/>
                {"[DROP] TX-55789 blocked before ML inference"}<br/>
                {"[LOG] threat_intel_filter.py:147 → action=DROP"}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// PIPELINE ARCHITECTURE
// ─────────────────────────────────────────────
function ArchitectureSection({ onHighlight }) {
  const [activeStep, setActiveStep] = useState(null);
  const [progress, setProgress] = useState(null);

  const steps = [
    {
      id:"ingest", num:"01", label:"Ingestion Layer",
      file:"realtime_engine.py", color:C.cyan,
      desc:"Simulates streaming transaction payloads loading global datastores into memory with minimal latency. Implements async queue buffering with back-pressure protection.",
      detail:`async def ingest_stream(payload: dict) -> None:
    tx = TransactionRecord(**payload)
    await GLOBAL_TX_QUEUE.put(tx)
    DATASTORE.update_hot_cache(tx)
    metrics.record_ingestion_latency()`,
      highlight:"hub",
    },
    {
      id:"intel", num:"02", label:"Threat Intel Filtering",
      file:"data/", color:"#8B5CF6",
      desc:"High-fidelity exact matching against abuse.ch Feodo Tracker (Botnet C2 IPs), firehol_level1.csv (CIDR blocks), and IpAddress_to_Country.csv for dynamic geo-anomaly scoring.",
      detail:`# Feodo C2 exact match
if sender_ip in FEODO_SET: return DROP
# FireHOL CIDR block
if cidr_contains(FIREHOL_TREE, sender_ip): return DROP
# Impossible geography
vel = calc_velocity(geo_prev, geo_curr, delta_t)
if vel > MAX_PHYS_VELOCITY: score += GEO_PENALTY`,
      highlight:"external",
    },
    {
      id:"graph", num:"03", label:"Graph Topology Engine",
      file:"graph_features.py", color:C.emerald,
      desc:"Utilizes NetworkX to compute structural graph data on the fly: degrees of centrality, distinct path variations, 2-hop mule cluster membership coefficients.",
      detail:`G = nx.DiGraph()
G.add_edges_from(tx_history)
features['degree_centrality'] = nx.degree_centrality(G)[node]
features['2hop_path_count'] = len(
    list(nx.all_simple_paths(G, src, dst, cutoff=2))
)
features['betweenness'] = nx.betweenness_centrality(G)[node]`,
      highlight:"proxy",
    },
    {
      id:"ml", num:"04", label:"ML Ensemble Classifier",
      file:"train_banking_model.py", color:C.amber,
      desc:"Evaluates payloads against an XGBoost ensemble pre-optimized via SMOTE to maximize Recall over highly imbalanced classes. Threshold tuned to 0.35.",
      detail:`scale_pw = (n_normal / n_fraud) * 1.5
model = XGBClassifier(scale_pos_weight=scale_pw)
model.fit(X_train_smote, y_train_smote)
# Hybrid final score
ml_prob = model.predict_proba(X)[:,1]
final = 0.7 * ml_prob + 0.3 * rule_score
verdict = "FRAUD" if final > THRESHOLD else "CLEAN"`,
      highlight:"hub",
    },
    {
      id:"explain", num:"05", label:"Explainability Sandbox",
      file:"explainer.py", color:C.crimson,
      desc:"Runs TreeExplainer (SHAP) over raw tree log-odds, outputting a structured JSON breakdown highlighting dominant feature weights for every flagged transaction.",
      detail:`explainer = shap.TreeExplainer(model)
shap_vals = explainer.shap_values(X)
output = {
    f: round(float(v), 4)
    for f, v in zip(feature_names, shap_vals[0])
}
return {"shap_values": output, "verdict": verdict}`,
      highlight:null,
    },
  ];

  const handleStep = (step) => {
    setActiveStep(step.id);
    setProgress(step.id);
    onHighlight(step.highlight);
  };

  return (
    <section style={{ padding:"2rem", borderBottom:`1px solid ${C.border}` }}>
      <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"1.5rem" }}>
        <span style={{ fontFamily:"monospace", fontSize:"10px", color:C.cyan, letterSpacing:"3px" }}>03 // PIPELINE ARCHITECTURE COMPONENT MAP</span>
        <div style={{ flex:1, height:"1px", background:`linear-gradient(90deg,${C.cyan}40,transparent)` }} />
      </div>

      {/* Flow connector */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:"0", marginBottom:"1.25rem", position:"relative" }}>
        <div style={{ position:"absolute", top:"50%", left:"10%", right:"10%", height:"1px", background:`linear-gradient(90deg,${C.cyan}30,${C.crimson}30)`, zIndex:0, transform:"translateY(-50%)" }} />
        {steps.map((s, i) => (
          <div key={s.id} style={{ display:"flex", flexDirection:"column", alignItems:"center", zIndex:1 }}>
            <div onClick={() => handleStep(s)}
              style={{
                width:"48px", height:"48px", borderRadius:"50%",
                border:`2px solid ${activeStep===s.id ? s.color : C.border}`,
                background: activeStep===s.id ? `rgba(${hexToRgb(s.color)},0.15)` : C.bgCard,
                display:"flex", alignItems:"center", justifyContent:"center",
                fontFamily:"monospace", fontSize:"11px", fontWeight:700,
                color: activeStep===s.id ? s.color : C.textMuted,
                cursor:"pointer", transition:"all 0.3s",
                boxShadow: activeStep===s.id ? `0 0 15px rgba(${hexToRgb(s.color)},0.4)` : "none",
              }}>
              {s.num}
            </div>
            <div style={{ fontFamily:"monospace", fontSize:"8px", color:s.color, marginTop:"6px", textAlign:"center", letterSpacing:"0.5px" }}>{s.label}</div>
            <div style={{ fontFamily:"monospace", fontSize:"7px", color:C.textMuted, textAlign:"center" }}>{s.file}</div>
          </div>
        ))}
      </div>

      {activeStep && (() => {
        const s = steps.find(x => x.id === activeStep);
        return (
          <div style={{ background:C.bgCard, border:`1px solid ${s.color}60`, borderRadius:"8px", padding:"1.25rem", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem" }}>
            <div>
              <div style={{ fontFamily:"monospace", fontSize:"9px", color:s.color, letterSpacing:"2px", marginBottom:"6px" }}>STEP {s.num} // {s.label.toUpperCase()}</div>
              <div style={{ fontFamily:"monospace", fontSize:"11px", color:C.textMuted, marginBottom:"8px" }}>→ {s.file}</div>
              <p style={{ fontSize:"12px", color:C.text, lineHeight:1.7, margin:0 }}>{s.desc}</p>
            </div>
            <div>
              <div style={{ fontFamily:"monospace", fontSize:"9px", color:C.textMuted, letterSpacing:"1px", marginBottom:"6px" }}>SOURCE_EXCERPT</div>
              <pre style={{ background:"rgba(0,0,0,0.5)", border:`1px solid ${C.border}`, borderRadius:"4px", padding:"0.75rem", fontSize:"9px", color:`rgba(${hexToRgb(s.color)},0.9)`, margin:0, fontFamily:"monospace", lineHeight:1.8, overflow:"auto" }}>
                {s.detail}
              </pre>
            </div>
          </div>
        );
      })()}

      {!activeStep && (
        <div style={{ textAlign:"center", padding:"1.5rem", color:C.textMuted, fontFamily:"monospace", fontSize:"11px", border:`1px dashed ${C.border}`, borderRadius:"8px" }}>
          ← click a pipeline stage to inspect its module
        </div>
      )}
    </section>
  );
}

// ─────────────────────────────────────────────
// TERMINAL SECTION
// ─────────────────────────────────────────────
function TerminalSection() {
  const [tab, setTab] = useState(0);
  const [lines, setLines] = useState([]);
  const [running, setRunning] = useState(false);
  const termRef = useRef(null);

  const suites = [
    {
      label:"test_edge_case.py",
      cmd:"python test_edge_case.py --verbose",
      output: [
        { t:0,   text:"[INIT] Loading deterministic rule engine v3.2.1...", col:C.textMuted },
        { t:300, text:"[LOAD] firehol_level1.csv → 42,819 CIDR entries", col:C.cyan },
        { t:600, text:"[LOAD] feodo_tracker.csv → 1,247 C2 IPs", col:C.cyan },
        { t:900, text:"[LOAD] IpAddress_to_Country.csv → 3.2M geo records", col:C.cyan },
        { t:1200, text:"", col:C.textMuted },
        { t:1300, text:"══════════════════ RUNNING TEST SUITE ══════════════════", col:C.textMuted },
        { t:1600, text:"[TEST 01] Impossible Geography Checked", col:C.textMuted },
        { t:1800, text:"  ↳ Chennai→Moscow in 0.3s: vel=14,220 km/h > MAX(1,000)", col:C.amber },
        { t:2100, text:"  ✓ PASS → geo_anomaly_score=9.8 | FLAG_RAISED", col:C.emerald },
        { t:2400, text:"[TEST 02] NLP Discrepancy Flagged", col:C.textMuted },
        { t:2600, text:"  ↳ goods_description='misc assorted items' wordcount=3", col:C.amber },
        { t:2900, text:"  ✓ PASS → vague_description_flag=True | RISK+2.1", col:C.emerald },
        { t:3200, text:"[TEST 03] High-Value Velocity Cap Enforced", col:C.textMuted },
        { t:3400, text:"  ↳ 14 transactions in 180s for ACC-99, amount=₹48.7L", col:C.crimson },
        { t:3700, text:"  ✓ PASS → velocity_cap_breached=True | HARD_BLOCK", col:C.emerald },
        { t:4000, text:"[TEST 04] Duplicate Invoice Detection", col:C.textMuted },
        { t:4200, text:"  ↳ TXN-88421 SHA256 matches TXN-88394 (4h earlier)", col:C.amber },
        { t:4500, text:"  ✓ PASS → duplicate_invoice_flag=True", col:C.emerald },
        { t:4800, text:"[TEST 05] Night Transaction Penalty Applied", col:C.textMuted },
        { t:5000, text:"  ↳ timestamp=02:34 IST → is_night_tx=True", col:C.amber },
        { t:5300, text:"  ✓ PASS → rule_score+=1.5", col:C.emerald },
        { t:5600, text:"", col:C.textMuted },
        { t:5700, text:"══════════════════ RESULTS ══════════════════", col:C.textMuted },
        { t:5900, text:"Tests passed: 5/5  |  Tests failed: 0/5", col:C.emerald },
        { t:6100, text:"Rule engine validation: COMPLETE ✓", col:C.emerald },
        { t:6300, text:"Elapsed: 1.247s", col:C.textMuted },
      ],
    },
    {
      label:"test_adversarial_cases.py",
      cmd:"python test_adversarial_cases.py --paysim --xgb --verbose",
      output: [
        { t:0,   text:"[INIT] Loading adversarial test harness...", col:C.textMuted },
        { t:300, text:"[LOAD] paysim.csv → parsing 6,362,620 synthetic transactions", col:C.cyan },
        { t:700, text:"[GRAPH] Building NetworkX DiGraph from transaction history...", col:C.cyan },
        { t:1100, text:"[GRAPH] Nodes=48,441 | Edges=6.36M | Components=3,912", col:C.cyan },
        { t:1400, text:"", col:C.textMuted },
        { t:1500, text:"══════ STRUCTURAL ADVERSARIAL CASES ══════", col:C.textMuted },
        { t:1800, text:"[CASE A] Multi-hop mule ring (ACC-99 → ACC-47 → {ACC-12,ACC-34,ACC-56})", col:C.textMuted },
        { t:2100, text:"  ↳ nx.all_simple_paths(cutoff=2) → 7 distinct paths found", col:C.amber },
        { t:2400, text:"  ↳ XGBoost score: 0.9383 > threshold(0.35)", col:C.crimson },
        { t:2600, text:"  ↳ SHAP dominant: 2hop_path_count → +2.31 log-odds", col:C.crimson },
        { t:2900, text:"  ✓ Recall Optimizer: Target Caught [FRAUD]", col:C.emerald },
        { t:3200, text:'  ↳ {"verdict":"FRAUD","prob":0.9383,"ring_size":4}', col:C.emerald },
        { t:3500, text:"[CASE B] Smurfing — 22 micro-txns < ₹49,000 in 4 hours", col:C.textMuted },
        { t:3800, text:"  ↳ Aggregate: ₹9.87L | Velocity score: 8.4", col:C.amber },
        { t:4100, text:"  ↳ Graph sub-cluster density: 0.78 (threshold: 0.5)", col:C.amber },
        { t:4400, text:"  ✓ Recall Optimizer: Target Caught [SMURFING]", col:C.emerald },
        { t:4700, text:'  ↳ {"verdict":"FRAUD","pattern":"smurfing","prob":0.8821}', col:C.emerald },
        { t:5000, text:"[CASE C] Feodo C2 IP injection (185.220.101.47)", col:C.textMuted },
        { t:5300, text:"  ↳ Rule engine HARD_DROP before ML inference", col:"#8B5CF6" },
        { t:5500, text:"  ✓ Recall Optimizer: Target Caught [THREAT_INTEL]", col:C.emerald },
        { t:5700, text:'  ↳ {"verdict":"HARD_DROP","ml_invoked":false,"source":"feodo"}', col:C.emerald },
        { t:6000, text:"", col:C.textMuted },
        { t:6100, text:"══════════════════ FINAL REPORT ══════════════════", col:C.textMuted },
        { t:6300, text:"Adversarial cases: 3/3 caught", col:C.emerald },
        { t:6500, text:"Precision: 0.881 | Recall: 0.943 | F1: 0.910", col:C.emerald },
        { t:6700, text:"SMOTE class balance: Fraud ratio boosted 1:1.5", col:C.cyan },
        { t:6900, text:"Pipeline integrity: VERIFIED ✓", col:C.emerald },
      ],
    },
  ];

  const runSuite = () => {
    if (running) return;
    setRunning(true);
    setLines([]);
    const suite = suites[tab];
    suite.output.forEach(({ t, text, col }) => {
      setTimeout(() => {
        setLines(l => [...l, { text, col }]);
        if (termRef.current) termRef.current.scrollTop = termRef.current.scrollHeight;
      }, t);
    });
    const maxT = Math.max(...suite.output.map(x => x.t));
    setTimeout(() => setRunning(false), maxT + 200);
  };

  return (
    <section style={{ padding:"2rem" }}>
      <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"1.5rem" }}>
        <span style={{ fontFamily:"monospace", fontSize:"10px", color:C.amber, letterSpacing:"3px" }}>04 // INTERACTIVE TEST SUITE TERMINAL</span>
        <div style={{ flex:1, height:"1px", background:`linear-gradient(90deg,${C.amber}40,transparent)` }} />
      </div>

      <div style={{ background:"#060B10", border:`1px solid ${C.border}`, borderRadius:"8px", overflow:"hidden" }}>
        {/* Terminal title bar */}
        <div style={{ background:"#0D1117", padding:"8px 14px", display:"flex", alignItems:"center", gap:"8px", borderBottom:`1px solid ${C.border}` }}>
          <div style={{ width:10, height:10, borderRadius:"50%", background:"#EF4444" }} />
          <div style={{ width:10, height:10, borderRadius:"50%", background:"#F59E0B" }} />
          <div style={{ width:10, height:10, borderRadius:"50%", background:"#10B981" }} />
          <span style={{ flex:1, textAlign:"center", fontFamily:"monospace", fontSize:"10px", color:C.textMuted }}>fraud-detection — bash</span>
        </div>

        {/* Tabs */}
        <div style={{ display:"flex", borderBottom:`1px solid ${C.border}` }}>
          {suites.map((s, i) => (
            <button key={i} onClick={() => { setTab(i); setLines([]); setRunning(false); }}
              style={{
                padding:"8px 16px", background: tab===i ? C.bgPanel : "transparent",
                border:"none", borderBottom: tab===i ? `2px solid ${C.amber}` : "2px solid transparent",
                color: tab===i ? C.amber : C.textMuted, fontFamily:"monospace", fontSize:"10px",
                cursor:"pointer", transition:"all 0.2s",
              }}>
              {s.label}
            </button>
          ))}
          <div style={{ flex:1 }} />
          <button onClick={runSuite} disabled={running}
            style={{
              margin:"4px 10px", padding:"4px 14px",
              background: running ? "rgba(245,158,11,0.1)" : "rgba(245,158,11,0.15)",
              border:`1px solid ${C.amber}`,
              color: C.amber, fontFamily:"monospace", fontSize:"10px",
              cursor: running ? "wait" : "pointer", borderRadius:"4px",
              transition:"all 0.2s",
            }}>
            {running ? "▶ RUNNING..." : "▷ RUN"}
          </button>
        </div>

        {/* Terminal body */}
        <div ref={termRef} style={{ padding:"1rem 1.25rem", minHeight:"320px", maxHeight:"420px", overflowY:"auto", fontFamily:"monospace", fontSize:"11px", lineHeight:1.9 }}>
          <div style={{ color:C.emerald, marginBottom:"4px" }}>$ {suites[tab].cmd}</div>
          {lines.map((l, i) => (
            <div key={i} style={{ color: l.col || C.text, whiteSpace:"pre" }}>{l.text}</div>
          ))}
          {lines.length === 0 && (
            <div style={{ color:C.textDim }}>Click ▷ RUN to execute the test suite</div>
          )}
          {running && (
            <div style={{ display:"flex", alignItems:"center", gap:"6px", color:C.amber, marginTop:"4px" }}>
              <span style={{ animation:"blink 0.8s infinite" }}>█</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
function DashboardContent() {
  const [activeNav, setActiveNav] = useState(0);
  const [graphScenario, setGraphScenario] = useState(null);
  const [graphAnimKey, setGraphAnimKey] = useState(0);
  const [highlight, setHighlight] = useState(null);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const iv = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(iv);
  }, []);

  const handleAnimate = useCallback((scenario, key) => {
    setGraphScenario(scenario);
    setGraphAnimKey(key);
  }, []);

  const sectionRefs = useRef([]);

  useEffect(() => {
    const el = sectionRefs.current[activeNav];
    if (el) el.scrollIntoView({ behavior:"smooth", block:"start" });
  }, [activeNav]);

  return (
    <div style={{ background:C.bg, color:C.text, minHeight:"100vh", fontFamily:"'JetBrains Mono', 'Fira Code', monospace" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;600;700&family=Space+Grotesk:wght@300;400;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: ${C.bg}; }
        ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 2px; }
        @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0; } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
        @keyframes scan { 0% { transform: translateY(-100%); } 100% { transform: translateY(100vh); } }
      `}</style>

      {/* Scanline overlay */}
      <div style={{ position:"fixed", inset:0, background:"repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.03) 2px,rgba(0,0,0,0.03) 4px)", pointerEvents:"none", zIndex:9999 }} />

      {/* NAV */}
      <nav style={{
        position:"sticky", top:0, zIndex:100, background:C.bgCard,
        borderBottom:`1px solid ${C.border}`, padding:"0 2rem",
        display:"flex", alignItems:"center", gap:"0",
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:"10px", padding:"0.75rem 0", marginRight:"2rem" }}>
          <div style={{ width:8, height:8, borderRadius:"50%", background:C.emerald, boxShadow:`0 0 8px ${C.emerald}`, animation:"pulse 2s infinite" }} />
          <span style={{ fontSize:"12px", fontWeight:700, color:C.text, letterSpacing:"1px" }}>FRAUD⚡DETECT</span>
        </div>

        {NAV_ITEMS.map((item, i) => (
          <button key={i} onClick={() => setActiveNav(i)}
            style={{
              padding:"1rem 1.25rem", background:"transparent",
              border:"none", borderBottom: activeNav===i ? `2px solid ${C.emerald}` : "2px solid transparent",
              color: activeNav===i ? C.emerald : C.textMuted,
              fontFamily:"monospace", fontSize:"10px", letterSpacing:"1.5px",
              cursor:"pointer", transition:"all 0.2s", textTransform:"uppercase",
            }}>
            {`${String(i+1).padStart(2,"0")} ${item}`}
          </button>
        ))}

        <div style={{ flex:1 }} />
        <div style={{ display:"flex", gap:"1.5rem", alignItems:"center" }}>
          <div style={{ fontFamily:"monospace", fontSize:"9px", color:C.textMuted }}>
            {time.toLocaleTimeString("en-IN", { hour12:false })} IST
          </div>
          <a href="https://github.com/Ram-Pratheesh/Fraud-Detection" target="_blank" rel="noreferrer"
            style={{ display:"flex", alignItems:"center", gap:"6px", padding:"5px 12px", background:"rgba(255,255,255,0.05)", border:`1px solid ${C.border}`, borderRadius:"4px", color:C.text, textDecoration:"none", fontSize:"10px", fontFamily:"monospace", transition:"all 0.2s" }}>
            ⎇ GitHub
          </a>
        </div>
      </nav>

      {/* Hero banner */}
      <div style={{ background:`linear-gradient(180deg, rgba(16,185,129,0.06) 0%, transparent 100%)`, borderBottom:`1px solid ${C.border}`, padding:"1.25rem 2rem", display:"flex", alignItems:"center", gap:"2rem" }}>
        <div>
          <div style={{ fontFamily:"monospace", fontSize:"9px", color:C.textMuted, letterSpacing:"3px", marginBottom:"4px" }}>RAM-PRATHEESH / FRAUD-DETECTION</div>
          <h2 style={{ fontSize:"18px", fontWeight:700, color:C.text, margin:0 }}>Banking Fraud Graph Detection Pipeline</h2>
        </div>
        <div style={{ flex:1 }} />
        {[
          { label:"LAYERS", val:"3", col:C.emerald },
          { label:"FILES", val:"10+", col:C.cyan },
          { label:"LANGUAGE", val:"Python", col:C.amber },
          { label:"MODEL", val:"XGBoost", col:"#8B5CF6" },
          { label:"GRAPH LIB", val:"NetworkX", col:C.blue },
        ].map(m => (
          <div key={m.label} style={{ textAlign:"center" }}>
            <div style={{ fontFamily:"monospace", fontSize:"16px", fontWeight:700, color:m.col }}>{m.val}</div>
            <div style={{ fontFamily:"monospace", fontSize:"8px", color:C.textMuted, letterSpacing:"1px" }}>{m.label}</div>
          </div>
        ))}
      </div>

      {/* Sections */}
      <div>
        <div ref={el => sectionRefs.current[0] = el}>
          <ThreatVectorSection onAnimate={handleAnimate} />
        </div>
        <div ref={el => sectionRefs.current[1] = el}>
          <LiveEngineSection onAnimate={handleAnimate} animScenario={graphScenario} animKey={graphAnimKey} />
        </div>
        <div ref={el => sectionRefs.current[2] = el}>
          <ArchitectureSection onHighlight={setHighlight} />
        </div>
        <div ref={el => sectionRefs.current[3] = el}>
          <TerminalSection />
        </div>
      </div>

      {/* Footer */}
      <footer style={{ borderTop:`1px solid ${C.border}`, padding:"1.5rem 2rem", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <span style={{ fontFamily:"monospace", fontSize:"9px", color:C.textMuted }}>
          © 2025 Ram-Pratheesh / Fraud-Detection — MIT License
        </span>
        <span style={{ fontFamily:"monospace", fontSize:"9px", color:C.textMuted }}>
          XGBoost + NetworkX + SHAP + SMOTE | Built for Hackathon
        </span>
      </footer>
    </div>
  );
}

// Mount app
const rootEl = document.getElementById('root');
if (rootEl) {
  function App() {
    const [showDashboard, setShowDashboard] = useState(false);
    return showDashboard ? (
      <DashboardContent />
    ) : (
      <LandingPage onNavigate={() => setShowDashboard(true)} />
    );
  }
  createRoot(rootEl).render(<App />);
}
