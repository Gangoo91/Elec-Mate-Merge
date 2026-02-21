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
    options: ['Malcolm Knowles', 'David Kolb', 'Benjamin Bloom', 'Lev Vygotsky'],
    correctAnswer: 0,
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
    options: ['Four', 'Six', 'Eight', 'Three'],
    correctAnswer: 1,
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
      'Adults need to understand why they are learning something before they engage with it',
      'Adults need to know the name of the qualification they are working towards',
      'Adults must be told exactly what will be on the exam',
      'Adults learn best when they do not know what is coming next',
    ],
    correctAnswer: 0,
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
      'Abstract Conceptualisation \u2192 Active Experimentation \u2192 Concrete Experience \u2192 Reflective Observation',
      'Reflective Observation \u2192 Concrete Experience \u2192 Active Experimentation \u2192 Abstract Conceptualisation',
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
    options: ['Activist', 'Reflector', 'Theorist', 'Pragmatist'],
    correctAnswer: 0,
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
    options: ['Remember', 'Understand', 'Apply', 'Analyse'],
    correctAnswer: 0,
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
      'Zone of Proximal Development',
      'Zone of Personal Discovery',
      'Zone of Practical Demonstration',
      'Zone of Progressive Difficulty',
    ],
    correctAnswer: 0,
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
    options: ['Wood, Bruner and Ross (1976)', 'Lev Vygotsky', 'Malcolm Knowles', 'David Kolb'],
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
      'High task direction, low relationship support',
      'Low task direction, high relationship support',
      'High task direction, high relationship support',
      'Low task direction, low relationship support',
    ],
    correctAnswer: 0,
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
      'Autonomy, competence, and relatedness',
      'Safety, belonging, and esteem',
      'Knowledge, skill, and attitude',
      'Direction, coaching, and delegation',
    ],
    correctAnswer: 0,
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
      'Intrinsic motivation',
      'Extrinsic motivation',
      'External regulation',
      'Conditional motivation',
    ],
    correctAnswer: 0,
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
    options: ['Section 2(2)(c)', 'Section 7', 'Section 3', 'Section 37'],
    correctAnswer: 0,
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
      'The art and science of teaching children',
      'The theory of adult learning',
      'A method of workplace assessment',
      'A coaching conversation model',
    ],
    correctAnswer: 0,
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
    options: ['Reflector', 'Activist', 'Pragmatist', 'Theorist'],
    correctAnswer: 0,
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
      'Self-actualisation (level 5)',
      'Esteem needs (level 4)',
      'Love and belonging (level 3)',
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
      'Experience as a resource \u2014 build on what they already know',
      'Need to know \u2014 explain every regulation from scratch',
      'Self-direction \u2014 leave them completely unsupervised',
      'Internal motivation \u2014 they do not need any external support',
    ],
    correctAnswer: 0,
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
      'Reflective Observation',
      'Abstract Conceptualisation',
      'Active Experimentation',
      'Concrete Experience',
    ],
    correctAnswer: 0,
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
      'Explain the underlying theory and regulation references before the practical task',
      'Tell them to stop overthinking and just get on with it',
      'Pair them with an Activist to speed them up',
      'Remove all written materials and focus purely on hands-on work',
    ],
    correctAnswer: 0,
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
    options: ['Remember', 'Understand', 'Apply', 'Analyse'],
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
      'Within the Zone of Proximal Development',
      'Below the ZPD \u2014 already mastered',
      'Above the ZPD \u2014 too difficult even with help',
      'Outside the ZPD \u2014 unrelated to their learning',
    ],
    correctAnswer: 0,
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
    options: ['Demonstration', 'Recruitment', 'Frustration control', 'Direction maintenance'],
    correctAnswer: 0,
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
    options: ['S3 Supporting', 'S1 Directing', 'S2 Coaching', 'S4 Delegating'],
    correctAnswer: 0,
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
    options: ['Fixed mindset', 'Growth mindset', 'Neutral mindset', 'Pragmatic mindset'],
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
      'CDM 2015 Regulation 13',
      'HSWA 1974 Section 7',
      'EWR 1989 Regulation 16',
      'MHSWR 1999 Regulation 3',
    ],
    correctAnswer: 0,
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
      'Use practical demonstrations, verbal explanations, and professional discussions instead of relying heavily on written materials',
      'Insist they complete all written assignments without adjustment',
      'Reduce the amount of learning content they need to cover',
      'Exempt them from all theory assessments entirely',
    ],
    correctAnswer: 0,
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
    options: ['Autonomy', 'Competence', 'Relatedness', 'Extrinsic motivation'],
    correctAnswer: 0,
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
      'Active Experimentation',
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
    options: ['Fading', 'Scaffolding', 'Directing', 'Modelling'],
    correctAnswer: 0,
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
      'Start with the practical task and then link the theory to what they experienced on site',
      'Force them to sit through the theory lecture first',
      'Skip the theory content entirely since they prefer practical work',
      'Tell them they will fail if they do not pay attention in class',
    ],
    correctAnswer: 0,
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
      'Employees\u2019 capabilities and training needs when allocating tasks',
      'The maximum working hours per week',
      'The minimum number of first-aiders on site',
      'The type of personal protective equipment to provide',
    ],
    correctAnswer: 0,
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
      'Literacy difficulties',
      'Lack of motivation',
      'Fear of failure',
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
    options: ['Evaluate', 'Analyse', 'Apply', 'Remember'],
    correctAnswer: 0,
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
      'The apprentice is at R1 readiness and needs S1 Directing — full step-by-step guidance and close supervision',
      'S4 is only for classroom-based learning, not practical tasks',
      'Consumer unit changes do not require any supervision',
      'S4 Delegating should only be used by managers, not mentors',
    ],
    correctAnswer: 0,
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
      'They will repeat the same mistakes because they never analyse what happened',
      'They will become more efficient because reflection wastes time',
      'They will develop a Theorist learning style naturally',
      'There is no consequence — reflection is optional in Kolb\u2019s model',
    ],
    correctAnswer: 0,
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
      'The six functions only apply to classroom teaching, not practical work',
      'Each function corresponds to one of the six NVQ evidence types',
      'The six functions are applied in reverse order for practical tasks',
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
      'Experience as a resource (acknowledge their skills) and self-direction (involve them in planning their learning)',
      'Need to know (explain everything from scratch) and readiness (wait until they ask for help)',
      'Problem-centred (only teach what goes wrong) and internal motivation (offer no support)',
      'Self-direction (leave them alone) and experience (ignore their background)',
    ],
    correctAnswer: 0,
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
      'Intrinsic motivation decreases because the need for autonomy is unmet',
      'Motivation increases because the learner has less to think about',
      'It has no effect because autonomy only matters outside work',
      'Extrinsic motivation replaces intrinsic motivation permanently',
    ],
    correctAnswer: 0,
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
      'Understand to Apply',
      'Remember to Understand',
      'Apply to Analyse',
      'Analyse to Evaluate',
    ],
    correctAnswer: 0,
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
      'Literacy difficulty \u2014 provide written materials in larger font',
      'Time pressure \u2014 schedule learning during overtime hours',
      'Financial stress \u2014 increase the apprentice\u2019s pay',
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
      'Goal, Reality, Options, Will/Way Forward',
      'Guide, Reflect, Observe, Work',
      'Goal, Review, Outcome, Wrap-up',
      'Guide, Reality, Objectives, Will',
    ],
    correctAnswer: 0,
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
    options: ['Sir John Whitmore', 'Malcolm Knowles', 'David Kolb', 'Abraham Maslow'],
    correctAnswer: 0,
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
      'Mentoring is long-term and relationship-based; coaching is shorter-term and goal-focused',
      'Mentoring uses questions; coaching uses instructions',
      'Mentoring is only for apprentices; coaching is for qualified workers',
      'There is no difference \u2014 they are the same thing',
    ],
    correctAnswer: 0,
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
    options: ['Open question', 'Closed question', 'Leading question', 'Rhetorical question'],
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
      'The learner reflects on their own performance first',
      'The observer gives their feedback first',
      'The manager delivers the verdict first',
      'A written report is read aloud first',
    ],
    correctAnswer: 0,
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
      'Situation, Behaviour, Impact',
      'Skill, Behaviour, Improvement',
      'Summary, Background, Instruction',
      'Standard, Baseline, Indicator',
    ],
    correctAnswer: 0,
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
      'Joseph Luft and Harrington Ingham',
      'Hersey and Blanchard',
      'Deci and Ryan',
      'Honey and Mumford',
    ],
    correctAnswer: 0,
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
    options: ['Blind spot', 'Open area', 'Hidden area', 'Unknown area'],
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
      'Psychological safety',
      'Growth mindset',
      'Experiential learning',
      'Self-determination',
    ],
    correctAnswer: 0,
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
      'In safety-critical situations where the learner could be harmed',
      'Whenever the learner asks a question',
      'Only during formal assessments',
      'Never \u2014 coaching is always the best approach',
    ],
    correctAnswer: 0,
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
      'To set clear expectations, goals, boundaries, and review dates for the mentoring relationship',
      'To create a legally binding contract between mentor and mentee',
      'To record the mentee\u2019s NVQ evidence',
      'To replace the employment contract',
    ],
    correctAnswer: 0,
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
      'Closed questions to open questions',
      'Easy questions to trick questions',
      'Written questions to verbal questions',
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
      'Give positive feedback in front of others but deliver constructive feedback one-to-one',
      'Only give praise when the whole team is watching',
      'Never give negative feedback at all',
      'Write all corrections in a formal letter',
    ],
    correctAnswer: 0,
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
      'Empathic listening',
      'Attentive listening',
      'Selective listening',
      'Pretending to listen',
    ],
    correctAnswer: 0,
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
      'ILM Level 2/3 Award or Certificate in Coaching and Mentoring',
      'ILM Level 5 Diploma in Leadership',
      'ILM Level 1 Award in Teamwork',
      'ILM Level 7 Certificate in Executive Coaching',
    ],
    correctAnswer: 0,
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
      'Honestly assessing the apprentice\u2019s current skill level, identifying gaps, and acknowledging what they can already do',
      'Setting the target pass mark and date for the AM2',
      'Brainstorming every possible way to prepare for the AM2',
      'Getting the apprentice to commit to a specific revision timetable',
    ],
    correctAnswer: 0,
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
      'To guide the apprentice to discover the answer through their own reasoning rather than being told',
      'To test whether the apprentice has memorised the BS 7671 regulation number',
      'To make the apprentice feel uncomfortable until they give the right answer',
      'To save the mentor time by not having to explain the answer',
    ],
    correctAnswer: 0,
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
      'Agree with the positives the learner identified, then add any further positives the learner missed',
      'Immediately correct the apprentice about the warning notice',
      'Move straight to action planning',
      'Ask the apprentice to start the observation again',
    ],
    correctAnswer: 0,
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
      '"You\u2019re careless and sloppy with your connections"',
      '"Some of your work was not great yesterday"',
      '"You need to improve your practical skills"',
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
      'Psychological safety (Edmondson)',
      'Growth mindset (Dweck)',
      'Self-determination (Deci and Ryan)',
      'Scaffolding (Wood, Bruner and Ross)',
    ],
    correctAnswer: 0,
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
      'Forming, establishing, developing, closing',
      'Planning, doing, reviewing, ending',
      'Introduction, growth, plateau, decline',
      'Assessment, training, evaluation, termination',
    ],
    correctAnswer: 0,
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
      'Safety concerns override confidentiality \u2014 there is a risk of serious injury or death',
      'The mentor wants to get the apprentice in trouble',
      'Confidentiality only applies to personal matters, not work',
      'The company policy requires reporting all conversations',
    ],
    correctAnswer: 0,
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
      'It takes too long to deliver',
      'It does not include enough negative feedback',
      'It was banned by ILM in 2020',
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
      'Receive, Appreciate, Summarise, Ask',
      'Record, Analyse, Summarise, Act',
      'Repeat, Acknowledge, Suggest, Agree',
      'Receive, Accept, State, Advise',
    ],
    correctAnswer: 0,
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
      'It moves information from the Blind Spot (known to others but not to self) into the Open area',
      'It moves information from the Hidden area into the Unknown area',
      'It reduces the Open area by revealing weaknesses',
      'The Johari Window is not related to feedback',
    ],
    correctAnswer: 0,
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
      'Role modelling \u2014 demonstrating correct practice through consistent personal behaviour',
      'Coaching \u2014 asking the apprentice to reflect',
      'Feedback \u2014 telling the apprentice what to do',
      'Assessment \u2014 testing the apprentice\u2019s knowledge',
    ],
    correctAnswer: 0,
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
      'Shout louder so the apprentice can hear',
      'Use only written communication',
      'Skip the conversation and wait until they are back in the office',
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
      'Brainstorming all possible ways forward without immediately judging their feasibility',
      'Choosing the single best option immediately',
      'The mentor telling the learner what to do',
      'Reviewing what has already been tried',
    ],
    correctAnswer: 0,
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
      'Giving step-by-step directions for a safety-critical procedure',
      'Asking open questions to help someone find their own solution',
      'Sharing your career experience over a long-term relationship',
      'Observing silently and then providing feedback',
    ],
    correctAnswer: 0,
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
      'Expectations, meeting frequency, goals, confidentiality boundaries, and review dates',
      'The apprentice\u2019s salary and holiday entitlement',
      'A list of all BS 7671 regulations the apprentice must learn',
      'The mentor\u2019s full career history',
    ],
    correctAnswer: 0,
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
      'When you want to encourage reflection and deeper thinking',
      'When you want to start a coaching conversation',
      'Closed questions should never be used in mentoring',
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
      'Directive instruction \u2014 stop the apprentice immediately because there is an imminent safety risk',
      'Coaching question \u2014 ask "What do you think you should do before switching on?"',
      'Wait and see if they remember to test',
      'Use the Socratic method to lead them to the answer',
    ],
    correctAnswer: 0,
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
      'After the learner finishes, add any positives they missed, then when moving to improvements, highlight the cross-polarity as a serious safety issue',
      'Interrupt immediately and tell them about the cross-polarity',
      'Ignore it because Pendleton\u2019s Rules say only the learner should identify improvements',
      'Save the feedback for the next formal review meeting',
    ],
    correctAnswer: 0,
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
      'Low psychological safety \u2014 the team fears blame. The mentor should model openness by sharing their own mistakes and ensuring reports lead to learning, not punishment',
      'Poor literacy \u2014 provide simpler reporting forms',
      'Laziness \u2014 make reporting mandatory with penalties',
      'Lack of time \u2014 extend the working day to allow for reporting',
    ],
    correctAnswer: 0,
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
      'Simply tell them what to revise and set a deadline',
      'Ask them how they feel about the situation and leave it at that',
      'Skip Goal and Reality and go straight to Will',
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
      'The apprentice is withholding information, possibly due to low trust. The mentor should build rapport and create psychological safety to encourage self-disclosure',
      'The apprentice is highly self-aware and does not need further feedback',
      'The mentor should demand the apprentice reveals everything immediately',
      'A large Hidden area is normal and requires no action',
    ],
    correctAnswer: 0,
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
      'In the Blind Spot \u2014 the mentor should provide specific, factual feedback using the SBI model to bring it into the Open area',
      'In the Hidden area \u2014 the apprentice knows but is hiding it',
      'In the Unknown area \u2014 nobody is aware of it',
      'In the Open area \u2014 everyone already knows',
    ],
    correctAnswer: 0,
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
      'Reduce task direction while maintaining high relationship support \u2014 ask more questions, give fewer instructions, but remain available and encouraging',
      'Increase both task direction and relationship support simultaneously',
      'Remove all support and let the apprentice work independently',
      'Switch from practical mentoring to classroom teaching only',
    ],
    correctAnswer: 0,
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
      'Accept the denial and take no further action',
      'Report the suspected bullying to HR immediately without telling the apprentice',
      'Confront the alleged bully directly on site',
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
    options: ['Four', 'Three', 'Five', 'Six'],
    correctAnswer: 0,
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
      'Apprentice \u2192 Core \u2192 Approved \u2192 Technician',
      'Core \u2192 Apprentice \u2192 Technician \u2192 Approved',
      'Trainee \u2192 Junior \u2192 Senior \u2192 Master',
      'Level 1 \u2192 Level 2 \u2192 Level 3 \u2192 Level 4',
    ],
    correctAnswer: 0,
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
      'Achievement Measurement 2 \u2014 the practical end-point assessment for electrical apprentices',
      'Advanced Module 2 \u2014 a college-based theory exam',
      'Apprentice Milestone 2 \u2014 a mid-point progress review',
      'Assessment Method 2 \u2014 a written examination',
    ],
    correctAnswer: 0,
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
    options: ['20%', '10%', '30%', '50%'],
    correctAnswer: 0,
    explanation:
      'The apprenticeship funding rules require a minimum of 20% of the apprentice\u2019s contracted hours to be spent on off-the-job training. This includes college attendance, structured workplace learning, and other training activities.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Off-the-Job Training',
    category: 'Supporting Apprentices',
  },
  {
    id: 85,
    question: 'In the three-way apprenticeship relationship, who are the three parties?',
    options: [
      'Employer, training provider (college), and apprentice',
      'Mentor, assessor, and internal quality assurer',
      'Apprentice, supervisor, and client',
      'JIB, CITB, and the apprentice',
    ],
    correctAnswer: 0,
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
      'Direct observation',
      'Witness testimony',
      'Professional discussion',
      'Reflective account',
    ],
    correctAnswer: 0,
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
      'Valid, Authentic, Current, Sufficient, Reliable',
      'Verified, Assessed, Checked, Standardised, Recorded',
      'Valid, Approved, Certified, Signed, Reviewed',
      'Verified, Authentic, Complete, Standardised, Relevant',
    ],
    correctAnswer: 0,
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
      'A video recording of the learner\u2019s work',
      'A multiple-choice test result',
      'The apprentice\u2019s self-assessment form',
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
    options: ['Mates in Mind', 'Mind', 'CITB', 'Samaritans'],
    correctAnswer: 0,
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
    options: ['Not yet competent', 'Below standard', 'Unsuccessful', 'Inadequate'],
    correctAnswer: 0,
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
      'Coordinating between employer, college, and apprentice to ensure learning progresses',
      'Delivering the college curriculum on site',
      'Managing the apprentice\u2019s employment contract',
      'Setting the apprentice\u2019s pay and conditions',
    ],
    correctAnswer: 0,
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
      'Direct observation',
      'Professional discussion',
      'Work product evidence',
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
      'Construction Industry Training Board',
      'Central Institute for Technical Building',
      'Certified Inspector of Trade and Building',
      'Construction Industry Testing Bureau',
    ],
    correctAnswer: 0,
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
      'Current competence and required competence',
      'Current salary and desired salary',
      'Current role and future role',
      'Current qualification and next qualification',
    ],
    correctAnswer: 0,
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
    options: ['Stage 4', 'Stage 1', 'Stage 2', 'Stage 3'],
    correctAnswer: 0,
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
      'A financial record of training costs',
      'A manager\u2019s performance review',
      'A college attendance register',
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
      'It means one well-planned job can generate evidence for several units simultaneously, making evidence gathering more efficient',
      'It means the apprentice only needs to complete one job for the entire NVQ',
      'It allows the mentor to skip formal assessments',
      'It means photographs from one job can be reused across all units',
    ],
    correctAnswer: 0,
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
      'Sufficiency \u2014 the evidence lacks range and does not demonstrate competence across different contexts',
      'Validity \u2014 sockets are not a valid evidence type',
      'Authenticity \u2014 the photographs are not real',
      'Currency \u2014 the photographs are too old',
    ],
    correctAnswer: 0,
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
      'Arrange exposure to three-phase work on site and liaise with the college to coordinate practical and theoretical learning',
      'Tell the apprentice to study harder at college',
      'Request that the college removes three-phase from the syllabus',
      'Move the apprentice to a domestic-only contract',
    ],
    correctAnswer: 0,
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
      'Issue a formal warning for lateness',
      'Ignore the behaviour and hope it resolves itself',
      'Call the apprentice\u2019s parents',
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
      'Explore tool loan schemes, employer tool provision policies, and signpost to any available financial support',
      'Tell the apprentice to get a second job to pay for tools',
      'Buy the tools personally and expect repayment',
      'Reduce the apprentice\u2019s working hours so they have time for a second job',
    ],
    correctAnswer: 0,
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
      'Installation, inspection and testing, and fault diagnosis',
      'Theory, practical, and portfolio',
      'Design, installation, and commissioning',
      'First fix, second fix, and testing',
    ],
    correctAnswer: 0,
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
      'Be specific about what was observed, link to NVQ criteria, state the date, location, and context, and describe the learner\u2019s actions in detail',
      'Write a brief sentence saying the apprentice did a good job',
      'Copy a generic template and change the name',
      'Let the apprentice write it themselves and sign it',
    ],
    correctAnswer: 0,
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
      'Only time spent at college',
      'Any time the apprentice is not doing productive work',
      'Only classroom-based learning with a formal teacher',
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
      'Challenge the behaviour directly, support the apprentice privately, and report to management if it continues',
      'Tell the apprentice to develop a thicker skin',
      'Ignore it because it is normal site banter',
      'Move the apprentice to a different site without addressing the behaviour',
    ],
    correctAnswer: 0,
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
      'That the apprentice has demonstrated the specific skills or knowledge listed, on the date recorded, to the required standard',
      'That the apprentice was present on site that day',
      'That the employer is satisfied with the apprentice\u2019s attendance',
      'That the college work has been submitted on time',
    ],
    correctAnswer: 0,
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
      'Providing professional counselling for mental health conditions',
      'Listening to personal concerns',
      'Signposting to support services',
      'Adjusting workload temporarily during a difficult period',
    ],
    correctAnswer: 0,
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
      'Keep the apprentice away because it is too complex',
      'Let the apprentice watch but not participate',
      'Assign the apprentice the job independently to see how they cope',
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
    options: ['116 123', '999', '111', '0800 1111'],
    correctAnswer: 0,
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
      'Learning and productivity are not mutually exclusive \u2014 well-planned learning during normal work benefits both',
      'Productivity should always come first',
      'Learning should only happen at college, never on site',
      'The apprentice should not contribute to productive work during their first two years',
    ],
    correctAnswer: 0,
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
      'The evidence is relevant to the specific NVQ unit and criteria being assessed',
      'The evidence has been validated by an external examiner',
      'The evidence includes a valid date stamp',
      'The evidence is from a valid employer',
    ],
    correctAnswer: 0,
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
      'Create a structured catch-up plan that identifies evidence gaps, maps upcoming jobs to portfolio requirements, schedules dedicated portfolio time, and coordinates with the college assessor',
      'Tell the apprentice to complete the portfolio in their own time at home',
      'Ask the college to reduce the evidence requirements',
      'Focus solely on practical skills and worry about the portfolio later',
    ],
    correctAnswer: 0,
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
      'Conduct a gap analysis against AM2 criteria, create a 6-month preparation plan with milestones, arrange practice assessments, and discuss potentially deferring if progress is insufficient',
      'Enter them for the AM2 anyway and hope for the best',
      'Cancel the AM2 immediately without consulting the apprentice',
      'Focus only on the topics they are weakest in and ignore everything else',
    ],
    correctAnswer: 0,
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
      'Document the shortfall, raise it with the employer citing the apprenticeship funding rules, and if unresolved, contact the training provider for support',
      'Accept it because the employer is paying the apprentice\u2019s wages',
      'Tell the apprentice to complain to the college themselves',
      'Reduce the apprentice\u2019s workload without telling the employer',
    ],
    correctAnswer: 0,
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
      'Keep it confidential as agreed in the mentoring agreement',
      'Tell the apprentice to deal with it themselves',
      'Confront the alleged harasser directly on site',
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
      'It lacks specific detail about what was done, how it met the assessment criteria, and does not describe the standard achieved',
      'It is too short to print',
      'It uses the apprentice\u2019s first name instead of surname',
      'It was written on the same day as the observation',
    ],
    correctAnswer: 0,
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
      'Break tasks into shorter segments with clear milestones, provide visual checklists, build in movement breaks, and use varied activities to maintain engagement',
      'Assign only short, simple tasks and avoid challenging work',
      'Treat them exactly the same as every other apprentice with no adjustments',
      'Suggest they may not be suited to the electrical trade',
    ],
    correctAnswer: 0,
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
      'Plan the apprentice\u2019s involvement across first fix (containment, cabling), second fix (accessories, connections), testing (dead and live tests), and certification \u2014 mapping each activity to specific NVQ criteria',
      'Take one photograph and submit it for every unit',
      'Write one witness testimony covering all units at once',
      'Only use the rewire for evidence of one unit to keep things simple',
    ],
    correctAnswer: 0,
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
      'That all electrical workers must hold a Level 3 NVQ',
      'That electrical apprentices must complete their training within 3 years',
      'That all electrical installations must be tested annually',
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
      'Ongoing assessment during learning that identifies strengths and gaps',
      'A final exam at the end of a course',
      'An assessment that results in a formal qualification',
      'A one-off practical test',
    ],
    correctAnswer: 0,
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
      'An end-point assessment that confirms whether the learner has achieved the required standard',
      'An ongoing weekly review of progress',
      'An informal chat about how things are going',
      'A self-assessment completed by the learner',
    ],
    correctAnswer: 0,
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
    options: ['Four', 'Three', 'Five', 'Six'],
    correctAnswer: 0,
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
      'Whether the learners can demonstrate new skills on the job',
      'Whether the training improved business results',
      'Whether the learners passed a knowledge test',
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
    options: ['Reliable', 'Relevant', 'Recent', 'Recorded'],
    correctAnswer: 0,
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
      'To watch the learner perform a task in the workplace and gather evidence of competence',
      'To observe the learner\u2019s social behaviour at break time',
      'To check the learner\u2019s attendance record',
      'To monitor the learner\u2019s use of mobile phones',
    ],
    correctAnswer: 0,
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
      'An assessor\u2019s overall positive impression of a learner influences their judgement of specific performance',
      'The learner performs better when being observed',
      'The assessor only remembers the most recent performance',
      'The assessment is conducted in ideal conditions',
    ],
    correctAnswer: 0,
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
    options: ['Not yet competent', 'Failed', 'Below average', 'Incompetent'],
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
      'A structured conversation between the assessor and learner to explore underpinning knowledge and understanding',
      'An informal chat in the canteen',
      'A formal disciplinary meeting',
      'A presentation by the learner to a panel',
    ],
    correctAnswer: 0,
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
      'Internal Quality Assurance',
      'Individual Qualification Assessment',
      'Interim Quality Audit',
      'Internal Questioning Assessment',
    ],
    correctAnswer: 0,
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
      'Whether the learners acquired the intended knowledge and skills',
      'Whether the learners enjoyed the training',
      'Whether behaviour changed on the job',
      'Whether business results improved',
    ],
    correctAnswer: 0,
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
      'The learner only remembers the most recent training session',
      'Evidence is only valid if it is recent',
      'The most recent qualification is the most important',
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
      'What will be assessed, when, how, and what evidence will be collected',
      'Who will pay for the assessment',
      'Where the certificate will be posted',
      'How many attempts are allowed',
    ],
    correctAnswer: 0,
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
      'Whether the learners are applying what they learned on the job',
      'Whether the learners enjoyed the training',
      'Whether the learners passed a test',
      'Whether the company saved money',
    ],
    correctAnswer: 0,
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
      'To ensure all assessors are making consistent judgements against the same standards',
      'To standardise the pay rates for assessors',
      'To create a standard exam paper',
      'To agree on standard working hours',
    ],
    correctAnswer: 0,
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
      'Whether the learners attended the training',
      'Whether the trainer was qualified',
      'Whether the training room was comfortable',
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
    options: ['Remember', 'Understand', 'Apply', 'Analyse'],
    correctAnswer: 0,
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
    options: ['Evaluate', 'Remember', 'Understand', 'Apply'],
    correctAnswer: 0,
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
      'Level 1 Reaction only \u2014 it tells you nothing about whether anyone learned anything or changed their behaviour on site',
      'Level 4 Results \u2014 it measures the full impact of the training',
      'Level 3 Behaviour \u2014 it confirms the training changed workplace practice',
      'Level 2 Learning \u2014 it verifies knowledge acquisition',
    ],
    correctAnswer: 0,
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
      'There is no difference \u2014 both are acceptable in assessment records',
      'Judgemental language is preferred because it is more direct',
      'Factual language is only used in written reports, not observations',
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
      'Personal relationship bias \u2014 the mentor may unconsciously assess the apprentice more favourably',
      'The apprentice will automatically perform better',
      'There is no risk \u2014 knowing the learner well improves assessment accuracy',
      'The assessment becomes invalid because friends cannot assess each other',
    ],
    correctAnswer: 0,
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
      'Brief the learner on what will be assessed, the criteria, and what to expect during the observation',
      'Arrive unannounced to get a realistic picture',
      'Only tell the learner the date but not what will be assessed',
      'Ask the learner to prepare a written summary instead',
    ],
    correctAnswer: 0,
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
      'Specific areas for development, measurable targets, a timeline, and who will provide support',
      'A general statement saying "try harder next time"',
      'A financial penalty for the learner',
      'An immediate re-assessment the following day',
    ],
    correctAnswer: 0,
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
      'The assessor confirms the assessment result with the learner',
      'The learner confirms they understood the feedback',
      'The IQA confirms the assessment decision',
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
      'Because Level 1 is quick, easy, and cheap to measure, while higher levels require more time, effort, and planning',
      'Because Level 1 provides the most useful data',
      'Because Kirkpatrick recommended stopping at Level 1',
      'Because higher levels are not relevant to construction training',
    ],
    correctAnswer: 0,
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
      'Acknowledge what the learner usually does, but explain the assessment is based on what was observed during this specific assessment',
      'Change the decision to "competent" to avoid conflict',
      'Tell the learner they are wrong and move on',
      'Refer the matter immediately to an external awarding body',
    ],
    correctAnswer: 0,
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
      'Internal appeal to the centre first, then external appeal to the awarding body if unresolved',
      'External appeal to the awarding body first, then internal review',
      'Appeal directly to the HSE',
      'There is no appeals process \u2014 the assessor\u2019s decision is final',
    ],
    correctAnswer: 0,
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
      'Taking physical samples of the learner\u2019s work products',
      'Sampling the opinions of all learners in a survey',
      'The assessor sampling different questions during an observation',
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
    options: ['Understand', 'Remember', 'Apply', 'Create'],
    correctAnswer: 0,
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
      'It may not fully reflect the pressures and conditions of real workplace situations',
      'It is always more expensive than observation',
      'Simulations cannot test practical skills',
      'The results are never valid',
    ],
    correctAnswer: 0,
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
      'Ask the learner to reflect on their own performance first',
      'Tell the learner what they did wrong',
      'Read out the official assessment report',
      'Ask the learner if they agree with the decision',
    ],
    correctAnswer: 0,
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
      'Hand out feedback forms immediately after the training',
      'Give a written test at the end of the training session',
      'Check whether the company\u2019s insurance premium decreased',
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
      'Not yet competent \u2014 they can perform the procedure but lack the underpinning knowledge required by the assessment criteria',
      'Competent \u2014 they completed the test correctly',
      'Competent \u2014 understanding the theory is not part of the practical assessment',
      'Defer the decision until the college confirms their theory marks',
    ],
    correctAnswer: 0,
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
      'They evaluated at Level 1 (Reaction) but not at Levels 3 (Behaviour) or 4 (Results), so they never checked if training changed actual practice',
      'The training was too expensive',
      'The wrong people attended the training',
      'Training cannot reduce rework or incidents',
    ],
    correctAnswer: 0,
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
      'The assessment lacks reliability \u2014 the criteria may be ambiguous or the assessors need standardisation',
      'One assessor must be wrong and should be disciplined',
      'The learner performed differently for each assessor',
      'This is normal and requires no action',
    ],
    correctAnswer: 0,
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
      'This is good practice because it is encouraging',
      'Halo effect \u2014 the assessor likes all the apprentices',
      'Recency effect \u2014 the assessor only remembers good performances',
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
      'Level 1: end-of-day feedback form. Level 2: pre- and post-course knowledge test. Level 3: observe safe isolation on site 4 weeks later. Level 4: track isolation-related incidents over 6 months.',
      'Only measure Level 1 because the course is only one day long',
      'Only measure Level 4 because results are the only thing that matters',
      'Measure all four levels on the day of the training',
    ],
    correctAnswer: 0,
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
      'External appeal to the awarding body, who will review the evidence and assessment process independently',
      'Appeal to the Health and Safety Executive',
      'Take the matter to an employment tribunal',
      'There is no further recourse \u2014 the internal decision is final',
    ],
    correctAnswer: 0,
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
      'Provide CPD on criterion-referencing, require the assessor to link every judgement to specific NVQ criteria, and re-sample their decisions',
      'Accept the records because the meaning is clear',
      'Ask the assessor to write longer records',
      'Remove the assessor from the team immediately',
    ],
    correctAnswer: 0,
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
    options: ['Create', 'Evaluate', 'Analyse', 'Apply'],
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
      'A reluctant learner',
      'An overconfident learner',
      'A reflective learner',
      'A high-performing learner',
    ],
    correctAnswer: 0,
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
      'They don\u2019t know what they don\u2019t know, so they may skip safety steps or take unnecessary risks',
      'They are too slow and hold up the team',
      'They ask too many questions',
      'They are always late to site',
    ],
    correctAnswer: 0,
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
    options: ['Nine', 'Seven', 'Five', 'Twelve'],
    correctAnswer: 0,
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
      'A deliberate decision to discriminate against someone',
      'A type of assessment bias that only affects written tests',
      'A medical condition that affects concentration',
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
      '"I can\u2019t do this yet"',
      '"I\u2019ll never be able to do this"',
      '"Someone else should do this"',
      '"This is too easy for me"',
    ],
    correctAnswer: 0,
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
      'Regularly thinking about what went well and what could be improved in your own mentoring practice',
      'Looking in a mirror before each mentoring session',
      'Asking the apprentice to reflect but not reflecting yourself',
      'Writing a reflective account for NVQ purposes only',
    ],
    correctAnswer: 0,
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
      'ILM Level 3 Certificate in Coaching and Mentoring',
      'CSCS Green Card',
      'Part P Building Regulations',
      'BS 7671 Amendment 4',
    ],
    correctAnswer: 0,
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
      'Assessing people based on their most recent performance',
      'Giving feedback only to people you know well',
      'Preferring practical learners over theoretical learners',
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
      '"Can they do it but won\u2019t, or do they want to but can\u2019t?"',
      '"Are they old enough to understand?"',
      '"Have they been given enough money?"',
      '"Is the task in the NVQ syllabus?"',
    ],
    correctAnswer: 0,
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
      'A state of deep engagement when the challenge level perfectly matches the person\u2019s skill level',
      'The flow of electricity through a circuit',
      'The sequential order of NVQ modules',
      'The progression from apprentice to technician',
    ],
    correctAnswer: 0,
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
      'Making changes to the learning or assessment process to remove barriers, without lowering the competence standard',
      'Reducing the pass mark for disabled learners',
      'Exempting disabled learners from practical assessments',
      'Providing a separate, easier version of the qualification',
    ],
    correctAnswer: 0,
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
    options: ['Competence', 'Autonomy', 'Relatedness', 'Extrinsic motivation'],
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
    options: ['Relatedness', 'Autonomy', 'Competence', 'External regulation'],
    correctAnswer: 0,
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
      'It demonstrates leadership capability, which is required for ECS Technician grade and management roles',
      'It guarantees a pay rise',
      'It replaces the need for technical qualifications',
      'It only benefits the mentee, not the mentor',
    ],
    correctAnswer: 0,
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
      'Good mentoring creates the next generation of mentors \u2014 mentees who were well-mentored go on to mentor others',
      'A type of electrical interference that affects testing',
      'The effect of one bad mentor on the whole organisation',
      'A training technique where one person teaches the next',
    ],
    correctAnswer: 0,
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
      'Only feedback from their own manager',
      'Only positive feedback to maintain confidence',
      'No feedback is needed \u2014 experience is sufficient',
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
      'Whether there are underlying causes such as personal problems, wrong career choice, bullying, financial stress, or health issues',
      'Whether the apprentice needs disciplinary action',
      'Whether to replace the apprentice with a more motivated one',
      'Whether the college is teaching the wrong content',
    ],
    correctAnswer: 0,
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
      'Use assessment evidence to demonstrate the gap \u2014 set a task that reveals the limit of their competence, and have a factual conversation about the specific risks',
      'Let them carry on because they seem confident',
      'Shout at them in front of the team to make a point',
      'Report them to the HSE immediately',
    ],
    correctAnswer: 0,
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
      'Ask them to explain the correct procedure. If they can explain it but don\u2019t do it, it is motivational. If they cannot explain it, it is a skill deficit.',
      'Assume it is always a skill deficit and reteach',
      'Assume it is always a motivational deficit and discipline them',
      'Ignore it and hope they correct themselves',
    ],
    correctAnswer: 0,
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
      'Reduce the competence standard for non-native speakers',
      'Complete the written work on behalf of the apprentice',
      'Tell them to take English lessons in their own time',
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
      'Arrange reasonable adjustments: extra time, use of technology, verbal evidence methods, and support from the college\u2019s learning support team',
      'Lower the standard of evidence required',
      'Tell the apprentice to practise writing more at home',
      'Exempt them from written evidence entirely',
    ],
    correctAnswer: 0,
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
      'The older learner may resist taking direction from someone younger, and the younger mentor may feel uncomfortable asserting authority over someone with more life experience',
      'There are no challenges \u2014 age makes no difference to mentoring',
      'The older learner will always learn faster because of their life experience',
      'The younger mentor will always be more knowledgeable because they trained more recently',
    ],
    correctAnswer: 0,
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
      'Show empathy and adjust expectations temporarily while maintaining core safety and competence standards',
      'Ignore the personal situation and apply strict disciplinary procedures',
      'Excuse all performance issues indefinitely because of the personal situation',
      'Tell the apprentice to leave their personal life at home',
    ],
    correctAnswer: 0,
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
    options: ['Boredom', 'Flow', 'Anxiety', 'Panic'],
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
      'Take the report seriously, challenge the exclusionary behaviour, ensure equitable task allocation, and escalate if necessary',
      'Tell her it is just the culture and she will get used to it',
      'Move her to a different team without addressing the behaviour',
      'Suggest she is being oversensitive',
    ],
    correctAnswer: 0,
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
      'After a mentoring session (experience), reflecting on what happened (observation), drawing conclusions about what worked (conceptualisation), and planning to do things differently next time (experimentation)',
      'Teaching your apprentice about Kolb\u2019s cycle',
      'Only using Kolb\u2019s cycle during formal assessments',
      'Kolb\u2019s cycle only applies to learners, not mentors',
    ],
    correctAnswer: 0,
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
      'Extrinsic: rewards like certificates or bonuses. Intrinsic: the internal satisfaction of mastering a new skill.',
      'Extrinsic is always better than intrinsic',
      'Intrinsic is always better than extrinsic',
      'There is no meaningful difference between them',
    ],
    correctAnswer: 0,
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
    options: ['Affinity bias', 'Halo effect', 'Recency effect', 'Confirmation bias'],
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
      'It provides evidence of your mentoring competence for career progression, CPD records, and professional development reviews',
      'It replaces the need for formal mentoring qualifications',
      'It is only useful if you plan to become a full-time trainer',
      'There is no benefit \u2014 mentoring is not a recognised skill',
    ],
    correctAnswer: 0,
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
      'Provide clear, written task lists with visual instructions, give advance notice of any changes, and maintain consistent routines where possible',
      'Force them to adapt to the unpredictable nature of site work immediately',
      'Avoid giving them any complex tasks',
      'Treat them identically to every other apprentice with no adjustments',
    ],
    correctAnswer: 0,
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
      'Linking present effort to future outcomes \u2014 helping the learner see the bigger picture',
      'Extrinsic reward \u2014 promising a bonus for hard work',
      'Negative reinforcement \u2014 threatening consequences for poor work',
      'Social comparison \u2014 comparing them to more successful colleagues',
    ],
    correctAnswer: 0,
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
      'Document all previous conversations, escalate to management as a formal safety concern, and make clear that continued refusal could have disciplinary and legal consequences under HSWA 1974',
      'Accept their preference because they are competent',
      'Buy them more comfortable PPE and hope that resolves it',
      'Stop mentioning it because they have already been told',
    ],
    correctAnswer: 0,
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
      'Reflect on whether unconscious bias or personal factors are influencing their behaviour, seek peer feedback, and consider whether the apprentice\u2019s needs require a different mentoring approach',
      'Ask to be reassigned because they cannot work with this apprentice',
      'Suppress the feelings and carry on as normal',
      'Confront the apprentice about their annoying habits',
    ],
    correctAnswer: 0,
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
      'Address each factor individually while recognising they interact: arrange ADHD-appropriate learning methods, provide language support for written work, signpost financial assistance, and coordinate with the college\u2019s support services',
      'Focus only on the most obvious problem and ignore the others',
      'Suggest the apprentice may not be suited to the trade',
      'Treat all challenges as one single problem with one solution',
    ],
    correctAnswer: 0,
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
      'Self-determination \u2014 they have achieved full autonomy',
      'Flow \u2014 they are in a permanent state of mastery',
      'Andragogy \u2014 experienced adults do not need further development',
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
      'Restore autonomy (give choices in tasks), competence (set achievable challenges and celebrate progress), and relatedness (reconnect them with the team and their mentor)',
      'Increase extrinsic pressure with threats of dismissal',
      'Leave them alone until they find their own motivation',
      'Give them only the tasks they enjoy and skip everything else',
    ],
    correctAnswer: 0,
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
      'The mentor must act regardless of whether a formal complaint is made \u2014 challenge the behaviour, support the apprentice, and report it as the Equality Act 2010 places a duty on employers to prevent harassment',
      'Wait for a formal complaint before taking action',
      'Tell the apprentice to report it themselves if they want it addressed',
      'Speak to the senior electrician privately but take no formal action',
    ],
    correctAnswer: 0,
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
      'A portfolio showing mentee progression (e.g. NVQ completion rates), feedback from mentees, reflective accounts, CPD records, and testimonials from managers or assessors',
      'A statement saying "I have mentored apprentices for five years"',
      'A copy of their own electrical qualifications',
      'The number of apprentices they have supervised',
    ],
    correctAnswer: 0,
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
      'Consciously shift towards open questions and the GROW model, practise active listening, and ask a peer to observe and give feedback on their question-to-statement ratio',
      'Continue telling because it is faster and more efficient',
      'Only use questions and never give any information',
      'Stop having development conversations altogether',
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
