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
    question:
      'Under Section 2(2)(a) of HASAWA 1974, what specific duty does an employer have regarding plant and systems of work?',
    options: [
      'To carry out the work themselves rather than delegate it to a competent contractor',
      'To provide and maintain plant and systems of work that are, so far as is reasonably practicable, safe and without risks to health',
      'To ensure plant and systems of work meet the requirements only where employees specifically request it',
      'To provide plant and systems that are absolutely safe regardless of cost or practicability',
    ],
    correctAnswer: 1,
    explanation:
      'Section 2(2)(a) of HASAWA 1974 specifically requires employers to provide and maintain plant and systems of work that are, so far as is reasonably practicable, safe and without risks to health. This includes regular maintenance and inspection regimes.',
    section: 'HASAWA',
    difficulty: 'basic',
    topic: 'Employer Duties',
    category: 'Health & Safety',
  },
  {
    id: 2,
    question:
      'What is the maximum penalty for breach of HASAWA 1974 following conviction on indictment for causing death?',
    options: [
      '6 months imprisonment',
      '2 years imprisonment',
      'Unlimited fine and/or imprisonment',
      'Unlimited fine only',
    ],
    correctAnswer: 2,
    explanation:
      'Following the Legal Aid, Sentencing and Punishment of Offenders Act 2012, breaches of HASAWA on indictment can result in unlimited fines. For the most serious offences causing death, courts can impose both unlimited fines and imprisonment.',
    section: 'HASAWA',
    difficulty: 'intermediate',
    topic: 'Penalties',
    category: 'Health & Safety',
  },
  {
    id: 3,
    question:
      'Under Section 6 of HASAWA, who has duties regarding articles and substances for use at work?',
    options: [
      'Only the employer who purchases the articles for use at work',
      'Only the end user who operates the articles or handles the substances',
      'The Health and Safety Executive as the body that approves such articles',
      'Designers, manufacturers, importers, and suppliers',
    ],
    correctAnswer: 3,
    explanation:
      'Section 6 of HASAWA places duties on designers, manufacturers, importers, and suppliers to ensure that articles and substances for use at work are safe and without risks to health when properly used.',
    section: 'HASAWA',
    difficulty: 'basic',
    topic: 'Supply Chain Duties',
    category: 'Health & Safety',
  },
  {
    id: 4,
    question: 'What distinguishes an HSE Improvement Notice from a Prohibition Notice?',
    options: [
      'Prohibition Notices require immediate cessation of activity due to imminent risk of serious personal injury',
      'Improvement Notices can only be issued by a court, whereas Prohibition Notices are issued by an HSE inspector',
      'Prohibition Notices apply only to construction sites, whereas Improvement Notices apply to all workplaces',
      'Improvement Notices require the activity to stop immediately, whereas Prohibition Notices allow a fixed period to comply',
    ],
    correctAnswer: 0,
    explanation:
      'A Prohibition Notice is issued when an inspector believes there is a risk of serious personal injury and requires the activity to stop immediately or within a specified time. An Improvement Notice requires improvements within a specified period but does not require immediate cessation.',
    section: 'HASAWA',
    difficulty: 'intermediate',
    topic: 'Enforcement',
    category: 'Health & Safety',
  },
  {
    id: 5,
    question:
      'Under Section 37 of HASAWA, when can a director or senior manager be personally prosecuted?',
    options: [
      'Only when the company itself has already been convicted of the same offence',
      'When an offence is committed with their consent, connivance, or is attributable to their neglect',
      'Only when the director personally carried out the unsafe act that caused the offence',
      'When any employee under their authority breaches a health and safety requirement',
    ],
    correctAnswer: 1,
    explanation:
      'Section 37 of HASAWA allows for the prosecution of directors and senior managers where a corporate offence is committed with their consent or connivance, or is attributable to their neglect. This establishes personal accountability for senior management.',
    section: 'HASAWA',
    difficulty: 'advanced',
    topic: 'Corporate Liability',
    category: 'Health & Safety',
  },
  {
    id: 6,
    question: 'What is the legal status of an Approved Code of Practice (ACoP) under HASAWA?',
    options: [
      'It is legally binding in the same way as the regulations it supports, with no alternatives permitted',
      'It has no legal standing whatsoever and is purely advisory guidance from industry bodies',
      'Following it is not mandatory, but failure to comply can be used as evidence of non-compliance with the law',
      'It applies only to employers with fewer than five employees who lack a written safety policy',
    ],
    correctAnswer: 2,
    explanation:
      'An ACoP has a special legal status. Following the ACoP is not mandatory, but if prosecuted for breach of the relevant legislation, failure to follow the ACoP can be used as evidence against you. You must show that you complied in an equally effective way.',
    section: 'HASAWA',
    difficulty: 'intermediate',
    topic: 'Legal Framework',
    category: 'Health & Safety',
  },
  {
    id: 7,
    question:
      'Section 2(3) of HASAWA requires employers to prepare a written safety policy when they employ how many or more employees?',
    options: [
      '1 or more',
      '3 or more',
      '10 or more',
      '5 or more',
    ],
    correctAnswer: 3,
    explanation:
      'Section 2(3) of HASAWA 1974 requires employers with 5 or more employees to prepare and keep up to date a written statement of their general health and safety policy and bring it to the attention of all employees.',
    section: 'HASAWA',
    difficulty: 'basic',
    topic: 'Safety Policy',
    category: 'Health & Safety',
  },
  {
    id: 8,
    question:
      "Under HASAWA, what constitutes 'reasonably practicable' when assessing control measures?",
    options: [
      'A balance between the risk and the sacrifice (money, time, trouble) needed to avert it',
      'Implementing every conceivable control measure regardless of the cost or effort involved',
      'Doing only what is technically possible, with cost being an irrelevant consideration',
      'Following whatever measures are cheapest to implement for the business at the time',
    ],
    correctAnswer: 0,
    explanation:
      'Reasonably practicable involves weighing the quantum of risk against the sacrifice (money, time, trouble) needed to avert it. If the risk is insignificant compared to the sacrifice, the measure is not reasonably practicable. The greater the risk, the less weight given to cost.',
    section: 'HASAWA',
    difficulty: 'intermediate',
    topic: 'Risk Assessment',
    category: 'Health & Safety',
  },
  {
    id: 9,
    question: 'What does Section 9 of HASAWA prohibit regarding health and safety provisions?',
    options: [
      'Disclosing the findings of any internal accident investigation to the workforce',
      'Charging employees for anything provided in pursuance of health and safety requirements',
      'Dismissing an employee who raises a genuine health and safety concern',
      'Providing personal protective equipment to employees who are self-employed contractors',
    ],
    correctAnswer: 1,
    explanation:
      'Section 9 of HASAWA prohibits employers from charging employees for anything provided in pursuance of any specific health and safety requirement. This includes PPE, training, and health surveillance required by law.',
    section: 'HASAWA',
    difficulty: 'basic',
    topic: 'Employee Rights',
    category: 'Health & Safety',
  },
  {
    id: 10,
    question:
      'Under the Corporate Manslaughter and Corporate Homicide Act 2007, what must be proven for a successful prosecution?',
    options: [
      'That a single named director personally intended for the fatal incident to occur',
      'That the organisation failed to display the approved health and safety law poster',
      'That senior management failures were a substantial element in the gross breach of duty of care',
      'That the deceased was an employee rather than a member of the public or contractor',
    ],
    correctAnswer: 2,
    explanation:
      "The Corporate Manslaughter and Corporate Homicide Act 2007 requires proof that the way the organisation's activities were managed or organised by senior management was a substantial element in the gross breach of a relevant duty of care, causing death.",
    section: 'HASAWA',
    difficulty: 'advanced',
    topic: 'Corporate Liability',
    category: 'Health & Safety',
  },
  {
    id: 11,
    question: 'What is the primary purpose of the Health and Safety (Offences) Act 2008?',
    options: [
      'To transfer enforcement responsibility from the HSE to local authorities',
      'To remove the right to a custodial sentence for health and safety breaches',
      'To require all employers to hold employers’ liability compulsory insurance',
      'To increase penalties and make more offences triable either way',
    ],
    correctAnswer: 3,
    explanation:
      "The Health and Safety (Offences) Act 2008 increased the maximum penalties available for health and safety offences and made certain offences triable either way (in magistrates' or crown court), allowing for more severe sentences.",
    section: 'HASAWA',
    difficulty: 'intermediate',
    topic: 'Penalties',
    category: 'Health & Safety',
  },
  {
    id: 12,
    question:
      'Under HASAWA, what must employers do in relation to safety representatives appointed by recognised trade unions?',
    options: [
      'Consult with them in good time on health and safety matters',
      'Obtain their written approval before introducing any new work procedure',
      'Pay them an additional allowance for undertaking the safety representative role',
      'Provide them with the authority to issue Prohibition Notices to other employees',
    ],
    correctAnswer: 0,
    explanation:
      'Under the Safety Representatives and Safety Committees Regulations 1977 (made under HASAWA), employers must consult with trade union appointed safety representatives in good time on matters affecting the health and safety of employees they represent.',
    section: 'HASAWA',
    difficulty: 'intermediate',
    topic: 'Consultation',
    category: 'Health & Safety',
  },

  // CDM Regulations 2015 (Questions 13-24)
  {
    id: 13,
    question: 'Under CDM 2015, when must a principal designer be appointed?',
    options: [
      'On every construction project regardless of size, duration, or number of contractors',
      'When there is more than one contractor or the project involves particular risks',
      'Only on projects that are notifiable to the HSE under the 30-day or 500-person-day threshold',
      'Only when the client specifically requests one in the pre-construction information',
    ],
    correctAnswer: 1,
    explanation:
      'Under CDM 2015, a principal designer must be appointed when there is more than one contractor, or when construction work involves particular risks as listed in Schedule 3. They coordinate health and safety during the pre-construction phase.',
    section: 'CDM 2015',
    difficulty: 'basic',
    topic: 'Duty Holders',
    category: 'Health & Safety',
  },
  {
    id: 14,
    question: "What is the principal contractor's primary duty under CDM 2015 Regulation 13?",
    options: [
      'To prepare the pre-construction information and issue it to the design team',
      'To approve the final design before any construction work may begin on site',
      'To plan, manage, and monitor the construction phase to ensure work is carried out without risks to health and safety',
      'To compile and hand the completed health and safety file directly to the building owner',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 13 of CDM 2015 requires the principal contractor to plan, manage, and monitor the construction phase in a way that ensures, so far as is reasonably practicable, that construction work is carried out without risks to health and safety.',
    section: 'CDM 2015',
    difficulty: 'intermediate',
    topic: 'Principal Contractor',
    category: 'Health & Safety',
  },
  {
    id: 15,
    question: 'Under CDM 2015, what must the construction phase plan contain as a minimum?',
    options: [
      'A full bill of quantities and the agreed contract price for the construction works',
      'The names and contact details of every operative who will work on the site',
      'A detailed financial breakdown of the health and safety budget for the project',
      'Arrangements for managing significant health and safety risks, including site rules',
    ],
    correctAnswer: 3,
    explanation:
      'The construction phase plan must include arrangements for managing significant health and safety risks, site rules, and any specific measures for work involving particular risks listed in Schedule 3 of CDM 2015.',
    section: 'CDM 2015',
    difficulty: 'intermediate',
    topic: 'Construction Phase Plan',
    category: 'Health & Safety',
  },
  {
    id: 16,
    question: 'What information must be included in the health and safety file under CDM 2015?',
    options: [
      'Information likely to be needed during future construction work, including cleaning, maintenance, and demolition',
      'A daily record of attendance and hours worked by every operative on the site',
      'The minutes of all site safety meetings held during the construction phase',
      'Copies of all invoices and payment certificates issued during the project',
    ],
    correctAnswer: 0,
    explanation:
      'The health and safety file must contain information about the project that is likely to be needed during any subsequent construction work, including maintenance, repair, renovation, or demolition. This includes as-built drawings, specifications, and details of hidden services.',
    section: 'CDM 2015',
    difficulty: 'basic',
    topic: 'Health and Safety File',
    category: 'Health & Safety',
  },
  {
    id: 17,
    question: "Under CDM 2015, who is the 'client' on a domestic project?",
    options: [
      'The local authority building control department for the area where the work is carried out',
      'The domestic client, but their duties pass to other duty holders as specified',
      'The principal designer, who always assumes the role of client on domestic projects',
      'The HSE, which acts as the client for all construction work on private dwellings',
    ],
    correctAnswer: 1,
    explanation:
      'On domestic projects, the householder is the domestic client but is not required to carry out client duties. These duties automatically pass to other duty holders - typically the contractor, or principal contractor/principal designer if appointed.',
    section: 'CDM 2015',
    difficulty: 'intermediate',
    topic: 'Domestic Projects',
    category: 'Health & Safety',
  },
  {
    id: 18,
    question: 'What triggers the requirement for a project to be notifiable under CDM 2015?',
    options: [
      'Any project where the construction work will cost more than £100,000 in total',
      'Any project involving more than one contractor, irrespective of its duration',
      'Projects lasting more than 30 working days with more than 20 workers working simultaneously, or exceeding 500 person days',
      'Any project that involves work at height or excavation deeper than two metres',
    ],
    correctAnswer: 2,
    explanation:
      'Under CDM 2015, a project is notifiable if it lasts more than 30 working days and has more than 20 workers working simultaneously at any point, OR if the project exceeds 500 person days of construction work.',
    section: 'CDM 2015',
    difficulty: 'basic',
    topic: 'Notification',
    category: 'Health & Safety',
  },
  {
    id: 19,
    question:
      'Under Regulation 8 of CDM 2015, what must a client do before the construction phase begins?',
    options: [
      'Personally prepare and sign off the project risk assessments and method statements',
      'Notify the local authority building control department of the intended start date',
      'Obtain written confirmation from the HSE that the project may proceed',
      'Ensure a construction phase plan is drawn up by the contractor or principal contractor',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 8 requires the client to ensure that before the construction phase begins, a construction phase plan is drawn up by the contractor (for single contractor projects) or the principal contractor (for projects with multiple contractors).',
    section: 'CDM 2015',
    difficulty: 'intermediate',
    topic: 'Client Duties',
    category: 'Health & Safety',
  },
  {
    id: 20,
    question: "What is a 'particular risk' under Schedule 3 of CDM 2015?",
    options: [
      'Risks arising from work that involves specific hazards such as work near high voltage power lines, in cofferdams, or involving diving',
      'Any work that requires the use of personal protective equipment by operatives',
      'Routine maintenance tasks carried out by a single competent contractor',
      'Risks that arise only after the project has been handed over to the client',
    ],
    correctAnswer: 0,
    explanation:
      'Schedule 3 lists work involving particular risks including: work near high voltage power lines; work with risks of drowning; work in wells, caissons, or cofferdams; work involving diving; work in compressed air; and work involving explosives.',
    section: 'CDM 2015',
    difficulty: 'intermediate',
    topic: 'Particular Risks',
    category: 'Health & Safety',
  },
  {
    id: 21,
    question: 'Under CDM 2015, what duty does Regulation 15 place on contractors?',
    options: [
      'To appoint the principal designer on behalf of the client for the project',
      'To not employ or appoint a person unless satisfied they have the necessary skills, knowledge, and experience',
      'To prepare and maintain the health and safety file throughout the project',
      'To notify the HSE directly of any project lasting more than 30 working days',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 15 requires contractors to not employ or appoint any person to work on a construction site unless they are satisfied that person has, or is in the process of obtaining, the necessary skills, knowledge, training, and experience.',
    section: 'CDM 2015',
    difficulty: 'basic',
    topic: 'Worker Competence',
    category: 'Health & Safety',
  },
  {
    id: 22,
    question:
      "What is the principal designer's key responsibility during the pre-construction phase?",
    options: [
      'To supervise the day-to-day construction activities once work begins on site',
      'To approve payment applications submitted by the principal contractor',
      'To plan, manage, and coordinate health and safety during the pre-construction phase, including identifying and eliminating or controlling foreseeable risks',
      'To carry out the structural and architectural design of the building itself',
    ],
    correctAnswer: 2,
    explanation:
      'The principal designer must plan, manage, and coordinate health and safety during the pre-construction phase. This includes identifying, eliminating or controlling foreseeable risks, ensuring designers comply with their duties, and preparing and developing the health and safety file.',
    section: 'CDM 2015',
    difficulty: 'intermediate',
    topic: 'Principal Designer',
    category: 'Health & Safety',
  },
  {
    id: 23,
    question: 'Under CDM 2015, what is the hierarchy of risk control that designers must apply?',
    options: [
      'Warning signs, barriers, supervision',
      'PPE, training, elimination',
      'Documentation, insurance, monitoring',
      'Elimination, reduction, information provision',
    ],
    correctAnswer: 3,
    explanation:
      'Designers must apply the general principles of prevention. The hierarchy is: eliminate hazards through design; where not possible, reduce risks; provide information about remaining risks. This is often summarised as eliminate, reduce, inform.',
    section: 'CDM 2015',
    difficulty: 'advanced',
    topic: 'Design Risk Management',
    category: 'Health & Safety',
  },
  {
    id: 24,
    question:
      'When does the duty to prepare and update the health and safety file transfer from the principal designer to the principal contractor?',
    options: [
      "When the principal designer's appointment ends before the construction phase is complete",
      "As soon as the construction phase plan has been approved by the client",
      "Only after the project has been formally handed over to the client",
      "When the HSE requests a copy of the file during an inspection",
    ],
    correctAnswer: 0,
    explanation:
      "If the principal designer's appointment finishes before the end of the project, they must pass the health and safety file to the principal contractor, who then takes on the duty to review, update, and eventually deliver the completed file to the client.",
    section: 'CDM 2015',
    difficulty: 'advanced',
    topic: 'Health and Safety File',
    category: 'Health & Safety',
  },

  // RIDDOR (Questions 25-32)
  {
    id: 25,
    question:
      'Under RIDDOR 2013, within what timeframe must a fatality or specified injury be reported to the HSE?',
    options: [
      'Within 24 hours, with a written report to follow within 30 days',
      'Without delay, and a report must be sent within 10 days',
      'Within 7 days, with no further written report required afterwards',
      'Within 15 days of the incident occurring, by written report only',
    ],
    correctAnswer: 1,
    explanation:
      'Deaths and specified injuries must be reported without delay, typically by telephone to the HSE or via the online reporting form immediately. A written report must follow within 10 days of the incident.',
    section: 'RIDDOR',
    difficulty: 'basic',
    topic: 'Reporting Timeframes',
    category: 'Health & Safety',
  },
  {
    id: 26,
    question: "Which of the following is classified as a 'specified injury' under RIDDOR 2013?",
    options: [
      'A minor cut requiring first aid',
      'A strain causing one day off work',
      'A fracture, other than to fingers, thumbs, or toes',
      'Bruising requiring no medical treatment',
    ],
    correctAnswer: 2,
    explanation:
      'Specified injuries under RIDDOR include fractures (other than to fingers, thumbs, or toes), amputations, permanent loss of sight or reduction in sight, crush injuries leading to internal organ damage, scalping, and any burn or injury leading to hypothermia or unconsciousness.',
    section: 'RIDDOR',
    difficulty: 'basic',
    topic: 'Specified Injuries',
    category: 'Health & Safety',
  },
  {
    id: 27,
    question: 'Under RIDDOR 2013, what is the reporting threshold for over-7-day incapacitation?',
    options: [
      'An injury that keeps the worker off work for any period, however short',
      'An injury that results in the worker being incapacitated for more than 3 consecutive days',
      'An injury that requires the worker to attend hospital but causes no absence from work',
      'An injury that results in the worker being incapacitated for more than 7 consecutive days, not counting the day of the injury',
    ],
    correctAnswer: 3,
    explanation:
      'Under RIDDOR 2013, injuries that result in the worker being incapacitated for more than 7 consecutive days (not counting the day of the injury) must be reported within 15 days. This replaced the previous over-3-day reporting requirement.',
    section: 'RIDDOR',
    difficulty: 'intermediate',
    topic: 'Reporting Thresholds',
    category: 'Health & Safety',
  },
  {
    id: 28,
    question:
      'Which occupational diseases are reportable under RIDDOR when linked to specified work activities?',
    options: [
      'Carpal tunnel syndrome from work involving hand-held vibrating tools',
      'Seasonal influenza contracted by an office worker during the winter months',
      'Lower back pain reported by a worker with no identifiable workplace cause',
      'Mild eye strain experienced by a worker using a display screen for short periods',
    ],
    correctAnswer: 0,
    explanation:
      'RIDDOR requires reporting of specific occupational diseases when linked to specified activities. Carpal tunnel syndrome linked to work involving hand-held vibrating tools is reportable. Other reportable diseases include occupational dermatitis, asthma, and hand-arm vibration syndrome.',
    section: 'RIDDOR',
    difficulty: 'intermediate',
    topic: 'Occupational Diseases',
    category: 'Health & Safety',
  },
  {
    id: 29,
    question: "Under RIDDOR, what constitutes a 'dangerous occurrence' that must be reported?",
    options: [
      'Any near miss observed on site, regardless of its potential to cause harm',
      'Events specified in Schedule 2, such as collapse of scaffolding, electrical incidents causing fire, or explosion',
      'Any incident that results in an employee taking a single day off work',
      'Any breach of a site rule recorded by the principal contractor',
    ],
    correctAnswer: 1,
    explanation:
      'Dangerous occurrences are specific events listed in Schedule 2 of RIDDOR that must be reported because they have the potential to cause significant harm. These include scaffold collapse, crane collapse, electrical incidents causing fire or explosion, and incidents involving pipelines.',
    section: 'RIDDOR',
    difficulty: 'intermediate',
    topic: 'Dangerous Occurrences',
    category: 'Health & Safety',
  },
  {
    id: 30,
    question: "Who is the 'responsible person' required to make RIDDOR reports?",
    options: [
      'The injured person themselves, who must report their own injury to the HSE',
      'The first aider who treated the casualty at the scene of the incident',
      'The employer, self-employed person, or person in control of the premises where work is carried out',
      'The HSE inspector assigned to investigate the workplace where the incident occurred',
    ],
    correctAnswer: 2,
    explanation:
      'The responsible person is the employer (for employees), the self-employed person (for incidents involving them or their work), or the person in control of the premises where work is carried out (for incidents involving non-workers).',
    section: 'RIDDOR',
    difficulty: 'basic',
    topic: 'Reporting Duties',
    category: 'Health & Safety',
  },
  {
    id: 31,
    question: 'Under RIDDOR, what records must be kept and for how long?',
    options: [
      'Records of reportable incidents must be kept for at least 1 year from the date of the incident',
      'Records of reportable incidents must be kept for at least 6 months and then destroyed',
      'Records of reportable incidents must be retained permanently for the life of the business',
      'Records of all reportable incidents must be kept for at least 3 years from the date of the incident',
    ],
    correctAnswer: 3,
    explanation:
      'Records of reportable incidents must be kept for at least 3 years from the date on which the record was made. The record can be kept in any form but must contain specific information including date, details of the injured person, and nature of the injury.',
    section: 'RIDDOR',
    difficulty: 'basic',
    topic: 'Record Keeping',
    category: 'Health & Safety',
  },
  {
    id: 32,
    question:
      'What is the reporting requirement for a non-fatal accident to a non-worker (member of the public) on premises under RIDDOR?',
    options: [
      'Only if the person is taken directly from the site to hospital for treatment',
      'Only if the injured member of the public makes a formal complaint to the HSE',
      'All such accidents must be reported regardless of the severity of the injury',
      'Only if the person is absent from their own work for more than seven days',
    ],
    correctAnswer: 0,
    explanation:
      'Under RIDDOR, accidents to non-workers must be reported if the person is taken directly from the site of the accident to a hospital for treatment of their injury. This applies to incidents arising out of or in connection with work activities.',
    section: 'RIDDOR',
    difficulty: 'intermediate',
    topic: 'Non-Worker Injuries',
    category: 'Health & Safety',
  },

  // Risk Assessment (Questions 33-42)
  {
    id: 33,
    question:
      'Under the Management of Health and Safety at Work Regulations 1999, what are the five steps to risk assessment?',
    options: [
      'Inspect, report, isolate, repair, and certify the affected equipment',
      'Identify hazards, decide who might be harmed, evaluate risks, record findings, review and update',
      'Plan, do, check, act, and then archive the completed assessment',
      'Eliminate, substitute, engineer, administer, and provide protective equipment',
    ],
    correctAnswer: 1,
    explanation:
      "The HSE's five steps are: 1) Identify hazards, 2) Decide who might be harmed and how, 3) Evaluate risks and decide on precautions, 4) Record significant findings, 5) Review and update the assessment regularly.",
    section: 'Risk Assessment',
    difficulty: 'basic',
    topic: 'Risk Assessment Process',
    category: 'Health & Safety',
  },
  {
    id: 34,
    question: 'What is the key difference between a hazard and a risk?',
    options: [
      'A hazard is a minor concern; a risk is always a serious and immediate danger',
      'A hazard applies only to people, whereas a risk applies only to equipment',
      'A hazard is something with potential to cause harm; risk is the likelihood of that harm occurring combined with its severity',
      'A hazard is the likelihood of harm; a risk is the source that could cause the harm',
    ],
    correctAnswer: 2,
    explanation:
      'A hazard is anything with the potential to cause harm (e.g., electricity, chemicals, working at height). Risk is the likelihood that harm will occur from exposure to the hazard, combined with the potential severity of that harm.',
    section: 'Risk Assessment',
    difficulty: 'basic',
    topic: 'Hazard vs Risk',
    category: 'Health & Safety',
  },
  {
    id: 35,
    question: 'What is the hierarchy of control measures in risk management?',
    options: [
      'PPE, administrative controls, engineering controls, substitution, elimination',
      'Warning signs, supervision, training, insurance, documentation',
      'Identify hazards, decide who might be harmed, evaluate risks, record findings, review and update',
      'Elimination, substitution, engineering controls, administrative controls, PPE',
    ],
    correctAnswer: 3,
    explanation:
      'The hierarchy of controls prioritises: 1) Elimination - remove the hazard entirely, 2) Substitution - replace with something less hazardous, 3) Engineering controls - isolate people from the hazard, 4) Administrative controls - change working practices, 5) PPE - last resort protection.',
    section: 'Risk Assessment',
    difficulty: 'intermediate',
    topic: 'Control Hierarchy',
    category: 'Health & Safety',
  },
  {
    id: 36,
    question:
      'When calculating a risk rating using a risk matrix, what factors are typically multiplied together?',
    options: [
      'Likelihood and severity',
      'Cost and time',
      'Number of workers and hours worked',
      'Temperature and pressure',
    ],
    correctAnswer: 0,
    explanation:
      'Risk rating is typically calculated as Likelihood (or probability) multiplied by Severity (or consequence). This gives a numerical score that helps prioritise which risks need the most urgent attention.',
    section: 'Risk Assessment',
    difficulty: 'basic',
    topic: 'Risk Rating',
    category: 'Health & Safety',
  },
  {
    id: 37,
    question:
      'Under Regulation 3 of the Management Regulations, when must a risk assessment be reviewed?',
    options: [
      'Only once every five years, regardless of any change in working conditions',
      'When there is reason to suspect it is no longer valid or there has been a significant change',
      'Only after an accident or dangerous occurrence has already taken place',
      'Only when a new employee joins the team carrying out the work',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 3(3) requires employers to review risk assessments where there is reason to suspect it is no longer valid, or where there has been a significant change in the matters to which it relates. This ensures assessments remain current and effective.',
    section: 'Risk Assessment',
    difficulty: 'intermediate',
    topic: 'Review Requirements',
    category: 'Health & Safety',
  },
  {
    id: 38,
    question: 'What is a dynamic risk assessment?',
    options: [
      'A formal written assessment completed in the office before work begins on site',
      'An assessment carried out solely by the HSE during an unannounced inspection',
      'A continuous process of identifying hazards, assessing risks, and implementing controls on site as circumstances change',
      'A computer-generated assessment that automatically updates from sensor data',
    ],
    correctAnswer: 2,
    explanation:
      'A dynamic risk assessment is the continuous process of identifying hazards, assessing risks, and implementing controls as work proceeds and circumstances change. It complements formal written assessments but responds to real-time conditions on site.',
    section: 'Risk Assessment',
    difficulty: 'intermediate',
    topic: 'Dynamic Assessment',
    category: 'Health & Safety',
  },
  {
    id: 39,
    question:
      'Under the Management Regulations, what specific groups must be considered in risk assessments?',
    options: [
      'Only full-time permanent employees with more than two years of service',
      'Only employees who have specifically requested an individual assessment',
      'Only senior managers and directors with legal responsibility for the site',
      'Young persons, new or expectant mothers, and persons with disabilities among others',
    ],
    correctAnswer: 3,
    explanation:
      'Risk assessments must consider vulnerable groups including young persons (under 18), new or expectant mothers, persons with disabilities, and lone workers. These groups may face additional or different risks that require specific control measures.',
    section: 'Risk Assessment',
    difficulty: 'intermediate',
    topic: 'Vulnerable Groups',
    category: 'Health & Safety',
  },
  {
    id: 40,
    question: 'What is the ALARP principle in risk management?',
    options: [
      'As Low As Reasonably Practicable - reducing risk to the lowest level where further reduction would be grossly disproportionate to the benefit',
      'As Low As Realistically Permitted - reducing risk only to the level the budget allows',
      'Always Limit All Risk Potential - eliminating every risk entirely before work proceeds',
      'Assessed Level And Recorded Position - documenting the risk score in the assessment',
    ],
    correctAnswer: 0,
    explanation:
      'ALARP (As Low As Reasonably Practicable) means reducing risk to a level where the cost (in time, money, and effort) of further reduction would be grossly disproportionate to the risk reduction benefit gained. It acknowledges that absolute safety is unachievable.',
    section: 'Risk Assessment',
    difficulty: 'advanced',
    topic: 'ALARP Principle',
    category: 'Health & Safety',
  },
  {
    id: 41,
    question: "What is a 'suitable and sufficient' risk assessment under UK law?",
    options: [
      'An assessment that lists every conceivable hazard, however trivial or unlikely',
      'An assessment proportionate to the risks - identifying significant risks and implementing sensible measures',
      'An assessment carried out only by an external consultant accredited by the HSE',
      'An assessment that focuses solely on the most expensive control measures available',
    ],
    correctAnswer: 1,
    explanation:
      'A suitable and sufficient risk assessment is proportionate to the level of risk. It should identify significant risks, be appropriate to the nature of the work, remain valid for a reasonable period, and enable the employer to implement sensible measures.',
    section: 'Risk Assessment',
    difficulty: 'intermediate',
    topic: 'Legal Requirements',
    category: 'Health & Safety',
  },
  {
    id: 42,
    question:
      'In a quantitative risk assessment, how is the risk level calculated when using a 5x5 matrix with likelihood scores of 1-5 and severity scores of 1-5?',
    options: [
      'By adding likelihood and severity scores together',
      'By averaging the two scores',
      'By multiplying likelihood and severity scores',
      'By taking the higher of the two scores',
    ],
    correctAnswer: 2,
    explanation:
      'In a 5x5 risk matrix, risk level is calculated by multiplying the likelihood score by the severity score. For example, likelihood 3 x severity 4 = risk score of 12. This helps prioritise risks, with higher scores indicating greater priority for control measures.',
    section: 'Risk Assessment',
    difficulty: 'basic',
    topic: 'Risk Calculation',
    category: 'Health & Safety',
  },

  // PPE Regulations (Questions 43-48)
  {
    id: 43,
    question:
      'Under the Personal Protective Equipment at Work Regulations 1992, when should PPE be provided?',
    options: [
      'As the first and primary control measure before any other options are considered',
      'Only to employees who specifically request it in writing from their employer',
      'Whenever it is cheaper than implementing engineering or administrative controls',
      'Only after other control measures have been considered and risks cannot be adequately controlled by other means',
    ],
    correctAnswer: 3,
    explanation:
      'The PPE Regulations require that PPE is provided only as a last resort, after other control measures in the hierarchy have been considered. PPE should only be used when risks cannot be adequately controlled by other means.',
    section: 'PPE',
    difficulty: 'basic',
    topic: 'PPE Hierarchy',
    category: 'Health & Safety',
  },
  {
    id: 44,
    question: 'What does the CE/UKCA marking on PPE signify?',
    options: [
      'That it meets the essential health and safety requirements set out in UK/EU regulations',
      'That the equipment has been personally tested by the employer before issue',
      'That the equipment is guaranteed against wear for the lifetime of the wearer',
      'That the equipment was manufactured within the United Kingdom or European Union',
    ],
    correctAnswer: 0,
    explanation:
      'The CE (EU) or UKCA (UK) marking indicates that the PPE meets the essential health and safety requirements set out in the relevant regulations. It demonstrates conformity with harmonised standards and allows the product to be legally placed on the market.',
    section: 'PPE',
    difficulty: 'basic',
    topic: 'PPE Standards',
    category: 'Health & Safety',
  },
  {
    id: 45,
    question:
      "Under Regulation 7 of the PPE Regulations, what are an employer's duties regarding PPE maintenance?",
    options: [
      'To require employees to purchase and maintain their own protective equipment',
      'To ensure PPE is maintained in an efficient state, in efficient working order, and in good repair',
      'To replace all PPE with new items at the start of every working week',
      'To maintain PPE only when an employee reports that it has failed in use',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 7 requires employers to ensure PPE is maintained (including replaced or cleaned as appropriate) in an efficient state, in efficient working order, and in good repair. This includes regular inspection and proper storage.',
    section: 'PPE',
    difficulty: 'intermediate',
    topic: 'PPE Maintenance',
    category: 'Health & Safety',
  },
  {
    id: 46,
    question: 'According to PPE Regulations, what factors must be considered when selecting PPE?',
    options: [
      'Only the purchase cost and the availability of the equipment from suppliers',
      'Only the colour and branding of the equipment to match company uniform',
      'The risks, ergonomic requirements, health of the wearer, characteristics of the workstation, and compatibility with other PPE',
      'Only the preference of the most senior manager on the site at the time',
    ],
    correctAnswer: 2,
    explanation:
      'When selecting PPE, employers must consider: the risks involved, ergonomic requirements and health of the wearer, characteristics of the workstation, how the PPE fits, and compatibility with other PPE that must be worn simultaneously.',
    section: 'PPE',
    difficulty: 'intermediate',
    topic: 'PPE Selection',
    category: 'Health & Safety',
  },
  {
    id: 47,
    question:
      "What is the employer's duty under Regulation 9 regarding PPE training and information?",
    options: [
      'To allow employees to choose whether or not they wish to receive any training',
      'To provide training only to supervisors, who then brief the rest of the workforce',
      'To rely on the manufacturer’s printed instructions as the sole source of training',
      'To provide adequate information, instruction, and training to enable PPE to be used effectively',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 9 requires employers to provide adequate and appropriate information, instruction, and training for each item of PPE. This includes information about risks, how PPE protects, its limitations, and how to use it correctly.',
    section: 'PPE',
    difficulty: 'basic',
    topic: 'PPE Training',
    category: 'Health & Safety',
  },
  {
    id: 48,
    question:
      'What are the three categories of PPE based on risk level under the PPE Regulation 2016/425?',
    options: [
      'Category I (minimal risks), Category II (intermediate risks), Category III (serious or irreversible risks including death)',
      'Category A (head protection), Category B (body protection), Category C (foot protection)',
      'Category 1 (disposable), Category 2 (reusable), Category 3 (specialist hire only)',
      'Category Low (indoor use), Category Medium (outdoor use), Category High (offshore use)',
    ],
    correctAnswer: 0,
    explanation:
      'PPE Regulation 2016/425 categorises PPE as: Category I - minimal risks (e.g., gardening gloves); Category II - intermediate risks requiring conformity assessment; Category III - serious risks including death (e.g., fall protection, respiratory protection), requiring stricter conformity procedures.',
    section: 'PPE',
    difficulty: 'advanced',
    topic: 'PPE Categories',
    category: 'Health & Safety',
  },

  // Safe Isolation Procedures (Questions 49-56)
  {
    id: 49,
    question: 'According to BS 7671 and GS38, what is the first step in safe isolation procedure?',
    options: [
      'Immediately apply a lock-off device to the main switch before any checks',
      'Identify the source(s) of supply and all points of isolation',
      'Test the circuit with a voltage indicator before isolating anything',
      'Connect a temporary earth to the conductors at the point of work',
    ],
    correctAnswer: 1,
    explanation:
      'The first step in safe isolation is to identify the source(s) of supply and all points of isolation. This is crucial because circuits may have multiple supplies, standby generators, UPS systems, or interconnections that could re-energise the circuit.',
    section: 'Safe Isolation',
    difficulty: 'basic',
    topic: 'Isolation Procedure',
    category: 'Health & Safety',
  },
  {
    id: 50,
    question:
      'What voltage limits for test instruments are specified in GS38 for safe use near live conductors?',
    options: [
      'Unfused test leads with bare crocodile clips and probes with 10mm exposed tips',
      'Fused test leads with a 13A fuse rating and probes with 8mm exposed metal tips',
      'Fused test leads with maximum 500mA fuse rating (HRC), spring-loaded shrouded probes with maximum 4mm exposed tip',
      'Test leads with a 3A fuse rating and fully exposed probe tips for better contact',
    ],
    correctAnswer: 2,
    explanation:
      'GS38 specifies that test leads should have fuses rated at 500mA or less (HRC type), finger guards/barriers, insulated probes with maximum 4mm exposed metal tip (2mm for voltage detectors), and be robust enough for the expected conditions.',
    section: 'Safe Isolation',
    difficulty: 'intermediate',
    topic: 'Test Equipment',
    category: 'Health & Safety',
  },
  {
    id: 51,
    question:
      'After isolating a circuit and before commencing work, what sequence of testing must be performed with a voltage indicator?',
    options: [
      'Test the circuit, then prove the indicator on a known source only once afterwards',
      'Prove the indicator on a known source once, then test the circuit and begin work',
      'Test the circuit twice in succession without proving the indicator at any point',
      'Prove the voltage indicator on a known source, test the circuit, prove the indicator again on the known source',
    ],
    correctAnswer: 3,
    explanation:
      'The prove-test-prove sequence is essential: 1) Prove the voltage indicator works on a known live source, 2) Test the isolated circuit to confirm it is dead, 3) Prove the indicator still works on the known source. This confirms the instrument was working correctly when the dead test was made.',
    section: 'Safe Isolation',
    difficulty: 'basic',
    topic: 'Proving Dead',
    category: 'Health & Safety',
  },
  {
    id: 52,
    question:
      "Under the Electricity at Work Regulations 1989, Regulation 14, what does 'dead' mean for electrical isolation purposes?",
    options: [
      'Disconnected from all sources of electrical energy and unable to become live unintentionally',
      'Switched off at the local control switch but still connected to the supply',
      'Reading below 50 volts on a voltage indicator at the point of work',
      'Protected by a residual current device that will trip if a fault occurs',
    ],
    correctAnswer: 0,
    explanation:
      "Under Regulation 14, 'dead' means the conductor is disconnected from all sources of electrical energy and cannot accidentally or inadvertently become live. This requires positive isolation, not just switching off.",
    section: 'Safe Isolation',
    difficulty: 'intermediate',
    topic: 'Definition of Dead',
    category: 'Health & Safety',
  },
  {
    id: 53,
    question: 'Why must all poles be isolated when isolating a three-phase supply?',
    options: [
      'Because the neutral conductor carries the full load current of all three phases',
      'Because induced voltages could appear, or a fault between phases could make the isolated phase live',
      'Because a single-pole device cannot physically carry three-phase current safely',
      'Because the earth conductor must also be isolated along with the three phases',
    ],
    correctAnswer: 1,
    explanation:
      'All poles must be isolated because inductive loads can generate back-EMF, capacitive coupling can induce voltages, and faults between phases could energise supposedly isolated conductors. Single-pole isolation on three-phase systems is inherently unsafe.',
    section: 'Safe Isolation',
    difficulty: 'intermediate',
    topic: 'Three-Phase Isolation',
    category: 'Health & Safety',
  },
  {
    id: 54,
    question: 'What is the purpose of lock-off devices in safe isolation procedures?',
    options: [
      'To indicate to others which circuit is being worked on by means of a warning label',
      'To discharge any residual stored energy in the circuit before work begins',
      'To physically prevent the switching device from being operated and ensure it cannot be inadvertently re-energised',
      'To record the time and date at which the circuit was isolated for the permit',
    ],
    correctAnswer: 2,
    explanation:
      'Lock-off devices physically prevent isolation devices from being operated. Combined with personal padlocks and a permit system, they ensure the circuit cannot be inadvertently re-energised by someone unaware that work is being carried out.',
    section: 'Safe Isolation',
    difficulty: 'basic',
    topic: 'Lock-Off Devices',
    category: 'Health & Safety',
  },
  {
    id: 55,
    question:
      'According to best practice, between which points should voltage absence be verified when proving a circuit dead?',
    options: [
      'Between line and neutral only, as this confirms the supply has been removed',
      'Between line and earth only, since this is the most dangerous combination',
      'Between neutral and earth only, as the line will follow if these are dead',
      'Line to neutral, line to earth, and neutral to earth (for single phase); between all phases, and each phase to neutral and earth (for three phase)',
    ],
    correctAnswer: 3,
    explanation:
      'Comprehensive testing requires testing between all combinations: L-N, L-E, and N-E for single phase. For three-phase, test L1-L2, L2-L3, L3-L1 (phase to phase), then each phase to neutral and each phase and neutral to earth.',
    section: 'Safe Isolation',
    difficulty: 'intermediate',
    topic: 'Testing Sequence',
    category: 'Health & Safety',
  },
  {
    id: 56,
    question:
      'What additional precautions are required when isolating circuits that may include stored energy?',
    options: [
      'Allow time for discharge of capacitors, verify dissipation, consider UPS systems, battery supplies, and generators',
      'Simply switch off the main supply, as stored energy dissipates instantly on isolation',
      'Rely on the protective device to trip and clear any residual energy in the circuit',
      'Wait a fixed period of five minutes for all systems before commencing any work',
    ],
    correctAnswer: 0,
    explanation:
      'Stored energy sources include capacitors (which can retain lethal charge), UPS systems, battery supplies, and standby generators. These must be identified, isolated, and allowed to discharge or verified as disconnected before work commences.',
    section: 'Safe Isolation',
    difficulty: 'advanced',
    topic: 'Stored Energy',
    category: 'Health & Safety',
  },

  // Permits to Work (Questions 57-60)
  {
    id: 57,
    question: 'What is the primary purpose of a permit-to-work system?',
    options: [
      'To record the hours worked by operatives so they can be paid correctly',
      'To provide a formal documented system that authorises specific work at specific locations under defined safety conditions',
      'To replace the need for a risk assessment on high-risk activities entirely',
      'To grant general permission for any worker to enter the site at any time',
    ],
    correctAnswer: 1,
    explanation:
      'A permit-to-work system provides a formal documented procedure controlling high-risk work. It ensures proper authorisation, specifies safety conditions, identifies hazards, and ensures handover procedures are followed. It supplements but does not replace risk assessments.',
    section: 'Permits to Work',
    difficulty: 'basic',
    topic: 'Permit Purpose',
    category: 'Health & Safety',
  },
  {
    id: 58,
    question: 'Which types of work typically require a permit-to-work system in building services?',
    options: [
      'Routine cleaning, general decorating, and low-level changing of light fittings',
      'Office-based administrative work and the use of display screen equipment',
      'Hot work, confined space entry, work on high voltage systems, work on pressure systems, and isolation of plant',
      'Delivery of materials to site and general manual handling of light loads',
    ],
    correctAnswer: 2,
    explanation:
      'Permit-to-work systems are typically required for high-risk activities including hot work, confined space entry, work on high voltage systems (above 1000V AC), work on pressure systems, entry into hazardous areas, and complex isolation procedures.',
    section: 'Permits to Work',
    difficulty: 'intermediate',
    topic: 'Permit Applications',
    category: 'Health & Safety',
  },
  {
    id: 59,
    question: 'What essential elements must a permit-to-work document contain?',
    options: [
      'The cost estimate for the work and the agreed payment terms with the client',
      'The full employment history and qualifications of every operative on site',
      'A list of all the tools and materials to be used during the course of the work',
      'Description of work, location, hazards identified, precautions required, authorisation signatures, time validity, and cancellation procedure',
    ],
    correctAnswer: 3,
    explanation:
      'A permit must include: clear description of work and its location, identified hazards and required precautions, signatures of the person issuing and receiving the permit, time period of validity, and a formal cancellation procedure when work is complete.',
    section: 'Permits to Work',
    difficulty: 'intermediate',
    topic: 'Permit Contents',
    category: 'Health & Safety',
  },
  {
    id: 60,
    question:
      "What is the role of the 'Authorised Person' in a permit-to-work system for electrical work?",
    options: [
      'To assess the work required, ensure safe conditions exist, issue the permit, and later cancel it when work is complete',
      'To carry out the physical work on the circuit once the permit has been issued',
      'To purchase and supply the tools and materials needed for the permitted work',
      'To act solely as a witness signature on the permit without any other duties',
    ],
    correctAnswer: 0,
    explanation:
      'The Authorised Person assesses the work, ensures all safety conditions are met (including isolation and proving dead), issues the permit to the Competent Person carrying out the work, monitors compliance, and formally cancels the permit upon safe completion.',
    section: 'Permits to Work',
    difficulty: 'advanced',
    topic: 'Authorised Person',
    category: 'Health & Safety',
  },

  // First Aid (Questions 61-62)
  {
    id: 61,
    question:
      'Under the Health and Safety (First-Aid) Regulations 1981, what must employers provide?',
    options: [
      'A fully staffed on-site medical centre with a registered nurse at all times',
      'Adequate and appropriate equipment, facilities, and personnel to enable first aid to be given to employees who are injured or become ill at work',
      'Private medical insurance for every employee covering work-related injuries',
      'A defibrillator at every workplace regardless of size or level of risk',
    ],
    correctAnswer: 1,
    explanation:
      'The First-Aid Regulations require employers to provide adequate and appropriate equipment, facilities, and personnel to ensure employees receive immediate attention if injured or taken ill at work. The level of provision depends on workplace hazards and number of employees.',
    section: 'First Aid',
    difficulty: 'basic',
    topic: 'First Aid Requirements',
    category: 'Health & Safety',
  },
  {
    id: 62,
    question:
      'When dealing with an electric shock casualty, what is the correct sequence of actions?',
    options: [
      'Immediately pull the casualty away from the source with your bare hands',
      'Give the casualty water to drink and keep them moving until help arrives',
      'Isolate the supply (if safe), call for help, assess the casualty, begin CPR if not breathing normally',
      'Apply a tourniquet to the affected limb before doing anything else',
    ],
    correctAnswer: 2,
    explanation:
      'For electric shock: 1) Isolate the supply if safe to do so (do not touch the casualty if still in contact with live parts), 2) Call for help/emergency services, 3) Assess the casualty using DRABC, 4) Begin CPR if not breathing normally, 5) Treat burns with cool water after CPR is established.',
    section: 'First Aid',
    difficulty: 'intermediate',
    topic: 'Electric Shock',
    category: 'Health & Safety',
  },

  // ============================================
  // BUILDING SERVICES SCIENCE (Questions 63-125)
  // ============================================

  // Heat Transfer (Questions 63-82)
  {
    id: 63,
    question: 'What are the three primary modes of heat transfer?',
    options: [
      'Evaporation, condensation, radiation',
      'Sensible, latent, specific',
      'Absorption, reflection, transmission',
      'Conduction, convection, radiation',
    ],
    correctAnswer: 3,
    explanation:
      'The three primary modes of heat transfer are: conduction (through solid materials), convection (through fluids - liquids and gases), and radiation (electromagnetic waves through space). All three occur simultaneously in buildings but to varying degrees.',
    section: 'Heat Transfer',
    difficulty: 'basic',
    topic: 'Heat Transfer Modes',
    category: 'Building Services Science',
  },
  {
    id: 64,
    question: 'What is the SI unit for thermal conductivity (k-value)?',
    options: [
      'W/m K',
      'W/m² K',
      'm² K/W',
      'J/kg K',
    ],
    correctAnswer: 0,
    explanation:
      'Thermal conductivity (k-value or λ) is measured in W/m K (watts per metre kelvin). It represents the rate of heat flow through a unit area of material per unit temperature difference per unit thickness.',
    section: 'Heat Transfer',
    difficulty: 'basic',
    topic: 'Thermal Properties',
    category: 'Building Services Science',
  },
  {
    id: 65,
    question:
      'What is the relationship between thermal resistance (R-value) and thermal transmittance (U-value) for a building element?',
    options: [
      'U = ΣR (U-value is the sum of all the thermal resistances)',
      'U = 1/ΣR (U-value is the reciprocal of total thermal resistance)',
      'U = ΣR × A (total resistance multiplied by the element area)',
      'U = ΣR² (U-value is the square of the total thermal resistance)',
    ],
    correctAnswer: 1,
    explanation:
      'U-value (thermal transmittance, W/m²K) is the reciprocal of total thermal resistance: U = 1/ΣR. Total R includes the resistances of all layers plus internal and external surface resistances. Lower U-values indicate better insulation.',
    section: 'Heat Transfer',
    difficulty: 'intermediate',
    topic: 'U-values',
    category: 'Building Services Science',
  },
  {
    id: 66,
    question:
      'According to Building Regulations Part L, what is the maximum U-value for new external walls in dwellings?',
    options: [
      '0.50 W/m²K',
      '0.30 W/m²K',
      '0.26 W/m²K',
      '0.18 W/m²K',
    ],
    correctAnswer: 2,
    explanation:
      'Approved Document L (Conservation of fuel and power, Volume 1: Dwellings) gives a limiting U-value of 0.26 W/m²K for external walls in new dwellings. This is a worst-acceptable backstop value; better fabric U-values are usually needed to meet the overall energy/CO₂ target.',
    section: 'Heat Transfer',
    difficulty: 'intermediate',
    topic: 'Building Regulations',
    category: 'Building Services Science',
  },
  {
    id: 67,
    question: 'What is the formula for heat loss through a building element by conduction?',
    options: [
      'Q = m × c × ΔT',
      'Q = λ × A',
      'Q = ρ × V × c',
      'Q = U × A × ΔT',
    ],
    correctAnswer: 3,
    explanation:
      'Heat loss through a building element is calculated as Q = U × A × ΔT, where Q is heat flow (W), U is thermal transmittance (W/m²K), A is area (m²), and ΔT is temperature difference (K). This is fundamental to heating load calculations.',
    section: 'Heat Transfer',
    difficulty: 'basic',
    topic: 'Heat Loss Calculation',
    category: 'Building Services Science',
  },
  {
    id: 68,
    question: 'What is a thermal bridge (cold bridge) in building construction?',
    options: [
      'An area of the building envelope with significantly higher heat transfer due to interruption in insulation or change in geometry',
      'A deliberate gap left in the insulation to allow the structure to breathe and ventilate',
      'A layer of insulation added specifically to connect two separate insulated zones',
      'A metal strap used to tie the inner and outer leaves of a cavity wall together',
    ],
    correctAnswer: 0,
    explanation:
      'A thermal bridge is an area where the insulation is penetrated or reduced, creating a localised path of higher heat transfer. Examples include steel lintels, concrete floor edges, and window reveals. They cause increased heat loss and potential condensation.',
    section: 'Heat Transfer',
    difficulty: 'intermediate',
    topic: 'Thermal Bridging',
    category: 'Building Services Science',
  },
  {
    id: 69,
    question: 'What is the specific heat capacity of water at standard conditions?',
    options: [
      '1.0 kJ/kg K',
      '4.18 kJ/kg K',
      '2.1 kJ/kg K',
      '10.0 kJ/kg K',
    ],
    correctAnswer: 1,
    explanation:
      'The specific heat capacity of water is 4.18 kJ/kg K (or 4180 J/kg K). This relatively high value makes water an excellent heat transfer medium and is fundamental to heating and cooling system design calculations.',
    section: 'Heat Transfer',
    difficulty: 'basic',
    topic: 'Specific Heat',
    category: 'Building Services Science',
  },
  {
    id: 70,
    question:
      'What is the formula for calculating the heat energy required to raise the temperature of water in a heating system?',
    options: [
      'Q = U × A × ΔT (transmittance × area × temperature change)',
      'Q = m × L (mass × latent heat of vaporisation)',
      'Q = m × c × ΔT (mass × specific heat capacity × temperature change)',
      'Q = m × c / ΔT (mass × specific heat capacity divided by temperature change)',
    ],
    correctAnswer: 2,
    explanation:
      'The sensible heat equation Q = m × c × ΔT calculates the energy required to change the temperature of a substance without phase change. For water: Q (kJ) = mass (kg) × 4.18 (kJ/kg K) × temperature change (K).',
    section: 'Heat Transfer',
    difficulty: 'basic',
    topic: 'Heat Energy',
    category: 'Building Services Science',
  },
  {
    id: 71,
    question: 'What is the Stefan-Boltzmann constant and what does it relate to?',
    options: [
      'The constant (σ = 8.314 J/mol K) used to relate pressure, volume and temperature of a gas',
      'The constant (σ = 4.18 kJ/kg K) used to calculate the heat capacity of water',
      'The constant (σ = 9.81 m/s²) used to calculate the gravitational head in a system',
      'The constant (σ = 5.67 × 10⁻⁸ W/m²K⁴) used to calculate radiant heat transfer from a surface',
    ],
    correctAnswer: 3,
    explanation:
      'The Stefan-Boltzmann constant (σ = 5.67 × 10⁻⁸ W/m²K⁴) is used in the equation for radiant heat transfer: Q = εσA(T₁⁴ - T₂⁴). It relates the power radiated from a black body to the fourth power of its absolute temperature.',
    section: 'Heat Transfer',
    difficulty: 'advanced',
    topic: 'Radiation',
    category: 'Building Services Science',
  },
  {
    id: 72,
    question:
      'What is the typical internal surface resistance (Rsi) value used in U-value calculations for walls with normal heat flow?',
    options: [
      '0.13 m²K/W',
      '0.04 m²K/W',
      '0.25 m²K/W',
      '0.50 m²K/W',
    ],
    correctAnswer: 0,
    explanation:
      'The standard internal surface resistance (Rsi) for walls with horizontal heat flow is 0.13 m²K/W as specified in BS EN ISO 6946. For floors (upward heat flow) it is 0.10 m²K/W, and for ceilings (downward heat flow) it is 0.17 m²K/W.',
    section: 'Heat Transfer',
    difficulty: 'intermediate',
    topic: 'Surface Resistance',
    category: 'Building Services Science',
  },
  {
    id: 73,
    question: 'In convective heat transfer, what does the Nusselt number represent?',
    options: [
      'The ratio of inertial to viscous forces within the flowing fluid',
      'The ratio of convective to conductive heat transfer across a boundary',
      'The ratio of momentum diffusivity to thermal diffusivity of the fluid',
      'The ratio of buoyancy to viscous forces in natural convection',
    ],
    correctAnswer: 1,
    explanation:
      'The Nusselt number (Nu) is a dimensionless number representing the ratio of convective to conductive heat transfer at a boundary. Nu = hL/k, where h is the convective heat transfer coefficient, L is characteristic length, and k is thermal conductivity.',
    section: 'Heat Transfer',
    difficulty: 'advanced',
    topic: 'Convection',
    category: 'Building Services Science',
  },
  {
    id: 74,
    question: 'What is the purpose of a cavity barrier in relation to heat transfer in buildings?',
    options: [
      'To increase the rate of heat transfer between the two leaves of the wall',
      'To carry the structural load of the floors above down to the foundations',
      'To prevent the spread of fire and smoke through cavities while managing thermal bridging',
      'To provide a drainage path for rainwater penetrating the outer leaf of the wall',
    ],
    correctAnswer: 2,
    explanation:
      'Cavity barriers prevent the spread of fire, smoke, and hot gases through cavities in building construction. While primarily for fire safety, they must be detailed to minimise thermal bridging and maintain the thermal envelope integrity.',
    section: 'Heat Transfer',
    difficulty: 'intermediate',
    topic: 'Cavity Construction',
    category: 'Building Services Science',
  },
  {
    id: 75,
    question: 'What is the latent heat of vaporisation of water at atmospheric pressure?',
    options: [
      '334 kJ/kg',
      '1000 kJ/kg',
      '4180 kJ/kg',
      '2260 kJ/kg',
    ],
    correctAnswer: 3,
    explanation:
      'The latent heat of vaporisation of water at 100°C and atmospheric pressure is approximately 2260 kJ/kg. This large value explains why steam heating systems can transfer significant energy and why evaporative cooling is effective.',
    section: 'Heat Transfer',
    difficulty: 'intermediate',
    topic: 'Latent Heat',
    category: 'Building Services Science',
  },
  {
    id: 76,
    question: 'What is the purpose of calculating degree days in building services?',
    options: [
      'To estimate seasonal heating or cooling energy requirements based on external temperature data',
      'To calculate the number of working days lost on a project due to bad weather',
      'To measure the rate of heat loss through a single building element in real time',
      'To determine the peak instantaneous heating load on the coldest day of the year',
    ],
    correctAnswer: 0,
    explanation:
      'Degree days provide a measure of how much heating or cooling is needed over a period. Heating degree days sum the differences between base temperature and lower outdoor temperatures. They enable energy consumption estimation and comparison between buildings and years.',
    section: 'Heat Transfer',
    difficulty: 'intermediate',
    topic: 'Degree Days',
    category: 'Building Services Science',
  },
  {
    id: 77,
    question: 'What is the emissivity of a perfect black body?',
    options: [
      '0',
      '1.0',
      '0.5',
      'Infinity',
    ],
    correctAnswer: 1,
    explanation:
      'A perfect black body has an emissivity of 1.0, meaning it emits the maximum possible thermal radiation at any given temperature. Real surfaces have emissivity values less than 1, with polished metals having low values (0.02-0.1) and matt surfaces higher values (0.9-0.95).',
    section: 'Heat Transfer',
    difficulty: 'intermediate',
    topic: 'Emissivity',
    category: 'Building Services Science',
  },
  {
    id: 78,
    question: 'In heat pump calculations, what is the Coefficient of Performance (COP)?',
    options: [
      'The ratio of electrical input to heat output',
      'The efficiency of the compressor only',
      'The ratio of heat output to electrical input',
      'The temperature lift divided by time',
    ],
    correctAnswer: 2,
    explanation:
      'COP is the ratio of useful heat output to electrical power input: COP = Qout/Win. A COP of 3 means 3 kW of heat is delivered for every 1 kW of electricity consumed. COP varies with source and delivery temperatures.',
    section: 'Heat Transfer',
    difficulty: 'intermediate',
    topic: 'Heat Pumps',
    category: 'Building Services Science',
  },
  {
    id: 79,
    question: "What is meant by the term 'thermal mass' in building physics?",
    options: [
      'The total weight of the structural materials used in the building envelope',
      'The rate at which a material conducts heat through its thickness',
      'The resistance a material offers to the passage of water vapour',
      'The ability of a material to store and release heat, helping to moderate temperature fluctuations',
    ],
    correctAnswer: 3,
    explanation:
      "Thermal mass refers to a material's ability to absorb, store, and later release heat. High thermal mass materials (concrete, brick, stone) moderate internal temperature swings, reducing peak heating/cooling loads and improving comfort.",
    section: 'Heat Transfer',
    difficulty: 'basic',
    topic: 'Thermal Mass',
    category: 'Building Services Science',
  },
  {
    id: 80,
    question:
      'What is the formula for calculating the heat transfer coefficient for forced convection in a pipe?',
    options: [
      'h = Nu × k/D (Nusselt number × thermal conductivity / diameter)',
      'h = Re × Pr/D (Reynolds number × Prandtl number / diameter)',
      'h = k × D/Nu (thermal conductivity × diameter / Nusselt number)',
      'h = ρ × v × D (density × velocity × diameter)',
    ],
    correctAnswer: 0,
    explanation:
      'The convective heat transfer coefficient can be calculated as h = Nu × k/D, where Nu is the Nusselt number (determined from Reynolds and Prandtl numbers), k is fluid thermal conductivity, and D is the characteristic dimension (pipe diameter).',
    section: 'Heat Transfer',
    difficulty: 'advanced',
    topic: 'Convection Coefficient',
    category: 'Building Services Science',
  },
  {
    id: 81,
    question:
      'What is the approximate external surface resistance (Rse) for sheltered exposure conditions?',
    options: [
      '0.08 m²K/W',
      '0.04 m²K/W',
      '0.02 m²K/W',
      '0.13 m²K/W',
    ],
    correctAnswer: 1,
    explanation:
      'The standard external surface resistance (Rse) for most calculations is 0.04 m²K/W for normal exposure. This value accounts for the convective and radiative heat transfer between the external surface and the environment.',
    section: 'Heat Transfer',
    difficulty: 'intermediate',
    topic: 'Surface Resistance',
    category: 'Building Services Science',
  },
  {
    id: 82,
    question: 'What is the Fourier equation for steady-state heat conduction through a plane wall?',
    options: [
      'q = h × A × ΔT',
      'q = m × c × ΔT',
      'q = -k × A × (dT/dx)',
      'q = σ × ε × A × T⁴',
    ],
    correctAnswer: 2,
    explanation:
      "Fourier's law states q = -k × A × (dT/dx), where q is heat flow rate (W), k is thermal conductivity (W/mK), A is cross-sectional area (m²), and dT/dx is the temperature gradient. The negative sign indicates heat flows from high to low temperature.",
    section: 'Heat Transfer',
    difficulty: 'advanced',
    topic: "Fourier's Law",
    category: 'Building Services Science',
  },

  // Thermodynamics (Questions 83-97)
  {
    id: 83,
    question: 'What does the First Law of Thermodynamics state?',
    options: [
      'Heat always flows naturally from a colder body to a hotter body',
      'Entropy of an isolated system always decreases over time',
      'No process can ever convert heat into useful work of any kind',
      'Energy cannot be created or destroyed, only converted from one form to another',
    ],
    correctAnswer: 3,
    explanation:
      'The First Law of Thermodynamics (conservation of energy) states that energy cannot be created or destroyed, only converted from one form to another. In building services, this means all energy input must equal energy output plus any change in stored energy.',
    section: 'Thermodynamics',
    difficulty: 'basic',
    topic: 'First Law',
    category: 'Building Services Science',
  },
  {
    id: 84,
    question: 'What does the Second Law of Thermodynamics imply for heat engines and heat pumps?',
    options: [
      'It is impossible to convert heat completely into work; heat naturally flows from hot to cold',
      'Heat can be converted entirely into work, so a heat engine can be 100% efficient',
      'Heat will flow spontaneously from a cold body to a hot body without any work input',
      'The total energy of a system always remains constant during any process',
    ],
    correctAnswer: 0,
    explanation:
      'The Second Law states that heat cannot spontaneously flow from cold to hot, and no heat engine can be 100% efficient. This is why heat pumps require work input to move heat from cold to hot, and why power stations have cooling towers.',
    section: 'Thermodynamics',
    difficulty: 'intermediate',
    topic: 'Second Law',
    category: 'Building Services Science',
  },
  {
    id: 85,
    question: 'What is enthalpy in thermodynamics?',
    options: [
      'A measure of the disorder or randomness within a thermodynamic system',
      'The total heat content of a system, equal to internal energy plus the product of pressure and volume (H = U + PV)',
      'The kinetic energy of the molecules in a gas at a given temperature',
      'The work done by a system as its volume changes at constant temperature',
    ],
    correctAnswer: 1,
    explanation:
      'Enthalpy (H) is the total heat content of a system, defined as H = U + PV (internal energy + pressure × volume). Changes in enthalpy are particularly useful for analysing heating/cooling processes at constant pressure, common in HVAC applications.',
    section: 'Thermodynamics',
    difficulty: 'intermediate',
    topic: 'Enthalpy',
    category: 'Building Services Science',
  },
  {
    id: 86,
    question: 'What is entropy in thermodynamic terms?',
    options: [
      'The total heat content of a system at constant pressure conditions',
      'The maximum useful work that can be extracted from a system',
      'A measure of the disorder or randomness in a system, which tends to increase in natural processes',
      'The amount of energy stored in the chemical bonds of a substance',
    ],
    correctAnswer: 2,
    explanation:
      'Entropy is a measure of disorder or randomness in a system. The Second Law states that entropy of an isolated system tends to increase. In practical terms, this explains why heat flows from hot to cold and why no process can be 100% efficient.',
    section: 'Thermodynamics',
    difficulty: 'intermediate',
    topic: 'Entropy',
    category: 'Building Services Science',
  },
  {
    id: 87,
    question: 'In a refrigeration cycle, what happens to the refrigerant in the evaporator?',
    options: [
      'It condenses from gas to liquid, rejecting heat to the surroundings',
      'It is compressed to a high pressure and temperature by the compressor',
      'It passes through unchanged, simply transferring heat by conduction',
      'It evaporates from liquid to gas, absorbing heat from the surroundings',
    ],
    correctAnswer: 3,
    explanation:
      'In the evaporator, low-pressure liquid refrigerant absorbs heat from the space being cooled and evaporates (changes from liquid to gas). This phase change absorbs significant latent heat, providing the cooling effect.',
    section: 'Thermodynamics',
    difficulty: 'basic',
    topic: 'Refrigeration Cycle',
    category: 'Building Services Science',
  },
  {
    id: 88,
    question: 'What is the Carnot efficiency and why is it significant?',
    options: [
      'The maximum possible efficiency of a heat engine operating between two temperatures, η = 1 - (Tc/Th)',
      'The actual measured efficiency of a real heat engine including all friction losses',
      'The minimum efficiency a heat engine must achieve to be legally sold in the UK',
      'The ratio of heat rejected to heat absorbed by a refrigeration system',
    ],
    correctAnswer: 0,
    explanation:
      'Carnot efficiency represents the maximum possible efficiency of any heat engine operating between two absolute temperatures: η = 1 - (Tc/Th). No real engine can exceed this. It shows that efficiency improves with larger temperature differences.',
    section: 'Thermodynamics',
    difficulty: 'advanced',
    topic: 'Carnot Efficiency',
    category: 'Building Services Science',
  },
  {
    id: 89,
    question: 'What is an adiabatic process?',
    options: [
      'A process that takes place at constant temperature throughout',
      'A process with no heat transfer to or from the system',
      'A process that takes place at constant pressure throughout',
      'A process in which the volume of the system remains constant',
    ],
    correctAnswer: 1,
    explanation:
      'An adiabatic process is one where no heat is transferred between the system and its surroundings. In building services, the compression stage in refrigeration is often approximated as adiabatic, where work input increases the gas temperature without heat transfer.',
    section: 'Thermodynamics',
    difficulty: 'intermediate',
    topic: 'Thermodynamic Processes',
    category: 'Building Services Science',
  },
  {
    id: 90,
    question:
      'What is the relationship between pressure and temperature for a gas at constant volume?',
    options: [
      "They are inversely proportional, so pressure falls as temperature rises",
      "Pressure is proportional to the square of the absolute temperature",
      "They are directly proportional (Gay-Lussac's Law)",
      "Pressure is independent of temperature when volume is held constant",
    ],
    correctAnswer: 2,
    explanation:
      "Gay-Lussac's Law states that at constant volume, the pressure of a gas is directly proportional to its absolute temperature: P₁/T₁ = P₂/T₂. This explains why sealed pressure vessels are rated for specific temperature ranges.",
    section: 'Thermodynamics',
    difficulty: 'basic',
    topic: 'Gas Laws',
    category: 'Building Services Science',
  },
  {
    id: 91,
    question: 'What is the ideal gas equation?',
    options: [
      'PV = mcΔT (pressure × volume = mass × specific heat × temperature change)',
      'P/V = nRT (pressure divided by volume = amount × gas constant × temperature)',
      'PV = nR/T (pressure × volume = amount × gas constant divided by temperature)',
      'PV = nRT (pressure × volume = amount × gas constant × temperature)',
    ],
    correctAnswer: 3,
    explanation:
      "The ideal gas equation PV = nRT combines Boyle's and Charles's laws. P is pressure (Pa), V is volume (m³), n is amount of substance (mol), R is the universal gas constant (8.314 J/mol K), and T is absolute temperature (K).",
    section: 'Thermodynamics',
    difficulty: 'basic',
    topic: 'Gas Laws',
    category: 'Building Services Science',
  },
  {
    id: 92,
    question:
      'In a vapour compression refrigeration cycle, what is the purpose of the expansion valve?',
    options: [
      'To reduce the pressure and temperature of the refrigerant before it enters the evaporator',
      'To raise the pressure and temperature of the refrigerant before the condenser',
      'To separate any liquid refrigerant from the vapour before the compressor',
      'To reject heat from the high-pressure refrigerant to the outside air',
    ],
    correctAnswer: 0,
    explanation:
      'The expansion valve (or throttling device) reduces the pressure and temperature of the high-pressure liquid refrigerant from the condenser. This creates the low-pressure, low-temperature conditions needed for evaporation and heat absorption in the evaporator.',
    section: 'Thermodynamics',
    difficulty: 'intermediate',
    topic: 'Refrigeration Cycle',
    category: 'Building Services Science',
  },
  {
    id: 93,
    question: 'What is superheat in refrigeration systems?',
    options: [
      'The temperature reduction of liquid refrigerant below its condensing temperature',
      'The temperature above the boiling point of the refrigerant in its gaseous state leaving the evaporator',
      'The pressure difference between the high and low sides of the system',
      'The temperature at which the refrigerant changes from gas to liquid in the condenser',
    ],
    correctAnswer: 1,
    explanation:
      'Superheat is the temperature increase of refrigerant vapour above its saturation (boiling) temperature. Measured at the evaporator outlet, it ensures all liquid has evaporated before reaching the compressor, preventing liquid slugging damage.',
    section: 'Thermodynamics',
    difficulty: 'intermediate',
    topic: 'Refrigeration',
    category: 'Building Services Science',
  },
  {
    id: 94,
    question: 'What is subcooling in refrigeration systems?',
    options: [
      'The temperature increase of refrigerant vapour above its boiling point at the evaporator',
      'The pressure drop across the expansion valve in the refrigeration circuit',
      'The temperature reduction of liquid refrigerant below its condensing temperature in the condenser',
      'The heat absorbed by the refrigerant as it evaporates in the evaporator coil',
    ],
    correctAnswer: 2,
    explanation:
      'Subcooling is the temperature of liquid refrigerant below its saturation (condensing) temperature, measured at the condenser outlet. Subcooling ensures the refrigerant entering the expansion device is fully liquid, improving system efficiency.',
    section: 'Thermodynamics',
    difficulty: 'intermediate',
    topic: 'Refrigeration',
    category: 'Building Services Science',
  },
  {
    id: 95,
    question: 'What is the definition of absolute zero temperature?',
    options: [
      'The freezing point of water at standard atmospheric pressure, equal to 0°C',
      'The temperature at which water boils at standard atmospheric pressure, equal to 100°C',
      'The average temperature of deep space, approximately -100°C or 173 K',
      'The lowest possible temperature where all molecular motion ceases, equal to -273.15°C or 0 K',
    ],
    correctAnswer: 3,
    explanation:
      'Absolute zero is the theoretical lowest temperature, where particles have minimum possible energy and molecular motion approaches zero. It equals -273.15°C or 0 Kelvin. It cannot be achieved in practice but is approached in cryogenic systems.',
    section: 'Thermodynamics',
    difficulty: 'basic',
    topic: 'Temperature Scales',
    category: 'Building Services Science',
  },
  {
    id: 96,
    question: 'What is the difference between sensible heat and latent heat?',
    options: [
      'Sensible heat changes temperature without phase change; latent heat changes phase without temperature change',
      'Sensible heat changes phase without temperature change; latent heat changes temperature without phase change',
      'Sensible heat applies only to gases; latent heat applies only to solids and liquids',
      'Sensible heat is measured in joules; latent heat is measured in watts per kelvin',
    ],
    correctAnswer: 0,
    explanation:
      'Sensible heat causes a temperature change without changing the state of the substance. Latent heat causes a phase change (solid-liquid-gas) without changing temperature. Understanding both is essential for HVAC load calculations.',
    section: 'Thermodynamics',
    difficulty: 'basic',
    topic: 'Heat Types',
    category: 'Building Services Science',
  },
  {
    id: 97,
    question:
      'In a pressure-enthalpy (P-h) diagram for refrigerants, what do the horizontal lines represent?',
    options: [
      'Lines of constant volume',
      'Lines of constant pressure (isobars)',
      'Lines of constant temperature',
      'Lines of constant entropy',
    ],
    correctAnswer: 1,
    explanation:
      'In a P-h diagram, horizontal lines represent constant pressure (isobars). The diagram shows the refrigeration cycle with: evaporation (horizontal line at low pressure), compression (rising line), condensation (horizontal at high pressure), and expansion (vertical drop).',
    section: 'Thermodynamics',
    difficulty: 'advanced',
    topic: 'Refrigeration Diagrams',
    category: 'Building Services Science',
  },

  // Fluid Mechanics (Questions 98-110)
  {
    id: 98,
    question: 'What is the definition of pressure in fluid mechanics?',
    options: [
      'The weight of the fluid',
      'The velocity of flow',
      'Force per unit area (P = F/A)',
      'The volume of fluid',
    ],
    correctAnswer: 2,
    explanation:
      'Pressure is defined as force per unit area: P = F/A, measured in Pascals (Pa) where 1 Pa = 1 N/m². In building services, pressure is fundamental to understanding water distribution, air handling, and hydraulic systems.',
    section: 'Fluid Mechanics',
    difficulty: 'basic',
    topic: 'Pressure',
    category: 'Building Services Science',
  },
  {
    id: 99,
    question: "What does Bernoulli's principle state about fluid flow?",
    options: [
      'In steady flow, an increase in velocity is accompanied by an increase in pressure',
      'Pressure remains constant throughout a flowing fluid regardless of its velocity',
      'The total energy of a flowing fluid increases as it moves through a system',
      'In steady flow, an increase in velocity occurs simultaneously with a decrease in pressure or potential energy',
    ],
    correctAnswer: 3,
    explanation:
      "Bernoulli's principle states that for incompressible, steady flow, an increase in velocity is accompanied by a decrease in pressure or potential energy. This explains venturi effects, flow measurement, and is fundamental to HVAC ductwork design.",
    section: 'Fluid Mechanics',
    difficulty: 'intermediate',
    topic: "Bernoulli's Principle",
    category: 'Building Services Science',
  },
  {
    id: 100,
    question: 'What is the continuity equation for fluid flow?',
    options: [
      'A₁v₁ = A₂v₂ (area × velocity is constant for incompressible flow)',
      'A₁v₁ = A₂v₂² (area × velocity squared is constant for incompressible flow)',
      'A₁/v₁ = A₂/v₂ (the ratio of area to velocity is constant along a pipe)',
      'A₁v₁ = A₂v₂ only when the pipe diameter remains constant throughout',
    ],
    correctAnswer: 0,
    explanation:
      'The continuity equation A₁v₁ = A₂v₂ states that for incompressible steady flow, the product of cross-sectional area and velocity remains constant. This explains why velocity increases as pipe diameter decreases, and is essential for pipe sizing.',
    section: 'Fluid Mechanics',
    difficulty: 'intermediate',
    topic: 'Continuity',
    category: 'Building Services Science',
  },
  {
    id: 101,
    question: 'What does the Reynolds number indicate about fluid flow?',
    options: [
      'The total pressure loss along the length of a pipe run',
      'Whether flow is laminar or turbulent (the ratio of inertial to viscous forces)',
      'The maximum velocity a fluid can reach before cavitation occurs',
      'The ratio of convective to conductive heat transfer at a boundary',
    ],
    correctAnswer: 1,
    explanation:
      'The Reynolds number (Re = ρvD/μ) indicates whether flow is laminar (Re < 2300) or turbulent (Re > 4000). Values between indicate transitional flow. This affects heat transfer, friction losses, and mixing characteristics in building services systems.',
    section: 'Fluid Mechanics',
    difficulty: 'intermediate',
    topic: 'Reynolds Number',
    category: 'Building Services Science',
  },
  {
    id: 102,
    question:
      'What is the formula for calculating head loss due to friction in a pipe using the Darcy-Weisbach equation?',
    options: [
      'hf = P/ρg',
      'hf = ρgL',
      'hf = f × (L/D) × (v²/2g)',
      'hf = v²/2g',
    ],
    correctAnswer: 2,
    explanation:
      "The Darcy-Weisbach equation hf = f × (L/D) × (v²/2g) calculates friction head loss, where f is the friction factor, L is pipe length, D is diameter, v is velocity, and g is gravitational acceleration. It's fundamental to pipe sizing calculations.",
    section: 'Fluid Mechanics',
    difficulty: 'advanced',
    topic: 'Friction Losses',
    category: 'Building Services Science',
  },
  {
    id: 103,
    question: 'What is gauge pressure?',
    options: [
      'Pressure measured relative to a perfect vacuum (zero absolute pressure)',
      'Pressure measured at the highest point in the system',
      'The sum of the atmospheric pressure and the absolute pressure',
      'Pressure measured relative to atmospheric pressure',
    ],
    correctAnswer: 3,
    explanation:
      'Gauge pressure is pressure measured relative to atmospheric pressure. Absolute pressure = gauge pressure + atmospheric pressure. Most building services pressure gauges read gauge pressure, so a reading of 0 means atmospheric pressure.',
    section: 'Fluid Mechanics',
    difficulty: 'basic',
    topic: 'Pressure Measurement',
    category: 'Building Services Science',
  },
  {
    id: 104,
    question: 'What is the standard atmospheric pressure at sea level?',
    options: [
      '101.325 kPa (1 atmosphere, 1.01325 bar)',
      '100 kPa (1 atmosphere, exactly 1 bar)',
      '10.325 kPa (1 atmosphere, 0.101325 bar)',
      '1013.25 kPa (1 atmosphere, 10.1325 bar)',
    ],
    correctAnswer: 0,
    explanation:
      'Standard atmospheric pressure at sea level is 101.325 kPa, equivalent to 1 atmosphere, 1.01325 bar, 760 mmHg, or 14.7 psi. This reference is essential for absolute pressure calculations and affects boiling points at different altitudes.',
    section: 'Fluid Mechanics',
    difficulty: 'basic',
    topic: 'Atmospheric Pressure',
    category: 'Building Services Science',
  },
  {
    id: 105,
    question:
      'What is the relationship between flow rate, velocity, and pipe cross-sectional area?',
    options: [
      'Q = A / v (volume flow rate equals area divided by velocity)',
      'Q = A × v (volume flow rate equals area times velocity)',
      'Q = v / A (volume flow rate equals velocity divided by area)',
      'Q = A × v² (volume flow rate equals area times velocity squared)',
    ],
    correctAnswer: 1,
    explanation:
      'Volume flow rate Q = A × v, where Q is in m³/s, A is cross-sectional area in m², and v is velocity in m/s. This fundamental relationship is used for all pipe and duct sizing calculations in building services.',
    section: 'Fluid Mechanics',
    difficulty: 'basic',
    topic: 'Flow Rate',
    category: 'Building Services Science',
  },
  {
    id: 106,
    question: 'What is cavitation in pumping systems?',
    options: [
      'The build-up of air pockets at the high points of a pipework system',
      'The gradual corrosion of pump impellers caused by aggressive water chemistry',
      'The formation and collapse of vapour bubbles when local pressure drops below the vapour pressure of the liquid',
      'The overheating of a pump motor when it runs against a closed valve',
    ],
    correctAnswer: 2,
    explanation:
      "Cavitation occurs when local pressure in a pump falls below the liquid's vapour pressure, causing vapour bubbles to form. When these bubbles collapse in higher pressure regions, they cause noise, vibration, erosion, and reduced efficiency.",
    section: 'Fluid Mechanics',
    difficulty: 'intermediate',
    topic: 'Cavitation',
    category: 'Building Services Science',
  },
  {
    id: 107,
    question: 'What is NPSH in pump terminology?',
    options: [
      "Nominal Pump Static Head - the static pressure the pump must overcome at start-up",
      "Net Pressure Supply Head - the supply pressure delivered at the pump outlet",
      "Negative Pressure Suction Hazard - the risk of air being drawn into the pump",
      "Net Positive Suction Head - the pressure available at the pump inlet above the liquid's vapour pressure",
    ],
    correctAnswer: 3,
    explanation:
      "Net Positive Suction Head (NPSH) is the total suction head at the pump inlet above the vapour pressure. NPSHa (available) must exceed NPSHr (required by the pump) to prevent cavitation. It's critical in pump selection and installation design.",
    section: 'Fluid Mechanics',
    difficulty: 'advanced',
    topic: 'Pump Characteristics',
    category: 'Building Services Science',
  },
  {
    id: 108,
    question: 'What is the purpose of an expansion vessel in a sealed heating system?',
    options: [
      'To accommodate the expansion of water as it heats up, maintaining safe system pressure',
      'To remove dissolved air and gases from the circulating system water',
      'To store hot water ready for delivery to taps and appliances on demand',
      'To filter debris and sludge from the system water before it reaches the boiler',
    ],
    correctAnswer: 0,
    explanation:
      'An expansion vessel contains a rubber diaphragm with air/nitrogen on one side. As water expands when heated, it compresses this gas cushion, accommodating the volume increase without excessive pressure rise. It replaces the feed and expansion cistern in sealed systems.',
    section: 'Fluid Mechanics',
    difficulty: 'basic',
    topic: 'Expansion Vessels',
    category: 'Building Services Science',
  },
  {
    id: 109,
    question: 'What is the typical water expansion rate when heated from 10°C to 80°C?',
    options: ['Approximately 1%', 'Approximately 3-4%', 'Approximately 10%', 'Approximately 20%'],
    correctAnswer: 1,
    explanation:
      'Water expands approximately 3-4% when heated from cold fill temperature (around 10°C) to typical operating temperature (around 80°C). This expansion must be accommodated by the expansion vessel, which is sized accordingly.',
    section: 'Fluid Mechanics',
    difficulty: 'intermediate',
    topic: 'Water Expansion',
    category: 'Building Services Science',
  },
  {
    id: 110,
    question: 'What is the affinity law relationship between pump speed and flow rate?',
    options: [
      'Flow rate is inversely proportional to speed',
      'Flow rate is proportional to the square of speed',
      'Flow rate is directly proportional to speed (Q₁/Q₂ = N₁/N₂)',
      'Flow rate is independent of speed',
    ],
    correctAnswer: 2,
    explanation:
      'The pump affinity laws state: flow rate varies directly with speed (Q₁/Q₂ = N₁/N₂), head varies with the square of speed, and power varies with the cube of speed. These enable variable speed pump control calculations.',
    section: 'Fluid Mechanics',
    difficulty: 'advanced',
    topic: 'Pump Laws',
    category: 'Building Services Science',
  },

  // Psychrometrics (Questions 111-120)
  {
    id: 111,
    question: 'What is psychrometrics?',
    options: [
      'The study of the flow of liquids through pipes and channels',
      'The study of how heat is conducted through solid building materials',
      'The study of the behaviour of refrigerants in a compression cycle',
      'The study of the thermodynamic properties of moist air and the relationships between them',
    ],
    correctAnswer: 3,
    explanation:
      "Psychrometrics is the study of moist air properties and their interrelationships. It's fundamental to HVAC design, covering humidity, dew point, wet/dry bulb temperatures, enthalpy, and how these change during heating, cooling, and humidification processes.",
    section: 'Psychrometrics',
    difficulty: 'basic',
    topic: 'Definition',
    category: 'Building Services Science',
  },
  {
    id: 112,
    question: 'What is relative humidity?',
    options: [
      'The ratio of actual water vapour pressure to the saturation vapour pressure at the same temperature, expressed as a percentage',
      'The total mass of water vapour contained in one cubic metre of air',
      'The temperature at which air becomes fully saturated with water vapour',
      'The difference between the dry bulb and wet bulb temperatures of the air',
    ],
    correctAnswer: 0,
    explanation:
      'Relative humidity (RH) is the ratio of actual water vapour pressure to the saturation vapour pressure at the same dry bulb temperature, expressed as percentage. RH of 100% means the air is saturated and condensation will occur if cooled further.',
    section: 'Psychrometrics',
    difficulty: 'basic',
    topic: 'Relative Humidity',
    category: 'Building Services Science',
  },
  {
    id: 113,
    question: 'What is the dew point temperature?',
    options: [
      'The temperature at which water in a heating system begins to boil',
      'The temperature at which air becomes saturated and water vapour begins to condense',
      'The temperature measured by a thermometer with a wetted wick in moving air',
      'The temperature difference required to drive heat through a building element',
    ],
    correctAnswer: 1,
    explanation:
      "Dew point is the temperature at which air becomes saturated (RH = 100%) if cooled at constant pressure and moisture content. Below dew point, condensation occurs. It's crucial for predicting condensation risk on cold surfaces.",
    section: 'Psychrometrics',
    difficulty: 'basic',
    topic: 'Dew Point',
    category: 'Building Services Science',
  },
  {
    id: 114,
    question: 'What is the difference between dry bulb and wet bulb temperature?',
    options: [
      'Dry bulb is the indoor temperature; wet bulb is the outdoor temperature at the same time',
      'Dry bulb is measured in summer; wet bulb is measured in winter conditions',
      'Dry bulb is air temperature; wet bulb is the temperature measured by a thermometer with a wet wick, showing evaporative cooling effect',
      'Dry bulb is the temperature of the air; wet bulb is the temperature of the water in the system',
    ],
    correctAnswer: 2,
    explanation:
      'Dry bulb temperature is the actual air temperature. Wet bulb temperature is measured by a thermometer with a wetted wick, showing the cooling effect of evaporation. The wet bulb is always equal to or lower than dry bulb; the difference indicates humidity level.',
    section: 'Psychrometrics',
    difficulty: 'intermediate',
    topic: 'Temperature Types',
    category: 'Building Services Science',
  },
  {
    id: 115,
    question: 'On a psychrometric chart, what do the horizontal lines represent?',
    options: [
      'Lines of constant dry bulb temperature',
      'Lines of constant relative humidity',
      'Lines of constant specific enthalpy',
      'Lines of constant moisture content (humidity ratio)',
    ],
    correctAnswer: 3,
    explanation:
      'On a psychrometric chart, horizontal lines represent constant moisture content (humidity ratio or specific humidity), measured in kg moisture per kg dry air. Reading along these lines shows how temperature changes affect air properties at constant moisture content.',
    section: 'Psychrometrics',
    difficulty: 'intermediate',
    topic: 'Psychrometric Chart',
    category: 'Building Services Science',
  },
  {
    id: 116,
    question:
      'What is the typical recommended relative humidity range for human comfort in occupied buildings?',
    options: [
      '40-60%',
      '10-20%',
      '80-90%',
      '90-100%',
    ],
    correctAnswer: 0,
    explanation:
      'The typical comfort range for relative humidity is 40-60%. Below 40% can cause dry skin, static electricity, and respiratory discomfort. Above 60% promotes mould growth, dust mites, and feels oppressive. CIBSE recommends maintaining this range.',
    section: 'Psychrometrics',
    difficulty: 'basic',
    topic: 'Comfort Conditions',
    category: 'Building Services Science',
  },
  {
    id: 117,
    question: 'In an air conditioning process, what happens during sensible cooling?',
    options: [
      'Both temperature and moisture content decrease as the air is dehumidified',
      'Temperature decreases but moisture content remains constant (moving left horizontally on psychrometric chart)',
      'Moisture content decreases but temperature remains constant throughout',
      'Both temperature and moisture content increase as the air is warmed',
    ],
    correctAnswer: 1,
    explanation:
      'During sensible cooling, air temperature decreases but moisture content remains constant - shown as horizontal movement left on a psychrometric chart. Relative humidity increases because cooler air can hold less moisture, even though absolute moisture content is unchanged.',
    section: 'Psychrometrics',
    difficulty: 'intermediate',
    topic: 'Air Conditioning Processes',
    category: 'Building Services Science',
  },
  {
    id: 118,
    question: 'What is the Apparatus Dew Point (ADP) in cooling coil design?',
    options: [
      'The dew point temperature of the outdoor air entering the air handling unit',
      'The maximum temperature the cooling coil can reach before it fails',
      'The temperature of the cooling coil surface where air would reach saturation (100% RH) if in perfect contact',
      'The temperature difference between the air entering and leaving the coil',
    ],
    correctAnswer: 2,
    explanation:
      "The Apparatus Dew Point is the effective surface temperature of a cooling coil. Air in contact with this surface would be cooled and dehumidified along a line toward the ADP on a psychrometric chart. It's used to determine the coil bypass factor.",
    section: 'Psychrometrics',
    difficulty: 'advanced',
    topic: 'Cooling Coil Design',
    category: 'Building Services Science',
  },
  {
    id: 119,
    question: 'What is specific enthalpy of air and what are its typical units?',
    options: [
      'The mass of water vapour per unit mass of dry air, typically g/kg dry air',
      'The volume occupied by unit mass of dry air, typically m³/kg dry air',
      'The pressure exerted by the water vapour in the air, typically kPa',
      'The total heat content per unit mass of dry air, typically kJ/kg dry air',
    ],
    correctAnswer: 3,
    explanation:
      "Specific enthalpy is the total heat content (sensible + latent) per unit mass of dry air, expressed in kJ/kg dry air. It includes both the sensible heat of the air and the latent heat of the water vapour. It's essential for cooling/heating load calculations.",
    section: 'Psychrometrics',
    difficulty: 'intermediate',
    topic: 'Enthalpy',
    category: 'Building Services Science',
  },
  {
    id: 120,
    question: 'What is the coil bypass factor in air conditioning?',
    options: [
      'The fraction of air that passes through the coil unchanged, without contacting the coil surface',
      'The fraction of the cooling load met by latent heat rather than sensible heat',
      'The proportion of supply air recirculated rather than drawn from outside',
      'The ratio of the coil surface area to the cross-sectional area of the duct',
    ],
    correctAnswer: 0,
    explanation:
      'The coil bypass factor (BF) represents the fraction of air passing through without contacting the cooling/heating coil surface. A BF of 0.1 means 10% of the air bypasses the coil effect. Lower BF indicates a more effective coil with more rows or fins.',
    section: 'Psychrometrics',
    difficulty: 'advanced',
    topic: 'Coil Performance',
    category: 'Building Services Science',
  },

  // Building Physics (Questions 121-125)
  {
    id: 121,
    question: 'What is interstitial condensation?',
    options: [
      'Condensation that forms on the inside face of cold windows and walls',
      'Condensation that occurs within the layers of a building element when the temperature drops below the dew point',
      'Condensation that forms on cold water pipes running through warm spaces',
      'Condensation that collects in the base of a sealed double-glazing unit',
    ],
    correctAnswer: 1,
    explanation:
      "Interstitial condensation occurs within building fabric layers when water vapour diffusing through encounters temperatures below its dew point. Unlike surface condensation, it's hidden and can cause serious structural damage, mould, and reduced insulation performance.",
    section: 'Building Physics',
    difficulty: 'intermediate',
    topic: 'Condensation',
    category: 'Building Services Science',
  },
  {
    id: 122,
    question: 'What is the purpose of a vapour control layer (VCL) in building construction?',
    options: [
      'To allow water vapour to escape freely from the building fabric to the outside',
      'To provide an additional layer of thermal insulation within the wall build-up',
      'To reduce the rate of water vapour diffusion into the building fabric, reducing interstitial condensation risk',
      'To act as a windproof barrier preventing draughts through the external wall',
    ],
    correctAnswer: 2,
    explanation:
      'A vapour control layer restricts water vapour diffusion through the building fabric, typically positioned on the warm side of insulation. It reduces interstitial condensation risk by preventing warm moist air from reaching cold zones where condensation could occur.',
    section: 'Building Physics',
    difficulty: 'intermediate',
    topic: 'Vapour Control',
    category: 'Building Services Science',
  },
  {
    id: 123,
    question: 'What is the Glaser method used for in building physics?',
    options: [
      'Calculating the U-value of a multi-layered building element from its resistances',
      'Determining the peak heating load of a building on the coldest design day',
      'Estimating the air permeability of a building envelope from pressure testing',
      'Assessing the risk of interstitial condensation by comparing vapour pressure profile with saturation pressure profile',
    ],
    correctAnswer: 3,
    explanation:
      'The Glaser method (steady-state analysis) plots vapour pressure and saturation pressure through a building element. Where vapour pressure exceeds saturation pressure, condensation will occur. It helps assess and prevent interstitial condensation risk in building design.',
    section: 'Building Physics',
    difficulty: 'advanced',
    topic: 'Condensation Analysis',
    category: 'Building Services Science',
  },
  {
    id: 124,
    question: 'What is air infiltration and how is it typically measured?',
    options: [
      'Uncontrolled air leakage through gaps and cracks, measured in air changes per hour (ach) or m³/h/m² at 50 Pa',
      'The deliberate supply of fresh air through a mechanical ventilation system, measured in litres per second',
      'The rate of heat loss through the building fabric, measured in watts per square metre',
      'The movement of moisture through the building fabric, measured in grams per square metre per day',
    ],
    correctAnswer: 0,
    explanation:
      "Air infiltration is uncontrolled air leakage through cracks, gaps, and openings in the building envelope. It's measured by pressurisation testing, typically expressed as m³/h/m² of envelope area at 50 Pa pressure difference (q50), or air changes per hour (n50).",
    section: 'Building Physics',
    difficulty: 'intermediate',
    topic: 'Air Tightness',
    category: 'Building Services Science',
  },
  {
    id: 125,
    question:
      'According to Building Regulations Part L, what is the maximum design air permeability for new dwellings?',
    options: [
      '5 m³/(h.m²) at 50 Pa',
      '8 m³/(h.m²) at 50 Pa',
      '10 m³/(h.m²) at 50 Pa',
      '15 m³/(h.m²) at 50 Pa',
    ],
    correctAnswer: 1,
    explanation:
      'Approved Document L (Volume 1: Dwellings) sets a limiting design air permeability of 8 m³/(h.m²) at 50 Pa for new dwellings, with air-pressure testing required to demonstrate compliance. Much lower values (typically 3–5, and around 0.6 ach for Passivhaus) are needed to hit stretch energy targets.',
    section: 'Building Physics',
    difficulty: 'intermediate',
    topic: 'Building Regulations',
    category: 'Building Services Science',
  },
];

export default questionsPart1;
