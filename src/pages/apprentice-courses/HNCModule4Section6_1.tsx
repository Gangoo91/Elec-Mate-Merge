/**
 * Module 4 · Section 6 · Subsection 1 — NBS Specifications
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   National Building Specification work sections (Y70-Y74), clause structure (100/200/300
 *   /400/500 series), performance vs prescriptive specifications, NBS Create cloud platform
 *   and amendment management for coordinated tender and construction documentation.
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

const TITLE = 'NBS Specifications - HNC Module 4 Section 6.1';
const DESCRIPTION =
  'Master NBS specifications for building services: clause structure, NBS Create platform, performance vs prescriptive approaches, standard clauses and amendments coordination.';

const quickCheckQuestions = [
  {
    id: 'nbs-purpose',
    question: 'What is the primary purpose of NBS specifications?',
    options: [
      'To replace drawings entirely',
      'To communicate design requirements unambiguously',
      'To reduce project costs',
      'To simplify contractor selection',
    ],
    correctIndex: 1,
    explanation:
      'NBS specifications provide a structured, unambiguous method for communicating design requirements to contractors, complementing drawings and schedules.',
  },
  {
    id: 'performance-spec',
    question: 'What does a performance specification define?',
    options: [
      'Exact product models to use',
      'Required outcomes and standards',
      'Installation methods only',
      'Maintenance procedures',
    ],
    correctIndex: 1,
    explanation:
      'Performance specifications define the required outcomes, standards and performance criteria, allowing contractors flexibility in how they achieve these requirements.',
  },
  {
    id: 'clause-structure',
    question: "In NBS, what is a 'clause'?",
    options: [
      'A legal contract term',
      'An individual specification item within a work section',
      'A drawing reference',
      'A cost estimate',
    ],
    correctIndex: 1,
    explanation:
      'A clause is an individual specification item within a work section. Each clause addresses a specific requirement, product, or workmanship standard.',
  },
  {
    id: 'coordination',
    question: 'How should NBS specifications relate to drawings?',
    options: [
      'They should be independent',
      'Specifications replace drawings',
      'They must be coordinated to avoid conflicts',
      'Drawings always take precedence',
    ],
    correctIndex: 2,
    explanation:
      'Specifications and drawings must be carefully coordinated to avoid conflicts. They should complement each other - drawings show location and quantity, specifications show quality and performance.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What does NBS stand for in the context of building specifications?',
    options: [
      'National Building Standard',
      'National Building Specification',
      'New Building System',
      'National British Standard',
    ],
    correctAnswer: 1,
    explanation:
      "NBS stands for National Building Specification, the UK's leading specification system for construction projects.",
  },
  {
    id: 2,
    question: 'Which NBS work section covers general electrical installation requirements?',
    options: [
      'Section Y - Building services general',
      'Section Z - Building fabric reference',
      'Section V - Electrical supply',
      'Section W - Communications',
    ],
    correctAnswer: 0,
    explanation:
      'Section Y covers building services general requirements including electrical installations, with Y70-Y74 covering specific electrical sections.',
  },
  {
    id: 3,
    question:
      'What is the key advantage of a performance specification over a prescriptive specification?',
    options: [
      'It is always cheaper',
      'It allows contractor innovation while meeting required standards',
      'It eliminates the need for drawings',
      'It reduces design responsibility',
    ],
    correctAnswer: 1,
    explanation:
      'Performance specifications allow contractors flexibility to propose solutions that meet the required standards, potentially offering innovation and value engineering opportunities.',
  },
  {
    id: 4,
    question: "When should 'Preliminaries' clauses be included in an NBS specification?",
    options: [
      'Only for large projects',
      'At the start of each work section to set general requirements',
      'At the end of the document',
      'They are optional and rarely used',
    ],
    correctAnswer: 1,
    explanation:
      'Preliminaries clauses appear at the start of work sections to establish general requirements, standards, and workmanship that apply throughout that section.',
  },
  {
    id: 5,
    question: 'What is NBS Create?',
    options: [
      'A CAD drawing package',
      'A cloud-based specification writing platform',
      'A project management tool',
      'A cost estimation software',
    ],
    correctAnswer: 1,
    explanation:
      'NBS Create is a cloud-based platform for writing, editing and managing specifications, with integrated content and collaboration features.',
  },
  {
    id: 6,
    question: 'How should amendments to standard NBS clauses be handled?',
    options: [
      'Delete the original clause entirely',
      'Clearly identify amendments using project-specific text',
      'Never modify standard clauses',
      'Use handwritten notes on drawings',
    ],
    correctAnswer: 1,
    explanation:
      'Amendments should be clearly identified, typically shown in a different format (italics or colour), so users can distinguish project-specific requirements from standard text.',
  },
  {
    id: 7,
    question: 'What information should a prescriptive specification include for equipment?',
    options: [
      "Only the manufacturer's name",
      'Manufacturer, model, specific technical data and approval requirements',
      'Just a general description',
      'Cost information only',
    ],
    correctAnswer: 1,
    explanation:
      'Prescriptive specifications should include manufacturer, model number, specific technical characteristics, and any approval or certification requirements.',
  },
  {
    id: 8,
    question: 'Why is specification coordination with drawings critical?',
    options: [
      'It makes documents look professional',
      'It is a legal requirement',
      'Conflicting information causes disputes, delays and cost overruns',
      'It reduces the number of pages',
    ],
    correctAnswer: 2,
    explanation:
      'Conflicting information between specifications and drawings is a major cause of disputes, delays and cost overruns. Careful coordination prevents these issues.',
  },
  {
    id: 9,
    question: "What does 'equal and approved' mean in a specification?",
    options: [
      'Any product can be used',
      'Only the specified product is acceptable',
      'An equivalent product may be proposed subject to engineer approval',
      'The cheapest option must be selected',
    ],
    correctAnswer: 2,
    explanation:
      "'Equal and approved' allows contractors to propose equivalent products that meet the specification requirements, subject to the engineer's approval.",
  },
  {
    id: 10,
    question:
      'Which document typically takes precedence when there is a conflict between specification and drawings?',
    options: [
      'Always the drawings',
      'Always the specification',
      'As defined in the contract preliminaries (often specification takes precedence for quality)',
      'The contractor decides',
    ],
    correctAnswer: 2,
    explanation:
      'Precedence is typically defined in the contract preliminaries. Often specifications take precedence for quality and performance matters, while drawings govern location and quantity.',
  },
];

const faqs = [
  {
    question: 'What is the difference between NBS Building and NBS Create?',
    answer:
      'NBS Building was the previous specification system using a traditional clause-based structure. NBS Create is the current cloud-based platform offering improved collaboration, BIM integration, and manufacturer product data. NBS Building content has been migrated to NBS Create.',
  },
  {
    question: 'How do I choose between performance and prescriptive specifications?',
    answer:
      'Use performance specifications when you want to allow contractor innovation, when multiple products could meet requirements, or for design and build projects. Use prescriptive specifications when specific products are required for standardisation, when matching existing installations, or when the client has particular preferences.',
  },
  {
    question: 'Should specifications include pricing information?',
    answer:
      'No, specifications should focus on technical requirements, not costs. Pricing is addressed separately in bills of quantities or pricing documents. Including prices in specifications can cause confusion and conflicts with commercial documents.',
  },
  {
    question: 'How detailed should specifications be for a design and build project?',
    answer:
      'For design and build, specifications are typically performance-based and less detailed than traditional contracts. They define outcomes, standards and key constraints while allowing the contractor design flexibility. However, critical requirements should still be clearly specified.',
  },
];

const HNCModule4Section6_1 = () => {
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
            eyebrow="Module 4 · Section 6 · Subsection 1"
            title="NBS Specifications"
            description="Mastering structured specification writing for building services electrical installations."
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              'Understand NBS structure and work section organisation',
              'Differentiate between performance and prescriptive specifications',
              'Use NBS Create platform for specification development',
              'Write clear, unambiguous specification clauses',
              'Coordinate specifications with drawings and schedules',
              'Apply appropriate amendments to standard clauses',
            ]}
            initialVisibleCount={3}
          />

          <TLDR
            points={[
              'NBS is the UK industry-standard specification framework — Y70-Y74 cover building services electrical work sections.',
              'Clause structure: 100s (general), 200s (products), 300s (execution), 400s (system performance), 500s (completion).',
              'Performance specs say WHAT must be achieved (e.g. "general office Em 500 lx maintained"); prescriptive specs name the product. Most schemes blend both.',
              '"Shall" = mandatory, "should" = recommended, "may" = permitted. Get this wrong and the contractor will exploit it.',
              'BS 7671 Reg 510.3 binds the spec to BS 7671 — every named or performance-defined product still has to be selected and erected to comply with the wider Wiring Regulations.',
            ]}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 510.3"
            clause="Every item of equipment shall be selected and erected so as to allow compliance with the regulations stated in this chapter and the relevant regulations in other parts of BS 7671 and shall take account of manufacturers' instructions."
            meaning={
              <>
                NBS clauses describe products and performance, but Reg 510.3 is the BS 7671
                guarantee that each item is also selected and erected to comply with the Wiring
                Regulations and the manufacturer’s instructions. A specification that says
                "Switchgear shall comply with BS EN 61439-2" is fine; one that omits the BS 7671
                selection chain (Chapter 41 disconnection times, Chapter 43 fault levels, Chapter
                52 environmental ratings) leaves a gap the contractor will fall into.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 510.3."
          />

          <SectionRule />

          <ConceptBlock title="Introduction to NBS Specifications">
            <p>
              The National Building Specification (NBS) provides a standardised framework for
              writing construction specifications in the UK. For building services engineers, NBS
              ensures that design requirements are communicated clearly and consistently to
              contractors.
            </p>
            <p>
              <strong>Purpose of specifications:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Define quality and performance requirements for materials and equipment</li>
              <li>Establish workmanship standards and installation methods</li>
              <li>Reference applicable standards and regulations (BS 7671, etc.)</li>
              <li>Provide a basis for tendering and contract administration</li>
            </ul>
            <p>
              <strong>NBS electrical work sections (section / title / coverage):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Y70:</strong> HV supply — high voltage distribution
              </li>
              <li>
                <strong>Y71:</strong> LV supply and distribution — main switchgear, distribution
                boards
              </li>
              <li>
                <strong>Y72:</strong> Power — small power, socket outlets
              </li>
              <li>
                <strong>Y73:</strong> Lighting — luminaires, controls, emergency
              </li>
              <li>
                <strong>Y74:</strong> Earthing and bonding — main earth, protective conductors
              </li>
            </ul>
            <p>
              <strong>Key point:</strong> NBS specifications complement drawings — they define
              quality and performance while drawings show location and quantity.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Clause Structure and Organisation">
            <p>
              NBS specifications are organised into work sections, each containing clauses that
              address specific requirements. Understanding this structure is essential for both
              writing and interpreting specifications.
            </p>
            <p>
              <strong>Clause types within work sections:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Preliminaries/General:</strong> Scope, standards, general requirements
              </li>
              <li>
                <strong>Products:</strong> Material and equipment specifications
              </li>
              <li>
                <strong>Execution/Workmanship:</strong> Installation methods and standards
              </li>
              <li>
                <strong>Testing/Commissioning:</strong> Verification requirements
              </li>
            </ul>
            <p>
              <strong>Clause numbering:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>100 series:</strong> Preliminaries/General
              </li>
              <li>
                <strong>200 series:</strong> Products
              </li>
              <li>
                <strong>300 series:</strong> Execution
              </li>
              <li>
                <strong>400 series:</strong> Testing
              </li>
              <li>
                <strong>500 series:</strong> Completion
              </li>
            </ul>
            <p>
              <strong>Example clause reference:</strong> Y71/210 — Distribution boards (Y71 = LV
              supply section, 210 = product clause).
            </p>
            <p>
              <strong>Best practice:</strong> Use standard NBS clause numbers where possible to aid
              familiarity and reduce errors.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Performance vs Prescriptive Specifications">
            <p>
              Specifications can be written in two fundamental styles: performance-based (defining
              outcomes) or prescriptive (defining exact products and methods). Most projects use a
              combination of both approaches.
            </p>
            <p>
              <strong>Performance specification example — luminaire (office general):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Delivered luminous flux: minimum 3500 lumens</li>
              <li>Efficacy: minimum 120 lm/W</li>
              <li>Colour temperature: 4000K ±200K</li>
              <li>CRI: minimum 80</li>
              <li>L80B10 lifetime: minimum 50,000 hours</li>
              <li>DALI dimmable compatible</li>
            </ul>
            <p>
              <strong>Prescriptive specification example — luminaire (office general):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Manufacturer: Thorn Lighting</li>
              <li>Model: Omega Pro LED 600×600</li>
              <li>Part number: 96631057</li>
              <li>Or equal and approved</li>
            </ul>
            <p>
              <strong>Comparison (aspect / performance / prescriptive):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Flexibility:</strong> High (contractor can propose alternatives) vs low
                (specific product required)
              </li>
              <li>
                <strong>Design risk:</strong> Shared with contractor vs retained by designer
              </li>
              <li>
                <strong>Use case:</strong> Design and build, value engineering vs standardisation,
                matching existing
              </li>
            </ul>
            <p>
              <strong>Practical tip:</strong> Use performance specifications for general equipment,
              prescriptive for critical items or where standardisation is required.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="NBS Create and Managing Amendments">
            <p>
              NBS Create is the current cloud-based platform for developing specifications. It
              provides standard clause content that can be customised for specific projects, with
              clear tracking of amendments.
            </p>
            <p>
              <strong>NBS Create features:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Cloud-based collaboration and version control</li>
              <li>Integrated manufacturer product data</li>
              <li>BIM object linking capabilities</li>
              <li>Export to multiple formats (PDF, Word, IFC)</li>
              <li>Automatic cross-referencing and validation</li>
            </ul>
            <p>
              <strong>Amendment best practice:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Identify clearly:</strong> Use italics, colour, or markers for
                project-specific text
              </li>
              <li>
                <strong>Track changes:</strong> Maintain amendment register for major revisions
              </li>
              <li>
                <strong>Cross-reference:</strong> Ensure amendments don't conflict with other
                clauses
              </li>
              <li>
                <strong>Review cycle:</strong> Coordinate amendments with drawing revisions
              </li>
            </ul>
            <p>
              <strong>Coordination requirements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Match equipment references in schedules</li>
              <li>Align cable specifications with cable schedules</li>
              <li>Coordinate with mechanical specifications</li>
              <li>Reference correct drawing numbers</li>
            </ul>
            <p>
              <strong>Common coordination errors:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Spec says IP65, drawing shows IP44</li>
              <li>Different cable sizes in spec and schedule</li>
              <li>Conflicting luminaire types</li>
              <li>Outdated drawing references</li>
            </ul>
            <p>
              <strong>Critical:</strong> Always conduct a coordination check between specifications,
              drawings and schedules before issue.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Writing clear clauses:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Use definitive language: 'shall' for requirements, 'should' for recommendations
              </li>
              <li>Be specific: avoid vague terms like 'adequate' or 'suitable'</li>
              <li>Reference standards precisely: include clause numbers where relevant</li>
              <li>Define technical terms that may be ambiguous</li>
            </ul>
            <p>
              <strong>Standard references:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>BS 7671:</strong> Requirements for Electrical Installations
              </li>
              <li>
                <strong>BS EN 61439:</strong> Low-voltage switchgear assemblies
              </li>
              <li>
                <strong>BS 5266:</strong> Emergency lighting
              </li>
              <li>
                <strong>BS EN 12464-1:</strong> Lighting of work places
              </li>
            </ul>
            <p>
              <strong>NBS work sections quick reference:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Y70 — HV supply/distribution</li>
              <li>Y71 — LV supply/distribution</li>
              <li>Y72 — Power installations</li>
              <li>Y73 — Lighting installations</li>
              <li>Y74 — Earthing and bonding</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Contradictory requirements</strong> — conflicting clauses within the same
                  section
                </li>
                <li>
                  <strong>Over-specification</strong> — unnecessary detail that restricts options
                  and increases cost
                </li>
                <li>
                  <strong>Under-specification</strong> — vague requirements open to interpretation
                </li>
                <li>
                  <strong>Outdated standards</strong> — referencing superseded British Standards
                </li>
              </ul>
            }
            doInstead="Run a clause-by-clause coordination review for contradictions, set requirements at the level the project actually needs (no more, no less), use definitive 'shall' / 'should' language, and check every BS / BS EN reference is current before issue."
          />

          <SectionRule />

          <Scenario
            title="Authoring the lighting and small power spec for a school refurb"
            situation={
              <>
                You’re leading the M&amp;E spec for a primary school remodelling. Architect issues
                Stage 4 drawings. The QS wants the NBS specification by Friday so they can issue
                tender. Project carries Education Funding Agency standards on lighting, small
                power and emergency lighting. Six weeks to occupation after construction
                handover.
              </>
            }
            whatToDo={
              <>
                Open NBS Chorus, set the project profile, pull in Y70 (general HV/LV),
                Y71 (LV switchgear and controlgear assemblies), Y73 (luminaires and lamps), Y74
                (emergency lighting). For each work section: 100s — general scope, applicable
                standards (BS 7671:2018+A4:2026, EFA standards, BS 5266); 200s — products
                (performance: classroom Em 300 lx maintained, UGR ≤ 19, Ra ≥ 80; or
                prescriptive: named LED panel) ; 300s — execution (cable routing, segregation,
                terminations to Reg 559.5.1); 400s — system performance (LENI, lighting controls
                narrative, emergency lighting test regime per BS 5266-1); 500s — completion
                (commissioning, EIC, O&amp;M structure). Cross-reference Reg 510.3 in the
                preliminaries so the contractor can’t gold-plate or value-engineer outside the
                BS 7671 envelope. Add an amendment register with date, author, and reason for
                every deviation from standard NBS clauses.
              </>
            }
            whyItMatters={
              <>
                A loose spec gets exploited at tender (cheapest LED that just hits 300 lx average,
                no controls strategy, no commissioning record). A precise spec drives a fair
                comparable tender and a maintainable building. Specification is engineering, not
                paperwork.
              </>
            }
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'NBS Y70-Y74 cover building services electrical work sections — pick the right one and stay in it.',
              'Clause structure: 100s general, 200s products, 300s execution, 400s performance, 500s completion.',
              'Performance vs prescriptive: blend them — performance for the design intent, prescriptive where a product family is mandated.',
              '"Shall" = mandatory, "should" = recommended, "may" = permitted. Use intentionally.',
              'Cross-reference BS 7671 Reg 510.3 in preliminaries — every named product still has to be selected and erected to BS 7671.',
              'Maintain an amendment register with date, author and reason for every deviation from standard NBS clauses.',
              'Coordinate spec with drawings and schedules — a 30-minute clash review at issue avoids 30 hours of RFIs.',
              'Verify every BS / BS EN reference is current before issue — superseded standards confuse contractors and weaken the spec.',
            ]}
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section6')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back to section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Specification and documentation
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section6-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Electrical drawings
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule4Section6_1;
