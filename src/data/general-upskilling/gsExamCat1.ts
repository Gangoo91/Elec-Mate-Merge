/**
 * General Upskilling Mock Exam — Category 1
 * Understanding Goals &amp; Growth Mindset
 *
 * 40 questions: 16 basic, 16 intermediate, 8 advanced
 */

import { StandardMockQuestion } from '@/types/standardMockExam';

export const gsCat1Questions: StandardMockQuestion[] = [
  // =====================================================
  // BASIC (1-16)
  // =====================================================
  {
    id: 1,
    question:
      'According to Carol Dweck&rsquo;s research at Stanford, what is a &ldquo;growth mindset&rdquo;?',
    options: [
      'The belief that abilities can be developed through dedication and hard work',
      'The belief that intelligence is fixed at birth and cannot change',
      'A positive attitude that ignores weaknesses',
      'The idea that only naturally talented people succeed',
    ],
    correctAnswer: 0,
    explanation:
      'Carol Dweck&rsquo;s landmark research at Stanford University defined a growth mindset as the belief that basic qualities like intelligence and talent can be developed through effort, strategies, and help from others. This contrasts with a fixed mindset, where people believe their qualities are carved in stone.',
    section: 'Understanding Goals &amp; Growth Mindset',
    difficulty: 'basic' as const,
    topic: 'Growth Mindset Fundamentals',
    category: 'Understanding Goals &amp; Growth Mindset',
  },
  {
    id: 2,
    question: 'What is a &ldquo;fixed mindset&rdquo; as defined by Carol Dweck?',
    options: [
      'The belief that your qualities are carved in stone and cannot be changed',
      'A mindset focused on fixing problems quickly',
      'The ability to stay focused on a single task',
      'A preference for routine and predictable work',
    ],
    correctAnswer: 0,
    explanation:
      'Dweck describes a fixed mindset as the belief that your intelligence, talent, and personality are static traits that cannot be meaningfully developed. People with a fixed mindset tend to avoid challenges and feel threatened by the success of others.',
    section: 'Understanding Goals &amp; Growth Mindset',
    difficulty: 'basic' as const,
    topic: 'Fixed Mindset',
    category: 'Understanding Goals &amp; Growth Mindset',
  },
  {
    id: 3,
    question:
      'What does the concept of &ldquo;the power of yet&rdquo; mean in growth mindset theory?',
    options: [
      'Adding &ldquo;yet&rdquo; to statements of inability reframes them as learning opportunities',
      'You should always say yes to every opportunity',
      'Success is guaranteed if you wait long enough',
      'Failures should be ignored until they resolve themselves',
    ],
    correctAnswer: 0,
    explanation:
      'Dweck popularised the idea that saying &ldquo;I can&rsquo;t do this yet&rdquo; instead of &ldquo;I can&rsquo;t do this&rdquo; transforms a statement of defeat into a statement of potential. This small linguistic shift reinforces the belief that skills develop over time with effort and practice.',
    section: 'Understanding Goals &amp; Growth Mindset',
    difficulty: 'basic' as const,
    topic: 'The Power of Yet',
    category: 'Understanding Goals &amp; Growth Mindset',
  },
  {
    id: 4,
    question: 'Neural plasticity refers to the brain&rsquo;s ability to do which of the following?',
    options: [
      'Form new neural connections and reorganise itself throughout life',
      'Store unlimited amounts of information without decay',
      'Function without sleep for extended periods',
      'Operate at the same capacity regardless of age',
    ],
    correctAnswer: 0,
    explanation:
      'Neural plasticity (also called neuroplasticity) is the brain&rsquo;s ability to reorganise itself by forming new neural pathways at any age. Research from institutions including University College London has shown that the adult brain can continue to develop, providing a biological basis for Dweck&rsquo;s growth mindset theory.',
    section: 'Understanding Goals &amp; Growth Mindset',
    difficulty: 'basic' as const,
    topic: 'Neural Plasticity',
    category: 'Understanding Goals &amp; Growth Mindset',
  },
  {
    id: 5,
    question:
      'Which psychologist is most closely associated with the concept of &ldquo;self-efficacy&rdquo;?',
    options: ['Albert Bandura', 'Carol Dweck', 'Angela Duckworth', 'Abraham Maslow'],
    correctAnswer: 0,
    explanation:
      'Albert Bandura, a psychologist at Stanford University, introduced the concept of self-efficacy in 1977. Self-efficacy is a person&rsquo;s belief in their ability to succeed in specific situations or accomplish a task, and it is one of the most powerful predictors of performance and motivation.',
    section: 'Understanding Goals &amp; Growth Mindset',
    difficulty: 'basic' as const,
    topic: 'Self-Efficacy',
    category: 'Understanding Goals &amp; Growth Mindset',
  },
  {
    id: 6,
    question:
      'Angela Duckworth defines &ldquo;grit&rdquo; as a combination of which two qualities?',
    options: [
      'Passion and perseverance',
      'Intelligence and talent',
      'Confidence and charisma',
      'Speed and accuracy',
    ],
    correctAnswer: 0,
    explanation:
      'In her research at the University of Pennsylvania, Angela Duckworth defined grit as the combination of passion (a deep, enduring interest) and perseverance (sustained effort over time). Her studies found that grit predicted success more reliably than IQ or talent alone.',
    section: 'Understanding Goals &amp; Growth Mindset',
    difficulty: 'basic' as const,
    topic: 'Grit',
    category: 'Understanding Goals &amp; Growth Mindset',
  },
  {
    id: 7,
    question: 'In the comfort zone model, which zone comes immediately after the comfort zone?',
    options: ['The fear zone', 'The learning zone', 'The growth zone', 'The danger zone'],
    correctAnswer: 0,
    explanation:
      'The comfort zone model describes four concentric zones: comfort, fear, learning, and growth. When you first step outside your comfort zone, you enter the fear zone, where self-doubt and anxiety are common. Pushing through the fear zone leads to the learning zone, where new skills are acquired.',
    section: 'Understanding Goals &amp; Growth Mindset',
    difficulty: 'basic' as const,
    topic: 'Comfort Zone Model',
    category: 'Understanding Goals &amp; Growth Mindset',
  },
  {
    id: 8,
    question:
      'According to Dweck&rsquo;s research, how should you praise someone to encourage a growth mindset?',
    options: [
      'Praise their effort, strategy, and process',
      'Praise their natural intelligence and talent',
      'Avoid giving any praise at all',
      'Only praise the final result, not the process',
    ],
    correctAnswer: 0,
    explanation:
      'Dweck&rsquo;s research showed that praising effort and strategy (&ldquo;You worked really hard on that&rdquo;) encourages a growth mindset, whereas praising innate ability (&ldquo;You&rsquo;re so clever&rdquo;) reinforces a fixed mindset. Process praise motivates people to take on challenges rather than play it safe.',
    section: 'Understanding Goals &amp; Growth Mindset',
    difficulty: 'basic' as const,
    topic: 'Praise for Effort',
    category: 'Understanding Goals &amp; Growth Mindset',
  },
  {
    id: 9,
    question: 'Why is self-assessment important when setting personal development goals?',
    options: [
      'It establishes your current baseline so you can measure progress accurately',
      'It proves to others that you are already skilled',
      'It eliminates the need for external feedback',
      'It guarantees you will pass any future assessment',
    ],
    correctAnswer: 0,
    explanation:
      'Self-assessment helps you understand your starting point &mdash; your existing strengths and areas for development. Research by Boud and Falchikov (1989) demonstrated that the ability to accurately self-assess is a critical skill for lifelong learners and is essential for setting realistic, measurable goals.',
    section: 'Understanding Goals &amp; Growth Mindset',
    difficulty: 'basic' as const,
    topic: 'Self-Assessment',
    category: 'Understanding Goals &amp; Growth Mindset',
  },
  {
    id: 10,
    question: 'Which of the following is an example of a fixed mindset statement?',
    options: [
      '&ldquo;I&rsquo;m just not a maths person&rdquo;',
      '&ldquo;This is challenging but I&rsquo;ll keep trying&rdquo;',
      '&ldquo;I need to find a different strategy&rdquo;',
      '&ldquo;Mistakes help me learn&rdquo;',
    ],
    correctAnswer: 0,
    explanation:
      'Saying &ldquo;I&rsquo;m just not a maths person&rdquo; treats mathematical ability as a fixed trait rather than a skill that can be developed. Dweck&rsquo;s research shows that such labelling creates a self-fulfilling prophecy where people avoid the very practice that would help them improve.',
    section: 'Understanding Goals &amp; Growth Mindset',
    difficulty: 'basic' as const,
    topic: 'Fixed Mindset Triggers',
    category: 'Understanding Goals &amp; Growth Mindset',
  },
  {
    id: 11,
    question: 'What does Bandura identify as the strongest source of self-efficacy?',
    options: [
      'Mastery experiences &mdash; successfully completing a task yourself',
      'Watching someone else complete the task',
      'Being told you are capable by a manager',
      'Reading about the theory behind the task',
    ],
    correctAnswer: 0,
    explanation:
      'Bandura identified four sources of self-efficacy: mastery experiences, vicarious experiences, verbal persuasion, and physiological states. Of these, mastery experiences &mdash; your own direct successes &mdash; are the most powerful because they provide authentic evidence of your capability.',
    section: 'Understanding Goals &amp; Growth Mindset',
    difficulty: 'basic' as const,
    topic: 'Self-Efficacy Sources',
    category: 'Understanding Goals &amp; Growth Mindset',
  },
  {
    id: 12,
    question: 'In the electrical trade, which scenario best illustrates a growth mindset?',
    options: [
      'An apprentice who asks for feedback after failing a practical assessment and practises the weak areas',
      'A qualified electrician who avoids new technologies because they were not taught during their apprenticeship',
      'A supervisor who believes only certain people are &ldquo;born&rdquo; to work with electrics',
      'A tradesperson who hides mistakes to protect their reputation',
    ],
    correctAnswer: 0,
    explanation:
      'Seeking feedback after failure and deliberately practising weak areas are hallmarks of a growth mindset. Dweck&rsquo;s research shows that people with a growth mindset view failures as information about what to work on next, not as evidence of permanent inadequacy.',
    section: 'Understanding Goals &amp; Growth Mindset',
    difficulty: 'basic' as const,
    topic: 'Growth Mindset in the Electrical Trade',
    category: 'Understanding Goals &amp; Growth Mindset',
  },
  {
    id: 13,
    question: 'What is a &ldquo;belief system&rdquo; in the context of personal performance?',
    options: [
      'A set of deeply held assumptions about yourself and the world that shape your behaviour',
      'A religious framework that determines career choices',
      'A formal document outlining company values',
      'A scientifically proven method for predicting success',
    ],
    correctAnswer: 0,
    explanation:
      'A belief system comprises the assumptions, attitudes, and expectations you hold about yourself and the world. Research in cognitive behavioural psychology shows that these beliefs directly influence behaviour, effort, and ultimately performance &mdash; making them a crucial factor in personal development.',
    section: 'Understanding Goals &amp; Growth Mindset',
    difficulty: 'basic' as const,
    topic: 'Belief Systems',
    category: 'Understanding Goals &amp; Growth Mindset',
  },
  {
    id: 14,
    question:
      'According to research on neural plasticity, what happens in the brain when you practise a new skill repeatedly?',
    options: [
      'Neural pathways are strengthened through a process called myelination',
      'The brain creates entirely new lobes dedicated to that skill',
      'Existing neural connections are permanently deleted and replaced',
      'Brain activity decreases because the task becomes automatic immediately',
    ],
    correctAnswer: 0,
    explanation:
      'When you repeatedly practise a skill, the neural pathways involved become coated in myelin, a fatty substance that speeds up signal transmission. This process, supported by research from neuroscientists like Daniel Coyle, explains why deliberate practice leads to measurable improvements in performance.',
    section: 'Understanding Goals &amp; Growth Mindset',
    difficulty: 'basic' as const,
    topic: 'Neural Plasticity',
    category: 'Understanding Goals &amp; Growth Mindset',
  },
  {
    id: 15,
    question:
      'Which of the following best describes the &ldquo;growth zone&rdquo; in the comfort zone model?',
    options: [
      'The zone where you set new goals, find purpose, and achieve things you previously thought impossible',
      'The zone where you feel completely comfortable and unchallenged',
      'The zone where anxiety prevents you from taking action',
      'The zone where you first begin to acquire new knowledge',
    ],
    correctAnswer: 0,
    explanation:
      'The growth zone is the outermost ring of the comfort zone model. It is where real transformation happens: you set ambitious goals, live with purpose, and accomplish things that once seemed beyond your reach. Reaching this zone requires pushing through both the fear zone and the learning zone.',
    section: 'Understanding Goals &amp; Growth Mindset',
    difficulty: 'basic' as const,
    topic: 'Comfort Zone Model',
    category: 'Understanding Goals &amp; Growth Mindset',
  },
  {
    id: 16,
    question: 'What is the key difference between a performance goal and a learning goal?',
    options: [
      'A performance goal focuses on proving ability; a learning goal focuses on developing ability',
      'A performance goal is set by managers; a learning goal is set by the individual',
      'A performance goal is short-term; a learning goal is always long-term',
      'There is no meaningful difference between them',
    ],
    correctAnswer: 0,
    explanation:
      'Dweck distinguishes between performance goals (aimed at looking competent and gaining approval) and learning goals (aimed at increasing competence). Research shows that learning goals foster a growth mindset, encourage risk-taking, and lead to deeper engagement with challenging material.',
    section: 'Understanding Goals &amp; Growth Mindset',
    difficulty: 'basic' as const,
    topic: 'Goal Types',
    category: 'Understanding Goals &amp; Growth Mindset',
  },
  // =====================================================
  // INTERMEDIATE (17-32)
  // =====================================================
  {
    id: 17,
    question:
      'Carol Dweck warns about &ldquo;false growth mindset.&rdquo; What does this term describe?',
    options: [
      'Claiming to have a growth mindset without genuinely embracing effort, struggle, and feedback',
      'A growth mindset that develops too quickly to be sustainable',
      'The belief that growth mindset theory has been scientifically disproved',
      'Praising effort even when strategies are clearly ineffective',
    ],
    correctAnswer: 0,
    explanation:
      'Dweck coined the term &ldquo;false growth mindset&rdquo; to describe people and organisations who claim to value growth but do not actually embrace the difficult parts &mdash; struggle, mistakes, and critical feedback. She warned that simply saying &ldquo;I have a growth mindset&rdquo; without backing it up with behaviour is counterproductive.',
    section: 'Understanding Goals &amp; Growth Mindset',
    difficulty: 'intermediate' as const,
    topic: 'False Growth Mindset',
    category: 'Understanding Goals &amp; Growth Mindset',
  },
  {
    id: 18,
    question:
      'According to Bandura, which of the following is an example of a &ldquo;vicarious experience&rdquo; building self-efficacy?',
    options: [
      'Watching a colleague who is similar to you successfully complete a complex wiring task',
      'Receiving a pay rise for good performance',
      'Reading the BS 7671 regulations cover to cover',
      'Feeling calm before a practical assessment',
    ],
    correctAnswer: 0,
    explanation:
      'Bandura described vicarious experiences as observing someone similar to yourself succeed at a task. The key factor is perceived similarity &mdash; if you see someone &ldquo;like you&rdquo; accomplish something, your belief in your own capability increases. This is why mentoring and peer demonstration are so powerful in trade apprenticeships.',
    section: 'Understanding Goals &amp; Growth Mindset',
    difficulty: 'intermediate' as const,
    topic: 'Self-Efficacy Sources',
    category: 'Understanding Goals &amp; Growth Mindset',
  },
  {
    id: 19,
    question:
      'A qualified electrician refuses to learn about EV charger installation, saying &ldquo;That&rsquo;s not real electrical work.&rdquo; Which fixed mindset trigger is this most likely driven by?',
    options: [
      'Identity protection &mdash; new technologies threaten their established sense of competence',
      'Laziness &mdash; they simply cannot be bothered to learn',
      'Financial concerns &mdash; EV charger courses are too expensive',
      'Logical reasoning &mdash; EV chargers genuinely are not electrical work',
    ],
    correctAnswer: 0,
    explanation:
      'Dweck identifies that fixed mindset triggers often occur when something threatens a person&rsquo;s established identity as competent. A qualified electrician who dismisses new technology may be protecting their self-image rather than making a rational assessment. Recognising these triggers is the first step to overcoming them.',
    section: 'Understanding Goals &amp; Growth Mindset',
    difficulty: 'intermediate' as const,
    topic: 'Fixed Mindset Triggers in the Trades',
    category: 'Understanding Goals &amp; Growth Mindset',
  },
  {
    id: 20,
    question:
      'In Duckworth&rsquo;s grit research, what did she find about the relationship between grit and talent?',
    options: [
      'Grit and talent are often inversely related &mdash; high talent can reduce perseverance',
      'Grit and talent are always perfectly correlated',
      'Talent is always more important than grit for predicting success',
      'Grit only matters for people who lack talent entirely',
    ],
    correctAnswer: 0,
    explanation:
      'Duckworth&rsquo;s research found a slight negative correlation between grit and talent in some populations. She theorised that naturally talented individuals may not develop the same level of perseverance because early success comes more easily to them. This finding underscores why effort and persistence matter more than raw ability.',
    section: 'Understanding Goals &amp; Growth Mindset',
    difficulty: 'intermediate' as const,
    topic: 'Grit and Talent',
    category: 'Understanding Goals &amp; Growth Mindset',
  },
  {
    id: 21,
    question:
      'How does the concept of neural plasticity challenge the idea that &ldquo;you can&rsquo;t teach an old dog new tricks&rdquo;?',
    options: [
      'Research shows the adult brain continues forming new neural connections well into old age',
      'Neural plasticity only applies to children under the age of 12',
      'The brain stops developing at age 25 and cannot change after that',
      'Neural plasticity means the brain physically grows larger with age',
    ],
    correctAnswer: 0,
    explanation:
      'Studies by researchers including Eleanor Maguire at University College London showed that London taxi drivers developed larger hippocampi through years of navigation practice, demonstrating that the adult brain remains plastic. This evidence directly contradicts the myth that adults cannot learn new skills.',
    section: 'Understanding Goals &amp; Growth Mindset',
    difficulty: 'intermediate' as const,
    topic: 'Neural Plasticity in Adults',
    category: 'Understanding Goals &amp; Growth Mindset',
  },
  {
    id: 22,
    question:
      'Dweck&rsquo;s research found that praising children for intelligence (&ldquo;You&rsquo;re so smart&rdquo;) had what effect when they later faced a difficult task?',
    options: [
      'They were more likely to give up and chose easier tasks to protect their &ldquo;smart&rdquo; label',
      'They performed significantly better because the praise boosted their confidence',
      'It had no measurable effect on their behaviour',
      'They became more motivated to tackle increasingly difficult challenges',
    ],
    correctAnswer: 0,
    explanation:
      'In Dweck&rsquo;s well-known studies with primary school children, those praised for intelligence became risk-averse, choosing easier tasks and giving up more quickly on hard problems. They wanted to maintain their &ldquo;smart&rdquo; label rather than risk failure. Children praised for effort, by contrast, embraced harder challenges.',
    section: 'Understanding Goals &amp; Growth Mindset',
    difficulty: 'intermediate' as const,
    topic: 'Praise for Intelligence vs Effort',
    category: 'Understanding Goals &amp; Growth Mindset',
  },
  {
    id: 23,
    question:
      'In the comfort zone model, what is a characteristic behaviour when someone is in the &ldquo;fear zone&rdquo;?',
    options: [
      'Making excuses and finding reasons not to attempt the new task',
      'Setting ambitious long-term goals',
      'Teaching the skill to others with confidence',
      'Feeling bored and unchallenged by the work',
    ],
    correctAnswer: 0,
    explanation:
      'The fear zone is characterised by self-doubt, excuse-making, and a lack of confidence. People in this zone are affected by the opinions of others and tend to rationalise why they should not attempt the challenge. Recognising that this is a normal and temporary stage helps individuals push through to the learning zone.',
    section: 'Understanding Goals &amp; Growth Mindset',
    difficulty: 'intermediate' as const,
    topic: 'Comfort Zone Model',
    category: 'Understanding Goals &amp; Growth Mindset',
  },
  {
    id: 24,
    question:
      'Which of the following statements about self-assessment is supported by educational research?',
    options: [
      'Accurate self-assessment improves when combined with external feedback and clear criteria',
      'Self-assessment is always more accurate than peer assessment',
      'Beginners are typically the most accurate self-assessors',
      'Self-assessment should replace all forms of external assessment',
    ],
    correctAnswer: 0,
    explanation:
      'Research by Boud and Falchikov found that self-assessment accuracy improves significantly when learners are given clear criteria and calibrate their judgement against external feedback. Interestingly, experts tend to be more accurate self-assessors than beginners, who often overestimate or underestimate their abilities.',
    section: 'Understanding Goals &amp; Growth Mindset',
    difficulty: 'intermediate' as const,
    topic: 'Self-Assessment Accuracy',
    category: 'Understanding Goals &amp; Growth Mindset',
  },
  {
    id: 25,
    question:
      'A first-year apprentice believes they will never understand three-phase systems because they struggled with basic circuit theory. According to Dweck, what type of belief is this?',
    options: [
      'A fixed mindset belief that treats current difficulty as evidence of permanent limitation',
      'A realistic assessment based on objective evidence',
      'A growth mindset belief because they are aware of their weakness',
      'A healthy level of caution that prevents overconfidence',
    ],
    correctAnswer: 0,
    explanation:
      'Dweck would identify this as a fixed mindset belief because the apprentice is interpreting a current struggle as proof of an unchangeable limitation. A growth mindset response would be: &ldquo;I&rsquo;m finding three-phase challenging right now, but with practice and the right support I can improve.&rdquo;',
    section: 'Understanding Goals &amp; Growth Mindset',
    difficulty: 'intermediate' as const,
    topic: 'Fixed Mindset Triggers in the Trades',
    category: 'Understanding Goals &amp; Growth Mindset',
  },
  {
    id: 26,
    question:
      'Bandura identified four sources of self-efficacy. Which of the following is NOT one of them?',
    options: [
      'Financial incentives',
      'Mastery experiences',
      'Vicarious experiences',
      'Verbal persuasion',
    ],
    correctAnswer: 0,
    explanation:
      'Bandura&rsquo;s four sources of self-efficacy are: mastery experiences, vicarious experiences, verbal persuasion, and physiological/emotional states. Financial incentives, while they may motivate behaviour, are not one of the sources Bandura identified as building genuine belief in one&rsquo;s capabilities.',
    section: 'Understanding Goals &amp; Growth Mindset',
    difficulty: 'intermediate' as const,
    topic: 'Self-Efficacy Theory',
    category: 'Understanding Goals &amp; Growth Mindset',
  },
  {
    id: 27,
    question:
      'Duckworth&rsquo;s &ldquo;Hard Thing Rule&rdquo; requires family members to do which of the following?',
    options: [
      'Each person must commit to one hard thing and cannot quit until a natural stopping point is reached',
      'Everyone must do the same difficult activity together',
      'Children must choose the hardest activity available regardless of interest',
      'The family must change their hard thing every week to avoid boredom',
    ],
    correctAnswer: 0,
    explanation:
      'Duckworth&rsquo;s Hard Thing Rule has three parts: everyone (including parents) must do a hard thing; you can quit, but not on a bad day or before a natural stopping point; and each person gets to choose their own hard thing. This develops grit by combining personal choice with sustained commitment.',
    section: 'Understanding Goals &amp; Growth Mindset',
    difficulty: 'intermediate' as const,
    topic: 'Grit in Practice',
    category: 'Understanding Goals &amp; Growth Mindset',
  },
  {
    id: 28,
    question:
      'How do negative belief systems typically affect an electrician&rsquo;s career progression?',
    options: [
      'They create self-limiting behaviour that causes the person to avoid opportunities and underperform',
      'They have no measurable impact on career progression',
      'They motivate the person to prove doubters wrong and achieve more',
      'They only affect mental health, not actual work performance',
    ],
    correctAnswer: 0,
    explanation:
      'Research in cognitive behavioural psychology demonstrates that negative belief systems create self-fulfilling prophecies. An electrician who believes &ldquo;I&rsquo;m not management material&rdquo; will avoid leadership opportunities, reducing their actual experience and reinforcing the original belief. Breaking this cycle requires conscious identification and challenging of limiting beliefs.',
    section: 'Understanding Goals &amp; Growth Mindset',
    difficulty: 'intermediate' as const,
    topic: 'Belief Systems and Performance',
    category: 'Understanding Goals &amp; Growth Mindset',
  },
  {
    id: 29,
    question: 'What does Dweck mean when she says everyone has a &ldquo;mixed mindset&rdquo;?',
    options: [
      'People can have a growth mindset in some areas of life and a fixed mindset in others',
      'Nobody truly has either a growth or fixed mindset',
      'Mindsets change randomly throughout each day',
      'You must choose between a growth and fixed mindset &mdash; mixing them is harmful',
    ],
    correctAnswer: 0,
    explanation:
      'Dweck clarified in later work that mindset is not a binary trait. A person might have a growth mindset about their technical skills but a fixed mindset about their leadership ability. Recognising where your fixed mindset triggers lie is the first step toward developing a more consistently growth-oriented approach.',
    section: 'Understanding Goals &amp; Growth Mindset',
    difficulty: 'intermediate' as const,
    topic: 'Mixed Mindset',
    category: 'Understanding Goals &amp; Growth Mindset',
  },
  {
    id: 30,
    question:
      'Which of the following is the best example of reframing a limitation using growth mindset language?',
    options: [
      '&ldquo;I don&rsquo;t understand fire alarm circuits yet, but I&rsquo;m going to study the wiring diagrams this week&rdquo;',
      '&ldquo;Fire alarm circuits are easy &mdash; I just need to believe in myself&rdquo;',
      '&ldquo;I don&rsquo;t need to understand fire alarm circuits because I specialise in domestic work&rdquo;',
      '&ldquo;Some people are just naturally better at understanding complex circuits&rdquo;',
    ],
    correctAnswer: 0,
    explanation:
      'Effective growth mindset reframing includes three elements: acknowledging the current gap (&ldquo;I don&rsquo;t understand&rdquo;), adding &ldquo;yet&rdquo; to signal potential, and identifying a specific action plan. Dweck emphasises that genuine growth mindset is not empty positivity &mdash; it requires concrete strategies paired with effort.',
    section: 'Understanding Goals &amp; Growth Mindset',
    difficulty: 'intermediate' as const,
    topic: 'Reframing Limitations',
    category: 'Understanding Goals &amp; Growth Mindset',
  },
  {
    id: 31,
    question:
      'In Bandura&rsquo;s theory, how do &ldquo;physiological and emotional states&rdquo; influence self-efficacy?',
    options: [
      'Anxiety, stress, and fatigue can be misinterpreted as signs of inability, lowering self-efficacy',
      'Physical fitness automatically increases self-efficacy in all domains',
      'Emotional states have no impact on self-efficacy once a skill has been learned',
      'Only positive emotions contribute to self-efficacy',
    ],
    correctAnswer: 0,
    explanation:
      'Bandura found that people often read their physiological responses &mdash; such as sweating, a racing heart, or fatigue &mdash; as signals about their capability. An apprentice who feels nervous before an AM2 assessment might interpret those nerves as evidence they are not ready, when in fact some anxiety is a normal response to high-stakes situations.',
    section: 'Understanding Goals &amp; Growth Mindset',
    difficulty: 'intermediate' as const,
    topic: 'Self-Efficacy and Emotional States',
    category: 'Understanding Goals &amp; Growth Mindset',
  },
  {
    id: 32,
    question:
      'Which of the following is a common characteristic of the &ldquo;learning zone&rdquo; in the comfort zone model?',
    options: [
      'Acquiring new skills, dealing with challenges, and extending your comfort zone',
      'Feeling completely relaxed and unstressed',
      'Being paralysed by self-doubt and making excuses',
      'Having already mastered the skill and teaching it to others',
    ],
    correctAnswer: 0,
    explanation:
      'The learning zone sits between the fear zone and the growth zone. In this zone, you are actively acquiring new skills, problem-solving, and building competence. It is characterised by productive struggle &mdash; the work is challenging but manageable, and each success gradually extends the boundary of your comfort zone.',
    section: 'Understanding Goals &amp; Growth Mindset',
    difficulty: 'intermediate' as const,
    topic: 'Comfort Zone Model',
    category: 'Understanding Goals &amp; Growth Mindset',
  },
  // =====================================================
  // ADVANCED (33-40)
  // =====================================================
  {
    id: 33,
    question:
      'Dweck&rsquo;s research on &ldquo;false growth mindset&rdquo; identified a particular danger in organisations. What was it?',
    options: [
      'Organisations rewarding effort alone without addressing ineffective strategies or poor outcomes',
      'Organisations that invest too heavily in staff training programmes',
      'Leaders who set excessively high standards for their teams',
      'Companies that hire based on qualifications rather than attitude',
    ],
    correctAnswer: 0,
    explanation:
      'Dweck warned that a false growth mindset in organisations manifests as rewarding effort regardless of results. She clarified that growth mindset is not about praising effort for its own sake &mdash; it is about praising productive effort that leads to learning. If a strategy is not working, the growth mindset response is to try a different approach, not simply try harder with the same failing method.',
    section: 'Understanding Goals &amp; Growth Mindset',
    difficulty: 'advanced' as const,
    topic: 'False Growth Mindset in Organisations',
    category: 'Understanding Goals &amp; Growth Mindset',
  },
  {
    id: 34,
    question:
      'How does Bandura&rsquo;s concept of &ldquo;reciprocal determinism&rdquo; relate to self-efficacy and growth mindset?',
    options: [
      'It shows that behaviour, personal beliefs, and environment continuously influence each other in a dynamic cycle',
      'It proves that genetics determine mindset and cannot be changed',
      'It demonstrates that environment is the only factor that determines success',
      'It suggests that personal beliefs have no influence on behaviour',
    ],
    correctAnswer: 0,
    explanation:
      'Bandura&rsquo;s reciprocal determinism model shows that personal factors (beliefs, self-efficacy), behaviour (actions, effort), and environment (feedback, support) all interact bidirectionally. This means that changing one element &mdash; such as developing a growth mindset belief &mdash; can create a positive cascade that alters behaviour and even the environments a person seeks out.',
    section: 'Understanding Goals &amp; Growth Mindset',
    difficulty: 'advanced' as const,
    topic: 'Reciprocal Determinism',
    category: 'Understanding Goals &amp; Growth Mindset',
  },
  {
    id: 35,
    question:
      'Duckworth distinguishes between &ldquo;harmonious passion&rdquo; and &ldquo;obsessive passion.&rdquo; Why is this distinction important for sustained grit?',
    options: [
      'Harmonious passion integrates with your identity and promotes wellbeing, while obsessive passion leads to burnout and rigid persistence',
      'Obsessive passion is always more productive than harmonious passion',
      'Harmonious passion means you never feel stressed about your work',
      'The distinction is purely theoretical and has no practical application',
    ],
    correctAnswer: 0,
    explanation:
      'Drawing on Vallerand&rsquo;s Dualistic Model of Passion, Duckworth emphasises that sustainable grit requires harmonious passion &mdash; where the activity is freely chosen and integrates well with other aspects of life. Obsessive passion, by contrast, creates internal compulsion and conflict, leading to burnout. For tradespeople, this means loving the craft without letting it consume every aspect of life.',
    section: 'Understanding Goals &amp; Growth Mindset',
    difficulty: 'advanced' as const,
    topic: 'Passion and Grit',
    category: 'Understanding Goals &amp; Growth Mindset',
  },
  {
    id: 36,
    question:
      'Research by Mangels et al. (2006) used EEG brain scans to study people with different mindsets. What did they find about how growth mindset individuals processed errors?',
    options: [
      'Growth mindset individuals showed greater brain activity when receiving corrective feedback, indicating deeper processing of errors',
      'Fixed mindset individuals showed more brain activity during error processing',
      'There was no measurable difference in brain activity between the two groups',
      'Growth mindset individuals showed less brain activity overall, indicating more efficient processing',
    ],
    correctAnswer: 0,
    explanation:
      'Mangels et al. (2006) used EEG monitoring to show that individuals with a growth mindset allocated significantly more attention to corrective feedback after errors, as measured by event-related brain potentials. Fixed mindset individuals, by contrast, showed reduced attention to correction information, suggesting they were less engaged in learning from their mistakes.',
    section: 'Understanding Goals &amp; Growth Mindset',
    difficulty: 'advanced' as const,
    topic: 'Neuroscience of Growth Mindset',
    category: 'Understanding Goals &amp; Growth Mindset',
  },
  {
    id: 37,
    question:
      'How does Dweck&rsquo;s growth mindset theory intersect with Vygotsky&rsquo;s &ldquo;Zone of Proximal Development&rdquo; (ZPD)?',
    options: [
      'Both frameworks suggest that optimal learning occurs when challenges are just beyond current ability but achievable with appropriate support',
      'They are contradictory theories that cannot be reconciled',
      'Vygotsky&rsquo;s ZPD only applies to children, while growth mindset only applies to adults',
      'The ZPD replaces the need for growth mindset in educational settings',
    ],
    correctAnswer: 0,
    explanation:
      'Vygotsky&rsquo;s ZPD describes the gap between what a learner can do independently and what they can achieve with guidance. This aligns with Dweck&rsquo;s growth mindset because both emphasise that ability is not fixed &mdash; the right challenge combined with appropriate scaffolding (mentoring, instruction, feedback) enables learners to develop beyond their current level.',
    section: 'Understanding Goals &amp; Growth Mindset',
    difficulty: 'advanced' as const,
    topic: 'Growth Mindset and ZPD',
    category: 'Understanding Goals &amp; Growth Mindset',
  },
  {
    id: 38,
    question:
      'A contracting firm wants to build a growth mindset culture. According to Dweck&rsquo;s organisational research, which approach is most effective?',
    options: [
      'Creating systems where learning from failure is valued, feedback is normalised, and development pathways are transparent',
      'Sending all staff on a one-day growth mindset workshop',
      'Hiring only candidates who already demonstrate a growth mindset and excluding fixed mindset individuals',
      'Posting motivational quotes about effort and persistence around the workplace',
    ],
    correctAnswer: 0,
    explanation:
      'Dweck&rsquo;s organisational research found that growth mindset cultures require systemic change, not just individual beliefs. This means creating psychologically safe environments where mistakes are treated as learning opportunities, feedback flows in all directions, and transparent development pathways show people how to progress. One-off workshops or motivational posters do not create lasting cultural change.',
    section: 'Understanding Goals &amp; Growth Mindset',
    difficulty: 'advanced' as const,
    topic: 'Growth Mindset Culture',
    category: 'Understanding Goals &amp; Growth Mindset',
  },
  {
    id: 39,
    question:
      'What criticism has been levelled at growth mindset research by scholars such as Broer, Bai, and Fonseca (2019)?',
    options: [
      'Large-scale replication studies found that mindset interventions had very small effect sizes, particularly for disadvantaged students',
      'Growth mindset theory has been completely disproved by neuroscience',
      'The original research was fabricated and later retracted',
      'Growth mindset only applies to academic settings and has no relevance to vocational training',
    ],
    correctAnswer: 0,
    explanation:
      'A meta-analysis by Sisk et al. (2018) and studies by researchers such as Broer, Bai, and Fonseca (2019) found that while mindset interventions can have positive effects, the effect sizes are often small and inconsistent, particularly for the most disadvantaged students. This does not invalidate the theory but suggests it works best as part of a wider approach that addresses structural barriers alongside individual beliefs.',
    section: 'Understanding Goals &amp; Growth Mindset',
    difficulty: 'advanced' as const,
    topic: 'Critical Analysis of Growth Mindset',
    category: 'Understanding Goals &amp; Growth Mindset',
  },
  {
    id: 40,
    question:
      'An experienced electrician with 20 years in domestic work wants to transition into commercial and industrial installations. Applying Bandura&rsquo;s self-efficacy theory, which combination of strategies would most effectively build their confidence?',
    options: [
      'Shadowing commercial electricians (vicarious experience), completing small commercial tasks under supervision (mastery experience), and managing anxiety about the transition (emotional regulation)',
      'Reading commercial installation textbooks exclusively and attempting large projects unsupervised',
      'Attending a single motivational seminar about believing in yourself',
      'Watching online videos about commercial work and immediately bidding on large contracts',
    ],
    correctAnswer: 0,
    explanation:
      'Bandura&rsquo;s theory suggests that the most robust self-efficacy is built through multiple sources working together. Vicarious experiences (shadowing), graded mastery experiences (small tasks building to larger ones), and physiological state management (addressing anxiety) create a comprehensive approach. This multi-source strategy is more effective than relying on any single intervention, particularly for a significant career transition.',
    section: 'Understanding Goals &amp; Growth Mindset',
    difficulty: 'advanced' as const,
    topic: 'Applied Self-Efficacy Strategy',
    category: 'Understanding Goals &amp; Growth Mindset',
  },
];
