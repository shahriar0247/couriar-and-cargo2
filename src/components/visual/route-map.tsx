"use client";

import { motion, useReducedMotion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Stylized Bangladesh ⇄ Canada corridor map.
 * Abstract meridian grid, two city nodes, great-circle arc with
 * an aircraft glyph gliding along it (CSS offset-path, motion-driven).
 */
export function RouteMap({
  direction = "bd-to-ca",
  light = true,
  className = "",
}: {
  direction?: "bd-to-ca" | "ca-to-bd";
  light?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();

  const stroke = light ? "#F7F6F2" : "#101C2E";
  const dim = light ? "rgba(247,246,242,0.28)" : "rgba(16,28,46,0.22)";
  const faint = light ? "rgba(247,246,242,0.1)" : "rgba(16,28,46,0.08)";

  // Arc control points (viewBox 760x420): Dhaka ~ x=560,y=270 · Toronto ~ x=190,y=130
  const arc = "M 560 268 Q 380 40 196 132";
  const sea = "M 560 300 Q 360 420 190 190";

  return (
    <svg
      viewBox="0 0 760 420"
      className={className}
      role="img"
      aria-label="Stylized map of the Bangladesh to Canada shipping corridor"
    >
      {/* graticule */}
      {Array.from({ length: 8 }, (_, i) => (
        <line key={`v${i}`} x1={95 * i + 40} y1="0" x2={95 * i + 40} y2="420" stroke={faint} />
      ))}
      {Array.from({ length: 5 }, (_, i) => (
        <line key={`h${i}`} x1="0" y1={i * 95 + 20} x2="760" y2={i * 95 + 20} stroke={faint} />
      ))}
      <ellipse cx="380" cy="210" rx="360" ry="195" fill="none" stroke={faint} />
      <ellipse cx="380" cy="210" rx="360" ry="120" fill="none" stroke={faint} />

      {/* abstract landmasses */}
      <path
        d="M120 80 Q160 60 215 78 Q260 60 270 105 Q300 140 255 175 Q240 210 200 200 Q170 235 140 210 Q105 195 110 150 Q90 110 120 80 Z"
        fill={dim} opacity="0.35"
      />
      <path
        d="M500 230 Q545 215 590 235 Q640 230 660 275 Q680 320 635 340 Q590 375 545 350 Q505 340 495 300 Q480 260 500 230 Z"
        fill={dim} opacity="0.35"
      />

      {/* sea lane */}
      <path d={sea} fill="none" stroke={dim} strokeWidth="1" strokeDasharray="2 6" strokeLinecap="round" />

      {/* air arc — dashed, draws in on scroll */}
      <motion.path
        d={arc}
        fill="none"
        stroke="#F97316"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeDasharray="1 7"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 2, ease: EASE }}
      />
      <path d={arc} fill="none" stroke="none" id="air-arc" />

      {/* gliding aircraft */}
      {!reduce && (
        <motion.g
          style={{ offsetPath: `path("${arc}")`, offsetRotate: "auto" }}
          initial={{ offsetDistance: direction === "bd-to-ca" ? "0%" : "100%" }}
          animate={{ offsetDistance: direction === "bd-to-ca" ? "100%" : "0%" }}
          transition={{ duration: 9, ease: "easeInOut", repeat: Infinity, repeatDelay: 1.6 }}
        >
          <path
            d="M0 0 L11 2.5 L0 5 L2.5 2.5 Z"
            transform="translate(-5.5,-2.5) scale(1.6)"
            fill="#F97316"
          />
        </motion.g>
      )}

      {/* Toronto node */}
      <g>
        <circle cx="196" cy="132" r="4" fill={stroke} />
        <circle cx="196" cy="132" r="9" fill="none" stroke={stroke} opacity="0.4" />
        <text x="196" y="112" textAnchor="middle" fill={stroke} fontSize="13" fontFamily="var(--font-mono)" letterSpacing="2">
          TORONTO
        </text>
        <text x="196" y="156" textAnchor="middle" fill={dim} fontSize="10" fontFamily="var(--font-mono)" letterSpacing="1">
          YYZ · 43.65°N
        </text>
      </g>

      {/* Dhaka node */}
      <g>
        <circle cx="560" cy="268" r="4" fill="#F97316" />
        <circle cx="560" cy="268" r="9" fill="none" stroke="#F97316" opacity="0.4" />
        <text x="560" y="250" textAnchor="middle" fill={stroke} fontSize="13" fontFamily="var(--font-mono)" letterSpacing="2">
          DHAKA
        </text>
        <text x="560" y="292" textAnchor="middle" fill={dim} fontSize="10" fontFamily="var(--font-mono)" letterSpacing="1">
          DAC · 23.81°N
        </text>
      </g>
    </svg>
  );
}
