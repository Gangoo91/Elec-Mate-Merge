/**
 * Working at Height Mock Exam Question Bank
 *
 * 200 questions covering all 5 modules with difficulty distribution
 * and category classification for balanced exam generation.
 *
 * Categories (5):
 *   Understanding Working at Height (40) | Access Equipment & Selection (40) |
 *   Fall Protection & Prevention (40) | Safe Systems of Work (40) | Incident Response & Responsibilities (40)
 *
 * Difficulty per category: ~14 basic, ~18 intermediate, ~8 advanced
 */

import { StandardMockQuestion, MockExamConfig } from '@/types/standardMockExam';
import { getRandomQuestionsBalanced } from '@/utils/questionSelection';

export const workingAtHeightCategories = [
  'Understanding Working at Height',
  'Access Equipment & Selection',
  'Fall Protection & Prevention',
  'Safe Systems of Work',
  'Incident Response & Responsibilities',
];

export const workingAtHeightMockExamConfig: MockExamConfig = {
  examId: 'working-at-height',
  examTitle: 'Working at Height Mock Examination',
  totalQuestions: 20,
  timeLimit: 1800,
  passThreshold: 80,
  exitPath: '/study-centre/general-upskilling/working-at-height-module-6',
  categories: workingAtHeightCategories,
};

export const getRandomWorkingAtHeightExamQuestions = (numQuestions: number = 20) => {
  return getRandomQuestionsBalanced(
    workingAtHeightQuestionBank,
    numQuestions,
    workingAtHeightCategories
  );
};

export const workingAtHeightQuestionBank: StandardMockQuestion[] = [
  // ============================================================
  // CATEGORY 1: Understanding Working at Height (Questions 1-40)
  // Section: Module 1
  // Difficulty: 14 basic, 18 intermediate, 8 advanced
  // ============================================================

  // --- Basic (1-14) ---
  {
    id: 1,
    question: "Under the Work at Height Regulations 2005, what is considered 'working at height'?",
    options: [
      'Work carried out above 2 metres from the ground, floor or permanent platform level',
      'Any work where a person could fall a distance liable to cause personal injury',
      'Work on scaffolding, ladders or elevated platforms, but never at or below ground level',
      'Work where a fall would be likely to result in a fracture or a more serious injury',
    ],
    correctAnswer: 1,
    explanation:
      'The Work at Height Regulations 2005 define working at height as any place where a person could fall a distance liable to cause personal injury. There is no minimum height threshold — even working at ground level near an open excavation counts.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'WAH Regs 2005 definition',
    category: 'Understanding Working at Height',
  },
  {
    id: 2,
    question:
      'Approximately how many fatal injuries per year in the UK are caused by falls from height?',
    options: [
      'Around 10 deaths per year',
      'Around 100 deaths per year',
      'Around 40 deaths per year',
      'Around 200 deaths per year',
    ],
    correctAnswer: 2,
    explanation:
      'Falls from height account for approximately 40 fatalities per year in the UK, making it one of the leading causes of workplace death. The majority of these fatal falls occur from relatively low heights, often below 2 metres.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Fall statistics',
    category: 'Understanding Working at Height',
  },
  {
    id: 3,
    question:
      'Which piece of legislation places a general duty on employers to ensure the health, safety, and welfare of employees?',
    options: [
      'Work at Height Regulations 2005',
      'Management of Health and Safety at Work Regulations 1999',
      'Construction (Design and Management) Regulations 2015',
      'Health and Safety at Work etc. Act 1974',
    ],
    correctAnswer: 3,
    explanation:
      'The Health and Safety at Work etc. Act 1974 (HASAWA) is the primary piece of UK health and safety legislation. It places a general duty on employers to ensure, so far as is reasonably practicable, the health, safety, and welfare at work of all employees.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'HASAWA 1974',
    category: 'Understanding Working at Height',
  },
  {
    id: 4,
    question: 'What is the first step in the hierarchy of control for working at height?',
    options: [
      'Avoid working at height altogether',
      'Use personal fall protection equipment',
      'Use collective fall prevention measures',
      'Minimise the distance and consequences of a fall',
    ],
    correctAnswer: 0,
    explanation:
      'The hierarchy of control for working at height starts with avoidance — if the work can be done without working at height, it should be. Only when avoidance is not reasonably practicable should you move to preventing falls, then mitigating the consequences.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Hierarchy of control',
    category: 'Understanding Working at Height',
  },
  {
    id: 5,
    question: 'At what height do the majority of fatal falls from height occur?',
    options: [
      'Above 10 metres',
      'Below 2 metres',
      'Between 5 and 10 metres',
      'Between 2 and 5 metres',
    ],
    correctAnswer: 1,
    explanation:
      'Statistics consistently show that the majority of fatal falls from height occur from below 2 metres. This highlights why the regulations apply regardless of height and why proper precautions are needed even for seemingly low-level tasks.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Fall statistics',
    category: 'Understanding Working at Height',
  },
  {
    id: 6,
    question:
      'Who has a legal duty under HASAWA 1974 to take reasonable care of their own health and safety at work?',
    options: [
      'The health and safety officer',
      'The site supervisor and manager',
      'Every employee',
      'The employer, not the employee',
    ],
    correctAnswer: 2,
    explanation:
      'Under Section 7 of the Health and Safety at Work etc. Act 1974, every employee has a duty to take reasonable care of their own health and safety and that of others who may be affected by their acts or omissions. This is not solely an employer responsibility.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Employer/employee duties',
    category: 'Understanding Working at Height',
  },
  {
    id: 7,
    question: 'What does PUWER 1998 stand for?',
    options: [
      'Preventive Use of Work Equipment Regulations',
      'Protection of Users at Work and Equipment Regulations',
      'Personal Use of Work Equipment Requirements',
      'Provision and Use of Work Equipment Regulations',
    ],
    correctAnswer: 3,
    explanation:
      'PUWER stands for the Provision and Use of Work Equipment Regulations 1998. These regulations require that work equipment provided for use at work is suitable, maintained, and inspected, and that adequate training is given to those who use it.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'PUWER 1998',
    category: 'Understanding Working at Height',
  },
  {
    id: 8,
    question: 'What does LOLER 1998 specifically relate to?',
    options: [
      'Lifting operations and lifting equipment',
      'Ladder safety on construction sites',
      'Loading and offloading of equipment at height',
      'Lighting requirements for outdoor work',
    ],
    correctAnswer: 0,
    explanation:
      'LOLER stands for the Lifting Operations and Lifting Equipment Regulations 1998. It applies to all lifting equipment including MEWPs, hoists, and cranes used during work at height. It requires that lifting equipment is thoroughly examined at regular intervals.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'LOLER 1998',
    category: 'Understanding Working at Height',
  },
  {
    id: 9,
    question: "Which of the following is an example of 'mitigating' the consequences of a fall?",
    options: [
      'Erecting a full scaffold with toe boards',
      'Using a safety net below the working area',
      'Carrying out the entire task from ground level',
      'Installing guard rails around an opening',
    ],
    correctAnswer: 1,
    explanation:
      'Safety nets mitigate (reduce the severity of) a fall rather than preventing it. Guard rails and scaffolding prevent falls, and working from ground level avoids the risk entirely. Mitigation is the third tier of the hierarchy after avoidance and prevention.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Hierarchy of control',
    category: 'Understanding Working at Height',
  },
  {
    id: 10,
    question:
      'Which regulations specifically govern the management of construction projects, including work at height on sites?',
    options: [
      'PUWER 1998',
      'LOLER 1998',
      'CDM 2015',
      'COSHH 2002',
    ],
    correctAnswer: 2,
    explanation:
      'The Construction (Design and Management) Regulations 2015 (CDM 2015) govern the management of health, safety, and welfare on construction projects. They assign specific duties to clients, designers, and contractors regarding planning and managing work at height.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'CDM 2015',
    category: 'Understanding Working at Height',
  },
  {
    id: 11,
    question:
      'Under the Work at Height Regulations 2005, who is primarily responsible for ensuring work at height is properly planned?',
    options: [
      'The Health and Safety Executive inspector for the whole region',
      'The individual worker who carries out the task at height',
      'The principal designer appointed under the CDM 2015',
      'The duty holder (employer or person controlling the work)',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 4 of the Work at Height Regulations 2005 places the duty on the employer or any person who controls the work. They must ensure that work at height is properly planned, appropriately supervised, and carried out in a safe manner.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Employer/employee duties',
    category: 'Understanding Working at Height',
  },
  {
    id: 12,
    question: 'A risk assessment for working at height should identify hazards and then do what?',
    options: [
      'Evaluate the risks and determine suitable control measures',
      'Eliminate every one of the hazards completely before work starts',
      'Report each of the hazards to the HSE immediately in writing',
      'Stop all of the work until the hazards have been removed',
    ],
    correctAnswer: 0,
    explanation:
      'A risk assessment identifies hazards, evaluates the likelihood and severity of harm, and determines suitable control measures. Not all hazards can be completely eliminated, but the risk must be reduced to as low as reasonably practicable.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: '5-step risk assessment',
    category: 'Understanding Working at Height',
  },
  {
    id: 13,
    question: 'Does working near a fragile roof surface count as working at height?',
    options: [
      'No, only if you are actually standing on the fragile roof itself',
      'Yes, because there is a risk of falling through the surface',
      'No, fragile surfaces are covered by a separate set of regulations',
      'Only if the fragile roof is more than 3 metres above the ground',
    ],
    correctAnswer: 1,
    explanation:
      'Working on or near a fragile surface is explicitly covered by the Work at Height Regulations 2005. A person could fall through the fragile material, suffering injury from the resulting fall. The regulations require specific precautions for fragile surfaces.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'WAH Regs 2005 definition',
    category: 'Understanding Working at Height',
  },
  {
    id: 14,
    question: 'What is the correct order of the three-tier hierarchy for managing work at height?',
    options: [
      'Prevent, avoid, mitigate',
      'Avoid, mitigate, prevent',
      'Avoid, prevent, mitigate',
      'Mitigate, prevent, avoid',
    ],
    correctAnswer: 2,
    explanation:
      'The hierarchy is: first avoid working at height if possible, then prevent falls using collective or personal protection if avoidance is not reasonably practicable, and finally mitigate the distance and consequences of any fall. This order must always be followed.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Hierarchy of control',
    category: 'Understanding Working at Height',
  },

  // --- Intermediate (15-32) ---
  {
    id: 15,
    question:
      'Under the Work at Height Regulations 2005, which of the following is NOT a duty placed on the employer?',
    options: [
      'Ensuring that all work at height is properly planned and organised in advance',
      'Ensuring that equipment for work at height is inspected and maintained',
      'Ensuring that all those involved in the work at height are competent',
      'Providing all workers with personal fall arrest systems regardless of risk',
    ],
    correctAnswer: 3,
    explanation:
      'The regulations do not require blanket provision of personal fall arrest systems. The hierarchy of control must be followed — avoid, then prevent with collective measures, then personal protection only where other measures are not reasonably practicable.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Employer/employee duties',
    category: 'Understanding Working at Height',
  },
  {
    id: 16,
    question:
      "Which step of the HSE's 5-step risk assessment process involves deciding who might be harmed and how?",
    options: [
      'Step 2 — Decide who might be harmed and how',
      'Step 4 — Record findings and implement them',
      'Step 1 — Identify the hazards',
      'Step 3 — Evaluate the risks and decide on precautions',
    ],
    correctAnswer: 0,
    explanation:
      "Step 2 of the HSE's 5-step risk assessment process involves identifying who might be harmed and how. This includes employees, contractors, visitors, and members of the public who could be affected by the work at height activity.",
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: '5-step risk assessment',
    category: 'Understanding Working at Height',
  },
  {
    id: 17,
    question:
      'Under HASAWA 1974, what must an employer provide to employees in addition to safe systems of work?',
    options: [
      'Insurance cover for every work at height activity on site',
      'Information, instruction, training, and supervision',
      'Free personal protective equipment for all site tasks',
      'A written guarantee of zero workplace injuries',
    ],
    correctAnswer: 1,
    explanation:
      'Section 2 of HASAWA 1974 requires employers to provide information, instruction, training, and supervision as is necessary to ensure the health and safety of employees. This is particularly important for high-risk activities such as working at height.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'HASAWA 1974',
    category: 'Understanding Working at Height',
  },
  {
    id: 18,
    question: "What role does CDM 2015 assign to the 'principal designer'?",
    options: [
      'Managing health and safety during the construction phase and controlling all site access daily',
      'Preparing the construction phase plan and inducting every single worker onto the site each day',
      'Planning, managing, and coordinating health and safety during the pre-construction phase',
      'Appointing all the duty holders and allowing sufficient time and resources for the whole project',
    ],
    correctAnswer: 2,
    explanation:
      'Under CDM 2015, the principal designer is responsible for planning, managing, and coordinating health and safety during the pre-construction phase. This includes ensuring that work at height risks are considered and designed out where possible.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'CDM 2015',
    category: 'Understanding Working at Height',
  },
  {
    id: 19,
    question:
      'Which regulation requires that work equipment used at height is inspected at suitable intervals?',
    options: [
      'HASAWA 1974',
      'RIDDOR 2013',
      'LOLER 1998',
      'PUWER 1998',
    ],
    correctAnswer: 3,
    explanation:
      'PUWER 1998 requires that work equipment is maintained in an efficient state, in efficient working order, and in good repair. It also requires inspection at suitable intervals and each time exceptional circumstances occur that could affect safety.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'PUWER 1998',
    category: 'Understanding Working at Height',
  },
  {
    id: 20,
    question:
      'How often must lifting equipment used for work at height, such as a MEWP, undergo thorough examination under LOLER 1998?',
    options: [
      'Every 6 months',
      'Every 3 months',
      'Every 12 months',
      'Only when a defect is reported',
    ],
    correctAnswer: 0,
    explanation:
      'Under LOLER 1998, lifting equipment used to lift persons (such as MEWPs) must be thoroughly examined at least every 6 months. Equipment used only for lifting goods requires examination every 12 months. Records of examinations must be kept.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'LOLER 1998',
    category: 'Understanding Working at Height',
  },
  {
    id: 21,
    question:
      'When carrying out a risk assessment for work at height, which factor is LEAST relevant?',
    options: [
      'The duration and frequency of the task',
      'The colour of the safety helmets being worn',
      'The condition and stability of the working surface',
      'Weather conditions at the time of the work',
    ],
    correctAnswer: 1,
    explanation:
      'The colour of safety helmets has no bearing on the risk assessment for working at height. Relevant factors include duration, frequency, surface condition, weather, equipment suitability, competence of workers, and the distance of any potential fall.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: '5-step risk assessment',
    category: 'Understanding Working at Height',
  },
  {
    id: 22,
    question:
      'Under the Work at Height Regulations 2005, what must be considered when selecting equipment for work at height?',
    options: [
      'The lowest purchase or hire cost available from the plant supplier at the time',
      'The individual worker\'s personal preference and previous experience of the equipment',
      'The working conditions, distance of potential fall, duration, and frequency of use',
      'Whether the equipment is already on site and can be rigged without a permit',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 7 requires that when selecting equipment, the duty holder must consider the working conditions, the nature, frequency, and duration of the work, the risks to safety, and the distance and consequences of a potential fall.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'WAH Regs 2005 definition',
    category: 'Understanding Working at Height',
  },
  {
    id: 23,
    question:
      "What does 'so far as is reasonably practicable' mean in relation to managing work at height risks?",
    options: [
      'Every conceivable risk must be eliminated whatever the cost or effort involved',
      'Only risks that have already caused an injury need to be controlled',
      'The duty holder may ignore any risk that is unlikely to occur at all',
      'Risks should be weighed against the cost, time, and effort of reducing them',
    ],
    correctAnswer: 3,
    explanation:
      "The term 'so far as is reasonably practicable' means the duty holder must balance the level of risk against the measures needed to control it — in terms of money, time, and trouble. If the risk is high, significant resources must be devoted to reducing it.",
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'HASAWA 1974',
    category: 'Understanding Working at Height',
  },
  {
    id: 24,
    question: "Which of the following is classified as a 'collective' fall prevention measure?",
    options: [
      'Guard rails and toe boards',
      'A personal fall arrest harness',
      'A shock-absorbing lanyard',
      'A self-retracting lifeline',
    ],
    correctAnswer: 0,
    explanation:
      'Guard rails and toe boards are collective measures because they protect everyone in the area without requiring individual action. Personal fall arrest harnesses, self-retracting lifelines, and shock-absorbing lanyards are all personal fall protection measures.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Hierarchy of control',
    category: 'Understanding Working at Height',
  },
  {
    id: 25,
    question: "Under CDM 2015, who is the 'principal contractor' on a construction project?",
    options: [
      'The designer appointed to coordinate health and safety during the pre-construction phase of the project only',
      'The contractor appointed to plan, manage, and coordinate health and safety during the construction phase',
      'The individual worker on the site who holds the most senior trade qualification of the whole gang working there',
      'The local authority building control officer who is responsible for inspecting all the works on site',
    ],
    correctAnswer: 1,
    explanation:
      'The principal contractor is appointed by the client under CDM 2015 to plan, manage, monitor, and coordinate health and safety during the construction phase. They must ensure that work at height is carried out safely and that all contractors comply.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'CDM 2015',
    category: 'Understanding Working at Height',
  },
  {
    id: 26,
    question:
      'An employee notices that a guardrail on a working platform is loose. What should they do first?',
    options: [
      'Carry on working but keep clear of the loose section of guardrail',
      'Tighten the guardrail fittings themselves and carry on working',
      'Report the defect to a supervisor and stop using the platform',
      'Continue working and report the defect at the end of the shift',
    ],
    correctAnswer: 2,
    explanation:
      'Under both HASAWA 1974 and the Work at Height Regulations 2005, employees must report any hazard or defect. They should not use defective equipment. The correct action is to stop using the platform and report the issue to a competent supervisor immediately.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Employer/employee duties',
    category: 'Understanding Working at Height',
  },
  {
    id: 27,
    question: "What is the fifth and final step of the HSE's 5-step risk assessment process?",
    options: [
      'Avoid working at height altogether',
      'A risk matrix combining likelihood and severity',
      '1:4 ratio (1 out for every 4 up)',
      'Review the assessment and update if necessary',
    ],
    correctAnswer: 3,
    explanation:
      'Step 5 is to review the risk assessment and update it if necessary. Work at height conditions can change due to weather, new equipment, or changes in the task. Regular review ensures that the assessment remains relevant and effective.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: '5-step risk assessment',
    category: 'Understanding Working at Height',
  },
  {
    id: 28,
    question:
      'Which of the following scenarios would NOT be classified as working at height under the 2005 Regulations?',
    options: [
      'Standing on a stable floor with no nearby openings or edges',
      'Working on a flat roof which has no edge protection fitted at all',
      'Using a stepladder to change a light bulb in the office ceiling',
      'Working right alongside an open excavation trench on the site',
    ],
    correctAnswer: 0,
    explanation:
      'Standing on a stable floor with no openings or edges nearby does not present a risk of falling a distance liable to cause personal injury. All the other scenarios involve a risk of falling from height and are covered by the regulations.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'WAH Regs 2005 definition',
    category: 'Understanding Working at Height',
  },
  {
    id: 29,
    question: 'Why are falls from below 2 metres particularly dangerous statistically?',
    options: [
      'Because the equipment used at low heights is always substandard stuff',
      'Because they happen far more frequently and complacency is common',
      'Because workers at low heights are usually untrained people',
      'Because low-level falls always cause serious head injuries',
    ],
    correctAnswer: 1,
    explanation:
      'Falls from below 2 metres are statistically dangerous because they occur with much greater frequency than falls from greater heights. Workers and employers often underestimate the risk at low heights, leading to complacency and inadequate precautions.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Fall statistics',
    category: 'Understanding Working at Height',
  },
  {
    id: 30,
    question: 'What must an employer do before allowing any employee to carry out work at height?',
    options: [
      'Obtain a written authorisation from the Health and Safety Executive for the task',
      'Issue every worker with a personal fall arrest harness and lanyard as standard kit',
      'Ensure the employee is competent or under the supervision of a competent person',
      'Confirm that the worker holds a valid first aid at work certificate too',
    ],
    correctAnswer: 2,
    explanation:
      'The Work at Height Regulations 2005 require that every person involved in work at height is competent, or if being trained, works under the supervision of a competent person. Competence includes adequate training, knowledge, and experience.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Employer/employee duties',
    category: 'Understanding Working at Height',
  },
  {
    id: 31,
    question:
      'Under PUWER 1998, who is responsible for ensuring that work equipment is suitable for its intended purpose?',
    options: [
      'The employee who is using the equipment',
      'The hire company that supplied the equipment',
      'The manufacturer who built the equipment alone',
      'The employer providing the equipment',
    ],
    correctAnswer: 3,
    explanation:
      'PUWER 1998 places the duty on the employer to ensure that work equipment is suitable for the use intended. This means it must be appropriate for the task, the conditions, and the risks present, including when used for working at height.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'PUWER 1998',
    category: 'Understanding Working at Height',
  },
  {
    id: 32,
    question:
      'A task involves briefly accessing a ceiling void to inspect cabling. The opening is at 2.5 metres. Which control should be considered first?',
    options: [
      'Explore whether the inspection can be done using a camera from below',
      'Issue the worker with a harness and a lanyard before any other measure',
      'Erect a full independent scaffold tower up to the ceiling opening',
      'Use a leaning ladder footed by a second person at the base',
    ],
    correctAnswer: 0,
    explanation:
      'The hierarchy of control requires avoidance first. If the inspection can be carried out from below using a camera or similar tool, this avoids the need to work at height entirely. Only if avoidance is not reasonably practicable should other measures be considered.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Hierarchy of control',
    category: 'Understanding Working at Height',
  },

  // --- Advanced (33-40) ---
  {
    id: 33,
    question:
      "Under CDM 2015, a domestic client's duties automatically transfer to which party if no principal designer is appointed?",
    options: [
      'The Health and Safety Executive, who then appoints a duty holder',
      'The designer or, if none, the principal contractor',
      'The local authority building control department',
      'The duties are simply waived for domestic clients',
    ],
    correctAnswer: 1,
    explanation:
      'Under CDM 2015 Regulation 7, where a domestic client fails to appoint a principal designer, the duties pass to the designer (on single-contractor projects) or the principal contractor (on multi-contractor projects). This ensures duties are always held by a competent party.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'CDM 2015',
    category: 'Understanding Working at Height',
  },
  {
    id: 34,
    question:
      'A worker on a construction site suffers a fall from height resulting in them being incapacitated for more than 7 consecutive days. Under which regulation must this be reported?',
    options: [
      'PUWER 1998',
      'LOLER 1998',
      'RIDDOR 2013',
      'CDM 2015 only',
    ],
    correctAnswer: 2,
    explanation:
      'Under RIDDOR 2013 (Reporting of Injuries, Diseases and Dangerous Occurrences Regulations), an over-7-day incapacitation injury must be reported to the HSE. Falls from height resulting in such injuries are reportable dangerous occurrences.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'HASAWA 1974',
    category: 'Understanding Working at Height',
  },
  {
    id: 35,
    question:
      "How does the 'reverse burden of proof' operate in health and safety prosecutions under HASAWA 1974?",
    options: [
      'The employee must first prove that the employer was negligent as a matter of law',
      'The prosecution must prove that the employer had intended to cause harm to them',
      'The HSE must prove that the employer had full knowledge of that risk',
      'The employer must prove they did everything reasonably practicable to comply',
    ],
    correctAnswer: 3,
    explanation:
      'Under Section 40 of HASAWA 1974, once a breach is established, the burden shifts to the defendant (typically the employer) to prove they did everything so far as was reasonably practicable. This is known as the reverse burden of proof.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'HASAWA 1974',
    category: 'Understanding Working at Height',
  },
  {
    id: 36,
    question:
      "A contractor is hired to work at height on a client's premises. Under the Work at Height Regulations 2005, who holds the primary duty to ensure the work is safe?",
    options: [
      'Any person who controls the work activity to any extent',
      'The client, as the occupier of the premises where the work is carried out',
      'The contractor who directly employs the workers going up to height',
      'The Health and Safety Executive as the enforcing authority for the site',
    ],
    correctAnswer: 0,
    explanation:
      "Regulation 3 of the Work at Height Regulations 2005 applies to any person who controls the work at height activity to any extent. This means duties can apply to the client, the contractor's employer, and anyone else in the chain of control simultaneously.",
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'Employer/employee duties',
    category: 'Understanding Working at Height',
  },
  {
    id: 37,
    question:
      'When completing a risk assessment for work at height, which of the following qualitative methods is used to prioritise risks?',
    options: [
      'Ranking risks alphabetically by the name of each hazard',
      'A risk matrix combining likelihood and severity',
      'Prioritising whichever hazard is cheapest to control first',
      'Counting the total number of workers exposed to each hazard',
    ],
    correctAnswer: 1,
    explanation:
      'A risk matrix is a standard qualitative tool that combines the likelihood of an event occurring with the severity of its consequences to produce a risk rating. This rating helps prioritise control measures, focusing resources on the highest risks first.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: '5-step risk assessment',
    category: 'Understanding Working at Height',
  },
  {
    id: 38,
    question:
      'Under Regulation 9 of the Work at Height Regulations 2005, what specific duty exists regarding fragile surfaces?',
    options: [
      'Warning notices must be displayed at the approach to every fragile surface, after which normal access is then permitted',
      'Guard rails must be fitted around every sloping roof, regardless of its pitch, before any person works on it at all',
      'No person shall pass across, work on, or near a fragile surface unless it is the only reasonably practicable means',
      'Edge protection must be provided wherever a fragile roof surface exceeds 3 metres in height above the ground level below',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 9 states that no person shall pass across or near, or work on, from, or near a fragile surface unless that is the only reasonably practicable way of carrying out the work. Where it is, suitable platforms, coverings, guard rails, and fall arrest must be provided.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'WAH Regs 2005 definition',
    category: 'Understanding Working at Height',
  },
  {
    id: 39,
    question:
      'A self-employed window cleaner working on a commercial building falls and is seriously injured. Which legislation can the HSE use to prosecute?',
    options: [
      'The Work at Height Regulations 2005 alone, since no employer-employee relationship exists',
      'No legislation applies, because a self-employed person owes duties only to themselves',
      'The Provision and Use of Work Equipment Regulations 1998 and the RIDDOR 2013 reporting duties',
      'HASAWA 1974 Sections 2 and 3, the Work at Height Regulations 2005, and potentially CDM 2015',
    ],
    correctAnswer: 3,
    explanation:
      'Multiple pieces of legislation may apply. HASAWA 1974 Section 3 covers duties to non-employees, Section 2 applies if the cleaner has employees, the WAH Regs 2005 apply to all who control work at height, and CDM 2015 applies if it is a construction project.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'HASAWA 1974',
    category: 'Understanding Working at Height',
  },
  {
    id: 40,
    question:
      'Under LOLER 1998, what must the competent person provide after a thorough examination of lifting equipment used for work at height?',
    options: [
      'A written report including any defects and their significance, before the equipment is next used',
      'A verbal confirmation given to the operator, with the written report to follow within 28 days of it',
      'A green pass tag fixed to the equipment, with the report being kept by the hire company only',
      'A certificate of conformity, which needs to be reissued only once every two years or so',
    ],
    correctAnswer: 0,
    explanation:
      'LOLER 1998 requires the competent person to provide a written report of thorough examination. If a defect involving imminent danger is found, the report must be sent immediately to the employer and the HSE. The report must be received before the equipment is used again.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'LOLER 1998',
    category: 'Understanding Working at Height',
  },

  // ============================================================
  // CATEGORY 2: Access Equipment & Selection (Questions 41-80)
  // Section: Module 2
  // Difficulty: 14 basic, 18 intermediate, 8 advanced
  // ============================================================

  // --- Basic (41-54) ---
  {
    id: 41,
    question: 'What is the correct angle ratio for leaning a ladder against a wall?',
    options: [
      '1:2 ratio (1 out for every 2 up)',
      '1:4 ratio (1 out for every 4 up)',
      '1:3 ratio (1 out for every 3 up)',
      '1:5 ratio (1 out for every 5 up)',
    ],
    correctAnswer: 1,
    explanation:
      'The correct angle for a leaning ladder is a 1:4 ratio — for every 4 units of height, the base should be 1 unit out from the wall. This gives an angle of approximately 75 degrees, providing optimal stability and minimising the risk of the ladder slipping.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Ladder types and 1:4 ratio',
    category: 'Access Equipment & Selection',
  },
  {
    id: 42,
    question: "What does the '3-point contact' rule mean when using a ladder?",
    options: [
      'The ladder must be supported at three separate points along the whole of its length before any use at all',
      'Three separate checks — the footing, the angle and the tie — must be signed off before anyone climbs it',
      'The user must maintain two hands and one foot, or two feet and one hand, on the ladder at all times',
      'The ladder must be secured at the top, at the mid-point and at the base before anyone climbs it',
    ],
    correctAnswer: 2,
    explanation:
      'The 3-point contact rule means the climber must always have at least two hands and one foot, or two feet and one hand, in contact with the ladder. This ensures stability and reduces the chance of losing balance and falling.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: '3-point contact',
    category: 'Access Equipment & Selection',
  },
  {
    id: 43,
    question:
      'According to HSE guidance, ladders should generally only be used for work at height tasks lasting no more than how long?',
    options: [
      '10 minutes',
      '2 hours',
      '1 hour',
      '30 minutes',
    ],
    correctAnswer: 3,
    explanation:
      'HSE guidance states that ladders should only be used for short-duration tasks, typically no more than 30 minutes. If the task will take longer, a more suitable and safer means of access such as a scaffold or MEWP should be used.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: '<30 min rule',
    category: 'Access Equipment & Selection',
  },
  {
    id: 44,
    question: 'What colour scaffold tag indicates the scaffold is safe to use?',
    options: [
      'Green',
      'Amber',
      'Red',
      'Blue',
    ],
    correctAnswer: 0,
    explanation:
      'A green scaffold tag indicates that the scaffold has been inspected and is safe to use. An amber tag means it is incomplete or has restrictions, and a red tag means it must not be used. Always check the tag before accessing any scaffold.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Scaffold tags',
    category: 'Access Equipment & Selection',
  },
  {
    id: 45,
    question: 'How often must a scaffold on a construction site be inspected as a minimum?',
    options: [
      'Daily',
      'Every 7 days',
      'Every 14 days',
      'Monthly',
    ],
    correctAnswer: 1,
    explanation:
      'Under the Work at Height Regulations 2005, scaffolds must be inspected at least every 7 days. They must also be inspected before first use and after any event likely to have affected their stability, such as high winds or structural alteration.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: '7-day inspections',
    category: 'Access Equipment & Selection',
  },
  {
    id: 46,
    question: 'What type of MEWP has a platform that only moves vertically?',
    options: [
      'Telescopic boom lift',
      'Truck-mounted platform',
      'Scissor lift',
      'Articulated boom lift',
    ],
    correctAnswer: 2,
    explanation:
      'A scissor lift (also known as a vertical personnel platform) moves the platform only vertically using a criss-crossing scissor mechanism. It does not provide horizontal outreach, unlike boom-type MEWPs which can extend laterally.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'MEWP types',
    category: 'Access Equipment & Selection',
  },
  {
    id: 47,
    question: 'What does MEWP stand for?',
    options: [
      'Mechanical Elevated Working Position',
      'Multi-Elevation Work Platform',
      'Motorised External Work Platform',
      'Mobile Elevating Work Platform',
    ],
    correctAnswer: 3,
    explanation:
      'MEWP stands for Mobile Elevating Work Platform. MEWPs include scissor lifts, boom lifts, and mast climbers. They provide a safe working platform at height and must comply with LOLER 1998 and PUWER 1998.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'MEWP types',
    category: 'Access Equipment & Selection',
  },
  {
    id: 48,
    question: 'What is a podium step primarily designed for?',
    options: [
      'Low-level access with a secure enclosed working platform',
      'High-level external access on the face of multi-storey buildings',
      'Bridging gaps between two scaffold towers at the same level',
      'Providing a temporary ramp for moving materials up to a platform',
    ],
    correctAnswer: 0,
    explanation:
      'Podium steps provide a stable, enclosed working platform for low-level work, typically up to around 2 metres platform height. They have guard rails, a large platform, and lockable castors, making them much safer than stepladders for many tasks.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Podium steps',
    category: 'Access Equipment & Selection',
  },
  {
    id: 49,
    question: 'What is a hop-up?',
    options: [
      'A telescopic pole tool used for working on ceilings from the ground level below',
      'A lightweight, low-level portable working platform, usually around 500mm high',
      'A type of guard rail that is fitted around the open side of a stepladder platform',
      'A folding trestle used to support scaffold boards spanning between two fixed points',
    ],
    correctAnswer: 1,
    explanation:
      'A hop-up is a small, lightweight, portable platform typically around 500mm (half a metre) in height. It provides a stable base for very low-level work such as plastering or painting. It must be used on firm, level ground.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Hop-ups',
    category: 'Access Equipment & Selection',
  },
  {
    id: 50,
    question: 'What is the main purpose of toe boards on a scaffold platform?',
    options: [
      'To provide a footrest for the workers standing on the platform',
      'To help workers climb up onto the working platform',
      'To prevent materials and tools from falling off the edge',
      'To improve the appearance of the scaffold on the site',
    ],
    correctAnswer: 2,
    explanation:
      'Toe boards are fitted at the edge of scaffold platforms to prevent materials, tools, and debris from falling off. This protects people below from being struck by falling objects. Toe boards must be at least 150mm high.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Scaffold types/components',
    category: 'Access Equipment & Selection',
  },
  {
    id: 51,
    question: 'Which European standard applies to the classification of portable ladders?',
    options: [
      'EN 361',
      'EN 13374',
      'EN 1263',
      'EN 131',
    ],
    correctAnswer: 3,
    explanation:
      'EN 131 is the European standard covering the design, testing, and classification of portable ladders and stepladders. It specifies requirements for materials, dimensions, strength, and labelling that all compliant ladders must meet.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'EN 131',
    category: 'Access Equipment & Selection',
  },
  {
    id: 52,
    question: 'What is the main component used to connect scaffold tubes together?',
    options: [
      'Scaffold couplers (fittings)',
      'Welded steel brackets fixed to each tube',
      'Cable ties looped around the tube ends',
      'Threaded bolts passed through the tubes',
    ],
    correctAnswer: 0,
    explanation:
      'Scaffold tubes are connected using couplers (also called fittings or clips). The main types are right-angle couplers, swivel couplers, and sleeve couplers. They must be properly tightened and inspected to ensure the scaffold is structurally sound.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Scaffold types/components',
    category: 'Access Equipment & Selection',
  },
  {
    id: 53,
    question:
      'Which IPAF category covers the operation of scissor lifts (vertical personnel platforms)?',
    options: [
      'Category 1b (static boom)',
      'Category 3a (mobile vertical)',
      'Category 3b (mobile boom)',
      'Category 1a (static vertical)',
    ],
    correctAnswer: 1,
    explanation:
      'IPAF Category 3a covers mobile vertical personnel platforms, commonly known as scissor lifts. Category 3b covers mobile boom platforms. Categories 1a and 1b are for static (vehicle-mounted) verticals and booms respectively.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'IPAF categories',
    category: 'Access Equipment & Selection',
  },
  {
    id: 54,
    question: 'What does an amber scaffold tag indicate?',
    options: [
      'The scaffold has been fully inspected and is now safe for unrestricted use by all',
      'The scaffold must not be used by any person on site under any circumstances at all',
      'The scaffold is incomplete or has use restrictions — check details on the tag',
      'The scaffold is due to be dismantled some time within the next 24 hours',
    ],
    correctAnswer: 2,
    explanation:
      'An amber scaffold tag means the scaffold has restrictions or is incomplete. The tag will detail the specific limitations, such as which levels may be used or which loads are permitted. Workers must read and comply with the restrictions stated.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Scaffold tags',
    category: 'Access Equipment & Selection',
  },

  // --- Intermediate (55-72) ---
  {
    id: 55,
    question:
      'A ladder extends 3 metres above a landing point. How far should it extend above the stepping-off point?',
    options: [
      'At least 0.5 metres (approximately 3 rungs)',
      'There is no requirement for extension above the landing',
      'At least 1.5 metres (approximately 7 rungs)',
      'At least 1 metre (approximately 5 rungs)',
    ],
    correctAnswer: 3,
    explanation:
      'When using a ladder to access another level, it should extend at least 1 metre (approximately 5 rungs) above the stepping-off point. This provides a secure handhold while stepping onto and off the landing, reducing the risk of a fall.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Ladder types and 1:4 ratio',
    category: 'Access Equipment & Selection',
  },
  {
    id: 56,
    question: 'Under the NASC TG20 guidance, what is the purpose of a scaffold design check?',
    options: [
      'To confirm whether the scaffold complies with standard configurations or needs bespoke design',
      'To verify that all the scaffolders working on the site hold the correct CISRS qualifications for it',
      'To calculate the total hire cost of the scaffold for the whole duration of the project at the site',
      'To record the names of every worker who is permitted to access the scaffold on the site each day',
    ],
    correctAnswer: 0,
    explanation:
      'NASC TG20 provides guidance on standard scaffold configurations. A design check confirms whether the proposed scaffold falls within these standard configurations or whether a bespoke design calculation by a qualified engineer is required for the specific situation.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'NASC TG20',
    category: 'Access Equipment & Selection',
  },
  {
    id: 57,
    question: 'Before using a MEWP on site, what pre-use checks should the operator carry out?',
    options: [
      'A check that the fuel tank or the battery has sufficient charge for the shift, recorded on the plant log',
      'Visual inspection, function checks of controls, emergency lowering, tyres, and outriggers where fitted',
      'Confirmation that the operator holds a valid IPAF PAL card for the correct category of machine used',
      'A check of the platform guard rails and gate latch only, as the machine was examined at handover',
    ],
    correctAnswer: 1,
    explanation:
      'Before using a MEWP, the operator must carry out pre-use checks including visual inspection for damage, testing all controls and emergency lowering systems, checking tyre condition and pressures, and confirming outriggers (where fitted) function correctly.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'MEWP types',
    category: 'Access Equipment & Selection',
  },
  {
    id: 58,
    question:
      'What is the key difference between a telescopic boom lift and an articulated boom lift?',
    options: [
      'Telescopic booms are self-propelled and driven from the platform; articulated booms must always be towed into position by a vehicle',
      'Telescopic booms are always diesel powered for outdoor use; articulated booms are always battery powered for indoor use only on site',
      'Telescopic booms can only go straight up; articulated booms have a knuckle joint allowing them to reach up and over obstacles',
      'Telescopic booms move only vertically like a scissor lift; articulated booms move only horizontally along a fixed rail track',
    ],
    correctAnswer: 2,
    explanation:
      'A telescopic boom extends in a straight line, providing maximum horizontal outreach. An articulated boom has one or more knuckle (hinge) joints, allowing the platform to reach up and over obstacles, making it more versatile in congested areas.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'MEWP types',
    category: 'Access Equipment & Selection',
  },
  {
    id: 59,
    question: 'When should scaffold boards be discarded?',
    options: [
      'Once five years have passed from the date stamped on the end band, regardless of their condition',
      'When they fail a load test carried out at twice their rated working load',
      'When the painted identification band has worn away, even if the board itself is sound',
      'When they show signs of excessive warping, splitting, decay, or damage beyond acceptable limits',
    ],
    correctAnswer: 3,
    explanation:
      'Scaffold boards must be discarded when they show excessive warping, splitting, knot holes, decay, or any damage that could compromise their load-bearing capacity. Visual inspection should be carried out before each use and during 7-day inspections.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Scaffold types/components',
    category: 'Access Equipment & Selection',
  },
  {
    id: 60,
    question:
      'Which IPAF category would a worker need to operate a cherry picker (mobile boom lift)?',
    options: [
      'Category 3b',
      'Category 1b',
      'Category 3a',
      'Category 1a',
    ],
    correctAnswer: 0,
    explanation:
      "IPAF Category 3b covers mobile boom platforms, commonly known as cherry pickers. This includes both telescopic and articulated boom lifts that are self-propelled. The '3' denotes mobile (self-propelled) and 'b' denotes boom type.",
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'IPAF categories',
    category: 'Access Equipment & Selection',
  },
  {
    id: 61,
    question: "What is the purpose of a scaffold 'standard'?",
    options: [
      'The horizontal tube that supports the platform boards',
      'The vertical tube that transfers loads to the ground',
      'The diagonal tube that provides bracing',
      'The short tube connecting the scaffold to the building',
    ],
    correctAnswer: 1,
    explanation:
      'A standard is a vertical scaffold tube that transfers the load of the scaffold and its users down to the ground through base plates or sole boards. Standards form the main structural uprights of the scaffold framework.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Scaffold types/components',
    category: 'Access Equipment & Selection',
  },
  {
    id: 62,
    question: "What is a 'ledger' in scaffold terminology?",
    options: [
      'A vertical tube that transfers the scaffold loads down to the ground level below',
      'A diagonal tube that is fitted to provide bracing against any sideways movement',
      'A horizontal tube running parallel to the building face, connecting standards',
      'A short tube that ties the scaffold structure back to the face of the building',
    ],
    correctAnswer: 2,
    explanation:
      'A ledger is a horizontal scaffold tube that runs parallel to the face of the building and connects the standards together. Ledgers help distribute loads and provide a fixing point for transoms, which in turn support the scaffold boards.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Scaffold types/components',
    category: 'Access Equipment & Selection',
  },
  {
    id: 63,
    question:
      'A task involves painting a stairwell at heights up to 6 metres. Which equipment would typically be most suitable?',
    options: [
      'A standard leaning ladder footed on the lower stair tread',
      'A podium step placed on the staircase landing',
      'A hop-up positioned on the middle step of the stairwell',
      'A stairwell scaffold tower or stairwell MEWP',
    ],
    correctAnswer: 3,
    explanation:
      'A stairwell scaffold tower (with adjustable legs) or a specialist stairwell MEWP is designed for safe work on uneven surfaces like stairwells. Standard ladders and stepladders cannot be safely placed on stairs, and a hop-up would not reach 6 metres.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Equipment selection',
    category: 'Access Equipment & Selection',
  },
  {
    id: 64,
    question:
      'What is the minimum number of boards wide that a scaffold working platform should generally be?',
    options: [
      '4 boards wide',
      '3 boards wide (minimum 600mm)',
      '2 boards wide',
      '5 boards wide',
    ],
    correctAnswer: 0,
    explanation:
      'A scaffold working platform where work is being carried out should generally be at least 4 boards wide (approximately 870mm) for general work, or 3 boards (600mm) minimum for inspection and access. The exact width depends on the nature of the work.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Scaffold types/components',
    category: 'Access Equipment & Selection',
  },
  {
    id: 65,
    question:
      'EN 131 classifies portable ladders into different classes. Which class is appropriate for commercial/trade use?',
    options: [
      'Class EN 131 Domestic — suitable for occasional household use',
      'Class EN 131 Professional — suitable for trade use',
      'Class EN 131 Light Duty — suitable for low-load tasks only',
      'Class EN 131 Industrial — suitable for permanent fixed installation',
    ],
    correctAnswer: 1,
    explanation:
      'EN 131 Professional (sometimes referred to as the trade standard) is suitable for commercial and trade use. It specifies higher load ratings and durability than domestic classifications. Workers should always use ladders rated for professional/trade use.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'EN 131',
    category: 'Access Equipment & Selection',
  },
  {
    id: 66,
    question: 'When using a mobile scaffold tower, what must be done before moving it?',
    options: [
      'Leave one worker on the platform to steady the tower and to watch for any overhead obstructions while it is pushed',
      'Move it at walking pace while it is fully extended, provided that the stabilisers remain deployed throughout',
      'Ensure all personnel, tools, and materials are removed from the platform and the height is reduced if required',
      'Retract the stabilisers and outriggers so that the tower rolls freely, then redeploy them both on arrival',
    ],
    correctAnswer: 2,
    explanation:
      'Before moving a mobile scaffold tower, all personnel must descend, tools and materials must be removed or secured, and the tower height may need to be reduced per manufacturer instructions. The tower should only be moved on firm, level ground by pushing at the base.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Scaffold types/components',
    category: 'Access Equipment & Selection',
  },
  {
    id: 67,
    question:
      'What is the maximum recommended height-to-base ratio for a mobile scaffold tower used outdoors?',
    options: [
      '2:1',
      '5:1',
      '3.5:1',
      '3:1',
    ],
    correctAnswer: 3,
    explanation:
      'For outdoor use, a mobile scaffold tower should have a maximum height-to-minimum-base ratio of 3:1. For indoor use, this can be extended to 3.5:1. Outriggers or stabilisers can be used to effectively widen the base and allow greater heights.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Scaffold types/components',
    category: 'Access Equipment & Selection',
  },
  {
    id: 68,
    question: 'What must be in place before a scaffold is loaded with materials?',
    options: [
      'A completed inspection by a competent person confirming it is fit for purpose and adequate for the intended load',
      'A verbal assurance from the scaffolder who erected it that the structure will comfortably take the whole load on it',
      'A green tag that was fixed to the scaffold at any point within the previous month by anyone working on site at all',
      'Confirmation that the total weight of the materials is no more than that of one single operative on the lift',
    ],
    correctAnswer: 0,
    explanation:
      'A competent person must inspect the scaffold and confirm it is complete, structurally sound, and rated for the intended load before it is loaded with materials. Overloading a scaffold is a common cause of collapse and must be prevented through proper inspection.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: '7-day inspections',
    category: 'Access Equipment & Selection',
  },
  {
    id: 69,
    question: 'What is the primary advantage of using a podium step over a standard stepladder?',
    options: [
      'Podium steps are lighter than a stepladder and can easily be carried between rooms by one person alone',
      'Podium steps provide an enclosed platform with guard rails, giving a larger and safer working area',
      'Podium steps have self-levelling feet, so that they can be used safely on any uneven or sloping ground',
      'Podium steps allow a worker to reach a much greater height than a stepladder of the same size will allow',
    ],
    correctAnswer: 1,
    explanation:
      'The main advantage of podium steps is the enclosed platform with guard rails on all sides. This provides a much safer and more stable working area compared to the small top step of a stepladder, significantly reducing the risk of overbalancing.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Podium steps',
    category: 'Access Equipment & Selection',
  },
  {
    id: 70,
    question:
      'A worker needs to carry out a 2-hour task at 8 metres on the exterior of a building with good ground conditions. Which equipment is most appropriate?',
    options: [
      'A folding hop-up platform',
      'A leaning ladder',
      'A scissor lift MEWP',
      'A podium step',
    ],
    correctAnswer: 2,
    explanation:
      'A scissor lift MEWP is the most appropriate choice for a 2-hour task at 8 metres. Ladders are unsuitable for tasks over 30 minutes and at that height. Hop-ups and podium steps cannot reach 8 metres. The good ground conditions make a MEWP viable.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Equipment selection',
    category: 'Access Equipment & Selection',
  },
  {
    id: 71,
    question: 'What is a red scaffold tag used to indicate?',
    options: [
      'The scaffold has been inspected and is now safe for unrestricted use by all',
      'The scaffold has minor restrictions but may still be partly used by the gang',
      'The scaffold is reserved for use by a specific named contractor only',
      'The scaffold must NOT be used — it is incomplete, dangerous, or condemned',
    ],
    correctAnswer: 3,
    explanation:
      'A red scaffold tag means the scaffold must not be used under any circumstances. It may be incomplete, damaged, awaiting dismantling, or condemned. Any worker who sees a red tag must not access the scaffold and should report the situation to their supervisor.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Scaffold tags',
    category: 'Access Equipment & Selection',
  },
  {
    id: 72,
    question: 'Why is it important to secure a ladder at the top, bottom, or both?',
    options: [
      'To prevent the ladder from slipping, sliding, or falling — the primary cause of ladder-related accidents',
      'To increase the maximum permitted working duration at height from 30 minutes to a full working shift on site',
      'To allow the ladder to be leaned at a shallower angle than the 1:4 rule would otherwise permit on the site',
      'To remove the need for a second person to have to foot the ladder while it is being climbed by a worker above',
    ],
    correctAnswer: 0,
    explanation:
      'Securing a ladder prevents it from slipping at the base, sliding sideways, or falling backwards. Unsecured ladders are a leading cause of falls from height. The ladder should be tied at the top where possible, or secured at the base, or footed by a second person.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Ladder types and 1:4 ratio',
    category: 'Access Equipment & Selection',
  },

  // --- Advanced (73-80) ---
  {
    id: 73,
    question:
      'Under NASC TG20, what is the maximum height for a standard basic scaffold configuration without requiring a bespoke design?',
    options: [
      'Up to 15 metres',
      'Up to 50 metres',
      'Up to 25 metres',
      'There is no height limit in TG20',
    ],
    correctAnswer: 1,
    explanation:
      'NASC TG20 provides compliance sheets for tube and fitting scaffolds up to 50 metres in height for standard configurations. Above this height, or for non-standard configurations, a bespoke design calculation by a structural engineer is required.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'NASC TG20',
    category: 'Access Equipment & Selection',
  },
  {
    id: 74,
    question:
      'A MEWP is to be used on a public highway. Which additional considerations are required beyond standard site use?',
    options: [
      'No additional measures at all are needed provided that the MEWP has a current LOLER report on file',
      'A high-visibility vest for the operator and cones placed around the machine outriggers',
      'Chapter 8 traffic management, road closure permits, vehicle lighting, and potentially a banksman',
      'Verbal warnings given to any passing pedestrians and a temporary footway closure board',
    ],
    correctAnswer: 2,
    explanation:
      'Working on a public highway requires Chapter 8 compliant traffic management (cones, signs, barriers), potentially road closure permits from the local authority, additional vehicle lighting/beacons, and a banksman to manage traffic and pedestrian movements around the MEWP.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'MEWP types',
    category: 'Access Equipment & Selection',
  },
  {
    id: 75,
    question:
      'When selecting between a scissor lift and a boom lift, which factor is most decisive?',
    options: [
      'Which machine is the lighter colour and easier to spot on site',
      'Whether the platform is enclosed by guard rails on all four sides',
      'Which machine has the lower hire cost for the duration of the work',
      'Whether horizontal outreach beyond the base footprint is required',
    ],
    correctAnswer: 3,
    explanation:
      'The most decisive factor is whether horizontal outreach is needed. Scissor lifts only travel vertically — if the work position is not directly above where the machine can be placed, a boom lift is necessary. Other factors include height, ground conditions, and indoor/outdoor use.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Equipment selection',
    category: 'Access Equipment & Selection',
  },
  {
    id: 76,
    question:
      'A scaffold inspector discovers that swivel couplers have been used where right-angle couplers are specified in the design. What is the significance?',
    options: [
      'Swivel couplers have a lower safe working load than right-angle couplers and may compromise structural integrity',
      'Swivel couplers are lighter than right-angle couplers, so the scaffold will be easier and safer to erect on the site',
      'There is no significance, as all scaffold couplers of either pattern carry exactly the same safe working load in use',
      'Swivel couplers shed water better, so that the joint corrodes less and the whole structure lasts far longer',
    ],
    correctAnswer: 0,
    explanation:
      'Right-angle (load-bearing) couplers are designed to transfer the principal vertical loads between scaffold tubes, whereas swivel couplers are intended for bracing and have a lower rated slip resistance. Substituting swivels where right-angle couplers are specified can compromise the structural integrity of the scaffold, so the design must be followed precisely.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Scaffold types/components',
    category: 'Access Equipment & Selection',
  },
  {
    id: 77,
    question:
      'Under what circumstances would an IPAF PAL Card holder require additional training before operating a particular MEWP?',
    options: [
      'When the PAL card is within three months of its expiry date, at which point a full refresher course must then be completed',
      'When the specific machine type differs from the categories on their card, or when site-specific familiarisation is needed',
      'When the MEWP is to be operated above 15 metres, which requires a separate high-level endorsement to be added to the card first',
      'Additional training is never needed once a PAL card has been issued, as it covers all of the MEWP categories in use on site',
    ],
    correctAnswer: 1,
    explanation:
      "An IPAF PAL Card is category-specific (e.g. 3a for scissor lifts, 3b for booms). Operating a machine outside the cardholder's categories requires additional training. Additionally, site-specific familiarisation and machine-specific induction are always required regardless of card categories.",
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'IPAF categories',
    category: 'Access Equipment & Selection',
  },
  {
    id: 78,
    question: "What is a 'transom' in scaffold terminology, and why is it critical?",
    options: [
      'A vertical tube carrying the scaffold loads down to the ground; it bears the whole of the platform weight above',
      'A diagonal bracing tube that prevents sideways sway; it locks the whole of the frame square and true',
      'A horizontal tube spanning between ledgers at right angles to the building; it supports the scaffold boards',
      'A short tie tube fixing the scaffold to the building; it prevents the scaffold pulling away from it',
    ],
    correctAnswer: 2,
    explanation:
      'A transom is a horizontal tube that spans between the inner and outer ledgers at right angles to the building face. Transoms directly support the scaffold boards and transfer the load from the platform to the ledgers and standards. Incorrectly spaced transoms can cause board failure.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Scaffold types/components',
    category: 'Access Equipment & Selection',
  },
  {
    id: 79,
    question:
      'A tower scaffold is to be erected to 8 metres height outdoors with a 1.4m x 2.0m base. According to the 3:1 rule, is this permissible without stabilisers?',
    options: [
      'Yes — 8 divided by the 2.0m base gives 4:1, and outdoors the rule permits a ratio of up to 5:1',
      'No — tower scaffolds may never exceed 4 metres of platform height when they are used outdoors',
      'Yes — the 3:1 rule applies only to towers over 10 metres, so this 8 metres is permitted',
      'No — the height-to-narrowest-base ratio is 8:1.4 = 5.7:1, exceeding the 3:1 outdoor limit',
    ],
    correctAnswer: 3,
    explanation:
      'The height-to-base ratio must be calculated using the narrowest base dimension. Here, 8m height divided by 1.4m base gives a ratio of approximately 5.7:1, which far exceeds the 3:1 limit for outdoor use. Stabilisers or outriggers must be fitted to widen the effective base.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Scaffold types/components',
    category: 'Access Equipment & Selection',
  },
  {
    id: 80,
    question:
      'EN 131-1 specifies that a ladder must withstand a vertical test load applied to a rung. What is the minimum test load for a professional-grade ladder?',
    options: [
      '150 kg (1.5 kN)',
      '100 kg',
      '260 kg (2.6 kN)',
      '500 kg (5 kN)',
    ],
    correctAnswer: 0,
    explanation:
      'EN 131-1 requires professional-grade ladders to withstand a minimum test load of 150 kg (1.5 kN) applied vertically to the centre of a rung. This ensures the ladder can safely support a worker plus tools and equipment during normal professional use.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'EN 131',
    category: 'Access Equipment & Selection',
  },

  // ============================================================
  // CATEGORY 3: Fall Protection & Prevention (Questions 81-120)
  // Section: Module 3
  // Questions 81-100 here; 101-120 in next append
  // Difficulty for 81-100: 7 basic, 9 intermediate, 4 advanced
  // ============================================================

  // --- Basic (81-87) ---
  {
    id: 81,
    question: "What is the difference between 'collective' and 'personal' fall protection?",
    options: [
      'Collective protection is worn by the individual worker; personal protection guards the whole of the site',
      'Collective protects everyone in the area without individual action; personal protects only the wearer',
      'Collective protection applies indoors only; personal protection applies outdoors only on any site at all',
      'Collective protection is used below 2 metres; personal protection is used only above 2 metres on site itself',
    ],
    correctAnswer: 1,
    explanation:
      'Collective fall protection (e.g. guard rails, safety nets) protects all workers in the area without requiring individual action. Personal fall protection (e.g. harnesses, lanyards) only protects the individual wearing it. The hierarchy requires collective measures to be considered first.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Collective vs personal',
    category: 'Fall Protection & Prevention',
  },
  {
    id: 82,
    question: 'What is the minimum height for a guard rail (top rail) on a working platform?',
    options: [
      '750mm above the platform',
      '900mm above the platform',
      '950mm above the platform',
      '1100mm above the platform',
    ],
    correctAnswer: 2,
    explanation:
      'The minimum height for the top guard rail on a working platform is 950mm above the platform surface. This height is specified to prevent a person from toppling over the rail. An intermediate rail or equivalent protection must also be provided.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Guard rails (950mm, EN 13374)',
    category: 'Fall Protection & Prevention',
  },
  {
    id: 83,
    question: 'Which European standard covers temporary edge protection systems (guard rails)?',
    options: [
      'EN 1263',
      'EN 354',
      'EN 361',
      'EN 13374',
    ],
    correctAnswer: 3,
    explanation:
      'EN 13374 specifies the requirements for temporary edge protection systems used during construction and maintenance work. It classifies guard rail systems into three classes (A, B, and C) based on the slope of the surface being protected.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Guard rails (950mm, EN 13374)',
    category: 'Fall Protection & Prevention',
  },
  {
    id: 84,
    question: 'What is the purpose of a full-body safety harness?',
    options: [
      'To distribute fall arrest forces across the body and keep the wearer upright during and after a fall',
      'To concentrate all of the arrest forces onto the waist in order to bring the fall to a much quicker stop',
      'To physically prevent the wearer from ever reaching an edge from which they might fall at all',
      'To support the wearer in a seated position for prolonged and comfortable working at height on site',
    ],
    correctAnswer: 0,
    explanation:
      'A full-body safety harness distributes the forces generated during a fall arrest across the shoulders, chest, and thighs. It keeps the wearer in an upright position during and after the fall, reducing the risk of injury and enabling rescue.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Harness (EN 361)',
    category: 'Fall Protection & Prevention',
  },
  {
    id: 85,
    question: 'Which European standard covers full-body harnesses?',
    options: [
      'EN 354',
      'EN 361',
      'EN 1263',
      'EN 355',
    ],
    correctAnswer: 1,
    explanation:
      'EN 361 specifies the requirements for full-body harnesses used as a component of a personal fall protection system. It covers the design, materials, testing, and marking requirements that all compliant harnesses must meet.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Harness (EN 361)',
    category: 'Fall Protection & Prevention',
  },
  {
    id: 86,
    question: 'What is a safety net designed to do in a work at height scenario?',
    options: [
      'Prevent workers from gaining access to any dangerous areas',
      'Support the tools and materials placed on a scaffold platform',
      'Catch a falling worker and reduce the impact of the fall',
      'Act as a sunshade over the whole of the working area',
    ],
    correctAnswer: 2,
    explanation:
      'Safety nets are designed to catch a worker who has fallen, absorbing the energy of the fall and reducing the impact on the body. They are a collective fall mitigation measure, positioned below the working area. They comply with EN 1263.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Safety nets (EN 1263)',
    category: 'Fall Protection & Prevention',
  },
  {
    id: 87,
    question: 'Which European standard covers lanyards used in personal fall protection systems?',
    options: [
      'EN 361',
      'EN 131',
      'EN 13374',
      'EN 354',
    ],
    correctAnswer: 3,
    explanation:
      'EN 354 specifies requirements for lanyards — the connecting elements between a harness and an anchor point. Lanyards must have a maximum length of 2 metres. They may be combined with energy absorbers covered by EN 355.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Lanyards (EN 354/355)',
    category: 'Fall Protection & Prevention',
  },

  // --- Intermediate (88-96) ---
  {
    id: 88,
    question:
      'What is the maximum permitted free-fall distance when using a personal fall arrest system?',
    options: [
      '6 metres',
      '4 metres',
      '2 metres',
      '10 metres',
    ],
    correctAnswer: 0,
    explanation:
      'The maximum free-fall distance permitted when using a personal fall arrest system is 6 metres, including the deployment of any energy absorber. However, the total fall distance must also be calculated to ensure there is sufficient clearance below to avoid striking the ground or an obstruction.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Harness (EN 361)',
    category: 'Fall Protection & Prevention',
  },
  {
    id: 89,
    question: 'What is an energy absorber and which European standard covers it?',
    options: [
      'A device which locks automatically when any sudden pull is detected on the line; EN 360',
      'A device that limits the force transmitted to the body during fall arrest; EN 355',
      'A connecting element fitted between the harness and a suitable anchor point; EN 354',
      'A structural fixing on the building or roof that the lanyard is connected to; EN 795',
    ],
    correctAnswer: 1,
    explanation:
      "An energy absorber (covered by EN 355) is a component of a fall arrest system that deforms or tears during a fall to limit the maximum arrest force transmitted to the wearer's body to no more than 6 kN. This significantly reduces the risk of injury.",
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Lanyards (EN 354/355)',
    category: 'Fall Protection & Prevention',
  },
  {
    id: 90,
    question:
      'EN 13374 classifies guard rail systems into three classes. Class A is suitable for which type of surface?',
    options: [
      'Steeply sloping surfaces between 30 and 45 degrees',
      'Vertical surfaces such as building facades and walls',
      'Flat or low-slope surfaces up to 10 degrees',
      'Surfaces sloping between 10 and 30 degrees',
    ],
    correctAnswer: 2,
    explanation:
      'EN 13374 Class A edge protection is suitable for flat or low-slope surfaces up to 10 degrees. Class B covers slopes from 10 to 30 degrees, and Class C covers slopes from 30 to 45 degrees, with progressively higher load and retention requirements.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Guard rails (950mm, EN 13374)',
    category: 'Fall Protection & Prevention',
  },
  {
    id: 91,
    question:
      'Why must a rescue plan be in place before any worker uses a personal fall arrest system?',
    options: [
      'Because the energy absorber must be replaced after every single deployment, and a spare one must be kept close to hand',
      'Because guard rails and other collective measures cannot be fitted at all once a harness is in use on site',
      'Because a personal fall arrest system always reduces the maximum free-fall distance down to zero in every case',
      'Because a suspended worker can develop suspension trauma within minutes, which can be fatal if rescue is delayed',
    ],
    correctAnswer: 3,
    explanation:
      'Suspension trauma (also called harness hang syndrome) can occur when a worker is suspended motionless in a harness. Blood pools in the legs, and without timely rescue, loss of consciousness and death can occur within 15-20 minutes. A rescue plan is a legal requirement.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Harness (EN 361)',
    category: 'Fall Protection & Prevention',
  },
  {
    id: 92,
    question:
      'What is the maximum distance a safety net should be positioned below the working area?',
    options: [
      '2 metres',
      '6 metres',
      '10 metres',
      '1 metre',
    ],
    correctAnswer: 0,
    explanation:
      'Safety nets should be positioned as close as practicable to the working area, and generally no more than 2 metres below it. The greater the fall distance into the net, the higher the impact force and the risk of injury or the net contacting structures below.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Safety nets (EN 1263)',
    category: 'Fall Protection & Prevention',
  },
  {
    id: 93,
    question: 'What is the maximum length of a lanyard under EN 354?',
    options: [
      '1 metre',
      '2 metres',
      '3 metres',
      '1.5 metres',
    ],
    correctAnswer: 1,
    explanation:
      'EN 354 specifies that a lanyard must not exceed 2 metres in length, including any terminal connectors. This limits the free-fall distance and reduces the forces experienced during fall arrest. Shorter lanyards are always preferable to reduce fall distance.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Lanyards (EN 354/355)',
    category: 'Fall Protection & Prevention',
  },
  {
    id: 94,
    question: 'When should a full-body harness be removed from service and not used?',
    options: [
      'If the manufacturer has issued a formal product recall, or where the harness has already been repaired by an approved centre off site',
      'If it has been in storage unused for more than twelve months without any recorded interim inspection being carried out on it at all',
      'If it has been subjected to a fall arrest, shows signs of damage, wear, or chemical exposure, or has passed its service life',
      'If it has been worn by more than one named user, since a harness is always issued to one single named person only on site',
    ],
    correctAnswer: 2,
    explanation:
      "A harness must be removed from service if it has arrested a fall (even once), shows visible damage, wear, mildew, or chemical contamination, or has exceeded the manufacturer's recommended service life. Pre-use inspections must be carried out before every use.",
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Harness (EN 361)',
    category: 'Fall Protection & Prevention',
  },
  {
    id: 95,
    question:
      'Why are collective fall protection measures preferred over personal fall protection in the hierarchy?',
    options: [
      'Because collective measures are always far cheaper to buy and to fit than personal protection',
      'Because personal fall protection is prohibited under the Work at Height Regulations 2005 entirely',
      'Because collective measures never require any inspection or any maintenance work at all on site',
      'Because they protect all workers without relying on individual compliance or correct fitting',
    ],
    correctAnswer: 3,
    explanation:
      'Collective measures such as guard rails and safety nets protect everyone in the area automatically, without requiring individual action, training, or correct fitting. Personal protection relies on each worker wearing their equipment correctly, which introduces human error.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Collective vs personal',
    category: 'Fall Protection & Prevention',
  },
  {
    id: 96,
    question: 'What is the function of the dorsal (back) attachment point on a full-body harness?',
    options: [
      'The primary attachment point for fall arrest — it positions the arrest force at the centre of the back',
      'The attachment point that is used for work positioning and seated suspension, taking the load at the waist',
      'The attachment point reserved for connecting a guided type fall arrester on a ladder safety system',
      'The attachment point that is used for hauling tools and materials up to the worker working above',
    ],
    correctAnswer: 0,
    explanation:
      'The dorsal (back) D-ring is the primary fall arrest attachment point. Positioned between the shoulder blades, it ensures that during a fall the wearer is arrested in an upright position with the force distributed correctly across the harness webbing.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Harness (EN 361)',
    category: 'Fall Protection & Prevention',
  },

  // --- Advanced (97-100) ---
  {
    id: 97,
    question:
      'When calculating total fall distance for a personal fall arrest system, which factors must be included?',
    options: [
      'The free-fall distance and the height of the anchor point above the working platform, plus a one metre safety margin below the feet',
      'Free-fall distance, energy absorber deployment, harness stretch, D-ring shift, and a safety clearance below the worker\'s feet',
      'The length of the lanyard, the height of the anchor point above, and the reach of the rescue equipment held on the site that day',
      'The energy absorber deployment and the harness stretch alone, since free fall is eliminated by a fixed anchor point overhead',
    ],
    correctAnswer: 1,
    explanation:
      "Total fall distance includes: the free-fall distance before the lanyard becomes taut, the energy absorber deployment (up to 1.75m), harness stretch and D-ring shift (approx 0.5m), and a minimum 1m safety clearance below the worker's feet. All must be calculated to avoid ground strike.",
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'Harness (EN 361)',
    category: 'Fall Protection & Prevention',
  },
  {
    id: 98,
    question:
      'EN 1263-1 specifies that safety nets must be tested to withstand the impact of a test mass dropped from a specified height. What mass and drop height are used for the standard test?',
    options: [
      '50 kg from 3 metres',
      '75 kg from 5 metres',
      '100 kg from 7 metres',
      '200 kg from 10 metres',
    ],
    correctAnswer: 2,
    explanation:
      'EN 1263-1 requires safety nets to be tested by dropping a 100 kg test mass from a height of 7 metres. This simulates the impact of a falling worker and validates that the net and its fixings can arrest the fall without failure or excessive deflection.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'Safety nets (EN 1263)',
    category: 'Fall Protection & Prevention',
  },
  {
    id: 99,
    question:
      'A worker wearing a full-body harness with a 1.5m energy-absorbing lanyard is attached to an anchor point at foot level. Assuming the energy absorber deploys by 1.75m and allowing 0.5m for harness shift plus 1m clearance, what is the minimum fall clearance required below the working level?',
    options: [
      '3.75 metres',
      '6.75 metres',
      '5.75 metres',
      '4.75 metres',
    ],
    correctAnswer: 3,
    explanation:
      'The calculation is: lanyard length (1.5m) + energy absorber deployment (1.75m) + harness shift (0.5m) + safety clearance (1.0m) = 4.75m. When the anchor is at foot level, the worker may free-fall the full lanyard length before the system engages, requiring this total clearance.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'Lanyards (EN 354/355)',
    category: 'Fall Protection & Prevention',
  },
  {
    id: 100,
    question:
      'EN 13374 Class C edge protection is designed for surfaces with slopes between 30 and 45 degrees. What additional requirement does Class C have compared to Class A?',
    options: [
      'Class C must include a mesh infill or panel capable of withstanding the dynamic forces of a person sliding down the slope',
      'Class C requires the top rail to be raised to a minimum height of 1500mm above the sloping working surface at all times on the site',
      'Class C must be constructed entirely from steel scaffold tube rather than from proprietary aluminium components of any kind',
      'Class C needs only a single top rail, because the steep pitch keeps workers pressed against the roof surface throughout the work',
    ],
    correctAnswer: 0,
    explanation:
      'Class C edge protection must include a mesh infill or solid panel to catch a person sliding down the steep slope. Unlike Class A (for flat/near-flat surfaces) where simple rails suffice, Class C must resist the dynamic impact force of a sliding body, requiring substantially stronger construction.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'Guard rails (950mm, EN 13374)',
    category: 'Fall Protection & Prevention',
  },
  // --- Questions 101-200 continue below ---
  // =======================================================================
  // FALL PROTECTION & PREVENTION — 20 questions (id 101–120), Module 3
  // =======================================================================

  // --- basic (7) ---
  {
    id: 101,
    question: 'What does the abbreviation SRL stand for in fall protection equipment?',
    options: [
      'Safety Retractable Lanyard',
      'Self-Retracting Lifeline',
      'Standard Restraint Line',
      'Secured Rope Link',
    ],
    correctAnswer: 1,
    explanation:
      'SRL stands for Self-Retracting Lifeline. It is a fall arrest device that allows free movement whilst working and automatically locks when a sudden pull or fall is detected, limiting the fall distance.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Self-Retracting Lifelines',
    category: 'Fall Protection & Prevention',
  },
  {
    id: 102,
    question:
      'What is the minimum rated strength required for a single-person anchor point under EN 795?',
    options: [
      '6 kN',
      '15 kN',
      '12 kN',
      '10 kN',
    ],
    correctAnswer: 2,
    explanation:
      'EN 795 specifies that a single-person anchor point must withstand a minimum static strength of 12 kN. This ensures the anchor can sustain the dynamic forces generated during a fall arrest event.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Anchor Points',
    category: 'Fall Protection & Prevention',
  },
  {
    id: 103,
    question:
      'What is the key difference between a fall arrest system and a fall restraint system?',
    options: [
      'Fall restraint is used only indoors; fall arrest is used only outdoors on any construction site at all',
      'Fall restraint requires a full body harness; fall arrest requires only a waist belt to be worn',
      'Fall restraint is for one worker only; fall arrest protects several workers at the same time',
      'Fall restraint prevents the user reaching a fall edge; fall arrest stops a fall after it begins',
    ],
    correctAnswer: 3,
    explanation:
      'A fall restraint system physically prevents the worker from reaching a position where a fall could occur. A fall arrest system allows access to the edge but is designed to safely stop a fall that has already begun, using energy-absorbing components.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Fall Arrest vs Restraint',
    category: 'Fall Protection & Prevention',
  },
  {
    id: 104,
    question: 'Which of the following materials is commonly classified as a fragile surface?',
    options: [
      'Fibre cement sheeting',
      'Steel decking with anti-slip coating',
      'Reinforced concrete slab',
      'Solid timber boarding',
    ],
    correctAnswer: 0,
    explanation:
      'Fibre cement sheeting is a well-known fragile material that cannot safely support the weight of a person. Other common fragile surfaces include roof lights, liner panels, and corroded metal sheeting. Workers must never walk directly on fragile surfaces.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Fragile Surfaces',
    category: 'Fall Protection & Prevention',
  },
  {
    id: 105,
    question: 'What is the primary purpose of a crawling board when working on a fragile roof?',
    options: [
      'To give a better view of the work area',
      "To spread the worker's weight over a larger area of the roof",
      'To prevent tools from rolling off the roof',
      'To provide a comfortable resting surface',
    ],
    correctAnswer: 1,
    explanation:
      "Crawling boards (also called roof ladders or cat ladders) are designed to spread the worker's weight over a larger area of the fragile roof surface. This significantly reduces the point loading and the risk of breaking through the material.",
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Crawling Boards',
    category: 'Fall Protection & Prevention',
  },
  {
    id: 106,
    question:
      'How often must a full-body harness used as part of a fall arrest system undergo a thorough examination under LOLER 1998?',
    options: [
      'Every 3 months',
      'Every 12 months',
      'Every 6 months',
      'Every 24 months',
    ],
    correctAnswer: 2,
    explanation:
      'Under the Lifting Operations and Lifting Equipment Regulations 1998 (LOLER), equipment used for arresting falls must receive a thorough examination by a competent person at least every 6 months. This is in addition to the pre-use checks carried out by the user.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'LOLER Thorough Examination',
    category: 'Fall Protection & Prevention',
  },
  {
    id: 107,
    question: 'Which HSE guidance document specifically addresses safety in roof work?',
    options: [
      'HSG245',
      'HSG65',
      'HSG150',
      'HSG33',
    ],
    correctAnswer: 3,
    explanation:
      "HSG33 'Health and Safety in Roof Work' is the HSE's key guidance document covering the hazards and safe working practices associated with all types of roof work. It provides practical advice on planning, risk assessment, and selecting the right access and fall protection equipment.",
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'HSG33 Roof Work',
    category: 'Fall Protection & Prevention',
  },

  // --- intermediate (9) ---
  {
    id: 108,
    question:
      'When calculating the required clearance distance for a fall arrest system, which of the following factors must be included?',
    options: [
      'Lanyard length, deceleration distance, height of worker below anchor, and a safety margin',
      'The lanyard length and the deceleration distance, the harness stretch being negligible',
      'The height of the anchor point above ground and the length of the rescue line',
      'The weight of the worker with tools and the rated capacity of the anchor point',
    ],
    correctAnswer: 0,
    explanation:
      "Clearance distance calculation must account for the full lanyard deployment length, the energy absorber deceleration distance (typically up to 1.75 m), the distance from the anchor to the worker's dorsal D-ring, the worker's height below the D-ring, and an additional safety margin of at least 1 metre.",
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Clearance Distance Calculation',
    category: 'Fall Protection & Prevention',
  },
  {
    id: 109,
    question:
      'An SRL compliant with EN 360 has a maximum permissible arrest distance of what value?',
    options: [
      '0.6 m',
      '1.4 m',
      '1.0 m',
      '2.0 m',
    ],
    correctAnswer: 1,
    explanation:
      'Under EN 360, the maximum permissible arrest distance for a self-retracting lifeline is 1.4 metres when tested with a 100 kg mass. This shorter arrest distance compared to a standard energy-absorbing lanyard (up to 1.75 m) makes SRLs advantageous where clearance is limited.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Self-Retracting Lifelines',
    category: 'Fall Protection & Prevention',
  },
  {
    id: 110,
    question: 'A work positioning system is best described as one that:',
    options: [
      'Prevents the worker from ever reaching an edge from which a fall could occur',
      'Catches the worker after a fall has begun and absorbs the impact energy',
      'Supports the worker in tension or suspension so they can work hands-free at the work location',
      'Lowers the worker to the ground automatically once the task is complete',
    ],
    correctAnswer: 2,
    explanation:
      'A work positioning system holds the user in place by means of a belt or harness connected to a reliable anchorage, allowing them to work hands-free whilst being supported in tension or partial suspension. It is commonly used by linesmen on utility poles and steelworkers on structural frameworks.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Work Positioning Systems',
    category: 'Fall Protection & Prevention',
  },
  {
    id: 111,
    question:
      'During a pre-use inspection of a full-body harness, a worker discovers stitching that appears to be cut on the dorsal D-ring attachment. What should they do?',
    options: [
      'Continue to use the harness for the rest of the shift and report the damage at the end of the day',
      'Repair the stitching with strong polyester thread and re-inspect it before the next use',
      'Use the harness only for light, short-duration tasks where a fall is unlikely to occur',
      'Immediately withdraw the harness from service, tag it as defective, and report it to their supervisor',
    ],
    correctAnswer: 3,
    explanation:
      'Any damage to load-bearing stitching on a harness is a critical defect. The harness must be immediately withdrawn from service, clearly tagged as defective to prevent others using it, and reported to a supervisor. The harness should then be assessed by a competent person.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Harness Inspection',
    category: 'Fall Protection & Prevention',
  },
  {
    id: 112,
    question:
      'Which type of EN 795 anchor device is a single-point non-structural anchor designed to be fixed to a vertical, horizontal, or inclined surface?',
    options: [
      'Type A',
      'Type B',
      'Type C',
      'Type E',
    ],
    correctAnswer: 0,
    explanation:
      'EN 795 Type A anchor devices are structural anchors designed to be fixed to roofs, walls, or other surfaces. Type B is a transportable temporary device, Type C is a horizontal flexible anchor line, and Type E is a deadweight anchor. Each type suits different site conditions.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Anchor Points',
    category: 'Fall Protection & Prevention',
  },
  {
    id: 113,
    question:
      'Roof lights are classified as fragile surfaces. What is the recommended minimum protection measure when working near roof lights?',
    options: [
      'Simply paint the roof lights a bright colour to warn workers',
      'Cover them with suitable load-bearing material and install barriers around them',
      'Display a warning sign at the access point and rely on worker awareness',
      'Walk only on the frame surrounding each roof light without further protection',
    ],
    correctAnswer: 1,
    explanation:
      'Roof lights must be covered with load-bearing covers that are clearly marked and secured so they cannot be displaced. Additionally, suitable barriers such as guard rails should be installed around them. Simply marking or painting roof lights is insufficient to prevent falls through them.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Fragile Surfaces',
    category: 'Fall Protection & Prevention',
  },
  {
    id: 114,
    question:
      'What is the maximum permissible free fall distance when using a fall arrest system with an energy-absorbing lanyard?',
    options: [
      '1.0 m',
      '4.0 m',
      '2.0 m',
      '1.8 m',
    ],
    correctAnswer: 2,
    explanation:
      "When using a standard energy-absorbing lanyard as part of a fall arrest system, the free fall distance must not exceed 2.0 metres. If the potential free fall is greater, alternative equipment such as an SRL should be specified to reduce the arrest forces on the user's body.",
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Fall Arrest vs Restraint',
    category: 'Fall Protection & Prevention',
  },
  {
    id: 115,
    question: 'When must a harness be discarded, even if it passes a visual inspection?',
    options: [
      'After it has been stored in a bag for more than 6 months',
      'After it has been cleaned with mild soap and water',
      'After it has been worn by more than one user',
      'After it has been subjected to a fall arrest event',
    ],
    correctAnswer: 3,
    explanation:
      'A harness must be withdrawn from service and discarded (or returned to the manufacturer for assessment) after it has been subjected to a fall arrest event. The dynamic forces during a fall can cause invisible damage to webbing fibres and stitching that compromise future performance.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'When to Discard Harness',
    category: 'Fall Protection & Prevention',
  },
  {
    id: 116,
    question:
      'Liner panels beneath profiled metal roofing sheets are a common fragile surface hazard. In what situation is the risk of falling through liner panels greatest?',
    options: [
      'During re-roofing work when the top profiled sheets have been removed exposing the liner below',
      'After the roof has been fully re-clad, when the new profiled sheets are walked on directly',
      'When the roof surface is wet from rain or covered in frost, making the panels slippery',
      'When the building below is occupied, because the extra load on the panels is greater',
    ],
    correctAnswer: 0,
    explanation:
      'The risk from fragile liner panels is greatest during re-roofing when the upper profiled metal sheets are removed, exposing the thin liner panels underneath. Workers may mistakenly assume the liner can support their weight, but these panels are not designed to bear any load.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Fragile Surfaces',
    category: 'Fall Protection & Prevention',
  },

  // --- advanced (4) ---
  {
    id: 117,
    question:
      'A worker using a 2 m energy-absorbing lanyard is anchored at foot level. The dorsal D-ring is 1.5 m above the standing surface. The energy absorber has a maximum deployment of 1.75 m. Including a 1 m safety margin, what is the minimum clearance distance required below the working level?',
    options: [
      '4.75 m',
      '6.25 m',
      '5.25 m',
      '7.00 m',
    ],
    correctAnswer: 1,
    explanation:
      'The clearance calculation is: lanyard length (2.0 m) + energy absorber deployment (1.75 m) + distance from D-ring to feet (1.5 m) + safety margin (1.0 m) = 6.25 m. If the available clearance below the work level is less than 6.25 m, this system configuration is unsuitable and a shorter lanyard or SRL must be used.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'Clearance Distance Calculation',
    category: 'Fall Protection & Prevention',
  },
  {
    id: 118,
    question:
      'Under EN 795, a Type C horizontal flexible anchor line is being installed for 3 simultaneous users. What is the minimum required static strength for this system?',
    options: [
      '12 kN',
      '15 kN',
      '21 kN',
      '18 kN',
    ],
    correctAnswer: 2,
    explanation:
      'For a Type C horizontal flexible anchor line, the minimum static strength is 12 kN for the first user, plus an additional 1 kN for each additional user according to EN 795 principles. However, system design must also account for the significant deflection forces. Many manufacturers specify 12 kN + 3 kN per additional user, giving 21 kN for 3 users, to provide adequate safety margins.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'Anchor Points',
    category: 'Fall Protection & Prevention',
  },
  {
    id: 119,
    question:
      'A competent person is conducting a 6-monthly LOLER thorough examination of an SRL. Which of the following would NOT typically be assessed during this examination?',
    options: [
      'Correct operation of the braking mechanism under load',
      'Condition of the cable or webbing for corrosion or fraying',
      'Housing integrity, label legibility and certification',
      'The psychological readiness of the intended user',
    ],
    correctAnswer: 3,
    explanation:
      'A LOLER thorough examination assesses the physical condition and mechanical function of the equipment: braking mechanism, internal lifeline condition, housing integrity, labels, and certification records. The psychological readiness of the user is not part of an equipment examination — it falls under competency assessment and training.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'LOLER Thorough Examination',
    category: 'Fall Protection & Prevention',
  },
  {
    id: 120,
    question:
      'On a large commercial re-roofing project involving fragile cement fibre sheets and multiple roof lights, the hierarchy of control for preventing falls through fragile surfaces should prioritise which approach first?',
    options: [
      'Working from underneath using a MEWP or mobile scaffold tower to avoid being on the fragile surface at all',
      'Issuing every worker with a personal fall arrest harness and running lines before any other measure',
      'Installing safety netting immediately beneath the fragile roof sheets before any other measure',
      'Covering the fragile sheets with load-bearing crawling boards and staging before any other measure',
    ],
    correctAnswer: 0,
    explanation:
      'The hierarchy of control requires avoiding work on fragile surfaces entirely where reasonably practicable. Working from below using a MEWP or scaffold tower eliminates exposure to the fragile roof altogether. Only when avoidance is not reasonably practicable should collective protection (netting, covers, barriers) and then personal protection (harnesses) be considered in that order.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'HSG33 Roof Work',
    category: 'Fall Protection & Prevention',
  },

  // =======================================================================
  // SAFE SYSTEMS OF WORK — 40 questions (id 121–160), Module 4
  // =======================================================================

  // --- basic (14) ---
  {
    id: 121,
    question:
      'Under Regulation 4 of the Work at Height Regulations 2005, what is the first duty of every employer in relation to work at height?',
    options: [
      'Use work equipment or other measures to prevent falls',
      'Avoid work at height where it is reasonably practicable to do so',
      'Provide every worker with a personal fall arrest harness',
      'Minimise the distance and consequences of any potential fall',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 4 establishes a clear hierarchy: first avoid work at height altogether if it is reasonably practicable. Only where it cannot be avoided should measures be taken to prevent falls, and then to minimise the distance and consequences of any fall.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'WAH Regs Reg 4',
    category: 'Safe Systems of Work',
  },
  {
    id: 122,
    question: "What is the definition of a 'competent person' in the context of work at height?",
    options: [
      'Any person holding a current first aid at work certificate and a valid CSCS card',
      'A person who has worked in the construction industry for at least five years',
      'A person with sufficient training, experience, and knowledge to carry out the task safely',
      'Any person formally appointed in writing as a site supervisor or line manager',
    ],
    correctAnswer: 2,
    explanation:
      'A competent person is someone who has sufficient training, practical experience, and knowledge relevant to the nature of the work to enable them to identify risks and implement appropriate controls. Competence is task-specific and must be proportionate to the complexity of the work.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Competent Person Definition',
    category: 'Safe Systems of Work',
  },
  {
    id: 123,
    question:
      'At what wind speed is it generally recommended to stop most work at height activities?',
    options: [
      'Above 40 mph (Force 8)',
      'Above 25 mph (Force 7)',
      'Above 10 mph (Force 3)',
      'Above 17 mph (Force 5)',
    ],
    correctAnswer: 3,
    explanation:
      'As a general guideline, work at height should cease when wind speeds exceed approximately 17 mph or Beaufort Force 5. However, lighter structures such as scaffold sheeting and tower scaffolds may need to stop at lower wind speeds. A site-specific risk assessment should always determine the safe threshold.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Weather Limits',
    category: 'Safe Systems of Work',
  },
  {
    id: 124,
    question: 'What is the primary purpose of a permit-to-work system for work at height?',
    options: [
      'To provide a formal documented system of checks and authorisations before high-risk work begins',
      'To record the hours each worker spends at height so that height allowances can be paid',
      'To replace the need for a separate risk assessment and method statement for the task',
      'To grant blanket permission for all work at height for the duration of the project',
    ],
    correctAnswer: 0,
    explanation:
      'A permit-to-work (PTW) is a formal written system that ensures all necessary safety checks, precautions, and authorisations are completed before high-risk work begins. It controls the sequence of work, identifies hazards, and ensures clear communication between all parties involved.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Permit-to-Work Systems',
    category: 'Safe Systems of Work',
  },
  {
    id: 125,
    question: 'What must every work-at-height activity have in place before it begins?',
    options: [
      'A television monitor for live CCTV',
      'A suitable and sufficient risk assessment',
      'At least three trained operatives on site',
      'Written approval from the HSE',
    ],
    correctAnswer: 1,
    explanation:
      'Before any work at height begins, a suitable and sufficient risk assessment must be carried out to identify the hazards, evaluate the risks, and determine the appropriate control measures. This is a fundamental legal requirement under the Management of Health and Safety at Work Regulations 1999.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Planning Requirements',
    category: 'Safe Systems of Work',
  },
  {
    id: 126,
    question: 'Why must a rescue plan be prepared before any work at height commences?',
    options: [
      'Because the emergency services are trained in rope rescue and will always reach a casualty within minutes',
      'Because having a rescue plan removes the need to provide collective fall protection at the work position',
      'Because the Work at Height Regulations require that emergency procedures, including rescue, are planned in advance',
      'Because rescue plans only become a legal requirement once a fall has already occurred on the site',
    ],
    correctAnswer: 2,
    explanation:
      'Schedule 4 of the Work at Height Regulations 2005 requires that emergency procedures, including rescue, are planned before work begins. Prompt rescue is essential because suspension trauma can become life-threatening within 15 to 30 minutes of a fall into a harness.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Rescue Plans',
    category: 'Safe Systems of Work',
  },
  {
    id: 127,
    question: 'What is suspension trauma?',
    options: [
      'A muscle and ligament injury to the back and neck caused by the sudden jerk of a lanyard arresting a fall',
      'A loss of balance and dizziness caused by a worker looking down from an unguarded edge at height',
      'The crush injury sustained when a falling worker strikes the ground or an obstruction on the way down',
      'A potentially fatal condition caused by the body remaining motionless in a vertical position in a harness after a fall',
    ],
    correctAnswer: 3,
    explanation:
      'Suspension trauma (also called harness hang syndrome) occurs when a person is suspended motionless in an upright position in a harness. Blood pools in the legs, reducing venous return to the heart. Without prompt rescue, this can lead to renal failure and cardiac arrest within 15 to 30 minutes.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Suspension Trauma',
    category: 'Safe Systems of Work',
  },
  {
    id: 128,
    question: 'What does a method statement describe?',
    options: [
      'The step-by-step safe sequence of work, including the hazards, controls, and responsibilities for each stage',
      'The qualifications, cards and training records held by each worker assigned to the task',
      'The likelihood and severity rating of each identified hazard, and the residual risk score after controls',
      'The schedule of statutory inspection dates for all access equipment used on the project',
    ],
    correctAnswer: 0,
    explanation:
      'A method statement (also called a safe system of work or SSOW) details the step-by-step sequence for carrying out a task safely. It identifies the hazards at each stage, specifies the control measures, and assigns responsibilities. It is commonly used alongside a risk assessment as part of a RAMS package.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Method Statements',
    category: 'Safe Systems of Work',
  },
  {
    id: 129,
    question: 'On the Beaufort Scale, Force 5 corresponds to which general description?',
    options: [
      'Gentle breeze — twigs move',
      'Fresh breeze — small trees sway',
      'Strong breeze — large branches move',
      'Light breeze — leaves rustle',
    ],
    correctAnswer: 1,
    explanation:
      "Beaufort Force 5 is described as a 'Fresh breeze' with wind speeds of 17–21 mph (29–38 km/h). At this level, small trees in leaf begin to sway and crested wavelets form on inland waters. This is the widely accepted threshold for stopping most work at height.",
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Beaufort Scale Thresholds',
    category: 'Safe Systems of Work',
  },
  {
    id: 130,
    question: 'Which HSE guidance document provides advice on working near overhead power lines?',
    options: [
      'HSG33',
      'HSG150',
      'GS6',
      'L22',
    ],
    correctAnswer: 2,
    explanation:
      "HSE Guidance Note GS6 'Avoidance of Danger from Overhead Power Lines' provides detailed advice on the safe clearance distances and precautions needed when working near overhead electric lines. It covers planning, risk assessment, and physical controls such as barriers and goal posts.",
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Overhead Power Lines',
    category: 'Safe Systems of Work',
  },
  {
    id: 131,
    question:
      'What is the recommended minimum safe clearance distance from overhead power lines rated at up to 33 kV?',
    options: [
      '6 metres',
      '15 metres',
      '3 metres',
      '9 metres',
    ],
    correctAnswer: 3,
    explanation:
      'GS6 recommends maintaining a minimum clearance distance of 9 metres from overhead power lines rated up to 33 kV when using equipment such as cranes, MEWPs, or scaffold towers. For higher voltages, the clearance distance increases. A site-specific assessment with the distribution network operator is always recommended.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Overhead Power Lines',
    category: 'Safe Systems of Work',
  },
  {
    id: 132,
    question:
      'Why must ground conditions be assessed before erecting any access equipment for work at height?',
    options: [
      'To ensure the base is firm, level, and capable of supporting the equipment and imposed loads without sinking or shifting',
      'To confirm the surface is smooth enough for the equipment to be wheeled into position by a single operative',
      'To measure the exact distance from the equipment to the nearest building for the site plan',
      'To check that the ground has been swept and tidied so that the working area looks presentable',
    ],
    correctAnswer: 0,
    explanation:
      'Poor ground conditions can cause access equipment such as scaffolds, towers, and MEWPs to sink, tilt, or collapse. The ground must be assessed to ensure it is firm, level, and capable of supporting the total imposed loads. Measures such as sole boards, base plates, and outrigger pads may be needed.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Ground Conditions',
    category: 'Safe Systems of Work',
  },
  {
    id: 133,
    question:
      'What measures should be taken to protect members of the public when work at height is being carried out near a public area?',
    options: [
      'Members of the public may be allowed to pass beneath the work provided that they are issued with a hard hat first',
      'Barriers, warning signs, and exclusion zones should be established to keep the public away from the work area',
      'A verbal warning called down to passers-by by a worker on the platform discharges the duty in full here',
      'No measures are needed provided the work is completed outside the opening hours of the premises alone',
    ],
    correctAnswer: 1,
    explanation:
      'Suitable barriers, fencing, warning signs, and exclusion zones must be established to prevent members of the public from entering the area where there is a risk of falling objects or other hazards. In some cases, covered walkways or fans may also be required to protect pedestrians.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Public Protection',
    category: 'Safe Systems of Work',
  },
  {
    id: 134,
    question: "What is the '30/30 rule' in relation to lightning and work at height?",
    options: [
      'Work may continue at height provided every worker stays at least 30 metres away from any metal structure and 30 metres from the highest point on site at all times',
      'Workers must begin descending 30 minutes before a forecast storm is due and may resume 30 seconds after the last audible thunder has passed over the site overhead',
      'If the time between seeing lightning and hearing thunder is 30 seconds or less, seek shelter; wait 30 minutes after the last lightning before resuming work',
      'Work must be halted for 30 minutes in every 30 minutes of stormy weather, so that exposure to the risk is limited to half of the shift worked on the site',
    ],
    correctAnswer: 2,
    explanation:
      'The 30/30 lightning safety rule states: if the interval between a lightning flash and the thunder is 30 seconds or less, the storm is close enough to be dangerous and workers should seek shelter immediately. Work should not resume until at least 30 minutes after the last observed lightning or thunder.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Weather Limits',
    category: 'Safe Systems of Work',
  },

  // --- intermediate (18) ---
  {
    id: 135,
    question:
      'A permit-to-work for a complex roof access task should include which of the following elements?',
    options: [
      'The name of the worker, the date the permit was issued, and the signature of the site manager authorising the work',
      'A general statement that the work involves a risk of falling, with the roof plan and the site layout attached to it',
      'The contact details of the nearest hospital, the site first aider and the local ambulance service control room',
      'Description of work, hazards, precautions, PPE, authorised persons, time limits, and sign-off for completion',
    ],
    correctAnswer: 3,
    explanation:
      'A comprehensive permit-to-work must detail the specific work, associated hazards, required precautions, necessary PPE, authorised persons (issuer, receiver, and any cross-references), time validity, and formal sign-off/cancellation procedures when the work is complete or the shift ends.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Permit-to-Work Systems',
    category: 'Safe Systems of Work',
  },
  {
    id: 136,
    question: 'Who is typically responsible for issuing a permit-to-work on a construction site?',
    options: [
      'A designated competent person or authorised manager who understands the hazards and controls',
      'Any experienced operative who is first on site and is able to sign the permit register that day',
      'The Health and Safety Executive inspector who is responsible for the region each week',
      'The worker who will actually carry out the task, as they know the risks best of anyone',
    ],
    correctAnswer: 0,
    explanation:
      'A permit-to-work must be issued by a designated competent person who has the authority and knowledge to assess the hazards, confirm that all precautions are in place, and authorise the work to proceed safely. This is usually a site manager, supervisor, or safety officer with specific training in the PTW system.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Permit-to-Work Systems',
    category: 'Safe Systems of Work',
  },
  {
    id: 137,
    question:
      'What are the three broad types of rescue that should be considered in a work-at-height rescue plan?',
    options: [
      'Fire brigade rescue, police rescue and ambulance service rescue',
      'Self-rescue, assisted rescue, and technical (team) rescue',
      'Helicopter rescue, ladder rescue and tower crane basket rescue',
      'Phone rescue, radio rescue and visual signal rescue',
    ],
    correctAnswer: 1,
    explanation:
      'Rescue plans should address three tiers: self-rescue (the fallen worker rescues themselves using built-in equipment), assisted rescue (a trained colleague uses rescue devices to bring the casualty to safety), and technical rescue (a specialist team with advanced equipment performs the rescue). Planning must ensure at least one tier is achievable promptly.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Rescue Plans',
    category: 'Safe Systems of Work',
  },
  {
    id: 138,
    question:
      'Within what time frame can suspension trauma become life-threatening after a person is left hanging motionless in a harness?',
    options: [
      '5 to 10 minutes',
      '1 to 2 hours',
      '15 to 30 minutes',
      '3 to 4 hours',
    ],
    correctAnswer: 2,
    explanation:
      'Research indicates that suspension trauma can become life-threatening within approximately 15 to 30 minutes if the casualty remains motionless in an upright position. This underscores the critical importance of having a rapid rescue plan in place before any work at height using harnesses begins.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Suspension Trauma',
    category: 'Safe Systems of Work',
  },
  {
    id: 139,
    question: 'When should a permit-to-work be cancelled or closed?',
    options: [
      'At the end of the whole construction project, so that the permit covers the whole programme of work carried out',
      'As soon as the first worker steps onto the working platform and begins the task that has been permitted today',
      'When the Health and Safety Executive or the client specifically requests its closure in writing to the site',
      'When the specified work is completed, or at the end of the shift, or when conditions change significantly',
    ],
    correctAnswer: 3,
    explanation:
      'A permit-to-work must be formally cancelled and signed off when the work is completed, at the end of the specified time period or shift, or whenever conditions change significantly (such as a change in weather, scope of work, or an emergency). Permits must never be left open-ended.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Permit-to-Work Systems',
    category: 'Safe Systems of Work',
  },
  {
    id: 140,
    question:
      'What additional precautions should be taken if work at height must continue during icy conditions?',
    options: [
      'Gritting or salting of walkways and platforms, enhanced slip-resistant footwear, and continuous monitoring of conditions',
      'Extending the length of the working day so that the task is completed before the temperature drops overnight on the whole site',
      'Removing the guard rails so that workers can grip the cold scaffold tubes directly while moving about the platform',
      'Allowing workers to remove their gloves so that they can get a better grip on cold, wet surfaces while they climb up',
    ],
    correctAnswer: 0,
    explanation:
      'Icy conditions significantly increase the risk of slips and falls at height. Controls include gritting or salting walking surfaces and platforms, using slip-resistant footwear, continuous weather monitoring, and where risks cannot be adequately controlled, postponing the work until conditions improve.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Weather Limits',
    category: 'Safe Systems of Work',
  },
  {
    id: 141,
    question:
      'Regulation 4 of the Work at Height Regulations 2005 sets out a hierarchy. After avoidance, what is the second priority?',
    options: [
      'Place safety nets below the working area at all times on site',
      'Use work equipment or other measures to prevent falls',
      'Issue fall arrest harnesses to all of the workers on site',
      'Increase the number of workers to share out the risk',
    ],
    correctAnswer: 1,
    explanation:
      'The Regulation 4 hierarchy is: (1) avoid work at height; (2) where avoidance is not reasonably practicable, use work equipment or other measures to prevent falls (e.g., guard rails, platforms); (3) where falls cannot be prevented, use measures to minimise the distance and consequences of a fall (e.g., nets, airbags, harnesses).',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'WAH Regs Reg 4',
    category: 'Safe Systems of Work',
  },
  {
    id: 142,
    question: "What role does a 'method statement receiver' play in a permit-to-work system?",
    options: [
      'They are the person who designs the scaffold, signs off its structural calculations, and issues the handover certificate to the principal contractor before work begins on site',
      'They are the supplier who provides the access equipment to site but takes no part in the work itself and therefore signs only the delivery note when it arrives on the site',
      'They are the person who accepts the permit, understands the precautions, and is responsible for ensuring the work is carried out in accordance with the permit conditions',
      'They are the HSE inspector who must countersign every permit before any work may begin and who attends the site in person to witness the first lift of each and every day on site',
    ],
    correctAnswer: 2,
    explanation:
      'The permit receiver (sometimes called the performing authority) is the person who accepts responsibility for carrying out the work in accordance with the permit conditions. They must read, understand, and sign the permit, brief their team, and ensure all specified precautions are maintained throughout the work.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Permit-to-Work Systems',
    category: 'Safe Systems of Work',
  },
  {
    id: 143,
    question:
      'When planning work at height, what factor determines whether a permit-to-work is needed rather than just a method statement and risk assessment?',
    options: [
      'Whether the work is taking place during the normal daytime working hours or outside of them altogether on site',
      'Whether the height at which the work takes place exceeds the fixed statutory threshold of 2 metres',
      'Whether the workers are directly employed by the principal contractor or are subcontractors on the site',
      'The level of risk, complexity of the work, and whether multiple trades or hazardous interfaces are involved',
    ],
    correctAnswer: 3,
    explanation:
      'A permit-to-work is typically required for higher-risk work at height where the consequences of failure are severe, where multiple trades interface, or where specific hazards such as fragile roofs, confined spaces, or live services are present. The decision is based on the risk assessment, not on arbitrary height thresholds.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Permit-to-Work Systems',
    category: 'Safe Systems of Work',
  },
  {
    id: 144,
    question: 'What is the purpose of including time limits on a permit-to-work?',
    options: [
      'To ensure that conditions are periodically reassessed and the permit is not left open beyond the period for which hazards have been evaluated',
      'To limit the length of time that a single worker may remain on a working platform in one shift before being relieved by a colleague from the gang',
      'To record the exact hours worked at height so that the contractor can be paid correctly for the task under the terms of the contract programme',
      'To set the date by which the whole construction project must be completed under the contract programme that has been agreed with the client',
    ],
    correctAnswer: 0,
    explanation:
      'Time limits on a permit ensure that the authorisation is valid only for the period during which the risk assessment and precautions apply. Conditions may change over time (weather, site activities, shift handovers), so periodic reassessment through permit renewal ensures ongoing safety.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Permit-to-Work Systems',
    category: 'Safe Systems of Work',
  },
  {
    id: 145,
    question:
      'A rescue plan for harness users should ensure rescue can be effected within what target time?',
    options: [
      'Within 1 hour',
      'Within 15 minutes',
      'There is no time target for rescue',
      'Within 45 minutes',
    ],
    correctAnswer: 1,
    explanation:
      'Given that suspension trauma can become life-threatening within 15 to 30 minutes, rescue plans should aim to effect rescue within 15 minutes of a fall occurring. This target drives the selection of rescue equipment, training requirements, and the positioning of rescue-ready personnel.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Rescue Plans',
    category: 'Safe Systems of Work',
  },
  {
    id: 146,
    question:
      'When working near overhead power lines at 132 kV or above, what is the minimum recommended clearance distance per GS6?',
    options: [
      '3 metres',
      '6 metres',
      '15 metres',
      '9 metres',
    ],
    correctAnswer: 2,
    explanation:
      'For overhead power lines at 132 kV and above, GS6 recommends a minimum clearance distance of 15 metres. At these voltages, electricity can arc across significant distances. The distribution network operator should always be consulted for site-specific advice before any work commences nearby.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Overhead Power Lines',
    category: 'Safe Systems of Work',
  },
  {
    id: 147,
    question: "What is meant by 'competence' being task-specific in the context of work at height?",
    options: [
      'A person holding any recognised health and safety qualification is competent for all work at height tasks carried out on site',
      'Competence is confirmed once at induction and then remains valid for the rest of the working career of that person on site',
      'Competence depends only on the number of years a person has worked in the construction industry before starting the task at height',
      'A person must have the specific training, knowledge, and experience relevant to the particular task they are performing',
    ],
    correctAnswer: 3,
    explanation:
      'Competence is task-specific, meaning that a person trained and experienced in erecting scaffolding is not automatically competent to use a MEWP or install safety netting. Each task at height requires its own blend of training, knowledge, and practical experience relevant to the specific equipment and hazards involved.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Competent Person Definition',
    category: 'Safe Systems of Work',
  },
  {
    id: 148,
    question:
      'Which of the following is an example of an assisted rescue technique for a worker suspended in a harness?',
    options: [
      'A trained colleague uses a rescue descent device attached to the anchor to lower the casualty to the ground',
      'No person shall pass across, work on, or near a fragile surface unless it is the only reasonably practicable means',
      'Any work where a person could fall a distance liable to cause personal injury',
      'When they show signs of excessive warping, splitting, decay, or damage beyond acceptable limits',
    ],
    correctAnswer: 0,
    explanation:
      'An assisted rescue involves a trained colleague using specific rescue equipment — such as a rescue descent device, davit arm, or rescue winch — to lower or raise the suspended casualty to a safe location. This is faster than waiting for emergency services and is a key component of an effective rescue plan.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Rescue Plans',
    category: 'Safe Systems of Work',
  },
  {
    id: 149,
    question:
      'When planning work at height over or near water, which additional control measure is essential?',
    options: [
      'Issuing each worker with waterproof clothing, warm gloves and a thermal undersuit to wear on site',
      'Providing personal flotation devices, establishing rescue boat cover, and designating a banksman',
      'Lowering the working platform to within 1 metre of the water surface to shorten any fall',
      'Restricting the work to low tide only, when the water level beneath the works is lowest',
    ],
    correctAnswer: 1,
    explanation:
      'Work over or near water introduces drowning risk. Controls must include personal flotation devices (PFDs or life jackets), dedicated rescue boat cover with trained crew, a designated banksman to raise the alarm, and additional edge protection. The rescue plan must specifically address water rescue procedures.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Planning Requirements',
    category: 'Safe Systems of Work',
  },
  {
    id: 150,
    question: "What is the purpose of a 'toolbox talk' in relation to work at height?",
    options: [
      'To deliver the full formal training course that workers must complete before they are allowed to work at height at all',
      'To record the names of the workers present on site that day for attendance and payroll purposes at the end of the week',
      'To provide a brief, focused safety briefing to workers on specific hazards and controls relevant to the task at hand',
      'To replace the written risk assessment and method statement for short-duration work at height carried out on site',
    ],
    correctAnswer: 2,
    explanation:
      "A toolbox talk is a short, focused safety briefing delivered at the worksite, often at the start of a shift or before a specific task. It reinforces awareness of the particular hazards, controls, and emergency procedures relevant to the day's work at height and ensures all team members understand the plan.",
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Planning Requirements',
    category: 'Safe Systems of Work',
  },
  {
    id: 151,
    question:
      'A worker notices that the ground beneath a scaffold tower has become waterlogged after heavy rain. What should they do?',
    options: [
      'Carry on working but ask a colleague at ground level to keep watching the tower for any sign of movement or sinking of the tower base',
      'Place extra ballast at the base of the tower to weigh it down until the ground has dried out again after the heavy rain has stopped falling',
      'Move the tower onto firmer ground elsewhere on site and carry on working without any further reassessment of the base conditions at all',
      'Report the change in conditions, stop work on the tower, and have a competent person reassess the base stability before resuming',
    ],
    correctAnswer: 3,
    explanation:
      'Waterlogged ground can significantly reduce its load-bearing capacity, potentially causing the tower to sink or become unstable. The worker must stop work, report the change, and have a competent person reassess whether the base remains adequate. Additional measures such as base boards or relocation may be necessary.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Ground Conditions',
    category: 'Safe Systems of Work',
  },
  {
    id: 152,
    question:
      'How should falling objects be controlled when work at height is being carried out above an occupied area?',
    options: [
      'Toe boards, brick guards, debris netting, tool lanyards, and exclusion zones should be used as appropriate',
      'Hard hats issued to the occupants below, with a verbal warning to carry on with their normal activities as usual',
      'Tools lowered by hand to colleagues on the ground, rather than tool lanyards which snag on the platform',
      'Care taken by each worker not to drop anything, since toe boards obstruct movement on the platform itself',
    ],
    correctAnswer: 0,
    explanation:
      'Multiple controls should be used in combination: toe boards on platforms to prevent items rolling off, brick guards or debris netting to contain materials, tool lanyards to secure hand tools, and exclusion zones or covered walkways to keep people clear of the drop zone below.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Public Protection',
    category: 'Safe Systems of Work',
  },

  // --- advanced (8) ---
  {
    id: 153,
    question:
      'A principal contractor is planning a phased re-roofing project on an occupied school. Multiple trades will be working at height simultaneously. Beyond a risk assessment and method statement, what additional safe system of work controls are most appropriate?',
    options: [
      'A single site-wide risk assessment covering every operative, with all trades scheduled onto the roof at the same time so that the programme is completed faster than originally planned',
      'A permit-to-work system with phase-specific permits, a coordination plan for concurrent trades, exclusion zones below, and a site-specific rescue plan tested with a practice drill',
      'A full closure of the school for the duration of the works, on the basis that with no pupils on site no further controls are needed beyond the risk assessment already in place at all',
      'A requirement for each worker to wear a fall arrest harness clipped to the scaffold, with each trade managing its own work in isolation from the others on the roof at the time',
    ],
    correctAnswer: 1,
    explanation:
      'Complex multi-trade work at height on an occupied building demands a permit-to-work system to control each phase, formal coordination between trades to prevent interface hazards, defined exclusion zones to protect building occupants, and a tested rescue plan. A practice drill validates that rescue can be achieved within the target time.',
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'Permit-to-Work Systems',
    category: 'Safe Systems of Work',
  },
  {
    id: 154,
    question:
      'During a rescue, a casualty who has been suspended motionless in a harness for 20 minutes is brought to the ground. What position should they initially be placed in, and why?',
    options: [
      'Lying flat on their back immediately, so that blood flow to the brain is maximised and consciousness is restored as quickly as possible afterwards',
      'In the recovery position on their side with the legs fully extended, so that the airway is kept clear while circulation returns to normal levels',
      'In the W-position (semi-reclined with knees raised) to prevent a sudden surge of pooled blood returning to the heart causing reflow syndrome',
      'Standing upright and walked around slowly, so that the leg muscles pump the pooled blood back into general circulation again as soon as possible',
    ],
    correctAnswer: 2,
    explanation:
      'After prolonged suspension, a sudden return of pooled, deoxygenated blood from the legs to the heart can cause reflow syndrome and cardiac arrest. The casualty should be placed in the W-position (seated or semi-reclined with knees raised above hip level) for at least 30 to 40 minutes, with medical monitoring, to allow gradual redistribution.',
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'Suspension Trauma',
    category: 'Safe Systems of Work',
  },
  {
    id: 155,
    question:
      "A mobile crane is to be used adjacent to 33 kV overhead power lines on a construction site. The crane's maximum boom reach could encroach within the GS6 clearance zone. What control measures should be implemented?",
    options: [
      'Fit an insulating sleeve over the crane boom and issue the operator with rubber gauntlets and insulating boots, on the basis that the insulation will protect against contact with a 33 kV line at any point in the boom reach throughout the lift',
      'Allow the crane to operate at full reach provided the operator holds a current CPCS card and has more than five years of experience, on the basis that an experienced operator will judge the clearance to the lines by eye safely on the day',
      'Position the crane as far from the overhead lines as the available site space happens to allow and brief the operator to keep a lookout, with no barriers, no permit and no contact with the network operator throughout the whole lift',
      'Contact the distribution network operator to discuss options including isolation or diversion; install goal posts and physical barriers to define the safe zone; use a banks person; and restrict boom operation with a rated capacity limiter',
    ],
    correctAnswer: 3,
    explanation:
      "GS6 requires early consultation with the distribution network operator (DNO) to explore isolation, diversion, or the use of insulated shrouds. Physical barriers (goal posts) must define the no-go zone at ground level. A designated banksman must monitor clearances, and the crane's rated capacity limiter should be set to prevent the boom entering the danger zone.",
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'Overhead Power Lines',
    category: 'Safe Systems of Work',
  },
  {
    id: 156,
    question:
      'On a remote rural site with no mobile phone signal, how should the rescue plan for harness users be adapted?',
    options: [
      'The plan must rely entirely on self-rescue and on-site assisted rescue by trained personnel with rescue equipment, a satellite communication device should be provided, and the nearest emergency services response time must be factored into planning',
      'The plan may rely on a worker driving to the nearest village to summon help once a fall has occurred, provided a vehicle is kept on site with the keys available and the route has been driven and timed at least once beforehand by the supervisor on the day',
      'No written rescue plan is required on a remote site, because the emergency services cannot be summoned quickly in any event and the workers must simply take extra care while clipped on to the anchor point at all times while they are working at height',
      'The plan should assume that an air ambulance will reach the casualty within minutes, so only a landing area needs to be identified and kept clear of plant and stored materials at all times and kept free of any overhead cables at every time of day',
    ],
    correctAnswer: 0,
    explanation:
      "Where emergency services response cannot be guaranteed within 15 minutes, the rescue plan must prioritise on-site capability: trained rescuers with descent/raise equipment, self-rescue features on harnesses, and alternative communication (satellite phone or radio). Rescue drills become even more critical to validate the plan's effectiveness.",
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'Rescue Plans',
    category: 'Safe Systems of Work',
  },
  {
    id: 157,
    question:
      'A method statement for a work-at-height task identifies that two different subcontractors will be working on the same scaffold at overlapping times. What specific planning control addresses this interface risk?',
    options: [
      'Free access to the scaffold for both subcontractors at all times, trusting each gang to keep clear of the other, since both hold valid CSCS cards and have been inducted onto the site by the principal contractor already',
      'A coordination procedure that defines time-zoning or space-zoning, communication protocols between subcontractors, a single point of coordination responsibility, and a review of combined loading on the scaffold',
      'A separate scaffold tag issued to each subcontractor for the same structure, so that each gang can record its own inspection and sign the scaffold off for its own use agreed between the two gangs at the start of each shift',
      'A doubled number of guard rails and toe boards on every lift of the scaffold, so that there is enough edge protection for both gangs to work at the same time in any position and at any height on the whole scaffold',
    ],
    correctAnswer: 1,
    explanation:
      'Interface risks between concurrent trades on the same scaffold require formal coordination: time-zoning (sequential access) or space-zoning (separate areas), clear communication protocols, a named coordinator responsible for managing the interface, and an engineering check that the scaffold design can support the combined loads and activities.',
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'Method Statements',
    category: 'Safe Systems of Work',
  },
  {
    id: 158,
    question:
      'Under what circumstances might work at height be permitted to continue in wind speeds above Force 5 (17 mph)?',
    options: [
      'Whenever the operatives on the platform verbally confirm that they are comfortable continuing, since the person exposed to the risk is best placed to judge the conditions at the work position itself',
      'Whenever the task is close to completion and stopping would delay the programme, provided the supervisor records the decision in the site diary afterwards for the delay caused to the works',
      'Where a specific risk assessment demonstrates that the particular task, equipment, and location are suitable for the actual conditions — for example, an enclosed MEWP in a sheltered courtyard',
      'Work above Force 5 is always permitted, because the Force 5 figure is advisory guidance rather than a limit written into the Work at Height Regulations at all, and so may be departed from',
    ],
    correctAnswer: 2,
    explanation:
      'The 17 mph/Force 5 guideline is not an absolute legal limit but a widely accepted benchmark. A task-specific risk assessment may permit continued work in certain sheltered locations, with enclosed equipment, or for specific activities not significantly affected by wind. The assessment must be documented and reviewed as conditions change.',
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'Weather Limits',
    category: 'Safe Systems of Work',
  },
  {
    id: 159,
    question:
      'A worker performing self-rescue after a fall uses a trauma strap (suspension relief strap). What is the purpose of this device?',
    options: [
      'It releases the harness leg straps on command so that the worker can drop clear of the system onto a safety net or airbag positioned below the work area itself',
      'It signals the location of the suspended worker to the rescue team using a built-in beacon and an audible alarm triggered automatically by the fall arrest unit',
      'It cushions the impact if the worker swings back into the building or structure during the arrest of the fall, protecting the ribs and pelvis on impact',
      'It provides a loop for the feet to stand in, allowing the worker to periodically straighten their legs and restore blood circulation while awaiting rescue',
    ],
    correctAnswer: 3,
    explanation:
      'A trauma strap is a simple deployable loop that attaches to the harness and allows the suspended worker to stand in it, periodically straightening and tensing their legs. This pumping action helps maintain blood circulation and significantly delays the onset of suspension trauma while the worker awaits rescue.',
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'Suspension Trauma',
    category: 'Safe Systems of Work',
  },
  {
    id: 160,
    question:
      'When conducting a dynamic risk assessment during work at height, a supervisor notices that forecast conditions have changed and thunderstorms are now expected within 2 hours. Applying the 30/30 rule and good practice, what actions should be taken?',
    options: [
      'Plan to have all workers safely descended and equipment secured well before the storm arrives; cease work at height immediately if the 30/30 rule triggers; do not resume until 30 minutes after the last thunder or lightning',
      'Continue working at full pace so that the task is finished before the storm arrives, since the forecast is only a probability and the scaffold is earthed through its base plates, which will carry any strike safely to ground',
      'Allow work to continue throughout the storm provided workers avoid touching the metal scaffold tubes and wear insulating gloves, as rubber-soled boots will protect against a strike',
      'Wait until the first lightning strike is seen directly overhead before instructing workers to descend, as descending any earlier wastes productive time on the programme',
    ],
    correctAnswer: 0,
    explanation:
      'Good practice requires proactive action: begin planned descent and equipment securing in advance of the storm. If the 30/30 rule triggers (lightning-to-thunder gap of 30 seconds or less), all work at height must stop immediately and workers must shelter. Work must not resume until at least 30 minutes after the last observed lightning or thunder.',
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'Weather Limits',
    category: 'Safe Systems of Work',
  },

  // =======================================================================
  // INCIDENT RESPONSE & RESPONSIBILITIES — 40 questions (id 161–200), Module 5
  // =======================================================================

  // --- basic (14) ---
  {
    id: 161,
    question: 'What does the acronym RIDDOR stand for?',
    options: [
      'Regulation of Industrial Damage, Defects and Operational Risks at Work',
      'Reporting of Injuries, Diseases and Dangerous Occurrences Regulations',
      'Recording of Incidents, Disruptions and Daily Operational Reports at Work',
      'Review of Inspections, Duties and Design Operational Requirements Rules',
    ],
    correctAnswer: 1,
    explanation:
      'RIDDOR stands for the Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013. These regulations require employers, the self-employed, and people in control of work premises to report certain serious workplace accidents, occupational diseases, and specified dangerous occurrences to the HSE.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'RIDDOR 2013',
    category: 'Incident Response & Responsibilities',
  },
  {
    id: 162,
    question:
      'Under RIDDOR 2013, a fatal workplace accident must be reported to the HSE within what time frame?',
    options: [
      'Within 10 days, using the online F2508 reporting form',
      'Within 15 days of the accident, in the same way as an over-seven-day injury',
      'Without delay — by the quickest practicable means (usually telephone)',
      'Within 24 hours, by email to the local authority environmental health team',
    ],
    correctAnswer: 2,
    explanation:
      "Fatal accidents and specified injuries must be reported to the HSE without delay by the quickest practicable means, which is usually by telephone to the HSE's Incident Contact Centre. A written report must then follow within 10 days using the online reporting system.",
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'RIDDOR 2013',
    category: 'Incident Response & Responsibilities',
  },
  {
    id: 163,
    question: 'Who is responsible for reporting a RIDDOR-reportable incident to the HSE?',
    options: [
      'The injured worker, who must complete an F2508 form for their own accident within ten days of it taking place',
      'The first aider who treated the casualty, as part of completing the accident book entry on site that day',
      'The Health and Safety Executive inspector for the region, once notified by the site manager in writing',
      'The responsible person — usually the employer, self-employed person, or person in control of the premises',
    ],
    correctAnswer: 3,
    explanation:
      "The duty to report under RIDDOR falls on the 'responsible person', which is typically the employer, a self-employed person, or the person in control of the premises where the work is being carried out. Individual workers are not responsible for making RIDDOR reports.",
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Who Reports',
    category: 'Incident Response & Responsibilities',
  },
  {
    id: 164,
    question: "Which of the following is classified as a 'specified injury' under RIDDOR 2013?",
    options: [
      'A fracture (other than to fingers, thumbs, or toes)',
      'A minor cut requiring only a plaster from the first aid kit',
      'A bruise sustained from bumping into scaffold tubes',
      'A single day of absence following a sprained ankle',
    ],
    correctAnswer: 0,
    explanation:
      'Specified injuries under RIDDOR 2013 include fractures (other than to fingers, thumbs, or toes), amputations, crush injuries leading to internal organ damage, serious burns, scalping, loss of consciousness, and any injury requiring immediate hospital treatment. These must be reported without delay.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'RIDDOR 2013',
    category: 'Incident Response & Responsibilities',
  },
  {
    id: 165,
    question:
      'Under RIDDOR 2013, if a worker is incapacitated for more than how many consecutive days (not counting the day of the accident), must the incident be reported?',
    options: [
      '3 days',
      '7 days',
      '5 days',
      '14 days',
    ],
    correctAnswer: 1,
    explanation:
      'Under RIDDOR 2013, an over-7-day incapacitation must be reported. This applies where a worker is incapacitated for more than 7 consecutive days (not counting the day of the accident) and unable to perform their normal duties. The report must be made within 15 days of the accident.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'RIDDOR 2013',
    category: 'Incident Response & Responsibilities',
  },
  {
    id: 166,
    question:
      'After a fall from height, what is the first priority when attending to the casualty?',
    options: [
      'Move the casualty into a comfortable position away from the base of the scaffold as quickly as possible, then check whether they are breathing normally at all',
      'Give the casualty a hot sweet drink and something to eat to counter the shock, then keep them talking until the ambulance arrives and keep them warm at the site',
      'Assess the scene for danger, then check their airway, breathing, and circulation (ABC) without moving them unnecessarily due to potential spinal injury',
      'Photograph the scene thoroughly from every angle so that the evidence is preserved before anyone approaches the casualty to offer them any help at all',
    ],
    correctAnswer: 2,
    explanation:
      'After a fall from height, the casualty may have sustained spinal injuries. The first priority is to ensure the scene is safe, then assess using the ABC approach (Airway, Breathing, Circulation) without moving the casualty unnecessarily. Spinal immobilisation should be maintained until professional medical help arrives.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'First Aid for Falls',
    category: 'Incident Response & Responsibilities',
  },
  {
    id: 167,
    question: "What is a 'near miss' in the context of work at height?",
    options: [
      'An accident that results in the injured worker being absent from work for more than seven days in a row',
      'A fall from height that results in a specified injury, such as a fracture to an arm or a leg bone of the worker',
      'Any minor injury treated using the on-site first aid kit and recorded in the accident book at the time',
      'An incident where someone was nearly hit by a falling object or nearly fell, but no injury occurred',
    ],
    correctAnswer: 3,
    explanation:
      'A near miss is an unplanned event that had the potential to cause injury or damage but did not actually result in harm on this occasion. Reporting and investigating near misses is crucial because they reveal weaknesses in controls that, if left unaddressed, could lead to a serious accident.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Near-Miss Culture',
    category: 'Incident Response & Responsibilities',
  },
  {
    id: 168,
    question:
      'Under the Health and Safety at Work etc. Act 1974, what is the primary duty of an employee?',
    options: [
      'To take reasonable care of their own health and safety and that of others who may be affected by their acts or omissions',
      'To carry out the risk assessments and to issue the permits to work for every task at height performed anywhere on the site',
      'To provide, maintain and pay for all of the personal protective equipment used by the workforce on the site each day',
      'To report directly to the Health and Safety Executive after every shift that involves any work at height on the site',
    ],
    correctAnswer: 0,
    explanation:
      'Section 7 of the HSWA 1974 places a duty on every employee to take reasonable care for the health and safety of themselves and others who may be affected by what they do or fail to do at work. They must also cooperate with their employer on health and safety matters.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Employer/Employee Duties',
    category: 'Incident Response & Responsibilities',
  },
  {
    id: 169,
    question: 'What is the purpose of a pre-use inspection of work-at-height equipment?',
    options: [
      'To record the total number of hours that each item of access equipment has been in use since it was last examined on site',
      'To check that the equipment is in safe working condition before each use, identifying any damage, wear, or defects',
      'To satisfy the statutory requirement for a thorough examination of the equipment by a competent person every six months',
      'To give the site manager a written record that can be filed with the construction phase plan each week on site',
    ],
    correctAnswer: 1,
    explanation:
      'A pre-use inspection is a visual and functional check carried out by the user before each use to identify any obvious damage, wear, contamination, or defects that could compromise safety. It is a legal requirement under the Work at Height Regulations and is the first line of defence against equipment failure.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Inspection Regimes',
    category: 'Incident Response & Responsibilities',
  },
  {
    id: 170,
    question:
      'How often must a scaffold be inspected after initial erection and before first use, according to the Work at Height Regulations?',
    options: [
      'Before first use and then at intervals not exceeding 14 days',
      'Before first use and then at intervals not exceeding 30 days',
      'Before first use and then at intervals not exceeding 7 days',
      'Only once, immediately after the scaffold has been erected',
    ],
    correctAnswer: 2,
    explanation:
      'The Work at Height Regulations 2005 (Schedule 7) require that scaffolding be inspected by a competent person before first use, and thereafter at intervals not exceeding 7 days. Additional inspections are required after any event likely to have affected its stability, such as severe weather.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Inspection Regimes',
    category: 'Incident Response & Responsibilities',
  },
  {
    id: 171,
    question: 'What is the purpose of reporting near misses on a construction site?',
    options: [
      'To identify which worker was at fault so that retraining or disciplinary action can be targeted correctly by the firm',
      'To satisfy the legal duty under RIDDOR 2013 to report every near miss to the enforcing authority within ten days of it',
      'To calculate the employer liability insurance premium from the number of near misses recorded for the coming year ahead',
      'To identify hazards and weaknesses in controls before a serious injury occurs, promoting a proactive safety culture',
    ],
    correctAnswer: 3,
    explanation:
      'Near-miss reporting is a proactive safety measure that helps identify hazards and control failures before they result in injury. A healthy near-miss reporting culture indicates an engaged workforce and provides valuable data for risk assessment reviews and continuous improvement of safe systems of work.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Near-Miss Culture',
    category: 'Incident Response & Responsibilities',
  },
  {
    id: 172,
    question:
      'Under CDM 2015, who has the duty to plan, manage, and monitor the construction phase to ensure work is carried out safely?',
    options: [
      'The principal contractor',
      "The building's future tenants",
      'The local council planning department',
      "The client's accountant",
    ],
    correctAnswer: 0,
    explanation:
      'Under the Construction (Design and Management) Regulations 2015, the principal contractor has the duty to plan, manage, and monitor the construction phase to ensure the health and safety of all workers on site. On projects with only one contractor, that contractor takes on the principal contractor duties.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'CDM 2015',
    category: 'Incident Response & Responsibilities',
  },
  {
    id: 173,
    question:
      "Which of the following falls under a 'dangerous occurrence' reportable under RIDDOR 2013?",
    options: [
      'A minor hand tool being dropped from a scaffold that causes no injury at all',
      'The collapse or partial collapse of a scaffold over 5 metres in height',
      'A worker forgetting to wear their hard hat for a few minutes on site',
      'A worker getting a splinter from a wooden scaffold board on site',
    ],
    correctAnswer: 1,
    explanation:
      'The collapse or partial collapse of a scaffold over 5 metres in height is a specified dangerous occurrence under RIDDOR 2013 Schedule 2. Dangerous occurrences are events that may not result in injury but have the potential to cause significant harm and must be reported to the HSE.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'RIDDOR 2013',
    category: 'Incident Response & Responsibilities',
  },
  {
    id: 174,
    question: 'What is root cause analysis used for after a work-at-height incident?',
    options: [
      'To establish which individual worker made the error so that responsibility for the incident can be recorded correctly on the file',
      'To calculate the total financial cost of the incident for the insurer and the contract claim that follows on from the accident',
      'To identify the underlying fundamental causes of the incident so that effective corrective actions can prevent recurrence',
      'To determine the level of compensation owed to the injured worker under the employers liability insurance policy on site',
    ],
    correctAnswer: 2,
    explanation:
      'Root cause analysis is an investigative technique used to look beyond the immediate causes of an incident and identify the underlying systemic failures — such as inadequate training, poor procedures, or management failings — so that effective corrective actions can be implemented to prevent similar incidents recurring.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Root Cause Analysis',
    category: 'Incident Response & Responsibilities',
  },

  // --- intermediate (18) ---
  {
    id: 175,
    question: "The '5 Whys' technique is a root cause analysis method. How does it work?",
    options: [
      'The investigator interviews five separate witnesses to the incident and compares their accounts for consistency and any contradictions',
      'The investigator lists the five most likely causes of the incident and selects whichever is supported by most evidence in the incident file',
      'The investigator assigns five separate corrective actions, one for each level of the hierarchy of control that was breached in the incident',
      'The investigator repeatedly asks \'why?\' (typically five times) to drill down from the immediate cause to the underlying root cause',
    ],
    correctAnswer: 3,
    explanation:
      "The 5 Whys technique involves repeatedly asking 'why?' in response to each answer, typically about five times, to move beyond surface-level symptoms and identify the deeper root cause. For example: 'Why did the worker fall?' leads to 'Why was there no guard rail?' leads to 'Why was the scaffold incomplete?' and so on.",
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Root Cause Analysis',
    category: 'Incident Response & Responsibilities',
  },
  {
    id: 176,
    question:
      'Under RIDDOR 2013, an over-7-day incapacitation must be reported within what time frame?',
    options: [
      'Within 15 days of the accident',
      'Within 30 days of the accident',
      'Within 10 days of the accident',
      'Without delay by telephone',
    ],
    correctAnswer: 0,
    explanation:
      "For over-7-day incapacitation injuries, the report must be made within 15 days of the accident. This contrasts with fatal and specified injuries which must be reported without delay. The report is made online via the HSE's incident reporting system at www.hse.gov.uk/riddor.",
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Time Limits',
    category: 'Incident Response & Responsibilities',
  },
  {
    id: 177,
    question:
      'Following a fatal fall from height on a construction site, which of the following actions should be taken immediately?',
    options: [
      'Clear the scene, recover the equipment and resume work quickly so that the programme is not delayed, and report the death to the HSE later in the week that follows',
      'Secure the scene to preserve evidence, contact emergency services, report to the HSE without delay, and do not disturb the scene unless necessary to save life',
      'Move the casualty to the site office out of view of the workforce and wait there for senior management to attend the scene and to decide what to do next',
      'Dismantle the scaffold immediately so that no further falls can occur from the same structure before the investigation has been able to take place at all',
    ],
    correctAnswer: 1,
    explanation:
      'After a fatal incident, the scene must be secured and preserved for investigation by the HSE and police. Emergency services must be contacted immediately. The HSE must be notified without delay by telephone. Nothing should be moved or disturbed unless absolutely necessary to rescue injured persons or prevent further danger.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Investigation Process',
    category: 'Incident Response & Responsibilities',
  },
  {
    id: 178,
    question: "What is 'suspension trauma' also known as, and what is its medical mechanism?",
    options: [
      'Whiplash syndrome; caused by the sudden jerk of the lanyard arresting the fall and snapping the head forward against the chest of the worker wearing the harness',
      'Reflow syndrome; caused by a sudden rush of pooled blood from the legs back to the heart while the worker is still suspended in the harness after the fall',
      'Harness hang syndrome or orthostatic intolerance; caused by venous pooling in the legs due to immobility in a vertical position, reducing cardiac output',
      'Compartment syndrome; caused by the harness leg straps cutting off blood supply to the feet and lower legs of the suspended worker while hanging there',
    ],
    correctAnswer: 2,
    explanation:
      'Suspension trauma is also called harness hang syndrome or orthostatic intolerance. The medical mechanism involves blood pooling in the lower extremities due to the immobile upright position and harness leg strap compression. This reduces venous return to the heart, lowering cardiac output and leading to loss of consciousness, renal failure, and potentially death.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Suspension Trauma Timeline',
    category: 'Incident Response & Responsibilities',
  },
  {
    id: 179,
    question:
      'After rescuing a casualty who has been suspended in a harness for approximately 25 minutes, why should they NOT be laid flat on their back immediately?',
    options: [
      'An improvement in blood flow to the brain, which speeds recovery, making it the correct position for any casualty who has been suspended motionless in a harness after a fall again',
      'The standard recovery position for an unconscious casualty, which should be used regardless of how long the person has been suspended in the harness after the fall has been arrested',
      'The risk of shock following the fall, which is the greatest danger after a suspension of this length and is best managed by lying the casualty flat on the ground until help arrives',
      'A sudden rush of pooled, toxin-laden blood from the legs back to the heart and kidneys can cause reflow syndrome, potentially resulting in cardiac arrest or acute renal failure',
    ],
    correctAnswer: 3,
    explanation:
      'After prolonged suspension, the blood pooled in the legs becomes deoxygenated and accumulates metabolic waste products. If the casualty is laid flat, this blood rushes back to the heart and kidneys simultaneously, which can trigger cardiac arrest (reflow syndrome) or acute renal failure. The W-position allows gradual, controlled redistribution.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Suspension Trauma Timeline',
    category: 'Incident Response & Responsibilities',
  },
  {
    id: 180,
    question:
      "Under CDM 2015, what are the client's duties in relation to work at height on their project?",
    options: [
      'The client must make suitable arrangements for managing the project, ensure sufficient time and resources are allocated, and appoint competent duty holders',
      'The client must personally carry out the risk assessments for all work at height and countersign each method statement before work starts on the site each week',
      'The client has no further duties once a principal contractor and a principal designer have been appointed in writing for the project and are on site',
      'The client must supply all the fall protection equipment used on the project and arrange its statutory inspection at the required intervals set out',
    ],
    correctAnswer: 0,
    explanation:
      'Under CDM 2015, the client has significant duties including: making suitable arrangements for managing the project safely, ensuring sufficient time and resources, providing pre-construction information, appointing a principal designer and principal contractor (on projects with more than one contractor), and ensuring a construction phase plan is in place.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'CDM 2015',
    category: 'Incident Response & Responsibilities',
  },
  {
    id: 181,
    question:
      'What is the minimum legal retention period for RIDDOR records of workplace injuries and dangerous occurrences?',
    options: [
      'At least 1 year from the date of the entry',
      'At least 3 years from the date of the entry',
      'At least 6 months from the date of the entry',
      'There is no minimum legal retention period',
    ],
    correctAnswer: 1,
    explanation:
      'Under RIDDOR 2013, employers must keep records of all reportable injuries, diseases, and dangerous occurrences for at least 3 years from the date of the entry. However, many organisations retain records for longer periods (often 6 years or more) in case of civil claims.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Legal Retention Periods',
    category: 'Incident Response & Responsibilities',
  },
  {
    id: 182,
    question:
      "A contractor working on a client's site has a worker who suffers a specified injury from a fall. Who has the duty to report this under RIDDOR?",
    options: [
      'The client who owns the building',
      'The local authority building control department',
      'The contractor who employs the injured worker',
      "The injured worker's next of kin",
    ],
    correctAnswer: 2,
    explanation:
      'The employer of the injured person — in this case the contractor — has the duty to report the incident under RIDDOR. If the injured person is self-employed, the person in control of the premises where the work was being done has the reporting duty. The client is not the responsible person unless they directly employ the worker.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Who Reports',
    category: 'Incident Response & Responsibilities',
  },
  {
    id: 183,
    question:
      'What certification or training should a person have before using a harness as part of a personal fall protection system?',
    options: [
      'A first aid at work certificate covering the treatment of fall casualties and the management of suspension trauma, renewed every three years, plus a practical test of the fitting',
      'A general site induction covering the site rules, with harness fitting and pre-use inspection demonstrated informally by an experienced colleague on the first day on the site',
      'A valid IPAF PAL card, which covers the operation of mobile elevating work platforms and the use of any harness that is worn by the operator inside the basket on site',
      'Formal harness user training covering correct fitting, adjustment, pre-use inspection, connection to anchor points, emergency procedures, and the limitations of the system',
    ],
    correctAnswer: 3,
    explanation:
      "Any person using a harness must receive formal training that covers correct donning and adjustment, pre-use inspection procedures, selection of suitable anchor points, connection techniques, emergency and rescue procedures, and an understanding of the system's limitations. Competence must be verified before unsupervised use.",
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Harness Training',
    category: 'Incident Response & Responsibilities',
  },
  {
    id: 184,
    question:
      'IPAF training is specifically required for the operation of which type of work-at-height equipment?',
    options: [
      'Mobile elevating work platforms (MEWPs)',
      'Mobile scaffold towers and prefabricated towers',
      'Full-body harnesses and fall arrest systems',
      'Leaning ladders and stepladders',
    ],
    correctAnswer: 0,
    explanation:
      'IPAF (International Powered Access Federation) provides the industry-standard operator training and certification for mobile elevating work platforms (MEWPs), including scissor lifts and boom lifts. IPAF Powered Access Licences (PAL cards) are the recognised proof of competence for MEWP operation across the UK and internationally.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'IPAF Training',
    category: 'Incident Response & Responsibilities',
  },
  {
    id: 185,
    question:
      'PASMA training is the recognised industry standard for which type of work-at-height equipment?',
    options: [
      'Mobile elevating work platforms such as scissor and boom lifts',
      'Mobile scaffold towers (prefabricated aluminium towers)',
      'Full-body harnesses and personal fall arrest systems',
      'Erecting and dismantling tube and fitting scaffolds',
    ],
    correctAnswer: 1,
    explanation:
      "PASMA (Prefabricated Access Suppliers' and Manufacturers' Association) provides the industry-standard training for the assembly, use, and dismantling of mobile scaffold towers. A PASMA Towers for Users card is the recognised proof of competence and is widely required across the construction industry.",
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'PASMA Training',
    category: 'Incident Response & Responsibilities',
  },
  {
    id: 186,
    question: 'What information should be recorded following a scaffold inspection?',
    options: [
      'The date and time of the inspection, a tick to confirm the scaffold passed, the initials of the person carrying it out, and the date the next inspection falls due for the whole site',
      'The total cost of hiring the scaffold for the project duration, the erection date, the agreed off-hire date and the name of the scaffolding contractor for the works carried out on the site',
      'The name and position of the inspector, date and time, location, the scaffold\'s condition, any defects found, actions required, and a statement that it is or is not safe for use',
      'The names of all the workers who used the scaffold that day, the loads they carried onto each lift, and the trade each of them belongs to for each and every day of the contract period',
    ],
    correctAnswer: 2,
    explanation:
      "Schedule 7 of the Work at Height Regulations requires scaffold inspection reports to include: the inspector's name and qualifications, date and time of inspection, scaffold location and description, condition assessment, any faults or matters identified, actions required, and a clear statement regarding fitness for use. Records must be kept on site.",
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Record Keeping',
    category: 'Incident Response & Responsibilities',
  },
  {
    id: 187,
    question:
      "An employer's duty under Section 2 of the HSWA 1974 includes providing which of the following for work at height?",
    options: [
      'Personal liability insurance covering every worker on the site against any injury sustained while working at height each year',
      'A written guarantee to each worker that no person at all will be injured while working on the project at any time',
      'Payment for any private medical treatment a worker chooses to seek after an accident at height on the site at any time',
      'Safe plant and systems of work, information, instruction, training, and supervision so far as is reasonably practicable',
    ],
    correctAnswer: 3,
    explanation:
      'Section 2 of the HSWA 1974 requires employers to provide, so far as is reasonably practicable: safe plant and systems of work, safe arrangements for the use, handling, storage, and transport of substances, adequate information, instruction, training, and supervision, and a safe place of work with safe access and egress.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Employer/Employee Duties',
    category: 'Incident Response & Responsibilities',
  },
  {
    id: 188,
    question:
      'How should scaffold inspection records be managed on a busy construction site with multiple scaffold structures?',
    options: [
      'Each scaffold structure should have its own individual inspection record, be uniquely identified, and records should be kept on site and available for review by any person working on or responsible for the scaffold',
      'Only the most recently erected scaffold needs an inspection record kept on site, since all the earlier structures will already have been signed off, tagged and handed over to the trades who use them at the start of work',
      'Records may be kept verbally provided the competent person who carried out the inspection remains on site and can recall the details of each structure when asked to describe a particular structure at any time at all',
      'A single combined record covering every scaffold on the site is sufficient, and may be kept at head office so that it is available to the HSE if the site is ever visited by an inspector at any point in time at all',
    ],
    correctAnswer: 0,
    explanation:
      'Each scaffold must be uniquely identified (numbered, named, or tagged) and have its own individual inspection record. Records must be available on site for workers, supervisors, and enforcement officers. Both paper and digital records are acceptable provided they are accessible when needed and retained as required.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Record Keeping',
    category: 'Incident Response & Responsibilities',
  },
  {
    id: 189,
    question:
      "A subcontractor's worker on a construction site refuses to use the provided harness because they say it is uncomfortable. What is the correct course of action?",
    options: [
      'Allow the worker to continue at height without the harness, since it is their own choice, they are employed by the subcontractor rather than the principal contractor, and the scaffold has guard rails already fitted to it',
      'Investigate the complaint — check harness fit and size, provide training if needed, and ensure no worker is permitted to work at height without the required PPE; escalate to the subcontractor\'s management if necessary',
      'Dismiss the complaint and instruct the worker to wear the harness regardless of the fit, as comfort is not a valid reason to refuse issued personal protective equipment that has been issued to them on the site by the employer',
      'Send the worker home immediately for refusing to wear the equipment provided, without investigating whether the harness fits correctly or whether they were ever trained to use it properly or to inspect it before use at all',
    ],
    correctAnswer: 1,
    explanation:
      'The complaint should be taken seriously: an ill-fitting harness can reduce protection and cause discomfort that discourages use. The harness fit and size should be checked, and an alternative offered if needed. The worker must understand the legal requirement, and if they continue to refuse, the matter should be escalated to their employer. No one should work at height without required PPE.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Contractor Duties',
    category: 'Incident Response & Responsibilities',
  },
  {
    id: 190,
    question:
      'What is the purpose of the W-position (or semi-sitting position with knees raised) after rescuing a suspension trauma casualty?',
    options: [
      'It speeds the return of pooled blood to the heart, so that normal circulation is restored quickly to the brain again',
      'It keeps the airway open in the same way as the recovery position while the casualty is assessed on the ground',
      'It slows the return of pooled venous blood to the heart, reducing the risk of reflow syndrome and cardiac arrest',
      'It relieves pressure on the spine in case the casualty struck the structure during the fall from the height',
    ],
    correctAnswer: 2,
    explanation:
      'The W-position (seated with knees raised above the hips, or squatting position) slows the return of pooled, deoxygenated blood from the lower limbs back to the heart. This controlled redistribution reduces the risk of reflow syndrome — a potentially fatal surge of toxic blood that can cause cardiac arrest or acute kidney failure.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Suspension Trauma Timeline',
    category: 'Incident Response & Responsibilities',
  },
  {
    id: 191,
    question:
      "Under RIDDOR 2013, which of the following scenarios involving work at height would be classified as a 'dangerous occurrence' even if nobody was injured?",
    options: [
      'A worker dropping a hand tool from a scaffold onto the walkway below, where it lands harmlessly and nobody is struck or has to take avoiding action at all',
      'A worker forgetting to clip their lanyard onto the anchor point for a few moments while moving along the leading edge of the roof while working on the site',
      'A minor slip on a wet working platform which is stopped by the guard rail and which causes no injury to the worker on the platform at all that day',
      'An uncontrolled release or escape of a substance that could cause injury (e.g., a counterweight falling from a crane being used for work at height)',
    ],
    correctAnswer: 3,
    explanation:
      'Dangerous occurrences under RIDDOR Schedule 2 include events such as the collapse of lifting equipment, the uncontrolled release of substances, scaffold collapses over 5 metres, and contact with overhead power lines. These are reportable even when no injury results because they indicate a high potential for serious harm.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'RIDDOR 2013',
    category: 'Incident Response & Responsibilities',
  },
  {
    id: 192,
    question: 'What is the legal retention period for records of LOLER thorough examinations?',
    options: [
      'Until the next thorough examination for equipment not used for lifting persons, or 2 years for equipment used for lifting persons',
      'For a fixed period of 6 months from the date of the report, regardless of the type of equipment or how it is used anywhere on the site',
      'For the entire working life of the equipment and then for a further 5 years after it is scrapped permanently from the register of site plant',
      'There is no legal requirement to retain the reports once the defects identified have been remedied during the last thorough examination of it',
    ],
    correctAnswer: 0,
    explanation:
      'Under LOLER 1998, records of thorough examinations must be kept until the next thorough examination for general lifting equipment. For equipment used to lift persons (including harnesses used for fall arrest), records must be kept for at least 2 years from the date of the examination.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Legal Retention Periods',
    category: 'Incident Response & Responsibilities',
  },

  // --- advanced (8) ---
  {
    id: 193,
    question:
      'A worker falls from a scaffold and is found unconscious with a suspected spinal injury. A first aider arrives on scene. Following the ABC protocol, the casualty has no obstructed airway but is not breathing. What is the correct action regarding spinal precautions?',
    options: [
      'Do not attempt to open the airway at all, because any movement of the head or neck could worsen a spinal injury; wait for the paramedics to arrive with a collar and monitor for any sign that breathing has returned on its own in the meantime',
      'The immediate priority is to open the airway using a jaw thrust (rather than head tilt) to minimise spinal movement, and commence CPR if no breathing is detected — the need to resuscitate overrides the spinal precaution to avoid movement',
      'Roll the casualty fully onto their side into the recovery position before checking the breathing again, as this protects the airway and keeps the spine in line while help is on its way and until the paramedics arrive on the scene',
      'Immobilise the head and neck by hand and wait for the paramedics before attempting any airway management or chest compressions, since a spinal injury is by far the more serious of the two to deal with at this point in time on the site',
    ],
    correctAnswer: 1,
    explanation:
      'When a casualty with a suspected spinal injury is not breathing, the life-threatening emergency of respiratory arrest takes priority. The jaw thrust manoeuvre opens the airway with minimal cervical spine movement. If there is still no breathing, CPR must commence. Preserving life overrides the spinal immobilisation precaution, though movements should be minimised throughout.',
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'First Aid for Falls',
    category: 'Incident Response & Responsibilities',
  },
  {
    id: 194,
    question:
      "Following a serious work-at-height incident, a root cause analysis using the '5 Whys' reveals that the immediate cause was a missing guard rail, but the root cause was a failure in the management system for scaffold handover inspections. What type of corrective action best addresses the root cause?",
    options: [
      'Refitting the missing guard rail, briefing the gang on the incident at a toolbox talk, and allowing the work to continue on the same scaffold once it is back in place and has been checked',
      'Disciplining the worker who fell for failing to notice that the guard rail was missing before stepping onto the platform, and reissuing the site safety rules to everyone',
      'Revising the scaffold handover procedure, retraining all competent persons on the inspection protocol, implementing a verification system, and auditing compliance at defined intervals',
      'Issuing every worker on the site with a personal fall arrest harness and lanyard, to be worn on all scaffolds in future regardless of the edge protection fitted',
    ],
    correctAnswer: 2,
    explanation:
      'Addressing the root cause requires systemic changes: revising the handover procedure to close the identified gap, retraining inspection personnel, implementing verification checks (such as a second-person sign-off), and auditing compliance regularly. Simply replacing the guard rail (immediate cause) without addressing the management system failure would leave the organisation vulnerable to recurrence.',
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'Root Cause Analysis',
    category: 'Incident Response & Responsibilities',
  },
  {
    id: 195,
    question:
      "Under CDM 2015, a principal designer identifies during the design phase that a proposed building feature will require ongoing work at height for maintenance throughout the building's life. What is the principal designer's duty?",
    options: [
      'There is no duty in respect of that feature, because maintenance risks arise after handover and therefore fall outside the scope of CDM 2015 and the principal designer\'s appointment, which ends at practical completion',
      'The duty is to warn the future building owner verbally at handover about the maintenance risk, so that they can make their own arrangements for access when the time comes',
      'The duty is to arrange for the maintenance work to be carried out by the original design team for the whole life of the building under a separate maintenance contract',
      'Design out or reduce the need for work at height where reasonably practicable, and where it cannot be eliminated, provide information about remaining risks in the health and safety file for future duty holders',
    ],
    correctAnswer: 3,
    explanation:
      'CDM 2015 Regulation 9 requires the principal designer to eliminate or reduce risks from the design itself, including foreseeable maintenance activities. If work at height cannot be designed out (e.g., by providing permanent access platforms or fall protection anchors), the residual risks and recommended control measures must be recorded in the health and safety file for future maintainers.',
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'CDM 2015',
    category: 'Incident Response & Responsibilities',
  },
  {
    id: 196,
    question:
      "An incident investigation reveals that a contractor's operatives were not trained in harness use but were directed by their supervisor to work at height using harnesses. Which parties may face enforcement action, and under what legislation?",
    options: [
      'The contractor (employer) for failing to provide adequate training under HSWA s.2 and WAH Regs; the supervisor for directing untrained persons; and potentially the principal contractor for failing to monitor under CDM 2015',
      'The individual operatives alone, who each have a duty under HSWA s.7 to take reasonable care of their own safety and to co-operate with their employer, and who should have refused to work at height untrained',
      'No party can face enforcement action, because no fall occurred and nobody was injured, so there is no breach for the HSE or the principal contractor to pursue against anyone',
      'The harness manufacturer alone, for supplying fall arrest equipment to a contractor whose operatives had not completed the manufacturer\'s own user training course beforehand',
    ],
    correctAnswer: 0,
    explanation:
      'Multiple duty holders may face enforcement: the contractor/employer for failing to ensure competence and provide training (HSWA s.2, WAH Regs Schedule 5); the supervisor for directing untrained workers to perform a high-risk task; and the principal contractor for failing in their CDM 2015 duty to plan, manage, and monitor subcontractor compliance. Enforcement is not dependent on injury occurring.',
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'Employer/Employee Duties',
    category: 'Incident Response & Responsibilities',
  },
  {
    id: 197,
    question:
      'A construction company wants to implement a positive near-miss reporting culture. Which of the following strategies is most likely to be effective?',
    options: [
      'Disciplining any worker who reports a near miss, so that carelessness is deterred and the number of near misses recorded on the site falls month on month towards zero',
      'Implementing a no-blame reporting system with visible management commitment, feedback on actions taken, recognition for reporting, and integration of near-miss data into risk assessment reviews',
      'Making near-miss reporting completely anonymous, collating the reports into a monthly file for the safety adviser, and taking no visible action on the individual reports received',
      'Setting a target that limits the number of near misses each gang may report each month, so that supervisors are not overwhelmed by paperwork and can focus on the serious ones',
    ],
    correctAnswer: 1,
    explanation:
      'An effective near-miss culture requires a no-blame approach so workers feel safe to report without fear of punishment. Management must visibly support the system, provide timely feedback on what actions have been taken, recognise reporters, and use the data to improve risk assessments and safe systems of work. Punitive approaches suppress reporting and hide valuable safety intelligence.',
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'Near-Miss Culture',
    category: 'Incident Response & Responsibilities',
  },
  {
    id: 198,
    question:
      'A competent person conducting a 7-day scaffold inspection discovers that unauthorised modifications have been made since the last inspection. What is the correct procedure?',
    options: [
      'Allow the modified scaffold to remain in use, since it appears structurally sound and the trades need access to complete their work, and note the change on the inspection record so that it is picked up at the next 7-day inspection',
      'Note the modifications on the inspection record, sign the scaffold off as inspected and safe for use, and ask the scaffolding contractor to have a look at the alterations when they are next on site',
      'Immediately prohibit use of the scaffold, tag it as unsafe, investigate who made the modifications and why, have the scaffold redesigned or returned to its approved configuration by a competent scaffolder, and re-inspect before permitting reuse',
      'Reverse the modifications yourself on the spot using the fittings to hand, sign the scaffold off as safe, and brief the gang using it that no further alterations are to be made without permission',
    ],
    correctAnswer: 2,
    explanation:
      "Unauthorised modifications compromise the scaffold's structural integrity and compliance with the design. The scaffold must be immediately taken out of service and tagged as unsafe. An investigation should identify the cause (which may reveal systemic issues like poor site control). A competent scaffolder must then either restore the approved design or obtain a new design for the modified configuration, followed by a fresh inspection.",
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'Inspection Regimes',
    category: 'Incident Response & Responsibilities',
  },
  {
    id: 199,
    question:
      'What are the legal consequences for an employer found guilty of breaching the Health and Safety at Work etc. Act 1974 resulting in a fatal fall from height?',
    options: [
      'A fixed maximum fine of £5,000 in the magistrates\' court with no possibility of imprisonment for any individual, no unlimited fines for organisations, and no separate corporate offence available to the prosecution under any other Act',
      'A formal written warning from the HSE followed by an Improvement Notice, with no financial penalty unless the notice is subsequently breached, and no possibility of proceedings against individuals',
      'A requirement to retrain all staff and revise the risk assessments under an HSE action plan, but no fine, no criminal record and no possibility of proceedings against individual directors',
      'Unlimited fine and/or up to 2 years imprisonment for individuals; unlimited fines for organisations under the sentencing guidelines, plus potential corporate manslaughter charges under the Corporate Manslaughter and Corporate Homicide Act 2007',
    ],
    correctAnswer: 3,
    explanation:
      "Breaches of the HSWA 1974 resulting in death carry severe penalties: unlimited fines for organisations (with sentencing guidelines based on turnover, culpability, and harm), and for individuals, unlimited fines and up to 2 years' imprisonment. Additionally, the Corporate Manslaughter and Corporate Homicide Act 2007 can apply where a gross management failure causes death.",
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'Employer/Employee Duties',
    category: 'Incident Response & Responsibilities',
  },
  {
    id: 200,
    question:
      'Following a RIDDOR-reportable fall from height, the HSE inspector issues an Improvement Notice. What does this mean and what must the duty holder do?',
    options: [
      'The duty holder has a specified period to remedy the contravention identified; failure to comply is a criminal offence, and the duty holder has the right to appeal to an employment tribunal within 21 days',
      'All work at height on the site must stop immediately and permanently, the notice takes effect the moment it is served, and there is no right of appeal against it to any court or employment tribunal',
      'It is advisory guidance identifying good practice which the duty holder may adopt or set aside as they see fit, and no further enforcement action follows if it is simply ignored',
      'The duty holder must pay an automatic fixed penalty within 21 days of the notice being issued, after which the matter is treated as closed and no further action is taken',
    ],
    correctAnswer: 0,
    explanation:
      "An Improvement Notice requires the duty holder to remedy the specified contravention within a stated time period (at least 21 days). It is a formal enforcement action, and failure to comply is a criminal offence. The duty holder has the right to appeal to an employment tribunal within 21 days of the notice being served, during which time the notice is suspended pending the tribunal's decision.",
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'Investigation Process',
    category: 'Incident Response & Responsibilities',
  },
  {
    id: 201,
    question:
      'Under the Work at Height Regulations 2005, what counts as work at height?',
    options: [
      'Any work carried out above two metres from ground level',
      'Work anywhere a person could fall a distance liable to cause injury',
      'Work on a scaffold, tower or mobile elevating work platform',
      'Any work needing a ladder rather than a step or a hop-up',
    ],
    correctAnswer: 1,
    explanation:
      'The Regulations define work at height as work in any place where, if there were no precautions, a person could fall a distance liable to cause personal injury. That includes falling through a fragile surface or into a hole in a floor, so a low mezzanine edge or a loft hatch counts. The two-metre answer is the common trap: two metres is the threshold at which a construction working platform must have a recorded inspection, not the point at which the Regulations start to apply.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Work at Height',
    category: 'Understanding Working at Height',
  },
  {
    id: 202,
    question:
      'What is the correct order of the three steps in the work at height hierarchy?',
    options: [
      'Assess the risk, then issue harnesses, then supervise closely',
      'Prevent falls first, then avoid the work, then train workers',
      'Avoid work at height, then prevent falls, then minimise them',
      'Provide equipment, then write a method statement, then train',
    ],
    correctAnswer: 2,
    explanation:
      'The Regulations require you to avoid work at height where it is reasonably practicable, then prevent falls using a safe existing place of work or the right equipment, then minimise the distance and consequences of a fall where risk remains. Starting with harnesses or equipment selection is the classic error: it jumps straight to the last step and locks in a risk that could have been designed out, for example by lowering a lighting mast or making off cables at bench level.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Hierarchy of Control',
    category: 'Understanding Working at Height',
  },
  {
    id: 203,
    question:
      'Why must collective protection be considered before personal protection?',
    options: [
      'It costs the employer less than issuing harnesses to everyone',
      'It works without the person at height having to act correctly',
      'It removes the need to carry out any risk assessment at all',
      'It is the only option the regulations allow on a flat roof',
    ],
    correctAnswer: 1,
    explanation:
      'Collective protection such as a guard rail protects everyone at risk and does not depend on the individual doing anything, whereas personal protection only works if that person puts the harness on correctly and clips to a sound anchor every single time. Cost is not the legal test and is not why the order exists. Risk assessment is still required whichever measure is chosen, and a flat roof can be protected by several means.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Hierarchy of Control',
    category: 'Fall Protection & Prevention',
  },
  {
    id: 204,
    question:
      'Lamps must be changed in a car park lighting column that can be lowered to ground level, but the team proposes hiring a MEWP. Why does the hierarchy favour lowering the column?',
    options: [
      'A MEWP always needs an operator licence that neither man holds',
      'MEWPs are usable outdoors only where the ground is fully level',
      'Lowering the column avoids the need for any risk assessment',
      'Lowering it removes the work at height, so no fall risk remains',
    ],
    correctAnswer: 3,
    explanation:
      'Avoidance sits above every equipment choice because it eliminates the hazard rather than controlling it. HSE guidance gives lowering a lighting mast as a worked example of doing the job from the ground. The MEWP answer is attractive because a MEWP is genuinely safe equipment, but choosing it accepts a fall risk that did not have to exist. A risk assessment is still needed for the lowering operation itself.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'Hierarchy of Control',
    category: 'Safe Systems of Work',
  },
  {
    id: 205,
    question:
      'Why is a work restraint lanyard the preferred personal system for an operative in a boom-type MEWP basket?',
    options: [
      'It absorbs more energy than a fall-arrest lanyard would absorb',
      'It stops the wearer reaching a position from which they could fall',
      'It removes the need to inspect the basket anchor point at all',
      'It lets the operative lean out and work beyond the guard rails',
    ],
    correctAnswer: 1,
    explanation:
      'HSE guidance on MEWPs describes work restraint as a full body harness to BS EN 361 with a lanyard to BS EN 354 clipped to the basket anchor, kept short enough that the wearer cannot reach a fall position. Restraint prevents the fall; arrest only limits the damage after it. The energy-absorption answer confuses the two: a restraint lanyard may include an absorber to BS EN 355 but the system is still restraint, and if it is long enough to let you lean out it has stopped being restraint at all.',
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'Fall Protection',
    category: 'Fall Protection & Prevention',
  },
  {
    id: 206,
    question:
      'A restraint lanyard has been adjusted long enough for the operative to reach past the basket guard rail. What has that adjustment created?',
    options: [
      'A compliant restraint system, because the harness is still worn',
      'A rescue requirement that the basket guard rail already satisfies',
      'A fall-arrest situation with no assurance the system will arrest',
      'An acceptable arrangement provided the work lasts under an hour',
    ],
    correctAnswer: 2,
    explanation:
      'Lengthening the lanyard so the wearer can reach a fall position converts restraint into arrest without any of the checks arrest demands, namely a verified anchor able to take the impact load, an energy absorber, adequate clearance below and a rescue plan. Believing it is still compliant because a harness is worn is the dangerous misreading. Duration is irrelevant; the geometry of the lanyard decides what the system actually is.',
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'Fall Protection',
    category: 'Fall Protection & Prevention',
  },
  {
    id: 207,
    question:
      'HSG150 restricts the use of inertia reel fall arresters to an overhead anchor within what limit?',
    options: [
      'Within a 45-degree cone measured under the anchor point',
      'Within a 30-degree cone measured under the anchor point',
      'At any angle provided the line is kept clear of slack',
      'Directly overhead only, with no sideways movement at all',
    ],
    correctAnswer: 1,
    explanation:
      'HSG150 states that inertia reels should only be used with an overhead anchor within a 30-degree cone under the anchor. Working outside that cone allows a pendulum or swing fall, where the user swings back into the structure and is injured even though the device locked correctly. Permitting any angle ignores swing fall entirely, and restricting movement to directly under the anchor is stricter than the guidance and would make most work impossible.',
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'Fall Arrest',
    category: 'Fall Protection & Prevention',
  },
  {
    id: 208,
    question:
      'A safe system of work relies on harnesses. When must the rescue arrangements be in place?',
    options: [
      'As soon as a fall happens and the alarm has been raised on site',
      'Where the emergency services cannot reach the site quickly',
      'At the next weekly inspection of the fall protection equipment',
      'Before anyone works at height relying on the harness system',
    ],
    correctAnswer: 3,
    explanation:
      'HSE guidance is explicit that whenever harnesses are used a method must be available to recover someone left suspended, and that it is not appropriate to rely on the emergency services because they may not arrive in time or carry the right kit. Rescue kits and training are usually available from the harness supplier. Arranging rescue after the fall, or only where response times are poor, leaves a suspended casualty waiting while their condition deteriorates.',
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'Rescue Planning',
    category: 'Incident Response & Responsibilities',
  },
  {
    id: 209,
    question:
      'Once no safer access can be justified, which three conditions make a ladder acceptable as a place of work?',
    options: [
      'A second worker footing it, dry weather, and a hard level floor',
      'A class 1 ladder, a permit to work, and a signed method statement',
      'Short-duration work, light work, and a secure handhold available',
      'Work under three metres, a spotter present, and a harness worn',
    ],
    correctAnswer: 2,
    explanation:
      'HSG150 allows a ladder or stepladder to be used as a workplace only for short-duration work, taken as 15 to 30 minutes in one position depending on the risk assessment, for light work, and only if a secure handhold is available. Footing is treated as a last resort rather than a qualifying condition, and none of the paperwork or height thresholds in the other options appear in the guidance as the test of acceptability.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Ladders',
    category: 'Access Equipment & Selection',
  },
  {
    id: 210,
    question:
      'What does HSG150 say about footing a ladder as the means of securing it?',
    options: [
      'It is the preferred method wherever tying is not practicable',
      'It is a last resort and should be avoided by using other access',
      'It is acceptable for any ladder used for under thirty minutes',
      'It is required whenever a ladder stands on a public footpath',
    ],
    correctAnswer: 1,
    explanation:
      'HSG150 lists the securing options in order: tie the ladder with both stiles secured, or where that is not practicable use an effective stability device such as a stay and anti-slip foot, or wedge the base against something solid. Footing comes last and should be designed out by using other access equipment. A person standing on the bottom rung cannot reliably stop a ladder sliding sideways or rotating about a stile, which is why almost half of ladder accidents involve a ladder that was not properly secured.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Ladders',
    category: 'Access Equipment & Selection',
  },
  {
    id: 211,
    question:
      'What is the rule of thumb for setting a leaning ladder at the correct angle?',
    options: [
      'One metre out from the wall for every two metres of height',
      'Set the stiles vertical and rely on a stability device instead',
      'As close to vertical as possible to reduce the risk of sliding',
      'One metre out from the wall for every four metres of height',
    ],
    correctAnswer: 3,
    explanation:
      'HSG150 gives the rule of thumb as one out for every four up, the 1 in 4 angle, and HSE guidance for clients repeats it as a 1:4 angle with the ladder tied or footed. Too shallow an angle makes the base slide out; setting the ladder too close to vertical, as two of the distractors suggest, makes it liable to tip backwards as the climber shifts weight and gives no useful reaction into the wall.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Ladders',
    category: 'Access Equipment & Selection',
  },
  {
    id: 212,
    question:
      'A ladder is being used to reach a flat roof. What does HSG150 require at the top of that ladder?',
    options: [
      'It should be tied and extend at least 1 m above the landing point',
      'It should be tied level with the landing to avoid an obstruction',
      'It should rest on the roof covering and be wedged at the base',
      'It should be footed by a second person at the base while in use',
    ],
    correctAnswer: 0,
    explanation:
      'A ladder used for access to another level should be tied and should extend at least 1 m above the landing point so there is a secure handhold at the moment of stepping on and off. Stopping level with the landing is the tempting answer because it looks tidy, but it forces the climber to transfer without a handhold, which is when many ladder falls occur. Wedging or footing does not address the handhold problem at the top.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Ladders',
    category: 'Access Equipment & Selection',
  },
  {
    id: 213,
    question:
      'Which statement about the top of a ladder or stepladder reflects HSG150 guidance?',
    options: [
      'Do not use the top rung alone, provided both feet stay together',
      'Do not use the top three rungs of a leaning ladder when working',
      'The top platform of any stepladder may be stood on when it is tied',
      'Any rung may be used once the stiles are tied at both sides',
    ],
    correctAnswer: 1,
    explanation:
      'HSG150 says ladders must be long enough that the top three rungs are not used, so the stiles still rise past the worker and provide a handhold. For stepladders the guidance is to avoid the top two steps unless a suitable handrail is available, and to avoid the top three steps of a swing-back or double-sided stepladder where the step forms the very top. Tying the stiles improves stability but does not create the handhold that the unused top rungs provide.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Ladders',
    category: 'Access Equipment & Selection',
  },
  {
    id: 214,
    question:
      'Why should side-on drilling into masonry be avoided from a stepladder?',
    options: [
      'The drill torque will loosen the locking bar and fold the steps',
      'Side loading voids the manufacturer warranty on most stepladders',
      'Stepladders are not designed for side loading and overturn easily',
      'Drilling counts as heavy work so a harness must be worn instead',
    ],
    correctAnswer: 2,
    explanation:
      'HSG150 warns that stepladders take no appreciable side loading and are relatively easily overturned, so the steps should face the work. Where side-on loading cannot be avoided the steps should be tied to a suitable point or different access equipment chosen. The warranty answer is a commercial issue rather than a safety control, and clipping a harness to nothing solid on a stepladder adds no protection at all.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Ladders',
    category: 'Access Equipment & Selection',
  },
  {
    id: 215,
    question:
      'What checking regime does HSG150 set for ladders in use on a site?',
    options: [
      'A pre-use check each working day plus a recorded detailed inspection',
      'A recorded inspection every three months carried out by the user',
      'A single check on delivery to site, logged in the site register',
      'A weekly check by the user with no record needed at any point',
    ],
    correctAnswer: 0,
    explanation:
      'HSG150 requires a pre-use check each working day and a current detailed visual inspection carried out in line with the manufacturer instructions and recorded. Ladders forming part of a scaffold system must in addition be inspected every seven days. A quarterly regime is the interval associated with detailed inspection of harnesses in arduous use, not ladders, and a check only on delivery misses damage caused on site.',
    section: 'Module 6',
    difficulty: 'intermediate',
    topic: 'Inspection',
    category: 'Safe Systems of Work',
  },
  {
    id: 216,
    question:
      'A working platform is used for construction work and a person could fall more than 2 m from it. Which inspection regime applies?',
    options: [
      'After assembly alone, unless the platform is later dismantled',
      'Weekly alone, with no further check after severe weather hits',
      'Before each shift by the user, with no written record required',
      'After assembly, after any event affecting stability, and weekly',
    ],
    correctAnswer: 3,
    explanation:
      'HSE guidance is that such a platform must be inspected after assembly in any position, after any event liable to have affected its stability, and at intervals not exceeding seven days, with the inspection recorded. Weekly alone is the attractive wrong answer because it captures the interval but drops the trigger events, so a scaffold hit by a vehicle or a gale would stay in use until the next routine check.',
    section: 'Module 6',
    difficulty: 'advanced',
    topic: 'Inspection',
    category: 'Safe Systems of Work',
  },
  {
    id: 217,
    question:
      'Who is competent to carry out the inspection of a scaffold working platform?',
    options: [
      'A person with the skills, experience and knowledge for the task',
      'Any operative who holds a current site safety awareness card',
      'The site manager, because the legal duty sits with the employer',
      'The scaffolder who erected it, as a matter of law in every case',
    ],
    correctAnswer: 0,
    explanation:
      'A competent person is someone with the necessary skills, experience and knowledge to manage the health and safety of that particular task, judged against the complexity of what is being inspected. Holding a general awareness card proves attendance, not the ability to judge a scaffold. The duty sits with the employer, but holding the duty does not make the manager technically competent, and the erector is one candidate rather than a legal requirement.',
    section: 'Module 6',
    difficulty: 'advanced',
    topic: 'Competence',
    category: 'Incident Response & Responsibilities',
  },
  {
    id: 218,
    question:
      'Why are roof lights singled out as a particular hazard during roof work?',
    options: [
      'They carry the roof load so walking on them damages the purlins',
      'They are usually the one part of a roof that is not fragile',
      'They are fragile and can be hard to see or hidden under paint',
      'They can be crossed once the edge protection has been removed',
    ],
    correctAnswer: 2,
    explanation:
      'HSG150 notes that roof openings and fragile roof lights are a particular hazard because some are difficult to see in certain light and others are obscured by paint, and HSE lists roof lights first among surfaces likely to be fragile. Protection must come from barriers, or covers that are secured and labelled with a warning. Treating a roof light as sound because it looks solid underfoot is exactly the assumption that kills people.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'Fragile Surfaces',
    category: 'Understanding Working at Height',
  },
  {
    id: 219,
    question:
      'Containment must be routed across an ageing profiled metal sheet roof. Which approach matches HSG150?',
    options: [
      'Treat the sheets as if they were not there and work off staging',
      'Walk on the line of fixings above the purlins to spread the load',
      'Test one sheet with body weight before committing to the route',
      'Cross quickly at the ridge where the sheets are best supported',
    ],
    correctAnswer: 0,
    explanation:
      'HSG150 says do not trust any sheeted roof and do not stand directly on one, and that you should approach the roof as if the sheets were not in position. Walking the line of bolts above the purlins or along the ridge is expressly rejected because the sheets can still crack and give way, and steel sheets rust while fibre cement and plastic embrittle with age. Where access cannot be avoided, use staging to spread the load with edge protection at the perimeter, plus nets beneath or a harness system unless all work is from guarded staging.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'Fragile Surfaces',
    category: 'Safe Systems of Work',
  },
  {
    id: 220,
    question:
      'An opening in a floor is to be protected by a cover instead of guard rails. What must that cover be?',
    options: [
      'Strong enough for likely loads, fixed in place, and marked as a warning',
      'Made of plywood painted a bright colour and laid over the opening',
      'Removable by hand so that services can be dropped through it later',
      'Left loose so that it can be lifted clear quickly in an emergency',
    ],
    correctAnswer: 0,
    explanation:
      'HSG150 requires any covering over an opening or fragile material to be strong enough to support the loads likely to be placed on it, including the weight of a person, and fixed to prevent accidental dislodgement, with a warning marking such as hole below do not remove. A loose or hand-removable cover is the dangerous answer because it will be lifted for access and not replaced, and colour alone does nothing once material is stacked on top of it.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Edge Protection',
    category: 'Fall Protection & Prevention',
  },
  {
    id: 221,
    question:
      'Why must a safety net be rigged as close as possible to the level where people are working?',
    options: [
      'It allows the net to be inspected from the working platform itself',
      'It removes the need for edge protection around the working area',
      'It lets the net be signed off by the user rather than an installer',
      'It keeps the fall distance short and limits the energy of the fall',
    ],
    correctAnswer: 3,
    explanation:
      'HSG150 requires nets to be positioned as close as possible to the working level to minimise the height of any fall, because the shorter the drop the less energy the net and the body have to absorb. Nets sit in the minimise step of the hierarchy, so they do not displace edge protection where preventing the fall is still practicable, and installation and sign-off remain the job of trained and competent people.',
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'Fall Arrest',
    category: 'Fall Protection & Prevention',
  },
  {
    id: 222,
    question:
      'What inspection regime applies to an installed safety net system?',
    options: [
      'Inspection by a competent person after installation, then weekly',
      'Inspection by the user before each shift, with no record needed',
      'Inspection when the net has been used to arrest a fall from above',
      'Inspection every seven days by whoever is working above the net',
    ],
    correctAnswer: 0,
    explanation:
      'HSG150 states that safety net systems should be inspected by a competent person after installation, with a handover certificate confirming their safety, and then inspected weekly to confirm they are still fixed correctly and will arrest a fall. The last distractor is close but wrong on who: the person working above is not necessarily competent to judge net fixings. If a net has arrested a fall the installer should be consulted before it is relied on again.',
    section: 'Module 6',
    difficulty: 'advanced',
    topic: 'Inspection',
    category: 'Safe Systems of Work',
  },
  {
    id: 223,
    question:
      'Why is the clearance beneath a safety net a critical part of the design?',
    options: [
      'The net deforms as it absorbs the load and needs room to do so',
      'The net must hang clear so it can be swept out after each shift',
      'The net needs airflow beneath it to stop the mesh degrading fast',
      'The clearance lets a rescue team walk directly beneath the net',
    ],
    correctAnswer: 0,
    explanation:
      'HSG150 explains that when a person falls into a net the material deforms as it absorbs the load, so adequate clearance must exist below for that deformation to happen without the faller striking the ground, a beam or stacked materials. A net rigged tight against an obstruction can still leave a fatal impact. Housekeeping and access underneath matter, but they are not what sets the clearance.',
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'Fall Arrest',
    category: 'Fall Protection & Prevention',
  },
  {
    id: 224,
    question:
      'A leading edge cannot be guarded. Nets under the work and a personal fall arrest system are both feasible. Which is preferred and why?',
    options: [
      'Fall arrest, because it holds the faller at the point of the anchor',
      'Fall arrest, because it needs no inspection once it has been rigged',
      'Nets, because they protect everyone at risk without individual action',
      'Nets, because they remove the need to plan any rescue arrangements',
    ],
    correctAnswer: 2,
    explanation:
      'Both sit in the minimise step, but the guidance ranks collective mitigation such as nets or soft landing systems above personal mitigation, because a net catches anyone who falls without them having to do anything. A fall arrest system only works if that individual dons the harness correctly, clips to a verified anchor and has clearance beneath. Nets do not abolish rescue planning either, since a person in a net still has to be recovered.',
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'Fall Protection',
    category: 'Fall Protection & Prevention',
  },
  {
    id: 225,
    question:
      'How often should a harness in arduous use receive a detailed inspection?',
    options: [
      'At least every three months, on top of the checks before use',
      'At least every twelve months, on top of the checks before use',
      'After it has been used to arrest a fall, and at no other point',
      'When the wearer reports a defect following a period of use',
    ],
    correctAnswer: 0,
    explanation:
      'HSG150 says harnesses should be subject to a detailed inspection which for arduous use should be carried out at least every three months, and that sits alongside the pre-use check by the wearer. Waiting for a fall or for a reported defect is reactive: webbing damaged by grit, sunlight, battery acid or heat can fail on first loading with no complaint from the user beforehand.',
    section: 'Module 6',
    difficulty: 'intermediate',
    topic: 'Inspection',
    category: 'Safe Systems of Work',
  },
  {
    id: 226,
    question:
      'A worker moving along steelwork uses a twin-tailed lanyard. Where must the unused leg never be clipped?',
    options: [
      'Back onto the harness itself while the other leg is anchored',
      'Onto the same anchor point as the leg already connected there',
      'Onto a separate anchor point ahead of the wearer on the route',
      'Onto a fixed eye above head height alongside the walking route',
    ],
    correctAnswer: 0,
    explanation:
      'HSG150 warns that when one leg is connected to the anchor the second leg must not be attached back to the harness, because that can limit the extension of the energy absorber in a fall and leave the body taking the arrest force. The other options describe normal use of a twin tail, where the free leg is clipped ahead so the worker is never unattached while moving.',
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'Fall Arrest',
    category: 'Fall Protection & Prevention',
  },
  {
    id: 227,
    question:
      'What must be established about an anchor point before a fall arrest system is relied on?',
    options: [
      'That it can take the impact load with an appropriate safety factor',
      'That it is painted and numbered so it can be found from below',
      'That it is at waist level so the connector is easy to reach',
      'That it belongs to the contractor rather than the building owner',
    ],
    correctAnswer: 0,
    explanation:
      'HSG150 requires any attachment point to be capable of withstanding the impact load generated in a fall with an appropriate factor of safety, and says expert advice may be needed; a harness system should not be used unless a suitably positioned and fully secure anchorage has been specified. The waist-level answer is the dangerous one, since a low anchor increases both the fall distance and the arrest forces, which is why arrest anchors are sited above the head.',
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'Fall Arrest',
    category: 'Fall Protection & Prevention',
  },
  {
    id: 228,
    question:
      'What does the law require of an employee working at height?',
    options: [
      'Report any safety hazard they identify and use the equipment properly',
      'Carry out the risk assessment for their own work at height task',
      'Provide their own harness and lanyard for work above two metres',
      'Set the inspection intervals for the access equipment they use',
    ],
    correctAnswer: 0,
    explanation:
      'Employees must take reasonable care, co-operate with their employer, report hazards they spot, and use the equipment and safety devices supplied in line with their training and instructions, seeking further instruction if following them would be unsafe. Risk assessment, provision of equipment and setting inspection regimes are employer duties, and an employer cannot transfer them to the operative on the ladder.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Duties',
    category: 'Incident Response & Responsibilities',
  },
  {
    id: 229,
    question:
      'Which of these is a legal requirement when planning any work at height?',
    options: [
      'Check the place where the work will happen every time before use',
      'Check the place once at the start of the contract and record it',
      'Check the weather forecast where a MEWP is to be deployed',
      'Check the access route where members of the public can reach it',
    ],
    correctAnswer: 0,
    explanation:
      'HSE lists as legal requirements that each place where people will work at height is checked every time before use, that weather conditions which could compromise safety are taken into account for all work at height, that falling objects are prevented or controlled, that materials are stored so they cannot collapse, and that emergency and rescue procedures are planned. A single check at contract start is the trap: roof surfaces, guard rails and openings change day to day.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'Planning',
    category: 'Understanding Working at Height',
  },
  {
    id: 230,
    question:
      'What is the status of brick guards fitted to a scaffold platform?',
    options: [
      'They stop materials falling and do not serve as fall protection',
      'They replace the toe board where materials are stacked at edges',
      'They count as edge protection once fitted along the whole lift',
      'They remove the need for an exclusion zone below the scaffold',
    ],
    correctAnswer: 0,
    explanation:
      'HSG150 is clear that brick guards address falling materials and are not intended to protect against people falling, so they are used in addition to the required guard rails and toe boards rather than instead of them. Where it is not reasonably practicable to stop objects falling, the control is to keep people out of the danger area, for example with exclusion zones or scaffold mesh.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Edge Protection',
    category: 'Fall Protection & Prevention',
  },
  {
    id: 231,
    question:
      'An electrician works from a boom MEWP among low steelwork and pipe bridges. Which control does HSE guidance point to for the entrapment risk?',
    options: [
      'Rely on the basket guard rails to hold the operator clear of steel',
      'Reduce the platform height so the operator can jump clear if trapped',
      'Select a MEWP with secondary guarding and give extra operator training',
      'Fit a taller guard rail so the operator has to stand further back',
    ],
    correctAnswer: 2,
    explanation:
      'HSE guidance on MEWPs says that where structures exist against which an operator could be trapped or crushed you should consider selecting a machine fitted with secondary guarding, and assess whether the standard operator training is enough or whether additional training for higher risk environments is needed. Overhead hazards such as power lines, beams, pipe bridges and trees must be identified first. Guard rails stop a fall out of the basket; they do nothing about the operator being pushed onto the controls or crushed against a beam.',
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'MEWPs',
    category: 'Safe Systems of Work',
  },
  {
    id: 232,
    question:
      'What must the plan cover if an operative in a MEWP basket is injured or trapped while at height?',
    options: [
      'A call to the fire and rescue service as the primary means of recovery',
      'A second MEWP kept on hire for the whole contract as a standby unit',
      'A note in the risk assessment that the operator can self-lower safely',
      'A rehearsed means of bringing the person down without outside help',
    ],
    correctAnswer: 3,
    explanation:
      'HSE guidance requires emergency and rescue procedures to be planned in advance and warns against relying entirely on the emergency services, who may not arrive in time or carry the right equipment. The recovery method has to work when the person at height cannot help themselves, which is exactly why an assumption that the operator will self-lower fails: an unconscious or trapped operator cannot touch the controls.',
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'Rescue Planning',
    category: 'Incident Response & Responsibilities',
  },
  {
    id: 233,
    question:
      'What checking regime does HSG150 set for a suspended access cradle?',
    options: [
      'A visual check by the installer once a month with a written record',
      'A visual check for obvious faults before each use plus a weekly one',
      'A visual check at the start of the contract and after any incident',
      'A visual check by the operator each week with no record required',
    ],
    correctAnswer: 1,
    explanation:
      'HSG150 requires a thorough visual pre-use check for obvious faults before each use of a cradle, plus a weekly inspection by a competent person which is recorded. Most cradle accidents trace back to poorly secured counterweights, failed pins and bolts, or winches and ropes degraded by poor maintenance, all of which a pre-use look can catch before the cradle leaves the parapet. Monthly or contract-start checks leave far too long a gap.',
    section: 'Module 6',
    difficulty: 'intermediate',
    topic: 'Inspection',
    category: 'Safe Systems of Work',
  },
  {
    id: 234,
    question:
      'Full edge protection is not reasonably practicable for a short job on a sloping roof. What is the minimum HSG150 accepts?',
    options: [
      'A colleague watching from the ground and a demarcated area below',
      'A harness worn but left unclipped so the worker can move freely',
      'Safe access to roof level and a properly constructed roof ladder',
      'A ladder set at the correct angle and left untied for a quick exit',
    ],
    correctAnswer: 2,
    explanation:
      'HSG150 accepts that for short-duration roof work full edge protection may not be reasonably practicable, but something must replace it: a safe means of access to roof level and a safe means of working on the roof, which on a sloping roof means a properly constructed roof ladder. A harness that is worn but not clipped protects nobody, and an untied ladder is the single most common cause of ladder accidents.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'Roof Work',
    category: 'Safe Systems of Work',
  },
  {
    id: 235,
    question:
      'On a flat roof where full edge protection is not practicable for a short job, what does HSG150 give as a safe means of working?',
    options: [
      'A painted line set back from the edge and a briefing before starting',
      'A trailing lanyard clipped to a roof vent near the working position',
      'A rope tied around the waist and anchored to a colleague below',
      'A harness on a secure anchorage with as short a lanyard as possible',
    ],
    correctAnswer: 3,
    explanation:
      'For short-duration flat roof work HSG150 gives the safe means of working as a harness attached to a secure anchorage and fitted with as short a lanyard as possible, so the wearer cannot reach a fall position. A vent or other convenience fixing has not been specified or proved as an anchorage, and a waist rope is not a full body harness and can cause serious injury on arrest.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Roof Work',
    category: 'Safe Systems of Work',
  },
  {
    id: 236,
    question:
      'How does the level of competence required for work at height scale with the task?',
    options: [
      'Every task at height needs a certificated qualification from a scheme',
      'Simple ladder work may need only instruction and training on the job',
      'Competence is proved solely by holding a site safety awareness card',
      'A supervisor signature can substitute for competence on any task',
    ],
    correctAnswer: 1,
    explanation:
      'HSE guidance says that for low-risk short-duration ladder tasks, meaning tasks taking less than 30 minutes, competence may be no more than making sure employees receive instruction on using the equipment safely, such as how to tie a ladder, and appropriate training, which often happens on the job. Where a more technical level is needed, such as planning a complex scaffold, industry training and certification schemes are one way to demonstrate it. A card or a signature evidences neither skill nor experience.',
    section: 'Module 7',
    difficulty: 'advanced',
    topic: 'Competence',
    category: 'Incident Response & Responsibilities',
  },
  {
    id: 237,
    question:
      'A supervisor claims the Work at Height Regulations have banned ladders. What is wrong with that claim?',
    options: [
      'Ladders are banned only where a job takes longer than 30 minutes',
      'Ladders are banned for access but permitted as a place of work',
      'Ladders are not banned and are often the most suitable equipment',
      'Ladders are permitted where the user wears a harness while climbing',
    ],
    correctAnswer: 2,
    explanation:
      'HSE calls the ladder ban a common misconception and states there are many situations where a ladder is the most suitable equipment for working at height. What the Regulations require is that the choice be justified through the hierarchy and the risk assessment, and that the job be light and short duration with a secure handhold if the ladder is a workplace. The reversed answer is also wrong: ladders are primarily access equipment, and a workplace only by exception.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Ladders',
    category: 'Access Equipment & Selection',
  },
  {
    id: 238,
    question:
      'What is the practical test for avoiding overreach when working from a ladder?',
    options: [
      'Keep one hand on a rung and step down when the tool is stowed away',
      'Keep the belt buckle inside the stiles and both feet on one rung',
      'Keep the shoulders square to the wall and both hands on the stiles',
      'Keep the ladder within arm reach of a fixed point on the structure',
    ],
    correctAnswer: 1,
    explanation:
      'HSG150 gives the check as not overloading the ladder and not overreaching, keeping your belt buckle inside the stiles with both feet on the same rung. Once the buckle passes outside a stile the centre of gravity moves beyond the base and the ladder can slide sideways or rotate about a stile. The other answers describe habits that sound careful but give no reference point for when the reach has become unsafe.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Ladders',
    category: 'Access Equipment & Selection',
  },
  {
    id: 239,
    question:
      'How should tools and materials be taken up a ladder?',
    options: [
      'In one hand, with the other hand sliding up along the ladder stile',
      'Passed up by a second operative climbing on the rung below you',
      'In a holster or shoulder bag, with heavy loads raised by gin wheel',
      'In a rucksack, with the heaviest items packed at the very top',
    ],
    correctAnswer: 2,
    explanation:
      'HSG150 says light tools should be carried in a shoulder bag or a holster attached to a belt so that both hands are free for climbing, and that heavy or bulky loads should not be carried up or down ladders at all, with a gin wheel or other lifting equipment used instead. Carrying in one hand breaks the handhold that must be maintained while climbing, and two people should never be on a ladder at once.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Ladders',
    category: 'Access Equipment & Selection',
  },
  {
    id: 240,
    question:
      'A domestic stepladder bought from a DIY store is offered for use on a commercial fit-out. What is the problem?',
    options: [
      'It cannot be used unless a second operative foots it continuously',
      'It must be re-labelled with the company asset number before any use',
      'It is acceptable provided the pre-use check finds no visible damage',
      'Domestic ladders are unlikely to be robust enough for site work',
    ],
    correctAnswer: 3,
    explanation:
      'HSG150 states that for safe use a ladder must be strong enough for the job and in good condition, and that domestic ladders are unlikely to be robust enough for construction work. Passing a pre-use check is the attractive wrong answer: the check looks for damaged, buckled or warped stiles, cracked or missing rungs and missing feet, but it cannot upgrade the duty rating the product was built to.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Ladders',
    category: 'Access Equipment & Selection',
  },
  {
    id: 241,
    question:
      'What duty do architects and designers carry in relation to work at height?',
    options: [
      'They must supply the harnesses used by trades during the fit-out',
      'They must consider work at height over the life of the building',
      'They must inspect the scaffold before each trade starts on site',
      'They must sign the method statement for every roof-level task',
    ],
    correctAnswer: 1,
    explanation:
      'Under the Construction Design and Management Regulations, designers must consider the need for work to be carried out at height over the lifespan of a building, for cleaning, maintenance and repair, and design out that need where possible. Specifying a lighting column that lowers, or a plant deck with permanent guard rails, removes risk for every visit over decades. Supplying PPE and inspecting scaffolds are duties that sit with the employer and contractor on site.',
    section: 'Module 7',
    difficulty: 'advanced',
    topic: 'Planning',
    category: 'Incident Response & Responsibilities',
  },
  {
    id: 242,
    question:
      'Which of these is an example of doing the work from the ground rather than at height?',
    options: [
      'Using a podium step so the working platform is close to the floor',
      'Tying the ladder so it cannot slide while a luminaire is fitted',
      'Installing the cable at ground level before the run is lifted up',
      'Wearing a harness clipped to the structure while the cable is run',
    ],
    correctAnswer: 2,
    explanation:
      'HSE gives installing cables at ground level, using extendable tools from the ground, lowering a lighting mast and assembling edge protection at ground level as examples of doing as much work as possible from the ground, which is avoidance. A podium step is safer equipment but the person is still at height, and tying a ladder or clipping a harness are controls applied to work at height rather than ways of removing it.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Hierarchy of Control',
    category: 'Understanding Working at Height',
  },
  {
    id: 243,
    question:
      'An electrician works on a plant deck on a non-fragile flat roof that has a permanent perimeter guard rail. Where does this sit in the hierarchy?',
    options: [
      'It is minimise, because the guard rail limits the fall distance',
      'It is avoid, because the roof is already part of the building',
      'It is outside the hierarchy, as the guard rail is permanent',
      'It is prevent, using an existing place of work that is safe',
    ],
    correctAnswer: 3,
    explanation:
      'HSE gives a concrete flat roof with existing edge protection as a worked example of collective protection using an existing place of work that is already safe, which is the prevent step. Minimise is the step you reach only when a fall remains possible, and a guard rail is there to stop the fall, not shorten it. Nothing about a permanent installation puts it outside the Regulations.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'Hierarchy of Control',
    category: 'Understanding Working at Height',
  },
  {
    id: 244,
    question:
      'How should falls be prevented while a scaffold is being erected and dismantled?',
    options: [
      'By each scaffolder wearing a harness clipped to a nearby standard',
      'By using an advanced guard rail system wherever it is practicable',
      'By keeping lift heights low so that any fall is a short one',
      'By working from a ladder rather than the part-built platform',
    ],
    correctAnswer: 1,
    explanation:
      'HSG150 says scaffolders should adopt methods of work that prevent falls during erection, achieved by using an advanced guard rail system, and only where that is not practicable should harnesses be worn to provide fall arrest. This is the collective before personal rule applied to the scaffolders themselves. The work must also be done only by competent people under the direction of a competent supervisor.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'Edge Protection',
    category: 'Safe Systems of Work',
  },
  {
    id: 245,
    question:
      'A MEWP arrives on site from a hire company. What must accompany it before it is used?',
    options: [
      'A copy of the operator licence held by the person hiring it',
      'A signed permit from the principal contractor for that lift',
      'An indication of when the last thorough examination was done',
      'A statement that the machine has never arrested a fall in use',
    ],
    correctAnswer: 2,
    explanation:
      'HSE guidance requires that before any equipment such as a MEWP that has come from another business or a rental company is used, it is accompanied by an indication, clear to everyone involved, of when the last thorough examination was carried out. That is what tells you the machine is currently within its examination regime. Permits and licences may be site requirements, but they say nothing about the mechanical condition of the machine.',
    section: 'Module 6',
    difficulty: 'intermediate',
    topic: 'Inspection',
    category: 'Safe Systems of Work',
  },
  {
    id: 246,
    question:
      'A mobile working platform is moved to a new location on the same site. Is a fresh inspection report required?',
    options: [
      'Yes, a new written report is needed each time the platform moves',
      'Yes, but only where the move takes it to a different floor level',
      'No, because mobile platforms are exempt from inspection entirely',
      'No, a new report is not required for a move on the same site',
    ],
    correctAnswer: 3,
    explanation:
      'HSE guidance states that where it is a mobile platform, a new inspection and report is not required every time it is moved to a new location on the same site. That concession is about relocation only: mobile platforms are still subject to inspection after assembly, after any event liable to affect stability, and at intervals not exceeding seven days, so the exempt answer is plainly wrong.',
    section: 'Module 6',
    difficulty: 'intermediate',
    topic: 'Inspection',
    category: 'Safe Systems of Work',
  },
  {
    id: 247,
    question:
      'Wind is gusting and rain has started while a team installs external lighting from a MEWP. What does the law require?',
    options: [
      'Continue while the machine stays within its rated wind speed',
      'Continue but reduce the platform height by one boom section',
      'Take account of conditions that could compromise worker safety',
      'Hand the decision to the operative in the basket to make alone',
    ],
    correctAnswer: 2,
    explanation:
      'Taking account of weather conditions that could compromise worker safety is one of the express legal requirements when planning and undertaking work at height, and each place of work must be checked every time before use. The rated wind speed answer is attractive because machines do carry limits, but the duty is wider than one number and covers rain, cold, visibility and how a wet surface behaves. The decision is a planning and supervision duty, not something to leave to the person in the basket.',
    section: 'Module 7',
    difficulty: 'advanced',
    topic: 'Planning',
    category: 'Safe Systems of Work',
  },
  {
    id: 248,
    question:
      'A MEWP is to be used over water. Should the operative wear a harness or a life jacket?',
    options: [
      'A harness must always be worn regardless of the water beneath',
      'A harness and a life jacket must both be worn at all times',
      'Neither is needed if the basket has a closed gate and rails',
      'A life jacket where drowning is the greater risk of the two',
    ],
    correctAnswer: 3,
    explanation:
      'HSE guidance says work next to or over water must be assessed to decide whether the greater risk is falling from the basket or drowning if the machine goes into the water, and that life jackets rather than harnesses should be worn where there is a risk of drowning. Wearing a harness in that situation tethers the operative to a sinking machine, which is why the always-wear-a-harness answer is the dangerous one.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'MEWPs',
    category: 'Fall Protection & Prevention',
  },
  {
    id: 249,
    question:
      'A working platform is safe once reached, but the only way onto it is a scramble over pipework. Why does this arrangement fail?',
    options: [
      'Because the platform must be inspected weekly by a competent person',
      'Because access to and from the place of work must also be safe',
      'Because pipework is treated as a fragile surface in every case',
      'Because a harness must be worn whenever a platform is entered',
    ],
    correctAnswer: 1,
    explanation:
      'HSE guidance requires employers to ensure workers can get safely to and from where they work at height, and the definition of a working platform covers any platform used as a place of work or as a means of getting to and from work. A safe island reached by an unsafe route is not compliant. The weekly inspection duty is real but separate, and pipework is not automatically a fragile surface.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Planning',
    category: 'Access Equipment & Selection',
  },
  {
    id: 250,
    question:
      'A high-level luminaire in a warehouse has failed. Which option best follows the hierarchy?',
    options: [
      'Use a leaning ladder tied at the top with a second man footing it',
      'Use a stepladder from the top of a stillage to gain extra height',
      'Wear a harness and clip to the roof steel while on the ladder top',
      'Lower the fitting if it is designed to lower, otherwise use a MEWP',
    ],
    correctAnswer: 3,
    explanation:
      'Avoid comes first: if the luminaire is on a lowering system or can be reached with an extendable tool the work at height disappears. If it cannot, prevention with a platform that has guard rails, such as a MEWP, protects everyone without depending on the individual doing anything. The ladder answers accept a fall risk that better equipment removes, working off a stillage creates an unstable base, and clipping to unverified roof steel from the top of a ladder combines an unproven anchor with an unstable workplace.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'Hierarchy of Control',
    category: 'Understanding Working at Height',
  },
];
