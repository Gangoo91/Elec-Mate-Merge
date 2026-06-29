/**
 * Manual Handling Mock Exam Question Bank
 *
 * 200 questions covering all 5 modules with difficulty distribution.
 *
 * Categories (5):
 *   Understanding Manual Handling (40) | Principles of Safe Lifting (40) |
 *   Risk Assessment & Reduction (40) | Workplace-Specific Handling (40) | Health, Welfare & Responsibilities (40)
 *
 * Difficulty per category: ~14 basic, ~18 intermediate, ~8 advanced
 */

import { StandardMockQuestion, MockExamConfig } from '@/types/standardMockExam';
import { getRandomQuestionsBalanced } from '@/utils/questionSelection';

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------
export const manualHandlingCategories = [
  'Understanding Manual Handling',
  'Principles of Safe Lifting',
  'Risk Assessment & Reduction',
  'Workplace-Specific Handling',
  'Health, Welfare & Responsibilities',
];

// ---------------------------------------------------------------------------
// Exam configuration
// ---------------------------------------------------------------------------
export const manualHandlingMockExamConfig: MockExamConfig = {
  examId: 'manual-handling',
  examTitle: 'Manual Handling Mock Examination',
  totalQuestions: 20,
  timeLimit: 1800,
  passThreshold: 80,
  exitPath: '/study-centre/general-upskilling/manual-handling-module-6',
  categories: manualHandlingCategories,
};

// ---------------------------------------------------------------------------
// Random question selector
// ---------------------------------------------------------------------------
export const getRandomManualHandlingExamQuestions = (numQuestions: number = 20) => {
  return getRandomQuestionsBalanced(
    manualHandlingQuestionBank,
    numQuestions,
    manualHandlingCategories
  );
};

// ---------------------------------------------------------------------------
// Question Bank — 200 questions
// ---------------------------------------------------------------------------
export const manualHandlingQuestionBank: StandardMockQuestion[] = [
  // =======================================================================
  // UNDERSTANDING MANUAL HANDLING — 40 questions (id 1–40)
  // =======================================================================
  {
    id: 1,
    question:
      'Under the Manual Handling Operations Regulations (MHOR) 1992, what is the definition of manual handling?',
    options: [
      'A bulky, unstable load with no handholds and sharp edges',
      'Any transporting or supporting of a load by hand or bodily force',
      'Take reasonable care of their own health and safety and that of others',
      'When hazardous manual handling cannot be avoided',
    ],
    correctAnswer: 1,
    explanation:
      'MHOR 1992 defines manual handling as any transporting or supporting of a load (including lifting, putting down, pushing, pulling, carrying, or moving) by hand or bodily force. It is not limited to heavy objects or lifting alone.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'MHOR 1992 definition',
    category: 'Understanding Manual Handling',
  },
  {
    id: 2,
    question: 'Which of the following activities counts as manual handling under the MHOR 1992?',
    options: [
      'Pressing buttons on a control panel',
      'Operating a forklift truck',
      'Pushing a loaded trolley along a corridor',
      'Typing at a desk workstation',
    ],
    correctAnswer: 2,
    explanation:
      'Pushing a loaded trolley involves transporting a load by bodily force, which falls within the MHOR 1992 definition of manual handling. Operating machinery, pressing buttons, and typing do not involve supporting or transporting a load by hand or bodily force.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'What counts as manual handling',
    category: 'Understanding Manual Handling',
  },
  {
    id: 3,
    question:
      'Approximately how many workers in the UK are affected by musculoskeletal disorders (MSDs) related to manual handling each year?',
    options: [
      '50,000',
      '150,000',
      '2,000,000',
      '500,000',
    ],
    correctAnswer: 3,
    explanation:
      'HSE statistics indicate that approximately 500,000 workers in the UK suffer from musculoskeletal disorders linked to manual handling each year. This makes MSDs one of the most common causes of workplace ill health.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Manual handling statistics',
    category: 'Understanding Manual Handling',
  },
  {
    id: 4,
    question:
      'What approximate percentage of all workplace injuries in the UK are attributed to manual handling?',
    options: [
      'About 30%',
      'About 20%',
      'About 10%',
      'About 50%',
    ],
    correctAnswer: 0,
    explanation:
      'Manual handling injuries account for approximately 30% of all workplace injuries reported in the UK. This highlights why proper training and risk assessment are essential in every workplace.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Manual handling statistics',
    category: 'Understanding Manual Handling',
  },
  {
    id: 5,
    question:
      'Which piece of legislation places a general duty on employers to ensure the health, safety, and welfare of employees at work?',
    options: [
      'Manual Handling Operations Regulations 1992',
      'Health and Safety at Work etc. Act 1974',
      'Workplace (Health, Safety and Welfare) Regulations 1992',
      'Provision and Use of Work Equipment Regulations 1998',
    ],
    correctAnswer: 1,
    explanation:
      'The Health and Safety at Work etc. Act 1974 (HASAWA) is the primary legislation that places a general duty on employers to ensure, so far as is reasonably practicable, the health, safety, and welfare of all employees at work.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'HASAWA 1974',
    category: 'Understanding Manual Handling',
  },
  {
    id: 6,
    question:
      'Under the Management of Health and Safety at Work Regulations 1999, employers must carry out what key activity?',
    options: [
      'Issue personal protective equipment for every task',
      'Provide free gym membership to all staff',
      'Conduct suitable and sufficient risk assessments',
      'Replace all manual handling with automation',
    ],
    correctAnswer: 2,
    explanation:
      'The Management of Health and Safety at Work Regulations 1999 require employers to carry out suitable and sufficient risk assessments for all work activities that may pose a risk to health and safety, including manual handling tasks.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Management Regs 1999',
    category: 'Understanding Manual Handling',
  },
  {
    id: 7,
    question:
      'What does the acronym TILE stand for in the context of manual handling risk assessment?',
    options: [
      'Transport, Inspection, Loading, Evaluation',
      'Training, Instruction, Lifting, Equipment',
      'Task, Injury, Legislation, Enforcement',
      'Task, Individual, Load, Environment',
    ],
    correctAnswer: 3,
    explanation:
      'TILE stands for Task, Individual, Load, and Environment. It is a structured framework used to assess the key risk factors involved in manual handling operations and identify where controls are needed.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'TILE framework overview',
    category: 'Understanding Manual Handling',
  },
  {
    id: 8,
    question: 'How many vertebrae make up the adult human spinal column?',
    options: [
      '33',
      '30',
      '26',
      '36',
    ],
    correctAnswer: 0,
    explanation:
      'The adult human spinal column consists of 33 vertebrae. These are divided into five regions: 7 cervical, 12 thoracic, 5 lumbar, 5 sacral (fused), and 4 coccygeal (fused).',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Spinal anatomy',
    category: 'Understanding Manual Handling',
  },
  {
    id: 9,
    question: 'How many regions is the human spine divided into?',
    options: [
      '4',
      '5',
      '6',
      '3',
    ],
    correctAnswer: 1,
    explanation:
      'The human spine is divided into 5 regions: cervical (neck), thoracic (mid-back), lumbar (lower back), sacral, and coccygeal (tailbone). The lumbar region is most commonly injured during manual handling.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Spinal anatomy',
    category: 'Understanding Manual Handling',
  },
  {
    id: 10,
    question: 'What is the primary function of intervertebral discs in the spine?',
    options: [
      'To produce red blood cells',
      'To transmit nerve signals to the brain',
      'To act as shock absorbers between vertebrae',
      'To store calcium for bone strength',
    ],
    correctAnswer: 2,
    explanation:
      'Intervertebral discs sit between adjacent vertebrae and act as shock absorbers, cushioning the spine during movement. They also allow flexibility and help distribute loads evenly across the spinal column.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Spinal anatomy',
    category: 'Understanding Manual Handling',
  },
  {
    id: 11,
    question: 'Which region of the spine is most commonly injured during poor manual handling?',
    options: [
      'Cervical (neck)',
      'Coccygeal (tailbone)',
      'Thoracic (mid-back)',
      'Lumbar (lower back)',
    ],
    correctAnswer: 3,
    explanation:
      'The lumbar (lower back) region is most commonly injured during manual handling because it bears the greatest load when lifting. Poor technique increases compressive forces on the lumbar discs significantly.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'How injuries occur',
    category: 'Understanding Manual Handling',
  },
  {
    id: 12,
    question:
      "Under MHOR 1992, what is an employer's first duty regarding manual handling operations?",
    options: [
      'Avoid hazardous manual handling operations so far as is reasonably practicable',
      'Provide every worker with personal protective equipment before any lift',
      'Set a fixed 25 kg maximum weight limit for all manual handling tasks',
      'Issue written lifting instructions for every load handled on site',
    ],
    correctAnswer: 0,
    explanation:
      'The hierarchy of duties under MHOR 1992 starts with avoidance. Employers must first avoid hazardous manual handling operations so far as is reasonably practicable, before moving on to assessment and risk reduction.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Employer duties under MHOR 1992',
    category: 'Understanding Manual Handling',
  },
  {
    id: 13,
    question: "What is a 'load' as defined by the MHOR 1992?",
    options: [
      'Only an inanimate object weighing more than 25 kg',
      'Any discrete moveable object, including a person or animal',
      'Only objects that are lifted, not those pushed or pulled',
      'Any object fixed in position that must be supported by hand',
    ],
    correctAnswer: 1,
    explanation:
      'Under MHOR 1992, a load includes any discrete moveable object, which can include boxes, equipment, a person (e.g. in healthcare), or even an animal. There is no minimum weight threshold for something to be considered a load.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'MHOR 1992 definition',
    category: 'Understanding Manual Handling',
  },
  {
    id: 14,
    question:
      'Which of the following is NOT one of the five steps in the manual handling risk assessment process?',
    options: [
      'Identify hazardous manual handling operations',
      'Review the assessment regularly',
      'Prosecute employees who refuse to lift',
      'Assess the risk of injury',
    ],
    correctAnswer: 2,
    explanation:
      'The five-step risk assessment process involves identifying hazards, assessing risks, reducing risks, implementing controls, and reviewing regularly. Prosecuting employees is not part of any risk assessment process.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: '5-step risk assessment',
    category: 'Understanding Manual Handling',
  },
  {
    id: 15,
    question:
      'What happens to an intervertebral disc when it is subjected to excessive compressive force during incorrect lifting?',
    options: [
      'It hardens and becomes stronger',
      'It moves to a different position between other vertebrae',
      'It dissolves and is absorbed by the body',
      'It can bulge or herniate, pressing on nearby nerves',
    ],
    correctAnswer: 3,
    explanation:
      'Excessive compressive force can cause the soft inner material (nucleus pulposus) of an intervertebral disc to bulge or herniate through the outer ring (annulus fibrosus), pressing on spinal nerves and causing severe pain.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'How injuries occur',
    category: 'Understanding Manual Handling',
  },
  {
    id: 16,
    question:
      'Under HASAWA 1974, employees also have duties. Which of the following is an employee duty?',
    options: [
      'Take reasonable care of their own health and safety and that of others',
      'Carry out workplace inspections on behalf of the HSE',
      'Write risk assessments for all manual handling tasks',
      'Provide personal protective equipment to colleagues',
    ],
    correctAnswer: 0,
    explanation:
      'Under Section 7 of HASAWA 1974, employees must take reasonable care for their own health and safety and that of other persons who may be affected by their acts or omissions at work.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Employee duties under HASAWA 1974',
    category: 'Understanding Manual Handling',
  },
  {
    id: 17,
    question: 'The MHOR 1992 follows a three-step hierarchy. What is the correct order?',
    options: [
      'Assess, reduce, avoid',
      'Avoid, assess, reduce',
      'Assess, avoid, reduce',
      'Reduce, assess, avoid',
    ],
    correctAnswer: 1,
    explanation:
      'The MHOR 1992 hierarchy requires employers to first avoid hazardous manual handling where reasonably practicable, then assess the risk of injury for any remaining operations, and finally reduce the risk of injury to the lowest level reasonably practicable.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'MHOR 1992 hierarchy',
    category: 'Understanding Manual Handling',
  },
  {
    id: 18,
    question: 'A prolapsed disc is also commonly known as what?',
    options: [
      'A fractured vertebra',
      'A dislocated joint',
      'A slipped disc',
      'A torn ligament',
    ],
    correctAnswer: 2,
    explanation:
      "A prolapsed disc is commonly referred to as a 'slipped disc', although the disc does not actually slip out of place. The inner gel-like material pushes through a weakness in the outer wall, which can compress nearby nerves.",
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'How injuries occur',
    category: 'Understanding Manual Handling',
  },
  {
    id: 19,
    question:
      'Which type of manual handling injury develops gradually over time due to repetitive tasks?',
    options: [
      'Acute injury',
      'Sudden-onset injury',
      'Traumatic injury',
      'Cumulative injury',
    ],
    correctAnswer: 3,
    explanation:
      'Cumulative injuries (also called chronic or repetitive strain injuries) develop gradually over time due to repeated manual handling tasks. They result from ongoing wear and tear on muscles, tendons, ligaments, and joints.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'How injuries occur',
    category: 'Understanding Manual Handling',
  },
  {
    id: 20,
    question: 'Which body parts are most commonly affected by manual handling injuries?',
    options: [
      'Back, neck, shoulders, arms, and legs',
      'Eyes, ears, lungs, and skin',
      'Heart, kidneys, liver, and stomach',
      'Teeth, jaw, scalp, and fingernails',
    ],
    correctAnswer: 0,
    explanation:
      'Manual handling injuries most commonly affect the back (particularly the lower back), neck, shoulders, arms, and legs. The back is the single most frequently injured area, but upper and lower limbs are also at significant risk.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'How injuries occur',
    category: 'Understanding Manual Handling',
  },
  {
    id: 21,
    question: 'Under MHOR 1992, when must an employer carry out a manual handling risk assessment?',
    options: [
      'Only after an accident has occurred',
      'When hazardous manual handling cannot be avoided',
      'Only if the load weighs more than 25 kg',
      'Only when requested by the HSE',
    ],
    correctAnswer: 1,
    explanation:
      'Under MHOR 1992, if an employer cannot avoid a hazardous manual handling operation, they must carry out a suitable and sufficient assessment of the risk of injury. This must be done proactively, not just after an incident.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Employer duties under MHOR 1992',
    category: 'Understanding Manual Handling',
  },
  {
    id: 22,
    question: 'How many cervical vertebrae are there in the human spine?',
    options: [
      '5',
      '12',
      '7',
      '4',
    ],
    correctAnswer: 2,
    explanation:
      'There are 7 cervical vertebrae (C1-C7) in the neck region of the spine. The cervical spine supports the head and allows a wide range of head movements. It is the most mobile section of the spinal column.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Spinal anatomy',
    category: 'Understanding Manual Handling',
  },
  {
    id: 23,
    question: 'How many thoracic vertebrae are there in the human spine?',
    options: [
      '5',
      '7',
      '9',
      '12',
    ],
    correctAnswer: 3,
    explanation:
      'There are 12 thoracic vertebrae (T1-T12) in the mid-back region. Each thoracic vertebra articulates with a pair of ribs, making this the least mobile section of the spine. It provides structural support for the rib cage.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Spinal anatomy',
    category: 'Understanding Manual Handling',
  },
  {
    id: 24,
    question: 'Which of the following is an example of an acute manual handling injury?',
    options: [
      'A sudden muscle tear from lifting a heavy object incorrectly',
      'Gradual onset of shoulder pain over several months',
      'Carpal tunnel syndrome from repetitive wrist movements',
      'Chronic lower back stiffness from years of bending',
    ],
    correctAnswer: 0,
    explanation:
      'An acute injury occurs suddenly, usually from a single incident such as an incorrect lift. A sudden muscle tear is a classic example of an acute manual handling injury, as opposed to cumulative injuries that develop over time.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'How injuries occur',
    category: 'Understanding Manual Handling',
  },
  {
    id: 25,
    question: "What does the 'T' in the TILE framework specifically ask you to consider?",
    options: [
      'The temperature of the load and whether it is too hot or cold to grip safely',
      'The nature of the task — does it involve twisting, bending, reaching, or repetition?',
      'The training record of the handler and whether it is up to date',
      'The total combined weight of the load and the equipment used to move it',
    ],
    correctAnswer: 1,
    explanation:
      "The 'T' (Task) in TILE asks you to consider the nature of the task itself — does it involve twisting, bending, stooping, reaching, repetitive movements, long carrying distances, or sustained physical effort?",
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'TILE framework overview',
    category: 'Understanding Manual Handling',
  },
  {
    id: 26,
    question: "What does the 'I' in the TILE framework ask you to assess?",
    options: [
      'The distance the load must be carried and the height it is lifted to',
      'The shape, weight, and stability of the load being handled',
      'The individual — their capability, fitness, training, and any health conditions',
      'The condition of the floor and the amount of space available to work in',
    ],
    correctAnswer: 2,
    explanation:
      "The 'I' (Individual) in TILE considers the person doing the handling — their physical capability, fitness level, training, any pre-existing health conditions, pregnancy, and whether they have the necessary knowledge and experience.",
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'TILE framework overview',
    category: 'Understanding Manual Handling',
  },
  {
    id: 27,
    question: "What does the 'L' in the TILE framework require you to consider about the load?",
    options: [
      'The distance the load must be carried and the time taken to complete the task',
      'The handler\'s physical fitness and any pre-existing health conditions affecting them',
      'The lighting, floor surface, and amount of free space around the load',
      'The weight, shape, size, stability, grip, and whether it contains anything hazardous',
    ],
    correctAnswer: 3,
    explanation:
      "The 'L' (Load) factor requires consideration of the load's weight, shape, size, stability, whether it has adequate handholds, whether it is hot or has sharp edges, and whether its contents might shift during handling.",
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'TILE framework overview',
    category: 'Understanding Manual Handling',
  },
  {
    id: 28,
    question: "What factors does the 'E' in the TILE framework cover?",
    options: [
      'The environment — space, floor conditions, lighting, temperature, and obstacles',
      'The frequency of the lift and whether the trunk must be twisted',
      'The weight of the load and whether its centre of gravity is offset',
      'The handler\'s physical fitness and any pre-existing health conditions',
    ],
    correctAnswer: 0,
    explanation:
      "The 'E' (Environment) in TILE covers the working environment including available space, floor conditions (wet, uneven, slippery), lighting levels, temperature extremes, weather conditions, and any obstacles or hazards in the area.",
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'TILE framework overview',
    category: 'Understanding Manual Handling',
  },
  {
    id: 29,
    question:
      'Which of the following is a musculoskeletal disorder (MSD) commonly caused by manual handling?',
    options: [
      'Asthma',
      'Tendonitis',
      'Dermatitis',
      'Tinnitus',
    ],
    correctAnswer: 1,
    explanation:
      'Tendonitis (inflammation of a tendon) is a common musculoskeletal disorder caused by repetitive manual handling tasks. Other manual handling MSDs include back pain, herniated discs, sprains, strains, and joint problems.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'How injuries occur',
    category: 'Understanding Manual Handling',
  },
  {
    id: 30,
    question:
      "What is the purpose of the HSE's five-step approach to manual handling risk assessment?",
    options: [
      'To set a fixed maximum weight limit that no load may legally exceed',
      'To record every minor handling task in a register for HSE inspection',
      'To provide a systematic method for identifying, assessing, and controlling manual handling risks',
      'To certify each worker as competent before they handle any load',
    ],
    correctAnswer: 2,
    explanation:
      "The HSE's five-step approach provides a systematic framework for identifying hazardous operations, assessing the risks, reducing risks to the lowest level reasonably practicable, implementing controls, and reviewing assessments regularly.",
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: '5-step risk assessment',
    category: 'Understanding Manual Handling',
  },
  {
    id: 31,
    question:
      'An employee has a pre-existing back condition. Under MHOR 1992, what should the employer do?',
    options: [
      "Require the employee to obtain a doctor's certificate before any lifting",
      "Ignore the condition unless the employee formally raises a grievance",
      "Transfer the employee to a different employer better suited to their needs",
      "Take account of the individual's condition when assessing risk and adapt tasks accordingly",
    ],
    correctAnswer: 3,
    explanation:
      "Under MHOR 1992 and the 'Individual' factor of TILE, employers must take account of any individual characteristics that may increase the risk of injury, including pre-existing conditions. Reasonable adjustments should be made to tasks.",
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Individual factors in MHOR 1992',
    category: 'Understanding Manual Handling',
  },
  {
    id: 32,
    question: 'How many lumbar vertebrae does the human spine contain?',
    options: [
      '5',
      '4',
      '7',
      '12',
    ],
    correctAnswer: 0,
    explanation:
      'The lumbar region contains 5 vertebrae (L1-L5). These are the largest and strongest vertebrae as they bear the most weight. The lumbar spine is particularly vulnerable during manual handling due to the high compressive forces placed upon it.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Spinal anatomy',
    category: 'Understanding Manual Handling',
  },
  {
    id: 33,
    question:
      'Under the Management of Health and Safety at Work Regulations 1999, what additional duty applies regarding young workers and manual handling?',
    options: [
      'Young persons are exempt from manual handling duties until they reach 18',
      'A specific risk assessment must be carried out for young persons before they start work',
      'Young persons may only handle loads below half the adult guideline weight',
      'Young persons must hold a recognised lifting certificate before any handling',
    ],
    correctAnswer: 1,
    explanation:
      'The Management Regulations 1999 require employers to carry out a specific risk assessment for young persons (under 18) before they start work. This must take into account their inexperience, lack of awareness of risks, and physical immaturity.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'Management Regs 1999',
    category: 'Understanding Manual Handling',
  },
  {
    id: 34,
    question:
      'When calculating the compressive force on the lumbar spine during a lift, which factor has the greatest influence?',
    options: [
      'The colour and material of the load being lifted',
      'The handler\'s height relative to the average for their sex',
      'The horizontal distance between the load and the spine',
      'The time of day at which the lift is performed',
    ],
    correctAnswer: 2,
    explanation:
      "The horizontal distance between the load and the spine is the most significant factor affecting lumbar compressive force. Holding a load at arm's length can create compressive forces on the L5/S1 disc several times greater than holding it close to the body.",
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'How injuries occur',
    category: 'Understanding Manual Handling',
  },
  {
    id: 35,
    question:
      "Which section of HASAWA 1974 specifically covers employees' duties to cooperate with their employer on health and safety matters?",
    options: [
      'Section 2',
      'Section 3',
      'Section 9',
      'Section 7',
    ],
    correctAnswer: 3,
    explanation:
      'Section 7 of HASAWA 1974 places duties on employees to take reasonable care and to cooperate with their employer so far as is necessary to enable the employer to comply with health and safety requirements.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'HASAWA 1974',
    category: 'Understanding Manual Handling',
  },
  {
    id: 36,
    question:
      'A worker suffers a herniated disc at L4/L5 during a manual handling operation. What structure has been damaged?',
    options: [
      'The annulus fibrosus has ruptured allowing the nucleus pulposus to protrude',
      'The vertebral body itself has cracked, causing a compression fracture',
      'The spinal cord has been severed at the level of the L4/L5 junction',
      'One of the facet joint ligaments has torn, allowing the vertebrae to separate',
    ],
    correctAnswer: 0,
    explanation:
      'A herniated (prolapsed) disc occurs when the annulus fibrosus (tough outer ring of the disc) ruptures, allowing the nucleus pulposus (soft gel-like centre) to protrude outwards. At L4/L5, this commonly compresses the L5 nerve root, causing sciatica.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'Spinal anatomy',
    category: 'Understanding Manual Handling',
  },
  {
    id: 37,
    question:
      'Under MHOR 1992, Schedule 1 lists factors to consider in a risk assessment. Which of the following is NOT a Schedule 1 factor?',
    options: [
      'The task involves twisting the trunk',
      'The handler has less than one year of service with the employer',
      'The load is unwieldy or difficult to grasp',
      "The environment constrains the handler's posture",
    ],
    correctAnswer: 1,
    explanation:
      'Schedule 1 of MHOR 1992 lists specific risk factors relating to the task, load, working environment, individual capability, and other factors. Length of service with an employer is not a listed factor; relevant individual factors relate to physical capability and health conditions.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'MHOR 1992 Schedule 1',
    category: 'Understanding Manual Handling',
  },
  {
    id: 38,
    question:
      "What is the approximate compressive force on the L5/S1 disc when a 70 kg person lifts a 20 kg load at arm's length?",
    options: [
      'Around 200 N',
      'Around 1,500 N',
      'Around 3,400 N or more',
      'Around 500 N',
    ],
    correctAnswer: 2,
    explanation:
      "Biomechanical studies show that lifting a 20 kg load at arm's length can create compressive forces of around 3,400 N or more on the L5/S1 disc. This is well above the commonly cited action limit of 3,400 N and close to levels associated with disc damage.",
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'Biomechanics of injury',
    category: 'Understanding Manual Handling',
  },
  {
    id: 39,
    question:
      "What is the legal significance of the phrase 'so far as is reasonably practicable' as used in MHOR 1992?",
    options: [
      'It means employers must eliminate all risks regardless of cost',
      'It only applies to employers with more than 50 employees',
      'It means employers can ignore risks if they choose to',
      'It requires a balance between the level of risk and the cost, time, and effort of reducing it',
    ],
    correctAnswer: 3,
    explanation:
      "The phrase 'so far as is reasonably practicable' means that the degree of risk must be balanced against the sacrifice (in terms of money, time, or trouble) needed to avert it. If the risk is significant, proportionate action must be taken unless grossly disproportionate to the risk.",
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'Legal interpretation of MHOR 1992',
    category: 'Understanding Manual Handling',
  },
  {
    id: 40,
    question:
      "Which court case established the principle that an employer's duty under MHOR 1992 is not absolute but qualified by 'reasonably practicable'?",
    options: [
      'Edwards v National Coal Board (1949)',
      'Donoghue v Stevenson (1932)',
      'Rylands v Fletcher (1868)',
      'Smith v Baker (1891)',
    ],
    correctAnswer: 0,
    explanation:
      "Edwards v National Coal Board (1949) is the leading case that defined 'reasonably practicable'. The court held that a computation must be made between the quantum of risk and the sacrifice involved in the measures necessary to avert it.",
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'Legal interpretation of MHOR 1992',
    category: 'Understanding Manual Handling',
  },
  // =======================================================================
  // PRINCIPLES OF SAFE LIFTING — 40 questions (id 41–80)
  // =======================================================================
  {
    id: 41,
    question: 'What is the first step in the kinetic lifting technique?',
    options: [
      'Grip the load tightly and pull upwards',
      'Plan the lift — assess the load, route, and destination',
      'Bend at the waist and reach for the load',
      'Take a deep breath and hold it throughout the lift',
    ],
    correctAnswer: 1,
    explanation:
      "The first step in the kinetic lifting technique is to plan the lift. This includes assessing the load's weight and stability, checking the route is clear, identifying where the load will be placed, and deciding if help or equipment is needed.",
    section: 'Module 2',
    difficulty: 'basic',
    topic: '8-step kinetic lifting technique',
    category: 'Principles of Safe Lifting',
  },
  {
    id: 42,
    question: 'When lifting a load from the ground, which part of the body should you bend?',
    options: [
      'The waist only, keeping the legs straight throughout',
      'The neck, tucking the chin onto the chest to lift',
      'The knees and hips, keeping the back straight',
      'The ankles only, raising up onto the toes to lift',
    ],
    correctAnswer: 2,
    explanation:
      'You should bend at the knees and hips while keeping your back naturally straight (maintaining its natural curves). This uses the strong leg muscles to power the lift rather than placing excessive stress on the lower back.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: '8-step kinetic lifting technique',
    category: 'Principles of Safe Lifting',
  },
  {
    id: 43,
    question: "What does 'base of support' mean in the context of safe lifting?",
    options: [
      'The shelf or surface the load rests on',
      'The bottom of the load being lifted',
      'The floor of the building where the lift takes place',
      'The area between and beneath your feet that provides stability',
    ],
    correctAnswer: 3,
    explanation:
      'The base of support is the area between and beneath your feet. A wider base of support (feet shoulder-width apart, with one foot slightly forward) provides greater stability during a lift and reduces the risk of losing balance.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Base of support',
    category: 'Principles of Safe Lifting',
  },
  {
    id: 44,
    question: "Where is the 'power zone' for safe lifting?",
    options: [
      'Between the knees and the shoulders, close to the body',
      'Above shoulder height, with the arms fully extended overhead',
      'Below knee height, with the load at floor level',
      'At arm\'s length in front of the body, away from the chest',
    ],
    correctAnswer: 0,
    explanation:
      'The power zone (also called the comfort zone) is the area between knee height and shoulder height, close to the body. Lifting within this zone minimises stress on the back and allows the strongest muscles to do the work.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Power zone',
    category: 'Principles of Safe Lifting',
  },
  {
    id: 45,
    question: 'Is pushing or pulling generally considered safer when moving a load?',
    options: [
      'Pulling is always safer than pushing',
      'Pushing is generally safer than pulling',
      'There is no difference between pushing and pulling',
      'Neither pushing nor pulling is safe',
    ],
    correctAnswer: 1,
    explanation:
      'Pushing is generally safer than pulling because you can use your body weight to assist, maintain a better posture, see where you are going, and apply force more effectively. Pulling increases the risk of overloading the back and losing balance.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Pushing vs pulling',
    category: 'Principles of Safe Lifting',
  },
  {
    id: 46,
    question: 'How should your feet be positioned when preparing to lift a load?',
    options: [
      'Close together, pointing straight ahead at the load',
      'As wide apart as possible, well beyond shoulder width',
      'Shoulder-width apart with one foot slightly forward',
      'Crossed over one another to brace against the lift',
    ],
    correctAnswer: 2,
    explanation:
      'Feet should be shoulder-width apart with one foot slightly forward (alongside the load). This stance provides a stable base of support and allows you to shift your weight smoothly during the lift.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: '8-step kinetic lifting technique',
    category: 'Principles of Safe Lifting',
  },
  {
    id: 47,
    question: 'Why should you keep a load close to your body during lifting?',
    options: [
      'To make the load feel heavier and so improve grip strength',
      'To allow the arms rather than the legs to power the lift',
      'To keep the load warm and prevent the contents from shifting',
      'To reduce the lever effect and decrease strain on the spine',
    ],
    correctAnswer: 3,
    explanation:
      'Keeping a load close to the body reduces the lever (moment arm) effect. The further a load is held from the spine, the greater the compressive force on the lumbar discs. Keeping it close significantly reduces spinal loading.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Centre of gravity',
    category: 'Principles of Safe Lifting',
  },
  {
    id: 48,
    question: 'When carrying a load, where should you look?',
    options: [
      'Ahead in the direction of travel',
      'Down at the load at all times',
      'Up at the ceiling to keep your back straight',
      'Behind you to check for other workers',
    ],
    correctAnswer: 0,
    explanation:
      'When carrying a load, you should look ahead in the direction of travel. This helps you maintain good posture, see any obstacles or hazards in your path, and navigate safely to your destination.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Carrying techniques',
    category: 'Principles of Safe Lifting',
  },
  {
    id: 49,
    question: 'What should you do if a load is too heavy for you to lift safely on your own?',
    options: [
      'Try to lift it anyway using maximum effort',
      'Get help from others or use a mechanical aid',
      'Leave it where it is and go home',
      'Drag it along the floor',
    ],
    correctAnswer: 1,
    explanation:
      'If a load is too heavy for a solo lift, you should get help from one or more colleagues or use an appropriate mechanical aid such as a trolley, sack truck, or hoist. Never attempt to lift a load beyond your capability.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Team handling',
    category: 'Principles of Safe Lifting',
  },
  {
    id: 50,
    question: "What is the purpose of a 'test lift' before fully lifting a load?",
    options: [
      "To warm up the back muscles immediately before the full lift",
      "To demonstrate the correct technique to other workers nearby",
      "To check the load's weight and stability before committing to the full lift",
      "To compress the load so it takes up less space while carrying",
    ],
    correctAnswer: 2,
    explanation:
      'A test lift involves gently rocking or partially lifting the load to assess its weight, stability, and whether the contents might shift. This allows you to determine whether you can lift it safely or need assistance before committing to the full lift.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: '8-step kinetic lifting technique',
    category: 'Principles of Safe Lifting',
  },
  {
    id: 51,
    question: 'Why should you avoid twisting your trunk while carrying a load?',
    options: [
      'Twisting under load helps distribute the weight evenly across the back',
      'Twisting under load strengthens the core muscles over time',
      'Twisting under load improves visibility of the route ahead',
      'Twisting under load places shear forces on the spine, increasing injury risk',
    ],
    correctAnswer: 3,
    explanation:
      'Twisting the trunk while carrying a load places significant shear forces on the intervertebral discs and surrounding structures. Combined with compressive force from the load, this greatly increases the risk of disc injury and muscle strain.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: '8-step kinetic lifting technique',
    category: 'Principles of Safe Lifting',
  },
  {
    id: 52,
    question:
      'According to HSE guidelines, what is the approximate guideline force for starting a load in motion on a flat surface for men?',
    options: [
      '20 kg',
      '10 kg',
      '35 kg',
      '50 kg',
    ],
    correctAnswer: 0,
    explanation:
      'HSE pushing and pulling guidelines suggest that the force needed to start a load moving should be approximately 20 kg (about 200 N) for men on a flat surface. For sustaining the movement, the guideline drops to about 10 kg (100 N).',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'HSE force guidelines',
    category: 'Principles of Safe Lifting',
  },
  {
    id: 53,
    question:
      'What is the approximate HSE guideline force for sustaining a pushing or pulling movement for men?',
    options: [
      '30 kg',
      '10 kg',
      '20 kg',
      '5 kg',
    ],
    correctAnswer: 1,
    explanation:
      'The HSE guideline for the sustained force required to keep a load moving is approximately 10 kg (about 100 N) for men. This is lower than the initial starting force of 20 kg because less effort is needed once the load is in motion.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'HSE force guidelines',
    category: 'Principles of Safe Lifting',
  },
  {
    id: 54,
    question: 'In a team lift, who should give the commands to lift and lower?',
    options: [
      'Everyone at the same time',
      'The person closest to the exit',
      'One designated leader',
      'No commands are necessary',
    ],
    correctAnswer: 2,
    explanation:
      "In a team lift, one person should be designated as the leader who gives clear verbal commands (e.g. 'Ready, steady, lift'). This ensures all team members lift and lower simultaneously, preventing uneven loading and potential injuries.",
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Team handling',
    category: 'Principles of Safe Lifting',
  },
  {
    id: 55,
    question: 'What is the maximum recommended number of people for a team lift?',
    options: [
      '2 people',
      'There is no limit',
      '8 people',
      '4 people',
    ],
    correctAnswer: 3,
    explanation:
      'The maximum recommended number for a team lift is approximately 4 people. Beyond this number, coordination becomes increasingly difficult, the load cannot be shared evenly, and the risk of someone losing their grip increases significantly.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Team handling',
    category: 'Principles of Safe Lifting',
  },
  {
    id: 56,
    question:
      "When performing a team lift, each person's share of the load should be estimated at what fraction of the total?",
    options: [
      "Each person's share should be reduced by at least one-third compared to their equal mathematical share",
      'Each person should assume they carry only one-third of the total regardless of team size',
      'The load should be calculated as each person carrying roughly two-thirds of what they could individually manage',
      'Each person carries their equal mathematical share',
    ],
    correctAnswer: 0,
    explanation:
      "In team lifts, the load is not shared perfectly equally due to coordination difficulties. Each person's effective share should be reduced by at least one-third compared to their mathematical share. For example, in a two-person lift, each should assume they are carrying roughly two-thirds of half the load.",
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Team handling',
    category: 'Principles of Safe Lifting',
  },
  {
    id: 57,
    question:
      'How should a long load (such as a length of conduit or pipe) be carried by two people?',
    options: [
      'Both people should carry it on the same shoulder',
      'One person at each end, both on the same side, communicating clearly',
      'One person should carry both ends while the other watches',
      'The load should be carried vertically above head height',
    ],
    correctAnswer: 1,
    explanation:
      'A long load should be carried by one person at each end, on the same side of the body, communicating clearly to coordinate movement. The person at the rear should be able to see ahead, and both must move in step to prevent twisting.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Long loads',
    category: 'Principles of Safe Lifting',
  },
  {
    id: 58,
    question: 'What is the correct technique for lowering a load to the ground?',
    options: [
      'Keep the legs straight and bend forward from the waist to set it down',
      'Drop the load the last few centimetres to save effort on the knees',
      'Reverse the lifting technique — bend the knees and hips, keep the back straight',
      'Twist the trunk to place the load beside you without moving your feet',
    ],
    correctAnswer: 2,
    explanation:
      'Lowering a load should reverse the lifting technique: bend the knees and hips while keeping the back naturally straight. Position the load then release your grip. Dropping or throwing loads creates impact hazards and does not constitute safe handling.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: '8-step kinetic lifting technique',
    category: 'Principles of Safe Lifting',
  },
  {
    id: 59,
    question: 'Why should you tuck your chin in slightly when lifting?',
    options: [
      'To allow you to see the floor directly beneath your feet',
      'To brace the neck muscles so they take the weight of the load',
      'To shift your centre of gravity backwards over your heels',
      'To help maintain the natural curvature of the spine and keep the back straight',
    ],
    correctAnswer: 3,
    explanation:
      'Tucking your chin in slightly helps to maintain the natural curvature of the spine and keeps the back in a neutral position. This aligns the cervical, thoracic, and lumbar spine, distributing forces more evenly during the lift.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: '8-step kinetic lifting technique',
    category: 'Principles of Safe Lifting',
  },
  {
    id: 60,
    question: "What is meant by the 'centre of gravity' when lifting?",
    options: [
      'The point at which the weight of the body (and load) is concentrated and balanced',
      'The lowest point of the load, where it makes contact with the ground',
      'The total combined weight of the handler and the load being carried',
      'The vertical line running through the handler\'s spine while standing upright',
    ],
    correctAnswer: 0,
    explanation:
      'The centre of gravity is the theoretical point at which all the weight of the body (and any load being carried) is concentrated. Keeping this point over the base of support is essential for maintaining balance during lifting.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Centre of gravity',
    category: 'Principles of Safe Lifting',
  },
  {
    id: 61,
    question: 'When should you use a hook grip rather than a full grip on a load?',
    options: [
      'When the load is smooth-sided with no openings to hook into',
      'When the load has handles or cut-outs that accommodate the fingers',
      'When the load is too hot to grip with the full palm of the hand',
      'When the load is heavier than the HSE guideline weight for the handler',
    ],
    correctAnswer: 1,
    explanation:
      'A hook grip (fingers hooked through handles or openings) can be used when the load has suitable handles or cut-outs. However, a full grip (palm and fingers wrapped around the load) is generally more secure and reduces the risk of the load slipping.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Carrying techniques',
    category: 'Principles of Safe Lifting',
  },
  {
    id: 62,
    question:
      'Why is it important to wear appropriate footwear when performing manual handling tasks?',
    options: [
      'To make the handler taller and improve their reach',
      'To keep the feet warm and so improve circulation during lifting',
      'To provide grip, stability, and protection from dropped loads',
      'To reduce the weight the legs must support during the lift',
    ],
    correctAnswer: 2,
    explanation:
      'Appropriate footwear (typically safety boots with steel toecaps and slip-resistant soles) provides grip on the floor surface, stability during lifting, and protection in case a load is dropped. Poor footwear significantly increases the risk of slips and crush injuries.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Carrying techniques',
    category: 'Principles of Safe Lifting',
  },
  {
    id: 63,
    question:
      'When carrying a load up or down stairs, what additional precautions should be taken?',
    options: [
      'Move as quickly as possible to minimise time spent on the stairs',
      'Carry the load high above the head to keep it clear of the steps',
      'Skip alternate steps to reduce the number of movements required',
      'Ensure clear vision of the steps, use handrails where possible, and take one step at a time',
    ],
    correctAnswer: 3,
    explanation:
      'When using stairs, you should ensure you can see the steps (the load should not block your view), use handrails where possible, take one step at a time, and move slowly and carefully. Team lifts on stairs require extra coordination.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Stairways',
    category: 'Principles of Safe Lifting',
  },
  {
    id: 64,
    question:
      'What is the recommended technique for handling an awkward or bulky load that obscures your vision?',
    options: [
      'Use a mechanical aid, get help, or break the load into smaller manageable parts',
      'Lift it higher so you can see the route beneath the load',
      'Move quickly so you spend less time with restricted vision',
      'Tilt the load to one side and look around the gap as you walk',
    ],
    correctAnswer: 0,
    explanation:
      'If a load is too bulky to see around, you should use a mechanical aid, seek assistance from a colleague, or break the load into smaller parts. If a team carries it, a spotter should guide the way. Never carry a load that blocks your vision.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Awkward loads',
    category: 'Principles of Safe Lifting',
  },
  {
    id: 65,
    question:
      'What is the main benefit of using smooth, controlled movements rather than jerky actions when lifting?',
    options: [
      'It allows the lift to be completed in less time overall',
      'It reduces the peak forces on the spine and muscles, lowering injury risk',
      'It increases the maximum weight that can safely be lifted',
      'It removes the need to keep the load close to the body',
    ],
    correctAnswer: 1,
    explanation:
      'Smooth, controlled movements reduce the peak (dynamic) forces placed on the spine and muscles. Jerky or sudden movements create much higher instantaneous loads than the static weight of the object, significantly increasing the risk of injury.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: '8-step kinetic lifting technique',
    category: 'Principles of Safe Lifting',
  },
  {
    id: 66,
    question: 'How should you handle a load in a restricted or confined space?',
    options: [
      'Lift the load as quickly as possible to spend less time in the space',
      'Use a full forward stoop, as bending the knees wastes valuable space',
      'Adapt the technique, reduce load size where possible, and ensure adequate space to maintain good posture',
      'Carry the maximum load each trip to reduce the number of entries',
    ],
    correctAnswer: 2,
    explanation:
      'In confined spaces, you should adapt your technique to the available space, reduce load size where possible, maintain as good a posture as you can, and consider alternative methods. Poor posture forced by confined spaces significantly increases injury risk.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Restricted spaces',
    category: 'Principles of Safe Lifting',
  },
  {
    id: 67,
    question: 'What is the recommended height range for push/pull handles to minimise injury risk?',
    options: [
      'Below knee height, so the handler can use a low pushing stance',
      'At head height, so the handler can see clearly over the load',
      'At ankle height, to keep the centre of gravity as low as possible',
      'Between knee height and shoulder height, ideally between hip and chest',
    ],
    correctAnswer: 3,
    explanation:
      'Push/pull handles should ideally be between hip and chest height (roughly between waist and shoulder level). This allows the handler to apply force in a horizontal direction while maintaining good posture, reducing the risk of back strain.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Pushing vs pulling',
    category: 'Principles of Safe Lifting',
  },
  {
    id: 68,
    question:
      'When lifting, why is it important to breathe naturally rather than holding your breath?',
    options: [
      'Holding your breath can raise blood pressure dangerously and reduce stability',
      'Holding your breath strengthens the abdominal muscles during the lift',
      'Breathing out fully empties the lungs and lowers the centre of gravity',
      'Holding your breath helps you lift heavier loads than you otherwise could',
    ],
    correctAnswer: 0,
    explanation:
      'Holding your breath during a lift (known as the Valsalva manoeuvre) can cause a dangerous spike in blood pressure, dizziness, and even fainting. Breathing naturally maintains oxygen supply to muscles and keeps blood pressure stable.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: '8-step kinetic lifting technique',
    category: 'Principles of Safe Lifting',
  },
  {
    id: 69,
    question: 'What happens to the effective weight of a load as it is held further from the body?',
    options: [
      'The effective weight decreases',
      'The effective weight increases due to the lever effect',
      'The effective weight stays the same',
      "The effective weight becomes zero at arm's length",
    ],
    correctAnswer: 1,
    explanation:
      "As a load is held further from the body, the lever arm increases, meaning the effective force on the spine increases dramatically. A 10 kg load held at arm's length can create the same spinal loading as a much heavier load held close to the body.",
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Centre of gravity',
    category: 'Principles of Safe Lifting',
  },
  {
    id: 70,
    question: 'When lifting with a colleague, what should you do if the load begins to slip?',
    options: [
      'Lunge quickly to catch the load before it falls to the floor',
      'Let go of your side and let your partner take the full weight',
      'Communicate immediately, lower the load to the ground in a controlled manner, and re-grip',
      'Twist your body to bring the slipping side back under control',
    ],
    correctAnswer: 2,
    explanation:
      'If a load begins to slip during a team lift, you should immediately communicate with your partner, lower the load to the ground in a controlled manner, and then re-grip properly before attempting to lift again. Lunging or sudden movements increase injury risk.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Team handling',
    category: 'Principles of Safe Lifting',
  },
  {
    id: 71,
    question:
      'What is the biomechanical advantage of bending the knees rather than the back when lifting?',
    options: [
      'It transfers the entire load onto the lower back muscles',
      'It lengthens the moment arm and so increases lifting power',
      'It locks the knee joints to provide a rigid lifting platform',
      'It uses the large quadriceps and gluteal muscles while reducing the moment arm on the lumbar spine',
    ],
    correctAnswer: 3,
    explanation:
      'Bending the knees engages the large, powerful quadriceps and gluteal muscles for the lift while keeping the trunk more upright, which reduces the horizontal distance (moment arm) between the load and the lumbar spine. This significantly decreases compressive forces on the lumbar discs.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Biomechanics of lifting',
    category: 'Principles of Safe Lifting',
  },
  {
    id: 72,
    question: "What does 'intra-abdominal pressure' contribute to during a manual lift?",
    options: [
      'It provides additional support and stability to the lumbar spine during exertion',
      'It increases blood flow to the legs, powering the lift',
      'It reduces the weight of the load by displacing internal organs',
      'It lubricates the intervertebral discs to prevent friction damage',
    ],
    correctAnswer: 0,
    explanation:
      'Increased intra-abdominal pressure (generated by the abdominal and trunk muscles contracting) acts like an internal splint, providing additional support and stability to the lumbar spine during lifting. This is why core strength is important for manual handling.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Biomechanics of lifting',
    category: 'Principles of Safe Lifting',
  },
  {
    id: 73,
    question:
      'A load with an offset centre of gravity (e.g. contents shifted to one side) presents what specific risk?',
    options: [
      "The load becomes lighter on one side and easier to carry",
      "Unexpected twisting forces on the handler's spine as the load tilts",
      "The load is impossible to lift without a mechanical aid by law",
      "The handler's grip strength is doubled on the heavier side",
    ],
    correctAnswer: 1,
    explanation:
      "A load with an offset centre of gravity can tilt unexpectedly when lifted, imposing sudden asymmetric and twisting forces on the handler's spine. This creates shear forces on the lumbar discs and increases the risk of muscle strain and disc injury.",
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Centre of gravity',
    category: 'Principles of Safe Lifting',
  },
  {
    id: 74,
    question:
      'When comparing a stoop lift (bending at the waist) with a squat lift (bending at the knees), which statement is biomechanically correct?',
    options: [
      'A stoop lift is always safer because it is quicker to perform',
      'Both techniques place identical forces on the lumbar spine',
      'A squat lift generally creates less compressive force on the lumbar spine for heavier loads',
      'A stoop lift uses the leg muscles more effectively than a squat lift',
    ],
    correctAnswer: 2,
    explanation:
      'For heavier loads, a squat lift generally creates less compressive force on the lumbar spine because it keeps the trunk more upright and reduces the moment arm. However, for very light objects or where knee bending is restricted, a semi-stoop may be acceptable.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Biomechanics of lifting',
    category: 'Principles of Safe Lifting',
  },
  {
    id: 75,
    question: "What is the 'Valsalva manoeuvre' and why is it a risk during heavy lifting?",
    options: [
      'A two-person lifting method for long, awkward loads such as conduit',
      'A stretching routine performed before any manual handling task',
      'A grip technique using the fingers hooked through the load handles',
      'Holding the breath while bearing down, which can cause a dangerous rise in blood pressure',
    ],
    correctAnswer: 3,
    explanation:
      'The Valsalva manoeuvre involves holding the breath while bearing down against a closed glottis during heavy exertion. It causes a sudden spike in blood pressure followed by a rapid drop, which can lead to dizziness, fainting, or cardiovascular events.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Biomechanics of lifting',
    category: 'Principles of Safe Lifting',
  },
  {
    id: 76,
    question: "In ergonomic terms, what does the 'moment of force' represent when lifting?",
    options: [
      'The rotational force around a joint, calculated as force multiplied by the perpendicular distance from the joint',
      'The total weight of the load measured in newtons at the point of grip',
      'The brief instant at which the load first leaves the ground during a lift',
      'The downward pull of gravity acting vertically through the load only',
    ],
    correctAnswer: 0,
    explanation:
      'The moment of force (torque) is the rotational force acting around a joint, calculated as the force (weight of load) multiplied by the perpendicular distance from that joint. A larger moment arm (load held further away) creates greater torque on the lumbar spine.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Biomechanics of lifting',
    category: 'Principles of Safe Lifting',
  },
  {
    id: 77,
    question:
      'When handling loads on stairs, why is it recommended that the person at the lower end bears the greater share of the weight?',
    options: [
      'The lower person can see the steps and so should carry more',
      'Gravity causes the load to shift downwards, so the lower person naturally takes more weight',
      'The lower person has a shorter distance to travel to the destination',
      'The upper person needs a free hand to hold the handrail at all times',
    ],
    correctAnswer: 1,
    explanation:
      'When carrying loads on stairs, gravity causes the weight to shift towards the lower end. The person at the lower position naturally bears a greater proportion of the load. Both handlers need to be aware of this, and the stronger handler should ideally take the lower position.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Stairways',
    category: 'Principles of Safe Lifting',
  },
  {
    id: 78,
    question:
      'What effect does twisting combined with lateral bending have on the intervertebral discs during a loaded lift?',
    options: [
      'It spreads the load evenly across the discs, reducing peak stress',
      'It has no measurable effect on the discs provided the load is light',
      'It creates complex combined stresses including compression, shear, and torsion that greatly increase failure risk',
      'It only affects the muscles, leaving the intervertebral discs unloaded',
    ],
    correctAnswer: 2,
    explanation:
      "Combining twisting with lateral bending under load creates complex multi-directional stresses on the intervertebral discs including compression, shear, and torsion simultaneously. This combination is particularly dangerous as it can exceed the disc's failure threshold.",
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Biomechanics of lifting',
    category: 'Principles of Safe Lifting',
  },
  {
    id: 79,
    question:
      'When pushing a heavy wheeled load over a long distance, what is the physiological concern beyond musculoskeletal injury?',
    options: [
      'Pushing causes the leg muscles to shorten permanently over time',
      'Pushing over distance has no effect beyond the initial starting force',
      'Pushing reduces grip strength only in the dominant hand',
      'Sustained pushing increases cardiovascular demand and can lead to fatigue, increasing accident risk',
    ],
    correctAnswer: 3,
    explanation:
      'Sustained pushing over long distances significantly increases cardiovascular demand and whole-body fatigue. As the handler fatigues, their technique deteriorates, reaction times slow, and the risk of both musculoskeletal injury and other accidents increases.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Pushing vs pulling',
    category: 'Principles of Safe Lifting',
  },
  {
    id: 80,
    question:
      'A worker must lift a 15 kg box from floor level to a shelf at 1.8 m. Applying the kinetic lifting technique, at which point during the lift is the compressive force on the L5/S1 disc greatest?',
    options: [
      'When the box is at its lowest point and the trunk is most flexed',
      'When the box reaches the shelf and the arms are fully extended',
      'When the handler is standing fully upright with the box at waist height',
      'When the handler first grips the box but has not yet begun to lift',
    ],
    correctAnswer: 0,
    explanation:
      'The compressive force on the L5/S1 disc is greatest when the trunk is most flexed (at the lowest point of the lift) because the moment arm is longest. As the handler stands more upright, the moment arm shortens and the compressive force decreases.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Biomechanics of lifting',
    category: 'Principles of Safe Lifting',
  },
  // =======================================================================
  // RISK ASSESSMENT & REDUCTION — first 20 of 40 questions (id 81–100)
  // =======================================================================
  {
    id: 81,
    question:
      'What is the HSE guideline weight for lifting at waist height close to the body for men?',
    options: [
      '16 kg',
      '25 kg',
      '10 kg',
      '35 kg',
    ],
    correctAnswer: 1,
    explanation:
      'The HSE guideline weight for men lifting close to the body at waist height (the optimum position) is 25 kg. This is a guideline, not a legal limit, and applies under ideal conditions. The guideline reduces as distance from the body or height above/below waist increases.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Guideline weights',
    category: 'Risk Assessment & Reduction',
  },
  {
    id: 82,
    question:
      'What is the HSE guideline weight for lifting at waist height close to the body for women?',
    options: [
      '10 kg',
      '20 kg',
      '16 kg',
      '25 kg',
    ],
    correctAnswer: 2,
    explanation:
      "The HSE guideline weight for women lifting close to the body at waist height is 16 kg. Women's guideline weights are approximately two-thirds of the men's guidelines. These figures apply under ideal conditions and must be reduced for adverse factors.",
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Guideline weights',
    category: 'Risk Assessment & Reduction',
  },
  {
    id: 83,
    question:
      'Which of the following is a mechanical aid that can help reduce manual handling risks?',
    options: [
      'A pair of safety glasses',
      'A high-visibility vest',
      'A safety helmet',
      'A sack truck or trolley',
    ],
    correctAnswer: 3,
    explanation:
      'A sack truck or trolley is a mechanical aid designed to reduce the need for manual lifting and carrying. Mechanical aids help by supporting the weight of the load and reducing the physical effort required from the handler.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Mechanical aids',
    category: 'Risk Assessment & Reduction',
  },
  {
    id: 84,
    question: 'What does the HSE MAC tool stand for?',
    options: [
      'Manual Handling Assessment Charts',
      'Mechanical Aid Compliance',
      'Maximum Allowable Capacity',
      'Manual Assessment Calculator',
    ],
    correctAnswer: 0,
    explanation:
      'MAC stands for Manual Handling Assessment Charts. It is a free HSE tool that helps identify high-risk manual handling activities in the workplace by assessing lifting, carrying, and team handling operations against colour-coded risk bands.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'HSE MAC tool',
    category: 'Risk Assessment & Reduction',
  },
  {
    id: 85,
    question: 'What does RAPP stand for in manual handling risk assessment?',
    options: [
      'Record All Potential Problems',
      'Risk Assessment for Pushing and Pulling',
      'Reduce All Physical Pressures',
      'Regulations and Practical Procedures',
    ],
    correctAnswer: 1,
    explanation:
      'RAPP stands for Risk Assessment of Pushing and Pulling. It is an HSE tool specifically designed to help assess the risks associated with pushing and pulling operations in the workplace, complementing the MAC tool.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'RAPP tool',
    category: 'Risk Assessment & Reduction',
  },
  {
    id: 86,
    question:
      'Which of the following is the most effective way to reduce manual handling risk, according to the hierarchy of controls?',
    options: [
      'Provide personal protective equipment',
      'Provide manual handling training',
      'Eliminate the need for manual handling entirely',
      'Display warning signs about heavy loads',
    ],
    correctAnswer: 2,
    explanation:
      'According to the hierarchy of controls, the most effective measure is to eliminate the hazardous manual handling operation entirely — for example, by redesigning the process so that loads do not need to be manually moved. This is more effective than PPE, training, or signage.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Designing out manual handling',
    category: 'Risk Assessment & Reduction',
  },
  {
    id: 87,
    question: 'A pallet truck is an example of which type of manual handling control measure?',
    options: [
      'Personal protective equipment',
      'An administrative control (safe system of work)',
      'A behavioural control (worker training)',
      'Engineering control (mechanical aid)',
    ],
    correctAnswer: 3,
    explanation:
      'A pallet truck is an engineering control — a mechanical aid that reduces the physical effort needed to move heavy palletised loads. Engineering controls are higher in the hierarchy of controls than administrative controls or PPE.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Mechanical aids',
    category: 'Risk Assessment & Reduction',
  },
  {
    id: 88,
    question:
      'When using the TILE framework, which factor would you assess first in most practical situations?',
    options: [
      'The task — what does it involve and can it be avoided or redesigned?',
      'The load — how heavy and how stable is the object being handled?',
      'The individual — is the handler fit and trained for this work?',
      'The environment — is there enough space and is the floor sound?',
    ],
    correctAnswer: 0,
    explanation:
      'While all TILE factors are important, the task is typically assessed first because understanding what the task involves allows you to determine whether it can be avoided or redesigned. This aligns with the MHOR hierarchy of avoidance first.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'TILE framework in depth',
    category: 'Risk Assessment & Reduction',
  },
  {
    id: 89,
    question:
      "Under the 'Task' element of TILE, which of the following would increase the risk of injury?",
    options: [
      'Short carrying distances',
      'Repetitive lifting combined with twisting',
      'Working at waist height',
      'Handling loads within the power zone',
    ],
    correctAnswer: 1,
    explanation:
      'Repetitive lifting combined with twisting significantly increases injury risk. The task factors that increase risk include frequent repetition, twisting, bending, reaching, long carrying distances, holding loads away from the body, and insufficient rest periods.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'TILE — Task factors',
    category: 'Risk Assessment & Reduction',
  },
  {
    id: 90,
    question:
      "Under the 'Individual' element of TILE, which of the following personal factors would require a risk assessment adjustment?",
    options: [
      "The worker's favourite colour",
      "The worker's lunchtime preferences",
      'The worker is pregnant or has recently given birth',
      "The worker's commuting distance",
    ],
    correctAnswer: 2,
    explanation:
      'Pregnancy or recent childbirth is a significant individual factor under TILE. The Management of Health and Safety at Work Regulations 1999 require a specific risk assessment for new or expectant mothers, and manual handling tasks may need to be modified or avoided.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'TILE — Individual factors',
    category: 'Risk Assessment & Reduction',
  },
  {
    id: 91,
    question:
      'The HSE guideline weight for men lifting close to the body at shoulder height is approximately what?',
    options: [
      '25 kg',
      '20 kg',
      '5 kg',
      '10 kg',
    ],
    correctAnswer: 3,
    explanation:
      'The HSE guideline weight at shoulder height close to the body for men is approximately 10 kg, significantly less than the 25 kg at waist height. This is because the biomechanical disadvantage of lifting at shoulder height places greater stress on the shoulders and spine.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Guideline weights',
    category: 'Risk Assessment & Reduction',
  },
  {
    id: 92,
    question:
      "When conducting a manual handling risk assessment, how should 'Environmental' factors be recorded?",
    options: [
      'Note floor conditions, space constraints, lighting, temperature, weather, and any obstacles or hazards',
      'Record only the weight of the load and the height it is lifted to',
      'Record only the handler\'s age, fitness, and training history',
      'Record only the frequency of the task and the distance carried',
    ],
    correctAnswer: 0,
    explanation:
      'Environmental factors in a risk assessment should include floor conditions (wet, uneven, slippery), available space, lighting levels, temperature and humidity, weather conditions if outdoors, and any obstacles, steps, or changes in floor level.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'TILE — Environment factors',
    category: 'Risk Assessment & Reduction',
  },
  {
    id: 93,
    question: 'The MAC tool uses a colour-coded system. What does a RED rating indicate?',
    options: [
      'The task is low risk and no further action is required',
      'The task is high risk and requires prompt action to reduce the risk',
      'The task is medium risk and should be improved when convenient',
      'The task has not yet been assessed and must be observed again',
    ],
    correctAnswer: 1,
    explanation:
      "In the MAC tool's colour-coded system, RED indicates a high level of risk that requires prompt action. Green indicates low risk, amber indicates medium risk requiring improvement, red indicates high risk, and purple indicates very high risk requiring immediate action.",
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'HSE MAC tool',
    category: 'Risk Assessment & Reduction',
  },
  {
    id: 94,
    question: "Which of the following 'Load' factors under TILE would increase handling risk?",
    options: [
      'A small, rigid container with a secure lid',
      'A well-balanced load clearly marked with its weight',
      'A bulky, unstable load with no handholds and sharp edges',
      'A compact, lightweight box with integral handles',
    ],
    correctAnswer: 2,
    explanation:
      'A bulky, unstable load with no handholds and sharp edges presents multiple increased risk factors: difficulty gripping, unpredictable movement of contents, potential for the handler to adopt poor posture, and risk of cuts from sharp edges.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'TILE — Load factors',
    category: 'Risk Assessment & Reduction',
  },
  {
    id: 95,
    question: "What is 'designing out' manual handling?",
    options: [
      'Providing handlers with back belts and gloves before each lifting task',
      'Increasing the number of workers assigned to share each heavy load',
      'Drawing up a written procedure that describes the correct lifting technique',
      'Redesigning processes, layouts, or equipment so that hazardous manual handling is eliminated at source',
    ],
    correctAnswer: 3,
    explanation:
      'Designing out manual handling means redesigning the work process, workplace layout, or equipment so that the need for hazardous manual handling is eliminated at the source. Examples include using conveyors, relocating storage to waist height, or ordering smaller package sizes.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Designing out manual handling',
    category: 'Risk Assessment & Reduction',
  },
  {
    id: 96,
    question:
      "How do the HSE guideline weights change when the load is held at arm's length compared to close to the body?",
    options: [
      'They are significantly reduced',
      'They are significantly increased',
      'They remain exactly the same regardless of reach',
      'They no longer apply and a legal limit takes over',
    ],
    correctAnswer: 0,
    explanation:
      "HSE guideline weights are significantly reduced when the load is held at arm's length rather than close to the body. For example, the men's guideline at waist height drops from 25 kg (close) to 5 kg (at arm's length), reflecting the dramatically increased spinal loading.",
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Guideline weights',
    category: 'Risk Assessment & Reduction',
  },
  {
    id: 97,
    question:
      'The MAC tool assesses three types of manual handling operation. Which of the following is NOT one of them?',
    options: [
      'Team handling operations',
      'Typing operations',
      'Lifting operations',
      'Carrying operations',
    ],
    correctAnswer: 1,
    explanation:
      'The MAC tool assesses three types of operation: lifting, carrying, and team handling. Typing is not a manual handling operation and would be assessed under Display Screen Equipment (DSE) regulations, not the MAC tool.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'HSE MAC tool',
    category: 'Risk Assessment & Reduction',
  },
  {
    id: 98,
    question:
      'When applying the HSE guideline weight figures, by what factor should they be reduced if the task involves twisting?',
    options: [
      'No reduction is needed',
      'Reduce by approximately 20%',
      'Reduce by approximately 10%',
      'Reduce by approximately 50%',
    ],
    correctAnswer: 2,
    explanation:
      'The HSE guidelines state that if the handler twists to the side during the operation, the guideline weight should be reduced by approximately 10%. If the handler twists beyond 45 degrees, a further reduction may be necessary. Twisting significantly increases spinal loading.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'Guideline weights — adjustments',
    category: 'Risk Assessment & Reduction',
  },
  {
    id: 99,
    question:
      'A risk assessment identifies that a manual handling task poses an unacceptable risk but cannot be eliminated. Following the MHOR hierarchy, what is the next step?',
    options: [
      'Issue every handler with a back support belt and leave the task otherwise unchanged',
      'Stop the activity permanently until the load can be removed from the workplace entirely',
      'Report the unacceptable risk to the HSE and await their written instructions',
      'Reduce the risk to the lowest level reasonably practicable through engineering controls, task redesign, and training',
    ],
    correctAnswer: 3,
    explanation:
      'Following the MHOR hierarchy (avoid, assess, reduce), if the task cannot be avoided, the employer must reduce the risk to the lowest level reasonably practicable. This involves implementing engineering controls, redesigning the task, providing mechanical aids, and ensuring adequate training.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'MHOR hierarchy — risk reduction',
    category: 'Risk Assessment & Reduction',
  },
  {
    id: 100,
    question:
      'When using the RAPP tool to assess a pushing operation, which of the following factors does it specifically evaluate?',
    options: [
      'Floor surface, gradient, force required, handle height, distance, obstructions, and individual capability',
      'The exact weight of the load in kilograms and the legal lifting limit for the worker',
      'The lighting and temperature of the room only, since these affect grip the most',
      'The number of workers available and their combined years of handling experience',
    ],
    correctAnswer: 0,
    explanation:
      "The RAPP tool evaluates multiple factors for pushing and pulling operations including floor surface conditions, gradients, the force required to start and sustain movement, handle height and design, travel distance, obstructions, and the handler's individual capability.",
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'RAPP tool',
    category: 'Risk Assessment & Reduction',
  },
  // --- Questions 101-200 continue below ---
  // RISK ASSESSMENT & REDUCTION continued — questions 101-120 (Module 3)
  {
    id: 101,
    question: 'What does the ART tool stand for in the context of manual handling risk assessment?',
    options: [
      'Automated Risk Tracking',
      'Assessment of Repetitive Tasks',
      'Annual Review of Techniques',
      'Assessment of Related Trauma',
    ],
    correctAnswer: 1,
    explanation:
      'ART stands for Assessment of Repetitive Tasks. It is an HSE tool designed to help identify and assess the risks associated with repetitive work that may lead to upper limb disorders.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'ART Tool',
    category: 'Risk Assessment & Reduction',
  },
  {
    id: 102,
    question:
      'When using the ART tool, which of the following is NOT one of the main risk factor categories assessed?',
    options: [
      'Repetition',
      'Posture',
      "Worker's age",
      'Force',
    ],
    correctAnswer: 2,
    explanation:
      "The ART tool assesses repetition, force, posture, and additional factors such as duration and pace. Worker's age is not a specific risk factor category within the ART assessment, although individual capability is considered separately.",
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'ART Tool',
    category: 'Risk Assessment & Reduction',
  },
  {
    id: 103,
    question:
      'What is the primary purpose of workplace observation during a manual handling risk assessment?',
    options: [
      'To record the names of all workers present for training purposes',
      'To check that the written procedure is filed in the correct folder',
      'To measure the exact weight of every load using calibrated scales',
      'To identify actual handling techniques and conditions in real time',
    ],
    correctAnswer: 3,
    explanation:
      'Workplace observation allows assessors to see how tasks are actually performed, including postures adopted, loads handled, and environmental conditions. This real-time information is essential for identifying risks that may not be apparent from written procedures alone.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Workplace Observation Techniques',
    category: 'Risk Assessment & Reduction',
  },
  {
    id: 104,
    question:
      'Why is worker consultation a legal requirement during manual handling risk assessments?',
    options: [
      'Workers have first-hand knowledge of the tasks and associated difficulties',
      'Workers are legally responsible for writing their own risk assessments',
      'Consultation transfers all liability for injuries onto the workforce',
      'Workers must approve the assessment before the employer can act on it',
    ],
    correctAnswer: 0,
    explanation:
      'Under the Safety Representatives and Safety Committees Regulations and the Health and Safety (Consultation with Employees) Regulations, employers must consult workers. Workers possess valuable first-hand experience of the tasks, potential hazards, and practical solutions that may not be obvious to assessors.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Worker Consultation',
    category: 'Risk Assessment & Reduction',
  },
  {
    id: 105,
    question:
      'When selecting a mechanical aid for a manual handling task, what is the MOST important factor to consider first?',
    options: [
      'The brand name and purchase price of the aid above all else',
      'Whether the aid matches the specific task requirements and load characteristics',
      'The colour of the aid so it is easily spotted on site',
      'Whether the aid is the same model already used by competitors',
    ],
    correctAnswer: 1,
    explanation:
      'The mechanical aid must be suitable for the specific task, load weight, load shape, and working environment. A mismatched aid can introduce new risks or prove ineffective, potentially making the task more dangerous than manual handling alone.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Mechanical Aid Selection',
    category: 'Risk Assessment & Reduction',
  },
  {
    id: 106,
    question: 'A sack truck is most appropriate for which type of load?',
    options: [
      'Large flat glass panels that must be carried vertically',
      'Loose granular material such as sand or gravel poured in bulk',
      'Stacked boxes or sacks on a flat surface',
      'Very heavy palletised loads weighing several hundred kilograms',
    ],
    correctAnswer: 2,
    explanation:
      "Sack trucks are designed for moving stacked, stable loads such as boxes and sacks across flat surfaces. They use a leverage principle to tilt the load onto the truck's wheels, significantly reducing the effort required to transport heavy items over short distances.",
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Sack Trucks',
    category: 'Risk Assessment & Reduction',
  },
  {
    id: 107,
    question:
      'What is the main advantage of a pallet truck over a sack truck for warehouse operations?',
    options: [
      'It is lighter and easier to carry up flights of stairs',
      'It can be operated safely with one hand while carrying tools',
      'It folds flat for storage in the back of a small van',
      'It can move palletised loads of much greater weight with minimal effort',
    ],
    correctAnswer: 3,
    explanation:
      'Pallet trucks are designed to lift and transport palletised loads that can weigh several hundred kilograms or more. Their hydraulic lifting mechanism and wide fork design make them far more suitable for heavy, palletised goods than a sack truck, which is intended for smaller, lighter loads.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Pallet Trucks',
    category: 'Risk Assessment & Reduction',
  },
  {
    id: 108,
    question: 'In which scenario would a hoist be the most appropriate mechanical aid?',
    options: [
      'Lifting a heavy transformer to an upper floor where no lift exists',
      'Carrying a stack of light cardboard boxes across a flat warehouse floor',
      'Sliding a small toolbox a short distance along a workbench',
      'Pushing a wheeled trolley of cable reels along a level corridor',
    ],
    correctAnswer: 0,
    explanation:
      'Hoists are designed for lifting heavy loads vertically, making them ideal for raising heavy items like transformers between floors. They provide controlled, mechanical lifting that eliminates the severe musculoskeletal risks associated with manually handling very heavy equipment at height.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Hoists',
    category: 'Risk Assessment & Reduction',
  },
  {
    id: 109,
    question:
      'What is the primary benefit of using a conveyor system in a repetitive manual handling environment?',
    options: [
      'It increases the weight each worker can safely lift by hand',
      'It eliminates or significantly reduces the need for carrying loads over distances',
      'It removes the need to carry out a risk assessment for the area',
      'It allows loads to be stacked higher without the use of ladders',
    ],
    correctAnswer: 1,
    explanation:
      'Conveyors transport materials mechanically between workstations or areas, removing the need for workers to carry loads repeatedly over distances. This dramatically reduces cumulative spinal loading, fatigue, and the risk of musculoskeletal disorders associated with repetitive carrying tasks.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Conveyors',
    category: 'Risk Assessment & Reduction',
  },
  {
    id: 110,
    question: 'A vacuum lifter would be most suitable for handling which type of material?',
    options: [
      'Loose granular material such as sand, gravel, or aggregate',
      'Porous, rough-surfaced items such as breeze blocks or bricks',
      'Large, flat, smooth sheets such as glass or metal panels',
      'Long, thin lengths such as conduit, pipe, or cable tray',
    ],
    correctAnswer: 2,
    explanation:
      'Vacuum lifters use suction cups to grip smooth, flat surfaces and are ideal for handling large sheets of glass, metal, or similar materials. They allow a single operator to safely manoeuvre heavy sheet materials that would otherwise require multiple workers or risk damage from improper grip.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Vacuum Lifters',
    category: 'Risk Assessment & Reduction',
  },
  {
    id: 111,
    question:
      'In the hierarchy of risk control for manual handling, what should be attempted FIRST?',
    options: [
      'Provide personal protective equipment to all handlers',
      'Issue written manual handling procedures to every worker',
      'Train workers in the correct kinetic lifting technique',
      'Eliminate the need for hazardous manual handling entirely',
    ],
    correctAnswer: 3,
    explanation:
      'The Manual Handling Operations Regulations 1992 require employers to first avoid hazardous manual handling operations so far as is reasonably practicable. Elimination is always the most effective control measure because it removes the risk entirely rather than merely reducing it.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Elimination Strategies',
    category: 'Risk Assessment & Reduction',
  },
  {
    id: 112,
    question:
      'Which of the following is an example of substitution as a manual handling risk reduction strategy?',
    options: [
      'Replacing 25 kg bags of cement with 15 kg bags',
      'Asking workers to lift more carefully',
      'Providing workers with steel-toe boots',
      'Increasing the number of tea breaks',
    ],
    correctAnswer: 0,
    explanation:
      'Substitution involves replacing a hazardous element with a less hazardous alternative. Switching to lighter bags reduces the load weight per lift, directly lowering the biomechanical stress on the spine and reducing the risk of injury without eliminating the task itself.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Substitution',
    category: 'Risk Assessment & Reduction',
  },
  {
    id: 113,
    question:
      'An employer is considering automating a repetitive packing task. Which factor is LEAST relevant to this decision?',
    options: [
      'The injury rate associated with the current manual task',
      'The favourite colour of the production manager',
      'The cost-benefit analysis of automation versus manual handling',
      'The technical feasibility of automating the specific movements required',
    ],
    correctAnswer: 1,
    explanation:
      'Decisions about automation should be based on the current injury risk, financial viability, technical feasibility, and practicability. Personal preferences unrelated to health and safety or operational efficiency have no bearing on a reasoned risk reduction decision.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Automation',
    category: 'Risk Assessment & Reduction',
  },
  {
    id: 114,
    question: 'How can delivery planning reduce manual handling risks on a construction site?',
    options: [
      'By stacking all deliveries in a single central location on site',
      'By scheduling all deliveries for the end of the working day',
      'By ensuring materials are delivered as close as possible to their point of use',
      'By ordering larger quantities so deliveries are needed less often',
    ],
    correctAnswer: 2,
    explanation:
      'Delivering materials close to their point of use minimises the distance workers must carry them, reducing carrying time, fatigue, and the risk of trips or falls while laden. Good delivery planning is one of the most practical and effective ways to reduce manual handling on site.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Delivery Planning',
    category: 'Risk Assessment & Reduction',
  },
  {
    id: 115,
    question:
      'What is the recommended storage height for heavy items in a well-designed storage area?',
    options: [
      'At floor level to prevent falling',
      'On the highest shelf to save floor space',
      'At head height for easy visibility',
      'At waist height to minimise bending and stretching',
    ],
    correctAnswer: 3,
    explanation:
      "Storing heavy items at waist height (between knuckle and elbow height) minimises the need for bending or reaching, keeping the load close to the body's centre of gravity. This significantly reduces spinal loading and is a fundamental principle of good storage design.",
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Storage Design',
    category: 'Risk Assessment & Reduction',
  },
  {
    id: 116,
    question:
      'When designing a workstation for tasks involving repetitive manual handling, which ergonomic principle is MOST important?',
    options: [
      'The working height, reach distances, and layout should suit the range of workers using it',
      'The workstation should be fixed at the height of the tallest worker on site',
      'The workstation should be as compact as possible to save floor space',
      'The workstation should match the colour scheme of the rest of the facility',
    ],
    correctAnswer: 0,
    explanation:
      'Ergonomic workstation design must accommodate the range of workers who will use it, with adjustable heights and appropriate reach distances. A well-designed workstation reduces awkward postures, excessive reaching, and unnecessary bending, all of which contribute to musculoskeletal disorders.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Workstation Design',
    category: 'Risk Assessment & Reduction',
  },
  {
    id: 117,
    question:
      "During an ART assessment, a task scores in the 'red zone' for force. What does this indicate?",
    options: [
      'The force demands are low and no further action is needed for the task',
      'The force demands are high and the task requires urgent action to reduce risk',
      'The force demands are moderate but acceptable if reviewed periodically',
      'The force demands cannot be measured and the task should be observed again',
    ],
    correctAnswer: 1,
    explanation:
      'A red zone score in the ART tool indicates a high level of risk that requires urgent action. The employer should prioritise reducing the force demands of the task through redesign, mechanical aids, or other control measures as soon as reasonably practicable.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'ART Tool',
    category: 'Risk Assessment & Reduction',
  },
  {
    id: 118,
    question:
      'An assessor notices that workers have developed their own informal method for a manual handling task that differs from the written procedure. What should the assessor do?',
    options: [
      'Immediately discipline the workers for failing to follow the written procedure',
      'Ignore the informal method as long as no injuries have yet been reported',
      'Investigate why the deviation occurs, as it may reveal a flaw in the original procedure or unassessed risks',
      'Order the workers to revert to the written procedure without asking any questions',
    ],
    correctAnswer: 2,
    explanation:
      'Workers often adapt their methods in response to practical difficulties with prescribed procedures. Investigating the deviation may reveal that the original procedure is impractical, uncomfortable, or does not account for real working conditions, providing valuable information for improving the risk assessment.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'Workplace Observation Techniques',
    category: 'Risk Assessment & Reduction',
  },
  {
    id: 119,
    question:
      'A risk assessment identifies that a manual handling task cannot be eliminated. What is the next step in the hierarchy?',
    options: [
      'Immediately cease all work until the task can be fully automated',
      'Issue personal protective equipment as the first and only control',
      'Report the task to the HSE before any work may continue',
      'Assess the task and reduce the risk to the lowest level reasonably practicable',
    ],
    correctAnswer: 3,
    explanation:
      'Where hazardous manual handling cannot be avoided, the MHOR 1992 require employers to make a suitable and sufficient assessment of the risk and then reduce it to the lowest level reasonably practicable. This may involve mechanical aids, task redesign, training, or a combination of measures.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Elimination Strategies',
    category: 'Risk Assessment & Reduction',
  },
  {
    id: 120,
    question:
      'A warehouse has introduced roller conveyors, lighter packaging, and adjustable-height workbenches but the residual risk is still not zero. What additional measure completes the hierarchy?',
    options: [
      'Provide workers with information, instruction, and training on the remaining risks and correct techniques',
      'Cease the activity entirely until the residual risk reaches absolute zero',
      'Transfer responsibility for the residual risk to the individual workers',
      'Increase the number of workers assigned to each task regardless of need',
    ],
    correctAnswer: 0,
    explanation:
      'The final tier of the MHOR hierarchy is to provide information and training about residual risks and correct handling techniques. Even after engineering and organisational controls, workers need to understand the remaining hazards and how to handle loads safely to minimise their personal risk.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'Mechanical Aid Selection',
    category: 'Risk Assessment & Reduction',
  },

  // WORKPLACE-SPECIFIC HANDLING — questions 121-160 (Module 4)
  {
    id: 121,
    question:
      'What is the approximate weight of a standard 500-metre drum of 2.5 mm twin and earth cable?',
    options: [
      '5 kg',
      '17-20 kg',
      '50 kg',
      '100 kg',
    ],
    correctAnswer: 1,
    explanation:
      'A 500-metre drum of 2.5 mm twin and earth cable typically weighs between 17 and 20 kg. While this is within the guideline weight for some workers, the awkward shape and size of the drum mean that manual handling risk assessments should still consider the grip, posture, and carrying distance involved.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Cable Drums',
    category: 'Workplace-Specific Handling',
  },
  {
    id: 122,
    question: 'What is a drum jack primarily used for?',
    options: [
      'Cutting cable to length while it remains on the drum',
      'Strapping the cable drum securely to a pallet for transport',
      'Lifting a cable drum off the ground so it can rotate freely for cable dispensing',
      'Measuring the remaining length of cable left on the drum',
    ],
    correctAnswer: 2,
    explanation:
      'A drum jack (or cable drum stand) lifts a cable drum off the ground and supports it on an axle, allowing the drum to spin freely. This enables controlled cable dispensing without the need to manually lift and unwind the cable, significantly reducing manual handling effort.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Cable Drums',
    category: 'Workplace-Specific Handling',
  },
  {
    id: 123,
    question: 'When rolling a large cable drum across a site, what is the safest technique?',
    options: [
      'Kick the drum from behind to keep it moving at a steady pace',
      'Pull the drum towards you from the front, walking backwards',
      'Roll it as fast as possible to cover the distance quickly',
      'Push it with straight arms at the mid-point of the drum, controlling speed and direction, with a clear path ahead',
    ],
    correctAnswer: 3,
    explanation:
      'Rolling a cable drum should be controlled by pushing at the mid-point with straight arms, maintaining a steady pace. The route must be checked in advance for obstacles, slopes, and other workers. Uncontrolled rolling or kicking creates serious risk of crush injuries to feet and hands.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Cable Drums',
    category: 'Workplace-Specific Handling',
  },
  {
    id: 124,
    question:
      'Cable tray lengths are typically 3 metres long. What is the main manual handling risk when carrying them?',
    options: [
      'Their length makes them unwieldy, creating risks of striking people or objects and difficulty controlling the load',
      'Their weight always exceeds the 25 kg HSE guideline for a single handler',
      'Their sharp galvanised edges are the only significant hazard when carrying',
      'Their compact, dense construction makes them difficult to grip securely',
    ],
    correctAnswer: 0,
    explanation:
      'At 3 metres, cable tray lengths are classified as long loads. The primary risk is the difficulty in controlling the far end, which may swing into other workers, strike obstacles, or catch on structures. Team handling with coordinated communication is essential for long load management.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Cable Trays and Trunking',
    category: 'Workplace-Specific Handling',
  },
  {
    id: 125,
    question:
      'When a team is carrying a long length of cable trunking, what is the most important safety measure?',
    options: [
      'Each person should move independently at their own pace',
      'One person should be designated as the coordinator, giving clear verbal commands',
      'The strongest person should carry the entire length alone',
      'The load should be carried above head height to clear obstacles',
    ],
    correctAnswer: 1,
    explanation:
      'Team handling of long loads requires a designated coordinator who gives clear commands for lifting, moving, stopping, and lowering. Without coordination, team members may act independently, causing uneven loading, loss of control, or unexpected movements that can lead to injuries.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Cable Trays and Trunking',
    category: 'Workplace-Specific Handling',
  },
  {
    id: 126,
    question: 'What additional risk exists when mounting a distribution board at height?',
    options: [
      'The board becomes lighter the higher it is lifted above the floor',
      'Working at height removes the need to keep the load close to the body',
      'The combination of working at height and handling a heavy, bulky item significantly increases fall and drop risks',
      'The only additional risk is electric shock from the energised board',
    ],
    correctAnswer: 2,
    explanation:
      "Mounting distribution boards at height combines two significant hazards: working at height and manual handling of a heavy, bulky object. The worker's balance is compromised while handling the load, and dropping the board creates a risk to anyone below. Mechanical lifting aids or team lifts with proper platform access should be used.",
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Distribution Boards',
    category: 'Workplace-Specific Handling',
  },
  {
    id: 127,
    question:
      'Why should transformers ALWAYS be moved using mechanical aids rather than manual lifting?',
    options: [
      'Their smooth casing makes them slip easily from a gloved grip',
      'They contain oil that can leak and create a slip hazard underfoot',
      'They are fragile and can be damaged by the warmth of a worker\'s hands',
      'Their weight typically exceeds safe manual handling limits and their compact, dense construction makes grip difficult',
    ],
    correctAnswer: 3,
    explanation:
      'Transformers are extremely heavy relative to their size due to their iron core and copper windings. Even small transformers can weigh well over 50 kg, far exceeding guideline weights. Their compact, dense construction also makes them difficult to grip securely, compounding the risk of musculoskeletal injury.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Transformers',
    category: 'Workplace-Specific Handling',
  },
  {
    id: 128,
    question: 'How does uneven ground on a construction site increase manual handling risk?',
    options: [
      'It compromises balance and stability, increases the risk of trips and falls while carrying loads, and forces awkward postures',
      'It makes loads effectively lighter by spreading the weight over the feet',
      'It improves grip because the rough surface provides better traction',
      'It only affects wheeled aids and has no impact on carrying by hand',
    ],
    correctAnswer: 0,
    explanation:
      'Uneven ground destabilises the handler, forcing compensatory postures that increase spinal loading. The risk of tripping while carrying a load is significantly higher on rough terrain, and a fall while laden can cause far more severe injuries than a fall without a load.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Construction Site Conditions',
    category: 'Workplace-Specific Handling',
  },
  {
    id: 129,
    question: 'What effect do wet conditions on site have on manual handling operations?',
    options: [
      'They make loads lighter, so larger quantities can be carried at once',
      'They reduce grip on loads and underfoot surfaces, increasing the risk of slips and dropped loads',
      'They improve grip by adding moisture between the hands and the load',
      'They have no effect indoors and only matter for outdoor lifting tasks',
    ],
    correctAnswer: 1,
    explanation:
      'Wet conditions reduce friction on both load surfaces and underfoot, making it harder to maintain a secure grip and stable footing. Wet loads can also be heavier than dry ones if they absorb water. Risk assessments must account for weather conditions on outdoor sites.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Construction Site Conditions',
    category: 'Workplace-Specific Handling',
  },
  {
    id: 130,
    question:
      'Why must wind conditions be considered during manual handling of large, flat items such as sheet materials?',
    options: [
      'Wind cools the hands, weakening grip strength on the material',
      'Wind dries the material, making it lighter and harder to hold',
      'Large flat items act as sails, making them extremely difficult to control and creating a risk of the handler being pulled off balance',
      'Wind has no effect on sheet materials unless they are wet',
    ],
    correctAnswer: 2,
    explanation:
      "Sheet materials such as plywood or plasterboard have a large surface area that catches the wind, creating significant and unpredictable forces. A sudden gust can wrench the load from a worker's grip or pull them off balance, particularly when working at height on scaffolding or roofs.",
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Construction Site Conditions',
    category: 'Workplace-Specific Handling',
  },
  {
    id: 131,
    question: 'By what percentage can wearing standard work gloves reduce grip strength?',
    options: [
      '5-10%',
      'Less than 1%',
      '50-60%',
      '20-30%',
    ],
    correctAnswer: 3,
    explanation:
      'Standard work gloves typically reduce grip strength by 20-30%, depending on the type and thickness. This reduction must be factored into manual handling risk assessments, as it effectively increases the difficulty of gripping and controlling loads, particularly smooth or heavy items.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'PPE Constraints',
    category: 'Workplace-Specific Handling',
  },
  {
    id: 132,
    question: 'What is the main challenge of manual handling on scaffold platforms?',
    options: [
      'Restricted space limits posture options, guardrails restrict movement, and platform bounce affects stability',
      'The height alone makes any load feel heavier than it does at ground level',
      'Scaffold platforms are always wet, which is the sole handling hazard',
      'The only concern is the electrical risk from nearby overhead cables',
    ],
    correctAnswer: 0,
    explanation:
      "Scaffold platforms offer limited space, restricting the handler's ability to adopt correct postures. Guardrails, while essential for fall prevention, can obstruct load movement. Platform flex or bounce when walking with loads further compromises balance and increases the risk of trips and falls.",
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Scaffold Platform Handling',
    category: 'Workplace-Specific Handling',
  },
  {
    id: 133,
    question:
      'When working in a loft space with limited headroom, what is the primary manual handling concern?',
    options: [
      'The dust in the loft is the main manual handling concern',
      'The inability to stand upright forces stooped or kneeling postures, dramatically increasing spinal loading',
      'Loads must always be carried above the head to clear the joists',
      'The warmth of the loft causes rapid fatigue regardless of posture',
    ],
    correctAnswer: 1,
    explanation:
      'Low headroom in loft spaces prevents workers from standing upright, forcing them into stooped, crouched, or kneeling postures. These postures massively increase the compressive and shear forces on the lumbar spine, making even light loads potentially hazardous to handle.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Loft and Roof Spaces',
    category: 'Workplace-Specific Handling',
  },
  {
    id: 134,
    question: 'What specific hazard exists when handling materials in ceiling voids?',
    options: [
      'The void is always too cold to work in for more than a few minutes',
      'The only hazard is the electrical risk from existing wiring in the void',
      'Working above head height with restricted access means loads must be pushed up and manoeuvred in confined space, with risk of falling debris',
      'Loads can simply be dropped into the void from the floor above',
    ],
    correctAnswer: 2,
    explanation:
      'Ceiling voids require workers to lift loads above head height through restricted access points, then manoeuvre them in confined spaces while potentially balancing on steps or platforms. The risk of dropped materials, awkward sustained postures, and falling debris onto workers below must all be assessed.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Ceiling Voids',
    category: 'Workplace-Specific Handling',
  },
  {
    id: 135,
    question:
      'When handling materials in an under-floor crawl space, which posture-related risk is MOST significant?',
    options: [
      'Frequent twisting while standing upright to reach into the space',
      'Repeated overhead lifting of loads above shoulder height',
      'Long carrying distances across open, well-lit level floors',
      'Prolonged crawling, lying, and dragging loads in extremely restricted space, with no ability to use normal lifting techniques',
    ],
    correctAnswer: 3,
    explanation:
      'Under-floor crawl spaces are among the most challenging environments for manual handling. Workers cannot stand, kneel, or even crouch properly, forcing them to lie flat and drag loads. Normal lifting technique is impossible, and the confined space severely limits the use of mechanical aids.',
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'Under-Floor Crawl Spaces',
    category: 'Workplace-Specific Handling',
  },
  {
    id: 136,
    question: 'What is the purpose of a rope and pulley system in a building riser?',
    options: [
      'To lift materials vertically through the riser shaft, avoiding the need to carry heavy items up ladders or stairs',
      'To ventilate the riser shaft and remove dust during installation work',
      'To provide a fall-arrest anchor point for workers inside the riser',
      'To measure the vertical depth of the riser before cables are pulled',
    ],
    correctAnswer: 0,
    explanation:
      'Rope and pulley systems in risers allow materials and equipment to be raised or lowered vertically through the shaft mechanically. This avoids the extremely hazardous practice of carrying heavy items up ladders within the confined space of a riser, reducing both manual handling and fall risks.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Risers',
    category: 'Workplace-Specific Handling',
  },
  {
    id: 137,
    question: 'What does the acronym RSI stand for in the context of workplace injuries?',
    options: [
      'Risk Safety Indicator',
      'Repetitive Strain Injury',
      'Routine Safety Inspection',
      'Recorded Site Incident',
    ],
    correctAnswer: 1,
    explanation:
      'RSI stands for Repetitive Strain Injury, a general term for pain and damage caused by repetitive movement and overuse of a particular body part. In manual handling, RSI commonly affects the hands, wrists, forearms, elbows, and shoulders of workers performing repetitive tasks.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Repetitive Strain',
    category: 'Workplace-Specific Handling',
  },
  {
    id: 138,
    question: 'What does WRULD stand for?',
    options: [
      'Workplace Risk and Upper Limb Diagnosis',
      'Written Report on Unsafe Lifting and Dragging',
      'Work-Related Upper Limb Disorder',
      'Worker Rehabilitation and Upper Limb Development',
    ],
    correctAnswer: 2,
    explanation:
      'WRULD stands for Work-Related Upper Limb Disorder. It is the more precise medical and legal term for conditions commonly grouped under RSI, encompassing specific diagnoses such as carpal tunnel syndrome, tennis elbow, and tenosynovitis caused by work activities.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Repetitive Strain',
    category: 'Workplace-Specific Handling',
  },
  {
    id: 139,
    question: 'How does cumulative spinal loading differ from a single traumatic injury?',
    options: [
      'Cumulative loading only affects the muscles, never the spinal discs',
      'Cumulative loading always results from a single very heavy lift',
      'Cumulative loading produces immediate, obvious symptoms at the time',
      'Cumulative loading causes gradual damage over weeks, months, or years through repeated sub-maximal forces, rather than a single overload event',
    ],
    correctAnswer: 3,
    explanation:
      'Cumulative spinal loading occurs when repeated manual handling tasks, none individually harmful, progressively damage spinal structures over time. Unlike acute traumatic injuries from a single heavy lift, cumulative damage develops gradually and may not become symptomatic until significant degeneration has occurred.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Cumulative Spinal Loading',
    category: 'Workplace-Specific Handling',
  },
  {
    id: 140,
    question:
      'Which of the following is the BEST example of fatigue management in a manual handling context?',
    options: [
      'Scheduling regular rest breaks, varying tasks throughout the shift, and monitoring workload to prevent overexertion',
      'Requiring workers to complete all heavy lifting at the end of the shift',
      'Providing energy drinks so workers can sustain effort for longer',
      'Removing all rest breaks so the task is finished as quickly as possible',
    ],
    correctAnswer: 0,
    explanation:
      'Effective fatigue management combines scheduled rest breaks, task variation, and workload monitoring. Fatigued muscles provide less support to the spine and joints, grip strength decreases, and reaction times slow — all of which significantly increase the risk of manual handling injuries.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Fatigue Management',
    category: 'Workplace-Specific Handling',
  },
  {
    id: 141,
    question: 'What is the purpose of job rotation in reducing manual handling injury risk?',
    options: [
      'To increase the total output by keeping workers constantly busy',
      'To vary the physical demands on different muscle groups, reducing cumulative loading on any single body area',
      'To ensure every worker is trained on the heaviest task available',
      'To allow the employer to avoid carrying out a risk assessment',
    ],
    correctAnswer: 1,
    explanation:
      'Job rotation distributes the physical demands across different muscle groups and body areas throughout the working day. By alternating between tasks with different physical requirements, no single body structure is subjected to prolonged repetitive loading, reducing the cumulative risk of musculoskeletal disorders.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Job Rotation',
    category: 'Workplace-Specific Handling',
  },
  {
    id: 142,
    question: 'How frequently should micro-breaks be taken during sustained manual handling work?',
    options: [
      'Once at the start and once at the end of each working day',
      'Only when a worker reports feeling pain or discomfort',
      'Every 20-30 minutes, lasting 30 seconds to 2 minutes, involving stretching or posture change',
      'Every four hours, in line with statutory lunch break requirements',
    ],
    correctAnswer: 2,
    explanation:
      'Micro-breaks of 30 seconds to 2 minutes every 20-30 minutes allow muscles and soft tissues to recover from sustained loading. Research shows that frequent short breaks are more effective at reducing fatigue and injury risk than infrequent longer breaks during physically demanding manual handling work.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Micro-Breaks',
    category: 'Workplace-Specific Handling',
  },
  {
    id: 143,
    question: 'What is the benefit of warm-up stretching before manual handling tasks?',
    options: [
      'It permanently increases the maximum weight a worker can lift',
      'It removes the need to use correct lifting technique afterwards',
      'It cools the muscles down so they are less likely to overheat',
      'It increases blood flow to muscles, improves flexibility, and prepares soft tissues for physical demands, reducing injury risk',
    ],
    correctAnswer: 3,
    explanation:
      'Warm-up stretching increases blood flow to muscles and tendons, raises tissue temperature, and improves joint range of motion. This preparation helps muscles respond more effectively to the demands of manual handling, reducing the likelihood of strains, sprains, and other soft tissue injuries.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Warm-Up Stretching',
    category: 'Workplace-Specific Handling',
  },
  {
    id: 144,
    question:
      'A team of three electricians needs to carry a 4-metre length of heavy cable tray up a staircase. What is the correct approach?',
    options: [
      'The team leader assigns positions, the lower (rear) person bears more weight due to the angle, and clear commands are used throughout with the route checked beforehand',
      'Each electrician should carry their own short section separately up the stairs',
      'The two strongest workers should carry it while the third watches for hazards',
      'The load should be slid up the stairs without anyone taking its weight',
    ],
    correctAnswer: 0,
    explanation:
      'Team carrying on stairs requires careful planning: positions assigned based on strength, the lower (rear) person bearing more weight because gravity tilts the load downwards, clear verbal commands for every stage, and a pre-checked route. The angled load and restricted space of stairways make coordination absolutely critical for safety.',
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'Cable Trays and Trunking',
    category: 'Workplace-Specific Handling',
  },
  {
    id: 145,
    question: 'What weight can a large 1000-metre drum of armoured cable typically reach?',
    options: [
      '10-15 kg',
      'Over 100 kg',
      '30-40 kg',
      'Over 500 kg',
    ],
    correctAnswer: 1,
    explanation:
      'Large drums of armoured cable can easily exceed 100 kg, with some reaching several hundred kilograms. These drums must always be moved using mechanical aids such as drum trolleys, pallet trucks, or forklifts. Manual rolling may be acceptable for positioning but manual lifting is never appropriate.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Cable Drums',
    category: 'Workplace-Specific Handling',
  },
  {
    id: 146,
    question:
      'When installing cable tray at height, what should be done to reduce manual handling risk?',
    options: [
      'Carry each full-length section up a ladder by hand to save time',
      'Tie all the sections together and haul the bundle up in one lift',
      'Use a mobile elevated work platform (MEWP) with materials pre-loaded, or lift sections with a rope and pulley to the installation height',
      'Throw the sections up to a colleague working at the higher level',
    ],
    correctAnswer: 2,
    explanation:
      'Using a MEWP with pre-loaded materials or a rope and pulley system to raise sections avoids the extremely hazardous practice of carrying long, heavy lengths up ladders. This approach eliminates the dual risk of working at height while handling unwieldy loads with compromised grip and balance.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Cable Trays and Trunking',
    category: 'Workplace-Specific Handling',
  },
  {
    id: 147,
    question: 'Why is handling materials on a roof particularly hazardous on windy days?',
    options: [
      'Wind cools the hands and weakens grip on the materials only',
      'Wind dries roofing materials, making them lighter to handle',
      'Wind reduces visibility, which is the sole hazard when handling on roofs',
      'Wind can catch flat materials acting as sails, destabilising the handler near unprotected edges, with potential for fatal falls',
    ],
    correctAnswer: 3,
    explanation:
      'On roofs, wind forces on sheet materials can pull handlers off balance near edges where fall protection may be limited. The combination of height, wind loading on materials, and restricted movement space creates a potentially fatal hazard. Work with large flat materials should be suspended in high winds.',
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'Loft and Roof Spaces',
    category: 'Workplace-Specific Handling',
  },
  {
    id: 148,
    question: 'How should a heavy distribution board be lifted into position on a wall?',
    options: [
      'A temporary support bracket, mechanical lifter, or proprietary mounting aid should be used to take the weight while fixings are secured',
      'One worker should hold the full weight overhead while another fixes it',
      'The board should be balanced on a stepladder rung while it is screwed in place',
      'The board should be wedged against the wall with a length of timber while fixing',
    ],
    correctAnswer: 0,
    explanation:
      'Heavy distribution boards should never be held manually in position while being fixed. Temporary support brackets, mechanical lifters, or proprietary mounting aids take the weight of the board, allowing fixers to work safely without sustaining prolonged static loading in awkward overhead postures.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Distribution Boards',
    category: 'Workplace-Specific Handling',
  },
  {
    id: 149,
    question: 'What is the primary risk associated with using a sack truck on a slope?',
    options: [
      'The wheels spin faster, so the load is delivered more quickly',
      'The load can shift or the truck can run away if the handler loses control, particularly going downhill',
      'The slope makes the load effectively lighter and easier to control',
      'Sack trucks are unaffected by slopes because the load sits over the axle',
    ],
    correctAnswer: 1,
    explanation:
      'On slopes, gravity acts on the loaded sack truck, increasing the force required to control it going uphill and creating a runaway risk going downhill. If the handler loses control, the heavy loaded truck can accelerate rapidly, causing crush or impact injuries to the handler or bystanders.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Cable Drums',
    category: 'Workplace-Specific Handling',
  },
  {
    id: 150,
    question:
      'An electrician needs to pull cable through a ceiling void while lying on a platform between joists. Which risk factor is most elevated?',
    options: [
      'Long carrying distances over open level floor while standing upright',
      'Repeated overhead lifting of heavy loads above shoulder height',
      'Static posture with pulling force applied in a confined space, with no ability to use legs or core effectively',
      'Frequent twisting of the trunk while pivoting on both feet',
    ],
    correctAnswer: 2,
    explanation:
      'Pulling cable while lying in a ceiling void forces the worker to generate all pulling force from the arms and shoulders without the support of the legs or core. This sustained static posture combined with repetitive pulling dramatically increases the risk of shoulder, back, and upper limb injuries.',
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'Ceiling Voids',
    category: 'Workplace-Specific Handling',
  },
  {
    id: 151,
    question:
      'What is the recommended approach for moving materials through an under-floor crawl space with less than 600 mm headroom?',
    options: [
      'Carry the largest load possible in one trip to minimise time in the space',
      'Crawl forwards while dragging the load behind you out of sight',
      'Use a standard sack truck wheeled ahead through the crawl space',
      'Use a drag sheet or low-profile trolley, pushing materials ahead of you rather than carrying them, and minimise the quantity moved at any one time',
    ],
    correctAnswer: 3,
    explanation:
      'In spaces under 600 mm, normal manual handling techniques are impossible. Drag sheets or low-profile trolleys reduce friction when sliding materials. Pushing loads ahead minimises awkward pulling postures. Limiting load quantity per trip reduces the cumulative strain on the body in these extreme conditions.',
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'Under-Floor Crawl Spaces',
    category: 'Workplace-Specific Handling',
  },
  {
    id: 152,
    question:
      'When using a rope and pulley in a riser, what must be ensured before lifting begins?',
    options: [
      'The pulley is securely anchored, the rope is rated for the load weight, the area below is barriered off, and a banksman directs the operation',
      'The rope is left slack so the load can swing freely during the lift',
      'The heaviest available worker is positioned at the bottom of the rope',
      'The load is lifted as quickly as possible to reduce time under tension',
    ],
    correctAnswer: 0,
    explanation:
      'Safe use of rope and pulley systems requires the pulley to be securely fixed to a structural element, the rope rated for the intended load, the area below barriered to protect from falling objects, and a banksman to coordinate the lift. Failure in any element could result in serious injury from falling loads.',
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'Risers',
    category: 'Workplace-Specific Handling',
  },
  {
    id: 153,
    question: 'How does wearing a full body harness affect manual handling capability?',
    options: [
      'It has no effect on handling because it is worn close to the body',
      'It restricts trunk movement, adds weight, and can interfere with grip positioning and load handling close to the body',
      'It improves lifting capacity by supporting the lower back like a belt',
      'It only affects handling when the worker is actually attached to an anchor',
    ],
    correctAnswer: 1,
    explanation:
      'Full body harnesses restrict trunk flexion and rotation, making it harder to adopt correct lifting postures. The harness webbing and attachment points add bulk that prevents loads being held close to the body, and the additional weight of the harness itself adds to the overall physical burden.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'PPE Constraints',
    category: 'Workplace-Specific Handling',
  },
  {
    id: 154,
    question: 'What specific challenge does scaffold board flex present during manual handling?',
    options: [
      'The flex makes any load feel lighter, encouraging overloading',
      'The flex only matters when boards are wet and offers no other risk',
      'The bouncing motion destabilises the handler, requiring constant balance adjustments that increase muscle fatigue and injury risk',
      'The flex improves grip by springing the load back towards the body',
    ],
    correctAnswer: 2,
    explanation:
      'Scaffold boards flex under load, creating a bouncing motion as workers walk across them. When carrying heavy items, this bounce requires continuous balance corrections from the core and leg muscles, increasing fatigue and the risk of stumbling. The unpredictable surface movement compounds the difficulty of controlling a load.',
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'Scaffold Platform Handling',
    category: 'Workplace-Specific Handling',
  },
  {
    id: 155,
    question:
      'Why is it important to vary manual handling tasks throughout a shift rather than performing the same task continuously?',
    options: [
      'Repeating one task builds strength, so injury risk falls over a shift',
      'Varying tasks only matters for office work, not physical handling',
      'Performing the same task is safer because the worker becomes more skilled',
      'Continuous repetitive loading on the same structures exceeds tissue recovery rates, leading to cumulative micro-damage and eventual injury',
    ],
    correctAnswer: 3,
    explanation:
      'When the same structures are loaded repeatedly without adequate recovery time, micro-damage accumulates faster than the body can repair it. Task variation distributes loading across different structures, allowing previously stressed tissues to recover while other areas work, significantly reducing cumulative injury risk.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Job Rotation',
    category: 'Workplace-Specific Handling',
  },
  {
    id: 156,
    question:
      'An electrician reports tingling and numbness in their fingers after a week of repetitive cable stripping. What should the employer do FIRST?',
    options: [
      'Investigate the task, review the risk assessment, consider the symptoms as a potential early sign of a WRULD, and refer the worker for occupational health assessment',
      'Tell the worker the symptoms are normal and to continue the task',
      'Wait until the symptoms become permanent before taking any action',
      'Move the worker to a heavier task to build up their grip strength',
    ],
    correctAnswer: 0,
    explanation:
      'Tingling and numbness are early warning signs of upper limb disorders such as carpal tunnel syndrome. Early investigation and intervention is critical because WRULDs caught early respond much better to treatment and workplace modifications than conditions allowed to progress to chronic stages.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Repetitive Strain',
    category: 'Workplace-Specific Handling',
  },
  {
    id: 157,
    question:
      'What type of mechanical aid is most appropriate for positioning a heavy transformer on a concrete plinth?',
    options: [
      "A four-person team lift using a coordinated kinetic technique",
      "A crane, chain block, or hydraulic gantry rated for the transformer's weight",
      "A sack truck wheeled slowly across the level concrete floor",
      "A simple rope sling held by two workers either side of the plinth",
    ],
    correctAnswer: 1,
    explanation:
      'Transformers are typically far too heavy for any manual handling method. A crane, chain block, or hydraulic gantry system rated for the specific weight is required. The aid must be capable of precise positioning as well as lifting, since transformers must be placed accurately on their mounting plinths.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Transformers',
    category: 'Workplace-Specific Handling',
  },
  {
    id: 158,
    question:
      'What is the effect of muddy ground conditions on wheeled manual handling aids such as pallet trucks?',
    options: [
      'Mud lubricates the wheels, making the aid easier to push',
      'Mud has no effect because the load sits directly over the axle',
      'Wheels can sink, stick, or lose traction in mud, dramatically increasing the pushing force required and the risk of musculoskeletal injury',
      'Mud only affects steering and never the force required to push',
    ],
    correctAnswer: 2,
    explanation:
      'Mud increases rolling resistance dramatically, meaning workers must push much harder to move wheeled aids. Small wheels sink into soft ground, and directional control becomes difficult. The increased pushing force can exceed safe limits, and the sudden release if wheels break free can cause back injuries.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Construction Site Conditions',
    category: 'Workplace-Specific Handling',
  },
  {
    id: 159,
    question: 'How should heavy materials be passed between scaffold lifts (levels)?',
    options: [
      'By throwing each item up to a colleague standing on the level above',
      'By carrying each item up the access ladder one piece at a time',
      'By passing items hand to hand along a chain of workers on the ladder',
      'Using a gin wheel, material hoist, or crane to lift materials mechanically between levels, with the receiving area clear and workers clear of the load path',
    ],
    correctAnswer: 3,
    explanation:
      'Mechanical means such as gin wheels, material hoists, or cranes should be used to transfer heavy materials between scaffold levels. The receiving area must be clear, and workers must stand clear of the load path. Throwing creates strike-injury risks, and ladder carrying combines fall and manual handling hazards.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Scaffold Platform Handling',
    category: 'Workplace-Specific Handling',
  },
  {
    id: 160,
    question:
      'An electrician must install conduit in a roof space with only 1.2 metres of headroom. What combination of controls best manages the manual handling risk?',
    options: [
      'Use shorter conduit sections to reduce load length, knee pads for joint protection, frequent micro-breaks, and pre-position materials at the access point to minimise carrying distance in the restricted space',
      'Carry full-length sections in one trip and work as fast as possible to limit time in the space',
      'Have a single worker complete the whole task alone to avoid coordination problems',
      'Rely solely on a manual handling toolbox talk without changing the task itself',
    ],
    correctAnswer: 0,
    explanation:
      'A multi-faceted approach addresses the multiple risk factors: shorter sections are easier to manoeuvre in restricted space, knee pads protect joints from hard surfaces, micro-breaks combat the increased fatigue from stooped postures, and pre-positioning materials minimises the distance loads are carried in the compromised posture.',
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'Loft and Roof Spaces',
    category: 'Workplace-Specific Handling',
  },

  // HEALTH, WELFARE & RESPONSIBILITIES — questions 161-200 (Module 5)
  {
    id: 161,
    question: 'What does MSD stand for in the context of workplace health?',
    options: [
      'Manual Safety Directive',
      'Musculoskeletal Disorder',
      'Material Storage Document',
      'Maintenance Schedule Database',
    ],
    correctAnswer: 1,
    explanation:
      'MSD stands for Musculoskeletal Disorder, which is a collective term for conditions affecting the muscles, tendons, ligaments, nerves, joints, and spinal discs. MSDs are the most common type of occupational ill health in the UK and are frequently associated with manual handling activities.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'MSDs',
    category: 'Health, Welfare & Responsibilities',
  },
  {
    id: 162,
    question:
      'Which of the following is NOT a common type of musculoskeletal disorder associated with manual handling?',
    options: [
      'Lower back pain',
      'Carpal tunnel syndrome',
      'Appendicitis',
      'Tennis elbow',
    ],
    correctAnswer: 2,
    explanation:
      'Appendicitis is an inflammation of the appendix and is not related to manual handling or musculoskeletal strain. Lower back pain, carpal tunnel syndrome, and tennis elbow are all well-established MSDs that can be caused or aggravated by manual handling activities.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'MSDs',
    category: 'Health, Welfare & Responsibilities',
  },
  {
    id: 163,
    question: 'What is carpal tunnel syndrome?',
    options: [
      'Inflammation of the tendons on the outside of the elbow joint',
      'Degeneration of the cartilage in the knee from prolonged kneeling',
      'Compression of the rotator cuff tendons during overhead reaching',
      'Compression of the median nerve in the wrist causing pain, numbness, and tingling in the hand and fingers',
    ],
    correctAnswer: 3,
    explanation:
      'Carpal tunnel syndrome occurs when the median nerve is compressed as it passes through the carpal tunnel in the wrist. Symptoms include pain, numbness, tingling, and weakness in the thumb, index, and middle fingers. Repetitive gripping, vibration, and forceful hand movements are common workplace causes.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'MSDs',
    category: 'Health, Welfare & Responsibilities',
  },
  {
    id: 164,
    question:
      'What is the common name for lateral epicondylitis, a condition associated with repetitive gripping and twisting?',
    options: [
      'Tennis elbow',
      'Trigger finger',
      "Housemaid's knee",
      "Golfer's elbow",
    ],
    correctAnswer: 0,
    explanation:
      'Tennis elbow (lateral epicondylitis) involves inflammation of the tendons on the outside of the elbow, caused by repetitive gripping, twisting, and lifting movements. Despite its name, it is extremely common in manual workers, particularly those who repeatedly grip tools or handle loads with a twisting motion.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'MSDs',
    category: 'Health, Welfare & Responsibilities',
  },
  {
    id: 165,
    question: 'What is shoulder impingement syndrome?',
    options: [
      'Compression of the median nerve as it passes through the wrist',
      'Compression of tendons and bursa in the shoulder when the arm is raised, causing pain during overhead movements',
      'Inflammation of the tendons on the outer side of the elbow joint',
      'Wearing of the cartilage in the hip from repeated heavy lifting',
    ],
    correctAnswer: 1,
    explanation:
      'Shoulder impingement occurs when the rotator cuff tendons and bursa are compressed between the bones of the shoulder during arm elevation. Repeated overhead work, reaching, and lifting above shoulder height are common workplace causes. Pain typically worsens with continued overhead activity.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'MSDs',
    category: 'Health, Welfare & Responsibilities',
  },
  {
    id: 166,
    question:
      'What are the early symptoms of a developing musculoskeletal disorder that workers should be trained to recognise?',
    options: [
      'Sudden high fever, sore throat, and a persistent dry cough',
      'A rapid heartbeat and shortness of breath only at rest',
      'Persistent aching, stiffness, tingling, numbness, or weakness in the affected area, particularly after work or during repetitive tasks',
      'Skin rashes and itching that appear immediately after handling any load',
    ],
    correctAnswer: 2,
    explanation:
      'Early MSD symptoms include persistent aching, stiffness, tingling, numbness, and weakness that may initially occur only during or after work but gradually become more constant. Recognising and reporting these early signs is crucial because early intervention dramatically improves treatment outcomes.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Symptoms',
    category: 'Health, Welfare & Responsibilities',
  },
  {
    id: 167,
    question: 'Why is early reporting of manual handling-related symptoms so important?',
    options: [
      'It allows the employer to issue a formal warning to the worker promptly',
      'It transfers legal liability for the injury onto the reporting worker',
      'It is only required so the worker can claim statutory sick pay',
      'Early intervention allows workplace modifications and treatment before the condition becomes chronic and potentially irreversible',
    ],
    correctAnswer: 3,
    explanation:
      'MSDs caught in their early stages respond much better to treatment and workplace modifications. If left unreported and untreated, many conditions progress to chronic stages where permanent damage may occur. Early reporting also allows employers to identify and correct the root cause, protecting other workers.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Early Reporting',
    category: 'Health, Welfare & Responsibilities',
  },
  {
    id: 168,
    question:
      'What is the typical first-line treatment approach for a work-related musculoskeletal disorder?',
    options: [
      'A combination of activity modification, physiotherapy, anti-inflammatory treatment, and ergonomic workplace adjustments',
      'Immediate surgery in every case to repair the damaged tissue',
      'Complete bed rest with no movement until all symptoms disappear',
      'A course of antibiotics to clear the underlying inflammation',
    ],
    correctAnswer: 0,
    explanation:
      'Most work-related MSDs are treated conservatively with a combination of activity modification, physiotherapy to restore strength and flexibility, anti-inflammatory medication to manage pain, and ergonomic adjustments to the workplace or task that caused the condition. Surgery is typically a last resort.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Treatment',
    category: 'Health, Welfare & Responsibilities',
  },
  {
    id: 169,
    question:
      'What does a phased return-to-work programme for a worker recovering from a manual handling injury typically involve?',
    options: [
      'Returning the worker immediately to full duties to prove their fitness',
      'Gradually increasing work hours and physical demands over an agreed period, with regular review and modified duties as needed',
      'Keeping the worker off all duties until they are completely symptom-free',
      'Permanently reassigning the worker to administrative tasks only',
    ],
    correctAnswer: 1,
    explanation:
      "A phased return-to-work gradually reintroduces the worker to their role, starting with reduced hours and lighter duties then progressively increasing demands. This approach allows the body to readapt, reduces the risk of re-injury, and supports sustainable recovery while maintaining the worker's connection to their role.",
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Return-to-Work',
    category: 'Health, Welfare & Responsibilities',
  },
  {
    id: 170,
    question: 'At approximately what age does intervertebral disc degeneration typically begin?',
    options: [
      'Not until the 60s',
      'Teenage years',
      'From the 30s onwards',
      'Only after a specific injury',
    ],
    correctAnswer: 2,
    explanation:
      'Intervertebral disc degeneration typically begins in the 30s as the discs gradually lose hydration and elasticity. This natural ageing process means that workers in their 30s and beyond have reduced spinal resilience, making them more vulnerable to manual handling injuries even from loads they could handle safely when younger.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Age Considerations',
    category: 'Health, Welfare & Responsibilities',
  },
  {
    id: 171,
    question: 'How does the hormone relaxin affect manual handling risk during pregnancy?',
    options: [
      'It strengthens the spinal ligaments, allowing heavier loads to be lifted',
      'It increases muscle mass, improving the worker\'s lifting capacity',
      'It has no effect on the musculoskeletal system, only on the uterus',
      'It softens ligaments and increases joint laxity, making the spine and pelvis more vulnerable to injury from manual handling',
    ],
    correctAnswer: 3,
    explanation:
      'Relaxin is produced during pregnancy to soften ligaments in preparation for childbirth. However, this increased ligament laxity affects all joints, including the spine and pelvis, reducing their stability and making them more susceptible to injury from manual handling loads that would normally be manageable.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Pregnancy',
    category: 'Health, Welfare & Responsibilities',
  },
  {
    id: 172,
    question:
      "How does pregnancy change a woman's centre of gravity and why does this matter for manual handling?",
    options: [
      'The centre of gravity shifts forward and upward as the bump grows, increasing spinal loading, reducing balance, and making lifting more awkward',
      'The centre of gravity shifts backward, making the worker more stable when lifting',
      'The centre of gravity drops towards the floor, lowering the risk of falls',
      'The centre of gravity does not change, so manual handling risk is unaffected',
    ],
    correctAnswer: 0,
    explanation:
      "As the pregnancy progresses, the growing bump shifts the centre of gravity forward and upward. This increased distance between the body's centre of gravity and the spine places greater loading on the lower back. Balance is also compromised, and the bump physically prevents loads being held close to the body.",
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Pregnancy',
    category: 'Health, Welfare & Responsibilities',
  },
  {
    id: 173,
    question:
      'Under the MHOR 1992, what specific requirement exists for pregnant workers regarding manual handling?',
    options: [
      'Pregnant workers must be suspended from all work for the duration of the pregnancy',
      'A specific risk assessment must be carried out for pregnant workers, and the task must be modified or avoided if a significant risk is identified',
      'No special requirement applies, as the general risk assessment is sufficient',
      'Pregnant workers may only handle loads below the women\'s 16 kg guideline weight',
    ],
    correctAnswer: 1,
    explanation:
      'The MHOR 1992, read alongside the Management of Health and Safety at Work Regulations 1999, require employers to carry out a specific risk assessment for pregnant workers and new mothers. If a significant risk from manual handling is identified, the employer must modify the task or provide alternative work.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Pregnancy',
    category: 'Health, Welfare & Responsibilities',
  },
  {
    id: 174,
    question: 'Which type of manual handling injury is MOST commonly reported under RIDDOR?',
    options: [
      'Eye injuries caused by dust and debris while handling dirty loads',
      'Crush injuries to the feet from dropped loads landing on the toes',
      'Over-7-day injuries, most frequently involving back sprains and strains from lifting, carrying, or moving loads',
      'Cuts and lacerations to the hands from sharp edges on packaging',
    ],
    correctAnswer: 2,
    explanation:
      'Over-7-day injuries (where a worker is incapacitated for more than seven consecutive days) are the most common RIDDOR-reportable manual handling injuries. Back sprains and strains from lifting, carrying, and moving loads account for the majority of these reports, reflecting the prevalence of cumulative and acute back injuries.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'RIDDOR',
    category: 'Health, Welfare & Responsibilities',
  },
  {
    id: 175,
    question:
      'Under RIDDOR, within what timeframe must an over-7-day injury be reported to the enforcing authority?',
    options: [
      'Immediately, by the quickest practicable means',
      'Within 24 hours of the incident occurring',
      'Within 10 days of the incident',
      'Within 15 days of the incident',
    ],
    correctAnswer: 3,
    explanation:
      'Over-7-day injuries must be reported to the enforcing authority within 15 days of the incident using the appropriate RIDDOR reporting form. This timeframe allows the employer to confirm that the incapacity has lasted more than seven days before triggering the reporting requirement.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'RIDDOR',
    category: 'Health, Welfare & Responsibilities',
  },
  {
    id: 176,
    question:
      'What is the purpose of an incident investigation following a manual handling injury?',
    options: [
      'To identify the root causes of the injury so that corrective actions can prevent recurrence',
      'To establish which individual worker was at fault so they can be disciplined',
      'To calculate the financial cost of the injury for the insurance claim',
      'To satisfy the worker\'s request for an apology from the employer',
    ],
    correctAnswer: 0,
    explanation:
      'Incident investigation aims to identify the underlying root causes that led to the injury, not to assign blame. By understanding what went wrong — whether task design, equipment, environment, training, or organisational factors — the employer can implement corrective actions that prevent similar injuries in future.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Investigation Process',
    category: 'Health, Welfare & Responsibilities',
  },
  {
    id: 177,
    question:
      'What is root cause analysis in the context of a manual handling injury investigation?',
    options: [
      'A method of calculating the total compensation payable to the injured worker',
      'A systematic process of looking beyond the immediate cause to identify the underlying organisational, procedural, or design failures that allowed the injury to occur',
      'A technique for identifying which worker to hold responsible for the incident',
      'A statutory form that must be submitted to the HSE within 15 days of any injury',
    ],
    correctAnswer: 1,
    explanation:
      "Root cause analysis goes beyond the obvious immediate cause (e.g., 'the worker lifted a heavy box') to uncover why the situation existed (e.g., 'no mechanical aid was provided because the risk assessment was inadequate'). Addressing root causes prevents recurrence more effectively than addressing only surface-level factors.",
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'Root Cause Analysis',
    category: 'Health, Welfare & Responsibilities',
  },
  {
    id: 178,
    question:
      'Under the MHOR 1992, what is the correct sequence of employer duties regarding manual handling?',
    options: [
      'Assess, avoid, reduce, inform',
      'Inform, assess, avoid, reduce',
      'Avoid, assess, reduce, inform',
      'Reduce, inform, avoid, assess',
    ],
    correctAnswer: 2,
    explanation:
      'The MHOR 1992 hierarchy requires employers to first avoid hazardous manual handling so far as reasonably practicable, then assess any remaining operations that cannot be avoided, then reduce the risk to the lowest level reasonably practicable, and finally provide information about the remaining residual risk.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Employer Duties',
    category: 'Health, Welfare & Responsibilities',
  },
  {
    id: 179,
    question:
      'What specific information must an employer provide to workers about loads they are required to handle?',
    options: [
      'The retail value of the load and the name of its supplier',
      'The colour and packaging type of the load being handled',
      'The date the load was delivered and its storage location',
      'The weight of the load and, if the centre of gravity is not central, the location of the heaviest side',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 4(1)(b)(iii) of the MHOR 1992 requires employers to provide workers with precise information about the weight of loads and the location of the heaviest side if the centre of gravity is offset. This allows workers to plan their lift appropriately and apply correct technique.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Employer Duties',
    category: 'Health, Welfare & Responsibilities',
  },
  {
    id: 180,
    question: "What are the employee's duties under the MHOR 1992?",
    options: [
      'Employees must make full and proper use of systems of work provided, cooperate with their employer on health and safety, and report any hazards or concerns',
      'Employees must write and sign their own manual handling risk assessments',
      'Employees must provide their own personal protective equipment and lifting aids',
      'Employees must refuse any load heavier than the 25 kg guideline weight',
    ],
    correctAnswer: 0,
    explanation:
      'Under the MHOR 1992 and the Health and Safety at Work Act 1974, employees must cooperate with their employer, use any systems of work and equipment provided for their safety, and report hazards or concerns. Employees who ignore safe systems or take unnecessary risks may be in breach of their legal duties.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Employee Duties',
    category: 'Health, Welfare & Responsibilities',
  },
  {
    id: 181,
    question: "Who is a 'competent person' in relation to manual handling risk assessment?",
    options: [
      'Any employee who has worked for the company for more than five years',
      'Someone with sufficient training, knowledge, experience, and skills to carry out a manual handling risk assessment effectively',
      'The most senior manager present on the site at the time of assessment',
      'An external HSE inspector who must sign off every assessment by law',
    ],
    correctAnswer: 1,
    explanation:
      'A competent person for manual handling risk assessment must have adequate training in risk assessment methodology, knowledge of the relevant legislation and guidance, practical experience of the workplace and tasks, and the skills to identify hazards and recommend appropriate controls.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Competent Person',
    category: 'Health, Welfare & Responsibilities',
  },
  {
    id: 182,
    question: 'How often should manual handling training be refreshed?',
    options: [
      'Only once, at induction, as the techniques do not change over time',
      'Every six months without exception, regardless of the work undertaken',
      'Every 1-3 years, or sooner if there are changes in tasks, equipment, or the working environment, or after an incident',
      'Only after a worker has been involved in a reportable injury',
    ],
    correctAnswer: 2,
    explanation:
      'HSE guidance recommends manual handling training refreshers every 1-3 years. However, refresher training should also be triggered by changes in working practices, new equipment, different loads, incidents or near misses, or evidence that workers are not following safe procedures. Regular refreshment maintains awareness and good practice.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Training Requirements',
    category: 'Health, Welfare & Responsibilities',
  },
  {
    id: 183,
    question: 'What is a toolbox talk in the context of manual handling?',
    options: [
      'A formal full-day classroom course leading to a recognised qualification',
      'A written log in which workers record every load they have handled',
      'A toolbox containing the lifting aids required for a particular task',
      'A short, focused, informal training session delivered at the workplace covering a specific manual handling topic relevant to current work',
    ],
    correctAnswer: 3,
    explanation:
      'Toolbox talks are brief (typically 10-15 minutes), informal training sessions delivered on site that address specific, relevant topics. For manual handling, they might cover safe techniques for a particular task, new equipment, or lessons from a recent incident. They are an effective way to maintain awareness between formal training sessions.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Toolbox Talks',
    category: 'Health, Welfare & Responsibilities',
  },
  {
    id: 184,
    question:
      'An employer has completed a manual handling risk assessment for a specific task. When must the assessment be reviewed?',
    options: [
      'When there is a significant change in the task, equipment, working environment, or workforce, after an incident, or if the assessment is suspected to be no longer valid',
      'Only when an HSE inspector specifically requests a review during a visit',
      'Exactly once every ten years, regardless of any changes to the task',
      'Only after a worker has left the company and been replaced by a new starter',
    ],
    correctAnswer: 0,
    explanation:
      'Risk assessments must remain current and valid. They should be reviewed whenever there are significant changes to the task, equipment, environment, or workforce, after any manual handling incident or near miss, or if there is any reason to believe the assessment no longer reflects actual conditions.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Employer Duties',
    category: 'Health, Welfare & Responsibilities',
  },
  {
    id: 185,
    question: 'What is the most common type of back pain associated with manual handling at work?',
    options: [
      'Cervical disc herniation affecting the neck and shoulders',
      'Non-specific lower back pain (mechanical back pain) affecting the lumbar region',
      'Carpal tunnel syndrome affecting the wrist and hand',
      'Tennis elbow affecting the tendons on the outside of the elbow',
    ],
    correctAnswer: 1,
    explanation:
      'Non-specific lower back pain, also called mechanical back pain, is by far the most common manual handling-related complaint. It affects the lumbar region and can involve muscles, ligaments, facet joints, and intervertebral discs. It is the single largest cause of sickness absence in the UK workforce.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'MSDs',
    category: 'Health, Welfare & Responsibilities',
  },
  {
    id: 186,
    question: 'What is the role of occupational health in managing manual handling injuries?',
    options: [
      'To carry out manual handling risk assessments on behalf of the employer',
      'To deliver all manual handling training and competence assessments on site',
      'To assess fitness for work, recommend workplace adjustments, support rehabilitation, advise on phased return, and conduct health surveillance where appropriate',
      'To submit RIDDOR reports to the enforcing authority on the employer\'s behalf',
    ],
    correctAnswer: 2,
    explanation:
      "Occupational health provides specialist assessment of a worker's fitness for their specific role, recommends practical workplace adjustments to reduce risk, supports rehabilitation programmes, advises on phased return-to-work plans, and can conduct health surveillance to detect early signs of MSDs in at-risk workers.",
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Treatment',
    category: 'Health, Welfare & Responsibilities',
  },
  {
    id: 187,
    question:
      'Which age-related physiological change MOST increases vulnerability to manual handling injury in older workers?',
    options: [
      'Increased muscle mass and bone density that make heavy lifting easier',
      'Improved disc hydration that gives the spine greater shock absorption',
      'Faster tissue repair that allows quicker recovery between handling tasks',
      'Reduced disc hydration, decreased muscle mass, and slower tissue repair combined with accumulated wear',
    ],
    correctAnswer: 3,
    explanation:
      'Ageing reduces intervertebral disc hydration and height, decreases muscle mass and strength (sarcopenia), and slows the rate of tissue repair. Combined with accumulated wear and tear from years of work, these changes mean that older workers are more vulnerable to injury from loads they may have handled safely for decades.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Age Considerations',
    category: 'Health, Welfare & Responsibilities',
  },
  {
    id: 188,
    question:
      'Is a worker legally entitled to refuse to carry out a manual handling task they believe is unsafe?',
    options: [
      'Yes — under Section 7 of the Health and Safety at Work Act 1974, workers have a duty not to put themselves or others at risk, and should report concerns to their employer',
      'No — workers must always follow a direct instruction from a supervisor regardless of the risk',
      'No — only a trade union safety representative has the right to stop unsafe work',
      'Yes — but only if the task involves a load heavier than the 25 kg HSE guideline weight',
    ],
    correctAnswer: 0,
    explanation:
      'Workers have a legal duty under Section 7 of HSWA 1974 to take reasonable care of their own health and safety. If a worker genuinely believes a manual handling task poses serious and imminent danger, they should report their concern. Employers should investigate and address the concern rather than insist the work continues.',
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'Employee Duties',
    category: 'Health, Welfare & Responsibilities',
  },
  {
    id: 189,
    question: 'What constitutes an adequate initial manual handling training programme?',
    options: [
      "A single online video on lifting technique with no practical element",
      "Theory on legislation and anatomy, practical demonstration of techniques, supervised practice with actual workplace loads, assessment of competence, and task-specific elements for the worker's actual role",
      "A leaflet handed to the worker on their first day to read in their own time",
      "A verbal reminder from a supervisor to lift with the legs, not the back",
    ],
    correctAnswer: 1,
    explanation:
      'Effective initial training must combine theoretical knowledge (legislation, anatomy, biomechanics) with practical skill development (demonstration, supervised practice, competence assessment). Critically, it must include task-specific elements relevant to the actual loads, environments, and tasks the worker will encounter in their role.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Training Requirements',
    category: 'Health, Welfare & Responsibilities',
  },
  {
    id: 190,
    question:
      'What is health surveillance in relation to manual handling, and when is it required?',
    options: [
      "A one-off medical examination given to every new starter before they begin work, required for all employees by law",
      "Routine observation of workers performing tasks to check they are using the correct lifting technique, required on every site daily",
      "Systematic monitoring of workers' health through questionnaires, physical checks, or clinical examinations to detect early signs of MSDs, required where the risk assessment identifies a residual risk of MSDs",
      "An annual fitness test to confirm workers can still lift the maximum guideline weight, required only for workers over the age of 50",
    ],
    correctAnswer: 2,
    explanation:
      "Health surveillance for manual handling involves regular monitoring of workers' musculoskeletal health to detect early signs of developing disorders. It is required where the risk assessment identifies that, despite controls, there remains a residual risk of MSDs. Early detection allows intervention before conditions become chronic.",
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'Employer Duties',
    category: 'Health, Welfare & Responsibilities',
  },
  {
    id: 191,
    question:
      'What is the legal standard for how far an employer must go to reduce manual handling risk?',
    options: [
      'They must eliminate every manual handling risk completely, whatever the cost',
      'They need only act once a worker has actually suffered a reportable injury',
      'They must reduce risk only where it is cheap and convenient to do so',
      'So far as is reasonably practicable, meaning the risk reduction measures must be proportionate to the level of risk',
    ],
    correctAnswer: 3,
    explanation:
      "The 'so far as is reasonably practicable' (SFAIRP) test requires employers to reduce risk unless the cost, time, and effort of further reduction is grossly disproportionate to the risk. This is a legal balancing exercise, not an excuse to do nothing — the greater the risk, the more investment is expected.",
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'Employer Duties',
    category: 'Health, Welfare & Responsibilities',
  },
  {
    id: 192,
    question:
      'How can fatigue be identified as a contributing factor in a manual handling incident investigation?',
    options: [
      "By examining shift patterns, working hours, break frequency, workload distribution, time of day, and the worker's reported physical state before the incident",
      "By measuring the exact weight of the load that was being handled at the time",
      "By checking whether the worker had completed their induction training",
      "By reviewing the worker's commuting distance and method of travel to work",
    ],
    correctAnswer: 0,
    explanation:
      "Fatigue as a contributing factor can be identified through analysis of shift patterns, overtime hours, break adequacy, task repetitiveness, time elapsed since last rest, and the worker's own account. Incidents occurring late in shifts, after long hours, or during physically demanding repetitive work often have fatigue as an underlying contributor.",
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'Fatigue Management',
    category: 'Health, Welfare & Responsibilities',
  },
  {
    id: 193,
    question:
      "What is a key difference between an 'over-7-day' injury and a 'specified injury' under RIDDOR?",
    options: [
      'A specified injury affects only the back, while an over-7-day injury can affect any body part',
      'A specified injury (such as a fracture or dislocation) must be reported immediately, while an over-7-day injury must be reported within 15 days',
      'A specified injury must be reported within 15 days, while an over-7-day injury must be reported immediately',
      'A specified injury applies only to visitors, while an over-7-day injury applies only to employees',
    ],
    correctAnswer: 1,
    explanation:
      'Specified injuries (including fractures, dislocations, and amputations) are considered more serious and must be reported to the enforcing authority without delay (immediately by the quickest means). Over-7-day injuries must be reported within 15 days. Both require investigation, but the urgency of reporting differs significantly.',
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'RIDDOR',
    category: 'Health, Welfare & Responsibilities',
  },
  {
    id: 194,
    question:
      'An employer provides manual handling training but does not assess whether workers can apply the techniques in practice. Is this adequate?',
    options: [
      'Yes — delivering the training is enough, as workers are responsible for applying it',
      'Yes — provided the training was delivered by an external accredited trainer',
      'No — training must include assessment of competence to ensure workers can actually apply the techniques in their real workplace tasks',
      'Yes — as long as the training session lasted at least a full working day',
    ],
    correctAnswer: 2,
    explanation:
      'Simply delivering training without checking that workers can apply the techniques is insufficient. Competence assessment — observing workers performing actual tasks using the trained techniques — is essential to confirm that the training has been effective and that workers can translate theory into safe practice.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Training Requirements',
    category: 'Health, Welfare & Responsibilities',
  },
  {
    id: 195,
    question:
      'What topics should a manual handling toolbox talk cover before a specific task, such as unloading a delivery of cable drums?',
    options: [
      'The history of manual handling legislation since the nineteenth century',
      'A detailed account of spinal anatomy and the biomechanics of the disc',
      'The company\'s annual accident statistics and insurance arrangements',
      'The specific risks of the task, the control measures in place, correct techniques, equipment to be used, and what to do if problems arise',
    ],
    correctAnswer: 3,
    explanation:
      'Toolbox talks should be task-specific, covering the particular risks (weight, shape, ground conditions), the available control measures (drum trolley, team handling), correct techniques, the equipment to be used, and emergency procedures. Task-specific briefings are far more effective than generic reminders at preventing injuries.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Toolbox Talks',
    category: 'Health, Welfare & Responsibilities',
  },
  {
    id: 196,
    question:
      'A worker develops chronic lower back pain that they attribute to years of manual handling at work. What type of RIDDOR report might this trigger?',
    options: [
      'A report of an occupational disease — specifically, work-related musculoskeletal disorder affecting the back',
      'A report of a dangerous occurrence, even though no one was actually injured',
      'A report of an over-7-day injury that must be filed within 15 days',
      'No RIDDOR report at all, because chronic back pain is never reportable',
    ],
    correctAnswer: 0,
    explanation:
      "RIDDOR includes provisions for reporting occupational diseases, including certain musculoskeletal conditions. If a doctor diagnoses a work-related MSD and the worker's job involves manual handling as a significant contributing factor, the employer has a duty to report it as an occupational disease under RIDDOR.",
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'RIDDOR',
    category: 'Health, Welfare & Responsibilities',
  },
  {
    id: 197,
    question:
      "What is the employer's duty regarding manual handling for workers returning from a musculoskeletal injury?",
    options: [
      "The employer may dismiss the worker if they cannot lift the guideline weight",
      "The employer must carry out a return-to-work assessment, consider workplace adjustments, and update the risk assessment to reflect the worker's changed capability",
      "The employer has no duty once the worker is signed fit by their own doctor",
      "The employer must permanently bar the worker from all manual handling tasks",
    ],
    correctAnswer: 1,
    explanation:
      "Employers have a duty to assess the returning worker's fitness for their role, make reasonable adjustments (such as modified duties, phased hours, or temporary redeployment), and update the risk assessment to account for any temporary or permanent changes in the worker's physical capability.",
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Return-to-Work',
    category: 'Health, Welfare & Responsibilities',
  },
  {
    id: 198,
    question:
      'During pregnancy, from which trimester should manual handling tasks typically be reassessed?',
    options: [
      'Only from the third trimester, once the bump is visibly large',
      'Only after the worker reports back pain or other handling difficulties',
      'From notification of pregnancy onwards — the risk assessment should be carried out as soon as the employer is notified and reviewed as the pregnancy progresses',
      'Only on the worker\'s return after maternity leave has ended',
    ],
    correctAnswer: 2,
    explanation:
      'The specific risk assessment should be carried out as soon as the employer is notified of the pregnancy, because relaxin and other hormonal changes begin affecting ligament laxity from early pregnancy. The assessment should be reviewed as the pregnancy progresses since physical changes and risk factors increase throughout.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Pregnancy',
    category: 'Health, Welfare & Responsibilities',
  },
  {
    id: 199,
    question: 'What records should an employer maintain regarding manual handling training?',
    options: [
      "Only the total number of workers trained, with no other detail required",
      "Only a signed declaration from each worker that they feel competent to lift",
      "Only the invoice from the external training provider for audit purposes",
      "Records of who was trained, the training content and date, the trainer's competence, competence assessment outcomes, and scheduled refresher dates",
    ],
    correctAnswer: 3,
    explanation:
      'While the specific format is not prescribed, employers should maintain comprehensive training records including attendees, dates, content covered, trainer details, competence assessment results, and planned refresher dates. These records demonstrate compliance, help manage refresher schedules, and provide evidence in the event of an investigation.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Training Requirements',
    category: 'Health, Welfare & Responsibilities',
  },
  {
    id: 200,
    question:
      "An investigation reveals that a manual handling injury occurred because workers were not following the safe system of work, despite having received training. What should the employer's root cause investigation focus on?",
    options: [
      'Understanding WHY workers were not following the system — was it impractical, poorly communicated, were there production pressures, was supervision inadequate, or had bad habits developed unchallenged?',
      'Identifying which individual worker to discipline so that others are deterred from repeating the behaviour',
      'Establishing whether the worker had completed their refresher training within the last twelve months',
      'Confirming that the correct RIDDOR report was submitted within the required timeframe after the injury',
    ],
    correctAnswer: 0,
    explanation:
      'If trained workers are not following safe systems, the root cause almost always lies deeper than individual non-compliance. The investigation should explore whether the system was practical, whether production pressures incentivised shortcuts, whether supervision reinforced safe practice, and whether the working culture supported safety over speed.',
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'Root Cause Analysis',
    category: 'Health, Welfare & Responsibilities',
  },
];
