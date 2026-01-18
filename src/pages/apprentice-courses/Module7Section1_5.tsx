import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Legal and Safety Responsibilities - Module 7.1.5 | Level 2 Electrical Course";
const DESCRIPTION = "Understanding the legal duties and safety responsibilities when dealing with electrical faults under EAWR 1989 and BS 7671.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "What is the primary legislation governing electrical safety in the workplace?",
    options: ["Health and Safety at Work Act 1974", "Electricity at Work Regulations 1989", "Management of Health and Safety at Work Regulations", "BS 7671 Wiring Regulations"],
    correctIndex: 1,
    explanation: "The Electricity at Work Regulations 1989 (EAWR) is the primary legislation specifically governing electrical safety in UK workplaces."
  },
  {
    id: 2,
    question: "What must you do immediately upon discovering a dangerous electrical fault?",
    options: ["Continue working carefully", "Isolate the circuit and report immediately", "Fix it quickly", "Wait for instructions"],
    correctIndex: 1,
    explanation: "EAWR 1989 requires immediate isolation of dangerous conditions and reporting to prevent harm to persons."
  },
  {
    id: 3,
    question: "Who can be held personally liable under EAWR 1989?",
    options: ["Only company directors", "Only qualified electricians", "Any employee with electrical duties", "Only safety officers"],
    correctIndex: 2,
    explanation: "EAWR 1989 places duties on all employees who work with electrical systems, making them personally liable for safety breaches."
  },
  {
    id: 4,
    question: "Why is proper documentation of electrical faults legally important?",
    options: ["Not legally required", "Provides evidence of due diligence and compliance", "Only for insurance", "Just good practice"],
    correctIndex: 1,
    explanation: "Proper documentation provides essential evidence of due diligence and compliance with legal duties under EAWR 1989."
  }
];

const Module7Section1_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "What is the primary legislation governing electrical safety in the workplace?",
      options: ["Health and Safety at Work Act 1974", "Electricity at Work Regulations 1989", "Management of Health and Safety at Work Regulations", "BS 7671 Wiring Regulations"],
      correctAnswer: 1,
      explanation: "The Electricity at Work Regulations 1989 (EAWR) is the primary legislation specifically governing electrical safety in UK workplaces."
    },
    {
      id: 2,
      question: "Under EAWR 1989, who has duties regarding electrical safety?",
      options: ["Only employers", "Only electricians", "Both employers and employees", "Only safety officers"],
      correctAnswer: 2,
      explanation: "EAWR 1989 places legal duties on both employers and employees, making everyone with electrical responsibilities accountable."
    },
    {
      id: 3,
      question: "What must you do immediately upon discovering a dangerous electrical fault?",
      options: ["Continue working carefully", "Isolate the circuit and report immediately", "Fix it quickly", "Wait for instructions"],
      correctAnswer: 1,
      explanation: "EAWR 1989 requires immediate isolation of dangerous conditions and reporting to prevent harm to persons."
    },
    {
      id: 4,
      question: "What is the maximum penalty for serious breaches of EAWR 1989?",
      options: ["£5,000 fine", "£50,000 fine", "Unlimited fine and up to 2 years imprisonment", "Verbal warning"],
      correctAnswer: 2,
      explanation: "Serious breaches of EAWR 1989 can result in unlimited fines and up to 2 years imprisonment for individuals."
    },
    {
      id: 5,
      question: "Who can be held personally liable under EAWR 1989?",
      options: ["Only company directors", "Only qualified electricians", "Any employee with electrical duties", "Only safety officers"],
      correctAnswer: 2,
      explanation: "EAWR 1989 places duties on all employees who work with electrical systems, making them personally liable for safety breaches."
    },
    {
      id: 6,
      question: "What does 'so far as is reasonably practicable' mean in EAWR 1989?",
      options: ["Do whatever is convenient", "Balance risk against cost and effort", "Only do the minimum", "Ignore if too expensive"],
      correctAnswer: 1,
      explanation: "This phrase requires balancing the level of risk against the cost and effort needed to reduce it, with bias toward safety."
    },
    {
      id: 7,
      question: "Why is proper documentation of electrical faults legally important?",
      options: ["Not legally required", "Provides evidence of due diligence and compliance", "Only for insurance", "Just good practice"],
      correctAnswer: 1,
      explanation: "Proper documentation provides essential evidence of due diligence and compliance with legal duties under EAWR 1989."
    },
    {
      id: 8,
      question: "What must be done before working on faulty electrical equipment?",
      options: ["Work more carefully", "Isolate, lock off, and prove dead", "Wear more PPE", "Get permission"],
      correctAnswer: 1,
      explanation: "EAWR 1989 requires electrical equipment to be made dead and proved dead before work begins, with secure isolation."
    },
    {
      id: 9,
      question: "How do courts typically view electrical safety cases?",
      options: ["Very leniently", "With serious concern and strict application of law", "Only consider financial impact", "Rarely prosecute"],
      correctAnswer: 1,
      explanation: "Courts take electrical safety very seriously due to the potential for serious harm, and apply the law strictly."
    },
    {
      id: 10,
      question: "What happens if someone is injured due to an electrical fault that wasn't properly addressed?",
      options: ["Nothing if it was an accident", "Criminal and civil liability possible", "Only insurance matters", "Just an unfortunate incident"],
      correctAnswer: 1,
      explanation: "Failure to properly address electrical faults can result in both criminal prosecution under EAWR 1989 and civil liability for damages."
    }
  ];

  const faqs = [
    {
      question: "Does EAWR 1989 apply to all electrical work?",
      answer: "Yes, EAWR 1989 applies to all electrical systems and work activities in workplaces, regardless of voltage level or system size."
    },
    {
      question: "Can an employee refuse to work on a faulty electrical system?",
      answer: "Yes, employees have the right to refuse work that they reasonably believe presents serious and immediate danger, and are protected from dismissal for doing so."
    },
    {
      question: "What is the difference between EAWR 1989 and BS 7671?",
      answer: "EAWR 1989 is law with criminal penalties, while BS 7671 is a British Standard. However, compliance with BS 7671 is often used as evidence of EAWR compliance."
    }
  ];

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center">
          <Button
            variant="ghost"
            size="sm"
            className="min-h-[44px] touch-manipulation active:scale-[0.98] text-white/70 hover:text-white hover:bg-white/5 -ml-2 px-3"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section
            </Link>
          </Button>
        </div>
      </div>

      {/* Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <span className="font-medium">Module 7</span>
              <span className="text-white/40">•</span>
              <span className="text-white/70">Section 1.5</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Legal and Safety Responsibilities
            </h1>
            <p className="text-white/70 max-w-xl mx-auto">
              Understanding legal duties and safety responsibilities when dealing with electrical faults.
            </p>
          </header>

          {/* Summary Box */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <p className="text-white/90 text-sm leading-relaxed">
              <strong className="text-elec-yellow">Key Points:</strong> EAWR 1989 creates legal duties for electrical safety. Immediate action required for dangerous faults. Personal liability applies to all electrical workers.
            </p>
          </div>

          {/* Introduction */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Introduction
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Discovering an electrical fault creates immediate legal and professional responsibilities that cannot be ignored. The Electricity at Work Regulations 1989 (EAWR) place specific duties on anyone who works with electrical systems, making them personally accountable for electrical safety. Understanding these responsibilities is essential for every electrician, as non-compliance can result in prosecution, unlimited fines, and imprisonment.
              </p>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-sm">
                  <strong className="text-elec-yellow">Why This Matters:</strong> EAWR 1989 is criminal law with serious penalties. HSE prosecutions for electrical safety breaches result in average fines of £200,000+ and can include imprisonment. Personal liability means individuals face direct consequences for their decisions and actions.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm">
                  <strong className="text-elec-yellow">Professional Standard:</strong> BS 7671 provides the technical standards, but EAWR 1989 makes compliance a legal requirement. Following proper procedures protects both safety and legal standing.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-amber-500/10 border-l-2 border-amber-500/50">
                <p className="text-sm">
                  <strong className="text-amber-400">Key Principle:</strong> "So far as is reasonably practicable" means balancing risk against cost/effort, but with a strong bias toward safety. In most cases, this means taking immediate action when faults are discovered.
                </p>
              </div>
            </div>
          </section>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Learning Outcomes
            </h2>
            <div className="text-white/80 space-y-3 leading-relaxed">
              <p>By the end of this subsection, learners will be able to:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Understand the legal responsibilities under EAWR 1989 when faults are identified.</li>
                <li>Explain the safety procedures required when dealing with faulty circuits.</li>
                <li>Recognise the importance of reporting and documenting faults properly.</li>
                <li>Appreciate the professional consequences of failing to act responsibly when faults are discovered.</li>
              </ul>
            </div>
          </section>

          {/* Legal Duties Under EAWR 1989 */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Legal Duties Under EAWR 1989
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                EAWR 1989 creates specific legal duties that apply to everyone who works with electrical systems.
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-1">Regulation 4(1)</p>
                  <p className="text-sm text-white/70">All electrical systems must be constructed, maintained, and used safely</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-1">Regulation 14</p>
                  <p className="text-sm text-white/70">No person shall work on live electrical equipment</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-1">Regulation 13</p>
                  <p className="text-sm text-white/70">Adequate precautions must be taken to prevent danger</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-1">Regulation 3</p>
                  <p className="text-sm text-white/70">Duties apply to both employers and employees</p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Personal Liability:</p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-white/70">
                  <li>Individual employees can be prosecuted for safety breaches</li>
                  <li>Maximum penalty: unlimited fine and 2 years imprisonment</li>
                  <li>"I was following orders" is not a valid defence</li>
                  <li>Competence and training are legal requirements, not just preferences</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Immediate Duties When Faults Are Found:</p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-white/70">
                  <li>Isolate dangerous circuits immediately</li>
                  <li>Prevent access to hazardous areas</li>
                  <li>Report findings to appropriate persons</li>
                  <li>Ensure no one is exposed to danger</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-green-500/10 border-l-2 border-green-500/50">
                <p className="text-sm">
                  <strong className="text-green-400">Critical Understanding:</strong> EAWR 1989 is criminal law, not just guidance. Failure to comply when faults are discovered can result in prosecution even if no actual harm occurs. The law requires proactive safety management, not reactive responses.
                </p>
              </div>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck
              id="legal-duties-check"
              question={quickCheckQuestions[0].question}
              options={quickCheckQuestions[0].options}
              correctIndex={quickCheckQuestions[0].correctIndex}
              explanation={quickCheckQuestions[0].explanation}
            />
          </div>

          {/* Safety First – Isolating Faulty Circuits */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Safety First – Isolating Faulty Circuits
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Safe isolation procedures are legally required and must be followed whenever electrical faults are discovered.
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-2">Before Investigation</p>
                  <ul className="list-disc pl-4 space-y-1 text-sm text-white/70">
                    <li>Isolate the circuit at the source</li>
                    <li>Secure isolation (lock off if possible)</li>
                    <li>Test voltage indicator on known live source</li>
                    <li>Test circuit is dead at multiple points</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-2">During Work</p>
                  <ul className="list-disc pl-4 space-y-1 text-sm text-white/70">
                    <li>Apply warning notices</li>
                    <li>Prevent unauthorised re-energisation</li>
                    <li>Re-test before touching conductors</li>
                    <li>Treat all conductors as live until proven dead</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Legal Requirements:</p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-white/70">
                  <li><strong>Regulation 14:</strong> Work on dead equipment only (with limited exceptions)</li>
                  <li><strong>Regulation 13:</strong> Adequate precautions to prevent electrical danger</li>
                  <li><strong>Regulation 12:</strong> Suitable means of cutting off supply and for isolation</li>
                  <li>Failure to isolate properly can result in prosecution even without injury</li>
                </ul>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-2">Permit to Work</p>
                  <p className="text-sm text-white/70">Required for complex or high-risk isolation procedures</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-2">Isolation Certificates</p>
                  <p className="text-sm text-white/70">Record of isolation procedures and safety checks</p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-amber-500/10 border-l-2 border-amber-500/50">
                <p className="text-sm">
                  <strong className="text-amber-400">Legal Consequence:</strong> Working on live equipment when it could reasonably be made dead is a serious breach of EAWR 1989. Even experienced electricians have been prosecuted and imprisoned for failing to follow proper isolation procedures.
                </p>
              </div>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck
              id="safety-procedures-check"
              question={quickCheckQuestions[1].question}
              options={quickCheckQuestions[1].options}
              correctIndex={quickCheckQuestions[1].correctIndex}
              explanation={quickCheckQuestions[1].explanation}
            />
          </div>

          {/* Reporting and Documentation */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Reporting and Documentation
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Proper reporting and documentation are legal requirements that provide essential protection.
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-1">Immediate Reporting</p>
                  <p className="text-sm text-white/70">Dangerous faults must be reported immediately to supervisors and duty holders</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-1">Detailed Records</p>
                  <p className="text-sm text-white/70">Complete documentation of faults, actions taken, and test results</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-1">Legal Evidence</p>
                  <p className="text-sm text-white/70">Records provide evidence of due diligence and legal compliance</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-1">Professional Protection</p>
                  <p className="text-sm text-white/70">Proper documentation protects against future liability claims</p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Required Documentation Elements:</p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-white/70">
                  <li>Precise description of the fault discovered</li>
                  <li>Date, time, and location of discovery</li>
                  <li>Immediate actions taken to secure safety</li>
                  <li>Test results and measurements taken</li>
                  <li>Corrective actions performed</li>
                  <li>Re-test results confirming safe operation</li>
                  <li>Name and signature of responsible person</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-purple-500/10 border-l-2 border-purple-500/50">
                <p className="text-sm">
                  <strong className="text-purple-400">Legal Protection:</strong> Proper documentation demonstrates that you acted responsibly and followed correct procedures. In legal proceedings, good records can be the difference between prosecution and exoneration.
                </p>
              </div>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck
              id="documentation-check"
              question={quickCheckQuestions[2].question}
              options={quickCheckQuestions[2].options}
              correctIndex={quickCheckQuestions[2].correctIndex}
              explanation={quickCheckQuestions[2].explanation}
            />
          </div>

          {/* Professional and Legal Consequences */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Professional and Legal Consequences of Negligence
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Failing to meet legal and safety responsibilities can have severe personal and professional consequences.
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-1">Criminal Penalties</p>
                  <p className="text-sm text-white/70">Unlimited fines and up to 2 years imprisonment under EAWR 1989</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-1">Civil Liability</p>
                  <p className="text-sm text-white/70">Personal compensation claims for injury and damage</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-1">Professional Impact</p>
                  <p className="text-sm text-white/70">Loss of competency cards and professional registration</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-1">Career Damage</p>
                  <p className="text-sm text-white/70">Difficulty obtaining future employment and insurance</p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Real Consequences:</p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-white/70">
                  <li>HSE prosecutions result in average fines of £200,000+ for serious cases</li>
                  <li>Individual electricians have received prison sentences for safety breaches</li>
                  <li>Professional body sanctions can end electrical careers</li>
                  <li>Civil claims can reach millions for serious injury cases</li>
                  <li>Criminal records affect future employment and travel</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
                <p className="text-sm">
                  <strong className="text-red-400">Critical Reality:</strong> Courts increasingly impose severe penalties for electrical safety breaches because of the potential for serious harm. "I didn't know" or "I thought it would be OK" are not acceptable defences when dealing with electrical faults.
                </p>
              </div>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck
              id="consequences-check"
              question={quickCheckQuestions[3].question}
              options={quickCheckQuestions[3].options}
              correctIndex={quickCheckQuestions[3].correctIndex}
              explanation={quickCheckQuestions[3].explanation}
            />
          </div>

          {/* Practical Guidance */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Practical Guidance
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div>
                <p className="font-medium text-white mb-2">Legal Compliance Procedures:</p>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>Always follow safe isolation procedures before investigating or working on faulty circuits.</li>
                  <li>Report dangerous conditions immediately to supervisors and duty holders.</li>
                  <li>Document all findings, actions, and test results with complete accuracy.</li>
                  <li>Never energise circuits that have failed testing or have unresolved faults.</li>
                </ul>
              </div>

              <div>
                <p className="font-medium text-white mb-2">Professional Protection:</p>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>Maintain competency through regular training and updates to regulations.</li>
                  <li>Keep detailed records of all electrical work and fault investigations.</li>
                  <li>Ensure appropriate professional indemnity insurance coverage.</li>
                  <li>Seek guidance from supervisors when dealing with complex or unusual faults.</li>
                </ul>
              </div>

              <div>
                <p className="font-medium text-white mb-2">Emergency Procedures:</p>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>Establish clear procedures for reporting dangerous electrical conditions.</li>
                  <li>Ensure 24/7 contact methods for emergency fault situations.</li>
                  <li>Maintain emergency isolation procedures and equipment access.</li>
                  <li>Train all personnel in their legal duties and emergency procedures.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Real-World Example */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">08</span>
              Real-World Example
            </h2>
            <div className="p-4 rounded-lg bg-amber-500/10 border-l-2 border-amber-500/50">
              <p className="font-medium text-white mb-3">Case Study: HSE Prosecution for Ignored Earth Fault</p>
              <div className="text-white/80 space-y-3 text-sm leading-relaxed">
                <p>
                  During a commercial refurbishment, an electrician discovered a loose earth connection in a distribution board but failed to report it, assuming it "would be fine until the job was finished." Three weeks later, an earth fault occurred and the faulty connection prevented proper protective device operation. An employee received a severe electric shock requiring hospital treatment.
                </p>
                <p>
                  <strong>HSE Investigation:</strong> The investigation revealed that the electrician had identified the fault but failed to isolate the circuit, report the condition, or rectify the problem immediately. The fault was documented in his personal notes but not reported to supervisors or the client.
                </p>
                <p>
                  <strong>Legal Consequences:</strong>
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>The electrician was prosecuted individually under EAWR 1989 Regulation 3</li>
                  <li>He received a £15,000 fine and 6 months suspended prison sentence</li>
                  <li>His JIB card was suspended and he lost his job</li>
                  <li>The company faced additional prosecution and a £180,000 fine</li>
                  <li>The injured employee sued for £85,000 compensation</li>
                </ul>
                <p>
                  <strong>Key Learning:</strong> Finding a fault creates a legal duty to act immediately. Personal knowledge of a dangerous condition that you fail to address properly can result in personal prosecution, even if you're not directly responsible for the accident.
                </p>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">09</span>
              FAQs
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-2">{faq.question}</p>
                  <p className="text-sm text-white/70">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Recap */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">10</span>
              Recap
            </h2>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <ul className="list-disc pl-5 space-y-2 text-white/80 text-sm">
                <li>EAWR 1989 creates personal legal duties for all electrical workers with serious criminal penalties for non-compliance.</li>
                <li>Safe isolation procedures are mandatory before investigating or working on faulty electrical equipment.</li>
                <li>Immediate reporting and detailed documentation of faults are legal requirements that provide essential protection.</li>
                <li>Professional and legal consequences of negligence include prosecution, fines, imprisonment, and career-ending sanctions.</li>
              </ul>
            </div>
          </section>

          {/* Quiz */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">11</span>
              Quiz
            </h2>
            <Quiz questions={quizQuestions} title="Legal and Safety Responsibilities" />
          </section>

          {/* Navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
            <Button
              variant="ghost"
              className="min-h-[48px] touch-manipulation active:scale-[0.98] text-white/70 hover:text-white hover:bg-white/5 justify-start"
              asChild
            >
              <Link to="../1-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Fault Categories
              </Link>
            </Button>
            <Button
              className="min-h-[48px] touch-manipulation active:scale-[0.98] bg-elec-yellow text-black hover:bg-elec-yellow/90 justify-center sm:justify-end"
              asChild
            >
              <Link to="..">
                Back to Section 1
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module7Section1_5;
