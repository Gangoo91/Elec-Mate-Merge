import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Category and Performance Levels (ISO 13849) - MOET Module 5 Section 3.4";
const DESCRIPTION = "Understanding ISO 13849-1 categories, Performance Levels, MTTFd, DCavg, CCF and the SISTEMA verification tool for safety-related control systems. ST1426 aligned.";

const quickCheckQuestions = [
  {
    id: "pl-count",
    question: "How many Performance Levels does ISO 13849-1 define?",
    options: [
      "3 (PL a to PL c)",
      "5 (PL a to PL e)",
      "4 (SIL 1 to SIL 4)",
      "6 (Cat B to Cat 4 plus two extras)"
    ],
    correctIndex: 1,
    explanation: "ISO 13849-1 defines five Performance Levels: PL a (lowest reliability) to PL e (highest reliability), each corresponding to a range of probability of dangerous failure per hour (PFHd)."
  },
  {
    id: "cat3-vs-cat1",
    question: "What does Category 3 require that Category 1 does not?",
    options: [
      "Use of well-tried components",
      "Redundancy so a single fault does not cause loss of the safety function",
      "Use of safety-rated components only",
      "Annual third-party inspection"
    ],
    correctIndex: 1,
    explanation: "Category 3 introduces redundancy (typically dual-channel architecture) so that a single fault is tolerated without loss of the safety function. Category 1 relies on well-tried components but has no redundancy."
  },
  {
    id: "pfhd",
    question: "What parameter represents the probability of dangerous failure per hour?",
    options: [
      "MTTFd",
      "PFHd",
      "DCavg",
      "CCF"
    ],
    correctIndex: 1,
    explanation: "PFHd (Probability of dangerous Failure per Hour) is the quantitative measure used to determine the achieved Performance Level. Lower PFHd values indicate higher safety integrity."
  },
  {
    id: "pl-vs-plr",
    question: "If the required Performance Level (PLr) is d and the achieved PL is c, is this acceptable?",
    options: [
      "Yes, PL c is close enough to PL d",
      "No — the achieved PL must be greater than or equal to the required PLr",
      "Yes, if the machine is only used occasionally",
      "It depends on the manufacturer's preference"
    ],
    correctIndex: 1,
    explanation: "The achieved PL must meet or exceed the required PLr. PL c is less than PLr d, so the safety system does not meet the requirement. The system must be redesigned to achieve at least PL d."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which standard provides the framework for Performance Levels of safety-related control systems?",
    options: [
      "IEC 61131-3",
      "ISO 13849-1",
      "BS 7671",
      "IEC 60204-1"
    ],
    correctAnswer: 1,
    explanation: "ISO 13849-1 'Safety-related parts of control systems' defines categories, Performance Levels, and the validation process for safety-related control systems of machinery."
  },
  {
    id: 2,
    question: "What is the required Performance Level (PLr) determined by?",
    options: [
      "The machine manufacturer's preference",
      "A risk assessment considering severity, frequency and possibility of avoidance",
      "The cost of safety components",
      "The machine's production speed"
    ],
    correctAnswer: 1,
    explanation: "PLr is determined by risk assessment using three parameters: severity of injury (S1/S2), frequency/duration of exposure (F1/F2), and possibility of avoiding the hazard (P1/P2)."
  },
  {
    id: 3,
    question: "What does MTTFd stand for?",
    options: [
      "Maximum Time To Fix defects",
      "Mean Time To dangerous Failure",
      "Minimum Testing Time for devices",
      "Machine Tolerance Threshold for design"
    ],
    correctAnswer: 1,
    explanation: "MTTFd is the Mean Time To dangerous Failure — the average time before a component experiences a dangerous failure mode. It is classified as low (3-10 years), medium (10-30 years) or high (30-100 years)."
  },
  {
    id: 4,
    question: "What is Diagnostic Coverage (DCavg)?",
    options: [
      "The percentage of staff trained in diagnostics",
      "The proportion of dangerous failures that are detected by automatic testing",
      "The number of diagnostic LEDs on the safety device",
      "The frequency of manual inspections"
    ],
    correctAnswer: 1,
    explanation: "DCavg is the average Diagnostic Coverage — the percentage of dangerous failures detected by automatic diagnostic functions such as pulse testing, feedback monitoring and cross-channel checking."
  },
  {
    id: 5,
    question: "A Category B system has what fundamental requirement?",
    options: [
      "Redundancy with fault detection",
      "Well-tried components and basic safety principles",
      "Safety function performed using basic safety principles only — no specific fault resistance",
      "Three independent channels"
    ],
    correctAnswer: 2,
    explanation: "Category B is the baseline — it requires basic safety principles to be applied but does not require resistance to faults. A single fault can cause loss of the safety function."
  },
  {
    id: 6,
    question: "What is Common Cause Failure (CCF)?",
    options: [
      "A fault affecting only one channel",
      "A single event that causes failure of multiple channels simultaneously",
      "A failure caused by common wiring practices",
      "A fault in the common power supply only"
    ],
    correctAnswer: 1,
    explanation: "CCF is a failure caused by a single event that affects both channels of a redundant system simultaneously (e.g., a power surge, extreme temperature, systematic design error, or contamination)."
  },
  {
    id: 7,
    question: "How are measures against CCF scored in ISO 13849-1?",
    options: [
      "Pass/fail assessment",
      "Points system totalling a minimum of 65 out of 100",
      "Third-party certification only",
      "Not addressed in the standard"
    ],
    correctAnswer: 1,
    explanation: "ISO 13849-1 Annex F provides a scoring system for CCF measures. Categories include physical separation, diversity, environmental protection, competence and training. A minimum score of 65 out of 100 is required."
  },
  {
    id: 8,
    question: "What is the relationship between Category and Performance Level?",
    options: [
      "They are the same thing",
      "Category defines the architecture; PL is the achieved reliability calculated from category, MTTFd, DCavg and CCF",
      "PL defines the architecture; Category is calculated",
      "There is no relationship"
    ],
    correctAnswer: 1,
    explanation: "Category defines the structural architecture (redundancy, diagnostics). The achieved PL is then calculated considering the category plus the reliability parameters MTTFd, DCavg and CCF."
  },
  {
    id: 9,
    question: "Which tool does ISO 13849-1 provide for determining the achieved PL from quantitative parameters?",
    options: [
      "A risk graph",
      "Bar charts in the annexes (simplified approach) or calculation per the detailed method",
      "An online calculator only",
      "It must always be calculated by a notified body"
    ],
    correctAnswer: 1,
    explanation: "The standard provides simplified tables and bar charts in the annexes where the category, MTTFd range and DCavg range are used to look up the achieved PL. The detailed method uses the full PFHd calculation."
  },
  {
    id: 10,
    question: "What must be true for the safety system to be acceptable?",
    options: [
      "The PL must equal the PLr exactly",
      "The achieved PL must be greater than or equal to the required PLr",
      "The category number must match the PL letter",
      "The MTTFd must exceed 100 years"
    ],
    correctAnswer: 1,
    explanation: "The achieved Performance Level must meet or exceed the required Performance Level determined by the risk assessment. Exceeding the PLr is acceptable; falling short is not."
  },
  {
    id: 11,
    question: "In Category 4, what happens when faults accumulate?",
    options: [
      "The system degrades gracefully to Category 3",
      "The safety function is always performed — an accumulation of faults does not cause loss of the safety function",
      "The machine must be taken out of service",
      "A warning is displayed but operation continues"
    ],
    correctAnswer: 1,
    explanation: "Category 4 is the most stringent — even an accumulation of undetected faults does not cause loss of the safety function. This requires both high diagnostic coverage and resistance to common cause failures."
  },
  {
    id: 12,
    question: "What is SISTEMA and what is it used for?",
    options: [
      "A brand of safety relay",
      "A free software tool from the German IFA for calculating the achieved PL per ISO 13849-1",
      "A safety training programme",
      "A type of safety interlock switch"
    ],
    correctAnswer: 1,
    explanation: "SISTEMA (Safety Integrity Software Tool for the Evaluation of Machine Applications) is a free tool from the German IFA. It guides the user through defining subsystems, entering component data and calculating the achieved PL."
  }
];

const faqs = [
  {
    question: "What is the difference between ISO 13849-1 and IEC 62061?",
    answer: "Both standards address safety-related control systems for machinery. ISO 13849-1 uses Performance Levels (PL a-e) and covers all technologies (mechanical, hydraulic, pneumatic, electrical). IEC 62061 uses Safety Integrity Levels (SIL 1-3) and is limited to electrical/electronic/programmable electronic systems. Both are harmonised under the Machinery Directive and either can be used."
  },
  {
    question: "How do I determine the required Performance Level?",
    answer: "Use the risk graph in ISO 13849-1 Clause 4. Assess three parameters: S (severity of injury — S1 slight/reversible or S2 serious/irreversible), F (frequency/duration of exposure — F1 seldom/short or F2 frequent/long), and P (possibility of avoiding the hazard — P1 possible or P2 scarcely possible). The combination gives PLr from a to e."
  },
  {
    question: "Can I achieve PL e with a Category 3 architecture?",
    answer: "In theory, Category 3 can achieve up to PL e if MTTFd is high and DCavg is high. However, in practice, Category 4 architecture is typically needed to reliably achieve PL e because Category 4 additionally requires tolerance to fault accumulation, which is difficult to demonstrate with Category 3 alone."
  },
  {
    question: "What software tools are available for ISO 13849 calculations?",
    answer: "The most widely used tool is SISTEMA (Safety Integrity Software Tool for the Evaluation of Machine Applications), provided free by the German IFA (Institut fuer Arbeitsschutz). It guides the user through the PL calculation process, manages component libraries and generates verification reports. Some safety device manufacturers also provide SISTEMA libraries for their products."
  },
  {
    question: "What is the difference between Category 2 and Category 3?",
    answer: "Category 2 uses periodic automatic testing to detect faults — between tests, a fault may exist undetected. Category 3 uses redundancy (dual channels) so that a single fault does not cause loss of the safety function regardless of when testing occurs. Category 3 provides continuous protection through redundancy."
  }
];

const MOETModule5Section3_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section3">
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
            <Shield className="h-4 w-4" />
            <span>Module 5.3.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Category and Performance Levels
          </h1>
          <p className="text-white/80">
            ISO 13849-1 categories, Performance Levels, key parameters and the SISTEMA verification tool
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Categories:</strong> B (baseline), 1 (well-tried), 2 (tested), 3 (redundant), 4 (accumulation tolerant)</li>
              <li className="pl-1"><strong>Performance Levels:</strong> PL a (lowest) to PL e (highest reliability)</li>
              <li className="pl-1"><strong>Key parameters:</strong> MTTFd, DCavg, CCF determine achieved PL</li>
              <li className="pl-1"><strong>Requirement:</strong> Achieved PL must meet or exceed PLr from risk assessment</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Electrical Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Replacement:</strong> Components must match or exceed original PL/SIL rating</li>
              <li className="pl-1"><strong>Proof testing:</strong> Interval determined by PL calculation and validation plan</li>
              <li className="pl-1"><strong>Documentation:</strong> Technical File must contain PL calculations and test records</li>
              <li className="pl-1"><strong>ST1426:</strong> Understand safety system integrity requirements</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the five designated architectures (Categories B, 1, 2, 3, 4) and their fault tolerance",
              "Define Performance Levels PL a through PL e and their PFHd ranges",
              "Use the risk graph to determine the Required Performance Level (PLr)",
              "Describe the parameters MTTFd, DCavg and CCF and their role in PL calculation",
              "Outline the verification and validation process for safety control systems",
              "Compare ISO 13849-1 (Performance Levels) with IEC 62061 (Safety Integrity Levels)"
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

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Designated Architectures (Categories)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              ISO 13849-1 defines five designated architectures, called Categories, that describe the structural requirements for safety-related control system parts. Each category specifies the level of fault resistance, redundancy and diagnostic capability required. The category is the starting point — it defines the structure, while the reliability parameters determine the achieved Performance Level.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Category Summary</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Category</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Requirement</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Fault Behaviour</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-white/10 px-3 py-2">B</td><td className="border border-white/10 px-3 py-2">Basic safety principles</td><td className="border border-white/10 px-3 py-2">Single fault can cause loss of safety function</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">1</td><td className="border border-white/10 px-3 py-2">Well-tried components and principles</td><td className="border border-white/10 px-3 py-2">Single fault can cause loss, but less likely</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">2</td><td className="border border-white/10 px-3 py-2">Periodic automatic testing</td><td className="border border-white/10 px-3 py-2">Fault detected by test; may exist between tests</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">3</td><td className="border border-white/10 px-3 py-2">Redundancy (dual-channel)</td><td className="border border-white/10 px-3 py-2">Single fault tolerated; detected at/before next demand</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">4</td><td className="border border-white/10 px-3 py-2">Redundancy + accumulation tolerance</td><td className="border border-white/10 px-3 py-2">Even accumulated faults do not cause loss</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Practical Examples</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Category B/1:</strong> A simple guard interlock on a low-risk machine using a positive-opening switch (well-tried component)</li>
                <li className="pl-1"><strong>Category 2:</strong> A light curtain with periodic self-test — the controller checks the sensor function at start-up and periodically during operation</li>
                <li className="pl-1"><strong>Category 3:</strong> A dual-channel E-stop circuit monitored by a safety relay — the most common architecture for E-stops and guard interlocks</li>
                <li className="pl-1"><strong>Category 4:</strong> A press safety system using redundant light curtains, redundant safety controllers and comprehensive diagnostics — highest integrity</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Performance Levels and PFHd
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Performance Level (PL) is the discrete level used to specify the ability of safety-related control system parts to perform a safety function under foreseeable conditions. The five levels are defined by ranges of PFHd (Probability of dangerous Failure per Hour).
            </p>

            <div className="my-6">
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">PL</th>
                      <th className="border border-white/10 px-3 py-2 text-left">PFHd Range (per hour)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-white/10 px-3 py-2">PL a</td><td className="border border-white/10 px-3 py-2">10^-5 to less than 10^-4</td><td className="border border-white/10 px-3 py-2">Low-risk auxiliary functions</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">PL b</td><td className="border border-white/10 px-3 py-2">3 x 10^-6 to less than 10^-5</td><td className="border border-white/10 px-3 py-2">Simple guard interlocks</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">PL c</td><td className="border border-white/10 px-3 py-2">10^-6 to less than 3 x 10^-6</td><td className="border border-white/10 px-3 py-2">Standard machine safety functions</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">PL d</td><td className="border border-white/10 px-3 py-2">10^-7 to less than 10^-6</td><td className="border border-white/10 px-3 py-2">E-stops, interlocks on higher-risk machines</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">PL e</td><td className="border border-white/10 px-3 py-2">10^-8 to less than 10^-7</td><td className="border border-white/10 px-3 py-2">Press safety systems, robotic cell entry</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Risk Graph for Determining PLr</p>
              <p className="text-sm text-white mb-3">
                The Required Performance Level (PLr) is determined by a risk assessment using three parameters:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>S (Severity):</strong> S1 = slight/reversible injury, S2 = serious/irreversible injury or death</li>
                <li className="pl-1"><strong>F (Frequency/Duration):</strong> F1 = seldom/short exposure, F2 = frequent/long exposure</li>
                <li className="pl-1"><strong>P (Possibility of avoidance):</strong> P1 = possible under certain conditions, P2 = scarcely possible</li>
              </ul>
              <p className="text-sm text-white mt-3">
                Example: A guard interlock on a CNC lathe — S2 (amputation risk), F2 (frequent access for loading), P2 (scarcely possible to avoid) gives PLr = e.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> The achieved PL must meet or exceed the PLr. If the calculation shows PL c but PLr is d, the safety system must be redesigned — typically by increasing the category (adding redundancy), improving component MTTFd, or increasing diagnostic coverage.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Key Parameters: MTTFd, DCavg and CCF
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Three quantitative parameters, combined with the category architecture, determine the achieved Performance Level. Understanding these parameters is essential for interpreting safety system documentation and understanding why specific components and architectures are used.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">MTTFd — Mean Time To dangerous Failure</h3>
                <p className="text-sm text-white mb-2">
                  The average time before a component experiences a dangerous failure mode. Classified into three ranges:
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Low:</strong> 3 to 10 years</li>
                  <li className="pl-1"><strong>Medium:</strong> 10 to 30 years</li>
                  <li className="pl-1"><strong>High:</strong> 30 to 100 years</li>
                </ul>
                <p className="text-sm text-white mt-2">
                  Values are obtained from manufacturer data, reliability databases (SN 29500, FMEDA reports) or field experience. The channel MTTFd is calculated from individual component values using the parts count method.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">DCavg — Average Diagnostic Coverage</h3>
                <p className="text-sm text-white mb-2">
                  The percentage of dangerous failures detected by automatic diagnostic functions:
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>None:</strong> DC less than 60%</li>
                  <li className="pl-1"><strong>Low:</strong> 60% to less than 90%</li>
                  <li className="pl-1"><strong>Medium:</strong> 90% to less than 99%</li>
                  <li className="pl-1"><strong>High:</strong> 99% or greater</li>
                </ul>
                <p className="text-sm text-white mt-2">
                  Examples: Safety relay pulse testing on inputs (medium DC), feedback loop monitoring of contactors (high DC), plausibility checking between redundant sensors (high DC).
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">CCF — Common Cause Failure</h3>
                <p className="text-sm text-white mb-2">
                  Measures resistance to faults that could affect both channels simultaneously. ISO 13849-1 Annex F scores measures including:
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Physical separation of signal paths</li>
                  <li className="pl-1">Diversity of components (different manufacturers/technologies)</li>
                  <li className="pl-1">Environmental protection (overvoltage, EMI, temperature)</li>
                  <li className="pl-1">Well-designed processes (competence, training, management of change)</li>
                </ul>
                <p className="text-sm text-white mt-2">
                  A minimum score of 65 out of 100 is required for Categories 2, 3 and 4.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Verification, Validation and SISTEMA
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              ISO 13849-2 specifies validation requirements for safety-related control systems. Validation confirms that the safety system meets its specification and achieves the required PL under all foreseeable conditions, including fault conditions.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">SISTEMA Software Tool</p>
              <p className="text-sm text-white mb-3">
                SISTEMA (Safety Integrity Software Tool for the Evaluation of Machine Applications) from the German IFA is the industry-standard tool for ISO 13849-1 calculations:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Free to download from the IFA website</li>
                <li className="pl-1">Guides the user through defining subsystems and entering component data</li>
                <li className="pl-1">Manages component libraries from major safety device manufacturers</li>
                <li className="pl-1">Calculates the achieved PL and generates verification reports</li>
                <li className="pl-1">Highlights where the achieved PL does not meet the PLr</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Validation Process</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Analysis:</strong> Review circuit diagrams, component specifications, failure mode analysis</li>
                <li className="pl-1"><strong>Testing:</strong> Functional tests under normal and fault conditions, environmental tests</li>
                <li className="pl-1"><strong>Fault simulation:</strong> Introduce simulated faults and verify the system responds correctly</li>
                <li className="pl-1"><strong>Documentation:</strong> Risk assessment, SISTEMA reports, test records, fault simulation results</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Maintenance note:</strong> As a maintenance technician, you will not typically perform PL calculations, but you must understand the documentation and ensure that any component replacement maintains the original PL. Replacing a PL d safety relay with a PL c device would reduce the safety integrity and require re-validation.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            ISO 13849 vs IEC 62061
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Two standards are available for designing safety-related control systems for machinery. Understanding the differences helps when working with safety documentation and communicating with design engineers.
            </p>

            <div className="my-6">
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Feature</th>
                      <th className="border border-white/10 px-3 py-2 text-left">ISO 13849-1</th>
                      <th className="border border-white/10 px-3 py-2 text-left">IEC 62061</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-white/10 px-3 py-2">Measure</td><td className="border border-white/10 px-3 py-2">Performance Level (PL a-e)</td><td className="border border-white/10 px-3 py-2">Safety Integrity Level (SIL 1-3)</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Technologies</td><td className="border border-white/10 px-3 py-2">All (mechanical, hydraulic, pneumatic, electrical)</td><td className="border border-white/10 px-3 py-2">E/E/PE only</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Architecture</td><td className="border border-white/10 px-3 py-2">Categories B, 1, 2, 3, 4</td><td className="border border-white/10 px-3 py-2">Subsystem architecture A, B, C, D</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Calculation</td><td className="border border-white/10 px-3 py-2">Simplified (tables) or detailed</td><td className="border border-white/10 px-3 py-2">Detailed PFHd calculation</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Tool</td><td className="border border-white/10 px-3 py-2">SISTEMA</td><td className="border border-white/10 px-3 py-2">Manufacturer-specific or spreadsheet</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> Both standards are harmonised under the Machinery Directive and provide a presumption of conformity. ISO 13849-1 is more widely used in the UK for general machinery applications, particularly where non-electrical technologies are involved. IEC 62061 is preferred for complex programmable electronic safety systems.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

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
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section3-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Safety Relays and Controllers
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section3-5">
              Next: Functional Safety Principles
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule5Section3_4;
