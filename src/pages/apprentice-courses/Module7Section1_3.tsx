import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Risks and Consequences of Electrical Faults - Module 7.1.3 | Level 2 Electrical Course";
const DESCRIPTION = "Understanding the safety, legal, and business risks associated with electrical faults and their potential consequences.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "What is the most serious direct safety risk from electrical faults?",
    options: ["Equipment damage", "Electric shock and electrocution", "Higher electricity bills", "Noisy equipment"],
    correctIndex: 1,
    explanation: "Electric shock and electrocution represent the most serious direct safety risks, potentially causing serious injury or death."
  },
  {
    id: 2,
    question: "What legal framework governs electrical safety in UK workplaces?",
    options: ["Building Regulations", "Electricity at Work Regulations 1989", "Health and Safety Act", "Fire Safety Order"],
    correctIndex: 1,
    explanation: "The Electricity at Work Regulations 1989 specifically govern electrical safety in UK workplaces and place legal duties on employers and employees."
  },
  {
    id: 3,
    question: "How can electrical faults impact business operations?",
    options: ["No impact on business", "Only affect electrical bills", "Cause production downtime and reputation damage", "Make equipment work better"],
    correctIndex: 2,
    explanation: "Electrical faults can cause significant production downtime, data loss, and damage to business reputation if not properly managed."
  }
];

const Module7Section1_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "What is the most serious direct safety risk from electrical faults?",
      options: ["Equipment damage", "Electric shock and electrocution", "Higher electricity bills", "Noisy equipment"],
      correctAnswer: 1,
      explanation: "Electric shock and electrocution represent the most serious direct safety risks, potentially causing serious injury or death."
    },
    {
      id: 2,
      question: "What percentage of UK workplace accidents involve electrical hazards according to HSE data?",
      options: ["Less than 1%", "Around 3%", "Over 10%", "Around 25%"],
      correctAnswer: 1,
      explanation: "HSE statistics show that electrical hazards are involved in approximately 3% of workplace accidents, representing over 1,000 incidents annually."
    },
    {
      id: 3,
      question: "What legal framework governs electrical safety in UK workplaces?",
      options: ["Building Regulations", "Electricity at Work Regulations 1989", "Health and Safety Act", "Fire Safety Order"],
      correctAnswer: 1,
      explanation: "The Electricity at Work Regulations 1989 specifically govern electrical safety in UK workplaces and place legal duties on employers and employees."
    },
    {
      id: 4,
      question: "What is the maximum fine for serious breaches of electrical safety regulations?",
      options: ["£1,000", "£10,000", "£50,000", "Unlimited"],
      correctAnswer: 3,
      explanation: "Serious breaches of electrical safety regulations can result in unlimited fines in Crown Court, plus potential imprisonment."
    },
    {
      id: 5,
      question: "What percentage of UK fires are caused by electrical faults?",
      options: ["Around 10%", "Around 20%", "Around 30%", "Around 50%"],
      correctAnswer: 2,
      explanation: "Approximately 30% of UK fires are caused by electrical faults, making it one of the leading causes of structural fires."
    },
    {
      id: 6,
      question: "How can electrical faults impact business operations?",
      options: ["No impact on business", "Only affect electrical bills", "Cause production downtime and reputation damage", "Make equipment work better"],
      correctAnswer: 2,
      explanation: "Electrical faults can cause significant production downtime, data loss, and damage to business reputation if not properly managed."
    },
    {
      id: 7,
      question: "What is arc flash and why is it dangerous?",
      options: ["A type of light bulb", "An explosive release of electrical energy", "Normal electrical operation", "A safety feature"],
      correctAnswer: 1,
      explanation: "Arc flash is an explosive release of electrical energy that can reach temperatures of 19,000°C and cause severe burns or death."
    },
    {
      id: 8,
      question: "Who can be held personally liable for electrical safety breaches?",
      options: ["Only company directors", "Only electricians", "Any employee with electrical responsibilities", "No one personally"],
      correctAnswer: 2,
      explanation: "Under EAWR 1989, any employee with electrical responsibilities can be held personally liable for safety breaches, facing fines and imprisonment."
    },
    {
      id: 9,
      question: "What should be the immediate response to discovering a serious electrical fault?",
      options: ["Continue working carefully", "Isolate the circuit and report immediately", "Fix it quickly", "Ignore if equipment still works"],
      correctAnswer: 1,
      explanation: "Serious electrical faults require immediate isolation of the circuit and reporting to prevent accidents and legal consequences."
    },
    {
      id: 10,
      question: "How do insurance companies typically respond to electrical fault-related claims?",
      options: ["Always pay full claims", "May reduce or refuse claims if proper maintenance wasn't carried out", "Insurance doesn't cover electrical faults", "Double the payout"],
      correctAnswer: 1,
      explanation: "Insurance companies may reduce or refuse claims if they find that proper electrical maintenance and testing wasn't carried out as required."
    }
  ];

  const faqs = [
    {
      question: "What is the most common cause of electrical accidents?",
      answer: "Contact with live parts due to poor isolation procedures or unidentified faults is the leading cause of electrical accidents in the workplace."
    },
    {
      question: "How much can electrical faults cost a business?",
      answer: "Costs can range from thousands for equipment damage to millions for major fire damage, plus legal costs, compensation claims, and lost business."
    },
    {
      question: "Can electrical faults affect insurance coverage?",
      answer: "Yes, insurance companies may refuse claims or increase premiums if they find that proper electrical maintenance and fault management wasn't carried out."
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
              <span className="text-white/70">Section 1.3</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Risks and Consequences of Electrical Faults
            </h1>
            <p className="text-white/70 max-w-xl mx-auto">
              Understanding the safety, legal, and business risks associated with electrical faults and their potential consequences.
            </p>
          </header>

          {/* Summary Box */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <p className="text-white/90 text-sm leading-relaxed">
              <strong className="text-elec-yellow">Key Points:</strong> Electrical faults can cause shock, fire, and property damage. Legal consequences include prosecution and liability. Business impacts include downtime and reputation damage.
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
                Electrical faults are not just technical problems—they represent serious risks that can have devastating consequences for safety, legal compliance, and business operations. Understanding these risks is essential for every electrician, as it drives the urgency and care required when dealing with electrical installations.
              </p>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-sm">
                  <strong className="text-elec-yellow">Why This Matters:</strong> HSE statistics show that electrical incidents cause over 1,000 workplace accidents annually in the UK, with approximately 30% of structural fires being electrical in origin.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm">
                  <strong className="text-elec-yellow">Industry Standard:</strong> BS 7671 requires that installations are safe for persons, livestock, and property. Any fault that compromises this safety must be treated as a priority requiring immediate action.
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
                <li>Identify immediate safety risks from electrical faults including shock, fire, and arc flash hazards.</li>
                <li>Understand legal and financial consequences of fault-related incidents including prosecution and liability.</li>
                <li>Recognise impacts on business operations including downtime, data loss, and reputation damage.</li>
                <li>Appreciate why immediate action is required when faults are discovered to prevent escalation.</li>
                <li>Evaluate the cost-benefit relationship between preventive maintenance and incident response.</li>
                <li>Apply risk assessment principles to electrical fault scenarios in different environments.</li>
              </ul>
            </div>
          </section>

          {/* Safety Risks */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Safety Risks
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Electrical faults pose immediate and serious safety risks that can result in injury or death. Understanding these risks is crucial for maintaining workplace safety and protecting both workers and the general public.
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-1">Electric Shock</p>
                  <p className="text-sm text-white/70">Direct contact with live parts can cause cardiac arrest and death</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-1">Fire Hazards</p>
                  <p className="text-sm text-white/70">Overheating and arcing can ignite surrounding materials</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-1">Arc Flash</p>
                  <p className="text-sm text-white/70">Explosive energy release reaching 19,000°C temperatures</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-1">Secondary Injuries</p>
                  <p className="text-sm text-white/70">Falls, burns, and trauma from shock incidents</p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">HSE Statistics:</p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-white/70">
                  <li>Over 1,000 electrical workplace accidents annually in the UK</li>
                  <li>Approximately 30% of UK structural fires are electrical in origin</li>
                  <li>Voltages as low as 50V can be lethal under certain conditions</li>
                  <li>Electric shock is the leading cause of electrical workplace fatalities</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
                <p className="text-sm">
                  <strong className="text-red-400">Critical Understanding:</strong> Electrical faults create unpredictable hazards that can escalate rapidly. Even apparently minor faults can become life-threatening under certain conditions, making immediate action essential.
                </p>
              </div>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck
              id="safety-risks-check"
              question={quickCheckQuestions[0].question}
              options={quickCheckQuestions[0].options}
              correctIndex={quickCheckQuestions[0].correctIndex}
              explanation={quickCheckQuestions[0].explanation}
            />
          </div>

          {/* Legal and Financial Consequences */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Legal and Financial Consequences
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Electrical faults that cause injury or damage can result in severe legal and financial penalties.
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-2">Criminal Prosecution</p>
                  <ul className="list-disc pl-4 space-y-1 text-sm text-white/70">
                    <li>Electricity at Work Regulations 1989 breaches</li>
                    <li>Health and Safety at Work Act violations</li>
                    <li>Corporate manslaughter in severe cases</li>
                    <li>Unlimited fines and imprisonment possible</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-2">Civil Liability</p>
                  <ul className="list-disc pl-4 space-y-1 text-sm text-white/70">
                    <li>Compensation claims for injury and damage</li>
                    <li>Property damage costs</li>
                    <li>Loss of earnings claims</li>
                    <li>Legal costs and expert witness fees</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Financial Impact:</p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-white/70">
                  <li><strong>Fines:</strong> Unlimited in Crown Court for serious EAWR breaches</li>
                  <li><strong>Compensation:</strong> Can reach millions for serious injury cases</li>
                  <li><strong>Insurance:</strong> Policies may be invalidated if proper maintenance not carried out</li>
                  <li><strong>Property damage:</strong> Fire damage can cost millions to rectify</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-amber-500/10 border-l-2 border-amber-500/50">
                <p className="text-sm">
                  <strong className="text-amber-400">Important Note:</strong> Personal liability applies to individuals as well as companies. Electricians can face personal prosecution, fines, and imprisonment for safety breaches under EAWR 1989.
                </p>
              </div>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck
              id="legal-consequences-check"
              question={quickCheckQuestions[1].question}
              options={quickCheckQuestions[1].options}
              correctIndex={quickCheckQuestions[1].correctIndex}
              explanation={quickCheckQuestions[1].explanation}
            />
          </div>

          {/* Business Impact */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Impact on Business Operations and Reputation
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Electrical faults can severely disrupt business operations and cause lasting damage to reputation.
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-1">Production Losses</p>
                  <p className="text-sm text-white/70">Equipment downtime, missed deadlines, and lost production capacity</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-1">Data Loss</p>
                  <p className="text-sm text-white/70">Power surges and outages causing data corruption and system failures</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-1">Reputation Damage</p>
                  <p className="text-sm text-white/70">Public incidents damaging company reputation and customer confidence</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-1">Regulatory Scrutiny</p>
                  <p className="text-sm text-white/70">Increased inspection and monitoring by HSE and other authorities</p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-purple-500/10 border-l-2 border-purple-500/50">
                <p className="text-sm">
                  <strong className="text-purple-400">Long-term Consequences:</strong> Business impact extends beyond immediate costs. Loss of customer confidence, difficulty obtaining insurance, and regulatory restrictions can affect operations for years after an electrical incident.
                </p>
              </div>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck
              id="business-impact-check"
              question={quickCheckQuestions[2].question}
              options={quickCheckQuestions[2].options}
              correctIndex={quickCheckQuestions[2].correctIndex}
              explanation={quickCheckQuestions[2].explanation}
            />
          </div>

          {/* Practical Guidance */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Practical Guidance
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div>
                <p className="font-medium text-white mb-2">Risk Assessment and Management:</p>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>Treat all electrical faults as potential safety hazards until proven otherwise.</li>
                  <li>Isolate faulty circuits immediately and secure against unauthorised energisation.</li>
                  <li>Assess the potential for escalation and take appropriate precautions.</li>
                  <li>Communicate risks clearly to all affected parties.</li>
                </ul>
              </div>

              <div>
                <p className="font-medium text-white mb-2">Legal Compliance:</p>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>Document all faults and corrective actions taken with timestamps and details.</li>
                  <li>Report serious faults to supervisors and duty holders immediately.</li>
                  <li>Ensure compliance with EAWR 1989 and BS 7671 requirements.</li>
                  <li>Maintain evidence of due diligence through proper record keeping.</li>
                </ul>
              </div>

              <div>
                <p className="font-medium text-white mb-2">Business Protection:</p>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>Prioritise safety over production deadlines or convenience.</li>
                  <li>Implement proper fault management procedures and training.</li>
                  <li>Maintain appropriate insurance coverage with proper electrical maintenance records.</li>
                  <li>Establish clear communication channels for reporting electrical hazards.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Real-World Example */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Real-World Example
            </h2>
            <div className="p-4 rounded-lg bg-amber-500/10 border-l-2 border-amber-500/50">
              <p className="font-medium text-white mb-3">Case Study: Manufacturing Plant Fire</p>
              <div className="text-white/80 space-y-3 text-sm leading-relaxed">
                <p>
                  A manufacturing plant ignored a recurring earth fault indication on their main distribution board for several weeks, assuming it was a "nuisance trip." The fault eventually escalated when moisture ingress combined with the existing earth fault to create a sustained arc. The resulting fire destroyed a significant portion of the facility, injured two employees, and led to a six-month production shutdown.
                </p>
                <p>
                  <strong>Consequences:</strong> The company faced £2.4 million in direct fire damage, £1.8 million in lost production, £500,000 in legal costs, and unlimited fines for EAWR 1989 breaches. Two employees required hospital treatment for smoke inhalation, and the company's insurance claim was partially rejected due to inadequate electrical maintenance records.
                </p>
                <p>
                  <strong>The Reality:</strong> What started as a minor earth fault that could have been corrected for a few hundred pounds ultimately cost the business over £5 million and resulted in criminal prosecution of the facilities manager.
                </p>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">08</span>
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
              <span className="text-elec-yellow/80 text-sm font-normal">09</span>
              Recap
            </h2>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <ul className="list-disc pl-5 space-y-2 text-white/80 text-sm">
                <li>Electrical faults pose serious safety risks including shock, fire, and arc flash hazards that can cause injury or death.</li>
                <li>Legal consequences include prosecution under EAWR 1989 with unlimited fines, imprisonment, and civil liability for damages.</li>
                <li>Business impacts include production losses, data loss, reputation damage, and long-term regulatory scrutiny.</li>
                <li>Immediate action is required when faults are discovered to prevent escalation and protect people, property, and business operations.</li>
              </ul>
            </div>
          </section>

          {/* Quiz */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">10</span>
              Quiz
            </h2>
            <Quiz questions={quizQuestions} title="Risks and Consequences of Electrical Faults" />
          </section>

          {/* Navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
            <Button
              variant="ghost"
              className="min-h-[48px] touch-manipulation active:scale-[0.98] text-white/70 hover:text-white hover:bg-white/5 justify-start"
              asChild
            >
              <Link to="../1-2">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Why Faults Occur
              </Link>
            </Button>
            <Button
              className="min-h-[48px] touch-manipulation active:scale-[0.98] bg-elec-yellow text-black hover:bg-elec-yellow/90 justify-center sm:justify-end"
              asChild
            >
              <Link to="../1-4">
                Fault Categories
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module7Section1_3;
