/**
 * MOET · Module 3 · Section 3.2 · Subsection 2 — Direct-On-Line (DOL) Starters
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option. NOT ST0154 (the "MOET" the course is named after) —
 * ST0154 v1.6 is still live, but its own EPA plan records that the Electrical
 * Technician option "was retired 31/12/2025" and was replaced by ST1426
 * (single discipline) or ST1443 (dual discipline). The course keeps the MOET
 * name because that is what employers and colleges still call the role.
 *
 * KSBs covered, quoted rather than numbered — the published K/S/B
 * numbering is unverified, so never write a code here:
 *   · "Electrical. Principles of single phase and three-phase equipment,
 *     plant, and systems, the operation of motors and generators, and the
 *     use of monitoring and protection equipment."
 *   · "Electrical. Electrical plant, equipment, and systems maintenance
 *     requirements: removing and replacing parts, inspecting, testing,
 *     setting up, adjusting, cleaning, and functional testing."
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

const TITLE = 'Direct-On-Line (DOL) Starters - MOET Module 3 Section 2.2';
const DESCRIPTION =
  'Comprehensive guide to DOL motor starters for electrical maintenance technicians: contactor construction and operation, overload relay types, control circuit wiring, interlocking methods, starter sizing and common fault diagnosis under ST1426.';

const quickCheckQuestions = [
  {
    id: 'ac3-rating',
    question: 'What utilisation category is standard for motor starting and stopping contactors?',
    options: ['AC-3', 'AC-2', 'AC-1', 'AC-4'],
    correctIndex: 0,
    explanation:
      'AC-3 is the standard utilisation category for starting and stopping squirrel-cage motors under normal conditions. It accounts for the high inrush current during starting (6-8 times FLC) and the lower current at breaking (motor running at speed). AC-4 is for more demanding applications such as inching (jogging) and reversing, where the contactor must break full locked-rotor current.',
  },
  {
    id: 'trip-class',
    question: 'What trip class is standard for most motor overload relay applications?',
    options: ['Class 30', 'Class 20', 'Class 5', 'Class 10'],
    correctIndex: 3,
    explanation:
      'Class 10 is the standard trip class for most motor applications. It defines the maximum time the relay allows the motor to draw 7.2 times full-load current before tripping: 10 seconds. Higher classes (20, 30) are used for high-inertia loads that require extended acceleration times.',
  },
  {
    id: 'no-volt-release',
    question:
      'What safety feature prevents a motor from restarting automatically after a power failure?',
    options: [
      'The thermal overload relay resetting itself',
      'A phase-sequence relay locking out the supply',
      'No-volt release (contactor drop-out)',
      'A time-delay timer in the control circuit',
    ],
    correctIndex: 2,
    explanation:
      'No-volt release is the inherent safety feature of a contactor-based starter. When the supply fails, the contactor coil de-energises and the contactor drops out (opens). When power returns, the contactor remains open and the motor must be manually restarted by pressing the START button. This prevents unexpected motor operation.',
  },
  {
    id: 'contact-welding',
    question:
      'What is the most likely cause if a motor continues to run even when the stop button is pressed?',
    options: [
      'A faulty (open-circuit) start push-button',
      'A tripped overload relay',
      'Contact welding on the main contactor',
      'An undersized control-circuit fuse',
    ],
    correctIndex: 2,
    explanation:
      'Contact welding occurs when the main contacts fuse together due to excessive arcing, too many starts per hour, or undersized contacts. The motor continues to run regardless of the control circuit state because the power contacts cannot open. This is a serious safety issue requiring immediate isolation and contactor replacement.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the typical starting current for a DOL-started motor?',
    options: ['1 to 2 times FLC', '6 to 8 times FLC', '3 to 4 times FLC', '12 to 15 times FLC'],
    correctAnswer: 1,
    explanation:
      'DOL starting connects the motor directly to full voltage, drawing 6 to 8 times the full-load current during starting. This high starting current is why DOL is typically limited to smaller motors.',
  },
  {
    id: 2,
    question: 'What utilisation category is standard for motor starting contactors?',
    options: ['AC-4', 'AC-1', 'AC-3', 'AC-2'],
    correctAnswer: 2,
    explanation:
      'AC-3 is the standard for starting and stopping squirrel-cage motors. AC-1 is for non-inductive loads, AC-2 for slip-ring motors, AC-4 for inching and reversing.',
  },
  {
    id: 3,
    question: 'What does a thermal overload relay use to detect overcurrent?',
    options: ['Hall effect sensors', 'Current transformers', 'Fuses', 'Bimetallic strips'],
    correctAnswer: 3,
    explanation:
      'Thermal overloads use bimetallic strips (one per phase) that heat and bend when current flows through them. When the bending exceeds a set threshold, the trip mechanism is activated.',
  },
  {
    id: 4,
    question: 'What is the standard trip class for most motor applications?',
    options: ['Class 10', 'Class 5', 'Class 20', 'Class 30'],
    correctAnswer: 0,
    explanation:
      'Class 10 allows up to 10 seconds at 7.2 times FLC during starting. It is suitable for most normal-duty applications with standard inertia loads.',
  },
  {
    id: 5,
    question: 'What is the purpose of the holding (seal-in) contact in a DOL control circuit?',
    options: [
      'To break the coil circuit the moment the start button is released',
      'To keep the coil energised after the start button is released',
      'To limit the motor inrush current during direct-on-line starting',
      'To open the circuit automatically if the overload relay trips',
    ],
    correctAnswer: 1,
    explanation:
      "The holding contact is an auxiliary NO contact that closes when the contactor operates, maintaining the coil circuit after the momentary start button is released. This creates the 'latch' or 'seal-in' that keeps the motor running.",
  },
  {
    id: 6,
    question: 'What safety feature prevents automatic restart after power failure?',
    options: ['Overload relay', 'Phase sequence relay', 'No-volt release', 'Timer'],
    correctAnswer: 2,
    explanation:
      'No-volt release causes the contactor to drop out when power fails. Manual restart is required when power returns, preventing unexpected motor operation.',
  },
  {
    id: 7,
    question: 'What causes contactor chattering or buzzing?',
    options: [
      'An oversized main contactor for the motor',
      'Excessive supply voltage to the power circuit',
      'A blocked arc chute above the main contacts',
      'Low coil voltage or broken shading ring',
    ],
    correctAnswer: 3,
    explanation:
      'Chattering is caused by low coil voltage, broken shading rings on AC coils, or contamination on magnet faces. The shading ring is a copper band that maintains holding force during AC zero-crossings.',
  },
  {
    id: 8,
    question: 'Why must forward/reverse interlocking use BOTH electrical and mechanical methods?',
    options: [
      'Because electrical interlocking alone can fail if a contact welds',
      'Because mechanical interlocking is not permitted by BS 7671',
      'Because each contactor needs its own separate control transformer',
      'Because reversing a motor requires swapping all three supply phases',
    ],
    correctAnswer: 0,
    explanation:
      'Electrical interlocking can fail if an auxiliary contact welds. Mechanical interlocking provides a physical backup that prevents both contactors closing simultaneously regardless of electrical faults.',
  },
  {
    id: 9,
    question: 'What happens if the overload relay is set significantly above the motor FLC?',
    options: [
      'The motor will trip out instantly on every start attempt',
      'Motor protection is reduced, risking winding damage',
      'The contactor coil will overheat and fail prematurely',
      'The motor starting current is increased above 8 times FLC',
    ],
    correctAnswer: 1,
    explanation:
      'Setting the overload above FLC removes proper thermal protection, allowing the motor to overheat and potentially damaging the windings. Always set the overload to the nameplate FLC.',
  },
  {
    id: 10,
    question:
      'What is the most likely cause of a motor that will not stop when the stop button is pressed?',
    options: ['Blown coil', 'Broken start button', 'Welded main contacts', 'Open overload relay'],
    correctAnswer: 2,
    explanation:
      'Welded contacts prevent the contactor from opening. The motor continues to run regardless of the control circuit. The contactor must be replaced.',
  },
  {
    id: 11,
    question: 'What causes main contact welding on a contactor?',
    options: [
      'A coil rated for too high a voltage',
      'Over-tightened terminal connections',
      'An overload relay set below the motor FLC',
      'Excessive starting duty or undersized contacts',
    ],
    correctAnswer: 3,
    explanation:
      'Excessive starting current, too many starts per hour (exceeding the duty cycle), or undersized contacts can cause the contacts to fuse together (weld). Always select the correct AC-3 rated contactor.',
  },
  {
    id: 12,
    question: 'What information determines the minimum contactor size for a DOL starter?',
    options: [
      'Motor full-load current and AC-3 duty rating',
      'The length of the supply cable run to the motor',
      'The colour coding of the control-circuit conductors',
      'The number of auxiliary contacts fitted to the contactor',
    ],
    correctAnswer: 0,
    explanation:
      'The contactor must have an AC-3 rating equal to or greater than the motor FLC, and must be suitable for the expected number of operations per hour and the supply voltage.',
  },
];

const faqs = [
  {
    question: 'What is the maximum motor size for DOL starting?',
    answer:
      'There is no absolute maximum, but supply capacity and voltage drop are the limiting factors. In most commercial installations, DOL starting is typically limited to motors up to about 7.5 kW. The DNO or supply authority may impose limits on the maximum starting current that can be drawn. For larger motors or weak supplies, reduced-voltage starting methods (star-delta, soft starters, VSDs) are used.',
  },
  {
    question: 'Why use both electrical and mechanical interlocking?',
    answer:
      'Electrical interlocking can fail if an auxiliary contact welds shut. Mechanical interlocking physically prevents both contactors from closing simultaneously, regardless of electrical faults. Using both methods provides redundant safety -- if one method fails, the other still prevents a phase-to-phase short circuit. This is mandatory for forward/reverse and any other mutually exclusive contactor arrangements.',
  },
  {
    question: 'What should the overload relay be set to?',
    answer:
      "The overload relay should be set to the motor's full-load current (FLC) as shown on the motor nameplate. Never set it higher to prevent nuisance tripping -- this removes the motor's thermal protection and risks winding damage from overheating. If the overload trips repeatedly, investigate the cause (mechanical overload, single-phasing, supply issues) rather than increasing the setting.",
  },
  {
    question: 'What is a shading ring and why does it matter?',
    answer:
      'A shading ring is a copper band fitted to the face of an AC contactor magnet. It creates a phase-shifted magnetic field component that maintains the holding force during the AC cycle zero-crossings, preventing the armature from chattering (vibrating at 100 Hz). A broken shading ring causes continuous buzzing, which leads to coil overheating and eventual failure.',
  },
  {
    question: 'How do I know if a contactor needs replacing?',
    answer:
      "Replace a contactor when: the main contacts are welded or show erosion beyond the manufacturer's wear limit; the coil is burnt or mechanically seized; the armature faces are pitted or contaminated and cannot be cleaned; auxiliary contacts show inconsistent operation; or the contactor has exceeded its rated number of electrical operations. During PPM, inspect contact condition and check for signs of overheating.",
  },
];

const MOETModule3Section2_2 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 3 · Section 3.2 · Subsection 2"
        title="Direct-On-Line (DOL) Starters"
        backTo="/study-centre/apprentice/m-o-e-t-module3-section2"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Contactor operation, overload relays, control circuits, interlocking, sizing and common
            faults.
          </p>

          <TLDR
            points={[
              'DOL: Full voltage applied directly, 6-8x FLC inrush.',
              'Contactor: Electromagnetic switch, AC-3 rated for motors.',
              'Overload: Bimetallic or electronic, set to nameplate FLC.',
              'No-volt release: Prevents automatic restart after power loss.',
            ]}
          />

          <ConceptBlock title="Why this matters">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Most common motor starting method in industry.</li>
              <li>Core maintenance and troubleshooting competency.</li>
              <li>Contact condition assessment during PPM.</li>
              <li>Safety-critical: interlocking prevents short circuits.</li>
            </ul>
          </ConceptBlock>

          <LearningOutcomes
            outcomes={[
              'Describe the construction and operation of a power contactor',
              'Explain the function and types of overload relays used in DOL starters',
              'Draw and interpret a basic DOL starter control circuit',
              'Describe interlocking methods for motor control circuits',
              'Size a DOL starter for a given motor application',
              'Diagnose common DOL starter faults including coil failure and contact welding',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>DOL starter principles and components</ContentEyebrow>

          <ConceptBlock title="The simplest and most widely used starting method">
            <p>
              The Direct-On-Line (DOL) starter is the simplest and most widely used method of
              starting a three-phase induction motor. It connects the motor directly to the full
              supply voltage in a single operation. The starting current is typically 6 to 8 times
              the full-load current (FLC), and the starting torque is the motor's full locked-rotor
              torque.
            </p>
            <p>
              DOL starting is suitable for motors up to approximately 7.5 kW in most commercial
              installations, though this depends on supply capacity and voltage drop constraints.
              For larger motors, reduced-voltage starting methods (star-delta, soft starters, VSDs)
              are used to limit the starting current and its effects on the supply network.
            </p>
            <p>
              A DOL starter consists of three main components: an isolator (for safe isolation
              during maintenance), a contactor (the main switching element that connects and
              disconnects the motor), and an overload relay (which protects the motor from sustained
              overcurrent).
            </p>
          </ConceptBlock>

          <ConceptBlock title="1.1 The power contactor">
            <p>
              The contactor is an electrically operated switch controlled by an electromagnetic
              coil. When the coil is energised (typically at 230 V AC or 24 V AC/DC), it creates a
              magnetic field that pulls the armature in, closing the three main power contacts and
              any auxiliary contacts. When the coil is de-energised, springs return the armature and
              contacts to the open (OFF) position. This spring-return mechanism is the basis of the
              "no-volt release" safety feature.
            </p>
            <p>
              Contactors are rated by utilisation category under IEC 60947-4-1. For motor starting,
              AC-3 is the standard rating, meaning the contactor can start and stop motors under
              normal running conditions. AC-4 is used for inching (jogging) and reversing
              applications where the contacts must break full motor current at full voltage -- a
              significantly more demanding duty.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Main Contacts:</strong> Three sets of normally open (NO) contacts that carry
                the motor power current. Made from silver-alloy material for low contact resistance
                and long electrical life. Rated for many thousands of operations at AC-3 duty.
              </li>
              <li>
                <strong>Auxiliary Contacts:</strong> Additional contacts (NO and NC) used in the
                control circuit for holding, interlocking and status indication. Typically rated at
                10 A. Can be supplemented by adding auxiliary contact blocks.
              </li>
              <li>
                <strong>Coil:</strong> The electromagnetic coil that operates the contactor
                mechanism. Available in various voltages (24 V DC, 110 V AC, 230 V AC, 400 V AC). DC
                coils are quieter and do not require shading rings.
              </li>
              <li>
                <strong>Arc Chutes:</strong> Chambers above the main contacts that help extinguish
                the arc formed when contacts open under load. They split the arc into smaller
                segments, cooling and deionising it rapidly.
              </li>
              <li>
                <strong>Shading Ring:</strong> A copper band on AC coil magnetic faces that creates
                a phase-shifted flux component, preventing armature chatter at twice the supply
                frequency (100 Hz).
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Overload relay types</ContentEyebrow>

          <ConceptBlock title="Protecting the motor from sustained overcurrent">
            <p>
              The overload relay protects the motor from sustained overcurrent that would cause
              overheating and winding insulation damage. It monitors the motor current and trips the
              contactor coil circuit if the current exceeds the set value for a defined time period.
              Unlike a fuse or circuit breaker, the overload relay is designed to protect against
              overload, not short circuit.
            </p>
          </ConceptBlock>

          <ConceptBlock title="2.1 Thermal overload relays">
            <p>
              Thermal overload relays use bimetallic strips (one per phase) that heat and bend when
              current flows through them. When the current exceeds the set value for long enough,
              the bimetallic strip bends sufficiently to trigger the trip mechanism, opening a
              normally closed (NC) contact in the contactor coil circuit.
            </p>
            <p>
              The current setting is adjustable (typically from 70% to 100% of the relay's maximum
              rated current). The relay should be set to the motor's full-load current as shown on
              the nameplate. Thermal overloads have an inherent inverse time characteristic -- they
              take longer to trip at lower overloads, which naturally matches the motor's thermal
              behaviour.
            </p>
          </ConceptBlock>

          <ConceptBlock title="2.2 Electronic overload relays">
            <p>
              Electronic overloads use current transformers to measure the motor current and a
              microprocessor to calculate the thermal state of the motor using a mathematical model.
              They offer several advantages over thermal types:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>More accurate and repeatable trip characteristics</li>
              <li>Wider adjustment range</li>
              <li>Phase loss detection (single-phasing protection)</li>
              <li>Phase imbalance detection</li>
              <li>Ground fault detection (some models)</li>
              <li>Programmable trip classes (Class 5, 10, 20, 30)</li>
              <li>Communication interfaces for integration with building management systems</li>
            </ul>
            <p>
              Trip class defines the maximum time the relay allows the motor to draw 7.2 times FLC
              before tripping. Class 10 (10 seconds) is standard for most applications. Class 20 or
              30 is used for high-inertia loads such as large fans or centrifugal compressors that
              take longer to accelerate to full speed.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>DOL control circuit and interlocking</ContentEyebrow>

          <ConceptBlock title="The low-power circuit that controls the contactor coil">
            <p>
              The control circuit is the low-power circuit that controls the contactor coil.
              Understanding control circuit operation is essential for troubleshooting motor
              starters. A basic DOL control circuit includes:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                A <strong>stop push-button</strong> (momentary NC contact -- normally closed)
              </li>
              <li>
                A <strong>start push-button</strong> (momentary NO contact -- normally open)
              </li>
              <li>
                The <strong>contactor coil</strong>
              </li>
              <li>
                A <strong>holding contact</strong> (auxiliary NO contact on the contactor)
              </li>
              <li>
                The <strong>overload relay NC contact</strong>
              </li>
              <li>
                Any <strong>interlock contacts</strong> from other equipment
              </li>
            </ul>
            <p>
              When the START button is pressed, current flows through the stop button (NC, so
              normally closed and passing current), through the start button (now pressed closed),
              through the overload relay contact (NC, normally closed), and energises the contactor
              coil. The contactor closes its main contacts (starting the motor) and simultaneously
              closes the auxiliary holding contact. When the START button is released, current
              continues to flow through the holding contact, keeping the coil energised -- this is
              the "latch" or "seal-in" circuit.
            </p>
            <p>
              The motor stops when: the STOP button is pressed (breaks the coil circuit directly);
              the overload relay trips (opens the NC overload contact); or the supply fails (the
              contactor de-energises and drops out). The last point is the "no-volt release" safety
              feature -- the motor must be manually restarted when power returns.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="3.1 Interlocking"
            onSite="Both electrical AND mechanical interlocking must be used together. Electrical interlocking alone can fail if a contact welds. Mechanical interlocking alone does not prevent both coils from being energised simultaneously (which could damage the interlock mechanism)."
          >
            <p>
              Interlocking prevents two mutually exclusive operations from occurring simultaneously.
              In motor control, the most critical interlocking application is forward/reverse
              control, which uses two contactors to reverse two of the three supply phases to the
              motor. If both contactors closed simultaneously, a phase-to-phase short circuit would
              occur.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Electrical Interlocking:</strong> The NC auxiliary contact of each contactor
                is wired in series with the opposing coil. When the forward contactor is energised,
                its NC contact opens and prevents the reverse coil from being energised, and vice
                versa.
              </li>
              <li>
                <strong>Mechanical Interlocking:</strong> A physical linkage between the two
                contactors prevents both armatures from closing simultaneously. This provides backup
                protection if an electrical interlock contact welds.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Sizing, selection and installation</ContentEyebrow>

          <ConceptBlock title="Factors to consider when sizing a DOL starter">
            <p>
              When sizing a DOL starter, the following factors must be considered to ensure correct
              operation and adequate motor protection:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Motor full-load current:</strong> Determines the minimum contactor AC-3
                rating and overload relay range
              </li>
              <li>
                <strong>Starting current:</strong> Typically 6-8 times FLC -- affects the
                contactor's switching capacity and the isolator rating
              </li>
              <li>
                <strong>Supply voltage:</strong> 400 V three-phase for power circuit; control
                voltage as specified (typically 230 V AC or 24 V DC)
              </li>
              <li>
                <strong>Duty cycle:</strong> Number of starts per hour and continuous/intermittent
                operation -- affects contactor and overload selection
              </li>
              <li>
                <strong>Ambient temperature:</strong> High temperatures reduce thermal overload
                capability -- derating may be required
              </li>
              <li>
                <strong>Coordination type:</strong> Type 1 (starter may be damaged during short
                circuit but must not be a safety hazard) or Type 2 (starter must remain fully
                operational after short circuit clearing)
              </li>
            </ul>
            <p>
              As a general rule: select a contactor with an AC-3 rating equal to or greater than the
              motor FLC; choose an overload relay with an adjustable range that includes the motor
              FLC; and select an isolator rated for the full motor starting current. The upstream
              short-circuit protective device (MCCB or fuses) must be coordinated with the starter
              to provide both short-circuit and overload protection.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Common faults and troubleshooting</ContentEyebrow>

          <ConceptBlock title="A systematic approach prevents wasted time and missed diagnoses">
            <p>
              Fault diagnosis of DOL starters is a core competency for maintenance technicians. A
              systematic approach -- checking supply, control circuit, contactor and overload in
              sequence -- prevents wasted time and missed diagnoses.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Contact welding"
            whatHappens={
              <>
                Main contacts fuse together so the motor cannot be stopped. This is a serious safety
                issue. The motor continues to run even when the stop button is pressed. Caused by
                excessive starting current, too many starts per hour, or undersized contacts.
              </>
            }
            doInstead={<>The contactor must be replaced immediately.</>}
          />

          <ConceptBlock title="Other common faults">
            <ul className="list-disc space-y-2 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Coil Failure:</strong> The contactor does not close when the start button is
                pressed. Check coil voltage with a multimeter. A burnt coil may have a visibly
                damaged bobbin or a burning smell. Replace the coil (or the entire contactor if the
                magnetic core is damaged). Coil failure is caused by overvoltage, undervoltage (coil
                chatters, overheats and fails), or mechanical seizure of the armature.
              </li>
              <li>
                <strong>Overload Tripping:</strong> The overload relay trips repeatedly. Check the
                current setting matches the motor nameplate FLC. Check for mechanical overload on
                the driven equipment. Check for single-phasing (loss of one supply phase). Check for
                low supply voltage (motor draws more current to maintain torque).
              </li>
              <li>
                <strong>Chattering/Buzzing:</strong> The contactor armature vibrates rapidly at
                twice supply frequency, producing an audible buzz. Caused by low coil voltage, a
                broken shading ring on AC coils, or contamination on the magnet faces. Clean the
                magnet faces with a lint-free cloth or replace the contactor.
              </li>
              <li>
                <strong>Contact Erosion:</strong> Main contacts become pitted and eroded over time
                due to arcing during switching. This increases contact resistance, causing
                overheating at the contacts. Replace the contact set or the entire contactor when
                erosion exceeds the manufacturer's wear limits (indicated by wear markers on many
                modern contactors).
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Contactor utilisation categories: AC-1 = non-inductive/resistive loads, AC-2 = slip-ring motor starting, AC-3 = squirrel-cage motor starting, AC-4 = inching/jogging/reversing.',
              'Trip classes: Class 5 = 5 seconds at 7.2x FLC, Class 10 = 10 seconds (standard), Class 20 = 20 seconds (high inertia), Class 30 = 30 seconds (very high inertia).',
              'DOL starter components: isolator (safe isolation), contactor (switching element), overload relay (motor protection), control circuit (start/stop/hold).',
              'Fault indicators: will not start = coil/control circuit; will not stop = welded contacts; buzzing = shading ring/low voltage; repeated trips = overload/single-phase.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz title="Test Your Knowledge" questions={quizQuestions} />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module3-section2')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Prev subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Motor Construction
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module3-section2-3')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Star-Delta Starters
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule3Section2_2;
