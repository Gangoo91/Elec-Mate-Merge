import {
  ArrowLeft,
  Users,
  CheckCircle,
  HelpCircle,
  MessageSquare,
  Shield,
  AlertTriangle,
  Target,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'cr-4-4-check1',
    question:
      'Using the SBI model, which of the following is the correct way to give feedback to an apprentice who arrived late to site three times this week?',
    options: [
      '"You\'re always late. Sort it out or I\'ll have a word with the office."',
      '"On Monday, Wednesday and today you arrived after 08:00 when site start is 07:30. The impact is that I had to set up on my own and we lost half an hour of productive time each day. Going forward, I need you here by 07:25."',
      '"You need to be more professional about timekeeping."',
      '"Some people on site have noticed you\'re not pulling your weight with early starts."',
    ],
    correctIndex: 1,
    explanation:
      'The SBI model (Situation, Behaviour, Impact) requires specific, factual feedback. The correct answer identifies the specific situation (Monday, Wednesday and today), the specific behaviour (arriving after 08:00 when site start is 07:30), and the specific impact (having to set up alone, losing productive time). It then states the expectation going forward. The other options are vague, accusatory, or reference unnamed third parties — all of which trigger defensiveness rather than behaviour change. Notice that the correct answer contains no character judgements ("lazy," "unprofessional") — it focuses entirely on observable facts.',
  },
  {
    id: 'cr-4-4-check2',
    question:
      'You receive feedback from a colleague that your cable management on the last project was messy. Your immediate reaction is defensive. What should you do?',
    options: [
      'Explain why the cable management looked that way and defend your work',
      'Tell the colleague they are not qualified to judge your work',
      'Thank them for the feedback, ask for specific examples, and look for the kernel of truth',
      'Ignore the feedback because it was unsolicited',
    ],
    correctIndex: 2,
    explanation:
      "When you receive feedback that triggers a defensive reaction, the most productive response is to thank the person for raising it (which takes courage), ask for specific examples (which moves from vague criticism to actionable information), and look for the kernel of truth — the element of the feedback that, however uncomfortable, might have some validity. Defending yourself immediately shuts down the conversation. Dismissing the person's qualifications is hostile. Ignoring feedback means you miss an opportunity to improve. Even if you ultimately disagree with the feedback after reflection, the act of listening openly demonstrates professional maturity.",
  },
  {
    id: 'cr-4-4-check3',
    question:
      'An apprentice tells you they are being bullied by another member of the team. What is your primary responsibility?',
    options: [
      'Tell the apprentice to toughen up — construction sites are rough environments',
      "Investigate the allegation privately, take it seriously, and follow the JIB grievance procedure or your company's policy",
      'Confront the alleged bully immediately in front of the team',
      'Tell the apprentice to avoid the other person and it will sort itself out',
    ],
    correctIndex: 1,
    explanation:
      'As a supervisor or team leader, you have a duty of care towards all team members, particularly apprentices who are in a vulnerable position as trainees. Bullying allegations must be taken seriously, investigated privately (speaking to both parties separately), and handled through the appropriate formal process — either the JIB grievance procedure or your company\'s internal grievance and bullying policy. Telling the apprentice to "toughen up" is dismissive and may constitute a failure of your duty of care. Confronting the alleged bully publicly risks escalation and denies them natural justice. Ignoring the problem allows it to continue and may expose you to liability.',
  },
];

const faqs = [
  {
    question: 'How do I give feedback to someone who is more experienced than me?',
    answer:
      'The SBI model works regardless of seniority differences. The key is to focus on specific observations rather than general judgements, and to frame your feedback as a conversation rather than a directive. Use language that acknowledges their experience while raising your concern: "I noticed that the connections in the distribution board were quite tight — is there a reason you routed them that way? I was wondering if there might be a way to leave more slack for maintenance access." This approach raises the issue without implying the experienced person does not know what they are doing. Many experienced electricians have habits formed over decades that may not reflect current best practice, and a respectfully raised observation can be genuinely valuable. The important thing is that you are focusing on the work, not the person.',
  },
  {
    question: 'What should I do if my feedback is ignored?',
    answer:
      'If you give feedback using the SBI model and the behaviour does not change, you have several options depending on the severity of the issue. For minor quality or conduct issues, repeat the feedback, referencing the previous conversation: "We discussed this last Tuesday and I outlined what I needed. I have noticed the same issue has recurred. Can you help me understand what is preventing the change?" If the issue persists after a second conversation, document it in writing and consider whether formal action is appropriate under the JIB grievance procedure or your company policy. For safety-critical issues (such as an apprentice repeatedly failing to isolate before working on live equipment), escalation must be immediate regardless of whether previous feedback was given — safety issues cannot wait for a pattern to establish.',
  },
  {
    question: 'Is the feedback sandwich (positive-negative-positive) still recommended?',
    answer:
      'No. The feedback sandwich — where you bookend critical feedback with positive comments — has been widely discredited by workplace psychology research. The problem is that people quickly learn to recognise the pattern, so the positive comments lose all credibility ("here comes the compliment before the bad news"). It also dilutes the critical message, because the recipient remembers the positive bookends rather than the important feedback in the middle. Most significantly, it trains people to distrust genuine positive feedback, because they start expecting criticism to follow. The SBI model is far more effective: state the situation, describe the behaviour, explain the impact, and discuss the way forward. If you want to give positive feedback, give it separately, genuinely, and with the same specificity as critical feedback.',
  },
  {
    question: 'What is the difference between banter and bullying on a construction site?',
    answer:
      'The line between banter and bullying is often blurred on construction sites, where robust humour is part of the culture. The key distinction is consent and impact. Banter is mutual — both parties participate willingly and can give as good as they get. If the target of the humour is uncomfortable, asks for it to stop, or cannot respond in kind (because of a power imbalance, such as an apprentice with a supervisor), it is no longer banter. Bullying is defined by ACAS as "offensive, intimidating, malicious or insulting behaviour, an abuse of power through means that undermine, humiliate, denigrate or injure the recipient." It includes persistent criticism, exclusion, humiliation, shouting, unreasonable workload, and spreading rumours. The intention of the person doing it is irrelevant — what matters is the impact on the recipient. If someone says "it was just banter" but the recipient felt humiliated or distressed, the behaviour may still constitute bullying.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What does the SBI model stand for?',
    options: [
      'Safety, Behaviour, Investigation',
      'Situation, Behaviour, Impact',
      'Standard, Benchmark, Improvement',
      'Specific, Brief, Immediate',
    ],
    correctAnswer: 1,
    explanation:
      'SBI stands for Situation, Behaviour, Impact. Developed by the Center for Creative Leadership, it is a structured feedback model that focuses on observable facts rather than character judgements. You describe the specific Situation (when and where), the specific Behaviour you observed (what the person did or said), and the Impact of that behaviour (on you, the team, the project or the client). This structure keeps feedback objective, specific and actionable — making it far more likely to result in positive change.',
  },
  {
    id: 2,
    question:
      'You need to give an apprentice feedback about poor workmanship. When should you give this feedback?',
    options: [
      'At the end of the week during a formal review',
      'Within 24 hours of observing the issue, in a private setting',
      'In front of the whole team so everyone learns from the mistake',
      'Only if the same mistake happens three times or more',
    ],
    correctAnswer: 1,
    explanation:
      'Feedback should be given as close to the event as possible — ideally within 24 hours. The longer the gap between the behaviour and the feedback, the less effective it becomes, because details fade and the emotional connection to the event diminishes. Equally important is privacy — never give critical feedback in front of others. Public criticism humiliates the recipient, creates resentment, and makes future feedback conversations more difficult. Pull the apprentice aside for a quiet, private word. Waiting for a formal review means the apprentice continues the poor practice for days or weeks, and waiting for three occurrences allows a bad habit to become established.',
  },
  {
    id: 3,
    question: 'What is the primary purpose of the JIB grievance procedure?',
    options: [
      'To punish employees who perform poorly',
      'To provide a fair, structured process for resolving workplace complaints and disputes',
      'To enable employers to dismiss staff more easily',
      'To replace direct conversation between colleagues',
    ],
    correctAnswer: 1,
    explanation:
      'The JIB (Joint Industry Board for the Electrical Contracting Industry) grievance procedure provides a fair, structured framework for resolving workplace complaints and disputes. It ensures that both the person raising the grievance and the person it is raised against are treated fairly, with clear steps, timescales and rights of representation. The procedure typically involves: informal discussion, formal written grievance, investigation, grievance hearing, and right of appeal. Its purpose is resolution, not punishment — although disciplinary action may result from the findings. The JIB procedure exists alongside (and is broadly consistent with) the ACAS Code of Practice on Disciplinary and Grievance Procedures.',
  },
  {
    id: 4,
    question:
      'An apprentice becomes defensive when you give them feedback about their cable terminations. What is the best response?',
    options: [
      'Raise your voice to assert authority',
      'End the conversation and report them to HR',
      'Acknowledge their frustration, restate the specific issue calmly, and ask what support they need to improve',
      'Accept their defence and drop the subject',
    ],
    correctAnswer: 2,
    explanation:
      'When someone becomes defensive in response to feedback, the worst thing you can do is escalate (by raising your voice or asserting authority) or withdraw (by dropping the subject). Instead, acknowledge the emotional response calmly: "I can see this is frustrating to hear." Then restate the specific, factual issue without changing your message: "The terminations in the last two distribution boards had exposed copper at the terminals, which is a safety issue." Finally, move to a collaborative approach: "What support do you need to get this right? Do you want me to show you the technique I use?" This approach validates the person\'s feelings while maintaining the importance of the feedback.',
  },
  {
    id: 5,
    question:
      'Under the Health and Safety at Work Act 1974, what duty does an employer have regarding bullying and harassment?',
    options: [
      'No specific duty — bullying is a personal matter between individuals',
      'A duty to ensure, so far as is reasonably practicable, the health, safety and welfare of all employees — which includes psychological wellbeing',
      'A duty only to address physical bullying, not verbal harassment',
      'A duty only if the bullying results in a formal complaint',
    ],
    correctAnswer: 1,
    explanation:
      'Section 2 of the Health and Safety at Work Act 1974 places a general duty on employers to ensure, so far as is reasonably practicable, the health, safety and welfare at work of all their employees. "Health" includes mental health, and "welfare" includes protection from bullying, harassment and other forms of psychological harm. This means employers have a legal duty to prevent bullying and harassment, not just to respond to complaints after the event. An employer who knows about bullying and fails to act may be in breach of their statutory duty, which can result in enforcement action by the HSE and civil liability for personal injury claims.',
  },
  {
    id: 6,
    question: 'Why is the feedback sandwich (positive-negative-positive) no longer recommended?',
    options: [
      'Because it takes too long to deliver',
      'Because people learn to distrust positive feedback, the critical message gets diluted, and it feels manipulative',
      'Because it only works with apprentices, not experienced workers',
      'Because it was never recommended — it has always been considered poor practice',
    ],
    correctAnswer: 1,
    explanation:
      'The feedback sandwich has been discredited by decades of workplace psychology research for three main reasons. First, people quickly learn to recognise the pattern and start distrusting any positive feedback ("what\'s coming next?"). Second, the critical message — the important part — gets lost between the positive bookends, because the recipient focuses on the compliments rather than the critique. Third, it feels manipulative and insincere, especially to experienced workers who recognise the technique. The SBI model is more effective because it is direct, specific, and honest — qualities that build trust rather than eroding it.',
  },
  {
    id: 7,
    question:
      'What is the most important quality a supervisor needs when managing conflict within their team?',
    options: [
      'Technical electrical expertise',
      'Physical presence and authority',
      'The ability to listen without immediately judging and to remain impartial until both sides have been heard',
      'Extensive knowledge of employment law',
    ],
    correctAnswer: 2,
    explanation:
      "When managing conflict within a team, the most important quality is the ability to listen impartially. A supervisor who immediately takes sides, makes judgements before hearing both perspectives, or dismisses one party's account will lose the trust of the team. The correct approach is to listen to both parties separately, ask clarifying questions, establish the facts, and then work towards a resolution that addresses the underlying issue. This does not mean being passive or indecisive — it means being fair. Technical expertise and employment law knowledge are useful, but without the ability to listen and remain impartial, they are insufficient for effective conflict management.",
  },
  {
    id: 8,
    question:
      'An apprentice approaches you about a colleague who is constantly making derogatory comments about their race. According to ACAS guidance, what should you do?',
    options: [
      'Tell the apprentice that this is normal site banter and not to worry about it',
      "Take the complaint seriously, record the details, follow your company's equality and harassment policy, and report it to your line manager or HR",
      'Speak to the colleague informally and ask them to stop',
      'Advise the apprentice to confront the colleague directly',
    ],
    correctAnswer: 1,
    explanation:
      'Derogatory comments about race constitute racial harassment under the Equality Act 2010, and this is a matter that must be taken seriously regardless of any claimed intention of "banter." According to ACAS guidance, you should: take the complaint seriously and believe the person raising it; record the details (what was said, when, where, who witnessed it); follow your company\'s equality, diversity and harassment policy; and report it to your line manager, HR department, or the person designated in your company\'s policy. You should not attempt to resolve this informally — racial harassment is a serious matter that requires formal investigation. The employer has a legal duty under the Equality Act 2010 to prevent harassment and to take all reasonable steps to address it when it occurs.',
  },
];

export default function CRModule4Section4() {
  useSEO({
    title: 'Team Conflicts & Apprentice Management | Conflict Resolution Module 4.4',
    description:
      'The SBI feedback model, giving and receiving difficult feedback, JIB grievance procedures, bullying and harassment, and leadership conflict management for electricians.',
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
            <Link to="../cr-module-4">
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
            <Users className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 4 &middot; SECTION 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Team Conflicts &amp; Apprentice Management
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            The SBI feedback model, giving and receiving difficult feedback, JIB grievance
            procedures, and addressing bullying and harassment
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>SBI model:</strong> Situation &rarr; Behaviour &rarr; Impact &mdash; the
                most effective feedback structure
              </li>
              <li>
                <strong>Timeliness:</strong> Give feedback within 24 hours, always in private
              </li>
              <li>
                <strong>Receiving:</strong> Listen, ask questions, look for the kernel of truth
              </li>
              <li>
                <strong>Bullying:</strong> Take it seriously, document it, follow formal procedures
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Leadership:</strong> Conflict management is the defining skill of effective
                supervisors
              </li>
              <li>
                <strong>Retention:</strong> Apprentices who receive good feedback stay in the
                industry; those who do not, leave
              </li>
              <li>
                <strong>Legal duty:</strong> Employers must protect psychological wellbeing under
                HSWA 1974
              </li>
              <li>
                <strong>Team performance:</strong> Unresolved internal conflicts destroy
                productivity and morale
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Apply the SBI (Situation, Behaviour, Impact) feedback model to give specific, actionable feedback in workplace scenarios',
              'Deliver difficult feedback within 24 hours, in private, using factual language rather than character judgements',
              'Manage your own defensive reactions when receiving feedback and extract actionable improvement points',
              'Explain the JIB grievance procedure and its key stages, timescales and principles',
              'Recognise the difference between workplace banter and bullying, and respond appropriately to allegations',
              'Identify your legal responsibilities regarding bullying and harassment under HSWA 1974 and the Equality Act 2010',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Leadership and Conflict */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">01</span>
            Leadership &amp; Conflict
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                As your career progresses from improver to qualified electrician, from sole trader
                to supervisor, and from supervisor to contracts manager, the nature of the conflicts
                you face changes fundamentally. As an individual electrician, most of your disputes
                are with other trades or with main contractors &mdash; external conflicts where the
                other party is part of a different organisation. As a leader, you increasingly face
                internal conflicts: disagreements within your own team, performance issues with team
                members, apprentice management challenges, and interpersonal tensions that affect
                productivity and morale.
              </p>

              <p>
                Internal conflicts are, in many ways, harder to manage than external ones. You
                cannot simply escalate to a site manager and walk away. You have an ongoing
                relationship with the people involved, a duty of care towards them (particularly
                apprentices), and a responsibility to maintain a productive, safe working
                environment. The skills you need for internal conflict management are different from
                those required for commercial disputes &mdash; they are fundamentally people skills:
                the ability to give honest feedback without damaging the relationship, to receive
                criticism without becoming defensive, and to mediate between colleagues who are in
                conflict with each other.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Common Internal Conflict Scenarios
                  </p>
                </div>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      An apprentice consistently produces work below the required standard despite
                      repeated verbal guidance
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      Two team members have a personality clash that is affecting the whole
                      team&rsquo;s morale and productivity
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      A team member is consistently late, takes extended breaks, or leaves early,
                      putting additional pressure on the rest of the team
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      An apprentice reports that they are being bullied or harassed by another team
                      member
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      A qualified electrician resists feedback from a younger or less experienced
                      supervisor
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                Each of these scenarios requires a different approach, but they all share a common
                foundation: the ability to communicate clearly, listen actively, and remain
                professional under pressure. The tools in the remainder of this section &mdash; the
                SBI feedback model, timeliness and privacy principles, receiving-feedback skills,
                and knowledge of formal procedures &mdash; equip you with a framework for handling
                any internal conflict you are likely to encounter.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: The SBI Feedback Model */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">02</span>
            The SBI Feedback Model
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The SBI model was developed by the Center for Creative Leadership and is one of the
                most widely used feedback frameworks in professional development. SBI stands for
                Situation, Behaviour, Impact &mdash; and the model works because it forces the
                person giving feedback to focus on observable facts rather than interpretations,
                character judgements or assumptions about intent.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The SBI Model</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm font-medium text-rose-400 mb-1">S &mdash; Situation</p>
                    <p className="text-xs text-white">
                      Describe the specific situation where the behaviour occurred. Include when and
                      where. This grounds the feedback in a concrete, shared reality that the
                      recipient can recall.
                    </p>
                    <p className="text-xs text-white mt-2 italic">
                      &ldquo;Yesterday afternoon in the plant room on the second
                      floor&hellip;&rdquo;
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm font-medium text-rose-400 mb-1">B &mdash; Behaviour</p>
                    <p className="text-xs text-white">
                      Describe the specific, observable behaviour you witnessed. Use factual
                      language &mdash; what the person did or said, not what you think they intended
                      or what kind of person they are. This is the hardest part because our instinct
                      is to interpret rather than observe.
                    </p>
                    <p className="text-xs text-white mt-2 italic">
                      &ldquo;&hellip;I noticed the cable terminations in the distribution board had
                      exposed copper at three of the terminals&hellip;&rdquo;
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm font-medium text-rose-400 mb-1">I &mdash; Impact</p>
                    <p className="text-xs text-white">
                      Explain the impact of the behaviour &mdash; on you, on the team, on the
                      project, on safety, or on the client. This is what makes the feedback
                      meaningful, because it shows the recipient why it matters, not just what
                      happened.
                    </p>
                    <p className="text-xs text-white mt-2 italic">
                      &ldquo;&hellip;the impact is that exposed copper at terminal connections is a
                      safety risk and would fail an inspection, which means I would have to come
                      back and reterminate before sign-off.&rdquo;
                    </p>
                  </div>
                </div>
                <p className="text-xs text-white mt-3">
                  <strong className="text-rose-400">Then add the expectation:</strong> &ldquo;Going
                  forward, I need all terminations stripped to the correct length with no exposed
                  copper. Would you like me to show you the technique?&rdquo;
                </p>
              </div>

              <p>
                The power of SBI is in what it excludes. Notice that the model contains no character
                judgements (&ldquo;you&rsquo;re sloppy&rdquo;), no comparisons (&ldquo;Dave never
                does this&rdquo;), no generalisations (&ldquo;you always&rdquo; / &ldquo;you
                never&rdquo;), and no assumptions about intent (&ldquo;you obviously don&rsquo;t
                care about quality&rdquo;). All of these trigger defensiveness. SBI stays on the
                ground of observable fact, which is almost impossible to argue with &mdash; either
                the copper was exposed or it was not.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Why the Feedback Sandwich is Dead:</strong> The
                  feedback sandwich (positive &rarr; negative &rarr; positive) was popular in the
                  1990s but has been widely discredited. Research shows that it dilutes the critical
                  message, trains people to distrust genuine positive feedback, and feels
                  manipulative to the recipient. If you need to give critical feedback, give it
                  clearly and directly using SBI. If you want to give positive feedback, give it
                  separately and with equal specificity: &ldquo;The cable management in flat 22 was
                  excellent &mdash; clean, consistent and easy to trace. That&rsquo;s exactly the
                  standard I need.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Giving Difficult Feedback */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">03</span>
            Giving Difficult Feedback
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The SBI model gives you the structure for feedback, but delivery is equally
                important. The best-structured feedback in the world will fail if it is delivered at
                the wrong time, in the wrong place, or with the wrong tone. Four principles govern
                effective feedback delivery, and violating any one of them can undermine the entire
                conversation.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    The Four Principles of Feedback Delivery
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm font-medium text-white mb-1">
                      1. Timeliness &mdash; Within 24 Hours
                    </p>
                    <p className="text-xs text-white">
                      Feedback loses impact with every hour that passes. If you notice poor
                      workmanship at 10:00 on Tuesday, give the feedback by 10:00 on Wednesday at
                      the latest. The closer to the event, the more vivid the shared memory and the
                      more likely the feedback will stick. Saving feedback for a weekly review or a
                      formal meeting weeks later strips it of context and urgency.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm font-medium text-white mb-1">
                      2. Privacy &mdash; Never in Front of Others
                    </p>
                    <p className="text-xs text-white">
                      Critical feedback must always be given in private. Take the person aside, away
                      from colleagues, other trades and clients. Public criticism humiliates the
                      recipient, triggers maximum defensiveness, and damages your relationship with
                      them and the team&rsquo;s trust in you as a leader. Even if the mistake
                      happened in front of others, the feedback conversation happens one-on-one.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm font-medium text-white mb-1">
                      3. Specificity &mdash; Observable, Measurable, Factual
                    </p>
                    <p className="text-xs text-white">
                      &ldquo;Your work is sloppy&rdquo; is a character judgement that invites
                      argument. &ldquo;Three of the connections in that DB had exposed copper at the
                      terminals&rdquo; is a specific, observable fact that invites a solution.
                      Always describe what you saw, heard or measured &mdash; never what you infer
                      about the person&rsquo;s attitude, effort or character.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm font-medium text-white mb-1">
                      4. Balance &mdash; Critical and Positive (Separately)
                    </p>
                    <p className="text-xs text-white">
                      People need to know what they are doing well as much as what they need to
                      improve. Give positive feedback with the same frequency and specificity as
                      critical feedback &mdash; but give them separately. A supervisor who only
                      speaks up when something is wrong creates an environment where feedback is
                      feared rather than welcomed.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                When giving difficult feedback to apprentices, remember that they are in a formative
                stage of their career. How you deliver feedback will shape their attitude towards
                learning, their willingness to take risks, and their decision to stay in the
                industry. An apprentice who receives harsh, humiliating criticism may develop a fear
                of making mistakes that prevents them from learning. An apprentice who receives
                specific, supportive feedback develops confidence, skill and loyalty. The difference
                is not in what you say &mdash; it is in how you say it.
              </p>

              <p>
                That said, supportive does not mean soft. If an apprentice is consistently producing
                dangerous work, you must be direct about the consequences. &ldquo;These terminations
                would fail an inspection and could cause a fire. This is a safety issue, and I need
                to see immediate improvement.&rdquo; You can be both firm and respectful. Firmness
                is about the standard; respect is about the person.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Receiving Feedback */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">04</span>
            Receiving Feedback
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Giving feedback is hard. Receiving it is harder. When someone criticises your work
                &mdash; even constructively &mdash; your brain&rsquo;s threat response activates.
                The amygdala fires, cortisol floods your system, and you feel the urge to fight
                (argue back), flee (change the subject or walk away), or freeze (shut down and stop
                listening). This is a neurological reality, not a character flaw. Everyone
                experiences defensiveness when their work is criticised. The difference between
                professionals who grow and those who stagnate is how they manage that defensiveness.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    The Receiving Feedback Framework
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Pause Before Responding</p>
                      <p className="text-xs text-white mt-1">
                        When you hear criticism, take a breath before responding. Even a two-second
                        pause is enough to prevent the defensive reflex from controlling your
                        response. Your first instinct will be to explain, justify or counter-attack.
                        Resist it.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Thank Them</p>
                      <p className="text-xs text-white mt-1">
                        Say &ldquo;thanks for telling me&rdquo; or &ldquo;I appreciate you raising
                        that.&rdquo; This feels counterintuitive when you disagree with the
                        feedback, but it acknowledges the courage it took for the other person to
                        raise the issue and keeps the conversation open rather than adversarial.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Ask Clarifying Questions</p>
                      <p className="text-xs text-white mt-1">
                        &ldquo;Can you give me a specific example?&rdquo; or &ldquo;Which part of
                        the installation are you referring to?&rdquo; This moves the conversation
                        from vague criticism to specific, actionable information. It also buys you
                        thinking time and demonstrates that you are taking the feedback seriously.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Look for the Kernel of Truth</p>
                      <p className="text-xs text-white mt-1">
                        Even feedback that feels unfair or poorly delivered usually contains a
                        kernel of truth &mdash; a valid observation buried under poor presentation.
                        Your job is to find that kernel and use it. You do not have to agree with
                        everything. You do not have to accept the delivery. But dismissing the
                        entire message because you dislike how it was presented means you miss the
                        one thing that could make you better.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                The ability to receive feedback well is one of the most powerful professional skills
                you can develop. It accelerates your learning, strengthens your relationships with
                colleagues and supervisors, and demonstrates the kind of professional maturity that
                leads to promotion and greater responsibility. Conversely, a reputation for being
                &ldquo;uncoachable&rdquo; &mdash; someone who becomes defensive or hostile whenever
                their work is questioned &mdash; will limit your career regardless of your technical
                skill.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: JIB Grievance Procedures & Bullying */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">05</span>
            JIB Grievance Procedures &amp; Bullying
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                When internal conflicts cannot be resolved through informal feedback and direct
                conversation, formal procedures exist to ensure fair and structured resolution. The
                JIB (Joint Industry Board for the Electrical Contracting Industry) provides a
                grievance procedure that applies to all JIB-graded operatives and apprentices. Your
                employer may also have their own internal grievance and disciplinary procedures,
                which should be broadly consistent with the ACAS Code of Practice on Disciplinary
                and Grievance Procedures.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    The JIB Grievance Procedure &mdash; Key Stages
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Informal Discussion</p>
                      <p className="text-xs text-white mt-1">
                        The first step is always an informal conversation between the employee and
                        their immediate supervisor or line manager. Many grievances can be resolved
                        at this stage through open discussion and mutual understanding.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Formal Written Grievance</p>
                      <p className="text-xs text-white mt-1">
                        If the informal discussion does not resolve the issue, the employee submits
                        a written grievance to their employer, setting out the nature of the
                        complaint and the resolution they are seeking.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Investigation</p>
                      <p className="text-xs text-white mt-1">
                        The employer investigates the grievance, which may include interviewing
                        witnesses, reviewing records and gathering evidence. The investigation
                        should be impartial and thorough.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Grievance Hearing</p>
                      <p className="text-xs text-white mt-1">
                        The employer holds a formal hearing where the employee can present their
                        case. The employee has the right to be accompanied by a trade union
                        representative or a fellow worker.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      5
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Right of Appeal</p>
                      <p className="text-xs text-white mt-1">
                        If the employee is dissatisfied with the outcome, they have the right to
                        appeal to a more senior manager or to the JIB itself, depending on the
                        nature of the grievance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                Bullying and harassment require particular attention because of their severity and
                their legal implications. Bullying is defined by ACAS as &ldquo;offensive,
                intimidating, malicious or insulting behaviour, an abuse of power through means that
                undermine, humiliate, denigrate or injure the recipient.&rdquo; Harassment is
                unwanted conduct related to a protected characteristic (age, disability, gender
                reassignment, race, religion or belief, sex, or sexual orientation) that has the
                purpose or effect of violating someone&rsquo;s dignity or creating an intimidating,
                hostile, degrading, humiliating or offensive environment.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Recognising and Addressing Bullying
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm font-medium text-white mb-1">Recognise the Signs</p>
                    <p className="text-xs text-white">
                      Persistent criticism that is not constructive, deliberate exclusion from team
                      activities, public humiliation, unreasonable workloads designed to set someone
                      up to fail, shouting and aggressive behaviour, spreading rumours, and
                      undermining someone&rsquo;s authority in front of others. A single incident
                      may be unacceptable but may not constitute bullying &mdash; it is the
                      persistent, repeated nature that defines bullying.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm font-medium text-white mb-1">Take It Seriously</p>
                    <p className="text-xs text-white">
                      Never dismiss a bullying complaint as &ldquo;banter,&rdquo; &ldquo;just a
                      joke,&rdquo; or &ldquo;part of construction culture.&rdquo; The impact on the
                      recipient is what matters, not the intention of the person doing it. An
                      apprentice who tells you they are being bullied has taken a significant risk
                      to speak up &mdash; dismissing them will ensure they never raise a concern
                      again.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm font-medium text-white mb-1">Follow Formal Procedures</p>
                    <p className="text-xs text-white">
                      Bullying and harassment complaints should be handled through the formal
                      grievance procedure, not through informal conversation alone. The employer has
                      a duty under the Health and Safety at Work Act 1974 to protect the
                      psychological wellbeing of all employees, and under the Equality Act 2010 to
                      prevent harassment related to protected characteristics. Failure to act can
                      result in legal liability for the employer.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                As a supervisor or team leader, you play a critical role as a mediator in team
                conflicts. When two team members are in dispute, your role is not to take sides but
                to facilitate a resolution. Listen to both parties separately, identify the
                underlying issue (which is often different from the presenting complaint), and work
                towards an agreed way forward. If you cannot resolve the conflict at team level,
                escalate it through the formal procedure rather than allowing it to fester.
              </p>
            </div>
          </div>
        </section>

        {/* Section 06: Section Summary */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">06</span>
            Section Summary
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Team conflict management is the defining skill of effective leadership in the
                electrical industry. As your career progresses from individual contributor to team
                leader, your ability to give specific feedback, receive criticism constructively,
                manage apprentices with care, and address serious issues like bullying and
                harassment will determine your success as much as your technical expertise.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Key Principles</p>
                </div>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>SBI model:</strong> Situation, Behaviour, Impact &mdash; specific,
                      factual, actionable feedback every time
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Timeliness and privacy:</strong> Within 24 hours, always in private,
                      never in front of others
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Receiving feedback:</strong> Pause, thank, ask questions, look for the
                      kernel of truth
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>JIB grievance:</strong> Informal discussion &rarr; written grievance
                      &rarr; investigation &rarr; hearing &rarr; appeal
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Bullying:</strong> Take every complaint seriously, follow formal
                      procedures, protect vulnerable team members
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Coming Next: Module 5</p>
                <p className="text-sm text-white">
                  You have now covered the four dimensions of workplace conflict: disputes with
                  other trades, main contractor commercial conflicts, your legal rights under the
                  Construction Act, and internal team management. Module 5 brings all of these
                  skills together with advanced conflict resolution strategies, mediation
                  techniques, and building a conflict-resilient career.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-rose-400" />
            Frequently Asked Questions
          </h2>
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
            <Link to="../cr-module-4-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              The Construction Act
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cr-module-5">
              Module 5
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
