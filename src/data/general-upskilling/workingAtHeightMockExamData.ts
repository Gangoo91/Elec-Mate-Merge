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
  "Understanding Working at Height",
  "Access Equipment & Selection",
  "Fall Protection & Prevention",
  "Safe Systems of Work",
  "Incident Response & Responsibilities"
];

export const workingAtHeightMockExamConfig: MockExamConfig = {
  examId: 'working-at-height',
  examTitle: 'Working at Height Mock Examination',
  totalQuestions: 20,
  timeLimit: 1800,
  passThreshold: 80,
  exitPath: '/study-centre/general-upskilling/working-at-height-module-6',
  categories: workingAtHeightCategories
};

export const getRandomWorkingAtHeightExamQuestions = (numQuestions: number = 20) => {
  return getRandomQuestionsBalanced(workingAtHeightQuestionBank, numQuestions, workingAtHeightCategories);
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
      "Only work carried out above 2 metres",
      "Any work where a person could fall a distance liable to cause personal injury",
      "Only work on scaffolding or ladders",
      "Work carried out above 5 metres on a construction site"
    ],
    correctAnswer: 1,
    explanation: "The Work at Height Regulations 2005 define working at height as any place where a person could fall a distance liable to cause personal injury. There is no minimum height threshold — even working at ground level near an open excavation counts.",
    section: "Module 1",
    difficulty: "basic",
    topic: "WAH Regs 2005 definition",
    category: "Understanding Working at Height"
  },
  {
    id: 2,
    question: "Approximately how many fatal injuries per year in the UK are caused by falls from height?",
    options: [
      "Around 10 deaths per year",
      "Around 40 deaths per year",
      "Around 100 deaths per year",
      "Around 200 deaths per year"
    ],
    correctAnswer: 1,
    explanation: "Falls from height account for approximately 40 fatalities per year in the UK, making it one of the leading causes of workplace death. The majority of these fatal falls occur from relatively low heights, often below 2 metres.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Fall statistics",
    category: "Understanding Working at Height"
  },
  {
    id: 3,
    question: "Which piece of legislation places a general duty on employers to ensure the health, safety, and welfare of employees?",
    options: [
      "Work at Height Regulations 2005",
      "Health and Safety at Work etc. Act 1974",
      "Construction (Design and Management) Regulations 2015",
      "Management of Health and Safety at Work Regulations 1999"
    ],
    correctAnswer: 1,
    explanation: "The Health and Safety at Work etc. Act 1974 (HASAWA) is the primary piece of UK health and safety legislation. It places a general duty on employers to ensure, so far as is reasonably practicable, the health, safety, and welfare at work of all employees.",
    section: "Module 1",
    difficulty: "basic",
    topic: "HASAWA 1974",
    category: "Understanding Working at Height"
  },
  {
    id: 4,
    question: "What is the first step in the hierarchy of control for working at height?",
    options: [
      "Use collective fall prevention measures",
      "Use personal fall protection equipment",
      "Avoid working at height altogether",
      "Minimise the distance and consequences of a fall"
    ],
    correctAnswer: 2,
    explanation: "The hierarchy of control for working at height starts with avoidance — if the work can be done without working at height, it should be. Only when avoidance is not reasonably practicable should you move to preventing falls, then mitigating the consequences.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Hierarchy of control",
    category: "Understanding Working at Height"
  },
  {
    id: 5,
    question: "At what height do the majority of fatal falls from height occur?",
    options: [
      "Above 10 metres",
      "Between 5 and 10 metres",
      "Below 2 metres",
      "Between 2 and 5 metres"
    ],
    correctAnswer: 2,
    explanation: "Statistics consistently show that the majority of fatal falls from height occur from below 2 metres. This highlights why the regulations apply regardless of height and why proper precautions are needed even for seemingly low-level tasks.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Fall statistics",
    category: "Understanding Working at Height"
  },
  {
    id: 6,
    question: "Who has a legal duty under HASAWA 1974 to take reasonable care of their own health and safety at work?",
    options: [
      "Only the employer",
      "Only the site supervisor",
      "Every employee",
      "Only the health and safety officer"
    ],
    correctAnswer: 2,
    explanation: "Under Section 7 of the Health and Safety at Work etc. Act 1974, every employee has a duty to take reasonable care of their own health and safety and that of others who may be affected by their acts or omissions. This is not solely an employer responsibility.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Employer/employee duties",
    category: "Understanding Working at Height"
  },
  {
    id: 7,
    question: "What does PUWER 1998 stand for?",
    options: [
      "Protection of Users at Work and Equipment Regulations",
      "Provision and Use of Work Equipment Regulations",
      "Preventive Use of Work Equipment Regulations",
      "Personal Use of Work Equipment Requirements"
    ],
    correctAnswer: 1,
    explanation: "PUWER stands for the Provision and Use of Work Equipment Regulations 1998. These regulations require that work equipment provided for use at work is suitable, maintained, and inspected, and that adequate training is given to those who use it.",
    section: "Module 1",
    difficulty: "basic",
    topic: "PUWER 1998",
    category: "Understanding Working at Height"
  },
  {
    id: 8,
    question: "What does LOLER 1998 specifically relate to?",
    options: [
      "Ladder safety on construction sites",
      "Lifting operations and lifting equipment",
      "Loading and offloading of equipment at height",
      "Lighting requirements for outdoor work"
    ],
    correctAnswer: 1,
    explanation: "LOLER stands for the Lifting Operations and Lifting Equipment Regulations 1998. It applies to all lifting equipment including MEWPs, hoists, and cranes used during work at height. It requires that lifting equipment is thoroughly examined at regular intervals.",
    section: "Module 1",
    difficulty: "basic",
    topic: "LOLER 1998",
    category: "Understanding Working at Height"
  },
  {
    id: 9,
    question: "Which of the following is an example of 'mitigating' the consequences of a fall?",
    options: [
      "Installing guard rails around an opening",
      "Using a safety net below the working area",
      "Carrying out the work from ground level",
      "Erecting a full scaffold with toe boards"
    ],
    correctAnswer: 1,
    explanation: "Safety nets mitigate (reduce the severity of) a fall rather than preventing it. Guard rails and scaffolding prevent falls, and working from ground level avoids the risk entirely. Mitigation is the third tier of the hierarchy after avoidance and prevention.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Hierarchy of control",
    category: "Understanding Working at Height"
  },
  {
    id: 10,
    question: "Which regulations specifically govern the management of construction projects, including work at height on sites?",
    options: [
      "PUWER 1998",
      "LOLER 1998",
      "CDM 2015",
      "COSHH 2002"
    ],
    correctAnswer: 2,
    explanation: "The Construction (Design and Management) Regulations 2015 (CDM 2015) govern the management of health, safety, and welfare on construction projects. They assign specific duties to clients, designers, and contractors regarding planning and managing work at height.",
    section: "Module 1",
    difficulty: "basic",
    topic: "CDM 2015",
    category: "Understanding Working at Height"
  },
  {
    id: 11,
    question: "Under the Work at Height Regulations 2005, who is primarily responsible for ensuring work at height is properly planned?",
    options: [
      "The employee carrying out the work",
      "The duty holder (employer or person controlling the work)",
      "The equipment manufacturer",
      "The Health and Safety Executive"
    ],
    correctAnswer: 1,
    explanation: "Regulation 4 of the Work at Height Regulations 2005 places the duty on the employer or any person who controls the work. They must ensure that work at height is properly planned, appropriately supervised, and carried out in a safe manner.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Employer/employee duties",
    category: "Understanding Working at Height"
  },
  {
    id: 12,
    question: "A risk assessment for working at height should identify hazards and then do what?",
    options: [
      "Eliminate all hazards completely",
      "Evaluate the risks and determine suitable control measures",
      "Report them to the HSE immediately",
      "Stop all work until the hazards are removed"
    ],
    correctAnswer: 1,
    explanation: "A risk assessment identifies hazards, evaluates the likelihood and severity of harm, and determines suitable control measures. Not all hazards can be completely eliminated, but the risk must be reduced to as low as reasonably practicable.",
    section: "Module 1",
    difficulty: "basic",
    topic: "5-step risk assessment",
    category: "Understanding Working at Height"
  },
  {
    id: 13,
    question: "Does working near a fragile roof surface count as working at height?",
    options: [
      "No, only if you are on the roof itself",
      "No, fragile surfaces are covered by different regulations",
      "Yes, because there is a risk of falling through the surface",
      "Only if the roof is above 3 metres"
    ],
    correctAnswer: 2,
    explanation: "Working on or near a fragile surface is explicitly covered by the Work at Height Regulations 2005. A person could fall through the fragile material, suffering injury from the resulting fall. The regulations require specific precautions for fragile surfaces.",
    section: "Module 1",
    difficulty: "basic",
    topic: "WAH Regs 2005 definition",
    category: "Understanding Working at Height"
  },
  {
    id: 14,
    question: "What is the correct order of the three-tier hierarchy for managing work at height?",
    options: [
      "Prevent, avoid, mitigate",
      "Mitigate, prevent, avoid",
      "Avoid, prevent, mitigate",
      "Avoid, mitigate, prevent"
    ],
    correctAnswer: 2,
    explanation: "The hierarchy is: first avoid working at height if possible, then prevent falls using collective or personal protection if avoidance is not reasonably practicable, and finally mitigate the distance and consequences of any fall. This order must always be followed.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Hierarchy of control",
    category: "Understanding Working at Height"
  },

  // --- Intermediate (15-32) ---
  {
    id: 15,
    question: "Under the Work at Height Regulations 2005, which of the following is NOT a duty placed on the employer?",
    options: [
      "Ensuring work at height is properly planned",
      "Providing all workers with personal fall arrest systems regardless of risk",
      "Ensuring those involved in work at height are competent",
      "Ensuring equipment for work at height is properly inspected and maintained"
    ],
    correctAnswer: 1,
    explanation: "The regulations do not require blanket provision of personal fall arrest systems. The hierarchy of control must be followed — avoid, then prevent with collective measures, then personal protection only where other measures are not reasonably practicable.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Employer/employee duties",
    category: "Understanding Working at Height"
  },
  {
    id: 16,
    question: "Which step of the HSE's 5-step risk assessment process involves deciding who might be harmed and how?",
    options: [
      "Step 1 — Identify the hazards",
      "Step 2 — Decide who might be harmed and how",
      "Step 3 — Evaluate the risks and decide on precautions",
      "Step 4 — Record findings and implement them"
    ],
    correctAnswer: 1,
    explanation: "Step 2 of the HSE's 5-step risk assessment process involves identifying who might be harmed and how. This includes employees, contractors, visitors, and members of the public who could be affected by the work at height activity.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "5-step risk assessment",
    category: "Understanding Working at Height"
  },
  {
    id: 17,
    question: "Under HASAWA 1974, what must an employer provide to employees in addition to safe systems of work?",
    options: [
      "Free personal protective equipment for all tasks",
      "Information, instruction, training, and supervision",
      "A written guarantee of zero workplace injuries",
      "Insurance cover for all work at height activities"
    ],
    correctAnswer: 1,
    explanation: "Section 2 of HASAWA 1974 requires employers to provide information, instruction, training, and supervision as is necessary to ensure the health and safety of employees. This is particularly important for high-risk activities such as working at height.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "HASAWA 1974",
    category: "Understanding Working at Height"
  },
  {
    id: 18,
    question: "What role does CDM 2015 assign to the 'principal designer'?",
    options: [
      "Carrying out all site inspections for work at height",
      "Planning, managing, and coordinating health and safety during the pre-construction phase",
      "Providing all personal protective equipment on site",
      "Acting as the site first aider during construction"
    ],
    correctAnswer: 1,
    explanation: "Under CDM 2015, the principal designer is responsible for planning, managing, and coordinating health and safety during the pre-construction phase. This includes ensuring that work at height risks are considered and designed out where possible.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "CDM 2015",
    category: "Understanding Working at Height"
  },
  {
    id: 19,
    question: "Which regulation requires that work equipment used at height is inspected at suitable intervals?",
    options: [
      "HASAWA 1974",
      "PUWER 1998",
      "Electricity at Work Regulations 1989",
      "RIDDOR 2013"
    ],
    correctAnswer: 1,
    explanation: "PUWER 1998 requires that work equipment is maintained in an efficient state, in efficient working order, and in good repair. It also requires inspection at suitable intervals and each time exceptional circumstances occur that could affect safety.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "PUWER 1998",
    category: "Understanding Working at Height"
  },
  {
    id: 20,
    question: "How often must lifting equipment used for work at height, such as a MEWP, undergo thorough examination under LOLER 1998?",
    options: [
      "Every 3 months",
      "Every 6 months",
      "Every 12 months",
      "Only when a defect is reported"
    ],
    correctAnswer: 1,
    explanation: "Under LOLER 1998, lifting equipment used to lift persons (such as MEWPs) must be thoroughly examined at least every 6 months. Equipment used only for lifting goods requires examination every 12 months. Records of examinations must be kept.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "LOLER 1998",
    category: "Understanding Working at Height"
  },
  {
    id: 21,
    question: "When carrying out a risk assessment for work at height, which factor is LEAST relevant?",
    options: [
      "The duration and frequency of the task",
      "The condition and stability of the working surface",
      "The colour of the safety helmets being worn",
      "Weather conditions at the time of the work"
    ],
    correctAnswer: 2,
    explanation: "The colour of safety helmets has no bearing on the risk assessment for working at height. Relevant factors include duration, frequency, surface condition, weather, equipment suitability, competence of workers, and the distance of any potential fall.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "5-step risk assessment",
    category: "Understanding Working at Height"
  },
  {
    id: 22,
    question: "Under the Work at Height Regulations 2005, what must be considered when selecting equipment for work at height?",
    options: [
      "Only the purchase cost of the equipment",
      "The working conditions, distance of potential fall, duration, and frequency of use",
      "Only the manufacturer's recommendation",
      "The preference of the worker using the equipment"
    ],
    correctAnswer: 1,
    explanation: "Regulation 7 requires that when selecting equipment, the duty holder must consider the working conditions, the nature, frequency, and duration of the work, the risks to safety, and the distance and consequences of a potential fall.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "WAH Regs 2005 definition",
    category: "Understanding Working at Height"
  },
  {
    id: 23,
    question: "What does 'so far as is reasonably practicable' mean in relation to managing work at height risks?",
    options: [
      "All risks must be eliminated regardless of cost",
      "Risks should be weighed against the cost, time, and effort of reducing them",
      "Only obvious risks need to be addressed",
      "The employer must do whatever the employee requests"
    ],
    correctAnswer: 1,
    explanation: "The term 'so far as is reasonably practicable' means the duty holder must balance the level of risk against the measures needed to control it — in terms of money, time, and trouble. If the risk is high, significant resources must be devoted to reducing it.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "HASAWA 1974",
    category: "Understanding Working at Height"
  },
  {
    id: 24,
    question: "Which of the following is classified as a 'collective' fall prevention measure?",
    options: [
      "A personal fall arrest harness",
      "A self-retracting lifeline",
      "Guard rails and toe boards",
      "A shock-absorbing lanyard"
    ],
    correctAnswer: 2,
    explanation: "Guard rails and toe boards are collective measures because they protect everyone in the area without requiring individual action. Personal fall arrest harnesses, self-retracting lifelines, and shock-absorbing lanyards are all personal fall protection measures.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Hierarchy of control",
    category: "Understanding Working at Height"
  },
  {
    id: 25,
    question: "Under CDM 2015, who is the 'principal contractor' on a construction project?",
    options: [
      "The client who is paying for the work",
      "The contractor appointed to plan, manage, and coordinate health and safety during the construction phase",
      "The person who designed the building",
      "The local authority building control officer"
    ],
    correctAnswer: 1,
    explanation: "The principal contractor is appointed by the client under CDM 2015 to plan, manage, monitor, and coordinate health and safety during the construction phase. They must ensure that work at height is carried out safely and that all contractors comply.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "CDM 2015",
    category: "Understanding Working at Height"
  },
  {
    id: 26,
    question: "An employee notices that a guardrail on a working platform is loose. What should they do first?",
    options: [
      "Ignore it if they feel confident working without it",
      "Repair it themselves even if not trained to do so",
      "Report the defect to a supervisor and stop using the platform",
      "Continue working but hold on to the loose rail"
    ],
    correctAnswer: 2,
    explanation: "Under both HASAWA 1974 and the Work at Height Regulations 2005, employees must report any hazard or defect. They should not use defective equipment. The correct action is to stop using the platform and report the issue to a competent supervisor immediately.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Employer/employee duties",
    category: "Understanding Working at Height"
  },
  {
    id: 27,
    question: "What is the fifth and final step of the HSE's 5-step risk assessment process?",
    options: [
      "Identify the hazards",
      "Evaluate the risks",
      "Record findings",
      "Review the assessment and update if necessary"
    ],
    correctAnswer: 3,
    explanation: "Step 5 is to review the risk assessment and update it if necessary. Work at height conditions can change due to weather, new equipment, or changes in the task. Regular review ensures that the assessment remains relevant and effective.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "5-step risk assessment",
    category: "Understanding Working at Height"
  },
  {
    id: 28,
    question: "Which of the following scenarios would NOT be classified as working at height under the 2005 Regulations?",
    options: [
      "Working on a flat roof with no edge protection",
      "Standing on a stable floor with no nearby openings or edges",
      "Using a stepladder to change a light bulb",
      "Working adjacent to an excavation trench"
    ],
    correctAnswer: 1,
    explanation: "Standing on a stable floor with no openings or edges nearby does not present a risk of falling a distance liable to cause personal injury. All the other scenarios involve a risk of falling from height and are covered by the regulations.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "WAH Regs 2005 definition",
    category: "Understanding Working at Height"
  },
  {
    id: 29,
    question: "Why are falls from below 2 metres particularly dangerous statistically?",
    options: [
      "Because the equipment used at low heights is always substandard",
      "Because workers at low heights are usually untrained",
      "Because they happen far more frequently and complacency is common",
      "Because low-level falls always result in head injuries"
    ],
    correctAnswer: 2,
    explanation: "Falls from below 2 metres are statistically dangerous because they occur with much greater frequency than falls from greater heights. Workers and employers often underestimate the risk at low heights, leading to complacency and inadequate precautions.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Fall statistics",
    category: "Understanding Working at Height"
  },
  {
    id: 30,
    question: "What must an employer do before allowing any employee to carry out work at height?",
    options: [
      "Obtain written consent from the employee",
      "Ensure the employee is competent or under the supervision of a competent person",
      "Register the activity with the local council",
      "Ensure the employee has at least 5 years' experience"
    ],
    correctAnswer: 1,
    explanation: "The Work at Height Regulations 2005 require that every person involved in work at height is competent, or if being trained, works under the supervision of a competent person. Competence includes adequate training, knowledge, and experience.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Employer/employee duties",
    category: "Understanding Working at Height"
  },
  {
    id: 31,
    question: "Under PUWER 1998, who is responsible for ensuring that work equipment is suitable for its intended purpose?",
    options: [
      "The employee using the equipment",
      "The equipment hire company only",
      "The employer providing the equipment",
      "The equipment manufacturer only"
    ],
    correctAnswer: 2,
    explanation: "PUWER 1998 places the duty on the employer to ensure that work equipment is suitable for the use intended. This means it must be appropriate for the task, the conditions, and the risks present, including when used for working at height.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "PUWER 1998",
    category: "Understanding Working at Height"
  },
  {
    id: 32,
    question: "A task involves briefly accessing a ceiling void to inspect cabling. The opening is at 2.5 metres. Which control should be considered first?",
    options: [
      "Provide a harness and lanyard",
      "Explore whether the inspection can be done using a camera from below",
      "Erect a full scaffold tower",
      "Use a ladder and accept the risk"
    ],
    correctAnswer: 1,
    explanation: "The hierarchy of control requires avoidance first. If the inspection can be carried out from below using a camera or similar tool, this avoids the need to work at height entirely. Only if avoidance is not reasonably practicable should other measures be considered.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Hierarchy of control",
    category: "Understanding Working at Height"
  },

  // --- Advanced (33-40) ---
  {
    id: 33,
    question: "Under CDM 2015, a domestic client's duties automatically transfer to which party if no principal designer is appointed?",
    options: [
      "The local authority",
      "The designer or, if none, the principal contractor",
      "The HSE enforcement officer",
      "The employee carrying out the work"
    ],
    correctAnswer: 1,
    explanation: "Under CDM 2015 Regulation 7, where a domestic client fails to appoint a principal designer, the duties pass to the designer (on single-contractor projects) or the principal contractor (on multi-contractor projects). This ensures duties are always held by a competent party.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "CDM 2015",
    category: "Understanding Working at Height"
  },
  {
    id: 34,
    question: "A worker on a construction site suffers a fall from height resulting in them being incapacitated for more than 7 consecutive days. Under which regulation must this be reported?",
    options: [
      "PUWER 1998",
      "RIDDOR 2013",
      "LOLER 1998",
      "CDM 2015 only"
    ],
    correctAnswer: 1,
    explanation: "Under RIDDOR 2013 (Reporting of Injuries, Diseases and Dangerous Occurrences Regulations), an over-7-day incapacitation injury must be reported to the HSE. Falls from height resulting in such injuries are reportable dangerous occurrences.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "HASAWA 1974",
    category: "Understanding Working at Height"
  },
  {
    id: 35,
    question: "How does the 'reverse burden of proof' operate in health and safety prosecutions under HASAWA 1974?",
    options: [
      "The employee must prove the employer was negligent",
      "The prosecution must prove the employer intended to cause harm",
      "The employer must prove they did everything reasonably practicable to comply",
      "The HSE must prove the employer had full knowledge of the risk"
    ],
    correctAnswer: 2,
    explanation: "Under Section 40 of HASAWA 1974, once a breach is established, the burden shifts to the defendant (typically the employer) to prove they did everything so far as was reasonably practicable. This is known as the reverse burden of proof.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "HASAWA 1974",
    category: "Understanding Working at Height"
  },
  {
    id: 36,
    question: "A contractor is hired to work at height on a client's premises. Under the Work at Height Regulations 2005, who holds the primary duty to ensure the work is safe?",
    options: [
      "Only the client who owns the premises",
      "Only the contractor's own employer",
      "Any person who controls the work activity to any extent",
      "The HSE regional inspector"
    ],
    correctAnswer: 2,
    explanation: "Regulation 3 of the Work at Height Regulations 2005 applies to any person who controls the work at height activity to any extent. This means duties can apply to the client, the contractor's employer, and anyone else in the chain of control simultaneously.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "Employer/employee duties",
    category: "Understanding Working at Height"
  },
  {
    id: 37,
    question: "When completing a risk assessment for work at height, which of the following qualitative methods is used to prioritise risks?",
    options: [
      "Cost-benefit analysis only",
      "A risk matrix combining likelihood and severity",
      "Employee popularity vote",
      "Insurance premium calculations"
    ],
    correctAnswer: 1,
    explanation: "A risk matrix is a standard qualitative tool that combines the likelihood of an event occurring with the severity of its consequences to produce a risk rating. This rating helps prioritise control measures, focusing resources on the highest risks first.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "5-step risk assessment",
    category: "Understanding Working at Height"
  },
  {
    id: 38,
    question: "Under Regulation 9 of the Work at Height Regulations 2005, what specific duty exists regarding fragile surfaces?",
    options: [
      "Fragile surfaces must be replaced before any work begins",
      "No person shall pass across, work on, or near a fragile surface unless it is the only reasonably practicable means",
      "Fragile surfaces only need marking if above 5 metres",
      "Workers may cross fragile surfaces if they have received a verbal briefing"
    ],
    correctAnswer: 1,
    explanation: "Regulation 9 states that no person shall pass across or near, or work on, from, or near a fragile surface unless that is the only reasonably practicable way of carrying out the work. Where it is, suitable platforms, coverings, guard rails, and fall arrest must be provided.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "WAH Regs 2005 definition",
    category: "Understanding Working at Height"
  },
  {
    id: 39,
    question: "A self-employed window cleaner working on a commercial building falls and is seriously injured. Which legislation can the HSE use to prosecute?",
    options: [
      "Only HASAWA 1974 Section 3",
      "HASAWA 1974 Sections 2 and 3, the Work at Height Regulations 2005, and potentially CDM 2015",
      "Only the Work at Height Regulations 2005",
      "None — self-employed persons cannot be prosecuted"
    ],
    correctAnswer: 1,
    explanation: "Multiple pieces of legislation may apply. HASAWA 1974 Section 3 covers duties to non-employees, Section 2 applies if the cleaner has employees, the WAH Regs 2005 apply to all who control work at height, and CDM 2015 applies if it is a construction project.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "HASAWA 1974",
    category: "Understanding Working at Height"
  },
  {
    id: 40,
    question: "Under LOLER 1998, what must the competent person provide after a thorough examination of lifting equipment used for work at height?",
    options: [
      "A verbal report to the site manager within 7 days",
      "A written report including any defects and their significance, before the equipment is next used",
      "An email to the HSE confirming the examination took place",
      "A certificate valid for 24 months"
    ],
    correctAnswer: 1,
    explanation: "LOLER 1998 requires the competent person to provide a written report of thorough examination. If a defect involving imminent danger is found, the report must be sent immediately to the employer and the HSE. The report must be received before the equipment is used again.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "LOLER 1998",
    category: "Understanding Working at Height"
  },

  // ============================================================
  // CATEGORY 2: Access Equipment & Selection (Questions 41-80)
  // Section: Module 2
  // Difficulty: 14 basic, 18 intermediate, 8 advanced
  // ============================================================

  // --- Basic (41-54) ---
  {
    id: 41,
    question: "What is the correct angle ratio for leaning a ladder against a wall?",
    options: [
      "1:2 ratio (1 out for every 2 up)",
      "1:3 ratio (1 out for every 3 up)",
      "1:4 ratio (1 out for every 4 up)",
      "1:5 ratio (1 out for every 5 up)"
    ],
    correctAnswer: 2,
    explanation: "The correct angle for a leaning ladder is a 1:4 ratio — for every 4 units of height, the base should be 1 unit out from the wall. This gives an angle of approximately 75 degrees, providing optimal stability and minimising the risk of the ladder slipping.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Ladder types and 1:4 ratio",
    category: "Access Equipment & Selection"
  },
  {
    id: 42,
    question: "What does the '3-point contact' rule mean when using a ladder?",
    options: [
      "The ladder must have 3 rungs in contact with the wall",
      "The user must maintain two hands and one foot, or two feet and one hand, on the ladder at all times",
      "Three people must hold the ladder at its base",
      "The ladder must be secured at 3 separate fixing points"
    ],
    correctAnswer: 1,
    explanation: "The 3-point contact rule means the climber must always have at least two hands and one foot, or two feet and one hand, in contact with the ladder. This ensures stability and reduces the chance of losing balance and falling.",
    section: "Module 2",
    difficulty: "basic",
    topic: "3-point contact",
    category: "Access Equipment & Selection"
  },
  {
    id: 43,
    question: "According to HSE guidance, ladders should generally only be used for work at height tasks lasting no more than how long?",
    options: [
      "10 minutes",
      "30 minutes",
      "1 hour",
      "2 hours"
    ],
    correctAnswer: 1,
    explanation: "HSE guidance states that ladders should only be used for short-duration tasks, typically no more than 30 minutes. If the task will take longer, a more suitable and safer means of access such as a scaffold or MEWP should be used.",
    section: "Module 2",
    difficulty: "basic",
    topic: "<30 min rule",
    category: "Access Equipment & Selection"
  },
  {
    id: 44,
    question: "What colour scaffold tag indicates the scaffold is safe to use?",
    options: [
      "Red",
      "Amber",
      "Green",
      "Blue"
    ],
    correctAnswer: 2,
    explanation: "A green scaffold tag indicates that the scaffold has been inspected and is safe to use. An amber tag means it is incomplete or has restrictions, and a red tag means it must not be used. Always check the tag before accessing any scaffold.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Scaffold tags",
    category: "Access Equipment & Selection"
  },
  {
    id: 45,
    question: "How often must a scaffold on a construction site be inspected as a minimum?",
    options: [
      "Daily",
      "Every 7 days",
      "Every 14 days",
      "Monthly"
    ],
    correctAnswer: 1,
    explanation: "Under the Work at Height Regulations 2005, scaffolds must be inspected at least every 7 days. They must also be inspected before first use and after any event likely to have affected their stability, such as high winds or structural alteration.",
    section: "Module 2",
    difficulty: "basic",
    topic: "7-day inspections",
    category: "Access Equipment & Selection"
  },
  {
    id: 46,
    question: "What type of MEWP has a platform that only moves vertically?",
    options: [
      "Articulated boom lift",
      "Telescopic boom lift",
      "Scissor lift",
      "Truck-mounted platform"
    ],
    correctAnswer: 2,
    explanation: "A scissor lift (also known as a vertical personnel platform) moves the platform only vertically using a criss-crossing scissor mechanism. It does not provide horizontal outreach, unlike boom-type MEWPs which can extend laterally.",
    section: "Module 2",
    difficulty: "basic",
    topic: "MEWP types",
    category: "Access Equipment & Selection"
  },
  {
    id: 47,
    question: "What does MEWP stand for?",
    options: [
      "Mechanical Elevated Working Position",
      "Mobile Elevating Work Platform",
      "Motorised External Work Platform",
      "Multi-Elevation Work Platform"
    ],
    correctAnswer: 1,
    explanation: "MEWP stands for Mobile Elevating Work Platform. MEWPs include scissor lifts, boom lifts, and mast climbers. They provide a safe working platform at height and must comply with LOLER 1998 and PUWER 1998.",
    section: "Module 2",
    difficulty: "basic",
    topic: "MEWP types",
    category: "Access Equipment & Selection"
  },
  {
    id: 48,
    question: "What is a podium step primarily designed for?",
    options: [
      "Reaching heights above 5 metres",
      "Low-level access with a secure enclosed working platform",
      "Use as a scaffold substitute on construction sites",
      "Accessing rooftops"
    ],
    correctAnswer: 1,
    explanation: "Podium steps provide a stable, enclosed working platform for low-level work, typically up to around 2 metres platform height. They have guard rails, a large platform, and lockable castors, making them much safer than stepladders for many tasks.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Podium steps",
    category: "Access Equipment & Selection"
  },
  {
    id: 49,
    question: "What is a hop-up?",
    options: [
      "A type of boom lift",
      "A lightweight, low-level portable working platform, usually around 500mm high",
      "A scaffold fitting used to join tubes",
      "A safety harness component"
    ],
    correctAnswer: 1,
    explanation: "A hop-up is a small, lightweight, portable platform typically around 500mm (half a metre) in height. It provides a stable base for very low-level work such as plastering or painting. It must be used on firm, level ground.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Hop-ups",
    category: "Access Equipment & Selection"
  },
  {
    id: 50,
    question: "What is the main purpose of toe boards on a scaffold platform?",
    options: [
      "To provide a footrest for workers",
      "To prevent materials and tools from falling off the edge",
      "To help workers climb onto the platform",
      "To improve the appearance of the scaffold"
    ],
    correctAnswer: 1,
    explanation: "Toe boards are fitted at the edge of scaffold platforms to prevent materials, tools, and debris from falling off. This protects people below from being struck by falling objects. Toe boards must be at least 150mm high.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Scaffold types/components",
    category: "Access Equipment & Selection"
  },
  {
    id: 51,
    question: "Which European standard applies to the classification of portable ladders?",
    options: [
      "EN 361",
      "EN 131",
      "EN 1263",
      "EN 13374"
    ],
    correctAnswer: 1,
    explanation: "EN 131 is the European standard covering the design, testing, and classification of portable ladders and stepladders. It specifies requirements for materials, dimensions, strength, and labelling that all compliant ladders must meet.",
    section: "Module 2",
    difficulty: "basic",
    topic: "EN 131",
    category: "Access Equipment & Selection"
  },
  {
    id: 52,
    question: "What is the main component used to connect scaffold tubes together?",
    options: [
      "Cable ties",
      "Scaffold couplers (fittings)",
      "Welded joints",
      "Adhesive bonds"
    ],
    correctAnswer: 1,
    explanation: "Scaffold tubes are connected using couplers (also called fittings or clips). The main types are right-angle couplers, swivel couplers, and sleeve couplers. They must be properly tightened and inspected to ensure the scaffold is structurally sound.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Scaffold types/components",
    category: "Access Equipment & Selection"
  },
  {
    id: 53,
    question: "Which IPAF category covers the operation of scissor lifts (vertical personnel platforms)?",
    options: [
      "Category 1a (static vertical)",
      "Category 1b (static boom)",
      "Category 3a (mobile vertical)",
      "Category 3b (mobile boom)"
    ],
    correctAnswer: 2,
    explanation: "IPAF Category 3a covers mobile vertical personnel platforms, commonly known as scissor lifts. Category 3b covers mobile boom platforms. Categories 1a and 1b are for static (vehicle-mounted) verticals and booms respectively.",
    section: "Module 2",
    difficulty: "basic",
    topic: "IPAF categories",
    category: "Access Equipment & Selection"
  },
  {
    id: 54,
    question: "What does an amber scaffold tag indicate?",
    options: [
      "The scaffold is safe for full use",
      "The scaffold must not be used under any circumstances",
      "The scaffold is incomplete or has use restrictions — check details on the tag",
      "The scaffold is due for its 7-day inspection"
    ],
    correctAnswer: 2,
    explanation: "An amber scaffold tag means the scaffold has restrictions or is incomplete. The tag will detail the specific limitations, such as which levels may be used or which loads are permitted. Workers must read and comply with the restrictions stated.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Scaffold tags",
    category: "Access Equipment & Selection"
  },

  // --- Intermediate (55-72) ---
  {
    id: 55,
    question: "A ladder extends 3 metres above a landing point. How far should it extend above the stepping-off point?",
    options: [
      "At least 0.5 metres (approximately 3 rungs)",
      "At least 1 metre (approximately 5 rungs)",
      "At least 1.5 metres (approximately 7 rungs)",
      "There is no requirement for extension above the landing"
    ],
    correctAnswer: 1,
    explanation: "When using a ladder to access another level, it should extend at least 1 metre (approximately 5 rungs) above the stepping-off point. This provides a secure handhold while stepping onto and off the landing, reducing the risk of a fall.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Ladder types and 1:4 ratio",
    category: "Access Equipment & Selection"
  },
  {
    id: 56,
    question: "Under the NASC TG20 guidance, what is the purpose of a scaffold design check?",
    options: [
      "To determine the colour of the scaffold tubes",
      "To confirm whether the scaffold complies with standard configurations or needs bespoke design",
      "To check how much the scaffold costs to hire",
      "To decide whether a ladder would be better"
    ],
    correctAnswer: 1,
    explanation: "NASC TG20 provides guidance on standard scaffold configurations. A design check confirms whether the proposed scaffold falls within these standard configurations or whether a bespoke design calculation by a qualified engineer is required for the specific situation.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "NASC TG20",
    category: "Access Equipment & Selection"
  },
  {
    id: 57,
    question: "Before using a MEWP on site, what pre-use checks should the operator carry out?",
    options: [
      "Only check the fuel level",
      "Visual inspection, function checks of controls, emergency lowering, tyres, and outriggers where fitted",
      "Only check the operator's licence is valid",
      "Confirm the paint colour matches the company branding"
    ],
    correctAnswer: 1,
    explanation: "Before using a MEWP, the operator must carry out pre-use checks including visual inspection for damage, testing all controls and emergency lowering systems, checking tyre condition and pressures, and confirming outriggers (where fitted) function correctly.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "MEWP types",
    category: "Access Equipment & Selection"
  },
  {
    id: 58,
    question: "What is the key difference between a telescopic boom lift and an articulated boom lift?",
    options: [
      "Telescopic booms can only go straight up; articulated booms have a knuckle joint allowing them to reach up and over obstacles",
      "Articulated booms are always smaller than telescopic booms",
      "Telescopic booms are only used indoors",
      "There is no practical difference between the two"
    ],
    correctAnswer: 0,
    explanation: "A telescopic boom extends in a straight line, providing maximum horizontal outreach. An articulated boom has one or more knuckle (hinge) joints, allowing the platform to reach up and over obstacles, making it more versatile in congested areas.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "MEWP types",
    category: "Access Equipment & Selection"
  },
  {
    id: 59,
    question: "When should scaffold boards be discarded?",
    options: [
      "Only when they are more than 10 years old",
      "When they show signs of excessive warping, splitting, decay, or damage beyond acceptable limits",
      "Only when they break under load",
      "When they change colour due to weathering"
    ],
    correctAnswer: 1,
    explanation: "Scaffold boards must be discarded when they show excessive warping, splitting, knot holes, decay, or any damage that could compromise their load-bearing capacity. Visual inspection should be carried out before each use and during 7-day inspections.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Scaffold types/components",
    category: "Access Equipment & Selection"
  },
  {
    id: 60,
    question: "Which IPAF category would a worker need to operate a cherry picker (mobile boom lift)?",
    options: [
      "Category 1a",
      "Category 1b",
      "Category 3a",
      "Category 3b"
    ],
    correctAnswer: 3,
    explanation: "IPAF Category 3b covers mobile boom platforms, commonly known as cherry pickers. This includes both telescopic and articulated boom lifts that are self-propelled. The '3' denotes mobile (self-propelled) and 'b' denotes boom type.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "IPAF categories",
    category: "Access Equipment & Selection"
  },
  {
    id: 61,
    question: "What is the purpose of a scaffold 'standard'?",
    options: [
      "The horizontal tube that supports the platform boards",
      "The vertical tube that transfers loads to the ground",
      "The diagonal tube that provides bracing",
      "The short tube connecting the scaffold to the building"
    ],
    correctAnswer: 1,
    explanation: "A standard is a vertical scaffold tube that transfers the load of the scaffold and its users down to the ground through base plates or sole boards. Standards form the main structural uprights of the scaffold framework.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Scaffold types/components",
    category: "Access Equipment & Selection"
  },
  {
    id: 62,
    question: "What is a 'ledger' in scaffold terminology?",
    options: [
      "The written inspection record",
      "A horizontal tube running parallel to the building face, connecting standards",
      "A diagonal brace",
      "A base plate placed under the standard"
    ],
    correctAnswer: 1,
    explanation: "A ledger is a horizontal scaffold tube that runs parallel to the face of the building and connects the standards together. Ledgers help distribute loads and provide a fixing point for transoms, which in turn support the scaffold boards.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Scaffold types/components",
    category: "Access Equipment & Selection"
  },
  {
    id: 63,
    question: "A task involves painting a stairwell at heights up to 6 metres. Which equipment would typically be most suitable?",
    options: [
      "A standard stepladder",
      "A stairwell scaffold tower or stairwell MEWP",
      "A regular extension ladder",
      "A hop-up platform"
    ],
    correctAnswer: 1,
    explanation: "A stairwell scaffold tower (with adjustable legs) or a specialist stairwell MEWP is designed for safe work on uneven surfaces like stairwells. Standard ladders and stepladders cannot be safely placed on stairs, and a hop-up would not reach 6 metres.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Equipment selection",
    category: "Access Equipment & Selection"
  },
  {
    id: 64,
    question: "What is the minimum number of boards wide that a scaffold working platform should generally be?",
    options: [
      "2 boards wide",
      "3 boards wide (minimum 600mm)",
      "4 boards wide",
      "5 boards wide"
    ],
    correctAnswer: 2,
    explanation: "A scaffold working platform where work is being carried out should generally be at least 4 boards wide (approximately 870mm) for general work, or 3 boards (600mm) minimum for inspection and access. The exact width depends on the nature of the work.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Scaffold types/components",
    category: "Access Equipment & Selection"
  },
  {
    id: 65,
    question: "EN 131 classifies portable ladders into different classes. Which class is appropriate for commercial/trade use?",
    options: [
      "Class 1 — industrial/heavy duty",
      "Class EN 131 Professional — suitable for trade use",
      "Class 3 — domestic only",
      "All classes are identical in specification"
    ],
    correctAnswer: 1,
    explanation: "EN 131 Professional (sometimes referred to as the trade standard) is suitable for commercial and trade use. It specifies higher load ratings and durability than domestic classifications. Workers should always use ladders rated for professional/trade use.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "EN 131",
    category: "Access Equipment & Selection"
  },
  {
    id: 66,
    question: "When using a mobile scaffold tower, what must be done before moving it?",
    options: [
      "Add extra weight to the top to stabilise it",
      "Ensure all personnel, tools, and materials are removed from the platform and the height is reduced if required",
      "Just push it gently — no special preparation is needed",
      "Tie it to a nearby vehicle and tow it"
    ],
    correctAnswer: 1,
    explanation: "Before moving a mobile scaffold tower, all personnel must descend, tools and materials must be removed or secured, and the tower height may need to be reduced per manufacturer instructions. The tower should only be moved on firm, level ground by pushing at the base.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Scaffold types/components",
    category: "Access Equipment & Selection"
  },
  {
    id: 67,
    question: "What is the maximum recommended height-to-base ratio for a mobile scaffold tower used outdoors?",
    options: [
      "2:1",
      "3:1",
      "3.5:1",
      "5:1"
    ],
    correctAnswer: 1,
    explanation: "For outdoor use, a mobile scaffold tower should have a maximum height-to-minimum-base ratio of 3:1. For indoor use, this can be extended to 3.5:1. Outriggers or stabilisers can be used to effectively widen the base and allow greater heights.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Scaffold types/components",
    category: "Access Equipment & Selection"
  },
  {
    id: 68,
    question: "What must be in place before a scaffold is loaded with materials?",
    options: [
      "Only a visual check by the workers using it",
      "A completed inspection by a competent person confirming it is fit for purpose and adequate for the intended load",
      "Permission from the local council",
      "A photograph for insurance records"
    ],
    correctAnswer: 1,
    explanation: "A competent person must inspect the scaffold and confirm it is complete, structurally sound, and rated for the intended load before it is loaded with materials. Overloading a scaffold is a common cause of collapse and must be prevented through proper inspection.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "7-day inspections",
    category: "Access Equipment & Selection"
  },
  {
    id: 69,
    question: "What is the primary advantage of using a podium step over a standard stepladder?",
    options: [
      "Podium steps are lighter than stepladders",
      "Podium steps provide an enclosed platform with guard rails, giving a larger and safer working area",
      "Podium steps can reach higher than stepladders",
      "Podium steps are cheaper to purchase"
    ],
    correctAnswer: 1,
    explanation: "The main advantage of podium steps is the enclosed platform with guard rails on all sides. This provides a much safer and more stable working area compared to the small top step of a stepladder, significantly reducing the risk of overbalancing.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Podium steps",
    category: "Access Equipment & Selection"
  },
  {
    id: 70,
    question: "A worker needs to carry out a 2-hour task at 8 metres on the exterior of a building with good ground conditions. Which equipment is most appropriate?",
    options: [
      "A leaning ladder",
      "A hop-up",
      "A scissor lift MEWP",
      "A podium step"
    ],
    correctAnswer: 2,
    explanation: "A scissor lift MEWP is the most appropriate choice for a 2-hour task at 8 metres. Ladders are unsuitable for tasks over 30 minutes and at that height. Hop-ups and podium steps cannot reach 8 metres. The good ground conditions make a MEWP viable.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Equipment selection",
    category: "Access Equipment & Selection"
  },
  {
    id: 71,
    question: "What is a red scaffold tag used to indicate?",
    options: [
      "The scaffold is safe but restricted",
      "The scaffold needs its 7-day inspection soon",
      "The scaffold must NOT be used — it is incomplete, dangerous, or condemned",
      "The scaffold has been recently painted"
    ],
    correctAnswer: 2,
    explanation: "A red scaffold tag means the scaffold must not be used under any circumstances. It may be incomplete, damaged, awaiting dismantling, or condemned. Any worker who sees a red tag must not access the scaffold and should report the situation to their supervisor.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Scaffold tags",
    category: "Access Equipment & Selection"
  },
  {
    id: 72,
    question: "Why is it important to secure a ladder at the top, bottom, or both?",
    options: [
      "To make it look professional",
      "To prevent the ladder from slipping, sliding, or falling — the primary cause of ladder-related accidents",
      "It is only a recommendation, not a requirement",
      "To prevent other workers from using it"
    ],
    correctAnswer: 1,
    explanation: "Securing a ladder prevents it from slipping at the base, sliding sideways, or falling backwards. Unsecured ladders are a leading cause of falls from height. The ladder should be tied at the top where possible, or secured at the base, or footed by a second person.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Ladder types and 1:4 ratio",
    category: "Access Equipment & Selection"
  },

  // --- Advanced (73-80) ---
  {
    id: 73,
    question: "Under NASC TG20, what is the maximum height for a standard basic scaffold configuration without requiring a bespoke design?",
    options: [
      "Up to 15 metres",
      "Up to 25 metres",
      "Up to 50 metres",
      "There is no height limit in TG20"
    ],
    correctAnswer: 2,
    explanation: "NASC TG20 provides compliance sheets for tube and fitting scaffolds up to 50 metres in height for standard configurations. Above this height, or for non-standard configurations, a bespoke design calculation by a structural engineer is required.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "NASC TG20",
    category: "Access Equipment & Selection"
  },
  {
    id: 74,
    question: "A MEWP is to be used on a public highway. Which additional considerations are required beyond standard site use?",
    options: [
      "No additional considerations are needed",
      "Chapter 8 traffic management, road closure permits, vehicle lighting, and potentially a banksman",
      "Only a high-visibility jacket for the operator",
      "Just an amber flashing beacon on the MEWP"
    ],
    correctAnswer: 1,
    explanation: "Working on a public highway requires Chapter 8 compliant traffic management (cones, signs, barriers), potentially road closure permits from the local authority, additional vehicle lighting/beacons, and a banksman to manage traffic and pedestrian movements around the MEWP.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "MEWP types",
    category: "Access Equipment & Selection"
  },
  {
    id: 75,
    question: "When selecting between a scissor lift and a boom lift, which factor is most decisive?",
    options: [
      "The colour of the machine",
      "Whether horizontal outreach beyond the base footprint is required",
      "The age of the operator",
      "The brand preference of the site manager"
    ],
    correctAnswer: 1,
    explanation: "The most decisive factor is whether horizontal outreach is needed. Scissor lifts only travel vertically — if the work position is not directly above where the machine can be placed, a boom lift is necessary. Other factors include height, ground conditions, and indoor/outdoor use.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "Equipment selection",
    category: "Access Equipment & Selection"
  },
  {
    id: 76,
    question: "A scaffold inspector discovers that swivel couplers have been used where right-angle couplers are specified in the design. What is the significance?",
    options: [
      "No significance — the couplers are interchangeable",
      "Swivel couplers have a lower safe working load than right-angle couplers and may compromise structural integrity",
      "Swivel couplers are stronger, so it is actually an improvement",
      "It only matters if the scaffold is above 10 metres"
    ],
    correctAnswer: 1,
    explanation: "Swivel couplers have a significantly lower safe working load (approximately 6.25 kN) compared to right-angle couplers (approximately 6.25 kN for sleeve, but the joint can rotate). Using them incorrectly can compromise the structural integrity of the scaffold. The design must be followed precisely.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "Scaffold types/components",
    category: "Access Equipment & Selection"
  },
  {
    id: 77,
    question: "Under what circumstances would an IPAF PAL Card holder require additional training before operating a particular MEWP?",
    options: [
      "Never — the PAL Card covers all machines",
      "When the specific machine type differs from the categories on their card, or when site-specific familiarisation is needed",
      "Only if they have not operated any MEWP for more than 10 years",
      "Only if they are working in another country"
    ],
    correctAnswer: 1,
    explanation: "An IPAF PAL Card is category-specific (e.g. 3a for scissor lifts, 3b for booms). Operating a machine outside the cardholder's categories requires additional training. Additionally, site-specific familiarisation and machine-specific induction are always required regardless of card categories.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "IPAF categories",
    category: "Access Equipment & Selection"
  },
  {
    id: 78,
    question: "What is a 'transom' in scaffold terminology, and why is it critical?",
    options: [
      "A diagonal brace that prevents racking; it is critical for stability",
      "A horizontal tube spanning between ledgers at right angles to the building; it supports the scaffold boards",
      "A base plate placed under each standard; it distributes load",
      "A guardrail component; it prevents falls"
    ],
    correctAnswer: 1,
    explanation: "A transom is a horizontal tube that spans between the inner and outer ledgers at right angles to the building face. Transoms directly support the scaffold boards and transfer the load from the platform to the ledgers and standards. Incorrectly spaced transoms can cause board failure.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "Scaffold types/components",
    category: "Access Equipment & Selection"
  },
  {
    id: 79,
    question: "A tower scaffold is to be erected to 8 metres height outdoors with a 1.4m x 2.0m base. According to the 3:1 rule, is this permissible without stabilisers?",
    options: [
      "Yes — 8 divided by 2.0 is 4:1 but the rule allows up to 5:1",
      "No — the height-to-narrowest-base ratio is 8:1.4 = 5.7:1, exceeding the 3:1 outdoor limit",
      "Yes — the 3:1 rule only applies to scaffolds above 10 metres",
      "No — tower scaffolds cannot exceed 4 metres outdoors"
    ],
    correctAnswer: 1,
    explanation: "The height-to-base ratio must be calculated using the narrowest base dimension. Here, 8m height divided by 1.4m base gives a ratio of approximately 5.7:1, which far exceeds the 3:1 limit for outdoor use. Stabilisers or outriggers must be fitted to widen the effective base.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "Scaffold types/components",
    category: "Access Equipment & Selection"
  },
  {
    id: 80,
    question: "EN 131-1 specifies that a ladder must withstand a vertical test load applied to a rung. What is the minimum test load for a professional-grade ladder?",
    options: [
      "100 kg",
      "150 kg (1.5 kN)",
      "260 kg (2.6 kN)",
      "500 kg (5 kN)"
    ],
    correctAnswer: 1,
    explanation: "EN 131-1 requires professional-grade ladders to withstand a minimum test load of 150 kg (1.5 kN) applied vertically to the centre of a rung. This ensures the ladder can safely support a worker plus tools and equipment during normal professional use.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "EN 131",
    category: "Access Equipment & Selection"
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
      "Collective is cheaper; personal is more expensive",
      "Collective protects everyone in the area without individual action; personal protects only the wearer",
      "There is no meaningful difference",
      "Personal protection is always preferred over collective protection"
    ],
    correctAnswer: 1,
    explanation: "Collective fall protection (e.g. guard rails, safety nets) protects all workers in the area without requiring individual action. Personal fall protection (e.g. harnesses, lanyards) only protects the individual wearing it. The hierarchy requires collective measures to be considered first.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Collective vs personal",
    category: "Fall Protection & Prevention"
  },
  {
    id: 82,
    question: "What is the minimum height for a guard rail (top rail) on a working platform?",
    options: [
      "750mm above the platform",
      "900mm above the platform",
      "950mm above the platform",
      "1100mm above the platform"
    ],
    correctAnswer: 2,
    explanation: "The minimum height for the top guard rail on a working platform is 950mm above the platform surface. This height is specified to prevent a person from toppling over the rail. An intermediate rail or equivalent protection must also be provided.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Guard rails (950mm, EN 13374)",
    category: "Fall Protection & Prevention"
  },
  {
    id: 83,
    question: "Which European standard covers temporary edge protection systems (guard rails)?",
    options: [
      "EN 361",
      "EN 354",
      "EN 13374",
      "EN 1263"
    ],
    correctAnswer: 2,
    explanation: "EN 13374 specifies the requirements for temporary edge protection systems used during construction and maintenance work. It classifies guard rail systems into three classes (A, B, and C) based on the slope of the surface being protected.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Guard rails (950mm, EN 13374)",
    category: "Fall Protection & Prevention"
  },
  {
    id: 84,
    question: "What is the purpose of a full-body safety harness?",
    options: [
      "To prevent a worker from reaching the edge of a platform",
      "To distribute fall arrest forces across the body and keep the wearer upright during and after a fall",
      "To allow a worker to abseil down a building",
      "To replace the need for guard rails entirely"
    ],
    correctAnswer: 1,
    explanation: "A full-body safety harness distributes the forces generated during a fall arrest across the shoulders, chest, and thighs. It keeps the wearer in an upright position during and after the fall, reducing the risk of injury and enabling rescue.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Harness (EN 361)",
    category: "Fall Protection & Prevention"
  },
  {
    id: 85,
    question: "Which European standard covers full-body harnesses?",
    options: [
      "EN 354",
      "EN 355",
      "EN 361",
      "EN 1263"
    ],
    correctAnswer: 2,
    explanation: "EN 361 specifies the requirements for full-body harnesses used as a component of a personal fall protection system. It covers the design, materials, testing, and marking requirements that all compliant harnesses must meet.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Harness (EN 361)",
    category: "Fall Protection & Prevention"
  },
  {
    id: 86,
    question: "What is a safety net designed to do in a work at height scenario?",
    options: [
      "Prevent workers from accessing dangerous areas",
      "Catch a falling worker and reduce the impact of the fall",
      "Support tools and materials on a scaffold",
      "Act as a sunshade over the working area"
    ],
    correctAnswer: 1,
    explanation: "Safety nets are designed to catch a worker who has fallen, absorbing the energy of the fall and reducing the impact on the body. They are a collective fall mitigation measure, positioned below the working area. They comply with EN 1263.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Safety nets (EN 1263)",
    category: "Fall Protection & Prevention"
  },
  {
    id: 87,
    question: "Which European standard covers lanyards used in personal fall protection systems?",
    options: [
      "EN 361",
      "EN 354",
      "EN 13374",
      "EN 131"
    ],
    correctAnswer: 1,
    explanation: "EN 354 specifies requirements for lanyards — the connecting elements between a harness and an anchor point. Lanyards must have a maximum length of 2 metres. They may be combined with energy absorbers covered by EN 355.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Lanyards (EN 354/355)",
    category: "Fall Protection & Prevention"
  },

  // --- Intermediate (88-96) ---
  {
    id: 88,
    question: "What is the maximum permitted free-fall distance when using a personal fall arrest system?",
    options: [
      "2 metres",
      "4 metres",
      "6 metres",
      "There is no limit if a harness is worn"
    ],
    correctAnswer: 2,
    explanation: "The maximum free-fall distance permitted when using a personal fall arrest system is 6 metres, including the deployment of any energy absorber. However, the total fall distance must also be calculated to ensure there is sufficient clearance below to avoid striking the ground or an obstruction.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Harness (EN 361)",
    category: "Fall Protection & Prevention"
  },
  {
    id: 89,
    question: "What is an energy absorber and which European standard covers it?",
    options: [
      "A device that stores energy for later use; EN 361",
      "A device that limits the force transmitted to the body during fall arrest; EN 355",
      "A battery pack for powered MEWPs; EN 131",
      "A shock-proof mat placed at ground level; EN 13374"
    ],
    correctAnswer: 1,
    explanation: "An energy absorber (covered by EN 355) is a component of a fall arrest system that deforms or tears during a fall to limit the maximum arrest force transmitted to the wearer's body to no more than 6 kN. This significantly reduces the risk of injury.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Lanyards (EN 354/355)",
    category: "Fall Protection & Prevention"
  },
  {
    id: 90,
    question: "EN 13374 classifies guard rail systems into three classes. Class A is suitable for which type of surface?",
    options: [
      "Surfaces with a slope greater than 45 degrees",
      "Flat or low-slope surfaces up to 10 degrees",
      "Vertical surfaces only",
      "Fragile surfaces only"
    ],
    correctAnswer: 1,
    explanation: "EN 13374 Class A edge protection is suitable for flat or low-slope surfaces up to 10 degrees. Class B covers slopes from 10 to 30 degrees, and Class C covers slopes from 30 to 45 degrees, with progressively higher load and retention requirements.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Guard rails (950mm, EN 13374)",
    category: "Fall Protection & Prevention"
  },
  {
    id: 91,
    question: "Why must a rescue plan be in place before any worker uses a personal fall arrest system?",
    options: [
      "Because the HSE will issue an automatic fine if one is not in place",
      "Because a suspended worker can develop suspension trauma within minutes, which can be fatal if rescue is delayed",
      "Because it is a requirement of the worker's insurance policy",
      "A rescue plan is recommended but not legally required"
    ],
    correctAnswer: 1,
    explanation: "Suspension trauma (also called harness hang syndrome) can occur when a worker is suspended motionless in a harness. Blood pools in the legs, and without timely rescue, loss of consciousness and death can occur within 15-20 minutes. A rescue plan is a legal requirement.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Harness (EN 361)",
    category: "Fall Protection & Prevention"
  },
  {
    id: 92,
    question: "What is the maximum distance a safety net should be positioned below the working area?",
    options: [
      "1 metre",
      "2 metres",
      "6 metres",
      "10 metres"
    ],
    correctAnswer: 1,
    explanation: "Safety nets should be positioned as close as practicable to the working area, and generally no more than 2 metres below it. The greater the fall distance into the net, the higher the impact force and the risk of injury or the net contacting structures below.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Safety nets (EN 1263)",
    category: "Fall Protection & Prevention"
  },
  {
    id: 93,
    question: "What is the maximum length of a lanyard under EN 354?",
    options: [
      "1 metre",
      "1.5 metres",
      "2 metres",
      "3 metres"
    ],
    correctAnswer: 2,
    explanation: "EN 354 specifies that a lanyard must not exceed 2 metres in length, including any terminal connectors. This limits the free-fall distance and reduces the forces experienced during fall arrest. Shorter lanyards are always preferable to reduce fall distance.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Lanyards (EN 354/355)",
    category: "Fall Protection & Prevention"
  },
  {
    id: 94,
    question: "When should a full-body harness be removed from service and not used?",
    options: [
      "After every use, regardless of condition",
      "Only when it has visibly torn straps",
      "If it has been subjected to a fall arrest, shows signs of damage, wear, or chemical exposure, or has passed its service life",
      "Only when the manufacturer issues a recall"
    ],
    correctAnswer: 2,
    explanation: "A harness must be removed from service if it has arrested a fall (even once), shows visible damage, wear, mildew, or chemical contamination, or has exceeded the manufacturer's recommended service life. Pre-use inspections must be carried out before every use.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Harness (EN 361)",
    category: "Fall Protection & Prevention"
  },
  {
    id: 95,
    question: "Why are collective fall protection measures preferred over personal fall protection in the hierarchy?",
    options: [
      "Because they are always cheaper",
      "Because they protect all workers without relying on individual compliance or correct fitting",
      "Because personal protection equipment is unreliable",
      "Because the HSE has banned personal protection equipment"
    ],
    correctAnswer: 1,
    explanation: "Collective measures such as guard rails and safety nets protect everyone in the area automatically, without requiring individual action, training, or correct fitting. Personal protection relies on each worker wearing their equipment correctly, which introduces human error.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Collective vs personal",
    category: "Fall Protection & Prevention"
  },
  {
    id: 96,
    question: "What is the function of the dorsal (back) attachment point on a full-body harness?",
    options: [
      "For attaching a tool belt",
      "The primary attachment point for fall arrest — it positions the arrest force at the centre of the back",
      "For connecting a work positioning lanyard",
      "For lifting the worker by crane"
    ],
    correctAnswer: 1,
    explanation: "The dorsal (back) D-ring is the primary fall arrest attachment point. Positioned between the shoulder blades, it ensures that during a fall the wearer is arrested in an upright position with the force distributed correctly across the harness webbing.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Harness (EN 361)",
    category: "Fall Protection & Prevention"
  },

  // --- Advanced (97-100) ---
  {
    id: 97,
    question: "When calculating total fall distance for a personal fall arrest system, which factors must be included?",
    options: [
      "Only the lanyard length",
      "Free-fall distance, energy absorber deployment, harness stretch, D-ring shift, and a safety clearance below the worker's feet",
      "Only the height of the working platform",
      "The worker's height minus the anchor point height"
    ],
    correctAnswer: 1,
    explanation: "Total fall distance includes: the free-fall distance before the lanyard becomes taut, the energy absorber deployment (up to 1.75m), harness stretch and D-ring shift (approx 0.5m), and a minimum 1m safety clearance below the worker's feet. All must be calculated to avoid ground strike.",
    section: "Module 3",
    difficulty: "advanced",
    topic: "Harness (EN 361)",
    category: "Fall Protection & Prevention"
  },
  {
    id: 98,
    question: "EN 1263-1 specifies that safety nets must be tested to withstand the impact of a test mass dropped from a specified height. What mass and drop height are used for the standard test?",
    options: [
      "50 kg from 3 metres",
      "100 kg from 7 metres",
      "75 kg from 5 metres",
      "200 kg from 10 metres"
    ],
    correctAnswer: 1,
    explanation: "EN 1263-1 requires safety nets to be tested by dropping a 100 kg test mass from a height of 7 metres. This simulates the impact of a falling worker and validates that the net and its fixings can arrest the fall without failure or excessive deflection.",
    section: "Module 3",
    difficulty: "advanced",
    topic: "Safety nets (EN 1263)",
    category: "Fall Protection & Prevention"
  },
  {
    id: 99,
    question: "A worker wearing a full-body harness with a 1.5m energy-absorbing lanyard is attached to an anchor point at foot level. Assuming the energy absorber deploys by 1.75m and allowing 0.5m for harness shift plus 1m clearance, what is the minimum fall clearance required below the working level?",
    options: [
      "3.75 metres",
      "4.75 metres",
      "5.75 metres",
      "6.75 metres"
    ],
    correctAnswer: 1,
    explanation: "The calculation is: lanyard length (1.5m) + energy absorber deployment (1.75m) + harness shift (0.5m) + safety clearance (1.0m) = 4.75m. When the anchor is at foot level, the worker may free-fall the full lanyard length before the system engages, requiring this total clearance.",
    section: "Module 3",
    difficulty: "advanced",
    topic: "Lanyards (EN 354/355)",
    category: "Fall Protection & Prevention"
  },
  {
    id: 100,
    question: "EN 13374 Class C edge protection is designed for surfaces with slopes between 30 and 45 degrees. What additional requirement does Class C have compared to Class A?",
    options: [
      "Class C only needs a single top rail",
      "Class C must include a mesh infill or panel capable of withstanding the dynamic forces of a person sliding down the slope",
      "Class C requires painting in a bright colour",
      "Class C is identical to Class A but taller"
    ],
    correctAnswer: 1,
    explanation: "Class C edge protection must include a mesh infill or solid panel to catch a person sliding down the steep slope. Unlike Class A (for flat/near-flat surfaces) where simple rails suffice, Class C must resist the dynamic impact force of a sliding body, requiring substantially stronger construction.",
    section: "Module 3",
    difficulty: "advanced",
    topic: "Guard rails (950mm, EN 13374)",
    category: "Fall Protection & Prevention"
  },
  // --- Questions 101-200 continue below ---
// =======================================================================
// FALL PROTECTION & PREVENTION — 20 questions (id 101–120), Module 3
// =======================================================================

// --- basic (7) ---
{
  id: 101,
  question: "What does the abbreviation SRL stand for in fall protection equipment?",
  options: [
    "Safety Retractable Lanyard",
    "Self-Retracting Lifeline",
    "Standard Restraint Line",
    "Secured Rope Link"
  ],
  correctAnswer: 1,
  explanation: "SRL stands for Self-Retracting Lifeline. It is a fall arrest device that allows free movement whilst working and automatically locks when a sudden pull or fall is detected, limiting the fall distance.",
  section: "Module 3",
  difficulty: "basic",
  topic: "Self-Retracting Lifelines",
  category: "Fall Protection & Prevention"
},
{
  id: 102,
  question: "What is the minimum rated strength required for a single-person anchor point under EN 795?",
  options: [
    "6 kN",
    "10 kN",
    "12 kN",
    "15 kN"
  ],
  correctAnswer: 2,
  explanation: "EN 795 specifies that a single-person anchor point must withstand a minimum static strength of 12 kN. This ensures the anchor can sustain the dynamic forces generated during a fall arrest event.",
  section: "Module 3",
  difficulty: "basic",
  topic: "Anchor Points",
  category: "Fall Protection & Prevention"
},
{
  id: 103,
  question: "What is the key difference between a fall arrest system and a fall restraint system?",
  options: [
    "Fall arrest is cheaper than fall restraint",
    "Fall restraint prevents the user reaching a fall edge; fall arrest stops a fall after it begins",
    "Fall arrest uses a harness; fall restraint uses a belt only",
    "There is no practical difference between the two systems"
  ],
  correctAnswer: 1,
  explanation: "A fall restraint system physically prevents the worker from reaching a position where a fall could occur. A fall arrest system allows access to the edge but is designed to safely stop a fall that has already begun, using energy-absorbing components.",
  section: "Module 3",
  difficulty: "basic",
  topic: "Fall Arrest vs Restraint",
  category: "Fall Protection & Prevention"
},
{
  id: 104,
  question: "Which of the following materials is commonly classified as a fragile surface?",
  options: [
    "Reinforced concrete slab",
    "Steel decking with anti-slip coating",
    "Fibre cement sheeting",
    "Solid timber boarding"
  ],
  correctAnswer: 2,
  explanation: "Fibre cement sheeting is a well-known fragile material that cannot safely support the weight of a person. Other common fragile surfaces include roof lights, liner panels, and corroded metal sheeting. Workers must never walk directly on fragile surfaces.",
  section: "Module 3",
  difficulty: "basic",
  topic: "Fragile Surfaces",
  category: "Fall Protection & Prevention"
},
{
  id: 105,
  question: "What is the primary purpose of a crawling board when working on a fragile roof?",
  options: [
    "To provide a comfortable resting surface",
    "To spread the worker's weight over a larger area of the roof",
    "To give a better view of the work area",
    "To prevent tools from rolling off the roof"
  ],
  correctAnswer: 1,
  explanation: "Crawling boards (also called roof ladders or cat ladders) are designed to spread the worker's weight over a larger area of the fragile roof surface. This significantly reduces the point loading and the risk of breaking through the material.",
  section: "Module 3",
  difficulty: "basic",
  topic: "Crawling Boards",
  category: "Fall Protection & Prevention"
},
{
  id: 106,
  question: "How often must a full-body harness used as part of a fall arrest system undergo a thorough examination under LOLER 1998?",
  options: [
    "Every 3 months",
    "Every 6 months",
    "Every 12 months",
    "Every 24 months"
  ],
  correctAnswer: 1,
  explanation: "Under the Lifting Operations and Lifting Equipment Regulations 1998 (LOLER), equipment used for arresting falls must receive a thorough examination by a competent person at least every 6 months. This is in addition to the pre-use checks carried out by the user.",
  section: "Module 3",
  difficulty: "basic",
  topic: "LOLER Thorough Examination",
  category: "Fall Protection & Prevention"
},
{
  id: 107,
  question: "Which HSE guidance document specifically addresses safety in roof work?",
  options: [
    "HSG33",
    "HSG65",
    "HSG150",
    "HSG245"
  ],
  correctAnswer: 0,
  explanation: "HSG33 'Health and Safety in Roof Work' is the HSE's key guidance document covering the hazards and safe working practices associated with all types of roof work. It provides practical advice on planning, risk assessment, and selecting the right access and fall protection equipment.",
  section: "Module 3",
  difficulty: "basic",
  topic: "HSG33 Roof Work",
  category: "Fall Protection & Prevention"
},

// --- intermediate (9) ---
{
  id: 108,
  question: "When calculating the required clearance distance for a fall arrest system, which of the following factors must be included?",
  options: [
    "Only the lanyard length",
    "Lanyard length, deceleration distance, and height of the worker below the anchor",
    "Lanyard length, deceleration distance, height of worker below anchor, and a safety margin",
    "Only the distance from the anchor to the ground"
  ],
  correctAnswer: 2,
  explanation: "Clearance distance calculation must account for the full lanyard deployment length, the energy absorber deceleration distance (typically up to 1.75 m), the distance from the anchor to the worker's dorsal D-ring, the worker's height below the D-ring, and an additional safety margin of at least 1 metre.",
  section: "Module 3",
  difficulty: "intermediate",
  topic: "Clearance Distance Calculation",
  category: "Fall Protection & Prevention"
},
{
  id: 109,
  question: "An SRL compliant with EN 360 has a maximum permissible arrest distance of what value?",
  options: [
    "0.6 m",
    "1.0 m",
    "1.4 m",
    "2.0 m"
  ],
  correctAnswer: 2,
  explanation: "Under EN 360, the maximum permissible arrest distance for a self-retracting lifeline is 1.4 metres when tested with a 100 kg mass. This shorter arrest distance compared to a standard energy-absorbing lanyard (up to 1.75 m) makes SRLs advantageous where clearance is limited.",
  section: "Module 3",
  difficulty: "intermediate",
  topic: "Self-Retracting Lifelines",
  category: "Fall Protection & Prevention"
},
{
  id: 110,
  question: "A work positioning system is best described as one that:",
  options: [
    "Prevents the user from reaching any edge",
    "Supports the worker in tension or suspension so they can work hands-free at the work location",
    "Catches a worker after a free fall of more than 2 metres",
    "Is only used for rescue operations"
  ],
  correctAnswer: 1,
  explanation: "A work positioning system holds the user in place by means of a belt or harness connected to a reliable anchorage, allowing them to work hands-free whilst being supported in tension or partial suspension. It is commonly used by linesmen on utility poles and steelworkers on structural frameworks.",
  section: "Module 3",
  difficulty: "intermediate",
  topic: "Work Positioning Systems",
  category: "Fall Protection & Prevention"
},
{
  id: 111,
  question: "During a pre-use inspection of a full-body harness, a worker discovers stitching that appears to be cut on the dorsal D-ring attachment. What should they do?",
  options: [
    "Apply tape to reinforce the stitching and continue use",
    "Only use the harness for light-duty restraint work",
    "Immediately withdraw the harness from service, tag it as defective, and report it to their supervisor",
    "Continue using the harness until the next scheduled thorough examination"
  ],
  correctAnswer: 2,
  explanation: "Any damage to load-bearing stitching on a harness is a critical defect. The harness must be immediately withdrawn from service, clearly tagged as defective to prevent others using it, and reported to a supervisor. The harness should then be assessed by a competent person.",
  section: "Module 3",
  difficulty: "intermediate",
  topic: "Harness Inspection",
  category: "Fall Protection & Prevention"
},
{
  id: 112,
  question: "Which type of EN 795 anchor device is a single-point non-structural anchor designed to be fixed to a vertical, horizontal, or inclined surface?",
  options: [
    "Type A",
    "Type B",
    "Type C",
    "Type E"
  ],
  correctAnswer: 0,
  explanation: "EN 795 Type A anchor devices are structural anchors designed to be fixed to roofs, walls, or other surfaces. Type B is a transportable temporary device, Type C is a horizontal flexible anchor line, and Type E is a deadweight anchor. Each type suits different site conditions.",
  section: "Module 3",
  difficulty: "intermediate",
  topic: "Anchor Points",
  category: "Fall Protection & Prevention"
},
{
  id: 113,
  question: "Roof lights are classified as fragile surfaces. What is the recommended minimum protection measure when working near roof lights?",
  options: [
    "Paint the roof lights a bright colour so they are visible",
    "Cover them with suitable load-bearing material and install barriers around them",
    "Place a warning sign 5 metres from each roof light",
    "Only approach roof lights when accompanied by another worker"
  ],
  correctAnswer: 1,
  explanation: "Roof lights must be covered with load-bearing covers that are clearly marked and secured so they cannot be displaced. Additionally, suitable barriers such as guard rails should be installed around them. Simply marking or painting roof lights is insufficient to prevent falls through them.",
  section: "Module 3",
  difficulty: "intermediate",
  topic: "Fragile Surfaces",
  category: "Fall Protection & Prevention"
},
{
  id: 114,
  question: "What is the maximum permissible free fall distance when using a fall arrest system with an energy-absorbing lanyard?",
  options: [
    "1.0 m",
    "1.8 m",
    "2.0 m",
    "4.0 m"
  ],
  correctAnswer: 2,
  explanation: "When using a standard energy-absorbing lanyard as part of a fall arrest system, the free fall distance must not exceed 2.0 metres. If the potential free fall is greater, alternative equipment such as an SRL should be specified to reduce the arrest forces on the user's body.",
  section: "Module 3",
  difficulty: "intermediate",
  topic: "Fall Arrest vs Restraint",
  category: "Fall Protection & Prevention"
},
{
  id: 115,
  question: "When must a harness be discarded, even if it passes a visual inspection?",
  options: [
    "After it has been stored in a bag for more than 6 months",
    "After it has been subjected to a fall arrest event",
    "After it has been worn by more than one user",
    "After it has been cleaned with mild soap and water"
  ],
  correctAnswer: 1,
  explanation: "A harness must be withdrawn from service and discarded (or returned to the manufacturer for assessment) after it has been subjected to a fall arrest event. The dynamic forces during a fall can cause invisible damage to webbing fibres and stitching that compromise future performance.",
  section: "Module 3",
  difficulty: "intermediate",
  topic: "When to Discard Harness",
  category: "Fall Protection & Prevention"
},
{
  id: 116,
  question: "Liner panels beneath profiled metal roofing sheets are a common fragile surface hazard. In what situation is the risk of falling through liner panels greatest?",
  options: [
    "When the upper profiled sheets are intact and secure",
    "During re-roofing work when the top profiled sheets have been removed exposing the liner below",
    "When the liner panels are wet from rain",
    "When the building is heated internally"
  ],
  correctAnswer: 1,
  explanation: "The risk from fragile liner panels is greatest during re-roofing when the upper profiled metal sheets are removed, exposing the thin liner panels underneath. Workers may mistakenly assume the liner can support their weight, but these panels are not designed to bear any load.",
  section: "Module 3",
  difficulty: "intermediate",
  topic: "Fragile Surfaces",
  category: "Fall Protection & Prevention"
},

// --- advanced (4) ---
{
  id: 117,
  question: "A worker using a 2 m energy-absorbing lanyard is anchored at foot level. The dorsal D-ring is 1.5 m above the standing surface. The energy absorber has a maximum deployment of 1.75 m. Including a 1 m safety margin, what is the minimum clearance distance required below the working level?",
  options: [
    "4.75 m",
    "5.25 m",
    "6.25 m",
    "7.00 m"
  ],
  correctAnswer: 2,
  explanation: "The clearance calculation is: lanyard length (2.0 m) + energy absorber deployment (1.75 m) + distance from D-ring to feet (1.5 m) + safety margin (1.0 m) = 6.25 m. If the available clearance below the work level is less than 6.25 m, this system configuration is unsuitable and a shorter lanyard or SRL must be used.",
  section: "Module 3",
  difficulty: "advanced",
  topic: "Clearance Distance Calculation",
  category: "Fall Protection & Prevention"
},
{
  id: 118,
  question: "Under EN 795, a Type C horizontal flexible anchor line is being installed for 3 simultaneous users. What is the minimum required static strength for this system?",
  options: [
    "12 kN",
    "15 kN",
    "18 kN",
    "21 kN"
  ],
  correctAnswer: 3,
  explanation: "For a Type C horizontal flexible anchor line, the minimum static strength is 12 kN for the first user, plus an additional 1 kN for each additional user according to EN 795 principles. However, system design must also account for the significant deflection forces. Many manufacturers specify 12 kN + 3 kN per additional user, giving 21 kN for 3 users, to provide adequate safety margins.",
  section: "Module 3",
  difficulty: "advanced",
  topic: "Anchor Points",
  category: "Fall Protection & Prevention"
},
{
  id: 119,
  question: "A competent person is conducting a 6-monthly LOLER thorough examination of an SRL. Which of the following would NOT typically be assessed during this examination?",
  options: [
    "Correct operation of the braking mechanism by pull-testing",
    "Condition of the internal cable or webbing for corrosion, fraying, or distortion",
    "The psychological readiness of the intended user",
    "Housing integrity, label legibility, and certification traceability"
  ],
  correctAnswer: 2,
  explanation: "A LOLER thorough examination assesses the physical condition and mechanical function of the equipment: braking mechanism, internal lifeline condition, housing integrity, labels, and certification records. The psychological readiness of the user is not part of an equipment examination — it falls under competency assessment and training.",
  section: "Module 3",
  difficulty: "advanced",
  topic: "LOLER Thorough Examination",
  category: "Fall Protection & Prevention"
},
{
  id: 120,
  question: "On a large commercial re-roofing project involving fragile cement fibre sheets and multiple roof lights, the hierarchy of control for preventing falls through fragile surfaces should prioritise which approach first?",
  options: [
    "Issuing personal fall arrest equipment to each worker",
    "Working from underneath using a MEWP or mobile scaffold tower to avoid being on the fragile surface at all",
    "Installing safety netting directly below the fragile roof",
    "Covering each fragile panel with boards and placing barriers around roof lights"
  ],
  correctAnswer: 1,
  explanation: "The hierarchy of control requires avoiding work on fragile surfaces entirely where reasonably practicable. Working from below using a MEWP or scaffold tower eliminates exposure to the fragile roof altogether. Only when avoidance is not reasonably practicable should collective protection (netting, covers, barriers) and then personal protection (harnesses) be considered in that order.",
  section: "Module 3",
  difficulty: "advanced",
  topic: "HSG33 Roof Work",
  category: "Fall Protection & Prevention"
},

// =======================================================================
// SAFE SYSTEMS OF WORK — 40 questions (id 121–160), Module 4
// =======================================================================

// --- basic (14) ---
{
  id: 121,
  question: "Under Regulation 4 of the Work at Height Regulations 2005, what is the first duty of every employer in relation to work at height?",
  options: [
    "Provide personal protective equipment",
    "Avoid work at height where it is reasonably practicable to do so",
    "Write a method statement for every task",
    "Train every employee in harness use"
  ],
  correctAnswer: 1,
  explanation: "Regulation 4 establishes a clear hierarchy: first avoid work at height altogether if it is reasonably practicable. Only where it cannot be avoided should measures be taken to prevent falls, and then to minimise the distance and consequences of any fall.",
  section: "Module 4",
  difficulty: "basic",
  topic: "WAH Regs Reg 4",
  category: "Safe Systems of Work"
},
{
  id: 122,
  question: "What is the definition of a 'competent person' in the context of work at height?",
  options: [
    "Anyone who has worked in construction for more than 5 years",
    "A person with sufficient training, experience, and knowledge to carry out the task safely",
    "Only a chartered health and safety professional",
    "The most senior person on site"
  ],
  correctAnswer: 1,
  explanation: "A competent person is someone who has sufficient training, practical experience, and knowledge relevant to the nature of the work to enable them to identify risks and implement appropriate controls. Competence is task-specific and must be proportionate to the complexity of the work.",
  section: "Module 4",
  difficulty: "basic",
  topic: "Competent Person Definition",
  category: "Safe Systems of Work"
},
{
  id: 123,
  question: "At what wind speed is it generally recommended to stop most work at height activities?",
  options: [
    "Above 10 mph (Force 3)",
    "Above 17 mph (Force 5)",
    "Above 25 mph (Force 7)",
    "Above 40 mph (Force 8)"
  ],
  correctAnswer: 1,
  explanation: "As a general guideline, work at height should cease when wind speeds exceed approximately 17 mph or Beaufort Force 5. However, lighter structures such as scaffold sheeting and tower scaffolds may need to stop at lower wind speeds. A site-specific risk assessment should always determine the safe threshold.",
  section: "Module 4",
  difficulty: "basic",
  topic: "Weather Limits",
  category: "Safe Systems of Work"
},
{
  id: 124,
  question: "What is the primary purpose of a permit-to-work system for work at height?",
  options: [
    "To replace the need for risk assessments",
    "To provide a formal documented system of checks and authorisations before high-risk work begins",
    "To allow workers to bypass safety procedures in emergencies",
    "To record attendance on site"
  ],
  correctAnswer: 1,
  explanation: "A permit-to-work (PTW) is a formal written system that ensures all necessary safety checks, precautions, and authorisations are completed before high-risk work begins. It controls the sequence of work, identifies hazards, and ensures clear communication between all parties involved.",
  section: "Module 4",
  difficulty: "basic",
  topic: "Permit-to-Work Systems",
  category: "Safe Systems of Work"
},
{
  id: 125,
  question: "What must every work-at-height activity have in place before it begins?",
  options: [
    "A television monitor for live CCTV",
    "A suitable and sufficient risk assessment",
    "At least three trained operatives on site",
    "Written approval from the HSE"
  ],
  correctAnswer: 1,
  explanation: "Before any work at height begins, a suitable and sufficient risk assessment must be carried out to identify the hazards, evaluate the risks, and determine the appropriate control measures. This is a fundamental legal requirement under the Management of Health and Safety at Work Regulations 1999.",
  section: "Module 4",
  difficulty: "basic",
  topic: "Planning Requirements",
  category: "Safe Systems of Work"
},
{
  id: 126,
  question: "Why must a rescue plan be prepared before any work at height commences?",
  options: [
    "It is only needed for work above 10 metres",
    "Because the Work at Height Regulations require that emergency procedures, including rescue, are planned in advance",
    "It is optional but considered best practice",
    "It is only required if the client specifically requests one"
  ],
  correctAnswer: 1,
  explanation: "Schedule 4 of the Work at Height Regulations 2005 requires that emergency procedures, including rescue, are planned before work begins. Prompt rescue is essential because suspension trauma can become life-threatening within 15 to 30 minutes of a fall into a harness.",
  section: "Module 4",
  difficulty: "basic",
  topic: "Rescue Plans",
  category: "Safe Systems of Work"
},
{
  id: 127,
  question: "What is suspension trauma?",
  options: [
    "A fear of heights that prevents a person from working at height",
    "A potentially fatal condition caused by the body remaining motionless in a vertical position in a harness after a fall",
    "Bruising caused by an ill-fitting harness",
    "A condition caused by exposure to cold temperatures at height"
  ],
  correctAnswer: 1,
  explanation: "Suspension trauma (also called harness hang syndrome) occurs when a person is suspended motionless in an upright position in a harness. Blood pools in the legs, reducing venous return to the heart. Without prompt rescue, this can lead to renal failure and cardiac arrest within 15 to 30 minutes.",
  section: "Module 4",
  difficulty: "basic",
  topic: "Suspension Trauma",
  category: "Safe Systems of Work"
},
{
  id: 128,
  question: "What does a method statement describe?",
  options: [
    "The financial budget for the project",
    "The step-by-step safe sequence of work, including the hazards, controls, and responsibilities for each stage",
    "The names and addresses of all site workers",
    "The architect's design drawings"
  ],
  correctAnswer: 1,
  explanation: "A method statement (also called a safe system of work or SSOW) details the step-by-step sequence for carrying out a task safely. It identifies the hazards at each stage, specifies the control measures, and assigns responsibilities. It is commonly used alongside a risk assessment as part of a RAMS package.",
  section: "Module 4",
  difficulty: "basic",
  topic: "Method Statements",
  category: "Safe Systems of Work"
},
{
  id: 129,
  question: "On the Beaufort Scale, Force 5 corresponds to which general description?",
  options: [
    "Light breeze — leaves rustle",
    "Gentle breeze — twigs move",
    "Fresh breeze — small trees sway",
    "Strong breeze — large branches move"
  ],
  correctAnswer: 2,
  explanation: "Beaufort Force 5 is described as a 'Fresh breeze' with wind speeds of 17–21 mph (29–38 km/h). At this level, small trees in leaf begin to sway and crested wavelets form on inland waters. This is the widely accepted threshold for stopping most work at height.",
  section: "Module 4",
  difficulty: "basic",
  topic: "Beaufort Scale Thresholds",
  category: "Safe Systems of Work"
},
{
  id: 130,
  question: "Which HSE guidance document provides advice on working near overhead power lines?",
  options: [
    "HSG33",
    "GS6",
    "HSG150",
    "L22"
  ],
  correctAnswer: 1,
  explanation: "HSE Guidance Note GS6 'Avoidance of Danger from Overhead Power Lines' provides detailed advice on the safe clearance distances and precautions needed when working near overhead electric lines. It covers planning, risk assessment, and physical controls such as barriers and goal posts.",
  section: "Module 4",
  difficulty: "basic",
  topic: "Overhead Power Lines",
  category: "Safe Systems of Work"
},
{
  id: 131,
  question: "What is the recommended minimum safe clearance distance from overhead power lines rated at up to 33 kV?",
  options: [
    "3 metres",
    "6 metres",
    "9 metres",
    "15 metres"
  ],
  correctAnswer: 2,
  explanation: "GS6 recommends maintaining a minimum clearance distance of 9 metres from overhead power lines rated up to 33 kV when using equipment such as cranes, MEWPs, or scaffold towers. For higher voltages, the clearance distance increases. A site-specific assessment with the distribution network operator is always recommended.",
  section: "Module 4",
  difficulty: "basic",
  topic: "Overhead Power Lines",
  category: "Safe Systems of Work"
},
{
  id: 132,
  question: "Why must ground conditions be assessed before erecting any access equipment for work at height?",
  options: [
    "To check if the ground colour matches the equipment colour",
    "To ensure the base is firm, level, and capable of supporting the equipment and imposed loads without sinking or shifting",
    "Ground conditions are only relevant for permanent structures",
    "To measure the humidity level of the soil"
  ],
  correctAnswer: 1,
  explanation: "Poor ground conditions can cause access equipment such as scaffolds, towers, and MEWPs to sink, tilt, or collapse. The ground must be assessed to ensure it is firm, level, and capable of supporting the total imposed loads. Measures such as sole boards, base plates, and outrigger pads may be needed.",
  section: "Module 4",
  difficulty: "basic",
  topic: "Ground Conditions",
  category: "Safe Systems of Work"
},
{
  id: 133,
  question: "What measures should be taken to protect members of the public when work at height is being carried out near a public area?",
  options: [
    "No measures are needed if work is above 5 metres",
    "Barriers, warning signs, and exclusion zones should be established to keep the public away from the work area",
    "A single cone placed on the pavement is sufficient",
    "Work at height near the public is always prohibited"
  ],
  correctAnswer: 1,
  explanation: "Suitable barriers, fencing, warning signs, and exclusion zones must be established to prevent members of the public from entering the area where there is a risk of falling objects or other hazards. In some cases, covered walkways or fans may also be required to protect pedestrians.",
  section: "Module 4",
  difficulty: "basic",
  topic: "Public Protection",
  category: "Safe Systems of Work"
},
{
  id: 134,
  question: "What is the '30/30 rule' in relation to lightning and work at height?",
  options: [
    "Work must stop 30 minutes before sunset and not resume until 30 minutes after sunrise",
    "If the time between seeing lightning and hearing thunder is 30 seconds or less, seek shelter; wait 30 minutes after the last lightning before resuming work",
    "Workers may only work at height for 30 minutes out of every 30-minute period",
    "Work must cease if 30 lightning strikes are observed in 30 minutes"
  ],
  correctAnswer: 1,
  explanation: "The 30/30 lightning safety rule states: if the interval between a lightning flash and the thunder is 30 seconds or less, the storm is close enough to be dangerous and workers should seek shelter immediately. Work should not resume until at least 30 minutes after the last observed lightning or thunder.",
  section: "Module 4",
  difficulty: "basic",
  topic: "Weather Limits",
  category: "Safe Systems of Work"
},

// --- intermediate (18) ---
{
  id: 135,
  question: "A permit-to-work for a complex roof access task should include which of the following elements?",
  options: [
    "Description of work, hazards, precautions, PPE, authorised persons, time limits, and sign-off for completion",
    "Only the name of the site foreman and the date",
    "A copy of the company's annual accounts",
    "The manufacturer's brochure for the scaffolding system"
  ],
  correctAnswer: 0,
  explanation: "A comprehensive permit-to-work must detail the specific work, associated hazards, required precautions, necessary PPE, authorised persons (issuer, receiver, and any cross-references), time validity, and formal sign-off/cancellation procedures when the work is complete or the shift ends.",
  section: "Module 4",
  difficulty: "intermediate",
  topic: "Permit-to-Work Systems",
  category: "Safe Systems of Work"
},
{
  id: 136,
  question: "Who is typically responsible for issuing a permit-to-work on a construction site?",
  options: [
    "Any worker who volunteers to do it",
    "A designated competent person or authorised manager who understands the hazards and controls",
    "The client's receptionist",
    "The equipment hire company"
  ],
  correctAnswer: 1,
  explanation: "A permit-to-work must be issued by a designated competent person who has the authority and knowledge to assess the hazards, confirm that all precautions are in place, and authorise the work to proceed safely. This is usually a site manager, supervisor, or safety officer with specific training in the PTW system.",
  section: "Module 4",
  difficulty: "intermediate",
  topic: "Permit-to-Work Systems",
  category: "Safe Systems of Work"
},
{
  id: 137,
  question: "What are the three broad types of rescue that should be considered in a work-at-height rescue plan?",
  options: [
    "Fire rescue, police rescue, and ambulance rescue",
    "Self-rescue, assisted rescue, and technical (team) rescue",
    "Helicopter rescue, ladder rescue, and crane rescue",
    "Phone rescue, radio rescue, and visual signal rescue"
  ],
  correctAnswer: 1,
  explanation: "Rescue plans should address three tiers: self-rescue (the fallen worker rescues themselves using built-in equipment), assisted rescue (a trained colleague uses rescue devices to bring the casualty to safety), and technical rescue (a specialist team with advanced equipment performs the rescue). Planning must ensure at least one tier is achievable promptly.",
  section: "Module 4",
  difficulty: "intermediate",
  topic: "Rescue Plans",
  category: "Safe Systems of Work"
},
{
  id: 138,
  question: "Within what time frame can suspension trauma become life-threatening after a person is left hanging motionless in a harness?",
  options: [
    "5 to 10 minutes",
    "15 to 30 minutes",
    "1 to 2 hours",
    "3 to 4 hours"
  ],
  correctAnswer: 1,
  explanation: "Research indicates that suspension trauma can become life-threatening within approximately 15 to 30 minutes if the casualty remains motionless in an upright position. This underscores the critical importance of having a rapid rescue plan in place before any work at height using harnesses begins.",
  section: "Module 4",
  difficulty: "intermediate",
  topic: "Suspension Trauma",
  category: "Safe Systems of Work"
},
{
  id: 139,
  question: "When should a permit-to-work be cancelled or closed?",
  options: [
    "Only at the end of the calendar month",
    "When the specified work is completed, or at the end of the shift, or when conditions change significantly",
    "Only when the site is permanently closed",
    "Permits never need to be cancelled; they remain valid indefinitely"
  ],
  correctAnswer: 1,
  explanation: "A permit-to-work must be formally cancelled and signed off when the work is completed, at the end of the specified time period or shift, or whenever conditions change significantly (such as a change in weather, scope of work, or an emergency). Permits must never be left open-ended.",
  section: "Module 4",
  difficulty: "intermediate",
  topic: "Permit-to-Work Systems",
  category: "Safe Systems of Work"
},
{
  id: 140,
  question: "What additional precautions should be taken if work at height must continue during icy conditions?",
  options: [
    "No additional precautions are needed; ice only affects vehicles",
    "Gritting or salting of walkways and platforms, enhanced slip-resistant footwear, and continuous monitoring of conditions",
    "Simply asking workers to walk slowly is sufficient",
    "Icy conditions only require an extra tea break to warm up"
  ],
  correctAnswer: 1,
  explanation: "Icy conditions significantly increase the risk of slips and falls at height. Controls include gritting or salting walking surfaces and platforms, using slip-resistant footwear, continuous weather monitoring, and where risks cannot be adequately controlled, postponing the work until conditions improve.",
  section: "Module 4",
  difficulty: "intermediate",
  topic: "Weather Limits",
  category: "Safe Systems of Work"
},
{
  id: 141,
  question: "Regulation 4 of the Work at Height Regulations 2005 sets out a hierarchy. After avoidance, what is the second priority?",
  options: [
    "Issue harnesses to all workers",
    "Use work equipment or other measures to prevent falls",
    "Place safety nets below the work area",
    "Increase the number of workers to share the risk"
  ],
  correctAnswer: 1,
  explanation: "The Regulation 4 hierarchy is: (1) avoid work at height; (2) where avoidance is not reasonably practicable, use work equipment or other measures to prevent falls (e.g., guard rails, platforms); (3) where falls cannot be prevented, use measures to minimise the distance and consequences of a fall (e.g., nets, airbags, harnesses).",
  section: "Module 4",
  difficulty: "intermediate",
  topic: "WAH Regs Reg 4",
  category: "Safe Systems of Work"
},
{
  id: 142,
  question: "What role does a 'method statement receiver' play in a permit-to-work system?",
  options: [
    "They file the method statement in the office archive",
    "They are the person who accepts the permit, understands the precautions, and is responsible for ensuring the work is carried out in accordance with the permit conditions",
    "They write the risk assessment",
    "They deliver the permit to the HSE inspector"
  ],
  correctAnswer: 1,
  explanation: "The permit receiver (sometimes called the performing authority) is the person who accepts responsibility for carrying out the work in accordance with the permit conditions. They must read, understand, and sign the permit, brief their team, and ensure all specified precautions are maintained throughout the work.",
  section: "Module 4",
  difficulty: "intermediate",
  topic: "Permit-to-Work Systems",
  category: "Safe Systems of Work"
},
{
  id: 143,
  question: "When planning work at height, what factor determines whether a permit-to-work is needed rather than just a method statement and risk assessment?",
  options: [
    "The colour of the safety helmets being used",
    "The level of risk, complexity of the work, and whether multiple trades or hazardous interfaces are involved",
    "Permits are only needed on government buildings",
    "A permit is only needed if the work is above 30 metres"
  ],
  correctAnswer: 1,
  explanation: "A permit-to-work is typically required for higher-risk work at height where the consequences of failure are severe, where multiple trades interface, or where specific hazards such as fragile roofs, confined spaces, or live services are present. The decision is based on the risk assessment, not on arbitrary height thresholds.",
  section: "Module 4",
  difficulty: "intermediate",
  topic: "Permit-to-Work Systems",
  category: "Safe Systems of Work"
},
{
  id: 144,
  question: "What is the purpose of including time limits on a permit-to-work?",
  options: [
    "To ensure workers take regular lunch breaks",
    "To ensure that conditions are periodically reassessed and the permit is not left open beyond the period for which hazards have been evaluated",
    "To calculate overtime payments",
    "Time limits are optional and have no safety benefit"
  ],
  correctAnswer: 1,
  explanation: "Time limits on a permit ensure that the authorisation is valid only for the period during which the risk assessment and precautions apply. Conditions may change over time (weather, site activities, shift handovers), so periodic reassessment through permit renewal ensures ongoing safety.",
  section: "Module 4",
  difficulty: "intermediate",
  topic: "Permit-to-Work Systems",
  category: "Safe Systems of Work"
},
{
  id: 145,
  question: "A rescue plan for harness users should ensure rescue can be effected within what target time?",
  options: [
    "Within 1 hour",
    "Within 15 minutes",
    "Within 45 minutes",
    "There is no time target for rescue"
  ],
  correctAnswer: 1,
  explanation: "Given that suspension trauma can become life-threatening within 15 to 30 minutes, rescue plans should aim to effect rescue within 15 minutes of a fall occurring. This target drives the selection of rescue equipment, training requirements, and the positioning of rescue-ready personnel.",
  section: "Module 4",
  difficulty: "intermediate",
  topic: "Rescue Plans",
  category: "Safe Systems of Work"
},
{
  id: 146,
  question: "When working near overhead power lines at 132 kV or above, what is the minimum recommended clearance distance per GS6?",
  options: [
    "3 metres",
    "6 metres",
    "9 metres",
    "15 metres"
  ],
  correctAnswer: 3,
  explanation: "For overhead power lines at 132 kV and above, GS6 recommends a minimum clearance distance of 15 metres. At these voltages, electricity can arc across significant distances. The distribution network operator should always be consulted for site-specific advice before any work commences nearby.",
  section: "Module 4",
  difficulty: "intermediate",
  topic: "Overhead Power Lines",
  category: "Safe Systems of Work"
},
{
  id: 147,
  question: "What is meant by 'competence' being task-specific in the context of work at height?",
  options: [
    "A person competent in one task is automatically competent in all tasks at height",
    "A person must have the specific training, knowledge, and experience relevant to the particular task they are performing",
    "Competence is only measured by how many years someone has worked",
    "Task-specific competence means passing a single generic online test"
  ],
  correctAnswer: 1,
  explanation: "Competence is task-specific, meaning that a person trained and experienced in erecting scaffolding is not automatically competent to use a MEWP or install safety netting. Each task at height requires its own blend of training, knowledge, and practical experience relevant to the specific equipment and hazards involved.",
  section: "Module 4",
  difficulty: "intermediate",
  topic: "Competent Person Definition",
  category: "Safe Systems of Work"
},
{
  id: 148,
  question: "Which of the following is an example of an assisted rescue technique for a worker suspended in a harness?",
  options: [
    "The suspended worker uses their own trauma strap to relieve pressure on their legs",
    "A trained colleague uses a rescue descent device attached to the anchor to lower the casualty to the ground",
    "The suspended worker calls 999 and waits for the fire brigade",
    "A colleague shouts encouragement from the ground"
  ],
  correctAnswer: 1,
  explanation: "An assisted rescue involves a trained colleague using specific rescue equipment — such as a rescue descent device, davit arm, or rescue winch — to lower or raise the suspended casualty to a safe location. This is faster than waiting for emergency services and is a key component of an effective rescue plan.",
  section: "Module 4",
  difficulty: "intermediate",
  topic: "Rescue Plans",
  category: "Safe Systems of Work"
},
{
  id: 149,
  question: "When planning work at height over or near water, which additional control measure is essential?",
  options: [
    "Providing swimming lessons to all workers",
    "Providing personal flotation devices, establishing rescue boat cover, and designating a banksman",
    "Painting the work platform blue to match the water",
    "Only working at height over water during summer months"
  ],
  correctAnswer: 1,
  explanation: "Work over or near water introduces drowning risk. Controls must include personal flotation devices (PFDs or life jackets), dedicated rescue boat cover with trained crew, a designated banksman to raise the alarm, and additional edge protection. The rescue plan must specifically address water rescue procedures.",
  section: "Module 4",
  difficulty: "intermediate",
  topic: "Planning Requirements",
  category: "Safe Systems of Work"
},
{
  id: 150,
  question: "What is the purpose of a 'toolbox talk' in relation to work at height?",
  options: [
    "To demonstrate how to use a toolbox",
    "To provide a brief, focused safety briefing to workers on specific hazards and controls relevant to the task at hand",
    "To discuss the price of tools",
    "To collect tools at the end of the shift"
  ],
  correctAnswer: 1,
  explanation: "A toolbox talk is a short, focused safety briefing delivered at the worksite, often at the start of a shift or before a specific task. It reinforces awareness of the particular hazards, controls, and emergency procedures relevant to the day's work at height and ensures all team members understand the plan.",
  section: "Module 4",
  difficulty: "intermediate",
  topic: "Planning Requirements",
  category: "Safe Systems of Work"
},
{
  id: 151,
  question: "A worker notices that the ground beneath a scaffold tower has become waterlogged after heavy rain. What should they do?",
  options: [
    "Continue working as the tower was stable yesterday",
    "Report the change in conditions, stop work on the tower, and have a competent person reassess the base stability before resuming",
    "Place extra tools on the tower base to weigh it down",
    "Wait 10 minutes for the water to drain away naturally"
  ],
  correctAnswer: 1,
  explanation: "Waterlogged ground can significantly reduce its load-bearing capacity, potentially causing the tower to sink or become unstable. The worker must stop work, report the change, and have a competent person reassess whether the base remains adequate. Additional measures such as base boards or relocation may be necessary.",
  section: "Module 4",
  difficulty: "intermediate",
  topic: "Ground Conditions",
  category: "Safe Systems of Work"
},
{
  id: 152,
  question: "How should falling objects be controlled when work at height is being carried out above an occupied area?",
  options: [
    "Workers should simply be careful not to drop anything",
    "Toe boards, brick guards, debris netting, tool lanyards, and exclusion zones should be used as appropriate",
    "A single warning sign is sufficient",
    "Falling objects are only a concern at heights above 20 metres"
  ],
  correctAnswer: 1,
  explanation: "Multiple controls should be used in combination: toe boards on platforms to prevent items rolling off, brick guards or debris netting to contain materials, tool lanyards to secure hand tools, and exclusion zones or covered walkways to keep people clear of the drop zone below.",
  section: "Module 4",
  difficulty: "intermediate",
  topic: "Public Protection",
  category: "Safe Systems of Work"
},

// --- advanced (8) ---
{
  id: 153,
  question: "A principal contractor is planning a phased re-roofing project on an occupied school. Multiple trades will be working at height simultaneously. Beyond a risk assessment and method statement, what additional safe system of work controls are most appropriate?",
  options: [
    "A simple verbal briefing each morning is sufficient",
    "A permit-to-work system with phase-specific permits, a coordination plan for concurrent trades, exclusion zones below, and a site-specific rescue plan tested with a practice drill",
    "Only the roofing contractor needs a method statement; other trades can self-manage",
    "Issue every worker a harness and rely on individual competence"
  ],
  correctAnswer: 1,
  explanation: "Complex multi-trade work at height on an occupied building demands a permit-to-work system to control each phase, formal coordination between trades to prevent interface hazards, defined exclusion zones to protect building occupants, and a tested rescue plan. A practice drill validates that rescue can be achieved within the target time.",
  section: "Module 4",
  difficulty: "advanced",
  topic: "Permit-to-Work Systems",
  category: "Safe Systems of Work"
},
{
  id: 154,
  question: "During a rescue, a casualty who has been suspended motionless in a harness for 20 minutes is brought to the ground. What position should they initially be placed in, and why?",
  options: [
    "Lying flat on their back to maximise blood flow to the brain",
    "In the W-position (semi-reclined with knees raised) to prevent a sudden surge of pooled blood returning to the heart causing reflow syndrome",
    "Standing upright to restore normal circulation immediately",
    "In the prone position face-down to prevent vomiting"
  ],
  correctAnswer: 1,
  explanation: "After prolonged suspension, a sudden return of pooled, deoxygenated blood from the legs to the heart can cause reflow syndrome and cardiac arrest. The casualty should be placed in the W-position (seated or semi-reclined with knees raised above hip level) for at least 30 to 40 minutes, with medical monitoring, to allow gradual redistribution.",
  section: "Module 4",
  difficulty: "advanced",
  topic: "Suspension Trauma",
  category: "Safe Systems of Work"
},
{
  id: 155,
  question: "A mobile crane is to be used adjacent to 33 kV overhead power lines on a construction site. The crane's maximum boom reach could encroach within the GS6 clearance zone. What control measures should be implemented?",
  options: [
    "Rely on the crane driver's experience to judge distances",
    "Contact the distribution network operator to discuss options including isolation or diversion; install goal posts and physical barriers to define the safe zone; use a banks person; and restrict boom operation with a rated capacity limiter",
    "Only operate the crane at night when the power lines are less active",
    "Wrap the boom in rubber insulation"
  ],
  correctAnswer: 1,
  explanation: "GS6 requires early consultation with the distribution network operator (DNO) to explore isolation, diversion, or the use of insulated shrouds. Physical barriers (goal posts) must define the no-go zone at ground level. A designated banksman must monitor clearances, and the crane's rated capacity limiter should be set to prevent the boom entering the danger zone.",
  section: "Module 4",
  difficulty: "advanced",
  topic: "Overhead Power Lines",
  category: "Safe Systems of Work"
},
{
  id: 156,
  question: "On a remote rural site with no mobile phone signal, how should the rescue plan for harness users be adapted?",
  options: [
    "No adaptation is needed; 999 will always get through eventually",
    "The plan must rely entirely on self-rescue and on-site assisted rescue by trained personnel with rescue equipment, a satellite communication device should be provided, and the nearest emergency services response time must be factored into planning",
    "Simply provide a first aid kit and hope for the best",
    "Move the work to a different location with mobile signal"
  ],
  correctAnswer: 1,
  explanation: "Where emergency services response cannot be guaranteed within 15 minutes, the rescue plan must prioritise on-site capability: trained rescuers with descent/raise equipment, self-rescue features on harnesses, and alternative communication (satellite phone or radio). Rescue drills become even more critical to validate the plan's effectiveness.",
  section: "Module 4",
  difficulty: "advanced",
  topic: "Rescue Plans",
  category: "Safe Systems of Work"
},
{
  id: 157,
  question: "A method statement for a work-at-height task identifies that two different subcontractors will be working on the same scaffold at overlapping times. What specific planning control addresses this interface risk?",
  options: [
    "No additional controls are needed; scaffolds are designed for multiple users",
    "A coordination procedure that defines time-zoning or space-zoning, communication protocols between subcontractors, a single point of coordination responsibility, and a review of combined loading on the scaffold",
    "Each subcontractor writes their own method statement independently with no cross-reference",
    "The scaffold is simply made wider to accommodate both teams"
  ],
  correctAnswer: 1,
  explanation: "Interface risks between concurrent trades on the same scaffold require formal coordination: time-zoning (sequential access) or space-zoning (separate areas), clear communication protocols, a named coordinator responsible for managing the interface, and an engineering check that the scaffold design can support the combined loads and activities.",
  section: "Module 4",
  difficulty: "advanced",
  topic: "Method Statements",
  category: "Safe Systems of Work"
},
{
  id: 158,
  question: "Under what circumstances might work at height be permitted to continue in wind speeds above Force 5 (17 mph)?",
  options: [
    "Never; it is illegal to work at height above Force 5",
    "Where a specific risk assessment demonstrates that the particular task, equipment, and location are suitable for the actual conditions — for example, an enclosed MEWP in a sheltered courtyard",
    "Whenever the client pressures the contractor to meet a deadline",
    "Only if workers are paid a weather bonus"
  ],
  correctAnswer: 1,
  explanation: "The 17 mph/Force 5 guideline is not an absolute legal limit but a widely accepted benchmark. A task-specific risk assessment may permit continued work in certain sheltered locations, with enclosed equipment, or for specific activities not significantly affected by wind. The assessment must be documented and reviewed as conditions change.",
  section: "Module 4",
  difficulty: "advanced",
  topic: "Weather Limits",
  category: "Safe Systems of Work"
},
{
  id: 159,
  question: "A worker performing self-rescue after a fall uses a trauma strap (suspension relief strap). What is the purpose of this device?",
  options: [
    "It replaces the need for a rescue plan",
    "It provides a loop for the feet to stand in, allowing the worker to periodically straighten their legs and restore blood circulation while awaiting rescue",
    "It is a replacement for the energy absorber in the lanyard",
    "It automatically lowers the worker to the ground"
  ],
  correctAnswer: 1,
  explanation: "A trauma strap is a simple deployable loop that attaches to the harness and allows the suspended worker to stand in it, periodically straightening and tensing their legs. This pumping action helps maintain blood circulation and significantly delays the onset of suspension trauma while the worker awaits rescue.",
  section: "Module 4",
  difficulty: "advanced",
  topic: "Suspension Trauma",
  category: "Safe Systems of Work"
},
{
  id: 160,
  question: "When conducting a dynamic risk assessment during work at height, a supervisor notices that forecast conditions have changed and thunderstorms are now expected within 2 hours. Applying the 30/30 rule and good practice, what actions should be taken?",
  options: [
    "Continue working until the storm actually arrives",
    "Monitor the sky and only stop when lightning is visible",
    "Plan to have all workers safely descended and equipment secured well before the storm arrives; cease work at height immediately if the 30/30 rule triggers; do not resume until 30 minutes after the last thunder or lightning",
    "Move work to a lower level but continue at height"
  ],
  correctAnswer: 2,
  explanation: "Good practice requires proactive action: begin planned descent and equipment securing in advance of the storm. If the 30/30 rule triggers (lightning-to-thunder gap of 30 seconds or less), all work at height must stop immediately and workers must shelter. Work must not resume until at least 30 minutes after the last observed lightning or thunder.",
  section: "Module 4",
  difficulty: "advanced",
  topic: "Weather Limits",
  category: "Safe Systems of Work"
},

// =======================================================================
// INCIDENT RESPONSE & RESPONSIBILITIES — 40 questions (id 161–200), Module 5
// =======================================================================

// --- basic (14) ---
{
  id: 161,
  question: "What does the acronym RIDDOR stand for?",
  options: [
    "Reporting of Injuries, Diseases and Dangerous Occurrences Regulations",
    "Regulation of Industrial Damage, Defects and Operational Risks",
    "Recording of Incidents, Disruptions and Daily Operational Reports",
    "Review of Inspections, Duties and Design Operational Requirements"
  ],
  correctAnswer: 0,
  explanation: "RIDDOR stands for the Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013. These regulations require employers, the self-employed, and people in control of work premises to report certain serious workplace accidents, occupational diseases, and specified dangerous occurrences to the HSE.",
  section: "Module 5",
  difficulty: "basic",
  topic: "RIDDOR 2013",
  category: "Incident Response & Responsibilities"
},
{
  id: 162,
  question: "Under RIDDOR 2013, a fatal workplace accident must be reported to the HSE within what time frame?",
  options: [
    "Within 7 days",
    "Within 24 hours",
    "Without delay — by the quickest practicable means (usually telephone)",
    "Within 14 days"
  ],
  correctAnswer: 2,
  explanation: "Fatal accidents and specified injuries must be reported to the HSE without delay by the quickest practicable means, which is usually by telephone to the HSE's Incident Contact Centre. A written report must then follow within 10 days using the online reporting system.",
  section: "Module 5",
  difficulty: "basic",
  topic: "RIDDOR 2013",
  category: "Incident Response & Responsibilities"
},
{
  id: 163,
  question: "Who is responsible for reporting a RIDDOR-reportable incident to the HSE?",
  options: [
    "The injured worker themselves",
    "The responsible person — usually the employer, self-employed person, or person in control of the premises",
    "A family member of the injured worker",
    "The trade union representative"
  ],
  correctAnswer: 1,
  explanation: "The duty to report under RIDDOR falls on the 'responsible person', which is typically the employer, a self-employed person, or the person in control of the premises where the work is being carried out. Individual workers are not responsible for making RIDDOR reports.",
  section: "Module 5",
  difficulty: "basic",
  topic: "Who Reports",
  category: "Incident Response & Responsibilities"
},
{
  id: 164,
  question: "Which of the following is classified as a 'specified injury' under RIDDOR 2013?",
  options: [
    "A minor bruise on the arm",
    "A fracture (other than to fingers, thumbs, or toes)",
    "A paper cut requiring a plaster",
    "A headache caused by noise"
  ],
  correctAnswer: 1,
  explanation: "Specified injuries under RIDDOR 2013 include fractures (other than to fingers, thumbs, or toes), amputations, crush injuries leading to internal organ damage, serious burns, scalping, loss of consciousness, and any injury requiring immediate hospital treatment. These must be reported without delay.",
  section: "Module 5",
  difficulty: "basic",
  topic: "RIDDOR 2013",
  category: "Incident Response & Responsibilities"
},
{
  id: 165,
  question: "Under RIDDOR 2013, if a worker is incapacitated for more than how many consecutive days (not counting the day of the accident), must the incident be reported?",
  options: [
    "3 days",
    "5 days",
    "7 days",
    "14 days"
  ],
  correctAnswer: 2,
  explanation: "Under RIDDOR 2013, an over-7-day incapacitation must be reported. This applies where a worker is incapacitated for more than 7 consecutive days (not counting the day of the accident) and unable to perform their normal duties. The report must be made within 15 days of the accident.",
  section: "Module 5",
  difficulty: "basic",
  topic: "RIDDOR 2013",
  category: "Incident Response & Responsibilities"
},
{
  id: 166,
  question: "After a fall from height, what is the first priority when attending to the casualty?",
  options: [
    "Move them to a comfortable position immediately",
    "Assess the scene for danger, then check their airway, breathing, and circulation (ABC) without moving them unnecessarily due to potential spinal injury",
    "Give them water to drink",
    "Ask them to stand up and walk to check for broken bones"
  ],
  correctAnswer: 1,
  explanation: "After a fall from height, the casualty may have sustained spinal injuries. The first priority is to ensure the scene is safe, then assess using the ABC approach (Airway, Breathing, Circulation) without moving the casualty unnecessarily. Spinal immobilisation should be maintained until professional medical help arrives.",
  section: "Module 5",
  difficulty: "basic",
  topic: "First Aid for Falls",
  category: "Incident Response & Responsibilities"
},
{
  id: 167,
  question: "What is a 'near miss' in the context of work at height?",
  options: [
    "An incident where someone was nearly hit by a falling object or nearly fell, but no injury occurred",
    "A missed appointment with the site safety officer",
    "A measurement error during scaffold erection",
    "A near-perfect score on a safety assessment"
  ],
  correctAnswer: 0,
  explanation: "A near miss is an unplanned event that had the potential to cause injury or damage but did not actually result in harm on this occasion. Reporting and investigating near misses is crucial because they reveal weaknesses in controls that, if left unaddressed, could lead to a serious accident.",
  section: "Module 5",
  difficulty: "basic",
  topic: "Near-Miss Culture",
  category: "Incident Response & Responsibilities"
},
{
  id: 168,
  question: "Under the Health and Safety at Work etc. Act 1974, what is the primary duty of an employee?",
  options: [
    "To write risk assessments for their employer",
    "To take reasonable care of their own health and safety and that of others who may be affected by their acts or omissions",
    "To inspect all safety equipment on site",
    "To report directly to the HSE about any concerns"
  ],
  correctAnswer: 1,
  explanation: "Section 7 of the HSWA 1974 places a duty on every employee to take reasonable care for the health and safety of themselves and others who may be affected by what they do or fail to do at work. They must also cooperate with their employer on health and safety matters.",
  section: "Module 5",
  difficulty: "basic",
  topic: "Employer/Employee Duties",
  category: "Incident Response & Responsibilities"
},
{
  id: 169,
  question: "What is the purpose of a pre-use inspection of work-at-height equipment?",
  options: [
    "To confirm the equipment colour matches the site branding",
    "To check that the equipment is in safe working condition before each use, identifying any damage, wear, or defects",
    "To verify the equipment was manufactured in the UK",
    "Pre-use inspections are only required for new equipment"
  ],
  correctAnswer: 1,
  explanation: "A pre-use inspection is a visual and functional check carried out by the user before each use to identify any obvious damage, wear, contamination, or defects that could compromise safety. It is a legal requirement under the Work at Height Regulations and is the first line of defence against equipment failure.",
  section: "Module 5",
  difficulty: "basic",
  topic: "Inspection Regimes",
  category: "Incident Response & Responsibilities"
},
{
  id: 170,
  question: "How often must a scaffold be inspected after initial erection and before first use, according to the Work at Height Regulations?",
  options: [
    "Every 24 hours",
    "Before first use and then at intervals not exceeding 7 days",
    "Only once a month",
    "Only after a storm or strong wind event"
  ],
  correctAnswer: 1,
  explanation: "The Work at Height Regulations 2005 (Schedule 7) require that scaffolding be inspected by a competent person before first use, and thereafter at intervals not exceeding 7 days. Additional inspections are required after any event likely to have affected its stability, such as severe weather.",
  section: "Module 5",
  difficulty: "basic",
  topic: "Inspection Regimes",
  category: "Incident Response & Responsibilities"
},
{
  id: 171,
  question: "What is the purpose of reporting near misses on a construction site?",
  options: [
    "To blame individual workers for their mistakes",
    "To identify hazards and weaknesses in controls before a serious injury occurs, promoting a proactive safety culture",
    "To create additional paperwork for the site office",
    "Near-miss reporting serves no useful safety purpose"
  ],
  correctAnswer: 1,
  explanation: "Near-miss reporting is a proactive safety measure that helps identify hazards and control failures before they result in injury. A healthy near-miss reporting culture indicates an engaged workforce and provides valuable data for risk assessment reviews and continuous improvement of safe systems of work.",
  section: "Module 5",
  difficulty: "basic",
  topic: "Near-Miss Culture",
  category: "Incident Response & Responsibilities"
},
{
  id: 172,
  question: "Under CDM 2015, who has the duty to plan, manage, and monitor the construction phase to ensure work is carried out safely?",
  options: [
    "The client's accountant",
    "The principal contractor",
    "The building's future tenants",
    "The local council planning department"
  ],
  correctAnswer: 1,
  explanation: "Under the Construction (Design and Management) Regulations 2015, the principal contractor has the duty to plan, manage, and monitor the construction phase to ensure the health and safety of all workers on site. On projects with only one contractor, that contractor takes on the principal contractor duties.",
  section: "Module 5",
  difficulty: "basic",
  topic: "CDM 2015",
  category: "Incident Response & Responsibilities"
},
{
  id: 173,
  question: "Which of the following falls under a 'dangerous occurrence' reportable under RIDDOR 2013?",
  options: [
    "A worker getting a splinter from a wooden scaffold board",
    "The collapse or partial collapse of a scaffold over 5 metres in height",
    "A worker forgetting to wear their hard hat for a few minutes",
    "A minor tool being dropped from a scaffold that causes no injury"
  ],
  correctAnswer: 1,
  explanation: "The collapse or partial collapse of a scaffold over 5 metres in height is a specified dangerous occurrence under RIDDOR 2013 Schedule 2. Dangerous occurrences are events that may not result in injury but have the potential to cause significant harm and must be reported to the HSE.",
  section: "Module 5",
  difficulty: "basic",
  topic: "RIDDOR 2013",
  category: "Incident Response & Responsibilities"
},
{
  id: 174,
  question: "What is root cause analysis used for after a work-at-height incident?",
  options: [
    "To determine which worker should be dismissed",
    "To identify the underlying fundamental causes of the incident so that effective corrective actions can prevent recurrence",
    "To calculate the financial cost of the incident",
    "To prepare a press release for the media"
  ],
  correctAnswer: 1,
  explanation: "Root cause analysis is an investigative technique used to look beyond the immediate causes of an incident and identify the underlying systemic failures — such as inadequate training, poor procedures, or management failings — so that effective corrective actions can be implemented to prevent similar incidents recurring.",
  section: "Module 5",
  difficulty: "basic",
  topic: "Root Cause Analysis",
  category: "Incident Response & Responsibilities"
},

// --- intermediate (18) ---
{
  id: 175,
  question: "The '5 Whys' technique is a root cause analysis method. How does it work?",
  options: [
    "Five different managers each ask one question about the incident",
    "The investigator repeatedly asks 'why?' (typically five times) to drill down from the immediate cause to the underlying root cause",
    "Five witnesses are each asked the same question",
    "The incident is reviewed five days after it occurred"
  ],
  correctAnswer: 1,
  explanation: "The 5 Whys technique involves repeatedly asking 'why?' in response to each answer, typically about five times, to move beyond surface-level symptoms and identify the deeper root cause. For example: 'Why did the worker fall?' leads to 'Why was there no guard rail?' leads to 'Why was the scaffold incomplete?' and so on.",
  section: "Module 5",
  difficulty: "intermediate",
  topic: "Root Cause Analysis",
  category: "Incident Response & Responsibilities"
},
{
  id: 176,
  question: "Under RIDDOR 2013, an over-7-day incapacitation must be reported within what time frame?",
  options: [
    "Without delay by telephone",
    "Within 10 days of the accident",
    "Within 15 days of the accident",
    "Within 30 days of the accident"
  ],
  correctAnswer: 2,
  explanation: "For over-7-day incapacitation injuries, the report must be made within 15 days of the accident. This contrasts with fatal and specified injuries which must be reported without delay. The report is made online via the HSE's incident reporting system at www.hse.gov.uk/riddor.",
  section: "Module 5",
  difficulty: "intermediate",
  topic: "Time Limits",
  category: "Incident Response & Responsibilities"
},
{
  id: 177,
  question: "Following a fatal fall from height on a construction site, which of the following actions should be taken immediately?",
  options: [
    "Clear the area and resume work as quickly as possible",
    "Secure the scene to preserve evidence, contact emergency services, report to the HSE without delay, and do not disturb the scene unless necessary to save life",
    "Remove all equipment from the area to prevent theft",
    "Contact the company's marketing team to manage publicity"
  ],
  correctAnswer: 1,
  explanation: "After a fatal incident, the scene must be secured and preserved for investigation by the HSE and police. Emergency services must be contacted immediately. The HSE must be notified without delay by telephone. Nothing should be moved or disturbed unless absolutely necessary to rescue injured persons or prevent further danger.",
  section: "Module 5",
  difficulty: "intermediate",
  topic: "Investigation Process",
  category: "Incident Response & Responsibilities"
},
{
  id: 178,
  question: "What is 'suspension trauma' also known as, and what is its medical mechanism?",
  options: [
    "Vertigo; caused by fear of heights affecting the inner ear",
    "Harness hang syndrome or orthostatic intolerance; caused by venous pooling in the legs due to immobility in a vertical position, reducing cardiac output",
    "Hypothermia; caused by wind chill at height",
    "Claustrophobia; caused by the tightness of the harness straps"
  ],
  correctAnswer: 1,
  explanation: "Suspension trauma is also called harness hang syndrome or orthostatic intolerance. The medical mechanism involves blood pooling in the lower extremities due to the immobile upright position and harness leg strap compression. This reduces venous return to the heart, lowering cardiac output and leading to loss of consciousness, renal failure, and potentially death.",
  section: "Module 5",
  difficulty: "intermediate",
  topic: "Suspension Trauma Timeline",
  category: "Incident Response & Responsibilities"
},
{
  id: 179,
  question: "After rescuing a casualty who has been suspended in a harness for approximately 25 minutes, why should they NOT be laid flat on their back immediately?",
  options: [
    "They might fall asleep",
    "A sudden rush of pooled, toxin-laden blood from the legs back to the heart and kidneys can cause reflow syndrome, potentially resulting in cardiac arrest or acute renal failure",
    "Lying flat causes bruising on the back",
    "Flat positioning is only uncomfortable, not dangerous"
  ],
  correctAnswer: 1,
  explanation: "After prolonged suspension, the blood pooled in the legs becomes deoxygenated and accumulates metabolic waste products. If the casualty is laid flat, this blood rushes back to the heart and kidneys simultaneously, which can trigger cardiac arrest (reflow syndrome) or acute renal failure. The W-position allows gradual, controlled redistribution.",
  section: "Module 5",
  difficulty: "intermediate",
  topic: "Suspension Trauma Timeline",
  category: "Incident Response & Responsibilities"
},
{
  id: 180,
  question: "Under CDM 2015, what are the client's duties in relation to work at height on their project?",
  options: [
    "The client has no duties; everything falls to the contractor",
    "The client must make suitable arrangements for managing the project, ensure sufficient time and resources are allocated, and appoint competent duty holders",
    "The client must personally supervise all work at height",
    "The client's only duty is to pay the invoices"
  ],
  correctAnswer: 1,
  explanation: "Under CDM 2015, the client has significant duties including: making suitable arrangements for managing the project safely, ensuring sufficient time and resources, providing pre-construction information, appointing a principal designer and principal contractor (on projects with more than one contractor), and ensuring a construction phase plan is in place.",
  section: "Module 5",
  difficulty: "intermediate",
  topic: "CDM 2015",
  category: "Incident Response & Responsibilities"
},
{
  id: 181,
  question: "What is the minimum legal retention period for RIDDOR records of workplace injuries and dangerous occurrences?",
  options: [
    "1 year",
    "3 years",
    "At least 3 years from the date of the entry",
    "10 years"
  ],
  correctAnswer: 2,
  explanation: "Under RIDDOR 2013, employers must keep records of all reportable injuries, diseases, and dangerous occurrences for at least 3 years from the date of the entry. However, many organisations retain records for longer periods (often 6 years or more) in case of civil claims.",
  section: "Module 5",
  difficulty: "intermediate",
  topic: "Legal Retention Periods",
  category: "Incident Response & Responsibilities"
},
{
  id: 182,
  question: "A contractor working on a client's site has a worker who suffers a specified injury from a fall. Who has the duty to report this under RIDDOR?",
  options: [
    "The client who owns the building",
    "The contractor who employs the injured worker",
    "The local authority building control department",
    "The injured worker's next of kin"
  ],
  correctAnswer: 1,
  explanation: "The employer of the injured person — in this case the contractor — has the duty to report the incident under RIDDOR. If the injured person is self-employed, the person in control of the premises where the work was being done has the reporting duty. The client is not the responsible person unless they directly employ the worker.",
  section: "Module 5",
  difficulty: "intermediate",
  topic: "Who Reports",
  category: "Incident Response & Responsibilities"
},
{
  id: 183,
  question: "What certification or training should a person have before using a harness as part of a personal fall protection system?",
  options: [
    "No formal training is required; the instruction manual is sufficient",
    "Formal harness user training covering correct fitting, adjustment, pre-use inspection, connection to anchor points, emergency procedures, and the limitations of the system",
    "Only a one-hour online awareness module",
    "A full scaffolding qualification"
  ],
  correctAnswer: 1,
  explanation: "Any person using a harness must receive formal training that covers correct donning and adjustment, pre-use inspection procedures, selection of suitable anchor points, connection techniques, emergency and rescue procedures, and an understanding of the system's limitations. Competence must be verified before unsupervised use.",
  section: "Module 5",
  difficulty: "intermediate",
  topic: "Harness Training",
  category: "Incident Response & Responsibilities"
},
{
  id: 184,
  question: "IPAF training is specifically required for the operation of which type of work-at-height equipment?",
  options: [
    "Stepladders",
    "Mobile elevating work platforms (MEWPs)",
    "Scaffold towers",
    "Rope access systems"
  ],
  correctAnswer: 1,
  explanation: "IPAF (International Powered Access Federation) provides the industry-standard operator training and certification for mobile elevating work platforms (MEWPs), including scissor lifts and boom lifts. IPAF Powered Access Licences (PAL cards) are the recognised proof of competence for MEWP operation across the UK and internationally.",
  section: "Module 5",
  difficulty: "intermediate",
  topic: "IPAF Training",
  category: "Incident Response & Responsibilities"
},
{
  id: 185,
  question: "PASMA training is the recognised industry standard for which type of work-at-height equipment?",
  options: [
    "Harnesses and lanyards",
    "Mobile scaffold towers (prefabricated aluminium towers)",
    "Fixed scaffolding",
    "Rope access equipment"
  ],
  correctAnswer: 1,
  explanation: "PASMA (Prefabricated Access Suppliers' and Manufacturers' Association) provides the industry-standard training for the assembly, use, and dismantling of mobile scaffold towers. A PASMA Towers for Users card is the recognised proof of competence and is widely required across the construction industry.",
  section: "Module 5",
  difficulty: "intermediate",
  topic: "PASMA Training",
  category: "Incident Response & Responsibilities"
},
{
  id: 186,
  question: "What information should be recorded following a scaffold inspection?",
  options: [
    "Only the name of the inspector and the date",
    "The name and position of the inspector, date and time, location, the scaffold's condition, any defects found, actions required, and a statement that it is or is not safe for use",
    "Only the scaffold tag colour",
    "Just a photograph of the scaffold"
  ],
  correctAnswer: 1,
  explanation: "Schedule 7 of the Work at Height Regulations requires scaffold inspection reports to include: the inspector's name and qualifications, date and time of inspection, scaffold location and description, condition assessment, any faults or matters identified, actions required, and a clear statement regarding fitness for use. Records must be kept on site.",
  section: "Module 5",
  difficulty: "intermediate",
  topic: "Record Keeping",
  category: "Incident Response & Responsibilities"
},
{
  id: 187,
  question: "An employer's duty under Section 2 of the HSWA 1974 includes providing which of the following for work at height?",
  options: [
    "Free lunches for all workers",
    "Safe plant and systems of work, information, instruction, training, and supervision so far as is reasonably practicable",
    "A private car parking space for each worker",
    "The right to refuse all work at height regardless of circumstances"
  ],
  correctAnswer: 1,
  explanation: "Section 2 of the HSWA 1974 requires employers to provide, so far as is reasonably practicable: safe plant and systems of work, safe arrangements for the use, handling, storage, and transport of substances, adequate information, instruction, training, and supervision, and a safe place of work with safe access and egress.",
  section: "Module 5",
  difficulty: "intermediate",
  topic: "Employer/Employee Duties",
  category: "Incident Response & Responsibilities"
},
{
  id: 188,
  question: "How should scaffold inspection records be managed on a busy construction site with multiple scaffold structures?",
  options: [
    "One generic record covers all scaffolds on site",
    "Each scaffold structure should have its own individual inspection record, be uniquely identified, and records should be kept on site and available for review by any person working on or responsible for the scaffold",
    "Records only need to be kept at the company head office",
    "Digital records are not acceptable; only paper records are valid"
  ],
  correctAnswer: 1,
  explanation: "Each scaffold must be uniquely identified (numbered, named, or tagged) and have its own individual inspection record. Records must be available on site for workers, supervisors, and enforcement officers. Both paper and digital records are acceptable provided they are accessible when needed and retained as required.",
  section: "Module 5",
  difficulty: "intermediate",
  topic: "Record Keeping",
  category: "Incident Response & Responsibilities"
},
{
  id: 189,
  question: "A subcontractor's worker on a construction site refuses to use the provided harness because they say it is uncomfortable. What is the correct course of action?",
  options: [
    "Allow them to work without the harness since they are a subcontractor",
    "Investigate the complaint — check harness fit and size, provide training if needed, and ensure no worker is permitted to work at height without the required PPE; escalate to the subcontractor's management if necessary",
    "Dismiss the worker immediately without further discussion",
    "Let them borrow a different worker's harness without checking the fit"
  ],
  correctAnswer: 1,
  explanation: "The complaint should be taken seriously: an ill-fitting harness can reduce protection and cause discomfort that discourages use. The harness fit and size should be checked, and an alternative offered if needed. The worker must understand the legal requirement, and if they continue to refuse, the matter should be escalated to their employer. No one should work at height without required PPE.",
  section: "Module 5",
  difficulty: "intermediate",
  topic: "Contractor Duties",
  category: "Incident Response & Responsibilities"
},
{
  id: 190,
  question: "What is the purpose of the W-position (or semi-sitting position with knees raised) after rescuing a suspension trauma casualty?",
  options: [
    "It is more comfortable for the casualty to wait in",
    "It slows the return of pooled venous blood to the heart, reducing the risk of reflow syndrome and cardiac arrest",
    "It makes it easier for the ambulance crew to lift them onto a stretcher",
    "It prevents bruising on the casualty's back"
  ],
  correctAnswer: 1,
  explanation: "The W-position (seated with knees raised above the hips, or squatting position) slows the return of pooled, deoxygenated blood from the lower limbs back to the heart. This controlled redistribution reduces the risk of reflow syndrome — a potentially fatal surge of toxic blood that can cause cardiac arrest or acute kidney failure.",
  section: "Module 5",
  difficulty: "intermediate",
  topic: "Suspension Trauma Timeline",
  category: "Incident Response & Responsibilities"
},
{
  id: 191,
  question: "Under RIDDOR 2013, which of the following scenarios involving work at height would be classified as a 'dangerous occurrence' even if nobody was injured?",
  options: [
    "A worker drops a small hand tool from a scaffold",
    "An uncontrolled release or escape of a substance that could cause injury (e.g., a counterweight falling from a crane being used for work at height)",
    "A worker gets a minor graze from a scaffold fitting",
    "A delivery vehicle arrives late to site"
  ],
  correctAnswer: 1,
  explanation: "Dangerous occurrences under RIDDOR Schedule 2 include events such as the collapse of lifting equipment, the uncontrolled release of substances, scaffold collapses over 5 metres, and contact with overhead power lines. These are reportable even when no injury results because they indicate a high potential for serious harm.",
  section: "Module 5",
  difficulty: "intermediate",
  topic: "RIDDOR 2013",
  category: "Incident Response & Responsibilities"
},
{
  id: 192,
  question: "What is the legal retention period for records of LOLER thorough examinations?",
  options: [
    "1 year",
    "Until the equipment is next examined",
    "Until the next thorough examination for equipment not used for lifting persons, or 2 years for equipment used for lifting persons",
    "5 years"
  ],
  correctAnswer: 2,
  explanation: "Under LOLER 1998, records of thorough examinations must be kept until the next thorough examination for general lifting equipment. For equipment used to lift persons (including harnesses used for fall arrest), records must be kept for at least 2 years from the date of the examination.",
  section: "Module 5",
  difficulty: "intermediate",
  topic: "Legal Retention Periods",
  category: "Incident Response & Responsibilities"
},

// --- advanced (8) ---
{
  id: 193,
  question: "A worker falls from a scaffold and is found unconscious with a suspected spinal injury. A first aider arrives on scene. Following the ABC protocol, the casualty has no obstructed airway but is not breathing. What is the correct action regarding spinal precautions?",
  options: [
    "Do not touch the casualty at all until the ambulance arrives",
    "The immediate priority is to open the airway using a jaw thrust (rather than head tilt) to minimise spinal movement, and commence CPR if no breathing is detected — the need to resuscitate overrides the spinal precaution to avoid movement",
    "Roll the casualty onto their front to clear any obstruction",
    "Place the casualty in the recovery position immediately"
  ],
  correctAnswer: 1,
  explanation: "When a casualty with a suspected spinal injury is not breathing, the life-threatening emergency of respiratory arrest takes priority. The jaw thrust manoeuvre opens the airway with minimal cervical spine movement. If there is still no breathing, CPR must commence. Preserving life overrides the spinal immobilisation precaution, though movements should be minimised throughout.",
  section: "Module 5",
  difficulty: "advanced",
  topic: "First Aid for Falls",
  category: "Incident Response & Responsibilities"
},
{
  id: 194,
  question: "Following a serious work-at-height incident, a root cause analysis using the '5 Whys' reveals that the immediate cause was a missing guard rail, but the root cause was a failure in the management system for scaffold handover inspections. What type of corrective action best addresses the root cause?",
  options: [
    "Replacing the missing guard rail and resuming work",
    "Disciplining the worker who used the scaffold",
    "Revising the scaffold handover procedure, retraining all competent persons on the inspection protocol, implementing a verification system, and auditing compliance at defined intervals",
    "Adding a warning sign to the scaffold"
  ],
  correctAnswer: 2,
  explanation: "Addressing the root cause requires systemic changes: revising the handover procedure to close the identified gap, retraining inspection personnel, implementing verification checks (such as a second-person sign-off), and auditing compliance regularly. Simply replacing the guard rail (immediate cause) without addressing the management system failure would leave the organisation vulnerable to recurrence.",
  section: "Module 5",
  difficulty: "advanced",
  topic: "Root Cause Analysis",
  category: "Incident Response & Responsibilities"
},
{
  id: 195,
  question: "Under CDM 2015, a principal designer identifies during the design phase that a proposed building feature will require ongoing work at height for maintenance throughout the building's life. What is the principal designer's duty?",
  options: [
    "No duty; maintenance is the building owner's future problem",
    "Design out or reduce the need for work at height where reasonably practicable, and where it cannot be eliminated, provide information about remaining risks in the health and safety file for future duty holders",
    "Simply add a note to the drawings saying 'work at height required'",
    "Specify only the cheapest access equipment for future use"
  ],
  correctAnswer: 1,
  explanation: "CDM 2015 Regulation 9 requires the principal designer to eliminate or reduce risks from the design itself, including foreseeable maintenance activities. If work at height cannot be designed out (e.g., by providing permanent access platforms or fall protection anchors), the residual risks and recommended control measures must be recorded in the health and safety file for future maintainers.",
  section: "Module 5",
  difficulty: "advanced",
  topic: "CDM 2015",
  category: "Incident Response & Responsibilities"
},
{
  id: 196,
  question: "An incident investigation reveals that a contractor's operatives were not trained in harness use but were directed by their supervisor to work at height using harnesses. Which parties may face enforcement action, and under what legislation?",
  options: [
    "Only the operatives; they should have refused the task",
    "The contractor (employer) for failing to provide adequate training under HSWA s.2 and WAH Regs; the supervisor for directing untrained persons; and potentially the principal contractor for failing to monitor under CDM 2015",
    "Only the equipment manufacturer for not providing clear instructions",
    "No party can face enforcement because the operatives were not injured"
  ],
  correctAnswer: 1,
  explanation: "Multiple duty holders may face enforcement: the contractor/employer for failing to ensure competence and provide training (HSWA s.2, WAH Regs Schedule 5); the supervisor for directing untrained workers to perform a high-risk task; and the principal contractor for failing in their CDM 2015 duty to plan, manage, and monitor subcontractor compliance. Enforcement is not dependent on injury occurring.",
  section: "Module 5",
  difficulty: "advanced",
  topic: "Employer/Employee Duties",
  category: "Incident Response & Responsibilities"
},
{
  id: 197,
  question: "A construction company wants to implement a positive near-miss reporting culture. Which of the following strategies is most likely to be effective?",
  options: [
    "Disciplining workers who report near misses to discourage carelessness",
    "Implementing a no-blame reporting system with visible management commitment, feedback on actions taken, recognition for reporting, and integration of near-miss data into risk assessment reviews",
    "Only allowing supervisors to submit near-miss reports",
    "Waiting until there is a real accident before reviewing safety procedures"
  ],
  correctAnswer: 1,
  explanation: "An effective near-miss culture requires a no-blame approach so workers feel safe to report without fear of punishment. Management must visibly support the system, provide timely feedback on what actions have been taken, recognise reporters, and use the data to improve risk assessments and safe systems of work. Punitive approaches suppress reporting and hide valuable safety intelligence.",
  section: "Module 5",
  difficulty: "advanced",
  topic: "Near-Miss Culture",
  category: "Incident Response & Responsibilities"
},
{
  id: 198,
  question: "A competent person conducting a 7-day scaffold inspection discovers that unauthorised modifications have been made since the last inspection. What is the correct procedure?",
  options: [
    "Approve the modifications if they appear to be structurally adequate",
    "Immediately prohibit use of the scaffold, tag it as unsafe, investigate who made the modifications and why, have the scaffold redesigned or returned to its approved configuration by a competent scaffolder, and re-inspect before permitting reuse",
    "Note the modifications in the report but allow continued use",
    "Ask the workers to remove the modifications themselves"
  ],
  correctAnswer: 1,
  explanation: "Unauthorised modifications compromise the scaffold's structural integrity and compliance with the design. The scaffold must be immediately taken out of service and tagged as unsafe. An investigation should identify the cause (which may reveal systemic issues like poor site control). A competent scaffolder must then either restore the approved design or obtain a new design for the modified configuration, followed by a fresh inspection.",
  section: "Module 5",
  difficulty: "advanced",
  topic: "Inspection Regimes",
  category: "Incident Response & Responsibilities"
},
{
  id: 199,
  question: "What are the legal consequences for an employer found guilty of breaching the Health and Safety at Work etc. Act 1974 resulting in a fatal fall from height?",
  options: [
    "A maximum fine of £1,000",
    "Unlimited fine and/or up to 2 years imprisonment for individuals; unlimited fines for organisations under the sentencing guidelines, plus potential corporate manslaughter charges under the Corporate Manslaughter and Corporate Homicide Act 2007",
    "Only a verbal warning from the HSE",
    "A fixed penalty notice of £500"
  ],
  correctAnswer: 1,
  explanation: "Breaches of the HSWA 1974 resulting in death carry severe penalties: unlimited fines for organisations (with sentencing guidelines based on turnover, culpability, and harm), and for individuals, unlimited fines and up to 2 years' imprisonment. Additionally, the Corporate Manslaughter and Corporate Homicide Act 2007 can apply where a gross management failure causes death.",
  section: "Module 5",
  difficulty: "advanced",
  topic: "Employer/Employee Duties",
  category: "Incident Response & Responsibilities"
},
{
  id: 200,
  question: "Following a RIDDOR-reportable fall from height, the HSE inspector issues an Improvement Notice. What does this mean and what must the duty holder do?",
  options: [
    "The site must close permanently",
    "The duty holder has a specified period to remedy the contravention identified; failure to comply is a criminal offence, and the duty holder has the right to appeal to an employment tribunal within 21 days",
    "The notice is advisory only and carries no legal weight",
    "The company must pay an immediate fine to the HSE"
  ],
  correctAnswer: 1,
  explanation: "An Improvement Notice requires the duty holder to remedy the specified contravention within a stated time period (at least 21 days). It is a formal enforcement action, and failure to comply is a criminal offence. The duty holder has the right to appeal to an employment tribunal within 21 days of the notice being served, during which time the notice is suspended pending the tribunal's decision.",
  section: "Module 5",
  difficulty: "advanced",
  topic: "Investigation Process",
  category: "Incident Response & Responsibilities"
},
];
