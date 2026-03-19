import { useState, useEffect } from "react";

/* ─────────────────────────────────────────────────────
   Chuna Sacco — Timeline Page
   Complete file. Just import and use:
     import TimelinePage from "./TimelinePage";
───────────────────────────────────────────────────── */

// ─── 1. MILESTONE DATA ────────────────────────────────
const milestones = [
  {
    year: "1976",
    title: "The Beginning — Chuna Sacco is Founded",
    body: "On 24th March 1976, Chuna Savings and Credit Co-operative Society Limited was registered under the Co-operatives Act as CS/2466. Founded by University of Nairobi members of staff, the Sacco was born with a single purpose: to organise and promote the welfare and economic interests of its members.",
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
    body: "Chuna Sacco formalised its dual-service model, operating both Back Office Service Activities (BOSA) and Front Office Service Activities (FOSA). This structure enabled the Sacco to offer full banking-like services including salary processing, current accounts, and withdrawable savings — all under one roof.",
    highlight: "BOSA + FOSA — full financial services under one roof",
    icon: "🏦",
    color: "red",
  },
  {
    year: "2010",
    title: "SASRA Regulation — A Mark of Trust",
    body: "Chuna Sacco was registered by the Sacco Societies Regulatory Authority (SASRA) as a Deposit-Taking Sacco (DTS), meeting stringent capital adequacy standards. This milestone cemented the Sacco's credibility and positioned it as a trustworthy, regulated financial institution for all members.",
    highlight: "SASRA Deposit-Taking Sacco (DTS) — Licence secured",
    icon: "✅",
    color: "green",
  },
  {
    year: "2014",
    title: "Capital Adequacy & Member Share Drive",
    body: "In 2014, Chuna Sacco launched a concerted effort to meet SASRA's capital adequacy ratios through a member share-raising campaign. Members were encouraged to contribute additional shares, strengthening the Sacco's financial base and enabling it to extend even more credit.",
    highlight: "Capital adequacy target achieved with member support",
    icon: "💰",
    color: "gold",
  },
  {
    year: "2016",
    title: "Open Bond — Welcoming All Kenyans",
    body: "Chuna Sacco transitioned to an open common bond, opening its membership to all Kenyan citizens regardless of their area of residence or employment. This transformational decision turned the Sacco from a university-exclusive institution into a national cooperative.",
    highlight: "Open bond — any Kenyan can now join Chuna Sacco",
    icon: "🇰🇪",
    color: "green",
  },
  {
    year: "2018",
    title: "Mobile Banking via USSD *670#",
    body: "Chuna Sacco launched its USSD mobile banking platform — dial *670# — enabling members to check balances, make transfers, apply for loans, and access financial services from any phone, on any network, anywhere in Kenya. 24/7, no internet required.",
    highlight: "Dial *670# — banking for every Kenyan, every phone",
    icon: "📱",
    color: "red",
  },
  {
    year: "2019",
    title: "M-Pesa Paybill 561999",
    body: "The introduction of M-Pesa Paybill number 561999 made depositing into FOSA and BOSA accounts seamless for all members. Members could now deposit savings and repay loans instantly from M-Pesa, 24 hours a day, 7 days a week.",
    highlight: "Paybill 561999 — deposit anytime via M-Pesa",
    icon: "💳",
    color: "gold",
  },
  {
    year: "2020",
    title: "Ksh 2.5 Billion Asset Base",
    body: "Chuna Sacco's 2020 audited financial statements revealed an asset base exceeding Ksh 2.5 billion — a testament to decades of prudent financial management, growing membership, and sustained member confidence.",
    highlight: "Ksh 2.5B+ asset base — 2020 audited financials",
    icon: "📊",
    color: "green",
  },
  {
    year: "2022",
    title: "Digital Member Portal & Online Applications",
    body: "Chuna Sacco launched its online member web portal, allowing members to access statements, apply for loans, and manage their accounts entirely online. Membership applications were digitised — SMS confirmation delivered within 5 minutes.",
    highlight: "Online portal + instant membership processing",
    icon: "🌐",
    color: "red",
  },
  {
    year: "2024",
    title: "Mobile App — Full Service Banking on the Go",
    body: "Chuna Sacco launched its dedicated mobile application, bringing the full suite of Sacco services to members' smartphones. Loan applications, account management, savings tracking, and real-time notifications — all from the palm of your hand.",
    highlight: "Mobile app live — 14+ products at your fingertips",
    icon: "🚀",
    color: "gold",
  },
  {
    year: "2025",
    title: "50 Years of Empowering Kenyans",
    body: "As Chuna Sacco celebrates nearly five decades of service, the institution stands as a beacon of cooperative financial empowerment in Kenya. From a handful of University of Nairobi staff members to a nationwide open-bond Sacco serving thousands of Kenyans — the journey continues.",
    highlight: '"The University Sacco" — serving all Kenyans since 1976',
    icon: "🏆",
    color: "green",
  },
];

// ─── 2. SLIDE DATA (hero slider) ──────────────────────
const SLIDES = [
  {
    year: "1976",
    image: "https://picsum.photos/seed/university1976/800/600",
    icon: "🏛️",
    photoBg: "linear-gradient(135deg,#0a2010,#1E6B2E)",
    caption: "Chuna Sacco is founded at the University of Nairobi",
    desc: "On 24th March 1976, Chuna Savings and Credit Co-operative Society was registered as CS/2466 — a small savings circle among University of Nairobi staff that would grow into Kenya's most trusted \"University Sacco\".",
    thumbLabel: "1976 · Founded",
  },
  {
    year: "2000s",
    image: "https://picsum.photos/seed/university1976/800/600",
    icon: "🏦",
    photoBg: "linear-gradient(135deg,#0f1f10,#1E6B2E)",
    caption: "BOSA & FOSA dual-service banking model launched",
    desc: "Chuna Sacco formalised its Back Office (BOSA) and Front Office (FOSA) operations, offering full salary processing, current accounts, and instant withdrawals — all under one roof at the University of Nairobi.",
    thumbLabel: "2000s · Banking",
  },
  {
    year: "2010",
    image: "https://picsum.photos/seed/university1976/800/600",
    icon: "✅",
    photoBg: "linear-gradient(135deg,#0a1a0a,#1E6B2E)",
    caption: "SASRA Deposit-Taking Sacco licence secured",
    desc: "Chuna Sacco was registered by the Sacco Societies Regulatory Authority (SASRA) as a fully licenced Deposit-Taking Sacco — cementing its credibility and protecting member deposits under Kenya's regulatory framework.",
    thumbLabel: "2010 · SASRA",
  },
  {
    year: "2016",
    image: "https://picsum.photos/seed/openbond2016/800/600",
    icon: "🇰🇪",
    photoBg: "linear-gradient(135deg,#102010,#2D8A3E)",
    caption: "Open bond — membership opened to all Kenyans",
    desc: "Chuna Sacco transitioned to an open common bond, welcoming all Kenyan citizens regardless of residence or employment. Any Kenyan could now access Chuna's growing portfolio of 14+ financial products.",
    thumbLabel: "2016 · Open Bond",
  },
  {
    year: "2018",
    image: "https://picsum.photos/seed/ussd2018/800/600",
    icon: "📱",
    photoBg: "linear-gradient(135deg,#081808,#1E6B2E)",
    caption: "USSD *670# mobile banking platform launched",
    desc: "Chuna Sacco launched *670# USSD banking — enabling every Kenyan to check balances, transfer funds, and apply for loans from any phone on any network, anywhere in Kenya. 24/7, no internet required.",
    thumbLabel: "2018 · USSD *670#",
  },
  {
    year: "2019",
    image: "https://picsum.photos/seed/mpesa2019/800/600",
    icon: "💳",
    photoBg: "linear-gradient(135deg,#0d220d,#2D8A3E)",
    caption: "M-Pesa Paybill 561999 — deposit instantly from anywhere",
    desc: "The introduction of M-Pesa Paybill 561999 made depositing into FOSA and BOSA accounts seamless — available 24 hours a day, 7 days a week, from anywhere in Kenya.",
    thumbLabel: "2019 · M-Pesa",
  },
  {
    year: "2020",
    image: "https://picsum.photos/seed/assets2020/800/600",
    icon: "📊",
    photoBg: "linear-gradient(135deg,#0a1f0a,#1E6B2E)",
    caption: "Asset base surpasses Ksh 2.5 billion",
    desc: "Chuna Sacco's 2020 audited financials revealed an asset base exceeding Ksh 2.5 billion — decades of prudent financial management and the enduring trust of thousands of members across Kenya.",
    thumbLabel: "2020 · Ksh 2.5B",
  },
  {
    year: "2022",
    image: "https://picsum.photos/seed/university1976/800/600",
    icon: "🌐",
    photoBg: "linear-gradient(135deg,#0d1f0d,#2D8A3E)",
    caption: "Online member portal launched",
    desc: "Chuna Sacco launched its online member portal, enabling members to manage accounts, view statements, apply for loans and membership — all online, with SMS confirmation in under 5 minutes.",
    thumbLabel: "2022 · Portal",
  },
  {
    year: "2024",
    image: "https://picsum.photos/seed/mobileapp2024/800/600",
    icon: "🚀",
    photoBg: "linear-gradient(135deg,#081808,#1E6B2E)",
    caption: "Mobile app launched — full-service banking on the go",
    desc: "Chuna Sacco launched its dedicated mobile application, bringing all 14+ Sacco products to members' smartphones. Apply for loans, check balances, manage accounts — all from the palm of your hand.",
    thumbLabel: "2024 · Mobile App",
  },
  {
    year: "2025",
    image: "https://picsum.photos/seed/50years2025/800/600",
    icon: "🏆",
    photoBg: "linear-gradient(135deg,#0d2e14,#2D8A3E)",
    caption: "Celebrating 50 years of empowering Kenyans",
    desc: "As Chuna Sacco marks nearly five decades of service, it stands stronger than ever — an open-bond Sacco with Ksh 2.5B+ in assets, 14+ products, and a full suite of digital banking channels nationwide.",
    thumbLabel: "2025 · 50 Years",
  },
];

// ─── 3. COLOUR MAP ────────────────────────────────────
const colorMap = {
  green: {
    bg: "bg-[#2D8A3E]",
    badge: "bg-[#2D8A3E] text-white",
    highlight: "bg-[#E8F5EB] border-l-4 border-[#2D8A3E] text-[#1E6B2E]",
  },
  red: {
    bg: "bg-[#C0392B]",
    badge: "bg-[#C0392B] text-white",
    highlight: "bg-red-50 border-l-4 border-[#C0392B] text-[#C0392B]",
  },
  gold: {
    bg: "bg-[#C9A800]",
    badge: "bg-[#C9A800] text-white",
    highlight: "bg-yellow-50 border-l-4 border-[#C9A800] text-[#7A6000]",
  },
};

// ─────────────────────────────────────────────────────
// 4. PHOTO PLACEHOLDER
// ─────────────────────────────────────────────────────
function PhotoPlaceholder({ slide }) {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-4 select-none"
      style={{ background: slide.photoBg }}
    >
      <span style={{ fontSize: 72, opacity: 0.25 }}>{slide.icon}</span>
      <span
        className="font-black text-white/10 leading-none tracking-tighter"
        style={{ fontFamily: "Montserrat,sans-serif", fontSize: 56 }}
      >
        {slide.year}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// 5. HERO BANNER (slider)
// ─────────────────────────────────────────────────────
function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [imgError, setImgError] = useState(false);

  const go   = (dir) => { setCurrent((c) => (c + dir + SLIDES.length) % SLIDES.length); setImgError(false); };
  const goTo = (i)   => { setCurrent(i); setImgError(false); };

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  const s = SLIDES[current];
  const thumbStart   = Math.max(0, Math.min(current, SLIDES.length - 3));
  const visibleThumbs = SLIDES.slice(thumbStart, thumbStart + 3);

  return (
    <section
      className="relative w-full flex flex-col overflow-hidden"
      style={{ background: "linear-gradient(160deg,#052010 0%,#0f5a20 35%,#1E8A3A 75%,#28C44E 100%)", marginTop:100 }}
    >
      {/* dot texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.055) 1px,transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* gold divider line — desktop only */}
      <div
        className="absolute left-0 right-0 pointer-events-none hidden md:block"
        style={{
          top: "40%", height: "1.5px",
          background: "linear-gradient(90deg,transparent 0%,#C9A800 20%,#C9A800 80%,transparent 100%)",
          opacity: 0.55, zIndex: 2,
        }}
      />

      {/* gold dot on line — desktop only */}
      <div
        className="absolute pointer-events-none hidden md:block"
        style={{
          top: "40%", left: "58%",
          transform: "translate(-50%,-50%)",
          width: 14, height: 14, borderRadius: "50%",
          background: "#C9A800",
          boxShadow: "0 0 18px rgba(201,168,0,0.7)",
          zIndex: 3,
        }}
      />

      {/* left arrow */}
      <button
        onClick={() => go(-1)}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center text-white text-2xl"
        style={{ width: 36, height: 52, background: "rgba(0,0,0,0.45)", border: "none", borderRight: "1px solid rgba(255,255,255,0.12)", cursor: "pointer" }}
      >‹</button>

      {/* right arrow */}
      <button
        onClick={() => go(1)}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center text-white text-2xl"
        style={{ width: 36, height: 52, background: "rgba(0,0,0,0.45)", border: "none", borderLeft: "1px solid rgba(255,255,255,0.12)", cursor: "pointer" }}
      >›</button>

      {/* main grid — stacked on mobile, side-by-side on desktop */}
      <div className="relative flex-1 flex flex-col md:grid md:grid-cols-[42%_58%] z-10">

        {/* LEFT / TOP — photo */}
        <div className="flex items-center justify-center px-10 md:pl-14 md:pr-0 pt-10 pb-6 md:py-10">
          <div
            className="relative overflow-hidden w-full rounded-md shadow-2xl"
            style={{ maxWidth: 500, aspectRatio: "4/3" }}
          >
            {s.image && !imgError ? (
              <img
                key={s.image}
                src={s.image}
                alt={s.caption}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
              />
            ) : (
              <PhotoPlaceholder slide={s} />
            )}

            {/* year tag */}
            <span
              className="absolute top-3 left-3 text-black font-black text-xs px-3 py-1 rounded"
              style={{ background: "#C9A800", fontFamily: "Montserrat,sans-serif", letterSpacing: "0.06em" }}
            >
              {s.thumbLabel}
            </span>

            {/* caption overlay */}
            <div
              className="absolute bottom-0 left-0 right-0 text-white/85 text-xs"
              style={{ background: "linear-gradient(to top,rgba(0,0,0,0.72),transparent)", padding: "28px 14px 12px" }}
            >
              {s.caption}
            </div>
          </div>
        </div>

        {/* RIGHT / BOTTOM — year + desc + thumbs */}
        <div className="flex flex-col justify-between px-8 md:pl-12 md:pr-14 pb-8 md:py-10 gap-4">

          {/* big year */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right">
            <div
              className="font-black text-[#C9A800] leading-none"
              style={{ fontFamily: "Montserrat,sans-serif", fontSize: "clamp(64px,14vw,150px)", letterSpacing: "-3px", lineHeight: 0.88, transition: "all 0.35s ease" }}
            >
              {s.year}
            </div>
          </div>

          {/* description + thumbnails */}
          <div>
            <p
              className="text-white/75 leading-relaxed mb-5 text-center md:text-left"
              style={{ fontSize: 14, maxWidth: 500, transition: "all 0.3s ease" }}
            >
              {s.desc}
            </p>

            {/* thumbnail strip — desktop only */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => go(-1)}
                className="flex-shrink-0 flex items-center justify-center text-white"
                style={{ width: 28, height: 28, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", cursor: "pointer", fontSize: 15, borderRadius: 2 }}
              >‹</button>

              {visibleThumbs.map((sl, idx) => {
                const realIdx = thumbStart + idx;
                const isActive = realIdx === current;
                return (
                  <div
                    key={realIdx}
                    onClick={() => goTo(realIdx)}
                    className="relative overflow-hidden flex-shrink-0 cursor-pointer rounded"
                    style={{
                      width: 120, height: 78,
                      border: `2px solid ${isActive ? "#C9A800" : "transparent"}`,
                      boxShadow: isActive ? "0 0 12px rgba(201,168,0,0.4)" : "0 2px 8px rgba(0,0,0,0.3)",
                      transition: "all 0.2s",
                    }}
                  >
                    {sl.image ? (
                      <img
                        key={sl.image}
                        src={sl.image}
                        alt={sl.thumbLabel}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                        onError={(e) => { e.currentTarget.style.display = "none"; e.currentTarget.nextSibling.style.display = "flex"; }}
                      />
                    ) : null}
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{ background: sl.photoBg, display: sl.image ? "none" : "flex" }}
                    >
                      <span style={{ fontSize: 20, opacity: 0.4 }}>{sl.icon}</span>
                    </div>
                    <div
                      className="absolute bottom-0 left-0 right-0 text-center text-white/80"
                      style={{ background: "rgba(0,0,0,0.6)", fontSize: 9, fontWeight: 600, letterSpacing: "0.04em", padding: "3px 4px" }}
                    >
                      {sl.thumbLabel}
                    </div>
                  </div>
                );
              })}

              <button
                onClick={() => go(1)}
                className="flex-shrink-0 flex items-center justify-center text-white"
                style={{ width: 28, height: 28, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", cursor: "pointer", fontSize: 15, borderRadius: 2 }}
              >›</button>
            </div>
          </div>
        </div>
      </div>

      {/* dot pagination */}
      <div
        className="relative flex justify-center items-center gap-1.5 z-10"
        style={{ padding: "12px 0 16px", background: "rgba(0,0,0,0.25)" }}
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              height: 8,
              width: i === current ? 22 : 8,
              borderRadius: i === current ? 4 : "50%",
              background: i === current ? "#C9A800" : "rgba(255,255,255,0.25)",
              border: "none", cursor: "pointer", padding: 0,
              transition: "all 0.2s",
            }}
          />
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────
// 6. TIMELINE ITEM  ← must be BEFORE Timeline()
// ─────────────────────────────────────────────────────
function TimelineItem({ item, index }) {
  const isLeft = index % 2 === 0;
  const c = colorMap[item.color];

  return (
    <div
      className={`relative flex items-start gap-0 md:gap-8 ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      } flex-row mb-0`}
    >
      {/* card */}
      <div
        className={`flex-1 pb-16 ${
          isLeft ? "md:text-right md:pr-12" : "md:text-left md:pl-12"
        } pl-10 md:pl-0`}
      >
        <div className="bg-white rounded-2xl p-7 shadow-md border border-gray-100 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 inline-block w-full">

          {/* year badge + icon */}
          <div className={`flex items-center gap-3 mb-4 ${isLeft ? "md:justify-end" : "justify-start"}`}>
            <span className={`${c.badge} text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full`}>
              {item.year}
            </span>
            <span className="text-2xl">{item.icon}</span>
          </div>

          <h3
            className="font-black text-gray-900 text-lg md:text-xl mb-3 leading-snug"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {item.title}
          </h3>

          <p className="text-gray-500 text-sm leading-relaxed mb-4">{item.body}</p>

          {/* highlight strip */}
          <div className={`${c.highlight} px-4 py-3 rounded-lg text-xs font-semibold`}>
            {item.highlight}
          </div>
        </div>
      </div>

      {/* spine dot — desktop only */}
      <div className="hidden md:flex flex-col items-center flex-shrink-0" style={{ width: 60 }}>
        <div
          className={`w-10 h-10 rounded-full ${c.bg} flex items-center justify-center text-white font-black text-xs ring-4 ring-white shadow-lg z-10 relative`}
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          {/* {item.year.slice(-2)} */}
        </div>
      </div>

      {/* spacer opposite side */}
      <div className="flex-1 hidden md:block" />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// 7. TIMELINE SECTION  ← uses TimelineItem above
// ─────────────────────────────────────────────────────
function Timeline() {
  return (
    <section className="bg-[#F2FAF3] py-20 px-6">
      <div className="max-w-5xl mx-auto">

        {/* header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 bg-[#2D8A3E] text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
            📅 Timeline
          </span>
          <h2
            className="font-black text-3xl md:text-4xl text-gray-900 mt-4"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Our Journey Through the Years
          </h2>
          <p className="text-gray-400 mt-3 max-w-lg mx-auto text-sm leading-relaxed">
            Every milestone is a chapter in a story written by our members, our staff, and our shared belief in cooperative prosperity.
          </p>
        </div>

        {/* spine + items */}
        <div className="relative">

          {/* desktop centre spine */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-[#2D8A3E] via-[#C9A800] to-[#C0392B] opacity-30" />

          {/* mobile left spine */}
          <div className="md:hidden absolute top-0 bottom-0 left-4 w-0.5 bg-gradient-to-b from-[#2D8A3E] via-[#C9A800] to-[#C0392B] opacity-30" />

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

// ─────────────────────────────────────────────────────
// 8. QUOTE BANNER
// ─────────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────
// 9. NEXT 50 YEARS
// ─────────────────────────────────────────────────────
function NextFifty() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <span className="inline-flex items-center gap-2 bg-[#C9A800] text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4">
            🌟 The Next 50 Years
          </span>
          <h2
            className="font-black text-3xl md:text-4xl text-gray-900 mt-4 mb-6"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
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
            { val: "1976",      lbl: "Year Founded",       color: "bg-[#2D8A3E]" },
            { val: "50+",       lbl: "Years of Service",   color: "bg-[#C0392B]" },
            { val: "Ksh 2.5B+", lbl: "Asset Base (2020)",  color: "bg-[#C9A800]" },
            { val: "14+",       lbl: "Financial Products",  color: "bg-[#1E6B2E]" },
            { val: "*670#",     lbl: "USSD Banking Code",   color: "bg-[#C0392B]" },
            { val: "561999",    lbl: "M-Pesa Paybill",      color: "bg-[#2D8A3E]" },
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

// ─────────────────────────────────────────────────────
// 10. PAGE ROOT  ← one export default, at the bottom
// ─────────────────────────────────────────────────────
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