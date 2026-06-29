/**
 * Module 4 · Section 2 · Subsection 6 — Cable Installation Methods
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   Containment systems (tray, ladder, basket, trunking, conduit), support spacing,
 *   minimum bending radii, BS 7671 Chapter 52 / BS 6701 segregation between Band I /
 *   Band II / data cables, fire-stopping at compartment boundaries and labelling.
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

const TITLE = 'Cable Installation Methods - HNC Module 4 Section 2.6';
const DESCRIPTION =
  'Master cable containment systems including tray, trunking and conduit, along with supports, bending radii, segregation and labelling requirements.';

const quickCheckQuestions = [
  {
    id: 'tray-advantage',
    question: 'What is the main advantage of perforated cable tray for power cables?',
    options: [
      'It provides complete protection against mechanical damage',
      'Better air circulation for heat dissipation',
      'It allows the highest fill ratio of any containment',
      'It removes the need to earth the containment',
    ],
    correctIndex: 1,
    explanation:
      'Perforated cable tray allows air to circulate around cables, improving heat dissipation. This gives better current-carrying capacity (Reference Method E) compared to enclosed containment.',
  },
  {
    id: 'bend-radius',
    question:
      'What is the typical minimum bending radius for multicore power cables during installation?',
    options: [
      '2× cable diameter',
      '4× cable diameter',
      '10× cable diameter',
      '6× cable diameter',
    ],
    correctIndex: 3,
    explanation:
      'For multicore power cables, the minimum bending radius during installation is typically 6× the overall cable diameter. Single-core cables may require 8× or more depending on conductor size.',
  },
  {
    id: 'segregation-reason',
    question: 'Why must data/telecom cables be segregated from power cables?',
    options: [
      'Electromagnetic interference from power can corrupt data signals',
      'Data cables operate at a higher voltage than power cables',
      'Power cables must be kept warmer than data cables',
      'Data cables cannot share the same fire compartment',
    ],
    correctIndex: 0,
    explanation:
      'Power cables generate electromagnetic fields that can induce noise in data cables, causing signal corruption. BS 7671 Chapter 52 and BS 6701 require segregation or screening.',
  },
  {
    id: 'support-spacing',
    question: 'What determines the spacing of cable supports?',
    options: [
      'Cable type, size and weight to prevent sagging',
      'The colour of the cable sheath only',
      'The voltage rating of the circuit only',
      'The ambient temperature of the location only',
    ],
    correctIndex: 0,
    explanation:
      'Support spacing depends on cable construction, weight, and the containment type. Tables in BS 7671 provide maximum spacing to prevent excessive sagging and mechanical stress.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which containment system provides the best current-carrying capacity for multicore cables?',
    options: [
      'Conduit in thermal insulation',
      'Perforated cable tray',
      'Enclosed trunking',
      'Surface-mounted conduit',
    ],
    correctAnswer: 1,
    explanation:
      'Perforated cable tray (Reference Method E) provides the best air circulation around cables, resulting in the highest current-carrying capacity of common containment methods.',
  },
  {
    id: 2,
    question: 'What is the maximum fill ratio for trunking according to BS 7671?',
    options: [
      '55%',
      '35%',
      '45%',
      '65%',
    ],
    correctAnswer: 2,
    explanation:
      'BS 7671 recommends a maximum 45% fill ratio for trunking. This allows space for heat dissipation and makes cable installation and maintenance practical.',
  },
  {
    id: 3,
    question: 'Metal conduit can be used as the CPC provided:',
    options: [
      'It is painted to prevent corrosion at every joint',
      'A separate green/yellow conductor also runs inside it',
      'It is installed only on vertical sections of the route',
      'Joints maintain electrical continuity and have adequate cross-sectional area',
    ],
    correctAnswer: 3,
    explanation:
      'Metal conduit can serve as CPC when all joints maintain electrical continuity (proper couplers, not just threaded connections) and the conduit CSA is adequate for fault current.',
  },
  {
    id: 4,
    question: 'When cables cross a building movement joint, what should be provided?',
    options: [
      'Flexible section or loop to accommodate movement',
      'BS 5839 (fire detection) and BS 5266 (emergency lighting)',
      'Tamper detection and backup power systems',
      'The cpc may be a smaller cross-sectional area',
    ],
    correctAnswer: 0,
    explanation:
      'Movement joints allow building sections to expand, contract, or move independently. Cables crossing them must have slack or flexible sections to prevent damage from movement.',
  },
  {
    id: 5,
    question: 'What is the minimum separation between power and data cables in the same trunking?',
    options: [
      '50mm',
      '300mm or metal divider',
      'No separation required',
      'Not permitted - must be in separate trunking',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671 permits power and data cables in the same trunking if separated by 300mm or a metal divider. Many specifiers require complete segregation for cleaner installations.',
  },
  {
    id: 6,
    question: 'Why must SWA cable glands be correctly tightened?',
    options: [
      'To prevent the conductors overheating during normal load',
      'To improve the voltage drop performance of the circuit',
      'To grip armour wires for electrical continuity and mechanical retention',
      'To reduce the bending radius required at the termination',
    ],
    correctAnswer: 2,
    explanation:
      'Glands must grip the armour wires to provide electrical continuity (for CPC function) and mechanical retention (preventing cable pullout). Both cone and nut must be properly tightened.',
  },
  {
    id: 7,
    question: 'What is the primary purpose of cable labelling?',
    options: [
      'To indicate the cable manufacturer and batch number',
      'To show the date the cable was installed',
      'To confirm the cable meets its current-carrying capacity',
      'For identification during maintenance, fault finding and future modifications',
    ],
    correctAnswer: 3,
    explanation:
      'Clear labelling enables safe isolation, efficient fault finding, and accurate identification during modifications. BS 7671 requires cables to be identifiable at termination points.',
  },
  {
    id: 8,
    question: 'For vertical cable runs, what is the maximum spacing for supports?',
    options: [
      'Depends on cable type and size',
      'Always 450mm regardless of cable',
      'The same as the horizontal spacing exactly',
      'No supports are needed on vertical runs',
    ],
    correctAnswer: 0,
    explanation:
      'Vertical support spacing varies by cable type. Heavy SWA cables may need supports every 1-2m, while lighter cables can span further. Tables in BS 7671 provide guidance.',
  },
  {
    id: 9,
    question: 'What is the purpose of fire-stopping where cables pass through compartment walls?',
    options: [
      'Rate of heat transfer through a building element (thermal transmittance)',
      'To maintain fire compartmentation and prevent fire/smoke spread',
      'The weight of all persons, tools, materials, and equipment on the platform',
      'Gather information from the user about symptoms',
    ],
    correctAnswer: 1,
    explanation:
      'Fire-stopping maintains the fire resistance of compartment walls and floors. Without it, fire and smoke could spread rapidly through cable penetrations, undermining the fire strategy.',
  },
  {
    id: 10,
    question: 'When should draw wires be left in conduit installations?',
    options: [
      'Only where the conduit run exceeds 50 metres',
      'Only on circuits protected by an RCD',
      'Always, for future cable additions or replacements',
      'Only when the conduit is buried underground',
    ],
    correctAnswer: 2,
    explanation:
      'Good practice is to leave draw wires in conduit for future maintenance. This makes adding or replacing cables much easier than feeding new draw wires through long or complex runs.',
  },
];

const faqs = [
  {
    question: 'How do I choose between cable tray, trunking and conduit?',
    answer:
      'Cable tray suits large cable quantities (risers, plantrooms) and offers best current capacity. Trunking is ideal for accessible routes needing neat appearance (offices, corridors) and allows easy modification. Conduit protects individual circuits and suits surface/concealed runs. Consider cable quantity, accessibility needs, aesthetics, future modifications and cost.',
  },
  {
    question: 'What fire-stopping products should I use?',
    answer:
      "Use fire-stopping products tested and certified for the specific penetration type (cables through walls/floors). Options include intumescent collars, fire-rated pillows, ablative coatings and fire-resistant compound. The product must match the fire rating required (30, 60, 90, 120 minutes) and be installed per manufacturer's instructions.",
  },
  {
    question: 'Can I run cables through structural members like steelwork?',
    answer:
      'Generally avoid penetrating structural members. If essential, obtain structural engineer approval first. Holes must be sleeved, sized appropriately, and positioned to minimise structural impact. Fire protection may need reinstating. Consider alternative routes before penetrating structure.',
  },
  {
    question: 'What spacing is required between cable supports?',
    answer:
      'BS 7671 Table 4A provides guidance. Typically: for unarmoured horizontal cables in trunking, 450mm max; clipped direct on surface, 250-400mm depending on cable size; vertical runs may need closer spacing for heavy cables. SWA cables can span further due to their self-supporting nature.',
  },
  {
    question: 'How should cables be labelled?',
    answer:
      'Labels should be durable (engraved or printed, not handwritten), located at both ends and at intermediate access points, include circuit reference matching distribution board schedule, and use consistent format throughout the installation. Consider cable ties with labels, wraparound labels, or engraved ferrules.',
  },
  {
    question: 'What are the requirements for cables in ceiling voids?',
    answer:
      'Cables in accessible ceiling voids should be supported (not laid on ceiling tiles), adequately protected from mechanical damage, not in contact with thermal insulation (or derated appropriately), and accessible for inspection. Fire barriers may be needed at compartment boundaries.',
  },
];

const HNCModule4Section2_6 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 4 · Section 2 · Subsection 6"
            title="Cable Installation Methods"
            description="Containment systems, supports, bending radii, segregation and labelling for professional installations."
            tone="purple"
          />

          <TLDR
            points={[
              'Containment choice (tray, ladder, basket, trunking, conduit) drives reference method selection — and therefore I_z — under BS 7671 Appendix 4.',
              'Bending radius limits: typically 8 × OD for fixed installations (PVC singles), 12 × OD for SWA, 6 × OD for flex. Tighter and the conductor strands break.',
              'Containment fill: BS 7671 Appendix 4 / ESC Best Practice Guide gives ≤ 45% fill for trunking, ≤ 40% for conduit — overfilling traps heat and breaches reference method.',
              'Segregation: Band I (LV) from Band II (ELV/data) by physical separation, separate compartments, or properly bonded screened cable — Reg 528.1.',
              'BS 7671 Reg 134.1.1 makes good workmanship in installation a mandatory requirement — including bend radius, fill, support spacing and segregation.',
            ]}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 134.1.1 (Good workmanship in erection)"
            clause="Good workmanship shall include the correct use of appropriate tools, techniques and practices (for example correct cable stripping, securing, routing, termination and protection). Use of incorrect tools or amateur techniques may constitute failure to meet the regulation."
            meaning={
              <>
                Reg 134.1.1 puts cable installation method squarely under the workmanship duty.
                Bending radius, support spacing, fill ratio, segregation, gland torque and
                termination quality are all design specifications you make, then inspect under
                Part 6. Skip any of them and the install fails the workmanship test — even if
                the cable schedule is perfect on paper.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 134.1.1; Reg 521 (wiring systems); Reg 522 (external influences); Reg 528 (segregation); Electrical Safety Council Best Practice Guide 2."
          />

          <LearningOutcomes
            outcomes={[
              'Select appropriate containment systems for different applications',
              'Understand cable tray, trunking and conduit characteristics',
              'Apply minimum bending radius requirements',
              'Design cable support systems correctly',
              'Implement segregation between power and data cables',
              'Apply labelling and identification requirements',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock title="Containment Systems">
            <p>
              Cable containment protects cables from damage, provides support, and organises cable
              routes. The choice of containment affects current-carrying capacity, installation
              cost and aesthetics.
            </p>
            <p>
              <strong>Containment types comparison (type / best for / reference method / characteristics):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Cable tray (perforated)</strong> — plantrooms, risers — Method E (best) —
                best heat dissipation, easy access
              </li>
              <li>
                <strong>Cable ladder</strong> — heavy cables, long spans — Method E — strong, good
                for SWA
              </li>
              <li>
                <strong>Cable basket</strong> — data cables, offices — Method E — lightweight,
                flexible routing
              </li>
              <li>
                <strong>Trunking (metal)</strong> — offices, corridors — Method B — neat,
                accessible, can be decorative
              </li>
              <li>
                <strong>Conduit (surface)</strong> — single circuits — Method B — good protection,
                concealed or exposed
              </li>
              <li>
                <strong>Conduit (insulated wall)</strong> — concealed runs — Method A (poorest) —
                hidden, but poor heat dissipation
              </li>
            </ul>
            <p>
              <strong>Cable tray sizing:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Calculate total cable cross-sectional area</li>
              <li>Allow 50% spare for future additions</li>
              <li>Consider return bends and cable joints</li>
              <li>Standard widths: 75, 100, 150, 225, 300, 450, 600mm</li>
            </ul>
            <p>
              <strong>Trunking fill limits:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Maximum 45% fill recommended</li>
              <li>Account for cable bends at corners</li>
              <li>Space factor tables in BS 7671</li>
              <li>Factor = cable OD² × quantity</li>
            </ul>
            <p>
              <strong>Capacity note:</strong> Reference Method E (cable tray) can give 20-40%
              higher current ratings than Method B (trunking) for the same cable size.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Supports and Bending Radii">
            <p>
              Proper cable support prevents sagging, mechanical stress and damage. Bending radii
              must be respected to avoid damaging cable insulation and conductors.
            </p>
            <p>
              <strong>Cable support spacing — horizontal (cable type / clipped direct / on tray-ladder):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Small flat cables (&lt;10mm) — 250mm — N/A (in trunking)</li>
              <li>Flat T&amp;E cables — 300mm — contained in trunking</li>
              <li>Multicore (&lt;9mm OD) — 250mm — tray support sufficient</li>
              <li>Multicore (9-15mm OD) — 300mm — tray support sufficient</li>
              <li>Multicore (15-20mm OD) — 350mm — tray support sufficient</li>
              <li>SWA cables — 450-600mm — self-supporting over long spans</li>
            </ul>
            <p>
              <strong>Minimum bending radii — multicore cables:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Fixed installation: <strong>6× OD</strong>
              </li>
              <li>
                During installation: <strong>6× OD</strong>
              </li>
              <li>
                XLPE insulation: <strong>8× OD</strong> preferred
              </li>
            </ul>
            <p>
              <strong>Minimum bending radii — single-core cables:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                25mm² and below: <strong>6× OD</strong>
              </li>
              <li>
                35-120mm²: <strong>8× OD</strong>
              </li>
              <li>
                150mm² and above: <strong>10× OD</strong>
              </li>
            </ul>
            <p>OD = overall diameter of cable.</p>
            <p>
              <strong>Vertical support requirements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Prevent cable weight causing damage at fixings</li>
              <li>Heavy SWA may need supports every 1-2m vertically</li>
              <li>Consider cleating to prevent slippage down tray</li>
              <li>Fire barrier supports needed at compartment floors</li>
            </ul>
            <p>
              <strong>Quality check:</strong> Inspect bends during installation — kinked or
              flattened cables indicate the bend was too tight.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Segregation Requirements">
            <p>
              Different cable types must often be segregated to prevent electromagnetic
              interference, fire spread, and to maintain system integrity. BS 7671 Chapter 52 and
              BS 6701 provide guidance.
            </p>
            <p>
              <strong>Cable categories for segregation (category / examples / segregation required from):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Band I</strong> — fire alarm, emergency comms, SELV — Band II unless
                screened
              </li>
              <li>
                <strong>Band II</strong> — power circuits (230V/400V) — Band I; data/telecom
              </li>
              <li>
                <strong>Telecom/Data</strong> — Cat 6, fibre, BMS — power cables
              </li>
              <li>
                <strong>Fire-resistant</strong> — FP cables — standard cables in fire
              </li>
            </ul>
            <p>
              <strong>Segregation methods — physical separation:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>300mm minimum spacing</li>
              <li>Separate containment systems</li>
              <li>Different cable routes</li>
            </ul>
            <p>
              <strong>Segregation methods — barriers / screening:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Metal dividers in shared trunking</li>
              <li>Screened cables (STP, SWA)</li>
              <li>Earthed metallic conduit</li>
            </ul>
            <p>
              <strong>Crossing points:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Where cables must cross, do so at <strong>90°</strong> to minimise coupling
              </li>
              <li>Maintain maximum practical spacing at crossing</li>
              <li>Consider screened cables for sensitive circuits</li>
              <li>Document crossing points for future reference</li>
            </ul>
            <p>
              <strong>Data centre tip:</strong> Complete physical separation is preferred — use
              separate tray systems at different levels for power and data.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Labelling and Documentation">
            <p>
              Proper labelling is essential for safe operation, maintenance and future
              modifications. BS 7671 requires cables to be identifiable, and good practice extends
              this to comprehensive cable management documentation.
            </p>
            <p>
              <strong>Label requirements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Both ends:</strong> label at origin (DB) and destination (equipment)
              </li>
              <li>
                <strong>Intermediate points:</strong> at junction boxes, through walls, at tray
                junctions
              </li>
              <li>
                <strong>Content:</strong> circuit reference, voltage, source DB, destination
              </li>
              <li>
                <strong>Durability:</strong> engraved, printed or UV-resistant — not handwritten
              </li>
            </ul>
            <p>
              <strong>Label types (type / application / durability):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Wrap-around labels — individual cables — good</li>
              <li>Cable ties with tags — grouped cables — moderate</li>
              <li>Engraved ferrules — termination points — excellent</li>
              <li>Heat-shrink labels — permanent identification — excellent</li>
            </ul>
            <p>
              <strong>Documentation to provide:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>As-built drawings:</strong> showing actual cable routes, not just design
                intent
              </li>
              <li>
                <strong>Cable schedules:</strong> type, size, length, circuit reference for each
                cable
              </li>
              <li>
                <strong>Test results:</strong> insulation resistance, continuity, polarity
              </li>
              <li>
                <strong>Distribution board schedules:</strong> matching label references
              </li>
              <li>
                <strong>Fire stopping:</strong> record of products used and locations
              </li>
            </ul>
            <p>
              <strong>Fire stopping requirements:</strong> where cables pass through fire
              compartment walls or floors:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Install proprietary fire-stopping to match wall/floor fire rating</li>
              <li>Allow for future cable additions where practical</li>
              <li>Label fire-stop locations for inspection access</li>
              <li>Record fire-stop product details in O&amp;M manual</li>
            </ul>
            <p>
              <strong>Best practice:</strong> Photograph cable routes before walls are closed —
              invaluable for future maintenance and modifications.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Installation Examples">
            <p>
              <strong>Example 1 — office floor distribution:</strong> power and data distribution
              for open-plan office, 500m² floor plate.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Floor trunking for workstation outlets (power)</li>
              <li>Raised floor void with basket for data cables</li>
              <li>Metal dado trunking around perimeter</li>
              <li>Segregation: minimum 50mm between power/data compartments</li>
              <li>Maintain 45% max fill in trunking</li>
              <li>Label all outlets to match floor plan references</li>
              <li>Fire-stop all penetrations to riser</li>
              <li>Trunking allows easy modifications as office layout changes</li>
            </ul>
            <p>
              <strong>Example 2 — main riser installation:</strong> 10-storey commercial building
              electrical riser, sub-mains and small power.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Heavy-duty cable ladder for SWA sub-mains</li>
              <li>Perforated cable tray for final circuit cables</li>
              <li>Separate basket system for data/BMS</li>
              <li>Vertical support cleats every 2m for SWA</li>
              <li>Minimum bend radius 6× OD at floor entries</li>
              <li>Fire barriers at each floor with fire-stop</li>
              <li>Label all cables at each floor level</li>
              <li>Ladder rack supports heavy sub-mains over long vertical spans</li>
            </ul>
            <p>
              <strong>Example 3 — plant room cable management:</strong> basement plant room with
              multiple AHUs, pumps and chillers.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Main cable tray routes from MCC</li>
              <li>Steel conduit drops to individual motors</li>
              <li>SWA clipped direct for short runs</li>
              <li>Support tray at 1.5m centres, cleats at drops</li>
              <li>Maintain 300mm clearance from hot surfaces</li>
              <li>IP-rated glands for damp environment</li>
              <li>Clear labelling of motor circuits matching MCC</li>
              <li>Combination of containment suits varied equipment</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Installation quality checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>No kinks or tight bends — minimum 6× cable OD</li>
              <li>Supports correctly spaced — no excessive sagging</li>
              <li>Cables secured but not over-tightened in clips</li>
              <li>Segregation maintained throughout route</li>
              <li>Fire-stopping complete and labelled</li>
              <li>All cables labelled at both ends</li>
            </ul>
            <p>
              <strong>Containment earthing:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Metal tray/trunking should be earthed throughout</li>
              <li>Use proper earth links at joints</li>
              <li>Connect to MET at origin</li>
              <li>Test continuity before energising circuits</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Overloading containment</strong> — respect 45% fill limit
                </li>
                <li>
                  <strong>Missing fire-stops</strong> — every compartment penetration needs stopping
                </li>
                <li>
                  <strong>Poor gland selection</strong> — match gland IP rating to environment
                </li>
                <li>
                  <strong>Inadequate segregation</strong> — power/data too close causes interference
                </li>
              </ul>
            }
            doInstead="Calculate cable fill against the 45% trunking limit at design stage, fire-stop every penetration through a compartment wall or floor and record the product used, choose gland IP rating to suit the actual environment, and keep power and data cables 300mm apart or use a metal divider."
          />

          <SectionRule />

          <Scenario
            title="Riser cable strategy — designing for thermal limits and fire compartmentation"
            situation={
              <>
                A 10-storey commercial riser must accommodate: 4 sub-mains (Cu/XLPE/SWA from
                main switchroom to each floor DB cluster), 2 fire-rated cables (FP400 to smoke
                extract panels), Cat 6A data, and BMS comms. Fire compartments at each floor;
                ambient riser temperature 35&nbsp;°C in summer.
              </>
            }
            whatToDo={
              <>
                Use perforated tray for the sub-mains (reference method E or F) — better
                ventilation than enclosed trunking, much higher I_z. Group 4 sub-mains: C_g ≈
                0.65, C_a (35&nbsp;°C XLPE) ≈ 0.96. FP400 fire cables: separate clipped-direct
                tray, segregated from SWA by Reg 528.1 (different cable category). Data and BMS
                in a separate parallel basket — keep ≥ 200&nbsp;mm clear of LV power runs to
                limit EMC interference. Fire-stop every floor through the riser slab penetration
                (intumescent collar around each cable) to maintain fire compartmentation. Specify
                support spacing per BS 7671 Table 4A2 / manufacturer data; bending radius at
                least 12 × OD for SWA at the cable break-outs.
              </>
            }
            whyItMatters={
              <>
                Reg 134.1.1 makes the workmanship of containment installation a regulatory
                requirement. A riser fire-stop missed at one floor means the riser becomes the
                fire route — bypassing the building&rsquo;s fire compartmentation strategy. Get
                the install method wrong and you compromise both Part 6 verification and Building
                Regs Part B.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Containment choice sets the reference method (A–G in Appendix 4) — get it wrong and the I_z calculation is wrong.',
              'Bending radius limits: ≥ 8 × OD for PVC singles, ≥ 12 × OD for SWA, ≥ 6 × OD for flex. Tighter breaks strands or fractures armour.',
              'Fill ratios: ≤ 45% for trunking, ≤ 40% for conduit (ESC Best Practice Guide 2) — overfilling traps heat and triggers extra grouping derate.',
              'Segregation (Reg 528.1): physical separation, separate compartments, or properly bonded screen between Band I (LV) and Band II (ELV/data).',
              'Fire compartmentation: every cable penetration through a fire-rated wall or floor must be sealed to maintain the compartment integrity.',
              'Reg 134.1.1 makes good workmanship — including support spacing, bend radius, fill, gland torque, termination — a mandatory requirement.',
              'External installations need additional protection: warning tape, sand bedding, mechanical cover, drip loops on cable break-outs (Reg 522.8).',
              'Document the containment strategy on the cable schedule and on coordination drawings — services coordination is a workmanship issue too.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section2-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Cable types and selection
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Protection and discrimination
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule4Section2_6;
