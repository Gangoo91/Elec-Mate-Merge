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
import { EquipotentialBonding, LightningLoop } from '@/components/study-centre/diagrams/renewablePvSiting';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm3s5-functional-bonding',
    question:
      'BS 7671 Reg 712.542.102 covers DC-side functional bonding. What does "functional bonding" mean in this context, and when is it applied?',
    options: [
      'No bonding allowed',
      'Functional bonding = electrical bonding of one polarity (typically negative) of the PV DC system to earth for system functional reasons (manufacturer-specified for performance, leakage detection, or galvanic isolation). Applied only when (a) the inverter has galvanic isolation between DC and AC (transformer-isolated, NOT transformerless), AND (b) the module manufacturer specifies functional bonding for performance reasons (some thin-film and some high-efficiency crystalline modules). Single-point only',
      'Bond everything everywhere',
      'No DC earthing exists',
    ],
    correctIndex: 1,
    explanation:
      'Reg 712.542.102 distinguishes "functional bonding" (system functional reasons, not safety bonding) from protective earthing. Functional bonding of one DC polarity to earth applies ONLY when the inverter is galvanically isolated (transformer between DC and AC) — otherwise functional bonding creates a fault path through the inverter. The module manufacturer specifies functional bonding for performance / leakage reasons; some high-efficiency modules (e.g. SunPower, some n-type / TOPCon, thin-film) require negative or positive bonding. Single-point only — multiple bonds create earth loops.',
  },
  {
    id: 'm3s5-galvanic-isolation',
    question:
      'Transformerless inverters (most modern UK domestic inverters) vs transformer-isolated inverters. What\'s the difference and how does it affect bonding?',
    options: [
      'No difference',
      'Transformerless inverters have NO galvanic isolation between the DC array and the AC output — the DC negative is effectively at AC neutral potential. Transformer-isolated inverters have a transformer providing galvanic isolation between DC and AC. Functional bonding of one DC polarity is only safe with transformer-isolated inverters; on transformerless inverters, functional bonding would create a fault path through the inverter and is NOT permitted',
      'Transformerless can never have PV',
      'Same bonding applies to both',
    ],
    correctIndex: 1,
    explanation:
      'Modern UK domestic PV inverters are typically transformerless — higher efficiency (96-98% Euro), lighter, lower cost. No galvanic isolation between DC and AC; the DC negative is at AC neutral potential. Transformer-isolated inverters have a transformer between the DC stage and AC stage — galvanic isolation. Functional bonding of one DC polarity (per Reg 712.542.102) is only safe with transformer-isolated inverters. Some modules manufacturer-spec functional bonding — using these modules requires a transformer-isolated inverter (or a transformerless inverter that has been certified for unbonded use with the specific module).',
  },
  {
    id: 'm3s5-single-point',
    question:
      'Where functional bonding is applied per Reg 712.542.102, what\'s the "single-point" requirement?',
    options: [
      'Multiple bonds everywhere',
      'Single bonding point only — one connection between the DC polarity and earth at one location. Multiple bonding points create earth loops, which are an electromagnetic interference and lightning-loop hazard. Typically the single bond is at the combiner / inverter location, not at module level. The cert evidence bundle records the single bonding point location',
      'No bonding',
      'Bond at every module',
    ],
    correctIndex: 1,
    explanation:
      'Reg 712.542.102 mandates single-point bonding. Multiple bonding points create: (a) circulating earth currents through the bonding loop; (b) electromagnetic interference; (c) lightning-loop hazard (Reg 712.521.102 covers lightning loops separately). The single bond is typically at the combiner or inverter location — convenient, accessible, documented. The cert evidence bundle records the single bonding point with location, conductor size, and method.',
  },
  {
    id: 'm3s5-lightning-loop',
    question:
      'BS 7671 Reg 712.521.102 covers lightning-loop minimisation. What\'s a "lightning loop" on a PV install, and how is it minimised?',
    options: [
      'Lightning loops are required',
      'A lightning loop = the area enclosed by the DC conductor path (live conductor) and the equipotential bonding conductor (earth path) running in parallel. A large lightning loop captures lightning EMP energy by induction, inducing damaging voltages across the loop. Mitigation per Reg 712.521.102: route DC conductors and equipotential bonding conductors close together (side by side) along the same path, minimising the enclosed area. Standard practice: same conduit / containment for DC + bonding',
      'Loops have no effect',
      'Lightning loops only matter at sea',
    ],
    correctIndex: 1,
    explanation:
      'Reg 712.521.102 covers lightning-induced EMP energy capture in DC + bonding loops. The loop area = distance × length between the DC conductor and the bonding conductor running in parallel. A large loop (DC on one side of the array, bonding conductor on the other side) captures significant EMP energy during a nearby lightning strike, inducing damaging voltages. Mitigation: route DC and bonding side-by-side along the same path — typically in the same conduit or strapped together — minimising the loop area to a few square millimetres rather than square metres.',
  },
  {
    id: 'm3s5-module-frame-bonding',
    question:
      'Module frame bonding — what\'s the standard approach for a UK PV install, and what does it achieve?',
    options: [
      'No bonding needed',
      'Module frames are bonded together via the mounting rail (the rail is electrically continuous when correctly assembled). The mounting rail is bonded at a single point to the building bonding system / earthing terminal at the array — typically via a dedicated bonding conductor from the rail to the consumer-unit / inverter earth. Achieves: (a) equipotential bonding of all module frames; (b) protective earthing for any fault current to frame; (c) lightning equipotentialisation. NOT functional bonding (which is separate, optional, polarity bonding)',
      'Bond each module individually with a separate conductor',
      'Bond only the inverter',
    ],
    correctIndex: 1,
    explanation:
      'Module frame bonding (the metal frames around the modules) is achieved via the mounting rail — the rail is electrically continuous when correctly assembled (manufacturer-specified torque, anti-corrosion gel at joints). The rail is then bonded at a single point to the building bonding / earthing — typically via a dedicated bonding conductor (minimum 4 mm² copper equivalent per Reg 712.542.3.101, green/yellow) from the rail to the inverter or consumer-unit earth. This achieves equipotential bonding of module frames, protective earthing path for any frame fault, and lightning equipotentialisation. Separate from functional bonding (Reg 712.542.102) which is polarity bonding for specific module/inverter combinations.',
  },
  {
    id: 'm3s5-lps',
    question:
      'A residential property has an existing external Lightning Protection System (LPS) per BS EN 62305. New PV install on the roof. What\'s the integration approach?',
    options: [
      'Ignore the LPS',
      'Coordinate with the existing LPS. PV array must be (a) within the LPS protected zone (PV array tip not exposed to direct strike), OR (b) integrated into the LPS as a protected element with appropriate separation distance per BS EN 62305-3. PV equipotential bonding conductor connects to the LPS bonding network. Surge protection devices (SPDs — Section 6) on both DC and AC sides per BS EN 62305-4. Structural engineer / LPS specialist review recommended',
      'Remove the LPS',
      'Disconnect everything',
    ],
    correctIndex: 1,
    explanation:
      'PV on a property with an existing LPS requires coordination per BS EN 62305 (the LPS standard). The PV array must either be within the LPS protected zone (the air termination grid extends over the array, no part of the array protrudes outside the protected zone) OR integrated as a protected element with appropriate separation distance to LPS air terminations. The PV bonding conductor connects to the LPS bonding network at a single point. SPDs on both DC and AC sides per BS EN 62305-4. For commercial / industrial installs with existing LPS, structural engineer / LPS specialist review is standard.',
  },
  {
    id: 'm3s5-supplementary-bonding',
    question:
      'On a metal-sheet roof PV install, the metal roof sheet may become an "extraneous-conductive-part" requiring supplementary bonding. When is this triggered?',
    options: [
      'Never',
      'Triggered when the metal sheet is electrically connected to the building structure in a way that could carry fault current, AND the resistance from the sheet to true earth is below the BS 7671 trigger threshold (effectively making it a fault-current path). The structural / electrical context dictates: a fully-isolated metal sheet on an insulating roof structure is typically NOT extraneous; a metal sheet bonded to internal structural steel typically IS. Bonding conductor (minimum 4 mm² copper equivalent per Reg 712.542.3.101, green/yellow) ties the sheet to the supplementary bonding network. Decision recorded in the cert evidence bundle',
      'Always bond every sheet',
      'Never bond metal',
    ],
    correctIndex: 1,
    explanation:
      'Per BS 7671 Section 411 and supplementary bonding requirements: a metal element is "extraneous-conductive-part" when it can carry fault current and its resistance to true earth is below the trigger threshold. For PV on metal-sheet roof: the sheet may or may not become extraneous depending on the electrical context (sheet electrical continuity to building structure, structural earthing arrangement, building bonding network). Where extraneous, supplementary bonding conductor (4-6 mm² typical, BS 7671 Table 54.8 minimum sizes) ties the sheet to the supplementary bonding network. Decision and conductor sizing recorded in the cert evidence bundle.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A modern UK domestic transformerless inverter is installed. The customer\'s PV module datasheet specifies "negative pole functional bonding required for performance". What\'s the design issue?',
    options: [
      'No issue',
      'INCOMPATIBLE combination. The module requires functional bonding (Reg 712.542.102), but the transformerless inverter has no galvanic isolation between DC and AC — bonding one DC polarity creates a fault path. Resolution: (a) substitute a transformer-isolated inverter that supports the module\'s functional bonding spec; (b) substitute a different module that doesn\'t require functional bonding; (c) some modern transformerless inverters are certified for use without bonding on bonded-required modules — verify manufacturer compatibility statement. The design pack must record the resolution',
      'Just bond the AC side',
      'Skip the bonding',
    ],
    correctAnswer: 1,
    explanation:
      'Transformerless inverter + module that requires functional bonding = incompatible without specific manufacturer certification. The transformerless inverter has no galvanic isolation; bonding one DC polarity creates a fault path through the inverter. Options: (1) transformer-isolated inverter (supports functional bonding); (2) different module (no bonding requirement); (3) verify manufacturer compatibility statement (some modern transformerless inverters have explicit certification for use with bonded-required modules via specialised internal circuitry). The MCS MIS 3002 design pack records the chosen resolution and the manufacturer compatibility evidence.',
  },
  {
    id: 2,
    question:
      'PV install on a tiled roof. DC cable runs from array along one side of the roof. Equipotential bonding conductor runs from the array on the OTHER side, both going to the inverter location. What\'s the issue?',
    options: [
      'No issue — they reach the inverter',
      'Large lightning loop — the DC cable and the bonding conductor enclose a substantial area (the roof and its diagonal route from array to inverter). Per Reg 712.521.102, the loop captures lightning EMP and induces damaging voltages. Rectification: route the DC cable and bonding conductor SIDE BY SIDE along the same path — same conduit or strapped together — minimising the loop area to negligible. Design discipline: plan the DC + bonding route together at the design stage',
      'Cables explode',
      'Cables must be apart',
    ],
    correctAnswer: 1,
    explanation:
      'The DC and bonding routes diverging across the roof create a large lightning loop — possibly several square metres of enclosed area. Per Reg 712.521.102, this loop captures lightning EMP energy by induction, leading to damaging induced voltages on the DC side during nearby lightning strikes. Rectification: route DC and bonding side-by-side, minimising the loop area to a few square millimetres (cables strapped together or in the same conduit). The design pack records the DC + bonding route plan; install photos evidence the side-by-side routing.',
  },
  {
    id: 3,
    question:
      'A residential PV install has the property\'s consumer unit on the ground floor, the inverter in the loft (10 m wire run), the array on the roof (15 m DC run). Where is the single bonding point for the array frame?',
    options: [
      'At every module',
      'At the inverter location (or a single accessible point near the inverter). The bonding conductor from the array (mounting rail) terminates at this single point, alongside any DC functional bonding (if applicable). From here, a single bonding conductor extends to the building main earthing terminal (MET) at the consumer unit. Avoid: bonding at each module, at the consumer unit AND at the inverter (creates loops), or skipping bonding entirely',
      'At every connector',
      'In the garden',
    ],
    correctAnswer: 1,
    explanation:
      'Single-point bonding discipline: array frame bonding terminates at one accessible point (typically at the inverter), where the bonding conductor extends to the building main earthing terminal (MET). This ensures: (a) all array metalwork is equipotentially bonded; (b) one path to the building earthing system; (c) no earth loops; (d) maintenance access is simple. The cert evidence bundle records the bonding-point location, the conductor size (typically 4-6 mm²), and the route.',
  },
  {
    id: 4,
    question:
      'A nearby lightning strike couples energy into a PV install\'s DC cable. Without SPDs, what would typically happen?',
    options: [
      'Nothing',
      'The induced voltage spike (typically kV-range) overstresses the inverter input components — likely permanent damage (input MOSFETs, MPPT controller, DC bus capacitors). Potentially also damages module bypass diodes. Mitigation: DC-side SPDs at the combiner / inverter location per BS EN 61643-31 (LPL II or higher Type-2 SPD); AC-side SPDs at the consumer unit or inverter AC output per BS EN 61643-11. SPDs are sacrificial — they take the spike, fail short, and need replacing after a strike event',
      'PV operates better',
      'Inverter celebrates',
    ],
    correctAnswer: 1,
    explanation:
      'Lightning-induced voltage spikes on PV DC and AC sides are a real risk in the UK — nearby strikes (not direct, but within hundreds of metres) couple kV-range energy through induction. Without SPDs: inverter components fail (input stage, MPPT, DC bus); module bypass diodes can fail; warranty void if SPDs not fitted (some manufacturers specify SPDs as warranty condition). Mitigation: DC-side SPDs at combiner / inverter (BS EN 61643-31 LPL II or Type-2); AC-side SPDs at consumer unit or inverter AC output (BS EN 61643-11). SPDs are sacrificial — replace after a strike event.',
  },
  {
    id: 5,
    question:
      'An installer fits a galvanically-isolated (transformer) inverter and a module that does NOT require functional bonding. Does functional bonding need to be applied?',
    options: [
      'Always required',
      'No — functional bonding is applied ONLY when the module manufacturer specifies it. The galvanically-isolated inverter makes functional bonding SAFE if needed (the transformer prevents the bonding from creating a fault path), but it doesn\'t make functional bonding REQUIRED. The default is no functional bonding unless the module datasheet specifies it. The cert evidence bundle records the design decision and the supporting manufacturer datasheets',
      'Bond everywhere',
      'No earthing at all',
    ],
    correctAnswer: 1,
    explanation:
      'Functional bonding is module-driven, not inverter-driven. The galvanically-isolated inverter creates the SAFE CONDITION for functional bonding (if needed); the module manufacturer datasheet specifies whether bonding is REQUIRED. Most standard crystalline modules don\'t require functional bonding. Some high-efficiency modules (certain SunPower, certain n-type / TOPCon, thin-film) require positive or negative bonding for performance. The cert evidence bundle records the design decision, citing the module datasheet and the inverter manufacturer compatibility.',
  },
  {
    id: 6,
    question:
      'Residential property has an existing BS EN 62305 LPS with air-termination grid covering the roof. PV array placement?',
    options: [
      'Above the LPS air terminations',
      'Within the LPS protected zone, with adequate separation distance per BS EN 62305-3. The PV array tips must not protrude above the LPS air termination level (would expose them to direct strike). The PV bonding conductor connects to the LPS bonding network at a single point. SPDs on both DC and AC sides per BS EN 62305-4. LPS specialist review for commercial / industrial; informed competent installer for typical domestic',
      'Anywhere',
      'On the chimney',
    ],
    correctAnswer: 1,
    explanation:
      'PV on a property with existing LPS per BS EN 62305: PV array must be within the LPS protected zone (cone of protection cast by the air termination grid) — array tips do NOT protrude above the air termination level. PV bonding connects to the LPS bonding network at a single point. SPDs on DC and AC per BS EN 62305-4. The standard ensures the LPS continues to protect the property AND protects the PV install from direct strike and induced EMP.',
  },
  {
    id: 7,
    question:
      'A metal-sheet roof install. After install, the cert evidence bundle records "metal sheet bonded to supplementary bonding network". Why might this be necessary?',
    options: [
      'It\'s never necessary',
      'The metal sheet may become an extraneous-conductive-part — electrically connected to the building structure (e.g. via the bonded mounting rails) and at a potential that could carry fault current. Per BS 7671 Section 411 supplementary bonding requirements, where its resistance to true earth is below the trigger threshold AND it could carry fault current, bonding to the supplementary bonding network is required. The cert evidence bundle records the resistance measurement and the bonding decision',
      'Metal sheets always need bonding regardless',
      'Customer\'s preference',
    ],
    correctAnswer: 1,
    explanation:
      'A metal-sheet roof becomes an extraneous-conductive-part when its electrical context makes it a fault-current path with low resistance to true earth. On a PV install: the bonded mounting rails connect the sheet to the equipotential bonding network of the array, which in turn connects to the building MET. If the sheet\'s resistance to true earth is below the BS 7671 trigger threshold, it becomes extraneous and supplementary bonding is required. The cert evidence bundle records the measurement, the trigger threshold comparison, and the bonding conductor sizing (4-6 mm² typical, BS 7671 Table 54.8 minimum sizes).',
  },
  {
    id: 8,
    question:
      'The PWI common-mistakes list flags four high-frequency bonding / lightning faults on UK PV installs. What are they?',
    options: [
      'None',
      '(1) Functional bonding applied on transformerless inverter (creating fault path); (2) Multiple bonding points creating earth loops; (3) Large lightning loop from DC + bonding routed separately; (4) Missing SPDs on DC and AC sides. Each is a Reg 712.421 / 712.542.102 / 712.521.102 concern and a high-frequency MCS audit finding',
      'Customer satisfaction',
      'Module colour',
    ],
    correctAnswer: 1,
    explanation:
      'PWI common-mistakes on UK PV bonding / lightning: (1) Functional bonding applied on transformerless inverter — creates fault path through inverter, dangerous; (2) Multiple bonding points — earth loops, EMI, lightning hazard; (3) Large lightning loop — DC and bonding routed separately, captures EMP; (4) Missing SPDs — inverter damage on nearby strike. Each is covered by Section 712 and a high-frequency MCS audit finding. The competent install applies single-point functional bonding only where module manufacturer specifies AND inverter has galvanic isolation; routes DC and bonding side-by-side; fits SPDs on DC and AC; records all decisions in the cert evidence bundle.',
  },
];

const faqs = [
  {
    question: 'What\'s the difference between functional bonding, protective earthing, and equipotential bonding?',
    answer:
      'Three different things on the PV side: (1) PROTECTIVE EARTHING (CPC) — earth conductor connected to exposed-conductive-parts (the inverter chassis, the metal enclosure of the combiner) so that fault current returns safely. Mandatory wherever Class I equipment is used. (2) EQUIPOTENTIAL BONDING — bonding conductors connect all metal frames / structures together (module frames, mounting rails) so they\'re at the same potential. Achieves safety in fault conditions and lightning equipotentialisation. Mandatory on PV installs. (3) FUNCTIONAL BONDING (Reg 712.542.102) — optional bonding of one DC polarity to earth for system functional reasons (manufacturer-specified performance). Only safe with galvanically-isolated inverters; only applied when module manufacturer specifies.',
  },
  {
    question: 'How does the inverter manufacturer specify whether functional bonding is required or permitted?',
    answer:
      'The inverter datasheet states the topology: "transformerless" or "galvanically isolated" (transformer-isolated). If transformerless, the inverter datasheet typically prohibits functional bonding (or has specific certification for use with bonded-required modules). If galvanically-isolated, the inverter datasheet permits functional bonding of one DC polarity to earth — typically specifying the maximum allowed leakage current and the recommended bonding point. The cert evidence bundle records the inverter datasheet section and the chosen design decision.',
  },
  {
    question: 'What size conductor is used for PV equipotential bonding?',
    answer:
      'BS 7671 Table 54.8 specifies the minimum bonding conductor cross-section. For PV: typically 4 mm² minimum for module-frame-to-rail (where the rail provides electrical continuity), 6 mm² minimum for rail-to-MET (the dedicated bonding conductor from the rail down to the building main earthing terminal). For large arrays or special structural cases, may need to be larger. The cert evidence bundle records the conductor size and the routing.',
  },
  {
    question: 'Where is the array bonding conductor terminated at the building side?',
    answer:
      'Two options: (a) at the building Main Earthing Terminal (MET) — the central earthing point in the consumer unit, where all bonding and earthing converges; (b) at a dedicated PV earth bar adjacent to the inverter, which is then connected to the MET. Both are acceptable; the second is more common in installs with a long inverter-to-CU distance, providing a local earth bar for the PV. The MCS MIS 3002 design pack records the termination point.',
  },
  {
    question: 'How are SPDs specified for PV DC and AC sides?',
    answer:
      'DC-side SPDs: BS EN 61643-31 (formerly BS EN 50539-11), Type-2 (Class II) for typical UK residential. Installed in the combiner box or at the inverter DC input. Spec: nominal discharge current In = 5-20 kA, maximum discharge current Imax = 20-40 kA, voltage protection level Up ≤ inverter max DC input × 0.8 typical. AC-side SPDs: BS EN 61643-11, Type-2 (Class II) for typical UK residential. Installed at the consumer unit or inverter AC output. Spec: similar In / Imax / Up criteria to DC. Section 6 covers AC-side SPDs in detail. Both DC and AC SPDs are sacrificial — replaced after a strike event; visual / electrical inspection at the 5-yearly customer service.',
  },
  {
    question: 'Does the PV array need its own dedicated lightning protection?',
    answer:
      'For typical UK domestic PV: no dedicated LPS unless the property already has one. Reg 712.521.102 lightning-loop minimisation, single-point bonding, and SPDs on DC and AC sides provide the protection. For commercial / industrial PV (large arrays, exposed locations, high-altitude sites), dedicated LPS per BS EN 62305 is often added — air terminations above the array, bonding to the LPS network, SPDs at multiple zones. The structural / risk-assessment context dictates; competent installer assessment for typical domestic; LPS specialist for larger.',
  },
  {
    question: 'How does PV bonding interact with PME (Protective Multiple Earthing) supplies?',
    answer:
      'UK domestic supplies are typically PME (TN-C-S in the BS 7671 nomenclature, with new A4:2026 update to "TN-C-S (PNB)" — Protective Neutral Bonded). PV bonding integrates with PME the same way as any other Class I equipment: the array bonding conductor connects to the building Main Earthing Terminal (MET) which is bonded to the PME earth at the supply point. No special handling on standard domestic. For commercial / industrial with separate earthing arrangements (TT, IT), the bonding strategy follows the building arrangement. The cert evidence bundle records the supply earthing type and the PV bonding integration.',
  },
  {
    question: 'What\'s the install discipline for routing DC + bonding conductors together?',
    answer:
      'Standard practice: DC positive conductor, DC negative conductor, and equipotential bonding conductor all routed together — same conduit, same containment, strapped together at intervals. This minimises the lightning loop area to a few square millimetres. Avoid: routing DC up one side of the roof and bonding up the other; running DC in the loft void on one side and bonding outside the eaves on the other. The design pack records the route plan; install photos evidence the side-by-side routing.',
  },
  {
    question: 'How does the IET CoP for Grid-Connected Solar PV Installations cover bonding and lightning?',
    answer:
      'The IET CoP (5th edition) provides detailed operational guidance for: (1) module frame bonding via mounting rail; (2) when functional bonding per Reg 712.542.102 applies; (3) single-point bonding discipline; (4) lightning-loop minimisation per Reg 712.521.102 — routing recommendations, sketch examples; (5) SPD selection per BS EN 61643-11 / 61643-31; (6) integration with existing LPS per BS EN 62305. The MCS MIS 3002 design pack often references the IET CoP as the operational source.',
  },
];

export default function RenewableEnergyModule3Section5() {
  const navigate = useNavigate();

  useSEO({
    title:
      'Functional bonding, DC earthing & lightning | Renewable Energy 3.5 | Elec-Mate',
    description:
      'PV bonding and lightning protection — Reg 712.542.102 functional bonding (galvanic isolation conditions, single-point), Reg 712.521.102 lightning-loop minimisation, equipotential bonding, SPDs per BS EN 61643, and BS EN 62305 LPS integration.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../renewable-energy-module-3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 3
          </button>

          <PageHero
            eyebrow="Module 3 · Section 5 · BS 7671:2018+A4:2026"
            title="Functional bonding, DC earthing & lightning"
            description="Reg 712.542.102 functional bonding (galvanic isolation conditions, single-point), Reg 712.521.102 lightning-loop minimisation, equipotential bonding of the array, SPDs per BS EN 61643, and BS EN 62305 LPS integration."
            tone="yellow"
          />

          <TLDR
            points={[
              'Three different bonding concepts: PROTECTIVE EARTHING (CPC for Class I equipment); EQUIPOTENTIAL BONDING (frames / rails / structure at same potential — Reg 712.542.101); FUNCTIONAL BONDING (Reg 712.542.102, one DC polarity to earth for system performance — galvanic-isolation conditions only). Reg 712.312.2 is the foundational permission: DC live-conductor earthing IS permitted with simple AC/DC separation.',
              'Reg 712.542.102 functional bonding applies ONLY when (a) inverter is galvanically isolated (transformer between DC and AC), AND (b) module manufacturer specifies functional bonding. Single-point only — multiple bonds create earth loops. The transformer winding connected to the inverter shall NOT be earthed; the bonding is located between the disconnection device and the inverter DC connection.',
              'Reg 712.2: where functional bonding applied, the automatic disconnecting device in the functional bonding conductor is sized per the table — ≤25 kW = 1 A; >25-50 kW = 2 A; >50-100 kW = 3 A; >100-250 kW = 4 A; >250 kW = 5 A. This device satisfies Reg 712.421.101.2 (fault-current interruption) and substitutes for the standalone IMD under Reg 712.421.101.1.',
              'Transformerless inverters (most modern UK domestic) have NO galvanic isolation — functional bonding NOT permitted (creates fault path through the inverter). Some inverters are specifically certified for use with bonded-required modules without applied bonding — verify manufacturer compatibility.',
              'Reg 712.521.102 lightning-loop minimisation: route DC and equipotential bonding conductors SIDE BY SIDE along the same path, minimising enclosed area. A large lightning loop captures EMP energy from nearby strikes, inducing damaging voltages.',
              'Module frame bonding via mounting rail (rail is electrically continuous when assembled to manufacturer spec); single bonding conductor from rail to the inverter / MET (typically minimum 4 mm² copper equivalent (Reg 712.542.3.101), green/yellow per BS 7671 Table 54.8).',
              'SPDs on DC (BS EN 61643-31) and AC (BS EN 61643-11) sides — Type-2 for typical UK residential. Coordinate with existing BS EN 62305 LPS where present. PWI common-mistakes: bonding on transformerless, multiple bond points, large lightning loop, missing SPDs.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Distinguish functional bonding (Reg 712.542.102), protective earthing, and equipotential bonding on the PV side.',
              'Apply Reg 712.542.102 — when galvanic isolation conditions and module manufacturer specs require / permit functional bonding, single-point.',
              'Apply Reg 712.521.102 — route DC and equipotential bonding side-by-side to minimise the lightning loop area.',
              'Specify the module frame bonding arrangement — mounting rail electrical continuity + single bonding conductor to the building MET.',
              'Select SPDs for DC (BS EN 61643-31) and AC (BS EN 61643-11) sides; coordinate with existing LPS per BS EN 62305 where present.',
              'Avoid the four PWI common-mistakes: functional bonding on transformerless, multi-point bonding, large lightning loop, missing SPDs.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>Single-point bonding. DC and bonding side-by-side. SPDs on both sides.</Pullquote>

          <ContentEyebrow>Three bonding concepts — keep them straight</ContentEyebrow>

          <ConceptBlock
            title="Protective earthing vs equipotential bonding vs functional bonding"
            plainEnglish="Three different things on the PV side. Protective earthing handles fault current; equipotential bonding handles touch voltage in fault conditions and lightning equipotentialisation; functional bonding (Reg 712.542.102) is optional polarity bonding for specific module / inverter combinations."
            onSite="Easy to confuse — they all involve green / yellow conductors going to earth. The competent design pack documents each separately."
          >
            <p>The three concepts:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Protective earthing (CPC)</strong> — earth conductor to exposed-conductive-parts of Class I equipment (inverter chassis, metal combiner enclosure). Provides fault-current return path. Mandatory for Class I equipment</li>
              <li><strong className="text-white">Equipotential bonding</strong> — bonding conductors connect all metal structures (module frames, rails, metal mounting structure) so they\'re at the same potential. Achieves safety in fault conditions and lightning equipotentialisation. Mandatory on PV installs</li>
              <li><strong className="text-white">Functional bonding (Reg 712.542.102)</strong> — optional bonding of one DC polarity to earth for system functional reasons. ONLY safe with galvanically-isolated inverters. ONLY applied when module manufacturer specifies. Single-point only</li>
              <li><strong className="text-white">Supplementary bonding</strong> — additional bonding of extraneous-conductive-parts where the structural / electrical context makes them fault-current paths. May apply to metal-sheet roof surfaces</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Equipotential bonding via the mounting rail — the standard UK approach"
            plainEnglish="Module frames are bonded together via the mounting rail. The rail is electrically continuous when correctly assembled (manufacturer torque + anti-corrosion gel at joints). A single bonding conductor from the rail to the building earthing system completes the equipotential network."
            onSite="The rail-based approach is universal on UK domestic PV — saves running individual bonding conductors per module. The discipline: rail joints must be electrically continuous (continuity test per BS EN 62446-1 — Section 7); anti-corrosion gel applied per manufacturer spec; bonding conductor secured at the rail with a manufacturer-supplied clamp or lug."
          >
            <p>The equipotential bonding workflow:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Module frame to rail</strong> — module clamp provides electrical contact between the frame and the rail. Manufacturer-specified clamp + torque</li>
              <li><strong className="text-white">Rail-to-rail joints</strong> — rail joiners with anti-corrosion gel; electrical continuity tested per BS EN 62446-1 commissioning</li>
              <li><strong className="text-white">Rail to bonding conductor</strong> — manufacturer-supplied lug or clamp on the rail; bonding conductor (typically minimum 4 mm² copper equivalent (Reg 712.542.3.101), green/yellow per BS 7671 Table 54.8)</li>
              <li><strong className="text-white">Bonding conductor route to inverter</strong> — alongside the DC conductors (minimise lightning loop per Reg 712.521.102); same conduit / containment where possible</li>
              <li><strong className="text-white">Termination at inverter / MET</strong> — single point; either at inverter earth terminal or at building MET (or local PV earth bar feeding the MET)</li>
            </ul>
          </ConceptBlock>

          <EquipotentialBonding
            caption="PV equipotential bonding system diagram — top-down view of array with mounting rails. Each module frame clamped to rail; rail-to-rail joints with anti-corrosion gel; single bonding conductor from rail to inverter location; bonding conductor routed alongside DC conductors (loop minimisation per Reg 712.521.102); termination at building MET. Annotated with conductor sizes and BS 7671 Table 54.8 reference."
          />

          <InlineCheck {...inlineChecks[4]} />

          <SectionRule />

          <ContentEyebrow>Reg 712.542.102 — functional bonding (galvanic isolation conditions)</ContentEyebrow>

          <Pullquote>Galvanic isolation. Module manufacturer-specified. Single point. Otherwise: don\'t.</Pullquote>

          <ConceptBlock
            title="What functional bonding does — and the strict conditions"
            plainEnglish="Functional bonding = bonding one DC polarity (positive or negative) to earth. Done for system functional reasons specified by the module manufacturer: leakage detection, performance optimisation on some high-efficiency cell technologies, or galvanic isolation reinforcement."
            onSite="Two strict conditions per Reg 712.542.102: (1) the inverter has galvanic isolation between DC and AC (a transformer); (2) the module manufacturer specifies the bonding. Without BOTH conditions, functional bonding is not applied — it would create a fault path through the inverter on transformerless designs."
          >
            <p>When functional bonding is applied:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Module manufacturer datasheet specifies it</strong> — typically marked "negative pole earthed" or "positive pole earthed" — some SunPower, some n-type / TOPCon, some thin-film modules</li>
              <li><strong className="text-white">Inverter is galvanically isolated</strong> — transformer between DC and AC stages. Inverter datasheet states "transformer-isolated" or "galvanic isolation"</li>
              <li><strong className="text-white">Single bonding point</strong> — at the combiner or inverter; not at module level; not at multiple points (multiple = earth loops, EMI, lightning hazard)</li>
              <li><strong className="text-white">Bonding conductor</strong> — connected from the specified DC polarity to the building earthing system; sized per BS 7671 Table 54.8</li>
              <li><strong className="text-white">Cert evidence bundle</strong> — records the manufacturer datasheets (module + inverter), the design decision, the single bonding-point location and conductor size</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Transformerless inverter compatibility with bonded-required modules"
            plainEnglish="Modern UK domestic inverters are typically transformerless. Some modules require functional bonding. These would normally be incompatible — but specialised modern transformerless inverters include internal circuitry (active leakage detection / interruption) that allows safe use with bonded-required modules WITHOUT applying functional bonding."
            onSite="The manufacturer compatibility statement is critical. If the module datasheet says 'negative bonding required' and the inverter datasheet says 'compatible with negative-bonding-required modules in unbonded configuration' — this is valid, no functional bonding applied, internal circuitry handles the leakage. Without the explicit compatibility statement, this combination is incompatible."
          >
            <p>The design pack for these cases:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Module datasheet</strong> — extracts showing the bonding requirement</li>
              <li><strong className="text-white">Inverter datasheet</strong> — extracts showing the compatibility statement</li>
              <li><strong className="text-white">Design decision</strong> — &ldquo;functional bonding not applied; inverter internal circuitry provides the manufacturer-specified leakage management&rdquo;</li>
              <li><strong className="text-white">Cross-check at commissioning</strong> — inverter setting matches the module type; leakage detection thresholds verified</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 712.312.2 — DC live-conductor earthing permission"
            clause="Earthing of one of the live conductors of the DC side is permitted, if there is at least simple separation between the AC side and the DC side. NOTE: Any connections with Earth on the DC side should be connected so as to avoid corrosion (see BS EN 13636 and BS EN 15112)."
            meaning="Reg 712.312.2 is the foundational reg that permits DC live-conductor earthing (i.e. functional bonding). It establishes the principle; Reg 712.542.102 sets the detailed arrangement. The corrosion note matters in practice — DC-side earth connections in damp / outdoor environments can corrode without proper material selection (BS EN 13636 cathodic protection for steel structures; BS EN 15112 monitoring of cathodic protection). The cert evidence bundle records the earthing arrangement and corrosion-prevention measures."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 712.542.102 — functional bonding arrangements on the DC side"
            clause="A live conductor of the DC side of the inverter may be bonded only if there is galvanic isolation between the AC installation and the DC side provided by means of a transformer having electrically separate windings. The transformer may be either internal or external to the inverter. The transformer winding connected to the inverter shall not be earthed, and the inverter shall be suitable for this. The bonding shall be made at a single point of the DC side of the inverter. The bonding shall be located between the disconnection device and the DC connection means of the inverter."
            meaning="Reg 712.542.102 sets the strict conditions for DC functional bonding: galvanic isolation by transformer with electrically separate windings; the inverter-side transformer winding shall NOT be earthed; the inverter must be suitable for this arrangement; bonding at a SINGLE POINT only; physically located BETWEEN the disconnection device and the DC connection means of the inverter (not at module level, not at the combiner upstream of the disconnect). Most modern transformerless installs do NOT use functional bonding. Reg 712.542.3.101 sets the functional bonding conductor minimum CSA at 4 mm² copper equivalent (insulated or bare). The cert evidence bundle records the design decision and the single bonding-point location."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 712.2 — Rated current of automatic disconnecting device in the functional bonding conductor"
            clause="Total PV array power rating (peak value) | Maximum rated current I_n of the automatic disconnecting device. ≤25 kW: 1 A. >25-50 kW: 2 A. >50-100 kW: 3 A. >100-250 kW: 4 A. >250 kW: 5 A."
            meaning="When functional bonding per Reg 712.542.102 is applied, an automatic disconnecting device is installed in the functional bonding conductor to interrupt fault current per Reg 712.421.101.2 (the IMD-exception clause). Reg 712.2 sizes the device: for typical UK residential (≤25 kW peak), maximum 1 A rated current; for commercial installs the table scales up. The device is the practical embodiment of the Reg 712.421.101.2 fault-current-interruption-means requirement. The cert evidence bundle records the device manufacturer, model, and rated current against the array peak power."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 712.542.101 — Equipotential bonding of PV metal structures"
            clause="Where equipotential bonding is necessary to prevent the accumulation of electrostatic charge, the metallic structures supporting the PV modules including the metallic cable management systems shall be bonded. The bonding conductor shall be connected to any suitable earthing terminal. Where metal structures are of aluminium, appropriate terminations are necessary to prevent electrolytic corrosion."
            meaning="Reg 712.542.101 is the equipotential-bonding-for-electrostatic-prevention rule (separate from functional bonding under 712.542.102). PV mounting structures and metal cable management shall be bonded; conductor connects to a suitable earthing terminal. Aluminium structures (typical mounting rails) require corrosion-protected terminations — usually stainless-steel bimetallic clamps or specified lugs from the rail manufacturer. The cert evidence bundle records the bonding arrangement and the rail-manufacturer-spec termination."
          />

          <InlineCheck {...inlineChecks[0]} />

          <InlineCheck {...inlineChecks[1]} />

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>Reg 712.521.102 — lightning-loop minimisation</ContentEyebrow>

          <Pullquote>DC and bonding side-by-side. Same conduit if possible. Minimise the loop area.</Pullquote>

          <ConceptBlock
            title="What the lightning loop is — and why it matters"
            plainEnglish="The lightning loop = the area enclosed by the DC conductor path and the equipotential bonding conductor running in parallel. A large loop captures EMP energy from nearby lightning strikes, inducing damaging voltages across the loop."
            onSite="A nearby lightning strike (not direct, but within hundreds of metres) generates a rapidly-changing magnetic field. Per Faraday\'s law, this induces voltage in any closed loop the field passes through. A large PV-side loop (DC on one side of the roof, bonding on the other, several square metres of enclosed area) can induce kV-range voltages — damaging the inverter, modules, and downstream equipment."
          >
            <p>The mitigation per Reg 712.521.102:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Route DC + bonding side-by-side</strong> — same path from array to inverter / combiner. Minimises the enclosed area to a few square millimetres</li>
              <li><strong className="text-white">Same conduit / containment</strong> — when practical, route DC positive, DC negative, and equipotential bonding conductor in the same conduit or strapped together</li>
              <li><strong className="text-white">Avoid splitting</strong> — don\'t take the bonding conductor down one side of the roof while the DC goes the other; don\'t route bonding outside the building while DC is inside</li>
              <li><strong className="text-white">Cable strapping</strong> — where conductors can\'t share a conduit, strap them together at intervals (typically every 1-2 m)</li>
              <li><strong className="text-white">Multi-conductor cable</strong> — some PV cable manufacturers offer cables with integrated positive, negative, and bonding conductors in a single sheath — automatically achieves minimal loop area</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 712.521.102 — lightning loop minimisation"
            clause="DC conductors and equipotential bonding conductors of the PV system shall be installed close together along the same route, so as to minimise the enclosed loop area that could capture lightning-induced electromagnetic energy. Where this is not reasonably practicable, surge protective measures shall be enhanced accordingly."
            meaning="Reg 712.521.102 mandates side-by-side routing of DC and bonding conductors. The minimised loop area reduces the EMP energy captured during nearby lightning strikes, reducing induced voltage damage. Where side-by-side routing isn\'t practical, additional SPDs / higher-spec SPDs compensate. The cert evidence bundle records the routing decision; install photos evidence the side-by-side arrangement."
          />

          <LightningLoop
            caption="Lightning-loop minimisation diagram — two side-by-side panels. Panel 1 (incorrect): DC cable routed up one side of roof, bonding conductor up the other side, large enclosed loop area (several square metres) — captures EMP. Panel 2 (correct): DC and bonding side-by-side in same conduit, loop area minimised to a few mm². Annotated with Faraday\'s law and Reg 712.521.102."
          />

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>SPDs — surge protective devices on DC and AC sides</ContentEyebrow>

          <Pullquote>Type-2 SPDs typical UK residential. Sacrificial. Replace after a strike event.</Pullquote>

          <ConceptBlock
            title="SPD selection for typical UK residential PV"
            plainEnglish="SPDs limit induced voltage spikes during nearby lightning strikes. PV needs SPDs on both DC and AC sides. Typical UK residential: Type-2 (Class II) SPDs at the combiner / inverter (DC) and at the consumer unit / inverter AC output (AC)."
            onSite="SPDs are sacrificial — they take the spike, fail short, and need replacing after a strike event. Visual / electrical inspection at the 5-yearly customer service. The cert evidence bundle records the SPD brand, model, ratings, and the install date for the replacement cycle."
          >
            <p>SPD specifications:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">DC-side SPD per BS EN 61643-31</strong> — formerly BS EN 50539-11. Type-2 (Class II) for typical residential. In = 5-20 kA, Imax = 20-40 kA, Up ≤ inverter max DC × 0.8</li>
              <li><strong className="text-white">AC-side SPD per BS EN 61643-11</strong> — Type-2 (Class II) for typical residential. Same In / Imax / Up criteria scaled to AC voltage</li>
              <li><strong className="text-white">Location DC</strong> — at the combiner box or at the inverter DC input. Closer to the array entry point is better (catches the spike before it propagates)</li>
              <li><strong className="text-white">Location AC</strong> — at the consumer unit (covers the AC circuit feeding the inverter) OR at the inverter AC output (covers the inverter AC stage)</li>
              <li><strong className="text-white">Indicator</strong> — SPDs have a status window / flag indicating whether they\'ve operated. Routine visual inspection checks the status. After a known strike event, electrical test to confirm function</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 712.534.102 / 712.534.102.1 / 712.534.102.4 — DC-side SPDs"
            clause="712.534.102: SPDs installed on the DC side of the PV installation shall comply with BS EN 61643-31. When the inverter incorporates SPDs on the DC side, they are considered as fulfilling the surge protective function only if the manufacturer of the inverter specifies their suitability for use for the DC side of PV installation. Otherwise, protection shall be provided. 712.534.102.1: Generally, SPDs shall be Type 2. If protection against effects of direct lightning strokes is specified and separation distance, s, is not kept in accordance with BS EN 62305-3, Type 1 SPDs shall be used (generally in conjunction with Type 2 SPDs). 712.534.102.4: The minimum value of nominal discharge current Insd of Type 2 SPDs shall be 5 kA."
            meaning="DC-side SPDs per BS EN 61643-31; Type 2 is the default; Type 1 only required where direct-strike LPS separation isn\'t maintained. Inverter-integrated SPDs satisfy the requirement only where the inverter manufacturer explicitly states their suitability for PV DC. Strict minimum nominal discharge current I_nspd ≥ 5 kA for Type 2 (the 5-20 kA range I quoted is realistic in market product; 5 kA is the regulatory minimum). Reg 712.534.101 separately requires PV systems within an LPS protected volume to maintain separation per BS EN 62305-3."
          />

          <ConceptBlock
            title="Integration with existing BS EN 62305 Lightning Protection System"
            plainEnglish="Properties with existing external LPS (commercial / industrial / some heritage / certain rural / high-risk domestic) need the PV install coordinated with the LPS per BS EN 62305-3. PV array within the LPS protected zone; PV bonding connects to LPS bonding network at a single point; SPDs per BS EN 62305-4."
            onSite="For typical UK domestic, no existing LPS — Reg 712.521.102 lightning-loop minimisation + Type-2 SPDs are the standard protection. For property with existing LPS, the LPS specialist / structural engineer review at design stage is standard."
          >
            <p>LPS integration workflow:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Confirm LPS class</strong> — BS EN 62305 LPS classes I-IV based on risk assessment. Higher class = closer-spaced air terminations</li>
              <li><strong className="text-white">PV within protected zone</strong> — air-termination grid casts a cone of protection; PV array entirely within the cone (array tips not above air terminations)</li>
              <li><strong className="text-white">Separation distance</strong> — minimum separation between PV components and LPS air terminations per BS EN 62305-3 (typically 0.5-1 m depending on risk class)</li>
              <li><strong className="text-white">Bonding integration</strong> — PV equipotential bonding connects to LPS bonding network at a single point</li>
              <li><strong className="text-white">SPDs per BS EN 62305-4</strong> — multi-zone SPD strategy (Type-1 at LPS interface, Type-2 at PV combiner / inverter, etc.)</li>
              <li><strong className="text-white">Cert evidence bundle</strong> — records the LPS class, the integration design, the SPD strategy, and the structural / electrical sign-off</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[5]} />

          <InlineCheck {...inlineChecks[6]} />

          <InlineCheck {...inlineChecks[7]} />

          <SectionRule />

          <ContentEyebrow>What it looks like in the wild</ContentEyebrow>

          <Scenario
            title="Customer\'s install was specified with functional bonding on a transformerless inverter — find and fix"
            situation="An EICR-style PV review reveals the previous installer applied functional bonding (negative-to-earth) on an install with a transformerless inverter. The install has been operational for 18 months without obvious symptoms but the configuration violates Reg 712.542.102."
            whatToDo="Document the finding. The configuration creates a fault path through the inverter on transformerless designs — leakage current flows from DC negative through the bonding conductor to earth, and back through the inverter\'s AC neutral to PEN. The inverter\'s leakage-detection circuitry may be tripping the inverter offline intermittently (yield loss) or the leakage may be exceeding safe levels (electrical safety concern). Rectification: (a) remove the functional bonding (isolate the polarity-to-earth connection at the single bonding point); (b) verify that the module manufacturer\'s spec is satisfied (some modules require functional bonding — if so, substitute a transformer-isolated inverter or use a transformerless inverter with manufacturer-certified compatibility for unbonded use). The cert evidence bundle records the rectification."
            whyItMatters="PWI common-mistakes #1 on bonding. The competent installer reads BOTH the module datasheet (does it require bonding?) AND the inverter datasheet (is it galvanically isolated?) BEFORE specifying. Reg 712.542.102 sets the strict conditions; bypassing them creates ongoing electrical safety and performance issues."
          />

          <Scenario
            title="Customer\'s install has DC cable on one side of roof, bonding on the other — large lightning loop"
            situation="An EICR-style inspection reveals the previous installer routed the DC cable along the south side of the roof to the inverter, and the bonding conductor along the north side. The enclosed loop area is approximately 8 m². The customer reports inverter failures after nearby lightning storms — 3 failures in 5 years."
            whatToDo="Diagnose: large lightning loop per Reg 712.521.102. The 8 m² loop captures significant EMP energy during nearby strikes — induced voltage on the DC side stresses the inverter input components, leading to repeated failure. Rectification: (a) reroute the bonding conductor alongside the DC cable, minimising the loop area to a few mm²; (b) verify Type-2 SPDs on DC and AC sides — replace if degraded / operated; (c) re-energise and monitor. Customer informed; warranty claim against the original installer for design fault. The cert evidence bundle records the rectification and references Reg 712.521.102."
            whyItMatters="Lightning loops cause repeated inverter failure and customer dissatisfaction. The competent design routes DC + bonding side-by-side from day-one; install photos evidence the routing. Reg 712.521.102 is operationalised through the IET CoP routing guidance."
          />

          <CommonMistake
            title="Module manufacturer\'s functional-bonding requirement missed at design stage"
            whatHappens="An installer specifies high-efficiency SunPower modules and a standard transformerless inverter without checking the module datasheet for functional-bonding requirements. Install commissions; inverter\'s leakage-detection trips offline intermittently; modules underperform; warranty void. Customer dissatisfied; rectification costs to substitute inverter or re-engineer the install."
            doInstead="Always read the module datasheet for functional-bonding requirements at design stage. Cross-check against the inverter datasheet for: (a) galvanic isolation; OR (b) explicit manufacturer-certified compatibility with bonded-required modules in unbonded configuration. The design pack records the cross-check and the design decision."
          />

          <CommonMistake
            title="Multiple bonding points creating earth loops"
            whatHappens="An installer bonds the array at the combiner box, at the inverter, AND at the consumer unit — &ldquo;multiple bonds for safety&rdquo;. Reg 712.542.102 mandates single-point. The multiple bonds create earth loops, circulating currents, electromagnetic interference, and lightning-loop hazard. Inverter telemetry shows ground-loop voltage / current; potentially affects inverter MPPT performance."
            doInstead="Single-point bonding only. The competent design specifies the single bonding point at design stage (typically at the inverter or near the MET) and records it in the cert evidence bundle. Multiple bonds are a Reg 712.542.102 violation and a high-frequency MCS audit finding."
          />

          <CommonMistake
            title="Type-1 SPD substituted for Type-2 (or vice versa) — wrong protection class"
            whatHappens="An installer fits Type-1 SPDs (high-energy, for direct-strike LPS interface protection) at the inverter location, where Type-2 SPDs are correct for typical UK residential without external LPS. Or vice versa: Type-2 fitted where Type-1 is needed. Wrong protection class — either over-specified (cost) or under-specified (risk)."
            doInstead="Match SPD class to the install context. Typical UK residential without external LPS: Type-2 SPDs on DC (BS EN 61643-31) and AC (BS EN 61643-11). Property with external LPS: multi-zone SPD strategy per BS EN 62305-4 — Type-1 at LPS interface, Type-2 at PV combiner / inverter. The cert evidence bundle records the SPD class and the install context rationale."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Three bonding concepts: protective earthing (CPC for Class I); equipotential bonding (frames / rails / structure at same potential); functional bonding (Reg 712.542.102, optional polarity-to-earth bonding).',
              'Reg 712.542.102 functional bonding: ONLY when (a) inverter galvanically isolated AND (b) module manufacturer specifies. Single-point only. Most modern transformerless installs do NOT apply functional bonding.',
              'Modern transformerless inverters have no DC-AC galvanic isolation — functional bonding NOT permitted (creates fault path). Some modern inverters certified for bonded-required modules in unbonded configuration via internal leakage management.',
              'Reg 712.521.102 lightning-loop minimisation: route DC + equipotential bonding conductors SIDE BY SIDE along the same path. Minimises enclosed loop area. Captures less EMP energy from nearby lightning strikes.',
              'Module frame bonding via mounting rail (electrical continuity through manufacturer-spec assembly); single bonding conductor (minimum 4 mm² copper equivalent (Reg 712.542.3.101), green/yellow per BS 7671 Table 54.8) from rail to inverter / MET.',
              'SPDs Type-2 on DC (BS EN 61643-31) and AC (BS EN 61643-11) for typical UK residential. Coordinate with existing BS EN 62305 LPS where present (multi-zone Type-1 + Type-2 strategy).',
              'PWI common-mistakes: functional bonding on transformerless, multi-point bonding, large lightning loop, missing SPDs. Each a Reg 712.421 / 712.542.102 / 712.521.102 concern and high-frequency MCS audit finding.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 5 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-3-section-4')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section 4
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                DC cable &amp; fire
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-3-section-6')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                3.6 AC-side &amp; DNO
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
