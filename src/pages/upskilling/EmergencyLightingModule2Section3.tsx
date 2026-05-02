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
    id: 'elm2-s3-illuminance',
    question:
      'What is the minimum illuminance required for a high-risk task area under BS EN 1838:2024?',
    options: [
      '0.5 lx — same as anti-panic.',
      '15 lx OR 10 % of the normal task illuminance, whichever is HIGHER. The double rule reflects the function: occupants must operate or shut down hazardous equipment safely. Some tasks need much more than 15 lx in normal use (a precision metalworking station might run at 1000 lx) — and 10 % of that (100 lx) becomes the emergency floor. Other tasks need less normally (a basic chemical mixing area at 200 lx) — 10 % (20 lx) is still above the 15 lx headline floor, so 20 lx applies. The rule means the emergency level scales with the task hazard, not just a fixed minimum.',
      '5 lx — same as fire equipment.',
      '50 lx fixed.',
    ],
    correctIndex: 1,
    explanation:
      'BS EN 1838:2024 §6 — high-risk task lighting minimum is 15 lx OR 10 % of the maintained task illuminance, whichever is higher. The two-part rule scales with task hazard. A printing press normally illuminated to 750 lx requires 75 lx emergency illuminance (10 % of normal); a small chemical lab normally at 300 lx requires 30 lx (10 % of normal); a basic warehouse loading bay at 100 lx normal requires 15 lx (the headline floor, because 10 % is only 10 lx).',
  },
  {
    id: 'elm2-s3-response',
    question:
      'What is the maximum permissible response time for high-risk task area lighting under BS EN 1838:2024?',
    options: [
      '5 s — same as escape route lighting.',
      '0.5 s — full rated illuminance must be achieved within half a second of mains failure. The figure is an order of magnitude tighter than escape route or anti-panic lighting, reflecting the safety consequences of operating machinery in darkness. Tools that take 5 s to spin down (band saws, lathes, mixers) cannot be safely controlled during a 5 s lighting blackout. The 0.5 s figure ensures the operator never loses visual contact with the task. This requires LED technology and continuous-operation circuits — most discharge lamps cannot meet 0.5 s.',
      '15 s.',
      '60 s.',
    ],
    correctIndex: 1,
    explanation:
      'BS EN 1838:2024 §6 — high-risk task lighting response time 0.5 s to full output. The 10× tighter figure compared to escape route lighting reflects the difference between "walking out safely" and "shutting down machinery safely". LED is mandatory; the design typically uses continuous-operation luminaires that are always on at emergency level (maintained or sustained mode).',
  },
  {
    id: 'elm2-s3-2025-circuits',
    question:
      'BS 5266-1:2025 introduced a new requirement for high-risk task area lighting circuits. What is it?',
    options: [
      'Single circuit only — to simplify maintenance.',
      'AT LEAST TWO separate circuits, with no more than 20 luminaires per circuit, so that a single circuit fault does not extinguish ALL emergency illumination at a high-risk task area. The rule is new in BS 5266-1:2025 and reflects the criticality of high-risk task lighting — losing all illumination at a printing press or chemical mixing station produces immediate injury risk. Splitting across two circuits ensures one circuit fault leaves the other intact, with at least partial illumination retained while the operator achieves safe shutdown.',
      'No circuit limit — each luminaire on its own fuse.',
      'Continuous bus circuit only.',
    ],
    correctIndex: 1,
    explanation:
      'The dual-circuit rule (≥ 2 circuits, ≤ 20 luminaires per circuit) is new in BS 5266-1:2025 §7.5 and applies only to high-risk task area lighting. Escape route and anti-panic categories are not subject to this specific requirement. The rationale is the consequence of total lighting loss at a high-risk task — escape route loss is recoverable (occupants navigate slowly); high-risk task loss can produce immediate injury.',
  },
  {
    id: 'elm2-s3-trigger',
    question:
      'What determines whether an area requires high-risk task lighting under BS EN 1838:2024?',
    options: [
      'Floor area exceeding 60 m².',
      'A risk assessment identifying the area as one where occupants must perform a potentially hazardous operation (typically machinery shutdown, hot process control, lift egress, chemical neutralisation) before they can safely evacuate. The trigger is functional — does failure to safely operate the equipment during a power loss create an injury risk that emergency illumination at standard levels cannot mitigate? If yes, high-risk task lighting applies. The risk assessment must be documented; the assessor identifies the locations and the design provides 15 lx (or 10 % of normal task illuminance) at those points.',
      'Occupancy exceeding 10 persons.',
      'Premises type — only factories qualify.',
    ],
    correctIndex: 1,
    explanation:
      'High-risk task is risk-assessment-led, not area-led or premises-led. A small chemistry lab in an office building can trigger the requirement at one bench; a large warehouse with no machinery may not trigger it anywhere. The risk assessment identifies the specific points where high-risk task illumination is needed; the design provides 15 lx (or 10 % of normal) at each such point with 0.5 s response.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What is the BS EN 1838:2024 minimum illuminance for high-risk task area lighting at the working plane?',
    options: [
      '1 lx.',
      '15 lx OR 10 % of the normal maintained task illuminance, whichever is HIGHER. The double rule scales with task hazard. A printing press at 750 lx normal needs 75 lx emergency. A chemical mixing station at 500 lx needs 50 lx emergency. A simpler high-risk task at 100 lx normal needs 15 lx (10 % is only 10 lx, but the headline floor is 15 lx). The rule ensures emergency illumination is meaningful for the specific task, not just a fixed baseline.',
      '0.5 lx.',
      '300 lx.',
    ],
    correctAnswer: 1,
    explanation:
      'BS EN 1838:2024 §6 — high-risk task lighting minimum 15 lx OR 10 % of normal, whichever is higher. The figure is at the working plane (typically table or bench level, not floor level — different from escape route). The "whichever is higher" part means the rule scales with task complexity.',
  },
  {
    id: 2,
    question:
      'What is the maximum response time for high-risk task area lighting under BS EN 1838:2024?',
    options: [
      '5 s.',
      '0.5 s — full rated illuminance within half a second of mains failure. An order of magnitude tighter than escape route or anti-panic lighting. Reflects the consequence of operating machinery in darkness — power tools, presses, mixers do not stop instantaneously and the operator needs continuous visual contact with the equipment to achieve safe shutdown.',
      '15 s.',
      '60 s.',
    ],
    correctAnswer: 1,
    explanation:
      'The 0.5 s figure is calibrated against the spin-down time of typical hazardous machinery and the response time of human visual control. LED is mandatory; discharge lamps cannot meet 0.5 s. Many designs use continuous-operation luminaires (always on at emergency level) so there is effectively no switchover delay at all.',
  },
  {
    id: 3,
    question:
      'A printing press is normally illuminated to 750 lx at the working plane. What emergency illuminance applies under BS EN 1838:2024 if the press is identified as a high-risk task area?',
    options: [
      '15 lx — the headline minimum.',
      '75 lx — 10 % of normal task illuminance, because that figure is HIGHER than the 15 lx headline minimum. The "whichever is higher" rule selects 75 lx. The press operator needs to see the running web, the rollers, the nip points, the emergency stop — and can only do this if the emergency level is meaningful in proportion to the normal level. 15 lx would be utter darkness compared to the operator\'s normal visual environment of 750 lx; the 10 % rule corrects this.',
      '7.5 lx — 1 % of normal.',
      '300 lx.',
    ],
    correctAnswer: 1,
    explanation:
      'The "whichever is higher" rule is the load-bearing part. 75 lx is much higher than 15 lx so 75 lx applies. The rule scales emergency illumination with task demand. A high-risk task that runs at 1000 lx normally would require 100 lx emergency, not 15 lx.',
  },
  {
    id: 4,
    question:
      'BS 5266-1:2025 introduced a circuit-level requirement for high-risk task lighting. What is it?',
    options: [
      'Single circuit per area for simplicity.',
      'At least TWO separate circuits, with NO MORE THAN 20 luminaires per circuit. A single circuit fault must not extinguish all emergency illumination at the high-risk task area. The rule is new in BS 5266-1:2025 §7.5 and reflects the disproportionate consequence of total lighting loss at a hazardous task. Splitting across two circuits ensures partial illumination remains during a circuit fault.',
      'Each luminaire on its own dedicated circuit.',
      'No circuit limit applies.',
    ],
    correctAnswer: 1,
    explanation:
      'The dual-circuit / 20-luminaire-per-circuit rule is specific to high-risk task lighting in BS 5266-1:2025. It does not apply to escape route or anti-panic lighting (single-circuit installations remain acceptable for those). The rule recognises that high-risk task lighting failure produces injury risk, not just inconvenience.',
  },
  {
    id: 5,
    question:
      'A chemistry research lab has a single fume hood used for hazardous reactions. The hood is normally lit to 500 lx. The risk assessment identifies the hood as a high-risk task area. What emergency provision applies?',
    options: [
      '0.5 lx anti-panic only.',
      '50 lx (10 % of 500 lx, higher than the 15 lx headline) at the working plane of the fume hood, achieved within 0.5 s of mains failure, supplied via at least 2 separate circuits, with rated duration at least equal to the building\'s duration (typically 3 h non-domestic). Anti-panic and escape route lighting also apply to the lab as a whole, but the high-risk task lighting at the hood is in addition to, not instead of, those.',
      '15 lx fixed.',
      'No emergency provision required.',
    ],
    correctAnswer: 1,
    explanation:
      'High-risk task lighting is layered ON TOP of the other categories, not in place of them. The lab gets escape route lighting at exits and decision points, anti-panic across the unobstructed floor (if triggers fire), AND high-risk task at the fume hood. Three independent functional categories, applying concurrently.',
  },
  {
    id: 6,
    question:
      'What is the typical mounting strategy for high-risk task lighting at a machine tool to achieve 15 lx with 0.5 s response?',
    options: [
      'Single emergency downlight in the centre of the room.',
      'Dedicated TASK-SPECIFIC luminaires mounted directly above or beside the machinery, often integrated into the machine guard, working in maintained mode (always on during operation) so there is effectively zero switchover delay. This contrasts with escape route lighting, which sits on corridor ceilings and switches on at mains failure. High-risk task luminaires are typically continuous-operation, redundantly supplied, and aimed at the working plane rather than the floor.',
      'General room lighting only.',
      'Floor-level strip lighting around the machine.',
    ],
    correctAnswer: 1,
    explanation:
      'Task-specific dedicated luminaires are the practical implementation. Maintained mode (always on) eliminates the switchover delay risk. Direct aim at the working plane (where the operator looks) achieves 15 lx or higher there, regardless of room average. The luminaires are sometimes integrated into the machine guard for direct illumination of the task surface.',
  },
  {
    id: 7,
    question:
      'How does the BS 5266-1:2025 dual-circuit rule for high-risk task lighting interact with battery / central system architecture?',
    options: [
      'It only applies to self-contained luminaires.',
      'It applies regardless of architecture. Self-contained luminaires meet the rule by being on two SEPARATE final circuits (each circuit with its own MCB / fuse). Central battery system meets it by having two SEPARATE circuits from the central battery to the high-risk task luminaires (typically two parallel feeders, each with its own protective device). The fault that the rule defends against is a circuit-level fault (short, open, MCB trip) — both architectures must accommodate this.',
      'Central battery systems are exempt.',
      'Self-contained luminaires are exempt.',
    ],
    correctAnswer: 1,
    explanation:
      'The rule is architecture-neutral. The hazard it defends against — a circuit-level fault extinguishing all emergency illumination — exists in both self-contained and central battery installations. The implementation differs (separate final circuits vs separate feeder circuits) but the principle is the same.',
  },
  {
    id: 8,
    question:
      'What is the rated DURATION for high-risk task area lighting under BS 5266-1:2025?',
    options: [
      '1 minute — only long enough to switch off the machinery.',
      'At least equal to the duration of the rest of the emergency lighting in the same premises (typically 3 h for non-domestic). High-risk task lighting must persist not just for the immediate shutdown but also for any subsequent inspection, isolation, decontamination, and evacuation phases. Designing high-risk task lighting to a shorter duration than the building default is a methodology error — the system needs to be available for the full evacuation profile, including return-to-task scenarios where re-energising is delayed.',
      '5 minutes.',
      '24 hours.',
    ],
    correctAnswer: 1,
    explanation:
      'Duration is a property of the building emergency installation, not a separate property of high-risk task. 3 h non-domestic default applies. Designs that make high-risk task "only as long as needed for shutdown" fail because the area may need to be re-entered during the duration window for fire-fighting, decontamination, or rescue. Match the building duration.',
  },
  {
    id: 9,
    question:
      'A small bakery has a dough mixer (large enclosed motor, slow-spinning blade) and a gas-fired oven. Mixer normally at 200 lx, oven control panel at 300 lx. Risk assessment identifies both as high-risk task locations. What emergency provision applies?',
    options: [
      'No high-risk task — bakeries are exempt.',
      'High-risk task illumination at BOTH points: mixer at 20 lx (10 % of 200 lx, higher than 15 lx), oven at 30 lx (10 % of 300 lx, higher than 15 lx). Both within 0.5 s. Both fed from at least 2 separate circuits. Duration matches building duration. The risk assessment is the trigger; the measured illuminance is calculated from the "whichever higher" rule applied to each task individually.',
      '15 lx at the mixer only.',
      '5 lx vertical at signage only.',
    ],
    correctAnswer: 1,
    explanation:
      'Each high-risk task location is calculated independently. The "whichever higher" rule produces 20 lx for the mixer and 30 lx for the oven panel. Both points are illuminated in addition to escape route and anti-panic. Most small bakeries have at least one high-risk task — mixers, slicers, ovens, hot pans — and BS 5266-1:2025 catches them via the risk assessment.',
  },
  {
    id: 10,
    question:
      'Why is the high-risk task response time 0.5 s rather than the 5 s used for escape route and anti-panic?',
    options: [
      'Convention.',
      'Hazardous machinery does not stop instantaneously when mains fails — band saws, presses, mixers, lathes, hot processes have inertia and continue to rotate / move / radiate for several seconds after power is cut. During those seconds the operator needs to see the equipment to bring it under control safely (engage emergency stop, withdraw hands, isolate stock, etc.). A 5 s blackout means the operator is operating in the dark for that period — fingers in the path of a slowing-but-still-moving blade. 0.5 s ensures continuous visual control. The figure is calibrated against the spin-down profile of typical industrial machinery.',
      'Different test standard.',
      'Different battery technology.',
    ],
    correctAnswer: 1,
    explanation:
      'The 10× tighter response time matches the safety consequences of darkness. Escape route lighting answers "can occupants leave safely" — a few seconds delay is recoverable. High-risk task lighting answers "can occupants control the hazard before evacuating" — a few seconds delay produces injury. The two figures are calibrated to two different functional outcomes.',
  },
];

const EmergencyLightingModule2Section3 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'High-risk task area lighting | Emergency Lighting Module 2.3 | Elec-Mate',
    description:
      'BS EN 1838:2024 high-risk task lighting: 15 lx OR 10 % of normal task illuminance (whichever higher), 0.5 s response, BS 5266-1:2025 NEW dual-circuit rule with max 20 luminaires per circuit.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('/electrician/upskilling/emergency-lighting-module-2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 2
          </button>

          <PageHero
            eyebrow="Module 2 · Section 3"
            title="High-risk task area lighting"
            description="The third functional category — and the most demanding. BS EN 1838:2024: 15 lx OR 10 % of normal task illuminance (whichever higher) at the working plane, with full output within 0.5 s of mains failure. NEW under BS 5266-1:2025: high-risk task circuits must be split across at least two circuits with no more than 20 luminaires per circuit."
            tone="yellow"
          />

          <TLDR
            points={[
              'High-risk task area lighting allows occupants to safely shut down hazardous processes (machinery, hot processes, chemical reactions, lifts mid-cycle) before evacuating.',
              'BS EN 1838:2024 minimum: 15 lx OR 10 % of normal maintained task illuminance, whichever is HIGHER. The double rule scales emergency level with task demand.',
              'Response time: full rated illuminance within 0.5 s — an order of magnitude tighter than the 5 s for escape route / anti-panic. LED mandatory; many designs use continuous-operation (maintained) mode to eliminate switchover delay.',
              'NEW under BS 5266-1:2025 §7.5: high-risk task lighting requires AT LEAST 2 separate circuits, with NO MORE THAN 20 luminaires per circuit. A single circuit fault must not extinguish all illumination at a high-risk task.',
              'Trigger: risk assessment. Not area-led, not occupancy-led. The assessor identifies specific points where machinery shutdown / hot-process control / hazardous task completion is required during evacuation.',
              'Mounting: typically dedicated task-specific luminaires above or beside the machinery, often integrated into the machine guard, aimed at the working plane (not floor).',
              'Duration: matches the building emergency lighting duration (3 h non-domestic default). Not a shorter "shutdown-only" duration.',
              'Independent of escape route and anti-panic — high-risk task is in ADDITION to those, not instead of them.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'State the BS EN 1838:2024 illuminance, response-time and duration requirements for high-risk task area lighting',
              'Apply the "15 lx OR 10 % of normal task illuminance, whichever higher" rule to specific task examples',
              'Identify the NEW BS 5266-1:2025 dual-circuit rule (≥ 2 circuits, ≤ 20 luminaires per circuit) and explain its rationale',
              'Use a risk assessment to determine where high-risk task lighting is mandatory',
              'Specify task-specific luminaire placement (above / beside machinery, integrated into guards) and continuous-operation mode',
              'Distinguish high-risk task lighting (15 lx, 0.5 s, working plane) from escape route (1 lx, 5 s, floor) and anti-panic (0.5 lx, 5 s, floor)',
              'Recognise that high-risk task lighting applies in ADDITION to escape route and anti-panic, not instead of them',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>What high-risk task lighting is for</ContentEyebrow>

          <ConceptBlock
            title="Safe shutdown before evacuation"
            plainEnglish="The other emergency lighting categories assume occupants leave the building. High-risk task lighting recognises that some occupants cannot leave immediately — they have to do something hazardous first. A printing press operator cannot just walk away from a running press; the press has to be brought to a controlled stop (emergency stop button, isolation, blade locked). A chemist mid-reaction cannot just walk away from an exothermic process; the reaction has to be quenched or the system isolated. A lift operator cannot just walk away from a stuck lift; the car has to be levelled and the doors opened. In each case, the work-to-make-safe takes seconds to minutes and requires the operator to see the equipment they are controlling. High-risk task lighting provides the visual environment for this shutdown phase."
            onSite="Identify the high-risk task points first by walking the building with the operator. 'What can't you just walk away from?' is the survey question. The points where the operator hesitates — that's where high-risk task lighting goes."
          >
            <p>Typical high-risk task locations:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Machine tools.</strong> Lathes, mills, presses, saws, grinders. Operators
                need to see the cutting edge / press platen / blade to engage emergency stop and
                withdraw hands.
              </li>
              <li>
                <strong>Printing and converting.</strong> Web presses, slitter / rewinders, label
                machines. The running web has to be stopped, the rollers parked, the nip points
                cleared.
              </li>
              <li>
                <strong>Hot processes.</strong> Furnaces, ovens, soldering / welding stations,
                molten material handling. Stop the process safely; isolate the gas / power.
              </li>
              <li>
                <strong>Chemical processes.</strong> Reactors, fume hoods, mixing stations.
                Quench reactions, close valves, evacuate vessels.
              </li>
              <li>
                <strong>Lifts mid-cycle.</strong> A stuck lift car must be levelled and doors
                opened from inside. The lift control panel needs illumination.
              </li>
              <li>
                <strong>Food processing.</strong> Slicers, mixers, ovens, fryers. Hot oil and
                rotating blades need controlled shutdown.
              </li>
              <li>
                <strong>High-voltage / high-current operations.</strong> Live HV switching,
                substation work, electroplating baths. Operators need clear sight of the work
                area to disengage safely.
              </li>
              <li>
                <strong>Material handling at height.</strong> Cranes, gantries, hoists. Operators
                need to see the load and ground crew to stop safely.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 1838:2024 · §6 (High-risk task area lighting)"
            clause={
              <>
                High-risk task area lighting shall provide an illuminance not less than 15 lx or
                10 % of the maintained illuminance of the normal lighting at the task, whichever
                is the higher. The illuminance shall be reached within 0.5 s. The minimum
                duration shall be the period of operation of the high-risk task.
              </>
            }
            meaning="Two-part minimum (15 lx OR 10 % of normal, whichever higher) makes the emergency level scale with task demand. 0.5 s response — order of magnitude tighter than the 5 s for other categories. Duration is the period of operation of the task — in practice this means as long as the task may be performed, which is the building duration."
          />

          <ConceptBlock
            title="The 'whichever higher' rule"
            plainEnglish="The rule has two thresholds and you take the higher. The 15 lx is a headline floor — emergency illumination cannot be less than 15 lx anywhere a high-risk task is performed, even if the task is normally done at low light. The 10 % is a scaling rule — for tasks that are normally done at high illumination, emergency illumination scales up proportionally. The result: simple high-risk tasks at 100 lx normal get 15 lx emergency (10 % is only 10 lx, so the headline floor wins). Complex high-risk tasks at 1000 lx normal get 100 lx emergency (the 10 % rule wins). The rule scales emergency provision with task demand."
          >
            <p>Worked examples:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Loading bay forklift operation, 100 lx normal.</strong> 10 % = 10 lx; 15
                lx headline higher. Emergency = 15 lx.
              </li>
              <li>
                <strong>Assembly bench, 300 lx normal.</strong> 10 % = 30 lx; 15 lx headline lower.
                Emergency = 30 lx.
              </li>
              <li>
                <strong>Chemical fume hood, 500 lx normal.</strong> 10 % = 50 lx; emergency = 50
                lx.
              </li>
              <li>
                <strong>Printing press, 750 lx normal.</strong> 10 % = 75 lx; emergency = 75 lx.
              </li>
              <li>
                <strong>Precision machining, 1000 lx normal.</strong> 10 % = 100 lx; emergency =
                100 lx.
              </li>
              <li>
                <strong>Microscopic / inspection work, 2000 lx normal.</strong> 10 % = 200 lx;
                emergency = 200 lx.
              </li>
            </ul>
            <p>
              The figures are at the WORKING PLANE (typically table or bench level) not at floor
              level. This is a key difference from escape route and anti-panic, both measured at
              floor. The working plane is wherever the task is performed — usually 0.85 m for
              standing tasks, 0.5 m for sitting tasks, on the equipment surface for machine tools.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          {/* Diagram: high-risk task with 15 lx + 0.5 s + dual-circuit (NEW 2025) */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              High-risk task — 15 lx working plane, 0.5 s response, dual-circuit (NEW 2025)
            </h4>
            <svg
              viewBox="0 0 820 460"
              className="w-full h-auto"
              role="img"
              aria-label="Plan and elevation of a high-risk task area showing dedicated task-specific luminaires above the machinery, working plane illuminance 15 lx (or 10 % of normal task illuminance), 0.5 s response time, and the new BS 5266-1:2025 requirement for at least two separate circuits with no more than 20 luminaires per circuit."
            >
              <text x="410" y="24" textAnchor="middle" fill="#FBBF24" fontSize="13" fontWeight="bold">
                HIGH-RISK TASK — 15 lx (or 10 % of normal) at working plane in 0.5 s
              </text>
              <text x="410" y="40" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="10">
                BS EN 1838:2024 §6 · BS 5266-1:2025 §7.5 (NEW dual-circuit rule)
              </text>

              {/* Machine outline */}
              <rect
                x="200"
                y="160"
                width="240"
                height="120"
                rx="6"
                fill="rgba(255,255,255,0.06)"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="1.6"
              />
              <text x="320" y="226" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="11" fontWeight="bold">
                Machine tool / press / mixer
              </text>
              <text x="320" y="242" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                normal task illuminance e.g. 750 lx
              </text>

              {/* Working plane (red dashed at top of machine) */}
              <line
                x1="200"
                y1="180"
                x2="440"
                y2="180"
                stroke="#EF4444"
                strokeWidth="1.5"
                strokeDasharray="4,3"
              />
              <text x="450" y="184" fill="#EF4444" fontSize="9" fontWeight="bold">
                working plane (15 lx min)
              </text>

              {/* Luminaire 1 (circuit A) */}
              <g>
                <circle cx="240" cy="120" r="9" fill="rgba(251,191,36,0.95)" />
                <circle cx="240" cy="120" r="18" fill="rgba(251,191,36,0.18)" />
                <text x="240" y="105" textAnchor="middle" fill="#22D3EE" fontSize="9" fontWeight="bold">
                  Circuit A
                </text>
                <line x1="240" y1="129" x2="240" y2="180" stroke="rgba(251,191,36,0.4)" strokeWidth="1" strokeDasharray="2,2" />
              </g>

              {/* Luminaire 2 (circuit B) */}
              <g>
                <circle cx="400" cy="120" r="9" fill="rgba(251,191,36,0.95)" />
                <circle cx="400" cy="120" r="18" fill="rgba(251,191,36,0.18)" />
                <text x="400" y="105" textAnchor="middle" fill="#A855F7" fontSize="9" fontWeight="bold">
                  Circuit B
                </text>
                <line x1="400" y1="129" x2="400" y2="180" stroke="rgba(251,191,36,0.4)" strokeWidth="1" strokeDasharray="2,2" />
              </g>

              {/* Operator silhouette beside machine */}
              <g transform="translate(490 220)">
                <circle cx="0" cy="-20" r="9" fill="rgba(255,255,255,0.5)" />
                <rect x="-8" y="-10" width="16" height="36" fill="rgba(255,255,255,0.3)" />
                <text x="0" y="50" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                  operator
                </text>
              </g>

              {/* Circuit feeders schematic */}
              <g>
                <rect x="60" y="80" width="100" height="40" rx="6" fill="rgba(34,211,238,0.1)" stroke="#22D3EE" strokeWidth="1.5" />
                <text x="110" y="98" textAnchor="middle" fill="#22D3EE" fontSize="10" fontWeight="bold">
                  MCB A
                </text>
                <text x="110" y="112" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                  ≤ 20 lum.
                </text>
                <line x1="160" y1="100" x2="240" y2="120" stroke="#22D3EE" strokeWidth="1.5" />
              </g>
              <g>
                <rect x="660" y="80" width="100" height="40" rx="6" fill="rgba(168,85,247,0.1)" stroke="#A855F7" strokeWidth="1.5" />
                <text x="710" y="98" textAnchor="middle" fill="#A855F7" fontSize="10" fontWeight="bold">
                  MCB B
                </text>
                <text x="710" y="112" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                  ≤ 20 lum.
                </text>
                <line x1="660" y1="100" x2="400" y2="120" stroke="#A855F7" strokeWidth="1.5" />
              </g>

              {/* Response time + dual circuit annotation */}
              <g>
                <rect
                  x="60"
                  y="320"
                  width="700"
                  height="120"
                  rx="10"
                  fill="rgba(239,68,68,0.06)"
                  stroke="rgba(239,68,68,0.45)"
                  strokeWidth="1.4"
                />
                <text x="80" y="344" fill="#EF4444" fontSize="11" fontWeight="bold">
                  Response time: full rated illuminance within 0.5 s of mains failure.
                </text>
                <text x="80" y="362" fill="rgba(255,255,255,0.7)" fontSize="10">
                  10× tighter than escape route (5 s). LED mandatory. Maintained mode typical (always-on).
                </text>
                <text x="80" y="384" fill="#EF4444" fontSize="11" fontWeight="bold">
                  NEW BS 5266-1:2025 §7.5: ≥ 2 separate circuits, ≤ 20 luminaires per circuit.
                </text>
                <text x="80" y="402" fill="rgba(255,255,255,0.7)" fontSize="10">
                  Single circuit fault must not extinguish all illumination at a high-risk task.
                </text>
                <text x="80" y="420" fill="rgba(255,255,255,0.7)" fontSize="10">
                  Duration: matches building duration (3 h non-domestic default). Working plane, not floor.
                </text>
              </g>
            </svg>
          </div>

          <SectionRule />

          <ContentEyebrow>The 0.5 s response time</ContentEyebrow>

          <ConceptBlock
            title="Why 0.5 s — the hazard timing argument"
            plainEnglish="Hazardous machinery does not stop instantaneously when power is cut. A band saw spins down over 4-8 seconds. A printing press web takes 6-10 seconds to stop. A mixer with mechanical inertia takes 3-5 seconds. During that spin-down, the equipment is still moving — the blade is still cutting, the rollers are still pulling, the mixer is still rotating. The operator needs to see what is happening to bring it under control safely. A 5-second blackout (the figure used for escape route lighting) leaves the operator in darkness through the entire spin-down window. 0.5 s ensures continuous visual contact with the equipment from the moment of mains failure onward. The figure is calibrated against typical industrial machinery spin-down timing — 0.5 s is short enough that the human eye does not lose visual orientation, and short enough that the spin-down phase is fully illuminated."
          >
            <p>How designs achieve 0.5 s in practice:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>LED technology mandatory.</strong> Discharge lamps cannot meet 0.5 s —
                their ignition / warm-up cycle is 5-30 s. LED is effectively instant. Older
                installations using sodium / fluorescent lighting cannot be retrofitted to
                high-risk task without converting to LED.
              </li>
              <li>
                <strong>Maintained mode common.</strong> The simplest way to achieve 0.5 s is
                continuous operation — the luminaire is ALWAYS on at emergency level (or higher).
                On mains failure, the luminaire keeps running on battery; there is no switchover.
                Used at machinery, fume hoods, hot processes.
              </li>
              <li>
                <strong>Sustained / dual-emergency luminaires.</strong> Have a separate emergency
                lamp inside the same luminaire, always energised, with the main lamp providing
                additional output during normal operation. On mains failure the main goes off and
                the emergency continues. Compact and reliable.
              </li>
              <li>
                <strong>Self-contained switchover.</strong> Standard non-maintained luminaires use
                a relay that responds in milliseconds — well within 0.5 s. The risk is relay wear
                over many years; high-risk task installations should avoid relay-based switchover
                where possible.
              </li>
              <li>
                <strong>Central battery with fast switchover.</strong> Modern central battery
                systems achieve switchover in under 100 ms. Older systems may be 1-2 s — too slow
                for high-risk task. Audit installations using central battery for high-risk task
                to confirm switchover speed.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 1838:2024 · §6.2 (Response time for high-risk task lighting)"
            clause={
              <>
                For high-risk task area lighting, the illuminance shall reach the required value
                within 0.5 s of the failure of the normal supply.
              </>
            }
            meaning="0.5 s is full output, not 50 % output (the 5 s escape route figure was 50 %). The faster figure plus the higher absolute level (full output) means the high-risk task is illuminated continuously at the working level from the moment of mains failure. Operators do not lose any meaningful visual control."
          />

          <SectionRule />

          <ContentEyebrow>BS 5266-1:2025 NEW dual-circuit rule</ContentEyebrow>

          <ConceptBlock
            title="≥ 2 circuits, ≤ 20 luminaires per circuit"
            plainEnglish="BS 5266-1:2025 introduced a new specific requirement for high-risk task lighting circuits: at least two separate circuits, with no more than 20 luminaires on any one circuit. The rule does NOT apply to escape route or anti-panic lighting; it is specific to high-risk task. The reason is the consequence of total lighting loss at a high-risk task. Escape route loss is recoverable — occupants navigate slowly, but they can still navigate. High-risk task loss is not — the operator at a running press cannot do anything safely without illumination. The dual-circuit rule ensures a single circuit fault (short, MCB trip, broken cable, fuse blow) leaves at least one circuit intact, so partial illumination remains while the operator achieves shutdown."
          >
            <p>How the rule works in practice:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Self-contained luminaires.</strong> Two luminaires above each high-risk
                task, each on a different final circuit (different MCB / fuse). One MCB tripping
                kills one luminaire; the other remains.
              </li>
              <li>
                <strong>Central battery system.</strong> Two parallel feeders from the central
                battery to the high-risk task luminaires, each on a different protective device.
                A feeder fault kills one feeder; the other remains.
              </li>
              <li>
                <strong>20-luminaire limit.</strong> A circuit serving 50 luminaires across many
                high-risk tasks would, on a fault, kill all 50 — defeating the redundancy.
                Limiting to 20 luminaires per circuit restricts the impact of a single fault.
              </li>
              <li>
                <strong>Backwards compatibility.</strong> Existing installations from before BS
                5266-1:2025 are not retrospectively non-compliant; the rule applies to new
                installations and major refurbishments. Risk-assessment-led upgrade is encouraged.
              </li>
              <li>
                <strong>Documentation.</strong> The dual-circuit arrangement should be reflected
                in the as-built drawings, with each circuit clearly identified and the serving
                MCB / protective device marked.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 5266-1:2025 · §7.5 (Circuit arrangements for high-risk task area lighting)"
            clause={
              <>
                Emergency lighting installations serving high-risk task areas shall be arranged
                such that the failure of any single circuit does not extinguish all the emergency
                illumination at the task. At least two separate circuits shall be provided for
                each high-risk task area, with no single circuit serving more than 20 luminaires.
              </>
            }
            meaning="The rule has two parts. First, two separate circuits are mandatory at every high-risk task area. Second, no circuit may carry more than 20 luminaires regardless of how many tasks it serves. Both parts must be satisfied; one without the other is not compliant. The rule is new in BS 5266-1:2025 and applies prospectively."
          />

          <CommonMistake
            title="Single-circuit emergency lighting at machinery"
            whatHappens="A factory installs emergency lighting throughout including at the machine tool area, all on a single emergency circuit fed from one central battery feeder. Under BS 5266-1:2025 §7.5 this is non-compliant for the high-risk task area. A single feeder fault would extinguish ALL emergency illumination at the machinery during a power outage — operator at the press is in total darkness during the spin-down. Re-design needed: split the high-risk task luminaires across two feeders."
            doInstead="At every high-risk task area, plan dual-circuit emergency lighting from the start. Identify which luminaires serve high-risk tasks and which serve escape route / anti-panic only. The high-risk task luminaires need the dual-circuit redundancy; the others may be on a single circuit if simpler. Split the high-risk task luminaires across two MCBs (or two central battery feeders) at design stage."
          />

          <CommonMistake
            title="Treating a generic 5 s response as adequate for high-risk task"
            whatHappens="A designer specifies escape-route-grade luminaires (5 s response) above a printing press, on the basis that they are emergency luminaires and meet the general standard. The press is a high-risk task and the BS EN 1838:2024 §6 response time is 0.5 s, not 5 s. On commissioning, the switchover test takes 1.2 s — fails high-risk task response. The luminaires are non-compliant for that location; they would be fine in a corridor."
            doInstead="Identify the response-time category at design stage. High-risk task luminaires are a specific product class — typically marked '0.5 s response' or 'continuous-operation maintained' on the rating plate. They are slightly more expensive than standard emergency luminaires and use different switching electronics. Specify the right product for the task; do not assume 'emergency' is enough."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Risk assessment as the trigger</ContentEyebrow>

          <ConceptBlock
            title="Risk-assessment-led, not premises-led"
            plainEnglish="Unlike escape route lighting (mandatory wherever an escape route exists) and anti-panic lighting (triggered by area or occupancy), high-risk task lighting is risk-assessment-led. The competent person — usually a fire risk assessor or a technical specialist — walks the building and identifies specific points where occupants must perform a hazardous task to make safe before evacuating. The risk assessment documents these points. The lighting design then provides 15 lx (or 10 % of normal) at each documented point, with 0.5 s response and dual-circuit redundancy. The trigger is the risk assessment; the design follows it."
          >
            <p>What the risk assessor is looking for:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>"Walk-away unsafe" tasks.</strong> Can the occupant safely walk away from
                the equipment / process without doing something first? If yes (e.g. office desk
                with computer) — no high-risk task lighting. If no (e.g. running mixer) — high-risk
                task lighting required.
              </li>
              <li>
                <strong>Spin-down / cool-down hazards.</strong> Equipment that retains energy after
                power loss — rotating machinery, hot surfaces, pressurised systems — typically
                qualifies because the operator needs to see the spin-down / cool-down to manage
                it.
              </li>
              <li>
                <strong>Manual emergency-stop sequences.</strong> Where the operator has to
                physically engage emergency stops, isolate gas / chemicals, lock out energy
                sources — illumination of those controls is mandatory.
              </li>
              <li>
                <strong>Trapped-occupant scenarios.</strong> Lifts, hoists, confined spaces — any
                location where occupants might be inside and need to operate controls to escape.
                The lift car is a classic example; the inside of a confined space access hatch is
                another.
              </li>
              <li>
                <strong>Process-criticality.</strong> Some processes cannot be left in an
                indeterminate state without producing further hazard (chemical reactions, hot
                metal handling, live-line work). The risk assessment identifies these process-stop
                requirements.
              </li>
              <li>
                <strong>Premises type does not exempt.</strong> An office can have a high-risk
                task (e.g. a small chemistry lab in an R&D building, a 3D printer with hot parts).
                A factory may not have any high-risk tasks if the operations are passive (e.g.
                product storage). The premises label does not predict the requirement; the risk
                assessment does.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 5266-1:2025 · §5.5 (Identification of high-risk task areas)"
            clause={
              <>
                The responsible person, in consultation with competent persons as necessary, shall
                identify any high-risk task areas within the premises. A high-risk task area is
                any location where the failure of normal lighting could prevent the safe shutdown
                of a hazardous process or operation. The identification shall be documented in the
                fire risk assessment.
              </>
            }
            meaning="The responsible person (typically the building owner or operator) leads the identification, supported by competent persons (risk assessor, lighting designer). The output is documented — listed in the fire risk assessment as specific locations. The lighting design takes that list and provides the 15 lx / 0.5 s / dual-circuit provision at each."
          />

          <Scenario
            title="The R&D laboratory in an office building"
            situation="A general office building in central London has, on its 4th floor, a small R&D laboratory with one fume hood used for occasional hazardous reactions. The building's main use is office (escape route 1 lx, anti-panic 0.5 lx where triggers fire). The lab is 35 m² with maximum 4 occupants. Anti-panic does not trigger (small area, low occupancy). The fume hood, however, is used for reactions that cannot be left running during a power loss — they need active quenching. Risk assessment identifies the fume hood working plane as a high-risk task area. Normal task illuminance at the hood is 500 lx."
            whatToDo="High-risk task lighting at the fume hood working plane: 50 lx (10 % of 500 lx, higher than 15 lx headline), within 0.5 s response, supplied by two separate emergency circuits (BS 5266-1:2025 dual-circuit rule), with rated duration matching the building (3 h). Practical implementation: two LED downlights mounted directly above the fume hood, each on a different emergency circuit, in maintained mode (always on at emergency level during occupancy). The rest of the lab gets escape route lighting at the door (1 lx) and signage; anti-panic does not trigger so no 0.5 lx area-wide requirement."
            whyItMatters="High-risk task is location-specific, not premises-specific. An office building usually has none, but a single specialist room can change the requirement at one bench. The risk assessment is the trigger; identification of the trigger drives the design. Designers who survey only the building type (office = escape route + anti-panic) miss the high-risk task points."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Mounting and luminaire choice</ContentEyebrow>

          <ConceptBlock
            title="Task-specific luminaires above the work"
            plainEnglish="High-risk task lighting is not general room lighting. It is dedicated luminaires aimed at the working plane of the specific task. A printing press has its own task luminaires above the press; a fume hood has its own above the hood; a machine tool has its own above the cutting area. The lighting design treats each high-risk task as a discrete lighting zone with its own design calculation, regardless of where the rest of the room's emergency lighting sits."
          >
            <p>Mounting and design considerations:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Direct overhead.</strong> Most common. Luminaire mounted on the ceiling
                directly above the working plane, giving maximum lux per watt at the task.
                Suitable for benches, fume hoods, conveyor sections.
              </li>
              <li>
                <strong>Side-mounted.</strong> For tasks where overhead is not practical (e.g.
                under a low ceiling, behind a guard structure). Luminaires mounted to the side of
                the task with appropriate aim.
              </li>
              <li>
                <strong>Integrated into machine guard.</strong> Used on enclosed machine tools
                (CNC, presses) where the task is inside a guarded enclosure. Luminaires inside
                the guard, on the machine's own emergency supply (or a parallel building
                emergency supply).
              </li>
              <li>
                <strong>Track-mounted / adjustable.</strong> For tasks that may move within the
                area (workshop with multiple bench positions). Adjustable aim ensures the working
                plane is illuminated regardless of bench layout.
              </li>
              <li>
                <strong>Maintained / continuous-operation.</strong> Luminaire is always on at
                emergency level. Eliminates switchover delay. Used at high-criticality tasks
                where 0.5 s switchover is a risk.
              </li>
              <li>
                <strong>Sealed / IP-rated.</strong> Many high-risk task locations are wet, dusty,
                or chemically aggressive. IP54 minimum typical; IP65 or higher for fume hoods,
                wash areas, food processing.
              </li>
              <li>
                <strong>Impact-rated.</strong> IK rating for areas with mechanical impact risk
                (forklift collision zones, swinging boom hazards). IK08 or higher typical.
              </li>
              <li>
                <strong>Anti-glare.</strong> Some tasks (precision inspection, microscope work)
                are sensitive to direct glare. Use indirect or low-glare luminaires; aim for
                diffuse illumination of the working plane.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 5266-1:2025 · §7.6 (Luminaire selection for high-risk task areas)"
            clause={
              <>
                Luminaires used in high-risk task areas shall be selected with regard to the
                environmental conditions of the location, including ingress protection, impact
                resistance, ambient temperature, and any chemical or corrosive influences.
                Luminaires shall be mounted to provide the required illuminance at the working
                plane of the task, with consideration of glare control where the task is
                visually demanding.
              </>
            }
            meaning="Environmental robustness is part of the spec. A ceiling downlight that suits a corridor will not survive in a fume hood, a wash bay, or a forklift zone. Match the luminaire to the location: IP rating, IK rating, temperature, chemical resistance. The mounting must produce the required illuminance at the working plane — not just at floor level."
          />

          <CommonMistake
            title="Generic ceiling emergency luminaires above a fume hood"
            whatHappens="A designer specifies a row of standard 3-hour LED emergency downlights across a chemistry lab ceiling. The fume hood gets one luminaire above it, in line with the rest of the row. The luminaire is rated IP20 (open ceiling). The fume hood handles corrosive vapours that escape periodically; over 18 months the luminaire's electronics corrode and it fails the annual test. Replacement costs significant downtime; the lab loses certification."
            doInstead="At the fume hood specifically, specify an IP65 or higher luminaire rated for chemical environments. Mount it for direct illumination of the working plane. Often this means a different product to the rest of the lab ceiling; the cost premium is small and the lifetime is longer. Match luminaire IP / IK / chemical rating to the task environment, not just to the ceiling-mounting convention."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'High-risk task area lighting allows safe shutdown of hazardous processes before evacuation. 15 lx OR 10 % of normal task illuminance, whichever HIGHER (BS EN 1838:2024 §6).',
              'Response time: full rated illuminance within 0.5 s of mains failure — order of magnitude tighter than the 5 s for escape route or anti-panic. LED mandatory.',
              'NEW BS 5266-1:2025 §7.5: at least 2 separate circuits, no more than 20 luminaires per circuit. Single circuit fault must not extinguish all illumination at high-risk task.',
              'Trigger: risk assessment. The competent person identifies specific points where occupants must perform hazardous tasks before evacuating. Lighting design provides 15 lx / 0.5 s / dual-circuit at those points.',
              'Mounting: dedicated task-specific luminaires above or beside the machinery, often integrated into machine guards. Aimed at the working plane (not floor).',
              'Maintained / continuous-operation mode common — eliminates switchover delay risk.',
              'Working plane (where task is performed) is the verification point — typically 0.85 m for standing tasks, 0.5 m for sitting, on equipment surface for machine tools. NOT floor level.',
              'Independent of escape route and anti-panic. High-risk task is in ADDITION to those, not instead of. A high-risk task room has all three categories applied concurrently.',
              'Duration matches building duration (3 h non-domestic default). Not a shorter "shutdown-only" period.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'How is the working plane illuminance verified at commissioning?',
                answer:
                  'Lux meter held at the working plane of the task — typically the bench top, machine table, or fume hood platform, depending on the task. Take readings at the task position(s) where the operator works. Commissioning report records the meter reading at each high-risk task position, plus the time-to-full-output (must be ≤ 0.5 s) and the dual-circuit verification (each circuit independently switched on and off, illumination retained when one is killed). Three separate verifications.',
              },
              {
                question:
                  'Does the dual-circuit rule apply to existing installations from before BS 5266-1:2025?',
                answer:
                  'No, prospectively only. Existing installations remain compliant under the standard in force when commissioned. New installations and major refurbishments after the BS 5266-1:2025 effective date (31 October 2025) must comply with the dual-circuit rule. Best practice is to upgrade existing high-risk task installations at the next major maintenance cycle, particularly where battery / luminaire replacement is being undertaken anyway.',
              },
              {
                question:
                  'Can a single luminaire above a high-risk task meet the dual-circuit rule by being a "dual-supply" product?',
                answer:
                  'No. The dual-circuit rule requires two SEPARATE circuits (each with its own protective device) and the failure mode it defends against is at the circuit level (cable fault, MCB trip, fuse blow). A single luminaire with two internal supplies still goes dark if either circuit fails at the consumer unit level. Implementation requires at least two physically separate luminaires, each on a different circuit, illuminating the same task.',
              },
              {
                question:
                  'Is a "high-risk task" the same as an "Atex zone" or "explosive atmosphere"?',
                answer:
                  'Different concepts that may overlap. Atex zones are about explosive atmospheres (DSEAR / DSEAR-related); high-risk task is about lighting for safe shutdown. A single location can be both (a chemical reactor in a Zone 1 atmosphere is both high-risk task AND Atex). The high-risk task lighting must comply with BS EN 1838 §6 illuminance / response / circuits AND the Atex / IECEx requirements for the zone (IIB / IIC, T-class, IP). Specify Atex-rated emergency luminaires for these locations.',
              },
              {
                question:
                  'My factory has 50 high-risk task locations. Does the 20-luminaire-per-circuit rule mean I need many circuits?',
                answer:
                  'Yes. With dual-circuit redundancy at each task, and ≤ 20 luminaires per circuit, the wiring distribution is more granular than a typical escape route system. A practical approach: group nearby tasks onto pairs of feeders, with each feeder serving up to 20 luminaires across multiple tasks. Plan the circuit topology at design stage; do not retrofit the rule onto an existing single-circuit layout — the consumer unit and feeders both have to be redesigned.',
              },
              {
                question:
                  'What if my high-risk task is normally lit at 50 lx (low-light task)?',
                answer:
                  'Apply the headline minimum: 15 lx. The 10 % of 50 lx (5 lx) is below the 15 lx headline, so 15 lx wins under "whichever higher". Some "high-risk" tasks are deliberately low-light (e.g. photographic darkrooms, certain inspection tasks). The 15 lx emergency floor still applies because the SHUTDOWN requirement is independent of the normal task light level — operators can navigate the equipment and engage emergency stops at 15 lx even if normal operation is darker.',
              },
              {
                question:
                  'Can general escape route luminaires above a high-risk task area double as the high-risk task lighting?',
                answer:
                  'Only if they meet ALL the high-risk task criteria simultaneously: 15 lx (or 10 % of normal) at the working plane, 0.5 s response, dual-circuit, working plane verification. In practice escape-route-grade luminaires (1 lx, 5 s, single-circuit acceptable) usually do not. Treat high-risk task lighting as a separate provision; do not assume general emergency lighting is sufficient.',
              },
              {
                question:
                  'How does this interact with HSE machinery safety guidance and PUWER 1998?',
                answer:
                  'PUWER (Provision and Use of Work Equipment Regulations 1998) requires equipment to have appropriate emergency stop arrangements that include the means to operate them safely. Adequate illumination at the controls is part of "safely". HSE guidance on machinery safety often references emergency lighting as a prerequisite for emergency-stop usability. BS 5266-1:2025 high-risk task provision is the technical means by which this PUWER duty is discharged for emergency-stop scenarios. The two regimes converge at the same physical luminaires.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="High-risk task area lighting — Module 2.3" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/emergency-lighting-module-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 2
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/emergency-lighting-module-2-section-4')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                2.4 Maintained vs non-maintained
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

export default EmergencyLightingModule2Section3;
