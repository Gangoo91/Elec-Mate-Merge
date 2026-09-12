/**
 * MOET · Module 3 · Section 3.2 · Subsection 3 — Star-Delta Starters
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
  VideoCard,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Star-Delta Starters - MOET Module 3 Section 2.3';
const DESCRIPTION =
  'Comprehensive guide to star-delta motor starting for electrical maintenance technicians: starting current reduction principles, open and closed transition methods, timer settings, winding connections, contactor arrangements, limitations and troubleshooting under ST1426.';

const quickCheckQuestions = [
  {
    id: 'current-reduction',
    question: 'By what factor is the starting current reduced in star compared to DOL?',
    options: ['Two-thirds (2/3)', 'One-quarter (1/4)', 'One-third (1/3)', 'One-half (1/2)'],
    correctIndex: 2,
    explanation:
      'In star connection, the starting current is reduced to approximately one-third of the DOL value. This is because the voltage across each winding is reduced to 58% (1/root 3), and since current is proportional to voltage, the line current is approximately 1/3 of DOL. The starting torque is also reduced to one-third, which limits the applications of this starting method.',
  },
  {
    id: 'open-transition',
    question: 'What is the main disadvantage of open transition in star-delta starting?',
    options: [
      'It requires twice as many cables to the motor as closed transition',
      'It cannot be used on motors rated above 7.5 kW',
      'It permanently reduces the running torque of the motor',
      'A transient current spike may occur during changeover',
    ],
    correctIndex: 3,
    explanation:
      'During open transition, the motor is briefly disconnected from the supply (30-50 milliseconds). When the delta contactor reconnects, the residual motor voltage may be out of phase with the supply, causing a current transient that can exceed DOL levels. This is the most common transition method but must be timed correctly.',
  },
  {
    id: 'timer-setting',
    question: 'What speed should the motor reach in star before transition to delta?',
    options: ['50-60%', '80-90%', '65-75%', '100%'],
    correctIndex: 1,
    explanation:
      'The motor should reach approximately 80-90% of full speed in star before transition occurs. This minimises the current transient at changeover and reduces mechanical shock to the drive coupling. The star-delta timer must be set to allow sufficient acceleration time.',
  },
  {
    id: 'cable-count',
    question: 'How many cables are required from a star-delta starter to the motor?',
    options: ['Six', 'Nine', 'Four', 'Three'],
    correctIndex: 0,
    explanation:
      'Six cables are needed because all six winding terminals (U1, V1, W1, U2, V2, W2) must be individually connected to the starter. This is a significant disadvantage compared to DOL or soft starters, which only require three cables, resulting in more copper, larger containment and higher installation costs.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'By what factor is the starting current reduced in star compared to DOL?',
    options: ['1/2', '1/3', '1/4', '2/3'],
    correctAnswer: 1,
    explanation:
      'Star connection reduces both starting current and starting torque to approximately one-third of DOL values.',
  },
  {
    id: 2,
    question: 'By what factor is the starting torque reduced in star?',
    options: ['1/4', '1/2', '1/3', 'Not reduced'],
    correctAnswer: 2,
    explanation:
      'Starting torque is proportional to voltage squared. At 58% voltage (star), torque is approximately 33% (one-third) of DOL. This is the main limitation of the method.',
  },
  {
    id: 3,
    question: 'How many contactors does a standard star-delta starter require?',
    options: ['Two', 'One', 'Four', 'Three'],
    correctAnswer: 3,
    explanation:
      'Three contactors: main (KM1), star (KM2) and delta (KM3). Closed transition requires additional contactors for the transition resistors.',
  },
  {
    id: 4,
    question: 'What is the main advantage of closed transition over open transition?',
    options: [
      'Eliminates current transient at changeover',
      'Reduces the number of contactors needed in the starter',
      'Removes the need for the star-delta timer entirely',
      'Allows the motor to be started under full load',
    ],
    correctAnswer: 0,
    explanation:
      'Closed transition maintains supply connection during changeover using transition resistors, preventing the current transient that occurs with open transition.',
  },
  {
    id: 5,
    question: 'How many cables are required from the starter to the motor?',
    options: ['Four', 'Six', 'Nine', 'Three'],
    correctAnswer: 1,
    explanation:
      'Six cables are needed because all six winding terminals (U1, V1, W1, U2, V2, W2) must be individually connected to the starter.',
  },
  {
    id: 6,
    question: 'What is the typical star-delta timer setting range?',
    options: ['0.1 to 0.5 seconds', '30 to 60 seconds', '3 to 10 seconds', '5 to 10 minutes'],
    correctAnswer: 2,
    explanation:
      'The typical range is 3 to 10 seconds, depending on motor size, load inertia and starting torque requirements.',
  },
  {
    id: 7,
    question: 'What happens if the timer is set too short?',
    options: [
      'The motor overheats from running too long in star',
      'The motor fails to start because the star contactor never closes',
      'The starting current is reduced below the normal running current',
      'High current transient and mechanical shock at transition',
    ],
    correctAnswer: 3,
    explanation:
      'If the motor has not reached sufficient speed, the transition to delta causes a large current spike and mechanical shock to the drive coupling.',
  },
  {
    id: 8,
    question: 'What type of loads are NOT suitable for star-delta starting?',
    options: [
      'Conveyors and crushers (high starting torque loads)',
      'Centrifugal pumps started against a closed valve',
      'Fans and blowers with low inertia',
      'Compressors started in an unloaded condition',
    ],
    correctAnswer: 0,
    explanation:
      'Loads requiring high starting torque cannot be star-delta started because the starting torque in star is only one-third of DOL. The motor may stall or fail to accelerate.',
  },
  {
    id: 9,
    question: 'Why must the star and delta contactors be interlocked?',
    options: [
      'To reduce the starting current drawn during the star period',
      'To prevent a short circuit across the supply',
      'To allow the motor to reach full speed more quickly',
      'To remove the need for a separate overload relay',
    ],
    correctAnswer: 1,
    explanation:
      'If both contactors close simultaneously, a short circuit occurs across the supply. Both electrical and mechanical interlocking are required.',
  },
  {
    id: 10,
    question: 'What motor nameplate voltage rating is required for star-delta on a 400 V supply?',
    options: ['230 V only', '400 V only', '400/690 V (delta/star)', '690 V only'],
    correctAnswer: 2,
    explanation:
      'The motor must be rated 400/690 V so that in star (for 690 V supply), each winding receives 400 V, and in delta (for 400 V supply), each winding receives 400 V.',
  },
  {
    id: 11,
    question: 'What is the most common reason a motor trips on star-delta transition?',
    options: [
      'The supply voltage is too high for the motor windings',
      'The main contactor opens before the delta contactor closes',
      'The overload relay has been set below the full-load current',
      'Timer too short -- high transition current trips overload',
    ],
    correctAnswer: 3,
    explanation:
      'If the timer is too short, the motor has not reached adequate speed and the delta transition current is excessive, tripping the overload relay.',
  },
  {
    id: 12,
    question: 'What technology is increasingly replacing star-delta starters?',
    options: [
      'Soft starters and VSDs',
      'Resistance starters',
      'DOL starters',
      'Autotransformer starters',
    ],
    correctAnswer: 0,
    explanation:
      'Soft starters and variable speed drives offer smoother starting, adjustable parameters, fewer components, only three motor cables, and superior motor protection.',
  },
];

const faqs = [
  {
    question: 'Can any three-phase motor be star-delta started?',
    answer:
      'No. The motor must have all six winding terminals brought out to the terminal box and must be rated for dual voltage operation (e.g., 400/690 V for a 400 V supply). A motor wired internally in delta with only three terminals cannot be star-delta started. Check the motor nameplate for a dual voltage rating before specifying star-delta starting.',
  },
  {
    question: 'Why are star-delta starters being replaced by soft starters?',
    answer:
      'Soft starters provide smooth, adjustable acceleration without the current transient at changeover. They require only three cables to the motor (not six), offer adjustable starting torque and current limit, include built-in motor protection features, and take up less panel space. They are now cost-competitive with star-delta starters for most applications above 7.5 kW.',
  },
  {
    question: 'What happens if the star and delta contactors close simultaneously?',
    answer:
      'A phase-to-phase short circuit occurs across the supply, typically resulting in blown fuses, tripped upstream protection, and potentially damaged contactors. This is a very dangerous condition. It is why star and delta contactors must always be electrically AND mechanically interlocked -- both methods are mandatory.',
  },
  {
    question: 'How do I determine the correct timer setting?',
    answer:
      'The correct setting can be determined by monitoring the motor current during starting with a clamp meter. Start with a conservative (longer) setting and reduce it until the star current has dropped close to the normal running current before transition. The motor should reach 80-90% of full speed. Typical settings are 3-10 seconds depending on motor size and load.',
  },
  {
    question: 'Can I reverse a motor on a star-delta starter?',
    answer:
      'Yes, but it requires additional contactors for reversing, making the starter more complex. Two of the three supply phases are swapped to reverse direction. The reversing contactors must be properly interlocked with both electrical and mechanical interlocks. In practice, a VSD is often a better choice for applications requiring forward/reverse operation.',
  },
];

const MOETModule3Section2_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 3 · Section 3.2 · Subsection 3"
        title="Star-Delta Starters"
        backTo="/study-centre/apprentice/m-o-e-t-module3-section2"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Starting current reduction, transition methods, timer settings, connections and
            troubleshooting.
          </p>

          <TLDR
            points={[
              'Principle: Start in star (1/3 current), run in delta (full speed).',
              'Transition: Open (simple) or closed (no spike).',
              'Timer: 3-10 seconds, motor must reach 80-90% speed.',
              'Cables: Six required (all six terminals individually).',
            ]}
          />

          <ConceptBlock title="Why this matters">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Very common in existing UK installations.</li>
              <li>Timer setting is the most common adjustment.</li>
              <li>Transition faults cause nuisance tripping.</li>
              <li>Being replaced by soft starters and VSDs.</li>
            </ul>
          </ConceptBlock>

          <LearningOutcomes
            outcomes={[
              'Explain the principle of star-delta starting and how it reduces starting current',
              'Describe open transition and closed transition methods and their differences',
              'Identify the correct timer settings for star-delta transition',
              'Draw and interpret star-delta starter wiring diagrams',
              'Recognise the limitations and applications of star-delta starting',
              'Troubleshoot common star-delta starter faults systematically',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The star-delta starting principle</ContentEyebrow>

          <ConceptBlock title="One of the oldest reduced-voltage starting methods in the UK">
            <p>
              Star-delta starting reduces the starting current by initially connecting the motor
              windings in star (Y) configuration, then switching to delta (triangle) configuration
              once the motor has accelerated to near full speed. This is one of the oldest and most
              widely used reduced-voltage starting methods in the UK, though it is gradually being
              superseded by electronic alternatives.
            </p>
            <p>
              In star connection, each winding receives the line voltage divided by the square root
              of 3 (approximately 58% of line voltage). Since the current drawn is proportional to
              the applied voltage, and power is proportional to voltage squared, the starting
              current in star is reduced to approximately one-third of the DOL starting current.
              However, the starting torque is also reduced to one-third of the DOL starting torque.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>DOL Starting Current:</strong> 6 to 8 times FLC
              </li>
              <li>
                <strong>Star Starting Current:</strong> Approximately 2 to 2.7 times FLC (one-third
                of DOL)
              </li>
              <li>
                <strong>DOL Starting Torque:</strong> 100% of locked-rotor torque
              </li>
              <li>
                <strong>Star Starting Torque:</strong> Approximately 33% of locked-rotor torque
                (one-third of DOL)
              </li>
            </ul>
            <p>
              This reduction in starting torque is the main limitation of star-delta starting. The
              motor must be able to accelerate the load to near full speed with only one-third of
              its normal starting torque. This means star-delta is only suitable for loads that
              start relatively unloaded, such as centrifugal pumps, fans and compressors. It is NOT
              suitable for loads that require high starting torque, such as conveyors, crushers,
              loaded lifts and positive displacement pumps.
            </p>
            <p>
              The motor must be designed for dual voltage operation (e.g., 400/690 V) with all six
              winding terminals brought out to the terminal box. A motor designed only for delta
              connection at 400 V cannot be star-delta started because the star voltage (230 V)
              would be below its rated winding voltage, causing overheating and poor performance.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Transition methods</ContentEyebrow>

          <ConceptBlock title="2.1 Open transition">
            <p>
              In open transition, there is a brief moment (typically 30-50 milliseconds) when the
              motor is completely disconnected from the supply during the changeover from star to
              delta. During this interval, the motor acts as a generator driven by its own inertia
              and the inertia of the load. When the delta contactor closes, the motor is reconnected
              to the supply.
            </p>
            <p>
              If the motor has slowed significantly or the residual voltage is out of phase with the
              supply, a large transient current can occur -- potentially exceeding the DOL starting
              current. This current spike causes:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Mechanical shock to the drive coupling and driven equipment</li>
              <li>Voltage dips on the supply network affecting other equipment</li>
              <li>Nuisance tripping of the overload relay</li>
              <li>Accelerated wear on contactor contacts</li>
            </ul>
            <p>
              Open transition is the simplest and most common method. The transient current spike at
              changeover is usually acceptable for most applications, provided the timer is set
              correctly so the motor has reached near full speed before transition.
            </p>
          </ConceptBlock>

          <ConceptBlock title="2.2 Closed transition">
            <p>
              Closed transition uses additional contactors and resistors (or reactors) to maintain a
              connection to the supply during the changeover. The sequence is:
            </p>
            <ol className="list-decimal space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Motor runs in star at reduced voltage</li>
              <li>Transition resistors are connected across the motor windings</li>
              <li>Star contactor opens -- motor current flows through the resistors</li>
              <li>Delta contactor closes -- motor now in delta configuration</li>
              <li>Resistor contactors open -- resistors disconnected</li>
            </ol>
            <p>
              This eliminates the open-circuit interval and prevents transient current spikes.
              Closed transition is more complex and expensive but is required where the transient
              current at changeover must be avoided, such as on weak supply networks or for large
              motors where the transient could cause voltage dips affecting other equipment.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Timer settings and contactor arrangement</ContentEyebrow>

          <ConceptBlock title="3.1 Timer settings">
            <p>
              The star-delta timer controls the duration of the star period -- the time the motor
              runs in star configuration before transitioning to delta. Setting this timer correctly
              is critical for proper starter operation and motor protection.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Timer too short:</strong> The motor has not reached sufficient speed when
                transition occurs. The delta contactor closes on a motor still drawing high current,
                creating a large current spike (may approach or exceed DOL levels) and a mechanical
                shock to the drive coupling. The overload relay may trip.
              </li>
              <li>
                <strong>Timer too long:</strong> The motor runs in star longer than necessary. The
                motor may overheat in star (it is designed to run continuously in delta, not star).
                Wasted energy and unnecessary supply disturbance from the extended starting period.
              </li>
              <li>
                <strong>Correct setting:</strong> The timer should allow the motor to reach
                approximately 80-90% of full speed in star before transition. This is typically 3 to
                10 seconds depending on motor size, load inertia and the torque required to
                accelerate the load.
              </li>
            </ul>
            <p>
              The correct timer setting can be determined by monitoring the motor current during
              starting with a clamp meter. The star current should have dropped to a level close to
              the normal running current before transition occurs. Start with a conservative
              (longer) setting and reduce gradually.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="3.2 Contactor arrangement"
            onSite="Critical safety requirement: the star and delta contactors (KM2 and KM3) must be electrically and mechanically interlocked to prevent both closing simultaneously. If both closed at the same time, a short circuit would occur across the supply, with potentially catastrophic results."
          >
            <p>
              A star-delta starter requires three contactors and six cables from the starter to the
              motor:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Main Contactor (KM1):</strong> Connects the supply to the motor winding
                starts (U1, V1, W1). Closes first at the start of the sequence and remains closed
                throughout operation (both star and delta phases).
              </li>
              <li>
                <strong>Star Contactor (KM2):</strong> Short-circuits the winding ends (U2, V2, W2)
                to form the star point. Closes during the star starting period, then opens at
                transition. Sized for approximately 58% of motor FLC.
              </li>
              <li>
                <strong>Delta Contactor (KM3):</strong> Connects each winding end to the opposite
                phase supply to form the delta configuration. Closes after the star contactor opens
                and remains closed during running. Sized for approximately 58% of motor FLC.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Limitations of star-delta starting</ContentEyebrow>

          <ConceptBlock title="Significant limitations compared to modern electronic starting methods">
            <p>
              While star-delta starting has been a reliable workhorse for decades, it has
              significant limitations compared to modern electronic starting methods:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Starting torque is only one-third of DOL -- unsuitable for high-torque loads</li>
              <li>The motor must have all six winding terminals accessible (400/690 V rating)</li>
              <li>
                Six cables required from starter to motor (more copper, larger containment, higher
                cost)
              </li>
              <li>
                Current transient at changeover (open transition) can approach or exceed DOL levels
              </li>
              <li>
                No smooth acceleration -- a fixed two-step voltage profile with an abrupt transition
              </li>
              <li>No adjustable parameters -- cannot optimise for different load conditions</li>
              <li>
                Three contactors required, plus timer and interlocking -- more components to
                maintain
              </li>
              <li>No soft stop capability -- motor coasts to a halt when stopped</li>
              <li>
                Being superseded by soft starters and VSDs which offer superior performance at
                comparable cost
              </li>
            </ul>
            <p>
              Despite these limitations, star-delta starters remain very common in existing UK
              installations. Maintenance technicians must be proficient in their operation,
              adjustment and fault diagnosis, even as new installations increasingly specify
              electronic alternatives.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Common faults and troubleshooting</ContentEyebrow>

          <ConceptBlock title="Identify at which stage the fault occurs">
            <p>
              A systematic approach to star-delta starter fault diagnosis starts with identifying at
              which stage the fault occurs: star starting, transition, or delta running. This
              narrows the possible causes significantly.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Loud bang at transition"
            whatHappens={
              <>
                Open transition with poor timing. The residual motor voltage is out of phase with
                the supply when delta closes, causing a violent current transient.
              </>
            }
            doInstead={
              <>
                Check and adjust timer setting. If persistent, consider closed transition
                modification.
              </>
            }
          />

          <ConceptBlock title="Other common faults">
            <ul className="list-disc space-y-2 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Motor trips on transition:</strong> Timer set too short (motor has not
                reached speed). Overload relay trips on the high delta transition current. Solution:
                increase timer duration. If the problem persists, check for mechanical overload on
                the driven equipment preventing the motor from reaching speed in star.
              </li>
              <li>
                <strong>Motor runs in star but will not transition:</strong> Timer fault (no output
                signal), delta contactor coil failure, or interlocking issue preventing the delta
                contactor from closing. Check: timer output voltage, delta coil continuity, and
                interlock contact status.
              </li>
              <li>
                <strong>Motor runs in wrong direction:</strong> Two phases swapped at the motor
                terminals or starter output. Correction: swap any two of the three main supply
                connections at the starter input. Do NOT swap at the motor terminal box, as this can
                disrupt the star-delta winding configuration.
              </li>
              <li>
                <strong>High current persists after transition:</strong> One phase of the delta
                contactor not making contact (single-phasing in delta). The motor draws excessive
                current on the remaining two phases. Check delta contactor contacts and connections
                for damage or poor contact.
              </li>
              <li>
                <strong>Motor does not start at all:</strong> Check: supply voltage at the starter
                input; main contactor operation; star contactor operation; control circuit fuses and
                connections; overload relay status (reset if tripped).
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <VideoCard
            url="https://www.youtube.com/watch?v=h89TTwlNnpY"

            title="Star Delta Starter Explained"

            channel="The Engineering Mindset"

            duration="11:08"

            topic="The contactor and timer sequence that cuts starting current to a third"

            caption="Walks the power and control circuits through the changeover — worth watching before you meet one in a panel."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Star values vs DOL: starting current = 1/3 of DOL, starting torque = 1/3 of DOL, winding voltage = 58% of line, timer range = 3 to 10 seconds.',
              'Contactor designations: KM1 = main contactor (always closed), KM2 = star contactor (starting only), KM3 = delta contactor (running). KM2 and KM3 must be interlocked.',
              'Suitable applications: centrifugal pumps (light start), fans and blowers, compressors (unloaded start). NOT for conveyors, crushers or lifts.',
              'Transition fault diagnosis: trips at transition = timer too short; stays in star = timer/delta fault; loud bang = out-of-phase reconnection; high running current = single-phasing.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module3-section2-2')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Prev subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  DOL Starters
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module3-section2-4')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  VSDs and Soft Starters
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule3Section2_3;
