/**
 * Module 7 · Section 1 · Subsection 2 — Busbar Systems
 * HNC Electrical Engineering for Building Services (Power and Lighting Systems)
 *   Busbar trunking, rising mains, tap-off units, ratings, and installation requirements for building services
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

const TITLE = 'Busbar Systems - HNC Module 7 Section 1.2';
const DESCRIPTION =
  'Master busbar trunking systems for building services: rising mains, tap-off units, current ratings, IP ratings, fire barriers, and installation requirements per BS 7671.';

const quickCheckQuestions = [
  {
    id: 'busbar-advantage',
    question: 'What is the primary advantage of busbar trunking over traditional cable systems?',
    options: [
      'Atmospheric pressure (typically 101.325 kPa)',
      'Voltage induced in the armature that opposes the supply voltage',
      'Flexibility for future modifications and tap-off connections',
      'Upstream devices to wait for downstream to clear faults',
    ],
    correctIndex: 2,
    explanation:
      'Busbar trunking provides excellent flexibility for future modifications. Tap-off units can be added, removed, or relocated along the busbar run without major rewiring, making it ideal for buildings where power distribution needs may change.',
  },
  {
    id: 'rising-main-purpose',
    question: 'What is the primary purpose of a rising main in a multi-storey building?',
    options: [
      'To distribute power vertically through the building floors',
      'Dividing the building into areas with similar thermal conditions',
      'Prevents cumulative errors and maintains accuracy',
      'By visually checking core colours at terminations',
    ],
    correctIndex: 0,
    explanation:
      'A rising main is a vertical busbar trunking system that distributes electrical power from the main switchboard up through multiple floors, allowing tap-off connections at each level for floor distribution boards.',
  },
  {
    id: 'tap-off-function',
    question: 'What is the function of a tap-off unit in a busbar system?',
    options: [
      'Implement standard protocols and data normalisation',
      'To provide a connection point for drawing power from the busbar',
      'Adequate separation or protection from non-electrical services',
      'Stop work and discuss solutions with relevant parties',
    ],
    correctIndex: 1,
    explanation:
      'A tap-off unit (also called a plug-in unit) provides a safe connection point to draw power from the busbar. It typically includes a fuse or circuit breaker for overcurrent protection and can be connected while the busbar remains energised (subject to design).',
  },
  {
    id: 'fire-barrier-requirement',
    question: 'When a busbar rises through a fire compartment floor, what is required?',
    options: [
      'False - apprentices must hand over responsibility to competent persons',
      'Fire barriers must be installed to maintain compartmentation',
      'One or more competent persons to assist with health and safety compliance',
      'Lined duct sections (splitter attenuators)',
    ],
    correctIndex: 1,
    explanation:
      'When busbar trunking penetrates fire compartment boundaries (floors or walls), fire barriers must be installed around the busbar to maintain the fire resistance of the building element, typically matching the fire rating of the floor/wall being penetrated.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What is the typical construction material for busbar conductors in commercial installations?',
    options: [
      'Steel',
      'Copper or aluminium',
      'Silver-plated brass',
      'Zinc-coated iron',
    ],
    correctAnswer: 1,
    explanation:
      'Busbar conductors are typically manufactured from copper or aluminium. Copper offers better conductivity but aluminium is lighter and more cost-effective for larger installations. Both are enclosed in protective housings.',
  },
  {
    id: 2,
    question: 'What IP rating is typically required for busbar trunking installed in plant rooms?',
    options: [
      'IP68',
      'IP20',
      'IP54 or higher',
      'IP40',
    ],
    correctAnswer: 2,
    explanation:
      'Plant rooms may be subject to water ingress, dust, and maintenance activities. IP54 or higher is typically specified to provide protection against dust ingress and water splashing from any direction.',
  },
  {
    id: 3,
    question:
      'According to BS 7671, what must be considered when selecting busbar trunking current ratings?',
    options: [
      'At the basement/ground floor intake position',
      'To accommodate thermal expansion and contraction',
      'Lower impedance and better short-circuit performance',
      'Ambient temperature, grouping, and installation method',
    ],
    correctAnswer: 3,
    explanation:
      'Busbar current ratings must be derated for ambient temperature (typically rated at 35C), grouping with other heat sources, and installation method. Vertical rising mains may have different ratings than horizontal runs due to convection effects.',
  },
  {
    id: 4,
    question: 'What is the purpose of an expansion joint in a long busbar run?',
    options: [
      'To accommodate thermal expansion and contraction',
      'At the basement/ground floor intake position',
      'Ambient temperature, grouping, and installation method',
      'Lower impedance and better short-circuit performance',
    ],
    correctAnswer: 0,
    explanation:
      'Expansion joints accommodate thermal expansion and contraction of the busbar conductors caused by load cycling and ambient temperature changes. Without them, thermal stress could damage joints and enclosures.',
  },
  {
    id: 5,
    question: 'What type of tap-off unit allows connection without isolating the busbar?',
    options: [
      'Decreasing values over time',
      'Live tap-off (plug-in) unit',
      '(Full flush + Reduced flush) / 3',
      '5th, 7th, 11th, 13th harmonics',
    ],
    correctAnswer: 1,
    explanation:
      'Live tap-off (plug-in) units are designed to be safely connected and disconnected while the busbar remains energised. They incorporate shuttered contacts and are touch-safe when partially inserted.',
  },
  {
    id: 6,
    question:
      'For a rising main serving 10 floors, where should the main protective device be located?',
    options: [
      'Ambient temperature, grouping, and installation method',
      'To accommodate thermal expansion and contraction',
      'At the basement/ground floor intake position',
      '600mm as per manufacturer\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s requirements',
    ],
    correctAnswer: 2,
    explanation:
      'The main protective device for a rising main should be located at the origin of the busbar system, typically at basement or ground floor level where the main switchboard is located. This protects the entire rising main from overcurrent.',
  },
  {
    id: 7,
    question: 'What documentation must be provided with busbar trunking installation?',
    options: [
      "Ambient temperature, grouping, and installation method",
      "Support brackets at specified intervals and thermal expansion allowance",
      "By a dedicated earth conductor within the busbar and bonded enclosure sections",
      "Type test certificates, installation certificates, and manufacturer's data",
    ],
    correctAnswer: 3,
    explanation:
      "Busbar installations require type test certificates demonstrating compliance with standards, installation certificates confirming correct installation, manufacturer's technical data including ratings and derating factors, and maintenance requirements.",
  },
  {
    id: 8,
    question:
      'What is the typical fire barrier rating required when busbar penetrates a 2-hour fire compartment floor?',
    options: [
      '2 hours minimum',
      'No specific requirement',
      '30 minutes',
      '1 hour',
    ],
    correctAnswer: 0,
    explanation:
      'Fire barriers around services penetrations must provide fire resistance equal to or greater than the element being penetrated. A 2-hour fire compartment floor requires fire barriers with a minimum 2-hour rating.',
  },
  {
    id: 9,
    question: 'What advantage does sandwich-type busbar construction offer?',
    options: [
      '600mm as per manufacturer\\\\\\\\\\\\\\\'s requirements',
      'Lower impedance and better short-circuit performance',
      'To accommodate thermal expansion and contraction',
      'Ambient temperature, grouping, and installation method',
    ],
    correctAnswer: 1,
    explanation:
      'Sandwich construction places phase conductors in close proximity with minimal air gap, reducing the reactance (impedance) of the busbar system. This provides better voltage regulation and higher prospective short-circuit current capacity.',
  },
  {
    id: 10,
    question:
      'When installing busbar trunking vertically, what additional consideration is required?',
    options: [
      'By a dedicated earth conductor within the busbar and bonded enclosure sections',
      'Lower impedance and better short-circuit performance',
      'Support brackets at specified intervals and thermal expansion allowance',
      'Type test certificates, installation certificates, and manufacturer\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s data',
    ],
    correctAnswer: 2,
    explanation:
      'Vertical busbar runs require support brackets at manufacturer-specified intervals (typically every 2-3 metres) to carry the weight. Thermal expansion must also be accommodated as heat rises, creating temperature differentials along the run.',
  },
  {
    id: 11,
    question:
      'What is the minimum clearance typically required around busbar trunking for maintenance access?',
    options: [
      "To accommodate thermal expansion and contraction",
      "At the basement/ground floor intake position",
      "Lower impedance and better short-circuit performance",
      "600mm as per manufacturer's requirements",
    ],
    correctAnswer: 3,
    explanation:
      "Manufacturers typically specify minimum clearances of 600mm for access to tap-off points and maintenance. This should be confirmed with the specific manufacturer's installation requirements and coordinated with other services.",
  },
  {
    id: 12,
    question: 'How is earth continuity maintained throughout a busbar trunking system?',
    options: [
      'By a dedicated earth conductor within the busbar and bonded enclosure sections',
      'Only if trained, it\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s safe to do so, you have the right extinguisher, and the fire is small',
      'An apprentice who asks for feedback after failing a practical assessment and practises the weak areas',
      'The vertical distance between two consecutive ledger levels',
    ],
    correctAnswer: 0,
    explanation:
      'Earth continuity is maintained by a dedicated protective conductor (PE bar) within the busbar trunking, plus bonding of the metal enclosure sections. Joint designs ensure continuity is maintained through bolted connections with specified torque values.',
  },
];

const faqs = [
  {
    question: 'When should busbar trunking be specified instead of cables?',
    answer:
      'Busbar trunking is typically specified for: high current loads (&gt;400A) where multiple cables would be required, installations requiring flexibility for future modifications, rising mains in multi-storey buildings, situations where quick installation is essential, and where tap-off connections will be required along the distribution route. Cable systems may be more economical for lower currents, simple point-to-point connections, or where routing is complex.',
  },
  {
    question: 'How do I determine the correct busbar rating for a rising main?',
    answer:
      "Calculate the maximum demand using diversity factors per BS 7671 for all floors served. Apply derating factors for ambient temperature, altitude if applicable, and installation orientation. Allow margin for future load growth (typically 20-30%). Consider short-circuit ratings and coordinate with upstream protective devices. Always verify with manufacturer's data sheets for the specific product.",
  },
  {
    question: 'Can tap-off units be added to an existing busbar system?',
    answer:
      'Yes, this is a key advantage of busbar systems. Most modern busbar trunking is designed for tap-off units to be added, removed, or relocated. However, you must verify: sufficient spare capacity exists, the tap-off unit is compatible with the busbar type, and appropriate isolation procedures are followed. Some tap-off designs allow live connection; others require the busbar to be de-energised.',
  },
  {
    question: 'What maintenance does busbar trunking require?',
    answer:
      "Regular maintenance includes: visual inspection for damage or overheating signs, thermal imaging during operation to identify hot joints, checking joint torques (especially after initial thermal cycling), verifying fire barrier integrity, testing earth continuity, and cleaning ventilation openings if present. Manufacturer's maintenance schedules should be followed, typically annually for visual checks with more detailed inspections every 3-5 years.",
  },
  {
    question: 'How are fire barriers installed around busbar trunking?',
    answer:
      'Fire barriers are installed by: cutting the barrier material to fit closely around the busbar enclosure, installing intumescent collars or wraps that expand when heated to seal gaps, applying fire-rated sealant around remaining gaps, and ensuring the barrier is properly supported. Installation must be by competent persons using tested proprietary systems appropriate for the fire rating required and the specific busbar product.',
  },
  {
    question: 'What testing is required after busbar installation?',
    answer:
      'Required tests include: continuity of protective conductors (earth bar and enclosure bonding), insulation resistance between phases and phase-to-earth, verification of correct phase rotation, joint torque verification, earth fault loop impedance at tap-off points, and functional testing of any integral protective devices. Results must be documented on the appropriate electrical installation certificate.',
  },
];

const HNCModule7Section1_2 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section1")}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 7 · Section 1 · Subsection 2"
            title="Busbar Systems"
            description="Busbar trunking, rising mains, tap-off units, ratings, and installation requirements for building services"
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              "Understand busbar trunking construction and types",
              "Design rising main systems for multi-storey buildings",
              "Select appropriate tap-off units and connection methods",
              "Apply current and IP ratings for different environments",
              "Implement fire barriers at compartment penetrations",
              "Install busbar systems compliant with BS 7671",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Busbar Trunking Fundamentals">
            <p>Busbar trunking systems (also known as busways) are prefabricated electrical distribution systems consisting of copper or aluminium conductors enclosed in a protective housing. They provide an efficient alternative to traditional cable systems for distributing electrical power in commercial and industrial buildings.</p>
            <p><strong>Key components of busbar trunking:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Conductors:</strong> Copper or aluminium bars carrying current (L1, L2, L3, N, PE)</li>
              <li><strong>Insulation:</strong> Epoxy, polyester film, or air gap insulation between phases</li>
              <li><strong>Enclosure:</strong> Steel or aluminium housing providing mechanical protection</li>
              <li><strong>Joints:</strong> Bolted connections between sections with specified torque values</li>
            </ul>
            <p><strong>Busbar Construction Types</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Air-insulated:</strong> Conductors separated by air gaps — Lighting trunking, low-current distribution</li>
              <li><strong>Sandwich (compact):</strong> Conductors in close proximity with film insulation — High-current feeder runs, low impedance required</li>
              <li><strong>Cast resin:</strong> Conductors encapsulated in epoxy resin — Harsh environments, high IP rating required</li>
              <li><strong>Segregated phase:</strong> Each phase in separate metal enclosure — Very high currents (&gt;3000A), enhanced safety</li>
            </ul>
            <p><strong>Design principle:</strong> Busbar trunking offers significant advantages over cables including faster installation, flexibility for modifications, better heat dissipation, and reduced fire load in the building.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Rising Mains for Multi-Storey Buildings">
            <p>Rising mains are vertical busbar trunking systems that distribute electrical power from the main switchboard (typically at basement or ground level) up through multiple floors of a building. They are essential for efficient power distribution in high-rise commercial and residential buildings.</p>
            <p><strong>Design Considerations</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Total connected load per floor</li>
              <li>Diversity factors applied</li>
              <li>Future load growth allowance</li>
              <li>Short-circuit ratings</li>
            </ul>
            <p><strong>Structural Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Dedicated riser shaft/cupboard</li>
              <li>Support brackets at intervals</li>
              <li>Floor penetration openings</li>
              <li>Maintenance access space</li>
            </ul>
            <p><strong>Fire Safety Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Fire barriers at each floor</li>
              <li>Intumescent sealing systems</li>
              <li>Smoke stopping measures</li>
              <li>Fire-rated riser enclosure</li>
            </ul>
            <p><strong>Rising Main Sizing Considerations</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Ambient temperature:</strong> Derating if above 35C — 0.95 at 40C, 0.90 at 45C</li>
              <li><strong>Installation orientation:</strong> Vertical ratings may differ from horizontal — Typically same or slightly higher vertically</li>
              <li><strong>Altitude:</strong> Derating above 2000m — 0.98 per 500m above 2000m</li>
              <li><strong>Harmonic content:</strong> Additional neutral loading — Size neutral for 1.5x or double neutral</li>
              <li><strong>Future growth:</strong> Allowance for load increases — Typically 20-30% spare capacity</li>
            </ul>
            <p><strong>Best practice:</strong> Rising mains should be sized for the maximum anticipated load over the building's life, as replacement is extremely disruptive and costly.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Tap-Off Units, Ratings and IP Protection">
            <p>Tap-off units (also called plug-in units or tap boxes) provide connection points along the busbar trunking for drawing power to distribution boards or equipment. They are a key advantage of busbar systems, allowing flexible connection and modification throughout the building's life.</p>
            <p><strong>Tap-Off Unit Types</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Plug-in (live):</strong> Can be connected/disconnected with busbar energised - shuttered contacts for safety</li>
              <li><strong>Bolt-on:</strong> Bolted connection requiring busbar isolation - higher fault ratings available</li>
              <li><strong>Cable tap:</strong> Provides cable termination for connection to remote equipment</li>
              <li><strong>Motor starter:</strong> Integrated DOL or star-delta starter for motor connection</li>
            </ul>
            <p><strong>Current Rating Ranges</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Lighting trunking:</strong> 25A to 63A - for lighting and small power distribution</li>
              <li><strong>Feeder trunking:</strong> 100A to 1000A - for sub-distribution and equipment feeds</li>
              <li><strong>High-power trunking:</strong> 1000A to 6300A - main distribution from transformers</li>
              <li><strong>Tap-off units:</strong> Typically 16A to 630A dependent on busbar system</li>
            </ul>
            <p><strong>IP Ratings for Different Environments</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Office/commercial (dry):</strong> IP40 — Protection against objects &gt;1mm</li>
              <li><strong>Plant rooms:</strong> IP54 — Dust protected, splash resistant</li>
              <li><strong>Industrial/warehouse:</strong> IP55 — Dust protected, water jet resistant</li>
              <li><strong>Outdoor/wet areas:</strong> IP65 to IP68 — Dust tight, water immersion protection</li>
              <li><strong>Data centres:</strong> IP54 — Clean environment but water detection systems</li>
            </ul>
            <p><strong>Selection tip:</strong> When specifying tap-off units, consider the short-circuit rating as well as the continuous current rating - the tap-off must withstand prospective fault currents until cleared by protective devices.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Installation Requirements per BS 7671">
            <p>BS 7671 and BS EN 61439-6 set out requirements for busbar trunking installation. Compliance with manufacturer's instructions is essential as busbar systems are type-tested assemblies where installation parameters affect the certified ratings.</p>
            <p><strong>Key Installation Requirements</strong></p>
            <p><strong>Physical Installation</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Support brackets at specified intervals (typically 2-3m)</li>
              <li>Expansion joints for thermal movement</li>
              <li>Minimum clearances for tap-off access (typically 600mm)</li>
              <li>Correct orientation as per manufacturer</li>
              <li>Protection from mechanical damage</li>
              <li>Corrosion protection where required</li>
            </ul>
            <p><strong>Electrical Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Joint torques to specification</li>
              <li>Earth continuity through all sections</li>
              <li>Correct phase sequence maintained</li>
              <li>Coordination with protective devices</li>
              <li>Short-circuit withstand verification</li>
              <li>Voltage drop calculations</li>
            </ul>
            <p><strong>Fire Barrier Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Fire rating:</strong> Match the penetrated element — 30, 60, 90, or 120 minutes</li>
              <li><strong>Barrier type:</strong> Proprietary tested system — Third-party certification required</li>
              <li><strong>Installation:</strong> By trained operatives — Fire stopping certificate issued</li>
              <li><strong>Gap filling:</strong> Intumescent sealant — Compatible with busbar housing</li>
              <li><strong>Maintenance access:</strong> Removable barriers may be required — Must maintain fire integrity when closed</li>
            </ul>
            <p><strong>Advantages Over Cable Systems</strong></p>
            <p><strong>Installation speed:</strong> Pre-fabricated sections install faster than pulling and terminating multiple cables</p>
            <p><strong>Flexibility:</strong> Tap-offs can be added, removed, or relocated without major rewiring</p>
            <p><strong>Space efficiency:</strong> Compact compared to equivalent cable tray installations</p>
            <p><strong>Heat dissipation:</strong> Better thermal performance than bundled cables</p>
            <p><strong>Lower fire load:</strong> Less combustible material than PVC-insulated cables</p>
            <p><strong>Reduced voltage drop:</strong> Lower impedance, especially sandwich construction</p>
            <p><strong>Compliance note:</strong> Busbar trunking installations must be carried out to manufacturer's instructions and documented with appropriate certificates including type test reports and fire barrier certificates.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Rising Main Sizing</strong>
            </p>
            <p><strong>Scenario:</strong> Size a rising main for a 10-storey office building with 50kVA per floor demand.</p>
            <p>Given data:</p>
            <p>Floors: 10</p>
            <p>Demand per floor: 50kVA</p>
            <p>Supply voltage: 400V three-phase</p>
            <p>Ambient temperature: 35C (standard)</p>
            <p>Calculation:</p>
            <p>Total connected load = 10 x 50 = 500kVA</p>
            <p>Apply diversity (0.8 typical for offices) = 500 x 0.8 = 400kVA</p>
            <p>Maximum demand current = 400,000 / (400 x 1.732) = 577A</p>
            <p>Add 25% future growth = 577 x 1.25 = 722A</p>
            <p>Select 800A busbar trunking system</p>
            <p>Verify short-circuit rating &gt; prospective fault level at intake</p>
            <p>
              <strong>Example 2: Tap-Off Unit Selection</strong>
            </p>
            <p><strong>Scenario:</strong> Select tap-off units for floor distribution boards from a 1000A rising main.</p>
            <p>Floor requirements:</p>
            <p>Typical floor load: 50kVA diversified</p>
            <p>Floor current = 50,000 / (400 x 1.732) = 72A</p>
            <p>With growth allowance = 72 x 1.2 = 87A</p>
            <p>Selection criteria:</p>
            <p>Continuous rating: &gt;87A → Select 100A tap-off</p>
            <p>Short-circuit rating: Match busbar system (e.g., 50kA)</p>
            <p>Protection: Fuse or MCCB integral or separate</p>
            <p>Type: Plug-in for flexibility</p>
            <p>Selected: 100A plug-in tap-off with 100A MCCB</p>
            <p>
              <strong>Example 3: Fire Barrier Specification</strong>
            </p>
            <p><strong>Scenario:</strong> Specify fire barriers for a 400A busbar penetrating 90-minute fire compartment floors.</p>
            <p>Requirements:</p>
            <p>Fire rating required: 90 minutes (EI90)</p>
            <p>Busbar size: 400A (enclosure approx 200 x 200mm)</p>
            <p>Floor construction: 150mm reinforced concrete</p>
            <p>Specification:</p>
            <p>Fire barrier system: Proprietary intumescent collar or wrap</p>
            <p>Tested to: BS EN 1366-3</p>
            <p>Certification: Third-party tested for specific busbar type</p>
            <p>Sealant: Intumescent mastic for gaps up to 20mm</p>
            <p>Installation requirements:</p>
            <p>Installer: Trained and certificated</p>
            <p>Documentation: Fire stopping certificate per floor</p>
            <p>Inspection: Visual and recorded on as-built drawings</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Busbar Installation Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Verify structural supports are installed at correct intervals</li>
              <li>Check floor/wall penetrations are correctly sized with expansion allowance</li>
              <li>Install sections with correct phase orientation throughout</li>
              <li>Torque all joints to manufacturer specification and record</li>
              <li>Install fire barriers at all compartment penetrations</li>
              <li>Complete earth continuity testing section by section</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Standard ambient rating: <strong>35C</strong> (derate above this)</li>
              <li>Typical support intervals: <strong>2-3 metres</strong> vertical</li>
              <li>Maintenance clearance: <strong>600mm minimum</strong> for tap-offs</li>
              <li>Expansion allowance: <strong>Approximately 1mm per metre per 10C rise</strong></li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Incorrect joint torque</strong> - causes hot joints and eventual failure</li>
                <li><strong>Missing fire barriers</strong> - serious fire safety breach</li>
                <li><strong>Inadequate support</strong> - leads to mechanical stress on joints</li>
                <li><strong>Ignoring thermal expansion</strong> - causes distortion and joint damage</li>
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
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section1-1")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Switchgear selection
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section1-3")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Cable sizing calculations
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule7Section1_2;
