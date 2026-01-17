import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Purpose of Electrical System Design - Level 3 Module 6 Section 1.1";
const DESCRIPTION = "Understanding the fundamental purpose and objectives of electrical system design, including safety, functionality, compliance and value.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is the PRIMARY purpose of electrical system design?",
    options: [
      "To maximise profit for the contractor",
      "To provide safe, functional and compliant electrical installations",
      "To use the most expensive materials available",
      "To complete work as quickly as possible"
    ],
    correctIndex: 1,
    explanation: "The primary purpose is always safety, functionality and compliance. A well-designed system protects people from electric shock and fire whilst meeting the client's operational needs and regulatory requirements."
  },
  {
    id: "check-2",
    question: "Why is a systematic design approach important before installation begins?",
    options: [
      "It identifies potential problems and ensures compliance before costly installation work starts",
      "It is only required for large commercial projects",
      "It allows the contractor to charge more for the job",
      "It is optional but recommended by trade associations"
    ],
    correctIndex: 0,
    explanation: "A systematic design approach identifies issues early when changes are cheap to make. Discovering problems during or after installation is far more expensive and disruptive than addressing them at design stage."
  },
  {
    id: "check-3",
    question: "Which document forms the legal basis for electrical installation design in the UK?",
    options: [
      "Building Regulations Part A",
      "BS 7671 Requirements for Electrical Installations",
      "IET Guidance Note 1",
      "Electricity at Work Regulations 1989"
    ],
    correctIndex: 1,
    explanation: "BS 7671 is the UK standard for electrical installation design and provides the technical requirements. The Electricity at Work Regulations provide legal duties, but BS 7671 gives the detailed technical guidance for compliance."
  },
  {
    id: "check-4",
    question: "What happens if an electrical system is designed without considering future expansion?",
    options: [
      "Nothing - systems should only meet current needs",
      "The installation will fail initial testing",
      "Future additions may require expensive rewiring or distribution board upgrades",
      "The DNO will refuse to provide a supply"
    ],
    correctIndex: 2,
    explanation: "Designing without future-proofing often means expensive upgrades later. A consumer unit with no spare ways, or cables with no capacity headroom, forces costly modifications when the client's needs grow."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What are the four fundamental objectives of electrical system design?",
    options: [
      "Speed, cost, appearance, simplicity",
      "Safety, functionality, compliance, value",
      "Profit, efficiency, standardisation, documentation",
      "Testing, certification, maintenance, disposal"
    ],
    correctAnswer: 1,
    explanation: "The four fundamental objectives are: Safety (protecting people and property), Functionality (meeting operational needs), Compliance (meeting regulations and standards), and Value (cost-effective solutions that meet requirements)."
  },
  {
    id: 2,
    question: "A client asks you to design an electrical system for a new office. What should be your FIRST consideration?",
    options: [
      "The colour of socket outlets",
      "Understanding the client's current and future electrical needs",
      "Selecting the cheapest cable sizes",
      "Choosing a consumer unit brand"
    ],
    correctAnswer: 1,
    explanation: "Understanding the client's needs is always first. You need to know what equipment will be used, how many people will occupy the space, what special requirements exist, and what future expansion is planned before any design work begins."
  },
  {
    id: 3,
    question: "Why does BS 7671 Regulation 132.1 require the designer to assess the characteristics of the available supply?",
    options: [
      "To determine the electricity tariff",
      "To ensure the design is compatible with the supply and protective devices will operate correctly",
      "To calculate the client's electricity bill",
      "To decide which DNO to use"
    ],
    correctAnswer: 1,
    explanation: "Assessing supply characteristics ensures protective devices will operate within required times, cables are adequately rated for fault currents, and the installation is compatible with the supply system type (TN-S, TN-C-S, TT)."
  },
  {
    id: 4,
    question: "What is the relationship between good design and installation cost?",
    options: [
      "Good design always increases installation costs",
      "Good design has no effect on installation costs",
      "Good design typically reduces overall project costs through efficiency and avoiding problems",
      "Good design is only relevant for high-budget projects"
    ],
    correctAnswer: 2,
    explanation: "Good design reduces overall costs by optimising cable routes, correctly sizing equipment, avoiding over-specification, and preventing expensive rework. Time spent on proper design saves money during installation and throughout the system's life."
  },
  {
    id: 5,
    question: "A designer specifies minimum cable sizes to save money. What risks does this create?",
    options: [
      "No risks - minimum sizes are always acceptable",
      "Overheating, voltage drop problems, no capacity for future loads, reduced cable life",
      "Only aesthetic issues with smaller cables",
      "The cables will fail testing"
    ],
    correctAnswer: 1,
    explanation: "Minimum sizing risks overheating under sustained load, excessive voltage drop affecting equipment, no capacity for even small load increases, and reduced cable life due to operating near thermal limits. Good design includes reasonable headroom."
  },
  {
    id: 6,
    question: "What does 'designing for maintainability' mean in practice?",
    options: [
      "Using the most expensive components",
      "Ensuring equipment is accessible, labelled, and can be isolated for safe working",
      "Installing everything in locked enclosures",
      "Using proprietary systems from a single manufacturer"
    ],
    correctAnswer: 1,
    explanation: "Maintainability means placing equipment where it can be accessed safely, providing adequate labelling and documentation, ensuring circuits can be isolated individually, and using commonly available components where appropriate."
  },
  {
    id: 7,
    question: "According to BS 7671 Part 1, what must the designer assess regarding external influences?",
    options: [
      "Only temperature",
      "Environmental conditions that may affect safety and operation of the installation",
      "Only water ingress",
      "Political and economic factors"
    ],
    correctAnswer: 1,
    explanation: "External influences include temperature, water presence, foreign bodies, corrosion, mechanical impact, vibration, flora/fauna, electromagnetic disturbances, solar radiation, building structure, and contact with earth - any factor that could affect safety or operation."
  },
  {
    id: 8,
    question: "Why should a designer consider the competence of people who will use the installation?",
    options: [
      "To determine training requirements",
      "To select appropriate protection levels and access restrictions",
      "To calculate labour costs",
      "To decide the colour scheme"
    ],
    correctAnswer: 1,
    explanation: "User competence affects design decisions like IP ratings on enclosures, whether socket outlets need RCD protection, access restrictions to switchgear, and the type of warnings and labelling required. A domestic kitchen differs from an industrial control panel room."
  },
  {
    id: 9,
    question: "What is the purpose of diversity calculations in electrical design?",
    options: [
      "To ensure all circuits are identical",
      "To realistically size distribution equipment based on actual expected demand rather than theoretical maximum",
      "To increase the size of all cables",
      "To reduce the number of circuits required"
    ],
    correctAnswer: 1,
    explanation: "Diversity calculations recognise that not all loads operate simultaneously at full capacity. This allows distribution boards, main cables, and supplies to be sized economically for realistic demand rather than the impossible scenario of everything running at once."
  },
  {
    id: 10,
    question: "A client wants to add solar PV panels in two years. How should this affect your current design?",
    options: [
      "It shouldn't - design only for current needs",
      "Include provisions for future PV integration such as space, cable routes, and spare capacity",
      "Install the PV system now instead",
      "Refuse the job as it's too complex"
    ],
    correctAnswer: 1,
    explanation: "Good design anticipates future needs. For planned PV, this might mean spare ways in the consumer unit, accessible cable routes for DC cables, space for an inverter, and ensuring the earthing arrangement can accommodate the additional system."
  }
];

const faqs = [
  {
    question: "Do I need to be a qualified designer to carry out electrical design work?",
    answer: "While there's no specific 'designer' qualification required by law, you must be competent to design the type of installation in question. For complex installations, designers often hold qualifications such as HNC/HND or degrees in electrical engineering. For standard domestic and small commercial work, a Level 3 qualification combined with experience and understanding of BS 7671 is typically sufficient. The key requirement is competence - you must understand the relevant regulations and be able to apply them correctly."
  },
  {
    question: "What's the difference between design and installation in terms of responsibility?",
    answer: "Design responsibility covers specifying what should be installed - cable sizes, protection, equipment, routes, and ensuring the proposed installation will be safe and compliant. Installation responsibility covers correctly implementing that design with proper workmanship. Sometimes the same person does both, but on larger projects they may be separate. Whoever designs must ensure the design is safe; whoever installs must ensure the installation matches the design and is competently executed."
  },
  {
    question: "How detailed should an electrical design be?",
    answer: "The level of detail should be appropriate to the project complexity. A simple domestic addition might need cable calculations, circuit details, and equipment specifications. A commercial installation needs comprehensive drawings, schedules, specifications, and calculations. The design must be detailed enough that a competent installer can execute it correctly without making design decisions on site that should have been made earlier."
  },
  {
    question: "Can I use manufacturer's design guides instead of doing my own calculations?",
    answer: "Manufacturer's guides and selection tools can help, but you remain responsible for the design's adequacy. These tools are useful starting points but may not account for site-specific factors like grouping, ambient temperature, or route length. Always verify manufacturer recommendations against BS 7671 requirements and adjust for your specific installation conditions."
  },
  {
    question: "What documentation should I keep for an electrical design?",
    answer: "Keep all calculations (cable sizing, voltage drop, fault loop impedance), equipment specifications, drawings and schematics, design decisions and their justification, any risk assessments, client requirements documentation, and correspondence relating to the design. This documentation may be needed for future alterations, investigations, or legal purposes. Many designers keep records for at least the expected life of the installation."
  }
];

const Level3Module6Section1_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module6-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 6.1.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Purpose of Electrical System Design
          </h1>
          <p className="text-white/80">
            Understanding why proper design is the foundation of every successful installation
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Safety First:</strong> Design prevents electric shock and fire risks</li>
              <li><strong>Functionality:</strong> Systems must meet operational needs now and in future</li>
              <li><strong>Compliance:</strong> BS 7671 and Building Regulations must be satisfied</li>
              <li><strong>Value:</strong> Good design optimises cost without compromising safety</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Poor design shows as overloaded circuits, volt drop complaints</li>
              <li><strong>Use:</strong> Always assess supply characteristics before starting design</li>
              <li><strong>Apply:</strong> Document all design decisions for future reference</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "The four fundamental objectives of electrical design",
              "Why design comes before installation decisions",
              "How to balance safety, functionality and cost",
              "The designer's legal and professional responsibilities",
              "How BS 7671 structures design requirements",
              "The importance of considering future needs"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What Is Electrical System Design?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electrical system design is the process of determining what electrical installation is required to meet a client's needs safely, compliantly and economically. It happens before any physical installation work begins - selecting cables, protection, equipment and layout based on careful analysis rather than guesswork.
            </p>
            <p>
              Think of design as the planning stage where every decision is made on paper (or screen) before committing to expensive materials and labour. A well-designed installation goes in smoothly, passes testing first time, and serves the client reliably for decades. A poorly designed installation creates problems from day one.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Design answers these fundamental questions:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>What loads will the installation supply, now and in future?</li>
                <li>What type of supply is available and what are its characteristics?</li>
                <li>What cable sizes, types and routes are needed?</li>
                <li>What protective devices are required and how should they be coordinated?</li>
                <li>What environmental conditions must be considered?</li>
                <li>What special requirements apply to this location?</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Every installation starts with design, even if it's informal. The question is whether that design is thorough enough to ensure a safe, compliant and cost-effective result.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            The Four Objectives of Design
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Every electrical design must balance four fundamental objectives. These aren't competing goals - they work together. A truly good design achieves all four simultaneously.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Safety</p>
                <p className="text-sm text-white mb-2">
                  The absolute priority. The installation must protect people from electric shock and property from fire throughout its intended life.
                </p>
                <ul className="text-sm text-white space-y-1">
                  <li>Automatic disconnection in fault conditions</li>
                  <li>Protection against overcurrent and overheating</li>
                  <li>Adequate insulation and enclosure</li>
                  <li>Proper earthing and bonding</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Functionality</p>
                <p className="text-sm text-white mb-2">
                  The installation must actually work for its intended purpose. Beautiful safety is useless if equipment can't operate properly.
                </p>
                <ul className="text-sm text-white space-y-1">
                  <li>Adequate current capacity for loads</li>
                  <li>Acceptable voltage drop at terminals</li>
                  <li>Correct socket outlet positioning</li>
                  <li>Appropriate lighting levels and control</li>
                </ul>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Compliance</p>
                <p className="text-sm text-white mb-2">
                  Regulatory requirements exist for good reason. Non-compliance can lead to prosecution, invalidated insurance, and genuine danger.
                </p>
                <ul className="text-sm text-white space-y-1">
                  <li>BS 7671 technical requirements</li>
                  <li>Building Regulations Part P (domestic)</li>
                  <li>Electricity at Work Regulations</li>
                  <li>Relevant British and European Standards</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Value</p>
                <p className="text-sm text-white mb-2">
                  Good design delivers value - meeting requirements without unnecessary expense, using resources efficiently, and minimising whole-life costs.
                </p>
                <ul className="text-sm text-white space-y-1">
                  <li>Optimal cable sizing (not over-specified)</li>
                  <li>Efficient cable routes</li>
                  <li>Appropriate equipment selection</li>
                  <li>Consideration of maintenance costs</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Design Responsibility Under BS 7671
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 7671 Chapter 13 sets out clear responsibilities for designers. These aren't suggestions - they're requirements that must be met for any compliant installation.
            </p>

            <p>
              Regulation 132.1 requires the designer to assess the characteristics of the available supply. This isn't just about knowing the voltage - you need to understand the earthing system type (TN-S, TN-C-S, TT), the prospective fault current, and the external earth fault loop impedance. Without this information, you cannot select appropriate protection.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">The designer must consider:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Supply characteristics:</strong> Voltage, frequency, earthing system, fault current</li>
                <li><strong>Nature of demand:</strong> Current requirements, diversity, future growth</li>
                <li><strong>Emergency services:</strong> Safety systems, escape lighting</li>
                <li><strong>Environmental conditions:</strong> Temperature, water, corrosion, mechanical stress</li>
                <li><strong>Cross-sectional areas:</strong> Live conductors and protective conductors</li>
                <li><strong>Type of wiring:</strong> Cable systems appropriate for conditions</li>
                <li><strong>Protective measures:</strong> Against shock, overcurrent, overvoltage</li>
                <li><strong>Control and isolation:</strong> Emergency switching, functional switching</li>
                <li><strong>Accessibility:</strong> For operation, inspection and maintenance</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> Before designing a kitchen extension circuit, you must obtain supply details from the existing installation or DNO. A 100A TN-C-S supply with Ze of 0.20 ohms requires different design decisions than a TT supply with Ze of 20 ohms. The earthing system alone affects RCD requirements, cable sizing for fault protection, and earthing conductor sizing.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Designing for the Future
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A common design failure is thinking only about today's needs. Electrical installations last 25-40 years, and the client's requirements will almost certainly change during that time. Good design anticipates this.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Spare Capacity</p>
                <p className="text-white/90 text-xs">Leave spare ways in consumer units, capacity in cables</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Accessible Routes</p>
                <p className="text-white/90 text-xs">Cable routes that allow additional cables later</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Technology Ready</p>
                <p className="text-white/90 text-xs">Consider EV charging, solar PV, smart systems</p>
              </div>
            </div>

            <p>
              Future-proofing doesn't mean over-specifying everything. It means making sensible allowances. A domestic consumer unit with 2-3 spare ways costs little more but saves hundreds in future modifications. A cable route through accessible ceiling voids costs nothing extra but enables future additions without disruptive building work.
            </p>

            <p>
              Consider common future requirements: EV charging points for houses without current EVs, data cabling routes in offices, increased lighting loads as spaces are reconfigured. These don't need to be installed now, but the design should make future installation practical.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> The cheapest time to make provisions for future needs is during the original design and installation. Retrofitting costs far more in both materials and disruption.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Starting the Design Process</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Obtain supply characteristics from the DNO or existing installation</li>
                <li>Document client requirements in detail before any design work</li>
                <li>Survey the site to identify environmental conditions and constraints</li>
                <li>Review any relevant drawings, schedules or existing documentation</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Design Sequence</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Assess total load and apply diversity to determine maximum demand</li>
                <li>Select main protective device and distribution equipment</li>
                <li>Design individual circuits with appropriate cable sizing and protection</li>
                <li>Verify fault protection and voltage drop for each circuit</li>
                <li>Document all calculations and design decisions</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Starting installation without design</strong> - Making design decisions on site leads to poor solutions and rework</li>
                <li><strong>Ignoring environmental factors</strong> - Ambient temperature and grouping significantly affect cable ratings</li>
                <li><strong>No future allowance</strong> - Consumer units with no spare ways, cables at absolute maximum capacity</li>
                <li><strong>Not verifying supply characteristics</strong> - Assumptions about supply type or fault level can invalidate the entire design</li>
              </ul>
            </div>
          </div>
        </section>

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

        <hr className="border-white/5 my-12" />

        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Design Objectives</p>
                <ul className="space-y-0.5">
                  <li>Safety - protect people and property</li>
                  <li>Functionality - meet operational needs</li>
                  <li>Compliance - satisfy regulations</li>
                  <li>Value - cost-effective solutions</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key BS 7671 References</p>
                <ul className="space-y-0.5">
                  <li>Chapter 13 - Fundamental principles</li>
                  <li>Regulation 132.1 - Supply assessment</li>
                  <li>Section 132 - Design requirements</li>
                  <li>Section 134 - Design/installation coordination</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module6-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 1
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module6-section1-2">
              Next: Compliance with BS 7671
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default Level3Module6Section1_1;
