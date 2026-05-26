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
      'Voltage difference between feet when walking near earthed equipment',
      'Filtering facepieces, half/full face masks, powered respirators, breathing apparatus',
      'Clearly marked, well-lit, unobstructed, leading to safe areas',
    ],
    correctAnswer: 0,
    explanation:
      "Employees must take reasonable care of their own and others' health and safety, and cooperate with their employer.",
  },
  {
    id: 5,
    question: 'Which organisation enforces health and safety law in Great Britain?',
    options: [
      'More than 30 days or 500 person days',
      'Health and Safety Executive (HSE)',
      'Dramatically reduces resistance',
      'Water, foam, or dry powder',
    ],
    correctAnswer: 1,
    explanation:
      'The Health and Safety Executive (HSE) is the primary enforcer of health and safety law in Great Britain.',
  },
  {
    id: 6,
    question: 'What is the maximum penalty for breaching health and safety law?',
    options: [
      'Insulation of live parts',
      'Save lives - people before property',
      'Unlimited fine and/or imprisonment',
      'Electricity at Work Regulations 1989',
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
      'Each phase to neutral, each phase to earth, AND between each pair of phases (L1-L2, L2-L3, L1-L3)',
      'To plan, manage and coordinate health and safety during the pre-construction phase',
      'A small BS 8599-1 compliant first-aid kit, plus an appointed person',
      'Segregated and sent to an authorised treatment facility (AATF) under the WEEE Regulations 2013',
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
      'Employers (free of charge to employees)',
      'Water, foam, or dry powder',
      'More than 30 days or 500 person days',
      'Regularly, after incidents, when changes occur',
    ],
    correctAnswer: 2,
    explanation:
      'Projects lasting more than 30 days or involving more than 500 person days must be notified to HSE.',
  },
  {
    id: 11,
    question: 'What are the duties of a Principal Contractor under CDM?',
    options: [
      'Regular cleaning, inspection, replacement when damaged or worn',
      'Provide illumination during power failures for safe evacuation',
      'Check for breathing/circulation, give CPR if needed, treat for shock',
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
      'Earthing and automatic disconnection',
      'All construction projects',
      'Employers (free of charge to employees)',
    ],
    correctAnswer: 0,
    explanation:
      'A construction phase plan must be prepared and implemented for notifiable projects.',
  },
  {
    id: 13,
    question: 'What information must be provided in the health and safety file?',
    options: [
      'Good housekeeping, proper lighting, suitable surfaces, appropriate footwear',
      'Information about the structure needed for future construction work, maintenance, and demolition',
      'Location, type of fire, people involved, hazardous materials present',
      'The Environment Agency (or Natural Resources Wales / SEPA in the devolved nations)',
    ],
    correctAnswer: 1,
    explanation:
      'The health and safety file contains information needed for future construction work, maintenance, and demolition.',
  },
  {
    id: 14,
    question: 'Under EAWR, what must electrical systems be?',
    options: [
      'To get input from those who understand the work and risks',
      'Person monitoring for fires during and after hot work',
      'Constructed, maintained and used to prevent danger',
      'Serious injuries including fractures, amputations, serious burns',
    ],
    correctAnswer: 2,
    explanation:
      'EAWR requires electrical systems to be constructed, maintained and used so far as reasonably practicable to prevent danger.',
  },
  {
    id: 15,
    question: "What does 'competent person' mean under EAWR?",
    options: [
      'Skin condition (wet/dry), contact area, voltage, frequency',
      'Cut-resistant gloves, chemical-resistant gloves, thermal gloves, electrical gloves',
      'Hazardous substances, exposure routes, health effects, control measures',
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
      'Hand to hand across the chest',
      'Construction Design Management',
      'Pull, Aim, Squeeze, Sweep',
    ],
    correctAnswer: 0,
    explanation:
      'Equipment must be switched off and proved dead, or other precautions taken to prevent danger.',
  },
  {
    id: 17,
    question: 'What is the purpose of RIDDOR?',
    options: [
      'As a last resort when other control measures are not sufficient',
      'Reporting of Injuries, Diseases and Dangerous Occurrences Regulations',
      'Safety glasses, goggles, face shields, welding screens',
      'To ensure the health, safety and welfare of all employees at work',
    ],
    correctAnswer: 1,
    explanation:
      'RIDDOR requires the reporting of serious workplace accidents, occupational diseases and dangerous occurrences.',
  },
  {
    id: 18,
    question: 'Which accidents must be reported under RIDDOR?',
    options: [
      'When there\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s risk from dust, fumes, gases, vapours, or oxygen deficiency',
      'Account for all personnel, investigate cause, debrief, improve procedures',
      'Deaths, specified injuries, over-7-day injuries, diseases, dangerous occurrences',
      'Category I (simple), Category II (intermediate), Category III (complex)',
    ],
    correctAnswer: 2,
    explanation:
      'RIDDOR requires reporting of deaths, specified injuries, over-7-day injuries, occupational diseases and dangerous occurrences.',
  },
  {
    id: 19,
    question: 'How quickly must deaths and specified injuries be reported under RIDDOR?',
    options: [
      'Competent person with knowledge of the work and hazards',
      'Stop high-risk activities, provide shelter, monitor conditions',
      'At designated assembly points away from the building',
      'Immediately by telephone followed by written report within 10 days',
    ],
    correctAnswer: 3,
    explanation:
      'Deaths and specified injuries must be reported immediately by telephone and followed up with a written report within 10 days.',
  },
  {
    id: 20,
    question: "What is a 'specified injury' under RIDDOR?",
    options: [
      'Serious injuries including fractures, amputations, serious burns',
      'Different types of PPE work together without reducing protection',
      'The likelihood that a hazard will cause harm and the severity of that harm',
      'A document describing how work will be carried out safely',
    ],
    correctAnswer: 0,
    explanation:
      'Specified injuries include fractures, amputations, serious eye injuries, serious burns, and other major injuries.',
  },
  {
    id: 21,
    question: 'What is the role of safety representatives?',
    options: [
      'Identify, assess, control through appropriate measures, monitor conditions',
      'To represent employees in consultations with employers on health and safety matters',
      'Communicate hazards, restrictions, mandatory requirements, emergency information',
      'Routes, assembly points, responsibilities, special needs, communication methods',
    ],
    correctAnswer: 1,
    explanation:
      'Safety representatives represent employees in consultations with employers on health and safety matters.',
  },
  {
    id: 22,
    question: 'What powers do safety representatives have?',
    options: [
      'Cut-resistant gloves, chemical-resistant gloves, thermal gloves, electrical gloves',
      'Identify PPE type, performance standards, limitations, expiry dates',
      'To investigate accidents, inspect the workplace, receive information, be consulted',
      'Personal emergency evacuation plans and assistance arrangements',
    ],
    correctAnswer: 2,
    explanation:
      'Safety representatives can investigate accidents, inspect workplaces, receive information and be consulted on safety matters.',
  },
  {
    id: 23,
    question: 'What is an improvement notice?',
    options: [
      'Emergency contacts, site plans, hazard information, evacuation procedures',
      'When there\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s risk from flying particles, chemicals, radiation, or bright light',
      'Fire extinguishers, first aid kits, emergency communication, evacuation equipment',
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
      'Reporting of Injuries, Diseases and Dangerous Occurrences Regulations',
      'Permits, fire watches, cleared areas, fire extinguishers nearby',
      'Report immediately to supervisor and make area safe if possible',
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
    question: 'What is the purpose of health and safety policy?',
    options: [
      "Short safety discussion on specific topics relevant to current work",
      "Clear walkways, proper storage, regular cleaning, waste removal",
      "To demonstrate employer's commitment to health and safety and provide framework for action",
      "They are no longer sterile and may introduce infection or contamination to the next casualty",
    ],
    correctAnswer: 2,
    explanation:
      "A health and safety policy demonstrates the employer's commitment and provides a framework for managing health and safety.",
  },
  {
    id: 27,
    question: 'When must an employer have a written health and safety policy?',
    options: [
      'Within 40 milliseconds for 30mA types',
      'Switch off and prove dead',
      'Before each use and regularly during use',
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
      'Constructed, maintained and used to prevent danger',
      'Balance the risk against the cost and effort of reducing it',
      'Where there is risk of head injury from falling objects or impact',
      'Fire wardens or designated responsible persons',
    ],
    correctAnswer: 1,
    explanation:
      'It means balancing the risk against the cost, time and effort needed to reduce or eliminate it.',
  },
  {
    id: 30,
    question: 'What is the purpose of an Approved Code of Practice (ACOP)?',
    options: [
      'Regularly, after incidents, when changes occur to site or operations',
      'Clear walkways, proper storage, regular cleaning, waste removal',
      'To give practical guidance on complying with legal duties',
      'Attend site induction and safety briefing',
    ],
    correctAnswer: 2,
    explanation:
      'ACOPs provide practical guidance on how to comply with legal duties and have special status in legal proceedings.',
  },
  {
    id: 31,
    question: 'What is corporate manslaughter?',
    options: [
      "Vehicle movements, hand signals, hazard awareness, communication",
      "Workers know the practical requirements and comfort needed for effective use",
      "Regularly, often weekly or before specific high-risk activities",
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
      'Safety glasses, goggles, face shields, welding screens',
      'Assessment tailored to specific site conditions and hazards',
      'To systematically evaluate and prioritise risks',
    ],
    correctAnswer: 0,
    explanation:
      'Penalties include unlimited fines, remedial orders to address failures, and publicity orders.',
  },
  {
    id: 33,
    question: 'What must employers consult employees about?',
    options: [
      'Emergency contacts, site plans, hazard information, evacuation procedures',
      'Health and safety measures, risks, preventive measures, competent persons',
      'Certain hazards pose additional risks to mother and unborn child',
      'Workers, visitors, contractors, public, special groups',
    ],
    correctAnswer: 1,
    explanation:
      'Employers must consult on health and safety measures, risks, preventive measures, and appointment of competent persons.',
  },
  {
    id: 34,
    question: 'What information must employers provide to employees?',
    options: [
      'Raise the alarm, call fire brigade, evacuate if safe to do so',
      'Removing or disturbing AIB (asbestos insulating board), sprayed coatings, or pipe lagging',
      'Health and safety information, risks, preventive measures, emergency procedures',
      'Stop work immediately and evacuate via nearest safe exit',
    ],
    correctAnswer: 2,
    explanation:
      'Employers must provide information on health and safety, risks, preventive measures, and emergency procedures.',
  },
  {
    id: 35,
    question: 'What is vicarious liability?',
    options: [
      'Cool with water for 20+ minutes, cover with sterile dressing, seek medical help',
      'To prevent electric shock during maintenance work',
      'Class A (solids), B (liquids), C (gases), D (metals), F (cooking oils)',
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
      'Lack experience, may take risks, physical development incomplete',
      'Safety Extra Low Voltage - separated from earth',
      'Switch off power supply or remove casualty using non-conductive material',
    ],
    correctAnswer: 0,
    explanation:
      'HSE inspectors can enter premises, examine and investigate, issue improvement/prohibition notices, and prosecute.',
  },
  {
    id: 37,
    question: 'What is the difference between regulations and guidance?',
    options: [
      'Water conducts electricity and can cause electrocution',
      'Regulations are legally binding, guidance is advisory',
      'Training, written procedures, drills, signs, induction',
      'To ensure the health, safety and welfare of all employees at work',
    ],
    correctAnswer: 1,
    explanation:
      'Regulations have legal force and must be followed, while guidance is advisory best practice.',
  },
  {
    id: 38,
    question: 'What is the purpose of health surveillance?',
    options: [
      'Training, written procedures, drills, signs, induction',
      'AC causes muscular spasm and affects the heart rhythm',
      'To detect health effects early and take preventive action',
      'To ensure the health, safety and welfare of all employees at work',
    ],
    correctAnswer: 2,
    explanation:
      'Health surveillance detects adverse health effects at an early stage so preventive action can be taken.',
  },
  {
    id: 39,
    question: 'When might health surveillance be required?',
    options: [
      "Stop high-risk activities, provide shelter, monitor conditions",
      "Assessment tailored to specific site conditions and hazards",
      "Benefits, costs, public perception, legal requirements, available alternatives",
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
      'Provide illumination during power failures for safe evacuation',
      'Designated areas, trained banksmen, separation from other activities',
      'Only protects the individual, can fail, may give false sense of security',
    ],
    correctAnswer: 0,
    explanation:
      'Occupational health prevents work-related illness and injury and promotes worker health and wellbeing.',
  },
  {
    id: 41,
    question: 'What are absolute duties in health and safety law?',
    options: [
      'For high-risk work like confined spaces, hot work, electrical isolation',
      'Duties that must be complied with regardless of cost or practicability',
      'Plan, manage and coordinate health and safety during the construction phase',
      'Document setting out health and safety arrangements for construction phase',
    ],
    correctAnswer: 1,
    explanation:
      "Absolute duties must be complied with regardless of cost - there are no qualifying words like 'reasonably practicable'.",
  },
  {
    id: 42,
    question: 'What is the significance of British Standards in health and safety?',
    options: [
      'Cool with water for 20+ minutes, cover with sterile dressing, seek medical help',
      'Personal emergency evacuation plans and assistance arrangements',
      'They provide recognised standards that can be used as evidence of good practice',
      'Good housekeeping, proper lighting, suitable surfaces, appropriate footwear',
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
      'Within 40 milliseconds for 30mA types',
      'Unlimited fine and/or imprisonment',
      'Electricity at Work Regulations 1989',
      'Hand to hand across the chest',
    ],
    correctAnswer: 3,
    explanation:
      'Hand to hand across the chest is most dangerous as current passes through the heart, potentially causing cardiac arrest.',
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
      'Monthly brief tests and annual full duration tests',
      'Current, duration, path through body, frequency',
      'Health and Safety Executive (HSE)',
      'Within 40 milliseconds for 30mA types',
    ],
    correctAnswer: 1,
    explanation:
      'Shock severity depends on current magnitude, duration of contact, path through the body, and frequency.',
  },
  {
    id: 46,
    question: "What voltage is considered 'low voltage' in the UK?",
    options: [
      'All construction projects',
      'Principal contractor',
      'Up to 1000V AC or 1500V DC',
      'Yes, to an employment tribunal',
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
      'Deaths, specified injuries, over-7-day injuries, diseases, dangerous occurrences',
      'Immediately by telephone followed by written report within 10 days',
      'Work sequence, hazards, control measures, emergency procedures, supervision',
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
      'Workers, visitors, contractors, public, special groups',
      'Deep internal burns along current path',
      'How to use, maintain, store PPE and recognise defects',
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
      'Workers, visitors, contractors, public, special groups',
      'Protection from electrical arc blast and thermal energy',
      'Prevent people entering dangerous areas during operation',
    ],
    correctAnswer: 0,
    explanation:
      'AC at 50Hz is particularly dangerous as it can cause muscular spasm and interfere with heart rhythm.',
  },
  {
    id: 53,
    question: 'What factors affect body resistance to electric current?',
    options: [
      'As a last resort when other control measures are not sufficient',
      'Skin condition (wet/dry), contact area, voltage, frequency',
      'Investigate accidents, inspect workplace, be consulted on safety matters',
      'To prevent work-related illness and promote health and wellbeing',
    ],
    correctAnswer: 1,
    explanation:
      'Body resistance varies with skin condition, contact area, applied voltage, current frequency and individual factors.',
  },
  {
    id: 54,
    question: 'How does wet skin affect electrical resistance?',
    options: [
      'Employers (free of charge to employees)',
      'All construction projects',
      'Dramatically reduces resistance',
      'Something with potential to cause harm',
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
      'Personal Protective Equipment',
      'Earthing and automatic disconnection',
      'Insulated tools, gloves, mats, footwear',
    ],
    correctAnswer: 0,
    explanation:
      'Electric current causes deep internal burns along the current path through tissues and organs.',
  },
  {
    id: 57,
    question: 'What is an arc burn?',
    options: [
      'Skin condition (wet/dry), contact area, voltage, frequency',
      'Burn caused by electric arc/flash producing intense heat',
      'Location, type of fire, people involved, hazardous materials present',
      'Formal system to control high-risk work through written permission',
    ],
    correctAnswer: 1,
    explanation:
      'Arc burns are caused by electric arcs/flashes that can reach temperatures of 20,000°C causing severe burns.',
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
      'Remove or control any element of the fire triangle',
      'Construction Design Management',
      'When conditions change, after incidents, regularly',
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
      'Practical, clear, focused on significant risks, regularly reviewed',
      'To get input from those who understand the work and risks',
      'Reduces conflicts between activities, controls access, manages hazards',
    ],
    correctAnswer: 0,
    explanation:
      'Cool burns with water for at least 20 minutes, cover with sterile dressing, and seek medical attention.',
  },
  {
    id: 61,
    question: 'What makes electrical burns particularly dangerous?',
    options: [
      'Formal system to control high-risk work through written permission',
      'Internal damage may be extensive despite limited external signs',
      'Remove or control any element of the fire triangle',
      'Only protects the individual, can fail, may give false sense of security',
    ],
    correctAnswer: 1,
    explanation:
      "Electrical burns can cause extensive internal damage to organs and tissues that isn't visible externally.",
  },
  {
    id: 62,
    question: 'What immediate first aid should be given for electric shock?',
    options: [
      'Skin condition (wet/dry), contact area, voltage, frequency',
      'Only if small, you\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'re trained, have escape route, and feel confident',
      'Check for breathing/circulation, give CPR if needed, treat for shock',
      'Ensure PPE is worn correctly, monitor condition, enforce compliance',
    ],
    correctAnswer: 2,
    explanation:
      'Check breathing and circulation, give CPR if required, treat for shock and get immediate medical help.',
  },
  {
    id: 63,
    question: 'Why should you never use water on electrical equipment during a fire?',
    options: [
      'To prevent electric shock during maintenance work',
      'Identify PPE type, performance standards, limitations, expiry dates',
      'Regular cleaning, inspection, replacement when damaged or worn',
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
      'When there\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s exposure to specific hazards like noise, vibration, asbestos',
      'Voltage difference between feet when walking near earthed equipment',
      'Prevent unauthorised access, protect workers and public, secure materials',
      'Water conducts electricity and can cause electrocution',
    ],
    correctAnswer: 1,
    explanation:
      'Step potential is the voltage difference between feet when walking on ground near earthed electrical equipment.',
  },
  {
    id: 66,
    question: 'What is touch potential?',
    options: [
      'To systematically evaluate and prioritise risks',
      'Prevent people entering dangerous areas during operation',
      'Voltage between hand and feet when touching equipment',
      'Prohibition, warning, mandatory, emergency, fire safety signs',
    ],
    correctAnswer: 2,
    explanation:
      'Touch potential is the voltage difference between hand and feet when touching electrical equipment.',
  },
  {
    id: 67,
    question: 'What is the main protection against direct contact with electricity?',
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
      'Ill-fitting PPE may not provide adequate protection',
      'Regularly, after incidents, when changes occur',
      'Ongoing assessment of changing conditions during work',
    ],
    correctAnswer: 0,
    explanation:
      'Indirect contact is touching exposed metalwork that has become live due to an insulation fault.',
  },
  {
    id: 69,
    question: 'What protects against indirect contact?',
    options: [
      'Cleaner air is near the floor as smoke rises',
      'Earthing and automatic disconnection',
      'Electricity at Work Regulations 1989',
      'If they employ 5 or more people',
    ],
    correctAnswer: 1,
    explanation:
      'Earthing and automatic disconnection of supply protects against indirect contact by quickly disconnecting faulty circuits.',
  },
  {
    id: 70,
    question: 'What is an RCD?',
    options: [
      'Clear walkways, proper storage, regular cleaning, waste removal',
      'Regulations are legally binding, guidance is advisory',
      'Residual Current Device - detects earth leakage currents',
      'Current, duration, path through body, frequency',
    ],
    correctAnswer: 2,
    explanation:
      'An RCD (Residual Current Device) detects earth leakage currents and quickly disconnects the supply.',
  },
  {
    id: 71,
    question: 'How quickly should an RCD operate?',
    options: [
      'Provide a construction phase plan',
      'Employers (free of charge to employees)',
      'As Low As Reasonably Practicable',
      'Within 40 milliseconds for 30mA types',
    ],
    correctAnswer: 3,
    explanation:
      'RCDs must operate within 40ms for 30mA devices and 300ms for higher rating devices.',
  },
  {
    id: 72,
    question: 'What current should a standard RCD trip at?',
    options: [
      '30mA',
      '100mA',
      '300mA',
      '1A',
    ],
    correctAnswer: 0,
    explanation:
      'Standard RCDs for additional protection trip at 30mA, which is below the dangerous level.',
  },
  {
    id: 73,
    question: 'Why are isolation procedures important?',
    options: [
      'Multiple methods: landline, mobile, radio, alarms',
      'To prevent electric shock during maintenance work',
      'Switch off, isolate, lock off, test, prove dead',
      'Voltage between hand and feet when touching equipment',
    ],
    correctAnswer: 1,
    explanation:
      'Proper isolation prevents electric shock and ensures safety during maintenance and repair work.',
  },
  {
    id: 74,
    question: 'What is the safe isolation procedure?',
    options: [
      'Before issue, periodically during use, after suspected damage',
      'Use reduced voltage supplies (110V or lower), RCD protection',
      'Switch off, isolate, lock off, test, prove dead',
      'Earthing and automatic disconnection',
    ],
    correctAnswer: 2,
    explanation:
      'Safe isolation requires switching off, isolating, locking off, testing equipment, and proving dead.',
  },
  {
    id: 75,
    question: 'What should you do before starting work on electrical equipment?',
    options: [
      'Skin condition (wet/dry), contact area, voltage, frequency',
      'Significant findings, people at risk, control measures',
      'Only if small, you\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'re trained, have escape route, and feel confident',
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
      'Reduces conflicts between activities, controls access, manages hazards',
      'Stop high-risk activities, provide shelter, monitor conditions',
      'Lack experience, may take risks, physical development incomplete',
    ],
    correctAnswer: 0,
    explanation:
      "Proving the tester on a known live source before and after testing ensures it's working properly.",
  },
  {
    id: 77,
    question: 'What happens during ventricular fibrillation?',
    options: [
      'Ill-fitting PPE may not provide adequate protection',
      'Heart muscle fibres contract randomly, stopping effective pumping',
      'Designated areas, trained banksmen, separation from other activities',
      'Correct selection, proper use, good maintenance, adequate training',
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
      'Competent person with knowledge of the work and hazards',
      'Where there\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s risk of falling objects, puncture wounds, slips, electrical hazards',
      'Benefits, costs, public perception, legal requirements, available alternatives',
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
      'Attend site induction and safety briefing',
      'Provide a construction phase plan',
      'More than 30 days or 500 person days',
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
      'Statement of intent, organisation, and arrangements',
      'Water conducts electricity and can cause electrocution',
      'Safety Extra Low Voltage - separated from earth',
      'Electricity at Work Regulations 1989',
    ],
    correctAnswer: 2,
    explanation:
      'SELV (Safety Extra Low Voltage) is extra low voltage separated from earth and other circuits.',
  },
  {
    id: 83,
    question: 'What precautions should be taken in wet conditions?',
    options: [
      'Residual Current Device - detects earth leakage currents',
      'The likelihood that a hazard will cause harm and the severity of that harm',
      'To systematically evaluate and prioritise risks',
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
      'To get input from those who understand the work and risks',
      'Systematic analysis of how and why people make mistakes',
      'Regularly, typically every 6 months or as required',
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
      'Category I (simple), Category II (intermediate), Category III (complex)',
      'To identify hazards and evaluate risks to implement appropriate controls',
      'Skin condition (wet/dry), contact area, voltage, frequency',
      'To prevent work-related illness and promote health and wellbeing',
    ],
    correctAnswer: 1,
    explanation:
      'Risk assessment identifies hazards, evaluates risks and determines appropriate control measures to prevent harm.',
  },
  {
    id: 86,
    question: 'What are the five steps of risk assessment?',
    options: [
      'Evacuation time, route effectiveness, alarm audibility, assembly procedures',
      'Internal damage may be extensive despite limited external signs',
      'Identify hazards, decide who might be harmed, evaluate risks, record findings, review',
      'Report immediately to supervisor and make area safe if possible',
    ],
    correctAnswer: 2,
    explanation:
      'The five steps are: identify hazards, decide who might be harmed, evaluate risks, record findings, and review regularly.',
  },
  {
    id: 87,
    question: 'What is a hazard?',
    options: [
      'Likelihood × Severity = Risk level',
      'Yes, to an employment tribunal',
      'Employers (free of charge to employees)',
      'Something with potential to cause harm',
    ],
    correctAnswer: 3,
    explanation:
      'A hazard is anything with the potential to cause harm, such as chemicals, electricity, working at height.',
  },
  {
    id: 88,
    question: 'What is risk?',
    options: [
      'The likelihood that a hazard will cause harm and the severity of that harm',
      'Designated areas, trained banksmen, separation from other activities',
      'Training, written procedures, drills, signs, induction',
      'Competent persons, supervisors, and experienced workers',
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
      'The hierarchy is: elimination, substitution, engineering controls, administrative controls, and PPE as last resort.',
  },
  {
    id: 90,
    question: 'Which control measure is most effective?',
    options: [
      'As Low As Reasonably Practicable',
      'Construction Design Management',
      'Elimination of the hazard',
      'Water, foam, or dry powder',
    ],
    correctAnswer: 2,
    explanation:
      'Elimination of the hazard is the most effective control measure as it completely removes the risk.',
  },
  {
    id: 91,
    question: 'When should risk assessments be reviewed?',
    options: [
      'Within 40 milliseconds for 30mA types',
      'To get input from those who understand the work and risks',
      'To detect health effects early and take preventive action',
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
      'Identify hazards, check compliance, monitor safety standards',
      'Ensure PPE is worn correctly, monitor condition, enforce compliance',
      'Cleaner air is near the floor as smoke rises',
    ],
    correctAnswer: 0,
    explanation:
      'Risk assessments should be carried out by competent persons with knowledge of the work and associated hazards.',
  },
  {
    id: 93,
    question: 'What should be recorded in a risk assessment?',
    options: [
      'Essential for coordination, safety information, emergency response',
      'Significant findings, people at risk, control measures',
      'To prevent work-related illness and promote health and wellbeing',
      'Serious injuries including fractures, amputations, serious burns',
    ],
    correctAnswer: 1,
    explanation:
      'Written records should be kept of significant findings, people at risk, and control measures implemented.',
  },
  {
    id: 94,
    question: 'What is a method statement?',
    options: [
      'Stop work immediately and evacuate via nearest safe exit',
      'Contact burns, arc burns, and flash burns',
      'A document describing how work will be carried out safely',
      'To ensure the health, safety and welfare of all employees at work',
    ],
    correctAnswer: 2,
    explanation:
      'A method statement describes the sequence of operations and safety measures for carrying out specific work.',
  },
  {
    id: 95,
    question: 'What should a method statement include?',
    options: [
      'They provide recognised standards that can be used as evidence of good practice',
      'Designated areas, trained banksmen, separation from other activities',
      'Internal damage may be extensive despite limited external signs',
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
      'Provide illumination during power failures for safe evacuation',
      'Workers, visitors, contractors, public, special groups',
      'Lack experience, may take risks, physical development incomplete',
    ],
    correctAnswer: 0,
    explanation:
      'Method statements should involve competent persons, supervisors and experienced workers who understand the work.',
  },
  {
    id: 97,
    question: 'When are method statements typically required?',
    options: [
      'Flammable — the substance, vapour or gas can ignite easily',
      'For high-risk activities, complex work, CDM projects',
      'Short safety discussion on specific topics relevant to current work',
      'Clear walkways, proper storage, regular cleaning, waste removal',
    ],
    correctAnswer: 1,
    explanation:
      'Method statements are typically required for high-risk activities, complex work and construction projects under CDM.',
  },
  {
    id: 98,
    question: 'What is the relationship between risk assessment and method statements?',
    options: [
      'Only if small, you\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'re trained, have escape route, and feel confident',
      'Internal damage may be extensive despite limited external signs',
      'Risk assessment identifies risks, method statement describes control measures',
      'To ensure the health, safety and welfare of all employees at work',
    ],
    correctAnswer: 2,
    explanation:
      'Risk assessments identify hazards and risks; method statements describe how to control those risks during work.',
  },
  {
    id: 99,
    question: 'What factors should be considered when assessing who might be harmed?',
    options: [
      'Before each use and regularly during use',
      'Ill-fitting PPE may not provide adequate protection',
      'Competent persons, supervisors, and experienced workers',
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
      'Current, duration, path through body, frequency',
      'Class A (solids), B (liquids), C (gases), D (metals), F (cooking oils)',
      'Reporting of Injuries, Diseases and Dangerous Occurrences Regulations',
    ],
    correctAnswer: 0,
    explanation:
      'Young workers lack experience, may be more willing to take risks, and their physical development may be incomplete.',
  },
  {
    id: 101,
    question: 'What considerations apply to pregnant workers?',
    options: [
      'A document describing how work will be carried out safely',
      'Certain hazards pose additional risks to mother and unborn child',
      'High winds, ice, heavy rain, extreme temperatures, lightning',
      'Elimination, substitution, engineering controls, administrative controls, PPE',
    ],
    correctAnswer: 1,
    explanation:
      'Pregnancy may increase risks from certain hazards, requiring additional controls to protect mother and child.',
  },
  {
    id: 102,
    question: "What is meant by 'reasonably foreseeable'?",
    options: [
      'Multiple methods: landline, mobile, radio, alarms',
      'Report immediately to supervisor and make area safe if possible',
      'Events that are likely to happen or could reasonably be expected',
      'Assessment, selection, training, maintenance, monitoring, review',
    ],
    correctAnswer: 2,
    explanation:
      'Reasonably foreseeable means events that are likely to happen or could reasonably be expected in the circumstances.',
  },
  {
    id: 103,
    question: 'How should risk be calculated?',
    options: [
      'Save lives - people before property',
      'Contact burns, arc burns, and flash burns',
      'Report damage and stop using until replaced',
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
      'Switch off, isolate, lock off, test, prove dead',
      'Ensure control measures are followed and remain effective',
      'Fire hazards, people at risk, control measures needed',
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
      'Guide vehicles safely and control vehicle movements',
      'Heart muscle fibres contract randomly, stopping effective pumping',
      'Ongoing assessment of changing conditions during work',
      'Current, duration, path through body, frequency',
    ],
    correctAnswer: 2,
    explanation:
      'Dynamic risk assessment is the ongoing process of assessing changing conditions and new hazards during work.',
  },
  {
    id: 107,
    question: 'What should workers do if they identify new hazards?',
    options: [
      'Contact burns, arc burns, and flash burns',
      'As Low As Reasonably Practicable',
      'Electricity at Work Regulations 1989',
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
      'Balance the risk against the cost and effort of reducing it',
      'To ensure the tester is working before and after testing',
      'Employees must use PPE correctly and report defects',
    ],
    correctAnswer: 0,
    explanation:
      'Generic risk assessments cover similar activities and can be adapted for specific situations and locations.',
  },
  {
    id: 109,
    question: 'What is a site-specific risk assessment?',
    options: [
      'Switch off power supply or remove casualty using non-conductive material',
      'Assessment tailored to specific site conditions and hazards',
      'Skin condition (wet/dry), contact area, voltage, frequency',
      'To ensure the tester is working before and after testing',
    ],
    correctAnswer: 1,
    explanation:
      'Site-specific risk assessments are tailored to the particular conditions, hazards and constraints of a specific location.',
  },
  {
    id: 110,
    question: 'What information should be communicated to workers?',
    options: [
      'Where there is risk of head injury from falling objects or impact',
      'Designated routes, barriers, crossing points, traffic management',
      'Relevant findings of risk assessment and control measures required',
      'Practical, clear, focused on significant risks, regularly reviewed',
    ],
    correctAnswer: 2,
    explanation:
      'Workers must be informed of relevant risk assessment findings and the control measures they need to follow.',
  },
  {
    id: 111,
    question: 'What is the purpose of consultation in risk assessment?',
    options: [
      'Emergency contacts, site plans, hazard information, evacuation procedures',
      'Safety Extra Low Voltage - separated from earth',
      'Significant findings, people at risk, control measures',
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
      'Decontaminate safely or dispose of according to specific procedures',
      'Ensure PPE is worn correctly, monitor condition, enforce compliance',
      'Different types of PPE work together without reducing protection',
    ],
    correctAnswer: 0,
    explanation:
      "If control measures aren't effective, the risk assessment should be reviewed and control measures revised.",
  },
  {
    id: 113,
    question: 'What is residual risk?',
    options: [
      'Permits, fire watches, cleared areas, fire extinguishers nearby',
      'Risk remaining after control measures have been implemented',
      'Unlimited fine, remedial orders, publicity orders',
      'Ill-fitting PPE may not provide adequate protection',
    ],
    correctAnswer: 1,
    explanation:
      'Residual risk is the risk remaining after control measures have been implemented - it should be ALARP.',
  },
  {
    id: 114,
    question: 'What factors affect the acceptability of risk?',
    options: [
      'Only if small, you\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'re trained, have escape route, and feel confident',
      'Formal system to control high-risk work through written permission',
      'Benefits, costs, public perception, legal requirements, available alternatives',
      'To give practical guidance on complying with legal duties',
    ],
    correctAnswer: 2,
    explanation:
      'Risk acceptability depends on benefits, costs, public perception, legal requirements and available alternatives.',
  },
  {
    id: 115,
    question: 'What is tolerable risk?',
    options: [
      'A document describing how work will be carried out safely',
      'To give practical guidance on complying with legal duties',
      'To detect health effects early and take preventive action',
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
      'To identify hazards and evaluate risks to implement appropriate controls',
      'Skin condition (wet/dry), contact area, voltage, frequency',
      'To ensure the health, safety and welfare of all employees at work',
    ],
    correctAnswer: 0,
    explanation:
      'Training should cover hazard identification, risk evaluation techniques, control measures and review processes.',
  },
  {
    id: 117,
    question: 'How often should method statements be reviewed?',
    options: [
      'A document describing how work will be carried out safely',
      'When conditions change, after incidents, regularly',
      'Statement of intent, organisation, and arrangements',
      'Electricity at Work Regulations 1989',
    ],
    correctAnswer: 1,
    explanation:
      'Method statements should be reviewed when conditions change, after incidents, and as part of regular review.',
  },
  {
    id: 118,
    question: 'What is the role of supervision in risk control?',
    options: [
      'Regulations are legally binding, guidance is advisory',
      'Toxic gases that can cause unconsciousness and death',
      'Ensure control measures are followed and remain effective',
      'Competent persons, supervisors, and experienced workers',
    ],
    correctAnswer: 2,
    explanation:
      'Supervision ensures control measures are properly implemented, followed and remain effective.',
  },
  {
    id: 119,
    question: 'What should be done with lessons learned from incidents?',
    options: [
      'Electricity at Work Regulations 1989',
      'Provide a construction phase plan',
      'As Low As Reasonably Practicable',
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
      'To detect health effects early and take preventive action',
      '2000 — chrysotile (white) asbestos was not fully banned in the UK until 1999',
      'Heart muscle fibres contract randomly, stopping effective pumping',
    ],
    correctAnswer: 0,
    explanation:
      'Permit to work is a formal system controlling high-risk work through written permission and defined procedures.',
  },
  {
    id: 121,
    question: 'When might permit to work systems be used?',
    options: [
      'Location, type of fire, people involved, hazardous materials present',
      'For high-risk work like confined spaces, hot work, electrical isolation',
      'Only protects the individual, can fail, may give false sense of security',
      'Electrical insulation properties and arc flash protection',
    ],
    correctAnswer: 1,
    explanation:
      'Permit to work systems are used for high-risk activities like confined space entry, hot work, and electrical isolation.',
  },
  {
    id: 122,
    question: 'What should be monitored during risk assessment implementation?',
    options: [
      'Electrical insulation properties and arc flash protection',
      'Clear walkways, proper storage, regular cleaning, waste removal',
      'Effectiveness of control measures, changing conditions, worker compliance',
      'Close doors, signal for help, stay low, await rescue',
    ],
    correctAnswer: 2,
    explanation:
      'Monitor control measure effectiveness, changing conditions, worker compliance and any new hazards arising.',
  },
  {
    id: 123,
    question: 'What makes a good risk assessment?',
    options: [
      'Relevant findings of risk assessment and control measures required',
      'Effectiveness of control measures, changing conditions, worker compliance',
      'Electrical insulation properties and arc flash protection',
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
      'Ill-fitting PPE may not provide adequate protection',
      'Correct selection, proper use, good maintenance, adequate training',
      'When there\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s risk of cuts, chemical contact, burns, or electrical shock',
    ],
    correctAnswer: 0,
    explanation:
      'Human error analysis systematically examines how and why people make mistakes to prevent future errors.',
  },
  {
    id: 125,
    question: 'What factors contribute to human error?',
    options: [
      'Burn caused by electric arc/flash producing intense heat',
      'Personal factors, job factors, organisational factors, environmental factors',
      'Safety data sheets with hazard information and control measures',
      'Protection from electrical arc blast and thermal energy',
    ],
    correctAnswer: 1,
    explanation:
      'Human error results from personal, job, organisational and environmental factors that should all be considered.',
  },
  {
    id: 126,
    question: 'How can the likelihood of human error be reduced?',
    options: [
      'Guide vehicles safely and control vehicle movements',
      'Risk that can be accepted in current circumstances based on benefits gained',
      'Good design, training, procedures, culture, and learning from mistakes',
      'Ensure control measures are followed and remain effective',
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
      'Training, written procedures, drills, signs, induction',
      'A document describing how work will be carried out safely',
      'Internal damage may be extensive despite limited external signs',
    ],
    correctAnswer: 0,
    explanation:
      'PPE should be used as a last resort when other control measures cannot adequately reduce the risk.',
  },
  {
    id: 129,
    question: 'What are the main types of head protection?',
    options: [
      'Save lives - people before property',
      'Hard hats, bump caps, hair nets',
      'Earthing and automatic disconnection',
      'Deep internal burns along current path',
    ],
    correctAnswer: 1,
    explanation:
      'Head protection includes hard hats for impact protection, bump caps for minor hazards, and hair nets for hygiene.',
  },
  {
    id: 130,
    question: 'When should safety helmets be worn?',
    options: [
      'Represent workers on safety matters and investigate concerns',
      'Communicate hazards, restrictions, mandatory requirements, emergency information',
      'Where there is risk of head injury from falling objects or impact',
      'Remove or control any element of the fire triangle',
    ],
    correctAnswer: 2,
    explanation:
      'Safety helmets should be worn wherever there is risk of head injury from falling objects or impact.',
  },
  {
    id: 131,
    question: 'What types of eye protection are available?',
    options: [
      'Close doors, signal for help, stay low, await rescue',
      'Where there is risk of head injury from falling objects or impact',
      'Ill-fitting PPE may not provide adequate protection',
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
      "Essential for coordination, safety information, emergency response",
      "Hazardous substances, exposure routes, health effects, control measures",
      "Decontaminate safely or dispose of according to specific procedures",
    ],
    correctAnswer: 0,
    explanation:
      'Eye protection is needed for risks from flying particles, chemicals, harmful radiation or bright light.',
  },
  {
    id: 133,
    question: 'What are the main types of hearing protection?',
    options: [
      'Electricity at Work Regulations 1989',
      'Ear plugs, ear muffs, semi-insert protectors',
      'Workers, visitors, contractors, public, special groups',
      'Health and Safety Executive (HSE)',
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
      'Good design, training, procedures, culture, and learning from mistakes',
      'Identify PPE type, performance standards, limitations, expiry dates',
      'Site layout, hazards, emergency procedures, site rules, welfare facilities',
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
      "Clearly marked, well-lit, unobstructed, leading to safe areas",
      "Regularly, often weekly or before specific high-risk activities",
      "Touching exposed metalwork that has become live due to a fault",
    ],
    correctAnswer: 0,
    explanation:
      'Respiratory protection is needed for airborne hazards like dust, fumes, gases, vapours or oxygen deficiency.',
  },
  {
    id: 137,
    question: 'What are the main types of hand protection?',
    options: [
      'To demonstrate employer\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s commitment to health and safety and provide framework for action',
      'Cut-resistant gloves, chemical-resistant gloves, thermal gloves, electrical gloves',
      'Nature of hazard, compatibility, comfort, fit, maintenance requirements',
      'Comprehensive approach including prevention, detection, suppression, evacuation',
    ],
    correctAnswer: 1,
    explanation:
      'Hand protection includes cut-resistant, chemical-resistant, thermal and electrical insulating gloves.',
  },
  {
    id: 138,
    question: 'When should hand protection be worn?',
    options: [
      "Clearly marked, well-lit, unobstructed, leading to safe areas",
      "Act on findings, prioritise by risk, monitor progress",
      "When there's risk of cuts, chemical contact, burns, or electrical shock",
      "Hazard identification, risk evaluation, control measures, review processes",
    ],
    correctAnswer: 2,
    explanation:
      "Hand protection should be worn when there's risk of cuts, chemical contact, burns or electrical shock.",
  },
  {
    id: 139,
    question: 'What types of foot protection are available?',
    options: [
      'The Environment Agency (or Natural Resources Wales / SEPA in the devolved nations)',
      'Enter premises, examine, investigate, issue notices, prosecute',
      'Touching exposed metalwork that has become live due to a fault',
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
      "Where there's risk of falling objects, puncture wounds, slips, electrical hazards",
      "To get input from those who understand the work and risks",
      "To identify hazards and evaluate risks to implement appropriate controls",
      "Class A (solids), B (liquids), C (gases), D (metals), F (cooking oils)",
    ],
    correctAnswer: 0,
    explanation:
      'Safety footwear protects against falling objects, puncture wounds, slips, trips and electrical hazards.',
  },
  {
    id: 141,
    question: 'What are high-visibility garments used for?',
    options: [
      'Account for all personnel, investigate cause, debrief, improve procedures',
      'To make the wearer visible in poor light or near moving vehicles',
      'Burn caused by electric arc/flash producing intense heat',
      'Competent persons including supervisors, safety representatives, managers',
    ],
    correctAnswer: 1,
    explanation:
      'High-visibility garments make workers visible in poor light conditions or when working near moving vehicles.',
  },
  {
    id: 142,
    question: 'What does the CE marking on PPE indicate?',
    options: [
      'Unlimited fine and/or imprisonment',
      'Health and Safety Executive (HSE)',
      'Meets European safety standards',
      'Construction Design Management',
    ],
    correctAnswer: 2,
    explanation:
      'CE marking indicates the PPE meets relevant European safety standards and legal requirements.',
  },
  {
    id: 143,
    question: 'Who is responsible for providing PPE?',
    options: [
      'Inhalation, ingestion, skin/eye contact, injection',
      'Current, duration, path through body, frequency',
      'Personal Protective Equipment',
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
      'Practical, clear, focused on significant risks, regularly reviewed',
      'Report damage and stop using until replaced',
      'Person monitoring for fires during and after hot work',
    ],
    correctAnswer: 0,
    explanation:
      'Employees are responsible for using PPE correctly, looking after it and reporting any defects.',
  },
  {
    id: 145,
    question: 'What factors should be considered when selecting PPE?',
    options: [
      'Fire hazards, people at risk, control measures needed',
      'Nature of hazard, compatibility, comfort, fit, maintenance requirements',
      'Reduces trips, falls, fire risks and improves working conditions',
      'Person monitoring for fires during and after hot work',
    ],
    correctAnswer: 1,
    explanation:
      'PPE selection should consider hazard type, compatibility with other PPE, comfort, fit and maintenance needs.',
  },
  {
    id: 146,
    question: 'Why is PPE fit important?',
    options: [
      'Events that are likely to happen or could reasonably be expected',
      'Fire hazards, people at risk, control measures needed',
      'Ill-fitting PPE may not provide adequate protection',
      'Competent person with knowledge of the work and hazards',
    ],
    correctAnswer: 2,
    explanation:
      'Properly fitted PPE is essential for effective protection - ill-fitting equipment may not provide adequate protection.',
  },
  {
    id: 147,
    question: 'What training should be provided for PPE use?',
    options: [
      'Competent person with knowledge of the work and hazards',
      'Employer liability for acts of employees in the course of employment',
      'Residual Current Device - detects earth leakage currents',
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
      'Switch off, isolate, lock off, test, prove dead',
      'Uncomfortable PPE is less likely to be worn correctly or consistently',
      'Good housekeeping, proper lighting, suitable surfaces, appropriate footwear',
    ],
    correctAnswer: 0,
    explanation:
      'PPE requires regular cleaning, inspection for damage and replacement when worn out or damaged.',
  },
  {
    id: 149,
    question: 'How should PPE be stored?',
    options: [
      'To prevent electric shock during maintenance work',
      'Clean, dry place away from contamination and damage',
      'A skull and crossbones in a red-bordered diamond',
      'Fire wardens or designated responsible persons',
    ],
    correctAnswer: 1,
    explanation:
      'PPE should be stored in clean, dry conditions away from contamination and potential damage.',
  },
  {
    id: 150,
    question: 'What should workers do if PPE is damaged?',
    options: [
      'If they employ 5 or more people',
      'Safety Extra Low Voltage - separated from earth',
      'Report damage and stop using until replaced',
      'Electricity at Work Regulations 1989',
    ],
    correctAnswer: 2,
    explanation:
      'Damaged PPE should be reported immediately and not used until properly repaired or replaced.',
  },
  {
    id: 151,
    question: 'Why should workers be involved in PPE selection?',
    options: [
      'Segregated and sent to an authorised treatment facility (AATF) under the WEEE Regulations 2013',
      'A small BS 8599-1 compliant first-aid kit, plus an appointed person',
      'Protection from electrical arc blast and thermal energy',
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
      'AC causes muscular spasm and affects the heart rhythm',
      'To ensure the health, safety and welfare of all employees at work',
      'A legal notice requiring improvement to health and safety within a specified time',
    ],
    correctAnswer: 0,
    explanation:
      'PPE only protects the individual wearer, can fail, and may give a false sense of security if used incorrectly.',
  },
  {
    id: 153,
    question: 'What is meant by PPE compatibility?',
    options: [
      'Good housekeeping, proper lighting, suitable surfaces, appropriate footwear',
      'Different types of PPE work together without reducing protection',
      'Current, duration, path through body, frequency',
      'Person with sufficient training, experience and knowledge to prevent danger',
    ],
    correctAnswer: 1,
    explanation:
      'PPE compatibility means different types can be worn together without one reducing the effectiveness of another.',
  },
  {
    id: 154,
    question: 'How often should PPE be inspected?',
    options: [
      'Construction Design Management',
      'Unlimited fine, remedial orders, publicity orders',
      'Before each use and regularly during use',
      'More than 30 days or 500 person days',
    ],
    correctAnswer: 2,
    explanation:
      'PPE should be inspected before each use for damage, wear or contamination that could affect protection.',
  },
  {
    id: 155,
    question: 'What documentation should be kept for PPE?',
    options: [
      'Before issue, periodically during use, after suspected damage',
      'Hazard identification, risk evaluation, control measures, review processes',
      'A legal notice requiring improvement to health and safety within a specified time',
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
      'Designated routes, barriers, crossing points, traffic management',
      'Inhalation, ingestion, skin/eye contact, injection',
      'Regular cleaning, inspection, replacement when damaged or worn',
    ],
    correctAnswer: 0,
    explanation:
      'PPE assessment systematically evaluates hazards and selects appropriate equipment to provide adequate protection.',
  },
  {
    id: 157,
    question: 'When should PPE be replaced?',
    options: [
      "Unlimited fine, remedial orders, publicity orders",
      "When damaged, worn out, or manufacturer's expiry date reached",
      "Prevent unauthorised access and protect the public from site hazards",
      "To ensure the tester is working before and after testing",
    ],
    correctAnswer: 1,
    explanation:
      "PPE should be replaced when damaged, worn beyond safe use, or when manufacturer's expiry date is reached.",
  },
  {
    id: 158,
    question: 'What factors affect PPE effectiveness?',
    options: [
      'To represent employees in consultations with employers on health and safety matters',
      'Balance the risk against the cost and effort of reducing it',
      'Correct selection, proper use, good maintenance, adequate training',
      'Cut-resistant gloves, chemical-resistant gloves, thermal gloves, electrical gloves',
    ],
    correctAnswer: 2,
    explanation:
      'PPE effectiveness depends on correct selection for hazards, proper use, good maintenance and adequate user training.',
  },
  {
    id: 159,
    question: 'What is the role of supervisors in PPE management?',
    options: [
      'Identify hazards, decide who might be harmed, evaluate risks, record findings, review',
      'Regular cleaning, inspection, replacement when damaged or worn',
      'When there\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s exposure to specific hazards like noise, vibration, asbestos',
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
      'A legal notice requiring immediate cessation of activities that pose imminent danger',
      'For high-risk work like confined spaces, hot work, electrical isolation',
      'Significant findings, people at risk, control measures',
    ],
    correctAnswer: 0,
    explanation:
      'Contaminated PPE requires safe decontamination or disposal according to specific procedures for the contaminant type.',
  },
  {
    id: 161,
    question: 'What are the categories of PPE?',
    options: [
      'Good design, training, procedures, culture, and learning from mistakes',
      'Category I (simple), Category II (intermediate), Category III (complex)',
      'Flammable — the substance, vapour or gas can ignite easily',
      'Electrical insulation properties and arc flash protection',
    ],
    correctAnswer: 1,
    explanation:
      'PPE is categorised as Category I (simple), Category II (intermediate), or Category III (complex) based on risk level.',
  },
  {
    id: 162,
    question: "What requires special consideration for electrical workers' PPE?",
    options: [
      'Hazard identification, risk evaluation, control measures, review processes',
      'Act on findings, prioritise by risk, monitor progress',
      'Electrical insulation properties and arc flash protection',
      'Cleaner air is near the floor as smoke rises',
    ],
    correctAnswer: 2,
    explanation:
      'Electrical workers need PPE with electrical insulation properties and protection against arc flash hazards.',
  },
  {
    id: 163,
    question: 'What is arc flash protection?',
    options: [
      'Before each use and regularly during use',
      'Secure, ventilated areas with appropriate containment and labelling',
      'Multiple methods: landline, mobile, radio, alarms',
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
      'Ill-fitting PPE may not provide adequate protection',
      'Competent persons, supervisors, and experienced workers',
      'The likelihood that a hazard will cause harm and the severity of that harm',
    ],
    correctAnswer: 0,
    explanation:
      'Electrical insulating gloves must be tested before issue, regularly during use, and after any suspected damage.',
  },
  {
    id: 165,
    question: 'What is the purpose of PPE marking and labelling?',
    options: [
      'Duties that must be complied with regardless of cost or practicability',
      'Identify PPE type, performance standards, limitations, expiry dates',
      'Regular cleaning, inspection, replacement when damaged or worn',
      'Health and safety measures, risks, preventive measures, competent persons',
    ],
    correctAnswer: 1,
    explanation:
      'Marking identifies PPE type, performance standards met, limitations and expiry dates for safe use.',
  },
  {
    id: 166,
    question: 'How should PPE information be communicated to workers?',
    options: [
      'Wet skin, medical conditions, fatigue, contact area',
      'To plan, manage and coordinate health and safety during the pre-construction phase',
      'Training, written instructions, demonstrations, ongoing reinforcement',
      'Prove the equipment is dead using an approved voltage tester',
    ],
    correctAnswer: 2,
    explanation:
      'PPE information should be communicated through training, written instructions, demonstrations and ongoing reinforcement.',
  },
  {
    id: 167,
    question: 'What role does comfort play in PPE effectiveness?',
    options: [
      'Designated routes, barriers, crossing points, traffic management',
      'Communicate hazards, restrictions, mandatory requirements, emergency information',
      'Before issue, periodically during use, after suspected damage',
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
      'Raise the alarm, call fire brigade, evacuate if safe to do so',
      'To identify hazards and evaluate risks to implement appropriate controls',
      'To make the wearer visible in poor light or near moving vehicles',
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
      'Clean, dry place away from contamination and damage',
      'Attend site induction and safety briefing',
      'Insulated tools, gloves, mats, footwear',
      'Switch off, isolate, lock off, test, prove dead',
    ],
    correctAnswer: 1,
    explanation:
      'Site induction provides essential safety information specific to that site and must be completed before starting work.',
  },
  {
    id: 170,
    question: 'What information should be covered in a site induction?',
    options: [
      'Reduces trips, falls, fire risks and improves working conditions',
      'Regulations are legally binding, guidance is advisory',
      'Site layout, hazards, emergency procedures, site rules, welfare facilities',
      'Assessment, selection, training, maintenance, monitoring, review',
    ],
    correctAnswer: 2,
    explanation:
      'Site induction should cover site layout, specific hazards, emergency procedures, site rules and welfare facilities.',
  },
  {
    id: 171,
    question: 'What is a construction phase plan?',
    options: [
      'Vehicle movements, hand signals, hazard awareness, communication',
      'High winds, ice, heavy rain, extreme temperatures, lightning',
      'Fire hazards, people at risk, control measures needed',
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
      'To take reasonable care of themselves and others, and cooperate with employers',
      'Toilets, washing facilities, drinking water, rest areas, changing rooms',
      'For high-risk activities, complex work, CDM projects',
      'To ensure the health, safety and welfare of all employees at work',
    ],
    correctAnswer: 1,
    explanation:
      'Welfare facilities should include toilets, washing facilities, drinking water, rest areas and changing rooms.',
  },
  {
    id: 174,
    question: 'What is the purpose of site security?',
    options: [
      'Identify PPE type, performance standards, limitations, expiry dates',
      'Elimination, substitution, engineering controls, administrative controls, PPE',
      'Prevent unauthorised access, protect workers and public, secure materials',
      'Deaths, specified injuries, over-7-day injuries, diseases, dangerous occurrences',
    ],
    correctAnswer: 2,
    explanation:
      'Site security prevents unauthorised access, protects workers and the public, and secures materials and equipment.',
  },
  {
    id: 175,
    question: 'What housekeeping practices improve site safety?',
    options: [
      'Systematic analysis of how and why people make mistakes',
      'Regularly, after incidents, when changes occur',
      'To make the wearer visible in poor light or near moving vehicles',
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
      'Cut-resistant gloves, chemical-resistant gloves, thermal gloves, electrical gloves',
      'Different types of PPE work together without reducing protection',
      'Deaths, specified injuries, over-7-day injuries, diseases, dangerous occurrences',
    ],
    correctAnswer: 0,
    explanation:
      'Good housekeeping reduces trip and fall hazards, fire risks and creates better working conditions.',
  },
  {
    id: 177,
    question: 'What are the main causes of slips, trips and falls on construction sites?',
    options: [
      'Protection from electrical arc blast and thermal energy',
      'Poor housekeeping, uneven surfaces, inadequate lighting, unsuitable footwear',
      'Risk assessment identifies risks, method statement describes control measures',
      'Identify PPE type, performance standards, limitations, expiry dates',
    ],
    correctAnswer: 1,
    explanation:
      'Slips, trips and falls result from poor housekeeping, uneven surfaces, inadequate lighting and unsuitable footwear.',
  },
  {
    id: 178,
    question: 'How can slips, trips and falls be prevented?',
    options: [
      'Switch off power supply or remove casualty using non-conductive material',
      'Prevents conflicts, ensures compatible working methods, manages shared risks',
      'Good housekeeping, proper lighting, suitable surfaces, appropriate footwear',
      'Prove the equipment is dead using an approved voltage tester',
    ],
    correctAnswer: 2,
    explanation:
      'Prevention requires good housekeeping, adequate lighting, suitable walking surfaces and appropriate footwear.',
  },
  {
    id: 179,
    question: 'What is the purpose of site signage?',
    options: [
      'Heart muscle fibres contract randomly, stopping effective pumping',
      'Health and safety measures, risks, preventive measures, competent persons',
      'Risk that can be accepted in current circumstances based on benefits gained',
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
      'For high-risk work like confined spaces, hot work, electrical isolation',
      'Good housekeeping, proper lighting, suitable surfaces, appropriate footwear',
      'Protection from electrical arc blast and thermal energy',
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
      'Regularly, typically every 6 months or as required',
      'Work sequence, hazards, control measures, emergency procedures, supervision',
      'Designated areas, trained banksmen, separation from other activities',
    ],
    correctAnswer: 0,
    explanation:
      'Unsafe conditions should be reported immediately and the area made safe if possible without creating further risk.',
  },
  {
    id: 185,
    question: 'What is a toolbox talk?',
    options: [
      'Clean, dry place away from contamination and damage',
      'Short safety discussion on specific topics relevant to current work',
      'Uncomfortable PPE is less likely to be worn correctly or consistently',
      'Systematic evaluation to select suitable PPE for specific hazards',
    ],
    correctAnswer: 1,
    explanation:
      'Toolbox talks are short, focused safety discussions on topics relevant to current work activities.',
  },
  {
    id: 186,
    question: 'How often should toolbox talks be held?',
    options: [
      'Only if small, you\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'re trained, have escape route, and feel confident',
      'Hazard identification, risk evaluation, control measures, review processes',
      'Regularly, often weekly or before specific high-risk activities',
      'Unlimited fine, remedial orders, publicity orders',
    ],
    correctAnswer: 2,
    explanation:
      'Toolbox talks should be held regularly, often weekly, and before specific high-risk activities.',
  },
  {
    id: 187,
    question: 'What is the purpose of site inspections?',
    options: [
      'Electrical insulation properties and arc flash protection',
      'How to use, maintain, store PPE and recognise defects',
      'Hazard identification, risk evaluation, control measures, review processes',
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
      'Prohibition, warning, mandatory, emergency, fire safety signs',
      'Toilets, washing facilities, drinking water, rest areas, changing rooms',
      'Fire extinguishers, first aid kits, emergency communication, evacuation equipment',
    ],
    correctAnswer: 0,
    explanation:
      'Site inspections should be carried out by competent persons including supervisors, safety representatives and managers.',
  },
  {
    id: 189,
    question: 'What should be done with findings from site inspections?',
    options: [
      'Employees must use PPE correctly and report defects',
      'Act on findings, prioritise by risk, monitor progress',
      'Formal system to control high-risk work through written permission',
      'Workers, visitors, contractors, public, special groups',
    ],
    correctAnswer: 1,
    explanation:
      'Inspection findings should be acted upon, prioritised by risk level and progress monitored until completion.',
  },
  {
    id: 190,
    question: 'What is the role of the site safety representative?',
    options: [
      'Soil and groundwater contamination from spills and drips during refuelling',
      'Fire hazards, people at risk, control measures needed',
      'Represent workers on safety matters and investigate concerns',
      'Remove or control any element of the fire triangle',
    ],
    correctAnswer: 2,
    explanation:
      'Safety representatives represent workers on safety matters, investigate concerns and participate in consultations.',
  },
  {
    id: 191,
    question: 'What powers do safety representatives have on site?',
    options: [
      'Wet skin, medical conditions, fatigue, contact area',
      'Competent persons, supervisors, and experienced workers',
      'Employer liability for acts of employees in the course of employment',
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
      'Designated areas, trained banksmen, separation from other activities',
      'Prevent unauthorised access, protect workers and public, secure materials',
      'Report immediately to supervisor and make area safe if possible',
    ],
    correctAnswer: 0,
    explanation:
      'Good communication is essential for work coordination, safety information sharing and effective emergency response.',
  },
  {
    id: 193,
    question: 'How should hazardous substances be stored on site?',
    options: [
      'How to use, maintain, store PPE and recognise defects',
      'Secure, ventilated areas with appropriate containment and labelling',
      'Washing out concrete chutes or cement mixers into a surface water drain',
      'Identify PPE type, performance standards, limitations, expiry dates',
    ],
    correctAnswer: 1,
    explanation:
      'Hazardous substances need secure, well-ventilated storage with appropriate containment and clear labelling.',
  },
  {
    id: 194,
    question: 'What information should be available for hazardous substances?',
    options: [
      'To ensure the health, safety and welfare of all employees at work',
      'Before issue, periodically during use, after suspected damage',
      'Safety data sheets with hazard information and control measures',
      'Category I (simple), Category II (intermediate), Category III (complex)',
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
      'Report immediately to supervisor and make area safe if possible',
      'Identify PPE type, performance standards, limitations, expiry dates',
      'Only if small, you\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'re trained, have escape route, and feel confident',
    ],
    correctAnswer: 0,
    explanation:
      'COSHH assessments identify hazardous substances, exposure routes, health effects and necessary control measures.',
  },
  {
    id: 197,
    question: 'What are the main routes of entry for chemicals into the body?',
    options: [
      'Remove or protect them from ignition',
      'Inhalation, ingestion, skin/eye contact, injection',
      'Control of Substances Hazardous to Health',
      'Balance the risk against the cost and effort of reducing it',
    ],
    correctAnswer: 1,
    explanation:
      'Chemicals can enter the body through inhalation, ingestion, skin/eye contact and injection through wounds.',
  },
  {
    id: 198,
    question: 'What environmental hazards might be found on construction sites?',
    options: [
      'Significant findings, people at risk, control measures',
      'Reduces trips, falls, fire risks and improves working conditions',
      'Noise, dust, vibration, weather conditions, contaminated ground',
      'Prohibition, warning, mandatory, emergency, fire safety signs',
    ],
    correctAnswer: 2,
    explanation:
      'Environmental hazards include noise, dust, vibration, adverse weather conditions and contaminated ground.',
  },
  {
    id: 199,
    question: 'How should environmental hazards be managed?',
    options: [
      'Elimination, substitution, engineering controls, administrative controls, PPE',
      'Reduces trips, falls, fire risks and improves working conditions',
      'To ensure the health, safety and welfare of all employees at work',
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
      'Poor housekeeping, uneven surfaces, inadequate lighting, unsuitable footwear',
      'Effectiveness of control measures, changing conditions, worker compliance',
      'A document describing how work will be carried out safely',
    ],
    correctAnswer: 0,
    explanation:
      'Perimeter fencing prevents unauthorised access and protects the public from construction hazards.',
  },
  {
    id: 201,
    question: 'What considerations apply to site access and egress?',
    options: [
      'When there\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s risk of cuts, chemical contact, burns, or electrical shock',
      'Safe routes, adequate width, good visibility, emergency access',
      'Remove or control any element of the fire triangle',
      'To give practical guidance on complying with legal duties',
    ],
    correctAnswer: 1,
    explanation:
      'Site access must provide safe routes, adequate width, good visibility and maintain emergency access.',
  },
  {
    id: 202,
    question: 'What is the importance of site planning for safety?',
    options: [
      'Guide vehicles safely and control vehicle movements',
      'Hazard identification, risk evaluation, control measures, review processes',
      'Reduces conflicts between activities, controls access, manages hazards',
      'Wet skin, medical conditions, fatigue, contact area',
    ],
    correctAnswer: 2,
    explanation:
      'Good site planning reduces conflicts between activities, controls access routes and helps manage hazards.',
  },
  {
    id: 203,
    question: 'How should deliveries be managed safely on site?',
    options: [
      'Correct selection, proper use, good maintenance, adequate training',
      'Safe routes, adequate width, good visibility, emergency access',
      'Systematic evaluation of fire hazards and risks to implement control measures',
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
      'Heart muscle fibres contract randomly, stopping effective pumping',
      'Statement of intent, organisation, and arrangements',
      'Safety Extra Low Voltage - separated from earth',
    ],
    correctAnswer: 0,
    explanation:
      'A banksman guides vehicles safely during reversing and manoeuvring operations to prevent accidents.',
  },
  {
    id: 205,
    question: 'What training should banksmen receive?',
    options: [
      'Update risk assessments and method statements',
      'Vehicle movements, hand signals, hazard awareness, communication',
      'Immediately by telephone followed by written report within 10 days',
      'To ensure the health, safety and welfare of all employees at work',
    ],
    correctAnswer: 1,
    explanation:
      'Banksmen need training in vehicle movements, standard hand signals, hazard awareness and communication.',
  },
  {
    id: 206,
    question: 'What is the purpose of exclusion zones around plant and machinery?',
    options: [
      'Guide vehicles safely and control vehicle movements',
      'Clean, dry place away from contamination and damage',
      'Prevent people entering dangerous areas during operation',
      'Electrical insulation properties and arc flash protection',
    ],
    correctAnswer: 2,
    explanation:
      'Exclusion zones prevent people entering dangerous areas around operating plant and machinery.',
  },
  {
    id: 207,
    question: 'How should site traffic and pedestrians be separated?',
    options: [
      'When damaged, worn out, or manufacturer\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s expiry date reached',
      'Unlimited fine, remedial orders, publicity orders',
      'Site layout, hazards, emergency procedures, site rules, welfare facilities',
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
      'Constructed, maintained and used to prevent danger',
      'To systematically evaluate and prioritise risks',
      'Plan, manage and coordinate health and safety during the construction phase',
    ],
    correctAnswer: 0,
    explanation:
      'Various weather conditions affect safety including high winds, ice, heavy rain, extreme temperatures and lightning.',
  },
  {
    id: 209,
    question: 'What precautions should be taken in extreme weather?',
    options: [
      'To ensure the health, safety and welfare of all employees at work',
      'Stop high-risk activities, provide shelter, monitor conditions',
      'Secure, ventilated areas with appropriate containment and labelling',
      'To detect health effects early and take preventive action',
    ],
    correctAnswer: 1,
    explanation:
      'Extreme weather may require stopping high-risk activities, providing shelter and continuously monitoring conditions.',
  },
  {
    id: 210,
    question: 'What is the importance of coordination between different trades on site?',
    options: [
      'Elimination, substitution, engineering controls, administrative controls, PPE',
      'Category I (simple), Category II (intermediate), Category III (complex)',
      'Prevents conflicts, ensures compatible working methods, manages shared risks',
      '2000 — chrysotile (white) asbestos was not fully banned in the UK until 1999',
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
      'Reduces trips, falls, fire risks and improves working conditions',
      'Guide vehicles safely and control vehicle movements',
      'Significant findings, people at risk, control measures',
    ],
    correctAnswer: 0,
    explanation:
      'Fire prevention involves removing or controlling heat sources, fuel sources, or oxygen supply.',
  },
  {
    id: 213,
    question: 'What are the main classes of fire?',
    options: [
      'Risk assessment identifies risks, method statement describes control measures',
      'Class A (solids), B (liquids), C (gases), D (metals), F (cooking oils)',
      'Elimination, substitution, engineering controls, administrative controls, PPE',
      'Serious injuries including fractures, amputations, serious burns',
    ],
    correctAnswer: 1,
    explanation:
      'Fire classes are: A (ordinary combustibles), B (flammable liquids), C (gases), D (metals), F (cooking oils).',
  },
  {
    id: 214,
    question: 'What type of fire extinguisher should be used on Class A fires?',
    options: [
      'Up to 50V AC or 120V DC',
      'Health and Safety Executive (HSE)',
      'Water, foam, or dry powder',
      'Principal contractor',
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
      'Toxic gases that can cause unconsciousness and death',
      'Report damage and stop using until replaced',
      'Secure, ventilated areas with appropriate containment and labelling',
    ],
    correctAnswer: 0,
    explanation:
      'Water conducts electricity and using it on live electrical equipment can cause electrocution.',
  },
  {
    id: 217,
    question: 'What should you do if you discover a fire?',
    options: [
      'To prevent work-related illness and promote health and wellbeing',
      'Raise the alarm, call fire brigade, evacuate if safe to do so',
      'Assessment, selection, training, maintenance, monitoring, review',
      'Systematic evaluation of fire hazards and risks to implement control measures',
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
      "Elimination, substitution, engineering controls, administrative controls, PPE",
      "Hazard identification, risk evaluation, control measures, review processes",
      "Internal damage may be extensive despite limited external signs",
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
      'As Low As Reasonably Practicable',
      'Health and Safety Executive (HSE)',
      'Electricity at Work Regulations 1989',
    ],
    correctAnswer: 0,
    explanation:
      'Life safety is paramount - people must be evacuated before considering property or equipment.',
  },
  {
    id: 221,
    question: 'What should you do when the fire alarm sounds?',
    options: [
      'When conditions change, after incidents, regularly',
      'Stop work immediately and evacuate via nearest safe exit',
      'To prevent work-related illness and promote health and wellbeing',
      'Identify PPE type, performance standards, limitations, expiry dates',
    ],
    correctAnswer: 1,
    explanation:
      'When fire alarms sound, stop work immediately and evacuate via the nearest safe exit route.',
  },
  {
    id: 222,
    question: 'Where should people assemble during evacuation?',
    options: [
      'To give practical guidance on complying with legal duties',
      'Significant findings, people at risk, control measures',
      'At designated assembly points away from the building',
      'Different types of PPE work together without reducing protection',
    ],
    correctAnswer: 2,
    explanation:
      'People should assemble at designated assembly points that are a safe distance from the building.',
  },
  {
    id: 223,
    question: 'Who should take a roll call at assembly points?',
    options: [
      'Close doors, signal for help, stay low, await rescue',
      'Insulated tools, gloves, mats, footwear',
      'Skin condition (wet/dry), contact area, voltage, frequency',
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
      'Identify PPE type, performance standards, limitations, expiry dates',
      'Prevent people entering dangerous areas during operation',
      'Electrical insulation properties and arc flash protection',
    ],
    correctAnswer: 0,
    explanation:
      'Fire brigade should be told: exact location, type of fire, people involved/missing, and any hazardous materials.',
  },
  {
    id: 225,
    question: 'What is a fire risk assessment?',
    options: [
      'Residual Current Device - detects earth leakage currents',
      'Systematic evaluation of fire hazards and risks to implement control measures',
      'Regularly, after incidents, when changes occur to site or operations',
      'To prevent work-related illness and promote health and wellbeing',
    ],
    correctAnswer: 1,
    explanation:
      'Fire risk assessment systematically evaluates fire hazards and risks to implement appropriate prevention and protection measures.',
  },
  {
    id: 226,
    question: 'What should a fire risk assessment identify?',
    options: [
      'Balance the risk against the cost and effort of reducing it',
      'Use reduced voltage supplies (110V or lower), RCD protection',
      'Fire hazards, people at risk, control measures needed',
      'Insulated tools, gloves, mats, footwear',
    ],
    correctAnswer: 2,
    explanation:
      'Fire risk assessments should identify fire hazards, people at risk, and determine necessary control measures.',
  },
  {
    id: 227,
    question: 'How often should fire drills be conducted?',
    options: [
      'Reduces trips, falls, fire risks and improves working conditions',
      'To ensure the tester is working before and after testing',
      'Statement of intent, organisation, and arrangements',
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
      'Decontaminate safely or dispose of according to specific procedures',
      '2000 — chrysotile (white) asbestos was not fully banned in the UK until 1999',
      'Elimination, substitution, engineering controls, administrative controls, PPE',
    ],
    correctAnswer: 0,
    explanation:
      'Evaluate evacuation times, route effectiveness, alarm audibility, assembly procedures and overall drill effectiveness.',
  },
  {
    id: 229,
    question: 'What are the key components of emergency evacuation routes?',
    options: [
      'Formal system to control high-risk work through written permission',
      'Clearly marked, well-lit, unobstructed, leading to safe areas',
      'Remove or control any element of the fire triangle',
      'Enter premises, examine, investigate, issue notices, prosecute',
    ],
    correctAnswer: 1,
    explanation:
      'Evacuation routes must be clearly marked, well-lit, kept unobstructed, and lead to safe areas outside.',
  },
  {
    id: 230,
    question: 'What is the role of fire wardens?',
    options: [
      'To take reasonable care of themselves and others, and cooperate with employers',
      'Regularly, often weekly or before specific high-risk activities',
      'Assist with evacuation, check areas are clear, liaise with fire brigade',
      'Location, type of fire, people involved, hazardous materials present',
    ],
    correctAnswer: 2,
    explanation:
      'Fire wardens assist evacuation, check their areas are clear, help colleagues and liaise with emergency services.',
  },
  {
    id: 231,
    question: 'What training should fire wardens receive?',
    options: [
      'Lack experience, may take risks, physical development incomplete',
      'Risk remaining after control measures have been implemented',
      'Events that are likely to happen or could reasonably be expected',
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
      'Report damage and stop using until replaced',
      'Fire hazards, people at risk, control measures needed',
      'Ill-fitting PPE may not provide adequate protection',
    ],
    correctAnswer: 0,
    explanation:
      'If trapped: close doors to slow fire spread, signal for help, stay low to avoid smoke, and await rescue.',
  },
  {
    id: 233,
    question: 'Why should you stay low in smoke?',
    options: [
      'Unlimited fine, remedial orders, publicity orders',
      'Cleaner air is near the floor as smoke rises',
      'Prevent people entering dangerous areas during operation',
      'Safety glasses, goggles, face shields, welding screens',
    ],
    correctAnswer: 1,
    explanation:
      'Smoke rises, so cleaner, cooler air with more oxygen is found closer to the floor.',
  },
  {
    id: 234,
    question: 'What is the main danger from smoke?',
    options: [
      'Planning to maintain operations during and after emergencies',
      'Systematic analysis of how and why people make mistakes',
      'Toxic gases that can cause unconsciousness and death',
      'Serious injuries including fractures, amputations, serious burns',
    ],
    correctAnswer: 2,
    explanation:
      'Smoke contains toxic gases like carbon monoxide that can cause unconsciousness and death within minutes.',
  },
  {
    id: 235,
    question: 'What emergency equipment should be available on construction sites?',
    options: [
      'Toilets, washing facilities, drinking water, rest areas, changing rooms',
      'Benefits, costs, public perception, legal requirements, available alternatives',
      'Employer liability for acts of employees in the course of employment',
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
      'Before issue, periodically during use, after suspected damage',
      'Permits, fire watches, cleared areas, fire extinguishers nearby',
      'Location, type of fire, people involved, hazardous materials present',
    ],
    correctAnswer: 0,
    explanation:
      'Fire safety management includes prevention measures, detection systems, suppression equipment and evacuation procedures.',
  },
  {
    id: 237,
    question: 'How should hot work be controlled to prevent fires?',
    options: [
      'Reporting of Injuries, Diseases and Dangerous Occurrences Regulations',
      'Permits, fire watches, cleared areas, fire extinguishers nearby',
      'Workers know the practical requirements and comfort needed for effective use',
      'To identify hazards and evaluate risks to implement appropriate controls',
    ],
    correctAnswer: 1,
    explanation:
      'Hot work requires permits, trained fire watches, cleared work areas and appropriate fire extinguishers nearby.',
  },
  {
    id: 238,
    question: 'What is a fire watch?',
    options: [
      'Regularly, often weekly or before specific high-risk activities',
      'Certain hazards pose additional risks to mother and unborn child',
      'Person monitoring for fires during and after hot work',
      'Systematic evaluation to select suitable PPE for specific hazards',
    ],
    correctAnswer: 2,
    explanation:
      'A fire watch is a trained person who monitors for fires during hot work and for a period afterwards.',
  },
  {
    id: 239,
    question: 'What should be done with combustible materials during hot work?',
    options: [
      'Report damage and stop using until replaced',
      'Something with potential to cause harm',
      'Earthing and automatic disconnection',
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
      'Prove the equipment is dead using an approved voltage tester',
      'Clear walkways, proper storage, regular cleaning, waste removal',
      'Safety Extra Low Voltage - separated from earth',
    ],
    correctAnswer: 0,
    explanation:
      'Sites should have multiple communication methods including landlines, mobiles, radios and alarm systems.',
  },
  {
    id: 241,
    question: 'What information should be immediately available in emergencies?',
    options: [
      'Act on findings, prioritise by risk, monitor progress',
      'Emergency contacts, site plans, hazard information, evacuation procedures',
      'Deaths, specified injuries, over-7-day injuries, diseases, dangerous occurrences',
      'Ensure control measures are followed and remain effective',
    ],
    correctAnswer: 1,
    explanation:
      'Emergency information should include contacts, site plans, hazard details and evacuation procedures.',
  },
  {
    id: 242,
    question: 'How should emergency procedures be communicated?',
    options: [
      'Stop work immediately and evacuate via nearest safe exit',
      'Insulated tools, gloves, mats, footwear',
      'Training, written procedures, drills, signs, induction',
      'Voltage between hand and feet when touching equipment',
    ],
    correctAnswer: 2,
    explanation:
      'Emergency procedures should be communicated through training, written procedures, drills, signage and induction.',
  },
  {
    id: 243,
    question: 'What is the purpose of emergency lighting?',
    options: [
      'Residual Current Device - detects earth leakage currents',
      'Toilets, washing facilities, drinking water, rest areas, changing rooms',
      'A serious criminal offence where an organisation\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s failure causes death',
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
      'AC causes muscular spasm and affects the heart rhythm',
      'Prohibition, warning, mandatory, emergency, fire safety signs',
      'To make the wearer visible in poor light or near moving vehicles',
    ],
    correctAnswer: 0,
    explanation:
      'Emergency lighting should be tested monthly for operation and annually for full duration capability.',
  },
  {
    id: 245,
    question: 'What should be included in emergency evacuation plans?',
    options: [
      'When there\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s exposure to specific hazards like noise, vibration, asbestos',
      'Routes, assembly points, responsibilities, special needs, communication methods',
      'Only protects the individual, can fail, may give false sense of security',
      'A legal notice requiring immediate cessation of activities that pose imminent danger',
    ],
    correctAnswer: 1,
    explanation:
      'Plans should include escape routes, assembly points, responsibilities, provisions for special needs and communication.',
  },
  {
    id: 246,
    question: 'How should people with disabilities be considered in emergency planning?',
    options: [
      'Burn caused by electric arc/flash producing intense heat',
      'Regularly, after incidents, when changes occur',
      'Personal emergency evacuation plans and assistance arrangements',
      'At designated assembly points away from the building',
    ],
    correctAnswer: 2,
    explanation:
      'People with disabilities need personal emergency evacuation plans with specific assistance arrangements.',
  },
  {
    id: 247,
    question: 'What should be done after an emergency evacuation?',
    options: [
      'Certain hazards pose additional risks to mother and unborn child',
      'Regular cleaning, inspection, replacement when damaged or worn',
      'Prevent unauthorised access, protect workers and public, secure materials',
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
      'Touching exposed metalwork that has become live due to a fault',
      'Evacuation time, route effectiveness, alarm audibility, assembly procedures',
      'To systematically evaluate and prioritise risks',
    ],
    correctAnswer: 0,
    explanation:
      'Business continuity planning ensures operations can continue during emergencies and recovery afterwards.',
  },
  {
    id: 249,
    question: 'What should be included in emergency training?',
    options: [
      'Supplies may be missing or inadequate when a real injury occurs, leaving the casualty without treatment',
      'Alarm procedures, evacuation routes, assembly points, equipment use, site-specific risks',
      'Cool with water for 20+ minutes, cover with sterile dressing, seek medical help',
      'A serious criminal offence where an organisation\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s failure causes death',
    ],
    correctAnswer: 1,
    explanation:
      'Training should cover alarm procedures, evacuation routes, assembly points, equipment use, and site-specific risks.',
  },
  {
    id: 250,
    question: 'How often should emergency procedures be reviewed and updated?',
    options: [
      'Risk assessment identifies risks, method statement describes control measures',
      'When damaged, worn out, or manufacturer\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s expiry date reached',
      'Regularly, after incidents, when changes occur to site or operations',
      'Employer liability for acts of employees in the course of employment',
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
      'Elimination, substitution, engineering controls, administrative controls, PPE',
      'Immediately by telephone followed by written report within 10 days',
      'Clear walkways, proper storage, regular cleaning, waste removal',
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
      'Assessment, selection, training, maintenance, monitoring, review',
      'Issue records, training records, inspection records, maintenance records',
      'Clearly marked, well-lit, unobstructed, leading to safe areas',
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
      'Removing or disturbing AIB (asbestos insulating board), sprayed coatings, or pipe lagging',
      'Whoever is responsible for the maintenance and repair of the premises (often the owner or, via the lease, the occupier)',
      'Supplies may be missing or inadequate when a real injury occurs, leaving the casualty without treatment',
      'Segregate at source — copper to a metals merchant, PVC to a plastic recycling stream, general waste to skip',
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
      'Use reduced voltage supplies (110V or lower), RCD protection',
      'Prevent unauthorised access and protect the public from site hazards',
      'A diamond with a black image of a hand and a surface being eaten away by liquid drops',
      'Noise, dust, vibration, weather conditions, contaminated ground',
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
      'Soil and groundwater contamination from spills and drips during refuelling',
      'To detect health effects early and take preventive action',
      'To plan, manage and coordinate health and safety during the pre-construction phase',
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
      "Stop, don't disturb the tile, isolate the area, ring the supervisor and ask the duty holder for the asbestos register",
      "Anything you have not been trained or signed off to do — including live LV work, suspected asbestos, or work outside the scope of the RAMS",
      "A diamond with a black image of a hand and a surface being eaten away by liquid drops",
      "Whoever is responsible for the maintenance and repair of the premises (often the owner or, via the lease, the occupier)",
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
      "Chrysotile (white) — the workhorse, used in cement sheets, textured coatings, gaskets, vinyl floor tiles and some electrical insulation; banned only in 1999",
      "Escalate above the supervisor (your own employer, the principal contractor, your scheme provider) and record the conversation in writing",
      "Near-misses identify weaknesses before they cause real incidents — the same control failure will eventually cause an actual pollution event",
      "Anyone can switch a breaker back on by mistake or routine; a personal padlock with the only key retained, plus a caution notice, prevents inadvertent re-energisation",
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
      'Supplies may be missing or inadequate when a real injury occurs, leaving the casualty without treatment',
      'Noise nuisance and dust — both can lead to abatement notices from the local authority under the Environmental Protection Act 1990',
      'Stop work, isolate yourself from the area, notify your supervisor and update the risk assessment before continuing',
      'Escalate above the supervisor (your own employer, the principal contractor, your scheme provider) and record the conversation in writing',
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
      "Escalate above the supervisor (your own employer, the principal contractor, your scheme provider) and record the conversation in writing",
      "To confirm the test instrument was working correctly both before AND after the dead test — a fault that develops mid-test could give a false dead reading",
      "Whoever is responsible for the maintenance and repair of the premises (often the owner or, via the lease, the occupier)",
      "Stop work, treat the material as 'presumed asbestos' until a sample has been analysed by an accredited lab or the duty holder produces a clean survey",
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
      'Adequate, suitable and sufficient first-aid equipment, facilities and personnel based on a needs assessment',
      'Electric shock, arc flash burns, potential fatality — and personal liability under EAWR 1989 Reg 14',
      'Apply a personal padlock to the lock-off device, retain the only key, and display a caution notice giving your name and contact',
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
      'Stop work, isolate yourself from the area, notify your supervisor and update the risk assessment before continuing',
      'Less severe health hazards: skin/eye irritation, skin sensitiser, respiratory irritation or harmful if swallowed/inhaled',
      'Identify hazards, decide who might be harmed, evaluate risks, record findings, review',
      'Regularly (typically monthly) — and after every use; sterile items have expiry dates and must be replaced',
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
      'To take reasonable care of themselves and others, and cooperate with employers',
      'The Environment Agency (or Natural Resources Wales / SEPA in the devolved nations)',
      'Hazardous to the aquatic environment — the substance is toxic to aquatic life with long-lasting effects',
      'Alarm procedures, evacuation routes, assembly points, equipment use, site-specific risks',
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
      'An automated external defibrillator (AED) — useful where the casualty may suffer ventricular fibrillation from electric shock',
      'Damage to equipment, fire, RIDDOR-reportable dangerous occurrence, criminal prosecution under EAWR/HASAWA, dismissal, and loss of competent person status',
      'Escalate above the supervisor (your own employer, the principal contractor, your scheme provider) and record the conversation in writing',
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
      'Noise nuisance and dust — both can lead to abatement notices from the local authority under the Environmental Protection Act 1990',
      'Stop work, treat the material as \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'presumed asbestos\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\' until a sample has been analysed by an accredited lab or the duty holder produces a clean survey',
      'Hazardous waste (mercury content) — segregate, store upright in a labelled container and consign to a permitted carrier',
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
      'Anyone can switch a breaker back on by mistake or routine; a personal padlock with the only key retained, plus a caution notice, prevents inadvertent re-energisation',
      'Sweep up the dust and bag it for disposal yourself — sweeping releases more fibres into the air, and a domestic vacuum disperses them further',
      'Whoever is responsible for the maintenance and repair of the premises (often the owner or, via the lease, the occupier)',
      'To confirm the test instrument was working correctly both before AND after the dead test — a fault that develops mid-test could give a false dead reading',
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
      'Category I (simple), Category II (intermediate), Category III (complex)',
      'Planning to maintain operations during and after emergencies',
      'Washing out concrete chutes or cement mixers into a surface water drain',
      'Before issue, periodically during use, after suspected damage',
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
      'Report immediately to supervisor and make area safe if possible',
      'Hazard identification, risk evaluation, control measures, review processes',
      'Skin condition (wet/dry), contact area, voltage, frequency',
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
      'Adequate, suitable and sufficient first-aid equipment, facilities and personnel based on a needs assessment',
      'Segregated and sent to an authorised treatment facility (AATF) under the WEEE Regulations 2013',
      'Each phase to neutral, each phase to earth, AND between each pair of phases (L1-L2, L2-L3, L1-L3)',
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
      'Hazardous to the aquatic environment — the substance is toxic to aquatic life with long-lasting effects',
      'Segregate at source — copper to a metals merchant, PVC to a plastic recycling stream, general waste to skip',
      'Cool with water for 20+ minutes, cover with sterile dressing, seek medical help',
      'Apply a personal padlock to the lock-off device, retain the only key, and display a caution notice giving your name and contact',
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
      'There is no hierarchy',
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
      'Regularly (typically monthly) — and after every use; sterile items have expiry dates and must be replaced',
      'Anything you have not been trained or signed off to do — including live LV work, suspected asbestos, or work outside the scope of the RAMS',
      'Segregated, secured against theft, in a labelled and dry container — transferred only to an authorised metal carrier with a transfer note',
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
      'Benefits, costs, public perception, legal requirements, available alternatives',
      'To take reasonable care of themselves and others, and cooperate with employers',
      'Effectiveness of control measures, changing conditions, worker compliance',
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
      'Noise nuisance and dust — both can lead to abatement notices from the local authority under the Environmental Protection Act 1990',
      'Asbestos insulating board (AIB) ceiling tiles, pipe lagging, textured coatings (Artex), and electrical insulation backing boards behind old fuseboards',
      'Segregated, secured against theft, in a labelled and dry container — transferred only to an authorised metal carrier with a transfer note',
      'A two-pole voltage indicator (fused or current-limited) compliant with GS38, used with a proving unit',
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
      'Each phase to neutral, each phase to earth, AND between each pair of phases (L1-L2, L2-L3, L1-L3)',
      'Apply a personal padlock to the lock-off device, retain the only key, and display a caution notice giving your name and contact',
      'Alarm procedures, evacuation routes, assembly points, equipment use, site-specific risks',
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
      'Segregated, secured against theft, in a labelled and dry container — transferred only to an authorised metal carrier with a transfer note',
      'Tell the appointed person or first-aider so the kit is restocked, and note it in the accident book if the use was for an injury',
      'Regularly (typically monthly) — and after every use; sterile items have expiry dates and must be replaced',
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
      'A two-pole voltage indicator (fused or current-limited) compliant with GS38, used with a proving unit',
      'Stop them if safe, report immediately to your supervisor and the principal contractor; record what you saw',
      'To take reasonable care of themselves and others, and cooperate with employers',
      'Supplies may be missing or inadequate when a real injury occurs, leaving the casualty without treatment',
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
      'Person with sufficient training, experience and knowledge to prevent danger',
      'Only protects the individual, can fail, may give false sense of security',
      'Removing or disturbing AIB (asbestos insulating board), sprayed coatings, or pipe lagging',
      'A diamond with a black image of a hand and a surface being eaten away by liquid drops',
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
      'Stop work, treat the material as \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'presumed asbestos\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\' until a sample has been analysed by an accredited lab or the duty holder produces a clean survey',
      'Noise nuisance and dust — both can lead to abatement notices from the local authority under the Environmental Protection Act 1990',
      'Chrysotile (white) — the workhorse, used in cement sheets, textured coatings, gaskets, vinyl floor tiles and some electrical insulation; banned only in 1999',
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
      'Regularly, typically every 6 months or as required',
      'How to use, maintain, store PPE and recognise defects',
      'Attend site induction and safety briefing',
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
      'Risk assessment identifies risks, method statement describes control measures',
      'Adequate, suitable and sufficient first-aid equipment, facilities and personnel based on a needs assessment',
      'Safety shoes/boots with toe protection, puncture resistance, electrical insulation',
      'A legal notice requiring improvement to health and safety within a specified time',
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
      'Segregated, secured against theft, in a labelled and dry container — transferred only to an authorised metal carrier with a transfer note',
      'Switch off, lock off, place caution notice, prove voltage indicator on a known supply, test the circuit dead at all relevant points, prove the indicator again',
      'A person appointed to take charge of first-aid arrangements (calling emergency services, looking after kit) when no first-aider is required by the assessment',
      'Whoever is responsible for the maintenance and repair of the premises (often the owner or, via the lease, the occupier)',
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
      'Evacuation time, route effectiveness, alarm audibility, assembly procedures',
      'Relevant findings of risk assessment and control measures required',
      'To ensure the health, safety and welfare of all employees at work',
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
      "In a clearly identified, easily accessible location known to all workers — flagged at induction and on the site's emergency information",
      "Segregate at source — copper to a metals merchant, PVC to a plastic recycling stream, general waste to skip",
      "Regularly (typically monthly) — and after every use; sterile items have expiry dates and must be replaced",
      "Less severe health hazards: skin/eye irritation, skin sensitiser, respiratory irritation or harmful if swallowed/inhaled",
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
      'Near-misses identify weaknesses before they cause real incidents — the same control failure will eventually cause an actual pollution event',
      'An automated external defibrillator (AED) — useful where the casualty may suffer ventricular fibrillation from electric shock',
      'To demonstrate employer\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s commitment to health and safety and provide framework for action',
      'Information about the structure needed for future construction work, maintenance, and demolition',
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
      'To take reasonable care of themselves and others, and cooperate with employers',
      'Prevents conflicts, ensures compatible working methods, manages shared risks',
      'Supplies may be missing or inadequate when a real injury occurs, leaving the casualty without treatment',
      'Plan, manage and coordinate health and safety during the construction phase',
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
      'A two-pole voltage indicator (fused or current-limited) compliant with GS38, used with a proving unit',
      'Regularly (typically monthly) — and after every use; sterile items have expiry dates and must be replaced',
      'They are no longer sterile and may introduce infection or contamination to the next casualty',
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
      'Whoever is responsible for the maintenance and repair of the premises (often the owner or, via the lease, the occupier)',
      'Routes, assembly points, responsibilities, special needs, communication methods',
      'The Environment Agency (or Natural Resources Wales / SEPA in the devolved nations)',
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
      'Spills above certain thresholds must be reported to the Environment Agency, and the firm needs to investigate the cause to prevent a repeat',
      'Tell the appointed person or first-aider so the kit is restocked, and note it in the accident book if the use was for an injury',
      'Stop work, treat the material as \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'presumed asbestos\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\' until a sample has been analysed by an accredited lab or the duty holder produces a clean survey',
      'Segregated into its own skip — the disposal cost is much lower and it can often be reused or recycled as aggregate',
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
      'Supplies may be missing or inadequate when a real injury occurs, leaving the casualty without treatment',
      'Hazard identification, risk evaluation, control measures, review processes',
      'They are no longer sterile and may introduce infection or contamination to the next casualty',
      'Deaths, specified injuries, over-7-day injuries, diseases, dangerous occurrences',
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
      'Noise nuisance and dust — both can lead to abatement notices from the local authority under the Environmental Protection Act 1990',
      'Anything you have not been trained or signed off to do — including live LV work, suspected asbestos, or work outside the scope of the RAMS',
      'Chrysotile (white) — the workhorse, used in cement sheets, textured coatings, gaskets, vinyl floor tiles and some electrical insulation; banned only in 1999',
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
      'Competent persons including supervisors, safety representatives, managers',
      'Issue records, training records, inspection records, maintenance records',
      'A legal notice requiring improvement to health and safety within a specified time',
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
      'Chrysotile (white) — the workhorse, used in cement sheets, textured coatings, gaskets, vinyl floor tiles and some electrical insulation; banned only in 1999',
      'To confirm the test instrument was working correctly both before AND after the dead test — a fault that develops mid-test could give a false dead reading',
      'Anything you have not been trained or signed off to do — including live LV work, suspected asbestos, or work outside the scope of the RAMS',
      'The first-aider, appointed person, or the named responsible person in the workplace — replacement should be prompt and recorded',
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
      'Document setting out health and safety arrangements for construction phase',
      'Effectiveness of control measures, changing conditions, worker compliance',
      'Each phase to neutral, each phase to earth, AND between each pair of phases (L1-L2, L2-L3, L1-L3)',
      'Assist with evacuation, check areas are clear, liaise with fire brigade',
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
      'Spills above certain thresholds must be reported to the Environment Agency, and the firm needs to investigate the cause to prevent a repeat',
      'They are no longer sterile and may introduce infection or contamination to the next casualty',
      'Asbestos insulating board (AIB) ceiling tiles, pipe lagging, textured coatings (Artex), and electrical insulation backing boards behind old fuseboards',
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
      'Good design, training, procedures, culture, and learning from mistakes',
      'Switch off power supply or remove casualty using non-conductive material',
      'Personal factors, job factors, organisational factors, environmental factors',
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
      "Whoever is responsible for the maintenance and repair of the premises (often the owner or, via the lease, the occupier)",
      "It is unreasonable in all the circumstances to make the conductor dead AND it is reasonable to work live AND suitable precautions are taken — all three tests must be met",
      "An automated external defibrillator (AED) — useful where the casualty may suffer ventricular fibrillation from electric shock",
      "Escalate above the supervisor (your own employer, the principal contractor, your scheme provider) and record the conversation in writing",
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
      'Anyone can switch a breaker back on by mistake or routine; a personal padlock with the only key retained, plus a caution notice, prevents inadvertent re-energisation',
      'Regularly (typically monthly) — and after every use; sterile items have expiry dates and must be replaced',
      'Stop immediately, withdraw to a safe position, re-establish isolation correctly, and investigate why the original isolation failed before resuming',
      'Tell the appointed person or first-aider so the kit is restocked, and note it in the accident book if the use was for an injury',
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
      'Whoever is responsible for the maintenance and repair of the premises (often the owner or, via the lease, the occupier)',
      'Asbestos insulating board (AIB) ceiling tiles, pipe lagging, textured coatings (Artex), and electrical insulation backing boards behind old fuseboards',
      'Chrysotile (white) — the workhorse, used in cement sheets, textured coatings, gaskets, vinyl floor tiles and some electrical insulation; banned only in 1999',
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
      'Anything you have not been trained or signed off to do — including live LV work, suspected asbestos, or work outside the scope of the RAMS',
      'Stop work, isolate yourself from the area, notify your supervisor and update the risk assessment before continuing',
      'Less severe health hazards: skin/eye irritation, skin sensitiser, respiratory irritation or harmful if swallowed/inhaled',
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
