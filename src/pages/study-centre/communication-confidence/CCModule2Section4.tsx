import { ArrowLeft, AlertTriangle, CheckCircle, Heart, Globe, Shield, Ear } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'empathetic-listening-pressure',
    question:
      'A homeowner is visibly upset because an electrical fault caused a small fire in their kitchen. They are speaking rapidly, repeating themselves, and becoming increasingly agitated. According to Covey&rsquo;s empathetic listening approach, what should you do FIRST?',
    options: [
      'Immediately explain what likely caused the fault and how you will fix it',
      'Listen without interrupting, acknowledge their feelings, and reflect back what you hear before discussing technical details',
      'Ask them to calm down so you can concentrate on diagnosing the fault',
      'Hand them a complaints form and tell them to put it in writing',
    ],
    correctIndex: 1,
    explanation:
      'Covey&rsquo;s empathetic listening means seeking first to understand before being understood. When someone is emotionally distressed, they need to feel heard before they can process technical information. Acknowledge their feelings (&ldquo;I can see this has been really frightening for you&rdquo;), reflect back what you hear, and only move to diagnosis and solutions once they feel understood. Jumping straight to technical explanations or asking them to calm down dismisses their emotional state and escalates the situation.',
  },
  {
    id: 'conscious-listening-noise',
    question:
      'You are receiving safety-critical instructions from a site supervisor about live working procedures near a high-voltage switchboard. A generator is running nearby and other trades are working loudly. Applying Julian Treasure&rsquo;s conscious listening principles, what is the BEST approach?',
    options: [
      'Nod along and figure out the details once you get to the switchboard',
      'Ask the supervisor to move to a quieter location, give full attention, and repeat the instructions back to confirm understanding',
      'Record the conversation on your phone so you can listen again later',
      'Ask a colleague to listen as well so they can fill in anything you miss',
    ],
    correctIndex: 1,
    explanation:
      'Treasure&rsquo;s RASA model (Receive, Appreciate, Summarise, Ask) requires you to actively create the conditions for conscious listening. For safety-critical instructions, this means removing environmental barriers first (move somewhere quieter), giving your full undivided attention (Receive), showing you are engaged (Appreciate), summarising what you heard back to the speaker (Summarise), and asking clarifying questions (Ask). Nodding along without truly hearing is &ldquo;pretend listening&rdquo; &mdash; dangerous when live working is involved.',
  },
  {
    id: 'language-barrier-instructions',
    question:
      'You are supervising an electrician whose first language is not English. You have just explained a complex isolation procedure, and they nodded and said &ldquo;yes, okay.&rdquo; You are not fully confident they understood. What should you do?',
    options: [
      'Accept their confirmation at face value and let them proceed',
      'Repeat the same explanation more slowly and loudly',
      'Ask them to explain the procedure back to you in their own words, use simple diagrams, and demonstrate the key steps',
      'Assign the task to someone else to avoid the communication difficulty',
    ],
    correctIndex: 2,
    explanation:
      'Nodding and saying &ldquo;yes&rdquo; can be a politeness response rather than genuine confirmation of understanding, particularly across cultures. The safest approach is to ask them to explain the procedure back in their own words (teach-back method), supplement verbal instructions with simple diagrams or written steps, and physically demonstrate the key isolation steps. Speaking louder does not improve comprehension. Reassigning the task avoids the issue without addressing it and may be discriminatory.',
  },
];

const faqs = [
  {
    question: 'How do I stay calm when a client is shouting at me about electrical work?',
    answer:
      'Use the STOP technique: Stop what you are doing, Take a breath, Observe your own emotional state, then Proceed with empathetic listening. Do not match their energy or become defensive. Maintain a calm, steady tone and open body language. Acknowledge their frustration (&ldquo;I understand this is really frustrating for you&rdquo;) without admitting fault or making promises you cannot keep. Let them finish speaking before responding. If you feel your own emotions rising, it is acceptable to say &ldquo;Let me take a moment to make sure I understand everything you have said.&rdquo; This brief pause helps you regulate before responding.',
  },
  {
    question: 'What is the difference between empathetic listening and just agreeing with someone?',
    answer:
      'Empathetic listening means genuinely understanding someone&rsquo;s perspective and feelings &mdash; it does NOT mean agreeing with them. You can fully understand why a client is upset about a delay without agreeing that the delay was your fault. Covey describes it as &ldquo;listening with the intent to understand, not to reply.&rdquo; You reflect back their feelings and perspective (&ldquo;I can hear that the timeline has caused you real concern&rdquo;) without necessarily accepting blame or changing your professional position. This is particularly important in complaints handling where acknowledging feelings is essential but admitting liability prematurely can have legal implications.',
  },
  {
    question: 'How should I handle a post-accident debrief when emotions are running high?',
    answer:
      'Structure is your ally. Begin by acknowledging the emotional weight of what has happened &mdash; do not rush past it. Use the debrief framework: Facts first (what happened, in sequence, without blame), then Feelings (how people are feeling now), then Findings (what can we learn), and finally Future actions (what changes are needed). Let everyone speak without interruption. Use active listening throughout &mdash; paraphrase, summarise, and check understanding. Avoid assigning blame during the debrief itself. If someone becomes very distressed, acknowledge it and offer a short break. Document agreed actions and follow up within 48 hours.',
  },
  {
    question:
      'How can I improve my listening when English is not my first language or I am working with someone whose English is limited?',
    answer:
      'Focus on creating shared understanding rather than perfect language. Use simple, clear sentences with technical terms defined. Supplement verbal communication with visual aids: diagrams, photographs, colour-coded labels, and physical demonstrations. Use the teach-back method &mdash; ask the person to show or explain what they understood. Avoid idioms, slang, and culturally specific references. Be patient and allow extra processing time. Written summaries of key points can serve as a reference. Many UK construction sites have multilingual toolbox talk templates available. Never assume understanding just because someone nods or says &ldquo;yes.&rdquo;',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'According to Stephen Covey, what is the HIGHEST level of listening?',
    options: [
      'Attentive listening &mdash; giving the speaker your full attention',
      'Selective listening &mdash; hearing only the parts relevant to you',
      'Empathetic listening &mdash; understanding the speaker&rsquo;s feelings, meaning, and perspective',
      'Active listening &mdash; paraphrasing what the speaker says back to them',
    ],
    correctAnswer: 2,
    explanation:
      'Covey identifies 5 levels of listening: ignoring, pretend listening, selective listening, attentive listening, and empathetic listening. Empathetic listening is the highest level because it goes beyond hearing words to genuinely understanding the other person&rsquo;s frame of reference, emotions, and underlying meaning. It requires you to &ldquo;seek first to understand, then to be understood&rdquo; (Habit 5 of The 7 Habits of Highly Effective People). In construction, this means understanding not just what a client or colleague is saying, but why it matters to them.',
  },
  {
    id: 2,
    question: 'Julian Treasure&rsquo;s RASA model stands for:',
    options: [
      'React, Analyse, Speak, Affirm',
      'Receive, Appreciate, Summarise, Ask',
      'Record, Acknowledge, Solve, Act',
      'Reflect, Absorb, Synthesise, Apply',
    ],
    correctAnswer: 1,
    explanation:
      'RASA stands for Receive (pay attention, face the speaker), Appreciate (show you are listening through small sounds and gestures), Summarise (reflect back what you have heard, &ldquo;So what you are saying is&hellip;&rdquo;), and Ask (pose questions to deepen understanding). Treasure developed this as a framework for conscious listening &mdash; deliberately choosing to listen rather than simply hearing. On a construction site, RASA is particularly valuable during toolbox talks, safety briefings, and client consultations.',
  },
  {
    id: 3,
    question:
      'A client calls you back to a job because a circuit keeps tripping. They are angry and say &ldquo;Your work is rubbish &mdash; nothing works properly since you touched it.&rdquo; What is the BEST first response?',
    options: [
      '&ldquo;That is not fair &mdash; I tested everything before I left and it was all fine.&rdquo;',
      '&ldquo;I can hear you are really frustrated. Tell me exactly what has been happening and I will get to the bottom of it.&rdquo;',
      '&ldquo;It is probably something you have plugged in that is causing the trip.&rdquo;',
      '&ldquo;I will send you a copy of the test results to prove the work was done correctly.&rdquo;',
    ],
    correctAnswer: 1,
    explanation:
      'The best response acknowledges the client&rsquo;s emotion first (&ldquo;I can hear you are really frustrated&rdquo;) and then invites them to share the details. This follows the empathetic listening approach: understand before responding. Defending yourself immediately (&ldquo;that is not fair&rdquo;) or deflecting blame (&ldquo;something you plugged in&rdquo;) escalates the conflict. Sending test results may be appropriate later but does not address the immediate emotional need to be heard.',
  },
  {
    id: 4,
    question:
      'During a post-accident debrief after an electric shock incident on site, which approach is MOST effective?',
    options: [
      'Immediately identify who was at fault and focus the discussion on preventing their specific mistake',
      'Follow a structured debrief: facts first (what happened), feelings (emotional impact), findings (lessons), and future actions (changes needed)',
      'Keep it brief and move on quickly so people can get back to work and not dwell on what happened',
      'Let the site manager do all the talking while everyone else listens silently',
    ],
    correctAnswer: 1,
    explanation:
      'A structured debrief framework (Facts, Feelings, Findings, Future) ensures all aspects of the incident are addressed properly. Starting with facts establishes a shared, blame-free understanding of what occurred. Addressing feelings acknowledges the emotional impact &mdash; essential after a shock incident where people may be shaken or frightened. Findings draw out learning points, and future actions create accountability. Rushing through or assigning immediate blame shuts down honest communication and prevents genuine learning.',
  },
  {
    id: 5,
    question:
      'You are explaining an isolation procedure to a colleague whose first language is Polish. They nod and say &ldquo;yes, okay&rdquo; but you are unsure they understood. The SAFEST approach is:',
    options: [
      'Accept their confirmation &mdash; they said they understood',
      'Repeat the explanation more slowly and at a higher volume',
      'Ask them to explain the procedure back to you, use a diagram, and demonstrate the key steps',
      'Send them a text message with the procedure written in English',
    ],
    correctAnswer: 2,
    explanation:
      'The teach-back method (asking them to explain the procedure in their own words) is the gold standard for confirming understanding across language barriers. Supplement this with visual aids (diagrams, colour-coded labels) and physical demonstration of key steps. Speaking louder does not improve comprehension &mdash; it often increases anxiety. A written English text may help as a reference but does not confirm understanding. For safety-critical procedures like isolation, verbal confirmation alone is never sufficient.',
  },
  {
    id: 6,
    question:
      'Which of the following is an example of &ldquo;pretend listening&rdquo; according to Covey&rsquo;s five levels?',
    options: [
      'Putting your phone down and making eye contact while a colleague explains a fault',
      'Nodding and saying &ldquo;mmm-hmm&rdquo; while actually thinking about what you need from the wholesaler',
      'Asking clarifying questions to make sure you understand an instruction correctly',
      'Summarising what someone has said to check your understanding before responding',
    ],
    correctAnswer: 1,
    explanation:
      'Pretend listening is the second level in Covey&rsquo;s hierarchy. It involves appearing to listen &mdash; making eye contact, nodding, making sounds of agreement &mdash; while actually being mentally elsewhere. On a construction site, this is particularly dangerous during safety briefings, isolation instructions, or when a colleague is describing a fault they have found. The listener gives the appearance of attention but retains little or nothing. In contrast, putting the phone down and making genuine eye contact is attentive listening, while asking questions and summarising are characteristics of active and empathetic listening.',
  },
  {
    id: 7,
    question:
      'A homeowner becomes tearful while explaining that their elderly mother had a fall in the dark during a power cut caused by a faulty consumer unit. How should you respond?',
    options: [
      'Focus on the technical fault &mdash; &ldquo;Let me look at the consumer unit and I will have it sorted quickly.&rdquo;',
      'Pause, acknowledge their distress (&ldquo;I am sorry to hear about your mother &mdash; that must have been very worrying&rdquo;), listen fully, then explain what you will do',
      'Tell them a similar story about another client to show you understand',
      'Suggest they make a formal complaint to the previous electrician&rsquo;s certifying body',
    ],
    correctAnswer: 1,
    explanation:
      'When someone is emotionally distressed, they need acknowledgement before solutions. Pause to show you are not rushing past their feelings. A simple, sincere acknowledgement (&ldquo;I am sorry to hear about your mother &mdash; that must have been very worrying&rdquo;) validates their experience. Listen fully to everything they want to tell you. Only then transition to the technical response. Jumping straight to the fix dismisses their emotional experience. Sharing your own stories redirects attention to you. Suggesting formal complaints escalates rather than resolves.',
  },
  {
    id: 8,
    question:
      'Julian Treasure identifies several &ldquo;filters&rdquo; that distort our listening. In a construction context, which is the MOST common barrier to accurate listening?',
    options: [
      'Cultural filters &mdash; different nationalities have different listening styles',
      'Assumptions and expectations &mdash; hearing what you expect to hear rather than what is actually said',
      'Emotional filters &mdash; only hearing things that make you feel good',
      'Vocabulary filters &mdash; not understanding any of the words being used',
    ],
    correctAnswer: 1,
    explanation:
      'Treasure identifies several listening filters including culture, language, values, beliefs, attitudes, expectations, and intentions. In construction, assumptions and expectations are the most common barrier: an experienced electrician may &ldquo;hear&rdquo; a standard instruction even when the actual instruction differs from the norm. For example, assuming a circuit is wired in the standard way and missing an instruction about a non-standard configuration. This filter is particularly dangerous during handovers, where the receiving electrician may assume the installation matches their expectations rather than listening carefully to what the previous worker actually did.',
  },
];

const CCModule2Section4 = () => {
  useSEO({
    title: 'Listening in High-Stakes Situations | Communication & Confidence Module 2 Section 4',
    description:
      'Empathetic listening under pressure, conscious listening, managing emotional conversations, and listening across language barriers in construction settings.',
  });

  return (
    <div className="bg-[#1a1a1a] overflow-x-hidden">
      {/* Sticky Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a]/95 sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button
            variant="ghost"
            className="min-h-[44px] text-white hover:text-white active:text-white p-0 -ml-1 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cc-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-rose-500/20 to-rose-600/20 border border-rose-500/30 mb-4">
            <AlertTriangle className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-block bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-full text-sm font-semibold mb-4 ml-0">
            <span className="text-rose-400">MODULE 2</span>
            <span className="text-white mx-2">&middot;</span>
            <span className="text-white">SECTION 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Listening in High-Stakes Situations
          </h1>
          <p className="text-white max-w-xl mx-auto">
            Empathetic listening under pressure, conscious listening, managing emotional
            conversations, and listening across language barriers on construction sites
          </p>
        </div>

        {/* Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          <div className="rounded-lg p-4 bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="font-semibold text-rose-400 mb-2">In 30 Seconds</p>
            <ul className="text-white text-base space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                <span>
                  <strong className="text-white">Covey&rsquo;s Habit 5:</strong> seek first to
                  understand, then to be understood
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                <span>
                  <strong className="text-white">RASA model:</strong> Receive, Appreciate,
                  Summarise, Ask &mdash; Julian Treasure&rsquo;s conscious listening framework
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                <span>
                  <strong className="text-white">Emotions first:</strong> acknowledge feelings
                  before offering technical solutions
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                <span>
                  <strong className="text-white">Language barriers:</strong> teach-back method,
                  visual aids, and physical demonstration
                </span>
              </li>
            </ul>
          </div>
          <div className="rounded-lg p-4 bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="font-semibold text-rose-400 mb-2">Key Situations</p>
            <ul className="text-white text-base space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                <span>
                  <strong className="text-white">Complaints:</strong> listen fully, acknowledge,
                  then respond &mdash; never defend first
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                <span>
                  <strong className="text-white">Safety-critical:</strong> remove distractions,
                  confirm understanding, repeat back
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                <span>
                  <strong className="text-white">Post-accident:</strong> structured debrief &mdash;
                  facts, feelings, findings, future
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                <span>
                  <strong className="text-white">Multilingual sites:</strong> visual aids,
                  demonstration, never assume understanding
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning Outcomes</h2>
          <p className="text-white mb-4">By the end of this section, you will be able to:</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              'Apply Covey&rsquo;s empathetic listening approach to de-escalate emotional conversations with clients and colleagues',
              'Use Julian Treasure&rsquo;s RASA model to practise conscious, deliberate listening in noisy construction environments',
              'Manage complaints by acknowledging feelings before providing technical explanations or solutions',
              'Receive and confirm safety-critical instructions accurately, even under time pressure or environmental noise',
              'Communicate effectively across language barriers using the teach-back method, visual aids, and physical demonstration',
              'Facilitate a structured post-accident debrief that addresses facts, feelings, findings, and future actions',
            ].map((outcome, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
                <span className="text-white text-sm">{outcome}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Empathetic Listening Under Pressure */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-rose-400 text-sm font-normal">01</span>
              Empathetic Listening Under Pressure
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Stephen Covey&rsquo;s Habit 5 &mdash; &ldquo;Seek first to understand, then to be
                understood&rdquo; &mdash; is the foundation of effective listening in high-stakes
                situations. In his model, most people listen with the intent to reply rather than
                the intent to understand. When emotions are running high &mdash; a client whose
                power has been off for hours, a colleague who has just witnessed an accident, a
                homeowner whose property has been damaged &mdash; the instinct to defend, explain,
                or solve must be overridden by the discipline to listen first.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 text-rose-400 flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Covey&rsquo;s Five Levels of Listening
                </h3>
                <div className="space-y-2 text-sm text-white">
                  {[
                    {
                      level: 'Level 1 &mdash; Ignoring',
                      detail: 'Not listening at all. Looking at your phone while a client speaks.',
                    },
                    {
                      level: 'Level 2 &mdash; Pretend Listening',
                      detail:
                        'Appearing to listen (nodding, &ldquo;mmm-hmm&rdquo;) while mentally composing your shopping list or thinking about the next job.',
                    },
                    {
                      level: 'Level 3 &mdash; Selective Listening',
                      detail:
                        'Hearing only the parts that interest you or confirm what you already think. Filtering out inconvenient details.',
                    },
                    {
                      level: 'Level 4 &mdash; Attentive Listening',
                      detail:
                        'Giving full attention to the words being spoken. Hearing the content accurately but not engaging with the emotion behind it.',
                    },
                    {
                      level: 'Level 5 &mdash; Empathetic Listening',
                      detail:
                        'Understanding the speaker&rsquo;s feelings, perspective, and frame of reference. Hearing not just what they say, but what they mean and why it matters to them.',
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0" />
                      <div>
                        <strong
                          className="text-white"
                          dangerouslySetInnerHTML={{ __html: item.level }}
                        />
                        <span
                          className="text-white"
                          dangerouslySetInnerHTML={{ __html: ' &mdash; ' + item.detail }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-2">Construction Example</h3>
                <p className="text-white text-sm">
                  A homeowner calls you back because circuits keep tripping after a consumer unit
                  upgrade. They are frustrated and say, &ldquo;Nothing has worked properly since you
                  touched it.&rdquo; At Level 4 (attentive), you hear the complaint. At Level 5
                  (empathetic), you understand they are frightened about the safety of their home,
                  anxious about the cost of further work, and feeling powerless because they do not
                  understand what is wrong. Responding to the fear and the frustration &mdash; not
                  just the technical fault &mdash; transforms the interaction.
                </p>
              </div>

              <p>
                Empathetic listening under pressure requires you to temporarily set aside your own
                perspective. This does not mean agreeing with everything the other person says. It
                means demonstrating that you genuinely understand their position before presenting
                your own. In practice, this sounds like: &ldquo;I can hear that this has been really
                stressful for you, and I understand why you are concerned about the safety of your
                home. Let me explain what I think is happening and what I am going to do about
                it.&rdquo;
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: Julian Treasure &mdash; Conscious Listening */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-rose-400 text-sm font-normal">02</span>
              Conscious Listening &mdash; Julian Treasure
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Julian Treasure, a leading expert on sound and communication, argues that we are
                losing our ability to listen. In his framework, conscious listening is a deliberate
                skill that must be practised, not a passive state that happens automatically. On a
                construction site &mdash; with generators running, angle grinders screaming, radio
                chatter, and multiple conversations happening simultaneously &mdash; conscious
                listening is both harder and more important than in a quiet office.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 text-rose-400 flex items-center gap-2">
                  <Ear className="h-5 w-5" />
                  The RASA Model
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    {
                      letter: 'R',
                      word: 'Receive',
                      detail:
                        'Pay full attention to the speaker. Put down your tools, turn off the radio, face them directly. On site, this may mean moving away from noise sources.',
                    },
                    {
                      letter: 'A',
                      word: 'Appreciate',
                      detail:
                        'Show you are listening through small acknowledgements &mdash; nodding, &ldquo;I see,&rdquo; &ldquo;go on&rdquo; &mdash; without interrupting. This encourages the speaker to continue.',
                    },
                    {
                      letter: 'S',
                      word: 'Summarise',
                      detail:
                        'Reflect back what you have heard: &ldquo;So what you are saying is the RCD trips every time the cooker is switched on, and it started after the storm last Tuesday.&rdquo;',
                    },
                    {
                      letter: 'A',
                      word: 'Ask',
                      detail:
                        'Pose clarifying questions to deepen understanding: &ldquo;Does it trip immediately or after a few minutes? Is it just the one circuit or does the main switch go as well?&rdquo;',
                    },
                  ].map((item, i) => (
                    <div key={i} className="bg-white/5 border border-rose-500/20 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center flex-shrink-0">
                          <span className="text-rose-400 font-bold text-sm">{item.letter}</span>
                        </div>
                        <span className="text-rose-300 font-semibold text-sm">{item.word}</span>
                      </div>
                      <p className="text-white text-sm">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-2">
                  Treasure&rsquo;s Listening Filters
                </h3>
                <p className="text-white text-sm mb-3">
                  Treasure identifies several filters that distort what we hear. On construction
                  sites, the most dangerous is{' '}
                  <strong className="text-white">assumptions and expectations</strong> &mdash;
                  hearing what you expect to hear rather than what is actually said. An experienced
                  electrician may &ldquo;hear&rdquo; a standard instruction even when the actual
                  instruction differs from the norm.
                </p>
                <div className="space-y-2 text-sm text-white">
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Culture:</strong> different backgrounds
                      interpret tone, silence, and directness differently
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Values and beliefs:</strong> we tend to hear
                      information that aligns with what we already believe
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Intentions:</strong> listening for what you
                      want rather than what is being offered
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Emotions:</strong> when you are stressed,
                      tired, or angry, your listening accuracy drops significantly
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Managing Emotional Conversations */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-rose-400 text-sm font-normal">03</span>
              Managing Emotional Conversations
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Emotional conversations are unavoidable in construction. Clients become upset when
                work is delayed, costs increase, or faults appear. Colleagues become frustrated when
                they feel unheard, overworked, or blamed for something that was not their fault.
                After accidents, people may be shocked, frightened, or angry. Your ability to listen
                through the emotion &mdash; not around it &mdash; determines whether the
                conversation resolves or escalates.
              </p>

              {/* STOP Technique */}
              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 text-rose-400">
                  The STOP Technique for Emotional Regulation
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      letter: 'S',
                      word: 'Stop',
                      detail:
                        'Pause what you are doing. Put down your tools. Do not respond immediately. The pause itself communicates that you are taking the situation seriously.',
                    },
                    {
                      letter: 'T',
                      word: 'Take a Breath',
                      detail:
                        'One slow, deliberate breath activates your parasympathetic nervous system and interrupts the fight-or-flight response. This prevents you from saying something you will regret.',
                    },
                    {
                      letter: 'O',
                      word: 'Observe',
                      detail:
                        'Notice your own emotional state. Are you feeling defensive? Angry? Anxious? Naming the emotion reduces its power over your response. Also observe the other person &mdash; what are they actually feeling beneath the words?',
                    },
                    {
                      letter: 'P',
                      word: 'Proceed',
                      detail:
                        'Now respond with empathetic listening. Acknowledge their feelings, ask clarifying questions, and only then offer your perspective or solution.',
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-rose-400 text-sm font-bold">{item.letter}</span>
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">{item.word}</p>
                        <p className="text-white text-sm">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Complaints Handling */}
              <div className="bg-white/5 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-rose-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-rose-300">
                    Complaints Handling &mdash; The Listening-First Approach
                  </h3>
                </div>
                <div className="space-y-3">
                  {[
                    {
                      step: 1,
                      title: 'Listen fully without interrupting',
                      detail:
                        'Let the client say everything they need to say. Resist the urge to correct, defend, or explain. The longer you listen, the more information you gather and the calmer they become.',
                    },
                    {
                      step: 2,
                      title: 'Acknowledge the emotion',
                      detail:
                        '&ldquo;I can hear that this has been really frustrating for you&rdquo; or &ldquo;I understand why you are concerned about the safety of your home.&rdquo; This is NOT admitting fault &mdash; it is showing you understand how they feel.',
                    },
                    {
                      step: 3,
                      title: 'Summarise what you heard',
                      detail:
                        '&ldquo;So if I understand correctly, the lights in the kitchen have been flickering since the work was done, and you are worried it could be a fire risk.&rdquo; This confirms understanding and shows respect.',
                    },
                    {
                      step: 4,
                      title: 'Explain and offer solutions',
                      detail:
                        'NOW you can provide your technical perspective, explain what you think may have happened, and outline the steps you will take to resolve the issue.',
                    },
                    {
                      step: 5,
                      title: 'Confirm the plan',
                      detail:
                        'Summarise the agreed next steps and follow up within the promised timeframe. Under-promise and over-deliver.',
                    },
                  ].map(({ step, title, detail }) => (
                    <div key={step} className="flex items-start gap-3 text-sm">
                      <div className="w-6 h-6 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-rose-400 text-xs font-bold">{step}</span>
                      </div>
                      <div>
                        <p className="text-white font-medium">{title}</p>
                        <p className="text-white" dangerouslySetInnerHTML={{ __html: detail }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-2">What NOT to Say</h3>
                <div className="space-y-2 text-sm text-white">
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      &ldquo;Calm down&rdquo; &mdash; this dismisses their feelings and almost
                      always makes things worse
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      &ldquo;That is not my fault&rdquo; &mdash; immediately creates an adversarial
                      dynamic
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      &ldquo;It was probably something you did&rdquo; &mdash; shifts blame onto the
                      client and destroys trust
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      &ldquo;I have been doing this for 20 years&rdquo; &mdash; appeals to authority
                      rather than addressing the concern
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Safety-Critical Listening */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-rose-400 text-sm font-normal">04</span>
              Safety-Critical Listening
            </h2>
            <div className="space-y-4 text-white">
              <p>
                When instructions involve live working, isolation procedures, permit-to-work
                systems, or any activity where a mistake could cause serious injury or death,
                ordinary listening is not enough. Safety-critical listening requires a structured,
                verifiable process that eliminates ambiguity and confirms understanding.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">The Three-Way Communication Model</h3>
                </div>
                <p className="text-white text-sm mb-3">
                  Used in aviation, nuclear, and healthcare industries, three-way communication
                  eliminates the most dangerous listening failures in safety-critical situations:
                </p>
                <div className="space-y-3">
                  {[
                    {
                      step: 1,
                      text: 'The SENDER gives the instruction clearly: &ldquo;Isolate the supply at the main switch in the ground floor DB, lock off with your personal padlock, and prove dead at the socket outlet in the kitchen.&rdquo;',
                    },
                    {
                      step: 2,
                      text: 'The RECEIVER repeats the instruction back: &ldquo;Understood &mdash; isolate at the main switch in the ground floor DB, lock off with my padlock, prove dead at the kitchen socket outlet.&rdquo;',
                    },
                    {
                      step: 3,
                      text: 'The SENDER confirms the repeat-back is correct: &ldquo;That is correct, go ahead.&rdquo; Or corrects any errors: &ldquo;No &mdash; the ground floor DB, not the first floor.&rdquo;',
                    },
                  ].map(({ step, text }) => (
                    <div key={step} className="flex items-start gap-3 text-sm">
                      <div className="w-6 h-6 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-red-400 text-xs font-bold">{step}</span>
                      </div>
                      <p className="text-white">{text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-2">Removing Environmental Barriers</h3>
                <p className="text-white text-sm mb-3">
                  Before receiving safety-critical instructions, actively create the conditions for
                  accurate listening:
                </p>
                <div className="space-y-2 text-sm text-white">
                  <div className="flex items-start gap-3">
                    <Shield className="h-4 w-4 text-rose-400 mt-1 flex-shrink-0" />
                    <span>
                      Move away from noisy plant and equipment &mdash; ask for the generator to be
                      paused if necessary
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="h-4 w-4 text-rose-400 mt-1 flex-shrink-0" />
                    <span>
                      Put down your tools and give your full visual and auditory attention
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="h-4 w-4 text-rose-400 mt-1 flex-shrink-0" />
                    <span>
                      Remove ear defenders for the duration of the instruction (if safe to do so)
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="h-4 w-4 text-rose-400 mt-1 flex-shrink-0" />
                    <span>
                      Ask others to wait if they try to interrupt during a safety briefing
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="h-4 w-4 text-rose-400 mt-1 flex-shrink-0" />
                    <span>
                      If the instruction is complex, ask for it in writing as well as verbally
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: Listening Across Language Barriers */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-rose-400 text-sm font-normal">05</span>
              Listening Across Language Barriers
            </h2>
            <div className="space-y-4 text-white">
              <p>
                UK construction sites are multilingual environments. Electricians regularly work
                alongside colleagues whose first language may be Polish, Romanian, Portuguese,
                Lithuanian, or any number of other languages. Effective listening across language
                barriers is not just about being understood &mdash; it is about confirming that
                understanding is genuine, particularly for safety-critical tasks.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 text-rose-400 flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  The Teach-Back Method
                </h3>
                <p className="text-white text-sm mb-3">
                  The single most effective technique for confirming understanding across language
                  barriers. Instead of asking &ldquo;Do you understand?&rdquo; (which almost always
                  produces a &ldquo;yes&rdquo; regardless of actual understanding), ask the person
                  to explain or demonstrate the procedure back to you:
                </p>
                <div className="space-y-2 text-sm text-white">
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      &ldquo;Can you talk me through what you are going to do, step by step?&rdquo;
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>&ldquo;Show me which switch you are going to isolate.&rdquo;</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>&ldquo;Point to where you are going to test for dead.&rdquo;</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>&ldquo;What will you do if the circuit is still live?&rdquo;</span>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-rose-400/30 p-4 rounded-lg">
                  <h3 className="text-rose-300 font-medium mb-2">Do</h3>
                  <ul className="text-white space-y-1 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Use simple, short sentences with clear technical terms</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Draw diagrams and use colour-coded labels</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Physically demonstrate the procedure</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Allow extra processing time &mdash; be patient</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Provide written summaries of key steps</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-rose-400/30 p-4 rounded-lg">
                  <h3 className="text-rose-300 font-medium mb-2">Do Not</h3>
                  <ul className="text-white space-y-1 text-sm">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                      <span>Speak louder &mdash; volume does not improve comprehension</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                      <span>Use idioms, slang, or culturally specific phrases</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                      <span>Assume a nod or &ldquo;yes&rdquo; means genuine understanding</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                      <span>Reassign tasks to avoid the communication challenge</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                      <span>Speak in an exaggerated or patronising manner</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Post-Accident Debrief */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-rose-400 text-sm font-normal">06</span>
              Post-Accident Debrief
            </h2>
            <div className="space-y-4 text-white">
              <p>
                After any significant incident on site &mdash; an electric shock, a near-miss, a
                fall, or equipment failure &mdash; a structured debrief is essential. The purpose is
                to establish what happened, acknowledge the emotional impact, identify learning
                points, and agree on changes. Listening is the most critical skill in every phase of
                this process.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-4 text-rose-400">The 4F Debrief Framework</h3>
                <div className="space-y-3">
                  {[
                    {
                      step: 1,
                      title: 'Facts',
                      detail:
                        'Establish what happened in chronological sequence. Each person describes what they saw, heard, and did. No blame, no interpretation &mdash; just the factual sequence of events. The facilitator listens and records without commenting.',
                    },
                    {
                      step: 2,
                      title: 'Feelings',
                      detail:
                        'Acknowledge the emotional impact. &ldquo;How are you feeling about what happened?&rdquo; People may be shocked, frightened, angry, or guilty. Let them express these feelings without judgement. This phase is often skipped in construction culture but is essential for wellbeing and for preventing people from &ldquo;bottling up&rdquo; their response.',
                    },
                    {
                      step: 3,
                      title: 'Findings',
                      detail:
                        'What can we learn? What contributed to the incident? Were procedures followed? Were risk assessments adequate? Were there warning signs that were missed? The facilitator uses open questions and listens for patterns rather than jumping to conclusions.',
                    },
                    {
                      step: 4,
                      title: 'Future',
                      detail:
                        'What changes are needed? Who is responsible for each action? By when? Document all agreed actions and distribute them. Follow up within 48 hours to check progress and check on the wellbeing of those involved.',
                    },
                  ].map(({ step, title, detail }) => (
                    <div key={step} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-rose-400 text-sm font-bold">{step}</span>
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">{title}</p>
                        <p className="text-white text-sm">{detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-2">
                  Construction Example &mdash; Electric Shock Debrief
                </h3>
                <p className="text-white text-sm">
                  An apprentice receives a shock from a circuit that was supposed to be isolated.
                  The debrief reveals: the isolation was done at the correct point, but a
                  cross-connection from another circuit (installed by a previous contractor) was
                  feeding the socket from a live supply. The apprentice says they &ldquo;felt a
                  tingle&rdquo; but did not report it immediately because they did not want to
                  &ldquo;look soft.&rdquo; The debrief uncovers both the technical cause
                  (cross-connection) and the cultural barrier (reluctance to report). Both must be
                  addressed &mdash; the technical fix alone is not enough. Effective listening
                  during the debrief is what surfaces the cultural issue that might otherwise have
                  remained hidden.
                </p>
              </div>

              <div className="bg-white/5 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-rose-300">Key Principle</h3>
                </div>
                <p className="text-white text-sm">
                  In every high-stakes situation &mdash; complaints, safety-critical instructions,
                  emotional conversations, language barriers, and post-accident debriefs &mdash; the
                  same principle applies:{' '}
                  <strong className="text-white">
                    listen to understand before you respond to be understood.
                  </strong>{' '}
                  The quality of your listening determines the quality of the outcome.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-white text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <div className="mt-12">
          <Quiz title="Listening in High-Stakes Situations Quiz" questions={quizQuestions} />
        </div>

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[44px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cc-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[44px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cc-module-3-section-1">
              Next: Module 3 &mdash; Assertive Communication
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default CCModule2Section4;
