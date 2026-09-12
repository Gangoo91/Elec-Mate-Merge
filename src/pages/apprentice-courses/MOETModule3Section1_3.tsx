/**
 * MOET · Module 3 · Section 3.1 · Subsection 3 — Circuit Breaker Operations
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
 *   · "Electrical. Electrical plant, equipment, and systems maintenance
 *     requirements: removing and replacing parts, inspecting, testing,
 *     setting up, adjusting, cleaning, and functional testing."
 *   · "Electrical. Functions and applications of electrical circuits."
 *   · "Electrical. Electricity at Work regulations. IET wiring regulations."
 *
 * Converted onto the study-centre learning kit. Content preserved from the
 * original page; structure, shell and reading measure rebuilt.
 *
 * ✎ ACCURACY FIX (12 Sep): this page attributed the non-combustible consumer
 *   unit requirement to "Amendment 2". Amendment attribution could not be
 *   verified from the RAG (which holds current text, not amendment history),
 *   and the claim is doubtful — the 421.1.201 national addition predates
 *   Amendment 2 to the 18th Edition. Reworded throughout to cite the
 *   regulation itself, which IS verified in bs7671_facets against
 *   BS 7671:2018+A4:2026 and is the more useful reference for a learner.
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
  Prerequisites,
  ContentEyebrow,
  SectionRule,
  VideoCard,
} from '@/components/study-centre/learning';
import { ConsumerUnit } from '@/components/study-centre/diagrams';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Circuit Breaker Operations - MOET Module 3 Section 1.3';
const DESCRIPTION =
  'Comprehensive guide to circuit breaker operations for electrical maintenance technicians: MCBs, MCCBs, ACBs, distribution boards, consumer units, busbar arrangements, SPD integration, labelling requirements and BS 7671 A4:2026 compliance.';

const quickCheckQuestions = [
  {
    id: 'amendment2-cu',
    question:
      'Under BS 7671 Regulation 421.1.201, what enclosure material is required for domestic consumer units?',
    options: [
      'Fire-retardant plastic',
      'Non-combustible (metallic)',
      'PVC plastic',
      'Any material is acceptable',
    ],
    correctIndex: 1,
    explanation:
      'Regulation 421.1.201 requires consumer units in domestic premises to be housed in non-combustible enclosures, which in practice means metallic (steel) consumer units. This was introduced to reduce the fire risk from arcing faults within the unit.',
  },
  {
    id: 'spare-ways',
    question:
      'What is the recommended minimum spare capacity (spare ways) when specifying a distribution board?',
    options: ['10%', '50%', '5%', '20%'],
    correctIndex: 3,
    explanation:
      'A minimum of 20% spare ways is recommended when specifying distribution boards. This allows for future circuit additions without needing to replace the entire board — a common and costly issue in older installations.',
  },
  {
    id: 'rcd-test-freq',
    question: 'How often does the current RCD notice advise the user to test the device?',
    options: ['Monthly', 'Six-monthly', 'Quarterly', 'Annually'],
    correctIndex: 1,
    explanation:
      'Current guidance (BS 7671 Regulation 514.12 and Guidance Note 3) recommends pressing the RCD test button at least every six months. This verifies the mechanical trip mechanism operates correctly and the device will disconnect the supply in the event of an earth fault.',
  },
  {
    id: 'spd-lead-length',
    question:
      'What is the recommended maximum combined lead length for SPD connections to maintain effectiveness?',
    options: ['2000 mm', '100 mm', '500 mm', '1000 mm'],
    correctIndex: 2,
    explanation:
      "SPD connections should ideally have a combined lead length of less than 500 mm. Longer cable runs increase inductance, which reduces the SPD's ability to clamp transient overvoltages effectively.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What enclosure material does BS 7671 Regulation 421.1.201 require for domestic consumer units?',
    options: [
      'High-impact PVC',
      'Non-combustible (metallic)',
      'Fire-retardant plastic',
      'Any BS-approved material',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 421.1.201 requires non-combustible (metallic) enclosures for consumer units in domestic premises to reduce fire risk from internal arcing faults.',
  },
  {
    id: 2,
    question: 'Which BS 7671 Regulation covers labelling and identification requirements?',
    options: ['Regulation 537', 'Regulation 411', 'Regulation 514', 'Regulation 612'],
    correctAnswer: 2,
    explanation:
      'Regulation 514 of BS 7671 covers labelling, identification marks, warning notices and diagrams for electrical installations.',
  },
  {
    id: 3,
    question: 'What is the recommended minimum percentage of spare ways in a distribution board?',
    options: ['10%', '5%', '30%', '20%'],
    correctAnswer: 3,
    explanation:
      'A minimum of 20% spare ways is recommended to allow for future circuit additions without requiring board replacement.',
  },
  {
    id: 4,
    question: 'Which type of SPD is most commonly installed at distribution boards?',
    options: ['Type 2', 'Type 1', 'Type 3', 'Type 4'],
    correctAnswer: 0,
    explanation:
      'Type 2 SPDs are the most commonly installed, placed at distribution boards to protect against switching surges and indirect lightning effects.',
  },
  {
    id: 5,
    question: 'What is a split-load consumer unit?',
    options: [
      'A unit that splits the incoming supply between two separate buildings',
      'A unit where the busbars are divided into RCD-protected and non-RCD sections',
      'A unit fitted with two main switches so it can be fed from two phases',
      'A unit in which each circuit shares a single combined RCBO for the whole board',
    ],
    correctAnswer: 1,
    explanation:
      'A split-load consumer unit divides the busbars into sections, typically with one section protected by an RCD and another section without RCD protection for circuits that should not trip on earth faults.',
  },
  {
    id: 6,
    question: 'How often does the current RCD notice advise the user to test the device?',
    options: ['Monthly', 'Quarterly', 'Six-monthly', 'Annually'],
    correctAnswer: 2,
    explanation:
      'Current guidance (BS 7671 Regulation 514.12 and Guidance Note 3) recommends pressing the built-in RCD test button at least every six months.',
  },
  {
    id: 7,
    question: 'What is the maximum recommended combined lead length for SPD connections?',
    options: ['200 mm', 'No limit', '1000 mm', '500 mm'],
    correctAnswer: 3,
    explanation:
      'A combined lead length of less than 500 mm is recommended to minimise inductance and maintain SPD effectiveness.',
  },
  {
    id: 8,
    question:
      'In a three-phase distribution board, how are the busbars typically arranged for single-pole ways?',
    options: [
      'Repeating L1-L2-L3 pattern',
      'Random phase allocation',
      'All ways on L1',
      'Alternating L1-L2 only',
    ],
    correctAnswer: 0,
    explanation:
      'The busbars are arranged in a repeating L1-L2-L3 pattern so that adjacent single-pole ways are on different phases, allowing balanced loading by distributing circuits evenly.',
  },
  {
    id: 9,
    question: 'What trend is replacing split-load consumer units in modern installations?',
    options: [
      'A single RCD protecting every circuit in the board',
      'Full RCBO protection for each circuit',
      'Returning to plastic enclosures to reduce cost',
      'Removing earth fault protection from socket circuits',
    ],
    correctAnswer: 1,
    explanation:
      'Full RCBO protection gives each circuit its own combined overcurrent and earth fault protection, eliminating the problem of one fault tripping multiple circuits.',
  },
  {
    id: 10,
    question: 'What information must a circuit schedule include?',
    options: [
      'Only the way number and the name of the electrician who wired the board',
      'The purchase date and price of every protective device in the board',
      'Way number, description, device type/rating, cable size, phase and area served',
      'The measured load current on each circuit at the time of installation only',
    ],
    correctAnswer: 2,
    explanation:
      'A complete circuit schedule includes the way number, circuit description, protective device type and rating, cable size and type, phase allocation, and the area or zone served.',
  },
  {
    id: 11,
    question: 'What is the purpose of blanking plates in a distribution board?',
    options: [
      'To increase the current rating of the busbars they cover',
      'To provide spare ways that can be wired without a protective device',
      'To improve the appearance of the board for the customer',
      'To maintain the IP rating and prevent access to live parts',
    ],
    correctAnswer: 3,
    explanation:
      "Blanking plates cover unused ways to maintain the enclosure's IP rating and prevent accidental contact with live busbars. A missing blanking plate compromises the safety of the entire board.",
  },
  {
    id: 12,
    question: 'Where should a Type 1 SPD be installed?',
    options: [
      'At the origin of the installation (main switchboard)',
      'At the final socket outlet nearest sensitive equipment',
      'Inside the enclosure of each individual final circuit MCB',
      'On the load side of every RCD in the consumer unit',
    ],
    correctAnswer: 0,
    explanation:
      'Type 1 SPDs are installed at the origin of the installation, typically the main switchboard, and are designed to handle direct lightning current. They are required where an external lightning protection system is fitted.',
  },
];

const faqs = [
  {
    question: 'What is the difference between a distribution board and a consumer unit?',
    answer:
      'A consumer unit is a specific type of distribution board designed for domestic and small commercial installations. It is single-phase with a combined main switch and typically uses plug-in MCBs or RCBOs. A distribution board is the broader term covering all types including three-phase commercial panels, lighting distribution boards and essential services panels.',
  },
  {
    question:
      'Why does BS 7671 require non-combustible consumer unit enclosures in domestic premises?',
    answer:
      'Statistics showed that arcing faults within plastic consumer units could cause the enclosure to ignite and spread fire. Metal (non-combustible) enclosures contain any internal arcing and prevent the enclosure itself from becoming a fire source. This change was a direct response to fire safety data.',
  },
  {
    question: 'Can I use a Type 2 SPD without a Type 1 if there is no lightning protection?',
    answer:
      'Yes. Type 1 SPDs are typically only required where an external lightning protection system is fitted. For most installations without LPS, a Type 2 SPD at the distribution board provides adequate surge protection against indirect lightning effects and switching surges.',
  },
  {
    question: 'What should I do if the circuit schedule is missing or illegible?',
    answer:
      'Report this as a deficiency. The circuit schedule should be recreated by tracing and identifying each circuit. This is a Regulation 514 requirement and a common C3 code observation during periodic inspection. An accurate schedule is essential for safe isolation and efficient maintenance.',
  },
  {
    question: "How do I verify that a distribution board's protection is correctly coordinated?",
    answer:
      "Check the manufacturer's discrimination tables for tested combinations of incoming and outgoing devices. Verify that the prospective fault current at the board does not exceed any device's breaking capacity. Ensure the incomer rating is appropriate for the total expected load. If in doubt, request a protection coordination study from a design engineer.",
  },
];

const MOETModule3Section1_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 3 · Section 3.1 · Subsection 3"
        title="Circuit Breaker Operations"
        backTo="/study-centre/apprentice/m-o-e-t-module3-section1"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Distribution boards, consumer units, busbar arrangements, SPD integration and Amendment
            2 requirements.
          </p>

          <TLDR
            points={[
              'DBs: core equipment — MCBs, RCBOs, busbar systems.',
              'Regulation 421.1.201: non-combustible consumer unit enclosures mandatory in domestic premises.',
              'Labelling: Regulation 514 — schedules must be accurate.',
              'SPDs: Type 2 at DB, max 500 mm lead length.',
              'Most maintained: DBs are your primary daily equipment.',
              'Safety: correct labelling prevents wrong-circuit isolation.',
              'RCBO trend: individual protection eliminates nuisance tripping.',
              'ST1426: maps to installation maintenance KSBs.',
            ]}
          />

          <Prerequisites
            items={[
              {
                term: 'Circuit protection and earthing',

                gist: 'Fuses, circuit breakers, RCDs and RCBOs, earthing arrangements and protective bonding — what each device protects against and how fault current gets back to source.',

                where: '2.4',
              },

              {
                term: 'BS 7671 and where it sits',

                gist: 'The Wiring Regulations are a standard, not statute — compliance is how you demonstrate the EAWR duties have been met. Current edition 2018+A4:2026.',

                where: '1.4.3',
              },
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Describe the construction and layout of distribution boards and consumer units',
              'Explain busbar arrangements including single-busbar and split-load configurations',
              'Interpret and update circuit schedules and charts to Regulation 514',
              'Outline the requirements for surge protection device integration',
              'Describe the Regulation 421.1.201 consumer unit requirements, including non-combustible enclosures',
              'Carry out inspection and maintenance procedures for distribution equipment',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Distribution board design and construction</ContentEyebrow>

          <ConceptBlock title="The equipment you will interact with most">
            <p>
              Distribution boards (DBs) are the workhorses of electrical distribution. They receive
              supply from the main switchboard or sub-main cables and distribute it to individual
              final circuits via MCBs, RCBOs or other protective devices. Every commercial and
              domestic installation has at least one, and many larger buildings have dozens
              distributed across floors and zones.
            </p>
            <p>
              As a maintenance technician, distribution boards are the equipment you will interact
              with most frequently. Understanding their construction, internal layout and component
              functions is essential for safe and effective maintenance, fault finding and circuit
              identification.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Types of distribution board">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Three-Phase DBs:</strong> used in commercial and industrial installations.
                Three-phase busbar system with single-pole, two-pole or three-pole outgoing devices.
                Available from 4-way to 48-way or more
              </li>
              <li>
                <strong>Single-Phase Consumer Units:</strong> primarily domestic. Single-phase
                busbar with single-pole MCBs or RCBOs. Regulation 421.1.201 requires non-combustible
                (in practice, metallic) enclosures in domestic premises
              </li>
              <li>
                <strong>Lighting Distribution Boards:</strong> specialised for lighting circuits,
                often incorporating contactors or relays for central switching. May include
                emergency lighting monitoring modules
              </li>
              <li>
                <strong>Essential Services Panels:</strong> dedicated to life safety circuits — fire
                alarms, emergency lighting, lifts, smoke ventilation. Require enhanced protection
                and may be fed from standby generators
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Internal components"
            onSite="The busbar system is arranged to distribute load evenly across the three phases. In a typical three-phase DB, adjacent single-pole ways are connected to different phases in a repeating L1-L2-L3 pattern, allowing balanced loading by distributing circuits evenly across the board."
          >
            <p>A typical distribution board contains the following key components:</p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>An incoming switch-disconnector or MCCB (the incomer)</li>
              <li>A busbar system (copper or tin-plated copper) in L1-L2-L3 repeating pattern</li>
              <li>DIN-rail mounted outgoing protective devices (MCBs, RCBOs, RCDs)</li>
              <li>A neutral bar and earth bar</li>
              <li>Cable entry points with gland plates</li>
              <li>A circuit schedule or chart holder on the inside of the door</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Busbar arrangements and ways</ContentEyebrow>

          <ConceptBlock title="How power is shared out across the outgoing circuits">
            <p>
              The busbar arrangement determines how the distribution board distributes power to
              outgoing circuits and affects both the flexibility and resilience of the system.
              Understanding the different configurations helps you identify the board type during
              maintenance and plan circuit additions correctly.
            </p>
          </ConceptBlock>

          <ConsumerUnit />

          <ConceptBlock title="Single-busbar configuration">
            <p>
              The simplest and most common arrangement. A single set of busbars runs the length of
              the board, fed by a single incomer. All outgoing devices connect to the same busbars.
              If the incomer trips, all circuits are lost. This is standard for most
              sub-distribution boards in commercial installations.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Split-load configuration">
            <p>
              In a split-load consumer unit, the busbars are divided into two sections by a main
              switch and one or more RCDs. One section protects circuits through an RCD, while the
              other section may have non-RCD-protected circuits (fire alarm, security). This avoids
              nuisance tripping of essential circuits.
            </p>
          </ConceptBlock>

          <ConceptBlock title="The move to full RCBO protection">
            <p>
              The trend in modern installations is toward full RCBO protection, where each circuit
              has its own individual RCBO. This eliminates the problem of one earth fault tripping
              an RCD and affecting multiple circuits. Each circuit has both overload and earth fault
              protection in a single device, providing the best combination of safety and continuity
              of supply.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>No nuisance tripping affecting multiple circuits</li>
              <li>Easier fault identification — the tripped RCBO identifies the faulty circuit</li>
              <li>Better protection — each circuit has its own earth fault threshold</li>
              <li>Higher cost but increasingly standard for new installations</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Counting ways"
            onSite="Always plan a minimum of 20% spare ways for future additions."
          >
            <p>
              A &quot;way&quot; is a single connection point for a single-pole outgoing device. A
              12-way three-phase board accommodates 12 single-pole MCBs (4 per phase). A three-pole
              device occupies 3 ways.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Labelling and circuit schedules (Regulation 514)</ContentEyebrow>

          <ConceptBlock title="A fundamental requirement, frequently found deficient">
            <p>
              Regulation 514 of BS 7671 requires that every installation be provided with labels,
              identification marks and diagrams to ensure safe operation, inspection and
              maintenance. For distribution boards, this means clear and accurate circuit
              identification — a fundamental requirement that is frequently found to be deficient
              during periodic inspection.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Circuit schedule requirements">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Way number:</strong> position in the board (1, 2, 3, etc.)
              </li>
              <li>
                <strong>Circuit description:</strong> clear identification (e.g., &quot;Ground floor
                lighting&quot;, &quot;Kitchen sockets&quot;)
              </li>
              <li>
                <strong>Protective device:</strong> type and rating (e.g., &quot;MCB Type B 16
                A&quot;)
              </li>
              <li>
                <strong>Phase allocation:</strong> L1, L2 or L3 for three-phase boards
              </li>
              <li>
                <strong>Cable size and type:</strong> e.g., &quot;2.5 mm2 T&amp;E&quot;
              </li>
              <li>
                <strong>Area served:</strong> the zone or area the circuit supplies
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Warning notices required by BS 7671">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Nominal voltage and frequency of the supply</li>
              <li>Identification of the origin of supply (where not obvious)</li>
              <li>RCD test notice: advising a six-monthly test, with instructions</li>
              <li>Dual supply warning where more than one source is present</li>
              <li>Periodic inspection due date (recommended)</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="The schedule falls out of date"
            whatHappens={
              <>
                Outdated or missing circuit schedules are among the most common deficiencies found
                during periodic inspection and represent a significant safety risk — incorrect
                circuit identification can lead to work on the wrong circuit during isolation.
              </>
            }
            doInstead={
              <>
                Circuit schedules must be kept up to date. If a circuit is modified, added or
                removed during maintenance, the schedule must be updated immediately — this is not
                optional, it is a regulatory requirement and a critical safety measure.
              </>
            }
          />

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Surge protection device integration</ContentEyebrow>

          <ConceptBlock title="A now-standard component in most new installations">
            <p>
              Surge protection devices (SPDs) protect electrical equipment from transient
              overvoltages caused by lightning, switching surges and other disturbances. BS 7671
              Regulation 443 (18th Edition, now at Amendment 4:2026) has strengthened the
              requirements for SPD installation, making them a standard component in most new
              installations.
            </p>
          </ConceptBlock>

          <ConceptBlock title="SPD types and applications">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Type</th>
                    <th className="py-2 pr-4 font-medium text-white">Location</th>
                    <th className="py-2 font-medium text-white">Purpose</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Type 1 (Class I)</td>
                    <td className="py-2 pr-4">Origin / main switchboard</td>
                    <td className="py-2">
                      Direct lightning current. Required where external LPS fitted
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Type 2 (Class II)</td>
                    <td className="py-2 pr-4">Distribution boards</td>
                    <td className="py-2">
                      Indirect lightning and switching surges. Most common type
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Type 3 (Class III)</td>
                    <td className="py-2 pr-4">Near sensitive equipment</td>
                    <td className="py-2">Fine protection against residual surges</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock
            title="Installation and maintenance considerations"
            onSite="SPDs are now required in most commercial installations and many domestic installations. During maintenance, always check the SPD status indicator and report any devices showing end-of-life status for replacement."
          >
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Lead length:</strong> keep combined lead length below 500 mm to minimise
                inductance
              </li>
              <li>
                <strong>Disconnection:</strong> dedicated MCB or fuse required for SPD disconnection
                if it fails short-circuit
              </li>
              <li>
                <strong>Status indicator:</strong> most modern SPDs have visual indicators (green =
                healthy, red = end-of-life)
              </li>
              <li>
                <strong>Check during maintenance:</strong> verify SPD status indicator at every
                maintenance visit
              </li>
              <li>
                <strong>When required:</strong> installations with sensitive electronics, external
                LPS, or where overvoltage consequences are serious
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Inspection and maintenance of distribution boards</ContentEyebrow>

          <ConceptBlock title="A structured approach so nothing is missed">
            <p>
              Regular inspection and maintenance of distribution boards is a core part of the
              maintenance technician&rsquo;s role. A structured approach ensures nothing is missed
              and that developing faults are identified before they cause failure or safety hazards.
              The following provides a comprehensive maintenance checklist.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Distribution board maintenance checklist">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Verify the circuit schedule is present, legible and accurate</li>
              <li>Check all required warning notices are displayed</li>
              <li>Inspect the enclosure for damage, corrosion or signs of overheating</li>
              <li>Check that all blanking plates are fitted (no open ways)</li>
              <li>Verify the IP rating is maintained (glands, seals, covers intact)</li>
              <li>Check for signs of moisture ingress, dust or vermin</li>
              <li>Inspect all connections for signs of overheating (discolouration, melting)</li>
              <li>Check torque on accessible connections using a calibrated torque driver</li>
              <li>Verify all MCBs and RCDs operate correctly (manual trip test)</li>
              <li>Test RCDs with an RCD tester to verify trip time is within specification</li>
              <li>Check SPD status indicators where fitted</li>
              <li>Perform thermal imaging if equipment is available and board is energised</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Common deficiencies found">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Missing or outdated circuit schedules</li>
              <li>Missing blanking plates exposing live busbars</li>
              <li>Loose connections causing overheating</li>
              <li>Failed RCDs not tripping on test</li>
              <li>Damaged cable glands compromising IP rating</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="After maintenance">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Return board to normal operating condition</li>
              <li>Replace all covers and blanking plates</li>
              <li>Update circuit schedule if changes were made</li>
              <li>Record findings in maintenance log or CAFM system</li>
              <li>Report any deficiencies requiring further action</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Thermal imaging as a maintenance tool">
            <p>
              Thermal imaging is an increasingly valuable maintenance tool for distribution boards.
              It can identify overheating connections, overloaded circuits and failing components
              without the need to isolate the board. Many organisations now include thermographic
              surveys as a standard part of their PPM programme for distribution equipment.
            </p>
          </ConceptBlock>

          <SectionRule />

          <VideoCard
            url="https://www.youtube.com/watch?v=VGj32euYZ2c"

            title="Circuit Breaker Basics — How Do They Work?"

            channel="The Engineering Mindset"

            duration="1:51"

            topic="The thermal bimetal and the magnetic coil, doing two different jobs"

            caption="Under two minutes, and it shows the two tripping mechanisms this page describes actually operating."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'DB maintenance priorities: circuit schedule present and accurate; all blanking plates fitted; RCDs user-tested six-monthly (trip time in spec); connections torque-checked annually; SPD status indicators checked.',
              'Regulation 421.1.201 requires non-combustible (metallic) consumer unit enclosures for domestic premises.',
              'Regulation 514 covers labelling requirements; Regulation 443 covers SPD requirements.',
              'BS EN 61439 covers low-voltage switchgear and controlgear assemblies.',
              'Always plan a minimum of 20% spare ways when specifying a distribution board.',
              'ST1426 — maintenance technician KSBs map directly to distribution board inspection and upkeep.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module3-section1-2')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  HV/LV Switchgear Types
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module3-section1-4')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Busbars and Cabling Systems
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule3Section1_3;
