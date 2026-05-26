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
      'Only protects the individual, can fail, may give false sense of security',
      'Personal factors, job factors, organisational factors, environmental factors',
      'Electrical insulation properties and arc flash protection',
    ],
    correctAnswer: 0,
    explanation:
      "Employees must take reasonable care of their own and others' health and safety, and cooperate with their employer.",
  },
  {
    id: 5,
    question: 'Which organisation enforces health and safety law in Great Britain?',
    options: [
      'Pull, Aim, Squeeze, Sweep',
      'Health and Safety Executive (HSE)',
      'Something with potential to cause harm',
      'Construction Design Management',
    ],
    correctAnswer: 1,
    explanation:
      'The Health and Safety Executive (HSE) is the primary enforcer of health and safety law in Great Britain.',
  },
  {
    id: 6,
    question: 'What is the maximum penalty for breaching health and safety law?',
    options: [
      'All construction projects',
      'Remove or protect them from ignition',
      'Unlimited fine and/or imprisonment',
      'Yes, to an employment tribunal',
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
      'Health and safety information, risks, preventive measures, emergency procedures',
      'To plan, manage and coordinate health and safety during the pre-construction phase',
      'Only protects the individual, can fail, may give false sense of security',
      'Cut-resistant gloves, chemical-resistant gloves, thermal gloves, electrical gloves',
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
      'Up to 1000V AC or 1500V DC',
      'Provide a construction phase plan',
      'More than 30 days or 500 person days',
      'Hard hats, bump caps, hair nets',
    ],
    correctAnswer: 2,
    explanation:
      'Projects lasting more than 30 days or involving more than 500 person days must be notified to HSE.',
  },
  {
    id: 11,
    question: 'What are the duties of a Principal Contractor under CDM?',
    options: [
      'Competent persons, supervisors, and experienced workers',
      'Certain hazards pose additional risks to mother and unborn child',
      'A legal notice requiring improvement to health and safety within a specified time',
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
      'Construction Design Management',
      'Contact burns, arc burns, and flash burns',
      'Earthing and automatic disconnection',
    ],
    correctAnswer: 0,
    explanation:
      'A construction phase plan must be prepared and implemented for notifiable projects.',
  },
  {
    id: 13,
    question: 'What information must be provided in the health and safety file?',
    options: [
      'Training, written instructions, demonstrations, ongoing reinforcement',
      'Information about the structure needed for future construction work, maintenance, and demolition',
      'Duties that must be complied with regardless of cost or practicability',
      'To represent employees in consultations with employers on health and safety matters',
    ],
    correctAnswer: 1,
    explanation:
      'The health and safety file contains information needed for future construction work, maintenance, and demolition.',
  },
  {
    id: 14,
    question: 'Under EAWR, what must electrical systems be?',
    options: [
      'AC causes muscular spasm and affects the heart rhythm',
      'Current, duration, path through body, frequency',
      'Constructed, maintained and used to prevent danger',
      'Residual Current Device - detects earth leakage currents',
    ],
    correctAnswer: 2,
    explanation:
      'EAWR requires electrical systems to be constructed, maintained and used so far as reasonably practicable to prevent danger.',
  },
  {
    id: 15,
    question: "What does 'competent person' mean under EAWR?",
    options: [
      'To detect health effects early and take preventive action',
      'Water conducts electricity and can cause electrocution',
      'Training, written instructions, demonstrations, ongoing reinforcement',
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
      'Heat, fuel, and oxygen',
      'Construction Design Management',
      'Hard hats, bump caps, hair nets',
    ],
    correctAnswer: 0,
    explanation:
      'Equipment must be switched off and proved dead, or other precautions taken to prevent danger.',
  },
  {
    id: 17,
    question: 'What is the purpose of RIDDOR?',
    options: [
      'Systematic evaluation to select suitable PPE for specific hazards',
      'Reporting of Injuries, Diseases and Dangerous Occurrences Regulations',
      'Fire procedures, evacuation routes, equipment use, emergency communication',
      'Competent persons including supervisors, safety representatives, managers',
    ],
    correctAnswer: 1,
    explanation:
      'RIDDOR requires the reporting of serious workplace accidents, occupational diseases and dangerous occurrences.',
  },
  {
    id: 18,
    question: 'Which accidents must be reported under RIDDOR?',
    options: [
      'To get input from those who understand the work and risks',
      'Good design, training, procedures, culture, and learning from mistakes',
      'Deaths, specified injuries, over-7-day injuries, diseases, dangerous occurrences',
      'To represent employees in consultations with employers on health and safety matters',
    ],
    correctAnswer: 2,
    explanation:
      'RIDDOR requires reporting of deaths, specified injuries, over-7-day injuries, occupational diseases and dangerous occurrences.',
  },
  {
    id: 19,
    question: 'How quickly must deaths and specified injuries be reported under RIDDOR?',
    options: [
      'Person monitoring for fires during and after hot work',
      'Uncomfortable PPE is less likely to be worn correctly or consistently',
      'Competent persons including supervisors, safety representatives, managers',
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
      'Regular cleaning, inspection, replacement when damaged or worn',
      'The likelihood that a hazard will cause harm and the severity of that harm',
      'Person with sufficient training, experience and knowledge to prevent danger',
    ],
    correctAnswer: 0,
    explanation:
      'Specified injuries include fractures, amputations, serious eye injuries, serious burns, and other major injuries.',
  },
  {
    id: 21,
    question: 'What is the role of safety representatives?',
    options: [
      'Personal emergency evacuation plans and assistance arrangements',
      'To represent employees in consultations with employers on health and safety matters',
      'Assessment, selection, training, maintenance, monitoring, review',
      'Workers know the practical requirements and comfort needed for effective use',
    ],
    correctAnswer: 1,
    explanation:
      'Safety representatives represent employees in consultations with employers on health and safety matters.',
  },
  {
    id: 22,
    question: 'What powers do safety representatives have?',
    options: [
      'Enter premises, examine, investigate, issue notices, prosecute',
      'Permits, fire watches, cleared areas, fire extinguishers nearby',
      'To investigate accidents, inspect the workplace, receive information, be consulted',
      'Safe routes, adequate width, good visibility, emergency access',
    ],
    correctAnswer: 2,
    explanation:
      'Safety representatives can investigate accidents, inspect workplaces, receive information and be consulted on safety matters.',
  },
  {
    id: 23,
    question: 'What is an improvement notice?',
    options: [
      'They provide recognised standards that can be used as evidence of good practice',
      'Regularly, after incidents, when changes occur to site or operations',
      'Health and safety information, risks, preventive measures, emergency procedures',
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
      'Use reduced voltage supplies (110V or lower), RCD protection',
      'Good housekeeping, proper lighting, suitable surfaces, appropriate footwear',
      'Only protects the individual, can fail, may give false sense of security',
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
      "Correct selection, proper use, good maintenance, adequate training",
      "It interferes with the natural electrical signals controlling the heart",
      "To demonstrate employer's commitment to health and safety and provide framework for action",
      "Formal system to control high-risk work through written permission",
    ],
    correctAnswer: 2,
    explanation:
      "A health and safety policy demonstrates the employer's commitment and provides a framework for managing health and safety.",
  },
  {
    id: 27,
    question: 'When must an employer have a written health and safety policy?',
    options: [
      'Unlimited fine and/or imprisonment',
      'Hard hats, bump caps, hair nets',
      'Hand to hand across the chest',
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
      'To make the wearer visible in poor light or near moving vehicles',
      'Balance the risk against the cost and effort of reducing it',
      'Regularly, after incidents, when changes occur to site or operations',
      'Residual Current Device - detects earth leakage currents',
    ],
    correctAnswer: 1,
    explanation:
      'It means balancing the risk against the cost, time and effort needed to reduce or eliminate it.',
  },
  {
    id: 30,
    question: 'What is the purpose of an Approved Code of Practice (ACOP)?',
    options: [
      'As a last resort when other control measures are not sufficient',
      'Workers, visitors, contractors, public, special groups',
      'To give practical guidance on complying with legal duties',
      'When there\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s risk of cuts, chemical contact, burns, or electrical shock',
    ],
    correctAnswer: 2,
    explanation:
      'ACOPs provide practical guidance on how to comply with legal duties and have special status in legal proceedings.',
  },
  {
    id: 31,
    question: 'What is corporate manslaughter?',
    options: [
      "Ongoing assessment of changing conditions during work",
      "Communicate hazards, restrictions, mandatory requirements, emergency information",
      "Duties that must be complied with regardless of cost or practicability",
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
      'Clearly marked, well-lit, unobstructed, leading to safe areas',
      'Safe routes, adequate width, good visibility, emergency access',
      'Report damage and stop using until replaced',
    ],
    correctAnswer: 0,
    explanation:
      'Penalties include unlimited fines, remedial orders to address failures, and publicity orders.',
  },
  {
    id: 33,
    question: 'What must employers consult employees about?',
    options: [
      'Secure, ventilated areas with appropriate containment and labelling',
      'Health and safety measures, risks, preventive measures, competent persons',
      'A document describing how work will be carried out safely',
      'To get input from those who understand the work and risks',
    ],
    correctAnswer: 1,
    explanation:
      'Employers must consult on health and safety measures, risks, preventive measures, and appointment of competent persons.',
  },
  {
    id: 34,
    question: 'What information must employers provide to employees?',
    options: [
      'Reduces trips, falls, fire risks and improves working conditions',
      'Risk remaining after control measures have been implemented',
      'Health and safety information, risks, preventive measures, emergency procedures',
      'Duties that must be complied with regardless of cost or practicability',
    ],
    correctAnswer: 2,
    explanation:
      'Employers must provide information on health and safety, risks, preventive measures, and emergency procedures.',
  },
  {
    id: 35,
    question: 'What is vicarious liability?',
    options: [
      'A document describing how work will be carried out safely',
      'Elimination, substitution, engineering controls, administrative controls, PPE',
      'Plan, manage and coordinate health and safety during the construction phase',
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
      'Issue records, training records, inspection records, maintenance records',
      'Statement of intent, organisation, and arrangements',
      'To identify hazards and evaluate risks to implement appropriate controls',
    ],
    correctAnswer: 0,
    explanation:
      'HSE inspectors can enter premises, examine and investigate, issue improvement/prohibition notices, and prosecute.',
  },
  {
    id: 37,
    question: 'What is the difference between regulations and guidance?',
    options: [
      'Noise, dust, vibration, weather conditions, contaminated ground',
      'Regulations are legally binding, guidance is advisory',
      'Insulated tools, gloves, mats, footwear',
      'Switch off, isolate, lock off, test, prove dead',
    ],
    correctAnswer: 1,
    explanation:
      'Regulations have legal force and must be followed, while guidance is advisory best practice.',
  },
  {
    id: 38,
    question: 'What is the purpose of health surveillance?',
    options: [
      'A serious criminal offence where an organisation\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s failure causes death',
      'Identify, assess, control through appropriate measures, monitor conditions',
      'To detect health effects early and take preventive action',
      'To give practical guidance on complying with legal duties',
    ],
    correctAnswer: 2,
    explanation:
      'Health surveillance detects adverse health effects at an early stage so preventive action can be taken.',
  },
  {
    id: 39,
    question: 'When might health surveillance be required?',
    options: [
      "Events that are likely to happen or could reasonably be expected",
      "A legal notice requiring immediate cessation of activities that pose imminent danger",
      "Good housekeeping, proper lighting, suitable surfaces, appropriate footwear",
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
      'Identify, assess, control through appropriate measures, monitor conditions',
      'Duties that must be complied with regardless of cost or practicability',
      'Regularly, after incidents, when changes occur',
    ],
    correctAnswer: 0,
    explanation:
      'Occupational health prevents work-related illness and injury and promotes worker health and wellbeing.',
  },
  {
    id: 41,
    question: 'What are absolute duties in health and safety law?',
    options: [
      'Risk assessment identifies risks, method statement describes control measures',
      'Duties that must be complied with regardless of cost or practicability',
      'Where there\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s risk of falling objects, puncture wounds, slips, electrical hazards',
      'When there\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s exposure to specific hazards like noise, vibration, asbestos',
    ],
    correctAnswer: 1,
    explanation:
      "Absolute duties must be complied with regardless of cost - there are no qualifying words like 'reasonably practicable'.",
  },
  {
    id: 42,
    question: 'What is the significance of British Standards in health and safety?',
    options: [
      'To take reasonable care of themselves and others, and cooperate with employers',
      'When there\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s exposure to specific hazards like noise, vibration, asbestos',
      'They provide recognised standards that can be used as evidence of good practice',
      'To detect health effects early and take preventive action',
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
      'Personal Protective Equipment',
      'Heat, fuel, and oxygen',
      'Elimination of the hazard',
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
      'Deep internal burns along current path',
      'Current, duration, path through body, frequency',
      'Ill-fitting PPE may not provide adequate protection',
      'Ear plugs, ear muffs, semi-insert protectors',
    ],
    correctAnswer: 1,
    explanation:
      'Shock severity depends on current magnitude, duration of contact, path through the body, and frequency.',
  },
  {
    id: 46,
    question: "What voltage is considered 'low voltage' in the UK?",
    options: [
      'Hard hats, bump caps, hair nets',
      'Switch off and prove dead',
      'Up to 1000V AC or 1500V DC',
      'Up to 50V AC or 120V DC',
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
      'Toxic gases that can cause unconsciousness and death',
      'Wet skin, medical conditions, fatigue, contact area',
      'Duties that must be complied with regardless of cost or practicability',
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
      'Ensure control measures are followed and remain effective',
      'As Low As Reasonably Practicable',
      'Earthing and automatic disconnection',
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
      'When conditions change, after incidents, regularly',
      'To give practical guidance on complying with legal duties',
      'Insulated tools, gloves, mats, footwear',
    ],
    correctAnswer: 0,
    explanation:
      'AC at 50Hz is particularly dangerous as it can cause muscular spasm and interfere with heart rhythm.',
  },
  {
    id: 53,
    question: 'What factors affect body resistance to electric current?',
    options: [
      'Safety data sheets with hazard information and control measures',
      'Skin condition (wet/dry), contact area, voltage, frequency',
      'Uncomfortable PPE is less likely to be worn correctly or consistently',
      'Relevant findings of risk assessment and control measures required',
    ],
    correctAnswer: 1,
    explanation:
      'Body resistance varies with skin condition, contact area, applied voltage, current frequency and individual factors.',
  },
  {
    id: 54,
    question: 'How does wet skin affect electrical resistance?',
    options: [
      'Insulation of live parts',
      'Within 40 milliseconds for 30mA types',
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
      'Electricity at Work Regulations 1989',
      'Attend site induction and safety briefing',
      'Stop work and report to supervisor',
    ],
    correctAnswer: 0,
    explanation:
      'Electric current causes deep internal burns along the current path through tissues and organs.',
  },
  {
    id: 57,
    question: 'What is an arc burn?',
    options: [
      'Significant findings, people at risk, control measures',
      'Burn caused by electric arc/flash producing intense heat',
      'Workers, visitors, contractors, public, special groups',
      'Safety glasses, goggles, face shields, welding screens',
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
      'Hard hats, bump caps, hair nets',
      'Person monitoring for fires during and after hot work',
      'At designated assembly points away from the building',
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
      'To ensure the health, safety and welfare of all employees at work',
      'High winds, ice, heavy rain, extreme temperatures, lightning',
      'Raise the alarm, call fire brigade, evacuate if safe to do so',
    ],
    correctAnswer: 0,
    explanation:
      'Cool burns with water for at least 20 minutes, cover with sterile dressing, and seek medical attention.',
  },
  {
    id: 61,
    question: 'What makes electrical burns particularly dangerous?',
    options: [
      'Where there\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s risk of falling objects, puncture wounds, slips, electrical hazards',
      'Internal damage may be extensive despite limited external signs',
      'Evacuation time, route effectiveness, alarm audibility, assembly procedures',
      'Voltage difference between feet when walking near earthed equipment',
    ],
    correctAnswer: 1,
    explanation:
      "Electrical burns can cause extensive internal damage to organs and tissues that isn't visible externally.",
  },
  {
    id: 62,
    question: 'What immediate first aid should be given for electric shock?',
    options: [
      'As a last resort when other control measures are not sufficient',
      'Issue records, training records, inspection records, maintenance records',
      'Check for breathing/circulation, give CPR if needed, treat for shock',
      'Stop high-risk activities, provide shelter, monitor conditions',
    ],
    correctAnswer: 2,
    explanation:
      'Check breathing and circulation, give CPR if required, treat for shock and get immediate medical help.',
  },
  {
    id: 63,
    question: 'Why should you never use water on electrical equipment during a fire?',
    options: [
      'Touching exposed metalwork that has become live due to a fault',
      'Lack experience, may take risks, physical development incomplete',
      'Certain hazards pose additional risks to mother and unborn child',
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
      'Uncomfortable PPE is less likely to be worn correctly or consistently',
      'Voltage difference between feet when walking near earthed equipment',
      'Plan, manage and coordinate health and safety during the construction phase',
      'Act on findings, prioritise by risk, monitor progress',
    ],
    correctAnswer: 1,
    explanation:
      'Step potential is the voltage difference between feet when walking on ground near earthed electrical equipment.',
  },
  {
    id: 66,
    question: 'What is touch potential?',
    options: [
      'Stop work immediately and evacuate via nearest safe exit',
      'Identify PPE type, performance standards, limitations, expiry dates',
      'Voltage between hand and feet when touching equipment',
      'Reduces trips, falls, fire risks and improves working conditions',
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
      'Assist with evacuation, check areas are clear, liaise with fire brigade',
      'How to use, maintain, store PPE and recognise defects',
      'To give practical guidance on complying with legal duties',
    ],
    correctAnswer: 0,
    explanation:
      'Indirect contact is touching exposed metalwork that has become live due to an insulation fault.',
  },
  {
    id: 69,
    question: 'What protects against indirect contact?',
    options: [
      'Insulated tools, gloves, mats, footwear',
      'Earthing and automatic disconnection',
      'Before each use and regularly during use',
      'Hard hats, bump caps, hair nets',
    ],
    correctAnswer: 1,
    explanation:
      'Earthing and automatic disconnection of supply protects against indirect contact by quickly disconnecting faulty circuits.',
  },
  {
    id: 70,
    question: 'What is an RCD?',
    options: [
      'Identify hazards, check compliance, monitor safety standards',
      'For high-risk work like confined spaces, hot work, electrical isolation',
      'Residual Current Device - detects earth leakage currents',
      'Only if small, you\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'re trained, have escape route, and feel confident',
    ],
    correctAnswer: 2,
    explanation:
      'An RCD (Residual Current Device) detects earth leakage currents and quickly disconnects the supply.',
  },
  {
    id: 71,
    question: 'How quickly should an RCD operate?',
    options: [
      'Dramatically reduces resistance',
      'Meets European safety standards',
      'Remove or protect them from ignition',
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
      'Ill-fitting PPE may not provide adequate protection',
      'To prevent electric shock during maintenance work',
      'Represent workers on safety matters and investigate concerns',
      'Ear plugs, ear muffs, semi-insert protectors',
    ],
    correctAnswer: 1,
    explanation:
      'Proper isolation prevents electric shock and ensures safety during maintenance and repair work.',
  },
  {
    id: 74,
    question: 'What is the safe isolation procedure?',
    options: [
      'When damaged, worn out, or manufacturer\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s expiry date reached',
      'At designated assembly points away from the building',
      'Switch off, isolate, lock off, test, prove dead',
      'Remove or protect them from ignition',
    ],
    correctAnswer: 2,
    explanation:
      'Safe isolation requires switching off, isolating, locking off, testing equipment, and proving dead.',
  },
  {
    id: 75,
    question: 'What should you do before starting work on electrical equipment?',
    options: [
      'Stop work immediately and evacuate via nearest safe exit',
      'Safety Extra Low Voltage - separated from earth',
      'Regularly, often weekly or before specific high-risk activities',
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
      'Reporting of Injuries, Diseases and Dangerous Occurrences Regulations',
      'Provide illumination during power failures for safe evacuation',
      'Practical, clear, focused on significant risks, regularly reviewed',
    ],
    correctAnswer: 0,
    explanation:
      "Proving the tester on a known live source before and after testing ensures it's working properly.",
  },
  {
    id: 77,
    question: 'What happens during ventricular fibrillation?',
    options: [
      'Safety Extra Low Voltage - separated from earth',
      'Heart muscle fibres contract randomly, stopping effective pumping',
      'Immediately by telephone followed by written report within 10 days',
      'Plan, manage and coordinate health and safety during the construction phase',
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
      'Significant findings, people at risk, control measures',
      'Formal system to control high-risk work through written permission',
      'Regularly, typically every 6 months or as required',
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
      'Unlimited fine, remedial orders, publicity orders',
      'Constructed, maintained and used to prevent danger',
      'Dramatically reduces resistance',
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
      'Report damage and stop using until replaced',
      'Control of Substances Hazardous to Health',
      'Safety Extra Low Voltage - separated from earth',
      'Unlimited fine, remedial orders, publicity orders',
    ],
    correctAnswer: 2,
    explanation:
      'SELV (Safety Extra Low Voltage) is extra low voltage separated from earth and other circuits.',
  },
  {
    id: 83,
    question: 'What precautions should be taken in wet conditions?',
    options: [
      'Ventricular fibrillation - potentially fatal',
      'Effectiveness of control measures, changing conditions, worker compliance',
      'Hazardous substances, exposure routes, health effects, control measures',
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
      'At designated assembly points away from the building',
      'Insulated tools, gloves, mats, footwear',
      'Update risk assessments and method statements',
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
      'Safety data sheets with hazard information and control measures',
      'To identify hazards and evaluate risks to implement appropriate controls',
      'Statement of intent, organisation, and arrangements',
      'Guide vehicles safely and control vehicle movements',
    ],
    correctAnswer: 1,
    explanation:
      'Risk assessment identifies hazards, evaluates risks and determines appropriate control measures to prevent harm.',
  },
  {
    id: 86,
    question: 'What are the five steps of risk assessment?',
    options: [
      'Regularly, after incidents, when changes occur to site or operations',
      'It interferes with the natural electrical signals controlling the heart',
      'Identify hazards, decide who might be harmed, evaluate risks, record findings, review',
      'When there\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s exposure to specific hazards like noise, vibration, asbestos',
    ],
    correctAnswer: 2,
    explanation:
      'The five steps are: identify hazards, decide who might be harmed, evaluate risks, record findings, and review regularly.',
  },
  {
    id: 87,
    question: 'What is a hazard?',
    options: [
      'Contact burns, arc burns, and flash burns',
      'Unlimited fine and/or imprisonment',
      'Construction Design Management',
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
      'Competent person with knowledge of the work and hazards',
      'Prevent unauthorised access and protect the public from site hazards',
      'Training, written instructions, demonstrations, ongoing reinforcement',
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
      'Personal Protective Equipment',
      'Defibrillation and CPR',
      'Elimination of the hazard',
      'Principal contractor',
    ],
    correctAnswer: 2,
    explanation:
      'Elimination of the hazard is the most effective control measure as it completely removes the risk.',
  },
  {
    id: 91,
    question: 'When should risk assessments be reviewed?',
    options: [
      'Something with potential to cause harm',
      'Balance the risk against the cost and effort of reducing it',
      'Stop work and report to supervisor',
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
      'Only if small, you\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'re trained, have escape route, and feel confident',
      'Use reduced voltage supplies (110V or lower), RCD protection',
      'Formal system to control high-risk work through written permission',
    ],
    correctAnswer: 0,
    explanation:
      'Risk assessments should be carried out by competent persons with knowledge of the work and associated hazards.',
  },
  {
    id: 93,
    question: 'What should be recorded in a risk assessment?',
    options: [
      'Lack experience, may take risks, physical development incomplete',
      'Significant findings, people at risk, control measures',
      'Formal system to control high-risk work through written permission',
      'Identify PPE type, performance standards, limitations, expiry dates',
    ],
    correctAnswer: 1,
    explanation:
      'Written records should be kept of significant findings, people at risk, and control measures implemented.',
  },
  {
    id: 94,
    question: 'What is a method statement?',
    options: [
      'Regulations are legally binding, guidance is advisory',
      'Designated routes, barriers, crossing points, traffic management',
      'A document describing how work will be carried out safely',
      'To ensure the tester is working before and after testing',
    ],
    correctAnswer: 2,
    explanation:
      'A method statement describes the sequence of operations and safety measures for carrying out specific work.',
  },
  {
    id: 95,
    question: 'What should a method statement include?',
    options: [
      'Deaths, specified injuries, over-7-day injuries, diseases, dangerous occurrences',
      'Elimination, substitution, engineering controls, administrative controls, PPE',
      'Employer liability for acts of employees in the course of employment',
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
      'Guide vehicles safely and control vehicle movements',
      'Touching exposed metalwork that has become live due to a fault',
      'To get input from those who understand the work and risks',
    ],
    correctAnswer: 0,
    explanation:
      'Method statements should involve competent persons, supervisors and experienced workers who understand the work.',
  },
  {
    id: 97,
    question: 'When are method statements typically required?',
    options: [
      'Review and revise the risk assessment and control measures',
      'For high-risk activities, complex work, CDM projects',
      'Employees must use PPE correctly and report defects',
      'Events that are likely to happen or could reasonably be expected',
    ],
    correctAnswer: 1,
    explanation:
      'Method statements are typically required for high-risk activities, complex work and construction projects under CDM.',
  },
  {
    id: 98,
    question: 'What is the relationship between risk assessment and method statements?',
    options: [
      'Regular cleaning, inspection, replacement when damaged or worn',
      'Voltage difference between feet when walking near earthed equipment',
      'Risk assessment identifies risks, method statement describes control measures',
      'Competent person with knowledge of the work and hazards',
    ],
    correctAnswer: 2,
    explanation:
      'Risk assessments identify hazards and risks; method statements describe how to control those risks during work.',
  },
  {
    id: 99,
    question: 'What factors should be considered when assessing who might be harmed?',
    options: [
      'Safety glasses, goggles, face shields, welding screens',
      'To systematically evaluate and prioritise risks',
      'How to use, maintain, store PPE and recognise defects',
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
      'Switch off power supply or remove casualty using non-conductive material',
      'Serious injuries including fractures, amputations, serious burns',
      'Identify PPE type, performance standards, limitations, expiry dates',
    ],
    correctAnswer: 0,
    explanation:
      'Young workers lack experience, may be more willing to take risks, and their physical development may be incomplete.',
  },
  {
    id: 101,
    question: 'What considerations apply to pregnant workers?',
    options: [
      'Investigate accidents, inspect workplace, be consulted on safety matters',
      'Certain hazards pose additional risks to mother and unborn child',
      'Risk that can be accepted in current circumstances based on benefits gained',
      'Duties that must be complied with regardless of cost or practicability',
    ],
    correctAnswer: 1,
    explanation:
      'Pregnancy may increase risks from certain hazards, requiring additional controls to protect mother and child.',
  },
  {
    id: 102,
    question: "What is meant by 'reasonably foreseeable'?",
    options: [
      'Employer liability for acts of employees in the course of employment',
      'Competent persons including supervisors, safety representatives, managers',
      'Events that are likely to happen or could reasonably be expected',
      'Noise, dust, vibration, weather conditions, contaminated ground',
    ],
    correctAnswer: 2,
    explanation:
      'Reasonably foreseeable means events that are likely to happen or could reasonably be expected in the circumstances.',
  },
  {
    id: 103,
    question: 'How should risk be calculated?',
    options: [
      'Deep internal burns along current path',
      'Switch off and prove dead',
      'Up to 1000V AC or 1500V DC',
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
      'Electricity at Work Regulations 1989',
      'Burn caused by electric arc/flash producing intense heat',
      'Before each use and regularly during use',
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
      'Essential for coordination, safety information, emergency response',
      'Ventricular fibrillation - potentially fatal',
      'Ongoing assessment of changing conditions during work',
      'Clean, dry place away from contamination and damage',
    ],
    correctAnswer: 2,
    explanation:
      'Dynamic risk assessment is the ongoing process of assessing changing conditions and new hazards during work.',
  },
  {
    id: 107,
    question: 'What should workers do if they identify new hazards?',
    options: [
      'Remove or protect them from ignition',
      'Something with potential to cause harm',
      'Ventricular fibrillation - potentially fatal',
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
      'It interferes with the natural electrical signals controlling the heart',
      'Health and safety information, risks, preventive measures, emergency procedures',
      'Short safety discussion on specific topics relevant to current work',
    ],
    correctAnswer: 0,
    explanation:
      'Generic risk assessments cover similar activities and can be adapted for specific situations and locations.',
  },
  {
    id: 109,
    question: 'What is a site-specific risk assessment?',
    options: [
      'How to use, maintain, store PPE and recognise defects',
      'Assessment tailored to specific site conditions and hazards',
      'Safe routes, adequate width, good visibility, emergency access',
      'Regular cleaning, inspection, replacement when damaged or worn',
    ],
    correctAnswer: 1,
    explanation:
      'Site-specific risk assessments are tailored to the particular conditions, hazards and constraints of a specific location.',
  },
  {
    id: 110,
    question: 'What information should be communicated to workers?',
    options: [
      'Prevent unauthorised access, protect workers and public, secure materials',
      'To ensure the health, safety and welfare of all employees at work',
      'Relevant findings of risk assessment and control measures required',
      'Immediately by telephone followed by written report within 10 days',
    ],
    correctAnswer: 2,
    explanation:
      'Workers must be informed of relevant risk assessment findings and the control measures they need to follow.',
  },
  {
    id: 111,
    question: 'What is the purpose of consultation in risk assessment?',
    options: [
      'Events that are likely to happen or could reasonably be expected',
      'Skin condition (wet/dry), contact area, voltage, frequency',
      'To identify hazards and evaluate risks to implement appropriate controls',
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
      'Serious injuries including fractures, amputations, serious burns',
      'Current, duration, path through body, frequency',
      'When damaged, worn out, or manufacturer\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s expiry date reached',
    ],
    correctAnswer: 0,
    explanation:
      "If control measures aren't effective, the risk assessment should be reviewed and control measures revised.",
  },
  {
    id: 113,
    question: 'What is residual risk?',
    options: [
      'Hazard identification, risk evaluation, control measures, review processes',
      'Risk remaining after control measures have been implemented',
      'Vehicle movements, hand signals, hazard awareness, communication',
      'Assessment, selection, training, maintenance, monitoring, review',
    ],
    correctAnswer: 1,
    explanation:
      'Residual risk is the risk remaining after control measures have been implemented - it should be ALARP.',
  },
  {
    id: 114,
    question: 'What factors affect the acceptability of risk?',
    options: [
      'Good housekeeping, proper lighting, suitable surfaces, appropriate footwear',
      'Document setting out health and safety arrangements for construction phase',
      'Benefits, costs, public perception, legal requirements, available alternatives',
      'Poor housekeeping, uneven surfaces, inadequate lighting, unsuitable footwear',
    ],
    correctAnswer: 2,
    explanation:
      'Risk acceptability depends on benefits, costs, public perception, legal requirements and available alternatives.',
  },
  {
    id: 115,
    question: 'What is tolerable risk?',
    options: [
      'Ensure PPE is worn correctly, monitor condition, enforce compliance',
      'Clear walkways, proper storage, regular cleaning, waste removal',
      'Document setting out health and safety arrangements for construction phase',
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
      'Prohibition, warning, mandatory, emergency, fire safety signs',
      'Immediately by telephone followed by written report within 10 days',
      'Internal damage may be extensive despite limited external signs',
    ],
    correctAnswer: 0,
    explanation:
      'Training should cover hazard identification, risk evaluation techniques, control measures and review processes.',
  },
  {
    id: 117,
    question: 'How often should method statements be reviewed?',
    options: [
      'To detect health effects early and take preventive action',
      'When conditions change, after incidents, regularly',
      'Noise, dust, vibration, weather conditions, contaminated ground',
      'Systematic analysis of how and why people make mistakes',
    ],
    correctAnswer: 1,
    explanation:
      'Method statements should be reviewed when conditions change, after incidents, and as part of regular review.',
  },
  {
    id: 118,
    question: 'What is the role of supervision in risk control?',
    options: [
      'Residual Current Device - detects earth leakage currents',
      'For high-risk activities, complex work, CDM projects',
      'Ensure control measures are followed and remain effective',
      'Category I (simple), Category II (intermediate), Category III (complex)',
    ],
    correctAnswer: 2,
    explanation:
      'Supervision ensures control measures are properly implemented, followed and remain effective.',
  },
  {
    id: 119,
    question: 'What should be done with lessons learned from incidents?',
    options: [
      'How to use, maintain, store PPE and recognise defects',
      'Something with potential to cause harm',
      'Deep internal burns along current path',
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
      'To plan, manage and coordinate health and safety during the pre-construction phase',
      'Reporting of Injuries, Diseases and Dangerous Occurrences Regulations',
      'Filtering facepieces, half/full face masks, powered respirators, breathing apparatus',
    ],
    correctAnswer: 0,
    explanation:
      'Permit to work is a formal system controlling high-risk work through written permission and defined procedures.',
  },
  {
    id: 121,
    question: 'When might permit to work systems be used?',
    options: [
      'Only protects the individual, can fail, may give false sense of security',
      'For high-risk work like confined spaces, hot work, electrical isolation',
      'Use reduced voltage supplies (110V or lower), RCD protection',
      'Statement of intent, organisation, and arrangements',
    ],
    correctAnswer: 1,
    explanation:
      'Permit to work systems are used for high-risk activities like confined space entry, hot work, and electrical isolation.',
  },
  {
    id: 122,
    question: 'What should be monitored during risk assessment implementation?',
    options: [
      'Review and revise the risk assessment and control measures',
      'For high-risk activities, complex work, CDM projects',
      'Effectiveness of control measures, changing conditions, worker compliance',
      'At designated assembly points away from the building',
    ],
    correctAnswer: 2,
    explanation:
      'Monitor control measure effectiveness, changing conditions, worker compliance and any new hazards arising.',
  },
  {
    id: 123,
    question: 'What makes a good risk assessment?',
    options: [
      'Person with sufficient training, experience and knowledge to prevent danger',
      'A legal notice requiring improvement to health and safety within a specified time',
      'Prohibition, warning, mandatory, emergency, fire safety signs',
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
      'Reduces conflicts between activities, controls access, manages hazards',
      'Fire wardens or designated responsible persons',
      'Water conducts electricity and can cause electrocution',
    ],
    correctAnswer: 0,
    explanation:
      'Human error analysis systematically examines how and why people make mistakes to prevent future errors.',
  },
  {
    id: 125,
    question: 'What factors contribute to human error?',
    options: [
      'Only if small, you\'re trained, have escape route, and feel confident',
      'Personal factors, job factors, organisational factors, environmental factors',
      'It interferes with the natural electrical signals controlling the heart',
      'Serious injuries including fractures, amputations, serious burns',
    ],
    correctAnswer: 1,
    explanation:
      'Human error results from personal, job, organisational and environmental factors that should all be considered.',
  },
  {
    id: 126,
    question: 'How can the likelihood of human error be reduced?',
    options: [
      'Water conducts electricity and can cause electrocution',
      'Training, written instructions, demonstrations, ongoing reinforcement',
      'Good design, training, procedures, culture, and learning from mistakes',
      'They provide recognised standards that can be used as evidence of good practice',
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
      'Systematic analysis of how and why people make mistakes',
      'A document describing how work will be carried out safely',
      'Workers, visitors, contractors, public, special groups',
    ],
    correctAnswer: 0,
    explanation:
      'PPE should be used as a last resort when other control measures cannot adequately reduce the risk.',
  },
  {
    id: 129,
    question: 'What are the main types of head protection?',
    options: [
      'Insulation of live parts',
      'Hard hats, bump caps, hair nets',
      'Insulated tools, gloves, mats, footwear',
      'Construction Design Management',
    ],
    correctAnswer: 1,
    explanation:
      'Head protection includes hard hats for impact protection, bump caps for minor hazards, and hair nets for hygiene.',
  },
  {
    id: 130,
    question: 'When should safety helmets be worn?',
    options: [
      'Employer liability for acts of employees in the course of employment',
      'To get input from those who understand the work and risks',
      'Where there is risk of head injury from falling objects or impact',
      'Constructed, maintained and used to prevent danger',
    ],
    correctAnswer: 2,
    explanation:
      'Safety helmets should be worn wherever there is risk of head injury from falling objects or impact.',
  },
  {
    id: 131,
    question: 'What types of eye protection are available?',
    options: [
      'Essential for coordination, safety information, emergency response',
      'Clean, dry place away from contamination and damage',
      'Assessment, selection, training, maintenance, monitoring, review',
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
      "A document describing how work will be carried out safely",
      "Skin condition (wet/dry), contact area, voltage, frequency",
      "Only protects the individual, can fail, may give false sense of security",
    ],
    correctAnswer: 0,
    explanation:
      'Eye protection is needed for risks from flying particles, chemicals, harmful radiation or bright light.',
  },
  {
    id: 133,
    question: 'What are the main types of hearing protection?',
    options: [
      'Constructed, maintained and used to prevent danger',
      'Ear plugs, ear muffs, semi-insert protectors',
      'Water conducts electricity and can cause electrocution',
      'Training, written procedures, drills, signs, induction',
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
      'Personal emergency evacuation plans and assistance arrangements',
      'Issue records, training records, inspection records, maintenance records',
      'Toilets, washing facilities, drinking water, rest areas, changing rooms',
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
      "To identify hazards and evaluate risks to implement appropriate controls",
      "Voltage difference between feet when walking near earthed equipment",
      "Deaths, specified injuries, over-7-day injuries, diseases, dangerous occurrences",
    ],
    correctAnswer: 0,
    explanation:
      'Respiratory protection is needed for airborne hazards like dust, fumes, gases, vapours or oxygen deficiency.',
  },
  {
    id: 137,
    question: 'What are the main types of hand protection?',
    options: [
      'Assessment tailored to specific site conditions and hazards',
      'Cut-resistant gloves, chemical-resistant gloves, thermal gloves, electrical gloves',
      'Clear walkways, proper storage, regular cleaning, waste removal',
      'Designated areas, trained banksmen, separation from other activities',
    ],
    correctAnswer: 1,
    explanation:
      'Hand protection includes cut-resistant, chemical-resistant, thermal and electrical insulating gloves.',
  },
  {
    id: 138,
    question: 'When should hand protection be worn?',
    options: [
      "It interferes with the natural electrical signals controlling the heart",
      "Remove or control any element of the fire triangle",
      "When there's risk of cuts, chemical contact, burns, or electrical shock",
      "Only protects the individual, can fail, may give false sense of security",
    ],
    correctAnswer: 2,
    explanation:
      "Hand protection should be worn when there's risk of cuts, chemical contact, burns or electrical shock.",
  },
  {
    id: 139,
    question: 'What types of foot protection are available?',
    options: [
      'Report immediately to supervisor and make area safe if possible',
      'Reduces conflicts between activities, controls access, manages hazards',
      'Events that are likely to happen or could reasonably be expected',
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
      "Prevent unauthorised access, protect workers and public, secure materials",
      "Employer liability for acts of employees in the course of employment",
      "To investigate accidents, inspect the workplace, receive information, be consulted",
    ],
    correctAnswer: 0,
    explanation:
      'Safety footwear protects against falling objects, puncture wounds, slips, trips and electrical hazards.',
  },
  {
    id: 141,
    question: 'What are high-visibility garments used for?',
    options: [
      'Clearly marked, well-lit, unobstructed, leading to safe areas',
      'To make the wearer visible in poor light or near moving vehicles',
      'Burn caused by electric arc/flash producing intense heat',
      'When damaged, worn out, or manufacturer\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s expiry date reached',
    ],
    correctAnswer: 1,
    explanation:
      'High-visibility garments make workers visible in poor light conditions or when working near moving vehicles.',
  },
  {
    id: 142,
    question: 'What does the CE marking on PPE indicate?',
    options: [
      'Deep internal burns along current path',
      'Electricity at Work Regulations 1989',
      'Meets European safety standards',
      'Remove or protect them from ignition',
    ],
    correctAnswer: 2,
    explanation:
      'CE marking indicates the PPE meets relevant European safety standards and legal requirements.',
  },
  {
    id: 143,
    question: 'Who is responsible for providing PPE?',
    options: [
      'As Low As Reasonably Practicable',
      'Insulated tools, gloves, mats, footwear',
      'Stop work and report to supervisor',
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
      'Balance the risk against the cost and effort of reducing it',
      'Employers (free of charge to employees)',
      'Ongoing assessment of changing conditions during work',
    ],
    correctAnswer: 0,
    explanation:
      'Employees are responsible for using PPE correctly, looking after it and reporting any defects.',
  },
  {
    id: 145,
    question: 'What factors should be considered when selecting PPE?',
    options: [
      'Good housekeeping, proper lighting, suitable surfaces, appropriate footwear',
      'Nature of hazard, compatibility, comfort, fit, maintenance requirements',
      'Prevent unauthorised access, protect workers and public, secure materials',
      'Regular cleaning, inspection, replacement when damaged or worn',
    ],
    correctAnswer: 1,
    explanation:
      'PPE selection should consider hazard type, compatibility with other PPE, comfort, fit and maintenance needs.',
  },
  {
    id: 146,
    question: 'Why is PPE fit important?',
    options: [
      'Regularly, typically every 6 months or as required',
      'Correct selection, proper use, good maintenance, adequate training',
      'Ill-fitting PPE may not provide adequate protection',
      'To systematically evaluate and prioritise risks',
    ],
    correctAnswer: 2,
    explanation:
      'Properly fitted PPE is essential for effective protection - ill-fitting equipment may not provide adequate protection.',
  },
  {
    id: 147,
    question: 'What training should be provided for PPE use?',
    options: [
      'Relevant findings of risk assessment and control measures required',
      'Toxic gases that can cause unconsciousness and death',
      'Unlimited fine, remedial orders, publicity orders',
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
      'Duties that must be complied with regardless of cost or practicability',
      'Training, written procedures, drills, signs, induction',
      'Wet skin, medical conditions, fatigue, contact area',
    ],
    correctAnswer: 0,
    explanation:
      'PPE requires regular cleaning, inspection for damage and replacement when worn out or damaged.',
  },
  {
    id: 149,
    question: 'How should PPE be stored?',
    options: [
      'More than 30 days or 500 person days',
      'Clean, dry place away from contamination and damage',
      'General assessment covering similar activities that can be adapted',
      'Residual Current Device - detects earth leakage currents',
    ],
    correctAnswer: 1,
    explanation:
      'PPE should be stored in clean, dry conditions away from contamination and potential damage.',
  },
  {
    id: 150,
    question: 'What should workers do if PPE is damaged?',
    options: [
      'Meets European safety standards',
      'If they employ 5 or more people',
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
      'Water conducts electricity and can cause electrocution',
      'General assessment covering similar activities that can be adapted',
      'To prevent work-related illness and promote health and wellbeing',
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
      'Reporting of Injuries, Diseases and Dangerous Occurrences Regulations',
      'Duties that must be complied with regardless of cost or practicability',
      'Prohibition, warning, mandatory, emergency, fire safety signs',
    ],
    correctAnswer: 0,
    explanation:
      'PPE only protects the individual wearer, can fail, and may give a false sense of security if used incorrectly.',
  },
  {
    id: 153,
    question: 'What is meant by PPE compatibility?',
    options: [
      'Systematic evaluation to select suitable PPE for specific hazards',
      'Different types of PPE work together without reducing protection',
      'Hazardous substances, exposure routes, health effects, control measures',
      'Stop high-risk activities, provide shelter, monitor conditions',
    ],
    correctAnswer: 1,
    explanation:
      'PPE compatibility means different types can be worn together without one reducing the effectiveness of another.',
  },
  {
    id: 154,
    question: 'How often should PPE be inspected?',
    options: [
      'To prevent electric shock during maintenance work',
      'Statement of intent, organisation, and arrangements',
      'Before each use and regularly during use',
      'Electricity at Work Regulations 1989',
    ],
    correctAnswer: 2,
    explanation:
      'PPE should be inspected before each use for damage, wear or contamination that could affect protection.',
  },
  {
    id: 155,
    question: 'What documentation should be kept for PPE?',
    options: [
      'To demonstrate employer\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s commitment to health and safety and provide framework for action',
      'Wet skin, medical conditions, fatigue, contact area',
      'Clean, dry place away from contamination and damage',
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
      'Ensure control measures are followed and remain effective',
      'Only protects the individual, can fail, may give false sense of security',
      'Decontaminate safely or dispose of according to specific procedures',
    ],
    correctAnswer: 0,
    explanation:
      'PPE assessment systematically evaluates hazards and selects appropriate equipment to provide adequate protection.',
  },
  {
    id: 157,
    question: 'When should PPE be replaced?',
    options: [
      "Poor housekeeping, uneven surfaces, inadequate lighting, unsuitable footwear",
      "When damaged, worn out, or manufacturer's expiry date reached",
      "Effectiveness of control measures, changing conditions, worker compliance",
      "Raise the alarm, call fire brigade, evacuate if safe to do so",
    ],
    correctAnswer: 1,
    explanation:
      "PPE should be replaced when damaged, worn beyond safe use, or when manufacturer's expiry date is reached.",
  },
  {
    id: 158,
    question: 'What factors affect PPE effectiveness?',
    options: [
      'Safety shoes/boots with toe protection, puncture resistance, electrical insulation',
      'Safe routes, adequate width, good visibility, emergency access',
      'Correct selection, proper use, good maintenance, adequate training',
      'Residual Current Device - detects earth leakage currents',
    ],
    correctAnswer: 2,
    explanation:
      'PPE effectiveness depends on correct selection for hazards, proper use, good maintenance and adequate user training.',
  },
  {
    id: 159,
    question: 'What is the role of supervisors in PPE management?',
    options: [
      'Wet skin, medical conditions, fatigue, contact area',
      'Competent persons, supervisors, and experienced workers',
      'Remove or control any element of the fire triangle',
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
      'Only protects the individual, can fail, may give false sense of security',
      'Correct selection, proper use, good maintenance, adequate training',
      'Protection from electrical arc blast and thermal energy',
    ],
    correctAnswer: 0,
    explanation:
      'Contaminated PPE requires safe decontamination or disposal according to specific procedures for the contaminant type.',
  },
  {
    id: 161,
    question: 'What are the categories of PPE?',
    options: [
      'Prevent unauthorised access, protect workers and public, secure materials',
      'Category I (simple), Category II (intermediate), Category III (complex)',
      'Prevents conflicts, ensures compatible working methods, manages shared risks',
      'Wet skin, medical conditions, fatigue, contact area',
    ],
    correctAnswer: 1,
    explanation:
      'PPE is categorised as Category I (simple), Category II (intermediate), or Category III (complex) based on risk level.',
  },
  {
    id: 162,
    question: "What requires special consideration for electrical workers' PPE?",
    options: [
      'Only if small, you\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'re trained, have escape route, and feel confident',
      'Enter premises, examine, investigate, issue notices, prosecute',
      'Electrical insulation properties and arc flash protection',
      'Residual Current Device - detects earth leakage currents',
    ],
    correctAnswer: 2,
    explanation:
      'Electrical workers need PPE with electrical insulation properties and protection against arc flash hazards.',
  },
  {
    id: 163,
    question: 'What is arc flash protection?',
    options: [
      'Duties that must be complied with regardless of cost or practicability',
      'Competent persons, supervisors, and experienced workers',
      'Significant findings, people at risk, control measures',
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
      'Evacuation time, route effectiveness, alarm audibility, assembly procedures',
      'Constructed, maintained and used to prevent danger',
    ],
    correctAnswer: 0,
    explanation:
      'Electrical insulating gloves must be tested before issue, regularly during use, and after any suspected damage.',
  },
  {
    id: 165,
    question: 'What is the purpose of PPE marking and labelling?',
    options: [
      'To detect health effects early and take preventive action',
      'Identify PPE type, performance standards, limitations, expiry dates',
      'It interferes with the natural electrical signals controlling the heart',
      'To investigate accidents, inspect the workplace, receive information, be consulted',
    ],
    correctAnswer: 1,
    explanation:
      'Marking identifies PPE type, performance standards met, limitations and expiry dates for safe use.',
  },
  {
    id: 166,
    question: 'How should PPE information be communicated to workers?',
    options: [
      'Identify, assess, control through appropriate measures, monitor conditions',
      'Deaths, specified injuries, over-7-day injuries, diseases, dangerous occurrences',
      'Training, written instructions, demonstrations, ongoing reinforcement',
      'When conditions change, after incidents, regularly',
    ],
    correctAnswer: 2,
    explanation:
      'PPE information should be communicated through training, written instructions, demonstrations and ongoing reinforcement.',
  },
  {
    id: 167,
    question: 'What role does comfort play in PPE effectiveness?',
    options: [
      'Emergency contacts, site plans, hazard information, evacuation procedures',
      'Filtering facepieces, half/full face masks, powered respirators, breathing apparatus',
      'A document describing how work will be carried out safely',
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
      'Workers know the practical requirements and comfort needed for effective use',
      'To represent employees in consultations with employers on health and safety matters',
      'Current, duration, path through body, frequency',
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
      'Unlimited fine and/or imprisonment',
      'Attend site induction and safety briefing',
      'Save lives - people before property',
      'Personal Protective Equipment',
    ],
    correctAnswer: 1,
    explanation:
      'Site induction provides essential safety information specific to that site and must be completed before starting work.',
  },
  {
    id: 170,
    question: 'What information should be covered in a site induction?',
    options: [
      'Lack experience, may take risks, physical development incomplete',
      'Person with sufficient training, experience and knowledge to prevent danger',
      'Site layout, hazards, emergency procedures, site rules, welfare facilities',
      'Practical, clear, focused on significant risks, regularly reviewed',
    ],
    correctAnswer: 2,
    explanation:
      'Site induction should cover site layout, specific hazards, emergency procedures, site rules and welfare facilities.',
  },
  {
    id: 171,
    question: 'What is a construction phase plan?',
    options: [
      'Issue records, training records, inspection records, maintenance records',
      'To identify hazards and evaluate risks to implement appropriate controls',
      'Employer liability for acts of employees in the course of employment',
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
      'Monthly brief tests and annual full duration tests',
      'Toilets, washing facilities, drinking water, rest areas, changing rooms',
      'Toxic gases that can cause unconsciousness and death',
      'High winds, ice, heavy rain, extreme temperatures, lightning',
    ],
    correctAnswer: 1,
    explanation:
      'Welfare facilities should include toilets, washing facilities, drinking water, rest areas and changing rooms.',
  },
  {
    id: 174,
    question: 'What is the purpose of site security?',
    options: [
      'Reporting of Injuries, Diseases and Dangerous Occurrences Regulations',
      'Use reduced voltage supplies (110V or lower), RCD protection',
      'Prevent unauthorised access, protect workers and public, secure materials',
      'Immediately by telephone followed by written report within 10 days',
    ],
    correctAnswer: 2,
    explanation:
      'Site security prevents unauthorised access, protects workers and the public, and secures materials and equipment.',
  },
  {
    id: 175,
    question: 'What housekeeping practices improve site safety?',
    options: [
      'Stop work immediately and evacuate via nearest safe exit',
      'Skin condition (wet/dry), contact area, voltage, frequency',
      'When conditions change, after incidents, regularly',
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
      'How to use, maintain, store PPE and recognise defects',
      'Prevent people entering dangerous areas during operation',
      'Competent person with knowledge of the work and hazards',
    ],
    correctAnswer: 0,
    explanation:
      'Good housekeeping reduces trip and fall hazards, fire risks and creates better working conditions.',
  },
  {
    id: 177,
    question: 'What are the main causes of slips, trips and falls on construction sites?',
    options: [
      'Lack experience, may take risks, physical development incomplete',
      'Poor housekeeping, uneven surfaces, inadequate lighting, unsuitable footwear',
      'A legal notice requiring improvement to health and safety within a specified time',
      'Stop high-risk activities, provide shelter, monitor conditions',
    ],
    correctAnswer: 1,
    explanation:
      'Slips, trips and falls result from poor housekeeping, uneven surfaces, inadequate lighting and unsuitable footwear.',
  },
  {
    id: 178,
    question: 'How can slips, trips and falls be prevented?',
    options: [
      'Only protects the individual, can fail, may give false sense of security',
      'To make the wearer visible in poor light or near moving vehicles',
      'Good housekeeping, proper lighting, suitable surfaces, appropriate footwear',
      'Prevent unauthorised access and protect the public from site hazards',
    ],
    correctAnswer: 2,
    explanation:
      'Prevention requires good housekeeping, adequate lighting, suitable walking surfaces and appropriate footwear.',
  },
  {
    id: 179,
    question: 'What is the purpose of site signage?',
    options: [
      'Routes, assembly points, responsibilities, special needs, communication methods',
      'It interferes with the natural electrical signals controlling the heart',
      'To investigate accidents, inspect the workplace, receive information, be consulted',
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
      'Assist with evacuation, check areas are clear, liaise with fire brigade',
      'Only protects the individual, can fail, may give false sense of security',
      'Prevent unauthorised access, protect workers and public, secure materials',
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
      'Poor housekeeping, uneven surfaces, inadequate lighting, unsuitable footwear',
      'Constructed, maintained and used to prevent danger',
      'Use reduced voltage supplies (110V or lower), RCD protection',
    ],
    correctAnswer: 0,
    explanation:
      'Unsafe conditions should be reported immediately and the area made safe if possible without creating further risk.',
  },
  {
    id: 185,
    question: 'What is a toolbox talk?',
    options: [
      'Workers know the practical requirements and comfort needed for effective use',
      'Short safety discussion on specific topics relevant to current work',
      'Unlimited fine, remedial orders, publicity orders',
      'To ensure the tester is working before and after testing',
    ],
    correctAnswer: 1,
    explanation:
      'Toolbox talks are short, focused safety discussions on topics relevant to current work activities.',
  },
  {
    id: 186,
    question: 'How often should toolbox talks be held?',
    options: [
      'Current, duration, path through body, frequency',
      'Balance the risk against the cost and effort of reducing it',
      'Regularly, often weekly or before specific high-risk activities',
      'Fire procedures, evacuation routes, equipment use, emergency communication',
    ],
    correctAnswer: 2,
    explanation:
      'Toolbox talks should be held regularly, often weekly, and before specific high-risk activities.',
  },
  {
    id: 187,
    question: 'What is the purpose of site inspections?',
    options: [
      'Reduces conflicts between activities, controls access, manages hazards',
      'Use reduced voltage supplies (110V or lower), RCD protection',
      'Assessment tailored to specific site conditions and hazards',
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
      'Reduces conflicts between activities, controls access, manages hazards',
      'Prevent people entering dangerous areas during operation',
      'At designated assembly points away from the building',
    ],
    correctAnswer: 0,
    explanation:
      'Site inspections should be carried out by competent persons including supervisors, safety representatives and managers.',
  },
  {
    id: 189,
    question: 'What should be done with findings from site inspections?',
    options: [
      'Internal damage may be extensive despite limited external signs',
      'Act on findings, prioritise by risk, monitor progress',
      'Close doors, signal for help, stay low, await rescue',
      'To ensure the tester is working before and after testing',
    ],
    correctAnswer: 1,
    explanation:
      'Inspection findings should be acted upon, prioritised by risk level and progress monitored until completion.',
  },
  {
    id: 190,
    question: 'What is the role of the site safety representative?',
    options: [
      'Issue records, training records, inspection records, maintenance records',
      'Elimination, substitution, engineering controls, administrative controls, PPE',
      'Represent workers on safety matters and investigate concerns',
      'To make the wearer visible in poor light or near moving vehicles',
    ],
    correctAnswer: 2,
    explanation:
      'Safety representatives represent workers on safety matters, investigate concerns and participate in consultations.',
  },
  {
    id: 191,
    question: 'What powers do safety representatives have on site?',
    options: [
      'For high-risk work like confined spaces, hot work, electrical isolation',
      'Practical, clear, focused on significant risks, regularly reviewed',
      'Competent person with knowledge of the work and hazards',
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
      'Poor housekeeping, uneven surfaces, inadequate lighting, unsuitable footwear',
      'Issue records, training records, inspection records, maintenance records',
      'Competent persons including supervisors, safety representatives, managers',
    ],
    correctAnswer: 0,
    explanation:
      'Good communication is essential for work coordination, safety information sharing and effective emergency response.',
  },
  {
    id: 193,
    question: 'How should hazardous substances be stored on site?',
    options: [
      'Vehicle movements, hand signals, hazard awareness, communication',
      'Secure, ventilated areas with appropriate containment and labelling',
      'Investigate accidents, inspect workplace, be consulted on safety matters',
      'Act on findings, prioritise by risk, monitor progress',
    ],
    correctAnswer: 1,
    explanation:
      'Hazardous substances need secure, well-ventilated storage with appropriate containment and clear labelling.',
  },
  {
    id: 194,
    question: 'What information should be available for hazardous substances?',
    options: [
      'Switch off power supply or remove casualty using non-conductive material',
      'Residual Current Device - detects earth leakage currents',
      'Safety data sheets with hazard information and control measures',
      'Person with sufficient training, experience and knowledge to prevent danger',
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
      'At designated assembly points away from the building',
      'Clear walkways, proper storage, regular cleaning, waste removal',
      'Guide vehicles safely and control vehicle movements',
    ],
    correctAnswer: 0,
    explanation:
      'COSHH assessments identify hazardous substances, exposure routes, health effects and necessary control measures.',
  },
  {
    id: 197,
    question: 'What are the main routes of entry for chemicals into the body?',
    options: [
      'When damaged, worn out, or manufacturer\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s expiry date reached',
      'Inhalation, ingestion, skin/eye contact, injection',
      'Water conducts electricity and can cause electrocution',
      'Remove or control any element of the fire triangle',
    ],
    correctAnswer: 1,
    explanation:
      'Chemicals can enter the body through inhalation, ingestion, skin/eye contact and injection through wounds.',
  },
  {
    id: 198,
    question: 'What environmental hazards might be found on construction sites?',
    options: [
      'Designated routes, barriers, crossing points, traffic management',
      'Clean, dry place away from contamination and damage',
      'Noise, dust, vibration, weather conditions, contaminated ground',
      'Decontaminate safely or dispose of according to specific procedures',
    ],
    correctAnswer: 2,
    explanation:
      'Environmental hazards include noise, dust, vibration, adverse weather conditions and contaminated ground.',
  },
  {
    id: 199,
    question: 'How should environmental hazards be managed?',
    options: [
      'Plan, manage and coordinate health and safety during the construction phase',
      'Health and safety measures, risks, preventive measures, competent persons',
      'Prevent people entering dangerous areas during operation',
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
      'Multiple methods: landline, mobile, radio, alarms',
      'Competent person with knowledge of the work and hazards',
      'Check for breathing/circulation, give CPR if needed, treat for shock',
    ],
    correctAnswer: 0,
    explanation:
      'Perimeter fencing prevents unauthorised access and protects the public from construction hazards.',
  },
  {
    id: 201,
    question: 'What considerations apply to site access and egress?',
    options: [
      'Internal damage may be extensive despite limited external signs',
      'Safe routes, adequate width, good visibility, emergency access',
      'Enter premises, examine, investigate, issue notices, prosecute',
      'Designated routes, barriers, crossing points, traffic management',
    ],
    correctAnswer: 1,
    explanation:
      'Site access must provide safe routes, adequate width, good visibility and maintain emergency access.',
  },
  {
    id: 202,
    question: 'What is the importance of site planning for safety?',
    options: [
      'To give practical guidance on complying with legal duties',
      'Regulations are legally binding, guidance is advisory',
      'Reduces conflicts between activities, controls access, manages hazards',
      'Safety data sheets with hazard information and control measures',
    ],
    correctAnswer: 2,
    explanation:
      'Good site planning reduces conflicts between activities, controls access routes and helps manage hazards.',
  },
  {
    id: 203,
    question: 'How should deliveries be managed safely on site?',
    options: [
      'Immediately by telephone followed by written report within 10 days',
      'Regulations are legally binding, guidance is advisory',
      'Internal damage may be extensive despite limited external signs',
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
      'Designated routes, barriers, crossing points, traffic management',
      'Electricity at Work Regulations 1989',
      'Within 40 milliseconds for 30mA types',
    ],
    correctAnswer: 0,
    explanation:
      'A banksman guides vehicles safely during reversing and manoeuvring operations to prevent accidents.',
  },
  {
    id: 205,
    question: 'What training should banksmen receive?',
    options: [
      'Identify, assess, control through appropriate measures, monitor conditions',
      'Vehicle movements, hand signals, hazard awareness, communication',
      'When there\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s risk from flying particles, chemicals, radiation, or bright light',
      'Reduces trips, falls, fire risks and improves working conditions',
    ],
    correctAnswer: 1,
    explanation:
      'Banksmen need training in vehicle movements, standard hand signals, hazard awareness and communication.',
  },
  {
    id: 206,
    question: 'What is the purpose of exclusion zones around plant and machinery?',
    options: [
      'Personal emergency evacuation plans and assistance arrangements',
      'Noise, dust, vibration, weather conditions, contaminated ground',
      'Prevent people entering dangerous areas during operation',
      'Remove or control any element of the fire triangle',
    ],
    correctAnswer: 2,
    explanation:
      'Exclusion zones prevent people entering dangerous areas around operating plant and machinery.',
  },
  {
    id: 207,
    question: 'How should site traffic and pedestrians be separated?',
    options: [
      'When there\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s risk from flying particles, chemicals, radiation, or bright light',
      'Serious injuries including fractures, amputations, serious burns',
      'Good housekeeping, proper lighting, suitable surfaces, appropriate footwear',
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
      'Prevent unauthorised access and protect the public from site hazards',
      'A document describing how work will be carried out safely',
      'When conditions change, after incidents, regularly',
    ],
    correctAnswer: 0,
    explanation:
      'Various weather conditions affect safety including high winds, ice, heavy rain, extreme temperatures and lightning.',
  },
  {
    id: 209,
    question: 'What precautions should be taken in extreme weather?',
    options: [
      'Burn caused by electric arc/flash producing intense heat',
      'Stop high-risk activities, provide shelter, monitor conditions',
      'Competent person with knowledge of the work and hazards',
      'Workers, visitors, contractors, public, special groups',
    ],
    correctAnswer: 1,
    explanation:
      'Extreme weather may require stopping high-risk activities, providing shelter and continuously monitoring conditions.',
  },
  {
    id: 210,
    question: 'What is the importance of coordination between different trades on site?',
    options: [
      'To ensure the health, safety and welfare of all employees at work',
      'Burn caused by electric arc/flash producing intense heat',
      'Prevents conflicts, ensures compatible working methods, manages shared risks',
      'To take reasonable care of themselves and others, and cooperate with employers',
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
      'Electricity at Work Regulations 1989',
      'Multiple methods: landline, mobile, radio, alarms',
      'Statement of intent, organisation, and arrangements',
    ],
    correctAnswer: 0,
    explanation:
      'Fire prevention involves removing or controlling heat sources, fuel sources, or oxygen supply.',
  },
  {
    id: 213,
    question: 'What are the main classes of fire?',
    options: [
      'Where there is risk of head injury from falling objects or impact',
      'Class A (solids), B (liquids), C (gases), D (metals), F (cooking oils)',
      'Site layout, hazards, emergency procedures, site rules, welfare facilities',
      'Duties that must be complied with regardless of cost or practicability',
    ],
    correctAnswer: 1,
    explanation:
      'Fire classes are: A (ordinary combustibles), B (flammable liquids), C (gases), D (metals), F (cooking oils).',
  },
  {
    id: 214,
    question: 'What type of fire extinguisher should be used on Class A fires?',
    options: [
      'Health and Safety Executive (HSE)',
      'Construction Design Management',
      'Water, foam, or dry powder',
      'Personal Protective Equipment',
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
      'Control of Substances Hazardous to Health',
      'Prohibition, warning, mandatory, emergency, fire safety signs',
      'Clean, dry place away from contamination and damage',
    ],
    correctAnswer: 0,
    explanation:
      'Water conducts electricity and using it on live electrical equipment can cause electrocution.',
  },
  {
    id: 217,
    question: 'What should you do if you discover a fire?',
    options: [
      'Burn caused by electric arc/flash producing intense heat',
      'Raise the alarm, call fire brigade, evacuate if safe to do so',
      'Personal factors, job factors, organisational factors, environmental factors',
      'When there\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s risk from flying particles, chemicals, radiation, or bright light',
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
      "Skin condition (wet/dry), contact area, voltage, frequency",
      "Protection from electrical arc blast and thermal energy",
      "Competent person with knowledge of the work and hazards",
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
      'Elimination of the hazard',
      'Ear plugs, ear muffs, semi-insert protectors',
      'All construction projects',
    ],
    correctAnswer: 0,
    explanation:
      'Life safety is paramount - people must be evacuated before considering property or equipment.',
  },
  {
    id: 221,
    question: 'What should you do when the fire alarm sounds?',
    options: [
      'Safety glasses, goggles, face shields, welding screens',
      'Stop work immediately and evacuate via nearest safe exit',
      'Investigate accidents, inspect workplace, be consulted on safety matters',
      'Practical, clear, focused on significant risks, regularly reviewed',
    ],
    correctAnswer: 1,
    explanation:
      'When fire alarms sound, stop work immediately and evacuate via the nearest safe exit route.',
  },
  {
    id: 222,
    question: 'Where should people assemble during evacuation?',
    options: [
      'Protection from electrical arc blast and thermal energy',
      'Regularly, often weekly or before specific high-risk activities',
      'At designated assembly points away from the building',
      'Identify hazards, check compliance, monitor safety standards',
    ],
    correctAnswer: 2,
    explanation:
      'People should assemble at designated assembly points that are a safe distance from the building.',
  },
  {
    id: 223,
    question: 'Who should take a roll call at assembly points?',
    options: [
      'Inhalation, ingestion, skin/eye contact, injection',
      'Provide a construction phase plan',
      'Something with potential to cause harm',
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
      'Use reduced voltage supplies (110V or lower), RCD protection',
      'Reporting of Injuries, Diseases and Dangerous Occurrences Regulations',
      'Class A (solids), B (liquids), C (gases), D (metals), F (cooking oils)',
    ],
    correctAnswer: 0,
    explanation:
      'Fire brigade should be told: exact location, type of fire, people involved/missing, and any hazardous materials.',
  },
  {
    id: 225,
    question: 'What is a fire risk assessment?',
    options: [
      'Where there\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s risk of falling objects, puncture wounds, slips, electrical hazards',
      'Systematic evaluation of fire hazards and risks to implement control measures',
      'To detect health effects early and take preventive action',
      'When there\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s risk from dust, fumes, gases, vapours, or oxygen deficiency',
    ],
    correctAnswer: 1,
    explanation:
      'Fire risk assessment systematically evaluates fire hazards and risks to implement appropriate prevention and protection measures.',
  },
  {
    id: 226,
    question: 'What should a fire risk assessment identify?',
    options: [
      'Stop high-risk activities, provide shelter, monitor conditions',
      'Voltage between hand and feet when touching equipment',
      'Fire hazards, people at risk, control measures needed',
      'Touching exposed metalwork that has become live due to a fault',
    ],
    correctAnswer: 2,
    explanation:
      'Fire risk assessments should identify fire hazards, people at risk, and determine necessary control measures.',
  },
  {
    id: 227,
    question: 'How often should fire drills be conducted?',
    options: [
      'Stop work immediately and evacuate via nearest safe exit',
      'To give practical guidance on complying with legal duties',
      'Certain hazards pose additional risks to mother and unborn child',
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
      'Vehicle movements, hand signals, hazard awareness, communication',
      'Plan, manage and coordinate health and safety during the construction phase',
      'Relevant findings of risk assessment and control measures required',
    ],
    correctAnswer: 0,
    explanation:
      'Evaluate evacuation times, route effectiveness, alarm audibility, assembly procedures and overall drill effectiveness.',
  },
  {
    id: 229,
    question: 'What are the key components of emergency evacuation routes?',
    options: [
      'Competent persons, supervisors, and experienced workers',
      'Clearly marked, well-lit, unobstructed, leading to safe areas',
      'Provide illumination during power failures for safe evacuation',
      'For high-risk activities, complex work, CDM projects',
    ],
    correctAnswer: 1,
    explanation:
      'Evacuation routes must be clearly marked, well-lit, kept unobstructed, and lead to safe areas outside.',
  },
  {
    id: 230,
    question: 'What is the role of fire wardens?',
    options: [
      'Nature of hazard, compatibility, comfort, fit, maintenance requirements',
      'To plan, manage and coordinate health and safety during the pre-construction phase',
      'Assist with evacuation, check areas are clear, liaise with fire brigade',
      'Enter premises, examine, investigate, issue notices, prosecute',
    ],
    correctAnswer: 2,
    explanation:
      'Fire wardens assist evacuation, check their areas are clear, help colleagues and liaise with emergency services.',
  },
  {
    id: 231,
    question: 'What training should fire wardens receive?',
    options: [
      'Switch off power supply or remove casualty using non-conductive material',
      'Prevents conflicts, ensures compatible working methods, manages shared risks',
      'Information about the structure needed for future construction work, maintenance, and demolition',
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
      'How to use, maintain, store PPE and recognise defects',
      'To ensure the health, safety and welfare of all employees at work',
      'To get input from those who understand the work and risks',
    ],
    correctAnswer: 0,
    explanation:
      'If trapped: close doors to slow fire spread, signal for help, stay low to avoid smoke, and await rescue.',
  },
  {
    id: 233,
    question: 'Why should you stay low in smoke?',
    options: [
      'Update risk assessments and method statements',
      'Cleaner air is near the floor as smoke rises',
      'Hard hats, bump caps, hair nets',
      'Meets European safety standards',
    ],
    correctAnswer: 1,
    explanation:
      'Smoke rises, so cleaner, cooler air with more oxygen is found closer to the floor.',
  },
  {
    id: 234,
    question: 'What is the main danger from smoke?',
    options: [
      'Before issue, periodically during use, after suspected damage',
      'Competent persons, supervisors, and experienced workers',
      'Toxic gases that can cause unconsciousness and death',
      'To ensure the tester is working before and after testing',
    ],
    correctAnswer: 2,
    explanation:
      'Smoke contains toxic gases like carbon monoxide that can cause unconsciousness and death within minutes.',
  },
  {
    id: 235,
    question: 'What emergency equipment should be available on construction sites?',
    options: [
      'To give practical guidance on complying with legal duties',
      'Good design, training, procedures, culture, and learning from mistakes',
      'Noise, dust, vibration, weather conditions, contaminated ground',
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
      'To investigate accidents, inspect the workplace, receive information, be consulted',
      'To give practical guidance on complying with legal duties',
      'When there\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s exposure to specific hazards like noise, vibration, asbestos',
    ],
    correctAnswer: 0,
    explanation:
      'Fire safety management includes prevention measures, detection systems, suppression equipment and evacuation procedures.',
  },
  {
    id: 237,
    question: 'How should hot work be controlled to prevent fires?',
    options: [
      'Fire hazards, people at risk, control measures needed',
      'Permits, fire watches, cleared areas, fire extinguishers nearby',
      'Wet skin, medical conditions, fatigue, contact area',
      'Touching exposed metalwork that has become live due to a fault',
    ],
    correctAnswer: 1,
    explanation:
      'Hot work requires permits, trained fire watches, cleared work areas and appropriate fire extinguishers nearby.',
  },
  {
    id: 238,
    question: 'What is a fire watch?',
    options: [
      'Prevent people entering dangerous areas during operation',
      'Water conducts electricity and can cause electrocution',
      'Person monitoring for fires during and after hot work',
      'Voltage between hand and feet when touching equipment',
    ],
    correctAnswer: 2,
    explanation:
      'A fire watch is a trained person who monitors for fires during hot work and for a period afterwards.',
  },
  {
    id: 239,
    question: 'What should be done with combustible materials during hot work?',
    options: [
      'Hand to hand across the chest',
      'Ventricular fibrillation - potentially fatal',
      'Provide a construction phase plan',
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
      'Toxic gases that can cause unconsciousness and death',
      'Electricity at Work Regulations 1989',
      'Residual Current Device - detects earth leakage currents',
    ],
    correctAnswer: 0,
    explanation:
      'Sites should have multiple communication methods including landlines, mobiles, radios and alarm systems.',
  },
  {
    id: 241,
    question: 'What information should be immediately available in emergencies?',
    options: [
      'Systematic analysis of how and why people make mistakes',
      'Emergency contacts, site plans, hazard information, evacuation procedures',
      'Review and revise the risk assessment and control measures',
      'Identify hazards, decide who might be harmed, evaluate risks, record findings, review',
    ],
    correctAnswer: 1,
    explanation:
      'Emergency information should include contacts, site plans, hazard details and evacuation procedures.',
  },
  {
    id: 242,
    question: 'How should emergency procedures be communicated?',
    options: [
      'Switch off, isolate, lock off, test, prove dead',
      'Personal emergency evacuation plans and assistance arrangements',
      'Training, written procedures, drills, signs, induction',
      'To ensure the health, safety and welfare of all employees at work',
    ],
    correctAnswer: 2,
    explanation:
      'Emergency procedures should be communicated through training, written procedures, drills, signage and induction.',
  },
  {
    id: 243,
    question: 'What is the purpose of emergency lighting?',
    options: [
      'Safety glasses, goggles, face shields, welding screens',
      'Deaths, specified injuries, over-7-day injuries, diseases, dangerous occurrences',
      'Certain hazards pose additional risks to mother and unborn child',
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
      'When damaged, worn out, or manufacturer\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s expiry date reached',
      'Safety glasses, goggles, face shields, welding screens',
      'Water conducts electricity and can cause electrocution',
    ],
    correctAnswer: 0,
    explanation:
      'Emergency lighting should be tested monthly for operation and annually for full duration capability.',
  },
  {
    id: 245,
    question: 'What should be included in emergency evacuation plans?',
    options: [
      'Identify hazards, check compliance, monitor safety standards',
      'Routes, assembly points, responsibilities, special needs, communication methods',
      'Competent persons including supervisors, safety representatives, managers',
      'Safety shoes/boots with toe protection, puncture resistance, electrical insulation',
    ],
    correctAnswer: 1,
    explanation:
      'Plans should include escape routes, assembly points, responsibilities, provisions for special needs and communication.',
  },
  {
    id: 246,
    question: 'How should people with disabilities be considered in emergency planning?',
    options: [
      'Events that are likely to happen or could reasonably be expected',
      'Site layout, hazards, emergency procedures, site rules, welfare facilities',
      'Personal emergency evacuation plans and assistance arrangements',
      'Act on findings, prioritise by risk, monitor progress',
    ],
    correctAnswer: 2,
    explanation:
      'People with disabilities need personal emergency evacuation plans with specific assistance arrangements.',
  },
  {
    id: 247,
    question: 'What should be done after an emergency evacuation?',
    options: [
      'Identify hazards, decide who might be harmed, evaluate risks, record findings, review',
      'When there\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s exposure to specific hazards like noise, vibration, asbestos',
      'Effectiveness of control measures, changing conditions, worker compliance',
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
      'To take reasonable care of themselves and others, and cooperate with employers',
      'Effectiveness of control measures, changing conditions, worker compliance',
      'Plan, manage and coordinate health and safety during the construction phase',
    ],
    correctAnswer: 0,
    explanation:
      'Business continuity planning ensures operations can continue during emergencies and recovery afterwards.',
  },
  {
    id: 249,
    question: 'What should be included in emergency training?',
    options: [
      'Class A (solids), B (liquids), C (gases), D (metals), F (cooking oils)',
      'Alarm procedures, evacuation routes, assembly points, equipment use, site-specific risks',
      'Deaths, specified injuries, over-7-day injuries, diseases, dangerous occurrences',
      'Voltage difference between feet when walking near earthed equipment',
    ],
    correctAnswer: 1,
    explanation:
      'Training should cover alarm procedures, evacuation routes, assembly points, equipment use, and site-specific risks.',
  },
  {
    id: 250,
    question: 'How often should emergency procedures be reviewed and updated?',
    options: [
      'Personal factors, job factors, organisational factors, environmental factors',
      'Systematic evaluation to select suitable PPE for specific hazards',
      'Regularly, after incidents, when changes occur to site or operations',
      'Regulations are legally binding, guidance is advisory',
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
