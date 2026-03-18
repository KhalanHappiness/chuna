import { useState } from "react";
import mpesaIcon from "../assets/icons8-mpesa-48.png";

// ─── DATA ─────────────────────────────────────────────
const PAYBILL_CODES = [
  { code: "ADVANCE1A", paybill: "AD1", description: "Salary Advance" },
  { code: "ADVANCE1B", paybill: "AD2", description: "Salary Advance" },
  { code: "ADVANCE1C", paybill: "AD3", description: "Salary Advance" },
  { code: "BIMA", paybill: "BIM", description: "Bima Loan" },
  { code: "DEFAULTER", paybill: "DEF", description: "Defaulter Loan" },
  { code: "DIV-ADVANCE", paybill: "DIV", description: "Dividend Advance" },
  { code: "EMERGENCY", paybill: "EM1", description: "Emergency Loan" },
  { code: "EMERGENCY 20", paybill: "EM2", description: "Emergency Loan 20" },
  { code: "EMERGENCY 6", paybill: "EM3", description: "Emergency Loan 6" },
  { code: "EMERGENCY2", paybill: "EM4", description: "Emergency Loan 2" },
  { code: "FINANCE-A", paybill: "ASF", description: "Asset Finance" },
  { code: "FOSALOAN", paybill: "FOS", description: "FOSA Loan" },
  { code: "GROUP", paybill: "GRP", description: "Group Loan" },
  { code: "KARIBU EMERGENCY", paybill: "KAR", description: "Karibu Emergency" },
  { code: "CHUNA NEW", paybill: "MC1", description: "Mchuna New" },
  { code: "MCHUNA1", paybill: "MC2", description: "Mchuna Loan 1" },
  { code: "MCHUNA2", paybill: "MC3", description: "Mchuna 2" },
  { code: "NORM 36", paybill: "NO1", description: "Normal of 36 Months" },
  { code: "NORM 24", paybill: "NO2", description: "Normal of 24 Months" },
  { code: "NORM 48", paybill: "NO3", description: "Normal of 48 Months" },
  { code: "NORM 60", paybill: "NO4", description: "Normal of 60 Months" },
  { code: "NORM AMORTISED", paybill: "NO5", description: "Norm60 Amortised" },
  { code: "NORMAL", paybill: "NO6", description: "Normal Loan" },
  { code: "NORMAL JIJENGE", paybill: "NO7", description: "Normal Jijenge" },
  { code: "NORMAL PREMIUM", paybill: "NO8", description: "Normal Premium" },
  { code: "NORMAL RESTRUCTURED", paybill: "NO9", description: "Normal Restructured" },
  { code: "SALARY ADVANCE 2", paybill: "SA1", description: "Salary Advance 2" },
  { code: "SALARYADVANCE", paybill: "SA2", description: "Salary in Advance" },
  { code: "SCHOOLFEE", paybill: "SC1", description: "School Fees Loan" },
  { code: "SCHOOLFEE2", paybill: "SC2", description: "School Fee Loan 2" },
  { code: "SENIOR", paybill: "SNR", description: "Senior Special" },
  { code: "STAFF LOAN", paybill: "STA", description: "Staff Salary Advance" },
  { code: "UNRECOVERED TOPUPS", paybill: "UNR", description: "Topup Commissions" },
  { code: 'HOLIDAY ACCOUNT', paybill:"HOL", description: "Holiday Savings Account"},
  { code: "EDUCATION ACCOUNT", paybill:"EDU", description: "Education Savings Account"},
  { code: "JUNIOR ACCOUNT", paybill:"JUN", description: "Junior Savings Account"}
];

const METHODS = [
  {
    id: "mpesa",
    icon: "mpesa",
    label: "Via M-Pesa",
    color: "#2D8A3E",
    lightBg: "#E8F5EB",
    badge: "Most Popular",
    intro: "Pay instantly using M-Pesa Paybill 561999. Available 24/7 on any phone, any network.",
    steps: [
      { n: 1, text: "Go to M-Pesa Menu on your phone" },
      { n: 2, text: "Select Lipa na M-Pesa" },
      { n: 3, text: "Select Pay Bill" },
      { n: 4, text: "Enter Business Number: 561999" },
      { n: 5, text: "Account: Code + Member No. (e.g. NO112345)" },
      { n: 6, text: "Enter Amount & confirm with your PIN" },
    ],
    tip: "Refer to the Paybill Codes table below to find the right code for your product.",
  },
  {
    id: "ussd",
    icon: "📱",
    label: "Via USSD *670#",
    color: "#1E6B2E",
    lightBg: "#E0F0E4",
    badge: "24/7",
    intro: "Dial *670# on any Kenyan network — Safaricom, Airtel, or Telkom — no internet needed.",
    steps: [
      { n: 1, text: "Dial *670# on your phone" },
      { n: 2, text: "Select option 4 (Loans)" },
      { n: 3, text: "Follow the on-screen menu prompts" },
      { n: 4, text: "Confirm the transaction with your PIN" },
    ],
    tip: "Works on any basic or smartphone. No data connection required.",
  },
  {
    id: "bank",
    icon: "🏦",
    label: "Via Bank Transfer ",
    color: "#C9A800",
    lightBg: "#FBF5DC",
    badge: null,
    intro: "Make payments directly into Chuna Sacco's bank account. Always include your member number in the reference field.",
    // bankDetails: [
    //   { label: "Account Name", value: "Chuna DT Sacco Society Ltd" },
    //   { label: "Bank", value: "Co-operative Bank of Kenya" },
    //   { label: "Branch", value: "University Way Branch" },
    //   { label: "Account No.", value: "01120040136100" },
    //   { label: "Swift Code", value: "KCOOKENA" },
    // ],
    tip: "Always quote your membership number and purpose of payment in the bank reference.",
  },
  {
    id: "standing",
    icon: "🔄",
    label: "Via Standing Order",
    color: "#2D8A3E",
    lightBg: "#E8F5EB",
    badge: null,
    intro: "Automatic recurring payments through your bank — ideal for monthly contributions and loan repayments.",
    steps: [
      { n: 1, text: "Visit the Chuna Sacco office or your bank branch" },
      { n: 2, text: "Fill in the Standing Order instruction form" },
      { n: 3, text: "Indicate your membership number on the form" },
      { n: 4, text: "Specify the amount and frequency of deduction" },
      { n: 5, text: "Submit the form to your bank for processing" },
    ],
    tip: "Processing may take 3–5 business days. Confirm with your bank.",
  },
  {
    id: "checkoff",
    icon: "🧾",
    label: "Through Payroll Check-off",
    color: "#1E6B2E",
    lightBg: "#E0F0E4",
    badge: null,
    intro: "Automatic salary deductions via your employer — the most seamless way to stay consistent with your contributions.",
    steps: [
      { n: 1, text: "Obtain a check-off authorisation form from Chuna Sacco" },
      { n: 2, text: "Fill in your member number and deduction amounts" },
      { n: 3, text: "Submit the form to your HR or Payroll department" },
      { n: 4, text: "Deductions happen automatically every payroll cycle" },
    ],
    tip: "Available for members whose employers have check-off agreements with Chuna Sacco.",
  },
  {
    id: "cash",
    icon: "💵",
    label: "Cash / Cheque at Office",
    color: "#C9A800",
    lightBg: "#FBF5DC",
    badge: null,
    intro: "Walk in to The Chuna Sacco office and pay over the counter. Cheques payable to 'Chuna DT Sacco Society Ltd'.",
    steps: [
      { n: 1, text: "Visit The Chuna Sacco Office during working hours" },
      { n: 2, text: "Present your membership card or National ID" },
      { n: 3, text: "Make payment over the counter" },
      { n: 4, text: "Collect your official receipt" },
    ],
    tip: "Office hours: Monday – Friday, 8:30 AM – 4:30 PM.",
  },
];

// ─── PAGE TITLE ───────────────────────────────────────
function Hero() {
  return (
    <section
      className="relative overflow-hidden px-3 sm:px-4 lg:px-8 "
      style={{ marginTop: 75, background: "#fff", borderBottom: "1px solid #E5E7EB" }}
    >
      {/* decorative right-side green block */}
      <div
        className="absolute top-0 right-0 bottom-0 w-64 pointer-events-none hidden lg:block"
        style={{ background: "linear-gradient(135deg,#2D8A3E,#1E6B2E)", clipPath: "polygon(22% 0,100% 0,100% 100%,0% 100%)" }}
      />
      {/* dot overlay on green block */}
      <div
        className="absolute top-0 right-0 bottom-0 w-64 pointer-events-none hidden lg:block"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.12) 1.5px,transparent 1.5px)",
          backgroundSize: "20px 20px",
          clipPath: "polygon(22% 0,100% 0,100% 100%,0% 100%)",
        }}
      />
      {/* large faint 561999 watermark behind content */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-black pointer-events-none select-none leading-none whitespace-nowrap"
        style={{
          fontFamily: "Montserrat,sans-serif",
          fontSize: "clamp(60px,12vw,120px)",
          color: "#2D8A3E",
          opacity: 0.04,
        }}
      >
        561999
      </div>

      <div className="relative z-10 max-w-6xl mx-auto py-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

          {/* left — breadcrumb + title + subtitle */}
          <div>
  

            <h1
              className="font-black text-gray-900 leading-tight mb-3"
              style={{ fontFamily: "Montserrat,sans-serif", fontSize: "clamp(26px,4vw,42px)" }}
            >
              Payment Modes
              <span
                className="inline-block w-2 h-2 rounded-full ml-2 mb-1"
                style={{ background: "#2D8A3E" }}
              />
            </h1>

            <p className="text-gray-500 text-sm max-w-md leading-relaxed mb-5">
              Six convenient ways to pay your loans and savings — M-Pesa, USSD, bank transfer, standing order, check-off, or cash at our offices.
            </p>

            {/* channel pills row */}
            <div className="flex flex-wrap gap-2">
              {[
                { icon: "mpesa", label: "M-Pesa" },
                { icon: "📱", label: "USSD *670#" },
                { icon: "🏦", label: "Bank Transfer" },
                { icon: "🔄", label: "Standing Order" },
                { icon: "🧾", label: "Check-off" },
                { icon: "💵", label: "Cash at Office" },
              ].map((p) => (
                <span
                  key={p.label}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg"
                  style={{ background: "#F2FAF3", color: "#1E6B2E", border: "1px solid #C5E3CA" }}
                >
                  {p.icon === "mpesa" ? (
                    <img src={mpesaIcon} alt="M-Pesa" style={{ width: 16, height: "auto" }} />
                  ) : (
                    <span style={{ fontSize: 12 }}>{p.icon}</span>
                  )}
                  {p.label}
                </span>
              ))}
            </div>
          </div>

          {/* right — paybill card, sits in/near the green block on desktop */}
          <div className="lg:mr-4 flex-shrink-0">
            <div
              className="rounded-2xl px-7 py-5 text-center lg:text-left"
              style={{ background: "#F2FAF3", border: "1px solid #C5E3CA", minWidth: 190 }}
            >
              <div className="text-[9px] uppercase tracking-widest font-bold text-gray-400 mb-1">
                M-Pesa Paybill
              </div>
              <div
                className="font-black leading-none tracking-widest"
                style={{ fontFamily: "Montserrat,sans-serif", fontSize: "clamp(32px,4vw,44px)", color: "#2D8A3E", letterSpacing: "0.08em" }}
              >
                561999
              </div>
              <div className="text-[10px] text-gray-400 mt-1.5">All products · 24/7</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── METHOD ACCORDION CARD ────────────────────────────
function MethodCard({ method, index }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <div
      className="rounded-2xl overflow-hidden border transition-all duration-200"
      style={{
        borderColor: open ? method.color : "#E5E7EB",
        boxShadow: open ? `0 4px 24px ${method.color}20` : "none",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 px-5 py-4 text-left transition-colors"
        style={{ background: open ? method.lightBg : "white" }}
      >
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: method.color }}
        >
          {method.icon === "mpesa" ? (
            <img
              src={mpesaIcon}
              alt="M-Pesa"
              style={{ width: 30, height: "auto", objectFit: "contain" }}
            />
          ) : (
            <span style={{ fontSize: 18 }}>{method.icon}</span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-black text-gray-900 text-sm" style={{ fontFamily: "Montserrat,sans-serif" }}>
              {method.label}
            </span>
            {method.badge && (
              <span className="text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ background: method.color }}>
                {method.badge}
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-0.5 truncate">{method.intro}</p>
        </div>

        <div
          className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300"
          style={{ background: `${method.color}18`, transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 4.5L6 8L10 4.5" stroke={method.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </button>

      {open && (
        <div className="px-5 pb-5 pt-1 border-t" style={{ borderColor: `${method.color}25`, background: method.lightBg }}>
          <p className="text-sm text-gray-600 leading-relaxed mb-4 pt-2">{method.intro}</p>

          {method.steps && (
            <div className="space-y-2.5 mb-4">
              {method.steps.map((s) => (
                <div key={s.n} className="flex items-start gap-3">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-white font-black flex-shrink-0 mt-0.5"
                    style={{ background: method.color, fontSize: 11 }}
                  >
                    {s.n}
                  </div>
                  <span className="text-sm text-gray-700 leading-snug">{s.text}</span>
                </div>
              ))}
            </div>
          )}

          {method.bankDetails && (
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden mb-4">
              {method.bankDetails.map(({ label, value }, i) => (
                <div key={label} className={`flex items-center justify-between px-4 py-2.5 text-sm ${i < method.bankDetails.length - 1 ? "border-b border-gray-50" : ""}`}>
                  <span className="text-gray-400 font-medium text-xs uppercase tracking-wide">{label}</span>
                  <span className="font-bold text-gray-900 text-xs" style={{ fontFamily: "Montserrat,sans-serif" }}>{value}</span>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-start gap-2.5 rounded-xl px-3.5 py-3 text-xs leading-relaxed" style={{ background: `${method.color}15`, color: method.color === "#C9A800" ? "#7A6000" : method.color }}>
            <span className="font-black flex-shrink-0 mt-0.5" style={{ fontSize: 13 }}>💡</span>
            <span className="font-medium">{method.tip}</span>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── MPESA QUICK REFERENCE PANEL ─────────────────────
function MpesaPanel() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 h-full" style={{ boxShadow: "0 4px 24px rgba(45,138,62,0.08)" }}>
      <div className="inline-flex items-center gap-2 text-white text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-4" style={{ background: "#2D8A3E" }}>
        <img src={mpesaIcon} alt="M-Pesa" style={{ width: 18, height: "auto" }} />
        Quick Reference
      </div>
      <h3 className="font-black text-gray-900 text-base mb-5" style={{ fontFamily: "Montserrat,sans-serif" }}>
        M-Pesa Account Format
      </h3>

      {/* format box */}
      <div className="rounded-xl p-4 mb-5" style={{ background: "#E8F5EB", border: "1.5px dashed #2D8A3E" }}>
        <div className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">Account Number Format</div>
        <div className="flex items-center gap-2 flex-wrap mb-2">
          <span className="font-black text-white px-3 py-1.5 rounded-lg text-sm" style={{ background: "#C0392B", fontFamily: "Montserrat,sans-serif" }}>NO1</span>
          <span className="text-gray-400 font-bold text-lg">+</span>
          <span className="font-black text-white px-3 py-1.5 rounded-lg text-sm" style={{ background: "#2D8A3E", fontFamily: "Montserrat,sans-serif" }}>12345</span>
          <span className="text-gray-400 font-bold text-lg">=</span>
          <span className="font-black text-gray-800 px-3 py-1.5 rounded-lg text-sm border-2 font-mono" style={{ borderColor: "#2D8A3E" }}>NO112345</span>
        </div>
        <div className="flex gap-4">
          <span className="text-[10px] text-gray-400 flex items-center gap-1">
            <span className="w-2 h-2 rounded-sm inline-block" style={{ background: "#C0392B" }} /> Product code
          </span>
          <span className="text-[10px] text-gray-400 flex items-center gap-1">
            <span className="w-2 h-2 rounded-sm inline-block" style={{ background: "#2D8A3E" }} /> Member number
          </span>
        </div>
      </div>

      {/* paybill callout */}
      <div className="rounded-xl p-4 mb-5 flex items-center gap-4" style={{ background: "linear-gradient(135deg,#1E6B2E,#2D8A3E)" }}>
        <div className="text-center flex-shrink-0">
          <div className="text-white/60 text-[10px] uppercase tracking-wider mb-1">Paybill</div>
          <div className="text-yellow-300 font-black text-2xl" style={{ fontFamily: "Montserrat,sans-serif" }}>561999</div>
        </div>
        <div className="w-px h-10 bg-white/20 flex-shrink-0" />
        <div className="text-xs text-white/75 leading-relaxed">
          Same Paybill for <strong className="text-white">all</strong> products — only the account code changes.
        </div>
      </div>

      {/* common codes */}
      <div className="text-xs font-black uppercase tracking-wider text-gray-400 mb-2">Common Codes</div>
      <div className="grid grid-cols-2 gap-1.5">
        {[
          { code: "NO1", desc: "Normal 36M" },
          { code: "NO6", desc: "Normal Loan" },
          { code: "EM1", desc: "Emergency" },
          { code: "FOS", desc: "FOSA Loan" },
          { code: "SA2", desc: "Salary Advance" },
          { code: "SC1", desc: "School Fees" },
        ].map(({ code, desc }) => (
          <div key={code} className="flex items-center gap-2 rounded-lg px-2.5 py-2" style={{ background: "#F2FAF3" }}>
            <span className="text-white font-black text-[10px] px-1.5 py-0.5 rounded" style={{ background: "#2D8A3E" }}>{code}</span>
            <span className="text-xs text-gray-600">{desc}</span>
          </div>
        ))}
      </div>

      {/* divider + contact */}
      <div className="mt-5 pt-4 border-t border-gray-100">
        <div className="text-xs font-black uppercase tracking-wider text-gray-400 mb-2">Need Help?</div>
        <a href="tel:+254705951672" className="flex items-center gap-2 text-sm font-bold no-underline" style={{ color: "#2D8A3E" }}>
          <span className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#E8F5EB", fontSize: 14 }}>📞</span>
          +254 705 951 672
        </a>
      </div>
    </div>
  );
}

// ─── PAYBILL TABLE ────────────────────────────────────
function PaybillTable() {
  const [search, setSearch] = useState("");
  const filtered = PAYBILL_CODES.filter(
    (r) =>
      r.code.toLowerCase().includes(search.toLowerCase()) ||
      r.paybill.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <section className="py-16 px-3 sm:px-4 lg:px-8" style={{ background: "#F2FAF3" }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-3" style={{ background: "#2D8A3E" }}>
              <img src={mpesaIcon} alt="M-Pesa" style={{ width: 18, height: "auto" }} />
              M-Pesa Paybill 561999
            </div>
            <h2 className="font-black text-gray-900 leading-tight" style={{ fontFamily: "Montserrat,sans-serif", fontSize: "clamp(18px,3vw,26px)" }}>
              All Transaction Codes
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Format:{" "}
              <span className="font-mono text-xs px-2 py-0.5 rounded border font-bold" style={{ background: "white", borderColor: "#2D8A3E", color: "#1E6B2E" }}>Code + MemberNo</span>
              {" "}e.g.{" "}
              <span className="font-mono text-xs px-2 py-0.5 rounded text-white" style={{ background: "#2D8A3E" }}>NO156789</span>
            </p>
          </div>
          <div className="relative w-full sm:w-64 flex-shrink-0">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M10 10L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Search code or product…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-4 py-2.5 text-xs border border-gray-200 rounded-xl bg-white focus:outline-none"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr style={{ background: "linear-gradient(90deg,#1E6B2E,#2D8A3E)" }}>
                  {["Code", "Paybill Code", "Product Description"].map((h) => (
                    <th key={h} className="text-left px-5 py-3.5 text-white font-black uppercase tracking-wider" style={{ fontFamily: "Montserrat,sans-serif" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center py-12 text-gray-400">No results found for &quot;{search}&quot;</td>
                  </tr>
                ) : (
                  filtered.map((row, i) => (
                    <tr key={row.code} className="border-b border-gray-50 transition-colors hover:bg-green-50/50" style={{ background: i % 2 === 0 ? "white" : "#FAFAFA" }}>
                      <td className="px-5 py-3 font-bold text-gray-800" style={{ fontFamily: "Montserrat,sans-serif" }}>{row.code}</td>
                      <td className="px-5 py-3">
                        <span className="inline-flex items-center text-white font-black px-2.5 py-1 rounded-md text-[10px] tracking-widest" style={{ background: "#2D8A3E" }}>
                          {row.paybill}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-gray-600">{row.description}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 flex items-center justify-between text-xs" style={{ background: "#F8FBF8", borderTop: "1px solid #F0F0F0" }}>
            <span className="text-gray-400">{filtered.length} of {PAYBILL_CODES.length} codes</span>
            <span className="text-gray-400">Paybill: <span className="font-black" style={{ color: "#2D8A3E" }}>561999</span></span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── NOTES ────────────────────────────────────────────
function Notes() {
  return (
    <section className="py-12 px-3 sm:px-4 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "#F0C040" }}>
          <div className="px-6 py-4 flex items-center gap-3" style={{ background: "#FFF9E6", borderBottom: "1px solid #F0C04030" }}>
            <span style={{ fontSize: 20 }}>⚠️</span>
            <div>
              <div className="font-black text-gray-900 text-sm" style={{ fontFamily: "Montserrat,sans-serif" }}>Important Payment Notes</div>
              <div className="text-xs text-gray-500">Please read carefully before making any payment</div>
            </div>
          </div>
          <div className="px-6 py-5 grid grid-cols-1 sm:grid-cols-2 gap-3" style={{ background: "#FFFDF0" }}>
            {[
              "Always include your correct Membership Number in the M-Pesa account field.",
              "Use the exact Paybill code for the specific product you are repaying.",
              "Keep your M-Pesa SMS confirmation as proof of payment.",
              "For bank transfers, always include your member number in the payment reference.",
              "Payments made after 4:00 PM may be processed the next business day.",
              "Contact us on +254 705 951 672 if your payment is not reflected within 24 hours.",
            ].map((note, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs text-gray-700 leading-relaxed">
                <div className="w-4 h-4 rounded-full flex items-center justify-center text-white font-black flex-shrink-0 mt-0.5" style={{ background: "#C9A800", fontSize: 9 }}>
                  {i + 1}
                </div>
                {note}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────
function CTA() {
  return (
    <section className="relative py-16 px-3 sm:px-4 lg:px-8 text-center overflow-hidden" style={{ background: "linear-gradient(135deg,#1E6B2E,#3AA050)" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.07) 1.5px,transparent 1.5px)", backgroundSize: "24px 24px" }} />
      <div className="relative max-w-xl mx-auto">
        <h2 className="font-black text-white mb-3" style={{ fontFamily: "Montserrat,sans-serif", fontSize: "clamp(20px,4vw,32px)" }}>
          Need Help with a Payment?
        </h2>
        <p className="text-white/65 text-sm leading-relaxed mb-8">Our team is ready to assist with any payment queries, reversals, or allocation issues.</p>
        <div className="flex justify-center gap-3 flex-wrap mb-8">
          <a href="tel:+254705951672" className="font-black text-sm px-7 py-3 rounded-xl no-underline" style={{ background: "white", color: "#1E6B2E", fontFamily: "Montserrat,sans-serif" }}>
            📞 Call Us
          </a>
          <a href="https://webportal.chunasacco.co.ke//#/auth/login" className="border-2 text-white font-bold text-sm px-7 py-3 rounded-xl no-underline" style={{ borderColor: "rgba(255,255,255,0.4)", fontFamily: "Montserrat,sans-serif" }}>
            Member Portal
          </a>
        </div>
        <div className="flex justify-center gap-10 flex-wrap pt-6 border-t border-white/10">
          {[["*670#", "USSD Banking"], ["561999", "M-Pesa Paybill"], ["+254 705 951 672", "Call Us"]].map(([v, l]) => (
            <div key={l} className="text-center">
              <div className="font-black text-yellow-300 text-sm" style={{ fontFamily: "Montserrat,sans-serif" }}>{v}</div>
              <div className="text-white/45 text-[10px] uppercase tracking-widest mt-0.5">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── ROOT ─────────────────────────────────────────────
export default function PaymentModesPage() {
  return (
    <div className="font-sans" style={{ background: "#F2FAF3" }}>
      <Hero />

      <section className="py-16 px-3 sm:px-4 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-3" style={{ background: "#2D8A3E" }}>
              💳 Payment Channels
            </div>
            <h2 className="font-black text-gray-900" style={{ fontFamily: "Montserrat,sans-serif", fontSize: "clamp(20px,3vw,28px)" }}>
              Choose Your Preferred Method
            </h2>
            <p className="text-sm text-gray-500 mt-1.5">Click any method to expand full instructions</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
            <div className="lg:col-span-3 space-y-3">
              {METHODS.map((m, i) => (
                <MethodCard key={m.id} method={m} index={i} />
              ))}
            </div>
            <div className="lg:col-span-2 lg:sticky lg:top-24">
              <MpesaPanel />
            </div>
          </div>
        </div>
      </section>

      <PaybillTable />
      <Notes />
    </div>
  );
}