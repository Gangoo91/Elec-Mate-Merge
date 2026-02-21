import {
  ArrowLeft,
  MessageCircle,
  CheckCircle,
  Radio,
  Users,
  ArrowRightLeft,
  Megaphone,
  HardHat,
  Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'cc-shannon-weaver',
    question:
      'In the Shannon-Weaver model, what term describes anything that distorts or interferes with the message during transmission?',
    options: ['Feedback', 'Encoding', 'Noise', 'Channel'],
    correctIndex: 2,
    explanation:
      'Noise is any factor that distorts, interrupts or degrades the message as it travels from sender to receiver. On a construction site, noise can be literal (angle grinders, generators) or figurative (jargon the receiver does not understand, cultural differences, or emotional distractions).',
  },
  {
    id: 'cc-ta-ego-states',
    question:
      'In Eric Berne&rsquo;s Transactional Analysis, which ego state is characterised by rational, fact-based responses without emotional bias?',
    options: ['Parent', 'Adult', 'Child', 'Supervisor'],
    correctIndex: 1,
    explanation:
      'The Adult ego state operates on logic, data and objective assessment. It processes information without the emotional judgement of the Parent state or the emotional reactivity of the Child state. Adult-to-Adult communication is the most effective mode for professional interactions on site.',
  },
  {
    id: 'cc-two-way-communication',
    question:
      'Which of the following is the best example of two-way communication on a construction site?',
    options: [
      'A safety notice pinned to the welfare cabin wall',
      'A toolbox talk where workers ask questions and the supervisor responds',
      'An email sent to all subcontractors with the weekly programme',
      'A fire alarm sounding to signal evacuation',
    ],
    correctIndex: 1,
    explanation:
      'A toolbox talk where workers ask questions and the supervisor responds is two-way communication because there is a message, a response, and feedback flowing in both directions. The other options are all one-way communication &mdash; information flows from sender to receiver with no mechanism for immediate feedback.',
  },
];

const faqs = [
  {
    question: 'Why do I need to learn communication theory? I communicate fine already.',
    answer:
      'Most people communicate adequately in familiar situations, but construction work constantly puts you in unfamiliar ones &mdash; new teams, new clients, high-pressure deadlines, conflict between trades. Understanding the theory behind communication gives you a framework for diagnosing what went wrong when a message fails to land. If you know about noise, encoding and feedback loops, you can identify whether the problem was your choice of words, the environment, the other person&rsquo;s state of mind, or the channel you used. Without that framework, you are left guessing. The ILM Level 2 standard specifically requires candidates to demonstrate an understanding of communication principles, not just the ability to talk to people.',
  },
  {
    question: 'What is the most common communication failure on construction sites?',
    answer:
      'Research consistently identifies the assumption of shared understanding as the most common failure. A site supervisor says &ldquo;make that good&rdquo; and assumes the operative knows what &ldquo;good&rdquo; means in this context. A design engineer issues a drawing revision and assumes all trades on site have seen it. A principal contractor sends a safety briefing by email and assumes everyone has read it. In Shannon-Weaver terms, these are all encoding failures &mdash; the sender has not translated their meaning into a message the receiver can decode accurately. The fix is always feedback: asking the receiver to confirm what they understood, rather than assuming the message arrived intact.',
  },
  {
    question: 'How does Transactional Analysis actually help me on site?',
    answer:
      'Transactional Analysis gives you a real-time diagnostic tool for conversations that are going wrong. If you notice a colleague has shifted into Critical Parent mode (&ldquo;You should have known that!&rdquo;), you can recognise that responding from your Child ego state (&ldquo;It&rsquo;s not my fault!&rdquo;) will escalate the situation. Instead, you can consciously respond from your Adult state (&ldquo;Let&rsquo;s look at what happened and work out how to fix it&rdquo;). This single shift &mdash; recognising the transaction and choosing your response &mdash; can prevent arguments, reduce conflict, and keep projects moving. It is particularly useful when dealing with clients, site managers, or anyone in a position of authority.',
  },
  {
    question: 'Is one-way communication always bad?',
    answer:
      'No. One-way communication is entirely appropriate in certain situations. Fire alarm signals, emergency evacuation procedures, statutory signage, and formal written notices all need to be one-way &mdash; clear, unambiguous, and non-negotiable. The problem arises when people use one-way communication where two-way communication is needed. Issuing instructions without checking understanding, sending emails about safety-critical changes without following up, or delivering toolbox talks as monologues without inviting questions &mdash; these are situations where the lack of a feedback loop creates risk. The skill is knowing which mode to use and when.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'The Shannon-Weaver model of communication was originally developed in which year?',
    options: ['1935', '1949', '1964', '1972'],
    correctAnswer: 1,
    explanation:
      'Claude Shannon and Warren Weaver published "A Mathematical Theory of Communication" in 1949 while working at Bell Telephone Laboratories. It was originally designed to improve the reliability of telephone and telegraph transmission, but became the foundational model for all communication theory.',
  },
  {
    id: 2,
    question:
      'In the Shannon-Weaver model, the process of converting thoughts into a transmittable form (words, gestures, drawings) is called:',
    options: ['Channelling', 'Decoding', 'Encoding', 'Feedback'],
    correctAnswer: 2,
    explanation:
      'Encoding is the process by which the sender converts their intended meaning into a form that can be transmitted &mdash; spoken words, written text, drawings, hand signals, or radio messages. The quality of encoding directly affects whether the receiver will understand the message correctly.',
  },
  {
    id: 3,
    question:
      'Which ILM Level 2 Unit specifically covers the principles of workplace communication?',
    options: ['Unit 8000-250', 'Unit 8000-274', 'Unit 8000-310', 'Unit 8000-412'],
    correctAnswer: 1,
    explanation:
      'ILM Level 2 Unit 8000-274 &mdash; "Developing Yourself as a Team Leader" &mdash; includes the requirement to understand and apply the principles of workplace communication. It defines effective communication as the exchange of information, ideas or feelings that results in a shared understanding between all parties.',
  },
  {
    id: 4,
    question: 'In Transactional Analysis, the Critical Parent ego state is characterised by:',
    options: [
      'Logical, fact-based responses',
      'Playful, spontaneous reactions',
      'Judgemental, rule-enforcing language',
      'Fearful, submissive behaviour',
    ],
    correctAnswer: 2,
    explanation:
      'The Critical Parent ego state communicates through judgement, rules, criticism and authority. Language patterns include &ldquo;You should&rdquo;, &ldquo;You must&rdquo;, &ldquo;That&rsquo;s wrong&rdquo;, and &ldquo;How many times do I have to tell you?&rdquo; While sometimes necessary for safety-critical instructions, overuse of Critical Parent triggers defensive Child responses in the receiver.',
  },
  {
    id: 5,
    question:
      'An electrician explains a fault to a client using technical jargon the client does not understand. In Shannon-Weaver terms, this is a failure of:',
    options: ['The channel', 'Encoding', 'Decoding', 'Feedback'],
    correctAnswer: 1,
    explanation:
      'This is an encoding failure. The electrician has converted their understanding of the fault into language (technical jargon) that the receiver (the client) cannot decode. Effective encoding requires the sender to consider the receiver&rsquo;s knowledge level and choose language, examples and explanations that the receiver can interpret correctly.',
  },
  {
    id: 6,
    question: 'Which of the following best describes two-way communication?',
    options: [
      'A message is sent from one person to another',
      'A message is sent and the receiver provides feedback to confirm understanding',
      'Two people send messages at the same time',
      'A message is sent using two different channels simultaneously',
    ],
    correctAnswer: 1,
    explanation:
      'Two-way communication is defined by the presence of a feedback loop &mdash; the receiver responds to the sender, confirming (or correcting) their understanding of the message. This allows the sender to verify that their message has been received and interpreted as intended, and to clarify or repeat if necessary.',
  },
  {
    id: 7,
    question:
      'A site supervisor responds to an apprentice&rsquo;s mistake by saying: &ldquo;You should know better than that by now!&rdquo; The apprentice replies: &ldquo;It wasn&rsquo;t my fault, the drawings were wrong!&rdquo; What Transactional Analysis pattern does this represent?',
    options: [
      'Adult to Adult',
      'Parent to Child / Child to Parent',
      'Nurturing Parent to Free Child',
      'Adult to Parent',
    ],
    correctAnswer: 1,
    explanation:
      'The supervisor is communicating from the Critical Parent ego state (judgemental, rule-enforcing), and the apprentice responds from the Adapted Child ego state (defensive, blame-shifting). This Parent-Child / Child-Parent pattern is a crossed transaction that typically escalates conflict. The productive alternative would be for either party to shift to Adult mode.',
  },
  {
    id: 8,
    question:
      'On a construction site, which of the following is the most effective way to reduce "noise" during a safety briefing?',
    options: [
      'Speak louder to overcome background machinery',
      'Hold the briefing in a quiet area, use clear language, and ask workers to repeat key points back',
      'Send a written email instead of speaking in person',
      'Use as much technical terminology as possible to sound authoritative',
    ],
    correctAnswer: 1,
    explanation:
      'Reducing noise requires addressing all forms of interference: physical (moving to a quiet area), semantic (using clear, jargon-free language), and psychological (checking understanding through feedback). Simply speaking louder only addresses physical noise. Written email removes the opportunity for immediate clarification. Technical jargon introduces semantic noise.',
  },
];

export default function CCModule1Section1() {
  useSEO({
    title: 'What Is Communication? | Communication & Confidence Module 1.1',
    description:
      'Understanding the Shannon-Weaver model, ILM Level 2 workplace communication principles, Eric Berne Transactional Analysis ego states, and one-way vs two-way communication with construction-specific examples.',
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
            <MessageCircle className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 1 &middot; SECTION 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            What Is Communication?
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Understanding the science of communication &mdash; the Shannon-Weaver model,
            Transactional Analysis, one-way vs two-way communication, and how these frameworks apply
            to everyday construction work
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Model:</strong> Shannon-Weaver (1949) &mdash; sender, encoder, channel,
                noise, decoder, receiver, feedback
              </li>
              <li>
                <strong>Framework:</strong> Eric Berne&rsquo;s TA &mdash; Parent, Adult, Child ego
                states
              </li>
              <li>
                <strong>Key distinction:</strong> One-way vs two-way communication and when to use
                each
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Safety:</strong> Miscommunication is a leading cause of construction
                incidents
              </li>
              <li>
                <strong>Teams:</strong> Understanding communication models prevents conflicts before
                they start
              </li>
              <li>
                <strong>Career:</strong> ILM Level 2 requires demonstrable communication competence
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Explain the Shannon-Weaver model and identify all eight components',
              'Define workplace communication using the ILM Level 2 Unit 8000-274 standard',
              'Describe Eric Berne\u2019s three ego states with construction-specific examples',
              'Distinguish between one-way and two-way communication and when each is appropriate',
              'Identify sources of noise that distort messages on construction sites',
              'Apply communication theory to real-world site scenarios including briefings, radio use and design coordination',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: The Shannon-Weaver Model */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">01</span>
            The Shannon-Weaver Model of Communication
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Every time you speak to a colleague, radio a message to a site office, explain a
                fault to a client, or read a drawing revision notice, you are engaged in a process
                that was first mapped out scientifically in 1949. That year, mathematician{' '}
                <strong>Claude Shannon</strong> and scientist <strong>Warren Weaver</strong>,
                working at Bell Telephone Laboratories in the United States, published{' '}
                <em>&ldquo;A Mathematical Theory of Communication&rdquo;</em> &mdash; a paper that
                would become the single most influential model in the entire field of communication
                studies.
              </p>

              <p>
                Shannon and Weaver were not trying to help people have better conversations. Their
                original goal was purely technical: to improve the reliability and efficiency of
                telephone and telegraph transmission. They wanted to understand how a message could
                be sent from one point to another with maximum accuracy and minimum loss of
                information. But the model they created turned out to be universally applicable
                &mdash; it describes every act of communication, from a two-way radio call on a
                building site to a face-to-face conversation with a client, from a written email to
                a hand signal across a noisy workshop.
              </p>

              <p>
                The Shannon-Weaver model identifies eight key components that are present in every
                communication event. Understanding these components gives you a diagnostic framework
                &mdash; when communication fails (and on a construction site, it fails regularly),
                you can trace the problem back to a specific component and fix it.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Radio className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    The Shannon-Weaver Model &mdash; Eight Components
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Sender (Information Source)</p>
                      <p className="text-sm text-white">
                        The person or entity who originates the message. On site, this could be a
                        supervisor issuing instructions, an architect issuing a drawing, or you
                        explaining a test result to a client.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Encoder (Transmitter)</p>
                      <p className="text-sm text-white">
                        The process of converting the sender&rsquo;s thoughts, ideas or intentions
                        into a transmittable form &mdash; spoken words, written text, drawings, hand
                        signals, or digital messages. The quality of encoding is critical: if you
                        choose the wrong words, use jargon the receiver does not understand, or draw
                        an ambiguous sketch, the message will be distorted before it even leaves
                        you.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Channel (Medium)</p>
                      <p className="text-sm text-white">
                        The medium through which the encoded message travels. In construction,
                        common channels include face-to-face speech, two-way radio, telephone,
                        email, drawings, specifications, signage, and digital platforms such as
                        project management software. Each channel has different strengths,
                        limitations and levels of noise susceptibility.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Message</p>
                      <p className="text-sm text-white">
                        The actual content being communicated &mdash; the information, instruction,
                        question, warning or idea that the sender intends to convey. The message
                        exists in whatever form the encoder has produced: spoken words, written
                        sentences, drawings, symbols or signals.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      5
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Noise</p>
                      <p className="text-sm text-white">
                        Any factor that distorts, interferes with or degrades the message during
                        transmission. Shannon originally meant electrical interference on a
                        telephone line, but in human communication, noise takes many forms: physical
                        noise (machinery, wind, distance), semantic noise (jargon, ambiguous
                        language, cultural differences), and psychological noise (stress,
                        distraction, prejudice, emotional state).
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      6
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Decoder</p>
                      <p className="text-sm text-white">
                        The process by which the receiver converts the transmitted message back into
                        meaning. The receiver must interpret the words, symbols, tone and context of
                        the message to reconstruct the sender&rsquo;s original intention. Decoding
                        is influenced by the receiver&rsquo;s knowledge, experience, language
                        skills, emotional state and assumptions.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      7
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Receiver (Destination)</p>
                      <p className="text-sm text-white">
                        The person or group for whom the message is intended. The receiver&rsquo;s
                        understanding of the message may or may not match the sender&rsquo;s
                        intention &mdash; the gap between the two is where communication failures
                        occur.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      8
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Feedback</p>
                      <p className="text-sm text-white">
                        The receiver&rsquo;s response back to the sender, confirming (or failing to
                        confirm) that the message has been received and understood correctly.
                        Feedback was added to the model by later scholars, but it is the component
                        that transforms one-way transmission into genuine two-way communication.
                        Without feedback, the sender has no way of knowing whether the message
                        arrived intact.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                The power of the Shannon-Weaver model lies in its simplicity and universality. Every
                communication event &mdash; no matter how informal or complex &mdash; can be broken
                down into these eight components. When a message fails to land, you can trace the
                failure to a specific point in the chain: Was the encoding poor (wrong words,
                unclear language)? Was the channel inappropriate (sending a complex instruction by
                text instead of explaining it face-to-face)? Was there noise (physical, semantic or
                psychological)? Did the receiver decode it incorrectly (different assumptions,
                different knowledge level)? Was there no feedback loop to catch the error?
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Construction Example: A Failed Radio Message
                </p>
                <p className="text-sm text-white">
                  A site supervisor (<strong>sender</strong>) needs an electrician to isolate a
                  circuit on the third floor. He picks up his two-way radio (
                  <strong>channel</strong>) and says: &ldquo;Can you kill the power on three?&rdquo;
                  (<strong>encoding</strong>). The message travels through the radio signal, but
                  there is heavy drilling nearby (<strong>noise</strong>). The electrician (
                  <strong>receiver</strong>) hears &ldquo;kill the power on free&rdquo; and is
                  confused (<strong>decoding failure</strong>). He does not respond (
                  <strong>no feedback</strong>), and the supervisor assumes the instruction has been
                  followed. Twenty minutes later, a plumber gets a shock from a live circuit that
                  should have been isolated. The model shows us exactly where the breakdown occurred
                  and what could have prevented it: clearer encoding (&ldquo;Please isolate the
                  lighting circuit on the third floor, distribution board DB-3A&rdquo;), noise
                  reduction (stepping away from the drilling), and mandatory feedback (&ldquo;Can
                  you repeat that back to me?&rdquo;).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: ILM Level 2 Definition of Workplace Communication */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">02</span>
            ILM Level 2: Defining Workplace Communication
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>Institute of Leadership &amp; Management (ILM)</strong> is one of the
                UK&rsquo;s leading awarding bodies for leadership and management qualifications.
                Their Level 2 qualification is widely recognised across construction and the trades
                as a foundation-level management credential. Unit 8000-274, &ldquo;Developing
                Yourself as a Team Leader&rdquo;, includes a specific learning outcome requiring
                candidates to understand the principles of effective workplace communication.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">ILM Level 2 Unit 8000-274 Definition:</strong>{' '}
                  <em>
                    &ldquo;Effective workplace communication is the exchange of information, ideas
                    or feelings between two or more people that results in a shared understanding
                    between all parties.&rdquo;
                  </em>
                </p>
              </div>

              <p>
                This definition is deceptively simple, but it contains three critical elements that
                many people overlook. First, it says <strong>&ldquo;exchange&rdquo;</strong> &mdash;
                not &ldquo;transmission&rdquo; or &ldquo;delivery&rdquo;. Communication is not
                something you do <em>to</em> someone; it is something you do <em>with</em> them. It
                requires participation from both sides. Second, it includes{' '}
                <strong>&ldquo;ideas or feelings&rdquo;</strong> alongside information. Workplace
                communication is not purely about facts and data &mdash; it also involves emotions,
                opinions, concerns and motivations. Ignoring the emotional content of communication
                is one of the most common mistakes leaders make. Third, and most importantly, it
                defines success as{' '}
                <strong>&ldquo;a shared understanding between all parties&rdquo;</strong>. This
                means communication has not occurred until both the sender and the receiver agree on
                what was meant. Simply sending a message is not communication &mdash; confirmed,
                mutual understanding is.
              </p>

              <p>
                The ILM standard also identifies the key barriers to effective workplace
                communication. These map directly onto the Shannon-Weaver model&rsquo;s concept of
                noise:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  ILM-Identified Barriers to Workplace Communication
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span className="text-sm text-white">
                      <strong className="text-white">Physical barriers:</strong> Distance between
                      people, noisy environments, poor signal on radios or phones, illegible
                      handwriting on job sheets
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span className="text-sm text-white">
                      <strong className="text-white">Language barriers:</strong> Technical jargon,
                      abbreviations, English as a second language, regional dialects, and the
                      assumption that everyone uses the same terminology
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span className="text-sm text-white">
                      <strong className="text-white">Emotional barriers:</strong> Stress, anger,
                      fear of speaking up, past negative experiences with a particular person, and
                      cultural norms around hierarchy and deference
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span className="text-sm text-white">
                      <strong className="text-white">Organisational barriers:</strong> Information
                      silos between departments, unclear chains of command, lack of formal
                      communication channels, and poor meeting culture
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span className="text-sm text-white">
                      <strong className="text-white">Perceptual barriers:</strong> Assumptions,
                      stereotypes, selective listening, and the tendency to hear what we expect to
                      hear rather than what is actually being said
                    </span>
                  </div>
                </div>
              </div>

              <p>
                Understanding the ILM definition gives you a clear benchmark for evaluating your own
                communication. After every important interaction &mdash; whether it is a site
                briefing, a client meeting, or a conversation with your line manager &mdash; you can
                ask yourself: <em>&ldquo;Did we achieve a shared understanding?&rdquo;</em> If the
                answer is no, or if you are not sure, then the communication was incomplete
                regardless of how clearly you think you spoke.
              </p>

              <p>
                This is a particularly important principle in construction, where the consequences
                of miscommunication can be severe. A misunderstood instruction can lead to rework
                costing thousands of pounds. A poorly communicated safety briefing can result in a
                serious injury. A failed coordination message between trades can set a programme
                back by weeks. The ILM standard is not asking you to be a polished public speaker
                &mdash; it is asking you to ensure that the people you communicate with actually
                understand what you mean.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Eric Berne's Transactional Analysis */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">03</span>
            Eric Berne&rsquo;s Transactional Analysis: Parent, Adult, Child
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                In 1964, Canadian-born psychiatrist <strong>Eric Berne</strong> published{' '}
                <em>&ldquo;Games People Play&rdquo;</em>, a groundbreaking book that introduced{' '}
                <strong>Transactional Analysis (TA)</strong> to a wide audience. Berne&rsquo;s
                central insight was that every person communicates from one of three{' '}
                <strong>ego states</strong> &mdash; internal psychological positions that shape how
                we speak, listen and respond. These ego states are not personality types; they are
                modes that every person shifts between, often unconsciously, depending on the
                situation, the other person, and their own emotional state.
              </p>

              <p>
                The three ego states are <strong>Parent</strong>, <strong>Adult</strong> and{' '}
                <strong>Child</strong>. Each has distinct characteristics, language patterns and
                effects on the people around you. Understanding these states gives you a real-time
                diagnostic tool: you can recognise which state you are operating from, which state
                the other person is in, and how to adjust your communication to achieve the outcome
                you want.
              </p>

              {/* Three Ego States */}
              <div className="space-y-4">
                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">The Parent Ego State</p>
                  </div>
                  <p className="text-sm text-white mb-3">
                    The Parent state contains the attitudes, behaviours and communication patterns
                    you absorbed from authority figures during childhood &mdash; parents, teachers,
                    older relatives, coaches. When you are in Parent mode, you are essentially
                    replaying those learned patterns. The Parent state has two sub-types:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                      <p className="text-xs font-medium text-rose-400 mb-2">Critical Parent</p>
                      <p className="text-sm text-white mb-2">
                        Judgemental, controlling, rule-enforcing. Uses language like &ldquo;You
                        should&rdquo;, &ldquo;You must&rdquo;, &ldquo;That&rsquo;s not good
                        enough&rdquo;, &ldquo;How many times do I have to tell you?&rdquo;
                      </p>
                      <p className="text-sm text-white">
                        <strong className="text-rose-400">On site:</strong> A supervisor who berates
                        an apprentice in front of the team for a wiring error: &ldquo;You should
                        know better than that by now! I&rsquo;ve shown you three times!&rdquo;
                      </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                      <p className="text-xs font-medium text-rose-400 mb-2">Nurturing Parent</p>
                      <p className="text-sm text-white mb-2">
                        Caring, protective, supportive. Uses language like &ldquo;Let me help
                        you&rdquo;, &ldquo;Don&rsquo;t worry&rdquo;, &ldquo;I&rsquo;ll sort it
                        out&rdquo;, &ldquo;Are you alright?&rdquo;
                      </p>
                      <p className="text-sm text-white">
                        <strong className="text-rose-400">On site:</strong> A mentor who notices
                        their apprentice is struggling and says: &ldquo;That&rsquo;s a tricky one
                        &mdash; let me show you how I do it, and then you can have another
                        go.&rdquo;
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">The Adult Ego State</p>
                  </div>
                  <p className="text-sm text-white mb-3">
                    The Adult state is the rational, objective, fact-based mode. It processes
                    information logically, without the emotional judgement of the Parent or the
                    emotional reactivity of the Child. The Adult state deals with the here and now,
                    assesses situations based on data, and communicates in a calm, measured way.
                  </p>
                  <p className="text-sm text-white mb-3">
                    Language patterns include: &ldquo;What are the facts?&rdquo;, &ldquo;Let&rsquo;s
                    look at the options&rdquo;, &ldquo;What happened and what can we do about
                    it?&rdquo;, &ldquo;I think the most practical solution is&hellip;&rdquo;
                  </p>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm text-white">
                      <strong className="text-rose-400">On site:</strong> After discovering that a
                      cable route clashes with a drainage pipe, an electrician contacts the project
                      manager and says: &ldquo;We&rsquo;ve got a clash at grid reference C4 on level
                      two. The drainage is running where our containment was planned. I can reroute
                      via the ceiling void, but it will add about 15 metres of tray. Can we get that
                      approved today so we don&rsquo;t hold up the plasterers?&rdquo; This is pure
                      Adult &mdash; facts, options, practical solution, clear request.
                    </p>
                  </div>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">The Child Ego State</p>
                  </div>
                  <p className="text-sm text-white mb-3">
                    The Child state contains the emotions, impulses and behavioural patterns from
                    your own childhood. When you are in Child mode, you are responding emotionally
                    rather than rationally. Like the Parent state, the Child has two sub-types:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                      <p className="text-xs font-medium text-rose-400 mb-2">Free Child</p>
                      <p className="text-sm text-white mb-2">
                        Spontaneous, creative, enthusiastic, playful. Uses language like &ldquo;That
                        would be brilliant!&rdquo;, &ldquo;I love that idea!&rdquo;, expressed
                        through energy, humour and excitement.
                      </p>
                      <p className="text-sm text-white">
                        <strong className="text-rose-400">On site:</strong> An electrician who gets
                        genuinely excited about a challenging installation: &ldquo;This is going to
                        be a cracking job &mdash; I&rsquo;ve never done a three-phase changeover
                        like this before!&rdquo;
                      </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                      <p className="text-xs font-medium text-rose-400 mb-2">Adapted Child</p>
                      <p className="text-sm text-white mb-2">
                        Compliant, anxious, rebellious, defensive. Uses language like &ldquo;It
                        wasn&rsquo;t my fault&rdquo;, &ldquo;Nobody told me&rdquo;, &ldquo;Whatever
                        you say&rdquo;, or simply withdraws and goes quiet.
                      </p>
                      <p className="text-sm text-white">
                        <strong className="text-rose-400">On site:</strong> An apprentice who is
                        criticised by a supervisor and responds defensively: &ldquo;Well nobody
                        showed me how to do it properly!&rdquo; Or an operative who disagrees with a
                        method statement but says nothing because they are afraid of the
                        consequences.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    The Key Insight: Complementary vs Crossed Transactions
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  Berne identified that communication flows smoothly when the transaction is{' '}
                  <strong>complementary</strong> &mdash; the response comes from the ego state that
                  the sender was addressing. For example, if a supervisor speaks from Adult
                  (&ldquo;What happened with that circuit?&rdquo;) and the electrician responds from
                  Adult (&ldquo;The RCD was tripping due to a neutral-earth fault on the ring
                  final&rdquo;), the transaction is complementary and communication continues
                  smoothly.
                </p>
                <p className="text-sm text-white">
                  Communication breaks down when the transaction is <strong>crossed</strong>. If the
                  supervisor speaks from Adult but the electrician responds from Child (&ldquo;Why
                  are you always blaming me?&rdquo;), the communication is derailed. Similarly, if
                  the supervisor shifts to Critical Parent (&ldquo;You should have found that fault
                  yesterday!&rdquo;), they are inviting a Child response and escalating conflict.
                  The most productive professional communication is <strong>Adult-to-Adult</strong>{' '}
                  &mdash; factual, solution-focused and free from emotional judgement.
                </p>
              </div>

              <p>
                Transactional Analysis is not about suppressing emotions or always being coldly
                logical. The Nurturing Parent and Free Child states both have positive roles &mdash;
                mentoring, encouragement, creativity and team spirit all draw on these states. The
                point is <strong>awareness</strong>: recognising which ego state you are in, which
                state the other person is in, and making a conscious choice about how to respond
                rather than reacting automatically. On a construction site, where pressure is high,
                tempers can flare, and the stakes are real, this awareness is a genuine professional
                skill.
              </p>
            </div>
          </div>
        </section>

        {/* Section 04: One-Way vs Two-Way Communication */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">04</span>
            One-Way vs Two-Way Communication
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                One of the most practical distinctions in communication theory is the difference
                between <strong>one-way</strong> and <strong>two-way</strong> communication. This
                distinction maps directly onto the Shannon-Weaver model: one-way communication is
                the original model without feedback; two-way communication includes the feedback
                loop. Understanding when to use each mode &mdash; and recognising when you are using
                the wrong one &mdash; is a fundamental communication competence.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Megaphone className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">One-Way Communication</p>
                  </div>
                  <p className="text-sm text-white mb-3">
                    Information flows in a single direction from sender to receiver. There is no
                    immediate mechanism for the receiver to respond, ask questions, or confirm
                    understanding. The sender must assume the message has been received and
                    interpreted correctly.
                  </p>
                  <p className="text-sm font-medium text-white mb-2">Construction Examples:</p>
                  <ul className="text-sm text-white space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Safety signage displayed on site hoardings</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Fire alarm signals and emergency sirens</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Written method statements issued to subcontractors</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Company-wide email announcements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Statutory notices (HSE poster, insurance certificates)</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <ArrowRightLeft className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">Two-Way Communication</p>
                  </div>
                  <p className="text-sm text-white mb-3">
                    Information flows in both directions. The receiver can respond, ask questions,
                    seek clarification and confirm their understanding. The sender can verify that
                    the message has been correctly received and adjust their communication if
                    necessary. This is the feedback loop in the Shannon-Weaver model.
                  </p>
                  <p className="text-sm font-medium text-white mb-2">Construction Examples:</p>
                  <ul className="text-sm text-white space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Toolbox talks with a Q&amp;A session</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Two-way radio conversations with read-back confirmation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Design team coordination meetings</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Client consultations and progress updates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        Supervisor-to-operative task briefings with &ldquo;repeat back&rdquo;
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <p>
                The critical point is that{' '}
                <strong>most workplace communication should be two-way</strong>. One-way
                communication is efficient &mdash; it is fast, requires less time, and can reach
                many people simultaneously &mdash; but it is inherently risky because the sender has
                no way of knowing whether the message was understood. Two-way communication takes
                more time but dramatically reduces the risk of misunderstanding.
              </p>

              <p>
                A common failure pattern in construction is using one-way communication where
                two-way is needed. A principal contractor sends an email about a critical programme
                change and assumes all subcontractors have read and understood it. A supervisor
                issues a verbal instruction during a noisy site induction and moves on without
                checking comprehension. A designer issues a revised drawing and does not verify that
                the installing electrician has seen the changes. In each case, the sender has
                transmitted a message but has not achieved the ILM definition of communication
                &mdash; a shared understanding between all parties.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">The Professional Standard:</strong> For any
                  safety-critical, quality-critical or programme-critical communication, always use
                  two-way communication with explicit feedback. This means asking the receiver to
                  confirm what they have understood, not just &ldquo;Do you understand?&rdquo;
                  (which people will always say yes to) but &ldquo;Can you tell me what you are
                  going to do?&rdquo; or &ldquo;Can you repeat the key instruction back to
                  me?&rdquo; This technique, known as <strong>closed-loop communication</strong>, is
                  standard practice in aviation, medicine and the military. It should be standard
                  practice on construction sites too.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Noise on Construction Sites */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">05</span>
            Understanding Noise: Why Messages Fail on Site
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Of all the components in the Shannon-Weaver model, <strong>noise</strong> is the one
                that causes the most communication failures in construction. This is because
                construction sites are inherently noisy environments &mdash; not just in the
                literal, physical sense, but in every sense that communication theory uses the term.
                Noise is any factor that distorts, degrades or interferes with the message between
                sender and receiver. On a construction site, noise comes in three distinct forms,
                and understanding all three is essential for effective communication.
              </p>

              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <p className="text-sm font-medium text-rose-400">Physical Noise</p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    The most obvious form. Angle grinders, core drills, generators, concrete pumps,
                    hammer drills, extraction fans, reversing alarms, wind on exposed upper floors
                    &mdash; construction sites are among the noisiest workplaces in any industry.
                    When the physical environment makes it difficult to hear, messages are lost or
                    distorted. Physical noise also includes poor radio signal, bad phone reception,
                    illegible handwriting on day sheets, and low-quality printouts of drawings.
                  </p>
                  <p className="text-sm text-white">
                    <strong className="text-rose-400">Mitigation:</strong> Move to a quieter area
                    for important conversations. Use visual aids (drawings, photos, marked-up plans)
                    to supplement verbal instructions. Ensure radios are properly maintained and on
                    the correct frequency. Follow up verbal instructions with a written confirmation
                    where the instruction is safety-critical.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <p className="text-sm font-medium text-rose-400">Semantic Noise</p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    Semantic noise occurs when the sender and receiver attach different meanings to
                    the same words or symbols. In construction, this is rife. A &ldquo;board&rdquo;
                    could mean a distribution board, a plasterboard sheet, a notice board, or a
                    board meeting. &ldquo;First fix&rdquo; means different things to different
                    trades. &ldquo;Make good&rdquo; is interpreted differently depending on the
                    trade, the context and the individual. Technical abbreviations (RCD, RCBO, MCB,
                    SWA, XLPE) are meaningless to clients and often unclear to operatives from other
                    trades. Regional slang and colloquialisms add another layer of confusion,
                    particularly on sites with a diverse workforce.
                  </p>
                  <p className="text-sm text-white">
                    <strong className="text-rose-400">Mitigation:</strong> Use plain English
                    whenever possible. Define technical terms the first time you use them. Avoid
                    slang and abbreviations when speaking to people outside your trade. When issuing
                    instructions, be specific: &ldquo;Isolate the lighting circuit at DB-3A on level
                    two&rdquo; is far clearer than &ldquo;kill the lights upstairs&rdquo;.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <p className="text-sm font-medium text-rose-400">Psychological Noise</p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    Psychological noise is the internal interference that affects how people send
                    and receive messages. Stress, fatigue, anxiety, anger, preoccupation with
                    personal problems, fear of authority, cultural conditioning, prejudice and
                    assumptions all act as psychological noise. A worker who is worried about a
                    family problem at home may hear an instruction but not process it. A supervisor
                    who is under programme pressure may deliver a safety briefing so quickly that
                    the content is lost. An apprentice who is intimidated by their supervisor may
                    not ask a clarifying question even when they do not understand.
                  </p>
                  <p className="text-sm text-white">
                    <strong className="text-rose-400">Mitigation:</strong> Be aware of your own
                    psychological state and how it affects your communication. Notice when others
                    seem distracted, stressed or withdrawn. Create an environment where people feel
                    safe to ask questions and admit they do not understand. Give important
                    communications enough time and space &mdash; do not rush safety briefings
                    because you are under pressure.
                  </p>
                </div>
              </div>

              <p>
                The construction industry has historically focused almost exclusively on reducing
                physical noise (hearing protection, noise assessments, quiet zones). But research
                shows that semantic and psychological noise cause at least as many communication
                failures as physical noise. A perfectly audible instruction delivered in jargon the
                receiver does not understand is just as failed as one drowned out by a concrete
                pump. A clearly worded email sent to a worker who is too stressed to read it
                properly is just as ineffective as one that never arrived.
              </p>

              <p>
                The most effective communicators in construction are those who address all three
                forms of noise simultaneously: they choose the right environment (reducing physical
                noise), use clear and appropriate language (reducing semantic noise), and are aware
                of the emotional and psychological state of their audience (reducing psychological
                noise).
              </p>
            </div>
          </div>
        </section>

        {/* Section 06: Construction Applications */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">06</span>
            Communication in Practice: Construction Applications
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The theoretical models we have covered &mdash; Shannon-Weaver, Transactional
                Analysis, one-way versus two-way communication &mdash; are not academic
                abstractions. They describe what happens every day on construction sites. Let us
                apply them to five common construction scenarios to see how theory translates into
                practice.
              </p>

              <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <HardHat className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">
                      Scenario 1: Site Induction Briefings
                    </p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    A site induction is one of the most important communication events in
                    construction. Every person who enters the site must receive and understand
                    critical safety information. Yet inductions are frequently delivered as one-way
                    monologues &mdash; a site manager reads from a script while a group of new
                    arrivals sit passively, sign the register, and walk onto site without retaining
                    half of what was said.
                  </p>
                  <p className="text-sm text-white">
                    <strong>Applying the models:</strong> The Shannon-Weaver model tells us that
                    without feedback, the sender cannot know if the message was received. The ILM
                    definition tells us that communication requires &ldquo;shared
                    understanding&rdquo;. Best practice inductions include two-way elements: asking
                    inductees to identify hazards on a site plan, quizzing them on emergency
                    procedures, and having them explain the permit-to-work system back to the
                    inductor. Transactional Analysis reminds us that delivering an induction from
                    Critical Parent (&ldquo;If I catch anyone without their PPE, you are off this
                    site&rdquo;) may produce compliance, but Adult-to-Adult delivery (&ldquo;These
                    are the hazards we have identified and here is how we manage them &mdash; do any
                    of you have experience with additional risks we should discuss?&rdquo;) produces
                    engagement and genuine understanding.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Radio className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">
                      Scenario 2: Two-Way Radio Communication
                    </p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    Two-way radios are ubiquitous on construction sites, yet they are one of the
                    most noise-prone channels available. The audio quality is limited, background
                    noise is constant, messages are brief by necessity, and there is no visual
                    channel (facial expressions, gestures, body language) to supplement the words.
                  </p>
                  <p className="text-sm text-white">
                    <strong>Applying the models:</strong> The Shannon-Weaver model makes it clear
                    that radio communication requires exceptionally careful encoding (clear,
                    specific language with no ambiguity), noise reduction (moving away from
                    machinery before transmitting), and mandatory feedback (the
                    &ldquo;read-back&rdquo; protocol used in aviation and the military, where the
                    receiver repeats the instruction back to the sender to confirm understanding).
                    Best practice radio protocol follows a structured format: identify yourself,
                    identify the receiver, state the message clearly, and request confirmation. For
                    example: &ldquo;Site office to Andy, site office to Andy. Please isolate the
                    lighting circuit at DB-3A, level two, and confirm when complete. Over.&rdquo;
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">
                      Scenario 3: Design Team Coordination
                    </p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    Design coordination &mdash; the process of ensuring that all building services
                    (electrical, mechanical, plumbing, fire, data) fit together without clashes
                    &mdash; is one of the most communication-intensive activities in construction.
                    It involves multiple parties (architects, structural engineers, M&amp;E
                    designers, subcontractors), multiple channels (BIM models, 2D drawings, emails,
                    meetings, RFIs), and enormous scope for misunderstanding.
                  </p>
                  <p className="text-sm text-white">
                    <strong>Applying the models:</strong> Semantic noise is the primary threat in
                    design coordination. Different disciplines use different terminology, different
                    drawing conventions, and different assumptions about priority and sequencing. An
                    architect who writes &ldquo;services to be concealed within the ceiling
                    void&rdquo; may not realise that the electrical, mechanical and plumbing
                    services combined will not physically fit in the available space. The
                    Shannon-Weaver model tells us that effective design coordination requires clear
                    encoding (standardised drawing conventions, BIM clash detection, explicit
                    specifications), appropriate channels (face-to-face coordination meetings
                    supplementing digital communication), and rigorous feedback loops (formal RFI
                    processes, design freeze sign-off, coordination drawing approval).
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Megaphone className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">Scenario 4: Toolbox Talks</p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    Toolbox talks are short, focused briefings delivered on site to address specific
                    safety topics, method statements, or project updates. They are one of the most
                    common communication events in construction, yet their effectiveness varies
                    enormously depending on how they are delivered.
                  </p>
                  <p className="text-sm text-white">
                    <strong>Applying the models:</strong> A toolbox talk delivered as a one-way
                    monologue (&ldquo;sign here to say you&rsquo;ve been told&rdquo;) satisfies the
                    legal requirement for information provision but does not achieve the ILM
                    definition of shared understanding. Transactional Analysis shows us that a
                    toolbox talk delivered from Critical Parent (&ldquo;If anyone does this wrong,
                    there&rsquo;ll be consequences&rdquo;) triggers Adapted Child responses
                    (disengagement, resentment, passive compliance). The most effective toolbox
                    talks use Adult-to-Adult communication: present the facts, explain the reasons,
                    invite questions, and use practical demonstrations where possible. Physical
                    noise should be minimised by holding talks in a quiet area, not next to running
                    plant.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <MessageCircle className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">
                      Scenario 5: Client Communication
                    </p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    Communicating with clients &mdash; whether domestic homeowners or commercial
                    building managers &mdash; presents unique challenges because the knowledge gap
                    between a qualified electrician and a lay client is enormous. What seems obvious
                    to you (&ldquo;The RCBO tripped because of a neutral-earth fault on the ring
                    final&rdquo;) is meaningless to most clients.
                  </p>
                  <p className="text-sm text-white">
                    <strong>Applying the models:</strong> Semantic noise is the primary barrier. The
                    sender (electrician) must encode the message in language the receiver (client)
                    can decode. This means translating technical information into plain English,
                    using analogies where helpful, and avoiding jargon entirely. Two-way
                    communication is essential: ask the client what they understand, check their
                    assumptions, and confirm that the agreed scope of work matches their
                    expectations. Transactional Analysis warns against falling into Nurturing Parent
                    mode (&ldquo;Don&rsquo;t worry about the technical stuff, I&rsquo;ll sort it all
                    out&rdquo;), which may feel reassuring but leaves the client uninformed and
                    potentially dissatisfied later when they receive an invoice for work they did
                    not understand.
                  </p>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Section Summary</p>
                </div>
                <p className="text-sm text-white mb-3">
                  Communication is not a soft skill &mdash; it is a technical competence with a
                  scientific framework behind it. The Shannon-Weaver model gives you a diagnostic
                  tool for identifying where communication breaks down. The ILM Level 2 standard
                  gives you a clear definition of what effective communication looks like. Eric
                  Berne&rsquo;s Transactional Analysis gives you a framework for understanding the
                  interpersonal dynamics that shape every conversation. And the distinction between
                  one-way and two-way communication tells you when feedback is essential.
                </p>
                <ul className="text-sm text-white space-y-1">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Every communication event has a sender, encoder, channel, message, noise,
                      decoder, receiver and feedback loop
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Effective communication = shared understanding between all parties (ILM)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Adult-to-Adult transactions produce the most productive professional
                      communication
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Two-way communication with closed-loop feedback is essential for
                      safety-critical messages
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Physical, semantic and psychological noise all degrade messages on site
                    </span>
                  </li>
                </ul>
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
        <Quiz title="Section 1 Knowledge Check" questions={quizQuestions} />

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
            <Link to="../cc-module-1-section-2">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
