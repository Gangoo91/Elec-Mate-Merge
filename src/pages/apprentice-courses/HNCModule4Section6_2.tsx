/**
 * Module 4 · Section 6 · Subsection 2 — Electrical Drawings
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   Single-line / schematic / wiring / layout / reflected ceiling plan drawings, BS EN 61082
 *   documentation, BS EN 60617 graphical symbols, BS EN 81346 reference designations and
 *   BS 1192 / AEC (UK) CAD layer naming for coordinated multi-discipline drawing sets.
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

const TITLE = 'Electrical Drawings - HNC Module 4 Section 6.2';
const DESCRIPTION =
  'Master electrical drawing types for building services: single-line diagrams, schematic diagrams, layout drawings, CAD standards and BS EN 61082 compliance.';

const quickCheckQuestions = [
  {
    id: 'single-line-purpose',
    question: 'What is the primary purpose of a single-line diagram?',
    options: [
      'Show the physical position of equipment on a plan',
      'Represent the power distribution hierarchy',
      'Detail the terminal-by-terminal wiring connections',
      'List the lighting calculation results for each room',
    ],
    correctIndex: 1,
    explanation:
      'Single-line diagrams represent the power distribution hierarchy from intake to final circuits, showing the relationship between distribution boards, protective devices and loads.',
  },
  {
    id: 'schematic-use',
    question: 'When would you use a schematic diagram rather than a layout drawing?',
    options: [
      'To explain control logic and circuit operation',
      'To show equipment locations',
      'To calculate cable lengths',
      'To coordinate with architects',
    ],
    correctIndex: 0,
    explanation:
      'Schematic diagrams explain how circuits work and the logical connections between components, particularly useful for control systems, rather than physical locations.',
  },
  {
    id: 'bs-en-61082',
    question: 'What does BS EN 61082 cover?',
    options: [
      'Graphical symbols for electrical diagrams',
      'CAD layer naming conventions for the UK',
      'Preparation of documents in electrotechnology',
      'Reference designation systems for equipment',
    ],
    correctIndex: 2,
    explanation:
      'BS EN 61082 covers the preparation of documents used in electrotechnology, including drawing standards, symbols, and documentation practices.',
  },
  {
    id: 'cad-layers',
    question: 'Why is layer management important in CAD electrical drawings?',
    options: [
      'It organises information for coordination and output control',
      'It reduces the file size of the drawing significantly',
      'It is required to print the drawing in colour',
      'It automatically calculates cable lengths from the model',
    ],
    correctIndex: 0,
    explanation:
      'Layer management organises different types of information (circuits, equipment, annotations) allowing selective display, coordination with other disciplines, and controlled output.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What information is typically shown on a single-line diagram?',
    options: [
      'Room dimensions, furniture layout and finishes',
      'Protective device ratings, cable sizes and distribution hierarchy',
      'Luminaire mounting heights and ceiling grid positions',
      'Terminal numbers and individual wire colours',
    ],
    correctAnswer: 1,
    explanation:
      'Single-line diagrams show the electrical distribution hierarchy including protective devices, cable sizes, and the relationship between main switchboard, distribution boards and final circuits.',
  },
  {
    id: 2,
    question: 'Which standard governs graphical symbols for electrical diagrams?',
    options: [
      'BS 5266',
      'BS 7671',
      'BS EN 60617',
      'BS EN 12464',
    ],
    correctAnswer: 2,
    explanation:
      'BS EN 60617 (IEC 60617) provides graphical symbols for use in electrical diagrams, ensuring consistent representation across the industry.',
  },
  {
    id: 3,
    question: 'What is the purpose of a layout drawing?',
    options: [
      'Show the distribution hierarchy from intake to circuits',
      'Explain the control logic of a motor starter',
      'Tabulate the cable sizes and protective devices',
      'Show the physical location of equipment on floor plans',
    ],
    correctAnswer: 3,
    explanation:
      'Layout drawings show the physical location of electrical equipment (socket outlets, luminaires, distribution boards) on floor plans, coordinated with architectural backgrounds.',
  },
  {
    id: 4,
    question: 'What scale is typically used for electrical layout drawings?',
    options: [
      '1:50 or 1:100',
      '1:10',
      '1:500',
      '1:1',
    ],
    correctAnswer: 0,
    explanation:
      'Electrical layout drawings typically use 1:50 or 1:100 scale, matching architectural plans for coordination. Larger scales (1:20, 1:10) may be used for plant rooms.',
  },
  {
    id: 5,
    question: 'What does a wiring diagram show that a schematic does not?',
    options: [
      'The overall distribution hierarchy of the building',
      'Terminal numbers and actual wire connections',
      'The control logic and sequence of operation',
      'The physical location of equipment on the floor',
    ],
    correctAnswer: 1,
    explanation:
      'Wiring diagrams show actual connections including terminal numbers and wire identification, providing the detail needed for installation and maintenance.',
  },
  {
    id: 6,
    question: 'Which CAD layer naming convention is commonly used in UK construction?',
    options: [
      'Random abbreviations',
      'American AIA standards',
      'BS 1192 / AEC (UK) layer naming',
      'Manufacturer-specific names',
    ],
    correctAnswer: 2,
    explanation:
      'BS 1192 and AEC (UK) guidelines provide standardised layer naming conventions ensuring consistency and enabling coordination across disciplines.',
  },
  {
    id: 7,
    question: 'What is the purpose of the drawing title block?',
    options: [
      'To show the legend of all graphical symbols used',
      'To list the bill of quantities for the project',
      'To provide a key to the CAD layer naming scheme',
      'Provide project, drawing identification, revision and approval information',
    ],
    correctAnswer: 3,
    explanation:
      'The title block provides essential drawing information including project details, drawing number, revision status, scale, date, and approval signatures.',
  },
  {
    id: 8,
    question: 'How should revisions be managed on electrical drawings?',
    options: [
      'Use revision clouds, updated revision table, and maintain drawing history',
      'Overwrite the previous issue and keep the same revision letter',
      'Record changes only on the contractor copy on site',
      'Delete superseded drawings to avoid confusion',
    ],
    correctAnswer: 0,
    explanation:
      'Revisions should be clearly marked with clouds, logged in a revision table with descriptions, and previous versions archived for audit trail.',
  },
  {
    id: 9,
    question: 'What is a reflected ceiling plan (RCP)?',
    options: [
      'A plan showing the floor finishes and skirting details',
      'A plan showing ceiling-mounted items as if looking up',
      'A section view through the ceiling void services',
      'A schedule of all luminaires used in the project',
    ],
    correctAnswer: 1,
    explanation:
      'A reflected ceiling plan shows ceiling-mounted items (luminaires, detectors) as if looking up at a mirror on the floor, maintaining correct orientation relative to floor plans.',
  },
  {
    id: 10,
    question: 'Why should electrical drawings reference the specification?',
    options: [
      'To reduce the number of drawings needed for the project',
      'To allow the drawings to be printed at a smaller scale',
      'To link graphical information to quality and performance requirements',
      'To remove the need for a separate schedule of equipment',
    ],
    correctAnswer: 2,
    explanation:
      "Cross-referencing ensures users understand that drawings show 'what and where', while specifications define 'how and to what standard', working together as a complete package.",
  },
];

const faqs = [
  {
    question: 'What software is commonly used for electrical drawings?',
    answer:
      'AutoCAD and Revit are the most common platforms in UK building services. AutoCAD is used for traditional 2D drawings, while Revit enables BIM with intelligent 3D models. Other packages include MicroStation and various electrical-specific tools like Amtech or Trimble.',
  },
  {
    question: 'How do electrical drawings coordinate with other disciplines?',
    answer:
      'Coordination occurs through shared architectural backgrounds, overlay comparisons, and in BIM projects through federated models. Regular coordination meetings review clashes and resolve conflicts. Layer management and drawing references ensure changes are tracked across disciplines.',
  },
  {
    question: "What is the difference between 'for construction' and 'as-built' drawings?",
    answer:
      'For construction drawings show the design intent before installation. As-built (or record) drawings are updated during and after construction to show what was actually installed, including any variations. As-built drawings are essential for O&M manuals and future maintenance.',
  },
  {
    question: 'Should cable routes be shown on layout drawings?',
    answer:
      'It depends on project requirements. Some designers show indicative routes, others leave routing to the contractor. If routes are critical (avoiding certain areas, specific containment requirements), they should be shown. Complex routes may need separate containment drawings.',
  },
  {
    question: 'How detailed should control schematics be?',
    answer:
      'Control schematics should show all components, their interconnections, terminal references, and sufficient detail for commissioning and fault-finding. They should include interlocks with other systems, status indication, and interface points with BMS or fire systems.',
  },
];

const HNCModule4Section6_2 = () => {
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
            eyebrow="Module 4 · Section 6 · Subsection 2"
            title="Electrical Drawings"
            description="Understanding drawing types, standards and CAD practices for building services documentation."
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              'Identify different types of electrical drawings and their purposes',
              'Apply BS EN 61082 and BS EN 60617 standards',
              'Create single-line diagrams showing distribution hierarchy',
              'Develop layout drawings coordinated with architecture',
              'Apply CAD standards and layer management',
              'Manage drawing revisions and coordination',
            ]}
            initialVisibleCount={3}
          />

          <TLDR
            points={[
              'Drawing types: single-line (distribution hierarchy), schematics (controls/interlocks), layouts (containment, equipment positions), block (system overview).',
              'BS EN 61082-1 = preparation of documents. BS EN 60617 = graphical symbols. Use the standard libraries; bespoke symbols cause confusion at handover.',
              'Single-line shows: incomer, transformers, switchgear, busbars, cable size and length, protective device rating, fault level at each board.',
              'Layout drawings xref the architectural model — reload xrefs before every issue or you’re drawing on stale walls.',
              'Reg 514.9.2 (introduced A4:2026) requires that all diagrams, charts, and information or instruction notices comply with the applicable specified standards. Your drawings are now an explicit BS 7671 deliverable.',
            ]}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 514.9.2"
            clause="Regulation 514.9.2 has been introduced to advise that all diagrams, charts, and information or instruction notices comply with the applicable standards specified."
            meaning={
              <>
                A4:2026 added Reg 514.9.2 specifically to bring drawings, charts and notices under
                a documented standards regime. For the HNC designer that means single-line
                diagrams, schematics, schedules and on-board notices reference and follow BS EN
                61082-1, BS EN 60617 (symbols), BS 1192 / AEC (layers), and the BS 7671 schedule
                pro-formas in Appendix 6. Hand-drawn diagrams or non-standard symbols on a
                modern installation now carry an explicit non-compliance against Reg 514.9.2.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 514.9.2."
          />

          <SectionRule />

          <ConceptBlock title="Single-Line Diagrams">
            <p>
              Single-line diagrams (also called one-line diagrams) represent the electrical
              distribution system using simplified notation. Each line represents a circuit
              regardless of the actual number of conductors, showing the hierarchy from supply
              intake to final circuits.
            </p>
            <p>
              <strong>Information shown on single-line diagrams:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Supply characteristics (voltage, phases, fault level)</li>
              <li>Main switchgear and distribution board references</li>
              <li>Protective device types and ratings (MCB, MCCB, RCD)</li>
              <li>Cable sizes, types and lengths</li>
              <li>Metering and monitoring points</li>
              <li>Essential/standby power arrangements</li>
            </ul>
            <p>
              <strong>Single-line diagram structure:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>DNO Supply → Main Switchboard</li>
              <li>Main Switchboard → Sub-distribution boards</li>
              <li>Sub-distribution boards → Final distribution boards</li>
              <li>Final distribution boards → Final circuits (lighting, power, etc.)</li>
            </ul>
            <p>
              <strong>Typical notation on single-line (element / example notation / meaning):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Incomer — 800A MCCB — 800 Amp moulded case circuit breaker</li>
              <li>Cable — 4c 95mm² XLPE/SWA — 4-core 95mm² XLPE insulated, steel wire armoured</li>
              <li>Outgoing way — 32A Type B MCB — 32 Amp Type B miniature circuit breaker</li>
              <li>RCD — 100A 30mA RCCB — 100A residual current device, 30mA sensitivity</li>
            </ul>
            <p>
              <strong>Key point:</strong> Single-line diagrams are essential for understanding
              system architecture and for fault calculations.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Schematic and Wiring Diagrams">
            <p>
              Schematic diagrams show how circuits function logically, while wiring diagrams show
              the actual connections for installation. Both are essential for control systems, motor
              circuits and complex installations.
            </p>
            <p>
              <strong>Schematic diagram features:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Shows circuit logic and operation</li>
              <li>Uses standard symbols (BS EN 60617)</li>
              <li>Components arranged for clarity</li>
              <li>Includes interlocks and controls</li>
              <li>Essential for commissioning</li>
            </ul>
            <p>
              <strong>Wiring diagram features:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Shows actual wire connections</li>
              <li>Includes terminal references</li>
              <li>Wire numbering and colours</li>
              <li>Cable gland positions</li>
              <li>Essential for installation</li>
            </ul>
            <p>
              <strong>Common applications (application / schematic shows / wiring shows):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Motor starter — control logic, interlocks — terminal connections</li>
              <li>Lighting control — switching arrangement — switch wiring detail</li>
              <li>Fire alarm interface — cause and effect logic — interface connections</li>
              <li>BMS interface — monitoring/control points — I/O module wiring</li>
            </ul>
            <p>
              <strong>Best practice:</strong> Cross-reference schematic and wiring diagrams with
              unique component tags.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Layout Drawings">
            <p>
              Layout drawings show the physical location of electrical equipment on floor plans.
              They are produced on architectural backgrounds and coordinated with other building
              services and structural elements.
            </p>
            <p>
              <strong>Types of layout drawings:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Lighting layouts:</strong> Luminaire positions, switching zones, emergency
                lighting
              </li>
              <li>
                <strong>Power layouts:</strong> Socket outlets, FCUs, isolators, equipment
                connections
              </li>
              <li>
                <strong>Containment layouts:</strong> Cable tray, trunking, conduit routes
              </li>
              <li>
                <strong>Reflected ceiling plans:</strong> Ceiling-mounted equipment
              </li>
              <li>
                <strong>Plant room layouts:</strong> Detailed equipment positioning
              </li>
            </ul>
            <p>
              <strong>Layout drawing requirements (element / requirement):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Scale:</strong> 1:50 general, 1:20 or 1:10 plant rooms
              </li>
              <li>
                <strong>Background:</strong> Current architectural xref
              </li>
              <li>
                <strong>Equipment:</strong> Standard symbols with tags
              </li>
              <li>
                <strong>Dimensions:</strong> From gridlines or walls as appropriate
              </li>
              <li>
                <strong>Annotations:</strong> Equipment types, circuit references
              </li>
            </ul>
            <p>
              <strong>Coordination considerations:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Check luminaire positions against ceiling grid and services</li>
              <li>Verify socket heights against furniture layouts</li>
              <li>Coordinate containment routes with structural openings</li>
              <li>Avoid clashes with HVAC, sprinklers and other services</li>
            </ul>
            <p>
              <strong>Critical:</strong> Always use the latest architectural background and
              coordinate changes promptly.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="CAD Standards and BS EN 61082">
            <p>
              Consistent CAD standards ensure drawings are clear, coordinated and professionally
              presented. BS EN 61082 provides the overarching standard for electrotechnical
              documentation, complemented by UK-specific CAD conventions.
            </p>
            <p>
              <strong>BS EN 61082 key requirements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Document identification and structure</li>
              <li>Reference designation systems (BS EN 81346)</li>
              <li>Graphical symbols (BS EN 60617)</li>
              <li>Signal and connection presentation</li>
              <li>Documentation classification</li>
            </ul>
            <p>
              <strong>CAD layer naming (BS 1192 / AEC UK) — example A-E-Lighting-M-Layout:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>A = Discipline (Architecture)</li>
              <li>E = Sub-discipline (Electrical)</li>
              <li>Lighting = Element</li>
              <li>M = Model/Drawing type</li>
              <li>Layout = Presentation</li>
            </ul>
            <p>
              <strong>Standard line types:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Continuous — equipment, containment</li>
              <li>Dashed — hidden items</li>
              <li>Centre line — centre lines, symmetry</li>
              <li>Phantom — future work, options</li>
            </ul>
            <p>
              <strong>Text standards:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Title: 5mm (1:50), 3.5mm (1:100)</li>
              <li>Body: 2.5mm (1:50), 2mm (1:100)</li>
              <li>Sans serif font (Arial, Simplex)</li>
              <li>Consistent capitalisation</li>
            </ul>
            <p>
              <strong>Drawing title block information:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Project name and number</li>
              <li>Drawing title and number</li>
              <li>Scale and paper size</li>
              <li>Revision status and history</li>
              <li>Drawn/checked/approved signatures and dates</li>
              <li>Status (preliminary, for construction, as-built)</li>
            </ul>
            <p>
              <strong>Quality control:</strong> All drawings should be checked against CAD standards
              before issue.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Drawing set organisation:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Use logical drawing numbering (E-001, E-002...)</li>
              <li>Group by type: Schematic, Layout, Details</li>
              <li>Include drawing register and index</li>
              <li>Maintain consistent title block across set</li>
            </ul>
            <p>
              <strong>Revision management:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Use revision clouds to highlight changes</li>
              <li>Update revision table with description</li>
              <li>Issue superseded drawings are archived</li>
              <li>Track revisions in document control system</li>
            </ul>
            <p>
              <strong>Key standards:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>BS EN 61082</strong> — documentation
              </li>
              <li>
                <strong>BS EN 60617</strong> — symbols
              </li>
              <li>
                <strong>BS EN 81346</strong> — designations
              </li>
              <li>
                <strong>BS 1192</strong> — CAD/BIM conventions
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Outdated backgrounds</strong> — using old architectural xrefs
                </li>
                <li>
                  <strong>Missing cross-references</strong> — not linking between drawings
                </li>
                <li>
                  <strong>Inconsistent symbols</strong> — using non-standard notation
                </li>
                <li>
                  <strong>Poor layer discipline</strong> — mixing information on layers
                </li>
              </ul>
            }
            doInstead="Always reload the current architectural xref before issue, set up cross-references between single-line, schematics and layouts (and matching tags on schedules), use the BS EN 60617 symbol library, and enforce BS 1192 / AEC layer naming with a CAD standards check."
          />

          <SectionRule />

          <Scenario
            title="Stage 4 issue — drawing pack for a 4-storey commercial fit-out"
            situation={
              <>
                You’re responsible for the M&amp;E electrical drawing pack at RIBA Stage 4 for a
                4-storey commercial fit-out. Architect issued revised plans last week. QS,
                contractor and building control all need a coordinated set on Friday. Eleven
                drawings: one single-line, four floor layouts, three schematic schedules, three
                section/elevation containment routes.
              </>
            }
            whatToDo={
              <>
                Reload the architectural xref before opening any drawing. Run a BS EN 60617
                symbol audit (most CAD systems offer a "non-standard symbol" report). Verify
                every layer matches BS 1192 / AEC standards. On the single-line: tag every board
                with its load schedule reference, every cable with size + length + protective
                device rating, fault level at each board (Reg 510.3 / Chapter 43 evidence). On
                the floor layouts: every luminaire, socket and switch tagged to the schedule.
                On the schematic schedules: cross-reference single-line tags. Issue a coordination
                check report (RFI clashes, xref staleness, layer breaches resolved). Add a "Notes
                to Reader" panel citing BS EN 61082-1, BS EN 60617, BS 1192/AEC and Reg 514.9.2
                — explicit standards compliance baked into the title block.
              </>
            }
            whyItMatters={
              <>
                A drawing pack with stale xrefs, mismatched tags and bespoke symbols generates
                hundreds of RFIs, undermines tender comparability and fails Reg 514.9.2 for the
                final O&amp;M. Drawings are an engineering deliverable governed by standards —
                not a graphic.
              </>
            }
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'BS EN 61082-1 (document preparation) and BS EN 60617 (symbols) are the baseline standards — both now reinforced by Reg 514.9.2.',
              'Single-line: incomer, switchgear, busbars, cables (size + length), protective devices (rating + setting), fault level at every board.',
              'Schematics: controls, interlocks, ATS sequence-of-operation, BMS interfaces — anything time-or-state dependent.',
              'Layout drawings xref the architectural model — reload before issue, every time.',
              'BS 1192 / AEC layer naming is the CAD discipline floor; enforce with a standards check at issue.',
              'Cross-reference tags between single-line, schematics, layouts and schedules — broken cross-refs are RFI generators.',
              'Revision management: reason, date, author, drawing references — BS 1192/ISO 19650 is the framework.',
              'Reg 514.9.2 (A4:2026) makes diagrams, charts and notices an explicit BS 7671 deliverable — design accordingly.',
            ]}
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section6-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                NBS specifications
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section6-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Schedules and data sheets
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule4Section6_2;
