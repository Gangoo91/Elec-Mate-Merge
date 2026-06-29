/**
 * Conflict Resolution & Difficult Conversations Mock Exam Question Bank
 *
 * 200 questions across 5 categories, balanced by difficulty.
 */

import { StandardMockQuestion, MockExamConfig } from '@/types/standardMockExam';
import { getRandomQuestionsBalanced } from '@/utils/questionSelection';

export const crCategories = [
  'Understanding Conflict',
  'Communication for Difficult Conversations',
  'Resolving Client Disputes',
  'Site & Workplace Conflicts',
  'Prevention & Professional Relationships',
];

export const crMockExamConfig: MockExamConfig = {
  examId: 'conflict-resolution',
  examTitle: 'Conflict Resolution & Difficult Conversations Mock Examination',
  totalQuestions: 20,
  timeLimit: 1800,
  passThreshold: 80,
  exitPath: '/study-centre/personal-development/conflict-resolution',
  categories: crCategories,
};

export const crQuestionBank: StandardMockQuestion[] = [
  // =====================================================
  // Category 1: Understanding Conflict (id 1-40)
  // 16 basic, 16 intermediate, 8 advanced
  // =====================================================
  {
    id: 1,
    question: 'According to ACAS, what is the definition of workplace conflict?',
    options: [
      'Any disagreement between colleagues, regardless of whether it affects work or wellbeing',
      'A breakdown in relationships including disputes, grievances, and dissatisfaction that affects productivity and wellbeing',
      'A formal complaint that has been escalated to a written grievance or tribunal',
      'A clash of personalities that resolves itself once tempers have cooled',
    ],
    correctAnswer: 1,
    explanation:
      'ACAS defines workplace conflict as a breakdown in relationships that includes disputes, grievances, and broader dissatisfaction affecting both productivity and wellbeing. This definition is deliberately broad because conflict encompasses far more than formal complaints. Understanding this wide scope helps electricians recognise and address conflict early, before it escalates to formal proceedings.',
    section: 'Understanding Conflict',
    difficulty: 'basic' as const,
    topic: 'ACAS Definition of Conflict',
    category: 'Understanding Conflict',
  },
  {
    id: 2,
    question:
      'How many working days are lost to workplace conflict in the UK each year, according to ACAS research?',
    options: [
      '5.2 million days',
      '12.8 million days',
      '28.5 million days',
      '42.1 million days',
    ],
    correctAnswer: 2,
    explanation:
      'ACAS research indicates that approximately 28.5 million working days are lost to workplace conflict annually in the UK. This staggering figure demonstrates the enormous economic and human cost of unresolved conflict. For the construction industry, where project timelines are tight, even small interpersonal conflicts can cascade into significant delays and financial losses.',
    section: 'Understanding Conflict',
    difficulty: 'basic' as const,
    topic: 'Cost of Unresolved Conflict',
    category: 'Understanding Conflict',
  },
  {
    id: 3,
    question: 'What is the estimated cost per employee of unresolved workplace conflict?',
    options: [
      '£200-£500',
      '£500-£800',
      '£5,000-£10,000',
      '£1,000-£3,000',
    ],
    correctAnswer: 3,
    explanation:
      'Research estimates the cost of unresolved workplace conflict at between £1,000 and £3,000 per employee per year. This includes reduced productivity, sickness absence, staff turnover, and management time spent dealing with disputes. For a small electrical contractor employing ten people, this could mean up to £30,000 annually lost to poorly managed conflict.',
    section: 'Understanding Conflict',
    difficulty: 'basic' as const,
    topic: 'Cost of Unresolved Conflict',
    category: 'Understanding Conflict',
  },
  {
    id: 4,
    question: 'What distinguishes constructive conflict from destructive conflict?',
    options: [
      'Constructive conflict leads to better ideas and outcomes; destructive conflict damages relationships and productivity',
      'Constructive conflict is always quiet and calm; destructive conflict always involves raised voices',
      'Constructive conflict happens between equals; destructive conflict only happens across a power imbalance',
      'Constructive conflict is resolved by a manager; destructive conflict is resolved by the people involved',
    ],
    correctAnswer: 0,
    explanation:
      "Constructive conflict generates better ideas, improves decision-making, and strengthens working relationships because it focuses on issues rather than personalities. Destructive conflict, by contrast, damages relationships, reduces productivity, and creates a toxic work environment. On a construction site, debating the best cable route is constructive; personal attacks about someone's competence are destructive.",
    section: 'Understanding Conflict',
    difficulty: 'basic' as const,
    topic: 'Constructive vs Destructive Conflict',
    category: 'Understanding Conflict',
  },
  {
    id: 5,
    question:
      'In what year did Kenneth Thomas and Ralph Kilmann develop the Thomas-Kilmann Conflict Mode Instrument?',
    options: [
      '1964',
      '1974',
      '1984',
      '1994',
    ],
    correctAnswer: 1,
    explanation:
      'Kenneth Thomas and Ralph Kilmann developed the Thomas-Kilmann Conflict Mode Instrument (TKI) in 1974. It remains one of the most widely used frameworks for understanding how individuals approach conflict. The instrument identifies five distinct conflict-handling modes based on two underlying dimensions: assertiveness and cooperativeness.',
    section: 'Understanding Conflict',
    difficulty: 'basic' as const,
    topic: 'Thomas-Kilmann Conflict Mode Instrument',
    category: 'Understanding Conflict',
  },
  {
    id: 6,
    question: 'What are the five conflict-handling modes in the Thomas-Kilmann model?',
    options: [
      'Confronting, negotiating, surrendering, ignoring, escalating',
      'Fighting, fleeing, freezing, fawning, fixing',
      'Competing, collaborating, compromising, avoiding, accommodating',
      'Asserting, listening, mediating, withdrawing, agreeing',
    ],
    correctAnswer: 2,
    explanation:
      "The five Thomas-Kilmann conflict modes are competing, collaborating, compromising, avoiding, and accommodating. Each mode represents a different combination of assertiveness (satisfying your own concerns) and cooperativeness (satisfying the other person's concerns). No single mode is universally best; the most effective approach depends on the situation.",
    section: 'Understanding Conflict',
    difficulty: 'basic' as const,
    topic: 'Thomas-Kilmann Conflict Mode Instrument',
    category: 'Understanding Conflict',
  },
  {
    id: 7,
    question: 'The Thomas-Kilmann model maps each conflict mode against which two dimensions?',
    options: [
      'Confidence and empathy',
      'Power and status',
      'Emotion and logic',
      'Assertiveness and cooperativeness',
    ],
    correctAnswer: 3,
    explanation:
      "The two axes of the Thomas-Kilmann model are assertiveness (the degree to which you try to satisfy your own concerns) and cooperativeness (the degree to which you try to satisfy the other person's concerns). Understanding where each mode falls on these axes helps you choose the right approach for a given conflict situation on site.",
    section: 'Understanding Conflict',
    difficulty: 'basic' as const,
    topic: 'Thomas-Kilmann Conflict Mode Instrument',
    category: 'Understanding Conflict',
  },
  {
    id: 8,
    question: 'Which Thomas-Kilmann mode is HIGH in assertiveness and LOW in cooperativeness?',
    options: [
      'Competing',
      'Avoiding',
      'Accommodating',
      'Collaborating',
    ],
    correctAnswer: 0,
    explanation:
      "Competing is high in assertiveness and low in cooperativeness. A person using this mode pursues their own concerns at the other person's expense. While it can seem aggressive, competing is appropriate in emergencies on site where safety is at stake and quick, decisive action is needed — for example, insisting that live working stops immediately.",
    section: 'Understanding Conflict',
    difficulty: 'basic' as const,
    topic: 'Thomas-Kilmann Conflict Mode Instrument',
    category: 'Understanding Conflict',
  },
  {
    id: 9,
    question: 'Which conflict mode is described as LOW assertiveness and LOW cooperativeness?',
    options: [
      'Collaborating',
      'Avoiding',
      'Accommodating',
      'Compromising',
    ],
    correctAnswer: 1,
    explanation:
      'Avoiding is low on both assertiveness and cooperativeness. The person neither pursues their own concerns nor those of the other party. While sometimes appropriate for trivial issues or when emotions need to cool, habitual avoidance on construction sites can allow small problems to fester into major disputes that disrupt entire projects.',
    section: 'Understanding Conflict',
    difficulty: 'basic' as const,
    topic: 'Thomas-Kilmann Conflict Mode Instrument',
    category: 'Understanding Conflict',
  },
  {
    id: 10,
    question:
      'Which conflict mode sits at the CENTRE of the Thomas-Kilmann grid, with moderate assertiveness and moderate cooperativeness?',
    options: [
      'Competing',
      'Collaborating',
      'Compromising',
      'Accommodating',
    ],
    correctAnswer: 2,
    explanation:
      'Compromising sits at the centre of the TKI grid with moderate levels of both assertiveness and cooperativeness. It involves finding a middle ground where each party gives up something. On site, this might mean splitting the cost of rework when both the electrician and plumber contributed to a coordination failure.',
    section: 'Understanding Conflict',
    difficulty: 'basic' as const,
    topic: 'Thomas-Kilmann Conflict Mode Instrument',
    category: 'Understanding Conflict',
  },
  {
    id: 11,
    question: 'What is the "fight, flight, freeze" response in the context of conflict?',
    options: [
      'A strategic framework for handling disagreements',
      'A negotiation tactic used in commercial disputes',
      'A training programme for construction site managers',
      'An automatic physiological stress response triggered by perceived threats',
    ],
    correctAnswer: 3,
    explanation:
      'The fight, flight, freeze response is an automatic physiological reaction triggered by the amygdala when the brain perceives a threat. In conflict situations, "fight" manifests as aggression or defensiveness, "flight" as avoidance or withdrawal, and "freeze" as inability to respond. Recognising these reactions in yourself and others is the first step to managing conflict more effectively.',
    section: 'Understanding Conflict',
    difficulty: 'basic' as const,
    topic: 'Fight, Flight, Freeze',
    category: 'Understanding Conflict',
  },
  {
    id: 12,
    question: 'What is an "amygdala hijack"?',
    options: [
      'When the emotional brain overrides rational thinking, causing a disproportionate reaction',
      'When someone deliberately provokes another person to make them lose their temper',
      'When the rational brain suppresses an emotion so completely that it resurfaces later',
      'When a calm person is gradually worn down by repeated minor irritations over time',
    ],
    correctAnswer: 0,
    explanation:
      "An amygdala hijack occurs when the amygdala — the brain's threat-detection centre — triggers a powerful emotional response that overrides the rational prefrontal cortex. This can cause someone to say or do things they later regret. On construction sites, where tempers can flare under pressure, recognising an amygdala hijack in progress allows you to pause before reacting destructively.",
    section: 'Understanding Conflict',
    difficulty: 'basic' as const,
    topic: 'Fight, Flight, Freeze',
    category: 'Understanding Conflict',
  },
  {
    id: 13,
    question: 'Which of the following is NOT a common trigger for conflict on construction sites?',
    options: [
      'Disagreements over programme and scheduling',
      'Team members wearing different coloured PPE',
      'Payment disputes and money issues',
      'Scope changes and unclear responsibilities',
    ],
    correctAnswer: 1,
    explanation:
      'Common conflict triggers on construction sites include money and payment disputes, scope changes, programme disagreements, quality standards, territorial disputes between trades, and communication breakdowns. The colour of PPE is not a recognised conflict trigger. Understanding genuine triggers helps electricians anticipate and prevent conflicts before they escalate.',
    section: 'Understanding Conflict',
    difficulty: 'basic' as const,
    topic: 'Common Conflict Triggers',
    category: 'Understanding Conflict',
  },
  {
    id: 14,
    question: 'Viktor Frankl\'s concept of the "stimulus-response gap" suggests that:',
    options: [
      'We should always respond immediately to provocation',
      'Responses to conflict are always automatic and cannot be changed',
      'Between stimulus and response there is a space where we can choose our reaction',
      'The gap between stimulus and response should be eliminated',
    ],
    correctAnswer: 2,
    explanation:
      'Viktor Frankl taught that between stimulus and response there is a space, and in that space lies our power to choose our response. This principle is foundational to conflict resolution because it reminds us that even when provoked on site, we always have a choice in how we react. Practising this awareness prevents impulsive reactions that escalate conflict.',
    section: 'Understanding Conflict',
    difficulty: 'basic' as const,
    topic: 'Viktor Frankl Stimulus-Response Gap',
    category: 'Understanding Conflict',
  },
  {
    id: 15,
    question:
      'Which cognitive distortion involves believing you know what someone else is thinking without evidence?',
    options: [
      'Catastrophising',
      'All-or-nothing thinking',
      'Personalising',
      'Mind-reading',
    ],
    correctAnswer: 3,
    explanation:
      'Mind-reading is a cognitive distortion where you assume you know what another person is thinking without any actual evidence. For example, an electrician might assume a client is unhappy based on their facial expression, when in reality the client is preoccupied with something entirely unrelated. Checking assumptions rather than mind-reading prevents unnecessary conflict.',
    section: 'Understanding Conflict',
    difficulty: 'basic' as const,
    topic: 'Cognitive Distortions',
    category: 'Understanding Conflict',
  },
  {
    id: 16,
    question: 'What is "catastrophising" as a cognitive distortion in conflict situations?',
    options: [
      'Imagining the worst-case scenario and treating it as certain or likely',
      'Responding to conflict with extreme emotions',
      'Accurately predicting the worst possible outcome',
      'Deliberately creating a crisis to gain attention',
    ],
    correctAnswer: 0,
    explanation:
      'Catastrophising involves jumping to the worst possible conclusion and treating it as inevitable. In conflict, this might mean hearing a client raise a concern and immediately thinking "they\'re going to sue me and I\'ll lose my business." This distortion amplifies anxiety and can lead to defensive or aggressive responses that worsen the situation.',
    section: 'Understanding Conflict',
    difficulty: 'basic' as const,
    topic: 'Cognitive Distortions',
    category: 'Understanding Conflict',
  },
  {
    id: 17,
    question: 'In the Thomas-Kilmann model, the collaborating mode is best described as:',
    options: [
      'Moderate assertiveness, moderate cooperativeness',
      'High assertiveness, high cooperativeness',
      'Low assertiveness, high cooperativeness',
      'High assertiveness, low cooperativeness',
    ],
    correctAnswer: 1,
    explanation:
      "Collaborating is high on both assertiveness and cooperativeness. It involves working with the other person to find a solution that fully satisfies both parties' concerns. While it takes more time than other modes, collaboration is ideal for complex construction disputes where maintaining ongoing working relationships is essential and creative solutions can benefit everyone.",
    section: 'Understanding Conflict',
    difficulty: 'intermediate' as const,
    topic: 'Thomas-Kilmann Conflict Mode Instrument',
    category: 'Understanding Conflict',
  },
  {
    id: 18,
    question:
      'When would the "competing" conflict mode be most appropriate on a construction site?',
    options: [
      'When negotiating a minor scheduling change with another trade',
      'When resolving a long-term disagreement about work quality',
      'When an immediate safety hazard needs to be addressed without delay',
      'When a colleague asks for a small favour',
    ],
    correctAnswer: 2,
    explanation:
      'The competing mode is most appropriate in emergencies or when safety is at stake. If an electrician spots an immediate danger — such as someone about to work on a live circuit — there is no time for collaboration or compromise. Quick, decisive action is needed. In non-emergency situations, however, competing tends to damage relationships and should be used sparingly.',
    section: 'Understanding Conflict',
    difficulty: 'intermediate' as const,
    topic: 'Thomas-Kilmann Conflict Mode Instrument',
    category: 'Understanding Conflict',
  },
  {
    id: 19,
    question: 'When is the "accommodating" conflict mode most strategically useful?',
    options: [
      'When you must win the point regardless of the cost to the relationship',
      'When the issue is too trivial to be worth any discussion at all',
      'When you have no time to talk and simply want the problem to disappear',
      'When preserving the relationship is more important than the specific issue',
    ],
    correctAnswer: 3,
    explanation:
      "Accommodating (high cooperativeness, low assertiveness) is strategically useful when the relationship matters more than the specific issue at hand. For example, an electrician might accommodate a plumber's preferred scheduling request on a minor item to maintain goodwill for future collaboration. However, habitual accommodating can lead to resentment and being taken advantage of.",
    section: 'Understanding Conflict',
    difficulty: 'intermediate' as const,
    topic: 'Thomas-Kilmann Conflict Mode Instrument',
    category: 'Understanding Conflict',
  },
  {
    id: 20,
    question:
      'Chris Argyris developed the Ladder of Inference in 1990. What does this model describe?',
    options: [
      'How we unconsciously move from observing data to making assumptions and taking action',
      'The steps required to formally escalate a workplace grievance',
      'A physical ladder safety protocol for construction sites',
      'The hierarchy of authority on a construction project',
    ],
    correctAnswer: 0,
    explanation:
      'The Ladder of Inference, developed by Chris Argyris in 1990, describes the unconscious mental pathway from observing raw data to selecting data, adding meaning, making assumptions, drawing conclusions, adopting beliefs, and finally taking action. In conflict situations, people often climb this ladder instantly, reacting to conclusions rather than facts. Awareness of the ladder helps electricians check their assumptions before responding.',
    section: 'Understanding Conflict',
    difficulty: 'intermediate' as const,
    topic: 'Ladder of Inference',
    category: 'Understanding Conflict',
  },
  {
    id: 21,
    question: 'On the Ladder of Inference, what is the first step after observing available data?',
    options: [
      'Taking action based on your beliefs',
      'Selecting specific data to focus on',
      'Drawing conclusions about the other person',
      'Adding personal meaning to what you have seen',
    ],
    correctAnswer: 1,
    explanation:
      "The first step after observing available data is selecting specific data to focus on. This is where bias begins — we unconsciously filter the information we notice based on our existing beliefs and experiences. On site, an electrician in conflict with a plumber might only notice the plumber's mistakes while overlooking their own contribution to the problem.",
    section: 'Understanding Conflict',
    difficulty: 'intermediate' as const,
    topic: 'Ladder of Inference',
    category: 'Understanding Conflict',
  },
  {
    id: 22,
    question:
      'A site manager shouts at an apprentice for a minor mistake. The apprentice thinks "He hates me, he\'s always picking on me, I\'m going to get sacked." Which cognitive distortions are at play?',
    options: [
      'Paraphrasing, summarising, and reflecting feelings',
      'Avoiding, accommodating, and competing',
      'Mind-reading, personalising, and catastrophising',
      'All-or-nothing thinking, validation, and active listening',
    ],
    correctAnswer: 2,
    explanation:
      'Three cognitive distortions are present: mind-reading (assuming the manager hates them without evidence), personalising (assuming they are being singled out when the manager may treat everyone this way), and catastrophising (jumping to the worst-case outcome of being sacked). Recognising these distortions helps the apprentice respond rationally rather than emotionally.',
    section: 'Understanding Conflict',
    difficulty: 'intermediate' as const,
    topic: 'Cognitive Distortions',
    category: 'Understanding Conflict',
  },
  {
    id: 23,
    question: 'What is "all-or-nothing thinking" in the context of workplace conflict?',
    options: [
      'A negotiation strategy where you refuse to compromise',
      'Insisting on getting everything you want',
      'Making a decision only when all information is available',
      'Viewing situations in only two extreme categories with no middle ground',
    ],
    correctAnswer: 3,
    explanation:
      'All-or-nothing thinking (also called black-and-white thinking) is a cognitive distortion where situations are viewed in only two extreme categories. For example, "If this client complains about one thing, the whole job is a disaster." This distortion prevents seeing nuance and middle ground, making conflict resolution more difficult because it closes off the possibility of partial solutions.',
    section: 'Understanding Conflict',
    difficulty: 'intermediate' as const,
    topic: 'Cognitive Distortions',
    category: 'Understanding Conflict',
  },
  {
    id: 24,
    question: 'Territory disputes between trades on a construction site most commonly arise from:',
    options: [
      'Unclear coordination of shared spaces and sequencing of work',
      'Personal animosity between individual tradespeople',
      'Different trades using different brands of tools',
      'Variations in pay rates between trades',
    ],
    correctAnswer: 0,
    explanation:
      'Territory disputes between trades most commonly arise from unclear coordination of shared spaces and poor sequencing of work. When a plumber and electrician both need to work in the same riser cupboard and neither knows who should go first, conflict is almost inevitable. Clear coordination plans, managed by the principal contractor, prevent most territorial disputes.',
    section: 'Understanding Conflict',
    difficulty: 'intermediate' as const,
    topic: 'Common Conflict Triggers',
    category: 'Understanding Conflict',
  },
  {
    id: 25,
    question:
      'Why is self-awareness of your default conflict pattern important for an electrician?',
    options: [
      'It guarantees that you will always win any dispute you are involved in',
      'It lets you spot when your habitual response is wrong for the situation and choose a better one',
      'It allows you to avoid conflict altogether by predicting how others will behave',
      'It proves to clients and colleagues that you have formal mediation training',
    ],
    correctAnswer: 1,
    explanation:
      'Self-awareness of your default conflict pattern — whether you tend to compete, avoid, accommodate, compromise, or collaborate — allows you to recognise when your habitual response may not be the most effective for a given situation. An electrician who habitually avoids conflict may need to consciously adopt a more assertive approach when a client refuses to pay for completed work.',
    section: 'Understanding Conflict',
    difficulty: 'intermediate' as const,
    topic: 'Self-Awareness and Default Patterns',
    category: 'Understanding Conflict',
  },
  {
    id: 26,
    question: 'Which of the following best describes "personalising" as a cognitive distortion?',
    options: [
      'Making the conversation more personal and friendly',
      'Tailoring your communication style to each individual',
      'Assuming that negative events are specifically directed at you when they may not be',
      'Taking personal responsibility for resolving all conflicts',
    ],
    correctAnswer: 2,
    explanation:
      'Personalising is the cognitive distortion of assuming that negative events are specifically directed at you. For example, if a main contractor implements a new sign-in procedure, an electrician who personalises might think "they did this because they don\'t trust me." In reality, the procedure applies to everyone. This distortion creates unnecessary conflict by interpreting neutral events as personal attacks.',
    section: 'Understanding Conflict',
    difficulty: 'intermediate' as const,
    topic: 'Cognitive Distortions',
    category: 'Understanding Conflict',
  },
  {
    id: 27,
    question:
      "An electrician discovers another trade has damaged their first fix cabling. Their immediate instinct is to storm over and confront the other tradesperson. Applying Frankl's stimulus-response gap, what should they do?",
    options: [
      'Confront the other tradesperson immediately so the matter is dealt with while it is fresh',
      'Say nothing and quietly repair the cabling themselves to avoid any awkwardness',
      'Report the damage straight to the site manager before speaking to anyone else',
      'Pause to create space between the stimulus and their response, then choose a measured approach',
    ],
    correctAnswer: 3,
    explanation:
      "Frankl's stimulus-response gap teaches us to create a pause between the stimulus (discovering damaged cabling) and our response. This pause allows the electrician to move past the initial emotional reaction and choose a measured approach — perhaps documenting the damage with photos first, then calmly discussing it with the other tradesperson and the site manager.",
    section: 'Understanding Conflict',
    difficulty: 'intermediate' as const,
    topic: 'Viktor Frankl Stimulus-Response Gap',
    category: 'Understanding Conflict',
  },
  {
    id: 28,
    question:
      'Which of the following conflict triggers is related to "scope" on a construction project?',
    options: [
      'Work being added or changed beyond what was originally agreed',
      'A subcontractor not being paid on time',
      'Two trades being scheduled in the same area simultaneously',
      'A personality clash between team members',
    ],
    correctAnswer: 0,
    explanation:
      'Scope-related conflict triggers involve work being added, changed, or reinterpreted beyond what was originally agreed. This is one of the most common sources of conflict on construction projects. Without clear variation order processes, disputes about what was "included in the price" versus what constitutes additional work become inevitable and can strain client relationships.',
    section: 'Understanding Conflict',
    difficulty: 'intermediate' as const,
    topic: 'Common Conflict Triggers',
    category: 'Understanding Conflict',
  },
  {
    id: 29,
    question: 'What is the key risk of habitually using the "avoiding" conflict mode?',
    options: [
      'It forces every disagreement into the open before either party is ready',
      'It allows problems to fester and grow, often resulting in larger conflicts later',
      'It makes you appear weak and encourages others to take advantage straight away',
      'It commits you to a solution before you have heard the other side',
    ],
    correctAnswer: 1,
    explanation:
      'Habitually avoiding conflict allows problems to fester and grow beneath the surface. Small issues that could have been resolved with a brief conversation accumulate until they become major disputes. On construction projects, avoidance can lead to unaddressed quality issues, payment disputes, and ultimately broken working relationships that are far harder to repair than the original problem.',
    section: 'Understanding Conflict',
    difficulty: 'intermediate' as const,
    topic: 'Thomas-Kilmann Conflict Mode Instrument',
    category: 'Understanding Conflict',
  },
  {
    id: 30,
    question: 'Constructive conflict on a construction site can lead to which positive outcome?',
    options: [
      'Faster decisions because nobody is willing to question the chosen approach',
      'A quieter site because trades stop raising concerns with one another',
      'Better technical solutions through challenging assumptions and sharing diverse perspectives',
      'Reduced paperwork because disagreements are settled informally on the spot',
    ],
    correctAnswer: 2,
    explanation:
      'Constructive conflict, where ideas and approaches are challenged respectfully, can lead to better technical solutions. When an electrician and a mechanical engineer debate the optimal routing for services, the resulting solution is often superior to what either would have produced alone. The key is keeping the focus on the technical issue rather than personal criticism.',
    section: 'Understanding Conflict',
    difficulty: 'intermediate' as const,
    topic: 'Constructive vs Destructive Conflict',
    category: 'Understanding Conflict',
  },
  {
    id: 31,
    question: 'Communication breakdown as a conflict trigger on site most often results from:',
    options: [
      'Trades deliberately withholding information to gain a commercial advantage',
      'An overly detailed brief that gives workers too much information to absorb',
      'Using written instructions instead of speaking to people face to face',
      'Assumptions, unclear instructions, and failure to confirm understanding',
    ],
    correctAnswer: 3,
    explanation:
      'Communication breakdown on construction sites most commonly results from assumptions (thinking someone understands without checking), unclear instructions (verbal briefings without written confirmation), and failure to confirm understanding (not closing the loop). These issues are amplified in noisy environments and when multiple trades are coordinating complex work sequences.',
    section: 'Understanding Conflict',
    difficulty: 'intermediate' as const,
    topic: 'Common Conflict Triggers',
    category: 'Understanding Conflict',
  },
  {
    id: 32,
    question: 'How does the Ladder of Inference create a "reflexive loop"?',
    options: [
      'Our beliefs formed at the top of the ladder influence which data we select at the bottom, reinforcing existing biases',
      'Each person climbs the ladder at a different speed, so they reach conclusions at different times',
      'The ladder must be climbed in reverse before any conclusion can be reached',
      'Two people observing the same data will always reach the same conclusion',
    ],
    correctAnswer: 0,
    explanation:
      'The reflexive loop in the Ladder of Inference occurs because the beliefs we form at the top of the ladder influence which observable data we select at the bottom. If an electrician believes a particular project manager is incompetent, they will unconsciously notice and remember evidence that confirms this belief while ignoring contradictory evidence. This self-reinforcing cycle makes conflict increasingly entrenched.',
    section: 'Understanding Conflict',
    difficulty: 'intermediate' as const,
    topic: 'Ladder of Inference',
    category: 'Understanding Conflict',
  },
  {
    id: 33,
    question:
      'An electrician who scores high on "competing" and low on all other TKI modes would most benefit from developing which skill?',
    options: [
      'Greater assertiveness so they can hold their ground more firmly',
      'Active listening and collaborative problem-solving',
      'Faster decision-making under pressure',
      'A stronger ability to walk away from disputes entirely',
    ],
    correctAnswer: 1,
    explanation:
      'An electrician who defaults to competing in all conflict situations is already assertive but lacks cooperativeness. They would benefit most from developing active listening and collaborative problem-solving skills, which would enable them to access the collaborating and compromising modes. This broadened repertoire would help them maintain better working relationships while still achieving their goals when it matters.',
    section: 'Understanding Conflict',
    difficulty: 'advanced' as const,
    topic: 'Thomas-Kilmann Conflict Mode Instrument',
    category: 'Understanding Conflict',
  },
  {
    id: 34,
    question:
      'How should the Thomas-Kilmann model be applied as a situational tool rather than a personality label?',
    options: [
      'By identifying your single strongest mode and applying it consistently to every dispute',
      'By labelling each colleague with their dominant mode so you know what to expect from them',
      'By assessing each situation and deliberately choosing the mode that best fits the stakes and relationship',
      'By avoiding the modes you score lowest on so you only ever play to your strengths',
    ],
    correctAnswer: 2,
    explanation:
      'The TKI should be used as a situational toolkit, not a personality label. Effective conflict handlers assess each situation — considering the stakes, the relationship, time pressure, and power dynamics — and deliberately choose the most appropriate mode. An electrician might collaborate on design issues, compete on safety matters, compromise on scheduling, accommodate on minor preferences, and avoid trivial irritations.',
    section: 'Understanding Conflict',
    difficulty: 'advanced' as const,
    topic: 'Thomas-Kilmann Conflict Mode Instrument',
    category: 'Understanding Conflict',
  },
  {
    id: 35,
    question:
      'A senior electrician notices an apprentice becoming defensive (fight response) when receiving feedback. Using knowledge of the amygdala hijack, the best approach is to:',
    options: [
      'Raise your voice to make sure the safety point is taken seriously',
      'Press on quickly with the feedback before the apprentice shuts down completely',
      'Walk away and document the defensiveness for the next formal review',
      'Lower your tone, acknowledge the emotional response, and allow a brief pause before continuing',
    ],
    correctAnswer: 3,
    explanation:
      'When someone is experiencing an amygdala hijack, their rational brain is temporarily offline. The best approach is to lower your tone (reducing the perceived threat), acknowledge the emotional response ("I can see this is frustrating"), and allow a brief pause for the amygdala response to subside. Only then can productive feedback be received. Escalating or ignoring the response will make the situation worse.',
    section: 'Understanding Conflict',
    difficulty: 'advanced' as const,
    topic: 'Fight, Flight, Freeze',
    category: 'Understanding Conflict',
  },
  {
    id: 36,
    question:
      'According to the Ladder of Inference, the most effective way to resolve a conflict caused by differing interpretations is to:',
    options: [
      'Walk both parties back down the ladder to the observable data and rebuild shared meaning',
      'Insist that each party defends the conclusion they have already reached',
      'Have a neutral third party decide whose interpretation is correct',
      'Move the conversation quickly to action before emotions get involved',
    ],
    correctAnswer: 0,
    explanation:
      'The most effective resolution technique from the Ladder of Inference is to walk both parties back down to the observable data — the facts that both can agree on — and then rebuild shared understanding step by step. This means asking questions like "What did we actually see happen?" rather than debating interpretations. This approach strips away assumptions and often reveals that the conflict is based on different readings of the same events.',
    section: 'Understanding Conflict',
    difficulty: 'advanced' as const,
    topic: 'Ladder of Inference',
    category: 'Understanding Conflict',
  },
  {
    id: 37,
    question:
      'In a complex multi-trade conflict over programme delays, which combination of TKI modes would be most strategically effective?',
    options: [
      'Avoiding every disagreement until the programme has been formally re-issued',
      'Collaborating on root causes, compromising on non-critical items, competing only on safety',
      'Competing on every item so no trade can blame you for the delay',
      'Accommodating each trade in turn so that nobody feels singled out',
    ],
    correctAnswer: 1,
    explanation:
      'Complex multi-trade conflicts require a flexible, strategic approach. Collaborating helps identify root causes and develop solutions that work for all trades. Compromising works well for non-critical items where speed matters more than perfection. Competing should be reserved for safety-critical timelines that cannot be relaxed. This strategic combination demonstrates conflict fluency — the ability to adapt your approach to different aspects of the same dispute.',
    section: 'Understanding Conflict',
    difficulty: 'advanced' as const,
    topic: 'Thomas-Kilmann Conflict Mode Instrument',
    category: 'Understanding Conflict',
  },
  {
    id: 38,
    question:
      'How does the reflexive loop of the Ladder of Inference specifically contribute to entrenched conflicts between trades on construction sites?',
    options: [
      'The principal contractor fails to issue a coordination drawing, leaving each trade to guess the sequence',
      'Each trade works in a separate area, so they rarely observe what the others are doing',
      'Each trade selectively notices data confirming its existing beliefs about the other, reinforcing negative perceptions',
      'Trades are paid at different rates, creating resentment that spills over into the work',
    ],
    correctAnswer: 2,
    explanation:
      'The reflexive loop creates entrenched inter-trade conflicts because each side selectively notices evidence confirming their existing beliefs. If electricians believe plumbers "always damage our cabling," they notice every instance of damage while ignoring times plumbers have been careful. The plumbers, similarly, notice every time electricians are in their way. These mutually reinforcing perceptions become self-fulfilling prophecies as each trade acts on their biased beliefs, provoking the very behaviours they expect.',
    section: 'Understanding Conflict',
    difficulty: 'advanced' as const,
    topic: 'Ladder of Inference',
    category: 'Understanding Conflict',
  },
  {
    id: 39,
    question:
      'What is the relationship between unmanaged cognitive distortions and conflict escalation in the construction workplace?',
    options: [
      'Cognitive distortions only affect the person who holds them and never reach the other party',
      'Distortions make people calmer because they simplify a complex situation into a clear story',
      'Distortions have no measurable effect on conflict once people are trained to spot them',
      'Distortions amplify perceived threats and misread intentions, provoking defensive reactions that escalate the conflict',
    ],
    correctAnswer: 3,
    explanation:
      "Unmanaged cognitive distortions create escalation spirals in construction settings. Catastrophising amplifies perceived threats, triggering stronger amygdala hijacks. Mind-reading leads to misinterpretations of others' intentions, provoking defensive reactions. Personalising turns neutral events into personal attacks. All-or-nothing thinking eliminates middle ground for resolution. These distortions compound each other, turning minor disagreements into major conflicts. Awareness and deliberate cognitive reframing are essential skills for breaking these spirals.",
    section: 'Understanding Conflict',
    difficulty: 'advanced' as const,
    topic: 'Cognitive Distortions',
    category: 'Understanding Conflict',
  },
  {
    id: 40,
    question:
      'An electrical contractor has a conflict pattern of accommodating clients, compromising with other trades, and competing with apprentices. What does this pattern reveal and what is the primary risk?',
    options: [
      'The style is driven by power dynamics rather than situational fit, putting apprentice wellbeing and development at risk',
      'The pattern reveals a well-balanced conflict style that adapts perfectly to each relationship, with no significant risks',
      'The pattern reveals that the contractor is naturally collaborative and simply needs more time to apply it consistently',
      'The pattern reveals strong commercial judgement in prioritising paying clients, the only risk being lost goodwill among other trades',
    ],
    correctAnswer: 0,
    explanation:
      'This pattern reveals power-based rather than situationally-appropriate conflict behaviour. The contractor accommodates clients (who hold payment power), compromises with equal-status trades, and competes with apprentices (who have the least power). This suggests their conflict mode choices are driven by power dynamics rather than what the situation requires. The primary risk is to apprentice wellbeing, development, and retention — competing with those who lack the power to push back is a form of bullying, regardless of intent.',
    section: 'Understanding Conflict',
    difficulty: 'advanced' as const,
    topic: 'Self-Awareness and Default Patterns',
    category: 'Understanding Conflict',
  },

  // =====================================================
  // Category 2: Communication for Difficult Conversations (id 41-80)
  // 16 basic, 16 intermediate, 8 advanced
  // =====================================================
  {
    id: 41,
    question: 'What are the four components of active listening?',
    options: [
      'Hearing, interpreting, judging, responding',
      'Fully concentrating, understanding, responding, and remembering',
      'Nodding, smiling, agreeing, and summarising',
      'Waiting, thinking, talking, and concluding',
    ],
    correctAnswer: 1,
    explanation:
      'Active listening involves four components: fully concentrating on the speaker, understanding their message, responding appropriately, and remembering what was said. It is fundamentally different from passive hearing. For electricians dealing with client complaints, active listening demonstrates respect and often de-escalates tension simply by making the other person feel genuinely heard.',
    section: 'Communication for Difficult Conversations',
    difficulty: 'basic' as const,
    topic: 'Active Listening',
    category: 'Communication for Difficult Conversations',
  },
  {
    id: 42,
    question:
      'According to Stephen Covey, what are the five levels of listening in order from least to most effective?',
    options: [
      'Empathic, attentive, selective, pretending, ignoring',
      'Pretending, ignoring, selective, empathic, attentive',
      'Ignoring, pretending, selective, attentive, empathic',
      'Selective, ignoring, pretending, attentive, empathic',
    ],
    correctAnswer: 2,
    explanation:
      'Covey identified five levels of listening, from least to most effective: ignoring (not listening at all), pretending (appearing to listen but not), selective (hearing only parts), attentive (paying attention to words), and empathic (listening to understand feelings and meaning). Most people in conflict listen at the selective or attentive level, but resolution typically requires empathic listening.',
    section: 'Communication for Difficult Conversations',
    difficulty: 'basic' as const,
    topic: 'Covey Five Levels of Listening',
    category: 'Communication for Difficult Conversations',
  },
  {
    id: 43,
    question: "Stephen Covey's Habit 5 states:",
    options: [
      'Be quick to listen and slow to give your own opinion',
      'Treat every conversation as a chance to win the other person over',
      'Speak clearly so that you are understood before anything else',
      'Seek first to understand, then to be understood',
    ],
    correctAnswer: 3,
    explanation:
      'Covey\'s Habit 5 is "Seek first to understand, then to be understood." This principle is central to difficult conversations because most people listen with the intent to reply rather than to understand. When an electrician genuinely seeks to understand a client\'s frustration before explaining their own perspective, the entire dynamic of the conversation shifts toward resolution.',
    section: 'Communication for Difficult Conversations',
    difficulty: 'basic' as const,
    topic: 'Empathic Listening',
    category: 'Communication for Difficult Conversations',
  },
  {
    id: 44,
    question: 'What is the difference between validation and agreement?',
    options: [
      "Validation means acknowledging someone's feelings as understandable; agreement means you share their position",
      "Validation means telling someone they are right; agreement means staying silent on the issue",
      "Validation and agreement are the same thing expressed in different words",
      "Validation means conceding the point to keep the peace; agreement means standing your ground",
    ],
    correctAnswer: 0,
    explanation:
      'Validation means acknowledging that someone\'s feelings are understandable given their perspective, without necessarily agreeing with their position. You can say "I understand why you feel frustrated" (validation) without saying "You\'re right, we did a bad job" (agreement). This distinction is crucial for electricians handling complaints — you can validate a client\'s emotion while maintaining your professional position.',
    section: 'Communication for Difficult Conversations',
    difficulty: 'basic' as const,
    topic: 'Validation vs Agreement',
    category: 'Communication for Difficult Conversations',
  },
  {
    id: 45,
    question: 'Marshall Rosenberg developed Nonviolent Communication (NVC) in which year?',
    options: [
      '1993',
      '2003',
      '1999',
      '2007',
    ],
    correctAnswer: 1,
    explanation:
      'Marshall Rosenberg published "Nonviolent Communication: A Language of Life" in 2003. NVC provides a structured framework for expressing yourself honestly while listening empathically. The approach has been used worldwide in conflict resolution, from interpersonal disputes to international diplomacy, and is highly applicable to construction site communication.',
    section: 'Communication for Difficult Conversations',
    difficulty: 'basic' as const,
    topic: 'Nonviolent Communication',
    category: 'Communication for Difficult Conversations',
  },
  {
    id: 46,
    question: 'What are the four steps of Nonviolent Communication (NVC) in the correct order?',
    options: [
      'Needs, Feelings, Observations, Requests',
      'Requests, Observations, Needs, Feelings',
      'Observations, Feelings, Needs, Requests',
      'Feelings, Observations, Requests, Needs',
    ],
    correctAnswer: 2,
    explanation:
      'The four steps of NVC are: Observations (what you see/hear without evaluation), Feelings (how you feel about it), Needs (the underlying need connected to the feeling), and Requests (a specific, actionable request). This sequence moves from objective facts to subjective experience to constructive action, reducing defensiveness in the listener.',
    section: 'Communication for Difficult Conversations',
    difficulty: 'basic' as const,
    topic: 'Nonviolent Communication',
    category: 'Communication for Difficult Conversations',
  },
  {
    id: 47,
    question:
      'In Nonviolent Communication, what is the difference between an observation and an evaluation?',
    options: [
      'An observation is spoken aloud; an evaluation is kept to yourself',
      'An observation is about the future; an evaluation is about the past',
      'An observation includes your feelings; an evaluation sticks to the facts',
      'An observation describes what happened factually; an evaluation adds judgement or interpretation',
    ],
    correctAnswer: 3,
    explanation:
      'In NVC, an observation describes what happened without judgement ("The cable tray was installed 20mm off the specified position"), while an evaluation adds interpretation or judgement ("You did a sloppy job on the cable tray"). Leading with observations rather than evaluations dramatically reduces defensiveness and opens the door to productive conversation about how to resolve the issue.',
    section: 'Communication for Difficult Conversations',
    difficulty: 'basic' as const,
    topic: 'Nonviolent Communication',
    category: 'Communication for Difficult Conversations',
  },
  {
    id: 48,
    question:
      'Patterson et al. defined a "crucial conversation" as one that has three characteristics. What are they?',
    options: [
      'High stakes, opposing opinions, and strong emotions',
      'Legal implications, financial consequences, and media attention',
      'Multiple parties, formal setting, and written agenda',
      'Management involvement, union representation, and HR presence',
    ],
    correctAnswer: 0,
    explanation:
      'In their 2002 book "Crucial Conversations," Patterson, Grenny, McMillan, and Switzler defined a crucial conversation as one involving high stakes, opposing opinions, and strong emotions. When all three are present, conversations become particularly challenging. Electricians face crucial conversations regularly — discussing payment disputes with clients, raising safety concerns with site managers, or addressing performance issues with team members.',
    section: 'Communication for Difficult Conversations',
    difficulty: 'basic' as const,
    topic: 'Crucial Conversations',
    category: 'Communication for Difficult Conversations',
  },
  {
    id: 49,
    question: 'What is the "pool of shared meaning" in the Crucial Conversations framework?',
    options: [
      'The list of facts that both parties agree on before the conversation begins',
      'The collective understanding created when everyone freely shares ideas and feelings',
      'The compromise position that both parties settle on at the end of a dispute',
      'The shared physical space, such as a meeting room, where difficult conversations are held',
    ],
    correctAnswer: 1,
    explanation:
      'The pool of shared meaning is a central concept in Crucial Conversations. It represents the collective understanding that grows when all parties freely share their perspectives, ideas, and feelings. The larger the pool, the better the decisions. When people withhold information (due to fear or anger), the pool shrinks and decisions suffer. Keeping the pool filled requires creating safety for all participants.',
    section: 'Communication for Difficult Conversations',
    difficulty: 'basic' as const,
    topic: 'Crucial Conversations',
    category: 'Communication for Difficult Conversations',
  },
  {
    id: 50,
    question: 'The assertiveness spectrum runs from which extreme to which extreme?',
    options: [
      'Quiet to loud',
      'Weak to strong',
      'Passive to aggressive',
      'Friendly to hostile',
    ],
    correctAnswer: 2,
    explanation:
      "The assertiveness spectrum runs from passive (not expressing your needs, allowing others to dominate) through passive-aggressive (expressing needs indirectly through sarcasm or sabotage), to assertive (expressing needs clearly and respectfully), to aggressive (expressing needs at others' expense through intimidation or force). Assertiveness is the healthy middle ground that respects both your rights and the other person's.",
    section: 'Communication for Difficult Conversations',
    difficulty: 'basic' as const,
    topic: 'Assertiveness Spectrum',
    category: 'Communication for Difficult Conversations',
  },
  {
    id: 51,
    question: 'What is an I-statement and how does it differ from a You-statement?',
    options: [
      'An I-statement is more polite; a You-statement is simply more direct and honest',
      'An I-statement is used in writing; a You-statement is used in conversation',
      'An I-statement avoids the issue; a You-statement confronts it head-on',
      'An I-statement expresses your own feelings and needs ("I feel concerned when..."); a You-statement assigns blame ("You always...")',
    ],
    correctAnswer: 3,
    explanation:
      'I-statements express your own feelings, observations, and needs ("I feel concerned when deadlines are missed because it affects the programme"). You-statements assign blame and trigger defensiveness ("You always miss deadlines"). I-statements keep the conversation focused on the impact rather than attacking the person, making it far more likely that the other party will engage constructively.',
    section: 'Communication for Difficult Conversations',
    difficulty: 'basic' as const,
    topic: 'I-Statements vs You-Statements',
    category: 'Communication for Difficult Conversations',
  },
  {
    id: 52,
    question: 'William Ury\'s "Positive No" (2007) follows which three-step structure?',
    options: [
      'Yes-No-Yes',
      'No-Maybe-Yes',
      'No-No-Maybe',
      'Yes-Yes-No',
    ],
    correctAnswer: 0,
    explanation:
      'William Ury\'s Positive No follows a Yes-No-Yes structure. The first "Yes" affirms your underlying interest or value ("I value our working relationship"). The "No" is a clear, firm boundary ("I cannot do additional work without a signed variation order"). The second "Yes" offers an alternative or path forward ("I\'m happy to price it up for you today"). This structure says no without damaging the relationship.',
    section: 'Communication for Difficult Conversations',
    difficulty: 'basic' as const,
    topic: 'Positive No',
    category: 'Communication for Difficult Conversations',
  },
  {
    id: 53,
    question: 'What is the "broken record" technique in assertive communication?',
    options: [
      'Repeating the other person\'s words back to them to show you have listened',
      'Calmly repeating your key message or boundary without being drawn into side arguments',
      'Raising your voice a little louder each time the request is refused',
      'Returning to the same disagreement repeatedly until the other person gives in',
    ],
    correctAnswer: 1,
    explanation:
      'The broken record technique involves calmly and persistently repeating your key message or boundary without being drawn into side arguments, justifications, or emotional responses. For example, when a client repeatedly asks an electrician to do unpaid extras, calmly repeating "I\'m happy to do that work, but it will need to be priced as an additional." This technique is effective against manipulation tactics.',
    section: 'Communication for Difficult Conversations',
    difficulty: 'basic' as const,
    topic: 'Broken Record Technique',
    category: 'Communication for Difficult Conversations',
  },
  {
    id: 54,
    question: 'In the Crucial Conversations framework, "silence" and "violence" refer to:',
    options: [
      'The two stages every conflict passes through before it can be resolved',
      'Literal silence and literal physical aggression, as opposed to verbal disagreement',
      'Unhealthy responses to feeling unsafe — withdrawing from dialogue, or forcing your meaning on others',
      'The choice between saying nothing and reporting the matter formally',
    ],
    correctAnswer: 2,
    explanation:
      'In Crucial Conversations, "silence" and "violence" are metaphorical responses to feeling unsafe in dialogue. Silence includes masking (understating opinions), avoiding (steering away from sensitive subjects), and withdrawing (pulling out entirely). Violence includes controlling (cutting others off, overstating facts), labelling (dismissing ideas by assigning them to a category), and attacking (making others suffer). Both prevent information from entering the pool of shared meaning.',
    section: 'Communication for Difficult Conversations',
    difficulty: 'basic' as const,
    topic: 'Crucial Conversations',
    category: 'Communication for Difficult Conversations',
  },
  {
    id: 55,
    question: 'What does the "S" in the STATE model from Crucial Conversations stand for?',
    options: [
      'Summarise the situation',
      'Set the agenda',
      'Start with a question',
      'Share your facts',
    ],
    correctAnswer: 3,
    explanation:
      'The "S" in the STATE model stands for "Share your facts." Facts are the least controversial element and provide a solid foundation for the conversation. By starting with observable facts rather than conclusions or emotions, you create a safer space for dialogue. For example, "The completion date was Friday and the work is still outstanding" is a fact, not a judgement.',
    section: 'Communication for Difficult Conversations',
    difficulty: 'basic' as const,
    topic: 'STATE Model',
    category: 'Communication for Difficult Conversations',
  },
  {
    id: 56,
    question: 'What is the assertiveness formula in its correct sequence?',
    options: [
      'Describe behaviour, express feelings, state impact, request change',
      'State impact, request change, describe behaviour, express feelings',
      'Express feelings, request change, describe behaviour, state impact',
      'Request change, state impact, express feelings, describe behaviour',
    ],
    correctAnswer: 0,
    explanation:
      'The assertiveness formula follows four steps: describe the specific behaviour (not the person), express how it makes you feel, state the concrete impact, and request a specific change. For example: "When materials are left blocking the corridor (behaviour), I feel concerned (feeling) because it creates a trip hazard (impact). Could you store them in the designated area? (request)." This structure is assertive without being aggressive.',
    section: 'Communication for Difficult Conversations',
    difficulty: 'basic' as const,
    topic: 'Assertiveness Spectrum',
    category: 'Communication for Difficult Conversations',
  },
  {
    id: 57,
    question:
      "Which reflective listening technique involves restating the speaker's message in your own words?",
    options: [
      'Summarising',
      'Paraphrasing',
      'Reflecting feelings',
      'Clarifying',
    ],
    correctAnswer: 1,
    explanation:
      'Paraphrasing involves restating the speaker\'s message in your own words to confirm understanding. For example, if a client says "I\'m worried about whether the new circuit can handle all my kitchen appliances," you might paraphrase: "So you want to make sure the circuit is rated for everything you plan to plug in?" Paraphrasing shows you are listening and gives the speaker a chance to correct any misunderstanding.',
    section: 'Communication for Difficult Conversations',
    difficulty: 'intermediate' as const,
    topic: 'Reflective Listening',
    category: 'Communication for Difficult Conversations',
  },
  {
    id: 58,
    question: 'In NVC, what is the difference between a feeling and a thought?',
    options: [
      'A feeling is something you say aloud; a thought is something you keep private',
      'A feeling is always negative; a thought can be either positive or negative',
      'A feeling is an emotion (frustrated, anxious); a thought is an interpretation disguised as a feeling',
      'A feeling is based on facts; a thought is based on emotion',
    ],
    correctAnswer: 2,
    explanation:
      'In NVC, a genuine feeling is an emotion such as frustrated, anxious, relieved, or satisfied. A thought disguised as a feeling often follows the pattern "I feel that..." or "I feel like..." For example, "I feel that you don\'t care" is actually a thought (an interpretation of the other person\'s motivation), not a feeling. The genuine feeling might be "I feel disappointed." Distinguishing between the two prevents accusations disguised as feelings.',
    section: 'Communication for Difficult Conversations',
    difficulty: 'intermediate' as const,
    topic: 'Nonviolent Communication',
    category: 'Communication for Difficult Conversations',
  },
  {
    id: 59,
    question: 'In NVC, what is the difference between a request and a demand?',
    options: [
      'A request is made in person; a demand is put in writing',
      'A request is polite; a demand is rude, but both expect the same outcome',
      'A request comes from someone junior; a demand comes from someone senior',
      'A request lets the other person say no freely; a demand carries consequences for refusal',
    ],
    correctAnswer: 3,
    explanation:
      'In NVC, the key difference is that a request genuinely allows the other person to say no without punishment, while a demand carries implicit or explicit consequences for refusal. When an electrician says "Would you mind keeping this area clear?" it is a request. When they say "Keep this area clear or I\'ll report you to the site manager," it becomes a demand. Requests maintain the other person\'s autonomy and dignity.',
    section: 'Communication for Difficult Conversations',
    difficulty: 'intermediate' as const,
    topic: 'Nonviolent Communication',
    category: 'Communication for Difficult Conversations',
  },
  {
    id: 60,
    question:
      'What are "Mutual Purpose" and "Mutual Respect" in the Crucial Conversations framework?',
    options: [
      'The two conditions that must be present for people to feel safe enough to engage in honest dialogue',
      'The two outcomes a successful conversation should always produce',
      'The two questions you should ask before starting a difficult conversation',
      'The two roles a mediator must play when facilitating a dispute',
    ],
    correctAnswer: 0,
    explanation:
      'Mutual Purpose and Mutual Respect are the two conditions for safety in Crucial Conversations. Mutual Purpose means both parties believe the other cares about their goals and interests. Mutual Respect means both parties feel valued as human beings. When either is threatened, people move to silence or violence. Restoring safety often means explicitly re-establishing these conditions before continuing the conversation.',
    section: 'Communication for Difficult Conversations',
    difficulty: 'intermediate' as const,
    topic: 'Crucial Conversations',
    category: 'Communication for Difficult Conversations',
  },
  {
    id: 61,
    question: 'What is the "contrasting" technique in Crucial Conversations?',
    options: [
      "Comparing the other person's behaviour with how a reasonable person would act",
      "A don't/do statement that addresses concerns about your intentions and confirms your actual purpose",
      "Highlighting the difference between what was agreed and what was delivered",
      "Presenting two options and asking the other person to choose between them",
    ],
    correctAnswer: 1,
    explanation:
      "Contrasting is a don't/do statement used to restore safety. It clarifies what you don't mean and then confirms what you do mean. For example: \"I don't want you to think I'm questioning your competence — I'm not. What I do want is for us to find a way to get this containment issue sorted before the inspection.\" Contrasting prevents misunderstandings that could derail the conversation.",
    section: 'Communication for Difficult Conversations',
    difficulty: 'intermediate' as const,
    topic: 'Crucial Conversations',
    category: 'Communication for Difficult Conversations',
  },
  {
    id: 62,
    question: 'In the STATE model, what does the "T" for "Tell your story" mean?',
    options: [
      'Recount the full history of the dispute from the very beginning',
      'Describe how a similar situation was resolved on a previous job',
      'Share your interpretation, conclusion, or theory about the facts — tentatively, not as absolute truth',
      'State your conclusion firmly so the other person knows exactly where you stand',
    ],
    correctAnswer: 2,
    explanation:
      'In the STATE model, "Tell your story" means sharing your interpretation of the facts — but doing so tentatively, as your view rather than established truth. After sharing facts ("The circuit was left untested"), you tell your story ("I\'m beginning to wonder whether the testing schedule isn\'t working for you"). The key is owning it as your interpretation, which invites dialogue rather than shutting it down.',
    section: 'Communication for Difficult Conversations',
    difficulty: 'intermediate' as const,
    topic: 'STATE Model',
    category: 'Communication for Difficult Conversations',
  },
  {
    id: 63,
    question: 'What does "Talk tentatively" mean in the STATE model?',
    options: [
      'Speak softly and slowly so the other person stays calm throughout',
      'Avoid stating any opinion at all until the other person has finished speaking',
      'Hint at your concern indirectly so the other person works it out for themselves',
      'Express your views as opinions rather than disguised facts, using language like "I\'m wondering..." or "It seems to me..."',
    ],
    correctAnswer: 3,
    explanation:
      'Talking tentatively means presenting your interpretation as opinion rather than fact. Instead of "You clearly don\'t care about quality," you say "I\'m starting to wonder whether quality standards might be slipping — what\'s your take?" Tentative language signals that you are open to being wrong and invites the other person to share their perspective. This dramatically increases the chance of productive dialogue.',
    section: 'Communication for Difficult Conversations',
    difficulty: 'intermediate' as const,
    topic: 'STATE Model',
    category: 'Communication for Difficult Conversations',
  },
  {
    id: 64,
    question:
      'An electrician needs to tell a long-standing client that the price for a rewire has increased significantly. Which approach best applies the Positive No technique?',
    options: [
      '"I really value our working relationship and want to continue working with you (Yes). I can\'t do this at the old price because material costs have risen 30% (No). I can offer you a phased approach to spread the cost if that helps (Yes)."',
      '"I\'m really sorry, but prices have gone up and there is nothing I can do about it — that\'s just how it is now."',
      '"Other electricians would charge you far more than this, so you are actually getting a very good deal from me."',
      '"If you don\'t accept the new price, I\'m afraid I won\'t be able to take on the job at all."',
    ],
    correctAnswer: 0,
    explanation:
      'The Positive No (Yes-No-Yes) structure works perfectly here. The first Yes affirms the relationship and shared interest. The No clearly states the boundary with a factual reason. The second Yes offers a constructive alternative. This approach is far more effective than an ultimatum (which damages the relationship), an apology (which undermines your position), or a comparison (which sounds defensive).',
    section: 'Communication for Difficult Conversations',
    difficulty: 'intermediate' as const,
    topic: 'Positive No',
    category: 'Communication for Difficult Conversations',
  },
  {
    id: 65,
    question:
      'Which behaviour on the assertiveness spectrum involves expressing displeasure indirectly through sarcasm, silent treatment, or deliberate inefficiency?',
    options: [
      'Passive',
      'Passive-aggressive',
      'Assertive',
      'Aggressive',
    ],
    correctAnswer: 1,
    explanation:
      'Passive-aggressive behaviour involves expressing displeasure indirectly rather than directly. On a construction site, this might include sarcastic comments about another trade\'s work, "accidentally" making someone else\'s task harder, or agreeing to a timeline with no intention of meeting it. Passive-aggressive behaviour is particularly toxic because it is difficult to confront directly and erodes trust.',
    section: 'Communication for Difficult Conversations',
    difficulty: 'intermediate' as const,
    topic: 'Assertiveness Spectrum',
    category: 'Communication for Difficult Conversations',
  },
  {
    id: 66,
    question:
      'When reflecting feelings, which of the following responses best demonstrates this technique?',
    options: [
      '"You shouldn\'t be so worried about the timeline — these things always sort themselves out"',
      '"Let\'s not get emotional about this; can we just focus on the facts of the matter?"',
      '"It sounds like you\'re feeling frustrated because the timeline has been pushed back again"',
      '"I know exactly how you feel; the same thing happened to me on a job last year"',
    ],
    correctAnswer: 2,
    explanation:
      'Reflecting feelings involves naming the emotion you observe and connecting it to its apparent cause. The response "It sounds like you\'re feeling frustrated because the timeline has been pushed back again" demonstrates this effectively. It acknowledges the emotion without dismissing it, connects it to a cause, and uses tentative language ("It sounds like") that invites correction. This technique helps the other person feel understood.',
    section: 'Communication for Difficult Conversations',
    difficulty: 'intermediate' as const,
    topic: 'Reflective Listening',
    category: 'Communication for Difficult Conversations',
  },
  {
    id: 67,
    question: 'What is "selective listening" according to Covey\'s model?',
    options: [
      'Choosing carefully which conversations are worth listening to',
      'Listening only to people you consider more senior or more experienced',
      'Picking out the action points from a conversation and ignoring the small talk',
      'Hearing only parts of the conversation that interest you or confirm your existing views',
    ],
    correctAnswer: 3,
    explanation:
      'Selective listening means hearing only parts of the conversation — typically the parts that interest you, that you agree with, or that confirm your existing beliefs. In conflict situations, selective listening is particularly dangerous because each party only hears the parts that support their position while filtering out valid points from the other side. Moving beyond selective listening requires conscious effort and practice.',
    section: 'Communication for Difficult Conversations',
    difficulty: 'intermediate' as const,
    topic: 'Covey Five Levels of Listening',
    category: 'Communication for Difficult Conversations',
  },
  {
    id: 68,
    question:
      'An electrician says to a client: "When I arrived this morning and found the work area had been used as storage overnight (observation), I felt frustrated (feeling) because I need a clear workspace to install safely and efficiently (need). Could we agree that the area stays clear during the installation? (request)." This is an example of:',
    options: [
      'Nonviolent Communication (NVC) in practice',
      'The STATE model in practice',
      'The broken record technique in practice',
      'The Positive No (Yes-No-Yes) in practice',
    ],
    correctAnswer: 0,
    explanation:
      'This is a textbook example of Nonviolent Communication (NVC) applied to a real construction situation. It follows all four steps: an observation without judgement, a genuine feeling, an underlying need, and a clear request. Notice how the electrician avoids blame ("you filled my workspace with junk") and instead describes the situation factually, making it far easier for the client to respond positively.',
    section: 'Communication for Difficult Conversations',
    difficulty: 'intermediate' as const,
    topic: 'Nonviolent Communication',
    category: 'Communication for Difficult Conversations',
  },
  {
    id: 69,
    question: 'What does the "A" in the STATE model stand for?',
    options: [
      'Argue your case',
      "Ask for others' paths",
      'Accept the outcome',
      'Apologise first',
    ],
    correctAnswer: 1,
    explanation:
      '"Ask for others\' paths" is the fourth step of the STATE model. After sharing your facts, telling your story, and talking tentatively, you actively invite the other person to share their perspective. This might sound like "How do you see this?" or "What am I missing?" This step is crucial because it turns a monologue into a dialogue and often reveals information that changes your understanding of the situation.',
    section: 'Communication for Difficult Conversations',
    difficulty: 'intermediate' as const,
    topic: 'STATE Model',
    category: 'Communication for Difficult Conversations',
  },
  {
    id: 70,
    question:
      'The "E" in the STATE model stands for "Encourage testing." What does this mean in practice?',
    options: [
      'Encourage the other person to test electrical circuits',
      'Encourage them to take a test to prove their competence',
      'Actively invite disagreement and alternative views to ensure your understanding is complete',
      "Test the other person's patience to see how they react",
    ],
    correctAnswer: 2,
    explanation:
      '"Encourage testing" means actively inviting the other person to disagree with you or offer alternative views. Phrases like "I\'d really like to hear if you see this differently" or "Push back on this if I\'m off base" create genuine psychological safety. This step demonstrates that you are seeking truth, not just validation, and it dramatically increases the quality of the resulting dialogue.',
    section: 'Communication for Difficult Conversations',
    difficulty: 'intermediate' as const,
    topic: 'STATE Model',
    category: 'Communication for Difficult Conversations',
  },
  {
    id: 71,
    question:
      'What is summarising as a reflective listening technique, and when is it most useful?',
    options: [
      'Restating a single sentence back word-for-word, most useful when you mishear something',
      'Cutting a long explanation short, most useful when you are pressed for time',
      'Adding your own view to what was said, most useful when you disagree',
      'Pulling together the key points to confirm shared understanding, useful at the end of a difficult talk',
    ],
    correctAnswer: 3,
    explanation:
      "Summarising involves pulling together the main themes, feelings, and agreed points from a longer conversation. It is most useful at the end of a difficult discussion or at transition points. For example: \"So to summarise, you're concerned about the timeline, you need the kitchen functional by Friday, and we've agreed I'll prioritise that circuit tomorrow. Is that right?\" This confirms shared understanding and prevents later disputes about what was agreed.",
    section: 'Communication for Difficult Conversations',
    difficulty: 'intermediate' as const,
    topic: 'Reflective Listening',
    category: 'Communication for Difficult Conversations',
  },
  {
    id: 72,
    question:
      'A client is visibly angry about a perceived overcharge. The electrician should first:',
    options: [
      "Listen empathically to understand the client's full concern before responding",
      "Set out the facts and figures straight away to show the charge was fair",
      "Offer a goodwill discount immediately to calm the client down",
      "Ask the client politely to calm down before any discussion can take place",
    ],
    correctAnswer: 0,
    explanation:
      'When a client is visibly angry, the priority is empathic listening — seeking first to understand before being understood (Covey\'s Habit 5). Jumping to defence (even with valid facts) will feel dismissive. Offering a discount before understanding the issue teaches the client that anger gets results. Telling someone to "calm down" never works and often escalates the situation. Once the client feels heard, they become far more receptive to a rational discussion about pricing.',
    section: 'Communication for Difficult Conversations',
    difficulty: 'intermediate' as const,
    topic: 'Empathic Listening',
    category: 'Communication for Difficult Conversations',
  },
  {
    id: 73,
    question:
      'How does the Crucial Conversations concept of "masking" manifest in a construction context?',
    options: [
      'Cutting another person off mid-sentence to make your own point',
      'Understating your true opinion, using sarcasm, or sugarcoating to avoid speaking directly',
      'Overstating the facts to win an argument with another trade',
      'Refusing to engage with a conversation at all and walking away',
    ],
    correctAnswer: 1,
    explanation:
      'In Crucial Conversations, masking is a form of silence where someone understates their true opinion or uses sarcasm to hint at their concerns without stating them directly. On a construction site, this might look like an electrician saying "Yeah, I\'m sure the plumber knows best" sarcastically instead of directly raising their concern about pipe routing affecting cable runs. Masking prevents honest dialogue and allows problems to persist.',
    section: 'Communication for Difficult Conversations',
    difficulty: 'advanced' as const,
    topic: 'Crucial Conversations',
    category: 'Communication for Difficult Conversations',
  },
  {
    id: 74,
    question:
      'An NVC-trained electrician needs to address an apprentice who has repeatedly left tools out on site, creating a trip hazard. Which response best applies all four NVC steps?',
    options: [
      '"You\'re always leaving your tools lying around — it\'s lazy and someone is going to get hurt because of you."',
      '"I feel that you don\'t take site safety as seriously as the rest of the team do."',
      '"I\'ve seen tools on the walkway three times this week. I\'m worried someone could trip. Would you return them to the kit bag after each use?"',
      '"The other apprentices manage to keep their area tidy, so I don\'t see why you can\'t do the same."',
    ],
    correctAnswer: 2,
    explanation:
      'The correct response demonstrates all four NVC steps. It begins with a specific, factual observation (tools left out three times), states a genuine feeling (worried), connects it to a universal need (safety), and makes a clear, doable request (use tool belt and return tools). Notice how it avoids "always" (exaggeration), "I feel that you..." (thought disguised as feeling), and comparison with others (which triggers shame rather than change).',
    section: 'Communication for Difficult Conversations',
    difficulty: 'advanced' as const,
    topic: 'Nonviolent Communication',
    category: 'Communication for Difficult Conversations',
  },
  {
    id: 75,
    question:
      'In a crucial conversation where a site manager has moved to "controlling" behaviour (a form of violence), the most effective immediate response is to:',
    options: [
      'Match their assertiveness so they know you will not be controlled',
      'Stay silent and let them have their say to avoid escalating things',
      'Concede the point quickly so the conversation can move on',
      'Step out of the content, restore safety through Mutual Purpose and Respect, then return to the issue',
    ],
    correctAnswer: 3,
    explanation:
      'When someone moves to violence (controlling, labelling, or attacking), the Crucial Conversations approach is to step out of the content of the argument and restore safety. This means addressing Mutual Purpose ("I think we both want this project to succeed") and Mutual Respect ("I respect your experience on this"). Only once safety is restored can productive dialogue resume. Matching aggression escalates, leaving abandons the issue, and capitulating enables the controlling behaviour.',
    section: 'Communication for Difficult Conversations',
    difficulty: 'advanced' as const,
    topic: 'Crucial Conversations',
    category: 'Communication for Difficult Conversations',
  },
  {
    id: 76,
    question:
      'How does the empathic listening level differ fundamentally from the attentive listening level?',
    options: [
      "Empathic listening seeks the speaker's emotions and underlying needs, not just the words",
      "Empathic listening means agreeing with the speaker, whereas attentive listening stays neutral",
      "Empathic listening is silent, whereas attentive listening involves asking questions",
      "Empathic listening is used with clients, whereas attentive listening is used with colleagues",
    ],
    correctAnswer: 0,
    explanation:
      'The fundamental difference is that attentive listening focuses on the content — the words being spoken — while empathic listening seeks to understand the speaker\'s entire frame of reference, including emotions, underlying needs, and the meaning behind the words. An attentive listener hears "I\'m unhappy with the finish." An empathic listener hears the frustration, the concern about value for money, and perhaps the fear of having made a wrong decision in choosing this electrician.',
    section: 'Communication for Difficult Conversations',
    difficulty: 'advanced' as const,
    topic: 'Empathic Listening',
    category: 'Communication for Difficult Conversations',
  },
  {
    id: 77,
    question:
      'The broken record technique can be combined with which other technique to maintain boundaries while preserving the relationship?',
    options: [
      'The Ladder of Inference, walking the other person back down to the facts',
      'The Positive No (Yes-No-Yes), creating a firm but respectful repetition pattern',
      'The amygdala hijack, allowing emotions to run their course first',
      'Selective listening, focusing only on the parts that support your boundary',
    ],
    correctAnswer: 1,
    explanation:
      'Combining the broken record technique with the Positive No creates a powerful pattern: consistently repeating a boundary (broken record) within a framework that affirms the relationship and offers alternatives (Yes-No-Yes). For example, each time a client requests free extras, the electrician repeats: "I want to help you get exactly what you want (Yes), but I can\'t include that in the agreed price (No). I can give you a quote for the additional work today (Yes)." This combination is firm without being hostile.',
    section: 'Communication for Difficult Conversations',
    difficulty: 'advanced' as const,
    topic: 'Broken Record Technique',
    category: 'Communication for Difficult Conversations',
  },
  {
    id: 78,
    question:
      'When applying the STATE model to address a pattern of late payments from a main contractor, what is the most effective way to "Share facts" without triggering defensiveness?',
    options: [
      '"You never pay us on time and it is starting to feel like you don\'t value our work."',
      '"Everyone in the trade knows you have a reputation for paying late, and it needs to stop."',
      '"Across the last six invoices, average payment has been 47 days against our agreed 30-day terms."',
      '"I feel like you are deliberately holding our money back to help your own cash flow."',
    ],
    correctAnswer: 2,
    explanation:
      'The most effective way to share facts is with specific, verifiable data that cannot be disputed. Stating exact invoice numbers, dates, and comparisons to agreed terms is factual and compelling. "You never pay on time" is an exaggeration that invites argument about the word "never." Reputation comments are hearsay. "I feel like you don\'t value..." is a thought disguised as a feeling. Starting with indisputable data establishes credibility and makes the subsequent conversation much more productive.',
    section: 'Communication for Difficult Conversations',
    difficulty: 'advanced' as const,
    topic: 'STATE Model',
    category: 'Communication for Difficult Conversations',
  },
  {
    id: 79,
    question:
      'How can an electrician effectively use the contrasting technique when raising a quality concern with a fellow tradesperson?',
    options: [
      'By opening with praise about their work generally, then slipping in the criticism, then ending with more praise',
      'By raising the concern only with their supervisor so they are not embarrassed in front of others',
      'By comparing their work directly with another tradesperson\'s to show what good looks like',
      'By first stating what they don\'t mean ("not your work overall") and then what they do ("this joint needs attention")',
    ],
    correctAnswer: 3,
    explanation:
      'The contrasting technique works by explicitly addressing the misunderstanding you fear the other person might have (don\'t) and then clarifying your actual intent (do). This is not the same as sandwiching criticism between praise. It directly addresses potential misinterpretation. The structure "I\'m not saying X, I am saying Y" prevents the other tradesperson from feeling their overall competence is being attacked, keeping them engaged in solving the specific issue.',
    section: 'Communication for Difficult Conversations',
    difficulty: 'advanced' as const,
    topic: 'Crucial Conversations',
    category: 'Communication for Difficult Conversations',
  },
  {
    id: 80,
    question:
      'An electrician is in a heated discussion with a client where Mutual Respect has broken down. The client says, "You electricians are all the same — just out to rip people off." How should the electrician restore Mutual Respect using Crucial Conversations principles?',
    options: [
      "Pause the content, acknowledge the frustration, reaffirm respect, then use contrasting to separate the real concern from the generalisation",
      "Defend the trade by pointing out how many electricians do excellent, honest work every day",
      "End the conversation politely and arrange to return once the client has calmed down",
      "Match the client's frustration to show that the accusation is unfair and out of order",
    ],
    correctAnswer: 0,
    explanation:
      'When Mutual Respect breaks down, the priority is to restore it before continuing the content discussion. This requires pausing, acknowledging the emotion behind the attack (frustration about money), reaffirming genuine respect for the client, and using contrasting to separate the legitimate concern (budget worries) from the unfair generalisation (all electricians are dishonest). Retaliating escalates, ignoring leaves the broken safety unrepaired, and withdrawing abandons the opportunity to resolve the dispute.',
    section: 'Communication for Difficult Conversations',
    difficulty: 'advanced' as const,
    topic: 'Crucial Conversations',
    category: 'Communication for Difficult Conversations',
  },

  // =====================================================
  // Category 3: Resolving Client Disputes (id 81-120)
  // 16 basic, 16 intermediate, 8 advanced
  // =====================================================
  {
    id: 81,
    question:
      'Under the Late Payment of Commercial Debts (Interest) Act 1998, what is the statutory interest rate that can be charged on overdue commercial invoices?',
    options: [
      '6% above Bank of England base rate',
      '8% above Bank of England base rate',
      '4% above Bank of England base rate',
      '10% above Bank of England base rate',
    ],
    correctAnswer: 1,
    explanation:
      'The Late Payment of Commercial Debts (Interest) Act 1998 entitles businesses to charge statutory interest at 8% above the Bank of England base rate on overdue commercial invoices. This is a powerful tool for electricians dealing with late-paying commercial clients. The interest accrues from the day after the agreed payment date, providing a strong financial incentive for timely payment.',
    section: 'Resolving Client Disputes',
    difficulty: 'basic' as const,
    topic: 'Late Payment Act',
    category: 'Resolving Client Disputes',
  },
  {
    id: 82,
    question:
      'Under the Late Payment Act, what are the fixed compensation amounts for debt recovery, based on the size of the debt?',
    options: [
      '£25 (up to £499.99), £50 (£500-£4,999.99), £75 (£5,000+)',
      '£50 (up to £999.99), £100 (£1,000-£9,999.99), £150 (£10,000+)',
      '£40 (up to £999.99), £70 (£1,000-£9,999.99), £100 (£10,000+)',
      '£30 (up to £999.99), £60 (£1,000-£9,999.99), £90 (£10,000+)',
    ],
    correctAnswer: 2,
    explanation:
      'The Late Payment Act provides fixed compensation for the cost of recovering a late debt: £40 for debts up to £999.99, £70 for debts between £1,000 and £9,999.99, and £100 for debts of £10,000 or more. These amounts are in addition to the statutory interest. Many electricians are unaware of this entitlement, which can be claimed even if the debt is eventually paid.',
    section: 'Resolving Client Disputes',
    difficulty: 'basic' as const,
    topic: 'Late Payment Act',
    category: 'Resolving Client Disputes',
  },
  {
    id: 83,
    question: 'What is the maximum claim value for the Small Claims Court in England and Wales?',
    options: [
      '£25,000',
      '£15,000',
      '£5,000',
      '£10,000',
    ],
    correctAnswer: 3,
    explanation:
      'The Small Claims Court in England and Wales handles claims up to £10,000. It is designed to be accessible without needing a solicitor, making it a practical option for electricians pursuing unpaid invoices. Court fees range from £35 to £455 depending on the claim value, and claims can be submitted online through Money Claims Online (MCOL).',
    section: 'Resolving Client Disputes',
    difficulty: 'basic' as const,
    topic: 'Small Claims Court',
    category: 'Resolving Client Disputes',
  },
  {
    id: 84,
    question: 'What is "scope creep" in a construction project context?',
    options: [
      'The gradual expansion of work beyond the original agreement, through small minor-seeming additions',
      'The tendency for a project to take longer than the original programme allowed',
      'The gradual increase in material costs over the life of a long project',
      'The point at which a project becomes too large for a sole trader to handle alone',
    ],
    correctAnswer: 0,
    explanation:
      'Scope creep is the gradual expansion of work beyond what was originally agreed, often through small, seemingly minor additions — the classic "while you\'re here, could you also..." syndrome. Each individual request seems small, but collectively they can add hours or days of unpaid work. Managing scope creep requires clear original agreements and a systematic variation order process.',
    section: 'Resolving Client Disputes',
    difficulty: 'basic' as const,
    topic: 'Scope Creep',
    category: 'Resolving Client Disputes',
  },
  {
    id: 85,
    question: 'The "while you\'re here" syndrome refers to:',
    options: [
      'A client asking you to return at a more convenient time for them',
      'Clients requesting additional work beyond the original scope, often phrased casually to avoid formal pricing',
      'A client expecting you to remain on site even after the work is finished',
      'A client insisting that you complete the whole job in a single visit',
    ],
    correctAnswer: 1,
    explanation:
      'The "while you\'re here" syndrome is a common form of scope creep where clients casually request additional work — "while you\'re here, could you just move that socket?" — hoping to avoid the formal process of getting a quote and agreeing additional costs. Electricians must recognise this pattern and respond assertively with pricing for additional work, no matter how small the request appears.',
    section: 'Resolving Client Disputes',
    difficulty: 'basic' as const,
    topic: 'Scope Creep',
    category: 'Resolving Client Disputes',
  },
  {
    id: 86,
    question: 'A variation order should include which essential elements?',
    options: [
      "The client's deposit, the start date, and a list of materials to be used",
      "A photograph of the area, the original quote number, and a warranty period",
      "What has changed, why it changed, the cost, and the client's signature",
      "The names of all trades on site, the project value, and an insurance reference",
    ],
    correctAnswer: 2,
    explanation:
      "A proper variation order should document what has changed from the original scope, why the change is needed, the cost (including materials and labour), and the client's signature confirming agreement. This documentation protects both parties — the electrician gets payment confirmation, and the client gets transparency about what they are paying for and why.",
    section: 'Resolving Client Disputes',
    difficulty: 'basic' as const,
    topic: 'Variation Orders',
    category: 'Resolving Client Disputes',
  },
  {
    id: 87,
    question: 'What is the key legal distinction between a quote and an estimate?',
    options: [
      'A quote is given verbally, while an estimate must always be in writing',
      'A quote includes VAT, while an estimate is always shown before tax',
      'A quote is only for domestic work, while an estimate is only for commercial work',
      'A quote is a fixed price that cannot change; an estimate is an approximate cost that may vary',
    ],
    correctAnswer: 3,
    explanation:
      'A quote is a fixed price offer — once accepted, it becomes the agreed price and cannot be changed without a variation order. An estimate is an informed approximation that may go up or down as the work progresses. This distinction is critical for electricians: quoting a fixed price for a rewire when you cannot see all the existing wiring creates financial risk. Estimates with clear caveats provide more flexibility.',
    section: 'Resolving Client Disputes',
    difficulty: 'basic' as const,
    topic: 'Quote vs Estimate',
    category: 'Resolving Client Disputes',
  },
  {
    id: 88,
    question:
      'Under the Consumer Rights Act 2015, what standard must services provided to consumers meet?',
    options: [
      'Reasonable care and skill, at a reasonable price',
      'The cheapest available standard',
      'The highest possible standard regardless of price',
      'Whatever standard the contractor decides',
    ],
    correctAnswer: 0,
    explanation:
      'The Consumer Rights Act 2015 requires that services are performed with reasonable care and skill, at a reasonable price (if no price was agreed in advance), and within a reasonable time (if no timeframe was agreed). For electricians, this means work must meet the standard of a competent professional. Failure to meet this standard gives the consumer rights to repair, price reduction, or in some cases, a refund.',
    section: 'Resolving Client Disputes',
    difficulty: 'basic' as const,
    topic: 'Consumer Rights Act 2015',
    category: 'Resolving Client Disputes',
  },
  {
    id: 89,
    question:
      "Under the Consumer Rights Act 2015, what is the consumer's primary remedy if a service is not performed with reasonable care and skill?",
    options: [
      'An automatic full refund of everything paid for the work',
      'The right to require the trader to repeat or fix the service at no additional cost',
      'Statutory compensation for inconvenience on top of any refund',
      'The right to have a different trader complete the work at the original price',
    ],
    correctAnswer: 1,
    explanation:
      "Under the Consumer Rights Act 2015, the consumer's primary remedy for a service not performed with reasonable care and skill is the right to require the trader to repeat or fix the service at no additional cost. If this is not possible or not done within a reasonable time, the consumer can claim a price reduction. This statutory framework provides a clear pathway for resolving quality disputes between electricians and domestic clients.",
    section: 'Resolving Client Disputes',
    difficulty: 'basic' as const,
    topic: 'Consumer Rights Act 2015',
    category: 'Resolving Client Disputes',
  },
  {
    id: 90,
    question: 'What does the HEARD framework stand for in service recovery?',
    options: [
      'Help, Evaluate, Act, Respond, Document',
      'Handle, Explain, Adjust, Review, Decide',
      'Hear, Empathise, Apologise, Resolve, Do follow up',
      'Hope, Engage, Agree, Report, Dismiss',
    ],
    correctAnswer: 2,
    explanation:
      'The HEARD framework stands for Hear (listen fully to the complaint), Empathise (show you understand their frustration), Apologise (say sorry for the experience), Resolve (fix the problem), and Do follow up (check back to ensure satisfaction). This systematic approach to complaint handling is widely used in service industries and is highly effective for electricians managing client dissatisfaction.',
    section: 'Resolving Client Disputes',
    difficulty: 'basic' as const,
    topic: 'HEARD Framework',
    category: 'Resolving Client Disputes',
  },
  {
    id: 91,
    question:
      'What is the "under-promise, over-deliver" principle in managing client expectations?',
    options: [
      'Quoting a low price to win the work and adding extras to the final bill',
      'Promising more than you can deliver to reassure an anxious client',
      'Keeping the client at arm\'s length so they have no expectations to disappoint',
      'Setting realistic or slightly conservative expectations, then exceeding them',
    ],
    correctAnswer: 3,
    explanation:
      'The under-promise, over-deliver principle means setting realistic or slightly conservative expectations — on timing, scope, and finish — and then exceeding them. For example, telling a client the rewire will take five days when you expect to finish in four. If you finish in four, the client is delighted. If complications arise and it takes five, you still met the expectation. This approach builds trust and generates referrals.',
    section: 'Resolving Client Disputes',
    difficulty: 'basic' as const,
    topic: 'Managing Client Expectations',
    category: 'Resolving Client Disputes',
  },
  {
    id: 92,
    question: 'Why is proactive communication with clients important during a project?',
    options: [
      'Regular updates prevent anxiety, build trust, and reduce the likelihood of complaints and disputes',
      'It removes the need to put anything about the project in writing',
      'It allows you to charge the client for the time spent communicating',
      'It transfers responsibility for any delays onto the client',
    ],
    correctAnswer: 0,
    explanation:
      'Proactive communication — providing regular updates without waiting to be asked — prevents client anxiety, builds trust, and significantly reduces the likelihood of complaints and disputes. Clients who feel informed and included are far more tolerant of unexpected issues than those who feel ignored. A quick end-of-day update or photo of progress takes seconds but can prevent days of dispute resolution.',
    section: 'Resolving Client Disputes',
    difficulty: 'basic' as const,
    topic: 'Communication Frequency',
    category: 'Resolving Client Disputes',
  },
  {
    id: 93,
    question:
      'What is the difference between a legitimate complaint and an unreasonable complaint?',
    options: [
      'A legitimate complaint is made in writing; an unreasonable complaint is made verbally',
      'A legitimate complaint flags a genuine failure to meet standards; an unreasonable one seeks more than was agreed',
      'A legitimate complaint comes from a paying client; an unreasonable complaint comes from a third party',
      'A legitimate complaint is raised promptly; an unreasonable complaint is raised long after the work is finished',
    ],
    correctAnswer: 1,
    explanation:
      'A legitimate complaint identifies a genuine failure to meet agreed standards, specifications, or reasonable expectations. An unreasonable complaint seeks outcomes disproportionate to the issue, demands services beyond what was agreed, or is motivated by an attempt to avoid payment. While both require professional handling, recognising the difference helps electricians respond appropriately — resolving legitimate concerns while maintaining boundaries against unreasonable demands.',
    section: 'Resolving Client Disputes',
    difficulty: 'basic' as const,
    topic: 'Legitimate vs Unreasonable Complaints',
    category: 'Resolving Client Disputes',
  },
  {
    id: 94,
    question:
      'What does "taking responsibility without accepting liability" mean in a client dispute?',
    options: [
      "Refusing to discuss the issue at all until liability has been formally determined",
      "Admitting fault quickly so the client feels you are being honest with them",
      "Owning the client's experience and the fix, without making any legal admission of fault",
      "Passing the client straight to your insurer so you are not personally involved",
    ],
    correctAnswer: 2,
    explanation:
      "Taking responsibility without accepting liability means owning the client's experience and committing to resolve the issue, without making statements that could be used as legal admissions of fault. For example: \"I'm sorry you're experiencing this issue, and I'm going to make sure we sort it out\" rather than \"Yes, we did it wrong and it's all our fault.\" This approach demonstrates professionalism while protecting your legal position.",
    section: 'Resolving Client Disputes',
    difficulty: 'basic' as const,
    topic: 'Taking Responsibility Without Liability',
    category: 'Resolving Client Disputes',
  },
  {
    id: 95,
    question: 'What is the correct order for staged payment chasing?',
    options: [
      'Letter before action, small claims, phone call, friendly reminder',
      'Small claims, letter before action, phone call, friendly reminder',
      'Phone call, friendly reminder, small claims, letter before action',
      'Friendly reminder, formal reminder, phone call, letter before action, small claims',
    ],
    correctAnswer: 3,
    explanation:
      'The correct staged approach is: friendly reminder (informal, assumes oversight), formal written reminder (references terms and deadlines), phone call (personal contact to discuss any issues), letter before action (formal legal warning giving 30 days), and finally small claims court. Each stage escalates appropriately, giving the client every opportunity to pay while building a documented trail that demonstrates reasonableness if court proceedings become necessary.',
    section: 'Resolving Client Disputes',
    difficulty: 'basic' as const,
    topic: 'Staged Payment Chasing',
    category: 'Resolving Client Disputes',
  },
  {
    id: 96,
    question: 'Setting professional boundaries with clients means:',
    options: [
      'Clearly defining the agreed scope, your working hours, communication, and payment terms',
      'Keeping the client at a distance and limiting contact to the bare minimum',
      'Refusing to take on any work that falls outside your usual area of expertise',
      'Charging a premium so that only serious clients engage your services',
    ],
    correctAnswer: 0,
    explanation:
      'Professional boundaries define the scope of work, working hours, communication expectations, and payment terms. They protect both the electrician and the client by creating clarity about what is expected from each party. Clear boundaries prevent the resentment that builds when expectations are undefined. They are not about being unfriendly — they are about being clear, consistent, and professional.',
    section: 'Resolving Client Disputes',
    difficulty: 'basic' as const,
    topic: 'Professional Boundaries',
    category: 'Resolving Client Disputes',
  },
  {
    id: 97,
    question: 'What is the service recovery paradox, as identified by Tax and Brown in 1998?',
    options: [
      'The finding that most customers who complain never return regardless of how the issue is handled',
      'A customer who has a problem resolved exceptionally well may become more loyal than one who never experienced a problem',
      'The observation that resolving a complaint costs more than the original job was worth',
      'The tendency for one unhappy customer to tell far more people than a happy one',
    ],
    correctAnswer: 1,
    explanation:
      'The service recovery paradox, identified by Tax and Brown in 1998, suggests that a customer who experiences a problem that is then resolved exceptionally well can become more loyal and satisfied than a customer who never had a problem at all. For electricians, this means that handling a complaint brilliantly — through genuine care, speed of response, and exceeding expectations in the fix — can actually strengthen the client relationship.',
    section: 'Resolving Client Disputes',
    difficulty: 'intermediate' as const,
    topic: 'Service Recovery Paradox',
    category: 'Resolving Client Disputes',
  },
  {
    id: 98,
    question:
      'Under the Pre-Action Protocol for Debt Claims, how long must a debtor be given to respond to a letter before action?',
    options: [
      '7 days',
      '14 days',
      '30 days',
      '60 days',
    ],
    correctAnswer: 2,
    explanation:
      'The Pre-Action Protocol for Debt Claims requires that the debtor be given 30 days to respond to a letter before action. The letter must include the amount owed, how it was calculated, and details of any interest or charges being claimed. Failing to follow this protocol can result in cost penalties if the case reaches court, even if you win. The 30-day period also allows time for the debtor to seek advice or propose a payment plan.',
    section: 'Resolving Client Disputes',
    difficulty: 'intermediate' as const,
    topic: 'Pre-Action Protocol',
    category: 'Resolving Client Disputes',
  },
  {
    id: 99,
    question:
      'What information must a letter before action contain under the Pre-Action Protocol for Debt Claims?',
    options: [
      'Only the total amount owed and the date by which it must be paid',
      'A threat of immediate court action with no opportunity to respond',
      'The debtor\'s credit history and a demand for a personal guarantee',
      'The amount owed, how it was calculated, interest details, free-advice info, and a response deadline',
    ],
    correctAnswer: 3,
    explanation:
      'A letter before action must include: the total amount owed, a clear breakdown of how the amount was calculated, details of any interest or charges being claimed (including statutory interest under the Late Payment Act), information about where the debtor can get free debt advice, and a clear 30-day response deadline. The letter must be clear, factual, and professional. Threats or aggressive language can undermine your position in court.',
    section: 'Resolving Client Disputes',
    difficulty: 'intermediate' as const,
    topic: 'Pre-Action Protocol',
    category: 'Resolving Client Disputes',
  },
  {
    id: 100,
    question: 'What are the court fees for making a small claim through Money Claims Online?',
    options: [
      '£35 to £455, depending on the claim value',
      'A flat fee of £100 regardless of the claim value',
      '£25 to £600, depending on the claim value',
      'Free for claims under £1,000, then £200 above that',
    ],
    correctAnswer: 0,
    explanation:
      'Court fees for small claims through Money Claims Online range from £35 (for claims up to £300) to £455 (for claims between £5,000.01 and £10,000). These fees are recoverable from the defendant if you win the case. Money Claims Online is available 24/7 and is designed for use without a solicitor, making it accessible for electricians pursuing unpaid invoices.',
    section: 'Resolving Client Disputes',
    difficulty: 'intermediate' as const,
    topic: 'Small Claims Court',
    category: 'Resolving Client Disputes',
  },
  {
    id: 101,
    question:
      'An electrician completed a bathroom rewire. The client now claims the socket positions are wrong, but the positions match the agreed plan that the client signed. How should the electrician handle this?',
    options: [
      'Move the sockets free of charge to keep the client happy and avoid an argument',
      'Show the client the signed plan, empathise with their frustration, and offer to move the sockets as priced additional work',
      'Refuse to discuss the matter further and point out that the client signed the plan',
      'Threaten legal action to recover the full payment before doing any more work',
    ],
    correctAnswer: 1,
    explanation:
      "The best approach combines documentation (the signed plan), empathy (acknowledging the client's frustration), and a constructive solution (offering to move the sockets as additional priced work). This demonstrates professionalism while protecting the electrician's financial position. Moving sockets for free rewards the client for changing their mind after sign-off. Refusing to discuss it or threatening legal action damages the relationship unnecessarily.",
    section: 'Resolving Client Disputes',
    difficulty: 'intermediate' as const,
    topic: 'Managing Client Expectations',
    category: 'Resolving Client Disputes',
  },
  {
    id: 102,
    question: 'How should an electrician manage the "while you\'re here" syndrome assertively?',
    options: [
      'Refuse the request outright so the client learns not to ask for extras',
      'Quietly do the extra work to avoid an awkward conversation about money',
      'Acknowledge the request positively, explain it falls outside the original scope, and offer to price it as additional work',
      'Do the work now and add an unexplained charge to the final invoice',
    ],
    correctAnswer: 2,
    explanation:
      'The assertive approach is to acknowledge the request positively ("That\'s a good idea"), clarify that it falls outside the original scope ("That wasn\'t in our original agreement"), and offer a constructive path forward ("I can price that up for you as an additional — shall I do that?"). This approach is friendly and professional, protects the electrician\'s income, and keeps a clear record of scope changes.',
    section: 'Resolving Client Disputes',
    difficulty: 'intermediate' as const,
    topic: 'Scope Creep',
    category: 'Resolving Client Disputes',
  },
  {
    id: 103,
    question: 'In the HEARD framework, why is the "Do follow up" step important?',
    options: [
      'It allows you to invoice the client for the additional time spent resolving the issue',
      'It creates a written record that protects you against any future legal claim',
      'It gives you a chance to point out that the original fault was the client\'s own doing',
      'Following up shows genuine care, confirms the resolution was satisfactory, and can transform a complaint into lasting loyalty',
    ],
    correctAnswer: 3,
    explanation:
      'The "Do follow up" step is crucial because it demonstrates genuine care beyond the immediate fix. A follow-up call or message after resolving a complaint shows the client that their satisfaction matters to you as a person, not just as a commercial transaction. This step is where the service recovery paradox operates — the follow-up can transform a negative experience into a strengthened relationship and future referrals.',
    section: 'Resolving Client Disputes',
    difficulty: 'intermediate' as const,
    topic: 'HEARD Framework',
    category: 'Resolving Client Disputes',
  },
  {
    id: 104,
    question:
      'When a client claims work is substandard but the electrician believes it meets all relevant standards, the best first step is to:',
    options: [
      'Listen fully to understand the specific concern, then offer an independent inspection if agreement cannot be reached',
      'State firmly that the work meets all standards and there is nothing to discuss',
      'Offer to redo the work for free to bring the dispute to a quick end',
      'Refer the client straight to your professional body or insurer',
    ],
    correctAnswer: 0,
    explanation:
      'The best first step is to listen fully to understand exactly what the client believes is substandard. Often, perceived quality issues stem from different expectations rather than actual defects. After understanding the concern, explain your position with reference to standards and offer an independent inspection (such as by a registered third-party assessor) if agreement cannot be reached. This demonstrates confidence in your work while treating the client fairly.',
    section: 'Resolving Client Disputes',
    difficulty: 'intermediate' as const,
    topic: 'Legitimate vs Unreasonable Complaints',
    category: 'Resolving Client Disputes',
  },
  {
    id: 105,
    question: 'What is the purpose of managing client expectations at each stage of a project?',
    options: [
      'To give the client opportunities to add extra work at each stage of the job',
      'To align expectations on progress, disruption, and finish, closing the gap that causes complaints',
      'To justify increasing the price as the project moves forward',
      'To reduce the amount of contact you need to have with the client overall',
    ],
    correctAnswer: 1,
    explanation:
      'Managing expectations at each stage creates alignment between what the client anticipates and what they experience. This reduces the gap that causes complaints. Before starting, explain what each phase involves, what disruption to expect, and what the finish will look like. During the work, provide updates on progress. After completion, explain how to use new installations. Each touchpoint prevents misunderstandings that could become disputes.',
    section: 'Resolving Client Disputes',
    difficulty: 'intermediate' as const,
    topic: 'Managing Client Expectations',
    category: 'Resolving Client Disputes',
  },
  {
    id: 106,
    question:
      'Under the Consumer Rights Act 2015, if a service cannot be re-performed or is not re-performed within a reasonable time, the consumer is entitled to:',
    options: [
      'Statutory compensation fixed at twice the value of the service',
      'A replacement service carried out by a trader of the consumer\'s choosing',
      'A price reduction, which may be up to 100% of the cost (a full refund)',
      'An automatic right to cancel and recover all related costs',
    ],
    correctAnswer: 2,
    explanation:
      'If a service cannot be re-performed or is not re-performed within a reasonable time and without significant inconvenience to the consumer, they are entitled to a price reduction. This price reduction can be up to 100% of the cost, effectively a full refund. The amount depends on the severity of the failure. This provides a proportionate remedy — minor issues warrant small reductions, while total failures justify full refunds.',
    section: 'Resolving Client Disputes',
    difficulty: 'intermediate' as const,
    topic: 'Consumer Rights Act 2015',
    category: 'Resolving Client Disputes',
  },
  {
    id: 107,
    question:
      'Why should an electrician give an estimate rather than a quote for a rewire in a property they have not fully surveyed?',
    options: [
      'An estimate is quicker to produce, so the client can make a decision sooner',
      'An estimate looks more professional to a domestic client than a fixed quote',
      'An estimate is not legally binding, so the client cannot hold you to any figure',
      'An estimate allows for unforeseen work such as hidden junction boxes or asbestos, whereas a quote locks the price',
    ],
    correctAnswer: 3,
    explanation:
      'When a property has not been fully surveyed, an estimate is more appropriate because it allows flexibility for unforeseen complications — hidden junction boxes, asbestos-containing materials, damaged existing wiring, or non-standard construction. A quote locks in a fixed price and the electrician must absorb any additional costs. The estimate should include clear caveats about what might cause the final price to differ.',
    section: 'Resolving Client Disputes',
    difficulty: 'intermediate' as const,
    topic: 'Quote vs Estimate',
    category: 'Resolving Client Disputes',
  },
  {
    id: 108,
    question:
      'A domestic client wants to withhold the final payment because they are unhappy with the position of one light fitting, even though all other work is completed to a high standard. What are their rights under the Consumer Rights Act 2015?',
    options: [
      'They can request the light fitting be repositioned (right to repair) but cannot withhold a disproportionate amount relative to the defect',
      'They can withhold the entire final payment until every item is exactly as they wish',
      'They have no rights at all because the bulk of the work was done to a high standard',
      'They are entitled to a full refund of the whole job because of the single defect',
    ],
    correctAnswer: 0,
    explanation:
      'Under the Consumer Rights Act 2015, the client has the right to request that the service be re-performed (the light fitting repositioned) if it was not installed with reasonable care and skill. However, withholding the entire payment for a minor defect would be disproportionate. The appropriate approach is to discuss the specific issue, agree to rectify it, and arrange payment of the bulk of the invoice with a reasonable retention for the outstanding item.',
    section: 'Resolving Client Disputes',
    difficulty: 'intermediate' as const,
    topic: 'Consumer Rights Act 2015',
    category: 'Resolving Client Disputes',
  },
  {
    id: 109,
    question:
      'An electrician discovers mid-project that the existing consumer unit contains asbestos. The client refuses to pay for the additional cost of licensed asbestos removal. How should this be handled?',
    options: [
      "Carefully remove the asbestos yourself to keep the cost down and the job on programme",
      "Explain the legal need for licensed removal, raise it as a priced variation, and pause that work if the client refuses",
      "Work around the asbestos and continue with the rest of the installation as planned",
      "Absorb the cost of licensed removal yourself rather than risk losing the client",
    ],
    correctAnswer: 1,
    explanation:
      'The correct approach is to explain the legal requirement for licensed asbestos removal (under the Control of Asbestos Regulations 2012), present the additional cost as a formal variation order, and document everything. If the client refuses, the electrician must pause work on that element — they cannot legally proceed with or around the asbestos. Self-removal without a licence is a criminal offence. Clear documentation protects the electrician if the dispute escalates.',
    section: 'Resolving Client Disputes',
    difficulty: 'advanced' as const,
    topic: 'Variation Orders',
    category: 'Resolving Client Disputes',
  },
  {
    id: 110,
    question:
      'How does the service recovery paradox apply specifically to electrical contracting, and what are its limits?',
    options: [
      'It applies to every complaint equally, so any well-handled fix will strengthen loyalty',
      'It works only for commercial clients, who value efficient recovery more than domestic clients',
      'It works best when the failure was not negligent and recovery is swift, but not for repeated failures or safety breaches',
      'It works best when the recovery is offered as a discount rather than a quality fix',
    ],
    correctAnswer: 2,
    explanation:
      'The service recovery paradox works best in electrical contracting when the original issue was understandable (not negligent), the response is swift, and the resolution exceeds expectations. However, it has limits: it does not work for repeated failures (which indicate systemic problems), serious safety issues (which breach trust fundamentally), or if the recovery effort feels performative rather than genuine. The paradox is a bonus outcome of excellent complaint handling, not a strategy to be manufactured.',
    section: 'Resolving Client Disputes',
    difficulty: 'advanced' as const,
    topic: 'Service Recovery Paradox',
    category: 'Resolving Client Disputes',
  },
  {
    id: 111,
    question:
      'A client has not paid a £4,500 invoice that is now 60 days overdue. The electrician has sent a friendly reminder and a formal reminder with no response. What should the next step be before issuing a letter before action?',
    options: [
      'Issue the letter before action immediately, as two reminders are already enough',
      'Stop work on any other jobs for the client until the invoice is settled',
      'Add statutory interest to the invoice and reissue it without further contact',
      'Make a phone call to discuss the situation, check for any dispute about the work, and attempt to agree a payment plan',
    ],
    correctAnswer: 3,
    explanation:
      'Before escalating to a letter before action, a phone call serves several purposes: it confirms the client has received the reminders, checks whether there is a dispute about the work (which needs resolving before pursuing payment), offers the human connection that written communication lacks, and provides an opportunity to agree a payment plan. Courts look favourably on claimants who have made reasonable efforts to resolve disputes before litigation.',
    section: 'Resolving Client Disputes',
    difficulty: 'advanced' as const,
    topic: 'Staged Payment Chasing',
    category: 'Resolving Client Disputes',
  },
  {
    id: 112,
    question:
      'A client claims the Consumer Rights Act 2015 entitles them to a full refund because they changed their mind about the colour of the sockets after installation. Is this claim valid?',
    options: [
      'No — the Consumer Rights Act covers failure to perform with reasonable care and skill, not change of mind; the sockets were installed as agreed and meet the required standard',
      'Yes — the Consumer Rights Act gives consumers a 14-day cooling-off period for any installed goods',
      'Yes — the Consumer Rights Act allows a full refund whenever the consumer is dissatisfied for any reason',
      'Partly — the consumer is entitled to a 50% refund whenever they change their mind about a finish',
    ],
    correctAnswer: 0,
    explanation:
      'The Consumer Rights Act 2015 provides remedies when services are not performed with reasonable care and skill, within a reasonable time, or at a reasonable price. It does not cover change of mind. If the electrician installed the agreed sockets competently, the client has no right to a free replacement. The electrician could offer to change them as additional paid work. Understanding the scope of the Act helps electricians resist invalid claims while respecting legitimate rights.',
    section: 'Resolving Client Disputes',
    difficulty: 'advanced' as const,
    topic: 'Consumer Rights Act 2015',
    category: 'Resolving Client Disputes',
  },
  {
    id: 113,
    question:
      'What strategic considerations should an electrician weigh before pursuing a £2,000 debt through the Small Claims Court?',
    options: [
      'Whether the work was properly certified, whether building control was notified, and whether your insurer will cover any shortfall',
      'Court fees, time investment, enforcement difficulty, relationship damage, and whether the debtor can actually pay',
      'How quickly the court will list a hearing, whether the debtor lives locally, and how the dispute might affect your online reviews',
      'Document the programme change and its impact, notify the main contractor in writing, and follow up with a formal variation',
    ],
    correctAnswer: 1,
    explanation:
      'Before pursuing a small claim, an electrician should consider: court fees (£115 for a £2,000 claim), time spent preparing and attending (opportunity cost of not working), the difficulty of enforcing a judgement even if successful, the impact on any ongoing business relationship, and whether the debtor has assets or income to pay. Sometimes a negotiated settlement for a reduced amount, or even a write-off with lessons learned about credit control, is more commercially sensible than the cost of pursuing the full amount.',
    section: 'Resolving Client Disputes',
    difficulty: 'advanced' as const,
    topic: 'Small Claims Court',
    category: 'Resolving Client Disputes',
  },
  {
    id: 114,
    question:
      'How should an electrician respond to a client who makes a legitimate complaint about a genuine defect?',
    options: [
      'Acknowledge the defect briefly, fix it, and avoid further contact so the matter is closed quickly',
      'Refer the client to your terms and conditions and let them know the warranty position',
      'Apply the HEARD framework: listen fully, empathise genuinely, apologise for the inconvenience, resolve the defect promptly and thoroughly, and follow up to ensure satisfaction',
      'Offer a small discount on a future job in exchange for the client dropping the complaint',
    ],
    correctAnswer: 2,
    explanation:
      'When a complaint is legitimate, the HEARD framework provides the optimal response. Hear the full concern without interrupting. Empathise genuinely — the client has been inconvenienced. Apologise for the experience (not necessarily admitting fault, but acknowledging the inconvenience). Resolve the defect promptly and to a high standard. Do follow up within a few days to confirm satisfaction. This approach often turns a dissatisfied client into your strongest advocate.',
    section: 'Resolving Client Disputes',
    difficulty: 'advanced' as const,
    topic: 'HEARD Framework',
    category: 'Resolving Client Disputes',
  },
  {
    id: 115,
    question:
      'An electrician quotes £3,200 for a kitchen rewire. During the work, they discover the existing ring final circuit is in far worse condition than visible during the survey, requiring an additional £800 of work. The client says "A quote is a quote — you should honour it." Who is correct?',
    options: [
      'The client is correct — a quote is binding in all circumstances and must be honoured in full',
      'The electrician is correct — any quote can be increased once work has started',
      'Neither is correct — the dispute can only be settled by a third-party adjudicator',
      'Both have valid positions — a quote is generally fixed, but genuinely unforeseeable work can be a valid variation if agreed first',
    ],
    correctAnswer: 3,
    explanation:
      'Both have valid positions. A quote is generally a fixed price and the electrician bears the risk of underestimating. However, genuinely unforeseeable conditions (work hidden behind walls that could not be surveyed) can constitute a valid variation to the contract. The key is documentation: the electrician should stop work on the additional element, show the client the unforeseen condition, explain the additional work needed, and agree the variation in writing before proceeding. Future quotes should include caveats about hidden conditions.',
    section: 'Resolving Client Disputes',
    difficulty: 'advanced' as const,
    topic: 'Quote vs Estimate',
    category: 'Resolving Client Disputes',
  },
  {
    id: 116,
    question:
      'How can the Late Payment of Commercial Debts Act 1998 be used strategically without damaging commercial relationships?',
    options: [
      'Put the entitlement in your terms, reference it factually in reminders, and only formally claim it after the letter before action',
      'Apply the maximum interest to every invoice from day one so clients always pay early',
      'Threaten to apply statutory interest in your very first reminder to make the point firmly',
      'Waive the statutory interest entirely to keep the commercial relationship as warm as possible',
    ],
    correctAnswer: 0,
    explanation:
      'The strategic approach is to include statutory interest entitlement in your standard terms (so clients are aware from the outset), reference it factually in payment reminders ("Please note that under the Late Payment Act, statutory interest applies to overdue invoices"), and only formally claim the interest after the letter before action stage. This approach uses the Act as a deterrent and motivator for timely payment without making every late payment feel like a personal attack.',
    section: 'Resolving Client Disputes',
    difficulty: 'advanced' as const,
    topic: 'Late Payment Act',
    category: 'Resolving Client Disputes',
  },
  {
    id: 117,
    question:
      'A client makes an unreasonable complaint and threatens to leave a negative online review unless the electrician provides free additional work. How should this be handled?',
    options: [
      "Give in to the demand quietly so that no negative review is ever posted",
      "Acknowledge the concern, explain what was agreed and delivered, hold professional boundaries, and document the threat",
      "Threaten the client with legal action to deter them from leaving any review at all",
      "Ignore the client completely and refuse to respond to any further messages",
    ],
    correctAnswer: 1,
    explanation:
      'This situation requires a balance of empathy and firm boundaries. Acknowledge the concern, calmly explain what was agreed and delivered (with documentation), and do not capitulate to the implicit blackmail. If the client leaves a genuine review about their experience, respond professionally and factually. If they post demonstrably false statements, that may constitute defamation. Document the threat in case it is needed later. Rewarding threats teaches clients that bullying works.',
    section: 'Resolving Client Disputes',
    difficulty: 'advanced' as const,
    topic: 'Professional Boundaries',
    category: 'Resolving Client Disputes',
  },
  {
    id: 118,
    question:
      'What is the key difference between applying the HEARD framework to a legitimate complaint versus an unreasonable one?',
    options: [
      'For legitimate complaints you skip the Hear step; for unreasonable complaints you carry out all five steps in order',
      'For legitimate complaints you only Apologise and Resolve; for unreasonable complaints you add the Hear and Empathise steps',
      'For legitimate complaints all five steps apply fully; for unreasonable ones you still Hear and Empathise but adapt the rest to hold boundaries',
      'For legitimate complaints you Hear and Empathise only; for unreasonable complaints you apply every step in full',
    ],
    correctAnswer: 2,
    explanation:
      'The HEARD framework is adapted for unreasonable complaints. You still Hear (listen fully — sometimes what seems unreasonable has a valid element) and Empathise (acknowledge the feeling, even if you disagree with the claim). However, the Apologise step becomes "I\'m sorry you feel this way" rather than "I\'m sorry we got it wrong." The Resolve step involves explaining what was agreed and delivered. The Do follow up step confirms the boundary. This maintains professionalism without capitulating.',
    section: 'Resolving Client Disputes',
    difficulty: 'advanced' as const,
    topic: 'HEARD Framework',
    category: 'Resolving Client Disputes',
  },
  {
    id: 119,
    question:
      "An electrician completed work six months ago. The client now reports a fault and demands free repair, claiming it is a warranty issue. The fault is caused by water damage from a leaking pipe above. What is the electrician's position?",
    options: [
      'The electrician should refuse to attend, as a six-month-old job is well outside any warranty period',
      'The electrician should carry out the repair free of charge to protect their reputation, regardless of the cause',
      'The electrician should accept liability and refund the original work to avoid a dispute over warranty terms',
      'Investigate, document the water damage as an external cause rather than workmanship, and offer the repair as paid work',
    ],
    correctAnswer: 3,
    explanation:
      "The professional approach is to attend and investigate (demonstrating good faith), identify and document the actual cause (water damage from plumbing, not electrical workmanship), explain this clearly to the client with evidence, and offer to repair the electrical damage as paid work once the plumbing issue is resolved. This protects the electrician's reputation for standing behind their work while fairly declining responsibility for damage caused by others.",
    section: 'Resolving Client Disputes',
    difficulty: 'intermediate' as const,
    topic: 'Taking Responsibility Without Liability',
    category: 'Resolving Client Disputes',
  },
  {
    id: 120,
    question:
      'What are the benefits of providing proactive updates at the end of each day during a domestic rewire?',
    options: [
      "It keeps the client informed, builds trust, prevents anxiety-driven complaints, and creates a record of communication",
      "It allows you to charge the client for the time spent giving the update",
      "It transfers responsibility for any delays from you onto the client",
      "It removes the need for a written contract or any other documentation",
    ],
    correctAnswer: 0,
    explanation:
      "End-of-day updates during a domestic rewire serve multiple purposes: they keep the client informed about what was done today, set expectations for tomorrow's work and disruption, build trust through transparency, prevent the anxiety-driven complaints that arise when clients feel left in the dark, and create a record of communication that can be referenced if disputes arise later. A simple five-minute conversation or text message can prevent hours of conflict resolution.",
    section: 'Resolving Client Disputes',
    difficulty: 'intermediate' as const,
    topic: 'Communication Frequency',
    category: 'Resolving Client Disputes',
  },

  // =====================================================
  // Category 4: Site & Workplace Conflicts (id 121-160)
  // 16 basic, 16 intermediate, 8 advanced
  // =====================================================
  {
    id: 121,
    question:
      'On a multi-trade construction site, what is the most common cause of disputes between electricians and other trades?',
    options: [
      'Disagreements over who is responsible for cleaning shared welfare facilities',
      'Damaged containment or cables caused by other trades working in the same area',
      'Differences in pay rates between the various trades on the project',
      'Personal disputes carried over from previous projects between individuals',
    ],
    correctAnswer: 1,
    explanation:
      'The most common cause of disputes between electricians and other trades on site is damage to containment, cables, or completed electrical work caused by other trades working in the same area. Plumbers drilling through cable routes, plasterers filling conduit openings, and floor-layers damaging floor boxes are all frequent sources of conflict. Preventing these issues requires coordination, clear marking, and proactive communication with other trades.',
    section: 'Site & Workplace Conflicts',
    difficulty: 'basic' as const,
    topic: 'Multi-Trade Coordination',
    category: 'Site & Workplace Conflicts',
  },
  {
    id: 122,
    question:
      'When an electrician discovers that a plumber has drilled through their cable containment, what should they do first?',
    options: [
      'Report the plumber to the site manager before doing anything else',
      'Repair the containment immediately and add the cost to your next invoice',
      'Photograph and date the damage, then raise it directly with the plumber calmly',
      'Confront the plumber loudly so that other trades witness the complaint',
    ],
    correctAnswer: 2,
    explanation:
      'The first step is to photograph and document the damage with date and time stamps. This creates an evidence trail. The next step is to raise the issue directly with the plumber calmly and professionally — a direct conversation before escalation is the most effective approach. Most inter-trade damage is accidental rather than malicious, and a direct conversation often resolves the matter quickly. Escalating without speaking to the person first damages working relationships unnecessarily.',
    section: 'Site & Workplace Conflicts',
    difficulty: 'basic' as const,
    topic: 'Damaged Work',
    category: 'Site & Workplace Conflicts',
  },
  {
    id: 123,
    question: 'What is the best approach to preventing access disputes on a multi-trade site?',
    options: [
      'Insist that your trade is always given priority access to shared areas',
      'Refuse to start work until every other trade has finished in the area',
      'Leave coordination entirely to the principal contractor and raise issues only when they occur',
      'Attend coordination meetings, agree sequencing early, and talk directly to other trades about shared areas',
    ],
    correctAnswer: 3,
    explanation:
      'Preventing access disputes requires proactive coordination. Attending progress and coordination meetings, agreeing the sequencing of trades in shared areas, and communicating directly with other trades about who needs access when are all essential. This collaborative approach prevents the frustration that arises when two trades turn up to work in the same area simultaneously and neither can proceed.',
    section: 'Site & Workplace Conflicts',
    difficulty: 'basic' as const,
    topic: 'Access Disputes',
    category: 'Site & Workplace Conflicts',
  },
  {
    id: 124,
    question:
      'Under CDM 2015, who has the primary duty to coordinate the work of different trades on a construction site?',
    options: [
      'The principal contractor',
      'The client directly',
      'Each individual trade contractor',
      'The architect or designer',
    ],
    correctAnswer: 0,
    explanation:
      'Under the Construction (Design and Management) Regulations 2015, the principal contractor has the primary duty to plan, manage, and coordinate health and safety during the construction phase, including the coordination of different trades. Regulation 13 specifically requires the principal contractor to organise cooperation between contractors. While individual trades should cooperate, the principal contractor is responsible for the overall coordination framework.',
    section: 'Site & Workplace Conflicts',
    difficulty: 'basic' as const,
    topic: 'CDM 2015 Coordination',
    category: 'Site & Workplace Conflicts',
  },
  {
    id: 125,
    question: 'Why is photographing damaged work important before raising a dispute?',
    options: [
      'It satisfies a contractual requirement to log all site activity in writing',
      'It creates timestamped evidence for if the dispute escalates, avoiding he-said-she-said',
      'It allows you to claim the cost of the photographs as an expense',
      'It is required by your insurer before any repair can be carried out',
    ],
    correctAnswer: 1,
    explanation:
      'Photographing damage creates objective, timestamped evidence of the condition of the work. This prevents disputes from becoming he-said-she-said arguments about what happened and when. If the matter escalates to the principal contractor or beyond, photographs provide clear evidence. Modern smartphones automatically record date, time, and location metadata, making them an effective documentation tool on site.',
    section: 'Site & Workplace Conflicts',
    difficulty: 'basic' as const,
    topic: 'Documenting Damage',
    category: 'Site & Workplace Conflicts',
  },
  {
    id: 126,
    question: 'What is a "back-charge" in construction?',
    options: [
      'A payment made in advance of work to secure a subcontractor\'s services',
      'A discount applied to an invoice for early settlement by the client',
      'A charge from one contractor to another for rectifying damage or work the other party was responsible for',
      'A deduction made from a worker\'s wages for damaged company tools',
    ],
    correctAnswer: 2,
    explanation:
      'A back-charge is a cost deduction or charge from one contractor to another (or from the main contractor to a subcontractor) for rectifying damage caused by the other party or for completing work that the other party failed to do. Back-charges are a frequent source of commercial disputes. They should be documented, evidenced with photographs, and ideally agreed before rectification work begins.',
    section: 'Site & Workplace Conflicts',
    difficulty: 'basic' as const,
    topic: 'Back-Charges',
    category: 'Site & Workplace Conflicts',
  },
  {
    id: 127,
    question:
      'What does the Construction Act 1996 ban regarding payment terms in construction contracts?',
    options: [
      'Interim payments being made more frequently than every 30 days',
      'Retention sums being held for longer than the defects liability period',
      'Pay-less notices being served after the final date for payment',
      '"Pay when paid" clauses, which make paying a subcontractor conditional on the client paying first',
    ],
    correctAnswer: 3,
    explanation:
      'The Housing Grants, Construction and Regeneration Act 1996 (the Construction Act) bans "pay when paid" clauses. These clauses made payment to a subcontractor conditional on the main contractor receiving payment from the client, meaning the subcontractor bore the risk of the client not paying. The ban means a main contractor cannot withhold payment simply because they have not been paid by their own client. This was a landmark protection for subcontractors.',
    section: 'Site & Workplace Conflicts',
    difficulty: 'basic' as const,
    topic: 'Ban on Pay When Paid',
    category: 'Site & Workplace Conflicts',
  },
  {
    id: 128,
    question:
      'Under the Construction Act 1996, what is the maximum interim payment period for construction contracts?',
    options: [
      '30 days',
      '14 days',
      '60 days',
      '90 days',
    ],
    correctAnswer: 0,
    explanation:
      'The Construction Act 1996 (as amended by the Local Democracy, Economic Development and Construction Act 2009) provides that interim payments must be made at intervals of no more than 30 days. If the contract does not specify a payment period, the Scheme for Construction Contracts 1998 implies a 28-day payment cycle. This ensures that subcontractors, including electrical contractors, receive regular cash flow rather than waiting until the end of a project.',
    section: 'Site & Workplace Conflicts',
    difficulty: 'basic' as const,
    topic: 'Construction Act Payment Terms',
    category: 'Site & Workplace Conflicts',
  },
  {
    id: 129,
    question: 'What is the SBI feedback model used for in team management?',
    options: [
      'A risk assessment method for identifying site hazards before work begins',
      'A structured way to give clear, factual feedback on a specific behaviour',
      'A scheduling tool for sequencing the work of different trades on site',
      'A disciplinary procedure for dealing with persistent poor performance',
    ],
    correctAnswer: 1,
    explanation:
      'The SBI model stands for Situation (describe the specific context), Behaviour (describe the observable behaviour without judgement), and Impact (explain the effect the behaviour had). For example: "During yesterday\'s first fix (Situation), you left cable offcuts on the floor in the corridor (Behaviour), which created a trip hazard that the site manager flagged in his inspection (Impact)." This structure keeps feedback factual and focused rather than personal.',
    section: 'Site & Workplace Conflicts',
    difficulty: 'basic' as const,
    topic: 'SBI Feedback Model',
    category: 'Site & Workplace Conflicts',
  },
  {
    id: 130,
    question:
      'What is the "feedback sandwich" and why is it now considered less effective than direct feedback?',
    options: [
      'A questioning technique that draws out the other person\'s underlying concerns',
      'A method of giving feedback only in writing so there is a clear record',
      'Placing negative feedback between two positives, now seen as insincere and as training people to brace for criticism',
      'A structured format for documenting a workplace grievance',
    ],
    correctAnswer: 2,
    explanation:
      'The feedback sandwich places negative feedback between two positive comments (positive-negative-positive). While well-intentioned, it is now considered less effective because it can feel manipulative or insincere, it dilutes the core message, and it trains people to brace for criticism every time they hear a compliment. Direct feedback using the SBI model is preferred because it is honest, specific, and treats the recipient as an adult capable of hearing constructive criticism.',
    section: 'Site & Workplace Conflicts',
    difficulty: 'basic' as const,
    topic: 'Direct Feedback',
    category: 'Site & Workplace Conflicts',
  },
  {
    id: 131,
    question:
      'Under HSWA 1974, what duty do employees have regarding cooperation on a construction site?',
    options: [
      'A duty to report any unsafe act by another trade directly to the HSE',
      'A duty to complete a daily risk assessment before starting work',
      'A duty to provide their own personal protective equipment on site',
      'A duty to cooperate with their employer and others so far as needed for health and safety compliance',
    ],
    correctAnswer: 3,
    explanation:
      'Section 7(b) of the Health and Safety at Work etc. Act 1974 places a duty on employees to cooperate with their employer and any other person so far as is necessary to enable the employer to comply with health and safety duties. This extends to cooperating with other trades on site. An electrician who refuses to cooperate with other trades in a way that creates safety risks could be in breach of this statutory duty.',
    section: 'Site & Workplace Conflicts',
    difficulty: 'basic' as const,
    topic: 'HSWA 1974 Duty to Cooperate',
    category: 'Site & Workplace Conflicts',
  },
  {
    id: 132,
    question: 'What is "retention" in a construction contract?',
    options: [
      'A percentage of each payment withheld by the main contractor until defects are resolved',
      'A bonus paid to a subcontractor for completing work ahead of programme',
      'A fee charged by the main contractor for providing welfare facilities',
      'A deposit paid by the subcontractor before being allowed on site',
    ],
    correctAnswer: 0,
    explanation:
      'Retention is a percentage (typically 3-5%) of each interim payment that is withheld by the main contractor. Half is usually released at practical completion and the remaining half at the end of the defects liability period. While intended to ensure defects are fixed, retention is a frequent source of dispute because it reduces cash flow for subcontractors and is sometimes held for longer than contractually agreed.',
    section: 'Site & Workplace Conflicts',
    difficulty: 'basic' as const,
    topic: 'Retention',
    category: 'Site & Workplace Conflicts',
  },
  {
    id: 133,
    question:
      'What is the recommended first step when resolving a dispute with another trade on site?',
    options: [
      'Submit a formal written complaint to the principal contractor immediately',
      'Have a direct, calm conversation with the individual or their supervisor before escalating',
      'Raise the matter at the next site progress meeting in front of all trades',
      'Refer the dispute straight to adjudication under the contract',
    ],
    correctAnswer: 1,
    explanation:
      'The recommended first step is always a direct, calm conversation with the individual or their supervisor. Most site disputes are the result of miscommunication, oversight, or genuine accident rather than malice. A direct conversation resolves the majority of issues quickly and preserves working relationships. Escalating without attempting direct resolution first is seen as unprofessional and can damage your reputation on site.',
    section: 'Site & Workplace Conflicts',
    difficulty: 'basic' as const,
    topic: 'Direct Conversation Before Escalation',
    category: 'Site & Workplace Conflicts',
  },
  {
    id: 134,
    question: 'What is the JIB grievance procedure for?',
    options: [
      'Setting the agreed wage rates and grading structure for electrical workers',
      'Providing a fund to compensate electricians for unpaid invoices',
      'Providing a structured process for resolving grievances between electrical workers and their employers',
      'Issuing the qualifications required to work in the electrical industry',
    ],
    correctAnswer: 2,
    explanation:
      'The JIB (Joint Industry Board for the Electrical Contracting Industry) grievance procedure provides a structured process for resolving workplace grievances between electrical workers and their employers. It sets out the stages of raising a complaint, the timescales for responses, and the escalation path if resolution is not reached at the initial stage. Following the JIB procedure ensures grievances are handled fairly and consistently within the electrical industry.',
    section: 'Site & Workplace Conflicts',
    difficulty: 'basic' as const,
    topic: 'JIB Grievance Procedures',
    category: 'Site & Workplace Conflicts',
  },
  {
    id: 135,
    question: 'What constitutes bullying in the workplace according to ACAS guidance?',
    options: [
      'Any firm instruction or honest criticism that a worker finds unwelcome',
      'A single isolated disagreement between two workers of equal standing',
      'Any reasonable request about the quality or pace of someone\'s work',
      'Offensive, intimidating, or malicious behaviour, or an abuse of power, that undermines or humiliates someone',
    ],
    correctAnswer: 3,
    explanation:
      'ACAS defines bullying as offensive, intimidating, malicious, or insulting behaviour, or an abuse or misuse of power through means that undermine, humiliate, denigrate, or injure the recipient. In a construction context, this could include persistent unreasonable criticism, deliberate isolation, withholding information needed for work, or physical intimidation. It is distinct from firm management, honest feedback, or reasonable requests about work quality.',
    section: 'Site & Workplace Conflicts',
    difficulty: 'basic' as const,
    topic: 'Bullying and Harassment',
    category: 'Site & Workplace Conflicts',
  },
  {
    id: 136,
    question:
      'What is the "power imbalance" between a main contractor and a subcontractor, and why does it matter for conflict resolution?',
    options: [
      'The main contractor controls access, programme, payment, and future work, making subcontractors reluctant to raise disputes',
      'The subcontractor can dictate the programme because they hold specialist skills',
      'Both parties have exactly equal bargaining power under the contract',
      'The client controls all decisions, leaving the main contractor powerless',
    ],
    correctAnswer: 0,
    explanation:
      "The power imbalance refers to the main contractor's control over access to site, programme scheduling, payment processing, and future work opportunities. This imbalance can make subcontractors reluctant to raise legitimate disputes — about damaged work, payment delays, or programme changes — for fear of being labelled difficult or losing future contracts. Understanding this dynamic is essential for electricians to advocate for their rights while managing the commercial relationship.",
    section: 'Site & Workplace Conflicts',
    difficulty: 'basic' as const,
    topic: 'Power Imbalance',
    category: 'Site & Workplace Conflicts',
  },
  {
    id: 137,
    question: 'Under the Construction Act 1996, what is the right to adjudication?',
    options: [
      'The right to take any payment dispute straight to the Small Claims Court',
      'The right to refer a contract dispute to an independent adjudicator for a binding decision within 28 days',
      'The right to walk off site immediately if a single invoice is late',
      'The right to have all disputes decided by the principal contractor',
    ],
    correctAnswer: 1,
    explanation:
      "The Construction Act 1996 gives any party to a construction contract the right to refer a dispute to adjudication at any time. The adjudicator must reach a decision within 28 days of referral (extendable by 14 days with the referring party's consent). The decision is binding on an interim basis, meaning it must be complied with immediately, although either party can later challenge it in court or arbitration. This provides a fast, relatively inexpensive dispute resolution mechanism.",
    section: 'Site & Workplace Conflicts',
    difficulty: 'intermediate' as const,
    topic: 'Right to Adjudication',
    category: 'Site & Workplace Conflicts',
  },
  {
    id: 138,
    question:
      'What is the typical timeline for a construction adjudication from referral to decision?',
    options: [
      '7 days, with no possibility of any extension',
      '14 days, extendable to 28 days by agreement of both parties',
      "28 days, extendable to 42 days with the referring party's consent",
      '90 days, the same period as a Small Claims Court hearing',
    ],
    correctAnswer: 2,
    explanation:
      'The standard adjudication timeline is 28 days from the date of referral. This can be extended by up to 14 days (to 42 days total) with the consent of the referring party. The adjudicator can also request an extension by agreement of both parties. This tight timeline is a key feature of the Construction Act — it forces rapid resolution and prevents disputes from dragging on for months or years, which was common before the Act.',
    section: 'Site & Workplace Conflicts',
    difficulty: 'intermediate' as const,
    topic: '28-Day Adjudication Timeline',
    category: 'Site & Workplace Conflicts',
  },
  {
    id: 139,
    question: 'What is a "payment notice" under the Construction Act 1996 (as amended)?',
    options: [
      'A notice the payee must serve before starting any work on site',
      'A reminder issued automatically when a payment becomes overdue',
      'A statement of the retention sum to be released at practical completion',
      'A notice the payer issues, stating the sum they consider due and how it is calculated',
    ],
    correctAnswer: 3,
    explanation:
      "A payment notice is a formal notice issued by the payer within a prescribed period after each payment due date. It must specify the sum the payer considers due at the payment due date and the basis on which that sum is calculated. The 2009 amendments strengthened these provisions. If the payer fails to issue a payment notice, the payee's own application for payment (or default payment notice) becomes the notified sum and must be paid in full.",
    section: 'Site & Workplace Conflicts',
    difficulty: 'intermediate' as const,
    topic: 'Payment Notices',
    category: 'Site & Workplace Conflicts',
  },
  {
    id: 140,
    question: 'What is a "pay-less notice" and when must it be served?',
    options: [
      'A notice the payer serves before the final date for payment, intending to pay less than the notified sum and why',
      'A notice the payee serves to confirm the sum they expect to be paid',
      'A notice that automatically increases the payment if work is delayed',
      'A notice that suspends the contract until a dispute is resolved',
    ],
    correctAnswer: 0,
    explanation:
      "A pay-less notice is served by the payer when they intend to pay less than the notified sum (the amount stated in the payment notice or the payee's application). It must be served before the prescribed deadline (typically no later than 7 days before the final date for payment) and must state the sum the payer considers due and the basis for that calculation. If no valid pay-less notice is served, the payer must pay the full notified sum.",
    section: 'Site & Workplace Conflicts',
    difficulty: 'intermediate' as const,
    topic: 'Pay-Less Notices',
    category: 'Site & Workplace Conflicts',
  },
  {
    id: 141,
    question:
      'Under the Construction Act 1996, what right does a contractor have if they are not paid by the final date for payment?',
    options: [
      'The right to charge a fixed penalty for every day the payment is late',
      "The right to suspend performance, provided they give at least 7 days' written notice",
      'The right to remove their installed materials from site until paid',
      'The right to terminate the contract without giving any notice',
    ],
    correctAnswer: 1,
    explanation:
      "Section 112 of the Construction Act 1996 gives a contractor the right to suspend performance if the sum due under the contract is not paid by the final date for payment. The contractor must give at least 7 days' written notice of their intention to suspend, specifying the ground(s) for suspension. This is a powerful right that protects subcontractors from being forced to continue working without payment, but it must be exercised correctly to avoid being in breach of contract yourself.",
    section: 'Site & Workplace Conflicts',
    difficulty: 'intermediate' as const,
    topic: 'Right to Suspend Performance',
    category: 'Site & Workplace Conflicts',
  },
  {
    id: 142,
    question: 'What is the Scheme for Construction Contracts 1998?',
    options: [
      'A government grant scheme that funds small construction subcontractors',
      'A voluntary code of practice for fair payment in the construction sector',
      'A statutory fallback that implies payment and adjudication terms into non-compliant construction contracts',
      'An insurance scheme that pays subcontractors if a main contractor becomes insolvent',
    ],
    correctAnswer: 2,
    explanation:
      "The Scheme for Construction Contracts 1998 is a statutory instrument that implies terms into construction contracts where those contracts do not already comply with the requirements of the Construction Act 1996. If a construction contract does not contain adequate provisions for payment (interim payment dates, payment notices, etc.) or adjudication, the Scheme's provisions are implied automatically. This protects subcontractors even when their written contracts are inadequate.",
    section: 'Site & Workplace Conflicts',
    difficulty: 'intermediate' as const,
    topic: 'Scheme for Construction Contracts',
    category: 'Site & Workplace Conflicts',
  },
  {
    id: 143,
    question: 'What is the typical cost range for a construction adjudication?',
    options: [
      '£50,000-£100,000',
      'Free of charge',
      '£200-£500',
      '£2,000-£8,000',
    ],
    correctAnswer: 3,
    explanation:
      "Construction adjudication typically costs between £2,000 and £8,000, covering the adjudicator's fees and any legal advice. This is significantly cheaper than court proceedings or arbitration, which is one of the reasons adjudication was introduced by the Construction Act. For small electrical subcontractors, however, even this cost can be significant, so it is important to weigh the value of the dispute against the cost of pursuing it through adjudication.",
    section: 'Site & Workplace Conflicts',
    difficulty: 'intermediate' as const,
    topic: 'Adjudication Costs',
    category: 'Site & Workplace Conflicts',
  },
  {
    id: 144,
    question: 'What is the practical escalation ladder for disputes on a construction site?',
    options: [
      'Direct conversation with the individual, then their supervisor, then site manager, then formal written complaint, then contractual dispute mechanism (adjudication)',
      'Adjudication, then mediation, then a direct conversation, then a written complaint',
      'A written complaint, then a direct conversation, then the site manager, then adjudication',
      'The site manager, then adjudication, then a direct conversation, then a written complaint',
    ],
    correctAnswer: 0,
    explanation:
      'The practical escalation ladder starts with a direct conversation with the individual involved, escalating to their supervisor if unresolved, then to the site manager or principal contractor, then to a formal written complaint through the contractual framework, and finally to the contractual dispute mechanism (typically adjudication under the Construction Act). Each step gives the other party the opportunity to resolve the matter, and the documentation trail at each stage supports the next level of escalation if needed.',
    section: 'Site & Workplace Conflicts',
    difficulty: 'intermediate' as const,
    topic: 'Practical Escalation Ladder',
    category: 'Site & Workplace Conflicts',
  },
  {
    id: 145,
    question:
      "An electrician's cable containment has been damaged by a dry-liner. What documentation should be created?",
    options: [
      'A verbal report to the site manager and a note in your own diary only',
      'Timestamped photographs, a written description of the damage, the repair cost, and a record of the conversation held',
      'A single photograph of the area and a quick word with the dry-liner',
      'An email to the client explaining that another trade caused a delay',
    ],
    correctAnswer: 1,
    explanation:
      'Proper documentation of site damage includes timestamped photographs showing the damage clearly, a written description of what was damaged, how it appears to have happened, and when it was discovered. The estimated cost of repair (materials and labour) should be recorded, along with a note of the conversation held with the person responsible or their supervisor. This documentation supports any back-charge and protects the electrician if the matter escalates.',
    section: 'Site & Workplace Conflicts',
    difficulty: 'intermediate' as const,
    topic: 'Documenting Damage',
    category: 'Site & Workplace Conflicts',
  },
  {
    id: 146,
    question:
      'How should an electrician handle a situation where the main contractor changes the programme without notice, affecting the electrical installation sequence?',
    options: [
      'Accept the change silently to avoid being seen as difficult by the main contractor',
      'Stop all work immediately until the original programme is reinstated',
      'Document the change and its impact, notify the main contractor in writing, and follow up with a formal variation',
      'Issue a pay-less notice to the main contractor for the lost time',
    ],
    correctAnswer: 2,
    explanation:
      'Programme changes can have significant cost and time implications for electrical subcontractors. The correct approach is to document the change (what changed, when, who instructed it), assess and notify the main contractor in writing of the impact (additional costs, delays, out-of-sequence working), and follow up with a formal variation request or claim under the contract. Accepting changes silently sets a precedent and makes later claims very difficult to pursue.',
    section: 'Site & Workplace Conflicts',
    difficulty: 'intermediate' as const,
    topic: 'Programme Changes',
    category: 'Site & Workplace Conflicts',
  },
  {
    id: 147,
    question:
      'What is the role of a mediator in resolving team conflicts between electricians on the same project?',
    options: [
      'To decide which party is at fault and impose a binding ruling on them',
      'To represent one party\'s interests and argue their case for them',
      'To investigate the dispute and report the findings to the principal contractor',
      "To facilitate a structured conversation that helps the parties reach a mutually acceptable resolution",
    ],
    correctAnswer: 3,
    explanation:
      "A mediator facilitates a structured conversation between the parties in conflict. Unlike an adjudicator or judge, the mediator does not decide who is right or wrong. Instead, they help each party understand the other's perspective, identify shared interests, and work towards a mutually acceptable resolution. In team conflicts between electricians, a senior colleague or site manager can often fulfil this role informally, using active listening and impartial questioning.",
    section: 'Site & Workplace Conflicts',
    difficulty: 'intermediate' as const,
    topic: 'Mediator Role',
    category: 'Site & Workplace Conflicts',
  },
  {
    id: 148,
    question:
      'When giving feedback to an apprentice about a safety issue, which approach is most effective?',
    options: [
      'Use the SBI model privately: state the situation, behaviour, and safety impact, then agree corrective action',
      'Raise the issue at the next toolbox talk so the whole team can learn from it',
      'Wait until the apprentice\'s formal review to discuss the safety concern',
      'Correct the apprentice firmly in front of the team to reinforce the point',
    ],
    correctAnswer: 0,
    explanation:
      'Safety feedback should be given promptly using the SBI model in a private or semi-private setting. Public humiliation damages the apprentice\'s confidence and your relationship, while delaying feedback until a formal review leaves a safety risk unaddressed. The SBI model keeps it factual: "During today\'s second fix (Situation), I noticed you tested a circuit without isolating it first (Behaviour), which could have resulted in a serious electric shock (Impact)." Then agree corrective action together.',
    section: 'Site & Workplace Conflicts',
    difficulty: 'intermediate' as const,
    topic: 'SBI Feedback Model',
    category: 'Site & Workplace Conflicts',
  },
  {
    id: 149,
    question:
      'Under CDM 2015, what must the principal contractor do if two trades are in dispute about the sequencing of work in a shared area?',
    options: [
      'Leave the trades to resolve the sequencing dispute between themselves',
      'Coordinate and plan the sequence so all trades can work safely and efficiently',
      'Instruct both trades to stop work until the client makes a decision',
      'Allow whichever trade arrived first to take priority over the area',
    ],
    correctAnswer: 1,
    explanation:
      'Under CDM 2015, the principal contractor is responsible for planning, managing, and coordinating the construction phase, including managing conflicts between trades. Regulation 13(2) requires the principal contractor to organise cooperation between contractors. When trades are in dispute about sequencing, the principal contractor must step in, assess the requirements, plan the sequence that allows safe and efficient working, and communicate the decision to all parties.',
    section: 'Site & Workplace Conflicts',
    difficulty: 'intermediate' as const,
    topic: 'CDM 2015 Coordination',
    category: 'Site & Workplace Conflicts',
  },
  {
    id: 150,
    question:
      'How does the JIB National Working Rules apply to resolving disputes about working conditions on site?',
    options: [
      'Setting out the disciplinary steps for dismissing an electrical worker',
      'Providing a fund to cover an electrician\'s legal costs in a dispute',
      'They set agreed terms on wages, hours, overtime, and travel, giving a framework for resolving disputes about these',
      'Defining the technical standards to which electrical work must be carried out',
    ],
    correctAnswer: 2,
    explanation:
      'The JIB National Working Rules are collectively agreed terms and conditions for the electrical contracting industry. They cover wages and grading, working hours and overtime, travel time and fares, lodging allowances, and other conditions. When disputes arise about these matters, the National Working Rules provide an authoritative reference point. They are incorporated into JIB member employment contracts, giving them contractual force and providing a clear basis for resolving disagreements.',
    section: 'Site & Workplace Conflicts',
    difficulty: 'intermediate' as const,
    topic: 'JIB National Working Rules',
    category: 'Site & Workplace Conflicts',
  },
  {
    id: 151,
    question:
      'What should an electrician do if they witness bullying of an apprentice by a colleague on site?',
    options: [
      'Ignore the situation, as it is a matter for the apprentice\'s employer alone',
      'Confront the colleague aggressively in front of the rest of the team',
      'Wait until the next site meeting to raise it as a general concern',
      'Stop the behaviour if safe to do so, support the apprentice, and report it through the proper channels',
    ],
    correctAnswer: 3,
    explanation:
      "Under HSWA 1974, all employees have a duty to cooperate in maintaining a safe working environment, which includes psychological safety. If an electrician witnesses bullying, they should intervene to stop the immediate behaviour (if safe to do so), offer support to the apprentice, and report the incident through the employer's grievance procedure or welfare channels. ACAS guidance is clear that bystanders have a responsibility to act. Ignoring bullying allows it to continue and normalises the behaviour.",
    section: 'Site & Workplace Conflicts',
    difficulty: 'intermediate' as const,
    topic: 'Bullying and Harassment',
    category: 'Site & Workplace Conflicts',
  },
  {
    id: 152,
    question:
      'What are the key elements that must be included in a valid notice to suspend performance under the Construction Act 1996?',
    options: [
      'It must be in writing, state the ground for suspension (non-payment), and allow at least 7 days before it takes effect',
      'The notice must be approved by the principal contractor before it can take effect',
      'The notice must allow at least 28 days before suspension takes effect',
      'The notice can be given verbally provided it is later confirmed in writing',
    ],
    correctAnswer: 0,
    explanation:
      'A valid notice to suspend performance under Section 112 of the Construction Act must be in writing, must specify the ground(s) for suspension (that a sum due under the contract has not been paid by the final date for payment and no effective notice to withhold has been given), and must allow at least 7 days to pass before suspension takes effect. Getting the notice wrong can invalidate the suspension and potentially put the electrician in breach of contract, so precision is essential.',
    section: 'Site & Workplace Conflicts',
    difficulty: 'advanced' as const,
    topic: 'Right to Suspend Performance',
    category: 'Site & Workplace Conflicts',
  },
  {
    id: 153,
    question:
      "An electrical subcontractor has not received payment for 45 days despite the contract specifying 30-day payment terms. The main contractor says they have not been paid by the client. Does this affect the subcontractor's right to payment?",
    options: [
      'Yes — the main contractor can lawfully withhold payment until the client pays them',
      'No — "pay when paid" clauses are banned by the Construction Act 1996, so the subcontractor must still be paid',
      'Yes — but only if the contract was for less than £10,000 in value',
      'Partly — the main contractor may withhold half the sum until they are paid',
    ],
    correctAnswer: 1,
    explanation:
      'The Construction Act 1996 bans "pay when paid" clauses (except in cases of upstream insolvency). The main contractor\'s obligation to pay the subcontractor is independent of whether the client has paid the main contractor. This was one of the most significant reforms introduced by the Construction Act, ending a practice that had caused severe cash flow problems for subcontractors throughout the construction industry. The subcontractor can pursue their payment rights including adjudication and suspension.',
    section: 'Site & Workplace Conflicts',
    difficulty: 'advanced' as const,
    topic: 'Ban on Pay When Paid',
    category: 'Site & Workplace Conflicts',
  },
  {
    id: 154,
    question:
      "A main contractor issues a back-charge to an electrical subcontractor for £3,500, claiming the electrician's containment was in the wrong position and had to be moved by another trade. The electrician believes they installed to the agreed drawings. How should they respond?",
    options: [
      'Accept the back-charge and deduct the cost from their next application for payment',
      'Refuse to discuss the matter and simply leave the back-charge unpaid',
      'Gather the drawings and photographs, dispute the back-charge formally in writing, and object under the contract terms',
      'Move the containment again free of charge to keep the relationship intact',
    ],
    correctAnswer: 2,
    explanation:
      "The correct response is to gather all supporting evidence — the original drawings the electrician worked from, any site instructions or RFIs, photographs of the installation, and any coordination drawings. Then respond formally in writing, disputing the back-charge with this evidence. If the containment was installed to the agreed drawings and the drawing subsequently changed, the cost of moving it should be a variation, not a back-charge. Formal documentation protects the electrician's position if the dispute escalates to adjudication.",
    section: 'Site & Workplace Conflicts',
    difficulty: 'advanced' as const,
    topic: 'Back-Charges',
    category: 'Site & Workplace Conflicts',
  },
  {
    id: 155,
    question:
      'An electrician wants to refer a payment dispute worth £6,000 to adjudication. What practical steps must they take to initiate the process?',
    options: [
      'Issue a Small Claims Court application and wait for a hearing date to be set',
      'Send a final written reminder and allow 30 days before taking any further action',
      'Suspend all work on site immediately and wait for the main contractor to respond',
      'Issue a notice of adjudication identifying the dispute, then refer it to the nominated adjudicator within 7 days with evidence',
    ],
    correctAnswer: 3,
    explanation:
      'To initiate adjudication, the referring party must first issue a notice of adjudication to the other party, which identifies the dispute, summarises the nature of the redress sought, and nominates or requests nomination of an adjudicator. The dispute must then be formally referred to the adjudicator within 7 days of the notice. The referral should include all supporting documentation — the contract, payment applications, correspondence, and evidence. The adjudicator then has 28 days to reach a decision.',
    section: 'Site & Workplace Conflicts',
    difficulty: 'advanced' as const,
    topic: 'Right to Adjudication',
    category: 'Site & Workplace Conflicts',
  },
  {
    id: 156,
    question:
      'How should a supervising electrician handle a persistent personality clash between two team members that is affecting productivity and morale?',
    options: [
      'Meet each individually with the SBI model, then mediate a joint conversation to agree behavioural expectations and follow up',
      'Move one of the team members to another part of the site to keep them apart',
      'Issue a written warning to both team members to make them stop',
      'Ignore the clash and hope it resolves itself as the project progresses',
    ],
    correctAnswer: 0,
    explanation:
      'A persistent personality clash requires structured intervention. First, meet each person individually to understand their perspective using empathic listening and the SBI model. Then mediate a joint conversation, setting ground rules for respectful dialogue, helping each person articulate their concerns, and guiding them towards agreed behavioural expectations. Follow up regularly to ensure improvement. Moving someone avoids rather than resolves the issue, and blanket discipline punishes without understanding.',
    section: 'Site & Workplace Conflicts',
    difficulty: 'advanced' as const,
    topic: 'Mediator Role',
    category: 'Site & Workplace Conflicts',
  },
  {
    id: 157,
    question:
      'What specific amendments did the Local Democracy, Economic Development and Construction Act 2009 (LDECA) make to the Construction Act 1996 regarding payment?',
    options: [
      'It abolished the right to adjudication for contracts under a certain value',
      "It made the payee's application the default notice if the payer issues none, strengthened adjudication, and allowed oral contracts",
      'It introduced a fixed 14-day payment period for all construction contracts',
      'It removed the right of subcontractors to suspend work for non-payment',
    ],
    correctAnswer: 1,
    explanation:
      "LDECA 2009 made three key amendments to the Construction Act. First, if the payer fails to issue a payment notice, the payee's own application becomes the notified sum that must be paid. Second, adjudication provisions were strengthened, including the right to adjudicate even without a written contract. Third, the requirement for construction contracts to be in writing was removed, meaning oral contracts now have the same statutory protections. These amendments significantly strengthened subcontractor rights.",
    section: 'Site & Workplace Conflicts',
    difficulty: 'advanced' as const,
    topic: 'Construction Act Payment Terms',
    category: 'Site & Workplace Conflicts',
  },
  {
    id: 158,
    question:
      "An electrical apprentice raises a grievance alleging persistent bullying by a qualified electrician, including regular public humiliation and withholding of training opportunities. What is the employer's legal obligation?",
    options: [
      'The employer may dismiss the apprentice if they cannot prove the bullying occurred',
      'The employer can deal with the matter informally without any investigation',
      'Investigate promptly under the ACAS Code, protect the apprentice from victimisation, and act on the findings',
      'The employer is only obliged to act if the apprentice puts the complaint in writing first',
    ],
    correctAnswer: 2,
    explanation:
      'Under HSWA 1974, the employer has a duty to ensure the health, safety, and welfare of employees, which includes psychological welfare. Under the ACAS Code of Practice on disciplinary and grievance procedures, the employer must investigate promptly, hold a formal grievance meeting, allow the apprentice to be accompanied, make a decision based on the evidence, and offer a right of appeal. The employer must also protect the apprentice from victimisation for raising the grievance. Failure to follow the ACAS Code can be considered by an employment tribunal.',
    section: 'Site & Workplace Conflicts',
    difficulty: 'advanced' as const,
    topic: 'Bullying and Harassment',
    category: 'Site & Workplace Conflicts',
  },
  {
    id: 159,
    question:
      'A main contractor has issued a valid payment notice for £12,000 but then serves a pay-less notice reducing the amount to £4,000, citing defective work. The electrician disputes the alleged defects. What are the immediate legal consequences and options?',
    options: [
      'The main contractor must pay the full £12,000 because a pay-less notice has no legal effect',
      'The electrician must accept the £4,000 and has no route to challenge the deduction',
      'The electrician can suspend all work immediately because the deduction is disputed',
      'Only £4,000 is payable now, but the electrician can refer the disputed deduction to adjudication to recover the rest',
    ],
    correctAnswer: 3,
    explanation:
      'If the main contractor has served a valid pay-less notice within the required timeframe, they need only pay the amount stated in the pay-less notice (£4,000) by the final date for payment. However, the electrician can immediately refer the dispute to adjudication to challenge the validity of the pay-less notice and the alleged defects. If the adjudicator finds the defects were not genuine or the deduction was disproportionate, they can order payment of the full amount plus interest. The electrician cannot suspend performance while a valid pay-less notice is in effect, as the sum stated in it has technically been paid.',
    section: 'Site & Workplace Conflicts',
    difficulty: 'advanced' as const,
    topic: 'Pay-Less Notices',
    category: 'Site & Workplace Conflicts',
  },
  {
    id: 160,
    question:
      'An electrician is leading a team of four on a commercial fit-out. Two team members have a dispute about who should perform the more skilled second-fix work versus the less desirable containment runs. How should the lead electrician apply the SBI model and mediation principles to resolve this?',
    options: [
      "Meet each individually with the SBI model, then mediate a joint discussion to surface their interests and agree a fair allocation",
      'Allocate the second-fix work to whoever is more senior and the containment to the junior',
      'Rotate the tasks weekly without discussion so neither person can claim unfairness',
      'Let the two team members settle the matter between themselves without involvement',
    ],
    correctAnswer: 0,
    explanation:
      "The lead electrician should first use individual SBI-based conversations to understand each person's perspective — one may want skills development while the other wants recognition for their experience. Then mediate a joint discussion where both express their concerns, identify shared interests (both want fair treatment and professional development), and collaboratively agree an allocation. This might be a rotation system, a skills-based allocation with training elements, or another creative solution. The key is that both parties feel heard and the solution is agreed rather than imposed, building team cohesion for the remainder of the project.",
    section: 'Site & Workplace Conflicts',
    difficulty: 'advanced' as const,
    topic: 'SBI Feedback Model',
    category: 'Site & Workplace Conflicts',
  },
  // =====================================================
  // Category 5: Prevention & Professional Relationships (id 161-200)
  // 16 basic, 16 intermediate, 8 advanced
  // =====================================================
  {
    id: 161,
    question: 'Why should a domestic electrical quote include a clear list of exclusions?',
    options: [
      'To make the quote appear longer and more thorough to the client',
      'To prevent disputes about what work was and was not included in the agreed price',
      'To satisfy a legal requirement that all quotes list exclusions',
      'To give the electrician grounds to cancel the job at any time',
    ],
    correctAnswer: 1,
    explanation:
      'Listing exclusions prevents misunderstandings and disputes by making it explicit what falls outside the quoted scope. Without clear exclusions, clients may assume related work is included, leading to conflict when they receive a bill for extras or discover certain tasks were not performed.',
    section: 'Prevention & Professional Relationships',
    difficulty: 'basic' as const,
    topic: 'Contracts, Terms & Written Agreements',
    category: 'Prevention & Professional Relationships',
  },
  {
    id: 162,
    question: 'What is the key legal difference between a quote and an estimate in the UK?',
    options: [
      'A quote can be revised at any time during the work, while an estimate is fixed once accepted',
      'A quote is only valid if given in writing, while an estimate can be agreed verbally',
      'A quote is a fixed price the contractor is bound to, while an estimate is an approximate cost that may vary',
      'A quote must always include VAT, while an estimate is always shown exclusive of tax',
    ],
    correctAnswer: 2,
    explanation:
      'A quote is a fixed-price offer that, once accepted, forms a binding agreement at that price. An estimate is an informed approximation and the final cost may be higher or lower. Electricians should be clear about which they are providing to avoid disputes over the final bill.',
    section: 'Prevention & Professional Relationships',
    difficulty: 'basic' as const,
    topic: 'Contracts, Terms & Written Agreements',
    category: 'Prevention & Professional Relationships',
  },
  {
    id: 163,
    question: 'Which of the following should a well-drafted domestic electrical quote include?',
    options: [
      "The client's bank details and credit score",
      "Only the total price and the electrician's signature",
      'A verbal summary of the work to be done',
      'Scope of work, price, payment terms, timeline, and exclusions',
    ],
    correctAnswer: 3,
    explanation:
      'A comprehensive domestic quote should include scope of work, a clear price, payment terms, an estimated timeline, exclusions, and terms and conditions. This level of detail protects both parties by creating a clear written record of what was agreed before work commences.',
    section: 'Prevention & Professional Relationships',
    difficulty: 'basic' as const,
    topic: 'Contracts, Terms & Written Agreements',
    category: 'Prevention & Professional Relationships',
  },
  {
    id: 164,
    question: 'Are verbal agreements legally binding in England and Wales?',
    options: [
      'Yes, but they are difficult to prove if a dispute arises',
      'No — only written contracts are enforceable in England and Wales',
      'Yes — and they are just as easy to prove as written contracts',
      'No — verbal agreements are binding only for work under £100',
    ],
    correctAnswer: 0,
    explanation:
      'Verbal agreements are legally binding contracts in England and Wales, but they are notoriously difficult to prove because there is no written evidence of the exact terms agreed. This is precisely why electricians should always follow up verbal discussions with written confirmation to create a clear paper trail.',
    section: 'Prevention & Professional Relationships',
    difficulty: 'basic' as const,
    topic: 'Contracts, Terms & Written Agreements',
    category: 'Prevention & Professional Relationships',
  },
  {
    id: 165,
    question:
      'What is the primary purpose of sending a confirmation email after a phone conversation with a client about additional work?',
    options: [
      'To advertise other services you offer',
      'To create a written paper trail of what was agreed',
      'To remind the client of your company name',
      'To satisfy GDPR requirements',
    ],
    correctAnswer: 1,
    explanation:
      'A confirmation email creates a documented paper trail of what was discussed and agreed. If a dispute later arises about the scope, cost, or timeline of additional work, the email serves as evidence of the agreement. This simple habit prevents a large proportion of payment and scope disputes.',
    section: 'Prevention & Professional Relationships',
    difficulty: 'basic' as const,
    topic: 'Contracts, Terms & Written Agreements',
    category: 'Prevention & Professional Relationships',
  },
  {
    id: 166,
    question:
      'Which standard forms of contract are commonly used in the UK commercial construction sector?',
    options: [
      'FIDIC and AIA contracts',
      'RIBA and CIBSE agreements',
      'JCT and NEC contract suites',
      'HSE and BEIS frameworks',
    ],
    correctAnswer: 2,
    explanation:
      'JCT (Joint Contracts Tribunal) and NEC (New Engineering Contract) are the two most widely used standard form contract suites in UK commercial construction. Electricians working as subcontractors on commercial projects should have a basic awareness of these terms, particularly provisions around payment, variations, and dispute resolution.',
    section: 'Prevention & Professional Relationships',
    difficulty: 'intermediate' as const,
    topic: 'Contracts, Terms & Written Agreements',
    category: 'Prevention & Professional Relationships',
  },
  {
    id: 167,
    question:
      "An electrician agrees to a rewire over the phone but sends no written confirmation. The client later disputes the agreed price. What is the electrician's weakest point?",
    options: [
      'The work was not completed to a satisfactory standard',
      'The client did not pay a deposit',
      'The electrician did not hold the correct qualifications',
      'There is no documented evidence of the agreed price',
    ],
    correctAnswer: 3,
    explanation:
      'Without any written record — quote, email, or text message — the electrician has no evidence of the price that was agreed. Even though the verbal agreement is legally binding, proving its exact terms in court or mediation is extremely difficult. A simple confirmation email or text after the call would have prevented this vulnerability.',
    section: 'Prevention & Professional Relationships',
    difficulty: 'intermediate' as const,
    topic: 'Contracts, Terms & Written Agreements',
    category: 'Prevention & Professional Relationships',
  },
  {
    id: 168,
    question:
      'What advantage do digital signing tools offer electricians when issuing contracts and quotes?',
    options: [
      'They provide timestamped, tamper-evident proof that both parties agreed to the terms',
      'They automatically calculate the correct price for the job',
      'They replace the need for any written scope of work',
      'They are required by law for all electrical contracts over £1,000',
    ],
    correctAnswer: 0,
    explanation:
      'Digital signing tools create timestamped, tamper-evident records proving both parties reviewed and agreed to the document. This provides stronger evidence than unsigned PDFs or verbal agreements. Tools like DocuSign or Adobe Sign are increasingly used by tradespeople to professionalise their quoting process and reduce disputes.',
    section: 'Prevention & Professional Relationships',
    difficulty: 'intermediate' as const,
    topic: 'Contracts, Terms & Written Agreements',
    category: 'Prevention & Professional Relationships',
  },
  {
    id: 169,
    question:
      'When reviewing a commercial subcontract, which clause should an electrician pay particular attention to for preventing payment disputes?',
    options: [
      'The clause setting out which colour of cable must be used throughout',
      'Payment terms including application deadlines, valuation dates, and pay-less notice provisions',
      'The clause naming the architect responsible for the design',
      'The clause specifying the brand of consumer unit to be installed',
    ],
    correctAnswer: 1,
    explanation:
      'Payment clauses are critical in commercial subcontracts. Under the Construction Act (Housing Grants, Construction and Regeneration Act 1996, as amended), there are specific rules about payment applications, due dates, and pay-less notices. Understanding these provisions helps electricians protect their cash flow and exercise their legal rights if payment is withheld.',
    section: 'Prevention & Professional Relationships',
    difficulty: 'advanced' as const,
    topic: 'Contracts, Terms & Written Agreements',
    category: 'Prevention & Professional Relationships',
  },
  {
    id: 170,
    question:
      'A subcontract contains a "pay-when-paid" clause. What is the legal position on this in the UK?',
    options: [
      'It is fully enforceable provided the clause was clearly set out and agreed by both parties in writing',
      'It is permitted only where the subcontract is worth less than £10,000 in total value',
      'It is generally prohibited under the Housing Grants, Construction and Regeneration Act 1996 (as amended), except in cases of upstream insolvency',
      'It is enforceable for the first interim payment only, after which it becomes void',
    ],
    correctAnswer: 2,
    explanation:
      'Pay-when-paid clauses are largely prohibited under the Construction Act (Housing Grants, Construction and Regeneration Act 1996, as amended by the Local Democracy, Economic Development and Construction Act 2009). The only exception is where the paying party is insolvent. Electricians should be aware that such clauses are generally unenforceable and should not accept them as a reason for withheld payment.',
    section: 'Prevention & Professional Relationships',
    difficulty: 'advanced' as const,
    topic: 'Contracts, Terms & Written Agreements',
    category: 'Prevention & Professional Relationships',
  },
  {
    id: 171,
    question: "In George Thompson's Verbal Judo framework, what does the acronym LEAPS stand for?",
    options: [
      'Lead, Evaluate, Act, Plan, Settle',
      'Learn, Engage, Adapt, Present, Secure',
      'Look, Examine, Arrange, Propose, Solve',
      'Listen, Empathise, Ask, Paraphrase, Summarise',
    ],
    correctAnswer: 3,
    explanation:
      "LEAPS stands for Listen, Empathise, Ask, Paraphrase, and Summarise. It is a structured de-escalation technique from George Thompson's Verbal Judo methodology. Each step moves the conversation from emotional reactivity toward mutual understanding, making it highly effective for electricians dealing with upset clients or colleagues.",
    section: 'Prevention & Professional Relationships',
    difficulty: 'basic' as const,
    topic: 'De-escalation Techniques',
    category: 'Prevention & Professional Relationships',
  },
  {
    id: 172,
    question: 'What is an "amygdala hijack" in the context of conflict situations?',
    options: [
      'A fight-or-flight response that temporarily overrides the rational thinking brain',
      'A negotiation tactic used to gain the upper hand in a dispute',
      'A formal stage in the workplace grievance procedure',
      'A breathing technique used to stay calm during confrontation',
    ],
    correctAnswer: 0,
    explanation:
      "An amygdala hijack occurs when the amygdala — the brain's threat-detection centre — triggers a fight-or-flight response that effectively takes the rational prefrontal cortex offline. During this state, people say and do things they would not normally do. Recognising this in yourself and others is crucial for effective de-escalation on site.",
    section: 'Prevention & Professional Relationships',
    difficulty: 'basic' as const,
    topic: 'De-escalation Techniques',
    category: 'Prevention & Professional Relationships',
  },
  {
    id: 173,
    question:
      'Which of the following is a recommended physical technique for staying calm during a heated dispute on site?',
    options: [
      'Walking away immediately without saying anything',
      'Controlled breathing, lowering your voice, and maintaining open body language',
      "Raising your voice slightly to match the other person's volume",
      'Crossing your arms firmly to show authority',
    ],
    correctAnswer: 1,
    explanation:
      'Controlled breathing activates the parasympathetic nervous system and counteracts the fight-or-flight response. Lowering your voice has a calming effect on both yourself and the other person, while open body language signals that you are not a threat. Together, these techniques help prevent escalation and create space for rational discussion.',
    section: 'Prevention & Professional Relationships',
    difficulty: 'basic' as const,
    topic: 'De-escalation Techniques',
    category: 'Prevention & Professional Relationships',
  },
  {
    id: 174,
    question:
      'What does it mean to "acknowledge emotions without agreement" during a de-escalation?',
    options: [
      'Telling the person their feelings are wrong but you understand',
      'Agreeing with everything they say to calm them down',
      'Validating that the person is upset without conceding that their position is correct',
      'Ignoring their emotions entirely and focusing only on facts',
    ],
    correctAnswer: 2,
    explanation:
      'Acknowledging emotions without agreement means saying things like "I can see this is frustrating for you" without saying "You are right." This validates the person\'s feelings, which reduces emotional intensity, while preserving your own position. It is one of the most powerful de-escalation techniques because people who feel heard are far more likely to engage constructively.',
    section: 'Prevention & Professional Relationships',
    difficulty: 'basic' as const,
    topic: 'De-escalation Techniques',
    category: 'Prevention & Professional Relationships',
  },
  {
    id: 175,
    question: 'What is the "24-hour rule" in conflict management?',
    options: [
      'All disputes must be reported to a supervisor within 24 hours',
      'A cooling-off period required by consumer law after signing a contract',
      'Contracts must be signed within 24 hours of issuing a quote',
      'For non-urgent conflicts, wait 24 hours before responding to allow emotions to settle',
    ],
    correctAnswer: 3,
    explanation:
      'The 24-hour rule advises that for non-urgent conflicts, you should wait 24 hours before responding. This allows the amygdala hijack to subside and the rational brain to re-engage. Many electricians find that after sleeping on a frustrating situation, they can respond far more constructively than they would have in the heat of the moment.',
    section: 'Prevention & Professional Relationships',
    difficulty: 'basic' as const,
    topic: 'De-escalation Techniques',
    category: 'Prevention & Professional Relationships',
  },
  {
    id: 176,
    question:
      'During a heated argument with a client about an invoice, which de-escalation strategy involves changing the physical environment?',
    options: [
      'Suggesting you both step outside or move to a different room to continue the conversation',
      'Lowering your voice and slowing your breathing while remaining seated',
      'Repeating the client\'s words back to them to show you are listening',
      'Asking the client a series of questions to re-engage their rational brain',
    ],
    correctAnswer: 0,
    explanation:
      'Creating space by changing the physical environment is a proven de-escalation technique. Moving to a different location breaks the pattern of the confrontation and gives both parties a moment to reset. For example, saying "Let\'s step into the kitchen and I\'ll make us a cup of tea while we sort this out" can dramatically lower the emotional temperature.',
    section: 'Prevention & Professional Relationships',
    difficulty: 'intermediate' as const,
    topic: 'De-escalation Techniques',
    category: 'Prevention & Professional Relationships',
  },
  {
    id: 177,
    question: 'Why is using questions rather than statements more effective during a conflict?',
    options: [
      'Because statements give you control of the conversation from the outset',
      'Questions shift the other person from defensive mode into thinking mode',
      'Because questions allow you to avoid stating your own position',
      'Because statements are seen as more honest and direct than questions',
    ],
    correctAnswer: 1,
    explanation:
      'When someone is in a defensive or aggressive state, making statements can feel like attacks and escalate the conflict. Questions, by contrast, require the other person to think and formulate an answer, which re-engages the prefrontal cortex (rational brain) and moves them out of the fight-or-flight amygdala response. This is why "What would a fair solution look like to you?" is more effective than "You need to pay this invoice."',
    section: 'Prevention & Professional Relationships',
    difficulty: 'intermediate' as const,
    topic: 'De-escalation Techniques',
    category: 'Prevention & Professional Relationships',
  },
  {
    id: 178,
    question:
      'A client is shouting at you about a delay caused by supply chain issues beyond your control. Using the LEAPS model, what should you do first?',
    options: [
      'Explain calmly that the delay was entirely outside your control',
      'Apologise immediately and offer the client a discount to settle things',
      'Listen carefully without interrupting, giving the client space to express their frustration',
      'Summarise the situation back to the client before they have finished speaking',
    ],
    correctAnswer: 2,
    explanation:
      'The first step in LEAPS is Listen. Before empathising, asking questions, paraphrasing, or summarising, you must actively listen without interrupting. This serves a dual purpose: it gives the client the feeling of being heard (which itself reduces emotional intensity) and it provides you with the information you need for the subsequent steps of the model.',
    section: 'Prevention & Professional Relationships',
    difficulty: 'intermediate' as const,
    topic: 'De-escalation Techniques',
    category: 'Prevention & Professional Relationships',
  },
  {
    id: 179,
    question:
      'An electrician feels their heart racing and fists clenching during a confrontation with a main contractor. Recognising this as an amygdala hijack, what is the most appropriate immediate response?',
    options: [
      'Remind the contractor firmly that their tone is unacceptable on a professional site',
      'Match the contractor\'s intensity so they understand you will not be intimidated',
      'Continue the discussion as normal, since showing any pause would look weak',
      'Pause deliberately, use controlled breathing, and if possible request a short break',
    ],
    correctAnswer: 3,
    explanation:
      'Recognising the physiological signs of an amygdala hijack is the first step. The appropriate response is to deliberately slow down: take controlled breaths to activate the parasympathetic nervous system, and if possible request a short break. This gives the prefrontal cortex time to re-engage. Continuing while hijacked risks saying or doing something you will regret; walking away without explanation may damage the professional relationship.',
    section: 'Prevention & Professional Relationships',
    difficulty: 'advanced' as const,
    topic: 'De-escalation Techniques',
    category: 'Prevention & Professional Relationships',
  },
  {
    id: 180,
    question:
      'A site manager uses aggressive and demeaning language towards you in front of other trades. After de-escalating the immediate situation using controlled breathing and a calm voice, what should your follow-up action be?',
    options: [
      'Document the incident in writing — date, time, witnesses, language used — and raise it through the proper channels',
      'Apologise to the site manager so the working relationship is preserved',
      'Raise your concern loudly at the time so the other trades can support you',
      'Say nothing and accept that this is simply how some site managers behave',
    ],
    correctAnswer: 0,
    explanation:
      "While de-escalation handles the immediate situation, aggressive and demeaning behaviour should not be normalised. Documenting the incident creates a record that protects you if the behaviour recurs or escalates. Raising it through appropriate channels — such as the main contractor's site manager, your employer's HR, or the principal contractor — ensures the issue is addressed formally. This approach balances professionalism with self-advocacy.",
    section: 'Prevention & Professional Relationships',
    difficulty: 'advanced' as const,
    topic: 'De-escalation Techniques',
    category: 'Prevention & Professional Relationships',
  },
  {
    id: 181,
    question:
      'According to the Trust Equation by Maister, Green & Galford, which factor sits in the denominator and reduces trust when it is high?',
    options: [
      'Credibility',
      'Self-orientation',
      'Intimacy',
      'Reliability',
    ],
    correctAnswer: 1,
    explanation:
      "The Trust Equation is: Trust = (Credibility + Reliability + Intimacy) / Self-orientation. Self-orientation is the denominator, meaning the more self-focused you appear, the less people trust you. For electricians, this means that even if you are highly credible and reliable, appearing to care only about getting paid rather than solving the client's problem will undermine trust.",
    section: 'Prevention & Professional Relationships',
    difficulty: 'basic' as const,
    topic: 'Building Professional Relationships',
    category: 'Prevention & Professional Relationships',
  },
  {
    id: 182,
    question:
      'In the Trust Equation (Trust = (Credibility + Reliability + Intimacy) / Self-orientation), what does "Intimacy" refer to in a professional context?',
    options: [
      'Personal romantic relationships with clients',
      "How closely you live to your client's property",
      'The degree to which people feel safe sharing concerns and information with you',
      'The number of times you have worked for the same client',
    ],
    correctAnswer: 2,
    explanation:
      "In the Trust Equation, Intimacy refers to the sense of safety and security people feel when sharing information with you. A client who feels comfortable telling you about their budget constraints or concerns about the project is demonstrating high intimacy. This is built through discretion, empathy, and genuine care for the client's interests.",
    section: 'Prevention & Professional Relationships',
    difficulty: 'intermediate' as const,
    topic: 'Building Professional Relationships',
    category: 'Prevention & Professional Relationships',
  },
  {
    id: 183,
    question: 'How does an electrician build "Credibility" in the Trust Equation?',
    options: [
      'By dressing smartly and using technical language to impress the client',
      'By being the cheapest electrician the client can find locally',
      'By promising to start the work sooner than any competitor',
      'Through demonstrating competence, qualifications, and up-to-date knowledge in their field',
    ],
    correctAnswer: 3,
    explanation:
      'Credibility in the Trust Equation comes from demonstrating genuine competence and expertise. For electricians, this means holding recognised qualifications, staying current with BS 7671 amendments, explaining technical matters clearly, and having a track record of quality work. It is about substance rather than appearance.',
    section: 'Prevention & Professional Relationships',
    difficulty: 'basic' as const,
    topic: 'Building Professional Relationships',
    category: 'Prevention & Professional Relationships',
  },
  {
    id: 184,
    question:
      'What does Cialdini\'s "reciprocity principle" suggest about building professional relationships?',
    options: [
      'People naturally feel compelled to return favours and generosity',
      'People are obligated by law to return favours',
      'Reciprocity only applies in formal contractual relationships',
      'It suggests you should never do anything for free',
    ],
    correctAnswer: 0,
    explanation:
      "Cialdini's reciprocity principle states that when someone does something helpful or generous for us, we feel a natural compulsion to reciprocate. For electricians, this might mean providing helpful advice beyond the immediate job scope, recommending a good plumber, or going slightly above and beyond. These gestures build goodwill and often lead to referrals and repeat business.",
    section: 'Prevention & Professional Relationships',
    difficulty: 'basic' as const,
    topic: 'Building Professional Relationships',
    category: 'Prevention & Professional Relationships',
  },
  {
    id: 185,
    question:
      'Why is the "lifetime value" of a trusted client relationship important for an electrician\'s business?',
    options: [
      'Because a single satisfied client legally obliges you to offer them discounts',
      'Because one satisfied client can generate years of repeat business and referrals worth far more than the job itself',
      'Because long-standing clients are exempt from the usual payment terms',
      'Because regular clients allow you to skip the quoting process entirely',
    ],
    correctAnswer: 1,
    explanation:
      'A trusted client does not just represent one job — they represent every future job they will need, plus every friend, family member, and neighbour they recommend you to. Research consistently shows that acquiring a new customer costs five to seven times more than retaining an existing one. For a sole trader electrician, a network of trusted clients is their most valuable business asset.',
    section: 'Prevention & Professional Relationships',
    difficulty: 'basic' as const,
    topic: 'Building Professional Relationships',
    category: 'Prevention & Professional Relationships',
  },
  {
    id: 186,
    question:
      'Which of the following best demonstrates "Reliability" in the Trust Equation for an electrician?',
    options: [
      'Charging a premium price to signal the quality of your work',
      'Delivering one exceptional job that the client will always remember',
      'Consistently arriving when promised and following through on every commitment',
      'Always agreeing to whatever the client asks for without question',
    ],
    correctAnswer: 2,
    explanation:
      'Reliability in the Trust Equation is about consistency and follow-through over time. It is not about one outstanding performance but about repeatedly doing what you say you will do. Arriving on time, returning calls when promised, meeting deadlines, and keeping even small commitments all compound over time to build a strong reputation for reliability.',
    section: 'Prevention & Professional Relationships',
    difficulty: 'intermediate' as const,
    topic: 'Building Professional Relationships',
    category: 'Prevention & Professional Relationships',
  },
  {
    id: 187,
    question:
      'An electrician regularly attends local trade networking events and has built strong relationships with plumbers, plasterers, and building control officers. What is the primary professional benefit of this network?',
    options: [
      'It guarantees a steady supply of paid work directly from the building control office',
      'It allows other trades to be billed for any shared welfare or access costs',
      'It removes the need to attend formal site coordination meetings',
      'It creates mutual referrals, shared knowledge, and collaborative problem-solving',
    ],
    correctAnswer: 3,
    explanation:
      'Professional networking with other trades, suppliers, and building control creates a mutually beneficial ecosystem. Other trades refer work to you when they trust your competence, you can collaborate on multi-trade projects, and you gain access to shared knowledge about local practices and requirements. This network becomes increasingly valuable over time through the reciprocity principle.',
    section: 'Prevention & Professional Relationships',
    difficulty: 'intermediate' as const,
    topic: 'Building Professional Relationships',
    category: 'Prevention & Professional Relationships',
  },
  {
    id: 188,
    question:
      'Using the Trust Equation, what is the likely impact on client trust if an electrician is highly credible and reliable but constantly talks about how busy they are and how many other clients are waiting?',
    options: [
      'Trust will decrease because high self-orientation is the denominator that reduces overall trust',
      'Trust will increase because the client sees you are in high demand',
      'Trust will be unaffected, as busyness has no bearing on the equation',
      'Trust will increase because reliability is the most important factor of all',
    ],
    correctAnswer: 0,
    explanation:
      'In the Trust Equation, Self-orientation is the denominator. Constantly talking about your own busyness signals that your focus is on yourself rather than the client in front of you. Even with high credibility and reliability in the numerator, a high self-orientation denominator will significantly reduce the overall trust score. The client wants to feel that their project matters to you.',
    section: 'Prevention & Professional Relationships',
    difficulty: 'advanced' as const,
    topic: 'Building Professional Relationships',
    category: 'Prevention & Professional Relationships',
  },
  {
    id: 189,
    question:
      "An electrician wants to leverage Cialdini's reciprocity principle ethically to build their client base. Which approach best achieves this?",
    options: [
      'Offering discounts to clients who introduce you to their friends',
      'Providing genuine value beyond the contracted scope without expecting an immediate return',
      'Giving small gifts to building control officers to speed up approvals',
      'Promising future favours in return for an immediate recommendation',
    ],
    correctAnswer: 1,
    explanation:
      'Ethical use of the reciprocity principle means providing genuine, unsolicited value. When an electrician shares helpful advice or goes slightly above expectations, clients naturally feel goodwill and are more likely to recommend them. This must be genuine and without strings attached — manipulation or bribery (such as gifts to officials) is unethical and potentially illegal.',
    section: 'Prevention & Professional Relationships',
    difficulty: 'advanced' as const,
    topic: 'Building Professional Relationships',
    category: 'Prevention & Professional Relationships',
  },
  {
    id: 190,
    question:
      'How does maintaining professional relationships with building control officers specifically help prevent conflicts?',
    options: [
      'It guarantees that your work will always pass inspection first time',
      'It allows you to bypass certain standards that the officer agrees to overlook',
      'It opens channels where compliance queries are resolved before they become formal objections',
      'It means the officer will recommend you to other clients in the area',
    ],
    correctAnswer: 2,
    explanation:
      'A professional relationship with building control officers means you can have informal conversations about compliance approaches before committing to an installation method. This collaborative approach catches potential issues early, prevents costly rework, and avoids the conflict that arises when work fails inspection. It does not mean bypassing standards — it means working together to achieve compliance efficiently.',
    section: 'Prevention & Professional Relationships',
    difficulty: 'intermediate' as const,
    topic: 'Building Professional Relationships',
    category: 'Prevention & Professional Relationships',
  },
  {
    id: 191,
    question:
      'What is the purpose of a self-assessment of conflict style in a personal action plan?',
    options: [
      'To prove to clients that you have completed formal mediation training',
      'To label your colleagues by their conflict style so you know what to expect',
      'To eliminate conflict from your working life altogether',
      'To identify your default tendencies in conflict so you can consciously choose more effective responses',
    ],
    correctAnswer: 3,
    explanation:
      'A self-assessment helps you understand your natural conflict style — whether you tend to avoid, accommodate, compete, compromise, or collaborate. Once you know your default tendency, you can recognise when it is and is not serving you, and consciously choose a more effective approach for each specific situation rather than reacting on autopilot.',
    section: 'Prevention & Professional Relationships',
    difficulty: 'basic' as const,
    topic: 'Your Conflict Resolution Action Plan',
    category: 'Prevention & Professional Relationships',
  },
  {
    id: 192,
    question: 'Which of the following is part of a communication toolkit for conflict resolution?',
    options: [
      'Non-Violent Communication (NVC), the STATE model, and the assertiveness formula',
      'Aggressive voicemail messages to chase unpaid invoices',
      'Social media posts criticising difficult clients',
      'Legal jargon designed to intimidate the other party',
    ],
    correctAnswer: 0,
    explanation:
      'An effective communication toolkit includes frameworks such as Non-Violent Communication (NVC) for expressing needs without blame, the STATE model for structuring difficult conversations, and the assertiveness formula for expressing your position clearly and respectfully. These tools give electricians practical language patterns they can use in real situations to resolve conflicts constructively.',
    section: 'Prevention & Professional Relationships',
    difficulty: 'basic' as const,
    topic: 'Your Conflict Resolution Action Plan',
    category: 'Prevention & Professional Relationships',
  },
  {
    id: 193,
    question: 'What is the correct order of the escalation ladder for resolving disputes?',
    options: [
      'Mediate, then a formal process, then self-resolve, then walk away',
      'Self-resolve → mediate → formal process → walk away',
      'A formal process, then walk away, then mediate, then self-resolve',
      'Walk away, then mediate, then self-resolve, then a formal process',
    ],
    correctAnswer: 1,
    explanation:
      'The escalation ladder progresses from least to most drastic: first attempt to self-resolve through direct communication, then involve a neutral mediator, then pursue formal processes (such as adjudication or small claims court), and only walk away as a last resort. Each step should only be taken if the previous step has genuinely been exhausted. Most disputes can and should be resolved at the first or second level.',
    section: 'Prevention & Professional Relationships',
    difficulty: 'basic' as const,
    topic: 'Your Conflict Resolution Action Plan',
    category: 'Prevention & Professional Relationships',
  },
  {
    id: 194,
    question: 'What is the ACAS helpline number, and what kind of support do they provide?',
    options: [
      '101 — non-emergency police reports about workplace theft',
      '999 — emergency assistance for workplace injuries',
      '0300 123 1100 — free advice on workplace rights, disputes, and employment law',
      '0800 555 111 — anonymous reporting of workplace fraud',
    ],
    correctAnswer: 2,
    explanation:
      'The ACAS (Advisory, Conciliation and Arbitration Service) helpline is 0300 123 1100. They provide free, impartial advice on workplace rights, employment disputes, and employment law. For electricians who are employees or who employ others, ACAS is an invaluable resource for resolving workplace conflicts before they escalate to formal proceedings.',
    section: 'Prevention & Professional Relationships',
    difficulty: 'basic' as const,
    topic: 'Your Conflict Resolution Action Plan',
    category: 'Prevention & Professional Relationships',
  },
  {
    id: 195,
    question:
      'Which items should be included on a conflict prevention checklist for an electrician?',
    options: [
      'De-escalation scripts, breathing techniques, and a list of helpline numbers',
      'A record of every past dispute and how each one was eventually resolved',
      'Photographs of completed work, test certificates, and warranty documents',
      'Written contracts, terms and conditions, confirmation emails, and variation order procedures',
    ],
    correctAnswer: 3,
    explanation:
      'A conflict prevention checklist focuses on the administrative practices that stop disputes before they start. Written contracts define the agreement, terms and conditions set expectations, confirmation emails create paper trails, and variation order procedures ensure changes are documented and priced before they are carried out. These are the practical tools that prevent the majority of common disputes.',
    section: 'Prevention & Professional Relationships',
    difficulty: 'intermediate' as const,
    topic: 'Your Conflict Resolution Action Plan',
    category: 'Prevention & Professional Relationships',
  },
  {
    id: 196,
    question: 'What are "quick wins" in the context of a conflict resolution action plan?',
    options: [
      'Simple, immediately implementable changes that significantly reduce conflict risk',
      'Long-term structural changes to how your business is run',
      'Tasks that can be delegated to an apprentice to save you time',
      'Marketing activities that bring in new clients quickly',
    ],
    correctAnswer: 0,
    explanation:
      'Quick wins are low-effort, high-impact actions that can be implemented immediately. Examples include always confirming phone agreements in writing, adding basic terms and conditions to every quote, and creating a standard variation order template. These small changes address the most common causes of disputes and can be put into practice on the very next job.',
    section: 'Prevention & Professional Relationships',
    difficulty: 'intermediate' as const,
    topic: 'Your Conflict Resolution Action Plan',
    category: 'Prevention & Professional Relationships',
  },
  {
    id: 197,
    question:
      'A sole trader electrician has a dispute with a domestic client over a £3,500 invoice. After attempting to self-resolve and mediate without success, what is the most appropriate next step on the escalation ladder?',
    options: [
      'Post the details of the dispute on social media to pressure the client',
      'Issue a claim through the Small Claims Court (part of the County Court) for the disputed amount',
      'Refer the matter to building control for an independent ruling',
      'Write the debt off immediately to avoid the stress of pursuing it',
    ],
    correctAnswer: 1,
    explanation:
      'After exhausting self-resolution and mediation, the next step on the escalation ladder is a formal process. For a £3,500 dispute with a domestic client, the Small Claims Court (part of the County Court, for claims up to £10,000) is the most proportionate route. The process is designed to be accessible without a solicitor, and fees are recoverable if the claim succeeds. Social media posts could expose you to defamation claims.',
    section: 'Prevention & Professional Relationships',
    difficulty: 'intermediate' as const,
    topic: 'Your Conflict Resolution Action Plan',
    category: 'Prevention & Professional Relationships',
  },
  {
    id: 198,
    question:
      'How do Citizens Advice and the Federation of Small Businesses (FSB) support electricians in dispute situations?',
    options: [
      'They send a representative to attend court hearings on your behalf',
      'They resolve the dispute directly and recover the money for you',
      'Citizens Advice gives free rights guidance, while the FSB offers members legal advice and mediation support',
      'They issue binding rulings that both parties must comply with',
    ],
    correctAnswer: 2,
    explanation:
      'Citizens Advice provides free, impartial guidance on a wide range of legal matters including consumer rights and employment law. The FSB offers its members access to legal advice helplines, dispute mediation services, and business guidance. Neither directly resolves disputes for you, but both provide the information and support needed to handle disputes effectively. These are valuable resources for sole traders who may not have an HR department or in-house legal team.',
    section: 'Prevention & Professional Relationships',
    difficulty: 'intermediate' as const,
    topic: 'Your Conflict Resolution Action Plan',
    category: 'Prevention & Professional Relationships',
  },
  {
    id: 199,
    question:
      'An electrician\'s action plan includes the assertiveness formula: "When [behaviour], I feel [emotion], because [reason], and I would like [request]." In which scenario is this formula most effectively applied?',
    options: [
      'When responding to a written complaint from a domestic client',
      'When negotiating a payment dispute with a main contractor',
      'When de-escalating an angry client who is shouting at you',
      'When a colleague repeatedly borrows your tools without asking and you need to address it directly',
    ],
    correctAnswer: 3,
    explanation:
      'The assertiveness formula is designed for direct, interpersonal situations where you need to express your needs without aggression or passivity. For example: "When you borrow my tools without asking, I feel frustrated, because I cannot find them when I need them and it slows my work down, and I would like you to ask me first." This addresses the behaviour directly, owns the emotion, explains the impact, and makes a clear request — all without attacking the other person.',
    section: 'Prevention & Professional Relationships',
    difficulty: 'advanced' as const,
    topic: 'Your Conflict Resolution Action Plan',
    category: 'Prevention & Professional Relationships',
  },
  {
    id: 200,
    question:
      'An electrician is developing a comprehensive conflict resolution action plan. They have identified their default conflict style as "avoiding," built a communication toolkit including NVC and the STATE model, and created a prevention checklist. What critical element are they still missing to make the plan complete?',
    options: [
      'A clear escalation ladder with defined trigger points for moving between self-resolution, mediation, and formal processes',
      'A signed copy of the company\'s anti-bullying and grievance policy',
      'A list of recommended mediators and solicitors in the local area',
      'A template letter before action ready to send to any non-paying client',
    ],
    correctAnswer: 0,
    explanation:
      'A complete action plan needs an escalation ladder with clear trigger points. Without it, the electrician risks either escalating too quickly (jumping to legal action when mediation would suffice) or too slowly (endlessly trying to self-resolve when formal intervention is needed). The trigger points should be specific — for example, "If direct conversation fails to resolve the issue within 14 days, engage a mediator." This structure prevents both under-reaction and over-reaction.',
    section: 'Prevention & Professional Relationships',
    difficulty: 'advanced' as const,
    topic: 'Your Conflict Resolution Action Plan',
    category: 'Prevention & Professional Relationships',
  },
];

export const getRandomCRExamQuestions = (count: number): StandardMockQuestion[] => {
  return getRandomQuestionsBalanced(crQuestionBank, count, crCategories);
};
