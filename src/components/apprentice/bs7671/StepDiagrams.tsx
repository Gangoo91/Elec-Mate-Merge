/**
 * BS 7671 step diagrams — real visual SVGs for the inspection & testing
 * walkthrough. Picks a diagram based on the step title / test id so each
 * step in InteractiveTestingGuide can show what the test actually looks
 * like rather than just a wall of text.
 */

import type { BS7671Test, BS7671TestStep } from '@/data/bs7671-testing/allBS7671Tests';

const FRAME_CLASS =
  'rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3';
const EYEBROW_CLASS = 'text-[10px] font-medium uppercase tracking-[0.18em] text-white/55';

const yellow = '#facc15';
const white55 = 'rgba(255,255,255,0.55)';
const white85 = 'rgba(255,255,255,0.85)';
const white15 = 'rgba(255,255,255,0.15)';
const white06 = 'rgba(255,255,255,0.06)';
const red = '#f87171';
const blue = '#60a5fa';
const green = '#84cc16';
const brown = '#a16207';

const SvgFrame = ({
  title,
  caption,
  children,
}: {
  title: string;
  caption?: string;
  children: React.ReactNode;
}) => (
  <figure className={FRAME_CLASS}>
    <span className={EYEBROW_CLASS}>{title}</span>
    <div className="rounded-lg bg-black/20 p-3 sm:p-4 overflow-x-auto">
      <svg viewBox="0 0 600 360" className="w-full h-auto" role="img" aria-label={title}>
        {children}
      </svg>
    </div>
    {caption && <p className="text-[12px] text-white/70 leading-relaxed">{caption}</p>}
  </figure>
);

// ─── Safe Isolation diagram ───────────────────────────────────────────
const SafeIsolationSvg = () => (
  <SvgFrame
    title="Safe isolation — visual sequence"
    caption="Identify, switch off, lock off, prove tester live, test L–E / L–N / N–E at the load, prove tester live again, then begin work. GS38-compliant probes only."
  >
    {/* Distribution board */}
    <rect x="20" y="60" width="190" height="240" rx="6" fill={white06} stroke={white15} />
    <text x="115" y="50" textAnchor="middle" fill={white55} fontSize="10" letterSpacing="2">
      DISTRIBUTION BOARD
    </text>
    {/* Main switch indicator */}
    <rect x="32" y="70" width="166" height="14" rx="2" fill={white06} stroke={white15} />
    <text x="115" y="80" textAnchor="middle" fill={white55} fontSize="8" letterSpacing="1">MAIN SWITCH</text>
    {/* MCBs */}
    {[0, 1, 2, 3].map((i) => (
      <g key={i}>
        <rect
          x={40}
          y={100 + i * 44}
          width="150"
          height="32"
          rx="3"
          fill={i === 1 ? '#facc15' : white06}
          stroke={i === 1 ? '#facc15' : white15}
        />
        <text
          x={55}
          y={120 + i * 44}
          fill={i === 1 ? '#000' : white85}
          fontSize="11"
          fontWeight={i === 1 ? '700' : '400'}
        >
          {i === 1 ? 'OFF' : 'ON'}
        </text>
        <text
          x={95}
          y={120 + i * 44}
          fill={i === 1 ? '#000' : white55}
          fontSize="9"
        >
          {['MCB 1', 'MCB 2', 'MCB 3', 'MCB 4'][i]}
        </text>
        <circle
          cx={170}
          cy={116 + i * 44}
          r="5"
          fill={i === 1 ? '#000' : white55}
        />
      </g>
    ))}
    {/* Lock-off — sits over the OFF MCB */}
    <g transform="translate(195, 134)">
      <rect x="0" y="0" width="36" height="22" rx="3" fill="#000" stroke={yellow} strokeWidth="1.5" />
      <path d="M 8 0 L 8 -6 Q 8 -14 18 -14 Q 28 -14 28 -6 L 28 0" stroke={yellow} fill="none" strokeWidth="2" />
      <circle cx="18" cy="11" r="2" fill={yellow} />
      <text x="18" y="32" fill={yellow} fontSize="8" textAnchor="middle" letterSpacing="1">LOCKED</text>
    </g>

    {/* Voltage indicator */}
    <rect x="270" y="70" width="140" height="200" rx="8" fill={white06} stroke={white15} />
    <text x="340" y="60" textAnchor="middle" fill={white55} fontSize="10" letterSpacing="2">
      VOLTAGE INDICATOR
    </text>
    <rect x="285" y="88" width="110" height="60" rx="4" fill="#000" stroke={white15} />
    <text x="340" y="123" textAnchor="middle" fill={yellow} fontSize="22" fontFamily="monospace" fontWeight="700">
      0.0 V
    </text>
    <text x="340" y="140" textAnchor="middle" fill={white55} fontSize="9" letterSpacing="1">DEAD</text>
    {/* Test buttons */}
    {['L-E', 'L-N', 'N-E'].map((label, i) => (
      <g key={label}>
        <rect
          x={285 + i * 38}
          y={158}
          width={32}
          height={22}
          rx="3"
          fill={white06}
          stroke={i === 0 ? yellow : white15}
        />
        <text x={301 + i * 38} y={173} textAnchor="middle" fill={i === 0 ? yellow : white85} fontSize="10" fontWeight="600">
          {label}
        </text>
      </g>
    ))}
    {/* GS38 probes */}
    <text x="340" y="200" textAnchor="middle" fill={white55} fontSize="8" letterSpacing="1">GS38 PROBES</text>
    <line x1="295" y1="210" x2="295" y2="245" stroke={red} strokeWidth="2" />
    <line x1="385" y1="210" x2="385" y2="245" stroke={white85} strokeWidth="2" />
    <circle cx="295" cy="252" r="6" fill={red} />
    <circle cx="385" cy="252" r="6" fill={white85} />

    {/* Probe arrows toward circuit under test */}
    <path d="M 295 260 Q 295 285 415 285" stroke={red} strokeWidth="1.5" fill="none" strokeDasharray="2,3" />
    <path d="M 385 260 Q 385 295 415 295" stroke={white85} strokeWidth="1.5" fill="none" strokeDasharray="2,3" />

    {/* Circuit under test marker */}
    <rect x="265" y="280" width="20" height="40" rx="3" fill={white06} stroke={white15} />
    <text x="275" y="333" textAnchor="middle" fill={white55} fontSize="8" letterSpacing="1">SOCKET</text>
    <circle cx="270" cy="290" r="2" fill={red} />
    <circle cx="280" cy="290" r="2" fill={blue} />
    <circle cx="275" cy="305" r="2" fill={green} />

    {/* Sequence panel */}
    <rect x="430" y="60" width="155" height="245" rx="6" fill={white06} stroke={white15} />
    <text x="445" y="80" fill={white55} fontSize="9" letterSpacing="2">SEQUENCE</text>
    {[
      'Identify circuit',
      'Switch off',
      'Lock off + tag',
      'Prove tester',
      'Test L–E / L–N / N–E',
      'Re-prove tester',
      'Begin work',
    ].map((step, i) => (
      <g key={i}>
        <text x={445} y={100 + i * 28} fill={yellow} fontSize="10" fontFamily="monospace" fontWeight="600">
          {String(i + 1).padStart(2, '0')}
        </text>
        <text x={470} y={100 + i * 28} fill={white85} fontSize="11">
          {step}
        </text>
      </g>
    ))}
  </SvgFrame>
);

// ─── R1 + R2 Continuity ───────────────────────────────────────────────
const R1R2Svg = () => (
  <SvgFrame
    title="R1 + R2 continuity — test setup"
    caption="Link line and CPC at the consumer unit. Measure between L and CPC at the furthest point. Reading = R1 + R2 — use to verify Zs and disconnection time. Reg 643.2."
  >
    {/* MFT */}
    <rect x="40" y="80" width="160" height="200" rx="8" fill={white06} stroke={white15} />
    <text x="120" y="70" textAnchor="middle" fill={white55} fontSize="10" letterSpacing="2">MFT — LOW Ω</text>
    <rect x="55" y="95" width="130" height="60" rx="4" fill="#000" stroke={white15} />
    <text x="120" y="125" textAnchor="middle" fill={yellow} fontSize="22" fontFamily="monospace" fontWeight="700">
      0.84 Ω
    </text>
    <text x="120" y="142" textAnchor="middle" fill={white55} fontSize="9" letterSpacing="1">R1 + R2</text>
    {/* Test mode dial */}
    <g transform="translate(80 195)">
      <circle r="18" fill={white06} stroke={yellow} strokeWidth="2" />
      <line x1="0" y1="0" x2="0" y2="-12" stroke={yellow} strokeWidth="2.5" strokeLinecap="round" />
      <text x="-2" y="32" textAnchor="middle" fill={yellow} fontSize="9" letterSpacing="1">CONT.</text>
    </g>
    <text x="135" y="200" fill={white85} fontSize="10">Continuity</text>
    {/* Probe sockets */}
    <circle cx="80" cy="245" r="5" fill={red} stroke={white15} />
    <text x="80" y="265" textAnchor="middle" fill={red} fontSize="9" fontWeight="600">L</text>
    <circle cx="160" cy="245" r="5" fill={white85} stroke={white15} />
    <text x="160" y="265" textAnchor="middle" fill={white55} fontSize="9" fontWeight="600">CPC</text>

    {/* Consumer unit (link L to CPC) */}
    <rect x="240" y="80" width="120" height="100" rx="4" fill={white06} stroke={white15} />
    <text x="300" y="72" textAnchor="middle" fill={white55} fontSize="9" letterSpacing="1">
      CONSUMER UNIT
    </text>
    {/* Bus terminals */}
    <rect x="252" y="100" width="14" height="14" rx="2" fill={red} />
    <text x="275" y="112" fill={red} fontSize="11" fontWeight="600">L</text>
    <rect x="252" y="125" width="14" height="14" rx="2" fill={blue} />
    <text x="275" y="137" fill={blue} fontSize="11" fontWeight="600">N</text>
    <rect x="252" y="150" width="14" height="14" rx="2" fill={green} />
    <text x="275" y="162" fill={green} fontSize="11" fontWeight="600">CPC</text>
    {/* Link wire (yellow): L → CPC, tight curve */}
    <path
      d="M 266 107 Q 305 107 305 130 Q 305 157 266 157"
      stroke={yellow}
      strokeWidth="2.5"
      fill="none"
      strokeDasharray="4,3"
    />
    <text x="320" y="135" fill={yellow} fontSize="10" fontWeight="600">Link</text>

    {/* Cable to far socket */}
    <line x1="360" y1="107" x2="490" y2="107" stroke={red} strokeWidth="2" />
    <line x1="360" y1="157" x2="490" y2="157" stroke={green} strokeWidth="2" />
    <text x="425" y="100" fill={white55} fontSize="9" textAnchor="middle">cable run</text>

    {/* Far socket */}
    <rect x="480" y="80" width="60" height="100" rx="4" fill={white06} stroke={white15} />
    <text x="510" y="72" textAnchor="middle" fill={white55} fontSize="9" letterSpacing="1">FAR SOCKET</text>
    <circle cx="495" cy="107" r="4" fill={red} />
    <circle cx="525" cy="107" r="4" fill={blue} />
    <circle cx="510" cy="157" r="4" fill={green} />
    <text x="495" y="125" textAnchor="middle" fill={red} fontSize="9">L</text>
    <text x="525" y="125" textAnchor="middle" fill={blue} fontSize="9">N</text>
    <text x="510" y="175" textAnchor="middle" fill={green} fontSize="9">CPC</text>

    {/* Probe leads from MFT to far socket — clean routing under */}
    <path d="M 80 250 Q 80 320 270 320 L 495 320 L 495 165" stroke={red} strokeWidth="2" fill="none" />
    <path d="M 160 250 Q 160 308 270 308 L 510 308 L 510 165" stroke={white85} strokeWidth="2" fill="none" />

    {/* Probe tips */}
    <circle cx="495" cy="115" r="3" fill={red} />
    <circle cx="510" cy="165" r="3" fill={white85} />
  </SvgFrame>
);

// ─── Insulation Resistance ────────────────────────────────────────────
const InsulationSvg = () => (
  <SvgFrame
    title="Insulation resistance — test setup"
    caption="Disconnect loads & vulnerable equipment. Test 500 V DC for low-voltage installations. Min 1.0 MΩ (Reg 643.3.2). Test L+N (tied) → E first, then L → N if appropriate."
  >
    {/* MFT */}
    <rect x="40" y="80" width="160" height="200" rx="8" fill={white06} stroke={white15} />
    <text x="120" y="70" textAnchor="middle" fill={white55} fontSize="10" letterSpacing="2">
      MFT — INSULATION
    </text>
    <rect x="55" y="95" width="130" height="60" rx="4" fill="#000" stroke={white15} />
    <text x="120" y="123" textAnchor="middle" fill={yellow} fontSize="20" fontFamily="monospace" fontWeight="700">
      &gt; 200 MΩ
    </text>
    <text x="120" y="140" textAnchor="middle" fill={white55} fontSize="9" letterSpacing="1">PASS</text>
    {/* Voltage selector */}
    <g transform="translate(70 175)">
      <rect width="100" height="22" rx="11" fill={yellow} />
      <text x="50" y="15" textAnchor="middle" fill="#000" fontSize="11" fontWeight="700">500 V DC</text>
    </g>
    <text x="120" y="220" textAnchor="middle" fill={white55} fontSize="9" letterSpacing="1">PRESS &amp; HOLD</text>
    {/* Probe sockets */}
    <circle cx="80" cy="245" r="5" fill={red} stroke={white15} />
    <text x="80" y="265" textAnchor="middle" fill={red} fontSize="9" fontWeight="600">+</text>
    <circle cx="160" cy="245" r="5" fill={white85} stroke={white15} />
    <text x="160" y="265" textAnchor="middle" fill={white55} fontSize="9" fontWeight="600">−</text>

    {/* Circuit under test */}
    <rect x="280" y="100" width="280" height="170" rx="6" fill={white06} stroke={white15} />
    <text x="420" y="92" textAnchor="middle" fill={white55} fontSize="10" letterSpacing="2">
      CIRCUIT UNDER TEST
    </text>
    {/* Bus bars */}
    <line x1="300" y1="140" x2="510" y2="140" stroke={red} strokeWidth="3" />
    <text x="305" y="133" fill={red} fontSize="10" fontWeight="600">L</text>
    <line x1="300" y1="170" x2="510" y2="170" stroke={blue} strokeWidth="3" />
    <text x="305" y="163" fill={blue} fontSize="10" fontWeight="600">N</text>
    <line x1="300" y1="230" x2="540" y2="230" stroke={green} strokeWidth="3" />
    <text x="305" y="223" fill={green} fontSize="10" fontWeight="600">E</text>
    {/* L + N tied at right end */}
    <line x1="510" y1="140" x2="510" y2="170" stroke={yellow} strokeWidth="2.5" strokeDasharray="3,3" />
    <circle cx="510" cy="155" r="4" fill={yellow} />
    <text x="520" y="159" fill={yellow} fontSize="10" fontWeight="600">L+N tied</text>

    {/* Probe leads from MFT to L+N tie point and to E */}
    <path d="M 80 252 Q 80 320 280 320 L 510 320 L 510 162" stroke={red} strokeWidth="2" fill="none" />
    <path d="M 160 252 Q 160 308 270 308 L 540 308 L 540 235" stroke={white85} strokeWidth="2" fill="none" />

    {/* Probe tips */}
    <circle cx="510" cy="158" r="3.5" fill={red} />
    <circle cx="540" cy="235" r="3.5" fill={white85} />

    {/* Annotation */}
    <text x="380" y="250" fill={white55} fontSize="9" letterSpacing="1">Active probe → L+N tie</text>
    <text x="380" y="262" fill={white55} fontSize="9" letterSpacing="1">Return probe → Earth</text>
  </SvgFrame>
);

// ─── Earth Fault Loop (Zs) ────────────────────────────────────────────
const ZsSvg = () => (
  <SvgFrame
    title="Earth fault loop impedance (Zs)"
    caption="Live measurement at the furthest point. Zs = Ze + (R1 + R2). Compare against BS 7671 Table 41.3 — 32 A Type B max Zs = 1.37 Ω (with Cmin 0.95). Reg 411.4.5."
  >
    {/* Supply / transformer */}
    <g transform="translate(40 80)">
      <rect width="120" height="140" rx="6" fill={white06} stroke={white15} />
      <text x="60" y="-8" textAnchor="middle" fill={white55} fontSize="9" letterSpacing="2">
        SUPPLY (TX)
      </text>
      {/* Coil symbols */}
      <circle cx="40" cy="55" r="16" fill="none" stroke={white55} strokeWidth="1.5" />
      <circle cx="80" cy="55" r="16" fill="none" stroke={white55} strokeWidth="1.5" />
      <text x="60" y="58" textAnchor="middle" fill={white55} fontSize="8">N : L</text>
      {/* Terminals */}
      <text x="22" y="100" fill={red} fontSize="9" fontWeight="600">L</text>
      <circle cx="40" cy="105" r="3.5" fill={red} />
      <text x="22" y="125" fill={blue} fontSize="9" fontWeight="600">N</text>
      <circle cx="40" cy="125" r="3.5" fill={blue} />
      <text x="100" y="100" fill={green} fontSize="9" fontWeight="600">PE</text>
      <circle cx="80" cy="105" r="3.5" fill={green} />
    </g>

    {/* Earth electrode below TX */}
    <line x1="120" y1="220" x2="120" y2="270" stroke={green} strokeWidth="3" />
    <path
      d="M 100 270 L 140 270 M 106 280 L 134 280 M 112 290 L 128 290"
      stroke={green}
      strokeWidth="2"
    />
    <text x="120" y="305" textAnchor="middle" fill={white55} fontSize="9" letterSpacing="1">EARTH</text>

    {/* L outgoing line */}
    <line x1="160" y1="185" x2="430" y2="185" stroke={red} strokeWidth="3" />
    <text x="285" y="178" textAnchor="middle" fill={red} fontSize="10" fontWeight="600">L line</text>

    {/* Fault arrow showing fault occurring at far end */}
    <line x1="430" y1="185" x2="430" y2="225" stroke={red} strokeWidth="3" strokeDasharray="2,2" />
    <circle cx="430" cy="205" r="6" fill={yellow} />
    <text x="430" y="209" textAnchor="middle" fill="#000" fontSize="9" fontWeight="700">F</text>

    {/* CPC return line */}
    <line x1="430" y1="225" x2="160" y2="225" stroke={green} strokeWidth="3" />
    <text x="285" y="220" textAnchor="middle" fill={green} fontSize="10" fontWeight="600">CPC return</text>

    {/* Loop arrow indicator (closed loop following the path) */}
    <path
      d="M 250 185 L 270 185 M 270 175 L 270 195 L 285 185 Z"
      fill={yellow}
      stroke="none"
    />
    <path
      d="M 320 225 L 300 225 M 300 215 L 300 235 L 285 225 Z"
      fill={yellow}
      stroke="none"
    />
    <text x="285" y="160" textAnchor="middle" fill={yellow} fontSize="10" letterSpacing="1" fontWeight="600">FAULT LOOP</text>

    {/* MFT at far point */}
    <rect x="430" y="80" width="130" height="170" rx="8" fill={white06} stroke={white15} />
    <text x="495" y="70" textAnchor="middle" fill={white55} fontSize="10" letterSpacing="2">
      MFT — Zs
    </text>
    <rect x="445" y="95" width="100" height="55" rx="4" fill="#000" stroke={white15} />
    <text x="495" y="122" textAnchor="middle" fill={yellow} fontSize="20" fontFamily="monospace" fontWeight="700">
      0.74 Ω
    </text>
    <text x="495" y="138" textAnchor="middle" fill={white55} fontSize="9" letterSpacing="1">Zs MEASURED</text>
    {/* Limit comparison */}
    <rect x="445" y="160" width="100" height="60" rx="4" fill={white06} stroke={yellow} />
    <text x="495" y="178" textAnchor="middle" fill={yellow} fontSize="9" letterSpacing="1">
      MAX Zs (32 A B)
    </text>
    <text x="495" y="200" textAnchor="middle" fill={white85} fontSize="14" fontFamily="monospace" fontWeight="700">
      ≤ 1.37 Ω
    </text>
    <text x="495" y="214" textAnchor="middle" fill={green} fontSize="9" fontWeight="600">PASS</text>

    {/* MET symbol below MFT */}
    <text x="495" y="270" textAnchor="middle" fill={white55} fontSize="8" letterSpacing="1">at far point</text>
  </SvgFrame>
);

// ─── Polarity ─────────────────────────────────────────────────────────
const PolaritySvg = () => (
  <SvgFrame
    title="Polarity — BS 1363 socket (front view)"
    caption="Looking at the socket front: Earth top-centre, Line bottom-RIGHT (brown), Neutral bottom-LEFT (blue). Switches must break the line conductor only. Verify polarity at every accessible point."
  >
    {/* Annotation: front view */}
    <text x="300" y="40" textAnchor="middle" fill={white55} fontSize="9" letterSpacing="2">
      VIEW FROM FRONT (insertion side)
    </text>

    {/* BS 1363 socket front */}
    <rect
      x="180"
      y="60"
      width="240"
      height="240"
      rx="20"
      fill={white06}
      stroke={white15}
      strokeWidth="1.5"
    />
    <text x="300" y="80" textAnchor="middle" fill={white55} fontSize="10" letterSpacing="2">
      BS 1363 — UK 13 A SOCKET
    </text>

    {/* Earth pin slot — top centre */}
    <rect x="290" y="105" width="20" height="55" rx="3" fill={green} />
    <text x="300" y="180" textAnchor="middle" fill={green} fontSize="12" fontWeight="700">E</text>
    <text x="300" y="194" textAnchor="middle" fill={white55} fontSize="9">earth</text>

    {/* Neutral pin slot — bottom LEFT (looking at front) */}
    <rect x="220" y="200" width="18" height="44" rx="3" fill={blue} />
    <text x="229" y="263" textAnchor="middle" fill={blue} fontSize="12" fontWeight="700">N</text>
    <text x="229" y="275" textAnchor="middle" fill={white55} fontSize="9">neutral</text>
    <text x="229" y="287" textAnchor="middle" fill={blue} fontSize="9">blue</text>

    {/* Line pin slot — bottom RIGHT (looking at front) */}
    <rect x="362" y="200" width="18" height="44" rx="3" fill={red} />
    <text x="371" y="263" textAnchor="middle" fill={red} fontSize="12" fontWeight="700">L</text>
    <text x="371" y="275" textAnchor="middle" fill={white55} fontSize="9">line</text>
    <text x="371" y="287" textAnchor="middle" fill={brown} fontSize="9" fontWeight="600">brown</text>

    {/* Switch indicator on the right (near L pin) */}
    <rect x="395" y="195" width="14" height="30" rx="2" fill={white06} stroke={yellow} />
    <line x1="402" y1="200" x2="402" y2="210" stroke={yellow} strokeWidth="2" />
    <circle cx="402" cy="215" r="2" fill={yellow} />
    <text x="402" y="240" textAnchor="middle" fill={yellow} fontSize="8" letterSpacing="1">SW</text>
    <text x="427" y="208" fill={white55} fontSize="9">switches</text>
    <text x="427" y="220" fill={white55} fontSize="9">break L</text>
    <text x="427" y="232" fill={white55} fontSize="9">only</text>

    {/* Verify panel */}
    <g transform="translate(40 80)">
      <rect width="125" height="200" rx="8" fill={white06} stroke={yellow} />
      <text x="62" y="20" textAnchor="middle" fill={yellow} fontSize="10" letterSpacing="2" fontWeight="600">
        VERIFY
      </text>
      <line x1="10" y1="32" x2="115" y2="32" stroke={yellow} strokeOpacity="0.3" />

      <text x="12" y="55" fill={white55} fontSize="9" letterSpacing="1">EARTH</text>
      <circle cx="20" cy="68" r="4" fill={green} />
      <text x="32" y="72" fill={white85} fontSize="10">top centre</text>

      <text x="12" y="95" fill={white55} fontSize="9" letterSpacing="1">LINE</text>
      <circle cx="20" cy="108" r="4" fill={red} />
      <text x="32" y="112" fill={white85} fontSize="10">bottom right</text>
      <text x="32" y="124" fill={brown} fontSize="9" fontWeight="600">brown</text>

      <text x="12" y="145" fill={white55} fontSize="9" letterSpacing="1">NEUTRAL</text>
      <circle cx="20" cy="158" r="4" fill={blue} />
      <text x="32" y="162" fill={white85} fontSize="10">bottom left</text>
      <text x="32" y="174" fill={blue} fontSize="9" fontWeight="600">blue</text>
    </g>

    {/* Conductor colour key on right */}
    <g transform="translate(440 100)">
      <text fill={white55} fontSize="9" letterSpacing="2">CONDUCTORS</text>
      <line x1="0" y1="14" x2="135" y2="14" stroke={white15} />
      <rect x="0" y="22" width="20" height="6" fill={brown} rx="1" />
      <text x="28" y="30" fill={white85} fontSize="10">Line — brown</text>
      <rect x="0" y="40" width="20" height="6" fill={blue} rx="1" />
      <text x="28" y="48" fill={white85} fontSize="10">Neutral — blue</text>
      <g transform="translate(0 58)">
        <rect width="20" height="6" fill={green} rx="1" />
        <rect width="3" height="6" fill={yellow} />
        <rect x="6" width="3" height="6" fill={yellow} />
        <rect x="12" width="3" height="6" fill={yellow} />
      </g>
      <text x="28" y="66" fill={white85} fontSize="10">CPC — g/y</text>
    </g>
  </SvgFrame>
);

// ─── Mapper: which diagram for which step ─────────────────────────────
type DiagramKey = 'isolation' | 'r1r2' | 'insulation' | 'zs' | 'polarity' | null;

const pickDiagramKey = (test: BS7671Test, step: BS7671TestStep): DiagramKey => {
  const haystack = `${test.id} ${test.title} ${step.id} ${step.title}`.toLowerCase();
  if (haystack.includes('isolation') || haystack.includes('safe isolation')) return 'isolation';
  if (
    haystack.includes('r1') ||
    haystack.includes('r1+r2') ||
    haystack.includes('r1 + r2') ||
    haystack.includes('protective conductor')
  )
    return 'r1r2';
  if (haystack.includes('insulation')) return 'insulation';
  if (haystack.includes('earth fault') || haystack.includes('zs') || haystack.includes('loop'))
    return 'zs';
  if (haystack.includes('polarity')) return 'polarity';
  return null;
};

interface StepDiagramProps {
  test: BS7671Test;
  step: BS7671TestStep;
}

const StepDiagram = ({ test, step }: StepDiagramProps) => {
  const key = pickDiagramKey(test, step);
  switch (key) {
    case 'isolation':
      return <SafeIsolationSvg />;
    case 'r1r2':
      return <R1R2Svg />;
    case 'insulation':
      return <InsulationSvg />;
    case 'zs':
      return <ZsSvg />;
    case 'polarity':
      return <PolaritySvg />;
    default:
      return null;
  }
};

export default StepDiagram;
export { SafeIsolationSvg, R1R2Svg, InsulationSvg, ZsSvg, PolaritySvg };
