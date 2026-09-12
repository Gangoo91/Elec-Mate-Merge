/**
 * MOET · Module 7 · Section 2 · Subsection 3 — Component Replacement and Repair
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option. This section of Module 7 covers technique for the EPA
 * practical observation rather than a specific piece of engineering
 * knowledge, so no ST1426 knowledge/skill/behaviour statement is quoted
 * here — none of the verified KSB statements checked for this conversion
 * describe assessment-preparation technique.
 *
 * Converted onto the study-centre learning kit. Content preserved from the
 * original page; structure, shell and reading measure rebuilt.
 */

import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import {
  StudyPage,
  Bleed,
  ReadingProgress,
  TLDR,
  ConceptBlock,
  CommonMistake,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Component Replacement and Repair - MOET Module 7 Section 2.3';
const DESCRIPTION =
  'Hands-on practice with component replacement and repair techniques for the EPA practical observation: safe removal, correct selection, installation standards and functional verification under ST1426.';

const quickCheckQuestions = [
  {
    id: 'like-for-like',
    question:
      "When replacing an electrical component, why is 'like-for-like' replacement the preferred approach?",
    options: [
      'It ensures the replacement has the same rating, characteristics and compatibility as the original, maintaining system integrity and compliance',
      'It allows you to fit whatever component is in the van, saving a return trip to the wholesaler',
      'It guarantees the replacement will be cheaper than the original component',
      'It removes the need to isolate the circuit before fitting the new component',
    ],
    correctIndex: 0,
    explanation:
      'Like-for-like replacement ensures the new component has identical ratings (voltage, current, breaking capacity), physical dimensions, and operational characteristics. This maintains the original design intent, complies with BS 7671, and avoids introducing compatibility issues. Any deviation requires a full re-assessment of the circuit.',
  },
  {
    id: 'torque-settings',
    question: 'Why are correct torque settings important when terminating conductors?',
    options: [
      'They reduce the time taken to terminate each conductor, improving productivity',
      'They allow a smaller cable size to be used than would otherwise be required',
      'They remove the need to use bootlace ferrules on stranded conductors',
      'Under-tightened connections cause high resistance joints leading to overheating; over-tightened connections damage conductors and terminals',
    ],
    correctIndex: 3,
    explanation:
      'Incorrect torque is a leading cause of electrical fires. Under-torqued connections create high-resistance joints that overheat, while over-torqued connections can damage conductor strands, crack terminal blocks, or strip threads. BS 7671 Regulation 526.1 requires connections to be mechanically and electrically sound. Using a calibrated torque screwdriver demonstrates professionalism.',
  },
  {
    id: 'functional-verification',
    question:
      'After replacing a component, what must you do before returning the system to normal service?',
    options: [
      'Carry out functional verification testing to confirm the repair is successful and the system operates correctly',
      'Dispose of the faulty component immediately so the work area stays tidy',
      'Re-energise the circuit and leave site, as testing is the responsibility of the next shift',
      'Record the part number of the new component and consider the job complete',
    ],
    correctIndex: 0,
    explanation:
      'Functional verification confirms the replacement component works correctly within the system. This includes checking the component operates as intended, measuring key parameters (voltage, current, resistance), testing protective devices, and confirming the fault symptom is resolved. Skipping verification is a common cause of callback failures.',
  },
  {
    id: 'waste-disposal',
    question: 'How should replaced electrical components be disposed of?',
    options: [
      'Placed in the general waste skip on site, as electrical components are classed as inert waste',
      'Returned to the customer so they can decide how to dispose of them',
      'Burned on site to recover the copper content for resale',
      'Segregate according to waste type — WEEE for electronic items, hazardous waste for items containing harmful substances, general waste for inert materials',
    ],
    correctIndex: 3,
    explanation:
      'The Waste Electrical and Electronic Equipment (WEEE) Regulations require proper segregation and disposal. Components containing hazardous substances (capacitors with PCBs, mercury switches, fluorescent tubes) must be treated as hazardous waste. Demonstrating awareness of waste responsibilities shows the assessor you understand environmental compliance.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Before removing a faulty component from a circuit, the first step is to:',
    options: [
      'Photograph and label every conductor connected to the component',
      'Confirm safe isolation of the circuit and verify the circuit is dead',
      'Order the replacement component and check it is in stock',
      'Loosen all the terminal screws to make removal quicker',
    ],
    correctAnswer: 1,
    explanation:
      'Safe isolation must always precede any physical work on the circuit. Confirm isolation, lock off, and prove dead using the prove-test-prove method before touching any conductors or components. This is the foundational safety step assessed in every EPA practical.',
  },
  {
    id: 2,
    question: 'When selecting a replacement MCB, which characteristics must match the original?',
    options: [
      'Only the current rating — the type curve and breaking capacity are interchangeable',
      'The manufacturer brand only, as all 32 A MCBs are otherwise identical',
      'Current rating, type (B, C, or D), number of poles, breaking capacity, and physical compatibility with the board',
      'The colour of the toggle and the position in the board, to keep the layout consistent',
    ],
    correctAnswer: 2,
    explanation:
      'All key characteristics must match: the current rating (e.g., 32 A), the type curve (B for domestic, C for motor loads, D for high inrush), the number of poles, the breaking capacity (e.g., 6 kA), and the physical format compatible with the distribution board. Mismatching any parameter could compromise protection.',
  },
  {
    id: 3,
    question: 'A calibrated torque screwdriver is used to:',
    options: [
      'Measure the current flowing through a terminal connection',
      'Test the insulation resistance of a newly fitted component',
      'Strip insulation from conductors to a precise, repeatable length',
      'Apply the correct, manufacturer-specified tightening force to terminal connections',
    ],
    correctAnswer: 3,
    explanation:
      'A calibrated torque screwdriver applies a precise, repeatable torque to terminal connections as specified by the component manufacturer. This ensures connections are neither under-tightened (risking high-resistance joints) nor over-tightened (risking mechanical damage). It is a key quality tool for professional electrical work.',
  },
  {
    id: 4,
    question: 'When stripping cable insulation for termination, you should:',
    options: [
      'Strip the correct length of insulation without nicking or damaging the conductor strands, using an appropriate stripping tool',
      'Strip as much insulation as possible so the conductor is easy to insert into the terminal',
      'Use a sharp knife at a shallow angle to score and snap the insulation off quickly',
      'Leave a little insulation inside the terminal to cushion the conductor against vibration',
    ],
    correctAnswer: 0,
    explanation:
      'Correct cable preparation is essential for reliable connections. Strip only the length specified by the terminal manufacturer, use a proper cable stripping tool, and avoid nicking or cutting conductor strands (which reduces the current-carrying capacity and creates a weak point). The assessor will closely inspect your cable preparation.',
  },
  {
    id: 5,
    question:
      'After replacing a contactor in a motor starter circuit, functional verification should include:',
    options: [
      'Checking only that the contactor is the same colour and brand as the one removed',
      'Verifying the contactor operates, the motor starts and runs correctly, overload protection functions, and control circuit operates as intended',
      'Confirming the contactor coil resistance matches the value of the removed unit and nothing more',
      "Re-energising the circuit and leaving site, since testing is the next shift's responsibility",
    ],
    correctAnswer: 1,
    explanation:
      'Full functional verification confirms the entire system operates correctly — not just the replaced component. For a motor starter, this means testing the control circuit (start/stop), confirming the contactor pulls in and holds, verifying the motor runs correctly (direction, current draw), and testing protective functions (overload, emergency stop).',
  },
  {
    id: 6,
    question: 'When a like-for-like replacement is not available, you should:',
    options: [
      'Fit the nearest available component regardless of its ratings to restore supply quickly',
      'Fit a component with a lower current rating so the protection operates more sensitively',
      "Consult the manufacturer's data, verify the alternative meets or exceeds all ratings, and document the change",
      'Leave the circuit isolated and out of service until the exact original part is obtained',
    ],
    correctAnswer: 2,
    explanation:
      'If a direct replacement is unavailable, the alternative must meet or exceed all specifications: voltage rating, current rating, breaking capacity, environmental rating (IP), and operational characteristics. The substitution must be documented, and in some cases may require a minor works certificate or design verification. Never fit a component with lower ratings.',
  },
  {
    id: 7,
    question: 'Correct identification of cables during component replacement is important because:',
    options: [
      'It speeds up the job by removing the need to photograph the connections',
      'It allows the use of a smaller replacement component than the original',
      'It is only necessary on three-phase circuits, not single-phase ones',
      'Reconnecting cables incorrectly can cause short circuits, equipment damage, incorrect operation, or safety hazards',
    ],
    correctAnswer: 3,
    explanation:
      'Incorrect reconnection is a serious and common error. Swapped line and neutral connections, reversed motor phases, or cross-connected control circuits can cause equipment damage, safety hazards, or dangerous mis-operation. Label or photograph connections before disconnecting, and verify correct reconnection using circuit diagrams.',
  },
  {
    id: 8,
    question: 'The purpose of a visual inspection after component replacement is to check:',
    options: [
      'Correct installation, secure fixings, proper cable dressing, no damage to adjacent components, and compliance with regulations',
      'Only that the replaced component is the correct colour and brand',
      'That the work has taken no longer than the time allowed on the job sheet',
      'Whether the customer is satisfied with the appearance of the finished work',
    ],
    correctAnswer: 0,
    explanation:
      'A thorough visual inspection after replacement confirms: the component is correctly installed and oriented, all fixings are secure, cables are properly dressed and supported, no damage has occurred to adjacent equipment, and the installation complies with BS 7671. This attention to detail is a distinction-level behaviour.',
  },
  {
    id: 9,
    question: 'When replacing a fuse, the key matching criteria are:',
    options: [
      'The physical colour and the length of the fuse body only',
      'Current rating, voltage rating, type (HRC, rewireable, cartridge), breaking capacity, and category of duty',
      'The current rating alone, since all fuses of the same rating are interchangeable',
      'The brand and the price, choosing the cheapest available equivalent',
    ],
    correctAnswer: 1,
    explanation:
      'Fuse selection must match all critical parameters: current rating (the normal load current), voltage rating (system voltage), type (HRC for high fault levels, cartridge for general use), breaking capacity (must exceed prospective fault current), and category of duty (motor, general, semiconductor). Incorrect fuse selection compromises circuit protection.',
  },
  {
    id: 10,
    question: 'BS 7671 Regulation 526.1 requires that all electrical connections shall:',
    options: [
      'Be soldered in all cases to guarantee a permanent joint',
      'Be made only by a qualified supervisor, never by an apprentice',
      'Provide durable electrical continuity, adequate mechanical strength, and be accessible for inspection',
      'Be concealed within the building fabric to protect them from tampering',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 526.1 sets the standard for all electrical connections: they must provide reliable electrical continuity, have adequate mechanical strength for the application, and (generally) be accessible for inspection, testing and maintenance. This applies to every connection you make during component replacement.',
  },
  {
    id: 11,
    question:
      'During the EPA, demonstrating correct cable management after component replacement means:',
    options: [
      'Coiling any spare cable tightly behind the component to save space in the enclosure',
      'Leaving cables loose so they can be easily moved during future maintenance',
      'Routing power and data cables together in a single bundle for neatness',
      'Neatly dressing, routing and securing cables using appropriate supports, maintaining bending radii, and ensuring no strain on terminations',
    ],
    correctAnswer: 3,
    explanation:
      'Professional cable management shows competence and attention to detail. Cables should be neatly routed, properly supported, not subjected to sharp bends (maintaining minimum bending radii), free from strain at terminations, and segregated where required (e.g., power and data). This workmanship quality is assessed during the EPA.',
  },
  {
    id: 12,
    question:
      'If you discover additional faults during a component replacement, the correct action is to:',
    options: [
      'Report the additional faults to the appropriate person, document them, and only repair them if authorised and within your competence',
      'Repair them all immediately, whether or not they fall within the scope of your authorised work',
      'Ignore them, as they are outside the task you were assigned to complete',
      'Hide them from the customer so the job appears to have gone smoothly',
    ],
    correctAnswer: 0,
    explanation:
      'Reporting additional faults demonstrates professionalism and safety awareness. You should document what you have found, report to your supervisor or the authorised person, and only undertake additional repairs if authorised and within the scope of your competence and any permit to work. In the EPA, explaining this approach to the assessor demonstrates mature professional judgement.',
  },
];

const faqs = [
  {
    question: 'What tools should I have available for component replacement during the EPA?',
    answer:
      'A comprehensive toolkit should include: insulated screwdrivers (flat and Phillips, various sizes), side cutters, long-nose pliers, cable strippers, a calibrated torque screwdriver, a voltage indicator (GS38 compliant), a multimeter, appropriate PPE, cable markers/labels, and a notebook. Check with your training provider what will be provided at the assessment venue and what you need to bring yourself.',
  },
  {
    question: 'How do I handle components I am not familiar with during the EPA?',
    answer:
      "Read the manufacturer's data sheet or label carefully — it contains the key information you need (ratings, wiring diagram, terminal identification). Explain to the assessor that you are reviewing the manufacturer's information before proceeding. This demonstrates the professional approach of always checking data rather than guessing, which is valued more highly than pretending to know everything.",
  },
  {
    question: 'Is soldering expected during the EPA practical observation?',
    answer:
      'Soldering is unlikely to be required in the standard EPA for the MOET pathway, as most modern electrical connections use screw, spring, or crimp terminations. However, you should be familiar with soldering techniques in case they are needed for specific control system repairs. Crimping competence is more commonly assessed.',
  },
  {
    question: 'What if the replacement component does not fit exactly?',
    answer:
      'If a component does not fit correctly, do not force it. Check you have the correct replacement by comparing part numbers, ratings, and dimensions. If the replacement is verified as correct but requires minor adaptation (e.g., a different mounting pattern), explain your approach to the assessor and only proceed if the modification maintains safety and compliance. Forcing an incorrect component can cause damage and is a fail point.',
  },
  {
    question: 'How important is tidiness during the practical observation?',
    answer:
      'Very important. Keeping your work area tidy, tools organised, and waste materials cleared demonstrates professionalism and safety awareness. A cluttered work area increases the risk of accidents and slows your work. The assessor will note your housekeeping as part of the overall professional behaviours assessment.',
  },
];

const MOETModule7Section2_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 7 · Section 7.2 · Subsection 3"
        title="Component Replacement and Repair"
        backTo="/study-centre/apprentice/m-o-e-t-module7-section2"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Hands-on practice with safe component removal, correct selection and professional
            installation techniques.
          </p>

          <TLDR
            points={[
              'Safe removal: isolate, label, photograph, disconnect.',
              'Selection: like-for-like matching on all key ratings.',
              'Installation: correct torque, cable prep, dressing.',
              'Verification: functional testing before returning to service.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Safely remove faulty components following isolation and documentation procedures',
              'Select correct replacement components by matching all critical ratings and specifications',
              'Prepare cables and conductors to professional standards using appropriate tools',
              'Apply correct torque settings and termination techniques for reliable connections',
              'Carry out functional verification testing after component replacement',
              'Demonstrate professional workmanship and cable management to EPA standard',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock title="EPA assessment context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Workmanship:</strong> assessed on quality, not just completion.
              </li>
              <li>
                <strong>BS 7671:</strong> Reg 526.1 — connection standards.
              </li>
              <li>
                <strong>Documentation:</strong> record what you replaced and why.
              </li>
              <li>
                <strong>ST1426:</strong> practical maintenance competence.
              </li>
            </ul>
          </ConceptBlock>

          <ContentEyebrow>Safe component removal procedure</ContentEyebrow>

          <ConceptBlock title="Safe component removal procedure">
            <p>
              Before any component can be replaced, it must be safely removed. This is not simply a
              matter of disconnecting wires — it requires a methodical approach that ensures safety,
              preserves evidence of the fault, and sets up the reinstallation for success. During
              the EPA practical observation, the assessor will evaluate your entire removal process,
              not just the end result.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Step-by-step component removal">
            <ol className="list-decimal space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Confirm safe isolation:</strong> verify the circuit is isolated, locked off,
                and proved dead using the prove-test-prove method.
              </li>
              <li>
                <strong>Review the circuit diagram:</strong> understand the component&apos;s role in
                the circuit and identify all connections.
              </li>
              <li>
                <strong>Photograph and label:</strong> take photographs of the existing wiring
                arrangement and label each conductor with its terminal reference before
                disconnecting.
              </li>
              <li>
                <strong>Disconnect carefully:</strong> release terminal screws without damaging
                conductors; note any signs of overheating, arcing or damage.
              </li>
              <li>
                <strong>Remove the component:</strong> undo fixings and remove the component, noting
                its orientation and mounting method.
              </li>
              <li>
                <strong>Inspect the removed component:</strong> examine for the failure mode — burn
                marks, mechanical damage, loose internal connections.
              </li>
              <li>
                <strong>Preserve as evidence:</strong> keep the faulty component for inspection and
                warranty purposes.
              </li>
            </ol>
          </ConceptBlock>

          <CommonMistake
            title="Common removal errors"
            whatHappens={
              <>
                Failing to label conductors before disconnection is the most common error during
                component replacement. In a complex control panel with multiple identically coloured
                conductors, reconnecting without labels becomes guesswork. Under assessment
                pressure, what seemed obvious can quickly become confusing.
              </>
            }
            doInstead={
              <>Always label before disconnecting — even if the connections seem obvious.</>
            }
          />

          <p className="text-[14.5px] leading-relaxed text-white">
            <strong>Key point:</strong> the removal phase reveals information about the fault cause.
            Burn marks on terminals suggest high-resistance joints; mechanical damage suggests
            environmental or installation issues. Reporting these observations to the assessor
            demonstrates diagnostic awareness beyond simple replacement.
          </p>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Component selection and specification matching</ContentEyebrow>

          <ConceptBlock title="Component selection and specification matching">
            <p>
              Correct component selection is critical for maintaining circuit protection, system
              performance, and regulatory compliance. The assessor will observe whether you verify
              the replacement component&apos;s specifications match the original — or whether you
              simply fit whatever is available. This distinction separates competent technicians
              from those who create future problems.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Key specifications to match">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Component</th>
                    <th className="py-2 pr-4 font-medium text-white">Critical ratings</th>
                    <th className="py-2 font-medium text-white">Additional checks</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">MCB</td>
                    <td className="py-2 pr-4">
                      Current, type curve (B/C/D), breaking capacity, poles
                    </td>
                    <td className="py-2">Physical compatibility with board, BS EN 60898</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Contactor</td>
                    <td className="py-2 pr-4">Coil voltage, contact rating, AC category</td>
                    <td className="py-2">Auxiliary contacts, mounting, DIN rail fit</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">RCD/RCBO</td>
                    <td className="py-2 pr-4">Current rating, sensitivity (mA), type (AC/A/B)</td>
                    <td className="py-2">Breaking capacity, time delay, board compatibility</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Fuse</td>
                    <td className="py-2 pr-4">
                      Current, voltage, type (HRC/cartridge), breaking capacity
                    </td>
                    <td className="py-2">Physical size, category of duty, BS 88 reference</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Relay/Timer</td>
                    <td className="py-2 pr-4">
                      Coil voltage, contact configuration, contact rating
                    </td>
                    <td className="py-2">Base compatibility, timing range, function</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Reading manufacturer data">
            <p>
              Always read the data printed on the component itself and cross-reference with the
              manufacturer&apos;s data sheet. Do not rely on the packaging alone — check the
              markings on the device. In the EPA, telling the assessor &quot;I am checking the
              component markings match the required specification&quot; demonstrates professional
              practice.
            </p>
            <p>
              <strong>Key point:</strong> if you are unsure about a specification, explain to the
              assessor that you would consult the manufacturer&apos;s technical data or seek
              guidance from a senior colleague. Admitting uncertainty is a professional strength,
              not a weakness.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Cable preparation and termination techniques</ContentEyebrow>

          <ConceptBlock title="Cable preparation and termination techniques">
            <p>
              The quality of your cable preparation and termination directly affects the reliability
              and safety of the installation. Poor terminations are the most common cause of
              electrical fires in the UK. During the EPA, the assessor will closely inspect your
              connection work — this is where workmanship quality is most visible.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Cable preparation best practice">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Strip length:</strong> match the terminal depth — enough conductor inserted
                for full contact, no excess exposed.
              </li>
              <li>
                <strong>Stripping tool:</strong> use an adjustable cable stripper set to the correct
                conductor size — avoid nicking strands.
              </li>
              <li>
                <strong>Conductor condition:</strong> inspect stripped conductors for damage — no
                nicked, cut, or missing strands.
              </li>
              <li>
                <strong>Ferrules:</strong> use bootlace ferrules on stranded conductors entering
                screw terminals to prevent strand escape.
              </li>
              <li>
                <strong>Orientation:</strong> insert the conductor so the screw clamps down on the
                conductor, not pushes it out.
              </li>
              <li>
                <strong>Insulation clearance:</strong> ensure insulation does not enter the terminal
                and conductor does not protrude excessively.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Torque settings for common terminals">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Terminal type</th>
                    <th className="py-2 pr-4 font-medium text-white">Typical torque (Nm)</th>
                    <th className="py-2 font-medium text-white">Notes</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">MCB/RCBO terminal</td>
                    <td className="py-2 pr-4">2.0 - 3.5</td>
                    <td className="py-2">Check manufacturer&apos;s data for exact value</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Distribution board busbar</td>
                    <td className="py-2 pr-4">2.5 - 5.0</td>
                    <td className="py-2">Varies with conductor size</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Socket outlet terminal</td>
                    <td className="py-2 pr-4">1.2 - 1.5</td>
                    <td className="py-2">Smaller screws — easy to over-tighten</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">DIN rail terminal block</td>
                    <td className="py-2 pr-4">0.5 - 1.2</td>
                    <td className="py-2">Often spring-cage — no torque needed</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              <strong>Key point:</strong> if you use a torque screwdriver during the EPA and explain
              why, this demonstrates a level of professionalism that distinguishes you from
              candidates who simply tighten by feel. It is a clear indicator of distinction-level
              practice.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Functional verification and return to service</ContentEyebrow>

          <ConceptBlock title="Functional verification and return to service">
            <p>
              Replacing the component is only part of the job. Functional verification — confirming
              the system works correctly after repair — is the final and often most overlooked step.
              In the EPA, candidates who skip verification or perform it inadequately are marked
              down significantly. A professional technician never hands back a system without
              confirming it works.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Verification checklist">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Visual inspection:</strong> check all connections, fixings, cable dressing,
                and no damage to adjacent equipment.
              </li>
              <li>
                <strong>Continuity:</strong> verify circuit continuity through the new component
                before re-energising.
              </li>
              <li>
                <strong>Insulation resistance:</strong> confirm IR values are satisfactory (above 1
                M ohm for LV circuits).
              </li>
              <li>
                <strong>Re-energise under control:</strong> remove locks, re-energise the circuit in
                a controlled manner, observing for any issues.
              </li>
              <li>
                <strong>Functional test:</strong> operate the system through its full range of
                functions — start, stop, forward, reverse, trip, reset.
              </li>
              <li>
                <strong>Measure key parameters:</strong> voltage at the component, current draw
                under load, operating temperatures.
              </li>
              <li>
                <strong>Protective device test:</strong> confirm RCDs, overloads and emergency stops
                function correctly.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Documentation after replacement"
            onSite="Component replacement and repair is a core practical competence in the Maintenance and Operations Engineering Technician standard. The EPA practical observation will include at least one component replacement task, assessed on safety, workmanship, verification and documentation."
          >
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Record the replacement:</strong> component removed, component fitted, part
                numbers, ratings.
              </li>
              <li>
                <strong>Test results:</strong> IR readings, continuity, functional test outcomes.
              </li>
              <li>
                <strong>Root cause:</strong> if identified, note the probable cause of the original
                failure.
              </li>
              <li>
                <strong>Recommendations:</strong> any follow-up work, monitoring or preventive
                actions.
              </li>
              <li>
                <strong>Sign-off:</strong> confirm the system has been returned to safe, normal
                operation.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Always label conductors before disconnecting, however obvious the wiring looks.',
              'Match every critical rating on a replacement — current, type, breaking capacity, physical fit — never just "close enough".',
              'Correct torque is a safety issue: under-tightened joints overheat, over-tightened ones damage conductors and terminals.',
              'Functional verification is not optional — confirm the system actually works before returning it to service.',
              'Report additional faults you find rather than fixing everything or ignoring what is outside your scope.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz title="Test Your Knowledge — Component Replacement" questions={quizQuestions} />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module7-section2-2')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Fault Diagnosis Exercises
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module7-section2-4')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Control System Troubleshooting
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule7Section2_3;
