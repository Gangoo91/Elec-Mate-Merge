/**
 * Module 4 · Section 6 · Subsection 3 — Schedules and Data Sheets
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   Equipment / DB / cable / luminaire schedules with unique tagging, BS 5266-1 emergency
 *   lighting schedule requirements, manufacturer data sheets and document coordination
 *   matrices linking drawings, schedules and specifications.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  LearningOutcomes,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Schedules and Data Sheets - HNC Module 4 Section 6.3';
const DESCRIPTION =
  'Master electrical schedules and data sheets for building services: equipment schedules, cable schedules, luminaire schedules, data sheets and documentation coordination.';

const quickCheckQuestions = [
  {
    id: 'schedule-purpose',
    question: 'What is the primary purpose of an equipment schedule?',
    options: [
      'Wattage, lumen output, IP rating, emergency duration, manufacturer data',
      'The zero or minimum value of the measured range',
      'Use it properly, report defects, store it correctly',
      'To provide detailed tabular data complementing drawings',
    ],
    correctIndex: 3,
    explanation:
      'Equipment schedules provide detailed tabular information (specifications, quantities, ratings) that complements graphical information shown on drawings.',
  },
  {
    id: 'cable-schedule',
    question: 'What information must a cable schedule include?',
    options: [
      'Cable reference, size, type, route, length and protective device',
      'Maximum demand assessment, tariff selection, and load management',
      'Both reduce touch voltages and provide fault path',
      'At every change of direction to ensure visibility',
    ],
    correctIndex: 0,
    explanation:
      'Cable schedules must include circuit reference, cable size, type, route details, length, and the associated protective device to enable correct installation and verification.',
  },
  {
    id: 'luminaire-schedule',
    question: 'Why do luminaire schedules include lighting calculation references?',
    options: [
      'Enhanced corrosion protection and moisture barriers',
      'To link specified luminaires to design calculations proving compliance',
      'Network security, encryption, and access controls',
      'An RCBO or RCD with a rated residual operating current not exceeding 30 mA',
    ],
    correctIndex: 1,
    explanation:
      'Linking luminaires to calculation references demonstrates that the specified products have been verified to meet lighting requirements (lux levels, uniformity, etc.).',
  },
  {
    id: 'data-sheet',
    question: 'What distinguishes a data sheet from a schedule?',
    options: [
      'Very low resistance path between conductors that should be separate',
      'Connections, supports, protection, labeling, and general workmanship',
      'The difference in electrical potential between two points',
      'Data sheets give detailed technical specifications for a single product type',
    ],
    correctIndex: 3,
    explanation:
      'Data sheets provide comprehensive technical details for a specific product type, while schedules list multiple items in tabular form with key parameters.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Which of the following is NOT typically included in an equipment schedule?',
    options: [
      'Equipment reference tag',
      'Installation labour hours',
      'Manufacturer and model',
      'Rating and capacity',
    ],
    correctAnswer: 1,
    explanation:
      'Equipment schedules focus on technical specifications, not labour estimates. Labour hours are typically part of pricing/programme documents, not design schedules.',
  },
  {
    id: 2,
    question: 'What format is commonly used for schedules in building services?',
    options: [
      'Can cause time-dependent reading changes',
      'Role-based access with appropriate permissions',
      'Tabular format with columns and rows',
      'At least 200 mA to ensure reliable measurement',
    ],
    correctAnswer: 2,
    explanation:
      'Schedules use tabular format with defined columns (parameters) and rows (individual items), allowing clear, organised presentation of data.',
  },
  {
    id: 3,
    question: "A cable schedule shows '2c 6mm² LSF' - what does LSF stand for?",
    options: [
      'Light Single Flex',
      'Low Smoke Flame',
      'Long Service Factor',
      'Low Smoke and Fume',
    ],
    correctAnswer: 3,
    explanation:
      'LSF stands for Low Smoke and Fume, indicating cable sheathing that emits reduced smoke and toxic fumes in fire, required in many building applications.',
  },
  {
    id: 4,
    question: 'What should a luminaire schedule include for emergency lighting?',
    options: [
      'Emergency duration, type, battery test information and location',
      'The Approved Electrician or Technician grade who supervises their work',
      'The person on whose behalf the inspection is carried out',
      'They provide discrimination with downstream instantaneous RCDs',
    ],
    correctAnswer: 0,
    explanation:
      'Emergency luminaire schedules need duration (1hr/3hr), type (maintained/non-maintained/sustained), test provisions, and location for compliance verification.',
  },
  {
    id: 5,
    question: 'How should schedule references link to layout drawings?',
    options: [
      'To reinforce safe habits and update new workers',
      'Using unique tags that appear on both documents',
      'Fuel, oxygen, and a source of ignition',
      'Comprehensive logging and diagnostic capabilities',
    ],
    correctAnswer: 1,
    explanation:
      'Unique equipment tags (e.g., DB-01, LUM-A1) provide the link between schedule entries and drawing symbols, enabling cross-referencing.',
  },
  {
    id: 6,
    question: 'What is the purpose of a distribution board schedule?',
    options: [
      'Maximum expected load taking diversity into account',
      'High-density cable with very small outer diameter for microduct installation',
      'To detail all circuits, protective devices, cable sizes and loads',
      'Proper isolation, venting, and pressure relief procedures',
    ],
    correctAnswer: 2,
    explanation:
      'DB schedules detail every circuit including way number, description, protective device type/rating, cable size, and connected load - essential for installation and verification.',
  },
  {
    id: 7,
    question: 'When should data sheets be requested from manufacturers?',
    options: [
      'Whenever working on or near electrical equipment',
      'Converting curved sensor response to linear output',
      'When there\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s a risk of falling and no physical barrier',
      'During design development to verify equipment meets requirements',
    ],
    correctAnswer: 3,
    explanation:
      'Data sheets should be obtained during design to verify products meet specifications and to provide detailed information for design coordination and O&M documentation.',
  },
  {
    id: 8,
    question: "What does 'IP rating' on an equipment data sheet indicate?",
    options: [
      'Ingress Protection against solids and liquids',
      'Overheating, interference, equipment malfunction',
      'Passive infrared (PIR) with microwave (dual-tech)',
      'Add EV charger load with appropriate diversity',
    ],
    correctAnswer: 0,
    explanation:
      'IP (Ingress Protection) rating indicates protection against solid objects (first digit) and water (second digit), e.g., IP65 = dust-tight and protected against water jets.',
  },
  {
    id: 9,
    question: 'How should schedule revisions be managed?',
    options: [
      'False - IR testing is required regardless of installation age',
      'Track changes with revision numbers and dates, highlight amendments',
      'It identifies hot spots in electrical equipment',
      'Cables can be drawn in without damage and heat dissipation is adequate',
    ],
    correctAnswer: 1,
    explanation:
      'Schedules should follow the same revision control as drawings - revision numbers, dates, and clear identification of changes to maintain document integrity.',
  },
  {
    id: 10,
    question: 'What coordination check should be performed between schedules and specifications?',
    options: [
      'High anxiety with physical symptoms such as trembling and nausea',
      'To accommodate final positioning and thermal movement',
      'Verify scheduled items match specification requirements',
      'Drawings showing what was actually installed',
    ],
    correctAnswer: 2,
    explanation:
      'Scheduled items must meet specification requirements (IP rating, efficiency, standards compliance, etc.). This coordination check prevents installation of non-compliant equipment.',
  },
];

const faqs = [
  {
    question: 'Should schedules include quantities?',
    answer:
      "Yes, schedules typically include quantities for each item type. This helps with procurement, installation planning and cost verification. However, the quantities should be verified against drawings as the primary source of 'what and where'.",
  },
  {
    question: 'How detailed should cable schedules be?',
    answer:
      'Cable schedules should include: circuit reference, origin, destination, cable type and size, number of cores, length (measured + allowance), route reference, and associated protective device. For complex routes, include containment references and any specific routing requirements.',
  },
  {
    question: 'What is the difference between a schedule and a bill of quantities?',
    answer:
      'Schedules are technical documents defining what equipment is required. Bills of quantities are commercial documents for pricing, often derived from schedules but including rates and totals. Schedules focus on specifications, BoQs on measurement and cost.',
  },
  {
    question: 'Should I create separate schedules for each floor?',
    answer:
      'This depends on project size and complexity. Large buildings often have floor-by-floor schedules for clarity. Smaller projects may combine into single schedules. The key is clarity and ease of use - if a single schedule becomes unwieldy, split it.',
  },
  {
    question: 'How do schedules integrate with BIM?',
    answer:
      'In BIM workflows, schedules are typically generated automatically from model data. The model contains equipment parameters (ratings, manufacturers, etc.) which export to schedule format. This ensures consistency between 3D model and documentation, reducing errors.',
  },
];

const HNCModule4Section6_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section6')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 4 · Section 6 · Subsection 3"
            title="Schedules and Data Sheets"
            description="Creating comprehensive tabular documentation for building services electrical installations."
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              'Create comprehensive equipment schedules',
              'Develop cable schedules with all required information',
              'Produce luminaire schedules including emergency lighting',
              'Understand data sheet requirements and applications',
              'Coordinate schedules with drawings and specifications',
              'Apply consistent formatting and cross-referencing',
            ]}
            initialVisibleCount={3}
          />

          <TLDR
            points={[
              'Schedules tabulate the design — equipment, cables, luminaires, emergency lights, controls — with unique tags that join drawings and specs.',
              'Cable schedule is the engineering record: From → To, route, csa, type, length, voltage drop, protective device, fault level. Drives O&amp;M and EIC.',
              'Luminaire schedule pairs design intent (Em, UGR, Ra, CCT) with product (manufacturer, model code, lamp/driver, mounting, IP). Emergency lighting on its own schedule.',
              'BS 7671 Appendix 6 schedules (circuit details, test results, inspection schedule) are the legal record at handover — they live alongside the engineer’s schedules, not instead of them.',
              'Reg 514.12.1 instruction notice (dates of last and next periodic inspection) sits at the DB — it is the schedule of record for the next dutyholder.',
            ]}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 514.12.1"
            clause="An instruction notice of such durable material as to be likely to remain easily legible throughout the life of the installation shall be fixed in a prominent position at or near the relevant distribution board or boards upon completion of the work carried out in accordance with Chapter 64 or 65 as applicable. The notice shall be clearly and durably marked and shall read as follows: Important — This installation should be periodically inspected and tested and a report on its condition obtained, as prescribed in BS 7671 Requirements for Electrical Installations. Date of last inspection ............ Recommended date of next inspection ............"
            meaning={
              <>
                The BS 7671 Appendix 6 schedules (Schedule of Inspections, Schedule of Test
                Results, EIC) get bound into the O&amp;M, but the day-to-day handover schedule
                lives on the DB as a Reg 514.12.1 notice. The dates of last and next inspection
                go on it. As the HNC engineer producing the master schedule pack, you specify the
                notice (durable material, font, fixing) and you record the recommended next-test
                interval based on your Reg 652.1 frequency assessment.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 514.12.1."
          />

          <SectionRule />

          <ConceptBlock title="Equipment Schedules">
            <p>
              Equipment schedules provide tabular summaries of all electrical equipment, linking to
              drawings through unique tags and to specifications through product requirements. They
              enable procurement, installation verification and O&M documentation.
            </p>
            <p>
              <strong>Typical equipment schedule content:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Equipment tag:</strong> Unique reference matching drawings
              </li>
              <li>
                <strong>Description:</strong> Equipment type and function
              </li>
              <li>
                <strong>Location:</strong> Room/area reference
              </li>
              <li>
                <strong>Manufacturer/model:</strong> Specified product (if prescriptive)
              </li>
              <li>
                <strong>Rating/capacity:</strong> Key technical parameters
              </li>
              <li>
                <strong>Quantity:</strong> Number of units
              </li>
            </ul>
            <p>
              <strong>Distribution board schedule example (way / description / protection / cable / load):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>1 — Lighting - Office Area — 6A Type B MCB — 1.5mm² T&E — 0.8kW</li>
              <li>2 — Socket Ring - North — 32A Type B RCBO — 2.5mm² T&E — 2.4kW</li>
              <li>3 — FCU - Server Rack — 20A Type B MCB — 2.5mm² T&E — 3.0kW</li>
              <li>4 — Emergency Lighting — 6A Type B MCB — 1.5mm² FP200 — 0.2kW</li>
            </ul>
            <p>
              <strong>Key point:</strong> DB schedules should match the physical board layout,
              showing incomer and all outgoing ways.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Cable Schedules">
            <p>
              Cable schedules document all cables in the installation, providing essential
              information for procurement, installation and testing. They link circuit design to
              physical implementation.
            </p>
            <p>
              <strong>Cable schedule requirements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Cable reference:</strong> Unique identifier
              </li>
              <li>
                <strong>Circuit:</strong> Associated circuit description
              </li>
              <li>
                <strong>From/To:</strong> Origin and destination equipment
              </li>
              <li>
                <strong>Type:</strong> Cable construction (T&E, SWA, LSF, etc.)
              </li>
              <li>
                <strong>Size:</strong> Conductor cross-section (mm²)
              </li>
              <li>
                <strong>Cores:</strong> Number of conductors
              </li>
              <li>
                <strong>Length:</strong> Route length including allowances
              </li>
              <li>
                <strong>Protective device:</strong> Associated MCB/MCCB rating
              </li>
            </ul>
            <p>
              <strong>Cable schedule example (ref / from / to / cable type / length):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>C001 — MSB — DB-01 — 4c 25mm² LSF/SWA — 45m</li>
              <li>C002 — MSB — DB-02 — 4c 16mm² LSF/SWA — 32m</li>
              <li>C003 — DB-01/3 — AHU-01 — 5c 4mm² LSF/SWA — 28m</li>
            </ul>
            <p>
              <strong>Cable length calculation:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Measure route from drawing or model</li>
              <li>Add vertical drops/rises</li>
              <li>Include termination allowances (typically 2m each end)</li>
              <li>Apply contingency (typically 5-10%)</li>
            </ul>
            <p>
              <strong>Important:</strong> Cable schedules must align with DB schedules and
              single-line diagrams for consistency.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Luminaire Schedules">
            <p>
              Luminaire schedules document all lighting equipment, linking lighting design
              calculations to specified products. They are essential for procurement, installation
              and demonstrating compliance with lighting standards.
            </p>
            <p>
              <strong>Luminaire schedule content:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Type reference:</strong> Schedule tag (Type A, B, C...)
              </li>
              <li>
                <strong>Description:</strong> Luminaire type and application
              </li>
              <li>
                <strong>Manufacturer/model:</strong> Specified product
              </li>
              <li>
                <strong>Lamp/LED data:</strong> Source type, wattage, colour temp
              </li>
              <li>
                <strong>Lumen output:</strong> Delivered lumens
              </li>
              <li>
                <strong>IP rating:</strong> Ingress protection
              </li>
              <li>
                <strong>Mounting:</strong> Recessed, surface, suspended
              </li>
              <li>
                <strong>Controls:</strong> DALI, switching, sensors
              </li>
              <li>
                <strong>Quantity:</strong> Total number
              </li>
            </ul>
            <p>
              <strong>Emergency lighting schedule requirements (parameter / requirement):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Duration:</strong> 1 hour or 3 hour rating
              </li>
              <li>
                <strong>Mode:</strong> Maintained / Non-maintained / Sustained
              </li>
              <li>
                <strong>Test facility:</strong> Manual / Automatic / Self-test
              </li>
              <li>
                <strong>Output:</strong> Emergency lumens
              </li>
              <li>
                <strong>Battery:</strong> NiCd / NiMH / Li-ion
              </li>
            </ul>
            <p>
              <strong>Calculation link:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Reference DIALux/Relux calc number</li>
              <li>Show achieved lux level</li>
              <li>Note uniformity compliance</li>
              <li>Include glare rating (UGR)</li>
            </ul>
            <p>
              <strong>Coordination:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Match types to layout drawings</li>
              <li>Coordinate with ceiling grid</li>
              <li>Verify mounting heights</li>
              <li>Check HVAC coordination</li>
            </ul>
            <p>
              <strong>BS 5266-1:</strong> Requires emergency lighting schedules to demonstrate
              compliance with escape route and open area requirements.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Data Sheets and Coordination">
            <p>
              Data sheets provide comprehensive technical information for specific products,
              enabling design verification, installation planning and maintenance. They supplement
              schedules with detailed specifications.
            </p>
            <p>
              <strong>Data sheet content (typical for switchgear):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>General:</strong> Manufacturer, model, type designation
              </li>
              <li>
                <strong>Ratings:</strong> Voltage, current, fault level (Icw, Ics, Icu)
              </li>
              <li>
                <strong>Standards:</strong> BS EN 61439 compliance details
              </li>
              <li>
                <strong>Dimensions:</strong> Height, width, depth, weight
              </li>
              <li>
                <strong>Environmental:</strong> IP rating, temperature range
              </li>
              <li>
                <strong>Accessories:</strong> Available options and modifications
              </li>
              <li>
                <strong>Certifications:</strong> CE marking, third-party approvals
              </li>
            </ul>
            <p>
              <strong>Document coordination matrix (document / shows / links to):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Drawings — location, quantity — schedules via tags</li>
              <li>Schedules — summary specs, quantities — specifications, data sheets</li>
              <li>Specifications — performance requirements — standards, schedules</li>
              <li>Data sheets — detailed product data — manufacturer literature</li>
            </ul>
            <p>
              <strong>Coordination checks:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Equipment tags consistent across all documents</li>
              <li>Schedule quantities match drawing count</li>
              <li>Specified products meet specification requirements</li>
              <li>Cable schedules align with DB schedules</li>
              <li>Data sheet dimensions allow for spatial coordination</li>
            </ul>
            <p>
              <strong>Best practice:</strong> Create a document coordination matrix and check all
              links before issue.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Schedule formatting:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Use consistent column widths and alignment</li>
              <li>Include clear headers and units</li>
              <li>Group related items logically</li>
              <li>Add subtotals and grand totals where appropriate</li>
            </ul>
            <p>
              <strong>Tagging convention:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>DB-01, DB-02:</strong> Distribution boards
              </li>
              <li>
                <strong>LUM-A, LUM-B:</strong> Luminaire types
              </li>
              <li>
                <strong>C001, C002:</strong> Cable references
              </li>
              <li>
                <strong>AHU-01:</strong> Equipment (linked to mechanical)
              </li>
            </ul>
            <p>
              <strong>Schedule types — quick reference:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Equipment schedule — general items</li>
              <li>DB schedule — circuit details</li>
              <li>Cable schedule — wiring data</li>
              <li>Luminaire schedule — lighting</li>
              <li>Small power schedule — outlets</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Mismatched quantities</strong> — schedule says 10, drawing shows 12
                </li>
                <li>
                  <strong>Missing information</strong> — incomplete data for procurement
                </li>
                <li>
                  <strong>Inconsistent tags</strong> — DB01 vs DB-01 vs DB.01
                </li>
                <li>
                  <strong>Outdated revisions</strong> — schedule not updated with drawing changes
                </li>
              </ul>
            }
            doInstead="Run a tag/quantity reconciliation check between schedule and drawing before each issue, fill every column needed for procurement (rating, IP, mounting, controls), enforce a single tag format across the project, and revise schedules in the same pack as the drawings they describe."
          />

          <SectionRule />

          <Scenario
            title="Coordinating cable, luminaire and DB schedules at Stage 4 freeze"
            situation={
              <>
                Stage 4 design freeze on a 5-storey commercial building. Drawings are ready.
                Schedules need to lock down for the contractor and QS. You have: 84 final
                circuits across 5 floor DBs, 320 luminaires (including 60 emergency), one MSB,
                two sub-mains. Tagging is mostly consistent but a few items still carry the Stage
                3 placeholders.
              </>
            }
            whatToDo={
              <>
                Run a tag reconciliation: every drawing tag has a row on the right schedule, every
                schedule row has a tag on the right drawing. Cable schedule columns: Tag / From /
                To / Route / Csa / Type / Length / Vdrop% / Device rating / Fault level / Notes.
                Luminaire schedule: Tag / Type code / Manufacturer / Lamp/driver / Em design /
                UGR / Ra / CCT / IP / Mounting / Quantity / Notes. Emergency luminaires on a
                separate schedule with duration and self-test/central-battery flag. DB schedules
                use the BS 7671 Appendix 6 pro-formas (Schedule of Circuit Details, Schedule of
                Test Results pre-populated for the install team). Specify a Reg 514.12.1 notice
                on each DB door (durable Traffolyte, A5 minimum, fixing method). Cross-reference
                the EIC scope to the schedules. Issue all schedules in the same pack as the
                drawings they describe — same revision, same date.
              </>
            }
            whyItMatters={
              <>
                A schedule out-of-step with the drawings means the contractor orders the wrong
                quantities, the QS prices the wrong items, and the EIC at handover doesn’t match
                the as-built. Reconciliation is a 2-hour task that saves a 2-week dispute.
              </>
            }
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Equipment, cable, luminaire and emergency lighting schedules are the engineering ledger — tagged to drawings, referenced from spec.',
              'Cable schedule columns: Tag, From, To, Route, Csa, Type, Length, Vdrop%, Device rating, Fault level, Notes.',
              'Luminaire schedule pairs design intent (Em, UGR, Ra, CCT) with product (manufacturer, model, IP, mounting).',
              'Emergency lighting on its own schedule — duration, source type, self-test/central-battery, BS 5266 zone reference.',
              'BS 7671 Appendix 6 pro-formas for circuit details, test results and inspection schedule are the legal handover record.',
              'Reg 514.12.1 periodic-inspection notice on every DB — durable, dated, recommended next test interval.',
              'Reg 652.1 obliges the designer to set the next-test frequency based on installation type, use and external influences.',
              'Issue schedules and drawings in the same pack at the same revision — broken cross-refs are how disputes start.',
            ]}
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section6-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Electrical drawings
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section6-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Design calculations
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule4Section6_3;
