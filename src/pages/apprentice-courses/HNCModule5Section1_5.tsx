import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Risk Management - HNC Module 5 Section 1.5";
const DESCRIPTION = "Master risk management for building services projects: risk identification, qualitative and quantitative assessment, mitigation strategies, contingency planning, and MEP-specific project risks.";

const quickCheckQuestions = [
  {
    id: "risk-register-def",
    question: "What is the primary purpose of a risk register in project management?",
    options: ["To record accidents that have occurred", "To document identified risks, their assessment, and planned responses", "To list all project team members", "To track daily progress on site"],
    correctIndex: 1,
    explanation: "A risk register is a living document that records all identified risks, their probability and impact assessment, assigned owners, and planned mitigation or response actions throughout the project lifecycle."
  },
  {
    id: "qualitative-vs-quantitative",
    question: "What distinguishes qualitative from quantitative risk analysis?",
    options: ["Qualitative uses numbers, quantitative uses descriptions", "Qualitative uses subjective ratings, quantitative uses numerical data", "They are the same thing", "Qualitative is for large projects only"],
    correctIndex: 1,
    explanation: "Qualitative analysis uses subjective ratings (High/Medium/Low) to prioritise risks quickly, while quantitative analysis uses numerical data and statistical techniques to calculate precise probability and cost impact values."
  },
  {
    id: "mitigation-transfer",
    question: "Risk transfer as a mitigation strategy typically involves:",
    options: ["Ignoring the risk completely", "Shifting risk to another party through insurance or contracts", "Accepting the risk without action", "Eliminating the source of the risk"],
    correctIndex: 1,
    explanation: "Risk transfer involves shifting the financial or operational impact of a risk to another party, commonly through insurance policies, performance bonds, or contractual clauses with subcontractors."
  },
  {
    id: "contingency-allowance",
    question: "What is a typical contingency allowance for a complex MEP project?",
    options: ["1-2%", "5-10%", "10-15%", "25-30%"],
    correctIndex: 2,
    explanation: "Complex MEP projects typically include 10-15% contingency allowance to cover unforeseen risks. Simpler projects may use 5-10%, while highly uncertain projects may require up to 20%."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which document should be updated throughout the project lifecycle as new risks emerge?",
    options: [
      "The original tender documents",
      "The risk register",
      "The building regulations approval",
      "The client brief"
    ],
    correctAnswer: 1,
    explanation: "The risk register is a living document that must be regularly reviewed and updated as new risks are identified, existing risks change, or risks are closed out during the project."
  },
  {
    id: 2,
    question: "In a probability/impact matrix, where would you place a risk with 'High' probability and 'High' impact?",
    options: ["Green zone - accept", "Amber zone - monitor", "Red zone - requires immediate action", "Outside the matrix"],
    correctAnswer: 2,
    explanation: "High probability and high impact risks fall in the red zone of the matrix, indicating they require immediate mitigation action and close monitoring throughout the project."
  },
  {
    id: 3,
    question: "What is the Expected Monetary Value (EMV) of a risk with 30% probability and £50,000 potential impact?",
    options: ["£15,000", "£50,000", "£35,000", "£150,000"],
    correctAnswer: 0,
    explanation: "EMV = Probability × Impact = 0.30 × £50,000 = £15,000. This value represents the weighted average cost of the risk and helps prioritise risk response investment."
  },
  {
    id: 4,
    question: "Which risk response strategy involves redesigning a system to eliminate the risk source entirely?",
    options: ["Avoid", "Transfer", "Mitigate", "Accept"],
    correctAnswer: 0,
    explanation: "Risk avoidance involves changing the project plan to eliminate the risk or its impact entirely, such as redesigning a system to remove the hazardous element."
  },
  {
    id: 5,
    question: "Late delivery of specialist MEP equipment is an example of which risk category?",
    options: ["Technical risk", "Commercial risk", "Programme risk", "Safety risk"],
    correctAnswer: 2,
    explanation: "Late delivery of equipment directly impacts the project schedule, making it a programme risk. It may also have commercial implications, but the primary effect is on timing."
  },
  {
    id: 6,
    question: "What percentage contingency is typically appropriate for a straightforward electrical installation with well-defined scope?",
    options: ["0%", "5-7%", "15-20%", "25%+"],
    correctAnswer: 1,
    explanation: "Well-defined, straightforward projects typically use 5-7% contingency. Higher percentages are reserved for complex, uncertain, or refurbishment projects where unknowns are more likely."
  },
  {
    id: 7,
    question: "A Monte Carlo simulation is used in risk management to:",
    options: [
      "Calculate simple probability values",
      "Model multiple scenarios and their combined probability distributions",
      "Identify new risks",
      "Assign risk owners"
    ],
    correctAnswer: 1,
    explanation: "Monte Carlo simulation runs thousands of project scenarios with varying risk outcomes to produce probability distributions for cost and schedule, giving confidence levels for project targets."
  },
  {
    id: 8,
    question: "Which MEP-specific risk is most commonly encountered in refurbishment projects?",
    options: [
      "Weather delays",
      "Unknown existing conditions behind walls and ceilings",
      "Design errors",
      "Labour shortages"
    ],
    correctAnswer: 1,
    explanation: "Refurbishment projects frequently encounter unknown existing conditions - asbestos, outdated wiring, structural constraints - that only become apparent once walls and ceilings are opened up."
  },
  {
    id: 9,
    question: "What is a 'risk owner' responsible for?",
    options: [
      "Paying for all risk-related costs",
      "Monitoring the risk and implementing agreed response actions",
      "Signing off the risk register",
      "Insuring all project risks"
    ],
    correctAnswer: 1,
    explanation: "A risk owner is the person responsible for monitoring their assigned risk, tracking its status, and ensuring that planned mitigation or response actions are implemented effectively."
  },
  {
    id: 10,
    question: "What distinguishes a contingency allowance from a management reserve?",
    options: [
      "Contingency is for known risks; management reserve is for unknown unknowns",
      "They are identical terms",
      "Contingency is larger than management reserve",
      "Management reserve is for identified risks only"
    ],
    correctAnswer: 0,
    explanation: "Contingency covers identified risks that have been assessed and planned for. Management reserve is held separately for truly unexpected 'unknown unknowns' and requires senior approval to access."
  }
];

const faqs = [
  {
    question: "How often should the risk register be reviewed on a typical MEP project?",
    answer: "For active projects, risk registers should be reviewed at least fortnightly, ideally weekly during critical phases. Review frequency depends on project complexity and pace - fast-track projects may need daily review. Each review should assess whether existing risks have changed, new risks have emerged, and whether mitigation actions are effective."
  },
  {
    question: "What's the difference between inherent and residual risk?",
    answer: "Inherent risk is the level of risk before any controls or mitigations are applied - the 'raw' risk exposure. Residual risk is what remains after mitigation measures are in place. For example, working at height has high inherent risk, but with scaffolding, harnesses, and training, the residual risk is reduced to acceptable levels. Risk registers should track both values."
  },
  {
    question: "How do I determine the right contingency percentage for an MEP project?",
    answer: "Consider: (1) Project complexity - complex systems need higher contingency, (2) Scope definition - poorly defined scope needs more, (3) Project type - refurbishment typically 12-15%, new build 8-10%, (4) Contract type - lump sum needs higher than cost-plus, (5) Client relationship - new clients with unknown expectations need more. Sum individual risk EMVs as a cross-check against your percentage."
  },
  {
    question: "Should all identified risks be mitigated?",
    answer: "No. Some risks are best accepted rather than mitigated when the cost of mitigation exceeds the Expected Monetary Value of the risk, or when the probability is very low. The four responses are: Avoid (eliminate the source), Transfer (insurance/contracts), Mitigate (reduce probability or impact), or Accept (acknowledge and monitor). Accept is valid for low-priority risks."
  },
  {
    question: "What are the most common MEP-specific project risks?",
    answer: "Key MEP risks include: (1) Coordination clashes between services in confined ceiling voids, (2) Long lead times for specialist equipment (switchgear, chillers, generators), (3) Unknown existing conditions in refurbishments, (4) Design changes during construction, (5) Labour availability for specialist trades, (6) Commissioning delays due to incomplete building fabric, (7) Power supply delays from DNO."
  },
  {
    question: "How does risk management integrate with project cost management?",
    answer: "Risk management directly feeds cost management through contingency allowances. Each identified risk should have an estimated cost impact. The sum of EMVs (probability × impact) for all risks provides a quantified contingency figure. This should be tracked against contingency drawdown as risks materialise or are closed. Effective risk management prevents budget overruns by anticipating costs before they occur."
  }
];

const HNCModule5Section1_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module5-section1">
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
            <span>Module 5.1.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Risk Management
          </h1>
          <p className="text-white/80">
            Risk identification, assessment, mitigation strategies and contingency planning for building services projects
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Risk register:</strong> Living document tracking all project risks</li>
              <li className="pl-1"><strong>Assessment types:</strong> Qualitative (H/M/L) and quantitative (EMV)</li>
              <li className="pl-1"><strong>Response strategies:</strong> Avoid, transfer, mitigate, or accept</li>
              <li className="pl-1"><strong>Contingency:</strong> 10-15% typical for complex MEP projects</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Coordination:</strong> Service clashes in ceiling voids</li>
              <li className="pl-1"><strong>Procurement:</strong> Long lead items (switchgear, chillers)</li>
              <li className="pl-1"><strong>Existing conditions:</strong> Hidden services, asbestos</li>
              <li className="pl-1"><strong>Commissioning:</strong> Dependent on building completion</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Develop and maintain a comprehensive risk register",
              "Apply probability/impact matrices for risk prioritisation",
              "Distinguish between qualitative and quantitative risk analysis",
              "Select appropriate risk response strategies",
              "Calculate contingency allowances using EMV techniques",
              "Identify and manage MEP-specific project risks"
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

        {/* Section 1: Risk Identification and the Risk Register */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Risk Identification and the Risk Register
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective risk management begins with systematic identification of potential threats and opportunities
              that could affect project objectives. For MEP projects, this requires input from designers,
              project managers, site supervisors, and specialist subcontractors.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Risk Identification Techniques:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Brainstorming workshops:</strong> Structured sessions with project team and stakeholders</li>
                <li className="pl-1"><strong>Checklist analysis:</strong> Review against standard MEP risk categories</li>
                <li className="pl-1"><strong>Lessons learned:</strong> Review of similar past projects and their issues</li>
                <li className="pl-1"><strong>Expert judgement:</strong> Input from experienced engineers and installers</li>
                <li className="pl-1"><strong>SWOT analysis:</strong> Identifying internal and external factors</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Risk Register Structure</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Field</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Risk ID</td>
                      <td className="border border-white/10 px-3 py-2">Unique identifier</td>
                      <td className="border border-white/10 px-3 py-2">R-MEP-012</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Risk Description</td>
                      <td className="border border-white/10 px-3 py-2">Clear statement of risk event</td>
                      <td className="border border-white/10 px-3 py-2">Switchgear delivery delayed beyond programme date</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Category</td>
                      <td className="border border-white/10 px-3 py-2">Risk type classification</td>
                      <td className="border border-white/10 px-3 py-2">Programme / Procurement</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Probability</td>
                      <td className="border border-white/10 px-3 py-2">Likelihood of occurrence</td>
                      <td className="border border-white/10 px-3 py-2">Medium (40%)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Impact</td>
                      <td className="border border-white/10 px-3 py-2">Consequence if risk occurs</td>
                      <td className="border border-white/10 px-3 py-2">High - 4 week delay, £25,000</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Risk Score</td>
                      <td className="border border-white/10 px-3 py-2">Combined rating</td>
                      <td className="border border-white/10 px-3 py-2">12 (Medium × High)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Response Strategy</td>
                      <td className="border border-white/10 px-3 py-2">Planned action</td>
                      <td className="border border-white/10 px-3 py-2">Mitigate - early order, alternative supplier</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Risk Owner</td>
                      <td className="border border-white/10 px-3 py-2">Responsible person</td>
                      <td className="border border-white/10 px-3 py-2">Procurement Manager</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Status</td>
                      <td className="border border-white/10 px-3 py-2">Current state</td>
                      <td className="border border-white/10 px-3 py-2">Open / Monitoring</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Review and update the risk register at every project meeting. A static risk register provides no value.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Risk Assessment - Qualitative and Quantitative */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Risk Assessment - Qualitative and Quantitative
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Once risks are identified, they must be assessed to determine priority for response. Two complementary
              approaches exist: qualitative assessment for rapid prioritisation and quantitative analysis for
              precise cost and schedule impact calculation.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Qualitative Analysis</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Uses subjective High/Medium/Low ratings</li>
                  <li className="pl-1">Quick to apply across all risks</li>
                  <li className="pl-1">Enables rapid prioritisation</li>
                  <li className="pl-1">Suitable for initial screening</li>
                  <li className="pl-1">Based on expert judgement</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Quantitative Analysis</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Uses numerical probability values</li>
                  <li className="pl-1">Calculates Expected Monetary Value (EMV)</li>
                  <li className="pl-1">Enables precise contingency calculation</li>
                  <li className="pl-1">Used for high-priority risks</li>
                  <li className="pl-1">Supports Monte Carlo simulation</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Probability/Impact Matrix (5×5)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse text-center">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-2 py-2"></th>
                      <th className="border border-white/10 px-2 py-2">Very Low<br/>(1)</th>
                      <th className="border border-white/10 px-2 py-2">Low<br/>(2)</th>
                      <th className="border border-white/10 px-2 py-2">Medium<br/>(3)</th>
                      <th className="border border-white/10 px-2 py-2">High<br/>(4)</th>
                      <th className="border border-white/10 px-2 py-2">Very High<br/>(5)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-2 py-2 bg-white/5 font-medium">Very High (5)</td>
                      <td className="border border-white/10 px-2 py-2 bg-yellow-500/30">5</td>
                      <td className="border border-white/10 px-2 py-2 bg-orange-500/30">10</td>
                      <td className="border border-white/10 px-2 py-2 bg-red-500/30">15</td>
                      <td className="border border-white/10 px-2 py-2 bg-red-500/50">20</td>
                      <td className="border border-white/10 px-2 py-2 bg-red-500/70">25</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-2 bg-white/5 font-medium">High (4)</td>
                      <td className="border border-white/10 px-2 py-2 bg-green-500/30">4</td>
                      <td className="border border-white/10 px-2 py-2 bg-yellow-500/30">8</td>
                      <td className="border border-white/10 px-2 py-2 bg-orange-500/30">12</td>
                      <td className="border border-white/10 px-2 py-2 bg-red-500/30">16</td>
                      <td className="border border-white/10 px-2 py-2 bg-red-500/50">20</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-2 bg-white/5 font-medium">Medium (3)</td>
                      <td className="border border-white/10 px-2 py-2 bg-green-500/30">3</td>
                      <td className="border border-white/10 px-2 py-2 bg-yellow-500/30">6</td>
                      <td className="border border-white/10 px-2 py-2 bg-yellow-500/30">9</td>
                      <td className="border border-white/10 px-2 py-2 bg-orange-500/30">12</td>
                      <td className="border border-white/10 px-2 py-2 bg-red-500/30">15</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-2 bg-white/5 font-medium">Low (2)</td>
                      <td className="border border-white/10 px-2 py-2 bg-green-500/30">2</td>
                      <td className="border border-white/10 px-2 py-2 bg-green-500/30">4</td>
                      <td className="border border-white/10 px-2 py-2 bg-yellow-500/30">6</td>
                      <td className="border border-white/10 px-2 py-2 bg-yellow-500/30">8</td>
                      <td className="border border-white/10 px-2 py-2 bg-orange-500/30">10</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-2 bg-white/5 font-medium">Very Low (1)</td>
                      <td className="border border-white/10 px-2 py-2 bg-green-500/30">1</td>
                      <td className="border border-white/10 px-2 py-2 bg-green-500/30">2</td>
                      <td className="border border-white/10 px-2 py-2 bg-green-500/30">3</td>
                      <td className="border border-white/10 px-2 py-2 bg-green-500/30">4</td>
                      <td className="border border-white/10 px-2 py-2 bg-yellow-500/30">5</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-2 bg-white/5 font-medium">PROBABILITY →</td>
                      <td colSpan={5} className="border border-white/10 px-2 py-2 text-left">IMPACT →</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-white/60 mt-2">Green (1-4): Accept/Monitor | Yellow (5-9): Mitigate | Orange (10-14): Action required | Red (15-25): Immediate action</p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Expected Monetary Value (EMV) Calculation</p>
              <p className="font-mono text-center text-lg mb-2">EMV = Probability × Impact (£)</p>
              <p className="text-xs text-white/70 text-center">Sum of all risk EMVs provides quantified contingency requirement</p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Application:</strong> Use qualitative analysis for all risks, then apply quantitative analysis to the top 10-15 highest-rated risks.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Risk Response Strategies */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Risk Response Strategies
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              For each significant risk, a response strategy must be selected. The four standard strategies
              for negative risks (threats) each have appropriate applications depending on the risk characteristics
              and project context.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Four Response Strategies</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Strategy</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">MEP Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium text-red-400">Avoid</td>
                      <td className="border border-white/10 px-3 py-2">Eliminate the risk by changing the plan</td>
                      <td className="border border-white/10 px-3 py-2">Redesign routing to avoid complex coordination area</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium text-blue-400">Transfer</td>
                      <td className="border border-white/10 px-3 py-2">Shift impact to a third party</td>
                      <td className="border border-white/10 px-3 py-2">Insurance, performance bonds, subcontract clauses</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium text-yellow-400">Mitigate</td>
                      <td className="border border-white/10 px-3 py-2">Reduce probability or impact</td>
                      <td className="border border-white/10 px-3 py-2">Early procurement of long-lead items</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium text-green-400">Accept</td>
                      <td className="border border-white/10 px-3 py-2">Acknowledge and prepare contingency</td>
                      <td className="border border-white/10 px-3 py-2">Minor coordination clashes resolved on site</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Risk Transfer Mechanisms in Construction</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Professional indemnity insurance:</strong> Covers design errors and omissions</li>
                <li className="pl-1"><strong>Contractor's all-risks insurance:</strong> Physical damage to works</li>
                <li className="pl-1"><strong>Performance bonds:</strong> Financial guarantee of completion</li>
                <li className="pl-1"><strong>Retention:</strong> Withheld funds as completion incentive</li>
                <li className="pl-1"><strong>Back-to-back subcontracts:</strong> Pass risk down supply chain</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Mitigation Actions for MEP Risks</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">BIM clash detection during design</li>
                  <li className="pl-1">Mock-ups for complex installations</li>
                  <li className="pl-1">Pre-qualification of subcontractors</li>
                  <li className="pl-1">Factory acceptance testing</li>
                  <li className="pl-1">Phased commissioning</li>
                  <li className="pl-1">Trained supervision on site</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">When to Accept Risk</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Low probability and low impact</li>
                  <li className="pl-1">Mitigation cost exceeds EMV</li>
                  <li className="pl-1">Risk outside project control</li>
                  <li className="pl-1">Contingency covers potential impact</li>
                  <li className="pl-1">Quick response possible if triggered</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Every response strategy has a cost. The cost of mitigation should not exceed the risk's EMV unless safety is involved.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Contingency Planning and MEP-Specific Risks */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Contingency Planning and MEP-Specific Risks
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Contingency allowances provide financial and schedule reserves to address risks that materialise
              during project delivery. For MEP projects, understanding common risk categories helps ensure
              contingencies are appropriately sized.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Contingency Calculation Approaches</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Method</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">When to Use</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Percentage of cost</td>
                      <td className="border border-white/10 px-3 py-2">Fixed % based on project type</td>
                      <td className="border border-white/10 px-3 py-2">Early estimates, simple projects</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Sum of EMVs</td>
                      <td className="border border-white/10 px-3 py-2">Total of all risk EMV values</td>
                      <td className="border border-white/10 px-3 py-2">Detailed risk analysis completed</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Monte Carlo</td>
                      <td className="border border-white/10 px-3 py-2">Statistical simulation</td>
                      <td className="border border-white/10 px-3 py-2">Large, complex projects</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Expert judgement</td>
                      <td className="border border-white/10 px-3 py-2">Based on similar project experience</td>
                      <td className="border border-white/10 px-3 py-2">Limited data available</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Contingency Allowances</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Project Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Contingency Range</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Risks</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">New build (well-defined)</td>
                      <td className="border border-white/10 px-3 py-2">5-8%</td>
                      <td className="border border-white/10 px-3 py-2">Coordination, procurement</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">New build (complex)</td>
                      <td className="border border-white/10 px-3 py-2">8-12%</td>
                      <td className="border border-white/10 px-3 py-2">Design changes, specialist systems</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Refurbishment</td>
                      <td className="border border-white/10 px-3 py-2">12-18%</td>
                      <td className="border border-white/10 px-3 py-2">Unknown conditions, asbestos</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Live environment</td>
                      <td className="border border-white/10 px-3 py-2">15-20%</td>
                      <td className="border border-white/10 px-3 py-2">Access restrictions, disruption</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common MEP-Specific Project Risks</p>
              <div className="grid sm:grid-cols-2 gap-4 mt-3">
                <div>
                  <p className="font-medium text-white mb-2">Technical Risks</p>
                  <ul className="text-sm text-white/80 space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">Coordination clashes in ceiling voids</li>
                    <li className="pl-1">Insufficient builders' work openings</li>
                    <li className="pl-1">Design changes during construction</li>
                    <li className="pl-1">Equipment performance below specification</li>
                    <li className="pl-1">Commissioning failures</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white mb-2">Programme Risks</p>
                  <ul className="text-sm text-white/80 space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">Long lead equipment delays</li>
                    <li className="pl-1">DNO/utility connection delays</li>
                    <li className="pl-1">Building fabric not ready for fit-out</li>
                    <li className="pl-1">Labour availability shortages</li>
                    <li className="pl-1">Weather impact on external works</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white mb-2">Commercial Risks</p>
                  <ul className="text-sm text-white/80 space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">Subcontractor insolvency</li>
                    <li className="pl-1">Material price escalation</li>
                    <li className="pl-1">Scope creep from client changes</li>
                    <li className="pl-1">Disputed variations</li>
                    <li className="pl-1">Late payment from main contractor</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white mb-2">Site Risks</p>
                  <ul className="text-sm text-white/80 space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">Asbestos discovery</li>
                    <li className="pl-1">Existing services not as surveyed</li>
                    <li className="pl-1">Access constraints</li>
                    <li className="pl-1">Security and theft</li>
                    <li className="pl-1">Damage by other trades</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Contingency management:</strong> Track drawdown against contingency throughout the project. Unspent contingency at completion indicates conservative risk assessment; frequent overruns indicate inadequate assessment.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: EMV Calculation for Risk Register</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Calculate contingency for three identified risks on a £500,000 MEP package.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Risk 1: Switchgear delay</p>
                <p>Probability: 25% | Impact: £40,000</p>
                <p>EMV = 0.25 × £40,000 = <strong>£10,000</strong></p>
                <p className="mt-2">Risk 2: Coordination redesign required</p>
                <p>Probability: 40% | Impact: £15,000</p>
                <p>EMV = 0.40 × £15,000 = <strong>£6,000</strong></p>
                <p className="mt-2">Risk 3: Asbestos discovery (refurb area)</p>
                <p>Probability: 20% | Impact: £25,000</p>
                <p>EMV = 0.20 × £25,000 = <strong>£5,000</strong></p>
                <p className="mt-2 text-green-400">Total risk-based contingency = £10,000 + £6,000 + £5,000 = <strong>£21,000 (4.2%)</strong></p>
                <p className="text-white/60 mt-1">Add management reserve for unknown unknowns: +3% = £15,000</p>
                <p className="text-green-400">Total contingency: £36,000 (7.2%)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Risk Response Selection</h3>
              <p className="text-sm text-white mb-2">
                <strong>Risk:</strong> Main LV switchboard has 16-week lead time; programme allows only 12 weeks.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Risk score: High probability × High impact = Red zone</p>
                <p className="mt-2">Response options considered:</p>
                <p className="text-red-400">Avoid: Change switchboard specification - Not viable, client requirement</p>
                <p className="text-blue-400">Transfer: Liquidated damages to supplier - Doesn't solve programme issue</p>
                <p className="text-yellow-400">Mitigate: Place order immediately with advance payment</p>
                <p className="text-green-400">Accept: Not appropriate for red-zone risk</p>
                <p className="mt-2 text-green-400">→ Selected: <strong>Mitigate</strong></p>
                <p>Action: Expedite design completion, place order week 1</p>
                <p>Mitigation cost: £2,000 advance payment fee</p>
                <p>Residual risk: 4-week buffer remains if minor delay</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Risk Register Entry</h3>
              <p className="text-sm text-white mb-2">
                <strong>Task:</strong> Complete a risk register entry for coordination clash risk.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90 space-y-1">
                <p><strong>ID:</strong> R-MEP-007</p>
                <p><strong>Risk:</strong> Services coordination clashes requiring rework in Level 2 plantroom</p>
                <p><strong>Category:</strong> Technical / Design</p>
                <p><strong>Cause:</strong> Compressed design programme, multiple design consultants</p>
                <p><strong>Impact:</strong> Abortive work, programme delay, additional costs</p>
                <p><strong>Probability:</strong> Medium (3) - 40%</p>
                <p><strong>Impact:</strong> High (4) - £20,000 / 2 weeks</p>
                <p><strong>Score:</strong> 12 (Orange - action required)</p>
                <p><strong>Response:</strong> Mitigate</p>
                <p><strong>Actions:</strong> Weekly BIM coordination meetings, 3D clash detection before installation</p>
                <p><strong>Owner:</strong> MEP Design Manager</p>
                <p><strong>EMV:</strong> £8,000</p>
                <p><strong>Status:</strong> Open - Monitoring</p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Risk Management Process Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Establish risk register at project inception</li>
                <li className="pl-1">Conduct initial risk identification workshop</li>
                <li className="pl-1">Assess all risks using probability/impact matrix</li>
                <li className="pl-1">Quantify high-priority risks (EMV calculation)</li>
                <li className="pl-1">Select response strategy for each significant risk</li>
                <li className="pl-1">Assign risk owners with clear responsibilities</li>
                <li className="pl-1">Calculate contingency from EMV sum plus management reserve</li>
                <li className="pl-1">Review and update register at every project meeting</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Risk score = Probability × Impact (1-25 scale)</li>
                <li className="pl-1">EMV = Probability % × Impact £</li>
                <li className="pl-1">Typical MEP contingency: <strong>10-15%</strong></li>
                <li className="pl-1">Refurbishment contingency: <strong>12-18%</strong></li>
                <li className="pl-1">Review frequency: <strong>Weekly to fortnightly</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Static risk register</strong> — Must be reviewed and updated regularly</li>
                <li className="pl-1"><strong>No risk owner</strong> — Unassigned risks are never managed</li>
                <li className="pl-1"><strong>Percentage-only contingency</strong> — Should be justified by risk analysis</li>
                <li className="pl-1"><strong>Ignoring residual risk</strong> — Mitigation rarely eliminates risk entirely</li>
                <li className="pl-1"><strong>No trigger monitoring</strong> — Early warning signs must be tracked</li>
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
                <p className="font-medium text-white mb-1">Risk Response Strategies</p>
                <ul className="space-y-0.5">
                  <li>Avoid - Eliminate by changing the plan</li>
                  <li>Transfer - Shift to third party (insurance)</li>
                  <li>Mitigate - Reduce probability or impact</li>
                  <li>Accept - Acknowledge and prepare contingency</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Risk Assessment</p>
                <ul className="space-y-0.5">
                  <li>Qualitative: H/M/L ratings for prioritisation</li>
                  <li>Quantitative: EMV = Probability × Impact</li>
                  <li>Red zone (15-25): Immediate action</li>
                  <li>Green zone (1-4): Accept and monitor</li>
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
            <Link to="../h-n-c-module5-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module5-section1-6">
              Next: Quality Management
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule5Section1_5;
