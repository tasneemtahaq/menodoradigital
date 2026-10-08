export function GoldLeafDecoration() {
  return (
    <svg
      viewBox="0 0 400 400"
      className="pointer-events-none fixed top-0 right-0 z-0 h-70 w-70 opacity-60 md:h-95 md:w-95"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8CE8F" />
          <stop offset="50%" stopColor="#B8923F" />
          <stop offset="100%" stopColor="#C9A227" />
        </linearGradient>
      </defs>

      <path
        d="M400 0C400 0 380 90 320 140C260 190 220 170 200 210C180 250 210 280 180 320C150 360 100 380 60 400"
        stroke="url(#leafGradient)"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M340 20C340 20 300 60 270 100C260 115 265 130 250 145"
        stroke="url(#leafGradient)"
        strokeWidth="1.5"
        fill="none"
        opacity="0.7"
      />
      <ellipse cx="300" cy="50" rx="20" ry="10" fill="url(#leafGradient)" opacity="0.5" transform="rotate(-30 300 50)" />
      <ellipse cx="250" cy="110" rx="18" ry="9" fill="url(#leafGradient)" opacity="0.5" transform="rotate(-20 250 110)" />
      <ellipse cx="220" cy="180" rx="16" ry="8" fill="url(#leafGradient)" opacity="0.45" transform="rotate(10 220 180)" />
      <ellipse cx="190" cy="250" rx="15" ry="7" fill="url(#leafGradient)" opacity="0.4" transform="rotate(30 190 250)" />
      <ellipse cx="140" cy="320" rx="14" ry="7" fill="url(#leafGradient)" opacity="0.35" transform="rotate(50 140 320)" />
    </svg>
  );
}