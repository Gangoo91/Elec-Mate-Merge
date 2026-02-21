import {
  ArrowLeft,
  Radio,
  CheckCircle,
  AlertTriangle,
  Users,
  Volume2,
  FileText,
  Megaphone,
  Eye,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'mehrabian-scope',
    question: 'Mehrabian\u2019s 7-38-55 rule applies to which specific type of communication?',
    options: [
      'All verbal communication',
      'Technical briefings and instructions',
      'Communication of feelings and attitudes when the message is incongruent',
      'Written communication only',
    ],
    correctIndex: 2,
    explanation:
      'Mehrabian\u2019s research specifically studied the communication of feelings and attitudes (like/dislike) when the verbal message contradicted the nonverbal signals. It was never intended to describe all communication. Stating that \u201c93% of communication is nonverbal\u201d is a widely circulated misquotation.',
  },
  {
    id: 'soler-model',
    question: 'In Gerard Egan\u2019s SOLER model, what does the \u201cL\u201d stand for?',
    options: [
      'Listen actively',
      'Lean forward slightly',
      'Look directly at the speaker',
      'Lower your voice',
    ],
    correctIndex: 1,
    explanation:
      'The \u201cL\u201d in SOLER stands for \u201cLean forward slightly\u201d. This conveys interest and engagement. The full model is: Sit squarely, Open posture, Lean forward, Eye contact, Relax. It was developed by Gerard Egan as a framework for effective nonverbal attending behaviour.',
  },
  {
    id: 'written-vs-verbal',
    question: 'When should you choose written communication over verbal on a construction site?',
    options: [
      'When you want a quick, informal chat',
      'When the information needs a permanent, traceable record',
      'When discussing someone\u2019s personal problems',
      'When giving immediate safety warnings',
    ],
    correctIndex: 1,
    explanation:
      'Written communication should be used when you need a permanent, traceable record \u2014 such as variation orders, method statements, safety inspection reports, or instructions that must be followed precisely. Verbal communication is better for immediate safety warnings, sensitive conversations, and quick coordination.',
  },
];

const faqs = [
  {
    question: 'Is the Mehrabian 7-38-55 rule really that widely misquoted?',
    answer:
      'Yes \u2014 it is arguably the most misquoted research finding in the entire field of communication. Mehrabian himself has publicly stated that his findings have been overgeneralised. His research studied a very narrow context: when someone says one thing but their tone and body language suggest the opposite (incongruent messages about feelings). It does not mean that 93% of all communication is nonverbal. If that were true, you could learn any foreign language simply by watching people speak it. The words you choose matter enormously, especially for technical instructions, safety briefings, and written documentation on site.',
  },
  {
    question: 'How can I improve my body language when speaking with clients?',
    answer:
      'Start with Gerard Egan\u2019s SOLER model: face the client squarely, maintain an open posture (uncrossed arms), lean slightly forward to show engagement, maintain comfortable eye contact without staring, and consciously relax your body. In a construction context, also consider removing safety glasses or pulling down a face covering when having an important conversation \u2014 clients need to see your face to build trust. Stand at the same level as them rather than looking down from scaffolding or up from a trench. These small adjustments signal respect and professionalism.',
  },
  {
    question:
      'When should I put instructions in writing rather than just telling someone verbally?',
    answer:
      'Use written communication whenever the information needs to be traceable, precise, or referenced later. This includes variation orders, changes to specifications, safety method statements, permit-to-work conditions, snagging lists, and any instruction where misunderstanding could cause safety risk or financial loss. A good rule of thumb in construction: if it matters enough to argue about later, it matters enough to write down. Verbal instructions are fine for routine coordination, quick updates, and situations requiring immediate action \u2014 but always follow up important verbal instructions with written confirmation.',
  },
  {
    question: 'What is paralinguistics and why does it matter on site?',
    answer:
      'Paralinguistics refers to the vocal elements of speech beyond the words themselves \u2014 tone, pitch, pace, volume, pauses, and silence. These vocal cues carry significant meaning. On a construction site, paralinguistics matter because the same words delivered differently create completely different outcomes. \u201cStop what you\u2019re doing\u201d said calmly during a briefing means something very different from the same words shouted urgently on a live site. Your tone during a safety briefing determines whether workers take it seriously or tune out. Learning to modulate your voice \u2014 slowing down for important points, pausing for emphasis, raising volume for urgency \u2014 makes you a more effective communicator.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Mehrabian\u2019s 7-38-55 research found that when verbal and nonverbal messages are incongruent, the listener relies most heavily on which channel?',
    options: [
      'The actual words spoken (7%)',
      'Tone of voice (38%)',
      'Body language and facial expressions (55%)',
      'Written follow-up communication',
    ],
    correctAnswer: 2,
    explanation:
      'In Mehrabian\u2019s research on incongruent messages about feelings and attitudes, body language and facial expressions accounted for 55% of the message received, tone of voice for 38%, and the actual words for only 7%. This applies only to this specific context \u2014 not to all communication.',
  },
  {
    id: 2,
    question: 'Which of the following statements about Mehrabian\u2019s research is CORRECT?',
    options: [
      '93% of all communication is nonverbal',
      'Words do not matter in face-to-face communication',
      'The research only applies to communication of feelings and attitudes with incongruent signals',
      'Body language is always more important than words in every situation',
    ],
    correctAnswer: 2,
    explanation:
      'Mehrabian\u2019s research specifically studied the communication of feelings and attitudes when verbal and nonverbal signals contradicted each other. It was never intended to describe all communication. The claim that \u201c93% of communication is nonverbal\u201d is a widespread misquotation that Mehrabian himself has corrected.',
  },
  {
    id: 3,
    question: 'What does the \u201cS\u201d in Egan\u2019s SOLER model stand for?',
    options: [
      'Speak clearly',
      'Sit squarely (face the person)',
      'Stay silent until they finish',
      'Show empathy through words',
    ],
    correctAnswer: 1,
    explanation:
      'The \u201cS\u201d in SOLER stands for \u201cSit squarely\u201d \u2014 positioning yourself to face the other person directly. This communicates that you are giving them your full attention. On a construction site, this means turning your whole body towards the person speaking rather than continuing to work while they talk.',
  },
  {
    id: 4,
    question: 'Which paralinguistic element is MOST important during a site safety briefing?',
    options: [
      'Speaking as quickly as possible to save time',
      'Using a monotone voice to sound professional',
      'Varying tone, pace, and volume to emphasise critical safety points',
      'Speaking as quietly as possible so only those nearby can hear',
    ],
    correctAnswer: 2,
    explanation:
      'During a safety briefing, varying your tone, pace, and volume helps emphasise critical points and keeps the audience engaged. Slowing down for important warnings, raising your volume for key hazards, and pausing after critical information gives workers time to absorb the message. A monotone delivery causes people to tune out \u2014 dangerous when lives are at stake.',
  },
  {
    id: 5,
    question:
      'An electrician tells a client \u201cYes, the job is going fine\u201d while avoiding eye contact, crossing their arms, and speaking in a flat tone. According to Mehrabian\u2019s research, the client is most likely to:',
    options: [
      'Believe the words because they are reassuring',
      'Trust the nonverbal signals and suspect something is wrong',
      'Ignore both and form their own opinion based on the work quality',
      'Ask for written confirmation',
    ],
    correctAnswer: 1,
    explanation:
      'This is exactly the type of incongruent communication Mehrabian studied. When words say one thing but body language and tone say another, listeners trust the nonverbal signals. The client will pick up on the avoidance, closed posture, and flat tone and suspect the job is not going as well as the electrician claims.',
  },
  {
    id: 6,
    question:
      'Which of the following is the BEST reason to use written communication on a construction site?',
    options: [
      'It is faster than speaking face to face',
      'It avoids the need for body language',
      'It creates a permanent, traceable record that can be referenced later',
      'It is less likely to be misunderstood than speech',
    ],
    correctAnswer: 2,
    explanation:
      'The primary advantage of written communication on a construction site is that it creates a permanent, traceable record. This is essential for variation orders, safety instructions, inspection reports, and any information that may need to be referenced later or used as evidence. Written communication is not necessarily faster or less prone to misunderstanding \u2014 but its traceability is invaluable.',
  },
  {
    id: 7,
    question: 'In the SOLER model, why is \u201cRelax\u201d included as the final element?',
    options: [
      'Because relaxed people speak more quietly',
      'Because tension in your body is visible and can make the other person feel uncomfortable or guarded',
      'Because relaxation improves your technical knowledge',
      'Because you should always be casual in professional settings',
    ],
    correctAnswer: 1,
    explanation:
      'Tension in your body is visible to others and can create a sense of unease. If you are rigid, fidgeting, or visibly tense, the other person may feel uncomfortable or guarded, which undermines the rapport you are trying to build. Relaxing does not mean being casual \u2014 it means being naturally at ease so the other person feels safe to communicate openly.',
  },
  {
    id: 8,
    question:
      'A site supervisor needs to instruct a team about a change to the isolation procedure. Which communication approach is MOST appropriate?',
    options: [
      'Send a text message to the group chat',
      'Mention it casually in passing to whoever is nearby',
      'Deliver a verbal briefing to the full team and follow up with a written method statement amendment',
      'Pin a note to the site notice board and assume everyone will read it',
    ],
    correctAnswer: 2,
    explanation:
      'Safety-critical changes like isolation procedure amendments require both verbal and written communication. A face-to-face briefing ensures everyone hears the information, allows questions, and lets the supervisor use tone and emphasis to stress critical points. The written follow-up creates a traceable record and a reference document. Neither channel alone is sufficient for safety-critical information.',
  },
];

export default function CCModule1Section2() {
  useSEO({
    title: 'Verbal, Nonverbal & Written Channels | CC Module 1.2',
    description:
      'Mehrabian 7-38-55 rule correctly contextualised, Gerard Egan SOLER model for body language, paralinguistics, choosing between written and verbal communication in construction.',
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
            <Link to="../cc-module-1">
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
            <Radio className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 1 &middot; SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Verbal, Nonverbal &amp; Written Channels
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Understanding the three communication channels, when to use each one, and why the most
            commonly cited statistic in communication training is wrong
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Three channels:</strong> verbal (words), nonverbal (body language), written
                (documents)
              </li>
              <li>
                <strong>Mehrabian 7-38-55:</strong> applies ONLY to feelings/attitudes with
                incongruent signals
              </li>
              <li>
                <strong>Key model:</strong> Egan&rsquo;s SOLER &mdash; five nonverbal attending
                behaviours
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Safety:</strong> Wrong channel = missed warnings, lost records,
                misunderstood instructions
              </li>
              <li>
                <strong>Clients:</strong> Your body language builds or destroys trust in seconds
              </li>
              <li>
                <strong>Traceability:</strong> Knowing when to write it down protects you and your
                team
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Explain the three communication channels and their characteristics',
              'Accurately describe Mehrabian\u2019s 7-38-55 rule and its correct scope of application',
              'Apply Gerard Egan\u2019s SOLER model to construction interactions',
              'Identify how paralinguistic features (tone, pitch, pace, volume, silence) affect meaning',
              'Choose the appropriate channel (verbal, written, or both) for common site situations',
              'Recognise when verbal and nonverbal signals are incongruent and how to respond',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: The Three Communication Channels */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">01</span>
            The Three Communication Channels
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Every message you send &mdash; whether to a client, a colleague, an apprentice, or a
                project manager &mdash; travels through one or more of three distinct channels:{' '}
                <strong>verbal</strong> (the words you choose), <strong>nonverbal</strong> (your
                body language, facial expressions, gestures, posture and physical behaviour), and{' '}
                <strong>written</strong> (emails, text messages, method statements, site reports and
                documentation).
              </p>

              <p>
                Each channel has different strengths, different weaknesses, and different situations
                where it is the most effective choice. Skilled communicators do not rely on a single
                channel &mdash; they select and combine channels deliberately based on the
                situation, the audience, and the importance of the message.
              </p>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Megaphone className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">Verbal (Words)</p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    The actual words you speak. Verbal communication is immediate, allows for
                    instant feedback, and can be adapted on the spot based on the listener&rsquo;s
                    response.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">Best for:</strong> Quick coordination,
                      immediate safety warnings, sensitive conversations, building rapport, toolbox
                      talks
                    </p>
                  </div>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">Nonverbal (Body)</p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    Facial expressions, eye contact, posture, gestures, proximity, touch, and
                    physical behaviour. Nonverbal signals are continuous &mdash; you cannot
                    &ldquo;stop&rdquo; communicating nonverbally.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">Best for:</strong> Conveying attitude,
                      showing engagement, building trust, signalling urgency, demonstrating
                      confidence or authority
                    </p>
                  </div>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">Written (Documents)</p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    Emails, texts, method statements, drawings, reports, permit-to-work
                    documentation, snagging lists, and formal correspondence. Written communication
                    creates a permanent, retrievable record.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">Best for:</strong> Traceability, precision,
                      complex instructions, legal protection, information that must be referenced
                      later
                    </p>
                  </div>
                </div>
              </div>

              <p>
                In construction, you will typically use all three channels every day. A site
                supervisor might give a verbal briefing at the start of the day (verbal), use
                authoritative posture and eye contact to emphasise key safety points (nonverbal),
                and then issue an updated method statement for the team to sign (written). The skill
                lies in knowing which channel &mdash; or combination of channels &mdash; is right
                for each situation.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: Mehrabian 7-38-55 Rule */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">02</span>
            Mehrabian&rsquo;s 7-38-55 Rule &mdash; What It Actually Means
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                If you have ever attended a communication training course, you have almost certainly
                heard this claim: <em>&ldquo;93% of communication is nonverbal.&rdquo;</em> It is
                quoted in management books, training materials, TED talks, and HR presentations. It
                is also <strong>wrong</strong> &mdash; or at least, it is a gross oversimplification
                of what the original research actually found.
              </p>

              <p>
                The statistic comes from two studies published in 1967 by{' '}
                <strong>Professor Albert Mehrabian</strong> at the University of California, Los
                Angeles (UCLA). In these experiments, Mehrabian investigated how people interpret{' '}
                <strong>inconsistent</strong> messages about <strong>feelings and attitudes</strong>{' '}
                &mdash; specifically, messages where the words said one thing but the tone of voice
                and facial expression said something different.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">The Finding:</strong> When someone communicates
                  a <strong>feeling or attitude</strong> (such as liking or disliking), and the
                  verbal message <strong>contradicts</strong> the nonverbal signals, the listener
                  gives weight to the message as follows:
                </p>
                <div className="grid grid-cols-3 gap-3 mt-3">
                  <div className="text-center">
                    <p className="text-2xl sm:text-3xl font-bold text-rose-400">7%</p>
                    <p className="text-xs text-white mt-1">Words spoken</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl sm:text-3xl font-bold text-rose-400">38%</p>
                    <p className="text-xs text-white mt-1">Tone of voice</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl sm:text-3xl font-bold text-rose-400">55%</p>
                    <p className="text-xs text-white mt-1">
                      Body language &amp; facial expressions
                    </p>
                  </div>
                </div>
              </div>

              {/* CRITICAL WARNING BOX */}
              <div className="bg-amber-500/10 border-2 border-amber-500/40 p-5 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-6 w-6 text-amber-400" />
                  <p className="text-base font-bold text-amber-400">
                    Critical Accuracy Warning: The Most Misquoted Research in Communication
                  </p>
                </div>
                <div className="space-y-3 text-sm text-white">
                  <p>
                    Mehrabian&rsquo;s 7-38-55 split applies <strong>ONLY</strong> under these
                    specific conditions:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        The communication is about <strong>feelings and attitudes</strong>{' '}
                        (like/dislike, approval/disapproval) &mdash; not factual information
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        The verbal and nonverbal messages are <strong>incongruent</strong>{' '}
                        (contradictory) &mdash; the words say one thing but the tone and body
                        language say something different
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        The original experiments used <strong>single words</strong> spoken with
                        different tones and shown with different facial expressions &mdash; not
                        natural conversation
                      </span>
                    </li>
                  </ul>
                  <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded mt-3">
                    <p className="text-sm text-white">
                      <strong className="text-amber-400">Mehrabian himself has said:</strong>{' '}
                      <em>
                        &ldquo;Unless a communicator is talking about their feelings or attitudes,
                        these equations are not applicable.&rdquo;
                      </em>{' '}
                      He has also stated that he is <em>&ldquo;obviously uncomfortable&rdquo;</em>{' '}
                      with the way his findings have been overgeneralised.
                    </p>
                  </div>
                  <p className="font-medium text-amber-400 mt-2">
                    Saying &ldquo;93% of communication is nonverbal&rdquo; is factually incorrect.
                    Do not repeat it. If you hear it on a training course, you now know better.
                  </p>
                </div>
              </div>

              <p>
                So what <em>does</em> the research tell us that is useful? It tells us something
                very important:{' '}
                <strong>
                  when your words and your body language contradict each other, people trust the
                  body language
                </strong>
                . This has enormous implications for construction professionals.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Construction Example: Incongruent Messages
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0">
                      !
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">
                        &ldquo;Yeah, the job&rsquo;s going fine&rdquo;
                      </p>
                      <p className="text-sm text-white">
                        Said while avoiding eye contact, shifting weight from foot to foot, arms
                        crossed tightly. The client hears the words, but trusts the body language
                        &mdash; and concludes something is wrong.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0">
                      !
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">
                        &ldquo;I&rsquo;m not angry about the design change&rdquo;
                      </p>
                      <p className="text-sm text-white">
                        Said through clenched teeth, with flushed cheeks and a tight jaw. Everyone
                        on site knows this person is angry, regardless of what they claim.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-green-500/20 text-green-400 text-xs font-bold flex-shrink-0">
                      &#10003;
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">
                        &ldquo;I understand your concern, and here&rsquo;s how we&rsquo;re
                        addressing it&rdquo;
                      </p>
                      <p className="text-sm text-white">
                        Said with open posture, steady eye contact, a calm voice, and a slight
                        forward lean. The words and the body language align &mdash; the client
                        believes the message and feels reassured.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                The practical lesson is not that words do not matter &mdash; they absolutely do. The
                lesson is that your words and your nonverbal signals must be{' '}
                <strong>congruent</strong>. When they match, your message is powerful and credible.
                When they contradict, people believe the body language and doubt the words. This is
                Mehrabian&rsquo;s real contribution to communication science, and it is directly
                applicable to every interaction you have on site.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Egan's SOLER Model */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">03</span>
            Gerard Egan&rsquo;s SOLER Model for Body Language
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                If Mehrabian tells us <em>why</em> body language matters, Gerard Egan tells us{' '}
                <em>what to do about it</em>. Egan, an American psychologist and professor at Loyola
                University Chicago, developed the <strong>SOLER model</strong> as a practical
                framework for effective nonverbal communication. Originally designed for counselling
                settings, SOLER has become one of the most widely taught body language frameworks in
                professional communication training.
              </p>

              <p>
                SOLER describes five nonverbal behaviours that communicate attentiveness, respect
                and genuine interest. When you adopt these behaviours consistently, the other person
                feels heard, valued and safe to communicate openly &mdash; whether that person is a
                client, a colleague, an apprentice, or a site manager.
              </p>

              <div className="space-y-3">
                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-rose-500/20 text-rose-400 text-base font-bold flex-shrink-0">
                      S
                    </span>
                    <p className="text-base font-medium text-rose-400">
                      Sit Squarely (Face the Person)
                    </p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    Position yourself so that you are facing the other person directly. This does
                    not have to be perfectly square-on &mdash; a slight angle can feel less
                    confrontational &mdash; but your body should be oriented towards them, not
                    turned away.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">On site:</strong> When an apprentice comes
                      to you with a question, stop what you are doing and turn your body to face
                      them. Continuing to work while they talk signals that they are not important
                      enough for your attention.
                    </p>
                  </div>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-rose-500/20 text-rose-400 text-base font-bold flex-shrink-0">
                      O
                    </span>
                    <p className="text-base font-medium text-rose-400">Open Posture</p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    Keep your arms and legs uncrossed. An open posture signals receptiveness and
                    approachability. Crossed arms, clenched fists, or turning away create a physical
                    barrier that tells the other person you are closed off, defensive, or
                    uninterested.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">On site:</strong> During a client
                      walk-through, keep your hands visible and relaxed &mdash; by your sides or
                      gesturing naturally. Avoid the classic &ldquo;arms folded across chest&rdquo;
                      stance that many tradespeople default to. It may feel comfortable, but it
                      looks defensive to a client.
                    </p>
                  </div>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-rose-500/20 text-rose-400 text-base font-bold flex-shrink-0">
                      L
                    </span>
                    <p className="text-base font-medium text-rose-400">Lean Forward Slightly</p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    A slight forward lean communicates engagement and interest. Leaning back
                    suggests disengagement or disinterest. The lean does not need to be dramatic
                    &mdash; a subtle shift forward of a few centimetres is enough to signal that you
                    are actively listening and involved in the conversation.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">On site:</strong> When a colleague is
                      explaining a problem they have encountered with a circuit, lean in slightly to
                      look at what they are showing you. This physical engagement tells them you are
                      taking their concern seriously.
                    </p>
                  </div>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-rose-500/20 text-rose-400 text-base font-bold flex-shrink-0">
                      E
                    </span>
                    <p className="text-base font-medium text-rose-400">Eye Contact</p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    Maintain comfortable, natural eye contact. This does not mean staring &mdash;
                    that can feel aggressive or intimidating. It means looking at the person while
                    they speak, occasionally glancing away naturally, and re-establishing eye
                    contact at key moments. Good eye contact shows you are present and attentive.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">On site:</strong> When giving a safety
                      briefing, make eye contact with different members of the team as you cover
                      each point. If you stare at the floor or at your clipboard, workers will
                      disengage. If you wear safety glasses, remove them for important one-to-one
                      conversations so the other person can see your eyes.
                    </p>
                  </div>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-rose-500/20 text-rose-400 text-base font-bold flex-shrink-0">
                      R
                    </span>
                    <p className="text-base font-medium text-rose-400">Relax</p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    Be naturally at ease. Tension in your body is visible to others and can make
                    them feel uncomfortable or guarded. Fidgeting, tapping, checking your phone, or
                    looking around the room all signal that you are distracted or anxious. Relaxing
                    does not mean being casual or lazy &mdash; it means being calm, composed and
                    present.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">On site:</strong> When a client raises a
                      complaint about the work, resist the urge to tense up, cross your arms, or
                      look away. Consciously relax your shoulders, keep your posture open, and
                      breathe steadily. Your calm body language will help de-escalate the situation
                      even before you speak.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  SOLER in Practice: A Client Meeting
                </p>
                <p className="text-sm text-white">
                  Imagine you are meeting a homeowner to discuss additional work they want on a
                  rewire project. Apply SOLER: face them directly (S), keep your arms uncrossed with
                  your notebook visible (O), lean slightly towards the kitchen table where you are
                  both seated (L), maintain natural eye contact while they explain what they want
                  (E), and keep your body relaxed and your voice steady (R). The homeowner feels
                  respected, heard, and confident that you are a professional. This is how body
                  language builds trust &mdash; without saying a single word about your
                  qualifications.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Paralinguistics */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">04</span>
            Paralinguistics: How You Say It
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Paralinguistics sits between verbal and nonverbal communication. It refers to the
                vocal elements of speech <strong>beyond the words themselves</strong> &mdash; the
                way you say something rather than what you say. Paralinguistic features include{' '}
                <strong>tone</strong>, <strong>pitch</strong>, <strong>pace</strong>,{' '}
                <strong>volume</strong>, <strong>pauses</strong>, and <strong>silence</strong>.
                These vocal cues carry enormous meaning and can completely change the impact of the
                same words.
              </p>

              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Volume2 className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">Tone</p>
                  </div>
                  <p className="text-sm text-white">
                    The emotional quality of your voice. A warm, steady tone conveys confidence and
                    approachability. A sharp, clipped tone conveys irritation or impatience. On
                    site, your tone during a toolbox talk determines whether workers engage with the
                    safety message or mentally switch off. A condescending tone when correcting an
                    apprentice can damage the relationship for months.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Volume2 className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">Pitch</p>
                  </div>
                  <p className="text-sm text-white">
                    How high or low your voice is. A rising pitch at the end of a statement can make
                    it sound like a question, undermining your authority. A steady, measured pitch
                    conveys certainty. When giving instructions, a level pitch tells people you know
                    what you are talking about. When asking a genuine question, a slight rise is
                    natural and expected.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Volume2 className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">Pace</p>
                  </div>
                  <p className="text-sm text-white">
                    How fast or slow you speak. Rushing through important information suggests
                    nervousness or a lack of importance. Slowing down for critical points gives the
                    listener time to process and signals that this particular point matters. During
                    a safety briefing, slow down when covering the highest-risk activities. Speed up
                    for routine logistical details to keep the briefing from dragging.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Volume2 className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">Volume</p>
                  </div>
                  <p className="text-sm text-white">
                    How loud or quiet you speak. Volume must match the environment and the message.
                    On a noisy construction site, you need to project clearly. During a one-to-one
                    conversation about a sensitive issue, dropping your volume creates privacy and
                    intimacy. Shouting when not necessary is aggressive; speaking too quietly on a
                    busy site is ineffective and potentially dangerous.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Volume2 className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">Pauses &amp; Silence</p>
                  </div>
                  <p className="text-sm text-white">
                    Perhaps the most underused paralinguistic tool. A deliberate pause after a key
                    point gives people time to absorb the information. Silence after asking a
                    question creates space for the other person to think and respond honestly. Many
                    people rush to fill silence because it feels uncomfortable &mdash; but skilled
                    communicators use silence as a tool. After delivering a critical safety warning,
                    a two-second pause is more powerful than immediately moving on.
                  </p>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Construction Example: The Safety Briefing
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  Compare two approaches to delivering the same safety message:
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
                    <p className="text-xs font-medium text-red-400 mb-2">
                      Ineffective Paralinguistics
                    </p>
                    <ul className="text-sm text-white space-y-1">
                      <li>Monotone delivery throughout</li>
                      <li>Rushes through all points at the same speed</li>
                      <li>No pauses between sections</li>
                      <li>Volume stays the same regardless of importance</li>
                      <li>Workers disengage within 30 seconds</li>
                    </ul>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-lg">
                    <p className="text-xs font-medium text-green-400 mb-2">
                      Effective Paralinguistics
                    </p>
                    <ul className="text-sm text-white space-y-1">
                      <li>Tone varies &mdash; warm for welcome, serious for hazards</li>
                      <li>Slows down for high-risk activities, speeds up for routine items</li>
                      <li>Pauses after each critical warning to let it land</li>
                      <li>Raises volume slightly for the most important safety point</li>
                      <li>Workers remember the key hazards after the briefing</li>
                    </ul>
                  </div>
                </div>
              </div>

              <p>
                Paralinguistics is the reason why the same set of words can inspire confidence or
                create panic, motivate a team or bore them rigid, reassure a client or make them
                more anxious. Developing awareness of your own vocal patterns &mdash; and learning
                to modulate them deliberately &mdash; is one of the most practical communication
                skills you can build.
              </p>
            </div>
          </div>
        </section>

        {/* Section 05: Written vs Spoken */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">05</span>
            Written vs Spoken: Choosing the Right Channel
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                One of the most common communication mistakes on construction sites is using the
                wrong channel for the message. Verbal instructions are fast and flexible, but they
                leave no record and can be misremembered. Written instructions create a permanent
                record and can be referenced repeatedly, but they lack the tone, emphasis and
                immediate feedback of face-to-face conversation. Knowing when to speak and when to
                write &mdash; and when to do both &mdash; is a critical skill.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg overflow-x-auto">
                <p className="text-sm font-medium text-white mb-3">
                  Channel Selection Guide for Construction
                </p>
                <div className="space-y-2 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 pb-2 border-b border-white/5">
                    <span className="text-xs font-semibold text-rose-400 sm:w-40 flex-shrink-0">
                      Situation
                    </span>
                    <span className="text-xs font-semibold text-rose-400 flex-1">
                      Recommended Channel
                    </span>
                  </div>
                  {[
                    {
                      situation: 'Immediate safety warning',
                      channel:
                        'Verbal (shout if necessary) \u2014 speed is critical; follow up in writing',
                    },
                    {
                      situation: 'Variation order / scope change',
                      channel:
                        'Written (email or formal variation) \u2014 must be traceable for commercial protection',
                    },
                    {
                      situation: 'Toolbox talk / daily briefing',
                      channel:
                        'Verbal delivery with written sign-off sheet \u2014 combines engagement with record-keeping',
                    },
                    {
                      situation: 'Correcting an apprentice\u2019s technique',
                      channel:
                        'Verbal, face to face \u2014 allows for demonstration, questions, and supportive tone',
                    },
                    {
                      situation: 'Reporting a near miss',
                      channel:
                        'Written report \u2014 must be documented for RIDDOR compliance and site safety records',
                    },
                    {
                      situation: 'Discussing a colleague\u2019s personal difficulties',
                      channel:
                        'Verbal, private, one to one \u2014 sensitive conversations need tone, empathy, and confidentiality',
                    },
                    {
                      situation: 'Issuing a permit to work',
                      channel:
                        'Written permit with verbal briefing \u2014 the permit is the legal document; the briefing ensures understanding',
                    },
                    {
                      situation: 'Coordinating with other trades in a ceiling void',
                      channel:
                        'Verbal on the spot, confirmed by email or WhatsApp message \u2014 immediate coordination plus a record',
                    },
                  ].map((row, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 pb-2 border-b border-white/5 last:border-0"
                    >
                      <span className="text-sm font-medium text-white sm:w-40 flex-shrink-0">
                        {row.situation}
                      </span>
                      <span className="text-sm text-white flex-1">{row.channel}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">The Golden Rule:</strong> If it matters enough
                  to argue about later, it matters enough to write down. Verbal agreements about
                  scope changes, additional work, or programme adjustments are the source of the
                  majority of commercial disputes in construction. Protect yourself and your team by
                  confirming important verbal discussions in writing &mdash; even a quick email or
                  text message saying <em>&ldquo;Just to confirm what we agreed&hellip;&rdquo;</em>{' '}
                  is significantly better than relying on memory alone.
                </p>
              </div>

              <p>
                Notice that many situations call for <strong>both</strong> channels. A toolbox talk
                is delivered verbally (for engagement, emphasis and questions) but recorded on a
                sign-off sheet (for traceability). A variation order should be discussed verbally
                (for context and agreement) but documented in writing (for contractual protection).
                The most effective communicators use channels in combination, playing to the
                strengths of each.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06: Putting It All Together */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">06</span>
            Putting It All Together on Site
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Understanding the three channels, Mehrabian&rsquo;s real finding, the SOLER model,
                and paralinguistics gives you a comprehensive toolkit for communication. But
                knowledge only becomes useful when you apply it. Here is how these concepts come
                together in everyday construction scenarios.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Scenario 1: Delivering a Safety Briefing
                  </p>
                </div>
                <div className="space-y-2 text-sm text-white">
                  <p>
                    You are the site supervisor delivering a morning briefing about working near
                    live services.
                  </p>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Verbal:</strong> Choose clear, direct words.
                        &ldquo;Today we are working near live services. Nobody touches anything
                        until isolation is confirmed.&rdquo;
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Paralinguistics:</strong> Slow down for the
                        critical warning. Pause after &ldquo;Nobody touches anything.&rdquo; Raise
                        your volume slightly for the word &ldquo;live.&rdquo;
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Nonverbal (SOLER):</strong> Face the team
                        squarely, open posture, scan the group making eye contact with each person,
                        stand tall and relaxed.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Written:</strong> Issue the updated method
                        statement and have everyone sign the briefing attendance sheet.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Scenario 2: Handling a Client Complaint
                  </p>
                </div>
                <div className="space-y-2 text-sm text-white">
                  <p>
                    A homeowner is unhappy with the position of new sockets in their kitchen
                    extension.
                  </p>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Nonverbal (SOLER):</strong> Remove your
                        safety glasses. Face the client. Open posture &mdash; no crossed arms. Lean
                        slightly forward. Maintain eye contact. Consciously relax, even if you feel
                        defensive.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Verbal:</strong> &ldquo;I can see this
                        isn&rsquo;t what you expected. Let me understand exactly what you&rsquo;d
                        like, and we&rsquo;ll work out the best solution.&rdquo;
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Paralinguistics:</strong> Warm, steady tone.
                        Measured pace. Avoid sighing, tutting, or any vocal signals of irritation.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Written:</strong> After agreeing the changes,
                        confirm them in writing: &ldquo;Following our conversation today, the socket
                        positions will be amended as follows&hellip;&rdquo;
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Scenario 3: Giving Feedback to an Apprentice
                  </p>
                </div>
                <div className="space-y-2 text-sm text-white">
                  <p>
                    You need to correct an apprentice who has been terminating cables incorrectly.
                  </p>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Nonverbal (SOLER):</strong> Move to where
                        they are working rather than shouting across the room. Get to their level
                        physically &mdash; crouch down if they are working low. Open posture.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Verbal:</strong> &ldquo;Let me show you a
                        better way to do this. The way you&rsquo;ve done it will work, but this
                        method gives a more reliable connection.&rdquo;
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Paralinguistics:</strong> Calm, supportive
                        tone &mdash; not condescending or impatient. Normal volume &mdash; do not
                        broadcast their mistake to the whole site. Steady pace.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Written:</strong> Not needed for routine
                        technique corrections. Save written records for formal assessments and
                        progress reviews.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Key Takeaway</p>
                </div>
                <p className="text-sm text-white mb-3">
                  Effective communication is not about mastering a single channel &mdash; it is
                  about using all three channels deliberately and ensuring they are aligned. When
                  your words, your body language, your tone, and your written records all send the
                  same message, you communicate with clarity, credibility and professionalism.
                </p>
                <ul className="text-sm text-white space-y-1">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>Mehrabian: ensure your verbal and nonverbal signals are congruent</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>SOLER: adopt attending behaviours that show genuine engagement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Paralinguistics: modulate tone, pace and volume to match the message
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Channel selection: match the channel to the situation and use both when needed
                    </span>
                  </li>
                </ul>
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
            <Link to="../cc-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 1
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cc-module-1-section-3">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
