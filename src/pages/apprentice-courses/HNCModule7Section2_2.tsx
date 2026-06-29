/**
 * Module 7 · Section 2 · Subsection 2 — Fire Alarm Systems
 * HNC Electrical Engineering for Building Services (Power and Lighting Systems)
 *   BS 5839 categories, detector types, zoning, cause and effect, voice alarm and system integration
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

const TITLE = 'Fire Alarm Systems - HNC Module 7 Section 2.2';
const DESCRIPTION =
  'Master fire alarm systems for building services: BS 5839 categories, detector types, zoning requirements, cause and effect matrices, voice alarm systems BS 5839-8, and system integration.';

const quickCheckQuestions = [
  {
    id: 'bs5839-l1',
    question: 'What level of protection does a Category L1 system provide?',
    options: [
      'The zero or minimum value of the measured range',
      'Protection of the entire building including all areas',
      'Varies with cable size and construction - from tables',
      'To ensure equipment receives adequate voltage for proper operation',
    ],
    correctIndex: 1,
    explanation:
      'Category L1 provides the highest level of life protection, with automatic fire detection installed throughout all areas of the building, including roof spaces, voids, and storage areas.',
  },
  {
    id: 'detector-selection',
    question: 'Which detector type is most suitable for a kitchen environment?',
    options: [
      'Multi-sensor detector in heat-only mode',
      'Heat detector (rate of rise)',
      'Optical smoke detector',
      'Ionisation smoke detector',
    ],
    correctIndex: 0,
    explanation:
      'A multi-sensor detector configured for heat-only mode or a dedicated heat detector is most suitable for kitchens, as smoke and optical detectors would cause frequent false alarms from cooking activities.',
  },
  {
    id: 'zone-limit',
    question: 'What is the maximum floor area for a single fire alarm zone under BS 5839-1?',
    options: [
      '1,000 m²',
      '2,000 m²',
      'No limit specified',
      '1,600 m²',
    ],
    correctIndex: 1,
    explanation:
      'BS 5839-1 specifies that no single zone should exceed 2,000 m² floor area. This ensures that the fire brigade can locate the fire within a reasonable search area when responding to an alarm.',
  },
  {
    id: 'cause-effect',
    question: 'What is the primary purpose of a cause and effect matrix in fire alarm design?',
    options: [
      'To provide safety and visibility while awaiting rescue',
      'Line conductor, protective conductor, and neutral',
      'To define system responses to alarm conditions in different zones',
      'All personnel clear, guards replaced, system ready',
    ],
    correctIndex: 2,
    explanation:
      'A cause and effect matrix defines what outputs are activated (effects) when specific inputs occur (causes). It maps alarm conditions in zones to actions such as sounders, door releases, lift recall, HVAC shutdown, and voice alarm messages.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which BS 5839-1 category provides automatic fire detection to protect a specific high-risk area only?',
    options: [
      'Category L1',
      'Category L5',
      'Category L3',
      'Category P1',
    ],
    correctAnswer: 1,
    explanation:
      "Category L5 is designed to protect specific areas where there is a high fire risk, a high risk to occupants, or other specific circumstances requiring localised automatic detection. It's a bespoke category for targeted protection.",
  },
  {
    id: 2,
    question: 'What is the key difference between Category P1 and P2 systems?',
    options: [
      'P1 uses smoke detectors, P2 uses heat detectors',
      'P1 is for life safety, P2 is for property protection',
      'P1 covers all areas, P2 covers high-risk areas only',
      'P1 is addressable, P2 is conventional',
    ],
    correctAnswer: 2,
    explanation:
      'Category P1 provides automatic fire detection throughout the building for property protection, whilst P2 only protects defined areas of high fire risk. Both are property protection categories, not life safety.',
  },
  {
    id: 3,
    question: 'An ionisation smoke detector is most sensitive to:',
    options: [
      'Heat from any fire type',
      'Large visible smoke particles from smouldering fires',
      'Carbon monoxide from incomplete combustion',
      'Small invisible particles from fast-flaming fires',
    ],
    correctAnswer: 3,
    explanation:
      'Ionisation detectors respond fastest to small, invisible particles produced by fast-flaming fires with little visible smoke. They use a radioactive source to ionise air and detect disruption to the current flow.',
  },
  {
    id: 4,
    question:
      'What is the maximum number of devices permitted on a single conventional fire alarm zone?',
    options: [
      '32 devices',
      '20 devices',
      '10 devices',
      'No specific limit',
    ],
    correctAnswer: 0,
    explanation:
      'BS 5839-1 recommends a maximum of 32 devices per zone for conventional systems. This limitation ensures that the fire can be located within an acceptable search time when the brigade arrives.',
  },
  {
    id: 5,
    question:
      'In an addressable fire alarm system, what additional information does each device provide compared to conventional?',
    options: [
      'Higher sensitivity detection only',
      'Individual device identification and status',
      'Wireless communication capability',
      'Automatic sensitivity adjustment only',
    ],
    correctAnswer: 1,
    explanation:
      'Addressable devices provide individual identification, allowing the control panel to display exactly which device has activated, its precise location, and diagnostic information. This enables faster response and easier maintenance.',
  },
  {
    id: 6,
    question: 'BS 5839-8 specifically covers which type of fire alarm system?',
    options: [
      'Conventional fire alarm systems',
      'Addressable fire alarm systems',
      'Voice alarm and public address systems',
      'Aspirating smoke detection systems',
    ],
    correctAnswer: 2,
    explanation:
      'BS 5839-8 provides the code of practice for voice alarm systems in buildings. It covers design, installation, commissioning, and maintenance of systems that provide spoken evacuation messages in addition to or instead of traditional sounders.',
  },
  {
    id: 7,
    question:
      'What is the minimum standby battery capacity required for a fire alarm system under BS 5839-1?',
    options: [
      '72 hours standby plus 30 minutes alarm',
      '24 hours standby plus 1 hour alarm',
      '48 hours standby plus 30 minutes alarm',
      '24 hours standby plus 30 minutes alarm',
    ],
    correctAnswer: 3,
    explanation:
      'BS 5839-1 requires batteries to provide at least 24 hours standby capacity followed by 30 minutes in the alarm condition. This ensures the system remains operational during mains failure until the fault can be rectified.',
  },
  {
    id: 8,
    question: 'Which detector type uses a light beam scattered by smoke particles?',
    options: [
      'Optical (photoelectric) detector',
      'Aspirating detector',
      'Ionisation detector',
      'Linear heat detector',
    ],
    correctAnswer: 0,
    explanation:
      'Optical smoke detectors work on the light-scattering principle. When smoke enters the chamber, particles scatter an LED light beam onto a photodiode, triggering the alarm. They are particularly effective for smouldering fires.',
  },
  {
    id: 9,
    question:
      "In cause and effect programming, what would typically be an 'effect' of a fire alarm activation in a lift lobby zone?",
    options: [
      'Detector goes into alarm',
      'Lift recalled to ground floor',
      'Manual call point activated',
      'Smoke detected in zone',
    ],
    correctAnswer: 1,
    explanation:
      "Lift recall is an 'effect' - an output action triggered by the alarm condition. Causes are inputs (detector activation, MCP operation), whilst effects are outputs (sounders, door releases, lift control, HVAC shutdown).",
  },
  {
    id: 10,
    question: 'What is the maximum cable resistance permitted for a fire alarm sounder circuit?',
    options: [
      'A fixed 50 ohms for every system, regardless of sounder type',
      'A fixed 0.5 ohms, the same as a final ring circuit',
      'It depends on the system design voltage, sounder current and minimum operating voltage',
      'There is no limit, as sounders operate correctly at any cable resistance',
    ],
    correctAnswer: 2,
    explanation:
      'Maximum cable resistance depends on the system design voltage, sounder current requirements, and minimum operating voltage. Manufacturers specify maximum loop resistance based on these factors - there is no universal fixed value.',
  },
  {
    id: 11,
    question: 'A multi-sensor detector typically combines which detection methods?',
    options: [
      'Ionisation and heat only',
      'Aspirating and optical only',
      'Heat and carbon monoxide only',
      'Optical smoke and heat detection',
    ],
    correctAnswer: 3,
    explanation:
      'Multi-sensor detectors typically combine optical smoke detection with heat sensing. Advanced algorithms analyse both inputs to distinguish between fire signatures and false alarm sources, significantly reducing unwanted alarms.',
  },
  {
    id: 12,
    question: 'What is the required minimum sound level for fire alarm sounders in BS 5839-1?',
    options: [
      '65 dB(A) or 5 dB(A) above background, whichever is greater',
      '55 dB(A) at all points within the protected area',
      '85 dB(A) measured at the sounder itself',
      '40 dB(A) or equal to the background noise level',
    ],
    correctAnswer: 0,
    explanation:
      'BS 5839-1 requires a minimum of 65 dB(A) or 5 dB(A) above any background noise likely to persist for more than 30 seconds, whichever is greater. In sleeping areas, 75 dB(A) at bed-head is required.',
  },
];

const faqs = [
  {
    question: 'When should I specify Category L2 instead of L1?',
    answer:
      "Category L2 provides automatic detection in escape routes plus rooms opening onto them, and high-risk areas. It's appropriate where a fire in circulation areas poses the greatest risk to occupants, such as in residential care homes or hotels. L1 is specified when fires anywhere could develop rapidly, trap occupants, or when building complexity means fires in any location are equally dangerous. L2 offers a balance between cost and protection where escape routes are the primary concern.",
  },
  {
    question: 'How do I select between optical and multi-sensor detectors?',
    answer:
      'Optical detectors suit most general applications with low false alarm risk. Multi-sensor detectors are preferred where false alarm sources exist (dust, steam, cooking nearby) because their algorithms distinguish fire signatures from environmental factors. Consider multi-sensors in open-plan offices, corridors near kitchens, areas with varying temperature, or where historical false alarm data suggests problems. The additional cost of multi-sensors is often justified by reduced false alarm call-out charges.',
  },
  {
    question: 'What determines fire alarm zone boundaries?',
    answer:
      "Zone boundaries are determined by: maximum area (2,000 m²), maximum search distance (practical limit ~30m), fire compartment boundaries, floor levels (each floor typically separate zone), stairwells (each stairwell separate zone), and building function changes. The goal is enabling the fire brigade to locate an alarm within 1-2 minutes of arriving. Addressable systems allow more flexibility with larger 'zones' because individual device locations are displayed.",
  },
  {
    question: 'What interfaces are typically required for fire alarm system integration?',
    answer:
      'Common interfaces include: HVAC shutdown (prevent smoke spread), smoke damper control, door holder release (close fire doors), lift recall to ground floor, access control override (unlock doors on evacuation routes), emergency lighting activation, security system notification, BMS alarm logging, gas suppression systems, and voice alarm activation. Each interface requires careful design of cause and effect relationships and appropriate interface modules.',
  },
  {
    question: 'When is a voice alarm system required instead of traditional sounders?',
    answer:
      'Voice alarm (BS 5839-8) is recommended or required for: large complex buildings where phased evacuation is planned, buildings with sleeping occupants unfamiliar with the premises (hotels), areas with high background noise where sounders may be ignored, buildings where different messages may be needed for different scenarios, and locations where multilingual announcements are beneficial. The Regulatory Reform (Fire Safety) Order may require voice alarm where a fire risk assessment identifies specific communication needs.',
  },
  {
    question: 'How do I size fire alarm system batteries correctly?',
    answer:
      "Battery capacity = (standby current x 24 hours) + (alarm current x 0.5 hours), plus a 25% safety margin. Standby current includes the control panel, all detectors in quiescent mode, and any continuously powered devices. Alarm current includes all sounders, beacons, and the panel in alarm mode. For large systems, consider distributed power supplies to reduce cable volt drop and provide redundancy. Always verify manufacturer's specific requirements and derate batteries for end-of-life capacity.",
  },
];

const HNCModule7Section2_2 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section2")}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 7 · Section 2 · Subsection 2"
            title="Fire Alarm Systems"
            description="BS 5839 categories, detector types, zoning, cause and effect, voice alarm and system integration"
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              "Explain BS 5839-1 system categories and their applications",
              "Select appropriate detector types for different environments",
              "Apply zoning requirements and calculate zone boundaries",
              "Develop cause and effect matrices for system integration",
              "Understand voice alarm requirements under BS 5839-8",
              "Design fire alarm interfaces with building services",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="BS 5839-1 System Categories">
            <p>BS 5839-1 defines system categories based on the protection objectives. Life safety categories (L) prioritise occupant evacuation, whilst property protection categories (P) focus on minimising fire damage. Category M provides manual alarm only.</p>
            <p><strong>Life Safety Categories (L1-L5)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>L1:</strong> All areas including voids, roof spaces, cupboards — High-risk premises, hospitals, residential care</li>
              <li><strong>L2:</strong> Escape routes, rooms opening onto them, high-risk areas — Hotels, hostels, HMOs, boarding houses</li>
              <li><strong>L3:</strong> Escape routes only — Factories, warehouses with clear escape paths</li>
              <li><strong>L4:</strong> Escape routes within dwellings — Domestic premises (linked to Building Regs)</li>
              <li><strong>L5:</strong> Specific areas defined by fire risk assessment — Bespoke protection, server rooms, plant areas</li>
            </ul>
            <p><strong>Property and Manual Categories</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>P1:</strong> All areas (property protection throughout) — Museums, heritage buildings, warehouses</li>
              <li><strong>P2:</strong> High-risk areas only (property) — Storage areas, plant rooms, specific risks</li>
              <li><strong>M:</strong> Manual call points only, no automatic detection — Low-risk, single-storey, good visibility</li>
            </ul>
            <p><strong>Design principle:</strong> The system category is determined by the fire risk assessment, not simply the building type. A combined category (e.g., L2/P2) may be specified where different areas have different protection requirements.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Detector Types and Selection">
            <p>Selecting the appropriate detector type requires understanding both the fire characteristics likely to occur and the environmental conditions that could cause false alarms. Different detector technologies respond to different fire signatures.</p>
            <p><strong>Optical Smoke Detectors</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Light-scattering principle</li>
              <li>Best for smouldering fires</li>
              <li>Large visible smoke particles</li>
              <li>Most common general-purpose type</li>
              <li>Prone to dust false alarms</li>
            </ul>
            <p><strong>Ionisation Smoke Detectors</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Radioactive source ionises air</li>
              <li>Best for fast-flaming fires</li>
              <li>Small invisible particles</li>
              <li>Rarely specified (disposal issues)</li>
              <li>Very sensitive to cooking fumes</li>
            </ul>
            <p><strong>Heat Detectors</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Fixed temperature or rate-of-rise</li>
              <li>Immune to smoke false alarms</li>
              <li>Slower response than smoke types</li>
              <li>Ideal for kitchens, garages, plant</li>
              <li>Various temperature grades (A1-G)</li>
            </ul>
            <p><strong>Multi-Sensor Detectors</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Combines optical + heat sensing</li>
              <li>Algorithm distinguishes fire from false alarm</li>
              <li>Configurable sensitivity modes</li>
              <li>Reduces unwanted alarms by 50-80%</li>
              <li>Premium cost but often justified</li>
            </ul>
            <p><strong>Detector Selection Guide</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Office, corridor:</strong> Optical or multi-sensor — General purpose, good response</li>
              <li><strong>Kitchen:</strong> Heat detector — Immune to cooking fumes</li>
              <li><strong>Plant room:</strong> Heat detector (rate-of-rise) — Tolerates fumes, dust, temperature</li>
              <li><strong>Server room:</strong> Aspirating (VESDA) — Very early warning, high airflow</li>
              <li><strong>Warehouse (high ceiling):</strong> Beam detector or aspirating — Point detectors impractical at height</li>
            </ul>
            <p><strong>Best practice:</strong> Always consider false alarm sources when selecting detectors. Unwanted alarms cost money, cause disruption, and lead to complacency.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Zoning Requirements and Cause and Effect">
            <p>Fire alarm zoning determines how the building is divided for alarm indication and fire brigade response. Cause and effect matrices define system behaviour when alarms occur in different zones, controlling outputs such as sounders, door releases, and building services interfaces.</p>
            <p><strong>BS 5839-1 Zoning Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Maximum zone area:</strong> 2,000 m² floor area</li>
              <li><strong>Maximum search distance:</strong> Should allow location within 1-2 minutes</li>
              <li><strong>Floor separation:</strong> Each floor should be a separate zone (exceptions for atriums)</li>
              <li><strong>Stairwells:</strong> Each stairwell should be a separate zone</li>
              <li><strong>Fire compartments:</strong> Zone boundaries should align with compartment walls</li>
              <li><strong>Conventional systems:</strong> Maximum 32 devices per zone</li>
            </ul>
            <p><strong>Cause and Effect Matrix Example</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Zone 1 - Ground Floor:</strong> Yes — Yes — Yes — Yes</li>
              <li><strong>Zone 2 - First Floor:</strong> Yes — Yes — Yes — Yes</li>
              <li><strong>Zone 5 - Kitchen:</strong> Delayed 3min — Yes — No — Extract only</li>
              <li><strong>Zone 8 - Plant Room:</strong> Yes — Yes — Yes — Yes</li>
              <li><strong>MCP Any Zone:</strong> Immediate — Yes — Yes — Yes</li>
            </ul>
            <p><strong>Typical System Outputs (Effects)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Sounders and beacons:</strong> Alert occupants to evacuate</li>
              <li><strong>Fire door holders:</strong> Release doors to maintain compartmentation</li>
              <li><strong>Lift recall:</strong> Return lifts to ground floor, prevent further use</li>
              <li><strong>HVAC shutdown:</strong> Stop air handling to prevent smoke spread</li>
              <li><strong>Smoke dampers:</strong> Close dampers in ductwork</li>
              <li><strong>Stairwell pressurisation:</strong> Activate to keep escape routes clear</li>
              <li><strong>Access control:</strong> Release doors on escape routes</li>
              <li><strong>Voice alarm:</strong> Trigger evacuation messages</li>
            </ul>
            <p><strong>Integration tip:</strong> The cause and effect matrix should be developed collaboratively between fire alarm, mechanical, and controls engineers to ensure all system interactions are properly defined.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Voice Alarm and System Integration">
            <p>Voice alarm systems (BS 5839-8) provide spoken evacuation messages instead of or alongside traditional sounders. They enable phased evacuation, multilingual announcements, and situation-specific messages. System integration connects the fire alarm to other building services for coordinated emergency response.</p>
            <p><strong>BS 5839-8 Voice Alarm Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Intelligibility:</strong> STIPA (Speech Transmission Index for PA) &gt; 0.5 minimum</li>
              <li><strong>Sound level:</strong> 65 dB(A) or 5 dB above background (as per Part 1)</li>
              <li><strong>Message structure:</strong> Alert tone, spoken message, alert tone (A-M-A pattern)</li>
              <li><strong>Message duration:</strong> Should not exceed 30 seconds</li>
              <li><strong>Standby power:</strong> Same as fire alarm (24 hours + 30 minutes)</li>
              <li><strong>Fault tolerance:</strong> Single fault should not disable more than one zone</li>
            </ul>
            <p><strong>When Voice Alarm is Required</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Phased evacuation buildings</li>
              <li>Sleeping accommodation (hotels)</li>
              <li>High background noise areas</li>
              <li>Complex buildings, multiple routes</li>
              <li>Multilingual requirements</li>
              <li>Fire risk assessment recommendation</li>
            </ul>
            <p><strong>Voice Alarm Message Types</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Alert:</strong> "Attention please, this is a fire alert..."</li>
              <li><strong>Evacuate:</strong> "Please leave the building immediately..."</li>
              <li><strong>All-clear:</strong> "The emergency has ended..."</li>
              <li><strong>Phased:</strong> Zone-specific instructions</li>
              <li><strong>Live PA:</strong> Manual announcements if needed</li>
            </ul>
            <p><strong>Fire Alarm Integration Interfaces</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>HVAC / AHU:</strong> Volt-free contact or BACnet — Shutdown fans, close dampers</li>
              <li><strong>Smoke dampers:</strong> 24V DC or volt-free — Close to prevent smoke spread</li>
              <li><strong>Lifts:</strong> Dedicated fire service switch — Recall to ground, doors open</li>
              <li><strong>Access control:</strong> Volt-free or network — Unlock escape route doors</li>
              <li><strong>BMS:</strong> BACnet, Modbus, or volt-free — Log alarms, coordinate response</li>
              <li><strong>Emergency lighting:</strong> Automatic (loss of supply) — Illuminate escape routes</li>
              <li><strong>Gas suppression:</strong> Dedicated interface panel — Trigger release after delay</li>
            </ul>
            <p><strong>Critical consideration:</strong> All fire alarm interfaces must be fail-safe. Loss of power or signal should result in the safe condition (doors release, dampers close, lifts recall).</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Determining System Category</strong>
            </p>
            <p><strong>Scenario:</strong> A 4-storey office building with open-plan offices, meeting rooms, a ground floor reception, plant room, and basement car park. Determine the appropriate BS 5839-1 category.</p>
            <p>Fire Risk Assessment Considerations:</p>
            <p>- Office occupancy: awake, familiar with building</p>
            <p>- Multiple escape routes available</p>
            <p>- No sleeping accommodation</p>
            <p>- No high-risk processes</p>
            <p>Category Selection:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>L3</strong> L2</li>
            </ul>
            <p>Plant room: <span>P2</span> (property protection of high-risk area)</p>
            <p>Car park: <span>P2</span> or separate system per BS 5839-6</p>
            <p>Recommendation: Combined L3/P2 system</p>
            <p>(Detection in escape routes, plus specific areas)</p>
            <p>
              <strong>Example 2: Zone Calculation</strong>
            </p>
            <p><strong>Scenario:</strong> A warehouse measuring 80m x 50m (4,000 m²) single storey. Calculate the minimum number of zones required.</p>
            <p>Total floor area = 80m x 50m = 4,000 m²</p>
            <p>Maximum zone area = 2,000 m² (BS 5839-1)</p>
            <p>Minimum zones = 4,000 ÷ 2,000 = <span>2 zones</span></p>
            <p>Practical considerations:</p>
            <p>- Consider fire compartment boundaries</p>
            <p>- Search distance for fire brigade</p>
            <p>- Racking layout and access routes</p>
            <p>Recommendation: 4 zones (quadrants)</p>
            <p>Provides better location indication</p>
            <p>
              <strong>Example 3: Battery Capacity Calculation</strong>
            </p>
            <p><strong>Scenario:</strong> Calculate battery capacity for a fire alarm system with 2A standby current and 8A alarm current.</p>
            <p>Standby capacity = 2A x 24 hours = 48 Ah</p>
            <p>Alarm capacity = 8A x 0.5 hours = 4 Ah</p>
            <p>Sub-total = 48 + 4 = 52 Ah</p>
            <p>Add 25% safety margin:</p>
            <p>52 x 1.25 = <span>65 Ah minimum</span></p>
            <p>Select next standard size up:</p>
            <p>Specify 2 x 38 Ah batteries (76 Ah total)</p>
            <p>(Twin batteries for redundancy)</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Fire Alarm Design Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Obtain fire risk assessment and determine required category</li>
              <li>Review building plans for compartmentation and escape routes</li>
              <li>Define zones based on area, floors, and compartments</li>
              <li>Select detector types considering environment and false alarm risk</li>
              <li>Develop cause and effect matrix with all stakeholders</li>
              <li>Calculate battery capacity with safety margin</li>
              <li>Coordinate interfaces with mechanical and controls packages</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Maximum zone area: <strong>2,000 m²</strong></li>
              <li>Standby battery: <strong>24 hours + 30 minutes alarm</strong></li>
              <li>Sound level: <strong>65 dB(A) or 5 dB above background</strong></li>
              <li>Sleeping areas: <strong>75 dB(A) at bed-head</strong></li>
              <li>Conventional zone limit: <strong>32 devices</strong></li>
              <li>Voice alarm STIPA: <strong>&gt; 0.5</strong></li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Wrong detector type:</strong> Optical detectors in kitchens cause repeated false alarms</li>
                <li><strong>Poor zone design:</strong> Zones crossing fire compartments reduce effectiveness</li>
                <li><strong>Incomplete cause and effect:</strong> Missing interfaces leave systems uncoordinated</li>
                <li><strong>Undersized batteries:</strong> Failing to include all loads and safety margin</li>
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
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section2-1")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Emergency lighting design
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section2-3")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Life safety power
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule7Section2_2;
