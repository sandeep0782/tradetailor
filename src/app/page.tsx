"use client";

import { useState, useEffect } from "react";

export default function ComingSoon() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState({ d: "00", h: "00", m: "00", s: "00" });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const launchDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 60);

  // email validation
  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // submit handler (FIXED)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("email", email);

      const res = await fetch("https://formspree.io/f/xaqlrlja", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (res.ok) {
        setSubmitted(true);
        setEmail("");
      } else {
        const data = await res.json();
        console.error("Error:", data);
      }
    } catch (err) {
      console.error("Submission error:", err);
    } finally {
      setLoading(false);
    }
  };
  // countdown
  useEffect(() => {
    const id = setInterval(() => {
      const now = new Date();
      const diff = launchDate.getTime() - now.getTime();

      if (diff <= 0) {
        clearInterval(id);
        return;
      }

      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);

      setCount({
        d: String(d).padStart(2, "0"),
        h: String(h).padStart(2, "0"),
        m: String(m).padStart(2, "0"),
        s: String(s).padStart(2, "0"),
      });
    }, 1000);

    return () => clearInterval(id);
  }, []);

  // smooth cursor
  useEffect(() => {
    let raf: number;
    const move = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setMousePos({ x: e.clientX, y: e.clientY });
      });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@300;500&display=swap');

        :root {
          --bg: #0A0A0A;
          --surface: rgba(255,255,255,0.04);
          --gold: #C6A769;
          --gold-soft: #E5D3A3;
          --text: #F8F5EE;
          --text-dim: rgba(248,245,238,0.6);
        }

        body {
          background: var(--bg);
          color: var(--text);
          animation: fadeIn 1s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .cursor-dot {
          position: fixed;
          width: 6px;
          height: 6px;
          background: var(--gold);
          border-radius: 50%;
          pointer-events: none;
          transform: translate(-50%, -50%);
          z-index: 9999;
          box-shadow: 0 0 10px var(--gold);
        }

        .cursor-ring {
          position: fixed;
          width: 42px;
          height: 42px;
          border: 1px solid rgba(198,167,105,0.3);
          border-radius: 50%;
          pointer-events: none;
          transform: translate(-50%, -50%);
          z-index: 9998;
          backdrop-filter: blur(4px);
        }

        nav {
          padding: 2rem 3rem;
          display: flex;
          justify-content: space-between;
          backdrop-filter: blur(10px);
          background: rgba(10,10,10,0.4);
        }

        .logo {
          font-family: 'Bebas Neue';
          letter-spacing: 0.15em;
          font-size: 1.5rem;
        }

        .hero {
          padding: 4rem 3rem;
        }

        .headline {
          font-family: 'Bebas Neue';
          font-size: clamp(4rem, 10vw, 10rem);
          line-height: 0.9;
          letter-spacing: 0.02em;
        }

        .outline {
          -webkit-text-stroke: 1px var(--text);
          color: transparent;
        }

        .gold {
          color: var(--gold);
        }

        .sub {
          margin-top: 2rem;
          font-family: 'DM Mono';
          color: var(--text-dim);
          max-width: 420px;
          line-height: 1.8;
        }

        .countdown {
          display: flex;
          gap: 10px;
          margin-top: 3rem;
        }

        .block {
          padding: 1rem;
          background: var(--surface);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.05);
        }

        .value {
          font-size: 2rem;
          color: var(--gold);
          font-family: 'Bebas Neue';
        }

        .email {
          margin-top: 4rem;
          display: flex;
        }

        input {
          padding: 1rem;
          flex: 1;
          background: var(--surface);
          border: none;
          color: white;
          outline: none;
        }

        button {
          padding: 1rem 2rem;
          background: var(--gold);
          border: none;
          cursor: pointer;
          transition: all 0.3s;
        }

        button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(198,167,105,0.3);
        }

        button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>

      {/* cursor */}
      <div
        className="cursor-dot"
        style={{ left: mousePos.x, top: mousePos.y }}
      />
      <div
        className="cursor-ring"
        style={{ left: mousePos.x, top: mousePos.y }}
      />

      <nav>
        <div className="logo">TradeTailors</div>
        <div>Coming Soon</div>
      </nav>

      <main className="hero">
        <h1 className="headline">
          Fabric.
          <br />
          <span className="outline">Design.</span>
          <br />
          <span className="gold">Supply.</span>
          <br />
          Connected.
        </h1>

        <p className="sub">
          The supply chain wasn’t designed. We’re fixing that.
        </p>

        <div className="countdown">
          {Object.entries(count).map(([k, v]) => (
            <div key={k} className="block">
              <div className="value">{v}</div>
            </div>
          ))}
        </div>

        <form className="email" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button disabled={loading}>
            {loading ? "..." : "Request Access"}
          </button>
        </form>

        {submitted && (
          <p style={{ marginTop: 20 }}>You’re in. We’ll reach out quietly.</p>
        )}
      </main>
    </>
  );
}
