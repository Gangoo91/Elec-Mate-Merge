import { copyToClipboard } from '@/utils/clipboard';
import { useState, useMemo, useCallback } from 'react';
import { Copy, Check, ChevronDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  CalculatorCard,
  CalculatorSection,
  CalculatorSelect,
  ResultValue,
  ResultsGrid,
  ResultBadge,
  CalculatorDivider,
  FormulaReference,
  CalculatorEditorial,
  CALCULATOR_CONFIG,
  CalculatorPanes,
  ResultHeadline,
} from '@/components/calculators/shared';
import { ipRatingContent } from './content/ip-rating';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const CAT = 'utilities' as const;
const config = CALCULATOR_CONFIG[CAT];

/**
 * BS EN 60529 first characteristic numeral (solids / access).
 *
 * FIX (audit finding: no 'X' option): BS 7671 states most of its own IP
 * requirements with the first numeral omitted — IPX2 (Reg 702.512.2 zone 2
 * indoor), IPX4 (Regs 701.512.2 zones 1/2, 702.512.2 zone 1, 703.512.2 sauna),
 * IPX5 (water jets), IPX7 (Reg 701.512.2 zone 0), IPX8 (Reg 702.512.2 zone 0).
 * Without an 'X' entry the decoder could not represent, let alone decode, any
 * of the codes the regulations actually use.
 */
const SOLID_PROTECTION: Record<string, { short: string; description: string }> = {
  '0': {
    short: 'No protection',
    description: 'No protection against contact or ingress of objects',
  },
  '1': {
    short: 'Large objects (>50mm)',
    description: 'Protected against the back of a hand or objects larger than 50mm',
  },
  '2': {
    short: 'Fingers (>12.5mm)',
    description: 'Protected against fingers or objects larger than 12.5mm',
  },
  '3': {
    short: 'Tools (>2.5mm)',
    description: 'Protected against tools, thick wires, or objects larger than 2.5mm',
  },
  '4': {
    short: 'Small wires (>1mm)',
    description: 'Protected against most wires, screws, or objects larger than 1mm',
  },
  '5': {
    short: 'Dust-protected',
    description: 'Limited ingress of dust permitted — not enough to interfere with operation',
  },
  '6': {
    short: 'Dust-tight',
    description: 'Completely protected against dust — no ingress permitted',
  },
  X: {
    short: 'Not specified (X)',
    description:
      'No solid-object requirement is stated. Written as the letter X — e.g. IPX4, the form BS 7671 uses in Regs 701.512.2 and 702.512.2',
  },
};

/** BS EN 60529 second characteristic numeral (water). 'X' = not specified. */
const LIQUID_PROTECTION: Record<string, { short: string; description: string }> = {
  '0': { short: 'No protection', description: 'No protection against water' },
  '1': {
    short: 'Dripping water',
    description: 'Protected against vertically falling drops of water',
  },
  '2': {
    short: 'Tilted dripping (15°)',
    description: 'Protected against dripping water when tilted up to 15° from vertical',
  },
  '3': {
    short: 'Spraying water',
    description: 'Protected against water spray up to 60° from vertical',
  },
  '4': {
    short: 'Splashing water',
    description: 'Protected against water splashing from any direction',
  },
  '5': {
    short: 'Water jets',
    description: 'Protected against water jets (6.3mm nozzle) from any direction',
  },
  '6': {
    short: 'Powerful water jets',
    description: 'Protected against powerful water jets (12.5mm nozzle) from any direction',
  },
  '7': {
    short: 'Temporary immersion',
    description: 'Protected against temporary immersion in water (up to 1m for 30 minutes)',
  },
  '8': {
    short: 'Continuous immersion',
    description:
      'Protected against continuous immersion in water (depth specified by manufacturer)',
  },
  '9': {
    short: 'High-pressure jets',
    description: 'Protected against close-range high-pressure, high-temperature water jets',
  },
  X: {
    short: 'Not specified (X)',
    description:
      'No water requirement is stated. Written as the letter X — e.g. IP2X, IP4X, the form BS 7671 uses in Regs 416.2.1, 416.2.2, 521.10.1 and 740.526',
  },
};

/**
 * BS EN 60529 ADDITIONAL letters — access to hazardous parts.
 *
 * FIX (audit finding: only H/M/S/W were offered): BS EN 60529 defines two
 * distinct letter positions and BS 7671 leans on the *additional* letters
 * constantly — IPXXB (Regs 412.2.2, 417.3.2, 422.3.11), IPXXD (Regs 416.2.2,
 * 521.10.1, 740.526). The additional letter sits before the supplementary
 * letter: IP + solids + water + additional + supplementary.
 */
const ADDITIONAL_LETTERS: Record<string, string> = {
  A: 'Protected against access with the back of the hand (50 mm sphere probe)',
  B: 'Protected against access with a finger (12.5 mm dia, 80 mm long jointed test finger)',
  C: 'Protected against access with a tool (2.5 mm dia, 100 mm long probe)',
  D: 'Protected against access with a wire (1.0 mm dia, 100 mm long probe)',
};

/** BS EN 60529 SUPPLEMENTARY letters — equipment-specific information. */
const SUPPLEMENTARY_LETTERS: Record<string, string> = {
  H: 'High voltage equipment',
  M: 'Device moving during water test',
  S: 'Device stationary during water test',
  W: 'Suitable for specified weather conditions',
};

/**
 * FIX (audit finding: "IP20 — indoor consumer units, distribution boards"):
 * IP20 has first numeral 2 (12.5 mm). Reg 416.2.2 requires a readily
 * accessible horizontal top surface of a barrier or enclosure to provide at
 * least IPXXD or IP4X, which IP20 does not meet. The general basic-protection
 * minimum for live parts inside enclosures/behind barriers is IPXXB or IP2X
 * (Reg 416.2.1, echoed in Regs 412.2.2 and 422.3.11).
 */
const COMMON_RATINGS: { rating: string; use: string }[] = [
  {
    rating: 'IP2X',
    use: 'Basic protection minimum for enclosures/barriers — Reg 416.2.1 (or IPXXB)',
  },
  {
    rating: 'IP4X',
    use: 'Readily accessible horizontal top surface of an enclosure — Reg 416.2.2 (or IPXXD)',
  },
  {
    rating: 'IP44',
    use: 'Outdoor and moisture-exposed accessories and socket-outlets — Regs 721.55.2.3, 705.512.2, 709.553.1.8, 740.512.2',
  },
  { rating: 'IP55', use: 'Industrial enclosures, outdoor junction boxes' },
  { rating: 'IP65', use: 'External luminaires, outdoor equipment' },
  { rating: 'IP66', use: 'Exposed outdoor installations, car washes' },
  { rating: 'IP67', use: 'Underground cable joints, submersible pumps (temp)' },
  { rating: 'IP68', use: 'Permanently submerged equipment, pool lights' },
];

const solidOptions = Object.entries(SOLID_PROTECTION).map(([val, data]) => ({
  value: val,
  label: `${val} — ${data.short}`,
}));

const liquidOptions = Object.entries(LIQUID_PROTECTION).map(([val, data]) => ({
  value: val,
  label: `${val} — ${data.short}`,
}));

const NONE = 'none';

const additionalLetterOptions = [
  { value: NONE, label: 'None' },
  ...Object.entries(ADDITIONAL_LETTERS).map(([letter, desc]) => ({
    value: letter,
    label: `${letter} — ${desc}`,
  })),
];

/** Numeric level of a characteristic numeral, or null where it is 'X' (not specified). */
const digitLevel = (digit: string): number | null => {
  if (digit === '' || digit === 'X') return null;
  const n = parseInt(digit, 10);
  return Number.isNaN(n) ? null : n;
};

/**
 * Plain-English gloss of the first numeral.
 * FIX: the old gloss called first numeral 5 "dust-tight". BS EN 60529 5 is
 * dust-PROTECTED (limited ingress permitted); only 6 is dust-tight. It also
 * collapsed 0-2 into "basic contact", losing the 1 mm / 2.5 mm / 12.5 mm steps
 * that BS 7671 keys its IP2X / IP4X requirements off.
 */
const solidsGloss = (n: number | null): string =>
  n === null
    ? 'given no solid-object rating (X — not specified)'
    : n >= 6
      ? 'dust-tight'
      : n >= 5
        ? 'dust-protected (limited ingress permitted)'
        : n >= 4
          ? 'protected against wires and objects larger than 1.0 mm'
          : n >= 3
            ? 'protected against tools and objects larger than 2.5 mm'
            : n >= 2
              ? 'protected against fingers and objects larger than 12.5 mm'
              : n >= 1
                ? 'protected against objects larger than 50 mm'
                : 'unprotected against solid objects';

/**
 * Plain-English gloss of the second numeral.
 * FIX (audit finding): numerals 1-3 were all described as "light moisture".
 * BS EN 60529 second numeral 3 is protection against water SPRAY up to 60°
 * from vertical, which is materially more than "light moisture".
 */
const waterGloss = (n: number | null): string =>
  n === null
    ? 'given no water rating (X — not specified)'
    : n >= 9
      ? 'can withstand close-range high-pressure, high-temperature water jets'
      : n >= 8
        ? 'can withstand continuous immersion in water'
        : n >= 7
          ? 'can withstand temporary immersion in water (1 m for 30 minutes)'
          : n >= 6
            ? 'can withstand powerful water jets from any direction'
            : n >= 5
              ? 'can withstand water jets from any direction'
              : n >= 4
                ? 'can withstand splashing water from any direction'
                : n >= 3
                  ? 'can withstand water spray up to 60° from vertical'
                  : n >= 2
                    ? 'can withstand dripping water when tilted up to 15° from vertical'
                    : n >= 1
                      ? 'can withstand vertically falling drops of water'
                      : 'can withstand no water exposure';

/** Typical applications, null-safe for X-form codes. */
const typicalApplications = (solid: number | null, water: number | null): string[] => {
  if (solid === null || water === null) {
    return [
      'One axis of this code is unspecified — check the other axis against the requirement',
      'BS 7671 states most of its own minima in this form (IPX4, IP4X, IPXXD)',
    ];
  }
  if (water >= 7) {
    return [
      'Underground cable joints and submersible pumps',
      'Pool and fountain lighting — Reg 702.512.2 zone 0 requires IPX8',
      'Bath and shower zone 0 — Reg 701.512.2 requires IPX7',
    ];
  }
  if (solid >= 5 && water >= 5) {
    return ['External luminaires', 'Industrial wash-down areas', 'Exposed outdoor installations'];
  }
  if (solid >= 4 && water >= 4) {
    return [
      'Outdoor socket-outlets and weatherproof accessories (IP44 minimum)',
      'Accessories exposed to moisture — Reg 721.55.2.3',
      'Garden lighting',
    ];
  }
  return [
    'Indoor equipment in dry, sheltered positions',
    'Not sufficient for an outdoor or moisture-exposed position — those need IP44',
    'A readily accessible horizontal top surface still needs IPXXD or IP4X (Reg 416.2.2)',
  ];
};

/** Visual ring indicator for solid protection level (0-6) */
const SolidShield = ({ level }: { level: number }) => {
  const maxRings = 6;
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-16 h-16">
        {Array.from({ length: maxRings }).map((_, i) => {
          const ringIndex = maxRings - i;
          const size = 16 + ringIndex * 7;
          const filled = ringIndex <= level;
          return (
            <div
              key={i}
              className="absolute rounded-full border-2 transition-colors duration-300"
              style={{
                width: size,
                height: size,
                top: `calc(50% - ${size / 2}px)`,
                left: `calc(50% - ${size / 2}px)`,
                borderColor: filled ? config.gradientFrom : 'rgba(255,255,255,0.1)',
                backgroundColor: filled ? `${config.gradientFrom}10` : 'transparent',
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

/** Visual droplet indicator for liquid protection level (0-9) */
const LiquidShield = ({ level }: { level: number }) => {
  const maxLevel = 9;
  const fillPercent = (level / maxLevel) * 100;
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-10 h-16 overflow-hidden">
        {/* Droplet outline */}
        <svg viewBox="0 0 40 64" className="absolute inset-0 w-full h-full">
          <defs>
            <clipPath id="dropClip">
              <path d="M20 4 C20 4, 4 28, 4 40 C4 50, 11 60, 20 60 C29 60, 36 50, 36 40 C36 28, 20 4, 20 4Z" />
            </clipPath>
          </defs>
          {/* Fill */}
          <rect
            x="0"
            y={64 - (fillPercent * 56) / 100}
            width="40"
            height={(fillPercent * 56) / 100 + 4}
            fill={config.gradientFrom}
            opacity={level > 0 ? 0.3 : 0}
            clipPath="url(#dropClip)"
            className="transition-all duration-500"
          />
          {/* Outline */}
          <path
            d="M20 4 C20 4, 4 28, 4 40 C4 50, 11 60, 20 60 C29 60, 36 50, 36 40 C36 28, 20 4, 20 4Z"
            fill="none"
            stroke={level > 0 ? config.gradientFrom : 'rgba(255,255,255,0.15)'}
            strokeWidth="2"
            className="transition-colors duration-300"
          />
        </svg>
      </div>
    </div>
  );
};

const IPRatingCalculator = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const [solidDigit, setSolidDigit] = useState('');
  const [liquidDigit, setLiquidDigit] = useState('');
  const [additionalLetter, setAdditionalLetter] = useState(NONE);
  const [suppH, setSuppH] = useState(false);
  const [suppM, setSuppM] = useState(false);
  const [suppS, setSuppS] = useState(false);
  const [suppW, setSuppW] = useState(false);

  const [showGuidance, setShowGuidance] = useState(false);
  const [showReference, setShowReference] = useState(false);

  const result = useMemo(() => {
    if (solidDigit === '' || liquidDigit === '') return null;

    const solid = SOLID_PROTECTION[solidDigit];
    const liquid = LIQUID_PROTECTION[liquidDigit];
    if (!solid || !liquid) return null;

    const suppLetters: string[] = [];
    if (suppH) suppLetters.push('H');
    if (suppM) suppLetters.push('M');
    if (suppS) suppLetters.push('S');
    if (suppW) suppLetters.push('W');

    // BS EN 60529 code order: IP + solids + water + additional letter + supplementary letter
    const addLetter = additionalLetter !== NONE ? additionalLetter : '';
    const code = `IP${solidDigit}${liquidDigit}${addLetter}${suppLetters.join('')}`;

    // Determine suitability
    const solidNum = digitLevel(solidDigit);
    const liquidNum = digitLevel(liquidDigit);
    let suitability: 'pass' | 'warning' | 'fail' | 'info';
    let suitabilityLabel: string;

    if (solidNum === null || liquidNum === null) {
      // FIX: an X-form code (IPX4, IP4X) specifies only one axis — it cannot be
      // graded as suitable or unsuitable for a location on its own.
      suitability = 'info';
      suitabilityLabel = 'Partially specified';
    } else if (liquidNum >= 7) {
      // FIX (audit finding: IP07/IP17 fell through to "Indoor Only"): second
      // numeral 7/8 is the immersion band BS 7671 calls up for the most severe
      // water locations — Reg 701.512.2 zone 0 (IPX7) and Reg 702.512.2 zone 0
      // (IPX8). It is never an "indoor only" rating.
      suitability = solidNum >= 5 ? 'pass' : 'info';
      suitabilityLabel = liquidNum >= 8 ? 'Continuous immersion' : 'Temporary immersion';
    } else if (solidNum >= 5 && liquidNum >= 5) {
      suitability = 'pass';
      suitabilityLabel = 'Outdoor / Industrial';
    } else if (solidNum >= 4 && liquidNum >= 4) {
      // FIX (audit finding: outdoor pass was granted from first numeral >= 2,
      // so IP24 and IP34 earned a green badge). Every BS 7671 clause that sets
      // an outdoor / moisture-exposed minimum sets IP44, i.e. first numeral 4
      // (>= 1.0 mm): Reg 721.55.2.3 (accessories exposed to moisture),
      // Reg 705.512.2 (agricultural), Reg 709.553.1.8 (marinas socket-outlets),
      // Reg 740.512.2 (fairgrounds). IP24/IP34 do not meet any of them.
      suitability = 'pass';
      suitabilityLabel = 'Outdoor Suitable (IP44 minimum met)';
    } else if (liquidNum >= 1) {
      suitability = 'warning';
      suitabilityLabel = 'Indoor / Sheltered';
    } else {
      suitability = 'warning';
      suitabilityLabel = 'Indoor Only';
    }

    return {
      code,
      solid,
      liquid,
      addLetter,
      suppLetters,
      suitability,
      suitabilityLabel,
      solidNum,
      liquidNum,
    };
  }, [solidDigit, liquidDigit, additionalLetter, suppH, suppM, suppS, suppW]);

  const handleReset = useCallback(() => {
    setSolidDigit('');
    setLiquidDigit('');
    setAdditionalLetter(NONE);
    setSuppH(false);
    setSuppM(false);
    setSuppS(false);
    setSuppW(false);
  }, []);

  const handleCopy = () => {
    if (!result) return;
    const text = [
      `IP Rating: ${result.code}`,
      `Solid Protection (${solidDigit}): ${result.solid.description}`,
      `Liquid Protection (${liquidDigit}): ${result.liquid.description}`,
      ...(result.addLetter
        ? [`Additional letter ${result.addLetter} — ${ADDITIONAL_LETTERS[result.addLetter]}`]
        : []),
      ...(result.suppLetters.length > 0
        ? [
            `Supplementary: ${result.suppLetters.map((l) => `${l} — ${SUPPLEMENTARY_LETTERS[l]}`).join(', ')}`,
          ]
        : []),
      `Suitability: ${result.suitabilityLabel}`,
    ].join('\n');
    copyToClipboard(text).then((ok) => {
      if (ok) {
        setCopied(true);
        toast({ title: 'Copied to clipboard' });
        setTimeout(() => setCopied(false), 2000);
      }
    });
  };

  // Build the live IP code display string.
  // FIX (audit finding: placeholder was 'Y', giving "IP2Y"): BS EN 60529 uses
  // the letter X for BOTH omitted characteristic numerals — IP2X, IP4X, IPX4,
  // IPXXD. 'Y' is not an IP code character.
  const liveCode = `IP${solidDigit || 'X'}${liquidDigit || 'X'}`;
  const solidNum = digitLevel(solidDigit);
  const liquidNum = digitLevel(liquidDigit);

  // Current rating string for highlighting in common ratings
  const currentRating =
    solidDigit !== '' && liquidDigit !== '' ? `IP${solidDigit}${liquidDigit}` : '';

  return (
    <CalculatorCard
      category={CAT}
      title="IP Rating Decoder"
      description="Decode Ingress Protection ratings to BS EN 60529"
    >
      <CalculatorPanes
        form={
          <>
            {/* First Digit — Solid Protection */}
            <CalculatorSection title="Solid Object Protection">
              <CalculatorSelect
                label="First digit (0-6, or X if not specified)"
                value={solidDigit}
                onChange={setSolidDigit}
                options={solidOptions}
                placeholder="Select solid protection level"
                hint="Choose X to decode an IPX-form code such as IPX4 or IPX7"
              />
            </CalculatorSection>

            {/* Second Digit — Liquid Protection */}
            <CalculatorSection title="Liquid Protection">
              <CalculatorSelect
                label="Second digit (0-9, or X if not specified)"
                value={liquidDigit}
                onChange={setLiquidDigit}
                options={liquidOptions}
                placeholder="Select liquid protection level"
                hint="Choose X to decode an IP_X-form code such as IP2X or IP4X"
              />
            </CalculatorSection>

            {/* Additional letter — access to hazardous parts (BS EN 60529) */}
            <CalculatorSection title="Additional Letter (Optional)">
              <CalculatorSelect
                label="Access to hazardous parts"
                value={additionalLetter}
                onChange={setAdditionalLetter}
                options={additionalLetterOptions}
                placeholder="None"
                hint="BS 7671 uses these constantly — IPXXB (Reg 417.3.2), IPXXD (Regs 416.2.2, 740.526)"
              />
            </CalculatorSection>

            {/* Supplementary Letters */}
            <CalculatorSection title="Supplementary Letters (Optional)">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {Object.entries(SUPPLEMENTARY_LETTERS).map(([letter, desc]) => {
                  const checked =
                    letter === 'H'
                      ? suppH
                      : letter === 'M'
                        ? suppM
                        : letter === 'S'
                          ? suppS
                          : suppW;
                  const setter =
                    letter === 'H'
                      ? setSuppH
                      : letter === 'M'
                        ? setSuppM
                        : letter === 'S'
                          ? setSuppS
                          : setSuppW;

                  return (
                    <label
                      key={letter}
                      className={cn(
                        'flex items-center gap-3 p-3.5 rounded-lg cursor-pointer min-h-[44px] touch-manipulation transition-all',
                        checked
                          ? 'bg-white/10 border-2'
                          : 'bg-white/5 border border-white/10 hover:bg-white/[0.07]'
                      )}
                      style={checked ? { borderColor: config.gradientFrom } : undefined}
                    >
                      <div
                        className={cn(
                          'flex items-center justify-center h-5 w-5 rounded border-2 shrink-0 transition-all',
                          checked ? 'border-transparent' : 'border-white/20 bg-white/10'
                        )}
                        style={checked ? { backgroundColor: config.gradientFrom } : undefined}
                      >
                        {checked && <Check className="h-3.5 w-3.5 text-black" />}
                      </div>
                      <div>
                        <span className="text-sm font-medium text-white">{letter}</span>
                        <p className="text-xs text-white">{desc}</p>
                      </div>
                    </label>
                  );
                })}
              </div>
            </CalculatorSection>

            {/* ── Live IP Shield Visual ── */}
            {(solidDigit !== '' || liquidDigit !== '') && (
              <div
                className="rounded-xl p-4 border transition-all"
                style={{
                  borderColor: `${config.gradientFrom}20`,
                  background: `${config.gradientFrom}08`,
                }}
              >
                <div className="flex items-center justify-between gap-4">
                  {/* Left — solid rings */}
                  <div className="flex flex-col items-center gap-1.5">
                    <SolidShield level={solidNum ?? 0} />
                    <span className="text-xs text-white font-medium">Solids</span>
                    {solidDigit !== '' && (
                      <span className="text-xs text-white">
                        {SOLID_PROTECTION[solidDigit]?.short}
                      </span>
                    )}
                  </div>

                  {/* Centre — live IP code */}
                  <div className="text-center flex-1">
                    <p className="text-3xl font-bold tracking-tight text-elec-yellow sm:text-4xl">
                      {liveCode}
                    </p>
                    <p className="text-xs text-white mt-1">BS EN 60529</p>
                  </div>

                  {/* Right — liquid droplet */}
                  <div className="flex flex-col items-center gap-1.5">
                    <LiquidShield level={liquidNum ?? 0} />
                    <span className="text-xs text-white font-medium">Liquids</span>
                    {liquidDigit !== '' && (
                      <span className="text-xs text-white">
                        {LIQUID_PROTECTION[liquidDigit]?.short}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Reset button (standalone — no dead Calculate button) */}
            {(solidDigit !== '' || liquidDigit !== '') && (
              <button
                onClick={handleReset}
                className="w-full h-11 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-white hover:bg-white/10 transition-colors touch-manipulation"
              >
                Reset
              </button>
            )}
          </>
        }
        result={
          <>
            {/* ── Results ── */}
            {result && (
              <div className="space-y-4 animate-fade-in">
                {/* Status + Copy */}
                <div className="flex items-center justify-between">
                  <ResultBadge status={result.suitability} label={result.suitabilityLabel} />
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-medium transition-colors touch-manipulation min-h-[44px]"
                  >
                    {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>

                <ResultHeadline
                  label="IP rating"
                  value={result.code}
                  caption="BS EN 60529 — ingress protection."
                />

                {/* Protection details */}
                <ResultsGrid columns={2}>
                  <ResultValue
                    label="Solid Protection"
                    value={result.solid.short}
                    category={CAT}
                    size="sm"
                  />
                  <ResultValue
                    label="Liquid Protection"
                    value={result.liquid.short}
                    category={CAT}
                    size="sm"
                  />
                </ResultsGrid>

                {/* Detailed descriptions */}
                <div className="space-y-2">
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <p className="text-xs text-white font-medium mb-1">
                      First Digit ({solidDigit}) — Solids
                    </p>
                    <p className="text-sm text-white">{result.solid.description}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <p className="text-xs text-white font-medium mb-1">
                      Second Digit ({liquidDigit}) — Liquids
                    </p>
                    <p className="text-sm text-white">{result.liquid.description}</p>
                  </div>
                </div>

                {/* Additional letter — access to hazardous parts */}
                {result.addLetter && (
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-1">
                    <p className="text-xs text-white font-medium">
                      Additional Letter — Access to Hazardous Parts
                    </p>
                    <p className="text-sm text-white">
                      <span className="font-medium">{result.addLetter}:</span>{' '}
                      {ADDITIONAL_LETTERS[result.addLetter]}
                    </p>
                  </div>
                )}

                {/* Supplementary letters */}
                {result.suppLetters.length > 0 && (
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-1">
                    <p className="text-xs text-white font-medium">Supplementary Letters</p>
                    {result.suppLetters.map((letter) => (
                      <p key={letter} className="text-sm text-white">
                        <span className="font-medium">{letter}:</span>{' '}
                        {SUPPLEMENTARY_LETTERS[letter]}
                      </p>
                    ))}
                  </div>
                )}

                <CalculatorDivider category={CAT} />

                {/* ── What This Means ── */}
                <Collapsible open={showGuidance} onOpenChange={setShowGuidance}>
                  <CollapsibleTrigger className="calculator-collapsible-trigger w-full">
                    <span>What This Means</span>
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 text-white transition-transform duration-200',
                        showGuidance && 'rotate-180'
                      )}
                    />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-2">
                    <div
                      className="p-3 rounded-xl border space-y-3"
                      style={{
                        borderColor: `${config.gradientFrom}15`,
                        background: `${config.gradientFrom}05`,
                      }}
                    >
                      <p className="text-sm text-white">
                        An <span className="font-medium">{result.code}</span> rated enclosure is{' '}
                        {solidsGloss(result.solidNum)} and {waterGloss(result.liquidNum)}.
                      </p>
                      <div className="space-y-1">
                        <p className="text-sm text-white font-medium">Typical Applications</p>
                        <ul className="space-y-1">
                          {typicalApplications(result.solidNum, result.liquidNum).map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-white">
                              <span
                                className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                                style={{ backgroundColor: config.gradientFrom }}
                              />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                {/* ── Common Ratings Reference ── */}
                <Collapsible open={showReference} onOpenChange={setShowReference}>
                  <CollapsibleTrigger className="calculator-collapsible-trigger w-full">
                    <span>Common IP Ratings</span>
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 text-white transition-transform duration-200',
                        showReference && 'rotate-180'
                      )}
                    />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-2">
                    <div
                      className="p-3 rounded-xl border space-y-2"
                      style={{
                        borderColor: `${config.gradientFrom}15`,
                        background: `${config.gradientFrom}05`,
                      }}
                    >
                      <ul className="space-y-2">
                        {COMMON_RATINGS.map((item) => {
                          const isCurrentRating = currentRating === item.rating;
                          return (
                            <li
                              key={item.rating}
                              className={cn(
                                'flex items-start gap-2 text-sm rounded-lg p-2 -mx-1 transition-colors',
                                isCurrentRating ? 'bg-white/10' : ''
                              )}
                              style={
                                isCurrentRating
                                  ? { outline: `1px solid ${config.gradientFrom}40` }
                                  : undefined
                              }
                            >
                              <span
                                className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                                style={{ backgroundColor: config.gradientFrom }}
                              />
                              <span className="text-white">
                                <span className="font-medium">{item.rating}:</span> {item.use}
                                {isCurrentRating && (
                                  <span
                                    className="ml-2 text-xs font-medium px-1.5 py-0.5 rounded"
                                    style={{
                                      backgroundColor: `${config.gradientFrom}20`,
                                      color: config.gradientFrom,
                                    }}
                                  >
                                    Current
                                  </span>
                                )}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                      <p className="text-xs text-white pt-2 border-t border-white/10">
                        BS EN 60529 defines the IP code. Always check manufacturer specifications
                        for exact conditions.
                      </p>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            )}

            {/* Formula reference (always visible) */}
            <FormulaReference
              category={CAT}
              name="IP Code Format"
              formula="IP [Solids 0-6 or X] [Water 0-9 or X] [Additional A-D] [Supplementary H/M/S/W]"
              variables={[
                { symbol: 'IP', description: 'Ingress Protection prefix' },
                {
                  symbol: '1st',
                  description: 'First characteristic numeral — solid objects / access (0-6, or X)',
                },
                {
                  symbol: '2nd',
                  description: 'Second characteristic numeral — water ingress (0-9, or X)',
                },
                {
                  symbol: 'Add.',
                  description:
                    'Additional letter A-D — access to hazardous parts (BS 7671 uses IPXXB and IPXXD)',
                },
                {
                  symbol: 'Supp.',
                  description: 'Supplementary letter H, M, S or W — equipment-specific information',
                },
                {
                  symbol: 'X',
                  description:
                    'Stands in for a numeral that is not specified — used for BOTH positions (IP2X, IPX4, IPXXD)',
                },
              ]}
            />
          </>
        }
        footer={<CalculatorEditorial content={ipRatingContent} category={CAT} />}
      />
    </CalculatorCard>
  );
};

export default IPRatingCalculator;
