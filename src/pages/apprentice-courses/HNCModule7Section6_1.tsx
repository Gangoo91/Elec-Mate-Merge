/**
 * Module 7 · Section 6 · Subsection 1 — Distribution Board Design
 * HNC Electrical Engineering for Building Services (Power and Lighting Systems)
 *   Board layouts, circuit groupings, labelling, IP ratings, and installation considerations for electrical distribution
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  ConceptBlock,
  CommonMistake,
  LearningOutcomes,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Distribution Board Design - HNC Module 7 Section 6.1';
const DESCRIPTION =
  'Master distribution board design for electrical installations: board layouts, circuit groupings per BS 7671, labelling requirements, IP ratings, cable entry/exit, accessibility, spare capacity, and type designations.';

const quickCheckQuestions = [
  {
    id: 'db-type-designation',
    question:
      'What does a Type B distribution board designation indicate according to BS EN 61439-3?',
    options: [
      'A board with basic insulation only',
      'A board designed for use by ordinary persons (non-skilled)',
      'A board with IP65 rating',
      'A board for three-phase supplies only',
    ],
    correctIndex: 1,
    explanation:
      'Type B distribution boards (DBO) are designed for use by ordinary persons (non-skilled) and must have all live parts behind a barrier or enclosure that requires a tool to remove. Type A boards are for skilled persons only.',
  },
  {
    id: 'circuit-grouping',
    question:
      'According to BS 7671, which circuits should NOT share a common enclosure without appropriate barriers?',
    options: [
      'Lighting and socket circuits',
      'Ring final circuits and radial circuits',
      'SELV/PELV circuits and circuits exceeding 50V AC',
      'Single-phase and three-phase circuits',
    ],
    correctIndex: 2,
    explanation:
      'BS 7671 Regulation 528.1 requires that SELV and PELV circuits must be separated from circuits of other systems, typically by a barrier, partition, or separate enclosure to maintain the integrity of the separated extra-low voltage system.',
  },
  {
    id: 'ip-rating',
    question:
      'What minimum IP rating is typically required for a distribution board installed in an external location?',
    options: ['IP2X', 'IP20', 'IP44', 'IP65'],
    correctIndex: 3,
    explanation:
      'External distribution boards typically require IP65 rating minimum (dust tight and protected against water jets from any direction). IP44 may be acceptable in sheltered locations, but IP65 provides better protection for exposed external installations.',
  },
  {
    id: 'spare-capacity',
    question:
      'What is the recommended minimum spare capacity when designing a new distribution board installation?',
    options: ['5%', '10%', '20%', '30%'],
    correctIndex: 2,
    explanation:
      'Industry best practice recommends a minimum of 20% spare capacity (spare ways) in distribution boards to accommodate future circuit additions without the need for board replacement or additional enclosures.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'According to BS EN 61439-3, what is the maximum rated current for a distribution board classified as a DBO?',
    options: ['63A', '125A', '250A', '400A'],
    correctAnswer: 2,
    explanation:
      'BS EN 61439-3 specifies that distribution boards for operation by ordinary persons (DBO) have a maximum rated current of 250A. Boards exceeding this are classified differently and require professional operation.',
  },
  {
    id: 2,
    question: "What does the 'X' in an IP rating indicate?",
    options: [
      'Maximum protection level',
      'Extended protection',
      'No specific requirement for that digit',
      'Explosion proof',
    ],
    correctAnswer: 2,
    explanation:
      "The 'X' in an IP rating indicates that no specific protection level is defined for that characteristic. For example, IPX4 means no solid object protection is specified, but it has protection against water splashing.",
  },
  {
    id: 3,
    question: 'When designing distribution board layouts, circuits should be arranged so that:',
    options: [
      'All MCBs are the same rating',
      'Higher rated circuits are at the bottom',
      'Circuits are grouped by function with clear labelling',
      'Three-phase circuits are always on the left side',
    ],
    correctAnswer: 2,
    explanation:
      'Best practice requires circuits to be logically grouped by function (lighting, power, specialist loads) with clear labelling. This aids maintenance, fault finding, and ensures safe isolation of specific areas or systems.',
  },
  {
    id: 4,
    question: 'What is the purpose of a busbar chamber within a distribution board?',
    options: [
      'To provide additional cable termination space',
      'To house the incoming supply and main switch',
      'To distribute incoming supply to outgoing circuit protective devices',
      'To contain the earth bar only',
    ],
    correctAnswer: 2,
    explanation:
      'The busbar chamber houses the busbars that distribute the incoming supply to all outgoing circuit protective devices. It must be adequately rated for the prospective fault current and properly shrouded for safety.',
  },
  {
    id: 5,
    question: 'BS 7671 requires that distribution board circuit charts must include:',
    options: [
      'The installation date only',
      'Nominal current and type of protective device, circuit designation, and points served',
      "Only the electrician's contact details",
      'Cable colours used throughout',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 514.9.1 requires circuit charts to show the nominal current and type of protective device for each circuit, along with circuit designation and reference to the points served or areas covered.',
  },
  {
    id: 6,
    question: 'What consideration must be given to cable entry when designing distribution boards?',
    options: [
      'Cables can enter from any direction without planning',
      'All cables must enter from the top only',
      'Entry positions must allow adequate bending radii and heat dissipation',
      'Cable glands are only required for outdoor installations',
    ],
    correctAnswer: 2,
    explanation:
      'Cable entry design must consider minimum bending radii for cable types used, adequate space for termination, heat dissipation requirements, and appropriate glands or bushings to maintain the IP rating of the enclosure.',
  },
  {
    id: 7,
    question:
      "What is the significance of a distribution board's form of separation (Form 1, 2, 3, or 4)?",
    options: [
      "It indicates the board's voltage rating",
      'It defines the level of internal segregation between functional units',
      'It shows the maximum number of circuits',
      'It indicates the enclosure material type',
    ],
    correctAnswer: 1,
    explanation:
      'Forms of separation (Forms 1-4) define the degree of internal segregation between functional units, busbars, and terminals. Higher form numbers provide greater separation, reducing risks during maintenance and improving safety.',
  },
  {
    id: 8,
    question: 'When selecting a distribution board location, which factor is LEAST important?',
    options: [
      'Accessibility for operation and maintenance',
      'Proximity to main earthing terminal',
      "The board manufacturer's brand reputation",
      'Environmental conditions and required IP rating',
    ],
    correctAnswer: 2,
    explanation:
      'While quality is important, brand reputation is not a technical installation factor. Key considerations are accessibility, earthing arrangements, environmental conditions, cable routing, and compliance with building regulations.',
  },
  {
    id: 9,
    question:
      'According to BS 7671:2018+A4:2026 Regulation 314.1, what must be considered when dividing an installation into circuits at a distribution board?',
    options: [
      'Only the cable colours used',
      'The need to avoid danger and minimise inconvenience in the event of a fault',
      'That all circuits must be the same rating',
      "The installation company's standard practices",
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 314.1 states: "Every installation shall be divided into circuits, as necessary, to: (a) avoid danger and minimize inconvenience in the event of a fault; (b) facilitate safe inspection, testing and maintenance..." This means essential circuits may need separate RCDs, and critical loads should be distributed appropriately. (Note: Reg 132.12 covers Accessibility of electrical equipment — a related but distinct requirement.)',
  },
  {
    id: 10,
    question:
      'What documentation must be provided with a completed distribution board installation?',
    options: [
      "Only the manufacturer's data sheet",
      'Circuit chart, test results, and warning labels as required by BS 7671',
      'Only the electrical installation certificate',
      'A photograph of the completed installation',
    ],
    correctAnswer: 1,
    explanation:
      'A completed installation requires: circuit chart/schedule (Reg 514.9.1), appropriate warning labels, test results recorded on the electrical installation certificate, and operating instructions where necessary.',
  },
  {
    id: 11,
    question:
      'What is the primary purpose of selecting an appropriate IP rating for a distribution board?',
    options: [
      'To ensure the board matches other equipment aesthetically',
      'To protect internal components from ingress of solid objects and moisture',
      'To reduce the installation cost',
      'To simplify cable termination',
    ],
    correctAnswer: 1,
    explanation:
      "IP ratings define the level of protection against ingress of solid objects (first digit) and moisture (second digit). Selecting the appropriate rating ensures the board's internal components remain protected in the intended installation environment.",
  },
  {
    id: 12,
    question:
      'When designing a three-phase distribution board, what must be considered regarding load balancing?',
    options: [
      'All single-phase loads can be connected to one phase',
      'Loads should be distributed across phases to minimise neutral current',
      'Only the red phase should carry lighting loads',
      'Load balancing is only required for industrial installations',
    ],
    correctAnswer: 1,
    explanation:
      'Loads should be distributed evenly across all three phases to minimise neutral current and prevent overloading of individual phases. Unbalanced loads can cause excessive neutral currents and voltage imbalances.',
  },
];

const faqs = [
  {
    question: 'What is the difference between Type A and Type B distribution boards?',
    answer:
      'Type A distribution boards (DBO-A) are designed for use by skilled persons only (electricians), where live parts may be accessible during normal operation. Type B boards (DBO-B) are designed for use by ordinary persons (non-skilled) and must have all live parts behind barriers or enclosures requiring a tool to remove. In domestic and most commercial installations, Type B boards are required to protect untrained users from electric shock.',
  },
  {
    question: 'How do I determine the required IP rating for a distribution board?',
    answer:
      'The IP rating depends on the installation environment. Indoor dry locations typically require IP2X or IP20 minimum. Bathrooms and wet areas need IP44 or higher. External locations generally require IP65 or IP66. Industrial environments with dust require the first digit to be at least 5 (dust protected) or 6 (dust tight). Always assess the specific environmental conditions including temperature, humidity, potential for water ingress, and presence of dust or solid particles.',
  },
  {
    question: 'Why is spare capacity important in distribution board design?',
    answer:
      'Spare capacity (typically 20% minimum) allows for future circuit additions without replacing the entire board. It accommodates changes in building use, additional equipment, and technology upgrades. Without spare capacity, future modifications require either a new board installation or additional sub-distribution boards, increasing costs significantly. Spare ways also provide flexibility during fault conditions to temporarily re-route circuits.',
  },
  {
    question: 'What are the Forms of Separation and when are they required?',
    answer:
      'Forms 1-4 define internal segregation levels. Form 1 has no separation between functional units. Form 2 separates busbars from functional units. Form 3 also separates functional units from each other. Form 4 additionally separates outgoing terminals within each functional unit. Higher forms are typically required where different contractors may work on different sections, or where maintenance work must be carried out with adjacent circuits live.',
  },
  {
    question: 'How should circuits be grouped within a distribution board?',
    answer:
      'Circuits should be logically grouped by function (lighting, socket outlets, fixed equipment), location (floor or zone), and protective device type (RCD-protected circuits together). Critical circuits should be on separate protective devices to prevent total loss of supply. BS 7671 Regulation 314.1 requires division of the installation to avoid danger and minimise inconvenience in the event of a fault, and to facilitate safe inspection, testing, and maintenance.',
  },
  {
    question: 'What labelling requirements apply to distribution boards?',
    answer:
      'BS 7671 requires a durable circuit chart (Regulation 514.9.1) showing: circuit number, nominal current and type of each protective device, circuit designation, and reference to points served. Warning labels are required for RCDs (quarterly test notice), dual supplies if present, and where nominal voltage exceeds 230V. Labels must be clear, legible, and durable for the expected lifetime of the installation. The main switch must be clearly identified.',
  },
];

const HNCModule7Section6_1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section6")}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 7 · Section 6 · Subsection 1"
            title="Distribution Board Design"
            description="Board layouts, circuit groupings, labelling, IP ratings, and installation considerations for electrical distribution"
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              "Select appropriate distribution board types per BS EN 61439-3",
              "Apply IP rating requirements for different environments",
              "Design circuit groupings compliant with BS 7671",
              "Specify labelling and documentation requirements",
              "Plan cable entry, exit, and termination arrangements",
              "Determine spare capacity and future expansion provisions",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Board Types and Designations">
            <p>Distribution boards are classified according to BS EN 61439-3, which defines requirements for low-voltage switchgear and controlgear assemblies. Understanding board designations is essential for specifying appropriate equipment for each installation environment.</p>
            <p><strong>Key board type classifications:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>DBO (Type B):</strong> Distribution boards for operation by ordinary persons - live parts inaccessible</li>
              <li><strong>DBO-A (Type A):</strong> For skilled persons only - live parts may be accessible during normal use</li>
              <li><strong>Consumer unit:</strong> Specific type of DBO for domestic installations with integral main switch</li>
              <li><strong>Sub-distribution board:</strong> Fed from main board, distributing to local final circuits</li>
            </ul>
            <p><strong>Board Type Selection Guide</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Domestic:</strong> Consumer unit (Type B) — Non-combustible enclosure, integral main switch</li>
              <li><strong>Commercial office:</strong> DBO-B — Tool-only access to live parts, IP2X minimum</li>
              <li><strong>Industrial:</strong> DBO-A or DBO-B — Form of separation, higher IP rating</li>
              <li><strong>Plant room:</strong> DBO-A (restricted access) — Higher forms of separation, dust/moisture protection</li>
              <li><strong>External:</strong> DBO-B with IP65+ — Weather protection, UV-resistant materials</li>
            </ul>
            <p><strong>Design principle:</strong> Always specify Type B (DBO-B) boards unless the installation is in a restricted access area operated exclusively by skilled persons.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="IP Ratings and Environmental Protection">
            <p>IP (Ingress Protection) ratings defined by BS EN 60529 specify the level of protection provided by enclosures against solid objects and moisture. Correct IP rating selection ensures distribution board reliability and safety throughout its service life.</p>
            <p><strong>First Digit - Solid Objects</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>0:</strong> No protection</li>
              <li><strong>1:</strong> Objects &gt;50mm (hand)</li>
              <li><strong>2:</strong> Objects &gt;12.5mm (finger)</li>
              <li><strong>3:</strong> Objects &gt;2.5mm (tools)</li>
              <li><strong>4:</strong> Objects &gt;1mm (wires)</li>
              <li><strong>5:</strong> Dust protected</li>
              <li><strong>6:</strong> Dust tight</li>
            </ul>
            <p><strong>Second Digit - Moisture</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>0:</strong> No protection</li>
              <li><strong>1:</strong> Vertical dripping water</li>
              <li><strong>2:</strong> Dripping water (15° tilt)</li>
              <li><strong>3:</strong> Spraying water (60°)</li>
              <li><strong>4:</strong> Splashing water</li>
              <li><strong>5:</strong> Water jets</li>
              <li><strong>6:</strong> Powerful water jets</li>
            </ul>
            <p><strong>IP Rating Selection by Location</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Indoor dry (office, home):</strong> IP2X — IP20 or IP30</li>
              <li><strong>Kitchen/utility:</strong> IP2X — IP40 or IP41</li>
              <li><strong>Bathroom (outside zones):</strong> IP44 — IP44</li>
              <li><strong>External sheltered:</strong> IP44 — IP55</li>
              <li><strong>External exposed:</strong> IP55 — IP65 or IP66</li>
              <li><strong>Industrial dusty:</strong> IP5X — IP54 or IP55</li>
              <li><strong>Wash-down areas:</strong> IP65 — IP66 or IP67</li>
            </ul>
            <p><strong>Important:</strong> IP ratings apply with the enclosure closed. Cable entries must be properly sealed with appropriate glands to maintain the rated protection level.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Circuit Groupings and Layout Design">
            <p>Effective circuit grouping within distribution boards is governed by BS 7671 Regulation 314.1, which requires installations to be divided into circuits to avoid danger and minimise inconvenience in the event of a fault, while facilitating safe operation, inspection, and maintenance.</p>
            <p><strong>BS 7671 Circuit Division Requirements (Reg 314.1)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>- Separate circuits for different parts of the installation</li>
              <li>- Avoid danger from failure of a single circuit</li>
              <li>- Minimise possibility of unwanted tripping of RCDs</li>
              <li>- Reduce effects of electromagnetic interference</li>
              <li>- Consider load characteristics (harmonics, starting currents)</li>
            </ul>
            <p><strong>Recommended Circuit Groupings</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Lighting circuits:</strong> Separate from socket circuits; consider emergency lighting on dedicated supply</li>
              <li><strong>Socket outlets:</strong> Ring finals or radials grouped by area or floor</li>
              <li><strong>Fixed equipment:</strong> Individual circuits for large loads (cookers, showers, immersion heaters)</li>
              <li><strong>Safety circuits:</strong> Fire alarm, emergency lighting, security on separate RCDs or non-RCD protected</li>
              <li><strong>SELV/PELV:</strong> Must be segregated from higher voltage circuits per Regulation 528.1</li>
            </ul>
            <p><strong>RCD Allocation Strategy</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Socket outlets up to 32A:</strong> 30mA RCD required — Distribute across multiple RCDs</li>
              <li><strong>Lighting circuits:</strong> 30mA RCD (most cases) — Separate RCD from sockets where possible</li>
              <li><strong>Outdoor circuits:</strong> 30mA RCD required — Dedicated RCD recommended</li>
              <li><strong>Freezers/fridges:</strong> RCD protected — Separate RCD to avoid food spoilage</li>
              <li><strong>Fire alarm:</strong> May be non-RCD — Risk assessment required per Reg 411.3.3</li>
            </ul>
            <p><strong>Design tip:</strong> Use dual RCD consumer units or split-load boards to distribute circuits across two RCDs, ensuring loss of one RCD does not cause total loss of lighting or power.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Labelling, Documentation, and Installation">
            <p>BS 7671 Regulation 514.9.1 mandates comprehensive labelling and documentation for distribution boards. Proper identification enables safe operation, efficient fault diagnosis, and compliant periodic inspection throughout the installation's lifetime.</p>
            <p><strong>Required Circuit Chart Information (Reg 514.9.1)</strong></p>
            <p><strong>Mandatory Elements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>- Circuit number/reference</li>
              <li>- Type of protective device (MCB, RCBO, etc.)</li>
              <li>- Nominal current rating (In)</li>
              <li>- Circuit designation/description</li>
              <li>- Points served or area covered</li>
              <li>- Number of points (where applicable)</li>
            </ul>
            <p><strong>Additional Best Practice</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>- Cable type and size</li>
              <li>- RCD rating if applicable</li>
              <li>- Test results summary</li>
              <li>- Date of installation/last test</li>
              <li>- Reference to full test certificates</li>
              <li>- Installer identification</li>
            </ul>
            <p><strong>Warning Labels Required by BS 7671</strong></p>
            <p><strong>RCD Test Notice (Reg 514.12.2):</strong> "This installation, or part of it, is protected by a device which automatically switches off the supply if an earth fault develops. Test quarterly by pressing the button marked 'T' or 'Test'. The device should switch off the supply and should then be switched on to restore the supply. If the device does not switch off the supply when the button is pressed, seek expert advice."</p>
            <p><strong>Dual Supply Warning:</strong> Required where more than one source of supply exists</p>
            <p><strong>Voltage Warning:</strong> Where nominal voltage exceeds 230V between conductors</p>
            <p><strong>Main Switch Identification:</strong> Clear identification of the means of isolation</p>
            <p><strong>Installation Considerations</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Accessibility:</strong> Reg 132.12 — Adequate space for operation and maintenance</li>
              <li><strong>Mounting height:</strong> Best practice — Main switch 1.2-1.8m above floor level</li>
              <li><strong>Cable entry:</strong> IP maintenance — Suitable glands, maintain bending radii</li>
              <li><strong>Ventilation:</strong> Heat dissipation — Adequate clearance around enclosure</li>
              <li><strong>Spare capacity:</strong> Future expansion — Minimum 20% spare ways recommended</li>
              <li><strong>Earthing:</strong> Reg 542 — Adequate earth bar capacity, MET connection</li>
            </ul>
            <p><strong>Compliance note:</strong> Circuit charts must be accurate and updated following any modification. Inaccurate documentation creates safety risks during maintenance and emergency situations.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Domestic Consumer Unit Selection</strong>
            </p>
            <p><strong>Scenario:</strong> Specify a consumer unit for a 3-bedroom house with 12 circuits including lighting, sockets, cooker, shower, and outdoor supplies.</p>
            <p>Requirements Analysis:</p>
            <p>Circuits required: 12</p>
            <p>Spare capacity (20%): 12 × 0.2 = 2.4 ≈ 3 spare ways</p>
            <p>Total ways needed: 12 + 3 = 15 ways minimum</p>
            <p>RCD allocation:</p>
            <p>- RCD 1: Upstairs lighting, downstairs lighting, smoke alarms</p>
            <p>- RCD 2: Ring main (ground), ring main (first), kitchen sockets</p>
            <p>- Non-RCD or separate RCD: Cooker, shower, immersion</p>
            <p>Specification:</p>
            <p>- 18-way dual RCD consumer unit (or RCBO board)</p>
            <p>- 100A main switch</p>
            <p>- Type B (domestic, ordinary persons)</p>
            <p>- IP20 (indoor dry location)</p>
            <p>- Non-combustible enclosure (Amendment 3 requirement)</p>
            <p>
              <strong>Example 2: IP Rating Selection for External Board</strong>
            </p>
            <p><strong>Scenario:</strong> Select appropriate IP rating for a distribution board in an exposed car park location.</p>
            <p>Environmental Assessment:</p>
            <p>Location: External car park, no shelter</p>
            <p>Exposure: Direct rain, wind-driven spray</p>
            <p>Dust/debris: Moderate (vehicle movements)</p>
            <p>IP Rating Analysis:</p>
            <p>First digit: 5 or 6 (dust protected/tight)</p>
            <p>Second digit: 5 or 6 (water jets/powerful jets)</p>
            <p>Selection: IP65 minimum</p>
            <p>- IP66 preferred for durability</p>
            <p>Additional requirements:</p>
            <p>- UV-resistant enclosure material</p>
            <p>- Cable glands rated to match IP65/66</p>
            <p>- Drainage provision (weep holes at lowest point)</p>
            <p>- Anti-condensation heater if in humid climate</p>
            <p>
              <strong>Example 3: Three-Phase Board Layout</strong>
            </p>
            <p><strong>Scenario:</strong> Design circuit allocation for a small commercial three-phase distribution board.</p>
            <p>Load Schedule:</p>
            <p>Single-phase loads:</p>
            <p>- Lighting: 3 × 10A circuits (3.6kW each max)</p>
            <p>- Socket circuits: 6 × 32A ring finals</p>
            <p>- Fixed equipment: 3 × 20A (water heaters, etc.)</p>
            <p>Three-phase loads:</p>
            <p>- HVAC unit: 3P 32A</p>
            <p>- Lift motor: 3P 40A</p>
            <p>Phase Balancing:</p>
            <p>L1: Light 1, Ring 1, Ring 4, WH 1 = ~22kW</p>
            <p>L2: Light 2, Ring 2, Ring 5, WH 2 = ~22kW</p>
            <p>L3: Light 3, Ring 3, Ring 6, WH 3 = ~22kW</p>
            <p>Result: Balanced single-phase loading across phases</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Distribution Board Design Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Determine total number of circuits required plus 20% spare capacity</li>
              <li>Select board type (A or B) based on user access requirements</li>
              <li>Specify IP rating appropriate to installation environment</li>
              <li>Plan RCD allocation to minimise inconvenience from tripping</li>
              <li>Group circuits logically by function and location</li>
              <li>Verify prospective fault current is within board rating</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Spare capacity: <strong>Minimum 20%</strong> of total ways</li>
              <li>DBO maximum rating: <strong>250A</strong> per BS EN 61439-3</li>
              <li>Internal dry location: <strong>IP2X or IP20</strong> minimum</li>
              <li>External exposed: <strong>IP65</strong> minimum recommended</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Insufficient spare capacity</strong> - leads to costly board replacement</li>
                <li><strong>All circuits on one RCD</strong> - total loss of supply on single fault</li>
                <li><strong>Incorrect IP rating</strong> - premature failure in hostile environments</li>
                <li><strong>Missing or inaccurate circuit charts</strong> - safety risk during maintenance</li>
              </ul>
            }
            doInstead="Cross-check assumptions against published guidance, validate measured values against design intent, and engage the wider team early when interface issues emerge."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section6")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back to section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                System integration
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section6-2")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Circuit protection
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule7Section6_1;
