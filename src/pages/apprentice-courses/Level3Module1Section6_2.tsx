/**
 * Level 3 Module 1 Section 6.2 - Accountability for Safe Working Practices
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
const TITLE = "Accountability for Safe Working - Level 3 Module 1 Section 6.2";
const DESCRIPTION = "Understand personal and professional accountability for safe working practices in electrical installation. Learn how individual accountability supports workplace safety.";

// ============================================
// INLINE CHECK QUESTIONS
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What does individual accountability mean in health and safety?",
    options: [
      "Only managers are responsible for safety",
      "Each person is answerable for their own actions and decisions regarding safety",
      "Safety is the sole responsibility of the HSE",
      "Accountability only applies after an accident occurs"
    ],
    correctIndex: 1,
    explanation: "Individual accountability means every worker is answerable for their own actions, decisions, and their impact on workplace safety. This applies at all levels, not just management."
  },
  {
    id: "check-2",
    question: "Why is documentation important for accountability?",
    options: [
      "It's only needed for large companies",
      "It provides evidence that safety duties have been fulfilled",
      "Documentation is optional under UK law",
      "Only incident reports need documenting"
    ],
    correctIndex: 1,
    explanation: "Documentation provides evidence that safety responsibilities have been met. This includes risk assessments, training records, inspection logs, and method statements - all demonstrating due diligence."
  },
  {
    id: "check-3",
    question: "What happens when a supervisor fails to address an unsafe practice they observed?",
    options: [
      "Nothing, supervisors aren't responsible for others",
      "They may be personally liable for any resulting injury",
      "The HSE won't take action against supervisors",
      "Only the worker performing the task is accountable"
    ],
    correctIndex: 1,
    explanation: "Supervisors have a duty to address unsafe practices. Failing to act when they observe unsafe work can make them personally liable for any resulting injury, as they had the authority and duty to intervene."
  },
  {
    id: "check-4",
    question: "How does competence relate to accountability?",
    options: [
      "Competence and accountability are unrelated",
      "Taking on work beyond your competence increases personal liability",
      "Being competent removes all accountability",
      "Only employers need to be competent"
    ],
    correctIndex: 1,
    explanation: "Taking on work beyond your competence significantly increases personal liability. If an incident occurs, you may be held accountable for accepting work you weren't qualified to perform safely."
  }
];

// ============================================
// QUIZ QUESTIONS
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "Under HSWA Section 7, individual employees can be held accountable for:",
    options: [
      "The actions of other workers on site",
      "Taking reasonable care of their own and others' health and safety",
      "Writing company health and safety policies",
      "Conducting formal accident investigations"
    ],
    correctAnswer: 1,
    explanation: "Section 7 of HSWA places a duty on every employee to take reasonable care for their own health and safety and that of others who may be affected by their acts or omissions at work."
  },
  {
    id: 2,
    question: "Personal liability for health and safety means:",
    options: [
      "Only the company can be prosecuted",
      "Individual workers cannot be fined",
      "Individuals can face prosecution, fines, and even imprisonment",
      "Liability transfers to your employer when you're following orders"
    ],
    correctAnswer: 2,
    explanation: "Personal liability means individuals can face prosecution, fines, and imprisonment for health and safety breaches. Following orders is not a defence if you knew or should have known the work was unsafe."
  },
  {
    id: 3,
    question: "A key aspect of demonstrating accountability is:",
    options: [
      "Avoiding written records to reduce evidence",
      "Maintaining accurate documentation of safety activities",
      "Delegating all safety tasks to others",
      "Only acting when specifically instructed"
    ],
    correctAnswer: 1,
    explanation: "Maintaining accurate documentation demonstrates accountability by providing evidence that safety duties have been fulfilled. Records of training, inspections, risk assessments, and method statements are essential."
  },
  {
    id: 4,
    question: "When you identify a hazard on site, being accountable means:",
    options: [
      "Waiting for someone else to report it",
      "Only acting if it directly affects your work",
      "Taking immediate appropriate action and reporting it",
      "Assuming someone else has already reported it"
    ],
    correctAnswer: 2,
    explanation: "Accountability means taking immediate appropriate action when you identify hazards - whether that's making the area safe, reporting to supervisors, or stopping work. Waiting or assuming others have acted is not accountable behaviour."
  },
  {
    id: 5,
    question: "The 'competent person' requirement means that accountable workers must:",
    options: [
      "Hold a university degree",
      "Have sufficient training, knowledge, and experience for the task",
      "Be over 25 years old",
      "Have worked in the industry for at least 10 years"
    ],
    correctAnswer: 1,
    explanation: "A competent person must have sufficient training, knowledge, experience, and other qualities to undertake the task safely. This varies by task complexity but is essential for demonstrating accountability."
  },
  {
    id: 6,
    question: "If you're asked to perform work you're not competent to do, the accountable response is to:",
    options: [
      "Attempt the work and hope for the best",
      "Refuse or request proper training before proceeding",
      "Complete the work but blame others if problems occur",
      "Do the minimum and leave quickly"
    ],
    correctAnswer: 1,
    explanation: "The accountable response is to refuse the work or request proper training. Accepting work beyond your competence creates personal liability. Being honest about your limitations is professional and protects everyone."
  },
  {
    id: 7,
    question: "A supervisor who signs off incomplete inspection records is:",
    options: [
      "Protected because they didn't do the inspection themselves",
      "Not accountable as long as no incident occurs",
      "Personally accountable for the false documentation",
      "Only responsible to their employer, not the law"
    ],
    correctAnswer: 2,
    explanation: "Signing off incomplete or false inspection records makes the supervisor personally accountable for that documentation. This is a serious breach that can result in prosecution, especially if an incident occurs."
  },
  {
    id: 8,
    question: "Corporate manslaughter legislation means that:",
    options: [
      "Only individual workers can be prosecuted for fatal incidents",
      "Senior managers can be held accountable for organisational failures causing death",
      "Companies cannot be held criminally responsible",
      "Accountability only applies to the person who caused the incident"
    ],
    correctAnswer: 1,
    explanation: "Corporate manslaughter legislation allows prosecution of organisations and senior managers when gross negligence in management causes death. This extends accountability to those who create or tolerate unsafe systems."
  },
  {
    id: 9,
    question: "The principle of 'reasonable practicability' in accountability means:",
    options: [
      "You only need to do what's convenient",
      "Safety measures should be balanced against time, cost, and difficulty",
      "Budget concerns always override safety requirements",
      "You can ignore safety if it slows down work"
    ],
    correctAnswer: 1,
    explanation: "Reasonable practicability means weighing the risk against the sacrifice (time, cost, physical difficulty) needed to avert it. However, safety generally prevails unless the sacrifice is grossly disproportionate to the risk."
  },
  {
    id: 10,
    question: "Proactive accountability in health and safety involves:",
    options: [
      "Only responding when incidents occur",
      "Anticipating hazards and taking preventive action before incidents happen",
      "Delegating all safety responsibilities to specialists",
      "Focusing solely on compliance with minimum legal requirements"
    ],
    correctAnswer: 1,
    explanation: "Proactive accountability means anticipating hazards and taking preventive action rather than waiting for incidents. It involves continuous improvement, hazard identification, and going beyond minimum legal compliance."
  },
  {
    id: 11,
    question: "When multiple people are involved in a safety failure, accountability is typically:",
    options: [
      "Assigned only to the most junior person",
      "Shared among all those who contributed to the failure",
      "Automatically transferred to the employer",
      "Assigned only to the person present when the incident occurred"
    ],
    correctAnswer: 1,
    explanation: "Accountability is typically shared among all those who contributed to the failure. This may include the worker, supervisor, manager, and even directors - each accountable for their role in the chain of events."
  },
  {
    id: 12,
    question: "A worker who deliberately bypasses a safety guard is accountable under:",
    options: [
      "No legislation - it's just a workplace rule",
      "HSWA Section 8 which prohibits intentionally interfering with safety provisions",
      "Only company disciplinary procedures",
      "Civil law only, not criminal law"
    ],
    correctAnswer: 1,
    explanation: "HSWA Section 8 makes it an offence to intentionally or recklessly interfere with or misuse anything provided for safety. Deliberately bypassing safety guards is a criminal offence with personal liability."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "Can I be prosecuted personally for a health and safety breach?",
    answer: "Yes. Under HSWA and other regulations, individual workers can be prosecuted, fined, and even imprisoned for health and safety breaches. This includes failing to take reasonable care, interfering with safety equipment, or accepting work beyond your competence. 'I was just following orders' is not a valid defence if you knew or should have known the work was unsafe."
  },
  {
    question: "What's the difference between responsibility and accountability?",
    answer: "Responsibility relates to your duties - what you're supposed to do. Accountability is about being answerable for whether you fulfilled those duties and the consequences of your actions. You can delegate responsibility, but accountability remains with you. For example, a supervisor can assign a safety inspection to a worker (responsibility) but remains accountable for ensuring it was done properly."
  },
  {
    question: "How do I demonstrate accountability without creating excessive paperwork?",
    answer: "Focus on proportionate documentation. For routine tasks, standardised checklists work well. For complex or high-risk work, more detailed records are appropriate. The key is having enough documentation to demonstrate that appropriate safety measures were taken, without creating bureaucracy that gets ignored. Quality over quantity."
  },
  {
    question: "What if my employer pressures me to take shortcuts?",
    answer: "Document your concerns in writing (email is good). If you're asked to do something unsafe, you have the legal right to refuse. Report concerns to your supervisor, then to their manager if necessary, and ultimately to the HSE if internal routes fail. You're protected from dismissal for raising genuine safety concerns under HSWA and the Employment Rights Act."
  },
  {
    question: "Does my employer's liability insurance cover my personal liability?",
    answer: "Not always. While employer's liability insurance covers the company, individual workers may still face personal prosecution. Some employers provide additional cover, but criminal penalties (fines, imprisonment) cannot be insured against. Professional indemnity insurance may offer some protection for certain civil claims."
  },
  {
    question: "How far does my accountability extend - just my own work or other people's too?",
    answer: "You're primarily accountable for your own actions, but this extends to their impact on others. If your work creates a hazard for colleagues or the public, you're accountable. Supervisors and managers have additional accountability for overseeing others' work. Everyone has a duty to report hazards they observe, even if not directly involved in that work."
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module1Section6_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">

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
            <span>Module 1.6.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Accountability for Safe Working Practices
          </h1>
          <p className="text-white/80">
            Understanding personal and professional accountability in workplace health and safety
          </p>
        </header>

        {/* ----------------------------------------
            QUICK SUMMARY BOXES
            ---------------------------------------- */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Accountability:</strong> Being answerable for your actions and their consequences</li>
              <li><strong>Personal liability:</strong> Individuals can face prosecution and fines</li>
              <li><strong>Documentation:</strong> Records prove you fulfilled your safety duties</li>
              <li><strong>Competence:</strong> Only accept work you're qualified to do safely</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Tasks requiring sign-off, incomplete documentation, work beyond competence</li>
              <li><strong>Use:</strong> Maintain accurate records, report hazards immediately, refuse unsafe work</li>
              <li><strong>Apply:</strong> Demonstrate proactive safety behaviour, document decisions</li>
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
              "Define accountability versus responsibility in safety contexts",
              "Understand personal liability under HSWA",
              "Recognise the importance of documentation",
              "Apply competence requirements to accountability",
              "Identify proactive accountability behaviours",
              "Understand consequences of accountability failures"
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
            What is Accountability?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Accountability in health and safety means being answerable for your actions, decisions, and their consequences. While responsibility describes your duties, accountability is about whether you fulfilled those duties and the outcomes that resulted. Every person on site - from apprentice to director - has accountability for safety.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key distinctions between responsibility and accountability:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Responsibility</strong> - Can be shared or delegated; describes what you should do</li>
                <li><strong>Accountability</strong> - Cannot be delegated; describes what you answer for</li>
                <li><strong>Example:</strong> A supervisor delegates an inspection (shares responsibility) but remains accountable for ensuring it's done correctly</li>
              </ul>
            </div>

            <p>
              Understanding this distinction is crucial because it means you cannot escape accountability by delegating work. If you're the supervisor who assigned an inspection that wasn't properly completed, you're still accountable even though someone else did the actual inspection.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Accountability travels upward as well as applying at every level. A director is accountable for creating systems that enable safe working, not just individual workers' actions.
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
            Personal Liability Under Law
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              UK health and safety law creates personal liability for individuals, not just companies. Under the Health and Safety at Work Act 1974, individual workers can be prosecuted, fined, and even imprisoned for breaches. This isn't just theoretical - electricians have received prison sentences for safety failures that caused deaths.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Legal duties creating personal liability:</p>
                <ul className="text-sm text-white space-y-1">
                  <li>HSWA Section 7 - Take reasonable care for yourself and others</li>
                  <li>HSWA Section 8 - Don't interfere with safety provisions</li>
                  <li>Various regulations - Specific duties for specific tasks</li>
                  <li>Common law - General duty of care to others</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Potential consequences:</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Criminal prosecution and conviction</li>
                  <li>Unlimited fines for serious breaches</li>
                  <li>Imprisonment (up to life for manslaughter)</li>
                  <li>Prohibition from working in the industry</li>
                </ul>
              </div>
            </div>

            <p>
              'I was just following orders' is not a defence if you knew or should have known the work was unsafe. Courts examine whether a reasonable person with your training and experience would have recognised the danger. This is why competence and knowledge increase your accountability - you're expected to know better.
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
            Demonstrating Accountability Through Documentation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Documentation is essential for demonstrating accountability. If something goes wrong, investigators will ask: "What did you do to prevent this?" Your records provide evidence that you took appropriate action. Without documentation, your word against the evidence of an incident is a weak position.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Essential documentation for demonstrating accountability:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Risk assessments</strong> - Show you identified and addressed hazards</li>
                <li><strong>Method statements</strong> - Demonstrate planned safe systems of work</li>
                <li><strong>Training records</strong> - Prove competence for the work undertaken</li>
                <li><strong>Inspection logs</strong> - Evidence of ongoing monitoring</li>
                <li><strong>Tool and equipment checks</strong> - Show proper maintenance</li>
                <li><strong>Certificates and test results</strong> - Verify work completed correctly</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> An electrician completing a consumer unit change documents the isolation procedure, test results before and after, and photographs of the completed work. When a question arises later about the installation, these records demonstrate exactly what was done and that it was done safely.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Documentation should be proportionate to risk. A simple visual inspection might need just a signature and date, while complex high-risk work requires detailed records.
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
            Competence and Proactive Accountability
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Competence is directly linked to accountability. Accepting work beyond your competence significantly increases personal liability - if something goes wrong, you'll be asked why you attempted work you weren't qualified to do. Being honest about your limitations is not weakness; it's professional and protects everyone.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Reactive</p>
                <p className="text-white/90 text-xs">Responds after incidents occur - minimum accountability</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Compliant</p>
                <p className="text-white/90 text-xs">Meets legal requirements - standard accountability</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Proactive</p>
                <p className="text-white/90 text-xs">Anticipates hazards, prevents incidents - exemplary accountability</p>
              </div>
            </div>

            <p>
              Proactive accountability means anticipating hazards and taking action before incidents occur. It involves continuous improvement, actively seeking out hazards, and going beyond minimum legal compliance. This doesn't just reduce risk - it demonstrates the highest level of professional accountability.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Proactive accountability behaviours:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Identifying hazards before being asked to look</li>
                <li>Suggesting improvements to safety procedures</li>
                <li>Supporting colleagues in working safely</li>
                <li>Stopping work when conditions change</li>
                <li>Reporting near-misses without being prompted</li>
                <li>Continuously developing safety knowledge and skills</li>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Building Accountability into Daily Work</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Start each job with a brief hazard assessment - make it routine</li>
                <li>Document decisions, not just actions - explain why you chose a method</li>
                <li>Ask questions if unclear - uncertainty doesn't demonstrate competence</li>
                <li>Sign only what you've personally verified or completed</li>
                <li>Keep copies of important records for your own protection</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Accountability is Challenged</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Document your actions contemporaneously (at the time, not after)</li>
                <li>If pressured to cut corners, put your concerns in writing</li>
                <li>Use the company's reporting systems - creates a record</li>
                <li>Know your right to refuse genuinely unsafe work</li>
                <li>Seek union advice if you face retaliation for safety concerns</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Accountability Failures to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Signing incomplete records</strong> - Creates false documentation you're accountable for</li>
                <li><strong>Accepting work beyond competence</strong> - Increases liability if things go wrong</li>
                <li><strong>Assuming someone else reported a hazard</strong> - Each person is individually accountable</li>
                <li><strong>Blaming others without examining your role</strong> - Courts examine contribution, not just cause</li>
                <li><strong>Ignoring unsafe practices by colleagues</strong> - Failure to act when you have authority</li>
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
                <p className="font-medium text-white mb-1">Legal Framework</p>
                <ul className="space-y-0.5">
                  <li>HSWA Section 7 - Individual duty of care</li>
                  <li>HSWA Section 8 - Not to interfere with safety</li>
                  <li>Corporate Manslaughter Act 2007</li>
                  <li>Common law duty of care</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Documents</p>
                <ul className="space-y-0.5">
                  <li>Risk assessments with signatures</li>
                  <li>Method statements</li>
                  <li>Training certificates</li>
                  <li>Inspection and test records</li>
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
            <Link to="/study-centre/apprentice/level3-module1-section6-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              6.1 Duty of Care
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module1-section6-3">
              6.3 Disciplinary Actions
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module1Section6_2;
