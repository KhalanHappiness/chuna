import { useState } from "react";

/**
 * Chuna Sacco — General Products Overview Page
 * Fully styled with Tailwind CSS
 * Brand: Green #2D8A3E | Dark #1E6B2E | Red #C0392B | Gold #C9A800
 */

// ─── DATA ─────────────────────────────────────────────
const CATEGORIES = [
  {
    id: "bosaProducts",
    label: "BOSA Loans",
    icon: "🏦",
    color: "bg-[#2D8A3E]",
    textColor: "text-[#2D8A3E]",
    hex: "#2D8A3E",
    bgSection: "bg-white",
    heading: "Back Office Savings Activities",
    sub: "Long-term credit secured against your non-withdrawable deposit savings.",
    products: [
      { name: "Normal Loan",          icon: "📋", desc: "Borrow up to 3× your deposits with repayment up to 48 months.",           badge: "Popular", link: "/bosaProducts" },
      { name: "Emergency Loan",       icon: "🚨", desc: "Fast emergency credit up to Ksh 100,000 repayable in 12 months.",          badge: null,      link: "/bosaProducts" },
      { name: "Development Loan",     icon: "🏗️", desc: "Finance construction, business ventures and long-term investments.",        badge: null,      link: "/bosaProducts" },
      { name: "School Fees Loan",     icon: "🎓", desc: "Per-term disbursement to keep your children in school always.",             badge: null,      link: "/bosaProducts" },
      { name: "M-CHUNA Loan",         icon: "📲", desc: "Instant loan up to Ksh 50,000 via *670# — no guarantors needed.",          badge: "Instant", link: "/bosaProducts" },
    ],
  },
  {
    id: "fosaProducts",
    label: "FOSA Loans",
    icon: "💳",
    color: "bg-[#C0392B]",
    textColor: "text-[#C0392B]",
    hex: "#C0392B",
    bgSection: "bg-[#F2FAF3]",
    heading: "Front Office Service Activities",
    sub: "Fast credit for members whose salaries are processed through Chuna FOSA.",
    products: [
      { name: "Salary Advance",           icon: "💼", desc: "Access up to 60% of your basic salary at 13% p.a. effective rate.",            badge: "Popular", link: "/fosaProducts" },
      { name: "Instant Salary Advance",   icon: "⚡", desc: "80% of your net salary disbursed within 3 hours. Recovered in 1 month.",       badge: "Instant", link: "/fosaProducts" },
      { name: "FOSA Emergency Loan",      icon: "🚑", desc: "Up to Ksh 300,000 for unexpected needs, repayable in 12 months.",              badge: null,      link: "/fosaProducts" },
      { name: "FOSA Emergency 20",        icon: "🔥", desc: "Improved product — Ksh 300,000 over 20 months for easier repayment.",          badge: "New",     link: "/fosaProducts" },
      { name: "New Member Loan",          icon: "🌟", desc: "Up to Ksh 100,000 for new members — builds your deposits as you borrow.",      badge: null,      link: "/fosaProducts" },
      { name: "Loan Top-Up & Clearance",  icon: "🔄", desc: "Top up existing loans or clear external bank debts.",                         badge: null,      link: "/fosaProducts" },
    ],
  },
  {
    id: "savings",
    label: "Savings Accounts",
    icon: "💰",
    color: "bg-[#C9A800]",
    textColor: "text-[#C9A800]",
    hex: "#C9A800",
    bgSection: "bg-white",
    heading: "Savings & Deposit Products",
    sub: "Earn a minimum of 10% p.a. interest on all savings accounts. Withdrawable 3× per year.",
    products: [
      { name: "Education Savings", icon: "🎒", desc: "Save specifically for your children's education with term-timed withdrawals.", badge: null, link: "/products/savings" },
      { name: "Holiday Savings",   icon: "✈️", desc: "Save for vacations and festive seasons. 3 withdrawals per year.",             badge: null, link: "/products/savings" },
      { name: "Junior Savings",    icon: "👧", desc: "Start your child's financial future early. Parent/guardian operated.",         badge: null, link: "/products/savings" },
    ],
  },
  {
    id: "digital",
    label: "Digital Banking",
    icon: "📱",
    color: "bg-[#1E6B2E]",
    textColor: "text-[#1E6B2E]",
    hex: "#1E6B2E",
    bgSection: "bg-[#F2FAF3]",
    heading: "Bank Anytime, Anywhere",
    sub: "Access all Chuna Sacco products 24/7 through our digital channels — no branch visit required.",
    products: [
      { name: "USSD *670#",            icon: "📱", desc: "Dial *670# on any phone, any network in Kenya. Balance, transfers, loans.", badge: "24/7", link: "#" },
      { name: "M-Pesa Paybill 561999", icon: "💚", desc: "Deposit to FOSA or BOSA instantly via M-Pesa. Available round the clock.", badge: "24/7", link: "#" },
      { name: "Mobile App",            icon: "📲", desc: "Full-service Sacco banking on your smartphone — Android & iOS.",           badge: "New",  link: "#" },
      { name: "Online Member Portal",  icon: "🌐", desc: "Manage your account, statements, loans and membership online.",            badge: null,  link: "https://webportal.chunasacco.co.ke//#/auth/login" },
    ],
  },
];

const BADGE_STYLES = {
  Popular: "bg-[#2D8A3E] text-white",
  Instant: "bg-[#C0392B] text-white",
  New:     "bg-[#C9A800] text-white",
  Flagship:"bg-[#1E6B2E] text-white",
  "24/7":  "bg-[#1E6B2E] text-white",
};

const WHY_ITEMS = [
  { icon: "🛡️", title: "SASRA Regulated",   desc: "Your deposits are protected under Kenya's Sacco Societies Regulatory Authority framework." },
  { icon: "📈", title: "Min 10% p.a.",       desc: "Earn at least 10% annual interest on savings — outperforming most banks." },
  { icon: "⚡", title: "Instant Processing", desc: "Loan applications processed immediately — SMS confirmation within minutes." },
  { icon: "🇰🇪", title: "Open Bond",         desc: "Any Kenyan citizen is eligible regardless of where they live or work." },
  { icon: "💳", title: "14+ Products",       desc: "Over 14 financial products tailored to every stage of your life." },
  { icon: "📱", title: "24/7 Digital",       desc: "Bank via *670#, M-Pesa Paybill 561999, mobile app, or online portal." },
];

// ─── HERO BANNER ──────────────────────────────────────
function HeroBanner() {
  return (
    <section
      className="relative overflow-hidden py-16 px-3 sm:px-4 lg:px-8"
      style={{ background: "linear-gradient(135deg,#1E6B2E,#2D8A3E,#3AA050)", marginTop:55  }}
    >
      {/* dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.1) 1.5px,transparent 1.5px)", backgroundSize: "28px 28px" }}
      />
      {/* watermark */}
      <div
        className="absolute right-[-20px] top-1/2 -translate-y-1/2 font-black text-white/[0.04] leading-none select-none pointer-events-none"
        style={{ fontFamily: "Montserrat,sans-serif", fontSize: "clamp(100px,18vw,200px)" }}
      >
        17+
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
       

        {/* badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-300 inline-block" />
          17+ Financial Products
        </div>

        {/* heading */}
        <h1
          className="font-black text-white leading-tight mb-3"
          style={{ fontFamily: "Montserrat,sans-serif", fontSize: "clamp(28px,5vw,48px)" }}
        >
          Our Products &amp; Services<br />
          <span className="text-yellow-300">Built for Every Kenyan</span>
        </h1>

        <p className="text-white/65 text-sm leading-relaxed max-w-xl mb-6">
          Chuna Sacco offers BOSA loans, FOSA loans, savings accounts, and digital banking services — all designed to serve every stage of your financial journey.
        </p>

        {/* quick-jump category pills */}
        <div className="flex gap-2.5 flex-wrap mb-6">
          {CATEGORIES.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-white/20 transition-colors"
            >
              {cat.icon} {cat.label}
            </a>
          ))}
        </div>

        {/* stats */}
        <div className="flex gap-8 flex-wrap pt-5 border-t border-white/10">
          {[["17+", "Total Products"], ["10%+", "Interest p.a."], ["Ksh 300K", "Max FOSA Loan"], ["24/7", "Digital Access"]].map(([v, l]) => (
            <div key={l}>
              <div className="font-black text-yellow-300 text-xl" style={{ fontFamily: "Montserrat,sans-serif" }}>{v}</div>
              <div className="text-white/45 text-[10px] uppercase tracking-wider mt-0.5">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PRODUCT CARD ─────────────────────────────────────
function ProductCard({ product, hex }) {
  const badge = product.badge ? BADGE_STYLES[product.badge] : null;
  return (
    <a
      href={product.link}
      className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col gap-3 no-underline text-inherit hover:-translate-y-1 hover:shadow-xl transition-all duration-200 cursor-pointer"
      style={{ borderTop: `3px solid ${hex}` }}
    >
      <div className="flex justify-between items-start">
        <span className="text-3xl">{product.icon}</span>
        {badge && (
          <span className={`${badge} text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full`}>
            {product.badge}
          </span>
        )}
      </div>
      <div>
        <div className="font-black text-gray-900 text-sm mb-1 leading-snug" style={{ fontFamily: "Montserrat,sans-serif" }}>
          {product.name}
        </div>
        <div className="text-xs text-gray-500 leading-relaxed">{product.desc}</div>
      </div>
      <div className="mt-auto flex items-center gap-1 text-xs font-bold" style={{ color: hex }}>
        Learn more <span>→</span>
      </div>
    </a>
  );
}

// ─── CATEGORY SECTION ─────────────────────────────────
function CategorySection({ category }) {
  return (
    <section id={category.id} className={`py-16 px-3 sm:px-4 lg:px-8 ${category.bgSection}`}>
      <div className="max-w-6xl mx-auto">

        {/* section header row */}
        <div className="flex items-start justify-between flex-wrap gap-4 mb-8">
          <div>
            <div className={`inline-flex items-center gap-2 ${category.color} text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-3`}>
              {category.icon} {category.label}
            </div>
            <h2
              className="font-black text-gray-900 mb-2 leading-tight"
              style={{ fontFamily: "Montserrat,sans-serif", fontSize: "clamp(20px,3vw,28px)" }}
            >
              {category.heading}
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed max-w-lg">{category.sub}</p>
          </div>
          <a
            href={`/${category.id}`}
            className={`flex-shrink-0 ${category.color} text-white text-xs font-bold px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity no-underline whitespace-nowrap`}
          >
            View All {category.label} →
          </a>
        </div>

        {/* product cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {category.products.map((p) => (
            <ProductCard key={p.name} product={p} hex={category.hex} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── WHY CHUNA ────────────────────────────────────────
function WhyChuna() {
  return (
    <section className="py-16 px-3 sm:px-4 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[#2D8A3E] text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-3">
            ✅ Why Chuna Sacco
          </div>
          <h2
            className="font-black text-gray-900"
            style={{ fontFamily: "Montserrat,sans-serif", fontSize: "clamp(20px,3vw,28px)" }}
          >
            The Smart Choice for Every Kenyan
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {WHY_ITEMS.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="bg-[#F2FAF3] border border-[#E8F5EB] rounded-2xl p-5 hover:-translate-y-1 hover:shadow-md transition-all"
            >
              <div className="text-2xl mb-3">{icon}</div>
              <div className="font-black text-[#1E6B2E] text-sm mb-1.5" style={{ fontFamily: "Montserrat,sans-serif" }}>
                {title}
              </div>
              <div className="text-xs text-gray-500 leading-relaxed">{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA BANNER ───────────────────────────────────────
function CTABanner() {
  return (
    <section
      className="py-16 px-6 text-center"
      style={{ background: "linear-gradient(135deg,#1E6B2E,#3AA050)" }}
    >
      <div className="max-w-xl mx-auto">
        <h2
          className="font-black text-white mb-3"
          style={{ fontFamily: "Montserrat,sans-serif", fontSize: "clamp(22px,4vw,34px)" }}
        >
          Ready to Get Started?
        </h2>
        <p className="text-white/65 text-sm leading-relaxed mb-8">
          Join Chuna Sacco and access all 14+ products. Membership processed immediately — receive your member number by SMS in minutes.
        </p>

        {/* CTA buttons */}
        <div className="flex justify-center gap-3 flex-wrap mb-8">
          <a
            href="https://applications.chunasacco.co.ke/index.php?r=new-membership"
            className="bg-white text-[#1E6B2E] font-black text-sm px-8 py-3.5 rounded-xl hover:bg-yellow-50 transition-colors no-underline"
            style={{ fontFamily: "Montserrat,sans-serif" }}
          >
            Join Now
          </a>
          <a
            href="/downloads"
            className="border-2 border-white/40 text-white font-bold text-sm px-8 py-3 rounded-xl hover:border-white hover:bg-white/10 transition-all no-underline"
            style={{ fontFamily: "Montserrat,sans-serif" }}
          >
            Download Application Form
          </a>
        </div>

        {/* quick contact strip */}
        <div className="flex justify-center gap-8 flex-wrap pt-6 border-t border-white/10">
          {[["*670#", "USSD Banking"], ["561999", "M-Pesa Paybill"], ["+254 705 951 672", "Call Us"]].map(([v, l]) => (
            <div key={l} className="text-center">
              <div className="font-black text-yellow-300 text-sm" style={{ fontFamily: "Montserrat,sans-serif" }}>{v}</div>
              <div className="text-white/45 text-[10px] uppercase tracking-wider mt-0.5">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── ROOT ─────────────────────────────────────────────
export default function ProductsPage() { 
  return (
    <div className="font-sans bg-[#F2FAF3]">
      <HeroBanner />
      {CATEGORIES.map((cat) => (
        <CategorySection key={cat.id} category={cat} />
      ))}
      <WhyChuna />
      
    </div>
  );
}