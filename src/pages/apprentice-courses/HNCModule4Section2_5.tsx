/**
 * Module 4 · Section 2 · Subsection 5 — Cable Types and Selection
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   PVC vs XLPE insulation, LSF/LSZH low-smoke variants, SWA armoured cables, fire
 *   performance (FP / MI / Category 1-3 to BS 8519), gland selection and matching cable
 *   construction to building services applications.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  LearningOutcomes,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Cable Types and Selection - HNC Module 4 Section 2.5';
const DESCRIPTION =
  'Understand cable insulation types including XLPE, PVC, LSF, SWA armoured cables, FP fire-resistant and MI cables for building services applications.';

const quickCheckQuestions = [
  {
    id: 'xlpe-advantage',
    question: 'What is the main advantage of XLPE insulation over PVC?',
    options: [
      'Lower cost',
      'Higher operating temperature (90°C vs 70°C)',
      'Better flexibility',
      'Easier to terminate',
    ],
    correctIndex: 1,
    explanation:
      "XLPE (cross-linked polyethylene) can operate at 90°C compared to PVC's 70°C limit. This gives XLPE higher current-carrying capacity and better fault withstand capability.",
  },
  {
    id: 'lsf-meaning',
    question: 'What does LSF/LSZH cable designation mean?',
    options: [
      'Low Smoke and Fume / Low Smoke Zero Halogen',
      'Large Single Flex / Low Signal Zero Harmonic',
      'Limited Service Factor / Low Speed Zero Hertz',
      'Light Sheath Flexible / Low Static Zone High',
    ],
    correctIndex: 0,
    explanation:
      'LSF (Low Smoke and Fume) and LSZH (Low Smoke Zero Halogen) cables emit minimal toxic smoke when burned, making them essential for occupied buildings and escape routes.',
  },
  {
    id: 'swa-purpose',
    question: 'What is the primary purpose of SWA (Steel Wire Armoured) cable?',
    options: [
      'To increase current capacity',
      'To provide mechanical protection and can act as CPC',
      'To reduce electromagnetic interference',
      'To improve flexibility',
    ],
    correctIndex: 1,
    explanation:
      'Steel wire armouring provides mechanical protection against impact and crushing. The armour can also serve as the circuit protective conductor (CPC) when properly terminated.',
  },
  {
    id: 'fp-cable-use',
    question: 'Where are FP (Fire Performance) cables typically required?',
    options: [
      'In wet locations',
      'For circuits that must continue operating during a fire',
      'In high ambient temperatures only',
      'For underground installations',
    ],
    correctIndex: 1,
    explanation:
      "FP cables maintain circuit integrity during fire conditions. They're required for fire alarm systems, emergency lighting, smoke control and other life safety circuits per BS 5839 and BS 5266.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'PVC insulated cables are limited to what maximum conductor operating temperature?',
    options: ['60°C', '70°C', '90°C', '105°C'],
    correctAnswer: 1,
    explanation:
      'PVC (polyvinyl chloride) insulated cables have a maximum continuous operating temperature of 70°C. Exceeding this causes degradation of the insulation.',
  },
  {
    id: 2,
    question: 'What is the main disadvantage of standard PVC cables in a fire?',
    options: [
      'They are expensive',
      'They emit dense black smoke containing toxic halogens',
      'They conduct electricity when hot',
      'They expand excessively',
    ],
    correctAnswer: 1,
    explanation:
      'PVC contains chlorine (a halogen) which produces hydrogen chloride gas when burned. This is highly toxic and corrosive, obscuring escape routes and damaging equipment.',
  },
  {
    id: 3,
    question: 'XLPE cables can withstand short-circuit temperatures up to:',
    options: ['160°C', '200°C', '250°C', '300°C'],
    correctAnswer: 2,
    explanation:
      'XLPE insulation can withstand 250°C during short-circuit conditions (vs 160°C for PVC). This gives XLPE cables superior fault withstand capability (k = 143 vs 115).',
  },
  {
    id: 4,
    question:
      'Which cable type is most suitable for a circuit feeding emergency lighting in a hospital corridor?',
    options: ['Standard PVC/PVC', 'XLPE/SWA', 'FP (fire performance) cable', 'Flexible cord'],
    correctAnswer: 2,
    explanation:
      'Fire performance cables maintain circuit integrity during fire, essential for emergency lighting that must operate during evacuation. BS 5266 requires enhanced fire performance for emergency lighting.',
  },
  {
    id: 5,
    question: 'MI (Mineral Insulated) cable uses what material for insulation?',
    options: ['Silicon rubber', 'Magnesium oxide powder', 'Glass fibre', 'Ceramic tape'],
    correctAnswer: 1,
    explanation:
      'MI cables use compressed magnesium oxide (MgO) powder as insulation, contained within a seamless copper or steel sheath. MgO is completely fireproof and non-combustible.',
  },
  {
    id: 6,
    question: 'What is a key consideration when selecting LSF cables for a data centre?',
    options: [
      'They are cheaper than PVC',
      'Reduced smoke protects sensitive equipment and personnel',
      'They have higher current ratings',
      'They are more flexible',
    ],
    correctAnswer: 1,
    explanation:
      'Data centres contain expensive equipment and personnel. LSF cables reduce toxic smoke during fire, protecting both. Standard PVC smoke can damage electronics and hinder evacuation.',
  },
  {
    id: 7,
    question: 'The armour on SWA cables can be used as the CPC provided:',
    options: [
      'The cable is installed underground',
      'The armour is properly terminated with suitable glands and earthed',
      'The cable is less than 50m long',
      'Only in domestic installations',
    ],
    correctAnswer: 1,
    explanation:
      'SWA armour can serve as CPC when terminated with proper glands that make low-resistance contact with the armour and connect it to the earthing system at both ends.',
  },
  {
    id: 8,
    question:
      'Which cable construction provides both mechanical protection AND enhanced fire resistance?',
    options: ['PVC/SWA', 'XLPE/SWA', 'FP200 Gold', 'H07RN-F'],
    correctAnswer: 2,
    explanation:
      'FP200 Gold cables have both fire-resistant mica-glass tape insulation AND metallic armouring, providing mechanical protection and circuit integrity in fire conditions.',
  },
  {
    id: 9,
    question:
      'For external underground installation to an outbuilding, which cable type is most appropriate?',
    options: ['Twin and earth', 'SWA (Steel Wire Armoured)', 'Flexible cord', 'FP cable'],
    correctAnswer: 1,
    explanation:
      'SWA cables provide the mechanical protection needed for burial and outdoor exposure. The armour protects against ground movement, digging damage and environmental conditions.',
  },
  {
    id: 10,
    question:
      'What standard governs fire performance requirements for cables supporting emergency systems?',
    options: [
      'BS 7671 only',
      'BS 5839 (fire detection) and BS 5266 (emergency lighting)',
      'BS 8519',
      'BS EN 50575',
    ],
    correctAnswer: 1,
    explanation:
      'BS 5839 specifies cable requirements for fire alarm systems, and BS 5266 for emergency lighting. Both require cables that maintain circuit integrity in fire conditions.',
  },
];

const faqs = [
  {
    question: 'When should I specify XLPE instead of PVC cables?',
    answer:
      'Specify XLPE when: higher current capacity is needed for the same size, ambient temperatures exceed 30°C (XLPE handles heat better), fault levels are high (better k value), or when space is limited and smaller cables are advantageous. XLPE costs slightly more but often allows smaller cables, offsetting the price difference.',
  },
  {
    question: 'Are LSF/LSZH cables mandatory in all buildings?',
    answer:
      "Not universally, but they're required or strongly recommended in: escape routes and protected corridors, public buildings with high occupancy, hospitals and care homes, underground stations and tunnels, high-rise buildings, and anywhere specified by the fire strategy. Building Regulations Approved Document B and BS 5839/5266 provide guidance.",
  },
  {
    question: 'Can I use the SWA armour as the only earth conductor?',
    answer:
      'Yes, SWA armour can serve as the sole CPC for the circuit when: proper cable glands are used that grip and earth the armour, the armour has adequate cross-sectional area for fault current (check adiabatic equation), and connections are made at both ends. Many installations include an additional CPC within the cable for redundancy.',
  },
  {
    question: "What's the difference between FP and standard fire-resistant cables?",
    answer:
      "FP (Fire Performance/Piren) cables like FP200 maintain circuit integrity during fire - the circuit continues to operate while the building burns. Standard 'fire resistant' may only mean the cable won't propagate flame. For life safety systems, always specify cables meeting BS 8519 Category 1 or 2.",
  },
  {
    question: 'Why are MI cables used less frequently despite their superior fire performance?',
    answer:
      'MI cables are expensive, require specialist termination skills, and the MgO insulation is hygroscopic (absorbs moisture if seals are damaged). However, for critical applications like hospital operating theatres, nuclear facilities, or extreme environments, MI remains the gold standard.',
  },
  {
    question: 'How do I select cables for hazardous areas (ATEX)?',
    answer:
      'Hazardous area cable selection depends on zone classification and specific hazards. Generally: use cables certified for the zone, prefer armoured types, ensure IP-rated glands, and follow BS EN 60079 requirements. This is specialist work requiring explosive atmosphere competency.',
  },
];

const HNCModule4Section2_5 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 4 · Section 2 · Subsection 5"
            title="Cable Types and Selection"
            description="Understanding insulation materials, armoured cables and fire-resistant constructions."
            tone="purple"
          />

          <TLDR
            points={[
              'PVC (70&nbsp;°C) is the workhorse for general final-circuit wiring; XLPE (90&nbsp;°C) wins for sub-mains, plant rooms and where higher I_z is needed.',
              'LSF/LSZH cables produce low smoke and low/zero halogen on burning — mandatory in escape routes, public buildings, transport and underground stations.',
              'SWA (steel wire armour) provides mechanical protection for buried, plant-room and high-risk routes; AWA (aluminium wire armour) for single-core to avoid eddy currents.',
              'Fire-resistant cables (FP200, FP400, MICC) keep critical circuits live for the rated period — essential for fire alarm, emergency lighting, smoke extract, sprinkler.',
              'BS 7671 Reg 134.1.1 makes good workmanship in cable installation a mandatory requirement — wrong cable for the environment is a workmanship failure.',
            ]}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 134.1.1 (Good workmanship in erection)"
            clause="Good workmanship by one or more skilled or instructed persons shall be used in the erection of the electrical installation. This is a mandatory requirement: workmanship used in installing wiring, equipment and associated components shall meet the standard of being 'good workmanship' performed by persons who are skilled or instructed."
            meaning={
              <>
                Reg 134.1.1 is the regulatory hook for cable selection &amp; installation
                quality. Selecting PVC where LSF is needed, XLPE where fire-resistant is needed,
                or unarmoured where SWA is needed are all workmanship failures under 134.1.1 —
                even if every other table check passes. As designer you specify the right cable
                for the environment; the installer applies skilled workmanship to deliver it.
                Both signatures sit on the EIC.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 134.1.1; BS 6724 (LSF SWA), BS EN 50200 (FP cables), BS 6207 (MICC); CIBSE Guide K."
          />

          <LearningOutcomes
            outcomes={[
              'Compare PVC, XLPE and other insulation materials',
              'Specify LSF/LSZH cables for appropriate applications',
              'Select SWA cables for mechanical protection requirements',
              'Understand fire performance cable requirements (FP, MI)',
              'Apply cable selection criteria for different environments',
              'Match cable specifications to building services applications',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock title="XLPE and PVC Insulation">
            <p>
              The two most common insulation materials in building services are PVC (polyvinyl
              chloride) and XLPE (cross-linked polyethylene). Each has distinct properties
              affecting cable selection.
            </p>
            <p>
              <strong>Insulation comparison (property / PVC 70°C / XLPE 90°C):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Operating temperature: 70°C / 90°C</li>
              <li>Short-circuit temperature: 160°C / 250°C</li>
              <li>k value (copper): 115 / 143</li>
              <li>Current capacity: reference / ~20% higher</li>
              <li>Cost: lower / higher</li>
              <li>Flexibility: better / stiffer</li>
              <li>Fire performance: produces toxic smoke / less toxic smoke</li>
            </ul>
            <p>
              <strong>When to use PVC:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>General purpose final circuits</li>
              <li>Cost-sensitive installations</li>
              <li>Where flexibility is important</li>
              <li>Normal ambient temperatures</li>
              <li>Non-critical applications</li>
            </ul>
            <p>
              <strong>When to use XLPE:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>High ambient temperature locations</li>
              <li>Main distribution and sub-mains</li>
              <li>High fault level installations</li>
              <li>Space-constrained cable routes</li>
              <li>Underground and external use (with SWA)</li>
            </ul>
            <p>
              <strong>Cost tip:</strong> XLPE's higher capacity often means a smaller cable can be
              used, potentially offsetting the higher per-metre cost.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="LSF and LSZH Cables">
            <p>
              In occupied buildings, the smoke and gases released by burning cables can be more
              dangerous than the fire itself. Low Smoke and Fume (LSF) and Low Smoke Zero Halogen
              (LSZH) cables address this critical safety issue.
            </p>
            <p>
              <strong>PVC fire hazards:</strong> Standard PVC cables burning in a fire produce:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Dense black smoke:</strong> obscures escape routes
              </li>
              <li>
                <strong>Hydrogen chloride gas:</strong> toxic and corrosive
              </li>
              <li>
                <strong>Acidic residue:</strong> damages electronics and structures
              </li>
            </ul>
            <p>
              <strong>LSF vs LSZH (designation / full name / characteristics):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>LSF</strong> — Low Smoke and Fume — reduced smoke; may still contain some
                halogens
              </li>
              <li>
                <strong>LSZH / LSOH</strong> — Low Smoke Zero Halogen — no halogens; minimal toxic
                fumes
              </li>
              <li>
                <strong>OHLS</strong> — Zero Halogen Low Smoke — same as LSZH (alternative
                designation)
              </li>
            </ul>
            <p>
              <strong>Where LSF/LSZH is required or recommended:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Escape routes:</strong> corridors, stairwells, lobbies
              </li>
              <li>
                <strong>Public buildings:</strong> hospitals, schools, shopping centres
              </li>
              <li>
                <strong>Transport:</strong> underground stations, tunnels, airports
              </li>
              <li>
                <strong>High-rise:</strong> buildings where evacuation takes time
              </li>
              <li>
                <strong>Data centres:</strong> to protect sensitive equipment
              </li>
              <li>
                <strong>Ships and offshore:</strong> confined spaces
              </li>
            </ul>
            <p>
              <strong>Specification tip:</strong> Check the building fire strategy document — it
              often mandates LSF/LSZH throughout or in specific areas.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="SWA Armoured Cables">
            <p>
              Steel Wire Armoured (SWA) cables provide robust mechanical protection for demanding
              environments. They're the standard choice for external, underground and industrial
              applications in building services.
            </p>
            <p>
              <strong>SWA cable construction:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Conductors:</strong> copper or aluminium, stranded for flexibility
              </li>
              <li>
                <strong>Insulation:</strong> XLPE (preferred) or PVC around each conductor
              </li>
              <li>
                <strong>Bedding:</strong> PVC or LSF layer protecting conductors from armour
              </li>
              <li>
                <strong>Armour:</strong> galvanised steel wires wound helically
              </li>
              <li>
                <strong>Outer sheath:</strong> PVC or LSF for corrosion protection
              </li>
            </ul>
            <p>
              <strong>SWA applications (application / why SWA / notes):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Underground supplies — protects against ground movement, digging — lay with warning
                tape above
              </li>
              <li>External plant feeds — weather and UV resistance — clipped to walls or on tray</li>
              <li>Industrial areas — impact and abrasion resistance — often on ladder or tray</li>
              <li>Sub-mains — mechanical protection for major circuits — armour can act as CPC</li>
              <li>Outbuildings — protected cable to detached structures — direct burial or in duct</li>
            </ul>
            <p>
              <strong>Armour as CPC:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Requires proper gland termination</li>
              <li>Must verify adiabatic compliance</li>
              <li>Connect armour at both ends</li>
              <li>Typically used with 4-core (no internal CPC)</li>
            </ul>
            <p>
              <strong>Gland selection:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>CW glands:</strong> indoor, non-hazardous
              </li>
              <li>
                <strong>BW glands:</strong> indoor, weatherproof seal
              </li>
              <li>
                <strong>E1W glands:</strong> outdoor/weatherproof
              </li>
              <li>Match gland to cable OD and armour type</li>
            </ul>
            <p>
              <strong>Installation note:</strong> SWA minimum bending radius is typically 6× cable
              diameter for fixed installations, 8× for single bend during installation.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Fire Performance and MI Cables">
            <p>
              For life safety systems that must continue operating during a fire, standard cables
              are inadequate. Fire Performance (FP) cables and Mineral Insulated (MI) cables
              maintain circuit integrity under fire conditions.
            </p>
            <p>
              <strong>Fire performance classifications (BS 8519) — category / fire resistance / typical application:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Standard:</strong> flame retardant only — general wiring
              </li>
              <li>
                <strong>Category 1:</strong> 120 minutes at 950°C — fire alarm, emergency lighting
              </li>
              <li>
                <strong>Category 2:</strong> enhanced mechanical protection — smoke ventilation,
                sprinkler pumps
              </li>
              <li>
                <strong>Category 3:</strong> water resistance with fire — firefighting lifts, wet
                risers
              </li>
            </ul>
            <p>
              <strong>FP200 Gold:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Mica-glass tape insulation</li>
              <li>Aluminium tape screen + drain wire</li>
              <li>Maintains integrity in fire</li>
              <li>Popular for fire alarms, emergency lighting</li>
            </ul>
            <p>
              <strong>MICC / Pyro:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Mineral insulation (MgO)</li>
              <li>Copper sheath</li>
              <li>Completely fireproof</li>
              <li>Most demanding applications</li>
            </ul>
            <p>
              <strong>Life safety system cable requirements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Fire alarm (BS 5839):</strong> enhanced fire resistance required
              </li>
              <li>
                <strong>Emergency lighting (BS 5266):</strong> cable maintains circuit in fire
              </li>
              <li>
                <strong>Smoke control (BS 7346):</strong> Category 2 or 3 depending on system
              </li>
              <li>
                <strong>Firefighting lifts (BS EN 81-72):</strong> 120 minutes minimum
              </li>
              <li>
                <strong>Voice alarm (BS 5839-8):</strong> enhanced fire performance
              </li>
            </ul>
            <p>
              <strong>Mineral Insulated (MI) cables:</strong> use magnesium oxide powder insulation
              in a seamless metal sheath.
            </p>
            <p>
              <strong>Advantages:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Completely fireproof</li>
              <li>Very high temperature rating</li>
              <li>Long service life (50+ years)</li>
              <li>Sheath provides mechanical protection</li>
            </ul>
            <p>
              <strong>Disadvantages:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Expensive</li>
              <li>Specialist termination required</li>
              <li>MgO is hygroscopic (absorbs moisture)</li>
              <li>Less flexible, awkward to route</li>
            </ul>
            <p>
              <strong>Standard reference:</strong> BS 8519 specifies selection and installation of
              fire-resistant cables in buildings. Always check the fire strategy for specific
              requirements.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Selection Examples">
            <p>
              <strong>Example 1 — office distribution board sub-main:</strong> 100A 3-phase
              sub-main, 45m in riser, 35°C ambient, grouped with 5 other circuits.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Elevated ambient: favour XLPE (90°C rating)</li>
              <li>Grouped circuits: XLPE capacity advantage helps</li>
              <li>Riser location: LSF for fire safety</li>
              <li>No mechanical hazards: no armour needed</li>
              <li>
                Select: <strong>4-core 25mm² XLPE/LSF on cable tray</strong>
              </li>
            </ul>
            <p>
              <strong>Example 2 — emergency lighting circuit:</strong> emergency lighting circuit in
              hospital, 80m route through ceiling void and corridor.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Life safety circuit: fire performance required</li>
              <li>BS 5266: enhanced fire resistance needed</li>
              <li>Hospital: maximum smoke safety required</li>
              <li>Ceiling void: may need mechanical protection</li>
              <li>
                Select: <strong>FP200 Gold (2-core + CPC) Category 1</strong>
              </li>
              <li>Or MICC where budget allows maximum protection</li>
            </ul>
            <p>
              <strong>Example 3 — external chiller supply:</strong> 45kW chiller on roof, supply
              from basement, 60m route including 30m underground.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Underground section: needs SWA protection</li>
              <li>External/roof: weatherproof required</li>
              <li>60m length: check voltage drop (favour XLPE)</li>
              <li>High fault level near main: verify k²S² (XLPE helps)</li>
              <li>
                Select: <strong>4-core 16mm² XLPE/SWA throughout</strong>
              </li>
              <li>Use E1W weatherproof glands externally</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Cable selection checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Current capacity:</strong> PVC for standard, XLPE for high
                loads/temperatures
              </li>
              <li>
                <strong>Fire safety:</strong> LSF/LSZH in occupied buildings, FP for life safety
              </li>
              <li>
                <strong>Mechanical protection:</strong> SWA for external, underground, industrial
              </li>
              <li>
                <strong>Environment:</strong> match sheath to conditions (UV, moisture, chemicals)
              </li>
              <li>
                <strong>Voltage drop:</strong> consider XLPE or larger size for long runs
              </li>
            </ul>
            <p>
              <strong>Key standards reference:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>BS 5467:</strong> armoured cables for voltages up to 1000V
              </li>
              <li>
                <strong>BS 7211:</strong> thermosetting insulated cables
              </li>
              <li>
                <strong>BS 8519:</strong> fire-resistant cable selection and installation
              </li>
              <li>
                <strong>BS EN 50575:</strong> cables — reaction to fire (CPR)
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Using standard PVC in escape routes</strong> — specify LSF/LSZH
                </li>
                <li>
                  <strong>Non-FP cables for fire alarms</strong> — check BS 5839 requirements
                </li>
                <li>
                  <strong>Wrong gland type for SWA</strong> — match to environment and cable
                </li>
                <li>
                  <strong>Ignoring CPR requirements</strong> — Euroclass ratings now required
                </li>
              </ul>
            }
            doInstead="Specify LSF/LSZH cables on every escape route, use FP cables certified to BS 5839 / BS 5266 for life safety circuits, choose the gland type (CW/BW/E1W) that matches both the cable construction and the environment, and check the Euroclass / CPR rating before ordering."
          />

          <SectionRule />

          <Scenario
            title="Multi-storey hospital — specifying the cable strategy by zone"
            situation={
              <>
                A 6-storey hospital extension. Building Control require: fire alarm and emergency
                lighting on dedicated fire-rated cables, normal lighting and small power on
                LSF/LSZH (escape route requirement), an external buried sub-main from a remote
                generator, and HV ring-main feeding the substation. You need to specify cable
                types per zone and justify each choice.
              </>
            }
            whatToDo={
              <>
                Fire alarm + emergency lighting: FP200 Gold (60-min rated, BS EN 50200 PH30)
                clipped direct on the cable route. Smoke extract: FP400 (120-min). General
                lighting + small power: LSF/LSZH 6491B singles in steel trunking — meets escape
                route low-smoke requirement (Building Regs Part B). External buried sub-main:
                LSF SWA Cu/XLPE to BS 6724 with sand bedding and warning tape per BS 7671
                522.8. HV ring: 11&nbsp;kV XLPE/SWA/PVC to BS 7870. Document each choice on the
                cable schedule with the reference standard and the Reg 134.1.1 workmanship
                expectation passed to the install team.
              </>
            }
            whyItMatters={
              <>
                In a hospital, the fire-rated and LSF specifications are life-safety. Pick PVC
                in an escape route and the smoke generated during a fire kills before the fire
                does. Reg 134.1.1 makes the workmanship of selecting and installing the right
                cable a mandatory requirement — not a nice-to-have.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'PVC (70&nbsp;°C) is the general-purpose workhorse; XLPE (90&nbsp;°C) gives ≈ 20% more I_t and survives plant-room ambients better.',
              'LSF/LSZH cables (BS 6724, BS 7211) are mandatory for escape routes and many public buildings — Building Regs Part B requirement.',
              'SWA (BS 6724) gives mechanical protection for buried and high-risk routes; AWA for single-core to avoid eddy-current losses.',
              'Fire-resistant cables: FP200 (60-min PH30), FP400 (120-min PH120), MICC (mineral-insulated, longest-rated) — each to specific BS EN 50200/50362 ratings.',
              'Reg 134.1.1 makes good workmanship a mandatory requirement — including correct cable selection for the environment.',
              'Match the cable to the worst environmental condition along its route — cable type is set by the toughest zone, not the average.',
              'Document the cable type, standard, fire rating and any LSF requirement on the cable schedule.',
              'External and underground installations need additional protection: warning tape, sand bedding, mechanical cover (BS 7671 Reg 522.8.10).',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section2-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Short-circuit withstand
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section2-6')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Cable installation methods
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule4Section2_5;
