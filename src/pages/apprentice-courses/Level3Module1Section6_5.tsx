/**
 * Level 3 Module 1 Section 6.5 - Role of Safety Representatives and Trade Unions
 *
 * Design matches: Level3ContentTemplate.tsx
 * Mobile-first responsive design with touch optimisations
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
const TITLE = "Safety Representatives and Trade Unions - Level 3 Module 1 Section 6.5";
const DESCRIPTION = "Understand the role of safety representatives and trade unions in workplace health and safety. Learn about statutory rights, consultation requirements, and worker representation.";

// ============================================
// INLINE CHECK QUESTIONS
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "Who appoints trade union safety representatives?",
    options: [
      "The employer",
      "The HSE",
      "The recognised trade union",
      "The workers by vote"
    ],
    correctIndex: 2,
    explanation: "Trade union safety representatives are appointed by the recognised trade union, not elected by workers or appointed by employers. This gives them statutory rights under the Safety Representatives and Safety Committees Regulations 1977."
  },
  {
    id: "check-2",
    question: "What is a key right of safety representatives regarding workplace inspections?",
    options: [
      "They have no right to conduct inspections",
      "They can inspect the workplace at agreed intervals",
      "They can only inspect after accidents occur",
      "Inspections require HSE permission"
    ],
    correctIndex: 1,
    explanation: "Safety representatives have the statutory right to inspect the workplace at agreed intervals - typically quarterly. They can also inspect after notifiable accidents or dangerous occurrences, and investigate potential hazards."
  },
  {
    id: "check-3",
    question: "What are Representatives of Employee Safety (ROES)?",
    options: [
      "The same as trade union safety reps",
      "HSE inspectors",
      "Elected worker representatives in non-unionised workplaces",
      "Company directors responsible for safety"
    ],
    correctIndex: 2,
    explanation: "Representatives of Employee Safety (ROES) are elected by workers in non-unionised workplaces under the Health and Safety (Consultation with Employees) Regulations 1996. They have similar but slightly more limited rights compared to trade union safety reps."
  },
  {
    id: "check-4",
    question: "Must employers provide time off for safety representative training?",
    options: [
      "No, training is optional",
      "Yes, with pay and during working hours",
      "Only for the first year",
      "Only if requested in writing"
    ],
    correctIndex: 1,
    explanation: "Employers must allow safety representatives time off with pay during working hours for training. This is a statutory requirement - adequate training is essential for representatives to fulfil their functions effectively."
  }
];

// ============================================
// QUIZ QUESTIONS
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "The Safety Representatives and Safety Committees Regulations 1977 apply to:",
    options: [
      "All workplaces regardless of union recognition",
      "Workplaces where independent trade unions are recognised",
      "Only construction sites",
      "Only large employers with over 100 workers"
    ],
    correctAnswer: 1,
    explanation: "The 1977 Regulations apply where independent trade unions are recognised. The union can then appoint safety representatives with statutory functions. Non-unionised workplaces are covered by different regulations from 1996."
  },
  {
    id: 2,
    question: "What must an employer provide to a safety representative who requests it?",
    options: [
      "Company financial accounts",
      "Information necessary to carry out their safety functions",
      "Personal employee records",
      "Trade union membership lists"
    ],
    correctAnswer: 1,
    explanation: "Employers must provide safety representatives with information necessary for them to carry out their functions - this includes hazard information, accident statistics, risk assessments, and safety policies. Some information (like medical records) has confidentiality restrictions."
  },
  {
    id: 3,
    question: "A safety committee must be established when:",
    options: [
      "The employer decides it's needed",
      "The HSE orders it",
      "At least two safety representatives request it in writing",
      "There are more than 50 employees"
    ],
    correctAnswer: 2,
    explanation: "Under the 1977 Regulations, if at least two trade union safety representatives request a safety committee in writing, the employer must establish one within three months. This gives workers a formal structure for consultation."
  },
  {
    id: 4,
    question: "Safety representatives have the right to:",
    options: [
      "Stop all work immediately at any time",
      "Issue prohibition notices like HSE inspectors",
      "Represent employees in discussions with HSE inspectors",
      "Dismiss workers for safety breaches"
    ],
    correctAnswer: 2,
    explanation: "Safety representatives can represent employees in discussions with HSE inspectors and receive information from inspectors. They cannot issue formal notices (that's an HSE inspector function) but they play a vital role in worker-inspector communication."
  },
  {
    id: 5,
    question: "What protection do safety representatives have against dismissal?",
    options: [
      "None - normal employment rules apply",
      "Dismissal for carrying out safety functions is automatically unfair",
      "They cannot be dismissed for any reason",
      "Protection only applies if union approved the action"
    ],
    correctAnswer: 1,
    explanation: "Dismissal of a safety representative for carrying out their legitimate safety functions is automatically unfair dismissal. This protection encourages representatives to raise genuine safety concerns without fear of losing their jobs."
  },
  {
    id: 6,
    question: "The Health and Safety (Consultation with Employees) Regulations 1996 require employers to:",
    options: [
      "Recognise trade unions",
      "Consult workers not covered by union safety reps, either directly or through elected representatives",
      "Pay for all employee safety training",
      "Employ dedicated safety officers"
    ],
    correctAnswer: 1,
    explanation: "The 1996 Regulations require employers to consult employees not covered by trade union safety representatives. This can be direct consultation or through elected Representatives of Employee Safety (ROES)."
  },
  {
    id: 7,
    question: "What is a key difference between trade union safety reps and ROES?",
    options: [
      "There is no difference - they have identical rights",
      "ROES have more extensive inspection rights",
      "Trade union reps have statutory functions; ROES have rights to information and consultation",
      "Only ROES can attend safety committee meetings"
    ],
    correctAnswer: 2,
    explanation: "Trade union safety reps have broader statutory functions under the 1977 Regulations, including inspection rights. ROES under the 1996 Regulations have rights to information, consultation, and time off for training, but slightly more limited inspection powers."
  },
  {
    id: 8,
    question: "Employers must consult safety representatives on:",
    options: [
      "Individual employment contracts only",
      "Introduction of measures affecting health and safety, and appointment of competent persons",
      "Business strategy and financial matters",
      "Marketing and sales decisions"
    ],
    correctAnswer: 1,
    explanation: "Consultation topics include: introduction of health and safety measures, appointment of competent persons, health and safety information provision, planning of training, and consequences of new technology. This ensures worker input on safety decisions."
  },
  {
    id: 9,
    question: "How often should safety committees typically meet?",
    options: [
      "Only when problems arise",
      "Daily",
      "Quarterly as a minimum, though monthly is common",
      "Once per year"
    ],
    correctAnswer: 2,
    explanation: "While regulations don't specify exact frequency, best practice is quarterly meetings as a minimum, with many organisations meeting monthly. Regular meetings ensure ongoing attention to safety matters and timely resolution of concerns."
  },
  {
    id: 10,
    question: "Trade unions' role in health and safety includes:",
    options: [
      "Taking over HSE enforcement responsibilities",
      "Supporting members, providing training resources, and advocating for better standards",
      "Directly employing safety officers",
      "Issuing electrical installation certificates"
    ],
    correctAnswer: 1,
    explanation: "Trade unions support health and safety by: providing training courses for representatives, offering advice and resources to members, representing members in safety disputes, campaigning for improved legislation, and providing legal support when needed."
  },
  {
    id: 11,
    question: "What should a safety representative do if they identify a serious hazard?",
    options: [
      "Wait for the next committee meeting",
      "Immediately inform the employer and follow up in writing if necessary",
      "Contact the media",
      "Organise an immediate strike"
    ],
    correctAnswer: 1,
    explanation: "Safety representatives should immediately inform the employer of serious hazards. Following up in writing creates a record. If the employer doesn't respond adequately, the representative can escalate to the HSE, but the first step is working with the employer."
  },
  {
    id: 12,
    question: "Effective worker consultation on safety matters helps employers by:",
    options: [
      "Transferring all safety responsibility to workers",
      "Gaining practical insights from those doing the work and improving buy-in to safety measures",
      "Reducing the need for risk assessments",
      "Eliminating the need for safety training"
    ],
    correctAnswer: 1,
    explanation: "Consultation benefits employers through: practical insights from workers who know the job, better identification of hazards, improved compliance when workers are involved in decisions, and a more positive safety culture. It's genuinely valuable, not just a legal box-tick."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "Do I have to be a union member to benefit from safety representation?",
    answer: "No. Safety representatives represent all employees in their area, not just union members. Non-union workers benefit from improved safety conditions achieved through union representation. In non-unionised workplaces, the 1996 Regulations ensure workers still have consultation rights, either directly or through elected ROES."
  },
  {
    question: "Can I become a safety representative as an apprentice?",
    answer: "Trade union safety representatives are appointed by the union, usually from experienced members. However, you can be elected as a Representative of Employee Safety (ROES) in a non-union workplace. Either way, getting involved in safety matters - attending committee meetings, raising concerns, supporting representatives - is valuable experience at any stage of your career."
  },
  {
    question: "What training do safety representatives receive?",
    answer: "Safety representatives are entitled to paid time off for training. Trade unions typically provide courses covering: relevant legislation, hazard identification, inspection techniques, accident investigation, consultation skills, and specific industry risks. The TUC and unions like Unite offer comprehensive programmes. Employers must allow this time off with pay."
  },
  {
    question: "Can a safety representative stop dangerous work?",
    answer: "Safety representatives don't have formal legal power to issue stop-work notices (that's an HSE inspector function). However, they can identify hazards to the employer and, if there's imminent danger that the employer won't address, any worker has the right to refuse genuinely dangerous work. Representatives often play a key role in escalating serious concerns."
  },
  {
    question: "What if my employer ignores the safety representative?",
    answer: "If concerns aren't addressed, representatives can: document the issues in writing, raise them formally at safety committee meetings, involve union officials, and ultimately contact the HSE. The HSE takes failure to consult seriously. Representatives also have protection against detriment for raising legitimate safety concerns."
  },
  {
    question: "How do safety committees work in practice?",
    answer: "Safety committees typically include management representatives and worker/union representatives. They meet regularly to: review accident/incident data, discuss inspection findings, monitor implementation of safety measures, consider new risks from changes, and plan safety improvements. Minutes are kept and actions tracked. Good committees are collaborative problem-solving forums, not adversarial."
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module1Section6_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">

      {/* ========================================
          STICKY HEADER
          ======================================== */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module1-section6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* ========================================
          MAIN ARTICLE CONTENT
          ======================================== */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* ----------------------------------------
            HEADER
            ---------------------------------------- */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 1.6.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Role of Safety Representatives and Trade Unions
          </h1>
          <p className="text-white/80">
            Worker representation in workplace health and safety
          </p>
        </header>

        {/* ----------------------------------------
            QUICK SUMMARY BOXES
            ---------------------------------------- */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Safety reps:</strong> Appointed by unions with statutory functions</li>
              <li><strong>ROES:</strong> Elected in non-union workplaces</li>
              <li><strong>Rights:</strong> Inspection, information, consultation, training</li>
              <li><strong>Committees:</strong> Must be established if requested</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Who your safety rep is, when committees meet</li>
              <li><strong>Use:</strong> Raise concerns through proper channels</li>
              <li><strong>Apply:</strong> Support worker consultation, consider becoming a rep</li>
            </ul>
          </div>
        </div>

        {/* ----------------------------------------
            LEARNING OUTCOMES
            ---------------------------------------- */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand the role of trade union safety representatives",
              "Know the rights and functions of safety reps",
              "Distinguish between safety reps and ROES",
              "Recognise employer consultation obligations",
              "Understand safety committee functions",
              "Know how to engage with worker representation"
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

        {/* ----------------------------------------
            CONTENT SECTION 01
            ---------------------------------------- */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Trade Union Safety Representatives
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Trade union safety representatives have been a key part of workplace safety since the 1977 Regulations. Appointed by recognised trade unions, they represent workers in discussions about health and safety and have important statutory functions that employers must respect.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key statutory functions of safety representatives:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Investigate potential hazards and dangerous occurrences</li>
                <li>Investigate complaints from employees about health and safety</li>
                <li>Make representations to the employer on safety matters</li>
                <li>Carry out workplace inspections</li>
                <li>Represent employees in discussions with HSE inspectors</li>
                <li>Receive information from HSE inspectors</li>
                <li>Attend safety committee meetings</li>
              </ul>
            </div>

            <p>
              These functions give workers a genuine voice in safety matters. Research consistently shows that workplaces with active union safety representation have better safety records. The presence of a knowledgeable representative who can identify hazards and advocate for improvements benefits everyone.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Safety representatives represent all employees in their area, not just union members. Their work benefits everyone on site.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 01 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ----------------------------------------
            CONTENT SECTION 02
            ---------------------------------------- */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Rights of Safety Representatives
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              To carry out their functions effectively, safety representatives have specific rights that employers must honour. These aren't optional concessions - they're legal requirements that enable proper worker representation on safety matters.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Inspection rights:</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Regular workplace inspections (typically quarterly)</li>
                  <li>Inspection after notifiable accidents/occurrences</li>
                  <li>Investigate potential hazards and complaints</li>
                  <li>Examine documents and records</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Information and training rights:</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Access to safety-relevant information</li>
                  <li>Paid time off for training</li>
                  <li>Facilities for carrying out functions</li>
                  <li>Protection from dismissal/detriment</li>
                </ul>
              </div>
            </div>

            <p>
              Employers must consult safety representatives on matters including: introduction of safety measures, appointment of competent persons, health and safety information, training planning, and new technology implications. This isn't just informing them - it's genuine consultation seeking their input.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 02 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ----------------------------------------
            CONTENT SECTION 03
            ---------------------------------------- */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Representatives of Employee Safety (ROES)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Not all workplaces have recognised trade unions. The Health and Safety (Consultation with Employees) Regulations 1996 ensure that workers in non-unionised workplaces still have consultation rights - either through direct consultation or through elected Representatives of Employee Safety (ROES).
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key features of ROES:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Election:</strong> Elected by the workers they represent (not appointed by union)</li>
                <li><strong>Consultation:</strong> Must be consulted on health and safety matters</li>
                <li><strong>Information:</strong> Entitled to necessary safety information</li>
                <li><strong>Training:</strong> Entitled to paid time off for training</li>
                <li><strong>Protection:</strong> Protected from dismissal/detriment for their role</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> A medium-sized electrical contractor without union recognition elects two ROES. They receive training on hazard identification and inspection techniques. The employer consults them before introducing new PPE requirements and changing site procedures. Their input improves the practicality of safety measures.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> ROES have slightly different (often more limited) rights than trade union safety reps, but the principle is the same: workers should have a voice in safety matters.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 03 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ----------------------------------------
            CONTENT SECTION 04
            ---------------------------------------- */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Safety Committees
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Safety committees provide a formal structure for worker-employer consultation on health and safety. Where two or more trade union safety representatives request one in writing, the employer must establish a safety committee within three months.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Composition</p>
                <p className="text-white/90 text-xs">Management and worker representatives</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Frequency</p>
                <p className="text-white/90 text-xs">Quarterly minimum, often monthly</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Purpose</p>
                <p className="text-white/90 text-xs">Monitor and improve safety performance</p>
              </div>
            </div>

            <p>
              Effective safety committees are collaborative forums, not adversarial meetings. They review accident data, discuss inspection findings, monitor safety measures, consider risks from changes, and plan improvements. The best committees have balanced representation and focus on practical problem-solving.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Typical safety committee agenda items:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Review of accidents, incidents, and near-misses since last meeting</li>
                <li>Inspection reports and action progress</li>
                <li>Update on outstanding safety actions</li>
                <li>Changes affecting health and safety (new processes, equipment, etc.)</li>
                <li>Training matters</li>
                <li>Review of relevant legislation or guidance changes</li>
              </ul>
            </div>
          </div>
        </section>

        {/* InlineCheck after Section 04 */}
        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* ----------------------------------------
            PRACTICAL GUIDANCE
            ---------------------------------------- */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Working with Safety Representatives</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Know who your safety representative is and how to contact them</li>
                <li>Raise safety concerns through them if appropriate</li>
                <li>Attend any open safety meetings or briefings</li>
                <li>Support their work - they represent your interests</li>
                <li>Provide feedback on what's working and what isn't</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">If Considering Becoming a Representative</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Understand the commitment involved - it's a responsible role</li>
                <li>Training is available and you're entitled to paid time off for it</li>
                <li>You'll need good communication and problem-solving skills</li>
                <li>The role gives valuable experience in safety management</li>
                <li>You're protected from dismissal for carrying out the role properly</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Problems to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Bypassing representatives</strong> - Use proper channels rather than going around them</li>
                <li><strong>Dismissing concerns</strong> - Even if you disagree, concerns deserve proper consideration</li>
                <li><strong>Treating consultation as a tick-box</strong> - Genuine input should influence decisions</li>
                <li><strong>Assuming reps are troublemakers</strong> - Most are trying to make workplaces safer</li>
                <li><strong>Ignoring non-union workers</strong> - All workers have consultation rights</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ----------------------------------------
            FAQs
            ---------------------------------------- */}
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

        {/* ----------------------------------------
            QUICK REFERENCE
            ---------------------------------------- */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Key Regulations</p>
                <ul className="space-y-0.5">
                  <li>Safety Representatives and Safety Committees Regs 1977</li>
                  <li>Health and Safety (Consultation with Employees) Regs 1996</li>
                  <li>Employment Rights Act 1996 (protection provisions)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Representative Rights</p>
                <ul className="space-y-0.5">
                  <li>Workplace inspections</li>
                  <li>Access to information</li>
                  <li>Paid training time</li>
                  <li>Protection from dismissal</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ----------------------------------------
            QUIZ
            ---------------------------------------- */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* ----------------------------------------
            NAVIGATION
            ---------------------------------------- */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module1-section6-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              6.4 Ethical Responsibilities
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module1-section6-6">
              6.6 CPD in Health and Safety
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module1Section6_5;
