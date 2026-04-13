"use client";

export default function Home() {
  return (
    <main className="main">
      <svg viewBox="0 0 800 140" className="logo">
        {/* Main Text */}
        <text
          x="50%"
          y="45%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="title"
        >
          TradeTailors
        </text>

        {/* Subtitle */}
        <text
          x="50%"
          y="75%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="subtitle"
        >
          Coming Soon
        </text>
      </svg>

      <style jsx>{`
        .main {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #0d0d0d;
        }

        .title {
          font-size: 60px;
          font-weight: bold;
          fill: transparent;
          stroke: white;
          stroke-width: 1;

          stroke-dasharray: 1200;
          stroke-dashoffset: 1200;

          animation:
            draw 5s ease forwards,
            fill 1.5s ease 4.5s forwards;
        }

        .subtitle {
          font-size: 24px;
          fill: transparent;
          stroke: white;
          stroke-width: 0.5;
          opacity: 0.7;

          stroke-dasharray: 400;
          stroke-dashoffset: 400;

          animation:
            draw 4s ease 1s forwards,
            fill 1s ease 4.5s forwards;
        }

        @keyframes draw {
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes fill {
          to {
            fill: white;
          }
        }
      `}</style>
    </main>
  );
}
