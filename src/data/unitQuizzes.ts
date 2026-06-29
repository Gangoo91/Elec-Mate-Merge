// Define and export the QuizQuestion interface
export interface QuizQuestion {
  id?: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface UnitQuiz {
  unitCode: string;
  questions: QuizQuestion[];
}

// Question pool for ELEC2/01 Health and Safety unit
export const healthAndSafetyQuizzes: UnitQuiz = {
  unitCode: 'ELEC2/01',
  questions: [
    {
      id: 'hs-q1',
      question: 'What is the primary piece of legislation governing health and safety in the workplace generally?',
      options: [
        'The Work at Height Regulations 2005',
        'The Health and Safety at Work etc. Act 1974',
        'The Management of Health and Safety at Work Regulations 1999',
        'The Personal Protective Equipment at Work Regulations 1992',
      ],
      correctAnswer: 1,
      explanation:
        'The Health and Safety at Work etc. Act 1974 is the primary, overarching legislation placing general duties on employers and employees; the other regulations sit beneath it and address specific risks.',
    },
    {
      id: 'hs-q2',
      question: 'Which regulations specifically address electrical safety in the workplace?',
      options: [
        'The Provision and Use of Work Equipment Regulations 1998',
        'The Control of Substances Hazardous to Health Regulations 2002',
        'The Electricity at Work Regulations 1989',
        'The Manual Handling Operations Regulations 1992',
      ],
      correctAnswer: 2,
      explanation:
        'The Electricity at Work Regulations 1989 impose duties on the design, construction, maintenance and safe working on electrical systems; the others cover work equipment, hazardous substances and manual handling respectively.',
    },
    {
      id: 'hs-q3',
      question: 'What does RIDDOR stand for?',
      options: [
        'Reporting of Injuries, Diseases and Dangerous Occurrences Regulations',
        'Risk Identification, Detection, Determination and Operational Response',
        'Regional Inspection of Dangerous Devices and Operational Requirements',
        'Risk Identification and Dangerous Device Operational Regulations',
      ],
      correctAnswer: 0,
      explanation:
        'RIDDOR stands for the Reporting of Injuries, Diseases and Dangerous Occurrences Regulations, which require certain workplace incidents to be reported to the enforcing authority (the HSE).',
    },
    {
      id: 'hs-q4',
      question: 'Which of these is NOT one of the five steps in a risk assessment?',
      options: [
        'Identify hazards',
        'Determine who might be harmed',
        'Purchase protective equipment',
        'Review assessment',
      ],
      correctAnswer: 2,
      explanation:
        "The HSE five steps are: identify hazards; decide who might be harmed; evaluate risks and decide on controls; record findings; and review. Buying PPE is one possible control, not a step in its own right.",
    },
    {
      id: 'hs-q5',
      question: 'What is the correct sequence for safe isolation?',
      options: [
        'Identify circuit, isolate, lock off, prove tester on known source, test dead, re-prove tester',
        'Identify circuit, isolate, test dead, lock off, prove tester on known source',
        'Isolate, identify circuit, test dead, prove tester on known source, lock off',
        'Test dead, identify circuit, isolate, lock off, prove tester on known source',
      ],
      correctAnswer: 0,
      explanation:
        'The recognised procedure is to identify the circuit, isolate and lock off, prove the voltage tester on a known source, test the circuit to confirm dead, then re-prove the tester to confirm it still works. Locking off must come before proving dead.',
    },
    {
      id: 'hs-q6',
      question:
        'Which of these is the most effective control measure according to the hierarchy of control?',
      options: [
        'Administrative controls',
        'Personal protective equipment',
        'Engineering controls',
        'Elimination of the hazard',
      ],
      correctAnswer: 3,
      explanation:
        'In the hierarchy of control, eliminating the hazard altogether is the most effective measure; PPE sits at the bottom as a last resort because it only protects the individual wearing it.',
    },
    {
      id: 'hs-q7',
      question: 'When climbing a ladder, what rule should be followed regarding contact points?',
      options: [
        'Two points of contact at all times',
        'Three points of contact at all times',
        'Four points of contact at all times',
        'Contact is only required when carrying tools',
      ],
      correctAnswer: 1,
      explanation:
        'The HSE recommends maintaining three points of contact (two hands and one foot, or two feet and one hand) when climbing and where possible when working from a ladder, to keep the body stable.',
    },
    {
      id: 'hs-q8',
      question: 'Which of these is NOT a type of circuit protection device?',
      options: [
        'MCB (Miniature Circuit Breaker)',
        'RCD (Residual Current Device)',
        'PPE (Personal Protective Equipment)',
        'Fuse',
      ],
      correctAnswer: 2,
      explanation:
        'PPE protects the individual but is not a circuit protection device. MCBs, RCDs and fuses all interrupt the circuit under fault or overload conditions.',
    },
    {
      id: 'hs-q9',
      question: 'What is the purpose of main protective (equipotential) bonding?',
      options: [
        'To carry normal load current back to the supply',
        'To keep exposed- and extraneous-conductive-parts at substantially the same potential',
        'To protect circuits against overcurrent',
        'To improve the power factor of the installation',
      ],
      correctAnswer: 1,
      explanation:
        'Main protective bonding connects extraneous-conductive-parts (such as incoming gas and water pipes) to the main earthing terminal so that, under fault conditions, they remain at substantially the same potential, limiting touch voltages.',
    },
    {
      id: 'hs-q10',
      question: 'What should be verified before using any test equipment?',
      options: [
        'Its purchase date',
        'Its manufacturer',
        'Its calibration status',
        'The make and model of the meter',
      ],
      correctAnswer: 2,
      explanation:
        'Test instruments must be confirmed as within their calibration date so that readings can be relied upon; an out-of-calibration meter can give dangerously misleading results.',
    },
    {
      id: 'hs-q11',
      question: 'Which document formally controls and authorises high-risk electrical work?',
      options: [
        'A permit-to-work',
        'A purchase order',
        'An installation certificate',
        'A delivery note',
      ],
      correctAnswer: 0,
      explanation:
        'A permit-to-work is a formal documented system that authorises specific high-risk work, sets out the precautions in place and ensures the work cannot start until conditions are safe.',
    },
    {
      id: 'hs-q12',
      question: 'What is the main purpose of PAT testing?',
      options: [
        'To check electrical wiring in buildings',
        'To ensure portable electrical appliances are safe to use',
        'To verify power quality in the supply',
        'To test the continuity of the fixed wiring',
      ],
      correctAnswer: 1,
      explanation:
        'Portable Appliance Testing (PAT) is the inspection and testing of portable electrical equipment to confirm it is safe to use; it does not assess the building’s fixed wiring.',
    },
    {
      id: 'hs-q13',
      question: "What does the term 'LOLER' refer to in health and safety?",
      options: [
        'Ladder Operation and Legal Equipment Regulations',
        'Location of Lifting Equipment Requirements',
        'Lifting Operations and Lifting Equipment Regulations',
        'Legal Obligations for Ladder Equipment Rules',
      ],
      correctAnswer: 2,
      explanation:
        'LOLER is the Lifting Operations and Lifting Equipment Regulations 1998, which require lifting equipment to be strong, stable, suitably marked and thoroughly examined at regular intervals.',
    },
    {
      id: 'hs-q14',
      question:
        'Under HSE guidance GS6, what minimum exclusion distance should be maintained around overhead power lines when figures are not known and the line is not isolated?',
      options: ['1 metre', '3 metres', '9 metres', '15 metres'],
      correctAnswer: 2,
      explanation:
        'HSE guidance GS6 recommends a default exclusion zone of at least 9 metres horizontally from overhead lines where the voltage and safe distances are unknown and the line cannot be made dead.',
    },
    {
      id: 'hs-q15',
      question:
        'What colour is used for prohibition (do not do) safety signs under the Health and Safety (Safety Signs and Signals) Regulations?',
      options: ['Green', 'Yellow', 'Blue', 'Red'],
      correctAnswer: 3,
      explanation:
        'Prohibition signs are red, typically a red circle with a diagonal bar. Warning signs are yellow, mandatory signs are blue and safe-condition signs are green.',
    },
    // Adding more questions to expand the pool
    {
      id: 'hs-q16',
      question: 'What does IP rating on electrical equipment refer to?',
      options: [
        'Insulation Properties',
        'Internal Protection',
        'Ingress Protection',
        'Installation Performance',
      ],
      correctAnswer: 2,
      explanation:
        'An IP (Ingress Protection) rating uses two digits to describe protection against solid objects/dust and against water, for example IP65.',
    },
    {
      id: 'hs-q17',
      question: 'Which type of fire extinguisher must NOT be used on a fire involving live electrical equipment?',
      options: [
        'Water',
        'Carbon dioxide (CO2)',
        'Dry powder',
        'Clean agent (vaporising liquid)',
      ],
      correctAnswer: 0,
      explanation:
        'Water conducts electricity, so a water extinguisher must never be used on live electrical equipment. CO2 and dry powder are non-conductive and safe for electrical fires.',
    },
    {
      id: 'hs-q18',
      question: 'What is the main purpose of a residual current device (RCD)?',
      options: [
        'To prevent overloads',
        'To detect earth leakage current and rapidly disconnect the supply',
        'To protect against short circuits',
        'To regulate the supply voltage',
      ],
      correctAnswer: 1,
      explanation:
        'An RCD continuously compares line and neutral currents; if it detects an imbalance caused by earth leakage (such as current flowing through a person) it disconnects the supply quickly to reduce the risk of fatal shock.',
    },
    {
      id: 'hs-q19',
      question:
        'What is the conventional upper limit of extra-low voltage (ELV) for a.c. in BS 7671?',
      options: ['110V a.c.', '50V a.c.', '25V a.c.', '12V a.c.'],
      correctAnswer: 1,
      explanation:
        'BS 7671 defines extra-low voltage as not exceeding 50V a.c. (or 120V ripple-free d.c.) between conductors or to earth; SELV and PELV systems are commonly used to reduce shock risk.',
    },
    {
      id: 'hs-q20',
      question:
        'Who is responsible for implementing health and safety measures in a workplace under the Health and Safety at Work Act?',
      options: [
        'Only the safety officer',
        'Only supervisors',
        'Only managers',
        'Everyone in the workplace',
      ],
      correctAnswer: 3,
      explanation:
        'While the employer carries the primary duty, the Act places duties on everyone: employees must take reasonable care of themselves and others and co-operate with safety measures.',
    },
    {
      id: 'hs-q21',
      question: "When is a 'hot works permit' required?",
      options: [
        'When working in high-temperature environments',
        'When working with live electrical equipment',
        'When carrying out work that generates heat, flames or sparks, such as welding or grinding',
        'When working near water',
      ],
      correctAnswer: 2,
      explanation:
        'A hot works permit controls activities that produce heat, flames or sparks (welding, grinding, soldering, cutting), which could ignite combustible materials and cause a fire.',
    },
    {
      id: 'hs-q22',
      question: 'What is the main goal of a Method Statement?',
      options: [
        'To record materials used in a task',
        'To document step-by-step procedures for completing hazardous work safely',
        'To list the tools and materials required for a job',
        'To calculate the labour and material costs for a project',
      ],
      correctAnswer: 1,
      explanation:
        'A method statement sets out, step by step, how a task will be carried out safely, drawing on the controls identified in the risk assessment.',
    },
    {
      id: 'hs-q23',
      question: 'Which of the following is an example of a leading indicator in health and safety?',
      options: [
        'Number of accidents',
        'Lost-time injuries',
        'Safety training completions',
        'Insurance claims',
      ],
      correctAnswer: 2,
      explanation:
        'Leading indicators are proactive measures of activity that prevents harm (such as completed training or inspections); accidents, injuries and claims are lagging indicators that measure harm after it has happened.',
    },
    {
      id: 'hs-q24',
      question: 'What does COSHH stand for?',
      options: [
        'Control of Substances Hazardous to Health',
        'Company Oversight for Safety and Health Hazards',
        'Certification of Safety in Health and Hygiene',
        'Corrective Operations for Safety in Harmful Hazards',
      ],
      correctAnswer: 0,
      explanation:
        'COSHH is the Control of Substances Hazardous to Health Regulations, which require employers to assess and control exposure to hazardous substances such as dusts, fumes and chemicals.',
    },
    {
      id: 'hs-q25',
      question: 'What is the purpose of a toolbox talk?',
      options: [
        'To discuss which tools to purchase',
        'To organise tools in the workplace',
        'To brief workers on a specific health and safety topic',
        'To plan the day’s production targets',
      ],
      correctAnswer: 2,
      explanation:
        'A toolbox talk is a short, focused briefing delivered to workers on a particular health and safety topic relevant to the task or site.',
    },
    {
      id: 'hs-q26',
      question: 'What must be established before excavating or digging on a construction site?',
      options: [
        'The weather forecast for the week',
        'The location of underground services',
        'The site’s waste disposal arrangements',
        'The building’s planning permission status',
      ],
      correctAnswer: 1,
      explanation:
        'Underground services (electricity, gas, water and telecoms) must be located using up-to-date plans and cable-avoidance tools before digging, to prevent strikes that can cause serious injury.',
    },
    {
      id: 'hs-q27',
      question: 'Which of the following is NOT a factor in electrical fire risk?',
      options: [
        'Overloaded circuits',
        'Loose connections',
        'Correctly installed earth bonding',
        'Damaged or overheating cables',
      ],
      correctAnswer: 2,
      explanation:
        'Correctly installed earth bonding is a safety measure, not a fire risk. Overloaded circuits, loose connections and damaged cables all generate heat that can start fires.',
    },
    {
      id: 'hs-q28',
      question: 'What does PPE stand for?',
      options: [
        'Personal Protective Equipment',
        'Public Protection Enforcement',
        'Professional Practice Equipment',
        'Preventative Procedural Elements',
      ],
      correctAnswer: 0,
      explanation:
        'PPE stands for Personal Protective Equipment, such as gloves, eye protection, hard hats and safety footwear, used as a last line of defence against residual risk.',
    },
    {
      id: 'hs-q29',
      question: 'Which of these is the correct definition of a hazard?',
      options: [
        'Anything with the potential to cause harm',
        'The likelihood that harm will occur',
        'The combination of likelihood and severity of harm',
        'The financial cost of an accident',
      ],
      correctAnswer: 0,
      explanation:
        'A hazard is anything with the potential to cause harm. Risk, by contrast, is the likelihood that the harm will actually occur combined with its severity.',
    },
    {
      id: 'hs-q30',
      question: 'What is the primary purpose of a risk assessment?',
      options: [
        'To allocate blame after an accident',
        'To identify hazards, evaluate risks and decide on suitable controls',
        'To demonstrate compliance without changing how work is done',
        'To increase the speed of production',
      ],
      correctAnswer: 1,
      explanation:
        'A risk assessment is a careful examination of what could cause harm so that suitable control measures can be put in place to prevent injury or ill health.',
    },
    {
      id: 'hs-q31',
      question: 'What action should be taken first when someone suffers an electric shock?',
      options: [
        'Perform CPR immediately',
        'Call for the emergency services',
        'Make the area safe and disconnect the electricity supply',
        'Move the casualty into the recovery position',
      ],
      correctAnswer: 2,
      explanation:
        'You must never touch a casualty who may still be in contact with the supply. Make the area safe by switching off and isolating the supply first, then call for help and give first aid.',
    },
    {
      id: 'hs-q32',
      question:
        'According to the HSE manual handling guideline figures, what is the guideline weight for a man lifting a load held close to the body at waist height?',
      options: ['5 kg', '10 kg', '20 kg', '25 kg'],
      correctAnswer: 3,
      explanation:
        'The HSE guideline figure for a man lifting a load held close to the body at waist height is 25 kg (16 kg for a woman). The figure reduces sharply if the load is held away from the body or above shoulder/below knee height.',
    },
    {
      id: 'hs-q33',
      question: 'Before relying on a voltage indicator to prove a circuit dead, what must be done first?',
      options: [
        'Turn off all nearby equipment',
        'Prove the tester works on a known live source or proving unit',
        'Put on insulating gloves',
        'Inform all site personnel',
      ],
      correctAnswer: 1,
      explanation:
        'A voltage indicator must be proved against a known live source or proving unit immediately before (and after) use, so you can be sure a "dead" reading is genuine and not caused by a faulty tester.',
    },
    {
      id: 'hs-q34',
      question: 'Which type of fire extinguisher is most suitable for a fire involving live electrical equipment?',
      options: ['Water', 'Foam', 'CO2', 'Wet chemical'],
      correctAnswer: 2,
      explanation:
        'A CO2 extinguisher is non-conductive and leaves no residue, making it suitable for electrical fires. Water, foam and wet chemical agents conduct electricity and must not be used on live equipment.',
    },
    {
      id: 'hs-q35',
      question: 'What does the HAVS acronym refer to in health and safety?',
      options: [
        'Hazard Avoidance Verification System',
        'Hand-Arm Vibration Syndrome',
        'Health And Vaccination Schedule',
        'Height Access Validation Standard',
      ],
      correctAnswer: 1,
      explanation:
        'HAVS is Hand-Arm Vibration Syndrome, a permanent and painful condition caused by prolonged use of vibrating tools, controlled under the Control of Vibration at Work Regulations 2005.',
    },
    {
      id: 'hs-q36',
      question: 'Which organisation enforces health and safety regulations in the UK?',
      options: [
        'Environment Agency',
        'Health and Safety Executive (HSE)',
        'Trading Standards',
        'British Standards Institution',
      ],
      correctAnswer: 1,
      explanation:
        'The Health and Safety Executive (HSE) is the national regulator responsible for enforcing health and safety law in most workplaces in Great Britain.',
    },
    {
      id: 'hs-q37',
      question:
        'What is the typical recommended interval for combined inspection and testing of 110V portable power tools on a construction site?',
      options: ['Monthly', 'Every 3 months', 'Every 6 months', 'Annually'],
      correctAnswer: 1,
      explanation:
        'HSE guidance recommends frequent checks for harsh environments; for 110V portable equipment on construction sites a combined inspection and test interval of around every 3 months is typical, with formal visual inspection monthly.',
    },
    {
      id: 'hs-q38',
      question: 'What does ELV stand for in electrical safety?',
      options: [
        'Emergency Lighting Voltage',
        'Extra-Low Voltage',
        'Environmental Limit Value',
        'Electrical Load Variation',
      ],
      correctAnswer: 1,
      explanation:
        'ELV stands for Extra-Low Voltage, defined in BS 7671 as not exceeding 50V a.c. or 120V ripple-free d.c.; SELV and PELV are protective ELV systems used to reduce shock risk.',
    },
    {
      id: 'hs-q39',
      question: "What is the purpose of a 'proving unit' when carrying out safe isolation?",
      options: [
        'To switch the supply fully off',
        'To verify the voltage indicator is working correctly',
        'To measure the voltage present in the circuit',
        'To protect the tester against power surges',
      ],
      correctAnswer: 1,
      explanation:
        'A proving unit provides a known voltage source so the voltage indicator can be proved working both before and after testing a circuit dead, confirming a "dead" reading is genuine.',
    },
    {
      id: 'hs-q40',
      question: 'Who can issue a permit-to-work?',
      options: [
        'Any qualified electrician on site',
        'Only the person who will do the work',
        'An authorised competent person',
        'The client or building owner',
      ],
      correctAnswer: 2,
      explanation:
        'A permit-to-work must be authorised and issued by a competent person who understands the work, the hazards and the precautions required; it should not be issued by the person carrying out the work alone.',
    },
    {
      id: 'hs-q41',
      question: 'What should be checked when inspecting a ladder before use?',
      options: [
        'The manufacturing date only',
        'The rungs, stiles and feet for damage and wear',
        'Only the rubber feet',
        'Only the maximum load label',
      ],
      correctAnswer: 1,
      explanation:
        'A pre-use ladder check should cover the stiles (for bends or cracks), the rungs (for damage, wear or contamination) and the feet (for wear, damage or contamination affecting grip).',
    },
    {
      id: 'hs-q42',
      question: 'When is respiratory protective equipment (RPE) required?',
      options: [
        'Only when working outside',
        'When exposed to harmful dusts, fumes, vapours or gases',
        'Whenever working at height',
        'Whenever using hand tools',
      ],
      correctAnswer: 1,
      explanation:
        'RPE is required where workers may inhale harmful dusts, fumes, vapours or gases that cannot be adequately controlled by other means; it must be suitable for the hazard and properly face-fitted.',
    },
    {
      id: 'hs-q43',
      question:
        'What is the most important reason for maintaining good housekeeping in a workplace?',
      options: [
        'To make the workplace look professional',
        'To prevent slips, trips and falls',
        'To satisfy visiting inspectors',
        'To reduce material storage costs',
      ],
      correctAnswer: 1,
      explanation:
        'Good housekeeping keeps walkways and work areas clear of trailing leads, offcuts and spills, which is the main way of preventing slips, trips and falls — the most common cause of workplace injury.',
    },
    {
      id: 'hs-q44',
      question: 'Which statement about fires involving electrical equipment is correct?',
      options: [
        'They are classified as Class A fires',
        'They are classified as Class C fires',
        'They do not form a fire class of their own',
        'They are classified as Class F fires',
      ],
      correctAnswer: 2,
      explanation:
        'Electricity is a source of ignition rather than a fuel, so electrical fires are not given a class of their own. Once the supply is isolated, the fire is tackled according to the burning material (A, B, etc.).',
    },
    {
      id: 'hs-q45',
      question: 'What is the main function of protective equipotential bonding?',
      options: [
        'To reduce the risk of electric shock by limiting touch voltages',
        'To reduce electromagnetic interference',
        'To improve the installation’s power factor',
        'To increase the current-carrying capacity of conductors',
      ],
      correctAnswer: 0,
      explanation:
        'Equipotential bonding connects conductive parts together so that, under fault conditions, dangerous potential differences (touch voltages) between them are minimised, reducing the risk of electric shock.',
    },
    {
      id: 'hs-q46',
      question:
        "Why is it important to follow the manufacturer's instructions when using power tools?",
      options: [
        'To keep the warranty valid',
        'To ensure safe and correct operation of the equipment',
        'To avoid damaging the work material',
        'To reduce the tool’s noise output',
      ],
      correctAnswer: 1,
      explanation:
        "The manufacturer's instructions set out how the tool is designed to be used safely, including guards, speeds and accessories; following them is a requirement of PUWER and reduces the risk of injury.",
    },
    {
      id: 'hs-q47',
      question:
        'For overhead lines above 750V up to 75kV, what minimum safe working distance is generally advised when the line cannot be made dead?',
      options: ['3 metres', '6 metres', '9 metres', '12 metres'],
      correctAnswer: 0,
      explanation:
        'Industry guidance gives a minimum safe distance of 3 metres for overhead lines above 750V up to 75kV; the distance increases for higher-voltage lines (around 4.5 metres up to 250kV and 6 metres up to 550kV).',
    },
    {
      id: 'hs-q48',
      question:
        'What information should be included on a warning sign for live electrical equipment?',
      options: [
        'Only the operating voltage',
        'Only a warning triangle symbol',
        'A clear warning of the hazard, such as "Danger of death", with the warning symbol',
        "Only the single word 'Live'",
      ],
      correctAnswer: 2,
      explanation:
        'A warning notice for live electrical equipment should clearly convey the hazard, typically combining the electrical warning triangle symbol with wording such as "Danger – risk of electric shock" or "Danger of death".',
    },
    {
      id: 'hs-q49',
      question:
        'What is the maximum permitted height for mobile tower scaffolds without outriggers?',
      options: [
        'A fixed 2.5 metres regardless of base size',
        'A height-to-base ratio of 3:1 for outdoor use',
        'A height-to-base ratio of 5:1 for outdoor use',
        'A height-to-base ratio of 8:1 for outdoor use',
      ],
      correctAnswer: 1,
      explanation:
        'PASMA guidance limits a mobile access tower to a maximum height-to-base ratio of 3:1 outdoors (3.5:1 indoors) unless stabilisers/outriggers are fitted to widen the effective base.',
    },
    {
      id: 'hs-q50',
      question: 'What does a risk assessment ultimately aim to achieve?',
      options: [
        'A complete record of every task carried out',
        'Identification of hazards and the implementation of suitable control measures',
        'A justification for higher project costs',
        'A formal record of who is to blame for incidents',
      ],
      correctAnswer: 1,
      explanation:
        'The purpose of a risk assessment is to identify what could cause harm and then put suitable and sufficient control measures in place to prevent or reduce that harm.',
    },
    {
      id: 'hs-q51',
      question: 'Which supply frequency range presents the greatest danger of ventricular fibrillation from electric shock?',
      options: ['d.c. (0 Hz)', '50–60 Hz', '1,000–5,000 Hz', 'Above 10,000 Hz'],
      correctAnswer: 1,
      explanation:
        'The body is most susceptible to ventricular fibrillation at mains frequencies of around 50–60 Hz, which is one reason electric shock from the UK 50 Hz supply is so dangerous.',
    },
    {
      id: 'hs-q52',
      question: 'What is an Arc Flash?',
      options: [
        'A controlled welding technique',
        'A form of static discharge',
        'A dangerous release of energy when current arcs through the air during a short circuit or fault',
        'A method of testing insulation resistance',
      ],
      correctAnswer: 2,
      explanation:
        'An arc flash is the sudden, explosive release of heat and light energy that occurs when fault current arcs through the air; temperatures can exceed those at the surface of the sun and cause severe burns.',
    },
    {
      id: 'hs-q53',
      question:
        'Under the Electricity Safety, Quality and Continuity Regulations, what is the minimum height for low-voltage overhead lines crossing a road accessible to vehicles?',
      options: ['3.5 metres', '5.2 metres', '5.8 metres', '7.3 metres'],
      correctAnswer: 2,
      explanation:
        'The Electricity Safety, Quality and Continuity Regulations set a minimum ground clearance of 5.8 metres for low-voltage overhead lines crossing roads accessible to vehicular traffic.',
    },
    {
      id: 'hs-q54',
      question: 'Who is responsible for providing first aid facilities in a workplace?',
      options: [
        'Individual employees',
        'The Health and Safety Executive',
        'The employer',
        'The local emergency services',
      ],
      correctAnswer: 2,
      explanation:
        'Under the Health and Safety (First-Aid) Regulations, the employer must provide adequate and appropriate first-aid equipment, facilities and personnel for their workplace.',
    },
    {
      id: 'hs-q55',
      question: 'What does a blue safety sign indicate?',
      options: ['A warning of a hazard', 'A prohibition', 'A mandatory action', 'A safe condition'],
      correctAnswer: 2,
      explanation:
        'Blue signs are mandatory: they instruct that a specific action must be taken, such as "Eye protection must be worn". Yellow warns, red prohibits and green indicates a safe condition.',
    },
    {
      id: 'hs-q56',
      question: 'What is the primary purpose of earthing in an electrical installation?',
      options: [
        'To improve energy efficiency',
        'To increase the current flowing in the circuit',
        'To provide a low-impedance path for fault current so protective devices operate',
        'To reduce electromagnetic interference',
      ],
      correctAnswer: 2,
      explanation:
        'Earthing provides a low-impedance path for fault current to flow, allowing the protective device (fuse or circuit breaker) to operate quickly and disconnect the supply, limiting the duration of dangerous touch voltages.',
    },
    {
      id: 'hs-q57',
      question: 'Under the Control of Noise at Work Regulations, what is the daily/weekly upper exposure action value at which hearing protection must be provided and used?',
      options: ['75 dB(A)', '80 dB(A)', '85 dB(A)', '90 dB(A)'],
      correctAnswer: 2,
      explanation:
        'The upper exposure action value is 85 dB(A); above this, employers must provide hearing protection and ensure it is used. The lower action value is 80 dB(A) and the absolute exposure limit value is 87 dB(A).',
    },
    {
      id: 'hs-q58',
      question: 'Which organisation publishes the Wiring Regulations BS 7671?',
      options: [
        'The Health and Safety Executive',
        'The British Standards Institution',
        'The Institution of Engineering and Technology',
        "The Electrical Contractors' Association",
      ],
      correctAnswer: 2,
      explanation:
        'BS 7671, the IET Wiring Regulations, is published jointly by the IET and BSI, but it is the Institution of Engineering and Technology (IET) that produces the standard.',
    },
    {
      id: 'hs-q59',
      question: 'What does a yellow triangular safety sign with black symbols indicate?',
      options: ['A mandatory action', 'A warning of a hazard', 'A prohibition', 'A safe condition'],
      correctAnswer: 1,
      explanation:
        'Yellow (or amber) triangular signs with a black border and symbol are warning signs, alerting people to a hazard such as "Danger: electric shock risk".',
    },
    {
      id: 'hs-q60',
      question:
        'What is a typical recommended combined inspection and test interval for Class I portable IT/office equipment in a low-risk office environment?',
      options: ['Every month', 'Every 6 months', 'Every 12–48 months', 'Every 10 years'],
      correctAnswer: 2,
      explanation:
        'HSE guidance bases intervals on risk and environment. For Class I IT and office equipment in a low-risk office, combined inspection and testing is typically recommended in the region of every 1–4 years, with user checks in between.',
    },
    // Adding more questions to go well beyond 100 total
    {
      id: 'hs-q61',
      question: 'What is the purpose of a cable gland where a cable enters an enclosure?',
      options: [
        'To join two cables together electrically',
        'To secure the cable, provide strain relief and maintain the enclosure’s IP rating',
        'To extend the usable length of the cable',
        'To reduce electromagnetic interference',
      ],
      correctAnswer: 1,
      explanation:
        'A cable gland secures the cable where it enters an enclosure, provides mechanical strain relief and helps maintain the enclosure’s ingress protection (and earth continuity for armoured cable).',
    },
    {
      id: 'hs-q62',
      question: 'What is a commonly recommended minimum illuminance for general electrical installation work?',
      options: ['100 lux', '200 lux', '500 lux', '1000 lux'],
      correctAnswer: 2,
      explanation:
        'Guidance such as CIBSE/HSE recommends around 500 lux for general workshop and installation tasks so that work can be carried out accurately and safely; finer detailed work needs higher levels.',
    },
    {
      id: 'hs-q63',
      question: 'Which of the following is NOT a requirement under the Work at Height Regulations?',
      options: [
        'Properly planning and supervising the work',
        'Carrying out a risk assessment',
        'Granting additional annual leave after working at height',
        'Selecting appropriate work equipment',
      ],
      correctAnswer: 2,
      explanation:
        'The Work at Height Regulations require work at height to be properly planned, supervised, risk assessed and carried out with suitable equipment; they say nothing about granting extra leave.',
    },
    {
      id: 'hs-q64',
      question: 'What colour of marker tape or tile is conventionally used to warn of buried electrical cables?',
      options: [
        'Yellow',
        'Red',
        'Blue',
        'Green',
      ],
      correctAnswer: 0,
      explanation:
        'Buried electricity cables are conventionally protected and warned of using yellow tiles or yellow warning tape printed with "Electric cable below"; blue is used for water and yellow/black for gas tape varies by utility.',
    },
    {
      id: 'hs-q65',
      question: 'What is the minimum safe working distance generally advised for an 11kV overhead line that cannot be made dead?',
      options: ['1.5 metres', '3 metres', '6 metres', '9 metres'],
      correctAnswer: 1,
      explanation:
        'For overhead lines above 750V up to 75kV (which includes 11kV), a minimum safe distance of 3 metres is generally advised when the line cannot be switched off.',
    },
    {
      id: 'hs-q66',
      question: 'When carrying out a risk assessment, what is the correct order of steps?',
      options: [
        'Identify hazards, assess the risks, implement controls, then review',
        'Implement controls, identify hazards, assess the risks, then review',
        'Assess the risks, identify hazards, review, then implement controls',
        'Review, implement controls, identify hazards, then assess the risks',
      ],
      correctAnswer: 0,
      explanation:
        'You must first identify the hazards, then evaluate the risks they pose, put suitable controls in place, and finally review the assessment to keep it up to date.',
    },
    {
      id: 'hs-q67',
      question: 'What does the acronym RAMS stand for in health and safety?',
      options: [
        'Risk Assessment Method Statement',
        'Risk And Management System',
        'Reliable Authority Management Safety',
        'Risk Assessment Management Standard',
      ],
      correctAnswer: 0,
      explanation:
        'RAMS stands for Risk Assessment and Method Statement — a combined document that identifies the hazards and sets out the safe step-by-step method for carrying out the work.',
    },
    {
      id: 'hs-q68',
      question:
        'Which of the following is the most appropriate measure to prevent falls when working at height?',
      options: [
        'Providing a fall-arrest harness',
        'Putting up warning signs',
        'Fitting guardrails and toe boards (collective fall prevention)',
        'Scheduling the work for a quieter time',
      ],
      correctAnswer: 2,
      explanation:
        'The Work at Height hierarchy prefers preventing a fall over arresting one. Collective measures such as guardrails and toe boards protect everyone, whereas a harness only protects the individual and arrests rather than prevents the fall.',
    },
    {
      id: 'hs-q69',
      question:
        'On a construction site, what is the recommended reduced low-voltage supply for portable hand tools to limit shock risk?',
      options: ['230V single-phase', '110V centre-tapped to earth (CTE)', '400V three-phase', '50V SELV only'],
      correctAnswer: 1,
      explanation:
        'On construction sites a 110V centre-tapped-to-earth (CTE) supply is standard for portable tools, limiting the voltage to earth to around 55V and so reducing the severity of any electric shock.',
    },
    {
      id: 'hs-q70',
      question: 'What does the first digit of an IP2X rating signify?',
      options: [
        'Protection against solid objects greater than 50mm',
        'Protection against solid objects greater than 12.5mm (such as a finger)',
        'Protection against solid objects greater than 1mm',
        'Full protection against dust ingress',
      ],
      correctAnswer: 1,
      explanation:
        'IP2X provides protection against solid objects greater than 12.5mm, equivalent to keeping a finger from touching hazardous live parts; the "X" means the water-protection digit is unspecified.',
    },
    {
      id: 'hs-q71',
      question: "Which step is NOT part of the 'five steps to risk assessment' approach?",
      options: [
        'Identify the hazards',
        'Decide who might be harmed and how',
        'Purchase employer’s liability insurance',
        'Record your findings and implement them',
      ],
      correctAnswer: 2,
      explanation:
        'The HSE five steps are identify hazards, decide who might be harmed, evaluate the risks and decide on controls, record findings, and review. Buying insurance is a legal duty but not one of the five steps.',
    },
    {
      id: 'hs-q72',
      question: "What is the primary reason for implementing a 'lock out, tag out' procedure?",
      options: [
        'To prevent the loss of isolation keys',
        'To prevent the theft of equipment',
        'To prevent equipment being re-energised or operated while someone is working on it',
        'To identify which equipment is damaged',
      ],
      correctAnswer: 2,
      explanation:
        'Lock-out/tag-out keeps an energy source isolated and clearly tagged so that machinery or circuits cannot be inadvertently re-energised or started while someone is working on them.',
    },
    {
      id: 'hs-q73',
      question: 'Which of the following is the best definition of a confined space?',
      options: [
        'Any small room or area',
        'A place where only one person can work at a time',
        'A substantially enclosed space with limited entry/exit where a specified risk such as a hazardous atmosphere can arise',
        'Any workspace located below ground level',
      ],
      correctAnswer: 2,
      explanation:
        'Under the Confined Spaces Regulations a confined space is substantially enclosed with restricted entry/exit and a reasonably foreseeable specified risk, such as a hazardous atmosphere, lack of oxygen, or risk of drowning.',
    },
    {
      id: 'hs-q74',
      question: 'Which supply arrangement is generally regarded as safest for portable tools on a construction site?',
      options: [
        '230V single-phase taken directly from the mains',
        '110V centre-tapped-to-earth (CTE) supply',
        '400V three-phase distribution',
        '230V via an RCD-protected extension lead',
      ],
      correctAnswer: 1,
      explanation:
        'A 110V centre-tapped-to-earth supply limits the voltage to earth to about 55V, greatly reducing the severity of an electric shock, which is why it is the preferred system for construction-site portable tools.',
    },
    {
      id: 'hs-q75',
      question: 'Which factor does NOT need to be considered when selecting PPE?',
      options: [
        'The hazards present',
        'The person who will use it',
        'The manufacturer’s brand name',
        'The requirements of the task',
      ],
      correctAnswer: 2,
      explanation:
        'PPE selection must consider the hazard, the wearer (fit, comfort, compatibility) and the task. The brand name is irrelevant provided the equipment meets the required standard and is suitable.',
    },
    {
      id: 'hs-q76',
      question: 'When should a Method Statement be prepared?',
      options: [
        'For every task, however trivial',
        'For tasks involving significant or complex risks',
        'Only when the client specifically requests one',
        'Only for work carried out outdoors',
      ],
      correctAnswer: 1,
      explanation:
        'A method statement is prepared for work with significant or complex risks, to set out the agreed safe system of work; routine low-risk tasks may be managed with a simple risk assessment alone.',
    },
    {
      id: 'hs-q77',
      question: 'What colour is used for prohibition signs?',
      options: ['Yellow', 'Blue', 'Green', 'Red'],
      correctAnswer: 3,
      explanation:
        'Prohibition signs use red — typically a red circle with a diagonal bar over a black symbol — to indicate behaviour that must not take place, such as "No smoking".',
    },
    {
      id: 'hs-q78',
      question:
        'What is the recommended mounting height for socket outlets in domestic properties?',
      options: [
        '150mm from floor level',
        '450mm from floor level',
        '900mm from floor level',
        '1500mm from floor level',
      ],
      correctAnswer: 1,
      explanation:
        'Building Regulations Approved Document M requires accessible switches and socket-outlets in new dwellings to be between 450mm and 1200mm from finished floor level; sockets are commonly mounted at around 450mm.',
    },
    {
      id: 'hs-q79',
      question: 'What does a GFCI (the US term for an RCD) detect?',
      options: ['Overcurrent', 'Overvoltage', 'Earth leakage current', 'Short circuits between line and neutral'],
      correctAnswer: 2,
      explanation:
        'A GFCI/RCD detects an imbalance between the line and neutral currents caused by earth leakage and disconnects the supply; it does not provide overcurrent or short-circuit protection on its own.',
    },
    {
      id: 'hs-q80',
      question: 'What is the first action to take on discovering a fire?',
      options: [
        'Call the fire and rescue service',
        'Attempt to extinguish the fire',
        'Raise the alarm',
        'Leave the building immediately',
      ],
      correctAnswer: 2,
      explanation:
        'Raising the alarm comes first so that everyone can begin to evacuate; the fire service should then be called and only a small fire tackled if it is safe to do so and you are trained.',
    },
    {
      id: 'hs-q81',
      question: 'Under BS 5839-1, what is the typical maximum travel distance a person should have to walk to reach a manual fire alarm call point?',
      options: ['20 metres', '30 metres', '45 metres', '60 metres'],
      correctAnswer: 2,
      explanation:
        'BS 5839-1 recommends manual call points be sited so that the maximum travel distance to reach one does not normally exceed 45 metres (reduced where there are higher-risk occupants or processes).',
    },
    {
      id: 'hs-q82',
      question:
        'What is the preferred method of testing for the presence of voltage during safe isolation?',
      options: [
        'Using a multimeter',
        'Using an approved voltage indicator proved on a known source',
        'Using a homemade test lamp',
        'Using a neon screwdriver',
      ],
      correctAnswer: 1,
      explanation:
        'Safe isolation requires an approved voltage indicator that meets GS38, proved on a known source or proving unit before and after use. Neon screwdrivers and unproven multimeters are not acceptable for proving dead.',
    },
    {
      id: 'hs-q83',
      question: 'What shape are prohibition signs according to the safety sign regulations?',
      options: ['Triangular', 'Circular', 'Square', 'Rectangular'],
      correctAnswer: 1,
      explanation:
        'Prohibition signs are circular (a red circle with a diagonal bar). Warning signs are triangular, while mandatory and safe-condition signs are also typically circular and rectangular respectively in their distinctive colours.',
    },
    {
      id: 'hs-q84',
      question:
        'Which of the following is NOT a requirement of the Construction (Design and Management) Regulations?',
      options: [
        'Appointing a principal designer',
        'Producing a health and safety file',
        'Obtaining the lowest price for materials',
        'Planning, managing and monitoring construction work',
      ],
      correctAnswer: 2,
      explanation:
        'CDM 2015 is concerned with managing health, safety and welfare in construction (appointing duty holders, producing the health and safety file, planning and monitoring the work). It does not address commercial price comparison.',
    },
    {
      id: 'hs-q85',
      question:
        'According to HSE guidance, for what type of work are leaning ladders and stepladders intended?',
      options: [
        'Any work, provided the ladder is long enough',
        'Low-risk, short-duration work of around 30 minutes or less in one position',
        'Only work carried out indoors',
        'Only work below 1 metre in height',
      ],
      correctAnswer: 1,
      explanation:
        'HSE guidance says ladders should only be used for low-risk, short-duration work (a guide of around 30 minutes in one position); for longer or higher-risk work a tower or MEWP is more appropriate.',
    },
    {
      id: 'hs-q86',
      question: 'What is the primary purpose of a rescue plan when working at height?',
      options: [
        'To bring all tools safely back to ground level',
        'To list the emergency telephone numbers',
        'To ensure a casualty suspended in a harness can be recovered quickly to avoid suspension trauma',
        'To document the climbing technique used',
      ],
      correctAnswer: 2,
      explanation:
        'A rescue plan ensures that anyone who falls and is left suspended in a harness can be recovered promptly, because prolonged motionless suspension can cause life-threatening suspension trauma.',
    },
    {
      id: 'hs-q87',
      question: 'What is the primary purpose of emergency escape lighting on an escape route?',
      options: [
        'To provide decorative lighting at night',
        'To illuminate the escape route so people can leave safely if the normal supply fails',
        'To reduce the building’s electricity bill',
        'To highlight advertising and signage',
      ],
      correctAnswer: 1,
      explanation:
        'Emergency escape lighting (to BS 5266) automatically provides illumination of escape routes and exits if the normal lighting supply fails, allowing safe evacuation of the building.',
    },
    {
      id: 'hs-q88',
      question: 'What is the main function of a circuit breaker (MCB)?',
      options: [
        'To detect earth leakage faults',
        'To protect the circuit against overload and short-circuit current',
        'To reduce the supply voltage',
        'To improve the power factor',
      ],
      correctAnswer: 1,
      explanation:
        'An MCB automatically disconnects the circuit on overcurrent — both sustained overload and high short-circuit current — protecting the conductors from overheating. Earth leakage is the role of an RCD.',
    },
    {
      id: 'hs-q89',
      question: 'What is the main reason for installing surge protection devices?',
      options: [
        'To protect against sustained overcurrent',
        'To protect equipment from transient overvoltages caused by lightning or switching',
        'To improve the installation’s energy efficiency',
        'To detect earth leakage faults',
      ],
      correctAnswer: 1,
      explanation:
        'A surge protection device (SPD) diverts transient overvoltages (from lightning or switching) safely to earth, protecting sensitive equipment; it does not provide overcurrent or earth-fault protection.',
    },
    {
      id: 'hs-q90',
      question:
        'To reduce the risk of scalding, what is the recommended maximum temperature for hot water delivered at baths and basins in healthcare premises?',
      options: ['38°C', '41°C', '43°C', '46°C'],
      correctAnswer: 2,
      explanation:
        'HSE guidance (HSG194/Health Technical Memoranda) recommends thermostatic mixing valves limit delivered hot water at baths and basins to a maximum of 43°C (44°C for baths) to prevent scalding of vulnerable people.',
    },
    {
      id: 'hs-q91',
      question: 'What is the main purpose of a risk matrix?',
      options: [
        'To allocate financial resources',
        'To rank risks by combining their likelihood and severity',
        'To determine insurance premiums',
        'To set the project work schedule',
      ],
      correctAnswer: 1,
      explanation:
        'A risk matrix plots likelihood against severity, giving each risk a rating so that the most serious risks can be prioritised for control.',
    },
    {
      id: 'hs-q92',
      question: 'What is the purpose of safety boots with midsole protection?',
      options: [
        'To prevent slips on wet surfaces',
        'To prevent puncture wounds from sharp objects such as nails',
        'To prevent ankle sprains',
        'To insulate the wearer against electric shock',
      ],
      correctAnswer: 1,
      explanation:
        'A midsole (penetration-resistant) plate protects the underside of the foot from puncture wounds caused by stepping on sharp objects such as nails, which is a common construction-site hazard.',
    },
    {
      id: 'hs-q93',
      question: 'Which type of fire detector is most suitable for a kitchen, where cooking would cause frequent false alarms?',
      options: ['Ionisation smoke detector', 'Optical smoke detector', 'Heat detector', 'Aspirating smoke detector'],
      correctAnswer: 2,
      explanation:
        'A heat detector is recommended in kitchens because smoke detectors (ionisation or optical) are prone to false alarms from cooking fumes and steam; heat detectors only respond to a temperature rise.',
    },
    {
      id: 'hs-q94',
      question: "What is the purpose of a 'dynamic risk assessment'?",
      options: [
        'To assess only those risks that change daily',
        'To continually re-assess risks on the spot as conditions and the task change',
        'To assess risks involving moving machinery',
        'To assess risks as a group exercise',
      ],
      correctAnswer: 1,
      explanation:
        'A dynamic risk assessment is the continuous, on-the-spot judgement of changing risks during a task, allowing workers to adapt their controls as the situation develops.',
    },
    {
      id: 'hs-q95',
      question: 'Why must a worker suspended in a harness after a fall be rescued as quickly as possible?',
      options: [
        'To recover the harness before it is damaged',
        'Because prolonged motionless suspension can cause life-threatening suspension trauma within minutes',
        'To avoid the cost of calling the emergency services',
        'Because the anchor point will fail after a few minutes',
      ],
      correctAnswer: 1,
      explanation:
        'Hanging motionless in a harness can cause suspension trauma, where blood pools in the legs and can lead to unconsciousness and death within a short time, so a prompt rescue plan is essential.',
    },
    {
      id: 'hs-q96',
      question: 'What is the first step in a safe isolation procedure?',
      options: [
        'Switch off the supply',
        'Correctly identify the circuit to be worked on',
        'Lock off the supply',
        'Prove the voltage indicator on a known source',
      ],
      correctAnswer: 1,
      explanation:
        'You must first correctly identify the circuit to be isolated; isolating the wrong circuit leaves the intended one live and gives a false sense of safety.',
    },
    // Adding more questions to the pool (continuing from where the file was cut off)
    {
      id: 'hs-q97',
      question: 'What must be done before starting excavation work?',
      options: [
        'Notify the local planning authority',
        'Locate and identify underground services',
        'Check the weather forecast for the week',
        'Install temporary task lighting',
      ],
      correctAnswer: 1,
      explanation:
        'Underground services must be located and identified using service plans and cable-avoidance tools before excavation, to prevent striking buried electricity, gas, water or telecoms apparatus.',
    },
    {
      id: 'hs-q98',
      question: 'What does a yellow triangular warning sign indicate?',
      options: ['A prohibition', 'A mandatory action', 'A warning of a hazard', 'A safe condition'],
      correctAnswer: 2,
      explanation:
        'A yellow triangle with a black border and symbol is a warning sign, alerting people to a hazard such as a slippery surface or electrical danger.',
    },
    {
      id: 'hs-q99',
      question:
        'Who should carry out a basic user check of portable electrical equipment, and how often?',
      options: [
        'A qualified electrician, annually',
        'A PAT-testing contractor, monthly',
        'The manager, weekly',
        'The user, before each use',
      ],
      correctAnswer: 3,
      explanation:
        'A simple user check — looking for damage to the lead, plug and casing — should be carried out by the user before each use, in addition to periodic formal visual inspection and combined testing.',
    },
    {
      id: 'hs-q100',
      question: 'What is the primary function of a safe system of work?',
      options: [
        'To document accidents after they happen',
        'To ensure agreed safe procedures are followed when carrying out hazardous work',
        'To satisfy the insurer’s paperwork requirements',
        'To transfer all responsibility onto managers',
      ],
      correctAnswer: 1,
      explanation:
        'A safe system of work is a formal, defined procedure that integrates people, equipment and the environment so that hazardous tasks are carried out in a planned, controlled and safe way.',
    },
    {
      id: 'hs-q101',
      question: "What does the term 'competent person' mean in health and safety?",
      options: [
        'Someone holding a particular qualification, regardless of experience',
        'Someone with the necessary skills, knowledge, experience and training for the task',
        'Anyone with management responsibility',
        'Someone who has worked in the industry for at least 5 years',
      ],
      correctAnswer: 1,
      explanation:
        'A competent person is someone with the right combination of skills, knowledge, experience and training to carry out a task safely and recognise their own limitations.',
    },
    {
      id: 'hs-q102',
      question:
        'What action must be taken when a hazard is identified that cannot be immediately rectified?',
      options: [
        'Ignore it if it appears minor',
        'Leave it for someone else to deal with later',
        'Put temporary controls in place and report it so it can be rectified',
        'Shut down the entire workplace immediately',
      ],
      correctAnswer: 2,
      explanation:
        'If a hazard cannot be removed straight away, you should make it as safe as possible with temporary controls (such as barriers or signs) and report it so a permanent fix can be arranged.',
    },
    {
      id: 'hs-q103',
      question: 'What is the significance of the CE mark on PPE?',
      options: [
        'It indicates the country of manufacture',
        'It declares conformity with the relevant European health, safety and performance requirements',
        'It shows the equipment was tested by the HSE',
        'It indicates the equipment is intended for commercial use only',
      ],
      correctAnswer: 1,
      explanation:
        'A CE mark is the manufacturer’s declaration that the product meets the relevant European requirements; in Great Britain the equivalent UKCA mark is also recognised for many products.',
    },
    {
      id: 'hs-q104',
      question: 'What is the primary purpose of a Method Statement?',
      options: [
        'To record the time spent on each task',
        'To set out, step by step, how the work will be carried out safely',
        'To assign blame in the event of an accident',
        'To calculate the price to charge the client',
      ],
      correctAnswer: 1,
      explanation:
        'A method statement describes the safe, step-by-step way a task will be done, drawing on the controls identified in the risk assessment so everyone follows the same agreed method.',
    },
    {
      id: 'hs-q105',
      question: 'What should you do if you discover damaged electrical equipment?',
      options: [
        'Attempt to repair it yourself on the spot',
        'Remove it from use, label it as faulty and report it',
        'Continue using it but take extra care',
        'Put it back in the store without a label',
      ],
      correctAnswer: 1,
      explanation:
        'Damaged electrical equipment must be taken out of use immediately, clearly labelled as faulty (so no one else uses it) and reported, so it can be repaired by a competent person or disposed of.',
    },
    {
      id: 'hs-q106',
      question: 'Which type of fire extinguisher is identified by a blue colour-coded label or band?',
      options: ['Water', 'Foam', 'Dry powder', 'Carbon dioxide'],
      correctAnswer: 2,
      explanation:
        'Dry powder extinguishers carry a blue colour code. Water is red, foam is cream, CO2 is black and wet chemical is yellow.',
    },
    {
      id: 'hs-q107',
      question: "What does a 'permit-to-work' system primarily control?",
      options: [
        'General access to the worksite',
        'Defined high-risk activities and the conditions under which they may proceed',
        'The working hours of operatives',
        'Payment milestones for the work',
      ],
      correctAnswer: 1,
      explanation:
        'A permit-to-work system controls specific high-risk activities (such as live electrical work, hot work or confined-space entry) by formally setting out the precautions that must be in place before work starts.',
    },
    {
      id: 'hs-q108',
      question:
        'Do the Manual Handling Operations Regulations set a fixed maximum weight above which a load must not be lifted?',
      options: [
        'No fixed limit; an assessment is based on the load, task, individual and environment',
        'Yes, a fixed limit of 10 kg',
        'Yes, a fixed limit of 20 kg',
        'Yes, a fixed limit of 25 kg',
      ],
      correctAnswer: 0,
      explanation:
        'The regulations set no fixed maximum weight. They require a risk assessment considering the load, the task, the individual capability and the environment; the HSE guideline figures are filters, not legal limits.',
    },
    {
      id: 'hs-q109',
      question: 'When using a ladder, what is the recommended maximum working height?',
      options: [
        'As high as the top rung will allow',
        'No higher than the third rung from the top of a leaning ladder',
        'There is no restriction if the ladder is secured',
        'Only the bottom half of the ladder',
      ],
      correctAnswer: 1,
      explanation:
        'You should not stand or work from the top three rungs of a leaning ladder, as you need to maintain a safe handhold and body position; the ladder should also extend about 1 metre above the landing point.',
    },
    {
      id: 'hs-q110',
      question: 'What is the purpose of isolation in electrical work?',
      options: [
        'To speed up the work process',
        'To ensure the equipment cannot be accidentally re-energised while work is in progress',
        'To earth the equipment correctly',
        'To prevent transient power surges',
      ],
      correctAnswer: 1,
      explanation:
        'Isolation disconnects the equipment from every source of supply and, with locking off, ensures it cannot be inadvertently re-energised while someone is working on it.',
    },
    {
      id: 'hs-q111',
      question: 'What is the purpose of safety signs in the workplace?',
      options: [
        'For decoration of the workplace',
        'To give warning, information, prohibition or instruction about health and safety',
        'To meet insurance requirements only',
        'To assign blame in the event of an accident',
      ],
      correctAnswer: 1,
      explanation:
        'Safety signs communicate health and safety messages — warning of hazards, prohibiting actions, requiring actions or showing safe conditions — using standard colours and shapes so they are quickly understood.',
    },
    {
      id: 'hs-q112',
      question:
        'What risk assessment approach suggests identifying hazards, determining who might be harmed, evaluating risks, recording findings, and reviewing regularly?',
      options: [
        'The PUWER method',
        'The HSE five steps to risk assessment',
        'The COSHH assessment',
        'The RIDDOR procedure',
      ],
      correctAnswer: 1,
      explanation:
        'This describes the HSE five steps to risk assessment: identify hazards, decide who might be harmed, evaluate the risks, record findings, and review.',
    },
    {
      id: 'hs-q113',
      question: "What is the definition of a 'near miss'?",
      options: [
        'An incident that resulted in injury',
        'An unplanned event that could have caused injury or damage but happened not to',
        'A hazard that has been identified and recorded',
        'A routine type of safety inspection',
      ],
      correctAnswer: 1,
      explanation:
        'A near miss is an unplanned event that did not cause harm this time but easily could have; reporting near misses helps identify and fix hazards before they cause an accident.',
    },
    {
      id: 'hs-q114',
      question: 'What is the main purpose of earthing electrical equipment?',
      options: [
        'To increase the efficiency of the equipment',
        'To provide a low-impedance path for fault current so the protective device operates',
        'To protect the equipment against water ingress',
        'To satisfy the manufacturer’s warranty',
      ],
      correctAnswer: 1,
      explanation:
        'Earthing connects exposed-conductive-parts to earth so that, in the event of a fault, current flows back to cause the protective device to disconnect quickly, limiting dangerous touch voltages.',
    },
    {
      id: 'hs-q115',
      question: 'Who has the primary responsibility for health and safety in a workplace?',
      options: [
        'The appointed safety officer',
        'The employer',
        'The visiting HSE inspector',
        'Each individual employee',
      ],
      correctAnswer: 1,
      explanation:
        'The Health and Safety at Work etc. Act places the primary duty on the employer to ensure, so far as is reasonably practicable, the health, safety and welfare of employees and others affected by the work.',
    },
    {
      id: 'hs-q116',
      question: 'What does the acronym SSOW stand for?',
      options: [
        'Safe System Of Work',
        'Standard Safety Operation Worksheet',
        'Safe Strategy On Workplace',
        'Standard System Of Working',
      ],
      correctAnswer: 0,
      explanation:
        'SSOW stands for Safe System Of Work — a formal procedure resulting from the systematic examination of a task to identify hazards and define safe methods to control them.',
    },
    {
      id: 'hs-q117',
      question: 'What is the primary purpose of a lockout/tagout procedure?',
      options: [
        'To record who is working on the equipment',
        'To prevent the theft of tools',
        'To prevent the unexpected energising or start-up of machinery during work',
        'To track planned maintenance schedules',
      ],
      correctAnswer: 2,
      explanation:
        'Lockout/tagout secures isolation points with locks and tags so that machinery or circuits cannot be re-energised or started while maintenance or repair work is being carried out.',
    },
    {
      id: 'hs-q118',
      question: 'What type of electrical test should be performed after repairs are completed?',
      options: [
        'A visual inspection only',
        'A voltage check only',
        'Appropriate safety tests followed by a functional test',
        'A resistance measurement only',
      ],
      correctAnswer: 2,
      explanation:
        'After repair, the relevant safety tests (such as continuity, insulation resistance and earth checks) should be carried out and the equipment functionally tested to confirm it works correctly and is safe.',
    },
    {
      id: 'hs-q119',
      question: 'When should personal protective equipment (PPE) be used?',
      options: [
        'As the first line of defence against any hazard',
        'Only when working outdoors',
        'As a last resort, after other control measures have been applied',
        'Only when a supervisor is present',
      ],
      correctAnswer: 2,
      explanation:
        'PPE sits at the bottom of the hierarchy of control and should only be relied upon once elimination, substitution, engineering and administrative controls have been applied as far as reasonably practicable.',
    },
    {
      id: 'hs-q120',
      question: 'When are edge protection measures such as guardrails required on a working platform?',
      options: [
        'Only above 2 metres',
        'Only when a single person is working',
        'Only on external scaffolds',
        'Wherever a person could fall a distance liable to cause injury',
      ],
      correctAnswer: 3,
      explanation:
        'The Work at Height Regulations have no minimum trigger height; suitable measures such as guardrails are required wherever a person could fall a distance liable to cause personal injury.',
    },
    {
      id: 'hs-q121',
      question: 'What does the Health and Safety at Work Act require employers to provide?',
      options: [
        'Full pay during periods of sickness',
        'Transport to and from the workplace',
        'Safe plant and safe systems of work',
        'Guaranteed permanent employment',
      ],
      correctAnswer: 2,
      explanation:
        'The Act requires employers to provide and maintain safe plant and safe systems of work, along with information, instruction, training, supervision and a safe working environment.',
    },
    {
      id: 'hs-q122',
      question: 'What is the purpose of cable detection equipment?',
      options: [
        'To test the quality of cable insulation',
        'To locate buried services before digging',
        'To measure the length of installed cables',
        'To identify the cable manufacturer',
      ],
      correctAnswer: 1,
      explanation:
        'Cable detection (cable-avoidance) tools locate buried electricity, gas and other services so excavation can be carried out without striking them.',
    },
    {
      id: 'hs-q123',
      question: 'What is required before working in a confined space?',
      options: [
        'Only a means of access such as a ladder',
        'A risk assessment, a safe system of work and usually a permit-to-work',
        'Verbal approval from a supervisor alone',
        'Nothing, as confined-space work is always banned',
      ],
      correctAnswer: 1,
      explanation:
        'Confined-space entry requires a thorough risk assessment and a safe system of work (commonly controlled by a permit-to-work), including atmosphere testing, emergency arrangements and rescue provision.',
    },
    {
      id: 'hs-q124',
      question: 'What is the first action to take when you discover a fire?',
      options: [
        'Call your supervisor',
        'Attempt to fight the fire',
        'Raise the alarm',
        'Run to the nearest exit',
      ],
      correctAnswer: 2,
      explanation:
        'Raising the alarm comes first so everyone can evacuate; you then call the fire service and only tackle a small fire if it is safe and you are trained to do so.',
    },
    {
      id: 'hs-q125',
      question: 'Which of these is NOT a recognised category of workplace hazard?',
      options: ['Biological', 'Psychological', 'Recreational', 'Chemical'],
      correctAnswer: 2,
      explanation:
        'Recognised hazard categories include physical, chemical, biological, ergonomic and psychological (psychosocial). "Recreational" is not a hazard category.',
    },
    {
      id: 'hs-q126',
      question:
        'At which daily noise exposure level (the upper exposure action value) must employers provide and ensure the use of hearing protection?',
      options: ['65 dB(A)', '75 dB(A)', '85 dB(A)', '95 dB(A)'],
      correctAnswer: 2,
      explanation:
        'The upper exposure action value under the Control of Noise at Work Regulations is 85 dB(A); above this, hearing protection must be provided and its use enforced. The exposure limit value is 87 dB(A).',
    },
    {
      id: 'hs-q127',
      question: 'What should be checked during a pre-use inspection of a ladder?',
      options: [
        "Only the manufacturer's label",
        'The rungs, stiles, feet and overall condition',
        "Only that it is the correct height for the job",
        "Just the material the ladder is made from",
      ],
      correctAnswer: 1,
      explanation:
        'A pre-use check should look at the stiles (for bends or cracks), the rungs (for damage or contamination), the feet (for wear or damage affecting grip) and the ladder’s general condition.',
    },
    {
      id: 'hs-q128',
      question: 'What is the underlying aim of carrying out a risk assessment?',
      options: [
        'Solely to comply with regulations',
        'To identify hazards and put suitable control measures in place',
        'To establish who is to blame if an accident occurs',
        'To justify reducing the project budget',
      ],
      correctAnswer: 1,
      explanation:
        'The aim of a risk assessment is to identify what could cause harm and decide on reasonable steps (controls) to prevent it, protecting people from injury and ill health.',
    },
    {
      id: 'hs-q129',
      question: 'What does the abbreviation MEWP stand for?',
      options: [
        'Multiple Environment Working Platform',
        'Manual Elevated Work Position',
        'Mobile Elevating Work Platform',
        'Mechanical Equipment for Working at Positions',
      ],
      correctAnswer: 2,
      explanation:
        'MEWP stands for Mobile Elevating Work Platform, such as a scissor lift or cherry picker, used to provide safe temporary access to work at height.',
    },
    {
      id: 'hs-q130',
      question: 'Which type of fire extinguisher should NEVER be used on a fire involving live electrical equipment?',
      options: ['Carbon dioxide', 'Water', 'Dry powder', 'Clean agent'],
      correctAnswer: 1,
      explanation:
        'Water conducts electricity and must never be used on live electrical equipment, as it risks electrocuting the operator. CO2 and dry powder are non-conductive and safe to use.',
    },
    {
      id: 'hs-q131',
      question:
        'What does the Construction (Design and Management) Regulations 2015 primarily focus on?',
      options: [
        'Building aesthetics and architectural design',
        'Payment terms for construction contracts',
        'Health, safety and welfare throughout construction projects',
        'The environmental impact of construction',
      ],
      correctAnswer: 2,
      explanation:
        'CDM 2015 focuses on managing health, safety and welfare across the whole construction project, allocating duties to clients, designers, principal contractors and others.',
    },
    {
      id: 'hs-q132',
      question: 'What is the primary function of an RCD (Residual Current Device)?',
      options: [
        'To protect the circuit against overcurrent',
        'To detect earth leakage current and rapidly disconnect the supply',
        'To improve the power factor',
        'To regulate the supply voltage',
      ],
      correctAnswer: 1,
      explanation:
        'An RCD compares line and neutral currents and disconnects the supply if it detects an imbalance from earth leakage, reducing the risk of fatal electric shock; it does not provide overcurrent protection.',
    },
    {
      id: 'hs-q133',
      question:
        'Where the line voltage and safe distance are unknown, what default exclusion distance does HSE guidance GS6 advise around overhead power lines?',
      options: ['1 metre', '3 metres', '9 metres', '15 metres'],
      correctAnswer: 2,
      explanation:
        'Where the voltage and safe distances are unknown and the line cannot be made dead, HSE guidance GS6 advises a default exclusion zone of at least 9 metres around overhead power lines.',
    },
    {
      id: 'hs-q134',
      question: 'What is the safest way to work near live electrical conductors?',
      options: [
        'Work quickly to minimise the exposure time',
        'Avoid working live; isolate and prove dead first',
        'Use insulated tools while the circuit remains live',
        'Rely on taking extra care',
      ],
      correctAnswer: 1,
      explanation:
        'The Electricity at Work Regulations require work to be carried out dead unless it is unreasonable for it to be so; the safe approach is to isolate, lock off and prove dead before starting.',
    },
    {
      id: 'hs-q135',
      question: 'What is the main purpose of the steel wire armour on an SWA cable?',
      options: [
        'To improve the cable’s appearance',
        'To provide mechanical protection and act as a circuit protective conductor',
        'To increase the cable’s electrical efficiency',
        'To identify the cable manufacturer',
      ],
      correctAnswer: 1,
      explanation:
        'Steel wire armour gives the cable mechanical protection against damage and, when correctly glanded, can serve as the circuit protective conductor (earth) for the cable.',
    },
    {
      id: 'hs-q136',
      question: 'What information must be included on a risk assessment?',
      options: [
        "Only the assessor's name and the date",
        'Just a list of the hazards identified',
        'The hazards, who might be harmed, the controls, any further action needed and a review date',
        'Only the control measures to be used',
      ],
      correctAnswer: 2,
      explanation:
        'A suitable and sufficient risk assessment records the significant hazards, who might be harmed and how, the existing and further control measures needed, and a date for review.',
    },
    {
      id: 'hs-q137',
      question: "What does 'PUWER' stand for?",
      options: [
        'Personal Usage of Work Equipment Regulations',
        'Provision and Use of Work Equipment Regulations',
        'Professional Use of Workplace Equipment Rules',
        'Proper Utilisation of Workplace Equipment Requirements',
      ],
      correctAnswer: 1,
      explanation:
        'PUWER is the Provision and Use of Work Equipment Regulations 1998, which require work equipment to be suitable, maintained, inspected and used only by trained people.',
    },
    {
      id: 'hs-q138',
      question: 'When is a hot work permit typically required?',
      options: [
        'When working in hot weather',
        'When carrying out work that produces heat, flames or sparks',
        'When working on hot water systems',
        'When working overtime in summer',
      ],
      correctAnswer: 1,
      explanation:
        'A hot work permit is required for activities such as welding, grinding, soldering or cutting that generate heat, flames or sparks capable of igniting nearby combustible materials.',
    },
    {
      id: 'hs-q139',
      question: 'What is the purpose of a toolbox talk?',
      options: [
        'To catalogue the tools held on site',
        'To deliver short, focused safety information on a specific topic',
        'To allocate tools to individual workers',
        'To discuss tool maintenance schedules',
      ],
      correctAnswer: 1,
      explanation:
        'A toolbox talk is a brief, focused briefing on a particular health and safety topic relevant to the work, helping to keep safety messages current and reinforce safe behaviour.',
    },
    {
      id: 'hs-q140',
      question: 'What three elements make up the fire triangle?',
      options: [
        'Water, air and earth',
        'Heat, fuel and oxygen',
        'Smoke, flames and heat',
        'Wood, paper and plastic',
      ],
      correctAnswer: 1,
      explanation:
        'The fire triangle is heat (a source of ignition), fuel and oxygen; removing any one of the three will extinguish or prevent the fire.',
    },
    {
      id: 'hs-q141',
      question: 'What is the main purpose of PAT testing?',
      options: [
        'To test the resistance of the fixed wiring',
        'To ensure portable electrical appliances are safe to use',
        'To measure a building’s power consumption',
        'To calibrate electrical test instruments',
      ],
      correctAnswer: 1,
      explanation:
        'Portable Appliance Testing inspects and tests portable equipment (and its lead and plug) to confirm it is safe to use; it does not assess fixed wiring or measure consumption.',
    },
    {
      id: 'hs-q142',
      question: 'What does the acronym COSHH stand for?',
      options: [
        'Control of Safety and Health Hazards',
        'Care of Substances Harmful to Health',
        'Control of Substances Hazardous to Health',
        'Containment of Serious Health Hazards',
      ],
      correctAnswer: 2,
      explanation:
        'COSHH is the Control of Substances Hazardous to Health Regulations, requiring employers to assess and control exposure to substances such as solvents, dusts and fumes.',
    },
    {
      id: 'hs-q143',
      question: "What is the purpose of a 'proving unit'?",
      options: [
        'To calculate the electrical load on a circuit',
        'To confirm a voltage indicator is working correctly',
        'To measure circuit resistance',
        'To isolate a circuit',
      ],
      correctAnswer: 1,
      explanation:
        'A proving unit gives a known voltage so a voltage indicator can be proved working immediately before and after testing a circuit dead, confirming a "dead" reading is genuine.',
    },
    {
      id: 'hs-q144',
      question: "What does the 'General Principles of Prevention' refer to?",
      options: [
        'A first aid procedure',
        'A hierarchy of risk control measures',
        'A category of personal protective equipment',
        'A system for organising tools',
      ],
      correctAnswer: 1,
      explanation:
        'The General Principles of Prevention set out a hierarchy for controlling risk — starting with avoiding the risk, then evaluating and combating it at source, adapting work to the individual, and using PPE only as a last resort.',
    },
    {
      id: 'hs-q145',
      question:
        "What is the primary responsibility of a 'responsible person' under fire safety legislation?",
      options: [
        'To personally fight any fire that breaks out',
        'To ensure adequate fire safety measures are in place and maintained',
        'To maintain the fire extinguishers only',
        'To call the fire and rescue service',
      ],
      correctAnswer: 1,
      explanation:
        'Under the Regulatory Reform (Fire Safety) Order, the "responsible person" must carry out a fire risk assessment and ensure suitable fire precautions and management measures are in place.',
    },
    {
      id: 'hs-q146',
      question:
        'For a low-hazard workplace with fewer than 25 employees, what is the minimum first-aid provision HSE guidance suggests?',
      options: [
        'No provision is needed',
        'At least an appointed person to take charge of first-aid arrangements',
        'At least two qualified first aiders',
        'At least three qualified first aiders',
      ],
      correctAnswer: 1,
      explanation:
        'HSE guidance suggests that, as a minimum, a low-hazard workplace with fewer than 25 employees should have at least an appointed person to take charge of first-aid arrangements and a suitably stocked first-aid box.',
    },
    {
      id: 'hs-q147',
      question: 'What should you check when examining an extension lead before use?',
      options: [
        'Only the plug top',
        'The cable, plug, socket and overall condition for damage',
        'Only the length of the cable',
        'Only the voltage rating label',
      ],
      correctAnswer: 1,
      explanation:
        'Before use, check the whole extension lead — the plug, the flexible cable and the socket end — for cuts, damage, signs of overheating and secure connections.',
    },
    {
      id: 'hs-q148',
      question: 'What is the recommended angle for a leaning ladder against a structure (the 1-in-4 rule)?',
      options: ['45 degrees', '75 degrees', '85 degrees', '60 degrees'],
      correctAnswer: 1,
      explanation:
        'A leaning ladder should be set at about 75 degrees to the horizontal — the "1 in 4" rule of 1 unit out for every 4 units up — to give a stable, safe working angle.',
    },
    {
      id: 'hs-q149',
      question: 'What is required before excavating near underground services?',
      options: [
        'Begin digging carefully without checking',
        'Only notify the local authority',
        'Locate and identify the services using up-to-date plans and detection equipment',
        'Rely on spotting warning signs as you dig',
      ],
      correctAnswer: 2,
      explanation:
        'Before excavating near buried services you must locate and identify them using current service plans and cable-avoidance tools, then dig carefully by hand near their assumed positions.',
    },
    {
      id: 'hs-q150',
      question: 'What are employers required to provide for electrical safety in the workplace?',
      options: [
        'Only insulated hand tools',
        'Only warning signs',
        'Safe electrical systems and equipment that are properly constructed and maintained',
        'Only rubber gloves for operatives',
      ],
      correctAnswer: 2,
      explanation:
        'The Electricity at Work Regulations require employers to ensure electrical systems are constructed and maintained so as to prevent danger, as well as providing safe working practices.',
    },
    {
      id: 'hs-q151',
      question: 'What is the purpose of equipotential bonding?',
      options: [
        'To increase the conductivity of the supply',
        'To reduce shock risk by keeping conductive parts at substantially the same potential',
        'To improve circuit efficiency',
        'To increase the current rating of conductors',
      ],
      correctAnswer: 1,
      explanation:
        'Equipotential bonding connects conductive parts together so that, under fault conditions, dangerous potential differences between them are minimised, reducing the risk of electric shock.',
    },
    {
      id: 'hs-q152',
      question: 'Which regulation specifically deals with working at height?',
      options: [
        'The Work at Height Regulations 2005',
        'The Health and Safety at Work etc. Act 1974',
        'The Construction (Design and Management) Regulations 2015',
        'The Personal Protective Equipment at Work Regulations 1992',
      ],
      correctAnswer: 0,
      explanation:
        'The Work at Height Regulations 2005 specifically govern work where a person could fall a distance liable to cause injury, requiring it to be planned, supervised and carried out safely.',
    },
    {
      id: 'hs-q153',
      question: 'What is the appropriate first action if you suspect a gas leak?',
      options: [
        'Switch on the lights to see better',
        'Turn off the gas supply at the meter and ventilate the area',
        'Wait for the smell to clear before acting',
        'Search for the leak using a naked flame',
      ],
      correctAnswer: 1,
      explanation:
        'On suspecting a gas leak, turn off the supply at the emergency control valve, ventilate by opening doors and windows, avoid any ignition source (including light switches) and call the gas emergency line.',
    },
    {
      id: 'hs-q154',
      question: 'What is the purpose of a safety data sheet?',
      options: [
        'To record completed safety inspections',
        'To provide information on the hazards and safe handling of a substance',
        'To document workplace accident statistics',
        'To list first-aid procedures only',
      ],
      correctAnswer: 1,
      explanation:
        'A safety data sheet (SDS) gives information about a hazardous substance — its hazards, safe handling, storage, PPE and emergency measures — and supports the COSHH assessment.',
    },
    {
      id: 'hs-q155',
      question: 'What colour is used for mandatory signs according to the safety sign regulations?',
      options: ['Red', 'Blue', 'Green', 'Yellow'],
      correctAnswer: 1,
      explanation:
        'Mandatory signs, which require a specific action such as "Eye protection must be worn", are blue, usually a white symbol on a solid blue circle.',
    },
    {
      id: 'hs-q156',
      question: 'What is the legal duty of employees regarding health and safety?',
      options: [
        'To provide all the safety equipment',
        'To take reasonable care of themselves and others, and co-operate with the employer',
        'To write the organisation’s safety policy',
        'To carry out the formal risk assessments',
      ],
      correctAnswer: 1,
      explanation:
        'Under the Health and Safety at Work etc. Act, employees must take reasonable care of their own and others’ safety and co-operate with their employer on health and safety matters.',
    },
    {
      id: 'hs-q157',
      question: "What is the primary purpose of a 'dynamic risk assessment'?",
      options: [
        'To avoid having to do any paperwork',
        'To continually re-assess changing risks on the spot during a task',
        'To reduce the cost of formal assessments',
        'To replace the written risk assessment entirely',
      ],
      correctAnswer: 1,
      explanation:
        'A dynamic risk assessment complements (it does not replace) the written assessment by allowing workers to judge and respond to changing risks as the task and conditions develop.',
    },
    {
      id: 'hs-q158',
      question:
        'What is a typical recommended combined inspection and test interval for Class II portable equipment used on a construction site?',
      options: ['Daily', 'Monthly', 'Every 3 months', 'Annually'],
      correctAnswer: 2,
      explanation:
        'For the harsh construction environment, HSE guidance suggests frequent checks; combined inspection and testing of portable equipment is typically around every 3 months, with formal visual inspection monthly and user checks before each use.',
    },
    {
      id: 'hs-q159',
      question: 'What is the main function of task lighting in electrical work?',
      options: [
        'To make the work area look professional',
        'To provide adequate illumination so work can be done accurately and safely',
        'To reduce the site’s energy use',
        'To allow work to continue after dark only',
      ],
      correctAnswer: 1,
      explanation:
        'Task lighting provides sufficient, well-directed illumination of the immediate work area, helping the operative see clearly, work accurately and avoid mistakes or injury.',
    },
    {
      id: 'hs-q160',
      question: 'What should always be done before working on electrical equipment?',
      options: [
        'Put on gloves and begin work',
        'Isolate the supply, lock off and prove dead',
        'Switch it off at the socket only',
        'Work quickly to reduce the exposure time',
      ],
      correctAnswer: 1,
      explanation:
        'Before working on electrical equipment you must safely isolate it: disconnect from the supply, lock off the isolation point and prove the circuit dead with an approved voltage indicator.',
    },
  ],
};
