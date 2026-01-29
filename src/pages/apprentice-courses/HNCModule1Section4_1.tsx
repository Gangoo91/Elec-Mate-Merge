import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Duty of Care and Accountability - HNC Module 1 Section 4.1";
const DESCRIPTION = "Understand legal duties, negligence principles, corporate responsibility, directors' duties and Health and Safety Sentencing Guidelines for building services professionals.";

const quickCheckQuestions = [
  {
    id: "duty-of-care",
    question: "What is the legal basis for an employer's duty of care to employees?",
    options: [
      "It is only a moral obligation with no legal basis",
      "Common law and statutory requirements under HASAWA 1974",
      "It only applies to large companies with over 50 employees",
      "It is optional for employers who provide PPE"
    ],
    correctIndex: 1,
    explanation: "The duty of care arises from both common law (established through court cases) and statute law, primarily the Health and Safety at Work Act 1974. Section 2 places a general duty on employers to ensure, so far as is reasonably practicable, the health, safety and welfare of employees."
  },
  {
    id: "negligence-elements",
    question: "Which elements must be proven to establish negligence in a civil claim?",
    options: [
      "Only that an accident occurred at work",
      "Duty of care existed, it was breached, and harm resulted from the breach",
      "That the employer did not provide training",
      "That the employee was following instructions"
    ],
    correctIndex: 1,
    explanation: "Civil negligence requires proving three elements: (1) a duty of care existed, (2) that duty was breached, and (3) the breach caused the harm suffered. The claimant must prove all three on the balance of probabilities."
  },
  {
    id: "cdda-disqualification",
    question: "Under the Company Directors Disqualification Act, what is the maximum disqualification period for health and safety offences?",
    options: [
      "2 years",
      "5 years",
      "10 years",
      "15 years"
    ],
    correctIndex: 3,
    explanation: "Under the Company Directors Disqualification Act 1986, directors convicted of indictable health and safety offences can be disqualified from acting as a company director for up to 15 years. This is in addition to any fine or imprisonment."
  },
  {
    id: "sentencing-guidelines",
    question: "Under the Health and Safety Sentencing Guidelines, what is the maximum fine for a large organisation causing death through gross negligence?",
    options: [
      "£500,000",
      "£1 million",
      "£10 million",
      "Unlimited"
    ],
    correctIndex: 3,
    explanation: "Since the 2016 Sentencing Guidelines, there is no upper limit on fines. Large organisations have faced fines exceeding £20 million for fatalities. Fines are calculated based on culpability, harm, and the organisation's turnover."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Section 7 of HASAWA 1974 places duties on which persons?",
    options: [
      "Only employers and directors",
      "Employees while at work",
      "Health and safety inspectors only",
      "Insurance companies"
    ],
    correctAnswer: 1,
    explanation: "Section 7 of HASAWA 1974 places duties on employees to take reasonable care for their own health and safety and that of others affected by their acts or omissions, and to cooperate with their employer on health and safety matters."
  },
  {
    id: 2,
    question: "What does 'so far as is reasonably practicable' (SFAIRP) mean in health and safety law?",
    options: [
      "All risks must be eliminated regardless of cost",
      "Risk reduction measures are required unless grossly disproportionate to the risk",
      "Only measures that cost nothing need be implemented",
      "Employers can decide what they consider practical"
    ],
    correctAnswer: 1,
    explanation: "SFAIRP means that the cost, time, and effort of risk reduction must be weighed against the risk. If the cost is grossly disproportionate to the risk reduction achieved, the measure may not be required. However, the balance favours safety - significant costs are acceptable for high risks."
  },
  {
    id: 3,
    question: "Under Section 37 of HASAWA 1974, when can individual directors be prosecuted?",
    options: [
      "Never - only companies can be prosecuted",
      "When an offence is committed with their consent, connivance, or through their neglect",
      "Only if they are directly involved in the accident",
      "Only if they hold a health and safety qualification"
    ],
    correctAnswer: 1,
    explanation: "Section 37 allows prosecution of directors, managers, or similar officers if a corporate offence was committed with their consent or connivance, or was attributable to their neglect. This personal liability cannot be transferred or insured against."
  },
  {
    id: 4,
    question: "What is the standard of proof required in criminal health and safety prosecutions?",
    options: [
      "Balance of probabilities",
      "Beyond reasonable doubt",
      "Reasonable suspicion",
      "Absolute certainty"
    ],
    correctAnswer: 1,
    explanation: "Criminal prosecutions require proof 'beyond reasonable doubt' - the highest standard. The prosecution must prove the defendant's guilt to a criminal standard. Civil claims use the lower 'balance of probabilities' standard."
  },
  {
    id: 5,
    question: "The Corporate Manslaughter and Corporate Homicide Act 2007 applies when death is caused by:",
    options: [
      "Any workplace accident",
      "A gross breach of duty of care by senior management",
      "Failure to provide PPE",
      "Any breach of HASAWA"
    ],
    correctAnswer: 1,
    explanation: "Corporate manslaughter applies when the way an organisation's activities are managed or organised by senior management causes a death and amounts to a gross breach of a duty of care. It targets the way senior management run the organisation."
  },
  {
    id: 6,
    question: "What is the relationship between civil and criminal proceedings following a workplace accident?",
    options: [
      "Only one type of proceeding can occur",
      "Criminal must conclude before civil can begin",
      "Both civil and criminal proceedings can run independently",
      "Civil proceedings always take priority"
    ],
    correctAnswer: 2,
    explanation: "Civil and criminal proceedings are separate and can run concurrently. A criminal conviction does not automatically mean civil liability (though it is strong evidence). Equally, acquittal does not prevent civil claims, which have a lower burden of proof."
  },
  {
    id: 7,
    question: "Under the Sentencing Guidelines, which factor would INCREASE culpability for a health and safety offence?",
    options: [
      "The offender cooperated with the investigation",
      "Prior warnings from regulators about the risk that caused harm",
      "Immediate remedial action was taken after the incident",
      "The offender reported the incident promptly"
    ],
    correctAnswer: 1,
    explanation: "Prior regulatory warnings about the specific risk that caused harm significantly increases culpability. It indicates the organisation knew of the risk and failed to act. Cooperation, remedial action, and prompt reporting are mitigating factors."
  },
  {
    id: 8,
    question: "What is 'vicarious liability' in the context of workplace safety?",
    options: [
      "Liability only for actions authorised by management",
      "Employer liability for the negligent acts of employees committed in the course of employment",
      "Liability for work done by contractors only",
      "Personal liability of individual workers"
    ],
    correctAnswer: 1,
    explanation: "Vicarious liability makes employers responsible for negligent acts of their employees committed during the course of employment. The employee may also be personally liable, but the employer is liable even if they were unaware of the employee's actions."
  },
  {
    id: 9,
    question: "A building services engineer specifies electrical equipment they know is unsuitable for the environment. Who may be liable?",
    options: [
      "Only the installing contractor",
      "Only the client who approved it",
      "The engineer personally, their employer, and potentially the client",
      "No one, as errors in design are not criminal offences"
    ],
    correctAnswer: 2,
    explanation: "Multiple parties may face liability: the engineer personally under Section 7 HASAWA (employee duties) and potentially civil negligence; the employer vicariously for the engineer's work; and the client under CDM Regulations as principal designer or client. Design errors can constitute offences."
  },
  {
    id: 10,
    question: "What is the Turnover Multiplier approach in the Sentencing Guidelines?",
    options: [
      "A method to calculate the number of employees",
      "Using the organisation's annual turnover to scale fines appropriately",
      "A calculation of insurance requirements",
      "A way to determine prison sentences"
    ],
    correctAnswer: 1,
    explanation: "The Sentencing Guidelines use the organisation's turnover to ensure fines are proportionate and have equal economic impact regardless of company size. A fine representing a certain percentage of turnover has equivalent deterrent effect across organisations."
  }
];

const faqs = [
  {
    question: "Can an employee be prosecuted for health and safety offences?",
    answer: "Yes. Under Section 7 of HASAWA 1974, employees have legal duties and can be prosecuted for failing to take reasonable care or for interfering with safety provisions. Under Section 36, employees can also be prosecuted if they cause their employer to commit an offence. Individual prosecutions are less common but do occur, particularly for reckless behaviour or deliberate breaches."
  },
  {
    question: "What defences are available in health and safety prosecutions?",
    answer: "The main defence is 'reasonable practicability' - that it was not reasonably practicable to do more. For some offences, defendants can show they exercised 'due diligence' - took all reasonable precautions and exercised all due diligence. Technical defences include challenging whether the prosecution was brought within the limitation period or whether procedures were followed correctly."
  },
  {
    question: "How do the 2016 Sentencing Guidelines differ from previous guidance?",
    answer: "The 2016 Guidelines significantly increased fines, particularly for large organisations. They introduced turnover-based calculation, meaning fines are proportionate to company size. The Guidelines also created clearer culpability categories (very high, high, medium, low) and harm categories (multiple deaths to low risk of injury), creating a more structured approach to sentencing."
  },
  {
    question: "What insurance covers health and safety liabilities?",
    answer: "Employers' Liability Insurance (compulsory for most employers) covers civil claims from employees. Public Liability Insurance covers claims from third parties. However, criminal fines cannot be insured against - they must be paid from company funds. Directors' personal liability under Section 37 similarly cannot be insured. Professional Indemnity Insurance may cover design negligence claims."
  },
  {
    question: "How does duty of care apply to contractors and subcontractors?",
    answer: "The duty of care extends to anyone affected by work activities, including contractors. Principal contractors have duties under CDM to coordinate safety. Clients cannot entirely delegate their duties. Each contractor has duties to their own employees and others. The courts have held that organisations cannot escape liability simply by outsourcing dangerous work to contractors."
  },
  {
    question: "What is a 'Remediation Order' and when is it used?",
    answer: "A Remediation Order requires an offender to take specific steps to remedy the cause of the offence within a set timescale. It is used when there are ongoing risks that need addressing beyond just punishment. Failure to comply with a Remediation Order is a separate offence. Courts use these to ensure practical improvements, not just financial penalties."
  }
];

const HNCModule1Section4_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module1-section4">
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
            <Shield className="h-4 w-4" />
            <span>Module 1.4.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Duty of Care and Accountability
          </h1>
          <p className="text-white/80">
            Legal obligations, liability, and consequences for health and safety failures in building services
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Duty of care:</strong> Legal obligation not to cause foreseeable harm</li>
              <li className="pl-1"><strong>Criminal liability:</strong> HASAWA breaches, fines, imprisonment</li>
              <li className="pl-1"><strong>Civil liability:</strong> Negligence claims for compensation</li>
              <li className="pl-1"><strong>Personal accountability:</strong> Directors liable under Section 37</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Designers:</strong> Duties to eliminate foreseeable risks</li>
              <li className="pl-1"><strong>Installers:</strong> Duty to work safely and to standard</li>
              <li className="pl-1"><strong>Maintainers:</strong> Ongoing duty for safe systems</li>
              <li className="pl-1"><strong>Multi-party:</strong> Client, contractor, subcontractor duties</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand the legal basis for duty of care in common and statute law",
              "Explain the elements required to prove negligence in civil claims",
              "Describe corporate and personal criminal liability under HASAWA",
              "Identify when directors can be personally prosecuted under Section 37",
              "Explain the Corporate Manslaughter Act and its application",
              "Apply the Health and Safety Sentencing Guidelines principles"
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

        {/* Section 1: The Duty of Care */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            The Legal Duty of Care
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The duty of care is a fundamental legal concept that requires persons to take reasonable
              care to avoid acts or omissions that could foreseeably cause harm to others. In the workplace,
              this duty is established through both common law (case law) and statute law (Acts of Parliament).
            </p>

            <div className="my-6 grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-sm font-medium text-elec-yellow mb-2">Common Law Duty</p>
                <p className="text-sm text-white/90 mb-3">
                  Established through court cases over centuries:
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Employers must provide safe systems of work</li>
                  <li className="pl-1">Competent fellow employees must be employed</li>
                  <li className="pl-1">Safe plant and equipment must be provided</li>
                  <li className="pl-1">A safe place of work must be maintained</li>
                  <li className="pl-1">Duty extends to reasonably foreseeable harm</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-sm font-medium text-elec-yellow mb-2">Statutory Duty</p>
                <p className="text-sm text-white/90 mb-3">
                  Codified in legislation, primarily HASAWA 1974:
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Section 2:</strong> Employer duties to employees</li>
                  <li className="pl-1"><strong>Section 3:</strong> Duties to non-employees</li>
                  <li className="pl-1"><strong>Section 4:</strong> Duties regarding premises</li>
                  <li className="pl-1"><strong>Section 7:</strong> Employee duties</li>
                  <li className="pl-1"><strong>Section 8:</strong> Duty not to interfere</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Who Owes a Duty of Care?</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Duty Holder</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Duty Owed To</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Building Services Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Employers</td>
                      <td className="border border-white/10 px-3 py-2">Employees</td>
                      <td className="border border-white/10 px-3 py-2">Safe isolation procedures for electricians</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Employers</td>
                      <td className="border border-white/10 px-3 py-2">Non-employees</td>
                      <td className="border border-white/10 px-3 py-2">Public protected from work activities</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Employees</td>
                      <td className="border border-white/10 px-3 py-2">Self and others</td>
                      <td className="border border-white/10 px-3 py-2">Following permit-to-work requirements</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Designers</td>
                      <td className="border border-white/10 px-3 py-2">Those who build, use, maintain</td>
                      <td className="border border-white/10 px-3 py-2">Designing for safe maintenance access</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Controllers of premises</td>
                      <td className="border border-white/10 px-3 py-2">Those using the premises</td>
                      <td className="border border-white/10 px-3 py-2">Safe electrical installations in buildings</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key principle:</strong> The duty of care requires action that is 'reasonably practicable' - balancing risk against the cost and difficulty of reducing it, with the balance weighted towards safety.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Civil Negligence */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Civil Negligence and Compensation Claims
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Civil claims for negligence allow injured parties to seek compensation for harm caused by
              another's failure to exercise reasonable care. These proceedings are brought in civil courts
              (County Court or High Court) and are separate from criminal prosecutions.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Elements of Negligence</p>
              <p className="text-sm text-white/90 mb-3">
                A claimant must prove all three elements on the balance of probabilities:
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-3 rounded bg-white/5 text-center">
                  <p className="font-bold text-elec-yellow mb-1">1. Duty Existed</p>
                  <p className="text-xs text-white/70">The defendant owed the claimant a duty of care</p>
                </div>
                <div className="p-3 rounded bg-white/5 text-center">
                  <p className="font-bold text-elec-yellow mb-1">2. Breach of Duty</p>
                  <p className="text-xs text-white/70">The defendant failed to meet the required standard of care</p>
                </div>
                <div className="p-3 rounded bg-white/5 text-center">
                  <p className="font-bold text-elec-yellow mb-1">3. Causation</p>
                  <p className="text-xs text-white/70">The breach caused the harm (damage, injury, or loss)</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Standard of Care</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">The standard is that of a 'reasonable person' in that position</li>
                <li className="pl-1">For professionals, it is the standard of a reasonably competent person in that profession</li>
                <li className="pl-1">Specialists are judged against the standard of reasonable specialists</li>
                <li className="pl-1">The court considers what was reasonably foreseeable at the time</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-300 mb-2">Building Services Example</p>
              <p className="text-sm text-white/90">
                <strong>Scenario:</strong> An electrician fails to properly terminate a cable joint, which later fails and causes a fire injuring an occupant.<br /><br />
                <strong>Analysis:</strong> (1) The electrician's employer owed a duty of care to building occupants (Section 3 HASAWA). (2) The work fell below the standard expected of a competent electrician (breach). (3) The inadequate termination caused the fire and injury (causation). The injured party can claim compensation from the employer (vicarious liability) and the installing company.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Types of Damages Recoverable</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>General damages:</strong> Pain, suffering, loss of amenity</li>
                  <li className="pl-1"><strong>Special damages:</strong> Quantifiable financial losses</li>
                  <li className="pl-1"><strong>Loss of earnings:</strong> Past and future</li>
                  <li className="pl-1"><strong>Medical costs:</strong> Treatment and care</li>
                  <li className="pl-1"><strong>Property damage:</strong> Repair or replacement</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Defences to Negligence</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>No duty existed:</strong> Harm not foreseeable</li>
                  <li className="pl-1"><strong>No breach:</strong> Reasonable standard was met</li>
                  <li className="pl-1"><strong>No causation:</strong> Breach did not cause harm</li>
                  <li className="pl-1"><strong>Contributory negligence:</strong> Claimant partly at fault</li>
                  <li className="pl-1"><strong>Volenti:</strong> Claimant accepted the risk</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Limitation period:</strong> Civil claims must generally be brought within 3 years of the date of knowledge of the injury (6 years for property damage).
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Corporate and Personal Criminal Liability */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Corporate and Personal Criminal Liability
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Health and safety offences are primarily criminal matters, with prosecution by the Health and
              Safety Executive (HSE) or local authorities. Criminal proceedings can be brought against companies,
              partnerships, and individuals including directors, managers, and employees.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Corporate Criminal Liability</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Offence Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Legal Basis</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Maximum Penalty</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Section 2 breach (employees)</td>
                      <td className="border border-white/10 px-3 py-2">HASAWA 1974</td>
                      <td className="border border-white/10 px-3 py-2">Unlimited fine</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Section 3 breach (non-employees)</td>
                      <td className="border border-white/10 px-3 py-2">HASAWA 1974</td>
                      <td className="border border-white/10 px-3 py-2">Unlimited fine</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Regulation breach</td>
                      <td className="border border-white/10 px-3 py-2">Various regulations</td>
                      <td className="border border-white/10 px-3 py-2">Unlimited fine (triable either way)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Corporate manslaughter</td>
                      <td className="border border-white/10 px-3 py-2">CMCHA 2007</td>
                      <td className="border border-white/10 px-3 py-2">Unlimited fine + publicity order</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Section 37 HASAWA - Personal Liability of Directors</p>
              <p className="text-sm text-white/90 mb-3">
                Where an offence by a body corporate is proved to have been committed with the <strong>consent</strong> or <strong>connivance</strong> of, or to have been attributable to any <strong>neglect</strong> on the part of, any director, manager, secretary or similar officer, that person as well as the body corporate shall be guilty of the offence.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Consent:</strong> Actively agreed to the unsafe practice</li>
                <li className="pl-1"><strong>Connivance:</strong> Knew and turned a blind eye</li>
                <li className="pl-1"><strong>Neglect:</strong> Failed to take reasonable steps to prevent</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Personal Liability - Who Can Be Prosecuted?</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Person</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Basis of Liability</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Maximum Penalty</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Company directors</td>
                      <td className="border border-white/10 px-3 py-2">Section 37 HASAWA</td>
                      <td className="border border-white/10 px-3 py-2">Unlimited fine and/or 2 years imprisonment</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Managers</td>
                      <td className="border border-white/10 px-3 py-2">Section 37 HASAWA</td>
                      <td className="border border-white/10 px-3 py-2">Unlimited fine and/or 2 years imprisonment</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Employees</td>
                      <td className="border border-white/10 px-3 py-2">Section 7/8 HASAWA</td>
                      <td className="border border-white/10 px-3 py-2">Unlimited fine (rarely imprisonment)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Self-employed</td>
                      <td className="border border-white/10 px-3 py-2">Section 3 HASAWA</td>
                      <td className="border border-white/10 px-3 py-2">Unlimited fine and/or 2 years imprisonment</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Company Directors Disqualification Act 1986</p>
              <p className="text-sm text-white/90">
                In addition to criminal penalties, courts can disqualify directors from holding company directorships:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 mt-2">
                <li className="pl-1">Up to 15 years disqualification for conviction on indictment</li>
                <li className="pl-1">Up to 5 years for summary conviction</li>
                <li className="pl-1">Applies to all companies, not just the one where the offence occurred</li>
                <li className="pl-1">Acting as director while disqualified is a criminal offence</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Critical point:</strong> Personal criminal liability cannot be insured against - directors must pay fines personally.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Sentencing Guidelines */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Health and Safety Sentencing Guidelines
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Definitive Sentencing Guidelines for Health and Safety Offences, Corporate Manslaughter,
              and Food Safety and Hygiene Offences came into force in February 2016. They fundamentally
              changed how courts calculate fines, with significantly increased penalties particularly for large organisations.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Step 1: Culpability Assessment</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Level</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Indicators</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-bold text-red-400">Very High</td>
                      <td className="border border-white/10 px-3 py-2">Deliberate breach or flagrant disregard</td>
                      <td className="border border-white/10 px-3 py-2">Ignored warnings, profit-driven risk-taking</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-bold text-orange-400">High</td>
                      <td className="border border-white/10 px-3 py-2">Fell far short of standard</td>
                      <td className="border border-white/10 px-3 py-2">Serious and obvious risk ignored</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-bold text-yellow-400">Medium</td>
                      <td className="border border-white/10 px-3 py-2">Fell short of standard</td>
                      <td className="border border-white/10 px-3 py-2">Risk foreseeable but not obvious</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-bold text-green-400">Low</td>
                      <td className="border border-white/10 px-3 py-2">Minor failing</td>
                      <td className="border border-white/10 px-3 py-2">Isolated incident, systems in place</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Step 2: Harm Assessment</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Category</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Seriousness of Harm Risked</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Likelihood of Harm</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-bold">Category 1</td>
                      <td className="border border-white/10 px-3 py-2">Death or physical/mental impairment causing lifelong effects</td>
                      <td className="border border-white/10 px-3 py-2">High</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-bold">Category 2</td>
                      <td className="border border-white/10 px-3 py-2">Physical/mental impairment, serious, long-term</td>
                      <td className="border border-white/10 px-3 py-2">Medium</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-bold">Category 3</td>
                      <td className="border border-white/10 px-3 py-2">Moderate harm</td>
                      <td className="border border-white/10 px-3 py-2">Low</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-bold">Category 4</td>
                      <td className="border border-white/10 px-3 py-2">Low risk of harm</td>
                      <td className="border border-white/10 px-3 py-2">Remote</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Organisation Size Categories (Annual Turnover)</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-sm">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-bold text-elec-yellow mb-1">Micro</p>
                  <p className="text-white/70 text-xs">Up to £2m</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-bold text-elec-yellow mb-1">Small</p>
                  <p className="text-white/70 text-xs">£2m - £10m</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-bold text-elec-yellow mb-1">Medium</p>
                  <p className="text-white/70 text-xs">£10m - £50m</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-bold text-elec-yellow mb-1">Large</p>
                  <p className="text-white/70 text-xs">£50m+</p>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Fine Ranges for Large Organisations (£50m+ turnover)</p>
              <div className="overflow-x-auto">
                <table className="text-xs text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-2 py-1 text-left">Harm Category</th>
                      <th className="border border-white/10 px-2 py-1 text-left">Very High Culpability</th>
                      <th className="border border-white/10 px-2 py-1 text-left">High Culpability</th>
                      <th className="border border-white/10 px-2 py-1 text-left">Medium Culpability</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-2 py-1">1 (Death risk)</td>
                      <td className="border border-white/10 px-2 py-1 text-red-400">£2.6m - £10m+</td>
                      <td className="border border-white/10 px-2 py-1">£1.5m - £4m</td>
                      <td className="border border-white/10 px-2 py-1">£550k - £1.5m</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-1">2 (Serious harm)</td>
                      <td className="border border-white/10 px-2 py-1">£1m - £3m</td>
                      <td className="border border-white/10 px-2 py-1">£450k - £1.5m</td>
                      <td className="border border-white/10 px-2 py-1">£200k - £750k</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-white/70 mt-2">Note: These are starting points - actual fines can exceed these ranges based on aggravating factors.</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Aggravating and Mitigating Factors</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-red-500/10">
                  <p className="font-medium text-red-400 text-sm mb-2">Aggravating (Increase Fine)</p>
                  <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">Previous convictions or warnings</li>
                    <li className="pl-1">Cost-cutting as motivation</li>
                    <li className="pl-1">Obstruction of investigation</li>
                    <li className="pl-1">Poor health and safety record</li>
                    <li className="pl-1">Failure to heed warnings</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-green-500/10">
                  <p className="font-medium text-green-400 text-sm mb-2">Mitigating (Reduce Fine)</p>
                  <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">No previous convictions</li>
                    <li className="pl-1">Good health and safety record</li>
                    <li className="pl-1">Immediate remedial steps taken</li>
                    <li className="pl-1">High level of cooperation</li>
                    <li className="pl-1">Self-reporting of breach</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Guilty plea discount:</strong> Up to one-third reduction for early guilty plea, reducing to one-tenth if entered at trial.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Legal Principles to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Reasonably practicable:</strong> Cost must be grossly disproportionate to risk before measures can be avoided</li>
                <li className="pl-1"><strong>Foreseeability:</strong> Duty extends to risks that could reasonably be foreseen</li>
                <li className="pl-1"><strong>Vicarious liability:</strong> Employers liable for employees' negligence in course of employment</li>
                <li className="pl-1"><strong>Non-delegable duty:</strong> Cannot escape duty by delegating to contractors</li>
                <li className="pl-1"><strong>Criminal vs civil:</strong> Different standards of proof, separate proceedings</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Protecting Yourself as a Building Services Professional</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Ensure competence through training and CPD</li>
                <li className="pl-1">Document risk assessments and safe systems of work</li>
                <li className="pl-1">Follow industry standards (BS 7671, guidance notes)</li>
                <li className="pl-1">Report concerns through proper channels</li>
                <li className="pl-1">Maintain records of work, inspections, and tests</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Failures Leading to Prosecution</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Inadequate risk assessment:</strong> Generic or paper-exercise assessments</li>
                <li className="pl-1"><strong>Poor supervision:</strong> Workers left unsupervised for high-risk tasks</li>
                <li className="pl-1"><strong>Lack of safe systems:</strong> No permit-to-work where required</li>
                <li className="pl-1"><strong>Inadequate training:</strong> Workers not competent for tasks assigned</li>
                <li className="pl-1"><strong>Ignoring warnings:</strong> Known risks not addressed after near misses</li>
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
                <p className="font-medium text-white mb-1">Key HASAWA Sections</p>
                <ul className="space-y-0.5">
                  <li>S.2 - Employer duties to employees</li>
                  <li>S.3 - Duties to non-employees</li>
                  <li>S.7 - Employee duties</li>
                  <li>S.37 - Directors' personal liability</li>
                  <li>CMCHA 2007 - Corporate manslaughter</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Liability Summary</p>
                <ul className="space-y-0.5">
                  <li>Criminal: Unlimited fines, up to 2 years prison</li>
                  <li>Civil: Compensation for injury/loss</li>
                  <li>Directors: Personal liability under S.37</li>
                  <li>Disqualification: Up to 15 years</li>
                  <li>Vicarious: Employer liable for employee acts</li>
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
            <Link to="../h-n-c-module1-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module1-section4-2">
              Next: Competence and Training
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule1Section4_1;
