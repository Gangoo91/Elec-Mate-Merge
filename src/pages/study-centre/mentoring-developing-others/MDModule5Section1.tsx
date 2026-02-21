import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  HelpCircle,
  Target,
  Users,
  Shield,
  BookOpen,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

/* ------------------------------------------------------------------ */
/*  Quick-check questions (placed between content sections)            */
/* ------------------------------------------------------------------ */
const quickCheckQuestions = [
  {
    question:
      'An apprentice consistently does the bare minimum, arrives on the dot and leaves on the dot, and shows no interest in learning beyond what is strictly required. Before taking disciplinary action, what should a mentor do first?',
    options: [
      'Issue a formal warning for poor engagement',
      'Assign more challenging work to force them to engage',
      'Have a private one-to-one conversation to explore the root cause of their disengagement',
      'Report them to their college tutor for lack of motivation',
    ],
    correctIndex: 2,
    explanation:
      'The most effective first step is always to explore the root cause. Disengagement can stem from many sources: wrong career choice, personal problems, poor previous learning experiences, feeling undervalued, or even undiagnosed learning difficulties. A private, non-judgemental conversation often reveals the real issue, which then allows you to address it appropriately. Jumping straight to disciplinary action or reporting addresses symptoms, not causes.',
  },
  {
    question:
      'An apprentice says "I already know how to do safe isolation — I watched a video on YouTube." They then begin to isolate a circuit without using a voltage indicator to prove dead. What concept from learning theory does this demonstrate?',
    options: [
      'Conscious competence — they know what they are doing',
      'Unconscious incompetence — they do not know what they do not know',
      'Conscious incompetence — they know they cannot do it yet',
      'Unconscious competence — they can do it without thinking',
    ],
    correctIndex: 1,
    explanation:
      'This is unconscious incompetence — the most dangerous stage of the learning cycle. The apprentice genuinely believes they can perform safe isolation because they have seen it done, but they lack the practical skill and knowledge to do it safely. They do not know what they do not know. This is why overconfident learners are particularly dangerous in the electrical trade: the gap between what they think they can do and what they can actually do creates a serious safety risk.',
  },
  {
    question:
      'An apprentice keeps making the same mistake — forgetting to label cables during first fix. You have shown them three times. How do you determine whether this is a skill deficit or a motivational deficit?',
    options: [
      'It must be a motivational deficit because you have shown them three times',
      'It must be a skill deficit because they keep forgetting',
      'Ask yourself: if their life depended on it, could they do it correctly? If yes, it is motivational. If no, it is skill.',
      'There is no way to distinguish between the two — treat them the same',
    ],
    correctIndex: 2,
    explanation:
      'The key diagnostic question is: "If their life depended on it, could they do it?" If the answer is yes — they know how to label cables but choose not to bother — then it is a motivational deficit, and you need to address attitude, consequences, and expectations. If the answer is no — they genuinely do not understand the labelling system — then it is a skill deficit, and you need to reteach using a different approach, provide more scaffolding, or break the task into smaller steps.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'What if an apprentice simply does not want to be an electrician?',
    answer:
      'This is more common than many people realise. Some apprentices are pushed into the trade by family expectations, limited awareness of other options, or simply because a place was available. If, after genuine exploration, it becomes clear that the apprentice has no interest in or aptitude for electrical work, the kindest and most professional thing you can do is have an honest conversation about it. This is not failure — it is good mentoring. Helping someone recognise that they are on the wrong path early saves years of frustration for everyone. Signpost them to careers advice through their college, training provider, or the National Careers Service. Some may thrive in a related trade; others may need an entirely different direction. Your role is to guide, not to force.',
  },
  {
    question:
      'How do I deal with an apprentice who is more technically able than me in some areas?',
    answer:
      'This is increasingly common, particularly with technology. A younger apprentice may be far more comfortable with digital tools, apps, and online learning platforms than an experienced mentor. Rather than seeing this as a threat, treat it as an opportunity for reverse mentoring — you teach them the trade craft, practical experience, and professional judgement that only comes with years on site, and they share their digital skills with you. This creates a genuinely collaborative learning relationship where both parties benefit. The moment you pretend to know something you do not, you lose credibility. Honest acknowledgement of each other&rsquo;s strengths builds mutual respect.',
  },
  {
    question:
      'An apprentice is going through a family breakdown and their work is suffering. How far should I get involved?',
    answer:
      'Your role is mentor, not counsellor. You should listen with empathy, acknowledge the difficulty of their situation, and make reasonable temporary adjustments (perhaps slightly reduced expectations for a defined period, flexibility on timing, or extra patience with concentration lapses). However, you should not try to fix their personal problems, offer relationship advice, or become their therapist. Know the boundaries of your role and signpost professional support: their GP, college wellbeing services, the Construction Industry Helpline (0345 605 1956), or the Electrical Industries Charity. Maintain standards while showing compassion — this teaches them that professional responsibilities continue even when life is difficult.',
  },
  {
    question:
      'Is it appropriate to use humour when mentoring, or should I keep things strictly professional?',
    answer:
      'Humour, used appropriately, is one of the most powerful tools in a mentor&rsquo;s toolkit. It reduces tension, builds rapport, makes learning memorable, and creates a relaxed environment where apprentices feel safe to ask questions and make mistakes. The key word is "appropriately." Humour should never be at the apprentice&rsquo;s expense, never based on personal characteristics (age, gender, background), and never used to mask or avoid addressing a serious issue. Self-deprecating humour — sharing your own apprenticeship mistakes — is particularly effective because it normalises failure and shows that everyone starts somewhere. If in doubt about whether something is appropriate, it probably is not.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions                                                     */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question: 'Which of the following is NOT a typical sign of a reluctant learner?',
    options: [
      'Minimal engagement with tasks and discussions',
      'Asking lots of detailed questions about the work',
      'Late submissions of college assignments',
      'Clock-watching and leaving at the earliest possible time',
    ],
    correctAnswer: 1,
    explanation:
      'Asking lots of detailed questions is actually a sign of engagement, not reluctance. Reluctant learners typically show minimal engagement, late submissions, doing the bare minimum, and clock-watching. A learner who asks questions is demonstrating curiosity and investment in their learning, which is exactly what a mentor wants to see.',
  },
  {
    id: 2,
    question:
      'An apprentice rushes through safe isolation without proving dead. They say "I have done this loads of times, I do not need to check." This learner is at which stage of the conscious competence model?',
    options: [
      'Unconscious competence — they can do it without thinking',
      'Conscious competence — they know what they are doing and do it deliberately',
      'Unconscious incompetence — they do not know what they do not know',
      'Conscious incompetence — they know they cannot do it yet',
    ],
    correctAnswer: 2,
    explanation:
      'This is unconscious incompetence — the most dangerous stage. The apprentice believes they are competent (hence "I have done this loads of times") but is actually performing the task unsafely by skipping critical steps. They do not recognise their own incompetence. This is why overconfident learners pose a serious safety risk, particularly in the electrical trade where mistakes can be fatal.',
  },
  {
    id: 3,
    question:
      'What is the most effective first response when you suspect an apprentice is disengaged due to personal problems?',
    options: [
      'Ignore it — their personal life is none of your business',
      'Refer them immediately to their college tutor',
      'Have a private, supportive conversation: "I have noticed you seem a bit distracted lately. Is everything OK?"',
      'Lower your expectations permanently so they do not feel pressured',
    ],
    correctAnswer: 2,
    explanation:
      'A private, supportive conversation is the right first step. It shows you have noticed and that you care, without making assumptions or invading privacy. The key is to open the door without forcing it — let them share as much or as little as they choose. Ignoring the situation allows it to deteriorate; immediate referral skips your primary role as a trusted mentor; and permanently lowering expectations does them a disservice.',
  },
  {
    id: 4,
    question:
      'You have shown an apprentice how to terminate SWA cable three times, but they keep making the same mistakes. Which question helps you distinguish between a skill deficit and a motivational deficit?',
    options: [
      '"Have you been paying attention?"',
      '"Do you want to be an electrician or not?"',
      '"If your life depended on getting this right, could you do it?"',
      '"Shall I show you a fourth time?"',
    ],
    correctAnswer: 2,
    explanation:
      'The diagnostic question "If their life depended on it, could they do it?" is the key to distinguishing between skill and motivation deficits. If they could do it under extreme motivation, then the knowledge and skill are present but the motivation or attention is lacking — that is a motivational deficit requiring a conversation about attitude and consequences. If they genuinely could not do it even with maximum motivation, then it is a skill deficit requiring reteaching with a different approach.',
  },
  {
    id: 5,
    question:
      'Which strategy is most appropriate for an overconfident learner who dismisses safety procedures?',
    options: [
      'Let them learn from their mistakes — experience is the best teacher',
      'Use objective assessment evidence to show the gap between their belief and their actual competence',
      'Publicly correct them in front of the team to ensure the message gets through',
      'Remove them from practical tasks until their attitude improves',
    ],
    correctAnswer: 1,
    explanation:
      'Using objective assessment evidence is the most effective approach because it is factual, not personal. When you show an overconfident learner their test results, observed errors, or photographic evidence of their work compared to the required standard, you create cognitive dissonance — the gap between their belief and reality becomes undeniable. This is far more effective than letting them learn from dangerous mistakes (which could be fatal in electrical work), public humiliation (which damages the relationship), or removal from tasks (which prevents learning).',
  },
  {
    id: 6,
    question:
      'An older, experienced mentor finds it difficult to relate to a 17-year-old apprentice who communicates primarily through their phone. What approach is most likely to bridge this generational gap?',
    options: [
      'Ban the apprentice from using their phone on site',
      'Insist the apprentice communicates the same way the mentor does',
      'Find common ground through shared trade identity and adapt communication methods where possible',
      'Request a younger mentor who will understand the apprentice better',
    ],
    correctAnswer: 2,
    explanation:
      'Finding common ground through shared trade identity is the most constructive approach. Despite generational differences in communication preferences, both mentor and apprentice share a commitment to the electrical trade, a desire to do good work, and pride in their skills. The mentor might adapt by using WhatsApp for sending quick reference photos, while the apprentice adapts by giving full attention during face-to-face demonstrations. Meeting in the middle builds mutual respect.',
  },
  {
    id: 7,
    question:
      'A mentor discovers that an apprentice is being bullied by another tradesperson on site. What should the mentor do?',
    options: [
      'Tell the apprentice to toughen up — construction sites are rough environments',
      'Confront the tradesperson directly and sort it out themselves',
      'Take the apprentice seriously, document the situation, and escalate through proper channels (site management, HR, or their employer)',
      'Advise the apprentice to avoid the tradesperson and hope it resolves itself',
    ],
    correctAnswer: 2,
    explanation:
      'The mentor has a duty of care to take the situation seriously, document what is happening, and escalate through proper channels. Telling an apprentice to "toughen up" normalises bullying and damages trust. Confronting the tradesperson directly could escalate the situation or put the mentor in a difficult position. Avoidance allows the behaviour to continue and may worsen. The correct approach protects the apprentice, creates a formal record, and involves people with the authority to address the situation.',
  },
  {
    id: 8,
    question:
      'When temporarily adjusting expectations for an apprentice going through personal difficulties, what is the most important principle?',
    options: [
      'Remove all deadlines until they feel better',
      'Set a defined period for adjusted expectations and agree a clear plan to return to normal standards',
      'Treat them exactly the same as always — personal problems should not affect work',
      'Take over their work so they have nothing to worry about',
    ],
    correctAnswer: 1,
    explanation:
      'The key principle is that adjustments should be temporary, defined, and agreed. Set a specific period (perhaps two to four weeks), agree what adjusted expectations look like, and schedule a review date. This shows compassion while maintaining professional standards. It also teaches an important life lesson: employers will support you through difficult times, but professional responsibilities continue. Open-ended removal of expectations, ignoring the situation, or taking over their work all prevent the apprentice from developing resilience.',
  },
];

export default function MDModule5Section1() {
  useSEO({
    title: 'Difficult Mentoring Situations | MD Module 5.1',
    description:
      'Handling the reluctant learner, the overconfident learner, repetitive mistakes, learners with personal problems, and generational differences — with construction-specific examples.',
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
            <Link to="../md-module-5">
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
            <AlertTriangle className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 5 &middot; SECTION 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Difficult Mentoring Situations
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Recognising, understanding, and responding effectively to the most challenging scenarios
            you will face as a mentor
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Reluctant learners:</strong> Explore root causes before judging &mdash; the
                behaviour is a symptom, not the problem
              </li>
              <li>
                <strong>Overconfident learners:</strong> Unconscious incompetence is dangerous
                &mdash; use evidence to reveal the gap
              </li>
              <li>
                <strong>Repetitive mistakes:</strong> Distinguish between can&rsquo;t do (skill) and
                won&rsquo;t do (motivation)
              </li>
              <li>
                <strong>Personal problems:</strong> Support with boundaries &mdash; mentor, not
                counsellor
              </li>
              <li>
                <strong>Generational gaps:</strong> Find common ground through shared trade identity
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Safety:</strong> Overconfident or disengaged learners are a direct safety
                risk in the electrical trade
              </li>
              <li>
                <strong>Retention:</strong> Good mentoring through difficult times is the number one
                factor in apprenticeship completion
              </li>
              <li>
                <strong>Your growth:</strong> How you handle difficult situations defines your
                quality as a mentor
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Identify the signs and root causes of learner reluctance and disengagement',
              'Explain why overconfident learners pose a particular safety risk in the electrical trade',
              'Distinguish between skill deficits and motivational deficits when learners make repetitive mistakes',
              'Demonstrate appropriate support for a learner experiencing personal difficulties while maintaining professional boundaries',
              'Apply strategies for bridging generational differences between mentor and learner',
              'Select appropriate intervention strategies for each type of difficult mentoring situation',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: The Reluctant Learner */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">01</span>
            The Reluctant Learner
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Every mentor, sooner or later, encounters a learner who simply does not seem to want
                to be there. They arrive on the dot, leave on the dot, contribute nothing
                voluntarily, submit work late or at the lowest possible standard, and show no
                curiosity about the trade. It is tempting to label them as lazy or to write them off
                as someone who &ldquo;does not want it badly enough.&rdquo; But effective mentoring
                requires you to look deeper.
              </p>

              <p>
                Reluctance is a <strong>symptom</strong>, not a diagnosis. Before you can address
                it, you need to understand what is causing it. The behaviour you observe on the
                surface &mdash; disengagement, minimal effort, passive resistance &mdash; is almost
                always driven by something underneath that the learner may not even be fully aware
                of themselves.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Common Signs of Reluctance</p>
                </div>
                <ul className="text-sm text-white space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      Minimal engagement with tasks &mdash; doing the bare minimum required
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Late or missing college assignments and portfolio evidence</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      Clock-watching &mdash; arriving at the last minute and leaving at the earliest
                      opportunity
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>No questions, no initiative, no voluntary engagement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      Body language that signals disinterest: distracted, on their phone, not making
                      eye contact
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                The causes of reluctance are varied, and understanding which one you are dealing
                with completely changes your response. Here are the most common root causes:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Root Causes of Reluctance</p>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-white mb-1">Wrong career choice</p>
                    <p className="text-sm text-white">
                      The apprentice was pushed into the trade by family, limited options, or
                      because a place was available. They have no genuine interest in electrical
                      work and are going through the motions.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">Personal issues</p>
                    <p className="text-sm text-white">
                      Problems at home, relationship breakdowns, financial stress, mental health
                      difficulties, or bereavement. The apprentice is physically present but
                      mentally elsewhere.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">
                      Poor previous learning experiences
                    </p>
                    <p className="text-sm text-white">
                      Bad experiences at school have left the apprentice believing they are
                      &ldquo;not clever enough&rdquo; or that learning is something done to them
                      rather than something they participate in. They have learned helplessness.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">
                      Feeling undervalued or invisible
                    </p>
                    <p className="text-sm text-white">
                      They perceive that their contributions are not noticed, that they are just
                      cheap labour, or that nobody cares whether they learn or not. Why bother
                      engaging if nobody is paying attention?
                    </p>
                  </div>
                </div>
              </div>

              <p>
                <strong>Your primary strategy</strong> with a reluctant learner is to explore the
                root cause through a private one-to-one conversation. Not a formal meeting, not a
                telling-off &mdash; a genuine, curious conversation. &ldquo;I have noticed you seem
                a bit flat lately. How are you finding things? Is there anything that would make
                this work better for you?&rdquo; Open questions, genuine interest, and no judgement.
                You may be surprised by what you hear.
              </p>

              <p>
                Once you understand the cause, you can match your response. If it is wrong career
                choice, have an honest conversation about options. If it is personal issues, offer
                appropriate support and signposting. If it is poor previous learning experiences,
                rebuild their confidence through small, achievable targets and genuine praise. If
                they feel undervalued, start noticing and acknowledging their work &mdash; even
                small things.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Construction Example: The Bare-Minimum Apprentice
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  Jake, a second-year apprentice, does exactly what he is told but never anything
                  more. He never asks questions, shows no interest in understanding why things are
                  done a certain way, and his college work is always submitted late at the lowest
                  possible standard. His mentor, Steve, initially assumes Jake is simply lazy.
                </p>
                <p className="text-sm text-white mb-3">
                  Instead of confronting Jake about his attitude, Steve takes him for a coffee after
                  work and asks open questions: &ldquo;How are you finding the apprenticeship? Is
                  this what you expected?&rdquo; Jake eventually reveals that he wanted to be a
                  plumber, but his dad &mdash; an electrician &mdash; insisted he follow the family
                  trade. He feels trapped and resentful.
                </p>
                <p className="text-sm text-white">
                  Steve acknowledges this honestly: &ldquo;That is a tough position to be in. Let me
                  ask you this &mdash; is there anything about the electrical work that you do
                  enjoy, even a small part?&rdquo; Jake admits he quite likes the fault-finding and
                  diagnostic side. Steve adjusts his approach, giving Jake more exposure to testing
                  and fault-finding tasks. Jake&rsquo;s engagement gradually improves &mdash; not
                  because the root cause disappeared, but because Steve found a connection point
                  within the situation.
                </p>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Remember:</strong> Offering choices is a
                  powerful motivational tool. Instead of dictating every task, give the apprentice
                  options: &ldquo;We need to do the containment run in corridor B and the cable
                  pulls in office 4 today. Which would you like to start with?&rdquo; Even small
                  choices increase a learner&rsquo;s sense of autonomy and engagement.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: The Overconfident Learner */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">02</span>
            The Overconfident Learner
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                If the reluctant learner is frustrating, the overconfident learner is{' '}
                <strong>dangerous</strong>. In the electrical trade, overconfidence can kill. An
                apprentice who skips safe isolation steps because they &ldquo;already know how to do
                it,&rdquo; who rushes through testing because they think they can tell if a circuit
                is live &ldquo;by feel,&rdquo; or who dismisses BS 7671 requirements because
                &ldquo;that is just theory&rdquo; is a walking safety incident waiting to happen.
              </p>

              <p>
                The learning theory behind this is the <strong>conscious competence model</strong>{' '}
                (often attributed to Noel Burch, Gordon Training International, 1970s). There are
                four stages of learning:
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">
                  The Four Stages of Competence
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Unconscious Incompetence</p>
                      <p className="text-sm text-white">
                        You do not know what you do not know. You think you are competent, but you
                        are not.{' '}
                        <strong>
                          This is where overconfident learners sit, and it is the most dangerous
                          stage.
                        </strong>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Conscious Incompetence</p>
                      <p className="text-sm text-white">
                        You now know what you do not know. This feels uncomfortable, but it is
                        actually progress &mdash; awareness of the gap is the first step to closing
                        it.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Conscious Competence</p>
                      <p className="text-sm text-white">
                        You can do it, but it requires concentration and deliberate effort. You are
                        following the steps consciously.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-green-500/20 text-green-400 text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Unconscious Competence</p>
                      <p className="text-sm text-white">
                        You can do it without thinking &mdash; it has become second nature through
                        extensive practice and repetition.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                The overconfident learner is stuck at Stage 1: unconscious incompetence. They
                genuinely believe they are more competent than they are. This is not always
                arrogance &mdash; sometimes it is because they have seen something done on YouTube,
                been told they are &ldquo;a natural,&rdquo; or have had early success that creates a
                false sense of mastery. The Dunning-Kruger effect (Kruger &amp; Dunning, 1999)
                describes this phenomenon: people with limited knowledge in an area tend to
                significantly overestimate their own ability because they lack the expertise to
                recognise what they do not know.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Signs of Overconfidence</p>
                </div>
                <ul className="text-sm text-white space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Skipping steps in procedures, especially safety-critical ones</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Not checking their own work before moving on</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      Dismissing safety procedures as unnecessary or &ldquo;common sense&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      &ldquo;I already know this&rdquo; or &ldquo;I have done this before&rdquo;
                      when they clearly have not mastered the skill
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Working faster than their skill level allows, leading to errors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      Resisting feedback or becoming defensive when errors are pointed out
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                <strong>Strategies for the overconfident learner:</strong>
              </p>

              <p>
                The most effective approach is to use <strong>objective assessment evidence</strong>{' '}
                to show them the gap between their perceived ability and their actual ability. This
                is not about humiliating them &mdash; it is about creating the cognitive dissonance
                needed to move them from unconscious incompetence to conscious incompetence, which
                is where real learning begins.
              </p>

              <p>
                Set tasks that are genuinely challenging &mdash; tasks that will reveal the limits
                of their current ability. If they claim they can terminate SWA cable, set them a
                timed exercise and assess the result against the required standard. Photograph their
                work and compare it side-by-side with a correctly completed termination. The
                evidence speaks for itself.
              </p>

              <p>
                Have a serious, private conversation about <strong>real consequences</strong>. In
                the electrical trade, overconfidence is not just an attitude problem &mdash; it is a
                life-and-death matter. Share real case studies of incidents caused by people who
                skipped steps or assumed they knew what they were doing. The HSE prosecutions
                database is full of examples. Make it concrete and personal: &ldquo;If you skip
                proving dead and the circuit is live, you could be the one in the ambulance. Or
                worse, someone else could be.&rdquo;
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Construction Example: Rushing Safe Isolation
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  Chloe, a first-year apprentice, is confident and enthusiastic. She picks things up
                  quickly and is eager to work independently. One day, her mentor, Raj, observes her
                  beginning to work on a circuit without completing the full safe isolation
                  procedure &mdash; she has locked off at the distribution board but has not used
                  her voltage indicator to prove dead at the point of work.
                </p>
                <p className="text-sm text-white mb-3">
                  When Raj stops her, Chloe says: &ldquo;It is fine, I turned it off at the board. I
                  have done this loads of times.&rdquo;
                </p>
                <p className="text-sm text-white mb-3">
                  Raj does not shout or lecture. He says calmly: &ldquo;OK, let me ask you
                  something. What if someone has cross-connected that circuit from another board?
                  What if the neutral is shared with a live circuit on a different phase? Your
                  lock-off means nothing if the conductors are still energised from another source.
                  That is why we prove dead at the point of work, every single time. No
                  exceptions.&rdquo;
                </p>
                <p className="text-sm text-white">
                  He then shows Chloe a real incident report (anonymised) of an electrician who was
                  seriously burned because of a cross-connection that their lock-off did not protect
                  against. The evidence and the real-world consequence create the shift from
                  unconscious incompetence to conscious incompetence. Chloe never skips proving dead
                  again.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Repetitive Mistakes */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">03</span>
            Repetitive Mistakes &mdash; Skill Deficit or Motivational Deficit?
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                One of the most common frustrations in mentoring is the learner who keeps making the
                same mistake despite being shown the correct method multiple times. You have
                demonstrated cable labelling three times. You have watched them do it. They seemed
                to understand. And then next week, they are doing it wrong again. Before you lose
                your patience, you need to answer a critical question:{' '}
                <strong>is this a skill deficit or a motivational deficit?</strong>
              </p>

              <p>
                This distinction, which is fundamental to performance management in any industry,
                completely changes your response. The wrong diagnosis leads to the wrong
                intervention, which leads to continued failure and mounting frustration for both
                parties.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      S
                    </span>
                    <p className="text-sm font-medium text-rose-400">
                      Skill Deficit (Can&rsquo;t Do)
                    </p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    The learner does not have the knowledge or skill to perform the task correctly,
                    even if they wanted to.
                  </p>
                  <ul className="text-sm text-white space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Reteach using a different method or explanation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Break the task into smaller, more manageable steps</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Provide scaffolding: checklists, visual aids, job cards</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Allow more supervised practice before independence</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Consider whether a learning difficulty may be involved</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold flex-shrink-0">
                      M
                    </span>
                    <p className="text-sm font-medium text-white">
                      Motivational Deficit (Won&rsquo;t Do)
                    </p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    The learner has the knowledge and skill but chooses not to apply them
                    consistently.
                  </p>
                  <ul className="text-sm text-white space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>Explore barriers: why are they choosing not to do it?</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Connect the task to real consequences (safety, quality, reputation)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>Set clear expectations and accountability</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Explain the professional standard: this is what qualified electricians do
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>If the behaviour continues, move to formal processes</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Key Diagnostic Question:</strong> &ldquo;If
                  their life depended on getting this right, could they do it?&rdquo; If the answer
                  is yes &mdash; they have the knowledge and skill but are not applying them &mdash;
                  then it is a motivational deficit. If the answer is no &mdash; they genuinely
                  cannot do it even with maximum motivation &mdash; then it is a skill deficit. The
                  intervention for each is completely different.
                </p>
              </div>

              <p>
                Be aware that what looks like a motivational deficit is sometimes a skill deficit in
                disguise. An apprentice who &ldquo;cannot be bothered&rdquo; to label cables may
                actually have dyslexia and finds the labelling system confusing. An apprentice who
                &ldquo;keeps forgetting&rdquo; to test before energising may have ADHD and genuinely
                struggles with procedural memory under time pressure. Always consider whether there
                is an underlying reason before concluding that the issue is purely attitudinal.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Construction Example: Forgetting to Test Before Energising
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  Amir, a second-year apprentice, has been shown the correct procedure for
                  energising a new circuit: complete the installation, carry out initial
                  verification (insulation resistance, continuity, polarity), record the results,
                  and only then energise. But twice in the past month, his mentor has caught him
                  about to energise circuits without completing the testing.
                </p>
                <p className="text-sm text-white mb-3">
                  His mentor applies the diagnostic question: &ldquo;If Amir&rsquo;s life depended
                  on it, does he know the correct procedure?&rdquo; The answer is yes &mdash; Amir
                  can recite the procedure perfectly when asked. This is a motivational deficit:
                  Amir knows what to do but is cutting corners, probably because testing takes time
                  and he is under perceived pressure to keep up with the qualified electricians on
                  the team.
                </p>
                <p className="text-sm text-white">
                  The response is clear, firm, and consequence-focused: &ldquo;Amir, I know you know
                  the procedure because you just told me it. This is not about knowledge &mdash; it
                  is about discipline. If you energise a circuit with a fault on it because you
                  skipped the testing, you could damage equipment, injure someone, or burn the
                  building down. I need you to complete the full testing sequence every time,
                  without exception. If you are feeling pressured to rush, come and talk to me
                  &mdash; I would rather you took longer and did it safely than rushed and created a
                  dangerous situation.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: The Learner With Personal Problems */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">04</span>
            The Learner With Personal Problems
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Apprentices are human beings with lives outside of work, and those lives do not
                always go smoothly. Family breakdown, bereavement, financial stress, relationship
                problems, mental health difficulties, housing issues &mdash; all of these can have a
                profound impact on an apprentice&rsquo;s engagement, concentration, attendance, and
                performance. As a mentor, you will almost certainly encounter a learner going
                through a difficult personal period, and how you handle it matters enormously.
              </p>

              <p>
                The challenge is finding the right balance between{' '}
                <strong>support and accountability</strong>. Too much support without accountability
                creates dependency and teaches the apprentice that personal problems are an excuse
                for not meeting standards. Too much accountability without support creates
                resentment and damages the mentoring relationship. The goal is compassionate
                professionalism: you care about the person, and you maintain the standards of the
                trade.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    The Support-Accountability Balance
                  </p>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-white mb-1">
                      Listen without trying to fix
                    </p>
                    <p className="text-sm text-white">
                      Your role is to hear them, not to solve their problems. Sometimes an
                      apprentice just needs someone to acknowledge that things are tough. Resist the
                      urge to offer solutions or advice about their personal life &mdash; that is
                      not your role, and unsolicited advice rarely helps.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">
                      Adjust expectations temporarily
                    </p>
                    <p className="text-sm text-white">
                      Agree a defined period (perhaps two to four weeks) during which expectations
                      are slightly adjusted. This might mean more flexibility on timing, reduced
                      complexity of tasks, or extra patience with concentration lapses. But it must
                      be temporary and defined &mdash; not an open-ended reduction in standards.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">
                      Maintain core safety standards
                    </p>
                    <p className="text-sm text-white">
                      While you may adjust expectations around speed, complexity, or non-critical
                      quality standards, safety standards are non-negotiable. An apprentice going
                      through personal difficulties must still follow safe isolation procedures,
                      wear PPE, and work within their competence level. If their concentration is so
                      impaired that they are a safety risk, they should not be doing safety-critical
                      work.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">Know when to refer</p>
                    <p className="text-sm text-white">
                      You are a mentor, not a counsellor, therapist, or social worker. Recognise the
                      boundaries of your role. If the apprentice needs professional support,
                      signpost them to appropriate services: their GP, college wellbeing team, the
                      Construction Industry Helpline (0345 605 1956), the Samaritans (116 123), or
                      the Electrical Industries Charity.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Construction Example: Family Breakdown
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  Liam, a third-year apprentice who was previously performing well, has started
                  arriving late, leaving early, and his concentration on site has deteriorated
                  noticeably. His work quality has dropped, and he missed two college sessions last
                  month. His mentor, Karen, is concerned.
                </p>
                <p className="text-sm text-white mb-3">
                  Karen finds a quiet moment and says: &ldquo;Liam, I have noticed things have been
                  a bit different with you lately. Is everything alright? You do not have to tell me
                  anything you do not want to, but I want you to know I am here if you need to
                  talk.&rdquo;
                </p>
                <p className="text-sm text-white mb-3">
                  Liam reveals that his parents are going through a difficult divorce and he is
                  caught in the middle. He is not sleeping well and is struggling to concentrate.
                </p>
                <p className="text-sm text-white">
                  Karen responds: &ldquo;That sounds really tough, and I appreciate you telling me.
                  Here is what I suggest: for the next few weeks, let us keep you on tasks where you
                  can work at your own pace without safety-critical time pressure. I will square it
                  with the gaffer. But I need you to keep coming in, keep your attendance up, and
                  tell me if you are having a particularly bad day so I can plan around it. I also
                  want you to know about the Construction Industry Helpline &mdash; they offer free,
                  confidential support, and they understand the industry. Would you be open to
                  giving them a ring?&rdquo;
                </p>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Pastoral Care Boundaries:</strong> You must
                  never promise confidentiality unconditionally. If an apprentice discloses
                  something that suggests they or someone else is at risk of harm &mdash; suicidal
                  thoughts, self-harm, abuse, or safeguarding concerns &mdash; you have a duty to
                  act. Be upfront: &ldquo;I will keep what you tell me confidential wherever I can,
                  but if I think you or someone else is at risk, I will need to involve the right
                  people to help.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Generational Differences */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">05</span>
            Generational Differences
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The construction industry has always had apprentices and experienced workers
                learning from each other, but the generational gap in the 2020s feels wider than
                ever. A 50-year-old mentor who started their apprenticeship in the 1990s and a
                17-year-old apprentice starting today have grown up in fundamentally different
                worlds. Their expectations around communication, feedback, technology, work-life
                balance, and authority can be markedly different.
              </p>

              <p>
                It is important to avoid stereotyping. Not all older workers are technology-averse,
                and not all younger workers are glued to their phones. But there are genuine
                differences in how different generations tend to approach learning and work, and a
                good mentor recognises these without judging them.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Common Generational Differences in the Workplace
                  </p>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-white mb-1">Communication preferences</p>
                    <p className="text-sm text-white">
                      Younger workers often prefer digital communication (WhatsApp, messages) for
                      quick updates, while older workers may prefer face-to-face or phone calls.
                      Neither is wrong &mdash; the key is finding what works for your specific
                      mentoring relationship.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">Feedback frequency</p>
                    <p className="text-sm text-white">
                      Younger workers, who have grown up with instant feedback through social media
                      and gaming, often want more frequent feedback than older generations are
                      accustomed to giving. An annual review is not enough &mdash; they want to know
                      how they are doing now, today.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">Attitude to authority</p>
                    <p className="text-sm text-white">
                      Previous generations were more likely to accept &ldquo;do it because I said
                      so&rdquo; as sufficient reason. Many younger workers want to understand{' '}
                      <em>why</em> they are being asked to do something before they engage fully.
                      This is not disrespect &mdash; it is a different relationship with authority
                      that, when channelled correctly, can produce deeper understanding.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">Technology use</p>
                    <p className="text-sm text-white">
                      Younger apprentices may instinctively reach for YouTube or a reference app
                      when they need information, while older mentors may rely on memory,
                      experience, or physical reference books. Both approaches have value, and the
                      best outcome combines them.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                The most powerful bridge across generational differences is{' '}
                <strong>shared trade identity</strong>. Regardless of age, both mentor and
                apprentice share something fundamental: they are electricians. They take pride in
                neat wiring, in circuits that test first time, in installations that look
                professional. Connecting through this shared identity &mdash; &ldquo;We are both
                sparkies, and this is how sparkies do it&rdquo; &mdash; transcends age differences
                and creates common ground.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    The Reverse Mentoring Opportunity
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  Generational differences are not just challenges to overcome &mdash; they are
                  opportunities for mutual learning. The concept of{' '}
                  <strong>reverse mentoring</strong> recognises that the flow of knowledge does not
                  always go from older to younger. A younger apprentice can teach their mentor about
                  new apps, digital tools, social media marketing for the business, or new
                  approaches to learning. In return, the mentor shares decades of practical
                  experience, professional judgement, and trade wisdom that cannot be found in any
                  app.
                </p>
                <p className="text-sm text-white">
                  This reciprocal relationship builds mutual respect. When an apprentice sees that
                  their mentor values their knowledge in certain areas, they are more likely to
                  value the mentor&rsquo;s knowledge in return.
                </p>
              </div>

              <p>
                It is also worth noting that the generational gap can work in the other direction.
                With the rise of mature apprentices and career changers, you may find yourself as a
                younger mentor working with an older apprentice. A 25-year-old qualified electrician
                mentoring a 45-year-old career changer brings its own dynamics. The older learner
                has life experience, maturity, and transferable skills, but may lack confidence in a
                completely new field and may find it uncomfortable to be &ldquo;the beginner&rdquo;
                again. Respect their experience, acknowledge what they bring, and be patient with
                the adjustment period.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Key Principle:</strong> The best mentoring
                  relationships across generational differences are built on mutual respect, genuine
                  curiosity about each other&rsquo;s perspectives, and a shared commitment to the
                  trade. Avoid &ldquo;in my day&rdquo; comparisons and &ldquo;young people
                  today&rdquo; generalisations. Meet the person in front of you, not the stereotype
                  in your head.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Key Takeaways */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">06</span>
            Key Takeaways
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Difficult mentoring situations are not exceptions &mdash; they are the norm. Every
                mentor will encounter reluctant learners, overconfident learners, repetitive
                mistakes, personal crises, and generational misunderstandings. What separates a good
                mentor from a mediocre one is not the absence of these challenges, but the ability
                to respond to them thoughtfully, professionally, and with genuine care for the
                learner&rsquo;s development.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Key Takeaways</p>
                </div>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Reluctant learners:</strong> Always explore the root cause before
                      judging. The behaviour is a symptom &mdash; find the disease.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Overconfident learners:</strong> Use objective evidence to create the
                      shift from unconscious incompetence to conscious incompetence. In the
                      electrical trade, overconfidence can be fatal.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Repetitive mistakes:</strong> Distinguish between skill deficits
                      (reteach) and motivational deficits (address expectations and consequences).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Personal problems:</strong> Support with boundaries. Be a mentor, not
                      a counsellor. Adjust temporarily, maintain standards, and signpost
                      professional help.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Generational differences:</strong> Find common ground through shared
                      trade identity. Embrace reverse mentoring. Avoid stereotypes.
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                In the next section, we will explore how to maintain motivation and engagement over
                the long term &mdash; keeping your learner&rsquo;s drive alive through the
                inevitable plateaus, setbacks, and repetitive periods that are part of every
                apprenticeship.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <div className="flex items-start gap-2 mb-1">
                  <HelpCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <h3 className="text-sm font-medium text-white">{faq.question}</h3>
                </div>
                <p className="text-sm text-white leading-relaxed pl-6">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz title="Section 1 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../md-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 5
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../md-module-5-section-2">
              Maintaining Motivation &amp; Engagement
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
