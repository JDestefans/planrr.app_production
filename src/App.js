/**
 * PLANRR.APP — COMPLETE DESIGN OVERHAUL
 * ─────────────────────────────────────────────────────────────────────────────
 * This file contains:
 *   1. DESIGN_TOKENS   — unified token system (colors, typography, spacing)
 *   2. GLOBAL_CSS      — drop-in <style> tag for in-app continuity
 *   3. LandingPage     — rebuilt landing page with premium typography
 *   4. AuthScreen      — fixed modal (no jank animation)
 *   5. AppShell CSS    — in-app topbar / sidebar refinements
 * ─────────────────────────────────────────────────────────────────────────────
 * FONTS USED:
 *   - Syne              → wordmarks, hero headlines (same as marketing)
 *   - DM Mono           → labels, tags, monospace accents
 *   - DM Sans           → body, UI text (same as current app)
 *   - Oxanium           → "planrr.app" wordmark (Bold)
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useState, useEffect, useRef, useCallback } from "react";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const T = {
  // Brand palette
  teal:        "#3ECFCF",
  tealDark:    "#2BAEAE",
  tealLight:   "rgba(62,207,207,0.08)",
  gold:        "#C49A3C",
  goldLight:   "rgba(196,154,60,0.08)",
  goldBright:  "#D4AA5A",

  // Darks (in-app)
  sidebar:     "#1A1F2E",
  sidebarMid:  "#242B3D",
  sidebarBdr:  "#2A3550",
  sidebarMute: "#64748B",

  // Lights (in-app)
  bg:          "#F2F5F7",
  card:        "#FFFFFF",
  border:      "#E2E8EA",
  text:        "#111827",
  muted:       "#374151",
  faint:       "#6B7280",

  // Semantic
  green:  "#22C55E",
  amber:  "#F59E0B",
  red:    "#EF4444",
  blue:   "#3B82F6",
  purple: "#8B5CF6",

  // Landing (dark theme)
  land_bg:     "#0E0E0E",
  land_surface:"rgba(20,20,20,0.96)",
  land_border: "rgba(196,154,60,0.18)",
  land_text:   "#F0F4FA",
  land_muted:  "#8A9BB0",
  land_faint:  "#475569",
  land_dim:    "#2E3439",
};

// ─── GLOBAL CSS PATCH (inject into app's <head>) ──────────────────────────────
export const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,700;9..40,800&family=DM+Mono:wght@400;500&family=Syne:wght@700;800;900&family=Oxanium:wght@700;800&display=swap');

:root {
  --teal:       #3ECFCF;
  --teal-dark:  #2BAEAE;
  --gold:       #C49A3C;
  --gold-light: rgba(196,154,60,0.08);
  --border:     #E2E8EA;
  --text:       #111827;
  --muted:      #374151;
  --faint:      #6B7280;
  --card:       #FFFFFF;
  --sidebar:    #1A1F2E;

  /* Typography */
  --font-body:    'DM Sans', sans-serif;
  --font-display: 'Syne', 'DM Sans', sans-serif;
  --font-mono:    'DM Mono', monospace;
  --font-mark:    'Oxanium', 'DM Sans', sans-serif;

  /* Spacing scale */
  --space-1: 4px;  --space-2: 8px;  --space-3: 12px;
  --space-4: 16px; --space-5: 20px; --space-6: 24px;
  --space-8: 32px; --space-10: 40px; --space-12: 48px;

  /* Radius */
  --r-sm: 6px; --r-md: 10px; --r-lg: 14px; --r-xl: 18px;

  /* Transitions */
  --ease: cubic-bezier(0.4, 0, 0.2, 1);
  --dur: 0.18s;
}

* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: var(--font-body); }

/* ─── WORDMARK ─── */
.planrr-wordmark {
  font-family: var(--font-mark);
  font-weight: 800;
  letter-spacing: -0.3px;
  line-height: 1;
}
.planrr-wordmark .dot-app { color: var(--gold); }

/* ─── HEADLINE STYLE ─── */
.planrr-headline {
  font-family: var(--font-display);
  font-weight: 800;
  letter-spacing: -2px;
  line-height: 1.02;
}

/* ─── MONO LABEL ─── */
.planrr-mono-label {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-weight: 500;
}

/* ─── IN-APP TOPBAR REFINEMENTS ─── */
#planrr-topbar {
  background: rgba(242, 245, 247, 0.94) !important;
  backdrop-filter: blur(16px) saturate(1.4) !important;
  -webkit-backdrop-filter: blur(16px) saturate(1.4) !important;
  border-bottom: 1px solid rgba(226,232,234,0.7) !important;
  box-shadow: 0 1px 0 rgba(0,0,0,0.04) !important;
}

/* ─── IN-APP SIDEBAR REFINEMENTS ─── */
#planrr-sidebar {
  background: linear-gradient(180deg, #1A1F2E 0%, #161B28 100%) !important;
}
#planrr-sidebar::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 120% 60% at 50% 0%, rgba(62,207,207,0.06) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
}

/* ─── CARD REFINEMENTS ─── */
.planrr-card-elevated {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
  box-shadow:
    0 1px 2px rgba(0,0,0,0.04),
    0 4px 16px rgba(0,0,0,0.03),
    inset 0 1px 0 rgba(255,255,255,0.8);
  transition: box-shadow var(--dur) var(--ease), border-color var(--dur) var(--ease);
}
.planrr-card-elevated:hover {
  box-shadow:
    0 2px 4px rgba(0,0,0,0.06),
    0 8px 24px rgba(0,0,0,0.06);
  border-color: rgba(62,207,207,0.25);
}

/* ─── BUTTON REFINEMENTS ─── */
.planrr-btn-primary {
  background: var(--teal) !important;
  box-shadow: 0 2px 8px rgba(62,207,207,0.25), inset 0 1px 0 rgba(255,255,255,0.15) !important;
  transition: all var(--dur) var(--ease) !important;
}
.planrr-btn-primary:hover {
  background: var(--teal-dark) !important;
  box-shadow: 0 4px 16px rgba(62,207,207,0.35), inset 0 1px 0 rgba(255,255,255,0.15) !important;
  transform: translateY(-1px) !important;
}

/* ─── INPUT FOCUS GLOW ─── */
input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: var(--teal) !important;
  box-shadow: 0 0 0 3px rgba(62,207,207,0.12) !important;
}

/* ─── SCROLLBAR ─── */
::-webkit-scrollbar { width: 5px; height: 5px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.15); border-radius: 10px; }
::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.25); }

/* ─── STATUS PILLS REFINEMENT ─── */
.planrr-pill {
  display: inline-flex; align-items: center; gap: 5px;
  padding: 3px 10px; border-radius: 20px;
  font-size: 11px; font-weight: 700; white-space: nowrap;
  border-width: 1px; border-style: solid;
  transition: opacity var(--dur) var(--ease);
}

/* ─── LANDING PAGE ANIMATIONS ─── */
@keyframes lp-fade-up {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes lp-fade-in {
  from { opacity: 0; } to { opacity: 1; }
}
@keyframes lp-scan {
  0%   { transform: translateY(-100%); }
  100% { transform: translateY(200vh); }
}
@keyframes lp-pulse-border {
  0%, 100% { border-color: rgba(196,154,60,0.18); }
  50%       { border-color: rgba(196,154,60,0.45); }
}
@keyframes lp-node-drift {
  0%,100% { transform: translate(0,0); }
  33%      { transform: translate(3px, -5px); }
  66%      { transform: translate(-4px, 3px); }
}
@keyframes auth-in {
  from { opacity: 0; transform: translate(-50%, -46%); }
  to   { opacity: 1; transform: translate(-50%, -50%); }
}
@keyframes spinner {
  from { transform: rotate(0deg); } to { transform: rotate(360deg); }
}
`;

// ─── LANDING PAGE ──────────────────────────────────────────────────────────────
export function LandingPageV2({ onLogin, onSignup, onBuyPlan }) {
  const canvasRef = useRef(null);
  const animRef   = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);

  const sectionPlatform = useRef(null);
  const sectionPillars  = useRef(null);
  const sectionPricing  = useRef(null);
  const sectionSecurity = useRef(null);

  const scrollTo = useCallback((ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileNav(false);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Node network canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W, H, nodes;

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      const count = Math.max(20, Math.floor((W * H) / 10000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.4 + 0.5,
        gold: Math.random() < 0.1,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const MAX = 110;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < MAX) {
            ctx.strokeStyle = `rgba(62,207,207,${(1 - d / MAX) * 0.10})`;
            ctx.lineWidth = 0.4;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      nodes.forEach((n) => {
        ctx.fillStyle = n.gold
          ? "rgba(196,154,60,0.22)"
          : "rgba(62,207,207,0.18)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
      });
      animRef.current = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // ── Shared styles ──
  const s = {
    page: {
      fontFamily: "'DM Sans', sans-serif",
      background: T.land_bg,
      color: T.land_text,
      minHeight: "100vh",
      overflowX: "hidden",
      position: "relative",
    },
    canvas: {
      position: "fixed",
      inset: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      zIndex: 0,
      opacity: 0.8,
    },
    overlay: {
      position: "fixed",
      inset: 0,
      background:
        "linear-gradient(180deg,rgba(14,14,14,0.6) 0%,rgba(14,14,14,0.4) 40%,rgba(14,14,14,0.6) 100%)",
      pointerEvents: "none",
      zIndex: 1,
    },
    content: { position: "relative", zIndex: 2 },
    // Nav
    nav: {
      position: "sticky",
      top: 0,
      zIndex: 50,
      padding: "0 clamp(20px,4vw,52px)",
      height: 58,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: scrolled
        ? "rgba(10,10,10,0.97)"
        : "rgba(14,14,14,0.88)",
      backdropFilter: "blur(18px) saturate(1.3)",
      borderBottom: `1px solid ${scrolled
        ? "rgba(196,154,60,0.28)"
        : "rgba(196,154,60,0.14)"}`,
      boxShadow: scrolled
        ? "0 1px 20px rgba(0,0,0,0.4)"
        : "none",
      transition: "all 0.25s ease",
    },
    navLogo: {
      display: "flex",
      alignItems: "center",
      gap: 11,
    },
    navLinks: {
      display: "flex",
      alignItems: "center",
      gap: 2,
    },
    navLink: {
      background: "none",
      border: "none",
      fontFamily: "'DM Mono', monospace",
      fontSize: 10,
      color: "#64748B",
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      cursor: "pointer",
      padding: "6px 12px",
      transition: "color 0.15s",
      borderRadius: 4,
    },
    navDivider: {
      width: 1,
      height: 20,
      background: "rgba(255,255,255,0.08)",
      margin: "0 10px",
    },
    // Sections
    section: {
      maxWidth: 1120,
      margin: "0 auto",
      padding: "84px clamp(20px,4vw,52px)",
    },
    sectionLabel: {
      fontFamily: "'DM Mono', monospace",
      fontSize: 10,
      letterSpacing: "0.22em",
      textTransform: "uppercase",
      marginBottom: 14,
      display: "flex",
      alignItems: "center",
      gap: 14,
    },
    sectionLabelLine: {
      width: 24,
      height: 1,
    },
    // Hero
    heroTitle: {
      fontFamily: "'Syne', 'DM Sans', sans-serif",
      fontWeight: 800,
      fontSize: "clamp(40px,5.5vw,72px)",
      lineHeight: 1.02,
      letterSpacing: "-2.5px",
      marginBottom: 24,
    },
    // Gold accent text
    gold: { color: T.gold },
    teal: { color: T.teal },
    // CTAs
    ctaPrimary: {
      background: T.gold,
      color: "#111",
      border: "none",
      padding: "14px 34px",
      fontFamily: "'Syne', 'DM Sans', sans-serif",
      fontSize: 13,
      fontWeight: 700,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      cursor: "pointer",
      borderRadius: 3,
      transition: "all 0.18s ease",
      boxShadow: "0 2px 12px rgba(196,154,60,0.25)",
    },
    ctaGhost: {
      border: "1px solid rgba(196,154,60,0.3)",
      color: T.gold,
      background: "rgba(196,154,60,0.05)",
      padding: "13px 28px",
      fontFamily: "'DM Mono', monospace",
      fontSize: 11,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      cursor: "pointer",
      borderRadius: 3,
      transition: "all 0.18s ease",
    },
    ctaTeal: {
      background: "transparent",
      color: T.teal,
      border: "1px solid rgba(62,207,207,0.3)",
      padding: "11px 20px",
      fontFamily: "'DM Sans', sans-serif",
      fontSize: 12,
      fontWeight: 700,
      cursor: "pointer",
      borderRadius: 3,
      width: "100%",
      transition: "background 0.15s",
    },
    // Cards
    darkCard: {
      background: "rgba(16,16,16,0.9)",
      border: "1px solid rgba(255,255,255,0.06)",
      padding: "26px 22px",
      position: "relative",
      overflow: "hidden",
      transition: "border-color 0.2s, transform 0.2s",
    },
    darkCardAccentTeal: {
      position: "absolute",
      left: 0, top: 0, bottom: 0,
      width: 3,
      background: T.teal,
    },
    darkCardAccentGold: {
      position: "absolute",
      left: 0, top: 0, bottom: 0,
      width: 3,
      background: T.gold,
    },
    darkCardTitle: {
      fontFamily: "'Syne', 'DM Sans', sans-serif",
      fontSize: 15,
      fontWeight: 700,
      marginBottom: 8,
      paddingLeft: 12,
    },
    darkCardBody: {
      fontSize: 13,
      color: T.land_muted,
      lineHeight: 1.72,
      fontWeight: 300,
      paddingLeft: 12,
    },
    darkCardTag: {
      fontFamily: "'DM Mono', monospace",
      fontSize: 9,
      color: T.teal,
      border: "1px solid rgba(62,207,207,0.22)",
      background: "rgba(62,207,207,0.05)",
      padding: "2px 10px",
      display: "inline-block",
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      marginLeft: 12,
      marginTop: 12,
    },
  };

  const navLinkHover = (e) => {
    e.currentTarget.style.color = T.gold;
  };
  const navLinkLeave = (e) => {
    e.currentTarget.style.color = T.land_faint;
  };
  const ctaPrimaryHover = (e) => {
    e.currentTarget.style.background = T.goldBright;
    e.currentTarget.style.transform = "translateY(-2px)";
    e.currentTarget.style.boxShadow = "0 6px 24px rgba(196,154,60,0.4)";
  };
  const ctaPrimaryLeave = (e) => {
    e.currentTarget.style.background = T.gold;
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "0 2px 12px rgba(196,154,60,0.25)";
  };
  const ctaGhostHover = (e) => {
    e.currentTarget.style.background = "rgba(196,154,60,0.1)";
  };
  const ctaGhostLeave = (e) => {
    e.currentTarget.style.background = "rgba(196,154,60,0.05)";
  };
  const darkCardHover = (e) => {
    e.currentTarget.style.borderColor = "rgba(62,207,207,0.3)";
    e.currentTarget.style.transform = "translateY(-2px)";
  };
  const darkCardLeave = (e) => {
    e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
    e.currentTarget.style.transform = "translateY(0)";
  };

  // ── Wordmark component ──
  const Wordmark = ({ size = 20 }) => (
    <div style={{
      display: "flex",
      alignItems: "baseline",
      lineHeight: 1,
      fontFamily: "'Oxanium','DM Sans',sans-serif",
      fontWeight: 800,
      letterSpacing: "-0.4px",
    }}>
      <span style={{ fontSize: size, color: "#F0F4FA" }}>planrr</span>
      <span style={{ fontSize: size, color: T.gold }}>.app</span>
    </div>
  );

  const BrainIcon = ({ size = 28 }) => (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <rect width="100" height="100" rx="18" fill={T.sidebar} />
      <rect width="100" height="100" rx="18" fill="none" stroke={T.teal} strokeWidth="3.5" />
      <path d="M20 78 L20 20 L66 20 C80 20 86 30 86 40 C86 50 80 58 66 58 L32 58 L32 78 Z" fill={T.teal} />
      <path d="M32 30 L58 30 C64 30 68 34 68 38 C68 42 64 46 58 46 L32 46 Z" fill={T.sidebar} />
    </svg>
  );

  // Features grid data
  const features = [
    ["EMAP Standards", "All 73 standards tracked live. Not a checklist — a real-time picture of where your program stands. Every change, every evidence upload, every gap surfaced automatically.", "Accreditation Core"],
    ["SAGE Priority Queue", "Stop asking what to work on next. SAGE already knows. Expiring MOUs, overdue AARs, lapsed credentials — ranked by urgency, surfaced every session.", "AI Intelligence"],
    ["Exercises & AARs", "Every AAR finding gets an owner, a due date, and a direct link to the standard it reveals. The loop closes when the gap does — not when the report is filed.", "HSEEP Aligned"],
    ["Document Templates", "SAGE writes the first draft pre-filled with your program data. COOP, strategic plan, comms plan. You edit. You approve. You move on.", "AI-Powered"],
    ["Evidence Export", "One click and every standard has its bundle — docs, training records, AARs, rationale. Ready the moment the assessor email lands.", "Accreditation-Ready"],
    ["Grant-EMAP Tracker", "Your grant report says training was completed. Your records say otherwise. This module keeps those two things from diverging — and flags when a gap might cost you funding.", "EMAP 3.4"],
    ["Recovery Planning", "Most programs file their recovery plan once. This module treats recovery as a living discipline — phases, owners, dependencies that change as your community does.", "EMAP 4.5.4"],
    ["Mutual Aid Mapping", "You have MOUs. Do you know who covers what? The coverage matrix shows resource gaps before a real event asks the question for you.", "EMAP 4.7"],
    ["FEMA/NIMS Alignment", "EMAP progress and FEMA alignment in one place. Give leadership the full picture, not one credential in isolation.", "ICS/NIMS"],
  ];

  const pillars = [
    ["Staleness Detection", "Your EOP was last reviewed 18 months ago. Your alternate EOC hasn't been verified since the previous director. Your MOU partner changed their coordinator and nobody updated the file. SAGE notices before you have to.", T.gold],
    ["COOP Structured Data", "Your succession line references two positions that no longer exist. If your EM director is unavailable today, who's in charge? planrr turns your COOP from a filed document into a maintained record with actual people and actual depth.", T.teal],
    ["AAR Loop", "The comms gap showed up in three consecutive AARs. It's still open. planrr connects every finding to an owner, a standard, and a due date. The loop closes when the gap does.", T.gold],
    ["Enhanced Priority Queue", "You have 73 standards, 14 open corrective actions, 3 MOUs expiring in 60 days, and a training record that's 16 months stale. SAGE surfaces what needs attention today — not next quarter.", T.teal],
  ];

  const pricingPlans = [
    { tier: "Solo Operator", price: "$79", period: "/mo", desc: "1 FTE or fewer. For the solo EM director wearing every hat.", features: ["Every feature included", "1 user seat", "200 AI calls / month", "Email support"], plan: "solo", featured: false },
    { tier: "Small Team",    price: "$149", period: "/mo", desc: "2–5 FTE staff. The backbone of local EM.", features: ["Every feature included", "Up to 5 user seats", "1,000 AI calls / month", "Priority support"], plan: "small_team", featured: true },
    { tier: "Full Program",  price: "$199", period: "/mo", desc: "6+ FTE. For established programs scaling up.", features: ["Every feature included", "Unlimited user seats", "5,000 AI calls / month", "Dedicated onboarding", "Phone support"], plan: "full_program", featured: false },
    { tier: "Enterprise",    price: "Custom", period: "", desc: "Multi-org, state agencies, regional coalitions.", features: ["Everything + multi-org dashboard", "Unlimited seats & AI usage", "Dedicated account manager", "SLA guarantees", "Custom integrations"], plan: "enterprise", featured: false },
  ];

  return (
    <div style={s.page}>
      {/* Injected CSS */}
      <style>{GLOBAL_CSS}{`
        .lp-fade-0 { animation: lp-fade-up 0.7s ease both; }
        .lp-fade-1 { animation: lp-fade-up 0.7s 0.1s ease both; }
        .lp-fade-2 { animation: lp-fade-up 0.7s 0.2s ease both; }
        .lp-fade-3 { animation: lp-fade-up 0.7s 0.32s ease both; }
        .lp-fade-4 { animation: lp-fade-up 0.7s 0.44s ease both; }
        .lp-fade-5 { animation: lp-fade-up 0.7s 0.56s ease both; }
        .hover-card:hover { border-color: rgba(62,207,207,0.32) !important; transform: translateY(-2px); }
        .hover-card-gold:hover { border-color: rgba(196,154,60,0.4) !important; transform: translateY(-2px); }
        @media(max-width:900px) {
          .lp-3col { grid-template-columns: 1fr 1fr !important; }
          .lp-4col { grid-template-columns: 1fr 1fr !important; }
          .lp-pricing { grid-template-columns: 1fr 1fr !important; }
          .lp-stats  { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media(max-width:600px) {
          .lp-3col { grid-template-columns: 1fr !important; }
          .lp-4col { grid-template-columns: 1fr !important; }
          .lp-pricing { grid-template-columns: 1fr !important; }
          .lp-stats   { grid-template-columns: 1fr 1fr !important; }
          .lp-hero-btns { flex-direction: column !important; }
          .lp-hide-mobile { display: none !important; }
          .lp-nav-actions { gap: 6px !important; }
        }
      `}</style>

      {/* Background canvas */}
      <canvas ref={canvasRef} style={s.canvas} />
      <div style={s.overlay} />

      <div style={s.content}>

        {/* ── NAV ── */}
        <nav style={s.nav}>
          <div style={s.navLogo}>
            <BrainIcon size={30} />
            <Wordmark size={19} />
            <div style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 8,
              color: T.gold,
              border: "1px solid rgba(196,154,60,0.3)",
              background: "rgba(196,154,60,0.07)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              padding: "2px 8px",
              marginLeft: 4,
            }}>
              Early Access
            </div>
          </div>

          {/* Desktop nav */}
          <div style={{ ...s.navLinks }} className="lp-hide-mobile">
            {[
              ["Platform",  sectionPlatform],
              ["Pillars",   sectionPillars],
              ["Pricing",   sectionPricing],
              ["Security",  sectionSecurity],
            ].map(([label, ref]) => (
              <button
                key={label}
                style={s.navLink}
                onClick={() => scrollTo(ref)}
                onMouseEnter={navLinkHover}
                onMouseLeave={navLinkLeave}
              >{label}</button>
            ))}
            <div style={s.navDivider} />
            <button
              onClick={onLogin}
              style={{
                background: "none",
                color: "#94A3B8",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 4,
                padding: "8px 18px",
                fontSize: 13,
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(196,154,60,0.4)"; e.currentTarget.style.color = "#F0F4FA"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#94A3B8"; }}
            >Sign In</button>
            <button
              onClick={() => onBuyPlan?.("small_team") ?? onSignup?.()}
              style={s.ctaPrimary}
              onMouseEnter={ctaPrimaryHover}
              onMouseLeave={ctaPrimaryLeave}
            >Start Free Trial</button>
          </div>

          {/* Mobile sign-in */}
          <div className="lp-nav-actions" style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button onClick={onLogin} style={{ ...s.ctaGhost, padding: "7px 14px", display: "none" }} className="lp-show-mobile">Sign In</button>
            <button
              onClick={() => onBuyPlan?.("small_team") ?? onSignup?.()}
              style={{ ...s.ctaPrimary, padding: "9px 18px" }}
              onMouseEnter={ctaPrimaryHover}
              onMouseLeave={ctaPrimaryLeave}
            >Try Free</button>
          </div>
        </nav>

        {/* ── HERO ── */}
        <div style={{ ...s.section, paddingTop: "96px", paddingBottom: "80px" }}>
          <div className="lp-fade-0" style={{ ...s.sectionLabel, color: T.gold }}>
            <div style={{ ...s.sectionLabelLine, background: T.gold }} />
            Emergency Management Platform
          </div>

          <h1 className="lp-fade-1" style={s.heroTitle}>
            Your EM program.<br />
            Running at full strength.<br />
            <span style={s.gold}>Every single day.</span>
          </h1>

          <p className="lp-fade-2" style={{
            fontSize: 17,
            color: T.land_muted,
            maxWidth: 580,
            lineHeight: 1.82,
            marginBottom: 16,
            fontWeight: 300,
          }}>
            planrr.app is the all-in-one platform for emergency management programs that need to operate at a high standard — 365 days a year. SAGE, your AI program partner, monitors everything so you know exactly what to work on next.
          </p>

          {/* Banger quote */}
          <div className="lp-fade-3" style={{
            marginBottom: 40,
            maxWidth: 660,
            background: "rgba(19,14,2,0.9)",
            border: "1px solid rgba(196,154,60,0.4)",
            borderLeft: `4px solid ${T.gold}`,
            padding: "18px 24px",
            borderRadius: "0 4px 4px 0",
          }}>
            <div style={{
              fontFamily: "'Syne', 'DM Sans', sans-serif",
              fontSize: 15,
              color: T.land_text,
              fontWeight: 600,
              lineHeight: 1.45,
              marginBottom: 6,
            }}>
              When the disaster hits, nobody asks about your budget.<br />They ask if you were ready.
            </div>
            <div style={{
              fontSize: 13,
              color: T.gold,
              fontWeight: 300,
              lineHeight: 1.5,
            }}>
              planrr.app doesn't make the plan survive. It makes your organization tough enough that it doesn't need to.
            </div>
          </div>

          <div className="lp-fade-4 lp-hero-btns" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <button
              onClick={() => onBuyPlan?.("small_team") ?? onSignup?.()}
              style={s.ctaPrimary}
              onMouseEnter={ctaPrimaryHover}
              onMouseLeave={ctaPrimaryLeave}
            >Start Free Trial</button>
            <button
              onClick={onLogin}
              style={s.ctaGhost}
              onMouseEnter={ctaGhostHover}
              onMouseLeave={ctaGhostLeave}
            >Sign In to Your Program →</button>
          </div>
        </div>

        {/* ── STATS STRIP ── */}
        <div style={{
          borderTop: `1px solid rgba(196,154,60,0.18)`,
          borderBottom: `1px solid rgba(196,154,60,0.18)`,
          background: "rgba(10,10,10,0.88)",
        }}>
          <div
            className="lp-stats"
            style={{
              maxWidth: 1120,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
            }}
          >
            {[
              ["73",   "EMAP Standards",  "Tracked"],
              ["32",   "FEMA Core",       "Capabilities"],
              ["100%", "End-to-End",      "EM System"],
              ["SAGE", "Your AI",         "Program Partner"],
            ].map(([n, l1, l2], i) => (
              <div key={l1} style={{
                padding: "28px clamp(18px,3vw,44px)",
                borderRight: i < 3 ? "1px solid rgba(196,154,60,0.1)" : "none",
              }}>
                <div style={{
                  fontFamily: "'Syne', 'DM Sans', sans-serif",
                  fontSize: n === "SAGE" ? 28 : 40,
                  fontWeight: 800,
                  color: T.gold,
                  lineHeight: 1,
                  marginBottom: 8,
                  letterSpacing: n === "SAGE" ? "-0.5px" : "-1.5px",
                }}>{n}</div>
                <div style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 9,
                  color: T.land_faint,
                  letterSpacing: "0.13em",
                  textTransform: "uppercase",
                  lineHeight: 1.7,
                }}>{l1}<br />{l2}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── PLATFORM FEATURES ── */}
        <div ref={sectionPlatform} style={s.section}>
          <div style={{ ...s.sectionLabel, color: T.gold }}>
            <div style={{ ...s.sectionLabelLine, background: T.gold }} />
            The Platform
          </div>
          <h2 style={{
            fontFamily: "'Syne', 'DM Sans', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(26px,3.2vw,42px)",
            letterSpacing: "-1.5px",
            marginBottom: 14,
            lineHeight: 1.04,
          }}>
            Everything your program needs.<br />
            <span style={s.gold}>One place.</span>
          </h2>
          <p style={{ color: T.land_muted, fontSize: 15, fontWeight: 300, maxWidth: 620, lineHeight: 1.82, marginBottom: 52 }}>
            Every module talks to every other module. An exercise finding becomes a compliance gap. A lapsed MOU surfaces in your priority queue. Your program picture builds as you work — not separately from it.
          </p>

          <div
            className="lp-3col"
            style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 3 }}
          >
            {features.map(([title, desc, tag]) => (
              <div
                key={title}
                className="hover-card"
                style={{ ...s.darkCard, transition: "all 0.2s ease" }}
                onMouseEnter={darkCardHover}
                onMouseLeave={darkCardLeave}
              >
                <div style={s.darkCardAccentTeal} />
                <div style={s.darkCardTitle}>{title}</div>
                <div style={s.darkCardBody}>{desc}</div>
                <div style={s.darkCardTag}>{tag}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CALLOUT / HONESTY STRIP ── */}
        <div style={{
          borderTop: "1px solid rgba(239,68,68,0.14)",
          borderBottom: "1px solid rgba(239,68,68,0.08)",
          background: "rgba(10,10,10,0.88)",
        }}>
          <div style={s.section}>
            <div style={{ ...s.sectionLabel, color: "#EF4444" }}>
              <div style={{ ...s.sectionLabelLine, background: "#EF4444" }} />
              Let's be honest
            </div>
            <h2 style={{
              fontFamily: "'Syne', 'DM Sans', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(22px,2.8vw,36px)",
              letterSpacing: "-1.5px",
              marginBottom: 10,
              lineHeight: 1.04,
            }}>
              Every EM program says they learn from every incident.
            </h2>
            <p style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 11,
              color: T.land_faint,
              letterSpacing: "0.04em",
              lineHeight: 1.7,
              marginBottom: 44,
              maxWidth: 640,
            }}>
              Almost none close the loop. The findings sit in a folder. The same gaps appear in the next AAR. This is not a people problem. It's a system problem.
            </p>

            <div
              className="lp-3col"
              style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 3 }}
            >
              {[
                ["The AAR Gap", "You filed the AAR. You didn't action the findings. The same gap shows up in the next one. No mechanism connects finding → standard → corrective action → resolution.", "#EF4444"],
                ["The Training Lie", "\"Our staff is trained.\" Last documented training: 22 months ago. 4 new hires since. 0 tabletops on the current EOP version. Saying it happened once isn't the same as it being current.", "#EF4444"],
                ["The Succession Gap", "Your COOP succession line references 2 positions that no longer exist. If your EM director is unavailable today, there is no clear line of authority. SAGE finds this weekly.", "#EF4444"],
              ].map(([title, body, color]) => (
                <div key={title} style={{
                  background: "rgba(239,68,68,0.04)",
                  border: "1px solid rgba(239,68,68,0.18)",
                  borderLeft: `3px solid ${color}`,
                  padding: "24px 22px",
                }}>
                  <div style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 8,
                    color: "#EF4444",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    marginBottom: 12,
                  }}>× {title}</div>
                  <div style={{ fontSize: 13, color: T.land_muted, lineHeight: 1.72, fontWeight: 300 }}>{body}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── PILLARS ── */}
        <div ref={sectionPillars} style={s.section}>
          <div style={{ ...s.sectionLabel, color: T.teal }}>
            <div style={{ ...s.sectionLabelLine, background: T.teal }} />
            Four Operational Pillars
          </div>
          <h2 style={{
            fontFamily: "'Syne', 'DM Sans', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(24px,3vw,40px)",
            letterSpacing: "-1.5px",
            marginBottom: 14,
            lineHeight: 1.04,
          }}>
            The four things that quietly<br />
            <span style={s.gold}>fail without a system.</span>
          </h2>
          <p style={{ color: T.land_muted, fontSize: 15, fontWeight: 300, maxWidth: 660, lineHeight: 1.82, marginBottom: 52 }}>
            Not because anyone made a bad decision. Because there was no system watching. These gaps accumulate in silence — and they all surface in the same place: the after-action report.
          </p>

          <div
            className="lp-4col"
            style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 3 }}
          >
            {pillars.map(([title, body, accent]) => (
              <div
                key={title}
                className="hover-card"
                style={{ ...s.darkCard, transition: "all 0.2s ease" }}
                onMouseEnter={darkCardHover}
                onMouseLeave={darkCardLeave}
              >
                <div style={{ ...s.darkCardAccentTeal, background: accent }} />
                <div style={{ ...s.darkCardTitle, paddingLeft: 14 }}>{title}</div>
                <div style={{ ...s.darkCardBody, paddingLeft: 14, marginTop: 4 }}>{body}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── PRICING ── */}
        <div ref={sectionPricing} style={{
          borderTop: `1px solid rgba(196,154,60,0.18)`,
          background: "rgba(13,13,13,0.82)",
        }}>
          <div style={s.section}>
            <div style={{ ...s.sectionLabel, color: T.gold }}>
              <div style={{ ...s.sectionLabelLine, background: T.gold }} />
              Pricing
            </div>
            <h2 style={{
              fontFamily: "'Syne', 'DM Sans', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(24px,3vw,40px)",
              letterSpacing: "-1.5px",
              marginBottom: 14,
              lineHeight: 1.04,
            }}>
              Built for every shop size.<br />
              <span style={s.gold}>No feature gating. Ever.</span>
            </h2>
            <p style={{ color: T.land_muted, fontSize: 15, fontWeight: 300, maxWidth: 520, lineHeight: 1.82, marginBottom: 52 }}>
              Every plan includes every feature. We price by team size because understaffed shops deserve the same tools as large agencies.
            </p>

            <div
              className="lp-pricing"
              style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 2 }}
            >
              {pricingPlans.map(({ tier, price, period, desc, features: feats, plan, featured }) => (
                <div key={tier} style={{
                  background: featured ? "rgba(28,21,0,0.96)" : "rgba(14,14,14,0.95)",
                  border: featured ? `2px solid ${T.gold}` : "1px solid rgba(255,255,255,0.06)",
                  padding: "32px 22px",
                  position: "relative",
                  boxShadow: featured ? `0 0 40px rgba(196,154,60,0.18)` : "none",
                }}>
                  {featured && (
                    <div style={{
                      position: "absolute",
                      top: -1,
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: T.gold,
                      color: "#111",
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 8,
                      fontWeight: 700,
                      letterSpacing: "0.15em",
                      padding: "4px 16px",
                      whiteSpace: "nowrap",
                      textTransform: "uppercase",
                    }}>Most Popular</div>
                  )}
                  <div style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 9,
                    color: featured ? T.gold : T.teal,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    marginBottom: 18,
                    marginTop: featured ? 12 : 0,
                  }}>{tier}</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 3, marginBottom: 4 }}>
                    <span style={{
                      fontFamily: "'Syne', 'DM Sans', sans-serif",
                      fontSize: price === "Custom" ? 28 : 42,
                      fontWeight: 800,
                      color: T.land_text,
                      lineHeight: 1,
                    }}>{price}</span>
                    {period && <span style={{ color: T.land_faint, fontSize: 12 }}>{period}</span>}
                  </div>
                  <div style={{ fontSize: 11, color: T.land_faint, marginBottom: 22, lineHeight: 1.55 }}>{desc}</div>
                  {feats.map((f) => (
                    <div key={f} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 8, fontSize: 12, color: "#94A3B8" }}>
                      <span style={{ color: featured ? T.gold : T.teal, flexShrink: 0, marginTop: 1, fontSize: 11 }}>+</span>{f}
                    </div>
                  ))}
                  {plan === "enterprise" ? (
                    <button
                      onClick={onSignup}
                      style={{ ...s.ctaTeal, marginTop: 20, color: "#8B5CF6", borderColor: "rgba(139,92,246,0.3)" }}
                    >Contact Sales</button>
                  ) : featured ? (
                    <button
                      onClick={() => onBuyPlan?.(plan) ?? onSignup?.()}
                      style={{ ...s.ctaPrimary, width: "100%", marginTop: 20 }}
                      onMouseEnter={ctaPrimaryHover}
                      onMouseLeave={ctaPrimaryLeave}
                    >Start Free Trial</button>
                  ) : (
                    <button
                      onClick={() => onBuyPlan?.(plan) ?? onSignup?.()}
                      style={{ ...s.ctaTeal, marginTop: 20 }}
                    >Start Free Trial</button>
                  )}
                </div>
              ))}
            </div>

            {/* Founding strip */}
            <div style={{
              marginTop: 16,
              background: "rgba(24,18,2,0.9)",
              border: `1px solid rgba(196,154,60,0.3)`,
              padding: "14px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 12,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 9,
                  color: T.gold,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}>⚡ Founding Agency Pricing</span>
                <span style={{ fontSize: 13, color: T.land_text }}>50% off any plan, locked for life.</span>
              </div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: T.land_faint, letterSpacing: "0.08em" }}>
                14-day free trial · No credit card required
              </div>
            </div>
          </div>
        </div>

        {/* ── BIG CTA ── */}
        <div style={{
          borderTop: `1px solid rgba(196,154,60,0.2)`,
          borderBottom: `1px solid rgba(196,154,60,0.2)`,
          background: "rgba(13,13,13,0.88)",
          padding: "84px 40px",
          textAlign: "center",
        }}>
          <div style={{ ...s.sectionLabel, color: T.teal, justifyContent: "center" }}>
            <div style={{ ...s.sectionLabelLine, background: T.teal }} />
            Organizational resilience isn't a value. It's a practice.
            <div style={{ ...s.sectionLabelLine, background: T.teal }} />
          </div>
          <h2 style={{
            fontFamily: "'Syne', 'DM Sans', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(30px,4.5vw,56px)",
            letterSpacing: "-2.5px",
            marginBottom: 16,
            lineHeight: 1.01,
          }}>
            Adapt or don't.<br />
            <span style={s.gold}>The incident won't wait.</span>
          </h2>
          <p style={{
            color: T.land_muted,
            fontSize: 15,
            fontWeight: 300,
            marginBottom: 40,
            maxWidth: 520,
            margin: "0 auto 40px",
            lineHeight: 1.82,
          }}>
            Organizations that learn, adapt, and build institutional resilience don't need the plan to be perfect. They need the people, the systems, and the muscle memory to respond when it isn't.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => onBuyPlan?.("small_team") ?? onSignup?.()}
              style={s.ctaPrimary}
              onMouseEnter={ctaPrimaryHover}
              onMouseLeave={ctaPrimaryLeave}
            >Start Free Trial</button>
            <button onClick={onLogin} style={s.ctaGhost} onMouseEnter={ctaGhostHover} onMouseLeave={ctaGhostLeave}>
              Sign In →
            </button>
          </div>
          <div style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 10,
            color: T.land_faint,
            letterSpacing: "0.1em",
            marginTop: 20,
          }}>
            Founding agency pricing · Locked for life · Direct input into the roadmap
          </div>
        </div>

        {/* ── SECURITY ── */}
        <div ref={sectionSecurity} style={{
          borderTop: `1px solid rgba(62,207,207,0.1)`,
          background: "rgba(10,14,14,0.9)",
        }}>
          <div style={s.section}>
            <div style={{ ...s.sectionLabel, color: T.teal }}>
              <div style={{ ...s.sectionLabelLine, background: T.teal }} />
              Security & Compliance
            </div>
            <h2 style={{
              fontFamily: "'Syne', 'DM Sans', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(24px,3vw,40px)",
              letterSpacing: "-1.5px",
              marginBottom: 14,
              lineHeight: 1.04,
            }}>
              Built for agencies that handle<br />
              <span style={s.gold}>sensitive data.</span>
            </h2>
            <p style={{ color: T.land_muted, fontSize: 15, fontWeight: 300, maxWidth: 560, lineHeight: 1.82, marginBottom: 52 }}>
              Plans, succession lines, facility locations, resource inventories. Your program data has operational security implications. We treat it that way.
            </p>

            <div
              className="lp-3col"
              style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 3 }}
            >
              {[
                ["HTTPS Everywhere", "Every request, every file transfer. TLS 1.2+ with no exceptions."],
                ["Encryption at Rest", "AES-256 on everything stored. If someone got to the database, they'd get noise."],
                ["Authenticated Access", "Every API call requires a valid token. Org-scoped — no other agency sees your data."],
                ["Activity Logs", "Who changed what, and when. Full audit trail for accountability."],
                ["Automated Backups", "Continuous backups with point-in-time recovery. Your program doesn't disappear."],
                ["Secure Infrastructure", "SOC 2-certified cloud. DDoS protection, 24/7 monitoring, network isolation."],
              ].map(([title, body]) => (
                <div
                  key={title}
                  className="hover-card"
                  style={{ ...s.darkCard, transition: "all 0.2s ease" }}
                  onMouseEnter={darkCardHover}
                  onMouseLeave={darkCardLeave}
                >
                  <div style={s.darkCardAccentTeal} />
                  <div style={s.darkCardTitle}>{title}</div>
                  <div style={s.darkCardBody}>{body}</div>
                </div>
              ))}
            </div>

            {/* SOC 2 Roadmap */}
            <div style={{
              marginTop: 56,
              border: `1px solid rgba(196,154,60,0.28)`,
              borderLeft: `4px solid ${T.gold}`,
              padding: "36px 40px",
              background: "rgba(20,15,2,0.9)",
            }}>
              <div style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 9,
                color: T.gold,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: 14,
              }}>SOC 2 Compliance Roadmap</div>
              <h3 style={{
                fontFamily: "'Syne', 'DM Sans', sans-serif",
                fontSize: 22,
                fontWeight: 700,
                marginBottom: 8,
              }}>On the path to SOC 2 certification</h3>
              <p style={{ fontSize: 13, color: T.land_muted, lineHeight: 1.7, marginBottom: 32, maxWidth: 560 }}>
                Actively pursuing SOC 2 compliance to meet the security requirements of government agencies.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {[
                  ["Q2–Q3 2026", "Policies, access control, and change management frameworks", true],
                  ["Q3 2026",    "Readiness assessment with independent auditor", true],
                  ["Q4 2026–Q1 2027", "SOC 2 Type I audit and certification", false],
                  ["Q3 2027",   "SOC 2 Type II audit and certification", false],
                ].map(([q, desc, active], i) => (
                  <div key={q} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, width: 20 }}>
                      <div style={{
                        width: 10, height: 10, borderRadius: "50%",
                        background: active ? T.gold : "#2E3439",
                        border: active ? "none" : "2px solid #475569",
                        flexShrink: 0, marginTop: 4,
                      }} />
                      {i < 3 && <div style={{ width: 2, height: 32, background: active ? "rgba(196,154,60,0.3)" : "#2E3439" }} />}
                    </div>
                    <div style={{ paddingBottom: i < 3 ? 16 : 0 }}>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: active ? T.gold : T.land_faint, fontWeight: 600, marginBottom: 2 }}>{q}</div>
                      <div style={{ fontSize: 13, color: T.land_muted, lineHeight: 1.5 }}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── FOOTER ── */}
        <div style={{
          borderTop: `1px solid rgba(196,154,60,0.16)`,
          background: "rgba(10,10,10,0.97)",
          padding: "48px clamp(20px,4vw,52px) 32px",
        }}>
          <div style={{ maxWidth: 1120, margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 32, marginBottom: 36 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <BrainIcon size={26} />
                  <Wordmark size={18} />
                </div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#475569", letterSpacing: "0.08em", lineHeight: 1.8, maxWidth: 280 }}>
                  Emergency management platform.<br />
                  EMAP EMS 5-2022 · HSEEP · CPG 201<br />
                  helloplanrr.app@gmail.com
                </div>
              </div>
              <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
                <div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: T.gold, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 14 }}>Product</div>
                  {[["Platform", () => scrollTo(sectionPlatform)], ["Pricing", () => scrollTo(sectionPricing)], ["Security", () => scrollTo(sectionSecurity)]].map(([l, fn]) => (
                    <div key={l} style={{ marginBottom: 8 }}>
                      <button onClick={fn} style={{ background: "none", border: "none", fontSize: 13, color: "#475569", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", padding: 0, transition: "color 0.15s" }}
                        onMouseEnter={(e) => e.currentTarget.style.color = "#94A3B8"}
                        onMouseLeave={(e) => e.currentTarget.style.color = "#475569"}
                      >{l}</button>
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: T.gold, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 14 }}>Legal</div>
                  {[["Privacy Policy", "/privacy"], ["Terms of Service", "/terms"]].map(([l, href]) => (
                    <div key={l} style={{ marginBottom: 8 }}>
                      <a href={href} style={{ fontSize: 13, color: "#475569", textDecoration: "none", fontFamily: "'DM Sans', sans-serif", transition: "color 0.15s" }}
                        onMouseEnter={(e) => e.currentTarget.style.color = "#94A3B8"}
                        onMouseLeave={(e) => e.currentTarget.style.color = "#475569"}
                      >{l}</a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ borderTop: "1px solid rgba(196,154,60,0.1)", paddingTop: 20, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "#2E3439", letterSpacing: "0.08em" }}>© 2026 planrr.app · getplanrr.com</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "#2E3439", letterSpacing: "0.08em" }}>EMAP EMS 5-2022 ALIGNED · NOT AFFILIATED WITH EMAP OR IAEM</div>
            </div>
          </div>
        </div>

      </div>{/* /content */}
    </div>
  );
}

// ─── AUTH SCREEN (FIXED — no jank animation) ─────────────────────────────────
/**
 * KEY FIX: The original issue was the modal starting at bottom-right because
 * the container had `position: fixed; top: 50%; left: 50%; transform: translate(-50%,-50%)`
 * but the animation was `fadeUp` (translateY) which fights the centering transform.
 *
 * Fix: Use a dedicated `auth-in` keyframe that animates both opacity AND the
 * combined translate, so there's never a frame where only one is applied.
 *
 * Additional: The backdrop renders BEFORE the card, so you never see the card
 * "flying in" from a corner — it fades up from center.
 */
export function AuthScreenFixed({ onAuth, initialMode = "login", onClose }) {
  const [mode, setMode] = useState(initialMode);
  const [email,  setEmail]  = useState("");
  const [pass,   setPass]   = useState("");
  const [pass2,  setPass2]  = useState("");
  const [name,   setName]   = useState("");
  const [org,    setOrg]    = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [ok,  setOk]  = useState("");

  const inputStyle = {
    width: "100%",
    padding: "11px 14px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 8,
    color: "#F0F4FA",
    fontSize: 14,
    fontFamily: "'DM Sans', sans-serif",
    outline: "none",
    marginBottom: 12,
    transition: "border-color 0.2s, box-shadow 0.2s",
  };

  const labelStyle = {
    display: "block",
    fontSize: 11,
    fontWeight: 600,
    color: "#64748B",
    marginBottom: 5,
    textTransform: "uppercase",
    letterSpacing: "0.07em",
    fontFamily: "'DM Mono', monospace",
  };

  const btnPrimary = {
    width: "100%",
    padding: "13px",
    background: `linear-gradient(135deg, ${T.teal}, ${T.tealDark})`,
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    marginBottom: 10,
    boxShadow: "0 4px 16px rgba(62,207,207,0.3)",
    transition: "all 0.18s ease",
    letterSpacing: "0.01em",
  };

  const linkStyle = {
    background: "none",
    border: "none",
    color: T.teal,
    fontSize: 13,
    cursor: "pointer",
    padding: 0,
    fontWeight: 600,
    fontFamily: "'DM Sans', sans-serif",
    textDecoration: "underline",
    textUnderlineOffset: 2,
  };

  const focusInput = (e) => {
    e.target.style.borderColor = T.teal;
    e.target.style.boxShadow = `0 0 0 3px rgba(62,207,207,0.12)`;
  };
  const blurInput = (e) => {
    e.target.style.borderColor = "rgba(255,255,255,0.1)";
    e.target.style.boxShadow = "none";
  };

  return (
    <>
      <style>{`
        @keyframes auth-backdrop {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes auth-card {
          from { opacity: 0; transform: translate(-50%, -47%); }
          to   { opacity: 1; transform: translate(-50%, -50%); }
        }
        .auth-input:focus {
          border-color: ${T.teal} !important;
          box-shadow: 0 0 0 3px rgba(62,207,207,0.12) !important;
        }
      `}</style>

      {/* Backdrop — renders first, before the card */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(10,12,14,0.78)",
          backdropFilter: "blur(8px)",
          zIndex: 200,
          animation: "auth-backdrop 0.22s ease both",
        }}
      />

      {/* Card — separate stacking context, centered via transform */}
      <div style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        /* transform is PART of the animation keyframe — never fights centering */
        zIndex: 201,
        width: 430,
        maxWidth: "calc(100vw - 32px)",
        maxHeight: "calc(100vh - 40px)",
        overflowY: "auto",
        animation: "auth-card 0.28s cubic-bezier(0.34, 1.06, 0.64, 1) both",
        /* initial state set via keyframe — transform is correctly applied from the start */
      }}>
        {/* Logo above card */}
        <div style={{ textAlign: "center", marginBottom: 18 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 8 }}>
            <div style={{ background: T.sidebar, borderRadius: 12, padding: 10, border: `1px solid rgba(62,207,207,0.2)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width={22} height={22} viewBox="0 0 100 100" fill="none">
                <rect width="100" height="100" rx="18" fill={T.sidebar} />
                <rect width="100" height="100" rx="18" fill="none" stroke={T.teal} strokeWidth="3.5" />
                <path d="M20 78 L20 20 L66 20 C80 20 86 30 86 40 C86 50 80 58 66 58 L32 58 L32 78 Z" fill={T.teal} />
                <path d="M32 30 L58 30 C64 30 68 34 68 38 C68 42 64 46 58 46 L32 46 Z" fill={T.sidebar} />
              </svg>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", fontFamily: "'Oxanium','DM Sans',sans-serif", fontWeight: 800, lineHeight: 1 }}>
              <span style={{ fontSize: 20, color: "#F0F4FA" }}>planrr</span>
              <span style={{ fontSize: 20, color: T.gold }}>.app</span>
            </div>
          </div>
          <div style={{ fontSize: 12, color: "#64748B", letterSpacing: "0.03em" }}>AI-powered emergency management</div>
        </div>

        {/* Card body */}
        <div style={{
          background: "rgba(22,25,28,0.97)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 16,
          padding: "28px 30px",
          boxShadow: "0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
          position: "relative",
        }}>
          {onClose && (
            <button onClick={onClose} style={{
              position: "absolute", top: 14, right: 14, background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)", color: "#64748B",
              fontSize: 16, cursor: "pointer", padding: "4px 8px", lineHeight: 1,
              borderRadius: 6, transition: "all 0.15s",
            }}>✕</button>
          )}

          {err && (
            <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 8, padding: "10px 14px", fontSize: 12, color: "#EF4444", marginBottom: 14 }}>
              {err}
            </div>
          )}
          {ok && (
            <div style={{ background: "rgba(62,207,207,0.1)", border: `1px solid rgba(62,207,207,0.3)`, borderRadius: 8, padding: "10px 14px", fontSize: 12, color: T.teal, marginBottom: 14 }}>
              {ok}
            </div>
          )}

          {mode === "login" && (
            <>
              <div style={{ fontSize: 21, fontWeight: 800, color: "#F0F4FA", marginBottom: 4, letterSpacing: "-0.5px", fontFamily: "'Syne','DM Sans',sans-serif" }}>Welcome back</div>
              <div style={{ fontSize: 13, color: "#64748B", marginBottom: 22 }}>Sign in to your program</div>
              <label style={labelStyle}>Work email</label>
              <input className="auth-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@agency.gov" style={inputStyle} onFocus={focusInput} onBlur={blurInput} />
              <label style={labelStyle}>Password</label>
              <input className="auth-input" type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Password" style={inputStyle} onFocus={focusInput} onBlur={blurInput} />
              <button
                disabled={loading}
                style={{ ...btnPrimary, opacity: loading ? 0.7 : 1 }}
                onMouseEnter={(e) => { if (!loading) { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 22px rgba(62,207,207,0.4)"; }}}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(62,207,207,0.3)"; }}
              >
                {loading ? <span style={{ display: "inline-block", animation: "spinner 0.8s linear infinite", marginRight: 8 }}>⟳</span> : null}
                {loading ? "Signing in…" : "Sign In"}
              </button>
              <div style={{ textAlign: "center", marginBottom: 8 }}>
                <button style={linkStyle} onClick={() => { setMode("reset"); setErr(""); setOk(""); }}>Forgot password?</button>
              </div>
              <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "14px 0" }} />
              <div style={{ fontSize: 12, color: "#64748B", textAlign: "center" }}>
                No account?{" "}
                <button style={linkStyle} onClick={() => { setMode("signup"); setErr(""); setOk(""); }}>Request access</button>
              </div>
            </>
          )}

          {mode === "signup" && (
            <>
              <div style={{ fontSize: 21, fontWeight: 800, color: "#F0F4FA", marginBottom: 4, letterSpacing: "-0.5px", fontFamily: "'Syne','DM Sans',sans-serif" }}>Start your free trial</div>
              <div style={{ fontSize: 13, color: "#64748B", marginBottom: 20 }}>14 days free · Cancel anytime</div>
              <label style={labelStyle}>Your name</label>
              <input className="auth-input" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" style={inputStyle} onFocus={focusInput} onBlur={blurInput} />
              <label style={labelStyle}>Work email</label>
              <input className="auth-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@agency.gov" style={inputStyle} onFocus={focusInput} onBlur={blurInput} />
              <label style={labelStyle}>Organization name</label>
              <input className="auth-input" type="text" value={org} onChange={(e) => setOrg(e.target.value)} placeholder="County Emergency Management" style={inputStyle} onFocus={focusInput} onBlur={blurInput} />
              <label style={labelStyle}>Password</label>
              <input className="auth-input" type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="8+ characters" style={inputStyle} onFocus={focusInput} onBlur={blurInput} />
              <label style={labelStyle}>Confirm password</label>
              <input className="auth-input" type="password" value={pass2} onChange={(e) => setPass2(e.target.value)} placeholder="Repeat password" style={inputStyle} onFocus={focusInput} onBlur={blurInput} />
              <button style={{ ...btnPrimary, opacity: loading ? 0.7 : 1 }} disabled={loading}
                onMouseEnter={(e) => { if (!loading) { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 22px rgba(62,207,207,0.4)"; }}}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(62,207,207,0.3)"; }}
              >{loading ? "Setting up…" : "Start Free Trial"}</button>
              <div style={{ fontSize: 12, color: "#64748B", textAlign: "center" }}>
                Have an account?{" "}
                <button style={linkStyle} onClick={() => { setMode("login"); setErr(""); setOk(""); }}>Sign in</button>
              </div>
            </>
          )}

          {mode === "reset" && (
            <>
              <div style={{ fontSize: 21, fontWeight: 800, color: "#F0F4FA", marginBottom: 4, letterSpacing: "-0.5px", fontFamily: "'Syne','DM Sans',sans-serif" }}>Reset password</div>
              <div style={{ fontSize: 13, color: "#64748B", marginBottom: 22 }}>We'll send a reset link to your email</div>
              <label style={labelStyle}>Work email</label>
              <input className="auth-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@agency.gov" style={inputStyle} onFocus={focusInput} onBlur={blurInput} />
              {!ok && <button style={btnPrimary}>{loading ? "Sending…" : "Send Reset Link"}</button>}
              <button onClick={() => { setMode("login"); setErr(""); setOk(""); }} style={{
                width: "100%", padding: 11, background: "none", color: "#94A3B8",
                border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 13,
                cursor: "pointer", transition: "all 0.15s", fontFamily: "'DM Sans', sans-serif",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = `rgba(62,207,207,0.3)`; e.currentTarget.style.color = T.teal; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#94A3B8"; }}
              >← Back to Sign In</button>
            </>
          )}
        </div>

        {/* Footer badges */}
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <div style={{ display: "flex", gap: 16, fontSize: 11, color: "#334155", justifyContent: "center", fontFamily: "'DM Mono', monospace", letterSpacing: "0.06em" }}>
            <span>EMAP EMS 5-2022</span>
            <span>HSEEP Aligned</span>
            <span>FEMA Compatible</span>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── IN-APP DESIGN CONTINUITY PATCH ──────────────────────────────────────────
/**
 * Add these CSS classes to elements throughout the app for visual consistency
 * with the landing page brand tokens.
 *
 * Usage examples:
 *   <h1 className="planrr-headline">Dashboard</h1>
 *   <span className="planrr-mono-label">EMAP 4.1</span>
 *   <div className="planrr-card-elevated">...</div>
 */
export const IN_APP_STYLE_PATCH = `
/* ─── IN-APP TOPBAR ─── */
#planrr-topbar {
  font-family: 'DM Sans', sans-serif;
  background: rgba(242,245,247,0.94) !important;
  backdrop-filter: blur(16px) saturate(1.3) !important;
  border-bottom: 1px solid rgba(226,232,234,0.7) !important;
  box-shadow: 0 1px 0 rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.02) !important;
}

/* Breadcrumb text refinement */
#planrr-topbar span {
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
}
#planrr-topbar span[style*="fontWeight: 700"] {
  font-family: 'Syne', 'DM Sans', sans-serif !important;
  font-size: 14px;
  color: #111827;
}

/* ─── IN-APP SIDEBAR ─── */
#planrr-sidebar {
  background: linear-gradient(175deg, #1A1F2E 0%, #141922 100%) !important;
}

/* Sidebar nav item hover glow */
#planrr-sidebar button:hover {
  background: rgba(62,207,207,0.07) !important;
}
#planrr-sidebar button[style*="color: rgb(62, 207, 207)"] {
  background: rgba(62,207,207,0.1) !important;
  border-left-color: #3ECFCF !important;
}

/* ─── CARDS & SURFACES ─── */
.planrr-view > * > div[style*="background: rgb(255, 255, 255)"],
div[style*="background: rgb(255, 255, 255)"][style*="border-radius: 14px"] {
  box-shadow:
    0 1px 2px rgba(0,0,0,0.04),
    0 4px 12px rgba(0,0,0,0.02),
    inset 0 1px 0 rgba(255,255,255,0.9) !important;
}

/* ─── SECTION HEADERS ─── */
h1[style*="fontWeight: 800"] {
  font-family: 'Syne', 'DM Sans', sans-serif !important;
  letter-spacing: -0.5px !important;
}

/* ─── TAGS & BADGES ─── */
span[style*="fontWeight: 700"][style*="fontSize: 9"] {
  font-family: 'DM Mono', monospace !important;
  letter-spacing: 0.08em !important;
}

/* ─── STANDARD ID BADGES ─── */
span[style*="background: rgb(255, 251, 235)"][style*="fontWeight: 800"] {
  font-family: 'DM Mono', monospace !important;
  font-size: 10px !important;
  letter-spacing: 0.06em !important;
}

/* ─── COMPLIANCE PROGRESS BARS ─── */
div[style*="background: linear-gradient(90deg, rgb(62, 207, 207)"] {
  box-shadow: 0 0 8px rgba(62,207,207,0.3) !important;
}

/* ─── AI BLOCKS ─── */
div[style*="borderLeft: 3px solid rgb(62, 207, 207)"] {
  border-radius: 0 10px 10px 0 !important;
}

/* ─── FOCUS STATES ─── */
input:focus-visible,
select:focus-visible,
textarea:focus-visible,
button:focus-visible {
  outline: 2px solid #3ECFCF !important;
  outline-offset: 2px !important;
}
`;

// ─── PREVIEW COMPONENT ────────────────────────────────────────────────────────
/**
 * This default export shows the design tokens and key components for review.
 * Replace with your actual LandingPage in production.
 */
export default function DesignSystemPreview() {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#0E0E0E", minHeight: "100vh" }}>
      <style>{GLOBAL_CSS}</style>
      <LandingPageV2
        onLogin={() => { setAuthMode("login"); setShowAuth(true); }}
        onSignup={() => { setAuthMode("signup"); setShowAuth(true); }}
        onBuyPlan={(plan) => { setAuthMode("signup"); setShowAuth(true); }}
      />
      {showAuth && (
        <AuthScreenFixed
          initialMode={authMode}
          onClose={() => setShowAuth(false)}
          onAuth={() => { setShowAuth(false); alert("Auth successful!"); }}
        />
      )}
    </div>
  );
}
