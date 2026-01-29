// HNC Building Services Engineering - Question Bank Part 1
// Questions 1-125 covering Health & Safety and Building Services Science
// HNC Level content - higher technical complexity than Level 2/3

export interface HNCQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  section: string;
  difficulty: 'basic' | 'intermediate' | 'advanced';
  topic: string;
  category: 'Health & Safety' | 'Building Services Science';
}

export const questionsPart1: HNCQuestion[] = [
  // ============================================
  // HEALTH & SAFETY (Questions 1-62)
  // ============================================

  // HASAWA 1974 (Questions 1-12)
  {
    id: 1,
    question: "Under Section 2(2)(a) of HASAWA 1974, what specific duty does an employer have regarding plant and systems of work?",
    options: [
      "To provide plant and systems that are approved by the HSE",
      "To provide and maintain plant and systems of work that are, so far as is reasonably practicable, safe and without risks to health",
      "To ensure all plant is less than 10 years old",
      "To only use plant manufactured in the UK"
    ],
    correctAnswer: 1,
    explanation: "Section 2(2)(a) of HASAWA 1974 specifically requires employers to provide and maintain plant and systems of work that are, so far as is reasonably practicable, safe and without risks to health. This includes regular maintenance and inspection regimes.",
    section: "HASAWA",
    difficulty: "basic",
    topic: "Employer Duties",
    category: "Health & Safety"
  },
  {
    id: 2,
    question: "What is the maximum penalty for breach of HASAWA 1974 following conviction on indictment for causing death?",
    options: [
      "6 months imprisonment",
      "2 years imprisonment",
      "Unlimited fine only",
      "Unlimited fine and/or imprisonment"
    ],
    correctAnswer: 3,
    explanation: "Following the Legal Aid, Sentencing and Punishment of Offenders Act 2012, breaches of HASAWA on indictment can result in unlimited fines. For the most serious offences causing death, courts can impose both unlimited fines and imprisonment.",
    section: "HASAWA",
    difficulty: "intermediate",
    topic: "Penalties",
    category: "Health & Safety"
  },
  {
    id: 3,
    question: "Under Section 6 of HASAWA, who has duties regarding articles and substances for use at work?",
    options: [
      "Employers only",
      "Employees only",
      "Designers, manufacturers, importers, and suppliers",
      "The HSE only"
    ],
    correctAnswer: 2,
    explanation: "Section 6 of HASAWA places duties on designers, manufacturers, importers, and suppliers to ensure that articles and substances for use at work are safe and without risks to health when properly used.",
    section: "HASAWA",
    difficulty: "basic",
    topic: "Supply Chain Duties",
    category: "Health & Safety"
  },
  {
    id: 4,
    question: "What distinguishes an HSE Improvement Notice from a Prohibition Notice?",
    options: [
      "Improvement Notices are issued by local authorities only",
      "Prohibition Notices require immediate cessation of activity due to imminent risk of serious personal injury",
      "Improvement Notices carry higher penalties",
      "Prohibition Notices can only be issued after a fatal accident"
    ],
    correctAnswer: 1,
    explanation: "A Prohibition Notice is issued when an inspector believes there is a risk of serious personal injury and requires the activity to stop immediately or within a specified time. An Improvement Notice requires improvements within a specified period but does not require immediate cessation.",
    section: "HASAWA",
    difficulty: "intermediate",
    topic: "Enforcement",
    category: "Health & Safety"
  },
  {
    id: 5,
    question: "Under Section 37 of HASAWA, when can a director or senior manager be personally prosecuted?",
    options: [
      "For any breach of health and safety law by the company",
      "Only if they are directly involved in day-to-day operations",
      "When an offence is committed with their consent, connivance, or is attributable to their neglect",
      "Only after the company has been convicted"
    ],
    correctAnswer: 2,
    explanation: "Section 37 of HASAWA allows for the prosecution of directors and senior managers where a corporate offence is committed with their consent or connivance, or is attributable to their neglect. This establishes personal accountability for senior management.",
    section: "HASAWA",
    difficulty: "advanced",
    topic: "Corporate Liability",
    category: "Health & Safety"
  },
  {
    id: 6,
    question: "What is the legal status of an Approved Code of Practice (ACoP) under HASAWA?",
    options: [
      "It has the same legal force as the Act itself",
      "It is merely guidance with no legal standing",
      "Following it is not mandatory, but failure to comply can be used as evidence of non-compliance with the law",
      "It only applies to companies with more than 50 employees"
    ],
    correctAnswer: 2,
    explanation: "An ACoP has a special legal status. Following the ACoP is not mandatory, but if prosecuted for breach of the relevant legislation, failure to follow the ACoP can be used as evidence against you. You must show that you complied in an equally effective way.",
    section: "HASAWA",
    difficulty: "intermediate",
    topic: "Legal Framework",
    category: "Health & Safety"
  },
  {
    id: 7,
    question: "Section 2(3) of HASAWA requires employers to prepare a written safety policy when they employ how many or more employees?",
    options: [
      "1 or more",
      "3 or more",
      "5 or more",
      "10 or more"
    ],
    correctAnswer: 2,
    explanation: "Section 2(3) of HASAWA 1974 requires employers with 5 or more employees to prepare and keep up to date a written statement of their general health and safety policy and bring it to the attention of all employees.",
    section: "HASAWA",
    difficulty: "basic",
    topic: "Safety Policy",
    category: "Health & Safety"
  },
  {
    id: 8,
    question: "Under HASAWA, what constitutes 'reasonably practicable' when assessing control measures?",
    options: [
      "What is technically possible regardless of cost",
      "What is standard practice in the industry",
      "A balance between the risk and the sacrifice (money, time, trouble) needed to avert it",
      "Whatever the HSE recommends"
    ],
    correctAnswer: 2,
    explanation: "Reasonably practicable involves weighing the quantum of risk against the sacrifice (money, time, trouble) needed to avert it. If the risk is insignificant compared to the sacrifice, the measure is not reasonably practicable. The greater the risk, the less weight given to cost.",
    section: "HASAWA",
    difficulty: "intermediate",
    topic: "Risk Assessment",
    category: "Health & Safety"
  },
  {
    id: 9,
    question: "What does Section 9 of HASAWA prohibit regarding health and safety provisions?",
    options: [
      "Using unqualified contractors",
      "Charging employees for anything provided in pursuance of health and safety requirements",
      "Subcontracting health and safety responsibilities",
      "Employing workers under 18 years of age"
    ],
    correctAnswer: 1,
    explanation: "Section 9 of HASAWA prohibits employers from charging employees for anything provided in pursuance of any specific health and safety requirement. This includes PPE, training, and health surveillance required by law.",
    section: "HASAWA",
    difficulty: "basic",
    topic: "Employee Rights",
    category: "Health & Safety"
  },
  {
    id: 10,
    question: "Under the Corporate Manslaughter and Corporate Homicide Act 2007, what must be proven for a successful prosecution?",
    options: [
      "That an employee caused a death",
      "That senior management failures were a substantial element in the gross breach of duty of care",
      "That the company did not have a safety policy",
      "That the HSE had previously issued a notice to the company"
    ],
    correctAnswer: 1,
    explanation: "The Corporate Manslaughter and Corporate Homicide Act 2007 requires proof that the way the organisation's activities were managed or organised by senior management was a substantial element in the gross breach of a relevant duty of care, causing death.",
    section: "HASAWA",
    difficulty: "advanced",
    topic: "Corporate Liability",
    category: "Health & Safety"
  },
  {
    id: 11,
    question: "What is the primary purpose of the Health and Safety (Offences) Act 2008?",
    options: [
      "To create new health and safety offences",
      "To increase penalties and make more offences triable either way",
      "To reduce the burden on small businesses",
      "To replace HASAWA 1974"
    ],
    correctAnswer: 1,
    explanation: "The Health and Safety (Offences) Act 2008 increased the maximum penalties available for health and safety offences and made certain offences triable either way (in magistrates' or crown court), allowing for more severe sentences.",
    section: "HASAWA",
    difficulty: "intermediate",
    topic: "Penalties",
    category: "Health & Safety"
  },
  {
    id: 12,
    question: "Under HASAWA, what must employers do in relation to safety representatives appointed by recognised trade unions?",
    options: [
      "Pay them additional salary",
      "Consult with them in good time on health and safety matters",
      "Give them authority to stop work",
      "Provide them with personal office space"
    ],
    correctAnswer: 1,
    explanation: "Under the Safety Representatives and Safety Committees Regulations 1977 (made under HASAWA), employers must consult with trade union appointed safety representatives in good time on matters affecting the health and safety of employees they represent.",
    section: "HASAWA",
    difficulty: "intermediate",
    topic: "Consultation",
    category: "Health & Safety"
  },

  // CDM Regulations 2015 (Questions 13-24)
  {
    id: 13,
    question: "Under CDM 2015, when must a principal designer be appointed?",
    options: [
      "For all construction projects regardless of size",
      "When there is more than one contractor or the project involves particular risks",
      "Only for projects over £500,000",
      "Only for public sector projects"
    ],
    correctAnswer: 1,
    explanation: "Under CDM 2015, a principal designer must be appointed when there is more than one contractor, or when construction work involves particular risks as listed in Schedule 3. They coordinate health and safety during the pre-construction phase.",
    section: "CDM 2015",
    difficulty: "basic",
    topic: "Duty Holders",
    category: "Health & Safety"
  },
  {
    id: 14,
    question: "What is the principal contractor's primary duty under CDM 2015 Regulation 13?",
    options: [
      "To prepare the construction phase plan before work begins",
      "To plan, manage, and monitor the construction phase to ensure work is carried out without risks to health and safety",
      "To design the building",
      "To employ all workers directly"
    ],
    correctAnswer: 1,
    explanation: "Regulation 13 of CDM 2015 requires the principal contractor to plan, manage, and monitor the construction phase in a way that ensures, so far as is reasonably practicable, that construction work is carried out without risks to health and safety.",
    section: "CDM 2015",
    difficulty: "intermediate",
    topic: "Principal Contractor",
    category: "Health & Safety"
  },
  {
    id: 15,
    question: "Under CDM 2015, what must the construction phase plan contain as a minimum?",
    options: [
      "Only emergency procedures",
      "Arrangements for managing significant health and safety risks, including site rules",
      "Complete method statements for all work activities",
      "Financial budgets for safety measures"
    ],
    correctAnswer: 1,
    explanation: "The construction phase plan must include arrangements for managing significant health and safety risks, site rules, and any specific measures for work involving particular risks listed in Schedule 3 of CDM 2015.",
    section: "CDM 2015",
    difficulty: "intermediate",
    topic: "Construction Phase Plan",
    category: "Health & Safety"
  },
  {
    id: 16,
    question: "What information must be included in the health and safety file under CDM 2015?",
    options: [
      "Wage records of all workers",
      "Information likely to be needed during future construction work, including cleaning, maintenance, and demolition",
      "Original tender documents only",
      "Training records of all operatives"
    ],
    correctAnswer: 1,
    explanation: "The health and safety file must contain information about the project that is likely to be needed during any subsequent construction work, including maintenance, repair, renovation, or demolition. This includes as-built drawings, specifications, and details of hidden services.",
    section: "CDM 2015",
    difficulty: "basic",
    topic: "Health and Safety File",
    category: "Health & Safety"
  },
  {
    id: 17,
    question: "Under CDM 2015, who is the 'client' on a domestic project?",
    options: [
      "The homeowner always",
      "The contractor who runs the work",
      "The domestic client, but their duties pass to other duty holders as specified",
      "There is no client on domestic projects"
    ],
    correctAnswer: 2,
    explanation: "On domestic projects, the householder is the domestic client but is not required to carry out client duties. These duties automatically pass to other duty holders - typically the contractor, or principal contractor/principal designer if appointed.",
    section: "CDM 2015",
    difficulty: "intermediate",
    topic: "Domestic Projects",
    category: "Health & Safety"
  },
  {
    id: 18,
    question: "What triggers the requirement for a project to be notifiable under CDM 2015?",
    options: [
      "Any project involving more than one contractor",
      "Projects lasting more than 30 working days with more than 20 workers working simultaneously, or exceeding 500 person days",
      "Any project with a value over £100,000",
      "All projects involving excavations"
    ],
    correctAnswer: 1,
    explanation: "Under CDM 2015, a project is notifiable if it lasts more than 30 working days and has more than 20 workers working simultaneously at any point, OR if the project exceeds 500 person days of construction work.",
    section: "CDM 2015",
    difficulty: "basic",
    topic: "Notification",
    category: "Health & Safety"
  },
  {
    id: 19,
    question: "Under Regulation 8 of CDM 2015, what must a client do before the construction phase begins?",
    options: [
      "Obtain planning permission",
      "Ensure a construction phase plan is drawn up by the contractor or principal contractor",
      "Appoint a clerk of works",
      "Obtain insurance for the project"
    ],
    correctAnswer: 1,
    explanation: "Regulation 8 requires the client to ensure that before the construction phase begins, a construction phase plan is drawn up by the contractor (for single contractor projects) or the principal contractor (for projects with multiple contractors).",
    section: "CDM 2015",
    difficulty: "intermediate",
    topic: "Client Duties",
    category: "Health & Safety"
  },
  {
    id: 20,
    question: "What is a 'particular risk' under Schedule 3 of CDM 2015?",
    options: [
      "Any risk on a construction site",
      "Risks arising from work that involves specific hazards such as work near high voltage power lines, in cofferdams, or involving diving",
      "Risks specific to electrical work only",
      "Weather-related risks"
    ],
    correctAnswer: 1,
    explanation: "Schedule 3 lists work involving particular risks including: work near high voltage power lines; work with risks of drowning; work in wells, caissons, or cofferdams; work involving diving; work in compressed air; and work involving explosives.",
    section: "CDM 2015",
    difficulty: "intermediate",
    topic: "Particular Risks",
    category: "Health & Safety"
  },
  {
    id: 21,
    question: "Under CDM 2015, what duty does Regulation 15 place on contractors?",
    options: [
      "To employ only qualified workers",
      "To not employ or appoint a person unless satisfied they have the necessary skills, knowledge, and experience",
      "To provide accommodation for all workers",
      "To work only during daylight hours"
    ],
    correctAnswer: 1,
    explanation: "Regulation 15 requires contractors to not employ or appoint any person to work on a construction site unless they are satisfied that person has, or is in the process of obtaining, the necessary skills, knowledge, training, and experience.",
    section: "CDM 2015",
    difficulty: "basic",
    topic: "Worker Competence",
    category: "Health & Safety"
  },
  {
    id: 22,
    question: "What is the principal designer's key responsibility during the pre-construction phase?",
    options: [
      "To supervise all construction work",
      "To plan, manage, and coordinate health and safety during the pre-construction phase, including identifying and eliminating or controlling foreseeable risks",
      "To prepare all method statements",
      "To employ all subcontractors"
    ],
    correctAnswer: 1,
    explanation: "The principal designer must plan, manage, and coordinate health and safety during the pre-construction phase. This includes identifying, eliminating or controlling foreseeable risks, ensuring designers comply with their duties, and preparing and developing the health and safety file.",
    section: "CDM 2015",
    difficulty: "intermediate",
    topic: "Principal Designer",
    category: "Health & Safety"
  },
  {
    id: 23,
    question: "Under CDM 2015, what is the hierarchy of risk control that designers must apply?",
    options: [
      "PPE, training, elimination",
      "Elimination, reduction, information provision",
      "Warning signs, barriers, supervision",
      "Documentation, insurance, monitoring"
    ],
    correctAnswer: 1,
    explanation: "Designers must apply the general principles of prevention. The hierarchy is: eliminate hazards through design; where not possible, reduce risks; provide information about remaining risks. This is often summarised as eliminate, reduce, inform.",
    section: "CDM 2015",
    difficulty: "advanced",
    topic: "Design Risk Management",
    category: "Health & Safety"
  },
  {
    id: 24,
    question: "When does the duty to prepare and update the health and safety file transfer from the principal designer to the principal contractor?",
    options: [
      "At the start of the construction phase",
      "When the principal designer's appointment ends before the construction phase is complete",
      "At practical completion",
      "When the client requests it"
    ],
    correctAnswer: 1,
    explanation: "If the principal designer's appointment finishes before the end of the project, they must pass the health and safety file to the principal contractor, who then takes on the duty to review, update, and eventually deliver the completed file to the client.",
    section: "CDM 2015",
    difficulty: "advanced",
    topic: "Health and Safety File",
    category: "Health & Safety"
  },

  // RIDDOR (Questions 25-32)
  {
    id: 25,
    question: "Under RIDDOR 2013, within what timeframe must a fatality or specified injury be reported to the HSE?",
    options: [
      "Within 24 hours",
      "Without delay, and a report must be sent within 10 days",
      "Within 15 days",
      "Within 7 days"
    ],
    correctAnswer: 1,
    explanation: "Deaths and specified injuries must be reported without delay, typically by telephone to the HSE or via the online reporting form immediately. A written report must follow within 10 days of the incident.",
    section: "RIDDOR",
    difficulty: "basic",
    topic: "Reporting Timeframes",
    category: "Health & Safety"
  },
  {
    id: 26,
    question: "Which of the following is classified as a 'specified injury' under RIDDOR 2013?",
    options: [
      "A minor cut requiring first aid",
      "A strain causing one day off work",
      "A fracture, other than to fingers, thumbs, or toes",
      "Bruising requiring no medical treatment"
    ],
    correctAnswer: 2,
    explanation: "Specified injuries under RIDDOR include fractures (other than to fingers, thumbs, or toes), amputations, permanent loss of sight or reduction in sight, crush injuries leading to internal organ damage, scalping, and any burn or injury leading to hypothermia or unconsciousness.",
    section: "RIDDOR",
    difficulty: "basic",
    topic: "Specified Injuries",
    category: "Health & Safety"
  },
  {
    id: 27,
    question: "Under RIDDOR 2013, what is the reporting threshold for over-7-day incapacitation?",
    options: [
      "Any injury causing absence from work",
      "An injury that results in the worker being incapacitated for more than 7 consecutive days, not counting the day of the injury",
      "Any injury requiring hospital treatment",
      "Injuries causing absence of 3 or more days"
    ],
    correctAnswer: 1,
    explanation: "Under RIDDOR 2013, injuries that result in the worker being incapacitated for more than 7 consecutive days (not counting the day of the injury) must be reported within 15 days. This replaced the previous over-3-day reporting requirement.",
    section: "RIDDOR",
    difficulty: "intermediate",
    topic: "Reporting Thresholds",
    category: "Health & Safety"
  },
  {
    id: 28,
    question: "Which occupational diseases are reportable under RIDDOR when linked to specified work activities?",
    options: [
      "Common cold contracted at work",
      "Carpal tunnel syndrome from work involving hand-held vibrating tools",
      "Stress-related illness",
      "Food poisoning from the canteen"
    ],
    correctAnswer: 1,
    explanation: "RIDDOR requires reporting of specific occupational diseases when linked to specified activities. Carpal tunnel syndrome linked to work involving hand-held vibrating tools is reportable. Other reportable diseases include occupational dermatitis, asthma, and hand-arm vibration syndrome.",
    section: "RIDDOR",
    difficulty: "intermediate",
    topic: "Occupational Diseases",
    category: "Health & Safety"
  },
  {
    id: 29,
    question: "Under RIDDOR, what constitutes a 'dangerous occurrence' that must be reported?",
    options: [
      "Any near-miss incident",
      "Events specified in Schedule 2, such as collapse of scaffolding, electrical incidents causing fire, or explosion",
      "Any incident witnessed by members of the public",
      "Incidents causing property damage over £10,000"
    ],
    correctAnswer: 1,
    explanation: "Dangerous occurrences are specific events listed in Schedule 2 of RIDDOR that must be reported because they have the potential to cause significant harm. These include scaffold collapse, crane collapse, electrical incidents causing fire or explosion, and incidents involving pipelines.",
    section: "RIDDOR",
    difficulty: "intermediate",
    topic: "Dangerous Occurrences",
    category: "Health & Safety"
  },
  {
    id: 30,
    question: "Who is the 'responsible person' required to make RIDDOR reports?",
    options: [
      "The injured person",
      "Any witness to the incident",
      "The employer, self-employed person, or person in control of the premises where work is carried out",
      "The local authority health and safety officer"
    ],
    correctAnswer: 2,
    explanation: "The responsible person is the employer (for employees), the self-employed person (for incidents involving them or their work), or the person in control of the premises where work is carried out (for incidents involving non-workers).",
    section: "RIDDOR",
    difficulty: "basic",
    topic: "Reporting Duties",
    category: "Health & Safety"
  },
  {
    id: 31,
    question: "Under RIDDOR, what records must be kept and for how long?",
    options: [
      "No records are required",
      "Records of all reportable incidents must be kept for at least 3 years from the date of the incident",
      "Records must be kept for 1 year only",
      "Only fatal accidents must be recorded"
    ],
    correctAnswer: 1,
    explanation: "Records of reportable incidents must be kept for at least 3 years from the date on which the record was made. The record can be kept in any form but must contain specific information including date, details of the injured person, and nature of the injury.",
    section: "RIDDOR",
    difficulty: "basic",
    topic: "Record Keeping",
    category: "Health & Safety"
  },
  {
    id: 32,
    question: "What is the reporting requirement for a non-fatal accident to a non-worker (member of the public) on premises under RIDDOR?",
    options: [
      "All such accidents must be reported",
      "Only if the person is taken directly from the site to hospital for treatment",
      "Only if the person makes a formal complaint",
      "Never reportable under RIDDOR"
    ],
    correctAnswer: 1,
    explanation: "Under RIDDOR, accidents to non-workers must be reported if the person is taken directly from the site of the accident to a hospital for treatment of their injury. This applies to incidents arising out of or in connection with work activities.",
    section: "RIDDOR",
    difficulty: "intermediate",
    topic: "Non-Worker Injuries",
    category: "Health & Safety"
  },

  // Risk Assessment (Questions 33-42)
  {
    id: 33,
    question: "Under the Management of Health and Safety at Work Regulations 1999, what are the five steps to risk assessment?",
    options: [
      "Identify, assess, implement, review, document",
      "Identify hazards, decide who might be harmed, evaluate risks, record findings, review and update",
      "Plan, do, check, act, review",
      "Observe, measure, analyse, report, follow-up"
    ],
    correctAnswer: 1,
    explanation: "The HSE's five steps are: 1) Identify hazards, 2) Decide who might be harmed and how, 3) Evaluate risks and decide on precautions, 4) Record significant findings, 5) Review and update the assessment regularly.",
    section: "Risk Assessment",
    difficulty: "basic",
    topic: "Risk Assessment Process",
    category: "Health & Safety"
  },
  {
    id: 34,
    question: "What is the key difference between a hazard and a risk?",
    options: [
      "They are the same thing",
      "A hazard is something with potential to cause harm; risk is the likelihood of that harm occurring combined with its severity",
      "A hazard is more serious than a risk",
      "Risk only applies to financial losses"
    ],
    correctAnswer: 1,
    explanation: "A hazard is anything with the potential to cause harm (e.g., electricity, chemicals, working at height). Risk is the likelihood that harm will occur from exposure to the hazard, combined with the potential severity of that harm.",
    section: "Risk Assessment",
    difficulty: "basic",
    topic: "Hazard vs Risk",
    category: "Health & Safety"
  },
  {
    id: 35,
    question: "What is the hierarchy of control measures in risk management?",
    options: [
      "PPE first, then engineering controls",
      "Elimination, substitution, engineering controls, administrative controls, PPE",
      "Training, supervision, PPE",
      "Warning signs, barriers, permits"
    ],
    correctAnswer: 1,
    explanation: "The hierarchy of controls prioritises: 1) Elimination - remove the hazard entirely, 2) Substitution - replace with something less hazardous, 3) Engineering controls - isolate people from the hazard, 4) Administrative controls - change working practices, 5) PPE - last resort protection.",
    section: "Risk Assessment",
    difficulty: "intermediate",
    topic: "Control Hierarchy",
    category: "Health & Safety"
  },
  {
    id: 36,
    question: "When calculating a risk rating using a risk matrix, what factors are typically multiplied together?",
    options: [
      "Cost and time",
      "Likelihood and severity",
      "Number of workers and hours worked",
      "Temperature and pressure"
    ],
    correctAnswer: 1,
    explanation: "Risk rating is typically calculated as Likelihood (or probability) multiplied by Severity (or consequence). This gives a numerical score that helps prioritise which risks need the most urgent attention.",
    section: "Risk Assessment",
    difficulty: "basic",
    topic: "Risk Rating",
    category: "Health & Safety"
  },
  {
    id: 37,
    question: "Under Regulation 3 of the Management Regulations, when must a risk assessment be reviewed?",
    options: [
      "Every month without exception",
      "When there is reason to suspect it is no longer valid or there has been a significant change",
      "Only after an accident occurs",
      "Every 5 years"
    ],
    correctAnswer: 1,
    explanation: "Regulation 3(3) requires employers to review risk assessments where there is reason to suspect it is no longer valid, or where there has been a significant change in the matters to which it relates. This ensures assessments remain current and effective.",
    section: "Risk Assessment",
    difficulty: "intermediate",
    topic: "Review Requirements",
    category: "Health & Safety"
  },
  {
    id: 38,
    question: "What is a dynamic risk assessment?",
    options: [
      "A formal written assessment conducted annually",
      "A continuous process of identifying hazards, assessing risks, and implementing controls on site as circumstances change",
      "An assessment carried out only for high-risk activities",
      "A computer-generated risk assessment"
    ],
    correctAnswer: 1,
    explanation: "A dynamic risk assessment is the continuous process of identifying hazards, assessing risks, and implementing controls as work proceeds and circumstances change. It complements formal written assessments but responds to real-time conditions on site.",
    section: "Risk Assessment",
    difficulty: "intermediate",
    topic: "Dynamic Assessment",
    category: "Health & Safety"
  },
  {
    id: 39,
    question: "Under the Management Regulations, what specific groups must be considered in risk assessments?",
    options: [
      "Only permanent employees",
      "Young persons, new or expectant mothers, and persons with disabilities among others",
      "Only workers over 18",
      "Only full-time workers"
    ],
    correctAnswer: 1,
    explanation: "Risk assessments must consider vulnerable groups including young persons (under 18), new or expectant mothers, persons with disabilities, and lone workers. These groups may face additional or different risks that require specific control measures.",
    section: "Risk Assessment",
    difficulty: "intermediate",
    topic: "Vulnerable Groups",
    category: "Health & Safety"
  },
  {
    id: 40,
    question: "What is the ALARP principle in risk management?",
    options: [
      "All Locations And Risk Profiles",
      "As Low As Reasonably Practicable - reducing risk to the lowest level where further reduction would be grossly disproportionate to the benefit",
      "Always List All Risk Priorities",
      "Assessment Levels And Risk Parameters"
    ],
    correctAnswer: 1,
    explanation: "ALARP (As Low As Reasonably Practicable) means reducing risk to a level where the cost (in time, money, and effort) of further reduction would be grossly disproportionate to the risk reduction benefit gained. It acknowledges that absolute safety is unachievable.",
    section: "Risk Assessment",
    difficulty: "advanced",
    topic: "ALARP Principle",
    category: "Health & Safety"
  },
  {
    id: 41,
    question: "What is a 'suitable and sufficient' risk assessment under UK law?",
    options: [
      "The most comprehensive assessment possible regardless of the risk level",
      "An assessment proportionate to the risks - identifying significant risks and implementing sensible measures",
      "An assessment signed off by the HSE",
      "An assessment that eliminates all risks entirely"
    ],
    correctAnswer: 1,
    explanation: "A suitable and sufficient risk assessment is proportionate to the level of risk. It should identify significant risks, be appropriate to the nature of the work, remain valid for a reasonable period, and enable the employer to implement sensible measures.",
    section: "Risk Assessment",
    difficulty: "intermediate",
    topic: "Legal Requirements",
    category: "Health & Safety"
  },
  {
    id: 42,
    question: "In a quantitative risk assessment, how is the risk level calculated when using a 5x5 matrix with likelihood scores of 1-5 and severity scores of 1-5?",
    options: [
      "By adding likelihood and severity scores together",
      "By multiplying likelihood and severity scores",
      "By taking the higher of the two scores",
      "By averaging the two scores"
    ],
    correctAnswer: 1,
    explanation: "In a 5x5 risk matrix, risk level is calculated by multiplying the likelihood score by the severity score. For example, likelihood 3 x severity 4 = risk score of 12. This helps prioritise risks, with higher scores indicating greater priority for control measures.",
    section: "Risk Assessment",
    difficulty: "basic",
    topic: "Risk Calculation",
    category: "Health & Safety"
  },

  // PPE Regulations (Questions 43-48)
  {
    id: 43,
    question: "Under the Personal Protective Equipment at Work Regulations 1992, when should PPE be provided?",
    options: [
      "As the first line of defence against all hazards",
      "Only after other control measures have been considered and risks cannot be adequately controlled by other means",
      "Whenever an employee requests it",
      "Only for hazardous substances"
    ],
    correctAnswer: 1,
    explanation: "The PPE Regulations require that PPE is provided only as a last resort, after other control measures in the hierarchy have been considered. PPE should only be used when risks cannot be adequately controlled by other means.",
    section: "PPE",
    difficulty: "basic",
    topic: "PPE Hierarchy",
    category: "Health & Safety"
  },
  {
    id: 44,
    question: "What does the CE/UKCA marking on PPE signify?",
    options: [
      "That it is cheap and economical",
      "That it meets the essential health and safety requirements set out in UK/EU regulations",
      "That it is recommended by the HSE",
      "That it is suitable for all environments"
    ],
    correctAnswer: 1,
    explanation: "The CE (EU) or UKCA (UK) marking indicates that the PPE meets the essential health and safety requirements set out in the relevant regulations. It demonstrates conformity with harmonised standards and allows the product to be legally placed on the market.",
    section: "PPE",
    difficulty: "basic",
    topic: "PPE Standards",
    category: "Health & Safety"
  },
  {
    id: 45,
    question: "Under Regulation 7 of the PPE Regulations, what are an employer's duties regarding PPE maintenance?",
    options: [
      "To replace PPE only when it breaks",
      "To ensure PPE is maintained in an efficient state, in efficient working order, and in good repair",
      "To wash PPE monthly",
      "To inspect PPE only when an accident occurs"
    ],
    correctAnswer: 1,
    explanation: "Regulation 7 requires employers to ensure PPE is maintained (including replaced or cleaned as appropriate) in an efficient state, in efficient working order, and in good repair. This includes regular inspection and proper storage.",
    section: "PPE",
    difficulty: "intermediate",
    topic: "PPE Maintenance",
    category: "Health & Safety"
  },
  {
    id: 46,
    question: "According to PPE Regulations, what factors must be considered when selecting PPE?",
    options: [
      "Cost only",
      "The risks, ergonomic requirements, health of the wearer, characteristics of the workstation, and compatibility with other PPE",
      "Colour preferences of workers",
      "Availability from suppliers"
    ],
    correctAnswer: 1,
    explanation: "When selecting PPE, employers must consider: the risks involved, ergonomic requirements and health of the wearer, characteristics of the workstation, how the PPE fits, and compatibility with other PPE that must be worn simultaneously.",
    section: "PPE",
    difficulty: "intermediate",
    topic: "PPE Selection",
    category: "Health & Safety"
  },
  {
    id: 47,
    question: "What is the employer's duty under Regulation 9 regarding PPE training and information?",
    options: [
      "To provide written instructions only",
      "To provide adequate information, instruction, and training to enable PPE to be used effectively",
      "To demonstrate PPE once only",
      "Training is not required for PPE use"
    ],
    correctAnswer: 1,
    explanation: "Regulation 9 requires employers to provide adequate and appropriate information, instruction, and training for each item of PPE. This includes information about risks, how PPE protects, its limitations, and how to use it correctly.",
    section: "PPE",
    difficulty: "basic",
    topic: "PPE Training",
    category: "Health & Safety"
  },
  {
    id: 48,
    question: "What are the three categories of PPE based on risk level under the PPE Regulation 2016/425?",
    options: [
      "Small, medium, large",
      "Category I (minimal risks), Category II (intermediate risks), Category III (serious or irreversible risks including death)",
      "Temporary, permanent, disposable",
      "Class A, Class B, Class C"
    ],
    correctAnswer: 1,
    explanation: "PPE Regulation 2016/425 categorises PPE as: Category I - minimal risks (e.g., gardening gloves); Category II - intermediate risks requiring conformity assessment; Category III - serious risks including death (e.g., fall protection, respiratory protection), requiring stricter conformity procedures.",
    section: "PPE",
    difficulty: "advanced",
    topic: "PPE Categories",
    category: "Health & Safety"
  },

  // Safe Isolation Procedures (Questions 49-56)
  {
    id: 49,
    question: "According to BS 7671 and GS38, what is the first step in safe isolation procedure?",
    options: [
      "Isolate the supply",
      "Identify the source(s) of supply and all points of isolation",
      "Fit warning notices",
      "Test the circuit"
    ],
    correctAnswer: 1,
    explanation: "The first step in safe isolation is to identify the source(s) of supply and all points of isolation. This is crucial because circuits may have multiple supplies, standby generators, UPS systems, or interconnections that could re-energise the circuit.",
    section: "Safe Isolation",
    difficulty: "basic",
    topic: "Isolation Procedure",
    category: "Health & Safety"
  },
  {
    id: 50,
    question: "What voltage limits for test instruments are specified in GS38 for safe use near live conductors?",
    options: [
      "Any voltage test instrument can be used",
      "Fused test leads with maximum 500mA fuse rating (HRC), spring-loaded shrouded probes with maximum 4mm exposed tip",
      "Only 12V test equipment may be used",
      "There are no specific requirements for test instruments"
    ],
    correctAnswer: 1,
    explanation: "GS38 specifies that test leads should have fuses rated at 500mA or less (HRC type), finger guards/barriers, insulated probes with maximum 4mm exposed metal tip (2mm for voltage detectors), and be robust enough for the expected conditions.",
    section: "Safe Isolation",
    difficulty: "intermediate",
    topic: "Test Equipment",
    category: "Health & Safety"
  },
  {
    id: 51,
    question: "After isolating a circuit and before commencing work, what sequence of testing must be performed with a voltage indicator?",
    options: [
      "Test circuit only",
      "Prove the voltage indicator on a known source, test the circuit, prove the indicator again on the known source",
      "Visual inspection only",
      "Test between live and neutral only"
    ],
    correctAnswer: 1,
    explanation: "The prove-test-prove sequence is essential: 1) Prove the voltage indicator works on a known live source, 2) Test the isolated circuit to confirm it is dead, 3) Prove the indicator still works on the known source. This confirms the instrument was working correctly when the dead test was made.",
    section: "Safe Isolation",
    difficulty: "basic",
    topic: "Proving Dead",
    category: "Health & Safety"
  },
  {
    id: 52,
    question: "Under the Electricity at Work Regulations 1989, Regulation 14, what does 'dead' mean for electrical isolation purposes?",
    options: [
      "Voltage below 50V AC",
      "No danger of electric shock",
      "Disconnected from all sources of electrical energy and unable to become live unintentionally",
      "Protected by RCD"
    ],
    correctAnswer: 2,
    explanation: "Under Regulation 14, 'dead' means the conductor is disconnected from all sources of electrical energy and cannot accidentally or inadvertently become live. This requires positive isolation, not just switching off.",
    section: "Safe Isolation",
    difficulty: "intermediate",
    topic: "Definition of Dead",
    category: "Health & Safety"
  },
  {
    id: 53,
    question: "Why must all poles be isolated when isolating a three-phase supply?",
    options: [
      "To save energy",
      "Because induced voltages could appear, or a fault between phases could make the isolated phase live",
      "Three-phase systems don't require full isolation",
      "For aesthetic reasons"
    ],
    correctAnswer: 1,
    explanation: "All poles must be isolated because inductive loads can generate back-EMF, capacitive coupling can induce voltages, and faults between phases could energise supposedly isolated conductors. Single-pole isolation on three-phase systems is inherently unsafe.",
    section: "Safe Isolation",
    difficulty: "intermediate",
    topic: "Three-Phase Isolation",
    category: "Health & Safety"
  },
  {
    id: 54,
    question: "What is the purpose of lock-off devices in safe isolation procedures?",
    options: [
      "To prevent theft of equipment",
      "To physically prevent the switching device from being operated and ensure it cannot be inadvertently re-energised",
      "To measure voltage",
      "To indicate circuit direction"
    ],
    correctAnswer: 1,
    explanation: "Lock-off devices physically prevent isolation devices from being operated. Combined with personal padlocks and a permit system, they ensure the circuit cannot be inadvertently re-energised by someone unaware that work is being carried out.",
    section: "Safe Isolation",
    difficulty: "basic",
    topic: "Lock-Off Devices",
    category: "Health & Safety"
  },
  {
    id: 55,
    question: "According to best practice, between which points should voltage absence be verified when proving a circuit dead?",
    options: [
      "Live to neutral only",
      "Line to neutral, line to earth, and neutral to earth (for single phase); between all phases, and each phase to neutral and earth (for three phase)",
      "Live to earth only",
      "Between all conductors and ground only"
    ],
    correctAnswer: 1,
    explanation: "Comprehensive testing requires testing between all combinations: L-N, L-E, and N-E for single phase. For three-phase, test L1-L2, L2-L3, L3-L1 (phase to phase), then each phase to neutral and each phase and neutral to earth.",
    section: "Safe Isolation",
    difficulty: "intermediate",
    topic: "Testing Sequence",
    category: "Health & Safety"
  },
  {
    id: 56,
    question: "What additional precautions are required when isolating circuits that may include stored energy?",
    options: [
      "No additional precautions are needed",
      "Allow time for discharge of capacitors, verify dissipation, consider UPS systems, battery supplies, and generators",
      "Simply switch off the main supply",
      "Use thicker gloves"
    ],
    correctAnswer: 1,
    explanation: "Stored energy sources include capacitors (which can retain lethal charge), UPS systems, battery supplies, and standby generators. These must be identified, isolated, and allowed to discharge or verified as disconnected before work commences.",
    section: "Safe Isolation",
    difficulty: "advanced",
    topic: "Stored Energy",
    category: "Health & Safety"
  },

  // Permits to Work (Questions 57-60)
  {
    id: 57,
    question: "What is the primary purpose of a permit-to-work system?",
    options: [
      "To create paperwork for management",
      "To provide a formal documented system that authorises specific work at specific locations under defined safety conditions",
      "To replace risk assessments",
      "To allow work without supervision"
    ],
    correctAnswer: 1,
    explanation: "A permit-to-work system provides a formal documented procedure controlling high-risk work. It ensures proper authorisation, specifies safety conditions, identifies hazards, and ensures handover procedures are followed. It supplements but does not replace risk assessments.",
    section: "Permits to Work",
    difficulty: "basic",
    topic: "Permit Purpose",
    category: "Health & Safety"
  },
  {
    id: 58,
    question: "Which types of work typically require a permit-to-work system in building services?",
    options: [
      "Routine maintenance only",
      "Hot work, confined space entry, work on high voltage systems, work on pressure systems, and isolation of plant",
      "Only electrical work",
      "Work by contractors only"
    ],
    correctAnswer: 1,
    explanation: "Permit-to-work systems are typically required for high-risk activities including hot work, confined space entry, work on high voltage systems (above 1000V AC), work on pressure systems, entry into hazardous areas, and complex isolation procedures.",
    section: "Permits to Work",
    difficulty: "intermediate",
    topic: "Permit Applications",
    category: "Health & Safety"
  },
  {
    id: 59,
    question: "What essential elements must a permit-to-work document contain?",
    options: [
      "Worker's home address only",
      "Description of work, location, hazards identified, precautions required, authorisation signatures, time validity, and cancellation procedure",
      "Cost estimates only",
      "Equipment serial numbers only"
    ],
    correctAnswer: 1,
    explanation: "A permit must include: clear description of work and its location, identified hazards and required precautions, signatures of the person issuing and receiving the permit, time period of validity, and a formal cancellation procedure when work is complete.",
    section: "Permits to Work",
    difficulty: "intermediate",
    topic: "Permit Contents",
    category: "Health & Safety"
  },
  {
    id: 60,
    question: "What is the role of the 'Authorised Person' in a permit-to-work system for electrical work?",
    options: [
      "To carry out the work",
      "To assess the work required, ensure safe conditions exist, issue the permit, and later cancel it when work is complete",
      "To observe only",
      "To provide tools and equipment"
    ],
    correctAnswer: 1,
    explanation: "The Authorised Person assesses the work, ensures all safety conditions are met (including isolation and proving dead), issues the permit to the Competent Person carrying out the work, monitors compliance, and formally cancels the permit upon safe completion.",
    section: "Permits to Work",
    difficulty: "advanced",
    topic: "Authorised Person",
    category: "Health & Safety"
  },

  // First Aid (Questions 61-62)
  {
    id: 61,
    question: "Under the Health and Safety (First-Aid) Regulations 1981, what must employers provide?",
    options: [
      "A first aider in every room",
      "Adequate and appropriate equipment, facilities, and personnel to enable first aid to be given to employees who are injured or become ill at work",
      "An ambulance on site",
      "A doctor on call 24 hours"
    ],
    correctAnswer: 1,
    explanation: "The First-Aid Regulations require employers to provide adequate and appropriate equipment, facilities, and personnel to ensure employees receive immediate attention if injured or taken ill at work. The level of provision depends on workplace hazards and number of employees.",
    section: "First Aid",
    difficulty: "basic",
    topic: "First Aid Requirements",
    category: "Health & Safety"
  },
  {
    id: 62,
    question: "When dealing with an electric shock casualty, what is the correct sequence of actions?",
    options: [
      "Immediately touch the casualty to check for pulse",
      "Isolate the supply (if safe), call for help, assess the casualty, begin CPR if not breathing normally",
      "Leave the area and call emergency services only",
      "Apply water to cool any burns first"
    ],
    correctAnswer: 1,
    explanation: "For electric shock: 1) Isolate the supply if safe to do so (do not touch the casualty if still in contact with live parts), 2) Call for help/emergency services, 3) Assess the casualty using DRABC, 4) Begin CPR if not breathing normally, 5) Treat burns with cool water after CPR is established.",
    section: "First Aid",
    difficulty: "intermediate",
    topic: "Electric Shock",
    category: "Health & Safety"
  },

  // ============================================
  // BUILDING SERVICES SCIENCE (Questions 63-125)
  // ============================================

  // Heat Transfer (Questions 63-82)
  {
    id: 63,
    question: "What are the three primary modes of heat transfer?",
    options: [
      "Evaporation, condensation, radiation",
      "Conduction, convection, radiation",
      "Absorption, reflection, transmission",
      "Sensible, latent, specific"
    ],
    correctAnswer: 1,
    explanation: "The three primary modes of heat transfer are: conduction (through solid materials), convection (through fluids - liquids and gases), and radiation (electromagnetic waves through space). All three occur simultaneously in buildings but to varying degrees.",
    section: "Heat Transfer",
    difficulty: "basic",
    topic: "Heat Transfer Modes",
    category: "Building Services Science"
  },
  {
    id: 64,
    question: "What is the SI unit for thermal conductivity (k-value)?",
    options: [
      "W/m K",
      "W/m² K",
      "m² K/W",
      "J/kg K"
    ],
    correctAnswer: 0,
    explanation: "Thermal conductivity (k-value or λ) is measured in W/m K (watts per metre kelvin). It represents the rate of heat flow through a unit area of material per unit temperature difference per unit thickness.",
    section: "Heat Transfer",
    difficulty: "basic",
    topic: "Thermal Properties",
    category: "Building Services Science"
  },
  {
    id: 65,
    question: "What is the relationship between thermal resistance (R-value) and thermal transmittance (U-value) for a building element?",
    options: [
      "R = U × thickness",
      "U = 1/ΣR (U-value is the reciprocal of total thermal resistance)",
      "R = U²",
      "U = R × area"
    ],
    correctAnswer: 1,
    explanation: "U-value (thermal transmittance, W/m²K) is the reciprocal of total thermal resistance: U = 1/ΣR. Total R includes the resistances of all layers plus internal and external surface resistances. Lower U-values indicate better insulation.",
    section: "Heat Transfer",
    difficulty: "intermediate",
    topic: "U-values",
    category: "Building Services Science"
  },
  {
    id: 66,
    question: "According to Building Regulations Part L, what is the maximum U-value for new external walls in dwellings?",
    options: [
      "0.50 W/m²K",
      "0.30 W/m²K",
      "0.26 W/m²K",
      "0.18 W/m²K"
    ],
    correctAnswer: 2,
    explanation: "Building Regulations Approved Document L specifies a maximum U-value of 0.26 W/m²K for new external walls in dwellings. This represents the limiting fabric parameter, though better values may be needed to achieve overall energy targets.",
    section: "Heat Transfer",
    difficulty: "intermediate",
    topic: "Building Regulations",
    category: "Building Services Science"
  },
  {
    id: 67,
    question: "What is the formula for heat loss through a building element by conduction?",
    options: [
      "Q = m × c × ΔT",
      "Q = U × A × ΔT",
      "Q = ρ × V × c",
      "Q = λ × A"
    ],
    correctAnswer: 1,
    explanation: "Heat loss through a building element is calculated as Q = U × A × ΔT, where Q is heat flow (W), U is thermal transmittance (W/m²K), A is area (m²), and ΔT is temperature difference (K). This is fundamental to heating load calculations.",
    section: "Heat Transfer",
    difficulty: "basic",
    topic: "Heat Loss Calculation",
    category: "Building Services Science"
  },
  {
    id: 68,
    question: "What is a thermal bridge (cold bridge) in building construction?",
    options: [
      "A connection between two heating systems",
      "An area of the building envelope with significantly higher heat transfer due to interruption in insulation or change in geometry",
      "A device for measuring temperature",
      "A type of underfloor heating"
    ],
    correctAnswer: 1,
    explanation: "A thermal bridge is an area where the insulation is penetrated or reduced, creating a localised path of higher heat transfer. Examples include steel lintels, concrete floor edges, and window reveals. They cause increased heat loss and potential condensation.",
    section: "Heat Transfer",
    difficulty: "intermediate",
    topic: "Thermal Bridging",
    category: "Building Services Science"
  },
  {
    id: 69,
    question: "What is the specific heat capacity of water at standard conditions?",
    options: [
      "1.0 kJ/kg K",
      "2.1 kJ/kg K",
      "4.18 kJ/kg K",
      "10.0 kJ/kg K"
    ],
    correctAnswer: 2,
    explanation: "The specific heat capacity of water is 4.18 kJ/kg K (or 4180 J/kg K). This relatively high value makes water an excellent heat transfer medium and is fundamental to heating and cooling system design calculations.",
    section: "Heat Transfer",
    difficulty: "basic",
    topic: "Specific Heat",
    category: "Building Services Science"
  },
  {
    id: 70,
    question: "What is the formula for calculating the heat energy required to raise the temperature of water in a heating system?",
    options: [
      "Q = m × c × ΔT (mass × specific heat capacity × temperature change)",
      "Q = P × t",
      "Q = V × I",
      "Q = m × L"
    ],
    correctAnswer: 0,
    explanation: "The sensible heat equation Q = m × c × ΔT calculates the energy required to change the temperature of a substance without phase change. For water: Q (kJ) = mass (kg) × 4.18 (kJ/kg K) × temperature change (K).",
    section: "Heat Transfer",
    difficulty: "basic",
    topic: "Heat Energy",
    category: "Building Services Science"
  },
  {
    id: 71,
    question: "What is the Stefan-Boltzmann constant and what does it relate to?",
    options: [
      "The rate of conduction through solids",
      "The constant (σ = 5.67 × 10⁻⁸ W/m²K⁴) used to calculate radiant heat transfer from a surface",
      "The specific heat of gases",
      "The coefficient of thermal expansion"
    ],
    correctAnswer: 1,
    explanation: "The Stefan-Boltzmann constant (σ = 5.67 × 10⁻⁸ W/m²K⁴) is used in the equation for radiant heat transfer: Q = εσA(T₁⁴ - T₂⁴). It relates the power radiated from a black body to the fourth power of its absolute temperature.",
    section: "Heat Transfer",
    difficulty: "advanced",
    topic: "Radiation",
    category: "Building Services Science"
  },
  {
    id: 72,
    question: "What is the typical internal surface resistance (Rsi) value used in U-value calculations for walls with normal heat flow?",
    options: [
      "0.04 m²K/W",
      "0.13 m²K/W",
      "0.25 m²K/W",
      "0.50 m²K/W"
    ],
    correctAnswer: 1,
    explanation: "The standard internal surface resistance (Rsi) for walls with horizontal heat flow is 0.13 m²K/W as specified in BS EN ISO 6946. For floors (upward heat flow) it is 0.10 m²K/W, and for ceilings (downward heat flow) it is 0.17 m²K/W.",
    section: "Heat Transfer",
    difficulty: "intermediate",
    topic: "Surface Resistance",
    category: "Building Services Science"
  },
  {
    id: 73,
    question: "In convective heat transfer, what does the Nusselt number represent?",
    options: [
      "The ratio of thermal conductivity to density",
      "The ratio of convective to conductive heat transfer across a boundary",
      "The velocity of the fluid",
      "The specific heat capacity"
    ],
    correctAnswer: 1,
    explanation: "The Nusselt number (Nu) is a dimensionless number representing the ratio of convective to conductive heat transfer at a boundary. Nu = hL/k, where h is the convective heat transfer coefficient, L is characteristic length, and k is thermal conductivity.",
    section: "Heat Transfer",
    difficulty: "advanced",
    topic: "Convection",
    category: "Building Services Science"
  },
  {
    id: 74,
    question: "What is the purpose of a cavity barrier in relation to heat transfer in buildings?",
    options: [
      "To increase air circulation",
      "To prevent the spread of fire and smoke through cavities while managing thermal bridging",
      "To improve acoustic performance",
      "To provide structural support"
    ],
    correctAnswer: 1,
    explanation: "Cavity barriers prevent the spread of fire, smoke, and hot gases through cavities in building construction. While primarily for fire safety, they must be detailed to minimise thermal bridging and maintain the thermal envelope integrity.",
    section: "Heat Transfer",
    difficulty: "intermediate",
    topic: "Cavity Construction",
    category: "Building Services Science"
  },
  {
    id: 75,
    question: "What is the latent heat of vaporisation of water at atmospheric pressure?",
    options: [
      "334 kJ/kg",
      "1000 kJ/kg",
      "2260 kJ/kg",
      "4180 kJ/kg"
    ],
    correctAnswer: 2,
    explanation: "The latent heat of vaporisation of water at 100°C and atmospheric pressure is approximately 2260 kJ/kg. This large value explains why steam heating systems can transfer significant energy and why evaporative cooling is effective.",
    section: "Heat Transfer",
    difficulty: "intermediate",
    topic: "Latent Heat",
    category: "Building Services Science"
  },
  {
    id: 76,
    question: "What is the purpose of calculating degree days in building services?",
    options: [
      "To determine the age of the building",
      "To estimate seasonal heating or cooling energy requirements based on external temperature data",
      "To measure daylight hours",
      "To calculate structural loads"
    ],
    correctAnswer: 1,
    explanation: "Degree days provide a measure of how much heating or cooling is needed over a period. Heating degree days sum the differences between base temperature and lower outdoor temperatures. They enable energy consumption estimation and comparison between buildings and years.",
    section: "Heat Transfer",
    difficulty: "intermediate",
    topic: "Degree Days",
    category: "Building Services Science"
  },
  {
    id: 77,
    question: "What is the emissivity of a perfect black body?",
    options: [
      "0",
      "0.5",
      "1.0",
      "Infinity"
    ],
    correctAnswer: 2,
    explanation: "A perfect black body has an emissivity of 1.0, meaning it emits the maximum possible thermal radiation at any given temperature. Real surfaces have emissivity values less than 1, with polished metals having low values (0.02-0.1) and matt surfaces higher values (0.9-0.95).",
    section: "Heat Transfer",
    difficulty: "intermediate",
    topic: "Emissivity",
    category: "Building Services Science"
  },
  {
    id: 78,
    question: "In heat pump calculations, what is the Coefficient of Performance (COP)?",
    options: [
      "The ratio of electrical input to heat output",
      "The ratio of heat output to electrical input",
      "The efficiency of the compressor only",
      "The temperature lift divided by time"
    ],
    correctAnswer: 1,
    explanation: "COP is the ratio of useful heat output to electrical power input: COP = Qout/Win. A COP of 3 means 3 kW of heat is delivered for every 1 kW of electricity consumed. COP varies with source and delivery temperatures.",
    section: "Heat Transfer",
    difficulty: "intermediate",
    topic: "Heat Pumps",
    category: "Building Services Science"
  },
  {
    id: 79,
    question: "What is meant by the term 'thermal mass' in building physics?",
    options: [
      "The weight of the insulation",
      "The ability of a material to store and release heat, helping to moderate temperature fluctuations",
      "The maximum temperature a material can withstand",
      "The density of the air in a room"
    ],
    correctAnswer: 1,
    explanation: "Thermal mass refers to a material's ability to absorb, store, and later release heat. High thermal mass materials (concrete, brick, stone) moderate internal temperature swings, reducing peak heating/cooling loads and improving comfort.",
    section: "Heat Transfer",
    difficulty: "basic",
    topic: "Thermal Mass",
    category: "Building Services Science"
  },
  {
    id: 80,
    question: "What is the formula for calculating the heat transfer coefficient for forced convection in a pipe?",
    options: [
      "h = Q/AΔT",
      "h = Nu × k/D (Nusselt number × thermal conductivity / diameter)",
      "h = ρ × c × v",
      "h = λ/L"
    ],
    correctAnswer: 1,
    explanation: "The convective heat transfer coefficient can be calculated as h = Nu × k/D, where Nu is the Nusselt number (determined from Reynolds and Prandtl numbers), k is fluid thermal conductivity, and D is the characteristic dimension (pipe diameter).",
    section: "Heat Transfer",
    difficulty: "advanced",
    topic: "Convection Coefficient",
    category: "Building Services Science"
  },
  {
    id: 81,
    question: "What is the approximate external surface resistance (Rse) for sheltered exposure conditions?",
    options: [
      "0.02 m²K/W",
      "0.04 m²K/W",
      "0.08 m²K/W",
      "0.13 m²K/W"
    ],
    correctAnswer: 1,
    explanation: "The standard external surface resistance (Rse) for most calculations is 0.04 m²K/W for normal exposure. This value accounts for the convective and radiative heat transfer between the external surface and the environment.",
    section: "Heat Transfer",
    difficulty: "intermediate",
    topic: "Surface Resistance",
    category: "Building Services Science"
  },
  {
    id: 82,
    question: "What is the Fourier equation for steady-state heat conduction through a plane wall?",
    options: [
      "q = -k × A × (dT/dx)",
      "q = m × c × ΔT",
      "q = h × A × ΔT",
      "q = σ × ε × A × T⁴"
    ],
    correctAnswer: 0,
    explanation: "Fourier's law states q = -k × A × (dT/dx), where q is heat flow rate (W), k is thermal conductivity (W/mK), A is cross-sectional area (m²), and dT/dx is the temperature gradient. The negative sign indicates heat flows from high to low temperature.",
    section: "Heat Transfer",
    difficulty: "advanced",
    topic: "Fourier's Law",
    category: "Building Services Science"
  },

  // Thermodynamics (Questions 83-97)
  {
    id: 83,
    question: "What does the First Law of Thermodynamics state?",
    options: [
      "Heat flows from hot to cold",
      "Energy cannot be created or destroyed, only converted from one form to another",
      "Entropy always increases",
      "Absolute zero cannot be reached"
    ],
    correctAnswer: 1,
    explanation: "The First Law of Thermodynamics (conservation of energy) states that energy cannot be created or destroyed, only converted from one form to another. In building services, this means all energy input must equal energy output plus any change in stored energy.",
    section: "Thermodynamics",
    difficulty: "basic",
    topic: "First Law",
    category: "Building Services Science"
  },
  {
    id: 84,
    question: "What does the Second Law of Thermodynamics imply for heat engines and heat pumps?",
    options: [
      "100% efficiency is achievable",
      "Heat naturally flows from cold to hot",
      "It is impossible to convert heat completely into work; heat naturally flows from hot to cold",
      "Energy can be created in certain conditions"
    ],
    correctAnswer: 2,
    explanation: "The Second Law states that heat cannot spontaneously flow from cold to hot, and no heat engine can be 100% efficient. This is why heat pumps require work input to move heat from cold to hot, and why power stations have cooling towers.",
    section: "Thermodynamics",
    difficulty: "intermediate",
    topic: "Second Law",
    category: "Building Services Science"
  },
  {
    id: 85,
    question: "What is enthalpy in thermodynamics?",
    options: [
      "The measure of disorder in a system",
      "The total heat content of a system, equal to internal energy plus the product of pressure and volume (H = U + PV)",
      "The temperature at which a substance boils",
      "The rate of heat transfer"
    ],
    correctAnswer: 1,
    explanation: "Enthalpy (H) is the total heat content of a system, defined as H = U + PV (internal energy + pressure × volume). Changes in enthalpy are particularly useful for analysing heating/cooling processes at constant pressure, common in HVAC applications.",
    section: "Thermodynamics",
    difficulty: "intermediate",
    topic: "Enthalpy",
    category: "Building Services Science"
  },
  {
    id: 86,
    question: "What is entropy in thermodynamic terms?",
    options: [
      "The total energy of a system",
      "A measure of the disorder or randomness in a system, which tends to increase in natural processes",
      "The temperature of absolute zero",
      "The pressure at boiling point"
    ],
    correctAnswer: 1,
    explanation: "Entropy is a measure of disorder or randomness in a system. The Second Law states that entropy of an isolated system tends to increase. In practical terms, this explains why heat flows from hot to cold and why no process can be 100% efficient.",
    section: "Thermodynamics",
    difficulty: "intermediate",
    topic: "Entropy",
    category: "Building Services Science"
  },
  {
    id: 87,
    question: "In a refrigeration cycle, what happens to the refrigerant in the evaporator?",
    options: [
      "It condenses from gas to liquid, releasing heat",
      "It evaporates from liquid to gas, absorbing heat from the surroundings",
      "It is compressed to high pressure",
      "It expands without any heat transfer"
    ],
    correctAnswer: 1,
    explanation: "In the evaporator, low-pressure liquid refrigerant absorbs heat from the space being cooled and evaporates (changes from liquid to gas). This phase change absorbs significant latent heat, providing the cooling effect.",
    section: "Thermodynamics",
    difficulty: "basic",
    topic: "Refrigeration Cycle",
    category: "Building Services Science"
  },
  {
    id: 88,
    question: "What is the Carnot efficiency and why is it significant?",
    options: [
      "The efficiency of all real heat engines",
      "The maximum possible efficiency of a heat engine operating between two temperatures, η = 1 - (Tc/Th)",
      "The efficiency of electric motors",
      "The ratio of useful work to heat input in any process"
    ],
    correctAnswer: 1,
    explanation: "Carnot efficiency represents the maximum possible efficiency of any heat engine operating between two absolute temperatures: η = 1 - (Tc/Th). No real engine can exceed this. It shows that efficiency improves with larger temperature differences.",
    section: "Thermodynamics",
    difficulty: "advanced",
    topic: "Carnot Efficiency",
    category: "Building Services Science"
  },
  {
    id: 89,
    question: "What is an adiabatic process?",
    options: [
      "A process at constant temperature",
      "A process with no heat transfer to or from the system",
      "A process at constant pressure",
      "A process at constant volume"
    ],
    correctAnswer: 1,
    explanation: "An adiabatic process is one where no heat is transferred between the system and its surroundings. In building services, the compression stage in refrigeration is often approximated as adiabatic, where work input increases the gas temperature without heat transfer.",
    section: "Thermodynamics",
    difficulty: "intermediate",
    topic: "Thermodynamic Processes",
    category: "Building Services Science"
  },
  {
    id: 90,
    question: "What is the relationship between pressure and temperature for a gas at constant volume?",
    options: [
      "They are inversely proportional",
      "They are directly proportional (Gay-Lussac's Law)",
      "They are unrelated",
      "Pressure remains constant"
    ],
    correctAnswer: 1,
    explanation: "Gay-Lussac's Law states that at constant volume, the pressure of a gas is directly proportional to its absolute temperature: P₁/T₁ = P₂/T₂. This explains why sealed pressure vessels are rated for specific temperature ranges.",
    section: "Thermodynamics",
    difficulty: "basic",
    topic: "Gas Laws",
    category: "Building Services Science"
  },
  {
    id: 91,
    question: "What is the ideal gas equation?",
    options: [
      "PV = constant",
      "PV = nRT (pressure × volume = amount × gas constant × temperature)",
      "P/T = constant",
      "V/T = constant"
    ],
    correctAnswer: 1,
    explanation: "The ideal gas equation PV = nRT combines Boyle's and Charles's laws. P is pressure (Pa), V is volume (m³), n is amount of substance (mol), R is the universal gas constant (8.314 J/mol K), and T is absolute temperature (K).",
    section: "Thermodynamics",
    difficulty: "basic",
    topic: "Gas Laws",
    category: "Building Services Science"
  },
  {
    id: 92,
    question: "In a vapour compression refrigeration cycle, what is the purpose of the expansion valve?",
    options: [
      "To compress the refrigerant",
      "To reduce the pressure and temperature of the refrigerant before it enters the evaporator",
      "To remove moisture from the refrigerant",
      "To store excess refrigerant"
    ],
    correctAnswer: 1,
    explanation: "The expansion valve (or throttling device) reduces the pressure and temperature of the high-pressure liquid refrigerant from the condenser. This creates the low-pressure, low-temperature conditions needed for evaporation and heat absorption in the evaporator.",
    section: "Thermodynamics",
    difficulty: "intermediate",
    topic: "Refrigeration Cycle",
    category: "Building Services Science"
  },
  {
    id: 93,
    question: "What is superheat in refrigeration systems?",
    options: [
      "The temperature above the boiling point of the refrigerant in its gaseous state leaving the evaporator",
      "The maximum operating temperature of the compressor",
      "The temperature of the condenser",
      "The ambient temperature"
    ],
    correctAnswer: 0,
    explanation: "Superheat is the temperature increase of refrigerant vapour above its saturation (boiling) temperature. Measured at the evaporator outlet, it ensures all liquid has evaporated before reaching the compressor, preventing liquid slugging damage.",
    section: "Thermodynamics",
    difficulty: "intermediate",
    topic: "Refrigeration",
    category: "Building Services Science"
  },
  {
    id: 94,
    question: "What is subcooling in refrigeration systems?",
    options: [
      "Cooling the evaporator below 0°C",
      "The temperature reduction of liquid refrigerant below its condensing temperature in the condenser",
      "The process of removing air from the system",
      "Reducing compressor speed"
    ],
    correctAnswer: 1,
    explanation: "Subcooling is the temperature of liquid refrigerant below its saturation (condensing) temperature, measured at the condenser outlet. Subcooling ensures the refrigerant entering the expansion device is fully liquid, improving system efficiency.",
    section: "Thermodynamics",
    difficulty: "intermediate",
    topic: "Refrigeration",
    category: "Building Services Science"
  },
  {
    id: 95,
    question: "What is the definition of absolute zero temperature?",
    options: [
      "0°C or the freezing point of water",
      "The lowest possible temperature where all molecular motion ceases, equal to -273.15°C or 0 K",
      "The temperature of outer space",
      "-100°C"
    ],
    correctAnswer: 1,
    explanation: "Absolute zero is the theoretical lowest temperature, where particles have minimum possible energy and molecular motion approaches zero. It equals -273.15°C or 0 Kelvin. It cannot be achieved in practice but is approached in cryogenic systems.",
    section: "Thermodynamics",
    difficulty: "basic",
    topic: "Temperature Scales",
    category: "Building Services Science"
  },
  {
    id: 96,
    question: "What is the difference between sensible heat and latent heat?",
    options: [
      "Sensible heat can be felt, latent heat cannot",
      "Sensible heat changes temperature without phase change; latent heat changes phase without temperature change",
      "Sensible heat applies only to gases; latent heat only to liquids",
      "There is no difference"
    ],
    correctAnswer: 1,
    explanation: "Sensible heat causes a temperature change without changing the state of the substance. Latent heat causes a phase change (solid-liquid-gas) without changing temperature. Understanding both is essential for HVAC load calculations.",
    section: "Thermodynamics",
    difficulty: "basic",
    topic: "Heat Types",
    category: "Building Services Science"
  },
  {
    id: 97,
    question: "In a pressure-enthalpy (P-h) diagram for refrigerants, what do the horizontal lines represent?",
    options: [
      "Lines of constant temperature",
      "Lines of constant pressure (isobars)",
      "Lines of constant entropy",
      "Lines of constant volume"
    ],
    correctAnswer: 1,
    explanation: "In a P-h diagram, horizontal lines represent constant pressure (isobars). The diagram shows the refrigeration cycle with: evaporation (horizontal line at low pressure), compression (rising line), condensation (horizontal at high pressure), and expansion (vertical drop).",
    section: "Thermodynamics",
    difficulty: "advanced",
    topic: "Refrigeration Diagrams",
    category: "Building Services Science"
  },

  // Fluid Mechanics (Questions 98-110)
  {
    id: 98,
    question: "What is the definition of pressure in fluid mechanics?",
    options: [
      "The weight of the fluid",
      "Force per unit area (P = F/A)",
      "The velocity of flow",
      "The volume of fluid"
    ],
    correctAnswer: 1,
    explanation: "Pressure is defined as force per unit area: P = F/A, measured in Pascals (Pa) where 1 Pa = 1 N/m². In building services, pressure is fundamental to understanding water distribution, air handling, and hydraulic systems.",
    section: "Fluid Mechanics",
    difficulty: "basic",
    topic: "Pressure",
    category: "Building Services Science"
  },
  {
    id: 99,
    question: "What does Bernoulli's principle state about fluid flow?",
    options: [
      "Pressure increases with velocity",
      "In steady flow, an increase in velocity occurs simultaneously with a decrease in pressure or potential energy",
      "Flow rate is always constant",
      "Viscosity increases with temperature"
    ],
    correctAnswer: 1,
    explanation: "Bernoulli's principle states that for incompressible, steady flow, an increase in velocity is accompanied by a decrease in pressure or potential energy. This explains venturi effects, flow measurement, and is fundamental to HVAC ductwork design.",
    section: "Fluid Mechanics",
    difficulty: "intermediate",
    topic: "Bernoulli's Principle",
    category: "Building Services Science"
  },
  {
    id: 100,
    question: "What is the continuity equation for fluid flow?",
    options: [
      "P₁V₁ = P₂V₂",
      "A₁v₁ = A₂v₂ (area × velocity is constant for incompressible flow)",
      "F = ma",
      "Q = mcΔT"
    ],
    correctAnswer: 1,
    explanation: "The continuity equation A₁v₁ = A₂v₂ states that for incompressible steady flow, the product of cross-sectional area and velocity remains constant. This explains why velocity increases as pipe diameter decreases, and is essential for pipe sizing.",
    section: "Fluid Mechanics",
    difficulty: "intermediate",
    topic: "Continuity",
    category: "Building Services Science"
  },
  {
    id: 101,
    question: "What does the Reynolds number indicate about fluid flow?",
    options: [
      "The temperature of the fluid",
      "Whether flow is laminar or turbulent (the ratio of inertial to viscous forces)",
      "The pressure drop in a pipe",
      "The density of the fluid"
    ],
    correctAnswer: 1,
    explanation: "The Reynolds number (Re = ρvD/μ) indicates whether flow is laminar (Re < 2300) or turbulent (Re > 4000). Values between indicate transitional flow. This affects heat transfer, friction losses, and mixing characteristics in building services systems.",
    section: "Fluid Mechanics",
    difficulty: "intermediate",
    topic: "Reynolds Number",
    category: "Building Services Science"
  },
  {
    id: 102,
    question: "What is the formula for calculating head loss due to friction in a pipe using the Darcy-Weisbach equation?",
    options: [
      "hf = f × (L/D) × (v²/2g)",
      "hf = P/ρg",
      "hf = v²/2g",
      "hf = ρgL"
    ],
    correctAnswer: 0,
    explanation: "The Darcy-Weisbach equation hf = f × (L/D) × (v²/2g) calculates friction head loss, where f is the friction factor, L is pipe length, D is diameter, v is velocity, and g is gravitational acceleration. It's fundamental to pipe sizing calculations.",
    section: "Fluid Mechanics",
    difficulty: "advanced",
    topic: "Friction Losses",
    category: "Building Services Science"
  },
  {
    id: 103,
    question: "What is gauge pressure?",
    options: [
      "Pressure measured from absolute zero",
      "Pressure measured relative to atmospheric pressure",
      "The maximum pressure a gauge can measure",
      "Pressure in a vacuum"
    ],
    correctAnswer: 1,
    explanation: "Gauge pressure is pressure measured relative to atmospheric pressure. Absolute pressure = gauge pressure + atmospheric pressure. Most building services pressure gauges read gauge pressure, so a reading of 0 means atmospheric pressure.",
    section: "Fluid Mechanics",
    difficulty: "basic",
    topic: "Pressure Measurement",
    category: "Building Services Science"
  },
  {
    id: 104,
    question: "What is the standard atmospheric pressure at sea level?",
    options: [
      "100 kPa",
      "101.325 kPa (1 atmosphere, 1.01325 bar)",
      "1000 kPa",
      "50 kPa"
    ],
    correctAnswer: 1,
    explanation: "Standard atmospheric pressure at sea level is 101.325 kPa, equivalent to 1 atmosphere, 1.01325 bar, 760 mmHg, or 14.7 psi. This reference is essential for absolute pressure calculations and affects boiling points at different altitudes.",
    section: "Fluid Mechanics",
    difficulty: "basic",
    topic: "Atmospheric Pressure",
    category: "Building Services Science"
  },
  {
    id: 105,
    question: "What is the relationship between flow rate, velocity, and pipe cross-sectional area?",
    options: [
      "Q = v/A",
      "Q = A × v (volume flow rate equals area times velocity)",
      "Q = A/v",
      "Q = A + v"
    ],
    correctAnswer: 1,
    explanation: "Volume flow rate Q = A × v, where Q is in m³/s, A is cross-sectional area in m², and v is velocity in m/s. This fundamental relationship is used for all pipe and duct sizing calculations in building services.",
    section: "Fluid Mechanics",
    difficulty: "basic",
    topic: "Flow Rate",
    category: "Building Services Science"
  },
  {
    id: 106,
    question: "What is cavitation in pumping systems?",
    options: [
      "Air entering the pump inlet",
      "The formation and collapse of vapour bubbles when local pressure drops below the vapour pressure of the liquid",
      "Corrosion of pump impellers",
      "Excessive flow rate"
    ],
    correctAnswer: 1,
    explanation: "Cavitation occurs when local pressure in a pump falls below the liquid's vapour pressure, causing vapour bubbles to form. When these bubbles collapse in higher pressure regions, they cause noise, vibration, erosion, and reduced efficiency.",
    section: "Fluid Mechanics",
    difficulty: "intermediate",
    topic: "Cavitation",
    category: "Building Services Science"
  },
  {
    id: 107,
    question: "What is NPSH in pump terminology?",
    options: [
      "Normal Pump Speed Hours",
      "Net Positive Suction Head - the pressure available at the pump inlet above the liquid's vapour pressure",
      "Non-Pressurised System Header",
      "Nominal Pipe Size Hydraulic"
    ],
    correctAnswer: 1,
    explanation: "Net Positive Suction Head (NPSH) is the total suction head at the pump inlet above the vapour pressure. NPSHa (available) must exceed NPSHr (required by the pump) to prevent cavitation. It's critical in pump selection and installation design.",
    section: "Fluid Mechanics",
    difficulty: "advanced",
    topic: "Pump Characteristics",
    category: "Building Services Science"
  },
  {
    id: 108,
    question: "What is the purpose of an expansion vessel in a sealed heating system?",
    options: [
      "To increase water pressure",
      "To accommodate the expansion of water as it heats up, maintaining safe system pressure",
      "To filter the water",
      "To heat the water"
    ],
    correctAnswer: 1,
    explanation: "An expansion vessel contains a rubber diaphragm with air/nitrogen on one side. As water expands when heated, it compresses this gas cushion, accommodating the volume increase without excessive pressure rise. It replaces the feed and expansion cistern in sealed systems.",
    section: "Fluid Mechanics",
    difficulty: "basic",
    topic: "Expansion Vessels",
    category: "Building Services Science"
  },
  {
    id: 109,
    question: "What is the typical water expansion rate when heated from 10°C to 80°C?",
    options: [
      "Approximately 1%",
      "Approximately 3-4%",
      "Approximately 10%",
      "Approximately 20%"
    ],
    correctAnswer: 1,
    explanation: "Water expands approximately 3-4% when heated from cold fill temperature (around 10°C) to typical operating temperature (around 80°C). This expansion must be accommodated by the expansion vessel, which is sized accordingly.",
    section: "Fluid Mechanics",
    difficulty: "intermediate",
    topic: "Water Expansion",
    category: "Building Services Science"
  },
  {
    id: 110,
    question: "What is the affinity law relationship between pump speed and flow rate?",
    options: [
      "Flow rate is inversely proportional to speed",
      "Flow rate is directly proportional to speed (Q₁/Q₂ = N₁/N₂)",
      "Flow rate is proportional to the square of speed",
      "Flow rate is independent of speed"
    ],
    correctAnswer: 1,
    explanation: "The pump affinity laws state: flow rate varies directly with speed (Q₁/Q₂ = N₁/N₂), head varies with the square of speed, and power varies with the cube of speed. These enable variable speed pump control calculations.",
    section: "Fluid Mechanics",
    difficulty: "advanced",
    topic: "Pump Laws",
    category: "Building Services Science"
  },

  // Psychrometrics (Questions 111-120)
  {
    id: 111,
    question: "What is psychrometrics?",
    options: [
      "The study of mental health",
      "The study of the thermodynamic properties of moist air and the relationships between them",
      "The study of pressure in buildings",
      "The study of sound in buildings"
    ],
    correctAnswer: 1,
    explanation: "Psychrometrics is the study of moist air properties and their interrelationships. It's fundamental to HVAC design, covering humidity, dew point, wet/dry bulb temperatures, enthalpy, and how these change during heating, cooling, and humidification processes.",
    section: "Psychrometrics",
    difficulty: "basic",
    topic: "Definition",
    category: "Building Services Science"
  },
  {
    id: 112,
    question: "What is relative humidity?",
    options: [
      "The weight of water in air",
      "The ratio of actual water vapour pressure to the saturation vapour pressure at the same temperature, expressed as a percentage",
      "The temperature at which air becomes saturated",
      "The total pressure of moist air"
    ],
    correctAnswer: 1,
    explanation: "Relative humidity (RH) is the ratio of actual water vapour pressure to the saturation vapour pressure at the same dry bulb temperature, expressed as percentage. RH of 100% means the air is saturated and condensation will occur if cooled further.",
    section: "Psychrometrics",
    difficulty: "basic",
    topic: "Relative Humidity",
    category: "Building Services Science"
  },
  {
    id: 113,
    question: "What is the dew point temperature?",
    options: [
      "The highest temperature in a day",
      "The temperature at which air becomes saturated and water vapour begins to condense",
      "The temperature of morning dew",
      "The average daily temperature"
    ],
    correctAnswer: 1,
    explanation: "Dew point is the temperature at which air becomes saturated (RH = 100%) if cooled at constant pressure and moisture content. Below dew point, condensation occurs. It's crucial for predicting condensation risk on cold surfaces.",
    section: "Psychrometrics",
    difficulty: "basic",
    topic: "Dew Point",
    category: "Building Services Science"
  },
  {
    id: 114,
    question: "What is the difference between dry bulb and wet bulb temperature?",
    options: [
      "Dry bulb is measured in shade, wet bulb in sun",
      "Dry bulb is air temperature; wet bulb is the temperature measured by a thermometer with a wet wick, showing evaporative cooling effect",
      "Dry bulb is for summer, wet bulb for winter",
      "There is no difference"
    ],
    correctAnswer: 1,
    explanation: "Dry bulb temperature is the actual air temperature. Wet bulb temperature is measured by a thermometer with a wetted wick, showing the cooling effect of evaporation. The wet bulb is always equal to or lower than dry bulb; the difference indicates humidity level.",
    section: "Psychrometrics",
    difficulty: "intermediate",
    topic: "Temperature Types",
    category: "Building Services Science"
  },
  {
    id: 115,
    question: "On a psychrometric chart, what do the horizontal lines represent?",
    options: [
      "Lines of constant relative humidity",
      "Lines of constant enthalpy",
      "Lines of constant moisture content (humidity ratio)",
      "Lines of constant wet bulb temperature"
    ],
    correctAnswer: 2,
    explanation: "On a psychrometric chart, horizontal lines represent constant moisture content (humidity ratio or specific humidity), measured in kg moisture per kg dry air. Reading along these lines shows how temperature changes affect air properties at constant moisture content.",
    section: "Psychrometrics",
    difficulty: "intermediate",
    topic: "Psychrometric Chart",
    category: "Building Services Science"
  },
  {
    id: 116,
    question: "What is the typical recommended relative humidity range for human comfort in occupied buildings?",
    options: [
      "10-20%",
      "40-60%",
      "80-90%",
      "90-100%"
    ],
    correctAnswer: 1,
    explanation: "The typical comfort range for relative humidity is 40-60%. Below 40% can cause dry skin, static electricity, and respiratory discomfort. Above 60% promotes mould growth, dust mites, and feels oppressive. CIBSE recommends maintaining this range.",
    section: "Psychrometrics",
    difficulty: "basic",
    topic: "Comfort Conditions",
    category: "Building Services Science"
  },
  {
    id: 117,
    question: "In an air conditioning process, what happens during sensible cooling?",
    options: [
      "Both temperature and moisture content decrease",
      "Temperature decreases but moisture content remains constant (moving left horizontally on psychrometric chart)",
      "Moisture content increases",
      "Relative humidity decreases"
    ],
    correctAnswer: 1,
    explanation: "During sensible cooling, air temperature decreases but moisture content remains constant - shown as horizontal movement left on a psychrometric chart. Relative humidity increases because cooler air can hold less moisture, even though absolute moisture content is unchanged.",
    section: "Psychrometrics",
    difficulty: "intermediate",
    topic: "Air Conditioning Processes",
    category: "Building Services Science"
  },
  {
    id: 118,
    question: "What is the Apparatus Dew Point (ADP) in cooling coil design?",
    options: [
      "The room dew point temperature",
      "The temperature of the cooling coil surface where air would reach saturation (100% RH) if in perfect contact",
      "The outdoor dew point",
      "The refrigerant temperature"
    ],
    correctAnswer: 1,
    explanation: "The Apparatus Dew Point is the effective surface temperature of a cooling coil. Air in contact with this surface would be cooled and dehumidified along a line toward the ADP on a psychrometric chart. It's used to determine the coil bypass factor.",
    section: "Psychrometrics",
    difficulty: "advanced",
    topic: "Cooling Coil Design",
    category: "Building Services Science"
  },
  {
    id: 119,
    question: "What is specific enthalpy of air and what are its typical units?",
    options: [
      "The total heat content per unit mass of dry air, typically kJ/kg dry air",
      "The temperature of air in Kelvin",
      "The pressure of air in Pascals",
      "The density of air in kg/m³"
    ],
    correctAnswer: 0,
    explanation: "Specific enthalpy is the total heat content (sensible + latent) per unit mass of dry air, expressed in kJ/kg dry air. It includes both the sensible heat of the air and the latent heat of the water vapour. It's essential for cooling/heating load calculations.",
    section: "Psychrometrics",
    difficulty: "intermediate",
    topic: "Enthalpy",
    category: "Building Services Science"
  },
  {
    id: 120,
    question: "What is the coil bypass factor in air conditioning?",
    options: [
      "The percentage of air that doesn't flow through the coil",
      "The fraction of air that passes through the coil unchanged, without contacting the coil surface",
      "The efficiency of the compressor",
      "The filter effectiveness"
    ],
    correctAnswer: 1,
    explanation: "The coil bypass factor (BF) represents the fraction of air passing through without contacting the cooling/heating coil surface. A BF of 0.1 means 10% of the air bypasses the coil effect. Lower BF indicates a more effective coil with more rows or fins.",
    section: "Psychrometrics",
    difficulty: "advanced",
    topic: "Coil Performance",
    category: "Building Services Science"
  },

  // Building Physics (Questions 121-125)
  {
    id: 121,
    question: "What is interstitial condensation?",
    options: [
      "Condensation on window surfaces",
      "Condensation that occurs within the layers of a building element when the temperature drops below the dew point",
      "Condensation in the roof space",
      "Condensation from breathing"
    ],
    correctAnswer: 1,
    explanation: "Interstitial condensation occurs within building fabric layers when water vapour diffusing through encounters temperatures below its dew point. Unlike surface condensation, it's hidden and can cause serious structural damage, mould, and reduced insulation performance.",
    section: "Building Physics",
    difficulty: "intermediate",
    topic: "Condensation",
    category: "Building Services Science"
  },
  {
    id: 122,
    question: "What is the purpose of a vapour control layer (VCL) in building construction?",
    options: [
      "To provide structural support",
      "To reduce the rate of water vapour diffusion into the building fabric, reducing interstitial condensation risk",
      "To increase ventilation",
      "To provide fire resistance"
    ],
    correctAnswer: 1,
    explanation: "A vapour control layer restricts water vapour diffusion through the building fabric, typically positioned on the warm side of insulation. It reduces interstitial condensation risk by preventing warm moist air from reaching cold zones where condensation could occur.",
    section: "Building Physics",
    difficulty: "intermediate",
    topic: "Vapour Control",
    category: "Building Services Science"
  },
  {
    id: 123,
    question: "What is the Glaser method used for in building physics?",
    options: [
      "Calculating structural loads",
      "Assessing the risk of interstitial condensation by comparing vapour pressure profile with saturation pressure profile",
      "Measuring air infiltration",
      "Testing fire resistance"
    ],
    correctAnswer: 1,
    explanation: "The Glaser method (steady-state analysis) plots vapour pressure and saturation pressure through a building element. Where vapour pressure exceeds saturation pressure, condensation will occur. It helps assess and prevent interstitial condensation risk in building design.",
    section: "Building Physics",
    difficulty: "advanced",
    topic: "Condensation Analysis",
    category: "Building Services Science"
  },
  {
    id: 124,
    question: "What is air infiltration and how is it typically measured?",
    options: [
      "Deliberate ventilation through mechanical systems",
      "Uncontrolled air leakage through gaps and cracks, measured in air changes per hour (ach) or m³/h/m² at 50 Pa",
      "Air flow through windows",
      "Air flow through HVAC ducts"
    ],
    correctAnswer: 1,
    explanation: "Air infiltration is uncontrolled air leakage through cracks, gaps, and openings in the building envelope. It's measured by pressurisation testing, typically expressed as m³/h/m² of envelope area at 50 Pa pressure difference (q50), or air changes per hour (n50).",
    section: "Building Physics",
    difficulty: "intermediate",
    topic: "Air Tightness",
    category: "Building Services Science"
  },
  {
    id: 125,
    question: "According to Building Regulations Part L, what is the maximum design air permeability for new dwellings?",
    options: [
      "5 m³/(h.m²) at 50 Pa",
      "8 m³/(h.m²) at 50 Pa",
      "10 m³/(h.m²) at 50 Pa",
      "15 m³/(h.m²) at 50 Pa"
    ],
    correctAnswer: 1,
    explanation: "Building Regulations Approved Document L specifies a maximum design air permeability of 8 m³/(h.m²) at 50 Pa for new dwellings, with testing required to demonstrate compliance. Lower values (typically 3-5) are needed for Passivhaus standards.",
    section: "Building Physics",
    difficulty: "intermediate",
    topic: "Building Regulations",
    category: "Building Services Science"
  }
];

export default questionsPart1;
