// SpaceButton.jsx
export default function SpaceButton({ href = "#projects", children = "View my work" }) {
  return (
    <>
      <style>
        {`
          /* Faster gradient drift (was 10s) */
          @keyframes gradient-x {
            0%,100% { background-position: 0% 50% }
            50%     { background-position: 100% 50% }
          }
          .animate-gradient-x { animation: gradient-x 5s ease-in-out infinite }

          /* Faster + shinier glare sweep (was 2.8s, wider and dimmer) */
          @keyframes glare {
            0%   { left: -130% }
            100% { left: 130% }
          }
          .space-btn { position: relative; overflow: hidden }
          .space-btn::before {
            content: "";
            position: absolute; top: -22%; left: -130%;
            width: 28%; height: 144%;              /* narrower = sharper shine */
            border-radius: inherit; pointer-events: none;
            background: linear-gradient(120deg,
              rgba(255,255,255,0) 0%,
              rgba(255,255,255,0.75) 50%,          /* brighter highlight */
              rgba(255,255,255,0) 100%
            );
            filter: blur(1px);                      /* tiny bloom */
            mix-blend-mode: screen;                 /* boosts perceived brightness */
            transform: rotate(15deg);
            animation: glare 1.6s cubic-bezier(.22,.61,.36,1) infinite;
            z-index: 0;
          }

          /* Hover: warp streak sweep (longer) */
          .space-btn .warp {
            position: absolute; inset: -1px; border-radius: inherit; pointer-events: none;
            background: repeating-linear-gradient(105deg,
              rgba(255,255,255,0) 0px,
              rgba(255,255,255,0) 8px,
              rgba(255,255,255,.45) 9px,           /* a bit shinier streak */
              rgba(255,255,255,0) 11px
            );
            transform: translateX(-120%) skewX(-12deg);
            opacity: 0; z-index: 1;
          }
          @keyframes warp-move {
            0%   { transform: translateX(-120%) skewX(-12deg); opacity: 0 }
            25%  { opacity: 1 }
            100% { transform: translateX(120%)  skewX(-12deg); opacity: 0 }
          }
          .space-btn:hover .warp { animation: warp-move 1.6s cubic-bezier(.22,.61,.36,1) } /* was .9s */

          /* Hover: halo pulse (longer) */
          .space-btn .halo {
            position: absolute; inset: -8px; border-radius: inherit; pointer-events: none;
            background:
              radial-gradient(60% 80% at 30% 20%, rgba(255,255,255,.2), transparent 60%),
              radial-gradient(100% 100% at 70% 80%, rgba(168,85,247,.6), transparent 60%);
            filter: blur(14px);
            opacity: 0; transform: scale(.8);
            z-index: 0;
          }
          @keyframes halo-pulse {
            0%   { transform: scale(.7);  opacity: 0 }
            35%  { opacity: 1 }
            100% { transform: scale(1.25); opacity: 0 }
          }
          .space-btn:hover .halo { animation: halo-pulse 1.8s ease-out }  /* was .9s */
        `}
      </style>

      <a
        href={href}
        aria-label="View my work"
        className="
          space-btn group inline-flex items-center gap-3
          px-8 md:px-10 py-4 md:py-5 rounded-2xl
          text-white font-semibold tracking-wide text-lg md:text-xl
          shadow-[0_12px_40px_-8px_rgba(168,85,247,0.75)]
          transition-transform active:scale-[0.98]
          focus:outline-none focus-visible:ring-4 focus-visible:ring-purple-400/50
          bg-[linear-gradient(110deg,#6d28d9_0%,#7c3aed_30%,#a855f7_58%,#c084fc_85%,#7c3aed_100%)]
          bg-[length:220%_220%] animate-gradient-x
        "
      >
        <span className="relative z-10">{children}</span>
        <svg
          className="relative z-10 w-6 h-6 transition-transform duration-500 group-hover:translate-x-1.5"
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
        </svg>

        {/* Hover layers */}
        <span aria-hidden="true" className="warp" />
        <span aria-hidden="true" className="halo" />
      </a>
    </>
  );
}