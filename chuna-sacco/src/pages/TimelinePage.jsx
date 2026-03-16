import { useState } from "react";

/**
 * Chuna Sacco — History & Timeline Page
 * Inspired by the Stima Sacco timeline layout.
 * Brand colours: Green #2D8A3E | Red #C0392B | Gold #C9A800 | White #FFFFFF
 *
 * Usage in your React + Tailwind project:
 *   import ChunaSaccoTimeline from './ChunaSaccoTimeline';
 *   <ChunaSaccoTimeline />
 *
 * Add to tailwind.config.js extend.colors:
 *   'sacco-green': '#2D8A3E'
 *   'sacco-dark':  '#1E6B2E'
 *   'sacco-light': '#E8F5EB'
 *   'sacco-pale':  '#F2FAF3'
 *   'sacco-red':   '#C0392B'
 *   'sacco-gold':  '#C9A800'
 */

/* ── DATA ───────────────────────────────────────────── */
const milestones = [
  {
    year: "1976",
    title: "The Beginning — Chuna Sacco is Founded",
    body: "On 24th March 1976, Chuna Savings and Credit Co-operative Society Limited was registered under the Co-operatives Act as CS/2466 by the Commissioner of Cooperative Development. Founded by University of Nairobi members of staff, the Sacco was born with a single purpose: to organise and promote the welfare and economic interests of its members.",
    highlight: "Registration No. CS/2466 — 24th March 1976",
    icon: "🏛️",
    color: "green",
  },
  {
    year: "1980s",
    title: "Growing Roots at the University",
    body: "Through the 1980s, Chuna Sacco steadily expanded its membership base across the University of Nairobi community. The Sacco established its operational framework, offering staff members reliable savings facilities and affordable credit — laying a strong foundation of trust and mutual support.",
    highlight: "Serving University of Nairobi staff with pride",
    icon: "🌱",
    color: "gold",
  },
  {
    year: "1990s",
    title: "Expanding Products & Services",
    body: "During the 1990s, Chuna Sacco diversified its product range to better serve its growing membership. New loan products were introduced and savings accounts were structured to cater to varying member needs — from emergency credit to long-term savings vehicles.",
    highlight: "Diversified loan and savings portfolio",
    icon: "📈",
    color: "green",
  },
  {
    year: "2000s",
    title: "Embracing BOSA & FOSA",
    body: "Chuna Sacco formalised its dual-service model, operating both Back Office Service Activities (BOSA) and Front Office Service Activities (FOSA). This structure enabled the Sacco to offer full banking-like services including salary processing, current accounts, and withdrawable savings — all under one roof at the University of Nairobi main campus.",
    highlight: "BOSA + FOSA — full financial services under one roof",
    icon: "🏦",
    color: "red",
  },
  {
    year: "2010",
    title: "SASRA Regulation — A Mark of Trust",
    body: "Chuna Sacco was duly registered by the Sacco Societies Regulatory Authority (SASRA) as a Deposit-Taking Sacco (DTS), meeting stringent capital adequacy standards. This milestone cemented the Sacco's credibility and positioned it as a trustworthy, regulated financial institution for all members.",
    highlight: "SASRA Deposit-Taking Sacco (DTS) — License secured",
    icon: "✅",
    color: "green",
  },
  {
    year: "2014",
    title: "Capital Adequacy & Member Share Drive",
    body: "In 2014, Chuna Sacco launched a concerted effort to meet SASRA's capital adequacy ratios through a member share-raising campaign. Members were encouraged to contribute additional shares, strengthening the Sacco's financial base and enabling it to extend even more credit to its growing membership.",
    highlight: "Capital adequacy target achieved with member support",
    icon: "💰",
    color: "gold",
  },
  {
    year: "2016",
    title: "Open Bond — Welcoming All Kenyans",
    body: "Chuna Sacco transitioned to an open common bond, opening its membership to all Kenyan citizens regardless of their area of residence or employment. This transformational decision turned the Sacco from a university-exclusive institution into a national cooperative — available to every Kenyan seeking affordable financial services.",
    highlight: "Open bond — any Kenyan can now join Chuna Sacco",
    icon: "🇰🇪",
    color: "green",
  },
  {
    year: "2018",
    title: "Mobile Banking via USSD *670#",
    body: "Chuna Sacco launched its USSD mobile banking platform — dial *670# — enabling members to check balances, make transfers, apply for loans, and access financial services from any phone, on any network, anywhere in Kenya. A game-changer in the Sacco sector, aligned with Kenya's leadership in mobile money.",
    highlight: "Dial *670# — banking for every Kenyan, every phone",
    icon: "📱",
    color: "red",
  },
  {
    year: "2019",
    title: "M-Pesa Paybill 561999",
    body: "The introduction of M-Pesa Paybill number 561999 made depositing into FOSA and BOSA accounts seamless for all members. Members could now deposit savings and repay loans instantly from M-Pesa, 24 hours a day, 7 days a week — removing the need to visit a branch for routine transactions.",
    highlight: "Paybill 561999 — deposit anytime via M-Pesa",
    icon: "💳",
    color: "gold",
  },
  {
    year: "2020",
    title: "Ksh 2.5 Billion Asset Base",
    body: "Chuna Sacco's 2020 audited financial statements revealed an asset base exceeding Ksh 2.5 billion — a testament to decades of prudent financial management, growing membership, and member confidence. This milestone positioned the Sacco as a significant player in Kenya's cooperative financial sector.",
    highlight: "Ksh 2.5B+ asset base — 2020 audited financials",
    icon: "📊",
    color: "green",
  },
  {
    year: "2022",
    title: "Digital Member Portal & Online Applications",
    body: "Chuna Sacco launched its online member web portal at chunawebportal.chunasacco.co.ke, allowing members to access statements, apply for loans, and manage their accounts entirely online. Membership applications were also digitised — with SMS confirmation of membership numbers delivered within 5 minutes of online submission.",
    highlight: "Online portal + instant membership processing",
    icon: "🌐",
    color: "red",
  },
  {
    year: "2024",
    title: "Mobile App — Full Service Banking on the Go",
    body: "Chuna Sacco launched its dedicated mobile application, bringing the full suite of Sacco services to members' smartphones. The app offers loan applications, account management, savings tracking, and real-time notifications — completing Chuna's digital transformation journey and ensuring members are served wherever they are.",
    highlight: "Mobile app live — 14+ products at your fingertips",
    icon: "🚀",
    color: "gold",
  },
  {
    year: "2025",
    title: "50 Years of Empowering Kenyans",
    body: "As Chuna Sacco celebrates nearly five decades of service, the institution stands as a beacon of cooperative financial empowerment in Kenya. From a handful of University of Nairobi staff members to a nationwide open-bond Sacco serving thousands of Kenyans — the journey continues. Here's to 50 more years of walking with our members towards prosperity.",
    highlight: "\"The University Sacco\" — serving all Kenyans since 1976",
    icon: "🏆",
    color: "green",
  },
];

const colorMap = {
  green: {
    bg: "bg-[#2D8A3E]",
    bgLight: "bg-[#E8F5EB]",
    border: "border-[#2D8A3E]",
    text: "text-[#2D8A3E]",
    badge: "bg-[#2D8A3E] text-white",
    dot: "bg-[#2D8A3E]",
    ring: "ring-[#2D8A3E]",
    highlight: "bg-[#E8F5EB] border-l-4 border-[#2D8A3E] text-[#1E6B2E]",
  },
  red: {
    bg: "bg-[#C0392B]",
    bgLight: "bg-red-50",
    border: "border-[#C0392B]",
    text: "text-[#C0392B]",
    badge: "bg-[#C0392B] text-white",
    dot: "bg-[#C0392B]",
    ring: "ring-[#C0392B]",
    highlight: "bg-red-50 border-l-4 border-[#C0392B] text-[#C0392B]",
  },
  gold: {
    bg: "bg-[#C9A800]",
    bgLight: "bg-yellow-50",
    border: "border-[#C9A800]",
    text: "text-[#9A7F00]",
    badge: "bg-[#C9A800] text-white",
    dot: "bg-[#C9A800]",
    ring: "ring-[#C9A800]",
    highlight: "bg-yellow-50 border-l-4 border-[#C9A800] text-[#7A6000]",
  },
};


/* ── HERO BANNER ─────────────────────────────────────── */
function HeroBanner() {
  return (
    <section
      className="relative overflow-hidden py-24 px-6 text-white text-center"
      style={{ background: "linear-gradient(135deg, #1E6B2E 0%, #2D8A3E 50%, #3AA050 100%)" }}
    >
      {/* dot pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(white 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* large year watermark */}
      <div className="absolute bottom-0 right-8 font-black text-white/5 select-none leading-none"
        style={{ fontSize: "220px", fontFamily: "Montserrat, sans-serif" }}>
        1976
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* breadcrumb */}
        <div className="flex items-center justify-center gap-2 text-white/60 text-xs mb-6">
          <a href="#" className="hover:text-white transition-colors">Home</a>
          <span>/</span>
          <a href="#" className="hover:text-white transition-colors">About</a>
          <span>/</span>
          <span className="text-white font-semibold">Our Timeline</span>
        </div>

        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
          <span className="w-2 h-2 rounded-full bg-[#C9A800] inline-block" />
          Our History
        </div>

        <h1 className="font-black text-4xl md:text-6xl leading-tight mb-6"
          style={{ fontFamily: "Montserrat, sans-serif" }}>
          50 Years of Walking<br />
          <span className="text-yellow-300">With Our Members</span>
        </h1>

        <p className="text-white/70 text-lg leading-relaxed max-w-xl mx-auto mb-8">
          From a small savings circle among University of Nairobi staff in 1976 to a nationwide open-bond Sacco serving thousands of Kenyans — this is our story.
        </p>

        {/* stats row */}
        <div className="flex justify-center gap-10 flex-wrap mt-8 pt-8 border-t border-white/15">
          {[["1976", "Year Founded"], ["50+", "Years of Service"], ["Ksh 2.5B+", "Asset Base"], ["14+", "Products"]].map(
            ([v, l]) => (
              <div key={l} className="text-center">
                <div className="font-black text-2xl text-yellow-300" style={{ fontFamily: "Montserrat, sans-serif" }}>{v}</div>
                <div className="text-white/50 text-xs uppercase tracking-wider mt-1">{l}</div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}

/* ── TIMELINE ITEM ──────────────────────────────────── */
function TimelineItem({ item, index }) {
  const isLeft = index % 2 === 0;
  const c = colorMap[item.color];

  return (
    <div className={`relative flex items-start gap-0 md:gap-8 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} flex-row mb-0`}>

      {/* ── CARD ── */}
      <div className={`flex-1 pb-16 ${isLeft ? "md:text-right md:pr-12" : "md:text-left md:pl-12"} pl-10 md:pl-0`}>
        <div
          className={`bg-white rounded-2xl p-7 shadow-md border border-gray-100 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 inline-block w-full`}
        >
          {/* icon + year badge */}
          <div className={`flex items-center gap-3 mb-4 ${isLeft ? "md:justify-end" : "justify-start"}`}>
            <span className={`${c.badge} text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full`}>
              {item.year}
            </span>
            <span className="text-2xl">{item.icon}</span>
          </div>

          <h3 className="font-black text-gray-900 text-lg md:text-xl mb-3 leading-snug"
            style={{ fontFamily: "Montserrat, sans-serif" }}>
            {item.title}
          </h3>

          <p className="text-gray-500 text-sm leading-relaxed mb-4">{item.body}</p>

          {/* highlight strip */}
          <div className={`${c.highlight} px-4 py-3 rounded-lg text-xs font-semibold`}>
            {item.highlight}
          </div>
        </div>
      </div>

      {/* ── SPINE DOT (desktop only, hidden on mobile — line is on the left) ── */}
      <div className="hidden md:flex flex-col items-center flex-shrink-0" style={{ width: 60 }}>
        <div
          className={`w-10 h-10 rounded-full ${c.bg} flex items-center justify-center text-white font-black text-xs ring-4 ring-white shadow-lg z-10 relative`}
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          {item.year.slice(-2)}
        </div>
      </div>

      {/* ── SPACER (opposite side) ── */}
      <div className="flex-1 hidden md:block" />
    </div>
  );
}

/* ── MOBILE DOT (left spine on small screens) ──────── */
/* handled inline via absolute positioning */

/* ── FULL TIMELINE SECTION ─────────────────────────── */
function Timeline() {
  return (
    <section className="bg-[#F2FAF3] py-20 px-6">
      <div className="max-w-5xl mx-auto">

        {/* section header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 bg-[#2D8A3E] text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
            📅 Timeline
          </span>
          <h2 className="font-black text-3xl md:text-4xl text-gray-900 mt-4"
            style={{ fontFamily: "Montserrat, sans-serif" }}>
            Our Journey Through the Years
          </h2>
          <p className="text-gray-400 mt-3 max-w-lg mx-auto text-sm leading-relaxed">
            Every milestone is a chapter in a story written by our members, our staff, and our shared belief in cooperative prosperity.
          </p>
        </div>

        {/* timeline wrapper */}
        <div className="relative">

          {/* vertical centre spine (desktop) */}
          <div
            className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-[#2D8A3E] via-[#C9A800] to-[#C0392B] opacity-30"
          />

          {/* mobile left spine */}
          <div
            className="md:hidden absolute top-0 bottom-0 left-4 w-0.5 bg-gradient-to-b from-[#2D8A3E] via-[#C9A800] to-[#C0392B] opacity-30"
          />

          {milestones.map((item, i) => (
            <div key={item.year} className="relative">
              {/* mobile dot */}
              <div
                className={`md:hidden absolute left-0 top-7 w-8 h-8 rounded-full ${colorMap[item.color].bg} flex items-center justify-center text-white text-[10px] font-black ring-2 ring-white shadow z-10`}
              >
                {item.year.slice(-2)}
              </div>
              <TimelineItem item={item} index={i} />
            </div>
          ))}

          {/* end cap */}
          <div className="flex justify-center mt-4 relative z-10">
            <div className="bg-[#2D8A3E] text-white font-black text-xs px-6 py-3 rounded-full shadow-lg tracking-widest">
              AND THE JOURNEY CONTINUES…
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── QUOTE BANNER ────────────────────────────────────── */
function QuoteBanner() {
  return (
    <section
      className="py-16 px-6 text-center text-white"
      style={{ background: "linear-gradient(135deg, #1E6B2E, #3AA050)" }}
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-5xl text-white/20 font-black mb-4" style={{ fontFamily: "Georgia, serif" }}>"</div>
        <blockquote className="text-xl md:text-2xl font-semibold leading-relaxed text-white/90 mb-6">
          In 50 years we've built more than an institution — we've built a legacy.<br />
          <span className="text-yellow-300">Here's to 50 more years of success.</span>
        </blockquote>
        <p className="text-white/50 text-sm">— Chuna DT Sacco Society Limited</p>
      </div>
    </section>
  );
}

/* ── NEXT 50 YEARS CTA ───────────────────────────────── */
function NextFifty() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <span className="inline-flex items-center gap-2 bg-[#C9A800] text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4">
            🌟 The Next 50 Years
          </span>
          <h2 className="font-black text-3xl md:text-4xl text-gray-900 mt-4 mb-6"
            style={{ fontFamily: "Montserrat, sans-serif" }}>
            Building a Brighter<br />
            <span className="text-[#2D8A3E]">Future Together</span>
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            As we celebrate nearly five decades of empowering Kenyans, our vision for the future is clear — to become the leading Sacco providing quality and dynamic financial services to all our members, wherever they are in Kenya and beyond.
          </p>
          <div className="flex flex-col gap-3 mb-8">
            {[
              "Expanding digital banking across Kenya",
              "Introducing new innovative loan products",
              "Growing our nationwide membership base",
              "Enhancing member dividends and returns",
            ].map((pt) => (
              <div key={pt} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#2D8A3E] flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3" fill="white" viewBox="0 0 20 20">
                    <path d="M7 13.4L3.6 10 2.2 11.4 7 16.2 17.8 5.4 16.4 4z" />
                  </svg>
                </div>
                <p className="text-gray-600 text-sm">{pt}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-3 flex-wrap">
            <a
              href="https://applications.chunasacco.co.ke/index.php?r=new-membership"
              className="bg-[#2D8A3E] text-white font-bold px-8 py-4 rounded-xl text-sm hover:bg-[#1E6B2E] transition-colors"
            >
              Join Our Journey
            </a>
            <a
              href="#"
              className="border-2 border-[#2D8A3E] text-[#2D8A3E] font-bold px-8 py-4 rounded-xl text-sm hover:bg-[#E8F5EB] transition-colors"
            >
              Learn About Us
            </a>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5">
          {[
            { val: "1976", lbl: "Year Founded", color: "bg-[#2D8A3E]" },
            { val: "50+", lbl: "Years of Service", color: "bg-[#C0392B]" },
            { val: "Ksh 2.5B+", lbl: "Asset Base (2020)", color: "bg-[#C9A800]" },
            { val: "14+", lbl: "Financial Products", color: "bg-[#1E6B2E]" },
            { val: "*670#", lbl: "USSD Banking Code", color: "bg-[#C0392B]" },
            { val: "561999", lbl: "M-Pesa Paybill", color: "bg-[#2D8A3E]" },
          ].map(({ val, lbl, color }) => (
            <div
              key={lbl}
              className={`${color} text-white rounded-2xl p-6 text-center hover:opacity-90 transition-opacity`}
            >
              <div className="font-black text-2xl mb-1" style={{ fontFamily: "Montserrat, sans-serif" }}>
                {val}
              </div>
              <div className="text-white/70 text-xs">{lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



/* ── ROOT ────────────────────────────────────────────── */
export default function TimelinePage() {
  return (
    <div style={{ fontFamily: "Inter, sans-serif" }}>
      <HeroBanner />
      <Timeline />
      <QuoteBanner />
      <NextFifty />
    </div>
  );
} 