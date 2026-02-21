import {
  ArrowLeft,
  Eye,
  CheckCircle,
  HelpCircle,
  Lightbulb,
  Users,
  Ear,
  Globe,
  Scan,
  MessageCircle,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'reading-ekman',
    question: 'According to Paul Ekman, micro-expressions last between:',
    options: [
      '1 to 5 seconds',
      '1/5 to 1/25 of a second',
      '10 to 30 seconds',
      'They have no specific duration',
    ],
    correctIndex: 1,
    explanation:
      'Ekman\u2019s research found that micro-expressions are extremely brief \u2014 lasting between 1/5 of a second (200 milliseconds) and 1/25 of a second (40 milliseconds). This makes them very difficult to detect without training, but they are significant because they reveal genuine emotions that a person may be trying to conceal.',
  },
  {
    id: 'reading-rasa',
    question:
      'In Julian Treasure\u2019s RASA model for active listening, what does RASA stand for?',
    options: [
      'React, Analyse, Solve, Advise',
      'Receive, Appreciate, Summarise, Ask',
      'Read, Absorb, Support, Act',
      'Recognise, Accept, Share, Agree',
    ],
    correctIndex: 1,
    explanation:
      'RASA stands for Receive (pay full attention), Appreciate (make small sounds and gestures showing you are engaged), Summarise (reflect back what you have heard), and Ask (follow up with questions). It is a practical framework for listening with empathy rather than just hearing words.',
  },
  {
    id: 'reading-culture',
    question:
      'When working on a diverse UK construction site, the most empathetic approach to cultural differences is:',
    options: [
      'Treating everyone exactly the same regardless of background',
      'Avoiding all interaction with people from different cultures',
      'Combining universal emotional awareness with cultural humility \u2014 observing, asking and learning',
      'Assuming that British cultural norms are correct and others should adapt',
    ],
    correctIndex: 2,
    explanation:
      'Cultural sensitivity requires both universal skills (reading basic emotional cues that are the same across cultures) and cultural humility (recognising that you may not understand someone\u2019s cultural context and being willing to observe, ask and learn). Treating everyone identically ignores real differences; avoiding interaction creates isolation. The empathetic approach blends awareness with curiosity.',
  },
];

const faqs = [
  {
    question: 'Can you really learn to read micro-expressions, or is it a natural talent?',
    answer:
      'Research by Paul Ekman and his colleagues has conclusively shown that micro-expression recognition can be significantly improved through training. In studies using Ekman\u2019s Micro Expression Training Tool (METT), participants showed substantial improvement in detecting and identifying micro-expressions after relatively short training periods. Like any perceptual skill, some people have a higher natural baseline than others, but virtually everyone can improve with practice. The key is focused attention: most people miss micro-expressions not because they lack the ability to see them, but because they are not looking for them. Once you know what to look for and start deliberately attending to fleeting facial expressions, your detection rate improves rapidly.',
  },
  {
    question: 'Is it ethical to read people\u2019s body language without their knowledge?',
    answer:
      'This is an important question. Reading body language is a natural part of human communication \u2014 we all do it subconsciously, all the time. Developing this skill consciously is not inherently unethical; it is simply becoming more aware of information that is already publicly available. The ethical considerations arise in how you use this information. Using body language reading to better understand colleagues, provide appropriate support, and communicate more effectively is ethical and constructive. Using it to manipulate, deceive or exploit people is not. The same skill can be used for connection or control \u2014 the ethics depend on your intent. In the context of this course, we are developing body language awareness specifically to improve empathy, safety and professional relationships.',
  },
  {
    question: 'I find active listening really difficult because my mind wanders. Any tips?',
    answer:
      'Mind-wandering during conversations is extremely common, and it does not mean you are a bad listener \u2014 it means you are human. The average person thinks at roughly 400 words per minute but speaks at only about 125 words per minute, so there is a lot of spare cognitive capacity that your mind naturally fills with other thoughts. Practical strategies: first, put your phone away or face-down (its mere presence reduces listening quality, according to research by Adrian Ward at the University of Texas). Second, practise the \u201cinternal narrator\u201d technique: silently repeat the key points the person is making in your own words as they speak. This occupies the spare cognitive capacity and keeps you focused on their message. Third, ask questions \u2014 the simple act of planning to ask a follow-up question forces you to listen more carefully. Finally, notice when your mind wanders (it will) and gently bring it back without self-criticism. Each time you redirect your attention, you are strengthening the neural pathways for sustained attention.',
  },
  {
    question: 'How should I handle it when I read someone\u2019s emotions incorrectly?',
    answer:
      'Misreading emotions is inevitable \u2014 even the most skilled empaths get it wrong sometimes, because human emotions are complex and context-dependent. The most important thing is how you handle the error. If you notice that your reading was inaccurate, simply adjust: \u201cSorry, I misread the situation. What are you actually feeling?\u201d This demonstrates both humility and genuine interest in understanding the other person. Avoid doubling down on your interpretation (\u201cNo, I can tell you\u2019re angry\u201d) \u2014 this is patronising and undermines trust. Treat your emotional readings as hypotheses, not certainties: \u201cIt seems like you might be frustrated \u2014 am I reading that right?\u201d This approach invites the other person to confirm or correct your perception, which actually deepens the empathetic connection rather than damaging it.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Paul Ekman\u2019s research identified how many universal facial expressions?',
    options: ['4', '5', '7', '10'],
    correctAnswer: 2,
    explanation:
      'Ekman identified seven universal facial expressions: happiness, sadness, anger, fear, surprise, disgust, and contempt. His research, conducted across diverse cultures including isolated tribes with no exposure to Western media, demonstrated that these expressions are recognised universally \u2014 they are part of our biological inheritance, not cultural conditioning.',
  },
  {
    id: 2,
    question: 'What is the FACS system developed by Ekman?',
    options: [
      'A facial recognition software programme',
      'A classification system for mapping individual facial muscle movements to emotional expressions',
      'A therapy technique for treating emotional disorders',
      'A system for training actors to express emotions on screen',
    ],
    correctAnswer: 1,
    explanation:
      'The Facial Action Coding System (FACS) is a comprehensive, anatomically-based system for describing all visually distinguishable facial movements. It maps each possible facial muscle movement (called Action Units) and catalogues how combinations of these movements produce specific emotional expressions. FACS is used by psychologists, animators, AI researchers and law enforcement.',
  },
  {
    id: 3,
    question:
      'In Edward T. Hall\u2019s proxemics theory, "personal space" (the distance for conversations with friends) is approximately:',
    options: ['0 to 45 cm', '45 cm to 1.2 m', '1.2 m to 3.6 m', '3.6 m to 7.6 m'],
    correctAnswer: 1,
    explanation:
      'Hall identified four distance zones: intimate (0\u201345 cm), personal (45 cm\u20131.2 m), social (1.2\u20133.6 m), and public (3.6\u20137.6 m). Personal space is the zone used for conversations with friends, family and close colleagues. These distances vary somewhat between cultures, which is why cultural sensitivity is important when reading proxemic cues.',
  },
  {
    id: 4,
    question: 'Crossed arms are best interpreted as:',
    options: [
      'Always a sign of defensiveness or hostility',
      'A context-dependent signal that could mean defensiveness, coldness, comfort, or simply habit',
      'A sign that the person is lying',
      'Meaningless \u2014 body language cannot be read reliably',
    ],
    correctAnswer: 1,
    explanation:
      'Body language must always be read in context. While crossed arms can indicate defensiveness, they can also mean the person is cold, comfortable, or simply in the habit of standing that way. Single gestures in isolation are unreliable \u2014 you need to look for clusters of consistent signals and consider the context. A person with crossed arms who is also leaning back, avoiding eye contact and giving short answers is likely defensive. A person with crossed arms who is leaning forward, maintaining eye contact and engaged in conversation is probably just comfortable.',
  },
  {
    id: 5,
    question: 'Reflective listening involves:',
    options: [
      'Reflecting on what you want to say next while the other person talks',
      'Parroting back exactly what the speaker said, word for word',
      'Paraphrasing what the speaker said in your own words to confirm understanding',
      'Reflecting the speaker\u2019s words back at them to challenge their position',
    ],
    correctAnswer: 2,
    explanation:
      'Reflective listening means paraphrasing what you heard in your own words and checking that you understood correctly. For example: \u201cSo what you\u2019re saying is that the timeline is unrealistic and you\u2019re worried about safety corners being cut \u2014 is that right?\u201d This demonstrates that you have genuinely listened, gives the speaker a chance to clarify, and builds trust by showing you care about understanding accurately.',
  },
  {
    id: 6,
    question:
      'The perspective-taking technique \u201cwhat would it be like if...\u201d is most useful for:',
    options: [
      'Winning arguments by predicting the other person\u2019s response',
      'Developing empathy by mentally stepping into another person\u2019s situation and imagining their experience',
      'Avoiding responsibility by imagining what others would do',
      'Planning career moves by imagining different scenarios',
    ],
    correctAnswer: 1,
    explanation:
      'The \u201cwhat would it be like if...\u201d technique is a deliberate empathy exercise. By mentally placing yourself in another person\u2019s situation \u2014 with their background, pressures, skills and concerns \u2014 you develop a richer understanding of their perspective. This is cognitive empathy in practice, and regular use strengthens the neural pathways that support empathic perspective-taking.',
  },
  {
    id: 7,
    question:
      'On a diverse UK construction site, which approach best demonstrates cultural sensitivity?',
    options: [
      'Avoiding all physical contact with people from other cultures',
      'Assuming that everyone shares British cultural norms',
      'Observing how individuals communicate, asking respectful questions when unsure, and adapting your approach accordingly',
      'Treating cultural differences as problems to be solved',
    ],
    correctAnswer: 2,
    explanation:
      'Cultural sensitivity on a diverse site requires observation, curiosity and flexibility. Different cultures have different norms around eye contact, personal space, directness, physical contact and emotional expression. The skilled approach is to observe how each individual communicates (rather than assuming based on their nationality), ask respectful questions when you are unsure, and adapt your communication style to build effective working relationships.',
  },
  {
    id: 8,
    question: 'Reading people effectively in a construction context primarily improves:',
    options: [
      'Your ability to manipulate colleagues',
      'Safety, communication and professional relationships',
      'Your chances of winning workplace arguments',
      'Only your relationship with clients, not colleagues',
    ],
    correctAnswer: 1,
    explanation:
      'The purpose of developing people-reading skills in construction is to improve safety (noticing when someone is distracted or unfit to work safely), communication (understanding how your message is being received), and relationships (building trust, resolving conflicts, and working effectively with diverse teams). These skills benefit every professional interaction, from apprentice supervision to client management to team coordination.',
  },
];

export default function EIModule4Section4() {
  useSEO({
    title: 'Reading People & Perspective-Taking | EI Module 4.4',
    description:
      "Ekman's micro-expressions, body language on construction sites, active listening with the RASA model, perspective-taking exercises, and cultural sensitivity on diverse UK sites.",
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
            <Link to="../ei-module-4">
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
            <Eye className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 4 &middot; SECTION 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Reading People &amp; Perspective-Taking
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Practical skills for reading facial expressions, body language, practising active
            listening, taking perspectives, and navigating cultural diversity on site
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Ekman:</strong> 7 universal expressions; micro-expressions last 1/5 to 1/25
                of a second
              </li>
              <li>
                <strong>Body language:</strong> Posture, gestures, eye contact and proxemics reveal
                emotions
              </li>
              <li>
                <strong>RASA:</strong> Receive, Appreciate, Summarise, Ask &mdash; Julian
                Treasure&rsquo;s listening framework
              </li>
              <li>
                <strong>Culture:</strong> Universal emotions, culturally variable expressions
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Safety:</strong> Reading non-verbal cues reveals when someone is unfit to
                work
              </li>
              <li>
                <strong>Communication:</strong> Understanding how your message lands in real time
              </li>
              <li>
                <strong>Conflict:</strong> Spotting tension early before it escalates
              </li>
              <li>
                <strong>Diversity:</strong> UK construction sites are multicultural &mdash; cultural
                sensitivity is essential
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Identify Paul Ekman\u2019s seven universal facial expressions and explain the FACS system',
              'Read body language in construction contexts (toolbox talks, site meetings, one-to-one conversations)',
              'Apply Julian Treasure\u2019s RASA model for active listening',
              'Practise perspective-taking using the \u201cwhat would it be like if...\u201d technique',
              'Navigate cultural differences in communication on diverse UK construction sites',
              'Combine facial expression reading, body language and listening to build a complete picture of another person\u2019s state',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Paul Ekman's Micro-Expressions */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">01</span>
            Paul Ekman&rsquo;s Micro-Expressions
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Paul Ekman</strong> is one of the most influential psychologists of the
                twentieth century. Beginning in the 1960s, he travelled to remote cultures around
                the world &mdash; including the Fore tribe in Papua New Guinea, who had no exposure
                to Western media &mdash; to test whether facial expressions of emotion are universal
                or culturally learned. His findings were groundbreaking: certain emotional
                expressions are recognised across all human cultures, regardless of language,
                geography or media exposure.
              </p>

              <p>
                Ekman developed the <strong>Facial Action Coding System (FACS)</strong>, the most
                comprehensive system ever created for cataloguing facial movements. FACS identifies
                every possible muscle movement in the human face (called Action Units) and maps how
                combinations of these movements produce recognisable emotional expressions. It is
                used today by psychologists, animators, AI researchers, security services and anyone
                who needs to understand human facial expressions systematically.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Scan className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Seven Universal Facial Expressions
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    {
                      emotion: 'Happiness',
                      markers:
                        'Raised cheeks, crow\u2019s feet around the eyes (Duchenne smile), upturned mouth corners',
                      site: 'A genuine smile when a job is completed well or a compliment is received',
                    },
                    {
                      emotion: 'Sadness',
                      markers:
                        'Inner eyebrow corners raised, drooping eyelids, downturned mouth corners',
                      site: 'A colleague who has received bad personal news but is trying to carry on working',
                    },
                    {
                      emotion: 'Anger',
                      markers:
                        'Lowered, drawn-together eyebrows, tightened lips, flared nostrils, tense jaw',
                      site: 'A subcontractor who has just been told their work needs to be redone',
                    },
                    {
                      emotion: 'Fear',
                      markers:
                        'Raised and drawn-together eyebrows, wide eyes, open mouth, tense lower eyelids',
                      site: 'Someone who has just had a near-miss with a heavy object or live cable',
                    },
                    {
                      emotion: 'Surprise',
                      markers: 'Raised eyebrows (entire brow), wide eyes, dropped jaw',
                      site: 'Discovering unexpected conditions behind a wall or in a ceiling void',
                    },
                    {
                      emotion: 'Disgust',
                      markers: 'Wrinkled nose, raised upper lip, narrowed eyes',
                      site: 'Encountering hazardous waste, mould, or poor-quality previous work',
                    },
                    {
                      emotion: 'Contempt',
                      markers:
                        'One-sided mouth raise (smirk), slightly tightened lip corner on one side only',
                      site: 'A supervisor dismissing an apprentice\u2019s suggestion, or a colleague mocking another\u2019s methods',
                    },
                  ].map((item, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 p-3 rounded">
                      <p className="text-sm font-medium text-rose-400 mb-1">{item.emotion}</p>
                      <p className="text-xs text-white mb-1">
                        <strong>Facial markers:</strong> {item.markers}
                      </p>
                      <p className="text-xs text-white">
                        <strong>On site:</strong> {item.site}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <p>
                <strong>Micro-expressions</strong> are involuntary facial expressions that occur
                extremely quickly &mdash; lasting between <strong>1/5 of a second</strong> (200
                milliseconds) and <strong>1/25 of a second</strong> (40 milliseconds). They are
                significant because they reveal genuine emotions that a person may be trying to
                conceal or suppress. Unlike regular expressions, which can be faked or controlled,
                micro-expressions are produced by the involuntary emotional circuits in the brain
                and cannot be reliably suppressed.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Practical Application:</strong> You do not need
                  to become a FACS-certified coder to benefit from Ekman&rsquo;s research. Simply
                  knowing the seven universal expressions and being aware that micro-expressions
                  exist will sharpen your emotional perception. Start by paying closer attention to
                  people&rsquo;s faces during conversations &mdash; particularly in the first
                  fraction of a second after you say something. That fleeting flash of surprise,
                  contempt or fear before someone composes their &ldquo;social face&rdquo; is a
                  micro-expression, and it tells you what they genuinely feel.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Construction Example: Reading Faces at a Site Meeting
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  You are presenting a revised programme at a site meeting. As you explain the new
                  timeline, you notice:
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      The project manager&rsquo;s eyebrows briefly flash upward (surprise) when you
                      mention the two-week delay &mdash; they did not expect it to be that long
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      The plumbing subcontractor&rsquo;s jaw tightens and their eyebrows draw
                      together (anger) when you describe the revised sequencing &mdash; it affects
                      their schedule
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      Your apprentice&rsquo;s eyes widen slightly and their mouth tenses (fear) when
                      you mention overtime requirements &mdash; they may have commitments outside
                      work
                    </span>
                  </li>
                </ul>
                <p className="text-sm text-white mt-3">
                  None of these people said anything, but their faces told you exactly how they
                  felt. This information allows you to address their concerns proactively rather
                  than being blindsided by objections later.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Body Language on Site */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">02</span>
            Body Language on Site
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Body language accounts for a significant portion of human communication. Albert
                Mehrabian&rsquo;s often-cited research suggested that when words and non-verbal
                signals conflict, people trust the non-verbal signals &mdash; particularly for
                emotional messages. While the exact percentages from that research are frequently
                oversimplified, the core principle is sound: how you say something (tone, posture,
                gestures) often communicates more than the words themselves.
              </p>

              <p>
                On a construction site, body language is particularly important because the
                environment is noisy, PPE obscures some facial cues (hard hats, visors, masks), and
                communication is often quick and pressured. Understanding body language gives you an
                additional channel for reading people when facial expressions and tone of voice may
                be harder to detect.
              </p>

              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <p className="text-sm font-medium text-rose-400">Posture</p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    Posture reveals engagement, confidence and emotional state. An upright, open
                    posture typically signals confidence and engagement. A slumped, closed posture
                    can indicate defeat, disengagement or fatigue. Leaning forward signals interest;
                    leaning back signals distance or evaluation.
                  </p>
                  <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">On site:</strong> At a toolbox talk, notice
                      who is standing upright and facing the speaker (engaged) versus who is leaning
                      against a wall with their weight shifted away (disengaged). The disengaged
                      person may need a different approach to connect with the safety message.
                    </p>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <p className="text-sm font-medium text-rose-400">Gestures</p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    Gestures can be illustrators (emphasising speech), regulators (controlling
                    conversation flow), adaptors (self-soothing movements like touching the face or
                    fidgeting), or emblems (culturally specific gestures like thumbs up). Adaptors
                    are particularly revealing: increased fidgeting, face-touching, or self-grooming
                    often indicates anxiety or discomfort.
                  </p>
                  <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">On site:</strong> A colleague who repeatedly
                      rubs the back of their neck while explaining why a task is not finished may be
                      uncomfortable with the situation (an adaptor revealing stress). Someone whose
                      gestures become larger and faster when describing a problem is likely feeling
                      increasingly agitated.
                    </p>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <p className="text-sm font-medium text-rose-400">Eye Contact</p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    Eye contact communicates attention, honesty, dominance and connection. In
                    British culture, moderate eye contact (looking at someone roughly 60&ndash;70%
                    of the time during conversation) signals engagement and sincerity. Avoiding eye
                    contact can indicate discomfort, shame or distraction. Prolonged, unbroken eye
                    contact can feel aggressive or challenging.
                  </p>
                  <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">On site:</strong> An apprentice who
                      consistently avoids eye contact when you ask about their progress may be
                      struggling but embarrassed to admit it. A colleague who maintains intense eye
                      contact while disagreeing with you is asserting dominance. Adjust your
                      approach accordingly.
                    </p>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <p className="text-sm font-medium text-rose-400">Personal Space (Proxemics)</p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    Edward T. Hall developed <strong>proxemics</strong> &mdash; the study of how
                    people use space in communication. He identified four zones: intimate
                    (0&ndash;45 cm), personal (45 cm&ndash;1.2 m), social (1.2&ndash;3.6 m), and
                    public (3.6&ndash;7.6 m). Invading someone&rsquo;s space can feel threatening;
                    standing too far away can feel cold and disconnected.
                  </p>
                  <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">On site:</strong> When giving feedback to an
                      apprentice, standing at personal distance (about arm&rsquo;s length) feels
                      supportive. Standing too close can feel intimidating, particularly if you are
                      delivering criticism. At a toolbox talk, moving from behind a table to stand
                      among the group reduces the social distance and increases engagement.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">
                    Critical Rule: Read Clusters, Not Singles.
                  </strong>{' '}
                  Individual body language signals are unreliable. Crossed arms might mean
                  defensiveness &mdash; or the person might be cold. A lack of eye contact might
                  mean dishonesty &mdash; or it might be a cultural norm. Always look for{' '}
                  <strong>clusters</strong> of consistent signals: crossed arms + turned-away torso
                  + minimal eye contact + short responses = likely defensive. Crossed arms + forward
                  lean + good eye contact + engaged conversation = probably just comfortable.
                  Context matters more than any single gesture.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Active Listening as an Empathy Skill */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">03</span>
            Active Listening as an Empathy Skill
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Listening is one of the most underrated skills in professional life. Most people
                believe they are good listeners, but research consistently shows otherwise. A
                classic study by Ralph Nichols at the University of Minnesota found that people
                retain only about 25% of what they hear in a conversation. Most of the time, we are
                not truly listening &mdash; we are waiting for our turn to speak, formulating our
                response, or simply distracted by our own thoughts.
              </p>

              <p>
                <strong>Active listening</strong> is a deliberate practice of giving your full
                attention to another person with the genuine intention of understanding their
                message, their emotions and their perspective. It is the practical application of
                empathy: you cannot truly understand someone if you are not truly listening to them.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Ear className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Julian Treasure&rsquo;s RASA Model
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  Sound expert <strong>Julian Treasure</strong>, in his widely viewed TED talk on
                  conscious listening, proposed the RASA model &mdash; a Sanskrit word meaning
                  &ldquo;juice&rdquo; or &ldquo;essence.&rdquo; It provides a simple, memorable
                  framework for practising active listening:
                </p>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                        R
                      </span>
                      <p className="text-sm font-medium text-white">Receive</p>
                    </div>
                    <p className="text-sm text-white pl-9">
                      Pay full attention to the person speaking. Turn towards them. Make eye
                      contact. Put down your phone. Stop what you are doing. Receiving is about
                      giving the speaker your undivided attention &mdash; not partial attention, not
                      distracted attention, but the kind of focused presence that makes the speaker
                      feel valued.
                    </p>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                        A
                      </span>
                      <p className="text-sm font-medium text-white">Appreciate</p>
                    </div>
                    <p className="text-sm text-white pl-9">
                      Show that you are engaged through small sounds and gestures: nodding, saying
                      &ldquo;mm-hmm&rdquo;, &ldquo;right&rdquo;, &ldquo;I see.&rdquo; These are not
                      interruptions &mdash; they are signals that you are with them, tracking their
                      message, and encouraging them to continue. Without these signals, speakers
                      feel they are talking into a void and tend to shut down.
                    </p>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                        S
                      </span>
                      <p className="text-sm font-medium text-white">Summarise</p>
                    </div>
                    <p className="text-sm text-white pl-9">
                      Reflect back what you have heard in your own words: &ldquo;So what you are
                      saying is...&rdquo; or &ldquo;Let me make sure I have got this right...&rdquo;
                      Summarising serves two purposes: it confirms that you understood correctly,
                      and it shows the speaker that you were genuinely processing their words, not
                      just hearing them. This is <strong>reflective listening</strong> &mdash; one
                      of the most powerful techniques in empathetic communication.
                    </p>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                        A
                      </span>
                      <p className="text-sm font-medium text-white">Ask</p>
                    </div>
                    <p className="text-sm text-white pl-9">
                      Follow up with genuine questions that deepen understanding: &ldquo;What
                      happened next?&rdquo; &ldquo;How did that make you feel?&rdquo; &ldquo;What
                      would you like to happen?&rdquo; Open-ended questions (starting with what,
                      how, why) invite the speaker to elaborate and show that you are genuinely
                      interested in understanding their perspective fully.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Construction Example: RASA in a Difficult Conversation
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  A subcontractor comes to you frustrated about a scheduling conflict. Using RASA:
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span className="text-sm text-white">
                      <strong>Receive:</strong> You stop what you are doing, put down your phone,
                      face them and give them your full attention. Your body language says &ldquo;I
                      am listening.&rdquo;
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span className="text-sm text-white">
                      <strong>Appreciate:</strong> You nod, say &ldquo;I see&rdquo; and
                      &ldquo;right&rdquo; at appropriate moments, letting them know you are tracking
                      their concern.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span className="text-sm text-white">
                      <strong>Summarise:</strong> &ldquo;So if I have got this right, you are saying
                      that the revised schedule means your team cannot access the first floor until
                      Wednesday, which pushes your completion back by three days &mdash; is that
                      right?&rdquo;
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span className="text-sm text-white">
                      <strong>Ask:</strong> &ldquo;What would you need from us to make Wednesday
                      work? Is there anything we can do on our side to reduce the impact?&rdquo;
                    </span>
                  </div>
                </div>
                <p className="text-sm text-white mt-3">
                  The subcontractor feels heard, understood and respected &mdash; even if the
                  schedule does not change. This is the power of active listening: it does not
                  always solve the problem, but it always improves the relationship.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Perspective-Taking Exercises */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">04</span>
            Perspective-Taking Exercises
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Perspective-taking is the cognitive component of empathy &mdash; the deliberate
                mental act of stepping into another person&rsquo;s shoes and imagining the world
                from their point of view. Unlike emotional empathy (which is largely automatic),
                perspective-taking is a <strong>skill that can be practised and improved</strong>
                through regular, deliberate exercise.
              </p>

              <p>
                Research by Adam Galinsky at Columbia Business School has shown that deliberately
                practising perspective-taking improves negotiation outcomes, reduces stereotyping,
                increases creative problem-solving, and strengthens interpersonal relationships. It
                is one of the most practical and immediately applicable empathy tools you can
                develop.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    The &ldquo;What Would It Be Like If...&rdquo; Technique
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  The simplest and most powerful perspective-taking exercise is asking yourself:
                  &ldquo;What would it be like if I were in their position?&rdquo; But to be
                  effective, this question needs to go deeper than surface-level imagination. You
                  need to consider:
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Their background:</strong> What experience, training and history do
                      they bring to this situation?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Their pressures:</strong> What deadlines, financial pressures, or
                      personal issues might be affecting them right now?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Their fears:</strong> What are they worried about? What is the worst
                      outcome from their perspective?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Their goals:</strong> What are they trying to achieve? What does
                      success look like for them?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Their constraints:</strong> What limitations (budget, time, authority,
                      knowledge) are they operating within?
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Construction Perspective-Taking Scenarios
                  </p>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-white mb-2">
                      Scenario 1: The Difficult Client
                    </p>
                    <p className="text-sm text-white mb-2">
                      A domestic client is repeatedly questioning your work and checking everything
                      you do. Your instinct might be annoyance: &ldquo;Why do they not just trust
                      me?&rdquo;
                    </p>
                    <p className="text-sm text-white">
                      <strong>Perspective-take:</strong> This might be the biggest financial
                      commitment of their life. They have let a stranger into their home. They have
                      no way of judging the quality of your work because they do not understand
                      electrical installations. They may have been burned by a previous
                      tradesperson. Their questions are not about doubting your competence &mdash;
                      they are about managing their own anxiety.
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-white mb-2">
                      Scenario 2: The First-Year Apprentice
                    </p>
                    <p className="text-sm text-white mb-2">
                      A first-year apprentice keeps making the same mistake despite being shown
                      three times. You are getting frustrated.
                    </p>
                    <p className="text-sm text-white">
                      <strong>Perspective-take:</strong> Remember your own first year. Everything
                      was new. You were trying to learn dozens of things simultaneously while
                      managing the anxiety of being on site for the first time. The apprentice may
                      be too nervous to admit they do not understand. They may learn differently
                      from how you are teaching. Their mistake might be a symptom of information
                      overload, not lack of effort.
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-white mb-2">
                      Scenario 3: The Obstructive Site Manager
                    </p>
                    <p className="text-sm text-white mb-2">
                      The site manager keeps changing the schedule and seems to favour the
                      mechanical contractor over your electrical team. You feel sidelined.
                    </p>
                    <p className="text-sm text-white">
                      <strong>Perspective-take:</strong> The site manager is juggling fifteen
                      subcontractors, an angry client, a budget overrun and pressure from their
                      directors. The mechanical contractor may have a critical path issue that
                      genuinely requires priority. The manager is not deliberately sidelining you
                      &mdash; they are managing a hundred competing demands with insufficient
                      resources. Understanding this does not solve the scheduling problem, but it
                      changes your approach from adversarial to collaborative.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Daily Practice:</strong> Perspective-taking
                  becomes more natural with regular practice. Try this: once a day, choose someone
                  you interacted with and spend two minutes imagining the situation from their
                  perspective. What were they feeling? What pressures were they under? What did they
                  need from you? Over time, this exercise rewires your default response from
                  &ldquo;why are they being difficult?&rdquo; to &ldquo;what is their experience of
                  this situation?&rdquo;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: Cultural Sensitivity on Diverse Sites */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">05</span>
            Cultural Sensitivity on Diverse Sites
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The UK construction workforce is one of the most culturally diverse in the country.
                According to the Office for National Statistics, approximately 10% of the
                construction workforce was born outside the UK, with significant representation from
                Eastern Europe, South Asia, Africa and beyond. On many urban sites, you will work
                alongside colleagues from a dozen or more different cultural backgrounds.
              </p>

              <p>
                This diversity is a strength &mdash; diverse teams bring different perspectives,
                approaches and ideas that can improve problem-solving and innovation. But it also
                requires cultural sensitivity: the awareness that people from different backgrounds
                may communicate, express emotions and interpret social cues differently.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Globe className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Cultural Variations in Communication
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm font-medium text-white mb-1">Eye Contact</p>
                    <p className="text-sm text-white">
                      In British, American and most Western European cultures, direct eye contact
                      signals honesty, confidence and respect. In many East Asian, South Asian and
                      some African cultures, prolonged direct eye contact with a superior or elder
                      is considered disrespectful or aggressive. A colleague who avoids your gaze
                      may be showing you <em>more</em> respect, not less.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm font-medium text-white mb-1">Personal Space</p>
                    <p className="text-sm text-white">
                      Hall&rsquo;s proxemics zones vary significantly between cultures.
                      Mediterranean, Middle Eastern and Latin American cultures typically use closer
                      conversational distances than Northern European and East Asian cultures. A
                      colleague standing closer than you expect may simply be following their
                      cultural norm, not invading your space.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm font-medium text-white mb-1">Directness</p>
                    <p className="text-sm text-white">
                      Some cultures (Dutch, German, Israeli) value very direct communication. Others
                      (Japanese, Korean, many South Asian cultures) use more indirect communication,
                      where meaning is conveyed through context, tone and what is <em>not</em> said
                      as much as what is said. An indirect communicator saying &ldquo;that could be
                      difficult&rdquo; may actually mean &ldquo;no, that is not possible.&rdquo;
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm font-medium text-white mb-1">Emotional Expression</p>
                    <p className="text-sm text-white">
                      Some cultures (Italian, Brazilian, many African cultures) are highly
                      expressive with emotions &mdash; volume, gestures and facial expressions are
                      amplified. Other cultures (Japanese, Finnish, many Northern European cultures)
                      have stronger norms around emotional restraint. A colleague who seems
                      &ldquo;unemotional&rdquo; may simply express emotions more quietly, not less
                      deeply.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm font-medium text-white mb-1">Physical Contact</p>
                    <p className="text-sm text-white">
                      Handshakes, pats on the back and shoulder touches are common in British
                      construction culture. In some cultures, physical contact between colleagues
                      (particularly between men and women) is inappropriate. Some Muslim colleagues
                      may prefer not to shake hands with someone of the opposite sex. Always be
                      guided by the individual&rsquo;s cues rather than making assumptions.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <MessageCircle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Practical Principles for Cultural Sensitivity
                  </p>
                </div>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Observe before assuming.</strong> Watch how each individual
                      communicates rather than making assumptions based on their nationality or
                      appearance. People are individuals first and cultural representatives second.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Ask respectful questions.</strong> &ldquo;I want to make sure I am
                      communicating well with you. Is there anything I should know about how you
                      prefer to work?&rdquo; Most people appreciate being asked rather than having
                      assumptions imposed on them.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Adapt your style.</strong> Be flexible in your communication approach.
                      If someone communicates more indirectly, learn to read between the lines. If
                      someone is more expressive, do not misinterpret volume for aggression.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Focus on universal cues.</strong> Ekman&rsquo;s seven universal
                      expressions work across all cultures. Basic tone of voice, overall energy
                      level, and general body posture are also broadly cross-cultural. Use these
                      universal cues as your foundation.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Avoid stereotypes.</strong> Cultural tendencies are group-level
                      averages, not descriptions of individuals. Not every Japanese person is
                      indirect; not every Italian is expressive. Treat each person as an individual
                      while being aware of potential cultural differences.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Language Barriers:</strong> When working with
                  colleagues whose first language is not English, slow down your speech (do not
                  shout &mdash; volume does not help comprehension), use simple, clear language,
                  avoid idioms and slang, and check understanding by asking them to repeat key
                  points back in their own words. Be patient: communicating in a second language
                  under time pressure is cognitively demanding, and a moment of patience from you
                  can prevent a misunderstanding that causes a safety incident or project delay.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06: Key Takeaways */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">06</span>
            Key Takeaways
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Reading people is not about manipulation &mdash; it is about{' '}
                <strong>connection, safety and communication</strong>. The skills you have explored
                in this section &mdash; micro-expression recognition, body language reading, active
                listening, perspective-taking and cultural sensitivity &mdash; are the practical
                tools that turn empathetic understanding into empathetic action.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Summary of Key Principles</p>
                </div>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Ekman:</strong> Seven universal expressions; micro-expressions reveal
                      concealed emotions in fractions of a second
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Body language:</strong> Read clusters of signals in context, not
                      isolated gestures &mdash; posture, gestures, eye contact and proxemics all
                      contribute
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>RASA:</strong> Receive, Appreciate, Summarise, Ask &mdash; active
                      listening is the practical application of empathy
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Perspective-taking:</strong> &ldquo;What would it be like if...&rdquo;
                      builds cognitive empathy through regular practice
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Cultural sensitivity:</strong> Combine universal emotional awareness
                      with cultural humility on diverse UK sites
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">
                    Module 4 Complete &mdash; Coming Next: Module 5
                  </p>
                </div>
                <p className="text-sm text-white">
                  You have now completed Module 4: Motivation &amp; Empathy. You have explored
                  internal motivation, optimism and resilience, the science of empathy, and the
                  practical skills of reading people. In Module 5: Social Skills &amp; Applying EI,
                  you will learn how to apply all of these competencies in your daily professional
                  life &mdash; through effective communication, conflict management, leadership and
                  your personal EI development plan.
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
            <Link to="../ei-module-4-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Understanding Empathy
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../ei-module-5">
              Continue to Module 5
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
