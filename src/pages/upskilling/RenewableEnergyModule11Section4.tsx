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
    id: 'm11s4-lps-components',
    question:
      'What are the three primary components of an external Lightning Protection System (LPS) per BS EN 62305-3?',
    options: [
      'Only earth rod',
      '(1) Air termination — captures the lightning strike at the top of the structure (rods, mesh, suspended catenaries). (2) Down conductor — carries lightning current safely from air termination to earth (vertical conductors along structure). (3) Earth termination — dissipates the current into the ground (electrodes, ring earth, foundation earth). All three are bonded into a coordinated system + bonded to the structure\'s general equipotential network',
      'Only air termination',
      'Random',
    ],
    correctIndex: 1,
    explanation:
      'BS EN 62305-3 external LPS has three primary components: (1) Air termination system — captures the lightning strike at the highest exposed points of the structure. Forms: rods (Franklin rods), mesh / Faraday cage (horizontal conductor grid on roof), suspended catenaries (overhead wires between supporting masts). Sized + positioned per the rolling sphere method, mesh method, or protection angle method depending on LPL. (2) Down conductor system — carries the lightning current from air termination to earth. Vertical conductors along the structure exterior (copper, aluminium, galvanised steel). Spacing depends on LPL (typically 10-25 m for LPL III). For PV / wind: the mast structure itself may be the down conductor if continuous metallic. (3) Earth termination system — dissipates the lightning current into ground. Forms: earth electrodes (rods + plates), ring earth around the structure, foundation earth in concrete. Earth resistance target typically <10 Ω per BS EN 62305-3 Annex E. All three bonded together + to the structure\'s general equipotential network.',
  },
  {
    id: 'm11s4-pv-bonding',
    question:
      'When a PV array on a building with existing LPS cannot keep separation distance s, what is the bonding requirement?',
    options: [
      'No bonding',
      'PV frame + mounting structure + DC cable shields must be bonded to the LPS at designated points per BS EN 62305-3. The bonding accepts that partial direct lightning current will flow through PV elements — Reg 712.534.102.1 then requires Type 1 SPDs (typically with Type 2 downstream) on the PV DC + AC sides. Bonding conductor: typically 16 mm² copper minimum per BS EN 62305-3; positioned at array corners + at frame intervals; routed to nearest LPS down conductor',
      'Random',
      'Only AC bonding',
    ],
    correctIndex: 1,
    explanation:
      'PV bonding to LPS where s cannot be kept per BS EN 62305-3: (1) Bonding conductor — copper minimum 16 mm² (or equivalent area aluminium / galvanised steel); BS EN 62305-3 Annex specifies minimum cross-section per material + lightning current. (2) Bonding points — array corners + at intervals along frame (typically every 10-15 m); routed to nearest LPS down conductor via the shortest practical path. (3) Cable shield bonding — DC cable shields bonded at both ends (PV side + inverter side) if shielded cables used. (4) Equipotential bonding bar — at building entry, all incoming services (PV DC, AC, signal, telecoms) bonded to a common equipotential bonding bar that ties to the structure\'s main earthing terminal + LPS earth termination. (5) Reg 712.534.102.1 consequence — Type 1 SPDs required (typically with Type 2 downstream) because partial direct lightning current can flow into PV DC system. (6) Cert evidence bundle: bonding diagram + conductor specifications + LPS specialist sign-off + BS 7671 SPD selection record. (7) Bonding does NOT replace SPDs — they work together: bonding equalises potential during strike; SPDs limit residual transient voltage at equipment.',
  },
  {
    id: 'm11s4-wind-mast-lps',
    question:
      'How does LPS apply to a 12 m wind turbine mast in a rural location?',
    options: [
      'No LPS',
      'Tall isolated mast = high lightning attraction. BS EN 62305-3 + IEC 61400-24 apply. Air termination at top of mast (often integrated into the nacelle / blade tips with manufacturer-specified strike protection). Down conductor — the mast structure itself if continuous metallic AND meets BS EN 62305-3 cross-section requirements; otherwise dedicated copper down conductor (50 mm² min) along mast. Earth termination at base — dedicated electrode bonded to local equipotential network. SPDs at building entry for DC + control cables',
      'Random',
      'Indoor only',
    ],
    correctIndex: 1,
    explanation:
      'Wind turbine 12 m mast LPS per BS EN 62305-3 + IEC 61400-24: (1) Lightning attraction — tall isolated structure in open rural terrain = high strike probability. Use BS EN 62305-2 risk assessment to confirm LPL (typically III for small wind, II for larger). (2) Air termination at top — most turbine manufacturers integrate strike protection into the design (blade tip receptors connected via internal down conductor through the blade root + hub to the nacelle base; nacelle itself may be the air termination). IEC 61400-24 specifies the turbine-side strike protection. (3) Down conductor along mast — if mast is continuous metallic (typical steel monopole or tubular) + meets BS EN 62305-3 minimum cross-section (e.g. steel 50 mm² minimum), the mast IS the down conductor. Otherwise dedicated copper 50 mm² along mast. Connection to nacelle base + to earth termination at base. (4) Earth termination at base — dedicated earth electrode (typically multiple rods in array OR ring earth around base) bonded to local equipotential network + bonded to building earth at structure entry. (5) Cable entry to building — DC power + control cables from nacelle to ground control panel; at building entry, Type 1 SPDs (direct partial lightning current possible) typically with Type 2 downstream. (6) Cert evidence bundle: BS EN 62305-2 risk assessment; IEC 61400-24 turbine DoC; BS EN 62305-3 mast LPS design + earth resistance test; BS 7671 SPD + bonding records.',
  },
  {
    id: 'm11s4-earth-resistance',
    question:
      'What earth resistance target does BS EN 62305-3 set for the LPS earth termination?',
    options: [
      'No target',
      'BS EN 62305-3 Annex E recommends earth termination resistance < 10 Ω measured as a low-frequency value. Lower is better. Method: ring earth around structure (Type B arrangement) OR earth rods at down conductor bases (Type A arrangement). For high-resistivity ground (rocky / sandy / dry), achieving 10 Ω may require extended electrode arrays or chemical earth enhancement. Tested at commissioning + on periodic LPS inspection cycle',
      'Always 100 Ω',
      'Random',
    ],
    correctIndex: 1,
    explanation:
      'BS EN 62305-3 Annex E earth resistance: target <10 Ω measured at low frequency (50/60 Hz). The lightning standard wants the LPS earth termination able to dissipate high-current pulses quickly into ground — lower resistance = lower voltage rise on the LPS during a strike = lower spark / sideflash risk to nearby installations + people. (1) Type A arrangement — single earth rods or plates at each down conductor base. Suitable for small structures + good ground conductivity. (2) Type B arrangement — ring earth electrode around the structure (foundation earth, ring trench, or buried conductor ring). Suitable for larger structures + provides equipotential reference for the building. (3) High-resistivity ground — rocky / sandy / dry conditions may make <10 Ω hard to achieve. Solutions: extended electrode arrays; chemical earth enhancement (bentonite, conductive concrete); deep-driven rods. (4) Measurement — fall-of-potential method or clamp meter (newer instruments). Initial commissioning test + periodic re-test per LPS inspection cycle (BS EN 62305-3 Annex E recommends visual + measurement at intervals typically 1-4 years depending on LPL). (5) Cert evidence bundle: earth resistance test report + LPS inspection record.',
  },
];

const quizQuestions = [
  {
    question:
      'A wind turbine manufacturer DoC says the blade tip receptors handle direct strikes per IEC 61400-24 LPL II. What does this mean for the install design?',
    options: [
      'Ignore it',
      'Manufacturer\'s claim is the turbine-side strike protection scope (blade receptors + internal down conductors + hub bonding + nacelle protection). Install design must complete the LPS to ground per BS EN 62305-3: mast down conductor (mast itself if continuous metallic + adequate CSA, otherwise dedicated conductor); earth termination at base (<10 Ω target); building entry SPDs Type 1 with Type 2 for DC + control cables. Manufacturer DoC + LPS specialist + BS 7671 SPD design integrate. Cert evidence bundle: manufacturer DoC + BS EN 62305-3 mast LPS + BS 7671 records',
      'Random',
      'No mast needed',
    ],
    correctAnswer: 1,
    explanation:
      'Turbine manufacturer DoC + IEC 61400-24 cover the turbine-side strike protection: (1) Blade tip receptors — typically metal inserts at blade tips connected via internal down conductors through the blade root to the hub. (2) Hub + main shaft bonding — bonded to the nacelle structure. (3) Nacelle electromagnetic shielding + earthing. (4) Yaw + pitch bearing protection — slip rings or brush contacts to carry lightning current past rotating joints. (5) Tower-top bonding — nacelle base to mast top. The turbine DoC ends at the mast top. The install design must continue per BS EN 62305-3: (a) Mast down conductor — if mast is continuous metallic with adequate cross-section (steel typically 50 mm² minimum equivalent), the mast IS the down conductor. Otherwise dedicated copper. (b) Earth termination at base — <10 Ω target; bonded to local equipotential network + building earth. (c) Building entry SPDs — Type 1 (direct partial current possible) + Type 2 (downstream) for DC power + control cables. (d) Equipotential bonding at building entry — all cables + metallic structures to common bar. Cert evidence bundle: manufacturer DoC + BS EN 62305-3 mast LPS + BS 7671 SPD + bonding records + LPS specialist sign-off. UK 2025-26 small wind: LPS specialist input typical even for domestic-scale (5-10 kW) installs.',
  },
  {
    question:
      'A roof-mounted PV array on a domestic property with NO existing LPS. The customer asks: do I need to add an LPS for the PV? How does the designer answer?',
    options: [
      'Always yes',
      'Usually no. BS EN 62305-2 risk assessment: residential property without LPS, typical UK lightning density (~0.4 strikes/km²/year), low occupancy, no flammable contents — calculated R1 (life) typically below tolerable 10⁻⁵/year without LPS. PV array addition does increase lightning attraction modestly (raised metallic mass on roof) but rarely tips R1 above threshold. R4 (economic — inverter + PV array value) informs SPD decision, not LPS decision. Reg 443 + 534 Type 2 SPDs suffice. Honest customer framing',
      'Random',
      'Always no',
    ],
    correctAnswer: 1,
    explanation:
      'Domestic PV no LPS — honest customer answer is usually "no additional LPS needed". BS EN 62305-2 risk assessment per residential property: (1) R1 (life) — single dwelling, typical occupancy 2-5 people, no fuel / explosives / livestock; ground flash density UK average 0.4 strikes/km²/year (regional variance — Western Scotland higher, Eastern England lower). Calculated R1 typically 10⁻⁶ to 10⁻⁷ per year — well below tolerable 10⁻⁵. (2) Effect of PV array — raised metallic mass on roof increases lightning attraction modestly (collection area increases). Recalculate R1 with PV — typically still below tolerable (residential roof + PV is a small fraction of total UK lightning attraction). (3) R4 (economic) — PV array + inverter + BESS replacement cost £8-15k typical; PV array damage from indirect strike (induced surge) is the main risk; LPS prevents direct strike damage but doesn\'t address induced surge — that\'s SPD scope. (4) Conclusion — LPS rarely required for typical domestic PV; BS 7671 Reg 443 + 534 Type 2 SPDs cover the practical risk. Honest customer framing prevents over-spec + over-cost + maintains trust. Cert evidence bundle: BS EN 62305-2 risk summary + SPD selection rationale + customer-accepted opt-out (if applicable per Reg 443.4.1).',
  },
  {
    question:
      'Reg 542.2.3 NOTE references BS EN 62305-3. What is the regulation context — what is it pointing to?',
    options: [
      'Random',
      'Reg 542.2.3 covers earthing arrangements / earth electrodes. The NOTE references BS EN 62305-3 for earth termination design where the structure has an LPS. Practical implication: where an LPS is present, the BS 7671 earthing arrangement (Reg 542 series) must coordinate with the LPS earth termination per BS EN 62305-3 — typically bonded together as a single equipotential earth system. Earth electrode resistance, bonding, integration with foundation earth — all coordinated. Cert evidence: earth design records cross-reference both standards',
      'Replaces 542',
      'Different topic',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 542.2.3 covers earthing arrangements in BS 7671 + the NOTE references BS EN 62305-3 for LPS earth termination integration. Context: (1) BS 7671 Chapter 54 covers earthing + protective conductors — earth electrode selection, resistance targets, bonding, integration with Means of Earthing supplied by DNO. (2) BS EN 62305-3 covers LPS earth termination — Type A (rods/plates at down conductor bases) or Type B (ring earth around structure) — target resistance <10 Ω. (3) Where structure has LPS — both systems must be designed together. Practical implication: LPS earth termination + BS 7671 main earthing system bonded into a single equipotential earth. The structure has ONE earth system serving both lightning + electrical protection — separate systems would create dangerous potential differences during a strike. (4) Equipotential bonding — main earthing terminal of BS 7671 + LPS earth termination + structural steel + buried services all bonded at a common earth point per BS EN 62305-3 + BS 7671 Reg 411.3 + Reg 411.3.1.2. (5) Cert evidence bundle: earth electrode test (BS 7671) + LPS earth termination test (BS EN 62305-3) + bonding diagram + designer sign-off.',
  },
  {
    question:
      'On a commercial site with multiple PV strings + an LPS, how does the bonding scheme work?',
    options: [
      'No bonding',
      'Bonding scheme per BS EN 62305-3 + BS 7671 Chapter 54: each PV string frame bonded at corners + at intervals (~10-15 m); shielded DC cables bonded at both ends; PV mounting structure bonded to LPS at designated coordination points (where s not kept) OR isolated from LPS (where s kept); inverter chassis + AC switchgear bonded to building main earthing terminal; LPS earth termination bonded to main earthing terminal per Reg 411.3.1.2. Single equipotential earth system serving lightning + BS 7671 protection. Cert evidence: bonding diagram + earth + resistance tests',
      'Random',
      'Each string separate',
    ],
    correctAnswer: 1,
    explanation:
      'Commercial PV multi-string + LPS bonding scheme per BS EN 62305-3 + BS 7671 Chapter 54: (1) PV string frame bonding — each string\'s aluminium / steel frame bonded at corners + at intervals (typically every 10-15 m) using 16 mm² Cu minimum or equivalent. Forms equipotential PV-side mesh. (2) DC cable shields (if used) — bonded at both ends (PV side + inverter side) to support surge return path. (3) PV mounting structure bonding to LPS — at designated coordination points where s cannot be kept (per Reg 712.534.101 + BS EN 62305-3); typically corners of array + at intersections with LPS down conductor positions. (4) Inverter chassis bonding — to inverter local protective earth + via dedicated CPC back to main earthing terminal per BS 7671 Reg 411.4. (5) AC switchgear bonding — to building main earthing terminal. (6) LPS earth termination bonding to main earthing terminal — per Reg 411.3.1.2 + BS EN 62305-3 single-earth principle. (7) Structural steel + buried services bonding to main earthing terminal — Reg 411.3.1.2 protective equipotential bonding. (8) Result: one equipotential earth system serving lightning + BS 7671 protection. (9) Cert evidence bundle: bonding diagram + earth electrode test + LPS specialist sign-off + BS 7671 EIC.',
  },
  {
    question:
      'What is the BS EN 62305-3 inspection cycle for an LPS, and who does it?',
    options: [
      'Never inspect',
      'BS EN 62305-3 Annex E recommends LPS visual + measurement inspection at regular intervals: typically 1 year (LPL I), 2 years (LPL II), 4 years (LPL III/IV) — with detailed inspection cycle proportional to LPL. Visual checks: air termination integrity, down conductor connections, earth electrode condition. Measurement: earth resistance test. Performed by a competent LPS specialist (UK ATLAS-accredited typical) or qualified electrical engineer. Inspection certificate retained with property records + insurance documentation',
      'Random',
      'Monthly only',
    ],
    correctAnswer: 1,
    explanation:
      'BS EN 62305-3 LPS inspection cycle per Annex E: (1) Visual inspection — typically 1 year (LPL I), 2 years (LPL II), 4 years (LPL III/IV). Checks: air termination integrity (no missing rods / damaged mesh / corroded conductors); down conductor mechanical condition (no breaks, corrosion, vandalism); earth electrode visible condition at access points; bonding connections tight + corrosion-free; any visible damage from previous lightning strikes or environmental degradation. (2) Detailed inspection + measurement — typically same intervals or longer cycle for measurement vs visual. Includes: continuity test of LPS conductors; earth electrode resistance test (fall-of-potential or clamp method); bonding integrity test; cross-reference to design records + risk assessment update. (3) After lightning strike — if a strike to the LPS is known to have occurred, an additional out-of-cycle inspection is recommended to verify no damage. (4) Competent performer — UK 2025-26 ATLAS (Association of Technical Lightning + Access Specialists) members are the accredited body; chartered electrical engineers with LPS specialism may also perform. (5) Documentation — LPS inspection certificate retained with property records + insurance documentation + LCT install records. (6) Cert evidence bundle: inspection certificate at handover + scheduled re-inspection dates in customer\'s maintenance plan.',
  },
  {
    question:
      'A customer with a Grade II listed building wants a PV install. What LPS considerations apply?',
    options: [
      'No considerations',
      'Heritage building = R3 (cultural heritage) risk category typically triggers + R1 (life) for visitors / staff. BS EN 62305-2 risk assessment likely warrants LPS or specific protection measures. Visual + planning constraints — heritage typically limits visible LPS hardware. Solutions: discrete air termination (slim rods, hidden mesh); down conductor routing concealed within structure; coordination with Conservation Officer + Listed Building Consent. LPS specialist + heritage architect input + BS 7671 SPD design integrated. Cert evidence: full BS EN 62305 application + planning approval',
      'Random',
      'Demolish',
    ],
    correctAnswer: 1,
    explanation:
      'Grade II listed building PV + LPS scope: (1) Heritage classification — Grade II is a Listed Building under Planning (Listed Buildings + Conservation Areas) Act 1990. R3 (cultural heritage) BS EN 62305-2 risk category applies. R1 (life) also applies (visitors / staff). (2) Risk assessment outcome — heritage buildings + irreplaceable contents typically warrant LPS via BS EN 62305-2 R3 calculation against tolerable 10⁻³/year threshold. (3) Planning + consent — Listed Building Consent required from Local Planning Authority for any work affecting character. Conservation Officer engagement at design stage. (4) Visual + structural constraints — heritage character typically limits visible LPS hardware. Solutions: discrete air termination (slim rods camouflaged with finial style or hidden mesh integrated into roofing); down conductor routing concealed within structure cavities; earth termination + foundation earth integrated with planned works. (5) Multi-trade delivery — LPS specialist + heritage architect + structural engineer + Conservation Officer + designer/electrician. Heritage approach informs every interface. (6) PV interaction with LPS — PV array on heritage roof rare; if approved, full BS EN 62305-3 separation distance application + bonding + Type 1 SPDs per Reg 712.534.102.1. (7) Cert evidence bundle: full BS EN 62305 application + Listed Building Consent + Conservation Officer correspondence + LPS specialist + BS 7671 records.',
  },
];

const faqs = [
  {
    question: 'Can the building\'s steel frame be the LPS down conductor?',
    answer:
      'Yes, per BS EN 62305-3 — structural steel that meets the minimum cross-section requirements (typically equivalent to 50 mm² Cu) + has continuous electrical bonding can serve as the down conductor system ("natural LPS components"). Cert evidence: continuity test from air termination to earth termination via the structural steel; documented as part of LPS design.',
  },
  {
    question: 'What\'s the LPS impact on the BS 7671 earthing arrangement?',
    answer:
      'LPS earth termination + BS 7671 main earthing system are bonded together into a single equipotential earth — Reg 411.3.1.2 protective equipotential bonding + Reg 542.2.3 + BS EN 62305-3 single-earth principle. Separate systems would create dangerous potential differences during a strike. Cert evidence: bonding diagram + earth electrode test report.',
  },
  {
    question: 'How does PV array on a roof affect LPS air termination design?',
    answer:
      'PV adds raised metallic mass — air termination must protect the PV per the rolling sphere / mesh / protection angle method. Either: (a) extend existing air termination to cover the PV (additional rods, mesh extension); OR (b) bond PV frame to LPS (if s cannot be kept) + Type 1 SPDs per Reg 712.534.102.1. Designer + LPS specialist coordinate.',
  },
  {
    question: 'Does a wind turbine mast always need an LPS?',
    answer:
      'Almost always — tall isolated structure = high lightning attraction. BS EN 62305-2 risk assessment confirms. BS EN 62305-3 mast LPS + IEC 61400-24 turbine strike protection. Even small (5 kW) wind turbines on 10-15 m masts in rural locations typically need full LPS application + SPDs at building entry.',
  },
  {
    question: 'How often does LPS inspection happen?',
    answer:
      'Typical intervals per BS EN 62305-3 Annex E: visual + measurement 1 year (LPL I), 2 years (LPL II), 4 years (LPL III/IV). After a known strike: out-of-cycle re-inspection. UK 2025-26: ATLAS-accredited LPS specialist or chartered engineer with LPS competency.',
  },
];

export default function RenewableEnergyModule11Section4() {
  const navigate = useNavigate();

  useSEO({
    title: 'BS EN 62305-3 LPS for PV / wind installs | Renewable Energy 11.4 | Elec-Mate',
    description:
      'External LPS for PV + wind per BS EN 62305-3: air termination, down conductors, earth termination, bonding. PV separation distance s + bonding alternative per Reg 712.534.101 / .102.1. Wind mast LPS + IEC 61400-24.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../renewable-energy-module-11')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 11
          </button>

          <PageHero
            eyebrow="Module 11 · Section 4 · BS EN 62305-3 · LPS for PV / wind · Reg 712.534.101"
            title="BS EN 62305-3 lightning protection for PV / wind installs"
            description="External Lightning Protection System (LPS) per BS EN 62305-3 — air termination, down conductors, earth termination, bonding. PV separation distance s. Bonding alternative per Reg 712.534.101 / .102.1. Wind turbine mast LPS + IEC 61400-24."
            tone="yellow"
          />

          <TLDR
            points={[
              'BS EN 62305-3 covers external Lightning Protection System (LPS) — three primary components: air termination + down conductor + earth termination. All bonded together + to the structure\'s equipotential network.',
              'Air termination methods: rolling sphere, mesh (Faraday cage), protection angle. Method choice + sizing depend on Lightning Protection Level (LPL I-IV).',
              'Down conductors: vertical paths from air termination to earth. Spacing depends on LPL (10-25 m typical for LPL III). Structural steel may serve if continuous + adequate CSA.',
              'Earth termination: <10 Ω target (BS EN 62305-3 Annex E). Type A (rods at down conductor bases) or Type B (ring earth around structure).',
              'PV inside LPS protected volume: maintain separation distance s per Reg 712.534.101. If s not kept, bond PV frame to LPS + add Type 1 SPDs (typically with Type 2) per Reg 712.534.102.1.',
              'Wind turbine: tall isolated structure = high lightning attraction. BS EN 62305-3 mast LPS + IEC 61400-24 turbine strike protection (blade receptors, hub, nacelle). SPDs at building entry.',
              'LPS earth termination + BS 7671 main earthing system bonded as one equipotential earth per Reg 411.3.1.2 + Reg 542.2.3. Single earth serving lightning + electrical protection.',
              'LPS inspection cycle per BS EN 62305-3 Annex E: 1-4 years depending on LPL. UK 2025-26 ATLAS specialist or chartered engineer.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify the three primary components of external LPS per BS EN 62305-3.',
              'Apply air termination methods: rolling sphere, mesh, protection angle for LPL I-IV.',
              'Design down conductor routing + spacing + integration with structural elements.',
              'Set earth termination resistance target + select Type A or Type B arrangement.',
              'Apply separation distance s for PV inside LPS protected volume per Reg 712.534.101.',
              'Specify bonding scheme where s cannot be kept + Type 1 SPDs per Reg 712.534.102.1.',
              'Design wind turbine mast LPS per BS EN 62305-3 + IEC 61400-24.',
              'Coordinate LPS earth termination with BS 7671 main earthing system per Reg 411.3.1.2 + Reg 542.2.3.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>
            Air termination catches the strike. Down conductor carries it. Earth termination disperses it. Bonding equalises everything else. Three jobs, one system.
          </Pullquote>

          <ContentEyebrow>External LPS components per BS EN 62305-3</ContentEyebrow>

          <ConceptBlock
            title="Air termination system — capturing the strike"
            plainEnglish="Air termination is the highest point of the LPS — the part that intercepts the lightning strike before it can hit unprotected structure. Three methods to design air termination: rolling sphere (geometric — sphere of LPL-specific radius rolled across the structure; protected zone is where the sphere cannot touch), mesh / Faraday cage (horizontal conductor grid on roof with LPL-specific spacing), protection angle (cone of protection extending downward from each rod tip at LPL-specific angle)."
            onSite="Most UK commercial / industrial LPS: combination of air termination rods at high points + horizontal mesh conductors on roof for full Faraday-cage coverage. Heritage / aesthetic-sensitive sites use discrete tall rods with rolling-sphere coverage. Wind turbines: blade tip receptors integrated by manufacturer per IEC 61400-24."
          >
            <p>Air termination design methods:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Rolling sphere</strong>
                — geometric method. A sphere of LPL-specific radius is rolled across
                the structure; anywhere the sphere cannot touch is "protected".
                Radius: LPL I = 20 m, II = 30 m, III = 45 m, IV = 60 m. Used for
                complex roof geometries
              </li>
              <li>
                <strong className="text-white">Mesh method</strong>
                — horizontal conductor grid on the roof with LPL-specific spacing.
                Mesh: LPL I = 5 m × 5 m, II = 10 m × 10 m, III = 15 m × 15 m, IV =
                20 m × 20 m. Suitable for flat / large roofs
              </li>
              <li>
                <strong className="text-white">Protection angle</strong>
                — each air termination rod creates a cone of protection downward at
                an LPL- + height-specific angle. Best for simple structures with
                rods at corners + ridges
              </li>
              <li>
                <strong className="text-white">Materials + size</strong>
                — copper minimum 50 mm² (rods + horizontal conductors); aluminium
                75 mm²; galvanised steel 50 mm². BS EN 62305-3 Table 6 specifies
              </li>
              <li>
                <strong className="text-white">Connection</strong>
                — air termination conductors connect to down conductors via low-impedance
                bonded joints. Critical for current path
              </li>
              <li>
                <strong className="text-white">Natural air termination</strong>
                — metallic roof elements (ridge tiles, metal flashing, antennae) may
                serve if adequate cross-section + bonded into the LPS. BS EN 62305-3
                Section 5.2 specifies criteria
              </li>
              <li>
                <strong className="text-white">PV interaction</strong>
                — PV array adds raised metallic mass; air termination must protect
                it OR PV is bonded to LPS (Reg 712.534.101). Designer coordinates
                array layout vs air termination
              </li>
              <li>
                <strong className="text-white">Cert evidence</strong>
                — air termination layout diagram + method (rolling sphere / mesh /
                protection angle) + LPL chosen + material specifications
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Down conductor system — carrying current to earth"
            plainEnglish="Down conductors carry the lightning current from air termination to earth termination. Multiple parallel down conductors share the current — more down conductors = lower current per conductor = lower voltage rise. Spacing: typically 10-25 m around the structure perimeter depending on LPL. Structural steel may serve if continuous + adequate CSA + bonded properly."
            onSite="UK 2025-26 typical: commercial building with LPL III has 4-8 down conductors around perimeter; routed vertically along external walls; concealed where possible (in cavity, behind cladding, internal route in heritage). Bonded at every horizontal floor level + at base to earth termination. Inspection access points at top + bottom."
          >
            <p>Down conductor design + routing:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Spacing</strong>
                — LPL I = 10 m, II = 10 m, III = 15 m, IV = 20 m typical around
                structure perimeter. More conductors = better current sharing kc
                factor for separation distance s
              </li>
              <li>
                <strong className="text-white">Routing</strong>
                — vertical along external walls; shortest practical path from air
                termination to earth; avoid loops (which can induce voltages
                during current pulse)
              </li>
              <li>
                <strong className="text-white">Materials</strong>
                — copper 50 mm² minimum; aluminium 70 mm²; galvanised steel 50 mm²
                equivalent. BS EN 62305-3 Table 6
              </li>
              <li>
                <strong className="text-white">Bonding to floors</strong>
                — at every floor level, the down conductor bonds to the structure\'s
                equipotential bonding bar on that floor. Equalises potential during
                strike
              </li>
              <li>
                <strong className="text-white">Inspection access</strong>
                — at top (connection to air termination) + bottom (connection to
                earth termination); test joint for continuity measurement
              </li>
              <li>
                <strong className="text-white">Structural steel as
                  natural down conductor</strong> — per BS EN 62305-3 Section 5.3.5,
                continuous structural steel (frame, columns) with adequate
                cross-section + electrical continuity may serve as down conductor.
                Common in modern commercial / industrial
              </li>
              <li>
                <strong className="text-white">Wind turbine mast</strong>
                — steel monopole / tubular mast that is continuous + adequate CSA
                serves as the down conductor; otherwise dedicated copper 50 mm²
                routed along mast
              </li>
              <li>
                <strong className="text-white">Cert evidence</strong>
                — down conductor count + spacing + routing diagram + material
                specifications + continuity test report
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 542.2.3 NOTE — Reference to BS EN 62305-3 for earth termination"
            clause="Where the installation forms part of a structure protected by a lightning protection system (LPS), the earthing arrangement shall be coordinated with the LPS earth termination in accordance with BS EN 62305-3."
            meaning="Reg 542.2.3 covers earthing arrangements in BS 7671 — the NOTE confirms that where the structure has an LPS, the BS 7671 earthing system + the BS EN 62305-3 LPS earth termination shall be coordinated. Practical consequence: the structure has ONE earth system. The LPS earth termination + the BS 7671 main earthing system are bonded together + share earth electrodes where practical. Single equipotential earth: separate earths would create dangerous potential differences during a lightning strike. Reg 411.3.1.2 protective equipotential bonding ties everything to the same reference: structural steel + buried services + LPS earth + BS 7671 main earth + DNO Means of Earthing (where TN-C-S / TT applicable). Cert evidence bundle: earth electrode test (BS 7671) + LPS earth termination test (BS EN 62305-3) + bonding diagram showing common equipotential reference + designer / LPS specialist sign-off. M11 §4 + §5 cover the SPD layer that complements the bonding + earthing scheme."
          />

          <InlineCheck {...inlineChecks[0]} />

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>PV LPS application — Reg 712.534.101 detail</ContentEyebrow>

          <Pullquote>
            Keep s, or bond + protect. The PV designer\'s lightning question reduces to those two paths — and the SPD type follows from the choice.
          </Pullquote>

          <ConceptBlock
            title="PV inside LPS protected volume — the design path"
            plainEnglish="Reg 712.534.101: PV system within the protected volume of an existing LPS must be separated from LPS parts per BS EN 62305-3 (calculated separation distance s). Two design paths: (1) Maintain s — PV is isolated from LPS, standard Type 2 SPD strategy. (2) Cannot maintain s — bond PV frame to LPS + accept partial direct lightning current can flow through PV + add Type 1 SPDs per Reg 712.534.102.1."
            onSite="UK 2025-26 typical commercial PV + existing LPS: survey reveals s achievable at most array positions; PV layout adjusted to maintain s; standard Type 2 SPDs apply. Where roof geometry forces non-separated layout: bonding + Type 1 SPDs. Designer + LPS specialist coordinate the choice."
          >
            <p>The PV LPS design decision:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Path 1: Maintain s</strong>
                — PV "isolated" from LPS. Calculate s per BS EN 62305-3 Section 6.3;
                plan array layout so all PV metal parts (frame, mounting, DC cable)
                are at distance ≥ s from LPS air termination + down conductors.
                Reg 712.534.102.1: Type 2 SPDs apply on DC + AC sides
              </li>
              <li>
                <strong className="text-white">Path 2: Bonded</strong>
                — PV "non-isolated" from LPS. Bond PV frame at corners + intervals
                to LPS at designated coordination points; accept that partial direct
                lightning current can flow through PV elements. Reg 712.534.102.1:
                Type 1 SPDs required (typically with Type 2 downstream)
              </li>
              <li>
                <strong className="text-white">Path choice factors</strong>
                — roof geometry (s achievable?); aesthetic / planning constraints
                (visible air termination changes?); cost of bonding + Type 1 SPDs
                vs cost of re-routing LPS to gain s; customer preference + LPS
                specialist recommendation
              </li>
              <li>
                <strong className="text-white">Hybrid approach</strong>
                — large arrays may have some strings isolated + others bonded. Cert
                evidence per zone of array
              </li>
              <li>
                <strong className="text-white">Bonding details (Path
                  2)</strong> — 16 mm² Cu minimum bonding conductor at array corners
                + at intervals ~10-15 m along frame; shortest path to nearest LPS
                down conductor; DC cable shields (if used) bonded at both ends;
                BS EN 62305-3 Annex specifies conductor cross-section per material
              </li>
              <li>
                <strong className="text-white">Type 1 SPD location
                  (Path 2)</strong> — at PV DC entry to building (where DC cables
                cross LPZ 0/1 boundary); also at AC side at origin if structure has
                LPS. Followed by Type 2 downstream
              </li>
              <li>
                <strong className="text-white">Bonding does NOT
                  replace SPDs</strong> — bonding equalises potential during strike;
                SPDs limit residual transient voltage at equipment. Both required
                in Path 2
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — path chosen + BS EN 62305-3 calculation (s or
                bonding diagram) + SPD selection (Type 1 / 2 per path) + LPS
                specialist sign-off
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="PV without existing LPS — most domestic case"
            plainEnglish="Most UK domestic PV installs have NO existing LPS — house is residential without lightning protection. BS EN 62305-2 risk assessment summary: R1 typically below tolerable without LPS; R4 informs SPD decision. Reg 712.534.102.1 PV SPD Type 2 sufficient (no direct strike protection scope = no Type 1 requirement). No separation distance calculation needed (no LPS to separate from)."
            onSite="UK 2025-26 domestic PV reality: vast majority fit this pattern. Designer-led, no LPS specialist input typically needed. Short BS EN 62305-2 risk summary attached to design package + Reg 534 Type 2 SPDs at AC origin + at DC near inverter. Cert evidence simple."
          >
            <p>Domestic PV without LPS — design pattern:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Risk assessment</strong>
                — short BS EN 62305-2 summary: R1 + R4 calculated; R1 typically
                10⁻⁶-10⁻⁷ per year (below tolerable 10⁻⁵); R4 owner-assessed
                (LCT replacement cost £8-15k)
              </li>
              <li>
                <strong className="text-white">SPD requirement
                  trigger</strong> — Reg 443.4.1 (A4:2026) — significant financial
                / data loss (c) criterion applies to LCT install; SPD required
                unless owner explicitly opts out
              </li>
              <li>
                <strong className="text-white">SPD selection</strong>
                — Reg 712.534.102.1: Type 2 generally for PV; no LPS = no direct
                strike protection scope = no Type 1 requirement
              </li>
              <li>
                <strong className="text-white">SPD locations</strong>
                — (1) AC side at origin: Type 2 SPD at consumer unit; (2) DC side
                near inverter: Type 2 SPD on DC strings before inverter. Reg
                534.4.1.1 + Reg 534.4.8 ≤10 m criterion
              </li>
              <li>
                <strong className="text-white">Bonding</strong>
                — PV frame bonded to inverter / system protective earth per BS 7671
                Reg 411.3 + Reg 543; no LPS bonding needed (no LPS present)
              </li>
              <li>
                <strong className="text-white">Earth electrode</strong>
                — typical TT or TN-C-S / TN-S supply earthing per BS 7671 Chapter 54;
                no LPS earth termination to coordinate
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — BS EN 62305-2 risk summary (1-2 paragraphs);
                SPD selection record (Type 2 × 2 locations); Reg 712.534.102.1
                compliance noted; PV manufacturer DoC; standard PV documentation +
                BS 7671 EIC
              </li>
              <li>
                <strong className="text-white">Customer evidence</strong>
                — short + clear; no LPS specialist required; designer-led
                end-to-end
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 712.534.102.1 — PV SPD Type selection"
            clause="Generally, SPDs shall be Type 2. If protection against effects of direct lightning strokes is specified and separation distance, s, is not kept in accordance with BS EN 62305-3, Type 1 SPDs shall be used (generally in conjunction with Type 2 SPDs)."
            meaning={`Reg 712.534.102.1 is the categorical SPD Type-selection rule for PV. Default: Type 2 SPDs apply. Trigger for Type 1: (1) direct lightning stroke protection IS specified (i.e. structure has external LPS) AND (2) separation distance s is NOT kept per BS EN 62305-3. When both conditions hold, Type 1 SPDs are required (typically in conjunction with Type 2 downstream — coordinated protection). Reg 712.534.102.1 reduces the PV-side SPD decision to a yes/no test: is the PV inside an LPS protected volume + bonded to LPS because s can't be kept? If yes → Type 1 + Type 2. If no → Type 2 only. The "generally in conjunction with Type 2 SPDs" reflects coordinated protection — Type 1 handles direct partial current at the boundary; Type 2 handles residual surge + indirect surges downstream. Cert evidence bundle: BS EN 62305-3 separation calculation or bonding diagram + SPD selection per Reg 712.534.102.1 + manufacturer DoC for each SPD. M11 §5 covers Section 443 + 534 SPD detail in depth.`}
          />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>Wind turbine LPS + IEC 61400-24</ContentEyebrow>

          <ConceptBlock
            title="Wind turbine mast LPS architecture"
            plainEnglish="Wind turbines are tall isolated structures = high lightning attraction. BS EN 62305-3 mast LPS + IEC 61400-24 turbine-specific strike protection (blade receptors, hub, nacelle, bearings) work together. The mast structure typically serves as down conductor; dedicated earth termination at base; cable entry SPDs at building."
            onSite="UK 2025-26 small wind (5-50 kW): full LPS application typical even for domestic-scale installs. Turbine manufacturer DoC declares IEC 61400-24 compliance for the turbine; designer / electrician + LPS specialist handle the mast + ground + building entry scope per BS EN 62305-3 + BS 7671."
          >
            <p>Wind turbine LPS architecture:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Turbine-side protection
                  (manufacturer)</strong> — per IEC 61400-24. Blade tip receptors
                connected via internal down conductors through blade root to hub.
                Hub + main shaft bonded to nacelle. Yaw + pitch bearings protected
                via slip rings / brush contacts. Nacelle electromagnetic shielding
              </li>
              <li>
                <strong className="text-white">LPL choice</strong>
                — per IEC 61400-24 + risk assessment. LPL II typical for utility-scale
                turbines; LPL III for small wind ≤50 kW. Manufacturer DoC declares
                LPL
              </li>
              <li>
                <strong className="text-white">Mast as down conductor</strong>
                — steel monopole / tubular mast continuous metallic structure
                serves as down conductor if cross-section adequate (steel typically
                50 mm² equivalent or much greater for structural mast). Bonded to
                turbine nacelle base at top + earth termination at bottom
              </li>
              <li>
                <strong className="text-white">Dedicated down conductor</strong>
                — if mast is not continuous (composite, sectional, bolted with
                non-conductive interfaces), dedicated copper 50 mm² down conductor
                runs along mast exterior
              </li>
              <li>
                <strong className="text-white">Earth termination at
                  base</strong> — dedicated electrode arrangement: multiple rods in
                array OR ring earth around mast base; &lt;10 Ω target; bonded to local
                equipotential network + building earth where mast is close to
                building
              </li>
              <li>
                <strong className="text-white">Cable entry SPDs</strong>
                — DC power + control cables from nacelle to ground control panel
                cross LPZ 0/1 boundary at building entry; Type 1 SPDs (direct
                partial lightning current possible) typically with Type 2 downstream;
                bonded at entry to common equipotential bonding bar
              </li>
              <li>
                <strong className="text-white">Equipotential bonding</strong>
                — mast earth termination + building main earthing terminal bonded
                together per Reg 411.3.1.2; structural steel + buried services
                also bonded
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — manufacturer DoC (IEC 61400-24); BS EN 62305-3
                mast LPS design; earth resistance test; LPS specialist sign-off;
                BS 7671 SPD + bonding records; EIC
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Wind turbine on agricultural / rural site — practical scope"
            plainEnglish="UK 2025-26 small wind installs typically rural / agricultural. 12 m monopole mast, 5-15 kW HAWT, manufacturer-supplied. Full BS EN 62305-2 risk assessment + BS EN 62305-3 mast LPS + IEC 61400-24 turbine DoC + BS 7671 SPDs at building entry. Earth condition often poor (rocky / sandy soil) requiring extended earth electrode arrays."
            onSite="The realistic UK 2025-26 site: rural farm, single small wind turbine, often paired with PV + BESS in a multi-source PEI per Chapter 82. Earth condition assessment at design stage; LPS specialist designs the mast + earth termination + building entry protection."
          >
            <p>Rural small wind scope:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Risk assessment</strong>
                — BS EN 62305-2 full or detailed summary; rural exposed terrain +
                tall isolated structure typically warrants LPL III mast LPS
              </li>
              <li>
                <strong className="text-white">Turbine DoC</strong>
                — manufacturer-supplied per IEC 61400-24; covers blade / hub /
                nacelle / bearing strike protection; LPS specialist verifies
              </li>
              <li>
                <strong className="text-white">Mast LPS</strong>
                — usually the monopole steel mast structure is the down conductor
                (continuous + adequate CSA); LPS specialist confirms continuity +
                cross-section
              </li>
              <li>
                <strong className="text-white">Earth termination
                  challenge</strong> — rural soil conditions vary widely; rocky /
                sandy / dry soil makes &lt;10 Ω hard to achieve. Solutions: multiple
                rod array (4-8 rods in 3-5 m spacing); ring earth around mast base;
                chemical earth enhancement (bentonite); deep-driven rods. Earth
                resistance test confirms
              </li>
              <li>
                <strong className="text-white">Cable run from
                  turbine</strong> — DC power + control cables from nacelle to ground
                control panel; typically armoured cables with shield bonded at both
                ends; shortest practical path
              </li>
              <li>
                <strong className="text-white">Building entry SPDs</strong>
                — Type 1 SPDs at the control panel entry (direct partial lightning
                current possible from mast cables); Type 2 downstream at sub-distribution
                + at inverter input
              </li>
              <li>
                <strong className="text-white">Multi-source PEI
                  integration</strong> — if combined with PV + BESS (Chapter 82),
                each source contributes to LCT + fault current architecture; SPD +
                bonding coordinated across all sources
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — turbine manufacturer DoC + BS EN 62305-2 risk +
                BS EN 62305-3 LPS design + earth resistance test + LPS specialist
                sign-off + BS 7671 SPD + EIC + MCS MIS 3003 small wind handover
                pack
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 411.3.1.1 / 411.3.1.2 — Protective equipotential bonding (relevant to LPS coordination)"
            clause="In each installation, extraneous-conductive-parts liable to introduce a dangerous potential difference shall be connected to the main earthing terminal by protective bonding conductors complying with Chapter 54 (Reg 411.3.1.1). Connection of a lightning protection system to the protective equipotential bonding shall be made in accordance with the BS EN 62305 series."
            meaning="A4:2026 states protective equipotential bonding in the general form: extraneous-conductive-parts liable to introduce a dangerous potential difference (incoming metallic services such as water + gas pipes, other pipework + ducting, structural metalwork, and similar) are connected to the main earthing terminal via protective bonding conductors complying with Chapter 54. LPS bonding is handled through the cross-reference to the BS EN 62305 series rather than a fixed numbered list. The LPS earth termination + the BS 7671 main earthing terminal + structural steel + extraneous metallic services are all bonded to a common equipotential reference, realising the BS EN 62305-3 single-earth principle within the BS 7671 framework. Practical install consequence: where structure has LPS, the BS 7671 installer\'s scope includes bonding the LPS earth termination to the main earthing terminal via a main protective bonding conductor (Reg 544.1) of appropriate cross-section per Table 54.8, in accordance with BS EN 62305. The LPS specialist designs the LPS earth termination; the BS 7671 electrician installs the bonding back to the structure\'s main earthing system. Cert evidence bundle: bonding diagram + main protective bonding conductor specification + earth electrode test (BS 7671) + LPS earth termination test (BS EN 62305-3) + designer / specialist sign-off. The bonding ensures no dangerous potential difference between LPS earth + electrical installation earth during a lightning strike."
          />

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <Scenario
            title="Commercial PV install — coordinating with existing BS 6651 LPS"
            situation="200 kWp PV on a 2002 commercial warehouse roof. Existing external LPS installed to BS 6651:1999 (pre-dates BS EN 62305). LPS inspection cycle overdue by 3 years. UK 2025-26 install."
            whatToDo="LPS specialist engagement: (1) Inspection + assessment — LPS specialist inspects existing system: air termination (Faraday mesh on roof, 4 down conductors at corners, ring earth at base); current state vs current standard BS EN 62305-3. (2) Standard upgrade — BS 6651 mesh may not meet current LPL III mesh spacing; assess vs current BS EN 62305-3 requirements; specialist may recommend mesh upgrade + additional air termination as part of project. (3) Risk assessment — BS EN 62305-2 updated for current LPL choice; calculated R1 + R4 vs tolerable thresholds; protection measures confirmed. (4) PV array layout vs LPS — calculate separation distance s per BS EN 62305-3 (LPL II warehouse typical, multiple down conductors → s ~0.2-0.4 m). Plan array to maintain s where possible. (5) Where s cannot be kept — array sections bonded to LPS at coordination points; Type 1 SPDs required at PV DC entry to building per Reg 712.534.102.1. (6) Separation-achieved sections — standard Type 2 SPDs apply. (7) BS 7671 install scope — Type 1 SPDs at DC entry (bonded sections); Type 2 SPDs at inverter + at AC origin; Type 2 SPDs at sub-distribution. Bonding scheme per BS EN 62305-3 + Reg 411.3.1.2. (8) Earth coordination — LPS earth termination + main earthing terminal bonded; resistance test (LPS specialist) + earth electrode test (BS 7671 electrician) + cross-referenced. (9) LPS inspection cycle reset — new certificate issued post-upgrade; 2-year cycle for LPL II. (10) Cert evidence bundle — BS EN 62305-2 risk + BS EN 62305-3 LPS upgrade + separation calculation + bonding diagram + BS 7671 SPD + EIC + LPS inspection certificate."
            whyItMatters="Real UK 2025-26 commercial PV scenario. Existing LPS coordination is standard scope. Multi-trade delivery: LPS specialist handles BS EN 62305-3 + BS EN 62305-2; designer / electrician handles BS 7671 SPD + bonding; integrated cert evidence bundle. Customer evidence: comprehensive + insurance-ready."
          />

          <Scenario
            title="Domestic small wind + PV + BESS — rural farm"
            situation="Highland rural farm, single 12 kW HAWT on 14 m monopole mast + existing 4 kWp PV on barn roof + future 13 kWh BESS. Exposed elevated terrain, rocky earth. UK 2025-26."
            whatToDo="Multi-source LPS scope: (1) Risk assessment — BS EN 62305-2; tall isolated mast = LPL III likely; rural exposed = higher ground flash density factor; R1 calculated for life risk (farm worker activities near base); R4 for equipment + business continuity. (2) Wind mast LPS per BS EN 62305-3 + IEC 61400-24 turbine DoC — mast as down conductor (continuous monopole steel); earth termination at base challenge with rocky soil → multi-rod array + bentonite enhancement to achieve <10 Ω target. (3) Building entry SPDs — Type 1 at the wind control panel (mast cables enter building); Type 2 downstream at sub-distribution. (4) PV on barn roof — no existing LPS on barn; BS EN 62305-2 summary; Type 2 SPDs at DC near inverter + at AC origin per Reg 712.534.102.1 (no LPS = no Type 1 trigger). (5) BESS (future) — coordinated with PV + wind through Chapter 82 PEI architecture; SPDs at BESS DC + AC. (6) Equipotential bonding — mast earth + barn roof PV frame + BESS earth + building main earthing terminal all bonded per Reg 411.3.1.2; single equipotential earth for the whole site. (7) Earth electrode test — multi-rod array + ring earth; resistance measurement at multiple points; documented per BS EN 62305-3 + BS 7671. (8) Cert evidence bundle — turbine manufacturer DoC + BS EN 62305-2 risk + BS EN 62305-3 mast LPS + bonding diagram + BS 7671 SPD + EIC + MCS MIS 3003 small wind handover + MCS MIS 3002 PV handover + (future) BESS records."
            whyItMatters="Rural multi-source LCT site is a real UK 2025-26 deployment scenario. Wind + PV + BESS each have different LPS scope: wind mast = full BS EN 62305-3 application; PV = SPD-only (no LPS); BESS = integrated. Earth condition challenge typical for rural sites. Multi-trade delivery: LPS specialist + designer / electrician + MCS-certified company. Comprehensive cert evidence bundle for a complex install."
          />

          <CommonMistake
            title="Treating PV bonding to LPS as optional"
            whatHappens={`Installer skips PV bonding because the LPS specialist hasn't arrived yet, plans to "add later". Project completes without bonding — separation distance s was never going to be achievable for this array geometry. First serious thunderstorm: spark between PV frame + nearby LPS down conductor destroys the inverter + damages PV strings.`}
            doInstead={`Reg 712.534.101 + BS EN 62305-3 are not optional — they're a categorical safety requirement. Coordinate with LPS specialist at design stage; confirm s achievable or bonding scheme; install per the design. If LPS specialist input is delayed, PROJECT IS DELAYED — don't install bonded-without-bonding. Cert evidence bundle requires the LPS specialist sign-off; without it the install is non-compliant + customer / insurer can challenge.`}
          />

          <CommonMistake
            title="Assuming residential PV always needs LPS upgrade"
            whatHappens="Installer scares customer by quoting full BS EN 62305-3 LPS upgrade for a typical domestic PV install with no existing LPS. Customer pays £3-5k unnecessarily for LPS that BS EN 62305-2 risk assessment doesn\'t require. Loses trust + sale."
            doInstead="Honest BS EN 62305-2 risk summary first. Most UK domestic PV: R1 below tolerable without LPS; R4 (economic) addressed by Reg 443 + 534 Type 2 SPDs. No LPS required; SPD-only protection sufficient. Cost ~£200-500 for SPDs vs ~£3-5k for full LPS — honest framing saves customer money + builds trust. Cert evidence bundle: risk summary + SPD selection rationale + customer-accepted scope."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'BS EN 62305-3 LPS has three primary components: air termination + down conductor + earth termination. All bonded together + to structure\'s equipotential network per Reg 411.3.1.2.',
              'Air termination methods: rolling sphere (radius per LPL), mesh (Faraday cage spacing per LPL), protection angle (cone per LPL + height).',
              'Down conductors: vertical paths from air termination to earth; LPL-specific spacing (10-25 m); structural steel may serve if continuous + adequate CSA.',
              'Earth termination: <10 Ω target per BS EN 62305-3 Annex E. Type A (rods at down conductor bases) or Type B (ring earth around structure).',
              'PV inside LPS protected volume per Reg 712.534.101: maintain separation distance s per BS EN 62305-3, OR bond + add Type 1 SPDs per Reg 712.534.102.1.',
              'Reg 712.534.102.1 SPD selection rule: Type 2 generally; Type 1 (with Type 2) only when direct strike protection specified + s not kept.',
              'Domestic PV without LPS: most common UK case; designer-led BS EN 62305-2 summary + Reg 534 Type 2 SPDs sufficient. No LPS specialist input needed.',
              'Wind turbine LPS: BS EN 62305-3 mast scope + IEC 61400-24 turbine manufacturer DoC. Mast as down conductor (if continuous metallic); earth termination at base; Type 1 SPDs at building entry.',
              'Reg 542.2.3 NOTE + Reg 411.3.1.2: LPS earth termination + BS 7671 main earthing system coordinated into single equipotential earth.',
              'LPS inspection cycle per BS EN 62305-3 Annex E: 1-4 years depending on LPL; ATLAS specialist or chartered engineer in UK 2025-26.',
              'Cert evidence bundle: turbine / PV DoCs + BS EN 62305 risk + LPS design + earth tests + bonding diagram + LPS specialist sign-off + BS 7671 SPD + EIC.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 4 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-11-section-3')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                11.3 BS EN 62305-1 / -2 framework
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-11-section-5')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                11.5 BS EN 62305-4 + Section 443 SPDs
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
