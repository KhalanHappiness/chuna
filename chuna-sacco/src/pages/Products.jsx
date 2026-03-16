import { useState } from "react";

/**
 * Chuna Sacco — General Products Overview Page
 * ─────────────────────────────────────────────
 * Lists ALL products grouped by category:
 *   BOSA Loans | FOSA Loans | Savings Accounts | Digital Banking
 * Each product card links to its detail page.
 *
 * Brand: Green #2D8A3E | Dark #1E6B2E | Red #C0392B | Gold #C9A800
 * Fonts: Montserrat (headings) + Inter (body) via Google Fonts
 */

// ─── DATA ─────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  {
    id: "bosaProducts",
    label: "BOSA Loans",
    icon: "🏦",
    color: "#2D8A3E",
    lightColor: "#E8F5EB",
    heading: "Back Office Savings Activities",
    sub: "Long-term credit secured against your non-withdrawable deposit savings.",
    products: [
      { name: "Normal Loan", icon: "📋", desc: "Borrow up to 3× your deposits with repayment up to 48 months.", badge: "Popular", link: "/bosaProducts" },
      { name: "Emergency Loan", icon: "🚨", desc: "Fast emergency credit up to Ksh 100,000 repayable in 12 months.", badge: null, link: "/bosaProducts" },
      { name: "Development Loan", icon: "🏗️", desc: "Finance construction, business ventures and long-term investments.", badge: null, link: "/bosaProducts" },
      { name: "School Fees Loan", icon: "🎓", desc: "Per-term disbursement to keep your children in school always.", badge: null, link: "/bosaProducts" },
      { name: "M-CHUNA Loan", icon: "📲", desc: "Instant loan up to Ksh 50,000 via *670# — no guarantors needed.", badge: "Instant", link: "/bosaProducts" },
    ],
  },
  {
    id: "fosaProducts",
    label: "FOSA Loans",
    icon: "💳",
    color: "#C0392B",
    lightColor: "#FEE2E2",
    heading: "Front Office Service Activities",
    sub: "Fast credit for members whose salaries are processed through Chuna FOSA.",
    products: [
      { name: "Salary Advance", icon: "💼", desc: "Access up to 60% of your basic salary at 13% p.a. effective rate.", badge: "Popular", link: "/fosaProducts" },
      { name: "Instant Salary Advance", icon: "⚡", desc: "80% of your net salary disbursed within 3 hours. Recovered in 1 month.", badge: "Instant", link: "/fosaProducts" },
      { name: "FOSA Emergency Loan", icon: "🚑", desc: "Up to Ksh 300,000 for unexpected needs, repayable in 12 months.", badge: null, link: "/fosaProducts" },
      { name: "FOSA Emergency 20", icon: "🔥", desc: "Improved product — Ksh 300,000 over 20 months for easier repayment.", badge: "New", link: "/fosaProducts" },
      { name: "New Member Loan", icon: "🌟", desc: "Up to Ksh 100,000 for new members — builds your deposits as you borrow.", badge: null, link: "/fosaProducts" },
      { name: "Loan Top-Up & Clearance", icon: "🔄", desc: "Top up existing loans or clear external bank debts.", badge: null, link: "/fosaProducts" },
    ],
  },
  {
    id: "savings",
    label: "Savings Accounts",
    icon: "💰",
    color: "#C9A800",
    lightColor: "#FEF9C3",
    heading: "Savings & Deposit Products",
    sub: "Earn a minimum of 10% p.a. interest on all savings accounts. Withdrawable 3× per year.",
    products: [
      { name: "Education Savings", icon: "🎒", desc: "Save specifically for your children's education with term-timed withdrawals.", badge: null, link: "/products/savings" },
      { name: "Holiday Savings", icon: "✈️", desc: "Save for vacations and festive seasons. 3 withdrawals per year.", badge: null, link: "/products/savings" },
      { name: "Junior Savings", icon: "👧", desc: "Start your child's financial future early. Parent/guardian operated.", badge: null, link: "/products/savings" },
    ],
  },
  {
    id: "digital",
    label: "Digital Banking",
    icon: "📱",
    color: "#1E6B2E",
    lightColor: "#E8F5EB",
    heading: "Bank Anytime, Anywhere",
    sub: "Access all Chuna Sacco products 24/7 through our digital channels — no branch visit required.",
    products: [
      { name: "USSD *670#", icon: "📱", desc: "Dial *670# on any phone, any network in Kenya. Balance, transfers, loans.", badge: "24/7", link: "#" },
      { name: "M-Pesa Paybill 561999", icon: "💚", desc: "Deposit to FOSA or BOSA instantly via M-Pesa. Available round the clock.", badge: "24/7", link: "#" },
      { name: "Mobile App", icon: "📲", desc: "Full-service Sacco banking on your smartphone — Android & iOS.", badge: "New", link: "#" },
      { name: "Online Member Portal", icon: "🌐", desc: "Manage your account, statements, loans and membership online.", badge: null, link: "https://webportal.chunasacco.co.ke//#/auth/login" },
    ],
  },
];

const BADGE_COLORS = {
  Popular: { bg: "#2D8A3E", text: "#fff" },
  Instant:  { bg: "#C0392B", text: "#fff" },
  New:      { bg: "#C9A800", text: "#fff" },
  Flagship: { bg: "#1E6B2E", text: "#fff" },
  "24/7":   { bg: "#1E6B2E", text: "#fff" },
};

// ─── PAGE COMPONENTS ──────────────────────────────────────────────────────────

function HeroBanner() {
  return (
    <section style={{ background: "linear-gradient(135deg,#1E6B2E,#2D8A3E,#3AA050)", padding: "60px 0", position: "relative", overflow: "hidden", marginTop: 40 }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.1) 1.5px,transparent 1.5px)", backgroundSize: "28px 28px" }} />
      <div style={{ position: "absolute", right: -20, top: "50%", transform: "translateY(-50%)", fontFamily: "Montserrat,sans-serif", fontWeight: 900, fontSize: 200, color: "rgba(255,255,255,0.04)", pointerEvents: "none", userSelect: "none", lineHeight: 1 }}>14+</div>
      <div style={{ maxWidth: 960, margin: "0 auto", position: "relative", zIndex: 2 }}>
        {/* Breadcrumb */}
        <div style={{ display: "flex", gap: 6, alignItems: "center", fontSize: 11, color: "rgba(255,255,255,.45)", marginBottom: 14 }}>
          <a href="#" style={{ color: "rgba(255,255,255,.45)", textDecoration: "none" }}>Home</a>
          <span style={{ color: "rgba(255,255,255,.25)" }}>/</span>
          <span style={{ color: "rgba(255,255,255,.75)", fontWeight: 600 }}>Products & Services</span>
        </div>
        {/* Badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.9)", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "5px 14px", borderRadius: 100, marginBottom: 16 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#FDE047", display: "inline-block" }} />
          14+ Financial Products
        </div>
        <h1 style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 900, fontSize: "clamp(28px,5vw,48px)", color: "#fff", lineHeight: 1.1, marginBottom: 12 }}>
          Our Products &amp; Services<br />
          <span style={{ color: "#FDE047" }}>Built for Every Kenyan</span>
        </h1>
        <p style={{ color: "rgba(255,255,255,.65)", fontSize: 14, maxWidth: 520, lineHeight: 1.75, marginBottom: 24 }}>
          Chuna Sacco offers BOSA loans, FOSA loans, savings accounts, and digital banking services — all designed to serve every stage of your financial journey.
        </p>
        {/* Quick category links */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {CATEGORIES.map((cat) => (
            <a key={cat.id} href={`#${cat.id}`} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", fontSize: 12, fontWeight: 600, padding: "8px 16px", borderRadius: 8, textDecoration: "none" }}>
              {cat.icon} {cat.label}
            </a>
          ))}
        </div>
        {/* Stats */}
        <div style={{ display: "flex", gap: 32, flexWrap: "wrap", paddingTop: 24, marginTop: 16, borderTop: "1px solid rgba(255,255,255,.12)" }}>
          {[["14+", "Total Products"], ["10%+", "Interest p.a."], ["Ksh 300K", "Max FOSA Loan"], ["24/7", "Digital Access"]].map(([v, l]) => (
            <div key={l}>
              <div style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 900, fontSize: 20, color: "#FDE047" }}>{v}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,.45)", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product, accentColor }) {
  const badge = product.badge ? BADGE_COLORS[product.badge] : null;
  return (
    <a href={product.link} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: "20px", display: "flex", flexDirection: "column", gap: 10, textDecoration: "none", color: "inherit", transition: "transform .2s, box-shadow .2s", cursor: "pointer", borderTop: `3px solid ${accentColor}` }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.1)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ fontSize: 28 }}>{product.icon}</div>
        {badge && (
          <span style={{ background: badge.bg, color: badge.text, fontSize: 9, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", padding: "3px 8px", borderRadius: 100 }}>{product.badge}</span>
        )}
      </div>
      <div>
        <div style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 800, fontSize: 15, color: "#111", marginBottom: 5, lineHeight: 1.3 }}>{product.name}</div>
        <div style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.7 }}>{product.desc}</div>
      </div>
      <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 700, color: accentColor }}>
        Learn more <span style={{ fontSize: 14 }}>→</span>
      </div>
    </a>
  );
}

function CategorySection({ category }) {
  return (
    <section id={category.id} style={{ padding: "60px 32px", background: category.id === "fosa" || category.id === "digital" ? "#F2FAF3" : "#fff" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: category.color, color: "#fff", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", padding: "5px 14px", borderRadius: 100, marginBottom: 12 }}>
              {category.icon} {category.label}
            </div>
            <h2 style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 900, fontSize: "clamp(20px,3vw,28px)", color: "#111", marginBottom: 6, lineHeight: 1.2 }}>{category.heading}</h2>
            <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.7, maxWidth: 520 }}>{category.sub}</p>
          </div>
          <a href={`/${category.id}`} style={{ flexShrink: 0, background: category.color, color: "#fff", fontSize: 12, fontWeight: 700, padding: "10px 20px", borderRadius: 8, textDecoration: "none", whiteSpace: "nowrap" }}>
            View All {category.label} →
          </a>
        </div>
        {/* Cards grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
          {category.products.map((p) => (
            <ProductCard key={p.name} product={p} accentColor={category.color} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyChuna() {
  const items = [
    { icon: "🛡️", title: "SASRA Regulated", desc: "Your deposits are protected under Kenya's Sacco Societies Regulatory Authority framework." },
    { icon: "📈", title: "Min 10% p.a.", desc: "Earn at least 10% annual interest on savings — outperforming most banks." },
    { icon: "⚡", title: "Instant Processing", desc: "Loan applications processed immediately — SMS confirmation within minutes." },
    { icon: "🇰🇪", title: "Open Bond", desc: "Any Kenyan citizen is eligible regardless of where they live or work." },
    { icon: "💳", title: "14+ Products", desc: "Over 14 financial products tailored to every stage of your life." },
    { icon: "📱", title: "24/7 Digital", desc: "Bank via *670#, M-Pesa Paybill 561999, mobile app, or online portal." },
  ];
  return (
    <section style={{ padding: "60px 32px", background: "#fff" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#2D8A3E", color: "#fff", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", padding: "5px 14px", borderRadius: 100, marginBottom: 12 }}>
            ✅ Why Chuna Sacco
          </div>
          <h2 style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 900, fontSize: "clamp(20px,3vw,28px)", color: "#111" }}>The Smart Choice for Every Kenyan</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
          {items.map(({ icon, title, desc }) => (
            <div key={title} style={{ background: "#F2FAF3", border: "1px solid #E8F5EB", borderRadius: 14, padding: 20 }}>
              <div style={{ fontSize: 24, marginBottom: 10 }}>{icon}</div>
              <div style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 800, fontSize: 13, color: "#1E6B2E", marginBottom: 5 }}>{title}</div>
              <div style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.6 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTABanner() {
  return (
    <section style={{ background: "linear-gradient(135deg,#1E6B2E,#3AA050)", padding: "60px 32px", textAlign: "center" }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <h2 style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 900, fontSize: "clamp(22px,4vw,34px)", color: "#fff", marginBottom: 12 }}>Ready to Get Started?</h2>
        <p style={{ color: "rgba(255,255,255,.65)", fontSize: 14, lineHeight: 1.75, marginBottom: 28 }}>
          Join Chuna Sacco and access all 14+ products. Membership processed immediately — receive your member number by SMS in minutes.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
          <a href="https://applications.chunasacco.co.ke/index.php?r=new-membership" style={{ background: "#fff", color: "#1E6B2E", fontFamily: "Montserrat,sans-serif", fontWeight: 800, fontSize: 13, padding: "13px 30px", borderRadius: 10, textDecoration: "none" }}>Join Now</a>
          <a href={`/downloads`} style={{ border: "2px solid rgba(255,255,255,.4)", color: "#fff", fontFamily: "Montserrat,sans-serif", fontWeight: 700, fontSize: 13, padding: "11px 30px", borderRadius: 10, textDecoration: "none" }}>Download Application Form</a>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap", marginTop: 32, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,.12)" }}>
          {[["*670#", "USSD Banking"], ["561999", "M-Pesa Paybill"], ["+254 705 951 672", "Call Us"]].map(([v, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 900, fontSize: 15, color: "#FDE047" }}>{v}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,.45)", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────

export default function ProductsPage() {
  return (
    <div style={{ fontFamily: "Inter, sans-serif", background: "#F2FAF3" }}>
      <HeroBanner />
      {CATEGORIES.map((cat) => <CategorySection key={cat.id} category={cat} />)}
      <WhyChuna />
      <CTABanner />
    </div>
  );
}