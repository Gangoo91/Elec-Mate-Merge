import { ArrowLeft, ChevronLeft, ChevronRight, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  LearningOutcomes,
  ContentEyebrow,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'elm4-s1-ph30',
    question:
      'A standard self-contained emergency luminaire is being wired in a low fire-load office. Which cable rating is the typical minimum acceptable per BS 8519 selection guidance?',
    options: [
      'No fire rating required — standard PVC/PVC twin-and-earth is acceptable on a 230 V circuit.',
      'PH30 fire-resistant cable per BS EN 50200 — the standard grade for general emergency lighting.',
      'PH120 enhanced fire-resistant cable plus the BS 8434-2 water-spray classification.',
      'Steel-wire-armoured (SWA) cable drawn into steel conduit throughout.',
    ],
    correctIndex: 1,
    explanation:
      'PH30 per BS EN 50200 is the standard fire-resistant grade. The 30-minute test exposes the cable to a defined fire curve (around 830 °C) while maintaining circuit integrity at rated voltage — long enough for occupants to evacuate the affected area in a low-risk fire load. PH120 is the enhanced grade for high-risk areas, central-battery feeds to luminaires, or BS 8519 Category 2/3 applications.',
  },
  {
    id: 'elm4-s1-ph120',
    question:
      'A central battery system feeds 60 luminaires distributed across three floors. The cabling between battery cabinet and luminaires is the life-critical signal path. What cable specification does BS 8519 typically require?',
    options: [
      'PH30 — the same grade used for self-contained luminaire feeds.',
      'PH120 enhanced cable per BS EN 50200 plus the BS 8434-2 water-spray test.',
      'Standard PVC/PVC twin-and-earth, with no fire-resistance rating.',
      'Steel-wire-armoured cable drawn into PVC conduit for protection.',
    ],
    correctIndex: 1,
    explanation:
      'BS 8519 places the cable supplying a centrally-powered luminaire in the highest category, because there is no local battery backup — if the cable fails, every luminaire downstream goes dark. PH120 + BS 8434-2 survives a 120-minute fire test AND water-spray exposure (sprinkler/hose), giving integrity for the full evacuation including under fire-fighting conditions. Self-contained luminaires each have their own battery, so a single cable failure does not extinguish their emergency function.',
  },
  {
    id: 'elm4-s1-fixings',
    question:
      'A fire-resistant cable is clipped to a wall using ordinary plastic cable ties. What is the consequence at fire temperatures?',
    options: [
      'No issue — the cable itself is fire-resistant, so the fixings do not matter.',
      'No issue — modern plastic cable ties are heat-stabilised to the cable rating.',
      'The ties soften and fail well below the cable rating, the cable drops, and circuit integrity is lost early.',
      'No issue — the cable simply hangs safely from its terminations.',
    ],
    correctIndex: 2,
    explanation:
      'Fire-resistant cable performance is a SYSTEM specification — cable, fixings, supports, joints and containment must all be fire-rated. Plastic ties soften at low temperatures, the cable falls, mechanical load rises and integrity is lost long before the cable rating would fail. BS 8519 requires metallic fixings (clips, cleats, saddles) at intervals not exceeding the manufacturer maximum (typically 300 mm horizontal, 400 mm vertical); plastic clips, ties or push-fit accessories defeat the system.',
  },
  {
    id: 'elm4-s1-2025-segregation',
    question:
      'BS 5266-1:2025 introduces a new requirement for high-risk areas — at least two separate emergency lighting circuits, with no more than 20 luminaires lost to any single fault. How does this affect cable selection and routing?',
    options: [
      'No effect — it is an electrical design issue, not a cable installation one.',
      'It forces the two circuits onto physically independent routes so one event cannot disable both.',
      'It is met simply by using a higher cable fire rating on a single shared route.',
      'It is met by one circuit of 100 luminaires protected by a residual-current device.',
    ],
    correctIndex: 1,
    explanation:
      'The 2025 high-risk requirement is a fault-tolerance architecture: two independent circuits, max 20 luminaires lost per fault. It directly drives cable installation — independent routes, segregated containment, fire-stopping, and avoidance of common-mode failures (a shared junction box, board or tray). Cable spec (PH30/PH120) addresses fire SURVIVAL of each cable; segregation addresses architectural FAULT TOLERANCE. Both must be designed in.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What does the "PH30" classification on a fire-resistant cable mean?',
    options: [
      'The cable is rated for a 30 °C maximum operating temperature.',
      'The cable is suitable for 30 A circuits only.',
      'Per BS EN 50200, the cable maintains circuit integrity at rated voltage for 30 minutes in the standard fire-resistance test (≈ 830 °C).',
      'The cable has 30 mm of insulation thickness.',
    ],
    correctAnswer: 2,
    explanation:
      'PH30 = 30-minute fire-resistance test per BS EN 50200. It is a circuit integrity classification, not a temperature, current, or insulation thickness rating. The test exposes the cable to a defined fire curve and verifies the cable continues to carry rated voltage without short circuit, open circuit, or breakdown to earth.',
  },
  {
    id: 2,
    question: 'What additional test does PH120 enhanced fire-resistant cable pass beyond the basic PH classification?',
    options: [
      'BS 8434-2 — a water-spray test simulating sprinkler/hose discharge during the fire test.',
      'A higher applied-voltage withstand test in place of the fire curve.',
      'A tighter cold bend-radius test on the finished cable.',
      'A chemical-resistance immersion test for corrosive environments.',
    ],
    correctAnswer: 0,
    explanation:
      'BS 8434-2 adds water spray to the BS EN 50200 fire test, so the cable survives fire plus the thermal shock of water on hot cable. PH120 + BS 8434-2 (sometimes annotated PH120-W or "enhanced") survives 120 minutes of fire AND water-spray exposure. This is BS 8519 Category 2/3 cable for high-risk and life-critical applications.',
  },
  {
    id: 3,
    question: 'Which BS standard provides the code for selection and installation of fire-resistant cables for life-safety circuits?',
    options: [
      'BS 7671 alone, which sets the wiring regulations framework.',
      'BS 5266-1 alone, which sets the emergency lighting layout duties.',
      'BS EN 50172, which sets the periodic testing regime.',
      'BS 8519 — the code of practice for fire-resistant life-safety cable systems.',
    ],
    correctAnswer: 3,
    explanation:
      'BS 8519 is the code of practice for selection, installation and integration of fire-resistant power and control cable systems for life safety. The cable test standards (BS EN 50200, BS 8434-2) tell you what classification a cable has; BS 8519 tells you which classification to use for which application and how to install it.',
  },
  {
    id: 4,
    question: 'A self-contained emergency luminaire has its own internal battery. The mains supply cable to the luminaire is the charging path. If that cable fails in a fire, what happens to the emergency function of the luminaire?',
    options: [
      'It immediately fails when the cable fails.',
      'It runs from its internal battery for the rated autonomy — loss of mains is the trigger, so a burned cable simply activates emergency mode.',
      'It overheats and ruptures with the cable.',
      'It draws power from the next luminaire on the circuit.',
    ],
    correctAnswer: 1,
    explanation:
      'Self-contained luminaires invert the failure logic: cable failure = mains failure = emergency function activates. The cable is the charging supply, not the life-critical signal path. Central-battery feeds invert this back: cable failure = light failure, hence the higher cable grade.',
  },
  {
    id: 5,
    question: 'BS 5266-1:2025 introduces a high-risk-area requirement. How many separate emergency lighting circuits are required, and what is the maximum number of luminaires lost per single fault?',
    options: [
      'One circuit, with no limit on the number of luminaires lost per fault.',
      'Two circuits, but with no cap on the number of luminaires lost per fault.',
      'At least two separate circuits, with no single fault disabling more than 20 luminaires.',
      'Five separate circuits, with a maximum of five luminaires lost per fault.',
    ],
    correctAnswer: 2,
    explanation:
      'The 2025 requirement is two-fold: ≥2 circuits AND ≤20 luminaires per fault — architectural redundancy plus a cap on fault consequence. Both must be satisfied. It is a fault-tolerance requirement, not a cable-grade one, though it does drive cable routing and segregation decisions.',
  },
  {
    id: 6,
    question: 'A drawing specifies "FP200 Gold cable, fixed with metal saddles at 300 mm intervals on a metal tray". The installer fits the cable with plastic saddles to "save time on the snag list". What is the consequence?',
    options: [
      'The system fire-resistance is destroyed — plastic saddles fail early and the cable falls from the tray.',
      'No consequence, because the cable\'s own fire rating is unchanged by the fixing type.',
      'The cable still works, but its fire survival drops to roughly 15 minutes.',
      'The cable performs for about double its rated fire time once tray-mounted.',
    ],
    correctAnswer: 0,
    explanation:
      'Fire-resistance is a system property. A plastic fixing on a fire-rated cable defeats the fire rating of the system: the saddles soften and fail, the cable drops from the tray and integrity is lost. BS 8519 mandates metallic fixings throughout, and reasonable engineering judgement says the same.',
  },
  {
    id: 7,
    question: 'Cable for an emergency lighting circuit passes through a fire compartment wall. What additional installation requirement applies at the penetration?',
    options: [
      'No additional requirement applies at the penetration.',
      'A bead of ordinary silicone sealant around the cable is sufficient.',
      'Wrapping the cable in insulation tape at the wall is sufficient.',
      'A certified fire-stopping seal matching the wall rating must restore the compartment (Approved Document B / BS 8519), documented as-built.',
    ],
    correctAnswer: 3,
    explanation:
      'Fire compartments contain fire spread between rooms/zones. A penetration through the compartment wall opens a path for fire spread unless fire-stopped to restore the rating. This is a fundamental Building Regulations + BS 8519 requirement.',
  },
  {
    id: 8,
    question: 'MICC (mineral-insulated copper-clad) cable is specified for an emergency lighting circuit in a particularly demanding application. What is the dominant advantage over FP200 Gold?',
    options: [
      'It is cheaper to buy per metre than FP200 Gold for the same cross-section.',
      'Inorganic magnesium-oxide insulation and a copper sheath give exceptional fire performance.',
      'It is faster and simpler to terminate and install than FP200 Gold on site.',
      'It has a smaller overall diameter than FP200 Gold for the same conductor size.',
    ],
    correctAnswer: 1,
    explanation:
      'MICC\'s inorganic magnesium-oxide insulation and copper sheath give fire survival well above 1000 °C — the highest performance available — at the cost of price, specialist termination tooling and weight. It is a specialist cable for the most demanding applications; FP200 Gold is the workhorse where PH30/PH60 suffices.',
  },
  {
    id: 9,
    question: 'BS 7671 Section 560 covers safety services. What do its source-of-supply regulations specifically address?',
    options: [
      'The colour coding of safety-service cables only.',
      'The testing procedures for safety-service circuits only.',
      'The acceptable supply sources — battery sets, generating sets, primary cells and dedicated feeds.',
      'The earthing arrangements for safety-service circuits only.',
    ],
    correctAnswer: 2,
    explanation:
      'Section 560 governs safety services: its source-of-supply regulations list the acceptable supplies (central battery sets, generating sets, primary cells and dedicated mains feeds, with conditions and segregation from non-safety circuits), and its circuit regulations cover segregation, fire-resistant wiring and labelled dedicated isolators. Together they define the infrastructure BS 5266-1 designs the layout into.',
  },
  {
    id: 10,
    question: 'When designing the cable installation for a new emergency lighting system, what is the correct sequence of decisions?',
    options: [
      'Risk-assess → BS 8519 category → cable type → routing → fixings → fire-stopping → §560 → documentation.',
      'Pick a cable first, then design the rest of the system to suit that cable.',
      'Use the cheapest available cable and rely on it being adequate for the job.',
      'Copy the cable specification from the previous similar job unchanged.',
    ],
    correctAnswer: 0,
    explanation:
      'The decision flow is risk assessment → fire-resistance category (BS 8519) → cable type → routes and segregation → fixings/containment → fire-stopping → BS 7671 §560 integration → documentation. Each step constrains the next. Skipping risk assessment lands you with under- or over-specification; skipping documentation makes hand-over and future maintenance impossible.',
  },
];

const EmergencyLightingModule4Section1 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Cable types and installation requirements | Emergency Lighting Module 4.1 | Elec-Mate',
    description:
      'BS 8519 cable selection, BS EN 50200 PH30/PH120 fire-resistance, BS 8434-2 water-spray test, FP200 Gold and MICC, BS 5266-1:2025 high-risk segregation, BS 7671 §560 supply circuits.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('/electrician/upskilling/emergency-lighting-module-4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 4
          </button>

          <PageHero
            eyebrow="Module 4 · Section 1"
            title="Cable types and installation requirements"
            description="Fire-resistant cabling is the backbone of any emergency lighting installation. PH30 for general use, PH120 + water-spray for life-critical paths, BS 8519 as the selection-and-installation code, BS 5266-1:2025 segregation, BS 7671 §560 framework. Cable type, fixings, routing, and fire-stopping work as a system — undermining any one element undermines the lot."
            tone="yellow"
          />

          <TLDR
            points={[
              'Fire-resistant cable test standards: BS EN 50200 (basic fire test, classifications PH15 / PH30 / PH60 / PH90 / PH120 by survival time) and BS 8434-2 (additional water-spray test for enhanced cable).',
              'Standard self-contained luminaires typically wired in PH30 minimum — the cable is a charging path, not the life-critical signal; loss of cable means loss of mains, which the internal battery handles.',
              'Central-battery to luminaire feeds typically wired in PH120 + BS 8434-2 — the cable IS the life-critical signal path; loss of cable means loss of light at every luminaire downstream.',
              'BS 8519 is the code of practice for selection and installation of fire-resistant cabling for life-safety services. It defines categories and required cable / fixings / containment for each.',
              'Common cable types: FP200 Gold and FP PLUS (PH30/PH60/PH120 grades) for general use, MICC (mineral-insulated copper-clad) for the most demanding applications.',
              'BS 5266-1:2025 NEW high-risk requirement: ≥2 separate emergency lighting circuits in high-risk areas, with no single fault disabling more than 20 luminaires. Drives cable routing and segregation.',
              'Fixings, supports, joints, and containment must match cable category — plastic clips, ties, or push-fit accessories defeat fire-resistance even if the cable itself is correct. Metallic fixings throughout.',
              'Fire-compartment penetrations require certified fire-stopping to restore the wall/floor rating. This is a Building Regulations + BS 8519 + BS 7671 requirement.',
              'BS 7671 §560 governs safety services — Reg 560.10 (sources of supply), Reg 560.11 (circuits, segregation, dedicated isolators labelled "EMERGENCY LIGHTING — DO NOT SWITCH OFF").',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Distinguish standard fire-resistant cable (PH30 per BS EN 50200) from enhanced fire-resistant cable (PH120 + BS 8434-2 water-spray) and identify which applies to which circuit type',
              'Select cable type using the BS 8519 application matrix — Category 1/2/3 driven by risk, escape time, building size, and supply architecture',
              'Identify common cable products (FP200 Gold, FP PLUS, MICC) and explain when each is appropriate',
              'Apply the BS 5266-1:2025 segregation requirement (≥2 circuits, ≤20 luminaires per fault) to cable routing in high-risk areas',
              'Specify fixings, supports, joints, and containment matching the fire-resistance category — metallic throughout, intervals per manufacturer, no plastic in the fire-rated route',
              'Identify fire-compartment penetrations and specify certified fire-stopping to restore the compartment rating',
              'Locate the BS 7671 §560 framework requirements for safety services (Reg 560.10 supply sources, Reg 560.11 circuits) and integrate them with BS 5266-1 / BS 8519 cable specification',
              'Recognise common installation defects — wrong cable grade, plastic fixings on fire-rated routes, missing fire-stopping, common-mode routing of redundant circuits — and explain why each undermines the protective function',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Why fire-resistant cabling matters</ContentEyebrow>

          <ConceptBlock
            title="The escape-route paradox"
            plainEnglish="Emergency lighting exists to illuminate the escape route during the fire that takes out the normal lighting. That fire is also the most aggressive environment any cable in the building will ever face. A cable that maintains circuit integrity in normal conditions but loses it five minutes into a fire is worthless for emergency lighting — it fails precisely when needed. Fire-resistant cabling is engineered to maintain circuit integrity at rated voltage during the fire, for the duration required by the building's evacuation profile."
            onSite="When you see PVC/PVC twin-and-earth being used as the supply to an emergency luminaire, that is a fundamental defect — not an aesthetic choice. The cable will fail in the very fire that is supposed to trigger the emergency lighting."
          >
            <p>The architectural reasoning behind fire-resistant cabling:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Standard cables fail thermally.</strong> PVC insulation softens at 100-120 °C
                and chars/loses dielectric strength at 200-300 °C. A typical compartment fire reaches
                500-800 °C in 5-10 minutes. Standard cable is short-circuit, open-circuit, or earth-fault
                long before evacuation is complete.
              </li>
              <li>
                <strong>Fire-resistant cables maintain integrity.</strong> The insulation is replaced
                with mineral materials (compressed magnesium oxide for MICC, mica tape and silicone
                composites for FP cables) that remain insulating at temperatures well above the cable
                rating. The conductor remains conductor; the insulator remains insulator.
              </li>
              <li>
                <strong>System-level rating.</strong> The cable is one element of a fire-rated SYSTEM
                that includes fixings, supports, joints, and containment. Each element must match the
                category. A plastic clip on a fire-rated cable defeats the system.
              </li>
              <li>
                <strong>Categories match risk.</strong> BS 8519 categorises applications by risk and
                consequence. Standard fire-resistant (PH30) for general low-risk; enhanced (PH120 +
                water-spray) for life-critical paths and central-battery feeds.
              </li>
            </ul>
            <p>
              The investment in fire-resistant cabling is the single largest material cost differentiator
              between a compliant emergency lighting installation and a non-compliant one. Cutting
              corners here is detected by inspection, by post-incident investigation, and by the
              consequence of failure during real evacuation.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 560.10 (Sources of supply) and Reg 560.11 (Circuits)"
            clause={
              <>
                A safety service shall be supplied from a source independent of the normal supply, or
                from a source so arranged that failure of one supply will not cause failure of the
                other. Circuits supplying safety services shall be kept independent of any other
                circuit. Wiring of safety services shall be either fire-resistant or installed in a
                fire-resistant route. Means shall be provided to ensure unintended switching off does
                not interrupt the service.
              </>
            }
            meaning="Three load-bearing requirements. (1) Independent supply source. (2) Independent circuit. (3) Fire-resistant wiring or fire-resistant route. Plus the labelled-isolator requirement so a maintenance electrician cannot accidentally kill the emergency lighting via an unmarked switch. BS 5266-1 and BS 8519 fill in the detailed cable selection and installation; BS 7671 §560 is the framework regulation."
          />

          <ConceptBlock
            title="The two failure modes the cable must survive"
            plainEnglish="Fire-resistant cable is tested against two distinct failure mechanisms. First, thermal failure — the heat of the fire degrading the insulation until cores short or break. Second, mechanical-thermal failure — water hitting hot cable, causing thermal shock, mechanical stress from sprinkler discharge, and loss of containment. The basic BS EN 50200 test addresses thermal only; the BS 8434-2 water-spray addition addresses mechanical-thermal. Enhanced PH120 cable passes BOTH."
          >
            <p>The two test regimes:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>BS EN 50200 (fire only).</strong> The cable is mounted on a standard rig and
                exposed to a defined fire curve (≈ 830 °C). At intervals during the test the cable
                must continue to carry rated voltage without short-circuit, open-circuit, or breakdown
                to earth. The classification is the duration in minutes the cable survives — PH15,
                PH30, PH60, PH90, PH120.
              </li>
              <li>
                <strong>BS 8434-2 (fire + water spray).</strong> The cable is exposed to the same fire
                curve, AND a water spray is applied during the test (simulating sprinkler discharge or
                fire-fighting hose stream). The cable must survive both stresses simultaneously. This
                is the test that distinguishes "enhanced" fire-resistant cable from standard.
              </li>
              <li>
                <strong>Combined classification.</strong> A typical enhanced cable is rated "PH120 +
                BS 8434-2" or marketed as "enhanced 120-minute" — meaning it passes BS EN 50200 to PH120
                AND the BS 8434-2 water-spray test. This is the cable BS 8519 specifies for life-critical
                circuits.
              </li>
            </ul>
            <p>
              The choice between standard and enhanced is not aesthetic. It is driven by the
              consequence of cable failure during fire-fighting: if losing the cable means losing the
              life-critical light, the cable must survive water spray as well as fire. If the
              luminaire has its own internal battery (self-contained), the cable losing in a fire is
              tolerable because the luminaire continues from the battery.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          {/* Cable cross-section comparison: PH30 vs PH120 */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram 1
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Cable cross-section comparison — standard PH30 vs enhanced PH120
            </h4>
            <svg
              viewBox="0 0 880 460"
              className="w-full h-auto"
              role="img"
              aria-label="Comparative cross-sections of a PH30 standard fire-resistant cable on the left and a PH120 enhanced fire-resistant cable on the right, showing copper conductor, mineral/silicone insulation layers, and outer sheath. The PH120 has additional protective layers and is rated for the BS 8434-2 water-spray test."
            >
              {/* PH30 (left) */}
              <g>
                <rect
                  x="40"
                  y="40"
                  width="370"
                  height="380"
                  rx="14"
                  fill="rgba(251,191,36,0.05)"
                  stroke="#FBBF24"
                  strokeWidth="2"
                />
                <text x="225" y="68" textAnchor="middle" fill="#FBBF24" fontSize="14" fontWeight="bold">
                  PH30 — Standard
                </text>
                <text x="225" y="84" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                  BS EN 50200 · 30-min fire integrity
                </text>

                {/* Outer sheath */}
                <circle cx="225" cy="220" r="120" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.45)" strokeWidth="1.6" />
                <text x="225" y="115" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9.5">LSZH outer sheath</text>

                {/* Insulation */}
                <circle cx="225" cy="220" r="92" fill="rgba(34,211,238,0.08)" stroke="#22D3EE" strokeWidth="1.6" strokeDasharray="5,3" />
                <text x="225" y="148" textAnchor="middle" fill="#22D3EE" fontSize="9.5">Mica/silicone insulation</text>

                {/* Cores - 2C+E */}
                <circle cx="195" cy="208" r="22" fill="rgba(239,68,68,0.7)" stroke="#EF4444" strokeWidth="1.4" />
                <text x="195" y="213" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">L</text>
                <circle cx="255" cy="208" r="22" fill="rgba(59,130,246,0.7)" stroke="#3B82F6" strokeWidth="1.4" />
                <text x="255" y="213" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">N</text>
                <circle cx="225" cy="262" r="20" fill="rgba(34,197,94,0.6)" stroke="#22C55E" strokeWidth="1.4" />
                <text x="225" y="266" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">CPC</text>

                <text x="225" y="356" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10" fontWeight="bold">
                  Typical use
                </text>
                <text x="225" y="372" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9.5">
                  Self-contained luminaires
                </text>
                <text x="225" y="386" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9.5">
                  General lower-risk areas
                </text>
                <text x="225" y="400" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9.5">
                  e.g. FP200 Gold (PH30 grade)
                </text>
              </g>

              {/* PH120 (right) */}
              <g>
                <rect
                  x="470"
                  y="40"
                  width="370"
                  height="380"
                  rx="14"
                  fill="rgba(239,68,68,0.05)"
                  stroke="#EF4444"
                  strokeWidth="2"
                />
                <text x="655" y="68" textAnchor="middle" fill="#EF4444" fontSize="14" fontWeight="bold">
                  PH120 — Enhanced
                </text>
                <text x="655" y="84" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                  BS EN 50200 + BS 8434-2 water-spray
                </text>

                {/* Outer sheath */}
                <circle cx="655" cy="220" r="130" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.6" />
                <text x="655" y="105" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9.5">LSZH outer sheath</text>

                {/* Mechanical protection layer (extra) */}
                <circle cx="655" cy="220" r="112" fill="rgba(168,85,247,0.06)" stroke="#A855F7" strokeWidth="1.4" strokeDasharray="3,2" />
                <text x="655" y="125" textAnchor="middle" fill="#A855F7" fontSize="9.5">Mechanical / water barrier</text>

                {/* Enhanced insulation */}
                <circle cx="655" cy="220" r="92" fill="rgba(34,211,238,0.10)" stroke="#22D3EE" strokeWidth="1.8" strokeDasharray="5,3" />
                <text x="655" y="148" textAnchor="middle" fill="#22D3EE" fontSize="9.5">Enhanced mica/ceramic insulation</text>

                {/* Cores - 2C+E */}
                <circle cx="625" cy="208" r="22" fill="rgba(239,68,68,0.7)" stroke="#EF4444" strokeWidth="1.4" />
                <text x="625" y="213" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">L</text>
                <circle cx="685" cy="208" r="22" fill="rgba(59,130,246,0.7)" stroke="#3B82F6" strokeWidth="1.4" />
                <text x="685" y="213" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">N</text>
                <circle cx="655" cy="262" r="20" fill="rgba(34,197,94,0.6)" stroke="#22C55E" strokeWidth="1.4" />
                <text x="655" y="266" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">CPC</text>

                <text x="655" y="356" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10" fontWeight="bold">
                  Typical use
                </text>
                <text x="655" y="372" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9.5">
                  Central battery → luminaire feeds
                </text>
                <text x="655" y="386" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9.5">
                  High-risk areas, long evacuation
                </text>
                <text x="655" y="400" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9.5">
                  e.g. FP PLUS, MICC
                </text>
              </g>
            </svg>
          </div>

          <SectionRule />

          <ContentEyebrow>BS 8519 — selecting the right cable for the right circuit</ContentEyebrow>

          <ConceptBlock
            title="The application matrix"
            plainEnglish="BS 8519 is the code of practice that ties cable category to application. It thinks in terms of categories driven by risk and consequence. The code does not read like a table you copy from; it reads like a decision flow you walk through with the system designer. The categories broadly map to: Category 1 standard (low-risk, short evacuation, self-contained luminaires) → PH30 cable adequate. Category 2 enhanced (medium-risk, longer evacuation, high-occupancy) → PH60 or PH120 cable. Category 3 critical (high-risk, very long evacuation, life-critical signal paths, central battery feeds) → PH120 + BS 8434-2 water-spray cable."
          >
            <p>The decision drivers BS 8519 expects you to weigh:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Building size and complexity.</strong> Larger buildings have longer evacuation
                times, which means cables must survive longer in a fire. A small office may need PH30;
                a large hospital or shopping centre may need PH120.
              </li>
              <li>
                <strong>Occupant profile.</strong> Mobile able-bodied occupants evacuate faster than
                vulnerable, sleeping, or restrained occupants. Hospitals, residential care homes,
                hotels, and detention facilities all push the category upward.
              </li>
              <li>
                <strong>Fire load.</strong> Plant rooms, storage areas, kitchens, and laboratories have
                higher fire loads than offices. Cables in or near high-fire-load areas need higher
                category.
              </li>
              <li>
                <strong>Supply architecture.</strong> Self-contained luminaires (own battery) tolerate
                cable failure; central-battery systems do not. The cable feeding centrally-powered
                luminaires must survive as long as the system runs from the battery — typically the
                full design autonomy.
              </li>
              <li>
                <strong>Life-critical paths.</strong> Cables to signage marking the final exit, to
                luminaires illuminating an evacuation lift, or to luminaires in the only escape route
                from a deep basement, all push toward the highest category regardless of building size.
              </li>
            </ul>
            <p>
              The output of the matrix is a category for each circuit, not a single category for the
              whole installation. A large mixed-use building might have Category 1 cabling to office
              areas, Category 2 to shared corridors, and Category 3 to the basement plant rooms and
              the high-rise stair core.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 8519 · Code of practice for selection and installation of fire-resistant power and control cable systems for life safety"
            clause={
              <>
                The selection of fire-resistant cable shall be based on the assessed category of the
                application, taking into account the building risk profile, the duration the circuit
                must remain operational, and the supply architecture. Installation shall ensure that
                the system performance — cable, fixings, supports, joints, and containment — meets
                the category throughout the cable route.
              </>
            }
            meaning="Two key phrases. (1) 'Assessed category' — selection follows risk assessment, not habit. (2) 'System performance — cable, fixings, supports, joints, and containment' — fire-resistance is a system property; specifying the cable alone is half the job. The fixings, supports, joints, and containment must all match the category."
          />

          {/* BS 8519 application matrix diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram 2
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              BS 8519 application matrix — selecting cable category by risk and architecture
            </h4>
            <svg
              viewBox="0 0 880 480"
              className="w-full h-auto"
              role="img"
              aria-label="A matrix showing how building risk profile and supply architecture map to cable category. Low-risk self-contained = Category 1 / PH30. Medium-risk = Category 2 / PH60. High-risk central battery = Category 3 / PH120 + water-spray."
            >
              {/* Headers */}
              <text x="440" y="30" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">
                BS 8519 cable category by risk and architecture
              </text>

              {/* Y-axis: risk */}
              <text x="40" y="80" fill="rgba(255,255,255,0.7)" fontSize="10" fontWeight="bold">
                Risk
              </text>
              <text x="40" y="150" fill="rgba(34,197,94,0.85)" fontSize="10">
                Low
              </text>
              <text x="40" y="260" fill="rgba(251,191,36,0.85)" fontSize="10">
                Medium
              </text>
              <text x="40" y="370" fill="rgba(239,68,68,0.85)" fontSize="10">
                High
              </text>

              {/* X-axis: architecture */}
              <text x="220" y="80" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10" fontWeight="bold">
                Self-contained
              </text>
              <text x="220" y="94" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                (own battery)
              </text>
              <text x="440" y="80" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10" fontWeight="bold">
                Hybrid
              </text>
              <text x="440" y="94" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                (mixed)
              </text>
              <text x="660" y="80" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10" fontWeight="bold">
                Central battery
              </text>
              <text x="660" y="94" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                (cable = signal path)
              </text>

              {/* Cells */}
              {/* Low/Self-contained */}
              <rect x="120" y="115" width="200" height="80" rx="10" fill="rgba(34,197,94,0.10)" stroke="#22C55E" strokeWidth="1.6" />
              <text x="220" y="140" textAnchor="middle" fill="#22C55E" fontSize="11" fontWeight="bold">Cat 1 · PH30</text>
              <text x="220" y="158" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9.5">FP200 Gold</text>
              <text x="220" y="174" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">Office, retail unit</text>

              {/* Low/Hybrid */}
              <rect x="340" y="115" width="200" height="80" rx="10" fill="rgba(34,197,94,0.10)" stroke="#22C55E" strokeWidth="1.6" />
              <text x="440" y="140" textAnchor="middle" fill="#22C55E" fontSize="11" fontWeight="bold">Cat 1 · PH30</text>
              <text x="440" y="158" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9.5">FP200 Gold</text>
              <text x="440" y="174" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">Small mixed-use</text>

              {/* Low/Central */}
              <rect x="560" y="115" width="200" height="80" rx="10" fill="rgba(251,191,36,0.10)" stroke="#FBBF24" strokeWidth="1.6" />
              <text x="660" y="140" textAnchor="middle" fill="#FBBF24" fontSize="11" fontWeight="bold">Cat 2 · PH60</text>
              <text x="660" y="158" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9.5">FP PLUS</text>
              <text x="660" y="174" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">Small central plant</text>

              {/* Medium/Self-contained */}
              <rect x="120" y="225" width="200" height="80" rx="10" fill="rgba(251,191,36,0.10)" stroke="#FBBF24" strokeWidth="1.6" />
              <text x="220" y="250" textAnchor="middle" fill="#FBBF24" fontSize="11" fontWeight="bold">Cat 2 · PH60</text>
              <text x="220" y="268" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9.5">FP200 Gold (PH60)</text>
              <text x="220" y="284" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">Hotel, school, clinic</text>

              {/* Medium/Hybrid */}
              <rect x="340" y="225" width="200" height="80" rx="10" fill="rgba(251,191,36,0.10)" stroke="#FBBF24" strokeWidth="1.6" />
              <text x="440" y="250" textAnchor="middle" fill="#FBBF24" fontSize="11" fontWeight="bold">Cat 2 · PH60</text>
              <text x="440" y="268" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9.5">FP PLUS</text>
              <text x="440" y="284" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">Mixed-use medium</text>

              {/* Medium/Central */}
              <rect x="560" y="225" width="200" height="80" rx="10" fill="rgba(239,68,68,0.10)" stroke="#EF4444" strokeWidth="1.6" />
              <text x="660" y="250" textAnchor="middle" fill="#EF4444" fontSize="11" fontWeight="bold">Cat 3 · PH120 + W</text>
              <text x="660" y="268" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9.5">FP PLUS / MICC</text>
              <text x="660" y="284" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">Large central battery</text>

              {/* High/Self-contained */}
              <rect x="120" y="335" width="200" height="80" rx="10" fill="rgba(239,68,68,0.10)" stroke="#EF4444" strokeWidth="1.6" />
              <text x="220" y="360" textAnchor="middle" fill="#EF4444" fontSize="11" fontWeight="bold">Cat 3 · PH120</text>
              <text x="220" y="378" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9.5">FP PLUS</text>
              <text x="220" y="394" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">Hospital, care home</text>

              {/* High/Hybrid */}
              <rect x="340" y="335" width="200" height="80" rx="10" fill="rgba(239,68,68,0.10)" stroke="#EF4444" strokeWidth="1.6" />
              <text x="440" y="360" textAnchor="middle" fill="#EF4444" fontSize="11" fontWeight="bold">Cat 3 · PH120 + W</text>
              <text x="440" y="378" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9.5">FP PLUS / MICC</text>
              <text x="440" y="394" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">Large complex building</text>

              {/* High/Central */}
              <rect x="560" y="335" width="200" height="80" rx="10" fill="rgba(239,68,68,0.18)" stroke="#EF4444" strokeWidth="2" />
              <text x="660" y="360" textAnchor="middle" fill="#EF4444" fontSize="11" fontWeight="bold">Cat 3 · PH120 + W</text>
              <text x="660" y="378" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9.5">MICC preferred</text>
              <text x="660" y="394" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">High-rise, hospital</text>

              {/* Footnote */}
              <text x="440" y="450" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                "+ W" = additional BS 8434-2 water-spray test rating · Categories illustrative — confirm against full BS 8519 risk assessment
              </text>
            </svg>
          </div>

          <ConceptBlock
            title="Common cable products and where they fit"
            plainEnglish="The cable specifications above are realised in real-world products. The two dominant families in UK life-safety installations are FP-series cables (Prysmian, Draka, others) and MICC. Each has a place; each has trade-offs."
          >
            <p>Cable products and typical applications:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>FP200 Gold.</strong> The workhorse for general emergency lighting and fire alarm
                cabling. Available in PH30 (most common), PH60, and PH120 grades. Easy to work with —
                terminates like ordinary cable, no specialist tooling. Fixings on metal saddles or
                clips at manufacturer-specified intervals (typically 300 mm horizontal, 400 mm
                vertical). Suitable for the majority of Category 1 and many Category 2 applications.
              </li>
              <li>
                <strong>FP PLUS.</strong> Enhanced version with PH120 + BS 8434-2 water-spray
                classification. Used where Category 3 is required and MICC is not justified by the
                application. Same termination simplicity as FP200 Gold. Larger and more expensive but
                still installer-friendly compared with MICC.
              </li>
              <li>
                <strong>MICC (mineral-insulated copper-clad).</strong> The gold-standard fire-resistant
                cable. Compressed magnesium oxide insulation in a continuous copper sheath — inorganic,
                non-combustible, performance well above PH120 in many test conditions. Used in the most
                demanding applications: hospitals, high-rise residential, deep basements, plant rooms,
                petrochemical, marine. Trade-offs: specialist termination tooling and gland kits, larger
                bend radius, higher cost, more weight, slower install.
              </li>
              <li>
                <strong>Other named products.</strong> Draka Firetuf, Prysmian Total, Pyro, etc. Always
                check the actual classification on the product datasheet (PH grade, BS 8434-2 rating,
                BS 8519 category) — the marketing name does not by itself guarantee a category.
              </li>
            </ul>
            <p>
              The cable spec on the drawings should be unambiguous: "FP200 Gold PH30, 1.5 mm², 2C+E,
              metal clip-fixed at 300 mm horizontal / 400 mm vertical, fire-stopped at all
              compartment penetrations". A spec that says only "fire-resistant cable" is incomplete
              and gets specified up by the contractor (which the client may not have priced for).
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Installation requirements — fixings, supports, containment</ContentEyebrow>

          <ConceptBlock
            title="Fire-resistance is a system, not a cable"
            plainEnglish="Specifying the right cable is necessary but not sufficient. Fire-resistance is realised by the WHOLE installation — the cable, the clips holding it to the wall, the saddles supporting it on the tray, the joints/junction boxes connecting sections, the containment routing it through the building, and the fire-stopping at every compartment penetration. Each element must match the cable category. A single weak link defeats the whole."
          >
            <p>The system elements:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Fixings.</strong> Metallic only on a fire-rated route. Clips, saddles, cleats,
                P-clips made of steel, brass, or other metals that retain mechanical strength at fire
                temperatures. Plastic ties, plastic saddles, push-fit accessories, hot-melt adhesives —
                all defeat the system. Spacing per manufacturer's instructions, typically 300 mm
                horizontal and 400 mm vertical, closer at terminations and changes of direction.
              </li>
              <li>
                <strong>Supports.</strong> Cable tray, ladder, basket, or trunking carrying the cable
                must itself be fire-rated to the same category. A galvanised steel tray will retain
                its load-bearing capability through a 30-minute fire; a plastic basket will not.
                Tray/ladder supports (drop rods, wall brackets) must equally be metallic and rated.
              </li>
              <li>
                <strong>Joints.</strong> Junction boxes and joints in fire-rated cable must use
                fire-rated terminals and enclosures. Standard plastic junction boxes are NOT
                acceptable on a fire-rated route. Metal enclosures with ceramic or mineral-insulated
                terminations and fire-rated cable glands are the norm.
              </li>
              <li>
                <strong>Containment.</strong> Where cable runs in conduit or trunking, the conduit/trunking
                must be metal (typically galvanised or stainless steel). Plastic conduit melts and
                provides no protection. Where the cable runs on tray, the tray itself is the
                containment.
              </li>
              <li>
                <strong>Fire-stopping.</strong> Every penetration of a fire-rated wall, floor, or
                ceiling must be sealed with certified fire-stopping to restore the rating of the
                element. Intumescent compound, fire-rated mortar, fire pillows, fire collars — the
                appropriate method depends on the penetration type, the cable, the containment, and
                the rating to be restored. Documented on as-built drawings.
              </li>
              <li>
                <strong>Segregation.</strong> Where BS 5266-1:2025 requires ≥2 separate emergency
                lighting circuits in high-risk areas, the cables for those circuits must be routed
                independently. Sharing a single cable tray, a single junction box, or a single
                conduit run defeats the segregation purpose because a single fire/mechanical event
                can take both out.
              </li>
            </ul>
            <p>
              The system specification on a drawing or in a schedule of work should call out every
              element. "Fire-resistant cable" alone leaves the fixings, the joints, the containment,
              and the fire-stopping unspecified — and that is where the costliest defects creep in.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Specifying the cable but not the fixings"
            whatHappens="A drawing reads 'FP200 Gold PH30 throughout' and nothing else. The contractor procures FP200 Gold and fixes it with the cheapest plastic cable ties available because they are not specified otherwise. The installation is electrically functional and looks tidy. Six months later a fire in an adjacent room raises temperatures in the void above the suspended ceiling. The plastic ties soften at 200 °C and fail. The cable falls onto the suspended ceiling tiles. The strain on the cores at the terminations exceeds rated values. The cable goes open-circuit. The emergency lighting in the corridor below is dark for the second half of the evacuation."
            doInstead="Specify the system, not just the cable. The drawing or schedule of work should read 'FP200 Gold PH30, 1.5 mm² 2C+E, metallic saddle-fixed at 300 mm horizontal / 400 mm vertical, on galvanised steel tray, fire-stopped at all compartment penetrations to maintain wall rating, junction boxes to be fire-rated metallic enclosures with ceramic terminations'. Every element of the system named explicitly. The contractor prices the right job and installs the right job."
          />

          <CommonMistake
            title="Routing two redundant circuits through a single cable tray"
            whatHappens="A high-risk zone is provided with two emergency lighting circuits per the BS 5266-1:2025 requirement. The cables are correctly specified PH120. Both circuits share a single galvanised cable tray running along the corridor. A fire in the void above the corridor breaches the ceiling and damages the tray; both cables are mechanically destroyed at the same point. Both circuits go open-circuit simultaneously. The architectural redundancy is defeated by common-mode failure at the tray. Both circuits down means the corridor is dark."
            doInstead="When BS 5266-1:2025 requires two separate circuits, route them through INDEPENDENT physical paths. Different trays, different risers, different walls where practical, opposite sides of the corridor at minimum. The cables themselves must be PH-rated, but the routing must be designed so that no single fire/mechanical event can take both out. The same logic applies to junction boxes (each circuit gets its own), to distribution boards (consider separate boards or at minimum separate ways and separate isolators), and to the supply itself."
          />

          <Scenario
            title="Cable to a corridor luminaire passing through a plant room"
            situation="An emergency luminaire in a 15-storey office tower's escape corridor is fed from a central battery cabinet two floors above. The cable run from the cabinet to the luminaire passes through a plant room containing a transformer, the boiler plant, and a sprinkler riser. The cable is currently specified PH30 — selected on the basis that the corridor is a Category 2 application."
            whatToDo="The PH30 specification is wrong because the cable passes through a high-fire-load plant room. The dominant risk is a plant-room fire involving the transformer or boiler — a fire that may trigger the sprinkler system, exposing any cable in the room to fire AND water spray simultaneously. The cable specification must reflect the WORST environment along its route, not the average. Upgrade to PH120 + BS 8434-2 (FP PLUS or MICC) for the section through the plant room at minimum. Better: upgrade the entire cable run to remove the discontinuity at the plant-room boundary. Document the rationale on the design drawings ('cable passes through Cat 3 environment; specified PH120 + W throughout'). The slight cost increase is dwarfed by the consequence of cable failure during an evacuation triggered by plant-room fire."
            whyItMatters="Cable specification follows the WORST environment along the route, not the destination's category. A corridor luminaire in a Category 2 corridor still needs Category 3 cable if its supply passes through a Category 3 environment. This pattern catches out designers who think category-by-room rather than category-by-route."
          />

          <RegsCallout
            source="BS 5266-1:2025 · Clause 8 (high-risk areas) and BS 8519 · §6 (installation system requirements)"
            clause={
              <>
                In high-risk task areas, emergency lighting shall be provided by at least two separate
                circuits arranged so that no single fault disables more than 20 luminaires. The cable
                installation shall ensure that fire-resistance performance — cable, fixings, supports,
                joints, containment, and fire-stopping — meets the assessed category throughout the
                cable route, with no single point of common-mode failure between redundant circuits.
              </>
            }
            meaning="Two complementary requirements. (1) Architectural fault tolerance — ≥2 circuits, ≤20 luminaires per fault. (2) Physical segregation — the redundant circuits must be routed so that no single fire/mechanical event can take both out. Specifying two circuits but routing them through the same tray defeats (1) via (2). The installer's job is to make both true simultaneously."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Fire-stopping at compartment penetrations</ContentEyebrow>

          <ConceptBlock
            title="Why fire-stopping is part of the cable installation"
            plainEnglish="The building is divided into fire compartments — rooms, zones, floors — separated by walls and floors with a tested fire-resistance rating (typically 30, 60, or 120 minutes). The compartment rating contains fire spread and protects the escape route long enough for evacuation. Any penetration of a compartment boundary by a service (cable, pipe, duct) opens a path for fire spread and SMOKE spread unless the penetration is sealed with certified fire-stopping that restores the rating of the element. Cable installation that does not include fire-stopping is incomplete, non-compliant, and a defect in its own right."
          >
            <p>The fire-stopping requirements:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Identify every compartment penetration.</strong> Walk the cable route and
                identify every wall, floor, ceiling, or partition with a fire rating that the cable
                crosses. This is documented on the as-built drawings.
              </li>
              <li>
                <strong>Match the seal to the rating.</strong> A 60-minute fire-rated wall needs a
                60-minute fire-stopping system. A 120-minute floor needs 120-minute fire-stopping.
                Mismatched seals are a defect.
              </li>
              <li>
                <strong>Match the seal to the cable type and containment.</strong> Different cable
                types and different containment (single cable, multiple cables, conduit, tray, basket)
                need different fire-stopping methods. Intumescent compound for individual cables
                through small openings; fire pillows for cable bundles in trays; fire-rated mortar for
                masonry penetrations; fire collars on metal conduit.
              </li>
              <li>
                <strong>Install per manufacturer's instructions.</strong> Fire-stopping is tested as a
                certified system — compound + bonding + cover plates per the manufacturer's data
                sheet. Deviations void the certification.
              </li>
              <li>
                <strong>Document.</strong> Every fire-stopped penetration is logged with photo
                evidence, certificate reference, location, and date. This is the audit trail that
                inspection authorities, insurers, and post-incident investigators rely on.
              </li>
            </ul>
            <p>
              Fire-stopping is the most-skipped element of a fire-rated cable installation because it
              comes at the end, when the trades are under time pressure. It is also the most heavily
              checked at inspection because it is highly visible and a known weak point. Doing it right
              first time is far cheaper than retrofitting under client pressure.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="The labelled isolator — Reg 560.11"
            plainEnglish="The mains supply to a central battery cabinet, or to a dedicated emergency lighting distribution board, must have a means of isolation. That means is required to be (a) lockable in the OFF position for maintenance, AND (b) clearly labelled so that no one switches it off thinking it is an ordinary supply. The standard label reads 'EMERGENCY LIGHTING — DO NOT SWITCH OFF' or similar. This is a BS 7671 §560.11 requirement and a BS 5266-1 expectation. It is the single cheapest detail to install and the most commonly overlooked."
          >
            <p>The labelling requirements:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Lockable isolator.</strong> The isolator at the supply origin is lockable in
                the OFF position. Maintenance staff lock it off, work safely, and unlock it when work
                is complete. This is a BS 7671 + Electricity at Work Regulations requirement.
              </li>
              <li>
                <strong>Permanent label.</strong> The label is permanent — engraved Traffolyte or
                equivalent, fixed by screws or mechanical means. Sticky labels fall off. The text is
                clear, in a visible colour, and unambiguous: "EMERGENCY LIGHTING — DO NOT SWITCH OFF".
              </li>
              <li>
                <strong>At every accessible isolation point.</strong> The label is at the main
                isolator, at any sub-isolators, at the distribution board, and at the central battery
                cabinet supply terminal. Anywhere a person could reasonably switch off the supply
                without realising what it does.
              </li>
              <li>
                <strong>Visible from the operator's normal position.</strong> A label hidden behind
                cable doors or inside an enclosure is no use. The label must be visible to whoever
                operates the isolator.
              </li>
            </ul>
            <p>
              The cost is a few pounds. The consequence of skipping it is that some maintenance
              electrician switches off the emergency lighting supply two days before an audit, or
              before a fire, and no one notices because the system reverts to "normal" with the
              luminaires cold and dark.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Documentation — the cable record on the as-built</ContentEyebrow>

          <ConceptBlock
            title="What the as-built drawings must show"
            plainEnglish="The cable installation is documented on the as-built drawings and accompanying schedules. Future testing, inspection, fault-finding, and modification all depend on that documentation. A correctly installed cable installation with poor documentation is a fault waiting to happen, because the next person on site cannot tell what is what."
          >
            <p>The as-built drawings must show:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Cable type and rating.</strong> "FP200 Gold PH30, 1.5 mm² 2C+E" — not just
                "fire-resistant cable". Type, rating, cross-section, number of cores, and earth.
              </li>
              <li>
                <strong>Cable route.</strong> The actual route as installed, not the design intent.
                Where the cable deviates from drawing during install, the drawing is updated.
              </li>
              <li>
                <strong>Fixing intervals and method.</strong> "300 mm horizontal / 400 mm vertical,
                galvanised metal saddle-fixed".
              </li>
              <li>
                <strong>Containment.</strong> Tray, ladder, conduit, trunking — type, rating, supports.
              </li>
              <li>
                <strong>Compartment penetrations.</strong> Every penetration marked, with the
                fire-stopping system used (manufacturer, certificate reference, rating).
              </li>
              <li>
                <strong>Junction boxes / joints.</strong> Location, type (fire-rated metallic), and
                purpose.
              </li>
              <li>
                <strong>Distribution boards and supply origin.</strong> The dedicated DB or way, the
                isolator location, the labelled-isolator confirmation.
              </li>
              <li>
                <strong>Zone boundaries.</strong> Where one emergency lighting circuit ends and
                another begins, particularly for the BS 5266-1:2025 segregated circuits.
              </li>
            </ul>
            <p>
              The as-built drawings, the schedule of work, the cable schedule, the photo log of
              fire-stopping, and the test results together form the hand-over pack. Without them, the
              client cannot evidence compliance and the next contractor on site is working blind.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5266-1:2025 · Documentation requirements"
            clause={
              <>
                The hand-over documentation shall include as-built drawings showing cable type, route,
                fixings, containment, fire-compartment penetrations with fire-stopping certification,
                supply arrangements, isolation and labelling, and zone boundaries for segregated
                circuits. Test certificates for cable routes, continuity, insulation resistance, and
                photometric performance shall be attached. Documentation shall be retained for the
                operational life of the installation.
              </>
            }
            meaning="The 2025 edition tightens the documentation requirement and lists the elements explicitly. Drawings, certificates, and test records together. 'Operational life of the installation' — not just hand-over but the full service life. The duty-holder responsibility starts at hand-over and continues until the system is decommissioned."
          />

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Fire-resistant cable test standards: BS EN 50200 (PH classifications by survival time) and BS 8434-2 (water-spray addition for enhanced grade).',
              'Standard self-contained luminaires typically wired in PH30 minimum — cable failure = mains failure, internal battery handles emergency function.',
              'Central-battery to luminaire feeds typically wired in PH120 + BS 8434-2 — cable IS the life-critical signal path; failure means the light goes out.',
              'BS 8519 is the code of practice for selection and installation. Categories follow risk × architecture; specification follows category.',
              'BS 5266-1:2025 NEW: ≥2 separate emergency lighting circuits in high-risk areas, with no single fault disabling more than 20 luminaires. Drives both cable specification AND routing/segregation.',
              'Common cables: FP200 Gold (general workhorse, PH30/60/120 grades), FP PLUS (enhanced PH120 + W), MICC (highest-performance specialist cable for the most demanding applications).',
              'Fire-resistance is a SYSTEM — cable + metallic fixings + metallic containment + fire-rated joints + fire-stopping at every compartment penetration. Plastic anywhere defeats the system.',
              'Cable specification follows the WORST environment along the route, not the destination category — a Category 2 corridor luminaire fed through a Category 3 plant room needs Category 3 cable.',
              'BS 7671 §560 framework: Reg 560.10 supply sources, Reg 560.11 circuits + segregation + labelled lockable isolator ("EMERGENCY LIGHTING — DO NOT SWITCH OFF").',
              'As-built documentation: cable type, route, fixings, containment, compartment penetrations with fire-stopping certificates, supply arrangements, segregated-circuit zone boundaries.',
            ]}
          />

          <FAQ
            items={[
              {
                question: 'What is the difference between PH30 and PH120 fire-resistant cable?',
                answer:
                  'The number is the survival time in minutes under the BS EN 50200 fire-resistance test. PH30 maintains circuit integrity for 30 minutes at the standard fire-curve temperature (≈ 830 °C); PH120 for 120 minutes. PH120 cables are typically also tested to BS 8434-2 (water-spray) and marketed as "enhanced" — the cable survives fire AND fire-fighting water exposure. Use PH30 for self-contained luminaires in low-risk areas; use PH120 + W for central-battery feeds and high-risk applications.',
              },
              {
                question: 'Can I use ordinary PVC/PVC twin-and-earth for emergency lighting if it is in conduit?',
                answer:
                  'No. The conduit (if metal) provides some mechanical protection but does not give the cable fire-resistance. The cable inside still loses integrity at PVC failure temperatures (≈ 200-300 °C), well within the temperature range of a typical fire. BS 5266-1 and BS 7671 §560 require the wiring itself to be fire-resistant or in a fire-resistant route — meaning a certified fire-rated enclosure tested as a system, not just metal conduit. In practice, fire-resistant cable (FP200 Gold and equivalents) is cheaper and simpler than building a fire-rated route from scratch.',
              },
              {
                question: 'Why are plastic cable ties not acceptable on fire-resistant cable?',
                answer:
                  'Plastic ties soften at 100-200 °C and fail mechanically at much lower temperatures than the cable rating. The cable falls from its supports, mechanical load on cores and terminations rises, and circuit integrity is lost long before the cable would have failed thermally. Fire-resistance is a system property — cable + fixings + supports + containment must all match the category. BS 8519 §6 requires metallic fixings throughout fire-rated routes.',
              },
              {
                question: 'What is BS 8434-2 and when is it required?',
                answer:
                  'BS 8434-2 is the water-spray test for fire-resistant cables — exposing the cable to water spray (simulating sprinkler discharge or fire-fighting hose) during the standard fire-resistance test. Cables that pass BS 8434-2 in addition to BS EN 50200 are termed "enhanced" or "+W". Required for life-critical circuits, central-battery feeds, BS 8519 Category 3 applications, and any installation where the cable is expected to survive into the fire-fighting phase of an incident.',
              },
              {
                question: 'How does BS 5266-1:2025 change cable routing in high-risk areas?',
                answer:
                  'The 2025 edition introduces a high-risk-area requirement of at least two separate emergency lighting circuits, with no single fault disabling more than 20 luminaires. This requires architectural redundancy — two physically independent cable routes — not just two electrically separate circuits. Sharing a single cable tray, a single conduit run, or a single junction box defeats the segregation because a single fire/mechanical event takes both circuits out. Designers must route the redundant circuits independently.',
              },
              {
                question: 'What is the minimum specification for a labelled emergency lighting isolator?',
                answer:
                  'Lockable in the OFF position (BS 7671 + Electricity at Work Regulations); permanent engraved label (Traffolyte or equivalent, screw-fixed); text "EMERGENCY LIGHTING — DO NOT SWITCH OFF" or similar unambiguous wording; located at the supply origin AND any accessible isolation points; visible from the operator\'s normal position. Reg 560.11 plus BS 5266-1 plus duty-holder common sense — the cheapest detail in the installation and the most commonly missed.',
              },
              {
                question: 'How is fire-stopping specified at compartment penetrations?',
                answer:
                  'Match the seal to the wall/floor rating (30/60/120 minutes); match the system to the cable type and containment (intumescent compound, fire pillows, fire-rated mortar, fire collars); install per the manufacturer certified system; document on as-built drawings with photo evidence and certificate reference. Building Regulations Approved Document B requires it; BS 8519 specifies it; the fire risk assessment audits it.',
              },
              {
                question: 'Where does MICC cable belong in the cable selection hierarchy?',
                answer:
                  'MICC is the gold standard — highest fire performance (well above PH120 in many tests), inorganic non-combustible insulation, mechanically robust, intrinsically EMC-shielded, decades of in-service track record. Use it where the application justifies the cost: deep basements, high-rise stair cores, hospital plant areas, petrochemical, marine, and any installation where fire performance must exceed BS 8519 Category 3. Trade-offs are higher capital cost, specialist termination skill, larger bend radius, and slower install. For the majority of buildings FP200 Gold or FP PLUS is sufficient and easier.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Cable types and installation requirements — Module 4.1" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/emergency-lighting-module-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 4
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/emergency-lighting-module-4-section-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                4.2 Self-contained vs central battery
              </div>
            </button>
          </div>

          <div className="hidden">
            <Activity />
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default EmergencyLightingModule4Section1;
