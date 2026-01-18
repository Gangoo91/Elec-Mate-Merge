/**
 * Level 3 Module 1 Section 1.1 - Health & Safety at Work Act (HASAWA) 1974
 *
 * Design pattern: Level3ContentTemplate.tsx
 * Dark theme with elec-yellow accent
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

// ============================================
// SEO CONFIGURATION
// ============================================
const TITLE = "Health & Safety at Work Act (HASAWA) 1974 - Level 3 Module 1 Section 1.1";
const DESCRIPTION = "Master the foundation of UK workplace health and safety law. Learn employer duties under Section 2, employee responsibilities under Sections 7 and 8, and HSE enforcement powers.";

// ============================================
// INLINE CHECK QUESTIONS
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "Under Section 2(2)(c), what must employers provide to ensure employee safety?",
    options: [
      "Higher wages and bonuses",
      "Information, instruction, training and supervision",
      "Unlimited overtime opportunities",
      "Company vehicles for all staff"
    ],
    correctIndex: 1,
    explanation: "Section 2(2)(c) specifically requires employers to provide such information, instruction, training and supervision as is necessary to ensure health and safety at work."
  },
  {
    id: "check-2",
    question: "An electrician is instructed by their supervisor to work on a live 400V distribution board without isolation. What should they do?",
    options: [
      "Follow the supervisor's instructions",
      "Refuse as they have a personal duty under Section 7 to take reasonable care",
      "Do it quickly to minimise risk",
      "Ask a colleague to do it instead"
    ],
    correctIndex: 1,
    explanation: "Section 7 places a personal duty on employees to take reasonable care. 'Following orders' is not a defence if they knowingly work unsafely."
  },
  {
    id: "check-3",
    question: "What is the key difference between an Improvement Notice and a Prohibition Notice?",
    options: [
      "There is no difference",
      "Improvement notices stop work immediately; prohibition notices give time to improve",
      "Improvement notices give time to rectify; prohibition notices stop work immediately",
      "Both allow unlimited time to comply"
    ],
    correctIndex: 2,
    explanation: "Improvement notices require action within a specified timeframe (minimum 21 days), while Prohibition notices stop work immediately where there is risk of serious injury."
  },
  {
    id: "check-4",
    question: "Why is training particularly important under HASAWA for electrical contractors?",
    options: [
      "It's not legally required",
      "Employers must ensure workers are competent before allowing them to work on electrical systems",
      "Only apprentices need training",
      "Training is optional if workers are experienced"
    ],
    correctIndex: 1,
    explanation: "Under Section 2(2)(c), employers must provide adequate training. For electrical work, this means ensuring competence before allowing work on electrical systems."
  }
];

// ============================================
// QUIZ QUESTIONS
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "Under Section 2 of HASAWA 1974, what is the employer's primary duty?",
    options: [
      "To provide unlimited breaks for employees",
      "To ensure, so far as is reasonably practicable, the health, safety and welfare of employees",
      "To provide only basic hand tools",
      "To allow flexible working hours for all staff"
    ],
    correctAnswer: 1,
    explanation: "Section 2 requires employers to ensure, so far as is reasonably practicable, the health, safety and welfare at work of all their employees. This is the cornerstone of employer duties."
  },
  {
    id: 2,
    question: "What does Section 7 of HASAWA require employees to do?",
    options: [
      "Work overtime when requested by supervisors",
      "Take reasonable care for their own health and safety and that of others",
      "Provide their own PPE at all times",
      "Report directly to the HSE for all concerns"
    ],
    correctAnswer: 1,
    explanation: "Section 7 places a duty on employees to take reasonable care for the health and safety of themselves and other persons who may be affected by their acts or omissions at work."
  },
  {
    id: 3,
    question: "Under Section 8, what must employees NOT do?",
    options: [
      "Take regular rest breaks",
      "Intentionally interfere with or misuse safety provisions",
      "Report hazards to supervisors",
      "Wear company uniform on site"
    ],
    correctAnswer: 1,
    explanation: "Section 8 makes it an offence to intentionally or recklessly interfere with or misuse anything provided for health and safety purposes, such as safety guards, RCDs, or warning signs."
  },
  {
    id: 4,
    question: "What maximum penalty can be imposed for serious HASAWA breaches causing death?",
    options: [
      "A written warning only",
      "Fine up to £5,000",
      "Unlimited fine and up to 2 years imprisonment",
      "Loss of the contract only"
    ],
    correctAnswer: 2,
    explanation: "Serious breaches of HASAWA can result in unlimited fines and up to 2 years imprisonment, particularly where there has been gross negligence or a death has occurred."
  },
  {
    id: 5,
    question: "Under Section 37, who can be personally liable for health and safety offences?",
    options: [
      "Only the company as a legal entity",
      "Directors and managers if offence committed with their consent or connivance",
      "Only the employee who directly caused the accident",
      "The client who commissioned the work"
    ],
    correctAnswer: 1,
    explanation: "Section 37 allows directors and managers to be prosecuted personally if an offence is committed with their consent, connivance, or due to their neglect."
  },
  {
    id: 6,
    question: "An electrician works on a live distribution board without proper isolation. Which section of HASAWA are they potentially breaching?",
    options: [
      "Section 2 - Employer duties only",
      "Section 7 - Employee duty to take reasonable care",
      "Section 37 - Director liability only",
      "Section 4 - Premises duties only"
    ],
    correctAnswer: 1,
    explanation: "Working live without proper justification and precautions breaches Section 7 as the electrician is not taking reasonable care for their own health and safety."
  },
  {
    id: 7,
    question: "What power does the HSE have under HASAWA if they find unsafe electrical work in progress?",
    options: [
      "They can only give verbal advice",
      "Issue improvement notices or prohibition notices",
      "Only write reports for future reference",
      "Nothing until someone is actually injured"
    ],
    correctAnswer: 1,
    explanation: "HSE inspectors can issue improvement notices requiring action within a timeframe, or prohibition notices stopping work immediately if there is serious risk."
  },
  {
    id: 8,
    question: "Which of the following is an employer duty under Section 2 particularly relevant to electrical work?",
    options: [
      "Providing free lunches on site",
      "Providing information, instruction, training and supervision",
      "Allowing employees to choose their own hours",
      "Paying overtime automatically for all work"
    ],
    correctAnswer: 1,
    explanation: "Section 2(2)(c) specifically requires employers to provide such information, instruction, training and supervision as is necessary to ensure health and safety."
  },
  {
    id: 9,
    question: "A contractor removes a padlock from a distribution board isolation device because they lost their key. Which section do they breach?",
    options: [
      "Section 2 only",
      "Section 7 only",
      "Section 8 - Interfering with safety provisions",
      "Section 37 only"
    ],
    correctAnswer: 2,
    explanation: "Section 8 makes it an offence to interfere with or misuse anything provided for health and safety. Locks on distribution boards and isolation devices are safety provisions."
  },
  {
    id: 10,
    question: "What does 'so far as is reasonably practicable' mean under HASAWA?",
    options: [
      "Do whatever is easiest and quickest",
      "Balance the risk against the cost, time and effort of eliminating it",
      "Only do what the client specifically pays for",
      "Ignore minor hazards if they seem unlikely"
    ],
    correctAnswer: 1,
    explanation: "Reasonably practicable means weighing the risk against the sacrifice (cost, time, trouble) needed to avert it. If the risk is high, the cost of precautions is usually justified."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "Can I be personally prosecuted even if my employer told me to work unsafely?",
    answer: "Yes. Section 7 places a personal duty on every employee. 'Following orders' is not a defence if you knowingly acted in an unsafe manner. Both you and your employer could face prosecution."
  },
  {
    question: "What does 'so far as is reasonably practicable' mean in practice?",
    answer: "It means weighing the risk against the cost, time and effort of eliminating it. If the risk is high (like electrocution), extensive measures are required. Cost alone is rarely a valid excuse for not controlling serious electrical risks."
  },
  {
    question: "Can HSE inspectors enter my workplace without an appointment?",
    answer: "Yes. HSE inspectors have the power to enter any workplace at any reasonable time without prior notice. They can inspect, investigate, take samples and photographs, and require production of documents."
  },
  {
    question: "What should I do if I witness a colleague bypassing safety equipment?",
    answer: "Report it immediately to your supervisor or health and safety representative. Under Section 7, you have a duty to cooperate on safety matters. Ignoring such breaches could make you complicit if an accident occurs."
  },
  {
    question: "Does HASAWA apply to self-employed electricians?",
    answer: "Yes. Section 3 places duties on self-employed persons to conduct their undertaking so that they and others are not exposed to risks. The same principles of safe working apply whether employed or self-employed."
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module1Section1_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">

      {/* STICKY HEADER */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module1-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* MAIN ARTICLE CONTENT */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* HEADER */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 1.1.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Health & Safety at Work Act 1974
          </h1>
          <p className="text-white/80">
            The foundation legislation for workplace health and safety in the UK
          </p>
        </header>

        {/* QUICK SUMMARY BOXES */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Section 2:</strong> Employers must ensure health, safety and welfare of employees</li>
              <li><strong>Section 7:</strong> Employees must take reasonable care for themselves and others</li>
              <li><strong>Section 8:</strong> Do not interfere with or misuse safety provisions</li>
              <li><strong>Penalties:</strong> Unlimited fines, up to 2 years imprisonment for serious breaches</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Unsafe working conditions, missing safety equipment, lack of training</li>
              <li><strong>Use:</strong> Report hazards, follow safe systems of work, use provided PPE</li>
              <li><strong>Apply:</strong> Every electrical task requires HASAWA compliance - from isolation to documentation</li>
            </ul>
          </div>
        </div>

        {/* LEARNING OUTCOMES */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the general duties of employers under Section 2 of HASAWA",
              "Describe employee duties under Sections 7 and 8 of the Act",
              "Understand HSE enforcement powers including improvement and prohibition notices",
              "Apply HASAWA requirements to practical electrical work situations",
              "Recognise personal liability implications under Section 37",
              "Understand the meaning of 'so far as is reasonably practicable'"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* CONTENT SECTION 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            General Duties of Employers (Section 2)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Section 2 of HASAWA places comprehensive duties on employers to protect their workforce. The fundamental requirement is to ensure, "so far as is reasonably practicable," the health, safety and welfare at work of all employees. For electrical contractors, this means creating and maintaining safe working environments where electrical hazards are properly controlled.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Section 2(2) - Specific Employer Duties:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Section 2(2)(a) - Safe Plant and Systems:</strong> Employers must provide and maintain safe plant and equipment. For electrical work, this includes properly calibrated test instruments, insulated tools, and PAT-tested portable equipment. Safe systems of work such as isolation procedures and permit-to-work systems must be established.</li>
                <li><strong>Section 2(2)(b) - Safe Use and Handling:</strong> Arrangements for safe use, handling, storage and transport of articles and substances. This covers cable storage, handling of heavy distribution boards, and procedures for hazardous materials.</li>
                <li><strong>Section 2(2)(c) - Information, Instruction, Training:</strong> Adequate training is mandatory. Electricians must receive proper instruction on safe isolation, use of test equipment, and recognition of electrical hazards. Apprentices require close supervision.</li>
                <li><strong>Section 2(2)(d) - Safe Workplace:</strong> The workplace must be maintained safely with safe access and egress. On construction sites, this includes adequate lighting, safe scaffolding for accessing equipment at height, and clear escape routes.</li>
                <li><strong>Section 2(2)(e) - Welfare Facilities:</strong> Adequate facilities including toilets, washing facilities, drinking water, and rest areas must be provided.</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> The employer's duty extends to everyone affected by their undertaking - not just employees, but also contractors, visitors, and members of the public who might be affected by electrical work.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 01 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* CONTENT SECTION 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Duties of Employees (Sections 7 and 8)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              While employers carry the primary responsibility for workplace safety, HASAWA recognises that employees also have crucial duties. Sections 7 and 8 place personal legal obligations on every worker - and electricians can be personally prosecuted for breaching these duties.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Section 7 - Duty to Take Reasonable Care</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Take reasonable care for your own health and safety</li>
                  <li>Take reasonable care for others affected by your work</li>
                  <li>Cooperate with your employer on safety matters</li>
                  <li>Follow established safety procedures</li>
                  <li>Report hazards and unsafe conditions</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Section 8 - Not to Interfere</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Do not intentionally misuse safety equipment</li>
                  <li>Do not bypass RCDs or safety interlocks</li>
                  <li>Do not remove lock-out devices placed by others</li>
                  <li>Do not disable warning systems</li>
                  <li>Do not remove safety guards from equipment</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> An electrician who removes a colleague's lock from an isolation switch to restore power is breaching Section 8. Someone who defeats a door interlock on a high-voltage switchroom is committing an offence. Using an RCD as a switch by repeatedly tripping it could be considered misuse.
            </p>

            <p className="text-sm text-elec-yellow/70 mt-4">
              <strong>Critical Point:</strong> Unlike some areas of employment law, employees can be personally prosecuted under HASAWA. The defence of "I was told to do it" does not excuse criminal liability if you knowingly acted unsafely.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 02 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* CONTENT SECTION 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            HSE Enforcement Powers
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Health and Safety Executive (HSE) enforces HASAWA through inspectors with extensive powers. Understanding these powers helps you appreciate why compliance matters - and what happens when it doesn't.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Inspector Powers:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Enter any workplace at any reasonable time without notice</li>
                <li>Examine and investigate as necessary</li>
                <li>Take photographs, samples, and measurements</li>
                <li>Require production of documents and records</li>
                <li>Interview any person they consider can provide relevant information</li>
                <li>Seize equipment or materials as evidence</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Improvement Notices</p>
                <p className="text-sm text-white">Issued when an inspector believes a statutory provision is being contravened. Requires the matter to be remedied within a specified period (minimum 21 days). For example, requiring documented safe isolation procedures within 28 days.</p>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Prohibition Notices</p>
                <p className="text-sm text-white">Issued where there is risk of serious personal injury. Stops the activity immediately. Can be issued even if no law is being broken, if the risk is serious enough. Work cannot resume until the issue is resolved.</p>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> An electrician found working live on a 400V three-phase supply without proper precautions could face immediate prohibition of all electrical work until safe systems are demonstrated.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 03 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* CONTENT SECTION 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Penalties and Personal Liability
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Breaches of HASAWA are criminal offences with serious consequences. The 2016 sentencing guidelines significantly increased penalties, particularly for organisations, with fines now based on culpability, harm caused, and the size of the organisation.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Magistrates Court</p>
                <p className="text-white/90 text-xs">Unlimited fines for most offences</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Crown Court</p>
                <p className="text-white/90 text-xs">Unlimited fines + up to 2 years imprisonment</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Section 37</p>
                <p className="text-white/90 text-xs">Personal liability for directors/managers</p>
              </div>
            </div>

            <p>
              <strong>Section 37 - Personal Liability:</strong> If an offence is committed by a body corporate with the consent or connivance of, or due to neglect by, a director, manager, secretary or similar officer, that individual is also guilty of the offence. Directors of electrical contracting companies can face personal prosecution and cannot hide behind the company structure.
            </p>

            <p className="text-sm text-elec-yellow/70 mt-4">
              <strong>Real consequence:</strong> Recent prosecutions have resulted in fines exceeding £1 million for organisations, personal fines for directors, disqualification from being company directors, and in the most serious cases involving fatalities, prison sentences.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 04 */}
        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* PRACTICAL GUIDANCE */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When on Site as an Electrician</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always follow safe isolation procedures before working on any circuit</li>
                <li>Use the correct PPE for the voltage and task - insulated tools, gloves, eye protection</li>
                <li>Check test equipment is calibrated and in good condition before use</li>
                <li>Report hazards immediately - don't assume someone else will</li>
                <li>Never take shortcuts, even under time pressure</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Supervising Others</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Ensure apprentices and less experienced workers are adequately supervised</li>
                <li>Verify competence before assigning tasks</li>
                <li>Provide clear instructions and check understanding</li>
                <li>Make safe systems of work available and enforced</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Assuming circuits are dead</strong> - Always prove dead with a tested voltage indicator</li>
                <li><strong>Bypassing safety interlocks</strong> - This breaches Section 8 and creates serious risk</li>
                <li><strong>Working live for convenience</strong> - Time pressure is never justification for unsafe work</li>
                <li><strong>Not reporting near-misses</strong> - These are opportunities to prevent future accidents</li>
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

        {/* QUICK REFERENCE */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference - HASAWA Key Sections</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Employer Duties (Section 2)</p>
                <ul className="space-y-0.5">
                  <li>2(2)(a) - Safe plant and systems of work</li>
                  <li>2(2)(b) - Safe use, handling and storage</li>
                  <li>2(2)(c) - Information, instruction, training</li>
                  <li>2(2)(d) - Safe workplace, access and egress</li>
                  <li>2(2)(e) - Adequate welfare facilities</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Employee & Enforcement</p>
                <ul className="space-y-0.5">
                  <li>Section 7 - Take reasonable care, cooperate</li>
                  <li>Section 8 - Don't interfere with safety provisions</li>
                  <li>Section 37 - Personal liability for directors</li>
                  <li>Improvement Notice - Time to rectify</li>
                  <li>Prohibition Notice - Stop immediately</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* QUIZ */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* NAVIGATION */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module1-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module1-section1-2">
              Next: EAWR 1989
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module1Section1_1;
