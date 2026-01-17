/**
 * Level 3 Module 1 Section 6.3 - Disciplinary Actions for Non-compliance
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
const TITLE = "Disciplinary Actions for Non-compliance - Level 3 Module 1 Section 6.3";
const DESCRIPTION = "Understand disciplinary procedures for health and safety non-compliance in electrical installation. Learn about verbal warnings through dismissal and legal consequences.";

// ============================================
// INLINE CHECK QUESTIONS
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is the primary purpose of disciplinary procedures for safety breaches?",
    options: [
      "To punish workers as severely as possible",
      "To correct behaviour and maintain a safe workplace",
      "To create fear among the workforce",
      "To document reasons for mass dismissals"
    ],
    correctIndex: 1,
    explanation: "Disciplinary procedures aim to correct behaviour and maintain workplace safety. While consequences exist, the primary goal is to change behaviour and prevent future incidents, not simply to punish."
  },
  {
    id: "check-2",
    question: "When might gross misconduct result in immediate dismissal?",
    options: [
      "For any first-time safety breach",
      "Only after three verbal warnings",
      "When the breach is so serious it fundamentally breaks the employment contract",
      "Never - all dismissals require progressive discipline"
    ],
    correctIndex: 2,
    explanation: "Gross misconduct, such as deliberately endangering lives or serious safety breaches, can result in immediate dismissal because it fundamentally breaks the trust relationship required for employment."
  },
  {
    id: "check-3",
    question: "What should happen before formal disciplinary action is taken?",
    options: [
      "The worker should be immediately suspended",
      "A fair investigation should establish the facts",
      "The police should be called in all cases",
      "Other workers should be consulted for opinions"
    ],
    correctIndex: 1,
    explanation: "Before formal disciplinary action, a fair investigation should establish the facts. This ensures decisions are based on evidence, protects workers from unfair treatment, and helps identify any contributing factors."
  },
  {
    id: "check-4",
    question: "What external body can prosecute individuals for serious health and safety breaches?",
    options: [
      "ACAS only",
      "Employment tribunals only",
      "The HSE and local authorities",
      "Only the company can take action"
    ],
    correctIndex: 2,
    explanation: "The HSE and local authorities have enforcement powers including prosecution for serious health and safety breaches. This is separate from any internal disciplinary action the employer takes."
  }
];

// ============================================
// QUIZ QUESTIONS
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "A progressive disciplinary procedure typically includes which stages?",
    options: [
      "Warning, fine, prison",
      "Verbal warning, written warning, final warning, dismissal",
      "Warning, demotion, rehiring",
      "Fine, suspension, promotion"
    ],
    correctAnswer: 1,
    explanation: "Progressive discipline typically moves through verbal warning, written warning, final written warning, and finally dismissal. This gives employees opportunity to correct their behaviour before the most serious sanctions are applied."
  },
  {
    id: 2,
    question: "Which action would typically be classified as gross misconduct in health and safety?",
    options: [
      "Forgetting to sign the attendance register",
      "Deliberately removing a machine guard to speed up work",
      "Minor untidiness in a work area",
      "Asking a question about a safety procedure"
    ],
    correctAnswer: 1,
    explanation: "Deliberately removing a machine guard is gross misconduct because it creates serious immediate danger to life. Such deliberate actions that endanger others typically warrant summary dismissal."
  },
  {
    id: 3,
    question: "What right does an employee have in a disciplinary hearing?",
    options: [
      "No rights - the employer decides everything",
      "The right to be accompanied by a colleague or trade union representative",
      "The right to choose the outcome",
      "The right to refuse to attend"
    ],
    correctAnswer: 1,
    explanation: "Employees have the statutory right to be accompanied at disciplinary hearings by a colleague or trade union representative. This helps ensure fair treatment and provides support during what can be a stressful process."
  },
  {
    id: 4,
    question: "How long should written warnings typically remain on an employee's record?",
    options: [
      "Forever - they never expire",
      "A defined period (commonly 6-12 months) as specified in the policy",
      "Until the employee requests removal",
      "Only one week"
    ],
    correctAnswer: 1,
    explanation: "Written warnings should remain active for a defined period, commonly 6-12 months depending on the severity and company policy. After this period, they are considered 'spent' and shouldn't be used against the employee."
  },
  {
    id: 5,
    question: "What is the purpose of a disciplinary investigation?",
    options: [
      "To prove the employee is guilty",
      "To gather evidence impartially before deciding on action",
      "To give management time to plan dismissal",
      "To satisfy insurance requirements only"
    ],
    correctAnswer: 1,
    explanation: "Investigations should gather evidence impartially - this means finding facts, not proving guilt. A fair investigation might find the employee acted appropriately, that circumstances were different from first thought, or that others contributed to the situation."
  },
  {
    id: 6,
    question: "Can an employer dismiss someone without notice for a safety breach?",
    options: [
      "Never under any circumstances",
      "Yes, for gross misconduct where the breach is extremely serious",
      "Only if the employee agrees",
      "Only with HSE permission"
    ],
    correctAnswer: 1,
    explanation: "Summary dismissal (without notice) is possible for gross misconduct. Extremely serious safety breaches like deliberately endangering lives can constitute gross misconduct, justifying immediate termination of employment."
  },
  {
    id: 7,
    question: "What should employers consider when determining the appropriate disciplinary sanction?",
    options: [
      "Only the seriousness of the breach",
      "The employee's previous record, seniority, and any mitigating circumstances",
      "Only whether the employee apologised",
      "What other companies would do"
    ],
    correctAnswer: 1,
    explanation: "Employers should consider multiple factors: the seriousness of the breach, the employee's previous record, their length of service, any mitigating circumstances, and whether the sanction is consistent with how similar cases were handled."
  },
  {
    id: 8,
    question: "If an employee is dismissed unfairly for a safety-related issue, they can:",
    options: [
      "Take no action - employers always win",
      "Appeal to an employment tribunal for unfair dismissal",
      "Only complain to their MP",
      "Automatically be reinstated by the courts"
    ],
    correctAnswer: 1,
    explanation: "Employees who believe they have been unfairly dismissed can appeal to an employment tribunal. The tribunal will examine whether the employer followed fair procedures and whether dismissal was a reasonable response."
  },
  {
    id: 9,
    question: "What is the role of ACAS in workplace disciplinary matters?",
    options: [
      "They prosecute employers for unfair treatment",
      "They provide guidance and can offer conciliation services",
      "They have no role in disciplinary matters",
      "They decide the outcome of all disciplinary cases"
    ],
    correctAnswer: 1,
    explanation: "ACAS (Advisory, Conciliation and Arbitration Service) provides guidance on best practice for disciplinary procedures and offers conciliation services to resolve disputes before they reach employment tribunals."
  },
  {
    id: 10,
    question: "Besides internal disciplinary action, what external consequences might follow a serious safety breach?",
    options: [
      "No external consequences are possible",
      "HSE prosecution, fines, improvement/prohibition notices, or imprisonment",
      "Only a newspaper article",
      "Automatic ban from all electrical work"
    ],
    correctAnswer: 1,
    explanation: "Serious safety breaches can result in HSE prosecution leading to unlimited fines, improvement or prohibition notices, and in the most serious cases (especially where death results), imprisonment. These are in addition to any employer action."
  },
  {
    id: 11,
    question: "What documentation should be kept from disciplinary proceedings?",
    options: [
      "No records are needed",
      "Records of the investigation, hearing, decision, and any appeal",
      "Only the final decision letter",
      "Only verbal confirmation"
    ],
    correctAnswer: 1,
    explanation: "Comprehensive records should be kept including investigation notes, hearing minutes, the decision and reasoning, any appeal, and final outcome. These protect both employer and employee and demonstrate fair process."
  },
  {
    id: 12,
    question: "What makes a disciplinary procedure 'fair' in legal terms?",
    options: [
      "The employee gets the outcome they want",
      "Following proper procedure, giving the employee a chance to respond, and reaching a reasonable decision",
      "The employer decides without consultation",
      "Using the most severe sanction available"
    ],
    correctAnswer: 1,
    explanation: "Fair procedure means: investigating properly, informing the employee of the allegations, giving them chance to respond, allowing accompaniment, making an impartial decision, and offering an appeal. The outcome must be within the range of reasonable responses."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "Can I be dismissed for a first-time safety breach?",
    answer: "It depends on the severity. Minor breaches typically result in verbal or written warnings first. However, gross misconduct - such as deliberately endangering lives, serious assault, or being intoxicated while performing dangerous work - can result in immediate dismissal even for a first offence. The key factor is whether the breach fundamentally breaks the employment relationship."
  },
  {
    question: "What should I do if I witness a colleague breaching safety rules?",
    answer: "Report it through the appropriate channels - typically your supervisor or line manager. If you're uncomfortable reporting directly, most companies have anonymous reporting systems. Remember, reporting isn't about getting colleagues into trouble; it's about preventing injuries. A safety breach today could result in a serious injury tomorrow."
  },
  {
    question: "Can I refuse to attend a disciplinary hearing?",
    answer: "You can physically refuse, but it's not advisable. The hearing may proceed in your absence, and you'll lose the opportunity to present your side. You have the right to be accompanied by a colleague or union representative. If you have legitimate reasons why the scheduled time doesn't work, request a reasonable postponement."
  },
  {
    question: "What if I think disciplinary action against me is unfair?",
    answer: "First, use the company's appeal process - this is usually the final stage of internal procedures. If you're still unsatisfied, you may be able to take the matter to an employment tribunal (normally within 3 months of the final decision). ACAS early conciliation is required before tribunal claims. Keep records of everything throughout the process."
  },
  {
    question: "Can previous warnings be used against me if they've expired?",
    answer: "Generally, no. Expired warnings should be treated as 'spent' and not influence new disciplinary decisions. However, if you're facing repeated similar breaches, the pattern of behaviour might be relevant even if individual warnings have expired. Company policies should specify how long warnings remain active (commonly 6-12 months)."
  },
  {
    question: "What's the difference between internal discipline and HSE prosecution?",
    answer: "Internal discipline is action by your employer under your contract of employment - warnings, dismissal, etc. HSE prosecution is criminal action by the state for breaching health and safety law. You can face both simultaneously: your employer might dismiss you AND the HSE might prosecute you. They're separate processes with different consequences."
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module1Section6_3 = () => {
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
            <Link to="/study-centre/apprentice/level3-module1-section6">
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
            <span>Module 1.6.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Disciplinary Actions for Non-compliance
          </h1>
          <p className="text-white/80">
            Understanding consequences for health and safety breaches in the workplace
          </p>
        </header>

        {/* ----------------------------------------
            QUICK SUMMARY BOXES
            ---------------------------------------- */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Purpose:</strong> Correct behaviour and maintain safe workplaces</li>
              <li><strong>Progressive:</strong> Verbal - written - final warning - dismissal</li>
              <li><strong>Gross misconduct:</strong> Can result in immediate dismissal</li>
              <li><strong>External:</strong> HSE can prosecute separately from employer action</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Company disciplinary policy, union representation availability</li>
              <li><strong>Use:</strong> Follow safety rules, know your rights if facing discipline</li>
              <li><strong>Apply:</strong> Report breaches appropriately, support fair procedures</li>
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
              "Understand the purpose of disciplinary procedures",
              "Identify stages of progressive discipline",
              "Recognise what constitutes gross misconduct",
              "Know employee rights during disciplinary processes",
              "Understand the role of external enforcement",
              "Apply fair procedure principles in practice"
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
            Purpose of Disciplinary Procedures
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Disciplinary procedures exist to correct behaviour and maintain safe workplaces - not simply to punish. When someone breaches safety rules, the primary goal is to ensure it doesn't happen again. Effective discipline changes behaviour, protects other workers, and demonstrates that safety is taken seriously.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key principles of fair disciplinary procedures:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Consistency</strong> - Similar breaches should result in similar consequences</li>
                <li><strong>Proportionality</strong> - The sanction should match the seriousness of the breach</li>
                <li><strong>Investigation</strong> - Facts should be established before action is taken</li>
                <li><strong>Opportunity to respond</strong> - The accused must be able to present their side</li>
                <li><strong>Right of appeal</strong> - Decisions should be reviewable</li>
              </ul>
            </div>

            <p>
              Employers must have clear disciplinary policies that employees know about. Under the ACAS Code of Practice, failure to follow fair procedures can result in employment tribunal awards being increased by up to 25%. Good procedures protect both employer and employee.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Disciplinary action is separate from performance management. Safety breaches are about behaviour and rule compliance, not just how well you do your job.
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
            Progressive Discipline and Gross Misconduct
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Most disciplinary procedures follow a progressive approach, giving employees opportunity to correct their behaviour before facing serious consequences. However, some breaches are so serious they warrant immediate action. Understanding this distinction is essential.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Progressive discipline stages:</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Verbal warning</strong> - Informal, may be documented</li>
                  <li><strong>Written warning</strong> - Formal, on file (typically 6 months)</li>
                  <li><strong>Final written warning</strong> - Last chance (typically 12 months)</li>
                  <li><strong>Dismissal</strong> - Termination of employment</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Examples of gross misconduct:</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Deliberately removing safety guards</li>
                  <li>Working under influence of alcohol/drugs</li>
                  <li>Deliberate violence or endangerment</li>
                  <li>Serious insubordination affecting safety</li>
                </ul>
              </div>
            </div>

            <p>
              Gross misconduct fundamentally breaks the employment relationship, justifying summary dismissal (dismissal without notice). Even for gross misconduct, an investigation should occur and the employee should have opportunity to respond - but the outcome can be immediate dismissal if the breach is proven.
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
            The Disciplinary Process
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Fair disciplinary processes follow a structured approach. Understanding these steps helps both those facing discipline and those responsible for administering it. Shortcuts in the process often lead to unfair outcomes and potential legal challenges.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Steps in a fair disciplinary process:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>1. Investigation</strong> - Gather facts impartially; may include suspension if appropriate</li>
                <li><strong>2. Notification</strong> - Inform employee of allegations in writing with evidence</li>
                <li><strong>3. Hearing</strong> - Allow employee to respond; they can be accompanied</li>
                <li><strong>4. Decision</strong> - Consider all evidence; decide appropriate sanction</li>
                <li><strong>5. Communication</strong> - Inform employee of decision and reasons in writing</li>
                <li><strong>6. Appeal</strong> - Allow appeal to independent manager; review decision</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> An electrician is seen working at height without edge protection. The supervisor stops the work immediately and reports to management. An investigation is conducted - the electrician explains edge protection was removed by others and they hadn't realised. The hearing considers this, along with the electrician's clean record. Outcome: written warning rather than dismissal, plus additional training.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Even when someone appears clearly at fault, investigations often reveal contributing factors - poor training, unclear procedures, equipment failures, or pressure from management.
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
            External Enforcement and Prosecution
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Beyond internal employer discipline, health and safety breaches can result in external enforcement action. The HSE and local authorities have powers to prosecute individuals and organisations. These criminal proceedings are entirely separate from employment consequences.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Improvement Notice</p>
                <p className="text-white/90 text-xs">Requires specific improvements within a time limit</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Prohibition Notice</p>
                <p className="text-white/90 text-xs">Stops activity immediately until made safe</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Prosecution</p>
                <p className="text-white/90 text-xs">Criminal charges with unlimited fines or imprisonment</p>
              </div>
            </div>

            <p>
              Individuals can be prosecuted alongside their employers. Under HSWA, those who consent to, connive in, or neglect to prevent safety breaches can face personal prosecution. This includes directors, managers, and workers at all levels. Penalties include unlimited fines and, for the most serious cases involving death, imprisonment.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Factors affecting prosecution decisions:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Seriousness of the breach and potential/actual harm</li>
                <li>Whether death or serious injury occurred</li>
                <li>Evidence of deliberate or reckless behaviour</li>
                <li>Previous enforcement history</li>
                <li>Public interest in prosecution</li>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">If You Face Disciplinary Action</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Request written details of the allegations before any hearing</li>
                <li>Exercise your right to be accompanied by a colleague or union rep</li>
                <li>Gather any evidence that supports your position</li>
                <li>Prepare your response in writing if it helps you organise thoughts</li>
                <li>Use the appeal process if you disagree with the outcome</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">If You Witness Safety Breaches</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Report through appropriate channels - supervisor, safety officer, or confidential line</li>
                <li>Document what you saw, when, and who was involved</li>
                <li>Don't put yourself at risk to intervene, but speak up if safe to do so</li>
                <li>Focus on the behaviour, not the person - it's about safety, not blame</li>
                <li>You're protected from dismissal for genuine safety reports</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Actions That Typically Attract Severe Discipline</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Deliberate safety breaches</strong> - Intentionally bypassing safety systems or guards</li>
                <li><strong>Working while impaired</strong> - Alcohol or drugs affecting safety-critical work</li>
                <li><strong>Falsifying safety records</strong> - Signing off incomplete inspections or tests</li>
                <li><strong>Ignoring stop-work orders</strong> - Continuing after being told to stop</li>
                <li><strong>Covering up incidents</strong> - Failing to report or hiding evidence of accidents</li>
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
                <p className="font-medium text-white mb-1">Employee Rights</p>
                <ul className="space-y-0.5">
                  <li>Written notice of allegations</li>
                  <li>Right to be accompanied</li>
                  <li>Opportunity to respond</li>
                  <li>Right of appeal</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Resources</p>
                <ul className="space-y-0.5">
                  <li>ACAS Code of Practice on Disciplinary Procedures</li>
                  <li>Company disciplinary policy</li>
                  <li>Trade union representative</li>
                  <li>Employment tribunal (if unfair treatment)</li>
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
            <Link to="/study-centre/apprentice/level3-module1-section6-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              6.2 Accountability
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module1-section6-4">
              6.4 Ethical Responsibilities
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module1Section6_3;
