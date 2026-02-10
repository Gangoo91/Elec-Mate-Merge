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
  "Understanding Manual Handling",
  "Principles of Safe Lifting",
  "Risk Assessment & Reduction",
  "Workplace-Specific Handling",
  "Health, Welfare & Responsibilities"
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
  categories: manualHandlingCategories
};

// ---------------------------------------------------------------------------
// Random question selector
// ---------------------------------------------------------------------------
export const getRandomManualHandlingExamQuestions = (numQuestions: number = 20) => {
  return getRandomQuestionsBalanced(manualHandlingQuestionBank, numQuestions, manualHandlingCategories);
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
    question: "Under the Manual Handling Operations Regulations (MHOR) 1992, what is the definition of manual handling?",
    options: [
      "Lifting heavy objects above head height",
      "Any transporting or supporting of a load by hand or bodily force",
      "Only carrying objects weighing more than 25 kg",
      "Using machinery to move goods around a workplace"
    ],
    correctAnswer: 1,
    explanation: "MHOR 1992 defines manual handling as any transporting or supporting of a load (including lifting, putting down, pushing, pulling, carrying, or moving) by hand or bodily force. It is not limited to heavy objects or lifting alone.",
    section: "Module 1",
    difficulty: "basic",
    topic: "MHOR 1992 definition",
    category: "Understanding Manual Handling"
  },
  {
    id: 2,
    question: "Which of the following activities counts as manual handling under the MHOR 1992?",
    options: [
      "Pushing a loaded trolley along a corridor",
      "Operating a forklift truck",
      "Pressing buttons on a control panel",
      "Typing at a desk workstation"
    ],
    correctAnswer: 0,
    explanation: "Pushing a loaded trolley involves transporting a load by bodily force, which falls within the MHOR 1992 definition of manual handling. Operating machinery, pressing buttons, and typing do not involve supporting or transporting a load by hand or bodily force.",
    section: "Module 1",
    difficulty: "basic",
    topic: "What counts as manual handling",
    category: "Understanding Manual Handling"
  },
  {
    id: 3,
    question: "Approximately how many workers in the UK are affected by musculoskeletal disorders (MSDs) related to manual handling each year?",
    options: [
      "50,000",
      "150,000",
      "500,000",
      "2,000,000"
    ],
    correctAnswer: 2,
    explanation: "HSE statistics indicate that approximately 500,000 workers in the UK suffer from musculoskeletal disorders linked to manual handling each year. This makes MSDs one of the most common causes of workplace ill health.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Manual handling statistics",
    category: "Understanding Manual Handling"
  },
  {
    id: 4,
    question: "What approximate percentage of all workplace injuries in the UK are attributed to manual handling?",
    options: [
      "About 10%",
      "About 20%",
      "About 30%",
      "About 50%"
    ],
    correctAnswer: 2,
    explanation: "Manual handling injuries account for approximately 30% of all workplace injuries reported in the UK. This highlights why proper training and risk assessment are essential in every workplace.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Manual handling statistics",
    category: "Understanding Manual Handling"
  },
  {
    id: 5,
    question: "Which piece of legislation places a general duty on employers to ensure the health, safety, and welfare of employees at work?",
    options: [
      "Manual Handling Operations Regulations 1992",
      "Health and Safety at Work etc. Act 1974",
      "Workplace (Health, Safety and Welfare) Regulations 1992",
      "Provision and Use of Work Equipment Regulations 1998"
    ],
    correctAnswer: 1,
    explanation: "The Health and Safety at Work etc. Act 1974 (HASAWA) is the primary legislation that places a general duty on employers to ensure, so far as is reasonably practicable, the health, safety, and welfare of all employees at work.",
    section: "Module 1",
    difficulty: "basic",
    topic: "HASAWA 1974",
    category: "Understanding Manual Handling"
  },
  {
    id: 6,
    question: "Under the Management of Health and Safety at Work Regulations 1999, employers must carry out what key activity?",
    options: [
      "Provide free gym membership to all staff",
      "Conduct suitable and sufficient risk assessments",
      "Replace all manual handling with automation",
      "Issue personal protective equipment for every task"
    ],
    correctAnswer: 1,
    explanation: "The Management of Health and Safety at Work Regulations 1999 require employers to carry out suitable and sufficient risk assessments for all work activities that may pose a risk to health and safety, including manual handling tasks.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Management Regs 1999",
    category: "Understanding Manual Handling"
  },
  {
    id: 7,
    question: "What does the acronym TILE stand for in the context of manual handling risk assessment?",
    options: [
      "Task, Individual, Load, Environment",
      "Training, Instruction, Lifting, Equipment",
      "Transport, Inspection, Loading, Evaluation",
      "Task, Injury, Legislation, Enforcement"
    ],
    correctAnswer: 0,
    explanation: "TILE stands for Task, Individual, Load, and Environment. It is a structured framework used to assess the key risk factors involved in manual handling operations and identify where controls are needed.",
    section: "Module 1",
    difficulty: "basic",
    topic: "TILE framework overview",
    category: "Understanding Manual Handling"
  },
  {
    id: 8,
    question: "How many vertebrae make up the adult human spinal column?",
    options: [
      "26",
      "30",
      "33",
      "36"
    ],
    correctAnswer: 2,
    explanation: "The adult human spinal column consists of 33 vertebrae. These are divided into five regions: 7 cervical, 12 thoracic, 5 lumbar, 5 sacral (fused), and 4 coccygeal (fused).",
    section: "Module 1",
    difficulty: "basic",
    topic: "Spinal anatomy",
    category: "Understanding Manual Handling"
  },
  {
    id: 9,
    question: "How many regions is the human spine divided into?",
    options: [
      "3",
      "4",
      "5",
      "6"
    ],
    correctAnswer: 2,
    explanation: "The human spine is divided into 5 regions: cervical (neck), thoracic (mid-back), lumbar (lower back), sacral, and coccygeal (tailbone). The lumbar region is most commonly injured during manual handling.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Spinal anatomy",
    category: "Understanding Manual Handling"
  },
  {
    id: 10,
    question: "What is the primary function of intervertebral discs in the spine?",
    options: [
      "To produce red blood cells",
      "To act as shock absorbers between vertebrae",
      "To transmit nerve signals to the brain",
      "To store calcium for bone strength"
    ],
    correctAnswer: 1,
    explanation: "Intervertebral discs sit between adjacent vertebrae and act as shock absorbers, cushioning the spine during movement. They also allow flexibility and help distribute loads evenly across the spinal column.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Spinal anatomy",
    category: "Understanding Manual Handling"
  },
  {
    id: 11,
    question: "Which region of the spine is most commonly injured during poor manual handling?",
    options: [
      "Cervical (neck)",
      "Thoracic (mid-back)",
      "Lumbar (lower back)",
      "Coccygeal (tailbone)"
    ],
    correctAnswer: 2,
    explanation: "The lumbar (lower back) region is most commonly injured during manual handling because it bears the greatest load when lifting. Poor technique increases compressive forces on the lumbar discs significantly.",
    section: "Module 1",
    difficulty: "basic",
    topic: "How injuries occur",
    category: "Understanding Manual Handling"
  },
  {
    id: 12,
    question: "Under MHOR 1992, what is an employer's first duty regarding manual handling operations?",
    options: [
      "Provide training to all employees",
      "Avoid hazardous manual handling operations so far as is reasonably practicable",
      "Supply mechanical aids for every lifting task",
      "Limit all loads to under 10 kg"
    ],
    correctAnswer: 1,
    explanation: "The hierarchy of duties under MHOR 1992 starts with avoidance. Employers must first avoid hazardous manual handling operations so far as is reasonably practicable, before moving on to assessment and risk reduction.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Employer duties under MHOR 1992",
    category: "Understanding Manual Handling"
  },
  {
    id: 13,
    question: "What is a 'load' as defined by the MHOR 1992?",
    options: [
      "Only items weighing more than 25 kg",
      "Any discrete moveable object, including a person or animal",
      "Only items stored in a warehouse",
      "Any object that requires a mechanical aid to move"
    ],
    correctAnswer: 1,
    explanation: "Under MHOR 1992, a load includes any discrete moveable object, which can include boxes, equipment, a person (e.g. in healthcare), or even an animal. There is no minimum weight threshold for something to be considered a load.",
    section: "Module 1",
    difficulty: "basic",
    topic: "MHOR 1992 definition",
    category: "Understanding Manual Handling"
  },
  {
    id: 14,
    question: "Which of the following is NOT one of the five steps in the manual handling risk assessment process?",
    options: [
      "Identify hazardous manual handling operations",
      "Assess the risk of injury",
      "Prosecute employees who refuse to lift",
      "Review the assessment regularly"
    ],
    correctAnswer: 2,
    explanation: "The five-step risk assessment process involves identifying hazards, assessing risks, reducing risks, implementing controls, and reviewing regularly. Prosecuting employees is not part of any risk assessment process.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "5-step risk assessment",
    category: "Understanding Manual Handling"
  },
  {
    id: 15,
    question: "What happens to an intervertebral disc when it is subjected to excessive compressive force during incorrect lifting?",
    options: [
      "It hardens and becomes stronger",
      "It can bulge or herniate, pressing on nearby nerves",
      "It dissolves and is absorbed by the body",
      "It moves to a different position between other vertebrae"
    ],
    correctAnswer: 1,
    explanation: "Excessive compressive force can cause the soft inner material (nucleus pulposus) of an intervertebral disc to bulge or herniate through the outer ring (annulus fibrosus), pressing on spinal nerves and causing severe pain.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "How injuries occur",
    category: "Understanding Manual Handling"
  },
  {
    id: 16,
    question: "Under HASAWA 1974, employees also have duties. Which of the following is an employee duty?",
    options: [
      "Write risk assessments for all manual handling tasks",
      "Take reasonable care of their own health and safety and that of others",
      "Provide personal protective equipment to colleagues",
      "Carry out workplace inspections on behalf of the HSE"
    ],
    correctAnswer: 1,
    explanation: "Under Section 7 of HASAWA 1974, employees must take reasonable care for their own health and safety and that of other persons who may be affected by their acts or omissions at work.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Employee duties under HASAWA 1974",
    category: "Understanding Manual Handling"
  },
  {
    id: 17,
    question: "The MHOR 1992 follows a three-step hierarchy. What is the correct order?",
    options: [
      "Assess, avoid, reduce",
      "Reduce, assess, avoid",
      "Avoid, assess, reduce",
      "Assess, reduce, avoid"
    ],
    correctAnswer: 2,
    explanation: "The MHOR 1992 hierarchy requires employers to first avoid hazardous manual handling where reasonably practicable, then assess the risk of injury for any remaining operations, and finally reduce the risk of injury to the lowest level reasonably practicable.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "MHOR 1992 hierarchy",
    category: "Understanding Manual Handling"
  },
  {
    id: 18,
    question: "A prolapsed disc is also commonly known as what?",
    options: [
      "A fractured vertebra",
      "A slipped disc",
      "A dislocated joint",
      "A torn ligament"
    ],
    correctAnswer: 1,
    explanation: "A prolapsed disc is commonly referred to as a 'slipped disc', although the disc does not actually slip out of place. The inner gel-like material pushes through a weakness in the outer wall, which can compress nearby nerves.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "How injuries occur",
    category: "Understanding Manual Handling"
  },
  {
    id: 19,
    question: "Which type of manual handling injury develops gradually over time due to repetitive tasks?",
    options: [
      "Acute injury",
      "Cumulative injury",
      "Traumatic injury",
      "Sudden-onset injury"
    ],
    correctAnswer: 1,
    explanation: "Cumulative injuries (also called chronic or repetitive strain injuries) develop gradually over time due to repeated manual handling tasks. They result from ongoing wear and tear on muscles, tendons, ligaments, and joints.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "How injuries occur",
    category: "Understanding Manual Handling"
  },
  {
    id: 20,
    question: "Which body parts are most commonly affected by manual handling injuries?",
    options: [
      "Hands and wrists only",
      "Back, neck, shoulders, arms, and legs",
      "Head and face only",
      "Feet and ankles only"
    ],
    correctAnswer: 1,
    explanation: "Manual handling injuries most commonly affect the back (particularly the lower back), neck, shoulders, arms, and legs. The back is the single most frequently injured area, but upper and lower limbs are also at significant risk.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "How injuries occur",
    category: "Understanding Manual Handling"
  },
  {
    id: 21,
    question: "Under MHOR 1992, when must an employer carry out a manual handling risk assessment?",
    options: [
      "Only after an accident has occurred",
      "Only if the load weighs more than 25 kg",
      "When hazardous manual handling cannot be avoided",
      "Only when requested by the HSE"
    ],
    correctAnswer: 2,
    explanation: "Under MHOR 1992, if an employer cannot avoid a hazardous manual handling operation, they must carry out a suitable and sufficient assessment of the risk of injury. This must be done proactively, not just after an incident.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Employer duties under MHOR 1992",
    category: "Understanding Manual Handling"
  },
  {
    id: 22,
    question: "How many cervical vertebrae are there in the human spine?",
    options: [
      "5",
      "7",
      "12",
      "4"
    ],
    correctAnswer: 1,
    explanation: "There are 7 cervical vertebrae (C1-C7) in the neck region of the spine. The cervical spine supports the head and allows a wide range of head movements. It is the most mobile section of the spinal column.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Spinal anatomy",
    category: "Understanding Manual Handling"
  },
  {
    id: 23,
    question: "How many thoracic vertebrae are there in the human spine?",
    options: [
      "5",
      "7",
      "12",
      "9"
    ],
    correctAnswer: 2,
    explanation: "There are 12 thoracic vertebrae (T1-T12) in the mid-back region. Each thoracic vertebra articulates with a pair of ribs, making this the least mobile section of the spine. It provides structural support for the rib cage.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Spinal anatomy",
    category: "Understanding Manual Handling"
  },
  {
    id: 24,
    question: "Which of the following is an example of an acute manual handling injury?",
    options: [
      "Gradual onset of shoulder pain over several months",
      "A sudden muscle tear from lifting a heavy object incorrectly",
      "Carpal tunnel syndrome from repetitive wrist movements",
      "Chronic lower back stiffness from years of bending"
    ],
    correctAnswer: 1,
    explanation: "An acute injury occurs suddenly, usually from a single incident such as an incorrect lift. A sudden muscle tear is a classic example of an acute manual handling injury, as opposed to cumulative injuries that develop over time.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "How injuries occur",
    category: "Understanding Manual Handling"
  },
  {
    id: 25,
    question: "What does the 'T' in the TILE framework specifically ask you to consider?",
    options: [
      "The training records of each employee",
      "The nature of the task — does it involve twisting, bending, reaching, or repetition?",
      "The type of personal protective equipment required",
      "The total number of employees available"
    ],
    correctAnswer: 1,
    explanation: "The 'T' (Task) in TILE asks you to consider the nature of the task itself — does it involve twisting, bending, stooping, reaching, repetitive movements, long carrying distances, or sustained physical effort?",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "TILE framework overview",
    category: "Understanding Manual Handling"
  },
  {
    id: 26,
    question: "What does the 'I' in the TILE framework ask you to assess?",
    options: [
      "The insurance cover for the task",
      "The individual — their capability, fitness, training, and any health conditions",
      "The inspection schedule for equipment",
      "The income generated by the task"
    ],
    correctAnswer: 1,
    explanation: "The 'I' (Individual) in TILE considers the person doing the handling — their physical capability, fitness level, training, any pre-existing health conditions, pregnancy, and whether they have the necessary knowledge and experience.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "TILE framework overview",
    category: "Understanding Manual Handling"
  },
  {
    id: 27,
    question: "What does the 'L' in the TILE framework require you to consider about the load?",
    options: [
      "Only the weight of the load",
      "The weight, shape, size, stability, grip, and whether it contains anything hazardous",
      "Only whether the load has a proper label",
      "The legal ownership of the load"
    ],
    correctAnswer: 1,
    explanation: "The 'L' (Load) factor requires consideration of the load's weight, shape, size, stability, whether it has adequate handholds, whether it is hot or has sharp edges, and whether its contents might shift during handling.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "TILE framework overview",
    category: "Understanding Manual Handling"
  },
  {
    id: 28,
    question: "What factors does the 'E' in the TILE framework cover?",
    options: [
      "Employee salary and benefits",
      "The environment — space, floor conditions, lighting, temperature, and obstacles",
      "The equipment maintenance schedule",
      "The emergency evacuation plan"
    ],
    correctAnswer: 1,
    explanation: "The 'E' (Environment) in TILE covers the working environment including available space, floor conditions (wet, uneven, slippery), lighting levels, temperature extremes, weather conditions, and any obstacles or hazards in the area.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "TILE framework overview",
    category: "Understanding Manual Handling"
  },
  {
    id: 29,
    question: "Which of the following is a musculoskeletal disorder (MSD) commonly caused by manual handling?",
    options: [
      "Asthma",
      "Tendonitis",
      "Dermatitis",
      "Tinnitus"
    ],
    correctAnswer: 1,
    explanation: "Tendonitis (inflammation of a tendon) is a common musculoskeletal disorder caused by repetitive manual handling tasks. Other manual handling MSDs include back pain, herniated discs, sprains, strains, and joint problems.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "How injuries occur",
    category: "Understanding Manual Handling"
  },
  {
    id: 30,
    question: "What is the purpose of the HSE's five-step approach to manual handling risk assessment?",
    options: [
      "To determine the maximum fine for non-compliance",
      "To provide a systematic method for identifying, assessing, and controlling manual handling risks",
      "To calculate the exact weight each worker can lift",
      "To replace the need for manual handling training"
    ],
    correctAnswer: 1,
    explanation: "The HSE's five-step approach provides a systematic framework for identifying hazardous operations, assessing the risks, reducing risks to the lowest level reasonably practicable, implementing controls, and reviewing assessments regularly.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "5-step risk assessment",
    category: "Understanding Manual Handling"
  },
  {
    id: 31,
    question: "An employee has a pre-existing back condition. Under MHOR 1992, what should the employer do?",
    options: [
      "Dismiss the employee immediately",
      "Ignore it as it is the employee's personal matter",
      "Take account of the individual's condition when assessing risk and adapt tasks accordingly",
      "Ban the employee from all work activities"
    ],
    correctAnswer: 2,
    explanation: "Under MHOR 1992 and the 'Individual' factor of TILE, employers must take account of any individual characteristics that may increase the risk of injury, including pre-existing conditions. Reasonable adjustments should be made to tasks.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Individual factors in MHOR 1992",
    category: "Understanding Manual Handling"
  },
  {
    id: 32,
    question: "How many lumbar vertebrae does the human spine contain?",
    options: [
      "4",
      "5",
      "7",
      "12"
    ],
    correctAnswer: 1,
    explanation: "The lumbar region contains 5 vertebrae (L1-L5). These are the largest and strongest vertebrae as they bear the most weight. The lumbar spine is particularly vulnerable during manual handling due to the high compressive forces placed upon it.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Spinal anatomy",
    category: "Understanding Manual Handling"
  },
  {
    id: 33,
    question: "Under the Management of Health and Safety at Work Regulations 1999, what additional duty applies regarding young workers and manual handling?",
    options: [
      "Young workers are exempt from all manual handling duties",
      "A specific risk assessment must be carried out for young persons before they start work",
      "Young workers must always work in pairs",
      "Young workers can only lift loads under 5 kg"
    ],
    correctAnswer: 1,
    explanation: "The Management Regulations 1999 require employers to carry out a specific risk assessment for young persons (under 18) before they start work. This must take into account their inexperience, lack of awareness of risks, and physical immaturity.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "Management Regs 1999",
    category: "Understanding Manual Handling"
  },
  {
    id: 34,
    question: "When calculating the compressive force on the lumbar spine during a lift, which factor has the greatest influence?",
    options: [
      "The colour of the load",
      "The horizontal distance between the load and the spine",
      "The ambient temperature of the room",
      "The time of day the lift is performed"
    ],
    correctAnswer: 1,
    explanation: "The horizontal distance between the load and the spine is the most significant factor affecting lumbar compressive force. Holding a load at arm's length can create compressive forces on the L5/S1 disc several times greater than holding it close to the body.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "How injuries occur",
    category: "Understanding Manual Handling"
  },
  {
    id: 35,
    question: "Which section of HASAWA 1974 specifically covers employees' duties to cooperate with their employer on health and safety matters?",
    options: [
      "Section 2",
      "Section 3",
      "Section 7",
      "Section 9"
    ],
    correctAnswer: 2,
    explanation: "Section 7 of HASAWA 1974 places duties on employees to take reasonable care and to cooperate with their employer so far as is necessary to enable the employer to comply with health and safety requirements.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "HASAWA 1974",
    category: "Understanding Manual Handling"
  },
  {
    id: 36,
    question: "A worker suffers a herniated disc at L4/L5 during a manual handling operation. What structure has been damaged?",
    options: [
      "The spinal cord has been severed",
      "The annulus fibrosus has ruptured allowing the nucleus pulposus to protrude",
      "The vertebral body has fractured into multiple pieces",
      "The facet joint has become dislocated"
    ],
    correctAnswer: 1,
    explanation: "A herniated (prolapsed) disc occurs when the annulus fibrosus (tough outer ring of the disc) ruptures, allowing the nucleus pulposus (soft gel-like centre) to protrude outwards. At L4/L5, this commonly compresses the L5 nerve root, causing sciatica.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "Spinal anatomy",
    category: "Understanding Manual Handling"
  },
  {
    id: 37,
    question: "Under MHOR 1992, Schedule 1 lists factors to consider in a risk assessment. Which of the following is NOT a Schedule 1 factor?",
    options: [
      "The task involves twisting the trunk",
      "The load is unwieldy or difficult to grasp",
      "The handler has less than one year of service with the employer",
      "The environment constrains the handler's posture"
    ],
    correctAnswer: 2,
    explanation: "Schedule 1 of MHOR 1992 lists specific risk factors relating to the task, load, working environment, individual capability, and other factors. Length of service with an employer is not a listed factor; relevant individual factors relate to physical capability and health conditions.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "MHOR 1992 Schedule 1",
    category: "Understanding Manual Handling"
  },
  {
    id: 38,
    question: "What is the approximate compressive force on the L5/S1 disc when a 70 kg person lifts a 20 kg load at arm's length?",
    options: [
      "Around 200 N",
      "Around 1,500 N",
      "Around 3,400 N or more",
      "Around 500 N"
    ],
    correctAnswer: 2,
    explanation: "Biomechanical studies show that lifting a 20 kg load at arm's length can create compressive forces of around 3,400 N or more on the L5/S1 disc. This is well above the commonly cited action limit of 3,400 N and close to levels associated with disc damage.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "Biomechanics of injury",
    category: "Understanding Manual Handling"
  },
  {
    id: 39,
    question: "What is the legal significance of the phrase 'so far as is reasonably practicable' as used in MHOR 1992?",
    options: [
      "It means employers must eliminate all risks regardless of cost",
      "It requires a balance between the level of risk and the cost, time, and effort of reducing it",
      "It means employers can ignore risks if they choose to",
      "It only applies to employers with more than 50 employees"
    ],
    correctAnswer: 1,
    explanation: "The phrase 'so far as is reasonably practicable' means that the degree of risk must be balanced against the sacrifice (in terms of money, time, or trouble) needed to avert it. If the risk is significant, proportionate action must be taken unless grossly disproportionate to the risk.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "Legal interpretation of MHOR 1992",
    category: "Understanding Manual Handling"
  },
  {
    id: 40,
    question: "Which court case established the principle that an employer's duty under MHOR 1992 is not absolute but qualified by 'reasonably practicable'?",
    options: [
      "Edwards v National Coal Board (1949)",
      "Donoghue v Stevenson (1932)",
      "Rylands v Fletcher (1868)",
      "Smith v Baker (1891)"
    ],
    correctAnswer: 0,
    explanation: "Edwards v National Coal Board (1949) is the leading case that defined 'reasonably practicable'. The court held that a computation must be made between the quantum of risk and the sacrifice involved in the measures necessary to avert it.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "Legal interpretation of MHOR 1992",
    category: "Understanding Manual Handling"
  },
  // =======================================================================
  // PRINCIPLES OF SAFE LIFTING — 40 questions (id 41–80)
  // =======================================================================
  {
    id: 41,
    question: "What is the first step in the kinetic lifting technique?",
    options: [
      "Grip the load tightly and pull upwards",
      "Plan the lift — assess the load, route, and destination",
      "Bend at the waist and reach for the load",
      "Take a deep breath and hold it throughout the lift"
    ],
    correctAnswer: 1,
    explanation: "The first step in the kinetic lifting technique is to plan the lift. This includes assessing the load's weight and stability, checking the route is clear, identifying where the load will be placed, and deciding if help or equipment is needed.",
    section: "Module 2",
    difficulty: "basic",
    topic: "8-step kinetic lifting technique",
    category: "Principles of Safe Lifting"
  },
  {
    id: 42,
    question: "When lifting a load from the ground, which part of the body should you bend?",
    options: [
      "The waist only",
      "The knees and hips, keeping the back straight",
      "The back, keeping the legs straight",
      "The neck, looking down at the load"
    ],
    correctAnswer: 1,
    explanation: "You should bend at the knees and hips while keeping your back naturally straight (maintaining its natural curves). This uses the strong leg muscles to power the lift rather than placing excessive stress on the lower back.",
    section: "Module 2",
    difficulty: "basic",
    topic: "8-step kinetic lifting technique",
    category: "Principles of Safe Lifting"
  },
  {
    id: 43,
    question: "What does 'base of support' mean in the context of safe lifting?",
    options: [
      "The shelf or surface the load rests on",
      "The area between and beneath your feet that provides stability",
      "The floor of the building where the lift takes place",
      "The bottom of the load being lifted"
    ],
    correctAnswer: 1,
    explanation: "The base of support is the area between and beneath your feet. A wider base of support (feet shoulder-width apart, with one foot slightly forward) provides greater stability during a lift and reduces the risk of losing balance.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Base of support",
    category: "Principles of Safe Lifting"
  },
  {
    id: 44,
    question: "Where is the 'power zone' for safe lifting?",
    options: [
      "Above head height",
      "Below ankle level",
      "Between the knees and the shoulders, close to the body",
      "At arm's length from the body"
    ],
    correctAnswer: 2,
    explanation: "The power zone (also called the comfort zone) is the area between knee height and shoulder height, close to the body. Lifting within this zone minimises stress on the back and allows the strongest muscles to do the work.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Power zone",
    category: "Principles of Safe Lifting"
  },
  {
    id: 45,
    question: "Is pushing or pulling generally considered safer when moving a load?",
    options: [
      "Pulling is always safer than pushing",
      "Pushing is generally safer than pulling",
      "There is no difference between pushing and pulling",
      "Neither pushing nor pulling is safe"
    ],
    correctAnswer: 1,
    explanation: "Pushing is generally safer than pulling because you can use your body weight to assist, maintain a better posture, see where you are going, and apply force more effectively. Pulling increases the risk of overloading the back and losing balance.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Pushing vs pulling",
    category: "Principles of Safe Lifting"
  },
  {
    id: 46,
    question: "How should your feet be positioned when preparing to lift a load?",
    options: [
      "Close together with toes pointing outward",
      "Shoulder-width apart with one foot slightly forward",
      "As wide apart as possible",
      "Together, directly beneath the load"
    ],
    correctAnswer: 1,
    explanation: "Feet should be shoulder-width apart with one foot slightly forward (alongside the load). This stance provides a stable base of support and allows you to shift your weight smoothly during the lift.",
    section: "Module 2",
    difficulty: "basic",
    topic: "8-step kinetic lifting technique",
    category: "Principles of Safe Lifting"
  },
  {
    id: 47,
    question: "Why should you keep a load close to your body during lifting?",
    options: [
      "To keep it warm",
      "To reduce the lever effect and decrease strain on the spine",
      "To prevent others from taking the load",
      "To make the load appear lighter"
    ],
    correctAnswer: 1,
    explanation: "Keeping a load close to the body reduces the lever (moment arm) effect. The further a load is held from the spine, the greater the compressive force on the lumbar discs. Keeping it close significantly reduces spinal loading.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Centre of gravity",
    category: "Principles of Safe Lifting"
  },
  {
    id: 48,
    question: "When carrying a load, where should you look?",
    options: [
      "Down at the load at all times",
      "Up at the ceiling to keep your back straight",
      "Ahead in the direction of travel",
      "Behind you to check for other workers"
    ],
    correctAnswer: 2,
    explanation: "When carrying a load, you should look ahead in the direction of travel. This helps you maintain good posture, see any obstacles or hazards in your path, and navigate safely to your destination.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Carrying techniques",
    category: "Principles of Safe Lifting"
  },
  {
    id: 49,
    question: "What should you do if a load is too heavy for you to lift safely on your own?",
    options: [
      "Try to lift it anyway using maximum effort",
      "Get help from others or use a mechanical aid",
      "Drag it along the floor",
      "Leave it where it is and go home"
    ],
    correctAnswer: 1,
    explanation: "If a load is too heavy for a solo lift, you should get help from one or more colleagues or use an appropriate mechanical aid such as a trolley, sack truck, or hoist. Never attempt to lift a load beyond your capability.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Team handling",
    category: "Principles of Safe Lifting"
  },
  {
    id: 50,
    question: "What is the purpose of a 'test lift' before fully lifting a load?",
    options: [
      "To calculate the exact weight of the load",
      "To check the load's weight and stability before committing to the full lift",
      "To demonstrate strength to colleagues",
      "To warm up the muscles before heavy lifting"
    ],
    correctAnswer: 1,
    explanation: "A test lift involves gently rocking or partially lifting the load to assess its weight, stability, and whether the contents might shift. This allows you to determine whether you can lift it safely or need assistance before committing to the full lift.",
    section: "Module 2",
    difficulty: "basic",
    topic: "8-step kinetic lifting technique",
    category: "Principles of Safe Lifting"
  },
  {
    id: 51,
    question: "Why should you avoid twisting your trunk while carrying a load?",
    options: [
      "It makes the load look unprofessional",
      "Twisting under load places shear forces on the spine, increasing injury risk",
      "It slows down the work rate",
      "It is only dangerous for people over 50"
    ],
    correctAnswer: 1,
    explanation: "Twisting the trunk while carrying a load places significant shear forces on the intervertebral discs and surrounding structures. Combined with compressive force from the load, this greatly increases the risk of disc injury and muscle strain.",
    section: "Module 2",
    difficulty: "basic",
    topic: "8-step kinetic lifting technique",
    category: "Principles of Safe Lifting"
  },
  {
    id: 52,
    question: "According to HSE guidelines, what is the approximate guideline force for starting a load in motion on a flat surface for men?",
    options: [
      "10 kg",
      "20 kg",
      "35 kg",
      "50 kg"
    ],
    correctAnswer: 1,
    explanation: "HSE pushing and pulling guidelines suggest that the force needed to start a load moving should be approximately 20 kg (about 200 N) for men on a flat surface. For sustaining the movement, the guideline drops to about 10 kg (100 N).",
    section: "Module 2",
    difficulty: "basic",
    topic: "HSE force guidelines",
    category: "Principles of Safe Lifting"
  },
  {
    id: 53,
    question: "What is the approximate HSE guideline force for sustaining a pushing or pulling movement for men?",
    options: [
      "5 kg",
      "10 kg",
      "20 kg",
      "30 kg"
    ],
    correctAnswer: 1,
    explanation: "The HSE guideline for the sustained force required to keep a load moving is approximately 10 kg (about 100 N) for men. This is lower than the initial starting force of 20 kg because less effort is needed once the load is in motion.",
    section: "Module 2",
    difficulty: "basic",
    topic: "HSE force guidelines",
    category: "Principles of Safe Lifting"
  },
  {
    id: 54,
    question: "In a team lift, who should give the commands to lift and lower?",
    options: [
      "Everyone at the same time",
      "One designated leader",
      "The person closest to the exit",
      "No commands are necessary"
    ],
    correctAnswer: 1,
    explanation: "In a team lift, one person should be designated as the leader who gives clear verbal commands (e.g. 'Ready, steady, lift'). This ensures all team members lift and lower simultaneously, preventing uneven loading and potential injuries.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Team handling",
    category: "Principles of Safe Lifting"
  },
  {
    id: 55,
    question: "What is the maximum recommended number of people for a team lift?",
    options: [
      "2 people",
      "4 people",
      "8 people",
      "There is no limit"
    ],
    correctAnswer: 1,
    explanation: "The maximum recommended number for a team lift is approximately 4 people. Beyond this number, coordination becomes increasingly difficult, the load cannot be shared evenly, and the risk of someone losing their grip increases significantly.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Team handling",
    category: "Principles of Safe Lifting"
  },
  {
    id: 56,
    question: "When performing a team lift, each person's share of the load should be estimated at what fraction of the total?",
    options: [
      "Each person carries their equal mathematical share",
      "Each person should assume they carry only one-third of the total regardless of team size",
      "The load should be calculated as each person carrying roughly two-thirds of what they could individually manage",
      "Each person's share should be reduced by at least one-third compared to their equal mathematical share"
    ],
    correctAnswer: 3,
    explanation: "In team lifts, the load is not shared perfectly equally due to coordination difficulties. Each person's effective share should be reduced by at least one-third compared to their mathematical share. For example, in a two-person lift, each should assume they are carrying roughly two-thirds of half the load.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Team handling",
    category: "Principles of Safe Lifting"
  },
  {
    id: 57,
    question: "How should a long load (such as a length of conduit or pipe) be carried by two people?",
    options: [
      "Both people should carry it on the same shoulder",
      "One person at each end, both on the same side, communicating clearly",
      "One person should carry both ends while the other watches",
      "The load should be carried vertically above head height"
    ],
    correctAnswer: 1,
    explanation: "A long load should be carried by one person at each end, on the same side of the body, communicating clearly to coordinate movement. The person at the rear should be able to see ahead, and both must move in step to prevent twisting.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Long loads",
    category: "Principles of Safe Lifting"
  },
  {
    id: 58,
    question: "What is the correct technique for lowering a load to the ground?",
    options: [
      "Drop the load from waist height",
      "Reverse the lifting technique — bend the knees and hips, keep the back straight",
      "Bend at the waist and straighten the legs",
      "Throw the load gently towards the ground"
    ],
    correctAnswer: 1,
    explanation: "Lowering a load should reverse the lifting technique: bend the knees and hips while keeping the back naturally straight. Position the load then release your grip. Dropping or throwing loads creates impact hazards and does not constitute safe handling.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "8-step kinetic lifting technique",
    category: "Principles of Safe Lifting"
  },
  {
    id: 59,
    question: "Why should you tuck your chin in slightly when lifting?",
    options: [
      "To protect your teeth",
      "To help maintain the natural curvature of the spine and keep the back straight",
      "To prevent you from talking during the lift",
      "To make the load appear lighter"
    ],
    correctAnswer: 1,
    explanation: "Tucking your chin in slightly helps to maintain the natural curvature of the spine and keeps the back in a neutral position. This aligns the cervical, thoracic, and lumbar spine, distributing forces more evenly during the lift.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "8-step kinetic lifting technique",
    category: "Principles of Safe Lifting"
  },
  {
    id: 60,
    question: "What is meant by the 'centre of gravity' when lifting?",
    options: [
      "The centre of the room where lifting takes place",
      "The point at which the weight of the body (and load) is concentrated and balanced",
      "The central position of the feet on the floor",
      "The middle vertebra of the spine"
    ],
    correctAnswer: 1,
    explanation: "The centre of gravity is the theoretical point at which all the weight of the body (and any load being carried) is concentrated. Keeping this point over the base of support is essential for maintaining balance during lifting.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Centre of gravity",
    category: "Principles of Safe Lifting"
  },
  {
    id: 61,
    question: "When should you use a hook grip rather than a full grip on a load?",
    options: [
      "When the load has handles or cut-outs that accommodate the fingers",
      "Never — a hook grip is always dangerous",
      "Only when lifting loads above shoulder height",
      "When the load weighs less than 5 kg"
    ],
    correctAnswer: 0,
    explanation: "A hook grip (fingers hooked through handles or openings) can be used when the load has suitable handles or cut-outs. However, a full grip (palm and fingers wrapped around the load) is generally more secure and reduces the risk of the load slipping.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Carrying techniques",
    category: "Principles of Safe Lifting"
  },
  {
    id: 62,
    question: "Why is it important to wear appropriate footwear when performing manual handling tasks?",
    options: [
      "To look professional on site",
      "To provide grip, stability, and protection from dropped loads",
      "To keep feet warm in cold warehouses",
      "It is only important in wet weather"
    ],
    correctAnswer: 1,
    explanation: "Appropriate footwear (typically safety boots with steel toecaps and slip-resistant soles) provides grip on the floor surface, stability during lifting, and protection in case a load is dropped. Poor footwear significantly increases the risk of slips and crush injuries.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Carrying techniques",
    category: "Principles of Safe Lifting"
  },
  {
    id: 63,
    question: "When carrying a load up or down stairs, what additional precautions should be taken?",
    options: [
      "No additional precautions are needed",
      "Always run to maintain momentum",
      "Ensure clear vision of the steps, use handrails where possible, and take one step at a time",
      "Carry the heaviest loads first to get them out of the way"
    ],
    correctAnswer: 2,
    explanation: "When using stairs, you should ensure you can see the steps (the load should not block your view), use handrails where possible, take one step at a time, and move slowly and carefully. Team lifts on stairs require extra coordination.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Stairways",
    category: "Principles of Safe Lifting"
  },
  {
    id: 64,
    question: "What is the recommended technique for handling an awkward or bulky load that obscures your vision?",
    options: [
      "Carry it quickly to get it over with",
      "Use a mechanical aid, get help, or break the load into smaller manageable parts",
      "Carry it above your head for better visibility",
      "Close your eyes and rely on memory of the route"
    ],
    correctAnswer: 1,
    explanation: "If a load is too bulky to see around, you should use a mechanical aid, seek assistance from a colleague, or break the load into smaller parts. If a team carries it, a spotter should guide the way. Never carry a load that blocks your vision.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Awkward loads",
    category: "Principles of Safe Lifting"
  },
  {
    id: 65,
    question: "What is the main benefit of using smooth, controlled movements rather than jerky actions when lifting?",
    options: [
      "It looks more professional",
      "It reduces the peak forces on the spine and muscles, lowering injury risk",
      "It makes the task take longer, which improves productivity records",
      "It only benefits people with existing injuries"
    ],
    correctAnswer: 1,
    explanation: "Smooth, controlled movements reduce the peak (dynamic) forces placed on the spine and muscles. Jerky or sudden movements create much higher instantaneous loads than the static weight of the object, significantly increasing the risk of injury.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "8-step kinetic lifting technique",
    category: "Principles of Safe Lifting"
  },
  {
    id: 66,
    question: "How should you handle a load in a restricted or confined space?",
    options: [
      "Use exactly the same technique as in an open area",
      "Adapt the technique, reduce load size where possible, and ensure adequate space to maintain good posture",
      "Only lift loads when no one else is present",
      "Always use mechanical aids — manual handling in confined spaces is illegal"
    ],
    correctAnswer: 1,
    explanation: "In confined spaces, you should adapt your technique to the available space, reduce load size where possible, maintain as good a posture as you can, and consider alternative methods. Poor posture forced by confined spaces significantly increases injury risk.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Restricted spaces",
    category: "Principles of Safe Lifting"
  },
  {
    id: 67,
    question: "What is the recommended height range for push/pull handles to minimise injury risk?",
    options: [
      "Floor level to knee height",
      "Between knee height and shoulder height, ideally between hip and chest",
      "Above shoulder height only",
      "Handle height does not matter"
    ],
    correctAnswer: 1,
    explanation: "Push/pull handles should ideally be between hip and chest height (roughly between waist and shoulder level). This allows the handler to apply force in a horizontal direction while maintaining good posture, reducing the risk of back strain.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Pushing vs pulling",
    category: "Principles of Safe Lifting"
  },
  {
    id: 68,
    question: "When lifting, why is it important to breathe naturally rather than holding your breath?",
    options: [
      "To prevent your face from turning red",
      "Holding your breath can raise blood pressure dangerously and reduce stability",
      "Breathing helps the load feel lighter",
      "It makes no difference to the lift"
    ],
    correctAnswer: 1,
    explanation: "Holding your breath during a lift (known as the Valsalva manoeuvre) can cause a dangerous spike in blood pressure, dizziness, and even fainting. Breathing naturally maintains oxygen supply to muscles and keeps blood pressure stable.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "8-step kinetic lifting technique",
    category: "Principles of Safe Lifting"
  },
  {
    id: 69,
    question: "What happens to the effective weight of a load as it is held further from the body?",
    options: [
      "The effective weight decreases",
      "The effective weight stays the same",
      "The effective weight increases due to the lever effect",
      "The effective weight becomes zero at arm's length"
    ],
    correctAnswer: 2,
    explanation: "As a load is held further from the body, the lever arm increases, meaning the effective force on the spine increases dramatically. A 10 kg load held at arm's length can create the same spinal loading as a much heavier load held close to the body.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Centre of gravity",
    category: "Principles of Safe Lifting"
  },
  {
    id: 70,
    question: "When lifting with a colleague, what should you do if the load begins to slip?",
    options: [
      "Try to catch it by lunging forward",
      "Communicate immediately, lower the load to the ground in a controlled manner, and re-grip",
      "Let your colleague take the full weight while you readjust",
      "Throw the load away from both of you"
    ],
    correctAnswer: 1,
    explanation: "If a load begins to slip during a team lift, you should immediately communicate with your partner, lower the load to the ground in a controlled manner, and then re-grip properly before attempting to lift again. Lunging or sudden movements increase injury risk.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Team handling",
    category: "Principles of Safe Lifting"
  },
  {
    id: 71,
    question: "What is the biomechanical advantage of bending the knees rather than the back when lifting?",
    options: [
      "The knee joints are stronger than the back muscles",
      "It uses the large quadriceps and gluteal muscles while reducing the moment arm on the lumbar spine",
      "It protects the knees from arthritis",
      "There is no biomechanical advantage — it is simply tradition"
    ],
    correctAnswer: 1,
    explanation: "Bending the knees engages the large, powerful quadriceps and gluteal muscles for the lift while keeping the trunk more upright, which reduces the horizontal distance (moment arm) between the load and the lumbar spine. This significantly decreases compressive forces on the lumbar discs.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "Biomechanics of lifting",
    category: "Principles of Safe Lifting"
  },
  {
    id: 72,
    question: "What does 'intra-abdominal pressure' contribute to during a manual lift?",
    options: [
      "It has no effect on lifting",
      "It provides additional support and stability to the lumbar spine during exertion",
      "It only applies to abdominal surgery patients",
      "It weakens the spine and should be avoided"
    ],
    correctAnswer: 1,
    explanation: "Increased intra-abdominal pressure (generated by the abdominal and trunk muscles contracting) acts like an internal splint, providing additional support and stability to the lumbar spine during lifting. This is why core strength is important for manual handling.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "Biomechanics of lifting",
    category: "Principles of Safe Lifting"
  },
  {
    id: 73,
    question: "A load with an offset centre of gravity (e.g. contents shifted to one side) presents what specific risk?",
    options: [
      "No additional risk compared to a balanced load",
      "Unexpected twisting forces on the handler's spine as the load tilts",
      "The load will always be lighter than expected",
      "It can only be moved using a forklift"
    ],
    correctAnswer: 1,
    explanation: "A load with an offset centre of gravity can tilt unexpectedly when lifted, imposing sudden asymmetric and twisting forces on the handler's spine. This creates shear forces on the lumbar discs and increases the risk of muscle strain and disc injury.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "Centre of gravity",
    category: "Principles of Safe Lifting"
  },
  {
    id: 74,
    question: "When comparing a stoop lift (bending at the waist) with a squat lift (bending at the knees), which statement is biomechanically correct?",
    options: [
      "A stoop lift always creates less spinal loading",
      "A squat lift generally creates less compressive force on the lumbar spine for heavier loads",
      "Both create identical forces on the spine regardless of load weight",
      "A stoop lift is recommended for all loads over 25 kg"
    ],
    correctAnswer: 1,
    explanation: "For heavier loads, a squat lift generally creates less compressive force on the lumbar spine because it keeps the trunk more upright and reduces the moment arm. However, for very light objects or where knee bending is restricted, a semi-stoop may be acceptable.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "Biomechanics of lifting",
    category: "Principles of Safe Lifting"
  },
  {
    id: 75,
    question: "What is the 'Valsalva manoeuvre' and why is it a risk during heavy lifting?",
    options: [
      "A stretching technique that improves flexibility before lifting",
      "Holding the breath while bearing down, which can cause a dangerous rise in blood pressure",
      "A method of gripping loads with the palms facing upward",
      "A communication technique used in team lifting"
    ],
    correctAnswer: 1,
    explanation: "The Valsalva manoeuvre involves holding the breath while bearing down against a closed glottis during heavy exertion. It causes a sudden spike in blood pressure followed by a rapid drop, which can lead to dizziness, fainting, or cardiovascular events.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "Biomechanics of lifting",
    category: "Principles of Safe Lifting"
  },
  {
    id: 76,
    question: "In ergonomic terms, what does the 'moment of force' represent when lifting?",
    options: [
      "The exact second the load leaves the ground",
      "The rotational force around a joint, calculated as force multiplied by the perpendicular distance from the joint",
      "The momentum of the load as it is carried",
      "The time taken to complete one lifting cycle"
    ],
    correctAnswer: 1,
    explanation: "The moment of force (torque) is the rotational force acting around a joint, calculated as the force (weight of load) multiplied by the perpendicular distance from that joint. A larger moment arm (load held further away) creates greater torque on the lumbar spine.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "Biomechanics of lifting",
    category: "Principles of Safe Lifting"
  },
  {
    id: 77,
    question: "When handling loads on stairs, why is it recommended that the person at the lower end bears the greater share of the weight?",
    options: [
      "The person at the lower end is always the stronger worker",
      "Gravity causes the load to shift downwards, so the lower person naturally takes more weight",
      "It is a legal requirement under MHOR 1992",
      "The person at the top needs a free hand for the handrail"
    ],
    correctAnswer: 1,
    explanation: "When carrying loads on stairs, gravity causes the weight to shift towards the lower end. The person at the lower position naturally bears a greater proportion of the load. Both handlers need to be aware of this, and the stronger handler should ideally take the lower position.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "Stairways",
    category: "Principles of Safe Lifting"
  },
  {
    id: 78,
    question: "What effect does twisting combined with lateral bending have on the intervertebral discs during a loaded lift?",
    options: [
      "It strengthens the disc over time",
      "It creates complex combined stresses including compression, shear, and torsion that greatly increase failure risk",
      "It has no additional effect beyond normal compression",
      "It only affects discs in the thoracic region"
    ],
    correctAnswer: 1,
    explanation: "Combining twisting with lateral bending under load creates complex multi-directional stresses on the intervertebral discs including compression, shear, and torsion simultaneously. This combination is particularly dangerous as it can exceed the disc's failure threshold.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "Biomechanics of lifting",
    category: "Principles of Safe Lifting"
  },
  {
    id: 79,
    question: "When pushing a heavy wheeled load over a long distance, what is the physiological concern beyond musculoskeletal injury?",
    options: [
      "There are no concerns beyond musculoskeletal injury",
      "Sustained pushing increases cardiovascular demand and can lead to fatigue, increasing accident risk",
      "Pushing over long distances only affects the arms",
      "It is only a concern if the load weighs more than 500 kg"
    ],
    correctAnswer: 1,
    explanation: "Sustained pushing over long distances significantly increases cardiovascular demand and whole-body fatigue. As the handler fatigues, their technique deteriorates, reaction times slow, and the risk of both musculoskeletal injury and other accidents increases.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "Pushing vs pulling",
    category: "Principles of Safe Lifting"
  },
  {
    id: 80,
    question: "A worker must lift a 15 kg box from floor level to a shelf at 1.8 m. Applying the kinetic lifting technique, at which point during the lift is the compressive force on the L5/S1 disc greatest?",
    options: [
      "When the box is at shoulder height",
      "When the box is at its lowest point and the trunk is most flexed",
      "When the box is at waist height",
      "When the box reaches the shelf at 1.8 m"
    ],
    correctAnswer: 1,
    explanation: "The compressive force on the L5/S1 disc is greatest when the trunk is most flexed (at the lowest point of the lift) because the moment arm is longest. As the handler stands more upright, the moment arm shortens and the compressive force decreases.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "Biomechanics of lifting",
    category: "Principles of Safe Lifting"
  },
  // =======================================================================
  // RISK ASSESSMENT & REDUCTION — first 20 of 40 questions (id 81–100)
  // =======================================================================
  {
    id: 81,
    question: "What is the HSE guideline weight for lifting at waist height close to the body for men?",
    options: [
      "10 kg",
      "16 kg",
      "25 kg",
      "35 kg"
    ],
    correctAnswer: 2,
    explanation: "The HSE guideline weight for men lifting close to the body at waist height (the optimum position) is 25 kg. This is a guideline, not a legal limit, and applies under ideal conditions. The guideline reduces as distance from the body or height above/below waist increases.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Guideline weights",
    category: "Risk Assessment & Reduction"
  },
  {
    id: 82,
    question: "What is the HSE guideline weight for lifting at waist height close to the body for women?",
    options: [
      "10 kg",
      "16 kg",
      "20 kg",
      "25 kg"
    ],
    correctAnswer: 1,
    explanation: "The HSE guideline weight for women lifting close to the body at waist height is 16 kg. Women's guideline weights are approximately two-thirds of the men's guidelines. These figures apply under ideal conditions and must be reduced for adverse factors.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Guideline weights",
    category: "Risk Assessment & Reduction"
  },
  {
    id: 83,
    question: "Which of the following is a mechanical aid that can help reduce manual handling risks?",
    options: [
      "A safety helmet",
      "A sack truck or trolley",
      "A high-visibility vest",
      "A pair of safety glasses"
    ],
    correctAnswer: 1,
    explanation: "A sack truck or trolley is a mechanical aid designed to reduce the need for manual lifting and carrying. Mechanical aids help by supporting the weight of the load and reducing the physical effort required from the handler.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Mechanical aids",
    category: "Risk Assessment & Reduction"
  },
  {
    id: 84,
    question: "What does the HSE MAC tool stand for?",
    options: [
      "Manual Assessment Calculator",
      "Manual Handling Assessment Charts",
      "Mechanical Aid Compliance",
      "Maximum Allowable Capacity"
    ],
    correctAnswer: 1,
    explanation: "MAC stands for Manual Handling Assessment Charts. It is a free HSE tool that helps identify high-risk manual handling activities in the workplace by assessing lifting, carrying, and team handling operations against colour-coded risk bands.",
    section: "Module 3",
    difficulty: "basic",
    topic: "HSE MAC tool",
    category: "Risk Assessment & Reduction"
  },
  {
    id: 85,
    question: "What does RAPP stand for in manual handling risk assessment?",
    options: [
      "Risk Assessment for Pushing and Pulling",
      "Regulations and Practical Procedures",
      "Record All Potential Problems",
      "Reduce All Physical Pressures"
    ],
    correctAnswer: 0,
    explanation: "RAPP stands for Risk Assessment of Pushing and Pulling. It is an HSE tool specifically designed to help assess the risks associated with pushing and pulling operations in the workplace, complementing the MAC tool.",
    section: "Module 3",
    difficulty: "basic",
    topic: "RAPP tool",
    category: "Risk Assessment & Reduction"
  },
  {
    id: 86,
    question: "Which of the following is the most effective way to reduce manual handling risk, according to the hierarchy of controls?",
    options: [
      "Provide personal protective equipment",
      "Provide manual handling training",
      "Eliminate the need for manual handling entirely",
      "Display warning signs about heavy loads"
    ],
    correctAnswer: 2,
    explanation: "According to the hierarchy of controls, the most effective measure is to eliminate the hazardous manual handling operation entirely — for example, by redesigning the process so that loads do not need to be manually moved. This is more effective than PPE, training, or signage.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Designing out manual handling",
    category: "Risk Assessment & Reduction"
  },
  {
    id: 87,
    question: "A pallet truck is an example of which type of manual handling control measure?",
    options: [
      "Administrative control",
      "Personal protective equipment",
      "Engineering control (mechanical aid)",
      "Warning signage"
    ],
    correctAnswer: 2,
    explanation: "A pallet truck is an engineering control — a mechanical aid that reduces the physical effort needed to move heavy palletised loads. Engineering controls are higher in the hierarchy of controls than administrative controls or PPE.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Mechanical aids",
    category: "Risk Assessment & Reduction"
  },
  {
    id: 88,
    question: "When using the TILE framework, which factor would you assess first in most practical situations?",
    options: [
      "The individual's training records",
      "The task — what does it involve and can it be avoided or redesigned?",
      "The load's colour and labelling",
      "The environment's temperature"
    ],
    correctAnswer: 1,
    explanation: "While all TILE factors are important, the task is typically assessed first because understanding what the task involves allows you to determine whether it can be avoided or redesigned. This aligns with the MHOR hierarchy of avoidance first.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "TILE framework in depth",
    category: "Risk Assessment & Reduction"
  },
  {
    id: 89,
    question: "Under the 'Task' element of TILE, which of the following would increase the risk of injury?",
    options: [
      "Short carrying distances",
      "Repetitive lifting combined with twisting",
      "Working at waist height",
      "Handling loads within the power zone"
    ],
    correctAnswer: 1,
    explanation: "Repetitive lifting combined with twisting significantly increases injury risk. The task factors that increase risk include frequent repetition, twisting, bending, reaching, long carrying distances, holding loads away from the body, and insufficient rest periods.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "TILE — Task factors",
    category: "Risk Assessment & Reduction"
  },
  {
    id: 90,
    question: "Under the 'Individual' element of TILE, which of the following personal factors would require a risk assessment adjustment?",
    options: [
      "The worker's favourite colour",
      "The worker is pregnant or has recently given birth",
      "The worker's lunchtime preferences",
      "The worker's commuting distance"
    ],
    correctAnswer: 1,
    explanation: "Pregnancy or recent childbirth is a significant individual factor under TILE. The Management of Health and Safety at Work Regulations 1999 require a specific risk assessment for new or expectant mothers, and manual handling tasks may need to be modified or avoided.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "TILE — Individual factors",
    category: "Risk Assessment & Reduction"
  },
  {
    id: 91,
    question: "The HSE guideline weight for men lifting close to the body at shoulder height is approximately what?",
    options: [
      "5 kg",
      "10 kg",
      "20 kg",
      "25 kg"
    ],
    correctAnswer: 1,
    explanation: "The HSE guideline weight at shoulder height close to the body for men is approximately 10 kg, significantly less than the 25 kg at waist height. This is because the biomechanical disadvantage of lifting at shoulder height places greater stress on the shoulders and spine.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Guideline weights",
    category: "Risk Assessment & Reduction"
  },
  {
    id: 92,
    question: "When conducting a manual handling risk assessment, how should 'Environmental' factors be recorded?",
    options: [
      "They should be ignored if the weather is good",
      "Note floor conditions, space constraints, lighting, temperature, weather, and any obstacles or hazards",
      "Only record the temperature",
      "Only note environmental factors if working outdoors"
    ],
    correctAnswer: 1,
    explanation: "Environmental factors in a risk assessment should include floor conditions (wet, uneven, slippery), available space, lighting levels, temperature and humidity, weather conditions if outdoors, and any obstacles, steps, or changes in floor level.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "TILE — Environment factors",
    category: "Risk Assessment & Reduction"
  },
  {
    id: 93,
    question: "The MAC tool uses a colour-coded system. What does a RED rating indicate?",
    options: [
      "The task is low risk and acceptable",
      "The task requires some improvement",
      "The task is high risk and requires prompt action to reduce the risk",
      "The task has been assessed and approved"
    ],
    correctAnswer: 2,
    explanation: "In the MAC tool's colour-coded system, RED indicates a high level of risk that requires prompt action. Green indicates low risk, amber indicates medium risk requiring improvement, red indicates high risk, and purple indicates very high risk requiring immediate action.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "HSE MAC tool",
    category: "Risk Assessment & Reduction"
  },
  {
    id: 94,
    question: "Which of the following 'Load' factors under TILE would increase handling risk?",
    options: [
      "A compact, lightweight box with integral handles",
      "A well-balanced load clearly marked with its weight",
      "A bulky, unstable load with no handholds and sharp edges",
      "A small, rigid container with a secure lid"
    ],
    correctAnswer: 2,
    explanation: "A bulky, unstable load with no handholds and sharp edges presents multiple increased risk factors: difficulty gripping, unpredictable movement of contents, potential for the handler to adopt poor posture, and risk of cuts from sharp edges.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "TILE — Load factors",
    category: "Risk Assessment & Reduction"
  },
  {
    id: 95,
    question: "What is 'designing out' manual handling?",
    options: [
      "Designing new training courses for staff",
      "Redesigning processes, layouts, or equipment so that hazardous manual handling is eliminated at source",
      "Designing new PPE for manual handling tasks",
      "Drawing diagrams of how to lift correctly"
    ],
    correctAnswer: 1,
    explanation: "Designing out manual handling means redesigning the work process, workplace layout, or equipment so that the need for hazardous manual handling is eliminated at the source. Examples include using conveyors, relocating storage to waist height, or ordering smaller package sizes.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Designing out manual handling",
    category: "Risk Assessment & Reduction"
  },
  {
    id: 96,
    question: "How do the HSE guideline weights change when the load is held at arm's length compared to close to the body?",
    options: [
      "They increase by 50%",
      "They remain the same",
      "They are significantly reduced",
      "They double"
    ],
    correctAnswer: 2,
    explanation: "HSE guideline weights are significantly reduced when the load is held at arm's length rather than close to the body. For example, the men's guideline at waist height drops from 25 kg (close) to 5 kg (at arm's length), reflecting the dramatically increased spinal loading.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Guideline weights",
    category: "Risk Assessment & Reduction"
  },
  {
    id: 97,
    question: "The MAC tool assesses three types of manual handling operation. Which of the following is NOT one of them?",
    options: [
      "Lifting operations",
      "Carrying operations",
      "Typing operations",
      "Team handling operations"
    ],
    correctAnswer: 2,
    explanation: "The MAC tool assesses three types of operation: lifting, carrying, and team handling. Typing is not a manual handling operation and would be assessed under Display Screen Equipment (DSE) regulations, not the MAC tool.",
    section: "Module 3",
    difficulty: "advanced",
    topic: "HSE MAC tool",
    category: "Risk Assessment & Reduction"
  },
  {
    id: 98,
    question: "When applying the HSE guideline weight figures, by what factor should they be reduced if the task involves twisting?",
    options: [
      "No reduction is needed",
      "Reduce by approximately 10%",
      "Reduce by approximately 20%",
      "Reduce by approximately 50%"
    ],
    correctAnswer: 1,
    explanation: "The HSE guidelines state that if the handler twists to the side during the operation, the guideline weight should be reduced by approximately 10%. If the handler twists beyond 45 degrees, a further reduction may be necessary. Twisting significantly increases spinal loading.",
    section: "Module 3",
    difficulty: "advanced",
    topic: "Guideline weights — adjustments",
    category: "Risk Assessment & Reduction"
  },
  {
    id: 99,
    question: "A risk assessment identifies that a manual handling task poses an unacceptable risk but cannot be eliminated. Following the MHOR hierarchy, what is the next step?",
    options: [
      "Accept the risk and issue PPE",
      "Reduce the risk to the lowest level reasonably practicable through engineering controls, task redesign, and training",
      "Stop all operations immediately and permanently",
      "Transfer the risk to the employee via a disclaimer form"
    ],
    correctAnswer: 1,
    explanation: "Following the MHOR hierarchy (avoid, assess, reduce), if the task cannot be avoided, the employer must reduce the risk to the lowest level reasonably practicable. This involves implementing engineering controls, redesigning the task, providing mechanical aids, and ensuring adequate training.",
    section: "Module 3",
    difficulty: "advanced",
    topic: "MHOR hierarchy — risk reduction",
    category: "Risk Assessment & Reduction"
  },
  {
    id: 100,
    question: "When using the RAPP tool to assess a pushing operation, which of the following factors does it specifically evaluate?",
    options: [
      "Only the weight of the load",
      "Floor surface, gradient, force required, handle height, distance, obstructions, and individual capability",
      "Only whether the correct PPE is worn",
      "Only the distance the load must travel"
    ],
    correctAnswer: 1,
    explanation: "The RAPP tool evaluates multiple factors for pushing and pulling operations including floor surface conditions, gradients, the force required to start and sustain movement, handle height and design, travel distance, obstructions, and the handler's individual capability.",
    section: "Module 3",
    difficulty: "advanced",
    topic: "RAPP tool",
    category: "Risk Assessment & Reduction"
  },
  // --- Questions 101-200 continue below ---
// RISK ASSESSMENT & REDUCTION continued — questions 101-120 (Module 3)
{
  id: 101,
  question: "What does the ART tool stand for in the context of manual handling risk assessment?",
  options: ["Assessment of Repetitive Tasks", "Automated Risk Tracking", "Annual Review of Techniques", "Assessment of Related Trauma"],
  correctAnswer: 0,
  explanation: "ART stands for Assessment of Repetitive Tasks. It is an HSE tool designed to help identify and assess the risks associated with repetitive work that may lead to upper limb disorders.",
  section: "Module 3",
  difficulty: "basic",
  topic: "ART Tool",
  category: "Risk Assessment & Reduction"
},
{
  id: 102,
  question: "When using the ART tool, which of the following is NOT one of the main risk factor categories assessed?",
  options: ["Repetition", "Force", "Worker's age", "Posture"],
  correctAnswer: 2,
  explanation: "The ART tool assesses repetition, force, posture, and additional factors such as duration and pace. Worker's age is not a specific risk factor category within the ART assessment, although individual capability is considered separately.",
  section: "Module 3",
  difficulty: "intermediate",
  topic: "ART Tool",
  category: "Risk Assessment & Reduction"
},
{
  id: 103,
  question: "What is the primary purpose of workplace observation during a manual handling risk assessment?",
  options: ["To check workers are wearing correct uniform", "To identify actual handling techniques and conditions in real time", "To time how quickly workers complete tasks", "To assess worker productivity levels"],
  correctAnswer: 1,
  explanation: "Workplace observation allows assessors to see how tasks are actually performed, including postures adopted, loads handled, and environmental conditions. This real-time information is essential for identifying risks that may not be apparent from written procedures alone.",
  section: "Module 3",
  difficulty: "basic",
  topic: "Workplace Observation Techniques",
  category: "Risk Assessment & Reduction"
},
{
  id: 104,
  question: "Why is worker consultation a legal requirement during manual handling risk assessments?",
  options: ["Workers can suggest cheaper equipment", "Workers have first-hand knowledge of the tasks and associated difficulties", "It reduces the employer's insurance premiums", "It satisfies the company's HR department"],
  correctAnswer: 1,
  explanation: "Under the Safety Representatives and Safety Committees Regulations and the Health and Safety (Consultation with Employees) Regulations, employers must consult workers. Workers possess valuable first-hand experience of the tasks, potential hazards, and practical solutions that may not be obvious to assessors.",
  section: "Module 3",
  difficulty: "intermediate",
  topic: "Worker Consultation",
  category: "Risk Assessment & Reduction"
},
{
  id: 105,
  question: "When selecting a mechanical aid for a manual handling task, what is the MOST important factor to consider first?",
  options: ["The cost of the equipment", "Whether the aid matches the specific task requirements and load characteristics", "The colour of the equipment", "Whether the manufacturer is a well-known brand"],
  correctAnswer: 1,
  explanation: "The mechanical aid must be suitable for the specific task, load weight, load shape, and working environment. A mismatched aid can introduce new risks or prove ineffective, potentially making the task more dangerous than manual handling alone.",
  section: "Module 3",
  difficulty: "basic",
  topic: "Mechanical Aid Selection",
  category: "Risk Assessment & Reduction"
},
{
  id: 106,
  question: "A sack truck is most appropriate for which type of load?",
  options: ["Loose sand and gravel", "Stacked boxes or sacks on a flat surface", "Sheets of plasterboard", "Liquid containers without lids"],
  correctAnswer: 1,
  explanation: "Sack trucks are designed for moving stacked, stable loads such as boxes and sacks across flat surfaces. They use a leverage principle to tilt the load onto the truck's wheels, significantly reducing the effort required to transport heavy items over short distances.",
  section: "Module 3",
  difficulty: "basic",
  topic: "Sack Trucks",
  category: "Risk Assessment & Reduction"
},
{
  id: 107,
  question: "What is the main advantage of a pallet truck over a sack truck for warehouse operations?",
  options: ["It is lighter to carry", "It can move palletised loads of much greater weight with minimal effort", "It does not require any training", "It works better on stairs"],
  correctAnswer: 1,
  explanation: "Pallet trucks are designed to lift and transport palletised loads that can weigh several hundred kilograms or more. Their hydraulic lifting mechanism and wide fork design make them far more suitable for heavy, palletised goods than a sack truck, which is intended for smaller, lighter loads.",
  section: "Module 3",
  difficulty: "basic",
  topic: "Pallet Trucks",
  category: "Risk Assessment & Reduction"
},
{
  id: 108,
  question: "In which scenario would a hoist be the most appropriate mechanical aid?",
  options: ["Moving paperwork between offices", "Lifting a heavy transformer to an upper floor where no lift exists", "Carrying hand tools across a building site", "Transporting lightweight cable clips"],
  correctAnswer: 1,
  explanation: "Hoists are designed for lifting heavy loads vertically, making them ideal for raising heavy items like transformers between floors. They provide controlled, mechanical lifting that eliminates the severe musculoskeletal risks associated with manually handling very heavy equipment at height.",
  section: "Module 3",
  difficulty: "intermediate",
  topic: "Hoists",
  category: "Risk Assessment & Reduction"
},
{
  id: 109,
  question: "What is the primary benefit of using a conveyor system in a repetitive manual handling environment?",
  options: ["It makes the workplace look more professional", "It eliminates or significantly reduces the need for carrying loads over distances", "It increases the weight workers can lift", "It removes the need for risk assessments"],
  correctAnswer: 1,
  explanation: "Conveyors transport materials mechanically between workstations or areas, removing the need for workers to carry loads repeatedly over distances. This dramatically reduces cumulative spinal loading, fatigue, and the risk of musculoskeletal disorders associated with repetitive carrying tasks.",
  section: "Module 3",
  difficulty: "intermediate",
  topic: "Conveyors",
  category: "Risk Assessment & Reduction"
},
{
  id: 110,
  question: "A vacuum lifter would be most suitable for handling which type of material?",
  options: ["Loose bricks", "Large, flat, smooth sheets such as glass or metal panels", "Coils of cable", "Bags of cement"],
  correctAnswer: 1,
  explanation: "Vacuum lifters use suction cups to grip smooth, flat surfaces and are ideal for handling large sheets of glass, metal, or similar materials. They allow a single operator to safely manoeuvre heavy sheet materials that would otherwise require multiple workers or risk damage from improper grip.",
  section: "Module 3",
  difficulty: "intermediate",
  topic: "Vacuum Lifters",
  category: "Risk Assessment & Reduction"
},
{
  id: 111,
  question: "In the hierarchy of risk control for manual handling, what should be attempted FIRST?",
  options: ["Provide PPE", "Reduce the risk to the lowest level reasonably practicable", "Eliminate the need for hazardous manual handling entirely", "Train workers to lift correctly"],
  correctAnswer: 2,
  explanation: "The Manual Handling Operations Regulations 1992 require employers to first avoid hazardous manual handling operations so far as is reasonably practicable. Elimination is always the most effective control measure because it removes the risk entirely rather than merely reducing it.",
  section: "Module 3",
  difficulty: "basic",
  topic: "Elimination Strategies",
  category: "Risk Assessment & Reduction"
},
{
  id: 112,
  question: "Which of the following is an example of substitution as a manual handling risk reduction strategy?",
  options: ["Asking workers to lift more carefully", "Replacing 25 kg bags of cement with 15 kg bags", "Providing workers with steel-toe boots", "Increasing the number of tea breaks"],
  correctAnswer: 1,
  explanation: "Substitution involves replacing a hazardous element with a less hazardous alternative. Switching to lighter bags reduces the load weight per lift, directly lowering the biomechanical stress on the spine and reducing the risk of injury without eliminating the task itself.",
  section: "Module 3",
  difficulty: "basic",
  topic: "Substitution",
  category: "Risk Assessment & Reduction"
},
{
  id: 113,
  question: "An employer is considering automating a repetitive packing task. Which factor is LEAST relevant to this decision?",
  options: ["The injury rate associated with the current manual task", "The cost-benefit analysis of automation versus manual handling", "The favourite colour of the production manager", "The technical feasibility of automating the specific movements required"],
  correctAnswer: 2,
  explanation: "Decisions about automation should be based on the current injury risk, financial viability, technical feasibility, and practicability. Personal preferences unrelated to health and safety or operational efficiency have no bearing on a reasoned risk reduction decision.",
  section: "Module 3",
  difficulty: "intermediate",
  topic: "Automation",
  category: "Risk Assessment & Reduction"
},
{
  id: 114,
  question: "How can delivery planning reduce manual handling risks on a construction site?",
  options: ["By ensuring materials are delivered as close as possible to their point of use", "By ordering all materials at once to save on delivery charges", "By requesting deliveries only on Fridays", "By asking the delivery driver to stack everything in one pile"],
  correctAnswer: 0,
  explanation: "Delivering materials close to their point of use minimises the distance workers must carry them, reducing carrying time, fatigue, and the risk of trips or falls while laden. Good delivery planning is one of the most practical and effective ways to reduce manual handling on site.",
  section: "Module 3",
  difficulty: "intermediate",
  topic: "Delivery Planning",
  category: "Risk Assessment & Reduction"
},
{
  id: 115,
  question: "What is the recommended storage height for heavy items in a well-designed storage area?",
  options: ["At floor level to prevent falling", "At waist height to minimise bending and stretching", "At head height for easy visibility", "On the highest shelf to save floor space"],
  correctAnswer: 1,
  explanation: "Storing heavy items at waist height (between knuckle and elbow height) minimises the need for bending or reaching, keeping the load close to the body's centre of gravity. This significantly reduces spinal loading and is a fundamental principle of good storage design.",
  section: "Module 3",
  difficulty: "basic",
  topic: "Storage Design",
  category: "Risk Assessment & Reduction"
},
{
  id: 116,
  question: "When designing a workstation for tasks involving repetitive manual handling, which ergonomic principle is MOST important?",
  options: ["The workstation should be painted in calming colours", "The working height, reach distances, and layout should suit the range of workers using it", "The workstation should be as large as possible", "Workers should stand at all times to maintain alertness"],
  correctAnswer: 1,
  explanation: "Ergonomic workstation design must accommodate the range of workers who will use it, with adjustable heights and appropriate reach distances. A well-designed workstation reduces awkward postures, excessive reaching, and unnecessary bending, all of which contribute to musculoskeletal disorders.",
  section: "Module 3",
  difficulty: "intermediate",
  topic: "Workstation Design",
  category: "Risk Assessment & Reduction"
},
{
  id: 117,
  question: "During an ART assessment, a task scores in the 'red zone' for force. What does this indicate?",
  options: ["The task is safe and requires no further action", "The force demands are high and the task requires urgent action to reduce risk", "The worker needs to apply more force", "The assessment needs to be repeated next year"],
  correctAnswer: 1,
  explanation: "A red zone score in the ART tool indicates a high level of risk that requires urgent action. The employer should prioritise reducing the force demands of the task through redesign, mechanical aids, or other control measures as soon as reasonably practicable.",
  section: "Module 3",
  difficulty: "advanced",
  topic: "ART Tool",
  category: "Risk Assessment & Reduction"
},
{
  id: 118,
  question: "An assessor notices that workers have developed their own informal method for a manual handling task that differs from the written procedure. What should the assessor do?",
  options: ["Immediately discipline the workers", "Investigate why the deviation occurs, as it may reveal a flaw in the original procedure or unassessed risks", "Ignore it as long as no one has been injured", "Report the workers to the HSE"],
  correctAnswer: 1,
  explanation: "Workers often adapt their methods in response to practical difficulties with prescribed procedures. Investigating the deviation may reveal that the original procedure is impractical, uncomfortable, or does not account for real working conditions, providing valuable information for improving the risk assessment.",
  section: "Module 3",
  difficulty: "advanced",
  topic: "Workplace Observation Techniques",
  category: "Risk Assessment & Reduction"
},
{
  id: 119,
  question: "A risk assessment identifies that a manual handling task cannot be eliminated. What is the next step in the hierarchy?",
  options: ["Accept the risk and do nothing further", "Assess the task and reduce the risk to the lowest level reasonably practicable", "Immediately stop all work until a perfect solution is found", "Transfer the risk to a subcontractor"],
  correctAnswer: 1,
  explanation: "Where hazardous manual handling cannot be avoided, the MHOR 1992 require employers to make a suitable and sufficient assessment of the risk and then reduce it to the lowest level reasonably practicable. This may involve mechanical aids, task redesign, training, or a combination of measures.",
  section: "Module 3",
  difficulty: "intermediate",
  topic: "Elimination Strategies",
  category: "Risk Assessment & Reduction"
},
{
  id: 120,
  question: "A warehouse has introduced roller conveyors, lighter packaging, and adjustable-height workbenches but the residual risk is still not zero. What additional measure completes the hierarchy?",
  options: ["Accept that some risk always remains and do nothing more", "Provide workers with information, instruction, and training on the remaining risks and correct techniques", "Remove all manual handling tasks from the business entirely", "Hire younger, stronger workers"],
  correctAnswer: 1,
  explanation: "The final tier of the MHOR hierarchy is to provide information and training about residual risks and correct handling techniques. Even after engineering and organisational controls, workers need to understand the remaining hazards and how to handle loads safely to minimise their personal risk.",
  section: "Module 3",
  difficulty: "advanced",
  topic: "Mechanical Aid Selection",
  category: "Risk Assessment & Reduction"
},

// WORKPLACE-SPECIFIC HANDLING — questions 121-160 (Module 4)
{
  id: 121,
  question: "What is the approximate weight of a standard 500-metre drum of 2.5 mm twin and earth cable?",
  options: ["5 kg", "17-20 kg", "50 kg", "100 kg"],
  correctAnswer: 1,
  explanation: "A 500-metre drum of 2.5 mm twin and earth cable typically weighs between 17 and 20 kg. While this is within the guideline weight for some workers, the awkward shape and size of the drum mean that manual handling risk assessments should still consider the grip, posture, and carrying distance involved.",
  section: "Module 4",
  difficulty: "basic",
  topic: "Cable Drums",
  category: "Workplace-Specific Handling"
},
{
  id: 122,
  question: "What is a drum jack primarily used for?",
  options: ["Lifting a cable drum off the ground so it can rotate freely for cable dispensing", "Cutting cables to length", "Testing the insulation resistance of cables", "Securing drums during transport in a vehicle"],
  correctAnswer: 0,
  explanation: "A drum jack (or cable drum stand) lifts a cable drum off the ground and supports it on an axle, allowing the drum to spin freely. This enables controlled cable dispensing without the need to manually lift and unwind the cable, significantly reducing manual handling effort.",
  section: "Module 4",
  difficulty: "basic",
  topic: "Cable Drums",
  category: "Workplace-Specific Handling"
},
{
  id: 123,
  question: "When rolling a large cable drum across a site, what is the safest technique?",
  options: ["Kick it with your foot to get it moving", "Push it with straight arms at the mid-point of the drum, controlling speed and direction, with a clear path ahead", "Roll it as fast as possible to reduce effort", "Pull it towards you using a rope tied to the top"],
  correctAnswer: 1,
  explanation: "Rolling a cable drum should be controlled by pushing at the mid-point with straight arms, maintaining a steady pace. The route must be checked in advance for obstacles, slopes, and other workers. Uncontrolled rolling or kicking creates serious risk of crush injuries to feet and hands.",
  section: "Module 4",
  difficulty: "intermediate",
  topic: "Cable Drums",
  category: "Workplace-Specific Handling"
},
{
  id: 124,
  question: "Cable tray lengths are typically 3 metres long. What is the main manual handling risk when carrying them?",
  options: ["They are too heavy for one person", "Their length makes them unwieldy, creating risks of striking people or objects and difficulty controlling the load", "They are sharp enough to cut through gloves", "They generate static electricity"],
  correctAnswer: 1,
  explanation: "At 3 metres, cable tray lengths are classified as long loads. The primary risk is the difficulty in controlling the far end, which may swing into other workers, strike obstacles, or catch on structures. Team handling with coordinated communication is essential for long load management.",
  section: "Module 4",
  difficulty: "basic",
  topic: "Cable Trays and Trunking",
  category: "Workplace-Specific Handling"
},
{
  id: 125,
  question: "When a team is carrying a long length of cable trunking, what is the most important safety measure?",
  options: ["Everyone should wear hard hats", "One person should be designated as the coordinator, giving clear verbal commands", "The strongest person should carry the heaviest end", "They should carry it above head height to avoid obstacles"],
  correctAnswer: 1,
  explanation: "Team handling of long loads requires a designated coordinator who gives clear commands for lifting, moving, stopping, and lowering. Without coordination, team members may act independently, causing uneven loading, loss of control, or unexpected movements that can lead to injuries.",
  section: "Module 4",
  difficulty: "intermediate",
  topic: "Cable Trays and Trunking",
  category: "Workplace-Specific Handling"
},
{
  id: 126,
  question: "What additional risk exists when mounting a distribution board at height?",
  options: ["The board may short-circuit during installation", "The combination of working at height and handling a heavy, bulky item significantly increases fall and drop risks", "Distribution boards are always too heavy to lift", "The board must be energised before mounting"],
  correctAnswer: 1,
  explanation: "Mounting distribution boards at height combines two significant hazards: working at height and manual handling of a heavy, bulky object. The worker's balance is compromised while handling the load, and dropping the board creates a risk to anyone below. Mechanical lifting aids or team lifts with proper platform access should be used.",
  section: "Module 4",
  difficulty: "intermediate",
  topic: "Distribution Boards",
  category: "Workplace-Specific Handling"
},
{
  id: 127,
  question: "Why should transformers ALWAYS be moved using mechanical aids rather than manual lifting?",
  options: ["They contain hazardous chemicals", "Their weight typically exceeds safe manual handling limits and their compact, dense construction makes grip difficult", "They must remain perfectly level at all times", "Manual handling voids the manufacturer's warranty"],
  correctAnswer: 1,
  explanation: "Transformers are extremely heavy relative to their size due to their iron core and copper windings. Even small transformers can weigh well over 50 kg, far exceeding guideline weights. Their compact, dense construction also makes them difficult to grip securely, compounding the risk of musculoskeletal injury.",
  section: "Module 4",
  difficulty: "basic",
  topic: "Transformers",
  category: "Workplace-Specific Handling"
},
{
  id: 128,
  question: "How does uneven ground on a construction site increase manual handling risk?",
  options: ["It makes loads heavier", "It compromises balance and stability, increases the risk of trips and falls while carrying loads, and forces awkward postures", "It has no significant effect if the worker is experienced", "It only affects wheeled equipment, not manual carrying"],
  correctAnswer: 1,
  explanation: "Uneven ground destabilises the handler, forcing compensatory postures that increase spinal loading. The risk of tripping while carrying a load is significantly higher on rough terrain, and a fall while laden can cause far more severe injuries than a fall without a load.",
  section: "Module 4",
  difficulty: "basic",
  topic: "Construction Site Conditions",
  category: "Workplace-Specific Handling"
},
{
  id: 129,
  question: "What effect do wet conditions on site have on manual handling operations?",
  options: ["They make loads lighter due to lubrication", "They reduce grip on loads and underfoot surfaces, increasing the risk of slips and dropped loads", "They have no effect if waterproof gloves are worn", "They only affect outdoor operations, not indoor ones"],
  correctAnswer: 1,
  explanation: "Wet conditions reduce friction on both load surfaces and underfoot, making it harder to maintain a secure grip and stable footing. Wet loads can also be heavier than dry ones if they absorb water. Risk assessments must account for weather conditions on outdoor sites.",
  section: "Module 4",
  difficulty: "intermediate",
  topic: "Construction Site Conditions",
  category: "Workplace-Specific Handling"
},
{
  id: 130,
  question: "Why must wind conditions be considered during manual handling of large, flat items such as sheet materials?",
  options: ["Wind cools the worker down too quickly", "Large flat items act as sails, making them extremely difficult to control and creating a risk of the handler being pulled off balance", "Wind only matters if it is raining at the same time", "Wind reduces the weight of the load"],
  correctAnswer: 1,
  explanation: "Sheet materials such as plywood or plasterboard have a large surface area that catches the wind, creating significant and unpredictable forces. A sudden gust can wrench the load from a worker's grip or pull them off balance, particularly when working at height on scaffolding or roofs.",
  section: "Module 4",
  difficulty: "intermediate",
  topic: "Construction Site Conditions",
  category: "Workplace-Specific Handling"
},
{
  id: 131,
  question: "By what percentage can wearing standard work gloves reduce grip strength?",
  options: ["5-10%", "20-30%", "50-60%", "Less than 1%"],
  correctAnswer: 1,
  explanation: "Standard work gloves typically reduce grip strength by 20-30%, depending on the type and thickness. This reduction must be factored into manual handling risk assessments, as it effectively increases the difficulty of gripping and controlling loads, particularly smooth or heavy items.",
  section: "Module 4",
  difficulty: "intermediate",
  topic: "PPE Constraints",
  category: "Workplace-Specific Handling"
},
{
  id: 132,
  question: "What is the main challenge of manual handling on scaffold platforms?",
  options: ["Scaffolding is always too hot to work on", "Restricted space limits posture options, guardrails restrict movement, and platform bounce affects stability", "Scaffold boards are too slippery for any manual handling", "All loads must be passed up by hand on scaffolding"],
  correctAnswer: 1,
  explanation: "Scaffold platforms offer limited space, restricting the handler's ability to adopt correct postures. Guardrails, while essential for fall prevention, can obstruct load movement. Platform flex or bounce when walking with loads further compromises balance and increases the risk of trips and falls.",
  section: "Module 4",
  difficulty: "intermediate",
  topic: "Scaffold Platform Handling",
  category: "Workplace-Specific Handling"
},
{
  id: 133,
  question: "When working in a loft space with limited headroom, what is the primary manual handling concern?",
  options: ["The temperature is always too high", "The inability to stand upright forces stooped or kneeling postures, dramatically increasing spinal loading", "Loft spaces are always too dark to see", "Insulation materials are too light to cause injury"],
  correctAnswer: 1,
  explanation: "Low headroom in loft spaces prevents workers from standing upright, forcing them into stooped, crouched, or kneeling postures. These postures massively increase the compressive and shear forces on the lumbar spine, making even light loads potentially hazardous to handle.",
  section: "Module 4",
  difficulty: "intermediate",
  topic: "Loft and Roof Spaces",
  category: "Workplace-Specific Handling"
},
{
  id: 134,
  question: "What specific hazard exists when handling materials in ceiling voids?",
  options: ["Ceiling voids are always contaminated with asbestos", "Working above head height with restricted access means loads must be pushed up and manoeuvred in confined space, with risk of falling debris", "There are no specific hazards beyond normal handling", "Ceiling voids are always well-lit and spacious"],
  correctAnswer: 1,
  explanation: "Ceiling voids require workers to lift loads above head height through restricted access points, then manoeuvre them in confined spaces while potentially balancing on steps or platforms. The risk of dropped materials, awkward sustained postures, and falling debris onto workers below must all be assessed.",
  section: "Module 4",
  difficulty: "intermediate",
  topic: "Ceiling Voids",
  category: "Workplace-Specific Handling"
},
{
  id: 135,
  question: "When handling materials in an under-floor crawl space, which posture-related risk is MOST significant?",
  options: ["Standing for too long", "Prolonged crawling, lying, and dragging loads in extremely restricted space, with no ability to use normal lifting techniques", "Working with arms above shoulder height", "Twisting while standing upright"],
  correctAnswer: 1,
  explanation: "Under-floor crawl spaces are among the most challenging environments for manual handling. Workers cannot stand, kneel, or even crouch properly, forcing them to lie flat and drag loads. Normal lifting technique is impossible, and the confined space severely limits the use of mechanical aids.",
  section: "Module 4",
  difficulty: "advanced",
  topic: "Under-Floor Crawl Spaces",
  category: "Workplace-Specific Handling"
},
{
  id: 136,
  question: "What is the purpose of a rope and pulley system in a building riser?",
  options: ["To provide emergency escape routes", "To lift materials vertically through the riser shaft, avoiding the need to carry heavy items up ladders or stairs", "To secure cable trays to the wall", "To measure the height of the riser"],
  correctAnswer: 1,
  explanation: "Rope and pulley systems in risers allow materials and equipment to be raised or lowered vertically through the shaft mechanically. This avoids the extremely hazardous practice of carrying heavy items up ladders within the confined space of a riser, reducing both manual handling and fall risks.",
  section: "Module 4",
  difficulty: "basic",
  topic: "Risers",
  category: "Workplace-Specific Handling"
},
{
  id: 137,
  question: "What does the acronym RSI stand for in the context of workplace injuries?",
  options: ["Risk Safety Indicator", "Repetitive Strain Injury", "Routine Safety Inspection", "Recorded Site Incident"],
  correctAnswer: 1,
  explanation: "RSI stands for Repetitive Strain Injury, a general term for pain and damage caused by repetitive movement and overuse of a particular body part. In manual handling, RSI commonly affects the hands, wrists, forearms, elbows, and shoulders of workers performing repetitive tasks.",
  section: "Module 4",
  difficulty: "basic",
  topic: "Repetitive Strain",
  category: "Workplace-Specific Handling"
},
{
  id: 138,
  question: "What does WRULD stand for?",
  options: ["Workplace Risk and Upper Limb Diagnosis", "Work-Related Upper Limb Disorder", "Written Report on Unsafe Lifting and Dragging", "Worker Rehabilitation and Upper Limb Development"],
  correctAnswer: 1,
  explanation: "WRULD stands for Work-Related Upper Limb Disorder. It is the more precise medical and legal term for conditions commonly grouped under RSI, encompassing specific diagnoses such as carpal tunnel syndrome, tennis elbow, and tenosynovitis caused by work activities.",
  section: "Module 4",
  difficulty: "basic",
  topic: "Repetitive Strain",
  category: "Workplace-Specific Handling"
},
{
  id: 139,
  question: "How does cumulative spinal loading differ from a single traumatic injury?",
  options: ["It doesn't differ — all back injuries happen in a single moment", "Cumulative loading causes gradual damage over weeks, months, or years through repeated sub-maximal forces, rather than a single overload event", "Cumulative loading only affects the neck, not the lower back", "Cumulative loading is less serious than a single injury"],
  correctAnswer: 1,
  explanation: "Cumulative spinal loading occurs when repeated manual handling tasks, none individually harmful, progressively damage spinal structures over time. Unlike acute traumatic injuries from a single heavy lift, cumulative damage develops gradually and may not become symptomatic until significant degeneration has occurred.",
  section: "Module 4",
  difficulty: "intermediate",
  topic: "Cumulative Spinal Loading",
  category: "Workplace-Specific Handling"
},
{
  id: 140,
  question: "Which of the following is the BEST example of fatigue management in a manual handling context?",
  options: ["Allowing workers unlimited overtime to finish the job faster", "Scheduling regular rest breaks, varying tasks throughout the shift, and monitoring workload to prevent overexertion", "Providing energy drinks at the start of each shift", "Telling workers to push through tiredness to build stamina"],
  correctAnswer: 1,
  explanation: "Effective fatigue management combines scheduled rest breaks, task variation, and workload monitoring. Fatigued muscles provide less support to the spine and joints, grip strength decreases, and reaction times slow — all of which significantly increase the risk of manual handling injuries.",
  section: "Module 4",
  difficulty: "intermediate",
  topic: "Fatigue Management",
  category: "Workplace-Specific Handling"
},
{
  id: 141,
  question: "What is the purpose of job rotation in reducing manual handling injury risk?",
  options: ["To ensure all workers can do every job for efficiency", "To vary the physical demands on different muscle groups, reducing cumulative loading on any single body area", "To keep workers from getting bored", "To reduce the need for training on specific tasks"],
  correctAnswer: 1,
  explanation: "Job rotation distributes the physical demands across different muscle groups and body areas throughout the working day. By alternating between tasks with different physical requirements, no single body structure is subjected to prolonged repetitive loading, reducing the cumulative risk of musculoskeletal disorders.",
  section: "Module 4",
  difficulty: "intermediate",
  topic: "Job Rotation",
  category: "Workplace-Specific Handling"
},
{
  id: 142,
  question: "How frequently should micro-breaks be taken during sustained manual handling work?",
  options: ["Once per day at lunchtime", "Every 20-30 minutes, lasting 30 seconds to 2 minutes, involving stretching or posture change", "Only when pain is felt", "Every 4 hours as required by law"],
  correctAnswer: 1,
  explanation: "Micro-breaks of 30 seconds to 2 minutes every 20-30 minutes allow muscles and soft tissues to recover from sustained loading. Research shows that frequent short breaks are more effective at reducing fatigue and injury risk than infrequent longer breaks during physically demanding manual handling work.",
  section: "Module 4",
  difficulty: "intermediate",
  topic: "Micro-Breaks",
  category: "Workplace-Specific Handling"
},
{
  id: 143,
  question: "What is the benefit of warm-up stretching before manual handling tasks?",
  options: ["It has no proven benefit and wastes time", "It increases blood flow to muscles, improves flexibility, and prepares soft tissues for physical demands, reducing injury risk", "It only benefits younger workers", "It is a legal requirement under MHOR 1992"],
  correctAnswer: 1,
  explanation: "Warm-up stretching increases blood flow to muscles and tendons, raises tissue temperature, and improves joint range of motion. This preparation helps muscles respond more effectively to the demands of manual handling, reducing the likelihood of strains, sprains, and other soft tissue injuries.",
  section: "Module 4",
  difficulty: "basic",
  topic: "Warm-Up Stretching",
  category: "Workplace-Specific Handling"
},
{
  id: 144,
  question: "A team of three electricians needs to carry a 4-metre length of heavy cable tray up a staircase. What is the correct approach?",
  options: ["One person carries it alone to avoid coordination problems", "The team leader assigns positions, the person at the top bears more weight, and clear commands are used throughout with the route checked beforehand", "They should throw it up the stairwell from the bottom", "They should cut it into small pieces first"],
  correctAnswer: 1,
  explanation: "Team carrying on stairs requires careful planning: positions assigned based on strength, the higher person bearing more weight due to the angle, clear verbal commands for every stage, and a pre-checked route. The angled load and restricted space of stairways make coordination absolutely critical for safety.",
  section: "Module 4",
  difficulty: "advanced",
  topic: "Cable Trays and Trunking",
  category: "Workplace-Specific Handling"
},
{
  id: 145,
  question: "What weight can a large 1000-metre drum of armoured cable typically reach?",
  options: ["10-15 kg", "30-40 kg", "Over 100 kg", "Over 500 kg"],
  correctAnswer: 2,
  explanation: "Large drums of armoured cable can easily exceed 100 kg, with some reaching several hundred kilograms. These drums must always be moved using mechanical aids such as drum trolleys, pallet trucks, or forklifts. Manual rolling may be acceptable for positioning but manual lifting is never appropriate.",
  section: "Module 4",
  difficulty: "basic",
  topic: "Cable Drums",
  category: "Workplace-Specific Handling"
},
{
  id: 146,
  question: "When installing cable tray at height, what should be done to reduce manual handling risk?",
  options: ["Carry the full length up a ladder balanced on one shoulder", "Use a mobile elevated work platform (MEWP) with materials pre-loaded, or lift sections with a rope and pulley to the installation height", "Have a colleague at the bottom throw sections up one at a time", "Install everything from ground level and raise the completed tray afterwards"],
  correctAnswer: 1,
  explanation: "Using a MEWP with pre-loaded materials or a rope and pulley system to raise sections avoids the extremely hazardous practice of carrying long, heavy lengths up ladders. This approach eliminates the dual risk of working at height while handling unwieldy loads with compromised grip and balance.",
  section: "Module 4",
  difficulty: "intermediate",
  topic: "Cable Trays and Trunking",
  category: "Workplace-Specific Handling"
},
{
  id: 147,
  question: "Why is handling materials on a roof particularly hazardous on windy days?",
  options: ["Wind makes materials heavier", "Wind can catch flat materials acting as sails, destabilising the handler near unprotected edges, with potential for fatal falls", "Wind only affects paper-based materials", "Windy conditions are only a concern above 50 mph"],
  correctAnswer: 1,
  explanation: "On roofs, wind forces on sheet materials can pull handlers off balance near edges where fall protection may be limited. The combination of height, wind loading on materials, and restricted movement space creates a potentially fatal hazard. Work with large flat materials should be suspended in high winds.",
  section: "Module 4",
  difficulty: "advanced",
  topic: "Loft and Roof Spaces",
  category: "Workplace-Specific Handling"
},
{
  id: 148,
  question: "How should a heavy distribution board be lifted into position on a wall?",
  options: ["Two workers should hold it while a third screws it in", "A temporary support bracket, mechanical lifter, or proprietary mounting aid should be used to take the weight while fixings are secured", "One strong worker should hold it overhead while fixings are made", "It should be glued to the wall with construction adhesive"],
  correctAnswer: 1,
  explanation: "Heavy distribution boards should never be held manually in position while being fixed. Temporary support brackets, mechanical lifters, or proprietary mounting aids take the weight of the board, allowing fixers to work safely without sustaining prolonged static loading in awkward overhead postures.",
  section: "Module 4",
  difficulty: "intermediate",
  topic: "Distribution Boards",
  category: "Workplace-Specific Handling"
},
{
  id: 149,
  question: "What is the primary risk associated with using a sack truck on a slope?",
  options: ["The wheels may leave marks on the floor", "The load can shift or the truck can run away if the handler loses control, particularly going downhill", "Sack trucks cannot be used on slopes under any circumstances", "The load becomes lighter on a slope"],
  correctAnswer: 1,
  explanation: "On slopes, gravity acts on the loaded sack truck, increasing the force required to control it going uphill and creating a runaway risk going downhill. If the handler loses control, the heavy loaded truck can accelerate rapidly, causing crush or impact injuries to the handler or bystanders.",
  section: "Module 4",
  difficulty: "intermediate",
  topic: "Cable Drums",
  category: "Workplace-Specific Handling"
},
{
  id: 150,
  question: "An electrician needs to pull cable through a ceiling void while lying on a platform between joists. Which risk factor is most elevated?",
  options: ["Noise exposure", "Static posture with pulling force applied in a confined space, with no ability to use legs or core effectively", "Exposure to UV radiation", "Risk of electric shock from the cable being pulled"],
  correctAnswer: 1,
  explanation: "Pulling cable while lying in a ceiling void forces the worker to generate all pulling force from the arms and shoulders without the support of the legs or core. This sustained static posture combined with repetitive pulling dramatically increases the risk of shoulder, back, and upper limb injuries.",
  section: "Module 4",
  difficulty: "advanced",
  topic: "Ceiling Voids",
  category: "Workplace-Specific Handling"
},
{
  id: 151,
  question: "What is the recommended approach for moving materials through an under-floor crawl space with less than 600 mm headroom?",
  options: ["Use normal lifting techniques but work faster", "Use a drag sheet or low-profile trolley, pushing materials ahead of you rather than carrying them, and minimise the quantity moved at any one time", "Carry as much as possible in each trip to reduce the number of journeys", "Stand up as much as possible to protect your back"],
  correctAnswer: 1,
  explanation: "In spaces under 600 mm, normal manual handling techniques are impossible. Drag sheets or low-profile trolleys reduce friction when sliding materials. Pushing loads ahead minimises awkward pulling postures. Limiting load quantity per trip reduces the cumulative strain on the body in these extreme conditions.",
  section: "Module 4",
  difficulty: "advanced",
  topic: "Under-Floor Crawl Spaces",
  category: "Workplace-Specific Handling"
},
{
  id: 152,
  question: "When using a rope and pulley in a riser, what must be ensured before lifting begins?",
  options: ["The rope matches the company's brand colours", "The pulley is securely anchored, the rope is rated for the load weight, the area below is barriered off, and a banksman directs the operation", "Only that the rope looks strong enough", "Nothing special — rope and pulley systems are inherently safe"],
  correctAnswer: 1,
  explanation: "Safe use of rope and pulley systems requires the pulley to be securely fixed to a structural element, the rope rated for the intended load, the area below barriered to protect from falling objects, and a banksman to coordinate the lift. Failure in any element could result in serious injury from falling loads.",
  section: "Module 4",
  difficulty: "advanced",
  topic: "Risers",
  category: "Workplace-Specific Handling"
},
{
  id: 153,
  question: "How does wearing a full body harness affect manual handling capability?",
  options: ["It has no effect on handling ability", "It restricts trunk movement, adds weight, and can interfere with grip positioning and load handling close to the body", "It improves handling by providing back support", "It only affects handling when working at ground level"],
  correctAnswer: 1,
  explanation: "Full body harnesses restrict trunk flexion and rotation, making it harder to adopt correct lifting postures. The harness webbing and attachment points add bulk that prevents loads being held close to the body, and the additional weight of the harness itself adds to the overall physical burden.",
  section: "Module 4",
  difficulty: "intermediate",
  topic: "PPE Constraints",
  category: "Workplace-Specific Handling"
},
{
  id: 154,
  question: "What specific challenge does scaffold board flex present during manual handling?",
  options: ["Boards are too rigid to cause any problem", "The bouncing motion destabilises the handler, requiring constant balance adjustments that increase muscle fatigue and injury risk", "Board flex only occurs on aluminium scaffolding", "Flex makes walking easier because it absorbs shock"],
  correctAnswer: 1,
  explanation: "Scaffold boards flex under load, creating a bouncing motion as workers walk across them. When carrying heavy items, this bounce requires continuous balance corrections from the core and leg muscles, increasing fatigue and the risk of stumbling. The unpredictable surface movement compounds the difficulty of controlling a load.",
  section: "Module 4",
  difficulty: "advanced",
  topic: "Scaffold Platform Handling",
  category: "Workplace-Specific Handling"
},
{
  id: 155,
  question: "Why is it important to vary manual handling tasks throughout a shift rather than performing the same task continuously?",
  options: ["It prevents workers from becoming too skilled at one task", "Continuous repetitive loading on the same structures exceeds tissue recovery rates, leading to cumulative micro-damage and eventual injury", "Variety makes the day more interesting but has no physical benefit", "It is only important for workers under 25"],
  correctAnswer: 1,
  explanation: "When the same structures are loaded repeatedly without adequate recovery time, micro-damage accumulates faster than the body can repair it. Task variation distributes loading across different structures, allowing previously stressed tissues to recover while other areas work, significantly reducing cumulative injury risk.",
  section: "Module 4",
  difficulty: "intermediate",
  topic: "Job Rotation",
  category: "Workplace-Specific Handling"
},
{
  id: 156,
  question: "An electrician reports tingling and numbness in their fingers after a week of repetitive cable stripping. What should the employer do FIRST?",
  options: ["Tell them to wear thicker gloves", "Investigate the task, review the risk assessment, consider the symptoms as a potential early sign of a WRULD, and refer the worker for occupational health assessment", "Wait to see if symptoms resolve over the weekend", "Move the worker to a heavier manual handling task instead"],
  correctAnswer: 1,
  explanation: "Tingling and numbness are early warning signs of upper limb disorders such as carpal tunnel syndrome. Early investigation and intervention is critical because WRULDs caught early respond much better to treatment and workplace modifications than conditions allowed to progress to chronic stages.",
  section: "Module 4",
  difficulty: "intermediate",
  topic: "Repetitive Strain",
  category: "Workplace-Specific Handling"
},
{
  id: 157,
  question: "What type of mechanical aid is most appropriate for positioning a heavy transformer on a concrete plinth?",
  options: ["A sack truck", "A crane, chain block, or hydraulic gantry rated for the transformer's weight", "A wheelbarrow", "Manual lifting by four workers"],
  correctAnswer: 1,
  explanation: "Transformers are typically far too heavy for any manual handling method. A crane, chain block, or hydraulic gantry system rated for the specific weight is required. The aid must be capable of precise positioning as well as lifting, since transformers must be placed accurately on their mounting plinths.",
  section: "Module 4",
  difficulty: "basic",
  topic: "Transformers",
  category: "Workplace-Specific Handling"
},
{
  id: 158,
  question: "What is the effect of muddy ground conditions on wheeled manual handling aids such as pallet trucks?",
  options: ["Mud has no effect on wheeled aids", "Wheels can sink, stick, or lose traction in mud, dramatically increasing the pushing force required and the risk of musculoskeletal injury", "Muddy conditions make wheels roll more smoothly", "Pallet trucks are designed to work in all ground conditions"],
  correctAnswer: 1,
  explanation: "Mud increases rolling resistance dramatically, meaning workers must push much harder to move wheeled aids. Small wheels sink into soft ground, and directional control becomes difficult. The increased pushing force can exceed safe limits, and the sudden release if wheels break free can cause back injuries.",
  section: "Module 4",
  difficulty: "intermediate",
  topic: "Construction Site Conditions",
  category: "Workplace-Specific Handling"
},
{
  id: 159,
  question: "How should heavy materials be passed between scaffold lifts (levels)?",
  options: ["Thrown from one level to the next", "Using a gin wheel, material hoist, or crane to lift materials mechanically between levels, with the receiving area clear and workers clear of the load path", "Carried up the scaffold ladder by individual workers", "Stacked on the scaffold and pushed up as a single block"],
  correctAnswer: 1,
  explanation: "Mechanical means such as gin wheels, material hoists, or cranes should be used to transfer heavy materials between scaffold levels. The receiving area must be clear, and workers must stand clear of the load path. Throwing creates strike-injury risks, and ladder carrying combines fall and manual handling hazards.",
  section: "Module 4",
  difficulty: "basic",
  topic: "Scaffold Platform Handling",
  category: "Workplace-Specific Handling"
},
{
  id: 160,
  question: "An electrician must install conduit in a roof space with only 1.2 metres of headroom. What combination of controls best manages the manual handling risk?",
  options: ["No special measures needed — 1.2 m is sufficient headroom", "Use shorter conduit sections to reduce load length, knee pads for joint protection, frequent micro-breaks, and pre-position materials at the access point to minimise carrying distance in the restricted space", "Work faster to spend less time in the space", "Only send workers under 1.2 m tall into the space"],
  correctAnswer: 1,
  explanation: "A multi-faceted approach addresses the multiple risk factors: shorter sections are easier to manoeuvre in restricted space, knee pads protect joints from hard surfaces, micro-breaks combat the increased fatigue from stooped postures, and pre-positioning materials minimises the distance loads are carried in the compromised posture.",
  section: "Module 4",
  difficulty: "advanced",
  topic: "Loft and Roof Spaces",
  category: "Workplace-Specific Handling"
},

// HEALTH, WELFARE & RESPONSIBILITIES — questions 161-200 (Module 5)
{
  id: 161,
  question: "What does MSD stand for in the context of workplace health?",
  options: ["Manual Safety Directive", "Musculoskeletal Disorder", "Material Storage Document", "Maintenance Schedule Database"],
  correctAnswer: 1,
  explanation: "MSD stands for Musculoskeletal Disorder, which is a collective term for conditions affecting the muscles, tendons, ligaments, nerves, joints, and spinal discs. MSDs are the most common type of occupational ill health in the UK and are frequently associated with manual handling activities.",
  section: "Module 5",
  difficulty: "basic",
  topic: "MSDs",
  category: "Health, Welfare & Responsibilities"
},
{
  id: 162,
  question: "Which of the following is NOT a common type of musculoskeletal disorder associated with manual handling?",
  options: ["Lower back pain", "Carpal tunnel syndrome", "Appendicitis", "Tennis elbow"],
  correctAnswer: 2,
  explanation: "Appendicitis is an inflammation of the appendix and is not related to manual handling or musculoskeletal strain. Lower back pain, carpal tunnel syndrome, and tennis elbow are all well-established MSDs that can be caused or aggravated by manual handling activities.",
  section: "Module 5",
  difficulty: "basic",
  topic: "MSDs",
  category: "Health, Welfare & Responsibilities"
},
{
  id: 163,
  question: "What is carpal tunnel syndrome?",
  options: ["A fracture of the wrist bones", "Compression of the median nerve in the wrist causing pain, numbness, and tingling in the hand and fingers", "A type of skin condition affecting the palms", "An infection of the finger joints"],
  correctAnswer: 1,
  explanation: "Carpal tunnel syndrome occurs when the median nerve is compressed as it passes through the carpal tunnel in the wrist. Symptoms include pain, numbness, tingling, and weakness in the thumb, index, and middle fingers. Repetitive gripping, vibration, and forceful hand movements are common workplace causes.",
  section: "Module 5",
  difficulty: "intermediate",
  topic: "MSDs",
  category: "Health, Welfare & Responsibilities"
},
{
  id: 164,
  question: "What is the common name for lateral epicondylitis, a condition associated with repetitive gripping and twisting?",
  options: ["Golfer's elbow", "Tennis elbow", "Housemaid's knee", "Trigger finger"],
  correctAnswer: 1,
  explanation: "Tennis elbow (lateral epicondylitis) involves inflammation of the tendons on the outside of the elbow, caused by repetitive gripping, twisting, and lifting movements. Despite its name, it is extremely common in manual workers, particularly those who repeatedly grip tools or handle loads with a twisting motion.",
  section: "Module 5",
  difficulty: "basic",
  topic: "MSDs",
  category: "Health, Welfare & Responsibilities"
},
{
  id: 165,
  question: "What is shoulder impingement syndrome?",
  options: ["A dislocated shoulder joint", "Compression of tendons and bursa in the shoulder when the arm is raised, causing pain during overhead movements", "A broken collarbone", "Frozen shoulder caused by cold working conditions"],
  correctAnswer: 1,
  explanation: "Shoulder impingement occurs when the rotator cuff tendons and bursa are compressed between the bones of the shoulder during arm elevation. Repeated overhead work, reaching, and lifting above shoulder height are common workplace causes. Pain typically worsens with continued overhead activity.",
  section: "Module 5",
  difficulty: "intermediate",
  topic: "MSDs",
  category: "Health, Welfare & Responsibilities"
},
{
  id: 166,
  question: "What are the early symptoms of a developing musculoskeletal disorder that workers should be trained to recognise?",
  options: ["Sudden loss of consciousness", "Persistent aching, stiffness, tingling, numbness, or weakness in the affected area, particularly after work or during repetitive tasks", "High temperature and sore throat", "Changes in skin colour on the torso"],
  correctAnswer: 1,
  explanation: "Early MSD symptoms include persistent aching, stiffness, tingling, numbness, and weakness that may initially occur only during or after work but gradually become more constant. Recognising and reporting these early signs is crucial because early intervention dramatically improves treatment outcomes.",
  section: "Module 5",
  difficulty: "basic",
  topic: "Symptoms",
  category: "Health, Welfare & Responsibilities"
},
{
  id: 167,
  question: "Why is early reporting of manual handling-related symptoms so important?",
  options: ["To ensure the worker gets time off immediately", "Early intervention allows workplace modifications and treatment before the condition becomes chronic and potentially irreversible", "To create a paper trail for insurance claims", "It is only important for legal compliance, not health outcomes"],
  correctAnswer: 1,
  explanation: "MSDs caught in their early stages respond much better to treatment and workplace modifications. If left unreported and untreated, many conditions progress to chronic stages where permanent damage may occur. Early reporting also allows employers to identify and correct the root cause, protecting other workers.",
  section: "Module 5",
  difficulty: "intermediate",
  topic: "Early Reporting",
  category: "Health, Welfare & Responsibilities"
},
{
  id: 168,
  question: "What is the typical first-line treatment approach for a work-related musculoskeletal disorder?",
  options: ["Immediate surgery", "A combination of activity modification, physiotherapy, anti-inflammatory treatment, and ergonomic workplace adjustments", "Permanent removal from all manual work", "No treatment until the condition becomes severe"],
  correctAnswer: 1,
  explanation: "Most work-related MSDs are treated conservatively with a combination of activity modification, physiotherapy to restore strength and flexibility, anti-inflammatory medication to manage pain, and ergonomic adjustments to the workplace or task that caused the condition. Surgery is typically a last resort.",
  section: "Module 5",
  difficulty: "intermediate",
  topic: "Treatment",
  category: "Health, Welfare & Responsibilities"
},
{
  id: 169,
  question: "What does a phased return-to-work programme for a worker recovering from a manual handling injury typically involve?",
  options: ["Returning immediately to full duties on the first day back", "Gradually increasing work hours and physical demands over an agreed period, with regular review and modified duties as needed", "Working from home indefinitely", "Transferring to a completely different department permanently"],
  correctAnswer: 1,
  explanation: "A phased return-to-work gradually reintroduces the worker to their role, starting with reduced hours and lighter duties then progressively increasing demands. This approach allows the body to readapt, reduces the risk of re-injury, and supports sustainable recovery while maintaining the worker's connection to their role.",
  section: "Module 5",
  difficulty: "intermediate",
  topic: "Return-to-Work",
  category: "Health, Welfare & Responsibilities"
},
{
  id: 170,
  question: "At approximately what age does intervertebral disc degeneration typically begin?",
  options: ["Teenage years", "From the 30s onwards", "Not until the 60s", "Only after a specific injury"],
  correctAnswer: 1,
  explanation: "Intervertebral disc degeneration typically begins in the 30s as the discs gradually lose hydration and elasticity. This natural ageing process means that workers in their 30s and beyond have reduced spinal resilience, making them more vulnerable to manual handling injuries even from loads they could handle safely when younger.",
  section: "Module 5",
  difficulty: "basic",
  topic: "Age Considerations",
  category: "Health, Welfare & Responsibilities"
},
{
  id: 171,
  question: "How does the hormone relaxin affect manual handling risk during pregnancy?",
  options: ["It increases muscle strength", "It softens ligaments and increases joint laxity, making the spine and pelvis more vulnerable to injury from manual handling", "It has no effect on manual handling ability", "It only affects the hands and wrists"],
  correctAnswer: 1,
  explanation: "Relaxin is produced during pregnancy to soften ligaments in preparation for childbirth. However, this increased ligament laxity affects all joints, including the spine and pelvis, reducing their stability and making them more susceptible to injury from manual handling loads that would normally be manageable.",
  section: "Module 5",
  difficulty: "intermediate",
  topic: "Pregnancy",
  category: "Health, Welfare & Responsibilities"
},
{
  id: 172,
  question: "How does pregnancy change a woman's centre of gravity and why does this matter for manual handling?",
  options: ["The centre of gravity moves downward, improving stability", "The centre of gravity shifts forward and upward as the bump grows, increasing spinal loading, reducing balance, and making lifting more awkward", "Pregnancy does not affect the centre of gravity", "The centre of gravity moves to the left side only"],
  correctAnswer: 1,
  explanation: "As the pregnancy progresses, the growing bump shifts the centre of gravity forward and upward. This increased distance between the body's centre of gravity and the spine places greater loading on the lower back. Balance is also compromised, and the bump physically prevents loads being held close to the body.",
  section: "Module 5",
  difficulty: "intermediate",
  topic: "Pregnancy",
  category: "Health, Welfare & Responsibilities"
},
{
  id: 173,
  question: "Under the MHOR 1992, what specific requirement exists for pregnant workers regarding manual handling?",
  options: ["Pregnant workers must stop all work immediately", "A specific risk assessment must be carried out for pregnant workers, and the task must be modified or avoided if a significant risk is identified", "Pregnant workers may continue all normal duties without assessment", "The regulations do not mention pregnancy at all"],
  correctAnswer: 1,
  explanation: "The MHOR 1992, read alongside the Management of Health and Safety at Work Regulations 1999, require employers to carry out a specific risk assessment for pregnant workers and new mothers. If a significant risk from manual handling is identified, the employer must modify the task or provide alternative work.",
  section: "Module 5",
  difficulty: "intermediate",
  topic: "Pregnancy",
  category: "Health, Welfare & Responsibilities"
},
{
  id: 174,
  question: "Which type of manual handling injury is MOST commonly reported under RIDDOR?",
  options: ["Fractures from dropped loads", "Over-7-day injuries, most frequently involving back sprains and strains from lifting, carrying, or moving loads", "Fatal injuries from crushing", "Minor cuts and bruises"],
  correctAnswer: 1,
  explanation: "Over-7-day injuries (where a worker is incapacitated for more than seven consecutive days) are the most common RIDDOR-reportable manual handling injuries. Back sprains and strains from lifting, carrying, and moving loads account for the majority of these reports, reflecting the prevalence of cumulative and acute back injuries.",
  section: "Module 5",
  difficulty: "intermediate",
  topic: "RIDDOR",
  category: "Health, Welfare & Responsibilities"
},
{
  id: 175,
  question: "Under RIDDOR, within what timeframe must an over-7-day injury be reported to the enforcing authority?",
  options: ["Immediately by telephone", "Within 15 days of the incident", "Within 30 days", "There is no time limit"],
  correctAnswer: 1,
  explanation: "Over-7-day injuries must be reported to the enforcing authority within 15 days of the incident using the appropriate RIDDOR reporting form. This timeframe allows the employer to confirm that the incapacity has lasted more than seven days before triggering the reporting requirement.",
  section: "Module 5",
  difficulty: "basic",
  topic: "RIDDOR",
  category: "Health, Welfare & Responsibilities"
},
{
  id: 176,
  question: "What is the purpose of an incident investigation following a manual handling injury?",
  options: ["To determine who should be blamed and disciplined", "To identify the root causes of the injury so that corrective actions can prevent recurrence", "To calculate the cost of the injury to the business", "To gather evidence for prosecution of the injured worker"],
  correctAnswer: 1,
  explanation: "Incident investigation aims to identify the underlying root causes that led to the injury, not to assign blame. By understanding what went wrong — whether task design, equipment, environment, training, or organisational factors — the employer can implement corrective actions that prevent similar injuries in future.",
  section: "Module 5",
  difficulty: "basic",
  topic: "Investigation Process",
  category: "Health, Welfare & Responsibilities"
},
{
  id: 177,
  question: "What is root cause analysis in the context of a manual handling injury investigation?",
  options: ["Checking whether the worker had any pre-existing back problems", "A systematic process of looking beyond the immediate cause to identify the underlying organisational, procedural, or design failures that allowed the injury to occur", "Analysing the physical root (spine) that was damaged", "Asking the injured worker what they did wrong"],
  correctAnswer: 1,
  explanation: "Root cause analysis goes beyond the obvious immediate cause (e.g., 'the worker lifted a heavy box') to uncover why the situation existed (e.g., 'no mechanical aid was provided because the risk assessment was inadequate'). Addressing root causes prevents recurrence more effectively than addressing only surface-level factors.",
  section: "Module 5",
  difficulty: "advanced",
  topic: "Root Cause Analysis",
  category: "Health, Welfare & Responsibilities"
},
{
  id: 178,
  question: "Under the MHOR 1992, what is the correct sequence of employer duties regarding manual handling?",
  options: ["Assess, avoid, reduce, inform", "Avoid, assess, reduce, inform", "Inform, assess, avoid, reduce", "Reduce, inform, avoid, assess"],
  correctAnswer: 1,
  explanation: "The MHOR 1992 hierarchy requires employers to first avoid hazardous manual handling so far as reasonably practicable, then assess any remaining operations that cannot be avoided, then reduce the risk to the lowest level reasonably practicable, and finally provide information about the remaining residual risk.",
  section: "Module 5",
  difficulty: "basic",
  topic: "Employer Duties",
  category: "Health, Welfare & Responsibilities"
},
{
  id: 179,
  question: "What specific information must an employer provide to workers about loads they are required to handle?",
  options: ["Only the load's colour and description", "The weight of the load and, if the centre of gravity is not central, the location of the heaviest side", "Only whether the load is 'light', 'medium', or 'heavy'", "No specific information is required by law"],
  correctAnswer: 1,
  explanation: "Regulation 4(1)(b)(iii) of the MHOR 1992 requires employers to provide workers with precise information about the weight of loads and the location of the heaviest side if the centre of gravity is offset. This allows workers to plan their lift appropriately and apply correct technique.",
  section: "Module 5",
  difficulty: "intermediate",
  topic: "Employer Duties",
  category: "Health, Welfare & Responsibilities"
},
{
  id: 180,
  question: "What are the employee's duties under the MHOR 1992?",
  options: ["Employees have no duties — all responsibility rests with the employer", "Employees must make full and proper use of systems of work provided, cooperate with their employer on health and safety, and report any hazards or concerns", "Employees must write their own risk assessments", "Employees are only responsible for wearing PPE"],
  correctAnswer: 1,
  explanation: "Under the MHOR 1992 and the Health and Safety at Work Act 1974, employees must cooperate with their employer, use any systems of work and equipment provided for their safety, and report hazards or concerns. Employees who ignore safe systems or take unnecessary risks may be in breach of their legal duties.",
  section: "Module 5",
  difficulty: "basic",
  topic: "Employee Duties",
  category: "Health, Welfare & Responsibilities"
},
{
  id: 181,
  question: "Who is a 'competent person' in relation to manual handling risk assessment?",
  options: ["Any worker who has been employed for more than 6 months", "Someone with sufficient training, knowledge, experience, and skills to carry out a manual handling risk assessment effectively", "Only a doctor or physiotherapist", "The most senior manager on site regardless of training"],
  correctAnswer: 1,
  explanation: "A competent person for manual handling risk assessment must have adequate training in risk assessment methodology, knowledge of the relevant legislation and guidance, practical experience of the workplace and tasks, and the skills to identify hazards and recommend appropriate controls.",
  section: "Module 5",
  difficulty: "intermediate",
  topic: "Competent Person",
  category: "Health, Welfare & Responsibilities"
},
{
  id: 182,
  question: "How often should manual handling training be refreshed?",
  options: ["Training is only needed once and never needs refreshing", "Every 1-3 years, or sooner if there are changes in tasks, equipment, or the working environment, or after an incident", "Every 10 years", "Only after someone has been injured"],
  correctAnswer: 1,
  explanation: "HSE guidance recommends manual handling training refreshers every 1-3 years. However, refresher training should also be triggered by changes in working practices, new equipment, different loads, incidents or near misses, or evidence that workers are not following safe procedures. Regular refreshment maintains awareness and good practice.",
  section: "Module 5",
  difficulty: "basic",
  topic: "Training Requirements",
  category: "Health, Welfare & Responsibilities"
},
{
  id: 183,
  question: "What is a toolbox talk in the context of manual handling?",
  options: ["A conversation about which tools to buy for a toolbox", "A short, focused, informal training session delivered at the workplace covering a specific manual handling topic relevant to current work", "A formal three-day training course", "A meeting held only when an accident has occurred"],
  correctAnswer: 1,
  explanation: "Toolbox talks are brief (typically 10-15 minutes), informal training sessions delivered on site that address specific, relevant topics. For manual handling, they might cover safe techniques for a particular task, new equipment, or lessons from a recent incident. They are an effective way to maintain awareness between formal training sessions.",
  section: "Module 5",
  difficulty: "basic",
  topic: "Toolbox Talks",
  category: "Health, Welfare & Responsibilities"
},
{
  id: 184,
  question: "An employer has completed a manual handling risk assessment for a specific task. When must the assessment be reviewed?",
  options: ["Only every five years", "When there is a significant change in the task, equipment, working environment, or workforce, after an incident, or if the assessment is suspected to be no longer valid", "It never needs reviewing once completed", "Only when the HSE inspector asks to see it"],
  correctAnswer: 1,
  explanation: "Risk assessments must remain current and valid. They should be reviewed whenever there are significant changes to the task, equipment, environment, or workforce, after any manual handling incident or near miss, or if there is any reason to believe the assessment no longer reflects actual conditions.",
  section: "Module 5",
  difficulty: "intermediate",
  topic: "Employer Duties",
  category: "Health, Welfare & Responsibilities"
},
{
  id: 185,
  question: "What is the most common type of back pain associated with manual handling at work?",
  options: ["Spinal cord transection", "Non-specific lower back pain (mechanical back pain) affecting the lumbar region", "Cervical spine fracture", "Thoracic outlet syndrome"],
  correctAnswer: 1,
  explanation: "Non-specific lower back pain, also called mechanical back pain, is by far the most common manual handling-related complaint. It affects the lumbar region and can involve muscles, ligaments, facet joints, and intervertebral discs. It is the single largest cause of sickness absence in the UK workforce.",
  section: "Module 5",
  difficulty: "basic",
  topic: "MSDs",
  category: "Health, Welfare & Responsibilities"
},
{
  id: 186,
  question: "What is the role of occupational health in managing manual handling injuries?",
  options: ["To decide whether to dismiss injured workers", "To assess fitness for work, recommend workplace adjustments, support rehabilitation, advise on phased return, and conduct health surveillance where appropriate", "To perform first aid treatment only", "To write absence notes for workers who want time off"],
  correctAnswer: 1,
  explanation: "Occupational health provides specialist assessment of a worker's fitness for their specific role, recommends practical workplace adjustments to reduce risk, supports rehabilitation programmes, advises on phased return-to-work plans, and can conduct health surveillance to detect early signs of MSDs in at-risk workers.",
  section: "Module 5",
  difficulty: "intermediate",
  topic: "Treatment",
  category: "Health, Welfare & Responsibilities"
},
{
  id: 187,
  question: "Which age-related physiological change MOST increases vulnerability to manual handling injury in older workers?",
  options: ["Greying hair", "Reduced disc hydration, decreased muscle mass, and slower tissue repair combined with accumulated wear", "Improved pain tolerance", "Greater flexibility from years of practice"],
  correctAnswer: 1,
  explanation: "Ageing reduces intervertebral disc hydration and height, decreases muscle mass and strength (sarcopenia), and slows the rate of tissue repair. Combined with accumulated wear and tear from years of work, these changes mean that older workers are more vulnerable to injury from loads they may have handled safely for decades.",
  section: "Module 5",
  difficulty: "intermediate",
  topic: "Age Considerations",
  category: "Health, Welfare & Responsibilities"
},
{
  id: 188,
  question: "Is a worker legally entitled to refuse to carry out a manual handling task they believe is unsafe?",
  options: ["No — they must always follow instructions regardless", "Yes — under Section 7 of the Health and Safety at Work Act 1974, workers have a duty not to put themselves or others at risk, and should report concerns to their employer", "Only if they have a doctor's note", "Only if they are a union representative"],
  correctAnswer: 1,
  explanation: "Workers have a legal duty under Section 7 of HSWA 1974 to take reasonable care of their own health and safety. If a worker genuinely believes a manual handling task poses serious and imminent danger, they should report their concern. Employers should investigate and address the concern rather than insist the work continues.",
  section: "Module 5",
  difficulty: "advanced",
  topic: "Employee Duties",
  category: "Health, Welfare & Responsibilities"
},
{
  id: 189,
  question: "What constitutes an adequate initial manual handling training programme?",
  options: ["Watching a 5-minute video", "Theory on legislation and anatomy, practical demonstration of techniques, supervised practice with actual workplace loads, assessment of competence, and task-specific elements for the worker's actual role", "Reading the company policy document and signing it", "One hour of classroom instruction with no practical component"],
  correctAnswer: 1,
  explanation: "Effective initial training must combine theoretical knowledge (legislation, anatomy, biomechanics) with practical skill development (demonstration, supervised practice, competence assessment). Critically, it must include task-specific elements relevant to the actual loads, environments, and tasks the worker will encounter in their role.",
  section: "Module 5",
  difficulty: "intermediate",
  topic: "Training Requirements",
  category: "Health, Welfare & Responsibilities"
},
{
  id: 190,
  question: "What is health surveillance in relation to manual handling, and when is it required?",
  options: ["CCTV monitoring of workers during their shifts", "Systematic monitoring of workers' health through questionnaires, physical checks, or clinical examinations to detect early signs of MSDs, required where the risk assessment identifies a residual risk of MSDs", "A one-off medical examination at recruitment", "Annual blood tests for all employees"],
  correctAnswer: 1,
  explanation: "Health surveillance for manual handling involves regular monitoring of workers' musculoskeletal health to detect early signs of developing disorders. It is required where the risk assessment identifies that, despite controls, there remains a residual risk of MSDs. Early detection allows intervention before conditions become chronic.",
  section: "Module 5",
  difficulty: "advanced",
  topic: "Employer Duties",
  category: "Health, Welfare & Responsibilities"
},
{
  id: 191,
  question: "What is the legal standard for how far an employer must go to reduce manual handling risk?",
  options: ["They must eliminate all risk completely", "So far as is reasonably practicable, meaning the risk reduction measures must be proportionate to the level of risk", "Only to the extent that is convenient and low-cost", "Until the workers are satisfied, regardless of cost"],
  correctAnswer: 1,
  explanation: "The 'so far as is reasonably practicable' (SFAIRP) test requires employers to reduce risk unless the cost, time, and effort of further reduction is grossly disproportionate to the risk. This is a legal balancing exercise, not an excuse to do nothing — the greater the risk, the more investment is expected.",
  section: "Module 5",
  difficulty: "advanced",
  topic: "Employer Duties",
  category: "Health, Welfare & Responsibilities"
},
{
  id: 192,
  question: "How can fatigue be identified as a contributing factor in a manual handling incident investigation?",
  options: ["By checking whether the worker had eaten breakfast", "By examining shift patterns, working hours, break frequency, workload distribution, time of day, and the worker's reported physical state before the incident", "Fatigue cannot be investigated — it is purely subjective", "By measuring the worker's blood pressure at the time of the incident"],
  correctAnswer: 1,
  explanation: "Fatigue as a contributing factor can be identified through analysis of shift patterns, overtime hours, break adequacy, task repetitiveness, time elapsed since last rest, and the worker's own account. Incidents occurring late in shifts, after long hours, or during physically demanding repetitive work often have fatigue as an underlying contributor.",
  section: "Module 5",
  difficulty: "advanced",
  topic: "Fatigue Management",
  category: "Health, Welfare & Responsibilities"
},
{
  id: 193,
  question: "What is a key difference between an 'over-7-day' injury and a 'specified injury' under RIDDOR?",
  options: ["There is no difference — they are the same category", "A specified injury (such as a fracture or dislocation) must be reported immediately, while an over-7-day injury must be reported within 15 days", "An over-7-day injury is more serious", "Only specified injuries require investigation"],
  correctAnswer: 1,
  explanation: "Specified injuries (including fractures, dislocations, and amputations) are considered more serious and must be reported to the enforcing authority without delay (immediately by the quickest means). Over-7-day injuries must be reported within 15 days. Both require investigation, but the urgency of reporting differs significantly.",
  section: "Module 5",
  difficulty: "advanced",
  topic: "RIDDOR",
  category: "Health, Welfare & Responsibilities"
},
{
  id: 194,
  question: "An employer provides manual handling training but does not assess whether workers can apply the techniques in practice. Is this adequate?",
  options: ["Yes — providing training fulfils the legal duty", "No — training must include assessment of competence to ensure workers can actually apply the techniques in their real workplace tasks", "Yes — assessment is only required for managers", "No, but only because assessments are needed for insurance purposes"],
  correctAnswer: 1,
  explanation: "Simply delivering training without checking that workers can apply the techniques is insufficient. Competence assessment — observing workers performing actual tasks using the trained techniques — is essential to confirm that the training has been effective and that workers can translate theory into safe practice.",
  section: "Module 5",
  difficulty: "intermediate",
  topic: "Training Requirements",
  category: "Health, Welfare & Responsibilities"
},
{
  id: 195,
  question: "What topics should a manual handling toolbox talk cover before a specific task, such as unloading a delivery of cable drums?",
  options: ["General company news and holiday schedules", "The specific risks of the task, the control measures in place, correct techniques, equipment to be used, and what to do if problems arise", "Only the time allowed to complete the task", "Nothing specific — the same generic talk is used for all tasks"],
  correctAnswer: 1,
  explanation: "Toolbox talks should be task-specific, covering the particular risks (weight, shape, ground conditions), the available control measures (drum trolley, team handling), correct techniques, the equipment to be used, and emergency procedures. Task-specific briefings are far more effective than generic reminders at preventing injuries.",
  section: "Module 5",
  difficulty: "basic",
  topic: "Toolbox Talks",
  category: "Health, Welfare & Responsibilities"
},
{
  id: 196,
  question: "A worker develops chronic lower back pain that they attribute to years of manual handling at work. What type of RIDDOR report might this trigger?",
  options: ["It cannot be reported under RIDDOR", "A report of an occupational disease — specifically, work-related musculoskeletal disorder affecting the back", "Only an over-7-day injury report", "A dangerous occurrence report"],
  correctAnswer: 1,
  explanation: "RIDDOR includes provisions for reporting occupational diseases, including certain musculoskeletal conditions. If a doctor diagnoses a work-related MSD and the worker's job involves manual handling as a significant contributing factor, the employer has a duty to report it as an occupational disease under RIDDOR.",
  section: "Module 5",
  difficulty: "advanced",
  topic: "RIDDOR",
  category: "Health, Welfare & Responsibilities"
},
{
  id: 197,
  question: "What is the employer's duty regarding manual handling for workers returning from a musculoskeletal injury?",
  options: ["There is no specific duty — the worker simply returns to normal duties", "The employer must carry out a return-to-work assessment, consider workplace adjustments, and update the risk assessment to reflect the worker's changed capability", "The employer can refuse to allow the worker back until fully recovered", "The worker must prove they are stronger than before the injury"],
  correctAnswer: 1,
  explanation: "Employers have a duty to assess the returning worker's fitness for their role, make reasonable adjustments (such as modified duties, phased hours, or temporary redeployment), and update the risk assessment to account for any temporary or permanent changes in the worker's physical capability.",
  section: "Module 5",
  difficulty: "intermediate",
  topic: "Return-to-Work",
  category: "Health, Welfare & Responsibilities"
},
{
  id: 198,
  question: "During pregnancy, from which trimester should manual handling tasks typically be reassessed?",
  options: ["Only in the third trimester when the bump is largest", "From notification of pregnancy onwards — the risk assessment should be carried out as soon as the employer is notified and reviewed as the pregnancy progresses", "Only after the baby is born, for the return to work", "Manual handling risk does not change during pregnancy"],
  correctAnswer: 1,
  explanation: "The specific risk assessment should be carried out as soon as the employer is notified of the pregnancy, because relaxin and other hormonal changes begin affecting ligament laxity from early pregnancy. The assessment should be reviewed as the pregnancy progresses since physical changes and risk factors increase throughout.",
  section: "Module 5",
  difficulty: "intermediate",
  topic: "Pregnancy",
  category: "Health, Welfare & Responsibilities"
},
{
  id: 199,
  question: "What records should an employer maintain regarding manual handling training?",
  options: ["No records are legally required", "Records of who was trained, the training content and date, the trainer's competence, competence assessment outcomes, and scheduled refresher dates", "Only a signed attendance sheet", "Records are only needed for workers who have been injured"],
  correctAnswer: 1,
  explanation: "While the specific format is not prescribed, employers should maintain comprehensive training records including attendees, dates, content covered, trainer details, competence assessment results, and planned refresher dates. These records demonstrate compliance, help manage refresher schedules, and provide evidence in the event of an investigation.",
  section: "Module 5",
  difficulty: "basic",
  topic: "Training Requirements",
  category: "Health, Welfare & Responsibilities"
},
{
  id: 200,
  question: "An investigation reveals that a manual handling injury occurred because workers were not following the safe system of work, despite having received training. What should the employer's root cause investigation focus on?",
  options: ["Disciplining the injured worker to set an example", "Understanding WHY workers were not following the system — was it impractical, poorly communicated, were there production pressures, was supervision inadequate, or had bad habits developed unchallenged?", "Whether the training certificate had expired", "Whether other employers in the industry have the same problem"],
  correctAnswer: 1,
  explanation: "If trained workers are not following safe systems, the root cause almost always lies deeper than individual non-compliance. The investigation should explore whether the system was practical, whether production pressures incentivised shortcuts, whether supervision reinforced safe practice, and whether the working culture supported safety over speed.",
  section: "Module 5",
  difficulty: "advanced",
  topic: "Root Cause Analysis",
  category: "Health, Welfare & Responsibilities"
},
];
