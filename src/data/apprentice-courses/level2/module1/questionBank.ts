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
      'Building Regulations',
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
      'To carry out their own risk assessments before any task begins',
      'To provide and pay for their own personal protective equipment',
      'To enforce health and safety law on behalf of the HSE',
    ],
    correctAnswer: 0,
    explanation:
      "Employees must take reasonable care of their own and others' health and safety, and cooperate with their employer.",
  },
  {
    id: 5,
    question: 'Which organisation enforces health and safety law in Great Britain?',
    options: [
      'The local authority environmental health department',
      'Health and Safety Executive (HSE)',
      'The Health and Safety Commission',
      'The Department for Work and Pensions',
    ],
    correctAnswer: 1,
    explanation:
      'The Health and Safety Executive (HSE) is the primary enforcer of health and safety law in Great Britain.',
  },
  {
    id: 6,
    question: 'What is the maximum penalty for breaching health and safety law?',
    options: [
      'A fixed maximum fine of £20,000',
      'A formal written warning and re-training',
      'Unlimited fine and/or imprisonment',
      'Suspension of the company trading licence',
    ],
    correctAnswer: 2,
    explanation:
      'Serious breaches of health and safety law can result in unlimited fines and/or imprisonment.',
  },
  {
    id: 7,
    question: 'What does CDM stand for?',
    options: [
      'Civil Design Manual',
      'Construction Development Manual',
      'Construction Delivery Method',
      'Construction Design Management',
    ],
    correctAnswer: 3,
    explanation:
      'CDM stands for Construction (Design and Management) Regulations which apply to construction projects.',
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
  },
  {
    id: 9,
    question: 'What is the role of the Principal Designer under CDM?',
    options: [
      'To supervise all site operatives during the construction phase',
      'To plan, manage and coordinate health and safety during the pre-construction phase',
      'To prepare the construction phase plan and manage the site daily',
      'To compile and hand over the health and safety file to the client',
    ],
    correctAnswer: 1,
    explanation:
      'The Principal Designer plans, manages and coordinates health and safety during the pre-construction phase.',
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
  },
  {
    id: 11,
    question: 'What are the duties of a Principal Contractor under CDM?',
    options: [
      'Coordinate health and safety only during the design stage',
      'Compile the pre-construction information for the designers',
      'Approve the appointment of the client and Principal Designer',
      'Plan, manage and coordinate health and safety during the construction phase',
    ],
    correctAnswer: 3,
    explanation:
      'The Principal Contractor plans, manages and coordinates health and safety during the construction phase.',
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
  },
  {
    id: 13,
    question: 'What information must be provided in the health and safety file?',
    options: [
      'A daily record of who was present on site each shift, signed by the contractor',
      'Information about the structure needed for future construction work, maintenance, and demolition',
      'The commercial tender prices submitted by each contractor and the accepted sum',
      'Copies of every operative qualification and CSCS card held during the works',
    ],
    correctAnswer: 1,
    explanation:
      'The health and safety file contains information needed for future construction work, maintenance, and demolition.',
  },
  {
    id: 14,
    question: 'Under EAWR, what must electrical systems be?',
    options: [
      'Inspected and tested at intervals of no more than five years',
      'Designed only by an incorporated electrical engineer',
      'Constructed, maintained and used to prevent danger',
      'Labelled with the manufacturer name and date of installation',
    ],
    correctAnswer: 2,
    explanation:
      'EAWR requires electrical systems to be constructed, maintained and used so far as reasonably practicable to prevent danger.',
  },
  {
    id: 15,
    question: "What does 'competent person' mean under EAWR?",
    options: [
      'Anyone holding a current ECS card and a site induction certificate',
      'A person directly employed by the distribution network operator',
      'Any qualified electrician over the age of 18 working under supervision',
      'Person with sufficient training, experience and knowledge to prevent danger',
    ],
    correctAnswer: 3,
    explanation:
      'A competent person has sufficient training, experience and knowledge to prevent danger when working with electricity.',
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
  },
  {
    id: 17,
    question: 'What is the purpose of RIDDOR?',
    options: [
      'Registration of Independent Domestic and Domiciliary Operatives Regulations',
      'Reporting of Injuries, Diseases and Dangerous Occurrences Regulations',
      'Recording of Incidents, Damage and Defective Operations Regulations',
      'Risk Identification, Documentation and Defect Observation Regulations',
    ],
    correctAnswer: 1,
    explanation:
      'RIDDOR requires the reporting of serious workplace accidents, occupational diseases and dangerous occurrences.',
  },
  {
    id: 18,
    question: 'Which accidents must be reported under RIDDOR?',
    options: [
      'Fatalities and any injury requiring admission to hospital for treatment',
      'Any first-aid treatment given at work and recorded in the accident book',
      'Deaths, specified injuries, over-7-day injuries, diseases, dangerous occurrences',
      'All accidents causing any cut, bruise or sprain to a person at work',
    ],
    correctAnswer: 2,
    explanation:
      'RIDDOR requires reporting of deaths, specified injuries, over-7-day injuries, occupational diseases and dangerous occurrences.',
  },
  {
    id: 19,
    question: 'How quickly must deaths and specified injuries be reported under RIDDOR?',
    options: [
      'In writing only, within 28 days of the incident',
      'By email to the local authority within 24 hours',
      'At the next routine HSE inspection of the site',
      'Immediately by telephone followed by written report within 10 days',
    ],
    correctAnswer: 3,
    explanation:
      'Deaths and specified injuries must be reported to the HSE without delay by the quickest practicable means, followed by a written report within 10 days.',
  },
  {
    id: 20,
    question: "What is a 'specified injury' under RIDDOR?",
    options: [
      'Serious injuries including fractures, amputations, serious burns',
      'Any injury requiring more than basic first-aid treatment',
      'A minor cut or graze that draws a small amount of blood',
      'Any absence from work lasting more than one full shift',
    ],
    correctAnswer: 0,
    explanation:
      'Specified injuries include fractures (other than to fingers, thumbs and toes), amputations, serious eye injuries, serious burns, and other major injuries.',
  },
  {
    id: 21,
    question: 'What is the role of safety representatives?',
    options: [
      'To enforce health and safety law and issue prohibition notices',
      'To represent employees in consultations with employers on health and safety matters',
      'To carry out all of the site risk assessments on the employer behalf',
      'To provide first-aid cover and maintain the accident book',
    ],
    correctAnswer: 1,
    explanation:
      'Safety representatives represent employees in consultations with employers on health and safety matters.',
  },
  {
    id: 22,
    question: 'What powers do safety representatives have?',
    options: [
      'To dismiss workers who repeatedly breach the company safety rules',
      'To issue improvement and prohibition notices to the employer directly',
      'To investigate accidents, inspect the workplace, receive information, be consulted',
      'To prosecute the employer in the magistrates court on behalf of members',
    ],
    correctAnswer: 2,
    explanation:
      'Safety representatives can investigate accidents, inspect workplaces, receive information and be consulted on safety matters.',
  },
  {
    id: 23,
    question: 'What is an improvement notice?',
    options: [
      'A notice requiring the immediate stoppage of a dangerous work activity',
      'An internal memo from a supervisor about poor site housekeeping standards',
      'A voluntary code of good practice issued by a recognised trade body',
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
      'A notice giving a set period of time in which to correct a safety failing',
      'A written warning that further training is needed before work restarts',
      'A notice requiring the whole workplace to be permanently closed down',
    ],
    correctAnswer: 0,
    explanation:
      'A prohibition notice requires immediate cessation of activities that pose a risk of serious personal injury.',
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
  },
  {
    id: 26,
    question: 'What is the purpose of health and safety policy?',
    options: [
      'To record every accident and near miss that occurs at work in one place',
      'To list the names and contact details of all trained first-aiders on site',
      'To demonstrate employer\'s commitment to health and safety and provide framework for action',
      'To set out the disciplinary procedure to be applied after a safety breach',
    ],
    correctAnswer: 2,
    explanation:
      "A health and safety policy demonstrates the employer's commitment and provides a framework for managing health and safety.",
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
  },
  {
    id: 28,
    question: 'What are the three main parts of a health and safety policy?',
    options: [
      'Statement of intent, organisation, and arrangements',
      'Policy, procedure, and enforcement',
      'Hazards, risks, and control measures',
      'Aims, objectives, and outcomes',
    ],
    correctAnswer: 0,
    explanation:
      'A health and safety policy consists of a statement of intent, organisation section (who does what), and arrangements section (how it is done).',
  },
  {
    id: 29,
    question: "What does 'so far as is reasonably practicable' mean?",
    options: [
      'Doing whatever is technically possible whatever the cost',
      'Balance the risk against the cost and effort of reducing it',
      'Following the cheapest available control measure every time',
      'Only acting once an accident has already occurred',
    ],
    correctAnswer: 1,
    explanation:
      'It means balancing the risk against the cost, time and effort needed to reduce or eliminate it.',
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
  },
  {
    id: 31,
    question: 'What is corporate manslaughter?',
    options: [
      "A civil claim brought by an injured employee for compensation",
      "A breach of contract between a client and a contractor",
      "An offence committed only by an individual director, never the firm",
      "A serious criminal offence where an organisation's failure causes death",
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
      'A fixed fine capped at £50,000 with no other sanction',
      'Imprisonment of the company secretary for up to two years',
      'Automatic dissolution of the company by the courts',
    ],
    correctAnswer: 0,
    explanation:
      'Penalties for corporate manslaughter include unlimited fines, remedial orders to address failures, and publicity orders.',
  },
  {
    id: 33,
    question: 'What must employers consult employees about?',
    options: [
      'The annual profit figures and future business strategy',
      'Health and safety measures, risks, preventive measures, competent persons',
      'Individual pay rates and contractual terms of each role',
      'The choice of suppliers and subcontractors for the project',
    ],
    correctAnswer: 1,
    explanation:
      'Employers must consult on health and safety measures, risks, preventive measures, and appointment of competent persons.',
  },
  {
    id: 34,
    question: 'What information must employers provide to employees?',
    options: [
      'The commercial value of each contract being undertaken on site',
      'A weekly summary of each worker individual productivity figures',
      'Health and safety information, risks, preventive measures, emergency procedures',
      'Personal medical records of every other employee working on site',
    ],
    correctAnswer: 2,
    explanation:
      'Employers must provide information on health and safety, risks, preventive measures, and emergency procedures.',
  },
  {
    id: 35,
    question: 'What is vicarious liability?',
    options: [
      'An employee personal liability for damaging company tools',
      'The duty of a client to insure every contractor on site',
      'A contractor liability for sub-contractors they did not hire',
      'Employer liability for acts of employees in the course of employment',
    ],
    correctAnswer: 3,
    explanation:
      'Vicarious liability means employers can be held liable for health and safety failures by their employees.',
  },
  {
    id: 36,
    question: 'What are the main enforcement powers of HSE inspectors?',
    options: [
      'Enter premises, examine, investigate, issue notices, prosecute',
      'Dismiss unsafe workers and appoint replacements on the spot',
      'Set the wages and working hours of site operatives',
      'Approve building designs before construction may begin',
    ],
    correctAnswer: 0,
    explanation:
      'HSE inspectors can enter premises, examine and investigate, issue improvement/prohibition notices, and prosecute.',
  },
  {
    id: 37,
    question: 'What is the difference between regulations and guidance?',
    options: [
      'Guidance is legally binding, regulations are only advisory',
      'Regulations are legally binding, guidance is advisory',
      'Both regulations and guidance are advisory best practice',
      'Both regulations and guidance carry the full force of law',
    ],
    correctAnswer: 1,
    explanation:
      'Regulations have legal force and must be followed, while guidance is advisory best practice.',
  },
  {
    id: 38,
    question: 'What is the purpose of health surveillance?',
    options: [
      'To screen out unfit workers before they are employed',
      'To record sickness absence for payroll purposes',
      'To detect health effects early and take preventive action',
      'To replace the need for control measures at source',
    ],
    correctAnswer: 2,
    explanation:
      'Health surveillance detects adverse health effects at an early stage so preventive action can be taken.',
  },
  {
    id: 39,
    question: 'When might health surveillance be required?',
    options: [
      "For every employee on starting any new job role",
      "Only after an accident has already caused harm",
      "Whenever an employee requests it for personal reasons",
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
      'To investigate accidents and report them to the HSE',
      'To carry out electrical inspection and testing of equipment',
      'To enforce health and safety law across the workplace',
    ],
    correctAnswer: 0,
    explanation:
      'Occupational health prevents work-related illness and injury and promotes worker health and wellbeing.',
  },
  {
    id: 41,
    question: 'What are absolute duties in health and safety law?',
    options: [
      'Duties that apply only to the employer, never the employee',
      'Duties that must be complied with regardless of cost or practicability',
      'Duties that can be met so far as is reasonably practicable',
      'Duties that only take effect once the HSE has been notified',
    ],
    correctAnswer: 1,
    explanation:
      "Absolute duties must be complied with regardless of cost - there are no qualifying words like 'reasonably practicable'.",
  },
  {
    id: 42,
    question: 'What is the significance of British Standards in health and safety?',
    options: [
      'They are legally binding statutes that override regulations',
      'They apply only to manufacturers, never to installers',
      'They provide recognised standards that can be used as evidence of good practice',
      'They are issued and enforced directly by HSE inspectors',
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
      'Foot to foot across the ground',
      'Hand to elbow on the same arm',
      'Fingertip to fingertip on one hand',
      'Hand to hand across the chest',
    ],
    correctAnswer: 3,
    explanation:
      'Hand to hand across the chest is most dangerous as current passes through the heart, potentially causing ventricular fibrillation.',
  },
  {
    id: 44,
    question: 'At what current level can electric shock become fatal?',
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
      'The make and model of the equipment involved',
      'Current, duration, path through body, frequency',
      'The time of day the contact occurs',
      'The colour of the cable insulation touched',
    ],
    correctAnswer: 1,
    explanation:
      'Shock severity depends on current magnitude, duration of contact, path through the body, and frequency.',
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
      'Switch off power supply or remove casualty using non-conductive material',
      'Grab the casualty firmly and pull them clear by the arm',
      'Throw water over the casualty to break the current',
      'Wait for the supply to trip before approaching them',
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
    question: 'At what current level do you lose muscular control (let-go threshold)?',
    options: [
      '5-10mA',
      '20-30mA',
      '10-20mA',
      '30-50mA',
    ],
    correctAnswer: 2,
    explanation: 'At 10-20mA, muscular control is lost and you cannot let go of the conductor.',
  },
  {
    id: 51,
    question: 'What happens at current levels of 50-100mA?',
    options: [
      'A barely perceptible tingling sensation',
      'Mild discomfort with no lasting effect',
      'A temporary loss of grip that quickly recovers',
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
      'AC always travels at a much higher voltage than DC',
      'AC cannot be protected against by an RCD or fuse',
      'AC produces far greater heat at the point of contact',
    ],
    correctAnswer: 0,
    explanation:
      'AC at 50Hz is particularly dangerous as it can cause muscular spasm and interfere with heart rhythm.',
  },
  {
    id: 53,
    question: 'What factors affect body resistance to electric current?',
    options: [
      'The phase rotation of the supply being touched',
      'Skin condition (wet/dry), contact area, voltage, frequency',
      'The age and make of the electrical equipment',
      'The earthing arrangement of the building only',
    ],
    correctAnswer: 1,
    explanation:
      'Body resistance varies with skin condition, contact area, applied voltage, current frequency and individual factors.',
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
  },
  {
    id: 57,
    question: 'What is an arc burn?',
    options: [
      'A burn caused by direct contact with a hot surface',
      'Burn caused by electric arc/flash producing intense heat',
      'A burn caused by friction against a moving conductor',
      'A burn caused only by chemical contact with electrolyte',
    ],
    correctAnswer: 1,
    explanation:
      'Arc burns are caused by electric arcs/flashes that can reach temperatures of around 20,000°C causing severe burns.',
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
      'Friction burns, cold burns, and chemical burns',
      'Sunburn, scalds, and radiation burns',
      'First-degree, second-degree, and third-degree only',
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
      'Apply butter or cream to the burn then bandage the area tightly',
      'Burst any blisters that form and rub the burn with antiseptic cream',
      'Leave the burn open to the air and apply ice directly to the skin',
    ],
    correctAnswer: 0,
    explanation:
      'Cool burns with cool running water for at least 20 minutes, cover with a sterile dressing, and seek medical attention.',
  },
  {
    id: 61,
    question: 'What makes electrical burns particularly dangerous?',
    options: [
      'They always heal faster than ordinary heat burns',
      'Internal damage may be extensive despite limited external signs',
      'They never require any medical attention at all',
      'They only affect the surface layers of the skin',
    ],
    correctAnswer: 1,
    explanation:
      "Electrical burns can cause extensive internal damage to organs and tissues that isn't visible externally.",
  },
  {
    id: 62,
    question: 'What immediate first aid should be given for electric shock?',
    options: [
      'Give them food and drink to restore their energy',
      'Sit them upright and leave them alone to recover',
      'Check for breathing/circulation, give CPR if needed, treat for shock',
      'Encourage them to walk around to keep the blood moving',
    ],
    correctAnswer: 2,
    explanation:
      'Check breathing and circulation, give CPR if required, treat for shock and get immediate medical help.',
  },
  {
    id: 63,
    question: 'Why should you never use water on electrical equipment during a fire?',
    options: [
      'Water reacts chemically with copper to form toxic fumes',
      'Water makes electrical fires spread far more quickly',
      'Water damages the equipment beyond economic repair',
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
      'The voltage drop along the length of a final circuit',
      'Voltage difference between feet when walking near earthed equipment',
      'The voltage induced in a parallel cable run',
      'The difference between supply and load voltage',
    ],
    correctAnswer: 1,
    explanation:
      'Step potential is the voltage difference between feet when walking on ground near earthed electrical equipment.',
  },
  {
    id: 66,
    question: 'What is touch potential?',
    options: [
      'The voltage measured across an open circuit breaker',
      'The minimum voltage needed to feel a shock',
      'Voltage between hand and feet when touching equipment',
      'The voltage between line and neutral at the socket',
    ],
    correctAnswer: 2,
    explanation:
      'Touch potential is the voltage difference between hand and feet when touching faulty electrical equipment.',
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
  },
  {
    id: 68,
    question: 'What is indirect contact?',
    options: [
      'Touching exposed metalwork that has become live due to a fault',
      'Touching a bare live conductor with a bare hand',
      'Receiving a shock through an arc without making contact',
      'Touching a conductor that is correctly insulated',
    ],
    correctAnswer: 0,
    explanation:
      'Indirect contact is touching exposed-conductive-parts (metalwork) that have become live due to an insulation fault.',
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
  },
  {
    id: 70,
    question: 'What is an RCD?',
    options: [
      'Rated Circuit Disconnector - limits overload current',
      'Resistance Calibration Device - measures earth resistance',
      'Residual Current Device - detects earth leakage currents',
      'Reduced Current Distributor - lowers the supply voltage',
    ],
    correctAnswer: 2,
    explanation:
      'An RCD (Residual Current Device) detects earth leakage (residual) currents and quickly disconnects the supply.',
  },
  {
    id: 71,
    question: 'How quickly should an RCD operate?',
    options: [
      'Within 1 second for 30mA types',
      'Within 5 seconds for 30mA types',
      'Within 400 milliseconds for 30mA types',
      'Within 40 milliseconds for 30mA types',
    ],
    correctAnswer: 3,
    explanation:
      'A 30mA RCD must operate within 40ms at a test current of 5× its rating (150mA), giving rapid disconnection for additional protection.',
  },
  {
    id: 72,
    question: 'What current should a standard RCD trip at?',
    options: [
      '30mA',
      '13mA',
      '100mA',
      '300mA',
    ],
    correctAnswer: 0,
    explanation:
      'RCDs providing additional protection trip at 30mA, which is below the level that causes ventricular fibrillation.',
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
  },
  {
    id: 75,
    question: 'What should you do before starting work on electrical equipment?',
    options: [
      'Assume it is dead if the main switch is off',
      'Touch the conductor briefly to check for a tingle',
      'Rely on the circuit label to confirm it is dead',
      'Prove the equipment is dead using an approved voltage tester',
    ],
    correctAnswer: 3,
    explanation:
      'Always prove equipment is dead using a properly functioning approved voltage tester before starting work.',
  },
  {
    id: 76,
    question: 'What is the purpose of proving the tester?',
    options: [
      'To ensure the tester is working before and after testing',
      'To calibrate the tester to the supply voltage',
      'To warm up the tester batteries before use',
      'To record the test reading for the certificate',
    ],
    correctAnswer: 0,
    explanation:
      "Proving the tester on a known live source (proving unit) before and after testing confirms it was working throughout - a fault could develop mid-test.",
  },
  {
    id: 77,
    question: 'What happens during ventricular fibrillation?',
    options: [
      'The heart stops completely and cannot be restarted',
      'Heart muscle fibres contract randomly, stopping effective pumping',
      'The heart rate slows down but keeps pumping normally',
      'The heart valves seize and block the flow of blood',
    ],
    correctAnswer: 1,
    explanation:
      'Ventricular fibrillation causes heart muscle fibres to contract randomly, stopping effective blood circulation.',
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
  },
  {
    id: 79,
    question: 'Why is 50Hz AC particularly dangerous?',
    options: [
      'It carries far more energy than DC at the same voltage',
      'It cannot be detected by a standard voltage tester',
      'It heats the conductor more quickly than DC does',
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
      'Hi-vis vest, hard hat and steel toe-caps',
      'Hearing protection and a dust mask',
      'Cut-resistant gloves and knee pads',
    ],
    correctAnswer: 0,
    explanation:
      'Insulated tools, rubber gloves, insulating mats and footwear provide protection against electric shock.',
  },
  {
    id: 81,
    question: "What voltage is considered 'extra low voltage'?",
    options: [
      'Up to 12V AC or 30V DC',
      'Up to 50V AC or 120V DC',
      'Up to 25V AC or 60V DC',
      'Up to 110V AC or 220V DC',
    ],
    correctAnswer: 1,
    explanation:
      'Extra low voltage (ELV) is not more than 50V AC or 120V DC between conductors or to earth.',
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
  },
  {
    id: 83,
    question: 'What precautions should be taken in wet conditions?',
    options: [
      'Increase the supply voltage to overcome resistance',
      'Work only with bare hands for better grip control',
      'Remove all RCD protection to avoid nuisance tripping',
      'Use reduced voltage supplies (110V or lower), RCD protection',
    ],
    correctAnswer: 3,
    explanation:
      'In wet conditions use reduced voltage supplies (110V centre-tapped or battery tools) and RCD protection.',
  },
  {
    id: 84,
    question: 'What makes someone more susceptible to electric shock?',
    options: [
      'Wet skin, medical conditions, fatigue, contact area',
      'Insulated footwear and rubber gloves worn on site',
      'A dry insulating mat under the person working',
      'Battery tools used in place of mains-powered ones',
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
      'To apportion blame after an accident has happened',
      'To identify hazards and evaluate risks to implement appropriate controls',
      'To record the cost of safety equipment for the project',
      'To satisfy the client without changing how work is done',
    ],
    correctAnswer: 1,
    explanation:
      'Risk assessment identifies hazards, evaluates risks and determines appropriate control measures to prevent harm.',
  },
  {
    id: 86,
    question: 'What are the five steps of risk assessment?',
    options: [
      'Plan, do, check, act, then report the findings to the enforcing authority',
      'Eliminate, substitute, isolate, control, protect, then review annually',
      'Identify hazards, decide who might be harmed, evaluate risks, record findings, review',
      'Assess, approve, authorise, audit, archive the completed paperwork',
    ],
    correctAnswer: 2,
    explanation:
      'The HSE five steps are: identify hazards, decide who might be harmed, evaluate risks, record findings, and review regularly.',
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
  },
  {
    id: 88,
    question: 'What is risk?',
    options: [
      'The likelihood that a hazard will cause harm and the severity of that harm',
      'Anything present in the workplace with the potential to cause harm',
      'The control measure used to remove a hazard from the workplace',
      'The number of people present in a work area at any one time',
    ],
    correctAnswer: 0,
    explanation:
      'Risk is the likelihood that a hazard will cause harm, combined with the severity of potential harm.',
  },
  {
    id: 89,
    question: 'What is the hierarchy of control measures?',
    options: [
      'PPE, training, procedures, engineering controls, then elimination',
      'Elimination, substitution, engineering controls, administrative controls, PPE',
      'Planning, implementing, monitoring, reviewing and auditing controls',
      'Identification, evaluation, control, monitoring and record keeping',
    ],
    correctAnswer: 1,
    explanation:
      'The hierarchy is: elimination, substitution, engineering controls, administrative controls, and PPE as last resort.',
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
  },
  {
    id: 91,
    question: 'When should risk assessments be reviewed?',
    options: [
      'Once only, at the point the work first begins',
      'When the HSE or an insurer asks to see a copy',
      'At the end of each project, before handover',
      'Regularly, after incidents, when changes occur',
    ],
    correctAnswer: 3,
    explanation:
      'Risk assessments should be reviewed regularly, after incidents, accidents, or when significant changes occur.',
  },
  {
    id: 92,
    question: 'Who should carry out risk assessments?',
    options: [
      'Competent person with knowledge of the work and hazards',
      'Any available worker regardless of experience',
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
      'The cost of every tool and material used',
      'Significant findings, people at risk, control measures',
      'The names of all the clients on the project',
      'A full transcript of every toolbox talk held',
    ],
    correctAnswer: 1,
    explanation:
      'Written records should be kept of significant findings, people at risk, and control measures implemented.',
  },
  {
    id: 94,
    question: 'What is a method statement?',
    options: [
      'A list of the hazards present on a site',
      'A record of accidents that have occurred',
      'A document describing how work will be carried out safely',
      'A schedule of the materials needed for a job',
    ],
    correctAnswer: 2,
    explanation:
      'A method statement describes the sequence of operations and safety measures for carrying out specific work.',
  },
  {
    id: 95,
    question: 'What should a method statement include?',
    options: [
      'The names and trade qualifications of the workers carrying out the job',
      'The start and finish dates of the work and the agreed programme',
      'The cost breakdown and priced schedule of works for the client',
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
      'The client and their architect only',
      'Apprentices working without supervision',
      'The HSE inspector for the region',
    ],
    correctAnswer: 0,
    explanation:
      'Method statements should involve competent persons, supervisors and experienced workers who understand the work.',
  },
  {
    id: 97,
    question: 'When are method statements typically required?',
    options: [
      'For every task on site, however small or routine it is',
      'For high-risk activities, complex work, CDM projects',
      'After an accident has occurred, as part of the investigation',
      'Whenever the client asks for one in the contract documents',
    ],
    correctAnswer: 1,
    explanation:
      'Method statements are typically required for high-risk activities, complex work and construction projects under CDM.',
  },
  {
    id: 98,
    question: 'What is the relationship between risk assessment and method statements?',
    options: [
      'They are two different names for the same document',
      'The method statement must always be written first',
      'Risk assessment identifies risks, method statement describes control measures',
      'A method statement removes the need for a risk assessment',
    ],
    correctAnswer: 2,
    explanation:
      'Risk assessments identify hazards and risks; method statements describe how to control those risks during work.',
  },
  {
    id: 99,
    question: 'What factors should be considered when assessing who might be harmed?',
    options: [
      'The directly employed workforce named on the timesheet',
      'The person carrying out the task and their supervisor',
      'Anyone who has signed the risk assessment record',
      'Workers, visitors, contractors, public, special groups',
    ],
    correctAnswer: 3,
    explanation:
      'Consider all who might be affected: workers, visitors, contractors, public, and special groups like pregnant women.',
  },
  {
    id: 100,
    question: 'What special considerations apply to young workers?',
    options: [
      'Lack experience, may take risks, physical development incomplete',
      'They are exempt from wearing personal protective equipment',
      'They do not need to attend a site induction',
      'They are legally barred from all construction sites',
    ],
    correctAnswer: 0,
    explanation:
      'Young workers lack experience, may be more willing to take risks, and their physical development may be incomplete.',
  },
  {
    id: 101,
    question: 'What considerations apply to pregnant workers?',
    options: [
      'They must be removed from the workplace entirely',
      'Certain hazards pose additional risks to mother and unborn child',
      'No special consideration is required at any stage',
      'They must provide their own protective equipment',
    ],
    correctAnswer: 1,
    explanation:
      'Pregnancy may increase risks from certain hazards, requiring additional controls to protect mother and child.',
  },
  {
    id: 102,
    question: "What is meant by 'reasonably foreseeable'?",
    options: [
      'Events that have already happened on a previous project',
      'Any event at all, however unlikely or far-fetched it may be',
      'Events that are likely to happen or could reasonably be expected',
      'Events specifically listed in the manufacturer instructions',
    ],
    correctAnswer: 2,
    explanation:
      'Reasonably foreseeable means events that are likely to happen or could reasonably be expected in the circumstances.',
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
      'Reusing one generic assessment across all of the firm sites',
      'Ongoing assessment of changing conditions during work',
      'An assessment carried out only by senior management',
    ],
    correctAnswer: 2,
    explanation:
      'Dynamic risk assessment is the ongoing process of assessing changing conditions and new hazards during work.',
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
  },
  {
    id: 108,
    question: 'What is a generic risk assessment?',
    options: [
      'General assessment covering similar activities that can be adapted',
      'An assessment tailored to one specific site only',
      'An assessment carried out during the work itself',
      'An assessment required only on CDM projects',
    ],
    correctAnswer: 0,
    explanation:
      'Generic risk assessments cover similar activities and can be adapted for specific situations and locations.',
  },
  {
    id: 109,
    question: 'What is a site-specific risk assessment?',
    options: [
      'A general assessment used across many sites',
      'Assessment tailored to specific site conditions and hazards',
      'An assessment completed only during the work',
      'An assessment carried out by the client',
    ],
    correctAnswer: 1,
    explanation:
      'Site-specific risk assessments are tailored to the particular conditions, hazards and constraints of a specific location.',
  },
  {
    id: 110,
    question: 'What information should be communicated to workers?',
    options: [
      'The commercial value of the contract being undertaken',
      'The personal details of other workers on the project',
      'Relevant findings of risk assessment and control measures required',
      'The disciplinary record of their supervisor',
    ],
    correctAnswer: 2,
    explanation:
      'Workers must be informed of relevant risk assessment findings and the control measures they need to follow.',
  },
  {
    id: 111,
    question: 'What is the purpose of consultation in risk assessment?',
    options: [
      'To transfer legal responsibility onto the workers',
      'To reduce the cost of carrying out the assessment',
      'To satisfy the client without changing the work',
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
      'Continue working and accept the residual risk',
      'Remove the risk assessment from the records',
      'Wait until the next scheduled annual review',
    ],
    correctAnswer: 0,
    explanation:
      "If control measures aren't effective, the risk assessment should be reviewed and control measures revised.",
  },
  {
    id: 113,
    question: 'What is residual risk?',
    options: [
      'The total risk before any controls are applied',
      'Risk remaining after control measures have been implemented',
      'The risk transferred to a contractor by the client',
      'The risk that only affects members of the public',
    ],
    correctAnswer: 1,
    explanation:
      'Residual risk is the risk remaining after control measures have been implemented - it should be ALARP.',
  },
  {
    id: 114,
    question: 'What factors affect the acceptability of risk?',
    options: [
      'The personal preference of the worker carrying out the task',
      'The time of day and the weather in which the work is carried out',
      'Benefits, costs, public perception, legal requirements, available alternatives',
      'The size and annual turnover of the company carrying out the work',
    ],
    correctAnswer: 2,
    explanation:
      'Risk acceptability depends on benefits, costs, public perception, legal requirements and available alternatives.',
  },
  {
    id: 115,
    question: 'What is tolerable risk?',
    options: [
      'Risk that must always be eliminated whatever the cost involved',
      'Risk that no longer needs to be monitored or reviewed at all',
      'Risk that only the employer, not the worker, is allowed to accept',
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
      'Accident reporting procedures, first-aid duties and fire marshal roles',
      'Manual handling techniques, kinetic lifting and load weight limits',
      'COSHH labelling, safety data sheets and chemical storage arrangements',
    ],
    correctAnswer: 0,
    explanation:
      'Training should cover hazard identification, risk evaluation techniques, control measures and review processes.',
  },
  {
    id: 117,
    question: 'How often should method statements be reviewed?',
    options: [
      'Once only, before the work starts on site',
      'When conditions change, after incidents, regularly',
      'At the request of the client or main contractor',
      'At the very end of the project, before handover',
    ],
    correctAnswer: 1,
    explanation:
      'Method statements should be reviewed when conditions change, after incidents, and as part of regular review.',
  },
  {
    id: 118,
    question: 'What is the role of supervision in risk control?',
    options: [
      'To replace the need for any control measures',
      'To complete the paperwork on behalf of workers',
      'Ensure control measures are followed and remain effective',
      'To carry out the high-risk work personally',
    ],
    correctAnswer: 2,
    explanation:
      'Supervision ensures control measures are properly implemented, followed and remain effective.',
  },
  {
    id: 119,
    question: 'What should be done with lessons learned from incidents?',
    options: [
      'File them away without any further action',
      'Use them only to discipline those involved',
      'Share them only with the HSE inspector',
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
      'Formal system to control high-risk work through written permission',
      'A licence allowing a worker onto a construction site',
      'A verbal agreement between two trades on site',
      'A record of the hours each worker has completed',
    ],
    correctAnswer: 0,
    explanation:
      'Permit to work is a formal system controlling high-risk work through written permission and defined procedures.',
  },
  {
    id: 121,
    question: 'When might permit to work systems be used?',
    options: [
      'For all routine low-risk maintenance tasks carried out on site',
      'For high-risk work like confined spaces, hot work, electrical isolation',
      'For any work carried out by a subcontractor rather than direct labour',
      'For recording attendance at site inductions and toolbox talks',
    ],
    correctAnswer: 1,
    explanation:
      'Permit to work systems are used for high-risk activities like confined space entry, hot work, and electrical isolation.',
  },
  {
    id: 122,
    question: 'What should be monitored during risk assessment implementation?',
    options: [
      'The cost of the control measures against the original budget',
      'The number of workers present on site each day of the works',
      'Effectiveness of control measures, changing conditions, worker compliance',
      'Accident book entries and lost-time figures recorded since work began',
    ],
    correctAnswer: 2,
    explanation:
      'Monitor control measure effectiveness, changing conditions, worker compliance and any new hazards arising.',
  },
  {
    id: 123,
    question: 'What makes a good risk assessment?',
    options: [
      'Long, detailed and covering every conceivable hazard',
      'Written only in technical language for specialists',
      'Completed once and never changed again',
      'Practical, clear, focused on significant risks, regularly reviewed',
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
      'A method of blaming workers for accidents',
      'A test of a worker physical fitness for a task',
      'A check of how many hours a worker has done',
    ],
    correctAnswer: 0,
    explanation:
      'Human error analysis systematically examines how and why people make mistakes to prevent future errors.',
  },
  {
    id: 125,
    question: 'What factors contribute to human error?',
    options: [
      'The personality and attitude of the individual worker alone',
      'Personal factors, job factors, organisational factors, environmental factors',
      'The age and length of experience of the worker concerned',
      'The weather conditions and temperature on the day of the work',
    ],
    correctAnswer: 1,
    explanation:
      'Human error results from personal, job, organisational and environmental factors that should all be considered.',
  },
  {
    id: 126,
    question: 'How can the likelihood of human error be reduced?',
    options: [
      'By increasing working hours to build experience',
      'By relying solely on disciplinary action',
      'Good design, training, procedures, culture, and learning from mistakes',
      'By removing all supervision so workers self-manage',
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
      'As the first and preferred control measure for any hazard',
      'Whenever a worker personally requests it from the storeman',
      'During any HSE inspection or client safety audit of the site',
    ],
    correctAnswer: 0,
    explanation:
      'PPE should be used as a last resort when other control measures cannot adequately reduce the risk.',
  },
  {
    id: 129,
    question: 'What are the main types of head protection?',
    options: [
      'Safety glasses, goggles and face shields',
      'Hard hats, bump caps, hair nets',
      'Ear plugs, ear muffs and ear defenders',
      'Filtering facepieces and dust masks',
    ],
    correctAnswer: 1,
    explanation:
      'Head protection includes hard hats for impact protection, bump caps for minor hazards, and hair nets for hygiene.',
  },
  {
    id: 130,
    question: 'When should safety helmets be worn?',
    options: [
      'When working at height above two metres from ground level',
      'When the client specifically requests it in the contract',
      'Where there is risk of head injury from falling objects or impact',
      'When carrying out hot work or using power tools on site',
    ],
    correctAnswer: 2,
    explanation:
      'Safety helmets should be worn wherever there is risk of head injury from falling objects or impact.',
  },
  {
    id: 131,
    question: 'What types of eye protection are available?',
    options: [
      'Hard hats, bump caps and hair nets',
      'Ear plugs, ear muffs and semi-insert protectors',
      'Cut-resistant gloves and chemical-resistant gloves',
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
      'When there\'s risk from flying particles, chemicals, radiation, or bright light',
      'When working outdoors in bright sunlight or reflected glare',
      'Whenever a task is expected to last longer than one working hour',
      'When working at height on a scaffold or a mobile tower platform',
    ],
    correctAnswer: 0,
    explanation:
      'Eye protection is needed for risks from flying particles, chemicals, harmful radiation or bright light.',
  },
  {
    id: 133,
    question: 'What are the main types of hearing protection?',
    options: [
      'Safety glasses, goggles and face shields',
      'Ear plugs, ear muffs, semi-insert protectors',
      'Filtering facepieces and powered respirators',
      'Hard hats, bump caps and hair nets',
    ],
    correctAnswer: 1,
    explanation:
      'Hearing protection includes disposable/reusable ear plugs, ear muffs and semi-insert protectors.',
  },
  {
    id: 134,
    question: 'At what noise level is hearing protection typically required?',
    options: [
      '100 dB(A) and above',
      '90 dB(A) and above',
      '85 dB(A) and above',
      'Any noise level',
    ],
    correctAnswer: 2,
    explanation:
      'Hearing protection is typically required at noise levels of 85 dB(A) and above to prevent hearing damage.',
  },
  {
    id: 135,
    question: 'What types of respiratory protection are available?',
    options: [
      'Safety glasses, goggles, face shields and welding screens for arc work',
      'Ear plugs, ear muffs, semi-insert protectors and acoustic booths',
      'Hard hats, bump caps, high-visibility vests and fall-arrest harnesses',
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
      'When there\'s risk from dust, fumes, gases, vapours, or oxygen deficiency',
      'When working outdoors in cold or wet weather conditions',
      'When working close to loud machinery or percussive power tools',
      'When there is a risk of objects falling from scaffolds above',
    ],
    correctAnswer: 0,
    explanation:
      'Respiratory protection is needed for airborne hazards like dust, fumes, gases, vapours or oxygen deficiency.',
  },
  {
    id: 137,
    question: 'What are the main types of hand protection?',
    options: [
      'Safety glasses, goggles, face shields and welding screens for arc work',
      'Cut-resistant gloves, chemical-resistant gloves, thermal gloves, electrical gloves',
      'Ear plugs, ear muffs, semi-insert protectors and acoustic booths',
      'Filtering facepieces, half masks, powered respirators and airline sets',
    ],
    correctAnswer: 1,
    explanation:
      'Hand protection includes cut-resistant, chemical-resistant, thermal and electrical insulating gloves.',
  },
  {
    id: 138,
    question: 'When should hand protection be worn?',
    options: [
      'When handling heavy loads by hand or lifting awkward items',
      'When the task is expected to last more than one working hour',
      'When there\'s risk of cuts, chemical contact, burns, or electrical shock',
      'When working in cold outdoor conditions during winter months',
    ],
    correctAnswer: 2,
    explanation:
      "Hand protection should be worn when there's risk of cuts, chemical contact, burns or electrical shock.",
  },
  {
    id: 139,
    question: 'What types of foot protection are available?',
    options: [
      'Cut-resistant gloves, thermal gloves and chemical-resistant gauntlets',
      'Filtering facepieces, powered respirators and airline breathing sets',
      'Hard hats, bump caps, hair nets and chin straps for work at height',
      'Safety shoes/boots with toe protection, puncture resistance, electrical insulation',
    ],
    correctAnswer: 3,
    explanation:
      'Foot protection includes safety shoes/boots with various features like toe protection, puncture resistance, electrical insulation.',
  },
  {
    id: 140,
    question: 'When should safety footwear be worn?',
    options: [
      'Where there\'s risk of falling objects, puncture wounds, slips, electrical hazards',
      'Where the ground underfoot is wet or muddy and footing may be lost',
      'Where site rules require it, but not when working in a domestic property',
      'When carrying loads up and down ladders or unfinished stair flights',
    ],
    correctAnswer: 0,
    explanation:
      'Safety footwear protects against falling objects, puncture wounds, slips, trips and electrical hazards.',
  },
  {
    id: 141,
    question: 'What are high-visibility garments used for?',
    options: [
      'To protect the wearer from chemical splashes',
      'To make the wearer visible in poor light or near moving vehicles',
      'To insulate the wearer against electric shock',
      'To keep the wearer warm in cold conditions',
    ],
    correctAnswer: 1,
    explanation:
      'High-visibility garments make workers visible in poor light conditions or when working near moving vehicles.',
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
  },
  {
    id: 143,
    question: 'Who is responsible for providing PPE?',
    options: [
      'Employees, who must buy their own',
      'The main contractor only on CDM sites',
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
      'The HSE, who inspect PPE on every site',
      'The manufacturer, who maintains it remotely',
      'The client, who supervises its daily use',
    ],
    correctAnswer: 0,
    explanation:
      'Employees are responsible for using PPE correctly, looking after it and reporting any defects.',
  },
  {
    id: 145,
    question: 'What factors should be considered when selecting PPE?',
    options: [
      'The cheapest option available from the merchant that day',
      'Nature of hazard, compatibility, comfort, fit, maintenance requirements',
      'The colour and general appearance preferred by the worker',
      'The brand most widely advertised in the trade press and catalogues',
    ],
    correctAnswer: 1,
    explanation:
      'PPE selection should consider hazard type, compatibility with other PPE, comfort, fit and maintenance needs.',
  },
  {
    id: 146,
    question: 'Why is PPE fit important?',
    options: [
      'A good fit makes the PPE last longer financially',
      'Fit only matters for respiratory protection',
      'Ill-fitting PPE may not provide adequate protection',
      'Fit has no effect on the level of protection given',
    ],
    correctAnswer: 2,
    explanation:
      'Properly fitted PPE is essential for effective protection - ill-fitting equipment may not provide adequate protection.',
  },
  {
    id: 147,
    question: 'What training should be provided for PPE use?',
    options: [
      'How to put the PPE on and take it off correctly',
      'The cost of the PPE and how to order replacements',
      'The British Standard each item of PPE complies with',
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
      'Left in place permanently and never replaced',
      'Cleaned only once at the end of a project',
      'Shared between workers without any cleaning',
    ],
    correctAnswer: 0,
    explanation:
      'PPE requires regular cleaning, inspection for damage and replacement when worn out or damaged.',
  },
  {
    id: 149,
    question: 'How should PPE be stored?',
    options: [
      'In direct sunlight to keep it dry',
      'Clean, dry place away from contamination and damage',
      'Loose in the bottom of a tool bag',
      'Anywhere convenient on the work area',
    ],
    correctAnswer: 1,
    explanation:
      'PPE should be stored in clean, dry conditions away from contamination and potential damage.',
  },
  {
    id: 150,
    question: 'What should workers do if PPE is damaged?',
    options: [
      'Carry on using it until the job is finished',
      'Repair it themselves with tape and continue',
      'Report damage and stop using until replaced',
      'Pass it to another worker to use instead',
    ],
    correctAnswer: 2,
    explanation:
      'Damaged PPE should be reported immediately and not used until properly repaired or replaced.',
  },
  {
    id: 151,
    question: 'Why should workers be involved in PPE selection?',
    options: [
      'It removes the employer legal duty to provide suitable PPE',
      'It transfers the cost of the PPE onto the workers themselves',
      'It speeds up the purchasing process and reduces paperwork',
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
      'Only protects the individual, can fail, may give false sense of security',
      'It removes the hazard at its source completely and permanently',
      'It protects everyone working in the immediate area at the same time',
      'It needs no maintenance, inspection or replacement once issued',
    ],
    correctAnswer: 0,
    explanation:
      'PPE only protects the individual wearer, can fail, and may give a false sense of security if used incorrectly.',
  },
  {
    id: 153,
    question: 'What is meant by PPE compatibility?',
    options: [
      'All PPE is supplied by the same manufacturer',
      'Different types of PPE work together without reducing protection',
      'PPE fits every worker without adjustment',
      'PPE can be reused by different workers safely',
    ],
    correctAnswer: 1,
    explanation:
      'PPE compatibility means different types can be worn together without one reducing the effectiveness of another.',
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
  },
  {
    id: 155,
    question: 'What documentation should be kept for PPE?',
    options: [
      'The purchase receipt and delivery note for the equipment',
      'The British Standard number and conformity mark of each item',
      'The name of the manufacturer and the country of origin',
      'Issue records, training records, inspection records, maintenance records',
    ],
    correctAnswer: 3,
    explanation:
      'Records should include PPE issue, training provided, inspections carried out and maintenance performed.',
  },
  {
    id: 156,
    question: 'What is personal protective equipment assessment?',
    options: [
      'Systematic evaluation to select suitable PPE for specific hazards',
      'A check of how much the PPE programme costs',
      'A test of whether workers like wearing the PPE',
      'A count of how many items are held in stock',
    ],
    correctAnswer: 0,
    explanation:
      'PPE assessment systematically evaluates hazards and selects appropriate equipment to provide adequate protection.',
  },
  {
    id: 157,
    question: 'When should PPE be replaced?',
    options: [
      'At the end of every calendar year as part of the stock check',
      'When damaged, worn out, or manufacturer\'s expiry date reached',
      'When it is reissued to a different worker on the same site',
      'When an HSE inspector or client auditor requires replacement',
    ],
    correctAnswer: 1,
    explanation:
      "PPE should be replaced when damaged, worn beyond safe use, or when manufacturer's expiry date is reached.",
  },
  {
    id: 158,
    question: 'What factors affect PPE effectiveness?',
    options: [
      'The brand, purchase price and warranty of the equipment',
      'The colour coding used to identify each trade on site',
      'Correct selection, proper use, good maintenance, adequate training',
      'How recently the PPE was purchased from the supplier',
    ],
    correctAnswer: 2,
    explanation:
      'PPE effectiveness depends on correct selection for hazards, proper use, good maintenance and adequate user training.',
  },
  {
    id: 159,
    question: 'What is the role of supervisors in PPE management?',
    options: [
      'To purchase all PPE personally on behalf of the workers',
      'To carry out the annual PPE stock-take and reorder supplies',
      'To sign the PPE issue register on the worker behalf',
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
      'Wash it together with the worker ordinary work clothes',
      'Reissue it directly to the next worker on the same job',
      'Leave it on site in the stores for general use by anyone',
    ],
    correctAnswer: 0,
    explanation:
      'Contaminated PPE requires safe decontamination or disposal according to specific procedures for the contaminant type.',
  },
  {
    id: 161,
    question: 'What are the categories of PPE?',
    options: [
      'Class A, Class B, Class C and Class D by protection level',
      'Category I (simple), Category II (intermediate), Category III (complex)',
      'Type 1, Type 2 and Type 3 according to the hazard faced',
      'Light duty, medium duty and heavy duty by work intensity',
    ],
    correctAnswer: 1,
    explanation:
      'PPE is categorised as Category I (simple/minimal risk), Category II (intermediate), or Category III (complex/serious risk).',
  },
  {
    id: 162,
    question: "What requires special consideration for electrical workers' PPE?",
    options: [
      'High-visibility colours for night working',
      'Lightweight materials for working at height',
      'Electrical insulation properties and arc flash protection',
      'Waterproof materials for outdoor working',
    ],
    correctAnswer: 2,
    explanation:
      'Electrical workers need PPE with electrical insulation properties and protection against arc flash hazards.',
  },
  {
    id: 163,
    question: 'What is arc flash protection?',
    options: [
      'Protection against falling objects from height',
      'Protection against loud noise from machinery',
      'Protection against airborne dust and fumes',
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
      'Once, at the time of manufacture and before dispatch',
      'When they show visible signs of wear or discolouration',
      'At the end of their stated service life before disposal',
    ],
    correctAnswer: 0,
    explanation:
      'Electrical insulating gloves must be tested before issue, regularly during use, and after any suspected damage.',
  },
  {
    id: 165,
    question: 'What is the purpose of PPE marking and labelling?',
    options: [
      'Show the purchase price and the supplier of the equipment',
      'Identify PPE type, performance standards, limitations, expiry dates',
      'Show which worker the item has been allocated to and when',
      'Display the company logo and the site contact details',
    ],
    correctAnswer: 1,
    explanation:
      'Marking identifies PPE type, performance standards met, limitations and expiry dates for safe use.',
  },
  {
    id: 166,
    question: 'How should PPE information be communicated to workers?',
    options: [
      'A single notice pinned to the site noticeboard at the gate',
      'Word of mouth passed between workers as they start work',
      'Training, written instructions, demonstrations, ongoing reinforcement',
      'The supplier delivery note and printed data sheet alone',
    ],
    correctAnswer: 2,
    explanation:
      'PPE information should be communicated through training, written instructions, demonstrations and ongoing reinforcement.',
  },
  {
    id: 167,
    question: 'What role does comfort play in PPE effectiveness?',
    options: [
      'Comfort has no bearing on PPE effectiveness',
      'Comfortable PPE offers less protection than rigid PPE',
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
      'Purchasing and issuing the equipment to each worker on site',
      'Safe disposal of worn-out equipment and used filters',
      'An annual stock-take of the equipment held in the stores',
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
      'Attend site induction and safety briefing',
      'Find the nearest welfare facilities first',
      'Begin unloading your tools and materials',
    ],
    correctAnswer: 1,
    explanation:
      'Site induction provides essential safety information specific to that site and must be completed before starting work.',
  },
  {
    id: 170,
    question: 'What information should be covered in a site induction?',
    options: [
      'The location of the site canteen, toilets and drying room',
      'The names of the management team and the site telephone list',
      'Site layout, hazards, emergency procedures, site rules, welfare facilities',
      'The working hours, break times and overtime arrangements',
    ],
    correctAnswer: 2,
    explanation:
      'Site induction should cover site layout, specific hazards, emergency procedures, site rules and welfare facilities.',
  },
  {
    id: 171,
    question: 'What is a construction phase plan?',
    options: [
      'A schedule showing when each trade will be working on site',
      'A breakdown of the project costs, budget and monthly cash flow',
      'A list of the materials to be delivered to site each week',
      'Document setting out health and safety arrangements for construction phase',
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
      'Tool stores, material racks, waste skips and secure lock-ups',
      'Toilets, washing facilities, drinking water, rest areas, changing rooms',
      'Fire extinguishers, alarms, emergency lighting and escape routes',
      'Site office, drawing store, meeting room and visitor parking',
    ],
    correctAnswer: 1,
    explanation:
      'Welfare facilities should include toilets, washing facilities, drinking water, rest areas and changing rooms.',
  },
  {
    id: 174,
    question: 'What is the purpose of site security?',
    options: [
      'To monitor worker productivity and record attendance times',
      'To control the cost of materials held on site each week',
      'Prevent unauthorised access, protect workers and public, secure materials',
      'To record deliveries arriving at the gate and check invoices',
    ],
    correctAnswer: 2,
    explanation:
      'Site security prevents unauthorised access, protects workers and the public, and secures materials and equipment.',
  },
  {
    id: 175,
    question: 'What housekeeping practices improve site safety?',
    options: [
      'Tools left out on the floor for quick access',
      'Materials stacked in the walkways for convenience',
      'A single clean-up carried out at the end of the project',
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
      'Reduces the need to wear personal protective equipment',
      'Removes the requirement to carry out risk assessments',
      'Allows more materials to be stored on the floor',
    ],
    correctAnswer: 0,
    explanation:
      'Good housekeeping reduces trip and fall hazards, fire risks and creates better working conditions.',
  },
  {
    id: 177,
    question: 'What are the main causes of slips, trips and falls on construction sites?',
    options: [
      'Working at height without a harness or edge protection fitted',
      'Poor housekeeping, uneven surfaces, inadequate lighting, unsuitable footwear',
      'Exposure to loud noise and to hand-arm vibration from power tools',
      'Contact with hazardous chemical substances and wet cement',
    ],
    correctAnswer: 1,
    explanation:
      'Slips, trips and falls result from poor housekeeping, uneven surfaces, inadequate lighting and unsuitable footwear.',
  },
  {
    id: 178,
    question: 'How can slips, trips and falls be prevented?',
    options: [
      'High-visibility clothing and gloves worn by everyone at all times',
      'A safety harness and lanyard issued to every worker on the site',
      'Good housekeeping, proper lighting, suitable surfaces, appropriate footwear',
      'Warning signs posted at the site entrance and the welfare unit',
    ],
    correctAnswer: 2,
    explanation:
      'Prevention requires good housekeeping, adequate lighting, suitable walking surfaces and appropriate footwear.',
  },
  {
    id: 179,
    question: 'What is the purpose of site signage?',
    options: [
      'To advertise the company carrying out the work to passing traffic',
      'To record the names of everyone who has signed in to the site',
      'To display the project programme, deadlines and progress charts',
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
      'Permanent, temporary, mobile and fixed signs',
      'Small, medium, large and extra-large signs',
      'Indoor, outdoor, high-level and low-level signs',
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
      'Report immediately to supervisor and make area safe if possible',
      'Carry on working and report it at the end of the day',
      'Note it in the site diary for the next weekly inspection',
      'Try to repair the problem yourself without telling anyone',
    ],
    correctAnswer: 0,
    explanation:
      'Unsafe conditions should be reported immediately and the area made safe if possible without creating further risk.',
  },
  {
    id: 185,
    question: 'What is a toolbox talk?',
    options: [
      'A storage box for shared site tools',
      'Short safety discussion on specific topics relevant to current work',
      'A formal disciplinary meeting with a supervisor',
      'A daily record of tools issued to each worker',
    ],
    correctAnswer: 1,
    explanation:
      'Toolbox talks are short, focused safety discussions on topics relevant to current work activities.',
  },
  {
    id: 186,
    question: 'How often should toolbox talks be held?',
    options: [
      'Once at the start of a project, during the site induction',
      'After an accident has occurred, as part of the follow-up',
      'Regularly, often weekly or before specific high-risk activities',
      'When the HSE inspector or client auditor visits the site',
    ],
    correctAnswer: 2,
    explanation:
      'Toolbox talks should be held regularly, often weekly, and before specific high-risk activities.',
  },
  {
    id: 187,
    question: 'What is the purpose of site inspections?',
    options: [
      'To record material deliveries arriving at the site gate',
      'To measure worker productivity and output each day',
      'To check the quality of completed work before handover',
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
      'Any apprentice, as part of their first-day site induction',
      'The client and their professional advisers, but no one else',
      'The HSE inspector alone, during an unannounced routine visit',
    ],
    correctAnswer: 0,
    explanation:
      'Site inspections should be carried out by competent persons including supervisors, safety representatives and managers.',
  },
  {
    id: 189,
    question: 'What should be done with findings from site inspections?',
    options: [
      'File them away without any further action',
      'Act on findings, prioritise by risk, monitor progress',
      'Send them only to the client for information',
      'Wait until the next inspection before acting',
    ],
    correctAnswer: 1,
    explanation:
      'Inspection findings should be acted upon, prioritised by risk level and progress monitored until completion.',
  },
  {
    id: 190,
    question: 'What is the role of the site safety representative?',
    options: [
      'To enforce safety law and issue prohibition notices',
      'To carry out all site risk assessments single-handedly',
      'Represent workers on safety matters and investigate concerns',
      'To provide and maintain all site first-aid equipment',
    ],
    correctAnswer: 2,
    explanation:
      'Safety representatives represent workers on safety matters, investigate concerns and participate in consultations.',
  },
  {
    id: 191,
    question: 'What powers do safety representatives have on site?',
    options: [
      'Dismiss workers who repeatedly breach the site safety rules',
      'Issue improvement and prohibition notices to the employer',
      'Prosecute the employer in the magistrates court directly',
      'Investigate accidents, inspect workplace, be consulted on safety matters',
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
      'Needed mainly when the supervisor is away from the site',
      'Important for the management team rather than operatives',
      'Required during the site induction and nowhere else',
    ],
    correctAnswer: 0,
    explanation:
      'Good communication is essential for work coordination, safety information sharing and effective emergency response.',
  },
  {
    id: 193,
    question: 'How should hazardous substances be stored on site?',
    options: [
      'Anywhere on site provided the containers are kept closed',
      'Secure, ventilated areas with appropriate containment and labelling',
      'In the same lockable store as food and drinking water',
      'Loose in the back of an open van between site visits',
    ],
    correctAnswer: 1,
    explanation:
      'Hazardous substances need secure, well-ventilated storage with appropriate containment and clear labelling.',
  },
  {
    id: 194,
    question: 'What information should be available for hazardous substances?',
    options: [
      'The purchase receipt, order number and supplier details',
      'The quantity remaining in each container on the shelf',
      'Safety data sheets with hazard information and control measures',
      'A photograph of the container label kept in the office',
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
      'The cost of replacing hazardous substances with safer ones',
      'The names of workers who handle hazardous substances',
      'The supplier and delivery date of each substance',
    ],
    correctAnswer: 0,
    explanation:
      'COSHH assessments identify hazardous substances, exposure routes, health effects and necessary control measures.',
  },
  {
    id: 197,
    question: 'What are the main routes of entry for chemicals into the body?',
    options: [
      'Breathing in vapours and dusts while working',
      'Inhalation, ingestion, skin/eye contact, injection',
      'Swallowing after handling food with dirty hands',
      'Contact with unprotected skin and the eyes',
    ],
    correctAnswer: 1,
    explanation:
      'Chemicals can enter the body through inhalation, ingestion, skin/eye contact and injection through wounds.',
  },
  {
    id: 198,
    question: 'What environmental hazards might be found on construction sites?',
    options: [
      'Electric shock from buried cables and overhead lines',
      'Falls from height from scaffolds, ladders and openings',
      'Noise, dust, vibration, weather conditions, contaminated ground',
      'Slips, trips and falls on the same level around the site',
    ],
    correctAnswer: 2,
    explanation:
      'Environmental hazards include noise, dust, vibration, adverse weather conditions and contaminated ground.',
  },
  {
    id: 199,
    question: 'How should environmental hazards be managed?',
    options: [
      'By recording them in the site diary and reviewing annually',
      'By dealing with them once an incident has been reported',
      'By transferring all responsibility to the principal designer',
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
      'Mark the boundary for the project programme',
      'Provide somewhere to display advertising banners',
      'Keep the weather off stored materials',
    ],
    correctAnswer: 0,
    explanation:
      'Perimeter fencing prevents unauthorised access and protects the public from construction hazards.',
  },
  {
    id: 201,
    question: 'What considerations apply to site access and egress?',
    options: [
      'The shortest possible route regardless of safety',
      'Safe routes, adequate width, good visibility, emergency access',
      'Routes that only the management may use',
      'Access through the busiest part of the site',
    ],
    correctAnswer: 1,
    explanation:
      'Site access must provide safe routes, adequate width, good visibility and maintain emergency access.',
  },
  {
    id: 202,
    question: 'What is the importance of site planning for safety?',
    options: [
      'It removes the need to carry out separate risk assessments',
      'It guarantees the project will finish on time and to budget',
      'Reduces conflicts between activities, controls access, manages hazards',
      'It reduces the cost of the materials needed for the works',
    ],
    correctAnswer: 2,
    explanation:
      'Good site planning reduces conflicts between activities, controls access routes and helps manage hazards.',
  },
  {
    id: 203,
    question: 'How should deliveries be managed safely on site?',
    options: [
      'Deliver to any free space on site whenever convenient',
      'Allow drivers to reverse without guidance from a banksman',
      'Route deliveries along the same paths as pedestrians',
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
      'Manage the site finances and payments',
      'Carry out first aid for injured workers',
      'Inspect electrical installations for faults',
    ],
    correctAnswer: 0,
    explanation:
      'A banksman guides vehicles safely during reversing and manoeuvring operations to prevent accidents.',
  },
  {
    id: 205,
    question: 'What training should banksmen receive?',
    options: [
      'First aid, emergency casualty care and resuscitation',
      'Vehicle movements, hand signals, hazard awareness, communication',
      'Electrical inspection, testing and certification',
      'Manual handling and the lifting of heavy loads',
    ],
    correctAnswer: 1,
    explanation:
      'Banksmen need training in vehicle movements, standard hand signals, hazard awareness and communication.',
  },
  {
    id: 206,
    question: 'What is the purpose of exclusion zones around plant and machinery?',
    options: [
      'To store materials close to the machinery',
      'To mark out where deliveries should arrive',
      'Prevent people entering dangerous areas during operation',
      'To provide shelter for workers during breaks',
    ],
    correctAnswer: 2,
    explanation:
      'Exclusion zones prevent people entering dangerous areas around operating plant and machinery.',
  },
  {
    id: 207,
    question: 'How should site traffic and pedestrians be separated?',
    options: [
      'By asking pedestrians to be careful around vehicles',
      'By allowing both to share the same route',
      'By relying on high-visibility clothing alone',
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
      'Heavy rain and standing water, but no other conditions',
      'High temperatures and direct sunlight during summer months',
      'Weather has no real effect once site rules are followed',
    ],
    correctAnswer: 0,
    explanation:
      'Various weather conditions affect safety including high winds, ice, heavy rain, extreme temperatures and lightning.',
  },
  {
    id: 209,
    question: 'What precautions should be taken in extreme weather?',
    options: [
      'Carry on as normal to keep to programme',
      'Stop high-risk activities, provide shelter, monitor conditions',
      'Send all workers home regardless of the task',
      'Increase the pace of work to finish sooner',
    ],
    correctAnswer: 1,
    explanation:
      'Extreme weather may require stopping high-risk activities, providing shelter and continuously monitoring conditions.',
  },
  {
    id: 210,
    question: 'What is the importance of coordination between different trades on site?',
    options: [
      'It reduces the overall cost and the duration of the project',
      'It allows each trade to work without any direct supervision',
      'Prevents conflicts, ensures compatible working methods, manages shared risks',
      'It removes the need for individual trade risk assessments',
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
      'Provide more fire extinguishers around the site',
      'Install additional emergency lighting throughout',
      'Hold more frequent fire evacuation drills',
    ],
    correctAnswer: 0,
    explanation:
      'Fire prevention involves removing or controlling heat sources, fuel sources, or oxygen supply.',
  },
  {
    id: 213,
    question: 'What are the main classes of fire?',
    options: [
      'Class 1 (small), Class 2 (medium), Class 3 (large)',
      'Class A (solids), B (liquids), C (gases), D (metals), F (cooking oils)',
      'Class A (indoor), B (outdoor), C (underground)',
      'Class A (electrical), B (chemical), C (mechanical)',
    ],
    correctAnswer: 1,
    explanation:
      'Fire classes are: A (ordinary combustibles), B (flammable liquids), C (gases), D (metals), F (cooking oils).',
  },
  {
    id: 214,
    question: 'What type of fire extinguisher should be used on Class A fires?',
    options: [
      'CO2 only',
      'Wet chemical only',
      'Water, foam, or dry powder',
      'Dry powder only on metals',
    ],
    correctAnswer: 2,
    explanation:
      'Class A fires (ordinary combustibles) can be extinguished with water, foam, or dry powder extinguishers.',
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
    question: 'Why should water never be used on electrical fires?',
    options: [
      'Water conducts electricity and can cause electrocution',
      'Water reacts with copper to release toxic fumes',
      'Water spreads electrical fires more quickly',
      'Water is too valuable to waste on a fire',
    ],
    correctAnswer: 0,
    explanation:
      'Water conducts electricity and using it on live electrical equipment can cause electrocution.',
  },
  {
    id: 217,
    question: 'What should you do if you discover a fire?',
    options: [
      'Collect your tools before doing anything else',
      'Raise the alarm, call fire brigade, evacuate if safe to do so',
      'Open windows and doors to let the smoke out',
      'Wait to see if the fire goes out on its own',
    ],
    correctAnswer: 1,
    explanation:
      'On discovering fire: raise the alarm, call fire brigade, and evacuate safely - only tackle small fires if trained and safe.',
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
      "Whenever you see one, regardless of its size or your training",
      "Only after everyone else has already evacuated the building",
      "Any time, as long as you are holding any type of extinguisher",
      "Only if small, you're trained, have escape route, and feel confident",
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
      'Save equipment - protect costly machinery first',
      'Save the building - protect the structure first',
      'Save records - secure documents before leaving',
    ],
    correctAnswer: 0,
    explanation:
      'Life safety is paramount - people must be evacuated before considering property or equipment.',
  },
  {
    id: 221,
    question: 'What should you do when the fire alarm sounds?',
    options: [
      'Finish the task you are working on first',
      'Stop work immediately and evacuate via nearest safe exit',
      'Wait to confirm whether it is a real fire',
      'Return to your locker to collect belongings',
    ],
    correctAnswer: 1,
    explanation:
      'When fire alarms sound, stop work immediately and evacuate via the nearest safe exit route.',
  },
  {
    id: 222,
    question: 'Where should people assemble during evacuation?',
    options: [
      'At the nearest exit door to the building',
      'In the site car park beside the vehicles',
      'At designated assembly points away from the building',
      'Wherever is most convenient at the time',
    ],
    correctAnswer: 2,
    explanation:
      'People should assemble at designated assembly points that are a safe distance from the building.',
  },
  {
    id: 223,
    question: 'Who should take a roll call at assembly points?',
    options: [
      'Any worker who arrives first at the point',
      'The most senior manager present on site',
      'The fire brigade on their arrival',
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
      'The estimated cost of the fire damage to the building',
      'The names of all the contractors working on the site',
      'The project programme and the planned completion date',
    ],
    correctAnswer: 0,
    explanation:
      'Fire brigade should be told: exact location, type of fire, people involved/missing, and any hazardous materials.',
  },
  {
    id: 225,
    question: 'What is a fire risk assessment?',
    options: [
      'A record of all fires and near misses that have occurred on site',
      'Systematic evaluation of fire hazards and risks to implement control measures',
      'A list of the fire extinguishers held, their type and service dates',
      'A schedule setting out the fire drills to be carried out each year',
    ],
    correctAnswer: 1,
    explanation:
      'Fire risk assessment systematically evaluates fire hazards and risks to implement appropriate prevention and protection measures.',
  },
  {
    id: 226,
    question: 'What should a fire risk assessment identify?',
    options: [
      'The location of the fire extinguishers and hose reels',
      'The number of people present on site at any one time',
      'Fire hazards, people at risk, control measures needed',
      'The nearest fire station and its response time',
    ],
    correctAnswer: 2,
    explanation:
      'Fire risk assessments should identify fire hazards, people at risk, and determine necessary control measures.',
  },
  {
    id: 227,
    question: 'How often should fire drills be conducted?',
    options: [
      'Once, when the building is first brought into use',
      'After a real fire or false alarm has occurred',
      'When the HSE inspector or insurer requests one',
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
      'The cost of holding the drill and time lost to production',
      'How many workers took part and how they rated the drill overall',
      'The weather conditions and the temperature during the drill',
    ],
    correctAnswer: 0,
    explanation:
      'Evaluate evacuation times, route effectiveness, alarm audibility, assembly procedures and overall drill effectiveness.',
  },
  {
    id: 229,
    question: 'What are the key components of emergency evacuation routes?',
    options: [
      'Short, even if they pass through hazardous areas',
      'Clearly marked, well-lit, unobstructed, leading to safe areas',
      'Kept locked to control who can use them',
      'Used only by the management team',
    ],
    correctAnswer: 1,
    explanation:
      'Evacuation routes must be clearly marked, well-lit, kept unobstructed, and lead to safe areas outside.',
  },
  {
    id: 230,
    question: 'What is the role of fire wardens?',
    options: [
      'To fight all fires personally before evacuating anyone',
      'To carry out the annual fire risk assessment for the site',
      'Assist with evacuation, check areas are clear, liaise with fire brigade',
      'To install and maintain the fire alarm and detection system',
    ],
    correctAnswer: 2,
    explanation:
      'Fire wardens assist evacuation, check their areas are clear, help colleagues and liaise with emergency services.',
  },
  {
    id: 231,
    question: 'What training should fire wardens receive?',
    options: [
      'Manual handling, kinetic lifting and load-carrying techniques',
      'Electrical inspection, testing and certification of equipment',
      'First aid, casualty resuscitation and defibrillator use',
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
      'Open all doors to find an escape route quickly',
      'Stand on furniture to keep above the flames',
      'Run through the fire to reach the nearest exit',
    ],
    correctAnswer: 0,
    explanation:
      'If trapped: close doors to slow fire spread, signal for help, stay low to avoid smoke, and await rescue.',
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
  },
  {
    id: 234,
    question: 'What is the main danger from smoke?',
    options: [
      'It reduces visibility and slows down evacuation',
      'It stains clothing and damages equipment',
      'Toxic gases that can cause unconsciousness and death',
      'It triggers the sprinkler system unnecessarily',
    ],
    correctAnswer: 2,
    explanation:
      'Smoke contains toxic gases like carbon monoxide that can cause unconsciousness and death within minutes.',
  },
  {
    id: 235,
    question: 'What emergency equipment should be available on construction sites?',
    options: [
      'A single first-aid kit kept in the site office and nothing more',
      'A telephone in the site manager office for calling the emergency services',
      'A fire extinguisher at the entrance and a nominated fire warden',
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
      'Comprehensive approach including prevention, detection, suppression, evacuation',
      'A single fire extinguisher placed at each exit from the building',
      'A list of emergency telephone numbers displayed in the office',
      'An annual inspection visit carried out by the local fire and rescue service',
    ],
    correctAnswer: 0,
    explanation:
      'Fire safety management includes prevention measures, detection systems, suppression equipment and evacuation procedures.',
  },
  {
    id: 237,
    question: 'How should hot work be controlled to prevent fires?',
    options: [
      'By carrying it out only at the end of the day',
      'Permits, fire watches, cleared areas, fire extinguishers nearby',
      'By keeping combustible materials close at hand',
      'By relying on the building sprinkler system alone',
    ],
    correctAnswer: 1,
    explanation:
      'Hot work requires permits, trained fire watches, cleared work areas and appropriate fire extinguishers nearby.',
  },
  {
    id: 238,
    question: 'What is a fire watch?',
    options: [
      'A clock that times how long hot work takes',
      'A daily inspection of the fire extinguishers',
      'Person monitoring for fires during and after hot work',
      'A camera system that records the work area',
    ],
    correctAnswer: 2,
    explanation:
      'A fire watch is a trained person who monitors for fires during hot work and for a period afterwards.',
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
  },
  {
    id: 240,
    question: 'What emergency communication systems should sites have?',
    options: [
      'Multiple methods: landline, mobile, radio, alarms',
      'A single mobile phone held by the supervisor',
      'Hand signals between workers only',
      'A noticeboard at the site entrance',
    ],
    correctAnswer: 0,
    explanation:
      'Sites should have multiple communication methods including landlines, mobiles, radios and alarm systems.',
  },
  {
    id: 241,
    question: 'What information should be immediately available in emergencies?',
    options: [
      'The project cost breakdown, budget and valuation dates',
      'Emergency contacts, site plans, hazard information, evacuation procedures',
      'The names and job titles of every worker on the project',
      'The delivery schedule for materials and plant hire dates',
    ],
    correctAnswer: 1,
    explanation:
      'Emergency information should include contacts, site plans, hazard details and evacuation procedures.',
  },
  {
    id: 242,
    question: 'How should emergency procedures be communicated?',
    options: [
      'Word of mouth on the first day of work only',
      'A single email circulated to all of the staff',
      'Training, written procedures, drills, signs, induction',
      'A notice displayed in the site canteen only',
    ],
    correctAnswer: 2,
    explanation:
      'Emergency procedures should be communicated through training, written procedures, drills, signage and induction.',
  },
  {
    id: 243,
    question: 'What is the purpose of emergency lighting?',
    options: [
      'To reduce the building electricity bill at night',
      'To light up advertising signs after dark',
      'To provide additional lighting for night working',
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
      'Monthly brief tests and annual full duration tests',
      'Once, when the system is first installed and commissioned',
      'After a mains power failure has occurred on site',
      'Every five years by an external specialist contractor',
    ],
    correctAnswer: 0,
    explanation:
      'Emergency lighting should be tested monthly for a brief flick test and annually for full rated duration (typically 3 hours), per BS 5266.',
  },
  {
    id: 245,
    question: 'What should be included in emergency evacuation plans?',
    options: [
      'The location of the nearest fire station and its phone number',
      'Routes, assembly points, responsibilities, special needs, communication methods',
      'The contact numbers for the site manager and the client agent',
      'A list of the fire extinguishers held and their service dates',
    ],
    correctAnswer: 1,
    explanation:
      'Plans should include escape routes, assembly points, responsibilities, provisions for special needs and communication.',
  },
  {
    id: 246,
    question: 'How should people with disabilities be considered in emergency planning?',
    options: [
      'They should evacuate using the same plan as everyone else',
      'They should be excluded from the building entirely',
      'Personal emergency evacuation plans and assistance arrangements',
      'They should wait at their workstation for the fire brigade',
    ],
    correctAnswer: 2,
    explanation:
      'People with disabilities need personal emergency evacuation plans (PEEPs) with specific assistance arrangements.',
  },
  {
    id: 247,
    question: 'What should be done after an emergency evacuation?',
    options: [
      'Return to work immediately to make up the lost production time',
      'Re-enter the building to collect tools before the all-clear',
      'Leave the site for home without telling the site manager',
      'Account for all personnel, investigate cause, debrief, improve procedures',
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
      'Planning the daily sequence of construction work',
      'Planning the company marketing and sales strategy',
      'Planning staff training and development needs',
    ],
    correctAnswer: 0,
    explanation:
      'Business continuity planning ensures operations can continue during emergencies and recovery afterwards.',
  },
  {
    id: 249,
    question: 'What should be included in emergency training?',
    options: [
      'The location of the first-aid kit and the names of the site first-aiders',
      'Alarm procedures, evacuation routes, assembly points, equipment use, site-specific risks',
      'The contact number for the fire and rescue service and the site postcode',
      'How to select and use a fire extinguisher on each different class of fire',
    ],
    correctAnswer: 1,
    explanation:
      'Training should cover alarm procedures, evacuation routes, assembly points, equipment use, and site-specific risks.',
  },
  {
    id: 250,
    question: 'How often should emergency procedures be reviewed and updated?',
    options: [
      'Once, at the point the procedures are first written',
      'Whenever a new worker joins the team and is inducted',
      'Regularly, after incidents, when changes occur to site or operations',
      'When the HSE carries out an inspection of the site',
    ],
    correctAnswer: 2,
    explanation:
      'Emergency procedures should be reviewed regularly, after incidents, and when changes occur to the site or operations.',
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
      'The Health and Safety Executive (HSE), as part of its general site safety remit',
      'The local authority building control department for the area',
      'Ofgem, the regulator for the gas and electricity markets',
      'The Environment Agency (or Natural Resources Wales / SEPA in the devolved nations)',
    ],
    correctAnswer: 3,
    explanation:
      'Environmental enforcement on site sits with the Environment Agency in England, NRW in Wales, and SEPA in Scotland — not the HSE, who handle health and safety.',
  },
  {
    id: 252,
    question:
      'Under the GB CLP Regulation, what does the warning pictogram of a flame on a red-bordered diamond mean?',
    options: [
      'Flammable — the substance, vapour or gas can ignite easily',
      'Corrosive — the substance will burn skin or attack metal',
      'Oxidising — the substance can intensify a fire or start one',
      'Toxic — the substance is fatal or toxic in small amounts',
    ],
    correctAnswer: 0,
    explanation:
      'The GHS02 flame pictogram identifies flammable gases, liquids, solids, aerosols and self-reactive substances. Common on solvents, paints, thinners, propane and many spray cans on site.',
  },
  {
    id: 253,
    question:
      'Who is the "duty holder" for managing asbestos in a non-domestic premises under CAR 2012 Regulation 4?',
    options: [
      'The HSE-licensed asbestos removal contractor appointed to survey the building and remove the material',
      'Whoever is responsible for the maintenance and repair of the premises (often the owner or, via the lease, the occupier)',
      'The principal contractor named in the construction phase plan, who carries the duty for the whole life of the building',
      'The Environment Agency, as the regulator responsible for hazardous waste and for contaminated land in England',
    ],
    correctAnswer: 1,
    explanation:
      'CAR 2012 Reg 4 places the duty to manage asbestos on whoever has responsibility for maintenance and repair — which can be the owner or the tenant depending on the lease.',
  },
  {
    id: 254,
    question:
      'Under the GB CLP Regulation, which warning pictogram indicates a substance is corrosive (will burn skin or attack metal)?',
    options: [
      'A diamond showing a black flame burning above a solid horizontal line',
      'A diamond showing a black skull and crossbones on a white background',
      'A diamond with a black image of a hand and a surface being eaten away by liquid drops',
      'A diamond showing a bold black exclamation mark on a white background',
    ],
    correctAnswer: 2,
    explanation:
      'GB CLP corrosion pictogram (GHS05) is a red-bordered diamond showing test tubes pouring liquid onto a hand and a metal surface, both being eaten away. Common on drain cleaners, strong acids, alkalis.',
  },
  {
    id: 255,
    question:
      'In a UK building constructed BEFORE which year is asbestos most likely to be present in the fabric?',
    options: [
      '1985 — when crocidolite (blue) and amosite (brown) asbestos were banned',
      '1974 — the year the Health and Safety at Work Act came into force',
      '1965 — when the dangers of asbestos first became widely known',
      '2000 — chrysotile (white) asbestos was not fully banned in the UK until 1999',
    ],
    correctAnswer: 3,
    explanation:
      'Crocidolite (blue) and amosite (brown) were banned in 1985, but chrysotile (white) was not fully banned in the UK until 1999. Treat any building constructed or refurbished BEFORE 2000 as potentially containing ACMs.',
  },

  // AC 2.3 — escalation / stop-work above level of responsibility
  {
    id: 256,
    question:
      "You're an apprentice and you've spotted what looks like an asbestos insulating board (AIB) ceiling tile above where you're about to drill. The supervisor isn't on site. What's the right call?",
    options: [
      'Stop, don\'t disturb the tile, isolate the area, ring the supervisor and ask the duty holder for the asbestos register',
      'Drill carefully through the tile but wear a dust mask and dampen the area first to keep the fibres down',
      'Lift the tile gently and check what is above it before deciding whether it is safe to carry on drilling',
      'Carry on drilling — ceiling tiles are too thin to release a dangerous quantity of asbestos fibres into the air',
    ],
    correctAnswer: 0,
    explanation:
      "Inspection IS disturbance under CAR 2012 Reg 5. Stop, isolate, escalate — and request the duty holder's asbestos register before any work above the ceiling proceeds.",
  },
  {
    id: 257,
    question:
      "Under HASAWA section 7 and MHSWR Regulation 14, you've raised a safety concern with your supervisor and they've told you to drop it. What should you do next?",
    options: [
      'Drop it as instructed — the supervisor carries the legal responsibility for site safety, and an apprentice has no duty',
      'Escalate above the supervisor (your own employer, the principal contractor, your scheme provider) and record the conversation in writing',
      'Report it straight to the HSE and to the client, before giving your own employer any opportunity to put it right themselves',
      'Carry on with the work as instructed, but refuse to sign the risk assessment or the permit to work when it is presented',
    ],
    correctAnswer: 1,
    explanation:
      "HASAWA s.7 puts a personal duty on you that doesn't end when someone above you says 'drop it'. Escalate up the chain, document everything, and only go external (HSE) once the firm has had a chance to fix it.",
  },
  {
    id: 258,
    question:
      "You're working in a roof void and discover a live conductor that wasn't on the drawings or in the RAMS. What's the correct first action?",
    options: [
      'Cut the conductor quickly while it is still live so that the hazard is removed straight away and the work can continue',
      'Carry on working but keep well clear of the conductor and mention it on the certificate at the end of the job',
      'Stop work, isolate yourself from the area, notify your supervisor and update the risk assessment before continuing',
      'Test the conductor with a neon screwdriver to confirm whether it is live before deciding what to do next',
    ],
    correctAnswer: 2,
    explanation:
      'Anything not in the RAMS is by definition outside your assessed competence. Stop, isolate, notify, update the assessment — that discharges your MHSWR Reg 14 duty.',
  },
  {
    id: 259,
    question:
      'You arrive at a 1970s commercial building and the duty holder cannot produce an asbestos register for the area you are about to drill. What is the correct procedure?',
    options: [
      'Take your own sample of the material and send it to a laboratory yourself, carrying on with other work while you wait for the result',
      'Carry on drilling — a missing register means the building has already been surveyed and cleared of asbestos by the duty holder',
      'Drill only a single small hole and check whether any fibres are released before deciding whether it is safe to continue with the work',
      'Stop work, treat the material as \'presumed asbestos\' until a sample has been analysed by an accredited lab or the duty holder produces a clean survey',
    ],
    correctAnswer: 3,
    explanation:
      "CAR 2012 Reg 5 requires asbestos to be presumed present (and not chrysotile alone) where there is doubt. No register or survey means stop and escalate — the duty holder must commission the survey, you do not sample yourself.",
  },
  {
    id: 260,
    question:
      'What does "exceeds your level of responsibility" mean in practice for a Level 2 apprentice?',
    options: [
      'Anything you have not been trained or signed off to do — including live LV work, suspected asbestos, or work outside the scope of the RAMS',
      'Tasks that involve working at height above two metres, since those always need a separate permit and additional supervision',
      'Work the client has specifically asked the apprentice not to carry out, whatever the apprentice has been trained to do',
      'Any task that takes longer than a single working day to complete without your supervisor being present on site at the time',
    ],
    correctAnswer: 0,
    explanation:
      'If it sits outside your training, sign-off or the agreed RAMS, it exceeds your responsibility. The rule is simple: stop, do not guess, escalate to a competent person.',
  },

  // AC 2.4 — appropriate responsible persons to report to
  {
    id: 261,
    question:
      'Under the GB CLP Regulation, what does the exclamation mark warning pictogram on a red-bordered diamond indicate?',
    options: [
      'Serious long-term health hazards: carcinogen, mutagen, reproductive toxicity or respiratory sensitiser',
      'Less severe health hazards: skin/eye irritation, skin sensitiser, respiratory irritation or harmful if swallowed/inhaled',
      'Acute toxicity: the substance is fatal or toxic in small amounts by inhalation, ingestion or skin contact',
      'Corrosive: the substance will cause severe skin burns and serious eye damage, and will attack metals as well',
    ],
    correctAnswer: 1,
    explanation:
      'The GHS07 exclamation mark pictogram covers less severe acute toxicity, skin and eye irritation, skin sensitisation, respiratory irritation, and substances harmful if swallowed or inhaled. Common on cleaning products, adhesives and some sealants.',
  },
  {
    id: 262,
    question:
      'Under the GB CLP Regulation, what does the warning pictogram of a dead tree and a dead fish (red-bordered diamond) indicate?',
    options: [
      'Biohazard — the substance contains harmful micro-organisms or other biological agents',
      'Compressed gas — the container is under pressure and may explode if it is heated or damaged',
      'Hazardous to the aquatic environment — the substance is toxic to aquatic life with long-lasting effects',
      'Flammable — the substance, its vapour or its gas can ignite easily near a source of heat',
    ],
    correctAnswer: 2,
    explanation:
      'GHS09 (environment pictogram) marks substances toxic to aquatic life with acute or chronic effects. Common on weed killers, some solvents and oil-based products. These must NEVER reach surface water drains.',
  },
  {
    id: 263,
    question:
      'Which of the following is a typical place an electrician might encounter asbestos in a pre-2000 commercial building?',
    options: [
      'The plastic insulation and sheath on the modern twin-and-earth cable runs installed during the most recent rewire of the whole building',
      'The copper busbars, neutral bars and earth bars inside a recently installed metal-clad consumer unit and its main switch assembly',
      'The PVC trunking, conduit and cable basket fitted during the recent refurbishment of the office suite and its corridors on this floor',
      'Asbestos insulating board (AIB) ceiling tiles, pipe lagging, textured coatings (Artex), and electrical insulation backing boards behind old fuseboards',
    ],
    correctAnswer: 3,
    explanation:
      'Classic ACM locations an electrician touches: AIB ceiling tiles in suspended ceilings, lagging on old pipework, Artex textured coatings, vinyl floor tiles and the bitumen adhesive under them, gaskets in old switchgear, and insulation backing boards behind fuseboards.',
  },
  {
    id: 264,
    question:
      'Which of the three asbestos types was used most heavily in the UK and is the type most commonly encountered in pre-2000 building fabric?',
    options: [
      'Chrysotile (white) — the workhorse, used in cement sheets, textured coatings, gaskets, vinyl floor tiles and some electrical insulation; banned only in 1999',
      'Crocidolite (blue) — the most dangerous type, used mainly in sprayed coatings, pipe lagging and insulating board; banned in 1985 along with amosite',
      'Amosite (brown) — used in insulating boards, ceiling tiles and thermal insulation; banned in 1985 alongside the blue type, and still common in plant rooms',
      'Actinolite (grey) — a rare contaminant rarely used deliberately in building products, found mainly as an impurity in other minerals and in some talc',
    ],
    correctAnswer: 0,
    explanation:
      'Chrysotile (white) was by far the most heavily used asbestos in the UK and is the most commonly encountered fibre in pre-2000 buildings. Visual identification is unreliable — only laboratory analysis can confirm the type.',
  },
  {
    id: 265,
    question:
      'On suspicion of disturbing an asbestos-containing material, which of these is the WRONG action?',
    options: [
      'Stop work immediately and avoid disturbing the material any further until it has been properly identified by a competent person',
      'Sweep up the dust and bag it for disposal yourself — sweeping releases more fibres into the air, and a domestic vacuum disperses them further',
      'Isolate the area with barriers and warning signs and prevent anyone else from entering until the material has been assessed by a competent person',
      'Notify your supervisor and request the asbestos register for the premises from the duty holder before doing any further work',
    ],
    correctAnswer: 1,
    explanation:
      'Never sweep, hoover (with a domestic vacuum), bag, sample or clean a suspected ACM yourself. Stop, isolate, do not touch, notify, request the register and record what you did. Only an HSE-licensed contractor handles the cleanup.',
  },

  // AC 2.5 — environmental impact of work activities
  {
    id: 266,
    question:
      'Which of the following work activities creates the highest risk of water pollution on a building site?',
    options: [
      'Storing sealed drums of fuel on a bunded pallet in a locked compound',
      'Sweeping dry dust into a covered skip at the end of the shift',
      'Washing out concrete chutes or cement mixers into a surface water drain',
      'Stacking PVC offcuts in a labelled bin for collection by a recycler',
    ],
    correctAnswer: 2,
    explanation:
      'Washing concrete or cement into surface water drains is one of the most common causes of pollution incidents — wash water is highly alkaline and lethal to aquatic life. Use a designated wash-out area.',
  },
  {
    id: 267,
    question:
      'A diesel generator on site refuels by hand-pumping from a 200 L drum. What is the main environmental risk?',
    options: [
      'Excessive noise from the generator disturbing nearby residents',
      'Carbon dioxide emissions from the generator exhaust',
      'Vibration from the hand pump damaging the drum seal',
      'Soil and groundwater contamination from spills and drips during refuelling',
    ],
    correctAnswer: 3,
    explanation:
      'Spills and drips during refuelling are the highest pollution risk — even small volumes contaminate large areas of soil and groundwater. Use drip trays, bunded drums and spill kits.',
  },
  {
    id: 268,
    question:
      'Which environmental impact is most associated with operating a petrol breaker or stihl saw in a residential street?',
    options: [
      'Noise nuisance and dust — both can lead to abatement notices from the local authority under the Environmental Protection Act 1990',
      'Water pollution from petrol or two-stroke oil entering a nearby surface water drain and reaching a watercourse downstream',
      'Hazardous waste arising from the spent cutting discs and their packaging being sent to landfill untreated by the contractor',
      'Soil and verge contamination from the breaker leaking hydraulic oil and fuel onto the road surface and kerb, then washing away',
    ],
    correctAnswer: 0,
    explanation:
      'Noise and dust from cutting equipment are statutory nuisances under the Environmental Protection Act 1990, and the local authority can serve an abatement notice — plan timings and use suppression.',
  },
  {
    id: 269,
    question:
      'Cutting old PVC ducting and installing new conduit on a refurb generates plastic offcuts and copper waste. What is the BEST environmental practice?',
    options: [
      'Put all the offcuts and waste into one general skip to save the time spent sorting them on site',
      'Segregate at source — copper to a metals merchant, PVC to a plastic recycling stream, general waste to skip',
      'Burn the plastic offcuts on site at the end of the day to reduce the volume going into the skip',
      'Bury the inert offcuts in the trench on site rather than paying a carrier to remove them',
    ],
    correctAnswer: 1,
    explanation:
      'Segregation at source maximises recycling, reduces landfill cost and meets the waste hierarchy in the Waste (England and Wales) Regulations 2011 (prevent → reuse → recycle → recover → dispose).',
  },
  {
    id: 270,
    question:
      'What is the environmental waste hierarchy in order of preference?',
    options: [
      'Disposal, recovery, recycling, reuse, prevention',
      'Reuse, prevention, disposal, recycling, recovery',
      'Prevention, reuse, recycling, recovery, disposal',
      'Prevention, recycling, reuse, disposal, recovery',
    ],
    correctAnswer: 2,
    explanation:
      'The Waste (England and Wales) Regulations 2011 set the hierarchy as prevention first, then reuse, recycling, other recovery (e.g. energy from waste), and disposal as the last resort.',
  },

  // AC 2.6 — waste processing on site
  {
    id: 271,
    question:
      'Old fluorescent tubes removed during a re-lamp are classed as:',
    options: [
      'Inert waste — they may be put into the general rubble skip along with broken brick and hardcore once cooled',
      'General mixed waste — they can go in any skip provided the glass is broken down first to save space',
      'Recyclable glass — they may be placed loose in the site glass recycling bin with bottles, jars and cullet',
      'Hazardous waste (mercury content) — segregate, store upright in a labelled container and consign to a permitted carrier',
    ],
    correctAnswer: 3,
    explanation:
      'Fluorescent tubes contain mercury and are classed as hazardous waste under the Hazardous Waste Regulations 2005 — they need a consignment note and a permitted disposal route.',
  },
  {
    id: 272,
    question:
      'Waste electrical and electronic equipment (WEEE) such as old consumer units and luminaires must be:',
    options: [
      'Segregated and sent to an authorised treatment facility (AATF) under the WEEE Regulations 2013',
      'Placed in the general waste skip as long as the cables and lamps are removed first',
      'Buried on site as inert waste once the casing has been broken up into small pieces',
      'Sent straight to landfill, since electrical items cannot be economically recycled',
    ],
    correctAnswer: 0,
    explanation:
      'The Waste Electrical and Electronic Equipment Regulations 2013 require WEEE to be segregated and sent to an authorised treatment facility for proper recovery and disposal.',
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
  },
  {
    id: 274,
    question:
      "What's the correct on-site practice for storing scrap copper cable awaiting collection?",
    options: [
      'Left loose beside the site gate so the scrap merchant can collect it at any time without waiting for site staff',
      'Stripped of its insulation by burning it off before storage, so that it fetches a higher price when it is weighed in',
      'Segregated, secured against theft, in a labelled and dry container — transferred only to an authorised metal carrier with a transfer note',
      'Mixed in with the general waste skip, since the resale value of copper does not cover the cost of separating it on site',
    ],
    correctAnswer: 2,
    explanation:
      "Burning insulation off cable is illegal (releases dioxins) and theft of scrap is rife — copper must be secured, segregated and transferred to a licensed carrier under the Scrap Metal Dealers Act 2013.",
  },
  {
    id: 275,
    question:
      'Inert waste (clean rubble, broken brick) on site should be:',
    options: [
      'Consigned as hazardous waste with a consignment note that must be kept on file for three years by the producer',
      'Mixed in with the general waste skip, since clean rubble cannot be recycled or reused on site afterwards',
      'Sent to an authorised treatment facility under the WEEE Regulations 2013 like other site waste',
      'Segregated into its own skip — the disposal cost is much lower and it can often be reused or recycled as aggregate',
    ],
    correctAnswer: 3,
    explanation:
      'Inert waste has its own much cheaper disposal route and is widely recycled as aggregate. Mixing it with hazardous or general waste contaminates the load and increases cost.',
  },

  // AC 2.7 — importance of reporting environmental hazards
  {
    id: 276,
    question:
      'Why is it important to report a fuel spill to your supervisor immediately rather than just mopping it up yourself?',
    options: [
      'Spills above certain thresholds must be reported to the Environment Agency, and the firm needs to investigate the cause to prevent a repeat',
      'Mopping it up yourself is unlawful — only a licensed waste contractor may deal with spilt fuel on a construction site under the regulations',
      'Reporting it transfers the legal responsibility for the spill from you onto the supervisor and the firm that employs you',
      'The supervisor must personally clean up every spill, so an operative should never touch the absorbent granules kept on site',
    ],
    correctAnswer: 0,
    explanation:
      'Pollution incidents above certain thresholds are reportable to the Environment Agency, and root-cause investigation is the only way to prevent recurrence. Silence about a spill is itself a breach.',
  },
  {
    id: 277,
    question:
      'You see another contractor pouring waste solvent down a surface water drain. What is the right action?',
    options: [
      'Say nothing on site but mention it to the Environment Agency yourself once the job has been finished',
      'Stop them if safe, report immediately to your supervisor and the principal contractor; record what you saw',
      'Help them flush the drain through with clean water so that the solvent is diluted quickly',
      'Wait until the next toolbox talk and raise it then with the whole site team present',
    ],
    correctAnswer: 1,
    explanation:
      'Pouring solvent down a surface water drain is a criminal offence under the Environmental Permitting Regulations 2016 — challenge it if safe, report up the chain and document what you saw.',
  },
  {
    id: 278,
    question:
      'Work on which of the following asbestos-containing materials is LICENSED work that can ONLY be done by an HSE-licensed asbestos contractor?',
    options: [
      'Drilling a single hole through an asbestos cement corrugated roof sheet',
      'Removing intact asbestos cement guttering and downpipes from outside',
      'Removing or disturbing AIB (asbestos insulating board), sprayed coatings, or pipe lagging',
      'Lifting and replacing undamaged vinyl floor tiles with bitumen backing',
    ],
    correctAnswer: 2,
    explanation:
      'Under CAR 2012, work on AIB, sprayed asbestos coatings and pipe lagging is licensed work and may ONLY be done by an HSE-licensed asbestos contractor — never by a general electrical contractor and never by an apprentice.',
  },
  {
    id: 279,
    question:
      'Why should near-miss environmental incidents (e.g. a drum that nearly tipped, a leak that nearly reached a drain) be reported even if no harm occurred?',
    options: [
      'Near-misses do not need reporting because no actual harm was caused and nothing reached the drain or the watercourse',
      'Reporting near-misses is only required for injuries to people under RIDDOR, not for environmental incidents of this kind',
      'Near-misses should be recorded privately by the operative and never shared with the firm or the client, in case of blame',
      'Near-misses identify weaknesses before they cause real incidents — the same control failure will eventually cause an actual pollution event',
    ],
    correctAnswer: 3,
    explanation:
      'Near-miss reporting is the cheapest form of risk control — the same root cause that produced the near-miss will produce a real incident next time unless it is fixed.',
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
  },

  // AC 3.5 — first aid facilities required
  {
    id: 281,
    question:
      'Under the Health and Safety (First-Aid) Regulations 1981, what is the minimum requirement for first-aid provision on every workplace?',
    options: [
      'At least one fully qualified first-aider must be present on every site at all times of the working day',
      'Adequate, suitable and sufficient first-aid equipment, facilities and personnel based on a needs assessment',
      'A staffed medical room must be provided at every workplace where more than five people are at work',
      'A defibrillator must be installed at every workplace by law and checked each month by a competent person',
    ],
    correctAnswer: 1,
    explanation:
      'The Regulations require employers to provide adequate, suitable and sufficient first-aid arrangements. The detail (kit contents, number of first-aiders) is set by a documented first-aid needs assessment.',
  },
  {
    id: 282,
    question:
      'What is the role of an "appointed person" under the Health and Safety (First-Aid) Regulations 1981?',
    options: [
      'A fully trained first-aider who has completed the approved three-day course and can give emergency treatment to casualties, including CPR',
      'The HSE inspector who checks the adequacy of first-aid provision during a routine site visit and records in writing any shortfall found',
      'A person appointed to take charge of first-aid arrangements (calling emergency services, looking after kit) when no first-aider is required by the assessment',
      'The site manager, who appoints all of the first-aiders for the project and arranges and pays for their initial and refresher training courses',
    ],
    correctAnswer: 2,
    explanation:
      'Where the needs assessment shows a trained first-aider is not necessary, the employer must still appoint a person to take charge of first-aid arrangements — calling emergency services and looking after the kit.',
  },
  {
    id: 283,
    question:
      'A small electrical contractor site (under 5 low-risk workers) is doing a domestic re-wire. What is the typical first-aid kit standard recommended?',
    options: [
      'A large BS 8599-1 kit plus two qualified first-aiders on site at all times',
      'A staffed first-aid room with a stretcher and a defibrillator',
      'No first-aid provision is required for fewer than five workers',
      'A small BS 8599-1 compliant first-aid kit, plus an appointed person',
    ],
    correctAnswer: 3,
    explanation:
      'BS 8599-1 is the recognised standard for workplace first-aid kits and HSE recommends it; small low-risk sites need at least the small kit plus an appointed person.',
  },
  {
    id: 284,
    question:
      'Where should first-aid equipment be kept on a construction site?',
    options: [
      'In a clearly identified, easily accessible location known to all workers — flagged at induction and on the site\'s emergency information',
      'Locked in the site manager\'s office so that the contents cannot be misused or taken home at the end of a shift',
      'In each worker\'s personal toolbox so that it is always close to hand wherever they happen to be working that day',
      'In a remote store well away from the work area, so that the contents are kept clean, dry and free from site dust and damp',
    ],
    correctAnswer: 0,
    explanation:
      'First-aid kit must be easily accessible and clearly identified. The location is part of every site induction and is included in the emergency contact information posted on site.',
  },
  {
    id: 285,
    question:
      'For sites with electrical risks, what additional equipment may the first-aid needs assessment recommend?',
    options: [
      'A spare set of insulated gloves for the first-aider to wear before approaching an electric shock casualty',
      'An automated external defibrillator (AED) — useful where the casualty may suffer ventricular fibrillation from electric shock',
      'An extra supply of burn dressings and cling film stored in the site office rather than in the main kit itself',
      'A second first-aid kit kept locked in the site office in case the main kit is emptied during an incident',
    ],
    correctAnswer: 1,
    explanation:
      'HSE guidance and BS 8599-1 recognise the value of AEDs where electric shock or sudden cardiac arrest is foreseeable — they significantly improve survival from ventricular fibrillation.',
  },

  // AC 3.6 — not misuse first aid / replace supplies
  {
    id: 286,
    question:
      "Why is it important not to use first-aid supplies for non-emergency purposes (e.g. taking plasters home, using the eye-wash to clean glasses)?",
    options: [
      'Using the kit casually invalidates the employer first-aid insurance cover for the whole site',
      'First-aid items lose their sterility the moment the box is opened, whatever they are used for',
      'Supplies may be missing or inadequate when a real injury occurs, leaving the casualty without treatment',
      'Only a qualified first-aider is legally allowed to open a workplace first-aid kit at any time',
    ],
    correctAnswer: 2,
    explanation:
      'First-aid kit is for emergencies. Casual use empties the kit so that when a real injury happens the right item is missing — that delay can change the outcome.',
  },
  {
    id: 287,
    question:
      'After using items from a first-aid kit, who is responsible for ensuring they are replaced?',
    options: [
      'The casualty who was treated, since they were the person who used up the supplies taken from the kit that day',
      'The HSE inspector, who checks and restocks workplace first-aid kits during routine unannounced site visits each year',
      'Whoever happens to notice that the kit is running low, with no record kept of what was used, when, or by whom',
      'The first-aider, appointed person, or the named responsible person in the workplace — replacement should be prompt and recorded',
    ],
    correctAnswer: 3,
    explanation:
      'Replacing used items is part of the first-aid management arrangements under the 1981 Regulations. The first-aider or appointed person checks the kit regularly and arranges replacement.',
  },
  {
    id: 288,
    question:
      'How often should first-aid kits be checked to ensure contents are complete and in date?',
    options: [
      'Regularly (typically monthly) — and after every use; sterile items have expiry dates and must be replaced',
      'Once a year, during the annual workplace health and safety audit carried out by the firm',
      'When an item is actually needed to treat a casualty, and at no other time during the year',
      'Every five years, in line with the periodic inspection cycle used for the installation',
    ],
    correctAnswer: 0,
    explanation:
      'HSE guidance recommends regular checks (monthly is typical) plus after every use; sterile dressings, eye pads and similar items have expiry dates and must be in date to be effective.',
  },
  {
    id: 289,
    question:
      'You used the last triangular bandage from the site first-aid kit treating a colleague. What should you do next?',
    options: [
      'Nothing — restocking the first-aid kit is the site manager\'s job, not the responsibility of the user who used it',
      'Tell the appointed person or first-aider so the kit is restocked, and note it in the accident book if the use was for an injury',
      'Buy a replacement bandage yourself from a chemist and claim the cost back on your expenses at the end of that month',
      'Improvise a substitute from clean materials found on site and say nothing to anyone about the shortage afterwards',
    ],
    correctAnswer: 1,
    explanation:
      "Inform the responsible person so the kit is restocked promptly. If the bandage was used for an injury, the accident also needs to be entered in the firm's accident book.",
  },
  {
    id: 290,
    question:
      'Why should you never re-use opened sterile dressings or eye-wash bottles?',
    options: [
      'Opened items lose their absorbency and will not stop bleeding effectively',
      'Re-using items breaches the manufacturer warranty on the first-aid kit',
      'They are no longer sterile and may introduce infection or contamination to the next casualty',
      'Opened dressings can only be used on the same casualty, never a colleague',
    ],
    correctAnswer: 2,
    explanation:
      'Once opened, sterility is lost. Re-using a dressing or eye-wash on a later casualty risks introducing infection — discard and replace after every single use.',
  },

  // AC 3.8 — safe isolation procedures
  {
    id: 291,
    question:
      'What is the correct sequence for safe isolation of a single-phase final circuit?',
    options: [
      'Switch off at the consumer unit, test the circuit dead with an approved voltage indicator, then begin work without locking the device off',
      'Test the circuit dead first, then switch off, lock off, and finally prove the voltage indicator on a known supply or proving unit afterwards',
      'Lock off the device first, switch off, prove the voltage indicator dead against the circuit, then start work at once without a caution notice',
      'Switch off, lock off, place caution notice, prove voltage indicator on a known supply, test the circuit dead at all relevant points, prove the indicator again',
    ],
    correctAnswer: 3,
    explanation:
      "GS38 / IET Electrician's Guide safe isolation sequence: identify circuit, switch off, lock off and label, prove the test instrument on a known live source, test at the point of work to confirm dead, then re-prove the instrument on the known source.",
  },
  {
    id: 292,
    question:
      'What test instrument is recommended by HSE Guidance Note GS38 for proving a circuit dead?',
    options: [
      'A two-pole voltage indicator (fused or current-limited) compliant with GS38, used with a proving unit',
      'A mains-testing neon screwdriver that lights up when the conductor under test is live',
      'A non-contact voltage detector pen used on its own as the sole means of proving dead',
      'A multimeter set to its highest AC voltage range with standard unfused test leads fitted',
    ],
    correctAnswer: 0,
    explanation:
      'GS38 recommends a two-pole voltage indicator with built-in current limitation, used with a dedicated proving unit — never a neon screwdriver and never a non-contact detector as the sole means.',
  },
  {
    id: 293,
    question:
      'Why is it essential to "prove the prover" before AND after testing a circuit dead?',
    options: [
      'To calibrate the voltage indicator against the exact supply voltage being tested, so that the reading obtained is accurate and traceable',
      'To confirm the test instrument was working correctly both before AND after the dead test — a fault that develops mid-test could give a false dead reading',
      'To discharge any stored charge held in the indicator before it is used safely on the conductors of the circuit being worked on',
      'To warm up the indicator\'s batteries so that the display reads accurately in the cold conditions found on site during winter working',
    ],
    correctAnswer: 1,
    explanation:
      "Proving the instrument on a known live source before AND after the dead test is the only way to confirm a fault didn't develop mid-test, which is what gives the dead test its evidential value.",
  },
  {
    id: 294,
    question:
      'When isolating a three-phase circuit, you must test for voltage between:',
    options: [
      'Each phase to neutral only — phase-to-phase tests are not required on a TN-S supply',
      'Neutral to earth only, since the three phases all share a common supply transformer',
      'Each phase to neutral, each phase to earth, AND between each pair of phases (L1-L2, L2-L3, L1-L3)',
      'Between L1 and earth only, as the other two phases will follow automatically from that',
    ],
    correctAnswer: 2,
    explanation:
      'For three-phase circuits, test between every conductor combination — phase-to-neutral, phase-to-earth, and phase-to-phase — to prove the entire circuit is dead before work begins.',
  },
  {
    id: 295,
    question:
      'Once a circuit has been isolated and proved dead, what additional precaution prevents someone else re-energising it while you work?',
    options: [
      'Leave the breaker in the off position and tell the other workers on site verbally at the start of the shift',
      'Place a strip of insulating tape across the breaker so that it cannot easily be switched back on by anyone else',
      'Stand a colleague by the consumer unit for the whole job to stop anyone switching the circuit back on by mistake',
      'Apply a personal padlock to the lock-off device, retain the only key, and display a caution notice giving your name and contact',
    ],
    correctAnswer: 3,
    explanation:
      'Padlock-and-tag (LOTO) with the only key retained by the person doing the work, plus a clear caution notice, is the only way to prevent inadvertent re-energisation.',
  },

  // AC 3.9 — implications of (not) carrying out safe isolation
  {
    id: 296,
    question:
      'What is the most likely consequence of failing to carry out safe isolation before working on a circuit?',
    options: [
      'Electric shock, arc flash burns, potential fatality — and personal liability under EAWR 1989 Reg 14',
      'A minor tingling sensation that passes quickly and leaves no lasting harm behind',
      'Nuisance tripping of the RCD, which simply needs resetting at the consumer unit',
      'A small voltage drop on the circuit that affects nearby equipment and lighting only',
    ],
    correctAnswer: 0,
    explanation:
      'Most UK electrical fatalities involve work on circuits believed to be dead. EAWR 1989 Reg 14 prohibits work on or near live conductors unless strictly justified, and the personal duty rests on the worker.',
  },
  {
    id: 297,
    question:
      'Under EAWR 1989 Regulation 14, live working is only permitted when:',
    options: [
      'The worker holds a valid ECS card, feels confident working live, and has been shown the circuit and its supply arrangement by the supervisor beforehand',
      'It is unreasonable in all the circumstances to make the conductor dead AND it is reasonable to work live AND suitable precautions are taken — all three tests must be met',
      'The circuit is protected by a 30mA RCD that will trip on contact, and insulated tools rated to 1000V are being used throughout, so the risk is controlled',
      'The supervisor has given verbal permission for the work to proceed live, and a second person is standing by to isolate the supply at the board if needed',
    ],
    correctAnswer: 1,
    explanation:
      'EAWR Reg 14 imposes three cumulative tests: dead working unreasonable, live working reasonable, and suitable precautions taken. Live working without all three is a criminal offence.',
  },
  {
    id: 298,
    question:
      'What is the correct action if you discover, after starting work, that the circuit you isolated is actually still live?',
    options: [
      'Carry on carefully with the work, taking extra care not to touch the live conductor or anything bonded to earth nearby at the time',
      'Quickly finish off the task before the circuit has any chance to cause harm, then report the fault to the supervisor afterwards that day',
      'Stop immediately, withdraw to a safe position, re-establish isolation correctly, and investigate why the original isolation failed before resuming',
      'Switch off at the nearest socket-outlet and carry on, since the main supply arrangement must itself be faulty somewhere upstream',
    ],
    correctAnswer: 2,
    explanation:
      'A failed isolation is a near-miss with serious potential. Stop, withdraw, re-isolate properly, and investigate the cause — before any work resumes — so the same failure does not happen on the next job.',
  },
  {
    id: 299,
    question:
      'Why is locking off and labelling more reliable than just switching off and putting the breaker in the off position?',
    options: [
      'A locked-off breaker disconnects the supply faster and more completely than simply switching it off at the board, so the circuit is safer',
      'Locking off reduces the voltage remaining on the circuit to a safe touch level for anyone working downstream of the isolating device at the board',
      'A padlock and a caution label together prove the circuit is dead, so there is no need to use a voltage indicator at the point of work afterwards',
      'Anyone can switch a breaker back on by mistake or routine; a personal padlock with the only key retained, plus a caution notice, prevents inadvertent re-energisation',
    ],
    correctAnswer: 3,
    explanation:
      "Switching off without locking leaves the circuit one bump away from being re-energised by anyone walking past. Lock-off with the only key retained is the only control that genuinely prevents that.",
  },
  {
    id: 300,
    question:
      'Beyond personal injury, what other implications follow from failing to carry out safe isolation?',
    options: [
      'Damage to equipment, fire, RIDDOR-reportable dangerous occurrence, criminal prosecution under EAWR/HASAWA, dismissal, and loss of competent person status',
      'A small fine of no more than £200 payable to the local authority, with no further action taken against the firm or the operative involved',
      'A requirement to re-sit the safe isolation module and be reassessed by the training provider before being allowed to work on site again',
      'Nuisance tripping of the RCD protecting the circuit, which simply needs to be reset at the board before the work continues as normal afterwards',
    ],
    correctAnswer: 0,
    explanation:
      'Failed isolation can cause arcing/equipment damage and fire, is reportable as a dangerous occurrence under RIDDOR, can lead to EAWR/HASAWA prosecution of both worker and employer, and typically ends the worker’s competent-person status.',
  },
];

// Function to get random questions for mock exam
export const getRandomQuestions = (count: number = 30): Question[] => {
  const shuffled = [...module1Questions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
