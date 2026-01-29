import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "CDM Design Risk Register - HNC Module 4 Section 6.5";
const DESCRIPTION = "Master CDM 2015 designer duties for building services: design risk registers, significant residual risks, risk communication and design risk assessments.";

const quickCheckQuestions = [
  {
    id: "cdm-designer",
    question: "Under CDM 2015, who is considered a 'designer'?",
    options: ["Only architects", "Anyone who prepares or modifies designs affecting H&S", "Only principal designers", "Only structural engineers"],
    correctIndex: 1,
    explanation: "Under CDM 2015, a designer is anyone who prepares or modifies designs for a building project, or who arranges for others to do so, where the design may affect health and safety."
  },
  {
    id: "eliminate-reduce",
    question: "What is the hierarchy of risk control for designers?",
    options: ["Inform, protect, train", "Eliminate, reduce, inform", "Accept, mitigate, transfer", "Control, monitor, review"],
    correctIndex: 1,
    explanation: "The hierarchy is: first eliminate hazards through design, then reduce risks that cannot be eliminated, then inform about significant residual risks that remain."
  },
  {
    id: "residual-risk",
    question: "What is a 'significant residual risk'?",
    options: ["Any minor hazard", "A risk that cannot be eliminated and is not obvious to competent contractors", "Only electrical risks", "Risks covered by regulations"],
    correctIndex: 1,
    explanation: "Significant residual risks are those that cannot be eliminated through design, are not obvious to a competent contractor, and could cause serious harm if not managed."
  },
  {
    id: "communication",
    question: "How should design risks be communicated to contractors?",
    options: ["Verbally only", "Through the design risk register and H&S file information", "Not required", "Only in tender documents"],
    correctIndex: 1,
    explanation: "Design risks must be communicated through the design risk register, drawings annotations, and information for the H&S file, ensuring contractors can manage residual risks."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "When did CDM 2015 come into force?",
    options: ["April 2007", "April 2015", "January 2018", "October 2020"],
    correctAnswer: 1,
    explanation: "The Construction (Design and Management) Regulations 2015 came into force on 6 April 2015, replacing CDM 2007."
  },
  {
    id: 2,
    question: "What are the main duty holder categories under CDM 2015?",
    options: [
      "Client, Designer, Contractor only",
      "Client, Principal Designer, Designer, Principal Contractor, Contractor",
      "Architect, Engineer, Builder",
      "Owner, Manager, Worker"
    ],
    correctAnswer: 1,
    explanation: "CDM 2015 defines five duty holder categories: Client, Principal Designer, Designer, Principal Contractor, and Contractor, each with specific duties."
  },
  {
    id: 3,
    question: "What must designers consider when preparing designs?",
    options: [
      "Only aesthetic requirements",
      "Hazards during construction, maintenance, use and demolition",
      "Just the construction phase",
      "Only cost factors"
    ],
    correctAnswer: 1,
    explanation: "Designers must consider hazards throughout the lifecycle: construction, maintenance, use, and eventual demolition or dismantling of the building."
  },
  {
    id: 4,
    question: "Which of the following is an electrical design decision to eliminate risk?",
    options: [
      "Providing PPE for live working",
      "Designing all maintenance to be done dead by using accessible isolation",
      "Adding warning labels",
      "Providing training courses"
    ],
    correctAnswer: 1,
    explanation: "Designing for all maintenance to be done with circuits dead (through accessible isolation and safe systems of work) eliminates the risk of live working."
  },
  {
    id: 5,
    question: "What should a design risk register include?",
    options: [
      "Only electrical hazards",
      "Hazard, design decisions, residual risks, information for others",
      "Just a list of standards",
      "Only risks during construction"
    ],
    correctAnswer: 1,
    explanation: "A design risk register should include: identified hazards, design decisions made to address them, residual risks that remain, and information needed by others."
  },
  {
    id: 6,
    question: "When should design risk assessment begin?",
    options: [
      "After construction starts",
      "From the earliest design stages",
      "Only at detailed design",
      "Just before tender"
    ],
    correctAnswer: 1,
    explanation: "Design risk assessment should begin at the earliest design stages when there is most opportunity to influence the design and eliminate hazards."
  },
  {
    id: 7,
    question: "What electrical information might be needed for the H&S file?",
    options: [
      "Only the specification",
      "As-built drawings, isolation procedures, residual risks, maintenance requirements",
      "Just the O&M manual",
      "Only product data sheets"
    ],
    correctAnswer: 1,
    explanation: "H&S file information includes: as-built drawings, safe isolation procedures, residual risks requiring management, maintenance access requirements, and any unusual hazards."
  },
  {
    id: 8,
    question: "How should designers address confined space access for electrical equipment?",
    options: [
      "Just provide PPE",
      "Design out confined space entry where possible, or ensure safe access provisions",
      "It is the contractor's problem",
      "Add warning signs only"
    ],
    correctAnswer: 1,
    explanation: "Designers should first try to eliminate confined space entry through equipment positioning. Where unavoidable, ensure adequate access, ventilation and rescue provisions."
  },
  {
    id: 9,
    question: "What is the purpose of drawing annotations for CDM?",
    options: [
      "To make drawings look complete",
      "To highlight residual risks and required precautions on drawings",
      "Only for aesthetic purposes",
      "To replace the risk register"
    ],
    correctAnswer: 1,
    explanation: "CDM annotations on drawings highlight residual risks (e.g., 'High voltage - permit to work required') and required precautions directly where the hazard exists."
  },
  {
    id: 10,
    question: "Which of these would NOT typically be a significant residual risk to communicate?",
    options: [
      "Hidden high voltage cables in a service void",
      "A socket outlet at standard height",
      "Presence of an uninterruptible power supply (UPS)",
      "Heavy equipment requiring mechanical handling"
    ],
    correctAnswer: 1,
    explanation: "A standard socket outlet is obvious and expected - not a significant residual risk. Hidden HV cables, UPS (batteries may remain live), and heavy equipment require communication."
  }
];

const faqs = [
  {
    question: "What is the difference between a hazard and a risk?",
    answer: "A hazard is something with the potential to cause harm (e.g., electricity, working at height). A risk is the likelihood of that harm occurring combined with its severity. Designers address hazards through design to reduce the resulting risk."
  },
  {
    question: "Do I need to record every design decision?",
    answer: "No - focus on significant risks. Record design decisions that address notable hazards, particularly where you've made choices to eliminate or reduce risk. Routine compliance with standards does not need individual recording."
  },
  {
    question: "How detailed should the risk register be?",
    answer: "Proportionate to the risk. High-risk items need more detail. The register should communicate clearly what the hazard is, what design decisions were made, and what residual risks remain for others to manage."
  },
  {
    question: "What if a client asks me to design something I consider unsafe?",
    answer: "Designers must not prepare designs that could endanger health and safety. If a client request conflicts with this duty, explain the risks and propose alternatives. If the client insists on an unsafe design, you should decline the instruction."
  },
  {
    question: "How does the Principal Designer coordinate design risks?",
    answer: "The Principal Designer coordinates health and safety during the pre-construction phase, ensuring designers fulfil their duties and that design risks are identified and communicated. They compile information for the H&S file."
  }
];

const HNCModule4Section6_5 = () => {
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
            <span>Module 4.6.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            CDM Design Risk Register
          </h1>
          <p className="text-white/80">
            Understanding designer duties under CDM 2015 and communicating significant residual risks
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>CDM 2015:</strong> Construction (Design and Management) Regulations</li>
              <li className="pl-1"><strong>Designer duty:</strong> Eliminate, reduce, inform about risks</li>
              <li className="pl-1"><strong>Risk register:</strong> Record hazards, decisions, residual risks</li>
              <li className="pl-1"><strong>H&S file:</strong> Information for future maintenance/work</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Electrical hazards:</strong> Shock, arc flash, fire</li>
              <li className="pl-1"><strong>Access:</strong> Heights, confined spaces, plant rooms</li>
              <li className="pl-1"><strong>Lifecycle:</strong> Construction, operation, maintenance</li>
              <li className="pl-1"><strong>Hidden services:</strong> Cables, equipment locations</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand designer duties under CDM 2015",
              "Apply the hierarchy of risk control in design",
              "Identify significant residual risks in electrical design",
              "Create and maintain design risk registers",
              "Communicate risks through drawings and documentation",
              "Provide appropriate information for the H&S file"
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

        {/* Section 1: Designer Duties */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Designer Duties Under CDM 2015
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Construction (Design and Management) Regulations 2015 place specific duties on
              designers to consider health and safety throughout the project lifecycle. Building
              services engineers are designers under these regulations.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key designer duties (Regulation 9):</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Not commence work unless client is aware of their duties</li>
                <li className="pl-1">Take account of general principles of prevention</li>
                <li className="pl-1">Eliminate foreseeable risks so far as reasonably practicable</li>
                <li className="pl-1">Reduce risks that cannot be eliminated</li>
                <li className="pl-1">Provide information about remaining significant risks</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">General Principles of Prevention</p>
              <div className="bg-white/5 p-4 rounded text-sm">
                <ol className="text-white space-y-1 list-decimal list-outside ml-5">
                  <li>Avoid risks</li>
                  <li>Evaluate risks that cannot be avoided</li>
                  <li>Combat risks at source</li>
                  <li>Adapt work to the individual</li>
                  <li>Adapt to technical progress</li>
                  <li>Replace dangerous with non/less dangerous</li>
                  <li>Develop coherent prevention policy</li>
                  <li>Give priority to collective over individual protection</li>
                  <li>Give appropriate instructions</li>
                </ol>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Designer Hierarchy of Control</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Level</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Action</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Electrical Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1. Eliminate</td>
                      <td className="border border-white/10 px-3 py-2">Remove the hazard</td>
                      <td className="border border-white/10 px-3 py-2">Use SELV instead of mains in wet areas</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2. Reduce</td>
                      <td className="border border-white/10 px-3 py-2">Minimise the risk</td>
                      <td className="border border-white/10 px-3 py-2">Locate equipment at low level not height</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3. Inform</td>
                      <td className="border border-white/10 px-3 py-2">Communicate residual risk</td>
                      <td className="border border-white/10 px-3 py-2">Note hidden cables on drawings/register</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Designers must consider risks during construction, maintenance, use, cleaning, repair, and demolition.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Electrical Design Risks */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Electrical Design Risk Considerations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electrical designers must consider specific hazards associated with electrical
              installations and how design decisions can eliminate or reduce these risks
              throughout the building lifecycle.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key electrical hazards to consider:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Electric shock:</strong> Contact with live parts during construction/maintenance</li>
                <li className="pl-1"><strong>Arc flash:</strong> High energy release from switchgear</li>
                <li className="pl-1"><strong>Fire:</strong> From electrical faults or overloading</li>
                <li className="pl-1"><strong>Working at height:</strong> Access to ceiling-mounted equipment</li>
                <li className="pl-1"><strong>Confined spaces:</strong> Electrical equipment in risers/plant rooms</li>
                <li className="pl-1"><strong>Manual handling:</strong> Heavy equipment installation</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Design Decisions to Eliminate/Reduce Risk</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-2 py-2 text-left">Hazard</th>
                      <th className="border border-white/10 px-2 py-2 text-left">Design Decision</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-2 py-2">Live working</td>
                      <td className="border border-white/10 px-2 py-2">Design for all maintenance to be done dead</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-2">Working at height</td>
                      <td className="border border-white/10 px-2 py-2">Locate equipment at accessible heights</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-2">Arc flash</td>
                      <td className="border border-white/10 px-2 py-2">Use arc-resistant switchgear</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-2">Manual handling</td>
                      <td className="border border-white/10 px-2 py-2">Split into smaller components, ensure access</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-2">Confined space</td>
                      <td className="border border-white/10 px-2 py-2">Adequate space, access from outside riser</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-2">Cable damage</td>
                      <td className="border border-white/10 px-2 py-2">Protected routes, avoid areas of future work</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Lifecycle Considerations</p>
              <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                <li><strong>Construction:</strong> First fix cable routes, temporary supplies</li>
                <li><strong>Operation:</strong> Safe access for switching and monitoring</li>
                <li><strong>Maintenance:</strong> Lamp replacement, cleaning, testing</li>
                <li><strong>Modification:</strong> Future alterations, additions</li>
                <li><strong>Demolition:</strong> Isolation, de-energisation, removal</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Consider maintainability at design stage - can a competent technician safely maintain this installation?
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Design Risk Register */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Creating the Design Risk Register
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The design risk register documents hazards identified during design, the decisions
              made to address them, and any significant residual risks that need to be communicated
              to others.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Risk register structure:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Reference:</strong> Unique identifier linked to drawings</li>
                <li className="pl-1"><strong>Location:</strong> Where the hazard exists</li>
                <li className="pl-1"><strong>Hazard:</strong> Description of the hazard</li>
                <li className="pl-1"><strong>Risk:</strong> Who might be harmed and how</li>
                <li className="pl-1"><strong>Design decision:</strong> Actions taken to eliminate/reduce</li>
                <li className="pl-1"><strong>Residual risk:</strong> What remains after design decisions</li>
                <li className="pl-1"><strong>Information required:</strong> What others need to know</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Example Risk Register Entry</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-2 py-2 text-left">Field</th>
                      <th className="border border-white/10 px-2 py-2 text-left">Content</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-2 py-2">Ref</td>
                      <td className="border border-white/10 px-2 py-2">DRR-E-001</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-2">Location</td>
                      <td className="border border-white/10 px-2 py-2">LV switchroom, Level 00</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-2">Hazard</td>
                      <td className="border border-white/10 px-2 py-2">High fault current at main switchboard (25kA)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-2">Risk</td>
                      <td className="border border-white/10 px-2 py-2">Arc flash injury during maintenance</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-2">Design decision</td>
                      <td className="border border-white/10 px-2 py-2">Arc-resistant switchgear specified</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-2">Residual risk</td>
                      <td className="border border-white/10 px-2 py-2">Arc flash risk during internal maintenance</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-2">Information</td>
                      <td className="border border-white/10 px-2 py-2">Arc flash study required, PPE to be specified</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">What to Include</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Significant hazards addressed</li>
                  <li className="pl-1">Non-obvious residual risks</li>
                  <li className="pl-1">Unusual installation requirements</li>
                  <li className="pl-1">Maintenance constraints</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">What Not to Include</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Standard compliance matters</li>
                  <li className="pl-1">Obvious hazards (mains voltage)</li>
                  <li className="pl-1">Generic method statements</li>
                  <li className="pl-1">Contractor-managed risks</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Focus:</strong> Communicate what is unusual, hidden, or requires specific management - not generic hazards.
            </p>
          </div>
        </section>

        {/* Section 4: Communication and H&S File */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Risk Communication and H&S File
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective communication of design risks ensures that contractors during construction
              and maintainers throughout the building life can manage residual risks appropriately.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Methods of communicating design risks:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Design risk register:</strong> Formal schedule of risks and decisions</li>
                <li className="pl-1"><strong>Drawing annotations:</strong> Hazard notes on relevant drawings</li>
                <li className="pl-1"><strong>Specification clauses:</strong> Safety requirements in NBS sections</li>
                <li className="pl-1"><strong>H&S file information:</strong> Data for future works</li>
                <li className="pl-1"><strong>Design meetings:</strong> Verbal briefings with contractors</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Drawing Annotation Examples</p>
              <div className="bg-white/5 p-4 rounded text-sm">
                <ul className="text-white space-y-2 list-none">
                  <li className="border-l-2 border-red-400/50 pl-3">"WARNING: 11kV cables in this service trench - DNO isolation required"</li>
                  <li className="border-l-2 border-orange-400/50 pl-3">"NOTE: UPS battery room - ventilation must be operational before entry"</li>
                  <li className="border-l-2 border-yellow-400/50 pl-3">"Permit to work required for all work on this switchboard"</li>
                  <li className="border-l-2 border-blue-400/50 pl-3">"Luminaires in this area accessible from MEWP only"</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">H&S File Information from Electrical Designer</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-2 py-2 text-left">Information Type</th>
                      <th className="border border-white/10 px-2 py-2 text-left">Examples</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-2 py-2">As-built drawings</td>
                      <td className="border border-white/10 px-2 py-2">Cable routes, hidden equipment locations</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-2">Safe isolation</td>
                      <td className="border border-white/10 px-2 py-2">Procedures for each distribution board</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-2">Residual risks</td>
                      <td className="border border-white/10 px-2 py-2">High fault levels, dual supplies, UPS</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-2">Maintenance access</td>
                      <td className="border border-white/10 px-2 py-2">Equipment requiring special access equipment</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-2">Emergency procedures</td>
                      <td className="border border-white/10 px-2 py-2">Emergency switching, fire suppression</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> H&S file information is for future use - write for someone who doesn't know the building.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Starting the Risk Assessment</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Review project brief for unusual requirements</li>
                <li className="pl-1">Walk through design considering construction sequence</li>
                <li className="pl-1">Consider who will maintain each element</li>
                <li className="pl-1">Check for interfaces with other trades</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Coordination with Principal Designer</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Share risk register during design reviews</li>
                <li className="pl-1">Coordinate with other designers on interfaces</li>
                <li className="pl-1">Provide H&S file information promptly</li>
                <li className="pl-1">Attend design coordination meetings</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Listing obvious hazards</strong> - "Electricity can kill" is not useful</li>
                <li className="pl-1"><strong>Generic risk assessments</strong> - Must be project-specific</li>
                <li className="pl-1"><strong>Late consideration</strong> - Start at concept, not detailed design</li>
                <li className="pl-1"><strong>No follow-through</strong> - Risk register not updated or communicated</li>
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
                <p className="font-medium text-white mb-1">Designer Hierarchy</p>
                <ul className="space-y-0.5">
                  <li>1. Eliminate hazards through design</li>
                  <li>2. Reduce risks that remain</li>
                  <li>3. Inform about residual risks</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Lifecycle Stages</p>
                <ul className="space-y-0.5">
                  <li>Construction</li>
                  <li>Operation and use</li>
                  <li>Maintenance and cleaning</li>
                  <li>Modification and repair</li>
                  <li>Demolition</li>
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
            <Link to="../h-n-c-module4-section6-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module4-section6-6">
              Next: BIM and Digital Delivery
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule4Section6_5;
