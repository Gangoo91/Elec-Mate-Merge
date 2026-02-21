import { ArrowLeft, Shield, CheckCircle, MessageSquare, Ban, Repeat, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'desc-order',
    question:
      'A subcontractor has arrived late for the third time this week, delaying your programme. Using the DESC model, what should you do first?',
    options: [
      'Tell them you are frustrated and demand they explain themselves',
      'Describe the specific behaviour objectively without blame or emotion',
      'Specify the consequences if they are late again',
      'Express how their lateness makes you feel and move straight to consequences',
    ],
    correctIndex: 1,
    explanation:
      'The DESC model always starts with Describe: state the observable facts without blame, emotion, or judgement. For example, "You arrived at 9:45 this morning. This is the third time this week you have arrived after the agreed 8:00 start." This neutral opening prevents defensiveness and sets a factual foundation for the rest of the conversation.',
  },
  {
    id: 'broken-record',
    question:
      'A client keeps pressuring you to add extra sockets without adjusting the price. You have already explained that it is outside the agreed scope. They continue to push. Which assertive technique should you use?',
    options: [
      'Fogging &mdash; agree with their general point but maintain your position',
      'Broken record &mdash; calmly repeat your position using the same or similar words each time',
      'Aggressive escalation &mdash; raise your voice to show you are serious',
      'Passive acceptance &mdash; agree to the extra work to maintain the relationship',
    ],
    correctIndex: 1,
    explanation:
      'The broken record technique involves calmly and persistently repeating your position without being drawn into arguments or justifications. For example: "I understand you would like the extra sockets. That work is outside the agreed scope, and I am happy to quote for it separately." Repeat this core message each time they push, without escalating or backing down.',
  },
  {
    id: 'assertive-rights',
    question: 'Which of the following is an assertive right in a professional context?',
    options: [
      'The right to always get your own way in negotiations',
      'The right to say no without feeling guilty',
      "The right to ignore other people's feelings when communicating",
      'The right to avoid all conflict by staying silent',
    ],
    correctIndex: 1,
    explanation:
      'One of the core assertive rights defined by Bower &amp; Bower is the right to say no without feeling guilty. Assertiveness is not about winning or dominating &mdash; it is about expressing your needs, opinions, and boundaries clearly and respectfully while also respecting the rights of others. You have the right to decline requests, set boundaries, and prioritise your own workload without guilt.',
  },
];

const faqs = [
  {
    question: 'What is the difference between assertive and aggressive communication?',
    answer:
      "Assertive communication respects both your own rights and the rights of others. You state your needs, opinions, and boundaries clearly, calmly, and directly, while acknowledging the other person's perspective. Aggressive communication prioritises your own needs at the expense of others \u2014 it often involves blame, raised voices, interrupting, personal attacks, or intimidation. In construction, assertive communication builds professional respect and long-term working relationships. Aggressive communication damages trust, creates conflict, and can lead to formal complaints or site bans.",
  },
  {
    question: 'When should I use the DESC model versus having an informal chat?',
    answer:
      'Use DESC when the situation is significant, recurring, or has real consequences \u2014 for example, persistent lateness, scope creep, safety violations, or payment disputes. DESC provides structure and keeps the conversation professional and solution-focused. For minor, one-off issues (a colleague forgetting to tidy up once, a small misunderstanding), an informal chat is usually more appropriate and proportionate. The key test is: if this issue were to continue, would it affect the project, the team, or your business? If yes, use DESC.',
  },
  {
    question: 'How do I handle a client who becomes aggressive when I try to be assertive?',
    answer:
      'Stay calm and do not match their energy. Use a level tone, maintain open body language, and do not raise your voice. Acknowledge their frustration ("I can see this is frustrating for you") without conceding your position. If the conversation becomes hostile, it is entirely appropriate to pause: "I want to resolve this, but I think we would both benefit from a short break. Let us pick this up in 30 minutes." If you feel physically threatened, remove yourself from the situation immediately. You have the right to end any conversation that becomes abusive or threatening.',
  },
  {
    question: 'Is it unprofessional to say no to a client or main contractor?',
    answer:
      'No. Saying no professionally is a sign of competence, not a weakness. Clients and main contractors respect electricians who are honest about what is achievable, safe, and within scope. Saying yes to everything and then failing to deliver \u2014 or delivering unsafe work \u2014 is far more unprofessional. The key is how you say no: explain the reason clearly, offer alternatives where possible, and keep the tone constructive. For example: "I cannot add those circuits to the existing board safely \u2014 the board does not have capacity. I can quote for a sub-board, which would be the compliant solution."',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What does DESC stand for in the Bower &amp; Bower model?',
    options: [
      'Discuss, Evaluate, Summarise, Conclude',
      'Describe, Express, Specify, Consequences',
      'Define, Explain, Solve, Communicate',
      'Determine, Establish, State, Confirm',
    ],
    correctAnswer: 1,
    explanation:
      'DESC stands for Describe (state the facts objectively), Express (share how you feel or the impact), Specify (state what you want to happen), and Consequences (outline the positive outcome of change or the negative outcome if nothing changes). The model was developed by Sharon Anthony Bower and Gordon H. Bower in their book "Asserting Yourself" (1976).',
  },
  {
    id: 2,
    question: 'In the "Describe" step of DESC, which of the following is the best example?',
    options: [
      '"You are always late and it is really annoying"',
      '"You arrived at 9:30 today. The agreed start time on the programme is 8:00"',
      '"Everyone has noticed you are never on time"',
      '"I feel like you do not respect my time"',
    ],
    correctAnswer: 1,
    explanation:
      'The Describe step requires objective, factual language without blame, exaggeration, or emotional statements. "You arrived at 9:30 today. The agreed start time is 8:00" states observable facts that cannot be disputed. Words like "always", "never", and "everyone" are generalisations that invite defensiveness. Feelings and impact belong in the Express step, not the Describe step.',
  },
  {
    id: 3,
    question: 'What is the "broken record" technique?',
    options: [
      'Recording conversations as evidence in case of disputes',
      'Repeating the same story to multiple people to build support for your position',
      'Calmly and persistently repeating your position without being drawn into arguments',
      'Playing back what the other person has said to show you are listening',
    ],
    correctAnswer: 2,
    explanation:
      'The broken record technique involves calmly repeating your key message or boundary each time the other person pushes, without becoming angry, defensive, or drawn into side arguments. It is effective against persistent pressure because it shows you are firm but not aggressive. The technique works because it gives no new material for the other person to argue against.',
  },
  {
    id: 4,
    question: 'What is "fogging" in assertive communication?',
    options: [
      'Being deliberately vague to avoid committing to a clear answer',
      'Agreeing with any truth in what the other person says while calmly maintaining your position',
      'Creating confusion by changing the subject repeatedly',
      'Using technical jargon so the other person cannot follow the conversation',
    ],
    correctAnswer: 1,
    explanation:
      'Fogging involves calmly acknowledging any truth or valid point in what the other person says, without becoming defensive or giving in. For example, if a client says "Your quote is much higher than the other firm," you might respond: "You may be right that another firm has quoted less. My price reflects the full scope of work to the required standard, and I am confident it represents good value." Fogging defuses aggression by removing the confrontation the other person expects.',
  },
  {
    id: 5,
    question:
      'A client asks you to run cables in a way that would not comply with BS 7671. What is the most assertive response?',
    options: [
      '"I suppose I could do it that way if you really want"',
      '"That is a stupid idea \u2014 you clearly do not know anything about wiring regulations"',
      '"I understand what you are asking for, but that route would not comply with the wiring regulations. I can offer a compliant alternative that achieves what you need"',
      'Say nothing and install it your way without explaining',
    ],
    correctAnswer: 2,
    explanation:
      "The assertive response acknowledges the client's request, clearly states the factual reason it cannot be done (non-compliance with BS 7671), and offers a constructive alternative. This approach respects both your professional responsibility and the client's needs. The passive response (doing what they want) risks unsafe installation. The aggressive response damages the relationship. Saying nothing is passive and unhelpful.",
  },
  {
    id: 6,
    question: 'Which of the following is NOT an assertive right?',
    options: [
      'The right to say no without feeling guilty',
      'The right to change your mind',
      'The right to make mistakes',
      'The right to be rude or dismissive to save time',
    ],
    correctAnswer: 3,
    explanation:
      'Assertive rights include the right to say no, the right to change your mind, the right to make mistakes, the right to express your feelings, and the right to ask for what you want. However, assertiveness always respects the rights of others. Being rude or dismissive is aggressive, not assertive. Assertiveness is about mutual respect \u2014 your rights do not override the rights of the people you are communicating with.',
  },
  {
    id: 7,
    question: 'In the DESC model, what belongs in the "Consequences" step?',
    options: [
      'A threat of legal action to show you are serious',
      'The positive outcome of cooperation and/or the realistic negative outcome if the issue continues',
      'An emotional appeal to make the other person feel guilty',
      'A reminder of how long you have been in the trade',
    ],
    correctAnswer: 1,
    explanation:
      'The Consequences step outlines what will happen next \u2014 ideally focusing on the positive outcome of cooperation first ("If we can agree a realistic schedule, we can both finish on time and I will be happy to recommend you for future projects"). It may also include realistic negative consequences if the issue persists ("If the delays continue, I will need to discuss alternative arrangements with the main contractor"). Consequences should be factual and proportionate, never threats or emotional manipulation.',
  },
  {
    id: 8,
    question:
      'A main contractor pressures you to cut corners on testing to save time. You have already refused once and they are pushing again. What combination of techniques is most appropriate?',
    options: [
      'Fogging followed by passive compliance',
      'Broken record combined with DESC to restate your position with structure',
      'Aggressive refusal with a raised voice to end the conversation',
      'Avoiding the conversation entirely and hoping they forget',
    ],
    correctAnswer: 1,
    explanation:
      'Combining the broken record technique (calmly restating your position) with DESC structure gives you the strongest professional response. For example: "I understand the programme is tight [fogging/acknowledgement]. The testing is a legal requirement under BS 7671, and I cannot sign off certificates for work that has not been properly tested [Describe + Express]. I need the time agreed in the programme to complete testing fully [Specify]. If we work to the agreed schedule, I can have the certificates ready on Friday [Consequences]." This is firm, professional, and solution-focused.',
  },
];

export default function CCModule5Section2() {
  useSEO({
    title: 'Assertive Communication & The DESC Model | Communication & Confidence Module 5.2',
    description:
      'Bower & Bower DESC model, assertive rights, saying no professionally, broken record technique, fogging, and construction communication examples.',
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
            <Link to="../cc-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 5
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-400/20 border border-rose-500/30 mb-4">
            <Shield className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 5 &middot; SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Assertive Communication &amp; The DESC Model
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Bower &amp; Bower DESC framework, assertive rights, saying no professionally, broken
            record technique, fogging, and practical construction examples
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>DESC:</strong> Describe &rarr; Express &rarr; Specify &rarr; Consequences
              </li>
              <li>
                <strong>Assertive &#8800; aggressive:</strong> Respect your rights AND theirs
              </li>
              <li>
                <strong>Key techniques:</strong> Broken record, fogging, professional
                &ldquo;no&rdquo;
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Late subcontractor:</strong> Use DESC to address the pattern professionally
              </li>
              <li>
                <strong>Scope creep:</strong> Broken record to hold the boundary on extras
              </li>
              <li>
                <strong>Payment disputes:</strong> DESC + consequences to escalate proportionately
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Explain the four steps of the Bower & Bower DESC model and apply each step correctly',
              'Distinguish between passive, assertive, and aggressive communication styles',
              'List at least four assertive rights and explain their relevance in construction',
              'Use the broken record technique to maintain a boundary under pressure',
              'Apply fogging to defuse confrontational or manipulative communication',
              'Say no professionally without damaging client or contractor relationships',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: What Is Assertive Communication? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">01</span>
            What Is Assertive Communication?
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Assertive communication is the ability to express your needs, opinions, and
                boundaries clearly, calmly, and directly &mdash; while also respecting the rights
                and feelings of others. It sits between two unhelpful extremes:
                <strong> passive</strong> communication (not speaking up, avoiding conflict, letting
                others take advantage) and <strong>aggressive</strong> communication (dominating,
                blaming, intimidating, ignoring others&rsquo; needs).
              </p>

              <p>
                In construction, assertive communication is essential. You need it to manage clients
                who push for extras without paying, subcontractors who miss deadlines, main
                contractors who pressure you to cut corners, and colleagues who do not pull their
                weight. Without assertiveness, you either get walked over (passive) or create
                conflict that damages relationships and your reputation (aggressive).
              </p>

              {/* Three Styles Comparison */}
              <div className="grid sm:grid-cols-3 gap-3">
                <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-blue-400 mb-2">Passive</p>
                  <ul className="text-sm text-white space-y-1.5">
                    <li>&bull; Avoids conflict at all costs</li>
                    <li>&bull; Agrees to things they do not want</li>
                    <li>&bull; Does not express needs or opinions</li>
                    <li>&bull; Feels resentful but stays silent</li>
                    <li>&bull; Often leads to being taken advantage of</li>
                  </ul>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-green-400 mb-2">Assertive</p>
                  <ul className="text-sm text-white space-y-1.5">
                    <li>&bull; Expresses needs clearly and calmly</li>
                    <li>&bull; Respects own rights AND others&rsquo; rights</li>
                    <li>&bull; Uses &ldquo;I&rdquo; statements, not blame</li>
                    <li>&bull; Listens and acknowledges other views</li>
                    <li>&bull; Seeks solutions, not victories</li>
                  </ul>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-red-400 mb-2">Aggressive</p>
                  <ul className="text-sm text-white space-y-1.5">
                    <li>&bull; Dominates, interrupts, raises voice</li>
                    <li>&bull; Uses blame, threats, personal attacks</li>
                    <li>&bull; Ignores others&rsquo; feelings and rights</li>
                    <li>&bull; Wins the argument, loses the relationship</li>
                    <li>&bull; Creates fear, resentment, and conflict</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: The DESC Model */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">02</span>
            The DESC Model &mdash; Bower &amp; Bower
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The DESC model was developed by Sharon Anthony Bower and Gordon H. Bower in their
                influential book <em>Asserting Yourself</em> (1976). It provides a simple,
                repeatable four-step structure for having assertive conversations &mdash;
                particularly when you need to address a problem, set a boundary, or make a request.
                DESC stands for <strong>Describe, Express, Specify, Consequences</strong>.
              </p>

              {/* DESC Framework Box */}
              <div className="bg-gradient-to-br from-rose-500/10 to-rose-400/5 border-2 border-rose-500/30 p-5 sm:p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-5">
                  <Shield className="h-6 w-6 text-rose-400" />
                  <p className="text-lg font-bold text-white">The DESC Framework</p>
                </div>

                <div className="space-y-5">
                  {/* Describe */}
                  <div className="bg-[#1a1a1a]/60 border border-white/10 p-4 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-rose-500/20 text-rose-400 text-sm font-bold flex-shrink-0">
                        D
                      </span>
                      <p className="text-base font-semibold text-rose-400">Describe</p>
                    </div>
                    <p className="text-sm text-white mb-3">
                      State the <strong>specific behaviour or situation</strong> objectively. Use
                      facts, not opinions. Avoid &ldquo;always&rdquo;, &ldquo;never&rdquo;, or
                      emotional language. Describe what you observed &mdash; what a camera would
                      have recorded.
                    </p>
                    <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                      <p className="text-xs font-medium text-rose-400 mb-1">
                        Construction Example:
                      </p>
                      <p className="text-sm text-white italic">
                        &ldquo;You arrived on site at 9:45 this morning. The programme has your
                        start time as 8:00, and this is the third time this week you have arrived
                        after 9:00.&rdquo;
                      </p>
                    </div>
                  </div>

                  {/* Express */}
                  <div className="bg-[#1a1a1a]/60 border border-white/10 p-4 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-rose-500/20 text-rose-400 text-sm font-bold flex-shrink-0">
                        E
                      </span>
                      <p className="text-base font-semibold text-rose-400">Express</p>
                    </div>
                    <p className="text-sm text-white mb-3">
                      Share <strong>how you feel or the impact</strong> of the behaviour. Use
                      &ldquo;I&rdquo; statements (&ldquo;I am concerned&rdquo;, &ldquo;This
                      affects&hellip;&rdquo;) rather than &ldquo;You&rdquo; statements that sound
                      like blame. Keep it measured &mdash; one or two sentences.
                    </p>
                    <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                      <p className="text-xs font-medium text-rose-400 mb-1">
                        Construction Example:
                      </p>
                      <p className="text-sm text-white italic">
                        &ldquo;I am concerned because your late starts are pushing the programme
                        back. The second fix cannot begin until your work is complete, so the delay
                        is affecting my team as well.&rdquo;
                      </p>
                    </div>
                  </div>

                  {/* Specify */}
                  <div className="bg-[#1a1a1a]/60 border border-white/10 p-4 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-rose-500/20 text-rose-400 text-sm font-bold flex-shrink-0">
                        S
                      </span>
                      <p className="text-base font-semibold text-rose-400">Specify</p>
                    </div>
                    <p className="text-sm text-white mb-3">
                      State <strong>exactly what you want to happen</strong>. Be clear, specific,
                      and realistic. This is not a vague request &mdash; it is a concrete,
                      actionable change that the other person can deliver.
                    </p>
                    <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                      <p className="text-xs font-medium text-rose-400 mb-1">
                        Construction Example:
                      </p>
                      <p className="text-sm text-white italic">
                        &ldquo;I need you to be on site by 8:00 every day for the rest of this
                        phase. If there is a genuine reason you cannot make 8:00, let me know today
                        so we can adjust the programme.&rdquo;
                      </p>
                    </div>
                  </div>

                  {/* Consequences */}
                  <div className="bg-[#1a1a1a]/60 border border-white/10 p-4 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-rose-500/20 text-rose-400 text-sm font-bold flex-shrink-0">
                        C
                      </span>
                      <p className="text-base font-semibold text-rose-400">Consequences</p>
                    </div>
                    <p className="text-sm text-white mb-3">
                      Outline the <strong>positive outcome of cooperation</strong> first, then the
                      realistic negative outcome if the issue continues. Consequences must be
                      proportionate, factual, and deliverable &mdash; never empty threats.
                    </p>
                    <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                      <p className="text-xs font-medium text-rose-400 mb-1">
                        Construction Example:
                      </p>
                      <p className="text-sm text-white italic">
                        &ldquo;If we can get back on programme, I am happy to continue working with
                        you and recommending you for future projects. If the late starts continue, I
                        will need to raise it with the main contractor and look at alternative
                        arrangements.&rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Key Principle:</strong> DESC works because it
                  separates facts from feelings, keeps the conversation structured, and focuses on
                  solutions rather than blame. It prevents conversations from spiralling into
                  arguments because each step has a clear purpose. Practise the structure before
                  having difficult conversations &mdash; even writing your DESC script on paper
                  before you speak helps enormously.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 03: DESC Before & After Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">03</span>
            DESC in Practice &mdash; Before &amp; After
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The difference between an unstructured response and a DESC response is dramatic.
                Below are three common construction scenarios showing the typical reactive approach
                versus the DESC approach.
              </p>

              {/* Example 1: Late Subcontractor */}
              <div className="bg-white/5 border border-white/10 p-4 sm:p-5 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Scenario: Late Subcontractor</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-red-500/5 border border-red-500/20 p-3 rounded-lg">
                    <p className="text-xs font-medium text-red-400 mb-2">
                      Without DESC (Aggressive)
                    </p>
                    <p className="text-sm text-white italic">
                      &ldquo;You are taking the mick. You are never on time. Sort it out or you are
                      off this job.&rdquo;
                    </p>
                    <p className="text-xs text-white mt-2">
                      Result: Defensiveness, excuses, damaged relationship, possible walkout.
                    </p>
                  </div>
                  <div className="bg-green-500/5 border border-green-500/20 p-3 rounded-lg">
                    <p className="text-xs font-medium text-green-400 mb-2">With DESC (Assertive)</p>
                    <p className="text-sm text-white italic">
                      &ldquo;You arrived at 9:45 today &mdash; the third late start this week [D].
                      The delays are pushing back second fix and affecting my team [E]. I need you
                      on site by 8:00 for the rest of this phase [S]. If we get back on programme, I
                      will keep recommending you. If not, I will need to discuss alternatives with
                      the main contractor [C].&rdquo;
                    </p>
                    <p className="text-xs text-white mt-2">
                      Result: Clear, professional, factual, solution-focused.
                    </p>
                  </div>
                </div>
              </div>

              {/* Example 2: Client Scope Creep */}
              <div className="bg-white/5 border border-white/10 p-4 sm:p-5 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Scenario: Client Scope Creep</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-red-500/5 border border-red-500/20 p-3 rounded-lg">
                    <p className="text-xs font-medium text-red-400 mb-2">Without DESC (Passive)</p>
                    <p className="text-sm text-white italic">
                      &ldquo;Well&hellip; I suppose I could squeeze in a couple of extra sockets. I
                      will just have to work late again.&rdquo;
                    </p>
                    <p className="text-xs text-white mt-2">
                      Result: Free work, resentment, sets a precedent for more extras.
                    </p>
                  </div>
                  <div className="bg-green-500/5 border border-green-500/20 p-3 rounded-lg">
                    <p className="text-xs font-medium text-green-400 mb-2">With DESC (Assertive)</p>
                    <p className="text-sm text-white italic">
                      &ldquo;You have asked me to add four extra double sockets in the kitchen
                      &mdash; these were not in the original quote [D]. I want to make sure you get
                      exactly what you need, but I also need to keep the project within the agreed
                      scope and budget [E]. I can prepare a variation quote for the extra sockets
                      and have it to you by tomorrow [S]. That way we both know where we stand, and
                      there are no surprises on the final invoice [C].&rdquo;
                    </p>
                    <p className="text-xs text-white mt-2">
                      Result: Professional, fair, protects your business.
                    </p>
                  </div>
                </div>
              </div>

              {/* Example 3: Non-Paying Client */}
              <div className="bg-white/5 border border-white/10 p-4 sm:p-5 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Ban className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Scenario: Non-Paying Client</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-red-500/5 border border-red-500/20 p-3 rounded-lg">
                    <p className="text-xs font-medium text-red-400 mb-2">
                      Without DESC (Aggressive)
                    </p>
                    <p className="text-sm text-white italic">
                      &ldquo;I am not doing another thing until you pay me. You have had the invoice
                      for weeks. This is ridiculous.&rdquo;
                    </p>
                    <p className="text-xs text-white mt-2">
                      Result: Confrontation, possible dispute, may damage chances of payment.
                    </p>
                  </div>
                  <div className="bg-green-500/5 border border-green-500/20 p-3 rounded-lg">
                    <p className="text-xs font-medium text-green-400 mb-2">With DESC (Assertive)</p>
                    <p className="text-sm text-white italic">
                      &ldquo;Invoice 2347 for &pound;3,200 was due on the 1st of this month and is
                      now 14 days overdue [D]. I understand cash flow can be challenging, but the
                      overdue payment is affecting my own cash flow and ability to purchase
                      materials for the next phase [E]. I need payment by this Friday, or a
                      confirmed payment plan agreed in writing by then [S]. Once payment is
                      confirmed, I can schedule the next phase immediately. If I do not receive
                      payment or a plan by Friday, I will need to suspend works until the account is
                      settled [C].&rdquo;
                    </p>
                    <p className="text-xs text-white mt-2">
                      Result: Professional, firm, proportionate escalation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 04: Assertive Rights */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">04</span>
            Assertive Rights
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Bower &amp; Bower identified a set of <strong>assertive rights</strong> &mdash;
                fundamental principles that underpin assertive behaviour. Understanding these rights
                helps you recognise when you are being passive (giving up your rights) or aggressive
                (violating someone else&rsquo;s rights). In construction, many professionals
                struggle with these rights because the industry culture often rewards aggressive
                behaviour and dismisses assertiveness as weakness.
              </p>

              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  {
                    right: 'The right to say no without feeling guilty',
                    example:
                      'Declining a request to work unpaid overtime or take on work outside your competence',
                  },
                  {
                    right: 'The right to express your feelings and opinions',
                    example: 'Raising a safety concern on site even when others dismiss it',
                  },
                  {
                    right: 'The right to change your mind',
                    example:
                      'Revising a quote after discovering the job is more complex than initially assessed',
                  },
                  {
                    right: 'The right to make mistakes',
                    example:
                      'Acknowledging an error honestly rather than covering it up or blaming others',
                  },
                  {
                    right: 'The right to ask for what you want',
                    example:
                      'Requesting payment terms, access arrangements, or programme adjustments',
                  },
                  {
                    right: 'The right to be treated with respect',
                    example:
                      'Expecting professional behaviour from clients, contractors, and colleagues',
                  },
                  {
                    right: 'The right to set priorities and make your own decisions',
                    example:
                      'Deciding the order of work based on your professional judgement, not pressure',
                  },
                  {
                    right: 'The right not to have to justify yourself to others',
                    example:
                      'You do not owe a lengthy explanation for declining work that is not right for you',
                  },
                ].map((item, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm font-medium text-white mb-1">
                      <Shield className="h-3.5 w-3.5 text-rose-400 inline mr-1.5" />
                      {item.right}
                    </p>
                    <p className="text-xs text-white">{item.example}</p>
                  </div>
                ))}
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Remember:</strong> Assertive rights are always
                  mutual. You have these rights, and so does the person you are communicating with.
                  Assertiveness is never about bulldozing others &mdash; it is about standing on
                  equal ground, expressing yourself honestly, and seeking outcomes that respect
                  everyone involved.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: Saying No Professionally */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">05</span>
            Saying No Professionally
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                One of the hardest assertive skills to develop is saying no. Many electricians and
                contractors say yes to everything &mdash; extra work without extra pay, unrealistic
                deadlines, unsafe practices &mdash; because they fear losing the client, damaging
                the relationship, or appearing unhelpful. But saying yes to everything leads to
                burnout, financial loss, and compromised work quality.
              </p>

              <p>
                A professional &ldquo;no&rdquo; is not a refusal to help &mdash; it is an honest,
                constructive response that protects both you and the client. The key is to say no to
                the <strong>request</strong>, not to the <strong>person</strong>.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">
                  Framework for Saying No Professionally
                </p>
                <div className="space-y-3">
                  {[
                    {
                      step: 'Acknowledge the request',
                      example: '"I understand you need the extra circuits installed this week."',
                    },
                    {
                      step: 'State your position clearly',
                      example:
                        '"I am not able to fit that in alongside the existing programme without compromising the quality of the work."',
                    },
                    {
                      step: 'Give a brief reason (optional but helpful)',
                      example:
                        '"The existing schedule is already tight, and rushing electrical work creates safety risks."',
                    },
                    {
                      step: 'Offer an alternative where possible',
                      example:
                        '"I can schedule it for next Tuesday once the current phase is complete, or I can recommend another contractor if you need it sooner."',
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-white">{item.step}</p>
                        <p className="text-sm text-white italic">{item.example}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 06: Broken Record Technique */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">06</span>
            The Broken Record Technique
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The broken record technique is one of the most effective assertive tools for dealing
                with persistent pressure. It involves calmly and patiently repeating your key
                message or boundary using the same or similar words each time the other person
                pushes. You do not escalate, you do not argue, and you do not get drawn into side
                issues &mdash; you simply repeat your position.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 sm:p-5 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Repeat className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Example: Client Pushing for Free Extras
                  </p>
                </div>
                <div className="space-y-3">
                  {[
                    {
                      speaker: 'Client',
                      text: '"Can you just add a couple of sockets in the utility room while you are here? It will only take five minutes."',
                    },
                    {
                      speaker: 'You',
                      text: '"I understand you would like the extra sockets. That work is outside the agreed scope, and I am happy to quote for it separately."',
                    },
                    {
                      speaker: 'Client',
                      text: '"Oh come on, it is only two sockets. You must have a bit of spare cable."',
                    },
                    {
                      speaker: 'You',
                      text: '"I appreciate it seems like a small job. The extra sockets are outside the agreed scope, and I am happy to quote for them separately."',
                    },
                    {
                      speaker: 'Client',
                      text: '"The last electrician would have just done it."',
                    },
                    {
                      speaker: 'You',
                      text: '"I understand. The extra sockets are outside the agreed scope, and I would like to quote for them separately so we both know where we stand."',
                    },
                  ].map((line, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded-lg ${
                        line.speaker === 'You'
                          ? 'bg-green-500/5 border border-green-500/20'
                          : 'bg-white/5 border border-white/10'
                      }`}
                    >
                      <p
                        className={`text-xs font-medium mb-1 ${
                          line.speaker === 'You' ? 'text-green-400' : 'text-white'
                        }`}
                      >
                        {line.speaker}:
                      </p>
                      <p className="text-sm text-white italic">{line.text}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-white mt-3">
                  Notice how the core message stays the same each time: &ldquo;outside the agreed
                  scope&rdquo; + &ldquo;happy to quote separately.&rdquo; There is no new material
                  for the client to argue against.
                </p>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Why It Works:</strong> The broken record
                  technique is effective because it gives the other person nothing new to argue
                  with. They cannot escalate, manipulate, or redirect the conversation because you
                  keep returning to the same calm, clear position. Most people will accept your
                  boundary after two or three repetitions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 07: Fogging */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">07</span>
            Fogging
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Fogging is an assertive technique for handling criticism, manipulation, or
                aggressive comments without becoming defensive or giving in. The name comes from the
                idea of being like fog &mdash; you absorb the impact without being affected by it.
                You calmly <strong>acknowledge any truth or valid point</strong> in what the other
                person says, without agreeing with their conclusion or changing your position.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">Fogging in Practice</p>
                <div className="space-y-3">
                  {[
                    {
                      attack: '"Your quote is much higher than the other firm."',
                      fog: '"You may be right that another firm has quoted less. My price reflects the full scope including testing and certification, and I am confident it represents good value for the standard of work."',
                    },
                    {
                      attack: '"You are taking forever on this job."',
                      fog: '"You are right that it is taking longer than we both expected. The additional work we discovered behind the existing panels was not in the original scope, and I want to make sure it is done properly."',
                    },
                    {
                      attack: '"I have used electricians who work much faster than you."',
                      fog: '"I am sure there are electricians who work faster. I focus on getting the job right first time, which saves time and money in the long run."',
                    },
                  ].map((item, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 p-3 rounded-lg">
                      <p className="text-xs font-medium text-red-400 mb-1">They say:</p>
                      <p className="text-sm text-white italic mb-2">{item.attack}</p>
                      <p className="text-xs font-medium text-green-400 mb-1">
                        You respond (fogging):
                      </p>
                      <p className="text-sm text-white italic">{item.fog}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Why It Works:</strong> Fogging defuses
                  aggression by removing the confrontation the other person expects. When you
                  acknowledge a valid point instead of defending or counter-attacking, there is
                  nothing for them to push against. The conversation moves from conflict to
                  discussion. Fogging is not about agreeing with unfair criticism &mdash; it is
                  about acknowledging any kernel of truth while standing firm on your position.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 08: Combining Techniques */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">08</span>
            Combining Techniques on Site
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                In real construction situations, you will rarely use just one technique in
                isolation. The most effective communicators combine DESC, broken record, fogging,
                and professional &ldquo;no&rdquo; fluidly depending on how the conversation
                develops. Here is how the techniques work together.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 sm:p-5 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">
                  Scenario: Main Contractor Pressures You to Skip Testing
                </p>
                <div className="space-y-3">
                  {[
                    {
                      label: 'Describe',
                      text: '"You have asked me to sign off the distribution board without completing the full schedule of test results."',
                    },
                    {
                      label: 'Express',
                      text: '"I understand the programme is under pressure, but the testing is a legal requirement under BS 7671 and I cannot certify work that has not been properly tested."',
                    },
                    {
                      label: 'Fogging (if they push)',
                      text: '"You are right that we are behind programme. The testing is still a requirement, and I need the time agreed in the schedule to complete it."',
                    },
                    {
                      label: 'Broken record (if they push again)',
                      text: '"I understand the pressure. The testing is a legal requirement and I cannot certify without completing it."',
                    },
                    {
                      label: 'Specify',
                      text: '"I need uninterrupted access to the boards tomorrow morning from 7:00 to complete the testing."',
                    },
                    {
                      label: 'Consequences',
                      text: '"If I can test tomorrow, I can have the certificates ready by Friday afternoon. If I cannot get access, the certification will be delayed further."',
                    },
                  ].map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="flex items-center justify-center min-w-[24px] h-6 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-xs font-medium text-rose-400">{step.label}</p>
                        <p className="text-sm text-white italic">{step.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">When to Use Each Technique</p>
                <div className="space-y-2">
                  {[
                    {
                      technique: 'DESC',
                      when: 'Planned conversations about recurring issues, boundaries, or requests for change',
                    },
                    {
                      technique: 'Broken record',
                      when: 'When someone keeps pushing after you have stated your position',
                    },
                    {
                      technique: 'Fogging',
                      when: 'When someone is critical, manipulative, or trying to make you defensive',
                    },
                    {
                      technique: 'Professional "no"',
                      when: 'Declining requests that are outside scope, unsafe, or beyond your capacity',
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-white">
                        <strong>{item.technique}:</strong> {item.when}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

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
        <Quiz title="Section 2 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cc-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 5
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cc-module-5-section-3">
              Next: Influence &amp; Persuasion
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
