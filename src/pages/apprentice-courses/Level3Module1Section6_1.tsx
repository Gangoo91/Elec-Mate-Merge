import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "Who do employers owe a duty of care to under health and safety law?",
    options: [
      "Only their direct employees",
      "Employees, contractors, visitors, and others affected by their activities",
      "Only workers on permanent contracts",
      "Only people inside their premises"
    ],
    correctIndex: 1,
    explanation: "Employers owe a duty of care to everyone affected by their undertaking - employees, contractors, visitors, members of the public, and anyone else who may be harmed by their work activities."
  },
  {
    id: "check-2",
    question: "What is the legal standard for duty of care in health and safety?",
    options: [
      "Absolute safety - all risks must be eliminated",
      "So far as is reasonably practicable (SFAIRP)",
      "Whatever the employer decides is reasonable",
      "Only what insurance companies require"
    ],
    correctIndex: 1,
    explanation: "The standard is 'so far as is reasonably practicable' (SFAIRP). This means balancing the risk against the cost, time, and effort to control it. Where risk is high, more effort is expected."
  },
  {
    id: "check-3",
    question: "As an electrician, you owe a duty of care to:",
    options: [
      "Only your employer",
      "Only other electricians",
      "Anyone who could be affected by your work",
      "Only people who pay you directly"
    ],
    correctIndex: 2,
    explanation: "You owe a duty of care to anyone who could be affected by your work - colleagues, other trades, building occupants, visitors, and the public. This includes both immediate and future users of your installations."
  },
  {
    id: "check-4",
    question: "What happens if duty of care is breached and someone is harmed?",
    options: [
      "Nothing - only employers can be held responsible",
      "Only verbal warnings are given",
      "Civil claims, criminal prosecution, and/or disciplinary action may follow",
      "Insurance automatically covers everything"
    ],
    correctIndex: 2,
    explanation: "Breach of duty of care can result in civil claims for compensation, criminal prosecution under health and safety law, and/or disciplinary action including dismissal. Both organisations and individuals can be prosecuted."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is 'duty of care' in health and safety?",
    options: [
      "A type of insurance policy",
      "A legal and moral obligation to avoid causing harm to others",
      "A voluntary commitment by employers",
      "A trade union requirement"
    ],
    correctAnswer: 1,
    explanation: "Duty of care is both a legal obligation (under HSWA 1974 and common law) and a moral responsibility to take reasonable steps to avoid causing foreseeable harm to others."
  },
  {
    id: 2,
    question: "Under HSWA 1974 Section 2, employers have a general duty to ensure, SFAIRP:",
    options: [
      "Maximum profit for shareholders",
      "The health, safety and welfare at work of all employees",
      "Unlimited sick pay for all workers",
      "Free safety equipment for all visitors"
    ],
    correctAnswer: 1,
    explanation: "Section 2 of HSWA 1974 requires employers to ensure, so far as is reasonably practicable, the health, safety and welfare at work of all their employees. This is the fundamental employer duty."
  },
  {
    id: 3,
    question: "What does Section 3 of HSWA 1974 require of employers?",
    options: [
      "To provide free meals",
      "To ensure non-employees are not exposed to risks from the employer's undertaking",
      "To hire only qualified workers",
      "To consult with trade unions on wages"
    ],
    correctAnswer: 1,
    explanation: "Section 3 extends duty of care beyond employees - employers must conduct their undertaking so that non-employees (contractors, visitors, public) are not exposed to health and safety risks."
  },
  {
    id: 4,
    question: "What does the principle of 'foreseeability' mean in duty of care?",
    options: [
      "Predicting the future",
      "If harm is reasonably foreseeable, you have a duty to prevent it",
      "Only worrying about things that have happened before",
      "Looking at weather forecasts"
    ],
    correctAnswer: 1,
    explanation: "Foreseeability means if a reasonable person could predict that their actions (or inactions) might cause harm, they have a duty to take steps to prevent that harm. You don't need to foresee exact events, just the type of harm."
  },
  {
    id: 5,
    question: "An electrician leaves cables trailing across a walkway. Someone trips and is injured. This is an example of:",
    options: [
      "Unavoidable accident",
      "Breach of duty of care - the harm was foreseeable",
      "Third party negligence only",
      "Force majeure"
    ],
    correctAnswer: 1,
    explanation: "This is a clear breach of duty of care. The risk of someone tripping on trailing cables is entirely foreseeable. The electrician had a duty to route cables safely or provide warning/protection."
  },
  {
    id: 6,
    question: "What duty does an employee have under Section 7 of HSWA 1974?",
    options: [
      "No duties - only employers have duties",
      "To take reasonable care for their own safety and that of others",
      "Only to follow written instructions",
      "To report for work on time"
    ],
    correctAnswer: 1,
    explanation: "Section 7 places personal duties on employees to take reasonable care for their own health and safety AND for others who may be affected by their acts or omissions at work."
  },
  {
    id: 7,
    question: "What is the 'neighbour principle' in duty of care?",
    options: [
      "Only caring for people who live nearby",
      "You must consider anyone who might be affected by your actions",
      "A principle about property boundaries",
      "A requirement to share tools with neighbours"
    ],
    correctAnswer: 1,
    explanation: "The neighbour principle (from Donoghue v Stevenson 1932) established that you owe a duty of care to anyone who might reasonably be affected by your actions. This is the foundation of negligence law."
  },
  {
    id: 8,
    question: "An apprentice notices a senior electrician taking a dangerous shortcut. What should they do?",
    options: [
      "Nothing - it's not their place to comment",
      "Copy the shortcut to fit in",
      "Raise the concern - they have a duty of care too",
      "Wait until someone gets hurt"
    ],
    correctAnswer: 2,
    explanation: "Everyone has a duty of care regardless of seniority. The apprentice should raise the concern with the senior worker, supervisor, or safety representative. Not speaking up could make them partly responsible if harm occurs."
  },
  {
    id: 9,
    question: "What is 'vicarious liability'?",
    options: [
      "Liability for acts of nature",
      "Employers being held liable for acts of their employees done in course of employment",
      "Liability for equipment failure only",
      "Personal liability for all debts"
    ],
    correctAnswer: 1,
    explanation: "Vicarious liability means employers can be held legally responsible for the negligent acts of their employees when those acts are done in the course of employment. This doesn't remove personal employee liability."
  },
  {
    id: 10,
    question: "What is the moral duty of care?",
    options: [
      "Only what the law requires",
      "An ethical obligation to protect others from harm, beyond legal minimums",
      "A religious requirement",
      "A requirement for charitable donations"
    ],
    correctAnswer: 1,
    explanation: "Moral duty of care goes beyond legal compliance. It's the ethical principle that we should act to protect others from harm because it's the right thing to do - not just because the law requires it."
  },
  {
    id: 11,
    question: "Who can bring a civil claim for breach of duty of care?",
    options: [
      "Only employers",
      "Only the HSE",
      "Anyone who has suffered harm due to the breach",
      "Only trade union members"
    ],
    correctAnswer: 2,
    explanation: "Any person who has suffered harm (physical injury, illness, financial loss) due to breach of duty of care can bring a civil claim for compensation. This is separate from any criminal prosecution."
  },
  {
    id: 12,
    question: "How does duty of care apply to future building occupants?",
    options: [
      "It doesn't - only current workers matter",
      "Electricians must install work that is safe for future users",
      "Only the building owner is responsible",
      "Future occupants must check their own safety"
    ],
    correctAnswer: 1,
    explanation: "Your duty of care extends to future users of your installations. Faulty wiring installed today could harm someone in 20 years. This is why compliance with standards and regulations is so important."
  }
];

const faqs = [
  {
    question: "Can I be personally prosecuted for health and safety failings?",
    answer: "Yes. Under Section 37 of HSWA 1974, if an offence is committed with consent or connivance of, or is attributable to neglect by, any director, manager, or similar officer, that individual can be prosecuted alongside the organisation. Employees can also be prosecuted under Section 7 for failing to take reasonable care."
  },
  {
    question: "What's the difference between criminal and civil liability?",
    answer: "Criminal liability results from breaking health and safety law - prosecution is by HSE or local authority, leading to fines or imprisonment. Civil liability arises from negligence - claims are brought by injured parties seeking compensation. Both can apply to the same incident."
  },
  {
    question: "How does 'reasonably practicable' work in practice?",
    answer: "You weigh the risk (likelihood and severity of harm) against the cost, time, and effort of controlling it. If risk is high and controls are relatively cheap/easy, they must be implemented. You don't need to bankrupt yourself, but cost alone isn't a defence if risk is significant and controls are available."
  },
  {
    question: "Does duty of care apply to self-employed electricians?",
    answer: "Absolutely. Self-employed persons have duties under Section 3 (to others) and must also protect themselves. Being self-employed doesn't exempt you from duty of care - you're responsible for the safety of your work and anyone affected by it."
  },
  {
    question: "What if my employer tells me to do something unsafe?",
    answer: "You have a right and duty to refuse. Your duty of care includes not doing things you know are dangerous. Report the concern to your supervisor, safety representative, or HSE if necessary. The Employment Rights Act 1996 protects workers who refuse dangerous work."
  },
  {
    question: "How long does duty of care last after I've finished a job?",
    answer: "Indefinitely for the work you've done. If your installation causes harm years later due to defects you created, you could still be liable. This is why maintaining proper standards, keeping records, and having professional indemnity insurance matters."
  }
];

const Level3Module1Section6_1 = () => {
  useSEO(
    "Duty of Care - Level 3 Module 1 Section 6.1",
    "Legal and moral obligations to protect others in the workplace, employer and employee duties under UK health and safety law"
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">

      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/apprentice-courses/level-3-health-safety/module-1/section-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 6
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 1 Section 6.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Duty of Care
          </h1>
          <p className="text-white/80">
            Understanding your legal and moral obligations to protect others
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Legal duty:</strong> HSWA 1974 requires protection of all affected persons</li>
              <li><strong>Moral duty:</strong> Ethical obligation beyond legal minimums</li>
              <li><strong>Standard:</strong> So far as is reasonably practicable (SFAIRP)</li>
              <li><strong>Applies to:</strong> Employers, employees, self-employed, and contractors</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Situations where others could be harmed by your actions</li>
              <li><strong>Use:</strong> Risk assessment thinking - who could be affected?</li>
              <li><strong>Apply:</strong> Always consider future users of your installations</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Legal foundations of duty of care",
              "Employer duties under HSWA 1974",
              "Employee duties under Section 7",
              "The 'reasonably practicable' standard",
              "Civil and criminal liability",
              "Moral obligations beyond legal requirements"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: What is Duty of Care */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What is Duty of Care?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Duty of care is both a <strong>legal obligation</strong> and a <strong>moral responsibility</strong> to take reasonable steps to avoid causing foreseeable harm to others. It's a fundamental principle underpinning all health and safety law.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">The concept has two elements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Legal duty:</strong> Codified in statutes like HSWA 1974 and common law negligence</li>
                <li><strong>Moral duty:</strong> Ethical principle - protecting people because it's right, not just because it's law</li>
              </ul>
            </div>

            <p>
              The legal standard is <strong>so far as is reasonably practicable (SFAIRP)</strong>. This means weighing the risk against the cost, time, and effort needed to control it. High risks demand proportionally greater effort to control.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Duty of care isn't just about avoiding prosecution - it's about genuinely protecting people. Every installation you complete could affect someone's life.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Employer Duties */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Employer Duties Under HSWA 1974
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Health and Safety at Work etc. Act 1974 establishes the framework for employer duties. These are the cornerstone of UK health and safety law.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Section 2 - Duty to Employees</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Safe plant and systems of work</li>
                  <li>Safe handling, storage, and transport</li>
                  <li>Information, instruction, training, supervision</li>
                  <li>Safe workplace and access/egress</li>
                  <li>Safe working environment and welfare</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Section 3 - Duty to Others</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Contractors and their employees</li>
                  <li>Visitors to the workplace</li>
                  <li>Members of the public</li>
                  <li>Anyone affected by the undertaking</li>
                  <li>Future building occupants</li>
                </ul>
              </div>
            </div>

            <p>
              Section 4 extends duties to those in control of premises - they must ensure the premises and any plant/substances are safe for people using them, even if not their employees.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Key point:</strong> These duties apply 'so far as is reasonably practicable' - but where risk is high and controls are available, there's little room for argument about what's practicable.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Employee Duties */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Employee Duties
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Employees aren't passive recipients of protection - they have active legal duties under HSWA 1974 Sections 7 and 8.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Section 7 requires employees to:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Take reasonable care for their own health and safety</li>
                <li>Take reasonable care for the health and safety of others affected by their acts or omissions</li>
                <li>Cooperate with their employer on health and safety matters</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Section 8 prohibits employees from:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Intentionally or recklessly interfering with safety provisions</li>
                <li>Misusing anything provided for health, safety, or welfare</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> An electrician who removes guards from equipment, bypasses safety interlocks, or fails to isolate before working breaches these duties - regardless of whether an accident occurs.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Liability and Consequences */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Liability and Consequences
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Breach of duty of care can result in serious consequences - both for organisations and individuals. Understanding liability helps you appreciate why compliance matters.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-6 text-sm">
              <div className="p-3 rounded bg-red-900/20 border border-red-500/30">
                <p className="font-medium text-white mb-1">Criminal Liability</p>
                <p className="text-white/90 text-xs">Prosecution by HSE/Local Authority. Unlimited fines, imprisonment for individuals up to 2 years (manslaughter: life)</p>
              </div>
              <div className="p-3 rounded bg-orange-900/20 border border-orange-500/30">
                <p className="font-medium text-white mb-1">Civil Liability</p>
                <p className="text-white/90 text-xs">Claims by injured parties. Compensation for injury, loss of earnings, pain and suffering, ongoing care costs</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Elements of negligence (civil claim):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Duty:</strong> The defendant owed a duty of care to the claimant</li>
                <li><strong>Breach:</strong> The defendant failed to meet the required standard of care</li>
                <li><strong>Causation:</strong> The breach caused the harm suffered</li>
                <li><strong>Damage:</strong> The claimant suffered actual harm or loss</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> 'Vicarious liability' means employers are often liable for their employees' negligent acts. But this doesn't remove personal liability - individuals can be prosecuted too.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Demonstrating Duty of Care</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Follow safe systems of work and procedures</li>
                <li>Complete risk assessments before work</li>
                <li>Use and maintain appropriate PPE</li>
                <li>Report hazards and near misses</li>
                <li>Keep training and competence up to date</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Considering Others</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Think about who could be affected by your work</li>
                <li>Protect other trades working nearby</li>
                <li>Consider future occupants and maintenance workers</li>
                <li>Don't create hazards for others to deal with</li>
                <li>Communicate risks to those who need to know</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Assuming someone else will deal with it</strong> — If you see a hazard, you have a duty to act</li>
                <li><strong>Only thinking about immediate risks</strong> — Consider long-term and future users</li>
                <li><strong>Following bad examples</strong> — Copying unsafe practices makes you liable too</li>
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

        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Key HSWA Sections</p>
                <ul className="space-y-0.5">
                  <li>S2: Employer duty to employees</li>
                  <li>S3: Duty to non-employees</li>
                  <li>S7: Employee duties</li>
                  <li>S8: Duty not to interfere</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Civil Negligence Elements</p>
                <ul className="space-y-0.5">
                  <li>Duty owed</li>
                  <li>Breach of duty</li>
                  <li>Causation</li>
                  <li>Damage suffered</li>
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
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/apprentice-courses/level-3-health-safety/module-1/section-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 6
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/apprentice-courses/level-3-health-safety/module-1/section-6/6-2">
              Next: Accountability
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module1Section6_1;
