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
  CALCULATOR_CONFIG,
} from '@/components/calculators/shared';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const CAT = 'utilities' as const;
const config = CALCULATOR_CONFIG[CAT];

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
};

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
};

const SUPPLEMENTARY_LETTERS: Record<string, string> = {
  H: 'High voltage equipment',
  M: 'Device moving during water test',
  S: 'Device stationary during water test',
  W: 'Suitable for specified weather conditions',
};

const COMMON_RATINGS: { rating: string; use: string }[] = [
  { rating: 'IP20', use: 'Indoor consumer units, distribution boards' },
  { rating: 'IP44', use: 'Outdoor socket outlets, weatherproof accessories' },
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

    const code = `IP${solidDigit}${liquidDigit}${suppLetters.join('')}`;

    // Determine suitability
    const solidNum = parseInt(solidDigit);
    const liquidNum = parseInt(liquidDigit);
    let suitability: 'pass' | 'warning' | 'fail';
    let suitabilityLabel: string;

    if (solidNum >= 5 && liquidNum >= 5) {
      suitability = 'pass';
      suitabilityLabel = 'Outdoor / Industrial';
    } else if (solidNum >= 2 && liquidNum >= 4) {
      suitability = 'pass';
      suitabilityLabel = 'Outdoor Suitable';
    } else if (liquidNum >= 1 && liquidNum <= 3) {
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
      suppLetters,
      suitability,
      suitabilityLabel,
      solidNum,
      liquidNum,
    };
  }, [solidDigit, liquidDigit, suppH, suppM, suppS, suppW]);

  const handleReset = useCallback(() => {
    setSolidDigit('');
    setLiquidDigit('');
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
      ...(result.suppLetters.length > 0
        ? [
            `Supplementary: ${result.suppLetters.map((l) => `${l} — ${SUPPLEMENTARY_LETTERS[l]}`).join(', ')}`,
          ]
        : []),
      `Suitability: ${result.suitabilityLabel}`,
    ].join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({ title: 'Copied to clipboard' });
    setTimeout(() => setCopied(false), 2000);
  };

  // Build the live IP code display string
  const liveCode = `IP${solidDigit || 'X'}${liquidDigit || 'Y'}`;
  const solidNum = solidDigit !== '' ? parseInt(solidDigit) : -1;
  const liquidNum = liquidDigit !== '' ? parseInt(liquidDigit) : -1;

  // Current rating string for highlighting in common ratings
  const currentRating =
    solidDigit !== '' && liquidDigit !== '' ? `IP${solidDigit}${liquidDigit}` : '';

  return (
    <CalculatorCard
      category={CAT}
      title="IP Rating Decoder"
      description="Decode Ingress Protection ratings to BS EN 60529"
    >
      {/* First Digit — Solid Protection */}
      <CalculatorSection title="Solid Object Protection">
        <CalculatorSelect
          label="First Digit (0-6)"
          value={solidDigit}
          onChange={setSolidDigit}
          options={solidOptions}
          placeholder="Select solid protection level"
        />
      </CalculatorSection>

      {/* Second Digit — Liquid Protection */}
      <CalculatorSection title="Liquid Protection">
        <CalculatorSelect
          label="Second Digit (0-9)"
          value={liquidDigit}
          onChange={setLiquidDigit}
          options={liquidOptions}
          placeholder="Select liquid protection level"
        />
      </CalculatorSection>

      {/* Supplementary Letters */}
      <CalculatorSection title="Supplementary Letters (Optional)">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {Object.entries(SUPPLEMENTARY_LETTERS).map(([letter, desc]) => {
            const checked =
              letter === 'H' ? suppH : letter === 'M' ? suppM : letter === 'S' ? suppS : suppW;
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
              <SolidShield level={solidNum >= 0 ? solidNum : 0} />
              <span className="text-xs text-white font-medium">Solids</span>
              {solidNum >= 0 && (
                <span className="text-xs text-white">{SOLID_PROTECTION[solidDigit]?.short}</span>
              )}
            </div>

            {/* Centre — live IP code */}
            <div className="text-center flex-1">
              <p
                className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                }}
              >
                {liveCode}
              </p>
              <p className="text-xs text-white mt-1">BS EN 60529</p>
            </div>

            {/* Right — liquid droplet */}
            <div className="flex flex-col items-center gap-1.5">
              <LiquidShield level={liquidNum >= 0 ? liquidNum : 0} />
              <span className="text-xs text-white font-medium">Liquids</span>
              {liquidNum >= 0 && (
                <span className="text-xs text-white">{LIQUID_PROTECTION[liquidDigit]?.short}</span>
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

          {/* Hero value */}
          <div className="text-center py-3">
            <p className="text-sm font-medium text-white mb-1">IP Rating</p>
            <p
              className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
              }}
            >
              {result.code}
            </p>
            <p className="text-sm text-white mt-2">BS EN 60529 Ingress Protection</p>
          </div>

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

          {/* Supplementary letters */}
          {result.suppLetters.length > 0 && (
            <div className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-1">
              <p className="text-xs text-white font-medium">Supplementary Letters</p>
              {result.suppLetters.map((letter) => (
                <p key={letter} className="text-sm text-white">
                  <span className="font-medium">{letter}:</span> {SUPPLEMENTARY_LETTERS[letter]}
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
                  {result.solidNum >= 5
                    ? 'dust-tight'
                    : result.solidNum >= 3
                      ? 'protected against small objects'
                      : 'protected against basic contact'}{' '}
                  and can withstand{' '}
                  {result.liquidNum >= 7
                    ? 'immersion in water'
                    : result.liquidNum >= 5
                      ? 'water jets from any direction'
                      : result.liquidNum >= 4
                        ? 'splashing water'
                        : result.liquidNum >= 1
                          ? 'light moisture'
                          : 'no water exposure'}
                  .
                </p>
                <div className="space-y-1">
                  <p className="text-sm text-white font-medium">Typical Applications</p>
                  <ul className="space-y-1">
                    {(result.solidNum >= 6 && result.liquidNum >= 7
                      ? [
                          'Underground cable joints',
                          'Submersible pumps',
                          'Pool and fountain lighting',
                        ]
                      : result.solidNum >= 5 && result.liquidNum >= 5
                        ? [
                            'External luminaires',
                            'Industrial wash-down areas',
                            'Exposed outdoor installations',
                          ]
                        : result.liquidNum >= 4
                          ? [
                              'Outdoor socket outlets',
                              'Weatherproof accessories',
                              'Garden lighting',
                            ]
                          : [
                              'Indoor distribution boards',
                              'Consumer units',
                              'Office equipment enclosures',
                            ]
                    ).map((item, i) => (
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
                  BS EN 60529 defines the IP code. Always check manufacturer specifications for
                  exact conditions.
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
        formula="IP [Solids 0-6] [Liquids 0-9] [Optional letter]"
        variables={[
          { symbol: 'IP', description: 'Ingress Protection prefix' },
          { symbol: '1st', description: 'Solid object protection (0-6)' },
          { symbol: '2nd', description: 'Liquid ingress protection (0-9)' },
          { symbol: 'Letter', description: 'Optional: H, M, S, or W' },
        ]}
      />
    </CalculatorCard>
  );
};

export default IPRatingCalculator;
