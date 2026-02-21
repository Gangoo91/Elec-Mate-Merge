import {
  ArrowLeft,
  ShieldAlert,
  CheckCircle,
  Volume2,
  Brain,
  Languages,
  Eye,
  Wrench,
  AlertTriangle,
  Lightbulb,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'cc-barrier-noise-type',
    question:
      'A bricklayer shouts instructions to a colleague but the angle grinder drowns out his voice. In Shannon-Weaver terms, what type of noise is this?',
    options: [
      'Semantic noise',
      'Physical (mechanical) noise',
      'Psychological noise',
      'Cultural noise',
    ],
    correctIndex: 1,
    explanation:
      'This is physical (mechanical) noise &mdash; an environmental factor that literally prevents the signal from reaching the receiver. In Shannon and Weaver&rsquo;s model, physical noise is any external interference that disrupts the transmission channel. On construction sites, angle grinders, core drills, and generators are common sources of physical noise that block verbal communication.',
  },
  {
    id: 'cc-barrier-cdm-duty',
    question:
      'Under CDM 2015, who has a specific duty to ensure information is provided in a form that can be understood by those who need it?',
    options: [
      'The site labourer',
      'The principal designer and principal contractor',
      'The HSE inspector',
      'The client&rsquo;s solicitor',
    ],
    correctIndex: 1,
    explanation:
      'CDM 2015 places specific duties on the principal designer (Regulation 11) and the principal contractor (Regulation 13) to ensure that information necessary for health and safety is provided, shared, and communicated in a form that can be understood by everyone who needs it. This includes considering language barriers, literacy levels, and the use of visual aids where necessary.',
  },
  {
    id: 'cc-barrier-overcome',
    question:
      'Which of the following is the MOST effective single strategy for overcoming communication barriers on a multilingual construction site?',
    options: [
      'Speaking more loudly so everyone can hear',
      'Sending all instructions by email in English only',
      'Using visual aids, diagrams, and pictograms alongside clear verbal instructions',
      'Assuming everyone understands because they nodded',
    ],
    correctIndex: 2,
    explanation:
      'Visual aids, diagrams, and pictograms are the most effective single strategy because they transcend language differences, reinforce verbal messages, and provide a permanent reference. HSE guidance specifically recommends combining visual communication methods with simple, clear verbal instructions on multilingual sites. Speaking more loudly does not overcome a language barrier, and assuming understanding from a nod is a dangerous perceptual error.',
  },
];

const faqs = [
  {
    question: 'What is the difference between a communication barrier and Shannon-Weaver "noise"?',
    answer:
      'They are closely related concepts but operate at different levels. Shannon and Weaver&rsquo;s "noise" is a broad term for anything that interferes with the transmission of a message from sender to receiver &mdash; it was originally defined in their 1948 mathematical model of communication. Communication barriers, as categorised by the ILM Level 2 framework, are a more detailed classification of the types of noise that occur in real-world workplace communication. Physical noise (machinery, distance) maps directly to Shannon-Weaver noise, but the ILM framework adds psychological, semantic, cultural, and perceptual categories that go beyond the original model. In practice, understanding both frameworks helps you identify and address the full range of obstacles to effective communication on site.',
  },
  {
    question: 'How does CDM 2015 address communication barriers on construction sites?',
    answer:
      'The Construction (Design and Management) Regulations 2015 place specific duties on duty holders to ensure effective communication. Regulation 4 requires cooperation and coordination between all duty holders. Regulation 8 requires the principal designer to plan, manage, and monitor the pre-construction phase, including ensuring that relevant information is prepared and provided in a form that others can understand. Regulation 13 requires the principal contractor to ensure that information is provided to workers in a comprehensible form. Schedule 2 requires the construction phase plan to include arrangements for communication between parties. In practice, this means site inductions must account for language barriers, safety signage must use universal symbols, and method statements must be accessible to all workers.',
  },
  {
    question: 'What practical steps can I take to overcome jargon barriers between trades on site?',
    answer:
      'Jargon between trades is a semantic barrier that can cause serious misunderstandings. Practical steps include: using full technical terms rather than abbreviations when speaking to other trades (e.g. say "residual current device" not "RCD" when talking to a plumber); creating a shared glossary of terms for multi-trade projects; using diagrams and drawings to illustrate what you mean rather than relying on verbal descriptions alone; confirming understanding by asking the other person to repeat back the key points in their own words; and flagging safety-critical terminology clearly during toolbox talks. Remember that what is obvious jargon to you may be completely unfamiliar to someone from a different trade background.',
  },
  {
    question: 'Can wearing PPE really affect communication enough to cause safety incidents?',
    answer:
      'Yes, and this is well documented. Ear defenders and hearing protection reduce the ability to hear verbal warnings, instructions, and alarms &mdash; HSE research indicates that hearing protection can reduce speech intelligibility by 20&ndash;50% depending on the type and fit. Full-face respirators and dust masks muffle speech and obscure facial expressions, removing important nonverbal cues. Safety goggles and face shields can fog up and restrict the wearer&rsquo;s ability to see hand signals or read lip movements. Hard hats with visors can obscure the face. The solution is not to remove PPE, but to adapt your communication methods: use hand signals, visual boards, two-way radios, or move to a quieter area for critical instructions. Always confirm understanding when PPE is being worn.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'According to the ILM Level 2 framework, which of the following is a psychological barrier to communication?',
    options: [
      'A noisy generator running next to the site cabin',
      'An apprentice who is too anxious to ask a question during the toolbox talk',
      'A safety sign printed in a language the worker cannot read',
      'Two workers standing 50 metres apart on a large site',
    ],
    correctAnswer: 1,
    explanation:
      'Anxiety about speaking up is a psychological barrier &mdash; it arises from the individual&rsquo;s internal emotional state rather than from external physical conditions. The noisy generator is a physical barrier, the untranslated sign is a semantic/cultural barrier, and the distance is a physical barrier. Psychological barriers also include stress, low confidence, past negative experiences, and preoccupation with other worries.',
  },
  {
    id: 2,
    question: 'In Shannon and Weaver&rsquo;s communication model, what does "noise" refer to?',
    options: [
      'Only loud sounds on a construction site',
      'Any interference that distorts or prevents the message from being received as intended',
      'The tone of voice used by the sender',
      'Background music in a meeting room',
    ],
    correctAnswer: 1,
    explanation:
      'In the Shannon-Weaver model, "noise" is defined broadly as any interference that distorts or prevents the message from being accurately received. This includes physical noise (sounds, environmental interference), semantic noise (jargon, ambiguous language), and psychological noise (stress, preconceptions). It is not limited to audible sound &mdash; it encompasses anything that disrupts the communication process at any stage.',
  },
  {
    id: 3,
    question:
      'A site supervisor gives a briefing in English but three workers speak Polish as their first language and understand only basic English. What type of barrier is this?',
    options: [
      'Physical barrier',
      'Perceptual barrier',
      'Semantic and cultural barrier',
      'Psychological barrier',
    ],
    correctAnswer: 2,
    explanation:
      'This is both a semantic barrier (the language itself prevents full understanding of the words) and a cultural barrier (different linguistic backgrounds create different frames of reference). The ILM framework recognises that language differences on multilingual sites combine semantic and cultural elements. CDM 2015 requires the principal contractor to ensure information is provided in a form workers can understand, which may include translated materials, interpreters, or visual aids.',
  },
  {
    id: 4,
    question:
      'Which of the following is an example of a perceptual barrier on a construction site?',
    options: [
      'A fire alarm that is too quiet to hear in the workshop',
      'A supervisor who assumes a young apprentice has nothing useful to contribute to a safety discussion',
      'A method statement written in technical jargon',
      'Dust in the air making it hard to see hand signals',
    ],
    correctAnswer: 1,
    explanation:
      'A perceptual barrier occurs when preconceptions, biases, or assumptions filter how someone sends or receives a message. The supervisor assuming the apprentice has nothing to contribute is a perceptual barrier based on age bias &mdash; it prevents the apprentice&rsquo;s message from being received fairly. The quiet alarm is physical, the jargon is semantic, and the dust is physical. Perceptual barriers are particularly dangerous because the person holding the bias is often unaware of it.',
  },
  {
    id: 5,
    question:
      'HSE guidance recommends which approach for communicating safety information on multilingual construction sites?',
    options: [
      'Provide all documents in English only and require workers to translate them themselves',
      'Use a combination of universal symbols, pictograms, translated key documents, and buddy systems',
      'Hire only English-speaking workers to avoid communication issues',
      'Rely entirely on written method statements without verbal briefings',
    ],
    correctAnswer: 1,
    explanation:
      'HSE guidance recommends a multi-layered approach for multilingual sites: universal safety symbols and pictograms that do not rely on language, translated key safety documents, buddy or mentor systems where a bilingual worker supports colleagues, visual demonstrations during inductions and toolbox talks, and confirmation checks to verify understanding. Requiring English-only communication fails the duty under CDM 2015, and written-only communication misses the 93% of meaning conveyed through nonverbal and vocal channels (as discussed in Section 2 on the Mehrabian principle).',
  },
  {
    id: 6,
    question:
      'How does wearing ear defenders create a communication barrier, and what is the recommended mitigation?',
    options: [
      'They create a psychological barrier; the solution is to remove them during conversations',
      'They create a physical barrier by reducing speech intelligibility; the solution is to use hand signals, visual aids, or move to a quieter area for important instructions',
      'They create a semantic barrier; the solution is to write everything down',
      'They do not create a barrier because modern ear defenders allow normal conversation',
    ],
    correctAnswer: 1,
    explanation:
      'Ear defenders create a physical barrier by attenuating sound, which reduces speech intelligibility by 20&ndash;50%. The recommended mitigation is never to remove PPE, but to adapt communication methods: use pre-agreed hand signals for common instructions, use visual message boards, use two-way radio systems with ear-defender-compatible headsets, or move to a designated quiet area for detailed briefings. Some modern electronic ear defenders can amplify speech while attenuating harmful noise, but these are not yet standard on all sites.',
  },
  {
    id: 7,
    question:
      'An electrician tells a plumber to "check the CPC is continuous to the MET" but the plumber does not understand. What type of barrier has occurred?',
    options: [
      'Physical barrier',
      'Cultural barrier',
      'Semantic barrier (trade-specific jargon)',
      'Psychological barrier',
    ],
    correctAnswer: 2,
    explanation:
      'This is a semantic barrier caused by trade-specific jargon. "CPC" (circuit protective conductor) and "MET" (main earthing terminal) are standard electrical terms but are meaningless to most plumbers. Semantic barriers occur when the sender uses words, acronyms, or technical language that the receiver does not understand. The solution is to use plain language, explain technical terms when speaking to other trades, and use diagrams where possible.',
  },
  {
    id: 8,
    question:
      'Which regulation within CDM 2015 specifically requires the principal contractor to ensure welfare and communication arrangements are in place for all workers?',
    options: [
      'Regulation 4 (Client duties)',
      'Regulation 8 (Principal designer duties)',
      'Regulation 13 (Principal contractor duties)',
      'Regulation 22 (Welfare facilities)',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 13 of CDM 2015 sets out the duties of the principal contractor, which include ensuring that information is provided to every worker on site in a comprehensible form, that arrangements are in place for cooperation and coordination, and that workers are consulted on health and safety matters. While Regulation 4 covers client duties, Regulation 8 covers the principal designer, and Regulation 22 covers welfare facilities, it is Regulation 13 that specifically addresses the principal contractor&rsquo;s duty to ensure communication reaches all workers.',
  },
];

export default function CCModule1Section4() {
  useSEO({
    title: 'Communication Barriers & How to Overcome Them | Communication & Confidence Module 1.4',
    description:
      'ILM Level 2 barrier framework, Shannon-Weaver noise concept, HSE communication guidance, CDM 2015 requirements, and practical strategies for overcoming barriers on construction sites.',
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
            <ShieldAlert className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 1 &middot; SECTION 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Communication Barriers &amp; How to Overcome Them
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            ILM Level 2 barrier framework, Shannon&ndash;Weaver &ldquo;noise&rdquo; applied to real
            barriers, HSE communication guidance, CDM 2015 duties, and practical strategies for
            construction sites
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>5 barrier types:</strong> Physical, psychological, semantic, cultural,
                perceptual
              </li>
              <li>
                <strong>Shannon&ndash;Weaver:</strong> &ldquo;Noise&rdquo; = anything disrupting the
                message
              </li>
              <li>
                <strong>CDM 2015:</strong> Legal duty to communicate in a comprehensible form
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>PPE:</strong> Ear defenders reduce speech intelligibility by 20&ndash;50%
              </li>
              <li>
                <strong>Multilingual teams:</strong> Use pictograms, buddy systems, visual aids
              </li>
              <li>
                <strong>Jargon:</strong> Explain terms when speaking to other trades
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Identify and classify the five ILM Level 2 communication barrier types with construction examples',
              'Explain how Shannon-Weaver "noise" applies to real-world communication breakdowns on site',
              'Describe the communication duties placed on duty holders by CDM 2015',
              'Apply HSE communication guidance to manage multilingual and diverse workforces',
              'Evaluate how PPE, site conditions, and trade jargon create barriers and propose practical solutions',
              'Develop strategies to confirm understanding and close the feedback loop in high-risk environments',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: What Is a Communication Barrier? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">01</span>
            What Is a Communication Barrier?
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A communication barrier is anything that prevents a message from being sent,
                received, or understood as the sender intended. In Section 1, we introduced Shannon
                and Weaver&rsquo;s communication model &mdash; the linear process of{' '}
                <strong>
                  sender &rarr; encoding &rarr; channel &rarr; decoding &rarr; receiver
                </strong>
                . That model included a critical element: <strong>noise</strong>.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Shannon&ndash;Weaver &ldquo;Noise&rdquo; Revisited
                </p>
                <p className="text-sm text-white">
                  In the original 1948 model, Claude Shannon and Warren Weaver defined{' '}
                  <strong>noise</strong> as any interference that distorts or degrades the signal
                  between the information source and the destination. They were working on telephone
                  signal quality, but the concept applies directly to every conversation on a
                  building site. The five barrier types we cover in this section are all forms of
                  &ldquo;noise&rdquo; in the Shannon&ndash;Weaver sense &mdash; they each disrupt
                  communication at a different point in the model.
                </p>
              </div>

              <p>
                On construction sites, barriers are not just an inconvenience &mdash; they are a{' '}
                <strong>safety risk</strong>. A misheard instruction near live electrical equipment,
                an untranslated method statement, or an apprentice too intimidated to ask a
                clarifying question can all lead to injuries, near-misses, or fatalities.
                Understanding barrier types is the first step to eliminating them.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: The Five ILM Level 2 Barrier Types */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">02</span>
            The Five ILM Level 2 Barrier Types
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The ILM (Institute of Leadership &amp; Management) Level 2 framework classifies
                communication barriers into five categories. Each type disrupts the communication
                process at a different stage of the Shannon&ndash;Weaver model. Below is a
                structured breakdown with construction-specific examples for each.
              </p>

              {/* 1. Physical Barriers */}
              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Volume2 className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">1. Physical Barriers</p>
                </div>
                <p className="text-sm text-white mb-3">
                  Physical barriers are external, environmental factors that prevent the message
                  from physically reaching the receiver. In Shannon&ndash;Weaver terms, they are{' '}
                  <strong>channel noise</strong> &mdash; interference in the transmission medium
                  itself.
                </p>
                <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                  <p className="text-xs font-medium text-white mb-2">Construction Examples</p>
                  <ul className="text-sm text-white space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        Angle grinders, core drills, and generators drowning out verbal instructions
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        Ear defenders and hearing protection reducing speech intelligibility by
                        20&ndash;50%
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        Workers on different floors or opposite ends of a large site, out of earshot
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        Full-face respirators and dust masks muffling speech and obscuring facial
                        expressions
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        Poor mobile phone signal in basements, tunnels, or steel-framed buildings
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* 2. Psychological Barriers */}
              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Brain className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">2. Psychological Barriers</p>
                </div>
                <p className="text-sm text-white mb-3">
                  Psychological barriers arise from the mental and emotional state of the sender or
                  receiver. They affect how a person <strong>encodes</strong> (formulates) or{' '}
                  <strong>decodes</strong> (interprets) a message, even when the channel is clear.
                </p>
                <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                  <p className="text-xs font-medium text-white mb-2">Construction Examples</p>
                  <ul className="text-sm text-white space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        An apprentice too anxious or intimidated to ask a question during a toolbox
                        talk
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        A worker stressed about a personal issue, unable to concentrate on a safety
                        briefing
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        Fear of being mocked for raising a safety concern &mdash; &ldquo;don&rsquo;t
                        be soft&rdquo; culture
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        Low confidence leading a worker to avoid reporting a near-miss or defect
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        Information overload during a long induction, causing workers to switch off
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* 3. Semantic Barriers */}
              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Wrench className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">3. Semantic Barriers</p>
                </div>
                <p className="text-sm text-white mb-3">
                  Semantic barriers occur when the words, symbols, or language used by the sender
                  carry a different meaning for the receiver. The signal arrives intact, but the{' '}
                  <strong>decoding</strong> produces a different message from the one intended.
                </p>
                <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                  <p className="text-xs font-medium text-white mb-2">Construction Examples</p>
                  <ul className="text-sm text-white space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        An electrician telling a plumber to &ldquo;check the CPC is continuous to
                        the MET&rdquo; &mdash; meaningless trade jargon to the plumber
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        A method statement written in dense legal language that a site operative
                        cannot follow
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        Regional slang or abbreviations that mean different things in different
                        parts of the UK (e.g. &ldquo;chase&rdquo; can mean a wall channel or to
                        pursue)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        Acronyms used without explanation: RAMS, COSHH, SSOW, LOTO &mdash; familiar
                        to managers but not always to operatives
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* 4. Cultural Barriers */}
              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Languages className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">4. Cultural Barriers</p>
                </div>
                <p className="text-sm text-white mb-3">
                  Cultural barriers arise from differences in language, customs, values, and social
                  norms between people from different backgrounds. UK construction sites are
                  increasingly diverse &mdash; the CITB estimates that around 30% of the
                  construction workforce in London was born outside the UK.
                </p>
                <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                  <p className="text-xs font-medium text-white mb-2">Construction Examples</p>
                  <ul className="text-sm text-white space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        A multilingual workforce where safety briefings are delivered only in
                        English
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        Different cultural attitudes to authority &mdash; some workers may not
                        question a supervisor even if the instruction seems unsafe
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        Nonverbal gestures with different meanings across cultures (e.g. a head nod
                        does not always mean &ldquo;yes&rdquo; in every culture)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        Different expectations about directness &mdash; some cultures favour
                        indirect communication, which can be misread as evasiveness on a UK site
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* 5. Perceptual Barriers */}
              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Eye className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">5. Perceptual Barriers</p>
                </div>
                <p className="text-sm text-white mb-3">
                  Perceptual barriers occur when preconceptions, biases, stereotypes, or assumptions
                  filter how someone sends or receives a message. The receiver{' '}
                  <strong>decodes</strong> the message through a distorted lens without realising
                  it.
                </p>
                <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                  <p className="text-xs font-medium text-white mb-2">Construction Examples</p>
                  <ul className="text-sm text-white space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        A supervisor who dismisses a young apprentice&rsquo;s safety concern because
                        &ldquo;they don&rsquo;t have enough experience to know&rdquo;
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        Assuming a colleague has understood because they nodded, when they were
                        actually just being polite
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        Confirmation bias &mdash; a project manager who only hears information that
                        supports the current programme schedule
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        &ldquo;Halo effect&rdquo; &mdash; assuming a highly skilled electrician is
                        also a good communicator and team leader
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: HSE Communication Guidance & CDM 2015 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">03</span>
            HSE Communication Guidance &amp; CDM 2015 Requirements
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Effective communication on construction sites is not just good practice &mdash; it
                is a <strong>legal requirement</strong>. The Construction (Design and Management)
                Regulations 2015 (CDM 2015) and HSE guidance both place clear duties on employers
                and duty holders to ensure that safety information reaches everyone who needs it, in
                a form they can understand.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">
                  Key CDM 2015 Communication Duties
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Regulation 4 &mdash; Cooperation and coordination:</strong> All duty
                      holders must cooperate with each other and coordinate their work to ensure
                      health and safety. This requires effective two-way communication between all
                      parties.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Regulation 8 &mdash; Principal designer duties:</strong> The principal
                      designer must plan, manage, and monitor the pre-construction phase, ensuring
                      that relevant information is prepared and provided to other duty holders in a
                      form they can understand and act upon.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Regulation 13 &mdash; Principal contractor duties:</strong> The
                      principal contractor must ensure that every worker on site is provided with
                      information and instructions in a <strong>comprehensible form</strong>. This
                      includes making arrangements for consultation, providing site inductions, and
                      ensuring communication methods account for language and literacy levels.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Schedule 2 &mdash; Construction phase plan:</strong> The construction
                      phase plan must include arrangements for the exchange of design information
                      and communication between all parties, including how safety-critical
                      information will reach workers on the ground.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  HSE Guidance for Multilingual Sites
                </p>
                <p className="text-sm text-white mb-3">
                  HSE guidance specifically addresses communication challenges on sites with workers
                  from diverse linguistic backgrounds. Key recommendations include:
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong>Universal safety symbols and pictograms</strong> that do not rely on
                      any single language
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong>Translated key documents</strong> &mdash; risk assessments, method
                      statements, and emergency procedures in the main languages spoken on site
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong>Buddy or mentor systems</strong> where a bilingual worker supports
                      colleagues who are less confident in English
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong>Visual demonstrations</strong> during inductions and toolbox talks
                      rather than relying solely on verbal explanations
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong>Confirmation checks</strong> &mdash; asking workers to repeat key
                      safety points back in their own words, rather than simply asking &ldquo;do you
                      understand?&rdquo;
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">
                    The &ldquo;Nodding&rdquo; Trap
                  </p>
                </div>
                <p className="text-sm text-white">
                  One of the most dangerous perceptual errors in construction communication is
                  assuming that a nod or &ldquo;yes&rdquo; means genuine understanding. Research
                  shows that people frequently nod to signal politeness, attention, or a desire to
                  avoid embarrassment &mdash; not comprehension. This is especially common when
                  there is a language barrier or a power imbalance (e.g. worker&ndash;supervisor).
                  Always use <strong>confirmation checks</strong>: ask the person to explain back
                  what they need to do, rather than asking &ldquo;do you understand?&rdquo;
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: PPE, Site Conditions & Physical Barriers in Practice */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">04</span>
            PPE, Site Conditions &amp; Physical Barriers in Practice
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Physical barriers on construction sites are some of the most immediately obvious,
                yet they are frequently underestimated. PPE is essential for safety, but it creates
                a paradox: the very equipment that protects workers can also hinder the
                communication needed to keep them safe.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">How PPE Affects Communication</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center flex-shrink-0">
                      <Volume2 className="h-4 w-4 text-rose-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Ear Defenders</p>
                      <p className="text-sm text-white">
                        Reduce speech intelligibility by 20&ndash;50% depending on type and fit.
                        Passive ear defenders attenuate all sound equally, making it harder to
                        distinguish speech from background noise. Electronic ear defenders can
                        amplify speech while suppressing harmful noise, but are not yet standard
                        issue on all sites.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center flex-shrink-0">
                      <ShieldAlert className="h-4 w-4 text-rose-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Respirators &amp; Dust Masks</p>
                      <p className="text-sm text-white">
                        Muffle speech significantly, making words harder to hear. Full-face
                        respirators also obscure facial expressions, removing the nonverbal cues
                        (micro-expressions, lip reading) that account for a large portion of
                        face-to-face understanding.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center flex-shrink-0">
                      <Eye className="h-4 w-4 text-rose-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Safety Goggles, Visors &amp; Hard Hats
                      </p>
                      <p className="text-sm text-white">
                        Can fog up and restrict the ability to see hand signals. Hard hat brims and
                        attached visors can partially obscure the face, reducing the
                        receiver&rsquo;s ability to read facial expressions and lip movements.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Practical Solutions &mdash; Never Remove PPE
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  The answer is <strong>never</strong> to remove PPE to communicate. Instead, adapt
                  your methods:
                </p>
                <ul className="text-sm text-white space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      Use <strong>pre-agreed hand signals</strong> for common instructions (stop,
                      go, danger, come here)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      Use <strong>visual message boards</strong> at key locations for changing
                      information
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      Use <strong>two-way radio systems</strong> with ear-defender-compatible
                      headsets
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      Move to a <strong>designated quiet area</strong> for detailed briefings and
                      complex instructions
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      Always <strong>confirm understanding</strong> when PPE is being worn &mdash;
                      ask the person to repeat back the key instruction
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: Jargon, Multilingual Teams & Semantic Barriers */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">05</span>
            Jargon, Multilingual Teams &amp; Semantic Barriers
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Construction is one of the most jargon-heavy industries in the UK. Every trade has
                its own vocabulary, and even within a single trade the terminology can vary by
                region. When you add multilingual workforces into the mix, the potential for
                semantic and cultural barriers multiplies significantly.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Cross-Trade Jargon &mdash; Common Misunderstandings
                </p>
                <div className="space-y-2">
                  {[
                    {
                      term: 'CPC',
                      trade: 'Electrical',
                      meaning: 'Circuit protective conductor',
                      confusion: 'Meaningless to plumbers, joiners, and most general labourers',
                    },
                    {
                      term: 'First fix',
                      trade: 'General',
                      meaning:
                        'Differs between trades &mdash; for an electrician it means cabling before plaster; for a plumber it means pipework before boarding',
                      confusion: 'Assumed to be the same across all trades but timing differs',
                    },
                    {
                      term: 'Dead',
                      trade: 'Electrical',
                      meaning: 'Circuit is isolated and proved safe to work on',
                      confusion: 'Could be misinterpreted literally or cause unnecessary alarm',
                    },
                    {
                      term: 'LOTO',
                      trade: 'Safety',
                      meaning: 'Lock Out Tag Out',
                      confusion:
                        'Many operatives have never heard the acronym and do not know the procedure',
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded-lg ${i % 2 === 0 ? 'bg-white/[0.02]' : ''}`}
                    >
                      <div className="flex items-start gap-2 mb-1">
                        <span className="text-rose-400 font-mono text-xs font-semibold bg-rose-500/10 px-2 py-0.5 rounded">
                          {item.term}
                        </span>
                        <span className="text-white text-xs">({item.trade})</span>
                      </div>
                      <p className="text-sm text-white">{item.meaning}</p>
                      <p className="text-sm text-white mt-1">
                        <strong>Risk:</strong> {item.confusion}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">
                  Managing Multilingual Teams
                </p>
                <p className="text-sm text-white mb-3">
                  The HSE and CITB both provide guidance on communicating effectively with workers
                  whose first language is not English. Practical approaches include:
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Pictographic safety signage</strong> &mdash; use international symbols
                      (ISO 7010) that do not depend on reading ability
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Translated toolbox talk summaries</strong> in the main languages
                      spoken on site, kept short and focused on the key safety points
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Buddy systems</strong> &mdash; pair a bilingual worker with a
                      colleague who has limited English, so safety messages are relayed in both
                      languages
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Slow, clear, simple English</strong> &mdash; avoid idioms, sarcasm,
                      and complex sentence structures
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Demonstration over description</strong> &mdash; physically show the
                      correct procedure rather than relying on verbal explanation alone
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06: Strategies to Overcome Barriers */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">06</span>
            Practical Strategies to Overcome Barriers
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Identifying barriers is only useful if you can overcome them. The table below maps
                each ILM barrier type to practical strategies you can apply immediately on site. The
                key principle is{' '}
                <strong>
                  never assume your message has been received and understood &mdash; always close
                  the feedback loop
                </strong>
                .
              </p>

              <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                <div className="bg-rose-500/10 border-b border-white/10 p-3">
                  <p className="text-sm font-medium text-rose-400">
                    Barrier Type &rarr; Strategy Summary
                  </p>
                </div>
                {[
                  {
                    type: 'Physical',
                    strategies:
                      'Move to a quieter area; use hand signals; use two-way radios; use visual aids and message boards; schedule briefings away from noisy operations',
                  },
                  {
                    type: 'Psychological',
                    strategies:
                      'Create a blame-free reporting culture; encourage questions at toolbox talks; use I-messages (from Section 3); check in with individuals privately; break long inductions into shorter sessions',
                  },
                  {
                    type: 'Semantic',
                    strategies:
                      'Avoid jargon with other trades; spell out acronyms on first use; use plain English in method statements; provide a glossary for multi-trade projects; use diagrams alongside text',
                  },
                  {
                    type: 'Cultural',
                    strategies:
                      'Provide translated key documents; use pictograms and universal symbols; buddy systems for multilingual workers; respect different communication norms; never assume a nod means understanding',
                  },
                  {
                    type: 'Perceptual',
                    strategies:
                      'Listen actively without pre-judging; value contributions regardless of seniority; seek evidence rather than relying on assumptions; ask for feedback and act on it; challenge "halo effect" bias',
                  },
                ].map((row, i) => (
                  <div
                    key={i}
                    className={`p-3 sm:p-4 ${i % 2 === 0 ? 'bg-white/[0.02]' : ''} ${i < 4 ? 'border-b border-white/5' : ''}`}
                  >
                    <p className="text-sm font-medium text-rose-400 mb-1">{row.type}</p>
                    <p className="text-sm text-white">{row.strategies}</p>
                  </div>
                ))}
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    The Feedback Loop &mdash; Closing the Circle
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  Shannon and Weaver&rsquo;s original model was <strong>one-way</strong> &mdash; it
                  did not include feedback. Later scholars (notably Wilbur Schramm and David Berlo)
                  added the <strong>feedback loop</strong>, which is the receiver&rsquo;s response
                  back to the sender. On a construction site, the feedback loop is your most
                  powerful tool for overcoming barriers:
                </p>
                <ul className="text-sm text-white space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      Ask the receiver to <strong>repeat back</strong> the instruction in their own
                      words
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      Watch for <strong>nonverbal cues</strong> that suggest confusion (furrowed
                      brow, hesitation, looking at colleagues for help)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      Follow up verbal instructions with a{' '}
                      <strong>written or visual summary</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      Check back <strong>after the task has started</strong> to verify the
                      instruction was understood and followed correctly
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
        <Quiz title="Section 4 Knowledge Check" questions={quizQuestions} />

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
            <Link to="../cc-module-2-section-1">
              Next: Module 2
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
