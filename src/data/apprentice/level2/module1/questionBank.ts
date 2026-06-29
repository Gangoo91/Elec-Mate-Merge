// Module 1: Health and Safety in Building Services Engineering - Question Bank
// 250 questions covering all Module 1 content for Level 2 Electrical Course

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export const module1Questions: Question[] = [
  // Section 1: Legislation and Duties (Questions 1-42)
  {
    id: 1,
    question: 'What is the main purpose of the Health and Safety at Work Act 1974?',
    options: [
      'To establish building regulations for electrical installations',
      'To ensure the health, safety and welfare of all employees at work',
      'To provide guidance on electrical installation methods',
      'To regulate the testing and certification of electrical equipment',
    ],
    correctAnswer: 1,
    explanation:
      'HASAWA 1974 is the primary legislation ensuring health, safety and welfare of all employees and others affected by work activities.',
  },
  {
    id: 2,
    question: 'Which regulation specifically covers electrical safety at work?',
    options: [
      'The Building Regulations 2010',
      'Construction (Design and Management) Regulations',
      'Electricity at Work Regulations 1989',
      'Manual Handling Operations Regulations',
    ],
    correctAnswer: 2,
    explanation:
      'The Electricity at Work Regulations 1989 specifically cover electrical safety requirements in the workplace.',
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
  },
  {
    id: 4,
    question: "What are employees' duties under HASAWA?",
    options: [
      'To take reasonable care of themselves and others, and cooperate with employers',
      'To provide PPE free of charge to other workers on site',
      'To carry out all workplace risk assessments personally',
      'To enforce health and safety law and issue improvement notices',
    ],
    correctAnswer: 0,
    explanation:
      "Employees must take reasonable care of their own and others' health and safety, and cooperate with their employer.",
  },
  {
    id: 5,
    question: 'Which organisation enforces health and safety law in Great Britain?',
    options: [
      'The Health and Safety Commission for Europe',
      'Health and Safety Executive (HSE)',
      'The Construction Industry Training Board',
      'The British Standards Institution',
    ],
    correctAnswer: 1,
    explanation:
      'The Health and Safety Executive (HSE) is the primary enforcer of health and safety law in Great Britain.',
  },
  {
    id: 6,
    question: 'What is the maximum penalty for a serious breach of health and safety law in the Crown Court?',
    options: [
      'A fixed penalty notice of £5,000',
      'A formal written warning from the HSE',
      'Unlimited fine and/or imprisonment',
      'A maximum fine of £20,000 only',
    ],
    correctAnswer: 2,
    explanation:
      'Serious breaches of health and safety law tried in the Crown Court can result in unlimited fines and/or imprisonment.',
  },
  {
    id: 7,
    question: 'What does CDM stand for?',
    options: [
      'Civil Design Manual',
      'Construction Development Manual',
      'Construction Delivery Method',
      'Construction (Design and Management) Regulations',
    ],
    correctAnswer: 3,
    explanation:
      'CDM stands for the Construction (Design and Management) Regulations which apply to construction projects.',
  },
  {
    id: 8,
    question: 'When do CDM Regulations apply?',
    options: [
      'All construction projects',
      'Only to large construction projects',
      'Only commercial projects',
      'Only domestic projects',
    ],
    correctAnswer: 0,
    explanation:
      'CDM Regulations apply to all construction projects, with different duties depending on project size and type.',
  },
  {
    id: 9,
    question: 'What is the role of the Principal Designer under CDM?',
    options: [
      'To prepare the construction phase plan on behalf of the client',
      'To plan, manage and coordinate health and safety during the pre-construction phase',
      'To carry out the physical construction work on site',
      'To enforce the regulations and prosecute breaches',
    ],
    correctAnswer: 1,
    explanation:
      'The Principal Designer plans, manages and coordinates health and safety during the pre-construction phase.',
  },
  {
    id: 10,
    question:
      'What is the threshold for a construction project to require notification to HSE under CDM?',
    options: [
      'Any project using voltages up to 1000V AC',
      'Any project costing more than £100,000',
      'More than 30 days with 20+ workers, or more than 500 person days',
      'Any project involving more than two contractors',
    ],
    correctAnswer: 2,
    explanation:
      'Projects lasting more than 30 working days with over 20 workers at any one time, or exceeding 500 person days, must be notified to HSE.',
  },
  {
    id: 11,
    question: 'What are the duties of a Principal Contractor under CDM?',
    options: [
      'To appoint the designers and architects for the project',
      'To produce the pre-construction information for the client',
      'To prepare the health and safety file at the design stage',
      'Plan, manage and coordinate health and safety during the construction phase',
    ],
    correctAnswer: 3,
    explanation:
      'The Principal Contractor plans, manages and coordinates health and safety during the construction phase.',
  },
  {
    id: 12,
    question: 'What must be in place before construction work starts on a notifiable project?',
    options: [
      'A construction phase plan',
      'A completed health and safety file',
      'An HSE prohibition notice',
      'A full electrical installation certificate',
    ],
    correctAnswer: 0,
    explanation:
      'A construction phase plan must be prepared and implemented before work begins on notifiable projects.',
  },
  {
    id: 13,
    question: 'What information must be provided in the health and safety file?',
    options: [
      'A daily record of all toolbox talks delivered on site',
      'Information about the structure needed for future construction work, maintenance, and demolition',
      'The personal medical records of all site operatives',
      'A schedule of the contractor’s commercial pricing',
    ],
    correctAnswer: 1,
    explanation:
      'The health and safety file contains information needed for future construction work, maintenance, and demolition.',
  },
  {
    id: 14,
    question: 'Under EAWR, what must electrical systems be?',
    options: [
      'Inspected and certified by the HSE annually',
      'Insured against accidental damage and fire',
      'Constructed, maintained and used to prevent danger',
      'Marked with the CE conformity symbol',
    ],
    correctAnswer: 2,
    explanation:
      'EAWR requires electrical systems to be constructed, maintained and used so far as reasonably practicable to prevent danger.',
  },
  {
    id: 15,
    question: "What does 'competent person' mean under EAWR?",
    options: [
      'Anyone who holds a current first aid certificate',
      'Any employee aged over 18 years',
      'The site manager regardless of technical knowledge',
      'Person with sufficient training, experience and knowledge to prevent danger',
    ],
    correctAnswer: 3,
    explanation:
      'A competent person has sufficient training, experience and knowledge to prevent danger when working with electricity.',
  },
  {
    id: 16,
    question: 'What must normally be done before work on electrical equipment?',
    options: [
      'Switch off and prove dead',
      'Increase the supply voltage for testing',
      'Notify the HSE of the planned work',
      'Remove all earth connections from the circuit',
    ],
    correctAnswer: 0,
    explanation:
      'Equipment must be switched off and proved dead, or other precautions taken to prevent danger.',
  },
  {
    id: 17,
    question: 'What is the purpose of RIDDOR?',
    options: [
      'To assess the suitability of PPE for specific hazards',
      'Reporting of Injuries, Diseases and Dangerous Occurrences Regulations',
      'To set the procedure for emergency evacuation of buildings',
      'To register competent persons working on electrical systems',
    ],
    correctAnswer: 1,
    explanation:
      'RIDDOR requires the reporting of serious workplace accidents, occupational diseases and dangerous occurrences.',
  },
  {
    id: 18,
    question: 'Which events must be reported under RIDDOR?',
    options: [
      'Only accidents that result in a fatality',
      'Any incident requiring basic first aid treatment',
      'Deaths, specified injuries, over-7-day injuries, diseases, dangerous occurrences',
      'Only incidents involving members of the public',
    ],
    correctAnswer: 2,
    explanation:
      'RIDDOR requires reporting of deaths, specified injuries, over-7-day injuries, occupational diseases and dangerous occurrences.',
  },
  {
    id: 19,
    question: 'How must deaths and specified injuries be reported under RIDDOR?',
    options: [
      'By letter posted within 28 days',
      'By annual return at the end of the financial year',
      'In the site accident book only',
      'Without delay (e.g. by telephone) and a written report within 10 days',
    ],
    correctAnswer: 3,
    explanation:
      'Deaths and specified injuries must be reported without delay (e.g. by telephone) and followed up with a written report within 10 days.',
  },
  {
    id: 20,
    question: "What is a 'specified injury' under RIDDOR?",
    options: [
      'Serious injuries including fractures, amputations, serious burns',
      'Any minor cut or bruise requiring a plaster',
      'A diagnosed case of work-related stress',
      'A near miss with no actual injury caused',
    ],
    correctAnswer: 0,
    explanation:
      'Specified injuries include fractures, amputations, serious eye injuries, serious burns, and other major injuries.',
  },
  {
    id: 21,
    question: 'What is the role of safety representatives?',
    options: [
      'To draft the company’s commercial contracts',
      'To represent employees in consultations with employers on health and safety matters',
      'To issue prohibition notices to contractors',
      'To carry out statutory electrical inspections',
    ],
    correctAnswer: 1,
    explanation:
      'Safety representatives represent employees in consultations with employers on health and safety matters.',
  },
  {
    id: 22,
    question: 'What functions do safety representatives have?',
    options: [
      'Prosecute employers and issue unlimited fines',
      'Set the wage rates for site operatives',
      'Investigate accidents, inspect the workplace, receive information, be consulted',
      'Design the temporary electrical supply for the site',
    ],
    correctAnswer: 2,
    explanation:
      'Safety representatives can investigate accidents, inspect workplaces, receive information and be consulted on safety matters.',
  },
  {
    id: 23,
    question: 'What is an improvement notice?',
    options: [
      'A voluntary suggestion that may be ignored by the employer',
      'A notice issued only after a fatal accident',
      'An internal company memo on best practice',
      'A legal notice requiring improvement to health and safety within a specified time',
    ],
    correctAnswer: 3,
    explanation:
      'An improvement notice is a legal notice from HSE requiring specific improvements within a set time period.',
  },
  {
    id: 24,
    question: 'What is a prohibition notice?',
    options: [
      'A legal notice requiring immediate cessation of activities that pose imminent danger',
      'A notice allowing work to continue under supervision',
      'A reminder to update the site risk assessment',
      'A warning that PPE stocks are running low',
    ],
    correctAnswer: 0,
    explanation:
      'A prohibition notice requires immediate cessation of activities that pose a risk of serious personal injury.',
  },
  {
    id: 25,
    question: 'Can improvement and prohibition notices be appealed?',
    options: [
      'No, they are final',
      'Yes, to an employment tribunal',
      'Only improvement notices',
      'Only prohibition notices',
    ],
    correctAnswer: 1,
    explanation:
      'Both improvement and prohibition notices can be appealed to an employment tribunal.',
  },
  {
    id: 26,
    question: 'What is the purpose of a health and safety policy?',
    options: [
      'To record the working hours of each employee',
      'To list the prices charged for each service',
      "To demonstrate the employer's commitment to health and safety and provide a framework for action",
      'To replace the need for risk assessments',
    ],
    correctAnswer: 2,
    explanation:
      "A health and safety policy demonstrates the employer's commitment and provides a framework for managing health and safety.",
  },
  {
    id: 27,
    question: 'When must an employer have a written health and safety policy?',
    options: [
      'Only when working on construction sites',
      'Only if they employ apprentices',
      'Only if they hold a public liability policy',
      'If they employ 5 or more people',
    ],
    correctAnswer: 3,
    explanation: 'Employers with 5 or more employees must have a written health and safety policy.',
  },
  {
    id: 28,
    question: 'What are the three main parts of a health and safety policy?',
    options: [
      'Statement of intent, organisation, and arrangements',
      'Rules, regulations, and procedures',
      'Accidents, incidents, and near misses',
      'Training, equipment, and supervision',
    ],
    correctAnswer: 0,
    explanation:
      'A health and safety policy consists of a statement of intent, organisation section, and arrangements section.',
  },
  {
    id: 29,
    question: "What does 'so far as is reasonably practicable' mean?",
    options: [
      'Risk must be removed completely at any cost',
      'Balance the risk against the cost and effort of reducing it',
      'Only act once an accident has already happened',
      'Follow whichever measure is cheapest to install',
    ],
    correctAnswer: 1,
    explanation:
      'It means balancing the risk against the cost, time and effort needed to reduce or eliminate it.',
  },
  {
    id: 30,
    question: 'What is the purpose of an Approved Code of Practice (ACOP)?',
    options: [
      'To set the maximum penalties for breaches of the law',
      'To register companies that comply with the law',
      'To give practical guidance on complying with legal duties',
      'To replace the relevant regulations entirely',
    ],
    correctAnswer: 2,
    explanation:
      'ACOPs provide practical guidance on how to comply with legal duties and have special status in legal proceedings.',
  },
  {
    id: 31,
    question: 'What is corporate manslaughter?',
    options: [
      'A breach that results only in a written warning',
      'A civil claim brought by an injured employee',
      'A minor offence dealt with by fixed penalty',
      "A serious criminal offence where an organisation's management failure causes death",
    ],
    correctAnswer: 3,
    explanation:
      "Corporate manslaughter is a serious criminal offence where an organisation's management failures cause death.",
  },
  {
    id: 32,
    question: 'What are the penalties for corporate manslaughter?',
    options: [
      'Unlimited fine, remedial orders, publicity orders',
      'A fixed fine of £5,000 per offence',
      'A formal caution recorded by the HSE',
      'Suspension of the company for 12 months',
    ],
    correctAnswer: 0,
    explanation:
      'Penalties include unlimited fines, remedial orders to address failures, and publicity orders.',
  },
  {
    id: 33,
    question: 'What must employers consult employees about?',
    options: [
      'The company’s annual financial accounts and profit forecasts',
      'Health and safety measures, risks, preventive measures, competent persons',
      'The choice of company vehicles and the staff parking arrangements',
      'The colour scheme and interior decoration of the workplace',
    ],
    correctAnswer: 1,
    explanation:
      'Employers must consult on health and safety measures, risks, preventive measures, and appointment of competent persons.',
  },
  {
    id: 34,
    question: 'What information must employers provide to employees?',
    options: [
      'A list of approved local suppliers and their delivery lead times',
      'The employer’s profit margins and pricing structure on each job',
      'Health and safety information, risks, preventive measures, emergency procedures',
      'A copy of every other employee’s contract and salary details',
    ],
    correctAnswer: 2,
    explanation:
      'Employers must provide information on health and safety, risks, preventive measures, and emergency procedures.',
  },
  {
    id: 35,
    question: 'What is vicarious liability?',
    options: [
      'Liability that passes to the injured employee',
      'Liability for damage caused by third-party visitors',
      'Liability only for self-employed contractors',
      'Employer liability for acts of employees in the course of employment',
    ],
    correctAnswer: 3,
    explanation:
      'Vicarious liability means employers can be held liable for health and safety failures by their employees in the course of employment.',
  },
  {
    id: 36,
    question: 'What are the main enforcement powers of HSE inspectors?',
    options: [
      'Enter premises, examine, investigate, issue notices, prosecute',
      'Set company insurance premiums',
      'Approve building plans before construction',
      'Appoint the principal contractor for a project',
    ],
    correctAnswer: 0,
    explanation:
      'HSE inspectors can enter premises, examine and investigate, issue improvement/prohibition notices, and prosecute.',
  },
  {
    id: 37,
    question: 'What is the difference between regulations and guidance?',
    options: [
      'Both are advisory and need not be followed',
      'Regulations are legally binding, guidance is advisory',
      'Guidance is legally binding, regulations are advisory',
      'There is no difference between the two',
    ],
    correctAnswer: 1,
    explanation:
      'Regulations have legal force and must be followed, while guidance is advisory best practice.',
  },
  {
    id: 38,
    question: 'What is the purpose of health surveillance?',
    options: [
      'To monitor employees’ social media activity',
      'To record the hours each employee works',
      'To detect health effects early and take preventive action',
      'To screen job applicants before recruitment',
    ],
    correctAnswer: 2,
    explanation:
      'Health surveillance detects adverse health effects at an early stage so preventive action can be taken.',
  },
  {
    id: 39,
    question: 'When might health surveillance be required?',
    options: [
      'For every employee regardless of their role',
      'Only after an accident has occurred',
      'Only for employees who request it',
      "When there's exposure to specific hazards like noise, vibration, asbestos",
    ],
    correctAnswer: 3,
    explanation:
      'Health surveillance is required for exposure to specified hazards that can cause identifiable health effects.',
  },
  {
    id: 40,
    question: 'What is the role of occupational health?',
    options: [
      'To prevent work-related illness and promote health and wellbeing',
      'To carry out electrical inspection and testing',
      'To enforce health and safety legislation on site',
      'To manage the company’s payroll and pensions',
    ],
    correctAnswer: 0,
    explanation:
      'Occupational health prevents work-related illness and injury and promotes worker health and wellbeing.',
  },
  {
    id: 41,
    question: 'What are absolute duties in health and safety law?',
    options: [
      'Duties that apply only to large employers',
      'Duties that must be complied with regardless of cost or practicability',
      'Duties that are entirely voluntary',
      'Duties that apply only on construction sites',
    ],
    correctAnswer: 1,
    explanation:
      "Absolute duties must be complied with regardless of cost - there are no qualifying words like 'reasonably practicable'.",
  },
  {
    id: 42,
    question: 'What is the significance of British Standards in health and safety?',
    options: [
      'They are legally binding regulations in their own right',
      'They apply only to imported products',
      'They provide recognised standards that can be used as evidence of good practice',
      'They replace the need to carry out risk assessments',
    ],
    correctAnswer: 2,
    explanation:
      'British Standards provide recognised standards of good practice that can be used as evidence in legal proceedings.',
  },

  // Section 2: Electric Shock and Burns (Questions 43-84)
  {
    id: 43,
    question: 'What is the most dangerous current path through the human body?',
    options: [
      'Foot to foot along the ground',
      'Finger to thumb on the same hand',
      'Hand to elbow on the same arm',
      'Hand to hand across the chest',
    ],
    correctAnswer: 3,
    explanation:
      'Hand to hand across the chest is most dangerous as current passes through the heart, potentially causing cardiac arrest.',
  },
  {
    id: 44,
    question: 'At what current level can electric shock become potentially fatal?',
    options: [
      '50 milliamps',
      '500 milliamps',
      '1 amp',
      '5 amps',
    ],
    correctAnswer: 0,
    explanation:
      'Currents as low as 50mA can cause ventricular fibrillation and be potentially fatal.',
  },
  {
    id: 45,
    question: 'What determines the severity of electric shock?',
    options: [
      'The colour of the cable insulation',
      'Current, duration, path through body, frequency',
      'The manufacturer of the equipment',
      'The time of day the contact occurs',
    ],
    correctAnswer: 1,
    explanation:
      'Shock severity depends on current magnitude, duration of contact, path through the body, and frequency.',
  },
  {
    id: 46,
    question: "What voltage is the upper limit for 'low voltage' (AC) in the UK?",
    options: [
      'Up to 50V AC',
      'Up to 230V AC',
      'Up to 1000V AC',
      'Up to 11,000V AC',
    ],
    correctAnswer: 2,
    explanation:
      'Low voltage is defined as not exceeding 1000V AC between conductors (or 600V AC to earth).',
  },
  {
    id: 47,
    question: 'What is the typical voltage of a domestic electrical supply in the UK?',
    options: [
      '110V',
      '240V',
      '415V',
      '230V',
    ],
    correctAnswer: 3,
    explanation: 'The standard domestic supply voltage in the UK is 230V single phase.',
  },
  {
    id: 48,
    question: 'What immediate action should you take if someone receives an electric shock?',
    options: [
      'Switch off the power supply or remove the casualty using non-conductive material',
      'Immediately grab the casualty and pull them clear',
      'Pour water over the casualty to cool them',
      'Wait for the current to stop on its own',
    ],
    correctAnswer: 0,
    explanation:
      'First switch off the power or use non-conductive material to break contact - never touch someone still in contact with electricity.',
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
  },
  {
    id: 50,
    question: 'At what current level do you typically lose muscular control (let-go threshold)?',
    options: [
      '5-10mA',
      '20-30mA',
      '10-20mA',
      '30-50mA',
    ],
    correctAnswer: 2,
    explanation: 'At around 10-20mA, muscular control is lost and you cannot let go of the conductor.',
  },
  {
    id: 51,
    question: 'What happens at current levels of 50-100mA?',
    options: [
      'Only a faint tingling is felt',
      'No effect on the body at all',
      'The current is automatically blocked by the skin',
      'Ventricular fibrillation - potentially fatal',
    ],
    correctAnswer: 3,
    explanation:
      '50-100mA can cause ventricular fibrillation of the heart, which is potentially fatal.',
  },
  {
    id: 52,
    question: 'Why is AC more dangerous than DC at the same voltage?',
    options: [
      'AC causes muscular spasm and affects the heart rhythm',
      'AC produces less heat at the point of contact',
      'AC cannot pass through the human body',
      'AC always operates at a lower current than DC',
    ],
    correctAnswer: 0,
    explanation:
      'AC at 50Hz is particularly dangerous as it can cause muscular spasm and interfere with heart rhythm.',
  },
  {
    id: 53,
    question: 'What factors affect body resistance to electric current?',
    options: [
      'The brand of tools being used',
      'Skin condition (wet/dry), contact area, voltage, frequency',
      'The ambient noise level',
      'The time elapsed since the last meal',
    ],
    correctAnswer: 1,
    explanation:
      'Body resistance varies with skin condition, contact area, applied voltage, current frequency and individual factors.',
  },
  {
    id: 54,
    question: 'How does wet skin affect electrical resistance?',
    options: [
      'It has no effect on resistance',
      'It greatly increases resistance',
      'Dramatically reduces resistance',
      'It converts the current to DC',
    ],
    correctAnswer: 2,
    explanation:
      'Wet skin dramatically reduces electrical resistance, making electric shock more likely and severe.',
  },
  {
    id: 55,
    question: 'What is the typical resistance of dry skin?',
    options: [
      '100-1000 ohms',
      '1 million ohms',
      '1-10 ohms',
      '1000-100,000 ohms',
    ],
    correctAnswer: 3,
    explanation:
      'Dry skin typically has resistance of 1000-100,000 ohms, but this drops dramatically when wet.',
  },
  {
    id: 56,
    question: 'What type of burn is typically caused by electric current passing through the body?',
    options: [
      'Deep internal burns along the current path',
      'Superficial sunburn-type reddening only',
      'Cold burns caused by rapid cooling',
      'Chemical burns from cable insulation',
    ],
    correctAnswer: 0,
    explanation:
      'Electric current causes deep internal burns along the current path through tissues and organs.',
  },
  {
    id: 57,
    question: 'What is an arc burn?',
    options: [
      'A burn caused by contact with hot pipework',
      'Burn caused by an electric arc/flash producing intense heat',
      'A friction burn from rope or cable',
      'A burn caused by exposure to sunlight',
    ],
    correctAnswer: 1,
    explanation:
      'Arc burns are caused by electric arcs/flashes that can reach temperatures of up to 20,000°C causing severe burns.',
  },
  {
    id: 58,
    question: 'What temperature can an electric arc reach?',
    options: [
      '100°C',
      '500°C',
      '20,000°C',
      '1,000°C',
    ],
    correctAnswer: 2,
    explanation:
      'Electric arcs can reach temperatures of approximately 20,000°C - hotter than the surface of the sun.',
  },
  {
    id: 59,
    question: 'What are the main types of electrical burns?',
    options: [
      'First, second and third degree only',
      'Friction, cold and chemical burns',
      'Sunburn, windburn and scalds',
      'Contact burns, arc burns, and flash burns',
    ],
    correctAnswer: 3,
    explanation:
      'The main types are contact burns (from touching live parts), arc burns, and flash burns from electrical explosions.',
  },
  {
    id: 60,
    question: 'How should electrical burns be treated?',
    options: [
      'Cool with water for 20+ minutes, cover with sterile dressing, seek medical help',
      'Apply butter or grease to the burn',
      'Burst any blisters and leave uncovered',
      'Rub the burn vigorously to restore circulation',
    ],
    correctAnswer: 0,
    explanation:
      'Cool burns with water for at least 20 minutes, cover with sterile dressing, and seek medical attention.',
  },
  {
    id: 61,
    question: 'What makes electrical burns particularly dangerous?',
    options: [
      'They always heal without medical attention',
      'Internal damage may be extensive despite limited external signs',
      'They only affect the surface of the skin',
      'They cannot be treated by first aiders',
    ],
    correctAnswer: 1,
    explanation:
      "Electrical burns can cause extensive internal damage to organs and tissues that isn't visible externally.",
  },
  {
    id: 62,
    question: 'What immediate first aid should be given for a serious electric shock?',
    options: [
      'Give the casualty food and drink immediately',
      'Move the casualty to a warmer area first',
      'Check for breathing/circulation, give CPR if needed, treat for shock',
      'Encourage the casualty to walk it off',
    ],
    correctAnswer: 2,
    explanation:
      'Check breathing and circulation, give CPR if required, treat for shock and get immediate medical help.',
  },
  {
    id: 63,
    question: 'Why should you never use water on live electrical equipment during a fire?',
    options: [
      'Water makes the equipment harder to clean',
      'Water damages the building structure',
      'Water spreads the smoke more quickly',
      'Water conducts electricity and can cause electrocution',
    ],
    correctAnswer: 3,
    explanation:
      'Water conducts electricity and using it on live electrical equipment can cause electrocution.',
  },
  {
    id: 64,
    question: 'What type of fire extinguisher should be used on electrical fires?',
    options: [
      'CO2 or dry powder',
      'Foam',
      'Water',
      'Wet chemical',
    ],
    correctAnswer: 0,
    explanation:
      "CO2 or dry powder extinguishers should be used on electrical fires as they don't conduct electricity.",
  },
  {
    id: 65,
    question: 'What is step potential?',
    options: [
      'The voltage applied to a step-up transformer',
      'Voltage difference between the feet when walking near earthed equipment with a fault',
      'The minimum voltage needed to climb a ladder',
      'The voltage measured across a single step of stairs',
    ],
    correctAnswer: 1,
    explanation:
      'Step potential is the voltage difference between the feet when walking on ground near earthed electrical equipment carrying a fault current.',
  },
  {
    id: 66,
    question: 'What is touch potential?',
    options: [
      'The pressure needed to operate a switch',
      'The voltage of a touchscreen control panel',
      'Voltage between the hand and feet when touching faulty equipment',
      'The minimum voltage a person can feel',
    ],
    correctAnswer: 2,
    explanation:
      'Touch potential is the voltage difference between hand and feet when touching electrical equipment that has become live.',
  },
  {
    id: 67,
    question: 'What is the main protection against direct contact with live conductors?',
    options: [
      'Warning signs only',
      'Good lighting',
      'Training only',
      'Insulation of live parts',
    ],
    correctAnswer: 3,
    explanation:
      'Insulation of live parts provides the primary protection against direct contact with electrical conductors.',
  },
  {
    id: 68,
    question: 'What is indirect contact?',
    options: [
      'Touching exposed metalwork that has become live due to a fault',
      'Touching a live conductor with a gloved hand',
      'Working near overhead power lines',
      'Touching a switched-off appliance',
    ],
    correctAnswer: 0,
    explanation:
      'Indirect contact is touching exposed metalwork that has become live due to an insulation fault.',
  },
  {
    id: 69,
    question: 'What protects against indirect contact?',
    options: [
      'High-visibility clothing',
      'Earthing and automatic disconnection of supply',
      'Warning labels on the equipment',
      'Wearing a hard hat',
    ],
    correctAnswer: 1,
    explanation:
      'Earthing and automatic disconnection of supply protects against indirect contact by quickly disconnecting faulty circuits.',
  },
  {
    id: 70,
    question: 'What is an RCD?',
    options: [
      'A device that increases the supply voltage',
      'A meter for measuring insulation resistance',
      'Residual Current Device - detects earth leakage currents',
      'A type of circuit breaker for overload only',
    ],
    correctAnswer: 2,
    explanation:
      'An RCD (Residual Current Device) detects earth leakage currents and quickly disconnects the supply.',
  },
  {
    id: 71,
    question: 'How quickly should a 30mA RCD operate when carrying its rated residual current?',
    options: [
      'Within 5 seconds',
      'Within 2 seconds',
      'Within 1 second',
      'Within 300 milliseconds',
    ],
    correctAnswer: 3,
    explanation:
      'A 30mA RCD must operate within 300ms at rated residual current and within 40ms at five times the rated current.',
  },
  {
    id: 72,
    question: 'At what current should an RCD providing additional protection trip?',
    options: [
      '30mA',
      '100mA',
      '300mA',
      '1A',
    ],
    correctAnswer: 0,
    explanation:
      'RCDs used for additional protection against electric shock trip at 30mA, which is below the dangerous level.',
  },
  {
    id: 73,
    question: 'Why are safe isolation procedures important?',
    options: [
      'They reduce the cost of materials',
      'To prevent electric shock during maintenance work',
      'They improve the appearance of the installation',
      'They speed up the supply company billing',
    ],
    correctAnswer: 1,
    explanation:
      'Proper isolation prevents electric shock and ensures safety during maintenance and repair work.',
  },
  {
    id: 74,
    question: 'What is the safe isolation procedure?',
    options: [
      'Test, isolate, switch off, prove dead, lock off',
      'Lock off, prove dead, test, switch off, isolate',
      'Switch off, isolate, lock off, test, prove dead',
      'Switch off, test, prove dead, isolate, lock off',
    ],
    correctAnswer: 2,
    explanation:
      'Safe isolation requires switching off, isolating, locking off, testing the voltage indicator, then proving dead.',
  },
  {
    id: 75,
    question: 'What should you do before starting work on electrical equipment?',
    options: [
      'Increase the supply voltage to test it',
      'Remove the main earth connection',
      'Notify the supply company in writing',
      'Prove the equipment is dead using an approved voltage tester',
    ],
    correctAnswer: 3,
    explanation:
      'Always prove equipment is dead using a properly functioning approved voltage tester before starting work.',
  },
  {
    id: 76,
    question: 'What is the purpose of proving the voltage tester?',
    options: [
      'To ensure the tester is working before and after testing',
      'To increase the sensitivity of the tester',
      'To calibrate the tester to the supply voltage',
      'To discharge any stored energy in the tester',
    ],
    correctAnswer: 0,
    explanation:
      "Proving the tester on a known live source before and after testing ensures it's working properly (the GS38 prove-test-prove method).",
  },
  {
    id: 77,
    question: 'What happens during ventricular fibrillation?',
    options: [
      'The heart beats slowly but regularly',
      'Heart muscle fibres contract randomly, stopping effective pumping',
      'The heart stops completely and silently',
      'Blood pressure rises sharply but circulation continues',
    ],
    correctAnswer: 1,
    explanation:
      'Ventricular fibrillation causes heart muscle fibres to contract randomly, stopping effective blood circulation.',
  },
  {
    id: 78,
    question: 'What is the treatment for ventricular fibrillation?',
    options: [
      'CPR only',
      'Mouth to mouth',
      'Defibrillation and CPR',
      'Wait for it to stop',
    ],
    correctAnswer: 2,
    explanation:
      'Ventricular fibrillation requires immediate defibrillation and CPR to restart normal heart rhythm.',
  },
  {
    id: 79,
    question: 'Why is 50Hz AC particularly dangerous?',
    options: [
      'It produces a much higher voltage than DC',
      'It generates dangerous levels of radiation',
      'It cannot be detected by RCDs',
      'It interferes with the natural electrical signals controlling the heart',
    ],
    correctAnswer: 3,
    explanation:
      "50Hz AC is particularly dangerous as it can interfere with the heart's natural electrical rhythm.",
  },
  {
    id: 80,
    question: 'What protective equipment helps prevent electric shock?',
    options: [
      'Insulated tools, gloves, mats, footwear',
      'High-visibility vests and hard hats',
      'Hearing protection and dust masks',
      'Knee pads and back supports',
    ],
    correctAnswer: 0,
    explanation:
      'Insulated tools, rubber gloves, insulating mats and footwear provide protection against electric shock.',
  },
  {
    id: 81,
    question: "What is the upper limit for 'extra-low voltage' (AC)?",
    options: [
      'Up to 12V AC',
      'Up to 50V AC',
      'Up to 25V AC',
      'Up to 110V AC',
    ],
    correctAnswer: 1,
    explanation:
      'Extra-low voltage (ELV) is not more than 50V AC (or 120V DC) between conductors or to earth.',
  },
  {
    id: 82,
    question: 'What is SELV?',
    options: [
      'A high-voltage switching device',
      'A type of residual current device',
      'Safety Extra-Low Voltage - separated from earth',
      'A standard for cable insulation',
    ],
    correctAnswer: 2,
    explanation:
      'SELV (Safety Extra-Low Voltage) is extra-low voltage separated from earth and from other circuits.',
  },
  {
    id: 83,
    question: 'What precautions should be taken when working in wet or damp conditions?',
    options: [
      'Increase the supply voltage to compensate',
      'Remove RCD protection to avoid nuisance tripping',
      'Work only with bare hands for better grip',
      'Use reduced voltage supplies (110V or lower) and RCD protection',
    ],
    correctAnswer: 3,
    explanation:
      'In wet conditions use reduced voltage supplies (110V centre-tapped or battery tools) and RCD protection.',
  },
  {
    id: 84,
    question: 'What makes someone more susceptible to electric shock?',
    options: [
      'Wet skin, medical conditions, fatigue, larger contact area',
      'Wearing high-visibility clothing',
      'Working during daylight hours',
      'Holding a current first aid certificate',
    ],
    correctAnswer: 0,
    explanation:
      'Wet skin, certain medical conditions, fatigue, larger contact area and individual physiology affect susceptibility.',
  },

  // Section 3: Risk Assessment & Method Statements (Questions 85-126)
  {
    id: 85,
    question: 'What is the main purpose of a risk assessment?',
    options: [
      'To record the cost of materials used',
      'To identify hazards and evaluate risks to implement appropriate controls',
      'To allocate work to individual operatives',
      'To certify the completed installation',
    ],
    correctAnswer: 1,
    explanation:
      'Risk assessment identifies hazards, evaluates risks and determines appropriate control measures to prevent harm.',
  },
  {
    id: 86,
    question: 'What are the five steps of risk assessment?',
    options: [
      'Plan, do, check, act, repeat',
      'Inspect, test, record, certify, review',
      'Identify hazards, decide who might be harmed, evaluate risks, record findings, review',
      'Eliminate, substitute, isolate, control, protect',
    ],
    correctAnswer: 2,
    explanation:
      'The five steps are: identify hazards, decide who might be harmed, evaluate risks, record findings, and review regularly.',
  },
  {
    id: 87,
    question: 'What is a hazard?',
    options: [
      'The likelihood that harm will occur',
      'A control measure that reduces harm',
      'A record of an accident that has happened',
      'Something with potential to cause harm',
    ],
    correctAnswer: 3,
    explanation:
      'A hazard is anything with the potential to cause harm, such as chemicals, electricity, or working at height.',
  },
  {
    id: 88,
    question: 'What is risk?',
    options: [
      'The likelihood that a hazard will cause harm and the severity of that harm',
      'Anything with the potential to cause harm',
      'A legal duty placed on the employer',
      'A control measure applied to reduce harm',
    ],
    correctAnswer: 0,
    explanation:
      'Risk is the likelihood that a hazard will cause harm, combined with the severity of potential harm.',
  },
  {
    id: 89,
    question: 'What is the hierarchy of control measures?',
    options: [
      'PPE, training, procedures, engineering, elimination',
      'Elimination, substitution, engineering controls, administrative controls, PPE',
      'Planning, implementing, monitoring, reviewing',
      'Identification, evaluation, control, monitoring',
    ],
    correctAnswer: 1,
    explanation:
      'The hierarchy is: elimination, substitution, engineering controls, administrative controls, and PPE as a last resort.',
  },
  {
    id: 90,
    question: 'Which control measure is most effective?',
    options: [
      'Personal protective equipment',
      'Warning signs and labels',
      'Elimination of the hazard',
      'Worker training and instruction',
    ],
    correctAnswer: 2,
    explanation:
      'Elimination of the hazard is the most effective control measure as it completely removes the risk.',
  },
  {
    id: 91,
    question: 'When should risk assessments be reviewed?',
    options: [
      'Only at the end of the project',
      'Only when requested by the HSE',
      'Never once they are signed off',
      'Regularly, after incidents, and when changes occur',
    ],
    correctAnswer: 3,
    explanation:
      'Risk assessments should be reviewed regularly, after incidents or accidents, or when significant changes occur.',
  },
  {
    id: 92,
    question: 'Who should carry out risk assessments?',
    options: [
      'A competent person with knowledge of the work and hazards',
      'Any apprentice on their first day',
      'Only an external HSE inspector',
      'The client who commissioned the work',
    ],
    correctAnswer: 0,
    explanation:
      'Risk assessments should be carried out by competent persons with knowledge of the work and associated hazards.',
  },
  {
    id: 93,
    question: 'What should be recorded in a risk assessment?',
    options: [
      'The cost of the labour and materials',
      'Significant findings, people at risk, control measures',
      'The personal details of every site visitor',
      'The make and model of every tool used',
    ],
    correctAnswer: 1,
    explanation:
      'Written records should be kept of significant findings, people at risk, and control measures implemented.',
  },
  {
    id: 94,
    question: 'What is a method statement?',
    options: [
      'A summary of the project costs',
      'A list of approved suppliers',
      'A document describing how work will be carried out safely',
      'A certificate confirming the work is complete',
    ],
    correctAnswer: 2,
    explanation:
      'A method statement describes the sequence of operations and safety measures for carrying out specific work.',
  },
  {
    id: 95,
    question: 'What should a method statement include?',
    options: [
      'Only the names of the operatives and their daily rates of pay',
      'Only the project start and finish dates and milestone reviews',
      'Only the materials, tools and plant to be ordered for the job',
      'Work sequence, hazards, control measures, emergency procedures, supervision',
    ],
    correctAnswer: 3,
    explanation:
      'Method statements should include work sequence, hazards, control measures, emergency procedures and supervision arrangements.',
  },
  {
    id: 96,
    question: 'Who should be involved in developing method statements?',
    options: [
      'Competent persons, supervisors, and experienced workers',
      'Only the company accountant',
      'Only the client and the architect',
      'Only the youngest apprentice on site',
    ],
    correctAnswer: 0,
    explanation:
      'Method statements should involve competent persons, supervisors and experienced workers who understand the work.',
  },
  {
    id: 97,
    question: 'When are method statements typically required?',
    options: [
      'For routine low-risk office tasks',
      'For high-risk activities, complex work, and CDM projects',
      'Only when an accident has already occurred',
      'Only for projects lasting under one day',
    ],
    correctAnswer: 1,
    explanation:
      'Method statements are typically required for high-risk activities, complex work and construction projects under CDM.',
  },
  {
    id: 98,
    question: 'What is the relationship between risk assessment and method statements?',
    options: [
      'They are exactly the same document',
      'A method statement replaces the risk assessment',
      'Risk assessment identifies risks, method statement describes control measures',
      'They are unrelated to each other',
    ],
    correctAnswer: 2,
    explanation:
      'Risk assessments identify hazards and risks; method statements describe how to control those risks during work.',
  },
  {
    id: 99,
    question: 'What factors should be considered when assessing who might be harmed?',
    options: [
      'Only the directly employed operatives',
      'Only those who have signed in at the gate',
      'Only the site supervisor',
      'Workers, visitors, contractors, public, and special groups',
    ],
    correctAnswer: 3,
    explanation:
      'Consider all who might be affected: workers, visitors, contractors, public, and special groups like pregnant women.',
  },
  {
    id: 100,
    question: 'What special considerations apply to young workers?',
    options: [
      'They lack experience, may take risks, and physical development is incomplete',
      'They are exempt from all health and safety duties',
      'They never require additional supervision',
      'They cannot legally work on construction sites',
    ],
    correctAnswer: 0,
    explanation:
      'Young workers lack experience, may be more willing to take risks, and their physical development may be incomplete.',
  },
  {
    id: 101,
    question: 'What considerations apply to pregnant workers?',
    options: [
      'They are not covered by health and safety law',
      'Certain hazards pose additional risks to mother and unborn child',
      'They must always be removed from the workplace',
      'No special considerations are required',
    ],
    correctAnswer: 1,
    explanation:
      'Pregnancy may increase risks from certain hazards, requiring additional controls to protect mother and child.',
  },
  {
    id: 102,
    question: "What is meant by 'reasonably foreseeable'?",
    options: [
      'Events that could never possibly occur',
      'Events that have already been reported',
      'Events that are likely to happen or could reasonably be expected',
      'Events caused only by deliberate sabotage',
    ],
    correctAnswer: 2,
    explanation:
      'Reasonably foreseeable means events that are likely to happen or could reasonably be expected in the circumstances.',
  },
  {
    id: 103,
    question: 'How is risk typically rated in a simple risk assessment?',
    options: [
      'Cost ÷ time = risk level',
      'Hazards ÷ controls = risk level',
      'Voltage × current = risk level',
      'Likelihood × severity = risk level',
    ],
    correctAnswer: 3,
    explanation:
      'Risk is typically rated by multiplying the likelihood of occurrence by the severity of potential consequences.',
  },
  {
    id: 104,
    question: 'What is a risk matrix used for?',
    options: [
      'To systematically evaluate and prioritise risks',
      'To record the cost of each task',
      'To plan the sequence of construction',
      'To certify the completed installation',
    ],
    correctAnswer: 0,
    explanation:
      'A risk matrix helps systematically evaluate likelihood and severity to prioritise risks for action.',
  },
  {
    id: 105,
    question: 'What does ALARP mean?',
    options: [
      'Always Look At Risk Properly',
      'As Low As Reasonably Practicable',
      'All Local Area Risk Plans',
      'All Likely Accident Risk Prevented',
    ],
    correctAnswer: 1,
    explanation:
      'ALARP means As Low As Reasonably Practicable - the standard for reducing risk in UK legislation.',
  },
  {
    id: 106,
    question: 'What is dynamic risk assessment?',
    options: [
      'A risk assessment completed only at the planning stage',
      'A risk assessment carried out by computer software',
      'Ongoing assessment of changing conditions during work',
      'A risk assessment that never needs reviewing',
    ],
    correctAnswer: 2,
    explanation:
      'Dynamic risk assessment is the ongoing process of assessing changing conditions and new hazards during work.',
  },
  {
    id: 107,
    question: 'What should workers do if they identify new hazards?',
    options: [
      'Carry on working and mention it later',
      'Try to fix it themselves without telling anyone',
      'Ignore it if it is not in the risk assessment',
      'Stop work and report it to the supervisor',
    ],
    correctAnswer: 3,
    explanation:
      'Workers should stop work and report new hazards to their supervisor for assessment and control.',
  },
  {
    id: 108,
    question: 'What is a generic risk assessment?',
    options: [
      'A general assessment covering similar activities that can be adapted',
      'An assessment that applies to one site only',
      'An assessment carried out after an accident',
      'An assessment that cannot be changed',
    ],
    correctAnswer: 0,
    explanation:
      'Generic risk assessments cover similar activities and can be adapted for specific situations and locations.',
  },
  {
    id: 109,
    question: 'What is a site-specific risk assessment?',
    options: [
      'A standard template used on every site',
      'An assessment tailored to specific site conditions and hazards',
      'An assessment completed only by the client',
      'An assessment that ignores local hazards',
    ],
    correctAnswer: 1,
    explanation:
      'Site-specific risk assessments are tailored to the particular conditions, hazards and constraints of a specific location.',
  },
  {
    id: 110,
    question: 'What risk assessment information should be communicated to workers?',
    options: [
      'The cost of the project materials',
      'The employer’s insurance details',
      'Relevant findings of the risk assessment and control measures required',
      'The personal data of other employees',
    ],
    correctAnswer: 2,
    explanation:
      'Workers must be informed of relevant risk assessment findings and the control measures they need to follow.',
  },
  {
    id: 111,
    question: 'What is the purpose of consultation in risk assessment?',
    options: [
      'To delay the start of the work',
      'To reduce the cost of the project',
      'To remove the need for PPE',
      'To get input from those who understand the work and risks',
    ],
    correctAnswer: 3,
    explanation:
      'Consultation ensures input from those with practical knowledge of the work and risks involved.',
  },
  {
    id: 112,
    question: 'What should happen if control measures are not working effectively?',
    options: [
      'Review and revise the risk assessment and control measures',
      'Continue working and hope it improves',
      'Remove the control measures entirely',
      'Wait until the next scheduled review date',
    ],
    correctAnswer: 0,
    explanation:
      "If control measures aren't effective, the risk assessment should be reviewed and control measures revised.",
  },
  {
    id: 113,
    question: 'What is residual risk?',
    options: [
      'The risk before any controls are applied',
      'The risk remaining after control measures have been implemented',
      'A risk that has been completely eliminated',
      'A risk that applies only to visitors',
    ],
    correctAnswer: 1,
    explanation:
      'Residual risk is the risk remaining after control measures have been implemented - it should be ALARP.',
  },
  {
    id: 114,
    question: 'What factors affect the acceptability of risk?',
    options: [
      'The weather on the day and the season the work takes place',
      'The age of the building and the date it was last refurbished',
      'Benefits, costs, public perception, legal requirements, available alternatives',
      'The number of workers on site and the hours they are working',
    ],
    correctAnswer: 2,
    explanation:
      'Risk acceptability depends on benefits, costs, public perception, legal requirements and available alternatives.',
  },
  {
    id: 115,
    question: 'What is tolerable risk?',
    options: [
      'A risk that must always be eliminated entirely',
      'A risk that can never be accepted',
      'A risk that applies only to the public',
      'Risk that can be accepted in current circumstances based on benefits gained',
    ],
    correctAnswer: 3,
    explanation:
      'Tolerable risk can be accepted in current circumstances based on the benefits gained and costs of further reduction.',
  },
  {
    id: 116,
    question: 'What should be included in risk assessment training?',
    options: [
      'Hazard identification, risk evaluation, control measures, review processes',
      'Only how to fill in the accident book and report to the supervisor',
      'Only the company’s pricing structure and commercial procedures',
      'Only basic first aid certification and emergency contact numbers',
    ],
    correctAnswer: 0,
    explanation:
      'Training should cover hazard identification, risk evaluation techniques, control measures and review processes.',
  },
  {
    id: 117,
    question: 'How often should method statements be reviewed?',
    options: [
      'Only once, before the work starts',
      'When conditions change, after incidents, and regularly',
      'Only when the client requests it',
      'Never, once they have been issued',
    ],
    correctAnswer: 1,
    explanation:
      'Method statements should be reviewed when conditions change, after incidents, and as part of regular review.',
  },
  {
    id: 118,
    question: 'What is the role of supervision in risk control?',
    options: [
      'To increase the speed of the work at any cost',
      'To replace the need for a risk assessment',
      'To ensure control measures are followed and remain effective',
      'To reduce the amount of PPE required',
    ],
    correctAnswer: 2,
    explanation:
      'Supervision ensures control measures are properly implemented, followed and remain effective.',
  },
  {
    id: 119,
    question: 'What should be done with lessons learned from incidents?',
    options: [
      'Keep them confidential and take no action',
      'Use them only to apportion blame',
      'File them away without reading them',
      'Update risk assessments and method statements',
    ],
    correctAnswer: 3,
    explanation:
      'Lessons learned from incidents should be used to update and improve risk assessments and method statements.',
  },
  {
    id: 120,
    question: 'What is a permit to work system?',
    options: [
      'A formal system to control high-risk work through written permission',
      'A licence to operate as an electrician',
      'A certificate confirming completed work',
      'A schedule of the project costs',
    ],
    correctAnswer: 0,
    explanation:
      'Permit to work is a formal system controlling high-risk work through written permission and defined procedures.',
  },
  {
    id: 121,
    question: 'When might permit to work systems be used?',
    options: [
      'For routine office administration tasks',
      'For high-risk work like confined spaces, hot work, electrical isolation',
      'For ordering materials from suppliers',
      'For arranging staff annual leave',
    ],
    correctAnswer: 1,
    explanation:
      'Permit to work systems are used for high-risk activities like confined space entry, hot work, and electrical isolation.',
  },
  {
    id: 122,
    question: 'What should be monitored during risk assessment implementation?',
    options: [
      'The cost of materials and labour against the project budget',
      'The weather forecast and predicted site temperatures only',
      'Effectiveness of control measures, changing conditions, worker compliance',
      'The number of vehicles and deliveries entering the site each day',
    ],
    correctAnswer: 2,
    explanation:
      'Monitor control measure effectiveness, changing conditions, worker compliance and any new hazards arising.',
  },
  {
    id: 123,
    question: 'What makes a good risk assessment?',
    options: [
      'It is as long and detailed as possible',
      'It is completed only after the work',
      'It is kept secret from the workforce',
      'Practical, clear, focused on significant risks, and regularly reviewed',
    ],
    correctAnswer: 3,
    explanation:
      'Good risk assessments are practical, clear, focus on significant risks and are regularly reviewed and updated.',
  },
  {
    id: 124,
    question: 'What is human error analysis?',
    options: [
      'Systematic analysis of how and why people make mistakes',
      'A method of disciplining workers who err',
      'A way of calculating wages',
      'An electrical testing procedure',
    ],
    correctAnswer: 0,
    explanation:
      'Human error analysis systematically examines how and why people make mistakes to prevent future errors.',
  },
  {
    id: 125,
    question: 'What factors contribute to human error?',
    options: [
      'Only the worker’s personal carelessness and lack of attention',
      'Personal factors, job factors, organisational factors, environmental factors',
      'Only the weather conditions and the temperature on the day',
      'Only the age and condition of the tools and equipment used',
    ],
    correctAnswer: 1,
    explanation:
      'Human error results from personal, job, organisational and environmental factors that should all be considered.',
  },
  {
    id: 126,
    question: 'How can the likelihood of human error be reduced?',
    options: [
      'By increasing the pace of work and tightening deadlines',
      'By removing supervision and trusting workers to self-manage',
      'Good design, training, procedures, culture, and learning from mistakes',
      'By relying solely on individual experience and personal judgement',
    ],
    correctAnswer: 2,
    explanation:
      'Error reduction requires good design, training, clear procedures, positive culture and learning from mistakes.',
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
  },
  {
    id: 128,
    question: 'When should PPE be used?',
    options: [
      'As a last resort when other control measures are not sufficient',
      'As the first and only control measure',
      'Only when an accident has occurred',
      'Only for visitors to the site',
    ],
    correctAnswer: 0,
    explanation:
      'PPE should be used as a last resort when other control measures cannot adequately reduce the risk.',
  },
  {
    id: 129,
    question: 'What are the main types of head protection?',
    options: [
      'Ear plugs and ear defenders',
      'Hard hats, bump caps, hair nets',
      'Safety glasses and goggles',
      'Respirators and dust masks',
    ],
    correctAnswer: 1,
    explanation:
      'Head protection includes hard hats for impact protection, bump caps for minor hazards, and hair nets for hygiene around machinery.',
  },
  {
    id: 130,
    question: 'When should safety helmets be worn?',
    options: [
      'Only when working at ground level',
      'Only during the lunch break',
      'Where there is risk of head injury from falling objects or impact',
      'Only when no other PPE is available',
    ],
    correctAnswer: 2,
    explanation:
      'Safety helmets should be worn wherever there is risk of head injury from falling objects or impact.',
  },
  {
    id: 131,
    question: 'What types of eye protection are available?',
    options: [
      'Ear plugs, ear muffs and defenders',
      'Hard hats and bump caps',
      'Gloves and gauntlets',
      'Safety glasses, goggles, face shields, welding screens',
    ],
    correctAnswer: 3,
    explanation:
      'Eye protection includes safety glasses, goggles, face shields and welding screens for different hazards.',
  },
  {
    id: 132,
    question: 'When should eye protection be worn?',
    options: [
      "When there's risk from flying particles, chemicals, radiation, or bright light",
      'Only when reading documents or drawings in the site office',
      'Only in low-light conditions where visibility is reduced',
      'Only when working alone without a colleague present nearby',
    ],
    correctAnswer: 0,
    explanation:
      'Eye protection is needed for risks from flying particles, chemicals, harmful radiation or bright light.',
  },
  {
    id: 133,
    question: 'What are the main types of hearing protection?',
    options: [
      'Hard hats and bump caps',
      'Ear plugs, ear muffs, semi-insert protectors',
      'Safety glasses and face shields',
      'Gloves and gauntlets',
    ],
    correctAnswer: 1,
    explanation:
      'Hearing protection includes disposable/reusable ear plugs, ear muffs and semi-insert protectors.',
  },
  {
    id: 134,
    question: 'At what daily noise exposure is hearing protection typically required (upper action value)?',
    options: [
      '100 dB(A) and above',
      '90 dB(A) and above',
      '85 dB(A) and above',
      '60 dB(A) and above',
    ],
    correctAnswer: 2,
    explanation:
      'The upper exposure action value under the Control of Noise at Work Regulations is 85 dB(A), at which hearing protection must be provided and worn.',
  },
  {
    id: 135,
    question: 'What types of respiratory protection are available?',
    options: [
      'Hard hats, bump caps and other forms of head protection',
      'Safety glasses, goggles and full-face visor protection',
      'Disposable ear plugs, ear muffs and semi-insert protectors',
      'Filtering facepieces, half/full face masks, powered respirators, breathing apparatus',
    ],
    correctAnswer: 3,
    explanation:
      'Respiratory protection includes filtering facepieces, masks, powered respirators and breathing apparatus.',
  },
  {
    id: 136,
    question: 'When is respiratory protection needed?',
    options: [
      "When there's risk from dust, fumes, gases, vapours, or oxygen deficiency",
      'Only when working at height on a scaffold or access platform',
      'Only when handling heavy loads that require team lifting',
      'Only when using hand tools rather than powered equipment',
    ],
    correctAnswer: 0,
    explanation:
      'Respiratory protection is needed for airborne hazards like dust, fumes, gases, vapours or oxygen deficiency.',
  },
  {
    id: 137,
    question: 'What are the main types of hand protection?',
    options: [
      'Hard hats, bump caps and other forms of head protection',
      'Cut-resistant gloves, chemical-resistant gloves, thermal gloves, electrical gloves',
      'Safety glasses, goggles and full-face visor protection',
      'Disposable ear plugs, ear muffs and semi-insert protectors',
    ],
    correctAnswer: 1,
    explanation:
      'Hand protection includes cut-resistant, chemical-resistant, thermal and electrical insulating gloves.',
  },
  {
    id: 138,
    question: 'When should hand protection be worn?',
    options: [
      'Only when writing reports and completing site paperwork',
      'Only at the start of a shift before the morning briefing',
      "When there's risk of cuts, chemical contact, burns, or electrical shock",
      'Only when no other item of PPE is required for the task',
    ],
    correctAnswer: 2,
    explanation:
      "Hand protection should be worn when there's risk of cuts, chemical contact, burns or electrical shock.",
  },
  {
    id: 139,
    question: 'What types of foot protection are available?',
    options: [
      'Lightweight trainers with no toe cap or sole reinforcement',
      'Open sandals chosen for ventilation and comfort in hot weather',
      'Slip-on canvas shoes with a soft, flexible non-protective sole',
      'Safety shoes/boots with toe protection, puncture resistance, electrical insulation',
    ],
    correctAnswer: 3,
    explanation:
      'Foot protection includes safety shoes/boots with various features like toe protection, puncture resistance and electrical insulation.',
  },
  {
    id: 140,
    question: 'When should safety footwear be worn?',
    options: [
      "Where there's risk of falling objects, puncture wounds, slips, electrical hazards",
      'Only in office and welfare areas away from the work face',
      'Only when driving or operating site vehicles and plant',
      'Only during fire drills and emergency evacuation exercises',
    ],
    correctAnswer: 0,
    explanation:
      'Safety footwear protects against falling objects, puncture wounds, slips, trips and electrical hazards.',
  },
  {
    id: 141,
    question: 'What are high-visibility garments used for?',
    options: [
      'To keep the wearer warm in cold weather',
      'To make the wearer visible in poor light or near moving vehicles',
      'To protect against chemical splashes',
      'To insulate the wearer from electric shock',
    ],
    correctAnswer: 1,
    explanation:
      'High-visibility garments make workers visible in poor light conditions or when working near moving vehicles.',
  },
  {
    id: 142,
    question: 'What does the CE/UKCA marking on PPE indicate?',
    options: [
      'The country where the PPE was sold',
      'The date the PPE was first issued',
      'That the PPE meets the relevant safety standards',
      'The name of the worker it was issued to',
    ],
    correctAnswer: 2,
    explanation:
      'CE/UKCA marking indicates the PPE meets the relevant safety standards and legal requirements.',
  },
  {
    id: 143,
    question: 'Who is responsible for providing PPE?',
    options: [
      'The individual worker at their own cost',
      'The HSE inspector',
      'The client commissioning the work',
      'Employers (free of charge to employees)',
    ],
    correctAnswer: 3,
    explanation: 'Employers must provide suitable PPE free of charge to employees when needed.',
  },
  {
    id: 144,
    question: 'Who is responsible for using PPE correctly?',
    options: [
      'Employees must use PPE correctly and report defects',
      'Only the site supervisor',
      'Only the equipment manufacturer',
      'Only the HSE inspector',
    ],
    correctAnswer: 0,
    explanation:
      'Employees are responsible for using PPE correctly, looking after it and reporting any defects.',
  },
  {
    id: 145,
    question: 'What factors should be considered when selecting PPE?',
    options: [
      'Only the lowest purchase price and bulk discount available',
      'Nature of hazard, compatibility, comfort, fit, maintenance requirements',
      'Only the colour of the equipment and how it matches the uniform',
      'Only the brand name and reputation of the manufacturer',
    ],
    correctAnswer: 1,
    explanation:
      'PPE selection should consider hazard type, compatibility with other PPE, comfort, fit and maintenance needs.',
  },
  {
    id: 146,
    question: 'Why is PPE fit important?',
    options: [
      'It makes the PPE cheaper to buy',
      'It improves the appearance of the wearer',
      'Ill-fitting PPE may not provide adequate protection',
      'It is only important for hearing protection',
    ],
    correctAnswer: 2,
    explanation:
      'Properly fitted PPE is essential for effective protection - ill-fitting equipment may not provide adequate protection.',
  },
  {
    id: 147,
    question: 'What training should be provided for PPE use?',
    options: [
      'Only how to order replacement stock',
      'Only the cost of the equipment',
      'Only the manufacturer’s contact details',
      'How to use, maintain, store PPE and recognise defects',
    ],
    correctAnswer: 3,
    explanation:
      'Training should cover proper use, maintenance, storage of PPE and how to recognise defects.',
  },
  {
    id: 148,
    question: 'How should PPE be maintained?',
    options: [
      'Regular cleaning, inspection, replacement when damaged or worn',
      'Left unused until it fails completely',
      'Shared between workers without cleaning',
      'Stored only when it stops working',
    ],
    correctAnswer: 0,
    explanation:
      'PPE requires regular cleaning, inspection for damage and replacement when worn out or damaged.',
  },
  {
    id: 149,
    question: 'How should PPE be stored?',
    options: [
      'In direct sunlight near chemicals',
      'In a clean, dry place away from contamination and damage',
      'Loose in the bottom of a tool bag',
      'Outdoors in all weather',
    ],
    correctAnswer: 1,
    explanation:
      'PPE should be stored in clean, dry conditions away from contamination and potential damage.',
  },
  {
    id: 150,
    question: 'What should workers do if PPE is damaged?',
    options: [
      'Continue using it until the end of the job',
      'Repair it themselves with tape',
      'Report the damage and stop using it until replaced',
      'Pass it on to another worker',
    ],
    correctAnswer: 2,
    explanation:
      'Damaged PPE should be reported immediately and not used until properly repaired or replaced.',
  },
  {
    id: 151,
    question: 'Why should workers be involved in PPE selection?',
    options: [
      'To reduce the employer’s costs',
      'To speed up the procurement process',
      'Because it removes the need for training',
      'Workers know the practical requirements and comfort needed for effective use',
    ],
    correctAnswer: 3,
    explanation:
      'Workers understand the practical requirements and comfort needed for effective PPE use in their specific work.',
  },
  {
    id: 152,
    question: 'What are the limitations of PPE?',
    options: [
      'It only protects the individual, can fail, and may give a false sense of security',
      'It removes the hazard entirely',
      'It protects everyone in the area',
      'It never needs maintenance or replacement',
    ],
    correctAnswer: 0,
    explanation:
      'PPE only protects the individual wearer, can fail, and may give a false sense of security if used incorrectly.',
  },
  {
    id: 153,
    question: 'What is meant by PPE compatibility?',
    options: [
      'PPE that is the same brand throughout',
      'Different types of PPE working together without reducing protection',
      'PPE that fits in a single storage box',
      'PPE that is the same colour',
    ],
    correctAnswer: 1,
    explanation:
      'PPE compatibility means different types can be worn together without one reducing the effectiveness of another.',
  },
  {
    id: 154,
    question: 'How often should PPE be inspected?',
    options: [
      'Once a year only',
      'Only after an accident',
      'Before each use and regularly during use',
      'Never, once it is issued',
    ],
    correctAnswer: 2,
    explanation:
      'PPE should be inspected before each use for damage, wear or contamination that could affect protection.',
  },
  {
    id: 155,
    question: 'What documentation should be kept for PPE?',
    options: [
      'Only the original purchase receipt',
      'Only the manufacturer’s advertising',
      'No records are required for PPE',
      'Issue records, training records, inspection records, maintenance records',
    ],
    correctAnswer: 3,
    explanation:
      'Records should include PPE issue, training provided, inspections carried out and maintenance performed.',
  },
  {
    id: 156,
    question: 'What is a PPE assessment?',
    options: [
      'A systematic evaluation to select suitable PPE for specific hazards',
      'A check on the cost of the PPE',
      'A review of how the PPE looks',
      'A survey of worker satisfaction only',
    ],
    correctAnswer: 0,
    explanation:
      'A PPE assessment systematically evaluates hazards and selects appropriate equipment to provide adequate protection.',
  },
  {
    id: 157,
    question: 'When should PPE be replaced?',
    options: [
      'Only at the end of each financial year',
      "When damaged, worn out, or the manufacturer's expiry date is reached",
      'Only when a new worker starts',
      'Never, while it still appears intact',
    ],
    correctAnswer: 1,
    explanation:
      "PPE should be replaced when damaged, worn beyond safe use, or when the manufacturer's expiry date is reached.",
  },
  {
    id: 158,
    question: 'What factors affect PPE effectiveness?',
    options: [
      'The colour, brand and appearance of the equipment chosen',
      'The price paid and the bulk discount obtained on purchase',
      'Correct selection, proper use, good maintenance, adequate training',
      'The age of the worker and their length of service only',
    ],
    correctAnswer: 2,
    explanation:
      'PPE effectiveness depends on correct selection for hazards, proper use, good maintenance and adequate user training.',
  },
  {
    id: 159,
    question: 'What is the role of supervisors in PPE management?',
    options: [
      'To purchase the cheapest PPE available',
      'To wear PPE on behalf of workers',
      'To ignore PPE compliance issues',
      'Ensure PPE is worn correctly, monitor condition, enforce compliance',
    ],
    correctAnswer: 3,
    explanation:
      'Supervisors must ensure PPE is worn correctly, monitor its condition and enforce compliance with PPE requirements.',
  },
  {
    id: 160,
    question: 'How should contaminated PPE be handled?',
    options: [
      'Decontaminate safely or dispose of according to specific procedures',
      'Reuse it without cleaning',
      'Place it in general waste immediately',
      'Wash it in the staff kitchen sink',
    ],
    correctAnswer: 0,
    explanation:
      'Contaminated PPE requires safe decontamination or disposal according to specific procedures for the contaminant type.',
  },
  {
    id: 161,
    question: 'What are the categories of PPE?',
    options: [
      'Class A, Class B and Class C',
      'Category I (simple), Category II (intermediate), Category III (complex)',
      'Light, medium and heavy duty',
      'Indoor, outdoor and underground',
    ],
    correctAnswer: 1,
    explanation:
      'PPE is categorised as Category I (simple), Category II (intermediate), or Category III (complex) based on risk level.',
  },
  {
    id: 162,
    question: "What requires special consideration for electrical workers' PPE?",
    options: [
      'High-visibility colour only',
      'The weight of the equipment only',
      'Electrical insulation properties and arc flash protection',
      'The brand of the equipment',
    ],
    correctAnswer: 2,
    explanation:
      'Electrical workers need PPE with electrical insulation properties and protection against arc flash hazards.',
  },
  {
    id: 163,
    question: 'What is arc flash protection?',
    options: [
      'Protection against falling objects',
      'Protection against chemical splashes',
      'Protection against loud noise',
      'Protection from electrical arc blast and thermal energy',
    ],
    correctAnswer: 3,
    explanation:
      'Arc flash protection guards against electrical arc blast and the intense thermal energy it produces.',
  },
  {
    id: 164,
    question: 'When should electrical insulating gloves be tested?',
    options: [
      'Before issue, periodically during use, after suspected damage',
      'Only once when first purchased',
      'Only after they have failed',
      'Only at the end of their service life',
    ],
    correctAnswer: 0,
    explanation:
      'Electrical insulating gloves must be tested before issue, regularly during use, and after any suspected damage.',
  },
  {
    id: 165,
    question: 'What is the purpose of PPE marking and labelling?',
    options: [
      'To advertise the manufacturer’s brand and product range',
      'Identify PPE type, performance standards, limitations, expiry dates',
      'To record the purchase price and supplier of the equipment',
      'To show who last cleaned and inspected the equipment',
    ],
    correctAnswer: 1,
    explanation:
      'Marking identifies PPE type, performance standards met, limitations and expiry dates for safe use.',
  },
  {
    id: 166,
    question: 'How should PPE information be communicated to workers?',
    options: [
      'By a single notice on the wall only',
      'By word of mouth at the gate only',
      'Training, written instructions, demonstrations, ongoing reinforcement',
      'It does not need to be communicated',
    ],
    correctAnswer: 2,
    explanation:
      'PPE information should be communicated through training, written instructions, demonstrations and ongoing reinforcement.',
  },
  {
    id: 167,
    question: 'What role does comfort play in PPE effectiveness?',
    options: [
      'Comfort has no effect on protection',
      'Comfortable PPE is more expensive and so avoided',
      'Comfort only matters for hearing protection',
      'Uncomfortable PPE is less likely to be worn correctly or consistently',
    ],
    correctAnswer: 3,
    explanation:
      'Comfortable PPE is more likely to be worn correctly and consistently, improving overall protection.',
  },
  {
    id: 168,
    question: 'What should be included in a PPE programme?',
    options: [
      'Assessment, selection, training, maintenance, monitoring, review',
      'Only the initial purchase of equipment and its delivery to site',
      'Only an annual stock count of the equipment held in the stores',
      'Only a list of approved suppliers and their product catalogues',
    ],
    correctAnswer: 0,
    explanation:
      'A comprehensive PPE programme includes assessment, selection, training, maintenance, monitoring and regular review.',
  },

  // Section 5: Site Safety Procedures (Questions 169-210)
  {
    id: 169,
    question: 'What should be your first action when arriving on a new construction site?',
    options: [
      'Start work immediately to save time',
      'Attend the site induction and safety briefing',
      'Locate the nearest café',
      'Begin testing the electrical supply',
    ],
    correctAnswer: 1,
    explanation:
      'Site induction provides essential safety information specific to that site and must be completed before starting work.',
  },
  {
    id: 170,
    question: 'What information should be covered in a site induction?',
    options: [
      'The company’s commercial pricing and contract payment terms',
      'The personal details and home addresses of all workers on site',
      'Site layout, hazards, emergency procedures, site rules, welfare facilities',
      'The supplier delivery schedule and material order quantities',
    ],
    correctAnswer: 2,
    explanation:
      'Site induction should cover site layout, specific hazards, emergency procedures, site rules and welfare facilities.',
  },
  {
    id: 171,
    question: 'What is a construction phase plan?',
    options: [
      'A schedule of material prices',
      'A record of completed inspections',
      'A plan of the building’s electrical layout',
      'A document setting out health and safety arrangements for the construction phase',
    ],
    correctAnswer: 3,
    explanation:
      'The construction phase plan sets out the health and safety arrangements and rules for the construction phase.',
  },
  {
    id: 172,
    question: 'Who prepares the construction phase plan?',
    options: [
      'Principal contractor',
      'Client',
      'Designer',
      'Workers',
    ],
    correctAnswer: 0,
    explanation:
      'The principal contractor is responsible for preparing the construction phase plan.',
  },
  {
    id: 173,
    question: 'What should be included in site welfare facilities?',
    options: [
      'A fully equipped gym, swimming pool and recreation facilities',
      'Toilets, washing facilities, drinking water, rest areas, changing rooms',
      'Only a vending machine and a hot drinks dispenser for breaks',
      'Only a first aid box and an accident book kept in the office',
    ],
    correctAnswer: 1,
    explanation:
      'Welfare facilities should include toilets, washing facilities, drinking water, rest areas and changing rooms.',
  },
  {
    id: 174,
    question: 'What is the purpose of site security?',
    options: [
      'To increase the speed of the work and meet project deadlines',
      'To reduce the cost of materials and minimise wastage on site',
      'Prevent unauthorised access, protect workers and public, secure materials',
      'To manage the staff rota and record working hours each day',
    ],
    correctAnswer: 2,
    explanation:
      'Site security prevents unauthorised access, protects workers and the public, and secures materials and equipment.',
  },
  {
    id: 175,
    question: 'What housekeeping practices improve site safety?',
    options: [
      'Storing materials in walkways for easy access',
      'Leaving waste until the end of the project',
      'Working in poor lighting to save power',
      'Clear walkways, proper storage, regular cleaning, waste removal',
    ],
    correctAnswer: 3,
    explanation:
      'Good housekeeping includes clear walkways, proper material storage, regular cleaning and prompt waste removal.',
  },
  {
    id: 176,
    question: 'Why is good housekeeping important?',
    options: [
      'Reduces trips, falls, fire risks and improves working conditions',
      'It increases the amount of waste produced',
      'It speeds up billing the client',
      'It removes the need for PPE',
    ],
    correctAnswer: 0,
    explanation:
      'Good housekeeping reduces trip and fall hazards, fire risks and creates better working conditions.',
  },
  {
    id: 177,
    question: 'What are the main causes of slips, trips and falls on construction sites?',
    options: [
      'Wearing high-visibility clothing and approved safety footwear',
      'Poor housekeeping, uneven surfaces, inadequate lighting, unsuitable footwear',
      'Using insulated tools and following safe isolation procedures',
      'Attending the site induction and daily toolbox talk briefings',
    ],
    correctAnswer: 1,
    explanation:
      'Slips, trips and falls result from poor housekeeping, uneven surfaces, inadequate lighting and unsuitable footwear.',
  },
  {
    id: 178,
    question: 'How can slips, trips and falls be prevented?',
    options: [
      'By working faster to reduce exposure time',
      'By removing all lighting',
      'Good housekeeping, proper lighting, suitable surfaces, appropriate footwear',
      'By storing materials in walkways',
    ],
    correctAnswer: 2,
    explanation:
      'Prevention requires good housekeeping, adequate lighting, suitable walking surfaces and appropriate footwear.',
  },
  {
    id: 179,
    question: 'What is the purpose of site signage?',
    options: [
      'To advertise the contractor’s services to passing trade',
      'To decorate the site and improve its external appearance',
      'To record the cost of the project and material expenditure',
      'Communicate hazards, restrictions, mandatory requirements, emergency information',
    ],
    correctAnswer: 3,
    explanation:
      'Site signage communicates hazards, restrictions, mandatory requirements and emergency information to all site users.',
  },
  {
    id: 180,
    question: 'What are the different types of safety signs?',
    options: [
      'Prohibition, warning, mandatory, emergency, fire safety signs',
      'Large, medium and small signs',
      'Permanent and temporary signs only',
      'Indoor and outdoor signs only',
    ],
    correctAnswer: 0,
    explanation:
      'Safety signs include prohibition (red), warning (yellow), mandatory (blue), emergency and fire safety signs.',
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
  },
  {
    id: 182,
    question: 'What colour are mandatory signs?',
    options: [
      'Red',
      'Yellow',
      'Blue',
      'Green',
    ],
    correctAnswer: 2,
    explanation:
      'Mandatory signs are blue with white pictograms and indicate actions that must be taken.',
  },
  {
    id: 183,
    question: 'What colour are warning signs?',
    options: [
      'Red',
      'Green',
      'Blue',
      'Yellow',
    ],
    correctAnswer: 3,
    explanation: 'Warning signs are yellow with black pictograms and warn of hazards or dangers.',
  },
  {
    id: 184,
    question: 'What should be done if you discover unsafe conditions on site?',
    options: [
      'Report immediately to the supervisor and make the area safe if possible',
      'Ignore it and carry on working',
      'Wait until the next site inspection',
      'Remove the warning signs to avoid alarm',
    ],
    correctAnswer: 0,
    explanation:
      'Unsafe conditions should be reported immediately and the area made safe if possible without creating further risk.',
  },
  {
    id: 185,
    question: 'What is a toolbox talk?',
    options: [
      'A meeting about the company accounts',
      'A short safety discussion on specific topics relevant to current work',
      'A training course on tool maintenance',
      'A break period for the workforce',
    ],
    correctAnswer: 1,
    explanation:
      'Toolbox talks are short, focused safety discussions on topics relevant to current work activities.',
  },
  {
    id: 186,
    question: 'How often should toolbox talks be held?',
    options: [
      'Only once at the start of the project',
      'Only after an accident',
      'Regularly, often weekly or before specific high-risk activities',
      'Never, if the work is routine',
    ],
    correctAnswer: 2,
    explanation:
      'Toolbox talks should be held regularly, often weekly, and before specific high-risk activities.',
  },
  {
    id: 187,
    question: 'What is the purpose of site inspections?',
    options: [
      'To record material costs',
      'To increase the pace of work',
      'To manage the staff rota',
      'Identify hazards, check compliance, monitor safety standards',
    ],
    correctAnswer: 3,
    explanation:
      'Site inspections identify hazards, check compliance with safety requirements and monitor safety standards.',
  },
  {
    id: 188,
    question: 'Who should carry out site inspections?',
    options: [
      'Competent persons including supervisors, safety representatives, managers',
      'Any visitor or delivery driver who happens to be on the site',
      'Only members of the public passing by the site perimeter',
      'Only the youngest apprentice as part of their training tasks',
    ],
    correctAnswer: 0,
    explanation:
      'Site inspections should be carried out by competent persons including supervisors, safety representatives and managers.',
  },
  {
    id: 189,
    question: 'What should be done with findings from site inspections?',
    options: [
      'Filed away and never reviewed',
      'Act on findings, prioritise by risk, monitor progress',
      'Shared only with the client',
      'Destroyed at the end of the day',
    ],
    correctAnswer: 1,
    explanation:
      'Inspection findings should be acted upon, prioritised by risk level and progress monitored until completion.',
  },
  {
    id: 190,
    question: 'What is the role of the site safety representative?',
    options: [
      'To set the project budget',
      'To order materials for the site',
      'Represent workers on safety matters and investigate concerns',
      'To manage the site canteen',
    ],
    correctAnswer: 2,
    explanation:
      'Safety representatives represent workers on safety matters, investigate concerns and participate in consultations.',
  },
  {
    id: 191,
    question: 'What functions do safety representatives have on site?',
    options: [
      'Set the wage rates for operatives',
      'Issue prohibition notices like the HSE',
      'Design the temporary electrical supply',
      'Investigate accidents, inspect the workplace, be consulted on safety matters',
    ],
    correctAnswer: 3,
    explanation:
      'Safety representatives can investigate accidents, inspect the workplace and must be consulted on safety matters.',
  },
  {
    id: 192,
    question: 'What is the importance of communication on construction sites?',
    options: [
      'Essential for coordination, safety information, emergency response',
      'It slows down the work unnecessarily',
      'It is only needed for billing the client',
      'It is only important in the office',
    ],
    correctAnswer: 0,
    explanation:
      'Good communication is essential for work coordination, safety information sharing and effective emergency response.',
  },
  {
    id: 193,
    question: 'How should hazardous substances be stored on site?',
    options: [
      'In open containers near the work area',
      'In secure, ventilated areas with appropriate containment and labelling',
      'Mixed together to save space',
      'In the site canteen for convenience',
    ],
    correctAnswer: 1,
    explanation:
      'Hazardous substances need secure, well-ventilated storage with appropriate containment and clear labelling.',
  },
  {
    id: 194,
    question: 'What information should be available for hazardous substances?',
    options: [
      'Only the purchase price',
      'Only the supplier’s phone number',
      'Safety data sheets with hazard information and control measures',
      'Only the colour of the container',
    ],
    correctAnswer: 2,
    explanation:
      'Safety data sheets must be available providing hazard information, handling precautions and control measures.',
  },
  {
    id: 195,
    question: 'What is COSHH?',
    options: [
      'Care of Site Health and Hygiene',
      'Construction of Safe Houses',
      'Construction Safety and Health',
      'Control of Substances Hazardous to Health',
    ],
    correctAnswer: 3,
    explanation:
      'COSHH stands for Control of Substances Hazardous to Health regulations covering workplace chemical safety.',
  },
  {
    id: 196,
    question: 'What does a COSHH assessment identify?',
    options: [
      'Hazardous substances, exposure routes, health effects, control measures',
      'The cost of cleaning materials and the chemical supplier accounts',
      'The number of vehicles, deliveries and visitors entering the site',
      'The colour scheme and decorative finishes used in the building',
    ],
    correctAnswer: 0,
    explanation:
      'COSHH assessments identify hazardous substances, exposure routes, health effects and necessary control measures.',
  },
  {
    id: 197,
    question: 'What are the main routes of entry for chemicals into the body?',
    options: [
      'Through hearing and balance',
      'Inhalation, ingestion, skin/eye contact, injection',
      'Through the hair and nails only',
      'Only through the soles of the feet',
    ],
    correctAnswer: 1,
    explanation:
      'Chemicals can enter the body through inhalation, ingestion, skin/eye contact and injection through wounds.',
  },
  {
    id: 198,
    question: 'What environmental hazards might be found on construction sites?',
    options: [
      'Only office noise from phones and conversations between staff',
      'Only the colour and external appearance of the finished building',
      'Noise, dust, vibration, weather conditions, contaminated ground',
      'Only the time of day and the season the work is carried out',
    ],
    correctAnswer: 2,
    explanation:
      'Environmental hazards include noise, dust, vibration, adverse weather conditions and contaminated ground.',
  },
  {
    id: 199,
    question: 'How should environmental hazards be managed?',
    options: [
      'Ignored unless they cause an accident',
      'Dealt with only at the end of the project',
      'Left to the individual worker to manage',
      'Identify, assess, control through appropriate measures, monitor conditions',
    ],
    correctAnswer: 3,
    explanation:
      'Environmental hazards should be identified, assessed, controlled through appropriate measures, and conditions monitored.',
  },
  {
    id: 200,
    question: 'What is the purpose of perimeter fencing on construction sites?',
    options: [
      'Prevent unauthorised access and protect the public from site hazards',
      'To advertise the contractor’s services',
      'To store materials against',
      'To provide shade for workers',
    ],
    correctAnswer: 0,
    explanation:
      'Perimeter fencing prevents unauthorised access and protects the public from construction hazards.',
  },
  {
    id: 201,
    question: 'What considerations apply to site access and egress?',
    options: [
      'They should be as narrow as possible',
      'Safe routes, adequate width, good visibility, emergency access',
      'They should be blocked outside working hours',
      'They should be hidden from view',
    ],
    correctAnswer: 1,
    explanation:
      'Site access must provide safe routes, adequate width, good visibility and maintain emergency access.',
  },
  {
    id: 202,
    question: 'What is the importance of site planning for safety?',
    options: [
      'It increases the cost of the project',
      'It is only needed for large sites',
      'Reduces conflicts between activities, controls access, manages hazards',
      'It removes the need for risk assessments',
    ],
    correctAnswer: 2,
    explanation:
      'Good site planning reduces conflicts between activities, controls access routes and helps manage hazards.',
  },
  {
    id: 203,
    question: 'How should deliveries be managed safely on site?',
    options: [
      'Allow vehicles anywhere on site at any time',
      'Mix deliveries with pedestrian routes',
      'Leave drivers to manoeuvre unaided',
      'Designated areas, trained banksmen, separation from other activities',
    ],
    correctAnswer: 3,
    explanation:
      'Safe delivery management requires designated areas, trained banksmen and separation from other site activities.',
  },
  {
    id: 204,
    question: 'What is the role of a banksman?',
    options: [
      'Guide vehicles safely and control vehicle movements',
      'Manage the site finances',
      'Carry out electrical testing',
      'Supervise the welfare facilities',
    ],
    correctAnswer: 0,
    explanation:
      'A banksman guides vehicles safely during reversing and manoeuvring operations to prevent accidents.',
  },
  {
    id: 205,
    question: 'What training should banksmen receive?',
    options: [
      'First aid certification only',
      'Vehicle movements, hand signals, hazard awareness, communication',
      'Electrical installation training',
      'No specific training is required',
    ],
    correctAnswer: 1,
    explanation:
      'Banksmen need training in vehicle movements, standard hand signals, hazard awareness and communication.',
  },
  {
    id: 206,
    question: 'What is the purpose of exclusion zones around plant and machinery?',
    options: [
      'To provide a rest area for workers',
      'To store materials safely',
      'Prevent people entering dangerous areas during operation',
      'To mark the site boundary',
    ],
    correctAnswer: 2,
    explanation:
      'Exclusion zones prevent people entering dangerous areas around operating plant and machinery.',
  },
  {
    id: 207,
    question: 'How should site traffic and pedestrians be separated?',
    options: [
      'Allow them to share the same routes',
      'Remove all walkways to make space',
      'Leave separation to individual judgement',
      'Designated routes, barriers, crossing points, traffic management',
    ],
    correctAnswer: 3,
    explanation:
      'Separation requires designated routes, physical barriers, controlled crossing points and traffic management systems.',
  },
  {
    id: 208,
    question: 'What weather conditions affect construction site safety?',
    options: [
      'High winds, ice, heavy rain, extreme temperatures, lightning',
      'Only mild, dry weather',
      'Only overnight conditions',
      'Weather has no effect on site safety',
    ],
    correctAnswer: 0,
    explanation:
      'Various weather conditions affect safety including high winds, ice, heavy rain, extreme temperatures and lightning.',
  },
  {
    id: 209,
    question: 'What precautions should be taken in extreme weather?',
    options: [
      'Continue all work regardless of conditions',
      'Stop high-risk activities, provide shelter, monitor conditions',
      'Increase the pace to finish quicker',
      'Remove all PPE for comfort',
    ],
    correctAnswer: 1,
    explanation:
      'Extreme weather may require stopping high-risk activities, providing shelter and continuously monitoring conditions.',
  },
  {
    id: 210,
    question: 'What is the importance of coordination between different trades on site?',
    options: [
      'It slows the project down unnecessarily',
      'It is only needed at the start of the project',
      'Prevents conflicts, ensures compatible working methods, manages shared risks',
      'It removes the need for site rules',
    ],
    correctAnswer: 2,
    explanation:
      'Trade coordination prevents conflicts, ensures compatible working methods and manages risks affecting multiple trades.',
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
  },
  {
    id: 212,
    question: 'How can fires be prevented?',
    options: [
      'Remove or control any element of the fire triangle',
      'Add more oxygen to the area',
      'Increase the ambient temperature',
      'Store fuel close to heat sources',
    ],
    correctAnswer: 0,
    explanation:
      'Fire prevention involves removing or controlling heat sources, fuel sources, or oxygen supply.',
  },
  {
    id: 213,
    question: 'What are the main classes of fire?',
    options: [
      'Hot fires, warm fires and slow-smouldering cold fires',
      'Class A (solids), B (liquids), C (gases), D (metals), F (cooking oils)',
      'Small, medium and large fires graded by the area involved',
      'Indoor structural fires and outdoor open-air fires only',
    ],
    correctAnswer: 1,
    explanation:
      'Fire classes are: A (ordinary combustibles), B (flammable liquids), C (gases), D (metals), F (cooking oils).',
  },
  {
    id: 214,
    question: 'What type of fire extinguisher should be used on Class A fires?',
    options: [
      'Carbon dioxide only',
      'Wet chemical only',
      'Water, foam, or dry powder',
      'No extinguisher is suitable',
    ],
    correctAnswer: 2,
    explanation:
      'Class A fires (ordinary combustibles such as wood and paper) can be extinguished with water, foam, or dry powder.',
  },
  {
    id: 215,
    question: 'What type of fire extinguisher should be used on electrical fires?',
    options: [
      'Water',
      'Wet chemical',
      'Foam',
      'CO2 or dry powder',
    ],
    correctAnswer: 3,
    explanation:
      "CO2 or dry powder extinguishers should be used on electrical fires as they don't conduct electricity.",
  },
  {
    id: 216,
    question: 'Why should water never be used on live electrical fires?',
    options: [
      'Water conducts electricity and can cause electrocution',
      'Water is too expensive to use',
      'Water makes cleaning more difficult',
      'Water is in short supply on site',
    ],
    correctAnswer: 0,
    explanation:
      'Water conducts electricity and using it on live electrical equipment can cause electrocution.',
  },
  {
    id: 217,
    question: 'What should you do if you discover a fire?',
    options: [
      'Tackle it yourself regardless of size',
      'Raise the alarm, call the fire brigade, evacuate if safe to do so',
      'Open windows to let the smoke out',
      'Continue working until the alarm sounds',
    ],
    correctAnswer: 1,
    explanation:
      'On discovering fire: raise the alarm, call the fire brigade, and evacuate safely - only tackle small fires if trained and safe.',
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
  },
  {
    id: 219,
    question: 'When should you attempt to fight a fire?',
    options: [
      'Whenever a fire is discovered',
      'Only after the building is empty',
      'Never, under any circumstances',
      "Only if it's small, you're trained, have an escape route, and feel confident",
    ],
    correctAnswer: 3,
    explanation:
      "Only fight fires if they're small, you're trained, have a clear escape route, and feel confident doing so.",
  },
  {
    id: 220,
    question: 'What is the most important principle in fire evacuation?',
    options: [
      'Save lives - people before property',
      'Save equipment before evacuating',
      'Collect personal belongings first',
      'Finish the current task before leaving',
    ],
    correctAnswer: 0,
    explanation:
      'Life safety is paramount - people must be evacuated before considering property or equipment.',
  },
  {
    id: 221,
    question: 'What should you do when the fire alarm sounds?',
    options: [
      'Finish your current task first',
      'Stop work immediately and evacuate via nearest safe exit',
      'Wait to see if it is a false alarm',
      'Return to collect your tools',
    ],
    correctAnswer: 1,
    explanation:
      'When fire alarms sound, stop work immediately and evacuate via the nearest safe exit route.',
  },
  {
    id: 222,
    question: 'Where should people assemble during evacuation?',
    options: [
      'In the nearest stairwell',
      'In the car park exit lane',
      'At designated assembly points away from the building',
      'At the main reception desk',
    ],
    correctAnswer: 2,
    explanation:
      'People should assemble at designated assembly points that are a safe distance from the building.',
  },
  {
    id: 223,
    question: 'Who should take a roll call at assembly points?',
    options: [
      'Any member of the public present',
      'The most senior visitor on site',
      'No one, it is not necessary',
      'Fire wardens or designated responsible persons',
    ],
    correctAnswer: 3,
    explanation:
      'Fire wardens or other designated responsible persons should conduct roll calls to account for all personnel.',
  },
  {
    id: 224,
    question: 'What information should be given to the fire brigade?',
    options: [
      'Location, type of fire, people involved, hazardous materials present',
      'Only the name of the company and the site manager on duty',
      'Only the cost of the building and its insurance valuation',
      'Only the time the alarm sounded and who first raised it',
    ],
    correctAnswer: 0,
    explanation:
      'Fire brigade should be told: exact location, type of fire, people involved/missing, and any hazardous materials.',
  },
  {
    id: 225,
    question: 'What is a fire risk assessment?',
    options: [
      'A record of past fires and false alarms at the premises only',
      'Systematic evaluation of fire hazards and risks to implement control measures',
      'A list of fire extinguisher prices and annual servicing costs',
      'A certificate confirming the building insurance is up to date',
    ],
    correctAnswer: 1,
    explanation:
      'A fire risk assessment systematically evaluates fire hazards and risks to implement appropriate prevention and protection measures.',
  },
  {
    id: 226,
    question: 'What should a fire risk assessment identify?',
    options: [
      'The cost of building repairs',
      'The number of staff employed',
      'Fire hazards, people at risk, control measures needed',
      'The age of the building',
    ],
    correctAnswer: 2,
    explanation:
      'Fire risk assessments should identify fire hazards, people at risk, and determine necessary control measures.',
  },
  {
    id: 227,
    question: 'How often should fire drills typically be conducted?',
    options: [
      'Only when a fire occurs',
      'Once every five years',
      'Never, if alarms are tested',
      'Regularly, typically every 6 months or as required',
    ],
    correctAnswer: 3,
    explanation:
      'Fire drills should be conducted regularly, typically every 6 months, to ensure evacuation procedures work effectively.',
  },
  {
    id: 228,
    question: 'What should be checked during fire drill evaluation?',
    options: [
      'Evacuation time, route effectiveness, alarm audibility, assembly procedures',
      'The cost of the fire drill and the time lost from production',
      'The colour and size of the illuminated exit signs only',
      'The number of fire extinguishers held in stock on site',
    ],
    correctAnswer: 0,
    explanation:
      'Evaluate evacuation times, route effectiveness, alarm audibility, assembly procedures and overall drill effectiveness.',
  },
  {
    id: 229,
    question: 'What are the key components of emergency evacuation routes?',
    options: [
      'Narrow, dimly lit and discreet',
      'Clearly marked, well-lit, unobstructed, leading to safe areas',
      'Locked outside working hours',
      'Shared with delivery vehicles',
    ],
    correctAnswer: 1,
    explanation:
      'Evacuation routes must be clearly marked, well-lit, kept unobstructed, and lead to safe areas outside.',
  },
  {
    id: 230,
    question: 'What is the role of fire wardens?',
    options: [
      'To design the electrical fire alarm system',
      'To investigate the cause of every fire',
      'Assist with evacuation, check areas are clear, liaise with the fire brigade',
      'To repair fire-damaged equipment',
    ],
    correctAnswer: 2,
    explanation:
      'Fire wardens assist evacuation, check their areas are clear, help colleagues and liaise with emergency services.',
  },
  {
    id: 231,
    question: 'What training should fire wardens receive?',
    options: [
      'Manual handling and load-lifting techniques only',
      'Basic first aid and casualty treatment only',
      'Electrical installation and isolation procedures only',
      'Fire procedures, evacuation routes, equipment use, emergency communication',
    ],
    correctAnswer: 3,
    explanation:
      'Fire wardens need training in fire procedures, evacuation routes, equipment use and emergency communication.',
  },
  {
    id: 232,
    question: "What should you do if you're trapped by fire?",
    options: [
      'Close doors, signal for help, stay low, await rescue',
      'Open all doors to find a way out quickly',
      'Run through the smoke at full speed',
      'Hide under a desk and stay silent',
    ],
    correctAnswer: 0,
    explanation:
      'If trapped: close doors to slow fire spread, signal for help, stay low to avoid smoke, and await rescue.',
  },
  {
    id: 233,
    question: 'Why should you stay low in smoke?',
    options: [
      'Smoke is harmless near the floor',
      'Cleaner air is near the floor as smoke rises',
      'It is faster to crawl than to walk',
      'The floor is cooler to touch',
    ],
    correctAnswer: 1,
    explanation:
      'Smoke rises, so cleaner, cooler air with more oxygen is found closer to the floor.',
  },
  {
    id: 234,
    question: 'What is the main danger from smoke?',
    options: [
      'It reduces visibility only',
      'It stains clothing and equipment',
      'Toxic gases that can cause unconsciousness and death',
      'It triggers the sprinkler system',
    ],
    correctAnswer: 2,
    explanation:
      'Smoke contains toxic gases like carbon monoxide that can cause unconsciousness and death within minutes.',
  },
  {
    id: 235,
    question: 'What emergency equipment should be available on construction sites?',
    options: [
      'Only a single fire blanket kept in the site cabin kitchen',
      'Only a first aid box and an accident book in the site office',
      'Only a list of emergency phone numbers pinned to the wall',
      'Fire extinguishers, first aid kits, emergency communication, evacuation equipment',
    ],
    correctAnswer: 3,
    explanation:
      'Sites should have fire extinguishers, first aid equipment, emergency communication means and evacuation equipment.',
  },
  {
    id: 236,
    question: 'What is a fire safety management system?',
    options: [
      'A comprehensive approach including prevention, detection, suppression, evacuation',
      'A single smoke detector fitted in the site office for early warning',
      'A schedule of building insurance payments and renewal dates',
      'A list of staff home addresses and emergency next of kin',
    ],
    correctAnswer: 0,
    explanation:
      'Fire safety management includes prevention measures, detection systems, suppression equipment and evacuation procedures.',
  },
  {
    id: 237,
    question: 'How should hot work be controlled to prevent fires?',
    options: [
      'Carried out without any precautions',
      'Permits, fire watches, cleared areas, fire extinguishers nearby',
      'Only during the lunch break',
      'Only by unsupervised apprentices',
    ],
    correctAnswer: 1,
    explanation:
      'Hot work requires permits, trained fire watches, cleared work areas and appropriate fire extinguishers nearby.',
  },
  {
    id: 238,
    question: 'What is a fire watch?',
    options: [
      'A timer that limits hot work duration',
      'A type of smoke detector',
      'A person who monitors for fires during and after hot work',
      'A fire-resistant clock',
    ],
    correctAnswer: 2,
    explanation:
      'A fire watch is a trained person who monitors for fires during hot work and for a period afterwards.',
  },
  {
    id: 239,
    question: 'What should be done with combustible materials during hot work?',
    options: [
      'Stack them closer for convenience',
      'Soak them in flammable liquid',
      'Leave them where they are',
      'Remove them from the area or protect them from ignition',
    ],
    correctAnswer: 3,
    explanation:
      'Combustible materials should be removed from the area or properly protected from ignition sources.',
  },
  {
    id: 240,
    question: 'What emergency communication systems should sites have?',
    options: [
      'Multiple methods: landline, mobile, radio, alarms',
      'A single notice board only',
      'Word of mouth only',
      'No communication system is required',
    ],
    correctAnswer: 0,
    explanation:
      'Sites should have multiple communication methods including landlines, mobiles, radios and alarm systems.',
  },
  {
    id: 241,
    question: 'What information should be immediately available in emergencies?',
    options: [
      'The company’s annual accounts and financial performance figures',
      'Emergency contacts, site plans, hazard information, evacuation procedures',
      'A list of approved suppliers and their current price catalogues',
      'The personal details and next of kin of every worker on site',
    ],
    correctAnswer: 1,
    explanation:
      'Emergency information should include contacts, site plans, hazard details and evacuation procedures.',
  },
  {
    id: 242,
    question: 'How should emergency procedures be communicated?',
    options: [
      'By a single email at the start of the project',
      'Only verbally on the first day',
      'Training, written procedures, drills, signs, induction',
      'They do not need to be communicated',
    ],
    correctAnswer: 2,
    explanation:
      'Emergency procedures should be communicated through training, written procedures, drills, signage and induction.',
  },
  {
    id: 243,
    question: 'What is the purpose of emergency lighting?',
    options: [
      'To illuminate advertising signs',
      'To save energy during the day',
      'To highlight the company logo',
      'Provide illumination during power failures for safe evacuation',
    ],
    correctAnswer: 3,
    explanation:
      'Emergency lighting provides illumination during power failures to enable safe evacuation along escape routes.',
  },
  {
    id: 244,
    question: 'How often should emergency lighting be tested?',
    options: [
      'Monthly brief tests and annual full-duration tests',
      'Only once when installed',
      'Every five years',
      'Only after a power failure',
    ],
    correctAnswer: 0,
    explanation:
      'Emergency lighting should be tested monthly for operation and annually for full-duration capability (BS 5266).',
  },
  {
    id: 245,
    question: 'What should be included in emergency evacuation plans?',
    options: [
      'The cost of the building and its replacement insurance value',
      'Routes, assembly points, responsibilities, special needs, communication methods',
      'The names of suppliers and their emergency contact numbers',
      'A list of fire extinguisher prices and annual servicing costs',
    ],
    correctAnswer: 1,
    explanation:
      'Plans should include escape routes, assembly points, responsibilities, provisions for special needs and communication.',
  },
  {
    id: 246,
    question: 'How should people with disabilities be considered in emergency planning?',
    options: [
      'They should evacuate without any assistance',
      'They are not covered by emergency planning',
      'Personal emergency evacuation plans (PEEPs) and assistance arrangements',
      'They should wait until everyone else has left',
    ],
    correctAnswer: 2,
    explanation:
      'People with disabilities need personal emergency evacuation plans (PEEPs) with specific assistance arrangements.',
  },
  {
    id: 247,
    question: 'What should be done after an emergency evacuation?',
    options: [
      'Resume work immediately without checks',
      'Send everyone home without a roll call',
      'Ignore the cause of the incident',
      'Account for all personnel, investigate the cause, debrief, improve procedures',
    ],
    correctAnswer: 3,
    explanation:
      'After evacuation: account for personnel, investigate the cause, conduct debriefing and improve procedures.',
  },
  {
    id: 248,
    question: 'What is business continuity planning?',
    options: [
      'Planning to maintain operations during and after emergencies',
      'Planning the company’s marketing campaigns',
      'Planning staff annual leave',
      'Planning the office layout',
    ],
    correctAnswer: 0,
    explanation:
      'Business continuity planning ensures operations can continue during emergencies and recovery afterwards.',
  },
  {
    id: 249,
    question: 'What should be included in emergency training?',
    options: [
      'Only the company history and its commercial background',
      'Alarm procedures, evacuation routes, assembly points, equipment use, site-specific risks',
      'Only the purchase cost of the fire and emergency equipment',
      'Only the supplier contact list and material ordering procedures',
    ],
    correctAnswer: 1,
    explanation:
      'Training should cover alarm procedures, evacuation routes, assembly points, equipment use, and site-specific risks.',
  },
  {
    id: 250,
    question: 'How often should emergency procedures be reviewed and updated?',
    options: [
      'Only once when first written',
      'Only when the building changes ownership',
      'Regularly, after incidents, when changes occur to site or operations',
      'Never, once they are approved',
    ],
    correctAnswer: 2,
    explanation:
      'Emergency procedures should be reviewed regularly, after incidents, and when changes occur to the site or operations.',
  },
];

// Function to get random questions for mock exam
export const getRandomQuestions = (count: number = 30): Question[] => {
  const shuffled = [...module1Questions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
