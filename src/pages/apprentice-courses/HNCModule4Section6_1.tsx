import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "NBS Specifications - HNC Module 4 Section 6.1";
const DESCRIPTION = "Master NBS specifications for building services: clause structure, NBS Create platform, performance vs prescriptive approaches, standard clauses and amendments coordination.";

const quickCheckQuestions = [
  {
    id: "nbs-purpose",
    question: "What is the primary purpose of NBS specifications?",
    options: ["To replace drawings entirely", "To communicate design requirements unambiguously", "To reduce project costs", "To simplify contractor selection"],
    correctIndex: 1,
    explanation: "NBS specifications provide a structured, unambiguous method for communicating design requirements to contractors, complementing drawings and schedules."
  },
  {
    id: "performance-spec",
    question: "What does a performance specification define?",
    options: ["Exact product models to use", "Required outcomes and standards", "Installation methods only", "Maintenance procedures"],
    correctIndex: 1,
    explanation: "Performance specifications define the required outcomes, standards and performance criteria, allowing contractors flexibility in how they achieve these requirements."
  },
  {
    id: "clause-structure",
    question: "In NBS, what is a 'clause'?",
    options: ["A legal contract term", "An individual specification item within a work section", "A drawing reference", "A cost estimate"],
    correctIndex: 1,
    explanation: "A clause is an individual specification item within a work section. Each clause addresses a specific requirement, product, or workmanship standard."
  },
  {
    id: "coordination",
    question: "How should NBS specifications relate to drawings?",
    options: ["They should be independent", "Specifications replace drawings", "They must be coordinated to avoid conflicts", "Drawings always take precedence"],
    correctIndex: 2,
    explanation: "Specifications and drawings must be carefully coordinated to avoid conflicts. They should complement each other - drawings show location and quantity, specifications show quality and performance."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What does NBS stand for in the context of building specifications?",
    options: [
      "National Building Standard",
      "National Building Specification",
      "New Building System",
      "National British Standard"
    ],
    correctAnswer: 1,
    explanation: "NBS stands for National Building Specification, the UK's leading specification system for construction projects."
  },
  {
    id: 2,
    question: "Which NBS work section covers general electrical installation requirements?",
    options: ["Section Y - Building services general", "Section Z - Building fabric reference", "Section V - Electrical supply", "Section W - Communications"],
    correctAnswer: 0,
    explanation: "Section Y covers building services general requirements including electrical installations, with Y70-Y74 covering specific electrical sections."
  },
  {
    id: 3,
    question: "What is the key advantage of a performance specification over a prescriptive specification?",
    options: [
      "It is always cheaper",
      "It allows contractor innovation while meeting required standards",
      "It eliminates the need for drawings",
      "It reduces design responsibility"
    ],
    correctAnswer: 1,
    explanation: "Performance specifications allow contractors flexibility to propose solutions that meet the required standards, potentially offering innovation and value engineering opportunities."
  },
  {
    id: 4,
    question: "When should 'Preliminaries' clauses be included in an NBS specification?",
    options: [
      "Only for large projects",
      "At the start of each work section to set general requirements",
      "At the end of the document",
      "They are optional and rarely used"
    ],
    correctAnswer: 1,
    explanation: "Preliminaries clauses appear at the start of work sections to establish general requirements, standards, and workmanship that apply throughout that section."
  },
  {
    id: 5,
    question: "What is NBS Create?",
    options: [
      "A CAD drawing package",
      "A cloud-based specification writing platform",
      "A project management tool",
      "A cost estimation software"
    ],
    correctAnswer: 1,
    explanation: "NBS Create is a cloud-based platform for writing, editing and managing specifications, with integrated content and collaboration features."
  },
  {
    id: 6,
    question: "How should amendments to standard NBS clauses be handled?",
    options: [
      "Delete the original clause entirely",
      "Clearly identify amendments using project-specific text",
      "Never modify standard clauses",
      "Use handwritten notes on drawings"
    ],
    correctAnswer: 1,
    explanation: "Amendments should be clearly identified, typically shown in a different format (italics or colour), so users can distinguish project-specific requirements from standard text."
  },
  {
    id: 7,
    question: "What information should a prescriptive specification include for equipment?",
    options: [
      "Only the manufacturer's name",
      "Manufacturer, model, specific technical data and approval requirements",
      "Just a general description",
      "Cost information only"
    ],
    correctAnswer: 1,
    explanation: "Prescriptive specifications should include manufacturer, model number, specific technical characteristics, and any approval or certification requirements."
  },
  {
    id: 8,
    question: "Why is specification coordination with drawings critical?",
    options: [
      "It makes documents look professional",
      "It is a legal requirement",
      "Conflicting information causes disputes, delays and cost overruns",
      "It reduces the number of pages"
    ],
    correctAnswer: 2,
    explanation: "Conflicting information between specifications and drawings is a major cause of disputes, delays and cost overruns. Careful coordination prevents these issues."
  },
  {
    id: 9,
    question: "What does 'equal and approved' mean in a specification?",
    options: [
      "Any product can be used",
      "Only the specified product is acceptable",
      "An equivalent product may be proposed subject to engineer approval",
      "The cheapest option must be selected"
    ],
    correctAnswer: 2,
    explanation: "'Equal and approved' allows contractors to propose equivalent products that meet the specification requirements, subject to the engineer's approval."
  },
  {
    id: 10,
    question: "Which document typically takes precedence when there is a conflict between specification and drawings?",
    options: [
      "Always the drawings",
      "Always the specification",
      "As defined in the contract preliminaries (often specification takes precedence for quality)",
      "The contractor decides"
    ],
    correctAnswer: 2,
    explanation: "Precedence is typically defined in the contract preliminaries. Often specifications take precedence for quality and performance matters, while drawings govern location and quantity."
  }
];

const faqs = [
  {
    question: "What is the difference between NBS Building and NBS Create?",
    answer: "NBS Building was the previous specification system using a traditional clause-based structure. NBS Create is the current cloud-based platform offering improved collaboration, BIM integration, and manufacturer product data. NBS Building content has been migrated to NBS Create."
  },
  {
    question: "How do I choose between performance and prescriptive specifications?",
    answer: "Use performance specifications when you want to allow contractor innovation, when multiple products could meet requirements, or for design and build projects. Use prescriptive specifications when specific products are required for standardisation, when matching existing installations, or when the client has particular preferences."
  },
  {
    question: "Should specifications include pricing information?",
    answer: "No, specifications should focus on technical requirements, not costs. Pricing is addressed separately in bills of quantities or pricing documents. Including prices in specifications can cause confusion and conflicts with commercial documents."
  },
  {
    question: "How detailed should specifications be for a design and build project?",
    answer: "For design and build, specifications are typically performance-based and less detailed than traditional contracts. They define outcomes, standards and key constraints while allowing the contractor design flexibility. However, critical requirements should still be clearly specified."
  }
];

const HNCModule4Section6_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module4-section6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 4.6.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            NBS Specifications
          </h1>
          <p className="text-white/80">
            Mastering structured specification writing for building services electrical installations
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>NBS:</strong> UK standard specification system for construction</li>
              <li className="pl-1"><strong>Work sections:</strong> Y70-Y74 cover electrical installations</li>
              <li className="pl-1"><strong>Clause types:</strong> Preliminaries, products, workmanship</li>
              <li className="pl-1"><strong>NBS Create:</strong> Cloud platform for specification writing</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Coordination:</strong> Specs must align with drawings and schedules</li>
              <li className="pl-1"><strong>Performance:</strong> Define outcomes, not just products</li>
              <li className="pl-1"><strong>Standards:</strong> Reference BS 7671 and relevant codes</li>
              <li className="pl-1"><strong>Amendments:</strong> Project-specific modifications clearly marked</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand NBS structure and work section organisation",
              "Differentiate between performance and prescriptive specifications",
              "Use NBS Create platform for specification development",
              "Write clear, unambiguous specification clauses",
              "Coordinate specifications with drawings and schedules",
              "Apply appropriate amendments to standard clauses"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 1: Introduction to NBS */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Introduction to NBS Specifications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The National Building Specification (NBS) provides a standardised framework for writing
              construction specifications in the UK. For building services engineers, NBS ensures
              that design requirements are communicated clearly and consistently to contractors.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Purpose of specifications:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Define quality and performance requirements for materials and equipment</li>
                <li className="pl-1">Establish workmanship standards and installation methods</li>
                <li className="pl-1">Reference applicable standards and regulations (BS 7671, etc.)</li>
                <li className="pl-1">Provide a basis for tendering and contract administration</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">NBS Electrical Work Sections</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Section</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Title</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Coverage</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Y70</td>
                      <td className="border border-white/10 px-3 py-2">HV supply</td>
                      <td className="border border-white/10 px-3 py-2">High voltage distribution</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Y71</td>
                      <td className="border border-white/10 px-3 py-2">LV supply and distribution</td>
                      <td className="border border-white/10 px-3 py-2">Main switchgear, distribution boards</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Y72</td>
                      <td className="border border-white/10 px-3 py-2">Power</td>
                      <td className="border border-white/10 px-3 py-2">Small power, socket outlets</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Y73</td>
                      <td className="border border-white/10 px-3 py-2">Lighting</td>
                      <td className="border border-white/10 px-3 py-2">Luminaires, controls, emergency</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Y74</td>
                      <td className="border border-white/10 px-3 py-2">Earthing and bonding</td>
                      <td className="border border-white/10 px-3 py-2">Main earth, protective conductors</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> NBS specifications complement drawings - they define quality and performance while drawings show location and quantity.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Clause Structure */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Clause Structure and Organisation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              NBS specifications are organised into work sections, each containing clauses that
              address specific requirements. Understanding this structure is essential for both
              writing and interpreting specifications.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Clause types within work sections:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Preliminaries/General:</strong> Scope, standards, general requirements</li>
                <li className="pl-1"><strong>Products:</strong> Material and equipment specifications</li>
                <li className="pl-1"><strong>Execution/Workmanship:</strong> Installation methods and standards</li>
                <li className="pl-1"><strong>Testing/Commissioning:</strong> Verification requirements</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Clause Numbering</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">100 series: Preliminaries/General</li>
                  <li className="pl-1">200 series: Products</li>
                  <li className="pl-1">300 series: Execution</li>
                  <li className="pl-1">400 series: Testing</li>
                  <li className="pl-1">500 series: Completion</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Example Clause Reference</p>
                <div className="bg-white/5 p-3 rounded text-sm font-mono">
                  <p>Y71/210 - Distribution boards</p>
                  <p className="text-white/60 mt-1">Section/Clause number</p>
                  <p className="mt-2">Y71 = LV supply section</p>
                  <p>210 = Product clause</p>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Use standard NBS clause numbers where possible to aid familiarity and reduce errors.
            </p>
          </div>
        </section>

        {/* Section 3: Performance vs Prescriptive */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Performance vs Prescriptive Specifications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Specifications can be written in two fundamental styles: performance-based (defining
              outcomes) or prescriptive (defining exact products and methods). Most projects use
              a combination of both approaches.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Performance Specification Example</p>
              <div className="bg-white/5 p-4 rounded text-sm">
                <p className="font-medium text-white mb-2">Luminaire - Office General:</p>
                <ul className="text-white space-y-1 list-disc list-outside ml-5">
                  <li>Delivered luminous flux: minimum 3500 lumens</li>
                  <li>Efficacy: minimum 120 lm/W</li>
                  <li>Colour temperature: 4000K ±200K</li>
                  <li>CRI: minimum 80</li>
                  <li>L80B10 lifetime: minimum 50,000 hours</li>
                  <li>DALI dimmable compatible</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Prescriptive Specification Example</p>
              <div className="bg-white/5 p-4 rounded text-sm">
                <p className="font-medium text-white mb-2">Luminaire - Office General:</p>
                <ul className="text-white space-y-1 list-disc list-outside ml-5">
                  <li>Manufacturer: Thorn Lighting</li>
                  <li>Model: Omega Pro LED 600×600</li>
                  <li>Part number: 96631057</li>
                  <li>Or equal and approved</li>
                </ul>
              </div>
            </div>

            <div className="overflow-x-auto my-6">
              <table className="text-sm text-white w-full border-collapse">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">Aspect</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Performance</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Prescriptive</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Flexibility</td>
                    <td className="border border-white/10 px-3 py-2">High - contractor can propose alternatives</td>
                    <td className="border border-white/10 px-3 py-2">Low - specific product required</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Design risk</td>
                    <td className="border border-white/10 px-3 py-2">Shared with contractor</td>
                    <td className="border border-white/10 px-3 py-2">Retained by designer</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Use case</td>
                    <td className="border border-white/10 px-3 py-2">Design and build, value engineering</td>
                    <td className="border border-white/10 px-3 py-2">Standardisation, matching existing</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical tip:</strong> Use performance specifications for general equipment, prescriptive for critical items or where standardisation is required.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: NBS Create and Amendments */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            NBS Create and Managing Amendments
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              NBS Create is the current cloud-based platform for developing specifications. It provides
              standard clause content that can be customised for specific projects, with clear
              tracking of amendments.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">NBS Create features:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Cloud-based collaboration and version control</li>
                <li className="pl-1">Integrated manufacturer product data</li>
                <li className="pl-1">BIM object linking capabilities</li>
                <li className="pl-1">Export to multiple formats (PDF, Word, IFC)</li>
                <li className="pl-1">Automatic cross-referencing and validation</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Managing Amendments</p>
              <div className="bg-white/5 p-4 rounded text-sm">
                <p className="font-medium text-white mb-2">Amendment best practice:</p>
                <ul className="text-white space-y-1 list-disc list-outside ml-5">
                  <li><strong>Identify clearly:</strong> Use italics, colour, or markers for project-specific text</li>
                  <li><strong>Track changes:</strong> Maintain amendment register for major revisions</li>
                  <li><strong>Cross-reference:</strong> Ensure amendments don't conflict with other clauses</li>
                  <li><strong>Review cycle:</strong> Coordinate amendments with drawing revisions</li>
                </ul>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Coordination Requirements</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Match equipment references in schedules</li>
                  <li className="pl-1">Align cable specifications with cable schedules</li>
                  <li className="pl-1">Coordinate with mechanical specifications</li>
                  <li className="pl-1">Reference correct drawing numbers</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Coordination Errors</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Spec says IP65, drawing shows IP44</li>
                  <li className="pl-1">Different cable sizes in spec and schedule</li>
                  <li className="pl-1">Conflicting luminaire types</li>
                  <li className="pl-1">Outdated drawing references</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Critical:</strong> Always conduct a coordination check between specifications, drawings and schedules before issue.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Writing Clear Clauses</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Use definitive language: 'shall' for requirements, 'should' for recommendations</li>
                <li className="pl-1">Be specific: avoid vague terms like 'adequate' or 'suitable'</li>
                <li className="pl-1">Reference standards precisely: include clause numbers where relevant</li>
                <li className="pl-1">Define technical terms that may be ambiguous</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Standard References</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>BS 7671:</strong> Requirements for Electrical Installations</li>
                <li className="pl-1"><strong>BS EN 61439:</strong> Low-voltage switchgear assemblies</li>
                <li className="pl-1"><strong>BS 5266:</strong> Emergency lighting</li>
                <li className="pl-1"><strong>BS EN 12464-1:</strong> Lighting of work places</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Contradictory requirements</strong> - conflicting clauses within the same section</li>
                <li className="pl-1"><strong>Over-specification</strong> - unnecessary detail that restricts options and increases cost</li>
                <li className="pl-1"><strong>Under-specification</strong> - vague requirements open to interpretation</li>
                <li className="pl-1"><strong>Outdated standards</strong> - referencing superseded British Standards</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/90 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">NBS Work Sections</p>
                <ul className="space-y-0.5">
                  <li>Y70 - HV supply/distribution</li>
                  <li>Y71 - LV supply/distribution</li>
                  <li>Y72 - Power installations</li>
                  <li>Y73 - Lighting installations</li>
                  <li>Y74 - Earthing and bonding</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Specification Types</p>
                <ul className="space-y-0.5">
                  <li>Performance - defines outcomes</li>
                  <li>Prescriptive - defines products</li>
                  <li>Hybrid - combination approach</li>
                  <li>Equal and approved - allows alternatives</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module4-section6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module4-section6-2">
              Next: Electrical Drawings
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule4Section6_1;
