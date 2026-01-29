import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Integrated Design Process - HNC Module 6 Section 6.3";
const DESCRIPTION = "Master integrated design processes for sustainable building services: multi-disciplinary collaboration, early MEP engagement, design workshops, BIM coordination, RIBA stages, value engineering, soft landings, and POE preparation.";

const quickCheckQuestions = [
  {
    id: "idp-definition",
    question: "What is the primary characteristic of an integrated design process?",
    options: ["Sequential handoffs between disciplines", "Multi-disciplinary collaboration from project inception", "Design led by a single discipline", "Minimal stakeholder involvement until construction"],
    correctIndex: 1,
    explanation: "An integrated design process (IDP) brings together all relevant disciplines from the earliest project stages to collaborate on design solutions, ensuring sustainability objectives are embedded throughout rather than added retrospectively."
  },
  {
    id: "early-engagement",
    question: "Why is early MEP engagement critical for sustainable building design?",
    options: ["It reduces consultant fees", "It allows mechanical systems to be oversized", "It enables passive design strategies to be maximised before active systems are specified", "It speeds up the planning approval process"],
    correctIndex: 2,
    explanation: "Early MEP engagement allows engineers to influence building form, orientation, and fabric design to maximise passive strategies (natural ventilation, daylighting, thermal mass), reducing reliance on active mechanical and electrical systems."
  },
  {
    id: "value-engineering",
    question: "How should value engineering be applied without compromising sustainability?",
    options: ["Focus solely on capital cost reduction", "Consider whole-life cost and performance outcomes", "Remove all renewable energy systems", "Standardise all specifications to lowest cost"],
    correctIndex: 1,
    explanation: "True value engineering optimises whole-life value, considering operational costs, maintenance, replacement cycles, and sustainability outcomes alongside capital expenditure. Short-term cost cuts often increase long-term costs and carbon."
  },
  {
    id: "soft-landings",
    question: "What is the purpose of a soft landings approach?",
    options: ["To reduce construction defects", "To ensure smooth transition to operation and achieve design performance", "To accelerate project handover", "To minimise commissioning requirements"],
    correctIndex: 1,
    explanation: "Soft landings ensures buildings perform as designed in operation by maintaining design team involvement through commissioning, handover, and early occupation, addressing the performance gap between design intent and actual outcomes."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "At which RIBA stage should sustainability targets and strategies be established?",
    options: [
      "Stage 0 Strategic Definition",
      "Stage 2 Concept Design",
      "Stage 4 Technical Design",
      "Stage 5 Construction"
    ],
    correctAnswer: 0,
    explanation: "Sustainability targets should be established at Stage 0 Strategic Definition when the project brief is being developed. This ensures sustainability is embedded from inception rather than retrofitted later."
  },
  {
    id: 2,
    question: "What is the primary benefit of design charrettes for sustainable building projects?",
    options: ["They reduce design fees", "They compress multiple disciplines' input into intensive collaborative sessions", "They eliminate the need for BIM", "They replace formal design reviews"],
    correctAnswer: 1,
    explanation: "Design charrettes bring together all stakeholders for intensive, focused workshops where integrated solutions can be developed collaboratively, identifying synergies and conflicts early when changes are easiest to implement."
  },
  {
    id: 3,
    question: "In BIM Level 2 projects, what does the term 'clash detection' primarily refer to?",
    options: [
      "Identifying conflicts between team members",
      "Finding geometric conflicts between building elements and services",
      "Detecting errors in cost estimates",
      "Checking programme conflicts"
    ],
    correctAnswer: 1,
    explanation: "Clash detection uses BIM software to identify geometric conflicts between building elements (structure, services, architecture) before construction, preventing costly on-site changes and enabling more efficient coordination."
  },
  {
    id: 4,
    question: "What is the 'performance gap' in sustainable building design?",
    options: [
      "The difference between design fees and actual costs",
      "The gap between predicted and actual energy performance in operation",
      "The time delay between design and construction",
      "The difference between architect and engineer specifications"
    ],
    correctAnswer: 1,
    explanation: "The performance gap refers to the common finding that buildings use significantly more energy in operation than predicted during design. This can be 2-10 times higher, undermining sustainability targets."
  },
  {
    id: 5,
    question: "Which of these is NOT a typical activity in RIBA Stage 1 Preparation and Briefing?",
    options: [
      "Establishing sustainability aspirations",
      "Developing the project brief",
      "Completing detailed M&E specifications",
      "Undertaking site appraisals"
    ],
    correctAnswer: 2,
    explanation: "Detailed M&E specifications are developed in Stage 4 Technical Design. Stage 1 focuses on strategic planning including sustainability aspirations, brief development, feasibility, and site assessment."
  },
  {
    id: 6,
    question: "What role does Post-Occupancy Evaluation (POE) play in sustainable design?",
    options: [
      "It is only required for BREEAM Outstanding projects",
      "It provides feedback to improve future designs and identify performance issues",
      "It replaces building handover documentation",
      "It is completed before practical completion"
    ],
    correctAnswer: 1,
    explanation: "POE systematically evaluates building performance after occupation, providing valuable feedback for the design team to understand what worked, what didn't, and how to improve future projects."
  },
  {
    id: 7,
    question: "During value engineering, which approach best maintains sustainability performance?",
    options: [
      "Removing renewable energy systems to reduce capital cost",
      "Substituting specified materials with cheaper alternatives",
      "Challenging design decisions while protecting defined sustainability outcomes",
      "Reducing insulation thickness to save on materials"
    ],
    correctAnswer: 2,
    explanation: "Effective value engineering challenges assumptions and seeks alternatives while protecting agreed sustainability outcomes. Performance specifications should be maintained even if delivery methods change."
  },
  {
    id: 8,
    question: "What is the purpose of the Government Soft Landings (GSL) Gateway 2?",
    options: [
      "To confirm practical completion",
      "To review design proposals against sustainability targets",
      "To approve the construction budget",
      "To sign off commissioning results"
    ],
    correctAnswer: 1,
    explanation: "GSL Gateway 2 occurs during design development and reviews how design proposals address sustainability, functionality, and operational requirements established in the brief."
  },
  {
    id: 9,
    question: "In an integrated design team, who typically leads coordination of sustainability targets?",
    options: [
      "The contractor",
      "The quantity surveyor",
      "A dedicated sustainability consultant or the lead designer",
      "The building control officer"
    ],
    correctAnswer: 2,
    explanation: "A sustainability consultant or the lead designer typically coordinates sustainability targets across disciplines, ensuring all team members work towards common goals and that no discipline's decisions undermine overall objectives."
  },
  {
    id: 10,
    question: "What is 'design freeze' and why is it important for sustainability?",
    options: [
      "When heating systems are tested in winter",
      "A defined point when changes become significantly more costly",
      "When refrigeration systems are commissioned",
      "A pause in design work for holidays"
    ],
    correctAnswer: 1,
    explanation: "Design freeze is a defined project milestone after which changes become increasingly expensive and disruptive. For sustainability, key decisions must be locked in before freeze to avoid late compromises."
  },
  {
    id: 11,
    question: "How does the circular economy principle influence integrated design?",
    options: [
      "It requires all buildings to be circular in plan",
      "It encourages design for disassembly, material reuse, and waste minimisation",
      "It mandates the use of recycled materials only",
      "It applies only to waste management during construction"
    ],
    correctAnswer: 1,
    explanation: "Circular economy principles encourage designing buildings for future adaptation, disassembly, and material recovery, considering end-of-life from the start and minimising waste throughout the lifecycle."
  },
  {
    id: 12,
    question: "What is the key difference between a design workshop and a design review?",
    options: [
      "Workshops are longer than reviews",
      "Workshops generate solutions collaboratively; reviews assess existing proposals",
      "Reviews involve more stakeholders",
      "Workshops only occur at project start"
    ],
    correctAnswer: 1,
    explanation: "Design workshops are creative, collaborative sessions where multi-disciplinary teams develop solutions together. Design reviews are structured assessments of existing proposals against defined criteria."
  }
];

const faqs = [
  {
    question: "How do I convince clients to invest in early design collaboration?",
    answer: "Present evidence of cost savings from avoided changes, improved building performance, and reduced risk. Studies show that every £1 spent on early integrated design can save £10-20 in construction changes. Early collaboration also reduces programme risk, improves predictability, and delivers better-performing buildings that enhance reputation and asset value."
  },
  {
    question: "What if disciplines join the project at different times?",
    answer: "Capture key decisions and their rationale in the project information model so late-joining disciplines understand the context. Use onboarding workshops to bring new team members up to speed quickly. Where possible, advocate for earlier engagement in the procurement strategy, particularly for MEP consultants whose input significantly affects building form and performance."
  },
  {
    question: "How do I handle conflicts between disciplines during design workshops?",
    answer: "Focus discussions on project outcomes and performance criteria rather than individual preferences. Use objective metrics (energy, carbon, cost, programme) to evaluate options. Where trade-offs are necessary, document the decision rationale and ensure the client understands implications. A skilled facilitator can help navigate conflicts productively."
  },
  {
    question: "When does value engineering become value destruction?",
    answer: "Value engineering crosses into value destruction when it compromises defined performance outcomes, shifts costs from capital to operational budgets without acknowledging this, creates maintenance or replacement problems, or undermines sustainability targets. Always test proposals against whole-life cost and the original project objectives, not just capital cost reduction."
  },
  {
    question: "How long should soft landings continue after handover?",
    answer: "Government Soft Landings recommends a minimum of three years post-completion involvement, with intensive support in Year 1 (monthly reviews), reducing in Year 2 (quarterly), and annual review in Year 3. This duration allows seasonal performance assessment and addresses emerging issues as occupants learn to use the building."
  },
  {
    question: "What happens if POE reveals significant performance gaps?",
    answer: "POE findings should trigger systematic investigation of causes (design assumptions, installation quality, controls setup, occupant behaviour). Develop remediation plans prioritising highest-impact issues. Use findings to improve design standards, specifications, and processes for future projects. Serious gaps may require contractual discussions if they relate to non-compliance with performance specifications."
  }
];

const HNCModule6Section6_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module6-section6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 6.6.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Integrated Design Process
          </h1>
          <p className="text-white/80">
            Multi-disciplinary collaboration, early engagement, design workshops, BIM coordination, and value engineering for sustainable outcomes
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>IDP:</strong> All disciplines collaborate from project inception</li>
              <li className="pl-1"><strong>Early MEP:</strong> Influence form before fixing design</li>
              <li className="pl-1"><strong>Value engineering:</strong> Whole-life, not just capital cost</li>
              <li className="pl-1"><strong>Soft landings:</strong> Bridge design-to-operation gap</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>RIBA stages:</strong> Sustainability at Stage 0-1</li>
              <li className="pl-1"><strong>BIM Level 2:</strong> Federated model coordination</li>
              <li className="pl-1"><strong>Performance gap:</strong> 2-10x actual vs predicted</li>
              <li className="pl-1"><strong>POE:</strong> Minimum 3 years post-handover</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply integrated design principles to sustainable building projects",
              "Facilitate effective design workshops and charrettes",
              "Coordinate MEP design using BIM for clash detection and optimisation",
              "Align sustainability activities with RIBA Plan of Work stages",
              "Conduct value engineering without compromising sustainability",
              "Implement soft landings and prepare for post-occupancy evaluation"
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

        {/* Section 1: Integrated Design Process Fundamentals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Integrated Design Process Fundamentals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The integrated design process (IDP) fundamentally differs from traditional linear design
              approaches. Rather than passing design between disciplines in sequence, IDP brings
              together all stakeholders from project inception to collaborate on holistic solutions
              that embed sustainability throughout.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key principles of integrated design:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Early collaboration:</strong> All disciplines engaged from Stage 0-1, not just architect-led</li>
                <li className="pl-1"><strong>Whole-systems thinking:</strong> Consider interactions between building elements, not isolated systems</li>
                <li className="pl-1"><strong>Performance-based targets:</strong> Define outcomes (energy, carbon, comfort) not just specifications</li>
                <li className="pl-1"><strong>Iterative optimisation:</strong> Test and refine solutions through analysis and feedback loops</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Traditional vs Integrated Approach</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Aspect</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Traditional Design</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Integrated Design</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">MEP involvement</td>
                      <td className="border border-white/10 px-3 py-2">Stage 2-3 onwards</td>
                      <td className="border border-white/10 px-3 py-2">Stage 0-1 from inception</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Design approach</td>
                      <td className="border border-white/10 px-3 py-2">Sequential, discipline-by-discipline</td>
                      <td className="border border-white/10 px-3 py-2">Concurrent, multi-disciplinary</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Sustainability</td>
                      <td className="border border-white/10 px-3 py-2">Added to meet requirements</td>
                      <td className="border border-white/10 px-3 py-2">Embedded from project start</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Passive strategies</td>
                      <td className="border border-white/10 px-3 py-2">Limited by fixed architecture</td>
                      <td className="border border-white/10 px-3 py-2">Maximised through early input</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cost of changes</td>
                      <td className="border border-white/10 px-3 py-2">High - late discovery</td>
                      <td className="border border-white/10 px-3 py-2">Low - early resolution</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">The MacLeamy Curve</p>
              <p className="text-sm text-white/90">
                The MacLeamy curve demonstrates that design effort applied early has the greatest
                impact on project outcomes at the lowest cost. Moving effort forward (left on the curve)
                increases ability to influence cost and performance while reducing the cost of changes.
                Integrated design deliberately front-loads collaboration when influence is highest.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key insight:</strong> Early engagement is not just about starting sooner - it's about ensuring MEP input shapes fundamental decisions about building form, orientation, and fabric.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Design Workshops and BIM Coordination */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Design Workshops and BIM Coordination
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective integrated design requires structured opportunities for collaboration.
              Design workshops, charrettes, and BIM coordination meetings provide forums for
              multi-disciplinary problem-solving and conflict resolution.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Design Charrettes</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Intensive 1-3 day workshops</li>
                  <li className="pl-1">All key stakeholders present</li>
                  <li className="pl-1">Rapid iteration of concepts</li>
                  <li className="pl-1">Real-time problem solving</li>
                  <li className="pl-1">Consensus building on direction</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Technical Workshops</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Focused on specific systems</li>
                  <li className="pl-1">Detailed coordination issues</li>
                  <li className="pl-1">Interface resolution</li>
                  <li className="pl-1">Performance optimisation</li>
                  <li className="pl-1">Specification development</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BIM Coordination for Sustainability</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">BIM Use</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Sustainability Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Software</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Clash detection</td>
                      <td className="border border-white/10 px-3 py-2">Optimise services routing, reduce materials</td>
                      <td className="border border-white/10 px-3 py-2">Navisworks, Solibri</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Energy analysis</td>
                      <td className="border border-white/10 px-3 py-2">Test design options against energy targets</td>
                      <td className="border border-white/10 px-3 py-2">IES VE, DesignBuilder</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Daylight simulation</td>
                      <td className="border border-white/10 px-3 py-2">Optimise glazing and artificial lighting</td>
                      <td className="border border-white/10 px-3 py-2">Radiance, DIVA, Sefaira</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Quantity take-off</td>
                      <td className="border border-white/10 px-3 py-2">Calculate embodied carbon from materials</td>
                      <td className="border border-white/10 px-3 py-2">One Click LCA, eToolLCD</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4D simulation</td>
                      <td className="border border-white/10 px-3 py-2">Plan logistics to reduce site transport</td>
                      <td className="border border-white/10 px-3 py-2">Synchro, Navisworks</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <p className="text-sm font-medium text-green-400 mb-2">Workshop Best Practice</p>
              <ul className="text-sm text-white/90 space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Prepare:</strong> Circulate agenda, background information, and specific questions in advance</li>
                <li className="pl-1"><strong>Facilitate:</strong> Use an independent facilitator for complex or contentious issues</li>
                <li className="pl-1"><strong>Visualise:</strong> Use models, drawings, and simulations to support discussion</li>
                <li className="pl-1"><strong>Record:</strong> Document decisions, actions, and rationale immediately</li>
                <li className="pl-1"><strong>Follow up:</strong> Distribute minutes within 48 hours, track action completion</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Coordination tip:</strong> Schedule regular BIM coordination meetings (fortnightly minimum) throughout design development to catch clashes early and maintain design alignment.
            </p>
          </div>
        </section>

        {/* Section 3: RIBA Stages and Value Engineering */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            RIBA Stages and Value Engineering
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The RIBA Plan of Work provides a framework for design development. Aligning
              sustainability activities with RIBA stages ensures targets are set early,
              tested through design development, and verified in construction and operation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Sustainability Activities by RIBA Stage</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Stage</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Sustainability Activities</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">0 Strategic Definition</td>
                      <td className="border border-white/10 px-3 py-2">Set sustainability aspirations, identify targets (BREEAM, net zero, etc.)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1 Preparation & Brief</td>
                      <td className="border border-white/10 px-3 py-2">Develop sustainability brief, site analysis, establish energy strategy</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2 Concept Design</td>
                      <td className="border border-white/10 px-3 py-2">Passive design options, initial energy modelling, BREEAM pre-assessment</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3 Spatial Coordination</td>
                      <td className="border border-white/10 px-3 py-2">Detailed energy modelling, services coordination, embodied carbon assessment</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4 Technical Design</td>
                      <td className="border border-white/10 px-3 py-2">Specification completion, compliance calculations, commissioning plan</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">5 Manufacturing & Construction</td>
                      <td className="border border-white/10 px-3 py-2">Site waste management, sustainable procurement, commissioning</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">6 Handover</td>
                      <td className="border border-white/10 px-3 py-2">Building log book, training, metering setup, BREEAM certification</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">7 Use</td>
                      <td className="border border-white/10 px-3 py-2">POE, seasonal commissioning, performance monitoring, aftercare</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Value Engineering: Right Approach</p>
              <p className="text-sm text-white/90 mb-3">
                Value engineering should optimise whole-life value, not simply reduce capital cost.
                Effective VE maintains performance outcomes while finding more efficient solutions.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-green-400 mb-1">Good VE Practice:</p>
                  <ul className="text-xs text-white/80 space-y-1 list-disc list-outside ml-4">
                    <li>Challenge assumptions, not outcomes</li>
                    <li>Consider whole-life cost</li>
                    <li>Protect defined performance targets</li>
                    <li>Seek alternative delivery methods</li>
                    <li>Document trade-off rationale</li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-medium text-red-400 mb-1">Poor VE Practice:</p>
                  <ul className="text-xs text-white/80 space-y-1 list-disc list-outside ml-4">
                    <li>Focus only on capital reduction</li>
                    <li>Remove renewable systems</li>
                    <li>Reduce insulation below target</li>
                    <li>Delete commissioning scope</li>
                    <li>Substitute without analysis</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Design freeze considerations:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Stage 3 freeze:</strong> Lock building form, orientation, fabric performance, major systems strategy</li>
                <li className="pl-1"><strong>Stage 4 freeze:</strong> Lock specifications, product selections, detailed performance criteria</li>
                <li className="pl-1"><strong>Post-freeze changes:</strong> Require formal change control with impact assessment on sustainability targets</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>VE principle:</strong> If a VE proposal cannot demonstrate neutral or positive whole-life value impact, it is cost-cutting, not value engineering.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Soft Landings and POE */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Soft Landings and Post-Occupancy Evaluation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The soft landings approach addresses the common problem of buildings failing to
              perform as designed in operation. By maintaining design team involvement through
              handover and early occupation, soft landings bridges the gap between design intent
              and operational reality.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Government Soft Landings (GSL) Framework</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Stage</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Gateway</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Activities</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Briefing</td>
                      <td className="border border-white/10 px-3 py-2">Gateway 1</td>
                      <td className="border border-white/10 px-3 py-2">Define operational requirements, success criteria</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Design</td>
                      <td className="border border-white/10 px-3 py-2">Gateway 2</td>
                      <td className="border border-white/10 px-3 py-2">Review design against operational needs</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Construction</td>
                      <td className="border border-white/10 px-3 py-2">Gateway 3</td>
                      <td className="border border-white/10 px-3 py-2">Commissioning planning, reality checking</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Handover</td>
                      <td className="border border-white/10 px-3 py-2">Gateway 4</td>
                      <td className="border border-white/10 px-3 py-2">Training, documentation, initial occupation support</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">In-use</td>
                      <td className="border border-white/10 px-3 py-2">Gateway 5</td>
                      <td className="border border-white/10 px-3 py-2">POE, seasonal commissioning, performance review</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Extended Aftercare Timeline</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Month 1-3:</strong> Intensive support, weekly reviews</li>
                  <li className="pl-1"><strong>Month 4-12:</strong> Monthly reviews, seasonal commissioning</li>
                  <li className="pl-1"><strong>Year 2:</strong> Quarterly reviews, performance fine-tuning</li>
                  <li className="pl-1"><strong>Year 3:</strong> Annual review, lessons learned report</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">POE Components</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Energy performance:</strong> Actual vs predicted consumption</li>
                  <li className="pl-1"><strong>Occupant satisfaction:</strong> Comfort, functionality surveys</li>
                  <li className="pl-1"><strong>Systems performance:</strong> Commissioning verification</li>
                  <li className="pl-1"><strong>Maintenance review:</strong> Issues log, remediation tracking</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
              <p className="text-sm font-medium text-purple-400 mb-2">Addressing the Performance Gap</p>
              <p className="text-sm text-white/90 mb-2">
                The performance gap - where buildings use 2-10 times more energy than predicted -
                has multiple causes that soft landings helps address:
              </p>
              <ul className="text-sm text-white/90 space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Design assumptions:</strong> Unrealistic occupancy, equipment loads, operating hours</li>
                <li className="pl-1"><strong>Installation quality:</strong> Air leakage, thermal bridging, controls errors</li>
                <li className="pl-1"><strong>Commissioning gaps:</strong> Incomplete testing, suboptimal settings</li>
                <li className="pl-1"><strong>Occupant behaviour:</strong> Opening windows with heating on, lights left on</li>
                <li className="pl-1"><strong>FM capability:</strong> Complex systems not understood or maintained</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">POE preparation checklist:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Install sub-metering for all major energy uses (lighting, HVAC, small power, lifts)</li>
                <li className="pl-1">Establish BMS data logging with appropriate trending intervals</li>
                <li className="pl-1">Create baseline predictions for comparison (monthly profiles)</li>
                <li className="pl-1">Develop occupant survey methodology and schedule</li>
                <li className="pl-1">Define performance thresholds and escalation procedures</li>
                <li className="pl-1">Allocate budget and responsibility for POE activities</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Reality check:</strong> Buildings are used by people, maintained by FM teams, and operate in real weather - not the idealised conditions of design models. Soft landings acknowledges this gap and actively manages it.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Early MEP Engagement Influence</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> A commercial office project where MEP was engaged at Stage 1 vs a similar project where engagement was delayed to Stage 3.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Project A: Early MEP Engagement (Stage 1)</p>
                <p className="mt-2">MEP Input on Building Form:</p>
                <p className="ml-4">- Optimised orientation for solar gain control</p>
                <p className="ml-4">- Floor-to-ceiling heights allow natural ventilation</p>
                <p className="ml-4">- Core position enables efficient services distribution</p>
                <p className="ml-4">- Facade design supports mixed-mode operation</p>
                <p className="mt-2 text-green-400">Result: Mixed-mode HVAC, 40% reduction in cooling load</p>
                <p className="mt-3 text-white/60">Project B: Late MEP Engagement (Stage 3)</p>
                <p className="mt-2">MEP Response to Fixed Design:</p>
                <p className="ml-4">- Deep plan requires full mechanical ventilation</p>
                <p className="ml-4">- Low floor-to-floor constrains ductwork routing</p>
                <p className="ml-4">- Glazed facade requires extensive solar control</p>
                <p className="ml-4">- Core position creates long distribution runs</p>
                <p className="mt-2 text-red-400">Result: Full mechanical HVAC, energy target missed by 35%</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Value Engineering Assessment</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Evaluate a VE proposal to substitute specified LED luminaires with a cheaper alternative.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>VE Proposal Assessment Framework:</p>
                <p className="mt-2">Specified luminaire: £180/unit, 95 lm/W, 50,000hr life, 5yr warranty</p>
                <p>VE alternative: £120/unit, 85 lm/W, 30,000hr life, 2yr warranty</p>
                <p className="mt-2">Capital saving: 500 fittings × £60 = £30,000</p>
                <p className="mt-2">Whole-life impact (25 year):</p>
                <p className="ml-4">Additional energy: 10% higher = £45,000</p>
                <p className="ml-4">Additional replacements: 2× more = £60,000</p>
                <p className="ml-4">Additional labour: £15,000</p>
                <p className="ml-4">Carbon impact: +12 tonnes CO2</p>
                <p className="mt-2 text-white/60">Net whole-life cost: +£90,000 vs specified</p>
                <p className="mt-2 text-red-400">Recommendation: REJECT - not value engineering, cost-cutting</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: POE Performance Gap Analysis</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Analyse first-year energy data from a new office building against design predictions.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Annual Energy Comparison:</p>
                <p className="mt-2">| End Use      | Predicted | Actual  | Gap    |</p>
                <p>|--------------|-----------|---------|--------|</p>
                <p>| Heating      | 25 kWh/m² | 18 kWh/m²| -28%   |</p>
                <p>| Cooling      | 30 kWh/m² | 52 kWh/m²| +73%   |</p>
                <p>| Lighting     | 20 kWh/m² | 35 kWh/m²| +75%   |</p>
                <p>| Small power  | 35 kWh/m² | 48 kWh/m²| +37%   |</p>
                <p>| TOTAL        |110 kWh/m² |153 kWh/m²| +39%   |</p>
                <p className="mt-2">Investigation findings:</p>
                <p className="ml-4 text-yellow-400">Cooling: BMS setpoints 2°C lower than design, economiser disabled</p>
                <p className="ml-4 text-yellow-400">Lighting: Daylight dimming not commissioned, occupancy sensors bypassed</p>
                <p className="ml-4 text-yellow-400">Small power: 30% more equipment than design assumption</p>
                <p className="mt-2 text-green-400">Actions: Seasonal commissioning + training = 25% reduction expected</p>
              </div>
            </div>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Integrated Design Process Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Engage MEP consultant at Stage 0-1, not Stage 2-3</li>
                <li className="pl-1">Establish sustainability targets before design begins</li>
                <li className="pl-1">Schedule regular multi-disciplinary design workshops</li>
                <li className="pl-1">Use BIM for coordination and performance analysis</li>
                <li className="pl-1">Test design options against performance criteria iteratively</li>
                <li className="pl-1">Include FM input in design development</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Stages for MEP Sustainability Input</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Stage 0: Sustainability targets, energy strategy direction</li>
                <li className="pl-1">Stage 1: Site analysis, passive design potential, system concepts</li>
                <li className="pl-1">Stage 2: Detailed energy modelling, system selection, renewables sizing</li>
                <li className="pl-1">Stage 3: Services coordination, controls strategy, metering specification</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Integration Failures</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Late MEP appointment:</strong> Building form fixed before services input</li>
                <li className="pl-1"><strong>Siloed design:</strong> Each discipline optimises independently</li>
                <li className="pl-1"><strong>Paper coordination:</strong> No proper BIM clash detection</li>
                <li className="pl-1"><strong>VE as cost-cutting:</strong> Sustainability features removed to save capital</li>
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
                <p className="font-medium text-white mb-1">IDP Principles</p>
                <ul className="space-y-0.5">
                  <li>All disciplines from Stage 0-1</li>
                  <li>Whole-systems thinking</li>
                  <li>Performance-based targets</li>
                  <li>Iterative optimisation</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Soft Landings Timeline</p>
                <ul className="space-y-0.5">
                  <li>Year 1: Monthly reviews</li>
                  <li>Year 2: Quarterly reviews</li>
                  <li>Year 3: Annual review</li>
                  <li>Seasonal commissioning each year</li>
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
            <Link to="../h-n-c-module6-section6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module6-section6-4">
              Next: Sustainability Assessment Methods
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule6Section6_3;
