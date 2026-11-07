/**
 * Technical line-art vignettes — Swiss editorial style, single-stroke weight.
 * Server-renderable static SVGs; color via props.
 */

const STROKE = "#101C2E";
const ACCENT = "#F97316";

export function PlaneIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 320" className={className} role="img" aria-label="Cargo aircraft illustration">
      {/* horizon + runway */}
      <line x1="0" y1="276" x2="480" y2="276" stroke={STROKE} strokeWidth="1" />
      <line x1="40" y1="290" x2="440" y2="290" stroke={STROKE} strokeWidth="1" strokeDasharray="24 14" opacity="0.4" />

      {/* motion lines */}
      <g stroke={STROKE} opacity="0.25">
        <line x1="30" y1="120" x2="150" y2="120" />
        <line x1="10" y1="150" x2="120" y2="150" />
        <line x1="45" y1="180" x2="140" y2="180" />
      </g>

      {/* fuselage */}
      <path
        d="M120 165 Q120 140 160 135 L330 122 Q390 118 425 132 Q452 142 452 155 Q452 168 425 173 L335 185 Q200 195 160 185 Q120 178 120 165 Z"
        fill="none" stroke={STROKE} strokeWidth="2"
      />
      {/* cockpit */}
      <path d="M425 132 Q445 140 448 152 L420 152 Q418 140 425 132 Z" fill={ACCENT} opacity="0.9" />
      {/* windows */}
      {[190, 215, 240, 265, 290, 315].map((x) => (
        <rect key={x} x={x} y={143} width="10" height="6" stroke={STROKE} fill="none" strokeWidth="1" />
      ))}
      {/* wing */}
      <path d="M270 158 L200 218 Q195 222 205 222 L320 172" fill="none" stroke={STROKE} strokeWidth="2" />
      {/* tail */}
      <path d="M165 138 L140 95 Q136 88 146 90 L185 125" fill="none" stroke={STROKE} strokeWidth="2" />
      {/* engines */}
      <ellipse cx="252" cy="200" rx="14" ry="9" fill="none" stroke={STROKE} strokeWidth="2" />

      {/* data callouts */}
      <g fontFamily="var(--font-mono)" fontSize="10" fill={STROKE} opacity="0.7" letterSpacing="1">
        <text x="340" y="60">FREIGHT HOLD</text>
        <line x1="345" y1="66" x2="345" y2="115" stroke={STROKE} strokeWidth="0.75" strokeDasharray="3 3" />
        <circle cx="345" cy="118" r="2" fill={ACCENT} stroke="none" opacity="1" />
        <text x="60" y="55">CRUISE · FL380</text>
      </g>
    </svg>
  );
}

export function ShipIllustration({ className = "" }: { className?: string }) {
  const boxes = [
    { x: 150, y: 150, w: 34, h: 24, a: true },
    { x: 186, y: 150, w: 34, h: 24 },
    { x: 222, y: 150, w: 34, h: 24 },
    { x: 258, y: 150, w: 34, h: 24, a: true },
    { x: 168, y: 124, w: 34, h: 24 },
    { x: 204, y: 124, w: 34, h: 24, a: true },
    { x: 240, y: 124, w: 34, h: 24 },
    { x: 186, y: 98, w: 34, h: 24, a: true },
    { x: 222, y: 98, w: 34, h: 24 },
  ];
  return (
    <svg viewBox="0 0 480 320" className={className} role="img" aria-label="Container ship illustration">
      {/* water */}
      <g stroke={STROKE} opacity="0.3">
        <path d="M0 240 Q30 232 60 240 T120 240 T180 240 T240 240 T300 240 T360 240 T420 240 T480 240" fill="none" />
        <path d="M0 258 Q30 250 60 258 T120 258 T180 258 T240 258 T300 258 T360 258 T420 258 T480 258" fill="none" />
      </g>

      {/* hull */}
      <path
        d="M60 178 L120 178 L120 226 Q160 246 250 246 L380 246 Q420 246 432 210 L432 178"
        fill="none" stroke={STROKE} strokeWidth="2"
      />
      <line x1="60" y1="178" x2="60" y2="196" stroke={STROKE} strokeWidth="2" />
      <path d="M60 196 Q90 240 140 244" fill="none" stroke={STROKE} strokeWidth="2" />
      {/* bow */}
      <path d="M432 178 L452 178 Q448 208 432 210" fill="none" stroke={STROKE} strokeWidth="2" />
      {/* waterline accent */}
      <line x1="100" y1="232" x2="400" y2="232" stroke={ACCENT} strokeWidth="2" />

      {/* containers */}
      {boxes.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={b.y} width={b.w} height={b.h} stroke={STROKE} strokeWidth="1.5" fill={b.a ? ACCENT : "none"} fillOpacity={b.a ? 0.85 : 0} />
          <line x1={b.x + 8} y1={b.y} x2={b.x + 8} y2={b.y + b.h} stroke={b.a ? "#fff" : STROKE} strokeWidth="0.75" opacity="0.5" />
          <line x1={b.x + 17} y1={b.y} x2={b.x + 17} y2={b.y + b.h} stroke={b.a ? "#fff" : STROKE} strokeWidth="0.75" opacity="0.5" />
          <line x1={b.x + 26} y1={b.y} x2={b.x + 26} y2={b.y + b.h} stroke={b.a ? "#fff" : STROKE} strokeWidth="0.75" opacity="0.5" />
        </g>
      ))}

      {/* bridge */}
      <rect x="350" y="128" width="56" height="50" stroke={STROKE} strokeWidth="2" fill="none" />
      <rect x="358" y="140" width="40" height="10" stroke={STROKE} strokeWidth="1" fill="none" />
      <line x1="378" y1="128" x2="378" y2="105" stroke={STROKE} strokeWidth="1.5" />

      {/* callouts */}
      <g fontFamily="var(--font-mono)" fontSize="10" fill={STROKE} opacity="0.7" letterSpacing="1">
        <text x="60" y="60">CONSOLIDATED + FCL</text>
        <line x1="120" y1="66" x2="200" y2="92" stroke={STROKE} strokeWidth="0.75" strokeDasharray="3 3" />
        <circle cx="203" cy="94" r="2" fill={ACCENT} stroke="none" opacity="1" />
      </g>
    </svg>
  );
}

export function ParcelIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 320" className={className} role="img" aria-label="Parcel and documents illustration">
      {/* desk line */}
      <line x1="0" y1="252" x2="480" y2="252" stroke={STROKE} strokeWidth="1" />

      {/* main parcel — isometric-ish */}
      <g stroke={STROKE} strokeWidth="2" fill="none">
        <path d="M160 160 L250 140 L340 160 L250 182 Z" />
        <path d="M160 160 L160 220 L250 242 L250 182" />
        <path d="M340 160 L340 220 L250 242 L250 182" />
      </g>
      {/* tape */}
      <path d="M205 150 L205 230 M295 150 L295 230" stroke={ACCENT} strokeWidth="6" fill="none" opacity="0.85" transform="translate(0,0)" />
      <path d="M205 150 L205 230 M295 150 L295 230" stroke="none" fill="none" />
      {/* label */}
      <rect x="268" y="192" width="46" height="26" stroke={STROKE} fill="#F7F6F2" strokeWidth="1.25" />
      <line x1="274" y1="200" x2="308" y2="200" stroke={STROKE} strokeWidth="1" />
      <line x1="274" y1="206" x2="300" y2="206" stroke={STROKE} strokeWidth="1" />
      <line x1="274" y1="212" x2="295" y2="212" stroke={STROKE} strokeWidth="1" />

      {/* document envelope */}
      <g stroke={STROKE} strokeWidth="1.5" fill="none">
        <rect x="96" y="200" width="72" height="46" />
        <path d="M96 200 L132 228 L168 200" />
      </g>
      <line x1="96" y1="206" x2="132" y2="233" stroke={ACCENT} strokeWidth="1.5" opacity="0" />

      {/* fragile / this way up marks */}
      <g stroke={STROKE} fill="none" strokeWidth="1.25">
        <rect x="174" y="192" width="28" height="30" />
        <path d="M182 214 L182 202 M194 214 L194 202 M179 202 L188 196 L197 202" />
      </g>

      {/* dotted courier path */}
      <path d="M370 120 Q420 100 430 60" fill="none" stroke={STROKE} strokeWidth="1" strokeDasharray="2 6" opacity="0.5" />
      <circle cx="430" cy="58" r="4" stroke={ACCENT} strokeWidth="1.5" fill="none" />
      <circle cx="370" cy="122" r="3" fill={ACCENT} stroke="none" />

      <g fontFamily="var(--font-mono)" fontSize="10" fill={STROKE} opacity="0.7" letterSpacing="1">
        <text x="60" y="70">DOCS + PARCELS</text>
        <text x="60" y="86">DOOR-TO-DOOR OPTIONS</text>
      </g>
    </svg>
  );
}
