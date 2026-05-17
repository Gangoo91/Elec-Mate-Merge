#!/usr/bin/env node

/**
 * Discover candidate SEO page ↔ in-app calculator mappings.
 *
 * Strategy:
 *  - For every SEO page file in src/pages/seo/, derive the bare component
 *    name (strip "Page" suffix).
 *  - Look for a matching .tsx file in known calculator folders.
 *  - Filename match (exact) gets a confidence of "high".
 *  - Fuzzy match (after stripping common stop-words like Calc/Equation/Tool)
 *    gets "medium".
 *
 * Output: reports/seo-audit/calc-map.json — list of { sourceFile,
 * slug, componentName, componentImportPath, confidence, alreadyImported }.
 *
 * High-confidence entries can be auto-patched. Medium need human review.
 */

import { readFileSync, readdirSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadRouteMap } from './extract.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');
const SEO_DIR = join(ROOT, 'src/pages/seo');
const CALC_DIRS = [
  'src/components/apprentice/calculators',
  'src/components/upskilling/calculators',
  'src/components/calculators',
  'src/components/electrician-tools/calculators',
];

// ---------------------------------------------------------------------------
// 1. Index every calculator component on disk
// ---------------------------------------------------------------------------
const calcIndex = new Map(); // componentName → importPath
for (const dir of CALC_DIRS) {
  const full = join(ROOT, dir);
  if (!existsSync(full)) continue;
  const files = readdirSync(full).filter((f) => f.endsWith('.tsx'));
  for (const f of files) {
    const name = f.replace(/\.tsx$/, '');
    // Skip non-calculator helpers
    if (['CalculatorManager', 'CalculatorDataManager', 'CalculatorEducationalContent',
         'EnhancedCalculatorInterface', 'CalculatorSelector', 'CalculationReport',
         'StandardsReference', 'ValidationIndicator', 'EnhancedValidationIndicator',
         'SimpleValidationIndicator', 'ComingSoonCalculator'].includes(name)) {
      continue;
    }
    if (!calcIndex.has(name)) {
      calcIndex.set(name, `@/${dir}/${name}`);
    }
  }
}

console.log(`[calc-map] indexed ${calcIndex.size} calculator components`);

// ---------------------------------------------------------------------------
// 2. Normalisation helpers
// ---------------------------------------------------------------------------
function normalisePageName(fileName) {
  // 'VoltageDropCalculatorPage.tsx' → 'voltagedropcalculator'
  return fileName
    .replace(/\.tsx$/, '')
    .replace(/Page$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
}

function normaliseCompName(name) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '');
}

// Build a normalised index for fuzzy matching
const normalisedIndex = new Map(); // normalised → componentName
for (const name of calcIndex.keys()) {
  normalisedIndex.set(normaliseCompName(name), name);
}

// Common stop-words to strip during fuzzy matching
const STOP_WORDS = ['calculator', 'calc', 'equation', 'tool', 'app', 'guide', 'page'];
function stripStopWords(s) {
  let out = s;
  for (const w of STOP_WORDS) {
    out = out.replace(new RegExp(w, 'g'), '');
  }
  return out;
}

// Manual semantic overrides — SEO slug → component name. Use when neither
// exact nor fuzzy match works because the page name and component name use
// different terminology for the same concept.
const SEMANTIC_OVERRIDES = new Map([
  ['earth-loop-impedance-calculator', 'EarthFaultLoopCalculator'],
  ['earth-fault-loop-impedance-calculator', 'EarthFaultLoopCalculator'],
  ['ohms-law-calculator', 'OhmsLawCalculator'],
  ['ohms-calculator', 'OhmsCalculator'],
  ['prospective-fault-current-calculator', 'PFCCalculator'],
  ['pfc-calculator', 'PFCCalculator'],
  ['fault-current-calculator', 'FaultLevelCalculator'],
  ['max-demand-calculator', 'MaximumDemandCalculator'],
  ['maximum-demand-calculator', 'MaximumDemandCalculator'],
  ['zs-calculator', 'ZsValuesCalculator'],
  ['zs-values-calculator', 'ZsValuesCalculator'],
  ['zs-lookup-calculator', 'BS7671ZsLookupCalculator'],
  ['r1-r2-calculator', 'R1R2Calculator'],
  ['cable-current-capacity-calculator', 'CableCurrentCapacityCalculator'],
  ['arc-flash-calculator', 'ArcFlashCalculator'],
  ['arc-flash-protection-calculator', 'ArcFlashCalculator'],
  ['ev-charger-load-calculator', 'EVSELoadCalculator'],
  ['evse-load-calculator', 'EVSELoadCalculator'],
  ['solar-array-calculator', 'SolarArrayCalculator'],
  ['solar-pv-calculator', 'SolarPVCalculator'],
  ['rcd-trip-time-calculator', 'RCDTripTimeCalculator'],
  ['rcd-discrimination-calculator', 'RCDDiscriminationCalculator'],
  ['load-calculator', 'LoadCalculator'],
  ['transformer-calculator', 'TransformerCalculator'],
  ['transformer-sizing-calculator', 'TransformerCalculator'],
  ['heat-pump-calculator', 'HeatPumpCalculator'],
  ['lumen-calculator', 'LumenCalculator'],
  ['lighting-calculator', 'LumenCalculator'],
  ['battery-storage-calculator', 'BatteryStorageCalculator'],
  ['ev-charging-calculator', 'EVChargingCalculator'],
  ['generator-sizing-calculator', 'GeneratorSizingCalculator'],
  ['emergency-lighting-calculator', 'EmergencyLightingCalculator'],
  ['feed-in-tariff-calculator', 'FeedInTariffCalculator'],
  ['energy-cost-calculator', 'EnergyCostCalculator'],
  ['unit-converter', 'UnitConverterCalculator'],
  ['resistor-colour-code-calculator', 'ResistorColourCodeCalculator'],
  ['phase-rotation-calculator', 'PhaseRotationCalculator'],
  ['star-delta-calculator', 'StarDeltaCalculator'],
  ['motor-starting-current-calculator', 'MotorStartingCurrentCalculator'],
  ['circuit-breaker-sizing-calculator', 'CircuitBreakerSelectorCalculator'],
  ['selectivity-calculator', 'SelectivityCalculator'],
  ['discrimination-calculator', 'SelectivityCalculator'],
  ['off-grid-system-calculator', 'OffGridSystemCalculator'],
  ['micro-hydro-calculator', 'MicroHydroCalculator'],
  ['wind-power-calculator', 'WindPowerCalculator'],
  ['wire-gauge-calculator', 'WireGaugeCalculator'],
  ['ip-rating-calculator', 'IPRatingCalculator'],
  ['touch-step-voltage-calculator', 'TouchStepVoltageCalculator'],
  ['lightning-protection-calculator', 'LightningProtectionCalculator'],
  ['marine-electrical-calculator', 'MarineElectricalCalculator'],
  ['swimming-pool-calculator', 'SwimmingPoolCalculator'],
  ['data-centre-calculator', 'DataCentreCalculator'],
  ['power-quality-calculator', 'PowerQualityCalculator'],
  ['power-factor-correction-calculator', 'PowerFactorCorrectionCalculator'],
  ['instrumentation-calculator', 'InstrumentationCalculator'],
  ['led-driver-calculator', 'LEDDriverCalculator'],
  ['ac-power-calculator', 'ACPowerCalculator'],
  ['basic-ac-circuit-calculator', 'BasicACCircuitCalculator'],
  ['three-phase-power-calculator', 'ThreePhasePowerCalculator'],
  ['three-phase-calculator', 'ThreePhasePowerCalculator'],
  ['conduit-bending-calculator', 'ConduitBendingCalculator'],
  ['trunking-size-calculator', 'TrunkingSizeCalculator'],
  ['trunking-fill-calculator', 'TrunkingSizeCalculator'],
  ['cable-derating-calculator', 'CableDeratingCalculator'],
  ['efficiency-calculator', 'EfficiencyCalculator'],
  ['power-calculator', 'PowerCalculator'],
  ['resistance-calculator', 'ResistanceCalculator'],
  ['series-parallel-calculator', 'SeriesParallelCalculators'],
  ['time-materials-calculator', 'TimeMaterialsCalculator'],
  ['adiabatic-equation-calculator', 'AdiabaticCalculator'],
  ['grid-tie-inverter-calculator', 'GridTieInverterCalculator'],
]);

// Token-based Jaccard similarity for fuzzy matching when neither exact nor
// stop-word match works.
function tokenise(s) {
  return new Set(
    s
      .replace(/[A-Z]/g, (c) => '-' + c.toLowerCase())
      .replace(/[^a-z0-9]+/g, '-')
      .split('-')
      .filter((t) => t && !STOP_WORDS.includes(t) && t.length > 1),
  );
}

function jaccard(a, b) {
  if (a.size === 0 || b.size === 0) return 0;
  let intersection = 0;
  for (const x of a) if (b.has(x)) intersection++;
  const union = a.size + b.size - intersection;
  return intersection / union;
}

// ---------------------------------------------------------------------------
// 3. Walk every SEO page, look for matches
// ---------------------------------------------------------------------------
const { fileToSlug } = loadRouteMap(join(ROOT, 'src/routes/SEORoutes.tsx'));
const seoFiles = readdirSync(SEO_DIR).filter((f) => f.endsWith('.tsx'));
const mappings = [];
let highMatches = 0;
let mediumMatches = 0;
let unmatched = 0;

for (const file of seoFiles) {
  const sourceFile = `src/pages/seo/${file}`;
  const slug = fileToSlug.get(sourceFile);
  const normalisedPage = normalisePageName(file);

  // 3a. Exact match (case + symbols stripped)
  let match = normalisedIndex.get(normalisedPage);
  let confidence = match ? 'high' : null;

  // 3b. Stop-word stripped match
  if (!match) {
    const pageBase = stripStopWords(normalisedPage);
    for (const [normComp, compName] of normalisedIndex.entries()) {
      const compBase = stripStopWords(normComp);
      if (pageBase && compBase && pageBase === compBase) {
        match = compName;
        confidence = 'medium';
        break;
      }
    }
  }

  // 3c. Semantic override (manual mapping)
  if (!match && slug) {
    const slugKey = slug.replace(/^\/(tools|guides|compare|training)\//, '').replace(/^\//, '');
    const override = SEMANTIC_OVERRIDES.get(slugKey);
    if (override && calcIndex.has(override)) {
      match = override;
      confidence = 'medium';
    }
  }

  // 3d. Token-Jaccard fuzzy — only for pages that look calc-y to avoid
  // false positives on guides. Threshold tuned to 0.75 (high overlap).
  if (!match && (file.toLowerCase().includes('calculator') || file.toLowerCase().includes('calc'))) {
    const pageTokens = tokenise(file.replace(/\.tsx$/, '').replace(/Page$/, ''));
    let bestScore = 0;
    let bestName = null;
    for (const compName of calcIndex.keys()) {
      const compTokens = tokenise(compName);
      const score = jaccard(pageTokens, compTokens);
      if (score > bestScore) {
        bestScore = score;
        bestName = compName;
      }
    }
    if (bestScore >= 0.75 && bestName) {
      match = bestName;
      confidence = 'low';
    }
  }

  if (!match) {
    unmatched++;
    continue;
  }

  // Check if already imported
  const src = readFileSync(join(ROOT, sourceFile), 'utf-8');
  const alreadyImported = new RegExp(`\\b${match}\\b`).test(src);

  mappings.push({
    sourceFile,
    slug: slug || null,
    pageFile: file,
    componentName: match,
    componentImportPath: calcIndex.get(match),
    confidence,
    alreadyImported,
  });

  if (confidence === 'high') highMatches++;
  else mediumMatches++;
}

const reportDir = join(ROOT, 'reports', 'seo-audit');
mkdirSync(reportDir, { recursive: true });
writeFileSync(
  join(reportDir, 'calc-map.json'),
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      totals: {
        seoFiles: seoFiles.length,
        calculatorComponents: calcIndex.size,
        highConfidence: highMatches,
        mediumConfidence: mediumMatches,
        unmatched,
      },
      mappings,
    },
    null,
    2,
  ),
  'utf-8',
);

console.log(`\n[calc-map] SEO files:           ${seoFiles.length}`);
console.log(`[calc-map] Calc components:     ${calcIndex.size}`);
console.log(`[calc-map] High-conf matches:   ${highMatches}`);
console.log(`[calc-map] Medium-conf matches: ${mediumMatches}`);
console.log(`[calc-map] Unmatched:           ${unmatched}`);
console.log(`[calc-map] Output: reports/seo-audit/calc-map.json`);

// Print a sample
console.log('\nSample high-confidence mappings:');
mappings
  .filter((m) => m.confidence === 'high' && !m.alreadyImported)
  .slice(0, 15)
  .forEach((m) => {
    console.log(`  ${m.slug || '(orphan)'}  →  ${m.componentName}`);
  });
