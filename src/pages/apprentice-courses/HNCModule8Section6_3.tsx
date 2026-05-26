/**
 * Module 8 · Section 6 · Subsection 3 — Interface Coordination
 * HNC Electrical Engineering for Building Services (HVAC Systems)
 *   MEP coordination, BIM clash detection, ceiling void coordination, installation sequencing, and design team collaboration
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

const TITLE = 'Interface Coordination - HNC Module 8 Section 6.3';
const DESCRIPTION =
  'Master interface coordination for building services: MEP coordination, BIM clash detection, ceiling void coordination, services priority rules, installation sequencing, design team meetings, RFIs, and contractor coordination procedures.';

const quickCheckQuestions = [
  {
    id: 'bim-clash-detection',
    question: 'What is the primary purpose of 3D clash detection in BIM coordination?',
    options: [
      'Description of work, sequence of operations, equipment, control measures, responsible persons',
      'To identify spatial conflicts between building services before installation',
      'The back-EMF nearly equals the supply voltage so net driving voltage is small',
      'Systematic evaluation of fire hazards and risks to implement control measures',
    ],
    correctIndex: 1,
    explanation:
      '3D clash detection in BIM coordination identifies spatial conflicts (clashes) between different building services elements before physical installation begins. This prevents costly rework, delays, and installation problems on site by resolving coordination issues during the design phase.',
  },
  {
    id: 'services-priority',
    question:
      'In a typical services priority hierarchy, which system generally takes precedence in spatial allocation?',
    options: [
      'Gravity drainage',
      'Electrical containment',
      'Data cabling',
      'Ventilation ductwork',
    ],
    correctIndex: 0,
    explanation:
      'Gravity drainage systems typically take highest priority in spatial allocation because they require specific gradients (falls) to function correctly and cannot be easily rerouted. Pressurised systems like water, electrical, and ventilation have more flexibility in routing.',
  },
  {
    id: 'rfi-purpose',
    question:
      'What is the primary purpose of a Request for Information (RFI) in the construction process?',
    options: [
      'Evaluating environmental impacts throughout a product\\\'s life from raw materials to disposal',
      'Use measures that minimise the distance and consequences of a fall',
      'Multi-core cables clipped direct to a non-metallic surface in still air.',
      'To formally seek clarification on design information or resolve discrepancies',
    ],
    correctIndex: 3,
    explanation:
      'An RFI (Request for Information) is a formal document used to seek clarification on design information, resolve discrepancies between drawings or specifications, or request missing information from the design team. RFIs create an auditable record of design decisions and changes.',
  },
  {
    id: 'coordination-meetings',
    question:
      'What is the typical frequency for MEP coordination meetings during the active installation phase?',
    options: [
      'Daily',
      'Monthly',
      'Bi-annually',
      'Weekly',
    ],
    correctIndex: 3,
    explanation:
      'During active installation phases, MEP coordination meetings are typically held weekly. This frequency allows timely resolution of coordination issues, progress monitoring, and adjustment of installation sequences whilst maintaining project momentum.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What does MEP stand for in building services coordination?',
    options: [
      'Main Electrical Panel',
      'Mechanical, Electrical, and Plumbing',
      'Multi-Element Protocol',
      'Managed Engineering Project',
    ],
    correctAnswer: 1,
    explanation:
      'MEP stands for Mechanical, Electrical, and Plumbing - the three primary building services disciplines that must be coordinated during design and construction to ensure systems work together effectively.',
  },
  {
    id: 2,
    question:
      'Which BIM Level of Detail (LOD) is typically required for detailed clash detection during construction coordination?',
    options: [
      'LOD 500',
      'LOD 100',
      'LOD 300/350',
      'LOD 200',
    ],
    correctAnswer: 2,
    explanation:
      'LOD 300/350 provides sufficient geometric detail for accurate clash detection, including specific element sizes, connection points, and routing details. LOD 100/200 are too schematic, whilst LOD 500 is as-built information.',
  },
  {
    id: 3,
    question:
      'In ceiling void coordination, what is the typical minimum clear zone required above electrical cable tray for cable installation and maintenance?',
    options: [
      '100mm',
      '50mm',
      '250mm',
      '150mm',
    ],
    correctAnswer: 3,
    explanation:
      'A minimum clear zone of 150mm is typically required above cable tray to allow for cable installation, manipulation of cables during termination, and future maintenance access. This zone must be free of other services.',
  },
  {
    id: 4,
    question: 'What type of clash is identified when two building elements occupy the same space?',
    options: [
      'Hard clash',
      'Soft clash',
      'Workflow clash',
      'Clearance clash',
    ],
    correctAnswer: 0,
    explanation:
      'A hard clash occurs when two solid elements physically occupy the same space (e.g., a duct passing through a structural beam). These must be resolved as they represent impossible physical conditions.',
  },
  {
    id: 5,
    question:
      'What document establishes the hierarchy and responsibilities for resolving coordination issues on a project?',
    options: [
      'Building Regulations Part P',
      'BIM Execution Plan (BEP)',
      'Risk Assessment',
      'Method Statement',
    ],
    correctAnswer: 1,
    explanation:
      'The BIM Execution Plan (BEP) establishes protocols for model coordination, clash detection procedures, meeting schedules, and responsibilities for resolving coordination issues throughout the project.',
  },
  {
    id: 6,
    question:
      'When services must cross in a ceiling void, what is the general rule for which service passes over the other?',
    options: [
      'Larger services always pass over smaller ones',
      'Electrical always passes over mechanical',
      'Services requiring least flexibility in routing pass below',
      'The service installed first takes priority',
    ],
    correctAnswer: 2,
    explanation:
      'Services with least routing flexibility (e.g., gravity drainage, large ductwork) generally route at lower levels, whilst more flexible services (e.g., smaller pipes, cables) route above and around them.',
  },
  {
    id: 7,
    question: "What is a 'soft clash' in BIM coordination?",
    options: [
      'Two elements physically intersecting',
      'Missing information in the model',
      'A scheduling conflict between trades',
      'An element violating required clearance or access zones',
    ],
    correctAnswer: 3,
    explanation:
      'A soft clash occurs when an element violates required clearance zones, access requirements, or maintenance space - not a physical intersection but a situation that would prevent proper installation, operation, or maintenance.',
  },
  {
    id: 8,
    question:
      'During a design coordination meeting, who typically chairs the meeting and leads clash resolution?',
    options: [
      'The MEP coordinator or BIM manager',
      'Cleaning vents and checking cables',
      'Ask questions and repeat back to confirm',
      'R1+R2 from continuity + Ze calculation',
    ],
    correctAnswer: 0,
    explanation:
      'The MEP coordinator or BIM manager typically chairs coordination meetings, as they have oversight of all services disciplines and are responsible for facilitating clash resolution between the various trade contractors.',
  },
  {
    id: 9,
    question:
      'What is the typical response timeframe expected for priority RFIs during active construction?',
    options: [
      '24 hours',
      '3-5 working days',
      '2 weeks',
      '1 month',
    ],
    correctAnswer: 1,
    explanation:
      'Priority RFIs typically require response within 3-5 working days to prevent work stoppages. Critical RFIs affecting immediate work may require faster turnaround, whilst routine queries may allow longer response times.',
  },
  {
    id: 10,
    question:
      'In installation sequencing, which electrical work typically precedes final fix activities?',
    options: [
      'Socket outlet installation',
      'Luminaire installation',
      'First fix cabling and containment',
      'Final testing and commissioning',
    ],
    correctAnswer: 2,
    explanation:
      'First fix activities (cabling, containment, back boxes) must be completed before wall finishes. Second fix (accessories, luminaires) and final connections occur after decorations, followed by testing and commissioning.',
  },
  {
    id: 11,
    question:
      'What documentation should be reviewed before attending a design coordination meeting?',
    options: [
      'Services requiring least flexibility in routing pass below',
      'A drawing overlaying all services to show spatial relationships and routing',
      'An element violating required clearance or access zones',
      'Latest clash reports, updated drawings, and outstanding RFI responses',
    ],
    correctAnswer: 3,
    explanation:
      'Effective participation in coordination meetings requires reviewing latest clash detection reports, current drawing revisions, outstanding RFIs, previous meeting minutes, and any technical submissions affecting coordination.',
  },
  {
    id: 12,
    question: 'What is a coordination drawing (sometimes called a combined services drawing)?',
    options: [
      'A drawing overlaying all services to show spatial relationships and routing',
      'Latest clash reports, updated drawings, and outstanding RFI responses',
      'Services requiring least flexibility in routing pass below',
      'An element violating required clearance or access zones',
    ],
    correctAnswer: 0,
    explanation:
      'A coordination drawing overlays all building services (mechanical, electrical, plumbing, fire protection) on a single drawing to show spatial relationships, identify potential conflicts, and establish agreed routing for all systems.',
  },
];

const faqs = [
  {
    question: 'What is the difference between 2D and 3D coordination?',
    answer:
      'Traditional 2D coordination involves overlaying plan drawings from different disciplines to identify conflicts - this only shows horizontal clashes and can miss vertical conflicts. 3D BIM coordination creates federated models containing all services in three dimensions, enabling automated clash detection of both horizontal and vertical conflicts, accurate quantity extraction, and visualisation of complex intersections. 3D coordination is now standard for major projects and significantly reduces site conflicts.',
  },
  {
    question: 'How should electrical contractors prepare for coordination meetings?',
    answer:
      'Electrical contractors should prepare by: reviewing the latest federated model and clash reports, updating their own model with current design information, preparing a list of outstanding coordination issues, reviewing responses to RFIs, checking programme dates against their installation sequence, and bringing technical documentation for items requiring spatial coordination (e.g., switchgear dimensions, cable bending radii). Always attend with decision-making authority or clear communication back to decision-makers.',
  },
  {
    question: 'What happens when a clash cannot be resolved within the ceiling void?',
    answer:
      'When services cannot fit within the allocated ceiling void, options include: lowering the ceiling to increase void depth (requires architect approval and affects room heights), boxing out services below ceiling level (visual and spatial impact), rerouting services through alternative paths (may increase runs and costs), or using smaller alternative equipment where available. All solutions require formal approval through the design team and may generate variation orders if outside original scope.',
  },
  {
    question: 'How are coordination issues prioritised for resolution?',
    answer:
      'Coordination issues are typically prioritised based on: impact on the construction programme (issues affecting imminent work take priority), safety implications, cost of rework if not resolved, number of trades affected, and complexity of resolution. Critical path activities always take precedence. A formal clash resolution priority matrix should be established in the BIM Execution Plan to ensure consistent decision-making.',
  },
  {
    question: 'What role does the principal contractor play in MEP coordination?',
    answer:
      'The principal contractor is responsible for overall project coordination, including: establishing coordination meeting schedules, providing the coordination procedure and protocols, maintaining the master programme, facilitating resolution of inter-trade conflicts, ensuring adequate time and resources for coordination activities, and making final decisions when trades cannot agree. They also ensure coordination outputs are properly documented and distributed.',
  },
  {
    question: 'When should coordination activities begin on a project?',
    answer:
      'Coordination should begin during design development, not wait until construction. Early coordination (RIBA Stage 3-4) identifies major routing conflicts and allows design modifications before tender. Detailed coordination continues through construction, with formal clash detection runs at key milestones. The earlier coordination issues are identified, the lower the cost of resolution. Waiting until site installation to coordinate is the most expensive approach.',
  },
];

const HNCModule8Section6_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section6")}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 8 · Section 6 · Subsection 3"
            title="Interface Coordination"
            description="MEP coordination, BIM clash detection, ceiling void coordination, installation sequencing, and design team collaboration"
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              "Understand MEP coordination principles and stakeholder roles",
              "Apply BIM coordination and 3D clash detection techniques",
              "Coordinate services within ceiling voids using priority rules",
              "Develop effective installation sequencing strategies",
              "Participate effectively in design coordination meetings",
              "Manage RFIs and contractor coordination procedures",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="MEP Coordination Fundamentals">
            <p>MEP (Mechanical, Electrical, and Plumbing) coordination is the process of integrating all building services systems to ensure they can be installed and operated without spatial conflicts. Effective coordination prevents costly rework, delays, and compromised system performance.</p>
            <p><strong>Key coordination stakeholders:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>MEP Coordinator/BIM Manager:</strong> Leads coordination process, manages federated models, chairs meetings</li>
              <li><strong>Design consultants:</strong> M&amp;E engineers, architects providing design intent and resolving technical queries</li>
              <li><strong>Trade contractors:</strong> Responsible for detailed design and installation of their systems</li>
              <li><strong>Principal contractor:</strong> Overall responsibility for coordination, programme, and conflict resolution</li>
              <li><strong>Client/Employer:</strong> Approves changes affecting cost, programme, or design</li>
            </ul>
            <p><strong>MEP Coordination Workflow</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Design Development:</strong> Initial routing studies, spatial allocation — Coordination strategy, zone allocations</li>
              <li><strong>Technical Design:</strong> Detailed routing, equipment positioning — Coordinated BIM model, clash reports</li>
              <li><strong>Pre-Construction:</strong> Contractor input, clash resolution — Installation drawings, sequences</li>
              <li><strong>Construction:</strong> Ongoing coordination, site verification — As-built records, commissioning data</li>
            </ul>
            <p><strong>Benefits of Effective Coordination</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Reduced rework and abortive costs</li>
              <li>Minimised programme delays</li>
              <li>Improved buildability and access</li>
              <li>Better system performance</li>
              <li>Clearer installation sequences</li>
            </ul>
            <p><strong>Common Coordination Challenges</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Late design changes</li>
              <li>Insufficient ceiling void depth</li>
              <li>Missing or outdated information</li>
              <li>Conflicting programme requirements</li>
              <li>Unclear responsibility boundaries</li>
            </ul>
            <p><strong>Key principle:</strong> The cost of resolving coordination issues increases exponentially as the project progresses. Issues identified during design cost significantly less to resolve than those found during installation.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="BIM Coordination and Clash Detection">
            <p>Building Information Modelling (BIM) has transformed MEP coordination by enabling 3D spatial coordination and automated clash detection. Federated models combine individual discipline models to identify conflicts that would be difficult to spot in 2D drawings.</p>
            <p><strong>Clash Detection Types</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Hard Clash:</strong> Physical intersection of solid elements — Duct passing through steel beam — Must resolve - impossible condition</li>
              <li><strong>Soft Clash:</strong> Violation of clearance zones — Cable tray within access zone of valve — High - affects operation/maintenance</li>
              <li><strong>Workflow Clash:</strong> Installation sequence conflict — Access blocked by earlier installation — Medium - affects programme</li>
              <li><strong>Clearance Clash:</strong> Insufficient space for installation — Cable bending radius compromised — High - affects installation quality</li>
            </ul>
            <p><strong>BIM Level of Development (LOD) for Coordination</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>LOD 200:</strong> Approximate geometry, generic placeholders — Early spatial studies</li>
              <li><strong>LOD 300:</strong> Accurate geometry, specific element sizes — Design coordination</li>
              <li><strong>LOD 350:</strong> LOD 300 + interfaces and supports — Construction coordination</li>
              <li><strong>LOD 400:</strong> Fabrication-ready detail — Prefabrication, detailed sequencing</li>
            </ul>
            <p><strong>Clash Detection Workflow</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Model federation:</strong> Combine all discipline models into single coordination model</li>
              <li><strong>Define clash rules:</strong> Set tolerance values and element groupings to test</li>
              <li><strong>Run clash detection:</strong> Execute automated clash tests (Navisworks, Solibri, etc.)</li>
              <li><strong>Review and classify:</strong> Filter false positives, categorise by severity and responsibility</li>
              <li><strong>Assign resolution:</strong> Allocate clashes to responsible parties with target dates</li>
              <li><strong>Track to closure:</strong> Monitor resolution progress, verify fixes in updated models</li>
            </ul>
            <p><strong>Electrical Elements to Model</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Switchgear and distribution boards</li>
              <li>Cable tray, ladder, and trunking</li>
              <li>Large cable runs (&gt;50mm diameter)</li>
              <li>Busbar systems</li>
              <li>Lighting and power outlets (zone level)</li>
              <li>Major equipment (transformers, UPS)</li>
            </ul>
            <p><strong>Typical Clash Tolerances</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Hard clash detection: 0mm tolerance</li>
              <li>Insulation allowance: 25-50mm</li>
              <li>Access clearance: 150-300mm</li>
              <li>Maintenance zones: per equipment spec</li>
              <li>Cable bending radii: 6-12× diameter</li>
            </ul>
            <p><strong>BIM coordination tip:</strong> Run clash detection at regular intervals (typically weekly during design development) rather than waiting for complete models. This identifies issues early when they are easier to resolve.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Ceiling Void Coordination">
            <p>Ceiling voids are typically the most congested areas for building services, requiring careful coordination to ensure all systems fit whilst maintaining access for installation and maintenance. A structured approach to zone allocation and services priority is essential.</p>
            <p><strong>Services Priority Hierarchy (Typical)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>1 - Highest:</strong> Gravity drainage — Lowest level — Requires falls, cannot be pressurised</li>
              <li><strong>2:</strong> Large ductwork — Lower-middle — Large cross-section, limited flexibility</li>
              <li><strong>3:</strong> Fire sprinklers — Middle — Head positions fixed, some flexibility</li>
              <li><strong>4:</strong> Pipework (LTHW, CHW) — Middle-upper — Pressurised, moderate flexibility</li>
              <li><strong>5:</strong> Cable containment — Upper level — High flexibility, small cross-section</li>
              <li><strong>6:</strong> Data/comms cabling — Highest level — Most flexible, smallest elements</li>
            </ul>
            <p><strong>Typical Ceiling Void Zone Allocation</strong></p>
            <p>━━━━━━━━━━━━━━━━━━━━━━━ Structural soffit</p>
            <p>│ Zone 1: Structure &amp; fire protection (150mm+)</p>
            <p>├─────────────────────────────────────────</p>
            <p>│ Zone 2: Large ductwork (300-600mm)</p>
            <p>├─────────────────────────────────────────</p>
            <p>│ Zone 3: Pipework &amp; small ducts (150-200mm)</p>
            <p>├─────────────────────────────────────────</p>
            <p>│ Zone 4: Cable containment (100-200mm)</p>
            <p>├─────────────────────────────────────────</p>
            <p>│ Zone 5: Lighting &amp; ceiling grid (100mm)</p>
            <p>━━━━━━━━━━━━━━━━━━━━━━━ Ceiling level</p>
            <p><strong>Electrical Void Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>150mm clear above cable tray for cabling</li>
              <li>Segregation between power and data</li>
              <li>Access for cable pulling and changes</li>
              <li>Support spacing per manufacturer spec</li>
              <li>Fire stopping at compartment boundaries</li>
            </ul>
            <p><strong>Crossing Rules</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Services cross at 90° where possible</li>
              <li>Lower priority services divert around higher</li>
              <li>Maintain access to valves and junction boxes</li>
              <li>Avoid crossing directly above access panels</li>
              <li>Document all agreed crossing points</li>
            </ul>
            <p><strong>Common Ceiling Void Coordination Failures</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Insufficient void depth:</strong> Services cannot fit - requires ceiling lowering or rerouting</li>
              <li><strong>Blocked access:</strong> Maintenance items inaccessible after installation</li>
              <li><strong>Fire stopping conflicts:</strong> Services routed through fire compartment boundaries without planned penetrations</li>
              <li><strong>Lighting clashes:</strong> Luminaire positions conflict with ductwork or sprinklers</li>
              <li><strong>Support clashes:</strong> Multiple trades fixing to same structural elements</li>
            </ul>
            <p><strong>Coordination tip:</strong> Always verify the actual structural soffit level on site before finalising ceiling void coordination - design drawings may show nominal levels that differ from as-built conditions.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Installation Sequencing and Design Team Coordination">
            <p>Successful building services installation requires careful sequencing to ensure trades can work efficiently without blocking each other's access or reworking installed systems. Design team coordination through formal meetings and RFI processes ensures information flows effectively.</p>
            <p><strong>Typical Electrical Installation Sequence</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>1. First Fix:</strong> Containment, back boxes, cabling to points — Structural completion, wall framing</li>
              <li><strong>2. Equipment Install:</strong> Distribution boards, switchgear, major plant — First fix complete, plant room ready</li>
              <li><strong>3. Second Fix:</strong> Accessories, luminaires, final connections — Wall finishes, ceiling grid installed</li>
              <li><strong>4. Testing:</strong> Dead testing, live testing, commissioning — Second fix complete, power available</li>
              <li><strong>5. Integration:</strong> BMS integration, systems commissioning — All M&amp;E systems operational</li>
            </ul>
            <p><strong>Design Coordination Meetings</strong></p>
            <p>Regular coordination meetings bring together all stakeholders to review progress, resolve clashes, and agree installation sequences. Effective meetings require preparation and follow-up.</p>
            <p><strong>Pre-Meeting Preparation:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Review latest clash detection report</li>
              <li>Update your discipline model</li>
              <li>Prepare list of outstanding issues</li>
              <li>Review previous meeting actions</li>
              <li>Check RFI responses received</li>
            </ul>
            <p><strong>Meeting Outputs:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Documented clash resolutions</li>
              <li>Action items with owners and dates</li>
              <li>Agreed design changes</li>
              <li>Updated coordination drawings</li>
              <li>Next meeting date and agenda</li>
            </ul>
            <p><strong>Request for Information (RFI) Process</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Clarification:</strong> Unclear specification or drawing detail — 3-5 working days</li>
              <li><strong>Discrepancy:</strong> Conflict between drawings or specifications — 3-5 working days</li>
              <li><strong>Missing Information:</strong> Information required but not provided — 5-10 working days</li>
              <li><strong>Design Change:</strong> Proposed change to design intent — 10+ working days</li>
              <li><strong>Critical/Urgent:</strong> Issue blocking imminent work — 24-48 hours</li>
            </ul>
            <p><strong>RFI Best Practice</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Be specific:</strong> Reference exact drawing numbers, specification clauses, and locations</li>
              <li><strong>Include context:</strong> Explain why the information is needed and impact of delay</li>
              <li><strong>Propose solutions:</strong> Where possible, suggest potential resolutions for consideration</li>
              <li><strong>Attach evidence:</strong> Include marked-up drawings, photographs, or clash reports</li>
              <li><strong>Track responses:</strong> Log all RFIs and chase overdue responses systematically</li>
              <li><strong>Update drawings:</strong> Ensure RFI responses are incorporated into working drawings</li>
            </ul>
            <p><strong>Trade Coordination Interfaces</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Structural - fixings, penetrations, loads</li>
              <li>Mechanical - power supplies, controls</li>
              <li>Plumbing - pump power, controls wiring</li>
              <li>Fire - alarm, suppression interfaces</li>
              <li>Security - access control, CCTV power</li>
              <li>Lifts - power supply, controls</li>
            </ul>
            <p><strong>Contractor Coordination Procedures</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Weekly coordination meetings</li>
              <li>3-week look-ahead programmes</li>
              <li>Daily site coordination briefings</li>
              <li>Formal hand-over of completed areas</li>
              <li>Shared coordination drawings</li>
              <li>Access and isolation protocols</li>
            </ul>
            <p><strong>Programme Coordination Risks</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Delayed information:</strong> RFI responses arriving after work window has passed</li>
              <li><strong>Access conflicts:</strong> Multiple trades requiring same area simultaneously</li>
              <li><strong>Late design changes:</strong> Changes after installation has commenced</li>
              <li><strong>Resource clashes:</strong> Insufficient labour to meet programme requirements</li>
              <li><strong>Material delays:</strong> Long-lead items not ordered in time</li>
            </ul>
            <p><strong>Key success factor:</strong> Proactive coordination - identifying and resolving issues before they impact the programme - is far more effective than reactive problem-solving after delays occur.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Resolving a Ceiling Void Clash</strong>
            </p>
            <p><strong>Scenario:</strong> A 400×300mm supply air duct and a 150mm cable tray both require routing through a corridor ceiling void with only 500mm clear height. The duct must maintain level for downstream connections.</p>
            <p>Available void height: 500mm</p>
            <p>Duct height: 300mm + 25mm insulation = 325mm</p>
            <p>Cable tray: 150mm (including cables and clearance above)</p>
            <p>Total if stacked: 325mm + 150mm = 475mm</p>
            <p>Analysis:</p>
            <p>- Duct cannot move down (requires level routing)</p>
            <p>- Cable tray can route above duct at crossings</p>
            <p>- At crossing points, cables run in tray above duct</p>
            <p>- Parallel runs have duct below, tray to side/above</p>
            <p>Solution: Cable tray routes above duct at 475mm from ceiling,</p>
            <p>drops to normal level either side of duct run.</p>
            <p>Remaining clearance: 500mm - 475mm = 25mm (acceptable)</p>
            <p>
              <strong>Example 2: RFI for Specification Discrepancy</strong>
            </p>
            <p><strong>Scenario:</strong> The electrical specification calls for IP65-rated luminaires in a plant room, but the lighting schedule shows IP20-rated fittings. Clarification is required before ordering.</p>
            <p>RFI Content Structure:</p>
            <p><strong>Reference:</strong> Spec Section 21.3.4 vs Drawing E-401 Schedule</p>
            <p><strong>Location:</strong> Plant Room PR-01, Ground Floor</p>
            <p><strong>Issue:</strong> Specification clause 21.3.4 requires IP65 minimum</p>
            <p>for plant room luminaires. Drawing E-401 lighting schedule</p>
            <p>item LUM-07 shows Manufacturer X Model ABC rated IP20.</p>
            <p><strong>Impact:</strong> Luminaire order required by [date] to meet</p>
            <p>programme. IP rating affects cost and lead time.</p>
            <p><strong>Proposed Resolution Options:</strong></p>
            <p>1. Confirm IP65 - recommend Model DEF (4 week lead)</p>
            <p>2. Revise spec to permit IP20 in this location</p>
            <p>Response Required By: [date - 5 days before order deadline]</p>
            <p>
              <strong>Example 3: Installation Sequence Planning</strong>
            </p>
            <p><strong>Scenario:</strong> Plan the electrical installation sequence for an office floor where the ceiling contractor, mechanical contractor, and sprinkler contractor are all working concurrently.</p>
            <p>Coordination Requirements:</p>
            <p>Week 1-2: Zone A - First fix coordination</p>
            <p>- Day 1-2: Sprinkler mains at high level (Priority 1)</p>
            <p>- Day 2-4: Ductwork installation (Priority 2)</p>
            <p>- Day 3-5: Cable containment above duct (Priority 3)</p>
            <p>- Day 5-7: First fix cabling to points</p>
            <p>Week 3: Zone A - Ceiling close-up preparation</p>
            <p>- Photographic record of above-ceiling work</p>
            <p>- Inspection and sign-off by all trades</p>
            <p>- Fire stopping completion</p>
            <p>Week 4: Zone A - Second fix</p>
            <p>- Ceiling grid installation (ceiling contractor)</p>
            <p>- Luminaire installation (electrical)</p>
            <p>- Diffuser installation (mechanical)</p>
            <p>- Sprinkler heads (sprinkler contractor)</p>
            <p>Key Interface: All above-ceiling work must complete before</p>
            <p>ceiling grid. Daily coordination briefing at 07:30.</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Coordination Meeting Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Latest clash detection report reviewed and responses prepared</li>
              <li>Updated BIM model submitted to coordination folder</li>
              <li>Outstanding RFI status checked and chased if overdue</li>
              <li>Previous meeting actions completed or update prepared</li>
              <li>Three-week look-ahead programme reviewed for conflicts</li>
              <li>Technical submissions status updated</li>
            </ul>
            <p>
              <strong>Key Coordination Documents:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>BIM Execution Plan (BEP):</strong> Coordination protocols and responsibilities</li>
              <li><strong>Coordination drawings:</strong> Agreed routing and spatial allocation</li>
              <li><strong>Clash detection reports:</strong> Outstanding issues and resolutions</li>
              <li><strong>RFI log:</strong> Questions raised and responses received</li>
              <li><strong>Meeting minutes:</strong> Decisions made and actions assigned</li>
              <li><strong>Installation sequence:</strong> Agreed order of work between trades</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Proceeding without coordination:</strong> Installing without reviewing latest clash reports</li>
                <li><strong>Verbal agreements only:</strong> All coordination decisions must be documented</li>
                <li><strong>Ignoring soft clashes:</strong> Access and maintenance requirements are critical</li>
                <li><strong>Late model updates:</strong> Coordination relies on current information</li>
                <li><strong>Missing interfaces:</strong> Failing to coordinate with all affected trades</li>
                <li><strong>Programme optimism:</strong> Underestimating time for coordination resolution</li>
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
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section6-2")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Plant room design
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section6-4")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Commissioning procedures
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule8Section6_3;
