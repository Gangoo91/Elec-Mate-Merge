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
import { PvModuleCrossSection, BypassDiodeTopology } from '@/components/study-centre/diagrams/renewableM2';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm2s2-module-construction',
    question:
      'A typical framed crystalline silicon PV module is built up of which layers, from front (sun-facing) to back?',
    options: [
      'Just glass and cells, sealed together',
      'Front tempered glass, EVA encapsulant, cell matrix (cells interconnected with tinned-copper ribbons), EVA encapsulant, polymer backsheet (or rear glass for bifacial modules), aluminium frame around the perimeter, and a junction box on the rear with bypass diodes and MC4 connector tails',
      'Plastic film over the cells',
      'Bare cells with no protection',
    ],
    correctIndex: 1,
    explanation:
      'The standard framed crystalline silicon PV module is a laminate sandwich. Front tempered low-iron glass for high transmittance and impact resistance. EVA (ethylene vinyl acetate) encapsulant either side of the cell matrix for adhesion and moisture protection. A polymer backsheet (or rear glass for bifacial modules). An aluminium frame for rigidity and fixing points. A junction box mounted on the rear with the bypass diodes inside and MC4 connector tails coming out. Each layer has a role; understanding the construction explains the failure modes (delamination, encapsulant browning, backsheet cracking).',
  },
  {
    id: 'm2s2-bypass-diodes',
    question:
      'A 60-cell crystalline silicon module typically has how many bypass diodes, and what do they protect against?',
    options: [
      'One bypass diode, protecting against reverse polarity',
      'Three bypass diodes (one per 20-cell sub-string), protecting against hotspot damage when one cell is shaded or faulted — the diode provides an alternative current path around the affected sub-string',
      'Sixty bypass diodes, one per cell',
      'No bypass diodes; PV modules don\'t need them',
    ],
    correctIndex: 1,
    explanation:
      'A typical 60-cell module has three bypass diodes in the junction box, each protecting a 20-cell sub-string. When a cell within a sub-string is shaded or faulted, the rest of the string would otherwise force current through the shaded cell in reverse, dissipating the unshaded cells\' power as heat — a hotspot, potentially damaging the encapsulant or even causing thermal failure. The bypass diode forward-biases at low reverse voltage (~0.7 V) and provides an alternative current path around the affected sub-string. The bypassed sub-string contributes nothing during the bypass, but the rest of the module continues to operate.',
  },
  {
    id: 'm2s2-iv-curve-points',
    question:
      'Five points on a PV module I-V curve. Which one defines the module\'s nameplate power?',
    options: [
      'V_oc (open-circuit voltage)',
      'I_sc (short-circuit current)',
      'The Maximum Power Point (MPP), at V_mp and I_mp — where V × I is at its maximum. P_max = V_mp × I_mp at STC is the nameplate power',
      'The intersection of V_oc and I_sc',
    ],
    correctIndex: 2,
    explanation:
      'The five points on an I-V curve: V_oc (voltage at zero current, the open-circuit point), I_sc (current at zero voltage, the short-circuit point), V_mp (voltage at maximum power), I_mp (current at maximum power), and P_max (power at the maximum power point) = V_mp × I_mp. The MPP is the "knee" of the I-V curve. The module\'s nameplate power is P_max at STC. The inverter\'s MPPT job (covered in Section 2.4) is to operate the module continuously at its V_mp / I_mp point as conditions vary.',
  },
  {
    id: 'm2s2-fill-factor',
    question:
      'A modern 60-cell 400 W module has V_oc = 41.6 V, I_sc = 12.5 A. What is its approximate fill factor (FF)?',
    options: [
      '0.50',
      'FF = P_max / (V_oc × I_sc) = 400 / (41.6 × 12.5) = 400 / 520 ≈ 0.77 — a typical crystalline silicon module value',
      '1.0',
      '0.25',
    ],
    correctIndex: 1,
    explanation:
      'Fill factor = P_max / (V_oc × I_sc) = 400 / (41.6 × 12.5) = 400 / 520 ≈ 0.77. Real crystalline silicon modules typically achieve FF in the 0.75–0.85 range; values below 0.70 indicate quality issues (high series resistance, poor contact metallisation). FF is a useful cross-check on the module datasheet — calculate it from V_oc, I_sc and P_max and compare with the manufacturer\'s claimed FF; significant disagreement is a red flag.',
  },
  {
    id: 'm2s2-heat-dissipation',
    question:
      'BS 7671 Section 712 requires PV modules to be installed in a particular thermal arrangement. What does it say?',
    options: [
      'No thermal requirement',
      'As specified by the manufacturer, the PV modules shall be installed in such a way that there is adequate heat dissipation under conditions of maximum solar radiation for the site — placing the responsibility on the installer to follow manufacturer guidance for the cooling arrangement (typically the 70–100 mm standoff above the roof surface)',
      'Modules must be water-cooled',
      'Modules must be installed indoors',
    ],
    correctIndex: 1,
    explanation:
      'BS 7671 picks up the manufacturer\'s thermal requirement and makes the installer responsible for delivering adequate heat dissipation at the site\'s maximum solar radiation conditions. The practical translation: read the manufacturer\'s mounting guidance (rail standoff, clearance under modules, ventilation arrangements) and install per spec. The 70–100 mm standoff above the roof surface (from the practical work intelligence) is the standard discipline that enables natural convection cooling. Flush-mounting modules without manufacturer authorisation breaches the BS 7671 requirement AND voids the module warranty.',
  },
  {
    id: 'm2s2-mc4-torque',
    question:
      'MC4 connectors are the de facto standard for PV module DC interconnections. What is the right discipline on terminating them?',
    options: [
      'Hand-tighten until firm',
      'Use the manufacturer\'s specified crimp tool for the cable lugs (typically Stäubli MC4 or compatible), then torque the connector body to the manufacturer\'s spec — the dry-fit connection without proper crimping and torque is a long-term reliability failure mode causing thermal runaway and arc faults',
      'Solder the connections',
      'Use any pliers',
    ],
    correctIndex: 1,
    explanation:
      'MC4 (Multi-Contact 4 mm) connectors are the industry standard for PV DC interconnections. The discipline: use the manufacturer\'s specified crimp tool to crimp the cable lugs into the connector body (a hand-crimp tool produces unreliable connections), then torque the connector body to manufacturer spec. The common failure mode is a dry connection or partial crimp — initially functional, but the connection resistance increases over years, dissipating heat, eventually causing the connector to fail thermally or arc. PV DC arc faults at MC4 connectors are a documented incident pattern. The PWI common mistakes list explicitly flags "not torquing MC4 or isolator terminals to spec".',
  },
  {
    id: 'm2s2-blocking-diodes',
    question:
      'BS 7671 Section 712 specifies the requirements for blocking diodes IF they are used in a PV string. What are the rules?',
    options: [
      'No specific rules',
      'IF blocking diodes are used: they shall be connected in series with the PV strings; their reverse voltage shall be rated for ≥ 2 × Upc max of the PV string; their rated current shall be not less than 1.1 × Isc max. The rules apply only where blocking diodes are actually used in the design',
      'They must be solid-state relays only',
      'They must be Schottky-type only',
    ],
    correctIndex: 1,
    explanation:
      'BS 7671 Section 712 sets the conditional rules for blocking diodes. Conditional because modern PV designs often don\'t use blocking diodes (modern inverters and string configurations handle reverse-current scenarios differently). Where they ARE used: series-connected with the PV string, reverse voltage ≥ 2 × Upc max (twice the maximum continuous PV circuit voltage), rated current ≥ 1.1 × Isc max. The cert evidence bundle on a blocking-diode-equipped install records the diode datasheet showing both ratings meet the requirements.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A modern 60-cell crystalline silicon module datasheet quotes P_max = 400 W, V_oc = 41.6 V, I_sc = 12.5 A, V_mp = 34.0 V, I_mp = 11.8 A at STC. Quick sanity check: are these self-consistent?',
    options: [
      'Cannot tell from these numbers',
      'Yes — V_mp × I_mp = 34.0 × 11.8 = 401.2 ≈ P_max 400 W (the maximum power point checks). Fill factor = P_max / (V_oc × I_sc) = 400 / 520 ≈ 0.77 (within the typical crystalline silicon 0.75–0.85 range). I_mp / I_sc = 11.8 / 12.5 = 0.944 (typical). The datasheet is internally consistent',
      'No — the numbers don\'t add up',
      'Only if V_oc = V_mp',
    ],
    correctAnswer: 1,
    explanation:
      'Three cross-checks. V_mp × I_mp should equal P_max (they do — 401 ≈ 400). The fill factor should sit in the typical 0.75–0.85 range (it does — 0.77). And I_mp must be less than I_sc — physically impossible for I_mp to exceed I_sc on any I-V curve (it does — 11.8 A < 12.5 A). When evaluating an unfamiliar module, run all three checks against the datasheet. Datasheets that fail any check (or report I_mp ≥ I_sc) deserve closer scrutiny.',
  },
  {
    id: 2,
    question:
      'On a 60-cell PV module with three bypass diodes, what happens if a single cell in one sub-string is heavily shaded (e.g. covered by leaves)?',
    options: [
      'The whole module shuts down',
      'The bypass diode for that sub-string forward-biases, providing a current path around the shaded sub-string. The two unaffected sub-strings continue producing power. Module output drops by ~33% (one of three sub-strings bypassed), but the module does not fail',
      'The shaded cell catches fire',
      'No change — bypass diodes do nothing',
    ],
    correctAnswer: 1,
    explanation:
      'The bypass diode rescues the module. The shaded cell would otherwise force the unshaded cells\' current through itself in reverse, dissipating their power as heat (a hotspot). The bypass diode\'s forward-bias voltage (~0.7 V) is much less than the reverse-voltage stress on the shaded cell, so the diode conducts first, providing an alternative current path. The bypassed sub-string contributes zero power; the other two continue. The module output drops proportionally (~33% loss in this example) but the module survives. Without bypass diodes, partial shading could destroy a module within hours.',
  },
  {
    id: 3,
    question:
      'A PV designer is specifying blocking diodes in a string. What are the BS 7671 Section 712 requirements?',
    options: [
      'Reverse voltage ≥ Upc max, current ≥ Isc max',
      'Connected in series with the PV string. Reverse voltage rated ≥ 2 × Upc max. Rated current ≥ 1.1 × Isc max. These rules apply ONLY if blocking diodes are used; modern PV designs often omit them entirely',
      'No requirements — designer\'s choice',
      'Must be the same model as the inverter\'s internal diode',
    ],
    correctAnswer: 1,
    explanation:
      'Section 712 sets clear acceptance criteria for blocking diodes when used: series connection with the string, reverse voltage ≥ 2 × Upc max (twice the max continuous PV circuit voltage), rated current ≥ 1.1 × Isc max. The factor 1.1 may need adapting for special conditions (reflections, special PV technologies — per the Reg 712.433.102(b)(ii) note). Modern PV designs often omit blocking diodes entirely because the inverter and string configuration handles reverse-current scenarios; where blocking diodes ARE used, the BS 7671 rules apply.',
  },
  {
    id: 4,
    question:
      'A 400 W module on a UK roof in summer reaches a cell temperature of 60°C. The datasheet quotes Pmax temperature coefficient of -0.36%/°C. What is the approximate operating Pmax?',
    options: [
      '400 W — unchanged',
      'Approximately 350 W — (60 – 25) °C × -0.36%/°C × 400 W = -50.4 W reduction → operating Pmax ≈ 350 W',
      '200 W',
      '500 W (more output when hot)',
    ],
    correctAnswer: 1,
    explanation:
      'The temperature derate at module level uses the same calculation as Section 2.1 cell-level coefficient: (operating temperature − STC reference 25°C) × temperature coefficient × nameplate. (60 − 25) °C × -0.36%/°C × 400 W = -50.4 W. Operating Pmax ≈ 350 W — a ~12% reduction from the STC nameplate. Annual yield calculations apply this derate plus inverter losses, soiling, cable losses, mismatch to a "performance ratio" (typically 0.75–0.85) multiplied by the STC nameplate.',
  },
  {
    id: 5,
    question:
      'MC4 connectors are the de facto industry standard for PV DC interconnections. What is the most common installer failure mode on MC4 connections?',
    options: [
      'Wrong connector type',
      'Inadequate crimp on the cable lug (hand-crimped rather than using the manufacturer\'s specified crimp tool), or insufficient torque on the connector body assembly — leading to elevated connection resistance, progressive heating, eventual thermal failure and DC arc fault risk',
      'Connecting two MC4s together',
      'Using MC4 on AC circuits',
    ],
    correctAnswer: 1,
    explanation:
      'MC4 connector failures cluster at the crimp and the torque. A hand-crimped lug typically delivers high contact resistance — the connection appears to work, but resistance heats the connector over years until it fails. An under-torqued assembly produces similar elevated resistance. Both failure modes drive DC arc fault incidents that have appeared in HSE and London Fire Brigade reporting through 2024–2026 (part of the incident data that drove A4\'s tighter PV protection requirements). The PWI flags "not torquing MC4 or isolator terminals to spec" as a high-frequency common mistake.',
  },
  {
    id: 6,
    question:
      'BS 7671 Section 712 picks up the manufacturer\'s heat dissipation requirement and makes the installer responsible. What\'s the practical install discipline?',
    options: [
      'Install modules in shaded conditions',
      'Follow the manufacturer\'s mounting guidance — typically a 70–100 mm standoff above the roof surface, allowing natural convection cooling. Flush-mounting without manufacturer authorisation breaches the BS 7671 requirement AND voids the module warranty',
      'Use water cooling',
      'Reduce module count to compensate',
    ],
    correctAnswer: 1,
    explanation:
      'The manufacturer specifies how the module must be mounted for adequate heat dissipation; BS 7671 Section 712 makes that the installer\'s responsibility. The standard discipline (per the practical work intelligence) is the 70–100 mm standoff above the roof, enabling natural convection. Flush-mounting (10–20 mm standoff or less) starves the modules of cooling airflow and drives operating temperatures 10–20°C higher than properly ventilated installs. The result: ~5–8% yield loss over the array life, plus warranty void if the manufacturer\'s mounting spec was breached.',
  },
  {
    id: 7,
    question:
      'The PV electrical installation per BS 7671 Section 712 starts at which physical point?',
    options: [
      'The customer\'s consumer unit',
      'A PV module or set of PV modules connected in series with the cables provided by the PV module manufacturer — and continues up to the user\'s installation or the utility supply point. The PV module is the start of the electrical installation, not just an upstream device',
      'The inverter input',
      'The grid connection',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671 Section 712.1 sets the scope: the electrical installation of a PV generator starts from a PV module or set of PV modules connected in series with the manufacturer-supplied cables, and continues to the user\'s installation or the utility supply point. The module is IN the scope, not a black-box component. This is why PV-specific protective measures (712.412 reinforced insulation, 712.431 string protection) apply from the module forward, and why the module datasheet and BS EN 61730 product safety conformity matter in the cert evidence bundle.',
  },
  {
    id: 8,
    question:
      'Half-cell modules are appearing on UK PV product listings. What\'s the advantage over standard full-cell modules?',
    options: [
      'Cheaper',
      'Lower current per series-string (each cell cut in half halves the cell current) means lower resistive losses in cell interconnections and better partial-shade tolerance. Plus more parallel sub-strings to bypass independently. Typically ~3% power gain for similar cell area',
      'Smaller modules',
      'Higher voltage',
    ],
    correctAnswer: 1,
    explanation:
      'Half-cell modules cut each full-size cell into two halves and rearrange the laminate so the current per series-string is halved (while voltage stays similar). Lower string current means lower I²R losses in the cell interconnections — a ~3% power gain. Lower per-string current also means each sub-string is smaller, so partial-shade events affect a smaller fraction of the module. Half-cell construction is now standard at the mid-to-premium end of the UK market. Shingled-cell modules push the concept further by using overlapping cell ribbons rather than busbar interconnections, eliminating the inter-cell gaps and gaining another ~2–3%.',
  },
];

const faqs = [
  {
    question:
      'How do I read a PV module datasheet — which fields actually matter?',
    answer:
      'Six fields drive most design decisions. P_max (STC nameplate power, optimistic real-world). V_oc and I_sc at STC (defines string voltage stacking and current). V_mp and I_mp at STC (where the inverter MPPT will operate). Temperature coefficients for P_max, V_oc and I_sc (drives the cold-day V_oc and hot-day P_max calculations). NOCT or NMOT (more realistic operating temperature reference). System voltage limit (typically 1000 V or 1500 V — sets the maximum series string voltage). Mechanical: dimensions, weight, frame thickness, fixing hole positions. Certifications: BS EN 61730 (product safety) and MCS Product List eligibility (for funded installs).',
  },
  {
    question:
      'Why do bypass diodes go in the junction box rather than alongside each cell?',
    answer:
      'Cost and reliability. A 60-cell module would need 60 bypass diodes if each cell had its own — expensive, lots of additional connections, more failure points. Three diodes in the junction box (one per 20-cell sub-string) catches the common shading patterns at acceptable cost. The compromise: a shaded cell takes down its whole 20-cell sub-string, not just itself. This is why module-level shading optimisation (microinverters, power optimisers — covered in Section 2.5) is sometimes worth the extra hardware on heavily-shaded arrays — they effectively put a more granular "bypass" function at the module level.',
  },
  {
    question:
      'What\'s the difference between "framed" and "frameless" PV modules?',
    answer:
      'Framed modules have an aluminium perimeter frame providing rigidity, mounting points, and edge sealing for the laminate. Frameless modules omit the frame, relying on the glass and structural mounting clamps for rigidity. Framed modules are by far the most common (the standard rooftop and ground-mount product). Frameless modules are used in some BIPV applications, frame-glass façades, and specific ground-mount designs. The clamp positions on a frameless module are critical — clamping in the wrong location can stress the glass and crack the cells inside the laminate.',
  },
  {
    question:
      'Bifacial modules — what are they and do they make sense in the UK?',
    answer:
      'Bifacial modules have a transparent (glass) backsheet instead of opaque polymer, allowing the cells to capture light reflected from behind the module. Total energy yield can be 5–25% above a standard module depending on ground reflectance (albedo), mounting height, and tilt. For UK conditions, bifacial gains are modest on standard rooftops (where the ground behind the module is the underlying roof — very low albedo). They make more sense on ground-mount or carport installations with light-coloured ground surfaces, and on some BIPV façade configurations. The marginal cost is small; the marginal benefit depends on the install geometry.',
  },
  {
    question:
      'BS EN 61730 vs BS EN 61215 — what are these standards?',
    answer:
      'Two complementary IEC/CENELEC standards. BS EN 61215 covers performance qualification — does the module produce the rated output, and how does it perform under thermal cycling, humidity, freezing, hail, mechanical load? BS EN 61730 covers product safety — is the module safe to install and operate, with appropriate Class II construction, electrical isolation, fire performance? UK modules typically carry both certifications. The MCS Product List (MPS 010) requires both. The module datasheet should explicitly list the certifications; their absence is a quality red flag.',
  },
  {
    question:
      'What does Reg 712.433.102(b)(ii)\'s "adapt the 1.1 coefficient for special conditions" actually mean in practice?',
    answer:
      'The 1.1 multiplier on Isc (used for blocking diode rated current and elsewhere in PV string sizing) assumes a typical module under typical irradiance conditions. The note says the multiplier should be increased where special conditions apply — for example: high-reflection environments (water surfaces, snow cover, light-coloured ground producing reflected irradiance above 1000 W/m² on the module front face); special PV technologies with non-standard Isc-vs-irradiance behaviour (some thin-film and tandem cells). For routine UK rooftop installs the 1.1 multiplier is adequate. For unusual install geometries the designer should review and document the chosen coefficient.',
  },
  {
    question:
      'How long do PV modules last in UK conditions — and what\'s the warranty pattern?',
    answer:
      'Crystalline silicon modules typically come with two layered warranties. Product warranty (10–25 years depending on manufacturer) covers manufacturing defects, frame integrity, junction box failures. Performance warranty (typically 25 years) guarantees output not falling below ~80–85% of nameplate at year 25 (linear or stepped degradation curve). The expected real-world life is 25–35 years for premium modules in UK conditions; mid-market modules typically degrade slightly faster. The dominant failure modes after 15+ years are encapsulant browning (yellow discolouration reducing transmittance), backsheet cracking, junction box / MC4 connection failures. The 25-year warranty is a meaningful customer-conversation item.',
  },
  {
    question:
      'PID (Potential Induced Degradation) — what is it and should I worry about it?',
    answer:
      'PID is a degradation mechanism where high system voltage (~600–1000 V) causes ions to migrate within the cell structure over time, reducing efficiency. It tends to affect modules in the part of the string nearest one polarity (typically the negative end). PID-resistant modules use specific encapsulants and cell architectures to prevent the ion migration. UK domestic PV systems run at ~400–600 V string voltage where PID risk is modest; commercial systems at higher voltages need PID-resistant modules. Modern module datasheets explicitly call out PID resistance (e.g. "PID-free certified per IEC TS 62804"); for funded installs the MCS Product List flags the certification status.',
  },
  {
    question:
      'How does module mounting interact with the manufacturer\'s warranty?',
    answer:
      'Module warranties are typically conditional on installation per the manufacturer\'s mounting instructions — specified clamp positions, fixing patterns, clearance from roof surface, fixing torques, sealing requirements. Installations that breach these instructions typically void the warranty. The PWI common mistakes list catches the routine breaches: insufficient roof fixings, over-tightening clamps causing frame stress, flush mounting without manufacturer authorisation, incorrect clamp position on frameless modules. The cert evidence bundle should include the manufacturer\'s mounting spec, the as-installed photos, and any sign-offs required. Manufacturers may require photographic evidence of correct installation for warranty registration.',
  },
];

export default function RenewableEnergyModule2Section2() {
  const navigate = useNavigate();

  useSEO({
    title:
      'Modules — from cells to module | Renewable Energy 2.2 | Elec-Mate',
    description:
      'Cells assembled into a module — series cell strings, bypass diodes, electrical characteristics (V_oc, I_sc, V_mp, I_mp, P_max, fill factor), module construction, MC4 connectors, BS EN 61730 product safety and BS 7671 Section 712 heat dissipation requirements.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../renewable-energy-module-2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 2
          </button>

          <PageHero
            eyebrow="Module 2 · Section 2 · BS 7671:2018+A4:2026"
            title="Modules — from cells to module"
            description="Cells assembled into a module — series cell strings, bypass diodes, electrical characteristics (V_oc, I_sc, V_mp, I_mp, P_max, fill factor), module construction and the BS 7671 Section 712 requirements that land at module level."
            tone="yellow"
          />

          <TLDR
            points={[
              'A PV module is a laminate sandwich: front tempered glass, EVA encapsulant, cell matrix (cells interconnected with tinned-copper ribbons), EVA encapsulant, polymer backsheet (or rear glass for bifacial), aluminium frame, junction box with bypass diodes and MC4 connector tails.',
              'A typical 60-cell module has three bypass diodes (one per 20-cell sub-string), protecting against hotspot damage when one cell is shaded or faulted. The bypass diode provides an alternative current path around the affected sub-string.',
              'Five points on the I-V curve drive design: V_oc, I_sc, V_mp, I_mp and P_max. Fill factor FF = P_max / (V_oc × I_sc) is the quality indicator — typical crystalline silicon FF is 0.75–0.85.',
              'BS 7671 Section 712 picks up the manufacturer\'s heat dissipation requirement — installer responsible for delivering adequate cooling at maximum site irradiance. The 70–100 mm roof standoff is the standard discipline.',
              'BS EN 61730 (product safety) and BS EN 60904 (STC measurement) are the module-level standards. MCS Product List (MPS 010) is the funded-market product gate. MC4 connectors are the de facto interconnect standard — crimp tool and torque discipline are non-negotiable.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify the layers of a standard framed crystalline silicon PV module — glass, encapsulant, cell matrix, backsheet, frame, junction box — and explain each layer\'s role.',
              'Apply the I-V curve to module design — V_oc and I_sc as the string-sizing inputs, V_mp and I_mp as the MPPT operating point, P_max as the nameplate, FF as the quality cross-check.',
              'Explain how bypass diodes protect a module under partial shade, and why three diodes per 60-cell module is the standard compromise between cost and granularity.',
              'Apply BS 7671 Section 712 module-level requirements: manufacturer heat dissipation discipline, blocking diode rules when used, module overcurrent protection rating definition.',
              'Specify and install MC4 connectors correctly — manufacturer-specified crimp tool, torque to spec — and recognise the failure modes that drive DC arc fault risk.',
              'Read a PV module datasheet against the design pack — STC nameplate, NOCT operating reference, temperature coefficients, BS EN 61730 / BS EN 61215 certifications, MCS Product List eligibility.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>A module is a series string of cells plus bypass diodes plus a glass-and-encapsulant package.</Pullquote>

          <ContentEyebrow>Module construction — the laminate sandwich</ContentEyebrow>

          <ConceptBlock
            title="The layers of a framed crystalline silicon PV module"
            plainEnglish="A PV module is a glass-and-polymer sandwich with cells in the middle. Each layer has a job. Understanding the construction explains the failure modes."
            onSite="Module construction matters when you\'re reading a datasheet, diagnosing a fault, or specifying a module. The same outer dimensions can hide very different internal architectures (full-cell vs half-cell, framed vs frameless, polymer backsheet vs rear-glass bifacial)."
          >
            <p>From front (sun-facing) to back, a standard framed crystalline silicon module consists of:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Front tempered low-iron glass</strong> —
                high light transmittance (low iron content), tempered for impact resistance,
                typically 3.2–4 mm thick. The single most expensive component after the
                cells.
              </li>
              <li>
                <strong className="text-white">EVA encapsulant (front)</strong> — ethylene
                vinyl acetate, melted under heat during lamination to bond the glass to
                the cell matrix and exclude moisture. The encapsulant ages with UV
                exposure — yellowing of older modules is encapsulant browning.
              </li>
              <li>
                <strong className="text-white">Cell matrix</strong> — typically 60 or 72
                cells in a rectangular array, interconnected with tinned-copper ribbons
                (busbars on the cell front, solder-attached to the next cell\'s back).
                Half-cell modules use 120 half-cells in two parallel groups.
              </li>
              <li>
                <strong className="text-white">EVA encapsulant (back)</strong> — matching
                the front, sealing the cells from below.
              </li>
              <li>
                <strong className="text-white">Polymer backsheet</strong> — typically a
                multi-layer polymer (Tedlar / PET) providing weather protection and
                electrical insulation. Bifacial modules replace the backsheet with rear
                glass for transparency.
              </li>
              <li>
                <strong className="text-white">Aluminium frame</strong> — perimeter frame
                providing rigidity, edge sealing for the laminate, and standardised
                fixing holes for mounting clamps and brackets.
              </li>
              <li>
                <strong className="text-white">Junction box</strong> — mounted on the
                rear, containing the bypass diodes (typically three per 60-cell module)
                and the MC4 connector tails for string interconnection. The junction box
                is the module\'s single point of electrical interface to the rest of the
                installation.
              </li>
            </ul>
            <p>
              Each layer has known failure modes. Glass: hail damage, edge chipping.
              Encapsulant: browning, delamination. Cell matrix: cracking from impact or
              thermal cycling, hotspot damage. Backsheet: cracking after years of UV.
              Frame: corrosion at fixing points. Junction box: thermal failure of bypass
              diodes, MC4 connector degradation.
            </p>
          </ConceptBlock>

          <PvModuleCrossSection caption="How a PV module is built up — tempered glass, EVA encapsulant, the cells, backsheet and aluminium frame, with the junction box and bypass diodes on the back." />

          <InlineCheck {...inlineChecks[0]} />

          <SectionRule />

          <ContentEyebrow>Bypass diodes — the hotspot defence</ContentEyebrow>

          <Pullquote>Three bypass diodes save the day when one cell is shaded.</Pullquote>

          <ConceptBlock
            title="What bypass diodes do — and why one isn\'t enough"
            plainEnglish="When a cell is shaded or faulted in a series string, the rest of the string would otherwise force their current through the shaded cell in reverse — destroying it via heat dissipation. The bypass diode provides an alternative current path around the affected sub-string."
            onSite="A 60-cell module has three bypass diodes (one per 20-cell sub-string) inside the junction box. The diodes are forward-biased only when their sub-string is shaded. In normal operation they sit reverse-biased, contributing nothing."
          >
            <p>The hotspot mechanism without bypass diodes:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                Unshaded cells generate their normal current; the series string forces all
                cells to carry the same current
              </li>
              <li>
                A shaded cell generates much less photocurrent — it becomes reverse-biased
                by the unshaded cells\' voltage
              </li>
              <li>
                The reverse-biased shaded cell dissipates the power of the unshaded cells
                as heat — potentially reaching cell temperatures &gt; 150°C
              </li>
              <li>
                The encapsulant near the hotspot browns and degrades; in severe cases the
                cell or even the module fails permanently
              </li>
            </ul>
            <p>The bypass diode intervention:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                When the reverse voltage across the shaded sub-string exceeds the diode\'s
                forward-bias threshold (~0.7 V), the diode conducts
              </li>
              <li>
                Current bypasses the shaded sub-string through the diode rather than
                forcing through the shaded cell
              </li>
              <li>
                The bypassed sub-string contributes zero power; the rest of the module
                operates normally
              </li>
              <li>
                Power loss: roughly proportional to the fraction of cells bypassed (~33%
                for one sub-string of three in a 60-cell module)
              </li>
            </ul>
            <p>
              Why three bypass diodes and not one or sixty: one diode would mean any
              shading takes out the whole module; sixty (one per cell) would be
              prohibitively expensive and add many failure points. Three is the standard
              compromise — sufficient granularity for typical shading patterns, manageable
              cost and reliability.
            </p>
            <p>
              For applications with severe partial shading (chimney shadows, intermittent
              tree shade, complex roof geometries), the limitation of three bypass diodes
              is what drives the move to module-level power optimisers or microinverters
              (Section 2.5) — those effectively put the MPPT and bypass function at the
              individual module level, eliminating the sub-string-bypass loss.
            </p>
          </ConceptBlock>

          <BypassDiodeTopology caption="When one sub-string is shaded it stops generating and would block the whole string — its bypass diode conducts so the string current flows around it instead." />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>Electrical characteristics — reading the I-V curve</ContentEyebrow>

          <Pullquote>The module datasheet is a contract between the manufacturer and the installer.</Pullquote>

          <ConceptBlock
            title="V_oc, I_sc, V_mp, I_mp, P_max — and what they mean for design"
            plainEnglish="The module datasheet quotes five electrical parameters at STC. Each drives a different design decision. The fill factor cross-check confirms the datasheet is consistent."
            onSite="Read the datasheet against the I-V curve mental model. V_oc and I_sc are the endpoints. V_mp and I_mp are the knee. P_max is the rectangle area at the knee. FF is the rectangle\'s share of the V_oc × I_sc envelope."
          >
            <p>The five electrical parameters at STC and what they drive:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">V_oc (open-circuit voltage)</strong> —
                voltage at zero current. Drives string voltage stacking and cold-day
                V_oc string sizing against the inverter input limit.
              </li>
              <li>
                <strong className="text-white">I_sc (short-circuit current)</strong> —
                current at zero voltage. Drives DC cable sizing, fuse / blocking diode
                rating (multiplied by 1.1–1.25 safety factor), and string parallel-count
                limits.
              </li>
              <li>
                <strong className="text-white">V_mp (voltage at maximum power)</strong> —
                where the inverter MPPT will operate. Drives the inverter MPPT input
                range compatibility check.
              </li>
              <li>
                <strong className="text-white">I_mp (current at maximum power)</strong> —
                the operating current at MPP. Drives the steady-state DC cable thermal
                rating.
              </li>
              <li>
                <strong className="text-white">P_max (maximum power)</strong> — the STC
                nameplate. Drives the headline kWp rating of the array and the annual
                yield calculation.
              </li>
            </ul>
            <p>The fill factor cross-check:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                FF = P_max / (V_oc × I_sc)
              </li>
              <li>
                Also: P_max should equal V_mp × I_mp
              </li>
              <li>
                Typical crystalline silicon FF: 0.75–0.85
              </li>
              <li>
                FF below 0.70 indicates quality issues (high series resistance, poor
                contact metallisation)
              </li>
            </ul>
            <p>Worked example — a modern 60-cell 400 W module datasheet:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>P_max = 400 W</li>
              <li>V_oc = 41.6 V, I_sc = 12.5 A</li>
              <li>V_mp = 34.0 V, I_mp = 11.8 A</li>
              <li>V_mp × I_mp = 34.0 × 11.8 = 401.2 W ≈ 400 W ✓</li>
              <li>FF = 400 / (41.6 × 12.5) = 400 / 520 ≈ 0.77 ✓ (typical mono-Si range)</li>
              <li>I_mp / I_sc = 11.8 / 12.5 = 0.944 ✓ (typical 0.92–0.96 — I_mp always &lt; I_sc)</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[2]} />

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>BS 7671 Section 712 at module level</ContentEyebrow>

          <ConceptBlock
            title="What Section 712 says about modules"
            plainEnglish="The electrical installation per Section 712 starts at the PV module. The module is in scope, not outside it. Three specific requirements land at module level: heat dissipation per manufacturer, blocking diode rules (if used), and module overcurrent protection rating."
            onSite="The Section 712 module-level requirements drive the cert evidence bundle — manufacturer mounting spec, blocking diode datasheets (if used), module overcurrent protection arrangement. Section 712.1 defines the scope; the specific clauses define the design discipline."
          >
            <p>Section 712 starts the PV electrical installation at the module:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                The electrical installation begins at a PV module or set of PV modules
                connected in series with the manufacturer-supplied cables
              </li>
              <li>
                It continues up to the user\'s installation or the utility supply point
              </li>
              <li>
                Selection rules in Section 712 modify the general Part 4 / Part 5
                framework for the PV case
              </li>
            </ul>
            <p>Three module-level requirements:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Heat dissipation</strong> — modules shall
                be installed as specified by the manufacturer to provide adequate heat
                dissipation under maximum solar radiation for the site
              </li>
              <li>
                <strong className="text-white">Blocking diodes (if used)</strong> —
                connected in series with strings; reverse voltage ≥ 2 × Upc max; rated
                current ≥ 1.1 × Isc max
              </li>
              <li>
                <strong className="text-white">Module overcurrent protection rating</strong>
                {' '}— the PV module maximum overcurrent protection rating is the PV
                module maximum rated current (the protective device sizing constraint)
              </li>
            </ul>
            <p>
              The 1.1 multiplier on Isc may need adapting for special conditions
              (reflections, special PV module technologies) per the Reg 712.433.102(b)(ii)
              note. For routine UK rooftop installs the 1.1 multiplier is adequate; the
              designer documents any adaptation in the design pack.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Section 712 — manufacturer heat dissipation"
            clause="As specified by the manufacturer, the PV modules shall be installed in such a way that there is adequate heat dissipation under conditions of maximum solar radiation for the site. This places the responsibility on the installer to follow manufacturer guidance to ensure modules are not installed in a manner that prevents required cooling."
            meaning="BS 7671 picks up the manufacturer\'s thermal requirement and makes the installer responsible. The 70–100 mm standoff above the roof surface (from the practical work intelligence) is the standard discipline. Flush-mounting without manufacturer authorisation breaches the BS 7671 requirement AND voids the module warranty."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Section 712 — blocking diode rules (when used)"
            clause="The blocking diodes shall be connected in series with the PV strings. If blocking diodes are used, their reverse voltage shall be rated for ≥ 2 × Upc max of the PV string, and their rated current shall be not less than 1.1 × Isc max. The specified requirements apply only if blocking diodes are used; modern PV designs often omit them."
            meaning="Conditional rules. Where blocking diodes are part of the design, the BS 7671 acceptance criteria are unambiguous — datasheet evidence of both ratings in the cert bundle. Where blocking diodes are not used, the design conversation is elsewhere (string protection per Reg 712.431, covered in Section 2.3)."
          />

          <InlineCheck {...inlineChecks[4]} />

          <InlineCheck {...inlineChecks[6]} />

          <SectionRule />

          <ContentEyebrow>MC4 connectors — the de facto industry standard</ContentEyebrow>

          <Pullquote>MC4 torque is non-negotiable — finger-tight is not enough.</Pullquote>

          <ConceptBlock
            title="MC4 connectors — and the failure modes that drive DC arc faults"
            plainEnglish="MC4 (Multi-Contact 4 mm) connectors are the de facto industry standard for PV module interconnections. The failure mode is well-known: inadequate crimp, inadequate torque, or mixed-brand connectors that don\'t mate properly. DC arc fault incidents at MC4 connectors appear regularly in HSE / London Fire Brigade incident reporting."
            onSite="Three rules. Use the manufacturer\'s specified crimp tool — a hand-crimp tool is not sufficient. Torque the connector body to the manufacturer\'s spec — finger-tight is not enough. Mate same-brand connectors only — don\'t mix MC4 connector brands even when they look identical."
          >
            <p>MC4 connector failure modes:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Inadequate crimp</strong> — using a hand-
                crimp tool rather than the manufacturer-specified crimp produces
                inconsistent crimp quality. Elevated contact resistance over years drives
                progressive heating and eventual failure.
              </li>
              <li>
                <strong className="text-white">Inadequate torque</strong> — the connector
                body relies on torque to maintain the spring-contact pressure between mated
                halves. Finger-tight is not enough; spec is typically 4–6 Nm depending on
                manufacturer.
              </li>
              <li>
                <strong className="text-white">Brand mismatch</strong> — MC4 is the
                product name but connectors from different manufacturers (Stäubli, Phoenix
                Contact, Multi-Contact, others) have subtle dimensional differences. Mixed-
                brand connections may appear to mate but produce unreliable contact.
              </li>
              <li>
                <strong className="text-white">Damaged or wet connections</strong> —
                connectors left disconnected accumulate moisture and contamination. Wiping
                clean and reseating is insufficient; replacement is the right call.
              </li>
            </ul>
            <p>
              The incident pattern: progressively elevated connection resistance dissipates
              power as heat at the connector. Over years (sometimes months), the
              connector\'s polymer body softens; in the worst cases, the connector
              ignites or generates a DC arc. DC arcs are particularly dangerous because
              DC does not have the zero-crossings that help extinguish AC arcs — a DC
              arc can self-sustain.
            </p>
            <p>
              The PWI common mistakes list explicitly flags &ldquo;not torquing MC4 or
              isolator terminals to spec&rdquo; as a high-frequency installer error. The
              cert evidence bundle should include the torque values and the tool used;
              MCS audits sample the connector workmanship.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[5]} />

          <SectionRule />

          <ContentEyebrow>What it looks like in the wild</ContentEyebrow>

          <Scenario
            title="EICR finds a melted MC4 connector on a 2018-vintage PV install"
            situation="A periodic inspection of a 4 kWp grid-tied PV install (installed 2018) finds a discoloured and partially-melted MC4 connector at the inverter input. The module strings continue to operate; the DC isolator at the inverter shows no immediate fault indicators. The customer reports no operational issues — output has been roughly consistent with expectations."
            whatToDo="Treat the connector as an imminent-failure item. Photograph the damage. Code on the EICR: typically C2 (potentially dangerous, urgent remedial work) because a DC arc fault risk is present even though the system is currently operating. Isolate the system safely (DC isolator OFF, AC isolator OFF, lockout). Remove and replace the failed connector pair on both sides. Inspect adjacent connectors for similar discolouration. Verify torque on the new connectors per manufacturer spec. Check the cable conductor for heat damage extending into the cable insulation (replace cable length if affected). Update the customer\'s cert evidence bundle with the replacement record. Investigate the original install for systemic issues — if one connector failed this way, others on the same install may follow."
            whyItMatters="MC4 connector failure is one of the most common DC-side fault patterns on UK PV installs of 2015–2020 vintage, where crimp and torque discipline was less consistently applied than current standards demand. Catching the failed connector before it ignites is the inspection\'s value. Documenting the find and the remediation in the cert bundle protects both the customer (record of work) and the inspector (audit trail of the call)."
          />

          <CommonMistake
            title="Hand-crimping MC4 cable lugs instead of using the specified crimp tool"
            whatHappens="The installer doesn\'t have the manufacturer-specified MC4 crimp tool on the van. Rather than reschedule, they hand-crimp the cable lugs with general-purpose crimping pliers. The connections work at commissioning. Over 18 months the connection resistance rises; the connector body discolours; eventually one connector ignites during a high-irradiance afternoon, causing a roof fire."
            doInstead="MC4 crimping requires the manufacturer-specified tool. Stäubli\'s crimp tool (or equivalent for the connector brand being used) applies the correct crimp force across the lug to make a gas-tight connection that resists oxidation. Hand-crimp pliers cannot reliably reproduce the crimp geometry. If the tool isn\'t available, the job doesn\'t happen — the cost of the crimp tool is a fraction of the cost of a roof fire."
          />

          <CommonMistake
            title="Mounting modules flush to the roof surface against manufacturer instructions"
            whatHappens="The installer mounts PV modules with a 10–15 mm standoff to keep the visual profile low — at the customer\'s aesthetic preference. The manufacturer\'s mounting instructions specify a minimum 70 mm standoff for adequate cooling airflow. The modules operate at cell temperatures 15–20°C above a properly ventilated install during summer. Annual yield is reduced by ~5–8%. After several years the encapsulant browning accelerates. The manufacturer voids the warranty when a claim is made because the install breached the mounting instructions."
            doInstead="Follow the manufacturer\'s mounting spec exactly — typically 70–100 mm standoff above the roof for natural convection cooling. BS 7671 Section 712 makes this a regulatory requirement (the installer is responsible for adequate heat dissipation per manufacturer). Aesthetic compromises that breach the mounting spec break both the regulation and the warranty. The customer who wants a flush profile should be offered an in-roof system or BIPV (Section 2.6) — different products designed for that aesthetic."
          />

          <CommonMistake
            title="Trusting the module datasheet without sanity-checking the numbers"
            whatHappens="An installer specifies an unfamiliar module on a cost-driven install. The datasheet quotes P_max = 380 W, V_oc = 49.5 V, I_sc = 9.8 A. The string is sized against these numbers. After install, the array consistently underperforms the modelled yield. Investigation reveals the actual module fill factor is ~0.78 (consistent with the datasheet — 380 / (49.5 × 9.8) = 0.78) but the cell quality is at the low end of typical; field performance ratio is ~0.70 against PVGIS-modelled annual yield rather than the ~0.78–0.82 typical of better modules."
            doInstead="Run the fill factor cross-check on every unfamiliar module datasheet. FF below 0.78 is a warning sign — the cells may be acceptable but at the low end of the technology\'s typical range. Check the MCS Product List for the module. Check the BS EN 61730 and BS EN 61215 certification status. Check independent third-party test reports (PV Evolution Labs, Photon Lab) where available. Don\'t trust the datasheet at face value on a no-name brand; the cert evidence bundle includes the diligence record."
          />

          <SectionRule />

          <ContentEyebrow>Modern module construction — half-cell, shingled, bifacial</ContentEyebrow>

          <ConceptBlock
            title="The construction innovations that have moved the mid-market in 2024–2026"
            plainEnglish="The basic module construction (cells, encapsulant, glass, frame, junction box) is essentially unchanged from the 2010s. What HAS changed is the cell-level architecture — half-cell, shingled-cell, bifacial — delivering incremental power gains and durability improvements within the same envelope."
            onSite="On a new install in 2026, the mid-to-premium module market is dominated by half-cell construction. Shingled is at the premium end. Bifacial is starting to appear on ground-mount and commercial-rooftop installs. Each adds a few percent of yield for similar installation effort."
          >
            <p>The three construction innovations on the mid-to-premium 2026 market:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Half-cell modules</strong> — each full-size
                cell is cut in half; the laminate is rearranged so the per-string current
                is halved while voltage stays similar. Benefits: lower resistive losses
                in cell interconnections (~3% power gain), better partial-shade tolerance
                (smaller sub-strings to bypass independently), reduced bypass-diode
                stress.
              </li>
              <li>
                <strong className="text-white">Shingled-cell modules</strong> — overlapping
                cell ribbons rather than ribbon-busbar interconnections, eliminating the
                inter-cell gaps. Benefits: ~2–3% power gain on the same module area, more
                uniform appearance, reduced shading-loss propagation.
              </li>
              <li>
                <strong className="text-white">Bifacial modules</strong> — transparent
                rear glass instead of polymer backsheet, allowing cells to capture
                rear-side reflected light. Benefits: 5–25% total yield gain depending on
                ground reflectance (albedo), mounting height, and tilt. Best suited to
                ground-mount, carport, and façade installations with light-coloured
                surfaces behind the array.
              </li>
            </ul>
            <p>
              The trade-offs: each innovation typically adds 5–15% to the per-watt cost,
              recouped through the additional yield. The decision criterion at survey
              stage: does the install geometry favour the innovation? Half-cell wins
              almost universally on UK domestic. Shingled wins on premium aesthetic /
              high-performance installs. Bifacial wins on ground-mount with managed
              albedo.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[6]} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'A PV module is a glass-encapsulant-cells-backsheet laminate with an aluminium frame and a junction box. Each layer has a job and a failure mode.',
              'Typical 60-cell modules have three bypass diodes (one per 20-cell sub-string), protecting against hotspot damage when one cell is shaded. Half-cell modules have more parallel sub-strings, improving partial-shade tolerance further.',
              'Read the I-V curve: V_oc and I_sc define the endpoints; V_mp and I_mp define the MPP; P_max = V_mp × I_mp is the nameplate; FF = P_max / (V_oc × I_sc) is the quality cross-check (typical 0.75–0.85).',
              'BS 7671 Section 712 starts the PV electrical installation at the module. Three module-level requirements: manufacturer heat dissipation (installer responsible), blocking diode rules if used (≥ 2 × Upc max reverse, ≥ 1.1 × Isc max current), module overcurrent protection rating.',
              'MC4 connectors are the de facto standard. Use the manufacturer-specified crimp tool. Torque the connector body to spec. Don\'t mix connector brands. DC arc faults at MC4 connectors are a documented incident pattern.',
              'BS EN 61730 (product safety) and BS EN 61215 (performance qualification) are the module-level standards. MCS Product List (MPS 010) is the funded-market gate. PV-Evolution-Labs and Photon Lab independent test reports add a quality cross-check.',
              'Modern construction innovations (half-cell, shingled, bifacial) deliver incremental yield gains within the same envelope. Half-cell is now standard on UK mid-to-premium; shingled and bifacial at the premium end.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 2 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-2-section-1')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section 2.1
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Cells — the photovoltaic effect
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-2-section-3')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                2.3 Strings and arrays
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
