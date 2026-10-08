type Point = [number, number];

// The curved stem: start (top right, slightly off-screen) to tip (lower left)
const P0: Point = [335, -20];
const P1: Point = [315, 150];
const P2: Point = [235, 310];
const P3: Point = [222, 540];

function pointAt(t: number): Point {
  const u = 1 - t;
  return [
    u * u * u * P0[0] + 3 * u * u * t * P1[0] + 3 * u * t * t * P2[0] + t * t * t * P3[0],
    u * u * u * P0[1] + 3 * u * u * t * P1[1] + 3 * u * t * t * P2[1] + t * t * t * P3[1],
  ];
}

function angleAt(t: number): number {
  const u = 1 - t;
  const dx = 3 * u * u * (P1[0] - P0[0]) + 6 * u * t * (P2[0] - P1[0]) + 3 * t * t * (P3[0] - P2[0]);
  const dy = 3 * u * u * (P1[1] - P0[1]) + 6 * u * t * (P2[1] - P1[1]) + 3 * t * t * (P3[1] - P2[1]);
  return (Math.atan2(dy, dx) * 180) / Math.PI;
}

// One pointed leaflet, base at (0,0), tip pointing along +x
const LEAFLET = "M0 0 C 14 -13, 46 -15, 74 0 C 46 15, 14 13, 0 0 Z";
const COUNT = 15;

const leaflets = Array.from({ length: COUNT }, (_, i) => {
  const t = 0.08 + (i / (COUNT - 1)) * 0.86;
  const [x, y] = pointAt(t);
  const angle = angleAt(t);
  const scale = 0.35 + 0.9 * Math.sin(Math.PI * Math.pow(t, 0.8));
  const opacity = 0.55 + ((i * 37) % 10) / 25;

  return {
    id: i,
    x: x.toFixed(1),
    y: y.toFixed(1),
    angleLeft: (angle - 50).toFixed(1),
    angleRight: (angle + 50).toFixed(1),
    scale: scale.toFixed(2),
    opacity: opacity.toFixed(2),
  };
});

const tipAngle = angleAt(1).toFixed(1);

const fadeMask = "linear-gradient(to bottom, #000 50%, transparent 100%)";

function Fern({
  idPrefix,
  seed,
  className,
}: {
  idPrefix: string;
  seed: number;
  className: string;
}) {
  const gradientId = `${idPrefix}Gold`;
  const filterId = `${idPrefix}Dust`;

  return (
    <svg
      viewBox="0 0 360 560"
      className={`pointer-events-none ${className}`}
      style={{ maskImage: fadeMask, WebkitMaskImage: fadeMask }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F3E2B3" />
          <stop offset="45%" stopColor="#C9A24D" />
          <stop offset="100%" stopColor="#E8CE8F" />
        </linearGradient>

        <filter
          id={filterId}
          x="-5%"
          y="-5%"
          width="110%"
          height="110%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="2"
            seed={seed}
            result="noise"
          />
          <feColorMatrix
            in="noise"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  3.2 0 0 0 -0.95"
            result="grain"
          />
          <feComposite in="SourceGraphic" in2="grain" operator="in" />
        </filter>
      </defs>

      <g filter={`url(#${filterId})`}>
        <path
          d={`M${P0[0]} ${P0[1]} C ${P1[0]} ${P1[1]}, ${P2[0]} ${P2[1]}, ${P3[0]} ${P3[1]}`}
          stroke={`url(#${gradientId})`}
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          opacity="0.8"
        />

        {leaflets.map((l) => (
          <g key={l.id} opacity={l.opacity}>
            <path
              d={LEAFLET}
              fill={`url(#${gradientId})`}
              transform={`translate(${l.x} ${l.y}) rotate(${l.angleLeft}) scale(${l.scale})`}
            />
            <path
              d={LEAFLET}
              fill={`url(#${gradientId})`}
              transform={`translate(${l.x} ${l.y}) rotate(${l.angleRight}) scale(${l.scale})`}
            />
          </g>
        ))}

        <path
          d={LEAFLET}
          fill={`url(#${gradientId})`}
          opacity="0.7"
          transform={`translate(${P3[0]} ${P3[1]}) rotate(${tipAngle}) scale(0.45)`}
        />
      </g>
    </svg>
  );
}

export function GoldLeafDecoration() {
  return (
    <>
      <Fern
        idPrefix="fernTop"
        seed={7}
        className="absolute top-0 right-0 z-0 w-52.5 md:w-85 lg:w-105"
      />
      <Fern
        idPrefix="fernBottom"
        seed={13}
        className="fixed bottom-0 left-0 z-0 w-30.5 rotate-180 md:w-57.5 lg:w-72.5"
      />
    </>
  );
}