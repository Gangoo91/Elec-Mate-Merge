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
      'Acknowledge the request positively, explain it falls outside the original scope, and offer to price it as additional work',
      'A breakdown in relationships including disputes, grievances, and dissatisfaction that affects productivity and wellbeing',
      'Constructive conflict leads to better ideas and outcomes; destructive conflict damages relationships and productivity',
      'When the emotional brain overrides rational thinking, causing a disproportionate reaction',
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
      'Acknowledge the request positively, explain it falls outside the original scope, and offer to price it as additional work',
      'It creates timestamped evidence that can be referenced if the dispute escalates, preventing he-said-she-said arguments',
      'The right to suspend performance of their obligations, provided they give at least 7 days\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\' written notice of their intention to suspend',
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
      'High assertiveness, high cooperativeness',
      '8% above Bank of England base rate',
      'The principal contractor',
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
      'Walk both parties back down the ladder to the observable data and rebuild shared meaning from there',
      'It allows problems to fester and grow, often resulting in larger conflicts later',
      'Regular updates prevent anxiety, build trust, and reduce the likelihood of complaints and disputes',
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
      'The degree to which people feel safe sharing concerns and information with you',
      'Ignoring, pretending, selective, attentive, empathic',
      'Viewing situations in only two extreme categories with no middle ground',
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
      'High assertiveness, high cooperativeness',
      'Selecting specific data to focus on',
      'Nonviolent Communication (NVC) in practice',
      'Team members wearing different coloured PPE',
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
      'Active listening and collaborative problem-solving',
      'Unclear coordination of shared spaces and sequencing of work',
      'Mind-reading, personalising, and catastrophising',
      'Ignoring, pretending, selective, attentive, empathic',
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
      'The gradual expansion of work beyond the original agreement, often through small additions that individually seem minor',
      'It helps you recognise when your habitual response may not suit the situation and consciously choose a better approach',
      'An I-statement expresses your own feelings and needs ("I feel concerned when..."); a You-statement assigns blame ("You always...")',
      'A breakdown in relationships including disputes, grievances, and dissatisfaction that affects productivity and wellbeing',
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
      'Step out of the content, restore safety by establishing Mutual Purpose and Mutual Respect, then return to the issue',
      'Take a deliberate pause, use controlled breathing, and if possible request a short break before continuing the discussion',
      'Understating your true opinion, using sarcasm, or sugarcoating to avoid speaking directly',
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
      'Understating your true opinion, using sarcasm, or sugarcoating to avoid speaking directly',
      'It allows problems to fester and grow, often resulting in larger conflicts later',
      'Share your interpretation, conclusion, or theory about the facts — tentatively, not as absolute truth',
      'An observation describes what happened factually; an evaluation adds judgement or interpretation',
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
      'A quote is a fixed price that cannot change; an estimate is an approximate cost that may vary',
      'Calmly repeating your key message or boundary without being drawn into side arguments',
      'Better technical solutions through challenging assumptions and sharing diverse perspectives',
      'Hearing only parts of the conversation that interest you or confirm your existing views',
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
      'Validating that the person is upset without conceding that their position is correct',
      'How we unconsciously move from observing data to making assumptions and taking action',
      'Between stimulus and response there is a space where we can choose our reaction',
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
      'A request allows the other person to say no without punishment; a demand carries implicit or explicit consequences for refusal',
      'Setting realistic or slightly conservative expectations and then exceeding them through quality, speed, or service',
      'Regular updates prevent anxiety, build trust, and reduce the likelihood of complaints and disputes',
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
      '£40 (up to £999.99), £70 (£1,000-£9,999.99), £100 (£10,000+)',
      'Active listening and collaborative problem-solving',
      '£35 to £455, depending on the claim value',
      'Nonviolent Communication (NVC) in practice',
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
      'Coordinate the work, plan the sequencing, and ensure that the agreed sequence allows all trades to work safely and efficiently',
      'Empathic listening seeks to understand the speaker\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s frame of reference, emotions, and underlying needs, not just the content of their words',
      'By assessing each conflict situation and deliberately choosing the mode that best fits the context, stakes, and relationship',
      '"Pay when paid" clauses, which make payment to a subcontractor conditional on the main contractor receiving payment from the client',
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
      'Regular updates prevent anxiety, build trust, and reduce the likelihood of complaints and disputes',
      'A customer who has a problem resolved exceptionally well may become more loyal than one who never experienced a problem',
      'A fight-or-flight response that temporarily overrides the rational thinking brain',
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
      'Walk both parties back down the ladder to the observable data and rebuild shared meaning from there',
      'Regular updates prevent anxiety, build trust, and reduce the likelihood of complaints and disputes',
      'Coordinate the work, plan the sequencing, and ensure that the agreed sequence allows all trades to work safely and efficiently',
      'Assumptions, unclear instructions, and failure to confirm understanding',
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
      'It creates timestamped evidence that can be referenced if the dispute escalates, preventing he-said-she-said arguments',
      'Collaborating to find root causes, compromising on non-critical items, and competing only on safety-critical timelines',
      'It helps you recognise when your habitual response may not suit the situation and consciously choose a better approach',
      'The collective understanding created when all parties freely contribute their ideas, opinions, and feelings to the dialogue',
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
      'It keeps the client informed, manages expectations about the next day\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s work and disruption, builds trust, prevents anxiety-driven complaints, and creates a record of project communication',
      'The collective understanding created when all parties freely contribute their ideas, opinions, and feelings to the dialogue',
      'Each trade selects data confirming their existing beliefs about the other, creating mutually reinforcing negative perceptions that become self-fulfilling prophecies',
      'Court fees, time investment, enforcement difficulty, relationship damage, and whether the debtor has the means to pay — sometimes a negotiated settlement or write-off is more commercially sensible',
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
      'Pulling together the key points of a longer conversation to confirm shared understanding, especially useful at the end of a difficult discussion',
      'By first stating what they don\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t mean ("I\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'m not saying your work is below standard overall") and then what they do mean ("I am saying this particular joint needs attention because it doesn\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t meet the specification")',
      'Simple, immediately implementable changes that significantly reduce conflict risk — such as always sending a confirmation text after phone agreements',
      'Cognitive distortions amplify perceived threats, trigger stronger amygdala responses, and create misinterpretations that provoke defensive reactions from others, creating escalation spirals',
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
      'The pattern reveals power-based conflict behaviour — they accommodate those with more power, compete with those with less, revealing that their style is driven by power dynamics rather than situational appropriateness, risking apprentice wellbeing and development',
      'It keeps the client informed, manages expectations about the next day\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s work and disruption, builds trust, prevents anxiety-driven complaints, and creates a record of project communication',
      'A method of placing negative feedback between two positive comments, now considered less effective because it can feel insincere, dilute the message, and train people to brace for criticism whenever they hear praise',
      'Pause the content discussion, acknowledge the client\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s frustration, reaffirm respect (\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"I understand you\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'re frustrated, and I respect that you\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'re trying to manage your budget carefully\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"), and then use contrasting to separate the concern from the generalisation',
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
      'Selecting specific data to focus on',
      'There is no documented evidence of the agreed price',
      'Self-resolve → mediate → formal process → walk away',
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
      "Document the incident in writing, including date, time, witnesses, and exact language used, and raise it through the appropriate channels",
      "Through demonstrating competence, qualifications, and up-to-date knowledge in their field",
      "Photograph the damage, document the date and time, and then raise the issue directly with the plumber in a calm, professional manner",
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
      'Hearing only parts of the conversation that interest you or confirm your existing views',
      'Listen fully to understand the specific concern, then offer an independent inspection if agreement cannot be reached',
      'The right to require the trader to repeat or fix the service at no additional cost',
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
      'A breakdown in relationships including disputes, grievances, and dissatisfaction that affects productivity and wellbeing',
      'The collective understanding created when all parties freely contribute their ideas, opinions, and feelings to the dialogue',
      'Clearly defining what is included in the agreed work, your working hours, communication expectations, and payment terms',
      'Collaborating to find root causes, compromising on non-critical items, and competing only on safety-critical timelines',
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
      'Pulling together the key points of a longer conversation to confirm shared understanding, especially useful at the end of a difficult discussion',
      'Photograph the damage, document the date and time, and then raise the issue directly with the plumber in a calm, professional manner',
      'The right to suspend performance of their obligations, provided they give at least 7 days\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\' written notice of their intention to suspend',
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
      'Listen carefully without interrupting, giving the client space to express their frustration',
      'Calmly repeating your key message or boundary without being drawn into side arguments',
      'Hearing only parts of the conversation that interest you or confirm your existing views',
      'What has changed, why it changed, the cost, and the client\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s signature',
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
      'When a colleague on site repeatedly borrows your tools without asking and you need to address it directly without damaging the working relationship',
      'An I-statement expresses your own feelings and needs ("I feel concerned when..."); a You-statement assigns blame ("You always...")',
      'Unhealthy responses to feeling unsafe — withdrawing from dialogue (silence) or trying to force meaning into the pool (violence)',
      'The collective understanding created when all parties freely contribute their ideas, opinions, and feelings to the dialogue',
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
      'A fight-or-flight response that temporarily overrides the rational thinking brain',
      'Non-Violent Communication (NVC), the STATE model, and the assertiveness formula',
      'For non-urgent conflicts, wait 24 hours before responding to allow emotions to settle',
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
      'A statutory fallback scheme that implies payment and adjudication terms into construction contracts that do not already comply with the Construction Act',
      '"Looking at the last six invoices, the average payment time has been 47 days against our 30-day terms. The last three payments were received at 52, 48, and 61 days respectively."',
      'A feeling is an emotion (frustrated, anxious, relieved); a thought is an interpretation disguised as a feeling ("I feel that you are being unfair")',
      'A breakdown in relationships including disputes, grievances, and dissatisfaction that affects productivity and wellbeing',
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
      'The amount owed, how it was calculated, details of interest/charges, information about free debt advice, and a response deadline',
      'Regular updates prevent anxiety, build trust, and reduce the likelihood of complaints and disputes',
      'Collaborating to find root causes, compromising on non-critical items, and competing only on safety-critical timelines',
      'A request allows the other person to say no without punishment; a demand carries implicit or explicit consequences for refusal',
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
      'A request allows the other person to say no without punishment; a demand carries implicit or explicit consequences for refusal',
      'A don\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t/do statement that addresses concerns about your intentions and confirms your actual purpose',
      'Make a phone call to discuss the situation, check for any dispute about the work, and attempt to agree a payment plan',
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
      "It helps you recognise when your habitual response may not suit the situation and consciously choose a better approach",
      "A don't/do statement that addresses concerns about your intentions and confirms your actual purpose",
      "Between stimulus and response there is a space where we can choose our reaction",
      "A breakdown in relationships including disputes, grievances, and dissatisfaction that affects productivity and wellbeing",
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
      'Listen carefully without interrupting, giving the client space to express their frustration',
      'By assessing each conflict situation and deliberately choosing the mode that best fits the context, stakes, and relationship',
      'Share your interpretation, conclusion, or theory about the facts — tentatively, not as absolute truth',
      'Friendly reminder, formal written reminder, phone call, letter before action, small claims',
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
      'Cognitive distortions amplify perceived threats, trigger stronger amygdala responses, and create misinterpretations that provoke defensive reactions from others, creating escalation spirals',
      'The pattern reveals power-based conflict behaviour — they accommodate those with more power, compete with those with less, revealing that their style is driven by power dynamics rather than situational appropriateness, risking apprentice wellbeing and development',
      'Include the statutory interest entitlement in your terms and conditions, reference it in friendly reminders as a factual statement rather than a threat, and only formally claim it after the letter before action stage',
      'Express your views as opinions rather than disguised facts, using language like "I\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'m wondering..." or "It seems to me..."',
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
      '"I really value our working relationship and want to continue working with you (Yes). I can\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t do this at the old price because material costs have risen 30% (No). I can offer you a phased approach to spread the cost if that helps (Yes)."',
      '"I\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'ve noticed tools left on the walkway on three occasions this week (observation). I feel worried (feeling) because someone could trip and be seriously injured (need for safety). Would you be willing to use the tool belt and return tools to the kit bag after each use? (request)"',
      'Pause the content discussion, acknowledge the client\'s frustration, reaffirm respect (\\\\\\\\\\\\\\"I understand you\'re frustrated, and I respect that you\'re trying to manage your budget carefully\\\\\\\\\\\\\\"), and then use contrasting to separate the concern from the generalisation',
      'The pattern reveals power-based conflict behaviour — they accommodate those with more power, compete with those with less, revealing that their style is driven by power dynamics rather than situational appropriateness, risking apprentice wellbeing and development',
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
      'Cognitive distortions amplify perceived threats, trigger stronger amygdala responses, and create misinterpretations that provoke defensive reactions from others, creating escalation spirals',
      'Offensive, intimidating, malicious, or insulting behaviour, or an abuse of power, that undermines, humiliates, or causes physical or emotional harm to someone',
      '"It sounds like you\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'re feeling frustrated because the timeline has been pushed back again"',
      'No — "pay when paid" clauses are banned by the Construction Act 1996; the main contractor must pay the subcontractor regardless of whether they have been paid by the client',
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
      'Understating your true opinion, using sarcasm, or sugarcoating to avoid speaking directly',
      'Lower your tone, acknowledge the emotional response, and allow a brief pause before continuing',
      'Questions shift the other person from defensive mode to thinking mode, re-engaging their rational brain',
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
      'Listen, Empathise, Ask, Paraphrase, Summarise',
      'Mind-reading, personalising, and catastrophising',
      'There is no documented evidence of the agreed price',
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
      'No — "pay when paid" clauses are banned by the Construction Act 1996; the main contractor must pay the subcontractor regardless of whether they have been paid by the client',
      'A breakdown in relationships including disputes, grievances, and dissatisfaction that affects productivity and wellbeing',
      'A feeling is an emotion (frustrated, anxious, relieved); a thought is an interpretation disguised as a feeling ("I feel that you are being unfair")',
      'Pulling together the key points of a longer conversation to confirm shared understanding, especially useful at the end of a difficult discussion',
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
      "An observation describes what happened factually; an evaluation adds judgement or interpretation",
      "What has changed, why it changed, the cost, and the client's signature",
      "Assumptions, unclear instructions, and failure to confirm understanding",
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
      'Assumptions, unclear instructions, and failure to confirm understanding',
      'Understating your true opinion, using sarcasm, or sugarcoating to avoid speaking directly',
      '0300 123 1100 — free advice on workplace rights, disputes, and employment law',
      'A quote is a fixed price the contractor is bound to, while an estimate is an approximate cost that may vary',
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
      'Issue a notice of adjudication to the other party identifying the dispute and the redress sought, then refer the dispute to the nominated adjudicator within 7 days, providing all supporting documentation',
      'By first stating what they don\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t mean ("I\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'m not saying your work is below standard overall") and then what they do mean ("I am saying this particular joint needs attention because it doesn\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t meet the specification")',
      '"I\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'ve noticed tools left on the walkway on three occasions this week (observation). I feel worried (feeling) because someone could trip and be seriously injured (need for safety). Would you be willing to use the tool belt and return tools to the kit bag after each use? (request)"',
      'The main contractor need only pay £4,000 as stated in the pay-less notice for now; the electrician can refer the dispute to adjudication to challenge the pay-less notice and recover the difference if the adjudicator finds in their favour',
    ],
    correctAnswer: 2,
    explanation:
      'Option B demonstrates all four NVC steps correctly. It begins with a specific, factual observation (tools left out three times), states a genuine feeling (worried), connects it to a universal need (safety), and makes a clear, doable request (use tool belt and return tools). Notice how it avoids "always" (exaggeration), "I feel that you..." (thought disguised as feeling), and comparison with others (which triggers shame rather than change).',
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
      'Issue a claim through the Small Claims Court (part of the County Court) for the disputed amount',
      'Actively invite disagreement and alternative views to ensure your understanding is complete',
      'Our beliefs formed at the top of the ladder influence which data we select at the bottom, reinforcing existing biases',
      'Step out of the content, restore safety by establishing Mutual Purpose and Mutual Respect, then return to the issue',
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
      "Empathic listening seeks to understand the speaker's frame of reference, emotions, and underlying needs, not just the content of their words",
      "Pulling together the key points of a longer conversation to confirm shared understanding, especially useful at the end of a difficult discussion",
      "By assessing each conflict situation and deliberately choosing the mode that best fits the context, stakes, and relationship",
      "Situation, Behaviour, Impact — a structured way to give direct, constructive feedback to a team member",
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
      'How we unconsciously move from observing data to making assumptions and taking action',
      'The Positive No (Yes-No-Yes), creating a firm but respectful repetition pattern',
      'People naturally feel compelled to return favours, helpfulness, or generosity',
      'Work being added or changed beyond what was originally agreed',
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
      '"Pay when paid" clauses, which make payment to a subcontractor conditional on the main contractor receiving payment from the client',
      'Photograph the damage, document the date and time, and then raise the issue directly with the plumber in a calm, professional manner',
      '"Looking at the last six invoices, the average payment time has been 47 days against our 30-day terms. The last three payments were received at 52, 48, and 61 days respectively."',
      'To facilitate a structured conversation between the parties, helping them understand each other\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s perspectives and reach a mutually acceptable resolution',
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
      'Intervene to stop the immediate behaviour if safe to do so, support the apprentice, and report the incident through the appropriate grievance or welfare channels',
      'No — the Consumer Rights Act covers failure to perform with reasonable care and skill, not change of mind; the sockets were installed as agreed and meet the required standard',
      'Both have valid positions — a quote is generally fixed, but genuinely unforeseeable work can constitute a valid variation, provided it is documented and agreed before proceeding',
      'By first stating what they don\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t mean ("I\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'m not saying your work is below standard overall") and then what they do mean ("I am saying this particular joint needs attention because it doesn\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t meet the specification")',
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
      "Pause the content discussion, acknowledge the client's frustration, reaffirm respect (\\\\\\\"I understand you're frustrated, and I respect that you're trying to manage your budget carefully\\\\\\\"), and then use contrasting to separate the concern from the generalisation",
      "It works best when the original failure was not caused by negligence, the recovery is swift and genuine, and the client perceives the effort as exceptional — it does not apply to repeated failures or serious safety issues",
      "Issue a notice of adjudication to the other party identifying the dispute and the redress sought, then refer the dispute to the nominated adjudicator within 7 days, providing all supporting documentation",
      "\\\"I really value our working relationship and want to continue working with you (Yes). I can\\\\'t do this at the old price because material costs have risen 30% (No). I can offer you a phased approach to spread the cost if that helps (Yes).\\\"",
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
      'Active listening and collaborative problem-solving',
      'Fully concentrating, understanding, responding, and remembering',
      '£40 (up to £999.99), £70 (£1,000-£9,999.99), £100 (£10,000+)',
      'Self-resolve → mediate → formal process → walk away',
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
      'The gradual expansion of work beyond the original agreement, often through small additions that individually seem minor',
      'Providing a structured process for resolving workplace grievances between electrical workers and their employers within the JIB framework',
      'A duty to cooperate with their employer and other persons so far as is necessary to enable compliance with health and safety requirements',
      'Step out of the content, restore safety by establishing Mutual Purpose and Mutual Respect, then return to the issue',
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
      'People naturally feel compelled to return favours, helpfulness, or generosity',
      'Clients requesting additional work beyond the original scope, often phrased casually to avoid formal pricing',
      'Non-Violent Communication (NVC), the STATE model, and the assertiveness formula',
      'An I-statement expresses your own feelings and needs ("I feel concerned when..."); a You-statement assigns blame ("You always...")',
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
      "Self-resolve → mediate → formal process → walk away",
      "Competing, collaborating, compromising, avoiding, accommodating",
      "What has changed, why it changed, the cost, and the client's signature",
      "Non-Violent Communication (NVC), the STATE model, and the assertiveness formula",
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
      'What has changed, why it changed, the cost, and the client\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s signature',
      'Viewing situations in only two extreme categories with no middle ground',
      'A customer who has a problem resolved exceptionally well may become more loyal than one who never experienced a problem',
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
      'When preserving the relationship is more important than the specific issue',
      'The right to require the trader to repeat or fix the service at no additional cost',
      'A price reduction, which may be up to 100% of the cost (a full refund)',
      'Competing, collaborating, compromising, avoiding, accommodating',
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
      'An observation describes what happened factually; an evaluation adds judgement or interpretation',
      'A breakdown in relationships including disputes, grievances, and dissatisfaction that affects productivity and wellbeing',
      'Hearing only parts of the conversation that interest you or confirm your existing views',
      'Setting realistic or slightly conservative expectations and then exceeding them through quality, speed, or service',
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
      'It helps you recognise when your habitual response may not suit the situation and consciously choose a better approach',
      'Better technical solutions through challenging assumptions and sharing diverse perspectives',
      'A percentage of each payment withheld by the main contractor until defects are resolved after practical completion',
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
      'It creates a web of mutual referrals, shared knowledge, and collaborative problem-solving that benefits all parties',
      'A legitimate complaint identifies a genuine failure to meet agreed standards; an unreasonable complaint seeks outcomes beyond what was agreed or what is fair',
      'A customer who has a problem resolved exceptionally well may become more loyal than one who never experienced a problem',
      'Direct conversation with the individual, then their supervisor, then site manager, then formal written complaint, then contractual dispute mechanism (adjudication)',
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
      "Regular updates prevent anxiety, build trust, and reduce the likelihood of complaints and disputes",
      "Setting realistic or slightly conservative expectations and then exceeding them through quality, speed, or service",
      "Acknowledging the client's experience and taking ownership of resolving the issue, without making legal admissions of fault",
      "Lower your tone, acknowledge the emotional response, and allow a brief pause before continuing",
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
      'Friendly reminder, formal written reminder, phone call, letter before action, small claims',
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
      'Clearly defining what is included in the agreed work, your working hours, communication expectations, and payment terms',
      'Our beliefs formed at the top of the ladder influence which data we select at the bottom, reinforcing existing biases',
      'Empathic listening seeks to understand the speaker\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s frame of reference, emotions, and underlying needs, not just the content of their words',
      'Setting realistic or slightly conservative expectations and then exceeding them through quality, speed, or service',
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
      'Make a phone call to discuss the situation, check for any dispute about the work, and attempt to agree a payment plan',
      'A customer who has a problem resolved exceptionally well may become more loyal than one who never experienced a problem',
      'Suggesting you both step outside or move to a different room to continue the conversation',
      'The collective understanding created when all parties freely contribute their ideas, opinions, and feelings to the dialogue',
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
      'A notice that must be issued by the payer within a prescribed period, specifying the sum they consider due and the basis on which it is calculated',
      'Take a deliberate pause, use controlled breathing, and if possible request a short break before continuing the discussion',
      'Consistently arriving when promised, completing work on time, and following through on every commitment — large and small',
      'The amount owed, how it was calculated, details of interest/charges, information about free debt advice, and a response deadline',
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
      'There is no documented evidence of the agreed price',
      'Reasonable care and skill, at a reasonable price',
      '8% above Bank of England base rate',
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
      'Following up shows genuine care, confirms the resolution was satisfactory, and can transform a complaint into lasting loyalty',
      'Show the client the signed plan, empathise with their frustration, and offer to move the sockets as priced additional work',
      'Validation means acknowledging someone\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s feelings as understandable; agreement means you share their position',
      'It helps you recognise when your habitual response may not suit the situation and consciously choose a better approach',
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
      'Take a deliberate pause, use controlled breathing, and if possible request a short break before continuing the discussion',
      'Collaborating to find root causes, compromising on non-critical items, and competing only on safety-critical timelines',
      'Acknowledge the request positively, explain it falls outside the original scope, and offer to price it as additional work',
      'A breakdown in relationships including disputes, grievances, and dissatisfaction that affects productivity and wellbeing',
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
      'A notice served by the payer before the final date for payment, stating that they intend to pay less than the notified sum and the reasons why',
      'A feeling is an emotion (frustrated, anxious, relieved); a thought is an interpretation disguised as a feeling ("I feel that you are being unfair")',
      'Situation, Behaviour, Impact — a structured way to give direct, constructive feedback to a team member',
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
      'Lower your tone, acknowledge the emotional response, and allow a brief pause before continuing',
      'To identify your default tendencies in conflict so you can consciously choose more effective responses',
      'Walk both parties back down the ladder to the observable data and rebuild shared meaning from there',
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
      'A duty to cooperate with their employer and other persons so far as is necessary to enable compliance with health and safety requirements',
      'To create realistic expectations about progress, disruption, timeline, and finish quality, reducing the gap between expectation and reality that causes complaints',
      'It creates a web of mutual referrals, shared knowledge, and collaborative problem-solving that benefits all parties',
      'Consistently arriving when promised, completing work on time, and following through on every commitment — large and small',
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
      'When preserving the relationship is more important than the specific issue',
      'People naturally feel compelled to return favours, helpfulness, or generosity',
      'A price reduction, which may be up to 100% of the cost (a full refund)',
      'Ignoring, pretending, selective, attentive, empathic',
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
      'Providing genuine value beyond the contracted scope — such as helpful maintenance advice, energy-saving tips, or pointing out potential issues — without expecting immediate return',
      'A method of placing negative feedback between two positive comments, now considered less effective because it can feel insincere, dilute the message, and train people to brace for criticism whenever they hear praise',
      'An I-statement expresses your own feelings and needs ("I feel concerned when..."); a You-statement assigns blame ("You always...")',
      'An estimate allows flexibility for unforeseen work (hidden junction boxes, asbestos, damaged existing wiring), while a quote locks in a fixed price regardless of what is discovered',
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
      'A statutory fallback scheme that implies payment and adjudication terms into construction contracts that do not already comply with the Construction Act',
      'It is generally prohibited under the Housing Grants, Construction and Regeneration Act 1996 (as amended), except in cases of upstream insolvency',
      'Coordinate the work, plan the sequencing, and ensure that the agreed sequence allows all trades to work safely and efficiently',
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
      "Issue a notice of adjudication to the other party identifying the dispute and the redress sought, then refer the dispute to the nominated adjudicator within 7 days, providing all supporting documentation",
      "Explain the legal requirement for licensed removal, present it as a variation with clear costs, and document the client's refusal if they still decline — then pause work on that element until resolved",
      "A method of placing negative feedback between two positive comments, now considered less effective because it can feel insincere, dilute the message, and train people to brace for criticism whenever they hear praise",
      "To facilitate a structured conversation between the parties, helping them understand each other's perspectives and reach a mutually acceptable resolution",
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
      'Direct conversation with the individual, then their supervisor, then site manager, then formal written complaint, then contractual dispute mechanism (adjudication)',
      '"I\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'ve noticed tools left on the walkway on three occasions this week (observation). I feel worried (feeling) because someone could trip and be seriously injured (need for safety). Would you be willing to use the tool belt and return tools to the kit bag after each use? (request)"',
      'It works best when the original failure was not caused by negligence, the recovery is swift and genuine, and the client perceives the effort as exceptional — it does not apply to repeated failures or serious safety issues',
      'Pause the content discussion, acknowledge the client\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s frustration, reaffirm respect (\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"I understand you\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'re frustrated, and I respect that you\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'re trying to manage your budget carefully\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"), and then use contrasting to separate the concern from the generalisation',
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
      'Questions shift the other person from defensive mode to thinking mode, re-engaging their rational brain',
      'An I-statement expresses your own feelings and needs ("I feel concerned when..."); a You-statement assigns blame ("You always...")',
      'By assessing each conflict situation and deliberately choosing the mode that best fits the context, stakes, and relationship',
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
      'A feeling is an emotion (frustrated, anxious, relieved); a thought is an interpretation disguised as a feeling ("I feel that you are being unfair")',
      'A charge levied by one contractor against another (or by the main contractor) for the cost of rectifying damage or completing work that the other party was responsible for',
      'The main contractor controls access, programme, payment, and future work opportunities, which can make subcontractors reluctant to raise legitimate disputes for fear of consequences',
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
      'To facilitate a structured conversation between the parties, helping them understand each other\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s perspectives and reach a mutually acceptable resolution',
      'Court fees, time investment, enforcement difficulty, relationship damage, and whether the debtor has the means to pay — sometimes a negotiated settlement or write-off is more commercially sensible',
      'By first stating what they don\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t mean ("I\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'m not saying your work is below standard overall") and then what they do mean ("I am saying this particular joint needs attention because it doesn\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t meet the specification")',
      'Document the programme change and its impact, notify the main contractor in writing of any additional costs or delays, and follow up with a formal variation or claim if applicable',
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
      'A feeling is an emotion (frustrated, anxious, relieved); a thought is an interpretation disguised as a feeling ("I feel that you are being unfair")',
      'The right for any party to a construction contract to refer a dispute to an independent adjudicator for a binding decision within 28 days',
      'Apply the HEARD framework: listen fully, empathise genuinely, apologise for the inconvenience, resolve the defect promptly and thoroughly, and follow up to ensure satisfaction',
      'Pulling together the key points of a longer conversation to confirm shared understanding, especially useful at the end of a difficult discussion',
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
      'To create realistic expectations about progress, disruption, timeline, and finish quality, reducing the gap between expectation and reality that causes complaints',
      'The right for any party to a construction contract to refer a dispute to an independent adjudicator for a binding decision within 28 days',
      'An I-statement expresses your own feelings and needs ("I feel concerned when..."); a You-statement assigns blame ("You always...")',
      'Both have valid positions — a quote is generally fixed, but genuinely unforeseeable work can constitute a valid variation, provided it is documented and agreed before proceeding',
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
      'Include the statutory interest entitlement in your terms and conditions, reference it in friendly reminders as a factual statement rather than a threat, and only formally claim it after the letter before action stage',
      'For legitimate complaints, all five steps apply fully; for unreasonable complaints, you Hear and Empathise but the Apologise, Resolve, and Do follow up steps are adapted to maintain boundaries while remaining professional',
      'The main contractor controls access, programme, payment, and future work opportunities, which can make subcontractors reluctant to raise legitimate disputes for fear of consequences',
      'Each trade selects data confirming their existing beliefs about the other, creating mutually reinforcing negative perceptions that become self-fulfilling prophecies',
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
      "Court fees, time investment, enforcement difficulty, relationship damage, and whether the debtor has the means to pay — sometimes a negotiated settlement or write-off is more commercially sensible",
      "Acknowledge the client's concern, explain clearly what was agreed and delivered, maintain professional boundaries, and document the conversation — reviews based on genuine experience are fair, but threats to extort free work should not be rewarded",
      "An estimate allows flexibility for unforeseen work (hidden junction boxes, asbestos, damaged existing wiring), while a quote locks in a fixed price regardless of what is discovered",
      "It introduced the right for the payee's own payment application to become the default payment notice if the payer fails to issue one, strengthened adjudication provisions, and removed the requirement for construction contracts to be in writing",
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
      'The pattern reveals power-based conflict behaviour — they accommodate those with more power, compete with those with less, revealing that their style is driven by power dynamics rather than situational appropriateness, risking apprentice wellbeing and development',
      '"I really value our working relationship and want to continue working with you (Yes). I can\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t do this at the old price because material costs have risen 30% (No). I can offer you a phased approach to spread the cost if that helps (Yes)."',
      'For legitimate complaints, all five steps apply fully; for unreasonable complaints, you Hear and Empathise but the Apologise, Resolve, and Do follow up steps are adapted to maintain boundaries while remaining professional',
      'Explain the legal requirement for licensed removal, present it as a variation with clear costs, and document the client\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s refusal if they still decline — then pause work on that element until resolved',
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
      'The JIB National Working Rules set out agreed terms covering wages, working hours, overtime, travel, and conditions, providing a contractual framework for resolving disputes about these matters in the electrical contracting industry',
      'The pattern reveals power-based conflict behaviour — they accommodate those with more power, compete with those with less, revealing that their style is driven by power dynamics rather than situational appropriateness, risking apprentice wellbeing and development',
      '"I really value our working relationship and want to continue working with you (Yes). I can\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t do this at the old price because material costs have risen 30% (No). I can offer you a phased approach to spread the cost if that helps (Yes)."',
      'The electrician should investigate, identify the water damage as the cause, explain that the fault was caused by an external factor (not workmanship), document the findings, and offer a paid repair while advising the client to address the plumbing issue first',
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
      "It keeps the client informed, manages expectations about the next day's work and disruption, builds trust, prevents anxiety-driven complaints, and creates a record of project communication",
      "The right for any party to a construction contract to refer a dispute to an independent adjudicator for a binding decision within 28 days",
      "Timestamped photographs of the damage, a written description of what was damaged and how, the estimated cost of repair, and a record of the conversation with the dry-liner or their supervisor",
      "A charge levied by one contractor against another (or by the main contractor) for the cost of rectifying damage or completing work that the other party was responsible for",
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
      'Listen empathically to understand the client\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s full concern before responding',
      'Damaged containment or cables caused by other trades working in the same area',
      'When preserving the relationship is more important than the specific issue',
      'It allows problems to fester and grow, often resulting in larger conflicts later',
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
      'Consistently arriving when promised, completing work on time, and following through on every commitment — large and small',
      'Walk both parties back down the ladder to the observable data and rebuild shared meaning from there',
      'Photograph the damage, document the date and time, and then raise the issue directly with the plumber in a calm, professional manner',
      'A feeling is an emotion (frustrated, anxious, relieved); a thought is an interpretation disguised as a feeling ("I feel that you are being unfair")',
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
      'A notice served by the payer before the final date for payment, stating that they intend to pay less than the notified sum and the reasons why',
      'They can request the light fitting be repositioned (right to repair) but cannot withhold a disproportionate amount relative to the defect',
      'It is generally prohibited under the Housing Grants, Construction and Regeneration Act 1996 (as amended), except in cases of upstream insolvency',
      'Attend coordination meetings, agree sequencing in advance, and communicate directly with other trades about shared work areas',
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
      'Pulling together the key points of a longer conversation to confirm shared understanding, especially useful at the end of a difficult discussion',
      'It creates timestamped evidence that can be referenced if the dispute escalates, preventing he-said-she-said arguments',
      'Written contracts, terms and conditions, confirmation emails, and variation order procedures',
      'Questions shift the other person from defensive mode to thinking mode, re-engaging their rational brain',
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
      '"Pay when paid" clauses, which make payment to a subcontractor conditional on the main contractor receiving payment from the client',
      'The right for any party to a construction contract to refer a dispute to an independent adjudicator for a binding decision within 28 days',
      'A charge levied by one contractor against another (or by the main contractor) for the cost of rectifying damage or completing work that the other party was responsible for',
      'Document the incident in writing, including date, time, witnesses, and exact language used, and raise it through the appropriate channels',
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
      'Payment terms including application deadlines, valuation dates, and pay-less notice provisions',
      'A breakdown in relationships including disputes, grievances, and dissatisfaction that affects productivity and wellbeing',
      'Intervene to stop the immediate behaviour if safe to do so, support the apprentice, and report the incident through the appropriate grievance or welfare channels',
      '"Pay when paid" clauses, which make payment to a subcontractor conditional on the main contractor receiving payment from the client',
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
      'An automatic physiological stress response triggered by perceived threats',
      'Situation, Behaviour, Impact — a structured way to give direct, constructive feedback to a team member',
      'Better technical solutions through challenging assumptions and sharing diverse perspectives',
      'A fight-or-flight response that temporarily overrides the rational thinking brain',
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
      'Offensive, intimidating, malicious, or insulting behaviour, or an abuse of power, that undermines, humiliates, or causes physical or emotional harm to someone',
      'The pattern reveals power-based conflict behaviour — they accommodate those with more power, compete with those with less, revealing that their style is driven by power dynamics rather than situational appropriateness, risking apprentice wellbeing and development',
      'A method of placing negative feedback between two positive comments, now considered less effective because it can feel insincere, dilute the message, and train people to brace for criticism whenever they hear praise',
      'Direct conversation with the individual, then their supervisor, then site manager, then formal written complaint, then contractual dispute mechanism (adjudication)',
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
      'Walk both parties back down the ladder to the observable data and rebuild shared meaning from there',
      'A feeling is an emotion (frustrated, anxious, relieved); a thought is an interpretation disguised as a feeling ("I feel that you are being unfair")',
      'No — the Consumer Rights Act covers failure to perform with reasonable care and skill, not change of mind; the sockets were installed as agreed and meet the required standard',
      'A duty to cooperate with their employer and other persons so far as is necessary to enable compliance with health and safety requirements',
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
      'A percentage of each payment withheld by the main contractor until defects are resolved after practical completion',
      'Through demonstrating competence, qualifications, and up-to-date knowledge in their field',
      'It helps you recognise when your habitual response may not suit the situation and consciously choose a better approach',
      'By assessing each conflict situation and deliberately choosing the mode that best fits the context, stakes, and relationship',
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
      'Controlled breathing, lowering your voice, and maintaining open body language',
      'Have a direct, calm conversation with the individual or their supervisor before escalating',
      'People naturally feel compelled to return favours, helpfulness, or generosity',
      'A percentage of each payment withheld by the main contractor until defects are resolved after practical completion',
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
      'Validation means acknowledging someone\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s feelings as understandable; agreement means you share their position',
      'Attend coordination meetings, agree sequencing in advance, and communicate directly with other trades about shared work areas',
      'Providing a structured process for resolving workplace grievances between electrical workers and their employers within the JIB framework',
      'Apply the HEARD framework: listen fully, empathise genuinely, apologise for the inconvenience, resolve the defect promptly and thoroughly, and follow up to ensure satisfaction',
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
      'Each trade selects data confirming their existing beliefs about the other, creating mutually reinforcing negative perceptions that become self-fulfilling prophecies',
      'Collaborating to find root causes, compromising on non-critical items, and competing only on safety-critical timelines',
      'Trust will decrease because high self-orientation (focus on self rather than the client) is the denominator that reduces overall trust',
      'Offensive, intimidating, malicious, or insulting behaviour, or an abuse of power, that undermines, humiliates, or causes physical or emotional harm to someone',
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
      'The main contractor controls access, programme, payment, and future work opportunities, which can make subcontractors reluctant to raise legitimate disputes for fear of consequences',
      'Each trade selects data confirming their existing beliefs about the other, creating mutually reinforcing negative perceptions that become self-fulfilling prophecies',
      'It is generally prohibited under the Housing Grants, Construction and Regeneration Act 1996 (as amended), except in cases of upstream insolvency',
      'Unhealthy responses to feeling unsafe — withdrawing from dialogue (silence) or trying to force meaning into the pool (violence)',
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
      'Take a deliberate pause, use controlled breathing, and if possible request a short break before continuing the discussion',
      'The right for any party to a construction contract to refer a dispute to an independent adjudicator for a binding decision within 28 days',
      'Citizens Advice offers free guidance on consumer and employment rights, while the FSB provides legal advice, mediation support, and business guidance for members',
      'When a colleague on site repeatedly borrows your tools without asking and you need to address it directly without damaging the working relationship',
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
      "Competing, collaborating, compromising, avoiding, accommodating",
      "Viewing situations in only two extreme categories with no middle ground",
      "28 days, extendable to 42 days with the referring party's consent",
      "Yes, but they are difficult to prove if a dispute arises",
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
      'Pulling together the key points of a longer conversation to confirm shared understanding, especially useful at the end of a difficult discussion',
      'Trust will decrease because high self-orientation (focus on self rather than the client) is the denominator that reduces overall trust',
      'Clearly defining what is included in the agreed work, your working hours, communication expectations, and payment terms',
      'A notice that must be issued by the payer within a prescribed period, specifying the sum they consider due and the basis on which it is calculated',
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
      'A notice served by the payer before the final date for payment, stating that they intend to pay less than the notified sum and the reasons why',
      'Each trade selects data confirming their existing beliefs about the other, creating mutually reinforcing negative perceptions that become self-fulfilling prophecies',
      'The right to suspend performance of their obligations, provided they give at least 7 days\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\' written notice of their intention to suspend',
      'Listen fully to understand the specific concern, then offer an independent inspection if agreement cannot be reached',
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
      "Trust will decrease because high self-orientation (focus on self rather than the client) is the denominator that reduces overall trust",
      "The right to suspend performance of their obligations, provided they give at least 7 days' written notice of their intention to suspend",
      "The collective understanding created when all parties freely contribute their ideas, opinions, and feelings to the dialogue",
      "Document the incident in writing, including date, time, witnesses, and exact language used, and raise it through the appropriate channels",
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
      'Empathic listening seeks to understand the speaker\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s frame of reference, emotions, and underlying needs, not just the content of their words',
      'It creates open communication channels where queries about compliance can be resolved collaboratively before they become formal objections',
      'A statutory fallback scheme that implies payment and adjudication terms into construction contracts that do not already comply with the Construction Act',
      'Unhealthy responses to feeling unsafe — withdrawing from dialogue (silence) or trying to force meaning into the pool (violence)',
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
      'Attend coordination meetings, agree sequencing in advance, and communicate directly with other trades about shared work areas',
      'To facilitate a structured conversation between the parties, helping them understand each other\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s perspectives and reach a mutually acceptable resolution',
      'Providing genuine value beyond the contracted scope — such as helpful maintenance advice, energy-saving tips, or pointing out potential issues — without expecting immediate return',
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
      'The right to suspend performance of their obligations, provided they give at least 7 days\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\' written notice of their intention to suspend',
      'Timestamped photographs of the damage, a written description of what was damaged and how, the estimated cost of repair, and a record of the conversation with the dry-liner or their supervisor',
      'When a colleague on site repeatedly borrows your tools without asking and you need to address it directly without damaging the working relationship',
      '"Looking at the last six invoices, the average payment time has been 47 days against our 30-day terms. The last three payments were received at 52, 48, and 61 days respectively."',
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
      'Both have valid positions — a quote is generally fixed, but genuinely unforeseeable work can constitute a valid variation, provided it is documented and agreed before proceeding',
      'A feeling is an emotion (frustrated, anxious, relieved); a thought is an interpretation disguised as a feeling ("I feel that you are being unfair")',
      'Document the programme change and its impact, notify the main contractor in writing of any additional costs or delays, and follow up with a formal variation or claim if applicable',
      'A charge levied by one contractor against another (or by the main contractor) for the cost of rectifying damage or completing work that the other party was responsible for',
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
      "Following up shows genuine care, confirms the resolution was satisfactory, and can transform a complaint into lasting loyalty",
      "Show the client the signed plan, empathise with their frustration, and offer to move the sockets as priced additional work",
      "An I-statement expresses your own feelings and needs (\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"I feel concerned when...\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"); a You-statement assigns blame (\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You always...\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\")",
      "To facilitate a structured conversation between the parties, helping them understand each other's perspectives and reach a mutually acceptable resolution",
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
      'Use the SBI model in a private setting: describe the specific situation, the behaviour you observed, and the impact on safety, then agree corrective action together',
      'The amount owed, how it was calculated, details of interest/charges, information about free debt advice, and a response deadline',
      'Empathic listening seeks to understand the speaker\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s frame of reference, emotions, and underlying needs, not just the content of their words',
      'By assessing each conflict situation and deliberately choosing the mode that best fits the context, stakes, and relationship',
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
      'Understating your true opinion, using sarcasm, or sugarcoating to avoid speaking directly',
      'Coordinate the work, plan the sequencing, and ensure that the agreed sequence allows all trades to work safely and efficiently',
      'Pause to create space between the stimulus and their response, then choose a measured approach',
      'The collective understanding created when all parties freely contribute their ideas, opinions, and feelings to the dialogue',
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
      'By first stating what they don\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t mean ("I\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'m not saying your work is below standard overall") and then what they do mean ("I am saying this particular joint needs attention because it doesn\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t meet the specification")',
      'For legitimate complaints, all five steps apply fully; for unreasonable complaints, you Hear and Empathise but the Apologise, Resolve, and Do follow up steps are adapted to maintain boundaries while remaining professional',
      'The JIB National Working Rules set out agreed terms covering wages, working hours, overtime, travel, and conditions, providing a contractual framework for resolving disputes about these matters in the electrical contracting industry',
      'A method of placing negative feedback between two positive comments, now considered less effective because it can feel insincere, dilute the message, and train people to brace for criticism whenever they hear praise',
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
      'Following up shows genuine care, confirms the resolution was satisfactory, and can transform a complaint into lasting loyalty',
      'It creates timestamped evidence that can be referenced if the dispute escalates, preventing he-said-she-said arguments',
      'Offensive, intimidating, malicious, or insulting behaviour, or an abuse of power, that undermines, humiliates, or causes physical or emotional harm to someone',
      'Intervene to stop the immediate behaviour if safe to do so, support the apprentice, and report the incident through the appropriate grievance or welfare channels',
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
      'The notice must be in writing, specify the ground(s) for suspension (non-payment of a sum due), allow at least 7 days before suspension takes effect, and identify the date payment was due',
      '"Looking at the last six invoices, the average payment time has been 47 days against our 30-day terms. The last three payments were received at 52, 48, and 61 days respectively."',
      'It keeps the client informed, manages expectations about the next day\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s work and disruption, builds trust, prevents anxiety-driven complaints, and creates a record of project communication',
      'A feeling is an emotion (frustrated, anxious, relieved); a thought is an interpretation disguised as a feeling ("I feel that you are being unfair")',
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
      'A legitimate complaint identifies a genuine failure to meet agreed standards; an unreasonable complaint seeks outcomes beyond what was agreed or what is fair',
      'No — "pay when paid" clauses are banned by the Construction Act 1996; the main contractor must pay the subcontractor regardless of whether they have been paid by the client',
      'The collective understanding created when all parties freely contribute their ideas, opinions, and feelings to the dialogue',
      'Intervene to stop the immediate behaviour if safe to do so, support the apprentice, and report the incident through the appropriate grievance or welfare channels',
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
      'Explain the legal requirement for licensed removal, present it as a variation with clear costs, and document the client\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s refusal if they still decline — then pause work on that element until resolved',
      'No — "pay when paid" clauses are banned by the Construction Act 1996; the main contractor must pay the subcontractor regardless of whether they have been paid by the client',
      'Gather evidence (original drawings, site instructions, photographs), respond formally in writing disputing the back-charge with supporting documentation, and issue a pay-less notice or formal objection under the contract terms',
      'Each trade selects data confirming their existing beliefs about the other, creating mutually reinforcing negative perceptions that become self-fulfilling prophecies',
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
      'The electrician should investigate, identify the water damage as the cause, explain that the fault was caused by an external factor (not workmanship), document the findings, and offer a paid repair while advising the client to address the plumbing issue first',
      'No — the Consumer Rights Act covers failure to perform with reasonable care and skill, not change of mind; the sockets were installed as agreed and meet the required standard',
      'The employer must investigate the grievance promptly, take the allegations seriously, follow the ACAS Code of Practice on grievance procedures, protect the apprentice from victimisation, and take appropriate action based on the findings',
      'Issue a notice of adjudication to the other party identifying the dispute and the redress sought, then refer the dispute to the nominated adjudicator within 7 days, providing all supporting documentation',
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
      'Meet each person individually to understand their perspective using the SBI model, then mediate a joint conversation to identify the underlying issues, agree behavioural expectations, and follow up regularly to ensure improvement',
      'No — "pay when paid" clauses are banned by the Construction Act 1996; the main contractor must pay the subcontractor regardless of whether they have been paid by the client',
      'A method of placing negative feedback between two positive comments, now considered less effective because it can feel insincere, dilute the message, and train people to brace for criticism whenever they hear praise',
      'Acknowledge the client\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s concern, explain clearly what was agreed and delivered, maintain professional boundaries, and document the conversation — reviews based on genuine experience are fair, but threats to extort free work should not be rewarded',
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
      "Include the statutory interest entitlement in your terms and conditions, reference it in friendly reminders as a factual statement rather than a threat, and only formally claim it after the letter before action stage",
      "It introduced the right for the payee's own payment application to become the default payment notice if the payer fails to issue one, strengthened adjudication provisions, and removed the requirement for construction contracts to be in writing",
      "Explain the legal requirement for licensed removal, present it as a variation with clear costs, and document the client's refusal if they still decline — then pause work on that element until resolved",
      "It keeps the client informed, manages expectations about the next day's work and disruption, builds trust, prevents anxiety-driven complaints, and creates a record of project communication",
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
      'The pattern reveals power-based conflict behaviour — they accommodate those with more power, compete with those with less, revealing that their style is driven by power dynamics rather than situational appropriateness, risking apprentice wellbeing and development',
      'A charge levied by one contractor against another (or by the main contractor) for the cost of rectifying damage or completing work that the other party was responsible for',
      'The employer must investigate the grievance promptly, take the allegations seriously, follow the ACAS Code of Practice on grievance procedures, protect the apprentice from victimisation, and take appropriate action based on the findings',
      '"I\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'ve noticed tools left on the walkway on three occasions this week (observation). I feel worried (feeling) because someone could trip and be seriously injured (need for safety). Would you be willing to use the tool belt and return tools to the kit bag after each use? (request)"',
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
      'Document the programme change and its impact, notify the main contractor in writing of any additional costs or delays, and follow up with a formal variation or claim if applicable',
      'Providing genuine value beyond the contracted scope — such as helpful maintenance advice, energy-saving tips, or pointing out potential issues — without expecting immediate return',
      'By first stating what they don\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t mean ("I\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'m not saying your work is below standard overall") and then what they do mean ("I am saying this particular joint needs attention because it doesn\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t meet the specification")',
      'The main contractor need only pay £4,000 as stated in the pay-less notice for now; the electrician can refer the dispute to adjudication to challenge the pay-less notice and recover the difference if the adjudicator finds in their favour',
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
      "Meet each person individually using the SBI model to understand their perspective, then facilitate a joint discussion where both parties share their concerns, identify underlying interests (skills development, recognition, fairness), and collaboratively agree a fair rotation or allocation that addresses both people's needs",
      "Pause the content discussion, acknowledge the client's frustration, reaffirm respect (\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"I understand you're frustrated, and I respect that you're trying to manage your budget carefully\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"), and then use contrasting to separate the concern from the generalisation",
      "The electrician should investigate, identify the water damage as the cause, explain that the fault was caused by an external factor (not workmanship), document the findings, and offer a paid repair while advising the client to address the plumbing issue first",
      "The main contractor need only pay £4,000 as stated in the pay-less notice for now; the electrician can refer the dispute to adjudication to challenge the pay-less notice and recover the difference if the adjudicator finds in their favour",
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
      'Payment terms including application deadlines, valuation dates, and pay-less notice provisions',
      'To prevent disputes about what work was and was not included in the agreed price',
      'When an immediate safety hazard needs to be addressed without delay',
      'How we unconsciously move from observing data to making assumptions and taking action',
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
      'The right to require the trader to repeat or fix the service at no additional cost',
      'It helps you recognise when your habitual response may not suit the situation and consciously choose a better approach',
      'A quote is a fixed price the contractor is bound to, while an estimate is an approximate cost that may vary',
      'By assessing each conflict situation and deliberately choosing the mode that best fits the context, stakes, and relationship',
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
      '£35 to £455, depending on the claim value',
      'Team members wearing different coloured PPE',
      'Imagining the worst-case scenario and treating it as certain or likely',
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
      'Between stimulus and response there is a space where we can choose our reaction',
      'Payment terms including application deadlines, valuation dates, and pay-less notice provisions',
      'They provide timestamped, tamper-evident proof that both parties agreed to the terms',
      'Clients requesting additional work beyond the original scope, often phrased casually to avoid formal pricing',
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
      'Intervene to stop the immediate behaviour if safe to do so, support the apprentice, and report the incident through the appropriate grievance or welfare channels',
      'Clients requesting additional work beyond the original scope, often phrased casually to avoid formal pricing',
      'It is generally prohibited under the Housing Grants, Construction and Regeneration Act 1996 (as amended), except in cases of upstream insolvency',
      'A notice that must be issued by the payer within a prescribed period, specifying the sum they consider due and the basis on which it is calculated',
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
      'Payment terms including application deadlines, valuation dates, and pay-less notice provisions',
      'Walk both parties back down the ladder to the observable data and rebuild shared meaning from there',
      'When an immediate safety hazard needs to be addressed without delay',
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
      'Pause to create space between the stimulus and their response, then choose a measured approach',
      'Describe behaviour, express feelings, state impact, request change',
      'The Positive No (Yes-No-Yes), creating a firm but respectful repetition pattern',
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
      'By assessing each conflict situation and deliberately choosing the mode that best fits the context, stakes, and relationship',
      'Questions shift the other person from defensive mode to thinking mode, re-engaging their rational brain',
      'Better technical solutions through challenging assumptions and sharing diverse perspectives',
      'Validating that the person is upset without conceding that their position is correct',
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
      'Step out of the content, restore safety by establishing Mutual Purpose and Mutual Respect, then return to the issue',
      'Constructive conflict leads to better ideas and outcomes; destructive conflict damages relationships and productivity',
      'Listen carefully without interrupting, giving the client space to express their frustration',
      'Hearing only parts of the conversation that interest you or confirm your existing views',
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
      'A don\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t/do statement that addresses concerns about your intentions and confirms your actual purpose',
      'Because a single satisfied client can generate years of repeat business, referrals, and recommendations worth far more than any individual job',
      'It creates a web of mutual referrals, shared knowledge, and collaborative problem-solving that benefits all parties',
      'Take a deliberate pause, use controlled breathing, and if possible request a short break before continuing the discussion',
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
      'Document the incident in writing, including date, time, witnesses, and exact language used, and raise it through the appropriate channels',
      'Listen fully to understand the specific concern, then offer an independent inspection if agreement cannot be reached',
      'Each trade selects data confirming their existing beliefs about the other, creating mutually reinforcing negative perceptions that become self-fulfilling prophecies',
      'A notice served by the payer before the final date for payment, stating that they intend to pay less than the notified sum and the reasons why',
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
      'For non-urgent conflicts, wait 24 hours before responding to allow emotions to settle',
      'When preserving the relationship is more important than the specific issue',
      'Payment terms including application deadlines, valuation dates, and pay-less notice provisions',
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
      'People naturally feel compelled to return favours, helpfulness, or generosity',
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
      'Our beliefs formed at the top of the ladder influence which data we select at the bottom, reinforcing existing biases',
      'Because a single satisfied client can generate years of repeat business, referrals, and recommendations worth far more than any individual job',
      'Citizens Advice offers free guidance on consumer and employment rights, while the FSB provides legal advice, mediation support, and business guidance for members',
      'A legitimate complaint identifies a genuine failure to meet agreed standards; an unreasonable complaint seeks outcomes beyond what was agreed or what is fair',
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
      'Our beliefs formed at the top of the ladder influence which data we select at the bottom, reinforcing existing biases',
      'Show the client the signed plan, empathise with their frustration, and offer to move the sockets as priced additional work',
      'Consistently arriving when promised, completing work on time, and following through on every commitment — large and small',
      'Issue a claim through the Small Claims Court (part of the County Court) for the disputed amount',
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
      'It is generally prohibited under the Housing Grants, Construction and Regeneration Act 1996 (as amended), except in cases of upstream insolvency',
      '"It sounds like you\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'re feeling frustrated because the timeline has been pushed back again"',
      'The collective understanding created when all parties freely contribute their ideas, opinions, and feelings to the dialogue',
      'It creates a web of mutual referrals, shared knowledge, and collaborative problem-solving that benefits all parties',
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
      'Trust will decrease because high self-orientation (focus on self rather than the client) is the denominator that reduces overall trust',
      'Situation, Behaviour, Impact — a structured way to give direct, constructive feedback to a team member',
      'To identify your default tendencies in conflict so you can consciously choose more effective responses',
      'A percentage of each payment withheld by the main contractor until defects are resolved after practical completion',
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
      'Gather evidence (original drawings, site instructions, photographs), respond formally in writing disputing the back-charge with supporting documentation, and issue a pay-less notice or formal objection under the contract terms',
      'Providing genuine value beyond the contracted scope — such as helpful maintenance advice, energy-saving tips, or pointing out potential issues — without expecting immediate return',
      'Unhealthy responses to feeling unsafe — withdrawing from dialogue (silence) or trying to force meaning into the pool (violence)',
      '"Looking at the last six invoices, the average payment time has been 47 days against our 30-day terms. The last three payments were received at 52, 48, and 61 days respectively."',
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
      'No — the Consumer Rights Act covers failure to perform with reasonable care and skill, not change of mind; the sockets were installed as agreed and meet the required standard',
      'The two conditions that must be present for people to feel safe enough to engage in honest dialogue',
      'It creates open communication channels where queries about compliance can be resolved collaboratively before they become formal objections',
      'The amount owed, how it was calculated, details of interest/charges, information about free debt advice, and a response deadline',
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
      'To prevent disputes about what work was and was not included in the agreed price',
      'A request allows the other person to say no without punishment; a demand carries implicit or explicit consequences for refusal',
      'Regular updates prevent anxiety, build trust, and reduce the likelihood of complaints and disputes',
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
      'Mediate → formal process → self-resolve → walk away',
      'Self-resolve → mediate → formal process → walk away',
      'Formal process → walk away → mediate → self-resolve',
      'Walk away → mediate → self-resolve → formal process',
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
      'Collaborating to find root causes, compromising on non-critical items, and competing only on safety-critical timelines',
      'A don\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t/do statement that addresses concerns about your intentions and confirms your actual purpose',
      'An observation describes what happened factually; an evaluation adds judgement or interpretation',
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
      'Simple, immediately implementable changes that significantly reduce conflict risk — such as always sending a confirmation text after phone agreements',
      'A legitimate complaint identifies a genuine failure to meet agreed standards; an unreasonable complaint seeks outcomes beyond what was agreed or what is fair',
      'Our beliefs formed at the top of the ladder influence which data we select at the bottom, reinforcing existing biases',
      'A statutory fallback scheme that implies payment and adjudication terms into construction contracts that do not already comply with the Construction Act',
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
      'Step out of the content, restore safety by establishing Mutual Purpose and Mutual Respect, then return to the issue',
      'Issue a claim through the Small Claims Court (part of the County Court) for the disputed amount',
      'Constructive conflict leads to better ideas and outcomes; destructive conflict damages relationships and productivity',
      'Walk both parties back down the ladder to the observable data and rebuild shared meaning from there',
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
      'A request allows the other person to say no without punishment; a demand carries implicit or explicit consequences for refusal',
      'The gradual expansion of work beyond the original agreement, often through small additions that individually seem minor',
      'Citizens Advice offers free guidance on consumer and employment rights, while the FSB provides legal advice, mediation support, and business guidance for members',
      'Our beliefs formed at the top of the ladder influence which data we select at the bottom, reinforcing existing biases',
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
      'The gradual expansion of work beyond the original agreement, often through small additions that individually seem minor',
      'Our beliefs formed at the top of the ladder influence which data we select at the bottom, reinforcing existing biases',
      'Listen fully to understand the specific concern, then offer an independent inspection if agreement cannot be reached',
      'When a colleague on site repeatedly borrows your tools without asking and you need to address it directly without damaging the working relationship',
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
      'A clear escalation ladder with defined trigger points for when to move from self-resolution to mediation, from mediation to formal processes, and from formal processes to walking away',
      'Document the incident in writing, including date, time, witnesses, and exact language used, and raise it through the appropriate channels',
      'Each trade selects data confirming their existing beliefs about the other, creating mutually reinforcing negative perceptions that become self-fulfilling prophecies',
      'Empathic listening seeks to understand the speaker\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s frame of reference, emotions, and underlying needs, not just the content of their words',
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
