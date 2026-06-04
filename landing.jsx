import React, { useState, useEffect } from "react";

// Color palette aligned with existing codebase
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
  green: "#10B981",
  text: "#E2E8F0",
  textMuted: "#64748B",
  textDim: "#334155",
};

// Hero Section
function Hero({ onNavigate }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "8rem 2rem 4rem", position: "relative", overflow: "hidden", background: C.bg }}>
      {/* Grid background */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `linear-gradient(rgba(6,182,212,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.03) 1px, transparent 1px)`, backgroundSize: "60px 60px", mask: "radial-gradient(ellipse at center, black 30%, transparent 80%)" }}></div>

      {/* Status badge */}
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.18em", color: C.crimson, border: `1px solid rgba(239,68,68,0.3)`, background: "rgba(239,68,68,0.07)", padding: "0.35rem 1rem", borderRadius: "2px", marginBottom: "2.5rem", animation: "fadeUp 0.5s ease both" }}>
        ● LIVE SYSTEM · FINANCIAL FRAUD DETECTION
      </div>

      {/* Main heading */}
      <h1 style={{ fontSize: "clamp(3rem, 9vw, 7rem)", fontWeight: 900, lineHeight: 0.95, letterSpacing: "-0.03em", animation: "fadeUp 0.5s 0.1s ease both", color: C.text }}>
        Catch fraud.<br /><span style={{ color: C.cyan, textShadow: `0 0 40px rgba(6,182,212,0.25)`, fontStyle: "normal" }}>Explain</span> it.
      </h1>

      {/* Subheading */}
      <p style={{ maxWidth: "600px", fontSize: "1.1rem", fontWeight: 300, lineHeight: 1.75, color: C.textMuted, marginTop: "1.75rem", animation: "fadeUp 0.5s 0.2s ease both" }}>
        A multi-layer AI agent for financial fraud detection — combining rule-based triggers, graph neural networks, XGBoost classification, and SHAP explainability into one unified investigator.
      </p>

      {/* Stats */}
      <div style={{ display: "flex", gap: "3rem", marginTop: "3.5rem", animation: "fadeUp 0.5s 0.3s ease both" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "2.2rem", fontWeight: 700, lineHeight: 1, letterSpacing: "-0.02em", color: C.crimson }}>6</div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.12em", color: C.textMuted, marginTop: "0.3rem" }}>RULE CATEGORIES</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "2.2rem", fontWeight: 700, lineHeight: 1, letterSpacing: "-0.02em", color: C.cyan }}>4</div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.12em", color: C.textMuted, marginTop: "0.3rem" }}>PARALLEL MODULES</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "2.2rem", fontWeight: 700, lineHeight: 1, letterSpacing: "-0.02em", color: C.amber }}>~30s</div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.12em", color: C.textMuted, marginTop: "0.3rem" }}>ANALYST REVIEW TIME</div>
        </div>
      </div>

      {/* CTA Button */}
      <button
        onClick={onNavigate}
        style={{
          marginTop: "3rem",
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.72rem",
          letterSpacing: "0.08em",
          padding: "0.75rem 1.75rem",
          border: `1px solid ${C.cyan}`,
          borderRadius: "3px",
          background: `rgba(6,182,212,0.1)`,
          color: C.cyan,
          cursor: "pointer",
          transition: "all 0.2s",
          textTransform: "uppercase",
        }}
        onMouseEnter={(e) => {
          e.target.style.background = `rgba(6,182,212,0.2)`;
          e.target.style.borderColor = C.cyan;
        }}
        onMouseLeave={(e) => {
          e.target.style.background = `rgba(6,182,212,0.1)`;
        }}
      >
        → Launch Dashboard
      </button>

      {/* Scroll indicator */}
      <div style={{ position: "absolute", bottom: "2.5rem", left: "50%", transform: "translateX(-50%)", fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.15em", color: C.textDim, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", animation: "bounce 2.5s infinite" }}>
        SCROLL ↓
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(6px); }
        }
      `}</style>
    </div>
  );
}

// Problem Section
function Problem() {
  return (
    <div style={{ padding: "6rem 2rem", maxWidth: "1140px", margin: "0 auto", background: C.bg }}>
      {/* Section header */}
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.22em", color: C.textMuted, textTransform: "uppercase", marginBottom: "0.6rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <span style={{ display: "inline-block", width: "20px", height: "1px", background: C.textMuted }}></span>
        01 / THE PROBLEM
      </div>

      <h2 style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "0.75rem", color: C.text }}>
        Detection isn't the gap.<br />Explanation is.
      </h2>

      <p style={{ fontSize: "1rem", color: C.textMuted, lineHeight: 1.7, maxWidth: "640px", marginBottom: "3.5rem" }}>
        Regulators don't just want alerts — they demand written justification for every suspicious flag. Most systems can find the needle; almost none can tell you why it matters.
      </p>

      {/* Problem banner */}
      <div style={{ background: C.bgCard, border: `1px solid rgba(239,68,68,0.2)`, borderLeft: `3px solid ${C.crimson}`, padding: "1.75rem 2rem", borderRadius: "2px", marginBottom: "4rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(239,68,68,0.08)", pointerEvents: "none" }}></div>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.2em", color: C.crimson, marginBottom: "0.6rem", position: "relative", zIndex: 1 }}>
          ● REAL-WORLD FAILURE CASE
        </div>
        <p style={{ fontSize: "1.05rem", lineHeight: 1.65, color: C.textMuted, maxWidth: "820px", position: "relative", zIndex: 1 }}>
          Wells Fargo spent <strong style={{ color: C.text, fontWeight: 600 }}>billions on people and systems</strong>, yet their suspicious activity reports were still ruled deficient — investigators could flag transactions but couldn't produce adequate written explanations of why they were suspicious. <strong style={{ color: C.text, fontWeight: 600 }}>That's precisely the interpretability gap this system solves.</strong>
        </p>
      </div>

      {/* Gap comparison */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
        <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: "4px", padding: "1.5rem" }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.18em", marginBottom: "1rem", padding: "0.3rem 0.75rem", borderRadius: "2px", display: "inline-block", background: "rgba(239,68,68,0.1)", color: C.crimson, border: `1px solid rgba(239,68,68,0.25)` }}>
            BEFORE SENTINEL
          </div>
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", padding: "0.6rem 0", borderBottom: `1px solid ${C.border}`, fontSize: "0.88rem", color: C.textMuted, lineHeight: 1.5 }}>
            <span style={{ flex: "0 0 6px", width: "6px", height: "6px", borderRadius: "50%", marginTop: "0.45rem", background: C.crimson }}></span>
            Rule engine fires — analyst gets a transaction ID and a score
          </div>
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", padding: "0.6rem 0", borderBottom: `1px solid ${C.border}`, fontSize: "0.88rem", color: C.textMuted, lineHeight: 1.5 }}>
            <span style={{ flex: "0 0 6px", width: "6px", height: "6px", borderRadius: "50%", marginTop: "0.45rem", background: C.crimson }}></span>
            No context on why the score is high or which features drove it
          </div>
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", padding: "0.6rem 0", borderBottom: `1px solid ${C.border}`, fontSize: "0.88rem", color: C.textMuted, lineHeight: 1.5 }}>
            <span style={{ flex: "0 0 6px", width: "6px", height: "6px", borderRadius: "50%", marginTop: "0.45rem", background: C.crimson }}></span>
            Graph connections (shared IPs, mule paths) invisible to investigators
          </div>
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", padding: "0.6rem 0", fontSize: "0.88rem", color: C.textMuted, lineHeight: 1.5 }}>
            <span style={{ flex: "0 0 6px", width: "6px", height: "6px", borderRadius: "50%", marginTop: "0.45rem", background: C.crimson }}></span>
            Writing a Suspicious Activity Report takes 30+ minutes per case
          </div>
        </div>

        <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: "4px", padding: "1.5rem" }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.18em", marginBottom: "1rem", padding: "0.3rem 0.75rem", borderRadius: "2px", display: "inline-block", background: "rgba(6,182,212,0.08)", color: C.cyan, border: `1px solid rgba(6,182,212,0.2)` }}>
            WITH SENTINEL
          </div>
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", padding: "0.6rem 0", borderBottom: `1px solid ${C.border}`, fontSize: "0.88rem", color: C.textMuted, lineHeight: 1.5 }}>
            <span style={{ flex: "0 0 6px", width: "6px", height: "6px", borderRadius: "50%", marginTop: "0.45rem", background: C.cyan }}></span>
            Alert fires with ranked SHAP feature contributions and human narrative
          </div>
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", padding: "0.6rem 0", borderBottom: `1px solid ${C.border}`, fontSize: "0.88rem", color: C.textMuted, lineHeight: 1.5 }}>
            <span style={{ flex: "0 0 6px", width: "6px", height: "6px", borderRadius: "50%", marginTop: "0.45rem", background: C.cyan }}></span>
            Graph module surfaces entity connections invisible to tabular rules
          </div>
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", padding: "0.6rem 0", borderBottom: `1px solid ${C.border}`, fontSize: "0.88rem", color: C.textMuted, lineHeight: 1.5 }}>
            <span style={{ flex: "0 0 6px", width: "6px", height: "6px", borderRadius: "50%", marginTop: "0.45rem", background: C.cyan }}></span>
            Three parallel scenario detectors run per transaction in real time
          </div>
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", padding: "0.6rem 0", fontSize: "0.88rem", color: C.textMuted, lineHeight: 1.5 }}>
            <span style={{ flex: "0 0 6px", width: "6px", height: "6px", borderRadius: "50%", marginTop: "0.45rem", background: C.cyan }}></span>
            SAR draft auto-generated — analyst review time under 30 seconds
          </div>
        </div>
      </div>

      <hr style={{ width: "100%", height: "1px", background: C.border, margin: "4rem 0" }} />
    </div>
  );
}

// Architecture Section
function Architecture() {
  const modules = [
    { num: "01", icon: "⚡", title: "Transaction Stream", desc: "Ingests live transaction events. Runs three parallel anomaly detectors — IP velocity, cross-border bursts, and high-value spikes — simultaneously." },
    { num: "02", icon: "🕸", title: "Graph Engine", desc: "Builds a NetworkX bipartite graph of accounts, IPs, and devices. Detects money-mule paths, shared infrastructure, and entity clustering." },
    { num: "03", icon: "🧠", title: "Detection Brain", desc: "XGBoost classifier trained on graph-enriched features with SMOTE rebalancing. Outputs a calibrated fraud probability per transaction." },
    { num: "04", icon: "📋", title: "XAI Translator", desc: "SHAP TreeExplainer converts the model score into a ranked feature list and generates a human-readable investigation narrative automatically." },
  ];

  return (
    <div style={{ padding: "6rem 2rem", maxWidth: "1140px", margin: "0 auto", background: C.bg }}>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.22em", color: C.textMuted, textTransform: "uppercase", marginBottom: "0.6rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <span style={{ display: "inline-block", width: "20px", height: "1px", background: C.textMuted }}></span>
        02 / SYSTEM ARCHITECTURE
      </div>

      <h2 style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "0.75rem", color: C.text }}>
        Four modules.<br />One pipeline.
      </h2>

      <p style={{ fontSize: "1rem", color: C.textMuted, lineHeight: 1.7, maxWidth: "640px", marginBottom: "3.5rem" }}>
        Each module owns a distinct concern and exposes a clean JSON contract, so teams can build in parallel and integrate on day one.
      </p>

      {/* Architecture flow */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, margin: "2.5rem 0", position: "relative" }}>
        {modules.map((mod, idx) => (
          <div key={idx} style={{ padding: "1.5rem 1.25rem", border: `1px solid ${C.border}`, borderRight: idx !== modules.length - 1 ? "none" : `1px solid ${C.border}`, position: "relative", background: C.bgCard, transition: "background 0.2s" }} onMouseEnter={(e) => e.target.style.background = "rgba(255,255,255,0.03)"} onMouseLeave={(e) => e.target.style.background = C.bgCard}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.2em", color: C.textDim, marginBottom: "0.75rem" }}>
              MODULE {mod.num}
            </div>
            <div style={{ fontSize: "1.4rem", marginBottom: "0.6rem" }}>{mod.icon}</div>
            <div style={{ fontSize: "0.85rem", fontWeight: 600, color: C.text, marginBottom: "0.5rem" }}>
              {mod.title}
            </div>
            <div style={{ fontSize: "0.78rem", color: C.textMuted, lineHeight: 1.55 }}>
              {mod.desc}
            </div>
            {idx < modules.length - 1 && (
              <div style={{ position: "absolute", right: "-10px", top: "50%", transform: "translateY(-50%)", width: "20px", height: "20px", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2, fontSize: "0.6rem", color: C.textMuted }}>
                →
              </div>
            )}
          </div>
        ))}
      </div>

      <hr style={{ width: "100%", height: "1px", background: C.border, margin: "4rem 0" }} />
    </div>
  );
}

// Detection Modules Section
function Detection() {
  const modules = [
    { color: "red", num: "01", title: "Rule Categories", desc: "Multi-layer rule engine with 6 distinct rule categories covering velocity, entity risk, transaction patterns, and network anomalies." },
    { color: "amber", num: "02", title: "Graph Detection", desc: "NetworkX bipartite graph linking accounts, IPs, and devices. Detects money-mule paths and entity clustering patterns." },
    { color: "cyan", num: "03", title: "ML Classification", desc: "XGBoost classifier trained on graph-enriched features with SMOTE rebalancing for fraud probability scoring." },
    { color: "green", num: "04", title: "Feature Importance", desc: "SHAP TreeExplainer converts model scores into ranked features and generates human-readable investigation narratives." },
  ];

  const colorMap = {
    red: C.crimson,
    amber: C.amber,
    cyan: C.cyan,
    green: C.green,
  };

  return (
    <div style={{ padding: "6rem 2rem", maxWidth: "1140px", margin: "0 auto", background: C.bg }}>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.22em", color: C.textMuted, textTransform: "uppercase", marginBottom: "0.6rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <span style={{ display: "inline-block", width: "20px", height: "1px", background: C.textMuted }}></span>
        03 / DETECTION LAYERS
      </div>

      <h2 style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "0.75rem", color: C.text }}>
        Rules catch patterns.<br />Models catch intent.
      </h2>

      <p style={{ fontSize: "1rem", color: C.textMuted, lineHeight: 1.7, maxWidth: "640px", marginBottom: "3.5rem" }}>
        Hybrid approach combining rule-based triggers with machine learning to detect both known patterns and novel fraud schemes.
      </p>

      {/* Detection modules grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" }}>
        {modules.map((mod, idx) => (
          <div key={idx} style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderTop: `2px solid ${colorMap[mod.color]}`, borderRadius: "4px", padding: "1.5rem", position: "relative", overflow: "hidden", transition: "border-color 0.3s, transform 0.3s" }} onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.2em", color: C.textDim, marginBottom: "0.75rem" }}>
              LAYER {mod.num}
            </div>
            <div style={{ fontSize: "0.95rem", fontWeight: 600, color: C.text, marginBottom: "0.5rem" }}>
              {mod.title}
            </div>
            <div style={{ fontSize: "0.82rem", color: C.textMuted, lineHeight: 1.6, marginBottom: "1rem" }}>
              {mod.desc}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.05em", padding: "0.2rem 0.55rem", borderRadius: "2px", background: "rgba(255,255,255,0.04)", border: `1px solid ${C.border}`, color: C.textMuted }}>
                Module
              </span>
            </div>
          </div>
        ))}
      </div>

      <hr style={{ width: "100%", height: "1px", background: C.border, margin: "4rem 0" }} />
    </div>
  );
}

// Impact Metrics Section
function Metrics() {
  const metrics = [
    { num: "94.2%", label: "FRAUD RECALL", color: "red" },
    { num: "98.7%", label: "TRUE POSITIVE RATE", color: "cyan" },
    { num: "~30s", label: "ANALYST REVIEW TIME", color: "amber" },
    { num: "4", label: "PARALLEL DETECTION MODULES", color: "green" },
  ];

  const colorMap = {
    red: C.crimson,
    amber: C.amber,
    cyan: C.cyan,
    green: C.green,
  };

  return (
    <div style={{ padding: "6rem 2rem", maxWidth: "1140px", margin: "0 auto", background: C.bg }}>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.22em", color: C.textMuted, textTransform: "uppercase", marginBottom: "0.6rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <span style={{ display: "inline-block", width: "20px", height: "1px", background: C.textMuted }}></span>
        04 / IMPACT METRICS
      </div>

      <h2 style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "0.75rem", color: C.text }}>
        By the numbers.
      </h2>

      {/* Metrics grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem", marginTop: "2.5rem" }}>
        {metrics.map((m, idx) => (
          <div key={idx} style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: "4px", padding: "1.5rem", textAlign: "center" }}>
            <div style={{ fontSize: "2.5rem", fontWeight: 700, lineHeight: 1, letterSpacing: "-0.03em", marginBottom: "0.5rem", color: colorMap[m.color] }}>
              {m.num}
            </div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.12em", color: C.textMuted }}>
              {m.label}
            </div>
          </div>
        ))}
      </div>

      <hr style={{ width: "100%", height: "1px", background: C.border, margin: "4rem 0" }} />
    </div>
  );
}

// Footer
function Footer() {
  return (
    <footer style={{ background: C.bgCard, borderTop: `1px solid ${C.border}`, padding: "3rem", textAlign: "center" }}>
      <div style={{ fontSize: "1.5rem", fontWeight: 700, letterSpacing: "0.15em", marginBottom: "0.5rem", color: C.text }}>
        SENTINEL
      </div>
      <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.1em", color: C.textMuted }}>
        AI-Powered Financial Fraud Detection · <a href="https://github.com/aksh-sush" target="_blank" rel="noreferrer" style={{ color: C.cyan, textDecoration: "none" }}>View on GitHub</a>
      </p>
    </footer>
  );
}

// Main Landing Page Component
export default function Landing({ onNavigate }) {
  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: "'Epilogue', sans-serif", overflow: "hidden" }}>
      <Hero onNavigate={onNavigate} />
      <Problem />
      <Architecture />
      <Detection />
      <Metrics />
      <Footer />

      {/* Global styles */}
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: ${C.bg}; color: ${C.text}; font-family: 'Epilogue', sans-serif; overflow-x: hidden; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(6px); }
        }
      `}</style>
    </div>
  );
}
