import React, { useState, useEffect } from 'react';
import {
  Users, Building2, Award, FileText, CheckCircle,
  ArrowRight, UserCheck, Shield, Star, Clock, DollarSign
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MembershipPage() {
  const [counters, setCounters] = useState({ members: 0, assets: 0, dividend: 0, years: 0 });

  useEffect(() => {
    const targets = { members: 3000, assets: 2.5, dividend: 8, years: 50 };
    const steps = 60;
    const stepTime = 2000 / steps;
    let currentStep = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        currentStep++;
        const p = currentStep / steps;
        setCounters({
          members: Math.floor(targets.members * p),
          assets: Math.floor(targets.assets * p * 10) / 10,
          dividend: Math.floor(targets.dividend * p),
          years: Math.floor(targets.years * p),
        });
        if (currentStep >= steps) { clearInterval(interval); setCounters(targets); }
      }, stepTime);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,400&display=swap');

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

        .mp {
          font-family: 'DM Sans', sans-serif;
          background: var(--bg);
          min-height: 100vh;
          padding-top: 40px;
        }

        /* ── HERO ── */
        .mp-hero {
          background: var(--g1);
          padding: 52px 52px 0;
          position: relative;
          overflow: hidden;
          margin-top: 40px;
        }
        .mp-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(45deg, transparent, transparent 48px, rgba(255,255,255,0.025) 48px, rgba(255,255,255,0.025) 96px);
          pointer-events: none;
        }
        .hero-wm {
          position: absolute;
          right: -10px;
          bottom: 30px;
          font-size: 200px;
          font-weight: 800;
          color: rgba(255,255,255,0.07);
          line-height: 1;
          user-select: none;
          letter-spacing: -6px;
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
          margin-bottom: 20px;
          position: relative;
        }
        .hero-h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(28px, 4vw, 50px);
          font-weight: 700;
          color: #fff;
          line-height: 1.1;
          max-width: 640px;
          margin-bottom: 14px;
          position: relative;
        }
        .hero-h1 em { color: rgba(255,255,255,0.72); font-style: italic; }
        .hero-sub {
          font-size: 15px;
          color: rgba(255,255,255,0.72);
          margin-bottom: 36px;
          position: relative;
        }
        .hero-wave {
          background: var(--bg);
          line-height: 0;
          overflow: hidden;
        }
        .hero-wave svg { display: block; width: 100%; }

        /* ── STATS BAR ── */
        .stats-bar {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 14px;
          margin: 28px 48px;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
        }
        .stat-item {
          padding: 28px 24px;
          text-align: center;
          border-right: 1px solid var(--border);
          position: relative;
        }
        .stat-item:last-child { border-right: none; }
        .stat-num {
          font-family: 'Playfair Display', serif;
          font-size: 36px;
          font-weight: 700;
          color: var(--g1);
          line-height: 1;
          margin-bottom: 6px;
        }
        .stat-num span { font-size: 20px; }
        .stat-lbl {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .stat-item::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: var(--g1);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }
        .stat-item:hover::before { transform: scaleX(1); }

        /* ── SECTION WRAPPER ── */
        .sections {
          padding: 8px 48px 64px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          max-width: 1300px;
          margin: 0 auto;
        }

        /* ── WHO CAN JOIN ── */
        .section-card {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 14px;
          overflow: hidden;
        }
        .section-header {
          padding: 36px 40px 0;
        }
        .sec-eyebrow {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--red);
          margin-bottom: 8px;
        }
        .sec-h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(22px, 3vw, 32px);
          font-weight: 700;
          color: var(--ink);
          margin-bottom: 10px;
        }
        .sec-lead {
          font-size: 15px;
          color: var(--muted);
          line-height: 1.8;
          max-width: 600px;
          margin-bottom: 28px;
        }

        /* who-can join grid */
        .who-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0;
          border-top: 1px solid var(--border);
        }
        .who-cell {
          padding: 28px 36px;
          border-right: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          display: flex;
          gap: 16px;
          align-items: flex-start;
          transition: background 0.2s;
        }
        .who-cell:hover { background: var(--g-pale); }
        .who-cell:nth-child(2n) { border-right: none; }
        .who-cell:nth-child(3), .who-cell:nth-child(4) { border-bottom: none; }
        .who-icon {
          width: 44px;
          height: 44px;
          min-width: 44px;
          border-radius: 10px;
          background: var(--g1);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .who-title {
          font-size: 15px;
          font-weight: 700;
          color: var(--ink);
          margin-bottom: 6px;
        }
        .who-body {
          font-size: 13px; letter-spacing: 0.01em;
          color: var(--muted);
          line-height: 1.8;
        }
        .section-footer {
          padding: 24px 40px;
          border-top: 1px solid var(--border);
          background: var(--bg);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }
        .footer-note {
          font-size: 13px; letter-spacing: 0.01em;
          color: var(--muted);
        }
        .btn-green {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--g1);
          color: #fff;
          font-size: 13px; letter-spacing: 0.01em;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          padding: 12px 24px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.2s, gap 0.2s;
          white-space: nowrap;
        }
        .btn-green:hover { background: var(--dark); gap: 12px; }
        .btn-red {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--red);
          color: #fff;
          font-size: 13px; letter-spacing: 0.01em;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          padding: 12px 24px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.2s, gap 0.2s;
          white-space: nowrap;
        }
        .btn-red:hover { background: var(--dark); gap: 12px; }

        /* ── HOW TO JOIN ── */
        .steps-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          border-top: 1px solid var(--border);
        }
        .step-cell {
          padding: 32px 32px;
          border-right: 1px solid var(--border);
          position: relative;
        }
        .step-cell:last-child { border-right: none; }
        .step-num {
          font-family: 'Playfair Display', serif;
          font-size: 56px;
          font-weight: 700;
          color: var(--g-pale);
          line-height: 1;
          margin-bottom: 16px;
          -webkit-text-stroke: 2px var(--border);
        }
        .step-title {
          font-size: 16px;
          font-weight: 700;
          color: var(--ink);
          margin-bottom: 8px;
        }
        .step-body {
          font-size: 13px; letter-spacing: 0.01em;
          color: var(--muted);
          line-height: 1.8;
        }
        .step-cell::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: var(--g1);
          border-radius: 0;
        }
        .step-cell:nth-child(2)::before { background: var(--red); }
        .step-cell:nth-child(3)::before { background: var(--g2); }

        /* ── AFTER JOINING + OBLIGATIONS — side by side ── */
        .two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .check-list { display: flex; flex-direction: column; gap: 16px; margin-top: 4px; }
        .check-item { display: flex; gap: 14px; align-items: flex-start; }
        .check-dot {
          width: 28px;
          height: 28px;
          min-width: 28px;
          border-radius: 50%;
          background: var(--g-pale);
          border: 1.5px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 1px;
        }
        .check-title {
          font-size: 14px;
          font-weight: 700;
          color: var(--ink);
          margin-bottom: 3px;
        }
        .check-body {
          font-size: 13px; letter-spacing: 0.01em;
          color: var(--muted);
          line-height: 1.75;
        }

        .oblig-list { display: flex; flex-direction: column; gap: 0; margin-top: 4px; }
        .oblig-item {
          display: flex;
          gap: 14px;
          align-items: flex-start;
          padding: 14px 0;
          border-bottom: 1px solid var(--border);
        }
        .oblig-item:last-child { border-bottom: none; }
        .oblig-icon {
          width: 34px;
          height: 34px;
          min-width: 34px;
          border-radius: 8px;
          background: rgba(204,28,28,0.09);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* ── CTA BANNER ── */
        .cta-banner {
          background: var(--g1);
          border-radius: 14px;
          padding: 52px 48px;
          position: relative;
          overflow: hidden;
          text-align: center;
        }
        .cta-banner::before {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(45deg, transparent, transparent 48px, rgba(255,255,255,0.025) 48px, rgba(255,255,255,0.025) 96px);
        }
        .cta-banner-wm {
          position: absolute;
          right: -20px;
          bottom: -20px;
          font-size: 160px;
          font-weight: 800;
          color: rgba(255,255,255,0.06);
          line-height: 1;
          user-select: none;
          letter-spacing: -4px;
        }
        .cta-h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(24px, 3vw, 36px);
          font-weight: 700;
          color: #fff;
          margin-bottom: 12px;
          position: relative;
        }
        .cta-sub {
          font-size: 15px;
          color: rgba(255,255,255,0.75);
          margin-bottom: 32px;
          max-width: 520px;
          margin-left: auto;
          margin-right: auto;
          position: relative;
        }
        .cta-btns {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
          position: relative;
        }
        .btn-white {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #fff;
          color: var(--g1);
          font-size: 13px; letter-spacing: 0.01em;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          padding: 13px 28px;
          border-radius: 8px;
          text-decoration: none;
          transition: background 0.2s, gap 0.2s;
        }
        .btn-white:hover { background: var(--g-pale); gap: 12px; }
        .btn-outline {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          color: #fff;
          font-size: 13px; letter-spacing: 0.01em;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          padding: 13px 28px;
          border-radius: 8px;
          border: 2px solid rgba(255,255,255,0.5);
          text-decoration: none;
          transition: background 0.2s, border-color 0.2s;
        }
        .btn-outline:hover { background: rgba(255,255,255,0.12); border-color: #fff; }

        /* ── ANIMATIONS ── */
        @keyframes riseUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .mp-hero    { animation: riseUp 0.45s ease both; }
        .stats-bar  { animation: riseUp 0.45s 0.1s ease both; }
        .section-card { animation: riseUp 0.45s 0.15s ease both; }
        .two-col > * { animation: riseUp 0.45s 0.2s ease both; }
        .cta-banner { animation: riseUp 0.45s 0.25s ease both; }

        @media (max-width: 900px) {
          .stats-bar { grid-template-columns: repeat(2,1fr); margin: 20px 20px; }
          .sections  { padding: 8px 20px 48px; }
          .who-grid  { grid-template-columns: 1fr; }
          .who-cell  { border-right: none; }
          .who-cell:nth-child(3) { border-bottom: 1px solid var(--border); }
          .steps-row { grid-template-columns: 1fr; }
          .step-cell { border-right: none; border-bottom: 1px solid var(--border); }
          .two-col   { grid-template-columns: 1fr; }
          .mp-hero   { padding: 36px 24px 0; }
          .section-header { padding: 28px 24px 0; }
          .section-footer { padding: 20px 24px; flex-direction: column; align-items: flex-start; }
          .cta-banner { padding: 40px 24px; }
        }
      `}</style>

      <div className="mp">

        {/* HERO */}
        <div className="mp-hero">
          <h1 className="hero-h1">
            Join a community built on <em>financial strength.</em>
          </h1>
          <p className="hero-sub">Become a member and unlock savings, loans, and shared prosperity.</p>
        </div>
        <div className="hero-wave">
          <svg viewBox="0 0 1440 60" height="60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,0 L1440,0 L1440,60 Q720,8 0,60 Z" fill="#0a8c32"/>
            <path d="M0,60 Q720,8 1440,60 L1440,62 L0,62 Z" fill="#f2f7f3"/>
          </svg>
        </div>

        {/* STATS */}
        <div className="stats-bar">
          <div className="stat-item">
            <div className="stat-num">{counters.members.toLocaleString()}<span>+</span></div>
            <div className="stat-lbl">Active Members</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">KES {counters.assets}<span>B+</span></div>
            <div className="stat-lbl">Total Assets</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">{counters.dividend}<span>%</span></div>
            <div className="stat-lbl">Avg. Dividend</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">{counters.years}<span>+</span></div>
            <div className="stat-lbl">Years of Service</div>
          </div>
        </div>

        {/* SECTIONS */}
        <div className="sections">

          {/* WHO CAN JOIN */}
          <div className="section-card">
            <div className="section-header">
              <p className="sec-eyebrow">Eligibility</p>
              <h2 className="sec-h2">Who Can Join Chuna Sacco?</h2>
              <p className="sec-lead">
                We believe in inclusivity and welcome individuals from diverse backgrounds
                to become part of our thriving financial community.
              </p>
            </div>
            <div className="who-grid">
              {[
                { icon: <UserCheck size={20} color="#fff"/>, title: 'Individual Members', body: 'Whether you\'re a salaried employee, self-employed professional, or student, you are welcome. We value financial discipline and commitment to our shared goals.' },
                { icon: <Building2 size={20} color="#fff"/>, title: 'Partner Organisation Employees', body: 'Employees of partnered organisations enjoy special membership benefits, preferential rates, and potential employer contributions to savings.' },
                { icon: <Shield size={20} color="#fff"/>, title: 'Community Members', body: 'We extend membership to residents of communities where Chuna Sacco operates, fostering local economic development and shared prosperity.' },
                { icon: <Users size={20} color="#fff"/>, title: 'Family Members', body: 'Family members of existing Chuna Sacco members are eligible to join, promoting family financial planning and building generational wealth.' },
              ].map((item, i) => (
                <div className="who-cell" key={i}>
                  <div className="who-icon">{item.icon}</div>
                  <div>
                    <div className="who-title">{item.title}</div>
                    <div className="who-body">{item.body}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="section-footer">
              <p className="footer-note">Not sure if you qualify? Contact us and we'll help you find out.</p>
              <button className="btn-green">Start Membership Journey <ArrowRight size={14}/></button>
            </div>
          </div>

          {/* HOW TO JOIN */}
          <div className="section-card">
            <div className="section-header">
              <p className="sec-eyebrow">Process</p>
              <h2 className="sec-h2">How To Join</h2>
              <p className="sec-lead">
                A straightforward process designed to get you started on your financial journey quickly and efficiently.
              </p>
            </div>
            <div className="steps-row">
              {[
                { n: '01', title: 'Submit Your Application', body: 'Complete our membership application form and submit it along with the required documents as specified in the application.' },
                { n: '02', title: 'Review & Approval', body: 'Our team will verify your application and documents within 7 business days. We\'ll contact you if any additional information is needed.' },
                { n: '03', title: 'Welcome to Chuna Sacco!', body: 'Once approved, you\'ll receive your membership confirmation and can immediately start accessing all our financial services.' },
              ].map((s, i) => (
                <div className="step-cell" key={i}>
                  <div className="step-num">{s.n}</div>
                  <div className="step-title">{s.title}</div>
                  <div className="step-body">{s.body}</div>
                </div>
              ))}
            </div>
            <div className="section-footer">
              <p className="footer-note">Average processing time: 7 business days.</p>
              <a href="https://applications.chunasacco.co.ke/index.php?r=new-membership" className="btn-red">Apply for Membership <ArrowRight size={14}/></a>
            </div>
          </div>

          {/* AFTER JOINING + OBLIGATIONS */}
          <div className="two-col">

            {/* After Joining */}
            <div className="section-card">
              <div className="section-header">
                <p className="sec-eyebrow">Member Benefits</p>
                <h2 className="sec-h2" style={{fontSize: '24px'}}>After Joining</h2>
                <p className="sec-lead">
                  You're now part of a supportive financial community focused on your prosperity.
                </p>
              </div>
              <div style={{padding: '0 40px'}}>
                <div className="check-list">
                  {[
                    { icon: <CheckCircle size={14} color="#0a8c32"/>, title: 'Access to Financial Products', body: 'Savings accounts, competitive loans, and investment opportunities from day one.' },
                    { icon: <Star size={14} color="#0a8c32"/>, title: 'Exclusive Member Benefits', body: 'Competitive rates, member events, professional development, and loyalty programs.' },
                    { icon: <Users size={14} color="#0a8c32"/>, title: 'Community Connection', body: 'Financial literacy programs, member meetings, and community development initiatives.' },
                  ].map((item, i) => (
                    <div className="check-item" key={i}>
                      <div className="check-dot">{item.icon}</div>
                      <div>
                        <div className="check-title">{item.title}</div>
                        <div className="check-body">{item.body}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="section-footer" style={{marginTop: '24px'}}>
                <button className="btn-green">Explore Benefits <ArrowRight size={14}/></button>
              </div>
            </div>

            {/* Obligations */}
            <div className="section-card">
              <div className="section-header">
                <p className="sec-eyebrow">Responsibilities</p>
                <h2 className="sec-h2" style={{fontSize: '24px'}}>Member Obligations</h2>
                <p className="sec-lead">
                  Your role in our collective success ensures the Sacco thrives for everyone.
                </p>
              </div>
              <div style={{padding: '0 40px'}}>
                <div className="oblig-list">
                  {[
                    { icon: <DollarSign size={16} color="#cc1c1c"/>, title: 'Financial Commitment', body: 'Regular savings contributions and honouring loan repayment schedules.' },
                    { icon: <FileText size={16} color="#cc1c1c"/>, title: 'Compliance with Policies', body: 'Understanding and following all Sacco bylaws, policies, and regulations.' },
                    { icon: <Clock size={16} color="#cc1c1c"/>, title: 'Account Maintenance', body: 'Keeping account information current and maintaining good standing.' },
                    { icon: <Users size={16} color="#cc1c1c"/>, title: 'Community Participation', body: 'Attending member meetings and voting on important matters.' },
                  ].map((item, i) => (
                    <div className="oblig-item" key={i}>
                      <div className="oblig-icon">{item.icon}</div>
                      <div>
                        <div className="check-title">{item.title}</div>
                        <div className="check-body">{item.body}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="section-footer" style={{marginTop: '8px'}}>
                <button className="btn-green">View Member Handbook <ArrowRight size={14}/></button>
              </div>
            </div>
          </div>

          {/* CTA BANNER */}
          <div className="cta-banner">
            <h2 className="cta-h2">Ready to Join Chuna Sacco?</h2>
            <p className="cta-sub">
              Take the first step towards financial freedom. Join thousands of members who
              trust Chuna Sacco with their financial future.
            </p>
            <div className="cta-btns">
              <a href="https://applications.chunasacco.co.ke/index.php?r=new-membership" className="btn-white">
                Start Application <ArrowRight size={14}/>
              </a>
              <Link to="/contactus" className="btn-outline">
                Contact Us
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}