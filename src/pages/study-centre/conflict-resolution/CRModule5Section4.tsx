import { ArrowLeft, ClipboardCheck, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

/* ------------------------------------------------------------------ */
/*  Quick-check questions (InlineCheck — correctIndex, 0-indexed)      */
/* ------------------------------------------------------------------ */
const quickCheckQuestions = [
  {
    id: 'cr-5-4-check1',
    question:
      'An electrician realises they tend to avoid difficult conversations with clients until the problem becomes severe. They want to improve. Which single change would have the biggest impact on this pattern?',
    options: [
      'Reading more books about conflict resolution theory',
      'Committing to raising issues within 24 hours of noticing them, using a prepared opening phrase like "I have noticed something I would like to discuss with you"',
      'Hiring an office manager to handle all client communication',
      'Avoiding clients who might be difficult',
    ],
    correctIndex: 1,
    explanation:
      'The biggest barrier to addressing conflict is usually not a lack of knowledge but a lack of a specific, actionable trigger. Having a prepared opening phrase removes the cognitive burden of figuring out how to start the conversation — which is the moment when most people default to avoidance. "I have noticed something I would like to discuss with you" is neutral, professional, and non-confrontational. Combined with a time commitment (within 24 hours), it creates a concrete behavioural rule that overrides the natural tendency to postpone. This is a classic example of an implementation intention — a specific plan that links a situation ("I notice a problem") to a behaviour ("I use my prepared phrase within 24 hours"). Research shows that implementation intentions are far more effective than general goals like "I will be better at having difficult conversations."',
  },
  {
    id: 'cr-5-4-check2',
    question:
      'An electrician is building their personal conflict prevention checklist. Which of the following should be on it?',
    options: [
      'Only accept clients who have been personally recommended by existing clients',
      'Written quote with full scope, T&Cs, variation procedure, confirmation emails for all verbal agreements, and clear payment terms with deposit requirements',
      'Complete all work before discussing price to avoid awkward conversations',
      'Never put anything in writing to maintain flexibility',
    ],
    correctIndex: 1,
    explanation:
      'The conflict prevention checklist should contain every piece of documentation and process that prevents the most common disputes. Written quotes with full scope and exclusions prevent scope disagreements. Terms and conditions set the rules of engagement. A variation procedure ensures changes are agreed and documented. Confirmation emails convert risky verbal agreements into evidence. Clear payment terms with deposit requirements prevent the late payment and non-payment disputes that are the most financially damaging conflicts for electricians. Each of these items addresses a specific, common category of conflict. Together, they form a comprehensive prevention system that eliminates the vast majority of disputes before they can begin.',
  },
  {
    id: 'cr-5-4-check3',
    question:
      'On the escalation ladder, at what point should an electrician consider formal processes (adjudication, small claims court) rather than continuing to try informal resolution?',
    options: [
      'Immediately at the first sign of any disagreement — formal processes are always better',
      'Only after trying direct resolution and mediation, when the other party refuses to engage constructively, and the financial or professional stakes justify the time and cost of formal proceedings',
      'Never — formal processes always damage relationships and should be avoided at all costs',
      'Only when the amount in dispute exceeds £25,000',
    ],
    correctIndex: 1,
    explanation:
      'The escalation ladder is designed to resolve conflicts at the lowest possible level, because each step up increases cost, time, stress, and relationship damage. Direct resolution should always be the first attempt — a calm, professional conversation between the parties involved. If that fails, mediation (a neutral third party facilitating discussion) is the next step. Only when both of these have been exhausted, and the other party is unwilling to engage constructively, should formal processes be considered. The decision to escalate should also consider the stakes: pursuing adjudication over a £150 dispute is rarely cost-effective, but it may be necessary for a £5,000 non-payment. The threshold is not purely financial — it also includes professional reputation, legal precedent, and the principle at stake.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'How do I know what my default conflict style is?',
    answer:
      'The Thomas-Kilmann Conflict Mode Instrument (TKI), which we covered in Module 1, identifies five conflict styles: Competing, Collaborating, Compromising, Avoiding, and Accommodating. Most people have a default style that they fall into under pressure, even if they are capable of using all five. To identify yours, reflect honestly on your recent conflicts: Do you tend to push your position assertively (Competing)? Do you seek win-win solutions through dialogue (Collaborating)? Do you look for middle ground (Compromising)? Do you sidestep or postpone difficult conversations (Avoiding)? Do you give in to maintain harmony (Accommodating)? You can also ask trusted colleagues or friends for their honest observation — they often see your patterns more clearly than you do. Once you know your default, you can consciously choose different approaches when your default would not serve you well.',
  },
  {
    question: 'What is the ACAS helpline and when should I call it?',
    answer:
      'The ACAS (Advisory, Conciliation and Arbitration Service) helpline is 0300 123 1100, available Monday to Friday, 8am to 6pm. ACAS provides free, impartial advice on workplace relationships and employment law. You should call when you have a dispute with an employer or employee (including apprentices), when you need guidance on employment rights or obligations, when you are facing or considering disciplinary action, when you want advice on handling a grievance, or when you need information about mediation or conciliation services. ACAS advisors can explain your legal rights, suggest approaches to resolution, and refer you to mediation services if appropriate. For electrical subcontractor disputes (which are commercial rather than employment matters), ACAS may redirect you to other services, but they are always a good first point of contact for workplace relationship issues.',
  },
  {
    question: 'What should I do if I cannot afford to pursue a formal dispute resolution process?',
    answer:
      'Cost is a legitimate concern, but there are several options available. For claims under £10,000, the small claims court is designed to be accessible without legal representation — you complete the claim online, pay a modest court fee (starting from £35), and the process is designed for individuals to manage themselves. For construction disputes, adjudication under the Housing Grants, Construction and Regeneration Act 1996 is available as a statutory right and is designed to be faster and cheaper than court proceedings. The Federation of Small Businesses (FSB) provides legal advice and support as part of its membership. Citizens Advice offers free guidance on dispute resolution options. Some solicitors offer free initial consultations. And mediation through services like the Centre for Effective Dispute Resolution (CEDR) can be surprisingly affordable. Before assuming you cannot afford formal processes, research the specific costs — they are often much lower than people expect.',
  },
  {
    question: 'What are the three quickest changes I can make this week to prevent conflict?',
    answer:
      'First, update your quote template to include clear exclusions (what is NOT included), a variation procedure (how changes will be handled and priced), and specific payment terms (due date, deposit requirements, late payment consequences). This single document change prevents the three most common domestic disputes. Second, start sending a brief confirmation text or email after every verbal agreement with a client — additional work, timeline changes, access arrangements, anything. This takes less than a minute and creates evidence that prevents "he said, she said" disputes. Third, commit to the 24-hour rule: when you receive an angry message or encounter a difficult situation that is not urgent, wait 24 hours before responding. Draft your response immediately if you want to, but do not send it until the following day. These three changes require no investment, no training, and no special tools — just a conscious decision to implement them starting now.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions (Quiz — correctAnswer, 0-indexed)                   */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question: 'The purpose of a conflict resolution action plan is:',
    options: [
      'To prepare legal documents for potential court proceedings',
      'To translate the knowledge and skills from this course into specific, actionable behaviours that you will implement in your daily practice',
      'To create a business plan for a conflict resolution consultancy',
      'To document all previous conflicts you have experienced',
    ],
    correctAnswer: 1,
    explanation:
      'An action plan bridges the gap between knowing and doing. Many people complete a course, understand the principles, and then return to exactly the same behaviours because they have not translated knowledge into specific, actionable commitments. The action plan asks concrete questions: What is my default conflict style, and when does it not serve me well? Which 2-3 communication frameworks will I practice first? What documentation do I need to create or update? What will I do differently when the next conflict arises? The specificity is critical — "I will be better at conflict resolution" is not an action plan. "I will use the NVC framework when raising payment issues, starting with my next invoice" is an action plan.',
  },
  {
    id: 2,
    question:
      'An electrician identifies that their default conflict style is "Avoiding." What is the most useful next step?',
    options: [
      'Try to change their personality so they no longer avoid conflict',
      'Recognise that avoidance is sometimes appropriate (genuinely trivial issues, temporary relationships) but develop the skill to choose when to engage, and create a specific plan for when they will address issues directly',
      'Accept that avoidance is their natural style and stop trying to change it',
      'Switch to a competing style for all conflicts to compensate',
    ],
    correctAnswer: 1,
    explanation:
      'Self-awareness about your default style is valuable, but the goal is not to eliminate your default — it is to expand your range. Avoidance is a legitimate and sometimes optimal strategy: for genuinely trivial issues, for conflicts where the relationship is temporary and the stakes are low, or for situations where engaging would be counterproductive. The problem arises when avoidance is your automatic response to all conflicts, including those that need to be addressed. The action plan should identify specific situations where you tend to avoid but should engage (for example, late payment, scope creep, quality concerns), and create concrete triggers for action (for example, "I will raise payment concerns within 3 days of the due date using my prepared opening phrase"). This targeted approach is far more effective than trying to overhaul your entire personality.',
  },
  {
    id: 3,
    question:
      'Which of the following is the correct order on the escalation ladder (from lowest to highest)?',
    options: [
      'Formal legal proceedings, adjudication, mediation, direct resolution',
      'Direct resolution, mediation, formal processes (adjudication/small claims), walk away',
      'Walk away, mediation, direct resolution, adjudication',
      'Mediation, direct resolution, formal proceedings, negotiation',
    ],
    correctAnswer: 1,
    explanation:
      'The escalation ladder runs from lowest (cheapest, fastest, least damaging to relationships) to highest (most expensive, slowest, most damaging). Direct resolution — a calm, professional conversation between the parties — should always be the first attempt. If that fails, mediation introduces a neutral third party to facilitate discussion and is significantly cheaper and faster than formal proceedings. Only if mediation fails or the other party refuses to engage should formal processes (adjudication under the Construction Act, small claims court) be considered. Walking away — deciding that the cost of pursuing the dispute exceeds the potential benefit — is always an option at any stage and is sometimes the most rational choice. The key principle is to resolve at the lowest level possible, escalating only when necessary.',
  },
  {
    id: 4,
    question: 'A "communication toolkit" for conflict resolution should include:',
    options: [
      'A script for every possible conflict scenario you might encounter',
      'Selected frameworks you have practised (e.g. NVC, STATE, assertiveness formula) and specific phrases you can use as conversation starters',
      'A collection of aggressive statements to intimidate the other party',
      'Nothing — communication should always be spontaneous and unrehearsed',
    ],
    correctAnswer: 1,
    explanation:
      'A communication toolkit is a personal collection of frameworks and phrases that you have selected, practised, and can deploy when needed. You do not need to master every framework covered in this course — picking 2 or 3 that feel natural and practising them until they become second nature is far more effective than trying to use a different approach for every situation. Having prepared opening phrases for common situations ("I have noticed something I would like to discuss with you," "I want to make sure we are on the same page about...") removes the cognitive burden of figuring out how to start difficult conversations, which is when most people default to avoidance. The toolkit should feel authentic to you — frameworks only work when they are delivered genuinely, not recited mechanically.',
  },
  {
    id: 5,
    question:
      "Which of the following is the BEST example of a conflict prevention measure in a domestic electrician's daily practice?",
    options: [
      'Refusing to take on any client who asks for a discount',
      'Sending a confirmation text after every verbal agreement about additional work, changes, or timelines',
      'Completing all work for free to avoid any possibility of a payment dispute',
      'Never answering the phone so all communication is in writing',
    ],
    correctAnswer: 1,
    explanation:
      'The confirmation text is the single most impactful daily prevention measure available to domestic electricians. It converts verbal agreements (which are legally binding but practically unenforceable) into documented evidence. It gives the client an immediate opportunity to correct any misunderstanding. It establishes a professional standard of communication. And it takes less than a minute. The reason it is more effective than any other single measure is that verbal agreements are the source of the most common domestic disputes: "I thought the extras were included," "We never agreed to that price," "You said you would be done by Friday." A simple text message sent immediately after the conversation prevents all of these disputes. It is the highest-impact, lowest-effort change any electrician can make.',
  },
  {
    id: 6,
    question:
      'An electrician has completed this course and wants to create a personal action plan. Which of the following approaches is most likely to result in lasting behaviour change?',
    options: [
      'Try to implement everything covered in the course immediately',
      'Pick 3 specific, concrete changes to implement this week, practise them consistently for a month, then add further changes gradually',
      'Wait until the next conflict arises and then decide what to do',
      'Read the course material again without making any changes to current practice',
    ],
    correctAnswer: 1,
    explanation:
      'Behaviour change research consistently shows that attempting to change too many things simultaneously leads to overwhelm and failure, while making no changes means the learning is wasted. The most effective approach is to select a small number of specific, concrete changes (ideally 3), implement them immediately, and practise them consistently until they become habitual — typically about 30 days. Once these are embedded, you can add further changes. The changes should be specific and actionable (not "be better at communication" but "send a confirmation text after every verbal agreement") and should target your biggest areas of vulnerability (the situations where you most commonly experience conflict). This incremental approach creates lasting change because each new behaviour becomes automatic before the next is added.',
  },
  {
    id: 7,
    question: 'The ACAS helpline number is:',
    options: ['0800 555 111', '0300 123 1100', '0845 600 9006', '111'],
    correctAnswer: 1,
    explanation:
      'The ACAS helpline number is 0300 123 1100, available Monday to Friday, 8am to 6pm. ACAS (Advisory, Conciliation and Arbitration Service) provides free, impartial advice on workplace relationships and employment law. It is funded by the Department for Business and Trade and is one of the most valuable resources available to anyone experiencing workplace conflict in the UK. Their advisors can explain your legal rights, suggest resolution approaches, and direct you to mediation or conciliation services. For electricians, ACAS is particularly relevant for disputes involving employment relationships (with employers or employees, including apprentices), but they can also signpost to appropriate services for commercial disputes between businesses.',
  },
  {
    id: 8,
    question:
      'When should an electrician walk away from a dispute rather than continuing to pursue resolution?',
    options: [
      'Never — every dispute should be pursued to a final resolution regardless of cost',
      'Always — disputes are never worth the stress and should be abandoned immediately',
      'When the cost of pursuing the dispute (in time, money, stress, and relationship damage) exceeds the potential benefit of resolution, or when the other party is acting in bad faith and no resolution is possible',
      'Only when a solicitor advises them to',
    ],
    correctAnswer: 2,
    explanation:
      'Walking away is a legitimate and sometimes optimal strategy on the escalation ladder. The decision should be based on a rational cost-benefit analysis: What will it cost me in time, money, stress, and opportunity cost to pursue this further? What is the realistic best outcome if I succeed? Is the other party engaging in good faith, or are they stalling, obstructing, or acting dishonestly? For a £200 dispute that would require £500 in legal costs and three days of lost work to pursue, walking away and learning from the experience (updating your T&Cs, for example) may be the most rational choice. For a £5,000 non-payment by a client who is clearly acting in bad faith, pursuing formal resolution is justified. The key is making the decision consciously and strategically rather than defaulting to either pursuit or abandonment.',
  },
];

export default function CRModule5Section4() {
  useSEO({
    title: 'Your Conflict Resolution Action Plan | Conflict Resolution Module 5.4',
    description:
      'Self-assessment, communication toolkit, prevention checklist, escalation ladder, and quick wins to implement this week.',
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cr-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-400/20 border border-rose-500/30 mb-4">
            <ClipboardCheck className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 5 &middot; SECTION 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Your Conflict Resolution Action Plan
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Self-assessment, your communication toolkit, prevention checklist, escalation ladder,
            and quick wins you can implement this week
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Self-assessment:</strong> know your default conflict style and your personal
                triggers
              </li>
              <li>
                <strong>Communication toolkit:</strong> pick 2&ndash;3 frameworks (NVC, STATE,
                assertiveness) and practise them
              </li>
              <li>
                <strong>Prevention checklist:</strong> quotes, T&amp;Cs, confirmation emails,
                variation orders
              </li>
              <li>
                <strong>Escalation ladder:</strong> resolve yourself, mediate, formalise, or walk
                away
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Knowledge without action is useless.</strong> The value of this course is
                entirely in what you do differently from today onwards
              </li>
              <li>
                <strong>Small changes compound.</strong> Three specific changes this week will
                produce more results than trying to overhaul everything at once
              </li>
              <li>
                <strong>Preparation prevents panic.</strong> Having a plan means you respond
                deliberately, not reactively, when conflict arises
              </li>
              <li>
                <strong>Resources exist.</strong> ACAS, Citizens Advice, FSB, mediation services
                &mdash; you do not have to handle everything alone
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              'Identify your default conflict style, personal triggers, and the situations where your default response does not serve you well',
              'Select and prepare a personal communication toolkit of 2-3 frameworks and opening phrases for difficult conversations',
              'Create a comprehensive conflict prevention checklist covering documentation, processes, and communication habits',
              'Describe the escalation ladder and explain when to resolve directly, mediate, use formal processes, or walk away',
              'Identify three specific, actionable changes to implement this week that will have the greatest impact on preventing conflict',
              'Access key resources including ACAS, Citizens Advice, and the Federation of Small Businesses for ongoing support',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            Bringing It All Together
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Over the course of five modules, you have built a comprehensive understanding of
                conflict in the construction industry and developed a practical toolkit for managing
                it. You have learned what conflict is and why it is not inherently negative (Module
                1). You have explored the five conflict styles and when to use each one (Module 1).
                You have studied communication frameworks &mdash; Non-Violent Communication (NVC),
                the STATE path, the assertiveness formula, and active listening (Modules 2 and 3).
                You have examined client conflicts, payment disputes, negotiation, and mediation
                (Module 3). You have tackled site-specific conflicts with other trades, main
                contractors, and the legal framework of the Construction Act (Module 4). And now, in
                this final module, you have covered contracts and written agreements, de-escalation
                techniques, and building professional relationships (Module 5).
              </p>

              <p>
                The critical question now is:{' '}
                <strong>what will you actually do differently as a result?</strong> Knowledge
                without application is just interesting information. The difference between an
                electrician who has completed this course and one who has not is not what they know
                &mdash; it is what they do. This section is about turning your knowledge into a
                concrete, personal action plan that you will begin implementing immediately. The
                starting point is honest self-assessment. What is your default conflict style?
                (Recall the Thomas-Kilmann instrument: Competing, Collaborating, Compromising,
                Avoiding, or Accommodating.) What are your personal triggers &mdash; the situations,
                behaviours, or topics that reliably activate your emotional response? What are the
                conflict patterns in your working life &mdash; the types of dispute that keep
                recurring?
              </p>

              <p>
                Self-assessment is not about self-criticism. Every conflict style has strengths and
                appropriate uses. The goal is to recognise your default so that you can choose
                consciously rather than reacting automatically. If you know that your default is
                avoidance, you can catch yourself when you are postponing a difficult conversation
                and consciously choose to engage. If you know that your default is competing, you
                can catch yourself when you are pushing too hard and consciously choose to listen.
                If you know that your trigger is feeling disrespected, you can recognise the
                emotional activation early and apply de-escalation techniques to yourself before it
                drives your behaviour. Self-awareness is the foundation on which all the other
                skills are built.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            Your Communication Toolkit
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                This course has covered several communication frameworks, and you do not need to
                master all of them. The most effective approach is to select 2 or 3 that feel
                natural to you and practise them until they become second nature. Here is a brief
                recap to help you choose. <strong>Non-Violent Communication (NVC)</strong> by
                Marshall Rosenberg follows the structure: Observation, Feeling, Need, Request. It is
                particularly effective for expressing your own concerns without triggering
                defensiveness. Example: &ldquo;When the invoice was not paid by the agreed date
                [observation], I felt concerned [feeling] because I need reliable cash flow to run
                my business [need]. Could we agree a specific date for payment this week
                [request]?&rdquo;
              </p>

              <p>
                The <strong>STATE path</strong> (Patterson et al., from Crucial Conversations)
                stands for Share your facts, Tell your story, Ask for the other&rsquo;s path, Talk
                tentatively, Encourage testing. It is excellent for raising difficult issues with
                clients or colleagues. The <strong>assertiveness formula</strong> &mdash;
                &ldquo;When you [behaviour], I feel [emotion], because [impact]. What I need is
                [request]&rdquo; &mdash; is a simplified version that works well in the moment when
                you need a quick, structured way to express yourself. And{' '}
                <strong>active listening</strong> &mdash; giving full attention, reflecting back
                what you have heard, asking clarifying questions &mdash; is the universal foundation
                that makes all other frameworks more effective.
              </p>

              <p>
                In addition to frameworks, prepare specific <strong>opening phrases</strong> for
                common difficult conversations. Having these ready means you never have to figure
                out how to start the conversation in the moment &mdash; which is the point where
                most people default to avoidance. For payment issues: &ldquo;I would like to discuss
                the payment schedule &mdash; can we find a time to go through it together?&rdquo;
                For scope creep: &ldquo;I want to make sure we are on the same page about what is
                included in the original quote.&rdquo; For quality concerns: &ldquo;I have noticed
                something I would like to discuss with you before we go any further.&rdquo; For
                timeline issues: &ldquo;I want to give you an honest update on the programme and
                discuss how best to manage it.&rdquo; Write these down, adapt them to your own
                voice, and practise saying them until they feel natural. The confidence that comes
                from having prepared phrases is transformative.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            Prevention Checklist
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The paperwork that prevents disputes is the most valuable paperwork in your
                business. It is not bureaucracy &mdash; it is protection. Every document on this
                checklist addresses a specific, common category of conflict. Together, they form a
                comprehensive prevention system that eliminates the vast majority of disputes before
                they can begin. Review this list against your current practice and identify any
                gaps.
              </p>

              <p>
                <strong>Contracts and quotes:</strong> Your standard quote template should include a
                detailed scope of work (what is and is not included), a fixed price with VAT status,
                payment terms (due date, deposit requirements, stage payments for larger jobs),
                accepted payment methods, a variation procedure, a cancellation policy, a validity
                period (typically 30 days), and signature lines for both parties. For commercial
                work, ensure you have reviewed the subcontract terms thoroughly before signing,
                paying particular attention to payment schedules, retention terms, variation
                procedures, and dispute resolution clauses.
              </p>

              <p>
                <strong>Confirmation emails:</strong> Commit to sending a brief written confirmation
                after every verbal agreement &mdash; additional work, timeline changes, access
                arrangements, material selections, or any other agreement that could later be
                disputed. This is the single highest-impact habit change available to you.
                <strong> Variation orders:</strong> Whenever the scope changes during a job,
                document the change, the additional cost, and the client&rsquo;s written agreement
                before proceeding with the additional work. <strong>Expectation setting:</strong> At
                the start of every job, set explicit expectations about working hours, access
                requirements, dust and disruption, timeline, and how to raise any concerns. Unspoken
                expectations are the hidden source of most client dissatisfaction.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Complete Conflict Prevention Checklist
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>Detailed written quote with full scope and exclusions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>Standard terms and conditions signed by the client</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Clear payment terms: due date, deposit, stage payments, late payment clause
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>Variation procedure included in every quote</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>Confirmation email/text after every verbal agreement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>Written variation order for every scope change during a job</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>Explicit expectation setting at the start of every job</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Photographic record of work at each stage (especially before covering up)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>Follow-up contact after completion to check satisfaction</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>Certificates and documentation delivered promptly as promised</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Your Conflict Response Plan
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                When the next conflict arises &mdash; and it will, because conflict is a natural
                part of working life &mdash; you need a plan that you can follow without having to
                think through the theory in the heat of the moment. Your conflict response plan is a
                personal protocol that you develop in advance and apply when needed. It should cover
                what to do in the first few seconds (self-regulation), the first few minutes
                (de-escalation and acknowledgement), the first 24 hours (gathering information and
                choosing your approach), and the following days (implementing your chosen resolution
                strategy).
              </p>

              <p>
                <strong>Payment protection</strong> deserves specific attention because payment
                disputes are the most common and most financially damaging conflicts for
                electricians. Your payment protection plan should include: requiring a deposit
                before starting work (typically 20&ndash;30% for jobs over &pound;500); implementing
                stage payments for larger jobs tied to milestones; issuing invoices promptly with
                clear payment terms; sending a polite reminder on the day payment is due; following
                up with a firm but professional chase within 3 days of the due date; sending a
                formal letter before action at 14 days overdue; and knowing your options for formal
                recovery (small claims court for amounts under &pound;10,000, statutory interest
                under the Late Payment of Commercial Debts Act, adjudication under the Construction
                Act for commercial work).
              </p>

              <p>
                For each type of conflict you commonly face, prepare a brief response protocol.
                Client unhappy with workmanship: listen fully, inspect the concern together on site,
                acknowledge anything that needs correcting, explain your professional assessment,
                and agree a specific plan for resolution. Scope disagreement: refer to the written
                quote, identify which elements are in dispute, offer to review together, and if the
                client is asking for work beyond the original scope, invoke the variation procedure.
                Late payment: follow your payment chase process with escalating formality. Dispute
                with another trade: raise the issue directly and professionally, focusing on the
                shared goal of completing the project, and escalate to the site manager only if
                direct resolution fails.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            Escalation Ladder and Quick Wins
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The escalation ladder provides a clear framework for deciding when to try different
                approaches to resolution. The principle is simple: always start at the lowest level
                and only move up when the current level has genuinely been exhausted.
                <strong> Level 1: Direct resolution</strong> &mdash; a calm, professional
                conversation between the parties involved. This resolves the majority of conflicts
                when attempted early and skilfully.{' '}
                <strong>Level 2: Assisted resolution (mediation)</strong> &mdash; a neutral third
                party facilitates the discussion. This is appropriate when direct conversation has
                failed or when emotions are too high for productive dialogue.{' '}
                <strong>Level 3: Formal processes</strong> &mdash; adjudication (under the
                Construction Act for commercial work), small claims court (for amounts under
                &pound;10,000), or formal legal proceedings. These are appropriate only when
                informal methods have failed and the stakes justify the cost and time.{' '}
                <strong>Level 4: Walk away</strong> &mdash; deciding that the cost of continuing to
                pursue the dispute exceeds the potential benefit. This is always an option and is
                sometimes the most rational choice.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">The Escalation Ladder</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-rose-400 flex-shrink-0 w-6">1</span>
                    <span>
                      <strong>Direct resolution:</strong> Calm, professional conversation between
                      the parties. Use NVC, STATE, or assertiveness formula. Resolves most conflicts
                      when attempted early.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-rose-400 flex-shrink-0 w-6">2</span>
                    <span>
                      <strong>Mediation:</strong> Neutral third party facilitates discussion.
                      Available through ACAS, CEDR, or local mediation services. Cheaper and faster
                      than formal proceedings.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-rose-400 flex-shrink-0 w-6">3</span>
                    <span>
                      <strong>Formal processes:</strong> Adjudication (Construction Act, commercial
                      work), small claims court (under &pound;10,000), formal legal proceedings. Use
                      only when informal methods have failed.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-rose-400 flex-shrink-0 w-6">4</span>
                    <span>
                      <strong>Walk away:</strong> When the cost of pursuing exceeds the benefit.
                      Learn from the experience and update your prevention measures.
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                Finally, here are <strong>three changes you can implement this week</strong> that
                will have the greatest immediate impact on your conflict prevention. First, update
                your quote template to include clear exclusions, a variation procedure, and specific
                payment terms with a deposit requirement. Second, start sending a confirmation text
                or email after every verbal agreement with a client &mdash; no exceptions. Third,
                commit to the 24-hour rule for all non-urgent conflicts: when you receive an angry
                message or encounter a frustrating situation, wait a full day before responding.
                These three changes require no investment, no additional training, and no special
                tools. They can be implemented today. And they will prevent more conflicts than all
                the theory in the world.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Key Resources and Support</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>ACAS helpline:</strong> 0300 123 1100 (Monday&ndash;Friday,
                      8am&ndash;6pm) &mdash; free, impartial advice on workplace relationships and
                      employment law
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Citizens Advice:</strong> citizensadvice.org.uk &mdash; free guidance
                      on consumer rights, small claims, and dispute resolution
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Federation of Small Businesses (FSB):</strong> fsb.org.uk &mdash;
                      legal advice, debt recovery support, and employment guidance for members
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Centre for Effective Dispute Resolution (CEDR):</strong> cedr.com
                      &mdash; mediation and alternative dispute resolution services
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Recommended reading:</strong> <em>Crucial Conversations</em>
                      (Patterson et al.), <em>Verbal Judo</em> (George Thompson),
                      <em> Getting to Yes</em> (Fisher &amp; Ury), <em>The Trusted Advisor</em>
                      (Maister, Green &amp; Galford)
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>
            Section Summary
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                This final section has brought together everything you have learned across the
                course into a practical, personal action plan. The key points to carry forward are:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Know yourself.</strong> Identify your default conflict style, your
                    triggers, and your patterns. Self-awareness is the foundation.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Build your toolkit.</strong> Pick 2&ndash;3 communication frameworks,
                    prepare opening phrases, and practise until they are second nature.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Prevent through paperwork.</strong> Quotes, T&amp;Cs, confirmation
                    emails, variation orders, and expectation setting prevent the most common
                    disputes.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Have a response plan.</strong> Know what you will do when conflict
                    arises: self-regulate, de-escalate, listen, then choose your approach.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Use the escalation ladder.</strong> Direct resolution first, mediation
                    second, formal processes third, walk away if the cost exceeds the benefit.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Start with three changes this week.</strong> Updated quote template,
                    confirmation emails after verbal agreements, and the 24-hour rule.
                  </span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Course Complete:</strong> You have now covered
                  all five modules of the Conflict Resolution &amp; Difficult Conversations course.
                  The next step is the Mock Exam, which will test your knowledge across all modules
                  and confirm your understanding of the full course content. Good luck &mdash; and
                  remember, the real test is not the exam but what you do differently from today
                  onwards.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz title="Section 4 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cr-module-5-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Professional Relationships
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cr-module-6">
              Next: Mock Exam
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
