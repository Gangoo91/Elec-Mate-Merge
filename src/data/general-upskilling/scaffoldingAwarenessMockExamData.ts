/**
 * Scaffolding Awareness Mock Exam Question Bank
 * 200 questions across 5 categories, balanced difficulty.
 * Categories: Introduction to Scaffolding (40) | Scaffold Regulations & Standards (40) |
 *   Scaffold Components & Assembly (40) | Scaffold Inspection & Tagging (40) |
 *   Safe Use & Hazard Awareness (40)
 * Difficulty per 40: ~14 basic, ~18 intermediate, ~8 advanced
 */

import { StandardMockQuestion, MockExamConfig } from '@/types/standardMockExam';
import { getRandomQuestionsBalanced } from '@/utils/questionSelection';

export const scaffoldingAwarenessCategories = [
  'Introduction to Scaffolding',
  'Scaffold Regulations & Standards',
  'Scaffold Components & Assembly',
  'Scaffold Inspection & Tagging',
  'Safe Use & Hazard Awareness',
];

export const scaffoldingAwarenessMockExamConfig: MockExamConfig = {
  examId: 'scaffolding-awareness',
  examTitle: 'Scaffolding Awareness Mock Examination',
  totalQuestions: 20,
  timeLimit: 1800,
  passThreshold: 80,
  exitPath: '/study-centre/general-upskilling/scaffolding-awareness-module-6',
  categories: scaffoldingAwarenessCategories,
};

export const getRandomScaffoldingAwarenessExamQuestions = (numQuestions: number = 20) => {
  return getRandomQuestionsBalanced(
    scaffoldingAwarenessQuestionBank,
    numQuestions,
    scaffoldingAwarenessCategories
  );
};

export const scaffoldingAwarenessQuestionBank: StandardMockQuestion[] = [
  // =======================================================================
  // CATEGORY 1 — Introduction to Scaffolding — 40 questions (id 1–40)
  // =======================================================================

  // --- basic (14) ---
  {
    id: 1,
    question: 'What is the primary purpose of scaffolding on a construction site?',
    options: [
      'To provide permanent structural support to the finished building',
      'To provide a safe temporary working platform for people and materials',
      'To store building materials and tools securely at ground level',
      'To screen the building from public view during construction',
    ],
    correctAnswer: 1,
    explanation:
      'Scaffolding is a temporary structure erected to provide a safe working platform at height. It allows workers to access areas of a building that would otherwise be unreachable and supports materials needed for the task.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Purpose of scaffolding',
    category: 'Introduction to Scaffolding',
  },
  {
    id: 2,
    question:
      'Which of the following is the most common type of scaffolding used in the UK construction industry?',
    options: [
      'Suspended scaffolding',
      'Trestle scaffolding',
      'Tube and fitting scaffolding',
      'Cantilever scaffolding',
    ],
    correctAnswer: 2,
    explanation:
      'Tube and fitting (also called tube and coupler) scaffolding is the most widely used system in the UK. It consists of steel or aluminium tubes connected by a range of couplers, making it highly versatile for different building shapes.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Common scaffold types',
    category: 'Introduction to Scaffolding',
  },
  {
    id: 3,
    question: 'What does the abbreviation CISRS stand for in relation to scaffolding?',
    options: [
      'Certified Industrial Scaffold Regulation Scheme',
      'Construction Industry Safety and Regulation Standards',
      'Central Institute of Scaffold Regulation and Safety',
      'Construction Industry Scaffolders Record Scheme',
    ],
    correctAnswer: 3,
    explanation:
      'CISRS stands for the Construction Industry Scaffolders Record Scheme. It is the recognised industry card scheme for scaffolders in the UK, ensuring operatives are trained and competent to carry out scaffolding work safely.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'CISRS',
    category: 'Introduction to Scaffolding',
  },
  {
    id: 4,
    question: "What is an 'independent scaffold'?",
    options: [
      'A freestanding scaffold with two rows of standards that does not rely on the building for support',
      'A scaffold with a single row of standards that relies on the building for support',
      'A scaffold suspended from the roof by ropes for facade maintenance work',
      'A scaffold mounted on wheels that can be moved between work positions',
    ],
    correctAnswer: 0,
    explanation:
      'An independent scaffold has two rows of standards (uprights) — an inner and outer row — connected by transoms and ledgers. It is structurally self-supporting, although it must still be tied to the building to prevent movement.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Independent scaffold',
    category: 'Introduction to Scaffolding',
  },
  {
    id: 5,
    question: "What is a 'putlog scaffold'?",
    options: [
      'A scaffold with two rows of standards that is fully independent of the building',
      'A scaffold with a single row of standards, with putlogs built into the brickwork',
      'A scaffold whose platform projects beyond its ground supports as a cantilever',
      'A scaffold ballasted with concrete blocks so it needs no ties to the building',
    ],
    correctAnswer: 1,
    explanation:
      'A putlog scaffold has one row of standards set away from the building face, with horizontal putlogs that have flattened ends (blades) built into the bed joints of the brickwork. It relies partly on the building for support.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Putlog scaffold',
    category: 'Introduction to Scaffolding',
  },
  {
    id: 6,
    question:
      'Who is typically responsible for erecting and dismantling scaffolding on a construction site?',
    options: [
      'Electrical or plumbing operatives as part of their duties',
      'Any construction worker with a hard hat',
      'Trained and competent scaffolders holding a CISRS card',
      'The site manager personally',
    ],
    correctAnswer: 2,
    explanation:
      'Scaffolding must only be erected, altered, or dismantled by competent persons who hold the appropriate CISRS card. This ensures workers have the skills and knowledge to carry out the work safely.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Competent persons',
    category: 'Introduction to Scaffolding',
  },
  {
    id: 7,
    question: "What is a 'standard' in scaffolding terminology?",
    options: [
      'A diagonal brace connecting two adjacent bays',
      'A horizontal tube running along the length of the scaffold',
      'A platform board placed across transoms',
      'A vertical tube that transfers the load to the ground',
    ],
    correctAnswer: 3,
    explanation:
      'A standard is the vertical upright tube in a scaffold structure. Standards carry the weight of the scaffold and its loads down to the ground through base plates and sole boards.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Scaffold terminology',
    category: 'Introduction to Scaffolding',
  },
  {
    id: 8,
    question: "What is a 'ledger' in scaffolding?",
    options: [
      'A horizontal tube fixed to the standards running parallel to the building face',
      'A vertical upright tube that carries the scaffold load down to the ground',
      'A horizontal tube placed at right angles to support the platform boards',
      'A diagonal tube fixed across the face to stop the scaffold racking sideways',
    ],
    correctAnswer: 0,
    explanation:
      'A ledger is a horizontal tube that runs lengthways along the scaffold, fixed to the standards with right-angle couplers. Ledgers connect the standards together and support the transoms on which boards are placed.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Scaffold terminology',
    category: 'Introduction to Scaffolding',
  },
  {
    id: 9,
    question: "What is a 'transom' in scaffolding?",
    options: [
      'A vertical upright tube that transfers the scaffold load to the base plate',
      'A tube that spans between the inner and outer ledgers, supporting the platform boards',
      'A horizontal tube running lengthways and fixed directly to the standards',
      'A diagonal tube fixed across the scaffold face to provide lateral stability',
    ],
    correctAnswer: 1,
    explanation:
      'A transom is a horizontal tube placed at right angles to the ledgers, spanning between the inner and outer rows of standards. Transoms support the scaffold boards that form the working platform.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Scaffold terminology',
    category: 'Introduction to Scaffolding',
  },
  {
    id: 10,
    question: "What is a 'bay' in scaffolding terminology?",
    options: [
      'An area designated for material storage at ground level',
      'A gap left in the platform for ladder access',
      'The space between two adjacent standards along the length of the scaffold',
      'The overall height of the scaffold structure',
    ],
    correctAnswer: 2,
    explanation:
      'A bay is the horizontal distance between two adjacent standards along the length of the scaffold. Bay lengths are specified in scaffold design and typically range from 1.8 m to 2.7 m depending on the duty of the scaffold.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Scaffold terminology',
    category: 'Introduction to Scaffolding',
  },
  {
    id: 11,
    question: "What is a 'lift' in scaffolding terminology?",
    options: [
      'The horizontal distance between two adjacent standards along the scaffold',
      'A powered hoist used to raise materials to the working platform',
      'The clear width of the boarded working platform between the guard rails',
      'The vertical distance between two consecutive ledger levels',
    ],
    correctAnswer: 3,
    explanation:
      'A lift refers to the vertical distance between two consecutive ledger heights on a scaffold. The first lift is from the ground to the first set of ledgers, and subsequent lifts continue upwards.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Scaffold terminology',
    category: 'Introduction to Scaffolding',
  },
  {
    id: 12,
    question: "What is 'system scaffolding'?",
    options: [
      'A proprietary scaffolding system with prefabricated components that slot or lock together',
      'Scaffolding that uses an electronic monitoring system',
      'Scaffolding designed using computer software only',
      'Scaffolding erected according to a systematic method statement',
    ],
    correctAnswer: 0,
    explanation:
      'System scaffolding (also called modular scaffolding) uses proprietary components with built-in connection points such as rosettes, cups, or wedges. Examples include Layher Allround, HAKI, and Cuplok systems.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'System scaffolding',
    category: 'Introduction to Scaffolding',
  },
  {
    id: 13,
    question: "What is 'birdcage scaffolding' primarily used for?",
    options: [
      'Providing access to the external facade of a tall building',
      'Providing a wide platform for work on ceilings or soffits inside buildings',
      'Supporting a building that is in danger of collapse during alterations',
      'Receiving and storing heavy materials delivered to height by crane',
    ],
    correctAnswer: 1,
    explanation:
      'Birdcage scaffolding is an internal scaffold with rows of standards in both directions, creating a large raised platform. It is commonly used for ceiling work, painting, or installing services in large open areas like atriums or halls.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Birdcage scaffolding',
    category: 'Introduction to Scaffolding',
  },
  {
    id: 14,
    question: "What is a 'scaffold tower' (also known as a mobile access tower)?",
    options: [
      'A scaffold suspended from outriggers at roof level by ropes or wire cables',
      'A scaffold with a single row of standards tied into the brickwork by putlogs',
      'A freestanding, moveable scaffold on wheels or castors used for short-duration tasks',
      'A scaffold whose platform cantilevers out beyond its ground supports',
    ],
    correctAnswer: 2,
    explanation:
      'A scaffold tower (mobile access tower) is a lightweight, freestanding structure on wheels or castors. Towers are governed by PASMA guidance and must only be moved when unoccupied, with castors locked before use.',
    section: 'Module 1',
    difficulty: 'basic',
    topic: 'Scaffold towers',
    category: 'Introduction to Scaffolding',
  },

  // --- intermediate (18) ---
  {
    id: 15,
    question:
      "What is the role of a 'scaffolding supervisor' (CISRS Advanced Scaffolder or Scaffold Supervisor card holder)?",
    options: [
      'To carry out all scaffold erections personally without assistance',
      'To manufacture scaffold components in a factory setting',
      'To inspect scaffolds on behalf of the Health and Safety Executive',
      'To oversee scaffold operations, ensure compliance with the design, and manage the scaffolding team',
    ],
    correctAnswer: 3,
    explanation:
      'A scaffolding supervisor manages the day-to-day scaffold operations on site, ensures the scaffold is erected to the correct design, supervises the scaffolding team, and ensures safe working practices are followed.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Scaffolding roles',
    category: 'Introduction to Scaffolding',
  },
  {
    id: 16,
    question: "What is a 'scaffold design' and when is it required?",
    options: [
      'A structural calculation and drawing prepared by a competent person; required when the scaffold is non-standard or complex',
      'A material take-off listing the tubes, boards and fittings needed; required for every scaffold',
      'A handover certificate signed by the site manager; required once the scaffold is complete',
      'A verbal agreement between the scaffolder and the client; required only for tower scaffolds',
    ],
    correctAnswer: 0,
    explanation:
      "A scaffold design includes structural calculations and drawings prepared by a competent engineer. It is required whenever the scaffold falls outside standard configurations covered by guidance like TG20 or the manufacturer's instructions.",
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Scaffold design requirements',
    category: 'Introduction to Scaffolding',
  },
  {
    id: 17,
    question: "What does the term 'duty' refer to when classifying a scaffold?",
    options: [
      'The number of working lifts that the scaffold has been boarded out to',
      'The maximum load the scaffold platform is designed to carry, classified by intended use',
      'The frequency at which the scaffold must be inspected by a competent person',
      'The grade of steel from which the scaffold tubes have been manufactured',
    ],
    correctAnswer: 1,
    explanation:
      'Scaffold duty refers to the load-bearing classification of the working platform. UK standards define duties such as Inspection (0.75 kN/m²), Light (1.5 kN/m²), General Purpose (2.0 kN/m²), and Heavy Duty (2.5 kN/m²).',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Scaffold duty classification',
    category: 'Introduction to Scaffolding',
  },
  {
    id: 18,
    question:
      "What is the maximum uniformly distributed load for a 'General Purpose' duty scaffold platform?",
    options: [
      '0.75 kN/m²',
      '2.50 kN/m²',
      '2.00 kN/m²',
      '1.50 kN/m²',
    ],
    correctAnswer: 2,
    explanation:
      'A General Purpose scaffold has a maximum uniformly distributed load of 2.0 kN/m². This duty is suitable for general construction work including bricklaying and plastering with materials on the platform.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Scaffold duty loads',
    category: 'Introduction to Scaffolding',
  },
  {
    id: 19,
    question: "What is a 'cantilever scaffold'?",
    options: [
      'A scaffold suspended from the roof by ropes for facade maintenance work',
      'A scaffold with two independent rows of standards tied back to the building',
      'A scaffold mounted on castors that can be wheeled between work positions',
      'A scaffold where the platform projects beyond the supporting structure without external bracing to the ground',
    ],
    correctAnswer: 3,
    explanation:
      'A cantilever scaffold has a working platform that extends outward beyond its supports, without vertical supports reaching the ground at the outer edge. It is often used where ground conditions prevent standard support or over obstructions.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Cantilever scaffold',
    category: 'Introduction to Scaffolding',
  },
  {
    id: 20,
    question: "What is 'suspended scaffolding' and where is it typically used?",
    options: [
      'A scaffold platform hung from the roof or an outrigger structure, commonly used on high-rise buildings for facade work',
      'A scaffold built up from the ground in two rows, used for new-build brickwork',
      'An internal scaffold with standards in both directions, used for ceiling work',
      'A freestanding scaffold on castors, used for short-duration internal tasks',
    ],
    correctAnswer: 0,
    explanation:
      'Suspended scaffolding consists of working platforms hung by ropes or chains from outriggers at roof level. It is widely used for window cleaning, cladding, and maintenance on tall buildings where access from the ground is impractical.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Suspended scaffolding',
    category: 'Introduction to Scaffolding',
  },
  {
    id: 21,
    question: "What is a 'loading bay' in scaffolding?",
    options: [
      'A storage compound set out at ground level beside the scaffold',
      'A reinforced section of scaffold designed for receiving materials from a crane or hoist',
      'A short raised platform within a bay reached using a hop-up bracket',
      'A boarded internal lift used solely for storing scaffold boards',
    ],
    correctAnswer: 1,
    explanation:
      'A loading bay is a specially strengthened section of the scaffold with additional supports and a gate. It allows materials to be loaded onto the scaffold safely from a crane or hoist without overloading the normal platform.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Loading bays',
    category: 'Introduction to Scaffolding',
  },
  {
    id: 22,
    question: "What is a 'gin wheel' used for on scaffolding?",
    options: [
      'Levelling the scaffold base plates on sloping or uneven ground',
      'Tensioning the scaffold ties against the face of the building',
      'Hoisting lightweight materials and components to working platforms using a rope',
      'Locking the castors of a mobile tower before it is used',
    ],
    correctAnswer: 2,
    explanation:
      'A gin wheel is a simple pulley fixed to the top of a scaffold to hoist small materials and tools using a rope. It must be securely attached to the scaffold, and the load capacity must not be exceeded.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Gin wheels',
    category: 'Introduction to Scaffolding',
  },
  {
    id: 23,
    question: "In scaffolding, what does 'TG20' refer to?",
    options: [
      'Safety Guidance Note 20, covering manual handling in the scaffolding industry',
      'The British Standard specifying the dimensions of steel scaffold tubes',
      'A code of practice for temporary works procedures, including formwork and falsework',
      'Technical Guidance Note 20, a comprehensive guide to good practice for tube and fitting scaffolding',
    ],
    correctAnswer: 3,
    explanation:
      'TG20 is a NASC Technical Guidance document that provides operational guidance for tube and fitting scaffolding. TG20:13 includes compliance sheets that can eliminate the need for a bespoke design for many standard scaffolds.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'TG20',
    category: 'Introduction to Scaffolding',
  },
  {
    id: 24,
    question: 'What is the NASC?',
    options: [
      'National Access and Scaffolding Confederation',
      'National Association of Steel Constructors',
      'Northern Alliance of Safety Coordinators',
      'National Assembly for Site Compliance',
    ],
    correctAnswer: 0,
    explanation:
      'The NASC (National Access and Scaffolding Confederation) is the UK trade body for the scaffolding industry. It publishes safety guidance including TG20 and SG series documents, and promotes best practice standards.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'NASC',
    category: 'Introduction to Scaffolding',
  },
  {
    id: 25,
    question: "What is the difference between a 'scaffolder' and a 'scaffold labourer'?",
    options: [
      'A scaffolder works at height while a scaffold labourer is only permitted to work at ground level on the same lift',
      'A scaffolder is CISRS-trained and can erect/dismantle scaffolding; a scaffold labourer assists by passing materials but does not erect components',
      'A scaffolder is employed directly by the contractor while a scaffold labourer is always supplied through an agency',
      'A scaffolder erects tube and fitting scaffolds while a scaffold labourer erects only system scaffolds',
    ],
    correctAnswer: 1,
    explanation:
      'A scaffolder holds a CISRS Scaffolder card and is competent to erect, alter, and dismantle scaffolding. A scaffold labourer (CISRS Labourer card) supports the scaffolder by handling and passing materials but is not qualified to erect scaffold.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Scaffolding roles',
    category: 'Introduction to Scaffolding',
  },
  {
    id: 26,
    question: "What is a 'reveal tie' used for in scaffolding?",
    options: [
      'Joining two scaffold tubes end to end to extend a standard or ledger',
      'Supporting a putlog across an opening where it has no bearing point',
      'Securing the scaffold to a building by wedging a tube into a window or door reveal',
      'Bracing the scaffold diagonally across its face to prevent racking',
    ],
    correctAnswer: 2,
    explanation:
      'A reveal tie uses an adjustable tube fitted into a window or door opening (reveal) to anchor the scaffold to the building. It must be used with a tie tube and is less reliable than through-ties, so its use is limited in TG20 guidance.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Reveal ties',
    category: 'Introduction to Scaffolding',
  },
  {
    id: 27,
    question: "What is a 'through-tie' in scaffolding?",
    options: [
      'A tie that wedges an adjustable tube across a window or door reveal',
      'A tie formed from tubes and couplers wrapped around an internal column',
      'A tie drilled and anchored directly into the masonry of the building',
      'A tie that passes through the building (e.g., through a window opening) and is anchored on the inside',
    ],
    correctAnswer: 3,
    explanation:
      'A through-tie passes through an opening in the building and is secured internally with a tie plate or similar fitting. Through-ties are considered the most reliable type of scaffold tie and are preferred over reveal ties.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Through-ties',
    category: 'Introduction to Scaffolding',
  },
  {
    id: 28,
    question: "Why is scaffolding sometimes referred to as 'falsework'?",
    options: [
      'It is not — falsework is a separate term referring to temporary structures that support permanent works during construction, such as concrete formwork',
      'Because both scaffolding and falsework are erected only by CISRS-carded scaffolders',
      'Because falsework is simply the American term for what UK sites call scaffolding',
      'Because any scaffold that supports a working platform is classed as falsework',
    ],
    correctAnswer: 0,
    explanation:
      'Falsework and scaffolding are different. Falsework refers to temporary structures used to support permanent structures (like concrete slabs) during construction. Scaffolding provides access for workers. The two terms should not be used interchangeably.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Falsework vs scaffolding',
    category: 'Introduction to Scaffolding',
  },
  {
    id: 29,
    question: "What is a 'hop-up bracket' in scaffolding?",
    options: [
      'A spring-loaded bracket that allows the scaffold to absorb impact',
      'A bracket used to create an additional raised platform within a scaffold bay, typically one board width',
      'A bracket used to attach a hopping frog-guard to scaffold tubes',
      'A bracket that allows the scaffold to be raised in one operation',
    ],
    correctAnswer: 1,
    explanation:
      'A hop-up bracket is fitted to standards or ledgers within a scaffold bay to support a short raised platform (usually one or two boards wide). This allows workers to reach slightly higher areas without adding a full extra lift.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Hop-up brackets',
    category: 'Introduction to Scaffolding',
  },
  {
    id: 30,
    question: "What is a 'bridle' in scaffolding?",
    options: [
      'An inclined tube running from the scaffold to the ground for extra stability',
      'A counterweight placed on the base to stop a freestanding scaffold overturning',
      'A horizontal tube spanning across an opening (such as a doorway or window) in a putlog scaffold',
      'A short raised platform within a bay supported on hop-up brackets',
    ],
    correctAnswer: 2,
    explanation:
      'A bridle is a horizontal tube fixed across an opening in the building face where a putlog cannot be inserted (e.g., over a window). It spans from standard to standard and supports the putlog that would otherwise have no bearing point.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Bridles',
    category: 'Introduction to Scaffolding',
  },
  {
    id: 31,
    question: "What is a 'boarded lift'?",
    options: [
      'A scaffold bay that has been marked with a board sign',
      'A powered mechanical platform that lifts boards',
      'A lift of the scaffold used exclusively for storing boards',
      'A scaffold lift where the platform has been fully decked with boards',
    ],
    correctAnswer: 3,
    explanation:
      'A boarded lift is any lift level on a scaffold where the platform has been fully decked with scaffold boards to create a working platform. Not every lift is boarded; only those required for access or working are typically decked out.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Boarded lifts',
    category: 'Introduction to Scaffolding',
  },
  {
    id: 32,
    question: "What is the role of a 'scaffold coordinator' on a large construction project?",
    options: [
      'To plan, manage, and coordinate all scaffold requirements across the project, liaising with contractors and designers',
      'To physically erect and dismantle every scaffold on the project without delegating to a team',
      'To carry out the statutory 7-day inspections in place of the appointed competent person',
      'To approve scaffold designs on behalf of the structural engineer who prepared them',
    ],
    correctAnswer: 0,
    explanation:
      'A scaffold coordinator plans scaffold requirements for the project, coordinates between trades needing access, arranges inspections, ensures designs are available, and manages scaffold modifications and handovers throughout the build programme.',
    section: 'Module 1',
    difficulty: 'intermediate',
    topic: 'Scaffold coordination',
    category: 'Introduction to Scaffolding',
  },

  // --- advanced (8) ---
  {
    id: 33,
    question:
      "When calculating the 'in-service' wind load on a clad scaffold, which factor most significantly increases the wind force compared to an open scaffold?",
    options: [
      'The number of working lifts that have been fully boarded out',
      'The solidity ratio (the proportion of the scaffold face that is enclosed by sheeting or netting)',
      'The grade of steel used to manufacture the scaffold tubes',
      'The torque applied to the load-bearing right-angle couplers',
    ],
    correctAnswer: 1,
    explanation:
      'The solidity ratio determines how much wind force the scaffold face catches. Fully sheeted scaffolds have a solidity ratio of 1.0, massively increasing wind load. Debris netting has a lower ratio (typically 0.5) but still significantly increases loading compared to an open scaffold.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'Wind loading',
    category: 'Introduction to Scaffolding',
  },
  {
    id: 34,
    question: "What is a 'Kentledge' in scaffold terminology?",
    options: [
      'A lightweight aluminium tube used only for guard rails and toe boards',
      'An adjustable base jack used to level the scaffold on sloping ground',
      'A counterweight (typically concrete blocks) used to provide stability to a freestanding scaffold',
      'A proprietary clip that secures scaffold boards against wind uplift',
    ],
    correctAnswer: 2,
    explanation:
      'Kentledge refers to ballast or counterweight blocks placed on the base of a freestanding scaffold to resist overturning. It is commonly used where the scaffold cannot be tied to a structure, and the weight must be calculated by a competent designer.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'Kentledge',
    category: 'Introduction to Scaffolding',
  },
  {
    id: 35,
    question:
      'In the CISRS training pathway, what is the minimum period of on-site experience required between completing a Part 1 scaffolder course and attending the Part 2 course?',
    options: [
      '3 months',
      '24 months',
      '12 months',
      '6 months',
    ],
    correctAnswer: 3,
    explanation:
      "CISRS requires a minimum of 6 months' recorded on-site scaffolding experience between Part 1 and Part 2 courses. This ensures trainees gain sufficient practical exposure under supervision before progressing to the next training stage.",
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'CISRS training pathway',
    category: 'Introduction to Scaffolding',
  },
  {
    id: 36,
    question: "What is a 'raker' in scaffolding and when might one be required?",
    options: [
      'An inclined tube from the scaffold to the ground providing additional stability, used when ties to the building are not possible',
      'A horizontal tube running parallel to the building face that supports the transoms',
      'A short transom added between two boards of unequal length to support the gap',
      'A vertical upright that carries the scaffold load down to the base plate',
    ],
    correctAnswer: 0,
    explanation:
      'A raker is an inclined shore tube running from the scaffold to the ground, providing lateral stability. Rakers may be needed where it is impossible to tie the scaffold to the building, such as on freestanding scaffolds or during early erection stages.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'Rakers',
    category: 'Introduction to Scaffolding',
  },
  {
    id: 37,
    question: 'What is the typical outside diameter of a standard scaffold tube used in the UK?',
    options: [
      '38.0 mm',
      '48.3 mm',
      '42.4 mm',
      '50.8 mm',
    ],
    correctAnswer: 1,
    explanation:
      'The standard scaffold tube used in the UK has an outside diameter of 48.3 mm and a wall thickness of 3.2 mm (Type 4) or 4.0 mm (Type 3). This is specified in BS EN 39 and is universal across tube and fitting scaffolding.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'Scaffold tube specification',
    category: 'Introduction to Scaffolding',
  },
  {
    id: 38,
    question: "In a 'shoring scaffold', what is the primary function of the structure?",
    options: [
      'To provide a wide internal working platform for ceiling and soffit work',
      'To form a covered walkway protecting pedestrians from falling objects',
      'To temporarily support a building or structure that is in danger of collapse or during structural alterations',
      'To receive and store materials delivered to the scaffold by crane or hoist',
    ],
    correctAnswer: 2,
    explanation:
      'Shoring scaffolding (or shoring) is designed to provide temporary structural support to a building. It may be used during demolition, underpinning, or when a structure is unstable. It requires careful structural design as it supports permanent loads.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'Shoring scaffold',
    category: 'Introduction to Scaffolding',
  },
  {
    id: 39,
    question:
      "What is a 'TG20 compliance sheet' and how does it benefit the scaffolding contractor?",
    options: [
      'A handover certificate confirming the scaffold is complete and safe to use',
      'A statutory inspection report that must be completed every 7 days',
      'A material delivery note listing every tube, board and coupler used on the scaffold',
      'A pre-calculated design output sheet from the TG20 e-guide software that, for standard configurations, removes the need for a bespoke scaffold design',
    ],
    correctAnswer: 3,
    explanation:
      'A TG20 compliance sheet is generated from the TG20:13 e-guide software. When the scaffold configuration falls within TG20 parameters, the compliance sheet acts as the design, saving the cost and time of commissioning a bespoke design from a structural engineer.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'TG20 compliance sheets',
    category: 'Introduction to Scaffolding',
  },
  {
    id: 40,
    question:
      "What are 'spigot joints' and why must they be positioned correctly in a scaffold structure?",
    options: [
      'Internal fitting joints used to connect scaffold tubes end to end, which must be positioned close to a node point to maintain structural integrity',
      'Couplers that join two tubes at 90 degrees and carry the main scaffold loads',
      'Adjustable feet placed under the standards to level the scaffold on a slope',
      'Diagonal tubes fixed across the scaffold face to prevent it racking sideways',
    ],
    correctAnswer: 0,
    explanation:
      'Spigot joints use an internal sleeve or spigot pin to join two tubes end to end. They must be positioned within 300 mm of a node point (where a ledger or transom connects) to avoid introducing a weak point that could lead to structural failure.',
    section: 'Module 1',
    difficulty: 'advanced',
    topic: 'Spigot joints',
    category: 'Introduction to Scaffolding',
  },

  // =======================================================================
  // CATEGORY 2 — Scaffold Regulations & Standards — 40 questions (id 41–80)
  // =======================================================================

  // --- basic (14) ---
  {
    id: 41,
    question:
      'Which UK regulation specifically covers the requirements for working at height, including the use of scaffolding?',
    options: [
      'Control of Substances Hazardous to Health Regulations 2002',
      'Work at Height Regulations 2005',
      'Electricity at Work Regulations 1989',
      'Manual Handling Operations Regulations 1992',
    ],
    correctAnswer: 1,
    explanation:
      'The Work at Height Regulations 2005 apply to all work at height where there is a risk of a fall liable to cause personal injury. They set out requirements for planning, organising, and using equipment including scaffolding.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Work at Height Regulations',
    category: 'Scaffold Regulations & Standards',
  },
  {
    id: 42,
    question:
      'Under the Work at Height Regulations 2005, what should be the first consideration when planning work at height?',
    options: [
      'Selecting the cheapest access equipment',
      'Checking that insurance is in place',
      'Avoiding work at height altogether where reasonably practicable',
      'Ensuring all workers have hard hats',
    ],
    correctAnswer: 2,
    explanation:
      'The hierarchy in the Work at Height Regulations 2005 requires that work at height is avoided where reasonably practicable. If it cannot be avoided, suitable equipment must be used to prevent falls, and then to mitigate the consequences of a fall.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'WAH hierarchy',
    category: 'Scaffold Regulations & Standards',
  },
  {
    id: 43,
    question:
      'Which set of regulations places duties on clients, designers, and contractors to manage health and safety in construction projects?',
    options: [
      'PUWER 1998',
      'LOLER 1998',
      'COSHH 2002',
      'CDM 2015',
    ],
    correctAnswer: 3,
    explanation:
      'The Construction (Design and Management) Regulations 2015 (CDM 2015) place duties on all parties in a construction project. They require proper planning, management, and coordination of health and safety, including scaffolding operations.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'CDM 2015',
    category: 'Scaffold Regulations & Standards',
  },
  {
    id: 44,
    question: 'What does PUWER stand for?',
    options: [
      'Provision and Use of Work Equipment Regulations',
      'Planning and Utilisation of Workplace Equipment Rules',
      'Personal Use of Work Equipment Regulations',
      'Protection of Users of Work Equipment Regulations',
    ],
    correctAnswer: 0,
    explanation:
      'PUWER stands for the Provision and Use of Work Equipment Regulations 1998. These regulations require that work equipment, including scaffolding, is suitable for its intended use, properly maintained, and used by trained persons.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'PUWER',
    category: 'Scaffold Regulations & Standards',
  },
  {
    id: 45,
    question:
      'Which European standard specifies the performance requirements for temporary works equipment including scaffolding?',
    options: [
      'BS 7671',
      'BS EN 12811',
      'BS 5975',
      'BS EN 60079',
    ],
    correctAnswer: 1,
    explanation:
      'BS EN 12811 is the European standard covering temporary works equipment. Part 1 covers scaffolds with performance requirements and general design, Part 2 covers information on materials, and Part 3 covers load testing.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'BS EN 12811',
    category: 'Scaffold Regulations & Standards',
  },
  {
    id: 46,
    question:
      'Under UK law, who has the primary duty to ensure the health and safety of workers on a construction site?',
    options: [
      'The local council',
      'The scaffold inspector',
      'The employer',
      'The scaffold manufacturer',
    ],
    correctAnswer: 2,
    explanation:
      'Under the Health and Safety at Work etc. Act 1974, the employer has the primary duty to ensure, so far as is reasonably practicable, the health, safety and welfare of their employees. This includes providing safe access via scaffolding.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Employer duties',
    category: 'Scaffold Regulations & Standards',
  },
  {
    id: 47,
    question: 'What is the minimum age at which a person can work on scaffolding in the UK?',
    options: [
      '14 years old',
      '16 years old',
      '21 years old',
      '18 years old',
    ],
    correctAnswer: 3,
    explanation:
      'Persons under 18 are generally prohibited from carrying out scaffolding work or working at height on scaffolding unless under direct supervision as part of an approved training programme. The industry standard requires workers to be at least 18.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Age restrictions',
    category: 'Scaffold Regulations & Standards',
  },
  {
    id: 48,
    question: "What is a 'method statement' in relation to scaffolding work?",
    options: [
      'A document describing how the scaffolding work will be carried out safely, step by step',
      'A financial statement showing the cost of scaffold hire',
      'A statement from the scaffold manufacturer about product quality',
      'A verbal instruction given by the site manager at the morning briefing',
    ],
    correctAnswer: 0,
    explanation:
      'A method statement (also called a safe system of work) is a written document detailing the sequence of operations, hazards, controls, and responsibilities for carrying out scaffolding work safely. It forms part of the risk assessment process.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Method statements',
    category: 'Scaffold Regulations & Standards',
  },
  {
    id: 49,
    question: "What is a 'risk assessment' in the context of scaffold operations?",
    options: [
      'A drawing and calculation prepared by an engineer to prove the scaffold design',
      'A systematic process of identifying hazards, evaluating risks, and determining control measures for scaffold work',
      'A statutory inspection of the scaffold carried out at intervals of no more than 7 days',
      'A certificate confirming the scaffold is complete and handed over for use',
    ],
    correctAnswer: 1,
    explanation:
      'A risk assessment identifies the hazards associated with scaffolding work, evaluates who could be harmed and how, and determines the control measures needed to reduce risk to an acceptable level. It is a legal requirement under the Management of Health and Safety at Work Regulations 1999.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Risk assessment',
    category: 'Scaffold Regulations & Standards',
  },
  {
    id: 50,
    question:
      'How often must a scaffold be inspected under the Work at Height Regulations 2005 as a minimum?',
    options: [
      'At least once a month, and whenever a new trade starts using it',
      'At least every 14 days, and after the scaffold has been sheeted',
      'At least every 7 days, and after any event likely to have affected its stability',
      'Only once, immediately before the scaffold is first handed over for use',
    ],
    correctAnswer: 2,
    explanation:
      'The Work at Height Regulations 2005 require scaffolds to be inspected before first use, at intervals not exceeding 7 days, and after any event that could affect stability (such as high winds or impact). Inspection results must be recorded.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Inspection frequency',
    category: 'Scaffold Regulations & Standards',
  },
  {
    id: 51,
    question:
      'Who is legally permitted to inspect a scaffold under the Work at Height Regulations 2005?',
    options: [
      'Any operative who holds a valid construction site induction card',
      'The site manager, regardless of their scaffolding training or experience',
      'An HSE inspector, who must attend the site for every statutory inspection',
      'A competent person with adequate training and experience in scaffold inspection',
    ],
    correctAnswer: 3,
    explanation:
      'The regulations require that scaffold inspections are carried out by a competent person. Competence means the person has sufficient training, experience, and knowledge to identify defects and unsafe conditions in scaffolding.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Competent inspector',
    category: 'Scaffold Regulations & Standards',
  },
  {
    id: 52,
    question: 'For how long must scaffold inspection records be kept on site?',
    options: [
      'For at least 3 months after the inspection',
      'For at least 7 days after the inspection',
      'For at least 2 years after the inspection',
      'For at least 5 years after the inspection',
    ],
    correctAnswer: 0,
    explanation:
      'Under the Work at Height Regulations 2005, scaffold inspection reports must be kept on site until the scaffold is dismantled and then retained for a further 3 months. The records must be available for inspection by the enforcing authority.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'Record keeping',
    category: 'Scaffold Regulations & Standards',
  },
  {
    id: 53,
    question: 'What does the acronym LOLER stand for?',
    options: [
      'Loading and Offloading Logistics and Equipment Regulations',
      'Lifting Operations and Lifting Equipment Regulations',
      'Local Oversight of Lifting and Elevation Rules',
      'Legal Obligations for Ladder and Equipment Regulations',
    ],
    correctAnswer: 1,
    explanation:
      'LOLER stands for the Lifting Operations and Lifting Equipment Regulations 1998. These apply to scaffolding when hoists, gin wheels, or other lifting equipment are used on or with the scaffold structure.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'LOLER',
    category: 'Scaffold Regulations & Standards',
  },
  {
    id: 54,
    question:
      'Which body is responsible for enforcing health and safety legislation on construction sites in the UK?',
    options: [
      'The National Access and Scaffolding Confederation (NASC)',
      'The Construction Industry Scaffolders Record Scheme (CISRS)',
      'Health and Safety Executive (HSE)',
      'The local authority building control department',
    ],
    correctAnswer: 2,
    explanation:
      'The Health and Safety Executive (HSE) is the primary enforcing authority for health and safety on construction sites in Great Britain. HSE inspectors can enter sites, issue improvement and prohibition notices, and prosecute for breaches.',
    section: 'Module 2',
    difficulty: 'basic',
    topic: 'HSE enforcement',
    category: 'Scaffold Regulations & Standards',
  },

  // --- intermediate (18) ---
  {
    id: 55,
    question:
      'Under CDM 2015, which duty holder is responsible for ensuring that the design of a scaffold does not create foreseeable risks to those who will erect, use, or dismantle it?',
    options: [
      'The client',
      'The principal contractor',
      'The scaffold labourer',
      'The designer',
    ],
    correctAnswer: 3,
    explanation:
      'Under CDM 2015, designers (including scaffold designers) must eliminate or reduce foreseeable risks in their designs. This includes considering how the scaffold will be erected, used, maintained, and dismantled safely.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'CDM designer duties',
    category: 'Scaffold Regulations & Standards',
  },
  {
    id: 56,
    question: "Under CDM 2015, what is the role of the 'principal designer'?",
    options: [
      'To plan, manage, monitor, and coordinate health and safety in the pre-construction phase',
      'To manage health and safety during the construction phase on site',
      'To allocate sufficient time and resources for the project to be built safely',
      'To carry out the statutory 7-day inspections of every scaffold on site',
    ],
    correctAnswer: 0,
    explanation:
      'The principal designer under CDM 2015 is responsible for planning, managing, and coordinating health and safety during the pre-construction phase. They ensure that designers fulfil their duties and that health and safety information is included in the pre-construction information pack.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Principal designer role',
    category: 'Scaffold Regulations & Standards',
  },
  {
    id: 57,
    question:
      "What is the key difference between an HSE 'Improvement Notice' and a 'Prohibition Notice'?",
    options: [
      'An Improvement Notice stops work immediately; a Prohibition Notice gives time to make improvements',
      'An Improvement Notice gives a set time to make improvements; a Prohibition Notice stops the activity immediately until the risk is addressed',
      'An Improvement Notice can only be issued by a court; a Prohibition Notice is issued by the HSE',
      'An Improvement Notice applies to scaffolds; a Prohibition Notice applies only to lifting equipment',
    ],
    correctAnswer: 1,
    explanation:
      'An Improvement Notice gives the duty holder a specified period to remedy a contravention. A Prohibition Notice takes immediate effect (or deferred effect) and stops the dangerous activity until the risk is adequately controlled.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Enforcement notices',
    category: 'Scaffold Regulations & Standards',
  },
  {
    id: 58,
    question:
      'According to BS EN 12811-1, what is the minimum clear width for a working platform on a scaffold?',
    options: [
      '400 mm',
      '800 mm',
      '600 mm',
      '1000 mm',
    ],
    correctAnswer: 2,
    explanation:
      'BS EN 12811-1 specifies a minimum clear width of 600 mm (W06 class) for a scaffold working platform. However, most construction scaffolds in the UK use a minimum of 4 boards wide (approximately 870 mm) for general purpose work.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Minimum platform width',
    category: 'Scaffold Regulations & Standards',
  },
  {
    id: 59,
    question: 'What does BS 5975 cover?',
    options: [
      'The dimensions and material grade of steel scaffold tubes',
      'The performance requirements for scaffold couplers and base plates',
      'The minimum content required in a statutory scaffold inspection report',
      'Code of practice for temporary works procedures, including formwork and scaffolding',
    ],
    correctAnswer: 3,
    explanation:
      'BS 5975 is the code of practice for temporary works procedures. It covers the management and design of temporary works including scaffolding, formwork, falsework, and other temporary structures used in construction.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'BS 5975',
    category: 'Scaffold Regulations & Standards',
  },
  {
    id: 60,
    question: "What does the Work at Height Regulations 2005 define as 'work at height'?",
    options: [
      'Any work where a person could fall a distance liable to cause personal injury, regardless of height',
      'Any work carried out more than 2 metres above ground or floor level',
      'Any work carried out above the height of the worker’s own shoulders',
      'Any work on a scaffold, ladder, or mobile tower irrespective of the fall distance',
    ],
    correctAnswer: 0,
    explanation:
      'The regulations define work at height as any place where a person could fall a distance liable to cause personal injury. There is no minimum height threshold — even working from a stepladder or at ground level near an open edge is covered.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Definition of work at height',
    category: 'Scaffold Regulations & Standards',
  },
  {
    id: 61,
    question:
      'Under the Work at Height Regulations 2005, what hierarchy must be followed when selecting equipment for work at height?',
    options: [
      'Use personal protection measures (e.g., harnesses) before collective protection (e.g., guard rails)',
      'Use collective protection measures (e.g., guard rails) before personal protection (e.g., harnesses)',
      'Select whichever protection measure is cheapest and quickest to install',
      'Use harnesses for erection and guard rails only once the scaffold is complete',
    ],
    correctAnswer: 1,
    explanation:
      'The regulations require that collective protection measures such as guard rails and working platforms take priority over personal protection measures like harnesses. Collective measures protect everyone in the area, while personal measures only protect the individual.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Equipment hierarchy',
    category: 'Scaffold Regulations & Standards',
  },
  {
    id: 62,
    question: 'What standard covers the requirements for scaffold tubes in the UK?',
    options: [
      'BS EN 74',
      'BS EN 12810',
      'BS EN 39',
      'BS EN 1004',
    ],
    correctAnswer: 2,
    explanation:
      'BS EN 39 specifies the requirements for steel tubes used in scaffolding. It defines the outside diameter (48.3 mm), wall thickness, material grade, tolerances, and testing requirements for scaffold tubes.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Tube standards',
    category: 'Scaffold Regulations & Standards',
  },
  {
    id: 63,
    question: 'What standard covers the requirements for scaffold couplers in the UK?',
    options: [
      'BS EN 39',
      'BS EN 1065',
      'BS EN 12811',
      'BS EN 74',
    ],
    correctAnswer: 3,
    explanation:
      'BS EN 74 specifies the requirements for couplers, loose spigots, and base plates used with steel scaffold tubes. It defines performance requirements, classifications, and test methods for these critical components.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Coupler standards',
    category: 'Scaffold Regulations & Standards',
  },
  {
    id: 64,
    question: "What is a NASC 'SG' document?",
    options: [
      'A Safety Guidance note published by NASC covering specific scaffolding topics',
      'A British Standard that sets the dimensions for steel scaffold tubes',
      'A statutory inspection record required every 7 days under the regulations',
      'A structural design calculation prepared for a complex bespoke scaffold',
    ],
    correctAnswer: 0,
    explanation:
      'NASC SG (Safety Guidance) notes are published documents covering specific safety topics in scaffolding. Examples include SG4 (preventing falls in scaffolding) and SG6 (manual handling in the scaffolding industry).',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'NASC SG documents',
    category: 'Scaffold Regulations & Standards',
  },
  {
    id: 65,
    question: 'What is NASC SG4 specifically about?',
    options: [
      'Fire safety on scaffolding',
      'Preventing falls in scaffolding operations',
      'Manual handling of scaffold components',
      'Electrical safety near scaffolding',
    ],
    correctAnswer: 1,
    explanation:
      "NASC SG4 is titled 'Preventing Falls in Scaffolding' and provides guidance on measures to protect scaffolders during the erection, alteration, and dismantling of scaffolding. It covers advance guard rails, harness use, and safe working procedures.",
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'SG4',
    category: 'Scaffold Regulations & Standards',
  },
  {
    id: 66,
    question: 'What is the legal status of an Approved Code of Practice (ACoP) issued by the HSE?',
    options: [
      'It is fully enforceable as law and breaching it is automatically a criminal offence',
      'It is purely advisory and carries no legal weight whatsoever in any proceedings',
      'It is not law itself, but failure to follow it can be used as evidence of non-compliance with the associated regulation',
      'It overrides the associated regulations wherever the two appear to conflict',
    ],
    correctAnswer: 2,
    explanation:
      "An ACoP is not law, but it has a special legal status. If a duty holder is prosecuted for breaching a regulation to which an ACoP applies, failure to follow the ACoP's guidance will be accepted as evidence of non-compliance unless an equally effective alternative was used.",
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Approved Codes of Practice',
    category: 'Scaffold Regulations & Standards',
  },
  {
    id: 67,
    question:
      'Under PUWER 1998, what must an employer ensure about scaffold equipment before it is used?',
    options: [
      'That it is the cheapest equipment available that meets the minimum specification',
      'That it carries a CE or UKCA mark, regardless of its condition on site',
      'That it has been insured against accidental damage by a third party',
      'It is suitable for its intended purpose, maintained in a safe condition, and inspected at regular intervals',
    ],
    correctAnswer: 3,
    explanation:
      'PUWER requires that work equipment (including scaffolding) is suitable for its intended use, maintained in an efficient state, in efficient working order and in good repair, and inspected at suitable intervals by a competent person.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'PUWER requirements',
    category: 'Scaffold Regulations & Standards',
  },
  {
    id: 68,
    question:
      'What information must a scaffold inspection report contain as a minimum under the Work at Height Regulations 2005?',
    options: [
      'The location, date, details of the scaffold, name and position of the inspector, and details of any defects found',
      'Only the date of inspection and a simple pass or fail result',
      'The hire cost of the scaffold and the trades expected to use it',
      'The names of every operative who has worked on the scaffold that week',
    ],
    correctAnswer: 0,
    explanation:
      'Schedule 7 of the Work at Height Regulations 2005 specifies the minimum content of an inspection report, including the scaffold location and description, date and time of inspection, details of any matters identified, and the name and position of the person who carried out the inspection.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Inspection report content',
    category: 'Scaffold Regulations & Standards',
  },
  {
    id: 69,
    question: "What is a 'permit to work' system in relation to scaffolding?",
    options: [
      'A licence from the local authority allowing a scaffold on a public highway',
      'A formal documented procedure that authorises certain work on or affecting the scaffold, ensuring safety precautions are in place',
      'A card scheme proving a scaffolder is competent to erect and dismantle scaffolds',
      'A certificate confirming the scaffold has been handed over and is safe to use',
    ],
    correctAnswer: 1,
    explanation:
      'A permit to work is a formal safety management system used for high-risk activities. In scaffolding, permits may be required before work such as tying into live services, working near overhead power lines, or making significant alterations to a loaded scaffold.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Permit to work',
    category: 'Scaffold Regulations & Standards',
  },
  {
    id: 70,
    question: "What is the purpose of a 'scaffold handover certificate'?",
    options: [
      'To record the result of each statutory 7-day inspection of the scaffold',
      'To authorise high-risk work such as tying into live services on the scaffold',
      'To formally confirm that the scaffold has been erected in accordance with the design and is safe for use by the specified trades',
      'To list every component used so the scaffold can be costed and invoiced',
    ],
    correctAnswer: 2,
    explanation:
      'A scaffold handover certificate confirms that the scaffold has been completed to the agreed design and is safe for its intended use. It typically specifies the duty rating, permitted users, and any restrictions or conditions of use.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Handover certificates',
    category: 'Scaffold Regulations & Standards',
  },
  {
    id: 71,
    question:
      'What action should be taken if scaffolding is found to be non-compliant during an inspection?',
    options: [
      'Continue using the scaffold but note the defect on the next inspection report',
      'Leave the scaffold in use and inform the trades to take extra care in that area',
      'Apply a green tag to reassure users while the defect is monitored over time',
      'Immediately restrict access to the scaffold, apply a danger tag, and arrange for a competent person to make it safe',
    ],
    correctAnswer: 3,
    explanation:
      "If a scaffold is found to be non-compliant or unsafe, it must be taken out of use immediately by preventing access and applying a 'Do Not Use' or danger tag. A competent scaffolder must then rectify the defects before the scaffold is returned to service.",
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'Non-compliance procedures',
    category: 'Scaffold Regulations & Standards',
  },
  {
    id: 72,
    question:
      'What does Regulation 4 of the Work at Height Regulations 2005 require regarding the organisation and planning of work at height?',
    options: [
      'That all work at height is properly planned, appropriately supervised, and carried out in a safe manner by competent persons',
      'That every scaffold is fitted with personal fall-arrest anchor points before use',
      'That all work at height is notified to the HSE at least 28 days in advance',
      'That a permit to work is issued for every task carried out above 2 metres',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 4 requires that every employer ensures work at height is properly planned, appropriately supervised, and carried out in a manner that is safe. This includes taking account of weather conditions, the condition of the working surface, and emergency rescue procedures.',
    section: 'Module 2',
    difficulty: 'intermediate',
    topic: 'WAH Regulation 4',
    category: 'Scaffold Regulations & Standards',
  },

  // --- advanced (8) ---
  {
    id: 73,
    question:
      'Under CDM 2015, what specific duty does the client have regarding scaffolding on a notifiable project?',
    options: [
      'The client must personally erect and dismantle the scaffold using their own labour',
      'The client must ensure sufficient time and resources are allocated for scaffolding to be erected, used, and dismantled safely',
      'The client must carry out the statutory 7-day inspections of the scaffold themselves',
      'The client must prepare the structural design calculations for every scaffold on site',
    ],
    correctAnswer: 1,
    explanation:
      'Under CDM 2015, the client must ensure that sufficient time and other resources are allocated for scaffolding work to be carried out safely. This includes the pre-construction phase for design and planning, as well as adequate time for safe erection and dismantling.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'CDM client duties',
    category: 'Scaffold Regulations & Standards',
  },
  {
    id: 74,
    question: 'What is the significance of BS EN 12810 in relation to scaffolding?',
    options: [
      'It specifies the dimensions and material grade of individual steel scaffold tubes',
      'It sets out the performance requirements for scaffold couplers and base plates',
      'It provides product specifications and assessment methods for facade scaffolds made from prefabricated components (system scaffolds)',
      'It is the code of practice governing temporary works management procedures',
    ],
    correctAnswer: 2,
    explanation:
      'BS EN 12810 covers facade scaffold systems made from prefabricated components (system scaffolds). Part 1 specifies product specifications and Part 2 covers particular methods of structural design. It complements BS EN 12811 which covers general performance requirements.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'BS EN 12810',
    category: 'Scaffold Regulations & Standards',
  },
  {
    id: 75,
    question:
      "In TG20:13, what are the three 'wind regions' used to determine design wind speeds for scaffolding in the UK?",
    options: [
      'North, South, and Central',
      'Sheltered, Standard, and Exposed',
      'Inland, Coastal, and Offshore',
      'Country, Town, and City',
    ],
    correctAnswer: 3,
    explanation:
      'TG20:13 uses three site exposure categories: Country (open terrain), Town (suburban or urban), and City (city centres with surrounding buildings). These affect the wind speed calculations and therefore the tie and bracing requirements for the scaffold.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'TG20 wind regions',
    category: 'Scaffold Regulations & Standards',
  },
  {
    id: 76,
    question:
      'Under the Workplace (Health, Safety and Welfare) Regulations 1992, what is the minimum temperature at which scaffolding operations should be reviewed for safe continuation?',
    options: [
      'The regulations do not specify a minimum temperature; risk assessment should consider the effects of cold, ice, and wind chill',
      'A statutory minimum of 5°C, below which all scaffold work must stop',
      'A statutory minimum of 0°C, below which all scaffold work must stop',
      'A statutory minimum of minus 5°C, below which all scaffold work must stop',
    ],
    correctAnswer: 0,
    explanation:
      'There is no single statutory temperature for stopping scaffold work. However, the employer must assess risks from cold, ice on components, reduced grip, and wind chill. TG20 and SG4 advise that frost, ice, and snow create slip hazards requiring additional precautions.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Cold weather working',
    category: 'Scaffold Regulations & Standards',
  },
  {
    id: 77,
    question:
      'What is the maximum wind speed at which scaffolding erection and dismantling operations should generally cease, according to NASC guidance?',
    options: [
      'Beaufort Scale Force 3 (gentle breeze) or mean wind speed of approximately 9 knots',
      'Beaufort Scale Force 6 (strong breeze) or mean wind speed of approximately 23 knots',
      'Beaufort Scale Force 8 (gale) or mean wind speed of approximately 37 knots',
      'Beaufort Scale Force 10 (storm) or mean wind speed of approximately 50 knots',
    ],
    correctAnswer: 1,
    explanation:
      'NASC guidance recommends that scaffolding erection and dismantling should cease at Beaufort Force 6 (approximately 23 knots/43 km/h mean wind speed). At this level, handling lightweight components becomes dangerous and the risk of materials being blown from height increases significantly.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Wind speed limits',
    category: 'Scaffold Regulations & Standards',
  },
  {
    id: 78,
    question:
      'What is the legal position if a worker is injured due to a scaffold defect that should have been identified during a routine inspection?',
    options: [
      'No action can be taken because scaffold defects are treated as unforeseeable accidents',
      'Only the injured worker can be held liable, for failing to spot the defect themselves',
      'The employer and/or the person responsible for the inspection could face prosecution for failing to comply with the Work at Height Regulations and HSWA 1974',
      'Liability rests solely with the scaffold manufacturer who supplied the components',
    ],
    correctAnswer: 2,
    explanation:
      'If a scaffold defect causes injury and should have been identified by proper inspection, the employer and/or competent inspector may face prosecution under HSWA 1974 and the Work at Height Regulations 2005. Fines can be unlimited and custodial sentences may apply for serious breaches.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Legal liability',
    category: 'Scaffold Regulations & Standards',
  },
  {
    id: 79,
    question:
      'What does Section 3 of the HSWA 1974 require in relation to scaffolding that is accessible to the public?',
    options: [
      'That every employee takes reasonable care of their own health and safety at work',
      'That work equipment is suitable, maintained, and inspected before it is used',
      'That the scaffold is inspected by a competent person at intervals not exceeding 7 days',
      'That the employer conducts their undertaking in a way that ensures, so far as reasonably practicable, that persons not in their employment are not exposed to risks to their health or safety',
    ],
    correctAnswer: 3,
    explanation:
      "Section 3 of HSWA 1974 places a duty on employers to ensure non-employees are not exposed to risks from the employer's activities. For scaffolding, this means protecting the public from falling objects, trip hazards, and ensuring safe pedestrian routes around the scaffold.",
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Section 3 HSWA',
    category: 'Scaffold Regulations & Standards',
  },
  {
    id: 80,
    question:
      'Under the Work at Height Regulations 2005, Schedule 3, Part 4 covers additional requirements for scaffolding. What key provision does it make regarding incomplete scaffolds?',
    options: [
      'Incomplete scaffolds must not be used and must be marked with appropriate warning signs to prevent inadvertent use',
      'Incomplete scaffolds may be used provided a harness and lanyard are worn at all times',
      'Incomplete scaffolds may be used only by the scaffolders erecting them and no other trades',
      'Incomplete scaffolds may be used once a verbal warning has been given to all site operatives',
    ],
    correctAnswer: 0,
    explanation:
      'Schedule 3 requires that any scaffold which is not available for use (e.g., during erection, dismantling, or alteration) must not be used and must display warning signs indicating it is not complete. Physical barriers should also prevent access.',
    section: 'Module 2',
    difficulty: 'advanced',
    topic: 'Incomplete scaffold provisions',
    category: 'Scaffold Regulations & Standards',
  },

  // =======================================================================
  // CATEGORY 3 (Part 1) — Scaffold Components & Assembly — 20 questions (id 81–100)
  // =======================================================================

  // --- basic (7) ---
  {
    id: 81,
    question: "What is the purpose of a 'base plate' in scaffolding?",
    options: [
      'To brace the scaffold diagonally and prevent it from racking sideways',
      'To spread the load from a standard over a larger area and prevent it sinking into the ground',
      'To tie the foot of the scaffold back to the face of the building',
      'To hoist materials up to the working platform using a rope and pulley',
    ],
    correctAnswer: 1,
    explanation:
      'A base plate is a flat steel plate placed under each standard to distribute the concentrated load over a larger area. This helps prevent the standard from sinking into soft ground and provides a stable foundation for the scaffold.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Base plates',
    category: 'Scaffold Components & Assembly',
  },
  {
    id: 82,
    question: "What is a 'sole board' used for in scaffolding?",
    options: [
      'To form the boarded working platform that operatives stand on',
      'To prevent tools and materials being kicked off the edge of the platform',
      'To distribute the load from the base plate over an even wider area on soft or uneven ground',
      'To brace the scaffold diagonally across its face for added stability',
    ],
    correctAnswer: 2,
    explanation:
      'A sole board is a timber plank placed under the base plate to further spread the load on soft or uneven ground. It must be of adequate size and thickness to prevent the base plate from sinking and must be placed on firm, level ground.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Sole boards',
    category: 'Scaffold Components & Assembly',
  },
  {
    id: 83,
    question: "What is a 'right-angle coupler' used for in tube and fitting scaffolding?",
    options: [
      'Joining a guard rail to a toe board',
      'Connecting a scaffold to the building at any angle',
      'Joining two tubes end to end in a straight line',
      'Connecting two tubes at 90 degrees to each other',
    ],
    correctAnswer: 3,
    explanation:
      'A right-angle coupler (also called a fixed coupler) connects two scaffold tubes at exactly 90 degrees. It is the primary load-bearing coupler used to connect ledgers to standards and transoms to ledgers.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Right-angle couplers',
    category: 'Scaffold Components & Assembly',
  },
  {
    id: 84,
    question: "What is a 'swivel coupler' used for?",
    options: [
      'Connecting two tubes at any angle other than 90 degrees',
      'Connecting a tube to a flat surface such as a wall',
      'Joining two tubes of different diameters',
      'Allowing a scaffold to rotate on its base',
    ],
    correctAnswer: 0,
    explanation:
      'A swivel coupler connects two scaffold tubes at any angle. It is commonly used for fixing bracing tubes to standards or ledgers. Swivel couplers have a lower safe working load than right-angle couplers and should not be used as load-bearing connections.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Swivel couplers',
    category: 'Scaffold Components & Assembly',
  },
  {
    id: 85,
    question:
      'What is the minimum height for a guard rail (top rail) on a scaffold working platform?',
    options: [
      '500 mm above the platform',
      '950 mm above the platform',
      '1200 mm above the platform',
      '750 mm above the platform',
    ],
    correctAnswer: 1,
    explanation:
      'The Work at Height Regulations 2005 require that the top guard rail on a scaffold must be at least 950 mm above the working platform. An intermediate guard rail must be positioned so that the gap between any rail and the platform or toe board does not exceed 470 mm.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Guard rail height',
    category: 'Scaffold Components & Assembly',
  },
  {
    id: 86,
    question: "What is a 'toe board' and what is its purpose?",
    options: [
      'A board placed at the base of a ladder to prevent it slipping',
      'A board used to protect the toes of boots from damage',
      'A board fixed at the edge of a scaffold platform to prevent materials and tools from falling off',
      'A board placed on the ground to mark the scaffold perimeter',
    ],
    correctAnswer: 2,
    explanation:
      'A toe board is a board at least 150 mm high placed along the open edges of a scaffold platform. Its primary purpose is to prevent materials, tools, and debris from being kicked or falling off the platform onto people below.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Toe boards',
    category: 'Scaffold Components & Assembly',
  },
  {
    id: 87,
    question:
      'What type of bracing runs diagonally across the face of the scaffold from the base to the top?',
    options: [
      'Ledger bracing (horizontal bracing)',
      'Plan bracing (horizontal-plane bracing)',
      'Transom bracing (cross bracing)',
      'Facade bracing (face bracing)',
    ],
    correctAnswer: 3,
    explanation:
      'Facade bracing (also called face bracing or longitudinal bracing) runs diagonally across the face of the scaffold. It prevents the scaffold from racking sideways and is essential for the structural stability of the scaffold.',
    section: 'Module 3',
    difficulty: 'basic',
    topic: 'Facade bracing',
    category: 'Scaffold Components & Assembly',
  },

  // --- intermediate (9) ---
  {
    id: 88,
    question: "What is 'plan bracing' and where is it fitted on a scaffold?",
    options: [
      'Diagonal bracing fitted horizontally across the width of the scaffold at specific lifts to prevent the scaffold from twisting',
      'Diagonal bracing fitted vertically across the face of the scaffold to prevent racking',
      'Horizontal tubes running lengthways that connect the standards together',
      'Inclined tubes from the scaffold to the ground used where ties are not possible',
    ],
    correctAnswer: 0,
    explanation:
      'Plan bracing is fitted in the horizontal plane across the width of the scaffold. It prevents the inner and outer rows of standards from moving relative to each other and stops the scaffold from racking or swaying. It is typically required at specific intervals.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Plan bracing',
    category: 'Scaffold Components & Assembly',
  },
  {
    id: 89,
    question: "What is a 'putlog coupler' and what is it used for?",
    options: [
      'A double-bolt coupler that grips two tubes fully at exactly 90 degrees',
      'A single-fitting coupler that fixes a putlog or transom to a ledger, allowing the tube to rest on the ledger rather than being fixed around it',
      'A coupler used to join two tubes end to end to extend their length',
      'A coupler that connects two tubes at any angle other than 90 degrees',
    ],
    correctAnswer: 1,
    explanation:
      'A putlog coupler is a single-bolt fitting used to fix a transom or putlog to a ledger. Unlike a right-angle coupler which grips both tubes fully, a putlog coupler allows the transom to sit on top of the ledger. Its safe working load is lower than a right-angle coupler.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Putlog couplers',
    category: 'Scaffold Components & Assembly',
  },
  {
    id: 90,
    question: 'What is the maximum gap permitted between scaffold boards on a working platform?',
    options: [
      '10 mm',
      '50 mm',
      '25 mm',
      '75 mm',
    ],
    correctAnswer: 2,
    explanation:
      'The maximum permissible gap between scaffold boards on a working platform is 25 mm. Larger gaps create a trip hazard and allow small tools and materials to fall through, posing a risk to persons below.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Board gaps',
    category: 'Scaffold Components & Assembly',
  },
  {
    id: 91,
    question:
      'What is the maximum distance a scaffold board should overhang its support (transom) at each end?',
    options: [
      'A maximum of 50 mm or 2 times the board thickness, whichever is less',
      'A maximum of 300 mm or 6 times the board thickness, whichever is less',
      'A maximum of 25 mm regardless of the thickness of the board',
      'A maximum of 150 mm or 4 times the board thickness, whichever is less',
    ],
    correctAnswer: 3,
    explanation:
      'Scaffold boards should overhang their end support by a minimum of 50 mm and a maximum of 150 mm (or 4 times the board thickness, whichever is less). Excessive overhang creates a tipping hazard when a load is placed near the unsupported end.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Board overhang',
    category: 'Scaffold Components & Assembly',
  },
  {
    id: 92,
    question: "What is the purpose of 'ties' in scaffolding?",
    options: [
      'To connect the scaffold to the building to prevent it from pulling away or pushing towards the structure',
      'To spread the load from the standards over a larger area of the ground',
      'To brace the scaffold diagonally and stop it twisting when viewed from above',
      'To hoist materials up to the working platform using a rope and pulley',
    ],
    correctAnswer: 0,
    explanation:
      'Scaffold ties anchor the scaffold to the building or structure to prevent it from moving away from or towards the building. Ties resist both tension (pulling away) and compression (pushing towards) forces caused by wind, loading, and use.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Scaffold ties',
    category: 'Scaffold Components & Assembly',
  },
  {
    id: 93,
    question: "What is a 'box tie' in scaffolding?",
    options: [
      'A tie that wedges an adjustable tube across a window or door reveal',
      'A tie arrangement using tubes and couplers to form a box shape around a structural element, connecting the scaffold to the building',
      'A tie drilled and anchored directly into the masonry of the building',
      'A tie that passes through a window opening and is anchored on the inside face',
    ],
    correctAnswer: 1,
    explanation:
      'A box tie uses scaffold tubes and couplers to create a rectangular frame that wraps around a column or structural element, connecting it back to the scaffold. Box ties provide excellent resistance to both push and pull forces and are very reliable.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Box ties',
    category: 'Scaffold Components & Assembly',
  },
  {
    id: 94,
    question: 'What is the standard width of a scaffold board used in the UK?',
    options: [
      '300 mm (12 inches)',
      '450 mm (18 inches)',
      '225 mm (9 inches)',
      '150 mm (6 inches)',
    ],
    correctAnswer: 2,
    explanation:
      'Standard scaffold boards in the UK are 225 mm (9 inches) wide and 38 mm thick. They are typically available in lengths of 2.4 m, 3.0 m, and 3.9 m, and must comply with BS 2482 for timber scaffold boards.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Board dimensions',
    category: 'Scaffold Components & Assembly',
  },
  {
    id: 95,
    question: "What is a 'sleeve coupler' (also known as a joint pin or spigot) used for?",
    options: [
      'Connecting a tube to a flat surface',
      'Securing toe boards to the scaffold',
      'Fixing bracing to standards at an angle',
      'Joining two scaffold tubes end to end to extend their length',
    ],
    correctAnswer: 3,
    explanation:
      'A sleeve coupler (or spigot/joint pin) is inserted into the bore of two scaffold tubes to join them end to end. It allows standards, ledgers, or other tubes to be extended. The joint must be located close to a node point to maintain structural integrity.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Sleeve couplers',
    category: 'Scaffold Components & Assembly',
  },
  {
    id: 96,
    question:
      "What is a 'check coupler' (also called a supplementary coupler) and when is it used?",
    options: [
      'A secondary coupler fitted next to a load-bearing right-angle coupler where the load exceeds the capacity of a single coupler',
      'A coupler used only to connect diagonal bracing tubes at an angle',
      'A coupler used to join two scaffold tubes end to end to extend their length',
      'A single-bolt coupler that allows a transom to rest on top of a ledger',
    ],
    correctAnswer: 0,
    explanation:
      'A check coupler is an additional coupler fixed beside a right-angle coupler where the load on the connection exceeds the safe working load of a single coupler. It effectively doubles the connection capacity at critical load-bearing joints.',
    section: 'Module 3',
    difficulty: 'intermediate',
    topic: 'Check couplers',
    category: 'Scaffold Components & Assembly',
  },

  // --- advanced (4) ---
  {
    id: 97,
    question:
      'What is the safe working load (SWL) of a standard right-angle coupler to BS EN 74, and what is its slip load?',
    options: [
      'SWL 10.0 kN, slip load 15.0 kN',
      'SWL 6.25 kN, slip load 9.1 kN',
      'SWL 5.0 kN, slip load 7.5 kN',
      'SWL 8.0 kN, slip load 12.0 kN',
    ],
    correctAnswer: 1,
    explanation:
      'A standard right-angle coupler to BS EN 74 has a safe working load of 6.25 kN and a characteristic slip load of 9.1 kN. The SWL includes an appropriate factor of safety. Couplers must be tightened to the correct torque to achieve their rated capacity.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'Coupler SWL',
    category: 'Scaffold Components & Assembly',
  },
  {
    id: 98,
    question:
      'When erecting tube and fitting scaffolding, at what maximum height above a working platform can a scaffolder work before an additional platform or advance guard rail is required (as per NASC SG4)?',
    options: [
      '1.2 metres',
      '3.0 metres',
      '2.0 metres',
      '4.0 metres',
    ],
    correctAnswer: 2,
    explanation:
      'NASC SG4 states that scaffolders must not work at a height greater than 2.0 metres above the last completed platform without additional protection. Advance guard rail systems or personal fall protection must be used when erecting lifts above this height.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'SG4 working height',
    category: 'Scaffold Components & Assembly',
  },
  {
    id: 99,
    question:
      'What is the typical tie pattern for a standard independent scaffold with no cladding, as specified in TG20:13?',
    options: [
      'A tie at every standard on every lift across the whole scaffold face',
      'Ties only at the top lift and the bottom lift of the scaffold',
      'Ties only at the four corners of the scaffold structure',
      'Alternate standards at alternate lifts, creating a diamond or staggered pattern',
    ],
    correctAnswer: 3,
    explanation:
      'TG20:13 specifies a staggered (diamond) tie pattern for standard independent scaffolds, with ties at alternate standards on alternate lifts. This typically results in one tie per approximately 30-40 m² of scaffold face, though clad scaffolds require significantly more ties.',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'Tie patterns',
    category: 'Scaffold Components & Assembly',
  },
  {
    id: 100,
    question:
      "What is the purpose of a 'butt tube' (or 'butt end') in scaffold board support, and what is the maximum unsupported span for a 38 mm thick scaffold board?",
    options: [
      'A butt tube is a short transom added to support boards that do not reach the next transom; maximum span is 1.5 m',
      'A butt tube joins two boards end to end; maximum span is 2.0 m',
      'A butt tube is a tube placed under the board joint; maximum span is 3.0 m',
      'A butt tube prevents boards from sliding; maximum span is 2.5 m',
    ],
    correctAnswer: 0,
    explanation:
      'A butt tube is an additional transom fitted where scaffold boards of different lengths meet, ensuring neither board overhangs excessively or is unsupported. The maximum unsupported span for a standard 38 mm thick scaffold board is 1.5 m (1.2 m if the board supports closely spaced materials).',
    section: 'Module 3',
    difficulty: 'advanced',
    topic: 'Board spans and butt tubes',
    category: 'Scaffold Components & Assembly',
  },
  {
    id: 101,
    question: 'What is the primary purpose of ledger bracing on a scaffold structure?',
    options: [
      'To carry the scaffold load down to the base plate and the ground',
      'To prevent lateral movement and increase rigidity',
      'To support the boards that form the working platform',
      'To anchor the scaffold to the face of the building',
    ],
    correctAnswer: 1,
    explanation:
      'Ledger bracing prevents lateral movement along the length of the scaffold, increasing the overall rigidity of the structure. Without adequate bracing, the scaffold could sway or collapse under load or wind pressure.',
    section: 'scaffolding-awareness',
    difficulty: 'basic',
    topic: 'Scaffold Components & Assembly Part 2',
    category: 'Scaffold Components & Assembly Part 2',
  },
  {
    id: 102,
    question:
      'Which type of bracing runs diagonally across the face of a scaffold from bottom to top?',
    options: [
      'Plan bracing',
      'Node bracing',
      'Facade bracing',
      'Ledger bracing',
    ],
    correctAnswer: 2,
    explanation:
      'Facade bracing (also called face bracing) runs diagonally across the external face of the scaffold structure. It provides stability against lateral forces and is a critical element in preventing the scaffold from racking.',
    section: 'scaffolding-awareness',
    difficulty: 'basic',
    topic: 'Scaffold Components & Assembly Part 2',
    category: 'Scaffold Components & Assembly Part 2',
  },
  {
    id: 103,
    question: 'What is plan bracing used for in scaffold construction?',
    options: [
      'To carry the scaffold load down to the base plates',
      'To anchor the scaffold to the face of the building',
      'To support the boards that form the working platform',
      'To prevent the scaffold twisting when viewed from above',
    ],
    correctAnswer: 3,
    explanation:
      'Plan bracing is installed horizontally and prevents the scaffold from twisting or distorting when viewed in plan (from above). It works in conjunction with facade bracing to maintain the structural integrity of the scaffold.',
    section: 'scaffolding-awareness',
    difficulty: 'intermediate',
    topic: 'Scaffold Components & Assembly Part 2',
    category: 'Scaffold Components & Assembly Part 2',
  },
  {
    id: 104,
    question: "What is a 'through tie' in scaffolding?",
    options: [
      'A tie that passes through the building via an opening such as a window',
      'A tie that connects two separate scaffolds together',
      'A tie that connects the toe board to the standard',
      'A tie used only on independent scaffolds',
    ],
    correctAnswer: 0,
    explanation:
      'A through tie passes through an opening in the building, such as a window, and is secured on the inside face of the wall. It is one of the most effective types of tie as it provides both tension and compression restraint.',
    section: 'scaffolding-awareness',
    difficulty: 'intermediate',
    topic: 'Scaffold Components & Assembly Part 2',
    category: 'Scaffold Components & Assembly Part 2',
  },
  {
    id: 105,
    question:
      'At what typical horizontal spacing should ties be placed on a scaffold that is NOT sheeted?',
    options: [
      'Only at the top and bottom of the scaffold',
      'Every bay horizontally and every lift vertically',
      'Only where the scaffold exceeds 10 metres in height',
      'Every other bay horizontally and every other lift vertically',
    ],
    correctAnswer: 3,
    explanation:
      'For a standard unsheeted (unclad) independent scaffold, TG20:13 specifies a staggered (diamond) tie pattern — ties at alternate standards on alternate lifts, i.e. every other bay horizontally and every other lift vertically (roughly one tie per 30-40 m² of face). Sheeted or clad scaffolds catch far more wind load and need significantly more ties. Adequate tying is essential to prevent the scaffold pulling away from the building.',
    section: 'scaffolding-awareness',
    difficulty: 'intermediate',
    topic: 'Scaffold Components & Assembly Part 2',
    category: 'Scaffold Components & Assembly Part 2',
  },
  {
    id: 106,
    question: 'How does sheeting or netting a scaffold affect the tie requirements?',
    options: [
      'It reduces the wind loading and therefore fewer ties are required',
      'It has no effect on the wind loading or the number of ties needed',
      'It significantly increases the wind loading and therefore more ties are required',
      'It only affects the tie requirements if the scaffold is over 10 metres high',
    ],
    correctAnswer: 2,
    explanation:
      'Sheeting or netting dramatically increases the wind loading on a scaffold because the sheeted surface acts like a sail. This means significantly more ties are needed to secure the scaffold to the building and prevent it from being blown over.',
    section: 'scaffolding-awareness',
    difficulty: 'intermediate',
    topic: 'Scaffold Components & Assembly Part 2',
    category: 'Scaffold Components & Assembly Part 2',
  },
  {
    id: 107,
    question: "What is a 'box tie' in scaffold construction?",
    options: [
      'A tie that wedges an adjustable tube across a window or door reveal',
      'A tie that passes through an opening and is anchored on the inside face',
      'A tie drilled and anchored directly into the masonry of the building',
      'A tie arrangement using tubes and fittings that wraps around a structural element inside the building',
    ],
    correctAnswer: 3,
    explanation:
      'A box tie uses tubes and fittings to create a restraint that wraps around a structural element such as a column inside the building. It provides a positive connection and is particularly useful where through ties cannot be installed.',
    section: 'scaffolding-awareness',
    difficulty: 'intermediate',
    topic: 'Scaffold Components & Assembly Part 2',
    category: 'Scaffold Components & Assembly Part 2',
  },
  {
    id: 108,
    question: 'What is the main risk if a scaffold has inadequate bracing?',
    options: [
      'The scaffold may collapse due to instability',
      'The toe boards will fall off',
      'The base plates will sink',
      'The platforms will be too narrow',
    ],
    correctAnswer: 0,
    explanation:
      'Without adequate bracing, a scaffold lacks the structural stability needed to resist lateral forces from wind, loading, and use. This can lead to progressive collapse, which is one of the most serious scaffold failure modes.',
    section: 'scaffolding-awareness',
    difficulty: 'basic',
    topic: 'Scaffold Components & Assembly Part 2',
    category: 'Scaffold Components & Assembly Part 2',
  },
  {
    id: 109,
    question: "What is a 'reveal tie' and when might it be used?",
    options: [
      'A tie visible from the outside used for aesthetic purposes',
      'A tie that uses an adjustable tube wedged across a window or door reveal',
      'A tie that is hidden inside the scaffold structure',
      'A tie used exclusively on mobile tower scaffolds',
    ],
    correctAnswer: 1,
    explanation:
      'A reveal tie uses a reveal tube (an inner tube with a threaded adjustment) that is wedged across a window or door opening. Whilst useful where other tie types are not practical, reveal ties only provide compression restraint and can be less reliable than through ties.',
    section: 'scaffolding-awareness',
    difficulty: 'intermediate',
    topic: 'Scaffold Components & Assembly Part 2',
    category: 'Scaffold Components & Assembly Part 2',
  },
  {
    id: 110,
    question: 'At what wind speed should work on an exposed scaffold generally be stopped?',
    options: [
      'Only once the wind reaches gale force (force 8), around 40 mph',
      'There is no need to consider wind speed once a scaffold is tied in',
      'There is no fixed limit; risk-assess from around force 5 to 6 (roughly 23 mph), depending on the scaffold',
      'As soon as any breeze can be felt, regardless of the scaffold',
    ],
    correctAnswer: 2,
    explanation:
      'There is no single universal wind speed limit — the decision depends on the scaffold configuration, height, sheeting, and risk assessment. As general guidance, work should be carefully assessed from around force 5 to 6 (roughly 23 mph), and most scaffolds should not be worked on above force 6.',
    section: 'scaffolding-awareness',
    difficulty: 'advanced',
    topic: 'Scaffold Components & Assembly Part 2',
    category: 'Scaffold Components & Assembly Part 2',
  },
  {
    id: 111,
    question: "What is the purpose of 'lip ties' or 'anchor ties' drilled into masonry?",
    options: [
      'To wedge an adjustable tube across a window or door reveal',
      'To pass a tube through a window opening and anchor it on the inside',
      'To wrap tubes and couplers around an internal column as a box tie',
      'To provide a fixing point directly into the building fabric for restraining the scaffold',
    ],
    correctAnswer: 3,
    explanation:
      'Lip ties or anchor ties are drilled and fixed directly into the masonry or concrete of the building. They provide a reliable fixing point to restrain the scaffold and are particularly useful on buildings where through ties or reveal ties are not practical.',
    section: 'scaffolding-awareness',
    difficulty: 'intermediate',
    topic: 'Scaffold Components & Assembly Part 2',
    category: 'Scaffold Components & Assembly Part 2',
  },
  {
    id: 112,
    question:
      'Why is it important that scaffold bracing is installed in a continuous zigzag pattern?',
    options: [
      'It ensures that forces are transferred efficiently through the entire scaffold structure',
      'It reduces the number of ties needed to secure the scaffold to the building',
      'It allows the scaffold to be dismantled more quickly at the end of the job',
      'It keeps the working platforms level when the ground is sloping',
    ],
    correctAnswer: 0,
    explanation:
      'A continuous zigzag bracing pattern ensures that lateral forces are transferred efficiently down through the scaffold to the ground. Broken or discontinuous bracing significantly reduces the stability of the scaffold and can create weak points.',
    section: 'scaffolding-awareness',
    difficulty: 'intermediate',
    topic: 'Scaffold Components & Assembly Part 2',
    category: 'Scaffold Components & Assembly Part 2',
  },
  {
    id: 113,
    question: 'What effect does a sheeted scaffold have on the building it is tied to?',
    options: [
      'It reduces the wind load on the building because the sheeting deflects the wind',
      'It transfers significantly increased wind loads into the building structure',
      'It has no effect on the building as the ties carry no wind load at all',
      'It reduces the number of ties the building needs to support',
    ],
    correctAnswer: 1,
    explanation:
      'A sheeted scaffold transfers significantly increased wind loads into the building through the ties. The building structure must be capable of withstanding these additional loads, which is why a structural assessment may be needed before sheeting a scaffold.',
    section: 'scaffolding-awareness',
    difficulty: 'advanced',
    topic: 'Scaffold Components & Assembly Part 2',
    category: 'Scaffold Components & Assembly Part 2',
  },
  {
    id: 114,
    question: "What is 'racking' in relation to scaffold stability?",
    options: [
      'The process of stacking materials on the scaffold',
      'The method of storing scaffold components',
      'The sideways distortion of the scaffold frame caused by horizontal forces',
      'The process of adding extra boards to a platform',
    ],
    correctAnswer: 2,
    explanation:
      "Racking is the sideways distortion of a scaffold structure where the rectangular frame deforms into a parallelogram shape due to horizontal forces. Bracing is the primary means of preventing racking and maintaining the scaffold's geometric stability.",
    section: 'scaffolding-awareness',
    difficulty: 'intermediate',
    topic: 'Scaffold Components & Assembly Part 2',
    category: 'Scaffold Components & Assembly Part 2',
  },
  {
    id: 115,
    question: "What is a 'buttress' or 'raker' used for in scaffolding?",
    options: [
      'To support the boards that form the working platform',
      'To anchor the scaffold to the face of the building',
      'To spread the load from the standards over a wider area of ground',
      'To provide stability to a freestanding scaffold that cannot be tied to a building',
    ],
    correctAnswer: 3,
    explanation:
      'A buttress or raker is an inclined support that provides stability to a freestanding scaffold where ties to a building are not possible. They transfer horizontal forces to the ground and must be adequately designed and secured at both ends.',
    section: 'scaffolding-awareness',
    difficulty: 'advanced',
    topic: 'Scaffold Components & Assembly Part 2',
    category: 'Scaffold Components & Assembly Part 2',
  },
  {
    id: 116,
    question:
      "Which of the following best describes a 'right-angle coupler' in scaffold construction?",
    options: [
      'A fitting that joins two tubes at exactly 90 degrees to each other',
      'A fitting that joins two tubes at any angle',
      'A fitting used only for connecting bracing',
      'A fitting that allows tubes to slide past each other',
    ],
    correctAnswer: 0,
    explanation:
      'A right-angle coupler (also called a double coupler) joins two scaffold tubes at exactly 90 degrees. It is the most common fitting used in tube and fitting scaffolds and is used to connect ledgers to standards and transoms to ledgers.',
    section: 'scaffolding-awareness',
    difficulty: 'basic',
    topic: 'Scaffold Components & Assembly Part 2',
    category: 'Scaffold Components & Assembly Part 2',
  },
  {
    id: 117,
    question: "What is the purpose of a 'swivel coupler' in scaffolding?",
    options: [
      'To join two tubes at exactly 90 degrees to each other',
      'To join two tubes at any angle other than 90 degrees',
      'To join two tubes end to end to extend their length',
      'To rest a transom on top of a ledger with a single bolt',
    ],
    correctAnswer: 1,
    explanation:
      'A swivel coupler joins two scaffold tubes at any angle other than 90 degrees. It is commonly used for connecting bracing members, which run diagonally and therefore do not meet standards or ledgers at right angles.',
    section: 'scaffolding-awareness',
    difficulty: 'basic',
    topic: 'Scaffold Components & Assembly Part 2',
    category: 'Scaffold Components & Assembly Part 2',
  },
  {
    id: 118,
    question:
      'What additional precaution should be taken when a scaffold is erected near overhead power lines?',
    options: [
      'The scaffold can be earthed to the building to make contact with the lines safe',
      'Rubber matting on the platforms is sufficient to protect against electrocution',
      'Exclusion zones must be established and maintained, and the electricity supply authority should be contacted',
      'Work can continue as normal provided operatives wear insulated gloves',
    ],
    correctAnswer: 2,
    explanation:
      'Scaffolds near overhead power lines pose an electrocution risk. Exclusion zones must be established in accordance with HSE guidance, the electricity supply authority should be contacted, and in many cases the power lines should be diverted or made dead before work begins.',
    section: 'scaffolding-awareness',
    difficulty: 'basic',
    topic: 'Scaffold Components & Assembly Part 2',
    category: 'Scaffold Components & Assembly Part 2',
  },
  {
    id: 119,
    question: 'What is the typical safe working load of a standard right-angle coupler?',
    options: [
      '3.25 kN',
      '25 kN',
      '12.5 kN',
      '6.25 kN',
    ],
    correctAnswer: 3,
    explanation:
      'A standard right-angle coupler has a safe working load of 6.25 kN (approximately 625 kg). This value is critical for scaffold design calculations, and couplers must not be loaded beyond this limit to maintain the structural integrity of the scaffold.',
    section: 'scaffolding-awareness',
    difficulty: 'advanced',
    topic: 'Scaffold Components & Assembly Part 2',
    category: 'Scaffold Components & Assembly Part 2',
  },
  {
    id: 120,
    question:
      'Why must scaffold ties never be removed without authorisation from the scaffold contractor?',
    options: [
      'Because removing ties can compromise the stability of the entire scaffold, risking collapse',
      'Because the ties belong to the scaffold contractor and must not be taken off site',
      'Because removing a tie voids the manufacturer’s warranty on the scaffold tubes',
      'Because the ties are needed to earth the scaffold against lightning strikes',
    ],
    correctAnswer: 0,
    explanation:
      'Scaffold ties are critical structural elements that prevent the scaffold from pulling away from or being pushed into the building. Removing even a single tie without proper assessment can compromise the overall stability of the scaffold and potentially lead to collapse.',
    section: 'scaffolding-awareness',
    difficulty: 'basic',
    topic: 'Scaffold Components & Assembly Part 2',
    category: 'Scaffold Components & Assembly Part 2',
  },
  {
    id: 121,
    question:
      'Under the Work at Height Regulations 2005, how often must a scaffold be inspected as a minimum?',
    options: [
      'Once a month',
      'Every 7 days',
      'Every 14 days',
      'Only when damage is reported',
    ],
    correctAnswer: 1,
    explanation:
      'The Work at Height Regulations 2005 require that scaffolds are inspected at intervals not exceeding 7 days. This regular inspection regime ensures that any defects, damage, or unauthorised alterations are identified and addressed promptly.',
    section: 'scaffolding-awareness',
    difficulty: 'basic',
    topic: 'Scaffold Inspection & Tagging',
    category: 'Scaffold Inspection & Tagging',
  },
  {
    id: 122,
    question: 'Apart from the 7-day inspection, when else must a scaffold be inspected?',
    options: [
      'Only once, immediately before the scaffold is first handed over for use',
      'At the end of every working shift, regardless of conditions or activity',
      'After any event likely to have affected its stability, such as adverse weather',
      'Only when a new trade is about to start using the scaffold for the first time',
    ],
    correctAnswer: 2,
    explanation:
      'In addition to the regular 7-day inspection, scaffolds must be inspected after any event that could have affected their stability. This includes adverse weather such as high winds, heavy rain, or snow, as well as any accidental impact or significant alteration.',
    section: 'scaffolding-awareness',
    difficulty: 'basic',
    topic: 'Scaffold Inspection & Tagging',
    category: 'Scaffold Inspection & Tagging',
  },
  {
    id: 123,
    question:
      'Who is legally permitted to carry out a scaffold inspection under the Work at Height Regulations?',
    options: [
      'Any operative who holds a valid construction site induction card',
      'The site manager, regardless of their scaffolding training or experience',
      'An HSE inspector, who must attend the site for every statutory inspection',
      'A competent person with appropriate training and experience',
    ],
    correctAnswer: 3,
    explanation:
      'Scaffold inspections must be carried out by a competent person — someone who has sufficient training, experience, and knowledge to identify defects and assess whether the scaffold is safe. This is a legal requirement under the Work at Height Regulations 2005.',
    section: 'scaffolding-awareness',
    difficulty: 'basic',
    topic: 'Scaffold Inspection & Tagging',
    category: 'Scaffold Inspection & Tagging',
  },
  {
    id: 124,
    question: 'What does a GREEN scaffold tag indicate?',
    options: [
      'The scaffold has been inspected, is complete, and is safe to use',
      'The scaffold is incomplete and must not be used under any circumstances',
      'The scaffold has restrictions on its use that operatives must read first',
      'The scaffold is reserved exclusively for the scaffolding gang erecting it',
    ],
    correctAnswer: 0,
    explanation:
      'A green scaffold tag indicates that the scaffold has been inspected by a competent person, is complete, and is safe for use. Operatives should always check for a green tag before using any scaffold and should read the information on it.',
    section: 'scaffolding-awareness',
    difficulty: 'basic',
    topic: 'Scaffold Inspection & Tagging',
    category: 'Scaffold Inspection & Tagging',
  },
  {
    id: 125,
    question: 'What does a YELLOW scaffold tag typically indicate?',
    options: [
      'The scaffold has been fully inspected, is complete, and is safe for unrestricted use',
      'The scaffold has restrictions on its use and operatives must read the limitations',
      'The scaffold is being dismantled and must not be accessed by any trade',
      'The scaffold inspection is overdue and a competent person has been called',
    ],
    correctAnswer: 1,
    explanation:
      'A yellow scaffold tag indicates that the scaffold has restrictions or limitations on its use. This could mean certain lifts are incomplete, loading restrictions apply, or specific areas are not to be accessed. Operatives must read and comply with all stated restrictions.',
    section: 'scaffolding-awareness',
    difficulty: 'basic',
    topic: 'Scaffold Inspection & Tagging',
    category: 'Scaffold Inspection & Tagging',
  },
  {
    id: 126,
    question: 'What does a RED scaffold tag indicate?',
    options: [
      'The scaffold is ready for heavy loading',
      'The scaffold is reserved for a specific trade',
      'The scaffold is incomplete, unsafe, or must not be used',
      'The scaffold inspection is overdue by one day',
    ],
    correctAnswer: 2,
    explanation:
      'A red scaffold tag means the scaffold is unsafe, incomplete, or must not be used under any circumstances. This could indicate that it is being erected, dismantled, has failed inspection, or has been damaged. No operative should access a red-tagged scaffold.',
    section: 'scaffolding-awareness',
    difficulty: 'basic',
    topic: 'Scaffold Inspection & Tagging',
    category: 'Scaffold Inspection & Tagging',
  },
  {
    id: 127,
    question:
      'What information must be recorded on a scaffold inspection report under the Work at Height Regulations?',
    options: [
      'Only a simple pass or fail result for the whole scaffold',
      'The hire charge for the scaffold and the expected dismantling date',
      'A photograph of every lift and a signed statement from each user',
      'The location, date, details of the scaffold, matters checked, and any action taken',
    ],
    correctAnswer: 3,
    explanation:
      'Schedule 7 of the Work at Height Regulations 2005 specifies that inspection reports must include the scaffold location and description, the date and time of inspection, details of matters checked, and any action required or taken to address defects.',
    section: 'scaffolding-awareness',
    difficulty: 'intermediate',
    topic: 'Scaffold Inspection & Tagging',
    category: 'Scaffold Inspection & Tagging',
  },
  {
    id: 128,
    question: 'How long must scaffold inspection records be kept on site?',
    options: [
      'Until the end of construction work at the site',
      'Until the scaffold is dismantled',
      'Until the next inspection',
      'For a minimum of 3 months after the inspection',
    ],
    correctAnswer: 0,
    explanation:
      "Scaffold inspection records must be kept available on site until the construction work is completed. After that, they should be retained for a further period as part of the project's health and safety file. This ensures a clear audit trail exists.",
    section: 'scaffolding-awareness',
    difficulty: 'intermediate',
    topic: 'Scaffold Inspection & Tagging',
    category: 'Scaffold Inspection & Tagging',
  },
  {
    id: 129,
    question: 'What should you do if you notice a scaffold tag is missing when you arrive at work?',
    options: [
      'Assume it is safe to use because the missing tag is only a paperwork issue',
      'Do not use the scaffold and report the missing tag to your supervisor immediately',
      'Carry on using the scaffold but write your own note confirming it looks safe',
      'Fit a green tag yourself so that other trades know it can be used',
    ],
    correctAnswer: 1,
    explanation:
      'If a scaffold tag is missing, you must not use the scaffold. The tag is your confirmation that the scaffold has been inspected and is safe. Report the missing tag to your supervisor so that the scaffold can be re-inspected before anyone uses it.',
    section: 'scaffolding-awareness',
    difficulty: 'basic',
    topic: 'Scaffold Inspection & Tagging',
    category: 'Scaffold Inspection & Tagging',
  },
  {
    id: 130,
    question:
      'During a scaffold inspection, which of the following would be considered a critical defect?',
    options: [
      'A small amount of mud on the boards',
      'A slightly faded scaffold tag',
      'Missing or damaged guardrails',
      'Scaffold boards that are slightly damp from rain',
    ],
    correctAnswer: 2,
    explanation:
      'Missing or damaged guardrails are a critical defect as they directly affect fall prevention. A scaffold with missing guardrails must not be used until the defect is rectified. Falls from height remain the leading cause of death in the construction industry.',
    section: 'scaffolding-awareness',
    difficulty: 'basic',
    topic: 'Scaffold Inspection & Tagging',
    category: 'Scaffold Inspection & Tagging',
  },
  {
    id: 131,
    question:
      'What should a competent person check regarding the scaffold base during an inspection?',
    options: [
      'That the guard rails and toe boards are at the correct heights',
      'That the scaffold tag has been signed and dated by the inspector',
      'That the boards on the top lift are free from splits and cracks',
      'That base plates are on sole boards, the ground is firm, and standards are plumb',
    ],
    correctAnswer: 3,
    explanation:
      'During a base inspection, the competent person should check that base plates are sitting on adequate sole boards, the ground is firm and has not been undermined by weather or excavation, and that the standards are plumb. Foundation failure is a common cause of scaffold collapse.',
    section: 'scaffolding-awareness',
    difficulty: 'intermediate',
    topic: 'Scaffold Inspection & Tagging',
    category: 'Scaffold Inspection & Tagging',
  },
  {
    id: 132,
    question: 'What is Schedule 7 of the Work at Height Regulations 2005?',
    options: [
      'The schedule that prescribes what must be included in a scaffold inspection report',
      'The schedule that sets the minimum width of a scaffold working platform',
      'The schedule that lists the duties of the principal designer under CDM 2015',
      'The schedule that defines the loading classes for scaffold platforms',
    ],
    correctAnswer: 0,
    explanation:
      'Schedule 7 of the Work at Height Regulations 2005 sets out the particulars that must be included in inspection reports for scaffolds and other working platforms. It ensures that inspection records are comprehensive, consistent, and legally compliant.',
    section: 'scaffolding-awareness',
    difficulty: 'intermediate',
    topic: 'Scaffold Inspection & Tagging',
    category: 'Scaffold Inspection & Tagging',
  },
  {
    id: 133,
    question: 'What should be checked regarding scaffold ties during an inspection?',
    options: [
      'That there are no more ties than the original design specified',
      'That they are present, secure, undamaged, and have not been removed or loosened',
      'That they are painted in a high-visibility colour for easy identification',
      'That they are fitted only at the top and bottom lifts of the scaffold',
    ],
    correctAnswer: 1,
    explanation:
      'During inspection, all scaffold ties must be checked to confirm they are present as per the design, securely fixed, undamaged, and have not been removed or loosened by other trades. Missing or damaged ties are a critical defect that must be addressed immediately.',
    section: 'scaffolding-awareness',
    difficulty: 'intermediate',
    topic: 'Scaffold Inspection & Tagging',
    category: 'Scaffold Inspection & Tagging',
  },
  {
    id: 134,
    question:
      'If a scaffold inspection reveals that boards are split or damaged, what action should be taken?',
    options: [
      'Turn the boards over so the damage is hidden',
      'Place a warning sign near the damaged boards',
      'The damaged boards must be replaced before the scaffold can be used',
      'Cover the damaged boards with plywood',
    ],
    correctAnswer: 2,
    explanation:
      'Split or damaged scaffold boards must be removed and replaced with sound boards before the scaffold can be used. Damaged boards can break under load, causing operatives to fall. Turning boards over or covering them does not address the safety risk.',
    section: 'scaffolding-awareness',
    difficulty: 'basic',
    topic: 'Scaffold Inspection & Tagging',
    category: 'Scaffold Inspection & Tagging',
  },
  {
    id: 135,
    question:
      'What is the competent person looking for when checking scaffold couplers during an inspection?',
    options: [
      'That they are all the same colour and from the same manufacturer',
      'That there are exactly two couplers fitted at every node point',
      'That they have been greased to prevent them from seizing up',
      'That they are tight, undamaged, and correctly positioned on the tubes',
    ],
    correctAnswer: 3,
    explanation:
      'The competent person must check that all couplers are adequately tightened (typically using a podger spanner), are free from damage or corrosion that could reduce their load-bearing capacity, and are correctly positioned on the scaffold tubes as per the design.',
    section: 'scaffolding-awareness',
    difficulty: 'intermediate',
    topic: 'Scaffold Inspection & Tagging',
    category: 'Scaffold Inspection & Tagging',
  },
  {
    id: 136,
    question: 'What should happen if a scaffold inspection is overdue?',
    options: [
      'The scaffold must not be used until it has been inspected by a competent person',
      'The scaffold can be used for one more day before the inspection is carried out',
      'The scaffold can be used as long as a pre-use visual check is done first',
      'The scaffold can be used provided no more than four operatives are on it',
    ],
    correctAnswer: 0,
    explanation:
      'If a scaffold inspection is overdue, the scaffold must not be used until a competent person has carried out the required inspection. Using a scaffold without a current inspection breaches the Work at Height Regulations 2005 and puts workers at risk.',
    section: 'scaffolding-awareness',
    difficulty: 'intermediate',
    topic: 'Scaffold Inspection & Tagging',
    category: 'Scaffold Inspection & Tagging',
  },
  {
    id: 137,
    question: 'During an inspection, what should be checked about the scaffold access points?',
    options: [
      'That the base plates sit on adequate sole boards and the ground is firm',
      'That access is safe, ladders are secured and extend above the platform, and stairways are clear',
      'That all ties are present, secure, and have not been removed by other trades',
      'That the guard rails and toe boards are present at the correct heights',
    ],
    correctAnswer: 1,
    explanation:
      'Access points must be inspected to ensure ladders are properly secured, extend at least 1 metre above the landing platform, and are at the correct angle. Internal stairways must be clear of obstructions, and trap doors must function correctly.',
    section: 'scaffolding-awareness',
    difficulty: 'intermediate',
    topic: 'Scaffold Inspection & Tagging',
    category: 'Scaffold Inspection & Tagging',
  },
  {
    id: 138,
    question: 'Who is responsible for ensuring that scaffold inspections are carried out on time?',
    options: [
      'The scaffold manufacturer who supplied the tubes and fittings',
      'The HSE inspector responsible for the local construction area',
      'The person on whose behalf the scaffold inspection is carried out (usually the principal contractor)',
      'Each individual operative who happens to use the scaffold that day',
    ],
    correctAnswer: 2,
    explanation:
      'The duty to arrange scaffold inspections falls on the person on whose behalf the work is being done, which on a construction site is typically the principal contractor. They must ensure a competent person inspects the scaffold at the required intervals.',
    section: 'scaffolding-awareness',
    difficulty: 'intermediate',
    topic: 'Scaffold Inspection & Tagging',
    category: 'Scaffold Inspection & Tagging',
  },
  {
    id: 139,
    question: "What is a 'pre-use check' of a scaffold, and who should carry it out?",
    options: [
      'A full structural inspection carried out by the scaffold designer',
      'A check of scaffold materials before they are delivered to site',
      'A check carried out only by the site manager once a month',
      'A visual check carried out by the user before each use to ensure nothing has obviously changed',
    ],
    correctAnswer: 3,
    explanation:
      'A pre-use check is a quick visual inspection that every scaffold user should carry out before each use. It is not a substitute for the formal 7-day inspection but helps identify obvious hazards such as missing boards, removed guardrails, or overloading.',
    section: 'scaffolding-awareness',
    difficulty: 'intermediate',
    topic: 'Scaffold Inspection & Tagging',
    category: 'Scaffold Inspection & Tagging',
  },
  {
    id: 140,
    question: 'What should be inspected regarding edge protection during a scaffold inspection?',
    options: [
      'That the top guardrail, mid-rail, and toe boards are all present, secure, and at the correct heights',
      'That the base plates and sole boards are sound and the ground is firm',
      'That the ties are present and have not been loosened by other trades',
      'That the access ladders are secured and extend above the platform',
    ],
    correctAnswer: 0,
    explanation:
      'A full inspection of edge protection requires checking that the top guardrail (at least 950mm high), mid-rail, and toe boards (at least 150mm high) are all present, securely fixed, and undamaged. All three elements work together to prevent falls and falling objects.',
    section: 'scaffolding-awareness',
    difficulty: 'intermediate',
    topic: 'Scaffold Inspection & Tagging',
    category: 'Scaffold Inspection & Tagging',
  },
  {
    id: 141,
    question: "What is meant by a 'competent person' in the context of scaffold inspections?",
    options: [
      'Anyone holding a valid construction site induction card for that site',
      'Someone with sufficient training, experience, and knowledge to identify risks and defects',
      'The most senior manager present on site at the time of the inspection',
      'Any operative who has worked on scaffolding for more than five years',
    ],
    correctAnswer: 1,
    explanation:
      'A competent person for scaffold inspections is someone who has a combination of practical and theoretical knowledge, training, and experience that enables them to identify risks and defects. The level of competence required depends on the complexity of the scaffold.',
    section: 'scaffolding-awareness',
    difficulty: 'basic',
    topic: 'Scaffold Inspection & Tagging',
    category: 'Scaffold Inspection & Tagging',
  },
  {
    id: 142,
    question:
      'If a scaffold has been substantially altered, what must happen before it can be used again?',
    options: [
      'It can be used straight away because the same scaffolders carried out the work',
      'It only needs a quick visual check by whoever is about to use it',
      'It must be re-inspected by a competent person and the tag updated accordingly',
      'It must wait until the next scheduled 7-day inspection before being used',
    ],
    correctAnswer: 2,
    explanation:
      "After any substantial alteration, the scaffold must be re-inspected by a competent person before it can be used. The scaffold tag must be updated to reflect the current status. This ensures that the alteration has not compromised the scaffold's safety.",
    section: 'scaffolding-awareness',
    difficulty: 'intermediate',
    topic: 'Scaffold Inspection & Tagging',
    category: 'Scaffold Inspection & Tagging',
  },
  {
    id: 143,
    question: 'What should you check about scaffold boards during an inspection?',
    options: [
      'That boards are all from the same manufacturer and the same batch',
      'That boards are painted in a high-visibility colour for easy identification',
      'That boards have been treated with a fire-retardant coating before use',
      'That boards are in good condition, properly supported, secured against uplift, and not overhanging excessively',
    ],
    correctAnswer: 3,
    explanation:
      'Scaffold boards must be checked for splits, cracks, rot, and warping. They must be properly supported with no more than 150mm overhang at each end, secured against wind uplift, and must not have excessive gaps between them that could trap a foot.',
    section: 'scaffolding-awareness',
    difficulty: 'intermediate',
    topic: 'Scaffold Inspection & Tagging',
    category: 'Scaffold Inspection & Tagging',
  },
  {
    id: 144,
    question:
      'What must happen when a scaffold inspection identifies defects that cannot be immediately rectified?',
    options: [
      'The affected area must be taken out of service, signed, and barriers erected until the defects are fixed',
      'The defects can be noted and left until the next 7-day inspection is due',
      'Work can continue if operatives are warned to avoid the affected area',
      'A green tag should be applied so users know the scaffold is being monitored',
    ],
    correctAnswer: 0,
    explanation:
      'If defects cannot be immediately rectified, the affected area of the scaffold must be taken out of service. Physical barriers must be erected to prevent access, and clear signage must indicate that the scaffold is not to be used. The scaffold tag should be changed to red.',
    section: 'scaffolding-awareness',
    difficulty: 'intermediate',
    topic: 'Scaffold Inspection & Tagging',
    category: 'Scaffold Inspection & Tagging',
  },
  {
    id: 145,
    question: 'What is the main purpose of the scaffold tag system?',
    options: [
      'To record the hire cost of the scaffold for the contractor’s accounts',
      'To clearly communicate the current safety status of the scaffold to all users',
      'To identify which scaffolding gang erected each section of the scaffold',
      'To replace the need for a written statutory inspection report',
    ],
    correctAnswer: 1,
    explanation:
      'The scaffold tag system provides a clear, visual means of communicating the current inspection and safety status of a scaffold to all users. It allows operatives to quickly determine whether a scaffold is safe to use, has restrictions, or must not be accessed.',
    section: 'scaffolding-awareness',
    difficulty: 'basic',
    topic: 'Scaffold Inspection & Tagging',
    category: 'Scaffold Inspection & Tagging',
  },
  {
    id: 146,
    question:
      'Under the Work at Height Regulations, what must the inspection report include about the person carrying out the inspection?',
    options: [
      'Only their initials, to keep the report brief and anonymous',
      'Their home address and personal contact telephone number',
      'Their name, qualifications, and the name of the employer for whom they carried out the inspection',
      'A photograph of the inspector standing on the completed scaffold',
    ],
    correctAnswer: 2,
    explanation:
      "The inspection report must include the name of the person who carried out the inspection and, where the inspection is carried out on behalf of an employer, the employer's name. This creates accountability and provides a point of contact for any queries about the inspection.",
    section: 'scaffolding-awareness',
    difficulty: 'advanced',
    topic: 'Scaffold Inspection & Tagging',
    category: 'Scaffold Inspection & Tagging',
  },
  {
    id: 147,
    question:
      'What should a scaffold inspector check regarding the relationship between the scaffold and adjacent structures?',
    options: [
      'That the scaffold is set at least 1 metre away from the building face',
      'That the building face is sheeted to protect it from the scaffold',
      'That the scaffold is the same height as the adjacent building',
      'That there are no gaps where a person could fall between the scaffold and the building face',
    ],
    correctAnswer: 3,
    explanation:
      'The inspector must check that gaps between the scaffold platform and the building face are not large enough for a person to fall through. If gaps exceed 225mm, additional measures such as infill platforms or extra guardrails must be provided to prevent falls.',
    section: 'scaffolding-awareness',
    difficulty: 'intermediate',
    topic: 'Scaffold Inspection & Tagging',
    category: 'Scaffold Inspection & Tagging',
  },
  {
    id: 148,
    question:
      'What is the significance of the date and time recorded on a scaffold inspection report?',
    options: [
      'It establishes when the inspection was carried out and when the next inspection is due',
      'It records how long the inspection itself took to complete',
      'It determines the hire period that the contractor will be charged for',
      'It sets the shift pattern for the operatives using the scaffold',
    ],
    correctAnswer: 0,
    explanation:
      'The date and time of inspection are essential as they establish when the inspection was carried out and allow calculation of when the next inspection is due (within 7 days). They also create a timeline of events that can be critical in any accident investigation.',
    section: 'scaffolding-awareness',
    difficulty: 'intermediate',
    topic: 'Scaffold Inspection & Tagging',
    category: 'Scaffold Inspection & Tagging',
  },
  {
    id: 149,
    question:
      'When inspecting a scaffold after high winds, what should the competent person pay particular attention to?',
    options: [
      'Only whether the scaffold tag is still legible and securely attached',
      'Whether ties are intact, bracing is undamaged, sheeting is secure, and the scaffold is still plumb',
      'Only whether the access ladders are still secured at each lift',
      'Only whether the boards on the top lift have dried out after the storm',
    ],
    correctAnswer: 1,
    explanation:
      'After high winds, the inspector must pay particular attention to the integrity of ties, bracing, and any sheeting or netting. They should also check that the scaffold remains plumb and level, as wind can cause movement, loosening, or damage to critical structural elements.',
    section: 'scaffolding-awareness',
    difficulty: 'intermediate',
    topic: 'Scaffold Inspection & Tagging',
    category: 'Scaffold Inspection & Tagging',
  },
  {
    id: 150,
    question: 'What should be checked about loading during a scaffold inspection?',
    options: [
      'That the heaviest materials are all stacked over a single transom for support',
      'That the scaffold is loaded to its full capacity to prove it is strong enough',
      'That the scaffold is not overloaded and that materials are evenly distributed as per the design loading class',
      'That materials are stored only at the very edge of the platform near the guard rail',
    ],
    correctAnswer: 2,
    explanation:
      'The inspector must check that the scaffold is not overloaded beyond its design capacity and that materials stored on the platform are distributed evenly. Point loads and excessive materials on one area can overload individual components and cause localised or progressive failure.',
    section: 'scaffolding-awareness',
    difficulty: 'intermediate',
    topic: 'Scaffold Inspection & Tagging',
    category: 'Scaffold Inspection & Tagging',
  },
  {
    id: 151,
    question: 'Can a scaffold user refuse to use a scaffold they believe is unsafe?',
    options: [
      'No, a worker must use any scaffold that has been tagged by their employer',
      'Only if the worker holds a CISRS scaffolder card themselves',
      'Only if a manager agrees in writing that the scaffold is unsafe',
      'Yes, every worker has the right to refuse to work on a scaffold they believe to be unsafe',
    ],
    correctAnswer: 3,
    explanation:
      'Under UK health and safety law, every worker has the right to refuse to carry out work they reasonably believe poses a serious and imminent danger. If you believe a scaffold is unsafe, you should report it to your supervisor and not use it until it has been checked.',
    section: 'scaffolding-awareness',
    difficulty: 'basic',
    topic: 'Scaffold Inspection & Tagging',
    category: 'Scaffold Inspection & Tagging',
  },
  {
    id: 152,
    question: "What does the inspection report need to state about the scaffold's intended use?",
    options: [
      'The type and purpose of the scaffold, including any loading classification',
      'The total cost of hiring the scaffold for the duration of the project',
      'The names of every trade that has booked time on the scaffold',
      'The date the scaffold is scheduled to be dismantled and removed',
    ],
    correctAnswer: 0,
    explanation:
      "The inspection report should clearly state the scaffold's intended use and loading classification. This is important because a scaffold designed for light duty (inspection access) is not suitable for heavy loading (masonry work) and users need to know the limitations.",
    section: 'scaffolding-awareness',
    difficulty: 'advanced',
    topic: 'Scaffold Inspection & Tagging',
    category: 'Scaffold Inspection & Tagging',
  },
  {
    id: 153,
    question:
      'What should be done if you discover that someone has removed guardrails from a scaffold to pass materials through?',
    options: [
      'Leave them off until the materials have all been passed through',
      'Report it immediately, stop work in that area, and ensure the guardrails are reinstated before work continues',
      'Refit only the top guardrail and carry on, as the mid-rail is optional',
      'Note it on the next inspection report but allow work to continue meanwhile',
    ],
    correctAnswer: 1,
    explanation:
      'Removing guardrails without authorisation is extremely dangerous and a common cause of falls from scaffolds. Work must stop immediately in the affected area, the situation must be reported, and the guardrails must be reinstated before anyone works on that section.',
    section: 'scaffolding-awareness',
    difficulty: 'intermediate',
    topic: 'Scaffold Inspection & Tagging',
    category: 'Scaffold Inspection & Tagging',
  },
  {
    id: 154,
    question:
      'During an inspection, corrosion is found on several scaffold tubes. What should the inspector assess?',
    options: [
      'Whether the corrosion has changed the colour of the tubes enough to fail a visual check',
      'Whether the corrosion has spread to the couplers and made them harder to tighten',
      'Whether the corrosion has reduced the wall thickness of the tubes to the point where their load-bearing capacity is compromised',
      'Whether the corrosion will rub off onto operatives’ clothing and gloves',
    ],
    correctAnswer: 2,
    explanation:
      'The inspector must assess whether corrosion has reduced the wall thickness of the tubes sufficiently to compromise their structural capacity. Heavily corroded tubes must be removed from service as they can fail under load, potentially causing scaffold collapse.',
    section: 'scaffolding-awareness',
    difficulty: 'advanced',
    topic: 'Scaffold Inspection & Tagging',
    category: 'Scaffold Inspection & Tagging',
  },
  {
    id: 155,
    question:
      'What should the competent person verify about the scaffold design during an inspection?',
    options: [
      'That the scaffold uses fewer components than the design to save on hire costs',
      'That the scaffold has been built taller than the design to allow for future work',
      'That the design has been signed by every operative who erected the scaffold',
      'That the scaffold conforms to the design or TG20 compliance sheet and no unauthorised modifications have been made',
    ],
    correctAnswer: 3,
    explanation:
      'The competent person should verify that the scaffold as built conforms to its design specification or TG20 compliance sheet. Any unauthorised modifications, such as removed ties, missing bracing, or altered configurations, must be identified and reported.',
    section: 'scaffolding-awareness',
    difficulty: 'advanced',
    topic: 'Scaffold Inspection & Tagging',
    category: 'Scaffold Inspection & Tagging',
  },
  {
    id: 156,
    question:
      'Why must scaffold inspection results be communicated to all site workers, not just management?',
    options: [
      'So that all workers know the current status of each scaffold and can avoid unsafe scaffolds',
      'So that the inspection cost can be shared fairly between the trades',
      'So that workers can decide for themselves whether an inspection was needed',
      'So that management can identify who last worked on the scaffold',
    ],
    correctAnswer: 0,
    explanation:
      'All site workers who may use the scaffold need to know its current status. The scaffold tag system is the primary means of communicating this, but toolbox talks and site briefings also help ensure everyone is aware of any restrictions or hazards.',
    section: 'scaffolding-awareness',
    difficulty: 'intermediate',
    topic: 'Scaffold Inspection & Tagging',
    category: 'Scaffold Inspection & Tagging',
  },
  {
    id: 157,
    question: 'What should the inspector check regarding the ground conditions beneath a scaffold?',
    options: [
      'That the ground beneath the scaffold has been tarmacked over for tidiness',
      'That the ground has not been disturbed by excavation, is not waterlogged, and sole boards are adequate',
      'That the ground is the same level as the top of the adjacent building',
      'That the ground has been fenced off so the public cannot stand on it',
    ],
    correctAnswer: 1,
    explanation:
      'Ground conditions can change over time due to weather, excavation works nearby, or vehicle movements. The inspector must check that the ground beneath the scaffold remains firm, has not been undermined or become waterlogged, and that sole boards remain in good condition.',
    section: 'scaffolding-awareness',
    difficulty: 'intermediate',
    topic: 'Scaffold Inspection & Tagging',
    category: 'Scaffold Inspection & Tagging',
  },
  {
    id: 158,
    question:
      'What is the minimum that a scaffold inspection must include according to Schedule 7?',
    options: [
      'A verbal report given to the site manager at the daily briefing',
      'A simple tick on the scaffold tag confirming it has been checked',
      'A written or electronic record covering all matters specified in Schedule 7 of the WAH Regulations',
      'A photograph of the scaffold taken from ground level on the inspection day',
    ],
    correctAnswer: 2,
    explanation:
      'Schedule 7 requires a formal written or electronic record that covers specific matters including the name and address of the person for whom the inspection was carried out, the location and description of the scaffold, results of the inspection, and any required actions.',
    section: 'scaffolding-awareness',
    difficulty: 'intermediate',
    topic: 'Scaffold Inspection & Tagging',
    category: 'Scaffold Inspection & Tagging',
  },
  {
    id: 159,
    question:
      "What action should be taken if an inspection reveals that the scaffold's loading classification has been exceeded?",
    options: [
      'Add extra standards beneath the platform so the overload is supported',
      'Spread the excess materials more thinly so the load class no longer applies',
      'Note the overload on the tag and allow work to continue under supervision',
      'The excess materials must be removed immediately and the scaffold checked for damage before resuming use',
    ],
    correctAnswer: 3,
    explanation:
      'If a scaffold has been overloaded, the excess materials must be removed immediately. The scaffold must then be thoroughly checked for any damage to components caused by the overloading, such as bent tubes or slipped couplers, before it can be used again.',
    section: 'scaffolding-awareness',
    difficulty: 'intermediate',
    topic: 'Scaffold Inspection & Tagging',
    category: 'Scaffold Inspection & Tagging',
  },
  {
    id: 160,
    question: 'What role does a scaffold inspection play in an accident investigation?',
    options: [
      "Inspection records provide evidence of the scaffold's condition and whether it was properly maintained",
      "Inspection records prove who owned the scaffold and who paid for the hire",
      "Inspection records establish which trades were booked onto the scaffold",
      "Inspection records confirm the scaffold met the architect's design intent",
    ],
    correctAnswer: 0,
    explanation:
      'Scaffold inspection records are critical evidence in any accident investigation. They demonstrate whether the scaffold was being properly maintained, whether defects were identified and addressed, and whether the duty holder was complying with their legal obligations.',
    section: 'scaffolding-awareness',
    difficulty: 'advanced',
    topic: 'Scaffold Inspection & Tagging',
    category: 'Scaffold Inspection & Tagging',
  },
  {
    id: 161,
    question: 'What is the leading cause of fatal accidents in the UK construction industry?',
    options: [
      'Electrocution',
      'Falls from height',
      'Being struck by a vehicle',
      'Exposure to harmful substances',
    ],
    correctAnswer: 1,
    explanation:
      'Falls from height are consistently the leading cause of fatal accidents in the UK construction industry. This is why the Work at Height Regulations 2005 exist and why scaffold safety is given such high priority on construction sites.',
    section: 'scaffolding-awareness',
    difficulty: 'basic',
    topic: 'Safe Use & Hazard Awareness',
    category: 'Safe Use & Hazard Awareness',
  },
  {
    id: 162,
    question: 'What should you always do before stepping onto a scaffold platform?',
    options: [
      'Carry out a full structural inspection and complete a Schedule 7 report',
      'Tie yourself onto the scaffold with a harness and lanyard before climbing',
      'Check for a valid scaffold tag and carry out a visual pre-use check',
      'Add an extra board to the platform in case the existing ones are weak',
    ],
    correctAnswer: 2,
    explanation:
      'Before using any scaffold, you should check for a valid green or yellow scaffold tag and carry out a quick visual pre-use check. Look for obvious defects such as missing boards, removed guardrails, excessive materials, or damage to the structure.',
    section: 'scaffolding-awareness',
    difficulty: 'basic',
    topic: 'Safe Use & Hazard Awareness',
    category: 'Safe Use & Hazard Awareness',
  },
  {
    id: 163,
    question: 'What is the most common cause of scaffold collapse?',
    options: [
      'Boards that have become damp after rain',
      'Couplers that have not been painted',
      'Using more lifts than the trade actually needs',
      'Failure of ties, overloading, or inadequate foundations',
    ],
    correctAnswer: 3,
    explanation:
      'The most common causes of scaffold collapse include tie failure or removal, overloading beyond design capacity, and inadequate foundations. These factors, often in combination, account for the majority of scaffold collapse incidents in the UK.',
    section: 'scaffolding-awareness',
    difficulty: 'intermediate',
    topic: 'Safe Use & Hazard Awareness',
    category: 'Safe Use & Hazard Awareness',
  },
  {
    id: 164,
    question: 'What PPE should you wear as a minimum when working on a scaffold?',
    options: [
      'Hard hat, high-visibility clothing, and safety footwear as a minimum',
      'A harness and lanyard only, with no other protective equipment',
      'Ear defenders and a dust mask only, regardless of the task',
      'Safety footwear only, as a hard hat is not needed on a tagged scaffold',
    ],
    correctAnswer: 0,
    explanation:
      'As a minimum, you should wear a hard hat (to protect against falling objects), high-visibility clothing (so you can be seen by others), and safety footwear with good grip (to prevent slips and protect your feet). Additional PPE may be required depending on the task.',
    section: 'scaffolding-awareness',
    difficulty: 'basic',
    topic: 'Safe Use & Hazard Awareness',
    category: 'Safe Use & Hazard Awareness',
  },
  {
    id: 165,
    question:
      'What is the maximum safe working wind speed generally cited for working on most standard scaffolds?',
    options: [
      'Approximately 5 mph (Beaufort scale force 1) as a fixed legal limit',
      'Approximately 23 mph (Beaufort scale force 5) as a general guide, subject to risk assessment',
      'Approximately 55 mph (Beaufort scale force 9) as a fixed legal limit',
      'There is no need to consider wind speed once a scaffold is tied to a building',
    ],
    correctAnswer: 1,
    explanation:
      'As a general guide, work on scaffolds should be carefully assessed when winds reach around 23 mph (force 5). However, the actual limit depends on the specific scaffold design, height, exposure, and whether the scaffold is sheeted. A site-specific risk assessment should determine the limit.',
    section: 'scaffolding-awareness',
    difficulty: 'intermediate',
    topic: 'Safe Use & Hazard Awareness',
    category: 'Safe Use & Hazard Awareness',
  },
  {
    id: 166,
    question: 'Why should materials never be thrown from a scaffold?',
    options: [
      'Because it can damage the materials being thrown and waste money',
      'Because it puts extra strain on the operative’s shoulder and back',
      'Because falling objects can cause serious injury or death to people below',
      'Because it makes the scaffold platform untidy and harder to keep clear',
    ],
    correctAnswer: 2,
    explanation:
      'Throwing materials from a scaffold creates a serious risk of injury or death to people below. Objects must be lowered using suitable means such as a rubbish chute, crane, or hoist. Brick guards and toe boards help prevent accidental falls of materials.',
    section: 'scaffolding-awareness',
    difficulty: 'basic',
    topic: 'Safe Use & Hazard Awareness',
    category: 'Safe Use & Hazard Awareness',
  },
  {
    id: 167,
    question: 'What should you do if you notice that scaffold boards are covered in ice or frost?',
    options: [
      'Carry on working but move more slowly and hold the guard rail at all times',
      'Spread sawdust on the boards and continue working straight away',
      'Only use the lower lifts where ice is less likely to have formed',
      'Do not use the scaffold until the ice or frost has been cleared or treated to prevent slips',
    ],
    correctAnswer: 3,
    explanation:
      'Ice and frost make scaffold platforms extremely slippery and significantly increase the risk of falls. The scaffold should not be used until the boards have been cleared or gritted. Working on icy platforms, even with guardrails, is dangerous.',
    section: 'scaffolding-awareness',
    difficulty: 'intermediate',
    topic: 'Safe Use & Hazard Awareness',
    category: 'Safe Use & Hazard Awareness',
  },
  {
    id: 168,
    question: "What is 'scaffold overloading' and why is it dangerous?",
    options: [
      'Placing more weight on the scaffold than its design allows, which can cause collapse',
      'Fitting more ties to the building than the scaffold design requires',
      'Building the scaffold higher than the building it is serving',
      'Leaving materials on the scaffold overnight instead of removing them',
    ],
    correctAnswer: 0,
    explanation:
      'Scaffold overloading occurs when the weight of materials, equipment, and people on the scaffold exceeds the design loading capacity. This can cause individual components to fail, leading to localised or progressive collapse of the entire scaffold.',
    section: 'scaffolding-awareness',
    difficulty: 'basic',
    topic: 'Safe Use & Hazard Awareness',
    category: 'Safe Use & Hazard Awareness',
  },
  {
    id: 169,
    question: 'What is a brick guard and why is it important?',
    options: [
      'A timber board fixed flat to the platform to spread the weight of bricks',
      'A mesh panel fitted above the toe board to prevent materials and debris falling from the scaffold',
      'A protective glove worn when handling bricks to prevent cuts and grazes',
      'A reinforced bay where bricks are landed on the scaffold by crane',
    ],
    correctAnswer: 1,
    explanation:
      'A brick guard is a mesh panel fitted between the toe board and the guardrail. It prevents small objects, tools, and debris from falling off the scaffold and striking people below. It is particularly important when working above public areas or other workers.',
    section: 'scaffolding-awareness',
    difficulty: 'intermediate',
    topic: 'Safe Use & Hazard Awareness',
    category: 'Safe Use & Hazard Awareness',
  },
  {
    id: 170,
    question: 'What is the correct way to access a scaffold?',
    options: [
      'Climb up the outside of the scaffold using the ledgers as footholds',
      'Pull yourself up using the diagonal bracing tubes on the scaffold face',
      'Use the designated access points such as internal ladders or staircases provided',
      'Lean a separate ladder against the nearest section of the scaffold',
    ],
    correctAnswer: 2,
    explanation:
      'Scaffolds must only be accessed using the designated access points, typically internal ladders secured at each lift or scaffold staircases. Climbing the outside of the scaffold or using unauthorised access routes is extremely dangerous and prohibited.',
    section: 'scaffolding-awareness',
    difficulty: 'basic',
    topic: 'Safe Use & Hazard Awareness',
    category: 'Safe Use & Hazard Awareness',
  },
  {
    id: 171,
    question:
      'What is the danger of using a scaffold as an anchor point for a gin wheel or crane without authorisation?',
    options: [
      "The lifting rope can chafe against the scaffold tubes and fray over time",
      "It blocks the designated access ladder while lifting is taking place",
      "It voids the manufacturer's warranty on the scaffold couplers",
      "The additional point loads and dynamic forces can exceed the scaffold's design capacity, causing failure",
    ],
    correctAnswer: 3,
    explanation:
      'Using a scaffold as an anchor for lifting equipment introduces concentrated point loads and dynamic forces that the scaffold may not have been designed to withstand. This can cause localised failure or progressive collapse of the structure. Any such use must be assessed and approved by the scaffold designer.',
    section: 'scaffolding-awareness',
    difficulty: 'advanced',
    topic: 'Safe Use & Hazard Awareness',
    category: 'Safe Use & Hazard Awareness',
  },
  {
    id: 172,
    question: 'Why is it dangerous to store excessive materials on a scaffold platform?',
    options: [
      'It can overload the scaffold beyond its design capacity and create trip hazards on the platform',
      'It makes the scaffold harder to dismantle at the end of the project',
      'It can scratch the scaffold boards and reduce their resale value',
      'It blocks the view of the scaffold tag from ground level',
    ],
    correctAnswer: 0,
    explanation:
      'Excessive materials on a scaffold platform can overload the structure beyond its design capacity, leading to structural failure. They also create trip hazards, reduce the working space available, and can block access and escape routes on the platform.',
    section: 'scaffolding-awareness',
    difficulty: 'intermediate',
    topic: 'Safe Use & Hazard Awareness',
    category: 'Safe Use & Hazard Awareness',
  },
  {
    id: 173,
    question:
      'What should you do if you see someone altering a scaffold who is not a qualified scaffolder?',
    options: [
      'Help them so the alteration is finished quickly and work can resume',
      'Stop them if safe to do so, and report the matter to your supervisor immediately',
      'Ignore it, as any worker on site is allowed to move scaffold tubes',
      'Wait until they have finished and then check the scaffold yourself',
    ],
    correctAnswer: 1,
    explanation:
      "Only trained and competent scaffolders should alter scaffold structures. Unauthorised alterations can compromise the scaffold's structural integrity and safety. If you see someone altering a scaffold without authorisation, stop them if safe to do so and report it immediately.",
    section: 'scaffolding-awareness',
    difficulty: 'intermediate',
    topic: 'Safe Use & Hazard Awareness',
    category: 'Safe Use & Hazard Awareness',
  },
  {
    id: 174,
    question: 'What is the risk of working on a scaffold during an electrical storm?',
    options: [
      'Rain from the storm makes the boards slippery and harder to grip',
      'The noise of thunder distracts operatives from the task in hand',
      'Metal scaffold structures can conduct lightning strikes, creating an extreme electrocution risk',
      'Wind during the storm can blow loose materials off the platform',
    ],
    correctAnswer: 2,
    explanation:
      'Metal scaffold structures are excellent conductors of electricity. During an electrical storm, a lightning strike on or near the scaffold could be conducted through the metal tubes, creating an extreme electrocution risk for anyone on or touching the scaffold. Work must stop immediately.',
    section: 'scaffolding-awareness',
    difficulty: 'intermediate',
    topic: 'Safe Use & Hazard Awareness',
    category: 'Safe Use & Hazard Awareness',
  },
  {
    id: 175,
    question: 'What responsibility does every scaffold user have under health and safety law?',
    options: [
      'To carry out the statutory 7-day inspection of any scaffold they use',
      'To erect their own edge protection before stepping onto a platform',
      'To pay for any damage caused to the scaffold while they are using it',
      'To take reasonable care of their own safety and that of others, and to report any defects they find',
    ],
    correctAnswer: 3,
    explanation:
      'Under the Health and Safety at Work etc. Act 1974, every worker has a duty to take reasonable care of their own safety and that of others who may be affected by their actions. This includes reporting any scaffold defects, not making unauthorised alterations, and following safe working procedures.',
    section: 'scaffolding-awareness',
    difficulty: 'intermediate',
    topic: 'Safe Use & Hazard Awareness',
    category: 'Safe Use & Hazard Awareness',
  },
  {
    id: 176,
    question:
      'What should be established at ground level around a scaffold where there is a risk of falling objects?',
    options: [
      'An exclusion zone with barriers and warning signs to keep people away from the danger area',
      'A storage compound where materials are kept until they are needed',
      'A designated smoking area sited well clear of the scaffold',
      'A first-aid point staffed whenever work is taking place at height',
    ],
    correctAnswer: 0,
    explanation:
      'Where there is a risk of falling objects, an exclusion zone must be established at ground level using barriers and clear warning signs. This prevents unauthorised access to the danger area and protects people from being struck by falling materials or tools.',
    section: 'scaffolding-awareness',
    difficulty: 'intermediate',
    topic: 'Safe Use & Hazard Awareness',
    category: 'Safe Use & Hazard Awareness',
  },
  {
    id: 177,
    question:
      'What action should you take if you feel unwell or dizzy whilst working on a scaffold at height?',
    options: [
      'Sit down on the platform and keep working once the feeling passes',
      'Stop work, inform a colleague, and descend to ground level carefully using the proper access route',
      'Clip on a harness and continue working in case you fall',
      'Lean against the guard rail until you feel steady again',
    ],
    correctAnswer: 1,
    explanation:
      'If you feel unwell or dizzy at height, you should stop work immediately, inform a nearby colleague, and carefully descend to ground level using the proper access route. Continuing to work whilst unwell at height significantly increases the risk of a fall.',
    section: 'scaffolding-awareness',
    difficulty: 'basic',
    topic: 'Safe Use & Hazard Awareness',
    category: 'Safe Use & Hazard Awareness',
  },
  {
    id: 178,
    question:
      'Why must scaffold platforms be kept clear of unnecessary materials, tools, and debris?',
    options: [
      'To keep the scaffold looking tidy for the client and passers-by',
      'To make it easier to dismantle the scaffold at the end of the job',
      'To prevent trip hazards, reduce overloading risks, and maintain clear access and escape routes',
      'To stop the boards becoming scratched and losing their resale value',
    ],
    correctAnswer: 2,
    explanation:
      'Keeping scaffold platforms clear is essential for safety. Loose materials create trip hazards that can cause falls, accumulated weight can overload the scaffold, and clutter can block access routes and emergency escape paths. Good housekeeping is a fundamental safety requirement.',
    section: 'scaffolding-awareness',
    difficulty: 'intermediate',
    topic: 'Safe Use & Hazard Awareness',
    category: 'Safe Use & Hazard Awareness',
  },
  {
    id: 179,
    question: 'What is the main danger if a scaffold is erected on soft or uncompacted ground?',
    options: [
      'The ties will pull free from the building as the ground settles',
      'The scaffold boards will absorb moisture and warp out of shape',
      'The couplers will corrode more quickly in the damp ground conditions',
      'The standards can sink unevenly, causing the scaffold to become unstable and potentially collapse',
    ],
    correctAnswer: 3,
    explanation:
      'Soft or uncompacted ground can cause scaffold standards to sink unevenly, leading to the scaffold leaning, becoming unstable, and potentially collapsing. This is why adequate sole boards and firm ground are essential requirements for scaffold foundations.',
    section: 'scaffolding-awareness',
    difficulty: 'intermediate',
    topic: 'Safe Use & Hazard Awareness',
    category: 'Safe Use & Hazard Awareness',
  },
  {
    id: 180,
    question: "What is a 'loading bay' on a scaffold and what precaution must be taken?",
    options: [
      'A section of scaffold designed for receiving materials by crane, which must have a gate that is kept closed except during loading',
      'A storage compound at ground level beside the scaffold, which must be fenced off from the public',
      'A short raised platform within a bay, which must be reached using a hop-up bracket',
      'An internal lift used for storing scaffold boards, which must be kept locked when unattended',
    ],
    correctAnswer: 0,
    explanation:
      'A loading bay is a purpose-designed section of the scaffold where materials can be landed by crane or hoist. It must have a gate that remains closed except when materials are actively being loaded or unloaded, to prevent falls from the open edge.',
    section: 'scaffolding-awareness',
    difficulty: 'intermediate',
    topic: 'Safe Use & Hazard Awareness',
    category: 'Safe Use & Hazard Awareness',
  },
  {
    id: 181,
    question: 'When is a harness and lanyard required on a scaffold?',
    options: [
      'At all times when standing on any fully boarded and guarded platform',
      'When the risk assessment identifies a residual fall risk that guardrails alone cannot control, such as during erection or dismantling',
      'Only when the scaffold is taller than four lifts above the ground',
      'Only when more than one operative is working on the same platform',
    ],
    correctAnswer: 1,
    explanation:
      'Harnesses are typically required during scaffold erection and dismantling when full edge protection is not yet in place, or where the risk assessment identifies a specific residual fall risk. For normal use on a fully guarded scaffold, collective protection (guardrails) is the primary fall prevention measure.',
    section: 'scaffolding-awareness',
    difficulty: 'advanced',
    topic: 'Safe Use & Hazard Awareness',
    category: 'Safe Use & Hazard Awareness',
  },
  {
    id: 182,
    question:
      'What is the danger of leaning ladders against a scaffold to create an unauthorised access point?',
    options: [
      'It is slower than using the internal ladders provided on the scaffold',
      'It can scratch the scaffold tubes and damage their protective coating',
      'The ladder may not be properly secured, the scaffold may not be designed for this load point, and it bypasses controlled access',
      'It blocks the scaffold tag from being seen clearly at ground level',
    ],
    correctAnswer: 2,
    explanation:
      'Leaning an unsecured ladder against a scaffold creates multiple hazards: the ladder may slip or fall, the scaffold may not be designed for the point load at that location, and it bypasses the controlled access points where proper edge protection is provided.',
    section: 'scaffolding-awareness',
    difficulty: 'intermediate',
    topic: 'Safe Use & Hazard Awareness',
    category: 'Safe Use & Hazard Awareness',
  },
  {
    id: 183,
    question: 'What effect can heavy rain have on scaffold safety?',
    options: [
      'It washes the protective coating off the tubes and accelerates corrosion',
      'It causes the ties to expand and pull away from the building face',
      'It dilutes any grease on the couplers, making them seize up',
      'Platforms become slippery, ground conditions can deteriorate, and water can add weight to the scaffold',
    ],
    correctAnswer: 3,
    explanation:
      'Heavy rain creates multiple scaffold hazards: platforms become slippery and increase fall risk, ground beneath the scaffold can soften or become waterlogged affecting foundations, and accumulated water on sheeting or in containers adds weight that can overload the structure.',
    section: 'scaffolding-awareness',
    difficulty: 'intermediate',
    topic: 'Safe Use & Hazard Awareness',
    category: 'Safe Use & Hazard Awareness',
  },
  {
    id: 184,
    question:
      'What is the correct procedure if you discover a scaffold defect during your working day?',
    options: [
      'Stop using the affected area, report the defect to your supervisor immediately, and do not return until the defect is rectified',
      'Attempt to repair the defect yourself so that work is not held up',
      'Carry on working but avoid putting any weight on the affected area',
      'Wait until the next 7-day inspection and let the inspector deal with it',
    ],
    correctAnswer: 0,
    explanation:
      'If you discover a scaffold defect, you must stop using the affected area immediately and report it to your supervisor without delay. The defect must be assessed and rectified by a competent scaffolder before anyone can safely work in that area again.',
    section: 'scaffolding-awareness',
    difficulty: 'basic',
    topic: 'Safe Use & Hazard Awareness',
    category: 'Safe Use & Hazard Awareness',
  },
  {
    id: 185,
    question: 'Why should operatives not sit on or lean over scaffold guardrails?',
    options: [
      'Because it can bend the guardrail and spoil the appearance of the scaffold',
      'Because guardrails are not designed to support body weight in that manner, and doing so can lead to a fall over the edge',
      'Because it can loosen the couplers that hold the guardrail in place over time',
      'Because it blocks the view of the scaffold tag for other operatives',
    ],
    correctAnswer: 1,
    explanation:
      'Scaffold guardrails are designed to prevent accidental falls, not to support the full weight of a person leaning on or sitting on them. Leaning over or sitting on guardrails raises your centre of gravity above the protection and can result in a fall from height.',
    section: 'scaffolding-awareness',
    difficulty: 'intermediate',
    topic: 'Safe Use & Hazard Awareness',
    category: 'Safe Use & Hazard Awareness',
  },
  {
    id: 186,
    question:
      'What is the main risk associated with using a mobile phone whilst working on a scaffold at height?',
    options: [
      'The phone signal can interfere with nearby lifting equipment controls',
      'The phone may slip from your hand and fall onto people below',
      'Distraction that can lead to falls, trips, or walking into hazards',
      'The battery can overheat and become a fire risk on the platform',
    ],
    correctAnswer: 2,
    explanation:
      'Using a mobile phone at height causes distraction, which can lead to falls, trips, or collisions with scaffold components. Workers may not be aware of their surroundings, step off the edge of platforms, or fail to notice overhead hazards while distracted.',
    section: 'scaffolding-awareness',
    difficulty: 'basic',
    topic: 'Safe Use & Hazard Awareness',
    category: 'Safe Use & Hazard Awareness',
  },
  {
    id: 187,
    question:
      'What loading class of scaffold is typically suitable for general construction work such as bricklaying?',
    options: [
      'Class 1 — Inspection and very light duty',
      'Class 2 — Light duty',
      'Class 6 — Masonry or heavy duty',
      'Class 3 — General purpose',
    ],
    correctAnswer: 3,
    explanation:
      'Class 3 (general purpose) scaffolds are designed for general construction activities and can typically support a uniformly distributed load of 2.0 kN/m2. For heavier work such as blockwork with stacked materials, Class 4 or higher may be required. Always check the scaffold tag for the loading class.',
    section: 'scaffolding-awareness',
    difficulty: 'intermediate',
    topic: 'Safe Use & Hazard Awareness',
    category: 'Safe Use & Hazard Awareness',
  },
  {
    id: 188,
    question:
      'Why must you never attach any sheeting, signage, or banners to a scaffold without authorisation?',
    options: [
      'Because it increases wind loading and can make the scaffold unstable if the ties are not designed for the additional load',
      'Because it hides the scaffold tag and stops trades reading its status',
      'Because it makes the scaffold harder and slower to dismantle later',
      'Because the fixings can scratch the protective coating on the tubes',
    ],
    correctAnswer: 0,
    explanation:
      'Attaching sheeting, banners, or signs to a scaffold increases the surface area exposed to wind, which significantly increases the wind loading on the scaffold. If the scaffold ties were not designed for this additional load, it can become unstable and collapse in windy conditions.',
    section: 'scaffolding-awareness',
    difficulty: 'intermediate',
    topic: 'Safe Use & Hazard Awareness',
    category: 'Safe Use & Hazard Awareness',
  },
  {
    id: 189,
    question: 'What is the emergency procedure if a scaffold begins to show signs of collapse?',
    options: [
      'Quickly add extra ties and bracing to try to stabilise the scaffold',
      'Evacuate the scaffold and surrounding area immediately, raise the alarm, and do not re-enter until declared safe',
      'Continue working but keep close to the access ladder in case you need to leave',
      'Remove materials from the platform to reduce the load and carry on',
    ],
    correctAnswer: 1,
    explanation:
      'If a scaffold shows any signs of collapse, such as leaning, unusual movement, or cracking sounds, everyone must evacuate the scaffold and the surrounding area immediately. Raise the alarm, establish an exclusion zone, and do not allow anyone to re-enter until the scaffold has been assessed by a competent person.',
    section: 'scaffolding-awareness',
    difficulty: 'intermediate',
    topic: 'Safe Use & Hazard Awareness',
    category: 'Safe Use & Hazard Awareness',
  },
  {
    id: 190,
    question: 'What is the danger of using a scaffold in the dark without adequate lighting?',
    options: [
      'The scaffold tubes contract in the cold night air and loosen the couplers',
      'The scaffold tag cannot be read, so its inspection status is unknown',
      'Workers cannot see hazards, trip risks, or the edges of the platform, significantly increasing the risk of falls',
      'Condensation forms on the boards overnight and washes off any grit',
    ],
    correctAnswer: 2,
    explanation:
      'Working on a scaffold without adequate lighting is extremely dangerous. Workers cannot see trip hazards, gaps in platforms, the edge of the scaffold, or other risks. Adequate artificial lighting must be provided if natural light is insufficient for safe working.',
    section: 'scaffolding-awareness',
    difficulty: 'intermediate',
    topic: 'Safe Use & Hazard Awareness',
    category: 'Safe Use & Hazard Awareness',
  },
  {
    id: 191,
    question: 'What is the maximum gap permitted between scaffold boards on a platform?',
    options: [
      'Any gap is acceptable if you are careful',
      'No gap at all under any circumstances',
      '100mm',
      '25mm',
    ],
    correctAnswer: 3,
    explanation:
      'The maximum gap between scaffold boards should not exceed 25mm. Larger gaps create a risk of tools, materials, or debris falling through to levels below, and can also present a trip hazard or allow a foot to become trapped.',
    section: 'scaffolding-awareness',
    difficulty: 'intermediate',
    topic: 'Safe Use & Hazard Awareness',
    category: 'Safe Use & Hazard Awareness',
  },
  {
    id: 192,
    question:
      'Why is it prohibited to use scaffold components (tubes, boards, fittings) that are not fit for purpose?',
    options: [
      'Because damaged, corroded, or substandard components may fail under load, causing collapse or falls',
      'Because unfit components make the scaffold harder to dismantle later',
      'Because mixing component types voids the manufacturer’s warranty',
      'Because substandard components spoil the appearance of the finished scaffold',
    ],
    correctAnswer: 0,
    explanation:
      'Scaffold components that are damaged, heavily corroded, bent, or otherwise unfit for purpose may have significantly reduced load-bearing capacity. Using such components risks them failing under the loads they are subjected to, which can cause localised failure, falls, or full scaffold collapse.',
    section: 'scaffolding-awareness',
    difficulty: 'intermediate',
    topic: 'Safe Use & Hazard Awareness',
    category: 'Safe Use & Hazard Awareness',
  },
  {
    id: 193,
    question: 'What is the purpose of a scaffold rescue plan?',
    options: [
      'To set out the safe sequence for erecting and dismantling the scaffold',
      'To ensure there is a pre-planned procedure for rescuing a worker who has fallen and is suspended in a harness or is otherwise stranded on the scaffold',
      'To record the result of each statutory 7-day inspection of the scaffold',
      'To confirm the scaffold has been handed over and is safe for the trades to use',
    ],
    correctAnswer: 1,
    explanation:
      'A scaffold rescue plan sets out how to rescue a worker who has fallen and is suspended in a harness (suspension trauma is a serious risk) or is otherwise stranded or injured on the scaffold. It must be site-specific, rehearsed, and available before work at height begins.',
    section: 'scaffolding-awareness',
    difficulty: 'advanced',
    topic: 'Safe Use & Hazard Awareness',
    category: 'Safe Use & Hazard Awareness',
  },
  {
    id: 194,
    question: "What is 'suspension trauma' and why is it relevant to scaffold work?",
    options: [
      'A condition caused by working too long at height without a rest break',
      'The dizziness some workers feel when first looking down from a tall scaffold',
      'A life-threatening condition that occurs when a person is suspended motionless in a harness, causing blood to pool in the legs',
      'The strain injury caused by repeatedly hauling materials up by rope',
    ],
    correctAnswer: 2,
    explanation:
      'Suspension trauma (orthostatic intolerance) occurs when a person hangs motionless in a harness after a fall. Blood pools in the legs, reducing circulation to vital organs, and can cause unconsciousness and death within minutes. This is why a prompt rescue plan is essential.',
    section: 'scaffolding-awareness',
    difficulty: 'advanced',
    topic: 'Safe Use & Hazard Awareness',
    category: 'Safe Use & Hazard Awareness',
  },
  {
    id: 195,
    question:
      'What should you do if you see a member of the public attempting to climb onto a construction scaffold?',
    options: [
      'Ignore them, as the public are responsible for their own safety',
      'Let them climb up so you can keep an eye on them from the platform',
      'Wait until they reach the top before asking them to come down',
      'Warn them of the danger, ask them to stop, and report it to your supervisor so security measures can be improved',
    ],
    correctAnswer: 3,
    explanation:
      'Unauthorised access to scaffolds by members of the public is extremely dangerous. You should warn them of the danger and ask them to stop. Report the incident to your supervisor so that site security measures, such as ladder guards and fencing, can be reviewed and improved.',
    section: 'scaffolding-awareness',
    difficulty: 'intermediate',
    topic: 'Safe Use & Hazard Awareness',
    category: 'Safe Use & Hazard Awareness',
  },
  {
    id: 196,
    question:
      'What additional precaution is needed when a scaffold is erected over a public footpath?',
    options: [
      'A covered walkway (fan or tunnel) must be provided to protect pedestrians from falling objects',
      'A reinforced loading bay must be added so deliveries do not block the path',
      'An additional set of guard rails must be fitted on the inside of the scaffold',
      'A second access ladder must be provided so the public can reach the platform',
    ],
    correctAnswer: 0,
    explanation:
      'When a scaffold is erected over a public footpath, a covered walkway must be provided to protect pedestrians from falling objects. This typically takes the form of a scaffold fan or tunnel with close-boarded protection and adequate lighting.',
    section: 'scaffolding-awareness',
    difficulty: 'intermediate',
    topic: 'Safe Use & Hazard Awareness',
    category: 'Safe Use & Hazard Awareness',
  },
  {
    id: 197,
    question: 'What is the effect of snow loading on a scaffold?',
    options: [
      'Snow insulates the tubes and prevents them corroding in winter',
      'Accumulated snow adds significant weight to platforms, can block access, and creates slip hazards',
      'Snow makes the scaffold tag easier to read against the white background',
      'Snow has no effect on scaffold safety once the platform is boarded out',
    ],
    correctAnswer: 1,
    explanation:
      'Snow accumulation on scaffold platforms adds significant dead weight that can overload the scaffold beyond its design capacity. It also creates severe slip hazards on platforms and access routes, and can block emergency escape routes. Snow should be cleared before work resumes.',
    section: 'scaffolding-awareness',
    difficulty: 'intermediate',
    topic: 'Safe Use & Hazard Awareness',
    category: 'Safe Use & Hazard Awareness',
  },
  {
    id: 198,
    question:
      'Why is it important that scaffold erectors and dismantlers work to a method statement?',
    options: [
      'To record the hire cost of the scaffold for invoicing the client',
      'To list the names of every operative working on site that day',
      'To ensure the work is carried out in a planned, safe sequence that controls the risks at every stage',
      'To confirm the scaffold has passed its statutory 7-day inspection',
    ],
    correctAnswer: 2,
    explanation:
      'Scaffold erection and dismantling are high-risk activities. A method statement sets out the planned safe sequence of work, the control measures for each stage, the equipment needed, and the competence required. It ensures everyone understands the plan and works safely.',
    section: 'scaffolding-awareness',
    difficulty: 'intermediate',
    topic: 'Safe Use & Hazard Awareness',
    category: 'Safe Use & Hazard Awareness',
  },
  {
    id: 199,
    question:
      'What does the hierarchy of control in the Work at Height Regulations require you to consider first?',
    options: [
      'Issuing every worker with a harness and lanyard before they start',
      'Selecting the cheapest access equipment available for the task',
      'Erecting guard rails and toe boards on every working platform',
      'Avoiding work at height altogether if it is reasonably practicable to do so',
    ],
    correctAnswer: 3,
    explanation:
      'The Work at Height Regulations 2005 require duty holders to first consider whether the work at height can be avoided altogether. If it cannot be avoided, then collective protection measures (such as scaffolds with guardrails) must be considered before personal protection (such as harnesses).',
    section: 'scaffolding-awareness',
    difficulty: 'advanced',
    topic: 'Safe Use & Hazard Awareness',
    category: 'Safe Use & Hazard Awareness',
  },
  {
    id: 200,
    question:
      'What are the three main duties of an employer under the Work at Height Regulations 2005?',
    options: [
      'Avoid work at height where possible, prevent falls where avoidance is not possible, and minimise the consequences of a fall',
      'Provide harnesses, provide hard hats, and provide high-visibility clothing to every worker',
      'Inspect the scaffold daily, weekly, and monthly regardless of conditions',
      'Train all workers, insure all workers, and supervise all workers at height',
    ],
    correctAnswer: 0,
    explanation:
      'The three main duties under the Work at Height Regulations 2005 are: avoid work at height where reasonably practicable; where it cannot be avoided, prevent falls using appropriate work equipment and measures; and where falls cannot be prevented, minimise the distance and consequences of a fall.',
    section: 'scaffolding-awareness',
    difficulty: 'advanced',
    topic: 'Safe Use & Hazard Awareness',
    category: 'Safe Use & Hazard Awareness',
  },
];
