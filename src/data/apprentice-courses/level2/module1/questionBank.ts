// Module 1: Health and Safety in Building Services Engineering - Question Bank
// 300 questions covering all Module 1 content for Level 2 Electrical Course
// Expanded 2026-04-27: +50 questions targeting underweight ACs (1.2, 2.3, 2.4-2.7,
// 3.5/3.6/3.8/3.9, 4.1, 4.7, 4.8) including the new asbestos Sub (Section 2 / Sub 6).

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  /** Drives the weighted draw in getRandomQuestions. Added 2026-08-24 — the
   *  bank previously had no difficulty field at all, so its exam could only
   *  shuffle flat and passed 86% of candidates. */
  difficulty?: 'basic' | 'intermediate' | 'advanced';
}

export const module1Questions: Question[] = [
  // Section 1: Legislation and Duties (Questions 1-42)
  {
    id: 1,
    question: 'What is the main purpose of the Health and Safety at Work Act 1974?',
    options: [
      'To set the building regulations, covering electrical work',
      'To ensure the health, safety and welfare of all employees at work',
      'To give technical guidance on cable sizing, wiring methods and terminations',
      'To regulate the testing, inspection and certification of portable tools',
    ],
    correctAnswer: 1,
    explanation:
      'HASAWA 1974 is the primary legislation ensuring health, safety and welfare of all employees and others affected by work activities.',
    difficulty: 'basic',
  },
  {
    id: 2,
    question: 'Which regulation specifically covers electrical safety at work?',
    options: [
      'Building Regulations',
      'Construction (Design and Management) Regulations',
      'Electricity at Work Regulations 1989',
      'Manual Handling Operations Regulations',
    ],
    correctAnswer: 2,
    explanation:
      'The Electricity at Work Regulations 1989 specifically cover electrical safety requirements in the workplace.',
    difficulty: 'intermediate',
  },
  {
    id: 3,
    question: 'Under HASAWA, who has the primary duty to ensure workplace safety?',
    options: [
      'Employees only',
      'The HSE only',
      'Trade unions',
      'Employers',
    ],
    correctAnswer: 3,
    explanation:
      'Employers have the primary duty under HASAWA to ensure the health, safety and welfare of their employees.',
    difficulty: 'intermediate',
  },
  {
    id: 4,
    question: "What are employees' duties under HASAWA?",
    options: [
      'To take reasonable care of themselves and others, and cooperate with employers',
      'To carry out their own written risk assessments, one for each task',
      'To buy and maintain their own personal protective equipment, tools and test gear',
      'To enforce health and safety law for the employer, serving improvement notices',
    ],
    correctAnswer: 0,
    explanation:
      "Employees must take reasonable care of their own and others' health and safety, and cooperate with their employer.",
    difficulty: 'intermediate',
  },
  {
    id: 5,
    question: 'Which organisation enforces health and safety law in Great Britain?',
    options: [
      'The local authority environmental health department (EHO)',
      'Health and Safety Executive (HSE)',
      'The Health and Safety Commission (HSC)',
      'The Department for Work and Pensions (DWP)',
    ],
    correctAnswer: 1,
    explanation:
      'The Health and Safety Executive (HSE) is the primary enforcer of health and safety law in Great Britain.',
    difficulty: 'basic',
  },
  {
    id: 6,
    question: 'What is the maximum penalty for breaching health and safety law?',
    options: [
      'A £20,000 fine per breach/offence',
      'A formal HSE/local authority written warning',
      'Unlimited fine and/or imprisonment',
      'Withdrawal of the trading/operating licence',
    ],
    correctAnswer: 2,
    explanation:
      'Serious breaches of health and safety law can result in unlimited fines and/or imprisonment.',
    difficulty: 'basic',
  },
  {
    id: 7,
    question: 'What does CDM stand for?',
    options: [
      'Contractor Documentation Manual',
      'Construction Development Manual',
      'Construction Documentation Method',
      'Construction Design Management',
    ],
    correctAnswer: 3,
    explanation:
      'CDM stands for Construction (Design and Management) Regulations which apply to construction projects.',
    difficulty: 'basic',
  },
  {
    id: 8,
    question: 'When do CDM Regulations apply?',
    options: [
      'All construction projects',
      'Projects lasting more than 30 working days',
      'Commercial and industrial projects only',
      'Projects using more than one contractor',
    ],
    correctAnswer: 0,
    explanation:
      'CDM Regulations apply to all construction projects, with different duties depending on project size and type.',
    difficulty: 'intermediate',
  },
  {
    id: 9,
    question: 'What is the role of the Principal Designer under CDM?',
    options: [
      'To supervise every site operative, inspecting the works during construction',
      'To plan, manage and coordinate health and safety during the pre-construction phase',
      'To prepare the construction phase plan, then run the site day-to-day',
      'To compile the health and safety file, handing it to the client at handover',
    ],
    correctAnswer: 1,
    explanation:
      'The Principal Designer plans, manages and coordinates health and safety during the pre-construction phase.',
    difficulty: 'intermediate',
  },
  {
    id: 10,
    question:
      'What is the minimum duration for a construction project to require notification to HSE under CDM?',
    options: [
      'More than 7 days or 100 person days',
      'More than 14 days or 250 person days',
      'More than 30 days or 500 person days',
      'More than 60 days or 1,000 person days',
    ],
    correctAnswer: 2,
    explanation:
      'Projects lasting more than 30 working days with over 20 workers simultaneously, or exceeding 500 person days, must be notified to HSE.',
    difficulty: 'intermediate',
  },
  {
    id: 11,
    question: 'What are the duties of a Principal Contractor under CDM?',
    options: [
      'Coordinate health and safety during the design, tender and pricing stages',
      'Compile the pre-construction information, then pass it to the designers',
      'Approve the appointment of the client, the Principal Designer and the designers',
      'Plan, manage and coordinate health and safety during the construction phase',
    ],
    correctAnswer: 3,
    explanation:
      'The Principal Contractor plans, manages and coordinates health and safety during the construction phase.',
    difficulty: 'intermediate',
  },
  {
    id: 12,
    question: 'What must contractors do before starting work on a notifiable project?',
    options: [
      'Provide a construction phase plan',
      'Apply for planning permission from the council',
      'Obtain written consent from nearby residents',
      'Submit a method statement to the HSE',
    ],
    correctAnswer: 0,
    explanation:
      'A construction phase plan must be prepared and implemented before construction work begins.',
    difficulty: 'intermediate',
  },
  {
    id: 13,
    question: 'What information must be provided in the health and safety file?',
    options: [
      'A daily record of everyone present on site each shift, signed by the site manager and client',
      'Information about the structure needed for future construction work, maintenance, and demolition',
      'The tender prices submitted by every contractor, and the accepted contract sum',
      'Copies of every operative qualification, CSCS card and induction record',
    ],
    correctAnswer: 1,
    explanation:
      'The health and safety file contains information needed for future construction work, maintenance, and demolition.',
    difficulty: 'intermediate',
  },
  {
    id: 14,
    question: 'Under EAWR, what must electrical systems be?',
    options: [
      'Inspected, tested and certificated at least once every five years',
      'Designed by an incorporated engineer, then signed off by the HSE',
      'Constructed, maintained and used to prevent danger',
      'Labelled with the manufacturer, model and date of installation',
    ],
    correctAnswer: 2,
    explanation:
      'EAWR requires electrical systems to be constructed, maintained and used so far as reasonably practicable to prevent danger.',
    difficulty: 'basic',
  },
  {
    id: 15,
    question: "What does 'competent person' mean under EAWR?",
    options: [
      'Anyone holding a current ECS card, plus a valid site induction certificate',
      'A person directly employed by the distribution network operator, or by the HSE',
      'Any qualified electrician over the age of 18, working under direct supervision',
      'Person with sufficient training, experience and knowledge to prevent danger',
    ],
    correctAnswer: 3,
    explanation:
      'A competent person has sufficient training, experience and knowledge to prevent danger when working with electricity.',
    difficulty: 'intermediate',
  },
  {
    id: 16,
    question: 'What must be done before work on electrical equipment?',
    options: [
      'Switch off and prove dead',
      'Confirm the warranty is still valid',
      'Notify the distribution network operator',
      'Photograph the equipment for the records',
    ],
    correctAnswer: 0,
    explanation:
      'Equipment must be switched off and proved dead, or other precautions taken to prevent danger.',
    difficulty: 'intermediate',
  },
  {
    id: 17,
    question: 'What is the purpose of RIDDOR?',
    options: [
      'Registration of Independent, Domestic and Domiciliary Operatives Regulations',
      'Reporting of Injuries, Diseases and Dangerous Occurrences Regulations',
      'Recording of Incidents, Damage and Defective Operations Regulations',
      'Risk Identification, Documentation and Defect Observation Regulations',
    ],
    correctAnswer: 1,
    explanation:
      'RIDDOR requires the reporting of serious workplace accidents, occupational diseases and dangerous occurrences.',
    difficulty: 'basic',
  },
  {
    id: 18,
    question: 'Which accidents must be reported under RIDDOR?',
    options: [
      'Fatalities, and any injury needing admission to hospital for treatment',
      'Any first-aid treatment given at work, written into the accident book',
      'Deaths, specified injuries, over-7-day injuries, diseases, dangerous occurrences',
      'Every accident causing a cut, bruise or sprain to any person at work on site',
    ],
    correctAnswer: 2,
    explanation:
      'RIDDOR requires reporting of deaths, specified injuries, over-7-day injuries, occupational diseases and dangerous occurrences.',
    difficulty: 'intermediate',
  },
  {
    id: 19,
    question: 'How quickly must deaths and specified injuries be reported under RIDDOR?',
    options: [
      'In writing only, within 28 days of the date of the incident',
      'By email to the local authority environmental health team within 24 hours',
      'At the next routine HSE inspection of the site by an inspector',
      'Immediately by telephone followed by written report within 10 days',
    ],
    correctAnswer: 3,
    explanation:
      'Deaths and specified injuries must be reported to the HSE without delay by the quickest practicable means, followed by a written report within 10 days.',
    difficulty: 'intermediate',
  },
  {
    id: 20,
    question: "What is a 'specified injury' under RIDDOR?",
    options: [
      'Serious injuries including fractures, amputations, serious burns',
      'Any injury needing treatment beyond first aid, whatever the injury is',
      'A minor cut, graze or bruise that draws a small amount of blood',
      'Any absence from work, lasting more than one full working shift',
    ],
    correctAnswer: 0,
    explanation:
      'Specified injuries include fractures (other than to fingers, thumbs and toes), amputations, serious eye injuries, serious burns, and other major injuries.',
    difficulty: 'intermediate',
  },
  {
    id: 21,
    question: 'What is the role of safety representatives?',
    options: [
      'To enforce health and safety law and serve prohibition notices on the employer',
      'To represent employees in consultations with employers on health and safety matters',
      'To carry out all the site risk assessments and method statements for the employer',
      'To provide first-aid cover on site and keep the accident book up to date',
    ],
    correctAnswer: 1,
    explanation:
      'Safety representatives represent employees in consultations with employers on health and safety matters.',
    difficulty: 'basic',
  },
  {
    id: 22,
    question: 'What powers do safety representatives have?',
    options: [
      'To dismiss workers, where they repeatedly breach the company safety rules',
      'To serve improvement and prohibition notices, acting in place of the HSE',
      'To investigate accidents, inspect the workplace, receive information, be consulted',
      'To prosecute the employer in the magistrates\' court, on behalf of members',
    ],
    correctAnswer: 2,
    explanation:
      'Safety representatives can investigate accidents, inspect workplaces, receive information and be consulted on safety matters.',
    difficulty: 'intermediate',
  },
  {
    id: 23,
    question: 'What is an improvement notice?',
    options: [
      'A notice requiring immediate stoppage of a dangerous work activity on site',
      'An internal memo from a site supervisor about poor housekeeping and untidy storage',
      'A voluntary code of good practice published by a recognised trade association',
      'A legal notice requiring improvement to health and safety within a specified time',
    ],
    correctAnswer: 3,
    explanation:
      'An improvement notice is a legal notice from HSE requiring specific improvements within a set time period.',
    difficulty: 'basic',
  },
  {
    id: 24,
    question: 'What is a prohibition notice?',
    options: [
      'A legal notice requiring immediate cessation of activities that pose imminent danger',
      'A notice giving a set period of time in which to correct a safety failing',
      'A written warning that further training is needed before work can restart',
      'A notice requiring the whole workplace to be closed down permanently by the council',
    ],
    correctAnswer: 0,
    explanation:
      'A prohibition notice requires immediate cessation of activities that pose a risk of serious personal injury.',
    difficulty: 'intermediate',
  },
  {
    id: 25,
    question: 'Can improvement and prohibition notices be appealed?',
    options: [
      'No, HSE notices are final once served',
      'Yes, to an employment tribunal',
      'Yes, but only by written appeal to the HSE',
      'Yes, by judicial review in the High Court',
    ],
    correctAnswer: 1,
    explanation:
      'Both improvement and prohibition notices can be appealed to an employment tribunal.',
    difficulty: 'basic',
  },
  {
    id: 26,
    question: 'What is the purpose of health and safety policy?',
    options: [
      'To record every accident and near miss that occurs at work in a single register',
      'To list the names and contact details of all the trained first-aiders on site',
      'To demonstrate employer\'s commitment to health and safety and provide framework for action',
      'To set out the disciplinary procedure to be followed after any breach of the safety rules',
    ],
    correctAnswer: 2,
    explanation:
      "A health and safety policy demonstrates the employer's commitment and provides a framework for managing health and safety.",
    difficulty: 'basic',
  },
  {
    id: 27,
    question: 'When must an employer have a written health and safety policy?',
    options: [
      'If they carry out any construction work',
      'If they employ 10 or more people',
      'In every case, whatever the headcount',
      'If they employ 5 or more people',
    ],
    correctAnswer: 3,
    explanation: 'Employers with 5 or more employees must have a written health and safety policy.',
    difficulty: 'basic',
  },
  {
    id: 28,
    question: 'What are the three main parts of a health and safety policy?',
    options: [
      'Statement of intent, organisation, and arrangements',
      'Policy, procedure, enforcement, and disciplinary action',
      'Hazards, risk ratings, control measures, and monitoring',
      'Aims, objectives, outcomes, targets and review dates',
    ],
    correctAnswer: 0,
    explanation:
      'A health and safety policy consists of a statement of intent, organisation section (who does what), and arrangements section (how it is done).',
    difficulty: 'basic',
  },
  {
    id: 29,
    question: "What does 'so far as is reasonably practicable' mean?",
    options: [
      'Doing whatever is technically possible whatever the cost involved',
      'Balance the risk against the cost and effort of reducing it',
      'Choosing the cheapest control measure available each time',
      'Acting only after an accident has already happened on the site',
    ],
    correctAnswer: 1,
    explanation:
      'It means balancing the risk against the cost, time and effort needed to reduce or eliminate it.',
    difficulty: 'basic',
  },
  {
    id: 30,
    question: 'What is the purpose of an Approved Code of Practice (ACOP)?',
    options: [
      'To replace the need to read the regulations themselves',
      'To set out the penalties for breaching health and safety law',
      'To give practical guidance on complying with legal duties',
      'To record the findings of a workplace risk assessment',
    ],
    correctAnswer: 2,
    explanation:
      'ACOPs provide practical guidance on how to comply with legal duties and have special status in legal proceedings.',
    difficulty: 'basic',
  },
  {
    id: 31,
    question: 'What is corporate manslaughter?',
    options: [
      'A civil claim brought by an injured employee seeking compensation at court',
      'A breach of contract between the client and the main contractor',
      'An offence charged against an individual director, never the company itself',
      "A serious criminal offence where an organisation's failure causes death",
    ],
    correctAnswer: 3,
    explanation:
      "Corporate manslaughter is a serious criminal offence where an organisation's management failures cause death.",
    difficulty: 'basic',
  },
  {
    id: 32,
    question: 'What are the penalties for corporate manslaughter?',
    options: [
      'Unlimited fine, remedial orders, publicity orders',
      'A fixed fine capped at £50,000 with no other sanction',
      'Imprisonment of the company secretary, for up to two years',
      'Automatic dissolution of the company, ordered by the courts',
    ],
    correctAnswer: 0,
    explanation:
      'Penalties for corporate manslaughter include unlimited fines, remedial orders to address failures, and publicity orders.',
    difficulty: 'basic',
  },
  {
    id: 33,
    question: 'What must employers consult employees about?',
    options: [
      'The annual profit figures, turnover and future business strategy of the firm',
      'Health and safety measures, risks, preventive measures, competent persons',
      'Individual pay rates, and the contractual terms of each role on site',
      'The choice of material suppliers, and of subcontractors, for the project',
    ],
    correctAnswer: 1,
    explanation:
      'Employers must consult on health and safety measures, risks, preventive measures, and appointment of competent persons.',
    difficulty: 'intermediate',
  },
  {
    id: 34,
    question: 'What information must employers provide to employees?',
    options: [
      'The commercial value of each contract, and the margin being made on it',
      'A weekly summary of output, hours worked and productivity for each worker',
      'Health and safety information, risks, preventive measures, emergency procedures',
      'The personal medical records, and sickness absence, of other employees',
    ],
    correctAnswer: 2,
    explanation:
      'Employers must provide information on health and safety, risks, preventive measures, and emergency procedures.',
    difficulty: 'basic',
  },
  {
    id: 35,
    question: 'What is vicarious liability?',
    options: [
      'Personal liability of an employee for damage to the company tools',
      'The duty of the client to insure every contractor and visitor on the site',
      'Contractor liability for sub-contractors they did not appoint or pay for',
      'Employer liability for acts of employees in the course of employment',
    ],
    correctAnswer: 3,
    explanation:
      'Vicarious liability means employers can be held liable for health and safety failures by their employees.',
    difficulty: 'intermediate',
  },
  {
    id: 36,
    question: 'What are the main enforcement powers of HSE inspectors?',
    options: [
      'Enter premises, examine, investigate, issue notices, prosecute',
      'Dismiss unsafe workers on the spot, then appoint their replacements',
      'Set the wages, hours and rest breaks of site operatives',
      'Approve building designs, and drawings, before construction may begin',
    ],
    correctAnswer: 0,
    explanation:
      'HSE inspectors can enter premises, examine and investigate, issue improvement/prohibition notices, and prosecute.',
    difficulty: 'intermediate',
  },
  {
    id: 37,
    question: 'What is the difference between regulations and guidance?',
    options: [
      'Guidance is legally binding, regulations are only advisory',
      'Regulations are legally binding, guidance is advisory',
      'Both regulations and guidance are advisory, neither is binding',
      'Regulations carry the force of law, and so does guidance',
    ],
    correctAnswer: 1,
    explanation:
      'Regulations have legal force and must be followed, while guidance is advisory best practice.',
    difficulty: 'intermediate',
  },
  {
    id: 38,
    question: 'What is the purpose of health surveillance?',
    options: [
      'To screen out unfit applicants before they are offered a job',
      'To record sickness absence for pay and payroll purposes',
      'To detect health effects early and take preventive action',
      'To replace the need for control measures at source',
    ],
    correctAnswer: 2,
    explanation:
      'Health surveillance detects adverse health effects at an early stage so preventive action can be taken.',
    difficulty: 'basic',
  },
  {
    id: 39,
    question: 'When might health surveillance be required?',
    options: [
      'For every employee at the start of any new job, whatever the work involves',
      'Only after an accident has caused harm, never before that point',
      'Whenever an employee asks for a medical check, for personal reasons',
      "When there's exposure to specific hazards like noise, vibration, asbestos",
    ],
    correctAnswer: 3,
    explanation:
      'Health surveillance is required for exposure to specified hazards that can cause identifiable health effects.',
    difficulty: 'intermediate',
  },
  {
    id: 40,
    question: 'What is the role of occupational health?',
    options: [
      'To prevent work-related illness and promote health and wellbeing',
      'To investigate site accidents and report them to the HSE',
      'To carry out the inspection and testing of all electrical equipment',
      'To enforce health and safety law across the whole of the workplace',
    ],
    correctAnswer: 0,
    explanation:
      'Occupational health prevents work-related illness and injury and promotes worker health and wellbeing.',
    difficulty: 'basic',
  },
  {
    id: 41,
    question: 'What are absolute duties in health and safety law?',
    options: [
      'Duties that apply only to the employer and never to the employee or client',
      'Duties that must be complied with regardless of cost or practicability',
      'Duties that need only be met so far as is reasonably practicable',
      'Duties that take effect only after an improvement notice has been served',
    ],
    correctAnswer: 1,
    explanation:
      "Absolute duties must be complied with regardless of cost - there are no qualifying words like 'reasonably practicable'.",
    difficulty: 'intermediate',
  },
  {
    id: 42,
    question: 'What is the significance of British Standards in health and safety?',
    options: [
      'They are legally binding statutes made by Parliament that override regulations',
      'They apply only to manufacturers and never to installers of equipment',
      'They provide recognised standards that can be used as evidence of good practice',
      'They are written by the HSE and enforced directly by its inspectors',
    ],
    correctAnswer: 2,
    explanation:
      'British Standards provide recognised standards of good practice that can be used as evidence in legal proceedings.',
    difficulty: 'intermediate',
  },

  // Section 2: Electric Shock and Burns (Questions 43-84)
  {
    id: 43,
    question: 'What is the most dangerous current path through the human body?',
    options: [
      'Foot to foot across the ground',
      'Hand to elbow on the same arm',
      'Fingertip to fingertip on one hand',
      'Hand to hand across the chest',
    ],
    correctAnswer: 3,
    explanation:
      'Hand to hand across the chest is most dangerous as current passes through the heart, potentially causing ventricular fibrillation.',
    difficulty: 'intermediate',
  },
  {
    id: 44,
    question: 'At what current level can electric shock become fatal?',
    options: [
      '50 milliamps',
      '500 milliamps',
      '5 milliamps',
      '1,000 milliamps',
    ],
    correctAnswer: 0,
    explanation:
      'Currents as low as 50mA can cause ventricular fibrillation and be potentially fatal.',
    difficulty: 'intermediate',
  },
  {
    id: 45,
    question: 'What determines the severity of electric shock?',
    options: [
      'The make, model and rating of the equipment involved',
      'Current, duration, path through body, frequency',
      'The time of day, and the weather, when the contact occurs',
      'The colour, size and length of the cable touched',
    ],
    correctAnswer: 1,
    explanation:
      'Shock severity depends on current magnitude, duration of contact, path through the body, and frequency.',
    difficulty: 'intermediate',
  },
  {
    id: 46,
    question: "What voltage is considered 'low voltage' in the UK?",
    options: [
      'Up to 50V AC or 120V DC',
      'Up to 230V AC or 400V DC',
      'Up to 1000V AC or 1500V DC',
      'Up to 11,000V AC or 15,000V DC',
    ],
    correctAnswer: 2,
    explanation:
      'Low voltage is defined as not exceeding 1000V AC or 1500V DC between conductors or 600V AC or 900V DC to earth.',
    difficulty: 'basic',
  },
  {
    id: 47,
    question: 'What is the typical voltage of a domestic electrical supply in the UK?',
    options: [
      '110V AC',
      '240V DC',
      '415V AC',
      '230V',
    ],
    correctAnswer: 3,
    explanation: 'The standard domestic supply voltage in the UK is 230V single phase.',
    difficulty: 'basic',
  },
  {
    id: 48,
    question: 'What immediate action should you take if someone receives an electric shock?',
    options: [
      'Switch off power supply or remove casualty using non-conductive material',
      'Grab the casualty by the arm and pull them clear of the equipment',
      'Throw water over the casualty to break the flow of the current',
      'Wait for the circuit RCD to trip on its own before going near the casualty',
    ],
    correctAnswer: 0,
    explanation:
      'First switch off the power or use non-conductive material to break contact - never touch someone still in contact with electricity.',
    difficulty: 'basic',
  },
  {
    id: 49,
    question: 'What is the effect of 1-5mA current through the body?',
    options: [
      'Fatal',
      'Barely perceptible',
      'Muscular control lost',
      'Painful shock',
    ],
    correctAnswer: 1,
    explanation: '1-5mA produces a barely perceptible tingling sensation.',
    difficulty: 'basic',
  },
  {
    id: 50,
    question: 'At what current level do you lose muscular control (let-go threshold)?',
    options: [
      '30-100mA',
      '100-300mA',
      '10-20mA',
      '300-500mA',
    ],
    correctAnswer: 2,
    explanation: 'At 10-20mA, muscular control is lost and you cannot let go of the conductor.',
    difficulty: 'basic',
  },
  {
    id: 51,
    question: 'What happens at current levels of 50-100mA?',
    options: [
      'A barely perceptible tingling sensation in the hand',
      'Mild discomfort in the arm with no lasting effect',
      'A temporary loss of grip that quickly recovers',
      'Ventricular fibrillation - potentially fatal',
    ],
    correctAnswer: 3,
    explanation:
      '50-100mA can cause ventricular fibrillation of the heart, which is potentially fatal.',
    difficulty: 'intermediate',
  },
  {
    id: 52,
    question: 'Why is AC more dangerous than DC at the same voltage?',
    options: [
      'AC causes muscular spasm and affects the heart rhythm',
      'AC is always carried at a much higher voltage than DC is',
      'AC cannot be protected against by an RCD or a fuse',
      'AC produces far greater heat at the point of contact',
    ],
    correctAnswer: 0,
    explanation:
      'AC at 50Hz is particularly dangerous as it can cause muscular spasm and interfere with heart rhythm.',
    difficulty: 'intermediate',
  },
  {
    id: 53,
    question: 'What factors affect body resistance to electric current?',
    options: [
      'The phase rotation (L1/L2/L3 sequence) of the supply, and its polarity',
      'Skin condition (wet/dry), contact area, voltage, frequency',
      'The age, make and rating (nameplate data) of the tool/appliance used',
      'The earthing arrangement (TT/TN-S), and nothing else',
    ],
    correctAnswer: 1,
    explanation:
      'Body resistance varies with skin condition, contact area, applied voltage, current frequency and individual factors.',
    difficulty: 'basic',
  },
  {
    id: 54,
    question: 'How does wet skin affect electrical resistance?',
    options: [
      'Slightly increases resistance',
      'Has no measurable effect on resistance',
      'Dramatically reduces resistance',
      'Only affects resistance at high voltage',
    ],
    correctAnswer: 2,
    explanation:
      'Wet skin dramatically reduces electrical resistance, making electric shock more likely and severe.',
    difficulty: 'basic',
  },
  {
    id: 55,
    question: 'What is the typical resistance of dry skin?',
    options: [
      '10-100 ohms',
      '100-1,000 ohms',
      '10,000,000-100,000,000 ohms',
      '1000-100,000 ohms',
    ],
    correctAnswer: 3,
    explanation:
      'Dry skin typically has resistance of 1000-100,000 ohms, but this drops dramatically when wet.',
    difficulty: 'basic',
  },
  {
    id: 56,
    question: 'What type of burn is caused by electric current?',
    options: [
      'Deep internal burns along current path',
      'Only superficial reddening of the outer skin',
      'Burns confined to the point of contact alone',
      'Cold burns caused by rapid heat loss from tissue',
    ],
    correctAnswer: 0,
    explanation:
      'Electric current causes deep internal burns along the current path through tissues and organs.',
    difficulty: 'basic',
  },
  {
    id: 57,
    question: 'What is an arc burn?',
    options: [
      'A burn caused by direct contact with a hot pipe/flue surface',
      'Burn caused by electric arc/flash producing intense heat',
      'A burn caused by friction against a moving belt/shaft',
      'A burn caused by chemical contact with battery acid/electrolyte',
    ],
    correctAnswer: 1,
    explanation:
      'Arc burns are caused by electric arcs/flashes that can reach temperatures of around 20,000°C causing severe burns.',
    difficulty: 'basic',
  },
  {
    id: 58,
    question: 'What temperature can an electric arc reach?',
    options: [
      '100,000°C',
      '500,000°C',
      '20,000°C',
      '1,000,000°C',
    ],
    correctAnswer: 2,
    explanation:
      'Electric arcs can reach temperatures of approximately 20,000°C - hotter than the surface of the sun.',
    difficulty: 'basic',
  },
  {
    id: 59,
    question: 'What are the main types of electrical burns?',
    options: [
      'Friction burns, cold burns, and chemical burns',
      'Sunburn, scalds, and radiation burns',
      'First-degree, second-degree, and third-degree only',
      'Contact burns, arc burns, and flash burns',
    ],
    correctAnswer: 3,
    explanation:
      'The main types are contact burns (from touching live parts), arc burns, and flash burns from electrical explosions.',
    difficulty: 'basic',
  },
  {
    id: 60,
    question: 'How should electrical burns be treated?',
    options: [
      'Cool with water for 20+ minutes, cover with sterile dressing, seek medical help',
      'Apply butter or antiseptic cream, then bandage the burn tightly',
      'Burst any blisters that form, and rub antiseptic cream into the burn',
      'Leave the burn open to the air, holding ice against the damaged skin',
    ],
    correctAnswer: 0,
    explanation:
      'Cool burns with cool running water for at least 20 minutes, cover with a sterile dressing, and seek medical attention.',
    difficulty: 'intermediate',
  },
  {
    id: 61,
    question: 'What makes electrical burns particularly dangerous?',
    options: [
      'They always heal far more quickly than an ordinary heat burn does',
      'Internal damage may be extensive despite limited external signs',
      'They never need medical attention once the pain has gone',
      'They damage only the outer surface layers of the skin and heal fast',
    ],
    correctAnswer: 1,
    explanation:
      "Electrical burns can cause extensive internal damage to organs and tissues that isn't visible externally.",
    difficulty: 'basic',
  },
  {
    id: 62,
    question: 'What immediate first aid should be given for electric shock?',
    options: [
      'Give the casualty food, and a hot/sweet drink, to restore energy',
      'Sit the casualty upright, then leave them in a quiet/dark room',
      'Check for breathing/circulation, give CPR if needed, treat for shock',
      'Encourage the casualty to walk about the site, to restore pulse/breathing',
    ],
    correctAnswer: 2,
    explanation:
      'Check breathing and circulation, give CPR if required, treat for shock and get immediate medical help.',
    difficulty: 'basic',
  },
  {
    id: 63,
    question: 'Why should you never use water on electrical equipment during a fire?',
    options: [
      'Water reacts with copper conductors to give off toxic fumes',
      'Water makes the fire spread more quickly through the building',
      'Water damages the equipment beyond economic repair',
      'Water conducts electricity and can cause electrocution',
    ],
    correctAnswer: 3,
    explanation:
      'Water conducts electricity and using it on live electrical equipment can cause electrocution.',
    difficulty: 'intermediate',
  },
  {
    id: 64,
    question: 'What type of fire extinguisher should be used on electrical fires?',
    options: [
      'CO2 or dry powder',
      'Water or water mist',
      'Foam or AFFF spray',
      'Class F wet chemical',
    ],
    correctAnswer: 0,
    explanation:
      "CO2 or dry powder extinguishers should be used on electrical fires as they don't conduct electricity.",
    difficulty: 'intermediate',
  },
  {
    id: 65,
    question: 'What is step potential?',
    options: [
      'The voltage drop measured along the whole length of a final circuit cable',
      'Voltage difference between feet when walking near earthed equipment',
      'The voltage induced in a cable running parallel to a live one',
      'The difference between the declared supply voltage and the load voltage',
    ],
    correctAnswer: 1,
    explanation:
      'Step potential is the voltage difference between feet when walking on ground near earthed electrical equipment.',
    difficulty: 'basic',
  },
  {
    id: 66,
    question: 'What is touch potential?',
    options: [
      'The voltage appearing across an open circuit breaker contact',
      'The lowest voltage at which a person can first feel a shock',
      'Voltage between hand and feet when touching equipment',
      'The voltage measured between line and neutral at a socket',
    ],
    correctAnswer: 2,
    explanation:
      'Touch potential is the voltage difference between hand and feet when touching faulty electrical equipment.',
    difficulty: 'basic',
  },
  {
    id: 67,
    question: 'What is the main protection against direct contact with electricity?',
    options: [
      'Warning signs on the enclosure',
      'Good lighting in the work area',
      'Annual inspection and testing',
      'Insulation of live parts',
    ],
    correctAnswer: 3,
    explanation:
      'Insulation of live parts provides the primary protection against direct contact with electrical conductors.',
    difficulty: 'intermediate',
  },
  {
    id: 68,
    question: 'What is indirect contact?',
    options: [
      'Touching exposed metalwork that has become live due to a fault',
      'Touching a bare live conductor directly with an unprotected hand',
      'Receiving a shock from an arc without touching any conductor',
      'Touching a metal enclosure that is correctly earthed and free of faults',
    ],
    correctAnswer: 0,
    explanation:
      'Indirect contact is touching exposed-conductive-parts (metalwork) that have become live due to an insulation fault.',
    difficulty: 'intermediate',
  },
  {
    id: 69,
    question: 'What protects against indirect contact?',
    options: [
      'Double insulation of every live conductor',
      'Earthing and automatic disconnection',
      'Warning labels on exposed metalwork',
      'Reduced voltage working at 110V',
    ],
    correctAnswer: 1,
    explanation:
      'Earthing and automatic disconnection of supply protects against indirect contact by quickly disconnecting faulty circuits.',
    difficulty: 'intermediate',
  },
  {
    id: 70,
    question: 'What is an RCD?',
    options: [
      'Rated Circuit Disconnector - disconnects overload current',
      'Resistance Calibration Device - measures earthing resistance',
      'Residual Current Device - detects earth leakage currents',
      'Reduced Current Distributor - lowers supply voltage',
    ],
    correctAnswer: 2,
    explanation:
      'An RCD (Residual Current Device) detects earth leakage (residual) currents and quickly disconnects the supply.',
    difficulty: 'basic',
  },
  {
    id: 71,
    question: 'How quickly should an RCD operate?',
    options: [
      'Within 100 milliseconds for 30mA types',
      'Within 500 milliseconds for 30mA types',
      'Within 1,000 milliseconds for 30mA types',
      'Within 40 milliseconds for 30mA types',
    ],
    correctAnswer: 3,
    explanation:
      'A 30 mA RCD operates within 40 ms at five times its rating (150 mA), giving rapid disconnection for additional protection. That 40 ms is the BS EN 61008/61009 product-standard figure and describes the device — it is not the BS 7671 verification criterion. Amendment 4 deleted Table 3A of Appendix 3, and effectiveness is now verified by an AC test at the rated residual operating current: 300 ms maximum for a general non-delay type (Reg 643.7.3).',
    difficulty: 'basic',
  },
  {
    id: 72,
    question: 'What current should a standard RCD trip at?',
    options: [
      '30mA',
      '100mA',
      '300mA',
      '500mA',
    ],
    correctAnswer: 0,
    explanation:
      'RCDs providing additional protection trip at 30mA, which is below the level that causes ventricular fibrillation.',
    difficulty: 'basic',
  },
  {
    id: 73,
    question: 'Why are isolation procedures important?',
    options: [
      'To reduce energy consumption while equipment is idle',
      'To prevent electric shock during maintenance work',
      'To extend the working life of the electrical equipment',
      'To satisfy the building insurer requirements only',
    ],
    correctAnswer: 1,
    explanation:
      'Proper isolation prevents electric shock and ensures safety during maintenance and repair work.',
    difficulty: 'basic',
  },
  {
    id: 74,
    question: 'What is the safe isolation procedure?',
    options: [
      'Switch off, test for voltage, then begin work immediately',
      'Isolate, work, then lock off once the job is finished',
      'Switch off, isolate, lock off, test, prove dead',
      'Lock off, prove dead, then re-energise to confirm the circuit',
    ],
    correctAnswer: 2,
    explanation:
      'Safe isolation requires switching off, isolating, locking off, proving the tester, testing the circuit dead, then re-proving the tester.',
    difficulty: 'intermediate',
  },
  {
    id: 75,
    question: 'What should you do before starting work on electrical equipment?',
    options: [
      'Assume it is dead if the main switch has already been turned off',
      'Touch the conductor briefly with a finger to check for a tingle',
      'Rely on the circuit chart at the board to confirm it is dead',
      'Prove the equipment is dead using an approved voltage tester',
    ],
    correctAnswer: 3,
    explanation:
      'Always prove equipment is dead using a properly functioning approved voltage tester before starting work.',
    difficulty: 'basic',
  },
  {
    id: 76,
    question: 'What is the purpose of proving the tester?',
    options: [
      'To ensure the tester is working before and after testing',
      'To calibrate the tester against the declared supply voltage',
      'To warm the tester batteries up before the first test of the day',
      'To record the measured voltage for the test certificate record',
    ],
    correctAnswer: 0,
    explanation:
      "Proving the tester on a known live source (proving unit) before and after testing confirms it was working throughout - a fault could develop mid-test.",
    difficulty: 'basic',
  },
  {
    id: 77,
    question: 'What happens during ventricular fibrillation?',
    options: [
      'The heart stops beating completely, and cannot be restarted by CPR',
      'Heart muscle fibres contract randomly, stopping effective pumping',
      'The heart rate slows down, but keeps pumping blood normally',
      'The heart valves seize shut, blocking the flow of blood completely',
    ],
    correctAnswer: 1,
    explanation:
      'Ventricular fibrillation causes heart muscle fibres to contract randomly, stopping effective blood circulation.',
    difficulty: 'basic',
  },
  {
    id: 78,
    question: 'What is the treatment for ventricular fibrillation?',
    options: [
      'Place in the recovery position',
      'Give the casualty a sugary drink',
      'Defibrillation and CPR',
      'Apply firm pressure to the chest',
    ],
    correctAnswer: 2,
    explanation:
      'Ventricular fibrillation requires immediate defibrillation (AED) and CPR to restore a normal heart rhythm.',
    difficulty: 'intermediate',
  },
  {
    id: 79,
    question: 'Why is 50Hz AC particularly dangerous?',
    options: [
      'It carries far more energy than direct current at the same voltage',
      'It cannot be detected by a standard approved voltage tester',
      'It heats the conductor far more quickly than a DC supply does',
      'It interferes with the natural electrical signals controlling the heart',
    ],
    correctAnswer: 3,
    explanation:
      "50Hz AC is particularly dangerous as it can interfere with the heart's natural electrical rhythm.",
    difficulty: 'intermediate',
  },
  {
    id: 80,
    question: 'What protective equipment helps prevent electric shock?',
    options: [
      'Insulated tools, gloves, mats, footwear',
      'Hi-vis vest, hard hat and steel toe-caps',
      'Hearing protection, dust mask and knee pads',
      'Cut-resistant gloves, rubber knee pads',
    ],
    correctAnswer: 0,
    explanation:
      'Insulated tools, rubber gloves, insulating mats and footwear provide protection against electric shock.',
    difficulty: 'basic',
  },
  {
    id: 81,
    question: "What voltage is considered 'extra low voltage'?",
    options: [
      'Up to 110V AC or 220V DC',
      'Up to 50V AC or 120V DC',
      'Up to 400V AC or 500V DC',
      'Up to 1,000V AC or 1,000V DC',
    ],
    correctAnswer: 1,
    explanation:
      'Extra low voltage (ELV) is not more than 50V AC or 120V DC between conductors or to earth.',
    difficulty: 'basic',
  },
  {
    id: 82,
    question: 'What is SELV?',
    options: [
      'Single Earth Live Voltage - one earthed conductor',
      'Standard Equipment Low Voltage - mains-derived supply',
      'Safety Extra Low Voltage - separated from earth',
      'Supply Equalised Line Voltage - balanced phases',
    ],
    correctAnswer: 2,
    explanation:
      'SELV (Safety Extra Low Voltage) is extra low voltage separated from earth and other circuits.',
    difficulty: 'intermediate',
  },
  {
    id: 83,
    question: 'What precautions should be taken in wet conditions?',
    options: [
      'Increase the supply voltage (above 230V), to overcome earth resistance',
      'Work with bare hands (ungloved), for a better grip on wet tools',
      'Remove the RCD protection (30 mA type), to stop nuisance tripping',
      'Use reduced voltage supplies (110V or lower), RCD protection',
    ],
    correctAnswer: 3,
    explanation:
      'In wet conditions use reduced voltage supplies (110V centre-tapped or battery tools) and RCD protection.',
    difficulty: 'intermediate',
  },
  {
    id: 84,
    question: 'What makes someone more susceptible to electric shock?',
    options: [
      'Wet skin, medical conditions, fatigue, contact area',
      'Insulated footwear, rubber gloves and insulating mats',
      'A dry insulating mat, placed under the person working',
      'Battery tools, used in place of mains-powered equipment',
    ],
    correctAnswer: 0,
    explanation:
      'Wet skin, certain medical conditions, fatigue, larger contact area and individual physiology affect susceptibility.',
    difficulty: 'intermediate',
  },

  // Section 3: Risk Assessment & Method Statements (Questions 85-126)
  {
    id: 85,
    question: 'What is the main purpose of a risk assessment?',
    options: [
      'To apportion blame to a worker or a supervisor after an accident has happened',
      'To identify hazards and evaluate risks to implement appropriate controls',
      'To record the cost of all the safety equipment used on the project',
      'To satisfy the paperwork demands of the client without changing the works',
    ],
    correctAnswer: 1,
    explanation:
      'Risk assessment identifies hazards, evaluates risks and determines appropriate control measures to prevent harm.',
    difficulty: 'basic',
  },
  {
    id: 86,
    question: 'What are the five steps of risk assessment?',
    options: [
      'Plan, do, check, act, then report the findings to the local enforcing authority',
      'Eliminate, substitute, isolate, control, protect, then review the work annually',
      'Identify hazards, decide who might be harmed, evaluate risks, record findings, review',
      'Assess, approve, authorise, audit, then archive the completed site paperwork',
    ],
    correctAnswer: 2,
    explanation:
      'The HSE five steps are: identify hazards, decide who might be harmed, evaluate risks, record findings, and review regularly.',
    difficulty: 'intermediate',
  },
  {
    id: 87,
    question: 'What is a hazard?',
    options: [
      'The likelihood that harm will actually occur',
      'The combination of likelihood and severity of harm',
      'A control measure put in place to reduce harm',
      'Something with potential to cause harm',
    ],
    correctAnswer: 3,
    explanation:
      'A hazard is anything with the potential to cause harm, such as chemicals, electricity, or working at height.',
    difficulty: 'basic',
  },
  {
    id: 88,
    question: 'What is risk?',
    options: [
      'The likelihood that a hazard will cause harm and the severity of that harm',
      'Anything present in the workplace that has the potential to cause harm',
      'The control measure chosen to remove a hazard from the workplace entirely',
      'The number of people who could be present in a work area at one time',
    ],
    correctAnswer: 0,
    explanation:
      'Risk is the likelihood that a hazard will cause harm, combined with the severity of potential harm.',
    difficulty: 'intermediate',
  },
  {
    id: 89,
    question: 'What is the hierarchy of control measures?',
    options: [
      'PPE, training, written procedures, engineering controls, elimination',
      'Elimination, substitution, engineering controls, administrative controls, PPE',
      'Planning, implementing, monitoring, reviewing and auditing the control measures',
      'Identification, evaluation, control, monitoring and record keeping',
    ],
    correctAnswer: 1,
    explanation:
      'The hierarchy is: elimination, substitution, engineering controls, administrative controls, and PPE as last resort.',
    difficulty: 'intermediate',
  },
  {
    id: 90,
    question: 'Which control measure is most effective?',
    options: [
      'Personal protective equipment',
      'Administrative controls and procedures',
      'Elimination of the hazard',
      'Warning signs and supervision',
    ],
    correctAnswer: 2,
    explanation:
      'Elimination of the hazard is the most effective control measure as it completely removes the risk at the top of the hierarchy.',
    difficulty: 'intermediate',
  },
  {
    id: 91,
    question: 'When should risk assessments be reviewed?',
    options: [
      'Once only, at the point when the work first begins',
      'When the HSE, or an insurer, asks to see a written copy',
      'At the end of each project, just before handover',
      'Regularly, after incidents, when changes occur',
    ],
    correctAnswer: 3,
    explanation:
      'Risk assessments should be reviewed regularly, after incidents, accidents, or when significant changes occur.',
    difficulty: 'intermediate',
  },
  {
    id: 92,
    question: 'Who should carry out risk assessments?',
    options: [
      'Competent person with knowledge of the work and hazards',
      'Any available worker, whatever their experience of the job',
      'An external HSE inspector during a routine visit to the site',
      'The client who commissioned the work and pays the invoices',
    ],
    correctAnswer: 0,
    explanation:
      'Risk assessments should be carried out by competent persons with knowledge of the work and associated hazards.',
    difficulty: 'basic',
  },
  {
    id: 93,
    question: 'What should be recorded in a risk assessment?',
    options: [
      'The cost of every tool, material and hire item used on the job',
      'Significant findings, people at risk, control measures',
      'The names of the clients, designers and consultants on the project',
      'A word-for-word transcript of every toolbox talk, dated and signed',
    ],
    correctAnswer: 1,
    explanation:
      'Written records should be kept of significant findings, people at risk, and control measures implemented.',
    difficulty: 'intermediate',
  },
  {
    id: 94,
    question: 'What is a method statement?',
    options: [
      'A list of every hazard present on a construction site',
      'A record of the accidents that have occurred on site',
      'A document describing how work will be carried out safely',
      'A priced schedule of the materials and plant needed for a job',
    ],
    correctAnswer: 2,
    explanation:
      'A method statement describes the sequence of operations and safety measures for carrying out specific work.',
    difficulty: 'basic',
  },
  {
    id: 95,
    question: 'What should a method statement include?',
    options: [
      'The names, trade qualifications and pay rates of the workers',
      'The start and finish dates, and the agreed programme of works',
      'The full cost breakdown, plus the priced schedule of works for the client',
      'Work sequence, hazards, control measures, emergency procedures, supervision',
    ],
    correctAnswer: 3,
    explanation:
      'Method statements should include work sequence, hazards, control measures, emergency procedures and supervision arrangements.',
    difficulty: 'intermediate',
  },
  {
    id: 96,
    question: 'Who should be involved in developing method statements?',
    options: [
      'Competent persons, supervisors, and experienced workers',
      'The client, and the architect who designed the building',
      'Apprentices working on their own, without direct supervision',
      'The HSE inspector, who is responsible for the local region',
    ],
    correctAnswer: 0,
    explanation:
      'Method statements should involve competent persons, supervisors and experienced workers who understand the work.',
    difficulty: 'intermediate',
  },
  {
    id: 97,
    question: 'When are method statements typically required?',
    options: [
      'For every task on site, however small or low-risk it is',
      'For high-risk activities, complex work, CDM projects',
      'After an accident has occurred, as part of the investigation',
      'Whenever the client asks for one, under the contract documents',
    ],
    correctAnswer: 1,
    explanation:
      'Method statements are typically required for high-risk activities, complex work and construction projects under CDM.',
    difficulty: 'intermediate',
  },
  {
    id: 98,
    question: 'What is the relationship between risk assessment and method statements?',
    options: [
      'They are two different names, used for the very same site document',
      'The method statement is written first, and the assessment follows',
      'Risk assessment identifies risks, method statement describes control measures',
      'A method statement removes the need for a risk assessment, in every case',
    ],
    correctAnswer: 2,
    explanation:
      'Risk assessments identify hazards and risks; method statements describe how to control those risks during work.',
    difficulty: 'intermediate',
  },
  {
    id: 99,
    question: 'What factors should be considered when assessing who might be harmed?',
    options: [
      'The directly employed workforce, as named on the site timesheet',
      'The person carrying out the task, and their direct supervisor',
      'Anyone who has signed the risk assessment, before work starts',
      'Workers, visitors, contractors, public, special groups',
    ],
    correctAnswer: 3,
    explanation:
      'Consider all who might be affected: workers, visitors, contractors, public, and special groups like pregnant women.',
    difficulty: 'intermediate',
  },
  {
    id: 100,
    question: 'What special considerations apply to young workers?',
    options: [
      'Lack experience, may take risks, physical development incomplete',
      'They are exempt from wearing personal protective equipment, whatever the risk',
      'They do not need a site induction, or a safety briefing',
      'They are barred by law from any construction site, whatever their training',
    ],
    correctAnswer: 0,
    explanation:
      'Young workers lack experience, may be more willing to take risks, and their physical development may be incomplete.',
    difficulty: 'intermediate',
  },
  {
    id: 101,
    question: 'What considerations apply to pregnant workers?',
    options: [
      'They must be removed from the workplace until after the birth',
      'Certain hazards pose additional risks to mother and unborn child',
      'No special consideration is needed at any stage of the work',
      'They must supply their own protective equipment and specialist clothing',
    ],
    correctAnswer: 1,
    explanation:
      'Pregnancy may increase risks from certain hazards, requiring additional controls to protect mother and child.',
    difficulty: 'intermediate',
  },
  {
    id: 102,
    question: "What is meant by 'reasonably foreseeable'?",
    options: [
      'Events that have already happened on a previous project',
      'Any event at all, however unlikely or far-fetched it may be',
      'Events that are likely to happen or could reasonably be expected',
      'Events specifically listed in the manufacturer written instructions',
    ],
    correctAnswer: 2,
    explanation:
      'Reasonably foreseeable means events that are likely to happen or could reasonably be expected in the circumstances.',
    difficulty: 'basic',
  },
  {
    id: 103,
    question: 'How should risk be calculated?',
    options: [
      'Likelihood + Severity = Risk level',
      'Severity ÷ Likelihood = Risk level',
      'Hazard × Number of workers = Risk level',
      'Likelihood × Severity = Risk level',
    ],
    correctAnswer: 3,
    explanation:
      'Risk is typically calculated by multiplying likelihood of occurrence by severity of potential consequences.',
    difficulty: 'intermediate',
  },
  {
    id: 104,
    question: 'What is a risk matrix used for?',
    options: [
      'To systematically evaluate and prioritise risks',
      'To record the names of those carrying out the work',
      'To calculate the cost of control measures',
      'To list the emergency contact numbers for a site',
    ],
    correctAnswer: 0,
    explanation:
      'A risk matrix helps systematically evaluate likelihood and severity to prioritise risks for action.',
    difficulty: 'basic',
  },
  {
    id: 105,
    question: 'What does ALARP mean?',
    options: [
      'Accident Logging And Risk Prevention',
      'As Low As Reasonably Practicable',
      'Approved Local Accident Reduction Plan',
      'All Likely Accident Risk Prevented',
    ],
    correctAnswer: 1,
    explanation:
      'ALARP means As Low As Reasonably Practicable - the standard for reducing risk in UK legislation.',
    difficulty: 'basic',
  },
  {
    id: 106,
    question: 'What is dynamic risk assessment?',
    options: [
      'A risk assessment completed only at the planning stage',
      'Reusing one generic assessment across all of the firm sites',
      'Ongoing assessment of changing conditions during work',
      'An assessment carried out only by senior management',
    ],
    correctAnswer: 2,
    explanation:
      'Dynamic risk assessment is the ongoing process of assessing changing conditions and new hazards during work.',
    difficulty: 'intermediate',
  },
  {
    id: 107,
    question: 'What should workers do if they identify new hazards?',
    options: [
      'Carry on working and deal with it later',
      'Try to fix the hazard themselves immediately',
      'Note it in the site diary at the end of the shift',
      'Stop work and report to supervisor',
    ],
    correctAnswer: 3,
    explanation:
      'Workers should stop work and report new hazards to their supervisor for assessment and control.',
    difficulty: 'basic',
  },
  {
    id: 108,
    question: 'What is a generic risk assessment?',
    options: [
      'General assessment covering similar activities that can be adapted',
      'An assessment written for one specific site and no other',
      'An assessment carried out while the work is already under way',
      'An assessment required only on projects notified to the HSE first',
    ],
    correctAnswer: 0,
    explanation:
      'Generic risk assessments cover similar activities and can be adapted for specific situations and locations.',
    difficulty: 'basic',
  },
  {
    id: 109,
    question: 'What is a site-specific risk assessment?',
    options: [
      'A general assessment used across many similar sites',
      'Assessment tailored to specific site conditions and hazards',
      'An assessment completed only once the work is already in progress',
      'An assessment carried out by the client before tender',
    ],
    correctAnswer: 1,
    explanation:
      'Site-specific risk assessments are tailored to the particular conditions, hazards and constraints of a specific location.',
    difficulty: 'intermediate',
  },
  {
    id: 110,
    question: 'What information should be communicated to workers?',
    options: [
      'The commercial value of the contract and the profit margin',
      'The personal details of the other workers on the project',
      'Relevant findings of risk assessment and control measures required',
      'The disciplinary records held on their supervisor and the site manager',
    ],
    correctAnswer: 2,
    explanation:
      'Workers must be informed of relevant risk assessment findings and the control measures they need to follow.',
    difficulty: 'intermediate',
  },
  {
    id: 111,
    question: 'What is the purpose of consultation in risk assessment?',
    options: [
      'To transfer legal responsibility onto the workers themselves',
      'To reduce the cost of carrying out the risk assessment',
      'To satisfy the client without altering the work done',
      'To get input from those who understand the work and risks',
    ],
    correctAnswer: 3,
    explanation:
      'Consultation ensures input from those with practical knowledge of the work and risks involved.',
    difficulty: 'intermediate',
  },
  {
    id: 112,
    question: 'What should happen if control measures are not working effectively?',
    options: [
      'Review and revise the risk assessment and control measures',
      'Carry on working and accept the risk that remains',
      'Remove the risk assessment from the site records',
      'Wait until the next scheduled annual review of the assessment',
    ],
    correctAnswer: 0,
    explanation:
      "If control measures aren't effective, the risk assessment should be reviewed and control measures revised.",
    difficulty: 'intermediate',
  },
  {
    id: 113,
    question: 'What is residual risk?',
    options: [
      'The total risk present before any control measures are applied',
      'Risk remaining after control measures have been implemented',
      'The risk transferred to a contractor by the client',
      'The risk that affects only members of the public nearby',
    ],
    correctAnswer: 1,
    explanation:
      'Residual risk is the risk remaining after control measures have been implemented - it should be ALARP.',
    difficulty: 'basic',
  },
  {
    id: 114,
    question: 'What factors affect the acceptability of risk?',
    options: [
      'The personal preference of the worker, whoever is carrying out the task',
      'The time of day, and the weather in which the work is carried out',
      'Benefits, costs, public perception, legal requirements, available alternatives',
      'The size, annual turnover and profit margin of the company doing the work',
    ],
    correctAnswer: 2,
    explanation:
      'Risk acceptability depends on benefits, costs, public perception, legal requirements and available alternatives.',
    difficulty: 'basic',
  },
  {
    id: 115,
    question: 'What is tolerable risk?',
    options: [
      'Risk that must always be eliminated whatever the cost involved',
      'Risk that no longer needs to be monitored or reviewed at any point',
      'Risk that only the employer, and never the worker, is permitted to accept',
      'Risk that can be accepted in current circumstances based on benefits gained',
    ],
    correctAnswer: 3,
    explanation:
      'Tolerable risk can be accepted in current circumstances based on the benefits gained and costs of further reduction.',
    difficulty: 'intermediate',
  },
  {
    id: 116,
    question: 'What should be included in risk assessment training?',
    options: [
      'Hazard identification, risk evaluation, control measures, review processes',
      'Accident reporting procedures, first-aid duties and fire extinguisher training',
      'Manual handling techniques, kinetic lifting and load weight limits',
      'COSHH labelling, safety data sheets and chemical storage arrangements',
    ],
    correctAnswer: 0,
    explanation:
      'Training should cover hazard identification, risk evaluation techniques, control measures and review processes.',
    difficulty: 'intermediate',
  },
  {
    id: 117,
    question: 'How often should method statements be reviewed?',
    options: [
      'Once only, at the point the work first starts on site',
      'When conditions change, after incidents, regularly',
      'At the request of the client, or of the main contractor',
      'At the very end of the project, just before handover',
    ],
    correctAnswer: 1,
    explanation:
      'Method statements should be reviewed when conditions change, after incidents, and as part of regular review.',
    difficulty: 'intermediate',
  },
  {
    id: 118,
    question: 'What is the role of supervision in risk control?',
    options: [
      'To take the place of the other control measures on site',
      'To complete the risk assessment paperwork on behalf of workers',
      'Ensure control measures are followed and remain effective',
      'To carry out all the high-risk work on site personally',
    ],
    correctAnswer: 2,
    explanation:
      'Supervision ensures control measures are properly implemented, followed and remain effective.',
    difficulty: 'intermediate',
  },
  {
    id: 119,
    question: 'What should be done with lessons learned from incidents?',
    options: [
      'File them away without taking any further action',
      'Use them only to discipline the workers involved',
      'Share them with the HSE inspector and no one else',
      'Update risk assessments and method statements',
    ],
    correctAnswer: 3,
    explanation:
      'Lessons learned from incidents should be used to update and improve risk assessments and method statements.',
    difficulty: 'intermediate',
  },
  {
    id: 120,
    question: 'What is a permit to work system?',
    options: [
      'Formal system to control high-risk work through written permission',
      'A licence allowing a worker to enter and work on a construction site',
      'A verbal agreement between two trades working alongside on site',
      'A record of the hours each worker has completed on the job',
    ],
    correctAnswer: 0,
    explanation:
      'Permit to work is a formal system controlling high-risk work through written permission and defined procedures.',
    difficulty: 'basic',
  },
  {
    id: 121,
    question: 'When might permit to work systems be used?',
    options: [
      'For all routine, low-risk maintenance tasks carried out on site',
      'For high-risk work like confined spaces, hot work, electrical isolation',
      'For any work carried out by a subcontractor, not by direct labour',
      'For recording attendance at site inductions, and at toolbox talks',
    ],
    correctAnswer: 1,
    explanation:
      'Permit to work systems are used for high-risk activities like confined space entry, hot work, and electrical isolation.',
    difficulty: 'intermediate',
  },
  {
    id: 122,
    question: 'What should be monitored during risk assessment implementation?',
    options: [
      'The cost of the control measures, set against the original budget',
      'The number of workers present on site, on each day of the works',
      'Effectiveness of control measures, changing conditions, worker compliance',
      'Accident book entries, and lost-time figures, recorded since work began',
    ],
    correctAnswer: 2,
    explanation:
      'Monitor control measure effectiveness, changing conditions, worker compliance and any new hazards arising.',
    difficulty: 'intermediate',
  },
  {
    id: 123,
    question: 'What makes a good risk assessment?',
    options: [
      'Long, highly detailed and covering every conceivable hazard on the site',
      'Written in technical language, aimed at specialist readers only',
      'Completed once at the start of the job, and never revised again',
      'Practical, clear, focused on significant risks, regularly reviewed',
    ],
    correctAnswer: 3,
    explanation:
      'Good risk assessments are practical, clear, focus on significant risks and are regularly reviewed and updated.',
    difficulty: 'basic',
  },
  {
    id: 124,
    question: 'What is human error analysis?',
    options: [
      'Systematic analysis of how and why people make mistakes',
      'A way of blaming individual workers for the accidents they cause',
      'A test of the physical and mental fitness of a worker for a task',
      'A check of the number of hours a worker has already worked',
    ],
    correctAnswer: 0,
    explanation:
      'Human error analysis systematically examines how and why people make mistakes to prevent future errors.',
    difficulty: 'basic',
  },
  {
    id: 125,
    question: 'What factors contribute to human error?',
    options: [
      'The personality and attitude of the individual worker, on their own',
      'Personal factors, job factors, organisational factors, environmental factors',
      'The age, height and length of service of the worker doing the job',
      'The weather conditions, and the site temperature, on the day of the work',
    ],
    correctAnswer: 1,
    explanation:
      'Human error results from personal, job, organisational and environmental factors that should all be considered.',
    difficulty: 'intermediate',
  },
  {
    id: 126,
    question: 'How can the likelihood of human error be reduced?',
    options: [
      'Longer working hours, so that workers gain experience faster',
      'Disciplinary action alone, after every mistake that is made',
      'Good design, training, procedures, culture, and learning from mistakes',
      'Removal of supervision, so that workers manage the risks themselves',
    ],
    correctAnswer: 2,
    explanation:
      'Error reduction requires good design, training, clear procedures, positive culture and learning from mistakes.',
    difficulty: 'basic',
  },

  // Section 4: Personal Protective Equipment (Questions 127-168)
  {
    id: 127,
    question: 'What does PPE stand for?',
    options: [
      'Personal Protection Equipment',
      'Public Protective Equipment',
      'Professional Protection Equipment',
      'Personal Protective Equipment',
    ],
    correctAnswer: 3,
    explanation:
      'PPE stands for Personal Protective Equipment - equipment designed to protect the individual wearer.',
    difficulty: 'basic',
  },
  {
    id: 128,
    question: 'When should PPE be used?',
    options: [
      'As a last resort when other control measures are not sufficient',
      'As the first and preferred control measure for any hazard',
      'Whenever a worker personally asks the storeman to issue it',
      'During any HSE inspection or client safety audit carried out on site',
    ],
    correctAnswer: 0,
    explanation:
      'PPE should be used as a last resort when other control measures cannot adequately reduce the risk.',
    difficulty: 'basic',
  },
  {
    id: 129,
    question: 'What are the main types of head protection?',
    options: [
      'Safety glasses, goggles and face shields',
      'Hard hats, bump caps, hair nets',
      'Ear plugs, ear muffs and ear defenders',
      'Filtering facepieces, dust masks',
    ],
    correctAnswer: 1,
    explanation:
      'Head protection includes hard hats for impact protection, bump caps for minor hazards, and hair nets for hygiene.',
    difficulty: 'basic',
  },
  {
    id: 130,
    question: 'When should safety helmets be worn?',
    options: [
      'When working at height above two metres from ground level',
      'When the client specifically asks for it in the site contract',
      'Where there is risk of head injury from falling objects or impact',
      'When carrying out hot works or using power tools anywhere on the site',
    ],
    correctAnswer: 2,
    explanation:
      'Safety helmets should be worn wherever there is risk of head injury from falling objects or impact.',
    difficulty: 'basic',
  },
  {
    id: 131,
    question: 'What types of eye protection are available?',
    options: [
      'Safety helmets, bump caps and chin harnesses',
      'Ear plugs, ear muffs and semi-insert protectors',
      'Cut-resistant gloves, chemical-resistant gauntlets',
      'Safety glasses, goggles, face shields, welding screens',
    ],
    correctAnswer: 3,
    explanation:
      'Eye protection includes safety glasses, goggles, face shields and welding screens for different hazards.',
    difficulty: 'basic',
  },
  {
    id: 132,
    question: 'When should eye protection be worn?',
    options: [
      'When there\'s risk from flying particles, chemicals, radiation, or bright light',
      'When working outdoors in bright sunlight, or in strong reflected glare',
      'Whenever a task is expected to last longer than an hour, whatever it is',
      'When working at height on a scaffold, a tower or a mobile platform',
    ],
    correctAnswer: 0,
    explanation:
      'Eye protection is needed for risks from flying particles, chemicals, harmful radiation or bright light.',
    difficulty: 'intermediate',
  },
  {
    id: 133,
    question: 'What are the main types of hearing protection?',
    options: [
      'Safety glasses, goggles and welding face shields',
      'Ear plugs, ear muffs, semi-insert protectors',
      'Filtering facepieces, powered air-fed respirator hoods',
      'Safety helmets, bump caps and chin strap harnesses',
    ],
    correctAnswer: 1,
    explanation:
      'Hearing protection includes disposable/reusable ear plugs, ear muffs and semi-insert protectors.',
    difficulty: 'basic',
  },
  {
    id: 134,
    question: 'At what noise level is hearing protection typically required?',
    options: [
      '100 dB(A) and above',
      '90 dB(A) or anything higher',
      '85 dB(A) and above',
      'Any audible noise (any dB(A) reading)',
    ],
    correctAnswer: 2,
    explanation:
      'Hearing protection is typically required at noise levels of 85 dB(A) and above to prevent hearing damage.',
    difficulty: 'intermediate',
  },
  {
    id: 135,
    question: 'What types of respiratory protection are available?',
    options: [
      'Safety glasses, goggles, face shields, welding helmets and eye/face wash bottles',
      'Ear plugs, ear defenders, semi-insert protectors, acoustic booths/hoods',
      'Hard hats, bump caps, chin straps, high-visibility vests/jackets and harnesses',
      'Filtering facepieces, half/full face masks, powered respirators, breathing apparatus',
    ],
    correctAnswer: 3,
    explanation:
      'Respiratory protection includes filtering facepieces, masks, powered respirators and breathing apparatus.',
    difficulty: 'basic',
  },
  {
    id: 136,
    question: 'When is respiratory protection needed?',
    options: [
      'When there\'s risk from dust, fumes, gases, vapours, or oxygen deficiency',
      'When working outdoors in cold, wet or windy weather on an exposed site',
      'When working close to loud machinery, breakers or grinding tools',
      'When there is a risk of objects falling from scaffolds, ladders or open edges',
    ],
    correctAnswer: 0,
    explanation:
      'Respiratory protection is needed for airborne hazards like dust, fumes, gases, vapours or oxygen deficiency.',
    difficulty: 'intermediate',
  },
  {
    id: 137,
    question: 'What are the main types of hand protection?',
    options: [
      'Safety glasses, goggles, face shields, welding helmets and eye-wash bottles',
      'Cut-resistant gloves, chemical-resistant gloves, thermal gloves, electrical gloves',
      'Ear plugs, ear defenders, semi-insert protectors, acoustic booths and hoods',
      'Filtering facepieces, half and full face masks, powered respirators, airline sets',
    ],
    correctAnswer: 1,
    explanation:
      'Hand protection includes cut-resistant, chemical-resistant, thermal and electrical insulating gloves.',
    difficulty: 'basic',
  },
  {
    id: 138,
    question: 'When should hand protection be worn?',
    options: [
      'When handling heavy loads by hand, or lifting awkward items above the shoulder',
      'When the task is expected to last more than one shift, whatever it is',
      'When there\'s risk of cuts, chemical contact, burns, or electrical shock',
      'When working outdoors in cold or wet weather, in the winter months',
    ],
    correctAnswer: 2,
    explanation:
      "Hand protection should be worn when there's risk of cuts, chemical contact, burns or electrical shock.",
    difficulty: 'basic',
  },
  {
    id: 139,
    question: 'What types of foot protection are available?',
    options: [
      'Cut-resistant gloves, thermal gloves, gauntlets and chemical/oil-resistant mitts',
      'Filtering facepieces, half/full masks, powered respirators and breathing sets',
      'Hard hats, bump caps, chin straps and neck/shoulder guards for overhead work',
      'Safety shoes/boots with toe protection, puncture resistance, electrical insulation',
    ],
    correctAnswer: 3,
    explanation:
      'Foot protection includes safety shoes/boots with various features like toe protection, puncture resistance, electrical insulation.',
    difficulty: 'basic',
  },
  {
    id: 140,
    question: 'When should safety footwear be worn?',
    options: [
      'Where there\'s risk of falling objects, puncture wounds, slips, electrical hazards',
      'Where the ground underfoot is wet, muddy or strewn with nails, screws and offcuts',
      'Where the site rules require it, though never inside a domestic property',
      'When carrying loads up ladders, or along unfinished stair flights and landings',
    ],
    correctAnswer: 0,
    explanation:
      'Safety footwear protects against falling objects, puncture wounds, slips, trips and electrical hazards.',
    difficulty: 'basic',
  },
  {
    id: 141,
    question: 'What are high-visibility garments used for?',
    options: [
      'To protect the wearer from chemical splashes and wet cement',
      'To make the wearer visible in poor light or near moving vehicles',
      'To insulate the wearer against electric shock when handling cables',
      'To keep the wearer warm and dry in cold or wet site conditions',
    ],
    correctAnswer: 1,
    explanation:
      'High-visibility garments make workers visible in poor light conditions or when working near moving vehicles.',
    difficulty: 'basic',
  },
  {
    id: 142,
    question: 'What does the CE marking on PPE indicate?',
    options: [
      'Manufactured within the United Kingdom',
      'Tested by the Health and Safety Executive',
      'Meets European safety standards',
      'Suitable for use on construction sites',
    ],
    correctAnswer: 2,
    explanation:
      'CE marking indicates the PPE meets relevant European safety standards and legal requirements.',
    difficulty: 'intermediate',
  },
  {
    id: 143,
    question: 'Who is responsible for providing PPE?',
    options: [
      'Employees (who must buy their own PPE kit)',
      'The principal contractor (on CDM 2015 sites only)',
      'The client (who commissions the construction work)',
      'Employers (free of charge to employees)',
    ],
    correctAnswer: 3,
    explanation: 'Employers must provide suitable PPE free of charge to employees when needed.',
    difficulty: 'basic',
  },
  {
    id: 144,
    question: 'Who is responsible for using PPE correctly?',
    options: [
      'Employees must use PPE correctly and report defects',
      'The HSE, who inspect the PPE on every site visit',
      'The manufacturer, who maintains it under the warranty',
      'The client, who supervises its daily use on site',
    ],
    correctAnswer: 0,
    explanation:
      'Employees are responsible for using PPE correctly, looking after it and reporting any defects.',
    difficulty: 'intermediate',
  },
  {
    id: 145,
    question: 'What factors should be considered when selecting PPE?',
    options: [
      'Purchase price, bulk discount and delivery time from the merchant',
      'Nature of hazard, compatibility, comfort, fit, maintenance requirements',
      'Colour, appearance and the personal preference of the individual worker',
      'Brand reputation, advertising in the trade press and the catalogue range',
    ],
    correctAnswer: 1,
    explanation:
      'PPE selection should consider hazard type, compatibility with other PPE, comfort, fit and maintenance needs.',
    difficulty: 'intermediate',
  },
  {
    id: 146,
    question: 'Why is PPE fit important?',
    options: [
      'A good fit makes the PPE last longer and cost less to replace',
      'Fit matters only for respiratory protective equipment',
      'Ill-fitting PPE may not provide adequate protection',
      'Fit affects only comfort, not the level of protection given',
    ],
    correctAnswer: 2,
    explanation:
      'Properly fitted PPE is essential for effective protection - ill-fitting equipment may not provide adequate protection.',
    difficulty: 'intermediate',
  },
  {
    id: 147,
    question: 'What training should be provided for PPE use?',
    options: [
      'How to put the PPE on, and take it off again, without help',
      'The cost of each item, and how to order replacements',
      'The British Standard, and conformity marking, that each item carries',
      'How to use, maintain, store PPE and recognise defects',
    ],
    correctAnswer: 3,
    explanation:
      'Training should cover proper use, maintenance, storage of PPE and how to recognise defects.',
    difficulty: 'intermediate',
  },
  {
    id: 148,
    question: 'How should PPE be maintained?',
    options: [
      'Regular cleaning, inspection, replacement when damaged or worn',
      'Left in place permanently, and replaced only at the end of the job',
      'Cleaned once at the end of the project, before it is put into store',
      'Shared between workers at each shift change, without any cleaning',
    ],
    correctAnswer: 0,
    explanation:
      'PPE requires regular cleaning, inspection for damage and replacement when worn out or damaged.',
    difficulty: 'basic',
  },
  {
    id: 149,
    question: 'How should PPE be stored?',
    options: [
      'In direct sunlight, so that any damp dries out of it',
      'Clean, dry place away from contamination and damage',
      'Loose in the bottom of a tool bag, with sharp hand tools',
      'Anywhere convenient in the work area, close to the task',
    ],
    correctAnswer: 1,
    explanation:
      'PPE should be stored in clean, dry conditions away from contamination and potential damage.',
    difficulty: 'basic',
  },
  {
    id: 150,
    question: 'What should workers do if PPE is damaged?',
    options: [
      'Carry on using it until the job has been finished',
      'Repair it with insulating tape and carry on working',
      'Report damage and stop using until replaced',
      'Pass it to another worker on site to use instead',
    ],
    correctAnswer: 2,
    explanation:
      'Damaged PPE should be reported immediately and not used until properly repaired or replaced.',
    difficulty: 'intermediate',
  },
  {
    id: 151,
    question: 'Why should workers be involved in PPE selection?',
    options: [
      'It removes the legal duty on the employer to provide any suitable PPE',
      'It transfers the cost of buying and replacing the PPE onto the workers themselves',
      'It speeds up the purchasing and reduces the paperwork for the storeman',
      'Workers know the practical requirements and comfort needed for effective use',
    ],
    correctAnswer: 3,
    explanation:
      'Workers understand the practical requirements and comfort needed for effective PPE use in their specific work.',
    difficulty: 'intermediate',
  },
  {
    id: 152,
    question: 'What are the limitations of PPE?',
    options: [
      'Only protects the individual, can fail, may give false sense of security',
      'It removes the hazard at source, so no other controls are needed',
      'It protects everyone working in the immediate area, for the whole of the shift',
      'It needs no inspection, maintenance or replacement once it is issued',
    ],
    correctAnswer: 0,
    explanation:
      'PPE only protects the individual wearer, can fail, and may give a false sense of security if used incorrectly.',
    difficulty: 'basic',
  },
  {
    id: 153,
    question: 'What is meant by PPE compatibility?',
    options: [
      'All items of PPE come from the same manufacturer and the same supplier',
      'Different types of PPE work together without reducing protection',
      'PPE fits every worker on site without needing adjustment',
      'PPE can be reused by different workers without any cleaning',
    ],
    correctAnswer: 1,
    explanation:
      'PPE compatibility means different types can be worn together without one reducing the effectiveness of another.',
    difficulty: 'intermediate',
  },
  {
    id: 154,
    question: 'How often should PPE be inspected?',
    options: [
      'Once, when it is first issued to the worker',
      'At the annual safety audit carried out by the firm',
      'Before each use and regularly during use',
      'After it has failed or been visibly damaged',
    ],
    correctAnswer: 2,
    explanation:
      'PPE should be inspected before each use for damage, wear or contamination that could affect protection.',
    difficulty: 'intermediate',
  },
  {
    id: 155,
    question: 'What documentation should be kept for PPE?',
    options: [
      'Purchase receipts, delivery notes and supplier invoices for every item',
      'British Standard numbers, and conformity marks, for each item held',
      'Manufacturer names, countries of origin and catalogue reference numbers',
      'Issue records, training records, inspection records, maintenance records',
    ],
    correctAnswer: 3,
    explanation:
      'Records should include PPE issue, training provided, inspections carried out and maintenance performed.',
    difficulty: 'intermediate',
  },
  {
    id: 156,
    question: 'What is personal protective equipment assessment?',
    options: [
      'Systematic evaluation to select suitable PPE for specific hazards',
      'A check of what the PPE programme costs the business over the year',
      'A survey asking workers whether they like the PPE they have been issued',
      'A count of how many items are being held in the site stores',
    ],
    correctAnswer: 0,
    explanation:
      'PPE assessment systematically evaluates hazards and selects appropriate equipment to provide adequate protection.',
    difficulty: 'intermediate',
  },
  {
    id: 157,
    question: 'When should PPE be replaced?',
    options: [
      'At the end of every calendar year, as part of the stock check',
      'When damaged, worn out, or manufacturer\'s expiry date reached',
      'When it is reissued, to a different worker on the same site',
      'When an HSE inspector, or a client auditor, asks for it to be replaced',
    ],
    correctAnswer: 1,
    explanation:
      "PPE should be replaced when damaged, worn beyond safe use, or when manufacturer's expiry date is reached.",
    difficulty: 'intermediate',
  },
  {
    id: 158,
    question: 'What factors affect PPE effectiveness?',
    options: [
      'The brand, the purchase price and the warranty offered by the manufacturer',
      'The colour coding, used to identify each trade working on site',
      'Correct selection, proper use, good maintenance, adequate training',
      'How recently the PPE was bought, and which supplier supplied it',
    ],
    correctAnswer: 2,
    explanation:
      'PPE effectiveness depends on correct selection for hazards, proper use, good maintenance and adequate user training.',
    difficulty: 'intermediate',
  },
  {
    id: 159,
    question: 'What is the role of supervisors in PPE management?',
    options: [
      'To buy all the PPE personally, on behalf of the workers in the gang',
      'To carry out the annual PPE stock-take, and reorder from the supplier',
      'To sign the PPE issue register, on behalf of each worker on site',
      'Ensure PPE is worn correctly, monitor condition, enforce compliance',
    ],
    correctAnswer: 3,
    explanation:
      'Supervisors must ensure PPE is worn correctly, monitor its condition and enforce compliance with PPE requirements.',
    difficulty: 'intermediate',
  },
  {
    id: 160,
    question: 'How should contaminated PPE be handled?',
    options: [
      'Decontaminate safely or dispose of according to specific procedures',
      'Wash it at home together with ordinary work clothes at the end of the shift',
      'Reissue it straight away to the next worker doing the same kind of job',
      'Leave it in the site stores for any worker to pick up and use',
    ],
    correctAnswer: 0,
    explanation:
      'Contaminated PPE requires safe decontamination or disposal according to specific procedures for the contaminant type.',
    difficulty: 'basic',
  },
  {
    id: 161,
    question: 'What are the categories of PPE?',
    options: [
      'Class A (simple), Class B (intermediate) and Class C (complex)',
      'Category I (simple), Category II (intermediate), Category III (complex)',
      'Type 1 (low), Type 2 (medium) and Type 3 (high) by hazard faced',
      'Light duty (LD), medium duty (MD) and heavy duty (HD) by work rate',
    ],
    correctAnswer: 1,
    explanation:
      'PPE is categorised as Category I (simple/minimal risk), Category II (intermediate), or Category III (complex/serious risk).',
    difficulty: 'intermediate',
  },
  {
    id: 162,
    question: "What requires special consideration for electrical workers' PPE?",
    options: [
      'High-visibility colours for working near site traffic',
      'Lightweight materials for working at height on ladders',
      'Electrical insulation properties and arc flash protection',
      'Waterproof materials for outdoor working in wet weather conditions',
    ],
    correctAnswer: 2,
    explanation:
      'Electrical workers need PPE with electrical insulation properties and protection against arc flash hazards.',
    difficulty: 'basic',
  },
  {
    id: 163,
    question: 'What is arc flash protection?',
    options: [
      'Protection from objects falling from scaffolds above',
      'Protection from loud noise given off by cutting machinery',
      'Protection from airborne dust, welding fumes and solvent vapours',
      'Protection from electrical arc blast and thermal energy',
    ],
    correctAnswer: 3,
    explanation:
      'Arc flash protection guards against electrical arc blast and the intense thermal energy it produces.',
    difficulty: 'basic',
  },
  {
    id: 164,
    question: 'When should electrical insulating gloves be tested?',
    options: [
      'Before issue, periodically during use, after suspected damage',
      'Once, at the time of manufacture and before dispatch from the works',
      'When they show visible signs of wear, or of discolouration',
      'At the end of their stated service life, before disposal',
    ],
    correctAnswer: 0,
    explanation:
      'Electrical insulating gloves must be tested before issue, regularly during use, and after any suspected damage.',
    difficulty: 'intermediate',
  },
  {
    id: 165,
    question: 'What is the purpose of PPE marking and labelling?',
    options: [
      'Show the purchase price, the supplier and the order number for reordering',
      'Identify PPE type, performance standards, limitations, expiry dates',
      'Show which worker the item was issued to, on what date and by whom',
      'Display the company logo, the site name and the site contact details',
    ],
    correctAnswer: 1,
    explanation:
      'Marking identifies PPE type, performance standards met, limitations and expiry dates for safe use.',
    difficulty: 'basic',
  },
  {
    id: 166,
    question: 'How should PPE information be communicated to workers?',
    options: [
      'A single notice, pinned to the site noticeboard near the main entrance',
      'Word of mouth, passed between the workers as they start on site',
      'Training, written instructions, demonstrations, ongoing reinforcement',
      'The supplier delivery note, and the printed product data sheet, alone',
    ],
    correctAnswer: 2,
    explanation:
      'PPE information should be communicated through training, written instructions, demonstrations and ongoing reinforcement.',
    difficulty: 'intermediate',
  },
  {
    id: 167,
    question: 'What role does comfort play in PPE effectiveness?',
    options: [
      'Comfort has no bearing on how well the PPE protects the person wearing it',
      'Comfortable PPE gives less protection than rigid, heavier PPE',
      'Comfort matters only for hearing and respiratory protection',
      'Uncomfortable PPE is less likely to be worn correctly or consistently',
    ],
    correctAnswer: 3,
    explanation:
      'Comfortable PPE is more likely to be worn correctly and consistently, improving overall protection.',
    difficulty: 'basic',
  },
  {
    id: 168,
    question: 'What should be included in a PPE programme?',
    options: [
      'Assessment, selection, training, maintenance, monitoring, review',
      'Purchasing the equipment, and issuing a set to every worker on site',
      'Safe disposal of worn-out equipment, and of used respirator filters',
      'An annual stock-take of the equipment, as held in the site stores',
    ],
    correctAnswer: 0,
    explanation:
      'A comprehensive PPE programme includes assessment, selection, training, maintenance, monitoring and regular review.',
    difficulty: 'intermediate',
  },

  // Section 5: Site Safety Procedures (Questions 169-210)
  {
    id: 169,
    question: 'What should be your first action when arriving on a new construction site?',
    options: [
      'Start work straight away to keep to the programme',
      'Attend site induction and safety briefing',
      'Find the welfare facilities and the canteen first',
      'Unload your tools and materials at the work area',
    ],
    correctAnswer: 1,
    explanation:
      'Site induction provides essential safety information specific to that site and must be completed before starting work.',
    difficulty: 'intermediate',
  },
  {
    id: 170,
    question: 'What information should be covered in a site induction?',
    options: [
      'The location of the site canteen, the toilets and the drying room',
      'The names of the management team, and the full site telephone list',
      'Site layout, hazards, emergency procedures, site rules, welfare facilities',
      'The working hours, the break times and the overtime arrangements',
    ],
    correctAnswer: 2,
    explanation:
      'Site induction should cover site layout, specific hazards, emergency procedures, site rules and welfare facilities.',
    difficulty: 'basic',
  },
  {
    id: 171,
    question: 'What is a construction phase plan?',
    options: [
      'A schedule showing when each trade will be working on the site',
      'A breakdown of the project costs, the budget and the monthly cash flow',
      'A list of the materials to be delivered to the site each week',
      'Document setting out health and safety arrangements for construction phase',
    ],
    correctAnswer: 3,
    explanation:
      'The construction phase plan sets out the health and safety arrangements and rules for the construction phase.',
    difficulty: 'basic',
  },
  {
    id: 172,
    question: 'Who prepares the construction phase plan?',
    options: [
      'Principal contractor',
      'The principal designer',
      'The client or their agent',
      'Each self-employed worker',
    ],
    correctAnswer: 0,
    explanation:
      'The principal contractor is responsible for preparing the construction phase plan.',
    difficulty: 'intermediate',
  },
  {
    id: 173,
    question: 'What should be included in site welfare facilities?',
    options: [
      'Tool stores, material racks, waste skips and lockable steel containers',
      'Toilets, washing facilities, drinking water, rest areas, changing rooms',
      'Fire extinguishers, alarms, emergency lighting and marked exit signs',
      'Site office, drawing store, meeting room and marked visitor parking',
    ],
    correctAnswer: 1,
    explanation:
      'Welfare facilities should include toilets, washing facilities, drinking water, rest areas and changing rooms.',
    difficulty: 'intermediate',
  },
  {
    id: 174,
    question: 'What is the purpose of site security?',
    options: [
      'To monitor worker productivity, and record attendance times at the gate',
      'To control the cost of the materials, as held on site each week',
      'Prevent unauthorised access, protect workers and public, secure materials',
      'To record the deliveries arriving at the gate, checking them against invoices',
    ],
    correctAnswer: 2,
    explanation:
      'Site security prevents unauthorised access, protects workers and the public, and secures materials and equipment.',
    difficulty: 'basic',
  },
  {
    id: 175,
    question: 'What housekeeping practices improve site safety?',
    options: [
      'Tools, offcuts and cable drums left out on the floor for quick access',
      'Materials stacked in the walkways, where they are needed',
      'A single clean-up, carried out at the end of the project',
      'Clear walkways, proper storage, regular cleaning, waste removal',
    ],
    correctAnswer: 3,
    explanation:
      'Good housekeeping includes clear walkways, proper material storage, regular cleaning and prompt waste removal.',
    difficulty: 'basic',
  },
  {
    id: 176,
    question: 'Why is good housekeeping important?',
    options: [
      'Reduces trips, falls, fire risks and improves working conditions',
      'Reduces the need to wear personal protective equipment, while on site',
      'Removes the requirement for written risk assessments, on any site',
      'Allows more materials to be stacked, on the walkway floors',
    ],
    correctAnswer: 0,
    explanation:
      'Good housekeeping reduces trip and fall hazards, fire risks and creates better working conditions.',
    difficulty: 'basic',
  },
  {
    id: 177,
    question: 'What are the main causes of slips, trips and falls on construction sites?',
    options: [
      'Working at height without edge protection, guard rails or a harness',
      'Poor housekeeping, uneven surfaces, inadequate lighting, unsuitable footwear',
      'Exposure to loud noise, and to hand-arm vibration from breakers and drills',
      'Contact with hazardous chemicals, wet cement and solvent vapours',
    ],
    correctAnswer: 1,
    explanation:
      'Slips, trips and falls result from poor housekeeping, uneven surfaces, inadequate lighting and unsuitable footwear.',
    difficulty: 'basic',
  },
  {
    id: 178,
    question: 'How can slips, trips and falls be prevented?',
    options: [
      'High-visibility clothing, gloves and knee pads issued to everyone on site',
      'A safety harness and lanyard, issued to every worker arriving on site',
      'Good housekeeping, proper lighting, suitable surfaces, appropriate footwear',
      'Warning signs posted at the site entrance, the welfare unit and the office',
    ],
    correctAnswer: 2,
    explanation:
      'Prevention requires good housekeeping, adequate lighting, suitable walking surfaces and appropriate footwear.',
    difficulty: 'intermediate',
  },
  {
    id: 179,
    question: 'What is the purpose of site signage?',
    options: [
      'To advertise the company carrying out the work, to passing road traffic',
      'To record the names of everyone, as they sign in at the site gate',
      'To display the project programme, the key deadlines and the progress charts',
      'Communicate hazards, restrictions, mandatory requirements, emergency information',
    ],
    correctAnswer: 3,
    explanation:
      'Site signage communicates hazards, restrictions, mandatory requirements and emergency information to all site users.',
    difficulty: 'basic',
  },
  {
    id: 180,
    question: 'What are the different types of safety signs?',
    options: [
      'Prohibition, warning, mandatory, emergency, fire safety signs',
      'Permanent, temporary, mobile and fixed signs by mounting',
      'Small, medium, large and extra-large signs by their viewing distance',
      'Indoor, outdoor, high-level and low-level signs by position',
    ],
    correctAnswer: 0,
    explanation:
      'Safety signs include prohibition (red), warning (yellow), mandatory (blue), emergency and fire safety signs.',
    difficulty: 'intermediate',
  },
  {
    id: 181,
    question: 'What colour are prohibition signs?',
    options: [
      'Yellow',
      'Red',
      'Green',
      'Blue',
    ],
    correctAnswer: 1,
    explanation:
      'Prohibition signs are red with white pictograms and indicate things that must not be done.',
    difficulty: 'basic',
  },
  {
    id: 182,
    question: 'What colour are mandatory signs?',
    options: [
      'Red and white',
      'Yellow',
      'Blue',
      'Green',
    ],
    correctAnswer: 2,
    explanation:
      'Mandatory signs are blue with white pictograms and indicate actions that must be taken.',
    difficulty: 'basic',
  },
  {
    id: 183,
    question: 'What colour are warning signs?',
    options: [
      'Red and white',
      'Green and white',
      'Blue and white',
      'Yellow',
    ],
    correctAnswer: 3,
    explanation: 'Warning signs are yellow with black pictograms and warn of hazards or dangers.',
    difficulty: 'basic',
  },
  {
    id: 184,
    question: 'What should be done if you discover unsafe conditions on site?',
    options: [
      'Report immediately to supervisor and make area safe if possible',
      'Carry on working and report it to the supervisor at the end of the day',
      'Note it in the site diary ready for the next weekly safety inspection',
      'Try to repair the problem yourself without telling anyone else',
    ],
    correctAnswer: 0,
    explanation:
      'Unsafe conditions should be reported immediately and the area made safe if possible without creating further risk.',
    difficulty: 'basic',
  },
  {
    id: 185,
    question: 'What is a toolbox talk?',
    options: [
      'A lockable storage box holding the shared hand tools used by the gang',
      'Short safety discussion on specific topics relevant to current work',
      'A formal disciplinary meeting held with the supervisor and manager',
      'A daily written record of the tools issued to each worker',
    ],
    correctAnswer: 1,
    explanation:
      'Toolbox talks are short, focused safety discussions on topics relevant to current work activities.',
    difficulty: 'basic',
  },
  {
    id: 186,
    question: 'How often should toolbox talks be held?',
    options: [
      'Once at the start of the project, during the site induction',
      'After an accident has happened on site, as part of the follow-up',
      'Regularly, often weekly or before specific high-risk activities',
      'When the HSE inspector, or the client auditor, visits the site',
    ],
    correctAnswer: 2,
    explanation:
      'Toolbox talks should be held regularly, often weekly, and before specific high-risk activities.',
    difficulty: 'intermediate',
  },
  {
    id: 187,
    question: 'What is the purpose of site inspections?',
    options: [
      'To record the material deliveries, as they arrive at the site gate',
      'To measure worker productivity, and output, for each shift',
      'To check the quality of the completed work, before it is handed over',
      'Identify hazards, check compliance, monitor safety standards',
    ],
    correctAnswer: 3,
    explanation:
      'Site inspections identify hazards, check compliance with safety requirements and monitor safety standards.',
    difficulty: 'basic',
  },
  {
    id: 188,
    question: 'Who should carry out site inspections?',
    options: [
      'Competent persons including supervisors, safety representatives, managers',
      'Any apprentice on site, as part of their first-day induction training',
      'The client and their professional advisers, but no one working on site',
      'The HSE inspector alone, during an unannounced routine visit to the site',
    ],
    correctAnswer: 0,
    explanation:
      'Site inspections should be carried out by competent persons including supervisors, safety representatives and managers.',
    difficulty: 'intermediate',
  },
  {
    id: 189,
    question: 'What should be done with findings from site inspections?',
    options: [
      'File them away in the office, without taking any further action',
      'Act on findings, prioritise by risk, monitor progress',
      'Send them to the client for information, and nothing more',
      'Wait until the next inspection, before acting on any of them',
    ],
    correctAnswer: 1,
    explanation:
      'Inspection findings should be acted upon, prioritised by risk level and progress monitored until completion.',
    difficulty: 'intermediate',
  },
  {
    id: 190,
    question: 'What is the role of the site safety representative?',
    options: [
      'To enforce health and safety law and issue prohibition notices on site',
      'To carry out all of the site risk assessments on his or her own',
      'Represent workers on safety matters and investigate concerns',
      'To provide and maintain all of the site first-aid equipment',
    ],
    correctAnswer: 2,
    explanation:
      'Safety representatives represent workers on safety matters, investigate concerns and participate in consultations.',
    difficulty: 'intermediate',
  },
  {
    id: 191,
    question: 'What powers do safety representatives have on site?',
    options: [
      'Dismiss any worker, where they repeatedly breach the site safety rules',
      'Issue improvement notices, and prohibition notices, to the employer',
      'Prosecute the employer in the magistrates\' court, without the HSE',
      'Investigate accidents, inspect workplace, be consulted on safety matters',
    ],
    correctAnswer: 3,
    explanation:
      'Safety representatives can investigate accidents, inspect the workplace and must be consulted on safety matters.',
    difficulty: 'intermediate',
  },
  {
    id: 192,
    question: 'What is the importance of communication on construction sites?',
    options: [
      'Essential for coordination, safety information, emergency response',
      'Needed mainly on the days when the supervisor is away, or is off sick',
      'Important for the management team, rather than for the site operatives',
      'Required during the site induction, and at no other time on site',
    ],
    correctAnswer: 0,
    explanation:
      'Good communication is essential for work coordination, safety information sharing and effective emergency response.',
    difficulty: 'basic',
  },
  {
    id: 193,
    question: 'How should hazardous substances be stored on site?',
    options: [
      'Anywhere convenient on the site, provided the container lids are kept closed',
      'Secure, ventilated areas with appropriate containment and labelling',
      'In the same lockable store as the site food, and the drinking water',
      'Loose in the back of an open van, between visits to different sites',
    ],
    correctAnswer: 1,
    explanation:
      'Hazardous substances need secure, well-ventilated storage with appropriate containment and clear labelling.',
    difficulty: 'intermediate',
  },
  {
    id: 194,
    question: 'What information should be available for hazardous substances?',
    options: [
      'The purchase receipt, the order number and the supplier contact details',
      'The quantity left inside each container standing on the store shelf',
      'Safety data sheets with hazard information and control measures',
      'A photograph of the container label kept in the site office',
    ],
    correctAnswer: 2,
    explanation:
      'Safety data sheets must be available providing hazard information, handling precautions and control measures.',
    difficulty: 'basic',
  },
  {
    id: 195,
    question: 'What is COSHH?',
    options: [
      'Care of Substances Hazardous to Human Health',
      'Control of Site Safety, Health and Hygiene',
      'Control of Substances Harmful when Handled',
      'Control of Substances Hazardous to Health',
    ],
    correctAnswer: 3,
    explanation:
      'COSHH stands for Control of Substances Hazardous to Health regulations covering workplace chemical safety.',
    difficulty: 'basic',
  },
  {
    id: 196,
    question: 'What does a COSHH assessment identify?',
    options: [
      'Hazardous substances, exposure routes, health effects, control measures',
      'The cost of replacing each hazardous substance, with a safer one',
      'The names of the workers, and the substances each of them handles',
      'The supplier, and the delivery date, of each substance held on site',
    ],
    correctAnswer: 0,
    explanation:
      'COSHH assessments identify hazardous substances, exposure routes, health effects and necessary control measures.',
    difficulty: 'intermediate',
  },
  {
    id: 197,
    question: 'What are the main routes of entry for chemicals into the body?',
    options: [
      'Inhalation, vibration, radiation and electric shock/burns',
      'Inhalation, ingestion, skin/eye contact, injection',
      'Ingestion, eye strain, hearing/sight damage and tiredness',
      'Inhalation, ingestion, noise/vibration damage and injury',
    ],
    correctAnswer: 1,
    explanation:
      'Chemicals can enter the body through inhalation, ingestion, skin/eye contact and injection through wounds.',
    difficulty: 'basic',
  },
  {
    id: 198,
    question: 'What environmental hazards might be found on construction sites?',
    options: [
      'Electric shock from buried supply cables, and from overhead lines',
      'Falls from height from scaffolds, ladders and unguarded floor openings',
      'Noise, dust, vibration, weather conditions, contaminated ground',
      'Slips, trips and falls on the same level around the site',
    ],
    correctAnswer: 2,
    explanation:
      'Environmental hazards include noise, dust, vibration, adverse weather conditions and contaminated ground.',
    difficulty: 'basic',
  },
  {
    id: 199,
    question: 'How should environmental hazards be managed?',
    options: [
      'By recording them in the site diary, and reviewing it each year',
      'By dealing with them, only after an incident has been reported',
      'By transferring all responsibility for them, to the principal designer',
      'Identify, assess, control through appropriate measures, monitor conditions',
    ],
    correctAnswer: 3,
    explanation:
      'Environmental hazards should be identified, assessed, controlled through appropriate measures, and conditions monitored.',
    difficulty: 'intermediate',
  },
  {
    id: 200,
    question: 'What is the purpose of perimeter fencing on construction sites?',
    options: [
      'Prevent unauthorised access and protect the public from site hazards',
      'To mark out the site boundary agreed in the project programme drawings',
      'To provide somewhere to display advertising banners and company site signs',
      'To keep the weather off the materials and plant stored on the site',
    ],
    correctAnswer: 0,
    explanation:
      'Perimeter fencing prevents unauthorised access and protects the public from construction hazards.',
    difficulty: 'basic',
  },
  {
    id: 201,
    question: 'What considerations apply to site access and egress?',
    options: [
      'The shortest possible route, whatever hazards lie along the way',
      'Safe routes, adequate width, good visibility, emergency access',
      'Routes kept for the management team, and for the visiting clients',
      'Access running through the plant compound, and the busiest work area',
    ],
    correctAnswer: 1,
    explanation:
      'Site access must provide safe routes, adequate width, good visibility and maintain emergency access.',
    difficulty: 'intermediate',
  },
  {
    id: 202,
    question: 'What is the importance of site planning for safety?',
    options: [
      'It removes the need for separate written risk assessments, for any task',
      'It guarantees that the project will finish on time, and inside budget',
      'Reduces conflicts between activities, controls access, manages hazards',
      'It reduces the cost of the materials, and of the plant, for the works',
    ],
    correctAnswer: 2,
    explanation:
      'Good site planning reduces conflicts between activities, controls access routes and helps manage hazards.',
    difficulty: 'intermediate',
  },
  {
    id: 203,
    question: 'How should deliveries be managed safely on site?',
    options: [
      'Deliver to any free space on the site, whenever it suits the driver',
      'Allow the drivers to reverse into position, with no banksman guiding them',
      'Route the deliveries along the same paths, used by site pedestrians',
      'Designated areas, trained banksmen, separation from other activities',
    ],
    correctAnswer: 3,
    explanation:
      'Safe delivery management requires designated areas, trained banksmen and separation from other site activities.',
    difficulty: 'intermediate',
  },
  {
    id: 204,
    question: 'What is the role of a banksman?',
    options: [
      'Guide vehicles safely and control vehicle movements',
      'Manage the site finances and the weekly wage payments',
      'Carry out first aid on any injured workers on the site',
      'Inspect the electrical installations for faults and damage',
    ],
    correctAnswer: 0,
    explanation:
      'A banksman guides vehicles safely during reversing and manoeuvring operations to prevent accidents.',
    difficulty: 'basic',
  },
  {
    id: 205,
    question: 'What training should banksmen receive?',
    options: [
      'First aid, emergency casualty care and resuscitation of casualties',
      'Vehicle movements, hand signals, hazard awareness, communication',
      'Electrical inspection, testing and the certification of installations',
      'Manual handling, and the kinetic lifting of heavy loads by hand',
    ],
    correctAnswer: 1,
    explanation:
      'Banksmen need training in vehicle movements, standard hand signals, hazard awareness and communication.',
    difficulty: 'intermediate',
  },
  {
    id: 206,
    question: 'What is the purpose of exclusion zones around plant and machinery?',
    options: [
      'To store materials and plant close to the working machinery',
      'To mark out where the deliveries should be unloaded and stacked',
      'Prevent people entering dangerous areas during operation',
      'To provide shelter for the workers during their rest breaks',
    ],
    correctAnswer: 2,
    explanation:
      'Exclusion zones prevent people entering dangerous areas around operating plant and machinery.',
    difficulty: 'basic',
  },
  {
    id: 207,
    question: 'How should site traffic and pedestrians be separated?',
    options: [
      'By asking the pedestrians to take care, whenever vehicles are moving',
      'By allowing both to share the same route, right across the site',
      'By relying on high-visibility clothing, and on reversing alarms',
      'Designated routes, barriers, crossing points, traffic management',
    ],
    correctAnswer: 3,
    explanation:
      'Separation requires designated routes, physical barriers, controlled crossing points and traffic management systems.',
    difficulty: 'intermediate',
  },
  {
    id: 208,
    question: 'What weather conditions affect construction site safety?',
    options: [
      'High winds, ice, heavy rain, extreme temperatures, lightning',
      'Heavy rain and standing water, but no other weather conditions',
      'High temperatures and strong sunlight, during the summer months',
      'High winds, but only when a mobile tower is being used',
    ],
    correctAnswer: 0,
    explanation:
      'Various weather conditions affect safety including high winds, ice, heavy rain, extreme temperatures and lightning.',
    difficulty: 'basic',
  },
  {
    id: 209,
    question: 'What precautions should be taken in extreme weather?',
    options: [
      'Carry on as normal, to keep to the agreed day-by-day programme',
      'Stop high-risk activities, provide shelter, monitor conditions',
      'Send all the workers home, whatever task they are working on',
      'Increase the pace of the work, so it finishes before the weather worsens',
    ],
    correctAnswer: 1,
    explanation:
      'Extreme weather may require stopping high-risk activities, providing shelter and continuously monitoring conditions.',
    difficulty: 'basic',
  },
  {
    id: 210,
    question: 'What is the importance of coordination between different trades on site?',
    options: [
      'It reduces the overall cost, and shortens the project duration',
      'It allows each trade to work on, without any direct supervision',
      'Prevents conflicts, ensures compatible working methods, manages shared risks',
      'It removes the need for individual trade risk assessments, and permits',
    ],
    correctAnswer: 2,
    explanation:
      'Trade coordination prevents conflicts, ensures compatible working methods and manages risks affecting multiple trades.',
    difficulty: 'basic',
  },

  // Section 6: Fire Safety and Emergency Procedures (Questions 211-250)
  {
    id: 211,
    question: 'What are the three elements needed for fire (fire triangle)?',
    options: [
      'Heat, fuel, and water',
      'Heat, oxygen, and nitrogen',
      'Fuel, oxygen, and carbon dioxide',
      'Heat, fuel, and oxygen',
    ],
    correctAnswer: 3,
    explanation:
      'Fire requires three elements: heat (ignition source), fuel (combustible material), and oxygen to sustain combustion.',
    difficulty: 'basic',
  },
  {
    id: 212,
    question: 'How can fires be prevented?',
    options: [
      'Remove or control any element of the fire triangle',
      'Provide more fire extinguishers at each of the site exits',
      'Install extra emergency lighting throughout the building',
      'Hold fire evacuation drills much more frequently',
    ],
    correctAnswer: 0,
    explanation:
      'Fire prevention involves removing or controlling heat sources, fuel sources, or oxygen supply.',
    difficulty: 'intermediate',
  },
  {
    id: 213,
    question: 'What are the main classes of fire?',
    options: [
      'Class 1 (small), Class 2 (medium) and Class 3 (large fires)',
      'Class A (solids), B (liquids), C (gases), D (metals), F (cooking oils)',
      'Class A (indoor), B (outdoor), C (underground), D (roof work)',
      'Class A (electrical), B (chemical), C (mechanical), D (structural)',
    ],
    correctAnswer: 1,
    explanation:
      'Fire classes are: A (ordinary combustibles), B (flammable liquids), C (gases), D (metals), F (cooking oils).',
    difficulty: 'intermediate',
  },
  {
    id: 214,
    question: 'What type of fire extinguisher should be used on Class A fires?',
    options: [
      'Carbon dioxide (CO2), and nothing else',
      'Wet chemical spray, or CO2 only',
      'Water, foam, or dry powder',
      'Dry powder, on metal fires only',
    ],
    correctAnswer: 2,
    explanation:
      'Class A fires (ordinary combustibles) can be extinguished with water, foam, or dry powder extinguishers.',
    difficulty: 'intermediate',
  },
  {
    id: 215,
    question: 'What type of fire extinguisher should be used on electrical fires?',
    options: [
      'Water from a hose reel',
      'Wet chemical spray',
      'Foam spray extinguisher',
      'CO2 or dry powder',
    ],
    correctAnswer: 3,
    explanation:
      "CO2 or dry powder extinguishers should be used on electrical fires as they don't conduct electricity.",
    difficulty: 'intermediate',
  },
  {
    id: 216,
    question: 'Why should water never be used on electrical fires?',
    options: [
      'Water conducts electricity and can cause electrocution',
      'Water reacts with copper conductors to release toxic fumes',
      'Water spreads the fire more quickly through the building',
      'Water damages the installation beyond any repair',
    ],
    correctAnswer: 0,
    explanation:
      'Water conducts electricity and using it on live electrical equipment can cause electrocution.',
    difficulty: 'intermediate',
  },
  {
    id: 217,
    question: 'What should you do if you discover a fire?',
    options: [
      'Collect your tools, and personal belongings, before doing anything else',
      'Raise the alarm, call fire brigade, evacuate if safe to do so',
      'Open the windows and doors, to let the smoke out of the building',
      'Wait a while, to see whether the fire goes out on its own',
    ],
    correctAnswer: 1,
    explanation:
      'On discovering fire: raise the alarm, call fire brigade, and evacuate safely - only tackle small fires if trained and safe.',
    difficulty: 'basic',
  },
  {
    id: 218,
    question: 'What does PASS stand for in fire extinguisher use?',
    options: [
      'Point, Aim, Squeeze, Sweep',
      'Pull, Aim, Shoot, Stop',
      'Pull, Aim, Squeeze, Sweep',
      'Point, Activate, Spray, Stop',
    ],
    correctAnswer: 2,
    explanation:
      'PASS: Pull the pin, Aim at base of fire, Squeeze the handle, Sweep from side to side.',
    difficulty: 'basic',
  },
  {
    id: 219,
    question: 'When should you attempt to fight a fire?',
    options: [
      'Whenever you see one, whatever its size and whatever training you have had',
      'Only after everyone else has already evacuated, whatever your training',
      'Any time, as long as you are holding an extinguisher of any type',
      "Only if small, you're trained, have escape route, and feel confident",
    ],
    correctAnswer: 3,
    explanation:
      "Only fight fires if they're small, you're trained, have a clear escape route, and feel confident doing so.",
    difficulty: 'basic',
  },
  {
    id: 220,
    question: 'What is the most important principle in fire evacuation?',
    options: [
      'Save lives - people before property',
      'Save equipment - protect costly machinery first',
      'Save the building - protect the structure first',
      'Save records - secure documents before leaving',
    ],
    correctAnswer: 0,
    explanation:
      'Life safety is paramount - people must be evacuated before considering property or equipment.',
    difficulty: 'basic',
  },
  {
    id: 221,
    question: 'What should you do when the fire alarm sounds?',
    options: [
      'Finish the task you are working on before you leave',
      'Stop work immediately and evacuate via nearest safe exit',
      'Wait to find out whether it is a real fire or a drill',
      'Go back to your locker to collect your personal belongings first',
    ],
    correctAnswer: 1,
    explanation:
      'When fire alarms sound, stop work immediately and evacuate via the nearest safe exit route.',
    difficulty: 'intermediate',
  },
  {
    id: 222,
    question: 'Where should people assemble during evacuation?',
    options: [
      'At the nearest exit door leading out of the burning building',
      'In the site car park, standing beside the parked vehicles',
      'At designated assembly points away from the building',
      'At whatever point is most convenient when the alarm sounds',
    ],
    correctAnswer: 2,
    explanation:
      'People should assemble at designated assembly points that are a safe distance from the building.',
    difficulty: 'basic',
  },
  {
    id: 223,
    question: 'Who should take a roll call at assembly points?',
    options: [
      'Any worker who arrives at the assembly point first',
      'The most senior manager who is present on the site',
      'The fire brigade officer in charge, once they arrive',
      'Fire wardens or designated responsible persons',
    ],
    correctAnswer: 3,
    explanation:
      'Fire wardens or other designated responsible persons should conduct roll calls to account for all personnel.',
    difficulty: 'basic',
  },
  {
    id: 224,
    question: 'What information should be given to the fire brigade?',
    options: [
      'Location, type of fire, people involved, hazardous materials present',
      'The estimated cost of the fire damage, caused to the building',
      'The names of all the contractors, and supervisors, working on site',
      'The project programme, the deadlines and the completion date',
    ],
    correctAnswer: 0,
    explanation:
      'Fire brigade should be told: exact location, type of fire, people involved/missing, and any hazardous materials.',
    difficulty: 'intermediate',
  },
  {
    id: 225,
    question: 'What is a fire risk assessment?',
    options: [
      'A written record of all the fires and near misses that have occurred on site',
      'Systematic evaluation of fire hazards and risks to implement control measures',
      'A list of the fire extinguishers held on site, their types and service dates',
      'A schedule setting out the fire drills and alarm tests to be carried out',
    ],
    correctAnswer: 1,
    explanation:
      'Fire risk assessment systematically evaluates fire hazards and risks to implement appropriate prevention and protection measures.',
    difficulty: 'basic',
  },
  {
    id: 226,
    question: 'What should a fire risk assessment identify?',
    options: [
      'The location of the fire extinguishers, and of the hose reels',
      'The number of people, as recorded at the site induction',
      'Fire hazards, people at risk, control measures needed',
      'The nearest fire station, and its likely response time to site',
    ],
    correctAnswer: 2,
    explanation:
      'Fire risk assessments should identify fire hazards, people at risk, and determine necessary control measures.',
    difficulty: 'intermediate',
  },
  {
    id: 227,
    question: 'How often should fire drills be conducted?',
    options: [
      'Once only, when the building is first brought into use',
      'After a real fire, or a false alarm, has occurred on site',
      'When an HSE inspector, or the insurer, asks to see a drill',
      'Regularly, typically every 6 months or as required',
    ],
    correctAnswer: 3,
    explanation:
      'Fire drills should be conducted regularly, typically every 6 months, to ensure evacuation procedures work effectively.',
    difficulty: 'intermediate',
  },
  {
    id: 228,
    question: 'What should be checked during fire drill evaluation?',
    options: [
      'Evacuation time, route effectiveness, alarm audibility, assembly procedures',
      'The cost of holding the drill, and the production time lost by each trade',
      'How many workers took part, and how they rated the drill afterwards',
      'The weather conditions, and the temperature, recorded during the drill',
    ],
    correctAnswer: 0,
    explanation:
      'Evaluate evacuation times, route effectiveness, alarm audibility, assembly procedures and overall drill effectiveness.',
    difficulty: 'intermediate',
  },
  {
    id: 229,
    question: 'What are the key components of emergency evacuation routes?',
    options: [
      'Short routes, even where they pass through hazardous work areas',
      'Clearly marked, well-lit, unobstructed, leading to safe areas',
      'Kept locked, so that only supervisors can open them in an emergency',
      'Reserved for the management team, and for pre-booked site visitors',
    ],
    correctAnswer: 1,
    explanation:
      'Evacuation routes must be clearly marked, well-lit, kept unobstructed, and lead to safe areas outside.',
    difficulty: 'intermediate',
  },
  {
    id: 230,
    question: 'What is the role of fire wardens?',
    options: [
      'To fight all the fires personally, before anyone else is evacuated',
      'To carry out the annual fire risk assessment, for the whole site',
      'Assist with evacuation, check areas are clear, liaise with fire brigade',
      'To install, test and maintain the fire alarm and the smoke detection system',
    ],
    correctAnswer: 2,
    explanation:
      'Fire wardens assist evacuation, check their areas are clear, help colleagues and liaise with emergency services.',
    difficulty: 'basic',
  },
  {
    id: 231,
    question: 'What training should fire wardens receive?',
    options: [
      'Manual handling, kinetic lifting and the team carrying of heavy loads',
      'Electrical inspection, testing and the certification of fixed wiring',
      'First aid, casualty resuscitation and the use of a defibrillator',
      'Fire procedures, evacuation routes, equipment use, emergency communication',
    ],
    correctAnswer: 3,
    explanation:
      'Fire wardens need training in fire procedures, evacuation routes, equipment use and emergency communication.',
    difficulty: 'intermediate',
  },
  {
    id: 232,
    question: "What should you do if you're trapped by fire?",
    options: [
      'Close doors, signal for help, stay low, await rescue',
      'Open every door and window, to look for a way out quickly',
      'Stand on the furniture, to keep above the smoke and flames',
      'Run out through the flames, to reach the nearest fire exit',
    ],
    correctAnswer: 0,
    explanation:
      'If trapped: close doors to slow fire spread, signal for help, stay low to avoid smoke, and await rescue.',
    difficulty: 'basic',
  },
  {
    id: 233,
    question: 'Why should you stay low in smoke?',
    options: [
      'It is easier to crawl than to walk in a fire',
      'Cleaner air is near the floor as smoke rises',
      'The fire alarm is easier to hear near the floor',
      'Exit signs are mounted close to the floor',
    ],
    correctAnswer: 1,
    explanation:
      'Smoke rises, so cleaner, cooler air with more oxygen is found closer to the floor.',
    difficulty: 'basic',
  },
  {
    id: 234,
    question: 'What is the main danger from smoke?',
    options: [
      'It reduces visibility and makes escape routes hard to find',
      'It stains clothing and damages tools and equipment',
      'Toxic gases that can cause unconsciousness and death',
      'It sets off the sprinkler system unnecessarily',
    ],
    correctAnswer: 2,
    explanation:
      'Smoke contains toxic gases like carbon monoxide that can cause unconsciousness and death within minutes.',
    difficulty: 'intermediate',
  },
  {
    id: 235,
    question: 'What emergency equipment should be available on construction sites?',
    options: [
      'A single first-aid kit, kept in the locked site office, and nothing else',
      'A telephone in the site manager\'s office, for calling the emergency services',
      'A fire extinguisher at the site entrance, and a nominated fire warden',
      'Fire extinguishers, first aid kits, emergency communication, evacuation equipment',
    ],
    correctAnswer: 3,
    explanation:
      'Sites should have fire extinguishers, first aid equipment, emergency communication means and evacuation equipment.',
    difficulty: 'basic',
  },
  {
    id: 236,
    question: 'What is a fire safety management system?',
    options: [
      'Comprehensive approach including prevention, detection, suppression, evacuation',
      'A single fire extinguisher, placed at each exit door from the building',
      'A list of emergency telephone numbers, displayed in the site office',
      'An annual inspection visit, carried out by the fire and rescue service',
    ],
    correctAnswer: 0,
    explanation:
      'Fire safety management includes prevention measures, detection systems, suppression equipment and evacuation procedures.',
    difficulty: 'intermediate',
  },
  {
    id: 237,
    question: 'How should hot work be controlled to prevent fires?',
    options: [
      'By carrying it out at the end of the working day, before locking up',
      'Permits, fire watches, cleared areas, fire extinguishers nearby',
      'By keeping the combustible materials close to hand, for the job',
      'By relying on the building sprinkler system, and the alarm, alone',
    ],
    correctAnswer: 1,
    explanation:
      'Hot work requires permits, trained fire watches, cleared work areas and appropriate fire extinguishers nearby.',
    difficulty: 'intermediate',
  },
  {
    id: 238,
    question: 'What is a fire watch?',
    options: [
      'A clock that times how long the hot work permit runs for',
      'A daily inspection of all the site fire extinguishers and alarms',
      'Person monitoring for fires during and after hot work',
      'A camera system recording the area where hot work is done',
    ],
    correctAnswer: 2,
    explanation:
      'A fire watch is a trained person who monitors for fires during hot work and for a period afterwards.',
    difficulty: 'basic',
  },
  {
    id: 239,
    question: 'What should be done with combustible materials during hot work?',
    options: [
      'Stack them neatly close to the work area',
      'Cover them loosely with a dust sheet',
      'Leave them where they are and work carefully',
      'Remove or protect them from ignition',
    ],
    correctAnswer: 3,
    explanation:
      'Combustible materials should be removed from the area or properly protected from ignition sources.',
    difficulty: 'basic',
  },
  {
    id: 240,
    question: 'What emergency communication systems should sites have?',
    options: [
      'Multiple methods: landline, mobile, radio, alarms',
      'A single method: one mobile phone, kept by the supervisor',
      'Hand signals, between workers on the scaffold',
      'A notice, pinned up at the site entrance gate',
    ],
    correctAnswer: 0,
    explanation:
      'Sites should have multiple communication methods including landlines, mobiles, radios and alarm systems.',
    difficulty: 'intermediate',
  },
  {
    id: 241,
    question: 'What information should be immediately available in emergencies?',
    options: [
      'Cost breakdown, valuation dates, retention figures, final account',
      'Emergency contacts, site plans, hazard information, evacuation procedures',
      'Names, job titles and start dates of every operative on the project',
      'Delivery schedules, plant hire dates, supplier contacts, waste transfer notes',
    ],
    correctAnswer: 1,
    explanation:
      'Emergency information should include contacts, site plans, hazard details and evacuation procedures.',
    difficulty: 'intermediate',
  },
  {
    id: 242,
    question: 'How should emergency procedures be communicated?',
    options: [
      'Word of mouth from the gang foreman, on the first day only',
      'One all-staff email, sent when the site first opens',
      'Training, written procedures, drills, signs, induction',
      'A laminated notice, pinned up inside the site canteen doorway',
    ],
    correctAnswer: 2,
    explanation:
      'Emergency procedures should be communicated through training, written procedures, drills, signage and induction.',
    difficulty: 'intermediate',
  },
  {
    id: 243,
    question: 'What is the purpose of emergency lighting?',
    options: [
      'Reduce the electricity bill by dimming the corridor lights overnight',
      'Illuminate advertising signs and shop fascias on the frontage after dark',
      'Provide extra working light for night shifts and overtime working',
      'Provide illumination during power failures for safe evacuation',
    ],
    correctAnswer: 3,
    explanation:
      'Emergency lighting provides illumination during power failures to enable safe evacuation along escape routes.',
    difficulty: 'basic',
  },
  {
    id: 244,
    question: 'How often should emergency lighting be tested?',
    options: [
      'Monthly brief tests and annual full duration tests',
      'Once, when the system is first installed and commissioned',
      'After a mains power failure has occurred on site',
      'Every five years by an external specialist contractor',
    ],
    correctAnswer: 0,
    explanation:
      'Emergency lighting should be tested monthly for a brief flick test and annually for full rated duration (typically 3 hours), per BS 5266.',
    difficulty: 'basic',
  },
  {
    id: 245,
    question: 'What should be included in emergency evacuation plans?',
    options: [
      'The postal address of the nearest fire station, and its telephone number',
      'Routes, assembly points, responsibilities, special needs, communication methods',
      'Contact numbers for the site manager, the client agent and the architect',
      'An inventory of every fire extinguisher held, its location and service date',
    ],
    correctAnswer: 1,
    explanation:
      'Plans should include escape routes, assembly points, responsibilities, provisions for special needs and communication.',
    difficulty: 'intermediate',
  },
  {
    id: 246,
    question: 'How should people with disabilities be considered in emergency planning?',
    options: [
      'The same evacuation route and muster point as everyone else',
      'Exclusion from any floor of the building above ground level',
      'Personal emergency evacuation plans and assistance arrangements',
      'Instructions to wait at the workstation until the fire brigade arrives',
    ],
    correctAnswer: 2,
    explanation:
      'People with disabilities need personal emergency evacuation plans (PEEPs) with specific assistance arrangements.',
    difficulty: 'intermediate',
  },
  {
    id: 247,
    question: 'What should be done after an emergency evacuation?',
    options: [
      'Return everyone to work at once, and make up the lost production time later',
      'Re-enter the building to collect tools, before the all-clear is given',
      'Send the whole gang home, without a roll call or a report to the manager',
      'Account for all personnel, investigate cause, debrief, improve procedures',
    ],
    correctAnswer: 3,
    explanation:
      'After evacuation: account for personnel, investigate the cause, conduct debriefing and improve procedures.',
    difficulty: 'basic',
  },
  {
    id: 248,
    question: 'What is business continuity planning?',
    options: [
      'Planning to maintain operations during and after emergencies',
      'Planning the daily sequence of trades and construction work on site',
      'Planning the marketing and sales strategy of the business for the year',
      'Planning staff training, appraisals and career development needs',
    ],
    correctAnswer: 0,
    explanation:
      'Business continuity planning ensures operations can continue during emergencies and recovery afterwards.',
    difficulty: 'basic',
  },
  {
    id: 249,
    question: 'What should be included in emergency training?',
    options: [
      'The location of the first-aid kit, and the names of all the site first-aiders',
      'Alarm procedures, evacuation routes, assembly points, equipment use, site-specific risks',
      'The fire and rescue service number, the site postcode and the nearest hospital',
      'How to choose and operate the right type of fire extinguisher, for each class of fire',
    ],
    correctAnswer: 1,
    explanation:
      'Training should cover alarm procedures, evacuation routes, assembly points, equipment use, and site-specific risks.',
    difficulty: 'intermediate',
  },
  {
    id: 250,
    question: 'How often should emergency procedures be reviewed and updated?',
    options: [
      'Once only, at the point the procedures are first written down',
      'Whenever a new worker joins the team, and is taken through induction',
      'Regularly, after incidents, when changes occur to site or operations',
      'Only when the HSE serves an improvement notice, after inspecting the site',
    ],
    correctAnswer: 2,
    explanation:
      'Emergency procedures should be reviewed regularly, after incidents, and when changes occur to the site or operations.',
    difficulty: 'intermediate',
  },

  // ── Section 7: Expansion pack (Questions 251-300) ─────────────────
  // Targets underweight ACs: 1.2, 2.3, 2.4, 2.5, 2.6, 2.7, 3.5, 3.6,
  // 3.8, 3.9, 4.1, 4.7, 4.8 — including the new Section 2 / Sub 6
  // asbestos and stop-work content.

  // AC 1.2 — environmental legislation roles and responsibilities
  {
    id: 251,
    question:
      'Which UK regulator enforces the Environmental Permitting (England and Wales) Regulations 2016 on a typical building site?',
    options: [
      'The Health and Safety Executive (HSE), under HASAWA/CDM site enforcement powers',
      'The local authority building control (LABC) department, under the Building Act/Regulations',
      'Ofgem (the Office of Gas and Electricity Markets), the GB gas/electricity regulator',
      'The Environment Agency (or Natural Resources Wales / SEPA in the devolved nations)',
    ],
    correctAnswer: 3,
    explanation:
      'Environmental enforcement on site sits with the Environment Agency in England, NRW in Wales, and SEPA in Scotland — not the HSE, who handle health and safety.',
    difficulty: 'intermediate',
  },
  {
    id: 252,
    question:
      'Under the GB CLP Regulation, what does the warning pictogram of a flame on a red-bordered diamond mean?',
    options: [
      'Flammable — the substance, vapour or gas can ignite easily',
      'Corrosive — the substance will burn skin, or attack metal surfaces',
      'Oxidising — the substance can intensify a fire, or start one itself',
      'Toxic — the substance is fatal, or toxic, in even very small amounts',
    ],
    correctAnswer: 0,
    explanation:
      'The GHS02 flame pictogram identifies flammable gases, liquids, solids, aerosols and self-reactive substances. Common on solvents, paints, thinners, propane and many spray cans on site.',
    difficulty: 'basic',
  },
  {
    id: 253,
    question:
      'Who is the "duty holder" for managing asbestos in a non-domestic premises under CAR 2012 Regulation 4?',
    options: [
      'The HSE-licensed asbestos removal contractor (holding a CAR 2012 Reg 8 licence), appointed to survey and remove the material found',
      'Whoever is responsible for the maintenance and repair of the premises (often the owner or, via the lease, the occupier)',
      'The principal contractor named in the construction phase plan (CDM 2015 Reg 12), who keeps the duty on after handover',
      'The Environment Agency (EA), as the regulator responsible for hazardous waste and contaminated land in England and Wales',
    ],
    correctAnswer: 1,
    explanation:
      'CAR 2012 Reg 4 places the duty to manage asbestos on whoever has responsibility for maintenance and repair — which can be the owner or the tenant depending on the lease.',
    difficulty: 'intermediate',
  },
  {
    id: 254,
    question:
      'Under the GB CLP Regulation, which warning pictogram indicates a substance is corrosive (will burn skin or attack metal)?',
    options: [
      'A diamond showing a black flame burning upward from a solid horizontal line',
      'A diamond showing a black skull and crossbones set on a plain white background',
      'A diamond with a black image of a hand and a surface being eaten away by liquid drops',
      'A diamond showing a black flame burning above a circle, resting on a solid horizontal line',
    ],
    correctAnswer: 2,
    explanation:
      'GB CLP corrosion pictogram (GHS05) is a red-bordered diamond showing test tubes pouring liquid onto a hand and a metal surface, both being eaten away. Common on drain cleaners, strong acids, alkalis.',
    difficulty: 'basic',
  },
  {
    id: 255,
    question:
      'In a UK building constructed BEFORE which year is asbestos most likely to be present in the fabric?',
    options: [
      '1985 — when crocidolite (blue) and amosite (brown) asbestos were banned in the UK',
      '1974 — the year the Health and Safety at Work etc. Act (HASAWA) came into force',
      '1965 — when the dangers of asbestos (mesothelioma risk) first became widely known',
      '2000 — chrysotile (white) asbestos was not fully banned in the UK until 1999',
    ],
    correctAnswer: 3,
    explanation:
      'Crocidolite (blue) and amosite (brown) were banned in 1985, but chrysotile (white) was not fully banned in the UK until 1999. Treat any building constructed or refurbished BEFORE 2000 as potentially containing ACMs.',
    difficulty: 'basic',
  },

  // AC 2.3 — escalation / stop-work above level of responsibility
  {
    id: 256,
    question:
      "You're an apprentice and you've spotted what looks like an asbestos insulating board (AIB) ceiling tile above where you're about to drill. The supervisor isn't on site. What's the right call?",
    options: [
      'Stop, don\'t disturb the tile, isolate the area, ring the supervisor and ask the duty holder for the asbestos register',
      'Drill through the tile wearing a disposable dust mask, dampening the tile first and sweeping up all the debris afterwards',
      'Lift the tile gently and look above it, then decide for yourself whether it is safe to carry on and drill the fixing hole',
      'Carry on drilling — ceiling tiles are too thin to release a dangerous quantity of asbestos fibres, even when drilled',
    ],
    correctAnswer: 0,
    explanation:
      "Inspection IS disturbance under CAR 2012 Reg 5. Stop, isolate, escalate — and request the duty holder's asbestos register before any work above the ceiling proceeds.",
    difficulty: 'intermediate',
  },
  {
    id: 257,
    question:
      "Under HASAWA section 7 and MHSWR Regulation 14, you've raised a safety concern with your supervisor and they've told you to drop it. What should you do next?",
    options: [
      'Drop it as instructed — the supervisor carries the legal duty for site safety (HASAWA s.2), and an apprentice has no responsibility of their own',
      'Escalate above the supervisor (your own employer, the principal contractor, your scheme provider) and record the conversation in writing',
      'Report it straight to the HSE (and to the client) immediately, since HASAWA s.7 requires an apprentice to go outside the firm before the employer has had any chance to respond',
      'Carry on with the work as instructed, but refuse to sign the risk assessment (MHSWR Reg 3) or the permit to work when presented to you',
    ],
    correctAnswer: 1,
    explanation:
      "HASAWA s.7 puts a personal duty on you that doesn't end when someone above you says 'drop it'. Escalate up the chain, document everything, and only go external (HSE) once the firm has had a chance to fix it.",
    difficulty: 'intermediate',
  },
  {
    id: 258,
    question:
      "You're working in a roof void and discover a live conductor that wasn't on the drawings or in the RAMS. What's the correct first action?",
    options: [
      'Cut the conductor quickly while it is still live, so that the hazard is removed straight away and the work can continue',
      'Carry on working, keep well clear of the conductor, and mention it on the certificate at the end of the job',
      'Stop work, isolate yourself from the area, notify your supervisor and update the risk assessment before continuing',
      'Test the conductor with a neon screwdriver, which is enough to confirm whether it is live, before deciding what to do next',
    ],
    correctAnswer: 2,
    explanation:
      'Anything not in the RAMS is by definition outside your assessed competence. Stop, isolate, notify, update the assessment — that discharges your MHSWR Reg 14 duty.',
    difficulty: 'basic',
  },
  {
    id: 259,
    question:
      'You arrive at a 1970s commercial building and the duty holder cannot produce an asbestos register for the area you are about to drill. What is the correct procedure?',
    options: [
      'Take your own sample of the material and send it off to a laboratory yourself, carrying on with other work in the same area while you wait for the result',
      'Carry on drilling — under CAR 2012, a missing register means the building has already been surveyed and cleared of asbestos by the duty holder\'s surveyor',
      'Drill only a single small hole, check whether any fibres are released, then decide whether it is safe to continue with the rest of the work',
      'Stop work, treat the material as \'presumed asbestos\' until a sample has been analysed by an accredited lab or the duty holder produces a clean survey',
    ],
    correctAnswer: 3,
    explanation:
      "CAR 2012 Reg 5 requires asbestos to be presumed present (and not chrysotile alone) where there is doubt. No register or survey means stop and escalate — the duty holder must commission the survey, you do not sample yourself.",
    difficulty: 'intermediate',
  },
  {
    id: 260,
    question:
      'What does "exceeds your level of responsibility" mean in practice for a Level 2 apprentice?',
    options: [
      'Anything you have not been trained or signed off to do — including live LV work, suspected asbestos, or work outside the scope of the RAMS',
      'Tasks that involve working at height above two metres — that kind of work always needs a separate permit',
      'Work the client has specifically asked the apprentice not to carry out — the client\'s instruction overrides whatever the apprentice has been trained and signed off to do',
      'Any task that takes longer than a single working day to complete — or any work carried out while your supervisor is away from the site at the time',
    ],
    correctAnswer: 0,
    explanation:
      'If it sits outside your training, sign-off or the agreed RAMS, it exceeds your responsibility. The rule is simple: stop, do not guess, escalate to a competent person.',
    difficulty: 'basic',
  },

  // AC 2.4 — appropriate responsible persons to report to
  {
    id: 261,
    question:
      'Under the GB CLP Regulation, what does the exclamation mark warning pictogram on a red-bordered diamond indicate?',
    options: [
      'Chronic/long-term health hazards: carcinogen, mutagen, reproductive toxicity, aspiration hazard, or respiratory sensitisation',
      'Less severe health hazards: skin/eye irritation, skin sensitiser, respiratory irritation or harmful if swallowed/inhaled',
      'Acute toxicity: the substance is rapidly fatal/toxic in small amounts by inhalation, ingestion or contact with the skin or eyes',
      'Corrosive: the substance causes severe skin burns and serious eye damage, and will also attack metals such as aluminium/mild steel',
    ],
    correctAnswer: 1,
    explanation:
      'The GHS07 exclamation mark pictogram covers less severe acute toxicity, skin and eye irritation, skin sensitisation, respiratory irritation, and substances harmful if swallowed or inhaled. Common on cleaning products, adhesives and some sealants.',
    difficulty: 'intermediate',
  },
  {
    id: 262,
    question:
      'Under the GB CLP Regulation, what does the warning pictogram of a dead tree and a dead fish (red-bordered diamond) indicate?',
    options: [
      'Biohazard — the substance contains harmful micro-organisms or other biological agents such as moulds',
      'Compressed gas — the container is under pressure and may burst if it is heated or knocked over',
      'Hazardous to the aquatic environment — the substance is toxic to aquatic life with long-lasting effects',
      'Flammable — the substance, its vapour or its gas can ignite easily near a naked flame or a spark',
    ],
    correctAnswer: 2,
    explanation:
      'GHS09 (environment pictogram) marks substances toxic to aquatic life with acute or chronic effects. Common on weed killers, some solvents and oil-based products. These must NEVER reach surface water drains.',
    difficulty: 'basic',
  },
  {
    id: 263,
    question:
      'Which of the following is a typical place an electrician might encounter asbestos in a pre-2000 commercial building?',
    options: [
      'The plastic insulation and outer sheath (PVC/PVC) on the modern twin-and-earth cable runs, installed during the most recent rewire of the building',
      'The copper busbars, neutral bar and earth bar inside a recently installed metal-clad consumer unit (BS EN 61439-3), its main switch assembly and tails',
      'The PVC trunking, conduit and cable basket (all post-2000 plastics) fitted during the recent refurbishment of the office suite, its corridors and stairwells',
      'Asbestos insulating board (AIB) ceiling tiles, pipe lagging, textured coatings (Artex), and electrical insulation backing boards behind old fuseboards',
    ],
    correctAnswer: 3,
    explanation:
      'Classic ACM locations an electrician touches: AIB ceiling tiles in suspended ceilings, lagging on old pipework, Artex textured coatings, vinyl floor tiles and the bitumen adhesive under them, gaskets in old switchgear, and insulation backing boards behind fuseboards.',
    difficulty: 'intermediate',
  },
  {
    id: 264,
    question:
      'Which of the three asbestos types was used most heavily in the UK and is the type most commonly encountered in pre-2000 building fabric?',
    options: [
      'Chrysotile (white) — the workhorse, used in cement sheets, textured coatings, gaskets, vinyl floor tiles and some electrical insulation; banned only in 1999',
      'Crocidolite (blue) — the most dangerous of the three types, used mainly in sprayed coatings, pipe lagging and insulating board; banned in 1985 along with amosite',
      'Amosite (brown) — used in insulating boards, ceiling tiles and thermal insulation; banned in 1985 alongside the blue type, and still common in old plant rooms',
      'Actinolite (grey) — a rare contaminant seldom used deliberately; found as an impurity in other minerals, in vermiculite and in talc',
    ],
    correctAnswer: 0,
    explanation:
      'Chrysotile (white) was by far the most heavily used asbestos in the UK and is the most commonly encountered fibre in pre-2000 buildings. Visual identification is unreliable — only laboratory analysis can confirm the type.',
    difficulty: 'basic',
  },
  {
    id: 265,
    question:
      'On suspicion of disturbing an asbestos-containing material, which of these is the WRONG action?',
    options: [
      'Stop work immediately and avoid disturbing the material any further — nothing should be touched, moved or cleaned until a competent person has identified it',
      'Sweep up the dust and bag it for disposal yourself — sweeping releases more fibres into the air, and a domestic vacuum disperses them further',
      'Isolate the area with barriers and warning signs — nobody else should enter, and the material must be assessed by a competent person first',
      'Notify your supervisor and request the asbestos register from the duty holder — the duty holder must produce it, before any further work goes ahead',
    ],
    correctAnswer: 1,
    explanation:
      'Never sweep, hoover (with a domestic vacuum), bag, sample or clean a suspected ACM yourself. Stop, isolate, do not touch, notify, request the register and record what you did. Only an HSE-licensed contractor handles the cleanup.',
    difficulty: 'intermediate',
  },

  // AC 2.5 — environmental impact of work activities
  {
    id: 266,
    question:
      'Which of the following work activities creates the highest risk of water pollution on a building site?',
    options: [
      'Storing sealed drums of diesel on a bunded pallet inside a locked compound',
      'Sweeping dry dust and offcuts into a covered skip at the end of the shift',
      'Washing out concrete chutes or cement mixers into a surface water drain',
      'Stacking PVC offcuts in a labelled bin for collection by a licensed recycler',
    ],
    correctAnswer: 2,
    explanation:
      'Washing concrete or cement into surface water drains is one of the most common causes of pollution incidents — wash water is highly alkaline and lethal to aquatic life. Use a designated wash-out area.',
    difficulty: 'intermediate',
  },
  {
    id: 267,
    question:
      'A diesel generator on site refuels by hand-pumping from a 200 L drum. What is the main environmental risk?',
    options: [
      'Excessive noise from the generator disturbing residents in nearby houses',
      'Carbon dioxide from the exhaust adding to the site carbon footprint',
      'Vibration from the hand pump loosening the seal and bung on the drum',
      'Soil and groundwater contamination from spills and drips during refuelling',
    ],
    correctAnswer: 3,
    explanation:
      'Spills and drips during refuelling are the highest pollution risk — even small volumes contaminate large areas of soil and groundwater. Use drip trays, bunded drums and spill kits.',
    difficulty: 'intermediate',
  },
  {
    id: 268,
    question:
      'Which environmental impact is most associated with operating a petrol breaker or stihl saw in a residential street?',
    options: [
      'Noise nuisance and dust — both can lead to abatement notices from the local authority under the Environmental Protection Act 1990',
      'Water pollution — petrol or two-stroke oil entering a nearby surface water drain and reaching a watercourse',
      'Hazardous waste — the spent cutting discs and their packaging being sent to landfill untreated',
      'Soil and verge contamination — the breaker leaking hydraulic oil and fuel onto the road surface and kerb, then washing into the gully',
    ],
    correctAnswer: 0,
    explanation:
      'Noise and dust from cutting equipment are statutory nuisances under the Environmental Protection Act 1990, and the local authority can serve an abatement notice — plan timings and use suppression.',
    difficulty: 'intermediate',
  },
  {
    id: 269,
    question:
      'Cutting old PVC ducting and installing new conduit on a refurb generates plastic offcuts and copper waste. What is the BEST environmental practice?',
    options: [
      'Put everything into a single general skip — copper, PVC and general waste together, to save the time spent sorting on site',
      'Segregate at source — copper to a metals merchant, PVC to a plastic recycling stream, general waste to skip',
      'Burn the plastic offcuts on site each day — less volume, and less skip cost',
      'Bury the offcuts in the cable trench and backfill over them — the waste is contained, and no licensed carrier has to be paid',
    ],
    correctAnswer: 1,
    explanation:
      'Segregation at source maximises recycling, reduces landfill cost and meets the waste hierarchy in the Waste (England and Wales) Regulations 2011 (prevent → reuse → recycle → recover → dispose).',
    difficulty: 'basic',
  },
  {
    id: 270,
    question:
      'What is the environmental waste hierarchy in order of preference?',
    options: [
      'Disposal, recovery, recycling, re-use, prevention',
      'Re-use, prevention, disposal, recycling, recovery',
      'Prevention, reuse, recycling, recovery, disposal',
      'Prevention, recycling, re-use, disposal, recovery',
    ],
    correctAnswer: 2,
    explanation:
      'The Waste (England and Wales) Regulations 2011 set the hierarchy as prevention first, then reuse, recycling, other recovery (e.g. energy from waste), and disposal as the last resort.',
    difficulty: 'basic',
  },

  // AC 2.6 — waste processing on site
  {
    id: 271,
    question:
      'Old fluorescent tubes removed during a re-lamp are classed as:',
    options: [
      'Inert waste (glass and metal) — they may be put into the general rubble skip, alongside broken brick and hardcore, once they have cooled',
      'General mixed waste (non-hazardous) — they can go into any skip, provided the glass is crushed down first to save room in the skip',
      'Recyclable glass (soda-lime cullet) — they may be placed loose in the site glass recycling bin alongside bottles, jars and window cullet',
      'Hazardous waste (mercury content) — segregate, store upright in a labelled container and consign to a permitted carrier',
    ],
    correctAnswer: 3,
    explanation:
      'Fluorescent tubes contain mercury and are classed as hazardous waste under the Hazardous Waste Regulations 2005 — they need a consignment note and a permitted disposal route.',
    difficulty: 'intermediate',
  },
  {
    id: 272,
    question:
      'Waste electrical and electronic equipment (WEEE) such as old consumer units and luminaires must be:',
    options: [
      'Segregated and sent to an authorised treatment facility (AATF) under the WEEE Regulations 2013',
      'Placed in the general waste skip (mixed non-hazardous) once the cables and the lamps are taken out first',
      'Buried on site with the inert rubble (as clean hardcore) once the casing has been broken up into small pieces',
      'Sent straight to landfill (general waste), since electrical items cannot be economically recycled',
    ],
    correctAnswer: 0,
    explanation:
      'The Waste Electrical and Electronic Equipment Regulations 2013 require WEEE to be segregated and sent to an authorised treatment facility for proper recovery and disposal.',
    difficulty: 'intermediate',
  },
  {
    id: 273,
    question:
      'A waste transfer note must be retained by the producer for at least how long?',
    options: [
      'Indefinitely',
      '2 years',
      '6 months',
      '12 months',
    ],
    correctAnswer: 1,
    explanation:
      'Under the Waste (England and Wales) Regulations 2011, waste transfer notes must be kept for at least two years; consignment notes for hazardous waste must be kept for three.',
    difficulty: 'basic',
  },
  {
    id: 274,
    question:
      "What's the correct on-site practice for storing scrap copper cable awaiting collection?",
    options: [
      'Left loose beside the site gate — the scrap merchant can then collect it at any time of day, without waiting for the site staff',
      'Stripped of its insulation by burning it off before storage — clean copper, free of PVC, fetches a higher price when it is weighed in at the scrap yard',
      'Segregated, secured against theft, in a labelled and dry container — transferred only to an authorised metal carrier with a transfer note',
      'Mixed in with the general waste skip — the resale value of copper does not cover the cost of separating it out, sorting it and weighing it in at the yard',
    ],
    correctAnswer: 2,
    explanation:
      "Burning insulation off cable is illegal (releases dioxins) and theft of scrap is rife — copper must be secured, segregated and transferred to a licensed carrier under the Scrap Metal Dealers Act 2013.",
    difficulty: 'intermediate',
  },
  {
    id: 275,
    question:
      'Inert waste (clean rubble, broken brick) on site should be:',
    options: [
      'Consigned as hazardous waste — a consignment note is required, and must be kept on file for three years by the waste producer',
      'Mixed in with the general waste skip — clean rubble cannot be recycled or reused on site once it has been broken out',
      'Sent to an authorised treatment facility under the WEEE Regulations 2013 — the same route as old luminaires, consumer units and other electrical waste',
      'Segregated into its own skip — the disposal cost is much lower and it can often be reused or recycled as aggregate',
    ],
    correctAnswer: 3,
    explanation:
      'Inert waste has its own much cheaper disposal route and is widely recycled as aggregate. Mixing it with hazardous or general waste contaminates the load and increases cost.',
    difficulty: 'intermediate',
  },

  // AC 2.7 — importance of reporting environmental hazards
  {
    id: 276,
    question:
      'Why is it important to report a fuel spill to your supervisor immediately rather than just mopping it up yourself?',
    options: [
      'Spills above certain thresholds must be reported to the Environment Agency, and the firm needs to investigate the cause to prevent a repeat',
      'Mopping it up yourself is unlawful — under the Environmental Permitting Regulations 2016, only a licensed contractor may deal with it',
      'Reporting it transfers the legal responsibility for the spill from you onto the supervisor, and onto the firm',
      'The supervisor must personally clean up every spill, so an operative should never touch the absorbent granules in the spill kit',
    ],
    correctAnswer: 0,
    explanation:
      'Pollution incidents above certain thresholds are reportable to the Environment Agency, and root-cause investigation is the only way to prevent recurrence. Silence about a spill is itself a breach.',
    difficulty: 'intermediate',
  },
  {
    id: 277,
    question:
      'You see another contractor pouring waste solvent down a surface water drain. What is the right action?',
    options: [
      'Say nothing on site; report it to the Environment Agency yourself, once the job is finished',
      'Stop them if safe, report immediately to your supervisor and the principal contractor; record what you saw',
      'Help them flush the drain through with clean water; once diluted, the solvent is harmless',
      'Wait until the toolbox talk the next morning; raise it there, where the whole site team and the supervisor will hear it',
    ],
    correctAnswer: 1,
    explanation:
      'Pouring solvent down a surface water drain is a criminal offence under the Environmental Permitting Regulations 2016 — challenge it if safe, report up the chain and document what you saw.',
    difficulty: 'basic',
  },
  {
    id: 278,
    question:
      'Work on which of the following asbestos-containing materials is LICENSED work that can ONLY be done by an HSE-licensed asbestos contractor?',
    options: [
      'Drilling a single fixing hole through an asbestos cement (chrysotile-bonded) roof sheet, using a shadow vacuum',
      'Removing intact asbestos cement (AC) guttering, downpipes and profiled roof sheets from outside the building',
      'Removing or disturbing AIB (asbestos insulating board), sprayed coatings, or pipe lagging',
      'Lifting and replacing undamaged vinyl floor tiles (bitumen-backed), whole and unbroken',
    ],
    correctAnswer: 2,
    explanation:
      'Under CAR 2012, work on AIB, sprayed asbestos coatings and pipe lagging is licensed work and may ONLY be done by an HSE-licensed asbestos contractor — never by a general electrical contractor and never by an apprentice.',
    difficulty: 'advanced',
  },
  {
    id: 279,
    question:
      'Why should near-miss environmental incidents (e.g. a drum that nearly tipped, a leak that nearly reached a drain) be reported even if no harm occurred?',
    options: [
      'Near-misses do not need reporting — no actual harm was caused, and nothing reached the surface water drain or the watercourse below the site',
      'Reporting near-misses is only required for injuries to people — RIDDOR covers people, and never environmental incidents of this kind on a construction site',
      'Near-misses should be recorded privately by the operative — the note stays personal, and is never shared with the firm or the client in case blame is attached later',
      'Near-misses identify weaknesses before they cause real incidents — the same control failure will eventually cause an actual pollution event',
    ],
    correctAnswer: 3,
    explanation:
      'Near-miss reporting is the cheapest form of risk control — the same root cause that produced the near-miss will produce a real incident next time unless it is fixed.',
    difficulty: 'basic',
  },
  {
    id: 280,
    question:
      'Under the GB CLP Regulation, which warning pictogram on a chemical container indicates an acute toxicity (fatal or toxic) hazard?',
    options: [
      'A skull and crossbones in a red-bordered diamond',
      'An exclamation mark in a red-bordered diamond',
      'A flame in a red-bordered diamond',
      'A dead tree and dead fish in a red-bordered diamond',
    ],
    correctAnswer: 0,
    explanation:
      'GB CLP acute toxicity pictogram (GHS06) is a black skull and crossbones inside a red-bordered diamond. It marks substances that are fatal or toxic by inhalation, ingestion or skin contact.',
    difficulty: 'intermediate',
  },

  // AC 3.5 — first aid facilities required
  {
    id: 281,
    question:
      'Under the Health and Safety (First-Aid) Regulations 1981, what is the minimum requirement for first-aid provision on every workplace?',
    options: [
      'At least one fully qualified first-aider, holding a current FAW certificate, on every site at all times',
      'Adequate, suitable and sufficient first-aid equipment, facilities and personnel based on a needs assessment',
      'A staffed medical room, with a couch and running water, at every workplace over five people',
      'A defibrillator at every workplace by law, inspected each month by a competent person',
    ],
    correctAnswer: 1,
    explanation:
      'The Regulations require employers to provide adequate, suitable and sufficient first-aid arrangements. The detail (kit contents, number of first-aiders) is set by a documented first-aid needs assessment.',
    difficulty: 'intermediate',
  },
  {
    id: 282,
    question:
      'What is the role of an "appointed person" under the Health and Safety (First-Aid) Regulations 1981?',
    options: [
      'A fully trained first-aider (FAW certificate, three-day course) who can give emergency treatment to casualties, including CPR and defibrillation',
      'The HSE inspector (acting under HASAWA s.20 powers) who checks first-aid provision on a routine site visit, and records any shortfall found on the day',
      'A person appointed to take charge of first-aid arrangements (calling emergency services, looking after kit) when no first-aider is required by the assessment',
      'The site manager (as the employer\'s representative), who appoints all the first-aiders for the project, pays for their initial and refresher training, and keeps the certificates on file',
    ],
    correctAnswer: 2,
    explanation:
      'Where the needs assessment shows a trained first-aider is not necessary, the employer must still appoint a person to take charge of first-aid arrangements — calling emergency services and looking after the kit.',
    difficulty: 'intermediate',
  },
  {
    id: 283,
    question:
      'A small electrical contractor site (under 5 low-risk workers) is doing a domestic re-wire. What is the typical first-aid kit standard recommended?',
    options: [
      'A large BS 8599-1 kit, plus two qualified first-aiders on site at all times',
      'A staffed first-aid room, with a stretcher and a defibrillator',
      'No first-aid provision is required, since there are fewer than five workers',
      'A small BS 8599-1 compliant first-aid kit, plus an appointed person',
    ],
    correctAnswer: 3,
    explanation:
      'BS 8599-1 is the recognised standard for workplace first-aid kits and HSE recommends it; small low-risk sites need at least the small kit plus an appointed person.',
    difficulty: 'intermediate',
  },
  {
    id: 284,
    question:
      'Where should first-aid equipment be kept on a construction site?',
    options: [
      'In a clearly identified, easily accessible location known to all workers — flagged at induction and on the site\'s emergency information',
      'Locked in the site office with the manager holding the only key — the contents cannot then be misused, or taken home by anyone at the end of a shift',
      'In a personal toolbox carried by each worker — a dressing is then always close to hand, wherever on the site they happen to be working',
      'In a remote lock-up store well away from the work area — the contents stay clean and dry there, free from site dust, damp and rodents',
    ],
    correctAnswer: 0,
    explanation:
      'First-aid kit must be easily accessible and clearly identified. The location is part of every site induction and is included in the emergency contact information posted on site.',
    difficulty: 'basic',
  },
  {
    id: 285,
    question:
      'For sites with electrical risks, what additional equipment may the first-aid needs assessment recommend?',
    options: [
      'A spare set of insulated gloves (kept in the kit) — the first-aider puts them on before approaching a casualty still touching a live conductor',
      'An automated external defibrillator (AED) — useful where the casualty may suffer ventricular fibrillation from electric shock',
      'An extra supply of burn dressings and cling film (unsterile wrap) — kept in the site office rather than in the main first-aid kit',
      'A second first-aid kit (BS 8599-1) — locked in the site office, in case the main kit is emptied during a serious incident and cannot be restocked',
    ],
    correctAnswer: 1,
    explanation:
      'HSE guidance and BS 8599-1 recognise the value of AEDs where electric shock or sudden cardiac arrest is foreseeable — they significantly improve survival from ventricular fibrillation.',
    difficulty: 'intermediate',
  },

  // AC 3.6 — not misuse first aid / replace supplies
  {
    id: 286,
    question:
      "Why is it important not to use first-aid supplies for non-emergency purposes (e.g. taking plasters home, using the eye-wash to clean glasses)?",
    options: [
      'Using the kit casually invalidates the first-aid insurance cover, which the employer holds',
      'First-aid items lose their sterility the moment the box is opened, whatever they are then used for',
      'Supplies may be missing or inadequate when a real injury occurs, leaving the casualty without treatment',
      'Only a qualified first-aider is legally allowed to open a first-aid kit, whatever the injury',
    ],
    correctAnswer: 2,
    explanation:
      'First-aid kit is for emergencies. Casual use empties the kit so that when a real injury happens the right item is missing — that delay can change the outcome.',
    difficulty: 'basic',
  },
  {
    id: 287,
    question:
      'After using items from a first-aid kit, who is responsible for ensuring they are replaced?',
    options: [
      'The casualty who was treated — they were the person who used up the supplies that were taken from the kit that day',
      'The HSE inspector — inspectors check and restock workplace first-aid kits during routine unannounced visits made to every workplace each year',
      'Whoever happens to notice that the kit is running low — no record needs to be kept of what was used, when it was used, or by whom',
      'The first-aider, appointed person, or the named responsible person in the workplace — replacement should be prompt and recorded',
    ],
    correctAnswer: 3,
    explanation:
      'Replacing used items is part of the first-aid management arrangements under the 1981 Regulations. The first-aider or appointed person checks the kit regularly and arranges replacement.',
    difficulty: 'basic',
  },
  {
    id: 288,
    question:
      'How often should first-aid kits be checked to ensure contents are complete and in date?',
    options: [
      'Regularly (typically monthly) — and after every use; sterile items have expiry dates and must be replaced',
      'Once a year (at the annual workplace health and safety audit) — the firm\'s safety adviser carries out the check each time; nothing is checked in between',
      'Only when an item is needed (a use-based check) — nothing is checked on a schedule; only on demand',
      'Every five years (the fixed-wiring inspection cycle) — the installation check and the kit check are done together; one visit covers both',
    ],
    correctAnswer: 0,
    explanation:
      'HSE guidance recommends regular checks (monthly is typical) plus after every use; sterile dressings, eye pads and similar items have expiry dates and must be in date to be effective.',
    difficulty: 'basic',
  },
  {
    id: 289,
    question:
      'You used the last triangular bandage from the site first-aid kit treating a colleague. What should you do next?',
    options: [
      'Nothing — restocking the first-aid kit is a job for the site manager, not for the person who happened to use up the last of it on the day',
      'Tell the appointed person or first-aider so the kit is restocked, and note it in the accident book if the use was for an injury',
      'Buy a replacement bandage yourself from a chemist in town on the way home, and claim the cost back on your expenses at the end of the month',
      'Improvise a substitute from clean materials found on site and say nothing to anyone about the shortage afterwards, so the job is not held up',
    ],
    correctAnswer: 1,
    explanation:
      "Inform the responsible person so the kit is restocked promptly. If the bandage was used for an injury, the accident also needs to be entered in the firm's accident book.",
    difficulty: 'basic',
  },
  {
    id: 290,
    question:
      'Why should you never re-use opened sterile dressings or eye-wash bottles?',
    options: [
      'Opened items lose their absorbency and will not stop heavy bleeding effectively',
      'Re-using items breaches the manufacturer warranty on the first-aid kit itself',
      'They are no longer sterile and may introduce infection or contamination to the next casualty',
      'Opened dressings may only be used again on the same casualty and never on a colleague',
    ],
    correctAnswer: 2,
    explanation:
      'Once opened, sterility is lost. Re-using a dressing or eye-wash on a later casualty risks introducing infection — discard and replace after every single use.',
    difficulty: 'intermediate',
  },

  // AC 3.8 — safe isolation procedures
  {
    id: 291,
    question:
      'What is the correct sequence for safe isolation of a single-phase final circuit?',
    options: [
      'Switch off at the consumer unit, test the circuit dead with an approved voltage indicator, then begin work without locking the isolating device off',
      'Test the circuit dead first, then switch off, lock off, and finally prove the voltage indicator on a known live supply or a proving unit to confirm that it is working',
      'Lock off the device first, switch off, prove the voltage indicator dead against the circuit itself, then start work at once without a caution notice',
      'Switch off, lock off, place caution notice, prove voltage indicator on a known supply, test the circuit dead at all relevant points, prove the indicator again',
    ],
    correctAnswer: 3,
    explanation:
      "GS38 / IET Electrician's Guide safe isolation sequence: identify circuit, switch off, lock off and label, prove the test instrument on a known live source, test at the point of work to confirm dead, then re-prove the instrument on the known source.",
    difficulty: 'advanced',
  },
  {
    id: 292,
    question:
      'What test instrument is recommended by HSE Guidance Note GS38 for proving a circuit dead?',
    options: [
      'A two-pole voltage indicator (fused or current-limited) compliant with GS38, used with a proving unit',
      'A mains-testing neon screwdriver (single-pole), which lights up when the conductor under test is live to earth',
      'A non-contact voltage detector pen (volt stick), used on its own as the sole means of proving dead',
      'A multimeter (set to AC volts) on its highest range, fitted with standard unfused test leads and uninsulated probes',
    ],
    correctAnswer: 0,
    explanation:
      'GS38 recommends a two-pole voltage indicator with built-in current limitation, used with a dedicated proving unit — never a neon screwdriver and never a non-contact detector as the sole means.',
    difficulty: 'intermediate',
  },
  {
    id: 293,
    question:
      'Why is it essential to "prove the prover" before AND after testing a circuit dead?',
    options: [
      'To calibrate the voltage indicator against the exact supply voltage being tested — the reading obtained is then accurate, and traceable to a national standard',
      'To confirm the test instrument was working correctly both before AND after the dead test — a fault that develops mid-test could give a false dead reading',
      'To discharge any stored charge held inside the indicator — the instrument is then safe to apply to the live conductors of the circuit at the point of work',
      'To warm up the batteries inside the indicator — the display then reads accurately in the cold conditions found on an open site during winter working outdoors',
    ],
    correctAnswer: 1,
    explanation:
      "Proving the instrument on a known live source before AND after the dead test is the only way to confirm a fault didn't develop mid-test, which is what gives the dead test its evidential value.",
    difficulty: 'intermediate',
  },
  {
    id: 294,
    question:
      'When isolating a three-phase circuit, you must test for voltage between:',
    options: [
      'Each phase to neutral only (L1-N, L2-N, L3-N) — the phase-to-phase tests are not required on TN-S',
      'Neutral to earth only (N-E), since the three phases all share one common supply transformer',
      'Each phase to neutral, each phase to earth, AND between each pair of phases (L1-L2, L2-L3, L1-L3)',
      'Between L1 and earth only (L1-E), since the other two lines will follow automatically from that',
    ],
    correctAnswer: 2,
    explanation:
      'For three-phase circuits, test between every conductor combination — phase-to-neutral, phase-to-earth, and phase-to-phase — to prove the entire circuit is dead before work begins.',
    difficulty: 'advanced',
  },
  {
    id: 295,
    question:
      'Once a circuit has been isolated and proved dead, what additional precaution prevents someone else re-energising it while you work?',
    options: [
      'Leave the breaker in the off position, and tell the other workers and trades on site verbally at the start of the working shift',
      'Place a strip of insulating tape across the breaker dolly, so that it cannot easily be switched back on by another operative',
      'Post a colleague beside the consumer unit for the whole of the job, so that nobody can switch the circuit back on by mistake while you work',
      'Apply a personal padlock to the lock-off device, retain the only key, and display a caution notice giving your name and contact',
    ],
    correctAnswer: 3,
    explanation:
      'Padlock-and-tag (LOTO) with the only key retained by the person doing the work, plus a clear caution notice, is the only way to prevent inadvertent re-energisation.',
    difficulty: 'intermediate',
  },

  // AC 3.9 — implications of (not) carrying out safe isolation
  {
    id: 296,
    question:
      'What is the most likely consequence of failing to carry out safe isolation before working on a circuit?',
    options: [
      'Electric shock, arc flash burns, potential fatality — and personal liability under EAWR 1989 Reg 14',
      'A minor tingling sensation — it passes off quickly, and leaves the casualty with no lasting harm',
      'Nuisance tripping of the RCD — it simply needs resetting at the consumer unit, and the work then carries on',
      'A small voltage drop on the circuit — nearby equipment dims, along with the lighting on the rest of that floor',
    ],
    correctAnswer: 0,
    explanation:
      'Most UK electrical fatalities involve work on circuits believed to be dead. EAWR 1989 Reg 14 prohibits work on or near live conductors unless strictly justified, and the personal duty rests on the worker.',
    difficulty: 'intermediate',
  },
  {
    id: 297,
    question:
      'Under EAWR 1989 Regulation 14, live working is only permitted when:',
    options: [
      'The worker holds a valid ECS card, feels confident working live, and has been shown the circuit and its supply arrangement by the supervisor beforehand — competence and familiarity together make the work permissible',
      'It is unreasonable in all the circumstances to make the conductor dead AND it is reasonable to work live AND suitable precautions are taken — all three tests must be met',
      'The circuit is protected by a 30mA RCD that will trip on contact, insulated tools rated to 1000V are being used throughout, and the board is attended — those precautions on their own make live work lawful',
      'The supervisor has given verbal permission for the work to proceed live, a second person is standing by to isolate the supply at the board, and the job is only a short one — short duration removes the need for the Reg 14 tests',
    ],
    correctAnswer: 1,
    explanation:
      'EAWR Reg 14 imposes three cumulative tests: dead working unreasonable, live working reasonable, and suitable precautions taken. Live working without all three is a criminal offence.',
    difficulty: 'advanced',
  },
  {
    id: 298,
    question:
      'What is the correct action if you discover, after starting work, that the circuit you isolated is actually still live?',
    options: [
      'Carry on carefully with the work, taking extra care not to touch the live conductor or anything bonded to earth close by at the time',
      'Quickly finish off the task before the circuit has any chance to cause harm, then report the fault to the supervisor at the end of the shift',
      'Stop immediately, withdraw to a safe position, re-establish isolation correctly, and investigate why the original isolation failed before resuming',
      'Switch off at the nearest socket-outlet and carry on, since the main supply arrangement must itself be faulty somewhere further upstream',
    ],
    correctAnswer: 2,
    explanation:
      'A failed isolation is a near-miss with serious potential. Stop, withdraw, re-isolate properly, and investigate the cause — before any work resumes — so the same failure does not happen on the next job.',
    difficulty: 'basic',
  },
  {
    id: 299,
    question:
      'Why is locking off and labelling more reliable than just switching off and putting the breaker in the off position?',
    options: [
      'A locked-off breaker disconnects the supply faster, and more completely, than switching it off at the board; the circuit is therefore left in a safer state',
      'Locking off reduces the voltage remaining on the circuit to a safe touch level; anyone working downstream of the isolating device is then protected, whatever they touch',
      'A padlock and a caution label, fitted together, prove that the circuit is dead; there is then no need to use a voltage indicator at all at the point of work before starting',
      'Anyone can switch a breaker back on by mistake or routine; a personal padlock with the only key retained, plus a caution notice, prevents inadvertent re-energisation',
    ],
    correctAnswer: 3,
    explanation:
      "Switching off without locking leaves the circuit one bump away from being re-energised by anyone walking past. Lock-off with the only key retained is the only control that genuinely prevents that.",
    difficulty: 'basic',
  },
  {
    id: 300,
    question:
      'Beyond personal injury, what other implications follow from failing to carry out safe isolation?',
    options: [
      'Damage to equipment, fire, RIDDOR-reportable dangerous occurrence, criminal prosecution under EAWR/HASAWA, dismissal, and loss of competent person status',
      'A small fine of no more than £200 payable to the HSE/local authority, with no further action taken against the firm or the operative who was involved on the day',
      'A requirement to re-sit the safe isolation module, and be reassessed by the college/training provider, before being allowed back onto any site',
      'Nuisance tripping of the RCD/RCBO protecting the circuit, which simply needs to be reset at the consumer unit before the rest of the work carries on as normal afterwards',
    ],
    correctAnswer: 0,
    explanation:
      'Failed isolation can cause arcing/equipment damage and fire, is reportable as a dangerous occurrence under RIDDOR, can lead to EAWR/HASAWA prosecution of both worker and employer, and typically ends the worker’s competent-person status.',
    difficulty: 'basic',
  },
  {
    id: 301,
    question:
      'What is the correct order of the four key stages of a safe isolation?',
    options: [
      'Identify the circuit, isolate it, lock it off, then prove it dead',
      'Identify the circuit, prove it dead, then isolate it and lock it off',
      'Isolate the circuit, prove it dead, then identify it and lock it off',
      'Prove the circuit dead, identify it, then lock it off and isolate it',
    ],
    correctAnswer: 0,
    explanation:
      'Securing the isolation comes before proving dead. If you prove dead first and only then lock off, the supply is unsecured during the test and can be restored by someone else at the exact moment you start work. Proving dead is the final check that the securing worked, not a substitute for it.',
    difficulty: 'intermediate',
  },
  {
    id: 302,
    question:
      'Who should hold the key to a padlock used to lock off an isolator, and why?',
    options: [
      'The key should be left in the lock so others can see it is isolated',
      'The key should be given to the site supervisor to hold in the office',
      'The person who carried out the isolation should keep the key on them',
      'The key should be left near the isolator for the next person to use',
    ],
    correctAnswer: 2,
    explanation:
      'Where the key is retained is one of the most important factors in securing an isolation, so the person exposed to the danger keeps it. Leaving it in the lock feels tidy and looks like a signal, but it lets an unknowing person re-energise the circuit in seconds, which is exactly the risk the lock was fitted to remove.',
    difficulty: 'basic',
  },
  {
    id: 303,
    question:
      'When proving a circuit dead with an approved voltage indicator, when must the indicator itself be proved on a known source?',
    options: [
      'Prove the tester on a known source only before testing the circuit',
      'Prove the tester on a known source both before and after the dead test',
      'Prove the tester on a known source once at the start of the working day',
      'Prove the tester on a known source after any reading above fifty volts',
    ],
    correctAnswer: 1,
    explanation:
      'Proving before confirms the indicator works; proving after confirms it did not fail between those two moments. Proving only beforehand is the common shortcut, but an indicator that fails during the dead test would give a no-voltage reading on a live circuit and you would never know.',
    difficulty: 'intermediate',
  },
  {
    id: 304,
    question:
      'A three-phase motor is to be isolated for maintenance. Why should the load be switched off before the isolator is opened?',
    options: [
      'Isolators cannot be padlocked while the connected load is still running',
      'Isolators only break the line conductors once the load has been removed',
      'Isolators must be proved for continuity before the load is removed',
      'Isolators are not designed for on-load switching and may arc if opened',
    ],
    correctAnswer: 3,
    explanation:
      'An isolator provides a safe separation but is not rated to break load current, so opening it under load risks arcing and damage to the contacts. The padlock answer sounds practical, but nothing about a hasp depends on the load state; the reason is the switching duty of the device itself.',
    difficulty: 'advanced',
  },
  {
    id: 305,
    question:
      'Which feature of test probes matters most for preventing danger while proving a circuit dead?',
    options: [
      'Long exposed tips so that contact can be made with recessed terminals',
      'Bare probe bodies so that a good electrical contact is always assured',
      'Finger barriers and only a short length of exposed metal at the tip',
      'Coiled leads long enough to reach right across a whole distribution board',
    ],
    correctAnswer: 2,
    explanation:
      'Probes should have finger barriers, or be shaped to guard against inadvertent hand contact, and leave only a minimal exposed tip. Long tips are tempting for reaching recessed terminals, but they raise the chance of bridging between adjacent live parts and of touching the tip while the probe is in contact.',
    difficulty: 'intermediate',
  },
  {
    id: 306,
    question:
      'Why is a neon screwdriver unsuitable for proving a circuit dead?',
    options: [
      'It gives no reliable indication and may show a circuit as dead when live',
      'It only indicates on final circuits protected by a thirty milliamp RCD',
      'It must be proved on a proving unit before and after each use on site',
      'It reads voltage accurately but cannot be used on three-phase supplies',
    ],
    correctAnswer: 0,
    explanation:
      'A neon screwdriver depends on current through the user and can fail to light on a live conductor for many reasons, so a no-indication result proves nothing. The three-phase answer is attractive because it sounds like a limitation, but the device is unsuitable on any circuit, single or three phase.',
    difficulty: 'basic',
  },
  {
    id: 307,
    question:
      'You arrive to work on a circuit and find the isolator already locked off with a padlock that is not yours. What should you do?',
    options: [
      'Work on the circuit, as the existing padlock already secures it',
      'Remove the existing padlock and fit your own before starting work',
      'Ask the supervisor to unlock it so that you can prove the circuit dead',
      'Fit your own lock to the hasp so it cannot be restored without you',
    ],
    correctAnswer: 3,
    explanation:
      'Each person at risk should hold their own lock, so add yours to the hasp and prove dead for yourself. Relying on a lock fitted by somebody else is the trap: when they finish and remove it, the supply can be restored while you are still working, because nothing on the isolator records that you are there.',
    difficulty: 'advanced',
  },
  {
    id: 308,
    question:
      'Which set of tests proves a three-phase and neutral circuit dead?',
    options: [
      'Only the three line-to-line combinations, since the neutral cannot be live',
      'Every line-to-line, line-to-neutral, line-to-earth and neutral-to-earth pair',
      'The three line-to-earth combinations alone, which are sufficient to prove dead',
      'Line to neutral on one phase only, because all three phases share the same neutral',
    ],
    correctAnswer: 1,
    explanation:
      'All combinations must be tested, including neutral to earth, because a borrowed or faulty neutral can sit at a dangerous potential even when the lines are dead. Testing only line to line is the usual shortcut and it will pass happily on a circuit whose neutral is still live.',
    difficulty: 'advanced',
  },
  {
    id: 309,
    question:
      'As well as locking off, what should be fitted at the point of isolation?',
    options: [
      'A voltage indicator left connected at the board to show the circuit remains dead',
      'A warning notice stating the circuit is isolated and must not be switched',
      'A copy of the risk assessment and method statement covering the work in hand',
      'A temporary link fitted across the isolator terminals to hold the circuit dead',
    ],
    correctAnswer: 1,
    explanation:
      'A caution notice tells anyone approaching the board why the device is off and who to contact, which a padlock alone does not. Leaving a voltage indicator connected sounds reassuring, but it is not a monitored device, its batteries can fail, and it does nothing to stop the switch being operated.',
    difficulty: 'basic',
  },
  {
    id: 310,
    question:
      'Under what circumstances may work be carried out on or near live conductors?',
    options: [
      'Whenever isolating the circuit would inconvenience the client on site',
      'Where the operative holds a current wiring regulations qualification',
      'Where the work will take less than thirty minutes from start to finish',
      'Where it is unreasonable to work dead and suitable precautions are taken',
    ],
    correctAnswer: 3,
    explanation:
      'Live work is only permissible where it is unreasonable in all the circumstances for the work to be done dead, and then only with a risk assessment and suitable precautions. Holding a qualification is not the test; competence is necessary but it never on its own justifies choosing to work live.',
    difficulty: 'intermediate',
  },
  {
    id: 311,
    question:
      'An apprentice is issued with eye protection and a method statement. What does health and safety law then require of the apprentice?',
    options: [
      'Co-operate with the employer and use the safety equipment correctly',
      'Carry out a written risk assessment for each task they are given',
      'Provide their own protective equipment once their training is complete',
      'Record the significant findings of the site wide risk assessment',
    ],
    correctAnswer: 0,
    explanation:
      'Employees are required by law to co-operate with their employer and to use safety equipment fully and correctly. Writing the risk assessment is an employer duty, not an employee one; the apprentice must follow it and report anything unsafe, but the legal burden of producing it sits above them.',
    difficulty: 'intermediate',
  },
  {
    id: 312,
    question:
      'A small electrical contractor completes a risk assessment for a rewire. When must the significant findings be written down?',
    options: [
      'When the work involves any use of electricity on the site',
      'When an accident has already happened during that same activity',
      'When the employer has five or more employees on the payroll',
      'When the client specifically asks to see the paperwork first',
    ],
    correctAnswer: 2,
    explanation:
      'Employers with five or more employees must record the significant findings of the risk assessment. The assessment itself is still required below that number, which is why the electricity answer misleads: the trigger for writing it down is the size of the workforce, not the hazard involved.',
    difficulty: 'intermediate',
  },
  {
    id: 313,
    question:
      'The Electricity at Work Regulations 1989 place their duties principally on whom?',
    options: [
      'The distributor supplying the premises, who owns the incoming service',
      'The manufacturer of the equipment installed within that system',
      'The building owner alone, whoever actually carries out the work',
      'Those in control of electrical systems and those who work on them',
    ],
    correctAnswer: 3,
    explanation:
      'The regulations, made under the Health and Safety at Work Act, apply to people in control of electrical systems and to those working on or near them. Blaming the distributor is a common confusion: the distributor has duties under separate supply regulations, but they do not carry your duty for the installation.',
    difficulty: 'intermediate',
  },
  {
    id: 314,
    question:
      'A distribution board flashes over on site, causing no injury but a serious risk. Who carries the legal duty to report it under RIDDOR?',
    options: [
      'The operative who was working at the board, since they witnessed the flashover at first hand',
      'The employer, self-employed person or person in control of the premises',
      'The first aider who attended the scene, having completed the entry in the site accident book',
      'The main contractor in every case, whichever firm employed the person at risk',
    ],
    correctAnswer: 1,
    explanation:
      'RIDDOR places the reporting duty on employers, the self-employed and those in control of premises, and a dangerous occurrence is reportable even with nobody hurt. Putting the duty on the operative is intuitive because they were there, but the law deliberately places it on those who control the work.',
    difficulty: 'advanced',
  },
  {
    id: 315,
    question:
      'What is the main purpose of the Electricity Safety, Quality and Continuity Regulations 2002?',
    options: [
      'To set out the sequence of tests for a new domestic installation',
      'To place duties on employees to co-operate with their employers',
      'To protect the public and consumers from danger arising from the supply',
      'To require portable equipment to be inspected at fixed intervals',
    ],
    correctAnswer: 2,
    explanation:
      'These regulations replaced the Electricity Supply Regulations 1988 and set safety standards aimed at protecting the general public and consumers, along with power quality and continuity duties. The testing answer attracts candidates because it sounds electrical, but test sequences come from BS 7671, not from supply legislation.',
    difficulty: 'intermediate',
  },
  {
    id: 316,
    question:
      'On a commercial fit-out, who carries duties under the Construction (Design and Management) Regulations?',
    options: [
      'The client, the designers and the contractors each carry duties',
      'The principal contractor carries them, and nobody else on site',
      'Only projects running longer than thirty days attract any duties, whatever the work involves',
      'The client alone, because the client commissioned the project work',
    ],
    correctAnswer: 0,
    explanation:
      'CDM deliberately spreads duties across everyone who can influence health and safety on a project, including the client, so that risk is designed out early rather than managed on site. Assuming the principal contractor holds it all is the classic error and leaves design-stage hazards nobody has owned.',
    difficulty: 'intermediate',
  },
  {
    id: 317,
    question:
      'Which items are covered by the Provision and Use of Work Equipment Regulations?',
    options: [
      'All equipment used at work, from hand tools to ladders and machinery',
      'Powered machinery only, as hand tools present no significant risk',
      'Equipment supplied by the employer, but not tools an operative owns',
      'Fixed plant that is bolted down, plus lifting equipment such as lifts',
    ],
    correctAnswer: 0,
    explanation:
      'Generally any equipment used by an employee at work is covered, which includes hammers, knives, ladders, drills, saws and vehicles. The idea that your own tools fall outside is a widespread and dangerous belief, and it is exactly how uninspected personal power tools end up in use.',
    difficulty: 'intermediate',
  },
  {
    id: 318,
    question:
      'What does COSHH principally require an employer to do?',
    options: [
      'Provide respiratory protective equipment to every person entering the site',
      'Prohibit any substance that carries a hazard warning label on its tin',
      'Control exposure to hazardous substances to protect employees and others',
      'Record every substance kept on site in the workplace accident report book',
    ],
    correctAnswer: 2,
    explanation:
      'COSHH requires exposure to be controlled, and the preferred controls are eliminating or substituting the substance, then enclosing the process or ventilating it, with PPE well down the list. Jumping straight to respirators is the mistake: it protects only the wearer and only while worn correctly.',
    difficulty: 'intermediate',
  },
  {
    id: 319,
    question:
      'An office installation is sound, live parts are insulated and metalwork is properly earthed. How is the electricity best described?',
    options: [
      'It is no longer a hazard, because it has been fully controlled',
      'It remains a hazard, but the risk of it causing harm is low',
      'It becomes the risk once the control measures are in place, so the hazard has gone',
      'It is neither a hazard nor a risk, if well managed',
    ],
    correctAnswer: 1,
    explanation:
      'A hazard is anything with the potential to cause harm and electricity always has that potential; the risk is the chance of harm actually occurring. Controls change the risk, never the hazard, which is why saying it stops being a hazard leads people to drop the controls that were holding the risk down.',
    difficulty: 'advanced',
  },
  {
    id: 320,
    question:
      'Which body enforces health and safety law for a given work activity?',
    options: [
      'The Health and Safety Executive alone, in every workplace and industry',
      'The local authority environmental health team, in every kind of workplace',
      'The insurer of the business, acting for the premises at which the incident occurred',
      'The HSE or the local authority, depending on the activity involved',
    ],
    correctAnswer: 3,
    explanation:
      'Enforcement is split: the HSE covers many activities such as construction, while local authorities cover others such as retail and offices. Assuming the HSE always enforces is common, and it matters because a report made to the wrong authority does not discharge the legal duty to report.',
    difficulty: 'intermediate',
  },
  {
    id: 321,
    question:
      'Several ways of reducing a risk are available and more than one is reasonably practicable. Which should be selected?',
    options: [
      'The cheapest option, taken across the whole of the project',
      'The option the operatives know best, since familiarity helps',
      'The lowest-risk option, with engineering solutions preferred over PPE',
      'The option that keeps the programme on time, as planned',
    ],
    correctAnswer: 2,
    explanation:
      'Where several options for risk reduction exist you must use the lowest-risk option that is reasonably practicable, and engineering solutions are preferred to procedural controls or to reliance on PPE. Choosing what the team already knows is comfortable but it locks in the weakest control available.',
    difficulty: 'intermediate',
  },
  {
    id: 322,
    question:
      'Why does personal protective equipment sit at the bottom of the hierarchy of control?',
    options: [
      'It protects only the wearer, and only while worn and fitted correctly',
      'It costs the employer more, over time, than redesigning the process or the equipment',
      'It is uncomfortable, so operatives are rarely issued with it on site',
      'It has to be replaced each time a new employee joins, whatever its condition',
    ],
    correctAnswer: 0,
    explanation:
      'PPE does nothing to the hazard itself; it puts a barrier between one person and the harm, and that barrier fails the moment it is removed, damaged or wrongly fitted. Cost is not the reason, and treating it as a cost question leads people to justify PPE whenever an engineering fix looks expensive.',
    difficulty: 'basic',
  },
  {
    id: 323,
    question:
      'Under a permit to work system, who may cancel a permit once work is finished?',
    options: [
      'Any competent electrician, if they worked under that permit',
      'The site supervisor at the end of every shift, as a routine practice',
      'The client representative, once the area has been handed back to them',
      'The originator who issued it, once the work is confirmed complete',
    ],
    correctAnswer: 3,
    explanation:
      'Cancellation is reserved to the originator, because only the person who defined the isolation and the precautions can confirm that they can now safely be undone. Letting the working party cancel breaks the loop, and equipment gets re-energised while another team is still inside the system.',
    difficulty: 'intermediate',
  },
  {
    id: 324,
    question:
      'What distinguishes a competent person from someone who is merely trained?',
    options: [
      'Competence is proven by holding a current ECS qualification card, and nothing else',
      'Competence adds knowledge, experience and risk awareness to training',
      'Competence is achieved by completing an approved training programme, start to finish',
      'Competence is conferred by an employer, who appoints you to the role in writing',
    ],
    correctAnswer: 1,
    explanation:
      'Training gives skills; competence is the combination of skills, knowledge, experience and awareness of the risks for that particular task. Equating competence with a card is the common error, and it explains why someone qualified for one type of system may still need close supervision on another.',
    difficulty: 'intermediate',
  },
  {
    id: 325,
    question:
      'Which of these tasks should not normally be carried out by a person working alone?',
    options: [
      'Second fixing accessories, on a circuit already isolated',
      'Working in a confined space or a trench, or near live equipment',
      'Testing protective conductor continuity, on a dead circuit',
      'Completing certification paperwork, in the site cabin',
    ],
    correctAnswer: 1,
    explanation:
      'Confined spaces, trenches, work at height, work near live sources and work near unguarded machinery are all situations where you should not be alone, because rescue depends on someone knowing you are in trouble. Isolated dead work is far lower risk and does not by itself demand a second person.',
    difficulty: 'basic',
  },
  {
    id: 326,
    question:
      'A shop owner insists you change a faulty socket without switching off, because the tills cannot go down. What is the correct response?',
    options: [
      'Work live carefully with insulated tools, keeping one hand free',
      'Ask the client to sign a disclaimer accepting the risk of the work',
      'Isolate the neutral only, so the tills keep running as you work',
      'Explain that isolation is required and agree a time to switch off',
    ],
    correctAnswer: 3,
    explanation:
      'Commercial inconvenience does not make it unreasonable to work dead, so the isolation stands and the answer is to plan the outage. A disclaimer is worthless here because criminal duties under health and safety law cannot be signed away by the person who commissioned the work.',
    difficulty: 'basic',
  },
  {
    id: 327,
    question:
      'You must work close to an adjacent live panel that genuinely cannot be isolated. Which control is most appropriate?',
    options: [
      'Screen off the live parts and maintain an adequate clearance from them',
      'Rely on rubber soled boots to insulate you from the floor while you work',
      'Work as quickly as possible so exposure to the live parts stays short',
      'Have a colleague stand by, ready to pull you clear if you touch a live part',
    ],
    correctAnswer: 0,
    explanation:
      'Physical barriers and defined clearances remove the possibility of contact, which is an engineering control rather than a behavioural one. A standby person is a genuine precaution in some live work, but on its own it only reacts after contact has already happened and the current is already flowing.',
    difficulty: 'intermediate',
  },
  {
    id: 328,
    question:
      'While working in a commercial unit you notice a fire exit blocked by stacked stock. What should you do?',
    options: [
      'Leave it alone, since fire safety in the unit is the occupier responsibility',
      'Note it in your diary, and raise it at the next site meeting',
      'Report it so it gets cleared, and clear it yourself if safe to do so',
      'Photograph it, so you cannot later be blamed for causing the blockage',
    ],
    correctAnswer: 2,
    explanation:
      'Everyone has a part to play in reporting unsafe conditions, and a blocked exit is a danger to people who are in the building right now. Deferring it to a meeting treats the hazard as an administrative item, when the whole point of the duty is that it is acted on while the danger still exists.',
    difficulty: 'basic',
  },
  {
    id: 329,
    question:
      'A labourer offers to swap over a luminaire for you to save time. What should you do?',
    options: [
      'Allow it, provided you have isolated and proved the circuit dead first',
      'Allow it while you watch over them, correcting any mistakes as they are made',
      'Allow it, since changing a luminaire is not classed as electrical work',
      'Decline, because untrained people must not work on electrical systems',
    ],
    correctAnswer: 3,
    explanation:
      'Unauthorised, unqualified or untrained people must not be allowed to work on electrical systems; supervision raises the level of oversight for someone in training, it does not create authorisation. Proving dead first is good practice but it does not turn a labourer into a person permitted to do the work.',
    difficulty: 'intermediate',
  },
  {
    id: 330,
    question:
      'When should an existing risk assessment for a recurring task be reviewed?',
    options: [
      'Only once an accident has occurred, and not before',
      'Whenever the work, the equipment or the people involved change',
      'Every three years, as a fixed interval set out in legislation',
      'At the end of the contract, when the final account is closed',
    ],
    correctAnswer: 1,
    explanation:
      'A risk assessment describes a specific set of circumstances, so it stops being valid as soon as those circumstances move. Waiting for an accident inverts the purpose of assessment entirely: the point is to find the failure before it happens rather than to document it afterwards.',
    difficulty: 'intermediate',
  },
  {
    id: 331,
    question:
      'A luminaire must be replaced three metres above floor level. What does the work at height hierarchy ask first?',
    options: [
      'Can the ladder be footed by a second operative, for the whole of the job',
      'Can a harness be worn, to arrest a fall from that position',
      'Can the work be avoided, so nobody has to go up there at all',
      'Can the work be done quickly, to limit the time spent up there',
    ],
    correctAnswer: 2,
    explanation:
      'The sequence is avoid, then prevent a fall, then minimise the distance and consequences of one. Reaching for the harness skips two whole stages: fall arrest accepts that the fall will happen and only limits the outcome, so it is the last thing considered, not the first.',
    difficulty: 'intermediate',
  },
  {
    id: 332,
    question:
      'On what basis is it acceptable to carry out a task from a ladder?',
    options: [
      'When you are certain no safer means of access is reasonably available',
      'When the task at that position will take less than thirty minutes to do',
      'When the operative using the ladder has been trained in its use',
      'When the ladder has been inspected and tagged within the last twelve months',
    ],
    correctAnswer: 0,
    explanation:
      'Ladders and stepladders should only be used where you are certain there is no safer means of access. The short-duration answer is the most seductive because it sounds like an accepted rule, yet many ladder accidents happen during work lasting under thirty minutes.',
    difficulty: 'intermediate',
  },
  {
    id: 333,
    question:
      'Which finding during a pre-use ladder check means the ladder must be taken out of service?',
    options: [
      'Cracked stiles, missing rungs, or rungs held only by nails',
      'Manufacturer labels that have faded, and become hard to read',
      'Rubber feet showing light scuffing, picked up from use on rough ground',
      'Paint marks along the stiles, left from a previous decorating job',
    ],
    correctAnswer: 0,
    explanation:
      'Cracks in rungs or stiles, missing or weakened rungs, and rungs relying on nails or spikes are all structural defects that can let go without warning under load. Faded labels and paint marks are cosmetic; the check is about whether the ladder will still carry you.',
    difficulty: 'intermediate',
  },
  {
    id: 334,
    question:
      'What formal examination regime applies to ladders and stepladders held by a contractor?',
    options: [
      'No formal examination is needed, provided it is checked before each use',
      'Weekly examination, carried out by whoever used the equipment last time',
      'Annual examination by a competent person, with the results recorded',
      'Replacement every two years, whatever the condition of the equipment is',
    ],
    correctAnswer: 2,
    explanation:
      'Ladders should be tested and examined annually by a competent person and the results recorded, commonly on a tag fixed to the item. Pre-use visual checks are also required but they do not replace the formal examination, because a user check will not catch progressive weakening.',
    difficulty: 'intermediate',
  },
  {
    id: 335,
    question:
      'Which statement about erecting and moving a mobile tower scaffold is correct?',
    options: [
      'Pack the wheels up on bricks to level the tower on a sloping surface',
      'Stand it on firm level ground with the wheels or feet properly supported',
      'Move it by pulling from the top platform so it stays under control',
      'Let any available operative erect it rather than delay the work further',
    ],
    correctAnswer: 1,
    explanation:
      'Towers need firm level ground with the wheels or feet supported, must be pushed or pulled only from the base, and must be erected by a competent person after checking for overhead lines. Bricks under the wheels are a familiar site fix and they concentrate the load until the tower topples.',
    difficulty: 'basic',
  },
  {
    id: 336,
    question:
      'A cable route requires a shallow trench across a yard. What does this mean for support and supervision?',
    options: [
      'A shallow trench needs no support, and may be worked unaccompanied',
      'Support is needed only where the trench is deeper than a person is tall, not before',
      'Support is needed only once heavy rain has softened the ground, not in dry weather',
      'Even a shallow trench may need support, and you must not work alone',
    ],
    correctAnswer: 3,
    explanation:
      'Even shallow trenches can be dangerous, supports may be needed for work that only involves bending or kneeling, and you should never work in a trench alone without supervision. Judging by depth alone ignores that a small collapse onto a kneeling person is enough to kill.',
    difficulty: 'intermediate',
  },
  {
    id: 337,
    question:
      'What is the first step when planning a manual handling operation?',
    options: [
      'Brief the whole team on correct lifting technique before starting work',
      'Split the load between two people so that each carries a lighter share',
      'Eliminate the handling by using a mechanical aid wherever possible',
      'Issue gloves and safety boots to everyone handling the material',
    ],
    correctAnswer: 2,
    explanation:
      'The order is to avoid the handling using mechanical aid, then provide adequate manpower if the load is still too great, then ensure proper handling procedure. Technique training is worth having, but a good technique applied to a load that should never have been lifted still injures people.',
    difficulty: 'intermediate',
  },
  {
    id: 338,
    question:
      'A heavy transformer must reach a first floor plant room and the lift is out of service. What is the best control?',
    options: [
      'Use a mechanical aid, or plan a team lift with enough people',
      'Ask the strongest member of the team, who can carry it up the stairs alone',
      'Carry it up in one go, to cut the time spent handling the load',
      'Wear a back support belt, and lift with the back kept straight',
    ],
    correctAnswer: 0,
    explanation:
      'With the lift unavailable you still work down the same hierarchy: find mechanical assistance first, and only then plan a properly resourced team lift. Back belts are the popular answer on site but they do not reduce the load on the spine and can encourage people to attempt more.',
    difficulty: 'intermediate',
  },
  {
    id: 339,
    question:
      'Chasing walls in an occupied building creates a large amount of dust. Which control should be considered first?',
    options: [
      'Issue disposable dust masks to everyone working in that room',
      'Open the windows and doors so the dust disperses outdoors',
      'Sweep up frequently so the dust cannot settle and build up',
      'Suppress or extract the dust at the point where it is created',
    ],
    correctAnswer: 3,
    explanation:
      'Capturing dust at source protects everyone in the area, including people not wearing anything, and it stops the dust entering the building. Masks are the instinctive choice but they are the last line, they protect only the wearer, and they fail quietly if the fit is poor.',
    difficulty: 'intermediate',
  },
  {
    id: 340,
    question:
      'How is the need for hearing protection on a noisy site properly established?',
    options: [
      'A supervisor judges by ear whether hearing protection is needed',
      'A competent person measures exposure before any zones are set up',
      'Protection is required only where a task lasts a full working shift',
      'Protection is required wherever any power tool is being operated',
    ],
    correctAnswer: 1,
    explanation:
      'Readings must be taken by a competent person over the pattern of work actually done, and the results then define a signed hearing protection zone. Judging by ear is unreliable because damaging exposure depends on both level and duration, and neither is something the ear can total up.',
    difficulty: 'intermediate',
  },
  {
    id: 341,
    question:
      'A fault has started a small fire in a cabinet containing computer equipment. Which extinguisher is appropriate?',
    options: [
      'Water, because it cools the equipment down most quickly',
      'Carbon dioxide, which leaves no residue on the equipment',
      'Foam, because it smothers the fire and seals the hot surface',
      'A fire blanket, draped across the front of the cabinet',
    ],
    correctAnswer: 1,
    explanation:
      'Carbon dioxide extinguishers are provided where electrical equipment such as computers or photocopiers is at risk, because the gas is non-conductive and leaves nothing behind. Water and foam both conduct, so using them puts the person holding the extinguisher in the circuit.',
    difficulty: 'intermediate',
  },
  {
    id: 342,
    question:
      'You discover a small fire in a plant room. What matters most before deciding to tackle it?',
    options: [
      'Find the largest extinguisher available anywhere on the site',
      'Open the doors and the windows to let the smoke escape outside',
      'Photograph the fire so the cause can be investigated later',
      'Raise the alarm and make sure you have a clear escape route',
    ],
    correctAnswer: 3,
    explanation:
      'Warning others and keeping a way out behind you come first, because a small fire can cut off an exit in seconds. Opening up the room feels helpful but it feeds the fire with air and spreads smoke into escape routes other people are relying on.',
    difficulty: 'basic',
  },
  {
    id: 343,
    question:
      'You find a colleague still in contact with a live conductor. What is your first action?',
    options: [
      'Check your own safety, then break the contact by switching the supply off',
      'Pull the casualty clear of the conductor at once, before doing anything else',
      'Begin chest compressions immediately, while the supply is still switched on',
      'Call an ambulance, and wait beside the casualty until the crew arrives on site',
    ],
    correctAnswer: 0,
    explanation:
      'Check that helping will not put you at risk, then break the contact, ideally by switching off or removing an undamaged plug. Grabbing the casualty is the instinctive response and it simply adds a second victim, because the current will pass through you as well.',
    difficulty: 'intermediate',
  },
  {
    id: 344,
    question:
      'A casualty has burns at the entry and exit points of an electric shock. How should the burns be treated?',
    options: [
      'Apply a greasy dressing to seal the burn from the air',
      'Burst any blisters, then cover the area with a bandage',
      'Flood the injury with cold water for at least ten minutes',
      'Rub the area gently to restore circulation in the skin',
    ],
    correctAnswer: 2,
    explanation:
      'Flooding with cold water for at least ten minutes halts the burning process and relieves pain. Creams and greasy dressings trap heat in the tissue and have to be cleaned off later, and bursting blisters removes the sterile covering that is protecting the wound.',
    difficulty: 'intermediate',
  },
  {
    id: 345,
    question:
      'Which part of a portable power tool is most likely to be damaged in service and should be checked before use?',
    options: [
      'The motor windings, which overheat during continuous use',
      'The chuck, which loosens each time the tool is switched on',
      'The casing vents, which block whenever the tool is put down',
      'The flexible cable, which lies in dirt and gets trodden on',
    ],
    correctAnswer: 3,
    explanation:
      'The cable is the weakest part: it sits in dirt and water and is easily damaged by being trodden or driven over, so check for cuts, abrasions, burns, bare wires and frayed ends. Winding failures do happen but they normally stop the tool rather than expose a live conductor.',
    difficulty: 'intermediate',
  },
  {
    id: 346,
    question:
      'Does a 110 volt drill fed from a site transformer need portable appliance inspection and testing?',
    options: [
      'No, because 110 volt site tools are inherently safe to work with',
      'Yes, tools at both 110 and 230 volts must be inspected and tested',
      'No, unless the tool belongs to the operative rather than to the firm',
      'Yes, but only where the site falls under the construction regulations',
    ],
    correctAnswer: 1,
    explanation:
      'Electrically powered tools at 110 volts and at 230 volts both require inspection and testing. Reduced low voltage lowers the severity of a shock, but it does not stop cables being cut, plugs cracking or earths going open circuit, which is what the inspection is looking for.',
    difficulty: 'intermediate',
  },
  {
    id: 347,
    question:
      'Records show a very low failure rate over several rounds of inspection of portable equipment. What does this suggest?',
    options: [
      'The equipment is nearing the end of its working life and should be replaced',
      'Intervals are fixed by the regulations and cannot be varied by the employer',
      'The interval between future inspections can reasonably be lengthened',
      'Intervals should be shortened whenever new equipment is bought for the firm',
    ],
    correctAnswer: 2,
    explanation:
      'The information gathered from early inspections is meant to be used to revise the intervals, with a low failure rate justifying a longer gap and a high one a shorter gap. The belief that intervals are fixed in law is widespread and it stops duty holders using their own evidence.',
    difficulty: 'advanced',
  },
  {
    id: 348,
    question:
      'A hired 230 volt grinder develops a fault with its internal switch. What is the correct approach?',
    options: [
      'Most repairs need specialist knowledge, so it goes back for repair',
      'Any competent electrician may open it up, and repair it on site',
      'Repair is unnecessary, because failed items are always scrapped',
      'Repair it on site, provided it is inspected and tested after',
    ],
    correctAnswer: 0,
    explanation:
      'The repair of most portable electrical equipment requires specialist knowledge and expertise, so faulty items are quarantined and returned rather than opened up on site. Testing afterwards does not rescue a bad repair, because a test proves the state of the item, not the quality of the work.',
    difficulty: 'intermediate',
  },
  {
    id: 349,
    question:
      'Which of these is the most common cause of major injuries in workplaces?',
    options: [
      'Slips, trips and falls on the level across all types of workplace',
      'Contact with live parts, arcing and burns during electrical installation work',
      'Manual handling of heavy loads, cable drums and switchgear on construction sites',
      'Falls from ladders, stepladders and hop-ups on short tasks',
    ],
    correctAnswer: 0,
    explanation:
      'Slips, trips and falls on the level are the most common cause of major injuries at work, which is why housekeeping and cable management are treated as safety controls rather than tidiness. Electrical contact causes severe harm but accounts for far fewer major injuries overall.',
    difficulty: 'intermediate',
  },
  {
    id: 350,
    question:
      'You isolated, locked off and proved a circuit dead in the morning, then returned to it after a lunch break. What should you do?',
    options: [
      'Start work, since your own lock stayed on the isolator throughout',
      'Check that the padlock and the warning notice are still in place',
      'Prove the circuit dead again before recommencing work on it',
      'Prove the voltage indicator on the proving unit, then start work',
    ],
    correctAnswer: 2,
    explanation:
      'Proving dead confirms the state of the circuit at that moment, so after any break in the work the full proving sequence is repeated, indicator proved on a known source before and after. Trusting the lock is the trap: a lock secures your isolator, not back-feeds, borrowed neutrals or a second supply.',
    difficulty: 'advanced',
  },
];

/** Questions in one difficulty band. */
export const getQuestionsByDifficulty = (
  difficulty: 'basic' | 'intermediate' | 'advanced'
): Question[] => module1Questions.filter((q) => q.difficulty === difficulty);

// Fisher-Yates, not `sort(() => 0.5 - Math.random())`. That idiom is not a
// uniform permutation — the comparator is inconsistent, so the result depends
// on the sort implementation and some positions are systematically favoured.
// Taking the first n of a band that way makes some questions quietly likelier
// to be examined than others.
const pick = <T,>(pool: T[], n: number): T[] => {
  const out = [...pool];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out.slice(0, Math.max(0, n));
};

/**
 * Draw a paper with a deliberate difficulty mix.
 *
 * This used to be a flat `sort(() => 0.5 - Math.random())` over the whole
 * bank, which is why the public paper passed 86% of candidates: with no
 * difficulty field and no weighting, a sitting was whatever 30 questions came
 * up, and the bank is ~30% one-line recall.
 *
 * ⚠️ BACKFILLS. The equivalent selector in other banks slices each band with
 * `Math.min(count, array.length)` and returns the short result, so a thin band
 * silently yields a paper with fewer questions than asked for — no error, no
 * warning. Here any shortfall is made up from the remaining questions, so the
 * caller always gets `count` items or the whole bank if it is smaller.
 */
export const getRandomQuestions = (
  count: number = 30,
  weights: { basic: number; intermediate: number; advanced: number } = {
    basic: 30,
    intermediate: 45,
    advanced: 25,
  }
): Question[] => {
  const basic = Math.round((count * weights.basic) / 100);
  const intermediate = Math.round((count * weights.intermediate) / 100);
  const selected = [
    ...pick(getQuestionsByDifficulty('basic'), basic),
    ...pick(getQuestionsByDifficulty('intermediate'), intermediate),
    ...pick(getQuestionsByDifficulty('advanced'), count - basic - intermediate),
  ];

  // Make up any shortfall from a thin band rather than returning a short paper.
  if (selected.length < count) {
    const chosen = new Set(selected.map((q) => q.id));
    selected.push(...pick(module1Questions.filter((q) => !chosen.has(q.id)), count - selected.length));
  }

  return pick(selected, selected.length);
};
