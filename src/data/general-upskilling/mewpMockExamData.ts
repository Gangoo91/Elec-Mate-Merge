/**
 * MEWP Operator Training Mock Exam Question Bank
 *
 * 200 questions covering all 6 categories with difficulty distribution.
 *
 * Categories (6):
 *   Legislation & Types (40) | Risk Assessment (34) | Inspections & Setup (34) |
 *   Safe Operation (34) | Emergency & Rescue (30) | Safety & Best Practice (28)
 *
 * Difficulty per category: ~40% basic, ~40% intermediate, ~20% advanced
 */

import { StandardMockQuestion, MockExamConfig } from '@/types/standardMockExam';
import { getRandomQuestionsBalanced } from '@/utils/questionSelection';

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------
export const mewpCategories = [
  'Legislation & Types',
  'Risk Assessment',
  'Inspections & Setup',
  'Safe Operation',
  'Emergency & Rescue',
  'Safety & Best Practice',
];

// ---------------------------------------------------------------------------
// Exam configuration
// ---------------------------------------------------------------------------
export const mewpMockExamConfig: MockExamConfig = {
  examId: 'mewp-operator',
  examTitle: 'MEWP Operator Training Mock Examination',
  totalQuestions: 20,
  timeLimit: 1800, // 30 minutes
  passThreshold: 80,
  exitPath: '/study-centre/general-upskilling/mewp-module-6',
  categories: mewpCategories,
};

// ---------------------------------------------------------------------------
// Random question selector
// ---------------------------------------------------------------------------
export const getRandomMewpExamQuestions = (numQuestions: number = 20) => {
  return getRandomQuestionsBalanced(mewpQuestionBank, numQuestions, mewpCategories);
};

// ---------------------------------------------------------------------------
// Question Bank — 200 questions
// ---------------------------------------------------------------------------
export const mewpQuestionBank: StandardMockQuestion[] = [
  // =======================================================================
  // LEGISLATION & TYPES — 40 questions (id 1–40)
  // =======================================================================

  // --- basic (16) ---
  {
    id: 1,
    question:
      'Which piece of UK legislation is the primary regulation specifically covering work at height?',
    options: [
      'The Work at Height Regulations 2005',
      'The Health and Safety at Work Act 1974',
      'The Lifting Operations and Lifting Equipment Regulations 1998',
      'The Construction (Design and Management) Regulations 2015',
    ],
    correctAnswer: 0,
    explanation:
      'The Work at Height Regulations 2005 (WAHR 2005) is the primary UK legislation that specifically addresses all aspects of working at height. It applies to all work at height where there is a risk of a fall liable to cause personal injury, and sets out a clear hierarchy of control measures.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'WAHR 2005',
    category: 'Legislation & Types',
  },
  {
    id: 2,
    question:
      'Under the Health and Safety at Work Act 1974, who has a general duty to ensure the health and safety of employees at work?',
    options: [
      'The Health and Safety Executive only',
      'The employee themselves',
      'The employer',
      'The local authority',
    ],
    correctAnswer: 2,
    explanation:
      'The Health and Safety at Work Act 1974 (HSWA 1974) places a general duty on employers to ensure, so far as is reasonably practicable, the health, safety and welfare at work of all their employees. This includes providing safe equipment, adequate training, and a safe working environment.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'HSWA 1974',
    category: 'Legislation & Types',
  },
  {
    id: 3,
    question: 'How often must a MEWP undergo a thorough examination under LOLER 1998?',
    options: [
      'Every 12 months',
      'Every 6 months',
      'Every 3 months',
      'Only when a defect is reported',
    ],
    correctAnswer: 1,
    explanation:
      'Under the Lifting Operations and Lifting Equipment Regulations 1998 (LOLER), a MEWP used to lift persons must undergo a thorough examination by a competent person at least every 6 months. This is more frequent than the 12-month interval required for equipment that lifts loads only.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'LOLER 1998',
    category: 'Legislation & Types',
  },
  {
    id: 4,
    question: 'What does the acronym MEWP stand for?',
    options: [
      'Mobile Elevated Work Platform',
      'Mechanical Elevated Work Position',
      'Mobile Extending Work Platform',
      'Mechanical Extension Work Platform',
    ],
    correctAnswer: 0,
    explanation:
      'MEWP stands for Mobile Elevated Work Platform. This is the industry-standard term for any powered platform that can be moved and elevated to provide temporary access for people to work at height safely.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'IPAF categories',
    category: 'Legislation & Types',
  },
  {
    id: 5,
    question: 'Which IPAF category covers a mobile vertical platform such as a scissor lift?',
    options: ['Category 1A', 'Category 1B', 'Category 3A', 'Category 3B'],
    correctAnswer: 1,
    explanation:
      'IPAF Category 1B covers mobile vertical platforms, which includes scissor lifts that can be driven while elevated. Category 1A covers static vertical platforms, while Categories 3A and 3B cover static and mobile boom lifts respectively.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'IPAF categories',
    category: 'Legislation & Types',
  },
  {
    id: 6,
    question:
      'What is the hierarchy of control for working at height as set out in the Work at Height Regulations 2005?',
    options: [
      'Prevent, avoid, mitigate',
      'Avoid, prevent, mitigate',
      'Mitigate, prevent, avoid',
      'Avoid, mitigate, prevent',
    ],
    correctAnswer: 1,
    explanation:
      'The Work at Height Regulations 2005 set out a clear hierarchy: first avoid working at height altogether if possible, then prevent falls using appropriate equipment and measures, and finally mitigate the consequences of any fall that does occur. This hierarchy must be followed in order.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'hierarchy of control',
    category: 'Legislation & Types',
  },
  {
    id: 7,
    question: 'A scissor lift provides movement in which direction?',
    options: [
      'Vertical and horizontal simultaneously',
      'Vertical only',
      'Horizontal only',
      'Vertical with articulating reach',
    ],
    correctAnswer: 1,
    explanation:
      'Scissor lifts are classified as Group A machines, which provide vertical movement only. The platform rises and lowers directly above the chassis. For applications requiring both vertical and horizontal reach, a boom lift (Group B) would be needed.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Group A vs Group B',
    category: 'Legislation & Types',
  },
  {
    id: 8,
    question: 'How long is an IPAF PAL card valid for?',
    options: ['1 year', '3 years', '5 years', '10 years'],
    correctAnswer: 2,
    explanation:
      'An IPAF Powered Access Licence (PAL) card is valid for 5 years from the date of issue. After this period, operators must complete a renewal course to maintain their certification. The PAL card is an internationally recognised proof of MEWP operator training.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'PAL card',
    category: 'Legislation & Types',
  },
  {
    id: 9,
    question:
      'Which regulation requires that all work equipment is maintained in an efficient state, in efficient working order, and in good repair?',
    options: ['LOLER 1998', 'WAHR 2005', 'PUWER 1998', 'CDM 2015'],
    correctAnswer: 2,
    explanation:
      'The Provision and Use of Work Equipment Regulations 1998 (PUWER) requires that all work equipment, including MEWPs, is maintained in an efficient state, in efficient working order, and in good repair. PUWER also covers suitability of equipment, information, instruction, and training.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'PUWER 1998',
    category: 'Legislation & Types',
  },
  {
    id: 10,
    question:
      'What is the difference between familiarisation and training in the context of MEWP operation?',
    options: [
      'They are the same thing, just different names',
      'Training is machine-specific; familiarisation is a general course',
      'Familiarisation is machine-specific; training is the IPAF operator course',
      'Familiarisation is only required for boom lifts',
    ],
    correctAnswer: 2,
    explanation:
      'Familiarisation is machine-specific and must be carried out every time an operator uses a new type of MEWP they have not operated before. Training refers to the formal IPAF operator course that leads to the PAL card. Both are essential, but they serve different purposes.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'familiarisation vs training',
    category: 'Legislation & Types',
  },
  {
    id: 11,
    question:
      'A boom lift that provides both vertical and horizontal movement is classified as which IPAF group?',
    options: ['Group A', 'Group B', 'Group C', 'Group D'],
    correctAnswer: 1,
    explanation:
      'Boom lifts are classified as Group B machines because they provide both vertical and horizontal movement, allowing the platform to reach outward and upward. Group A machines, such as scissor lifts, provide vertical movement only.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Group A vs Group B',
    category: 'Legislation & Types',
  },
  {
    id: 12,
    question: 'Which European standard covers the design requirements for MEWPs?',
    options: ['BS EN 131', 'BS EN 280', 'BS EN 361', 'BS EN 795'],
    correctAnswer: 1,
    explanation:
      'BS EN 280 is the European design standard that sets out the safety requirements for the design, calculation, examination, and testing of MEWPs. It covers structural integrity, stability, controls, and safety devices. Other standards cover ladders (131), harnesses (361), and anchor devices (795).',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'BS EN 280',
    category: 'Legislation & Types',
  },
  {
    id: 13,
    question: 'Which of the following is a type of boom lift?',
    options: [
      'Rough terrain scissor lift',
      'Push-around vertical lift',
      'Articulating boom lift',
      'Electric slab scissor lift',
    ],
    correctAnswer: 2,
    explanation:
      'An articulating boom lift (also known as a cherry picker or knuckle boom) is a type of boom lift that uses jointed sections to reach up and over obstacles. Scissor lifts and push-around verticals are Group A machines, not boom lifts.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'boom lift types',
    category: 'Legislation & Types',
  },
  {
    id: 14,
    question: 'What does IPAF stand for?',
    options: [
      'International Powered Access Forum',
      'International Powered Access Federation',
      'Industrial Platform Access Federation',
      'Industrial Powered Aerial Federation',
    ],
    correctAnswer: 1,
    explanation:
      'IPAF stands for the International Powered Access Federation. It is the global organisation that promotes the safe and effective use of powered access equipment. IPAF manages the PAL card training scheme and provides technical guidance to the industry.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'PAL card',
    category: 'Legislation & Types',
  },
  {
    id: 15,
    question: 'Which factor would make a MEWP operator unfit to work?',
    options: [
      'Wearing prescription glasses',
      'Being under the influence of alcohol or drugs',
      'Having completed training more than 2 years ago',
      'Working on a platform for the first time that week',
    ],
    correctAnswer: 1,
    explanation:
      'Being under the influence of alcohol, drugs, or any substance that impairs judgement or reaction times makes an operator unfit to operate a MEWP. Employers have a duty to ensure operators are fit, and operators themselves must not work if impaired by substances, fatigue, or medical conditions.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'operator fitness',
    category: 'Legislation & Types',
  },
  {
    id: 16,
    question: 'What does PAL stand for in the context of IPAF certification?',
    options: [
      'Platform Access Licence',
      'Powered Aerial Licence',
      'Powered Access Licence',
      'Platform Aerial Licence',
    ],
    correctAnswer: 2,
    explanation:
      'PAL stands for Powered Access Licence. It is the internationally recognised proof of training issued by IPAF to operators who have successfully completed an approved MEWP training course. The PAL card is valid for 5 years and specifies which MEWP categories the holder is qualified to operate.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'PAL card',
    category: 'Legislation & Types',
  },

  // --- intermediate (16) ---
  {
    id: 17,
    question:
      'Under LOLER 1998, who is responsible for ensuring that a thorough examination of a MEWP is carried out?',
    options: [
      'The MEWP operator',
      'The site manager only',
      'The employer or person who controls the equipment',
      'The equipment manufacturer',
    ],
    correctAnswer: 2,
    explanation:
      'Under LOLER 1998, the duty to ensure thorough examinations are carried out falls on the employer or the person who has control of the lifting equipment. They must arrange for a competent person to carry out the examination at the required intervals and ensure defects are rectified before use.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'LOLER 1998',
    category: 'Legislation & Types',
  },
  {
    id: 18,
    question: 'Which IPAF category applies to a static boom lift?',
    options: ['Category 1A', 'Category 1B', 'Category 3A', 'Category 3B'],
    correctAnswer: 2,
    explanation:
      'IPAF Category 3A covers static boom lifts — machines that provide vertical and horizontal reach but are positioned in a fixed location during operation (such as trailer-mounted or spider lifts on outriggers). Category 3B covers mobile boom lifts that can be driven while the platform is elevated.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'IPAF categories',
    category: 'Legislation & Types',
  },
  {
    id: 19,
    question: 'What is the IPAF category designation for a push-around vertical (PAV) platform?',
    options: ['Category 1A', 'Category 1B', 'Category PAV', 'Category 3A'],
    correctAnswer: 2,
    explanation:
      'Push-around vertical platforms have their own dedicated IPAF category designated as PAV. These are lightweight, manually propelled platforms that are pushed into position before being elevated. They are popular for indoor maintenance and installation work at lower heights.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'IPAF categories',
    category: 'Legislation & Types',
  },
  {
    id: 20,
    question: 'A bi-energy MEWP typically combines which two power sources?',
    options: [
      'Petrol engine and solar panels',
      'Diesel engine and electric battery',
      'Compressed gas and electric battery',
      'Hydrogen fuel cell and diesel engine',
    ],
    correctAnswer: 1,
    explanation:
      'A bi-energy MEWP combines a diesel engine and electric battery power. This allows the machine to operate on electric power indoors (producing zero emissions) and switch to diesel for outdoor use where battery range or charging may be limited. It offers versatility across different work environments.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'power sources',
    category: 'Legislation & Types',
  },
  {
    id: 21,
    question:
      'Which regulation specifically addresses the management of health and safety during construction projects, including the planning of work at height?',
    options: ['PUWER 1998', 'LOLER 1998', 'CDM 2015', 'WAHR 2005'],
    correctAnswer: 2,
    explanation:
      'The Construction (Design and Management) Regulations 2015 (CDM 2015) manage health and safety throughout construction projects. They require designers and contractors to plan for safe working, including work at height, from the design stage through to completion. CDM places duties on clients, designers, and contractors.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'CDM 2015',
    category: 'Legislation & Types',
  },
  {
    id: 22,
    question: 'What is a spider lift?',
    options: [
      'A scissor lift with extra-wide base plates',
      'A compact boom lift with stabilising legs that can be set up on uneven ground',
      'A vehicle-mounted platform that extends from a lorry',
      'A push-around vertical platform with rubber tracks',
    ],
    correctAnswer: 1,
    explanation:
      'A spider lift is a compact, tracked boom lift with individually adjustable stabilising legs (outriggers) that resemble spider legs. It can be set up on uneven or sloping ground and is narrow enough to pass through doorways and restricted spaces, making it ideal for indoor and outdoor use in confined areas.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'spider lifts',
    category: 'Legislation & Types',
  },
  {
    id: 23,
    question: 'Under PUWER 1998, what must an employer ensure regarding a MEWP before it is used?',
    options: [
      'That it has been painted in a high-visibility colour',
      'That it is suitable for its intended purpose and properly maintained',
      'That the hire company has the lowest available price',
      'That the operator has at least five years of experience',
    ],
    correctAnswer: 1,
    explanation:
      'Under PUWER 1998, an employer must ensure that work equipment, including MEWPs, is suitable for its intended use, maintained in an efficient state, and that operators have received adequate training and information. Suitability includes considering the working conditions and hazards present.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'PUWER 1998',
    category: 'Legislation & Types',
  },
  {
    id: 24,
    question:
      'What is the key difference between a telescopic boom lift and an articulating boom lift?',
    options: [
      'Telescopic booms are always electric; articulating booms are always diesel',
      'Telescopic booms extend in a straight line; articulating booms have jointed sections to reach up and over obstacles',
      'Telescopic booms are only for indoor use; articulating booms are only for outdoor use',
      'There is no difference; the terms are interchangeable',
    ],
    correctAnswer: 1,
    explanation:
      'A telescopic boom lift extends in a straight line, providing maximum horizontal reach and working height. An articulating boom lift has one or more jointed (knuckle) sections, allowing the platform to reach up and over obstacles such as building edges or machinery. The choice depends on the access requirements of the task.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'boom lift types',
    category: 'Legislation & Types',
  },
  {
    id: 25,
    question: 'When must an operator receive familiarisation on a MEWP?',
    options: [
      'Only when their PAL card is renewed',
      'Every time they use any MEWP, regardless of type',
      'Every time they are required to operate a type of MEWP they have not used before',
      'Only during their initial IPAF training course',
    ],
    correctAnswer: 2,
    explanation:
      'Familiarisation must be carried out every time an operator is required to use a specific type of MEWP they have not previously operated. Even if an operator holds a valid PAL card, they must receive machine-specific familiarisation covering the controls, safety devices, and operating procedures of the new machine type.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'familiarisation vs training',
    category: 'Legislation & Types',
  },
  {
    id: 26,
    question: 'Which of the following best describes a vehicle-mounted platform?',
    options: [
      'A scissor lift transported on a flatbed lorry',
      'A MEWP permanently mounted on a road-going vehicle such as a lorry or van',
      'Any MEWP that can be towed behind a vehicle',
      'A boom lift with rubber tyres for road travel',
    ],
    correctAnswer: 1,
    explanation:
      'A vehicle-mounted platform is a MEWP permanently mounted on a road-going vehicle such as a lorry or van. It can be driven between work sites on public roads and then deployed at the location. These are commonly used by utility companies for streetlight and overhead cable maintenance.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'vehicle-mounted platforms',
    category: 'Legislation & Types',
  },
  {
    id: 27,
    question:
      'What is the main advantage of an electric scissor lift compared to a diesel scissor lift?',
    options: [
      'Greater working height',
      'Better performance on rough terrain',
      'Zero emissions and quieter operation, suitable for indoor use',
      'Higher safe working load capacity',
    ],
    correctAnswer: 2,
    explanation:
      'Electric scissor lifts produce zero exhaust emissions and operate much more quietly than diesel models, making them ideal for indoor use in warehouses, shopping centres, and other enclosed spaces. Diesel scissor lifts are better suited for outdoor and rough terrain applications where battery life may be insufficient.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'scissor lift types',
    category: 'Legislation & Types',
  },
  {
    id: 28,
    question:
      'Under the HSWA 1974, what duty does an employee have regarding their own health and safety?',
    options: [
      'Employees have no personal duty; all responsibility lies with the employer',
      'Employees must take reasonable care for their own health and safety and that of others affected by their actions',
      'Employees must only follow instructions given by a trade union representative',
      'Employees are only responsible if they have a supervisory role',
    ],
    correctAnswer: 1,
    explanation:
      'Section 7 of the HSWA 1974 places a duty on every employee to take reasonable care for their own health and safety, and for the health and safety of other persons who may be affected by their acts or omissions at work. Employees must also cooperate with their employer on health and safety matters.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'HSWA 1974',
    category: 'Legislation & Types',
  },
  {
    id: 29,
    question: 'What type of MEWP would typically be classified under IPAF Category 3B?',
    options: [
      'A push-around vertical platform',
      'A static scissor lift on outriggers',
      'A self-propelled boom lift that can be driven with the platform raised',
      'A trailer-mounted boom lift',
    ],
    correctAnswer: 2,
    explanation:
      'IPAF Category 3B covers mobile boom lifts — self-propelled machines that can be driven with the platform in the elevated position. This includes self-propelled articulating and telescopic boom lifts. Trailer-mounted and spider lifts on outriggers fall under Category 3A (static boom).',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'IPAF categories',
    category: 'Legislation & Types',
  },
  {
    id: 30,
    question: 'What information must be recorded on an IPAF PAL card?',
    options: [
      "The operator's employer name and site address only",
      'The MEWP categories the holder is qualified to operate and the card expiry date',
      'The maximum platform height the operator may work at',
      "The operator's medical history and fitness certificate",
    ],
    correctAnswer: 1,
    explanation:
      "An IPAF PAL card records the holder's name, photograph, the specific MEWP categories they are qualified to operate (e.g. 1B, 3A, 3B), the date of issue, and the expiry date. It does not specify height limits or medical details. The card is internationally recognised proof of competence.",
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'PAL card',
    category: 'Legislation & Types',
  },
  {
    id: 31,
    question: 'A rough terrain scissor lift is most suitable for which type of environment?',
    options: [
      'Indoor warehouse work on smooth concrete floors',
      'Outdoor construction sites with uneven ground and slopes',
      'Clean room environments requiring zero emissions',
      'Highway maintenance on public roads',
    ],
    correctAnswer: 1,
    explanation:
      'Rough terrain scissor lifts are specifically designed for outdoor use on construction sites and uneven ground. They feature larger pneumatic tyres, four-wheel drive, greater ground clearance, and more powerful engines than standard electric slab scissor lifts, enabling them to handle rough surfaces and gradients.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'scissor lift types',
    category: 'Legislation & Types',
  },
  {
    id: 32,
    question:
      'What does the hierarchy of control in the Work at Height Regulations require you to consider before using a MEWP?',
    options: [
      'Whether the work can be done without working at height at all',
      'Whether a ladder would be cheaper than a MEWP',
      'Whether the client prefers scaffolding',
      'Whether overtime payments will be required',
    ],
    correctAnswer: 0,
    explanation:
      'The hierarchy of control requires first considering whether the work can be carried out without working at height at all (avoid). Only if this is not reasonably practicable should measures to prevent or mitigate falls be considered, such as using a MEWP. Cost alone is not a valid reason to choose a less safe method.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'hierarchy of control',
    category: 'Legislation & Types',
  },

  // --- advanced (8) ---
  {
    id: 33,
    question:
      'A contractor is hired to carry out façade cleaning at 18 metres on a building adjacent to a live 11kV overhead power line. The site has soft ground conditions and restricted access. Which combination of regulations must the contractor specifically address in their planning?',
    options: [
      'HSWA 1974 and CDM 2015 only',
      'WAHR 2005, LOLER 1998, PUWER 1998, and the Electricity at Work Regulations 1989',
      'PUWER 1998 and BS EN 280 only',
      'CDM 2015 and the Environmental Protection Act 1990',
    ],
    correctAnswer: 1,
    explanation:
      'This scenario involves work at height (WAHR 2005), use of lifting equipment carrying persons (LOLER 1998), provision and use of work equipment (PUWER 1998), and working near live electrical conductors (Electricity at Work Regulations 1989). All four must be addressed in the planning. CDM 2015 and HSWA 1974 also apply generally but are not the most specific requirements.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'WAHR 2005',
    category: 'Legislation & Types',
  },
  {
    id: 34,
    question:
      'An operator arrives on site with a valid IPAF Category 3B PAL card. The site has a 22-metre telescopic boom lift they have not used before and an 18-metre articulating boom lift they have operated previously. What is the correct approach?',
    options: [
      'They can operate both machines immediately as their PAL card covers Category 3B',
      'They need familiarisation on the telescopic boom only, as they have not used that type before',
      'They must complete a full IPAF training course before using either machine',
      'They need familiarisation on both machines as the PAL card alone is not sufficient',
    ],
    correctAnswer: 1,
    explanation:
      "Although the operator's PAL card covers Category 3B (mobile boom), familiarisation is machine-specific and must be completed for any type of MEWP the operator has not previously used. Since they have operated an articulating boom before but not a telescopic boom, familiarisation is required for the telescopic boom only. The PAL card proves general competence; familiarisation covers the specific controls and features of each machine type.",
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'familiarisation vs training',
    category: 'Legislation & Types',
  },
  {
    id: 35,
    question:
      "A MEWP's last thorough examination was dated 15th July. The machine is being used on a construction site. By what date must the next thorough examination be completed under LOLER 1998?",
    options: [
      '15th January the following year',
      '15th July the following year',
      '15th October the same year',
      'Whenever the hire company deems it necessary',
    ],
    correctAnswer: 0,
    explanation:
      'Under LOLER 1998, a MEWP used to carry persons must have a thorough examination at least every 6 months. From a last examination date of 15th July, the next examination must be completed by 15th January the following year. Exceeding this interval means the machine must not be used until the examination is completed.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'LOLER 1998',
    category: 'Legislation & Types',
  },
  {
    id: 36,
    question:
      'A project requires MEWP access inside a poorly ventilated underground car park, and also outside on an unpaved compound with gradients. Which power source type would best suit both environments?',
    options: [
      'A diesel-powered machine for both areas',
      'An electric-powered machine for both areas',
      'A bi-energy machine that can switch between electric and diesel',
      'A petrol-powered machine with a catalytic converter',
    ],
    correctAnswer: 2,
    explanation:
      'A bi-energy MEWP is the optimal choice as it can operate on electric power indoors in the poorly ventilated car park (producing zero emissions and minimal noise) and switch to diesel mode for the outdoor unpaved compound where greater power and range are needed. A purely diesel machine would create dangerous fumes indoors, and a purely electric machine may lack the power for rough outdoor terrain.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'power sources',
    category: 'Legislation & Types',
  },
  {
    id: 37,
    question:
      'Under CDM 2015, at which stage of a construction project should the need for MEWP access and the associated risks first be considered?',
    options: [
      'During the construction phase only',
      'When the MEWP is delivered to site',
      'During the design and planning stage, before construction begins',
      'Only after an accident or near-miss occurs',
    ],
    correctAnswer: 2,
    explanation:
      'CDM 2015 requires that health and safety is considered from the earliest stages of a project. Designers must eliminate hazards where possible and reduce risks during the design stage. This includes planning for safe access at height, selecting appropriate equipment, and designing the work to minimise the need for high-risk activities.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'CDM 2015',
    category: 'Legislation & Types',
  },
  {
    id: 38,
    question:
      'An operator reports feeling dizzy and nauseous at the start of their shift. They hold a valid PAL card and have been familiarised on the MEWP. Their supervisor asks them to continue working. What should the operator do?',
    options: [
      'Continue working as the supervisor has authority to make this decision',
      'Refuse to operate the MEWP, as they have a legal duty not to work when unfit and operating while impaired could endanger themselves and others',
      'Operate the MEWP at reduced height only',
      'Ask a colleague to stand on the platform with them as a precaution',
    ],
    correctAnswer: 1,
    explanation:
      'Under the HSWA 1974, employees have a duty to take reasonable care for their own health and safety and that of others. An operator who is feeling dizzy and nauseous is not fit to operate a MEWP safely. Operating while impaired by illness could lead to a serious incident. The operator should refuse to work and report their condition, regardless of supervisor pressure.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'operator fitness',
    category: 'Legislation & Types',
  },
  {
    id: 39,
    question:
      'A competent person carries out a thorough examination of a MEWP under LOLER 1998 and identifies a defect that poses an immediate risk. What must happen before the machine can be used again?',
    options: [
      'The defect must be noted in the report and the machine can continue to be used with caution',
      'The defect must be reported to the HSE within 28 days, but the machine can be used in the interim',
      'The machine must be taken out of service immediately; the defect must be rectified and the machine re-examined before it can return to use',
      'The hire company must be informed within 7 days and a replacement arranged',
    ],
    correctAnswer: 2,
    explanation:
      'When a thorough examination under LOLER 1998 reveals a defect posing an immediate danger, the machine must be taken out of service straight away. The defect must be rectified by a competent person, and the machine must be confirmed safe before returning to service. The competent person must also send a report of the defect to the HSE as soon as practicable.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'LOLER 1998',
    category: 'Legislation & Types',
  },
  {
    id: 40,
    question:
      'A site requires a MEWP to access a 25-metre-high atrium ceiling inside a building. The floor is a polished marble surface, and the MEWP must pass through a standard double doorway (1.8m wide). Which MEWP type is most appropriate?',
    options: [
      'A 26-metre rough terrain diesel telescopic boom lift',
      'A 26-metre self-propelled electric articulating boom lift',
      'A 26-metre spider lift with non-marking rubber tracks',
      'A 25-metre diesel scissor lift on outriggers',
    ],
    correctAnswer: 2,
    explanation:
      'A spider lift is the most appropriate choice: it is compact enough to pass through a standard double doorway (typically under 1m wide when tracked in), has non-marking rubber tracks that will not damage the polished marble floor, and its individually adjustable outriggers provide stable support. A rough terrain diesel would produce fumes indoors, a large self-propelled boom may not fit through the doorway, and a scissor lift cannot reach 25 metres vertically.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'spider lifts',
    category: 'Legislation & Types',
  },

  // =======================================================================
  // RISK ASSESSMENT — 34 questions (id 41–74)
  // =======================================================================

  // --- basic (14) ---
  {
    id: 41,
    question: "How many steps are there in the HSE's recommended risk assessment process?",
    options: ['3', '4', '5', '6'],
    correctAnswer: 2,
    explanation:
      'The HSE recommends a 5-step risk assessment process: (1) identify the hazards, (2) decide who might be harmed and how, (3) evaluate the risks and decide on precautions, (4) record your findings, and (5) review the assessment and update if necessary. This structured approach ensures all risks are systematically addressed.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: '5-step risk assessment',
    category: 'Risk Assessment',
  },
  {
    id: 42,
    question: 'What is the primary purpose of a site survey before a MEWP is delivered?',
    options: [
      'To determine the hire cost of the equipment',
      'To identify hazards such as overhead obstructions, ground conditions, and access routes',
      'To check whether the client has paid the deposit',
      'To photograph the site for marketing purposes',
    ],
    correctAnswer: 1,
    explanation:
      'A site survey conducted before MEWP delivery identifies potential hazards including overhead obstructions (power lines, beams), ground conditions (soft ground, voids, slopes), access routes (width, height restrictions, weight limits), and other site-specific factors. This information is essential for selecting the correct MEWP and planning safe operations.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'site survey',
    category: 'Risk Assessment',
  },
  {
    id: 43,
    question: 'At what wind speed must operations in a MEWP cease?',
    options: ['8 m/s (18 mph)', '10 m/s (22 mph)', '12.5 m/s (28 mph)', '15 m/s (34 mph)'],
    correctAnswer: 2,
    explanation:
      'MEWP operations must cease when wind speeds reach 12.5 m/s (28 mph). This is the maximum wind speed at which most MEWPs are designed to operate safely. Higher wind speeds can cause the platform to sway dangerously, affect stability, and make it difficult for the operator to control the machine or work safely.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'wind speed limit',
    category: 'Risk Assessment',
  },
  {
    id: 44,
    question: 'What does SWL stand for in the context of MEWP operations?',
    options: [
      'Standard Working Limit',
      'Safe Working Load',
      'Structural Weight Limit',
      'Site Working Licence',
    ],
    correctAnswer: 1,
    explanation:
      'SWL stands for Safe Working Load. This is the maximum load that the MEWP platform can safely carry, and it includes the combined weight of the operator(s), tools, materials, and any other items on the platform. Exceeding the SWL compromises the stability and structural integrity of the machine.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'SWL',
    category: 'Risk Assessment',
  },
  {
    id: 45,
    question:
      'Which of the following is one of the six key hazards associated with MEWP operations?',
    options: [
      'Sunburn from prolonged outdoor work',
      'Falls from the platform',
      'Dehydration during summer months',
      'Noise-induced hearing loss',
    ],
    correctAnswer: 1,
    explanation:
      'Falls from the platform are one of the six key MEWP hazards. The six key hazards are: falls from the platform, electrocution from overhead power lines, machine overturn, entrapment or crushing, collision with structures, and mechanical failure. Each must be considered in every risk assessment for MEWP operations.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'six key MEWP hazards',
    category: 'Risk Assessment',
  },
  {
    id: 46,
    question: 'What is a method statement?',
    options: [
      'A list of all equipment on site',
      'A step-by-step procedure describing how a task will be carried out safely',
      'A financial estimate for completing the work',
      'A contract between the client and the hire company',
    ],
    correctAnswer: 1,
    explanation:
      'A method statement is a document that sets out a step-by-step procedure for how a specific task will be carried out safely. It includes the sequence of work, the equipment to be used, the risk controls in place, and the responsibilities of those involved. It works alongside the risk assessment as part of a safe system of work.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'method statement',
    category: 'Risk Assessment',
  },
  {
    id: 47,
    question: 'Why must ground conditions be assessed before operating a MEWP?',
    options: [
      'To determine the colour of the machine needed',
      'To ensure the ground can support the weight of the MEWP without sinking, shifting, or collapsing',
      'To calculate the hire cost accurately',
      'To decide which paint colour to use for ground markings',
    ],
    correctAnswer: 1,
    explanation:
      'Ground conditions must be assessed because the MEWP exerts significant pressure on the ground, especially through outriggers or wheels. Soft, waterlogged, or uneven ground can cause the machine to sink, tilt, or overturn. Factors such as bearing capacity, underground voids, recent excavations, and surface gradient all affect stability.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'ground conditions',
    category: 'Risk Assessment',
  },
  {
    id: 48,
    question: 'What is the maximum gradient at which a scissor lift should typically be driven?',
    options: ['3 degrees', '5 degrees', '10 degrees', '15 degrees'],
    correctAnswer: 1,
    explanation:
      "Scissor lifts should typically only be driven on gradients up to a maximum of 5 degrees. Operating on steeper slopes significantly increases the risk of the machine overturning, especially when the platform is elevated. Operators must always check the manufacturer's specific limits for the machine they are using.",
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'slopes',
    category: 'Risk Assessment',
  },
  {
    id: 49,
    question: 'What is the first step in the five-step risk assessment process?',
    options: [
      'Record the findings',
      'Evaluate the risks',
      'Identify the hazards',
      'Decide on precautions',
    ],
    correctAnswer: 2,
    explanation:
      'The first step in the five-step risk assessment process is to identify the hazards. A hazard is anything that has the potential to cause harm. Before risks can be evaluated or controls put in place, all potential hazards in the work area must first be identified through inspection, observation, and consultation.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: '5-step risk assessment',
    category: 'Risk Assessment',
  },
  {
    id: 50,
    question: 'What instrument is used to measure wind speed on site?',
    options: ['A barometer', 'A hygrometer', 'An anemometer', 'A thermometer'],
    correctAnswer: 2,
    explanation:
      'An anemometer is the instrument used to measure wind speed. MEWP operators and site supervisors should monitor wind speed regularly using an anemometer, particularly when working at height. Operations must cease when wind speeds reach 12.5 m/s (28 mph) to prevent dangerous platform movement and potential overturn.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'weather monitoring',
    category: 'Risk Assessment',
  },
  {
    id: 51,
    question:
      'Which of the following is a hazard that must be identified during a site survey for MEWP operations?',
    options: [
      'The colour of the building',
      'Overhead power lines',
      'The name of the site owner',
      'The number of car parking spaces',
    ],
    correctAnswer: 1,
    explanation:
      'Overhead power lines are one of the most critical hazards to identify during a site survey. Contact or close proximity to live power lines can result in electrocution and death. Safe exclusion zones must be established, and if necessary, the power company must be contacted to isolate or divert the supply before work begins.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'hazard identification',
    category: 'Risk Assessment',
  },
  {
    id: 52,
    question: 'What does SSOW stand for?',
    options: [
      'Site Safety and Operations Warning',
      'Safe System of Work',
      'Standard Safety Operating Worksheet',
      'Supervisor Safety Oversight Warrant',
    ],
    correctAnswer: 1,
    explanation:
      'SSOW stands for Safe System of Work. It is a formal procedure resulting from a systematic examination of a task to identify all the hazards and define safe methods of work to ensure that hazards are eliminated or risks minimised. It typically comprises the risk assessment, method statement, and any associated permits or procedures.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'SSOW',
    category: 'Risk Assessment',
  },
  {
    id: 53,
    question: 'What does the safe working load (SWL) of a MEWP platform include?',
    options: [
      'Only the weight of the operator',
      'The weight of the operator, tools, and all materials on the platform',
      'Only the weight of materials being lifted',
      'The total weight of the MEWP itself',
    ],
    correctAnswer: 1,
    explanation:
      "The safe working load (SWL) includes the combined weight of everything on the platform: the operator(s), all tools, materials, equipment, and any other items. Before starting work, the operator must ensure the total load does not exceed the SWL specified on the machine's rating plate.",
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'SWL',
    category: 'Risk Assessment',
  },
  {
    id: 54,
    question:
      'Which of the following weather conditions should cause a MEWP operator to stop work and lower the platform?',
    options: [
      'Light cloud cover with no rain',
      'Temperatures above 20°C',
      'Lightning in the area',
      'Light drizzle with wind below 5 m/s',
    ],
    correctAnswer: 2,
    explanation:
      'Lightning presents an extreme danger to MEWP operators because the elevated metal structure acts as a conductor. If lightning is observed or forecast in the area, work must cease immediately, the platform must be lowered, and personnel must leave the MEWP and seek shelter. Operations should not resume until the storm has passed.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'weather monitoring',
    category: 'Risk Assessment',
  },

  // --- intermediate (14) ---
  {
    id: 55,
    question: 'What does the acronym ACTORS stand for when selecting a MEWP for a task?',
    options: [
      'Application, Cost, Terrain, Operators, Reach, Safety',
      'Access, Capacity, Terrain, Obstructions, Reach, Services',
      'Assessment, Controls, Training, Operators, Risk, Stability',
      'Application, Controls, Terrain, Operations, Risk, Services',
    ],
    correctAnswer: 1,
    explanation:
      'ACTORS is a systematic method for selecting the correct MEWP: Access (how to get the machine to the work area), Capacity (SWL for personnel and materials), Terrain (ground conditions and gradients), Obstructions (overhead cables, structures, trees), Reach (working height and outreach needed), and Services (underground and overhead utilities).',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'ACTORS',
    category: 'Risk Assessment',
  },
  {
    id: 56,
    question:
      'What is the minimum recommended size for a spreader pad placed under a MEWP outrigger?',
    options: [
      'The same size as the outrigger foot',
      'At least twice the area of the outrigger foot',
      'At least three times the area of the outrigger foot',
      'At least five times the area of the outrigger foot',
    ],
    correctAnswer: 2,
    explanation:
      'Spreader pads should have a minimum area of at least three times the area of the outrigger foot. This distributes the concentrated load from the outrigger over a wider area of ground, reducing the ground bearing pressure and helping prevent the outrigger from sinking into soft ground, which could cause the machine to overturn.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'spreader pad sizing',
    category: 'Risk Assessment',
  },
  {
    id: 57,
    question: 'Which of the following is NOT one of the six key MEWP hazards?',
    options: [
      'Electrocution from overhead power lines',
      'Machine overturn',
      'Manual handling of heavy components',
      'Entrapment or crushing',
    ],
    correctAnswer: 2,
    explanation:
      'The six key MEWP hazards are: falls from the platform, electrocution from overhead power lines, machine overturn, entrapment or crushing, collision with structures, and mechanical failure. While manual handling may be a general workplace hazard, it is not classified as one of the six key MEWP-specific hazards.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'six key MEWP hazards',
    category: 'Risk Assessment',
  },
  {
    id: 58,
    question:
      'When conducting a risk assessment for MEWP operations, who might be harmed in addition to the operator?',
    options: [
      'Only the site supervisor',
      'Pedestrians, other workers, and members of the public in the vicinity',
      'Only persons who are IPAF-trained',
      'Only persons who have signed the risk assessment',
    ],
    correctAnswer: 1,
    explanation:
      "The risk assessment must consider all persons who could be affected, including pedestrians passing nearby, other workers on site, members of the public, and anyone in the area who could be struck by falling objects, the MEWP itself, or affected by the machine's movements. Exclusion zones and banksmen may be needed to protect them.",
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: '5-step risk assessment',
    category: 'Risk Assessment',
  },
  {
    id: 59,
    question: 'What is the purpose of bearing capacity assessment when planning MEWP operations?',
    options: [
      'To determine how much noise the MEWP will generate',
      'To calculate whether the ground can support the weight and forces exerted by the MEWP',
      'To measure the platform height required for the task',
      'To check the fuel level of the MEWP',
    ],
    correctAnswer: 1,
    explanation:
      'Bearing capacity assessment determines whether the ground surface can safely support the total weight and forces exerted by the MEWP during operation. This includes the static weight of the machine and the dynamic forces generated during boom movement. Inadequate bearing capacity can lead to ground subsidence and machine overturn.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'bearing capacity',
    category: 'Risk Assessment',
  },
  {
    id: 60,
    question:
      'A boom lift must be set up and levelled before use. What is the typical maximum gradient at which a boom lift should be levelled for operation?',
    options: ['2 degrees', '5 degrees', '10 degrees', '15 degrees'],
    correctAnswer: 1,
    explanation:
      "Boom lifts should be set up and levelled on ground with a maximum gradient of 5 degrees, unless the manufacturer's instructions state otherwise. Operating on steeper slopes can affect the machine's stability and the accuracy of its levelling system. If the ground exceeds the permitted gradient, the machine must not be used in that position.",
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'slopes',
    category: 'Risk Assessment',
  },
  {
    id: 61,
    question: 'What information should a method statement for MEWP operations include?',
    options: [
      'Only the start and finish times of the work',
      'The step-by-step work procedure, risk controls, emergency plans, and responsibilities',
      'Only the make and model of the MEWP',
      "The client's company registration number",
    ],
    correctAnswer: 1,
    explanation:
      'A method statement for MEWP operations should include the step-by-step work procedure, specific risk control measures, emergency and rescue plans, roles and responsibilities of all personnel, the equipment to be used, any exclusion zones, communication methods, and any permits required. It provides a comprehensive safe working procedure.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'method statement',
    category: 'Risk Assessment',
  },
  {
    id: 62,
    question: 'When should a risk assessment for MEWP operations be reviewed and updated?',
    options: [
      'Only at the start of each calendar year',
      'When site conditions change, after an incident, or when the work method changes',
      'Only when requested by the Health and Safety Executive',
      'Only when the MEWP hire contract is renewed',
    ],
    correctAnswer: 1,
    explanation:
      'A risk assessment must be reviewed and updated whenever there is a significant change in circumstances. This includes changes to site conditions (weather, ground, new hazards), after any incident or near-miss, when the work method or equipment changes, or when new information about risks becomes available. Risk assessment is a living process, not a one-off exercise.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: '5-step risk assessment',
    category: 'Risk Assessment',
  },
  {
    id: 63,
    question:
      'What is the main risk if a MEWP operates on ground with underground voids or recently backfilled trenches?',
    options: [
      "The MEWP's tyres may get punctured",
      'The ground may collapse under the weight of the MEWP, causing it to overturn',
      'The MEWP may become electrically charged',
      "The machine's hydraulic system may fail",
    ],
    correctAnswer: 1,
    explanation:
      'Underground voids, cellars, drains, and recently backfilled trenches may not have sufficient bearing capacity to support the concentrated weight of a MEWP, particularly through outriggers. If the ground collapses, the machine can sink on one side and overturn. A site survey must identify such features, and ground protection or alternative positioning must be used.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'ground conditions',
    category: 'Risk Assessment',
  },
  {
    id: 64,
    question: "What type of hazard does the 'S' in the ACTORS method refer to?",
    options: [
      'Safety equipment requirements',
      'Site security arrangements',
      'Underground and overhead services such as power lines and gas mains',
      'Supervisor availability',
    ],
    correctAnswer: 2,
    explanation:
      "The 'S' in ACTORS stands for Services — both underground services (gas mains, water pipes, electrical cables, fibre optics) and overhead services (power lines, telephone cables). These must be identified during the site survey because contact with live electrical services is one of the most dangerous hazards in MEWP operations.",
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'ACTORS',
    category: 'Risk Assessment',
  },
  {
    id: 65,
    question:
      'What control measure helps protect pedestrians and other workers from MEWP operations?',
    options: [
      'Painting the MEWP in a bright colour',
      'Establishing exclusion zones with barriers, signage, and a banksman where necessary',
      'Asking pedestrians to walk quickly past the work area',
      'Operating the MEWP only during lunch breaks when fewer people are around',
    ],
    correctAnswer: 1,
    explanation:
      "Exclusion zones with physical barriers, clear signage, and a banksman (signaller) where necessary are essential control measures to protect pedestrians and other workers. The exclusion zone must cover the area beneath and around the MEWP where falling objects, the machine's movements, or a potential overturn could affect people.",
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'hazard identification',
    category: 'Risk Assessment',
  },
  {
    id: 66,
    question: 'Why is it important to assess access routes to the work area during a site survey?',
    options: [
      'To ensure the delivery vehicle can find the site easily',
      'To confirm the routes are wide enough, strong enough, and clear of obstructions for the MEWP to travel safely',
      'To determine the shortest route for the operator to walk to the canteen',
      'To identify the best location for car parking',
    ],
    correctAnswer: 1,
    explanation:
      'Access routes must be assessed to ensure they are wide enough for the MEWP to pass, strong enough to support its weight (including bridges, ramps, and floor slabs), have sufficient overhead clearance, and are free from obstructions. Inadequate access routes can result in the machine becoming stuck, damaging infrastructure, or causing an incident.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'site survey',
    category: 'Risk Assessment',
  },
  {
    id: 67,
    question: 'What is the primary purpose of using spreader pads under MEWP outriggers?',
    options: [
      'To prevent the outriggers from getting dirty',
      "To increase the area over which the MEWP's weight is distributed, reducing ground pressure",
      'To raise the MEWP higher off the ground',
      'To prevent the MEWP from moving during transport',
    ],
    correctAnswer: 1,
    explanation:
      'Spreader pads distribute the concentrated load from the outrigger foot over a larger area of ground. This reduces the ground bearing pressure (force per unit area) and helps prevent the outrigger from sinking into the ground. Without adequate spreader pads on soft ground, the MEWP could become unstable and overturn.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'bearing capacity',
    category: 'Risk Assessment',
  },
  {
    id: 68,
    question:
      'Which weather conditions other than high wind should be monitored during MEWP operations?',
    options: [
      'Only wind speed needs to be monitored',
      'Rain, ice, lightning, fog, and extreme temperatures',
      'Only rain and snow',
      'Only temperature and humidity',
    ],
    correctAnswer: 1,
    explanation:
      'Multiple weather conditions must be monitored during MEWP operations. Rain and ice can make the platform and controls slippery, affecting grip and control. Lightning makes the elevated metal platform extremely dangerous. Fog reduces visibility. Extreme cold can affect hydraulic performance. All these conditions must be considered in the risk assessment and monitored throughout the work.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'weather monitoring',
    category: 'Risk Assessment',
  },

  // --- advanced (6) ---
  {
    id: 69,
    question:
      'A site survey reveals that a 45-tonne articulating boom lift must be positioned on a suspended concrete car park deck to reach the underside of a bridge structure above. The deck has a posted weight limit of 30 tonnes. What should you do?',
    options: [
      'Proceed with the boom lift but distribute the weight using large spreader pads',
      'Do not position the machine on the deck; reassess and select alternative equipment or a different approach that does not exceed the structural capacity',
      'Proceed at night when traffic is lighter, reducing the overall load on the deck',
      'Remove the counterweight from the boom lift to reduce its weight below 30 tonnes',
    ],
    correctAnswer: 1,
    explanation:
      'A 45-tonne MEWP must never be positioned on a structure with a 30-tonne weight limit, regardless of load-spreading measures. Spreader pads distribute pressure on the surface but cannot increase the structural capacity of the deck. The risk assessment must result in selecting alternative equipment (such as a lighter machine or an under-bridge inspection unit) or finding a ground-level position. Modifying the machine by removing counterweights would compromise its stability.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'ground conditions',
    category: 'Risk Assessment',
  },
  {
    id: 70,
    question:
      'You are planning work using a MEWP near an 11kV overhead power line. What minimum safe exclusion distance must be maintained, and what additional measures should be in place?',
    options: [
      '3 metres clearance with no additional measures needed',
      '9 metres clearance from the line, plus goal posts or physical barriers to define the exclusion zone, a banksman, and consultation with the power company',
      '15 metres clearance with hard barriers and the line must be de-energised',
      '1 metre clearance provided the operator wears rubber gloves',
    ],
    correctAnswer: 1,
    explanation:
      'For voltages up to 33kV, the recommended safe exclusion distance is 9 metres from overhead power lines. Additional measures include erecting goal posts or physical barriers to clearly define the exclusion zone, appointing a banksman to guide the operator, and consulting the distribution network operator about the possibility of isolating or diverting the supply. Rubber gloves offer no protection against high-voltage electrocution.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'hazard identification',
    category: 'Risk Assessment',
  },
  {
    id: 71,
    question:
      'An operator is using a 20-metre telescopic boom lift on a construction site. During operations, the anemometer reads 11 m/s with gusts forecast to increase. The task is expected to take another 45 minutes to complete. What is the correct course of action?',
    options: [
      'Continue working since 11 m/s is below the 12.5 m/s limit and finish the task',
      'Prepare to cease operations and lower the platform to a safe position, as gusts may exceed 12.5 m/s and conditions are deteriorating',
      'Move to a sheltered part of the site and continue working',
      'Increase working speed to finish before the wind increases',
    ],
    correctAnswer: 1,
    explanation:
      'Although 11 m/s is below the 12.5 m/s cease-work threshold, the forecast of increasing gusts means conditions may deteriorate rapidly. Gusts can significantly exceed the average wind speed. The operator should prepare to cease operations and lower the platform to a safe position before conditions worsen. It is not safe to rush the work or assume the task can be completed before wind speeds increase. Proactive risk management is essential.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'wind speed limit',
    category: 'Risk Assessment',
  },
  {
    id: 72,
    question:
      'A task requires a MEWP to carry two operators, a 110V transformer, hand tools, and fixing materials to a working height of 14 metres. The available machine has an SWL of 230 kg. Operator A weighs 90 kg and Operator B weighs 85 kg. The equipment weighs a total of 60 kg. Can this operation proceed safely?',
    options: [
      'Yes, the total weight is 235 kg which is close enough to the 230 kg SWL',
      "No, the total load of 235 kg exceeds the machine's SWL of 230 kg; a machine with a higher SWL is required",
      'Yes, if the operators remove their personal protective equipment to reduce weight',
      'Yes, provided the platform is not raised to full height',
    ],
    correctAnswer: 1,
    explanation:
      "The total load is 90 + 85 + 60 = 235 kg, which exceeds the machine's SWL of 230 kg. The SWL must never be exceeded, even by a small margin, as it is the maximum safe capacity calculated by the manufacturer. A machine with a higher SWL must be selected, or the load must be reduced (e.g. fewer materials per lift). Removing PPE or limiting height does not make an overloaded platform safe.",
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'SWL',
    category: 'Risk Assessment',
  },
  {
    id: 73,
    question:
      'You are writing a method statement for MEWP operations in a busy pedestrianised town centre. Which of the following should be included as a specific control measure for managing the interaction between the MEWP and the public?',
    options: [
      "A note that the public should 'use common sense' and avoid the area",
      'Timed exclusion zones with physical barriers and signage, a dedicated banksman, a traffic management plan, and coordination with the local authority',
      'A verbal instruction to the operator to sound the horn if anyone walks underneath',
      "A sign on the MEWP saying 'Danger — keep clear'",
    ],
    correctAnswer: 1,
    explanation:
      'In a busy pedestrianised area, comprehensive control measures are essential: physical barriers (not just signs) to create exclusion zones during working hours, a dedicated banksman to manage pedestrian flow, a traffic management plan agreed with the local authority, clear signage, and potentially timing works for quieter periods. Relying on the public to self-manage or using only a sign on the MEWP is wholly inadequate for the risk.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'SSOW',
    category: 'Risk Assessment',
  },
  {
    id: 74,
    question:
      'During a site survey using the ACTORS method, you identify the following: narrow access through a 2.5-metre gate, a maximum SWL requirement of 350 kg for three workers and tools, soft clay ground with recent rainfall, overhead telephone cables at 8 metres, a required working height of 12 metres with 3 metres of horizontal outreach, and a gas main running beneath the planned work area. Which factor presents the greatest constraint on machine selection?',
    options: [
      'The narrow gate access at 2.5 metres, as many larger MEWPs will not fit',
      'The soft clay ground, as it directly affects stability and may require extensive ground preparation or an alternative position',
      'The telephone cables at 8 metres, as they prevent all MEWP operations',
      'The gas main, as it means no MEWP can be used on the site',
    ],
    correctAnswer: 1,
    explanation:
      "While all factors constrain machine selection, the soft clay ground following recent rainfall presents the greatest challenge because it directly affects the machine's stability and could cause overturn. Soft ground may require significant ground preparation (compaction, matting, engineered platforms) or force a complete reassessment of the machine position. The narrow access limits machine size, telephone cables require careful planning but not necessarily exclusion, and the gas main requires caution with outrigger placement but does not prevent all operations.",
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'ACTORS',
    category: 'Risk Assessment',
  },
  // =======================================================================
  // INSPECTIONS & SETUP — 34 questions (id 75–108)
  // =======================================================================

  // --- basic (14) ---

  {
    id: 75,
    question: 'How often must a pre-use inspection be carried out on a MEWP?',
    options: [
      'Before every shift the machine is used',
      'Once a week during normal operations',
      'Only after a thorough examination has been completed',
      'Once a month, recorded in the site logbook',
    ],
    correctAnswer: 0,
    explanation:
      'A pre-use inspection must be carried out before every shift by the operator. This visual and functional check ensures the machine is safe to operate and catches defects that may have developed since the last use. It is a separate requirement from the periodic thorough examination.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Pre-use inspection',
    category: 'Inspections & Setup',
  },
  {
    id: 76,
    question:
      'Which of the following should be checked during a pre-use visual inspection of a MEWP?',
    options: [
      'Tyres, hydraulic hoses, controls, guardrails, and labels',
      'Only the emergency stop button and platform controls',
      "The manufacturer's original purchase invoice and warranty",
      "The operator's CSCS card expiry date",
    ],
    correctAnswer: 0,
    explanation:
      'A thorough pre-use visual inspection covers tyres (condition and pressure), hydraulic hoses (leaks or damage), controls (correct operation), guardrails (secure and undamaged), labels (legible SWL plates and warnings), fluid levels, and structural integrity. This broad check is essential to identify defects before work begins.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Pre-use inspection',
    category: 'Inspections & Setup',
  },
  {
    id: 77,
    question:
      'Under the Lifting Operations and Lifting Equipment Regulations (LOLER), how frequently must a MEWP receive a thorough examination?',
    options: [
      'Every 12 months as a minimum',
      'Every 6 months or in accordance with an examination scheme',
      'Only when a defect is reported by an operator',
      'Every 3 months if used on a construction site',
    ],
    correctAnswer: 1,
    explanation:
      'LOLER 1998 requires that MEWPs used to lift persons receive a thorough examination at least every 6 months, or in accordance with a written examination scheme drawn up by a competent person. An examination is also required after exceptional circumstances such as damage or prolonged disuse.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Thorough examination',
    category: 'Inspections & Setup',
  },
  {
    id: 78,
    question: 'Who is legally permitted to carry out a LOLER thorough examination on a MEWP?',
    options: [
      'Any operator who holds a valid IPAF licence',
      'The site manager or principal contractor',
      'A competent person with sufficient training, experience, and knowledge',
      "The MEWP hire company's delivery driver",
    ],
    correctAnswer: 2,
    explanation:
      'LOLER requires thorough examinations to be conducted by a competent person, defined as someone with sufficient training, practical experience, and knowledge of the equipment. This is typically an engineer from an independent inspection body, not a general operator or site manager.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Competent person',
    category: 'Inspections & Setup',
  },
  {
    id: 79,
    question:
      'What should an operator do if they discover a hydraulic fluid leak during a pre-use inspection?',
    options: [
      'Top up the fluid and continue working until the end of the shift',
      'Report the defect immediately, do not use the machine, and tag it out of service',
      'Wipe the leak clean and monitor it throughout the day',
      'Ask a colleague to check whether the leak is serious enough to report',
    ],
    correctAnswer: 1,
    explanation:
      'Any defect found during a pre-use inspection must be reported immediately and the machine must not be used until it has been repaired by a competent person. The machine should be tagged or locked out of service to prevent others from using it. Operating with a hydraulic leak risks sudden loss of function at height.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Defect reporting',
    category: 'Inspections & Setup',
  },
  {
    id: 80,
    question:
      'What type of personal protective equipment is specifically required when working in a boom-type MEWP?',
    options: [
      'A full body harness and short lanyard attached to the designated anchor point',
      'A safety net rigged beneath the platform',
      'A hard hat only, as the guardrails provide sufficient fall protection',
      'A sit harness commonly used in rope access work',
    ],
    correctAnswer: 0,
    explanation:
      'Boom-type MEWPs can generate catapult or ejection forces, so operators must wear a full body harness with a short lanyard attached to the designated anchor point inside the platform. Guardrails alone are not sufficient protection against ejection. Scissor lifts generally do not require harnesses unless a specific risk assessment dictates otherwise.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'PPE requirements',
    category: 'Inspections & Setup',
  },
  {
    id: 81,
    question: 'What is the purpose of outrigger spreader plates?',
    options: [
      'To raise the MEWP higher than its normal maximum working height',
      'To distribute the outrigger load over a wider area of ground',
      'To lock the outriggers in place and prevent them retracting',
      'To level the machine on sloping ground up to 5 degrees',
    ],
    correctAnswer: 1,
    explanation:
      'Spreader plates are placed beneath outrigger feet to distribute the concentrated load over a wider area of ground, reducing ground bearing pressure. They should be at least three times the area of the outrigger foot and placed on firm, stable ground. Without them, outriggers can punch through soft surfaces causing the MEWP to overturn.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Spreader plates',
    category: 'Inspections & Setup',
  },
  {
    id: 82,
    question:
      'When deploying outriggers on a vehicle-mounted MEWP, how many must be fully extended?',
    options: [
      'Only the two on the working side of the machine',
      'A minimum of three out of four',
      'All four outriggers must be fully extended and set on firm level ground',
      'It depends on the height at which work will be carried out',
    ],
    correctAnswer: 2,
    explanation:
      "All four outriggers must be fully extended and placed on firm, level ground before the platform is elevated. Partial deployment dramatically reduces the machine's stability envelope and can lead to overturning. The machine's interlock system should prevent operation unless all outriggers are correctly deployed.",
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Outrigger deployment',
    category: 'Inspections & Setup',
  },
  {
    id: 83,
    question:
      'What is the difference between a restraint harness system and a fall arrest harness system?',
    options: [
      'A restraint system prevents the wearer from reaching the platform edge; a fall arrest system stops a fall after it has begun',
      'A restraint system is used on boom lifts; a fall arrest system is for scissor lifts',
      'There is no difference; the terms are interchangeable in MEWP operations',
      'A fall arrest system is lighter and cheaper than a restraint system',
    ],
    correctAnswer: 0,
    explanation:
      'A restraint system uses a short lanyard to physically prevent the wearer from reaching a position where a fall could occur, such as the platform edge. A fall arrest system allows greater movement but incorporates energy-absorbing components to stop a fall and limit the forces on the body. In boom lifts, a short restraint lanyard is preferred to prevent ejection.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Harness types',
    category: 'Inspections & Setup',
  },
  {
    id: 84,
    question: 'Where should the lanyard be attached when working in a boom-type MEWP?',
    options: [
      'To the nearest structural steelwork outside the platform',
      'To the guardrail top rail of the platform',
      'To the designated anchor point provided inside the MEWP platform',
      'To the boom arm closest to the operator',
    ],
    correctAnswer: 2,
    explanation:
      'The lanyard must always be attached to the designated anchor point inside the MEWP platform, which is engineered to withstand fall arrest forces. Attaching to external structures could pull the operator out of the platform, and guardrails are not designed to take anchor loads. The anchor point is usually a clearly marked ring or post on the platform floor.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Anchor points',
    category: 'Inspections & Setup',
  },
  {
    id: 85,
    question:
      'Which British Standard covers the requirements for full body harnesses used in MEWP operations?',
    options: ['BS EN 354', 'BS EN 361', 'BS EN 795', 'BS EN 131'],
    correctAnswer: 1,
    explanation:
      'BS EN 361 is the standard for full body harnesses, specifying design, testing, and marking requirements. BS EN 354 covers lanyards, BS EN 795 covers anchor devices, and BS EN 131 relates to ladders. Operators should check that their harness carries the BS EN 361 marking and is within its inspection date.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'BS EN 361',
    category: 'Inspections & Setup',
  },
  {
    id: 86,
    question:
      'What regulation places a duty on employers to ensure that work equipment, including MEWPs, is maintained in a safe condition?',
    options: [
      'The Lifting Operations and Lifting Equipment Regulations 1998 (LOLER)',
      'The Provision and Use of Work Equipment Regulations 1998 (PUWER)',
      'The Work at Height Regulations 2005 only',
      'The Health and Safety (First Aid) Regulations 1981',
    ],
    correctAnswer: 1,
    explanation:
      "PUWER 1998 places a general duty on employers to ensure that work equipment is maintained in an efficient state, in efficient working order, and in good repair. This includes routine maintenance and scheduled servicing per the manufacturer's recommendations. LOLER covers the thorough examination requirements specifically for lifting equipment.",
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Routine maintenance',
    category: 'Inspections & Setup',
  },
  {
    id: 87,
    question: 'What should be checked regarding labels and markings during a pre-use inspection?',
    options: [
      'That the hire company sticker is visible on both sides of the machine',
      'That the SWL plate, warning labels, and control markings are legible and undamaged',
      "That the machine's paint colour matches the site colour coding scheme",
      'That the CE mark has been replaced with the UKCA mark',
    ],
    correctAnswer: 1,
    explanation:
      'The operator must verify that the safe working load (SWL) plate is present and legible, that all warning labels are intact, and that control markings are clear and readable. These labels provide critical safety information including maximum occupants, rated load, and operational warnings. Missing or illegible labels should be reported as a defect.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Pre-use inspection',
    category: 'Inspections & Setup',
  },
  {
    id: 88,
    question: 'What must happen to LOLER thorough examination reports after an inspection?',
    options: [
      'They can be destroyed once the next examination has taken place',
      'They must be sent to the HSE within 7 days of the examination',
      'They must be kept available and any defects recorded; the machine must be taken out of service if found unsafe',
      'They only need to be retained if the machine fails the examination',
    ],
    correctAnswer: 2,
    explanation:
      'LOLER thorough examination reports must be kept available for inspection by enforcement authorities. Any defects must be clearly recorded, and if a defect poses an immediate danger, the machine must be taken out of service until repaired. Reports for equipment used to lift persons must be kept for at least two years.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'LOLER examination reports',
    category: 'Inspections & Setup',
  },

  // --- intermediate (14) ---

  {
    id: 89,
    question:
      'A MEWP has been involved in a collision with a site vehicle but appears undamaged. What action is required under LOLER?',
    options: [
      'No action is needed if the machine appears to function normally',
      'A thorough examination must be carried out before the machine is used again, as this constitutes an exceptional circumstance',
      'The operator should carry out an enhanced pre-use check and resume work',
      'The site manager should photograph the damage and file an insurance claim',
    ],
    correctAnswer: 1,
    explanation:
      'LOLER requires a thorough examination following exceptional circumstances that could affect the safety of the equipment, such as a collision, overload event, or prolonged exposure to adverse conditions. Even if no damage is visible, hidden structural or hydraulic defects may have occurred. The machine must not be used until cleared by a competent person.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Thorough examination',
    category: 'Inspections & Setup',
  },
  {
    id: 90,
    question: 'Before deploying outriggers, what ground conditions must the operator assess?',
    options: [
      'Only whether the ground surface is tarmac or concrete',
      'Whether there are underground voids, buried services, slopes, or soft ground that could cause instability',
      'The colour and texture of the ground surface only',
      'Whether the ground has been recently rained on',
    ],
    correctAnswer: 1,
    explanation:
      'The operator must assess the ground for voids (cellars, drains, culverts), buried services (gas, electric, water), slopes or uneven surfaces, and soft or unconsolidated ground. Underground voids can collapse under outrigger loading, and buried services can be damaged. Timber mats or engineered ground preparation may be needed.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Ground preparation',
    category: 'Inspections & Setup',
  },
  {
    id: 91,
    question:
      'What is the minimum recommended area of a spreader plate relative to the outrigger foot?',
    options: [
      'Equal to the outrigger foot area',
      'Twice the outrigger foot area',
      'Three times the outrigger foot area',
      'Five times the outrigger foot area',
    ],
    correctAnswer: 2,
    explanation:
      'Spreader plates should have a minimum area of three times the outrigger foot area to adequately distribute the ground bearing pressure. Using plates that are too small defeats the purpose of load distribution and can still cause ground failure. The plate material must also be strong enough to resist bending under the concentrated load.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Spreader plates',
    category: 'Inspections & Setup',
  },
  {
    id: 92,
    question: 'What is the function of outrigger interlocks on a MEWP?',
    options: [
      'They automatically retract the outriggers when the platform is elevated',
      'They prevent the platform from being elevated unless all outriggers are correctly deployed',
      'They sound an alarm when outriggers touch the ground',
      'They allow the machine to travel with the outriggers partially extended',
    ],
    correctAnswer: 1,
    explanation:
      'Outrigger interlocks are safety devices that prevent the platform from being elevated unless all outriggers are fully deployed and locked. This ensures the machine has its full stability envelope before any lifting operation begins. Operators must never attempt to bypass or override these interlocks, as doing so removes a critical safety barrier against overturning.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Interlocks',
    category: 'Inspections & Setup',
  },
  {
    id: 93,
    question:
      'How often must a full body harness receive a formal detailed inspection by a competent person?',
    options: [
      'Every 12 months',
      'Every 6 months',
      'Only when visible damage is noticed',
      'Every 3 years in line with its maximum service life',
    ],
    correctAnswer: 1,
    explanation:
      "Full body harnesses must receive a formal detailed inspection by a competent person at least every 6 months, in addition to the operator's visual check before each use. The formal inspection examines stitching integrity, webbing condition, buckle function, D-ring wear, and label legibility. Records of these inspections must be maintained.",
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Harness inspection',
    category: 'Inspections & Setup',
  },
  {
    id: 94,
    question:
      'When inspecting a harness before use, which of the following should the operator check?',
    options: [
      'The harness colour matches the site colour coding for the current week',
      'Stitching integrity, webbing for cuts or abrasion, buckle operation, D-ring condition, and label legibility',
      'Only that the harness fits comfortably over their clothing',
      'That the harness has been stored in a locked container overnight',
    ],
    correctAnswer: 1,
    explanation:
      'Before each use, the operator must visually and tactilely inspect the stitching for pulled or broken threads, webbing for cuts, abrasion, or chemical damage, buckles for correct operation, D-rings for distortion or corrosion, and labels for legibility including the inspection date. Any defect means the harness must be withdrawn from use.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Harness inspection',
    category: 'Inspections & Setup',
  },
  {
    id: 95,
    question: 'Why must the lanyard in a boom lift be kept as short as possible?',
    options: [
      'To reduce the cost of replacement lanyards',
      'To prevent the operator from being able to reach beyond the guardrails and risk ejection',
      "To comply with the manufacturer's warranty conditions",
      'To allow more room for tools and materials on the platform',
    ],
    correctAnswer: 1,
    explanation:
      'In boom lifts, a short lanyard acts as a restraint, preventing the operator from reaching over or beyond the guardrails where they could be ejected by sudden machine movements such as a catapult effect. A lanyard that is too long would allow the operator to reach the platform edge, defeating the purpose of the restraint system.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Lanyard adjustment',
    category: 'Inspections & Setup',
  },
  {
    id: 96,
    question:
      'Which British Standard specifies the requirements for lanyards used in work at height?',
    options: ['BS EN 361', 'BS EN 354', 'BS EN 397', 'BS EN 166'],
    correctAnswer: 1,
    explanation:
      'BS EN 354 covers the requirements for lanyards, including construction, strength, and testing criteria. BS EN 361 covers full body harnesses, BS EN 397 covers industrial safety helmets, and BS EN 166 covers eye protection. Operators should verify that their lanyard bears the BS EN 354 marking.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'BS EN 354',
    category: 'Inspections & Setup',
  },
  {
    id: 97,
    question: 'What should the operator check regarding fluid levels during a pre-use inspection?',
    options: [
      'Only the diesel fuel level to ensure enough for the shift',
      'Hydraulic oil, engine oil, coolant, and fuel levels, plus checks for any leaks',
      'Battery electrolyte levels only on electric machines',
      "Fluid levels are the maintenance team's responsibility, not the operator's",
    ],
    correctAnswer: 1,
    explanation:
      'The operator should check all relevant fluid levels including hydraulic oil, engine oil, coolant, and fuel as part of the pre-use inspection. They should also look for evidence of leaks such as puddles beneath the machine or staining on hoses and fittings. Low hydraulic fluid can cause loss of platform control at height.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Pre-use inspection',
    category: 'Inspections & Setup',
  },
  {
    id: 98,
    question:
      'What structural elements should be visually inspected for damage during a pre-use check?',
    options: [
      'The boom, chassis, turntable, platform floor, and guardrails',
      'Only the platform guardrails and toe boards',
      'The engine compartment and battery terminals only',
      'Structural inspections are only required during a thorough examination',
    ],
    correctAnswer: 0,
    explanation:
      "The operator should visually inspect all structural components including the boom or scissor mechanism for cracks, dents, or deformation, the chassis for damage, the turntable for excessive wear, and the platform floor and guardrails for integrity. Any structural damage could compromise the machine's load-bearing capacity and stability.",
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Pre-use inspection',
    category: 'Inspections & Setup',
  },
  {
    id: 99,
    question:
      'An operator notices that one outrigger pad is sinking into soft ground after the MEWP has been set up. What should they do?',
    options: [
      'Continue working but avoid extending the boom in that direction',
      'Place additional timber packing under the sinking outrigger while the platform is elevated',
      'Immediately lower the platform, retract the outriggers, and reposition the MEWP on firmer ground with adequate spreader plates',
      'Extend the opposite outrigger further to compensate',
    ],
    correctAnswer: 2,
    explanation:
      "If an outrigger is sinking, the machine's stability is compromised and there is a risk of overturning. The operator must immediately lower the platform, retract the outriggers, and reposition the machine onto firmer ground with properly sized spreader plates or timber mats. Never attempt to adjust outrigger packing while the platform is elevated, as sudden ground failure could occur.",
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Ground preparation',
    category: 'Inspections & Setup',
  },
  {
    id: 100,
    question:
      "Under PUWER, who has the duty to ensure a MEWP is maintained in accordance with the manufacturer's schedule?",
    options: [
      'The individual operator using the machine on site',
      'The employer or person who has control of the equipment',
      'The Health and Safety Executive directly',
      'The local authority building control department',
    ],
    correctAnswer: 1,
    explanation:
      "PUWER places the duty of maintenance on the employer or the person who has control of the work equipment. This includes ensuring that routine maintenance is carried out in accordance with the manufacturer's servicing schedule and that maintenance records are kept. The operator contributes through pre-use inspections but is not legally responsible for maintenance.",
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Routine maintenance',
    category: 'Inspections & Setup',
  },
  {
    id: 101,
    question:
      'What additional PPE, beyond a harness, is typically required when operating a MEWP on a construction site?',
    options: [
      'No additional PPE is needed if a harness is worn',
      'Hard hat, high-visibility clothing, safety boots, and gloves',
      'A dust mask and ear defenders only',
      'A life jacket in case of working near water',
    ],
    correctAnswer: 1,
    explanation:
      'On a construction site, MEWP operators typically require a hard hat (to protect against falling objects), high-visibility clothing (for visibility to other site traffic), safety boots with toe protection, and gloves. The specific PPE requirements should be confirmed by the site risk assessment, but these items are standard minimum requirements.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'PPE requirements',
    category: 'Inspections & Setup',
  },
  {
    id: 102,
    question: 'What role does a tilt sensor play in MEWP safety systems?',
    options: [
      'It measures wind speed and prevents operation in high winds',
      'It detects when the machine exceeds its safe operating angle and triggers an alarm or cuts functions',
      'It automatically levels the platform regardless of boom position',
      'It measures the slope of the ground before outriggers are deployed',
    ],
    correctAnswer: 1,
    explanation:
      "Tilt sensors monitor the machine's inclination during operation and trigger a warning alarm or cut functions if the machine exceeds its safe operating angle. This provides protection against overturning caused by ground subsidence, uneven loading, or operating on a slope beyond the machine's rated capacity. Operators must never ignore tilt sensor warnings.",
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Interlocks',
    category: 'Inspections & Setup',
  },

  // --- advanced (6) ---

  {
    id: 103,
    question:
      "An operator arrives on site to find a MEWP with an expired thorough examination certificate. The site supervisor insists the work is urgent and the machine 'looks fine'. What is the correct course of action?",
    options: [
      'Use the machine but limit the working height to half the maximum',
      'Refuse to use the machine; it is a legal requirement under LOLER that the thorough examination is current before the machine can be used to lift persons',
      'Use the machine if the operator conducts an extended pre-use inspection',
      'Use the machine but have the supervisor sign a disclaimer accepting responsibility',
    ],
    correctAnswer: 1,
    explanation:
      'Under LOLER 1998, it is a legal requirement that a current thorough examination report exists before a MEWP is used to lift persons. No amount of operational pressure overrides this legal duty. The operator should refuse to use the machine and report the situation, as using equipment without a valid examination exposes both the operator and employer to prosecution.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'LOLER examination reports',
    category: 'Inspections & Setup',
  },
  {
    id: 104,
    question:
      'A MEWP must be set up on a pavement above a basement car park. The ground bearing capacity information is unavailable. What steps should be taken before deploying the outriggers?',
    options: [
      'Deploy the outriggers with extra-large spreader plates and proceed with caution',
      'Obtain ground bearing capacity information, consult a structural engineer if necessary, check for underground voids and services, and use load-spreading measures appropriate to the confirmed capacity',
      'Use the machine without outriggers to avoid loading the pavement',
      'Place the outriggers on the road surface adjacent to the pavement instead',
    ],
    correctAnswer: 1,
    explanation:
      'When ground conditions are uncertain, especially over known voids such as basement car parks, the operator must not assume the ground can support the outrigger loads. A structural assessment is required to confirm the bearing capacity. Underground services must also be checked using utility plans and a CAT scanner. Only once the ground is confirmed as adequate should the machine be set up with appropriate load-spreading measures.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'Ground preparation',
    category: 'Inspections & Setup',
  },
  {
    id: 105,
    question:
      'During a pre-use inspection, an operator discovers that the harness inspection tag shows the last formal inspection was 8 months ago. The harness appears to be in good visual condition. What should the operator do?',
    options: [
      'Use the harness as it looks fine and arrange an inspection at the end of the week',
      'Withdraw the harness from service as it has exceeded the 6-month formal inspection interval, obtain a currently inspected harness, and report the overdue inspection',
      'Use the harness but attach two lanyards for additional safety',
      'Ask a colleague to sign the inspection tag to bring it up to date',
    ],
    correctAnswer: 1,
    explanation:
      'Harnesses require formal inspection by a competent person at least every 6 months. An 8-month gap means the harness is overdue and must be withdrawn from service regardless of its visual appearance, because defects such as UV degradation or internal webbing damage may not be visible. The operator should obtain a harness with a current inspection and report the lapse to their supervisor.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'Harness inspection',
    category: 'Inspections & Setup',
  },
  {
    id: 106,
    question:
      'A competent person conducting a thorough examination identifies a cracked weld on a boom section but considers the machine safe to operate for a further two weeks until a repair can be scheduled. What should happen according to LOLER?',
    options: [
      'The machine can continue to be used for two weeks as the competent person has authorised it',
      'The defect must be recorded in the report and the machine must be taken out of service immediately, as a cracked boom weld is a critical structural defect that could lead to catastrophic failure',
      'The operator should monitor the crack and stop work if it appears to grow',
      'The site manager can overrule the competent person and keep the machine in service',
    ],
    correctAnswer: 1,
    explanation:
      'A cracked weld on a boom section is a critical structural defect that could lead to sudden catastrophic failure under load. Under LOLER, if a defect is identified that poses a risk of serious personal injury, the competent person must notify the relevant enforcing authority and the machine must be taken out of service immediately. No operational convenience justifies continued use with a structural crack.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'Thorough examination',
    category: 'Inspections & Setup',
  },
  {
    id: 107,
    question:
      "An operator is setting up a 45-metre truck-mounted MEWP on a sloping road with a 3-degree gradient. The manufacturer's data plate states a maximum ground slope of 1 degree for outrigger deployment. What is the correct approach?",
    options: [
      'Deploy the outriggers and use the levelling capability to compensate for the slope',
      'Only extend the boom to half its maximum height to reduce the overturning moment',
      "Do not set up in this location; the slope exceeds the manufacturer's stated limit and the machine cannot be safely operated here without engineering controls to level the ground",
      'Position the outriggers with two uphill and two downhill to balance the load',
    ],
    correctAnswer: 2,
    explanation:
      "The manufacturer's maximum slope specification must never be exceeded, as the machine's stability calculations are based on that limit. A 3-degree slope on a 45-metre truck mount significantly increases the overturning moment and exceeds the 1-degree limit by three times. The operator must either find a level location or arrange for engineering controls such as ramps or levelled pads to bring the ground within the manufacturer's specification.",
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'Outrigger deployment',
    category: 'Inspections & Setup',
  },
  {
    id: 108,
    question:
      "A fall arrest lanyard with an energy absorber is being used in a boom lift with a platform height of 9 metres. The total fall distance including lanyard length, energy absorber deployment, harness stretch, and the operator's height below the D-ring is calculated at 6.5 metres. Is this arrangement safe, and why?",
    options: [
      'Yes, because the fall distance is less than the platform height so the operator will not hit the ground',
      'No, because fall arrest lanyards should never be used in boom lifts; only restraint lanyards should be used to prevent the operator from reaching the edge in the first place',
      'Yes, because the energy absorber will reduce the impact force to a safe level',
      'No, but only because the lanyard should be 1 metre shorter',
    ],
    correctAnswer: 1,
    explanation:
      'In boom lifts, the correct approach is to use a short restraint lanyard that prevents the operator from reaching the platform edge, not a fall arrest lanyard with an energy absorber. A fall arrest system in a boom lift would allow the operator to be ejected and then fall the full deployment distance outside the platform. The restraint principle eliminates the fall hazard entirely by keeping the operator within the platform confines.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'Lanyard adjustment',
    category: 'Inspections & Setup',
  },

  // =======================================================================
  // SAFE OPERATION — 34 questions (id 109–142)
  // =======================================================================

  // --- basic (14) ---

  {
    id: 109,
    question: 'What is the first step in the pre-start procedure before operating a MEWP?',
    options: [
      'Elevate the platform to check it works',
      'Conduct a walk-around inspection of the machine',
      'Start the engine and let it warm up for five minutes',
      'Put on the harness and enter the platform',
    ],
    correctAnswer: 1,
    explanation:
      'The first step in the pre-start procedure is to conduct a thorough walk-around inspection of the machine, checking for visible damage, leaks, tyre condition, and obstructions. This must be done before starting the engine or entering the platform, as it may reveal defects that make the machine unsafe to operate.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Pre-start procedure',
    category: 'Safe Operation',
  },
  {
    id: 110,
    question: 'What is the purpose of the emergency stop button on a MEWP?',
    options: [
      'It sounds the horn to alert nearby workers',
      'It cuts all machine functions immediately when pressed',
      'It slowly lowers the platform to ground level',
      'It activates the parking brake only',
    ],
    correctAnswer: 1,
    explanation:
      'The emergency stop button, typically a mushroom-head design coloured red, immediately cuts all machine functions when pressed. Emergency stop buttons are located on both the platform and the ground control station. They are used when there is an immediate danger and all machine movement must cease instantly.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Emergency stops',
    category: 'Safe Operation',
  },
  {
    id: 111,
    question: 'Where are the primary operator controls located on a MEWP?',
    options: [
      'At the ground control station only',
      'In the platform basket where the operator works',
      'Inside the engine compartment',
      'On a remote wireless controller carried by the banksman',
    ],
    correctAnswer: 1,
    explanation:
      'The primary operator controls are located in the platform basket, allowing the operator to control all machine movements from their working position. These include drive, boom/scissor elevation, slew, and telescopic functions. Ground controls and auxiliary controls exist for emergency and recovery purposes but are not the primary operating position.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Platform controls',
    category: 'Safe Operation',
  },
  {
    id: 112,
    question: 'What is the purpose of the ground controls on a MEWP?',
    options: [
      'They are used for normal daily operation instead of the platform controls',
      'They override the platform controls and are used for emergency recovery or when the platform operator is incapacitated',
      'They only control the engine start and stop function',
      'They are used exclusively for loading and unloading from transport',
    ],
    correctAnswer: 1,
    explanation:
      'Ground controls override the platform controls and are primarily used for emergency recovery situations, such as when the platform operator is incapacitated or the platform controls malfunction. They are typically key-operated to prevent unauthorised use. A trained ground operative should always be available to operate these controls if needed.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Ground controls',
    category: 'Safe Operation',
  },
  {
    id: 113,
    question: 'What position should a MEWP be in before it is driven or travelled across a site?',
    options: [
      'With the platform at maximum height for best visibility',
      'In the stowed position with the platform fully lowered and boom centred',
      'With the boom extended at a 45-degree angle',
      'In any position as long as the operator is in the platform',
    ],
    correctAnswer: 1,
    explanation:
      'Before travelling, the MEWP must be in its stowed or transport position with the platform fully lowered and the boom centred and retracted. This ensures the lowest possible centre of gravity and prevents the machine from becoming unstable during travel. Only certain category 3A and 3B machines are designed to be driven with the platform elevated, and only within manufacturer limits.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Travelling',
    category: 'Safe Operation',
  },
  {
    id: 114,
    question: "What does 'SWL' stand for on a MEWP's data plate?",
    options: [
      'Standard Working Limit',
      'Safe Working Load',
      'Site Work Licence',
      'Structural Weight Limit',
    ],
    correctAnswer: 1,
    explanation:
      "SWL stands for Safe Working Load, which is the maximum rated capacity of the platform including the weight of all occupants, tools, and materials. The SWL is displayed on the machine's data plate and must never be exceeded. Overloading can cause structural failure or overturning.",
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'SWL management',
    category: 'Safe Operation',
  },
  {
    id: 115,
    question:
      'Why should all MEWP movements be tested at low speed before elevating to work height?',
    options: [
      'To warm up the hydraulic oil for faster operation',
      'To verify that all functions operate correctly and safely before the operator is at height',
      "To calibrate the machine's GPS tracking system",
      'To charge the battery to full capacity before use',
    ],
    correctAnswer: 1,
    explanation:
      'Testing all movements at ground level and low speed allows the operator to verify that every function — drive, lift, slew, telescope — responds correctly before committing to working at height. Discovering a control malfunction at full elevation would be far more dangerous. This functional test is a critical part of the pre-start procedure.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Function testing',
    category: 'Safe Operation',
  },
  {
    id: 116,
    question:
      'What is the minimum exclusion zone distance that should be maintained around the base of an operating MEWP?',
    options: ['2 metres', '5 metres', '10 metres', '15 metres'],
    correctAnswer: 2,
    explanation:
      'A minimum exclusion zone of 10 metres should be maintained around the base of an operating MEWP to prevent unauthorised persons from entering the area beneath or around the elevated platform. This protects against falling objects and the risk of being struck by the machine or its counterweights. The zone should be marked with barriers, cones, or tape.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Exclusion zones',
    category: 'Safe Operation',
  },
  {
    id: 117,
    question: 'What is the role of a banksman during MEWP operations?',
    options: [
      'To operate the ground controls at all times during the lift',
      'To guide the operator, watch for hazards, and communicate using hand signals or radio',
      'To record the working hours of the machine for billing purposes',
      'To hold the base of the MEWP steady during operation',
    ],
    correctAnswer: 1,
    explanation:
      "A banksman acts as an additional set of eyes for the MEWP operator, guiding movements, watching for hazards such as overhead obstructions or approaching pedestrians, and communicating using standardised hand signals or radio. They are particularly important when the operator's view is restricted or when working near traffic, structures, or other hazards.",
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Banksman duties',
    category: 'Safe Operation',
  },
  {
    id: 118,
    question: 'What should an operator check before elevating the platform to work height?',
    options: [
      'That overhead clearances are adequate and there are no obstructions above',
      'That the wind speed is above 10 mph for cooling',
      "That the machine's odometer reading has been recorded",
      'That the paint on the boom is free from scratches',
    ],
    correctAnswer: 0,
    explanation:
      'Before elevating, the operator must check overhead clearances for obstructions such as power lines, beams, ceilings, pipes, and structural steelwork. Contact with overhead obstructions can cause entrapment, electrocution, or structural damage to the MEWP. The operator should also position the machine correctly before elevating rather than trying to reposition at height.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Elevating procedures',
    category: 'Safe Operation',
  },
  {
    id: 119,
    question: "Which standardised hand signal means 'stop all operations immediately'?",
    options: [
      'Both arms waving above the head',
      'One arm raised with an open palm facing the operator',
      'Arms crossed above the head',
      'Pointing downward with one finger',
    ],
    correctAnswer: 1,
    explanation:
      'The standard stop signal is one arm raised with an open palm facing the operator. This universally recognised signal commands all operations to cease immediately. All personnel involved in MEWP operations should be familiar with standardised hand signals to ensure clear communication, especially in noisy environments where verbal communication may be difficult.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Hand signals',
    category: 'Safe Operation',
  },
  {
    id: 120,
    question:
      'What traffic management measures should be in place when operating a MEWP near a public road?',
    options: [
      'No measures are needed if the MEWP has flashing beacons',
      'Barriers, cones, a banksman, high-visibility clothing, and appropriate lighting',
      'A single warning sign placed 10 metres from the MEWP',
      'A speed limit sign reducing traffic to 40 mph',
    ],
    correctAnswer: 1,
    explanation:
      'Comprehensive traffic management is required when operating near roads, including physical barriers and cones to separate the work area from traffic, a banksman to manage pedestrian and vehicle movements, high-visibility clothing for all personnel, and adequate lighting if visibility is poor. A traffic management plan should be prepared in advance and approved by the relevant authority.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Traffic management',
    category: 'Safe Operation',
  },
  {
    id: 121,
    question: 'What is the auxiliary lowering system on a MEWP used for?',
    options: [
      'To increase the speed of normal platform lowering',
      'To provide a secondary means of lowering the platform if the primary controls fail',
      'To lower materials from the platform to ground level',
      'To deploy the outriggers in an emergency',
    ],
    correctAnswer: 1,
    explanation:
      'The auxiliary lowering system provides a secondary, independent means of lowering the platform to ground level if the primary hydraulic or electrical controls fail. It typically operates as a manual override or gravity-descent valve. All operators and ground personnel must know its location and how to operate it as part of the rescue plan.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Auxiliary controls',
    category: 'Safe Operation',
  },
  {
    id: 122,
    question: 'Why must a rescue plan be confirmed before beginning work in a MEWP?',
    options: [
      'It is a recommendation but not a legal requirement',
      'Because if the operator becomes incapacitated or the machine fails at height, a pre-planned rescue ensures a prompt and safe recovery',
      "To satisfy the insurance company's requirements only",
      'It is only needed when working above 20 metres',
    ],
    correctAnswer: 1,
    explanation:
      'A rescue plan must be in place before any work at height begins, as required by the Work at Height Regulations 2005. If the operator becomes incapacitated, trapped, or the machine malfunctions at height, a pre-planned rescue procedure ensures that trained personnel can recover the operator promptly using the ground controls or emergency services. Delay in rescue can lead to suspension trauma or worsened medical outcomes.',
    section: 'Module 4',
    difficulty: 'basic',
    topic: 'Pre-start procedure',
    category: 'Safe Operation',
  },

  // --- intermediate (14) ---

  {
    id: 123,
    question:
      'Which categories of MEWP are designed to be driven with the platform in the elevated position?',
    options: [
      'All categories may be driven elevated without restriction',
      'Category 1A and 1B scissor lifts only',
      'Category 3A and 3B mobile boom lifts, within manufacturer-specified limits',
      'Only truck-mounted MEWPs with outriggers deployed',
    ],
    correctAnswer: 2,
    explanation:
      "Only category 3A (controlled travel, elevated) and 3B (free travel, elevated) mobile boom lifts are designed to be driven with the platform elevated. Even then, maximum travel speed restrictions apply, ground conditions must be suitable, and the manufacturer's specific limits for elevated travel must be observed. Other categories must be fully stowed before travelling.",
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Driving elevated',
    category: 'Safe Operation',
  },
  {
    id: 124,
    question:
      'What is the safe exclusion distance from overhead power lines rated above 132kV when operating a MEWP?',
    options: ['3 metres', '9 metres', '15 metres', '25 metres'],
    correctAnswer: 2,
    explanation:
      'For overhead power lines rated above 132kV, a minimum exclusion distance of 15 metres must be maintained from any part of the MEWP, including the fully extended boom and platform. For lines rated 33kV to 132kV the distance is 9 metres, and for lines below 33kV it is 3 metres. These distances account for electrical arcing and conductor sway.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Power line distances',
    category: 'Safe Operation',
  },
  {
    id: 125,
    question:
      'What is the minimum safe exclusion distance from overhead power lines rated between 33kV and 132kV?',
    options: ['3 metres', '6 metres', '9 metres', '15 metres'],
    correctAnswer: 2,
    explanation:
      'For overhead power lines rated between 33kV and 132kV, a minimum exclusion distance of 9 metres must be maintained. This distance applies to all parts of the MEWP at maximum reach. Physical barriers such as goalpost barriers or bunting should be erected to define the exclusion zone, and a banksman should be appointed to monitor compliance.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Power line distances',
    category: 'Safe Operation',
  },
  {
    id: 126,
    question:
      'When managing the safe working load of a MEWP platform, what must be included in the total weight calculation?',
    options: [
      'Only the weight of the persons on the platform',
      'The weight of all persons, tools, materials, and equipment on the platform',
      'Only items weighing more than 10 kg individually',
      'The weight of persons only, as tools are considered negligible',
    ],
    correctAnswer: 1,
    explanation:
      'The total weight on the platform must include the combined weight of all occupants, tools, materials, and equipment. Even items that seem light individually can accumulate to exceed the SWL. The operator must check the SWL plate and calculate the total load before elevating. Overloading is one of the most common causes of MEWP incidents.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'SWL management',
    category: 'Safe Operation',
  },
  {
    id: 127,
    question: 'What is entrapment, and how should it be prevented when operating a MEWP?',
    options: [
      'Entrapment is when the machine gets stuck in mud; it is prevented by using wider tyres',
      'Entrapment is when the operator or platform is crushed between the MEWP and a fixed structure; it is prevented by maintaining safe distances and awareness of surroundings',
      'Entrapment is when tools fall from the platform; it is prevented by using tool lanyards',
      'Entrapment is when the harness becomes tangled; it is prevented by correct harness fitting',
    ],
    correctAnswer: 1,
    explanation:
      "Entrapment occurs when the operator's body or the platform is caught and crushed between the MEWP (boom, platform, or controls) and a fixed structure such as a beam, steelwork, or building facade. It is prevented by maintaining safe distances from structures, never positioning between the platform and fixed objects, being aware of the boom's swing path, and using secondary guarding devices where fitted.",
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Entrapment prevention',
    category: 'Safe Operation',
  },
  {
    id: 128,
    question: 'What precautions are required when operating a MEWP in a public area?',
    options: [
      'No special precautions beyond normal operation',
      'A full exclusion zone with barriers minimum 6 metres from the base, warning signs, and a banksman to manage public access',
      'Simply placing a single cone next to the machine',
      'Operating only during daylight hours with no other precautions',
    ],
    correctAnswer: 1,
    explanation:
      'Working in public areas requires enhanced precautions including a full exclusion zone with barriers positioned a minimum of 6 metres from the machine base, clearly visible warning signs, and a dedicated banksman to manage public access and prevent entry into the danger zone. The public cannot be expected to understand MEWP hazards, so physical barriers are essential.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Public areas',
    category: 'Safe Operation',
  },
  {
    id: 129,
    question: 'What additional measures are required when operating a MEWP during night working?',
    options: [
      'No additional measures if the machine has headlights',
      'Adequate task and area lighting, increased use of high-visibility clothing, and an additional banksman where necessary',
      'The machine must be fitted with infrared cameras',
      'Night working with MEWPs is prohibited under UK regulations',
    ],
    correctAnswer: 1,
    explanation:
      'Night working requires adequate artificial lighting for both the task and the surrounding area, enhanced high-visibility clothing (reflective strips visible from all angles), and additional banksman support where visibility is reduced. The risk assessment should also consider increased fatigue, reduced reaction times, and the difficulty of communicating in darkness.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Night working',
    category: 'Safe Operation',
  },
  {
    id: 130,
    question: 'What is the correct procedure for loading a MEWP onto a transport vehicle?',
    options: [
      'Drive the MEWP onto the trailer at speed to maintain momentum up the ramps',
      "Ensure level ground, apply the trailer's parking brake, use wheel chocks, and follow the manufacturer's loading procedure",
      'Lift the MEWP with a crane in all cases',
      'Reverse the MEWP onto the trailer to use the rear-view camera',
    ],
    correctAnswer: 1,
    explanation:
      "Loading a MEWP onto transport requires level ground to prevent the trailer from rolling, the trailer parking brake must be applied and wheel chocks placed, and the manufacturer's specific loading procedure must be followed. Ramps must be rated for the machine's weight, and the MEWP should be driven on slowly in its stowed position. Securing chains or straps must be applied before transport.",
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Loading and unloading',
    category: 'Safe Operation',
  },
  {
    id: 131,
    question:
      'During the 11-step pre-start procedure, at what point should the emergency stop be tested?',
    options: [
      'Only if the operator suspects it might not be working',
      'After the walk-around inspection but before elevating to work height, as part of the control testing sequence',
      'At the end of the working day to confirm it still works',
      'Emergency stops are tested during thorough examinations only, not by operators',
    ],
    correctAnswer: 1,
    explanation:
      'The emergency stop must be tested as part of the pre-start control testing sequence, after the walk-around but before any elevated work begins. The operator should activate the emergency stop to confirm it immediately halts all functions, then reset it. Both the platform and ground station emergency stops should be tested. This ensures the critical safety device is functional before the operator works at height.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Pre-start procedure',
    category: 'Safe Operation',
  },
  {
    id: 132,
    question:
      'Why should the operator position the MEWP before elevating rather than driving to the work position while elevated?',
    options: [
      'Because elevated driving is more fuel-efficient',
      'Because driving with the platform elevated increases the risk of overturning due to a higher centre of gravity, and most MEWP categories are not rated for elevated travel',
      'Because the platform controls are disabled during travel on all machines',
      'Because it takes longer to reach the work position when elevated',
    ],
    correctAnswer: 1,
    explanation:
      "Driving with the platform elevated raises the machine's centre of gravity significantly, increasing the risk of overturning, especially on uneven ground or slopes. Most MEWP categories are not designed for elevated travel and their stability calculations assume a stowed position during travel. Only category 3A and 3B machines permit controlled elevated travel within strict limits.",
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Elevating procedures',
    category: 'Safe Operation',
  },
  {
    id: 133,
    question: 'What is the safe exclusion distance from overhead power lines rated below 33kV?',
    options: ['1 metre', '3 metres', '9 metres', '15 metres'],
    correctAnswer: 1,
    explanation:
      'For overhead power lines rated below 33kV, a minimum exclusion distance of 3 metres must be maintained from any part of the MEWP at maximum extension. Even at lower voltages, electrical contact or arcing can be lethal. If work must be carried out closer than these distances, the power company must be consulted and the lines may need to be isolated or diverted.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Power line distances',
    category: 'Safe Operation',
  },
  {
    id: 134,
    question:
      'What controls smoothness technique should operators use when operating MEWP boom functions?',
    options: [
      'Move all controls to their maximum position for speed and efficiency',
      'Use smooth, progressive control inputs, avoiding sudden starts and stops that could cause the platform to jerk or whip',
      'Alternate rapidly between functions to complete the task faster',
      'Hold the dead-man controls in the fully open position at all times',
    ],
    correctAnswer: 1,
    explanation:
      'Operators should use smooth, progressive control inputs to avoid sudden acceleration, deceleration, or directional changes that can cause the platform to jerk, bounce, or whip — especially on long-reach boom lifts where the tip speed amplifies small control inputs. Smooth operation reduces the risk of operator ejection and structural stress on the machine.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Elevating procedures',
    category: 'Safe Operation',
  },
  {
    id: 135,
    question:
      'Before beginning elevated work, who should the MEWP operator brief and what should be confirmed?',
    options: [
      "Brief the client's project manager on the commercial terms of the hire",
      'Brief the team on the rescue plan, confirm a ground operative is trained on ground controls, and ensure communication methods are agreed',
      'Brief the HSE inspector on the risk assessment findings',
      'No briefing is needed if the operator has completed IPAF training',
    ],
    correctAnswer: 1,
    explanation:
      'Before beginning work, the operator should brief the team on the task, confirm the rescue plan, ensure a trained ground operative knows how to use the ground controls, and agree on communication methods (hand signals, radio). This ensures that everyone knows their role and can respond quickly to emergencies. It is a key step in the 11-step pre-start procedure.',
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Pre-start procedure',
    category: 'Safe Operation',
  },
  {
    id: 136,
    question:
      'What maximum speed restrictions typically apply when driving a category 3B MEWP with the platform elevated?',
    options: [
      'There are no speed restrictions for 3B machines',
      'The manufacturer specifies maximum elevated travel speeds, which are significantly lower than stowed travel speed, typically limited by a restrictor system',
      'A flat speed limit of 20 mph applies to all elevated travel',
      'The speed is limited only by the site speed limit signs',
    ],
    correctAnswer: 1,
    explanation:
      "Category 3B machines have manufacturer-specified maximum travel speeds for elevated operation, which are significantly lower than their stowed travel speed. These limits are typically enforced by a restrictor system that automatically reduces speed when the platform is raised. The exact limits vary by machine and boom extension, and the operator must comply with both the manufacturer's limits and any additional site restrictions.",
    section: 'Module 4',
    difficulty: 'intermediate',
    topic: 'Driving elevated',
    category: 'Safe Operation',
  },

  // --- advanced (6) ---

  {
    id: 137,
    question:
      'An operator is working in a boom lift near structural steelwork when the boom begins to slew unexpectedly due to a control malfunction. The platform is moving towards a steel beam that could trap the operator. What is the correct immediate action?',
    options: [
      'Attempt to push off the steelwork with their hands to redirect the platform',
      'Hit the emergency stop immediately to halt all machine movement before the platform reaches the steelwork',
      'Jump from the platform to escape entrapment',
      'Call the ground operative on the radio and wait for them to use the ground controls',
    ],
    correctAnswer: 1,
    explanation:
      "The immediate action in an entrapment situation is to hit the emergency stop button, which will instantly cut all machine functions and halt the platform's movement. Attempting to push off steelwork risks limb entrapment, jumping is likely to cause serious injury from height, and waiting for ground control response takes too long when seconds matter. The emergency stop is the operator's primary defence against entrapment.",
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'Entrapment prevention',
    category: 'Safe Operation',
  },
  {
    id: 138,
    question:
      'A MEWP operator needs to carry out work alongside a dual carriageway with overhead power lines rated at 33kV running parallel to the road at a horizontal distance of 8 metres from the kerb. The boom lift has a maximum outreach of 18 metres. What control measures are required?',
    options: [
      'No special measures as the power lines are 8 metres away and the operator can judge the distance',
      'Use an exclusion barrier at 9 metres from the power lines, limit boom functions to prevent any part of the MEWP reaching within 9 metres of the lines, appoint a banksman to monitor, and implement a traffic management plan for the road',
      'Simply instruct the operator not to extend the boom towards the power lines',
      'Request the electricity company to increase the voltage so wider exclusion distances apply, making the hazard more obvious',
    ],
    correctAnswer: 1,
    explanation:
      "At 33kV, the exclusion distance is 9 metres. Since the boom can reach 18 metres and the lines are only 8 metres away, the boom could easily enter the exclusion zone. Physical goal-post barriers or bunting must define the 9-metre exclusion zone, the machine's working envelope must be restricted, a banksman must monitor compliance, and a full traffic management plan is required for the adjacent road. Relying on operator judgement alone is never acceptable near power lines.",
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'Power line distances',
    category: 'Safe Operation',
  },
  {
    id: 139,
    question:
      'During elevated work, a category 3B boom lift operator notices the ground conditions ahead are deteriorating — there is standing water and the ground appears soft and rutted. The operator needs to reposition 15 metres forward. What is the safest approach?',
    options: [
      'Drive forward slowly while elevated, as 3B machines are rated for elevated travel',
      'Lower the platform to stowed position, assess the ground conditions at close range on foot if safe to do so, and if the ground is unsuitable, arrange for temporary roadway panels or select an alternative position on firm ground',
      'Drive at maximum speed to cross the soft ground before the machine sinks',
      'Extend the boom further to reach the work area without repositioning the base',
    ],
    correctAnswer: 1,
    explanation:
      'Although 3B machines can travel elevated, they require suitable ground conditions. Soft, rutted, or waterlogged ground significantly increases overturning risk, especially with an elevated platform. The operator must lower the platform, physically assess the ground, and either improve the surface with temporary roadway panels or bog mats, or choose an alternative position. Extending the boom beyond its intended reach increases overturning moment and may exceed structural limits.',
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'Driving elevated',
    category: 'Safe Operation',
  },
  {
    id: 140,
    question:
      'An operator is working at 12 metres in a boom lift when the hydraulic system fails completely. The platform will not respond to any controls and the engine has stalled. The auxiliary lowering system is not responding. A rescue plan is in place. What is the correct sequence of actions?',
    options: [
      'Climb down the boom structure to reach the ground',
      'Activate the emergency stop, attempt to restart the engine and retry the auxiliary lowering system, communicate the situation to the ground operative, and if all machine-based recovery fails, initiate the rescue plan which may involve the emergency services',
      'Wait silently until someone notices the problem',
      'Remove the harness and abseil down using the lanyard',
    ],
    correctAnswer: 1,
    explanation:
      'The correct sequence is: activate the emergency stop to secure the machine, attempt to restart the engine and retry the auxiliary lowering system as it may work independently of the main hydraulics, communicate the situation to the trained ground operative who should attempt recovery using ground controls, and if all machine-based options are exhausted, initiate the pre-planned rescue procedure which may include emergency services with specialist rescue equipment. Climbing down the boom is extremely dangerous and not a recognised rescue method.',
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'Auxiliary controls',
    category: 'Safe Operation',
  },
  {
    id: 141,
    question:
      'A site requires a MEWP to operate at night in a pedestrianised town centre with shops and restaurants. The work involves replacing street lights at 10 metres height. What comprehensive set of control measures should be in place?',
    options: [
      'Carry out the work during the day instead, as night working in public areas is not permitted',
      'Use a MEWP with a flashing beacon and rely on the public to stay clear',
      'Establish a full exclusion zone with barriers minimum 6 metres from the base, deploy adequate task and area lighting, station banksmen at all access points, display warning signs, ensure all personnel wear enhanced high-visibility clothing, have a traffic management plan approved by the local authority, and confirm the rescue plan accounts for reduced visibility',
      'Close all shops and restaurants within 50 metres and evacuate the area',
    ],
    correctAnswer: 2,
    explanation:
      'Night working in a public area combines multiple high-risk factors requiring comprehensive controls. The exclusion zone with barriers prevents public access, adequate lighting ensures the operator can work safely and the public can see the barriers, banksmen manage pedestrian flow, warning signs inform the public, enhanced high-vis ensures worker visibility, and the traffic management plan (approved by the local authority for highway work) controls vehicle and pedestrian movements. The rescue plan must account for reduced visibility conditions.',
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'Night working',
    category: 'Safe Operation',
  },
  {
    id: 142,
    question:
      'A MEWP platform has a rated SWL of 230 kg. Two operatives weighing 85 kg and 95 kg respectively need to access the platform with a battery-powered impact wrench (8 kg), a toolbox (12 kg), and a replacement component (25 kg). Should this load be permitted?',
    options: [
      'Yes, as the total weight is 225 kg which is within the 230 kg SWL',
      'No, because only one operative should ever be on a MEWP platform at a time',
      'Yes, because the SWL includes a large safety factor so 225 kg is well within the actual failure load',
      'The load should be carefully reviewed: while 225 kg is technically within the 230 kg SWL, the margin of only 5 kg leaves no allowance for additional items such as PPE, drinks, or unforeseen materials, and the task should be reassessed to determine if the load can be reduced',
    ],
    correctAnswer: 3,
    explanation:
      "While the calculated total of 225 kg is technically within the 230 kg SWL, the 5 kg margin is dangerously thin. The operatives' weights do not account for PPE (harnesses, hard hats, boots, tool belts), personal items, or any additional materials that might be needed during the task. Exceeding the SWL even marginally compromises the machine's structural safety factor. The task should be replanned — perhaps using a machine with a higher SWL, reducing the number of occupants, or staging materials in multiple lifts.",
    section: 'Module 4',
    difficulty: 'advanced',
    topic: 'SWL management',
    category: 'Safe Operation',
  },
  // =======================================================================
  // EMERGENCY & RESCUE — 30 questions (id 143–172)
  // =======================================================================

  // --- basic (12) ---

  {
    id: 143,
    question:
      'Under which regulation is a rescue plan legally required before any work at height takes place?',
    options: [
      'The Work at Height Regulations 2005',
      'The Health and Safety at Work Act 1974',
      'The Lifting Operations and Lifting Equipment Regulations 1998',
      'The Provision and Use of Work Equipment Regulations 1998',
    ],
    correctAnswer: 0,
    explanation:
      'The Work at Height Regulations 2005 (WAHR 2005) specifically require that a rescue plan is in place before any work at height begins. This ensures that if a worker becomes stranded or injured at height, there is a pre-planned method to bring them to safety without delay.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Rescue plan',
    category: 'Emergency & Rescue',
  },
  {
    id: 144,
    question:
      'What is the first choice method of rescue when a MEWP operator becomes incapacitated in the platform?',
    options: [
      'Call 999 immediately for the fire brigade',
      'Use the ground controls to lower the platform',
      'Climb up the boom to reach the operator',
      'Use a second MEWP to transfer the casualty',
    ],
    correctAnswer: 1,
    explanation:
      'Option A in a MEWP rescue plan is for a trained person on the ground to use the ground-level controls to lower the platform. This is the fastest and safest first-choice rescue method, as it does not require specialist equipment or emergency services and can be carried out immediately by trained personnel on site.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Ground controls',
    category: 'Emergency & Rescue',
  },
  {
    id: 145,
    question:
      'What are the four control systems available on a typical MEWP for use in an emergency?',
    options: [
      'Platform controls, ground controls, auxiliary controls, and emergency lowering',
      'Joystick controls, remote controls, voice controls, and automatic descent',
      'Primary controls, secondary controls, backup controls, and radio controls',
      'Operator controls, supervisor controls, manufacturer controls, and emergency stop',
    ],
    correctAnswer: 0,
    explanation:
      'A typical MEWP has four control systems: platform controls (normal operation), ground controls (first rescue option), auxiliary controls (backup power systems), and emergency lowering (manual/gravity descent). These provide multiple layers of redundancy to ensure the platform can always be brought down safely.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Four control systems',
    category: 'Emergency & Rescue',
  },
  {
    id: 146,
    question: 'What is an auxiliary power unit (APU) on a MEWP?',
    options: [
      'A solar panel that charges the main battery',
      'A battery or generator backup that powers the hydraulic system when the main engine fails',
      'A pneumatic air compressor used to inflate the tyres',
      'A secondary fuel tank for extended operation',
    ],
    correctAnswer: 1,
    explanation:
      'An auxiliary power unit (APU) is a battery-powered or generator-powered backup system that can operate the hydraulic controls when the main engine or power source fails. It allows the platform to be lowered under controlled hydraulic power rather than relying on manual methods, making it the preferred Option B rescue method.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'APU',
    category: 'Emergency & Rescue',
  },
  {
    id: 147,
    question:
      'When should calling 999 for the emergency services be considered as part of a MEWP rescue plan?',
    options: [
      'As the first action in every rescue situation',
      'Only when the operator requests it',
      'As a last resort when all other rescue options have been exhausted or are unsuitable',
      'Only during night-time operations',
    ],
    correctAnswer: 2,
    explanation:
      'Calling 999 for the emergency services is Option C — the last resort in a MEWP rescue plan. It should only be used when ground controls, auxiliary power, and emergency lowering have all failed or are not suitable. Emergency services may take considerable time to arrive, so on-site rescue methods must always be attempted first.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Emergency services',
    category: 'Emergency & Rescue',
  },
  {
    id: 148,
    question: 'What information should be provided when calling 999 for a MEWP emergency?',
    options: [
      'Only the site address and your name',
      'The location, height of the platform, number of casualties, and nature of the emergency',
      'The make and model of the MEWP only',
      'The name of the site supervisor and the company insurance details',
    ],
    correctAnswer: 1,
    explanation:
      'When calling 999 for a MEWP emergency, you must provide the precise location (including site address and where on site), the height of the platform, the number of casualties, and the nature of the emergency. This information allows the emergency services to dispatch the correct resources and plan their approach before arriving.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Emergency services',
    category: 'Emergency & Rescue',
  },
  {
    id: 149,
    question: 'What is suspension trauma and why is it dangerous?',
    options: [
      'A fear of heights that causes panic attacks in the platform',
      'Blood pooling in the legs when a person is suspended in a harness, which can cause death within 15 to 30 minutes',
      'Bruising caused by a harness that is too tight around the chest',
      'A psychological condition caused by working at height for extended periods',
    ],
    correctAnswer: 1,
    explanation:
      'Suspension trauma (also called orthostatic intolerance) occurs when a person hangs motionless in a harness, causing blood to pool in the legs. This reduces blood flow to vital organs and can lead to renal failure and death within as little as 15 to 30 minutes. This is why rapid rescue is critical after any fall into a harness.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Suspension trauma',
    category: 'Emergency & Rescue',
  },
  {
    id: 150,
    question: 'What is the purpose of a manual lowering valve on a MEWP?',
    options: [
      'To increase the speed of the boom during normal operation',
      'To allow a controlled release of hydraulic pressure so the platform lowers under gravity',
      'To lock the boom in position during high winds',
      'To fill the hydraulic reservoir with fluid',
    ],
    correctAnswer: 1,
    explanation:
      'A manual lowering valve allows a controlled release of hydraulic pressure, enabling the boom and platform to lower gradually under the force of gravity. It is used when both the platform controls and the auxiliary power unit have failed, providing a mechanical means of lowering the platform without any electrical or engine power.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Manual lowering valve',
    category: 'Emergency & Rescue',
  },
  {
    id: 151,
    question: 'What is the role of the designated ground rescue person when a MEWP is in use?',
    options: [
      'To operate the MEWP from the platform at all times',
      'To remain near the machine, maintain communication with the operator, and be trained to operate the ground controls',
      'To supervise other trades on site and manage deliveries',
      'To complete the daily inspection paperwork only',
    ],
    correctAnswer: 1,
    explanation:
      'The designated ground rescue person must be trained to operate the ground-level controls, remain stationed near the machine throughout its use, and maintain communication with the platform operator. Their sole purpose is to be ready to carry out a rescue using the ground controls if the operator becomes incapacitated or the platform controls fail.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Ground rescue person duties',
    category: 'Emergency & Rescue',
  },
  {
    id: 152,
    question:
      'Which of the following is a key component that must be included in a MEWP rescue plan?',
    options: [
      "A list of all employees' home addresses",
      'The method of rescue, trained personnel, equipment needed, communication plan, and emergency services contact details',
      'The purchase price of the MEWP and its depreciation schedule',
      "A copy of the operator's driving licence",
    ],
    correctAnswer: 1,
    explanation:
      'A compliant rescue plan must include the method of rescue to be used, identification of trained rescue personnel, the equipment required, a communication plan between the platform and the ground, and contact details for the emergency services. These components ensure that a rescue can be carried out promptly and effectively.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Rescue plan components',
    category: 'Emergency & Rescue',
  },
  {
    id: 153,
    question: 'When should rescue drills for MEWP operations be practised?',
    options: [
      'Only after an accident has occurred',
      'Once a year during the annual safety audit',
      'Before work begins, so that all personnel are familiar with the rescue procedure',
      'Only when the HSE inspector visits the site',
    ],
    correctAnswer: 2,
    explanation:
      'Rescue drills should be practised before work at height begins so that all personnel involved are familiar with the procedure and can carry it out without hesitation in a real emergency. Regular practice ensures that ground rescue persons can confidently operate controls and that communication methods work effectively.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Rescue drills',
    category: 'Emergency & Rescue',
  },
  {
    id: 154,
    question:
      'Which communication methods should be established between the MEWP platform and the ground as part of the rescue plan?',
    options: [
      'Email and written letters only',
      'Radio, mobile phone, visual signals, and audible signals such as a whistle or horn',
      'Social media messaging only',
      'Communication is not necessary if the operator is experienced',
    ],
    correctAnswer: 1,
    explanation:
      'Effective communication between the platform operator and the ground is essential for both normal operations and emergencies. Methods should include two-way radio, mobile phone as a backup, pre-agreed visual signals for when verbal communication is not possible, and audible signals such as a whistle or horn to attract attention in noisy environments.',
    section: 'Module 5',
    difficulty: 'basic',
    topic: 'Communication methods',
    category: 'Emergency & Rescue',
  },

  // --- intermediate (12) ---

  {
    id: 155,
    question:
      'If the platform controls on a MEWP fail and the ground controls also cannot lower the platform, what should be attempted next?',
    options: [
      'The operator should climb down the boom structure',
      'Use the auxiliary power unit or the manual lowering valve to lower the platform',
      'Wait until the next day for a repair engineer',
      'Ask another worker to throw a rope up to the platform',
    ],
    correctAnswer: 1,
    explanation:
      'When both the platform controls and ground controls fail, the next step is to use the auxiliary controls — either the auxiliary power unit (APU) to power the hydraulics or the manual lowering valve to release hydraulic pressure for a controlled gravity descent. These are designed as secondary emergency lowering systems for exactly this scenario.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Emergency lowering',
    category: 'Emergency & Rescue',
  },
  {
    id: 156,
    question:
      'A hand pump is fitted to a MEWP as an emergency lowering device. In what circumstances would it be used?',
    options: [
      'To raise the platform faster than the normal controls allow',
      'To pressurise the hydraulic system for routine maintenance',
      'When all power sources have failed, allowing manual hydraulic operation to lower the platform',
      'To inflate the outrigger pads before setting up',
    ],
    correctAnswer: 2,
    explanation:
      'A hand pump is a manual hydraulic pump used as a last-resort mechanical means of lowering the platform when all power sources — main engine, battery, and auxiliary power unit — have failed. The operator or ground rescue person manually pumps to generate hydraulic pressure sufficient to retract the boom and lower the platform in a controlled manner.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Hand pump',
    category: 'Emergency & Rescue',
  },
  {
    id: 157,
    question:
      'What is the correct first aid response if a person is rescued from suspension in a harness after hanging for more than 10 minutes?',
    options: [
      'Lay them flat on their back immediately and elevate their legs',
      'Place them in the recovery position (on their side with knees bent) and do not lay them flat',
      'Sit them upright in a chair and give them hot drinks',
      'Have them walk around immediately to restore circulation',
    ],
    correctAnswer: 1,
    explanation:
      'After prolonged suspension in a harness, the casualty must be placed in the recovery position and must NOT be laid flat. Laying a suspension trauma casualty flat can cause a sudden rush of pooled, toxin-laden blood from the legs back to the heart and kidneys, potentially causing cardiac arrest or renal failure. Medical assistance should be sought immediately.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Suspension trauma',
    category: 'Emergency & Rescue',
  },
  {
    id: 158,
    question:
      'If a MEWP operator contacts an overhead power line and is still in contact with it, what is the correct response from the ground?',
    options: [
      "Grab the operator's arm and pull them away from the power line",
      'Throw water over the contact point to break the electrical circuit',
      'Do NOT touch the casualty, isolate the power supply if safe to do so, and call 999 immediately',
      'Use a metal ladder to reach the operator and free them',
    ],
    correctAnswer: 2,
    explanation:
      'You must NEVER touch a casualty who is in contact with a live electrical source, as the current will pass through you as well. The correct response is to keep everyone clear, attempt to isolate the power supply if this can be done safely (e.g. by contacting the electricity network operator), and call 999 immediately. A non-conductive rescue pole may be used only by trained personnel.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Electrocution response',
    category: 'Emergency & Rescue',
  },
  {
    id: 159,
    question:
      'An operator becomes trapped between the platform guardrail and a building structure. What is the correct immediate response from the ground rescue person?',
    options: [
      'Use the ground controls to reverse the movement that caused the entrapment',
      'Continue moving the platform in the same direction to push past the obstruction',
      'Leave the site to fetch a supervisor before doing anything',
      'Switch off all power and wait for the emergency services',
    ],
    correctAnswer: 0,
    explanation:
      'The immediate response to an entrapment is to use the ground controls to reverse the movement that caused the trapping, freeing the operator as quickly as possible. The emergency stop should then be activated to prevent further movement. If the operator cannot be freed using ground controls, emergency services should be called immediately.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Entrapment response',
    category: 'Emergency & Rescue',
  },
  {
    id: 160,
    question:
      'During a rescue, the auxiliary power unit (APU) is activated but the platform does not move. What should the ground rescue person do next?',
    options: [
      'Repeatedly press the platform control buttons harder',
      'Attempt the manual lowering valve or hand pump as the next emergency lowering method',
      'Disconnect the hydraulic hoses to drain the fluid',
      'Rock the machine from side to side to free the mechanism',
    ],
    correctAnswer: 1,
    explanation:
      'If the APU fails to move the platform, the ground rescue person should progress to the next emergency lowering method: the manual lowering valve for a controlled gravity descent, or the hand pump if the valve is not effective. The rescue plan sequence must be followed methodically, escalating through each option before calling emergency services.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Emergency lowering',
    category: 'Emergency & Rescue',
  },
  {
    id: 161,
    question:
      'Why is it critical that the ground rescue person remains stationed near the MEWP at all times during operation?',
    options: [
      'To prevent unauthorised persons from stealing tools',
      'Because the operator may become incapacitated without warning, requiring an immediate ground-level rescue',
      'To count the number of hours the machine is in use for billing purposes',
      'To hold the stabiliser legs in place during operation',
    ],
    correctAnswer: 1,
    explanation:
      'The ground rescue person must remain near the MEWP because an operator may become incapacitated suddenly — due to a medical event, electrocution, entrapment, or equipment failure — and require immediate rescue using the ground controls. Any delay in reaching the ground controls could result in serious injury or death, particularly in cases of suspension trauma where time is critical.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Ground rescue person duties',
    category: 'Emergency & Rescue',
  },
  {
    id: 162,
    question:
      'What rescue equipment should be readily available at the base of a MEWP during operation?',
    options: [
      "A fire extinguisher, first aid kit, and the machine's operating manual with emergency procedures",
      'A toolbox containing only spanners and screwdrivers',
      'A set of traffic cones and nothing else',
      "The operator's personal belongings and lunch box",
    ],
    correctAnswer: 0,
    explanation:
      "Essential rescue equipment at the base of a MEWP should include a fire extinguisher, a first aid kit, the machine's operating manual (which contains the specific emergency lowering procedures for that machine), and any additional rescue equipment specified in the rescue plan such as a non-conductive rescue pole for electrical hazards.",
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Rescue plan components',
    category: 'Emergency & Rescue',
  },
  {
    id: 163,
    question:
      'How does using the manual lowering valve differ from using the auxiliary power unit during an emergency?',
    options: [
      'The manual lowering valve raises the platform, while the APU lowers it',
      'The APU provides powered hydraulic control, while the manual lowering valve releases hydraulic pressure for a controlled gravity descent',
      'There is no difference; they are the same system',
      'The manual lowering valve is faster and should always be used first',
    ],
    correctAnswer: 1,
    explanation:
      'The APU provides powered backup to the hydraulic system, allowing normal controlled movement of the boom via the ground controls. The manual lowering valve, by contrast, simply releases hydraulic pressure in a controlled manner, allowing gravity to lower the boom and platform. The APU gives more control but requires a working backup power source, while the manual lowering valve works without any power.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Emergency lowering',
    category: 'Emergency & Rescue',
  },
  {
    id: 164,
    question:
      'What should the rescue plan specify regarding the training of the ground rescue person?',
    options: [
      'That they hold a full CSCS card and nothing else',
      'That they are trained on the specific ground-level controls of the MEWP in use and have practised the rescue procedure',
      'That they have attended a general health and safety induction only',
      'That they have a valid first aid certificate but no MEWP training',
    ],
    correctAnswer: 1,
    explanation:
      'The rescue plan must specify that the ground rescue person is trained on the specific ground-level controls of the actual MEWP being used on site, as controls vary between manufacturers and models. They must also have practised the rescue procedure including emergency lowering methods for that particular machine before work begins.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Ground rescue person duties',
    category: 'Emergency & Rescue',
  },
  {
    id: 165,
    question:
      'If a MEWP suffers a complete hydraulic failure while the platform is elevated, what sequence of actions should be followed?',
    options: [
      'Jump from the platform to the ground immediately',
      'Activate the emergency stop, attempt the APU, then try the manual lowering valve or hand pump, and call 999 if all methods fail',
      'Wait in the platform indefinitely until someone notices',
      'Disassemble the boom sections to lower yourself down',
    ],
    correctAnswer: 1,
    explanation:
      'The correct response to complete hydraulic failure is to activate the emergency stop to prevent uncontrolled movement, then attempt the APU for backup hydraulic power. If the APU fails, try the manual lowering valve for a gravity descent or the hand pump for manual hydraulic operation. If all on-site methods fail, call 999 and provide full details of the situation.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Machine failure response',
    category: 'Emergency & Rescue',
  },
  {
    id: 166,
    question:
      'Which of the following best describes the correct communication protocol during a MEWP rescue?',
    options: [
      'The ground rescue person should shout instructions as loudly as possible',
      'Maintain continuous two-way communication using the pre-agreed method, confirm each action before proceeding, and relay information to emergency services if called',
      'Communication is unnecessary during a rescue as speed is the priority',
      'Only the site manager should communicate during a rescue',
    ],
    correctAnswer: 1,
    explanation:
      'During a MEWP rescue, continuous two-way communication must be maintained between the ground rescue person and the platform (if the operator is conscious) using the pre-agreed communication method. Each action should be confirmed before proceeding to prevent further harm, and the ground rescue person must be ready to relay accurate information to emergency services if they are called.',
    section: 'Module 5',
    difficulty: 'intermediate',
    topic: 'Communication methods',
    category: 'Emergency & Rescue',
  },

  // --- advanced (6) ---

  {
    id: 167,
    question:
      'A boom-type MEWP operator has collapsed in the platform at a height of 22 metres. The ground controls have been tried but the boom will not respond. The APU activates but produces insufficient pressure to move the boom. What is the most appropriate next action?',
    options: [
      'Call 999 immediately and abandon all further rescue attempts',
      'Locate and operate the manual lowering valve to release hydraulic pressure for a controlled gravity descent, while maintaining communication and monitoring the casualty',
      'Send another worker up the boom to carry the casualty down',
      'Drive the MEWP to a lower area of ground to reduce the platform height',
    ],
    correctAnswer: 1,
    explanation:
      'With ground controls unresponsive and the APU providing insufficient pressure, the next step in the emergency lowering sequence is the manual lowering valve. This allows a controlled release of hydraulic pressure so gravity lowers the boom. Throughout, communication must be maintained and the casualty monitored for signs of suspension trauma. If this also fails, only then should 999 be called as the final option.',
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'Emergency lowering',
    category: 'Emergency & Rescue',
  },
  {
    id: 168,
    question:
      'An operator has fallen from the platform but is caught by their harness and lanyard. They are hanging motionless and unresponsive 18 metres above the ground. It has been approximately 5 minutes since the fall. Which factors must the rescue team prioritise?',
    options: [
      'Completing the accident report before beginning the rescue',
      'Speed of rescue due to the risk of suspension trauma, lowering the casualty to the ground as quickly as possible, placing them in the recovery position, and calling for medical assistance',
      'Photographing the scene for evidence before moving the casualty',
      'Waiting for the HSE to arrive to authorise the rescue',
    ],
    correctAnswer: 1,
    explanation:
      'With an unresponsive operator suspended in a harness, the priority is speed — suspension trauma can cause death within 15 to 30 minutes. The rescue team must lower the casualty to the ground as quickly as possible using ground controls or emergency lowering, place them in the recovery position (NOT flat on their back), and call for immediate medical assistance. Evidence gathering is secondary to saving life.',
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'Suspension trauma',
    category: 'Emergency & Rescue',
  },
  {
    id: 169,
    question:
      "During a site-specific rescue drill, it is discovered that the MEWP's ground controls are obstructed by scaffolding erected after the MEWP was positioned. What action should be taken before work at height resumes?",
    options: [
      'Proceed with work as the platform controls are still functional',
      'Remove or reposition the scaffolding to ensure unobstructed access to the ground controls, or reposition the MEWP, and update the rescue plan accordingly',
      'Inform the scaffolders but continue working at height',
      'Rely solely on calling 999 as the rescue method',
    ],
    correctAnswer: 1,
    explanation:
      'Access to the ground controls is a critical element of the rescue plan. If access is obstructed, work at height must not continue until the obstruction is removed, the MEWP is repositioned, or an alternative rescue plan that accounts for the changed conditions is developed. The rescue plan must be updated to reflect the new site arrangement and all personnel informed of the changes.',
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'Rescue drills',
    category: 'Emergency & Rescue',
  },
  {
    id: 170,
    question:
      'A MEWP is operating near 33kV overhead power lines when a gust of wind causes the boom to contact a cable. The operator appears to be unconscious. Describe the correct rescue response.',
    options: [
      'Use the ground controls immediately to lower the platform away from the cables',
      'Do NOT approach or touch the machine, keep all personnel at least 10 metres away, call 999 and the electricity network operator to isolate the supply, and only begin rescue once the supply is confirmed isolated',
      'Throw a rope to the operator so they can lower themselves',
      'Drive the MEWP away from the power lines using the ground drive controls',
    ],
    correctAnswer: 1,
    explanation:
      'When a MEWP contacts overhead power lines, the entire machine may be live. Nobody must approach or touch the machine until the electricity supply is confirmed isolated by the network operator. All personnel must be kept at a safe distance (at least 10 metres for 33kV), 999 and the electricity network operator must be called immediately, and rescue must only begin once isolation is confirmed. Touching the ground controls could be fatal.',
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'Electrocution response',
    category: 'Emergency & Rescue',
  },
  {
    id: 171,
    question:
      'An operator is trapped between the MEWP platform guardrail and a steel beam. The ground rescue person has reversed the boom movement using the ground controls, but the operator remains partially trapped and is in severe pain. What should the ground rescue person do next?',
    options: [
      'Continue operating the ground controls to try different movements until the operator is free',
      'Activate the emergency stop to prevent any further uncontrolled movement, call 999 for emergency services, maintain communication with the casualty, administer reassurance, and do not attempt to move them further without professional guidance',
      'Leave the operator and go to find the site manager',
      "Lower the platform to the ground as quickly as possible regardless of the operator's position",
    ],
    correctAnswer: 1,
    explanation:
      'Once the initial trapping movement has been reversed but the operator remains trapped, the emergency stop should be activated to prevent further movement that could worsen injuries. Emergency services must be called as specialist extrication may be required. The ground rescue person must maintain communication, reassure the casualty, and not attempt further machine movement that could cause additional harm without professional guidance.',
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'Entrapment response',
    category: 'Emergency & Rescue',
  },
  {
    id: 172,
    question:
      'A rescue plan for a complex project involves MEWPs operating at different heights across multiple work zones, each with different hazards. What must the rescue plan address to comply with the Work at Height Regulations 2005?',
    options: [
      'A single generic rescue procedure covering all zones is sufficient',
      'Zone-specific rescue procedures detailing the method of rescue, trained personnel and their locations, equipment required, communication arrangements, and emergency services access routes for each work zone',
      'Only the highest work zone needs a detailed rescue plan',
      'The rescue plan only needs to cover working hours, not overtime periods',
    ],
    correctAnswer: 1,
    explanation:
      "The Work at Height Regulations 2005 require that rescue plans are suitable and sufficient for the specific work being carried out. For a complex project with multiple zones, the plan must address each zone's unique hazards, specify rescue methods appropriate to each height and location, assign trained personnel to each zone, detail the equipment needed, establish communication arrangements, and identify emergency services access routes for every area.",
    section: 'Module 5',
    difficulty: 'advanced',
    topic: 'Rescue plan components',
    category: 'Emergency & Rescue',
  },

  // =======================================================================
  // SAFETY & BEST PRACTICE — 28 questions (id 173–200)
  // =======================================================================

  // --- basic (11) ---

  {
    id: 173,
    question: 'What does RIDDOR stand for?',
    options: [
      'Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013',
      'Recording of Industrial Damage, Defects and Operational Risks 2013',
      'Regulation of Inspections, Defects, Damages and Operational Reviews 2013',
      'Reporting of Incidents, Damages and Disruptions to Operational Resources 2013',
    ],
    correctAnswer: 0,
    explanation:
      'RIDDOR stands for the Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013. It places a legal duty on employers, the self-employed, and people in control of work premises to report certain serious workplace accidents, occupational diseases, and specified dangerous occurrences to the HSE.',
    section: 'General',
    difficulty: 'basic',
    topic: 'RIDDOR reporting',
    category: 'Safety & Best Practice',
  },
  {
    id: 174,
    question:
      'Under RIDDOR, how quickly must a death resulting from a workplace accident be reported?',
    options: [
      'Within 7 days',
      'Within 24 hours',
      'Immediately, by the quickest practicable means',
      'Within 15 days',
    ],
    correctAnswer: 2,
    explanation:
      'Under RIDDOR 2013, deaths resulting from workplace accidents must be reported immediately by the quickest practicable means, which is typically by telephone to the HSE. A written report must then follow within 10 days. Immediate reporting ensures the HSE can investigate while evidence is still available.',
    section: 'General',
    difficulty: 'basic',
    topic: 'RIDDOR reporting',
    category: 'Safety & Best Practice',
  },
  {
    id: 175,
    question: 'What is a near-miss in the context of workplace safety?',
    options: [
      'An incident that only causes minor damage to equipment',
      'An unplanned event that had the potential to cause injury or damage but did not',
      'An accident that is not serious enough to report',
      'A planned emergency drill that goes wrong',
    ],
    correctAnswer: 1,
    explanation:
      'A near-miss is an unplanned event that did not result in injury, illness, or damage but had the potential to do so. Reporting near-misses is vital for prevention because they highlight hazards and unsafe conditions before a serious accident occurs. Every near-miss should be reported to a supervisor or safety officer and recorded.',
    section: 'General',
    difficulty: 'basic',
    topic: 'Near-miss reporting',
    category: 'Safety & Best Practice',
  },
  {
    id: 176,
    question: 'Why is near-miss reporting considered vital for workplace safety?',
    options: [
      'It creates more paperwork for the safety officer to justify their role',
      'It helps identify hazards and unsafe conditions before a serious accident occurs, enabling preventive action',
      'It is only required for insurance purposes',
      'It is a legal requirement under RIDDOR to report all near-misses to the HSE',
    ],
    correctAnswer: 1,
    explanation:
      "Near-miss reporting is vital because it reveals hazards, unsafe conditions, and weaknesses in procedures before someone is actually injured. Each near-miss is an opportunity to take corrective action and prevent a future serious accident. According to Heinrich's triangle, for every major injury there are approximately 300 near-misses, making them a critical early warning system.",
    section: 'General',
    difficulty: 'basic',
    topic: 'Near-miss reporting',
    category: 'Safety & Best Practice',
  },
  {
    id: 177,
    question:
      "According to Heinrich's safety triangle, what is the approximate ratio of major injuries to minor injuries to near-misses?",
    options: [
      '1 major injury : 10 minor injuries : 50 near-misses',
      '1 major injury : 29 minor injuries : 300 near-misses',
      '1 major injury : 100 minor injuries : 1,000 near-misses',
      '1 major injury : 5 minor injuries : 25 near-misses',
    ],
    correctAnswer: 1,
    explanation:
      "Heinrich's triangle states that for every 1 major injury, there are approximately 29 minor injuries and 300 near-misses. This demonstrates that reducing near-misses through reporting and corrective action will in turn reduce the likelihood of minor injuries and major injuries. It is a foundational principle of proactive safety management.",
    section: 'General',
    difficulty: 'basic',
    topic: "Heinrich's triangle",
    category: 'Safety & Best Practice',
  },
  {
    id: 178,
    question: 'What is a toolbox talk?',
    options: [
      'A formal meeting held in the site office to review annual safety statistics',
      'A short, topic-specific safety briefing delivered to workers before or during work, often at the work location',
      'A training course lasting a full day on power tool safety',
      "A manufacturer's demonstration of a new piece of equipment",
    ],
    correctAnswer: 1,
    explanation:
      "A toolbox talk is a short, informal safety briefing typically lasting 5 to 15 minutes, delivered to workers at the work location before or during work. They are topic-specific, interactive, and focus on hazards relevant to the day's work. Toolbox talks are an effective way to reinforce safe working practices and keep safety at the forefront of workers' minds.",
    section: 'General',
    difficulty: 'basic',
    topic: 'Toolbox talks',
    category: 'Safety & Best Practice',
  },
  {
    id: 179,
    question:
      'Under RIDDOR 2013, within what timeframe must an over-7-day injury be reported to the HSE?',
    options: [
      'Immediately by telephone',
      'Within 24 hours',
      'Within 15 days of the incident',
      'Within 30 days of the incident',
    ],
    correctAnswer: 2,
    explanation:
      'Under RIDDOR 2013, if a worker is incapacitated for more than 7 consecutive days (not counting the day of the accident), the injury must be reported to the HSE within 15 days of the incident. This applies to injuries that prevent the worker from carrying out their normal duties for that period. Deaths, specified injuries, and dangerous occurrences must be reported immediately.',
    section: 'General',
    difficulty: 'basic',
    topic: 'RIDDOR reporting',
    category: 'Safety & Best Practice',
  },
  {
    id: 180,
    question:
      'According to the IPAF 2024 global safety report, what was the most common cause of MEWP-related fatalities?',
    options: [
      'Falls from the platform',
      'Electrocution',
      'Overturn of the machine',
      'Being struck by a falling object',
    ],
    correctAnswer: 2,
    explanation:
      "According to the IPAF 2024 global safety report, overturn of the machine was the most common cause of MEWP-related fatalities worldwide. This highlights the critical importance of ground conditions assessment, correct use of outriggers, staying within the machine's rated capacity, and not operating in wind speeds above the manufacturer's limits.",
    section: 'General',
    difficulty: 'basic',
    topic: 'Overturn as top cause of fatalities',
    category: 'Safety & Best Practice',
  },
  {
    id: 181,
    question: 'What is the catapult effect in relation to MEWP operations?',
    options: [
      'The effect of gravity on tools dropped from the platform',
      'A sudden, violent movement of the platform caused by the sudden release of a trapped boom, which is a leading cause of operator ejection',
      'The acceleration of the MEWP when driving downhill',
      'The recoil experienced when using power tools in the platform',
    ],
    correctAnswer: 1,
    explanation:
      "The catapult effect occurs when a boom-type MEWP's boom becomes trapped or snagged on a structure and then suddenly releases, causing the platform to whip violently. This is a leading cause of operator ejection from the platform. It is why harness use is mandatory in boom-type MEWPs and why operators must be aware of their boom's position relative to surrounding structures at all times.",
    section: 'General',
    difficulty: 'basic',
    topic: 'Catapult effect',
    category: 'Safety & Best Practice',
  },
  {
    id: 182,
    question: 'What are secondary guarding devices on a MEWP?',
    options: [
      'Additional guardrails fitted above the standard ones',
      'Load-sensing or proximity detection systems that prevent or warn of potential entrapment between the platform and surrounding structures',
      'Locks fitted to the platform gate to prevent unauthorised access',
      'Protective covers over the hydraulic hoses',
    ],
    correctAnswer: 1,
    explanation:
      'Secondary guarding devices are safety systems such as load-sensing bars or proximity detection sensors fitted to the platform or boom to detect when the operator may be at risk of entrapment between the platform and a fixed structure. They either warn the operator or automatically stop machine movement to prevent crushing injuries, which have seen a 75% increase in reported incidents.',
    section: 'General',
    difficulty: 'basic',
    topic: 'Secondary guarding devices',
    category: 'Safety & Best Practice',
  },
  {
    id: 183,
    question: 'What is the purpose of the Plan-Do-Check-Act (PDCA) cycle in safety management?',
    options: [
      'It is a financial planning tool for budgeting safety equipment purchases',
      'It is a continuous improvement cycle used to plan safety measures, implement them, monitor their effectiveness, and make improvements based on findings',
      'It is a one-off process used only when setting up a new construction site',
      'It is a method for scheduling annual safety inspections',
    ],
    correctAnswer: 1,
    explanation:
      'The Plan-Do-Check-Act cycle, also known as the Deming cycle, is a continuous improvement framework. In safety management, you Plan the safety measures needed, Do (implement) them, Check their effectiveness through monitoring and review, and Act on findings to make improvements. This cycle repeats continuously, driving ongoing improvement in safety performance.',
    section: 'General',
    difficulty: 'basic',
    topic: 'Continuous improvement cycle',
    category: 'Safety & Best Practice',
  },

  // --- intermediate (11) ---

  {
    id: 184,
    question:
      "Under RIDDOR 2013, which of the following is classified as a 'specified injury' that must be reported immediately?",
    options: [
      'A minor cut requiring a plaster',
      'A fracture (other than to fingers, thumbs, or toes)',
      'A bruise to the knee',
      'A headache caused by noise exposure',
    ],
    correctAnswer: 1,
    explanation:
      'Under RIDDOR 2013, specified injuries include fractures (other than to fingers, thumbs, or toes), amputations, crush injuries leading to internal organ damage, serious burns, scalping, loss of consciousness, and injuries requiring admission to hospital for more than 24 hours. These must be reported to the HSE immediately by the quickest practicable means.',
    section: 'General',
    difficulty: 'intermediate',
    topic: 'RIDDOR reporting',
    category: 'Safety & Best Practice',
  },
  {
    id: 185,
    question:
      'According to the IPAF 2024 global safety report, approximately how many MEWP-related fatalities were recorded worldwide?',
    options: ['Approximately 25', 'Approximately 50', 'Approximately 100', 'Approximately 250'],
    correctAnswer: 2,
    explanation:
      'The IPAF 2024 global safety report recorded approximately 100 MEWP-related fatalities worldwide, representing a 26% decrease from the previous year. While this downward trend is encouraging, it demonstrates that MEWP operations remain high-risk and that continued vigilance, training, and adherence to safe working practices are essential.',
    section: 'General',
    difficulty: 'intermediate',
    topic: 'IPAF 2024 global safety report statistics',
    category: 'Safety & Best Practice',
  },
  {
    id: 186,
    question:
      'The IPAF 2024 global safety report noted a significant change in entrapment incidents. What was reported?',
    options: [
      'A 75% decrease in entrapment incidents',
      'No change in entrapment incidents compared to the previous year',
      'A 75% increase in entrapment incidents',
      'Entrapment incidents were not tracked in the 2024 report',
    ],
    correctAnswer: 2,
    explanation:
      'The IPAF 2024 global safety report highlighted a concerning 75% increase in reported entrapment incidents compared to the previous year. This significant rise underscores the importance of secondary guarding devices, proper planning to maintain safe clearances, operator awareness of surroundings, and the availability of a trained ground rescue person to reverse boom movements immediately.',
    section: 'General',
    difficulty: 'intermediate',
    topic: 'Entrapment increase',
    category: 'Safety & Best Practice',
  },
  {
    id: 187,
    question:
      'What was the reported change in falls from MEWPs according to the IPAF 2024 global safety report?',
    options: [
      'Falls increased by 39%',
      'Falls remained the same as the previous year',
      'Falls decreased by 39%',
      'Falls decreased by 10%',
    ],
    correctAnswer: 2,
    explanation:
      'The IPAF 2024 global safety report recorded a 39% decrease in falls from MEWPs compared to the previous year. This positive trend is likely attributable to improved training, greater compliance with harness requirements in boom-type MEWPs, and increased awareness of the catapult effect. However, falls remain a significant cause of serious injury and death.',
    section: 'General',
    difficulty: 'intermediate',
    topic: 'Falls decrease',
    category: 'Safety & Best Practice',
  },
  {
    id: 188,
    question: 'What are the key steps in conducting an effective accident investigation?',
    options: [
      'Blame the person involved, issue a warning, and resume work immediately',
      'Establish the root cause, gather evidence, interview witnesses, implement corrective actions, and take steps to prevent recurrence',
      'Complete the insurance claim form and file it with HR',
      'Take photographs only and send them to the manufacturer',
    ],
    correctAnswer: 1,
    explanation:
      'An effective accident investigation aims to establish the root cause (not just the immediate cause), gather physical and documentary evidence, interview witnesses while events are fresh, implement corrective actions to address the root cause, and take steps to prevent recurrence. The purpose is learning and prevention, not blame. Findings should be shared to improve safety across the organisation.',
    section: 'General',
    difficulty: 'intermediate',
    topic: 'Accident investigation',
    category: 'Safety & Best Practice',
  },
  {
    id: 189,
    question:
      "What is the purpose of a 'lessons learnt' review following an incident or near-miss?",
    options: [
      'To identify who was at fault and issue disciplinary action',
      'To review what happened, share findings with relevant personnel, update procedures where needed, and prevent recurrence',
      'To calculate the financial cost of the incident for the insurance claim',
      'To satisfy the client that the project is still on schedule',
    ],
    correctAnswer: 1,
    explanation:
      'A lessons learnt review examines what happened, why it happened, and what can be done differently to prevent it from happening again. Findings are shared with relevant personnel and used to update procedures, risk assessments, and training. This is a key part of the continuous improvement cycle and helps build a positive safety culture where incidents are treated as learning opportunities.',
    section: 'General',
    difficulty: 'intermediate',
    topic: 'Lessons learnt',
    category: 'Safety & Best Practice',
  },
  {
    id: 190,
    question:
      'What actions should be taken immediately after a serious incident involving a MEWP on site?',
    options: [
      'Move the MEWP to the compound and clean up the area before anyone arrives',
      'Secure the scene, administer first aid, report to the supervisor, preserve evidence, and complete an accident report',
      'Continue working and report the incident at the end of the shift',
      'Only notify the MEWP hire company and no one else',
    ],
    correctAnswer: 1,
    explanation:
      'Immediately after a serious MEWP incident, the scene must be secured to prevent further harm and preserve evidence, first aid administered to any casualties, the supervisor notified, and all evidence preserved (do not move equipment or clean up). An accident report must be completed as soon as practicable, and RIDDOR reporting obligations must be considered for deaths, specified injuries, or dangerous occurrences.',
    section: 'General',
    difficulty: 'intermediate',
    topic: 'Post-incident actions',
    category: 'Safety & Best Practice',
  },
  {
    id: 191,
    question:
      "Under RIDDOR 2013, which of the following must be reported as a 'dangerous occurrence' even if no one is injured?",
    options: [
      'A worker forgetting to wear their hard hat for five minutes',
      'The collapse, overturning, or failure of load-bearing parts of a lifting machine such as a MEWP',
      'A minor oil leak from a hydraulic hose',
      'A worker arriving late for a toolbox talk',
    ],
    correctAnswer: 1,
    explanation:
      'Under RIDDOR 2013, the collapse, overturning, or failure of load-bearing parts of lifting equipment (including MEWPs) must be reported as a dangerous occurrence, regardless of whether anyone was injured. Dangerous occurrences are events with the potential to cause serious harm and must be reported immediately to enable the HSE to investigate and prevent future incidents.',
    section: 'General',
    difficulty: 'intermediate',
    topic: 'RIDDOR reporting',
    category: 'Safety & Best Practice',
  },
  {
    id: 192,
    question: 'What does a positive safety culture on a construction site look like in practice?',
    options: [
      'Workers avoiding reporting hazards to keep the project on schedule',
      'Everyone taking responsibility for safety, reporting hazards without fear, challenging unsafe behaviour, and leading by example',
      'Only the site manager being responsible for all safety decisions',
      'Safety rules being followed only when an inspector is on site',
    ],
    correctAnswer: 1,
    explanation:
      'A positive safety culture means that everyone — from directors to apprentices — takes personal responsibility for safety. Workers report hazards and near-misses without fear of blame, unsafe behaviour is challenged constructively by anyone who witnesses it, and leaders lead by example. Safety is treated as a core value, not just a set of rules to follow when being observed.',
    section: 'General',
    difficulty: 'intermediate',
    topic: 'Safety culture',
    category: 'Safety & Best Practice',
  },
  {
    id: 193,
    question:
      'How does the continuous improvement cycle (PDCA) apply to MEWP safety after an incident has occurred?',
    options: [
      'It does not apply — incidents are one-off events',
      'Plan revised safety measures based on investigation findings, Do (implement) the changes, Check their effectiveness through monitoring, and Act to make further adjustments',
      "Only the 'Plan' stage is relevant after an incident",
      'The cycle should be applied only by the HSE, not by the site team',
    ],
    correctAnswer: 1,
    explanation:
      'After an incident, the PDCA cycle drives improvement: Plan revised safety measures based on the accident investigation findings, Do (implement) those changes on site, Check their effectiveness by monitoring compliance and outcomes, and Act to refine the measures further if they are not achieving the desired results. This ensures that each incident leads to measurable safety improvements.',
    section: 'General',
    difficulty: 'intermediate',
    topic: 'Continuous improvement cycle',
    category: 'Safety & Best Practice',
  },
  {
    id: 194,
    question: 'Where should a near-miss involving a MEWP be recorded on site?',
    options: [
      'It does not need to be recorded if no one was hurt',
      'In the site accident book and reported to the supervisor or safety officer',
      "Only in the operator's personal diary",
      'On social media to warn other operators',
    ],
    correctAnswer: 1,
    explanation:
      'All near-misses must be recorded in the site accident book (or equivalent reporting system) and reported to the supervisor or safety officer. This creates a formal record that can be analysed to identify trends, repeated hazards, and areas requiring corrective action. Failure to record near-misses means missed opportunities to prevent future serious incidents.',
    section: 'General',
    difficulty: 'intermediate',
    topic: 'Near-miss reporting',
    category: 'Safety & Best Practice',
  },

  // --- advanced (6) ---

  {
    id: 195,
    question:
      "A site has experienced three near-misses involving MEWP overturns in the past month, all on different areas of soft ground after rainfall. Using Heinrich's triangle and the PDCA cycle, what approach should the site safety manager take?",
    options: [
      'Dismiss the near-misses as bad luck caused by weather and take no action',
      'Analyse the near-misses to identify the root cause, plan improvements such as ground condition assessments and ground protection measures, implement them, monitor their effectiveness, and act on any further findings',
      'Ban all MEWP use on site permanently',
      'Only investigate if an actual overturn with injury occurs',
    ],
    correctAnswer: 1,
    explanation:
      "Heinrich's triangle tells us that 300 near-misses precede 1 major injury — three overturn near-misses represent a serious warning. The PDCA cycle should be applied: Plan by analysing the root cause (inadequate ground assessment after rainfall), Do by implementing ground condition checks and protection measures, Check by monitoring compliance and ground conditions during wet weather, and Act by refining the approach based on results. Waiting for an injury would be negligent.",
    section: 'General',
    difficulty: 'advanced',
    topic: "Heinrich's triangle",
    category: 'Safety & Best Practice',
  },
  {
    id: 196,
    question:
      'A MEWP operator is ejected from the platform due to the catapult effect and suffers fatal injuries. Under RIDDOR 2013, what are the reporting obligations, and what additional investigation steps should the duty holder take?',
    options: [
      'Report the death within 15 days and conduct a brief internal review',
      'Report the death immediately to the HSE by telephone, follow up with a written report within 10 days, secure and preserve the scene, conduct a thorough investigation to establish root cause, and implement corrective actions to prevent recurrence',
      "Only report to the MEWP hire company and the operator's next of kin",
      'File a RIDDOR report online within 30 days and continue work on site',
    ],
    correctAnswer: 1,
    explanation:
      'A workplace death must be reported to the HSE immediately by the quickest practicable means (telephone), with a written report following within 10 days. The scene must be secured and preserved for HSE investigation. The duty holder must conduct a thorough investigation examining root causes — such as lack of harness use, inadequate training on catapult effect, or absence of secondary guarding — and implement corrective actions including updated risk assessments, improved training, and potentially fitting secondary guarding devices.',
    section: 'General',
    difficulty: 'advanced',
    topic: 'RIDDOR reporting',
    category: 'Safety & Best Practice',
  },
  {
    id: 197,
    question:
      'Following a series of entrapment incidents across multiple sites, the safety director asks you to develop a company-wide prevention strategy. Which combination of measures would be most effective?',
    options: [
      'Issue a memo reminding operators to be careful and leave it at that',
      'Mandate secondary guarding devices on all boom-type MEWPs, deliver targeted toolbox talks on entrapment risks, ensure trained ground rescue persons are always present, update risk assessments to include entrapment scenarios, and establish a reporting system to track entrapment near-misses',
      'Only purchase scissor lifts and ban all boom-type MEWPs from company sites',
      'Increase insurance cover to handle entrapment claims and accept the risk',
    ],
    correctAnswer: 1,
    explanation:
      "An effective company-wide entrapment prevention strategy requires multiple layers: engineering controls (secondary guarding devices), procedural controls (updated risk assessments and ground rescue persons), training (targeted toolbox talks on entrapment recognition and prevention), and monitoring (near-miss reporting to track trends). The IPAF 2024 report's 75% increase in entrapment incidents makes this a critical focus area requiring a comprehensive, multi-faceted approach rather than a single measure.",
    section: 'General',
    difficulty: 'advanced',
    topic: 'Secondary guarding devices',
    category: 'Safety & Best Practice',
  },
  {
    id: 198,
    question:
      'An accident investigation reveals that a MEWP overturn was caused by a combination of factors: the ground had not been reassessed after heavy rain, the outriggers were not fully extended, and the operator exceeded the rated capacity. Applying the principles of root cause analysis, what is the most likely underlying root cause?',
    options: [
      'The operator was careless and should be dismissed',
      'The MEWP was defective and should be scrapped',
      'A failure in the management system — inadequate supervision, lack of ongoing ground assessment procedures, and insufficient pre-use checks allowing multiple safety barriers to be breached simultaneously',
      'Bad weather that could not have been predicted',
    ],
    correctAnswer: 2,
    explanation:
      'Root cause analysis looks beyond immediate causes to find systemic failures. While three separate unsafe conditions contributed to the overturn, the underlying root cause is a management system failure: no procedure for reassessing ground conditions after weather changes, inadequate supervision to ensure outriggers were correctly deployed, and no effective pre-use check system to verify rated capacity compliance. Addressing the management system prevents all three immediate causes recurring.',
    section: 'General',
    difficulty: 'advanced',
    topic: 'Accident investigation',
    category: 'Safety & Best Practice',
  },
  {
    id: 199,
    question:
      'A site is implementing a new safety culture programme. During a toolbox talk, a worker reports that they have been pressured by their supervisor to skip pre-use inspections to save time. How should this be handled to support a positive safety culture?',
    options: [
      "Tell the worker to stop complaining and follow their supervisor's instructions",
      'Thank the worker for reporting the concern, investigate the allegation confidentially, take appropriate action against the unsafe management practice, reinforce that safety procedures are non-negotiable, and protect the worker from retaliation',
      'Ignore the report as it is hearsay with no evidence',
      'Transfer the worker to a different site to avoid conflict',
    ],
    correctAnswer: 1,
    explanation:
      "A positive safety culture requires that workers can report concerns without fear of retaliation. The report must be taken seriously: the worker should be thanked for speaking up, the allegation investigated confidentially, and if confirmed, appropriate action taken against the supervisor's unsafe practice. It must be clearly communicated that safety procedures such as pre-use inspections are non-negotiable, and whistleblower protections must be applied to the reporting worker.",
    section: 'General',
    difficulty: 'advanced',
    topic: 'Safety culture',
    category: 'Safety & Best Practice',
  },
  {
    id: 200,
    question:
      'The IPAF 2024 global safety report showed a 26% overall decrease in MEWP fatalities but a 75% increase in entrapment incidents. As a safety manager, how would you use these statistics in your lessons learnt programme to drive improvement across your organisation?',
    options: [
      'Focus only on the positive fatality decrease and ignore the entrapment increase',
      'Present both statistics in a lessons learnt briefing, analyse why entrapment is increasing despite overall fatality improvements, review all current entrapment prevention measures, implement additional controls such as secondary guarding and enhanced training, set measurable targets for entrapment reduction, and monitor progress quarterly using the PDCA cycle',
      'Dismiss the statistics as they relate to global figures and are not relevant to your sites',
      'Wait until your organisation experiences an entrapment incident before taking action',
    ],
    correctAnswer: 1,
    explanation:
      'Effective use of industry statistics in a lessons learnt programme means presenting the full picture — both improvements and emerging risks. The 26% fatality decrease shows that safety measures work, while the 75% entrapment increase identifies a growing threat requiring targeted action. A proactive safety manager would analyse the trend, review existing controls, implement additional measures (secondary guarding, enhanced training, updated risk assessments), set measurable reduction targets, and use the PDCA cycle to monitor quarterly progress. Waiting for a local incident would be a reactive and unacceptable approach.',
    section: 'General',
    difficulty: 'advanced',
    topic: 'Lessons learnt',
    category: 'Safety & Best Practice',
  },
];
