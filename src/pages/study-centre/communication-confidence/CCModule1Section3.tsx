import {
  ArrowLeft,
  Palette,
  CheckCircle,
  MessageCircle,
  Users,
  ArrowRightLeft,
  ShieldCheck,
  HardHat,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice/study-centre/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'cc-s3-passive-vs-assertive',
    question:
      'A site manager asks you to work through your break to finish a second fix. You have a legitimate reason to decline. Which response best demonstrates assertive communication?',
    options: [
      '"Yeah, fine, whatever you say." (Passive)',
      '"No chance — you always dump extra work on me." (Aggressive)',
      '"I understand the pressure to finish, but I need my break to stay safe and focused. Can we look at priorities together?" (Assertive)',
      'Saying nothing but complaining to colleagues afterwards. (Passive-aggressive)',
    ],
    correctIndex: 2,
    explanation:
      'The assertive response acknowledges the other person\u2019s position, states your own needs clearly and calmly, and proposes a collaborative solution. It respects both parties without submitting, attacking, or going behind anyone\u2019s back.',
  },
  {
    id: 'cc-s3-i-message',
    question:
      'Which of the following is a correctly formed I-message using Thomas Gordon\u2019s three-part structure?',
    options: [
      '"You never label the boards properly — it\u2019s dangerous."',
      '"I feel frustrated when circuits are left unlabelled because it creates a safety risk during testing."',
      '"Someone needs to sort out the labelling on this job."',
      '"Why can\u2019t you just do it right the first time?"',
    ],
    correctIndex: 1,
    explanation:
      'A Gordon I-message has three parts: (1) I feel [emotion], (2) when [specific behaviour], (3) because [tangible effect]. The correct answer follows this structure precisely, keeping the focus on impact rather than blame.',
  },
  {
    id: 'cc-s3-ta-transactions',
    question:
      'An apprentice asks their supervisor, "Could you show me how to torque-test this connection?" The supervisor replies, "You should know that by now — what have you been doing all week?" What type of Transactional Analysis transaction is this?',
    options: [
      'Complementary — Adult to Adult',
      'Crossed — the apprentice spoke Adult-to-Adult but the supervisor replied Critical Parent-to-Child',
      'Ulterior — both messages carry a hidden meaning',
      'Complementary — Parent to Child',
    ],
    correctIndex: 1,
    explanation:
      'The apprentice\u2019s request is Adult-to-Adult (rational, information-seeking). The supervisor\u2019s dismissive, judgemental reply comes from Critical Parent directed at the Child ego state. Because the response goes to a different ego state than intended, this is a crossed transaction — the most common cause of communication breakdown on site.',
  },
];

const faqs = [
  {
    question: 'Is assertive communication the same as being confrontational?',
    answer:
      'No. Assertive communication is the opposite of confrontation. It means expressing your needs, opinions and boundaries clearly, calmly and respectfully — without aggression or submission. Confrontation typically involves aggression (raised voice, personal attacks, threats). An assertive person can disagree firmly whilst maintaining a professional, respectful tone. On a construction site, assertive communication is essential for raising safety concerns without creating conflict.',
  },
  {
    question: 'What are CITB behavioural competencies and why do they matter?',
    answer:
      'CITB (Construction Industry Training Board) behavioural competencies are a set of standards that define the professional behaviours expected of construction workers at every level. They cover areas such as communication, teamwork, problem-solving, respect for others, and personal responsibility. These competencies are embedded in NVQ/SVQ qualifications, CSCS card assessments, and site inductions. Demonstrating them is not optional — they are assessed during training, on-site observations, and professional reviews. Employers increasingly use behavioural competencies as criteria for promotion, contract renewal, and disciplinary decisions.',
  },
  {
    question: 'How do I use I-messages when English is not my first language?',
    answer:
      'The structure of an I-message translates well into most languages because it follows a simple formula: state your feeling, describe the specific behaviour, and explain the tangible effect. Even if your vocabulary is limited, the key principle is to start with "I" rather than "You". You can simplify: "I am worried when cables are left loose because someone could trip." Short, clear sentences are always more effective than complex ones — this applies regardless of your first language. Many multi-language construction teams find that I-messages actually reduce misunderstandings because they focus on observable facts rather than subjective judgements.',
  },
  {
    question:
      'What should I do if someone responds aggressively when I try to communicate assertively?',
    answer:
      'Stay calm and do not match their aggression — this would create a crossed transaction that escalates the conflict. Use the broken record technique: calmly repeat your key point without raising your voice or adding new arguments. Acknowledge their emotion ("I can see this is frustrating") without conceding your position. If the situation becomes threatening or abusive, disengage and report it through the site\u2019s grievance or welfare procedure. You have every right to a safe working environment, and persistent aggressive behaviour from a colleague or supervisor is a disciplinary matter under most site rules and CITB standards.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which communication style is characterised by indirect resistance, sarcasm and deliberate inefficiency?',
    options: ['Passive', 'Aggressive', 'Assertive', 'Passive-aggressive'],
    correctAnswer: 3,
    explanation:
      'Passive-aggressive communication avoids direct confrontation but expresses hostility indirectly — through sarcasm, backhanded comments, deliberate procrastination, or silent obstruction. On a construction site, this might look like an operative who agrees to a task but deliberately does it slowly or incorrectly to make a point.',
  },
  {
    id: 2,
    question: 'Thomas Gordon\u2019s I-message structure consists of three parts. What are they?',
    options: [
      'Accusation, demand, consequence',
      'Feeling, specific behaviour, tangible effect',
      'Problem, solution, deadline',
      'Observation, interpretation, recommendation',
    ],
    correctAnswer: 1,
    explanation:
      'Gordon\u2019s I-message formula is: (1) I feel [emotion], (2) when [specific observable behaviour], (3) because [tangible, concrete effect]. This structure keeps the focus on impact rather than blame, making the listener far less likely to become defensive.',
  },
  {
    id: 3,
    question:
      'In Eric Berne\u2019s Transactional Analysis, which ego state is characterised by rational, fact-based, emotionally neutral communication?',
    options: ['Parent (Nurturing)', 'Parent (Critical)', 'Adult', 'Child (Adapted)'],
    correctAnswer: 2,
    explanation:
      'The Adult ego state processes information objectively, makes decisions based on facts, and communicates without emotional bias. It is the ideal state for professional communication on site — asking clear questions, giving factual instructions, and solving problems collaboratively.',
  },
  {
    id: 4,
    question:
      'A supervisor says to an electrician: "You always make a mess of the first fix." Which communication style does this represent?',
    options: [
      'Assertive — it is direct and honest',
      'Aggressive — it uses a generalisation ("always") and attacks the person rather than the behaviour',
      'Passive — it avoids the real issue',
      'Passive-aggressive — it is indirect',
    ],
    correctAnswer: 1,
    explanation:
      'The word "always" is a generalisation that exaggerates the problem, and "you make a mess" attacks the person rather than describing a specific behaviour. An assertive alternative would be: "I noticed the cable routes in plot 12 don\u2019t follow the spec — can we walk through the drawing together?"',
  },
  {
    id: 5,
    question: 'What happens when a crossed transaction occurs in Transactional Analysis?',
    options: [
      'Both parties agree and communication flows smoothly',
      'Communication breaks down because the response comes from an unexpected ego state',
      'The conversation becomes more productive',
      'Both parties switch to their Adult ego state automatically',
    ],
    correctAnswer: 1,
    explanation:
      'A crossed transaction occurs when the response comes from a different ego state than the one addressed. For example, an Adult-to-Adult question receives a Critical Parent-to-Child reply. This mismatch breaks the expected communication pattern and typically results in conflict, withdrawal, or a defensive reaction.',
  },
  {
    id: 6,
    question:
      'Which CITB behavioural competency is most directly demonstrated when an electrician raises a safety concern with the site manager calmly and professionally?',
    options: [
      'Technical knowledge',
      'Communication and influencing',
      'Planning and organising',
      'Commercial awareness',
    ],
    correctAnswer: 1,
    explanation:
      'CITB\u2019s "Communication and influencing" competency covers the ability to convey information clearly, listen actively, adapt your style to the audience, and raise issues constructively. Calmly raising a safety concern with a site manager — without being passive or aggressive — is a textbook demonstration of this competency.',
  },
  {
    id: 7,
    question:
      'Convert this You-message to an I-message: "You never clean up after yourself on site." Which is the best conversion?',
    options: [
      '"I think you\u2019re lazy and inconsiderate."',
      '"I get concerned when materials are left on the floor after a task because it creates a trip hazard for the next trade."',
      '"I\u2019ve noticed you\u2019re the worst on site for tidiness."',
      '"I\u2019m telling you to clean up or I\u2019ll report you."',
    ],
    correctAnswer: 1,
    explanation:
      'The correct I-message follows Gordon\u2019s three-part structure: feeling ("I get concerned"), specific behaviour ("when materials are left on the floor after a task"), and tangible effect ("it creates a trip hazard for the next trade"). It addresses the behaviour without attacking the person.',
  },
  {
    id: 8,
    question:
      'An apprentice responds to constructive feedback by saying "Fine, whatever" and then deliberately works slowly for the rest of the day. This is an example of which communication style?',
    options: [
      'Passive — they did not argue back',
      'Assertive — they accepted the feedback',
      'Aggressive — they are being hostile',
      'Passive-aggressive — they verbally complied but behaviourally resisted',
    ],
    correctAnswer: 3,
    explanation:
      'Passive-aggressive behaviour is characterised by surface compliance combined with covert resistance. Saying "fine, whatever" appears to accept the feedback (passive), but deliberately working slowly is an indirect expression of resentment (aggressive). This pattern is common on construction sites and is destructive to team productivity and morale.',
  },
];

export default function CCModule1Section3() {
  useSEO({
    title: 'Communication Styles | Communication & Confidence Module 1.3',
    description:
      'Passive, aggressive, assertive and passive-aggressive communication styles. Thomas Gordon I-messages, Eric Berne Transactional Analysis, CITB behavioural competencies, and construction-site examples.',
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
            <Palette className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 1 &middot; SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Communication Styles
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Understanding the passive&ndash;aggressive&ndash;assertive&ndash;passive-aggressive
            continuum, I-messages, Transactional Analysis, and CITB behavioural competencies for
            construction professionals
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>4 Styles:</strong> Passive, aggressive, assertive, passive-aggressive
              </li>
              <li>
                <strong>I-Messages:</strong> Feeling + behaviour + effect &mdash; not blame
              </li>
              <li>
                <strong>TA:</strong> Parent, Adult, Child ego states &mdash; crossed vs
                complementary
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Assertive:</strong> The only style that protects safety and relationships
              </li>
              <li>
                <strong>CITB:</strong> Behavioural competencies are assessed, not optional
              </li>
              <li>
                <strong>Practice:</strong> Convert You-messages to I-messages daily
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Identify and describe the four communication styles: passive, aggressive, assertive and passive-aggressive',
              'Construct I-messages using Thomas Gordon\u2019s three-part structure for non-confrontational communication',
              'Explain Eric Berne\u2019s Transactional Analysis ego states and distinguish crossed from complementary transactions',
              'Apply CITB behavioural competencies to everyday site interactions',
              'Respond assertively to criticism, unreasonable requests and conflict on construction sites',
              'Direct apprentices and manage communication with main contractors using appropriate styles',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: The Four Communication Styles */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">01</span>
            The Four Communication Styles
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Every interaction on a construction site falls somewhere on a continuum of
                communication styles. Understanding where your own behaviour sits &mdash; and
                recognising the styles of others &mdash; is the first step toward more effective
                professional relationships.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">
                  Key Concept &mdash; The Communication Styles Continuum
                </p>
                <p className="text-sm text-white">
                  Communication styles are not fixed personality traits. Most people shift between
                  styles depending on context, stress levels and who they are speaking to. A
                  supervisor who is assertive with their team may become passive when speaking to
                  the main contractor. The goal is to develop{' '}
                  <strong>assertiveness as your default</strong> &mdash; the only style that
                  consistently protects both safety and working relationships.
                </p>
              </div>

              {/* 4-Style Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Passive */}
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center justify-center px-2 py-0.5 rounded bg-blue-500/30 text-blue-300 text-xs font-bold">
                      PASSIVE
                    </span>
                  </div>
                  <p className="text-sm text-white mb-3">
                    Avoids conflict by giving in, staying silent or agreeing to things they do not
                    want to do. Prioritises others&rsquo; needs over their own. Often driven by fear
                    of rejection or confrontation.
                  </p>
                  <div className="bg-black/30 rounded-lg p-3 mb-2">
                    <p className="text-xs font-medium text-rose-400 mb-1">Verbal Signs</p>
                    <p className="text-xs text-white">
                      &ldquo;It doesn&rsquo;t matter&rdquo; &middot; &ldquo;Whatever you
                      think&rdquo; &middot; &ldquo;I suppose so&rdquo; &middot; Frequent apologising
                    </p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <p className="text-xs font-medium text-rose-400 mb-1">Construction Example</p>
                    <p className="text-xs text-white">
                      An electrician notices the containment route clashes with the plumber&rsquo;s
                      pipework but says nothing, hoping someone else will raise it. The clash is
                      discovered during second fix, causing costly rework.
                    </p>
                  </div>
                </div>

                {/* Aggressive */}
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center justify-center px-2 py-0.5 rounded bg-red-500/30 text-red-300 text-xs font-bold">
                      AGGRESSIVE
                    </span>
                  </div>
                  <p className="text-sm text-white mb-3">
                    Dominates conversations through volume, intimidation, blame or personal attacks.
                    Prioritises their own needs at the expense of others. Often driven by
                    frustration, insecurity or a need for control.
                  </p>
                  <div className="bg-black/30 rounded-lg p-3 mb-2">
                    <p className="text-xs font-medium text-rose-400 mb-1">Verbal Signs</p>
                    <p className="text-xs text-white">
                      &ldquo;You always&hellip;&rdquo; &middot; &ldquo;You never&hellip;&rdquo;
                      &middot; &ldquo;That&rsquo;s your problem&rdquo; &middot; Raised voice,
                      interrupting, finger-pointing
                    </p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <p className="text-xs font-medium text-rose-400 mb-1">Construction Example</p>
                    <p className="text-xs text-white">
                      A supervisor shouts across a busy site: &ldquo;Who wired this? It&rsquo;s a
                      complete mess &mdash; do it again and don&rsquo;t waste my time.&rdquo; The
                      electrician feels humiliated and stops asking questions, increasing the risk
                      of future errors.
                    </p>
                  </div>
                </div>

                {/* Assertive */}
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center justify-center px-2 py-0.5 rounded bg-green-500/30 text-green-300 text-xs font-bold">
                      ASSERTIVE
                    </span>
                  </div>
                  <p className="text-sm text-white mb-3">
                    Expresses needs, opinions and boundaries clearly, calmly and respectfully.
                    Balances their own rights with respect for others. Listens actively and seeks
                    collaborative solutions. The <strong>target style</strong> for professional
                    communication.
                  </p>
                  <div className="bg-black/30 rounded-lg p-3 mb-2">
                    <p className="text-xs font-medium text-rose-400 mb-1">Verbal Signs</p>
                    <p className="text-xs text-white">
                      &ldquo;I think&hellip;&rdquo; &middot; &ldquo;I need&hellip;&rdquo; &middot;
                      &ldquo;I understand your point, and&hellip;&rdquo; &middot; Calm, steady tone
                      &middot; Eye contact without staring
                    </p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <p className="text-xs font-medium text-rose-400 mb-1">Construction Example</p>
                    <p className="text-xs text-white">
                      &ldquo;I&rsquo;ve checked the spec and the cable size doesn&rsquo;t match the
                      design load. I think we need to raise an RFI before we pull any more cable.
                      Can we discuss it with the project manager this afternoon?&rdquo;
                    </p>
                  </div>
                </div>

                {/* Passive-Aggressive */}
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center justify-center px-2 py-0.5 rounded bg-purple-500/30 text-purple-300 text-xs font-bold">
                      PASSIVE-AGGRESSIVE
                    </span>
                  </div>
                  <p className="text-sm text-white mb-3">
                    Appears to comply on the surface but expresses hostility indirectly through
                    sarcasm, deliberate inefficiency, procrastination, backhanded compliments or
                    silent obstruction. The most damaging style for team dynamics.
                  </p>
                  <div className="bg-black/30 rounded-lg p-3 mb-2">
                    <p className="text-xs font-medium text-rose-400 mb-1">Verbal Signs</p>
                    <p className="text-xs text-white">
                      &ldquo;Fine, whatever&rdquo; &middot; &ldquo;I didn&rsquo;t realise it was
                      that important&rdquo; &middot; Sarcastic tone &middot; Agreeing then not
                      following through &middot; &ldquo;Accidentally&rdquo; forgetting
                    </p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <p className="text-xs font-medium text-rose-400 mb-1">Construction Example</p>
                    <p className="text-xs text-white">
                      Asked to help a colleague with a containment run, the electrician says
                      &ldquo;Yeah, no problem&rdquo; but then takes twice as long as necessary,
                      &ldquo;forgets&rdquo; the correct fixings, and makes sarcastic comments about
                      &ldquo;doing everyone else&rsquo;s job&rdquo;.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Why Assertiveness Matters on Site
                </p>
                <p className="text-sm text-white">
                  Construction is a high-risk environment. Passive communicators fail to raise
                  safety concerns. Aggressive communicators create fear that stops others from
                  speaking up. Passive-aggressive communicators undermine trust and cooperation.
                  Only assertive communication enables the open, honest dialogue that keeps people
                  safe, maintains quality, and builds professional respect.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: I-Messages — Thomas Gordon's Model */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">02</span>
            I-Messages &mdash; Thomas Gordon&rsquo;s Model
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Thomas Gordon, an American clinical psychologist, developed the concept of
                <strong> I-messages</strong> (also called I-statements) as an alternative to
                <strong> You-messages</strong>. The principle is simple: when you start a sentence
                with &ldquo;You&hellip;&rdquo;, the listener immediately feels accused and becomes
                defensive. When you start with &ldquo;I&hellip;&rdquo;, you take ownership of your
                own response and keep the conversation constructive.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">
                  Key Framework &mdash; The Three-Part I-Message
                </p>
                <div className="grid sm:grid-cols-3 gap-3">
                  <div className="bg-black/30 rounded-lg p-3 text-center">
                    <p className="text-rose-400 font-semibold text-sm mb-1">Part 1: Feeling</p>
                    <p className="text-xs text-white">&ldquo;I feel [emotion]&hellip;&rdquo;</p>
                    <p className="text-xs text-white mt-1">
                      e.g. concerned, frustrated, worried, uncomfortable
                    </p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3 text-center">
                    <p className="text-rose-400 font-semibold text-sm mb-1">Part 2: Behaviour</p>
                    <p className="text-xs text-white">
                      &ldquo;&hellip;when [specific, observable behaviour]&hellip;&rdquo;
                    </p>
                    <p className="text-xs text-white mt-1">
                      e.g. when cables are left unclipped, when the programme changes without notice
                    </p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3 text-center">
                    <p className="text-rose-400 font-semibold text-sm mb-1">Part 3: Effect</p>
                    <p className="text-xs text-white">
                      &ldquo;&hellip;because [tangible, concrete effect]&rdquo;
                    </p>
                    <p className="text-xs text-white mt-1">
                      e.g. because it creates a trip hazard, because I cannot plan my work
                    </p>
                  </div>
                </div>
              </div>

              {/* Before/After Conversion Table */}
              <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                <div className="bg-rose-500/20 border-b border-rose-500/30 px-4 py-3">
                  <p className="text-sm font-semibold text-rose-300">
                    You-Message to I-Message Conversions
                  </p>
                </div>

                <div className="divide-y divide-white/5">
                  {[
                    {
                      youMsg: '"You never clean up after yourself."',
                      iMsg: '"I get concerned when materials are left on the floor after a task because it creates a trip hazard for the next trade."',
                    },
                    {
                      youMsg: '"You\'re always late to the toolbox talk."',
                      iMsg: '"I feel frustrated when the toolbox talk starts late because the whole team loses productive time and we have to repeat safety information."',
                    },
                    {
                      youMsg:
                        '"You didn\'t isolate that circuit properly — are you trying to kill someone?"',
                      iMsg: '"I feel worried when I find a circuit that hasn\'t been fully isolated because it puts anyone working downstream at risk of electric shock."',
                    },
                    {
                      youMsg: '"You never label anything on the board."',
                      iMsg: '"I feel uneasy when distribution boards are left unlabelled because it makes safe isolation impossible for the next person who needs to work on the circuits."',
                    },
                  ].map((item, i) => (
                    <div key={i} className="p-4 grid md:grid-cols-2 gap-3">
                      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                        <p className="text-xs font-medium text-red-400 mb-1">You-Message</p>
                        <p className="text-sm text-white">{item.youMsg}</p>
                      </div>
                      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                        <p className="text-xs font-medium text-green-400 mb-1">I-Message</p>
                        <p className="text-sm text-white">{item.iMsg}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <MessageCircle className="h-5 w-5 text-white" />
                  <p className="text-sm font-medium text-white">Why I-Messages Work</p>
                </div>
                <ul className="text-sm text-white space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      They <strong>reduce defensiveness</strong> because they describe impact, not
                      character
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      They <strong>focus on behaviour</strong>, which can be changed, rather than
                      personality, which cannot
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      They <strong>demonstrate professionalism</strong> &mdash; a key CITB
                      behavioural competency
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      They <strong>model good practice</strong> for apprentices and junior
                      operatives who learn communication habits from their supervisors
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Transactional Analysis — Eric Berne */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">03</span>
            Transactional Analysis &mdash; Eric Berne
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Eric Berne, a Canadian-born psychiatrist, developed{' '}
                <strong>Transactional Analysis (TA)</strong> in the 1950s as a way of understanding
                human communication. TA proposes that every person operates from one of three{' '}
                <strong>ego states</strong> at any given moment: Parent, Adult or Child. Effective
                communication depends on recognising which ego state you and the other person are
                in.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">
                  Key Framework &mdash; The Three Ego States
                </p>
                <div className="grid sm:grid-cols-3 gap-3">
                  <div className="bg-black/30 rounded-lg p-3">
                    <p className="text-rose-400 font-semibold text-sm mb-1">Parent</p>
                    <p className="text-xs text-white mb-2">
                      Behaviour, thoughts and feelings copied from parent figures or authority.
                    </p>
                    <p className="text-xs text-white">
                      <strong>Critical Parent:</strong> Judgemental, controlling, rule-enforcing.
                      &ldquo;You should know better.&rdquo;
                    </p>
                    <p className="text-xs text-white mt-1">
                      <strong>Nurturing Parent:</strong> Caring, supportive, protective. &ldquo;Let
                      me show you how.&rdquo;
                    </p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <p className="text-rose-400 font-semibold text-sm mb-1">Adult</p>
                    <p className="text-xs text-white mb-2">
                      Rational, fact-based, emotionally neutral. Processes information objectively
                      and makes decisions based on evidence.
                    </p>
                    <p className="text-xs text-white">
                      <strong>The ideal state</strong> for professional communication. &ldquo;What
                      does the spec say?&rdquo; &middot; &ldquo;Let&rsquo;s check the test
                      results.&rdquo;
                    </p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <p className="text-rose-400 font-semibold text-sm mb-1">Child</p>
                    <p className="text-xs text-white mb-2">
                      Behaviour, thoughts and feelings replayed from childhood.
                    </p>
                    <p className="text-xs text-white">
                      <strong>Free Child:</strong> Spontaneous, creative, playful.
                    </p>
                    <p className="text-xs text-white mt-1">
                      <strong>Adapted Child:</strong> Compliant or rebellious in response to
                      authority. &ldquo;Fine, I&rsquo;ll do it your way.&rdquo; (compliant) or
                      &ldquo;You can&rsquo;t make me.&rdquo; (rebellious)
                    </p>
                  </div>
                </div>
              </div>

              {/* Complementary vs Crossed */}
              <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                <div className="bg-rose-500/20 border-b border-rose-500/30 px-4 py-3">
                  <p className="text-sm font-semibold text-rose-300">
                    Complementary vs Crossed Transactions
                  </p>
                </div>

                <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/5">
                  {/* Complementary */}
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <ArrowRightLeft className="h-5 w-5 text-green-400" />
                      <p className="text-sm font-medium text-green-400">
                        Complementary Transaction
                      </p>
                    </div>
                    <p className="text-sm text-white mb-3">
                      The response comes from the ego state that was addressed. Communication flows
                      smoothly and predictably. These transactions can continue indefinitely.
                    </p>
                    <div className="bg-black/30 rounded-lg p-3 mb-2">
                      <p className="text-xs font-medium text-green-400 mb-1">
                        Example (Adult &rarr; Adult)
                      </p>
                      <p className="text-xs text-white">
                        <strong>Electrician:</strong> &ldquo;What size MCB is specified for this
                        ring final?&rdquo; (Adult to Adult)
                      </p>
                      <p className="text-xs text-white mt-1">
                        <strong>Supervisor:</strong> &ldquo;The design says 32A Type B. Let me grab
                        the schedule.&rdquo; (Adult to Adult)
                      </p>
                    </div>
                    <div className="bg-black/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-green-400 mb-1">
                        Example (Nurturing Parent &rarr; Child)
                      </p>
                      <p className="text-xs text-white">
                        <strong>Supervisor:</strong> &ldquo;Don&rsquo;t worry, everyone gets that
                        wrong at first. Let me walk you through it.&rdquo; (Nurturing Parent to
                        Child)
                      </p>
                      <p className="text-xs text-white mt-1">
                        <strong>Apprentice:</strong> &ldquo;Thanks &mdash; I really appreciate
                        that.&rdquo; (Child to Parent)
                      </p>
                    </div>
                  </div>

                  {/* Crossed */}
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <ArrowRightLeft className="h-5 w-5 text-red-400" />
                      <p className="text-sm font-medium text-red-400">Crossed Transaction</p>
                    </div>
                    <p className="text-sm text-white mb-3">
                      The response comes from a <strong>different ego state</strong> than the one
                      addressed. Communication breaks down. The conversation typically stalls,
                      escalates into conflict, or one party withdraws.
                    </p>
                    <div className="bg-black/30 rounded-lg p-3 mb-2">
                      <p className="text-xs font-medium text-red-400 mb-1">
                        Example (Adult &rarr; Adult, but Critical Parent &rarr; Child reply)
                      </p>
                      <p className="text-xs text-white">
                        <strong>Apprentice:</strong> &ldquo;Could you show me how to torque-test
                        this connection?&rdquo; (Adult to Adult)
                      </p>
                      <p className="text-xs text-white mt-1">
                        <strong>Supervisor:</strong> &ldquo;You should know that by now &mdash; what
                        have you been doing all week?&rdquo; (Critical Parent to Child)
                      </p>
                    </div>
                    <div className="bg-black/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-red-400 mb-1">What Happens Next?</p>
                      <p className="text-xs text-white">
                        The apprentice either withdraws (Adapted Child &mdash; stops asking
                        questions, increasing safety risk) or rebels (Free Child &mdash;
                        &ldquo;Fine, I&rsquo;ll work it out myself&rdquo;). Either way, learning
                        stops and the relationship is damaged.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  How to Uncross a Crossed Transaction
                </p>
                <p className="text-sm text-white">
                  If you receive a crossed transaction (e.g. you asked an Adult question and got a
                  Critical Parent reply),{' '}
                  <strong>resist the urge to respond from your Child ego state</strong>. Instead,
                  stay in Adult. Acknowledge the other person&rsquo;s emotion calmly and re-state
                  your original Adult request: &ldquo;I understand you&rsquo;re busy. I just need a
                  quick steer on the torque setting so I get it right first time.&rdquo; This
                  invites the other person back into their Adult state.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: CITB Behavioural Competencies */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">04</span>
            CITB Behavioural Competencies
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>Construction Industry Training Board (CITB)</strong> defines a set of
                behavioural competencies that apply across all construction roles and levels. These
                are not soft skills that you can choose to develop &mdash; they are formally
                assessed standards embedded in NVQ/SVQ qualifications, CSCS card applications, and
                on-site performance reviews.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">
                  Key Definition &mdash; Behavioural Competencies
                </p>
                <p className="text-sm text-white">
                  Behavioural competencies describe <strong>how</strong> you do your work, not
                  <strong> what</strong> you do. Two electricians might have identical technical
                  skills, but the one who communicates clearly, works cooperatively, takes
                  responsibility for problems, and treats others with respect will progress further
                  and create a safer working environment. CITB competencies make this distinction
                  formal and measurable.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck className="h-5 w-5 text-white" />
                  <p className="text-sm font-medium text-white">
                    Communication-Related CITB Competencies
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    {
                      competency: 'Communication &amp; Influencing',
                      detail:
                        'Conveying information clearly, listening actively, adapting your style to the audience, and raising issues constructively',
                    },
                    {
                      competency: 'Teamwork &amp; Cooperation',
                      detail:
                        'Working effectively with others, sharing information, supporting colleagues, and contributing to a positive team culture',
                    },
                    {
                      competency: 'Respect for Others',
                      detail:
                        'Treating all site personnel with dignity regardless of role, trade, background or experience level',
                    },
                    {
                      competency: 'Personal Responsibility',
                      detail:
                        'Taking ownership of your actions, admitting mistakes, seeking feedback, and acting on it without defensiveness',
                    },
                    {
                      competency: 'Problem-Solving',
                      detail:
                        'Identifying issues, gathering information, proposing solutions, and communicating them to the relevant people',
                    },
                    {
                      competency: 'Health, Safety &amp; Environment',
                      detail:
                        'Raising safety concerns proactively, challenging unsafe practices, and reporting near-misses without fear of reprisal',
                    },
                  ].map((item, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-3">
                      <p
                        className="text-xs font-medium text-rose-400 mb-1"
                        dangerouslySetInnerHTML={{ __html: item.competency }}
                      />
                      <p className="text-xs text-white">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Where Behavioural Competencies Are Assessed
                </p>
                <ul className="text-sm text-white space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong>NVQ/SVQ portfolios:</strong> Evidence of professional behaviour is
                      required alongside technical evidence
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong>CSCS card applications:</strong> Behavioural standards are part of the
                      Health, Safety &amp; Environment test
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong>Site inductions:</strong> Expected behaviours are outlined at the
                      start of every project
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong>Performance reviews:</strong> Employers use behavioural criteria for
                      appraisals, promotions and contract renewals
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                    <span>
                      <strong>Disciplinary processes:</strong> Persistent failure to meet
                      behavioural standards can result in removal from site
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: Construction Scenarios — Putting It All Together */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">05</span>
            Construction Scenarios &mdash; Putting It All Together
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The communication styles, I-messages and TA concepts covered in this section are not
                abstract theory. They apply directly to situations you will encounter every day on a
                construction site. Below are three common scenarios with analysis and recommended
                approaches.
              </p>

              {/* Scenario 1: Responding to Criticism */}
              <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                <div className="bg-rose-500/20 border-b border-rose-500/30 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <HardHat className="h-5 w-5 text-rose-300" />
                    <p className="text-sm font-semibold text-rose-300">
                      Scenario 1: Responding to Criticism
                    </p>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <div className="bg-black/30 rounded-lg p-3">
                    <p className="text-xs font-medium text-white mb-1">Situation</p>
                    <p className="text-xs text-white">
                      The site manager inspects your first fix and says: &ldquo;This is sloppy work.
                      I expected better from someone at your level.&rdquo;
                    </p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                      <p className="text-xs font-medium text-red-400 mb-1">
                        Ineffective Response (Aggressive)
                      </p>
                      <p className="text-xs text-white">
                        &ldquo;Well maybe if you gave me the right drawings in the first place, it
                        wouldn&rsquo;t be like this.&rdquo; &mdash; Blame-shifting, defensive,
                        escalates conflict.
                      </p>
                    </div>
                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                      <p className="text-xs font-medium text-green-400 mb-1">
                        Assertive Response (Adult to Adult)
                      </p>
                      <p className="text-xs text-white">
                        &ldquo;I want to get this right. Can you show me specifically what needs
                        correcting so I can fix it and avoid the same issue on the next plot?&rdquo;
                        &mdash; Stays in Adult, seeks specific feedback, takes responsibility.
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-white">
                    <strong>TA Analysis:</strong> The site manager&rsquo;s comment comes from
                    Critical Parent (&ldquo;I expected better&rdquo;). The assertive response
                    refuses to drop into Adapted Child. By staying in Adult and asking for
                    specifics, you invite the site manager back into their Adult ego state.
                  </p>
                </div>
              </div>

              {/* Scenario 2: Directing Apprentices */}
              <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                <div className="bg-rose-500/20 border-b border-rose-500/30 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-rose-300" />
                    <p className="text-sm font-semibold text-rose-300">
                      Scenario 2: Directing an Apprentice
                    </p>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <div className="bg-black/30 rounded-lg p-3">
                    <p className="text-xs font-medium text-white mb-1">Situation</p>
                    <p className="text-xs text-white">
                      Your apprentice has wired a consumer unit incorrectly for the third time. You
                      are frustrated and behind schedule.
                    </p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                      <p className="text-xs font-medium text-red-400 mb-1">
                        Ineffective Response (Critical Parent)
                      </p>
                      <p className="text-xs text-white">
                        &ldquo;For God&rsquo;s sake, how many times do I have to show you? Just let
                        me do it.&rdquo; &mdash; Humiliating, stops learning, damages confidence.
                      </p>
                    </div>
                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                      <p className="text-xs font-medium text-green-400 mb-1">
                        Assertive Response (Nurturing Parent + Adult)
                      </p>
                      <p className="text-xs text-white">
                        &ldquo;I can see you&rsquo;re finding this tricky, and I know we&rsquo;re
                        under pressure. Let&rsquo;s strip it back and go through it step by step.
                        Tell me what you think goes where, and I&rsquo;ll guide you.&rdquo; &mdash;
                        Supportive, structured, teaches rather than rescues.
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-white">
                    <strong>I-Message version:</strong> &ldquo;I feel under pressure when we have to
                    redo work because it puts us behind on the programme. Let&rsquo;s make sure we
                    get this one right together.&rdquo;
                  </p>
                </div>
              </div>

              {/* Scenario 3: Dealing with Main Contractors */}
              <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                <div className="bg-rose-500/20 border-b border-rose-500/30 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-rose-300" />
                    <p className="text-sm font-semibold text-rose-300">
                      Scenario 3: Dealing with the Main Contractor
                    </p>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <div className="bg-black/30 rounded-lg p-3">
                    <p className="text-xs font-medium text-white mb-1">Situation</p>
                    <p className="text-xs text-white">
                      The main contractor&rsquo;s project manager asks you to energise a
                      distribution board before the testing and inspection is complete, because the
                      plumber needs power for the boiler commissioning and the client is visiting
                      tomorrow.
                    </p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                      <p className="text-xs font-medium text-red-400 mb-1">
                        Ineffective Response (Passive)
                      </p>
                      <p className="text-xs text-white">
                        &ldquo;Er&hellip; OK, I suppose&hellip; if you need it done.&rdquo; &mdash;
                        Agrees to an unsafe and non-compliant action to avoid conflict. Puts
                        yourself, the plumber and the client at risk.
                      </p>
                    </div>
                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                      <p className="text-xs font-medium text-green-400 mb-1">
                        Assertive Response (Adult to Adult)
                      </p>
                      <p className="text-xs text-white">
                        &ldquo;I understand the pressure with the client visit. However, I
                        can&rsquo;t energise the board until testing is complete &mdash; it&rsquo;s
                        a legal requirement under BS 7671 and my professional obligation. I can
                        prioritise the testing for that board first thing tomorrow morning so we can
                        have it live before the visit. Let me confirm the timeline with you
                        now.&rdquo;
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-white">
                    <strong>Key principle:</strong> Assertive communication does not mean saying
                    &ldquo;no&rdquo; and walking away. It means stating your boundary clearly,
                    explaining the reason (legal, safety), and offering a constructive alternative.
                    This maintains both the professional relationship and your professional
                    integrity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Practical Application — Your Communication Action Plan */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">06</span>
            Practical Application &mdash; Your Communication Action Plan
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Knowing the theory is only valuable if you apply it. Changing communication habits
                takes deliberate practice &mdash; you will not become assertive overnight, but you
                can start improving from your next interaction.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Five Actions to Start This Week
                </p>
                <div className="space-y-3">
                  {[
                    {
                      action: 'Identify your default style',
                      detail:
                        'Reflect honestly on how you typically respond under pressure. Are you passive (avoid, agree, say nothing), aggressive (blame, shout, interrupt), or passive-aggressive (comply outwardly, resist covertly)? Most people have a pattern.',
                    },
                    {
                      action: 'Practise one I-message per day',
                      detail:
                        'Pick one situation where you would normally use a You-message and convert it. Write it down before you say it if that helps. The three-part structure becomes natural with repetition.',
                    },
                    {
                      action: 'Spot ego states in conversations',
                      detail:
                        'During your next toolbox talk, site meeting or tea break, listen for Parent, Adult and Child ego states. Notice which conversations flow (complementary transactions) and which stall or escalate (crossed transactions).',
                    },
                    {
                      action: 'Use the broken record technique',
                      detail:
                        'When someone pushes back against your assertive statement, calmly repeat your key point without adding new arguments or raising your voice. Repetition without escalation is a powerful assertiveness tool.',
                    },
                    {
                      action: 'Ask for feedback',
                      detail:
                        'Ask a trusted colleague or your supervisor: "How do I come across when I raise an issue?" Their answer may surprise you and will give you a concrete starting point for improvement.',
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-xs font-bold text-rose-400">
                        {i + 1}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{item.action}</p>
                        <p className="text-xs text-white mt-1">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">Remember</p>
                <p className="text-sm text-white">
                  Communication style is a <strong>skill, not a personality trait</strong>. You can
                  learn assertiveness just as you learned to wire a consumer unit &mdash; through
                  instruction, practice, feedback and repetition. The electricians who progress
                  furthest in their careers are not always the most technically gifted; they are the
                  ones who can communicate clearly, handle conflict professionally, and build trust
                  with clients, colleagues and contractors.
                </p>
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
        <Quiz title="Section 3 Knowledge Check" questions={quizQuestions} />

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
            <Link to="../cc-module-1-section-4">
              Next: Section 4
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
