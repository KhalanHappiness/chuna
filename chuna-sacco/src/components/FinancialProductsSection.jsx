import { useState } from "react";
import { Users, TrendingUp, Shield, BookOpen, Building2, CreditCard, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const products = [
  {
    icon: BookOpen,
    title: "FOSA Products",
    tag: "Front Office",
    description: "Deepening financial service delivery through our Front Office Service Activities — banking solutions built around you.",
    stat: "50,000+",
    statLabel: "Members Served",
    accent: "#16a34a",
    light: "#dcfce7",
  },
  {
    icon: CreditCard,
    title: "Online Services",
    tag: "Digital Banking",
    description: "Apply for instant loans and manage your account from anywhere, anytime — right from your phone.",
    stat: "24/7",
    statLabel: "Always Available",
    accent: "#0891b2",
    light: "#cffafe",
  },
  {
    icon: TrendingUp,
    title: "Member Savings",
    tag: "Grow Wealth",
    description: "Diverse savings accounts designed to match the dynamic demands of modern Kenyan life.",
    stat: "12%",
    statLabel: "Annual Returns",
    accent: "#7c3aed",
    light: "#ede9fe",
  },
  {
    icon: Users,
    title: "BOSA Products",
    tag: "Back Office",
    description: "Tailored loan products crafted with a keen understanding of each individual member's requirements.",
    stat: "KSh 5M",
    statLabel: "Max Loan Limit",
    accent: "#ea580c",
    light: "#ffedd5",
  },
];

const quickLinks = [
  { icon: Shield, label: "Emergency Loan", sub: "Instant approval" },
  { icon: Building2, label: "Development Loan", sub: "Home & business" },
  { icon: BookOpen, label: "School Fees Loan", sub: "Up to KSh 500K" },
  { icon: CreditCard, label: "M-CHUNA", sub: "Mobile money" },
  { icon: TrendingUp, label: "Insurance Cover", sub: "Life & loan cover" },
];

export default function FinancialProductsSection() {
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();

  return (
    <section style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: "#f8f9f4", padding: "80px 0", overflow: "hidden" }}>

      {/* Header */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 24, marginBottom: 64 }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#16a34a", color: "white", padding: "6px 16px", borderRadius: 999, fontSize: 13, fontFamily: "sans-serif", fontWeight: 600, letterSpacing: "0.08em", marginBottom: 16 }}>
              <Sparkles size={13} />
              FINANCIAL SOLUTIONS
            </div>
            <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, color: "#111", lineHeight: 1.1, margin: 0 }}>
              Built for Every<br />
              <span style={{ color: "#16a34a", fontStyle: "italic" }}>Stage of Life</span>
            </h2>
          </div>
          <p style={{ maxWidth: 340, color: "#555", lineHeight: 1.7, fontFamily: "sans-serif", fontSize: 15, margin: 0 }}>
            From savings to loans, insurance to digital banking — we provide the tools you need to thrive financially across Kenya.
          </p>
        </div>

        {/* Main Cards Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20, marginBottom: 24 }}>
          {products.map((p, i) => {
            const isHovered = hovered === i;
            return (
              <div
                key={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: isHovered ? p.accent : "white",
                  border: `2px solid ${isHovered ? p.accent : "#e5e7eb"}`,
                  borderRadius: 20,
                  padding: 32,
                  cursor: "pointer",
                  transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
                  transform: isHovered ? "translateY(-8px)" : "translateY(0)",
                  boxShadow: isHovered ? `0 20px 60px ${p.accent}40` : "0 2px 8px rgba(0,0,0,0.05)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Decorative blob */}
                <div style={{
                  position: "absolute", top: -30, right: -30,
                  width: 120, height: 120,
                  borderRadius: "50%",
                  background: isHovered ? "rgba(255,255,255,0.1)" : p.light,
                  transition: "all 0.35s ease",
                }} />

                {/* Tag */}
                <div style={{
                  display: "inline-block",
                  background: isHovered ? "rgba(255,255,255,0.2)" : p.light,
                  color: isHovered ? "white" : p.accent,
                  fontSize: 11,
                  fontFamily: "sans-serif",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  padding: "4px 12px",
                  borderRadius: 999,
                  marginBottom: 20,
                  transition: "all 0.35s ease",
                }}>
                  {p.tag.toUpperCase()}
                </div>

                {/* Icon */}
                <div style={{
                  width: 52, height: 52,
                  borderRadius: 14,
                  background: isHovered ? "rgba(255,255,255,0.2)" : p.light,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 20,
                  transition: "all 0.35s ease",
                }}>
                  <p.icon size={24} color={isHovered ? "white" : p.accent} />
                </div>

                {/* Title */}
                <h3 style={{
                  fontSize: 22, fontWeight: 700,
                  color: isHovered ? "white" : "#111",
                  margin: "0 0 12px",
                  transition: "color 0.35s ease",
                }}>
                  {p.title}
                </h3>

                {/* Description */}
                <p style={{
                  fontSize: 14, lineHeight: 1.7,
                  color: isHovered ? "rgba(255,255,255,0.85)" : "#666",
                  fontFamily: "sans-serif",
                  margin: "0 0 24px",
                  transition: "color 0.35s ease",
                }}>
                  {p.description}
                </p>

                {/* Stat */}
                <div style={{
                  borderTop: `1px solid ${isHovered ? "rgba(255,255,255,0.2)" : "#f0f0f0"}`,
                  paddingTop: 20,
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  transition: "border-color 0.35s ease",
                }}>
                  <div>
                    <div style={{ fontSize: 26, fontWeight: 800, color: isHovered ? "white" : p.accent, transition: "color 0.35s ease" }}>
                      {p.stat}
                    </div>
                    <div style={{ fontSize: 12, fontFamily: "sans-serif", color: isHovered ? "rgba(255,255,255,0.7)" : "#999", transition: "color 0.35s ease" }}>
                      {p.statLabel}
                    </div>
                  </div>
                  <div style={{
                    width: 40, height: 40,
                    borderRadius: "50%",
                    background: isHovered ? "rgba(255,255,255,0.2)" : p.light,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.35s ease",
                  }}>
                    <ArrowRight size={18} color={isHovered ? "white" : p.accent} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>


        {/* CTA */}
        <div style={{ textAlign: "center" }}>
          <button 
          onClick={()=> navigate('/fosaProducts')}
          style={{
            background: "#16a34a",
            color: "white",
            border: "none",
            borderRadius: 12,
            padding: "16px 40px",
            fontSize: 15,
            fontWeight: 700,
            fontFamily: "sans-serif",
            cursor: "pointer",
            letterSpacing: "0.05em",
            boxShadow: "0 8px 30px rgba(22,163,74,0.35)",
            transition: "all 0.2s ease",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(22,163,74,0.45)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(22,163,74,0.35)"; }}
          >
            View All Products & Services
          </button>
        </div>
      </div>
    </section>
  );
}