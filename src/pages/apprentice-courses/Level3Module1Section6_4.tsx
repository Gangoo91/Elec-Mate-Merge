/**
 * Level 3 Module 1 Section 6.4 - Ethical Responsibilities in Protecting Others
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
const TITLE = "Ethical Responsibilities in Protecting Others - Level 3 Module 1 Section 6.4";
const DESCRIPTION = "Understand ethical obligations for protecting colleagues, the public, and clients in electrical installation work. Learn how professional ethics go beyond legal requirements.";

// ============================================
// INLINE CHECK QUESTIONS
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is the key difference between legal and ethical responsibilities?",
    options: [
      "Legal and ethical mean the same thing",
      "Ethical responsibilities often go beyond minimum legal requirements",
      "Ethics only apply to managers",
      "Legal requirements are always stricter than ethics"
    ],
    correctIndex: 1,
    explanation: "Ethical responsibilities often go beyond minimum legal requirements. While legal compliance sets the floor, ethics guide us to do what's right, not just what's required. True professionals aim higher than legal minimums."
  },
  {
    id: "check-2",
    question: "Why should you never hide a safety-related mistake?",
    options: [
      "Because you might get caught later",
      "Because hidden mistakes can cause future harm to others",
      "Because paperwork requires it",
      "Because your supervisor might find out"
    ],
    correctIndex: 1,
    explanation: "Hidden mistakes can cause future harm. An undisclosed wiring error or failed test could result in fire, shock, or death later. Ethical responsibility means transparency - reporting mistakes so they can be corrected before anyone is hurt."
  },
  {
    id: "check-3",
    question: "What ethical obligation do electricians have to future occupants?",
    options: [
      "None - they only need to satisfy the current client",
      "To ensure installations remain safe for everyone who will use them",
      "Only to provide warranty documentation",
      "Just to follow building regulations"
    ],
    correctIndex: 1,
    explanation: "Electricians have an ethical obligation to ensure installations remain safe for all future occupants - tenants, visitors, children, elderly people. The work you do today may be there for decades, used by people who trust it's safe."
  },
  {
    id: "check-4",
    question: "How should you respond if asked to cut corners on safety to save money?",
    options: [
      "Do what the paying client asks",
      "Refuse and explain why safe work protects everyone",
      "Do it but document your objection",
      "Leave the job without explanation"
    ],
    correctIndex: 1,
    explanation: "You should refuse and explain why safe work protects everyone. Ethical professionals don't compromise on safety for financial reasons. Explain the risks clearly and offer compliant alternatives - but never compromise safety."
  }
];

// ============================================
// QUIZ QUESTIONS
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "Professional ethics in electrical work primarily concern:",
    options: [
      "Maximising profit on each job",
      "Doing what's right to protect people, even beyond legal minimums",
      "Following employer instructions without question",
      "Completing jobs as quickly as possible"
    ],
    correctAnswer: 1,
    explanation: "Professional ethics are about doing what's right to protect people. This goes beyond legal minimums - it's about taking responsibility for the safety and wellbeing of everyone affected by your work."
  },
  {
    id: 2,
    question: "An electrician notices a potentially dangerous condition in a property that's outside the scope of their current work. Ethically, they should:",
    options: [
      "Ignore it - it's not their job",
      "Inform the property owner/occupier of the potential danger",
      "Fix it and charge extra without discussing it",
      "Report it to the HSE immediately"
    ],
    correctAnswer: 1,
    explanation: "Ethically, you should inform the property owner/occupier of potential dangers you observe. Even if it's outside your work scope, you have knowledge that could prevent harm. A brief warning could save a life."
  },
  {
    id: 3,
    question: "Which scenario demonstrates ethical responsibility?",
    options: [
      "Using cheaper materials than specified because the client won't know",
      "Recommending unnecessary work to increase profit",
      "Refusing to sign off substandard work even under pressure",
      "Completing work quickly at the expense of quality"
    ],
    correctAnswer: 2,
    explanation: "Refusing to sign off substandard work, even under pressure, demonstrates ethical responsibility. Your signature represents your professional judgement - signing off unsafe work makes you complicit in any resulting harm."
  },
  {
    id: 4,
    question: "Why is honesty about your competence an ethical obligation?",
    options: [
      "It's only a legal requirement, not ethical",
      "Because taking on work beyond your competence puts people at risk",
      "So you can charge higher rates",
      "Competence isn't related to ethics"
    ],
    correctAnswer: 1,
    explanation: "Taking on work beyond your competence puts people at risk. Honestly acknowledging your limitations protects clients, the public, and yourself. Getting training or referring work to qualified colleagues is the ethical choice."
  },
  {
    id: 5,
    question: "What ethical principle applies when you discover a previous electrician's dangerous work?",
    options: [
      "Cover it up to protect the profession",
      "Inform the client and recommend remediation to protect occupants",
      "Fix it without telling anyone",
      "Report the previous electrician to the police"
    ],
    correctAnswer: 1,
    explanation: "You should inform the client and recommend remediation. The priority is protecting current and future occupants from danger. This isn't about blaming others - it's about ensuring safety is addressed."
  },
  {
    id: 6,
    question: "Confidentiality becomes an ethical issue when:",
    options: [
      "Client information could be used for marketing",
      "Safety information should be shared but the client asks you to keep quiet",
      "You're asked about pricing",
      "Discussing completed work with colleagues"
    ],
    correctAnswer: 1,
    explanation: "Confidentiality creates ethical tension when safety information should be shared but the client wants silence. While respecting confidentiality is important, it cannot extend to concealing dangers that could harm others."
  },
  {
    id: 7,
    question: "Environmental ethics in electrical work includes:",
    options: [
      "Only recycling when convenient",
      "Proper disposal of hazardous materials and considering energy efficiency",
      "Environmental concerns don't apply to electrical work",
      "Using the cheapest materials regardless of environmental impact"
    ],
    correctAnswer: 1,
    explanation: "Environmental ethics include proper disposal of hazardous materials (cables, batteries, components with toxic substances) and considering energy efficiency. Our work impacts the environment - ethical practice minimises harm."
  },
  {
    id: 8,
    question: "When facing pressure to complete unsafe work, an ethical electrician:",
    options: [
      "Complies to keep the customer happy",
      "Refuses, documents concerns, and escalates if necessary",
      "Completes the work but doesn't sign off",
      "Walks away without explanation"
    ],
    correctAnswer: 1,
    explanation: "An ethical electrician refuses unsafe work, documents concerns, and escalates if necessary. Compliance with pressure to do unsafe work makes you complicit. Document everything and use proper channels if pressured."
  },
  {
    id: 9,
    question: "The principle of 'do no harm' in electrical ethics means:",
    options: [
      "Never making any mistakes",
      "Actively ensuring your work doesn't create hazards for anyone",
      "Only avoiding harm to paying clients",
      "Focusing on your own safety only"
    ],
    correctAnswer: 1,
    explanation: "Do no harm means actively ensuring your work doesn't create hazards for anyone - clients, their families, future occupants, other workers, or the public. It's a positive duty to prevent harm, not just avoid causing it."
  },
  {
    id: 10,
    question: "Why should electricians consider vulnerable occupants when doing installations?",
    options: [
      "It's only necessary in care homes",
      "All occupants - including children, elderly, and disabled - must be safe around the installation",
      "Vulnerable people should live elsewhere",
      "Building regulations cover this automatically"
    ],
    correctAnswer: 1,
    explanation: "All potential occupants must be safe around installations. Children may explore, elderly people may have reduced reactions, disabled occupants may have specific needs. Ethical work considers all who might use the space."
  },
  {
    id: 11,
    question: "What is the ethical approach to pricing and charging?",
    options: [
      "Charge whatever the market will bear",
      "Fair pricing for work actually done, transparent about costs",
      "Always undercut competitors",
      "Add hidden charges where possible"
    ],
    correctAnswer: 1,
    explanation: "Ethical pricing means fair charges for work actually done, transparent about costs. Exploiting customers' lack of knowledge, hidden charges, or inflating prices damages trust in the profession and individual reputation."
  },
  {
    id: 12,
    question: "How do professional ethics benefit the electrical industry overall?",
    options: [
      "They don't - ethics reduce profits",
      "They build public trust and maintain professional standards",
      "They're only important for large companies",
      "Ethics have no impact on the industry"
    ],
    correctAnswer: 1,
    explanation: "Professional ethics build public trust and maintain standards across the industry. When electricians act ethically, it enhances the reputation of all professionals and justifies the trust clients place in qualified tradespeople."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "What if doing the right thing ethically costs me money or a job?",
    answer: "Short-term losses for ethical decisions often lead to long-term gains in reputation and trust. Clients who value cheap corners over safety aren't good long-term customers anyway. Your professional reputation is built over years but can be destroyed by one unethical decision. The work you do outlasts the immediate transaction - so does your responsibility for it."
  },
  {
    question: "How do I balance client confidentiality with safety concerns?",
    answer: "Safety always takes priority over confidentiality. If you discover dangerous conditions, you have an ethical (and often legal) duty to ensure they're addressed. You can often navigate this by explaining to the client why the issue must be dealt with. If they refuse to act on genuinely dangerous conditions, escalate through proper channels."
  },
  {
    question: "Is it ethical to recommend additional work I notice while on a job?",
    answer: "Yes, if the recommendation is genuine and in the client's interest. It's ethical (and helpful) to point out worn equipment, outdated wiring, or potential future problems. What's unethical is inventing problems or exaggerating issues to generate unnecessary work. Be honest about urgency - distinguish between 'should be done soon' and 'must be done immediately'."
  },
  {
    question: "What's my ethical responsibility if I make a mistake?",
    answer: "Own it, disclose it, and fix it. Mistakes happen - the ethical test is how you respond. Concealing a mistake that could cause future harm is a serious ethical breach. Informing the client, rectifying the issue (potentially at your cost if the error was yours), and learning from it is the professional response."
  },
  {
    question: "How do I handle pressure from employers to cut corners?",
    answer: "Document your concerns in writing. If pressured to do unsafe work, you have the legal right to refuse. Report through internal channels first, then to external bodies (HSE) if necessary. Whistleblower protections exist for those who report genuine safety concerns. Your professional registration may be at stake if you knowingly do substandard work."
  },
  {
    question: "Do ethics apply differently to domestic versus commercial work?",
    answer: "The same ethical principles apply to all work - protect everyone affected. Domestic clients may be more vulnerable (less technical knowledge), so clear communication is especially important. Commercial clients may have more pressure points (budgets, deadlines), but this doesn't reduce your ethical obligations. Every installation affects real people."
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module1Section6_4 = () => {
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
            <span>Module 1.6.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Ethical Responsibilities in Protecting Others
          </h1>
          <p className="text-white/80">
            Going beyond legal requirements to do what's right for people's safety
          </p>
        </header>

        {/* ----------------------------------------
            QUICK SUMMARY BOXES
            ---------------------------------------- */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Beyond legal:</strong> Ethics require more than minimum compliance</li>
              <li><strong>Do no harm:</strong> Actively prevent hazards to all people</li>
              <li><strong>Honesty:</strong> Be truthful about competence and mistakes</li>
              <li><strong>Future protection:</strong> Work safely for people you'll never meet</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Pressure to cut corners, hidden dangers, work beyond competence</li>
              <li><strong>Use:</strong> Refuse unsafe work, disclose risks, recommend corrections</li>
              <li><strong>Apply:</strong> Ask "would I be happy if my family lived here?"</li>
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
              "Distinguish legal from ethical responsibilities",
              "Apply the 'do no harm' principle to electrical work",
              "Understand obligations to future occupants",
              "Handle ethical dilemmas in practice",
              "Recognise when ethics require refusing work",
              "Build professional reputation through ethical practice"
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
            Ethics vs Legal Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Legal requirements set the minimum standard - what you must do to comply with the law. Ethical responsibilities go further - they're about doing what's right, even when the law doesn't require it. A truly professional electrician doesn't ask "is this legal?" but "is this right?"
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key differences between legal and ethical obligations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Legal</strong> - What you must do; defined by statute; enforceable by authorities</li>
                <li><strong>Ethical</strong> - What you should do; guided by professional values; enforced by conscience and profession</li>
                <li><strong>Example:</strong> It may be legal to install the cheapest compliant components, but ethical to recommend more durable options when appropriate</li>
              </ul>
            </div>

            <p>
              Ethical professionals build their reputation on going beyond minimums. When you consistently do what's right - not just what's required - clients trust you, colleagues respect you, and you can be proud of your work. Legal compliance keeps you out of court; ethical practice makes you a professional.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> The question "would I be happy if my family lived with this installation?" is a good ethical test for any work you complete.
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
            The 'Do No Harm' Principle
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              'Do no harm' isn't just a medical principle - it applies to any profession where your work affects others' safety. For electricians, this means actively ensuring your installations don't create hazards for anyone: clients, their families, visitors, future occupants, other tradespeople, or the general public.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Who might be affected by your work:</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Current occupants and their families</li>
                  <li>Future tenants or property owners</li>
                  <li>Visitors and guests</li>
                  <li>Other tradespeople working on the building</li>
                  <li>Emergency responders</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Vulnerable groups to consider:</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Children who may explore or touch things</li>
                  <li>Elderly with reduced reaction times</li>
                  <li>Disabled people with specific needs</li>
                  <li>People unfamiliar with the property</li>
                  <li>Those without electrical knowledge</li>
                </ul>
              </div>
            </div>

            <p>
              'Do no harm' is an active duty, not passive avoidance. It means thinking through consequences, considering who might be affected, and designing installations that remain safe even when used by people without electrical knowledge. Your work may be there for 30+ years - it must protect everyone who encounters it.
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
            Honesty, Transparency, and Competence
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Ethical practice demands honesty - about your competence, your work, and any problems you discover or create. The temptation to hide mistakes, exaggerate expertise, or withhold bad news is real, but giving in damages trust and potentially endangers lives.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Ethical honesty in practice:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Competence:</strong> Only take on work you're genuinely qualified to do safely</li>
                <li><strong>Mistakes:</strong> Disclose errors so they can be corrected before causing harm</li>
                <li><strong>Problems discovered:</strong> Inform clients of hazards even if outside your scope</li>
                <li><strong>Pricing:</strong> Be transparent about costs; don't exploit customers' lack of knowledge</li>
                <li><strong>Recommendations:</strong> Advise based on client's needs, not your profit margin</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> While installing new sockets, you notice the existing consumer unit is outdated and potentially dangerous. Even though replacing it isn't your job, ethically you should inform the client of the risk and recommend they get it assessed. They might not thank you immediately, but you could prevent a fire.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> If you're not sure you're competent for a task, that uncertainty is itself an answer. Get training, get supervision, or refer to someone more experienced.
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
            Handling Ethical Dilemmas
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Ethical dilemmas occur when different values conflict - pressure to complete work quickly vs doing it safely, client confidentiality vs reporting hazards, keeping your job vs refusing unsafe work. These situations test professional character.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Identify</p>
                <p className="text-white/90 text-xs">Recognise when values conflict</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Prioritise</p>
                <p className="text-white/90 text-xs">Safety always comes first</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Document</p>
                <p className="text-white/90 text-xs">Record your concerns and decisions</p>
              </div>
            </div>

            <p>
              When facing ethical dilemmas, safety must be the priority. Document your concerns, escalate through proper channels, and be prepared to refuse work that would compromise safety. Whistleblower protections exist for those who report genuine safety concerns in good faith.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Ethical decision-making questions:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Would I be comfortable if this appeared in a news story?</li>
                <li>Would I be happy for my family to use this installation?</li>
                <li>Can I justify this decision to other professionals?</li>
                <li>What would happen if everyone made this choice?</li>
                <li>Am I prioritising profit over people's safety?</li>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Building Ethical Practice</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Apply the 'family test' - would I want my family to live with this work?</li>
                <li>Be upfront about limitations - refer work beyond your competence</li>
                <li>Give honest assessments - don't invent problems or hide them</li>
                <li>Keep promises - if you commit to a standard, deliver it</li>
                <li>Treat all clients fairly regardless of their technical knowledge</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Ethics and Instructions Conflict</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Explain your concerns clearly and calmly</li>
                <li>Document the instruction and your objection in writing</li>
                <li>Offer alternatives that achieve the goal safely</li>
                <li>Escalate to senior management or external bodies if needed</li>
                <li>Know that refusal to do unsafe work is legally protected</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Ethical Breaches to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Concealing mistakes</strong> - Hidden errors become future hazards</li>
                <li><strong>Overstating competence</strong> - Taking work you can't do safely</li>
                <li><strong>Exploiting ignorance</strong> - Overcharging or unnecessary work</li>
                <li><strong>Cutting corners</strong> - Compromising safety for speed or profit</li>
                <li><strong>Signing false documents</strong> - Certificates must reflect reality</li>
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
                <p className="font-medium text-white mb-1">Core Ethical Principles</p>
                <ul className="space-y-0.5">
                  <li>Do no harm - actively prevent hazards</li>
                  <li>Honesty - about competence and work</li>
                  <li>Transparency - disclose problems and risks</li>
                  <li>Fairness - treat all clients appropriately</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Ethical Tests</p>
                <ul className="space-y-0.5">
                  <li>Would my family be safe with this?</li>
                  <li>Can I justify this to other professionals?</li>
                  <li>Would I be comfortable in a news story?</li>
                  <li>Am I prioritising safety over profit?</li>
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
            <Link to="/study-centre/apprentice/level3-module1-section6-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              6.3 Disciplinary Actions
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module1-section6-5">
              6.5 Safety Representatives
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module1Section6_4;
