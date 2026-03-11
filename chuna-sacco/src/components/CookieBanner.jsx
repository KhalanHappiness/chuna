import { useState, useEffect } from 'react';

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('cookiesAccepted');
    if (!accepted) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem('cookiesAccepted', 'false');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 shadow-2xl rounded-2xl max-w-sm w-full overflow-hidden"
      style={{ background: "linear-gradient(135deg, #14532d 0%, #166534 40%, #15803d 100%)" }}
    >
      {/* Top accent line */}
      <div style={{ height: 3, background: "linear-gradient(90deg, #4ade80, #86efac, #4ade80)" }} />

      <div className="p-5 flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <div className="text-2xl">🍪</div>
          <div>
            <p className="text-white font-semibold text-sm mb-1">We value your privacy</p>
            <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
              We use cookies to improve your browsing experience and analyze site traffic. By clicking "Accept All", you agree to our{' '}
              <a
                href="https://www.chunasacco.co.ke/sites/default/files/2025-02/Privacy%20Policy%20for%20Chuna%20SACCO%20Mobile%20Banking%20App.pdf"
                target="_blank"
                rel="noreferrer"
                style={{ color: "#4ade80" }}
                className="underline font-medium"
              >
                Privacy Policy
              </a>.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={decline}
            className="flex-1 py-2 text-sm rounded-lg font-semibold transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "rgba(255,255,255,0.8)",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="flex-1 py-2 text-sm rounded-lg font-bold transition-all duration-200"
            style={{ background: "#4ade80", color: "#14532d" }}
            onMouseEnter={e => e.currentTarget.style.background = "#86efac"}
            onMouseLeave={e => e.currentTarget.style.background = "#4ade80"}
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;