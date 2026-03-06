import { ArrowRight, Phone, Mail, MapPin, Clock, Send, Facebook, Linkedin, Twitter, Youtube } from 'lucide-react';
import { useState } from 'react';
import chunaLogo from '../assets/chuna.png';


const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const quickLinks = [
    { name: "Mchuna Application", href: "https://cloudpesa.chunasacco.co.ke/" },
    { name: "Help Desk", href: "http://www.helpdesk.chunasacco.co.ke:8089/" },
    { name: "Online Loan Application", href: "https://www.internetbanking.chunasacco.co.ke/" },
    { name: "Asset Financing", href: "/asset-financing" },
    { name: "Group Loan", href: "/group-loan" },
    { name: "New Membership", href: "https://applications.chunasacco.co.ke/index.php?r=new-membership" },
  ];

  const handleSubscribe = () => {
    if (email) { setSubscribed(true); setEmail(''); }
  };

  return (
    <footer style={{ background: "linear-gradient(135deg, #14532d 0%, #166534 40%, #15803d 100%)", position: "relative", overflow: "hidden" }}>

      {/* Decorative background elements */}
      <div style={{ position: "absolute", top: -80, right: -80, width: 300, height: 300, borderRadius: "50%", background: "rgba(255,255,255,0.04)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -60, left: -60, width: 240, height: 240, borderRadius: "50%", background: "rgba(255,255,255,0.03)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, borderRadius: "50%", background: "rgba(255,255,255,0.02)", pointerEvents: "none" }} />

      {/* Top accent line */}
      <div style={{ height: 4, background: "linear-gradient(90deg, #4ade80, #86efac, #4ade80)", width: "100%" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 24px 0", position: "relative", zIndex: 1 }}>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 48, marginBottom: 48 }}>

          {/* Brand Column */}
          <div style={{ gridColumn: "span 1" }}>
            <img src={chunaLogo} alt="Chuna DT Sacco" style={{ height: 52, width: "auto", marginBottom: 20, filter: "brightness(0) invert(1)" }} />
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, lineHeight: 1.8, marginBottom: 20 }}>
              To mobilize savings and provide affordable financial services aimed at promoting socio-economic welfare of members through prudent management.
            </p>
            {/* Social icons */}
            <div style={{ display: "flex", gap: 10 }}>
              {[
                { icon: Facebook, href: "https://www.facebook.com/chunasaccoltd" },
                { icon: Linkedin, href: "https://www.linkedin.com/company/chuna-sacco" },
                { icon: Twitter, href: "https://twitter.com/chunasaccoltd" },
                { icon: Youtube, href: "https://www.youtube.com/@chunasacco" },
              ].map((s, i) => (
                    <a key={i} href="#" style={{
                  width: 36, height: 36, borderRadius: 8,
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 700,
                  textDecoration: "none", transition: "all 0.2s ease",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "white"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
                >
                  <s.icon size={16}/>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{ color: "white", fontWeight: 700, fontSize: 16, marginBottom: 20, letterSpacing: "0.05em" }}>
              QUICK LINKS
            </h3>
            <div style={{ width: 32, height: 3, background: "#4ade80", borderRadius: 99, marginBottom: 20 }} />
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <a href={link.href} style={{
                    display: "flex", alignItems: "center", gap: 8,
                    color: "rgba(255,255,255,0.65)", fontSize: 14,
                    textDecoration: "none", transition: "all 0.2s ease",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.color = "#4ade80"; e.currentTarget.style.paddingLeft = "4px"; }}
                    onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.65)"; e.currentTarget.style.paddingLeft = "0"; }}
                  >
                    <ArrowRight size={13} color="#4ade80" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 style={{ color: "white", fontWeight: 700, fontSize: 16, marginBottom: 20, letterSpacing: "0.05em" }}>
              CONTACT US
            </h3>
            <div style={{ width: 32, height: 3, background: "#4ade80", borderRadius: 99, marginBottom: 20 }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { icon: MapPin, text: "University of Nairobi, Main Campus" },
                { icon: Phone, text: "+254 758 111 222", href: "tel:+254758111222" },
                { icon: Mail, text: "chunasacco@uonbi.ac.ke", href: "mailto:chunasacco@uonbi.ac.ke" },
                { icon: Clock, text: "Mon–Fri: 8AM – 5PM" },
              ].map(({ icon: Icon, text, href }, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(74,222,128,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={15} color="#4ade80" />
                  </div>
                  {href ? (
                    <a href={href} style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, lineHeight: 1.5, textDecoration: "none" }}
                      onMouseEnter={e => e.currentTarget.style.color = "#4ade80"}
                      onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.65)"}
                    >{text}</a>
                  ) : (
                    <span style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, lineHeight: 1.5 }}>{text}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 style={{ color: "white", fontWeight: 700, fontSize: 16, marginBottom: 20, letterSpacing: "0.05em" }}>
              STAY UPDATED
            </h3>
            <div style={{ width: 32, height: 3, background: "#4ade80", borderRadius: 99, marginBottom: 20 }} />
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, lineHeight: 1.7, marginBottom: 20 }}>
              Get the latest updates on new products, rates, and member news.
            </p>
            {subscribed ? (
              <div style={{ background: "rgba(74,222,128,0.15)", border: "1px solid rgba(74,222,128,0.3)", borderRadius: 12, padding: "14px 16px", color: "#4ade80", fontSize: 14, fontWeight: 600 }}>
                ✓ You're subscribed!
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: 10, padding: "12px 16px",
                    color: "white", fontSize: 14, outline: "none",
                    width: "100%", boxSizing: "border-box",
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = "#4ade80"}
                  onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"}
                />
                <button
                  onClick={handleSubscribe}
                  style={{
                    background: "#4ade80", color: "#14532d",
                    border: "none", borderRadius: 10, padding: "12px 16px",
                    fontWeight: 700, fontSize: 14, cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "#86efac"}
                  onMouseLeave={e => e.currentTarget.style.background = "#4ade80"}
                >
                  <Send size={15} />
                  Subscribe
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.12)",
          padding: "20px 0",
          display: "flex", flexWrap: "wrap", gap: 12,
          alignItems: "center", justifyContent: "space-between",
        }}>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 12, margin: 0 }}>
            © {new Date().getFullYear()} Chuna DT SACCO Ltd — ICT Department
          </p>
          <div style={{ display: "flex", gap: 24 }}>
            <a href="https://www.chunasacco.co.ke/sites/default/files/2025-02/Privacy%20Policy%20for%20Chuna%20SACCO%20Mobile%20Banking%20App.pdf"
              style={{ color: "rgba(255,255,255,0.45)", fontSize: 12, textDecoration: "none" }}
              onMouseEnter={e => e.currentTarget.style.color = "#4ade80"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.45)"}
            >Privacy Policy</a>
            <a href="#"
              style={{ color: "rgba(255,255,255,0.45)", fontSize: 12, textDecoration: "none" }}
              onMouseEnter={e => e.currentTarget.style.color = "#4ade80"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.45)"}
            >Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;