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
  "Introduction to Scaffolding",
  "Scaffold Regulations & Standards",
  "Scaffold Components & Assembly",
  "Scaffold Inspection & Tagging",
  "Safe Use & Hazard Awareness"
];

export const scaffoldingAwarenessMockExamConfig: MockExamConfig = {
  examId: 'scaffolding-awareness',
  examTitle: 'Scaffolding Awareness Mock Examination',
  totalQuestions: 20,
  timeLimit: 1800,
  passThreshold: 80,
  exitPath: '/study-centre/general-upskilling/scaffolding-awareness-module-6',
  categories: scaffoldingAwarenessCategories
};

export const getRandomScaffoldingAwarenessExamQuestions = (numQuestions: number = 20) => {
  return getRandomQuestionsBalanced(scaffoldingAwarenessQuestionBank, numQuestions, scaffoldingAwarenessCategories);
};

export const scaffoldingAwarenessQuestionBank: StandardMockQuestion[] = [
  // =======================================================================
  // CATEGORY 1 — Introduction to Scaffolding — 40 questions (id 1–40)
  // =======================================================================

  // --- basic (14) ---
  {
    id: 1,
    question: "What is the primary purpose of scaffolding on a construction site?",
    options: [
      "To store building materials at height",
      "To provide a safe temporary working platform for people and materials",
      "To act as a permanent structural element of the building",
      "To serve as a barrier to prevent public access"
    ],
    correctAnswer: 1,
    explanation: "Scaffolding is a temporary structure erected to provide a safe working platform at height. It allows workers to access areas of a building that would otherwise be unreachable and supports materials needed for the task.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Purpose of scaffolding",
    category: "Introduction to Scaffolding"
  },
  {
    id: 2,
    question: "Which of the following is the most common type of scaffolding used in the UK construction industry?",
    options: [
      "Suspended scaffolding",
      "Tube and fitting scaffolding",
      "Trestle scaffolding",
      "Cantilever scaffolding"
    ],
    correctAnswer: 1,
    explanation: "Tube and fitting (also called tube and coupler) scaffolding is the most widely used system in the UK. It consists of steel or aluminium tubes connected by a range of couplers, making it highly versatile for different building shapes.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Common scaffold types",
    category: "Introduction to Scaffolding"
  },
  {
    id: 3,
    question: "What does the abbreviation CISRS stand for in relation to scaffolding?",
    options: [
      "Certified Industrial Scaffold Regulation Scheme",
      "Construction Industry Scaffolders Record Scheme",
      "Central Institute of Scaffold Regulation and Safety",
      "Construction Industry Safety and Regulation Standards"
    ],
    correctAnswer: 1,
    explanation: "CISRS stands for the Construction Industry Scaffolders Record Scheme. It is the recognised industry card scheme for scaffolders in the UK, ensuring operatives are trained and competent to carry out scaffolding work safely.",
    section: "Module 1",
    difficulty: "basic",
    topic: "CISRS",
    category: "Introduction to Scaffolding"
  },
  {
    id: 4,
    question: "What is an 'independent scaffold'?",
    options: [
      "A scaffold that is only used by one trade at a time",
      "A freestanding scaffold with two rows of standards that does not rely on the building for support",
      "A scaffold erected without any ties to the building",
      "A scaffold designed for use on independent housing developments only"
    ],
    correctAnswer: 1,
    explanation: "An independent scaffold has two rows of standards (uprights) — an inner and outer row — connected by transoms and ledgers. It is structurally self-supporting, although it must still be tied to the building to prevent movement.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Independent scaffold",
    category: "Introduction to Scaffolding"
  },
  {
    id: 5,
    question: "What is a 'putlog scaffold'?",
    options: [
      "A scaffold with platforms on both sides of the building",
      "A scaffold with a single row of standards, with putlogs built into the brickwork",
      "A scaffold that hangs from the roof of a building",
      "A mobile scaffold on wheels"
    ],
    correctAnswer: 1,
    explanation: "A putlog scaffold has one row of standards set away from the building face, with horizontal putlogs that have flattened ends (blades) built into the bed joints of the brickwork. It relies partly on the building for support.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Putlog scaffold",
    category: "Introduction to Scaffolding"
  },
  {
    id: 6,
    question: "Who is typically responsible for erecting and dismantling scaffolding on a construction site?",
    options: [
      "Any construction worker with a hard hat",
      "Trained and competent scaffolders holding a CISRS card",
      "The site manager personally",
      "Electrical or plumbing operatives as part of their duties"
    ],
    correctAnswer: 1,
    explanation: "Scaffolding must only be erected, altered, or dismantled by competent persons who hold the appropriate CISRS card. This ensures workers have the skills and knowledge to carry out the work safely.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Competent persons",
    category: "Introduction to Scaffolding"
  },
  {
    id: 7,
    question: "What is a 'standard' in scaffolding terminology?",
    options: [
      "A horizontal tube running along the length of the scaffold",
      "A vertical tube that transfers the load to the ground",
      "A diagonal brace connecting two adjacent bays",
      "A platform board placed across transoms"
    ],
    correctAnswer: 1,
    explanation: "A standard is the vertical upright tube in a scaffold structure. Standards carry the weight of the scaffold and its loads down to the ground through base plates and sole boards.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Scaffold terminology",
    category: "Introduction to Scaffolding"
  },
  {
    id: 8,
    question: "What is a 'ledger' in scaffolding?",
    options: [
      "A written record of scaffold inspections",
      "A horizontal tube fixed to the standards running parallel to the building face",
      "A diagonal tube providing lateral stability",
      "A short tube connecting the inner and outer standards"
    ],
    correctAnswer: 1,
    explanation: "A ledger is a horizontal tube that runs lengthways along the scaffold, fixed to the standards with right-angle couplers. Ledgers connect the standards together and support the transoms on which boards are placed.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Scaffold terminology",
    category: "Introduction to Scaffolding"
  },
  {
    id: 9,
    question: "What is a 'transom' in scaffolding?",
    options: [
      "A vertical tube at the corner of a scaffold",
      "A tube that spans between the inner and outer ledgers, supporting the platform boards",
      "A brace running diagonally across the scaffold face",
      "A clip used to attach sheeting to the scaffold"
    ],
    correctAnswer: 1,
    explanation: "A transom is a horizontal tube placed at right angles to the ledgers, spanning between the inner and outer rows of standards. Transoms support the scaffold boards that form the working platform.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Scaffold terminology",
    category: "Introduction to Scaffolding"
  },
  {
    id: 10,
    question: "What is a 'bay' in scaffolding terminology?",
    options: [
      "An area designated for material storage at ground level",
      "The space between two adjacent standards along the length of the scaffold",
      "A gap left in the platform for ladder access",
      "The overall height of the scaffold structure"
    ],
    correctAnswer: 1,
    explanation: "A bay is the horizontal distance between two adjacent standards along the length of the scaffold. Bay lengths are specified in scaffold design and typically range from 1.8 m to 2.7 m depending on the duty of the scaffold.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Scaffold terminology",
    category: "Introduction to Scaffolding"
  },
  {
    id: 11,
    question: "What is a 'lift' in scaffolding terminology?",
    options: [
      "A mechanical hoist attached to the scaffold",
      "The vertical distance between two consecutive ledger levels",
      "The process of raising materials to the platform",
      "A type of access tower"
    ],
    correctAnswer: 1,
    explanation: "A lift refers to the vertical distance between two consecutive ledger heights on a scaffold. The first lift is from the ground to the first set of ledgers, and subsequent lifts continue upwards.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Scaffold terminology",
    category: "Introduction to Scaffolding"
  },
  {
    id: 12,
    question: "What is 'system scaffolding'?",
    options: [
      "Scaffolding that uses an electronic monitoring system",
      "A proprietary scaffolding system with prefabricated components that slot or lock together",
      "Scaffolding designed using computer software only",
      "Scaffolding erected according to a systematic method statement"
    ],
    correctAnswer: 1,
    explanation: "System scaffolding (also called modular scaffolding) uses proprietary components with built-in connection points such as rosettes, cups, or wedges. Examples include Layher Allround, HAKI, and Cuplok systems.",
    section: "Module 1",
    difficulty: "basic",
    topic: "System scaffolding",
    category: "Introduction to Scaffolding"
  },
  {
    id: 13,
    question: "What is 'birdcage scaffolding' primarily used for?",
    options: [
      "External work on high-rise buildings",
      "Providing a wide platform for work on ceilings or soffits inside buildings",
      "Protecting birds from nesting on construction sites",
      "Temporary fencing around excavations"
    ],
    correctAnswer: 1,
    explanation: "Birdcage scaffolding is an internal scaffold with rows of standards in both directions, creating a large raised platform. It is commonly used for ceiling work, painting, or installing services in large open areas like atriums or halls.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Birdcage scaffolding",
    category: "Introduction to Scaffolding"
  },
  {
    id: 14,
    question: "What is a 'scaffold tower' (also known as a mobile access tower)?",
    options: [
      "A permanently fixed scaffold structure taller than 20 metres",
      "A freestanding, moveable scaffold on wheels or castors used for short-duration tasks",
      "A crane used to lift scaffold components",
      "A tower block that requires scaffolding for maintenance"
    ],
    correctAnswer: 1,
    explanation: "A scaffold tower (mobile access tower) is a lightweight, freestanding structure on wheels or castors. Towers are governed by PASMA guidance and must only be moved when unoccupied, with castors locked before use.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Scaffold towers",
    category: "Introduction to Scaffolding"
  },

  // --- intermediate (18) ---
  {
    id: 15,
    question: "What is the role of a 'scaffolding supervisor' (CISRS Advanced Scaffolder or Scaffold Supervisor card holder)?",
    options: [
      "To carry out all scaffold erections personally without assistance",
      "To oversee scaffold operations, ensure compliance with the design, and manage the scaffolding team",
      "To inspect scaffolds on behalf of the Health and Safety Executive",
      "To manufacture scaffold components in a factory setting"
    ],
    correctAnswer: 1,
    explanation: "A scaffolding supervisor manages the day-to-day scaffold operations on site, ensures the scaffold is erected to the correct design, supervises the scaffolding team, and ensures safe working practices are followed.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Scaffolding roles",
    category: "Introduction to Scaffolding"
  },
  {
    id: 16,
    question: "What is a 'scaffold design' and when is it required?",
    options: [
      "A decorative finish applied to scaffold boards; it is always optional",
      "A structural calculation and drawing prepared by a competent person; required when the scaffold is non-standard or complex",
      "A colour scheme for identifying different scaffold zones; only needed on large sites",
      "An insurance document; only required for scaffolds over 30 metres"
    ],
    correctAnswer: 1,
    explanation: "A scaffold design includes structural calculations and drawings prepared by a competent engineer. It is required whenever the scaffold falls outside standard configurations covered by guidance like TG20 or the manufacturer's instructions.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Scaffold design requirements",
    category: "Introduction to Scaffolding"
  },
  {
    id: 17,
    question: "What does the term 'duty' refer to when classifying a scaffold?",
    options: [
      "The legal responsibility of the scaffold user",
      "The maximum load the scaffold platform is designed to carry, classified by intended use",
      "The tax payable on imported scaffold components",
      "The shift pattern of scaffolders on site"
    ],
    correctAnswer: 1,
    explanation: "Scaffold duty refers to the load-bearing classification of the working platform. UK standards define duties such as Inspection (0.75 kN/m²), Light (1.5 kN/m²), General Purpose (2.0 kN/m²), and Heavy Duty (2.5 kN/m²).",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Scaffold duty classification",
    category: "Introduction to Scaffolding"
  },
  {
    id: 18,
    question: "What is the maximum uniformly distributed load for a 'General Purpose' duty scaffold platform?",
    options: [
      "0.75 kN/m²",
      "1.50 kN/m²",
      "2.00 kN/m²",
      "2.50 kN/m²"
    ],
    correctAnswer: 2,
    explanation: "A General Purpose scaffold has a maximum uniformly distributed load of 2.0 kN/m². This duty is suitable for general construction work including bricklaying and plastering with materials on the platform.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Scaffold duty loads",
    category: "Introduction to Scaffolding"
  },
  {
    id: 19,
    question: "What is a 'cantilever scaffold'?",
    options: [
      "A scaffold built on a slope that leans against the building",
      "A scaffold where the platform projects beyond the supporting structure without external bracing to the ground",
      "A scaffold built inside a building only",
      "A scaffold that can be folded for transport"
    ],
    correctAnswer: 1,
    explanation: "A cantilever scaffold has a working platform that extends outward beyond its supports, without vertical supports reaching the ground at the outer edge. It is often used where ground conditions prevent standard support or over obstructions.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Cantilever scaffold",
    category: "Introduction to Scaffolding"
  },
  {
    id: 20,
    question: "What is 'suspended scaffolding' and where is it typically used?",
    options: [
      "Scaffolding that has been temporarily taken out of service",
      "A scaffold platform hung from the roof or an outrigger structure, commonly used on high-rise buildings for facade work",
      "A scaffold platform resting on trestles inside a building",
      "A scaffold where work has been suspended due to bad weather"
    ],
    correctAnswer: 1,
    explanation: "Suspended scaffolding consists of working platforms hung by ropes or chains from outriggers at roof level. It is widely used for window cleaning, cladding, and maintenance on tall buildings where access from the ground is impractical.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Suspended scaffolding",
    category: "Introduction to Scaffolding"
  },
  {
    id: 21,
    question: "What is a 'loading bay' in scaffolding?",
    options: [
      "A reinforced section of scaffold designed for receiving materials from a crane or hoist",
      "The area at ground level where scaffold components are stored",
      "A designated parking area for delivery vehicles",
      "A temporary shelter for scaffolders during breaks"
    ],
    correctAnswer: 0,
    explanation: "A loading bay is a specially strengthened section of the scaffold with additional supports and a gate. It allows materials to be loaded onto the scaffold safely from a crane or hoist without overloading the normal platform.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Loading bays",
    category: "Introduction to Scaffolding"
  },
  {
    id: 22,
    question: "What is a 'gin wheel' used for on scaffolding?",
    options: [
      "Tightening couplers on scaffold tubes",
      "Hoisting lightweight materials and components to working platforms using a rope",
      "Measuring the level of scaffold platforms",
      "Locking the wheels of a mobile scaffold tower"
    ],
    correctAnswer: 1,
    explanation: "A gin wheel is a simple pulley fixed to the top of a scaffold to hoist small materials and tools using a rope. It must be securely attached to the scaffold, and the load capacity must not be exceeded.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Gin wheels",
    category: "Introduction to Scaffolding"
  },
  {
    id: 23,
    question: "In scaffolding, what does 'TG20' refer to?",
    options: [
      "A type of scaffold tube with a 20 mm diameter",
      "Technical Guidance Note 20, a comprehensive guide to good practice for tube and fitting scaffolding",
      "A training grade for scaffolders with 20 years' experience",
      "The minimum temperature at which scaffolding can be erected"
    ],
    correctAnswer: 1,
    explanation: "TG20 is a NASC Technical Guidance document that provides operational guidance for tube and fitting scaffolding. TG20:13 includes compliance sheets that can eliminate the need for a bespoke design for many standard scaffolds.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "TG20",
    category: "Introduction to Scaffolding"
  },
  {
    id: 24,
    question: "What is the NASC?",
    options: [
      "National Association of Steel Constructors",
      "National Access and Scaffolding Confederation",
      "Northern Alliance of Safety Coordinators",
      "National Assembly for Site Compliance"
    ],
    correctAnswer: 1,
    explanation: "The NASC (National Access and Scaffolding Confederation) is the UK trade body for the scaffolding industry. It publishes safety guidance including TG20 and SG series documents, and promotes best practice standards.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "NASC",
    category: "Introduction to Scaffolding"
  },
  {
    id: 25,
    question: "What is the difference between a 'scaffolder' and a 'scaffold labourer'?",
    options: [
      "There is no difference; the terms are interchangeable",
      "A scaffolder is CISRS-trained and can erect/dismantle scaffolding; a scaffold labourer assists by passing materials but does not erect components",
      "A scaffold labourer is more senior and supervises the scaffolder",
      "A scaffolder only works on tube and fitting; a labourer only works on system scaffold"
    ],
    correctAnswer: 1,
    explanation: "A scaffolder holds a CISRS Scaffolder card and is competent to erect, alter, and dismantle scaffolding. A scaffold labourer (CISRS Labourer card) supports the scaffolder by handling and passing materials but is not qualified to erect scaffold.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Scaffolding roles",
    category: "Introduction to Scaffolding"
  },
  {
    id: 26,
    question: "What is a 'reveal tie' used for in scaffolding?",
    options: [
      "Tying sheeting to the scaffold to conceal work from public view",
      "Securing the scaffold to a building by wedging a tube into a window or door reveal",
      "Connecting two scaffold boards end to end",
      "Marking scaffold zones with coloured tape"
    ],
    correctAnswer: 1,
    explanation: "A reveal tie uses an adjustable tube fitted into a window or door opening (reveal) to anchor the scaffold to the building. It must be used with a tie tube and is less reliable than through-ties, so its use is limited in TG20 guidance.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Reveal ties",
    category: "Introduction to Scaffolding"
  },
  {
    id: 27,
    question: "What is a 'through-tie' in scaffolding?",
    options: [
      "A diagonal brace passing through the centre of the scaffold",
      "A tie that passes through the building (e.g., through a window opening) and is anchored on the inside",
      "A rope tying materials to the platform to prevent them falling",
      "A permanent bolt fixing scaffold to the ground"
    ],
    correctAnswer: 1,
    explanation: "A through-tie passes through an opening in the building and is secured internally with a tie plate or similar fitting. Through-ties are considered the most reliable type of scaffold tie and are preferred over reveal ties.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Through-ties",
    category: "Introduction to Scaffolding"
  },
  {
    id: 28,
    question: "Why is scaffolding sometimes referred to as 'falsework'?",
    options: [
      "It is not — falsework is a separate term referring to temporary structures that support permanent works during construction, such as concrete formwork",
      "Because scaffolding provides a false sense of security",
      "Because scaffolding must be dismantled (made false) after use",
      "Falsework is the American term for scaffolding"
    ],
    correctAnswer: 0,
    explanation: "Falsework and scaffolding are different. Falsework refers to temporary structures used to support permanent structures (like concrete slabs) during construction. Scaffolding provides access for workers. The two terms should not be used interchangeably.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Falsework vs scaffolding",
    category: "Introduction to Scaffolding"
  },
  {
    id: 29,
    question: "What is a 'hop-up bracket' in scaffolding?",
    options: [
      "A bracket used to create an additional raised platform within a scaffold bay, typically one board width",
      "A spring-loaded bracket that allows the scaffold to absorb impact",
      "A bracket used to attach a hopping frog-guard to scaffold tubes",
      "A bracket that allows the scaffold to be raised in one operation"
    ],
    correctAnswer: 0,
    explanation: "A hop-up bracket is fitted to standards or ledgers within a scaffold bay to support a short raised platform (usually one or two boards wide). This allows workers to reach slightly higher areas without adding a full extra lift.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Hop-up brackets",
    category: "Introduction to Scaffolding"
  },
  {
    id: 30,
    question: "What is a 'bridle' in scaffolding?",
    options: [
      "A safety harness worn by scaffolders",
      "A horizontal tube spanning across an opening (such as a doorway or window) in a putlog scaffold",
      "A device for controlling the speed of a hoist",
      "A rope sling used to lift scaffold boards"
    ],
    correctAnswer: 1,
    explanation: "A bridle is a horizontal tube fixed across an opening in the building face where a putlog cannot be inserted (e.g., over a window). It spans from standard to standard and supports the putlog that would otherwise have no bearing point.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Bridles",
    category: "Introduction to Scaffolding"
  },
  {
    id: 31,
    question: "What is a 'boarded lift'?",
    options: [
      "A scaffold lift where the platform has been fully decked with boards",
      "A powered mechanical platform that lifts boards",
      "A lift of the scaffold used exclusively for storing boards",
      "A scaffold bay that has been marked with a board sign"
    ],
    correctAnswer: 0,
    explanation: "A boarded lift is any lift level on a scaffold where the platform has been fully decked with scaffold boards to create a working platform. Not every lift is boarded; only those required for access or working are typically decked out.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Boarded lifts",
    category: "Introduction to Scaffolding"
  },
  {
    id: 32,
    question: "What is the role of a 'scaffold coordinator' on a large construction project?",
    options: [
      "To physically erect all scaffolding on site",
      "To plan, manage, and coordinate all scaffold requirements across the project, liaising with contractors and designers",
      "To sell scaffold equipment to the main contractor",
      "To operate the tower crane used for lifting scaffold materials"
    ],
    correctAnswer: 1,
    explanation: "A scaffold coordinator plans scaffold requirements for the project, coordinates between trades needing access, arranges inspections, ensures designs are available, and manages scaffold modifications and handovers throughout the build programme.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Scaffold coordination",
    category: "Introduction to Scaffolding"
  },

  // --- advanced (8) ---
  {
    id: 33,
    question: "When calculating the 'in-service' wind load on a clad scaffold, which factor most significantly increases the wind force compared to an open scaffold?",
    options: [
      "The colour of the cladding material",
      "The solidity ratio (the proportion of the scaffold face that is enclosed by sheeting or netting)",
      "The number of scaffold boards on the platform",
      "The brand of couplers used"
    ],
    correctAnswer: 1,
    explanation: "The solidity ratio determines how much wind force the scaffold face catches. Fully sheeted scaffolds have a solidity ratio of 1.0, massively increasing wind load. Debris netting has a lower ratio (typically 0.5) but still significantly increases loading compared to an open scaffold.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "Wind loading",
    category: "Introduction to Scaffolding"
  },
  {
    id: 34,
    question: "What is a 'Kentledge' in scaffold terminology?",
    options: [
      "A type of scaffold knot used in rope access",
      "A counterweight (typically concrete blocks) used to provide stability to a freestanding scaffold",
      "A brand of scaffold tube manufactured in Kent",
      "A licence required to erect scaffold in the county of Kent"
    ],
    correctAnswer: 1,
    explanation: "Kentledge refers to ballast or counterweight blocks placed on the base of a freestanding scaffold to resist overturning. It is commonly used where the scaffold cannot be tied to a structure, and the weight must be calculated by a competent designer.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "Kentledge",
    category: "Introduction to Scaffolding"
  },
  {
    id: 35,
    question: "In the CISRS training pathway, what is the minimum period of on-site experience required between completing a Part 1 scaffolder course and attending the Part 2 course?",
    options: [
      "3 months",
      "6 months",
      "12 months",
      "24 months"
    ],
    correctAnswer: 1,
    explanation: "CISRS requires a minimum of 6 months' recorded on-site scaffolding experience between Part 1 and Part 2 courses. This ensures trainees gain sufficient practical exposure under supervision before progressing to the next training stage.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "CISRS training pathway",
    category: "Introduction to Scaffolding"
  },
  {
    id: 36,
    question: "What is a 'raker' in scaffolding and when might one be required?",
    options: [
      "A person who tidies loose materials on the scaffold platform",
      "An inclined tube from the scaffold to the ground providing additional stability, used when ties to the building are not possible",
      "A tool used to smooth render applied from a scaffold platform",
      "A horizontal tube placed at an angle to deflect rainwater"
    ],
    correctAnswer: 1,
    explanation: "A raker is an inclined shore tube running from the scaffold to the ground, providing lateral stability. Rakers may be needed where it is impossible to tie the scaffold to the building, such as on freestanding scaffolds or during early erection stages.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "Rakers",
    category: "Introduction to Scaffolding"
  },
  {
    id: 37,
    question: "What is the typical outside diameter of a standard scaffold tube used in the UK?",
    options: [
      "38.0 mm",
      "42.4 mm",
      "48.3 mm",
      "50.8 mm"
    ],
    correctAnswer: 2,
    explanation: "The standard scaffold tube used in the UK has an outside diameter of 48.3 mm and a wall thickness of 3.2 mm (Type 4) or 4.0 mm (Type 3). This is specified in BS EN 39 and is universal across tube and fitting scaffolding.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "Scaffold tube specification",
    category: "Introduction to Scaffolding"
  },
  {
    id: 38,
    question: "In a 'shoring scaffold', what is the primary function of the structure?",
    options: [
      "To provide working access for painters",
      "To temporarily support a building or structure that is in danger of collapse or during structural alterations",
      "To provide a waterproof covering over the building",
      "To create an external staircase for emergency evacuation"
    ],
    correctAnswer: 1,
    explanation: "Shoring scaffolding (or shoring) is designed to provide temporary structural support to a building. It may be used during demolition, underpinning, or when a structure is unstable. It requires careful structural design as it supports permanent loads.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "Shoring scaffold",
    category: "Introduction to Scaffolding"
  },
  {
    id: 39,
    question: "What is a 'TG20 compliance sheet' and how does it benefit the scaffolding contractor?",
    options: [
      "A tax document for scaffold imports that reduces VAT liability",
      "A pre-calculated design output sheet from the TG20 e-guide software that, for standard configurations, removes the need for a bespoke scaffold design",
      "A quality certificate for individual scaffold tubes confirming they meet TG20 standards",
      "An insurance document that guarantees scaffold safety for 20 years"
    ],
    correctAnswer: 1,
    explanation: "A TG20 compliance sheet is generated from the TG20:13 e-guide software. When the scaffold configuration falls within TG20 parameters, the compliance sheet acts as the design, saving the cost and time of commissioning a bespoke design from a structural engineer.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "TG20 compliance sheets",
    category: "Introduction to Scaffolding"
  },
  {
    id: 40,
    question: "What are 'spigot joints' and why must they be positioned correctly in a scaffold structure?",
    options: [
      "Joints between scaffold boards that must be staggered to prevent tripping",
      "Internal fitting joints used to connect scaffold tubes end to end, which must be positioned close to a node point to maintain structural integrity",
      "Welded joints on system scaffold components that must be inspected for cracks",
      "Joints between the scaffold and the building that must be waterproofed"
    ],
    correctAnswer: 1,
    explanation: "Spigot joints use an internal sleeve or spigot pin to join two tubes end to end. They must be positioned within 300 mm of a node point (where a ledger or transom connects) to avoid introducing a weak point that could lead to structural failure.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "Spigot joints",
    category: "Introduction to Scaffolding"
  },

  // =======================================================================
  // CATEGORY 2 — Scaffold Regulations & Standards — 40 questions (id 41–80)
  // =======================================================================

  // --- basic (14) ---
  {
    id: 41,
    question: "Which UK regulation specifically covers the requirements for working at height, including the use of scaffolding?",
    options: [
      "Control of Substances Hazardous to Health Regulations 2002",
      "Work at Height Regulations 2005",
      "Electricity at Work Regulations 1989",
      "Manual Handling Operations Regulations 1992"
    ],
    correctAnswer: 1,
    explanation: "The Work at Height Regulations 2005 apply to all work at height where there is a risk of a fall liable to cause personal injury. They set out requirements for planning, organising, and using equipment including scaffolding.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Work at Height Regulations",
    category: "Scaffold Regulations & Standards"
  },
  {
    id: 42,
    question: "Under the Work at Height Regulations 2005, what should be the first consideration when planning work at height?",
    options: [
      "Selecting the cheapest access equipment",
      "Avoiding work at height altogether where reasonably practicable",
      "Ensuring all workers have hard hats",
      "Checking that insurance is in place"
    ],
    correctAnswer: 1,
    explanation: "The hierarchy in the Work at Height Regulations 2005 requires that work at height is avoided where reasonably practicable. If it cannot be avoided, suitable equipment must be used to prevent falls, and then to mitigate the consequences of a fall.",
    section: "Module 2",
    difficulty: "basic",
    topic: "WAH hierarchy",
    category: "Scaffold Regulations & Standards"
  },
  {
    id: 43,
    question: "Which set of regulations places duties on clients, designers, and contractors to manage health and safety in construction projects?",
    options: [
      "PUWER 1998",
      "LOLER 1998",
      "CDM 2015",
      "COSHH 2002"
    ],
    correctAnswer: 2,
    explanation: "The Construction (Design and Management) Regulations 2015 (CDM 2015) place duties on all parties in a construction project. They require proper planning, management, and coordination of health and safety, including scaffolding operations.",
    section: "Module 2",
    difficulty: "basic",
    topic: "CDM 2015",
    category: "Scaffold Regulations & Standards"
  },
  {
    id: 44,
    question: "What does PUWER stand for?",
    options: [
      "Personal Use of Work Equipment Regulations",
      "Provision and Use of Work Equipment Regulations",
      "Planning and Utilisation of Workplace Equipment Rules",
      "Protection of Users of Work Equipment Regulations"
    ],
    correctAnswer: 1,
    explanation: "PUWER stands for the Provision and Use of Work Equipment Regulations 1998. These regulations require that work equipment, including scaffolding, is suitable for its intended use, properly maintained, and used by trained persons.",
    section: "Module 2",
    difficulty: "basic",
    topic: "PUWER",
    category: "Scaffold Regulations & Standards"
  },
  {
    id: 45,
    question: "Which European standard specifies the performance requirements for temporary works equipment including scaffolding?",
    options: [
      "BS 7671",
      "BS EN 12811",
      "BS 5975",
      "BS EN 60079"
    ],
    correctAnswer: 1,
    explanation: "BS EN 12811 is the European standard covering temporary works equipment. Part 1 covers scaffolds with performance requirements and general design, Part 2 covers information on materials, and Part 3 covers load testing.",
    section: "Module 2",
    difficulty: "basic",
    topic: "BS EN 12811",
    category: "Scaffold Regulations & Standards"
  },
  {
    id: 46,
    question: "Under UK law, who has the primary duty to ensure the health and safety of workers on a construction site?",
    options: [
      "The scaffold manufacturer",
      "The employer",
      "The local council",
      "The scaffold inspector"
    ],
    correctAnswer: 1,
    explanation: "Under the Health and Safety at Work etc. Act 1974, the employer has the primary duty to ensure, so far as is reasonably practicable, the health, safety and welfare of their employees. This includes providing safe access via scaffolding.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Employer duties",
    category: "Scaffold Regulations & Standards"
  },
  {
    id: 47,
    question: "What is the minimum age at which a person can work on scaffolding in the UK?",
    options: [
      "14 years old",
      "16 years old",
      "18 years old",
      "21 years old"
    ],
    correctAnswer: 2,
    explanation: "Persons under 18 are generally prohibited from carrying out scaffolding work or working at height on scaffolding unless under direct supervision as part of an approved training programme. The industry standard requires workers to be at least 18.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Age restrictions",
    category: "Scaffold Regulations & Standards"
  },
  {
    id: 48,
    question: "What is a 'method statement' in relation to scaffolding work?",
    options: [
      "A financial statement showing the cost of scaffold hire",
      "A document describing how the scaffolding work will be carried out safely, step by step",
      "A statement from the scaffold manufacturer about product quality",
      "A verbal instruction given by the site manager at the morning briefing"
    ],
    correctAnswer: 1,
    explanation: "A method statement (also called a safe system of work) is a written document detailing the sequence of operations, hazards, controls, and responsibilities for carrying out scaffolding work safely. It forms part of the risk assessment process.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Method statements",
    category: "Scaffold Regulations & Standards"
  },
  {
    id: 49,
    question: "What is a 'risk assessment' in the context of scaffold operations?",
    options: [
      "An assessment of the financial risk of the scaffolding contract",
      "A systematic process of identifying hazards, evaluating risks, and determining control measures for scaffold work",
      "An insurance company's evaluation of the scaffold contractor",
      "A check on the structural condition of the building being scaffolded"
    ],
    correctAnswer: 1,
    explanation: "A risk assessment identifies the hazards associated with scaffolding work, evaluates who could be harmed and how, and determines the control measures needed to reduce risk to an acceptable level. It is a legal requirement under the Management of Health and Safety at Work Regulations 1999.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Risk assessment",
    category: "Scaffold Regulations & Standards"
  },
  {
    id: 50,
    question: "How often must a scaffold be inspected under the Work at Height Regulations 2005 as a minimum?",
    options: [
      "Daily before each shift",
      "At least every 7 days, and after any event likely to have affected its stability",
      "Monthly by a structural engineer",
      "Only when a problem is reported"
    ],
    correctAnswer: 1,
    explanation: "The Work at Height Regulations 2005 require scaffolds to be inspected before first use, at intervals not exceeding 7 days, and after any event that could affect stability (such as high winds or impact). Inspection results must be recorded.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Inspection frequency",
    category: "Scaffold Regulations & Standards"
  },
  {
    id: 51,
    question: "Who is legally permitted to inspect a scaffold under the Work at Height Regulations 2005?",
    options: [
      "Any person who works on the scaffold",
      "A competent person with adequate training and experience in scaffold inspection",
      "Only a chartered structural engineer",
      "Only the scaffolding contractor who erected it"
    ],
    correctAnswer: 1,
    explanation: "The regulations require that scaffold inspections are carried out by a competent person. Competence means the person has sufficient training, experience, and knowledge to identify defects and unsafe conditions in scaffolding.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Competent inspector",
    category: "Scaffold Regulations & Standards"
  },
  {
    id: 52,
    question: "For how long must scaffold inspection records be kept on site?",
    options: [
      "Until the scaffold is dismantled",
      "For at least 3 months after the inspection",
      "For at least 12 months",
      "Indefinitely"
    ],
    correctAnswer: 1,
    explanation: "Under the Work at Height Regulations 2005, scaffold inspection reports must be kept on site until the scaffold is dismantled and then retained for a further 3 months. The records must be available for inspection by the enforcing authority.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Record keeping",
    category: "Scaffold Regulations & Standards"
  },
  {
    id: 53,
    question: "What does the acronym LOLER stand for?",
    options: [
      "Lifting Operations and Lifting Equipment Regulations",
      "Loading and Offloading Logistics and Equipment Regulations",
      "Local Oversight of Lifting and Elevation Rules",
      "Legal Obligations for Ladder and Equipment Regulations"
    ],
    correctAnswer: 0,
    explanation: "LOLER stands for the Lifting Operations and Lifting Equipment Regulations 1998. These apply to scaffolding when hoists, gin wheels, or other lifting equipment are used on or with the scaffold structure.",
    section: "Module 2",
    difficulty: "basic",
    topic: "LOLER",
    category: "Scaffold Regulations & Standards"
  },
  {
    id: 54,
    question: "Which body is responsible for enforcing health and safety legislation on construction sites in the UK?",
    options: [
      "Local Authority Environmental Health",
      "Health and Safety Executive (HSE)",
      "Building Control",
      "The Fire Service"
    ],
    correctAnswer: 1,
    explanation: "The Health and Safety Executive (HSE) is the primary enforcing authority for health and safety on construction sites in Great Britain. HSE inspectors can enter sites, issue improvement and prohibition notices, and prosecute for breaches.",
    section: "Module 2",
    difficulty: "basic",
    topic: "HSE enforcement",
    category: "Scaffold Regulations & Standards"
  },

  // --- intermediate (18) ---
  {
    id: 55,
    question: "Under CDM 2015, which duty holder is responsible for ensuring that the design of a scaffold does not create foreseeable risks to those who will erect, use, or dismantle it?",
    options: [
      "The client",
      "The principal contractor",
      "The designer",
      "The scaffold labourer"
    ],
    correctAnswer: 2,
    explanation: "Under CDM 2015, designers (including scaffold designers) must eliminate or reduce foreseeable risks in their designs. This includes considering how the scaffold will be erected, used, maintained, and dismantled safely.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "CDM designer duties",
    category: "Scaffold Regulations & Standards"
  },
  {
    id: 56,
    question: "Under CDM 2015, what is the role of the 'principal designer'?",
    options: [
      "To physically design every scaffold on the project",
      "To plan, manage, monitor, and coordinate health and safety in the pre-construction phase",
      "To act as the site safety officer during construction",
      "To approve scaffold inspection reports"
    ],
    correctAnswer: 1,
    explanation: "The principal designer under CDM 2015 is responsible for planning, managing, and coordinating health and safety during the pre-construction phase. They ensure that designers fulfil their duties and that health and safety information is included in the pre-construction information pack.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Principal designer role",
    category: "Scaffold Regulations & Standards"
  },
  {
    id: 57,
    question: "What is the key difference between an HSE 'Improvement Notice' and a 'Prohibition Notice'?",
    options: [
      "An Improvement Notice stops work immediately; a Prohibition Notice allows time to comply",
      "An Improvement Notice gives a set time to make improvements; a Prohibition Notice stops the activity immediately until the risk is addressed",
      "Both notices are identical but issued by different inspectors",
      "An Improvement Notice relates to paperwork only; a Prohibition Notice relates to physical conditions"
    ],
    correctAnswer: 1,
    explanation: "An Improvement Notice gives the duty holder a specified period to remedy a contravention. A Prohibition Notice takes immediate effect (or deferred effect) and stops the dangerous activity until the risk is adequately controlled.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Enforcement notices",
    category: "Scaffold Regulations & Standards"
  },
  {
    id: 58,
    question: "According to BS EN 12811-1, what is the minimum clear width for a working platform on a scaffold?",
    options: [
      "400 mm",
      "600 mm",
      "800 mm",
      "1000 mm"
    ],
    correctAnswer: 1,
    explanation: "BS EN 12811-1 specifies a minimum clear width of 600 mm (W06 class) for a scaffold working platform. However, most construction scaffolds in the UK use a minimum of 4 boards wide (approximately 870 mm) for general purpose work.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Minimum platform width",
    category: "Scaffold Regulations & Standards"
  },
  {
    id: 59,
    question: "What does BS 5975 cover?",
    options: [
      "Electrical installation requirements",
      "Code of practice for temporary works procedures, including formwork and scaffolding",
      "Standards for personal protective equipment",
      "Requirements for fire alarm systems in buildings"
    ],
    correctAnswer: 1,
    explanation: "BS 5975 is the code of practice for temporary works procedures. It covers the management and design of temporary works including scaffolding, formwork, falsework, and other temporary structures used in construction.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "BS 5975",
    category: "Scaffold Regulations & Standards"
  },
  {
    id: 60,
    question: "What does the Work at Height Regulations 2005 define as 'work at height'?",
    options: [
      "Any work above 2 metres from ground level",
      "Any work where a person could fall a distance liable to cause personal injury, regardless of height",
      "Only work on scaffolding above 4 metres",
      "Work on any elevated platform including office mezzanines"
    ],
    correctAnswer: 1,
    explanation: "The regulations define work at height as any place where a person could fall a distance liable to cause personal injury. There is no minimum height threshold — even working from a stepladder or at ground level near an open edge is covered.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Definition of work at height",
    category: "Scaffold Regulations & Standards"
  },
  {
    id: 61,
    question: "Under the Work at Height Regulations 2005, what hierarchy must be followed when selecting equipment for work at height?",
    options: [
      "Use the cheapest option, then the lightest, then the fastest to erect",
      "Use collective protection measures (e.g., guard rails) before personal protection (e.g., harnesses)",
      "Use personal protection before collective protection",
      "Use whatever equipment is available on site at the time"
    ],
    correctAnswer: 1,
    explanation: "The regulations require that collective protection measures such as guard rails and working platforms take priority over personal protection measures like harnesses. Collective measures protect everyone in the area, while personal measures only protect the individual.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Equipment hierarchy",
    category: "Scaffold Regulations & Standards"
  },
  {
    id: 62,
    question: "What standard covers the requirements for scaffold tubes in the UK?",
    options: [
      "BS EN 74",
      "BS EN 39",
      "BS EN 12810",
      "BS EN 1004"
    ],
    correctAnswer: 1,
    explanation: "BS EN 39 specifies the requirements for steel tubes used in scaffolding. It defines the outside diameter (48.3 mm), wall thickness, material grade, tolerances, and testing requirements for scaffold tubes.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Tube standards",
    category: "Scaffold Regulations & Standards"
  },
  {
    id: 63,
    question: "What standard covers the requirements for scaffold couplers in the UK?",
    options: [
      "BS EN 39",
      "BS EN 74",
      "BS EN 12811",
      "BS EN 1065"
    ],
    correctAnswer: 1,
    explanation: "BS EN 74 specifies the requirements for couplers, loose spigots, and base plates used with steel scaffold tubes. It defines performance requirements, classifications, and test methods for these critical components.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Coupler standards",
    category: "Scaffold Regulations & Standards"
  },
  {
    id: 64,
    question: "What is a NASC 'SG' document?",
    options: [
      "A scaffold guarantee certificate",
      "A Safety Guidance note published by NASC covering specific scaffolding topics",
      "A Scottish Government regulation on scaffolding",
      "A system guide for proprietary scaffold products"
    ],
    correctAnswer: 1,
    explanation: "NASC SG (Safety Guidance) notes are published documents covering specific safety topics in scaffolding. Examples include SG4 (preventing falls in scaffolding) and SG6 (manual handling in the scaffolding industry).",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "NASC SG documents",
    category: "Scaffold Regulations & Standards"
  },
  {
    id: 65,
    question: "What is NASC SG4 specifically about?",
    options: [
      "Fire safety on scaffolding",
      "Preventing falls in scaffolding operations",
      "Manual handling of scaffold components",
      "Electrical safety near scaffolding"
    ],
    correctAnswer: 1,
    explanation: "NASC SG4 is titled 'Preventing Falls in Scaffolding' and provides guidance on measures to protect scaffolders during the erection, alteration, and dismantling of scaffolding. It covers advance guard rails, harness use, and safe working procedures.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "SG4",
    category: "Scaffold Regulations & Standards"
  },
  {
    id: 66,
    question: "What is the legal status of an Approved Code of Practice (ACoP) issued by the HSE?",
    options: [
      "It has the same force as an Act of Parliament",
      "It is purely advisory with no legal standing",
      "It is not law itself, but failure to follow it can be used as evidence of non-compliance with the associated regulation",
      "It only applies to HSE employees"
    ],
    correctAnswer: 2,
    explanation: "An ACoP is not law, but it has a special legal status. If a duty holder is prosecuted for breaching a regulation to which an ACoP applies, failure to follow the ACoP's guidance will be accepted as evidence of non-compliance unless an equally effective alternative was used.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Approved Codes of Practice",
    category: "Scaffold Regulations & Standards"
  },
  {
    id: 67,
    question: "Under PUWER 1998, what must an employer ensure about scaffold equipment before it is used?",
    options: [
      "It is painted in a specific colour",
      "It is suitable for its intended purpose, maintained in a safe condition, and inspected at regular intervals",
      "It is manufactured in the UK",
      "It has been approved by the local authority"
    ],
    correctAnswer: 1,
    explanation: "PUWER requires that work equipment (including scaffolding) is suitable for its intended use, maintained in an efficient state, in efficient working order and in good repair, and inspected at suitable intervals by a competent person.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "PUWER requirements",
    category: "Scaffold Regulations & Standards"
  },
  {
    id: 68,
    question: "What information must a scaffold inspection report contain as a minimum under the Work at Height Regulations 2005?",
    options: [
      "Only the name of the inspector and the date",
      "The location, date, details of the scaffold, name and position of the inspector, and details of any defects found",
      "Only a pass or fail result",
      "The cost of the scaffold and the contractor's insurance details"
    ],
    correctAnswer: 1,
    explanation: "Schedule 7 of the Work at Height Regulations 2005 specifies the minimum content of an inspection report, including the scaffold location and description, date and time of inspection, details of any matters identified, and the name and position of the person who carried out the inspection.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Inspection report content",
    category: "Scaffold Regulations & Standards"
  },
  {
    id: 69,
    question: "What is a 'permit to work' system in relation to scaffolding?",
    options: [
      "A government licence to operate a scaffolding company",
      "A formal documented procedure that authorises certain work on or affecting the scaffold, ensuring safety precautions are in place",
      "A planning permission document for erecting scaffold on a public footpath",
      "An employment permit for overseas scaffolders"
    ],
    correctAnswer: 1,
    explanation: "A permit to work is a formal safety management system used for high-risk activities. In scaffolding, permits may be required before work such as tying into live services, working near overhead power lines, or making significant alterations to a loaded scaffold.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Permit to work",
    category: "Scaffold Regulations & Standards"
  },
  {
    id: 70,
    question: "What is the purpose of a 'scaffold handover certificate'?",
    options: [
      "To transfer ownership of the scaffold equipment from one company to another",
      "To formally confirm that the scaffold has been erected in accordance with the design and is safe for use by the specified trades",
      "To hand over responsibility for scaffold inspection to the building owner",
      "To confirm payment for the scaffold hire"
    ],
    correctAnswer: 1,
    explanation: "A scaffold handover certificate confirms that the scaffold has been completed to the agreed design and is safe for its intended use. It typically specifies the duty rating, permitted users, and any restrictions or conditions of use.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Handover certificates",
    category: "Scaffold Regulations & Standards"
  },
  {
    id: 71,
    question: "What action should be taken if scaffolding is found to be non-compliant during an inspection?",
    options: [
      "Continue working but make a note in the diary",
      "Immediately restrict access to the scaffold, apply a danger tag, and arrange for a competent person to make it safe",
      "Wait until the end of the week to report it",
      "Ask the scaffold users to fix it themselves"
    ],
    correctAnswer: 1,
    explanation: "If a scaffold is found to be non-compliant or unsafe, it must be taken out of use immediately by preventing access and applying a 'Do Not Use' or danger tag. A competent scaffolder must then rectify the defects before the scaffold is returned to service.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Non-compliance procedures",
    category: "Scaffold Regulations & Standards"
  },
  {
    id: 72,
    question: "What does Regulation 4 of the Work at Height Regulations 2005 require regarding the organisation and planning of work at height?",
    options: [
      "That work at height is only planned when the weather is fine",
      "That all work at height is properly planned, appropriately supervised, and carried out in a safe manner by competent persons",
      "That only qualified engineers can plan work at height",
      "That planning is optional for work under 5 metres"
    ],
    correctAnswer: 1,
    explanation: "Regulation 4 requires that every employer ensures work at height is properly planned, appropriately supervised, and carried out in a manner that is safe. This includes taking account of weather conditions, the condition of the working surface, and emergency rescue procedures.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "WAH Regulation 4",
    category: "Scaffold Regulations & Standards"
  },

  // --- advanced (8) ---
  {
    id: 73,
    question: "Under CDM 2015, what specific duty does the client have regarding scaffolding on a notifiable project?",
    options: [
      "The client must erect the scaffolding personally",
      "The client must ensure sufficient time and resources are allocated for scaffolding to be erected, used, and dismantled safely",
      "The client has no duties relating to scaffolding",
      "The client must hold a CISRS card"
    ],
    correctAnswer: 1,
    explanation: "Under CDM 2015, the client must ensure that sufficient time and other resources are allocated for scaffolding work to be carried out safely. This includes the pre-construction phase for design and planning, as well as adequate time for safe erection and dismantling.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "CDM client duties",
    category: "Scaffold Regulations & Standards"
  },
  {
    id: 74,
    question: "What is the significance of BS EN 12810 in relation to scaffolding?",
    options: [
      "It specifies paint colours for scaffold components",
      "It provides product specifications and assessment methods for facade scaffolds made from prefabricated components (system scaffolds)",
      "It covers the design of scaffold foundations",
      "It specifies requirements for scaffold netting"
    ],
    correctAnswer: 1,
    explanation: "BS EN 12810 covers facade scaffold systems made from prefabricated components (system scaffolds). Part 1 specifies product specifications and Part 2 covers particular methods of structural design. It complements BS EN 12811 which covers general performance requirements.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "BS EN 12810",
    category: "Scaffold Regulations & Standards"
  },
  {
    id: 75,
    question: "In TG20:13, what are the three 'wind regions' used to determine design wind speeds for scaffolding in the UK?",
    options: [
      "North, South, and Central",
      "Sheltered, Standard, and Exposed",
      "Country, Town, and City",
      "Inland, Coastal, and Offshore"
    ],
    correctAnswer: 2,
    explanation: "TG20:13 uses three site exposure categories: Country (open terrain), Town (suburban or urban), and City (city centres with surrounding buildings). These affect the wind speed calculations and therefore the tie and bracing requirements for the scaffold.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "TG20 wind regions",
    category: "Scaffold Regulations & Standards"
  },
  {
    id: 76,
    question: "Under the Workplace (Health, Safety and Welfare) Regulations 1992, what is the minimum temperature at which scaffolding operations should be reviewed for safe continuation?",
    options: [
      "The regulations do not specify a minimum temperature; risk assessment should consider the effects of cold, ice, and wind chill",
      "0°C — all scaffolding must stop below freezing",
      "5°C — all outdoor work must cease",
      "-10°C — only emergency scaffolding work is permitted"
    ],
    correctAnswer: 0,
    explanation: "There is no single statutory temperature for stopping scaffold work. However, the employer must assess risks from cold, ice on components, reduced grip, and wind chill. TG20 and SG4 advise that frost, ice, and snow create slip hazards requiring additional precautions.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "Cold weather working",
    category: "Scaffold Regulations & Standards"
  },
  {
    id: 77,
    question: "What is the maximum wind speed at which scaffolding erection and dismantling operations should generally cease, according to NASC guidance?",
    options: [
      "Beaufort Scale Force 4 (moderate breeze)",
      "Beaufort Scale Force 6 (strong breeze) or mean wind speed of approximately 23 knots",
      "Beaufort Scale Force 8 (gale)",
      "There is no wind speed limit for scaffolding operations"
    ],
    correctAnswer: 1,
    explanation: "NASC guidance recommends that scaffolding erection and dismantling should cease at Beaufort Force 6 (approximately 23 knots/43 km/h mean wind speed). At this level, handling lightweight components becomes dangerous and the risk of materials being blown from height increases significantly.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "Wind speed limits",
    category: "Scaffold Regulations & Standards"
  },
  {
    id: 78,
    question: "What is the legal position if a worker is injured due to a scaffold defect that should have been identified during a routine inspection?",
    options: [
      "No one is liable as scaffolding is inherently dangerous",
      "The employer and/or the person responsible for the inspection could face prosecution for failing to comply with the Work at Height Regulations and HSWA 1974",
      "Only the injured worker is responsible for checking the scaffold before use",
      "The scaffold manufacturer is always solely liable"
    ],
    correctAnswer: 1,
    explanation: "If a scaffold defect causes injury and should have been identified by proper inspection, the employer and/or competent inspector may face prosecution under HSWA 1974 and the Work at Height Regulations 2005. Fines can be unlimited and custodial sentences may apply for serious breaches.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "Legal liability",
    category: "Scaffold Regulations & Standards"
  },
  {
    id: 79,
    question: "What does Section 3 of the HSWA 1974 require in relation to scaffolding that is accessible to the public?",
    options: [
      "That the scaffold must be painted in bright colours",
      "That the employer conducts their undertaking in a way that ensures, so far as reasonably practicable, that persons not in their employment are not exposed to risks to their health or safety",
      "That the public must sign a waiver before passing the scaffold",
      "That public liability insurance is displayed on the scaffold"
    ],
    correctAnswer: 1,
    explanation: "Section 3 of HSWA 1974 places a duty on employers to ensure non-employees are not exposed to risks from the employer's activities. For scaffolding, this means protecting the public from falling objects, trip hazards, and ensuring safe pedestrian routes around the scaffold.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "Section 3 HSWA",
    category: "Scaffold Regulations & Standards"
  },
  {
    id: 80,
    question: "Under the Work at Height Regulations 2005, Schedule 3, Part 4 covers additional requirements for scaffolding. What key provision does it make regarding incomplete scaffolds?",
    options: [
      "Incomplete scaffolds may be used if the user signs a disclaimer",
      "Incomplete scaffolds must not be used and must be marked with appropriate warning signs to prevent inadvertent use",
      "Incomplete scaffolds can be used for light duties only",
      "Incomplete scaffolds must be demolished immediately"
    ],
    correctAnswer: 1,
    explanation: "Schedule 3 requires that any scaffold which is not available for use (e.g., during erection, dismantling, or alteration) must not be used and must display warning signs indicating it is not complete. Physical barriers should also prevent access.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "Incomplete scaffold provisions",
    category: "Scaffold Regulations & Standards"
  },

  // =======================================================================
  // CATEGORY 3 (Part 1) — Scaffold Components & Assembly — 20 questions (id 81–100)
  // =======================================================================

  // --- basic (7) ---
  {
    id: 81,
    question: "What is the purpose of a 'base plate' in scaffolding?",
    options: [
      "To connect two scaffold tubes at right angles",
      "To spread the load from a standard over a larger area and prevent it sinking into the ground",
      "To secure scaffold boards to the transoms",
      "To provide a fixing point for scaffold ties"
    ],
    correctAnswer: 1,
    explanation: "A base plate is a flat steel plate placed under each standard to distribute the concentrated load over a larger area. This helps prevent the standard from sinking into soft ground and provides a stable foundation for the scaffold.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Base plates",
    category: "Scaffold Components & Assembly"
  },
  {
    id: 82,
    question: "What is a 'sole board' used for in scaffolding?",
    options: [
      "To form the top platform of the scaffold",
      "To distribute the load from the base plate over an even wider area on soft or uneven ground",
      "To protect the feet of scaffolders from sharp objects",
      "To mark the boundary of the scaffold at ground level"
    ],
    correctAnswer: 1,
    explanation: "A sole board is a timber plank placed under the base plate to further spread the load on soft or uneven ground. It must be of adequate size and thickness to prevent the base plate from sinking and must be placed on firm, level ground.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Sole boards",
    category: "Scaffold Components & Assembly"
  },
  {
    id: 83,
    question: "What is a 'right-angle coupler' used for in tube and fitting scaffolding?",
    options: [
      "Joining two tubes end to end in a straight line",
      "Connecting two tubes at 90 degrees to each other",
      "Connecting a scaffold to the building at any angle",
      "Joining a guard rail to a toe board"
    ],
    correctAnswer: 1,
    explanation: "A right-angle coupler (also called a fixed coupler) connects two scaffold tubes at exactly 90 degrees. It is the primary load-bearing coupler used to connect ledgers to standards and transoms to ledgers.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Right-angle couplers",
    category: "Scaffold Components & Assembly"
  },
  {
    id: 84,
    question: "What is a 'swivel coupler' used for?",
    options: [
      "Connecting two tubes at any angle other than 90 degrees",
      "Allowing a scaffold to rotate on its base",
      "Connecting a tube to a flat surface such as a wall",
      "Joining two tubes of different diameters"
    ],
    correctAnswer: 0,
    explanation: "A swivel coupler connects two scaffold tubes at any angle. It is commonly used for fixing bracing tubes to standards or ledgers. Swivel couplers have a lower safe working load than right-angle couplers and should not be used as load-bearing connections.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Swivel couplers",
    category: "Scaffold Components & Assembly"
  },
  {
    id: 85,
    question: "What is the minimum height for a guard rail (top rail) on a scaffold working platform?",
    options: [
      "500 mm above the platform",
      "750 mm above the platform",
      "950 mm above the platform",
      "1200 mm above the platform"
    ],
    correctAnswer: 2,
    explanation: "The Work at Height Regulations 2005 require that the top guard rail on a scaffold must be at least 950 mm above the working platform. An intermediate guard rail must be positioned so that the gap between any rail and the platform or toe board does not exceed 470 mm.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Guard rail height",
    category: "Scaffold Components & Assembly"
  },
  {
    id: 86,
    question: "What is a 'toe board' and what is its purpose?",
    options: [
      "A board placed at the base of a ladder to prevent it slipping",
      "A board fixed at the edge of a scaffold platform to prevent materials and tools from falling off",
      "A board used to protect the toes of boots from damage",
      "A board placed on the ground to mark the scaffold perimeter"
    ],
    correctAnswer: 1,
    explanation: "A toe board is a board at least 150 mm high placed along the open edges of a scaffold platform. Its primary purpose is to prevent materials, tools, and debris from being kicked or falling off the platform onto people below.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Toe boards",
    category: "Scaffold Components & Assembly"
  },
  {
    id: 87,
    question: "What type of bracing runs diagonally across the face of the scaffold from the base to the top?",
    options: [
      "Ledger bracing",
      "Plan bracing",
      "Facade bracing (face bracing)",
      "Cross bracing"
    ],
    correctAnswer: 2,
    explanation: "Facade bracing (also called face bracing or longitudinal bracing) runs diagonally across the face of the scaffold. It prevents the scaffold from racking sideways and is essential for the structural stability of the scaffold.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Facade bracing",
    category: "Scaffold Components & Assembly"
  },

  // --- intermediate (9) ---
  {
    id: 88,
    question: "What is 'plan bracing' and where is it fitted on a scaffold?",
    options: [
      "Bracing drawn on the scaffold design plan but not actually fitted",
      "Diagonal bracing fitted horizontally across the width of the scaffold at specific lifts to prevent the scaffold from twisting",
      "Bracing fitted vertically between the inner and outer standards",
      "Bracing used only on planned future extensions to the scaffold"
    ],
    correctAnswer: 1,
    explanation: "Plan bracing is fitted in the horizontal plane across the width of the scaffold. It prevents the inner and outer rows of standards from moving relative to each other and stops the scaffold from racking or swaying. It is typically required at specific intervals.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Plan bracing",
    category: "Scaffold Components & Assembly"
  },
  {
    id: 89,
    question: "What is a 'putlog coupler' and what is it used for?",
    options: [
      "A coupler that connects two tubes at 90 degrees with a higher load capacity than a right-angle coupler",
      "A single-fitting coupler that fixes a putlog or transom to a ledger, allowing the tube to rest on the ledger rather than being fixed around it",
      "A coupler used exclusively on mobile scaffold towers",
      "A coupler that connects the scaffold to the building wall permanently"
    ],
    correctAnswer: 1,
    explanation: "A putlog coupler is a single-bolt fitting used to fix a transom or putlog to a ledger. Unlike a right-angle coupler which grips both tubes fully, a putlog coupler allows the transom to sit on top of the ledger. Its safe working load is lower than a right-angle coupler.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Putlog couplers",
    category: "Scaffold Components & Assembly"
  },
  {
    id: 90,
    question: "What is the maximum gap permitted between scaffold boards on a working platform?",
    options: [
      "10 mm",
      "25 mm",
      "50 mm",
      "75 mm"
    ],
    correctAnswer: 1,
    explanation: "The maximum permissible gap between scaffold boards on a working platform is 25 mm. Larger gaps create a trip hazard and allow small tools and materials to fall through, posing a risk to persons below.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Board gaps",
    category: "Scaffold Components & Assembly"
  },
  {
    id: 91,
    question: "What is the maximum distance a scaffold board should overhang its support (transom) at each end?",
    options: [
      "No overhang is permitted",
      "A maximum of 4 times the board thickness",
      "A maximum of 150 mm or 4 times the board thickness, whichever is less",
      "Any overhang is acceptable provided the board does not tip"
    ],
    correctAnswer: 2,
    explanation: "Scaffold boards should overhang their end support by a minimum of 50 mm and a maximum of 150 mm (or 4 times the board thickness, whichever is less). Excessive overhang creates a tipping hazard when a load is placed near the unsupported end.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Board overhang",
    category: "Scaffold Components & Assembly"
  },
  {
    id: 92,
    question: "What is the purpose of 'ties' in scaffolding?",
    options: [
      "To tie scaffold boards together to prevent them separating",
      "To connect the scaffold to the building to prevent it from pulling away or pushing towards the structure",
      "To bind scaffold tubes into bundles for transport",
      "To secure safety netting to the scaffold"
    ],
    correctAnswer: 1,
    explanation: "Scaffold ties anchor the scaffold to the building or structure to prevent it from moving away from or towards the building. Ties resist both tension (pulling away) and compression (pushing towards) forces caused by wind, loading, and use.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Scaffold ties",
    category: "Scaffold Components & Assembly"
  },
  {
    id: 93,
    question: "What is a 'box tie' in scaffolding?",
    options: [
      "A cardboard box used to protect coupler threads",
      "A tie arrangement using tubes and couplers to form a box shape around a structural element, connecting the scaffold to the building",
      "A tie made from flexible box-section steel",
      "A tie specifically designed for box-shaped buildings"
    ],
    correctAnswer: 1,
    explanation: "A box tie uses scaffold tubes and couplers to create a rectangular frame that wraps around a column or structural element, connecting it back to the scaffold. Box ties provide excellent resistance to both push and pull forces and are very reliable.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Box ties",
    category: "Scaffold Components & Assembly"
  },
  {
    id: 94,
    question: "What is the standard width of a scaffold board used in the UK?",
    options: [
      "150 mm (6 inches)",
      "225 mm (9 inches)",
      "300 mm (12 inches)",
      "450 mm (18 inches)"
    ],
    correctAnswer: 1,
    explanation: "Standard scaffold boards in the UK are 225 mm (9 inches) wide and 38 mm thick. They are typically available in lengths of 2.4 m, 3.0 m, and 3.9 m, and must comply with BS 2482 for timber scaffold boards.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Board dimensions",
    category: "Scaffold Components & Assembly"
  },
  {
    id: 95,
    question: "What is a 'sleeve coupler' (also known as a joint pin or spigot) used for?",
    options: [
      "Connecting a tube to a flat surface",
      "Joining two scaffold tubes end to end to extend their length",
      "Fixing bracing to standards at an angle",
      "Securing toe boards to the scaffold"
    ],
    correctAnswer: 1,
    explanation: "A sleeve coupler (or spigot/joint pin) is inserted into the bore of two scaffold tubes to join them end to end. It allows standards, ledgers, or other tubes to be extended. The joint must be located close to a node point to maintain structural integrity.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Sleeve couplers",
    category: "Scaffold Components & Assembly"
  },
  {
    id: 96,
    question: "What is a 'check coupler' (also called a supplementary coupler) and when is it used?",
    options: [
      "A coupler used to check the alignment of scaffold tubes",
      "A secondary coupler fitted next to a load-bearing right-angle coupler where the load exceeds the capacity of a single coupler",
      "A coupler used only during scaffold inspection",
      "A coupler that replaces a right-angle coupler on aluminium scaffold"
    ],
    correctAnswer: 1,
    explanation: "A check coupler is an additional coupler fixed beside a right-angle coupler where the load on the connection exceeds the safe working load of a single coupler. It effectively doubles the connection capacity at critical load-bearing joints.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Check couplers",
    category: "Scaffold Components & Assembly"
  },

  // --- advanced (4) ---
  {
    id: 97,
    question: "What is the safe working load (SWL) of a standard right-angle coupler to BS EN 74, and what is its slip load?",
    options: [
      "SWL 5.0 kN, slip load 7.5 kN",
      "SWL 6.25 kN, slip load 9.1 kN",
      "SWL 8.0 kN, slip load 12.0 kN",
      "SWL 10.0 kN, slip load 15.0 kN"
    ],
    correctAnswer: 1,
    explanation: "A standard right-angle coupler to BS EN 74 has a safe working load of 6.25 kN and a characteristic slip load of 9.1 kN. The SWL includes an appropriate factor of safety. Couplers must be tightened to the correct torque to achieve their rated capacity.",
    section: "Module 3",
    difficulty: "advanced",
    topic: "Coupler SWL",
    category: "Scaffold Components & Assembly"
  },
  {
    id: 98,
    question: "When erecting tube and fitting scaffolding, at what maximum height above a working platform can a scaffolder work before an additional platform or advance guard rail is required (as per NASC SG4)?",
    options: [
      "1.2 metres",
      "2.0 metres",
      "3.0 metres",
      "4.0 metres"
    ],
    correctAnswer: 1,
    explanation: "NASC SG4 states that scaffolders must not work at a height greater than 2.0 metres above the last completed platform without additional protection. Advance guard rail systems or personal fall protection must be used when erecting lifts above this height.",
    section: "Module 3",
    difficulty: "advanced",
    topic: "SG4 working height",
    category: "Scaffold Components & Assembly"
  },
  {
    id: 99,
    question: "What is the typical tie pattern for a standard independent scaffold with no cladding, as specified in TG20:13?",
    options: [
      "Every standard at every lift",
      "Alternate standards at alternate lifts, creating a diamond or staggered pattern",
      "One tie per 10 square metres of scaffold face",
      "Ties at the top and bottom only"
    ],
    correctAnswer: 1,
    explanation: "TG20:13 specifies a staggered (diamond) tie pattern for standard independent scaffolds, with ties at alternate standards on alternate lifts. This typically results in one tie per approximately 30-40 m² of scaffold face, though clad scaffolds require significantly more ties.",
    section: "Module 3",
    difficulty: "advanced",
    topic: "Tie patterns",
    category: "Scaffold Components & Assembly"
  },
  {
    id: 100,
    question: "What is the purpose of a 'butt tube' (or 'butt end') in scaffold board support, and what is the maximum unsupported span for a 38 mm thick scaffold board?",
    options: [
      "A butt tube is a short transom added to support boards that do not reach the next transom; maximum span is 1.5 m",
      "A butt tube joins two boards end to end; maximum span is 2.0 m",
      "A butt tube prevents boards from sliding; maximum span is 2.5 m",
      "A butt tube is a tube placed under the board joint; maximum span is 3.0 m"
    ],
    correctAnswer: 0,
    explanation: "A butt tube is an additional transom fitted where scaffold boards of different lengths meet, ensuring neither board overhangs excessively or is unsupported. The maximum unsupported span for a standard 38 mm thick scaffold board is 1.5 m (1.2 m if the board supports closely spaced materials).",
    section: "Module 3",
    difficulty: "advanced",
    topic: "Board spans and butt tubes",
    category: "Scaffold Components & Assembly"
  },
{
    id: 101,
    question: "What is the primary purpose of ledger bracing on a scaffold structure?",
    options: [
      "To provide a working platform",
      "To prevent lateral movement and increase rigidity",
      "To support the base plates",
      "To act as a handrail for operatives"
    ],
    correctAnswer: 1,
    explanation: "Ledger bracing prevents lateral movement along the length of the scaffold, increasing the overall rigidity of the structure. Without adequate bracing, the scaffold could sway or collapse under load or wind pressure.",
    section: "scaffolding-awareness",
    difficulty: "basic",
    topic: "Scaffold Components & Assembly Part 2",
    category: "Scaffold Components & Assembly Part 2"
  },
  {
    id: 102,
    question: "Which type of bracing runs diagonally across the face of a scaffold from bottom to top?",
    options: [
      "Plan bracing",
      "Facade bracing",
      "Ledger bracing",
      "Node bracing"
    ],
    correctAnswer: 1,
    explanation: "Facade bracing (also called face bracing) runs diagonally across the external face of the scaffold structure. It provides stability against lateral forces and is a critical element in preventing the scaffold from racking.",
    section: "scaffolding-awareness",
    difficulty: "basic",
    topic: "Scaffold Components & Assembly Part 2",
    category: "Scaffold Components & Assembly Part 2"
  },
  {
    id: 103,
    question: "What is plan bracing used for in scaffold construction?",
    options: [
      "To support the toe boards",
      "To prevent the scaffold twisting when viewed from above",
      "To anchor the scaffold to the ground",
      "To provide edge protection"
    ],
    correctAnswer: 1,
    explanation: "Plan bracing is installed horizontally and prevents the scaffold from twisting or distorting when viewed in plan (from above). It works in conjunction with facade bracing to maintain the structural integrity of the scaffold.",
    section: "scaffolding-awareness",
    difficulty: "intermediate",
    topic: "Scaffold Components & Assembly Part 2",
    category: "Scaffold Components & Assembly Part 2"
  },
  {
    id: 104,
    question: "What is a 'through tie' in scaffolding?",
    options: [
      "A tie that connects two separate scaffolds together",
      "A tie that passes through the building via an opening such as a window",
      "A tie that connects the toe board to the standard",
      "A tie used only on independent scaffolds"
    ],
    correctAnswer: 1,
    explanation: "A through tie passes through an opening in the building, such as a window, and is secured on the inside face of the wall. It is one of the most effective types of tie as it provides both tension and compression restraint.",
    section: "scaffolding-awareness",
    difficulty: "intermediate",
    topic: "Scaffold Components & Assembly Part 2",
    category: "Scaffold Components & Assembly Part 2"
  },
  {
    id: 105,
    question: "At what typical horizontal spacing should ties be placed on a scaffold that is NOT sheeted?",
    options: [
      "Every bay horizontally and every lift vertically",
      "Every other bay horizontally and every other lift vertically",
      "Only at the top and bottom of the scaffold",
      "Only where the scaffold exceeds 10 metres in height"
    ],
    correctAnswer: 0,
    explanation: "For unsheeted scaffolds, ties are typically required at every bay horizontally and every lift vertically as a general rule, though the exact pattern depends on the scaffold design and TG20 guidance. Adequate tying is essential to prevent the scaffold pulling away from the building.",
    section: "scaffolding-awareness",
    difficulty: "intermediate",
    topic: "Scaffold Components & Assembly Part 2",
    category: "Scaffold Components & Assembly Part 2"
  },
  {
    id: 106,
    question: "How does sheeting or netting a scaffold affect the tie requirements?",
    options: [
      "It has no effect on tie requirements",
      "It reduces the number of ties needed",
      "It significantly increases the wind loading and therefore more ties are required",
      "It only affects ties above 20 metres"
    ],
    correctAnswer: 2,
    explanation: "Sheeting or netting dramatically increases the wind loading on a scaffold because the sheeted surface acts like a sail. This means significantly more ties are needed to secure the scaffold to the building and prevent it from being blown over.",
    section: "scaffolding-awareness",
    difficulty: "intermediate",
    topic: "Scaffold Components & Assembly Part 2",
    category: "Scaffold Components & Assembly Part 2"
  },
  {
    id: 107,
    question: "What is a 'box tie' in scaffold construction?",
    options: [
      "A tie made from a cardboard box template",
      "A tie arrangement using tubes and fittings that wraps around a structural element inside the building",
      "A tie that connects four standards together in a box shape",
      "A tie that is only used on system scaffolds"
    ],
    correctAnswer: 1,
    explanation: "A box tie uses tubes and fittings to create a restraint that wraps around a structural element such as a column inside the building. It provides a positive connection and is particularly useful where through ties cannot be installed.",
    section: "scaffolding-awareness",
    difficulty: "intermediate",
    topic: "Scaffold Components & Assembly Part 2",
    category: "Scaffold Components & Assembly Part 2"
  },
  {
    id: 108,
    question: "What is the main risk if a scaffold has inadequate bracing?",
    options: [
      "The platforms will be too narrow",
      "The scaffold may collapse due to instability",
      "The toe boards will fall off",
      "The base plates will sink"
    ],
    correctAnswer: 1,
    explanation: "Without adequate bracing, a scaffold lacks the structural stability needed to resist lateral forces from wind, loading, and use. This can lead to progressive collapse, which is one of the most serious scaffold failure modes.",
    section: "scaffolding-awareness",
    difficulty: "basic",
    topic: "Scaffold Components & Assembly Part 2",
    category: "Scaffold Components & Assembly Part 2"
  },
  {
    id: 109,
    question: "What is a 'reveal tie' and when might it be used?",
    options: [
      "A tie visible from the outside used for aesthetic purposes",
      "A tie that uses an adjustable tube wedged across a window or door reveal",
      "A tie that is hidden inside the scaffold structure",
      "A tie used exclusively on mobile tower scaffolds"
    ],
    correctAnswer: 1,
    explanation: "A reveal tie uses a reveal tube (an inner tube with a threaded adjustment) that is wedged across a window or door opening. Whilst useful where other tie types are not practical, reveal ties only provide compression restraint and can be less reliable than through ties.",
    section: "scaffolding-awareness",
    difficulty: "intermediate",
    topic: "Scaffold Components & Assembly Part 2",
    category: "Scaffold Components & Assembly Part 2"
  },
  {
    id: 110,
    question: "At what wind speed should work on an exposed scaffold generally be stopped?",
    options: [
      "Any wind at all",
      "When wind speed reaches approximately 17 mph (force 4)",
      "When wind speed reaches approximately 23 mph (force 5)",
      "When the wind reaches gale force (force 8)"
    ],
    correctAnswer: 0,
    explanation: "There is no single universal wind speed limit — the decision depends on the scaffold configuration, height, sheeting, and risk assessment. However, as general guidance, work should be carefully assessed when wind speeds reach around 17-23 mph, and most scaffolds should not be worked on in winds above force 6.",
    section: "scaffolding-awareness",
    difficulty: "advanced",
    topic: "Scaffold Components & Assembly Part 2",
    category: "Scaffold Components & Assembly Part 2"
  },
  {
    id: 111,
    question: "What is the purpose of 'lip ties' or 'anchor ties' drilled into masonry?",
    options: [
      "To hold debris netting in place",
      "To provide a fixing point directly into the building fabric for restraining the scaffold",
      "To support the scaffold boards",
      "To hold warning signs"
    ],
    correctAnswer: 1,
    explanation: "Lip ties or anchor ties are drilled and fixed directly into the masonry or concrete of the building. They provide a reliable fixing point to restrain the scaffold and are particularly useful on buildings where through ties or reveal ties are not practical.",
    section: "scaffolding-awareness",
    difficulty: "intermediate",
    topic: "Scaffold Components & Assembly Part 2",
    category: "Scaffold Components & Assembly Part 2"
  },
  {
    id: 112,
    question: "Why is it important that scaffold bracing is installed in a continuous zigzag pattern?",
    options: [
      "It makes the scaffold look more professional",
      "It ensures that forces are transferred efficiently through the entire scaffold structure",
      "It makes it easier to climb the scaffold",
      "It is only required for aesthetic reasons on public-facing scaffolds"
    ],
    correctAnswer: 1,
    explanation: "A continuous zigzag bracing pattern ensures that lateral forces are transferred efficiently down through the scaffold to the ground. Broken or discontinuous bracing significantly reduces the stability of the scaffold and can create weak points.",
    section: "scaffolding-awareness",
    difficulty: "intermediate",
    topic: "Scaffold Components & Assembly Part 2",
    category: "Scaffold Components & Assembly Part 2"
  },
  {
    id: 113,
    question: "What effect does a sheeted scaffold have on the building it is tied to?",
    options: [
      "No effect whatsoever",
      "It transfers significantly increased wind loads into the building structure",
      "It reduces the load on the building",
      "It only affects the building if the scaffold is above three lifts"
    ],
    correctAnswer: 1,
    explanation: "A sheeted scaffold transfers significantly increased wind loads into the building through the ties. The building structure must be capable of withstanding these additional loads, which is why a structural assessment may be needed before sheeting a scaffold.",
    section: "scaffolding-awareness",
    difficulty: "advanced",
    topic: "Scaffold Components & Assembly Part 2",
    category: "Scaffold Components & Assembly Part 2"
  },
  {
    id: 114,
    question: "What is 'racking' in relation to scaffold stability?",
    options: [
      "The process of stacking materials on the scaffold",
      "The sideways distortion of the scaffold frame caused by horizontal forces",
      "The method of storing scaffold components",
      "The process of adding extra boards to a platform"
    ],
    correctAnswer: 1,
    explanation: "Racking is the sideways distortion of a scaffold structure where the rectangular frame deforms into a parallelogram shape due to horizontal forces. Bracing is the primary means of preventing racking and maintaining the scaffold's geometric stability.",
    section: "scaffolding-awareness",
    difficulty: "intermediate",
    topic: "Scaffold Components & Assembly Part 2",
    category: "Scaffold Components & Assembly Part 2"
  },
  {
    id: 115,
    question: "What is a 'buttress' or 'raker' used for in scaffolding?",
    options: [
      "To provide a temporary working platform",
      "To provide stability to a freestanding scaffold that cannot be tied to a building",
      "To hold the debris netting in place",
      "To act as a ladder for access"
    ],
    correctAnswer: 1,
    explanation: "A buttress or raker is an inclined support that provides stability to a freestanding scaffold where ties to a building are not possible. They transfer horizontal forces to the ground and must be adequately designed and secured at both ends.",
    section: "scaffolding-awareness",
    difficulty: "advanced",
    topic: "Scaffold Components & Assembly Part 2",
    category: "Scaffold Components & Assembly Part 2"
  },
  {
    id: 116,
    question: "Which of the following best describes a 'right-angle coupler' in scaffold construction?",
    options: [
      "A fitting that joins two tubes at any angle",
      "A fitting that joins two tubes at exactly 90 degrees to each other",
      "A fitting used only for connecting bracing",
      "A fitting that allows tubes to slide past each other"
    ],
    correctAnswer: 1,
    explanation: "A right-angle coupler (also called a double coupler) joins two scaffold tubes at exactly 90 degrees. It is the most common fitting used in tube and fitting scaffolds and is used to connect ledgers to standards and transoms to ledgers.",
    section: "scaffolding-awareness",
    difficulty: "basic",
    topic: "Scaffold Components & Assembly Part 2",
    category: "Scaffold Components & Assembly Part 2"
  },
  {
    id: 117,
    question: "What is the purpose of a 'swivel coupler' in scaffolding?",
    options: [
      "To join two tubes at any angle other than 90 degrees",
      "To allow the scaffold to rotate",
      "To connect the scaffold to a crane",
      "To join tubes end to end"
    ],
    correctAnswer: 0,
    explanation: "A swivel coupler joins two scaffold tubes at any angle other than 90 degrees. It is commonly used for connecting bracing members, which run diagonally and therefore do not meet standards or ledgers at right angles.",
    section: "scaffolding-awareness",
    difficulty: "basic",
    topic: "Scaffold Components & Assembly Part 2",
    category: "Scaffold Components & Assembly Part 2"
  },
  {
    id: 118,
    question: "What additional precaution should be taken when a scaffold is erected near overhead power lines?",
    options: [
      "No additional precautions are needed",
      "Exclusion zones must be established and maintained, and the electricity supply authority should be contacted",
      "The scaffold should be painted a bright colour",
      "Only wooden scaffolds may be used"
    ],
    correctAnswer: 1,
    explanation: "Scaffolds near overhead power lines pose an electrocution risk. Exclusion zones must be established in accordance with HSE guidance, the electricity supply authority should be contacted, and in many cases the power lines should be diverted or made dead before work begins.",
    section: "scaffolding-awareness",
    difficulty: "basic",
    topic: "Scaffold Components & Assembly Part 2",
    category: "Scaffold Components & Assembly Part 2"
  },
  {
    id: 119,
    question: "What is the typical safe working load of a standard right-angle coupler?",
    options: [
      "3.25 kN",
      "6.25 kN",
      "12.5 kN",
      "25 kN"
    ],
    correctAnswer: 1,
    explanation: "A standard right-angle coupler has a safe working load of 6.25 kN (approximately 625 kg). This value is critical for scaffold design calculations, and couplers must not be loaded beyond this limit to maintain the structural integrity of the scaffold.",
    section: "scaffolding-awareness",
    difficulty: "advanced",
    topic: "Scaffold Components & Assembly Part 2",
    category: "Scaffold Components & Assembly Part 2"
  },
  {
    id: 120,
    question: "Why must scaffold ties never be removed without authorisation from the scaffold contractor?",
    options: [
      "Because ties are expensive to replace",
      "Because removing ties can compromise the stability of the entire scaffold, risking collapse",
      "Because it would void the scaffold's insurance",
      "Because ties are decorative and part of the design"
    ],
    correctAnswer: 1,
    explanation: "Scaffold ties are critical structural elements that prevent the scaffold from pulling away from or being pushed into the building. Removing even a single tie without proper assessment can compromise the overall stability of the scaffold and potentially lead to collapse.",
    section: "scaffolding-awareness",
    difficulty: "basic",
    topic: "Scaffold Components & Assembly Part 2",
    category: "Scaffold Components & Assembly Part 2"
  },
  {
    id: 121,
    question: "Under the Work at Height Regulations 2005, how often must a scaffold be inspected as a minimum?",
    options: [
      "Once a month",
      "Every 7 days",
      "Every 14 days",
      "Only when damage is reported"
    ],
    correctAnswer: 1,
    explanation: "The Work at Height Regulations 2005 require that scaffolds are inspected at intervals not exceeding 7 days. This regular inspection regime ensures that any defects, damage, or unauthorised alterations are identified and addressed promptly.",
    section: "scaffolding-awareness",
    difficulty: "basic",
    topic: "Scaffold Inspection & Tagging",
    category: "Scaffold Inspection & Tagging"
  },
  {
    id: 122,
    question: "Apart from the 7-day inspection, when else must a scaffold be inspected?",
    options: [
      "Only at the start of each calendar month",
      "After any event likely to have affected its stability, such as adverse weather",
      "Only when a new contractor arrives on site",
      "Only before the scaffold is dismantled"
    ],
    correctAnswer: 1,
    explanation: "In addition to the regular 7-day inspection, scaffolds must be inspected after any event that could have affected their stability. This includes adverse weather such as high winds, heavy rain, or snow, as well as any accidental impact or significant alteration.",
    section: "scaffolding-awareness",
    difficulty: "basic",
    topic: "Scaffold Inspection & Tagging",
    category: "Scaffold Inspection & Tagging"
  },
  {
    id: 123,
    question: "Who is legally permitted to carry out a scaffold inspection under the Work at Height Regulations?",
    options: [
      "Any person working on the site",
      "Only the scaffold erector",
      "A competent person with appropriate training and experience",
      "Only an HSE inspector"
    ],
    correctAnswer: 2,
    explanation: "Scaffold inspections must be carried out by a competent person — someone who has sufficient training, experience, and knowledge to identify defects and assess whether the scaffold is safe. This is a legal requirement under the Work at Height Regulations 2005.",
    section: "scaffolding-awareness",
    difficulty: "basic",
    topic: "Scaffold Inspection & Tagging",
    category: "Scaffold Inspection & Tagging"
  },
  {
    id: 124,
    question: "What does a GREEN scaffold tag indicate?",
    options: [
      "The scaffold is being erected and must not be used",
      "The scaffold has been inspected, is complete, and is safe to use",
      "The scaffold has minor defects but can still be used",
      "The scaffold is due for dismantling"
    ],
    correctAnswer: 1,
    explanation: "A green scaffold tag indicates that the scaffold has been inspected by a competent person, is complete, and is safe for use. Operatives should always check for a green tag before using any scaffold and should read the information on it.",
    section: "scaffolding-awareness",
    difficulty: "basic",
    topic: "Scaffold Inspection & Tagging",
    category: "Scaffold Inspection & Tagging"
  },
  {
    id: 125,
    question: "What does a YELLOW scaffold tag typically indicate?",
    options: [
      "The scaffold is safe for all users",
      "The scaffold has restrictions on its use and operatives must read the limitations",
      "The scaffold is being dismantled",
      "The scaffold requires painting"
    ],
    correctAnswer: 1,
    explanation: "A yellow scaffold tag indicates that the scaffold has restrictions or limitations on its use. This could mean certain lifts are incomplete, loading restrictions apply, or specific areas are not to be accessed. Operatives must read and comply with all stated restrictions.",
    section: "scaffolding-awareness",
    difficulty: "basic",
    topic: "Scaffold Inspection & Tagging",
    category: "Scaffold Inspection & Tagging"
  },
  {
    id: 126,
    question: "What does a RED scaffold tag indicate?",
    options: [
      "The scaffold is ready for heavy loading",
      "The scaffold is incomplete, unsafe, or must not be used",
      "The scaffold is reserved for a specific trade",
      "The scaffold inspection is overdue by one day"
    ],
    correctAnswer: 1,
    explanation: "A red scaffold tag means the scaffold is unsafe, incomplete, or must not be used under any circumstances. This could indicate that it is being erected, dismantled, has failed inspection, or has been damaged. No operative should access a red-tagged scaffold.",
    section: "scaffolding-awareness",
    difficulty: "basic",
    topic: "Scaffold Inspection & Tagging",
    category: "Scaffold Inspection & Tagging"
  },
  {
    id: 127,
    question: "What information must be recorded on a scaffold inspection report under the Work at Height Regulations?",
    options: [
      "Only the date and the inspector's name",
      "The location, date, details of the scaffold, matters checked, and any action taken",
      "Only a photograph of the scaffold",
      "Only whether the scaffold passed or failed"
    ],
    correctAnswer: 1,
    explanation: "Schedule 7 of the Work at Height Regulations 2005 specifies that inspection reports must include the scaffold location and description, the date and time of inspection, details of matters checked, and any action required or taken to address defects.",
    section: "scaffolding-awareness",
    difficulty: "intermediate",
    topic: "Scaffold Inspection & Tagging",
    category: "Scaffold Inspection & Tagging"
  },
  {
    id: 128,
    question: "How long must scaffold inspection records be kept on site?",
    options: [
      "Until the next inspection",
      "Until the scaffold is dismantled",
      "Until the end of construction work at the site",
      "For a minimum of 3 months after the inspection"
    ],
    correctAnswer: 2,
    explanation: "Scaffold inspection records must be kept available on site until the construction work is completed. After that, they should be retained for a further period as part of the project's health and safety file. This ensures a clear audit trail exists.",
    section: "scaffolding-awareness",
    difficulty: "intermediate",
    topic: "Scaffold Inspection & Tagging",
    category: "Scaffold Inspection & Tagging"
  },
  {
    id: 129,
    question: "What should you do if you notice a scaffold tag is missing when you arrive at work?",
    options: [
      "Use the scaffold anyway as it was probably fine yesterday",
      "Do not use the scaffold and report the missing tag to your supervisor immediately",
      "Create your own tag and attach it",
      "Only use the scaffold if other people are already on it"
    ],
    correctAnswer: 1,
    explanation: "If a scaffold tag is missing, you must not use the scaffold. The tag is your confirmation that the scaffold has been inspected and is safe. Report the missing tag to your supervisor so that the scaffold can be re-inspected before anyone uses it.",
    section: "scaffolding-awareness",
    difficulty: "basic",
    topic: "Scaffold Inspection & Tagging",
    category: "Scaffold Inspection & Tagging"
  },
  {
    id: 130,
    question: "During a scaffold inspection, which of the following would be considered a critical defect?",
    options: [
      "A small amount of mud on the boards",
      "Missing or damaged guardrails",
      "A slightly faded scaffold tag",
      "Scaffold boards that are slightly damp from rain"
    ],
    correctAnswer: 1,
    explanation: "Missing or damaged guardrails are a critical defect as they directly affect fall prevention. A scaffold with missing guardrails must not be used until the defect is rectified. Falls from height remain the leading cause of death in the construction industry.",
    section: "scaffolding-awareness",
    difficulty: "basic",
    topic: "Scaffold Inspection & Tagging",
    category: "Scaffold Inspection & Tagging"
  },
  {
    id: 131,
    question: "What should a competent person check regarding the scaffold base during an inspection?",
    options: [
      "Only that the base plates are present",
      "That base plates are on sole boards, the ground is firm, and standards are plumb",
      "Only that the scaffold is level at the top",
      "That the base has been painted"
    ],
    correctAnswer: 1,
    explanation: "During a base inspection, the competent person should check that base plates are sitting on adequate sole boards, the ground is firm and has not been undermined by weather or excavation, and that the standards are plumb. Foundation failure is a common cause of scaffold collapse.",
    section: "scaffolding-awareness",
    difficulty: "intermediate",
    topic: "Scaffold Inspection & Tagging",
    category: "Scaffold Inspection & Tagging"
  },
  {
    id: 132,
    question: "What is Schedule 7 of the Work at Height Regulations 2005?",
    options: [
      "A timetable for scaffold erection",
      "The schedule that prescribes what must be included in a scaffold inspection report",
      "A list of approved scaffold manufacturers",
      "The schedule for scaffold training courses"
    ],
    correctAnswer: 1,
    explanation: "Schedule 7 of the Work at Height Regulations 2005 sets out the particulars that must be included in inspection reports for scaffolds and other working platforms. It ensures that inspection records are comprehensive, consistent, and legally compliant.",
    section: "scaffolding-awareness",
    difficulty: "intermediate",
    topic: "Scaffold Inspection & Tagging",
    category: "Scaffold Inspection & Tagging"
  },
  {
    id: 133,
    question: "What should be checked regarding scaffold ties during an inspection?",
    options: [
      "Only that they are the correct colour",
      "That they are present, secure, undamaged, and have not been removed or loosened",
      "Only that they are present at the top of the scaffold",
      "That they have been recently painted"
    ],
    correctAnswer: 1,
    explanation: "During inspection, all scaffold ties must be checked to confirm they are present as per the design, securely fixed, undamaged, and have not been removed or loosened by other trades. Missing or damaged ties are a critical defect that must be addressed immediately.",
    section: "scaffolding-awareness",
    difficulty: "intermediate",
    topic: "Scaffold Inspection & Tagging",
    category: "Scaffold Inspection & Tagging"
  },
  {
    id: 134,
    question: "If a scaffold inspection reveals that boards are split or damaged, what action should be taken?",
    options: [
      "Turn the boards over so the damage is hidden",
      "The damaged boards must be replaced before the scaffold can be used",
      "Place a warning sign near the damaged boards",
      "Cover the damaged boards with plywood"
    ],
    correctAnswer: 1,
    explanation: "Split or damaged scaffold boards must be removed and replaced with sound boards before the scaffold can be used. Damaged boards can break under load, causing operatives to fall. Turning boards over or covering them does not address the safety risk.",
    section: "scaffolding-awareness",
    difficulty: "basic",
    topic: "Scaffold Inspection & Tagging",
    category: "Scaffold Inspection & Tagging"
  },
  {
    id: 135,
    question: "What is the competent person looking for when checking scaffold couplers during an inspection?",
    options: [
      "That they are a specific brand",
      "That they are tight, undamaged, and correctly positioned on the tubes",
      "That they have been lubricated recently",
      "That they are all the same colour"
    ],
    correctAnswer: 1,
    explanation: "The competent person must check that all couplers are adequately tightened (typically using a podger spanner), are free from damage or corrosion that could reduce their load-bearing capacity, and are correctly positioned on the scaffold tubes as per the design.",
    section: "scaffolding-awareness",
    difficulty: "intermediate",
    topic: "Scaffold Inspection & Tagging",
    category: "Scaffold Inspection & Tagging"
  },
  {
    id: 136,
    question: "What should happen if a scaffold inspection is overdue?",
    options: [
      "The scaffold can still be used for one more day",
      "The scaffold must not be used until it has been inspected by a competent person",
      "Any worker can carry out a quick visual check instead",
      "The scaffold is automatically safe if no damage is visible"
    ],
    correctAnswer: 1,
    explanation: "If a scaffold inspection is overdue, the scaffold must not be used until a competent person has carried out the required inspection. Using a scaffold without a current inspection breaches the Work at Height Regulations 2005 and puts workers at risk.",
    section: "scaffolding-awareness",
    difficulty: "intermediate",
    topic: "Scaffold Inspection & Tagging",
    category: "Scaffold Inspection & Tagging"
  },
  {
    id: 137,
    question: "During an inspection, what should be checked about the scaffold access points?",
    options: [
      "Only that a ladder is present somewhere on the scaffold",
      "That access is safe, ladders are secured and extend above the platform, and stairways are clear",
      "That access points face away from the wind",
      "That the access is painted yellow"
    ],
    correctAnswer: 1,
    explanation: "Access points must be inspected to ensure ladders are properly secured, extend at least 1 metre above the landing platform, and are at the correct angle. Internal stairways must be clear of obstructions, and trap doors must function correctly.",
    section: "scaffolding-awareness",
    difficulty: "intermediate",
    topic: "Scaffold Inspection & Tagging",
    category: "Scaffold Inspection & Tagging"
  },
  {
    id: 138,
    question: "Who is responsible for ensuring that scaffold inspections are carried out on time?",
    options: [
      "The scaffold users",
      "The person on whose behalf the scaffold inspection is carried out (usually the principal contractor)",
      "The local council",
      "The scaffold component manufacturer"
    ],
    correctAnswer: 1,
    explanation: "The duty to arrange scaffold inspections falls on the person on whose behalf the work is being done, which on a construction site is typically the principal contractor. They must ensure a competent person inspects the scaffold at the required intervals.",
    section: "scaffolding-awareness",
    difficulty: "intermediate",
    topic: "Scaffold Inspection & Tagging",
    category: "Scaffold Inspection & Tagging"
  },
  {
    id: 139,
    question: "What is a 'pre-use check' of a scaffold, and who should carry it out?",
    options: [
      "A full structural inspection carried out by the scaffold designer",
      "A visual check carried out by the user before each use to ensure nothing has obviously changed",
      "A check carried out only by the site manager once a month",
      "A check of scaffold materials before they are delivered to site"
    ],
    correctAnswer: 1,
    explanation: "A pre-use check is a quick visual inspection that every scaffold user should carry out before each use. It is not a substitute for the formal 7-day inspection but helps identify obvious hazards such as missing boards, removed guardrails, or overloading.",
    section: "scaffolding-awareness",
    difficulty: "intermediate",
    topic: "Scaffold Inspection & Tagging",
    category: "Scaffold Inspection & Tagging"
  },
  {
    id: 140,
    question: "What should be inspected regarding edge protection during a scaffold inspection?",
    options: [
      "Only that a top guardrail is present",
      "That the top guardrail, mid-rail, and toe boards are all present, secure, and at the correct heights",
      "Only that toe boards are present",
      "That edge protection is painted a bright colour"
    ],
    correctAnswer: 1,
    explanation: "A full inspection of edge protection requires checking that the top guardrail (at least 950mm high), mid-rail, and toe boards (at least 150mm high) are all present, securely fixed, and undamaged. All three elements work together to prevent falls and falling objects.",
    section: "scaffolding-awareness",
    difficulty: "intermediate",
    topic: "Scaffold Inspection & Tagging",
    category: "Scaffold Inspection & Tagging"
  },
  {
    id: 141,
    question: "What is meant by a 'competent person' in the context of scaffold inspections?",
    options: [
      "Someone who has worked on any construction site for at least one year",
      "Someone with sufficient training, experience, and knowledge to identify risks and defects",
      "Someone who holds a degree in structural engineering",
      "Any person who has attended a one-hour induction"
    ],
    correctAnswer: 1,
    explanation: "A competent person for scaffold inspections is someone who has a combination of practical and theoretical knowledge, training, and experience that enables them to identify risks and defects. The level of competence required depends on the complexity of the scaffold.",
    section: "scaffolding-awareness",
    difficulty: "basic",
    topic: "Scaffold Inspection & Tagging",
    category: "Scaffold Inspection & Tagging"
  },
  {
    id: 142,
    question: "If a scaffold has been substantially altered, what must happen before it can be used again?",
    options: [
      "Nothing, it can be used immediately",
      "It must be re-inspected by a competent person and the tag updated accordingly",
      "Only a visual check by any worker is needed",
      "It only needs re-inspecting if the alteration took more than a day"
    ],
    correctAnswer: 1,
    explanation: "After any substantial alteration, the scaffold must be re-inspected by a competent person before it can be used. The scaffold tag must be updated to reflect the current status. This ensures that the alteration has not compromised the scaffold's safety.",
    section: "scaffolding-awareness",
    difficulty: "intermediate",
    topic: "Scaffold Inspection & Tagging",
    category: "Scaffold Inspection & Tagging"
  },
  {
    id: 143,
    question: "What should you check about scaffold boards during an inspection?",
    options: [
      "Only that boards are present",
      "That boards are in good condition, properly supported, secured against uplift, and not overhanging excessively",
      "Only that the boards are level",
      "That the boards are all the same colour"
    ],
    correctAnswer: 1,
    explanation: "Scaffold boards must be checked for splits, cracks, rot, and warping. They must be properly supported with no more than 150mm overhang at each end, secured against wind uplift, and must not have excessive gaps between them that could trap a foot.",
    section: "scaffolding-awareness",
    difficulty: "intermediate",
    topic: "Scaffold Inspection & Tagging",
    category: "Scaffold Inspection & Tagging"
  },
  {
    id: 144,
    question: "What must happen when a scaffold inspection identifies defects that cannot be immediately rectified?",
    options: [
      "The scaffold can still be used if workers are careful",
      "The affected area must be taken out of service, signed, and barriers erected until the defects are fixed",
      "A verbal warning to workers is sufficient",
      "The defects can be left until the next scheduled inspection"
    ],
    correctAnswer: 1,
    explanation: "If defects cannot be immediately rectified, the affected area of the scaffold must be taken out of service. Physical barriers must be erected to prevent access, and clear signage must indicate that the scaffold is not to be used. The scaffold tag should be changed to red.",
    section: "scaffolding-awareness",
    difficulty: "intermediate",
    topic: "Scaffold Inspection & Tagging",
    category: "Scaffold Inspection & Tagging"
  },
  {
    id: 145,
    question: "What is the main purpose of the scaffold tag system?",
    options: [
      "To show which company erected the scaffold",
      "To clearly communicate the current safety status of the scaffold to all users",
      "To display the scaffold's serial number",
      "To show when the scaffold was first erected"
    ],
    correctAnswer: 1,
    explanation: "The scaffold tag system provides a clear, visual means of communicating the current inspection and safety status of a scaffold to all users. It allows operatives to quickly determine whether a scaffold is safe to use, has restrictions, or must not be accessed.",
    section: "scaffolding-awareness",
    difficulty: "basic",
    topic: "Scaffold Inspection & Tagging",
    category: "Scaffold Inspection & Tagging"
  },
  {
    id: 146,
    question: "Under the Work at Height Regulations, what must the inspection report include about the person carrying out the inspection?",
    options: [
      "Only their first name",
      "Their name, qualifications, and the name of the employer for whom they carried out the inspection",
      "Only their employee number",
      "Only a signature"
    ],
    correctAnswer: 1,
    explanation: "The inspection report must include the name of the person who carried out the inspection and, where the inspection is carried out on behalf of an employer, the employer's name. This creates accountability and provides a point of contact for any queries about the inspection.",
    section: "scaffolding-awareness",
    difficulty: "advanced",
    topic: "Scaffold Inspection & Tagging",
    category: "Scaffold Inspection & Tagging"
  },
  {
    id: 147,
    question: "What should a scaffold inspector check regarding the relationship between the scaffold and adjacent structures?",
    options: [
      "Nothing — adjacent structures are not relevant",
      "That there are no gaps where a person could fall between the scaffold and the building face",
      "Only that the scaffold looks neat from the street",
      "Only that the scaffold does not touch the building"
    ],
    correctAnswer: 1,
    explanation: "The inspector must check that gaps between the scaffold platform and the building face are not large enough for a person to fall through. If gaps exceed 225mm, additional measures such as infill platforms or extra guardrails must be provided to prevent falls.",
    section: "scaffolding-awareness",
    difficulty: "intermediate",
    topic: "Scaffold Inspection & Tagging",
    category: "Scaffold Inspection & Tagging"
  },
  {
    id: 148,
    question: "What is the significance of the date and time recorded on a scaffold inspection report?",
    options: [
      "It is only needed for filing purposes",
      "It establishes when the inspection was carried out and when the next inspection is due",
      "It is only required if the scaffold failed the inspection",
      "It is optional information"
    ],
    correctAnswer: 1,
    explanation: "The date and time of inspection are essential as they establish when the inspection was carried out and allow calculation of when the next inspection is due (within 7 days). They also create a timeline of events that can be critical in any accident investigation.",
    section: "scaffolding-awareness",
    difficulty: "intermediate",
    topic: "Scaffold Inspection & Tagging",
    category: "Scaffold Inspection & Tagging"
  },
  {
    id: 149,
    question: "When inspecting a scaffold after high winds, what should the competent person pay particular attention to?",
    options: [
      "Whether the paint has faded",
      "Whether ties are intact, bracing is undamaged, sheeting is secure, and the scaffold is still plumb",
      "Only whether the scaffold tag is still attached",
      "Whether the scaffold boards are wet"
    ],
    correctAnswer: 1,
    explanation: "After high winds, the inspector must pay particular attention to the integrity of ties, bracing, and any sheeting or netting. They should also check that the scaffold remains plumb and level, as wind can cause movement, loosening, or damage to critical structural elements.",
    section: "scaffolding-awareness",
    difficulty: "intermediate",
    topic: "Scaffold Inspection & Tagging",
    category: "Scaffold Inspection & Tagging"
  },
  {
    id: 150,
    question: "What should be checked about loading during a scaffold inspection?",
    options: [
      "Only that materials are stacked neatly",
      "That the scaffold is not overloaded and that materials are evenly distributed as per the design loading class",
      "Nothing about loading — that is the user's responsibility only",
      "Only that no loading is present at the time of inspection"
    ],
    correctAnswer: 1,
    explanation: "The inspector must check that the scaffold is not overloaded beyond its design capacity and that materials stored on the platform are distributed evenly. Point loads and excessive materials on one area can overload individual components and cause localised or progressive failure.",
    section: "scaffolding-awareness",
    difficulty: "intermediate",
    topic: "Scaffold Inspection & Tagging",
    category: "Scaffold Inspection & Tagging"
  },
  {
    id: 151,
    question: "Can a scaffold user refuse to use a scaffold they believe is unsafe?",
    options: [
      "No, they must use it if instructed to by their supervisor",
      "Yes, every worker has the right to refuse to work on a scaffold they believe to be unsafe",
      "Only if they are a qualified scaffolder",
      "Only if they have written permission from the HSE"
    ],
    correctAnswer: 1,
    explanation: "Under UK health and safety law, every worker has the right to refuse to carry out work they reasonably believe poses a serious and imminent danger. If you believe a scaffold is unsafe, you should report it to your supervisor and not use it until it has been checked.",
    section: "scaffolding-awareness",
    difficulty: "basic",
    topic: "Scaffold Inspection & Tagging",
    category: "Scaffold Inspection & Tagging"
  },
  {
    id: 152,
    question: "What does the inspection report need to state about the scaffold's intended use?",
    options: [
      "Nothing about the intended use",
      "The type and purpose of the scaffold, including any loading classification",
      "Only the trade that will use the scaffold",
      "Only the maximum number of people allowed on it"
    ],
    correctAnswer: 1,
    explanation: "The inspection report should clearly state the scaffold's intended use and loading classification. This is important because a scaffold designed for light duty (inspection access) is not suitable for heavy loading (masonry work) and users need to know the limitations.",
    section: "scaffolding-awareness",
    difficulty: "advanced",
    topic: "Scaffold Inspection & Tagging",
    category: "Scaffold Inspection & Tagging"
  },
  {
    id: 153,
    question: "What should be done if you discover that someone has removed guardrails from a scaffold to pass materials through?",
    options: [
      "Leave them off as someone must need the access",
      "Report it immediately, stop work in that area, and ensure the guardrails are reinstated before work continues",
      "Replace them at the end of the day",
      "Only report it if someone falls"
    ],
    correctAnswer: 1,
    explanation: "Removing guardrails without authorisation is extremely dangerous and a common cause of falls from scaffolds. Work must stop immediately in the affected area, the situation must be reported, and the guardrails must be reinstated before anyone works on that section.",
    section: "scaffolding-awareness",
    difficulty: "intermediate",
    topic: "Scaffold Inspection & Tagging",
    category: "Scaffold Inspection & Tagging"
  },
  {
    id: 154,
    question: "During an inspection, corrosion is found on several scaffold tubes. What should the inspector assess?",
    options: [
      "Only whether the corrosion looks unsightly",
      "Whether the corrosion has reduced the wall thickness of the tubes to the point where their load-bearing capacity is compromised",
      "Nothing — all scaffold tubes are corrosion-resistant",
      "Only whether the corrosion can be painted over"
    ],
    correctAnswer: 1,
    explanation: "The inspector must assess whether corrosion has reduced the wall thickness of the tubes sufficiently to compromise their structural capacity. Heavily corroded tubes must be removed from service as they can fail under load, potentially causing scaffold collapse.",
    section: "scaffolding-awareness",
    difficulty: "advanced",
    topic: "Scaffold Inspection & Tagging",
    category: "Scaffold Inspection & Tagging"
  },
  {
    id: 155,
    question: "What should the competent person verify about the scaffold design during an inspection?",
    options: [
      "That the scaffold matches the original aesthetic drawings",
      "That the scaffold conforms to the design or TG20 compliance sheet and no unauthorised modifications have been made",
      "That the scaffold uses the most expensive components available",
      "Nothing about the design — only the condition matters"
    ],
    correctAnswer: 1,
    explanation: "The competent person should verify that the scaffold as built conforms to its design specification or TG20 compliance sheet. Any unauthorised modifications, such as removed ties, missing bracing, or altered configurations, must be identified and reported.",
    section: "scaffolding-awareness",
    difficulty: "advanced",
    topic: "Scaffold Inspection & Tagging",
    category: "Scaffold Inspection & Tagging"
  },
  {
    id: 156,
    question: "Why must scaffold inspection results be communicated to all site workers, not just management?",
    options: [
      "It is not necessary to inform site workers",
      "So that all workers know the current status of each scaffold and can avoid unsafe scaffolds",
      "Only for union negotiation purposes",
      "Only to satisfy insurance requirements"
    ],
    correctAnswer: 1,
    explanation: "All site workers who may use the scaffold need to know its current status. The scaffold tag system is the primary means of communicating this, but toolbox talks and site briefings also help ensure everyone is aware of any restrictions or hazards.",
    section: "scaffolding-awareness",
    difficulty: "intermediate",
    topic: "Scaffold Inspection & Tagging",
    category: "Scaffold Inspection & Tagging"
  },
  {
    id: 157,
    question: "What should the inspector check regarding the ground conditions beneath a scaffold?",
    options: [
      "Only that the ground is dry",
      "That the ground has not been disturbed by excavation, is not waterlogged, and sole boards are adequate",
      "Nothing — ground conditions are only checked at initial erection",
      "Only that there are no weeds growing"
    ],
    correctAnswer: 1,
    explanation: "Ground conditions can change over time due to weather, excavation works nearby, or vehicle movements. The inspector must check that the ground beneath the scaffold remains firm, has not been undermined or become waterlogged, and that sole boards remain in good condition.",
    section: "scaffolding-awareness",
    difficulty: "intermediate",
    topic: "Scaffold Inspection & Tagging",
    category: "Scaffold Inspection & Tagging"
  },
  {
    id: 158,
    question: "What is the minimum that a scaffold inspection must include according to Schedule 7?",
    options: [
      "A verbal confirmation that the scaffold looks fine",
      "A written or electronic record covering all matters specified in Schedule 7 of the WAH Regulations",
      "A photograph of the scaffold from ground level",
      "A phone call to the scaffold company"
    ],
    correctAnswer: 1,
    explanation: "Schedule 7 requires a formal written or electronic record that covers specific matters including the name and address of the person for whom the inspection was carried out, the location and description of the scaffold, results of the inspection, and any required actions.",
    section: "scaffolding-awareness",
    difficulty: "intermediate",
    topic: "Scaffold Inspection & Tagging",
    category: "Scaffold Inspection & Tagging"
  },
  {
    id: 159,
    question: "What action should be taken if an inspection reveals that the scaffold's loading classification has been exceeded?",
    options: [
      "Make a note for the next inspection",
      "The excess materials must be removed immediately and the scaffold checked for damage before resuming use",
      "Add extra boards to spread the load",
      "Increase the loading classification on the tag"
    ],
    correctAnswer: 1,
    explanation: "If a scaffold has been overloaded, the excess materials must be removed immediately. The scaffold must then be thoroughly checked for any damage to components caused by the overloading, such as bent tubes or slipped couplers, before it can be used again.",
    section: "scaffolding-awareness",
    difficulty: "intermediate",
    topic: "Scaffold Inspection & Tagging",
    category: "Scaffold Inspection & Tagging"
  },
  {
    id: 160,
    question: "What role does a scaffold inspection play in an accident investigation?",
    options: [
      "No role — inspections are separate from accident investigations",
      "Inspection records provide evidence of the scaffold's condition and whether it was properly maintained",
      "Inspections are only used for insurance claims",
      "Inspections are only relevant if the HSE decides to prosecute"
    ],
    correctAnswer: 1,
    explanation: "Scaffold inspection records are critical evidence in any accident investigation. They demonstrate whether the scaffold was being properly maintained, whether defects were identified and addressed, and whether the duty holder was complying with their legal obligations.",
    section: "scaffolding-awareness",
    difficulty: "advanced",
    topic: "Scaffold Inspection & Tagging",
    category: "Scaffold Inspection & Tagging"
  },
  {
    id: 161,
    question: "What is the leading cause of fatal accidents in the UK construction industry?",
    options: [
      "Electrocution",
      "Falls from height",
      "Being struck by a vehicle",
      "Exposure to harmful substances"
    ],
    correctAnswer: 1,
    explanation: "Falls from height are consistently the leading cause of fatal accidents in the UK construction industry. This is why the Work at Height Regulations 2005 exist and why scaffold safety is given such high priority on construction sites.",
    section: "scaffolding-awareness",
    difficulty: "basic",
    topic: "Safe Use & Hazard Awareness",
    category: "Safe Use & Hazard Awareness"
  },
  {
    id: 162,
    question: "What should you always do before stepping onto a scaffold platform?",
    options: [
      "Remove your hard hat",
      "Check for a valid scaffold tag and carry out a visual pre-use check",
      "Test the platform by jumping on it",
      "Nothing — if the scaffold is there, it must be safe"
    ],
    correctAnswer: 1,
    explanation: "Before using any scaffold, you should check for a valid green or yellow scaffold tag and carry out a quick visual pre-use check. Look for obvious defects such as missing boards, removed guardrails, excessive materials, or damage to the structure.",
    section: "scaffolding-awareness",
    difficulty: "basic",
    topic: "Safe Use & Hazard Awareness",
    category: "Safe Use & Hazard Awareness"
  },
  {
    id: 163,
    question: "What is the most common cause of scaffold collapse?",
    options: [
      "Using the wrong colour scaffold tubes",
      "Failure of ties, overloading, or inadequate foundations",
      "Using the scaffold during daylight hours",
      "Having too many scaffold tags attached"
    ],
    correctAnswer: 1,
    explanation: "The most common causes of scaffold collapse include tie failure or removal, overloading beyond design capacity, and inadequate foundations. These factors, often in combination, account for the majority of scaffold collapse incidents in the UK.",
    section: "scaffolding-awareness",
    difficulty: "intermediate",
    topic: "Safe Use & Hazard Awareness",
    category: "Safe Use & Hazard Awareness"
  },
  {
    id: 164,
    question: "What PPE should you wear as a minimum when working on a scaffold?",
    options: [
      "No PPE is required on a scaffold with guardrails",
      "Hard hat, high-visibility clothing, and safety footwear as a minimum",
      "Only a hard hat",
      "Only safety footwear"
    ],
    correctAnswer: 1,
    explanation: "As a minimum, you should wear a hard hat (to protect against falling objects), high-visibility clothing (so you can be seen by others), and safety footwear with good grip (to prevent slips and protect your feet). Additional PPE may be required depending on the task.",
    section: "scaffolding-awareness",
    difficulty: "basic",
    topic: "Safe Use & Hazard Awareness",
    category: "Safe Use & Hazard Awareness"
  },
  {
    id: 165,
    question: "What is the maximum safe working wind speed generally cited for working on most standard scaffolds?",
    options: [
      "There is no wind speed limit",
      "Approximately 23 mph (Beaufort scale force 5) as a general guide, subject to risk assessment",
      "70 mph",
      "Only hurricane-force winds require stopping work"
    ],
    correctAnswer: 1,
    explanation: "As a general guide, work on scaffolds should be carefully assessed when winds reach around 23 mph (force 5). However, the actual limit depends on the specific scaffold design, height, exposure, and whether the scaffold is sheeted. A site-specific risk assessment should determine the limit.",
    section: "scaffolding-awareness",
    difficulty: "intermediate",
    topic: "Safe Use & Hazard Awareness",
    category: "Safe Use & Hazard Awareness"
  },
  {
    id: 166,
    question: "Why should materials never be thrown from a scaffold?",
    options: [
      "Because it creates too much noise",
      "Because falling objects can cause serious injury or death to people below",
      "Because it damages the materials",
      "Because it is only prohibited on Sundays"
    ],
    correctAnswer: 1,
    explanation: "Throwing materials from a scaffold creates a serious risk of injury or death to people below. Objects must be lowered using suitable means such as a rubbish chute, crane, or hoist. Brick guards and toe boards help prevent accidental falls of materials.",
    section: "scaffolding-awareness",
    difficulty: "basic",
    topic: "Safe Use & Hazard Awareness",
    category: "Safe Use & Hazard Awareness"
  },
  {
    id: 167,
    question: "What should you do if you notice that scaffold boards are covered in ice or frost?",
    options: [
      "Work carefully and hold onto the guardrails",
      "Do not use the scaffold until the ice or frost has been cleared or treated to prevent slips",
      "Wear wellington boots for extra grip",
      "Only use the scaffold if you stay in the centre of the platform"
    ],
    correctAnswer: 1,
    explanation: "Ice and frost make scaffold platforms extremely slippery and significantly increase the risk of falls. The scaffold should not be used until the boards have been cleared or gritted. Working on icy platforms, even with guardrails, is dangerous.",
    section: "scaffolding-awareness",
    difficulty: "intermediate",
    topic: "Safe Use & Hazard Awareness",
    category: "Safe Use & Hazard Awareness"
  },
  {
    id: 168,
    question: "What is 'scaffold overloading' and why is it dangerous?",
    options: [
      "Having too many scaffold tags — it causes confusion",
      "Placing more weight on the scaffold than its design allows, which can cause collapse",
      "Having too many workers inspecting the scaffold at once",
      "Using more scaffold tubes than the design requires"
    ],
    correctAnswer: 1,
    explanation: "Scaffold overloading occurs when the weight of materials, equipment, and people on the scaffold exceeds the design loading capacity. This can cause individual components to fail, leading to localised or progressive collapse of the entire scaffold.",
    section: "scaffolding-awareness",
    difficulty: "basic",
    topic: "Safe Use & Hazard Awareness",
    category: "Safe Use & Hazard Awareness"
  },
  {
    id: 169,
    question: "What is a brick guard and why is it important?",
    options: [
      "A guard dog that protects stacked bricks",
      "A mesh panel fitted above the toe board to prevent materials and debris falling from the scaffold",
      "A cover placed over bricks to keep them dry",
      "A sign that says 'danger — falling bricks'"
    ],
    correctAnswer: 1,
    explanation: "A brick guard is a mesh panel fitted between the toe board and the guardrail. It prevents small objects, tools, and debris from falling off the scaffold and striking people below. It is particularly important when working above public areas or other workers.",
    section: "scaffolding-awareness",
    difficulty: "intermediate",
    topic: "Safe Use & Hazard Awareness",
    category: "Safe Use & Hazard Awareness"
  },
  {
    id: 170,
    question: "What is the correct way to access a scaffold?",
    options: [
      "Climb up the outside of the scaffold using the standards and ledgers",
      "Use the designated access points such as internal ladders or staircases provided",
      "Use any ladder leaned against the scaffold",
      "Jump from a nearby window onto the platform"
    ],
    correctAnswer: 1,
    explanation: "Scaffolds must only be accessed using the designated access points, typically internal ladders secured at each lift or scaffold staircases. Climbing the outside of the scaffold or using unauthorised access routes is extremely dangerous and prohibited.",
    section: "scaffolding-awareness",
    difficulty: "basic",
    topic: "Safe Use & Hazard Awareness",
    category: "Safe Use & Hazard Awareness"
  },
  {
    id: 171,
    question: "What is the danger of using a scaffold as an anchor point for a gin wheel or crane without authorisation?",
    options: [
      "There is no danger as scaffolds are designed for this",
      "The additional point loads and dynamic forces can exceed the scaffold's design capacity, causing failure",
      "It is only dangerous if the gin wheel is rusty",
      "It is only a problem if the scaffold is less than 5 metres high"
    ],
    correctAnswer: 1,
    explanation: "Using a scaffold as an anchor for lifting equipment introduces concentrated point loads and dynamic forces that the scaffold may not have been designed to withstand. This can cause localised failure or progressive collapse of the structure. Any such use must be assessed and approved by the scaffold designer.",
    section: "scaffolding-awareness",
    difficulty: "advanced",
    topic: "Safe Use & Hazard Awareness",
    category: "Safe Use & Hazard Awareness"
  },
  {
    id: 172,
    question: "Why is it dangerous to store excessive materials on a scaffold platform?",
    options: [
      "It makes the scaffold look untidy",
      "It can overload the scaffold beyond its design capacity and create trip hazards on the platform",
      "It makes it harder to see the scaffold tag",
      "It is only dangerous if the materials are flammable"
    ],
    correctAnswer: 1,
    explanation: "Excessive materials on a scaffold platform can overload the structure beyond its design capacity, leading to structural failure. They also create trip hazards, reduce the working space available, and can block access and escape routes on the platform.",
    section: "scaffolding-awareness",
    difficulty: "intermediate",
    topic: "Safe Use & Hazard Awareness",
    category: "Safe Use & Hazard Awareness"
  },
  {
    id: 173,
    question: "What should you do if you see someone altering a scaffold who is not a qualified scaffolder?",
    options: [
      "Help them to speed up the work",
      "Stop them if safe to do so, and report the matter to your supervisor immediately",
      "Ignore it — it is not your responsibility",
      "Take a photograph and post it on social media"
    ],
    correctAnswer: 1,
    explanation: "Only trained and competent scaffolders should alter scaffold structures. Unauthorised alterations can compromise the scaffold's structural integrity and safety. If you see someone altering a scaffold without authorisation, stop them if safe to do so and report it immediately.",
    section: "scaffolding-awareness",
    difficulty: "intermediate",
    topic: "Safe Use & Hazard Awareness",
    category: "Safe Use & Hazard Awareness"
  },
  {
    id: 174,
    question: "What is the risk of working on a scaffold during an electrical storm?",
    options: [
      "No risk — scaffolds are insulated",
      "Metal scaffold structures can conduct lightning strikes, creating an extreme electrocution risk",
      "The only risk is getting wet",
      "It is safe as long as you wear rubber-soled boots"
    ],
    correctAnswer: 1,
    explanation: "Metal scaffold structures are excellent conductors of electricity. During an electrical storm, a lightning strike on or near the scaffold could be conducted through the metal tubes, creating an extreme electrocution risk for anyone on or touching the scaffold. Work must stop immediately.",
    section: "scaffolding-awareness",
    difficulty: "intermediate",
    topic: "Safe Use & Hazard Awareness",
    category: "Safe Use & Hazard Awareness"
  },
  {
    id: 175,
    question: "What responsibility does every scaffold user have under health and safety law?",
    options: [
      "No responsibility — only the scaffold company is responsible",
      "To take reasonable care of their own safety and that of others, and to report any defects they find",
      "Only to sign in and out of the scaffold",
      "Only to wear a hard hat"
    ],
    correctAnswer: 1,
    explanation: "Under the Health and Safety at Work etc. Act 1974, every worker has a duty to take reasonable care of their own safety and that of others who may be affected by their actions. This includes reporting any scaffold defects, not making unauthorised alterations, and following safe working procedures.",
    section: "scaffolding-awareness",
    difficulty: "intermediate",
    topic: "Safe Use & Hazard Awareness",
    category: "Safe Use & Hazard Awareness"
  },
  {
    id: 176,
    question: "What should be established at ground level around a scaffold where there is a risk of falling objects?",
    options: [
      "A garden border",
      "An exclusion zone with barriers and warning signs to keep people away from the danger area",
      "A row of traffic cones only",
      "Nothing — people below should just look up"
    ],
    correctAnswer: 1,
    explanation: "Where there is a risk of falling objects, an exclusion zone must be established at ground level using barriers and clear warning signs. This prevents unauthorised access to the danger area and protects people from being struck by falling materials or tools.",
    section: "scaffolding-awareness",
    difficulty: "intermediate",
    topic: "Safe Use & Hazard Awareness",
    category: "Safe Use & Hazard Awareness"
  },
  {
    id: 177,
    question: "What action should you take if you feel unwell or dizzy whilst working on a scaffold at height?",
    options: [
      "Continue working and hope you feel better",
      "Stop work, inform a colleague, and descend to ground level carefully using the proper access route",
      "Sit on the edge of the platform for fresh air",
      "Wait until your break time to come down"
    ],
    correctAnswer: 1,
    explanation: "If you feel unwell or dizzy at height, you should stop work immediately, inform a nearby colleague, and carefully descend to ground level using the proper access route. Continuing to work whilst unwell at height significantly increases the risk of a fall.",
    section: "scaffolding-awareness",
    difficulty: "basic",
    topic: "Safe Use & Hazard Awareness",
    category: "Safe Use & Hazard Awareness"
  },
  {
    id: 178,
    question: "Why must scaffold platforms be kept clear of unnecessary materials, tools, and debris?",
    options: [
      "For appearance purposes only",
      "To prevent trip hazards, reduce overloading risks, and maintain clear access and escape routes",
      "So the scaffold looks good in photographs",
      "Only to please the site manager during audits"
    ],
    correctAnswer: 1,
    explanation: "Keeping scaffold platforms clear is essential for safety. Loose materials create trip hazards that can cause falls, accumulated weight can overload the scaffold, and clutter can block access routes and emergency escape paths. Good housekeeping is a fundamental safety requirement.",
    section: "scaffolding-awareness",
    difficulty: "intermediate",
    topic: "Safe Use & Hazard Awareness",
    category: "Safe Use & Hazard Awareness"
  },
  {
    id: 179,
    question: "What is the main danger if a scaffold is erected on soft or uncompacted ground?",
    options: [
      "The scaffold will be too low",
      "The standards can sink unevenly, causing the scaffold to become unstable and potentially collapse",
      "The toe boards will get muddy",
      "It will be difficult to attach a scaffold tag"
    ],
    correctAnswer: 1,
    explanation: "Soft or uncompacted ground can cause scaffold standards to sink unevenly, leading to the scaffold leaning, becoming unstable, and potentially collapsing. This is why adequate sole boards and firm ground are essential requirements for scaffold foundations.",
    section: "scaffolding-awareness",
    difficulty: "intermediate",
    topic: "Safe Use & Hazard Awareness",
    category: "Safe Use & Hazard Awareness"
  },
  {
    id: 180,
    question: "What is a 'loading bay' on a scaffold and what precaution must be taken?",
    options: [
      "A bay where workers load their tools each morning",
      "A section of scaffold designed for receiving materials by crane, which must have a gate that is kept closed except during loading",
      "A bay at the bottom of the scaffold where materials are stored on the ground",
      "A bay that is always left open for ventilation"
    ],
    correctAnswer: 1,
    explanation: "A loading bay is a purpose-designed section of the scaffold where materials can be landed by crane or hoist. It must have a gate that remains closed except when materials are actively being loaded or unloaded, to prevent falls from the open edge.",
    section: "scaffolding-awareness",
    difficulty: "intermediate",
    topic: "Safe Use & Hazard Awareness",
    category: "Safe Use & Hazard Awareness"
  },
  {
    id: 181,
    question: "When is a harness and lanyard required on a scaffold?",
    options: [
      "Always, even with full guardrails",
      "When the risk assessment identifies a residual fall risk that guardrails alone cannot control, such as during erection or dismantling",
      "Only on scaffolds above 50 metres",
      "Never — scaffolds always have guardrails"
    ],
    correctAnswer: 1,
    explanation: "Harnesses are typically required during scaffold erection and dismantling when full edge protection is not yet in place, or where the risk assessment identifies a specific residual fall risk. For normal use on a fully guarded scaffold, collective protection (guardrails) is the primary fall prevention measure.",
    section: "scaffolding-awareness",
    difficulty: "advanced",
    topic: "Safe Use & Hazard Awareness",
    category: "Safe Use & Hazard Awareness"
  },
  {
    id: 182,
    question: "What is the danger of leaning ladders against a scaffold to create an unauthorised access point?",
    options: [
      "There is no danger if the ladder is long enough",
      "The ladder may not be properly secured, the scaffold may not be designed for this load point, and it bypasses controlled access",
      "It is only dangerous if the ladder is made of aluminium",
      "It is permitted as long as the ladder is tied at the top"
    ],
    correctAnswer: 1,
    explanation: "Leaning an unsecured ladder against a scaffold creates multiple hazards: the ladder may slip or fall, the scaffold may not be designed for the point load at that location, and it bypasses the controlled access points where proper edge protection is provided.",
    section: "scaffolding-awareness",
    difficulty: "intermediate",
    topic: "Safe Use & Hazard Awareness",
    category: "Safe Use & Hazard Awareness"
  },
  {
    id: 183,
    question: "What effect can heavy rain have on scaffold safety?",
    options: [
      "No effect at all",
      "Platforms become slippery, ground conditions can deteriorate, and water can add weight to the scaffold",
      "It only affects wooden scaffolds",
      "Rain only matters if it lasts more than a week"
    ],
    correctAnswer: 1,
    explanation: "Heavy rain creates multiple scaffold hazards: platforms become slippery and increase fall risk, ground beneath the scaffold can soften or become waterlogged affecting foundations, and accumulated water on sheeting or in containers adds weight that can overload the structure.",
    section: "scaffolding-awareness",
    difficulty: "intermediate",
    topic: "Safe Use & Hazard Awareness",
    category: "Safe Use & Hazard Awareness"
  },
  {
    id: 184,
    question: "What is the correct procedure if you discover a scaffold defect during your working day?",
    options: [
      "Fix it yourself",
      "Stop using the affected area, report the defect to your supervisor immediately, and do not return until the defect is rectified",
      "Tell your colleagues to be careful",
      "Make a note and mention it at the next weekly meeting"
    ],
    correctAnswer: 1,
    explanation: "If you discover a scaffold defect, you must stop using the affected area immediately and report it to your supervisor without delay. The defect must be assessed and rectified by a competent scaffolder before anyone can safely work in that area again.",
    section: "scaffolding-awareness",
    difficulty: "basic",
    topic: "Safe Use & Hazard Awareness",
    category: "Safe Use & Hazard Awareness"
  },
  {
    id: 185,
    question: "Why should operatives not sit on or lean over scaffold guardrails?",
    options: [
      "Because the guardrails might get bent",
      "Because guardrails are not designed to support body weight in that manner, and doing so can lead to a fall over the edge",
      "Because it looks unprofessional",
      "Because it blocks the view for other workers"
    ],
    correctAnswer: 1,
    explanation: "Scaffold guardrails are designed to prevent accidental falls, not to support the full weight of a person leaning on or sitting on them. Leaning over or sitting on guardrails raises your centre of gravity above the protection and can result in a fall from height.",
    section: "scaffolding-awareness",
    difficulty: "intermediate",
    topic: "Safe Use & Hazard Awareness",
    category: "Safe Use & Hazard Awareness"
  },
  {
    id: 186,
    question: "What is the main risk associated with using a mobile phone whilst working on a scaffold at height?",
    options: [
      "The signal strength is poor at height",
      "Distraction that can lead to falls, trips, or walking into hazards",
      "It can interfere with the scaffold structure",
      "The phone might get cold"
    ],
    correctAnswer: 1,
    explanation: "Using a mobile phone at height causes distraction, which can lead to falls, trips, or collisions with scaffold components. Workers may not be aware of their surroundings, step off the edge of platforms, or fail to notice overhead hazards while distracted.",
    section: "scaffolding-awareness",
    difficulty: "basic",
    topic: "Safe Use & Hazard Awareness",
    category: "Safe Use & Hazard Awareness"
  },
  {
    id: 187,
    question: "What loading class of scaffold is typically suitable for general construction work such as bricklaying?",
    options: [
      "Class 1 — Inspection and very light duty",
      "Class 2 — Light duty",
      "Class 3 — General purpose",
      "Class 6 — Masonry or heavy duty"
    ],
    correctAnswer: 2,
    explanation: "Class 3 (general purpose) scaffolds are designed for general construction activities and can typically support a uniformly distributed load of 2.0 kN/m2. For heavier work such as blockwork with stacked materials, Class 4 or higher may be required. Always check the scaffold tag for the loading class.",
    section: "scaffolding-awareness",
    difficulty: "intermediate",
    topic: "Safe Use & Hazard Awareness",
    category: "Safe Use & Hazard Awareness"
  },
  {
    id: 188,
    question: "Why must you never attach any sheeting, signage, or banners to a scaffold without authorisation?",
    options: [
      "Because it looks untidy",
      "Because it increases wind loading and can make the scaffold unstable if the ties are not designed for the additional load",
      "Because it blocks the view of the scaffold tag",
      "Because it is only permitted on Fridays"
    ],
    correctAnswer: 1,
    explanation: "Attaching sheeting, banners, or signs to a scaffold increases the surface area exposed to wind, which significantly increases the wind loading on the scaffold. If the scaffold ties were not designed for this additional load, it can become unstable and collapse in windy conditions.",
    section: "scaffolding-awareness",
    difficulty: "intermediate",
    topic: "Safe Use & Hazard Awareness",
    category: "Safe Use & Hazard Awareness"
  },
  {
    id: 189,
    question: "What is the emergency procedure if a scaffold begins to show signs of collapse?",
    options: [
      "Try to prop it up with nearby materials",
      "Evacuate the scaffold and surrounding area immediately, raise the alarm, and do not re-enter until declared safe",
      "Stay on the scaffold and hold onto the guardrails",
      "Continue working but move to a different part of the scaffold"
    ],
    correctAnswer: 1,
    explanation: "If a scaffold shows any signs of collapse, such as leaning, unusual movement, or cracking sounds, everyone must evacuate the scaffold and the surrounding area immediately. Raise the alarm, establish an exclusion zone, and do not allow anyone to re-enter until the scaffold has been assessed by a competent person.",
    section: "scaffolding-awareness",
    difficulty: "intermediate",
    topic: "Safe Use & Hazard Awareness",
    category: "Safe Use & Hazard Awareness"
  },
  {
    id: 190,
    question: "What is the danger of using a scaffold in the dark without adequate lighting?",
    options: [
      "There is no danger as scaffolds have reflective paint",
      "Workers cannot see hazards, trip risks, or the edges of the platform, significantly increasing the risk of falls",
      "It is only dangerous if the scaffold is above 10 metres",
      "Darkness has no effect on scaffold safety"
    ],
    correctAnswer: 1,
    explanation: "Working on a scaffold without adequate lighting is extremely dangerous. Workers cannot see trip hazards, gaps in platforms, the edge of the scaffold, or other risks. Adequate artificial lighting must be provided if natural light is insufficient for safe working.",
    section: "scaffolding-awareness",
    difficulty: "intermediate",
    topic: "Safe Use & Hazard Awareness",
    category: "Safe Use & Hazard Awareness"
  },
  {
    id: 191,
    question: "What is the maximum gap permitted between scaffold boards on a platform?",
    options: [
      "Any gap is acceptable if you are careful",
      "25mm",
      "100mm",
      "No gap at all under any circumstances"
    ],
    correctAnswer: 1,
    explanation: "The maximum gap between scaffold boards should not exceed 25mm. Larger gaps create a risk of tools, materials, or debris falling through to levels below, and can also present a trip hazard or allow a foot to become trapped.",
    section: "scaffolding-awareness",
    difficulty: "intermediate",
    topic: "Safe Use & Hazard Awareness",
    category: "Safe Use & Hazard Awareness"
  },
  {
    id: 192,
    question: "Why is it prohibited to use scaffold components (tubes, boards, fittings) that are not fit for purpose?",
    options: [
      "Because they are more expensive to replace later",
      "Because damaged, corroded, or substandard components may fail under load, causing collapse or falls",
      "Because they do not match the rest of the scaffold",
      "Because the scaffold company will charge extra"
    ],
    correctAnswer: 1,
    explanation: "Scaffold components that are damaged, heavily corroded, bent, or otherwise unfit for purpose may have significantly reduced load-bearing capacity. Using such components risks them failing under the loads they are subjected to, which can cause localised failure, falls, or full scaffold collapse.",
    section: "scaffolding-awareness",
    difficulty: "intermediate",
    topic: "Safe Use & Hazard Awareness",
    category: "Safe Use & Hazard Awareness"
  },
  {
    id: 193,
    question: "What is the purpose of a scaffold rescue plan?",
    options: [
      "To plan how to rescue the scaffold itself if it falls",
      "To ensure there is a pre-planned procedure for rescuing a worker who has fallen and is suspended in a harness or is otherwise stranded on the scaffold",
      "To plan how to dismantle the scaffold in an emergency",
      "To rescue tools that have fallen off the scaffold"
    ],
    correctAnswer: 1,
    explanation: "A scaffold rescue plan sets out how to rescue a worker who has fallen and is suspended in a harness (suspension trauma is a serious risk) or is otherwise stranded or injured on the scaffold. It must be site-specific, rehearsed, and available before work at height begins.",
    section: "scaffolding-awareness",
    difficulty: "advanced",
    topic: "Safe Use & Hazard Awareness",
    category: "Safe Use & Hazard Awareness"
  },
  {
    id: 194,
    question: "What is 'suspension trauma' and why is it relevant to scaffold work?",
    options: [
      "Fear of heights that stops you climbing",
      "A life-threatening condition that occurs when a person is suspended motionless in a harness, causing blood to pool in the legs",
      "An injury caused by lifting heavy scaffold tubes",
      "Stress caused by working at height for long periods"
    ],
    correctAnswer: 1,
    explanation: "Suspension trauma (orthostatic intolerance) occurs when a person hangs motionless in a harness after a fall. Blood pools in the legs, reducing circulation to vital organs, and can cause unconsciousness and death within minutes. This is why a prompt rescue plan is essential.",
    section: "scaffolding-awareness",
    difficulty: "advanced",
    topic: "Safe Use & Hazard Awareness",
    category: "Safe Use & Hazard Awareness"
  },
  {
    id: 195,
    question: "What should you do if you see a member of the public attempting to climb onto a construction scaffold?",
    options: [
      "Ignore them — it is not your responsibility",
      "Warn them of the danger, ask them to stop, and report it to your supervisor so security measures can be improved",
      "Help them up if they seem confident",
      "Only act if they are a child"
    ],
    correctAnswer: 1,
    explanation: "Unauthorised access to scaffolds by members of the public is extremely dangerous. You should warn them of the danger and ask them to stop. Report the incident to your supervisor so that site security measures, such as ladder guards and fencing, can be reviewed and improved.",
    section: "scaffolding-awareness",
    difficulty: "intermediate",
    topic: "Safe Use & Hazard Awareness",
    category: "Safe Use & Hazard Awareness"
  },
  {
    id: 196,
    question: "What additional precaution is needed when a scaffold is erected over a public footpath?",
    options: [
      "No additional precautions are needed",
      "A covered walkway (fan or tunnel) must be provided to protect pedestrians from falling objects",
      "Only a small warning sign is needed",
      "The footpath should be left as normal with no protection"
    ],
    correctAnswer: 1,
    explanation: "When a scaffold is erected over a public footpath, a covered walkway must be provided to protect pedestrians from falling objects. This typically takes the form of a scaffold fan or tunnel with close-boarded protection and adequate lighting.",
    section: "scaffolding-awareness",
    difficulty: "intermediate",
    topic: "Safe Use & Hazard Awareness",
    category: "Safe Use & Hazard Awareness"
  },
  {
    id: 197,
    question: "What is the effect of snow loading on a scaffold?",
    options: [
      "Snow has no effect on scaffold loading",
      "Accumulated snow adds significant weight to platforms, can block access, and creates slip hazards",
      "Snow only affects scaffolds above 20 metres",
      "Snow makes scaffolds safer by adding cushioning"
    ],
    correctAnswer: 1,
    explanation: "Snow accumulation on scaffold platforms adds significant dead weight that can overload the scaffold beyond its design capacity. It also creates severe slip hazards on platforms and access routes, and can block emergency escape routes. Snow should be cleared before work resumes.",
    section: "scaffolding-awareness",
    difficulty: "intermediate",
    topic: "Safe Use & Hazard Awareness",
    category: "Safe Use & Hazard Awareness"
  },
  {
    id: 198,
    question: "Why is it important that scaffold erectors and dismantlers work to a method statement?",
    options: [
      "To keep the paperwork tidy",
      "To ensure the work is carried out in a planned, safe sequence that controls the risks at every stage",
      "Because it makes the scaffold look better",
      "Method statements are optional and not important"
    ],
    correctAnswer: 1,
    explanation: "Scaffold erection and dismantling are high-risk activities. A method statement sets out the planned safe sequence of work, the control measures for each stage, the equipment needed, and the competence required. It ensures everyone understands the plan and works safely.",
    section: "scaffolding-awareness",
    difficulty: "intermediate",
    topic: "Safe Use & Hazard Awareness",
    category: "Safe Use & Hazard Awareness"
  },
  {
    id: 199,
    question: "What does the hierarchy of control in the Work at Height Regulations require you to consider first?",
    options: [
      "Using personal protective equipment such as harnesses",
      "Avoiding work at height altogether if it is reasonably practicable to do so",
      "Using scaffolding for every task",
      "Working from ladders as the first choice"
    ],
    correctAnswer: 1,
    explanation: "The Work at Height Regulations 2005 require duty holders to first consider whether the work at height can be avoided altogether. If it cannot be avoided, then collective protection measures (such as scaffolds with guardrails) must be considered before personal protection (such as harnesses).",
    section: "scaffolding-awareness",
    difficulty: "advanced",
    topic: "Safe Use & Hazard Awareness",
    category: "Safe Use & Hazard Awareness"
  },
  {
    id: 200,
    question: "What are the three main duties of an employer under the Work at Height Regulations 2005?",
    options: [
      "Provide scaffolding, ladders, and harnesses for every task",
      "Avoid work at height where possible, prevent falls where avoidance is not possible, and minimise the consequences of a fall",
      "Train all workers as scaffolders, buy new equipment each year, and report all incidents",
      "Consult the HSE before any work at height, use only system scaffolds, and carry out inspections monthly"
    ],
    correctAnswer: 1,
    explanation: "The three main duties under the Work at Height Regulations 2005 are: avoid work at height where reasonably practicable; where it cannot be avoided, prevent falls using appropriate work equipment and measures; and where falls cannot be prevented, minimise the distance and consequences of a fall.",
    section: "scaffolding-awareness",
    difficulty: "advanced",
    topic: "Safe Use & Hazard Awareness",
    category: "Safe Use & Hazard Awareness"
  }
];