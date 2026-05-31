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
import { Lightning62305Framework } from '@/components/study-centre/diagrams/renewableGapKit';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm11s3-bs-en-62305-scope',
    question:
      'What does the BS EN 62305 standard series cover, and how does it relate to BS 7671?',
    options: [
      'Same as BS 7671',
      'BS EN 62305 is the external standard for lightning protection — separate from BS 7671 but referenced by it. Four parts: -1 general principles, -2 risk management, -3 physical damage to structures + life hazard, -4 electrical + electronic systems within structures. BS 7671 Reg 443.1.1 references BS EN 62305-2 for risk management methodology; Reg 712.534.101 references BS EN 62305-3 for PV separation distance. Designer + installer apply BS EN 62305 alongside BS 7671 for any install needing lightning protection',
      'Replaces BS 7671',
      'Random',
    ],
    correctIndex: 1,
    explanation:
      'BS EN 62305 is the lightning protection standard series, separate from BS 7671 but referenced by it. The four parts: (1) BS EN 62305-1 — general principles, defines lightning parameters + protection methods + Lightning Protection Zones (LPZ) + Lightning Protection Level (LPL). (2) BS EN 62305-2 — risk management, the calculation methodology for assessing lightning risk (R1 life, R2 services, R3 heritage, R4 economic) + selecting protection measures. (3) BS EN 62305-3 — physical damage to structures + life hazard, External Lightning Protection System (LPS) — air termination, down conductors, earth termination, bonding, separation distance s. (4) BS EN 62305-4 — electrical + electronic systems within structures, Surge Protective Devices (SPDs) + coordinated protection. BS 7671 references: Reg 443.1.1 → BS EN 62305-2; Reg 712.534.101 → BS EN 62305-3 (PV inside LPS protected volume); Reg 534.4.4.4.2 → BS EN 62305-1; Reg 542.2.3 → BS EN 62305-3. Designer applies BS EN 62305 alongside BS 7671.',
  },
  {
    id: 'm11s3-risk-categories',
    question:
      'BS EN 62305-2 defines four risk categories. What are they?',
    options: [
      'Only one',
      'R1 = risk of loss of human life; R2 = risk of loss of service to the public (telecoms, power, water); R3 = risk of loss of cultural heritage (irreplaceable buildings + artefacts); R4 = risk of economic loss (insurance / business continuity). The designer calculates each applicable risk for the structure + compares to a tolerable threshold (R_T). If calculated R > R_T, protection measures (LPS + SPDs + bonding) are required to reduce R below R_T',
      'Only economic',
      'Random',
    ],
    correctIndex: 1,
    explanation:
      'BS EN 62305-2 four risk categories: (1) R1 — risk of loss of human life (people in / near the structure). Tolerable R1 threshold typically 10⁻⁵ per year. (2) R2 — risk of loss of service to the public (telecommunications, power supply, water supply, gas supply). Tolerable R2 typically 10⁻³ per year. (3) R3 — risk of loss of cultural heritage (irreplaceable buildings, museum artefacts, historic sites). Tolerable R3 typically 10⁻³ per year. (4) R4 — risk of economic loss (the building + contents + business interruption). No mandated threshold; assessed by owner. Calculation methodology: lightning ground flash density per km² × area-equivalents × probability factors per damage type → calculated risk R per category. If R > tolerable R_T, protection measures required: LPS (BS EN 62305-3), SPDs (BS EN 62305-4 + BS 7671 Section 443 / 534), bonding, separation distance. Cert evidence: BS EN 62305-2 risk assessment report attached to design package.',
  },
  {
    id: 'm11s3-lpz-zones',
    question:
      'What are Lightning Protection Zones (LPZ) per BS EN 62305-1?',
    options: [
      'Random',
      'LPZ are zones defined by the level of lightning electromagnetic threat present. LPZ 0A = direct lightning strike + full lightning electromagnetic field. LPZ 0B = no direct strike but full electromagnetic field. LPZ 1 = limited electromagnetic field (typically inside structure with no LPS, or first protection level inside LPS). LPZ 2 = further reduced field. LPZ 3 = innermost protection. SPDs are placed at zone interfaces to reduce the threat as cables cross boundaries — Reg 534.4.1.2 in BS 7671 references this LPZ concept',
      'Building rooms',
      'Same as zone 1',
    ],
    correctIndex: 1,
    explanation:
      'Lightning Protection Zones (LPZ) per BS EN 62305-1: (1) LPZ 0A — direct lightning strike possible + full lightning electromagnetic field. Outside any LPS shield. (2) LPZ 0B — no direct strike (e.g. shielded by air termination) but full electromagnetic field still present. (3) LPZ 1 — limited electromagnetic field. Typically first protected zone inside a structure with LPS + Type 1 / Type 2 SPDs at zone interface. (4) LPZ 2 — further reduced field. Typically deeper inside the structure with additional SPDs at zone interface. (5) LPZ 3 — innermost protection zone with sensitive electronics. The LPZ concept drives SPD placement — Type 1 / 2 / 3 SPDs at zone boundaries reduce surge transmission as cables cross boundaries. BS 7671 Reg 534.4.1.2: "In accordance with the LPZ concept, where a cable crosses the zonal interface, further SPDs shall be installed to preserve the zone integrity." For PV: array on roof is LPZ 0A / 0B; DC cables enter structure → SPDs at zone transition. For wind: turbine top in LPZ 0A; mast + control cables down through zone interfaces → SPDs at transitions.',
  },
  {
    id: 'm11s3-separation-distance',
    question:
      'What is "separation distance s" in BS EN 62305-3, and why does it matter for PV?',
    options: [
      'Random',
      'Separation distance s = minimum required physical distance between metal parts of the protected installation (e.g. PV array frame, DC cables) and parts of the external Lightning Protection System (LPS) such as air terminations and down conductors. If actual distance < required s, dangerous sparks can occur across the gap during a lightning strike. BS 7671 Reg 712.534.101 + 712.534.102.1: if PV is inside the LPS protected volume + separation distance s is NOT kept per BS EN 62305-3, Type 1 SPDs are required (typically with Type 2). The calculation method is in BS EN 62305-3',
      'Distance to ground',
      'Cable length',
    ],
    correctIndex: 1,
    explanation:
      'Separation distance s per BS EN 62305-3 is the minimum required physical distance between metal parts of the protected installation (e.g. PV array frame, mounting structure, DC cables) and parts of the external Lightning Protection System (LPS) — air terminations, down conductors, earth termination. Purpose: prevent dangerous sparks across the gap when a lightning strike raises the LPS to high voltage briefly. If actual distance < calculated s, sparks can occur — energy flows into the installation rather than to ground via the LPS. Calculation per BS EN 62305-3 Section 6.3: s = (ki × kc × L) / km, where ki depends on LPL, kc on current sharing, L on path length, km on isolation material. BS 7671 Reg 712.534.101: PV inside LPS protected volume must be separated from LPS parts per BS EN 62305-3. Reg 712.534.102.1: if direct strike protection specified + s not kept, Type 1 SPDs required (typically with Type 2). For PV: array layout vs LPS air termination position drives the design — sometimes upsizing s requires moving array elements; sometimes Type 1 SPDs are accepted alternative. Cert evidence: BS EN 62305-3 separation calculation + designer record.',
  },
];

const quizQuestions = [
  {
    question:
      'A new PV install on a commercial warehouse. The building already has a Lightning Protection System (LPS) installed per BS EN 62305-3. What does the PV designer need to do?',
    options: [
      'Ignore the LPS',
      'Coordinate with the existing LPS. Per Reg 712.534.101 + BS EN 62305-3: PV array + DC cables must be separated from LPS air terminations + down conductors by the calculated separation distance s, OR bonded to the LPS where separation is not possible. If s not kept, Reg 712.534.102.1 requires Type 1 SPDs (typically with Type 2). Designer + LPS specialist coordinate the array layout vs LPS routing. Cert evidence: separation distance calculation + SPD selection record + LPS specialist sign-off',
      'Demolish LPS',
      'Random',
    ],
    correctAnswer: 1,
    explanation:
      'Commercial PV install where building already has LPS = coordination scope. Process: (1) Survey the existing LPS — air termination network on roof, down conductor positions, earth termination, bonding network, last LPS inspection cycle. (2) Plan PV array layout vs LPS — maintain separation distance s per BS EN 62305-3 between PV metal parts (frame, mounting structure, DC cables) and LPS air terminations + down conductors. (3) If separation distance can be kept — PV is "isolated" from LPS; standard PV SPD strategy (Type 2 per Reg 712.534.102.1). (4) If separation distance cannot be kept — PV is bonded to LPS (Reg 712.534.101 + BS EN 62305-3 bonding rules) AND Type 1 SPDs required (typically with Type 2) per Reg 712.534.102.1 to handle direct partial lightning current. (5) Coordinate with LPS specialist for bonding scheme + LPS inspection cycle update post-install. (6) Cert evidence bundle: separation distance calculation per BS EN 62305-3; SPD selection rationale; LPS specialist sign-off; updated LPS records.',
  },
  {
    question:
      'Reg 443.1.1 references BS EN 62305-2 for SPD risk assessment. What changed in A4:2026 Reg 443.4.1 about SPD requirements?',
    options: [
      'No change',
      'A4:2026 Reg 443.4.1 redrafted the SPD requirement criteria. Protection against transient overvoltages now required where consequences could result in (a) serious injury to or loss of human life; (b) failure of a safety service as defined in Part 2; (c) significant financial or data loss. For all other cases, protection against transient overvoltages shall be provided unless the owner of the installation declares acceptance of the risk. Annex A443 (calculated risk level method) was deleted — A4:2026 simplified the trigger criteria',
      'SPDs banned',
      'Random',
    ],
    correctAnswer: 1,
    explanation:
      'A4:2026 redrafted Reg 443.4.1 SPD requirement criteria. New criteria: protection against transient overvoltages required where consequences caused by overvoltage could result in (a) serious injury to or loss of human life; (b) failure of a safety service as defined in Part 2; (c) significant financial or data loss. For all other cases, protection against transient overvoltages SHALL be provided UNLESS the owner of the installation declares acceptance of the risk (i.e. opt-out is allowed for non-critical cases but must be evidenced by owner declaration). Annex A443 (the calculated risk level CRL method) was DELETED — A4:2026 simplified the trigger from a calculation to a category-based test. Practical impact: SPDs now expected in most installs unless explicit owner opt-out. For LCT installs (PV, BESS, EV, heat pump) the (c) significant financial / data loss criterion typically triggers SPD requirement. BS EN 62305-2 risk assessment remains the methodology where formal lightning-protection risk justification is needed. Cert evidence: SPD selection rationale + owner declaration if opted out.',
  },
  {
    question:
      'How does the LPZ concept drive SPD type selection — Type 1 vs Type 2 vs Type 3?',
    options: [
      'Random',
      'LPZ concept: SPDs placed at zone boundaries reduce surge as cables cross. Type 1 SPDs handle direct or partial direct lightning current — installed at LPZ 0/1 boundary (origin of installation, where structure has external LPS). Type 2 SPDs handle indirect surge — installed at LPZ 1/2 boundary (sub-distribution boards) OR at origin where no external LPS. Type 3 SPDs handle residual surge near sensitive equipment — installed at LPZ 2/3 boundary (close to equipment, within ~10 m). Reg 534.4.1.1 codifies this',
      'No types',
      'All same',
    ],
    correctAnswer: 1,
    explanation:
      'LPZ concept drives SPD type per BS EN 62305-4 + BS 7671 Section 534: (1) Type 1 SPD — designed for direct or partial direct lightning current. Tested with 10/350 µs impulse waveform. Used at LPZ 0/1 boundary — the origin of the installation in a structure with external LPS, where partial direct lightning current is possible. Often called "equipotential bonding SPD". (2) Type 2 SPD — designed for indirect surge currents (induced from nearby strikes, distant strikes, switching transients). Tested with 8/20 µs waveform. Used at LPZ 1/2 boundary — sub-distribution boards, OR at the origin of the installation where no external LPS (most domestic installs). (3) Type 3 SPD — designed for residual surge after Type 1 / Type 2 have done their job. Tested with combination waveform. Used at LPZ 2/3 boundary — within ~10 m of sensitive equipment (per Reg 534.4.8). Reg 534.4.1.1: SPDs at origin shall be Type 1 or Type 2; SPDs close to sensitive equipment shall be Type 2 or Type 3. Coordinated SPDs (Type 1 + Type 2 + Type 3) at successive zone boundaries = layered protection. Cert evidence: SPD type per location + LPZ rationale.',
  },
  {
    question:
      'A residential PV install — no external LPS on the building. What is the BS EN 62305 + BS 7671 SPD requirement?',
    options: [
      'No SPDs needed',
      'Most cases: Type 2 SPDs required. BS EN 62305-2 risk assessment may indicate no direct-strike risk (no LPS = no direct-strike protection but also limited lightning attraction). But BS 7671 Reg 443.4.1 (A4:2026) requires SPDs unless owner opts out + Reg 712.534.102.1 says PV SPDs are generally Type 2. Type 2 at origin (CU end + at inverter location), per Reg 534.4.1.1. Reg 534.4.8 may justify additional Type 3 close to sensitive electronics. Cert evidence: BS EN 62305-2 risk assessment summary + SPD selection record',
      'Type 1 only',
      'Type 3 only',
    ],
    correctAnswer: 1,
    explanation:
      'Residential PV with no external LPS = most common UK domestic case. (1) BS EN 62305-2 risk assessment — typically calculated risk R1 (life) is below tolerable threshold for a domestic property without LPS; R4 (economic) may indicate protection needed. (2) BS 7671 Reg 443.4.1 (A4:2026) requires SPDs unless owner explicitly opts out — the (c) significant financial / data loss criterion typically applies to LCT installs (PV inverter, BESS, smart meter all data + costly to replace). (3) Reg 712.534.102.1 for PV: SPDs shall generally be Type 2; if direct strike protection specified + s not kept (no LPS = no direct strike protection scope), Type 1 with Type 2 would be required, but no LPS = no direct-strike-protection scope, so Type 2 is correct. (4) Reg 534.4.1.1: SPDs at origin shall be Type 1 or Type 2; close to sensitive equipment Type 2 or Type 3. (5) Practical install: Type 2 SPD at origin (CU end on AC side); Type 2 SPD on DC side near inverter; consider Type 3 near sensitive electronics if Reg 534.4.8 distance criteria met. (6) Cert evidence bundle: BS EN 62305-2 risk assessment summary + SPD selection record + Type 2 manufacturer DoC.',
  },
  {
    question:
      'What is the "tolerable risk" R_T threshold in BS EN 62305-2, and how does the designer use it?',
    options: [
      'No threshold',
      'R_T = tolerable risk threshold per risk category. R1 (life) typically 10⁻⁵ per year (1 in 100,000). R2 (services) + R3 (heritage) typically 10⁻³ per year. Designer calculates R per category for the structure; if R > R_T, protection measures (LPS + SPDs + bonding) required to reduce R below R_T. Methodology: lightning ground flash density × area equivalents × probability factors × loss factors. BS EN 62305-2 Annex provides standard values. Risk assessment is the formal justification for LPS + SPD selection',
      'Always 1',
      'Random',
    ],
    correctAnswer: 1,
    explanation:
      'Tolerable risk R_T per BS EN 62305-2: (1) R1 (loss of human life) — tolerable threshold typically 10⁻⁵ per year (1 in 100,000). Strictest. (2) R2 (loss of service to the public) — tolerable threshold typically 10⁻³ per year. (3) R3 (loss of cultural heritage) — tolerable threshold typically 10⁻³ per year. (4) R4 (economic loss) — no mandated threshold; owner-assessed based on insurance + business continuity. Designer\'s calculation methodology: R = N (lightning ground flash density per km²) × A (area equivalent factor based on structure dimensions + position) × P (probability of damage per lightning event) × L (loss factor — type + severity of damage). Compare calculated R to R_T per category. If R > R_T → protection measures required (external LPS per BS EN 62305-3, SPDs per BS EN 62305-4 + BS 7671 Section 534, bonding, separation). Iterate measures until R < R_T. Cert evidence bundle: BS EN 62305-2 risk assessment report — calculated risks, tolerable thresholds, measures applied. UK 2025-26 typical residential: R1 + R4 calculated; R1 usually within tolerance without LPS; R4 informs SPD decision. Commercial / industrial: full risk assessment more often required.',
  },
  {
    question:
      'Wind turbine — small (5 kW HAWT) on a 12 m mast in a rural location. What does BS EN 62305 require?',
    options: [
      'Nothing',
      'Wind turbines are tall + isolated = high lightning attraction. BS EN 62305-3 external LPS at top of mast (turbine itself may include nacelle / blade strike protection per IEC 61400-24); down conductor along mast; earth termination at base bonded to local equipotential network. BS EN 62305-2 risk assessment determines protection level (LPL I-IV). DC + control cables from nacelle to ground = entry points for surge; Type 1 SPDs at entry to building / control panel; Type 2 SPDs downstream. Coordinate with turbine manufacturer DoC',
      'Indoor only',
      'No protection',
    ],
    correctAnswer: 1,
    explanation:
      'Wind turbine BS EN 62305 application: (1) Lightning attraction — tall isolated structure in rural location = high probability of direct strike. BS EN 62305-2 risk assessment confirms protection level (LPL I most stringent, LPL IV least). (2) Turbine strike protection — IEC 61400-24 is the wind-turbine-specific lightning standard (subsidiary of BS EN 62305 framework); covers blade strike protection (lightning receptors + down conductor in blade), nacelle, bearings, slip rings. Turbine manufacturer DoC declares strike protection level. (3) Mast LPS per BS EN 62305-3 — air termination at top (often integrated into nacelle); down conductor along mast (often the mast structure itself if it has continuous metallic path); earth termination at base bonded to local equipotential network + dedicated earth electrode. (4) Cable entry to structure — DC power cables + control cables from nacelle + tower base. SPDs at building entry: Type 1 SPDs (direct partial lightning current possible) typically with Type 2 downstream. (5) Bonding — all metal structures at site bonded to common equipotential network (mast, building steel, fences if metallic). (6) Cert evidence bundle: BS EN 62305-2 risk assessment + IEC 61400-24 turbine DoC + LPS specialist sign-off + BS 7671 SPD selection record.',
  },
];

const faqs = [
  {
    question: 'Is BS EN 62305 mandatory for every PV install?',
    answer:
      'No — BS EN 62305 is a standard, not a statutory requirement. BS 7671 Reg 443.1.1 + Reg 712.534.101 reference it as the methodology to follow. In practice: domestic PV without LPS usually only needs BS EN 62305-2 risk-assessment summary + BS 7671 SPD selection. Commercial PV with existing LPS needs full BS EN 62305-3 separation distance + bonding coordination. Designer applies where relevant.',
  },
  {
    question: 'Who does the BS EN 62305 risk assessment — the electrician or a specialist?',
    answer:
      'Depends on complexity. Domestic PV without LPS: electrician typically completes a short BS EN 62305-2 summary as part of design. Commercial / industrial with LPS or complex risk: dedicated LPS specialist or chartered engineer (e.g. ATLAS members in UK) completes the formal risk assessment + LPS design. Cert evidence bundle records who completed the assessment + their competency.',
  },
  {
    question: 'Does BS EN 62305 apply to wind turbines + masts?',
    answer:
      'Yes — wind turbines are tall isolated structures = high lightning attraction. BS EN 62305-2 risk assessment; BS EN 62305-3 LPS at top + down conductor along mast + earth termination at base. IEC 61400-24 is the wind-turbine-specific lightning standard (subsidiary of 62305 framework) covering blade + nacelle + bearings.',
  },
  {
    question: 'What about BS EN 62305-4 — that\'s for electronics, right?',
    answer:
      'Yes. BS EN 62305-4 covers electrical + electronic systems within structures — Surge Protective Devices (SPDs) + coordinated protection. Referenced by BS 7671 Section 534. M11 §5 covers SPDs in depth: Type 1 / 2 / 3 selection, coordination, voltage protection level Up vs equipment Uw, install location.',
  },
  {
    question: 'How does BS EN 62305 interact with the wider BS 7671 Section 443 + Section 534?',
    answer:
      'BS 7671 Section 443 sets the WHEN of SPD requirement (Reg 443.4.1 trigger criteria). BS 7671 Section 534 sets the HOW of SPD installation (Type, location, coordination). BS EN 62305-2 is the risk-assessment methodology that supports Section 443 decisions; BS EN 62305-3 covers the external LPS; BS EN 62305-4 covers the SPD framework that Section 534 references. The four standards work together with BS 7671 as the integrating wiring regs.',
  },
];

export default function RenewableEnergyModule11Section3() {
  const navigate = useNavigate();

  useSEO({
    title: 'BS EN 62305-1 / -2 lightning framework | Renewable Energy 11.3 | Elec-Mate',
    description:
      'BS EN 62305 lightning protection standard series — Part -1 general principles, Part -2 risk management, R1-R4 risk categories, Lightning Protection Zones (LPZ), Lightning Protection Level (LPL). How BS 7671 references the standards.',
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
            eyebrow="Module 11 · Section 3 · BS EN 62305-1 / -2 · External standard referenced by BS 7671"
            title="BS EN 62305-1 / -2 lightning protection framework"
            description="The BS EN 62305 standard series: -1 general principles, -2 risk management. Lightning Protection Zones (LPZ 0A / 0B / 1 / 2 / 3). Risk categories R1 (life), R2 (services), R3 (heritage), R4 (economic). Tolerable risk thresholds. Separation distance s. How BS 7671 references the standards."
            tone="yellow"
          />

          <TLDR
            points={[
              'BS EN 62305 is the external lightning-protection standard series, separate from BS 7671 but referenced by it. Four parts: -1 general principles, -2 risk management, -3 LPS for structures, -4 SPDs for electronics.',
              'BS 7671 references: Reg 443.1.1 references BS EN 62305-2 for risk methodology; Reg 712.534.101 references BS EN 62305-3 for PV separation distance; Reg 542.2.3 + Reg 534.4.4.4.2 also reference BS EN 62305.',
              'Lightning Protection Zones (LPZ): 0A direct strike + full electromagnetic field, 0B no direct strike but full field, 1 limited field (first interior protection), 2 + 3 progressively reduced.',
              'Lightning Protection Level (LPL): I (most stringent) to IV (least). Defines maximum lightning current parameters used in design.',
              'BS EN 62305-2 risk categories: R1 loss of human life (tolerable typically 10⁻⁵/year); R2 loss of service to public (10⁻³); R3 loss of heritage (10⁻³); R4 economic loss (owner-assessed).',
              'Risk calculation: R = N × A × P × L (ground flash density × area equivalent × damage probability × loss factor). If R > R_T, protection measures required.',
              'Separation distance s = required physical distance between protected installation metal parts (PV frame, DC cable) and LPS parts (air termination, down conductor). Calculation in BS EN 62305-3.',
              'Reg 712.534.101 for PV: if PV inside LPS protected volume + s not kept, Type 1 SPDs required (typically with Type 2) per Reg 712.534.102.1.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify the four parts of BS EN 62305 + how each is referenced by BS 7671.',
              'Apply BS EN 62305-2 risk assessment methodology — calculate R1-R4 vs tolerable thresholds.',
              'Distinguish Lightning Protection Zones (LPZ 0A / 0B / 1 / 2 / 3) + Lightning Protection Level (LPL I-IV).',
              'Calculate separation distance s per BS EN 62305-3 for PV / wind / mast installs.',
              'Position BS EN 62305 as the external standard supporting BS 7671 Sections 443 / 534 / 712.',
              'Identify when a domestic PV install needs a full BS EN 62305-2 risk assessment vs a summary.',
              'Coordinate PV / wind layout with existing building LPS per Reg 712.534.101 + BS EN 62305-3.',
              'Determine when LPS specialist input is required vs designer-led BS EN 62305 application.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>
            BS EN 62305 sits next to BS 7671, not inside it. Lightning is an external threat; the wiring regs reference the lightning standard for the methodology.
          </Pullquote>

          <ContentEyebrow>BS EN 62305 series structure + BS 7671 references</ContentEyebrow>

          <ConceptBlock
            title="The four BS EN 62305 parts + their scope"
            plainEnglish="BS EN 62305 is the integrated lightning-protection standard series. Four parts each cover a different aspect: -1 general principles + lightning parameters; -2 risk management methodology; -3 external LPS for structures + life hazard; -4 SPDs for electrical + electronic systems. Together they form the framework BS 7671 references for lightning protection scope."
            onSite="UK 2025-26 reality: most domestic PV installs need a short BS EN 62305-2 risk assessment summary + BS 7671 Reg 534 SPD selection. Commercial / industrial / tall structures + wind turbines need full BS EN 62305 application across all four parts + LPS specialist input."
          >
            <p>BS EN 62305 parts at a glance:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">BS EN 62305-1 General
                  principles</strong> — defines lightning parameters (peak current,
                charge, specific energy), Lightning Protection Zones (LPZ 0A / 0B / 1 / 2
                / 3), Lightning Protection Level (LPL I / II / III / IV), introduces
                the protection methods used in -3 + -4. Referenced by BS 7671 Reg
                534.4.4.4.2
              </li>
              <li>
                <strong className="text-white">BS EN 62305-2 Risk
                  management</strong> — methodology for calculating lightning risk per
                category (R1-R4). Compares calculated risk to tolerable threshold
                (R_T). If R &gt; R_T, protection measures required. Referenced by BS 7671
                Reg 443.1.1
              </li>
              <li>
                <strong className="text-white">BS EN 62305-3 Physical
                  damage</strong> — external Lightning Protection System (LPS): air
                termination network, down conductors, earth termination, bonding,
                separation distance s. Referenced by BS 7671 Reg 712.534.101 (PV) +
                Reg 542.2.3 + Reg 534.4.4.4.2(a)+(b)
              </li>
              <li>
                <strong className="text-white">BS EN 62305-4 Electrical
                  + electronic systems</strong> — Surge Protective Devices (SPDs) +
                coordinated protection within structures. Referenced by BS 7671 Section
                534 (covered in M11 §5)
              </li>
              <li>
                <strong className="text-white">IEC 61400-24</strong>
                — wind-turbine-specific lightning standard, subsidiary of the BS EN
                62305 framework. Covers blade + nacelle + bearings + slip rings
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — for LCT installs: BS EN 62305-2 risk assessment
                summary; BS EN 62305-3 separation calculation (where PV / wind inside
                LPS protected volume); BS EN 62305-4 SPD coordination per BS 7671
                Section 534; IEC 61400-24 wind turbine DoC (where applicable)
              </li>
              <li>
                <strong className="text-white">Specialist input</strong>
                — full LPS design + risk assessment typically uses a chartered
                lightning-protection specialist (UK 2025-26 ATLAS members
                accredited). Designer / electrician coordinates BS 7671 SPD + bonding
                scope alongside
              </li>
              <li>
                <strong className="text-white">UK 2025-26 typical
                  domestic</strong> — short BS EN 62305-2 risk summary + Reg 534 Type
                2 SPDs at origin + at inverter is sufficient for most residential PV
                installs without LPS
              </li>
            </ul>
          </ConceptBlock>

          <Lightning62305Framework caption="The four parts of BS EN 62305 — risk-first, then the LPS and surge protection." />

          <ConceptBlock
            title="Lightning Protection Zones (LPZ) — the zone concept"
            plainEnglish="BS EN 62305-1 defines Lightning Protection Zones (LPZ) by electromagnetic threat level. LPZ 0A = direct strike + full field. LPZ 0B = no direct strike but full field. LPZ 1 = limited field (first interior). LPZ 2 + 3 = progressively reduced. SPDs at zone interfaces reduce the surge as cables cross. BS 7671 Reg 534.4.1.2 references the LPZ concept for SPD placement."
            onSite="LPZ thinking drives SPD type + location. For PV: roof array in LPZ 0A / 0B; DC cables enter structure to LPZ 1 = SPD at entry; inverter inside LPZ 1; sensitive electronics deeper inside LPZ 2 or 3 may need additional Type 3 SPDs (Reg 534.4.8 within 10 m criterion). For wind: nacelle in LPZ 0A; mast cables down through zones to building entry = SPDs at boundaries."
          >
            <p>LPZ definitions + practical application:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">LPZ 0A</strong> — direct
                lightning strike possible + full electromagnetic field. Outside any
                LPS shield. Example: roof of building without LPS; nacelle of wind
                turbine; PV array on unprotected roof
              </li>
              <li>
                <strong className="text-white">LPZ 0B</strong> — no direct
                strike (shielded by air termination network) but full electromagnetic
                field still present. Example: PV array inside the LPS protected
                volume on a building with LPS, where separation distance s is kept
              </li>
              <li>
                <strong className="text-white">LPZ 1</strong> — limited
                electromagnetic field. Typically first protected zone inside a
                structure with LPS + Type 1 / Type 2 SPDs at zone interface. Example:
                main switchgear room with SPDs at origin
              </li>
              <li>
                <strong className="text-white">LPZ 2</strong> — further
                reduced field. Typically deeper inside structure with additional Type
                2 SPDs at LPZ 1/2 boundary. Example: sub-distribution boards
              </li>
              <li>
                <strong className="text-white">LPZ 3</strong> — innermost
                protection zone with sensitive electronics. Type 3 SPDs at LPZ 2/3
                boundary, within ~10 m of equipment (Reg 534.4.8). Example: server
                rooms, medical equipment
              </li>
              <li>
                <strong className="text-white">Zone boundary SPDs</strong>
                — Reg 534.4.1.2: "where a cable crosses the zonal interface, further
                SPDs shall be installed to preserve the zone integrity"
              </li>
              <li>
                <strong className="text-white">PV application</strong>
                — array on roof LPZ 0A or 0B; DC cables descend through zone
                interface to LPZ 1 at inverter location → SPD at DC entry to
                inverter. AC output through CU = Type 2 SPDs at LPZ 0/1 (origin)
              </li>
              <li>
                <strong className="text-white">Wind application</strong>
                — nacelle in LPZ 0A; mast structure provides partial shielding for
                cables inside; building entry = LPZ 1 boundary → Type 1 (direct
                partial current possible) typically with Type 2
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 534.4.1.2 — LPZ concept for SPD placement"
            clause="In accordance with the LPZ concept, where a cable crosses the zonal interface, further SPDs shall be installed to preserve the zone integrity."
            meaning="Reg 534.4.1.2 codifies the BS EN 62305-1 LPZ concept inside BS 7671. The rule is categorical: any cable crossing a Lightning Protection Zone interface requires an SPD at that crossing to preserve the zone\'s reduced threat level. Practical implications for LCT installs: (1) PV DC cables enter structure (LPZ 0A / 0B → LPZ 1) → SPD at DC entry. (2) PV AC output to CU (LPZ 1 main board) → Type 2 SPD at origin. (3) Wind turbine cables enter building (LPZ 0A nacelle → LPZ 1 base) → Type 1 SPD typically with Type 2 at entry. (4) Sub-distribution feeding sensitive electronics (LPZ 1 → LPZ 2) → additional Type 2 SPDs at sub-board. (5) Equipment-local protection (LPZ 2 → LPZ 3) → Type 3 SPD within 10 m of equipment per Reg 534.4.8. Cert evidence bundle: SPD location diagram + LPZ rationale + Type selection per Reg 534.4.1.1."
          />

          <InlineCheck {...inlineChecks[0]} />

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>BS EN 62305-2 risk management methodology</ContentEyebrow>

          <Pullquote>
            R = N × A × P × L. Calculate per category. Compare to tolerable. If higher, add protection. That\'s the BS EN 62305-2 loop.
          </Pullquote>

          <ConceptBlock
            title="Risk categories R1-R4 + tolerable thresholds"
            plainEnglish="BS EN 62305-2 defines four risk categories: R1 loss of human life, R2 loss of service to public, R3 loss of cultural heritage, R4 economic loss. Each has a tolerable threshold R_T. Designer calculates R per applicable category for the structure; if R > R_T, protection measures required to reduce R below R_T."
            onSite="UK 2025-26 typical residential PV: R1 (life) usually below tolerance without LPS (single dwelling, low occupancy, suburban / low-lightning area); R4 (economic — inverter + BESS replacement cost + grid disconnection) drives SPD decision via Reg 443.4.1 criteria. Commercial / multi-occupancy / rural-elevated: full risk assessment more often warranted."
          >
            <p>BS EN 62305-2 risk categories detail:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">R1 — Loss of human life</strong>
                — risk that lightning causes injury or death (direct strike, step
                voltage, touch voltage, fire). Tolerable R_T typically 10⁻⁵ per year
                (1 in 100,000). Strictest threshold
              </li>
              <li>
                <strong className="text-white">R2 — Loss of service
                  to public</strong> — risk to public services (telecoms, power, water,
                gas). Tolerable R_T typically 10⁻³ per year. Applicable to substations,
                pumping stations, exchanges
              </li>
              <li>
                <strong className="text-white">R3 — Loss of cultural
                  heritage</strong> — risk to irreplaceable buildings + artefacts
                (historic sites, museums, religious buildings). Tolerable R_T typically
                10⁻³ per year
              </li>
              <li>
                <strong className="text-white">R4 — Economic loss</strong>
                — risk to building + contents + business continuity. No mandated
                threshold — owner-assessed based on insurance + commercial impact
              </li>
              <li>
                <strong className="text-white">Calculation formula</strong>
                — R = N × A × P × L, where N = lightning ground flash density (per
                km²/year, UK typically 0.2-1.0), A = area equivalent factor
                (structure size + position), P = probability of damage per event,
                L = loss factor (severity)
              </li>
              <li>
                <strong className="text-white">Standard data</strong>
                — BS EN 62305-2 Annex provides P + L factors per damage type +
                protection measure. N from local lightning density data (Met Office
                + lightning detection networks)
              </li>
              <li>
                <strong className="text-white">Iteration</strong> —
                if R &gt; R_T, designer adds protection measures (LPS per BS EN 62305-3;
                SPDs per BS EN 62305-4 + BS 7671 Section 534; bonding; shielded
                cabling) + recalculates. Iterate until R &lt; R_T
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — BS EN 62305-2 risk assessment report: structure
                description + calculated R per category + tolerable R_T + protection
                measures applied + post-protection R verification
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Lightning Protection Level (LPL) I-IV"
            plainEnglish="BS EN 62305-1 defines Lightning Protection Level (LPL) I (most stringent) to IV (least). LPL determines the maximum lightning current parameters the LPS is designed to handle. Risk assessment per BS EN 62305-2 indicates required LPL. Higher LPL = more stringent protection."
            onSite="Most UK residential / commercial LCT applications target LPL III or IV. Industrial / safety-critical / heritage / high-risk (e.g. fuel depot, hospital, nuclear) may require LPL I or II. Wind turbine standard IEC 61400-24 specifies LPL per turbine class. Designer records LPL choice + rationale."
          >
            <p>LPL detail + LCT application:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">LPL I (most stringent)</strong>
                — maximum lightning current 200 kA peak; covers ~99% of natural
                lightning events. Used for high-risk: fuel depots, ammunition,
                nuclear, hospitals, military
              </li>
              <li>
                <strong className="text-white">LPL II</strong>
                — maximum lightning current 150 kA peak; covers ~97% of events.
                Industrial + commercial high-value sites
              </li>
              <li>
                <strong className="text-white">LPL III</strong>
                — maximum lightning current 100 kA peak; covers ~91% of events.
                Most residential + standard commercial. Common default for UK
                LCT installs
              </li>
              <li>
                <strong className="text-white">LPL IV (least stringent)</strong>
                — maximum lightning current 100 kA peak (some parameters relaxed
                vs LPL III). Lower-risk structures
              </li>
              <li>
                <strong className="text-white">LPL → LPS design</strong>
                — LPL drives air termination mesh size (Faraday cage spacing),
                down conductor count + spacing, earth termination resistance
                requirements per BS EN 62305-3
              </li>
              <li>
                <strong className="text-white">LPL → SPD selection</strong>
                — LPL determines partial lightning current Iimp through SPD; affects
                Type 1 SPD selection per BS EN 62305-4 + BS 7671 Reg 534.4.4.4
              </li>
              <li>
                <strong className="text-white">Wind turbine LPL</strong>
                — IEC 61400-24 specifies LPL per turbine class — typically LPL I or
                II for utility-scale; LPL III for small wind
              </li>
              <li>
                <strong className="text-white">Designer records</strong>
                — chosen LPL + rationale based on BS EN 62305-2 risk assessment +
                customer requirements. Cert evidence bundle records the LPL +
                resulting LPS / SPD design
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 443.1.1 — Reference to BS EN 62305-2 for risk assessment"
            clause="Protection against transient overvoltages of atmospheric origin transmitted by the supply distribution system and against switching transient overvoltages. NOTE 7 (in the published reg): For full risk-assessment methodology, BS EN 62305-2 should be applied."
            meaning="Reg 443.1.1 is the scope reg for transient overvoltage protection in BS 7671 — atmospheric origin (lightning-related, including indirect / induced) and switching transient origin. It references BS EN 62305-2 as the risk-assessment methodology. A4:2026 redrafted Reg 443.4.1 SPD trigger criteria (covered in M11 §5) but the underlying risk-assessment methodology remains BS EN 62305-2. Practical application: for most LCT installs, a short risk-assessment summary (calculated R1 + R4 vs tolerable thresholds; identified protection measures) attached to the design package suffices. For complex / commercial / heritage / high-risk sites, a full BS EN 62305-2 risk assessment by an LPS specialist is appropriate. Cert evidence bundle: risk assessment summary or full report; SPD selection rationale; LPS specialist sign-off where applicable. M11 §5 covers Section 443 / 534 SPD detail in depth."
          />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>Separation distance s + PV application</ContentEyebrow>

          <ConceptBlock
            title="Separation distance s per BS EN 62305-3"
            plainEnglish="Separation distance s = minimum required physical distance between metal parts of the protected installation (e.g. PV array frame, mounting structure, DC cables) and parts of the external Lightning Protection System (LPS) — air terminations, down conductors, earth termination. Purpose: prevent dangerous sparks across the gap during a lightning strike. BS EN 62305-3 Section 6.3 provides the calculation."
            onSite={`For PV inside an LPS protected volume, s drives the array layout. If actual distance ≥ calculated s, array is "isolated" from LPS — standard Type 2 SPD strategy. If actual distance < s, two choices: (1) move array to gain separation; (2) bond array to LPS + add Type 1 SPDs per Reg 712.534.102.1. Designer + LPS specialist coordinate.`}
          >
            <p>Separation distance s calculation + application:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Formula (BS EN 62305-3
                  Section 6.3)</strong> — s = (ki × kc × L) / km, where ki = isolation
                factor based on LPL (0.04 for LPL III/IV typical), kc = current
                sharing factor (1.0 single down conductor, less for multiple), L =
                path length along LPS from point of separation to nearest equipotential
                bonding point (m), km = isolation material factor (1.0 air; 0.5 solid
                material)
              </li>
              <li>
                <strong className="text-white">Typical residential</strong>
                — LPL III, single down conductor, L ~10-15 m: s typically 0.4-0.6 m
                (air separation). Achievable on most pitched roofs with
                rooftop-mounted PV
              </li>
              <li>
                <strong className="text-white">Typical commercial</strong>
                — LPL II, multiple down conductors, L ~5-20 m: s typically 0.2-0.4 m
                (current sharing reduces effective single-path current)
              </li>
              <li>
                <strong className="text-white">If s achieved</strong>
                — PV array is "isolated" from LPS. Standard Reg 712.534.102.1 Type 2
                SPDs apply. No bonding between PV frame + LPS needed at the array
              </li>
              <li>
                <strong className="text-white">If s not achieved</strong>
                — two options per BS EN 62305-3: (a) move PV elements to gain
                separation; (b) bond PV frame + mounting structure to LPS at
                designated points + accept that direct partial lightning current
                will flow through PV elements
              </li>
              <li>
                <strong className="text-white">Option (b) consequence</strong>
                — Reg 712.534.102.1: if direct strike protection specified + s not
                kept, Type 1 SPDs required (typically with Type 2 downstream). PV
                cables carry possible partial direct lightning current to inverter
                + structure
              </li>
              <li>
                <strong className="text-white">PV layout decision</strong>
                — designer + LPS specialist coordinate. Sometimes adjusting array
                position or adding LPS air terminations recovers separation.
                Sometimes bonding + Type 1 is the practical choice
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — BS EN 62305-3 separation distance calculation
                attached to design; SPD selection per Reg 712.534.102.1; bonding
                diagram (if option b); LPS specialist sign-off
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="When does a BS EN 62305 specialist input get added?"
            plainEnglish="Domestic PV without LPS: electrician designer typically completes a short BS EN 62305-2 risk summary + BS 7671 Section 534 SPD selection. Complex / commercial / industrial / heritage / wind turbine / structure with existing LPS: dedicated LPS specialist input is appropriate. ATLAS members are the UK 2025-26 accredited body."
            onSite="The pragmatic UK 2025-26 split: residential / small commercial PV without LPS = electrician does everything. Commercial PV with LPS, wind turbines, industrial sites, heritage buildings = LPS specialist does the risk assessment + LPS design + separation distance calculation; electrician installs the BS 7671 SPD + bonding scope per the specialist\'s design."
          >
            <p>Specialist input decision matrix:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Domestic PV, no LPS</strong>
                — designer-led. Short BS EN 62305-2 risk summary (R1 + R4 typical) +
                Reg 443 / 534 Type 2 SPD selection. Sufficient
              </li>
              <li>
                <strong className="text-white">Domestic PV, existing
                  LPS</strong> — coordinate with LPS specialist for separation
                distance + Reg 712.534.101 application. LPS specialist may sign off
                the BS EN 62305-3 part; designer / electrician handles BS 7671 SPD
              </li>
              <li>
                <strong className="text-white">Commercial PV, no LPS</strong>
                — may be designer-led OR LPS specialist input depending on size +
                risk + customer policy. Larger arrays + commercial value typically
                justify specialist input
              </li>
              <li>
                <strong className="text-white">Commercial PV, existing
                  LPS</strong> — LPS specialist input typical. Coordinate the
                integration; designer / electrician handles BS 7671 SPD + bonding +
                LPS specialist sign-off
              </li>
              <li>
                <strong className="text-white">Wind turbine</strong>
                — LPS specialist + turbine manufacturer DoC (IEC 61400-24). Designer
                / electrician handles BS 7671 SPD + bonding scope per the LPS design
              </li>
              <li>
                <strong className="text-white">Heritage / high-risk</strong>
                — full LPS specialist + full BS EN 62305 application. Designer /
                electrician role is the BS 7671 layer
              </li>
              <li>
                <strong className="text-white">UK 2025-26 accreditation</strong>
                — ATLAS (Association of Technical Lightning + Access Specialists) is
                the UK industry body. Chartered electrical engineers (CEng IET) with
                LPS specialism may also undertake the work
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — LPS specialist report attached to design package;
                designer/electrician BS 7671 SPD + bonding records reference the
                specialist\'s LPS design
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 712.534.101 — PV inside LPS protected volume"
            clause="Where the PV system is installed within the protected volume of the lightning protection system (LPS), all power and signal cables or lines of the PV system shall be separated from all parts of the LPS in accordance with BS EN 62305-3. NOTE 1: BS EN 62305-3 describes the calculation of the separation distance. In addition to shielded lines, close and parallel routing of cables may be used."
            meaning="Reg 712.534.101 is the PV-specific separation reg in BS 7671, referencing BS EN 62305-3 directly. The categorical rule: PV inside an LPS-protected building must keep separation distance s from all LPS parts (air terminations, down conductors, earth termination). The NOTE acknowledges the BS EN 62305-3 calculation methodology + adds that shielded lines + parallel routing may help maintain isolation. Practical implications: (1) Survey existing LPS — air termination network on roof, down conductor positions, earth termination, last inspection. (2) Plan PV array layout — maintain s. (3) If s cannot be kept, Reg 712.534.102.1 requires Type 1 SPDs (typically with Type 2) + bonding per BS EN 62305-3. (4) Coordinate with LPS specialist where complex. Cert evidence bundle: BS EN 62305-3 separation calculation; PV layout diagram showing s + LPS interface; SPD selection rationale; bonding diagram (where applicable); LPS specialist sign-off."
          />

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <Scenario
            title="Domestic PV — no LPS on building"
            situation="Typical 1990s semi-detached, 6 kWp PV install on south-facing pitched roof, no external LPS on the building, suburban area (lightning ground flash density ~0.4 strikes/km²/year UK average). UK 2025-26."
            whatToDo="Designer-led BS EN 62305-2 risk summary: (1) Calculate R1 (life) — typical residential, low occupancy, no flammable material; R1 typically ~10⁻⁶ per year (below tolerable 10⁻⁵). (2) Calculate R4 (economic) — inverter + BESS + PV array replacement cost £8-15k; insurance perspective; owner-assessed. (3) Conclusion — R1 within tolerance without LPS; R4 informs SPD decision. (4) BS 7671 Reg 443.4.1 (A4:2026) — significant financial loss criterion (c) applies to LCT install; SPD required unless owner opts out. (5) Reg 712.534.102.1 — PV SPD Type 2 generally; no LPS = no direct strike protection scope = no Type 1 required. (6) Install Type 2 SPD at AC origin (CU end) + Type 2 SPD on DC side near inverter. (7) Reg 534.4.1.1 compliance. (8) No BS EN 62305-3 separation calculation needed (no LPS). (9) Cert evidence bundle: BS EN 62305-2 risk summary (1-2 paragraphs) + SPD selection record (Type 2 × 2 locations) + manufacturer DoC. (10) Customer evidence: standard PV documentation + BS 7671 EIC."
            whyItMatters="Most UK domestic PV installs fit this pattern. BS EN 62305-2 risk assessment is a summary, not a full report. BS 7671 Section 443 + 534 + Reg 712.534.102.1 drive the SPD selection. No LPS specialist input needed. Cert evidence bundle is short + complete."
          />

          <Scenario
            title="Commercial PV — existing LPS on warehouse"
            situation="200 kWp PV install on a 20-year-old commercial warehouse with existing external Lightning Protection System (BS 6651:1999 era — pre-dates BS EN 62305 but still in service). Inspection cycle was overdue. UK 2025-26."
            whatToDo="LPS specialist + designer coordination: (1) LPS specialist inspects existing system — air termination + down conductor + earth termination per current BS EN 62305-3 (updated requirements may apply). (2) LPS specialist may upgrade existing LPS to current standard during the PV project. (3) Survey for PV array layout vs LPS air termination + down conductor positions. (4) Calculate separation distance s per BS EN 62305-3 — LPL II typical commercial, multiple down conductors → s typically 0.3-0.5 m. (5) Plan PV array to maintain s where possible. (6) Where s cannot be kept (e.g. array required across full roof + air termination at parapet) — bond PV frame to LPS at designated points + add Type 1 SPDs per Reg 712.534.102.1. (7) Designer / electrician installs BS 7671 SPD: Type 1 at PV DC entry to building (if bonded); Type 2 at inverter + at AC origin; consider Type 3 close to sensitive electronics (Reg 534.4.8 within 10 m). (8) Bonding scheme per BS EN 62305-3 + LPS specialist design. (9) Cert evidence bundle: BS EN 62305-2 risk assessment (LPS specialist) + BS EN 62305-3 separation calculation + LPS inspection certificate (updated) + PV layout vs LPS diagram + BS 7671 SPD + bonding records + Reg 712.534.101 / .102.1 compliance + customer EIC."
            whyItMatters="Commercial PV with existing LPS = standard scope, but coordination-heavy. Multi-trade delivery: LPS specialist handles BS EN 62305-3 + risk assessment; designer / electrician handles BS 7671 SPD + bonding. Cert evidence bundle integrates both. Customer EIC + LPS specialist sign-off + insurance documentation."
          />

          <CommonMistake
            title="Treating BS EN 62305 as part of BS 7671"
            whatHappens={`Designer writes "compliant with BS EN 62305" on the EIC but doesn't engage with the actual standard or its methodology. Cannot show risk assessment calculation, separation distance calculation, LPL chosen + rationale. Compliance claim is hollow.`}
            doInstead="BS EN 62305 is an EXTERNAL standard — separate from BS 7671 but referenced by it. Designer applies BS EN 62305-2 methodology for risk assessment, -3 for LPS / separation, -4 for SPDs. Records the calculation + decision. Where complex, LPS specialist input is appropriate. BS 7671 Sections 443 + 534 + Reg 712.534 reference the standards; designer\'s scope is the BS 7671 layer + the relevant BS EN 62305 application. Cert evidence bundle: BS EN 62305 records attached to the BS 7671 design + EIC."
          />

          <CommonMistake
            title="Ignoring an existing LPS during PV install"
            whatHappens="Installer places PV array near LPS air terminations without checking separation distance s. During a lightning strike, sparks occur across the gap — PV array energised + inverter destroyed + possible fire. Insurance claim challenged on competent install."
            doInstead="Always survey for existing LPS at quote stage. If LPS present, plan PV layout vs LPS positions; calculate separation distance s per BS EN 62305-3; if s cannot be kept, bond PV frame to LPS + add Type 1 SPDs per Reg 712.534.102.1; coordinate with LPS specialist. Cert evidence bundle: separation calculation + bonding diagram + LPS specialist sign-off."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'BS EN 62305 is the external lightning-protection standard series — four parts, separate from BS 7671 but referenced by it.',
              'BS EN 62305-1: general principles + Lightning Protection Zones (LPZ 0A / 0B / 1 / 2 / 3) + Lightning Protection Level (LPL I most stringent to IV least).',
              'BS EN 62305-2: risk management methodology. Categories R1 (life, tolerable 10⁻⁵/year), R2 (services 10⁻³), R3 (heritage 10⁻³), R4 (economic, owner-assessed).',
              'BS EN 62305-3: external LPS — air termination, down conductors, earth termination, bonding, separation distance s. Referenced by Reg 712.534.101 for PV.',
              'BS EN 62305-4: SPDs for electronics. Referenced by BS 7671 Section 534 (covered in M11 §5).',
              'Risk calculation: R = N × A × P × L. If R > R_T, protection measures required. Iterate until R < R_T.',
              'Separation distance s: minimum physical gap between PV / wind metal parts + LPS parts. Calculation in BS EN 62305-3 Section 6.3.',
              'If s cannot be kept, Reg 712.534.102.1 requires Type 1 SPDs (typically with Type 2) + bonding per BS EN 62305-3.',
              'LPZ concept drives SPD type + location: Type 1 at LPZ 0/1 boundary; Type 2 at LPZ 1/2 boundary; Type 3 at LPZ 2/3 boundary within ~10 m (Reg 534.4.8).',
              'Domestic PV no LPS: designer-led BS EN 62305-2 summary + BS 7671 Type 2 SPDs. Commercial / industrial / heritage / wind: LPS specialist input typical.',
              'Wind turbines: BS EN 62305-2 risk assessment + BS EN 62305-3 mast LPS + IEC 61400-24 turbine-specific lightning standard.',
              'Cert evidence bundle: BS EN 62305 risk assessment + separation calculation (where applicable) + LPS specialist sign-off (where applicable) + BS 7671 SPD + bonding records.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 3 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-11-section-2')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                11.2 Chapter 81 applied
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-11-section-4')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                11.4 BS EN 62305-3 LPS for PV / wind
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
