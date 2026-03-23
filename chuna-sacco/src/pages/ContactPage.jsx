import React, { useState } from 'react';
import { Mail, Phone, MapPin, ArrowRight, ArrowUpRight } from 'lucide-react';

export default function ContactPage() {
  const [activePhone, setActivePhone] = useState(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Lora:ital,wght@0,400;0,600;0,700;1,400;1,700&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --g1: #0a8c32;
          --g2: #12b040;
          --g3: #7cd98a;
          --g-pale: #e8f7ed;
          --red: #cc1c1c;
          --dark: #0d1a10;
          --ink: #1a2e1e;
          --muted: #5a7060;
          --border: #d4e8d8;
          --bg: #f2f7f3;
          --white: #ffffff;
        }

        .cp-root {
          font-family: 'Syne', sans-serif;
          background: var(--bg);
          min-height: 100vh;
          padding-top: 40px;
        }

        /* ── HERO ── */
        .hero {
          background: var(--g1);
          padding: 24px 52px 0;
          position: relative;
          overflow: visible;
        }

        /* subtle diagonal texture */
        .hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 48px,
            rgba(255,255,255,0.025) 48px,
            rgba(255,255,255,0.025) 96px
          );
          pointer-events: none;
        }

        .hero-watermark {
          position: absolute;
          right: -10px;
          bottom: -24px;
          font-size: 210px;
          font-weight: 800;
          color: rgba(255,255,255,0.07);
          line-height: 1;
          user-select: none;
          letter-spacing: -6px;
          font-family: 'Syne', sans-serif;
        }

        .hero-badge {
          display: inline-block;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #fff;
          background: var(--red);
          padding: 5px 14px;
          border-radius: 3px;
          margin-bottom: 22px;
          position: relative;
        }

        .hero-h1 {
          font-family: 'Lora', serif;
          font-size: clamp(28px, 4vw, 50px);
          font-weight: 700;
          color: #fff;
          line-height: 1.1;
          max-width: 660px;
          margin-bottom: 14px;
          position: relative;
        }

        .hero-h1 em {
          color: rgba(255,255,255,0.72);
          font-style: italic;
        }

        .hero-sub {
          font-size: 15px;
          font-weight: 400;
          color: rgba(255,255,255,0.72);
          position: relative;
        }

        /* wave cutout at bottom of hero */
        .hero-wave {
          background: var(--bg);
          line-height: 0;
          overflow: hidden;
        }
        .hero-wave svg { display: block; width: 100%; }

        /* ── BENTO GRID ── */
        .bento {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 14px;
          padding: 28px 52px 64px;
          max-width: 1300px;
          margin: 0 auto;
        }

        @media (max-width: 900px) {
          .bento { grid-template-columns: 1fr 1fr; padding: 20px; }
          .hero  { padding: 40px 28px 64px; }
        }

        @media (max-width: 580px) {
          .bento { grid-template-columns: 1fr; }
          .cell-member { flex-direction: column; align-items: flex-start; }
          .cell-map    { grid-template-columns: 1fr; }
          .map-sidebar { border-left: none; border-top: 1px solid var(--border); }
        }

        /* ── BASE CELL ── */
        .cell {
          border-radius: 14px;
          overflow: hidden;
          position: relative;
          transition: transform 0.22s ease, box-shadow 0.22s ease;
        }
        .cell:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 40px rgba(0,0,0,0.13);
        }

        /* ── EMAIL — green, left wide ── */
        .cell-email {
          background: var(--g1);
          padding: 34px 36px;
          display: flex;
          align-items: flex-start;
          gap: 24px;
          min-width: 0; /* prevents overflow */
        }
        .cell-email::after {
          content: '';
          position: absolute;
          top: -50px; right: -50px;
          width: 200px; height: 200px;
          border-radius: 50%;
          background: rgba(124,217,138,0.13);
          pointer-events: none;
        }

        .email-icon {
          width: 52px;
          height: 52px;
          min-width: 52px;
          border-radius: 50%;
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.22);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .email-body {
          flex: 1;
          min-width: 0; /* key: allows text to shrink */
        }

        .cell-lbl {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          margin-bottom: 6px;
        }
        .cell-email .cell-lbl { color: var(--g3); }
        .cell-phone .cell-lbl { color: var(--g1); }
        .cell-member .cell-lbl { color: rgba(255,255,255,0.6); }
        .map-sidebar  .cell-lbl { color: var(--red); }

        .cell-h2 {
          font-family: 'Lora', serif;
          font-weight: 700;
          margin-bottom: 14px;
        }
        .cell-email  .cell-h2 { font-size: 20px; color: #fff; }
        .cell-phone  .cell-h2 { font-size: 18px; color: var(--ink); margin-bottom: 18px; }
        .cell-member .cell-h2 { font-size: 22px; color: #fff; margin-bottom: 8px; }
        .map-sidebar .cell-h2 { font-size: 18px; color: var(--ink); margin-bottom: 14px; }

        .email-rows { display: flex; flex-direction: column; gap: 8px; }

        .email-row {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(0,0,0,0.22);
          border-radius: 6px;
          padding: 9px 14px;
          min-width: 0;
          overflow: hidden;
        }
        .email-tag {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          flex-shrink: 0;
          min-width: 54px;
        }
        .email-addr {
          font-size: 13px;
          font-weight: 600;
          color: #fff;
          text-decoration: none;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          min-width: 0;
          flex: 1;
          transition: color 0.15s;
        }
        .email-addr:hover { color: var(--g3); }

        /* ── PHONE — white, right ── */
        .cell-phone {
          background: var(--white);
          border: 1px solid var(--border);
          padding: 30px 26px;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .phone-list { display: flex; flex-direction: column; gap: 10px; }

        .phone-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 11px 14px;
          border-radius: 8px;
          border: 1.5px solid var(--border);
          text-decoration: none;
          transition: border-color 0.2s, background 0.2s;
        }
        .phone-item:hover { border-color: var(--g1); background: var(--g-pale); }

        .ph-dot {
          width: 8px; height: 8px;
          min-width: 8px;
          background: var(--g2);
          border-radius: 50%;
        }
        .ph-num {
          font-size: 14px;
          font-weight: 700;
          color: var(--ink);
          letter-spacing: 0.04em;
        }
        .ph-arr {
          margin-left: auto;
          color: #aaa;
          transition: color 0.2s, transform 0.2s;
        }
        .phone-item:hover .ph-arr { color: var(--g1); transform: translate(2px,-2px); }

        /* ── MEMBER — red banner, full width ── */
        .cell-member {
          grid-column: 1 / -1;
          background: var(--red);
          padding: 30px 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 28px;
        }
        .cell-member::before {
          content: '';
          position: absolute;
          left: -40px; bottom: -40px;
          width: 180px; height: 180px;
          border-radius: 50%;
          background: rgba(255,255,255,0.05);
          pointer-events: none;
        }
        .member-desc {
          font-size: 14px;
          color: rgba(255,255,255,0.68);
          line-height: 1.6;
          max-width: 440px;
          margin: 0;
        }
        .member-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #fff;
          color: var(--red);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.04em;
          padding: 12px 24px;
          border-radius: 8px;
          text-decoration: none;
          white-space: nowrap;
          flex-shrink: 0;
          transition: background 0.2s, color 0.2s, gap 0.2s;
        }
        .member-cta:hover { background: var(--dark); color: #fff; gap: 12px; }

        /* ── MAP — full width ── */
        .cell-map {
          grid-column: 1 / -1;
          background: var(--white);
          border: 1px solid var(--border);
          display: grid;
          grid-template-columns: 1fr 300px;
          min-height: 320px;
          overflow: hidden;
        }
        .map-embed { min-height: 280px; }
        .map-embed iframe { width: 100%; height: 100%; min-height: 280px; border: 0; display: block; }

        .map-sidebar {
          border-left: 1px solid var(--border);
          padding: 30px 26px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .addr-row {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 16px;
        }
        .addr-text {
          font-size: 13px;
          color: var(--muted);
          line-height: 1.8;
        }
        .addr-text strong { color: var(--ink); font-weight: 700; display: block; }

        .hours-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--g-pale);
          border: 1px solid #b2dcbc;
          color: var(--g1);
          font-size: 12px;
          font-weight: 700;
          padding: 8px 14px;
          border-radius: 6px;
          width: fit-content;
        }
        .live-dot {
          width: 7px; height: 7px;
          background: var(--g2);
          border-radius: 50%;
          animation: blink 2s infinite;
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.25} }

        /* ── ANIMATIONS ── */
        @keyframes riseUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero        { animation: riseUp 0.45s ease both; }
        .cell-email  { animation: riseUp 0.45s 0.12s ease both; }
        .cell-phone  { animation: riseUp 0.45s 0.18s ease both; }
        .cell-member { animation: riseUp 0.45s 0.24s ease both; }
        .cell-map    { animation: riseUp 0.45s 0.32s ease both; }
      `}</style>

      <div className="cp-root">

        {/* ── HERO ── */}
        <div className="hero">
          <div style={{ paddingBottom: 20, position: 'relative', paddingTop:55, marginTop: 55 }}>
            <h1 className="hero-h1">
              We're here to ease your <em>financial</em> obstacles.
            </h1>
            <p className="hero-sub">The choice is in your hands — get in touch today.</p>
          </div>
        </div>

        {/* wave divider */}
        <div className="hero-wave">
          <svg viewBox="0 0 1440 60" height="60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,0 L1440,0 L1440,60 Q720,8 0,60 Z" fill="#0a8c32"/>
            <path d="M0,60 Q720,8 1440,60 L1440,62 L0,62 Z" fill="#f2f7f3"/>
          </svg>
        </div>

        {/* ── BENTO ── */}
        <div className="bento">

          {/* EMAIL */}
          <div className="cell cell-email">
            <div className="email-icon">
              <Mail size={22} color="#fff" />
            </div>
            <div className="email-body">
              <p className="cell-lbl">Email Us</p>
              <h2 className="cell-h2">Send Us an Email</h2>
              <div className="email-rows">
                <div className="email-row">
                  <span className="email-tag">Loans</span>
                  <a href="mailto:loans.chuna@uonbi.ac.ke" className="email-addr">
                    loans.chuna@uonbi.ac.ke
                  </a>
                </div>
                <div className="email-row">
                  <span className="email-tag">General</span>
                  <a href="mailto:chunasacco@uonbi.ac.ke" className="email-addr">
                    chunasacco@uonbi.ac.ke
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* PHONE */}
          <div className="cell cell-phone">
            <div>
              <p className="cell-lbl">Call Us</p>
              <h2 className="cell-h2">Speak to Our Team</h2>
            </div>
            <div className="phone-list">
              <a href="tel:0705951672" className="phone-item">
                <span className="ph-dot" />
                <span className="ph-num">0705 951 672</span>
                <ArrowUpRight size={14} className="ph-arr" />
              </a>
              
            </div>
          </div>

          {/* MEMBER */}
          <div className="cell cell-member">
            <div>
              <p className="cell-lbl">Membership</p>
              <h2 className="cell-h2">Want to become a member?</h2>
              <p className="member-desc">
                Join thousands of members enjoying financial freedom. Apply in just a few seconds — it's quick and easy.
              </p>
            </div>
            <a
              href="https://applications.chunasacco.co.ke/index.php?r=new-membership"
              target="_blank"
              rel="noopener noreferrer"
              className="member-cta"
            >
              Apply Now <ArrowRight size={15} />
            </a>
          </div>

          {/* MAP */}
          <div className="cell cell-map">
            <div className="map-embed">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8176449917766!2d36.8165!3d-1.2795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTYnNDYuMiJTIDM2wrA0OCc1OS40IkU!5e0!3m2!1sen!2ske!4v1234567890"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Chuna Sacco Location"
              />
            </div>
            <div className="map-sidebar">
              <div>
                <p className="cell-lbl">Visit Us</p>
                <h2 className="cell-h2">Our Office Location</h2>
                <div className="addr-row">
                  <MapPin size={15} color="#cc1c1c" style={{ marginTop: 3, flexShrink: 0 }} />
                  <div className="addr-text">
                    <strong>Chuna Sacco Society Limited</strong>
                    University of Nairobi<br />
                    Kijabe Street, Nairobi<br />
                    Near Central Police Station
                  </div>
                </div>
              </div>
              <div className="hours-pill">
                <span className="live-dot" />
                Mon – Fri &nbsp;·&nbsp; 8:00 AM – 5:00 PM
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}