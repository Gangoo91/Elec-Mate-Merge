import { ArrowLeft, ChevronLeft, ChevronRight, Wrench } from 'lucide-react';
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
    id: 'fam4-s4-supports',
    question:
      'BS 5839-1:2025 / BS 8519 require fire alarm cable supports to be at intervals appropriate to the cable type and orientation. What is a typical maximum interval for a vertical run of FP200-type cable?',
    options: [
      'Every 5 metres.',
      'Approximately every 1 metre on vertical runs (and at closer intervals where the cable changes direction or passes through fire-resisting construction). The interval is controlled by two requirements: in normal use, supports must hold the cable in place against gravity, vibration and disturbance; in fire conditions, supports must hold the cable in place after the polymeric components have softened and the cable has lost mechanical integrity. Plastic clips melt early; the cable must be on FIRE-RATED supports at intervals close enough that, when one fixing fails, adjacent fixings hold the cable in path until the survival duration ends.',
      'Every 0.1 metres.',
      'No specific interval — installer discretion.',
    ],
    correctIndex: 1,
    explanation:
      "Support interval is one of the engineering parameters that determines whether a PH30 or PH120 cable system delivers its specified fire-survival duration. Supports too far apart mean a single fixing failure can drop the cable; supports at appropriate intervals provide redundancy. BS 8519 and the cable manufacturer's technical data give specific values for each cable type.",
  },
  {
    id: 'fam4-s4-plastic',
    question:
      'A contractor proposes to use ordinary plastic cable clips for the fire alarm wiring because "the cable itself is fire-resistant". Why is this wrong?',
    options: [
      'Plastic clips are too small.',
      "Because the cable is one part of a SYSTEM. The system's fire-survival duration is determined by the WEAKEST element. A PH30 cable on plastic clips that melt at, say, 10 minutes of fire is a 10-minute cable system, not a 30-minute one — once the clips fail, the cable falls, the route is broken, the circuit is gone. BS 5839-1:2025 / BS 8519 require fire-rated supports — metal clips, cleats or saddles rated to match the cable's PH category. Plastic clips are not acceptable for fire-rated systems.",
      'Plastic clips cause noise.',
      'Plastic clips are illegal.',
    ],
    correctIndex: 1,
    explanation:
      'The cable + supports + fixings + containment is the fire-resistant cable SYSTEM. All parts have to match the PH category. Plastic clips on a fire-resistant cable are a textbook system-mismatch failure — the cable does what it should, the supports do not, and the system delivers a fraction of its specified duration.',
  },
  {
    id: 'fam4-s4-segregation',
    question:
      'BS 5839-1:2025 clause 26 cross-references BS 7671 528 for SEGREGATION of fire alarm cables from non-fire-alarm wiring. What is the principle and what does it require in practice?',
    options: [
      'No segregation — all cables can share trunking.',
      'Fire alarm cables are SEGREGATED from non-fire-alarm wiring so that a fault on the non-fire-alarm wiring cannot compromise the fire alarm circuit. In practice this means: separate trunking compartments where shared trunking is used; separate cable trays with adequate spacing; OR fire alarm cables run on their own route with sufficient distance from general LV cabling. BS 7671 528.1 is the wiring-regulations envelope; BS 5839-1 clause 26 is the fire-alarm-specific tightening. Where shared containment is unavoidable, fire-rated barriers separate the categories within the containment.',
      'Segregation is by colour only.',
      'Only on detection circuits.',
    ],
    correctIndex: 1,
    explanation:
      'Segregation is one of the structural protections of fire alarm wiring — it prevents an unrelated fault elsewhere in the building from corrupting fire alarm signals or damaging fire alarm cabling. The combination of BS 7671 528 and BS 5839-1 26 covers both the wiring-regulations and fire-alarm-specific requirements.',
  },
  {
    id: 'fam4-s4-class-a',
    question:
      'On Class A vs Class B fire alarm circuits, which statement correctly captures the BS EN 54-13 / BS 5839-1 distinction in practical operation?',
    options: [
      'They are identical.',
      'Class A is a fully-monitored loop topology where a single open or short fault on the wiring does NOT prevent the rest of the loop from operating. The CIE communicates with each device from BOTH directions around the loop, so a fault simply reduces the loop to two unidirectional spurs both still operating. Class B is a radial / spur topology where a single open fault DOES isolate everything beyond the fault from the CIE — those devices stop reporting and stop being supervised. Class A is the higher-resilience choice; most addressable systems are designed Class A by default.',
      'Class A allows fewer devices.',
      'Class B is more expensive.',
    ],
    correctIndex: 1,
    explanation:
      'The Class A vs B distinction matters at design time and at fault-finding time. A Class A circuit gives the system fault tolerance — a single wiring fault is reported but does not lose protection. A Class B circuit reports the fault but loses the protection of devices beyond it. Most BS 5839-1 designs use Class A for the loop / sounder circuits; understanding which circuit type you are working on guides fault-finding.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A fire alarm cable system delivers its specified PH category only if all the following are matched to that category EXCEPT...?',
    options: [
      'The cable.',
      "Cable colour. Colour is governed by BS 5839-1:2025 clause 16 (single common colour, red preferred) for IDENTIFICATION purposes — so that fire alarm cables are recognisable. The PH category is a property of the cable's construction, supports, fixings, containment and terminations — not of its outer colour. Colour discipline is important for identification; PH category is delivered by all the structural elements of the system except colour.",
      'Cable supports.',
      'Cable fixings.',
    ],
    correctAnswer: 1,
    explanation:
      "The cable system's fire-survival is a function of the structural elements: cable, supports, fixings, containment, terminations. Colour is for identification, not for fire performance. A red-coloured cable on plastic clips is not a PH-classified system; a beige-coloured cable on fire-rated cleats with all other elements matched would be.",
  },
  {
    id: 2,
    question:
      'Why does BS 5839-1:2025 / BS 8519 require fire-RATED clips, cleats and saddles for fire alarm cable supports?',
    options: [
      'Aesthetics.',
      "Because the cable's fire survival is only delivered if the cable stays in path during the fire. Polymeric supports (plastic clips, ordinary plastic ties) lose mechanical strength early in a fire — typically well before the cable's PH duration. Once supports fail, the cable falls, and the cable's fire-survival capability is wasted because the path no longer exists. Fire-rated supports — metal clips, metal cleats, metal saddles, clips with steel inserts — survive long enough that adjacent supports continue to hold the cable through the cable's full PH duration.",
      'Earthing.',
      'Cost.',
    ],
    correctAnswer: 1,
    explanation:
      "Support failure is the dominant non-cable failure mode of fire-resistant cable systems. The fire kills the supports before it kills the cable; without fire-rated supports the cable's capability is unrealised. Specify and install fire-rated supports as a matched set with the cable.",
  },
  {
    id: 3,
    question:
      'BS 5839-1:2025 clause 26 (Cabling) and BS 7671 528.1 (Segregation) together govern the relationship between fire alarm cables and other wiring. What is the principle?',
    options: [
      'No relationship — they are unrelated.',
      'Fire alarm cables are SEGREGATED from non-fire-alarm wiring such that a fault on the non-fire-alarm wiring cannot compromise the fire alarm circuit. Methods: separate routes with adequate distance; separate trunking or trunking compartments; separate cable trays; OR fire-rated barriers within shared containment. BS 7671 528.1 is the general wiring-regulations rule for circuits with different protective measures or different operating voltages; BS 5839-1 clause 26 is the fire-alarm-specific extension that recognises fire alarm circuits as life-safety circuits requiring particular protection.',
      'Fire alarm cables can share with anything.',
      'Only sounder circuits need segregation.',
    ],
    correctAnswer: 1,
    explanation:
      'Segregation prevents the most plausible failure mode where unrelated work or unrelated faults produce damage to fire alarm wiring. Both BS 7671 and BS 5839-1 contribute to the rule; the practical implementation is segregation by route, by containment compartment, or by barrier.',
  },
  {
    id: 4,
    question:
      'Class A and Class B are circuit topologies for addressable fire alarm loops. Which statement is correct?',
    options: [
      'Class A and Class B are the same.',
      'Class A is a closed-loop topology with bidirectional CIE communication — a single wiring fault (open or short) is REPORTED but does not lose protection beyond the fault. Class B is a radial / spur topology with unidirectional communication — a single wiring fault is reported and ALSO LOSES the devices beyond it (they no longer report and are no longer supervised). Class A is more resilient; Class B is simpler. BS 5839-1:2025 and BS EN 54-13 cover the design of each.',
      'Class B is preferred.',
      'Class A only allows 32 devices.',
    ],
    correctAnswer: 1,
    explanation:
      'The fault tolerance distinction is the engineering reason for Class A. Most BS 5839-1 systems use Class A for the loop topology so that a single wiring fault does not compromise protection.',
  },
  {
    id: 5,
    question: 'BS 5839-1:2025 / BS 8519 advise that joint boxes in fire alarm wiring should be...?',
    options: [
      'Used wherever convenient.',
      'AVOIDED where reasonably practicable. Where unavoidable, joint boxes are: fire-rated to match the cable category (metal construction, fire-resistant gaskets / glands); ACCESSIBLE for inspection and maintenance (not buried in walls, floors or sealed voids); IDENTIFIED with the fire-alarm marking; LOGGED in the as-installed records so future works are aware of their location. Joints are a reliability risk and a fire-survival risk; the engineering preference is to terminate at devices, not to introduce intermediate joints.',
      'Plastic boxes are acceptable.',
      'Joints are forbidden.',
    ],
    correctAnswer: 1,
    explanation:
      'Joints are reliability weak points and fire-survival weak points. The engineering hierarchy: avoid joints; if unavoidable, fire-rate them; document them. BS 8519 gives the practical guidance.',
  },
  {
    id: 6,
    question:
      'Why must cable supports for fire-rated systems be at CLOSER intervals than would be required for general-purpose cabling?',
    options: [
      'To make the cable look neat.',
      "Because in fire conditions, individual fixings will fail at different times. Closer intervals give the system redundancy — when one fixing fails, the adjacent fixings still hold the cable in path. Spacing wide enough that a single failure produces a sag of unsupported cable means the cable's fire-survival capability is wasted because the cable has fallen out of its protected route. The interval is sized to ensure the cable remains supported throughout its PH duration even with progressive fixing failure.",
      'Aesthetics.',
      'Cost.',
    ],
    correctAnswer: 1,
    explanation:
      'Fixing redundancy is the engineering mechanism. The closer interval is not because individual supports are weaker; it is because the system needs to tolerate progressive fixing failure during fire without losing the cable path.',
  },
  {
    id: 7,
    question:
      'Fire alarm cables passing through fire-resisting construction (compartment walls, floor slabs, ceilings rated for fire-resistance) require what treatment at the penetration?',
    options: [
      'No special treatment.',
      "The penetration must be FIRE-STOPPED to reinstate the fire-resisting integrity of the construction it passes through. The fire-stop sealing is rated to match the construction's fire-resistance rating (e.g. 60-minute wall = 60-minute fire-stop seal). The fire-stop must accommodate the cable type — some sealants require specific cable categories — and must be installed per the manufacturer's tested-system instructions. Without fire-stopping, the penetration becomes a path for fire and smoke to spread between compartments, defeating the building's passive fire protection.",
      'Cable is just pulled through.',
      'Tape is wrapped around it.',
    ],
    correctAnswer: 1,
    explanation:
      'Fire-stopping at penetrations is a separate engineering discipline from cable selection but lives in the same fire-engineering envelope. A fire alarm cable passing through compartmentation without fire-stopping turns the cable route into a fire / smoke path, regardless of how good the cable itself is.',
  },
  {
    id: 8,
    question:
      'Plastic clips are NOT acceptable for supporting fire alarm cables in fire-rated installations. The correct fixings are typically...?',
    options: [
      'Tape.',
      "Metal clips, metal cleats, metal P-clips, or steel-insert clips designed for fire-resistant cable systems and rated to match the cable's PH category. The fixings retain mechanical strength at the temperatures the cable is designed to survive, with the result that the system as a whole — cable plus fixings — delivers the specified fire-survival duration. Where containment (trunking, basket, tray) carries the cable, the containment itself must be fire-rated and supported on fire-rated brackets / hangers.",
      'Plastic ties.',
      'Adhesive.',
    ],
    correctAnswer: 1,
    explanation:
      "Metal fixings, fire-rated containment, fire-rated brackets — all matched to the cable's PH category. The cable manufacturer and BS 8519 specify the matched-fixing requirements for each cable type.",
  },
  {
    id: 9,
    question:
      'The detection / sounder cabling enters a void (above a suspended ceiling, under a raised floor). What does BS 5839-1:2025 require for the wiring in the void?',
    options: [
      'Wiring is not allowed in voids.',
      'Wiring methods continue into the void with appropriate containment, supports, and fixings — same fire-rating as the rest of the cable system. The void wiring follows the same engineering rules as the visible wiring; the void is not an excuse for relaxed practice. Where detectors are mounted in the void (where required by the design — e.g. void detection per BS 5839-1 21.2.7), the void is part of the protected area and the void wiring is part of the fire-rated system. ACCESS PROVISIONS for inspection / maintenance of void devices and wiring must be designed in.',
      'Wiring in voids needs no support.',
      'Plastic supports are acceptable in voids.',
    ],
    correctAnswer: 1,
    explanation:
      "The void is a continuation of the installation, not an exception. The 2025 standard's clarification of detector placement in voids reinforces this — detector access provisions must be designed in, and the wiring to and from void detectors uses the same engineering practice as visible wiring.",
  },
  {
    id: 10,
    question:
      'Why is the engineering hierarchy for joints (avoid → fire-rate → document) the right way around for fire alarm cabling, rather than treating joints as a routine option?',
    options: [
      'Tradition.',
      "Because every joint is a reliability risk (mechanical, corrosion, vibration over service life), a fire-survival risk (each joint is a discrete point that has to maintain integrity through fire), and a maintenance burden (joint must be accessible, identified, recorded). Designing the route to terminate at devices rather than to introduce intermediate joints removes all three risks. Where a joint is genuinely unavoidable, fire-rating it preserves the system's PH category and documenting it ensures the future maintainer knows it is there. The hierarchy reflects that joints are a tolerated necessity, not a preferred design choice.",
      'Cost.',
      'Aesthetics.',
    ],
    correctAnswer: 1,
    explanation:
      'Joint avoidance is the engineering principle. Terminating at devices and routing to avoid joints produces a more reliable, more fire-survivable, more maintainable installation. Joints exist where they have to; they are not introduced for installer convenience.',
  },
];

const FireAlarmModule4Section4 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Wiring methods and protection | Fire Alarm Module 4.4 | Elec-Mate',
    description:
      'BS 5839-1:2025 / BS 8519 wiring methods — fire-rated supports at appropriate intervals, metal containment, plastic clips not acceptable, segregation per BS 7671 528 and BS 5839-1 26, Class A / B circuit topologies, joint-box engineering, void wiring.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 4
          </button>

          <PageHero
            eyebrow="Module 4 · Section 4"
            title="Wiring methods and protection"
            description="BS 5839-1:2025 / BS 8519 — fire-rated supports at appropriate intervals, metal containment, the prohibition on plastic clips for fire-rated systems, segregation per BS 7671 528 and BS 5839-1 clause 26, Class A vs Class B circuit topologies, the engineering hierarchy for joints, and the rules for void wiring."
            tone="yellow"
          />

          <TLDR
            points={[
              'Cable + supports + fixings + containment + terminations is the fire-resistant cable SYSTEM. All elements must match the PH category.',
              'Cable supports at appropriate intervals — typically 1 metre on vertical runs for FP200-type cables; closer where direction changes or fire-resisting construction is crossed.',
              "Plastic clips are NOT acceptable for fire-rated systems. Fire-rated metal clips, cleats or saddles required, matched to the cable's PH category.",
              'Metal containment (trunking, basket, tray) is fire-rated and supported on fire-rated brackets where it carries fire alarm cables.',
              'Segregation per BS 7671 528.1 and BS 5839-1 clause 26 — fire alarm cables separated from non-fire-alarm wiring by route, by trunking compartment, by tray, or by fire-rated barrier within shared containment.',
              'Joint boxes AVOIDED where reasonably practicable; if unavoidable, fire-rated, accessible, identified, logged.',
              'Class A loop topology = single fault REPORTED but no protection lost. Class B radial = single fault loses devices beyond the fault. Most BS 5839-1 designs use Class A.',
              'Cable in voids follows the same engineering rules as visible cable — fire-rated supports and containment, with detector-access provisions designed in.',
              'Penetrations through fire-resisting construction must be FIRE-STOPPED to reinstate the fire-resistance of the construction.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Apply BS 5839-1:2025 / BS 8519 cable-system thinking — match cable, supports, fixings, containment and terminations to the specified PH category',
              'Specify fire-rated metal clips, cleats and saddles at appropriate intervals; reject plastic clips on fire-rated systems',
              'Apply segregation per BS 7671 528 and BS 5839-1 clause 26 — by separate route, separate compartment, separate tray, or fire-rated barrier within shared containment',
              'Distinguish Class A loop from Class B radial topologies and select the correct circuit type for the application',
              'Apply the engineering hierarchy for joints — avoid where practicable; if unavoidable, fire-rate and document; treat joints as a tolerated necessity, not a routine choice',
              'Continue wiring methods into voids with fire-rated supports and containment; design detector-access provisions where void detection is provided',
              'Apply fire-stopping at penetrations through fire-resisting construction to reinstate compartmentation integrity',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Cable supports — interval, type, fire-rating</ContentEyebrow>

          <ConceptBlock
            title="Why support interval matters in fire conditions"
            plainEnglish="A fire-resistant cable installed loosely between supports 5 metres apart has a problem the moment fire begins. Even a fully PH120-classified cable will sag under its own weight as polymeric components soften; the sag concentrates stress at remaining supports; the supports fail in sequence; the cable falls out of path. The cable was rated for 120 minutes, but the system as installed delivered perhaps 20 minutes. Support intervals of approximately 1 metre on vertical runs (closer where direction changes) prevent this — when one fixing fails, adjacent fixings still hold the cable in path until they too fail, and by that time the cable\'s fire-survival duration is reached. Support spacing is a redundancy parameter."
            onSite="When you install fire alarm cable, walk back along the route once the cable is run and inspect the support spacing. Verify the cable is held to the substrate without sag at intervals you would tolerate yourself in normal use. Then reduce the spacing further wherever a critical pass-through occurs (compartment walls, floor slabs, doorways) and at every direction change. The spacing on the drawing is the design intent; the spacing on the wall is what determines the system\'s fire survival."
          >
            <p>What "appropriate interval" means in BS 8519 / cable-manufacturer terms:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Vertical runs.</strong> Approximately 1 metre on vertical (and any near-
                vertical) runs of standard FP200-type cable. The 1 metre figure varies by cable type
                — heavier or larger cables may require closer spacing; lighter cables in low-stress
                environments may permit slightly wider. Always check the cable manufacturer&apos;s
                technical data and the BS 8519 application tables.
              </li>
              <li>
                <strong>Horizontal runs.</strong> Closer intervals than vertical runs in many cases
                — typically 600 mm — because horizontal cables sag more under their own weight as
                supports soften. Manufacturer guidance is the controlling reference.
              </li>
              <li>
                <strong>Direction changes.</strong> A support within 150-300 mm of every bend or
                direction change. The bend itself is a high-stress point in fire (cable wants to
                straighten as it softens), and the support nearest the bend takes the sustained
                load.
              </li>
              <li>
                <strong>Penetrations.</strong> Supports either side of any penetration through
                fire-resisting construction, close to the penetration itself. The fire-stop seal at
                the penetration is part of the support arrangement; the cable is supported as it
                enters and as it exits the construction.
              </li>
              <li>
                <strong>Containment.</strong> Where cable runs in fire-rated containment (basket,
                tray, trunking), the cable does not need supports along the containment run as the
                containment provides the support function. The containment itself is supported on
                fire-rated brackets at the appropriate intervals for the containment.
              </li>
            </ul>
            <p>
              Support interval is not "installer discretion" — it is an engineering parameter. BS
              8519, the cable manufacturer&apos;s technical data, and the design records together
              specify what is required. If the design records do not specify, the BS 8519 / cable
              manufacturer combination provides the default; install to that and document the
              decision.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 8519:2020 (Selection and installation of fire-resistant cable systems) / cable-manufacturer technical data"
            clause={
              <>
                Fire-resistant cables shall be supported at intervals such that, in fire conditions,
                the cable is retained in its installed position for the duration corresponding to
                its PH classification. Supports shall be of fire-resistant materials (typically
                metallic) capable of retaining their mechanical function throughout the cable&apos;s
                rated fire-survival period. Plastic cable clips, ties or fixings shall not be used
                as the sole means of support for fire-resistant cable systems. Support intervals
                shall be in accordance with the cable manufacturer&apos;s technical data and the
                application requirements of BS 8519.
              </>
            }
            meaning="Plastic supports are disqualified; the support interval is engineered to the cable type and the application; the manufacturer's technical data is the definitive reference. The 'sole means of support' wording is important — plastic ties used decoratively over a properly supported cable are not the issue; plastic ties as the only support are."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          {/* Diagram — cable routing schematic */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Fire alarm cable routing — supports, containment, segregation
            </h4>
            <svg
              viewBox="0 0 880 460"
              className="w-full h-auto"
              role="img"
              aria-label="Schematic of a fire alarm cable run from CIE through containment, with metal clips at 1 metre intervals on a vertical riser, change of direction supported at the bend, fire-stop at compartment penetration, segregated from general LV cabling by adjacent compartment of trunking, and continuation into a ceiling void with detector access provision."
            >
              {/* CIE */}
              <rect
                x="30"
                y="200"
                width="100"
                height="80"
                rx="8"
                fill="rgba(34,211,238,0.12)"
                stroke="#22D3EE"
                strokeWidth="2"
              />
              <text
                x="80"
                y="226"
                textAnchor="middle"
                fill="#22D3EE"
                fontSize="12"
                fontWeight="bold"
              >
                CIE
              </text>
              <text x="80" y="244" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                control panel
              </text>

              {/* Vertical riser with clips */}
              <line x1="180" y1="240" x2="180" y2="100" stroke="#EF4444" strokeWidth="3.5" />
              {/* clips at ~1m intervals */}
              <g fill="rgba(255,255,255,0.85)" stroke="#94A3B8" strokeWidth="1.2">
                <rect x="172" y="226" width="16" height="6" rx="2" />
                <rect x="172" y="186" width="16" height="6" rx="2" />
                <rect x="172" y="146" width="16" height="6" rx="2" />
                <rect x="172" y="106" width="16" height="6" rx="2" />
              </g>
              <text x="220" y="170" fill="#94A3B8" fontSize="9.5" fontWeight="bold">
                Metal clips
              </text>
              <text x="220" y="184" fill="rgba(255,255,255,0.55)" fontSize="9">
                ~1 m intervals on vertical run
              </text>
              <text x="220" y="198" fill="rgba(255,255,255,0.55)" fontSize="9">
                PH-rated to match cable category
              </text>

              {/* Bend support */}
              <path
                d="M 180 100 Q 180 80 200 80 L 380 80"
                fill="none"
                stroke="#EF4444"
                strokeWidth="3.5"
              />
              <rect
                x="186"
                y="76"
                width="16"
                height="6"
                rx="2"
                fill="rgba(255,255,255,0.85)"
                stroke="#94A3B8"
                strokeWidth="1.2"
              />
              <text
                x="200"
                y="62"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="9"
                fontWeight="bold"
              >
                support at bend
              </text>

              {/* Compartment wall + fire-stop */}
              <rect
                x="380"
                y="40"
                width="14"
                height="240"
                fill="rgba(217,119,6,0.20)"
                stroke="#D97706"
                strokeWidth="1.6"
              />
              <text
                x="387"
                y="35"
                textAnchor="middle"
                fill="#D97706"
                fontSize="9"
                fontWeight="bold"
              >
                FR wall
              </text>
              <circle
                cx="387"
                cy="80"
                r="10"
                fill="rgba(217,119,6,0.5)"
                stroke="#D97706"
                strokeWidth="2"
              />
              <text x="425" y="84" fill="#D97706" fontSize="10" fontWeight="bold">
                FIRE-STOP
              </text>
              <text x="425" y="97" fill="rgba(255,255,255,0.55)" fontSize="9">
                penetration sealed to wall rating
              </text>

              {/* After wall */}
              <path d="M 394 80 L 600 80" stroke="#EF4444" strokeWidth="3.5" fill="none" />
              <rect
                x="450"
                y="76"
                width="16"
                height="6"
                rx="2"
                fill="rgba(255,255,255,0.85)"
                stroke="#94A3B8"
                strokeWidth="1.2"
              />
              <rect
                x="510"
                y="76"
                width="16"
                height="6"
                rx="2"
                fill="rgba(255,255,255,0.85)"
                stroke="#94A3B8"
                strokeWidth="1.2"
              />
              <rect
                x="570"
                y="76"
                width="16"
                height="6"
                rx="2"
                fill="rgba(255,255,255,0.85)"
                stroke="#94A3B8"
                strokeWidth="1.2"
              />

              {/* Detector in void */}
              <rect
                x="600"
                y="40"
                width="160"
                height="80"
                rx="8"
                fill="rgba(168,85,247,0.06)"
                stroke="rgba(168,85,247,0.5)"
                strokeWidth="1.4"
                strokeDasharray="4,3"
              />
              <text
                x="680"
                y="58"
                textAnchor="middle"
                fill="#A855F7"
                fontSize="10"
                fontWeight="bold"
              >
                CEILING VOID
              </text>
              <circle
                cx="680"
                cy="92"
                r="14"
                fill="rgba(34,211,238,0.20)"
                stroke="#22D3EE"
                strokeWidth="1.8"
              />
              <text
                x="680"
                y="96"
                textAnchor="middle"
                fill="#22D3EE"
                fontSize="9"
                fontWeight="bold"
              >
                det.
              </text>
              <text x="680" y="115" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="8">
                access provision
              </text>

              {/* Connect cable to detector */}
              <line x1="600" y1="80" x2="666" y2="92" stroke="#EF4444" strokeWidth="3" />

              {/* Segregated trunking — section view at bottom */}
              <rect
                x="240"
                y="320"
                width="520"
                height="80"
                rx="6"
                fill="rgba(148,163,184,0.06)"
                stroke="#94A3B8"
                strokeWidth="1.6"
              />
              <line
                x1="500"
                y1="320"
                x2="500"
                y2="400"
                stroke="#94A3B8"
                strokeWidth="2"
                strokeDasharray="3,3"
              />
              <text
                x="370"
                y="338"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="10"
                fontWeight="bold"
              >
                FIRE ALARM compartment
              </text>
              <line x1="280" y1="360" x2="460" y2="360" stroke="#EF4444" strokeWidth="3" />
              <line x1="280" y1="380" x2="460" y2="380" stroke="#EF4444" strokeWidth="3" />
              <text x="370" y="395" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="8">
                red FR cables only
              </text>

              <text
                x="630"
                y="338"
                textAnchor="middle"
                fill="#94A3B8"
                fontSize="10"
                fontWeight="bold"
              >
                GENERAL LV compartment
              </text>
              <line x1="540" y1="360" x2="720" y2="360" stroke="#94A3B8" strokeWidth="3" />
              <line x1="540" y1="380" x2="720" y2="380" stroke="#94A3B8" strokeWidth="3" />
              <text x="630" y="395" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="8">
                general installation cabling
              </text>

              <text
                x="500"
                y="425"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                SEGREGATION — BS 7671 528 + BS 5839-1 clause 26
              </text>
              <text x="500" y="442" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                separate compartments OR fire-rated barrier OR separate routes
              </text>
            </svg>
          </div>

          <SectionRule />

          <ContentEyebrow>Containment — metal trunking, basket, tray</ContentEyebrow>

          <ConceptBlock
            title="When containment is the support"
            plainEnglish="Where fire alarm cabling is run inside containment — metal trunking, cable basket, cable tray — the containment becomes the support. The cable does not need clips along the containment run; the containment carries the cable. But the containment itself must be fire-rated and supported on fire-rated brackets. The system-thinking principle is unchanged: the weakest element controls the survival duration."
          >
            <p>The containment requirements:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Metal containment.</strong> Steel trunking, galvanised steel basket, steel
                cable tray. Metal containment retains its mechanical strength at the temperatures
                the cable is designed to survive. Plastic trunking is not acceptable for fire-rated
                cable systems — it softens and collapses early in fire, dropping the cable.
              </li>
              <li>
                <strong>Fire-rated brackets.</strong> The brackets that support the containment must
                themselves be fire-rated to match the cable category. A steel basket on
                plastic-fixing brackets is the same failure mode as a cable on plastic clips — the
                brackets fail, the basket falls, the cable goes with it.
              </li>
              <li>
                <strong>Bracket spacing.</strong> Per the containment manufacturer&apos;s technical
                data and BS 8519, sized to retain the containment in path during the cable&apos;s PH
                duration even with progressive bracket failure.
              </li>
              <li>
                <strong>Fixings into the substrate.</strong> Where brackets fix into a wall or
                ceiling slab, the fixings (anchors, bolts) are themselves fire-rated. Generic
                plastic-plug-and-screw fixings are not adequate; specific fire-rated anchors (rated
                by BS EN test methods) are specified.
              </li>
              <li>
                <strong>Cable category preservation.</strong> Where multiple categories of fire
                alarm cable share the same containment, the segregation within the containment is
                designed in. Some installations use separate compartments; some use fire-rated
                barriers; the design records specify which.
              </li>
              <li>
                <strong>Cable retention within containment.</strong> Where the containment is
                horizontal or has potential for cable displacement (e.g. open basket on long runs),
                retainers / hold-downs may be used to keep the cable in position during fire. The
                retention itself must be fire-rated.
              </li>
            </ul>
            <p>
              Specifying fire-rated containment with fire-rated brackets is more expensive than
              general-purpose containment with plastic fixings — but the cost is part of the cable
              system&apos;s overall PH-category delivery. Installing PH120 cable in non-fire-rated
              containment is a system mismatch; the containment caps the survival well below the
              cable&apos;s capability.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Segregation — BS 7671 528 + BS 5839-1 clause 26</ContentEyebrow>

          <ConceptBlock
            title="Why segregation is non-negotiable for fire alarm wiring"
            plainEnglish="Segregation prevents an unrelated event — a fault on a non-fire-alarm circuit, mechanical damage during work on adjacent cables, an EMI source coupled into shared containment — from reaching the fire alarm wiring. The architectural principle: the fire alarm has its own electrical environment, separated from the general installation. Practically: routes, trunking compartments, cable trays, or fire-rated barriers within shared containment all serve as segregation methods."
          >
            <p>Methods of segregation, in order of preference:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Separate route.</strong> The fire alarm cable runs on its own route,
                physically separated from general LV cabling. The cleanest form of segregation; no
                shared containment, no shared brackets, no shared penetrations. Adopted where the
                building layout allows.
              </li>
              <li>
                <strong>Separate trunking compartments.</strong> A multi-compartment trunking with a
                permanent partition between fire alarm and non-fire-alarm cabling. The partition is
                part of the trunking construction, not added afterwards. Common in commercial
                fit-outs where running separate trunking is impractical.
              </li>
              <li>
                <strong>Separate cable trays.</strong> Adjacent trays or stacked trays with a
                vertical separation maintained. The trays are separate; the brackets may be shared.
                Spacing between trays sufficient to prevent thermal / mechanical interaction in
                fire.
              </li>
              <li>
                <strong>Fire-rated barrier within shared containment.</strong> Where shared
                containment is unavoidable, a fire-rated barrier (cable barrier strip, mineral wool
                divider) creates a separated zone within the containment. The barrier must be rated
                to match the cable category and installed to the manufacturer&apos;s tested-system
                specification.
              </li>
              <li>
                <strong>Distance separation.</strong> Where separation is by distance only (no
                physical barrier), the distance is sufficient to prevent thermal / mechanical /
                electromagnetic interaction. BS 7671 528 specifies minimum distances for various
                circuit categories; BS 5839-1 clause 26 reinforces the principle for fire alarm.
              </li>
            </ul>
            <p>
              Segregation is documented in the design records — the chosen method, the rationale,
              the specific dimensions and barriers. At inspection the segregation is verified
              against the design intent. Loss of segregation (e.g. a barrier removed during later
              works, a partition broken to add a cable) is a remediation action.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · 528.1 (Proximity to other electrical services) and BS 5839-1:2025 · Clause 26 (Cable segregation)"
            clause={
              <>
                Circuits of safety services shall be segregated from circuits of normal services.
                Segregation shall be by separation through use of separate cable enclosures, by use
                of fire-rated partitions within a common enclosure, or by spatial separation
                sufficient to ensure that a fault on a non-safety circuit does not adversely affect
                a safety circuit. Cables of fire detection and fire alarm systems shall be
                identifiable and shall be installed such that, as far as reasonably practicable, a
                fire affecting any part of the general electrical installation does not adversely
                affect the operation of the fire detection and fire alarm system.
              </>
            }
            meaning="The segregation requirement is double-coded — wiring regulations (528.1) and fire alarm standard (clause 26) both contribute. The combination covers both the electrical-fault propagation case and the fire-propagation case. Methods: separate enclosures, fire-rated partitions, or spatial separation."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Class A vs Class B circuit topologies</ContentEyebrow>

          <ConceptBlock
            title="Two architectures for the loop / radial circuit"
            plainEnglish="Fire alarm circuit topology is governed by BS EN 54-13 (compatibility and connectability of system components) and BS 5839-1. Two classes are recognised: Class A (loop with bidirectional CIE communication) and Class B (radial / spur with unidirectional communication). The class is a fault-tolerance property of the circuit: how does the circuit behave when a single wiring fault (open or short) occurs?"
          >
            <p>Class A — loop / bidirectional:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Topology.</strong> Cable forms a closed loop from the CIE, around all
                devices, and back to the CIE. The CIE has connections at both ends of the loop.
              </li>
              <li>
                <strong>Normal operation.</strong> CIE polls each device through the loop; the full
                loop is supervised; no devices are unmonitored.
              </li>
              <li>
                <strong>Single open fault.</strong> The loop becomes two unidirectional spurs. The
                CIE polls one spur from one end, the other spur from the other end. ALL devices
                remain operational and supervised. Fault is reported to the CIE; protection is not
                lost.
              </li>
              <li>
                <strong>Single short fault.</strong> Isolators on the loop (typically every 32
                devices or per the design) clamp the short by isolating the affected segment.
                Devices outside the isolated segment remain operational. Fault reported; protection
                preserved for most of the loop.
              </li>
              <li>
                <strong>Application.</strong> The default for most BS 5839-1 addressable systems.
                Higher fault tolerance, typically required by the system design and by fire-
                engineering analysis.
              </li>
            </ul>
            <p>Class B — radial / spur / unidirectional:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Topology.</strong> Cable runs from CIE outward to devices in a tree / radial
                arrangement. Each branch terminates at the last device; no return to CIE.
              </li>
              <li>
                <strong>Normal operation.</strong> CIE polls each device through the radial; the
                full radial is supervised.
              </li>
              <li>
                <strong>Single open fault.</strong> All devices BEYOND the fault are isolated from
                the CIE. They no longer report; they are no longer supervised. The CIE indicates a
                fault; protection is lost beyond the fault location until the cable is repaired.
              </li>
              <li>
                <strong>Single short fault.</strong> Similar consequence — devices beyond the short
                are lost. CIE indicates fault.
              </li>
              <li>
                <strong>Application.</strong> Acceptable for some sub-circuits where the design
                analysis permits. Typically NOT used for primary detection / sounder loops in BS
                5839-1 systems where fault tolerance is required.
              </li>
            </ul>
            <p>
              The class of each circuit is documented in the design records. At install time, the
              installer wires per the design; at fault-finding time, knowing the class tells the
              maintainer what to expect from a single-fault condition. A reported open fault on a
              Class A loop should NOT silence the loop; if it does, the topology may not actually be
              Class A as designed.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 54-13 (Compatibility and connectability of system components) and BS 5839-1:2025 (Fault tolerance)"
            clause={
              <>
                Fire detection and fire alarm circuits should be designed such that a single fault
                (open circuit or short circuit) on the wiring does not prevent the rest of the
                circuit from continuing to operate. This requirement is met by Class A loop topology
                with bidirectional CIE communication and segment isolators at appropriate intervals.
                Class B (radial / spur) topology may be used for sub-circuits where the design
                analysis permits and the consequence of single-fault loss is acceptable.
              </>
            }
            meaning="The fault tolerance requirement drives Class A as the typical topology for primary loops. Class B is acceptable in specific cases where the design analysis supports it. The class is a design decision, recorded in the design records, and verified at install and at fault-finding time."
          />

          <SectionRule />

          <ContentEyebrow>Joint boxes and the avoidance hierarchy</ContentEyebrow>

          <ConceptBlock
            title="The engineering hierarchy: avoid → fire-rate → document"
            plainEnglish="A joint in fire alarm wiring is a tolerated necessity, not a routine option. Joints introduce three risks: reliability (mechanical / corrosion / vibration over service life), fire-survival (each joint is a discrete point that has to maintain integrity through fire), and maintainability (joints must be accessible, identified, and recorded). The engineering hierarchy reflects these: AVOID joints by terminating at devices and routing to bypass intermediate connection points; if a joint is genuinely unavoidable, FIRE-RATE it to maintain the cable system\'s PH category; in all cases DOCUMENT the joint location and type so future maintainers know it exists."
          >
            <p>What this means in practical installation:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Avoid by route design.</strong> Plan the cable run to terminate at a device
                rather than at an intermediate junction box. A run from CIE → loop start → devices →
                loop end → CIE has no joints; a run from CIE → junction box → branch → devices has a
                joint. Designs aim for the former.
              </li>
              <li>
                <strong>Avoid by cable continuity.</strong> Use long-enough cable to span
                point-to-point without splice. Where the run length exceeds available cable length,
                plan deliveries to allow the longer continuous lengths rather than splicing at
                convenient stock lengths.
              </li>
              <li>
                <strong>Where unavoidable, fire-rate.</strong> Use a fire-rated junction box — metal
                construction, fire-resistant gland system, fire-resistant gasket / seal, rated to
                match the cable&apos;s PH category. Plastic junction boxes are not acceptable for
                fire-rated systems; ordinary metal boxes without fire-rated terminations may not be
                acceptable; the manufacturer&apos;s fire-rated junction box product line is the
                right choice.
              </li>
              <li>
                <strong>Accessible.</strong> The joint box is positioned so a maintainer can reach
                it for inspection or repair. Buried in walls, sealed within voids, or otherwise
                inaccessible joint boxes are problematic — when they fail, the failure cannot be
                diagnosed or repaired without destructive access.
              </li>
              <li>
                <strong>Identified.</strong> The joint box has an external identifier (label,
                marking) that distinguishes it as a fire-alarm joint. Future works in the area will
                then know the box is part of the fire alarm system.
              </li>
              <li>
                <strong>Logged.</strong> The joint location is recorded in the as-installed drawings
                and the system logbook. Future maintenance has a complete picture of the cable
                system, including where joints exist.
              </li>
            </ul>
            <p>
              Joints introduced as installation conveniences (rather than design necessities) are
              the worst case. They typically end up unrated, undocumented, and inaccessible, with no
              design rationale; they fail in service and the failure is hard to find. The hierarchy
              exists to prevent this: every joint, before being made, has to pass the "is this
              avoidable?" test.
            </p>
          </ConceptBlock>

          <Scenario
            title="The penetration through fire-resisting construction"
            situation="A fire alarm cable run reaches a 60-minute fire-resisting compartment wall and must pass through. The cable is FP200 Gold (PH30); the compartment wall is rated 60 minutes for fire resistance and integrity. The installer has been asked how to cross the wall."
            whatToDo="Apply the fire-stopping engineering. The penetration is an opening in a 60-minute construction; without sealing, the opening is a path for fire and smoke through the construction at any time. The fire-stop seal — a tested-system intumescent product, fire-rated mortar, or proprietary cable transit system — reinstates the construction's 60-minute integrity and accommodates the cable. The seal must be specified per the manufacturer's tested-system instructions for the cable type and the wall construction. Supports either side of the penetration retain the cable in position. Document the penetration in the as-installed records (location, seal product, installer, date)."
            whyItMatters="A penetration without fire-stopping turns the cable route into a fire / smoke path between compartments. The compartment wall's 60-minute integrity is defeated by the unsealed penetration; fire on one side reaches the other side rapidly through the gap; smoke spreads even faster. The cable is a small part of the fire-engineering picture at compartment walls, but without correct fire-stopping the fire alarm itself becomes part of the fire-spread mechanism. Fire-stopping is a separate trade in some installations; the fire alarm installer needs to coordinate with fire-stopping specialists or to be trained / certified for the fire-stopping work themselves."
          />

          <CommonMistake
            title="Plastic junction boxes on fire-rated cable runs"
            whatHappens="The installer terminates two FP200 Gold cables in a standard plastic IP56 enclosure on the basis that 'it's a connection in a junction box, the fire rating is on the cable not the box'. In a fire event, the plastic box fails at perhaps 15 minutes; the cables drop out of the failed box; the conductors are exposed to fire and short / open. The cable system\'s 30-minute capability is wasted because the joint failed early."
            doInstead="Use a fire-rated metal junction box specifically designed for fire-resistant cable systems. The box matches the cable\'s PH category. Glands, gaskets and termination methods are per the manufacturer\'s tested-system instructions. The joint becomes part of the fire-rated cable system, not a weak point in it."
          />

          <CommonMistake
            title="Ignoring segregation when adding fire alarm cabling to existing trunking"
            whatHappens="A retrofit fire alarm installation needs cable from the CIE to a remote part of the building. The installer finds existing horizontal trunking serving general LV cabling and pulls the new fire alarm cable through it 'because the trunking is already there'. The new fire alarm cabling is now in the same compartment as general LV — no segregation. A fault on the LV cabling, or mechanical damage during later LV work, exposes the fire alarm cable to risk."
            doInstead="Apply segregation per BS 7671 528 / BS 5839-1 26. Either install a fire-rated barrier within the existing trunking to create a dedicated compartment for the fire alarm cable, or install a separate trunking / containment route, or run the cable on its own route. Document the segregation method in the as-installed records. If segregation is not achievable in a particular building, the design records should justify the departure and identify the additional protection measures (e.g. enhanced cable for the affected sections)."
          />

          <CommonMistake
            title="Cable in a void without supports"
            whatHappens="The installer runs the cable across a ceiling void, simply lying on top of the suspended ceiling tiles without supports. Over service life the tiles vibrate, the cable shifts position, and at one point the cable abrades against a sharp metal duct edge. By year 3 a mechanical fault develops; the loop reports. In a fire event, the cable would have dropped onto the tiles below as soon as the polymeric components softened, well within the cable's PH window — system survival is well below the cable's rating."
            doInstead="Wiring methods continue into the void with the same engineering practice as visible wiring. Fire-rated supports / containment, appropriate spacing, no direct contact with sharp edges or moving parts. The void is a continuation of the installation, not an exception. Where the void cannot be visited regularly for maintenance, the installation has to be designed to need no maintenance — supports correct, clearance from hot / vibrating / moving services, identification labels at access points."
          />

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Cable + supports + fixings + containment + terminations = the fire-resistant cable SYSTEM. All elements match the PH category.',
              'Cable supports at appropriate intervals — typically 1 metre on vertical FP200-type runs; closer on horizontals, at bends, at penetrations.',
              'Plastic clips NOT acceptable on fire-rated systems. Metal fire-rated clips, cleats, saddles required.',
              'Containment fire-rated and supported on fire-rated brackets. Plastic trunking / brackets fail early in fire.',
              'Segregation per BS 7671 528 + BS 5839-1 clause 26 — separate route, separate compartment, separate tray, or fire-rated barrier within shared containment.',
              'Class A = bidirectional loop with fault tolerance (single fault reported, no protection lost). Class B = radial / spur (single fault loses devices beyond it). Most BS 5839-1 designs use Class A.',
              'Joints: AVOID where reasonably practicable. If unavoidable: FIRE-RATE, ACCESSIBLE, IDENTIFIED, LOGGED.',
              'Penetrations through fire-resisting construction must be FIRE-STOPPED with a tested-system product matched to the construction rating.',
              'Wiring in voids follows the same rules as visible wiring. Detector access provisions designed in where void detection is provided.',
              'Identification: red colour end-to-end, identifying labels at junctions, fire alarm circuit class recorded in design records and as-installed drawings.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'Can I support FP200 Gold cable on standard plastic P-clips if the run is concealed in a void where it will not be exposed to fire directly?',
                answer:
                  "No. The fire-resistance rating is a system-level property and the supports have to match the cable category regardless of route. A void run is still part of the fire alarm cable system; if a fire reaches the void (which is a credible event for many fire scenarios), the supports have to retain the cable in path. Plastic P-clips fail early; the cable falls onto whatever lies below; the system's PH rating is wasted. Use fire-rated metal clips, cleats or saddles regardless of route.",
              },
              {
                question:
                  'My fire alarm cabling shares a containment route with general LV cabling and the building owner does not want to install separate trunking. What are my options?',
                answer:
                  'Apply BS 7671 528 / BS 5839-1 26 segregation. Options in approximate order of preference: (1) install a fire-rated barrier within the existing trunking to create a dedicated compartment for the fire alarm cable; (2) re-route the fire alarm cable on its own path away from the shared containment; (3) provide spatial separation within shared containment with documented justification. Where none of these is achievable, the design has to consider whether enhanced cable or other compensating measures are needed; the design records justify the departure from standard segregation.',
              },
              {
                question: 'How do I identify a fire-rated junction box from a standard one?',
                answer:
                  "The fire-rated junction box has manufacturer marking indicating its PH category and the test methodology it has been tested to. Typical markings include PH30 or PH120 with reference to BS EN 50200 / BS 8434-2; the box may also carry CE / UKCA marking referencing the relevant product standards. Plastic boxes do not meet fire-rated requirements and are clearly distinguishable from metal fire-rated boxes by construction. The cable manufacturer's product range typically includes matched junction boxes designed and tested as a system with the cable.",
              },
              {
                question: 'Class A or Class B for a small simple system — does it matter?',
                answer:
                  'For a small simple system with limited devices and short cable runs, the Class A vs B decision matters less than for a large system. But the BS 5839-1:2025 default is Class A for primary detection / sounder loops because the fault-tolerance is part of the architectural protection. Specifying Class B in a small system is acceptable where the design analysis supports it; specifying Class A is the safer default. The installer should know which class each circuit is designed to and wire accordingly.',
              },
              {
                question: 'Can I tape over a joint in a fire-rated cable to make it "fire-rated"?',
                answer:
                  "No. The PH category is delivered by the system as designed and tested. Field-applied tape is not a tested fire-rated solution; it provides no engineering assurance of fire survival. A joint must be made within a fire-rated junction box per the manufacturer's tested-system instructions. Improvised joint protection is non-compliant and does not preserve the cable system's PH category.",
              },
              {
                question:
                  "My cable manufacturer's technical data shows a 1.5 m support spacing for vertical runs but BS 8519 suggests 1 m. Which applies?",
                answer:
                  'Apply the more conservative figure — 1 m in this case. The BS 8519 figure is the code-of-practice general guidance; the manufacturer figure may reflect specific cable testing under defined conditions. In practice, taking the more conservative interval costs a small amount of additional fixing labour and material, and provides additional fixing redundancy in fire conditions. Where the manufacturer&apos;s data is more conservative than BS 8519, the manufacturer figure controls.',
              },
              {
                question:
                  "Fire-stopping at penetrations — is that part of the fire alarm installer's scope or a separate trade?",
                answer:
                  'It depends on the installation contract and on the certification regime. Fire-stopping is increasingly a specialised trade with its own qualifications and competence requirements. Some fire alarm contractors are competent to perform fire-stopping under their own certification; others rely on a fire-stopping specialist. The fire alarm installer must coordinate the work — the cable cannot be installed until the penetration is prepared, the fire-stop sealed around the cable per the tested system, and the seal verified. The as-installed records should identify the fire-stop product, the date, and the installer.',
              },
              {
                question:
                  'What about flexible conduit / cable enclosures for the final connection to a device — is that acceptable?',
                answer:
                  'Flexible conduit at the final device connection is acceptable where it is fire-rated for the application. Standard plastic flexible conduit is not acceptable on fire-rated systems. Fire-rated metal flexible conduit (corrugated steel with fire-rated outer covering, or specific fire-rated flexible conduit products) provides the appropriate mechanical protection at the final connection point while preserving the fire-rated system. Length is kept to the minimum needed for the final connection; longer flexible runs may need to be replaced with rigid containment.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Wiring methods and protection — Module 4.4" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/fire-alarm-course/module-4')}
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
              onClick={() =>
                navigate('/electrician/upskilling/fire-alarm-course/module-4/section-5')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                4.5 Earth fault monitoring
              </div>
            </button>
          </div>

          <div className="hidden">
            <Wrench />
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default FireAlarmModule4Section4;
