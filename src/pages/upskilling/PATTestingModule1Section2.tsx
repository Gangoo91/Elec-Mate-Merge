import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Legal Duties (EAWR, PUWER, H&S at Work Act) - PAT Testing Module 1";
const DESCRIPTION = "Understand the legal framework for PAT testing including EAWR, PUWER, and Health and Safety at Work Act requirements, employer duties, and compliance obligations.";

const quickCheckQuestions = [
  {
    id: "eawr-meaning",
    question: "What does EAWR stand for?",
    options: [
      "Electrical Appliance Work Regulations",
      "Electricity at Work Regulations",
      "Electronic Apparatus Work Rules",
      "Electrical Application Work Requirements"
    ],
    correctIndex: 1,
    explanation: "EAWR stands for Electricity at Work Regulations 1989, which place duties on employers to ensure electrical equipment is maintained and operated safely."
  },
  {
    id: "pat-legal-status",
    question: "Is PAT testing specifically named as a legal requirement in UK legislation?",
    options: [
      "Yes, it's explicitly required by EAWR",
      "Yes, it's specifically named in PUWER",
      "No, but it supports compliance with EAWR and PUWER",
      "Only for certain high-risk industries"
    ],
    correctIndex: 2,
    explanation: "PAT testing isn't specifically named in legislation, but it's widely recognised as an effective way to comply with EAWR and PUWER requirements for equipment safety."
  },
  {
    id: "eawr-regulation",
    question: "Which EAWR regulation specifically requires equipment to be maintained to prevent danger?",
    options: [
      "Regulation 3",
      "Regulation 4",
      "Regulation 5",
      "Regulation 16"
    ],
    correctIndex: 2,
    explanation: "Regulation 5 of EAWR requires that electrical equipment is maintained in a condition to prevent danger, which PAT testing directly supports."
  },
  {
    id: "personal-liability",
    question: "Who can be held personally liable for electrical safety breaches?",
    options: [
      "Only the company as a legal entity",
      "Directors, managers, and safety officers with responsibility",
      "Just the person who was using the faulty equipment",
      "Only if they personally caused the equipment damage"
    ],
    correctIndex: 1,
    explanation: "Directors, managers, and those with safety responsibilities can face personal liability, prosecution, and potential imprisonment for safety breaches under their control."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What does EAWR stand for in UK electrical safety legislation?",
    options: [
      "Electrical Appliance Work Regulations",
      "Electricity at Work Regulations",
      "Electronic Apparatus Work Rules",
      "Electrical Application Work Requirements"
    ],
    correctAnswer: 1,
    explanation: "EAWR stands for Electricity at Work Regulations 1989, which place duties on employers to ensure electrical equipment is maintained and operated safely."
  },
  {
    id: 2,
    question: "Which law places the primary general duties on employers for workplace safety?",
    options: [
      "EAWR 1989",
      "PUWER 1998",
      "Health and Safety at Work Act 1974",
      "Management of Health and Safety Regulations 1999"
    ],
    correctAnswer: 2,
    explanation: "The Health and Safety at Work Act 1974 places general duties on employers to ensure the health, safety and welfare of employees and others affected by work activities."
  },
  {
    id: 3,
    question: "Is PAT testing specifically named as a legal requirement in UK legislation?",
    options: [
      "Yes, it's explicitly required by EAWR",
      "Yes, it's specifically named in PUWER",
      "No, but it supports compliance with EAWR and PUWER",
      "Only for certain high-risk industries"
    ],
    correctAnswer: 2,
    explanation: "PAT testing isn't specifically named in legislation, but it's widely recognised as an effective way to comply with EAWR and PUWER requirements for equipment safety."
  },
  {
    id: 4,
    question: "What can happen if faulty equipment causes injury and there's no evidence of proper maintenance?",
    options: [
      "Nothing, if it was genuinely accidental",
      "HSE investigation, prosecution, fines, and insurance claims may be denied",
      "Only a small administrative fine",
      "Just equipment replacement costs"
    ],
    correctAnswer: 1,
    explanation: "Serious consequences can include HSE investigation, prosecution with unlimited fines, insurance claim refusal, and personal liability for directors and managers."
  },
  {
    id: 5,
    question: "Which EAWR regulation specifically requires equipment to be maintained to prevent danger?",
    options: [
      "Regulation 3",
      "Regulation 4",
      "Regulation 5",
      "Regulation 16"
    ],
    correctAnswer: 2,
    explanation: "Regulation 5 of EAWR requires that electrical equipment is maintained in a condition to prevent danger, which PAT testing directly supports."
  },
  {
    id: 6,
    question: "What is a key benefit of maintaining detailed PAT testing records?",
    options: [
      "It reduces the frequency of future testing requirements",
      "Demonstrates due diligence and supports legal compliance",
      "It's only needed for insurance claim purposes",
      "Records aren't necessary if equipment passes all tests"
    ],
    correctAnswer: 1,
    explanation: "Detailed PAT testing records demonstrate due diligence, prove legal compliance, and provide essential evidence for regulatory inspections and potential legal proceedings."
  },
  {
    id: 7,
    question: "Under PUWER 1998, what is required regarding work equipment maintenance?",
    options: [
      "Equipment must be maintained only when it breaks down",
      "Equipment must be maintained in efficient working order and good repair",
      "Maintenance is only required for mechanical equipment",
      "PUWER doesn't cover electrical equipment"
    ],
    correctAnswer: 1,
    explanation: "PUWER Regulation 5 requires that work equipment is maintained in an efficient state, in efficient working order and in good repair - which electrical PAT testing supports."
  },
  {
    id: 8,
    question: "What enforcement powers does the HSE have under EAWR?",
    options: [
      "Only advisory notices and guidance",
      "Improvement notices, prohibition notices, and prosecution",
      "Just financial penalties up to £5,000",
      "Only powers to close businesses temporarily"
    ],
    correctAnswer: 1,
    explanation: "HSE has extensive powers including improvement notices, prohibition notices, prosecution in magistrates' or crown courts with unlimited fines, and potential imprisonment."
  },
  {
    id: 9,
    question: "How can PAT testing help with insurance requirements?",
    options: [
      "Insurance companies don't consider electrical safety",
      "It may reduce premiums and supports claim validity",
      "PAT testing automatically voids all insurance requirements",
      "Only affects building insurance, not liability coverage"
    ],
    correctAnswer: 1,
    explanation: "Many insurers offer premium discounts for proper PAT testing programmes and may refuse claims where negligent maintenance contributed to incidents."
  },
  {
    id: 10,
    question: "Who can be held personally liable for electrical safety breaches?",
    options: [
      "Only the company as a legal entity",
      "Directors, managers, and safety officers with responsibility",
      "Just the person who was using the faulty equipment",
      "Only if they personally caused the equipment damage"
    ],
    correctAnswer: 1,
    explanation: "Directors, managers, and those with safety responsibilities can face personal liability, prosecution, and potential imprisonment for safety breaches under their control."
  }
];

const faqs = [
  {
    question: "Does PAT testing have to be done by a qualified electrician?",
    answer: "No, PAT testing doesn't legally require a qualified electrician. However, the person must be 'competent' - meaning they have sufficient training, knowledge, and experience to conduct tests safely and interpret results correctly. Many organisations use trained in-house staff or specialist PAT testing companies."
  },
  {
    question: "What happens if we don't do PAT testing?",
    answer: "Without PAT testing, you may be unable to demonstrate compliance with EAWR and PUWER. If an incident occurs, you could face HSE prosecution with unlimited fines, insurance claim rejection, civil liability claims, and reputational damage. Directors may face personal liability."
  },
  {
    question: "Are there specific penalties for not doing PAT testing?",
    answer: "There's no specific penalty for not doing PAT testing itself. However, if equipment causes harm and you can't demonstrate proper maintenance, penalties under EAWR can include unlimited fines and up to 2 years imprisonment. Civil claims can run to millions of pounds."
  },
  {
    question: "Does the law specify how often to PAT test?",
    answer: "No, legislation doesn't specify testing frequencies. Instead, it requires equipment to be maintained in safe condition. The IET Code of Practice provides guidance on risk-based frequencies ranging from 3 months (construction tools) to 4 years (IT equipment in offices)."
  },
  {
    question: "Can employees refuse to use equipment that hasn't been PAT tested?",
    answer: "Employees have a legal right to refuse work they reasonably believe poses serious and imminent danger. If equipment hasn't been tested and appears unsafe, they may legitimately refuse to use it. Employers should address these concerns promptly."
  },
  {
    question: "What records must we keep for PAT testing?",
    answer: "While legislation doesn't specify exact records, you should maintain a register of all equipment tested, test dates and results, any repairs made, and tester details. Records should be kept for at least the life of the equipment and ideally for several years beyond."
  }
];

const PATTestingModule1Section2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/pat-testing-module-1">
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
            <span>Module 1 Section 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Legal Duties (EAWR, PUWER, H&amp;S at Work Act)
          </h1>
          <p className="text-white/80">
            Understanding the legal framework for electrical safety compliance
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>EAWR 1989:</strong> Electrical equipment safety duties</li>
              <li><strong>PUWER 1998:</strong> Work equipment maintenance</li>
              <li><strong>HASAWA 1974:</strong> General safety duties</li>
              <li><strong>PAT:</strong> Supports compliance with all three</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Legal requirements in your workplace</li>
              <li><strong>Use:</strong> PAT to demonstrate due diligence</li>
              <li><strong>Apply:</strong> Documentation for compliance evidence</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify key legislation relevant to PAT testing obligations",
              "Understand employer and employee duties under health and safety law",
              "Recognise enforcement mechanisms and penalties for non-compliance",
              "Learn why PAT testing supports legal compliance",
              "Explain the role of risk assessment in meeting legal obligations",
              "Understand personal liability exposure for managers and directors"
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

        {/* Section 1: The Legal Landscape */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            The Legal Landscape
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              PAT testing isn't just good practice — it's underpinned by robust UK legislation designed to protect workers and the public from electrical hazards.
              Understanding this legal framework is essential for anyone responsible for electrical safety in the workplace.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">The integrated legal foundation:</p>
              <p className="text-sm text-white mb-4">
                While PAT testing isn't explicitly named in UK legislation, it's widely recognised by courts, regulators, and legal experts as an effective method
                of complying with several key pieces of health and safety law. These laws create interlocking duties that PAT testing helps fulfil comprehensively.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-elec-yellow mb-1">EAWR 1989</p>
                <p className="text-sm text-white">Electrical equipment safety duties, maintenance requirements, competency standards</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-elec-yellow mb-1">PUWER 1998</p>
                <p className="text-sm text-white">Work equipment maintenance, inspection, systematic management requirements</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-elec-yellow mb-1">HASAWA 1974</p>
                <p className="text-sm text-white">General safety duties, risk management, overall workplace safety responsibilities</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: EAWR Detailed */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Electricity at Work Regulations 1989 (EAWR)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              EAWR is the primary legislation governing electrical safety in the workplace. It places specific duties on employers and employees
              regarding the construction, maintenance, and operation of electrical systems.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key EAWR Requirements:</p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-elec-yellow font-bold text-sm mt-0.5">4</span>
                  <div>
                    <p className="text-sm text-white"><strong>Regulation 4 - Systems and Work Activities:</strong> All electrical systems must be constructed, maintained, and operated to prevent danger.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-elec-yellow font-bold text-sm mt-0.5">5</span>
                  <div>
                    <p className="text-sm text-white"><strong>Regulation 5 - Strength and Capability:</strong> Equipment must be of such construction and maintained in such condition as to prevent danger.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-elec-yellow font-bold text-sm mt-0.5">16</span>
                  <div>
                    <p className="text-sm text-white"><strong>Regulation 16 - Competent Persons:</strong> No person shall be engaged in work where technical knowledge or experience is necessary unless they possess such knowledge.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">How PAT testing supports EAWR compliance:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Systematic maintenance:</strong> PAT provides structured method to ensure equipment is regularly inspected and maintained</li>
                <li><strong>Auditable documentation:</strong> Detailed records provide legally robust evidence of compliance efforts</li>
                <li><strong>Competency demonstration:</strong> PAT testing by trained persons satisfies Regulation 16 requirements</li>
                <li><strong>Preventive risk management:</strong> Regular testing identifies deteriorating equipment before failure</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: PUWER */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Provision and Use of Work Equipment Regulations 1998 (PUWER)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              PUWER applies comprehensively to all work equipment, including portable electrical appliances. It requires employers to ensure
              equipment is suitable for its intended use and maintained in safe working condition.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key PUWER Requirements:</p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-elec-yellow font-bold text-sm mt-0.5">5</span>
                  <div>
                    <p className="text-sm text-white"><strong>Regulation 5 - Maintenance:</strong> Equipment must be maintained in an efficient state, efficient working order, and good repair.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-elec-yellow font-bold text-sm mt-0.5">6</span>
                  <div>
                    <p className="text-sm text-white"><strong>Regulation 6 - Inspection:</strong> Where maintenance logs are required, they must be kept up to date with inspection and testing records.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div>
                <p className="text-sm font-medium text-white mb-2">Equipment Coverage</p>
                <p className="text-sm text-white">PUWER applies to all work equipment including portable electrical appliances. PAT testing directly supports compliance by ensuring equipment remains safe and functional.</p>
              </div>
              <div>
                <p className="text-sm font-medium text-white mb-2">Maintenance Documentation</p>
                <p className="text-sm text-white">The detailed documentation from PAT testing satisfies PUWER requirements for maintenance logs and provides legally robust evidence of systematic equipment management.</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Health and Safety at Work Act */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Health and Safety at Work Act 1974
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              HASAWA provides the overarching framework for workplace safety in the UK. It places general duties on employers that underpin
              more specific regulations like EAWR and PUWER.
            </p>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">Section 2 - Employer Duties:</p>
              <p className="text-sm text-white italic mb-3">
                "It shall be the duty of every employer to ensure, so far as is reasonably practicable, the health, safety and welfare at work of all his employees."
              </p>
              <ul className="text-sm text-white space-y-1">
                <li>Provision and maintenance of safe systems of work</li>
                <li>Safe use, handling, storage and transport of articles and substances</li>
                <li>Provision of information, instruction, training and supervision</li>
                <li>Maintenance of safe workplace and safe access/egress</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div>
                <p className="text-sm font-medium text-white mb-2">"So Far As Is Reasonably Practicable"</p>
                <p className="text-sm text-white">This key legal test balances risk against cost and effort. Given the low cost and high effectiveness of PAT testing, courts generally consider it "reasonably practicable" for most organisations.</p>
              </div>
              <div>
                <p className="text-sm font-medium text-white mb-2">Due Diligence Defence</p>
                <p className="text-sm text-white">Comprehensive PAT testing programmes provide strong evidence of due diligence, demonstrating that reasonable steps were taken to prevent incidents.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Consequences of Non-Compliance */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Consequences of Non-Compliance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-white mb-2">Criminal Law Penalties</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Unlimited fines in Crown Court proceedings</li>
                  <li>Up to £20,000 fine per offence in Magistrates' Court</li>
                  <li>Imprisonment up to 2 years for serious breaches</li>
                  <li>Director disqualification under Company Directors Act</li>
                  <li>Personal liability for safety officers and managers</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-white mb-2">Civil and Business Impact</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Insurance claims refused or reduced</li>
                  <li>Business closure and prohibition orders</li>
                  <li>Reputational damage and media exposure</li>
                  <li>Civil compensation claims from victims</li>
                  <li>Loss of contracts and commercial opportunities</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Case Study Examples:</p>
              <div className="space-y-3">
                <div className="p-3 rounded bg-transparent border border-white/10">
                  <p className="text-sm text-elec-yellow font-medium">Manufacturing Company (2019)</p>
                  <p className="text-sm text-white">Fined £120,000 after employee electrocuted by faulty portable drill. No PAT testing programme existed, equipment hadn't been inspected for 4 years.</p>
                </div>
                <div className="p-3 rounded bg-transparent border border-white/10">
                  <p className="text-sm text-elec-yellow font-medium">Educational Institution (2020)</p>
                  <p className="text-sm text-white">Fined £45,000 after student received electric shock from defective power tool. Visual inspection only - no electrical testing - missed earth continuity fault.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 6: Insurance and Commercial Impact */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Insurance and Commercial Implications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-white mb-2">Insurance Benefits of PAT Testing</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Premium discounts up to 15% for comprehensive programmes</li>
                  <li>Improved claims handling and faster settlements</li>
                  <li>Enhanced coverage terms and higher limits available</li>
                  <li>Reduced policy excesses for electrical claims</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-white mb-2">Risks of Non-Compliance</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Claims rejection for negligent maintenance</li>
                  <li>Increased premiums and restricted coverage</li>
                  <li>Higher policy excesses and deductibles</li>
                  <li>Difficulty obtaining comprehensive coverage</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Commercial and Contractual Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Government contracts mandate PAT compliance</li>
                <li>Major corporations require contractor PAT certification</li>
                <li>Healthcare facilities have strict electrical safety requirements</li>
                <li>Tender submissions frequently require PAT testing evidence</li>
              </ul>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">For Legal Compliance</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Implement systematic PAT testing programme covering all portable equipment</li>
                <li>Maintain comprehensive records of all tests, results, and actions taken</li>
                <li>Ensure testers are competent with documented training</li>
                <li>Review and update testing frequencies based on risk assessment</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">For Documentation</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Keep equipment register with unique identification for each item</li>
                <li>Record test dates, results, tester details, and next test due dates</li>
                <li>Document any repairs, modifications, or equipment removed from service</li>
                <li>Retain records for at least the life of the equipment</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Compliance Mistakes</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Assuming compliance</strong> — always verify testing is actually being done</li>
                <li><strong>Poor record keeping</strong> — records are essential for demonstrating due diligence</li>
                <li><strong>Untrained testers</strong> — competence requirements apply to all testers</li>
                <li><strong>Ignoring failed equipment</strong> — must be removed from service immediately</li>
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
                <p className="font-medium text-white mb-1">Key Legislation</p>
                <ul className="space-y-0.5">
                  <li>EAWR 1989 - Electrical equipment safety</li>
                  <li>PUWER 1998 - Work equipment maintenance</li>
                  <li>HASAWA 1974 - General safety duties</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Penalties</p>
                <ul className="space-y-0.5">
                  <li>Unlimited fines in Crown Court</li>
                  <li>Up to 2 years imprisonment</li>
                  <li>Personal liability for directors</li>
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
            <Link to="../section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-3">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default PATTestingModule1Section2;
