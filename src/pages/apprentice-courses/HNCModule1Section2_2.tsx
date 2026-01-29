import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Risk Assessment Process - HNC Module 1 Section 2.2";
const DESCRIPTION = "Master the HSE five steps to risk assessment, likelihood and severity scales, risk matrices, and recording requirements for building services electrical installations.";

const quickCheckQuestions = [
  {
    id: "hse-steps",
    question: "How many steps are there in the HSE risk assessment process?",
    options: ["3 steps", "4 steps", "5 steps", "6 steps"],
    correctIndex: 2,
    explanation: "The HSE five steps to risk assessment are: (1) Identify hazards, (2) Decide who might be harmed, (3) Evaluate risks and decide on precautions, (4) Record significant findings, (5) Review and update."
  },
  {
    id: "risk-calculation",
    question: "How is risk typically calculated in a risk matrix?",
    options: ["Likelihood + Severity", "Likelihood × Severity", "Severity ÷ Likelihood", "Likelihood - Severity"],
    correctIndex: 1,
    explanation: "Risk = Likelihood × Severity. This multiplication gives a risk score that helps prioritise which hazards need immediate attention and which control measures are most appropriate."
  },
  {
    id: "review-frequency",
    question: "When must a risk assessment be reviewed?",
    options: ["Only annually", "Only when an accident occurs", "When circumstances change or at regular intervals", "Only when HSE requests it"],
    correctIndex: 2,
    explanation: "Risk assessments must be reviewed when circumstances change significantly (new equipment, processes, or personnel), after incidents, and at regular intervals to ensure they remain valid."
  },
  {
    id: "five-employees",
    question: "Risk assessments must be recorded in writing when an employer has how many employees?",
    options: ["Any number", "3 or more", "5 or more", "10 or more"],
    correctIndex: 2,
    explanation: "Under the Management of Health and Safety at Work Regulations 1999, employers with 5 or more employees must record the significant findings of their risk assessments in writing."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the first step in the HSE five steps to risk assessment?",
    options: [
      "Decide who might be harmed",
      "Identify the hazards",
      "Record your findings",
      "Evaluate the risks"
    ],
    correctAnswer: 1,
    explanation: "Step 1 is to identify the hazards. You must systematically examine the workplace, tasks, and activities to identify anything that could cause harm before you can assess who is at risk."
  },
  {
    id: 2,
    question: "On a 5×5 risk matrix, what risk score range is typically classified as 'High Risk'?",
    options: ["1-4", "5-9", "10-16", "17-25"],
    correctAnswer: 2,
    explanation: "On a 5×5 matrix (scores 1-25), high risk is typically 10-16. Scores of 17-25 are usually 'Very High' or 'Intolerable', while 5-9 is 'Medium' and 1-4 is 'Low'."
  },
  {
    id: 3,
    question: "Which group of people must be specifically considered when identifying who might be harmed?",
    options: [
      "Only employees doing the work",
      "Employees, contractors, visitors, and members of the public",
      "Only qualified electricians",
      "Only management personnel"
    ],
    correctAnswer: 1,
    explanation: "Step 2 requires considering everyone who might be affected, including employees, contractors, cleaners, visitors, maintenance staff, delivery drivers, and members of the public who may be nearby."
  },
  {
    id: 4,
    question: "What does 'ALARP' mean in risk assessment terminology?",
    options: [
      "Always Lower All Risk Priorities",
      "As Low As Reasonably Practicable",
      "Assess Likelihood And Risk Potential",
      "Apply Legal And Regulatory Procedures"
    ],
    correctAnswer: 1,
    explanation: "ALARP means 'As Low As Reasonably Practicable'. Risks should be reduced to this level, balancing the cost and effort of further reduction against the benefits gained."
  },
  {
    id: 5,
    question: "In a 3×3 risk matrix with severity levels Low (1), Medium (2), and High (3), what is the risk score for a hazard with Medium likelihood and High severity?",
    options: ["3", "5", "6", "9"],
    correctAnswer: 2,
    explanation: "Risk = Likelihood × Severity. Medium likelihood (2) × High severity (3) = 6. This would typically be classified as a 'High' risk requiring control measures."
  },
  {
    id: 6,
    question: "What must be included when recording significant findings?",
    options: [
      "Only the hazards identified",
      "Hazards, people at risk, existing controls, and further actions needed",
      "Only the control measures in place",
      "Only accidents that have occurred"
    ],
    correctAnswer: 1,
    explanation: "Significant findings must include: the hazards identified, groups of people who might be harmed, existing control measures, risk ratings, and any further actions required to reduce risk."
  },
  {
    id: 7,
    question: "When working on live LV electrical equipment, what severity rating would electric shock typically receive on a 5-point scale?",
    options: ["1 - Negligible", "2 - Minor", "4 - Major", "5 - Catastrophic"],
    correctAnswer: 3,
    explanation: "Electric shock from LV equipment (230V/400V) can cause fatality, so it typically receives a severity rating of 5 (Catastrophic) or 4 (Major) depending on the specific circumstances and voltage levels."
  },
  {
    id: 8,
    question: "Which of the following would trigger an immediate review of a risk assessment?",
    options: [
      "A colleague's birthday",
      "A near-miss incident",
      "Good weather conditions",
      "Normal daily operations"
    ],
    correctAnswer: 1,
    explanation: "Near-miss incidents indicate that controls may be inadequate and the risk assessment should be reviewed immediately. Other triggers include accidents, new equipment, process changes, or new information about hazards."
  },
  {
    id: 9,
    question: "For a cable installation project in a busy office, which hazard would typically have the HIGHEST likelihood rating?",
    options: [
      "Electric shock from 230V supply",
      "Manual handling injuries from cable drums",
      "Explosion from flammable gases",
      "Structural collapse"
    ],
    correctAnswer: 1,
    explanation: "Manual handling injuries from cable drums would have the highest likelihood as this activity occurs frequently during cable installation. Electric shock is less likely if safe isolation is followed, and explosion/collapse are very unlikely in a standard office."
  },
  {
    id: 10,
    question: "What is the hierarchy of control measures in order of effectiveness?",
    options: [
      "PPE, Engineering controls, Elimination, Substitution",
      "Elimination, Substitution, Engineering controls, Administrative controls, PPE",
      "Administrative controls, PPE, Engineering controls, Elimination",
      "Substitution, Elimination, PPE, Engineering controls"
    ],
    correctAnswer: 1,
    explanation: "The hierarchy of control (most to least effective): Elimination, Substitution, Engineering controls, Administrative controls, PPE. Always consider higher-level controls before relying on PPE as a last resort."
  }
];

const faqs = [
  {
    question: "What is the difference between a hazard and a risk?",
    answer: "A hazard is something with the potential to cause harm (e.g., exposed live conductors, working at height). A risk is the likelihood that harm will actually occur combined with how severe that harm could be. Risk assessment evaluates both elements to prioritise control measures."
  },
  {
    question: "Do I need a separate risk assessment for every job?",
    answer: "Not necessarily. Generic risk assessments can cover routine activities with similar hazards. However, site-specific assessments are needed when conditions vary significantly, such as confined spaces, occupied premises, or unusual electrical systems. Many contractors use a combination of generic assessments plus site-specific additions."
  },
  {
    question: "Who is legally responsible for conducting risk assessments?",
    answer: "The employer has legal responsibility under the Management of Health and Safety at Work Regulations 1999. However, competent persons should actually conduct the assessments. For building services, this typically means someone with electrical knowledge, site experience, and risk assessment training."
  },
  {
    question: "How detailed should a risk assessment be?",
    answer: "Proportionate to the level of risk. High-risk activities (live working, confined spaces) require detailed, task-specific assessments. Lower-risk routine work may use simpler generic assessments. The key is that significant risks are identified and adequate controls documented - avoid both over-complication and dangerous oversimplification."
  },
  {
    question: "What is a 'suitable and sufficient' risk assessment?",
    answer: "This legal term means the assessment must identify all significant hazards, consider who might be harmed, evaluate the risks properly, and implement appropriate controls. It doesn't need to address every trivial risk, but must cover anything that could cause real harm. The level of detail should match the complexity and severity of the risks involved."
  },
  {
    question: "Can risk assessments be done electronically?",
    answer: "Yes, electronic risk assessments are fully acceptable and increasingly common. Digital systems offer advantages including easier updating, version control, accessibility on site via mobile devices, and automatic review reminders. The legal requirement is that findings are recorded - the format is not specified."
  }
];

const HNCModule1Section2_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module1-section2">
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
            <span>Module 1.2.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Risk Assessment Process
          </h1>
          <p className="text-white/80">
            Systematic evaluation of workplace hazards using the HSE five-step approach for building services
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>5 Steps:</strong> Identify hazards, who's at risk, evaluate, record, review</li>
              <li className="pl-1"><strong>Risk Formula:</strong> Risk = Likelihood × Severity</li>
              <li className="pl-1"><strong>Recording:</strong> Required for employers with 5+ staff</li>
              <li className="pl-1"><strong>Review:</strong> When circumstances change or after incidents</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Electrical hazards:</strong> Shock, burns, arc flash</li>
              <li className="pl-1"><strong>Work at height:</strong> Cable trays, distribution boards</li>
              <li className="pl-1"><strong>Manual handling:</strong> Cable drums, transformers</li>
              <li className="pl-1"><strong>Site conditions:</strong> Confined spaces, occupied premises</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply the HSE five steps to risk assessment systematically",
              "Use likelihood and severity scales to calculate risk scores",
              "Interpret 3×3 and 5×5 risk matrices correctly",
              "Record significant findings to meet legal requirements",
              "Identify triggers for risk assessment review and updates",
              "Apply risk assessment principles to building services scenarios"
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

        {/* Section 1: HSE Five Steps */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            HSE Five Steps to Risk Assessment
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Health and Safety Executive (HSE) provides a straightforward five-step process for
              conducting risk assessments. This systematic approach ensures all significant hazards
              are identified and properly controlled in building services installations.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5 border-l-4 border-elec-yellow">
                <p className="text-sm font-medium text-elec-yellow mb-2">Step 1: Identify the Hazards</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Walk around the workplace and observe activities</li>
                  <li className="pl-1">Consult employees who perform the tasks daily</li>
                  <li className="pl-1">Review manufacturer instructions and data sheets</li>
                  <li className="pl-1">Check accident and ill-health records</li>
                  <li className="pl-1">Consider non-routine operations and maintenance</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border-l-4 border-blue-400">
                <p className="text-sm font-medium text-blue-400 mb-2">Step 2: Decide Who Might Be Harmed and How</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Workers directly involved in the task</li>
                  <li className="pl-1">Other workers nearby (cleaners, maintenance)</li>
                  <li className="pl-1">Contractors and visitors on site</li>
                  <li className="pl-1">Members of the public</li>
                  <li className="pl-1">Vulnerable groups: young workers, pregnant women, disabled persons</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border-l-4 border-green-400">
                <p className="text-sm font-medium text-green-400 mb-2">Step 3: Evaluate Risks and Decide on Precautions</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Consider existing control measures already in place</li>
                  <li className="pl-1">Calculate risk score (likelihood × severity)</li>
                  <li className="pl-1">Compare against industry standards and legal requirements</li>
                  <li className="pl-1">Apply hierarchy of control: eliminate, substitute, engineer, admin, PPE</li>
                  <li className="pl-1">Reduce risks to ALARP (As Low As Reasonably Practicable)</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border-l-4 border-purple-400">
                <p className="text-sm font-medium text-purple-400 mb-2">Step 4: Record Your Significant Findings</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Document hazards and who is at risk</li>
                  <li className="pl-1">List existing and additional control measures</li>
                  <li className="pl-1">Assign responsibilities and target dates for actions</li>
                  <li className="pl-1">Legal requirement if you have 5 or more employees</li>
                  <li className="pl-1">Good practice regardless of size</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border-l-4 border-orange-400">
                <p className="text-sm font-medium text-orange-400 mb-2">Step 5: Review and Update</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Set a review date (typically annually for low-risk activities)</li>
                  <li className="pl-1">Review immediately after accidents or near-misses</li>
                  <li className="pl-1">Update when work processes or equipment change</li>
                  <li className="pl-1">Consider new information about hazards</li>
                  <li className="pl-1">Verify control measures remain effective</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Risk assessment is an ongoing process, not a one-time paperwork exercise. It should be 'suitable and sufficient' - proportionate to the level of risk.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Likelihood and Severity Scales */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Likelihood and Severity Scales
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Risk assessment requires quantifying both how likely harm is to occur and how severe
              the consequences would be. Standard scales allow consistent evaluation across different
              hazards and enable prioritisation of control measures.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">5-Point Likelihood Scale</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Score</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Rating</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-mono">1</td>
                      <td className="border border-white/10 px-3 py-2">Rare</td>
                      <td className="border border-white/10 px-3 py-2">Unlikely to ever occur</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-mono">2</td>
                      <td className="border border-white/10 px-3 py-2">Unlikely</td>
                      <td className="border border-white/10 px-3 py-2">Could occur but not expected</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-mono">3</td>
                      <td className="border border-white/10 px-3 py-2">Possible</td>
                      <td className="border border-white/10 px-3 py-2">Might occur occasionally</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-mono">4</td>
                      <td className="border border-white/10 px-3 py-2">Likely</td>
                      <td className="border border-white/10 px-3 py-2">Probably will occur</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-mono">5</td>
                      <td className="border border-white/10 px-3 py-2">Almost Certain</td>
                      <td className="border border-white/10 px-3 py-2">Expected to occur frequently</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">5-Point Severity Scale</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Score</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Rating</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-mono">1</td>
                      <td className="border border-white/10 px-3 py-2">Negligible</td>
                      <td className="border border-white/10 px-3 py-2">Minor injury, no lost time</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-mono">2</td>
                      <td className="border border-white/10 px-3 py-2">Minor</td>
                      <td className="border border-white/10 px-3 py-2">First aid injury, short absence</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-mono">3</td>
                      <td className="border border-white/10 px-3 py-2">Moderate</td>
                      <td className="border border-white/10 px-3 py-2">Medical treatment, extended absence</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-mono">4</td>
                      <td className="border border-white/10 px-3 py-2">Major</td>
                      <td className="border border-white/10 px-3 py-2">Serious injury, long-term disability</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-mono">5</td>
                      <td className="border border-white/10 px-3 py-2">Catastrophic</td>
                      <td className="border border-white/10 px-3 py-2">Fatality or multiple serious injuries</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Factors Affecting Likelihood</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Frequency of exposure to hazard</li>
                  <li className="pl-1">Duration of exposure</li>
                  <li className="pl-1">Existing control measures</li>
                  <li className="pl-1">Competence of workers</li>
                  <li className="pl-1">Condition of equipment</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Factors Affecting Severity</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Nature of the hazard (voltage, height, weight)</li>
                  <li className="pl-1">Number of people potentially affected</li>
                  <li className="pl-1">Vulnerability of those at risk</li>
                  <li className="pl-1">PPE and emergency response available</li>
                  <li className="pl-1">Environmental conditions</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key principle:</strong> Always consider severity 'with existing controls in place' but likelihood 'if controls fail or are absent' to identify residual risk.
            </p>
          </div>
        </section>

        {/* Section 3: Risk Matrices */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Risk Matrices (3×3 and 5×5)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Risk matrices provide a visual tool for combining likelihood and severity scores
              to determine overall risk levels. The resulting risk score guides the priority
              and type of control measures required.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">3×3 Risk Matrix (Simple)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse text-center">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2"></th>
                      <th className="border border-white/10 px-3 py-2">Low Severity (1)</th>
                      <th className="border border-white/10 px-3 py-2">Medium Severity (2)</th>
                      <th className="border border-white/10 px-3 py-2">High Severity (3)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 bg-white/5 font-medium">High Likelihood (3)</td>
                      <td className="border border-white/10 px-3 py-2 bg-yellow-500/30">3 - Medium</td>
                      <td className="border border-white/10 px-3 py-2 bg-orange-500/30">6 - High</td>
                      <td className="border border-white/10 px-3 py-2 bg-red-500/30">9 - Very High</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 bg-white/5 font-medium">Medium Likelihood (2)</td>
                      <td className="border border-white/10 px-3 py-2 bg-green-500/30">2 - Low</td>
                      <td className="border border-white/10 px-3 py-2 bg-yellow-500/30">4 - Medium</td>
                      <td className="border border-white/10 px-3 py-2 bg-orange-500/30">6 - High</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 bg-white/5 font-medium">Low Likelihood (1)</td>
                      <td className="border border-white/10 px-3 py-2 bg-green-500/30">1 - Low</td>
                      <td className="border border-white/10 px-3 py-2 bg-green-500/30">2 - Low</td>
                      <td className="border border-white/10 px-3 py-2 bg-yellow-500/30">3 - Medium</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-white/60 mt-2">3×3 matrix: scores 1-2 = Low, 3-4 = Medium, 6 = High, 9 = Very High</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">5×5 Risk Matrix (Detailed)</p>
              <div className="overflow-x-auto">
                <table className="text-xs text-white w-full border-collapse text-center">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-2 py-1.5"></th>
                      <th className="border border-white/10 px-2 py-1.5">Negligible (1)</th>
                      <th className="border border-white/10 px-2 py-1.5">Minor (2)</th>
                      <th className="border border-white/10 px-2 py-1.5">Moderate (3)</th>
                      <th className="border border-white/10 px-2 py-1.5">Major (4)</th>
                      <th className="border border-white/10 px-2 py-1.5">Catastrophic (5)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-2 py-1.5 bg-white/5 font-medium">Almost Certain (5)</td>
                      <td className="border border-white/10 px-2 py-1.5 bg-yellow-500/30">5</td>
                      <td className="border border-white/10 px-2 py-1.5 bg-orange-500/30">10</td>
                      <td className="border border-white/10 px-2 py-1.5 bg-orange-500/30">15</td>
                      <td className="border border-white/10 px-2 py-1.5 bg-red-500/30">20</td>
                      <td className="border border-white/10 px-2 py-1.5 bg-red-500/40">25</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-1.5 bg-white/5 font-medium">Likely (4)</td>
                      <td className="border border-white/10 px-2 py-1.5 bg-green-500/30">4</td>
                      <td className="border border-white/10 px-2 py-1.5 bg-yellow-500/30">8</td>
                      <td className="border border-white/10 px-2 py-1.5 bg-orange-500/30">12</td>
                      <td className="border border-white/10 px-2 py-1.5 bg-orange-500/30">16</td>
                      <td className="border border-white/10 px-2 py-1.5 bg-red-500/30">20</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-1.5 bg-white/5 font-medium">Possible (3)</td>
                      <td className="border border-white/10 px-2 py-1.5 bg-green-500/30">3</td>
                      <td className="border border-white/10 px-2 py-1.5 bg-yellow-500/30">6</td>
                      <td className="border border-white/10 px-2 py-1.5 bg-yellow-500/30">9</td>
                      <td className="border border-white/10 px-2 py-1.5 bg-orange-500/30">12</td>
                      <td className="border border-white/10 px-2 py-1.5 bg-orange-500/30">15</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-1.5 bg-white/5 font-medium">Unlikely (2)</td>
                      <td className="border border-white/10 px-2 py-1.5 bg-green-500/30">2</td>
                      <td className="border border-white/10 px-2 py-1.5 bg-green-500/30">4</td>
                      <td className="border border-white/10 px-2 py-1.1.5 bg-yellow-500/30">6</td>
                      <td className="border border-white/10 px-2 py-1.5 bg-yellow-500/30">8</td>
                      <td className="border border-white/10 px-2 py-1.5 bg-orange-500/30">10</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-1.5 bg-white/5 font-medium">Rare (1)</td>
                      <td className="border border-white/10 px-2 py-1.5 bg-green-500/30">1</td>
                      <td className="border border-white/10 px-2 py-1.5 bg-green-500/30">2</td>
                      <td className="border border-white/10 px-2 py-1.5 bg-green-500/30">3</td>
                      <td className="border border-white/10 px-2 py-1.5 bg-green-500/30">4</td>
                      <td className="border border-white/10 px-2 py-1.5 bg-yellow-500/30">5</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Risk Level Actions (5×5 Matrix)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Score</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Level</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Required Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 bg-green-500/20">1-4</td>
                      <td className="border border-white/10 px-3 py-2">Low</td>
                      <td className="border border-white/10 px-3 py-2">Monitor and maintain existing controls</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 bg-yellow-500/20">5-9</td>
                      <td className="border border-white/10 px-3 py-2">Medium</td>
                      <td className="border border-white/10 px-3 py-2">Additional controls required; implement reasonably practicable measures</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 bg-orange-500/20">10-16</td>
                      <td className="border border-white/10 px-3 py-2">High</td>
                      <td className="border border-white/10 px-3 py-2">Urgent action required; work should not proceed until risk reduced</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 bg-red-500/20">17-25</td>
                      <td className="border border-white/10 px-3 py-2">Very High</td>
                      <td className="border border-white/10 px-3 py-2">Intolerable; stop work immediately; eliminate hazard or find alternative method</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical tip:</strong> 5×5 matrices offer finer granularity for complex operations. 3×3 matrices are simpler and often sufficient for routine work with clear hazards.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Recording and Review */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Recording Significant Findings and Review Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Management of Health and Safety at Work Regulations 1999 require employers with
              five or more employees to record the significant findings of their risk assessments.
              Good record-keeping is also essential evidence of due diligence.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">What to Record</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Activity/task:</strong> Clear description of the work being assessed</li>
                <li className="pl-1"><strong>Hazards identified:</strong> All significant hazards that could cause harm</li>
                <li className="pl-1"><strong>Who is at risk:</strong> Specific groups including vulnerable persons</li>
                <li className="pl-1"><strong>Existing controls:</strong> Measures already in place</li>
                <li className="pl-1"><strong>Risk rating:</strong> Likelihood, severity, and overall score</li>
                <li className="pl-1"><strong>Additional controls:</strong> Further measures to reduce risk</li>
                <li className="pl-1"><strong>Action owner:</strong> Person responsible for implementing controls</li>
                <li className="pl-1"><strong>Target date:</strong> When actions will be completed</li>
                <li className="pl-1"><strong>Review date:</strong> When assessment will be reviewed</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Example: Cable Installation Risk Assessment Extract</p>
              <div className="overflow-x-auto">
                <table className="text-xs text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/10">
                      <th className="border border-white/10 px-2 py-1.5 text-left">Hazard</th>
                      <th className="border border-white/10 px-2 py-1.5 text-left">Who at Risk</th>
                      <th className="border border-white/10 px-2 py-1.5 text-left">L</th>
                      <th className="border border-white/10 px-2 py-1.5 text-left">S</th>
                      <th className="border border-white/10 px-2 py-1.5 text-left">R</th>
                      <th className="border border-white/10 px-2 py-1.5 text-left">Controls</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-2 py-1.5">Electric shock (isolation failure)</td>
                      <td className="border border-white/10 px-2 py-1.5">Electricians</td>
                      <td className="border border-white/10 px-2 py-1.5">2</td>
                      <td className="border border-white/10 px-2 py-1.5">5</td>
                      <td className="border border-white/10 px-2 py-1.5 bg-orange-500/30">10</td>
                      <td className="border border-white/10 px-2 py-1.5">Safe isolation, GS38 probes, lock-off</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-1.5">Manual handling (cable drums)</td>
                      <td className="border border-white/10 px-2 py-1.5">All workers</td>
                      <td className="border border-white/10 px-2 py-1.5">4</td>
                      <td className="border border-white/10 px-2 py-1.5">3</td>
                      <td className="border border-white/10 px-2 py-1.5 bg-orange-500/30">12</td>
                      <td className="border border-white/10 px-2 py-1.5">Mechanical aids, team lifts, training</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-1.5">Work at height (cable trays)</td>
                      <td className="border border-white/10 px-2 py-1.5">Electricians</td>
                      <td className="border border-white/10 px-2 py-1.5">3</td>
                      <td className="border border-white/10 px-2 py-1.5">4</td>
                      <td className="border border-white/10 px-2 py-1.5 bg-orange-500/30">12</td>
                      <td className="border border-white/10 px-2 py-1.5">MEWP, scaffolding, harness systems</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-1.5">Trips (trailing cables)</td>
                      <td className="border border-white/10 px-2 py-1.5">All building users</td>
                      <td className="border border-white/10 px-2 py-1.5">3</td>
                      <td className="border border-white/10 px-2 py-1.5">2</td>
                      <td className="border border-white/10 px-2 py-1.5 bg-yellow-500/30">6</td>
                      <td className="border border-white/10 px-2 py-1.5">Cable covers, barriers, signage</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-white/60 mt-2">L = Likelihood, S = Severity, R = Risk Score (L×S)</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Triggers for Review</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="text-xs font-medium text-red-400 mb-2">Immediate Review Required</p>
                  <ul className="text-xs text-white space-y-1 list-disc list-outside ml-4">
                    <li>Accident or near-miss incident</li>
                    <li>Significant change in process</li>
                    <li>New equipment introduced</li>
                    <li>New hazard information available</li>
                    <li>Regulatory changes</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-xs font-medium text-green-400 mb-2">Periodic Review</p>
                  <ul className="text-xs text-white space-y-1 list-disc list-outside ml-4">
                    <li>At least annually for most activities</li>
                    <li>More frequently for high-risk work</li>
                    <li>Before contract renewals</li>
                    <li>Following staff changes</li>
                    <li>As part of safety audits</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Legal note:</strong> Risk assessments must be readily accessible to those who need them - workers, safety representatives, and enforcement officers.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Building Services Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Building Services Risk Assessment Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Consumer Unit Replacement</h3>
              <p className="text-sm text-white mb-3">
                <strong>Task:</strong> Replace existing consumer unit in occupied domestic property
              </p>
              <div className="bg-black/30 p-3 rounded text-sm text-white/90 space-y-2">
                <p><strong>Key Hazards Identified:</strong></p>
                <ul className="list-disc list-inside ml-2 space-y-1">
                  <li>Electric shock during isolation verification (L:2, S:5, R:10 - High)</li>
                  <li>Arc flash if live working required (L:2, S:4, R:8 - Medium)</li>
                  <li>Manual handling of unit and cables (L:3, S:2, R:6 - Medium)</li>
                  <li>Dust inhalation from drilling (L:4, S:2, R:8 - Medium)</li>
                </ul>
                <p className="mt-3"><strong>Control Measures:</strong></p>
                <ul className="list-disc list-inside ml-2 space-y-1">
                  <li>Safe isolation procedure with GS38 compliant test equipment</li>
                  <li>Lock-off devices and warning labels</li>
                  <li>RPE for drilling operations</li>
                  <li>Inform occupants of isolation periods</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Commercial Lighting Installation</h3>
              <p className="text-sm text-white mb-3">
                <strong>Task:</strong> Install new LED lighting system in occupied office building
              </p>
              <div className="bg-black/30 p-3 rounded text-sm text-white/90 space-y-2">
                <p><strong>Key Hazards Identified:</strong></p>
                <ul className="list-disc list-inside ml-2 space-y-1">
                  <li>Falls from height using access equipment (L:3, S:4, R:12 - High)</li>
                  <li>Electric shock from existing circuits (L:2, S:5, R:10 - High)</li>
                  <li>Dropped objects onto office workers (L:3, S:3, R:9 - Medium)</li>
                  <li>Eye strain from temporary lighting (L:4, S:1, R:4 - Low)</li>
                </ul>
                <p className="mt-3"><strong>Control Measures:</strong></p>
                <ul className="list-disc list-inside ml-2 space-y-1">
                  <li>MEWP or scaffolding for sustained work at height</li>
                  <li>Exclusion zones below work areas</li>
                  <li>Out-of-hours working where possible</li>
                  <li>Phased isolation to maintain emergency lighting</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Distribution Board Testing</h3>
              <p className="text-sm text-white mb-3">
                <strong>Task:</strong> Periodic inspection and testing of three-phase distribution board
              </p>
              <div className="bg-black/30 p-3 rounded text-sm text-white/90 space-y-2">
                <p><strong>Key Hazards Identified:</strong></p>
                <ul className="list-disc list-inside ml-2 space-y-1">
                  <li>Contact with 400V live parts (L:2, S:5, R:10 - High)</li>
                  <li>Arc flash during panel removal (L:2, S:5, R:10 - High)</li>
                  <li>Disruption to critical circuits (L:3, S:3, R:9 - Medium)</li>
                  <li>Working in cramped switch room (L:3, S:2, R:6 - Medium)</li>
                </ul>
                <p className="mt-3"><strong>Control Measures:</strong></p>
                <ul className="list-disc list-inside ml-2 space-y-1">
                  <li>Partial isolation where full isolation not possible</li>
                  <li>Arc-rated PPE (face shield, gloves, FR clothing)</li>
                  <li>Barrier and insulating matting</li>
                  <li>Coordination with building management</li>
                </ul>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Risk Assessment Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Have all significant hazards been identified?</li>
                <li className="pl-1">Have all people who might be affected been considered?</li>
                <li className="pl-1">Are existing controls documented and effective?</li>
                <li className="pl-1">Has the risk been reduced to ALARP?</li>
                <li className="pl-1">Are responsibilities and timescales assigned?</li>
                <li className="pl-1">Is a review date set and communicated?</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Hierarchy of Control (ERICPD)</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Eliminate:</strong> Remove the hazard entirely (e.g., design out work at height)</li>
                <li className="pl-1"><strong>Reduce:</strong> Substitute with less hazardous alternative</li>
                <li className="pl-1"><strong>Isolate:</strong> Engineering controls to separate people from hazard</li>
                <li className="pl-1"><strong>Control:</strong> Safe systems of work, procedures</li>
                <li className="pl-1"><strong>PPE:</strong> Personal protective equipment as last resort</li>
                <li className="pl-1"><strong>Discipline:</strong> Training, supervision, enforcement</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Generic only:</strong> Using generic assessments without site-specific additions</li>
                <li className="pl-1"><strong>Never reviewed:</strong> Treating risk assessment as one-time paperwork</li>
                <li className="pl-1"><strong>PPE first:</strong> Jumping straight to PPE without considering higher controls</li>
                <li className="pl-1"><strong>Missing groups:</strong> Forgetting contractors, visitors, or public</li>
                <li className="pl-1"><strong>No actions:</strong> Identifying risks but not implementing controls</li>
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
                <p className="font-medium text-white mb-1">HSE Five Steps</p>
                <ul className="space-y-0.5">
                  <li>1. Identify the hazards</li>
                  <li>2. Decide who might be harmed</li>
                  <li>3. Evaluate risks, decide on precautions</li>
                  <li>4. Record significant findings</li>
                  <li>5. Review and update</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Risk Matrix (5×5)</p>
                <ul className="space-y-0.5">
                  <li>1-4: Low - Monitor existing controls</li>
                  <li>5-9: Medium - Additional controls needed</li>
                  <li>10-16: High - Urgent action required</li>
                  <li>17-25: Very High - Stop work immediately</li>
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
            <Link to="../h-n-c-module1-section2-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Types of Hazards
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module1-section2-3">
              Next: Control Measures
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule1Section2_2;
