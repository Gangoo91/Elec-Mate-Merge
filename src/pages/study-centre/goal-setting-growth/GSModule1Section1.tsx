import { ArrowLeft, Lightbulb, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

/* ------------------------------------------------------------------ */
/*  Quick-check questions (InlineCheck — correctIndex, 0-indexed)      */
/* ------------------------------------------------------------------ */
const quickCheckQuestions = [
  {
    id: 'gs-1-1-check1',
    question:
      'An apprentice electrician struggles with conduit bending and says &ldquo;I&rsquo;m just not good at this &mdash; some people are naturally better with their hands.&rdquo; According to Carol Dweck&rsquo;s research, this statement reflects:',
    options: [
      'A realistic self-assessment based on natural ability',
      'A fixed mindset &mdash; the belief that abilities are static and cannot be developed',
      'A growth mindset &mdash; recognising limitations and moving on',
      'A healthy acceptance of personal strengths and weaknesses',
    ],
    correctIndex: 1,
    explanation:
      'This is a textbook example of a fixed mindset statement. Carol Dweck&rsquo;s research at Stanford University demonstrated that individuals with a fixed mindset believe intelligence and talent are fixed traits &mdash; you either have them or you don&rsquo;t. This belief leads to avoiding challenges, giving up easily, and seeing effort as fruitless. The statement &ldquo;some people are naturally better with their hands&rdquo; reflects the fixed belief that skill is innate rather than developed. A growth mindset would instead frame the struggle as: &ldquo;I haven&rsquo;t mastered conduit bending yet, but with practice and feedback I can improve.&rdquo; Research in motor skill acquisition shows that manual dexterity and spatial reasoning &mdash; both critical for conduit work &mdash; can be significantly improved through deliberate practice.',
  },
  {
    id: 'gs-1-1-check2',
    question:
      'Dweck&rsquo;s praise study found that children praised for effort (&ldquo;You worked really hard on that&rdquo;) versus intelligence (&ldquo;You&rsquo;re really smart&rdquo;) had what outcome when later faced with difficult problems?',
    options: [
      'Both groups performed equally &mdash; praise type made no difference',
      'Children praised for intelligence performed better because they had higher confidence',
      'Children praised for effort were more likely to persist, choose challenging tasks, and improve their performance',
      'Children praised for intelligence avoided easy tasks and only selected the hardest challenges',
    ],
    correctIndex: 2,
    explanation:
      'Dweck&rsquo;s praise study (1998) found that children praised for effort displayed significantly more growth-oriented behaviours than those praised for intelligence. The effort-praised group were more likely to choose challenging tasks (because challenge was framed as an opportunity to learn, not a threat to their identity), persist longer when faced with difficulty, enjoy the process more, and improve their performance over time. In contrast, the intelligence-praised group were more likely to choose easy tasks (to protect their &ldquo;smart&rdquo; label), give up quickly when challenged, and show decreased performance under difficulty. For apprentice electricians, this finding is directly applicable: supervisors and trainers should praise specific effort and strategy (&ldquo;You took your time to measure twice before cutting, good discipline&rdquo;) rather than general ability (&ldquo;You&rsquo;re a natural&rdquo;).',
  },
  {
    id: 'gs-1-1-check3',
    question:
      'The phrase &ldquo;I can&rsquo;t do this yet&rdquo; is more growth-oriented than &ldquo;I can&rsquo;t do this&rdquo; because:',
    options: [
      'It sounds more polite and professional',
      'The word &ldquo;yet&rdquo; implies that ability can be developed through time and effort, making the limitation temporary rather than permanent',
      'It reduces immediate pressure by delaying the expectation of success',
      'It is a longer sentence and therefore more thoughtful',
    ],
    correctIndex: 1,
    explanation:
      'The word &ldquo;yet&rdquo; is what Dweck calls &ldquo;the power of yet&rdquo; &mdash; it transforms a statement of failure into a statement of learning in progress. &ldquo;I can&rsquo;t do this&rdquo; is a fixed mindset statement that frames the inability as permanent. &ldquo;I can&rsquo;t do this yet&rdquo; is a growth mindset reframe that acknowledges current limitation while maintaining the belief that capability can be developed. This linguistic shift has been shown to change behaviour: students taught to use &ldquo;yet&rdquo; language show greater persistence on difficult tasks and higher eventual achievement. For electricians learning complex skills like three-phase motor wiring or advanced fault finding, the word &ldquo;yet&rdquo; keeps the door open to mastery and prevents premature self-labelling as &ldquo;not technical&rdquo; or &ldquo;not good at theory&rdquo;.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'Does growth mindset mean I can learn anything if I just try hard enough?',
    answer:
      'No &mdash; and this is a critical misunderstanding that Dweck herself has addressed. Growth mindset does not claim that everyone can achieve anything with enough effort. What it does claim is that ability is not fixed at birth, that effort and strategy can lead to significant improvement, and that you cannot know your ultimate limits in advance. There are real constraints: time, resources, prior knowledge, physical capability, opportunity. But most people dramatically underestimate their capacity for growth because they give up long before reaching their actual limits. For electricians, this means: you may not become the world&rsquo;s leading expert on high-voltage substations, but you can absolutely develop competence in areas that currently feel difficult &mdash; testing, fault finding, design, inspection &mdash; if you apply effective learning strategies and persist through initial struggle.',
  },
  {
    question: 'Isn&rsquo;t some of electrical ability just natural talent?',
    answer:
      'Yes, there is individual variation in baseline aptitudes such as spatial reasoning, manual dexterity, mathematical fluency, and pattern recognition. Some apprentices find certain aspects of electrical work easier than others. However &mdash; and this is the key point &mdash; initial aptitude is a poor predictor of long-term achievement compared to mindset, effort, and deliberate practice. Anders Ericsson&rsquo;s research on expertise (which we will cover in Section 4) found that what looks like &ldquo;natural talent&rdquo; is usually the result of hundreds or thousands of hours of focused, deliberate practice that the observer never sees. An apprentice who struggles initially with cable calculations but adopts a growth mindset and practises consistently will outperform a &ldquo;naturally good at maths&rdquo; apprentice who coasts and avoids challenge. The trades are full of stories of initially weak apprentices who became exceptional electricians through sheer persistence.',
  },
  {
    question:
      'I&rsquo;ve been an electrician for 20 years &mdash; can I still develop a growth mindset, or is it too late?',
    answer:
      'Growth mindset can be developed at any age or career stage. Dweck&rsquo;s research shows that mindset is not a fixed personality trait &mdash; it is a belief system that can be changed through awareness, reflection, and practice. Experienced electricians often face particularly strong fixed mindset triggers because they have an established professional identity to protect. Phrases like &ldquo;I&rsquo;m too old to learn that&rdquo; or &ldquo;I&rsquo;ve always done it this way&rdquo; are fixed mindset statements that limit growth. The first step is simply recognising these thoughts when they arise and reframing them: &ldquo;I haven&rsquo;t learned that yet, but I&rsquo;m capable of learning&rdquo; or &ldquo;This is an opportunity to update my approach.&rdquo; Many electricians find that cultivating a growth mindset in their 40s or 50s opens up second-career opportunities such as design, inspection, training, or specialisation that would have seemed impossible under a fixed mindset.',
  },
  {
    question:
      'What about &ldquo;false growth mindset&rdquo; &mdash; I&rsquo;ve heard Dweck warn about this?',
    answer:
      'Dweck has warned that growth mindset has been widely misunderstood and misapplied. &ldquo;False growth mindset&rdquo; is when someone claims to have a growth mindset but actually just praises effort without strategy, or believes that positivity alone leads to success. True growth mindset is not about mindless effort or blind optimism &mdash; it is about understanding that abilities can be developed through effective strategies, deliberate practice, and learning from failure. An apprentice who repeats the same incorrect cable termination technique 50 times and says &ldquo;I&rsquo;m trying really hard&rdquo; does not have a growth mindset &mdash; they need to change their strategy, seek feedback, and study the correct technique. Growth mindset must be paired with effective learning methods. In the electrical trades, this means: effort is necessary but not sufficient. You also need good instruction, quality feedback, deliberate practice of weak areas, and periodic reflection on what is and isn&rsquo;t working.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions (Quiz — correctAnswer, 0-indexed)                   */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      'Carol Dweck&rsquo;s research on mindset was primarily conducted at which institution?',
    options: ['MIT', 'Harvard University', 'Stanford University', 'Oxford University'],
    correctAnswer: 2,
    explanation:
      'Carol Dweck is the Lewis and Virginia Eaton Professor of Psychology at Stanford University, where she has conducted the majority of her mindset research since the 1970s. Her 2006 book Mindset: The New Psychology of Success synthesised decades of research and brought the growth mindset concept to a wider audience. The research has been replicated across multiple institutions and countries, but Dweck&rsquo;s lab at Stanford remains the primary source of the foundational studies.',
  },
  {
    id: 2,
    question:
      'Neural plasticity &mdash; the brain&rsquo;s ability to form new connections and pathways &mdash; provides biological support for which key claim of growth mindset theory?',
    options: [
      'Intelligence is completely determined by genetics',
      'The brain&rsquo;s capacity for learning and skill development is fixed by age 25',
      'Abilities and intelligence can be developed through learning and practice, because the brain physically changes in response to experience',
      'People with higher IQ have more neural plasticity than people with lower IQ',
    ],
    correctAnswer: 2,
    explanation:
      'Neural plasticity (also called neuroplasticity or brain plasticity) is the scientific foundation for growth mindset. It refers to the brain&rsquo;s ability to reorganise itself by forming new neural connections throughout life in response to learning, experience, and even injury. When you learn a new skill &mdash; such as terminating a three-phase motor or reading a schematic &mdash; your brain physically changes: neurons form new connections, myelin (insulation around neurons) thickens to speed up signal transmission, and entire brain regions can expand. This was demonstrated in a famous study of London taxi drivers, who showed enlarged hippocampi (the brain region responsible for spatial navigation) after learning &ldquo;The Knowledge&rdquo;. For electricians, this means that skills that feel impossibly difficult at first &mdash; advanced fault finding, cable calculations, design &mdash; become easier through practice because your brain is literally building the neural infrastructure to support them.',
  },
  {
    id: 3,
    question:
      'A qualified electrician is asked to inspect and test a large commercial installation &mdash; a task they have limited experience with. They feel anxious and think &ldquo;I&rsquo;m going to mess this up, I&rsquo;m not an inspection guy.&rdquo; What would be the MOST effective growth mindset reframe?',
    options: [
      '&ldquo;It doesn&rsquo;t matter if I mess it up, effort is all that counts&rdquo;',
      '&ldquo;I&rsquo;ll just fake confidence and hope for the best&rdquo;',
      '&ldquo;This is outside my current skillset. I&rsquo;ll review GN3, ask a more experienced inspector for guidance, and approach this as a learning opportunity&rdquo;',
      '&ldquo;I should turn this job down because I&rsquo;m not naturally good at inspection work&rdquo;',
    ],
    correctAnswer: 2,
    explanation:
      'Option C is the only true growth mindset response. It acknowledges the current gap in skill (&ldquo;outside my current skillset&rdquo; &mdash; note the word &ldquo;current&rdquo;, not &ldquo;permanent&rdquo;), identifies a specific learning strategy (review GN3, seek guidance from an experienced inspector), and frames the challenge as an opportunity to develop rather than a threat to identity. Option A reflects a false growth mindset &mdash; effort alone without strategy is not sufficient. Option B ignores the real gap in competence and could lead to unsafe or non-compliant work. Option D is a fixed mindset statement that treats ability as innate. The trade environment often discourages this kind of honest acknowledgment of learning needs, but it is essential for both competence development and electrical safety.',
  },
  {
    id: 4,
    question:
      'Dweck warns that praising effort alone, without acknowledging effective strategy or learning, can lead to what she calls &ldquo;false growth mindset&rdquo;. Which of the following is an example of ineffective praise that might encourage false growth mindset?',
    options: [
      '&ldquo;You&rsquo;re working hard on this, and I can see you&rsquo;re using the correct testing sequence &mdash; that&rsquo;s good discipline&rdquo;',
      '&ldquo;I know this fault is tricky, but you&rsquo;re using a logical method &mdash; testing voltage at each point and eliminating sections systematically. That&rsquo;s the right approach&rdquo;',
      '&ldquo;You&rsquo;re trying really hard, keep going&rdquo; (said to an apprentice who is repeating the same incorrect crimping technique)',
      '&ldquo;You struggled with cable calculations at first, but you&rsquo;ve clearly put in the work to understand the formulas and now you&rsquo;re applying them correctly&rdquo;',
    ],
    correctAnswer: 2,
    explanation:
      'Option C is ineffective praise because it praises effort (&ldquo;trying really hard&rdquo;) without addressing the fact that the effort is misdirected &mdash; the apprentice is using an incorrect technique. This reinforces the false belief that effort alone leads to success, when in fact the apprentice needs corrective feedback and strategy adjustment. True growth mindset praise should acknowledge effort AND effective strategy, or provide feedback to improve strategy. Options A, B, and D all combine recognition of effort with specific acknowledgment of correct methods or strategic thinking. In apprentice training, this distinction is crucial: supervisors must praise hard work, but they must also ensure that the work is being done correctly and guide apprentices towards more effective approaches when needed.',
  },
  {
    id: 5,
    question:
      'An electrician says: &ldquo;I failed my 2391 Inspection &amp; Testing exam twice. I&rsquo;m clearly not academic enough for this qualification.&rdquo; Which element of this statement most strongly indicates a fixed mindset?',
    options: [
      'Acknowledging the two failed attempts',
      'Expressing disappointment about the outcome',
      'The phrase &ldquo;I&rsquo;m clearly not academic enough&rdquo; &mdash; attributing failure to a fixed personal trait rather than to strategy, preparation, or other changeable factors',
      'Considering whether the 2391 qualification is right for them',
    ],
    correctIndex: 2,
    explanation:
      'The phrase &ldquo;I&rsquo;m clearly not academic enough&rdquo; is a fixed mindset attribution. It frames the failure as a reflection of a fixed personal characteristic (&ldquo;not academic&rdquo;) rather than examining the real, changeable causes such as study methods, time allocated to preparation, understanding of the exam format, quality of the training course, or specific knowledge gaps. A growth mindset reframe would be: &ldquo;I failed the 2391 twice. I need to analyse where I lost marks, identify my weak areas, change my study approach, and possibly get additional support or tutoring in the topics I&rsquo;m struggling with.&rdquo; Many electricians who initially failed advanced qualifications such as the 2391 or the HNC have gone on to pass after changing their approach &mdash; the difference was strategy and persistence, not innate academic ability.',
  },
  {
    id: 6,
    question:
      'According to Dweck, which of the following situations is most likely to trigger a fixed mindset response, even in people who generally have a growth mindset?',
    options: [
      'Learning a completely new skill where you have no prior experience',
      'Facing a significant setback or public failure in an area central to your professional identity',
      'Receiving constructive criticism from a peer',
      'Watching someone else succeed at a task you have not yet attempted',
    ],
    correctAnswer: 1,
    explanation:
      'Dweck&rsquo;s research shows that even people who generally hold a growth mindset can experience fixed mindset triggers &mdash; situations that provoke defensive, self-protective thinking. The most powerful trigger is a significant setback or failure in an area that is core to your identity. For electricians, this might be: failing an important exam, making a serious on-site error that is visible to others, being publicly criticised by a supervisor, or struggling with a task that &ldquo;everyone else&rdquo; finds easy. The threat to professional identity activates fixed mindset defences: blaming others, making excuses, avoiding similar challenges in future, or labelling yourself as &ldquo;not cut out for this&rdquo;. Recognising these triggers is the first step to managing them. The growth mindset response is to acknowledge the setback, analyse what went wrong without attacking your identity, extract the lesson, and adjust your approach.',
  },
  {
    id: 7,
    question:
      'A 45-year-old electrician who has worked in domestic installation for 20 years wants to move into industrial maintenance but thinks &ldquo;I&rsquo;ve been doing houses too long, I&rsquo;ll never understand PLCs and three-phase motors&rdquo;. Neuroplasticity research would suggest:',
    options: [
      'The electrician is correct &mdash; after age 40, the brain loses the ability to learn new technical skills',
      'The electrician&rsquo;s brain retains significant plasticity, and they can develop new technical skills through study and practice, though it may take longer than it would have at age 20',
      'PLCs and three-phase systems require a &ldquo;mathematical brain&rdquo; that the electrician either has or does not have',
      'The electrician should focus only on skills they have already mastered, as branching into new areas after 40 is inefficient',
    ],
    correctAnswer: 1,
    explanation:
      'Neuroplasticity research clearly demonstrates that the adult brain &mdash; even well into middle age and beyond &mdash; retains substantial capacity for learning and skill development. While it is true that certain types of plasticity decline with age (particularly the rapid synaptic growth seen in childhood), adult brains compensate with stronger strategic learning, deeper knowledge integration, and more effective use of existing neural networks. The electrician&rsquo;s 20 years of electrical experience provide a massive foundation to build on &mdash; they already understand voltage, current, resistance, safety, circuit protection, and systematic fault finding. Learning PLCs and three-phase systems is an extension of this existing knowledge, not a completely separate domain. The statement &ldquo;I&rsquo;ll never understand&rdquo; is a fixed mindset block. The reality is that thousands of electricians make exactly this transition (domestic to industrial) in their 40s and 50s through formal training (e.g., Level 3 qualifications, PLC courses) and on-the-job learning.',
  },
  {
    id: 8,
    question:
      'Dweck&rsquo;s research found that students with a growth mindset tend to view challenging tasks as:',
    options: [
      'Threats to their self-esteem that should be avoided when possible',
      'Evidence that they are in the wrong field or career',
      'Opportunities to learn and develop, even if they involve struggle and temporary failure',
      'Unfair obstacles placed by assessors or instructors',
    ],
    correctAnswer: 2,
    explanation:
      'This is one of the central findings of Dweck&rsquo;s mindset research. Individuals with a growth mindset interpret challenge, difficulty, and even failure very differently from those with a fixed mindset. Where a fixed mindset sees challenge as a threat (&ldquo;If I struggle, it means I&rsquo;m not smart&rdquo;), a growth mindset sees challenge as information and opportunity (&ldquo;This is hard, which means I&rsquo;m learning something new&rdquo;). This difference in interpretation leads to completely different behaviours: growth mindset individuals seek out challenging tasks, persist longer, use deeper learning strategies, and ultimately achieve more. For apprentice electricians, this pattern is visible in how different individuals respond to difficult topics such as AC theory or three-phase systems. Those who see the difficulty as a sign of their inadequacy often give up or scrape through with surface-level understanding. Those who see it as a normal part of mastery engage more deeply and emerge with stronger competence.',
  },
];

export default function GSModule1Section1() {
  useSEO({
    title: 'Fixed vs Growth Mindset | Goal Setting & Growth Module 1.1',
    description:
      'Carol Dweck&rsquo;s Stanford research, neural plasticity, fixed vs growth mindset, and the power of &ldquo;yet&rdquo;.',
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
            <Link to="../gs-module-1">
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
            <Lightbulb className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 1 &middot; SECTION 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Fixed vs Growth Mindset
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Carol Dweck&rsquo;s Stanford research, neural plasticity, fixed mindset triggers in the
            trades, and the power of &ldquo;yet&rdquo;
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Fixed mindset:</strong> Believing abilities are static (&ldquo;I&rsquo;m not
                good at maths&rdquo;)
              </li>
              <li>
                <strong>Growth mindset:</strong> Believing abilities can be developed
                (&ldquo;I&rsquo;m not good at maths yet&rdquo;)
              </li>
              <li>
                <strong>Neural plasticity</strong> proves the brain can change through learning at
                any age
              </li>
              <li>
                <strong>Mindset affects</strong> how you respond to challenge, failure, and feedback
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Career progression:</strong> Fixed mindset limits what you attempt; growth
                mindset opens doors
              </li>
              <li>
                <strong>Resilience:</strong> Growth mindset helps you bounce back from setbacks and
                mistakes
              </li>
              <li>
                <strong>Learning speed:</strong> Embracing challenge leads to deeper, faster skill
                development
              </li>
              <li>
                <strong>Job satisfaction:</strong> Seeing yourself as capable of growth reduces
                stress and increases confidence
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              'Define fixed mindset and growth mindset according to Carol Dweck&rsquo;s research',
              'Explain the concept of neural plasticity and its relevance to learning and skill development',
              'Identify fixed mindset triggers common in the electrical trades',
              'Describe the difference between praise for effort and praise for intelligence',
              'Apply the &ldquo;power of yet&rdquo; reframe to transform limiting self-talk',
              'Recognise false growth mindset and distinguish it from true growth mindset',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: What is Mindset? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            What is Mindset? &mdash; Carol Dweck&rsquo;s Research
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The concept of mindset was developed by Carol Dweck, the Lewis and Virginia Eaton
                Professor of Psychology at Stanford University, through decades of research
                beginning in the 1970s. Dweck&rsquo;s central discovery was that people hold
                fundamentally different beliefs about the nature of intelligence and ability, and
                that these beliefs &mdash; more than talent, background, or resources &mdash;
                determine how individuals respond to challenge, setback, and effort. She identified
                two core mindsets: the <strong>fixed mindset</strong> and the{' '}
                <strong>growth mindset</strong>.
              </p>

              <p>
                A <strong>fixed mindset</strong> is the belief that your intelligence, abilities,
                and talents are static traits &mdash; you have a certain amount, and that&rsquo;s
                that. People with a fixed mindset believe that talent alone creates success, without
                effort. They tend to avoid challenges (because failure would expose their
                limitations), give up easily when faced with obstacles, see effort as fruitless
                (&ldquo;if I have to work hard, it means I&rsquo;m not naturally good at it&rdquo;),
                ignore useful negative feedback, and feel threatened by the success of others. As a
                result, they often plateau early and achieve less than their potential.
              </p>

              <p>
                A <strong>growth mindset</strong>, by contrast, is the belief that abilities can be
                developed through dedication, strategy, and hard work. Talent is just the starting
                point. People with a growth mindset embrace challenges (because challenge is where
                learning happens), persist in the face of setbacks, see effort as the path to
                mastery, learn from criticism, and find lessons and inspiration in the success of
                others. As a result, they reach higher levels of achievement and have greater
                resilience. Crucially, Dweck&rsquo;s research shows that mindset is not a fixed
                personality trait &mdash; it can be changed through awareness, reflection, and
                practice.
              </p>

              <p>
                For electricians and tradespeople, these concepts are directly applicable. The
                electrical industry requires continuous learning throughout your career: new
                regulations (BS 7671 amendments), new technologies (EV charging, battery storage,
                smart home systems), new testing methods, new products. A fixed mindset electrician
                sees these changes as threats and thinks &ldquo;I&rsquo;m too old to learn this
                stuff&rdquo; or &ldquo;I&rsquo;m not a computer person, I can&rsquo;t do smart home
                tech&rdquo;. A growth mindset electrician sees them as opportunities and thinks
                &ldquo;I haven&rsquo;t learned this yet, but with the right training and practice I
                can add this to my skillset&rdquo;. The difference in career trajectory over 10 or
                20 years is enormous.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Mindset in the Apprentice Years
                </p>
                <p className="text-base text-white leading-relaxed">
                  Apprenticeships are built on the growth mindset principle: you start knowing very
                  little and systematically build competence through instruction, practice,
                  feedback, and reflection. Yet many apprentices unconsciously adopt fixed mindset
                  language: &ldquo;I&rsquo;m rubbish at theory&rdquo;, &ldquo;I&rsquo;m just a
                  practical person&rdquo;, &ldquo;I can&rsquo;t do maths&rdquo;. These statements
                  become self-fulfilling prophecies. Recognising and reframing them is one of the
                  most powerful things an apprentice can do.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: The Neuroscience — Neural Plasticity */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            The Neuroscience &mdash; Neural Plasticity
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The growth mindset concept is not just psychological theory &mdash; it is grounded
                in neuroscience. The brain is not a fixed, hardwired organ. It is plastic &mdash;
                meaning it can reorganise itself, form new neural connections, and even grow new
                neurons in response to learning and experience. This property is called{' '}
                <strong>neural plasticity</strong> or <strong>neuroplasticity</strong>.
              </p>

              <p>
                When you learn a new skill, your brain undergoes physical change. Neurons (brain
                cells) form new synaptic connections with other neurons, creating pathways for
                information flow. With repeated practice, these pathways strengthen &mdash; a
                process called <strong>long-term potentiation</strong>. The brain also produces
                myelin, a fatty insulation that wraps around the axons of neurons and speeds up
                signal transmission, making learned skills faster and more automatic. This is why a
                task that felt impossibly complex when you first attempted it &mdash; such as
                terminating a circuit breaker or reading a three-phase schematic &mdash; eventually
                becomes routine. Your brain has built the infrastructure to support it.
              </p>

              <p>
                A famous example of neuroplasticity in action comes from research on London black
                cab drivers, who must pass &ldquo;The Knowledge&rdquo; &mdash; a gruelling test
                requiring them to memorise 25,000 streets and thousands of routes. Brain scans
                showed that trainee taxi drivers who passed The Knowledge had significantly larger
                posterior hippocampi (the brain region responsible for spatial memory) compared to
                those who failed or did not attempt the training. The brain physically changed to
                accommodate the new skill. This was not innate talent &mdash; it was the result of
                intensive, deliberate learning.
              </p>

              <p>
                For electricians, the implications are profound. Skills that seem &ldquo;too
                technical&rdquo; or &ldquo;too complicated&rdquo; &mdash; such as fault finding on
                complex control circuits, understanding power factor correction, or designing
                lighting systems &mdash; are not beyond your capability. They require time, study,
                practice, and feedback, but your brain is physically capable of developing the
                neural architecture to master them. The limiting factor is usually belief (fixed
                mindset) or ineffective learning strategies, not brain capacity.
              </p>

              <p>
                Importantly, neuroplasticity continues throughout life. While it is true that
                certain types of plasticity are higher in childhood (particularly rapid synaptic
                growth), adult brains retain substantial capacity for learning and adaptation. Older
                learners may take slightly longer to acquire some skills, but they compensate with
                better strategic thinking, deeper integration of knowledge, and more effective use
                of prior experience. The idea that &ldquo;you can&rsquo;t teach an old dog new
                tricks&rdquo; is neurologically false.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Practical Implications of Neuroplasticity
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Struggle is signal:</strong> When a task feels difficult, it means
                      your brain is building new connections. This is learning in action, not
                      evidence of inability.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Repetition strengthens pathways:</strong> Practising a skill (conduit
                      bending, cable calculations, testing sequences) makes it easier because you
                      are reinforcing the neural pathways.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Sleep matters:</strong> Memory consolidation and neural growth happen
                      during sleep, which is why studying before bed and getting adequate rest
                      improves retention.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Use it or lose it:</strong> Neural pathways that are not used weaken
                      over time (synaptic pruning). This is why skills you don&rsquo;t practise
                      become rusty.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: The Praise Study */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            The Praise Study &mdash; Effort vs Intelligence
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                One of Dweck&rsquo;s most influential studies examined how different types of praise
                affect children&rsquo;s mindset and performance. In the study, children were given a
                set of puzzles to solve. After completing the puzzles successfully, half the
                children were praised for their intelligence (&ldquo;Wow, you&rsquo;re really smart
                at this&rdquo;) and the other half were praised for their effort (&ldquo;Wow, you
                must have worked really hard on this&rdquo;). The children were then offered a
                choice: they could attempt a challenging new set of puzzles from which they would
                learn a lot, or an easy set similar to the ones they had just completed.
              </p>

              <p>
                The results were striking. Children praised for intelligence were far more likely to
                choose the easy puzzles &mdash; they wanted to protect their &ldquo;smart&rdquo;
                label and avoid the risk of failure on a difficult task. Children praised for effort
                were far more likely to choose the challenging puzzles &mdash; they saw challenge as
                an opportunity to learn, not a threat to their identity. When the children were
                later given a very difficult set of puzzles that most could not solve, the
                intelligence-praised group became discouraged, lost confidence, and performed worse
                on subsequent easier puzzles than they had at the start. The effort-praised group,
                by contrast, remained engaged, attributed their struggles to insufficient effort
                rather than lack of ability, and maintained or even improved their performance.
              </p>

              <p>
                The study demonstrates that well-meaning praise can backfire. When you tell an
                apprentice &ldquo;You&rsquo;re a natural&rdquo; or &ldquo;You&rsquo;re really good
                at this&rdquo;, you are reinforcing a fixed mindset &mdash; the belief that success
                is due to innate talent. If they later encounter difficulty, they will interpret it
                as evidence that they are not, in fact, &ldquo;a natural&rdquo;, leading to
                discouragement and withdrawal. If instead you say &ldquo;You&rsquo;ve clearly put in
                the work to understand this&rdquo; or &ldquo;I can see you&rsquo;re using a
                methodical approach &mdash; that&rsquo;s good discipline&rdquo;, you are reinforcing
                a growth mindset &mdash; the belief that success comes from effort and strategy.
              </p>

              <p>
                In electrical training environments, this distinction is critical. Supervisors,
                trainers, and assessors should avoid labelling apprentices as &ldquo;bright&rdquo;
                or &ldquo;not academic&rdquo;. Instead, they should praise specific behaviours:
                &ldquo;You took your time on that termination and checked the torque settings
                &mdash; that&rsquo;s the standard we want&rdquo;. &ldquo;You went back to the regs
                book to confirm the disconnection time &mdash; that&rsquo;s good practice&rdquo;.
                &ldquo;You struggled with this fault at first but you kept testing logically and
                found it &mdash; that&rsquo;s resilience&rdquo;. This type of feedback encourages
                effort, strategy, and persistence &mdash; the very qualities that lead to long-term
                competence.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  How to Praise Effectively (for Trainers and Supervisors)
                </p>
                <p className="text-base text-white leading-relaxed mb-2">
                  <strong>Instead of:</strong> &ldquo;You&rsquo;re really smart&rdquo;,
                  &ldquo;You&rsquo;re a natural&rdquo;, &ldquo;You&rsquo;re talented&rdquo;
                </p>
                <p className="text-base text-white leading-relaxed">
                  <strong>Say:</strong> &ldquo;You&rsquo;ve worked hard on this and it shows&rdquo;,
                  &ldquo;I like the method you used to solve that&rdquo;, &ldquo;You&rsquo;ve
                  clearly studied the theory and now you&rsquo;re applying it correctly&rdquo;,
                  &ldquo;You didn&rsquo;t give up when it got tricky &mdash; that&rsquo;s the right
                  attitude&rdquo;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Fixed Mindset Triggers in the Trades */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Fixed Mindset Triggers in the Trades
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Even people who generally have a growth mindset can experience{' '}
                <strong>fixed mindset triggers</strong> &mdash; situations that provoke defensive,
                self-protective thinking. Dweck&rsquo;s research identifies several common triggers:
                facing a major setback, receiving harsh criticism, comparing yourself to someone
                more skilled, encountering a challenge in an area core to your identity, or feeling
                judged by others. For electricians, specific fixed mindset triggers include:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Failing an important exam</strong> (such as AM2, 2391 Inspection &amp;
                    Testing, or EAL Level 3) and thinking &ldquo;I&rsquo;m not cut out for
                    this&rdquo; rather than &ldquo;I need to change my study approach&rdquo;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Being publicly corrected</strong> on site by a supervisor or more
                    experienced electrician and feeling humiliated or defensive rather than seeing
                    it as a learning opportunity
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Struggling with a task</strong> that &ldquo;everyone else&rdquo; seems
                    to find easy (such as conduit bending, cable calculations, or reading drawings)
                    and concluding &ldquo;I&rsquo;m just not practical&rdquo; or &ldquo;I&rsquo;m
                    not technical&rdquo;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>New technology or regulation changes</strong> (such as EV charging, AFDD
                    requirements, or smart home integration) and thinking &ldquo;I&rsquo;m too old
                    to learn this&rdquo; rather than &ldquo;This is new to everyone, I can learn
                    it&rdquo;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Being asked to do a type of work</strong> you have little experience
                    with (such as inspection, design, or commissioning) and declining because
                    &ldquo;I&rsquo;m an installation guy, not an inspector&rdquo;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Watching a younger or less experienced electrician</strong> pick up a
                    skill faster than you and feeling threatened or defensive rather than curious
                    about their learning method
                  </span>
                </li>
              </ul>

              <p>
                Recognising these triggers is the first step to managing them. When you notice
                yourself thinking in fixed mindset terms (&ldquo;I&rsquo;m not good at...&rdquo;,
                &ldquo;I can&rsquo;t...&rdquo;, &ldquo;I&rsquo;m not a... person&rdquo;), pause and
                reframe. Ask yourself: Is this actually a permanent limitation, or is it a current
                gap in knowledge or practice that I could address? What would I need to learn or do
                to develop this skill? Who could I ask for help or guidance? What is the first small
                step I could take? This shift from fixed to growth mindset language often unlocks
                action that would otherwise have been blocked by self-limiting beliefs.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Common Fixed Mindset Statements in the Trades (and Growth Mindset Reframes)
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong>Fixed:</strong> &ldquo;I&rsquo;m rubbish at maths&rdquo; &bull;{' '}
                      <strong>Growth:</strong> &ldquo;I find maths difficult, but I can improve with
                      practice and support&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong>Fixed:</strong> &ldquo;I&rsquo;m just a practical person, not
                      academic&rdquo; &bull; <strong>Growth:</strong> &ldquo;I learn best through
                      hands-on practice, but I can also develop my theoretical understanding&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong>Fixed:</strong> &ldquo;I&rsquo;m too old to learn new tech&rdquo;
                      &bull; <strong>Growth:</strong> &ldquo;New technology takes time to learn, but
                      I&rsquo;ve successfully learned new skills before&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong>Fixed:</strong> &ldquo;I&rsquo;m not a designer, I just install&rdquo;
                      &bull; <strong>Growth:</strong> &ldquo;I haven&rsquo;t done much design work
                      yet, but I could develop that skill if I wanted to&rdquo;
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: The Power of "Yet" */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            The Power of &ldquo;Yet&rdquo;
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                One of Dweck&rsquo;s most memorable concepts is what she calls &ldquo;the power of
                yet&rdquo;. It is a simple linguistic shift with profound psychological impact.
                Compare these two statements:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                  <span>
                    <strong>Fixed mindset:</strong> &ldquo;I can&rsquo;t do this.&rdquo;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                  <span>
                    <strong>Growth mindset:</strong> &ldquo;I can&rsquo;t do this yet.&rdquo;
                  </span>
                </li>
              </ul>

              <p>
                The word &ldquo;yet&rdquo; changes the entire meaning. &ldquo;I can&rsquo;t do
                this&rdquo; is a statement of permanent inability &mdash; a closed door. &ldquo;I
                can&rsquo;t do this yet&rdquo; is a statement of current limitation with implied
                future possibility &mdash; an open door. The first statement ends the conversation.
                The second invites questions: What would I need to learn? Who could teach me? What
                is the first step? Research shows that simply teaching students to add the word
                &ldquo;yet&rdquo; to their self-talk leads to measurable improvements in
                persistence, effort, and achievement.
              </p>

              <p>
                For electricians, the power of yet is particularly relevant when facing new or
                difficult aspects of the trade. &ldquo;I can&rsquo;t understand three-phase&rdquo;
                becomes &ldquo;I don&rsquo;t understand three-phase yet &mdash; I need to study the
                theory and see it explained with diagrams&rdquo;. &ldquo;I&rsquo;m no good at fault
                finding&rdquo; becomes &ldquo;I&rsquo;m not confident at fault finding yet &mdash; I
                need more practice and a systematic method&rdquo;. &ldquo;I can&rsquo;t pass the
                2391 exam&rdquo; becomes &ldquo;I haven&rsquo;t passed the 2391 exam yet &mdash; I
                need to analyse my weak areas and change my study approach&rdquo;.
              </p>

              <p>
                The &ldquo;yet&rdquo; mindset is not about blind optimism or denying real
                constraints. It is about refusing to prematurely close the door on your own
                potential. Many electricians have unconsciously written off entire areas of the
                trade &mdash; design, inspection, teaching, running a business &mdash; with fixed
                mindset language (&ldquo;I&rsquo;m not that kind of electrician&rdquo;). The truth
                is, they haven&rsquo;t developed those skills yet, often because they never tried.
                Adding &ldquo;yet&rdquo; to your internal dialogue keeps possibilities open and
                encourages exploration.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Practical Exercise: Reframe Your Limitations
                </p>
                <p className="text-base text-white leading-relaxed">
                  Identify three things in your electrical career that you have labelled as &ldquo;I
                  can&rsquo;t&rdquo; or &ldquo;I&rsquo;m not good at&rdquo;. Write them down. Now
                  rewrite each one using &ldquo;yet&rdquo; language and add a next step. For
                  example: &ldquo;I can&rsquo;t do inspection work&rdquo; becomes &ldquo;I
                  haven&rsquo;t developed inspection skills yet. My next step is to read GN3 and
                  shadow an experienced inspector&rdquo;. This exercise makes the growth path
                  visible.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06: False Growth Mindset */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>
            False Growth Mindset &mdash; Dweck&rsquo;s Warning
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                In recent years, Dweck has expressed concern about how growth mindset has been
                misunderstood and misapplied in educational and workplace settings. She warns
                against what she calls <strong>&ldquo;false growth mindset&rdquo;</strong> &mdash;
                the belief that simply praising effort, using positive language, or claiming to have
                a growth mindset is sufficient, without actually changing the underlying beliefs or
                strategies.
              </p>

              <p>
                False growth mindset manifests in several ways. One is praising effort regardless of
                outcome or strategy. If an apprentice is using an incorrect technique but
                &ldquo;trying hard&rdquo;, praising the effort without correcting the technique does
                not lead to improvement &mdash; it reinforces ineffective practice. True growth
                mindset pairs effort with strategy: &ldquo;You&rsquo;re working hard, and I want to
                show you a more effective technique that will get better results&rdquo;. Another
                form of false growth mindset is claiming to believe that anyone can learn anything,
                while unconsciously writing off certain students or apprentices as &ldquo;not
                academic&rdquo; or &ldquo;low ability&rdquo;. Actions speak louder than words.
              </p>

              <p>
                A third manifestation is confusing growth mindset with relentless positivity or
                refusing to acknowledge real difficulty. Growth mindset does not mean pretending
                that everything is easy or that struggle is always enjoyable. It means understanding
                that struggle is a normal part of learning, that setbacks provide information, and
                that abilities can be developed with the right approach. An apprentice who is
                finding AC theory difficult is not helped by being told &ldquo;just stay
                positive&rdquo;. They are helped by honest acknowledgment of the difficulty
                (&ldquo;AC theory is one of the hardest parts of the course&rdquo;), specific
                guidance on strategy (&ldquo;draw the waveform diagrams, work through examples step
                by step, and don&rsquo;t move on until you understand each concept&rdquo;), and
                reassurance that competence will develop with effort and time.
              </p>

              <p>
                For electricians and those training electricians, the lesson is this: growth mindset
                is not a magic spell or a substitute for good teaching and effective practice. It is
                a belief system that must be backed up with genuine support, strategic feedback, and
                evidence-based learning methods. Apprentices need to hear &ldquo;you can develop
                this skill&rdquo;, but they also need to be shown how, given quality instruction,
                and supported through the inevitable difficulties.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  True Growth Mindset vs False Growth Mindset
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>True:</strong> Abilities can be developed through effective effort,
                      strategy, feedback, and persistence
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong>False:</strong> Anyone can learn anything just by trying hard, without
                      need for strategy or support
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>True:</strong> Praising specific effort and effective strategies
                      (&ldquo;You used a systematic fault-finding method, that&rsquo;s
                      excellent&rdquo;)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong>False:</strong> Praising effort alone without addressing ineffective
                      methods (&ldquo;You&rsquo;re trying hard, keep going&rdquo; while the
                      apprentice repeats the same mistake)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>True:</strong> Acknowledging difficulty and providing support
                      (&ldquo;This is a challenging topic, let&rsquo;s break it down step by
                      step&rdquo;)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong>False:</strong> Denying difficulty or relying on positivity alone
                      (&ldquo;It&rsquo;s easy if you just believe in yourself&rdquo;)
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 07: Section Summary */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">07</span>
            Section Summary
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                This section has introduced the concept of mindset and its relevance to learning and
                development in the electrical trades. The key points to carry forward are:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Fixed mindset</strong> is the belief that abilities are static. It leads
                    to avoiding challenges, giving up easily, and feeling threatened by
                    others&rsquo; success.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Growth mindset</strong> is the belief that abilities can be developed.
                    It leads to embracing challenges, persisting through setbacks, and learning from
                    feedback.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Neural plasticity</strong> provides the biological foundation for growth
                    mindset &mdash; the brain physically changes in response to learning.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Praise for effort and strategy</strong> is more effective than praise
                    for intelligence or talent. It encourages growth-oriented behaviour.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>The power of &ldquo;yet&rdquo;</strong> transforms fixed statements
                    (&ldquo;I can&rsquo;t&rdquo;) into growth statements (&ldquo;I can&rsquo;t
                    yet&rdquo;), keeping the door open to development.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Fixed mindset triggers</strong> are common in the trades (failure, harsh
                    criticism, new technology) and must be recognised and managed.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>False growth mindset</strong> is praising effort without strategy,
                    denying difficulty, or claiming growth mindset without genuine belief or
                    support.
                  </span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Next:</strong> In Section 2, we will examine why
                  goal setting matters for tradespeople. We will explore Locke &amp; Latham&rsquo;s
                  Goal Setting Theory, the research evidence linking goals to performance, and why
                  most electricians don&rsquo;t set formal goals &mdash; despite the clear benefits
                  of doing so.
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
        <Quiz title="Section 1 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../gs-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../gs-module-1-section-2">
              Next: Why Goal Setting Matters for Tradespeople
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
