/**
 * Mentoring & Developing Others Mock Exam Question Bank
 *
 * 200 questions covering 5 categories (40 per module) with difficulty distribution.
 *
 * Categories (5):
 *   How People Learn (40) | The Mentor's Toolkit (40) | Supporting Apprentices (40) |
 *   Assessment & Evaluation (40) | Challenging Situations (40)
 *
 * Difficulty per category: ~16 basic, ~16 intermediate, ~8 advanced
 */

import { StandardMockQuestion, MockExamConfig } from '@/types/standardMockExam';
import { getRandomQuestionsBalanced } from '@/utils/questionSelection';

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------
export const mdCategories = [
  'How People Learn',
  'The Mentor\u2019s Toolkit',
  'Supporting Apprentices',
  'Assessment & Evaluation',
  'Challenging Situations',
];

// ---------------------------------------------------------------------------
// Exam configuration
// ---------------------------------------------------------------------------
export const mdMockExamConfig: MockExamConfig = {
  examId: 'mentoring-developing-others',
  examTitle: 'Mentoring & Developing Others Mock Examination',
  totalQuestions: 20,
  timeLimit: 1800,
  passThreshold: 80,
  exitPath: '/study-centre/personal-development/md-module-6',
  categories: mdCategories,
};

// ---------------------------------------------------------------------------
// Random question selector
// ---------------------------------------------------------------------------
export const getRandomMDExamQuestions = (numQuestions: number = 20) => {
  return getRandomQuestionsBalanced(mdQuestionBank, numQuestions, mdCategories);
};

// ---------------------------------------------------------------------------
// Question Bank — 200 questions
// ---------------------------------------------------------------------------
export const mdQuestionBank: StandardMockQuestion[] = [
  // =======================================================================
  // HOW PEOPLE LEARN — 40 questions (id 1–40)
  // =======================================================================

  // --- basic (16) ---
  {
    id: 1,
    question:
      'Which educational theorist is most closely associated with the concept of andragogy — the theory of adult learning?',
    options: [
      'Lev Vygotsky',
      'Malcolm Knowles',
      'David Kolb',
      'Benjamin Bloom',
    ],
    correctAnswer: 1,
    explanation:
      'Malcolm Knowles developed the theory of andragogy in the 1970s, identifying six key principles that distinguish how adults learn from how children learn. His work remains the foundation of adult education practice.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Andragogy',
    category: 'How People Learn',
  },
  {
    id: 2,
    question:
      'How many principles of adult learning did Knowles identify in his theory of andragogy?',
    options: [
      'Four',
      'Eight',
      'Six',
      'Three',
    ],
    correctAnswer: 2,
    explanation:
      'Knowles identified six principles of andragogy: the need to know why, the role of experience, self-direction, readiness to learn, problem-centred orientation, and internal motivation.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Andragogy',
    category: 'How People Learn',
  },
  {
    id: 3,
    question: 'In Knowles\u2019 andragogy, what does the principle of "need to know" mean?',
    options: [
      'Adults learn best when they do not know what is coming next in the whole session',
      'Adults need to know the name of the awarding body and the qualification they are taking',
      'Adults must be told exactly what questions will be on the exam before they start',
      'Adults need to understand why they are learning something before they engage with it',
    ],
    correctAnswer: 3,
    explanation:
      'The "need to know" principle states that adults need to understand the relevance and purpose of what they are learning before they will fully engage. A mentor should always explain why a topic matters before teaching it.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Andragogy',
    category: 'How People Learn',
  },
  {
    id: 4,
    question:
      'What is the correct order of the four stages in Kolb\u2019s Experiential Learning Cycle?',
    options: [
      'Concrete Experience \u2192 Reflective Observation \u2192 Abstract Conceptualisation \u2192 Active Experimentation',
      'Reflective Observation \u2192 Concrete Experience \u2192 Active Experimentation \u2192 Abstract Conceptualisation',
      'Abstract Conceptualisation \u2192 Active Experimentation \u2192 Concrete Experience \u2192 Reflective Observation',
      'Active Experimentation \u2192 Abstract Conceptualisation \u2192 Reflective Observation \u2192 Concrete Experience',
    ],
    correctAnswer: 0,
    explanation:
      'Kolb (1984) described the cycle as: Concrete Experience (doing), Reflective Observation (reviewing), Abstract Conceptualisation (concluding), and Active Experimentation (planning next steps).',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Kolb',
    category: 'How People Learn',
  },
  {
    id: 5,
    question:
      'Which learning style in the Honey and Mumford model describes someone who learns best by jumping straight in and trying things?',
    options: [
      'Reflector',
      'Activist',
      'Theorist',
      'Pragmatist',
    ],
    correctAnswer: 1,
    explanation:
      'Activists learn by doing. They enjoy hands-on experience and prefer to get stuck in rather than read about something first. On site, they want to pick up the tools immediately.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Honey & Mumford',
    category: 'How People Learn',
  },
  {
    id: 6,
    question:
      'Bloom\u2019s Taxonomy arranges cognitive skills in a hierarchy. Which level is at the bottom (simplest)?',
    options: [
      'Analyse',
      'Understand',
      'Remember',
      'Apply',
    ],
    correctAnswer: 2,
    explanation:
      'Bloom\u2019s Taxonomy (revised 2001) progresses from Remember \u2192 Understand \u2192 Apply \u2192 Analyse \u2192 Evaluate \u2192 Create, with Remember being the simplest cognitive level.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Bloom',
    category: 'How People Learn',
  },
  {
    id: 7,
    question: 'What does ZPD stand for in Vygotsky\u2019s learning theory?',
    options: [
      'Zone of Practical Demonstration',
      'Zone of Personal Discovery',
      'Zone of Progressive Difficulty',
      'Zone of Proximal Development',
    ],
    correctAnswer: 3,
    explanation:
      'The Zone of Proximal Development describes the gap between what a learner can do independently and what they can achieve with guidance from a more experienced person.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Vygotsky ZPD',
    category: 'How People Learn',
  },
  {
    id: 8,
    question: 'Who coined the term "scaffolding" in the context of learning support?',
    options: [
      'Wood, Bruner and Ross (1976)',
      'Lev Vygotsky (1934)',
      'Jean Piaget (1952)',
      'Albert Bandura (1977)',
    ],
    correctAnswer: 0,
    explanation:
      'The term scaffolding was introduced by Wood, Bruner and Ross in 1976. Although scaffolding builds on Vygotsky\u2019s ZPD concept, Vygotsky himself never used the word scaffolding.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Scaffolding',
    category: 'How People Learn',
  },
  {
    id: 9,
    question:
      'In Hersey and Blanchard\u2019s Situational Leadership model, what does the S1 (Directing) style involve?',
    options: [
      'Low task direction, high relationship support',
      'High task direction, low relationship support',
      'High task direction, high relationship support',
      'Low task direction, low relationship support',
    ],
    correctAnswer: 1,
    explanation:
      'S1 Directing involves high task-focused behaviour with clear instructions and close supervision. It is appropriate for learners at the R1 readiness level who are new to the task and need step-by-step guidance.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Situational Leadership',
    category: 'How People Learn',
  },
  {
    id: 10,
    question:
      'What are the three basic psychological needs identified by Deci and Ryan\u2019s Self-Determination Theory?',
    options: [
      'Knowledge, understanding, and attitude',
      'Security, belonging, and self-esteem',
      'Autonomy, competence, and relatedness',
      'Direction, encouragement, and delegation',
    ],
    correctAnswer: 2,
    explanation:
      'Self-Determination Theory (Deci and Ryan, 1985) identifies autonomy (sense of choice), competence (feeling capable), and relatedness (feeling connected) as the three needs that drive intrinsic motivation.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Self-Determination Theory',
    category: 'How People Learn',
  },
  {
    id: 11,
    question:
      'Which term describes motivation that comes from within the learner, such as personal satisfaction or curiosity?',
    options: [
      'External regulation',
      'Conditional motivation',
      'Extrinsic motivation',
      'Intrinsic motivation',
    ],
    correctAnswer: 3,
    explanation:
      'Intrinsic motivation arises from internal factors such as interest, enjoyment, or a sense of achievement. It is generally more sustainable than extrinsic motivation, which relies on external rewards or punishments.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Motivation',
    category: 'How People Learn',
  },
  {
    id: 12,
    question: 'Carol Dweck\u2019s research distinguishes between which two types of mindset?',
    options: [
      'Growth mindset and fixed mindset',
      'Open mindset and closed mindset',
      'Positive mindset and negative mindset',
      'Learning mindset and performance mindset',
    ],
    correctAnswer: 0,
    explanation:
      'Dweck (2006) identified two mindsets: a growth mindset (believing abilities can be developed through effort) and a fixed mindset (believing abilities are innate and unchangeable).',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Growth Mindset',
    category: 'How People Learn',
  },
  {
    id: 13,
    question:
      'Which section of the Health and Safety at Work etc. Act 1974 places a duty on employers to provide information, instruction, training, and supervision?',
    options: [
      'Section 7',
      'Section 2(2)(c)',
      'Section 3',
      'Section 37',
    ],
    correctAnswer: 1,
    explanation:
      'Section 2(2)(c) of HSWA 1974 specifically requires employers to provide such information, instruction, training, and supervision as is necessary to ensure the health and safety of employees at work.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Legislation',
    category: 'How People Learn',
  },
  {
    id: 14,
    question: 'What does the term "pedagogy" refer to?',
    options: [
      'A structured coaching conversation framework',
      'A method of assessing workplace competence',
      'The art and science of teaching children',
      'The theory and practice of adult learning',
    ],
    correctAnswer: 2,
    explanation:
      'Pedagogy is the study of how children learn. It is teacher-directed, with the instructor deciding what, when, and how content is delivered. Andragogy, by contrast, focuses on adult learning.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Pedagogy vs Andragogy',
    category: 'How People Learn',
  },
  {
    id: 15,
    question:
      'Which Honey and Mumford learning style prefers to stand back, observe, and think before acting?',
    options: [
      'Theorist',
      'Activist',
      'Pragmatist',
      'Reflector',
    ],
    correctAnswer: 3,
    explanation:
      'Reflectors prefer to observe and think things through before acting. They like to gather data, consider different perspectives, and reach a considered conclusion before committing to action.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Honey & Mumford',
    category: 'How People Learn',
  },
  {
    id: 16,
    question:
      'At which level of Maslow\u2019s hierarchy must basic needs like food, shelter, and safety be met before higher learning can occur?',
    options: [
      'Physiological and safety needs (levels 1 and 2)',
      'Esteem and self-actualisation needs (levels 4 and 5)',
      'Love and belonging needs (level 3)',
      'Cognitive and aesthetic needs (the extended hierarchy)',
    ],
    correctAnswer: 0,
    explanation:
      'Maslow\u2019s hierarchy states that basic physiological needs and safety needs must be met before a person can focus on higher-order needs such as learning and self-fulfilment. A cold, hungry, or anxious apprentice cannot learn effectively.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Maslow',
    category: 'How People Learn',
  },

  // --- intermediate (16) ---
  {
    id: 17,
    question:
      'A mature apprentice who retrained from plumbing brings significant practical experience. Which Knowles principle is most relevant when planning their learning?',
    options: [
      'Internal motivation \u2014 they do not need any external support',
      'Experience as a resource \u2014 build on what they already know',
      'Need to know \u2014 explain every regulation from scratch',
      'Self-direction \u2014 leave them completely unsupervised',
    ],
    correctAnswer: 1,
    explanation:
      'Knowles\u2019 principle of experience as a resource recognises that adults bring a wealth of prior knowledge. A career-changer from plumbing already understands pipework, basic safety, and tool use, which should be acknowledged and built upon.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Andragogy',
    category: 'How People Learn',
  },
  {
    id: 18,
    question:
      'An apprentice completes a ring final circuit (concrete experience) but skips the debrief. According to Kolb, what stage of learning have they missed?',
    options: [
      'Concrete Experience',
      'Active Experimentation',
      'Reflective Observation',
      'Abstract Conceptualisation',
    ],
    correctAnswer: 2,
    explanation:
      'Without a debrief, the apprentice misses Reflective Observation \u2014 the stage where they review what happened, consider what went well, and identify areas for improvement. Skipping this stage means learning remains superficial.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Kolb',
    category: 'How People Learn',
  },
  {
    id: 19,
    question:
      'A Theorist learner (Honey and Mumford) is struggling to engage with practical wiring tasks. What approach would help them most?',
    options: [
      'Start with the practical task and then link the theory to what they experienced on site',
      'Give them a checklist of steps to follow without explaining the reasoning',
      'Pair them with an Activist and let them copy what they do',
      'Explain the underlying theory and regulation references before the practical task',
    ],
    correctAnswer: 3,
    explanation:
      'Theorists need to understand the logic and principles behind what they are doing. Providing BS 7671 references, circuit diagrams, and a clear explanation of why something works before the practical task will help them engage.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Honey & Mumford',
    category: 'How People Learn',
  },
  {
    id: 20,
    question:
      'Asking an apprentice "What instrument would you use to test insulation resistance?" targets which level of Bloom\u2019s Taxonomy?',
    options: [
      'Remember',
      'Understand',
      'Apply',
      'Analyse',
    ],
    correctAnswer: 0,
    explanation:
      'This question asks the apprentice to recall a specific fact (the name of the instrument), which is the Remember level \u2014 the simplest cognitive skill in Bloom\u2019s Taxonomy.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Bloom',
    category: 'How People Learn',
  },
  {
    id: 21,
    question:
      'A Stage 1 apprentice can wire a socket with step-by-step guidance but cannot do it independently. Where does this task sit in relation to Vygotsky\u2019s ZPD?',
    options: [
      'Below the ZPD \u2014 already mastered',
      'Within the Zone of Proximal Development',
      'Above the ZPD \u2014 too difficult even with help',
      'Outside the ZPD \u2014 unrelated to their learning',
    ],
    correctAnswer: 1,
    explanation:
      'The ZPD is the space between what a learner can do independently and what they cannot do even with help. If the apprentice can complete the task with guidance, it falls within the ZPD \u2014 the ideal zone for learning.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Vygotsky ZPD',
    category: 'How People Learn',
  },
  {
    id: 22,
    question:
      'Which of the six functions of scaffolding (Wood, Bruner and Ross) involves showing the learner what a good outcome looks like?',
    options: [
      'Frustration control',
      'Recruitment',
      'Demonstration',
      'Direction maintenance',
    ],
    correctAnswer: 2,
    explanation:
      'Demonstration involves modelling the desired outcome so the learner has a clear picture of what success looks like. On site, this means showing the apprentice a correctly wired circuit before they attempt their own.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Scaffolding',
    category: 'How People Learn',
  },
  {
    id: 23,
    question:
      'In Situational Leadership, which style is most appropriate for an apprentice who is competent but has lost confidence after a mistake?',
    options: [
      'S2 Coaching',
      'S1 Directing',
      'S4 Delegating',
      'S3 Supporting',
    ],
    correctAnswer: 3,
    explanation:
      'S3 Supporting involves low task direction but high relationship support. The apprentice has the skill (competence) but needs encouragement and confidence-building (support) to regain their self-belief.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Situational Leadership',
    category: 'How People Learn',
  },
  {
    id: 24,
    question:
      'An apprentice says "I\u2019ll never understand three-phase." According to Dweck, what type of mindset does this statement reflect?',
    options: [
      'Fixed mindset',
      'Pragmatic mindset',
      'Neutral mindset',
      'Growth mindset',
    ],
    correctAnswer: 0,
    explanation:
      'A fixed mindset sees ability as innate and unchangeable. The mentor should reframe this as "You haven\u2019t understood three-phase yet" to encourage a growth mindset that sees effort as the path to mastery.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Growth Mindset',
    category: 'How People Learn',
  },
  {
    id: 25,
    question:
      'Which regulation specifically requires principal contractors to ensure training is provided on construction sites?',
    options: [
      'HSWA 1974 Section 7',
      'CDM 2015 Regulation 13',
      'EWR 1989 Regulation 16',
      'MHSWR 1999 Regulation 3',
    ],
    correctAnswer: 1,
    explanation:
      'CDM 2015 Regulation 13 places duties on principal contractors regarding the provision of information, instruction, and training to workers on construction sites.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Legislation',
    category: 'How People Learn',
  },
  {
    id: 26,
    question:
      'Dyslexia is a common barrier to learning in construction. Which approach would best support a dyslexic apprentice?',
    options: [
      'Insist all written evidence is completed unaided, so that the apprentice builds resilience and improves their spelling under real pressure',
      'Lower the competence standard expected of the apprentice, so that fewer written records are needed for the qualification to be signed off',
      'Use practical demonstrations, verbal explanations, and professional discussions instead of relying heavily on written materials',
      'Ask the college to exempt the apprentice from the inspection and testing units, because those units carry the heaviest written workload',
    ],
    correctAnswer: 2,
    explanation:
      'Dyslexic learners often excel in practical and verbal contexts. Adapting assessment methods to include professional discussion and using visual/practical demonstrations supports their learning without lowering standards.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Barriers to Learning',
    category: 'How People Learn',
  },
  {
    id: 27,
    question:
      'Allowing an apprentice to choose which room to wire first on a domestic rewire supports which element of Self-Determination Theory?',
    options: [
      'Extrinsic motivation',
      'Competence',
      'Relatedness',
      'Autonomy',
    ],
    correctAnswer: 3,
    explanation:
      'Autonomy is the sense of having choice and control over one\u2019s actions. Offering even small choices within a structured task increases the learner\u2019s sense of ownership and intrinsic motivation.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Self-Determination Theory',
    category: 'How People Learn',
  },
  {
    id: 28,
    question:
      'Which stage of Kolb\u2019s cycle involves the learner forming general principles or rules from their experience?',
    options: [
      'Abstract Conceptualisation',
      'Reflective Observation',
      'Concrete Experience',
      'Active Experimentation stage',
    ],
    correctAnswer: 0,
    explanation:
      'Abstract Conceptualisation is where the learner draws conclusions and forms theories or principles from their reflected experience. For example, "I now understand that conductor size must match the protective device rating because of Regulation 433.1."',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Kolb',
    category: 'How People Learn',
  },
  {
    id: 29,
    question:
      'The process of gradually removing support as a learner becomes more competent is known as what?',
    options: [
      'Scaffolding',
      'Fading',
      'Directing',
      'Modelling',
    ],
    correctAnswer: 1,
    explanation:
      'Fading is the systematic withdrawal of scaffolding as the learner demonstrates increasing competence and independence. The mentor reduces their input step by step rather than removing all support at once.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Scaffolding',
    category: 'How People Learn',
  },
  {
    id: 30,
    question:
      'An apprentice is highly motivated by practical wiring but completely disengaged by classroom theory. What is the best initial strategy?',
    options: [
      'Skip the theory altogether and sign the knowledge units off from site work instead',
      'Deliver the full theory lecture first and withhold every tool until it can be recited back',
      'Start with the practical task and then link the theory to what they experienced on site',
      'Warn them the college will fail them unless their attitude in class improves very quickly',
    ],
    correctAnswer: 2,
    explanation:
      'This approach uses Kolb\u2019s cycle — starting with concrete experience and then linking theory to practice. It also respects the adult learning principle that learning should be problem-centred and relevant.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Motivation',
    category: 'How People Learn',
  },
  {
    id: 31,
    question: 'What does MHSWR 1999 Regulation 13 require employers to consider?',
    options: [
      'The minimum number of trained first aiders required on each and every site',
      'The maximum number of hours an apprentice may be asked to work each week',
      'The provision of personal protective equipment free of any charge to staff',
      'Employees\u2019 capabilities and training needs when allocating tasks',
    ],
    correctAnswer: 3,
    explanation:
      'MHSWR 1999 Regulation 13 requires employers to take into account employees\u2019 capabilities, including their training, knowledge, and experience, when entrusting them with tasks.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Legislation',
    category: 'How People Learn',
  },
  {
    id: 32,
    question:
      'Scheduling theory training for first thing in the morning rather than after a 10-hour shift addresses which barrier to learning?',
    options: [
      'Fatigue and reduced concentration',
      'Zone of Proximal Development',
      'Abstract Conceptualisation',
      'Current competence and required competence',
    ],
    correctAnswer: 0,
    explanation:
      'Fatigue significantly reduces the ability to concentrate and retain new information. Scheduling demanding learning activities when learners are fresh maximises their capacity to engage with the content.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Barriers to Learning',
    category: 'How People Learn',
  },

  // --- advanced (8) ---
  {
    id: 33,
    question:
      'A mentor is teaching earth fault loop impedance testing. At which level of Bloom\u2019s Taxonomy would the question "Is this Zs reading acceptable for a BS 88 fuse protecting this circuit?" sit?',
    options: [
      'Analyse',
      'Evaluate',
      'Apply',
      'Remember',
    ],
    correctAnswer: 1,
    explanation:
      'Evaluating requires the learner to make a judgement based on criteria. They must compare the measured Zs value against the maximum permitted value from BS 7671 tables and determine whether the circuit is safe.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'Bloom',
    category: 'How People Learn',
  },
  {
    id: 34,
    question:
      'A mentor uses S4 Delegating with a Stage 1 apprentice on their first consumer unit change. Why is this approach problematic?',
    options: [
      'The apprentice is at R4 readiness, so delegation is the correct choice and no change is needed at all',
      'S4 Delegating is the wrong style here only because a first consumer unit change is not safety-critical',
      'The apprentice is at R1 readiness and needs S1 Directing — full step-by-step guidance and close supervision',
      'S3 Supporting would be a better choice because the apprentice has the skill but simply lacks confidence in it',
    ],
    correctAnswer: 2,
    explanation:
      'Situational Leadership requires matching the leadership style to the learner\u2019s readiness level. A Stage 1 apprentice on a new, complex task is at R1 — they need high direction and close supervision, not delegation.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'Situational Leadership',
    category: 'How People Learn',
  },
  {
    id: 35,
    question:
      'An apprentice consistently skips the Reflective Observation stage after practical work. What is the most likely long-term consequence?',
    options: [
      'There is no consequence — reflection is optional in Kolb\u2019s model',
      'They will become more efficient because reflection only ever wastes time on site',
      'They will develop a Theorist learning style quite naturally over time on site',
      'They will repeat the same mistakes because they never analyse what happened',
    ],
    correctAnswer: 3,
    explanation:
      'Kolb\u2019s cycle requires all four stages for complete learning. Without reflection, the learner cannot identify errors, draw conclusions, or plan improvements. They are likely to repeat mistakes and develop ingrained bad habits.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'Kolb',
    category: 'How People Learn',
  },
  {
    id: 36,
    question:
      'How do the six functions of scaffolding (Wood, Bruner and Ross) map onto practical mentoring of a consumer unit installation?',
    options: [
      'Recruitment (engage interest), reduction in degrees of freedom (break into steps), direction maintenance (keep on track), marking critical features (highlight safety-critical points), frustration control (manage difficulty), demonstration (show correct technique)',
      'Goal (agree the outcome the apprentice wants from the job), Reality (assess honestly what they can already do), Options (explore several ways of approaching the work together), and Will (commit to actions and a review date) at each step of the consumer unit install',
      'Concrete experience (fit the consumer unit), reflective observation (review honestly how the job actually went), abstract conceptualisation (draw out the general principles behind it), and active experimentation (plan and try the next install differently)',
      'Reaction (did they enjoy the task on the day), Learning (did they grasp the underlying principles), Behaviour (are they applying it unprompted on site), and Results (have rework and callback rates fallen) measured over the weeks following the consumer unit install',
    ],
    correctAnswer: 0,
    explanation:
      'All six scaffolding functions apply directly to practical mentoring. For example, marking critical features means highlighting safety-critical steps like isolation verification, while frustration control means breaking the task into achievable chunks.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'Scaffolding',
    category: 'How People Learn',
  },
  {
    id: 37,
    question:
      'A 45-year-old career-changer from plumbing resists being taught basic tool use, saying "I\u2019ve been in the trade for 20 years." Which combination of Knowles\u2019 principles should the mentor apply?',
    options: [
      'Need to know (explain each basic tool from scratch) and readiness (wait until they ask you for help themselves first)',
      'Experience as a resource (acknowledge their skills) and self-direction (involve them in planning their learning)',
      'Problem-centred focus (teach only when something goes wrong) and internal motivation (offer no encouragement at all)',
      'Self-direction (leave them to work it out alone) and experience (set their plumbing background to one side entirely)',
    ],
    correctAnswer: 1,
    explanation:
      'The mentor should acknowledge the learner\u2019s extensive experience while involving them in planning their development. This respects their autonomy and uses their prior knowledge as a foundation for new electrical skills.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'Andragogy',
    category: 'How People Learn',
  },
  {
    id: 38,
    question:
      'According to Self-Determination Theory, what happens when a mentor removes all choice from a learner\u2019s tasks?',
    options: [
      'It has no effect at all, because autonomy only matters outside work',
      'Motivation increases because the learner has less to think about',
      'Intrinsic motivation decreases because the need for autonomy is unmet',
      'Extrinsic motivation permanently replaces all forms of intrinsic motivation',
    ],
    correctAnswer: 2,
    explanation:
      'When autonomy is thwarted, intrinsic motivation suffers. Deci and Ryan\u2019s research shows that people become less engaged and more reliant on external pressure when they feel they have no control over their actions.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'Self-Determination Theory',
    category: 'How People Learn',
  },
  {
    id: 39,
    question:
      'A mentor wants to move an apprentice from "understands conductor sizing theory" to "can select the correct conductor independently on a new circuit." Which Bloom\u2019s transition is this?',
    options: [
      'Analyse to Evaluate',
      'Remember to Understand',
      'Apply to Analyse',
      'Understand to Apply',
    ],
    correctAnswer: 3,
    explanation:
      'Moving from understanding a concept to independently applying it in a new situation represents the transition from Bloom\u2019s Understand level to the Apply level. This requires supervised practice opportunities.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'Bloom',
    category: 'How People Learn',
  },
  {
    id: 40,
    question:
      'Construction culture sometimes includes a "machismo" attitude that discourages asking for help. Which psychological barrier does this create and how should a mentor address it?',
    options: [
      'Fear of appearing incompetent \u2014 normalise questions by modelling curiosity and admitting your own past mistakes',
      'Fixed mindset — tell the apprentice that asking any questions shows weakness, so that they toughen up quickly on site',
      'Fatigue — schedule every coaching conversation at the end of a long shift, so that endurance is built up over time',
      'Cognitive overload — deliver as much information as possible at once and then see how much of it happens to stick at all',
    ],
    correctAnswer: 0,
    explanation:
      'Machismo culture creates psychological barriers where learners fear looking weak. Mentors should normalise learning by openly discussing their own mistakes and creating an environment where questions are valued, not ridiculed.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'Barriers to Learning',
    category: 'How People Learn',
  },

  // =======================================================================
  // THE MENTOR'S TOOLKIT — 40 questions (id 41–80)
  // =======================================================================

  // --- basic (16) ---
  {
    id: 41,
    question: 'What do the four letters in the GROW coaching model stand for?',
    options: [
      'Guidance, Reflection, Observation, Working',
      'Goal, Reality, Options, Will/Way Forward',
      'Goal, Reflection, Outcome, Wrap-up Actions',
      'Guiding, Reality, Objectives, Willingness',
    ],
    correctAnswer: 1,
    explanation:
      'The GROW model, developed by Sir John Whitmore, Graham Alexander, and Alan Fine in the 1980s, structures coaching conversations into four stages: Goal, Reality, Options, and Will (or Way Forward).',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'GROW Model',
    category: 'The Mentor\u2019s Toolkit',
  },
  {
    id: 42,
    question: 'Who is most closely associated with the GROW coaching model?',
    options: [
      'Malcolm Knowles',
      'Abraham Maslow',
      'Sir John Whitmore',
      'David Kolb',
    ],
    correctAnswer: 2,
    explanation:
      'Sir John Whitmore popularised the GROW model through his influential book "Coaching for Performance" (1992). The model was co-developed with Graham Alexander and Alan Fine in the 1980s.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'GROW Model',
    category: 'The Mentor\u2019s Toolkit',
  },
  {
    id: 43,
    question: 'What is the key difference between mentoring and coaching?',
    options: [
      'There is no real difference at all \u2014 they are simply two words for the same thing',
      'Mentoring uses nothing but questions, whereas coaching uses only direct instructions',
      'Mentoring is only for apprentices, whereas coaching is only for fully qualified electricians',
      'Mentoring is long-term and relationship-based; coaching is shorter-term and goal-focused',
    ],
    correctAnswer: 3,
    explanation:
      'Mentoring is typically a longer-term, holistic relationship where the mentor shares their experience. Coaching tends to be shorter-term, focused on specific goals, and uses questions to help the learner find their own solutions.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Mentoring vs Coaching',
    category: 'The Mentor\u2019s Toolkit',
  },
  {
    id: 44,
    question:
      'Which type of question encourages a full, detailed response rather than a simple yes or no?',
    options: [
      'Open question',
      'Leading question',
      'Closed question',
      'Rhetorical question',
    ],
    correctAnswer: 0,
    explanation:
      'Open questions (such as "How did the first fix go?" or "What would you do differently?") encourage the learner to think and explain, providing richer information than a closed yes/no question.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Questioning Techniques',
    category: 'The Mentor\u2019s Toolkit',
  },
  {
    id: 45,
    question: 'In Pendleton\u2019s Rules for giving feedback, who speaks first?',
    options: [
      'The observer gives all of their feedback first',
      'The learner reflects on their own performance first',
      'The line manager delivers the final verdict first of all',
      'A written observation report is read aloud to them first',
    ],
    correctAnswer: 1,
    explanation:
      'Pendleton\u2019s Rules start with the learner reflecting on their own performance. This empowers the learner, develops self-awareness, and often means they identify the same issues the observer noticed.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Pendleton',
    category: 'The Mentor\u2019s Toolkit',
  },
  {
    id: 46,
    question: 'What does the SBI feedback model stand for?',
    options: [
      'Skill, Behaviour, Improvement',
      'Standard, Baseline, Indicator',
      'Situation, Behaviour, Impact',
      'Summary, Background, Instruction',
    ],
    correctAnswer: 2,
    explanation:
      'The SBI model structures feedback around the specific Situation (when/where), the observable Behaviour (what they did), and the Impact (what effect it had). This keeps feedback factual and non-judgemental.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'SBI Model',
    category: 'The Mentor\u2019s Toolkit',
  },
  {
    id: 47,
    question: 'The Johari Window was created by which two psychologists?',
    options: [
      'Joseph Whitmore and Graham Alexander',
      'Honey and Mumford',
      'Joseph Luft and Carl Rogers',
      'Joseph Luft and Harrington Ingham',
    ],
    correctAnswer: 3,
    explanation:
      'The Johari Window was created by Joseph Luft and Harrington Ingham in 1955. The name "Johari" comes from combining their first names: Jo(seph) and Hari(ngton).',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Johari Window',
    category: 'The Mentor\u2019s Toolkit',
  },
  {
    id: 48,
    question:
      'Which quadrant of the Johari Window represents things that others can see about you but you cannot see yourself?',
    options: [
      'Blind spot',
      'Hidden area',
      'Open area',
      'Unknown area',
    ],
    correctAnswer: 0,
    explanation:
      'The Blind Spot quadrant contains information that others know about you but you are unaware of. Feedback from mentors and colleagues helps reduce the blind spot and expand self-awareness.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Johari Window',
    category: 'The Mentor\u2019s Toolkit',
  },
  {
    id: 49,
    question: 'Amy Edmondson\u2019s research is most closely associated with which concept?',
    options: [
      'Experiential learning',
      'Psychological safety',
      'Self-determination',
      'Growth mindset',
    ],
    correctAnswer: 1,
    explanation:
      'Amy Edmondson (1999) defined psychological safety as a shared belief that the team is safe for interpersonal risk-taking. In mentoring, it means the learner feels safe to admit mistakes, ask questions, and be honest.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Psychological Safety',
    category: 'The Mentor\u2019s Toolkit',
  },
  {
    id: 50,
    question: 'When should a mentor use directive instruction rather than a coaching approach?',
    options: [
      'When the learner has the skill but has lost confidence after a mistake',
      'When the learner is highly experienced and prefers to plan their own work',
      'In safety-critical situations where the learner could be harmed',
      'When there is plenty of time and no immediate pressure on the task',
    ],
    correctAnswer: 2,
    explanation:
      'Safety-critical situations always require directive instruction. If someone is about to do something dangerous, you tell them to stop. Coaching questions are for development, not emergencies.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Coaching vs Directing',
    category: 'The Mentor\u2019s Toolkit',
  },
  {
    id: 51,
    question: 'What is the main purpose of a mentoring agreement?',
    options: [
      'To create a legally binding contract that can be enforced in an employment tribunal by either party',
      'To record the apprentice\u2019s NVQ evidence and assessment decisions for the college and awarding body',
      'To replace the need for regular one-to-one meetings between the mentor and the mentee altogether',
      'To set clear expectations, goals, boundaries, and review dates for the mentoring relationship',
    ],
    correctAnswer: 3,
    explanation:
      'A mentoring agreement clarifies what both parties expect, how often they will meet, what goals they are working towards, and how progress will be reviewed. It is not legally binding but provides structure.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Mentoring Agreement',
    category: 'The Mentor\u2019s Toolkit',
  },
  {
    id: 52,
    question: 'The "funnel technique" in questioning moves from what to what?',
    options: [
      'Broad, open questions to specific, focused questions',
      'Closed, narrow questions to broad, open questions',
      'Easy questions through to difficult trick questions',
      'Written questions through to verbal, spoken questions',
    ],
    correctAnswer: 0,
    explanation:
      'The funnel technique starts with broad, open questions (e.g. "How did the first fix go?") and progressively narrows to specific, targeted questions (e.g. "Where exactly did the continuity test fail?").',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Questioning Techniques',
    category: 'The Mentor\u2019s Toolkit',
  },
  {
    id: 53,
    question: 'What does "praise in public, correct in private" mean in the context of feedback?',
    options: [
      'Only ever give any feedback when other team members are present to witness it',
      'Give positive feedback in front of others but deliver constructive feedback one-to-one',
      'Praise the learner privately so they do not become complacent in front of peers on site',
      'Deliver all feedback in writing so there is a permanent record for both parties on file',
    ],
    correctAnswer: 1,
    explanation:
      'Recognising good work publicly boosts confidence and models expected standards. Corrective feedback should be given privately to protect the learner\u2019s dignity and encourage honest discussion.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Feedback',
    category: 'The Mentor\u2019s Toolkit',
  },
  {
    id: 54,
    question: 'What is the highest level of listening in Covey\u2019s five levels?',
    options: [
      'Selective listening',
      'Attentive listening',
      'Empathic listening',
      'Pretending to listen',
    ],
    correctAnswer: 2,
    explanation:
      'Covey\u2019s five levels progress from ignoring, pretending, selective listening, attentive listening, to empathic listening. Empathic listening means truly understanding the speaker\u2019s perspective and feelings.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Active Listening',
    category: 'The Mentor\u2019s Toolkit',
  },
  {
    id: 55,
    question: 'Which ILM qualification focuses specifically on coaching and mentoring skills?',
    options: [
      'ILM Level 2 Award in Leadership and Team Skills',
      'ILM Level 5 Diploma in Principal Engineering',
      'ILM Level 3 Award in Health and Safety in the Workplace',
      'ILM Level 2/3 Award or Certificate in Coaching and Mentoring',
    ],
    correctAnswer: 3,
    explanation:
      'The ILM Level 2 Award and Level 3 Certificate in Coaching and Mentoring are the standard qualifications for developing coaching and mentoring competence in workplace settings.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'ILM',
    category: 'The Mentor\u2019s Toolkit',
  },
  {
    id: 56,
    question: 'Role modelling by a mentor is best described as which principle?',
    options: [
      '"Do as I do" is more powerful than "do as I say"',
      'Mentors should never demonstrate practical skills',
      'Role modelling only applies in a classroom',
      'The mentee should copy everything the mentor does without question',
    ],
    correctAnswer: 0,
    explanation:
      'Mentors who consistently demonstrate good practice (always isolating before working, always wearing PPE, always testing) teach more powerfully through their actions than through words alone.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Role Modelling',
    category: 'The Mentor\u2019s Toolkit',
  },

  // --- intermediate (16) ---
  {
    id: 57,
    question:
      'During a GROW conversation about AM2 preparation, the "Reality" stage would involve which type of discussion?',
    options: [
      'Agreeing the specific, time-bound target the apprentice wants to reach on the AM2, and the date they want to reach it by',
      'Honestly assessing the apprentice\u2019s current skill level, identifying gaps, and acknowledging what they can already do',
      'Brainstorming every possible way the apprentice could prepare, including evening study, practice papers and college support',
      'Committing to specific actions, agreeing how many practice papers are done each week, and fixing dates to review progress',
    ],
    correctAnswer: 1,
    explanation:
      'The Reality stage explores the current situation honestly. For AM2, this means identifying which skills are strong, which need development, and what obstacles exist, before moving to Options.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'GROW Model',
    category: 'The Mentor\u2019s Toolkit',
  },
  {
    id: 58,
    question:
      'A mentor uses Socratic questioning to help an apprentice work out why an RCD trips. What is the purpose of this approach?',
    options: [
      'To save the mentor the time that a full explanation of the fault and of its cause would take on site',
      'To keep pressing the apprentice with questions until they are uncomfortable enough to guess at an answer',
      'To guide the apprentice to discover the answer through their own reasoning rather than being told',
      'To check whether the apprentice has memorised the chapter and regulation numbers in BS 7671 by heart',
    ],
    correctAnswer: 2,
    explanation:
      'Socratic questioning guides learners to think critically and discover answers themselves. This deeper processing leads to better understanding and retention than simply being given the answer.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Questioning Techniques',
    category: 'The Mentor\u2019s Toolkit',
  },
  {
    id: 59,
    question:
      'Following a safe isolation observation, a mentor uses Pendleton\u2019s Rules. The apprentice says "I think I locked off correctly but forgot to post the warning notice." What should the observer do next?',
    options: [
      'Immediately tell the apprentice everything they did wrong before they say any more about it',
      'Move straight to writing up the observation record without further discussion with the learner',
      'Ask the apprentice to repeat the whole isolation procedure from the start again before saying anything',
      'Agree with the positives the learner identified, then add any further positives the learner missed',
    ],
    correctAnswer: 3,
    explanation:
      'In Pendleton\u2019s Rules, after the learner reflects, the observer adds any positives the learner missed. Only after positives are fully explored do both parties move to discussing areas for improvement.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Pendleton',
    category: 'The Mentor\u2019s Toolkit',
  },
  {
    id: 60,
    question:
      'Using the SBI model, how would you give feedback about loose terminal connections found during an inspection?',
    options: [
      '"During yesterday\u2019s socket installation (S), I noticed three terminals were not tightened to the correct torque (B), which could cause overheating and a fire risk (I)"',
      '"You are always so careless with your terminations, it lets the whole team down, and frankly I am getting fed up of having to repeat myself to you every week on this job"',
      '"Your work today was fine on the whole, but you really need to concentrate harder in future, because everything on this job has to be right first time, every time on this site"',
      '"I have raised loose terminals with you before, so this time it is going in writing, and I will be copying the site manager, the training officer and the office in on it as well"',
    ],
    correctAnswer: 0,
    explanation:
      'The SBI model separates the Situation (when/where), Behaviour (what specifically happened), and Impact (the consequence). This keeps feedback factual, specific, and non-personal.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'SBI Model',
    category: 'The Mentor\u2019s Toolkit',
  },
  {
    id: 61,
    question:
      'An apprentice admits they wired a circuit incorrectly because they feel safe telling their mentor about mistakes. This demonstrates which concept?',
    options: [
      'Growth mindset (Dweck)',
      'Psychological safety (Edmondson)',
      'Self-determination (Deci and Ryan)',
      'Scaffolding (Wood, Bruner and Ross)',
    ],
    correctAnswer: 1,
    explanation:
      'Psychological safety means the apprentice trusts that admitting errors will lead to learning, not punishment. Edmondson\u2019s research shows this is essential for honest communication and effective development.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Psychological Safety',
    category: 'The Mentor\u2019s Toolkit',
  },
  {
    id: 62,
    question:
      'A mentoring relationship typically goes through four phases. What is the correct order?',
    options: [
      'Introduction, growth, plateau, decline',
      'Planning, doing, reviewing, ending',
      'Forming, establishing, developing, closing',
      'Assessment, training, evaluation, termination',
    ],
    correctAnswer: 2,
    explanation:
      'The mentoring relationship lifecycle progresses from Forming (getting to know each other), Establishing (setting goals and expectations), Developing (the main working phase), to Closing (reflecting and transitioning).',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Mentoring Relationship',
    category: 'The Mentor\u2019s Toolkit',
  },
  {
    id: 63,
    question:
      'A mentor discovers their apprentice has been working live without isolating. This must be reported rather than kept confidential. Why?',
    options: [
      'The mentoring agreement states that nothing should ever be kept confidential between the two parties',
      'The apprentice has not signed a confidentiality clause, so nothing is private between the two of them',
      'Reporting it protects the mentor from any disciplinary action by the employer or the awarding body',
      'Safety concerns override confidentiality \u2014 there is a risk of serious injury or death',
    ],
    correctAnswer: 3,
    explanation:
      'While mentoring relationships involve confidentiality, safety is the absolute limit. Working live without isolation creates an immediate risk of electrocution. The mentor must report this to protect the apprentice and others.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Confidentiality',
    category: 'The Mentor\u2019s Toolkit',
  },
  {
    id: 64,
    question:
      'The "feedback sandwich" (positive-negative-positive) is commonly used but has a significant weakness. What is it?',
    options: [
      'Learners anticipate the pattern and dismiss the positives as insincere padding around the real message',
      'Awarding bodies forbid its use in written records, so it works only in a face-to-face review on site',
      'It removes any need for the mentor to raise the development point during the conversation at all',
      'It obliges the mentor to give three separate criticisms in one sitting rather than one point of development',
    ],
    correctAnswer: 0,
    explanation:
      'Research shows that learners quickly learn the pattern and start ignoring the opening praise, waiting for the "but." This undermines the value of genuine positive feedback and can feel manipulative.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Feedback',
    category: 'The Mentor\u2019s Toolkit',
  },
  {
    id: 65,
    question: 'The RASA framework for listening stands for what?',
    options: [
      'Record, Analyse, Summarise, Action',
      'Receive, Appreciate, Summarise, Ask',
      'Repeat, Acknowledge, Suggest, Advise',
      'Receive, Acknowledge, Restate, Advise',
    ],
    correctAnswer: 1,
    explanation:
      'RASA (Julian Treasure) stands for Receive (pay attention), Appreciate (show you are listening), Summarise (reflect back what you heard), Ask (follow up with questions). It supports active listening in mentoring.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Active Listening',
    category: 'The Mentor\u2019s Toolkit',
  },
  {
    id: 66,
    question: 'How does giving feedback expand the "Open" quadrant of the Johari Window?',
    options: [
      'It moves information from the Hidden area (known to self but not to others) into the Open area',
      'It moves information from the Unknown area straight into the Open area without any feedback at all',
      'It moves information from the Blind Spot (known to others but not to self) into the Open area',
      'It shrinks the Open area by moving shared information into the Hidden area of the Johari Window',
    ],
    correctAnswer: 2,
    explanation:
      'When someone receives feedback, things they were unaware of (blind spots) become known to them, expanding the Open quadrant. This increases mutual understanding between mentor and mentee.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Johari Window',
    category: 'The Mentor\u2019s Toolkit',
  },
  {
    id: 67,
    question:
      'A mentor always isolates the supply before working, even for "quick jobs." What aspect of mentoring does this demonstrate?',
    options: [
      'Scaffolding \u2014 temporarily supporting the apprentice until they can isolate alone',
      'Direct instruction \u2014 telling the apprentice exactly which steps to follow on the job',
      'Fading \u2014 gradually withdrawing support as the apprentice becomes more competent on site',
      'Role modelling \u2014 demonstrating correct practice through consistent personal behaviour',
    ],
    correctAnswer: 3,
    explanation:
      'Role modelling means consistently demonstrating the standards you expect from others. When a mentor always isolates, the apprentice learns that safe isolation is non-negotiable, regardless of how quick the job is.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Role Modelling',
    category: 'The Mentor\u2019s Toolkit',
  },
  {
    id: 68,
    question: 'During a noisy site environment, which active listening strategy is most important?',
    options: [
      'Move to a quieter area before having a development conversation',
      'Raise your voice and keep the conversation as brief as possible',
      'Carry on the conversation while continuing to work so no time is lost',
      'Ask the apprentice to email their concerns instead of talking',
    ],
    correctAnswer: 0,
    explanation:
      'Effective listening requires being able to hear clearly. On construction sites, moving to a quieter area (site cabin, van, or quieter section) shows the apprentice that the conversation is valued and ensures nothing is missed.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Active Listening',
    category: 'The Mentor\u2019s Toolkit',
  },
  {
    id: 69,
    question: 'In the GROW model, the "Options" stage involves which activity?',
    options: [
      'An end-point assessment that confirms whether the learner has achieved the required standard',
      'Brainstorming all possible ways forward without immediately judging their feasibility',
      'Specific areas for development, measurable targets, a timeline, and who will provide support',
      'Coordinating between employer, college, and apprentice to ensure learning progresses',
    ],
    correctAnswer: 1,
    explanation:
      'The Options stage is about generating possibilities. The mentor helps the learner think creatively about all available approaches before evaluating them. Judging too early shuts down creative thinking.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'GROW Model',
    category: 'The Mentor\u2019s Toolkit',
  },
  {
    id: 70,
    question: 'Which approach is classified as "instructing" rather than mentoring or coaching?',
    options: [
      'Asking open questions to help someone find their own solution to it',
      'Sharing your career experience over a long-term relationship',
      'Giving step-by-step directions for a safety-critical procedure',
      'Observing silently and then providing feedback on the whole task',
    ],
    correctAnswer: 2,
    explanation:
      'Instructing is directive and prescriptive \u2014 "Do this, then this, then this." It is essential for safety-critical procedures where the learner must follow exact steps. It is not the same as coaching or mentoring.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Mentoring vs Coaching',
    category: 'The Mentor\u2019s Toolkit',
  },
  {
    id: 71,
    question: 'What should a mentoring agreement typically include?',
    options: [
      'A guaranteed pass on the AM2 end-point assessment taken at the end of the apprenticeship',
      'The apprentice\u2019s full medical history and personal financial details and bank records',
      'A fixed list of disciplinary penalties for missed targets and late attendance at college',
      'Expectations, meeting frequency, goals, confidentiality boundaries, and review dates',
    ],
    correctAnswer: 3,
    explanation:
      'A mentoring agreement sets the framework for the relationship. It covers what both parties expect, how often they will meet, what they are working towards, what is confidential, and when they will review progress.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Mentoring Agreement',
    category: 'The Mentor\u2019s Toolkit',
  },
  {
    id: 72,
    question:
      'A closed question such as "Did you test the circuit?" is most useful in which situation?',
    options: [
      'When you need a specific factual confirmation, especially for safety-critical checks',
      'When you want the apprentice to reflect deeply on how a task went on the day',
      'When you are exploring the root cause of a recurring mistake with the apprentice',
      'When you want the apprentice to brainstorm several possible solutions to a wiring fault',
    ],
    correctAnswer: 0,
    explanation:
      'Closed questions are useful when you need a clear yes/no answer, particularly for safety-critical confirmations. However, they should be balanced with open questions for development conversations.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Questioning Techniques',
    category: 'The Mentor\u2019s Toolkit',
  },

  // --- advanced (8) ---
  {
    id: 73,
    question:
      'An apprentice is about to energise a circuit they believe is dead but has not tested with a voltage indicator. Should the mentor use a coaching question or a directive instruction?',
    options: [
      'Coaching question \u2014 ask "What do you think you should do before energising?" to develop their reasoning',
      'Directive instruction \u2014 stop the apprentice immediately because there is an imminent safety risk',
      'Coaching question \u2014 let them energise it, then debrief what went wrong afterwards',
      'Open question \u2014 ask how confident they feel about the circuit being dead',
    ],
    correctAnswer: 1,
    explanation:
      'This is a safety-critical situation with immediate risk of electrocution. The mentor must intervene directly and stop the apprentice. Coaching questions are for development \u2014 not for preventing imminent danger.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Coaching vs Directing',
    category: 'The Mentor\u2019s Toolkit',
  },
  {
    id: 74,
    question:
      'A mentor uses Pendleton\u2019s Rules after observing a consumer unit installation. The apprentice identifies several positives but fails to mention a critical error (cross-polarity on one circuit). How should the mentor proceed?',
    options: [
      'Say nothing at all about the cross-polarity to avoid denting the apprentice\'s confidence, and quietly correct the circuit yourself afterwards',
      'Interrupt the self-reflection to name the cross-polarity straight away, before the apprentice has finished working through the positives out loud on site',
      'After the learner finishes, add any positives they missed, then when moving to improvements, highlight the cross-polarity as a serious safety issue',
      'Record the installation as competent because the apprentice identified several positives, and note the cross-polarity to raise on the next job instead',
    ],
    correctAnswer: 2,
    explanation:
      'Pendleton\u2019s Rules have the observer add positives after the learner, then the learner identifies improvements, then the observer adds further suggestions. The cross-polarity must be raised \u2014 the observer stage ensures critical issues are not missed.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Pendleton',
    category: 'The Mentor\u2019s Toolkit',
  },
  {
    id: 75,
    question:
      'A team consistently avoids reporting near-misses on site. Using Edmondson\u2019s framework, what is the root cause and what should the mentor do?',
    options: [
      'Laziness — the team cannot be bothered to fill the forms in. The mentor should make reporting compulsory, audit the numbers weekly, and penalise anyone who fails to comply',
      'High psychological safety — the team is so comfortable that near-misses no longer feel worth mentioning. The mentor should simply raise the monthly reporting target instead',
      'Poor training — nobody on the team knows what a near-miss actually is. The mentor should run one toolbox talk on the definition and treat the problem as closed after it',
      'Low psychological safety \u2014 the team fears blame. The mentor should model openness by sharing their own mistakes and ensuring reports lead to learning, not punishment',
    ],
    correctAnswer: 3,
    explanation:
      'When people do not report near-misses, it is almost always because they fear consequences. Building psychological safety means creating an environment where reporting leads to problem-solving, not blame.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Psychological Safety',
    category: 'The Mentor\u2019s Toolkit',
  },
  {
    id: 76,
    question:
      'How would you structure a complete GROW conversation to help an apprentice who is struggling with inspection and testing theory?',
    options: [
      'Goal: "Pass the I&T knowledge test within 6 weeks." Reality: "Currently scoring 40% on practice tests." Options: "Evening study, mentor-led revision, practice papers, college support." Will: "Two practice papers per week, mentor review every Friday."',
      'Will: "Pass the I&T knowledge test within 6 weeks." Goal: "Currently scoring 40% on practice tests." Reality: "Evening study, mentor-led revision, practice papers, college support." Options: "Two practice papers per week, mentor review every Friday on site."',
      'Reality: "Pass the I&T knowledge test within 6 weeks." Goal: "Two practice papers per week, reviewed every Friday." Options: "Currently scoring 40% on practice tests." Will: "Evening study, mentor-led revision, or maybe some college support in the evenings."',
      'Goal: "Get better at inspection and testing at some point." Reality: "The theory is hard and most people struggle with it." Options: "Keep revising and see how it goes." Will: "Read a bit more when there is time and hope it clicks on the day of the exam."',
    ],
    correctAnswer: 0,
    explanation:
      'A well-structured GROW conversation moves through all four stages systematically. The Goal is specific and time-bound, Reality is honest, Options are brainstormed together, and Will commits to specific actions.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'GROW Model',
    category: 'The Mentor\u2019s Toolkit',
  },
  {
    id: 77,
    question:
      'An apprentice\u2019s Johari Window has a very large Hidden area. What does this suggest and how should the mentor respond?',
    options: [
      'The apprentice has a very large Blind Spot. The mentor should give steady factual feedback using the SBI model until those habits become visible to them on site',
      'The apprentice is withholding information, possibly due to low trust. The mentor should build rapport and create psychological safety to encourage self-disclosure',
      'The apprentice has a very large Open area. The mentor should keep the sessions purely task-focused, as communication between them is already strong enough',
      'The apprentice has untapped potential in the Unknown area. The mentor should set progressively harder tasks in order to expose what nobody has yet seen out on site',
    ],
    correctAnswer: 1,
    explanation:
      'A large Hidden area means the apprentice knows things about themselves that they are not sharing. This often indicates low trust. Building rapport, being non-judgemental, and modelling openness encourages self-disclosure over time.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Johari Window',
    category: 'The Mentor\u2019s Toolkit',
  },
  {
    id: 78,
    question:
      'An apprentice rushes through testing procedures but is unaware of this habit. Using the Johari Window, where does this behaviour sit and what should the mentor do?',
    options: [
      'In the Hidden area — the apprentice knows full well that they rush but chooses not to mention it to the mentor out on the job',
      'In the Unknown area — neither the apprentice nor the mentor is aware of it, so it can surface only by chance during the observation',
      'In the Blind Spot \u2014 the mentor should provide specific, factual feedback using the SBI model to bring it into the Open area',
      'In the Open area — the apprentice already knows full well that they rush, so the mentor need only note it down on the observation record',
    ],
    correctAnswer: 2,
    explanation:
      'A behaviour the apprentice is unaware of but others can see sits in the Blind Spot. Feedback (using SBI: "During the test [S], you skipped the proving unit check [B], which could mean testing with a faulty instrument [I]") brings it into awareness.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Johari Window',
    category: 'The Mentor\u2019s Toolkit',
  },
  {
    id: 79,
    question:
      'When transitioning from S2 Coaching to S3 Supporting with a developing apprentice, what specific change in mentor behaviour is required?',
    options: [
      'Increase both task direction and relationship support — give closer instruction and more praise, so the apprentice is never left unsure about what to do next',
      'Withdraw direction and support together — hand over the task list, step back completely, and let the apprentice stand or fall without any support at all on the day',
      'Increase task direction while reducing relationship support — issue tighter instructions and hold back encouragement to push them harder and get the job done',
      'Reduce task direction while maintaining high relationship support \u2014 ask more questions, give fewer instructions, but remain available and encouraging',
    ],
    correctAnswer: 3,
    explanation:
      'The transition from S2 to S3 involves reducing directive task behaviour while keeping relationship support high. The apprentice now has the skills but may lack confidence, so they need encouragement and availability rather than instructions.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Mentoring Relationship',
    category: 'The Mentor\u2019s Toolkit',
  },
  {
    id: 80,
    question:
      'A mentor is concerned that an apprentice is being bullied but the apprentice denies it when asked directly. What is the best approach?',
    options: [
      'Create a private, safe environment, express what you have observed factually, reassure confidentiality within safety limits, and leave the door open for future conversations',
      'Accept the denial at face value, record in the file that the apprentice was asked and said no, and rely on them raising it themselves later if things happen to get worse',
      'Confront the suspected bully in front of the whole crew, issue a formal warning on the spot, and tell the apprentice afterwards what has now been done on their behalf and why',
      'Tell the apprentice they must report it before the end of the day or you will report it for them, and open a formal grievance in their name either way, whatever they say',
    ],
    correctAnswer: 0,
    explanation:
      'Forcing a disclosure can backfire. The mentor should share specific observations ("I\u2019ve noticed you seem withdrawn after working with X"), reassure the apprentice, and make it clear they can come back at any time. If safety is at risk, the mentor may need to escalate regardless.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Psychological Safety',
    category: 'The Mentor\u2019s Toolkit',
  },

  // =======================================================================
  // SUPPORTING APPRENTICES — 40 questions (id 81–120)
  // =======================================================================

  // --- basic (16) ---
  {
    id: 81,
    question: 'How many stages does the JIB electrical apprenticeship framework have?',
    options: [
      'Three',
      'Four',
      'Five',
      'Six',
    ],
    correctAnswer: 1,
    explanation:
      'The JIB apprenticeship is structured into four stages: Stage 1 (Year 1), Stage 2 (Year 2), Stage 3 (Year 3), and Stage 4 (Year 4), progressing from basic skills to end-point assessment.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'JIB Framework',
    category: 'Supporting Apprentices',
  },
  {
    id: 82,
    question: 'What is the correct ECS grade progression for an electrician?',
    options: [
      'Trainee \u2192 Junior \u2192 Senior \u2192 Supervisor',
      'Core \u2192 Apprentice \u2192 Approved \u2192 Technician Grade',
      'Apprentice \u2192 Core \u2192 Approved \u2192 Technician',
      'Level 2 \u2192 Level 3 \u2192 Level 4 \u2192 Master Grade',
    ],
    correctAnswer: 2,
    explanation:
      'ECS grades progress from Apprentice (during training), to Core Electrician (after qualification), to Approved Electrician (with experience), to Technician (with additional qualifications and responsibility).',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'ECS Grades',
    category: 'Supporting Apprentices',
  },
  {
    id: 83,
    question: 'What does AM2 stand for and what is its purpose?',
    options: [
      'Apprentice Module 2 \u2014 the second year of college-based theory study and written assessment',
      'Assessment Method 2 \u2014 a written multiple-choice exam on BS 7671 sat at the end of the course',
      'Apprenticeship Milestone 2 \u2014 the halfway review of portfolio progress and college attendance',
      'Achievement Measurement 2 \u2014 the practical end-point assessment for electrical apprentices',
    ],
    correctAnswer: 3,
    explanation:
      'AM2 is a practical assessment that tests an apprentice\u2019s ability to install, inspect, and test electrical systems. It is the end-point assessment that apprentices must pass to qualify as electricians.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'AM2',
    category: 'Supporting Apprentices',
  },
  {
    id: 84,
    question:
      'What is the minimum percentage of working time that must be spent on off-the-job training during an apprenticeship?',
    options: [
      '20%',
      '30%',
      '50%',
      '10%',
    ],
    correctAnswer: 0,
    explanation:
      'The 20% of contracted hours benchmark is the long-established minimum for off-the-job training and remains the standard taught figure. (Note: from August 2022 the English ESFA funding rules express this as a minimum of 6 hours per week averaged over the practical period; 6 hours equates to roughly 20% of a typical 30-hour week.) It includes college attendance, structured workplace learning and other training activities.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Off-the-Job Training',
    category: 'Supporting Apprentices',
  },
  {
    id: 85,
    question: 'In the three-way apprenticeship relationship, who are the three parties?',
    options: [
      'Employer, awarding body, and the Health and Safety Executive',
      'Employer, training provider (college), and apprentice',
      'Mentor, assessor, and internal quality assurer',
      'Apprentice, parent or guardian, and the JIB',
    ],
    correctAnswer: 1,
    explanation:
      'The apprenticeship involves three key parties: the employer (provides workplace learning), the training provider/college (delivers formal education), and the apprentice. The mentor coordinates between all three.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Three-Way Relationship',
    category: 'Supporting Apprentices',
  },
  {
    id: 86,
    question:
      'Which type of NVQ evidence involves the assessor watching the learner perform a task in the workplace?',
    options: [
      'Professional discussion',
      'Witness testimony',
      'Direct observation',
      'Reflective account',
    ],
    correctAnswer: 2,
    explanation:
      'Direct observation is considered the most reliable form of evidence because the assessor personally watches the learner demonstrate competence in real working conditions.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'NVQ Evidence',
    category: 'Supporting Apprentices',
  },
  {
    id: 87,
    question: 'What does VACSR stand for in the context of NVQ evidence?',
    options: [
      'Verified, Authentic, Complete, Standardised, Relevant',
      'Verified, Assessed, Checked, Standardised, Recorded',
      'Valid, Approved, Certified, Signed, Reviewed',
      'Valid, Authentic, Current, Sufficient, Reliable',
    ],
    correctAnswer: 3,
    explanation:
      'VACSR sets out the five quality criteria for NVQ evidence: Valid (relevant to the standard), Authentic (the learner\u2019s own work), Current (recent), Sufficient (enough to cover the requirements), and Reliable (consistent).',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'VACSR',
    category: 'Supporting Apprentices',
  },
  {
    id: 88,
    question: 'What is a witness testimony in the context of NVQ evidence?',
    options: [
      'A written statement from someone who observed the learner performing a task competently',
      'A written account by the learner reflecting on a task they completed on their own',
      'A set of photographs of the finished work submitted as product evidence for a unit',
      'A verbal question-and-answer session recorded as a professional discussion with the assessor',
    ],
    correctAnswer: 0,
    explanation:
      'A witness testimony is a written statement from a credible witness (often the mentor or supervisor) who observed the learner demonstrating competence. It must be specific, detailed, and linked to the assessment criteria.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Witness Testimony',
    category: 'Supporting Apprentices',
  },
  {
    id: 89,
    question:
      'Which organisation promotes mental health awareness specifically in the construction industry?',
    options: [
      'Mind',
      'Mates in Mind',
      'CITB',
      'Samaritans',
    ],
    correctAnswer: 1,
    explanation:
      'Mates in Mind is a charity specifically focused on improving mental health and wellbeing in the UK construction industry. While Mind and Samaritans provide general mental health support, Mates in Mind is construction-specific.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Wellbeing',
    category: 'Supporting Apprentices',
  },
  {
    id: 90,
    question: 'In competence-based assessment, what term should be used instead of "fail"?',
    options: [
      'Unsuccessful attempt',
      'Below the standard',
      'Not yet competent',
      'Inadequate work',
    ],
    correctAnswer: 2,
    explanation:
      'Competence-based assessment uses "not yet competent" rather than "fail." This language recognises that the learner has not demonstrated competence on this occasion but can do so in the future with further development.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Assessment Language',
    category: 'Supporting Apprentices',
  },
  {
    id: 91,
    question:
      'What is the mentor\u2019s primary role in the three-way apprenticeship relationship?',
    options: [
      'Delivering all the formal classroom theory and marking the written work for the college',
      'Setting and grading the end-point assessment on behalf of the college and the awarding body',
      'Managing the apprentice\'s pay, holiday and contract as line manager for the employer',
      'Coordinating between employer, college, and apprentice to ensure learning progresses',
    ],
    correctAnswer: 3,
    explanation:
      'The mentor acts as a bridge between the three parties, ensuring that workplace learning complements college education, that the apprentice is progressing, and that any difficulties are communicated and addressed.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Three-Way Relationship',
    category: 'Supporting Apprentices',
  },
  {
    id: 92,
    question: 'Which of the following is NOT a recognised type of NVQ evidence?',
    options: [
      'Hearsay from a colleague who did not directly observe the work',
      'Direct observation of the learner by the assessor on site',
      'A signed witness testimony from a supervisor at the workplace',
      'A reflective account written by the learner about a completed task',
    ],
    correctAnswer: 0,
    explanation:
      'Hearsay (second-hand information from someone who did not see the work) is not valid NVQ evidence. Evidence must be authentic and verifiable \u2014 the person providing testimony must have directly observed the work.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'NVQ Evidence',
    category: 'Supporting Apprentices',
  },
  {
    id: 93,
    question: 'What does CITB stand for?',
    options: [
      'Certified Inspector of Trade and Building',
      'Construction Industry Training Board',
      'Construction Industry Testing Bureau',
      'Central Institute for Technical Building',
    ],
    correctAnswer: 1,
    explanation:
      'CITB (Construction Industry Training Board) is the sector skills body for the construction industry in Great Britain. It provides funding, guidance, and resources for construction training and apprenticeships.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'CITB',
    category: 'Supporting Apprentices',
  },
  {
    id: 94,
    question: 'A training needs analysis identifies the gap between what two things?',
    options: [
      'Current role and future role',
      'Current salary and desired salary',
      'Current competence and required competence',
      'Current qualification and next qualification',
    ],
    correctAnswer: 2,
    explanation:
      'A training needs analysis compares where the learner is now (current competence) with where they need to be (required competence). The gap identifies what training and development is needed.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Training Needs Analysis',
    category: 'Supporting Apprentices',
  },
  {
    id: 95,
    question:
      'Which stage of the JIB apprenticeship involves preparing for and taking the AM2 end-point assessment?',
    options: [
      'Stage 3',
      'Stage 1',
      'Stage 2',
      'Stage 4',
    ],
    correctAnswer: 3,
    explanation:
      'Stage 4 (typically Year 4) focuses on preparing for the AM2 end-point assessment, completing the NVQ portfolio, and demonstrating competence across all required areas before qualification.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'JIB Framework',
    category: 'Supporting Apprentices',
  },
  {
    id: 96,
    question: 'What is a reflective account in NVQ evidence?',
    options: [
      'A written piece by the learner describing what they did, how they did it, and what they learned',
      'A statement written by the supervisor confirming the learner worked to the required standard',
      'A live observation recorded by the assessor while the learner carries out the task on site that day',
      'A set of dated photographs of the finished installation, captioned by the assessor for the portfolio',
    ],
    correctAnswer: 0,
    explanation:
      'A reflective account is written by the learner themselves. It demonstrates their understanding of the work they carried out, the decisions they made, and what they would do differently. It provides evidence of underpinning knowledge.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'NVQ Evidence',
    category: 'Supporting Apprentices',
  },

  // --- intermediate (16) ---
  {
    id: 97,
    question:
      'A domestic rewire can provide evidence for multiple NVQ units. Why is this important for mentors to understand?',
    options: [
      'It means every unit has to be evidenced on a completely separate job, so the mentor must plan a different job for each outstanding unit',
      'It means one well-planned job can generate evidence for several units simultaneously, making evidence gathering more efficient',
      'It means a rewire counts only towards the installation units, so testing and certification evidence has to be gathered from another trade',
      'It means observation evidence can be dropped for those units, because one large job is taken as proof of competence across all of them',
    ],
    correctAnswer: 1,
    explanation:
      'A single domestic rewire can cover first fix, second fix, testing, and certification \u2014 potentially generating evidence for four or more NVQ units from one job. Mentors should plan evidence collection strategically.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Evidence Planning',
    category: 'Supporting Apprentices',
  },
  {
    id: 98,
    question:
      'An apprentice\u2019s portfolio contains 20 almost identical photographs of socket installations. What evidence quality criterion does this fail?',
    options: [
      'Validity \u2014 the photographs are not relevant to any NVQ unit being claimed in the portfolio by the learner',
      'Authenticity \u2014 there is no proof the photographs are the learner\u2019s own work on any one of the jobs',
      'Sufficiency \u2014 the evidence lacks range and does not demonstrate competence across different contexts',
      'Currency \u2014 the photographs are too old to count towards the qualification that the learner is claiming',
    ],
    correctAnswer: 2,
    explanation:
      'While 20 photographs may seem like a lot of evidence, if they all show the same task in the same context, they lack range. Sufficiency requires evidence that covers different situations, contexts, and complexities.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'VACSR',
    category: 'Supporting Apprentices',
  },
  {
    id: 99,
    question:
      'An apprentice is struggling with three-phase theory at college but performing well on single-phase site work. What should the mentor do?',
    options: [
      'Reassure the apprentice that three-phase rarely appears on domestic work and concentrate their site time on single-phase installs',
      'Leave the three-phase theory entirely to the college, as classroom content is solely the training provider\'s responsibility',
      'Hold the apprentice back from all site work until the college confirms the three-phase theory test has been passed',
      'Arrange exposure to three-phase work on site and liaise with the college to coordinate practical and theoretical learning',
    ],
    correctAnswer: 3,
    explanation:
      'The mentor should coordinate with the college (three-way relationship) and create site-based learning opportunities that reinforce the theory. Seeing three-phase in practice often helps the theory make sense.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Three-Way Relationship',
    category: 'Supporting Apprentices',
  },
  {
    id: 100,
    question:
      'A previously punctual apprentice starts arriving late and appearing withdrawn. What should the mentor\u2019s first action be?',
    options: [
      'Have a private, supportive conversation to ask if everything is okay, without making assumptions',
      'Issue a formal written warning for the lateness before asking the apprentice anything',
      'Dock the apprentice\'s pay for the late minutes and watch whether timekeeping improves',
      'Raise the change in behaviour at the team briefing so the whole crew encourages them',
    ],
    correctAnswer: 0,
    explanation:
      'Changes in behaviour often indicate underlying issues. The mentor should have a private, non-judgemental conversation, expressing concern and offering support. Making assumptions or jumping to disciplinary action may make things worse.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Wellbeing',
    category: 'Supporting Apprentices',
  },
  {
    id: 101,
    question:
      'An apprentice on minimum wage cannot afford to buy their own tools. What pastoral care action should the mentor consider?',
    options: [
      'Explain that supplying their own tools is a condition of the trade and entirely their problem to solve',
      'Explore tool loan schemes, employer tool provision policies, and signpost to any available financial support',
      'Lend the apprentice the money out of your own pocket and agree repayments from their weekly wages',
      'Suggest they borrow tools from the van when nobody is using them rather than raise it with anyone',
    ],
    correctAnswer: 1,
    explanation:
      'Financial pressure is a major concern for young apprentices. The mentor should explore practical solutions: employer tool provision, loan schemes, CITB grants, and signpost to relevant support without making the apprentice feel embarrassed.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Pastoral Care',
    category: 'Supporting Apprentices',
  },
  {
    id: 102,
    question: 'What three areas does the AM2 practical assessment typically test?',
    options: [
      'Theory, practical work, and portfolio building',
      'First fix, second fix, and commissioning tests',
      'Installation, inspection and testing, and fault diagnosis',
      'Design, installation, and final commissioning',
    ],
    correctAnswer: 2,
    explanation:
      'The AM2 assessment tests three core competencies: practical installation skills, inspection and testing ability, and fault diagnosis. Apprentices must demonstrate competence in all three areas to pass.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'AM2',
    category: 'Supporting Apprentices',
  },
  {
    id: 103,
    question: 'How should a mentor write an effective witness testimony?',
    options: [
      'Keep it short and general, such as "Did a good job on the sockets today", so that several can be written up at the end of the shift',
      'Draft it on the apprentice\'s behalf, sign it yourself, and word it positively so the portfolio reads well for the assessor and the IQA',
      'Base it on what the apprentice normally does across the year rather than on the specific job that you actually watched them carry out',
      'Be specific about what was observed, link to NVQ criteria, state the date, location, and context, and describe the learner\u2019s actions in detail',
    ],
    correctAnswer: 3,
    explanation:
      'Effective witness testimony is specific, detailed, and criterion-referenced. It describes exactly what the learner did, when and where, how it met the standard, and is signed and dated by the witness.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Witness Testimony',
    category: 'Supporting Apprentices',
  },
  {
    id: 104,
    question: 'What activities count towards the 20% off-the-job training requirement?',
    options: [
      'College attendance, structured workplace training, mentored learning, online courses, and industry visits',
      'Routine productive work, overtime on site, and any task the apprentice would be doing anyway',
      'Evening and weekend overtime, travel between sites, and time spent loading and tidying the van',
      'Travel from home to site, tea and lunch breaks, and the quarterly apprenticeship progress review',
    ],
    correctAnswer: 0,
    explanation:
      'Off-the-job training includes any learning that is directly relevant to the apprenticeship standard and takes place during contracted hours. This includes college, structured workplace learning, mentored sessions, and other training activities.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Off-the-Job Training',
    category: 'Supporting Apprentices',
  },
  {
    id: 105,
    question:
      'Older workers on site are making derogatory comments about a young apprentice. What should the mentor do?',
    options: [
      'Treat the comments as normal site banter, and coach the apprentice on giving as good as they get',
      'Challenge the behaviour directly, support the apprentice privately, and report to management if it continues',
      'Tell the apprentice to toughen up, and quietly keep them working away from those older workers',
      'Move the apprentice to a different site, and leave the older workers to carry on as they were',
    ],
    correctAnswer: 1,
    explanation:
      'The mentor has a duty to act. Bullying and harassment are unacceptable regardless of site culture. The mentor should address the behaviour, support the apprentice, and escalate if necessary under the Equality Act 2010.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Bullying',
    category: 'Supporting Apprentices',
  },
  {
    id: 106,
    question: 'A logbook sign-off by the mentor should confirm what?',
    options: [
      'That the apprentice was present on site on the date recorded and worked the full shift alongside the mentor',
      'That the apprentice attended college that week, handed the written assignment in on time, and passed the class test',
      'That the apprentice has demonstrated the specific skills or knowledge listed, on the date recorded, to the required standard',
      'That the mentor expects the apprentice to reach the required standard by the end of the current stage of training',
    ],
    correctAnswer: 2,
    explanation:
      'Logbook sign-offs are evidence of competence, not just attendance. The mentor is confirming that the apprentice actually demonstrated the listed skills to the required standard on the date recorded.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Recording',
    category: 'Supporting Apprentices',
  },
  {
    id: 107,
    question: 'Which pastoral care action is beyond the scope of a mentor\u2019s role?',
    options: [
      'Listening supportively and signposting to appropriate services',
      'Noticing changes in behaviour and raising concerns sensitively',
      'Encouraging the apprentice to contact their GP or an employee assistance programme',
      'Providing professional counselling for mental health conditions',
    ],
    correctAnswer: 3,
    explanation:
      'Mentors are not trained counsellors. While they should listen, support, and signpost, providing professional counselling is outside their competence. They should refer to appropriate services (EAP, Mates in Mind, college welfare).',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Pastoral Care',
    category: 'Supporting Apprentices',
  },
  {
    id: 108,
    question:
      'A commercial job comes up that includes three-phase distribution board installation. How should the mentor use this for the apprentice\u2019s development?',
    options: [
      'Plan the apprentice\u2019s involvement to maximise learning, match the tasks to NVQ units, and coordinate with the college for theory support',
      'Keep the apprentice off the job entirely, as three-phase distribution work is too advanced for any apprentice to attempt on site',
      'Let the apprentice install and terminate the whole board unsupervised, to see how independently they work under site pressure',
      'Use the apprentice to fetch and carry for the duration of the job, so that the board is finished inside the programmed hours',
    ],
    correctAnswer: 0,
    explanation:
      'Real job opportunities are the best learning opportunities. The mentor should plan the apprentice\u2019s involvement carefully, ensuring they gain experience appropriate to their level while generating NVQ evidence.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Learning Planning',
    category: 'Supporting Apprentices',
  },
  {
    id: 109,
    question: 'What is the Samaritans helpline number that mentors should know for signposting?',
    options: [
      '999',
      '116 123',
      '111',
      '0800 1111',
    ],
    correctAnswer: 1,
    explanation:
      'The Samaritans can be reached on 116 123, which is free to call 24 hours a day, 365 days a year. Mentors should know this number for signposting apprentices in crisis.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Wellbeing',
    category: 'Supporting Apprentices',
  },
  {
    id: 110,
    question: 'When balancing productivity with apprentice learning, what is the key principle?',
    options: [
      'Productivity must always come first — learning is fitted in only on quiet days when the job is running ahead',
      'Learning must always come first — the mentor accepts the job running over budget as the price of training',
      'Learning and productivity are not mutually exclusive \u2014 well-planned learning during normal work benefits both',
      'The two can never be combined — the mentor chooses between training and output at the start of each day',
    ],
    correctAnswer: 2,
    explanation:
      'With good planning, most productive work can also be learning opportunities. The mentor\u2019s skill is in structuring tasks so the apprentice develops competence while contributing to the team\u2019s output.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Learning Planning',
    category: 'Supporting Apprentices',
  },
  {
    id: 111,
    question:
      'The "V" in VACSR requires that evidence is "Valid." What does this mean in practice?',
    options: [
      'The evidence is the learner’s own genuine work',
      'The evidence is recent enough to reflect current competence',
      'A different assessor would reach the same judgement from the evidence',
      'The evidence is relevant to the specific NVQ unit and criteria being assessed',
    ],
    correctAnswer: 3,
    explanation:
      'Valid means the evidence actually demonstrates the competence being assessed. For example, observing a consumer unit installation is valid evidence for an installation unit, but not for a design unit.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'VACSR',
    category: 'Supporting Apprentices',
  },
  {
    id: 112,
    question:
      'At Stage 1 of the JIB framework, what level of supervision does an apprentice typically require?',
    options: [
      'Close, direct supervision with step-by-step guidance',
      'General oversight with periodic check-ins',
      'Minimal supervision \u2014 they can work independently',
      'No supervision \u2014 they are responsible for their own learning',
    ],
    correctAnswer: 0,
    explanation:
      'Stage 1 apprentices are beginners who need close supervision. They are learning basic hand skills and safe working practices and cannot yet be left to work independently on electrical tasks.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'JIB Framework',
    category: 'Supporting Apprentices',
  },

  // --- advanced (8) ---
  {
    id: 113,
    question:
      'A Stage 3 apprentice has strong practical skills but their NVQ portfolio is significantly behind. How should the mentor address this holistically?',
    options: [
      'Concentrate on the practical work alone, on the basis that strong site skills are what the AM2 really measures, and leave the portfolio until the apprentice has more time for it',
      'Create a structured catch-up plan that identifies evidence gaps, maps upcoming jobs to portfolio requirements, schedules dedicated portfolio time, and coordinates with the college assessor',
      'Write up the missing portfolio entries yourself from memory of the jobs, sign each one off as though observed, and hand the completed folder straight to the college assessor',
      'Book the apprentice straight onto AM2 on the strength of their practical skills, and agree with the college assessor that the portfolio will be completed once it is passed',
    ],
    correctAnswer: 1,
    explanation:
      'A holistic approach addresses the root cause (poor planning or lack of time), creates a structured plan, uses upcoming work strategically for evidence, and involves the college assessor to ensure the portfolio meets requirements.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'Evidence Planning',
    category: 'Supporting Apprentices',
  },
  {
    id: 114,
    question:
      'An apprentice is 6 months from their AM2 date but the mentor assesses they are not ready. What structured approach should the mentor take?',
    options: [
      'Enter the apprentice for AM2 on the booked date regardless, on the basis that assessment pressure brings the best out of people and a failed attempt can be retaken later in the year',
      'Tell the apprentice plainly that they are unlikely to pass, hand them a copy of the AM2 criteria, and leave them to prepare in their own time, as the deadline is theirs to manage',
      'Conduct a gap analysis against AM2 criteria, create a 6-month preparation plan with milestones, arrange practice assessments, and discuss potentially deferring if progress is insufficient',
      'Quietly cancel the AM2 booking without discussing any of the alternatives, and revisit whether the apprentice is ready at their annual progress review in twelve months\' time',
    ],
    correctAnswer: 2,
    explanation:
      'A structured approach involves honest assessment against AM2 criteria, planned skill development, regular progress checks, and a contingency plan. Sending an unprepared apprentice wastes the AM2 opportunity and damages confidence.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'AM2',
    category: 'Supporting Apprentices',
  },
  {
    id: 115,
    question:
      'How should a mentor handle a situation where the employer is not providing the 20% off-the-job training requirement?',
    options: [
      'Treat off-the-job training as the college\'s responsibility alone, and record the employer\'s hours as compliant so the funding is not put at risk',
      'Reduce the apprentice\'s college hours to match the time the employer can spare, and amend the training plan so that the paperwork agrees with it',
      'Advise the apprentice to make the hours up unpaid in their own evenings, and log that time against the off-the-job requirement in the training plan',
      'Document the shortfall, raise it with the employer citing the apprenticeship funding rules, and if unresolved, contact the training provider for support',
    ],
    correctAnswer: 3,
    explanation:
      'The 20% minimum is a requirement of apprenticeship funding rules. The mentor should raise this professionally with the employer, documenting the shortfall, and involve the training provider if needed.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'Off-the-Job Training',
    category: 'Supporting Apprentices',
  },
  {
    id: 116,
    question:
      'An apprentice discloses they are being sexually harassed by a colleague on site. What are the mentor\u2019s legal and moral obligations?',
    options: [
      'Take the disclosure seriously, document it, reassure the apprentice, escalate to management/HR immediately, and support the apprentice through the process',
      'Keep the disclosure strictly confidential because it was told to you in private, and check in quietly with the apprentice again in a few weeks\' time',
      'Tell the apprentice to raise it with the colleague directly first, and involve management only if the behaviour carries on for a few more weeks',
      'Wait to see whether it happens a second time before taking any action, but note today\'s date in the diary so that there is a record if it does',
    ],
    correctAnswer: 0,
    explanation:
      'Sexual harassment is a criminal matter and breaches the Equality Act 2010. Confidentiality cannot be maintained when there is a safeguarding concern. The mentor must report it, support the apprentice, and follow the employer\u2019s safeguarding procedures.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'Safeguarding',
    category: 'Supporting Apprentices',
  },
  {
    id: 117,
    question:
      'A witness testimony states: "Jake did a good job on the sockets today." Why is this inadequate as NVQ evidence?',
    options: [
      'It is far too long and detailed, so the assessor cannot work out which of the criteria the evidence was meant to cover',
      'It lacks specific detail about what was done, how it met the assessment criteria, and does not describe the standard achieved',
      'It was written by the apprentice rather than by a supervisor, so it counts as a reflective account for the unit instead',
      'It names the apprentice, which breaches confidentiality, as testimonies must refer to the learner anonymously and by number only',
    ],
    correctAnswer: 1,
    explanation:
      'Effective witness testimony must describe specifically what was observed, link to NVQ criteria, state the context, and confirm the standard was met. "Did a good job" provides no evidence of specific competence.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'Witness Testimony',
    category: 'Supporting Apprentices',
  },
  {
    id: 118,
    question:
      'An apprentice with diagnosed ADHD struggles to maintain focus during long installation tasks. How should the mentor adapt their approach?',
    options: [
      'Insist every long task is finished in one sitting, remove the usual breaks, treat lost focus as a discipline matter, and expect concentration to build with time',
      'Keep the apprentice off any task lasting longer than an hour, and hand the longer installations to the rest of the team to finish so nothing is left undone',
      'Break tasks into shorter segments with clear milestones, provide visual checklists, build in movement breaks, and use varied activities to maintain engagement',
      'Lower the competence standard on the longer tasks and record it as a reasonable adjustment, so the apprentice can be signed off without ever having to sustain focus',
    ],
    correctAnswer: 2,
    explanation:
      'Reasonable adjustments for ADHD might include task segmentation, visual aids, structured breaks, and varied activities. These adaptations support the apprentice\u2019s learning without lowering the competence standard.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'Neurodiversity',
    category: 'Supporting Apprentices',
  },
  {
    id: 119,
    question:
      'How can a mentor use a single domestic rewire to generate evidence for multiple NVQ units simultaneously?',
    options: [
      'Submit one photograph of the finished rewire and one dated job sheet against every unit in the portfolio, then ask the college assessor to work out entirely for themselves which of the NVQ criteria each one happens to cover',
      'Ask the college assessor to credit the first fix, second fix, testing and certification units automatically and in full, on the strength of the job having been a full domestic rewire carried out over several weeks in one house',
      'Record a single witness testimony saying the apprentice worked well on the rewire, then copy that same testimony into the first fix, second fix, testing and certification units without ever linking it to the specific unit criteria',
      'Plan the apprentice\u2019s involvement across first fix (containment, cabling), second fix (accessories, connections), testing (dead and live tests), and certification \u2014 mapping each activity to specific NVQ criteria',
    ],
    correctAnswer: 3,
    explanation:
      'Strategic evidence planning means mapping different stages of a rewire to different NVQ units. First fix covers installation units, testing covers inspection and testing units, and the overall project covers planning and completion units.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'Evidence Planning',
    category: 'Supporting Apprentices',
  },
  {
    id: 120,
    question:
      'Regulation 16 of the Electricity at Work Regulations 1989 specifically requires what in relation to electrical work?',
    options: [
      'That no person shall be engaged in any work activity where technical knowledge or experience is necessary to prevent danger unless they possess such knowledge or experience, or are under appropriate supervision',
      'That every electrical installation shall be inspected and tested at least once a year, and that a certificate shall be issued in writing to the duty holder and to the client before it is returned to service',
      'That all electrical work shall be carried out only by a person holding a recognised qualification and aged over eighteen, with any trainee kept well away from live parts and from the working area at all times',
      'That a written permit-to-work shall be issued and countersigned by a duty holder in advance before any electrical task is started, whether the equipment concerned is live, dead or isolated for maintenance purposes',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 16 of EWR 1989 is the competence regulation. It requires that people working on electrical systems have sufficient knowledge and experience, or are adequately supervised, to prevent danger.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'Legislation',
    category: 'Supporting Apprentices',
  },

  // =======================================================================
  // ASSESSMENT & EVALUATION — 40 questions (id 121–160)
  // =======================================================================

  // --- basic (16) ---
  {
    id: 121,
    question: 'What does "formative assessment" mean?',
    options: [
      'A final judgement at the end of a course about whether the standard has been met',
      'Ongoing assessment during learning that identifies strengths and gaps',
      'An external check by the awarding body on the centre’s assessment decisions',
      'A one-off entry test used to decide whether a learner can start a course',
    ],
    correctAnswer: 1,
    explanation:
      'Formative assessment is "assessment for learning" \u2014 it takes place during the learning process and helps both the learner and mentor identify what is going well and what needs further development.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Formative Assessment',
    category: 'Assessment & Evaluation',
  },
  {
    id: 122,
    question: 'What does "summative assessment" mean?',
    options: [
      'An ongoing check during learning used to identify strengths and gaps on the job as they appear',
      'An informal comment made to the learner while they are working on a practical task on site',
      'An end-point assessment that confirms whether the learner has achieved the required standard',
      'A diagnostic check made before learning begins to establish the learner\'s starting point on site',
    ],
    correctAnswer: 2,
    explanation:
      'Summative assessment is "assessment of learning" \u2014 it takes place at the end of a period of learning and makes a judgement about whether the learner has met the required standard. AM2 is a summative assessment.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Summative Assessment',
    category: 'Assessment & Evaluation',
  },
  {
    id: 123,
    question: 'How many levels are in Kirkpatrick\u2019s model of training evaluation?',
    options: [
      'Three',
      'Five',
      'Six',
      'Four',
    ],
    correctAnswer: 3,
    explanation:
      'Kirkpatrick (1959) identified four levels of training evaluation: Level 1 Reaction, Level 2 Learning, Level 3 Behaviour, and Level 4 Results.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Kirkpatrick',
    category: 'Assessment & Evaluation',
  },
  {
    id: 124,
    question: 'Kirkpatrick Level 1 (Reaction) measures what?',
    options: [
      'Whether the learners enjoyed the training and found it relevant',
      'Whether the training improved business results over the following year',
      'Whether the learners can demonstrate new skills on the job weeks later',
      'Whether the learners passed a knowledge test at the end of the course',
    ],
    correctAnswer: 0,
    explanation:
      'Level 1 Reaction asks "Did they enjoy it?" and is typically measured through feedback forms or verbal responses immediately after training. It is the most common but least informative level of evaluation.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Kirkpatrick',
    category: 'Assessment & Evaluation',
  },
  {
    id: 125,
    question: 'What does the "R" in VACSR stand for?',
    options: [
      'Relevant',
      'Reliable',
      'Recent',
      'Recorded',
    ],
    correctAnswer: 1,
    explanation:
      'Reliable means that a different assessor, using the same evidence, would reach the same judgement. Reliability ensures consistency in assessment decisions across different assessors and occasions.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'VACSR',
    category: 'Assessment & Evaluation',
  },
  {
    id: 126,
    question: 'What is the purpose of a structured observation in assessment?',
    options: [
      'To question the learner about the theory behind a task they have already completed',
      'To gather written witness statements from the colleagues who saw the task done',
      'To watch the learner perform a task in the workplace and gather evidence of competence',
      'To review the portfolio of photographs and reflective accounts that the learner has built',
    ],
    correctAnswer: 2,
    explanation:
      'A structured observation involves the assessor watching the learner perform a real work task, gathering evidence of their technical competence, safe working practices, and adherence to standards.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Observation',
    category: 'Assessment & Evaluation',
  },
  {
    id: 127,
    question: 'The halo effect in assessment means what?',
    options: [
      'An assessor\'s judgement is swayed by the closing few minutes of the observation rather than by the whole of it',
      'An assessor seeks out only the evidence that confirms the opinion they had already formed of the learner',
      'An assessor sets the pass bar far too low and records everyone in the group as competent regardless of evidence',
      'An assessor\u2019s overall positive impression of a learner influences their judgement of specific performance',
    ],
    correctAnswer: 3,
    explanation:
      'The halo effect occurs when an assessor\u2019s general positive feelings about a learner (they are likeable, punctual, enthusiastic) lead them to rate specific performance more favourably than the evidence warrants.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Assessor Bias',
    category: 'Assessment & Evaluation',
  },
  {
    id: 128,
    question:
      'What is the correct competence-based language for a learner who has not met the standard?',
    options: [
      'Not yet competent',
      'Failed the assessment',
      'Below the average standard',
      'Incompetent performance',
    ],
    correctAnswer: 0,
    explanation:
      '"Not yet competent" is the correct terminology in competence-based assessment. It acknowledges that the learner has not met the standard on this occasion but implies they can achieve it with further development.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Assessment Language',
    category: 'Assessment & Evaluation',
  },
  {
    id: 129,
    question: 'What is a professional discussion in the context of NVQ assessment?',
    options: [
      'A casual chat on site with no record kept, used to settle the learner down before a formal observation',
      'A structured conversation between the assessor and learner to explore underpinning knowledge and understanding',
      'A written examination sat under timed conditions and marked externally against a mark scheme at the centre',
      'A direct observation of the learner carrying out a practical task against the unit criteria out in the workplace',
    ],
    correctAnswer: 1,
    explanation:
      'A professional discussion is a planned, recorded conversation where the assessor uses questions to explore the learner\u2019s knowledge and understanding. It is particularly useful for evidence that cannot be directly observed.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Assessment Methods',
    category: 'Assessment & Evaluation',
  },
  {
    id: 130,
    question: 'What does IQA stand for in the assessment process?',
    options: [
      'Interim Quality Audit',
      'Individual Qualification Assessment',
      'Internal Quality Assurance',
      'Internal Questioning Assessment',
    ],
    correctAnswer: 2,
    explanation:
      'Internal Quality Assurance is the process by which an organisation ensures that assessment decisions are consistent, fair, and meet the required standards across all assessors.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'IQA',
    category: 'Assessment & Evaluation',
  },
  {
    id: 131,
    question: 'Kirkpatrick Level 2 (Learning) measures what?',
    options: [
      'Whether the learners enjoyed the training and found it relevant',
      'Whether the learners are applying what they learned back on the job',
      'Whether the training produced a measurable business result',
      'Whether the learners acquired the intended knowledge and skills',
    ],
    correctAnswer: 3,
    explanation:
      'Level 2 Learning asks "Did they learn?" and is measured through pre- and post-tests, practical demonstrations, or knowledge checks that show what the learner knows or can do after training compared to before.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Kirkpatrick',
    category: 'Assessment & Evaluation',
  },
  {
    id: 132,
    question: 'What is the recency effect in assessment?',
    options: [
      'An assessor gives disproportionate weight to the most recent performance rather than the whole observation',
      'An assessor lets one positive overall impression of a learner colour their judgement of every task observed',
      'An assessor favours a learner who shares their own background, interests or way of working on the job',
      'An assessor records every learner as competent because the standard being applied at the centre is set too low',
    ],
    correctAnswer: 0,
    explanation:
      'The recency effect means the assessor\u2019s judgement is overly influenced by what happened at the end of the observation, rather than considering the entire performance. An early mistake may be forgotten if the ending was strong.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Assessor Bias',
    category: 'Assessment & Evaluation',
  },
  {
    id: 133,
    question: 'An assessment plan should answer which basic questions?',
    options: [
      'Who else has passed the same unit and what grades each of them was given',
      'What will be assessed, when, how, and what evidence will be collected',
      'Whether the learner enjoyed the previous training session with the mentor',
      'How the assessor personally feels about the learner\u2019s attitude to the work',
    ],
    correctAnswer: 1,
    explanation:
      'Assessment planning involves identifying what competence will be assessed, when the assessment will take place, which methods will be used, and what evidence will be collected to demonstrate competence.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Assessment Planning',
    category: 'Assessment & Evaluation',
  },
  {
    id: 134,
    question: 'Kirkpatrick Level 3 (Behaviour) measures what?',
    options: [
      'Whether the learners enjoyed the training and found it relevant',
      'Whether the learners acquired the intended knowledge and skills',
      'Whether the learners are applying what they learned on the job',
      'Whether the training produced a measurable business result',
    ],
    correctAnswer: 2,
    explanation:
      'Level 3 Behaviour asks "Are they doing it on the job?" and is measured through observation, supervisor reports, or peer feedback weeks or months after training to see if behaviour actually changed.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Kirkpatrick',
    category: 'Assessment & Evaluation',
  },
  {
    id: 135,
    question: 'What is the purpose of standardisation meetings in IQA?',
    options: [
      'To give each assessor a personal performance review and pay rise every year',
      'To decide which learners will be entered for assessment at the centre that month',
      'To brief learners on what to expect during their observations and what they must show',
      'To ensure all assessors are making consistent judgements against the same standards',
    ],
    correctAnswer: 3,
    explanation:
      'Standardisation meetings bring assessors together to compare decisions, discuss borderline cases, and ensure everyone is interpreting the standards consistently. This improves reliability across the assessment team.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'IQA',
    category: 'Assessment & Evaluation',
  },
  {
    id: 136,
    question: 'Kirkpatrick Level 4 (Results) measures what?',
    options: [
      'Measurable outcomes such as reduced rework, fewer incidents, or improved productivity',
      'Learner reaction, such as whether the training was enjoyable and felt relevant to them',
      'Knowledge and skill gained, measured by a written test at the end of the course',
      'Changed practice back on site, observed by a supervisor some weeks after the course ends',
    ],
    correctAnswer: 0,
    explanation:
      'Level 4 Results asks "What was the measurable business impact?" Examples include reduced rework rates, fewer safety incidents, improved first-time fix rates, or increased customer satisfaction.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Kirkpatrick',
    category: 'Assessment & Evaluation',
  },

  // --- intermediate (16) ---
  {
    id: 137,
    question:
      'During an observation of a ring final continuity test, asking "What instrument are you using?" targets which level of Bloom\u2019s Taxonomy?',
    options: [
      'Understand',
      'Remember',
      'Apply',
      'Analyse',
    ],
    correctAnswer: 1,
    explanation:
      'This question asks the learner to recall a fact (the name of the instrument), which is the Remember level \u2014 the simplest cognitive level in Bloom\u2019s Taxonomy.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Bloom for Assessment',
    category: 'Assessment & Evaluation',
  },
  {
    id: 138,
    question:
      'Asking "Is this reading acceptable for a Type B MCB on a 2.5mm\u00b2 circuit?" during an observation targets which Bloom\u2019s level?',
    options: [
      'Understand',
      'Remember',
      'Evaluate',
      'Apply',
    ],
    correctAnswer: 2,
    explanation:
      'This question requires the learner to make a judgement by comparing the measured value against the maximum permitted value from the tables. Making a judgement based on criteria is the Evaluate level.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Bloom for Assessment',
    category: 'Assessment & Evaluation',
  },
  {
    id: 139,
    question:
      'A company runs a safe isolation refresher but only evaluates it with a feedback form asking if people enjoyed it. What level of Kirkpatrick is this and why is it insufficient?',
    options: [
      'Level 2 Learning only — the form shows the workers understood the isolation procedure, but not whether they use it afterwards',
      'Level 3 Behaviour only — the form confirms that practice on site has changed, but not whether anyone actually enjoyed the day',
      'Level 4 Results only — the form shows that isolation incidents have fallen right across every site since the refresher was run',
      'Level 1 Reaction only \u2014 it tells you nothing about whether anyone learned anything or changed their behaviour on site',
    ],
    correctAnswer: 3,
    explanation:
      'Feedback forms only measure reaction. An enjoyable training session does not guarantee learning occurred or that behaviour will change. The company should also test knowledge (Level 2) and observe practice (Level 3).',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Kirkpatrick',
    category: 'Assessment & Evaluation',
  },
  {
    id: 140,
    question:
      'When recording observation evidence, what is the difference between factual and judgemental language?',
    options: [
      'Factual: "The learner did not verify isolation with a voltage indicator." Judgemental: "The learner was careless and lazy."',
      'Factual language records what was measured, while judgemental language records the assessor\u2019s opinion of the learner',
      'Factual language praises the learner, while judgemental language criticises them for the very same piece of work on site',
      'Factual language is used in summative assessment, while judgemental language is used in formative assessment during the course',
    ],
    correctAnswer: 0,
    explanation:
      'Assessment records must use factual, evidence-based language that describes what was observed. Judgemental language introduces bias and opinion, which undermines the reliability and fairness of the assessment.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Recording Evidence',
    category: 'Assessment & Evaluation',
  },
  {
    id: 141,
    question:
      'A mentor has a strong personal friendship with an apprentice. What assessment risk does this create?',
    options: [
      'Recency effect \u2014 the assessor only remembers the very end of the practical observation',
      'Personal relationship bias \u2014 the mentor may unconsciously assess the apprentice more favourably',
      'Confirmation bias \u2014 the assessor seeks evidence that fits their prior opinion about that learner',
      'Halo effect \u2014 a single strong skill makes every other judgement more favourable than it should be',
    ],
    correctAnswer: 1,
    explanation:
      'Personal relationship bias can lead to more lenient judgements. The mentor should be aware of this risk, focus strictly on the evidence against criteria, and have decisions verified through IQA sampling.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Assessor Bias',
    category: 'Assessment & Evaluation',
  },
  {
    id: 142,
    question: 'Before starting a structured observation, what should the assessor do?',
    options: [
      'Decide the likely outcome in advance so that the paperwork can be written up much more quickly later on',
      'Warn the learner they will probably be found not yet competent, to lower their expectations for the day',
      'Brief the learner on what will be assessed, the criteria, and what to expect during the observation',
      'Withhold the criteria from the learner, so that the observation is a fairer test of them on the day itself',
    ],
    correctAnswer: 2,
    explanation:
      'Assessment should be transparent. The learner should know what will be assessed, against which criteria, and what the process involves. This reduces anxiety and ensures the assessment is fair and valid.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Observation',
    category: 'Assessment & Evaluation',
  },
  {
    id: 143,
    question: 'An action plan following a "not yet competent" decision should include what?',
    options: [
      'A note that the learner was not yet competent, with no further detail of any kind at all',
      'A list of every other learner at the centre who passed the same unit earlier in the year',
      'A reminder that the learner may appeal the decision to the awarding body within the set time limit',
      'Specific areas for development, measurable targets, a timeline, and who will provide support',
    ],
    correctAnswer: 3,
    explanation:
      'An effective action plan is specific (exactly what needs improving), measurable (how will we know it has improved), time-bound (when is the next opportunity), and supported (who will help the learner).',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Action Planning',
    category: 'Assessment & Evaluation',
  },
  {
    id: 144,
    question: 'Confirmation bias in assessment means what?',
    options: [
      'The assessor looks for evidence that confirms their pre-existing opinion of the learner while ignoring contradictory evidence',
      'The assessor is swayed by the last few minutes of the observation rather than by the whole performance recorded on the day',
      'The assessor applies a standard well below the criteria and records nearly every learner observed as competent during the observation',
      'The assessor favours learners from a similar background and judges their work far more generously than that of everyone else on site',
    ],
    correctAnswer: 0,
    explanation:
      'Confirmation bias leads assessors to seek out evidence that supports what they already believe about the learner. If they think the learner is good, they notice strengths and overlook weaknesses, and vice versa.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Assessor Bias',
    category: 'Assessment & Evaluation',
  },
  {
    id: 145,
    question: 'Why do most organisations only evaluate training at Kirkpatrick Level 1?',
    options: [
      'Because Level 1 is the only level of evidence that the awarding body will accept to show that training was delivered',
      'Because Level 1 is quick, easy, and cheap to measure, while higher levels require more time, effort, and planning',
      'Because Levels 2 to 4 may only be carried out while an external verifier from the awarding body is present on the site',
      'Because the funding rules oblige employers to stop at Level 1 unless they are being formally audited that year by the funder',
    ],
    correctAnswer: 1,
    explanation:
      'Level 1 only requires handing out a feedback form. Levels 2-4 require pre/post testing, workplace observation weeks later, and tracking business metrics \u2014 all of which require more planning and resources.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Kirkpatrick',
    category: 'Assessment & Evaluation',
  },
  {
    id: 146,
    question:
      'A learner disputes a "not yet competent" decision, saying "But I always check polarity." How should the assessor respond?',
    options: [
      'Change the decision to competent, on the basis that what the learner usually does is a fair reflection of their ability on the day',
      'Tell the learner that their usual practice is irrelevant, close the discussion down, and record the appeal as withdrawn on file',
      'Acknowledge what the learner usually does, but explain the assessment is based on what was observed during this specific assessment',
      'Accept the learner\'s account of their usual practice and record the unit as competent without arranging a further observation at all',
    ],
    correctAnswer: 2,
    explanation:
      'The assessor should separate usual practice from observed practice. The assessment must be based on the evidence gathered during the assessment event, not on what the learner claims to normally do.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Managing Disagreement',
    category: 'Assessment & Evaluation',
  },
  {
    id: 147,
    question:
      'What is the correct sequence for an appeals process when a learner disagrees with an assessment decision?',
    options: [
      'External appeal to the awarding body first, then an internal appeal if unresolved at that stage',
      'A single appeal made directly to the regulator, with no internal stage at the centre',
      'An immediate appeal to an employment tribunal before any other step has been taken at the centre',
      'Internal appeal to the centre first, then external appeal to the awarding body if unresolved',
    ],
    correctAnswer: 3,
    explanation:
      'The appeals process starts internally (within the training centre or organisation). If the learner is still dissatisfied after the internal process, they can escalate to the external awarding body.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Appeals',
    category: 'Assessment & Evaluation',
  },
  {
    id: 148,
    question: 'IQA sampling involves what?',
    options: [
      'The IQA reviewing a selection of assessor decisions and evidence to check they meet the required standard',
      'The assessor re-marking every single piece of evidence in the portfolio before it goes to the awarding body',
      'The learner choosing which of their units are assessed and which pieces of evidence are used for each of them',
      'The awarding body issuing the certificates once every unit in the portfolio has been completed and signed off',
    ],
    correctAnswer: 0,
    explanation:
      'IQA sampling means the Internal Quality Assurer selects a sample of assessment decisions (across different assessors, learners, and units) to verify that judgements are consistent, fair, and meet the standard.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'IQA',
    category: 'Assessment & Evaluation',
  },
  {
    id: 149,
    question:
      'Asking "Why do we test continuity before insulation resistance?" during an observation targets which Bloom\u2019s level?',
    options: [
      'Apply',
      'Understand',
      'Create',
      'Remember',
    ],
    correctAnswer: 1,
    explanation:
      'This question asks the learner to explain the reasoning behind a sequence \u2014 demonstrating comprehension of the underlying principle. This is the Understand level of Bloom\u2019s Taxonomy.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Bloom for Assessment',
    category: 'Assessment & Evaluation',
  },
  {
    id: 150,
    question: 'What is the main limitation of using simulation as an assessment method?',
    options: [
      'It always costs far more to set up than a real workplace observation on site',
      'It can only ever be used to assess theory on site, and never practical skills',
      'It may not fully reflect the pressures and conditions of real workplace situations',
      'It is not accepted by any awarding body as a form of evidence anywhere in this country',
    ],
    correctAnswer: 2,
    explanation:
      'While simulation is useful when real situations are rare or dangerous, it may not capture the pressures, distractions, and time constraints of actual workplace conditions. Evidence from simulation should be supplemented with workplace observation where possible.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Assessment Methods',
    category: 'Assessment & Evaluation',
  },
  {
    id: 151,
    question:
      'When delivering a "not yet competent" decision using Pendleton\u2019s Rules, what is the first step?',
    options: [
      'Ask the learner if they agree with the decision before you speak',
      'Tell the learner what they did wrong and why it matters',
      'Read the official written assessment report out to the learner',
      'Ask the learner to reflect on their own performance first',
    ],
    correctAnswer: 3,
    explanation:
      'Pendleton\u2019s Rules always start with the learner\u2019s self-reflection. This empowers the learner, develops self-awareness, and often reveals that the learner already knows where they fell short.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Assessment Feedback',
    category: 'Assessment & Evaluation',
  },
  {
    id: 152,
    question:
      'To evaluate safe isolation training at Kirkpatrick Level 3, what would an organisation need to do?',
    options: [
      'Observe workers performing safe isolation on site several weeks after the training to see if their behaviour has actually changed',
      'Hand out a feedback form at the end of the course on the day, asking whether the training was useful and whether it was well delivered',
      'Set a written knowledge test immediately after the course to check that the whole isolation procedure has been understood on the day',
      'Track the company\'s electrical accident and near-miss statistics over the twelve months following the training course on every site',
    ],
    correctAnswer: 0,
    explanation:
      'Level 3 (Behaviour) requires checking whether training transferred to the workplace. This means observing actual practice on site weeks or months later, not just measuring knowledge immediately after.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Kirkpatrick',
    category: 'Assessment & Evaluation',
  },

  // --- advanced (8) ---
  {
    id: 153,
    question:
      'An assessor observes an apprentice perform a ring final continuity test. The apprentice completes the test correctly but cannot explain why the three readings should all be within 0.05\u03A9 of each other. What assessment decision is appropriate?',
    options: [
      'Competent — the procedure itself was carried out correctly, so the underpinning knowledge behind it can be assumed on the day',
      'Not yet competent \u2014 they can perform the procedure but lack the underpinning knowledge required by the assessment criteria',
      'Competent — underpinning knowledge is assessed only in the written units, and never at any stage in a practical observation',
      'Defer the decision — record no outcome at all and wait until the apprentice asks to be reassessed at a later date of their choosing',
    ],
    correctAnswer: 1,
    explanation:
      'Competence requires both practical skill and underpinning knowledge. If the assessment criteria require the learner to explain the principles behind the test, performing the procedure alone is not sufficient.',
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'Assessment Decisions',
    category: 'Assessment & Evaluation',
  },
  {
    id: 154,
    question:
      'A company spent \u00a350,000 on electrical training last year but has seen no reduction in rework or safety incidents. Using Kirkpatrick, what is the most likely evaluation gap?',
    options: [
      'They evaluated at Level 4 (Results) but never at Level 1 (Reaction) or 2 (Learning), so they cannot say whether the courses were understood',
      'They measured Level 2 (Learning) thoroughly and Level 3 (Behaviour) as well, so the gap must lie in the content of the training that was bought',
      'They evaluated at Level 1 (Reaction) but not at Levels 3 (Behaviour) or 4 (Results), so they never checked if training changed actual practice',
      'They tracked Level 3 (Behaviour) closely but skipped Level 1 (Reaction), so they never found out whether anyone enjoyed the courses that were on offer',
    ],
    correctAnswer: 2,
    explanation:
      'Without evaluating at Levels 3 and 4, the company has no evidence of behaviour change or results. The training may have been enjoyed (Level 1) and even understood (Level 2) but never applied (Level 3) or impactful (Level 4).',
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'Kirkpatrick',
    category: 'Assessment & Evaluation',
  },
  {
    id: 155,
    question:
      'Two assessors observe the same apprentice on the same task and reach different decisions. What does this indicate about the assessment?',
    options: [
      'The assessment lacks validity — the evidence gathered does not relate to the unit that is actually being claimed',
      'The assessment lacks sufficiency — there was not enough evidence for either assessor to judge on either occasion',
      'The assessment lacks currency — the evidence is too old to reflect current working practice on the day of the job',
      'The assessment lacks reliability \u2014 the criteria may be ambiguous or the assessors need standardisation',
    ],
    correctAnswer: 3,
    explanation:
      'When different assessors reach different conclusions from the same evidence, the assessment lacks reliability. This should be addressed through standardisation meetings, clearer criteria interpretation, and IQA sampling.',
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'VACSR',
    category: 'Assessment & Evaluation',
  },
  {
    id: 156,
    question:
      'An assessor notices they tend to rate all apprentices as "competent" regardless of performance. What type of bias is this and how should it be addressed?',
    options: [
      'Leniency bias \u2014 the assessor should refocus on the specific criteria, use structured observation checklists, and have decisions verified through IQA',
      'Halo effect — the assessor should set the written criteria aside and rely instead on the overall impression each apprentice makes on site each time',
      'Recency bias — the assessor should base every decision on the final task observed and disregard the earlier part of the whole observation entirely',
      'Confirmation bias — the assessor should gather only the evidence that supports a competent decision and leave any conflicting notes out of the record entirely',
    ],
    correctAnswer: 0,
    explanation:
      'Leniency bias means the assessor sets the bar too low. Structured observation tools, criterion-referencing, and IQA sampling help maintain appropriate standards and protect both learners and the public.',
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'Assessor Bias',
    category: 'Assessment & Evaluation',
  },
  {
    id: 157,
    question:
      'How would you design a complete Kirkpatrick evaluation plan for a one-day safe isolation refresher course?',
    options: [
      'Level 1: pre- and post-course knowledge test. Level 2: end-of-day feedback form. Level 3: track isolation-related incidents over 6 months. Level 4: observe safe isolation out on site 4 weeks later.',
      'Level 1: end-of-day feedback form. Level 2: pre- and post-course knowledge test. Level 3: observe safe isolation on site 4 weeks later. Level 4: track isolation-related incidents over 6 months.',
      'Level 1: end-of-day feedback form. Level 2: a second feedback form a week later. Level 3: a third feedback form 4 weeks later. Level 4: a final feedback form issued after 6 months on site.',
      'Level 1: track isolation-related incidents over 6 months. Level 2: observe safe isolation on site 4 weeks later. Level 3: pre- and post-course knowledge test. Level 4: an end-of-day feedback form.',
    ],
    correctAnswer: 1,
    explanation:
      'A comprehensive evaluation plan measures all four levels at appropriate intervals. Level 1 is immediate, Level 2 can be same-day, Level 3 needs weeks to assess transfer, and Level 4 needs months to measure impact.',
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'Kirkpatrick',
    category: 'Assessment & Evaluation',
  },
  {
    id: 158,
    question:
      'An apprentice appeals a "not yet competent" decision internally and the appeal is upheld (the original decision stands). The apprentice wants to escalate. What is the next step?',
    options: [
      'A second internal appeal, heard this time by a different senior manager working at the same training provider',
      'A review by the internal quality assurer, whose decision is final once an internal appeal has been upheld',
      'External appeal to the awarding body, who will review the evidence and assessment process independently',
      'A direct claim to an employment tribunal, which will re-examine the assessor\'s original decision once again',
    ],
    correctAnswer: 2,
    explanation:
      'If the internal appeal process does not resolve the dispute, the learner can escalate to the external awarding body, which will conduct an independent review of the assessment evidence and process.',
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'Appeals',
    category: 'Assessment & Evaluation',
  },
  {
    id: 159,
    question:
      'An IQA identifies that one assessor consistently uses the phrase "good enough" in observation records rather than referencing specific criteria. What action should be taken?',
    options: [
      'Record the sample as satisfactory, on the basis that "good enough" is an accepted way of recording a pass in an observation record itself',
      'Suspend the assessor immediately, re-mark all of their past decisions single-handedly, and report them to the awarding body straight away',
      'Ask the learners whether they felt that the assessments were fair on the day, and treat their answers as the record of the criteria that were met',
      'Provide CPD on criterion-referencing, require the assessor to link every judgement to specific NVQ criteria, and re-sample their decisions',
    ],
    correctAnswer: 3,
    explanation:
      '"Good enough" is vague and judgemental rather than criterion-referenced. The IQA should support the assessor to improve their recording practice, ensure they reference specific criteria, and verify through re-sampling.',
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'IQA',
    category: 'Assessment & Evaluation',
  },
  {
    id: 160,
    question:
      'Asking "Could you design an alternative testing sequence that would still meet BS 7671 requirements but be more efficient for this particular installation?" targets which Bloom\u2019s level?',
    options: [
      'Create',
      'Evaluate',
      'Analyse',
      'Apply',
    ],
    correctAnswer: 0,
    explanation:
      'This question asks the learner to generate something new \u2014 an original testing sequence \u2014 that meets defined constraints. Creating new solutions or approaches is the highest level of Bloom\u2019s Taxonomy.',
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'Bloom for Assessment',
    category: 'Assessment & Evaluation',
  },

  // =======================================================================
  // CHALLENGING SITUATIONS — 40 questions (id 161–200)
  // =======================================================================

  // --- basic (16) ---
  {
    id: 161,
    question:
      'An apprentice does the bare minimum, arrives exactly on time, and leaves exactly on time. What type of learner might they be?',
    options: [
      'An overconfident learner',
      'A reluctant learner',
      'A reflective learner',
      'A high-performing learner',
    ],
    correctAnswer: 1,
    explanation:
      'These are signs of a reluctant learner \u2014 someone who is disengaged from their learning. The causes may range from being in the wrong career to personal problems or poor previous learning experiences.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Reluctant Learner',
    category: 'Challenging Situations',
  },
  {
    id: 162,
    question: 'Why is an overconfident learner potentially dangerous on a construction site?',
    options: [
      'They become anxious and freeze, refusing to attempt any task at all without supervision from anyone else',
      'They ask so many questions on every job that the work is never finished anywhere near on time',
      'They don\u2019t know what they don\u2019t know, so they may skip safety steps or take unnecessary risks',
      'They are so cautious that they double-check every step and slow the whole team down on every job they do',
    ],
    correctAnswer: 2,
    explanation:
      'Overconfident learners are at the "unconscious incompetence" stage \u2014 they believe they are competent when they are not. This leads to skipping safety procedures, not checking work, and taking risks they do not recognise.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Overconfident Learner',
    category: 'Challenging Situations',
  },
  {
    id: 163,
    question: 'How many protected characteristics are there under the Equality Act 2010?',
    options: [
      'Twelve',
      'Seven',
      'Five',
      'Nine',
    ],
    correctAnswer: 3,
    explanation:
      'The Equality Act 2010 identifies nine protected characteristics: age, disability, gender reassignment, marriage/civil partnership, pregnancy/maternity, race, religion/belief, sex, and sexual orientation.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Equality Act',
    category: 'Challenging Situations',
  },
  {
    id: 164,
    question: 'What is "unconscious bias"?',
    options: [
      'Automatic assumptions or prejudices that influence decisions without the person being aware of them',
      'A deliberate decision to treat someone less favourably because of their background or their religious beliefs',
      'A formal complaint raised when someone feels they have been discriminated against at work by a colleague',
      'The legal duty to make reasonable adjustments for disabled workers in the workplace under the Equality Act',
    ],
    correctAnswer: 0,
    explanation:
      'Unconscious bias refers to the automatic stereotypes and assumptions that our brains make based on factors like age, gender, ethnicity, or background. Everyone has unconscious biases, but awareness is the first step to mitigating them.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Unconscious Bias',
    category: 'Challenging Situations',
  },
  {
    id: 165,
    question:
      'Carol Dweck\u2019s growth mindset approach suggests reframing "I can\u2019t do this" as what?',
    options: [
      '"This is too hard for someone like me"',
      '"I can\u2019t do this yet"',
      '"I will never be any good at this"',
      '"Maybe this trade just isn\u2019t for me"',
    ],
    correctAnswer: 1,
    explanation:
      'Adding "yet" transforms a fixed mindset statement into a growth mindset statement. It acknowledges the current gap while affirming that improvement is possible through effort and practice.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Growth Mindset',
    category: 'Challenging Situations',
  },
  {
    id: 166,
    question: 'What does reflective practice involve for a mentor?',
    options: [
      'Asking the apprentice to reflect on how the task went before you make any comment yourself',
      'Recording the apprentice\u2019s competence against the NVQ criteria after each task on site',
      'Regularly thinking about what went well and what could be improved in your own mentoring practice',
      'Keeping a detailed logbook of every job the apprentice has completed over their whole apprenticeship',
    ],
    correctAnswer: 2,
    explanation:
      'Reflective practice means applying learning theory (such as Kolb\u2019s cycle) to your own mentoring. After each significant mentoring interaction, consider what worked, what didn\u2019t, and what you would do differently.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Reflective Practice',
    category: 'Challenging Situations',
  },
  {
    id: 167,
    question: 'Which of the following is a CPD pathway for developing mentoring skills?',
    options: [
      'C&G 2382 Requirements for Electrical Installations',
      'ECS Health, Safety and Environmental Assessment',
      'C&G 2391 Inspection and Testing',
      'ILM Level 3 Certificate in Coaching and Mentoring',
    ],
    correctAnswer: 3,
    explanation:
      'The ILM Level 3 Certificate in Coaching and Mentoring is a recognised qualification for developing mentoring competence. It covers coaching models, feedback, communication, and reflective practice.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'CPD',
    category: 'Challenging Situations',
  },
  {
    id: 168,
    question: 'Affinity bias in mentoring means what?',
    options: [
      'Favouring people who are similar to you in background, interests, or personality',
      'Judging someone mainly on the most recent piece of work you happened to see on the day',
      'Letting one strong quality colour your judgement of everything else they do',
      'Assuming practical learners will always outperform more theoretical ones every time',
    ],
    correctAnswer: 0,
    explanation:
      'Affinity bias causes mentors to unconsciously favour mentees who remind them of themselves. This can lead to unequal support \u2014 investing more time in people who share their background while neglecting those who are different.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Unconscious Bias',
    category: 'Challenging Situations',
  },
  {
    id: 169,
    question:
      'When distinguishing between a skill deficit and a motivational deficit, what is the key question?',
    options: [
      '"Have they been shown how to do this task before today?"',
      '"Can they do it but won\u2019t, or do they want to but can\u2019t?"',
      '"How many times have they made this exact mistake?"',
      '"Is the apprentice tired or distracted while carrying out the task?"',
    ],
    correctAnswer: 1,
    explanation:
      'A skill deficit means the learner lacks the ability (can\u2019t do it) and needs more training. A motivational deficit means they have the skill but lack the will (won\u2019t do it) and the root cause needs exploration.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Repetitive Mistakes',
    category: 'Challenging Situations',
  },
  {
    id: 170,
    question: 'Csikszentmihalyi\u2019s concept of "flow" describes what?',
    options: [
      'A state of boredom that arises when a task is far too easy for the learner and offers no challenge at all',
      'A state of anxiety that arises when a task is far too difficult for the level of skill the learner has',
      'A state of deep engagement when the challenge level perfectly matches the person\u2019s skill level',
      'A state of complete relaxation in which no learning challenge is present for the learner at any point',
    ],
    correctAnswer: 2,
    explanation:
      'Flow (Csikszentmihalyi, 1990) occurs when the challenge is just right \u2014 not so easy that the person is bored, not so hard that they are anxious. Mentors should aim to keep learners in this sweet spot.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Flow',
    category: 'Challenging Situations',
  },
  {
    id: 171,
    question:
      'What does "reasonable adjustment" mean in the context of mentoring a learner with a disability?',
    options: [
      'Lowering the required competence standard so that the learner can reach a pass more easily than others on site',
      'Awarding a disabled learner extra marks on every unit to compensate for the difficulties they face on the job',
      'Excusing the learner from any task they find difficult as a result of their disability, and passing them on that basis',
      'Making changes to the learning or assessment process to remove barriers, without lowering the competence standard',
    ],
    correctAnswer: 3,
    explanation:
      'Reasonable adjustments remove barriers to participation without compromising the standard. For example, allowing extra time, using professional discussion instead of written exams, or providing assistive technology.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Neurodiversity',
    category: 'Challenging Situations',
  },
  {
    id: 172,
    question:
      'Celebrating an apprentice\u2019s first independent consumer unit installation supports which element of Self-Determination Theory?',
    options: [
      'Competence',
      'Autonomy',
      'Extrinsic motivation',
      'Relatedness',
    ],
    correctAnswer: 0,
    explanation:
      'Recognising achievement builds the learner\u2019s sense of competence \u2014 the feeling of being capable and effective. This is one of the three basic psychological needs identified by Deci and Ryan.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Self-Determination Theory',
    category: 'Challenging Situations',
  },
  {
    id: 173,
    question:
      'Including an apprentice in team decisions about how to approach a job supports which element of Self-Determination Theory?',
    options: [
      'Autonomy',
      'Relatedness',
      'Competence',
      'External regulation',
    ],
    correctAnswer: 1,
    explanation:
      'Relatedness is the sense of belonging and connection to others. Including the apprentice in team decisions makes them feel valued as part of the group, strengthening their intrinsic motivation.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Self-Determination Theory',
    category: 'Challenging Situations',
  },
  {
    id: 174,
    question:
      'How does mentoring competence support career progression in the electrical industry?',
    options: [
      'It guarantees an automatic promotion to supervisor within the first year of mentoring with the employer',
      'It replaces the need for the mentor to hold any technical electrical qualifications of their own',
      'It demonstrates leadership capability, which is required for ECS Technician grade and management roles',
      'It exempts the mentor from meeting their own continuing professional development requirements each year',
    ],
    correctAnswer: 2,
    explanation:
      'Mentoring demonstrates leadership, communication, and people management skills. These are explicitly valued in ECS Technician applications and supervisory or management career pathways.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Career Progression',
    category: 'Challenging Situations',
  },
  {
    id: 175,
    question: 'What is the "ripple effect" in mentoring?',
    options: [
      'Poor mentoring drives apprentices out of the trade — most leave within a year of being badly supervised',
      'A mentor\'s reputation spreads across the industry — clients seek the firm out for the training it gives',
      'One piece of feedback keeps working on a learner — a careless remark can be remembered a whole career',
      'Good mentoring creates the next generation of mentors \u2014 mentees who were well-mentored go on to mentor others',
    ],
    correctAnswer: 3,
    explanation:
      'The ripple effect means that effective mentoring has a multiplying impact. An apprentice who is well-mentored not only develops into a competent electrician but is also likely to become a good mentor themselves.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Ripple Effect',
    category: 'Challenging Situations',
  },
  {
    id: 176,
    question: 'What type of feedback should a mentor seek on their own mentoring practice?',
    options: [
      '360-degree feedback from mentees, peers, and managers',
      'Appraisal comments from their own line manager',
      'Written thanks from apprentices signed off',
      'College pass rates for their mentees',
    ],
    correctAnswer: 0,
    explanation:
      '360-degree feedback gathers perspectives from multiple sources: the mentees themselves (how did the mentoring feel?), peers (how does your approach compare?), and managers (is the mentoring effective?). This gives a rounded picture.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Feedback on Mentoring',
    category: 'Challenging Situations',
  },

  // --- intermediate (16) ---
  {
    id: 177,
    question:
      'An apprentice is doing the minimum and seems disengaged. Before assuming laziness, what should the mentor explore first?',
    options: [
      'Whether a formal written warning and a note on file would sharpen their attitude before the next progress review meeting',
      'Whether there are underlying causes such as personal problems, wrong career choice, bullying, financial stress, or health issues',
      'Whether moving them to another team, another site or another mentor would make the problem go away by itself in time',
      'Whether cutting their responsibilities back to fetching and carrying would leave them more comfortable out on the site',
    ],
    correctAnswer: 1,
    explanation:
      'Disengagement has many possible causes. A one-to-one conversation exploring the root cause (not assuming laziness) is essential. The apprentice may be struggling with issues the mentor is unaware of.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Reluctant Learner',
    category: 'Challenging Situations',
  },
  {
    id: 178,
    question:
      'An overconfident apprentice dismisses the need for safe isolation, saying "I\u2019ve done this loads of times." How should the mentor respond?',
    options: [
      'Accept their experience at face value — let them skip proving the test instrument to save time, and check the finished work over yourself afterwards instead',
      'Criticise them in front of the whole crew — make an example of the attitude so that the rest of the team hears the message loud and clear at the same time',
      'Use assessment evidence to demonstrate the gap \u2014 set a task that reveals the limit of their competence, and have a factual conversation about the specific risks',
      'Leave it for the time being — overconfidence tends to correct itself sooner or later, once an apprentice has had a fright or a near-miss of their own on site',
    ],
    correctAnswer: 2,
    explanation:
      'Overconfidence is best addressed with evidence, not confrontation. Setting a challenging task that reveals gaps (in a safe environment) followed by a factual discussion about consequences is more effective than lecturing.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Overconfident Learner',
    category: 'Challenging Situations',
  },
  {
    id: 179,
    question:
      'An apprentice makes the same wiring mistake for the third time. How do you determine whether this is a skill or motivational deficit?',
    options: [
      'Check whether the mistake happens under other supervisors too. If it does, it is a skill deficit. If it happens only with you, it is motivational.',
      'Ask how confident they feel about the task. If they say they are confident, it is a skill deficit. If they say unsure, it is motivational.',
      'Compare their error rate with the rest of the team. If it is higher than theirs, it is motivational. If it matches, it is a skill deficit.',
      'Ask them to explain the correct procedure. If they can explain it but don\u2019t do it, it is motivational. If they cannot explain it, it is a skill deficit.',
    ],
    correctAnswer: 3,
    explanation:
      'If the learner can articulate the correct procedure but does not follow it in practice, the barrier is motivational (won\u2019t do). If they cannot explain it, the barrier is knowledge or skill (can\u2019t do). The response differs significantly.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Repetitive Mistakes',
    category: 'Challenging Situations',
  },
  {
    id: 180,
    question:
      'A Polish apprentice is excellent at practical work but struggling with written English assessments. What reasonable adjustment could the mentor suggest?',
    options: [
      'Use professional discussion as an alternative evidence method, where the apprentice can demonstrate knowledge verbally',
      'Pause the qualification until the apprentice has completed an English course at the college in their own time',
      'Ask another worker to write the assessment answers on the apprentice\'s behalf, based on what they are told',
      'Waive the written assessments altogether and sign the knowledge units off from practical work alone',
    ],
    correctAnswer: 0,
    explanation:
      'Professional discussion allows the apprentice to demonstrate their underpinning knowledge verbally, removing the language barrier without lowering the competence standard. This is a valid reasonable adjustment.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Language Barriers',
    category: 'Challenging Situations',
  },
  {
    id: 181,
    question:
      'A dyslexic apprentice takes twice as long to complete written NVQ evidence. What should the mentor do?',
    options: [
      'Insist the written evidence is completed in the same time as everyone else, so that the qualification stays fair to the rest of the cohort',
      'Arrange reasonable adjustments: extra time, use of technology, verbal evidence methods, and support from the college\u2019s learning support team',
      'Reduce the written evidence below the amount the awarding body requires, and record the missing items as being covered by observation',
      'Explain that dyslexia is a college matter, and leave the apprentice to arrange any support with their college tutor in their own time',
    ],
    correctAnswer: 1,
    explanation:
      'Reasonable adjustments for dyslexia include extra time, assistive technology (speech-to-text), alternative evidence methods (professional discussion, audio recording), and liaison with the college\u2019s learning support services.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Neurodiversity',
    category: 'Challenging Situations',
  },
  {
    id: 182,
    question:
      'A 25-year-old mentor is paired with a 45-year-old career-changer. What potential challenges might arise?',
    options: [
      'The older learner will inevitably work more slowly than the rest of the crew on site, and the younger mentor will always be the better electrician of the two of them',
      'The age gap makes no difference to either party, as a mentoring relationship is shaped only by technical ability and never by age or by experience of life at all',
      'The older learner may resist taking direction from someone younger, and the younger mentor may feel uncomfortable asserting authority over someone with more life experience',
      'Under the awarding body rules the older learner cannot be signed off by a younger mentor, and the younger mentor cannot witness any evidence for anyone older than them',
    ],
    correctAnswer: 2,
    explanation:
      'Age differences can create tension in both directions. The mentor should acknowledge the learner\u2019s experience, focus on the specific electrical knowledge they bring, and build a relationship based on mutual respect.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Generational Differences',
    category: 'Challenging Situations',
  },
  {
    id: 183,
    question:
      'An apprentice going through a family breakdown has declining performance and attendance. What is the correct balance between support and accountability?',
    options: [
      'Hold the apprentice to exactly the same targets and ignore the personal situation altogether',
      'Remove all expectations and standards until the apprentice\u2019s situation improves again',
      'Begin formal disciplinary action for the poor timekeeping and attendance straight away',
      'Show empathy and adjust expectations temporarily while maintaining core safety and competence standards',
    ],
    correctAnswer: 3,
    explanation:
      'The mentor should acknowledge the difficulty, offer support and signposting, temporarily adjust non-safety-critical expectations, but maintain essential standards. Compassion and accountability are not mutually exclusive.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Personal Problems',
    category: 'Challenging Situations',
  },
  {
    id: 184,
    question:
      'According to Csikszentmihalyi, what happens when the challenge level of a task is too low for the learner\u2019s skill?',
    options: [
      'Boredom',
      'Flow',
      'Anxiety',
      'Panic',
    ],
    correctAnswer: 0,
    explanation:
      'When the challenge is below the learner\u2019s skill level, they become bored and disengaged. The mentor should increase the complexity of tasks to keep the learner in the flow zone.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Flow',
    category: 'Challenging Situations',
  },
  {
    id: 185,
    question:
      'A female apprentice reports that she is being excluded from social interactions and given only simple tasks by male colleagues. What should the mentor do?',
    options: [
      'Explain that simple tasks are normal at her stage, and suggest that she gives the crew a bit more time to accept her',
      'Take the report seriously, challenge the exclusionary behaviour, ensure equitable task allocation, and escalate if necessary',
      'Advise her to keep her head down, get on with the work, and wait for those colleagues to come round in their own time',
      'Move her to another site so that the crew is not disrupted, and close the matter without speaking to any of them',
    ],
    correctAnswer: 1,
    explanation:
      'Gender-based exclusion is a form of discrimination under the Equality Act 2010. The mentor should act immediately: challenge the behaviour, ensure fair task allocation, support the apprentice, and escalate to management.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Gender',
    category: 'Challenging Situations',
  },
  {
    id: 186,
    question: 'Applying Kolb\u2019s cycle to your own mentoring means what in practice?',
    options: [
      'Setting the apprentice one task (experience), judging their whole ability from it (observation), recording that judgement in their file (conclusion), and setting the same task again next time (experimentation)',
      'Following one lesson plan for every apprentice (planning), delivering it in the same order each time (delivery), marking the same test at the end of it (assessment), and filing the results unread (recording)',
      'After a mentoring session (experience), reflecting on what happened (observation), drawing conclusions about what worked (conceptualisation), and planning to do things differently next time (experimentation)',
      'Handing the session to another mentor whenever it goes badly (handover), watching them deliver it instead (observation), noting what they did differently (recording), and handing over again next time (repetition)',
    ],
    correctAnswer: 2,
    explanation:
      'Reflective practice means applying learning theory to yourself. The mentor should regularly reflect on their own mentoring interactions, identify what worked and what didn\u2019t, and plan improvements.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Reflective Practice',
    category: 'Challenging Situations',
  },
  {
    id: 187,
    question:
      'What is the difference between extrinsic and intrinsic recognition for an apprentice?',
    options: [
      'Extrinsic: the private pride of mastering a skill. Intrinsic: a certificate, bonus or public thank you.',
      'Extrinsic: recognition given by the mentor on site. Intrinsic: recognition given by the awarding body.',
      'Extrinsic: praise given on the spot. Intrinsic: praise held back until the qualification is complete.',
      'Extrinsic: rewards like certificates or bonuses. Intrinsic: the internal satisfaction of mastering a new skill.',
    ],
    correctAnswer: 3,
    explanation:
      'Both types of recognition have value. Extrinsic rewards (certificates, praise, bonuses) are useful but temporary. Intrinsic satisfaction (pride in a well-wired board, sense of mastery) is more sustainable long-term.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Motivation',
    category: 'Challenging Situations',
  },
  {
    id: 188,
    question:
      'A mentor notices they spend more time mentoring apprentices who share their interests in football. What type of bias is this?',
    options: [
      'Affinity bias',
      'Confirmation bias',
      'Halo effect',
      'Recency effect',
    ],
    correctAnswer: 0,
    explanation:
      'Affinity bias means favouring people who are similar to you. The mentor unconsciously invests more time in apprentices they connect with socially, potentially disadvantaging others who are equally deserving.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Unconscious Bias',
    category: 'Challenging Situations',
  },
  {
    id: 189,
    question: 'What is the benefit of building a mentoring portfolio?',
    options: [
      'It removes any need for the mentor to keep their own electrical qualifications and CPD records up to date any longer',
      'It provides evidence of your mentoring competence for career progression, CPD records, and professional development reviews',
      'It is a legal requirement under the apprenticeship funding rules before anyone is permitted to mentor an apprentice',
      'It guarantees the mentor both a pay rise and an ECS Technician card at their next annual appraisal with the employer',
    ],
    correctAnswer: 1,
    explanation:
      'A mentoring portfolio documents your development as a mentor: reflections, feedback received, courses completed, and outcomes achieved. This evidence supports applications for ECS Technician grade and management roles.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Mentor Portfolio',
    category: 'Challenging Situations',
  },
  {
    id: 190,
    question:
      'An apprentice on the autism spectrum prefers written instructions and predictable routines. How should the mentor adapt?',
    options: [
      'Change the running order of the tasks without warning, and expect the apprentice to adapt on the spot so that they build flexibility',
      'Give instructions verbally at the point of work only, and avoid written task lists altogether so that the apprentice has to stay alert',
      'Provide clear, written task lists with visual instructions, give advance notice of any changes, and maintain consistent routines where possible',
      'Lower the competence standard for the units the apprentice finds difficult, so that the more awkward routines can be avoided altogether',
    ],
    correctAnswer: 2,
    explanation:
      'Reasonable adjustments for autism might include visual task cards, advance notice of schedule changes, a designated quiet space for breaks, and clear, literal communication. These support the apprentice without lowering standards.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Neurodiversity',
    category: 'Challenging Situations',
  },
  {
    id: 191,
    question:
      'Connecting an apprentice\u2019s daily tasks to their long-term career goals is an example of which motivational strategy?',
    options: [
      'Social comparison — measuring the learner against more successful colleagues',
      'Extrinsic reward — promising a bonus once the qualification is completed',
      'Negative reinforcement — warning of consequences if the work does not improve',
      'Linking present effort to future outcomes \u2014 helping the learner see the bigger picture',
    ],
    correctAnswer: 3,
    explanation:
      'Helping learners see how today\u2019s work connects to their long-term aspirations (qualifying, earning more, running their own business) provides purpose and strengthens intrinsic motivation.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Motivation',
    category: 'Challenging Situations',
  },
  {
    id: 192,
    question: 'Peer observation of your mentoring involves what?',
    options: [
      'A fellow mentor watches you mentor and provides feedback on your approach',
      'Watching your apprentice work without intervening',
      'The apprentice observing a qualified electrician work',
      'Recording your mentoring sessions on video for social media',
    ],
    correctAnswer: 0,
    explanation:
      'Peer observation means inviting a colleague to observe your mentoring in action and provide constructive feedback. It is one of the most effective ways to identify blind spots in your own practice.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Feedback on Mentoring',
    category: 'Challenging Situations',
  },

  // --- advanced (8) ---
  {
    id: 193,
    question:
      'An apprentice is technically competent but repeatedly refuses to wear PPE, citing it as uncomfortable and unnecessary. This has been addressed multiple times. How should the mentor escalate?',
    options: [
      'Let the matter drop quietly, on the basis that the apprentice is technically competent, works carefully, and the refusal has never yet resulted in an injury or a near-miss',
      'Document all previous conversations, escalate to management as a formal safety concern, and make clear that continued refusal could have disciplinary and legal consequences under HSWA 1974',
      'Treat wearing PPE as the apprentice\'s own choice to make, note that preference in the site file, and keep them on the tasks where the risk of injury is lower for the rest of the job',
      'Buy the apprentice more comfortable PPE, record the concern as resolved in the site diary, and take no further action unless somebody else raises the matter again later',
    ],
    correctAnswer: 1,
    explanation:
      'Persistent refusal to wear required PPE is a serious safety and legal issue. After coaching conversations have failed, the mentor must escalate formally. Under HSWA 1974 Section 7, employees have a duty to cooperate with safety measures.',
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'Difficult Situations',
    category: 'Challenging Situations',
  },
  {
    id: 194,
    question:
      'A mentor recognises they feel frustrated and impatient with a particular apprentice but not with others. What should they do?',
    options: [
      'Ask for the apprentice to be reassigned to another mentor straight away, and record the reason on file as a straightforward personality clash between the two of them, nothing more',
      'Hide the frustration completely, keep every session strictly task-focused, and rely on professionalism alone to stop the feeling showing in their behaviour towards the apprentice',
      'Reflect on whether unconscious bias or personal factors are influencing their behaviour, seek peer feedback, and consider whether the apprentice\u2019s needs require a different mentoring approach',
      'Be noticeably stricter with that apprentice than with the others, on the basis that firmer handling will stop their standards from slipping any further on site or at college in future',
    ],
    correctAnswer: 2,
    explanation:
      'Self-awareness is essential for mentors. The frustration may reveal unconscious bias, a mismatch in communication styles, or unmet expectations. Reflective practice and peer feedback help identify the root cause.',
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'Reflective Practice',
    category: 'Challenging Situations',
  },
  {
    id: 195,
    question:
      'An apprentice with ADHD, a Polish background, and financial stress is underperforming. How should the mentor approach this intersectionality of challenges?',
    options: [
      'Focus on the ADHD alone, arranging shorter tasks and visual checklists, and assume the written English difficulties and the money worries will both settle by themselves once their performance on site starts to improve again',
      'Tackle the financial stress on its own by signposting a hardship fund, treating money as the single root cause from which the concentration problems and the written English difficulties both follow, and expect them to clear',
      'Refer the apprentice to the college for all three issues at once, on the basis that a combination of this kind sits well beyond the mentor\'s role and belongs with the learning support team and the tutor alone, not with the employer',
      'Address each factor individually while recognising they interact: arrange ADHD-appropriate learning methods, provide language support for written work, signpost financial assistance, and coordinate with the college\u2019s support services',
    ],
    correctAnswer: 3,
    explanation:
      'Multiple intersecting challenges require a holistic, coordinated response. The mentor should address each factor appropriately while recognising that the combination creates a greater impact than any single challenge alone.',
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'Intersectionality',
    category: 'Challenging Situations',
  },
  {
    id: 196,
    question:
      'A mentor has been mentoring for 10 years and believes they do not need to develop further. Which concept best explains why this attitude is problematic?',
    options: [
      'Fixed mindset (Dweck) \u2014 assuming ability is static and there is nothing more to learn prevents growth and may mean their practice becomes outdated',
      'Psychological safety (Edmondson) — feeling too secure in the role removes any reason to seek feedback or to change how they mentor anyone',
      'Imposter syndrome — privately doubting their own ability despite ten years of experience makes them avoid any further development of their practice',
      'Growth mindset (Dweck) — believing that ability keeps developing through effort explains why they see no need for further training of any kind',
    ],
    correctAnswer: 0,
    explanation:
      'A mentor with a fixed mindset about their own development contradicts the principles they should be modelling. Regulations change, methods evolve, and continuous professional development is essential at every career stage.',
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'Growth Mindset',
    category: 'Challenging Situations',
  },
  {
    id: 197,
    question:
      'How can a mentor use Self-Determination Theory to re-engage a demotivated apprentice who has lost interest in their qualification?',
    options: [
      'Offer a larger bonus (reward output), set tighter targets (raise the bar sharply), and add closer supervision (check every single task) until motivation returns',
      'Restore autonomy (give choices in tasks), competence (set achievable challenges and celebrate progress), and relatedness (reconnect them with the team and their mentor)',
      'Remove choice (allocate every task yourself), reduce contact with the team (cut out distraction), and set the pace centrally (leave nothing to the apprentice)',
      'Set far harder targets (force the effort), withhold praise until they improve (raise the stakes), and compare them openly with the rest of the team each week',
    ],
    correctAnswer: 1,
    explanation:
      'SDT provides a structured approach to re-engagement: identify which of the three needs (autonomy, competence, relatedness) is most unmet and address it directly. Often, a combination of all three needs attention.',
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'Self-Determination Theory',
    category: 'Challenging Situations',
  },
  {
    id: 198,
    question:
      'A senior electrician makes sexist comments about a female apprentice in front of the team. The apprentice seems upset but does not complain. What are the mentor\u2019s obligations?',
    options: [
      'The mentor should wait for a formal written complaint before acting, as the Equality Act 2010 places no duty on anyone until the person affected has raised the matter in writing with the employer first',
      'The mentor should have a quiet word with the senior electrician off the record, keep it out of any file, and leave the apprentice to decide whether anything further is done about it at a later date herself',
      'The mentor must act regardless of whether a formal complaint is made \u2014 challenge the behaviour, support the apprentice, and report it as the Equality Act 2010 places a duty on employers to prevent harassment',
      'The mentor should coach the apprentice to handle the comments herself, as banter is part of site culture and the duty to act rests solely with the site manager, not with anyone who is supervising her',
    ],
    correctAnswer: 2,
    explanation:
      'Mentors have a moral and legal duty to act on witnessed harassment regardless of whether the victim complains. The Equality Act 2010 prohibits harassment based on sex, and employers must take reasonable steps to prevent it.',
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'Equality Act',
    category: 'Challenging Situations',
  },
  {
    id: 199,
    question:
      'A mentor wants to demonstrate their mentoring effectiveness for an ECS Technician application. What evidence would be most compelling?',
    options: [
      'A statement of the years the mentor has spent in the trade, the companies they have worked for, and the types of installation completed over that period',
      'A list of every apprentice the mentor has supervised, with the dates they were on site and the jobs they attended, but no record of what any of them achieved',
      'A copy of the mentor\'s own electrical qualifications, ECS card and 18th Edition certificate, with the awarding body\'s original award letters attached to it',
      'A portfolio showing mentee progression (e.g. NVQ completion rates), feedback from mentees, reflective accounts, CPD records, and testimonials from managers or assessors',
    ],
    correctAnswer: 3,
    explanation:
      'Compelling evidence demonstrates impact, not just activity. Showing that mentees actually progressed, achieved qualifications, and valued the mentoring provides far stronger evidence than simply stating years of experience.',
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'Career Progression',
    category: 'Challenging Situations',
  },
  {
    id: 200,
    question:
      'A mentor identifies through reflection that they tend to "tell" rather than "ask" during development conversations. How should they change their practice?',
    options: [
      'Keep telling, but do it more slowly so the apprentice absorbs the instructions',
      'Switch to written instructions only, removing conversation from development entirely',
      'Ask only closed yes/no questions to keep development conversations short',
      'Carry on telling but apologise afterwards if the apprentice seems frustrated',
    ],
    correctAnswer: 0,
    explanation:
      'The insight from reflection should lead to a concrete action plan. Practising the GROW model, using more open questions, and seeking peer feedback creates a development cycle that improves mentoring effectiveness over time.',
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'Reflective Practice',
    category: 'Challenging Situations',
  },
];
