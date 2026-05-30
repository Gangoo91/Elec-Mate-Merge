import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
  Pullquote,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm9s3-not-section-551',
    question:
      'Why is solar thermal NOT a Section 551 generating set?',
    options: [
      'Random rule',
      'Section 551 governs ELECTRICAL generating sets — Reg 551.1.1 lists power sources that generate electricity (PV, batteries, turbines, combustion engines). Solar thermal generates HEAT, not electricity — no electrical generation, no export, no anti-islanding consideration. But solar thermal still has real electrical install scope: differential-temperature controller, circulation pumps, sensors, drainback / pressurised system electrical elements. Reg 314 + Reg 415.1 + Reg 522.2.1 apply',
      'No regulations',
      'It is generation',
    ],
    correctIndex: 1,
    explanation:
      'Section 551 of BS 7671 specifically governs electrical generating sets (Reg 551.1.1: combustion engines, turbines, electric motors, PV cells, batteries, other suitable sources — all producing electricity). Solar thermal is fundamentally different: solar irradiance → collector absorber → heat transfer fluid (water or water/glycol) → cylinder coil → DHW. NO electrical generation. NO grid export. NO anti-islanding consideration (nothing to disconnect). However, solar thermal install HAS real electrical install scope: (1) differential-temperature controller (compares collector vs cylinder temperature, starts/stops pump); (2) circulation pump(s) (typically 40-100 W single-phase, AC mains or DC from PV); (3) temperature sensors at collector + cylinder + outlet; (4) drainback / pressurised system electrical elements (pressure sensor, expansion vessel monitoring); (5) freeze protection (glycol antifreeze monitoring, or controller-managed dump cycle). BS 7671 framework applies to this electrical scope: Reg 314 dedicated controls way (or shared low-current way) + Reg 411.4 ADS + Reg 415.1 30 mA RCD + Reg 522.2.1 cable thermal protection (cable near hot pipework — solar primary flow can reach 90+ °C in summer stagnation).',
  },
  {
    id: 'm9s3-collector-types',
    question:
      'Flat plate vs evacuated tube solar thermal collectors — what are the differences?',
    options: [
      'Same',
      'Flat plate: rectangular panel with metal absorber under glass cover; lower-cost, robust, lower thermal efficiency in cold conditions, suits UK retrofit common. Evacuated tube: parallel glass tubes with vacuum insulation around absorber; higher thermal efficiency especially in cold / low-irradiance conditions; higher cost; better for UK climate when good-quality. Both are solar thermal — both use the same controller / pump / cylinder architecture',
      'Random',
      'Flat plate is new',
    ],
    correctIndex: 1,
    explanation:
      'Flat plate solar thermal collector: rectangular panel typically 1.5-2.5 m² with metal absorber (copper or aluminium, selectively coated to absorb solar irradiance + minimise re-radiation) under a transparent cover (low-iron glass); insulated rear. Heat transfer fluid flows through absorber pipes. Lower-cost, robust, typical UK 2025-26 cost £400-700 per panel. Lower thermal efficiency in cold + low-irradiance conditions (winter / cloudy days) due to heat loss through cover. Evacuated tube collector: parallel rows of glass tubes (typically 8-30 tubes per panel); inner absorber in vacuum-insulated tube → very low heat loss. Higher thermal efficiency across all conditions, especially cold + low-irradiance. Higher cost (£700-1,500 per equivalent panel). Better suits UK climate (frequent overcast / cold conditions). UK 2025-26 market: both still installed; evacuated tube preferred for performance, flat plate for cost-sensitive installs. Electrical install scope identical between types — same controller, pump, sensors, cylinder. BS EN 12975 (flat plate) + BS EN 12976 (factory-made solar heating systems) product standards.',
  },
  {
    id: 'm9s3-differential-controller',
    question:
      'How does the differential-temperature controller work?',
    options: [
      'Random',
      'Two temperature sensors — one at collector outlet (T1), one at cylinder coil (T2). Controller compares T1 vs T2. When T1 > T2 + delta-T threshold (typically 6-8 K), controller activates circulation pump to transfer heat from collector to cylinder. When T1-T2 drops to delta-T off (typically 2-4 K), controller stops pump. Also monitors over-temperature shutdown (cylinder reaches setpoint or collector overheats — stagnation protection)',
      'Customer manual',
      'Always on',
    ],
    correctIndex: 1,
    explanation:
      'Differential-temperature controller (DTC) is the brain of the solar thermal install. Logic: (1) T1 sensor at collector outlet / absorber — reads solar-heated fluid temperature; (2) T2 sensor at cylinder coil bottom / inlet — reads cylinder coil receiving temperature; (3) Controller compares T1 vs T2: when T1 > T2 + delta-T_on (typically 6-8 K — adjustable per manufacturer), activates circulation pump → heat transfers from collector to cylinder; (4) When T1-T2 drops to delta-T_off (typically 2-4 K), deactivates pump → prevents reverse circulation (cylinder cooling back to collector at night / shaded conditions); (5) Over-temperature shutdown — pump stops if cylinder reaches setpoint (typically 60-70 °C) OR if collector exceeds stagnation threshold (typically 130-150 °C — protects glycol fluid from degradation); (6) Drainback systems use the pump shutdown to automatically drain water back to a reservoir, preventing freezing. UK 2025-26 typical controllers: Resol DeltaSol BS / SLM / DL, SUN-LITE, Steca TR. Mains-powered (230 V AC, low current ~20-50 mA standby + pump load when active). Cert evidence bundle records controller model + sensor placements + delta-T settings + functional test.',
  },
  {
    id: 'm9s3-pv-direct-pump',
    question:
      'Some solar thermal systems use a PV-direct DC circulation pump — what is this + why?',
    options: [
      'Not real',
      'A small PV panel (typically 20-50 W) directly powers a DC circulation pump via a controller — no AC supply needed for the pump. Solar irradiance drives the pump (more sun = more pumping = more heat transfer); naturally self-regulating. Eliminates the need for AC supply + reduces install electrical scope (still need DTC if temperature differential is the trigger; some systems use simpler PV-direct without DTC). UK 2025-26 emerging architecture for off-grid + simpler installs',
      'Random',
      'Not allowed',
    ],
    correctIndex: 1,
    explanation:
      'PV-direct solar thermal architecture (sometimes called SolThermal / solar-powered solar thermal): small PV panel (typically 20-50 W single panel, mounted alongside the thermal collectors or separately) directly powers a DC circulation pump. Architecture: (1) PV panel produces DC when sun is shining (no AC supply needed); (2) DC powers the circulation pump (typically 10-30 W DC pump rated for solar-direct use, e.g. Solartwin, El-Sid); (3) Differential-temperature controller may still be used (powered by the same PV or a small battery / supercapacitor) OR simpler systems use the PV irradiance itself as the trigger (no DTC — pump runs whenever PV produces sufficient power). Advantages: no AC supply needed (off-grid friendly), naturally self-regulating (more sun = more pumping = more heat), simpler install. Limitations: pump performance varies with irradiance (lower flow on cloudy days); limited capability for complex controls. UK 2025-26 emerging architecture — niche but growing for off-grid + simple-install scenarios. Electrical install scope reduces to mounting + DC wiring (no AC dedicated circuit needed) but BS 7671 still applies to any AC immersion / cylinder elements + the DTC if AC-powered. Cert evidence bundle records the architecture variant + components.',
  },
];

const quizQuestions = [
  {
    question:
      'Standard UK 2025-26 solar thermal install — what electrical scope does the BS 7671 electrician deliver?',
    options: [
      'Nothing',
      'Dedicated low-current circuit (6 A typical) from CU to controller location near cylinder; 230 V AC supply for differential-temperature controller; AC circulation pump (40-100 W); sensor cables (2-core LV) from controller to collector + cylinder + outlet; immersion / cylinder thermostat (if existing immersion remains as backup); Reg 314 division + Reg 415.1 30 mA RCD + Reg 522.2.1 cable thermal protection near hot pipework. Section 554 immersion regs if cylinder includes electric backup. NOT covered: collector mounting, hydraulic loop, freeze protection fluid',
      'Just collectors',
      'No work',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671 electrician scope on a standard solar thermal install: (1) Dedicated low-current circuit from CU to controller location (typically near DHW cylinder in airing cupboard / utility room); 6 A Type A RCBO C-curve typical; 1.5 mm² T+E. (2) 230 V AC supply for differential-temperature controller (Resol / SUN-LITE / Steca typical UK 2025-26 brands); controller draws ~20-50 mA standby + pump load when active. (3) AC circulation pump — typically 40-100 W single-phase, wired through controller (controller switches pump on/off based on delta-T logic). (4) Sensor cables — 2-core LV (0.5-0.75 mm² typical) from controller to collector temperature sensor (Pt1000 or similar NTC), cylinder temperature sensor (mounted on cylinder coil or thermowell), outlet temperature sensor (if used). (5) Existing immersion integration if cylinder includes electric backup (immersion thermostat + dedicated 16 A circuit per §8.6 pattern). BS 7671 anchors: Reg 314 dedicated circuit, Reg 411.4 ADS, Reg 415.1 30 mA RCD, Reg 522.2.1 cable thermal protection (cable near hot primary pipework — solar primary can reach 90+ °C in summer stagnation conditions), Section 554 immersion regs if electric backup retained. NOT in electrical scope: collector mounting / structural (MCS company or plumber), hydraulic loop / pressurised expansion (heating engineer), freeze protection fluid (glycol mix — heating engineer). Cert evidence bundle: controls circuit EIC + immersion circuit EIC (if applicable) + functional test of differential-temperature logic.',
  },
  {
    question:
      'Reg 522.2.1 — why does it matter for solar thermal cable routing?',
    options: [
      'No relevance',
      'Solar thermal primary flow temperature can reach 90+ °C in summer stagnation conditions (collector heating above DHW setpoint, pump stopped, fluid sitting in collector loop). Cable runs near this pipework experience elevated ambient. Reg 522.2.1 protection methods: (a) shielding, (b) distance, (c) higher-rated cable accounting for additional temperature rise, (d) local reinforcement. Most common: distance + selecting cable for the ambient',
      'Random',
      'No regulation',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 522.2.1 applies because solar thermal pipework operates at significantly higher temperature than typical heating circuits: normal operation 60-80 °C; stagnation conditions (collector heated above cylinder setpoint, pump stopped) can reach 90-130 °C in flat plate collectors, 150+ °C in evacuated tube. Cable runs near this pipework (particularly in cylinder cupboard where collector primary loop interfaces with cylinder coil) experience elevated ambient. Reg 522.2.1 protection methods: (a) shielding — heat-resistant sleeve / fire blanket if cable forced close; (b) distance — most common, route cable distance from hot pipework; (c) higher-rated cable with Appendix 4 correction factor Ca per Table 4B1 (e.g. 90 °C-rated cable for high-ambient zones); (d) local reinforcement / substitution. Solar thermal install specific zones for Reg 522.2.1: (1) cylinder cupboard — cable for controller + pumps runs near solar primary flow + return pipework; (2) collector mounting — cable from controller to collector sensor runs alongside the primary loop on the roof; (3) loft / roof void where loop transitions from collectors to building. Cert evidence bundle records cable route + heat source proximity + chosen protection method.',
  },
  {
    question:
      'Drainback vs pressurised solar thermal systems — electrical implications?',
    options: [
      'Same',
      'Drainback: water (no glycol) drains by gravity back to a reservoir when pump stops; freeze protection inherent; simpler hydraulic; controller manages drain cycle. Pressurised: glycol-water mix continuously in collector loop; expansion vessel + pressure sensor required; freeze protection via glycol antifreeze; controller monitors pressure for leaks. Electrical: drainback often needs more powerful pump (lifts water back up); pressurised needs pressure-sensor input to controller',
      'No difference',
      'Random',
    ],
    correctAnswer: 1,
    explanation:
      'Drainback solar thermal system: uses pure water (no glycol antifreeze); when pump stops, water in collector loop drains by gravity back to a reservoir tank (typically at the cylinder location); freeze protection is inherent (no water in collector when pump off, so cannot freeze); simpler hydraulic. Electrical implications: (1) Pump must be capable of lifting water back up to the collector when started (drainback head + flow → higher-power pump than pressurised, typically 100-200 W vs 40-80 W pressurised); (2) Controller manages drain cycle — pump runs longer at startup to prime + fill collector; (3) No pressure sensor input needed. Pressurised solar thermal: glycol-water mix continuously circulates in collector loop; expansion vessel accommodates thermal expansion (sized 5-10% of loop volume); pressure sensor monitors loop pressure (loop pressure drop indicates leak; pressure rise indicates expansion vessel failure or overheat). Electrical: (1) Lower-power pump (40-80 W typical); (2) Pressure sensor input to controller (4-20 mA or 0-10 V signal typical); (3) Some controllers integrate pressure alarm output; (4) Anti-freeze monitoring (glycol concentration / pH degrades over years — typically replaced 7-10 years). UK 2025-26 reality: pressurised more common (~70%); drainback ~30%, suits installs where freeze protection without glycol is preferred. Cert evidence bundle records system type + controller features + commissioning test.',
  },
  {
    question:
      'Customer asks "should I install solar thermal in 2025-26?" — honest installer answer?',
    options: [
      'Always yes',
      'Honest 2025-26 answer: solar thermal economic case has weakened vs the PV + heat pump combination. Heat pump (BUS grant £7,500, BUS-covered) does heating + DHW more efficiently than solar thermal does just DHW. PV + immersion diverter does free DHW from any surplus PV. Solar thermal niche: high DHW demand (large household, B&B / hospitality), no roof space for PV, off-grid properties, customer aesthetic / specific preference. ROI 12-20+ years vs PV 8-12 years',
      'Always no',
      'Random',
    ],
    correctAnswer: 1,
    explanation:
      'Honest UK 2025-26 customer answer: solar thermal economic case has weakened. Specific reasons: (1) Boiler Upgrade Scheme (BUS) grants heat pumps £7,500 typical — NOT solar thermal. Heat pump does heating AND DHW more efficiently than solar thermal does just DHW. (2) PV cost-collapse 2010-2024 made PV + immersion diverter the dominant retrofit path for DHW — surplus PV diverts to immersion for free DHW heating; PV also covers electricity for lighting, appliances, EV charging. (3) ROI: PV typical 8-12 years; solar thermal typical 12-20+ years. (4) Install complexity: solar thermal is multi-trade (plumber + heating engineer + electrician + roof structural); MCS MIS 3001 competence harder to find than MIS 3002 PV. Solar thermal NICHE viable use cases: (a) high DHW demand (large household, B&B / hospitality, small commercial like leisure centre / hotel); (b) no roof space for PV (south-facing PV not feasible but solar thermal can use east/west or different angles); (c) off-grid properties (no grid connection — direct DHW heating without electricity); (d) customer aesthetic / specific preference for direct-heat technology. Most UK 2025-26 domestic retrofit customers better served by PV + immersion diverter + (optional) heat pump for heating. The honest installer respects this in the quote conversation. Cert evidence bundle records the customer\'s informed choice.',
  },
  {
    question:
      'Differential-temperature controller commissioning — what do you verify?',
    options: [
      'Nothing',
      'Sensor connections + polarity at controller terminals; delta-T_on + delta-T_off thresholds set per manufacturer default + customer needs; sensor reading at commissioning (collector + cylinder + ambient) within ±2 °C of known thermometer; pump cycles on when collector heats above cylinder + delta-T_on; pump cycles off when delta drops to delta-T_off; over-temperature shutdown verified by simulated high-cylinder condition; reverse-flow prevention (pump does NOT run when cylinder > collector)',
      'Customer tests',
      'Random',
    ],
    correctAnswer: 1,
    explanation:
      'Differential-temperature controller commissioning checklist: (1) Sensor connections + polarity at controller terminals — collector sensor (T1), cylinder sensor (T2), outlet sensor (T3 if used). Pt1000 / NTC sensors have specific orientation; controller display shows accurate readings. (2) Delta-T_on threshold set — typically 6-8 K factory default; adjust per customer / system needs. (3) Delta-T_off threshold set — typically 2-4 K; must be lower than delta-T_on (hysteresis). (4) Sensor reading verification at commissioning — compare controller display vs known thermometer at the sensor location; ±2 °C typical acceptable. (5) Pump engagement test — heat the collector sensor (controlled hot water bath / heat gun) above cylinder sensor + delta-T_on threshold; verify pump activates. (6) Pump deactivation test — let collector cool back; verify pump deactivates when delta drops to delta-T_off. (7) Over-temperature shutdown verified — simulate cylinder reaching setpoint (60-70 °C typical); verify pump stops. (8) Reverse-flow prevention — verify pump does NOT run when cylinder sensor reads higher than collector sensor (e.g. night when cylinder is warm but collector is cold ambient). (9) Functional check of any alarms (pressure, sensor failure, freeze-cycle activation if applicable). Cert evidence bundle: controller model + configuration + sensor calibration + functional test results.',
  },
  {
    question:
      'Existing immersion remaining as DHW backup on solar thermal install — what scope?',
    options: [
      'Remove it',
      'Existing immersion typically retained as backup for low-solar weeks + legionella pasteurisation cycle (HSE HSG274 framework). Electrical scope: existing 16 A immersion dedicated circuit retained (verify Section 554 compliance + Reg 554.2.1 thermal cut-out + Reg 415.1 30 mA RCD); cylinder thermostat coordinates with differential-temperature controller (solar primary heats cylinder first; immersion supplements if cylinder below setpoint). Cert evidence bundle integrates existing immersion + new solar controller',
      'No immersion',
      'Customer choice',
    ],
    correctAnswer: 1,
    explanation:
      'Existing immersion retention on solar thermal install: standard practice in UK 2025-26 retrofit. Reasons: (1) Solar thermal alone cannot reliably maintain DHW in low-irradiance weeks (December-February UK) — immersion backup essential; (2) Legionella pasteurisation cycle per HSE HSG274 / ACOP L8 — DHW periodically raised to ≥60 °C; solar may not reach this in winter; immersion provides the boost. Electrical scope on existing immersion: (1) Verify existing 16 A dedicated circuit per Reg 314; (2) Section 554 compliance — immersion thermostat (Reg 554.x), over-temp thermal cut-out per Reg 554.2.1 (Mandatory + functional test); (3) Reg 415.1 30 mA RCD additional protection; (4) Cable + protective device verification per existing EIC. Coordination: cylinder thermostat (typically 60-65 °C setpoint) coordinates with solar differential-temperature controller — solar primary heats cylinder first (priority); immersion only activates if cylinder drops below the thermostat setpoint despite solar attempt. UK 2025-26 typical setup: customer can manually configure immersion-only override for emergencies (heat pump-style priority logic from §8.6). Cert evidence bundle: existing immersion EIC + new solar controls EIC + functional test of coordinated operation + Section 554 compliance verification + customer handover education.',
  },
];

const faqs = [
  {
    question: 'Why doesn\'t the BS 7671 RAG mention solar thermal?',
    answer:
      'Solar thermal generates HEAT, not electricity — it\'s not in BS 7671\'s scope. Section 551 lists electrical generating sets (PV, batteries, turbines, combustion engines, electric motors, other). Solar thermal\'s electrical install scope (controller, pump, sensors) is covered by general BS 7671 parts: Reg 314 (division), Reg 411 (ADS), Reg 415 (RCD), Reg 522.2 (cable thermal), Section 554 (immersion if retained). No solar-thermal-specific BS 7671 reg.',
  },
  {
    question: 'BS EN 12975 vs 12976 — which applies?',
    answer:
      'BS EN 12975-1 + -2: solar thermal collectors (flat plate + evacuated tube), product standards. BS EN 12976: factory-made solar heating systems (system-level product standard, including controller, pump, expansion vessel, mounting). MCS MIS 3001 references these. UK 2025-26 mature products carry DoC declaring conformity.',
  },
  {
    question: 'Solar PV vs solar thermal — can I do both?',
    answer:
      'Yes — both can coexist on the same roof if there\'s sufficient south-facing area, but typically the customer picks one. UK 2025-26 economics favour PV + immersion diverter for DHW. Niche use case: very high DHW demand site (B&B, leisure facility) where PV alone can\'t cover the load — solar thermal complements PV. Cert evidence bundle records both scopes separately; same roof structural assessment.',
  },
  {
    question: 'MCS MIS 3001 — what does the installer need to demonstrate?',
    answer:
      'MCS Installer Standard 3001 — solar thermal heating systems. Sizing per BS EN 15316 (energy performance) + customer DHW demand assessment. Product on MCS-approved list. Installer competence (typically BPEC solar thermal course + MCS-certified company). Customer handover documentation: sizing calc + commissioning + expected solar fraction (typically 50-70% of annual DHW demand in UK) + maintenance schedule + warranty.',
  },
  {
    question: 'Stagnation — what is it + why does it matter electrically?',
    answer:
      'Stagnation: collector exposed to sun but no heat extraction (pump stopped because cylinder is at setpoint, OR pump failure, OR controller fault). Collector temperature rises rapidly — flat plate to 130-150 °C, evacuated tube to 200+ °C. Glycol fluid degrades (boils, polymerises). Pipework temperature near collector elevated. Reg 522.2.1 cable protection considerations on roof + cylinder cupboard cable runs. Controller stagnation-protection logic: pump runs briefly to circulate heat out of collector even if cylinder is hot, OR system has manual / automatic shading.',
  },
];

export default function RenewableEnergyModule9Section3() {
  const navigate = useNavigate();

  useSEO({
    title: 'Solar thermal (collectors + electrical scope) | Renewable Energy 9.3 | Elec-Mate',
    description:
      'Solar thermal from the BS 7671 electrical install perspective. NOT in Reg 551.1.1 (heat-only, no electrical generation) — but has real electrical install scope: differential-temperature controller, circulation pumps, sensors, drainback vs pressurised. Reg 314 + 415.1 + 522.2.1 + Section 554. MCS MIS 3001.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../renewable-energy-module-9')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 9
          </button>

          <PageHero
            eyebrow="Module 9 · Section 3 · Reg 314 + Reg 415.1 + Reg 522.2.1 + Section 554 + MCS MIS 3001"
            title="Solar thermal (collectors + electrical scope)"
            description="Solar thermal heating — NOT a Section 551 generating set (heat-only, no electrical generation), but real electrical install scope. Differential-temperature controller + circulation pumps + sensors + drainback vs pressurised. MCS MIS 3001 framework. BS EN 12975 / 12976 collector + system standards. Reg 522.2.1 cable thermal protection near hot primary pipework."
            tone="yellow"
          />

          <TLDR
            points={[
              'Solar thermal generates HEAT not electricity — NOT in Reg 551.1.1 (no electrical generation, no export, no anti-islanding consideration).',
              'But has REAL electrical install scope: differential-temperature controller, circulation pump(s), sensors, drainback / pressurised system electrical elements, freeze protection.',
              'BS 7671 anchors: Reg 314 dedicated controls way + Reg 411.4 ADS + Reg 415.1 30 mA RCD + Reg 522.2.1 cable thermal protection + Section 554 (existing immersion if retained).',
              'Collector types: flat plate (cheaper, robust, lower thermal efficiency in cold) vs evacuated tube (more efficient especially in UK climate, higher cost). Both use the same electrical architecture.',
              'Differential-temperature controller (Resol / SUN-LITE / Steca typical UK 2025-26): compares collector vs cylinder sensors; activates pump when delta-T > 6-8 K; stops at 2-4 K hysteresis.',
              'Drainback (water + gravity drain when pump stops, no glycol) vs pressurised (glycol-water mix + expansion vessel + pressure sensor) — both UK 2025-26 viable.',
              'Existing immersion retention as backup standard practice — Section 554 compliance + Reg 554.2.1 thermal cut-out + legionella pasteurisation per HSE HSG274.',
              'UK 2025-26 economic reality: solar thermal niche vs PV + immersion diverter + heat pump combination (BUS grant-supported). Honest customer comparison at quote stage.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Distinguish solar thermal from Section 551 electrical generating sets — heat-only, no export.',
              'Identify the BS 7671 framework that DOES apply to solar thermal: Reg 314 + 411.4 + 415.1 + 522.2.1 + Section 554.',
              'Compare flat plate vs evacuated tube collector electrical install scope (identical between types).',
              'Wire + commission a differential-temperature controller — sensor placement, delta-T settings, functional test.',
              'Apply Reg 522.2.1 cable thermal protection for cables near hot primary pipework (stagnation conditions 90+ °C).',
              'Distinguish drainback vs pressurised system electrical implications (pump sizing, pressure sensor).',
              'Retain + integrate existing immersion as DHW backup per Section 554 + HSE HSG274 legionella.',
              'Apply MCS MIS 3001 framework + BS EN 12975 / 12976 product standards.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>
            Solar thermal doesn\'t generate electricity but does generate work for the electrician. Controller + pump + sensors + cable-near-hot-pipework — small scope but real.
          </Pullquote>

          <ContentEyebrow>Why solar thermal is in this course</ContentEyebrow>

          <ConceptBlock
            title="Heat-only, but real electrical scope"
            plainEnglish="Solar thermal generates HEAT, not electricity. It\'s not in Reg 551.1.1 (which lists electrical generating sets). No grid export, no anti-islanding consideration. But solar thermal install has a small but real electrical scope: differential-temperature controller, circulation pumps, temperature sensors, drainback / pressurised system electrical elements, and integration with existing electric immersion backup."
            onSite="UK 2025-26 reality: solar thermal install volume is modest (vs PV peak in 2010-2015). When you do encounter solar thermal, the electrical scope is well-defined + bounded — Reg 314 dedicated controls way + standard BS 7671 framework. The bigger trade-side is plumbing + heating engineering."
          >
            <p>Solar thermal electrical scope summary:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Differential-temperature
                  controller</strong> — 230 V AC mains-powered; compares collector vs
                cylinder temperature; switches pump on/off based on delta-T logic
              </li>
              <li>
                <strong className="text-white">Circulation pump(s)</strong>
                — typically 40-200 W single-phase AC; smaller (40-80 W) for
                pressurised systems; larger (100-200 W) for drainback systems
                (lift-against-gravity)
              </li>
              <li>
                <strong className="text-white">Temperature
                  sensors</strong> — Pt1000 or NTC thermistors at collector outlet (T1),
                cylinder coil inlet (T2), and optionally outlet / additional points.
                2-core LV cable to controller
              </li>
              <li>
                <strong className="text-white">Drainback / pressurised
                  system electrical elements</strong> — pressure sensor (pressurised
                only), expansion vessel monitoring, drainback reservoir level
                detection (drainback only)
              </li>
              <li>
                <strong className="text-white">Freeze protection</strong>
                — glycol-based: monitoring sensor on glycol concentration / pH;
                drainback: inherent (no water in collector when pump off); controller
                logic manages either approach
              </li>
              <li>
                <strong className="text-white">Existing immersion
                  integration</strong> — retained as backup for low-solar weeks + HSE
                HSG274 legionella; Section 554 framework applies
              </li>
              <li>
                <strong className="text-white">Cable thermal
                  protection</strong> — Reg 522.2.1 applies because solar primary
                pipework reaches 90+ °C in summer + stagnation; cable runs near
                pipework protected by distance / shielding / higher-rated cable
              </li>
              <li>
                <strong className="text-white">NO electrical
                  generation</strong> — no inverter, no export metering, no EREC G98 /
                G99, no anti-islanding device. Section 551 + Chapter 82 PEI do NOT
                apply
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Flat plate vs evacuated tube collectors"
            plainEnglish="Two main solar thermal collector types: flat plate (rectangular panel, metal absorber under glass) and evacuated tube (parallel glass tubes with vacuum-insulated absorbers). Different thermal efficiency profiles, different costs, same electrical install scope."
            onSite="UK 2025-26 market sees both. Evacuated tube preferred for performance in UK\'s cool / overcast climate; flat plate preferred for cost-sensitive installs + simple roof aesthetics. The electrical install scope is identical between types — same controller, pump, sensors, cylinder integration."
          >
            <p>Collector type comparison:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Flat plate
                  collector</strong> — rectangular panel typically 1.5-2.5 m². Metal
                absorber (copper / aluminium with selective coating) under low-iron
                glass cover. Insulated rear. Heat transfer fluid through absorber pipes.
                Cost £400-700 per panel UK 2025-26
              </li>
              <li>
                <strong className="text-white">Flat plate thermal
                  efficiency</strong> — moderate; significant heat loss through glass
                cover in cold conditions. Better in clear / warm conditions
              </li>
              <li>
                <strong className="text-white">Evacuated tube
                  collector</strong> — parallel rows of glass tubes (8-30 per panel).
                Inner absorber in vacuum-insulated tube → very low heat loss. Cost
                £700-1,500 per equivalent panel UK 2025-26
              </li>
              <li>
                <strong className="text-white">Evacuated tube
                  efficiency</strong> — higher across all conditions, especially cold +
                low-irradiance. Better suits UK\'s cool / overcast climate. Slightly more
                fragile (glass tubes)
              </li>
              <li>
                <strong className="text-white">Product
                  standards</strong> — BS EN 12975-1 + -2 (collectors), BS EN 12976
                (system-level). MCS-approved products carry DoC
              </li>
              <li>
                <strong className="text-white">Roof mounting</strong>
                — both: integrated (replaces tiles) or on-roof (mounted above existing
                roof). Structural roof assessment (load + wind uplift) required for either
              </li>
              <li>
                <strong className="text-white">Sizing</strong> —
                typical UK 4-bed household: 4-5 m² of flat plate OR 4-6 m² evacuated
                tube; covers ~50-70% of annual DHW demand
              </li>
              <li>
                <strong className="text-white">Electrical install
                  scope identical</strong> — same controller, pump, sensors, cable. The
                differences are mechanical / hydraulic
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 522.2.1 — applied to solar thermal cable routing"
            clause="In order to avoid the effects of heat from external sources, one or more of the following methods or an equally effective method shall be used to protect a wiring system: (a) shielding; (b) placing sufficiently far from the source of heat; (c) selecting a system with due regard for the additional temperature rise which may occur; (d) local reinforcement or substitution of insulating material."
            meaning="Reg 522.2.1 is the categorical regulation for protecting wiring from external heat sources. Solar thermal-specific application: primary flow / return pipework operates at 60-80 °C in normal conditions; STAGNATION conditions (collector heated, pump stopped, fluid sitting) can reach 90+ °C in flat plate and 130-200 °C in evacuated tube. Cable runs near this pipework experience elevated ambient. Designer applies the protection methods per zone: (a) shielding via heat-resistant sleeve where cable forced close; (b) distance — most common, route cable distance from hot pipework; (c) higher-rated cable with Appendix 4 correction factor Ca per Table 4B1; (d) local reinforcement / substitution. Cert evidence bundle records cable route survey + heat source proximity per zone + chosen protection method per Reg 522.2.1."
          />

          <InlineCheck {...inlineChecks[0]} />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>Controller, pump, sensors — the install</ContentEyebrow>

          <Pullquote>
            The differential-temperature controller does one job: ‘is the sun hot enough to put heat in the cylinder?’ It runs the pump or it doesn\'t. Everything else is mechanical.
          </Pullquote>

          <ConceptBlock
            title="Differential-temperature controller commissioning"
            plainEnglish="The differential-temperature controller (DTC) compares two sensors (collector + cylinder), activates the circulation pump when delta-T crosses a threshold, deactivates when delta-T drops. Commissioning verifies sensor placement + accurate readings + delta-T thresholds + pump engagement + safety shutdown logic."
            onSite="UK 2025-26 typical DTC brands: Resol DeltaSol BS / SLM / DL series, SUN-LITE, Steca TR series. Mains-powered (230 V AC); low standby current (~20-50 mA); switches pump output when active. Functional test exercises all the trigger conditions during commissioning."
          >
            <p>DTC commissioning sequence:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Sensor connections
                  + polarity</strong> — Pt1000 / NTC at collector outlet (T1), cylinder
                coil (T2), optional outlet (T3). 2-core LV (0.5-0.75 mm²) cable.
                Verify each sensor reads accurately per controller display
              </li>
              <li>
                <strong className="text-white">Sensor reading
                  verification</strong> — compare DTC display vs known thermometer at
                each sensor location. ±2 °C typical acceptable. Significant deviation
                indicates wrong sensor type, wrong polarity, or cable error
              </li>
              <li>
                <strong className="text-white">Delta-T_on
                  threshold</strong> — typically 6-8 K factory default. Adjust per
                manufacturer / system needs. Higher delta-T_on = less pump
                cycling but slower heat transfer initiation
              </li>
              <li>
                <strong className="text-white">Delta-T_off
                  threshold</strong> — typically 2-4 K. Must be lower than delta-T_on
                (hysteresis). Prevents pump short-cycling
              </li>
              <li>
                <strong className="text-white">Pump engagement
                  test</strong> — heat collector sensor above cylinder sensor by
                delta-T_on threshold (use controlled hot water or heat gun on sensor
                temporarily). Verify pump activates. Listen for pump running; check
                flow indicator
              </li>
              <li>
                <strong className="text-white">Pump deactivation
                  test</strong> — let collector sensor cool back. Verify pump
                deactivates when delta drops to delta-T_off
              </li>
              <li>
                <strong className="text-white">Over-temperature
                  shutdown</strong> — simulate cylinder reaching setpoint (60-70 °C);
                verify pump stops even with collector hot. Prevents cylinder
                overheating
              </li>
              <li>
                <strong className="text-white">Reverse-flow
                  prevention</strong> — verify pump does NOT run when cylinder reads
                higher than collector (e.g. night with warm cylinder + cold ambient
                collector). Critical to prevent cylinder cooling overnight
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — controller model + configuration + sensor
                calibration + functional test results
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Drainback vs pressurised system electrical scope"
            plainEnglish="Drainback systems use plain water (no glycol antifreeze); when pump stops, water drains by gravity back to a reservoir; freeze protection inherent. Pressurised systems use glycol-water mix continuously in the collector loop; expansion vessel + pressure sensor required; freeze protection via glycol. Different electrical implications."
            onSite="UK 2025-26 split: pressurised ~70%, drainback ~30%. Drainback gaining share for installs where glycol management is unwelcome (B&Bs, hospitality — glycol contamination concerns) or where freeze protection without chemicals is preferred."
          >
            <p>Electrical implications per system type:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Drainback pump
                  sizing</strong> — must lift water back up to the collector when
                started (loop volume + static head). Typically 100-200 W vs 40-80 W
                pressurised. Higher start current — verify Reg 411.4 ADS + Reg 415.1
                RCD margin
              </li>
              <li>
                <strong className="text-white">Drainback pump
                  cycle</strong> — at startup, pump runs longer to prime + fill
                collector loop (typical 30-60 seconds). Controller logic manages this
              </li>
              <li>
                <strong className="text-white">Drainback freeze
                  protection</strong> — inherent (no water in collector when pump off,
                cannot freeze). NO glycol management
              </li>
              <li>
                <strong className="text-white">Drainback reservoir
                  monitoring</strong> — some systems monitor reservoir level (level
                switch input to controller); alarms if low (leak)
              </li>
              <li>
                <strong className="text-white">Pressurised pump
                  sizing</strong> — lower-power pump (40-80 W typical), continuous
                circulation when active
              </li>
              <li>
                <strong className="text-white">Pressurised
                  expansion vessel</strong> — accommodates thermal expansion of glycol
                mix; sized 5-10% of loop volume. Pre-charged at install
              </li>
              <li>
                <strong className="text-white">Pressurised pressure
                  sensor</strong> — monitors loop pressure; 4-20 mA or 0-10 V signal to
                controller. Pressure drop → leak alarm. Pressure rise → expansion
                vessel failure or overheat alarm
              </li>
              <li>
                <strong className="text-white">Pressurised freeze
                  protection</strong> — via glycol concentration; typically 30-40%
                propylene glycol in water. Degrades over years; replacement every
                7-10 years (separate plumbing scope, not electrical)
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — system type + controller features + commissioning
                test specific to type
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Section 554 + Reg 554.2.1 — existing immersion retention with solar thermal"
            clause="Reg 554.2.1: Every heater for liquid or other substance shall incorporate or be provided with an automatic device to prevent a dangerous rise in temperature. (Mandatory over-temp thermal cut-out for any immersion heater)"
            meaning="Solar thermal installs typically retain the existing electric immersion as backup for low-solar weeks + HSE HSG274 legionella pasteurisation. The existing 16 A dedicated immersion circuit + Section 554 framework remains: Reg 554.1.x general install, Reg 554.2.1 thermal cut-out (MANDATORY — verify functional at solar thermal commissioning), Reg 554.3.1 uninsulated immersed elements, Reg 415.1 30 mA RCD, Reg 314 dedicated circuit. The differential-temperature controller (solar) does NOT take over from the immersion control — the existing immersion thermostat coordinates with the solar controller. Solar primary heats cylinder first (priority); immersion supplements only if cylinder drops below thermostat setpoint despite solar. Customer handover education: explain coordinated operation + immersion-only override warning (most expensive mode) + legionella cycle. Cert evidence bundle: existing immersion EIC + new solar controls EIC + Section 554 compliance verification + functional test of coordinated operation."
          />

          <InlineCheck {...inlineChecks[2]} />

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <Scenario
            title="Standard 4-bed retrofit — 4 m² flat plate + 200 L dual-coil cylinder"
            situation="4-bed semi-detached. South-facing roof with space for 4 m² flat plate solar thermal. Existing gas combi being kept for space heating; cylinder upgrade to 200 L dual-coil unvented (solar coil lower, immersion at top). Existing 3 kW immersion circuit. Customer wants ~50% DHW from solar (typical UK yield)."
            whatToDo="Multi-trade: MCS company (MIS 3001) + heating engineer + plumber + electrical installer. Electrical scope: (1) Dedicated 6 A controls circuit from CU to controller location near cylinder; Type A RCBO C-curve + 30 mA additional protection per Reg 415.1; 1.5 mm² T+E. (2) Differential-temperature controller — Resol DeltaSol BS Plus (typical UK 2025-26 product); 230 V AC supply; 2-core LV screened cables to T1 collector sensor + T2 cylinder coil sensor. (3) Circulation pump — Grundfos UP 15-60 (40 W single-phase) for pressurised system; wired through controller output. (4) Pressure sensor (pressurised system) — 4-20 mA signal to controller. (5) Existing 16 A immersion circuit retained — verify Section 554 compliance + Reg 554.2.1 over-temp cut-out functional + Reg 415.1 30 mA RCD; cylinder thermostat coordinates with new solar controller. (6) Cable thermal protection per Reg 522.2.1 — solar primary pipework runs through cylinder cupboard; route control cables distance from hot pipes. Commissioning: differential-temperature controller functional test (sensor reading + delta-T thresholds + pump engagement / deactivation + over-temperature shutdown + reverse-flow prevention); existing immersion functional test + Reg 554.2.1 cut-out test. Cert evidence bundle: new controls circuit EIC + existing immersion circuit verification + MCS MIS 3001 handover pack + system commissioning report + customer handover education (solar priority logic + immersion override warning + legionella cycle + maintenance schedule). Total electrical scope: ~£300-500 labour. Total project: ~£4-7k."
            whyItMatters="Standard UK 2025-26 solar thermal retrofit. Demonstrates the bounded electrical scope alongside the plumbing + heating-engineer-led install. Cert evidence bundle integrates with existing cylinder + immersion records. MCS MIS 3001 handover unlocks (where applicable — verify current scheme) any grant funding. Customer expectation: ~50% annual DHW from solar; immersion supplements in winter + legionella; ROI typically 12-20+ years (no current grant on solar thermal in UK 2025-26)."
          />

          <Scenario
            title="High-DHW B&B install — 6 m² evacuated tube + 500 L pre-heat cylinder"
            situation="Coastal B&B (12 guest rooms). High DHW demand peaks morning + evening. Existing gas boiler + 300 L cylinder. Customer wants solar thermal to reduce gas use; 6 m² evacuated tube (better UK climate performance); separate 500 L pre-heat cylinder feeding the existing 300 L primary cylinder (so solar contributes when sun shines + existing cylinder maintains setpoint via gas boiler)."
            whatToDo="Multi-trade install. Electrical scope larger than domestic: (1) Dedicated 10 A controls circuit (controller draws more under busy operation + multiple sensors); 2.5 mm² T+E. (2) Differential-temperature controller — Resol DeltaSol DL2 (multi-sensor commercial variant); 230 V AC. (3) Larger circulation pump — Grundfos UP 25-60 (60 W) for the longer pre-heat cylinder loop. (4) Multiple sensors — T1 collector outlet, T2 pre-heat cylinder bottom, T3 pre-heat cylinder top, T4 outlet to existing cylinder. (5) Pre-heat cylinder + immersion backup (16 A dedicated circuit + Section 554 framework). (6) Drainback architecture chosen (B&B preference: no glycol contamination, simpler maintenance) — larger pump 150 W with priming cycle; drainback reservoir level switch input to controller. (7) Heating engineer integrates pre-heat cylinder + existing primary cylinder hydraulically. Commissioning extends: differential-temperature controller multi-sensor functional + drainback prime cycle test + reservoir level alarm + pre-heat coordination with existing cylinder thermostat + legionella cycle scheduling (B&B critical — HSE HSG274 risk assessment + ACOP L8 considerations). Cert evidence bundle: extended controls EIC + existing cylinder verification + drainback system commissioning + pre-heat cylinder integration + B&B-specific legionella documentation. Total electrical scope ~£600-900 labour. Total project ~£12-18k."
            whyItMatters="High-DHW commercial / hospitality is the dominant viable use case for solar thermal in UK 2025-26 economics. Customer\'s gas saving is substantial (50-70% of DHW gas displaced); ROI 8-12 years competitive with PV at this scale. Cert evidence bundle is richer + integrates legionella compliance per the commercial setting. Demonstrates where solar thermal still makes sense vs the dominant PV + heat pump path."
          />

          <CommonMistake
            title="Routing controller cable directly against hot primary pipework"
            whatHappens="Installer routes the 2-core LV controller cable through the cylinder cupboard tied directly against the solar primary flow pipework (lazy cable management). In normal operation pipework reaches 60-80 °C; in summer stagnation conditions (cylinder at setpoint, pump stopped, sun on collector) primary reaches 90-130 °C in flat plate. Cable insulation thermally degrades over years; eventual sensor reading errors or insulation breakdown. Premature controller failure / sensor errors."
            doInstead="Reg 522.2.1 protection methods. Route control cable at distance from hot pipework (method (b) — most common). If forced close: heat-resistant sleeve / fire blanket (method (a) shielding); rated cable per Appendix 4 Ca correction factor for high ambient (method (c)). Cert evidence bundle records the cable route + chosen protection method per Reg 522.2.1. Cable routing photographs at commissioning."
          />

          <CommonMistake
            title="Forgetting to retest Reg 554.2.1 over-temp cut-out on existing immersion"
            whatHappens="Installer adds new solar thermal controls; commissions the differential-temperature controller; declares scope complete. Doesn\'t verify existing immersion over-temp thermal cut-out (Reg 554.2.1 mandatory) still operational. Months later, cylinder thermostat fails stuck-closed → cylinder over-heats → cut-out should trip but is degraded after years in service → cylinder pressure relief operates OR scalding at tap."
            doInstead="Solar thermal install with existing immersion retention REQUIRES Section 554 + Reg 554.2.1 verification. At commissioning: functional test of existing over-temp cut-out (deliberate overheat with thermostat bypassed in controlled condition; verify cut-out trips at manufacturer-declared temperature; reset; restore). Cert evidence bundle records the test result. If cut-out fails or degrades: replace immersion + thermostat + cut-out assembly before declaring scope complete."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Solar thermal generates HEAT not electricity. NOT in Reg 551.1.1 (no electrical generation, no export, no anti-islanding).',
              'BS 7671 framework that applies: Reg 314 dedicated controls way + Reg 411.4 ADS + Reg 415.1 30 mA RCD + Reg 522.2.1 cable thermal protection + Section 554 (existing immersion retention).',
              'Collector types: flat plate (cheaper, lower thermal efficiency cold) vs evacuated tube (more efficient UK climate, higher cost). Same electrical install scope.',
              'BS EN 12975 collectors product standard; BS EN 12976 system-level product standard. MCS MIS 3001 installer competence framework.',
              'Differential-temperature controller (DTC): compares collector vs cylinder; activates pump when delta-T > 6-8 K; deactivates at 2-4 K hysteresis. UK 2025-26: Resol / SUN-LITE / Steca brands.',
              'Drainback (water + gravity drain, no glycol, inherent freeze protection, larger pump 100-200 W) vs pressurised (glycol mix + expansion vessel + pressure sensor, smaller pump 40-80 W).',
              'Solar primary pipework reaches 90+ °C in summer stagnation conditions — Reg 522.2.1 cable thermal protection critical for cables near pipework.',
              'Existing immersion typically retained as backup for low-solar weeks + HSE HSG274 legionella pasteurisation. Section 554 + Reg 554.2.1 thermal cut-out functional test mandatory at commissioning.',
              'Heat-pump-priority equivalent: solar primary heats cylinder first; immersion supplements only if cylinder drops below thermostat setpoint.',
              'UK 2025-26 economic reality: solar thermal niche vs PV + immersion diverter + heat pump combination. ROI 12-20+ years vs PV 8-12 years.',
              'Niche viable use cases: high-DHW (B&B / hospitality), no roof space for PV, off-grid properties, customer aesthetic preference.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 3 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-9-section-2')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section 2
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Wind microgeneration (HAWT / VAWT)
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-9-section-4')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                9.4 Biomass interfaces
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
