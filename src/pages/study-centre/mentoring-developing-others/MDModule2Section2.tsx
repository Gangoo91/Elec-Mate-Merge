import { ArrowLeft, HelpCircle, CheckCircle, Ear, Search, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'open-vs-closed',
    question: 'Which of the following is an open question?',
    options: [
      'Did you test the circuit?',
      'Was the RCD tripping?',
      'How did you approach the fault-finding on that board?',
      'Have you finished the containment run?',
    ],
    correctIndex: 2,
    explanation:
      'Open questions begin with words like how, what, why, tell me about, or describe. They cannot be answered with a simple yes or no and encourage the learner to think, reflect, and explain. "How did you approach the fault-finding on that board?" invites a detailed response.',
  },
  {
    id: 'socratic-purpose',
    question: 'What is the primary purpose of Socratic questioning in a mentoring context?',
    options: [
      'To test the learner\u2019s knowledge with trick questions',
      'To guide the learner to discover the answer for themselves through a sequence of questions',
      'To demonstrate the mentor\u2019s superior knowledge',
      'To speed up the conversation by asking yes/no questions',
    ],
    correctIndex: 1,
    explanation:
      'Socratic questioning is named after the ancient Greek philosopher Socrates, who taught by asking questions rather than giving lectures. In mentoring, the purpose is to guide the learner towards understanding by asking a carefully structured sequence of questions that build on each other.',
  },
  {
    id: 'empathic-listening',
    question:
      'In Covey\u2019s five levels of listening, which is the highest and most effective level?',
    options: [
      'Selective listening',
      'Attentive listening',
      'Pretend listening',
      'Empathic listening',
    ],
    correctIndex: 3,
    explanation:
      'Empathic listening is the highest level in Covey\u2019s model. It means listening with the genuine intent to understand the other person\u2019s perspective, feelings, and meaning \u2014 not just their words. This level of listening builds deep trust and is the foundation of effective mentoring.',
  },
];

const faqs = [
  {
    question:
      'How do I ask good open questions when I\u2019m used to just telling people what to do?',
    answer:
      'Start simple. Replace "Did you check the earth?" with "How did you verify the earth continuity?" Replace "Is that right?" with "What makes you confident in that result?" You do not need to ask complex questions \u2014 just swap closed questions for open ones. With practice, it becomes natural. A useful rule of thumb: if it can be answered with yes or no, rephrase it.',
  },
  {
    question: 'Is Socratic questioning too slow for a busy construction site?',
    answer:
      'It depends on the situation. For safety-critical tasks, you give direct instruction \u2014 there is no debate. But for development conversations (during breaks, reviews, or quiet moments on site), Socratic questioning is highly effective and does not need to take long. A sequence of three or four well-chosen questions can help an apprentice understand a concept far more deeply than a ten-minute explanation.',
  },
  {
    question: 'What should I do if I struggle to listen properly on a noisy site?',
    answer:
      'Move to a quieter area for important conversations. If that is not possible, face the person directly, make eye contact, and use non-verbal signals (nodding, thumbs up) to show you are engaged. For development discussions, try to find a space away from the noise \u2014 the welfare cabin, the van, or a completed room. Active listening requires concentration, and that is hard when a grinder is running three metres away.',
  },
  {
    question: 'What is the difference between the funnel technique and Socratic questioning?',
    answer:
      'The funnel technique moves from broad, open questions to narrow, specific ones to explore a topic in increasing detail. Socratic questioning uses a sequence of questions to guide the learner to discover an answer or principle for themselves. In practice, they often overlap \u2014 a Socratic sequence may also narrow from broad to specific. The key difference is intent: the funnel is for information gathering, while Socratic questioning is for guided discovery.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Which type of question is "Tell me about the fault-finding process you followed"?',
    options: ['Closed question', 'Leading question', 'Open question', 'Hypothetical question'],
    correctAnswer: 2,
    explanation:
      '"Tell me about..." is an open question because it invites the learner to give a detailed, extended response. It cannot be answered with a simple yes or no.',
  },
  {
    id: 2,
    question: 'What does the "R" in the RASA active listening framework stand for?',
    options: ['Reflect', 'Receive', 'Respond', 'Repeat'],
    correctAnswer: 1,
    explanation:
      'RASA stands for Receive, Appreciate, Summarise, Ask. The first step \u2014 Receive \u2014 means giving the speaker your full attention, maintaining eye contact, and showing that you are ready to listen.',
  },
  {
    id: 3,
    question: 'What is the correct order of the funnel technique?',
    options: [
      'Specific questions first, then broader questions',
      'Broad, open questions first, gradually narrowing to specific, focused questions',
      'Only closed questions throughout',
      'Alternate between open and closed questions randomly',
    ],
    correctAnswer: 1,
    explanation:
      'The funnel technique starts with broad, open questions ("How did the first fix go?") and progressively narrows to more specific, focused questions ("Where exactly did the continuity test fail?") to explore the topic in detail.',
  },
  {
    id: 4,
    question:
      'Which of Covey\u2019s five levels of listening involves only hearing what you want to hear?',
    options: ['Ignoring', 'Pretend listening', 'Selective listening', 'Attentive listening'],
    correctAnswer: 2,
    explanation:
      'Selective listening means hearing only the parts of the conversation that interest you or confirm what you already think. You filter out the rest. This is a common trap for busy mentors who think they already know what the learner is going to say.',
  },
  {
    id: 5,
    question: 'A Socratic questioning sequence on RCD protection might begin with which question?',
    options: [
      'An RCD protects against earth leakage current, doesn\u2019t it?',
      'What do you think the purpose of an RCD is?',
      'You do know what an RCD does, right?',
      'The answer is that an RCD detects imbalance between line and neutral \u2014 do you understand?',
    ],
    correctAnswer: 1,
    explanation:
      'A Socratic sequence begins with an open, non-judgmental question that invites the learner to think and respond. "What do you think the purpose of an RCD is?" allows the learner to share their current understanding, which the mentor can then build upon with further questions.',
  },
  {
    id: 6,
    question: 'What does the "S" in RASA stand for?',
    options: ['Speak', 'Support', 'Summarise', 'Suggest'],
    correctAnswer: 2,
    explanation:
      'The S in RASA stands for Summarise. After receiving and appreciating what the speaker has said, the listener summarises the key points back to confirm understanding. This shows the speaker that they have been heard and helps catch any misunderstandings.',
  },
  {
    id: 7,
    question: 'Why is it important for a mentor to use silence after asking an open question?',
    options: [
      'To make the learner feel uncomfortable',
      'To give the learner time to think and formulate their answer',
      'Because silence is required by the GROW model',
      'To demonstrate authority and control',
    ],
    correctAnswer: 1,
    explanation:
      'Silence after an open question gives the learner time to think. Many mentors feel uncomfortable with silence and rush to fill it \u2014 either by answering their own question or by asking another one. Resist this urge. The learner needs processing time, especially for complex or reflective questions.',
  },
  {
    id: 8,
    question: 'What is the main challenge of active listening on a construction site?',
    options: [
      'Active listening is not possible in a construction environment',
      'Environmental noise, distractions, and time pressure make it harder to give full attention',
      'Construction workers do not respond well to listening techniques',
      'Active listening requires a formal meeting room',
    ],
    correctAnswer: 1,
    explanation:
      'Construction sites are noisy, busy, and full of distractions. Active listening requires conscious effort in this environment. Moving to a quieter space for important conversations, facing the speaker directly, and minimising distractions all help. Active listening does not require a formal setting \u2014 it requires intention.',
  },
];

export default function MDModule2Section2() {
  useSEO({
    title: 'Questioning Techniques & Active Listening | Mentoring Module 2.2',
    description:
      'Open vs closed questions, Socratic questioning, the funnel technique, Covey\u2019s five levels of listening, and the RASA framework for active listening in construction mentoring.',
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button
            variant="ghost"
            className="min-h-[44px] text-white hover:text-white active:text-white p-0 -ml-1 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../md-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Centred Header */}
        <div className="mb-12 text-center">
          <HelpCircle className="h-10 w-10 text-rose-400 mx-auto mb-4" />
          <span className="inline-block bg-rose-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
            MODULE 2 &middot; SECTION 2
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Questioning Techniques &amp; Active Listening
          </h1>
          <p className="text-white max-w-xl mx-auto">
            The art of asking the right questions and genuinely listening to the answers &mdash;
            essential skills for every mentor on site
          </p>
        </div>

        {/* Quick Summary */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-rose-400 text-sm font-normal">00</span>
            Quick Summary
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-rose-500/10 border-l-2 border-l-rose-500/50 border border-rose-500/30">
              <p className="font-semibold text-base text-rose-400 mb-2">In 30 Seconds</p>
              <ul className="text-base text-white space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                  <span>
                    <strong>Open questions</strong> start with how, what, why, tell me about &mdash;
                    they encourage thinking and detailed responses.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                  <span>
                    <strong>Socratic questioning</strong> guides the learner to discover the answer
                    for themselves through a logical sequence of questions.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                  <span>
                    <strong>Active listening</strong> means truly hearing what someone is saying,
                    not just waiting for your turn to speak.
                  </span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-rose-500/10 border-l-2 border-l-rose-500/50 border border-rose-500/30">
              <p className="font-semibold text-base text-rose-400 mb-2">On Site</p>
              <ul className="text-base text-white space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                  <span>
                    <strong>Funnel technique:</strong> Start broad (&ldquo;How did the first fix
                    go?&rdquo;), then narrow down (&ldquo;Where exactly did the continuity test
                    fail?&rdquo;).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                  <span>
                    <strong>RASA framework:</strong> Receive, Appreciate, Summarise, Ask &mdash; a
                    practical structure for active listening in any setting.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                  <span>
                    <strong>Noisy sites:</strong> Move to a quieter space for important
                    conversations. Active listening requires concentration.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Learning Outcomes */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            Learning Outcomes
          </h2>
          <p className="text-white mb-4">By the end of this section, you will be able to:</p>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
              <span>
                Distinguish between open and closed questions and use each appropriately in
                mentoring conversations
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
              <span>
                Apply Socratic questioning to guide a learner towards understanding without simply
                telling them the answer
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
              <span>
                Use the funnel technique to move from broad exploration to specific detail in a
                conversation
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
              <span>
                Describe Covey&rsquo;s five levels of listening and identify which level you
                typically operate at
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
              <span>
                Apply the RASA framework (Receive, Appreciate, Summarise, Ask) to practise active
                listening
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
              <span>
                Adapt active listening techniques for noisy and distracting construction site
                environments
              </span>
            </li>
          </ul>
        </section>

        <hr className="border-white/10 mb-10" />

        {/* Section 01: Open vs Closed Questions */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-rose-400 text-sm font-normal">01</span>
              Open vs Closed Questions
            </h2>
            <div className="space-y-4 text-white">
              <p>
                The type of question you ask determines the type of answer you get. As a mentor,
                your most powerful tool is the open question &mdash; it encourages the learner to
                think, reflect, and explain their reasoning. Closed questions have their place, but
                relying on them too heavily keeps the learner passive.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-elec-yellow">Key Definition</h3>
                <p className="text-white text-sm">
                  <strong>Open questions</strong> cannot be answered with a simple yes or no. They
                  begin with words like <em>how</em>, <em>what</em>, <em>why</em>,{' '}
                  <em>tell me about</em>, <em>describe</em>, or <em>explain</em>. They invite
                  extended, thoughtful responses. <strong>Closed questions</strong> can be answered
                  with yes, no, or a single word. They are useful for confirming facts but do not
                  encourage deeper thinking.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">
                  <MessageCircle className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  Construction Examples
                </h3>
                <div className="space-y-3">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                      <p className="text-red-300 font-medium text-sm mb-2">
                        Closed (limits thinking)
                      </p>
                      <ul className="text-white text-sm space-y-1.5">
                        <li>&ldquo;Did you test the circuit?&rdquo;</li>
                        <li>&ldquo;Was the RCD tripping?&rdquo;</li>
                        <li>&ldquo;Have you finished the containment?&rdquo;</li>
                        <li>&ldquo;Is that the right cable size?&rdquo;</li>
                      </ul>
                    </div>
                    <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg">
                      <p className="text-green-300 font-medium text-sm mb-2">
                        Open (encourages thinking)
                      </p>
                      <ul className="text-white text-sm space-y-1.5">
                        <li>&ldquo;How did you verify that the circuit was safe?&rdquo;</li>
                        <li>&ldquo;What do you think caused the RCD to trip?&rdquo;</li>
                        <li>&ldquo;Tell me about how you approached the containment run.&rdquo;</li>
                        <li>&ldquo;How did you decide on that cable size?&rdquo;</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-2">When to Use Closed Questions</h3>
                <p className="text-white text-sm mb-3">
                  Closed questions are not always wrong. They are useful for:
                </p>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <span>
                      <strong>Confirming understanding:</strong> &ldquo;So you tested R1+R2 at every
                      point, is that right?&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <span>
                      <strong>Safety checks:</strong> &ldquo;Have you proved dead?&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <span>
                      <strong>Quick factual confirmation:</strong> &ldquo;Is that a 32A or 40A
                      breaker?&rdquo;
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                The goal is not to eliminate closed questions entirely, but to ensure that open
                questions form the majority of your mentoring conversations. A good rule of thumb is
                to aim for at least three open questions for every closed question you ask.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Socratic Questioning */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-rose-400 text-sm font-normal">02</span>
              Socratic Questioning
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Socratic questioning is named after the ancient Greek philosopher Socrates
                (470&ndash;399 BC), who believed that the best way to learn was not to be told the
                answer, but to be guided towards discovering it through a carefully structured
                sequence of questions. In a mentoring context, Socratic questioning helps the
                learner develop deeper understanding by working through the logic themselves.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-rose-400">
                  The Principle Behind Socratic Questioning
                </h3>
                <p className="text-white text-sm">
                  Instead of telling the learner the answer, you ask a sequence of questions that
                  lead them to the answer step by step. Each question builds on the previous answer,
                  creating a chain of reasoning. The learner arrives at the conclusion themselves,
                  which means they understand it more deeply and are more likely to remember it.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">
                  <Search className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  Worked Example: Socratic Sequence on RCD Protection
                </h3>
                <p className="text-white text-sm mb-3">
                  An apprentice asks: &ldquo;Why do we need RCDs?&rdquo; Instead of giving a
                  lecture, the mentor guides them through a sequence of questions:
                </p>
                <div className="space-y-3 text-sm">
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <p className="text-white">
                      <strong>Mentor:</strong> &ldquo;What do you think happens if a line conductor
                      touches an earthed metal enclosure?&rdquo;
                    </p>
                    <p className="text-white mt-1">
                      <strong>Apprentice:</strong> &ldquo;The current flows to earth through the
                      metal.&rdquo;
                    </p>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <p className="text-white">
                      <strong>Mentor:</strong> &ldquo;Good. And what if someone touches that metal
                      enclosure before the overcurrent device trips?&rdquo;
                    </p>
                    <p className="text-white mt-1">
                      <strong>Apprentice:</strong> &ldquo;The current could flow through them to
                      earth. They could get a shock.&rdquo;
                    </p>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <p className="text-white">
                      <strong>Mentor:</strong> &ldquo;Exactly. Now, how much current does it take to
                      be dangerous to a person?&rdquo;
                    </p>
                    <p className="text-white mt-1">
                      <strong>Apprentice:</strong> &ldquo;About 30 milliamps, I think?&rdquo;
                    </p>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <p className="text-white">
                      <strong>Mentor:</strong> &ldquo;That&rsquo;s right. And would a 32A MCB trip
                      at 30mA?&rdquo;
                    </p>
                    <p className="text-white mt-1">
                      <strong>Apprentice:</strong> &ldquo;No, 30mA is nowhere near 32A. The MCB
                      wouldn&rsquo;t trip at all.&rdquo;
                    </p>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <p className="text-white">
                      <strong>Mentor:</strong> &ldquo;So what kind of device would you need to
                      detect that 30mA earth leakage and disconnect quickly enough to protect a
                      person?&rdquo;
                    </p>
                    <p className="text-white mt-1">
                      <strong>Apprentice:</strong> &ldquo;An RCD. It detects the imbalance between
                      line and neutral and trips.&rdquo;
                    </p>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <p className="text-white">
                      <strong>Mentor:</strong> &ldquo;Brilliant. You&rsquo;ve just explained to
                      yourself exactly why we need RCDs.&rdquo;
                    </p>
                  </div>
                </div>
              </div>

              <p>
                Notice that the mentor knew the answer from the beginning. The skill is in
                <strong> not</strong> telling the apprentice, but instead asking questions that lead
                them through the reasoning chain. The apprentice now understands <em>why</em> RCDs
                are needed, not just <em>that</em> they are needed. This understanding will stay
                with them far longer than a lecture would.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-elec-yellow">Remember</h3>
                <p className="text-white text-sm">
                  Socratic questioning requires patience. You must resist the urge to jump in with
                  the answer. Allow silence after each question &mdash; the learner needs time to
                  think. If they give a wrong answer, do not correct them directly. Instead, ask
                  another question that helps them see the flaw in their reasoning.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: The Funnel Technique */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-rose-400 text-sm font-normal">03</span>
              The Funnel Technique
            </h2>
            <div className="space-y-4 text-white">
              <p>
                The funnel technique is a questioning strategy that starts with broad, open
                questions and gradually narrows to more specific, focused questions. It is
                particularly useful when you want to understand a situation in detail or when you
                want to help a learner pinpoint exactly where a problem occurred.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 sm:p-6 rounded-lg">
                <h3 className="font-semibold mb-4 text-rose-400 text-center text-sm uppercase tracking-wider">
                  The Funnel: Broad to Specific
                </h3>
                <div className="space-y-2">
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-rose-300 font-bold text-sm">1</span>
                      </div>
                      <div>
                        <p className="text-rose-300 font-medium text-sm">Broad &amp; Open</p>
                        <p className="text-white text-sm">
                          &ldquo;How did the first fix go today?&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-rose-300 font-bold text-sm">2</span>
                      </div>
                      <div>
                        <p className="text-rose-300 font-medium text-sm">Narrowing</p>
                        <p className="text-white text-sm">
                          &ldquo;You mentioned some issues with the ring final. What
                          happened?&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-rose-300 font-bold text-sm">3</span>
                      </div>
                      <div>
                        <p className="text-rose-300 font-medium text-sm">More Specific</p>
                        <p className="text-white text-sm">
                          &ldquo;When you tested the ring, which measurement was out?&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-rose-300 font-bold text-sm">4</span>
                      </div>
                      <div>
                        <p className="text-rose-300 font-medium text-sm">Pinpointed</p>
                        <p className="text-white text-sm">
                          &ldquo;Where exactly did the continuity test fail? Which socket?&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                The funnel technique works because it lets the learner tell their story first before
                you drill into the detail. Starting with a broad question shows that you are
                interested in their experience as a whole, not just looking for mistakes. As you
                narrow down, the learner often identifies the problem themselves before you even
                need to point it out.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-2">
                  Practical Tips for Using the Funnel
                </h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <span>
                      Start with a genuinely open question &mdash; do not begin with what you
                      already suspect is the problem
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <span>
                      Listen to the response before deciding which direction to narrow towards
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <span>
                      Use the learner&rsquo;s own words in your follow-up questions to show you are
                      listening
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <span>
                      Do not skip straight to the specific question &mdash; the context from earlier
                      stages is valuable
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Active Listening */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-rose-400 text-sm font-normal">04</span>
              Active Listening
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Asking good questions is only half the skill. The other half is genuinely listening
                to the answers. Active listening means giving the speaker your full attention,
                processing what they are saying, and responding in a way that shows you have
                understood. It is, paradoxically, one of the hardest skills for experienced
                electricians to develop as mentors &mdash; because you often already know the answer
                and are tempted to jump in before the learner has finished speaking.
              </p>

              {/* Covey's 5 Levels */}
              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 text-rose-400">
                  <Ear className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  Covey&rsquo;s Five Levels of Listening
                </h3>
                <p className="text-white text-sm mb-3">
                  Stephen Covey, in <em>The 7 Habits of Highly Effective People</em>, identified
                  five levels of listening. Most people operate at levels 1&ndash;3 most of the
                  time. Effective mentoring requires level 4 or 5.
                </p>
                <div className="space-y-2">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-red-500/20 border border-red-400/40 flex items-center justify-center flex-shrink-0">
                      <span className="text-red-300 font-bold text-xs">1</span>
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">Ignoring</p>
                      <p className="text-white text-sm">
                        Not listening at all. Looking at your phone, thinking about the next job, or
                        walking away while someone is talking.
                      </p>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-orange-500/20 border border-orange-400/40 flex items-center justify-center flex-shrink-0">
                      <span className="text-orange-300 font-bold text-xs">2</span>
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">Pretend Listening</p>
                      <p className="text-white text-sm">
                        Making the right noises (&ldquo;mmm&rdquo;, &ldquo;yeah&rdquo;) without
                        actually processing what the person is saying. Your mind is elsewhere.
                      </p>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-yellow-500/20 border border-yellow-400/40 flex items-center justify-center flex-shrink-0">
                      <span className="text-yellow-300 font-bold text-xs">3</span>
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">Selective Listening</p>
                      <p className="text-white text-sm">
                        Hearing only the parts that interest you or confirm what you already think.
                        Filtering out the rest. Common among experienced electricians who think they
                        already know the answer.
                      </p>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-300 font-bold text-xs">4</span>
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">Attentive Listening</p>
                      <p className="text-white text-sm">
                        Paying full attention to the words and content. You hear what is being said
                        and can repeat it back accurately. This is good, but not the highest level.
                      </p>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-green-500/20 border border-green-400/40 flex items-center justify-center flex-shrink-0">
                      <span className="text-green-300 font-bold text-xs">5</span>
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">Empathic Listening</p>
                      <p className="text-white text-sm">
                        Listening with the intent to understand the other person&rsquo;s
                        perspective, feelings, and meaning &mdash; not just their words. You put
                        yourself in their shoes. This builds the deepest trust and is the gold
                        standard for mentoring.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* RASA Framework */}
              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 text-rose-400 text-center text-sm uppercase tracking-wider">
                  The RASA Active Listening Framework
                </h3>
                <p className="text-white text-sm mb-3 text-center">
                  A practical four-step structure for active listening in any situation.
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <h4 className="text-rose-300 font-semibold mb-1">R &mdash; Receive</h4>
                    <p className="text-white text-sm">
                      Give the speaker your full attention. Face them, maintain eye contact, put
                      down your tools or phone. Show that you are ready to listen.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <h4 className="text-rose-300 font-semibold mb-1">A &mdash; Appreciate</h4>
                    <p className="text-white text-sm">
                      Show that you value what the speaker is saying. Nod, use small verbal cues
                      (&ldquo;I see&rdquo;, &ldquo;go on&rdquo;), and avoid interrupting. Let them
                      finish their thought.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <h4 className="text-rose-300 font-semibold mb-1">S &mdash; Summarise</h4>
                    <p className="text-white text-sm">
                      Reflect back the key points in your own words. &ldquo;So what you&rsquo;re
                      saying is...&rdquo; This confirms understanding and shows the speaker they
                      have been heard.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <h4 className="text-rose-300 font-semibold mb-1">A &mdash; Ask</h4>
                    <p className="text-white text-sm">
                      Follow up with a relevant question that shows genuine interest and deepens the
                      conversation. This keeps the dialogue going and demonstrates that you are
                      engaged.
                    </p>
                  </div>
                </div>
              </div>

              {/* Active Listening on Noisy Sites */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">Active Listening on Noisy Sites</h3>
                <p className="text-white text-sm mb-3">
                  Construction sites are challenging environments for listening. Here are practical
                  strategies for active listening when the conditions are not ideal:
                </p>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <span>
                      <strong>Move to a quieter space</strong> for important development
                      conversations &mdash; the welfare cabin, the van, or a completed room
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <span>
                      <strong>Face the speaker directly</strong> and maintain eye contact, even if
                      the noise makes it harder to hear
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <span>
                      <strong>Use non-verbal signals</strong> (nodding, thumbs up, hand gestures) to
                      show engagement when speaking is difficult
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <span>
                      <strong>Summarise more often</strong> to compensate for anything you might
                      have missed &mdash; &ldquo;Just to make sure I heard you right...&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <span>
                      <strong>Put down your tools</strong> &mdash; you cannot listen actively while
                      working. If the conversation is important, pause what you are doing
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-elec-yellow">Remember</h3>
                <p className="text-white text-sm">
                  The most common listening mistake mentors make is thinking about what they are
                  going to say next while the other person is still talking. If you catch yourself
                  doing this, refocus on the speaker. You can always pause for a moment to gather
                  your thoughts after they have finished &mdash; that pause actually makes you look
                  more thoughtful, not less prepared.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6 flex items-center gap-2">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
                <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-white text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        <div className="mt-12">
          <Quiz title="Section 2 Knowledge Check" questions={quizQuestions} />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[44px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../md-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[44px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../md-module-2-section-3">
              Next: Giving Effective Feedback
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  );
}
