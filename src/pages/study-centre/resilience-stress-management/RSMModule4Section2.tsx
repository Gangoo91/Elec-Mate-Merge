import {
  ArrowLeft,
  Users,
  CheckCircle,
  HelpCircle,
  Lightbulb,
  Heart,
  MessageCircle,
  Phone,
  Shield,
  HandHeart,
  UserCheck,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'rsm4-s2-protective',
    question:
      'According to decades of research, what is the single strongest protective factor against stress and mental health problems?',
    options: [
      'High income and financial security',
      'Social connection and supportive relationships',
      'Physical fitness and regular exercise',
      'Access to professional therapy and counselling',
    ],
    correctIndex: 1,
    explanation:
      'Research consistently identifies social connection as the strongest protective factor against stress, depression, anxiety and a range of mental health problems. The Harvard Study of Adult Development, one of the longest-running studies in history, found that the quality of relationships is the single best predictor of health and happiness across the lifespan — more powerful than income, physical health or career success.',
  },
  {
    id: 'rsm4-s2-mates',
    question:
      'What is the primary purpose of the Mates in Mind programme in the construction industry?',
    options: [
      'To provide free counselling for construction workers',
      'To raise awareness, address stigma and improve mental health support in the construction sector',
      'To train construction workers as qualified therapists',
      'To conduct annual mental health screenings on construction sites',
    ],
    correctIndex: 1,
    explanation:
      'Mates in Mind is a UK charity that works specifically with the construction industry to raise awareness of mental health, address the stigma that prevents people from seeking help, and improve the mental health support available within the sector. It provides resources including toolbox talks, manager training, and signposting to professional support — all designed for the realities of construction working life.',
  },
  {
    id: 'rsm4-s2-signpost',
    question:
      'When should you signpost a colleague to professional help rather than continuing to provide peer support?',
    options: [
      'Only when they specifically ask you for a professional referral',
      'When you feel you have run out of advice to offer',
      'When they express thoughts of self-harm, have symptoms lasting more than two weeks, or the situation is beyond your skill level',
      'Never — peer support is always sufficient for any mental health issue',
    ],
    correctIndex: 2,
    explanation:
      'Peer support is valuable but has clear limits. You should signpost to professional help when someone expresses thoughts of self-harm or suicide, when symptoms (low mood, anxiety, sleep problems, withdrawal) persist for more than two weeks, when the person is using substances to cope, or when you feel the situation is beyond your ability to support. Knowing when to signpost is one of the most important peer support skills — it is not about failure, it is about getting the person the right level of help.',
  },
];

const faqs = [
  {
    question: 'I work alone most of the time. How can I build social connections?',
    answer:
      'Sole traders and lone workers face a genuine challenge here, and it is one of the reasons why self-employed tradespeople have disproportionately high rates of mental health problems. There are several practical strategies. First, join a trade-specific WhatsApp or Facebook group — communities like "Electricians Chat" or local trade groups provide daily connection with people who understand your work. Second, attend trade events, training courses or suppliers\' open days — these are networking opportunities that also build genuine connections. Third, consider co-working arrangements: partnering with other sole traders on larger jobs creates natural social contact. Fourth, make the most of interactions you already have — a proper conversation with a supplier, a chat with the homeowner, a few minutes with another tradesperson on a multi-trade job site. Finally, organisations like Andy\'s Man Club (free weekly groups for men) provide structured social connection in a safe, non-judgmental environment.',
  },
  {
    question: 'What if my colleague does not want to talk? Should I push them?',
    answer:
      'No. Forcing someone to talk when they are not ready is counterproductive and can damage trust. What you can do is make it clear that you are available. Say something like "I have noticed you seem a bit flat lately. No pressure, but I am here if you ever want to chat." Then leave it. The most important thing is that they know the door is open. People often need to hear an offer several times before they feel safe enough to take it. Continue to be present, include them in conversations, and check in occasionally with a simple "How are you doing?" Sometimes the most powerful support is simply being there consistently, without pressure or judgement. If you are concerned about their safety (e.g., they mention self-harm), that is different — at that point you should express your concern directly and encourage them to contact a helpline or their GP.',
  },
  {
    question: 'I feel uncomfortable talking about mental health. Is that normal?',
    answer:
      'Completely normal, especially in construction. The industry has a strong culture of stoicism — "crack on", "man up", "leave your problems at the gate" — that makes talking about mental health feel awkward or even weak. Research by Mates in Mind found that over 60% of construction workers feel uncomfortable discussing mental health at work. But the same research shows that this discomfort decreases dramatically with exposure. The first conversation is the hardest. After that, it becomes progressively more natural. You do not need to have deep therapeutic conversations — simply asking "How are you really doing?" and listening to the answer is a powerful act of peer support. Start small: ask a mate how their weekend was. Ask how they are finding the current job. Show genuine interest in them as a person, not just a worker. These everyday conversations build the trust that makes it possible to talk about the harder stuff when it matters.',
  },
  {
    question: 'What is the difference between peer support and professional help?',
    answer:
      'Peer support is informal help from people who understand your situation because they share a similar background or experience. It includes listening, empathising, sharing experiences, and being present. It does not require any qualifications — just genuine care and basic listening skills. Professional help involves trained specialists (GPs, counsellors, psychologists, psychiatrists) who have clinical expertise in assessing, diagnosing and treating mental health conditions. They can provide evidence-based treatments such as cognitive behavioural therapy (CBT), medication, or specialist interventions. Both are valuable, and they serve different purposes. Peer support is the first line — it provides connection, reduces isolation, and helps people feel understood. Professional help is essential when the problem requires specialist intervention. The two work best together: peer support can encourage someone to seek professional help, and professional help works better when the person also has strong social support. Think of it as a ladder: peer support is the ground floor, and professional help is the specialist level above it.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'According to the Harvard Study of Adult Development, what is the single best predictor of health and happiness across the lifespan?',
    options: [
      'Career success and professional achievement',
      'High income and financial wealth',
      'The quality of close relationships',
      'Physical fitness and absence of disease',
    ],
    correctAnswer: 2,
    explanation:
      'The Harvard Study of Adult Development, which has tracked participants for over 80 years, found that the quality of close relationships is the single most powerful predictor of physical health, mental health and overall life satisfaction — more so than income, career success or physical fitness. People with strong, warm relationships live longer, stay healthier and report greater happiness.',
  },
  {
    id: 2,
    question:
      'Which organisation runs construction-specific mental health awareness programmes including toolbox talks?',
    options: [
      'Mind (the mental health charity)',
      'Mates in Mind',
      'The Samaritans',
      'CALM (Campaign Against Living Miserably)',
    ],
    correctAnswer: 1,
    explanation:
      'Mates in Mind is the charity specifically established to address mental health in the UK construction sector. It provides toolbox talk resources, manager training programmes, and awareness-raising materials designed for the specific culture and working conditions of the construction industry. While Mind, Samaritans and CALM all provide excellent general mental health support, Mates in Mind is the construction-specific organisation.',
  },
  {
    id: 3,
    question:
      'What is the most important thing you can do when a colleague opens up about their mental health?',
    options: [
      'Immediately offer advice and solutions',
      'Tell them about your own similar experiences',
      'Listen actively without judgement and let them know you are there for them',
      'Suggest they take time off work to recover',
    ],
    correctAnswer: 2,
    explanation:
      'Active listening without judgement is the most powerful form of peer support. When someone opens up, they usually need to be heard, not fixed. Jumping straight to advice, sharing your own story, or suggesting solutions can feel dismissive — even when well-intentioned. Simply listening, acknowledging what they are going through, and letting them know you care is often more helpful than any specific advice you could offer.',
  },
  {
    id: 4,
    question: 'The Lighthouse Club construction helpline provides which of the following services?',
    options: [
      'Free legal advice for construction disputes only',
      'Financial, emotional, physical and wellbeing support for construction workers and their families',
      'Job placement services for unemployed construction workers',
      'Health and safety training courses for site managers',
    ],
    correctAnswer: 1,
    explanation:
      'The Lighthouse Club is the only charity dedicated to the construction community. Their helpline (0345 605 1956) provides a comprehensive range of support including financial emergency assistance, emotional and wellbeing support, occupational health advice, and legal guidance. They also provide support for families of construction workers, recognising that workplace stress affects the whole household.',
  },
  {
    id: 5,
    question:
      'A colleague on site has been withdrawn, short-tempered and arriving late for the past three weeks. What is the most appropriate first response?',
    options: [
      'Report their behaviour to the site manager immediately',
      'Ignore it — everyone has bad weeks',
      'Find a quiet moment to check in: "I have noticed you seem a bit different lately. Is everything OK?"',
      'Send them a text with a list of mental health helplines',
    ],
    correctAnswer: 2,
    explanation:
      'A private, gentle check-in is the most appropriate first response. Changes in behaviour lasting more than two weeks can indicate underlying stress, anxiety or depression. A quiet, non-confrontational conversation — "I have noticed you seem different lately. Is everything OK?" — opens the door without pressure. It shows you care and gives them the opportunity to talk if they choose to. Reporting to management or sending helpline numbers without a conversation first can feel impersonal or threatening.',
  },
  {
    id: 6,
    question:
      'Which of the following is NOT a key helpline or support organisation for construction workers?',
    options: [
      'Lighthouse Club (0345 605 1956)',
      'Samaritans (116 123)',
      'Construction Skills Certification Scheme (CSCS)',
      "Andy's Man Club (free weekly groups)",
    ],
    correctAnswer: 2,
    explanation:
      "CSCS (Construction Skills Certification Scheme) is a skills and competence card scheme for construction, not a mental health support service. The Lighthouse Club, Samaritans and Andy's Man Club all provide direct mental health and wellbeing support relevant to construction workers. The Lighthouse Club is specifically for the construction community; the Samaritans provide 24/7 emotional support for anyone; and Andy's Man Club runs free weekly peer support groups for men.",
  },
  {
    id: 7,
    question: 'What is a toolbox talk in the context of mental health awareness?',
    options: [
      'A formal mental health assessment conducted by a qualified professional',
      'A short, informal team briefing on a specific health or wellbeing topic, delivered on site',
      'A mandatory training course that all construction workers must complete annually',
      'A one-to-one counselling session between a worker and their line manager',
    ],
    correctAnswer: 1,
    explanation:
      'A toolbox talk is a short (typically 10-15 minute), informal team briefing delivered on site, usually at the start of the working day or during a break. Traditionally used for health and safety topics, toolbox talks are increasingly being used to raise awareness of mental health, normalise conversations about wellbeing, and signpost support resources. Mates in Mind provides ready-made toolbox talk resources specifically designed for construction audiences.',
  },
  {
    id: 8,
    question:
      'Why is social connection particularly challenging for self-employed electricians and sole traders?',
    options: [
      'Self-employed workers do not experience stress',
      'Sole traders typically work alone, lack a built-in team, have irregular contact with peers, and may miss workplace support structures',
      'Self-employed workers are not eligible for any mental health support services',
      'Social connection is only beneficial for employed workers, not the self-employed',
    ],
    correctAnswer: 1,
    explanation:
      'Self-employed electricians and sole traders face unique challenges: they often work alone for extended periods, do not have a built-in team or workplace social structure, miss out on informal peer support that happens naturally in team environments, and may lack access to employer-provided wellbeing resources. This isolation is a significant risk factor for mental health problems, which is why building deliberate social connections — through trade groups, peer networks, professional associations and community activities — is particularly important for the self-employed.',
  },
];

export default function RSMModule4Section2() {
  useSEO({
    title: 'Social Connection & Peer Support | RSM Module 4.2',
    description:
      'The power of social connection, Mates in Mind, peer support models, normalising mental health conversations in construction, and key helplines for the industry.',
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
            <Link to="../rsm-module-4">
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
            <span className="text-rose-400 text-xs font-semibold">MODULE 4 &middot; SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Social Connection &amp; Peer Support
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Why human connection is the most powerful shield against stress, and how to build it in
            a traditionally closed-off industry
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Connection:</strong> Social connection is the #1 protective factor against
                stress and mental health problems
              </li>
              <li>
                <strong>Mates in Mind:</strong> Construction-specific mental health awareness and
                toolbox talk resources
              </li>
              <li>
                <strong>Talking:</strong> Normalising conversations about stress in a male-dominated
                industry saves lives
              </li>
              <li>
                <strong>Helplines:</strong> Lighthouse Club, Samaritans, CALM, Andy&rsquo;s Man Club
                are all available
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Suicide:</strong> Construction has the highest suicide rate of any UK
                industry sector
              </li>
              <li>
                <strong>Isolation:</strong> Many tradespeople work alone, increasing vulnerability
                to mental health problems
              </li>
              <li>
                <strong>Stigma:</strong> &ldquo;Man up&rdquo; culture prevents people from seeking
                the help they need
              </li>
              <li>
                <strong>Prevention:</strong> A single conversation can be the turning point for
                someone in crisis
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Explain why social connection is the strongest protective factor against stress and mental health problems',
              'Describe the role of Mates in Mind and toolbox talks in construction mental health awareness',
              'Apply basic active listening skills when a colleague opens up about difficulties',
              'Distinguish between peer support and professional help, and know when to signpost',
              'Identify at least four key helplines and support organisations for construction workers',
              'Develop practical strategies for building social connection, including for sole traders',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Social Connection as Protection */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            Social Connection: The Number One Protective Factor
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                If you could only choose one thing to protect your mental health, the research is
                unambiguous: it should be social connection. Decades of evidence from psychology,
                neuroscience and epidemiology converge on the same finding &mdash; the quality of
                your relationships is the single most powerful predictor of your physical health,
                mental health and overall life satisfaction.
              </p>

              <p>
                The Harvard Study of Adult Development, one of the longest-running studies in the
                history of science (tracking participants for over 80 years since 1938), reached a
                clear conclusion: it is not wealth, career success, physical fitness or intelligence
                that predicts who ages well and who does not. It is the quality of close
                relationships. People with strong, warm connections to others live longer, stay
                healthier, recover from illness faster, and report greater happiness. People who are
                isolated &mdash; even if they are wealthy, successful and physically fit &mdash;
                experience worse health outcomes and die earlier.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Heart className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The Biology of Connection</p>
                </div>
                <p className="text-sm text-white mb-3">
                  Social connection is not just a psychological preference &mdash; it is a
                  biological need. When you interact with people you trust and care about, your body
                  releases oxytocin (sometimes called the &ldquo;bonding hormone&rdquo;), which
                  reduces cortisol (the stress hormone), lowers blood pressure and promotes a sense
                  of calm and safety. Conversely, social isolation activates the same brain regions
                  as physical pain &mdash; loneliness literally hurts.
                </p>
                <p className="text-sm text-white">
                  Research by Julianne Holt-Lunstad at Brigham Young University found that chronic
                  social isolation increases mortality risk by 26% &mdash; making it as dangerous as
                  smoking 15 cigarettes per day. For construction workers, many of whom work alone
                  or in small, frequently changing teams, this finding has profound implications.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Construction Reality: The Isolation Risk
                  </p>
                </div>
                <p className="text-sm text-white">
                  Construction has specific features that increase isolation risk. Self-employed
                  sparkys often work alone in domestic properties all day with no colleague
                  interaction. CIS subcontractors move between sites frequently, never building
                  lasting team relationships. Long commutes eat into social time at home. Exhaustion
                  from physical work reduces motivation to socialise in the evening. The result is
                  that many construction workers are socially isolated without realising it &mdash;
                  they see people all day (clients, other trades, suppliers) but have very few
                  meaningful, supportive relationships. Seeing people and being connected to people
                  are fundamentally different things.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Mates in Mind */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            Mates in Mind: Construction-Specific Mental Health Awareness
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Mates in Mind is a UK charity established specifically to address mental health in
                the construction sector. Founded with support from the Health in Construction
                Leadership Group, it recognises that generic mental health programmes often fail in
                construction because they do not account for the industry&rsquo;s unique culture,
                working conditions and workforce demographics.
              </p>

              <p>
                The construction industry has the highest suicide rate of any UK sector. Male
                construction workers are three times more likely to die by suicide than the national
                average. These statistics are not just numbers &mdash; they represent fathers, sons,
                brothers, friends and colleagues. Mates in Mind exists because the industry
                recognised that something needed to change, and that change needed to come from
                within the sector, not from outside it.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">What Mates in Mind Provides</p>
                </div>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Toolbox talks:</strong> Ready-made, short presentations on mental
                      health topics designed to be delivered on site in 10&ndash;15 minutes. These
                      cover topics like stress awareness, signs and symptoms, where to get help, and
                      how to support a colleague.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Mental health champion training:</strong> Programmes that train
                      workers to become mental health champions within their organisations &mdash;
                      people who can spot the signs that a colleague is struggling and provide
                      initial support.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Manager and supervisor training:</strong> Courses that help leaders
                      create psychologically safe environments where people feel able to speak up
                      about their mental health.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Awareness campaigns:</strong> Industry-wide initiatives that normalise
                      conversations about mental health in a sector that has traditionally avoided
                      them.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Construction Example: The Toolbox Talk That Changed Everything
                  </p>
                </div>
                <p className="text-sm text-white">
                  On a commercial fit-out in Manchester, a site supervisor ran a Mates in Mind
                  toolbox talk on stress awareness. It was the first time mental health had been
                  discussed openly on this site. The talk lasted 12 minutes. Afterwards, one of the
                  electricians &mdash; a man in his late 40s who had been on site for six months
                  &mdash; quietly approached the supervisor and said he had been struggling with
                  anxiety for months and did not know who to talk to. That 12-minute toolbox talk
                  opened a door that might never have opened otherwise. The supervisor listened,
                  signposted the Lighthouse Club helpline, and checked in regularly in the weeks
                  that followed. The electrician later said it was the first time anyone at work had
                  ever asked about his mental health.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: The Power of Talking */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            The Power of Talking: Normalising Conversations About Stress
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Construction is a male-dominated industry, and research consistently shows that men
                are less likely than women to talk about their emotional difficulties, seek help for
                mental health problems, or recognise the signs of stress and depression in
                themselves. The culture of stoicism &mdash; &ldquo;crack on&rdquo;, &ldquo;man
                up&rdquo;, &ldquo;leave your problems at the gate&rdquo; &mdash; is deeply embedded
                in the industry and actively discourages vulnerability.
              </p>

              <p>
                This silence has consequences. When people cannot talk about their stress, it does
                not disappear &mdash; it festers. It manifests as irritability, withdrawal, alcohol
                consumption, sleep problems, physical symptoms (headaches, stomach problems, chronic
                pain) and, in the worst cases, self-harm and suicide. The research is clear: talking
                about stress and mental health difficulties reduces their power. It does not solve
                the underlying problem, but it reduces the sense of isolation, provides perspective,
                and opens the door to practical support.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <MessageCircle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">How to Start the Conversation</p>
                </div>
                <p className="text-sm text-white mb-3">
                  You do not need to be a therapist to have a meaningful conversation about mental
                  health. You just need to be genuine, present and willing to listen. Here are
                  practical approaches that work in construction:
                </p>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-xs font-medium text-rose-400 mb-1">Ask Twice</p>
                    <p className="text-xs text-white">
                      When someone says &ldquo;I am fine&rdquo;, ask again. &ldquo;Are you sure? You
                      seem a bit different lately.&rdquo; The first &ldquo;I am fine&rdquo; is often
                      automatic. The second question gives them permission to be honest. Research
                      shows that simply asking twice dramatically increases the likelihood of a
                      genuine response.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-xs font-medium text-rose-400 mb-1">Use Shared Experiences</p>
                    <p className="text-xs text-white">
                      &ldquo;I have been feeling stressed out lately with all this overtime. How are
                      you finding it?&rdquo; Opening up about your own experience first makes it
                      safer for the other person to share. It normalises the topic and removes the
                      sense that admitting to stress is unusual or weak.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-xs font-medium text-rose-400 mb-1">
                      Choose the Right Moment
                    </p>
                    <p className="text-xs text-white">
                      The middle of a busy site with other people around is not ideal. A quiet
                      moment in the van, during a drive to site, at a break with just the two of
                      you, or after work over a coffee are better opportunities. Privacy and
                      informality make honest conversations more likely.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-xs font-medium text-rose-400 mb-1">
                      Listen More Than You Talk
                    </p>
                    <p className="text-xs text-white">
                      When someone opens up, resist the urge to fix, advise, or share your own
                      similar experience. Just listen. Nod. Say &ldquo;that sounds really
                      tough&rdquo; or &ldquo;I can see why you are struggling with that.&rdquo;
                      Active listening &mdash; being fully present and genuinely interested &mdash;
                      is the most powerful form of peer support there is.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Construction Example: Two Sparkys Checking In
                  </p>
                </div>
                <p className="text-sm text-white">
                  Mark and Jamie are both electricians working on a housing development. They have
                  been mates for a few years but never talk about anything personal. One Friday, in
                  the van after work, Mark says: &ldquo;Rough week, mate. The missus and I have been
                  arguing about money, I have not been sleeping properly, and I nearly lost it with
                  the plumber yesterday.&rdquo; Jamie does not offer advice or try to fix it. He
                  says: &ldquo;That sounds like a lot, mate. I have had weeks like that &mdash;
                  everything piling up at once. Want to grab a coffee and talk about it?&rdquo; That
                  simple exchange &mdash; no grand gesture, no therapy-speak, just one mate being
                  genuine with another &mdash; is peer support in its most powerful form. Mark later
                  said that conversation was the first time he had told anyone what was going on,
                  and just saying it out loud made it feel more manageable.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Peer Support Models */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Peer Support Models: From Informal Check-Ins to Mental Health Champions
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Peer support operates on a spectrum, from the most informal daily interactions to
                structured programmes with trained champions. All levels are valuable, and the best
                workplaces cultivate support across the entire range.
              </p>

              <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <UserCheck className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">1. Informal Check-Ins</p>
                  </div>
                  <p className="text-sm text-white">
                    The simplest and most widespread form of peer support. Asking &ldquo;How are you
                    doing?&rdquo; and genuinely listening to the answer. Having a proper
                    conversation at break time rather than everyone sitting on their phones.
                    Noticing when someone is not themselves and saying something. These everyday
                    interactions create a culture where people feel seen and valued, which is the
                    foundation of all peer support.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">2. Buddy Systems</p>
                  </div>
                  <p className="text-sm text-white">
                    Pairing workers together with explicit responsibility for each other&rsquo;s
                    wellbeing. This is particularly effective for new starters, apprentices, and
                    people returning to work after absence. The buddy provides a named, approachable
                    person who checks in regularly and creates a safe space for honest conversation.
                    Buddy systems work because they make support personal and proactive rather than
                    generic and reactive.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <HandHeart className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">3. Mental Health Champions</p>
                  </div>
                  <p className="text-sm text-white">
                    Workers who receive specific training (through programmes like Mates in Mind,
                    Mental Health First Aid, or similar) to recognise the signs of mental health
                    difficulties and provide initial support. Mental health champions are not
                    therapists &mdash; they are colleagues who know how to listen, how to have a
                    supportive conversation, and how to signpost people to professional help when
                    needed. Having identifiable mental health champions on site gives people a named
                    person they can approach if they are struggling.
                  </p>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">The Sole Trader Challenge:</strong> If you work
                  alone, you need to build your own peer support network deliberately. Join a trade
                  WhatsApp group or online forum. Attend local trade events or supplier open days.
                  Consider joining Andy&rsquo;s Man Club (free weekly groups that meet in
                  communities across the UK) or a similar peer support group. Even one meaningful
                  connection with another tradesperson who understands your world can make a
                  significant difference. A sole trader in Bristol described joining a local
                  electricians&rsquo; WhatsApp group as &ldquo;the best thing I did for my mental
                  health in years &mdash; just knowing there were other people going through the
                  same stuff&rdquo;.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: When Talking Is Not Enough */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            When Talking Is Not Enough: Signposting to Professional Help
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Peer support is powerful, but it has limits. There are situations where informal
                support is not enough and professional help is needed. Knowing when to signpost
                &mdash; and how to do it sensitively &mdash; is one of the most important skills in
                peer support. It is not a failure to refer someone onwards; it is an act of care
                that ensures they get the right level of help.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    When to Signpost to Professional Help
                  </p>
                </div>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Thoughts of self-harm or suicide:</strong> If someone expresses
                      thoughts of hurting themselves or ending their life, this is urgent. Stay with
                      them, listen calmly, and encourage them to call the Samaritans (116 123) or go
                      to A&amp;E. Do not leave them alone if you believe they are at immediate risk.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Symptoms lasting more than two weeks:</strong> Persistent low mood,
                      anxiety, sleep problems, withdrawal from social contact, loss of interest in
                      things they usually enjoy, changes in appetite or weight &mdash; if these
                      symptoms persist for more than two weeks, professional assessment is
                      appropriate.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Substance use to cope:</strong> If someone is using alcohol, drugs or
                      other substances to manage their emotions, this indicates a level of distress
                      that typically requires professional support.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Impact on daily functioning:</strong> If their difficulties are
                      significantly affecting their work, relationships, or ability to manage daily
                      tasks, professional help can provide structured support and evidence-based
                      interventions.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">How to Signpost Sensitively</p>
                <p className="text-sm text-white">
                  Suggesting professional help can feel awkward, but framing it correctly makes a
                  significant difference. Try: &ldquo;It sounds like you are dealing with a lot. I
                  am always here to listen, but I think it might also help to talk to someone who
                  really knows their stuff. The Lighthouse Club helpline is specifically for people
                  in construction &mdash; would you be open to giving them a call?&rdquo; This
                  approach validates their experience, maintains your support, and positions
                  professional help as an addition to your friendship, not a replacement for it.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06: Key Helplines */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>
            Key Helplines &amp; Support Organisations
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Knowing where to point someone (or yourself) for help is essential. The following
                organisations provide free, confidential support, and several are specifically
                designed for people in the construction industry.
              </p>

              <div className="space-y-4">
                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">
                      Lighthouse Club &mdash; 0345 605 1956
                    </p>
                  </div>
                  <p className="text-sm text-white">
                    The only charity dedicated exclusively to the construction community. Provides
                    financial emergency assistance, emotional and wellbeing support, occupational
                    health advice, and legal guidance. Available for all construction workers and
                    their families. The helpline is staffed by people who understand the industry.
                  </p>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">
                      Samaritans &mdash; 116 123 (free, 24/7)
                    </p>
                  </div>
                  <p className="text-sm text-white">
                    Available 24 hours a day, 365 days a year. You do not have to be suicidal to
                    call the Samaritans &mdash; they are there for anyone who is struggling,
                    overwhelmed or just needs someone to talk to. Calls are free and completely
                    confidential. You can also email jo@samaritans.org.
                  </p>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">
                      CALM (Campaign Against Living Miserably) &mdash; 0800 58 58 58
                    </p>
                  </div>
                  <p className="text-sm text-white">
                    A helpline specifically for men (though not exclusively), available
                    5pm&ndash;midnight every day. CALM understands that men often find it harder to
                    talk about mental health and has trained advisors who can help. They also have a
                    web chat option if you prefer not to call.
                  </p>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">
                      Andy&rsquo;s Man Club &mdash; Free Weekly Groups
                    </p>
                  </div>
                  <p className="text-sm text-white">
                    A network of free peer support groups for men, meeting weekly in communities
                    across the UK. No referral needed, no cost, no commitment &mdash; just turn up.
                    The groups follow a simple format: men sit in a circle and talk about what is on
                    their mind. The rule is &ldquo;it is OK not to be OK.&rdquo; Many construction
                    workers attend Andy&rsquo;s Man Club and find the peer support transformative.
                  </p>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">
                      Construction Industry Helpline &mdash; 0345 605 1956
                    </p>
                  </div>
                  <p className="text-sm text-white">
                    Operated by the Lighthouse Club, providing 24/7 free and confidential support
                    including crisis intervention, legal and financial advice, tax support, family
                    mediation, and occupational health guidance. Available to anyone working in, or
                    retired from, the construction industry across the UK and Ireland.
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Your GP: The Gateway to NHS Support
                </p>
                <p className="text-sm text-white">
                  Your GP is the primary route to NHS mental health services. They can assess your
                  situation, prescribe medication if appropriate, refer you for talking therapies
                  (such as CBT through the NHS Talking Therapies programme), or refer to specialist
                  services. Many GPs now offer phone and video appointments, making it easier to
                  access help without taking a full day off work. If you are self-employed and
                  worried about taking time out, remember: addressing a mental health problem early
                  (when a few GP appointments and some short-term therapy might resolve it) is far
                  less disruptive than waiting until it becomes a crisis that takes you off work for
                  weeks or months.
                </p>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Save These Numbers:</strong> Save the Lighthouse
                  Club (0345 605 1956) and Samaritans (116 123) numbers in your phone now. You may
                  never need them yourself, but you might be the person who can pass them to a
                  colleague who does. Having the number ready when it matters most can make the
                  difference between someone getting help and someone suffering in silence.
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
        <Quiz title="Section 2 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../rsm-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../rsm-module-4-section-3">
              Next: Healthy Boundaries
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
