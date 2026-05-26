// Level 3 Module 1: Health and Safety in Building Services Engineering — Question Bank
// 250 supervisor-grade questions covering C&G 2365-03 Unit 201 (Health & Safety refresher),
// layered with C&G 2357 Unit 601 (ELTK01) supervisor depth.
// Coverage: HASAWA s.2/s.3/s.7/s.37, EAWR 1989, RIDDOR 2013 (Schedule 1, F2508), COSHH 2002,
// CDM 2015 (Reg 9/13/15, F10, PCI, H&S file), CAR 2012 (R&D survey, NNLW, duty holder),
// Building Safety Act 2022 (HRRB, golden thread), MHSWR 1999, PUWER 1998, WAHR 2005,
// MHOR 1992, CNWR 2005, CVAWR 2005, Sentencing Council Definitive Guideline 2016,
// FFI fee structure, improvement/prohibition notices, Corporate Manslaughter Act 2007.
// Difficulty mix: ~40% basic, ~45% intermediate, ~15% advanced.
// Updated 2026-04-27: Schema upgraded to QuestionBank with topic field + supervisor-grade extension (Sections 1.9, 1.10).

export interface QuestionBank {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  section: string;
  difficulty: 'basic' | 'intermediate' | 'advanced';
  topic: string;
  module?: string;
}

// Backwards-compatible alias for legacy imports (mixed/questionBank.ts uses Question)
export type Question = QuestionBank;

export const module1Questions: QuestionBank[] = [
  // ============================================
  // Section 1.1: HASAWA 1974 (Questions 1-30)
  // ============================================
  {
    id: 1,
    question: "Under Section 2 of HASAWA 1974, what is the employer's general duty?",
    options: [
      'To enable HSE and local authorities to identify workplace risks and investigate serious accidents',
      'To ensure, so far as is reasonably practicable, the health, safety and welfare of all employees',
      'Evaluating and prioritising risks by plotting likelihood against severity',
      'The employer, or the person in control of the premises where the incident occurred',
    ],
    correctAnswer: 1,
    explanation:
      'Section 2 of HASAWA 1974 places a general duty on employers to ensure, so far as is reasonably practicable, the health, safety and welfare at work of all their employees.',
    section: '1.1',
    topic: 'HASAWA 1974',
    difficulty: 'basic',
  },
  {
    id: 2,
    question: "What does 'so far as is reasonably practicable' mean under HASAWA?",
    options: [
      'The employer must eliminate all risks regardless of cost',
      'The employer only needs to follow manufacturer guidelines',
      'The employer must weigh the risk against the cost, time and effort of removing it',
      'The employer must only comply if specifically requested',
    ],
    correctAnswer: 2,
    explanation:
      "Reasonably practicable means weighing the degree of risk against the cost (in money, time, and trouble) needed to avert it. If disproportion exists, it's not reasonably practicable.",
    section: '1.1',
    topic: 'HASAWA 1974',
    difficulty: 'intermediate',
  },
  {
    id: 3,
    question: 'Under Section 3 of HASAWA, employers have duties to whom?',
    options: [
      'Assess the risks and decide on necessary precautions',
      'Pull pin, Aim at base, Squeeze handle, Sweep side to side',
      'Solvents, chemicals, dusts, fumes, and biological agents',
      'Non-employees who may be affected by the work activities',
    ],
    correctAnswer: 3,
    explanation:
      'Section 3 requires employers to conduct their undertaking in such a way as to ensure, so far as is reasonably practicable, that non-employees are not exposed to risks to their health or safety.',
    section: '1.1',
    topic: 'HASAWA 1974',
    difficulty: 'basic',
  },
  {
    id: 4,
    question: "Which section of HASAWA deals with employees' duties?",
    options: [
      'Section 7',
      'Section 5',
      'Section 2',
      'Section 9',
    ],
    correctAnswer: 0,
    explanation:
      'Section 7 of HASAWA 1974 sets out the duties of employees - to take reasonable care and to cooperate with their employer on health and safety matters.',
    section: '1.1',
    topic: 'HASAWA 1974',
    difficulty: 'intermediate',
  },
  {
    id: 5,
    question: 'What is prohibited under Section 8 of HASAWA?',
    options: [
      'Identify circuit, isolate, secure isolation, prove dead, apply lock-off, work safely',
      'Intentionally or recklessly interfering with or misusing anything provided for health, safety or welfare',
      'Clear warning signs indicating work in progress and prohibition against re-energising',
      'Regularly, with fire drills at least annually and more frequent briefings',
    ],
    correctAnswer: 1,
    explanation:
      'Section 8 makes it an offence to intentionally or recklessly interfere with or misuse anything provided in the interests of health, safety or welfare.',
    section: '1.1',
    topic: 'HASAWA 1974',
    difficulty: 'intermediate',
  },
  {
    id: 6,
    question: 'Under HASAWA, what document must employers with 5 or more employees have?',
    options: [
      'Control of Substances Hazardous to Health',
      'Working space, access, and lighting',
      'Written health and safety policy',
      'The type of hazard posed by the substance',
    ],
    correctAnswer: 2,
    explanation:
      'Employers with 5 or more employees must prepare and revise a written statement of their general health and safety policy and bring it to the attention of employees.',
    section: '1.1',
    topic: 'HASAWA 1974',
    difficulty: 'basic',
  },
  {
    id: 7,
    question: 'What enforcement powers does an HSE inspector have under HASAWA?',
    options: [
      'Stop, reassess, amend the method statement if needed, and brief workers on changes',
      'To ensure articles are safe, tested, and accompanied by adequate information',
      'Only as a last resort when risks cannot be adequately controlled by other means',
      'To issue improvement notices, prohibition notices, and prosecute',
    ],
    correctAnswer: 3,
    explanation:
      'HSE inspectors can issue improvement notices (requiring improvements within a timeframe), prohibition notices (stopping activities immediately), and prosecute for breaches.',
    section: '1.1',
    topic: 'HASAWA 1974',
    difficulty: 'intermediate',
  },
  {
    id: 8,
    question: 'What is the difference between an improvement notice and a prohibition notice?',
    options: [
      'Improvement notices give time to remedy a contravention; prohibition notices stop activities involving serious risk immediately',
      'Suitable precautions shall be taken to prevent danger from charge on exposed metalwork, preferably by earthing',
      'All employers must make a suitable and sufficient assessment of risks to employees and others',
      'Absolute duties must be complied with; qualified duties are subject to \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'reasonably practicable\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'',
    ],
    correctAnswer: 0,
    explanation:
      'Improvement notices require contraventions to be remedied within a specified time. Prohibition notices stop dangerous activities immediately until the risk is removed.',
    section: '1.1',
    topic: 'HASAWA 1974',
    difficulty: 'advanced',
  },
  {
    id: 9,
    question: 'What is the maximum fine for health and safety offences in the Crown Court?',
    options: [
      '£20,000',
      'Unlimited',
      '£50,000',
      '£5,000',
    ],
    correctAnswer: 1,
    explanation:
      'For offences heard in the Crown Court, there is no limit on the fine that can be imposed. Imprisonment is also possible for certain offences.',
    section: '1.1',
    topic: 'HASAWA 1974',
    difficulty: 'basic',
  },
  {
    id: 10,
    question: 'Under HASAWA, who can be held personally liable for health and safety offences?',
    options: [
      'A committee where employers and employee representatives discuss and review health and safety measures',
      'No person shall work on or near live conductors unless unreasonable to dead, reasonable to work live, and suitable precautions taken',
      'Directors, managers, and other officers if the offence was committed with their consent, connivance, or neglect',
      'Equipment must be suitable for the purpose, properly maintained, and used by competent persons',
    ],
    correctAnswer: 2,
    explanation:
      "Section 37 allows prosecution of directors, managers, secretaries or similar officers where the body corporate's offence is attributable to their consent, connivance or neglect.",
    section: '1.1',
    topic: 'HASAWA 1974',
    difficulty: 'advanced',
  },
  {
    id: 11,
    question: 'What information must employers provide to employees under Section 2 of HASAWA?',
    options: [
      'The maximum concentration of an airborne substance averaged over a reference period',
      'All employers, employees, and self-employed persons who work with or near electricity',
      'To ensure control measures protect everyone affected including employees, contractors, and public',
      'Information, instruction, training and supervision necessary for health and safety',
    ],
    correctAnswer: 3,
    explanation:
      'Section 2(2)(c) requires employers to provide information, instruction, training and supervision necessary to ensure health and safety of employees.',
    section: '1.1',
    topic: 'HASAWA 1974',
    difficulty: 'basic',
  },
  {
    id: 12,
    question: 'What does Section 4 of HASAWA cover?',
    options: [
      'Duties of persons concerned with premises to persons other than their employees',
      'Solvents, chemicals, dusts, fumes, and biological agents',
      'Non-employees who may be affected by the work activities',
      'Fire action notices, evacuation routes, assembly points, emergency contacts',
    ],
    correctAnswer: 0,
    explanation:
      'Section 4 places duties on those in control of premises to ensure the premises and plant/substances are safe for non-employees using them.',
    section: '1.1',
    topic: 'HASAWA 1974',
    difficulty: 'intermediate',
  },
  {
    id: 13,
    question: 'Who enforces health and safety law in most electrical contracting workplaces?',
    options: [
      'The type of hazard posed by the substance',
      'The Health and Safety Executive (HSE)',
      'Any amputation including fingers, toes, or limbs',
      'Hand being corroded and surface being attacked',
    ],
    correctAnswer: 1,
    explanation:
      'The HSE enforces health and safety law in most industrial and construction workplaces, including electrical contracting sites.',
    section: '1.1',
    topic: 'HASAWA 1974',
    difficulty: 'basic',
  },
  {
    id: 14,
    question: "What is a 'competent person' under health and safety legislation?",
    options: [
      'When exposure cannot be adequately controlled and specific health conditions can be identified',
      'Clear warning signs indicating work in progress and prohibition against re-energising',
      'A person with sufficient training, knowledge, experience and other qualities to properly assist',
      'Follow strict live working procedures if justified, or postpone work until isolation is possible',
    ],
    correctAnswer: 2,
    explanation:
      'A competent person has sufficient training, experience, knowledge and other qualities to enable them to assist with health and safety measures.',
    section: '1.1',
    topic: 'HASAWA 1974',
    difficulty: 'intermediate',
  },
  {
    id: 15,
    question: 'What must employers consult with employees about under HASAWA?',
    options: [
      'To confirm work is complete, the area is safe, and controls can be removed',
      'A detailed assessment focused on a particular activity or operation',
      'To physically prevent an isolator being switched back on while work is in progress',
      'Measures affecting health and safety, including arrangements for competent assistance',
    ],
    correctAnswer: 3,
    explanation:
      'Employers must consult employees or their representatives on health and safety matters, including measures affecting them and arrangements for competent health and safety assistance.',
    section: '1.1',
    topic: 'HASAWA 1974',
    difficulty: 'intermediate',
  },
  {
    id: 16,
    question:
      'Under HASAWA, what are the duties of manufacturers and suppliers of articles for use at work?',
    options: [
      'To ensure articles are safe, tested, and accompanied by adequate information',
      'Pale, cold clammy skin, rapid weak pulse, nausea, confusion, and anxiety',
      'Hot work, confined space entry, electrical isolation, working at height on roofs',
      'Use it properly, report defects, store it correctly, and not misuse it',
    ],
    correctAnswer: 0,
    explanation:
      'Section 6 requires manufacturers/suppliers to ensure articles and substances are safe, properly tested, and accompanied by adequate information for safe use.',
    section: '1.1',
    topic: 'HASAWA 1974',
    difficulty: 'intermediate',
  },
  {
    id: 17,
    question: 'What is the purpose of a health and safety policy statement?',
    options: [
      "A short, focused safety briefing on a specific topic relevant to the work",
      "To set out the organisation's commitment and arrangements for managing health and safety",
      "The remaining risk after control measures have been implemented",
      "Weather, lighting, temperature, noise, ventilation, and access conditions",
    ],
    correctAnswer: 1,
    explanation:
      "The health and safety policy statement sets out the employer's general approach, commitment and arrangements for managing health and safety in the organisation.",
    section: '1.1',
    topic: 'HASAWA 1974',
    difficulty: 'basic',
  },
  {
    id: 18,
    question: 'What three parts should a health and safety policy contain?',
    options: [
      'Introduction, middle, and conclusion',
      'Risk assessment, method statement, and permit',
      'Statement of intent, organisation, and arrangements',
      'Names, addresses, and phone numbers',
    ],
    correctAnswer: 2,
    explanation:
      'A health and safety policy should contain: (1) Statement of intent - general policy, (2) Organisation - responsibilities, and (3) Arrangements - practical implementation.',
    section: '1.1',
    topic: 'HASAWA 1974',
    difficulty: 'intermediate',
  },
  {
    id: 19,
    question: 'How often should a health and safety policy be reviewed?',
    options: [
      'Continuous assessment of changing risks while work is in progress',
      'Inhalation, skin absorption, ingestion, and injection',
      'Only HSE-licensed contractors holding a current asbestos licence',
      'Regularly and whenever there are significant changes',
    ],
    correctAnswer: 3,
    explanation:
      'The policy should be reviewed regularly (at least annually) and whenever there are significant changes to the business, processes, or legislation.',
    section: '1.1',
    topic: 'HASAWA 1974',
    difficulty: 'basic',
  },
  {
    id: 20,
    question: "What is 'vicarious liability' in health and safety?",
    options: [
      "An employer's liability for acts or omissions of their employees performed in the course of employment",
      "Dust suppression, noise control, waste management, and prevention of pollution",
      "Make the area safe, provide first aid, preserve evidence, and report to RIDDOR",
      "Equipment must be suitable for the purpose, properly maintained, and used by competent persons",
    ],
    correctAnswer: 0,
    explanation:
      'Vicarious liability means employers can be held liable for the negligent acts or omissions of their employees when performed in the course of their employment.',
    section: '1.1',
    topic: 'HASAWA 1974',
    difficulty: 'advanced',
  },
  {
    id: 21,
    question: 'Under HASAWA, what must employees NOT do?',
    options: [
      'To issue improvement notices, prohibition notices, and prosecute',
      'Charge their employer for safety equipment or training',
      'Continuous assessment of changing risks while work is in progress',
      'A safe location where evacuated personnel gather to be accounted for',
    ],
    correctAnswer: 1,
    explanation:
      'Section 9 of HASAWA states that no employer shall charge any employee for anything done or provided to comply with health and safety requirements.',
    section: '1.1',
    topic: 'HASAWA 1974',
    difficulty: 'intermediate',
  },
  {
    id: 22,
    question: "What is the 'hierarchy of control' in health and safety?",
    options: [
      'Identify where work interfaces with others and specify coordination measures',
      'All systems shall be constructed to prevent danger so far as is reasonably practicable',
      'A prioritised approach: eliminate, substitute, engineering controls, administrative controls, PPE',
      'Details of injured person, accident circumstances, location, date/time, nature of injury',
    ],
    correctAnswer: 2,
    explanation:
      'The hierarchy of control prioritises: elimination of hazard, substitution with less hazardous, engineering controls, administrative controls, and PPE as a last resort.',
    section: '1.1',
    topic: 'HASAWA 1974',
    difficulty: 'intermediate',
  },
  {
    id: 23,
    question: "What does 'due diligence' mean in health and safety?",
    options: [
      'Every part of a system shall be protected from excess current',
      'Electrical short circuit or overload causing fire or explosion',
      'Regularly and whenever there are significant changes',
      'Taking all reasonable precautions to prevent harm and demonstrating this',
    ],
    correctAnswer: 3,
    explanation:
      'Due diligence means taking all reasonable precautions to avoid committing an offence and being able to demonstrate this through records and actions.',
    section: '1.1',
    topic: 'HASAWA 1974',
    difficulty: 'advanced',
  },
  {
    id: 24,
    question: 'What is a Safety Representative?',
    options: [
      'An employee appointed by a recognised trade union to represent employees on health and safety matters',
      'That adequate precautions are taken to prevent reconnection during work',
      'Weather, lighting, temperature, noise, ventilation, and access conditions',
      'Finger barriers, insulated tips with maximum 4mm exposed, and HRC fused leads',
    ],
    correctAnswer: 0,
    explanation:
      'A Safety Representative is appointed by a recognised trade union to represent employees in consultations with the employer on health and safety matters.',
    section: '1.1',
    topic: 'HASAWA 1974',
    difficulty: 'intermediate',
  },
  {
    id: 25,
    question: 'What functions can a Safety Representative perform?',
    options: [
      'Action value 2.5 m/s² A(8); limit value 5 m/s² A(8) — over which exposure is prohibited',
      'Investigate hazards, complaints, accidents; inspect workplace; represent employees; receive HSE information',
      'Chemical-resistant gloves, eye protection, and respiratory protection if ventilation is inadequate',
      'All employers must make a suitable and sufficient assessment of risks to employees and others',
    ],
    correctAnswer: 1,
    explanation:
      'Safety Representatives can investigate hazards, complaints, and accidents; inspect the workplace; represent employees in consultations; and receive information from inspectors.',
    section: '1.1',
    topic: 'HASAWA 1974',
    difficulty: 'intermediate',
  },
  {
    id: 26,
    question: 'What is a Health and Safety Committee?',
    options: [
      'Taking all reasonable precautions to prevent harm and demonstrating this',
      'A summary of key points from the method statement communicated to workers before starting',
      'A committee where employers and employee representatives discuss and review health and safety measures',
      'A person with sufficient training, knowledge, experience and other qualities to properly assist',
    ],
    correctAnswer: 2,
    explanation:
      'A Health and Safety Committee is a joint body where employers and employee representatives meet to discuss, review, and improve health and safety measures.',
    section: '1.1',
    topic: 'HASAWA 1974',
    difficulty: 'basic',
  },
  {
    id: 27,
    question: 'When must an employer establish a Health and Safety Committee?',
    options: [
      'Taking all reasonable precautions to prevent harm and demonstrating this',
      'The employer must weigh the risk against the cost, time and effort of removing it',
      'Use it properly, report defects, store it correctly, and not misuse it',
      'When requested in writing by two or more Safety Representatives',
    ],
    correctAnswer: 3,
    explanation:
      'Under the Safety Representatives Regulations 1977, employers must establish a Health and Safety Committee if requested in writing by two or more Safety Representatives.',
    section: '1.1',
    topic: 'HASAWA 1974',
    difficulty: 'advanced',
  },
  {
    id: 28,
    question: "What does the term 'statutory duty' mean?",
    options: [
      'A legal requirement imposed by an Act of Parliament or Regulations',
      'Precautionary statements advising on handling, storage, and emergency response',
      'Weather, lighting, temperature, noise, ventilation, and access conditions',
      'The employer must weigh the risk against the cost, time and effort of removing it',
    ],
    correctAnswer: 0,
    explanation:
      'A statutory duty is a legal requirement imposed by law (Acts of Parliament or Regulations). Failure to comply can result in prosecution.',
    section: '1.1',
    topic: 'HASAWA 1974',
    difficulty: 'basic',
  },
  {
    id: 29,
    question: 'What is an Approved Code of Practice (ACoP)?',
    options: [
      'Training on hazards, safe use, control measures, emergency procedures, and PPE use',
      'Guidance with special legal status - failure to follow can be used as evidence of non-compliance',
      'Duties of persons concerned with premises to persons other than their employees',
      'Stop, reassess the risks, implement additional controls if needed, and update the risk assessment',
    ],
    correctAnswer: 1,
    explanation:
      'An ACoP provides practical guidance on how to comply with the law. While not legally binding, failure to follow an ACoP can be used as evidence of non-compliance.',
    section: '1.1',
    topic: 'HASAWA 1974',
    difficulty: 'intermediate',
  },
  {
    id: 30,
    question: 'What is the difference between absolute and qualified duties under HASAWA?',
    options: [
      "Equipment must be suitable for the purpose, properly maintained, and used by competent persons",
      "Stop, reassess, amend the method statement if needed, and brief workers on changes",
      "Absolute duties must be complied with; qualified duties are subject to 'reasonably practicable'",
      "To enable HSE and local authorities to identify workplace risks and investigate serious accidents",
    ],
    correctAnswer: 2,
    explanation:
      "Absolute duties (using 'shall' or 'must') must be complied with regardless of cost. Qualified duties require compliance 'so far as is reasonably practicable'.",
    section: '1.1',
    topic: 'HASAWA 1974',
    difficulty: 'advanced',
  },

  // ============================================
  // Section 1.2: EAWR 1989 (Questions 31-55)
  // ============================================
  {
    id: 31,
    question: 'What is the full title of EAWR 1989?',
    options: [
      'Electrical Appliances Work Regulations',
      'Electronic and Wiring Regulations',
      'Electrical Assessment and Working Regulations',
      'Electricity at Work Regulations 1989',
    ],
    correctAnswer: 3,
    explanation:
      'EAWR 1989 is the Electricity at Work Regulations 1989, which specifically addresses electrical safety in the workplace.',
    section: '1.2',
    topic: 'EAWR 1989',
    difficulty: 'basic',
  },
  {
    id: 32,
    question: 'What does Regulation 3 of EAWR specify?',
    options: [
      'Duties to comply with regulations to prevent danger and injury from electricity',
      'Incapacity for normal work duties for more than 7 consecutive days (excluding day of accident)',
      'Online via the HSE website, or by phone for fatal and specified injuries',
      'To identify hazards, who might be harmed, evaluate risks, and determine control measures',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 3 imposes duties on employers, employees, and self-employed to comply with the regulations to prevent danger and injury from electricity.',
    section: '1.2',
    topic: 'EAWR 1989',
    difficulty: 'intermediate',
  },
  {
    id: 33,
    question: "Under EAWR, what does 'danger' mean?",
    options: [
      'Action value 2.5 m/s² A(8); limit value 5 m/s² A(8) — over which exposure is prohibited',
      'Risk of injury from electric shock, burns, fire, or explosion arising from electricity',
      'Chemical-resistant gloves, eye protection, and respiratory protection if ventilation is inadequate',
      'The HSE service for receiving RIDDOR reports and providing reporting guidance',
    ],
    correctAnswer: 1,
    explanation:
      "Under EAWR, 'danger' means risk of injury from electric shock, electrical burns, fires of electrical origin, or electric arcing and explosion.",
    section: '1.2',
    topic: 'EAWR 1989',
    difficulty: 'intermediate',
  },
  {
    id: 34,
    question: 'What does Regulation 4 of EAWR require?',
    options: [
      'Unable to perform their normal work duties, even if they can do other work',
      'That adequate precautions are taken to prevent reconnection during work',
      'All systems shall be constructed to prevent danger so far as is reasonably practicable',
      'Description of work, hazards, precautions, isolation details, time limits, authorisation signatures',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 4 requires that all electrical systems shall be constructed and maintained so as to prevent danger, so far as is reasonably practicable.',
    section: '1.2',
    topic: 'EAWR 1989',
    difficulty: 'basic',
  },
  {
    id: 35,
    question: 'What does Regulation 12 of EAWR cover?',
    options: [
      'Safe use of electrical test equipment',
      'Inhalation, skin absorption, ingestion, and injection',
      'The type of hazard posed by the substance',
      'Means for cutting off supply and isolation',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 12 requires that suitable means (including, where appropriate, methods of identifying circuits) are provided for cutting off supply and for isolation.',
    section: '1.2',
    topic: 'EAWR 1989',
    difficulty: 'intermediate',
  },
  {
    id: 36,
    question: 'What does Regulation 13 of EAWR require regarding isolation?',
    options: [
      'That adequate precautions are taken to prevent reconnection during work',
      'When requested in writing by two or more Safety Representatives',
      'A safe location where evacuated personnel gather to be accounted for',
      'Stop, reassess, amend the method statement if needed, and brief workers on changes',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 13 requires that adequate precautions shall be taken to prevent electrical equipment from being electrically charged during work where this could cause danger.',
    section: '1.2',
    topic: 'EAWR 1989',
    difficulty: 'intermediate',
  },
  {
    id: 37,
    question: 'What does Regulation 14 of EAWR state about live working?',
    options: [
      'Report as soon as you become aware the injury meets the criteria, within 15 days of becoming aware',
      'No person shall work on or near live conductors unless unreasonable to dead, reasonable to work live, and suitable precautions taken',
      'Improvement notices give time to remedy a contravention; prohibition notices stop activities involving serious risk immediately',
      'To ensure control measures protect everyone affected including employees, contractors, and public',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 14 prohibits live working unless: (a) unreasonable to make dead, (b) reasonable to work live, and (c) suitable precautions taken to prevent injury.',
    section: '1.2',
    topic: 'EAWR 1989',
    difficulty: 'advanced',
  },
  {
    id: 38,
    question: 'Under EAWR Regulation 16, what standard of competence is required?',
    options: [
      'Identify where work interfaces with others and specify coordination measures',
      'Equipment shall be of sufficient strength and capability for its purpose',
      'Technical knowledge and experience to prevent danger and injury',
      'Solvents, chemicals, dusts, fumes, and biological agents',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 16 requires that no person shall engage in work activity where technical knowledge or experience is necessary unless they possess it or are appropriately supervised.',
    section: '1.2',
    topic: 'EAWR 1989',
    difficulty: 'basic',
  },
  {
    id: 39,
    question:
      'What does EAWR Regulation 5 require for electrical equipment strength and capability?',
    options: [
      'A hazard that a competent person could reasonably predict might occur',
      'A written document describing how work will be carried out safely, step by step',
      'Without delay (immediately) by quickest practicable means',
      'Equipment shall be of sufficient strength and capability for its purpose',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 5 requires that electrical equipment shall be of such construction as to be suitable for its intended use and conditions, with sufficient strength and capability.',
    section: '1.2',
    topic: 'EAWR 1989',
    difficulty: 'basic',
  },
  {
    id: 40,
    question: 'What does Regulation 6 of EAWR require regarding adverse conditions?',
    options: [
      'Equipment must be suitable for adverse or hazardous environments or adequately protected',
      'A short, focused safety briefing on a specific topic relevant to the work',
      'Risk of injury from electric shock, burns, fire, or explosion arising from electricity',
      'Working on electrical systems that have been safely isolated from all sources of supply',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 6 requires electrical equipment exposed to adverse or hazardous environments to be constructed or protected to prevent danger from such exposure.',
    section: '1.2',
    topic: 'EAWR 1989',
    difficulty: 'intermediate',
  },
  {
    id: 41,
    question: 'What does Regulation 7 of EAWR cover?',
    options: [
      'Only if on a private road or part of construction work',
      'Insulation, protection and placing of conductors',
      'Unlimited fine and/or imprisonment for up to 2 years',
      'At least every 14 months, or as specified in COSHH Schedule 4',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 7 requires all conductors to be either suitably insulated and protected, or placed to prevent danger, or both.',
    section: '1.2',
    topic: 'EAWR 1989',
    difficulty: 'intermediate',
  },
  {
    id: 42,
    question: 'What earthing requirements does Regulation 8 of EAWR specify?',
    options: [
      'A document setting out how health and safety will be managed during construction, prepared by the principal contractor (or sole contractor)',
      'Workers must be consulted on health and safety matters including risk assessment',
      'Suitable precautions shall be taken to prevent danger from charge on exposed metalwork, preferably by earthing',
      'Collapse or overturning of lifting equipment, or electrical short circuit causing fire',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 8 requires precautions including earthing or other suitable means to prevent danger arising from a conductor (other than a circuit conductor) becoming charged.',
    section: '1.2',
    topic: 'EAWR 1989',
    difficulty: 'intermediate',
  },
  {
    id: 43,
    question: 'What does Regulation 9 of EAWR require about circuit integrity?',
    options: [
      'The HSE service for receiving RIDDOR reports and providing reporting guidance',
      'Directors, managers, and other officers if the offence was committed with their consent, connivance, or neglect',
      'Specific consideration of communication, emergency procedures, and additional controls needed',
      'Joints and connections must be properly made to be mechanically and electrically sound',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 9 requires that all joints and connections in a system shall be mechanically and electrically suitable for use.',
    section: '1.2',
    topic: 'EAWR 1989',
    difficulty: 'basic',
  },
  {
    id: 44,
    question: 'What protection against excess current does Regulation 10 require?',
    options: [
      'Every part of a system shall be protected from excess current',
      'Yes, if they result from work activity and require hospital treatment',
      'Electric shock, burns, fire, explosion, falls from height, manual handling',
      'Taking all reasonable precautions to prevent harm and demonstrating this',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 10 requires that every part of a system shall be protected from excess current as may be necessary to prevent danger.',
    section: '1.2',
    topic: 'EAWR 1989',
    difficulty: 'basic',
  },
  {
    id: 45,
    question: 'What does Regulation 11 of EAWR require for means of protection?',
    options: [
      'Working on or near live equipment without adequate isolation or precautions — a failure to apply EAWR Reg 14 and proven safe-isolation procedure',
      'Suitable means shall be available for protecting from excess current and for cutting off supply in an emergency',
      'Carpal tunnel syndrome, occupational dermatitis, occupational asthma, and hand-arm vibration syndrome',
      'Duties of persons concerned with premises to persons other than their employees',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 11 requires suitable means readily accessible for protecting from excess current and for cutting off supply in an emergency.',
    section: '1.2',
    topic: 'EAWR 1989',
    difficulty: 'intermediate',
  },
  {
    id: 46,
    question: "What does 'dead working' mean under EAWR?",
    options: [
      'Weather, lighting, temperature, noise, ventilation, and access conditions',
      'To specify actions taken or needed to eliminate or reduce risks',
      'Working on electrical systems that have been safely isolated from all sources of supply',
      'A short, focused safety briefing on a specific topic relevant to the work',
    ],
    correctAnswer: 2,
    explanation:
      'Dead working means working on electrical equipment or systems that have been properly isolated from all sources of electrical supply and proven dead.',
    section: '1.2',
    topic: 'EAWR 1989',
    difficulty: 'basic',
  },
  {
    id: 47,
    question: 'What must be done before starting electrical work under EAWR?',
    options: [
      'Evaluating and prioritising risks by plotting likelihood against severity',
      'A burn or scald covering more than 10% of the body or causing damage to eyes, respiratory system or vital organs',
      'Intentionally or recklessly interfering with or misusing anything provided for health, safety or welfare',
      'Identify the circuit, isolate, secure isolation, prove dead, and apply necessary safeguards',
    ],
    correctAnswer: 3,
    explanation:
      'Before starting work: identify the circuit, isolate from supply, secure the isolation, prove the circuit dead with a voltage indicator, and apply necessary safeguards.',
    section: '1.2',
    topic: 'EAWR 1989',
    difficulty: 'intermediate',
  },
  {
    id: 48,
    question: "According to EAWR, what constitutes a 'system'?",
    options: [
      'An electrical system including source of energy, conductors, and load equipment',
      'A committee where employers and employee representatives discuss and review health and safety measures',
      'A safe location where evacuated personnel gather to be accounted for',
      'The method statement describes how to implement the controls identified in the risk assessment',
    ],
    correctAnswer: 0,
    explanation:
      "Under EAWR, a 'system' means an electrical system in which all the electrical equipment is, or may be, electrically connected to a common source of electrical energy.",
    section: '1.2',
    topic: 'EAWR 1989',
    difficulty: 'intermediate',
  },
  {
    id: 49,
    question: 'Who do the Electricity at Work Regulations apply to?',
    options: [
      'Provide suitable PPE free of charge, ensure it\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s maintained, provide storage, training, and enforce use',
      'All employers, employees, and self-employed persons who work with or near electricity',
      'To ensure, so far as is reasonably practicable, the health, safety and welfare of all employees',
      'The HSE service for receiving RIDDOR reports and providing reporting guidance',
    ],
    correctAnswer: 1,
    explanation:
      'EAWR applies to employers, employees, and self-employed persons in relation to matters within their control regarding work activities where danger may arise from electricity.',
    section: '1.2',
    topic: 'EAWR 1989',
    difficulty: 'basic',
  },
  {
    id: 50,
    question: 'What is the defence available under EAWR for qualified duties?',
    options: [
      'The employer, or the person in control of the premises where the incident occurred',
      'To ensure articles are safe, tested, and accompanied by adequate information',
      'All reasonable steps were taken and all due diligence exercised to avoid the commission of the offence',
      'In appropriate containers, in designated areas, with incompatible substances segregated',
    ],
    correctAnswer: 2,
    explanation:
      "For regulations qualified by 'reasonably practicable', it is a defence to prove all reasonable steps were taken and all due diligence exercised.",
    section: '1.2',
    topic: 'EAWR 1989',
    difficulty: 'advanced',
  },
  {
    id: 51,
    question: "Under EAWR, what voltage is considered 'low voltage'?",
    options: [
      'The employer must weigh the risk against the cost, time and effort of removing it',
      'A risk assessment that covers common activities across multiple similar situations',
      'Non-employees who may be affected by the work activities',
      'Exceeding 50V AC or 120V DC but not exceeding 1000V AC or 1500V DC',
    ],
    correctAnswer: 3,
    explanation:
      'Low voltage means exceeding 50V AC or 120V DC ripple-free but not exceeding 1000V AC or 1500V DC between conductors, or 600V AC or 900V DC to earth.',
    section: '1.2',
    topic: 'EAWR 1989',
    difficulty: 'intermediate',
  },
  {
    id: 52,
    question: 'What test equipment requirements apply under EAWR?',
    options: [
      'Equipment must be suitable for the purpose, properly maintained, and used by competent persons',
      'Investigate hazards, complaints, accidents; inspect workplace; represent employees; receive HSE information',
      'A safe location where evacuated personnel gather to be accounted for',
      'Precautionary statements advising on handling, storage, and emergency response',
    ],
    correctAnswer: 0,
    explanation:
      'Test equipment must be suitable for the purpose, properly constructed and maintained, and used by persons with adequate knowledge and experience.',
    section: '1.2',
    topic: 'EAWR 1989',
    difficulty: 'intermediate',
  },
  {
    id: 53,
    question: 'What does the HSE Guidance Note GS38 cover?',
    options: [
      'Fracture (other than fingers, thumbs, or toes)',
      'Safe use of electrical test equipment',
      'Means for cutting off supply and isolation',
      'CO2 (carbon dioxide) or dry powder',
    ],
    correctAnswer: 1,
    explanation:
      'GS38 provides guidance on the selection, use, and maintenance of electrical test equipment to protect against electric shock.',
    section: '1.2',
    topic: 'EAWR 1989',
    difficulty: 'basic',
  },
  {
    id: 54,
    question: 'According to GS38, what features must test probes have?',
    options: [
      'Level and type of supervision needed, who the supervisor is, and their responsibilities',
      'Ensuring work is planned, supervised, and carried out safely by people with appropriate skills',
      'Finger barriers, insulated tips with maximum 4mm exposed, and HRC fused leads',
      'All employers, employees, and self-employed persons who work with or near electricity',
    ],
    correctAnswer: 2,
    explanation:
      'GS38 specifies probes must have finger barriers, insulated tips with maximum 4mm exposed metal, spring-loaded retractable sheaths, and HRC fused leads.',
    section: '1.2',
    topic: 'EAWR 1989',
    difficulty: 'intermediate',
  },
  {
    id: 55,
    question: 'What does EAWR Regulation 15 cover?',
    options: [
      'The Health and Safety Executive (HSE)',
      'Risk Assessment and Method Statement',
      'Safe use of electrical test equipment',
      'Working space, access, and lighting',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 15 requires adequate working space, means of access, and lighting for all electrical work to be carried out safely.',
    section: '1.2',
    topic: 'EAWR 1989',
    difficulty: 'basic',
  },

  // ============================================
  // Section 1.3: RIDDOR (Questions 56-80)
  // ============================================
  {
    id: 56,
    question: 'What does RIDDOR stand for?',
    options: [
      'Reporting of Injuries, Diseases and Dangerous Occurrences Regulations',
      'Reporting of Industrial Diseases and Dangerous Occurrences Regulations',
      'Recording of Industrial Defects and Damages Official Register',
      'Regulation for Industrial Disease Disclosure and Occurrence Reporting',
    ],
    correctAnswer: 0,
    explanation:
      'RIDDOR stands for the Reporting of Injuries, Diseases and Dangerous Occurrences Regulations, which requires reporting of work-related accidents and incidents.',
    section: '1.3',
    topic: 'RIDDOR 2013',
    difficulty: 'basic',
  },
  {
    id: 57,
    question: 'Under RIDDOR, what is the timeframe for reporting a death or specified injury?',
    options: [
      'Reporting of Injuries, Diseases and Dangerous Occurrences Regulations',
      'Without delay (immediately) by quickest practicable means',
      'Raise the alarm and isolate the power supply if safe to do so',
      'Regularly and whenever there are significant changes',
    ],
    correctAnswer: 1,
    explanation:
      'Deaths and specified injuries must be reported without delay - by quickest practicable means, typically by phone, and followed up with a written report within 10 days.',
    section: '1.3',
    topic: 'RIDDOR 2013',
    difficulty: 'intermediate',
  },
  {
    id: 58,
    question: "Which of the following is a 'specified injury' under RIDDOR?",
    options: [
      'Assess the risks and decide on necessary precautions',
      'Insulation, protection and placing of conductors',
      'Fracture (other than fingers, thumbs, or toes)',
      'CO2 (carbon dioxide) or dry powder',
    ],
    correctAnswer: 2,
    explanation:
      'Specified injuries include fractures (except fingers/thumbs/toes), amputation, permanent loss of sight, crush injuries, burns, and scalping requiring hospital treatment.',
    section: '1.3',
    topic: 'RIDDOR 2013',
    difficulty: 'basic',
  },
  {
    id: 59,
    question: "What constitutes an 'over-7-day incapacitation' under RIDDOR?",
    options: [
      'Joints and connections must be properly made to be mechanically and electrically sound',
      'Actions needed, responsible person, target date, and completion date',
      'Only as a last resort when risks cannot be adequately controlled by other means',
      'Incapacity for normal work duties for more than 7 consecutive days (excluding day of accident)',
    ],
    correctAnswer: 3,
    explanation:
      'Over-7-day incapacitation occurs when an employee is away from work or unable to perform their normal duties for more than 7 consecutive days, not counting the day of the accident.',
    section: '1.3',
    topic: 'RIDDOR 2013',
    difficulty: 'intermediate',
  },
  {
    id: 60,
    question: 'Within what timeframe must an over-7-day incapacitation be reported to HSE?',
    options: [
      'Within 15 days of the accident',
      'Working space, access, and lighting',
      'Electricity at Work Regulations 1989',
      'CO2 (carbon dioxide) or dry powder',
    ],
    correctAnswer: 0,
    explanation:
      'Over-7-day incapacitation injuries must be reported within 15 days of the accident.',
    section: '1.3',
    topic: 'RIDDOR 2013',
    difficulty: 'intermediate',
  },
  {
    id: 61,
    question: 'Which is a reportable dangerous occurrence under RIDDOR?',
    options: [
      'Directors, managers, and other officers if the offence was committed with their consent, connivance, or neglect',
      'Collapse or overturning of lifting equipment, or electrical short circuit causing fire',
      'You could become part of the circuit and also receive a shock',
      'At regular intervals as specified by the manufacturer, typically every 6 months',
    ],
    correctAnswer: 1,
    explanation:
      'Dangerous occurrences include collapse of lifting equipment, electrical short circuits causing fire, failure of pressure vessels, and similar serious incidents with potential for major harm.',
    section: '1.3',
    topic: 'RIDDOR 2013',
    difficulty: 'intermediate',
  },
  {
    id: 62,
    question: 'What is the main purpose of RIDDOR?',
    options: [
      'Use it properly, report defects, store it correctly, and not misuse it',
      'Specify requirements for maintaining a clean, tidy workspace and waste disposal',
      'To enable HSE and local authorities to identify workplace risks and investigate serious accidents',
      'Collapse or overturning of lifting equipment, or electrical short circuit causing fire',
    ],
    correctAnswer: 2,
    explanation:
      'RIDDOR enables enforcing authorities to identify where and how risks arise, investigate serious accidents, and target their efforts to prevent future incidents.',
    section: '1.3',
    topic: 'RIDDOR 2013',
    difficulty: 'basic',
  },
  {
    id: 63,
    question: "Who is the 'responsible person' for RIDDOR reporting?",
    options: [
      'The hazard, level of protection needed, fit, compatibility with other PPE, comfort',
      'Stop, reassess the risks, implement additional controls if needed, and update the risk assessment',
      'Workers must understand the risks, control measures, and their responsibilities',
      'The employer, or the person in control of the premises where the incident occurred',
    ],
    correctAnswer: 3,
    explanation:
      'The responsible person is usually the employer, but can be the person in control of the premises (e.g., landlord) or self-employed person in control of their work.',
    section: '1.3',
    topic: 'RIDDOR 2013',
    difficulty: 'intermediate',
  },
  {
    id: 64,
    question: 'How should RIDDOR reports be submitted?',
    options: [
      'Online via the HSE website, or by phone for fatal and specified injuries',
      'Without delay (immediately) by quickest practicable means',
      'Duties of persons concerned with premises to persons other than their employees',
      'The employer must weigh the risk against the cost, time and effort of removing it',
    ],
    correctAnswer: 0,
    explanation:
      'Reports should be made online at the HSE website. For fatal and specified injuries, telephone reporting is available for immediate notification.',
    section: '1.3',
    topic: 'RIDDOR 2013',
    difficulty: 'basic',
  },
  {
    id: 65,
    question: 'Which occupational diseases are reportable under RIDDOR?',
    options: [
      'Personal exposure records for at least 40 years and health surveillance records, with workers having access to their own records',
      'Carpal tunnel syndrome, occupational dermatitis, occupational asthma, and hand-arm vibration syndrome',
      'Make the area safe, provide first aid, preserve evidence, and report to RIDDOR',
      'Duties to comply with regulations to prevent danger and injury from electricity',
    ],
    correctAnswer: 1,
    explanation:
      'Reportable occupational diseases include carpal tunnel syndrome, certain skin diseases, lung diseases, and hand-arm vibration syndrome when linked to specific work activities.',
    section: '1.3',
    topic: 'RIDDOR 2013',
    difficulty: 'intermediate',
  },
  {
    id: 66,
    question: 'For how long must RIDDOR records be kept?',
    options: [
      'Statement of intent, organisation, and arrangements',
      'Safe use of electrical test equipment',
      'At least 3 years from the date of the incident',
      'Fracture (other than fingers, thumbs, or toes)',
    ],
    correctAnswer: 2,
    explanation:
      'Records of reportable injuries, diseases, and dangerous occurrences must be kept for at least 3 years from the date on which they were made.',
    section: '1.3',
    topic: 'RIDDOR 2013',
    difficulty: 'basic',
  },
  {
    id: 67,
    question: 'What should be recorded in an accident book?',
    options: [
      'Pull pin, Aim at base, Squeeze handle, Sweep side to side',
      'To issue improvement notices, prohibition notices, and prosecute',
      'Statement of intent, organisation, and arrangements',
      'All work-related accidents and injuries, however minor',
    ],
    correctAnswer: 3,
    explanation:
      'All work-related accidents and injuries should be recorded in the accident book, regardless of severity. This provides a record and can help identify patterns.',
    section: '1.3',
    topic: 'RIDDOR 2013',
    difficulty: 'basic',
  },
  {
    id: 68,
    question: 'What is the penalty for failing to report under RIDDOR?',
    options: [
      'Unlimited fine and/or imprisonment for up to 2 years',
      'Specific PPE required for each stage of the work',
      'Statement of intent, organisation, and arrangements',
      'Safe use of electrical test equipment',
    ],
    correctAnswer: 0,
    explanation:
      'Failing to report under RIDDOR is a criminal offence that can result in an unlimited fine and imprisonment for up to 2 years.',
    section: '1.3',
    topic: 'RIDDOR 2013',
    difficulty: 'intermediate',
  },
  {
    id: 69,
    question: 'Do injuries to members of the public need to be reported under RIDDOR?',
    options: [
      'Workers must be consulted on health and safety matters including risk assessment',
      'Yes, if they result from work activity and require hospital treatment',
      'Only if on a private road or part of construction work',
      'Duties to comply with regulations to prevent danger and injury from electricity',
    ],
    correctAnswer: 1,
    explanation:
      'Injuries to non-workers (including members of the public) must be reported if they arise out of work activity and the person is taken directly to hospital for treatment.',
    section: '1.3',
    topic: 'RIDDOR 2013',
    difficulty: 'intermediate',
  },
  {
    id: 70,
    question: "What is a 'reportable gas incident' under RIDDOR?",
    options: [
      'A summary of key points from the method statement communicated to workers before starting',
      'Duties of persons concerned with premises to persons other than their employees',
      'Accidental leakage of gas causing death/injury or posing an immediate risk',
      'A hazard is something with potential to cause harm; risk is the likelihood of harm occurring',
    ],
    correctAnswer: 2,
    explanation:
      'Gas incidents that result in death or injury, or where there was potential for such harm due to accidental leakage, are reportable under RIDDOR.',
    section: '1.3',
    topic: 'RIDDOR 2013',
    difficulty: 'intermediate',
  },
  {
    id: 71,
    question: 'Which electrical incident is reportable as a dangerous occurrence?',
    options: [
      'Continuous assessment of changing risks while work is in progress',
      'To ensure articles are safe, tested, and accompanied by adequate information',
      'All work-related accidents and injuries, however minor',
      'Electrical short circuit or overload causing fire or explosion',
    ],
    correctAnswer: 3,
    explanation:
      'Electrical short circuits or overloads causing fire or explosion are reportable dangerous occurrences under RIDDOR.',
    section: '1.3',
    topic: 'RIDDOR 2013',
    difficulty: 'basic',
  },
  {
    id: 72,
    question: 'What information must a RIDDOR report contain?',
    options: [
      'Details of injured person, accident circumstances, location, date/time, nature of injury',
      'Continuous assessment of changing risks while work is in progress',
      'Using the hierarchy of control: eliminate, substitute, engineer, administrate, PPE',
      'All systems shall be constructed to prevent danger so far as is reasonably practicable',
    ],
    correctAnswer: 0,
    explanation:
      "Reports must include: injured person's details, where and when it happened, a brief description of what happened, and the nature of the injury.",
    section: '1.3',
    topic: 'RIDDOR 2013',
    difficulty: 'intermediate',
  },
  {
    id: 73,
    question: 'Under RIDDOR, amputation of which body parts is a specified injury?',
    options: [
      'Fracture (other than fingers, thumbs, or toes)',
      'Any amputation including fingers, toes, or limbs',
      '\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'Danger\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\' or \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'Warning\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\' indicating the severity of hazard',
      'Statement of intent, organisation, and arrangements',
    ],
    correctAnswer: 1,
    explanation:
      'Amputation of an arm, hand, finger, thumb, leg, foot, or toe is a specified injury that must be reported under RIDDOR.',
    section: '1.3',
    topic: 'RIDDOR 2013',
    difficulty: 'basic',
  },
  {
    id: 74,
    question: 'What happens if an over-7-day injury was not known to be reportable at first?',
    options: [
      'A competent person with knowledge of the work, often involving those who will do the task',
      'All reasonable steps were taken and all due diligence exercised to avoid the commission of the offence',
      'Report as soon as you become aware the injury meets the criteria, within 15 days of becoming aware',
      'Identify the circuit, isolate, secure isolation, prove dead, and apply necessary safeguards',
    ],
    correctAnswer: 2,
    explanation:
      'If an injury is not immediately identifiable as over-7-day, report within 15 days of becoming aware that the absence or incapacity has exceeded 7 days.',
    section: '1.3',
    topic: 'RIDDOR 2013',
    difficulty: 'intermediate',
  },
  {
    id: 75,
    question: 'Are road traffic accidents reportable under RIDDOR?',
    options: [
      'Acute toxicity - can cause death or serious harm with short exposure',
      'Technical knowledge and experience to prevent danger and injury',
      'Insulation, protection and placing of conductors',
      'Only if on a private road or part of construction work',
    ],
    correctAnswer: 3,
    explanation:
      'Road accidents are generally not reportable unless they occur on a private road forming part of the workplace, or as part of construction/maintenance work on public roads.',
    section: '1.3',
    topic: 'RIDDOR 2013',
    difficulty: 'advanced',
  },
  {
    id: 76,
    question: "What does 'incapacitated for normal work' mean under RIDDOR?",
    options: [
      'Unable to perform their normal work duties, even if they can do other work',
      'Identify circuit, isolate, secure isolation, prove dead, apply lock-off, work safely',
      'A person with sufficient training, knowledge, experience and other qualities to properly assist',
      'Non-employees who may be affected by the work activities',
    ],
    correctAnswer: 0,
    explanation:
      'Incapacitated for normal work means the person cannot perform the full range of their normal work duties, even if they attend work or can do restricted duties.',
    section: '1.3',
    topic: 'RIDDOR 2013',
    difficulty: 'intermediate',
  },
  {
    id: 77,
    question: 'Which burn injury is reportable as a specified injury?',
    options: [
      'Specific consideration of communication, emergency procedures, and additional controls needed',
      'A burn or scald covering more than 10% of the body or causing damage to eyes, respiratory system or vital organs',
      'Refuse to start until the client confirms in writing whether ACMs are present in the area you\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'ll disturb, or commissions an appropriate survey',
      'Specify requirements for maintaining a clean, tidy workspace and waste disposal',
    ],
    correctAnswer: 1,
    explanation:
      'Burns or scalds covering more than 10% of the body surface, or causing significant damage to eyes, respiratory system, or vital organs, are specified injuries.',
    section: '1.3',
    topic: 'RIDDOR 2013',
    difficulty: 'intermediate',
  },
  {
    id: 78,
    question: "What is the 'arising out of or in connection with work' test for RIDDOR?",
    options: [
      'Joints and connections must be properly made to be mechanically and electrically sound',
      'Trained authorised persons, HV switching procedures, earthing equipment, additional testing',
      'The injury must be caused by work activity, conditions created by work, or the manner of conducting the work',
      'Workers must be consulted on health and safety matters including risk assessment',
    ],
    correctAnswer: 2,
    explanation:
      'An incident is reportable if it arises from work activity, from the way work is carried out, or from conditions created by the work or premises.',
    section: '1.3',
    topic: 'RIDDOR 2013',
    difficulty: 'advanced',
  },
  {
    id: 79,
    question: "What is the HSE's Incident Contact Centre?",
    options: [
      'Information, instruction, training and supervision necessary for health and safety',
      'A brief verbal review of the method statement at the work location before starting',
      'To ensure control measures protect everyone affected including employees, contractors, and public',
      'The HSE service for receiving RIDDOR reports and providing reporting guidance',
    ],
    correctAnswer: 3,
    explanation:
      'The HSE Incident Contact Centre receives RIDDOR reports and can provide advice on reporting requirements.',
    section: '1.3',
    topic: 'RIDDOR 2013',
    difficulty: 'basic',
  },
  {
    id: 80,
    question: 'What action should be taken immediately after a serious workplace accident?',
    options: [
      'Make the area safe, provide first aid, preserve evidence, and report to RIDDOR',
      'A hazard that a competent person could reasonably predict might occur',
      'Only if trained, it\\\'s safe to do so, you have the right extinguisher, and the fire is small',
      'Ensure the power is off, check for response, call for help, and perform CPR if needed',
    ],
    correctAnswer: 0,
    explanation:
      'After a serious accident: ensure safety of others, provide first aid, preserve the accident scene as evidence, notify the responsible person, and report under RIDDOR.',
    section: '1.3',
    topic: 'RIDDOR 2013',
    difficulty: 'basic',
  },

  // ============================================
  // Section 1.4: COSHH (Questions 81-105)
  // ============================================
  {
    id: 81,
    question: 'What does COSHH stand for?',
    options: [
      'Certification of Safe Handling of Hazards',
      'Control of Substances Hazardous to Health',
      'Code of Safety for Hazardous Handling',
      'Control of Storage for Hazardous Health items',
    ],
    correctAnswer: 1,
    explanation:
      'COSHH stands for the Control of Substances Hazardous to Health Regulations 2002, which requires employers to control exposure to hazardous substances.',
    section: '1.4',
    topic: 'COSHH 2002',
    difficulty: 'basic',
  },
  {
    id: 82,
    question: 'Which of the following is a substance hazardous to health under COSHH?',
    options: [
      'Details of the incident, actions taken, injuries, and lessons learned',
      'Only if on a private road or part of construction work',
      'Solvents, chemicals, dusts, fumes, and biological agents',
      'Specific PPE required for each stage of the work',
    ],
    correctAnswer: 2,
    explanation:
      'COSHH covers substances hazardous to health including chemicals, products containing chemicals, fumes, dusts, vapours, mists, and biological agents.',
    section: '1.4',
    topic: 'COSHH 2002',
    difficulty: 'basic',
  },
  {
    id: 83,
    question: 'What must employers do under COSHH before using hazardous substances?',
    options: [
      'The Health and Safety Executive (HSE)',
      'Specific PPE required for each stage of the work',
      'You could become part of the circuit and also receive a shock',
      'Assess the risks and decide on necessary precautions',
    ],
    correctAnswer: 3,
    explanation:
      'Employers must assess the risks to health from hazardous substances and decide what precautions are needed before work with those substances begins.',
    section: '1.4',
    topic: 'COSHH 2002',
    difficulty: 'intermediate',
  },
  {
    id: 84,
    question: 'What is a Safety Data Sheet (SDS)?',
    options: [
      'A document providing information about a hazardous substance including hazards, handling, and emergency measures',
      'Identify hazards, Decide who might be harmed, Evaluate risks, Record findings, Review',
      'The maximum concentration of an airborne substance averaged over a reference period',
      'Absolute duties must be complied with; qualified duties are subject to \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'reasonably practicable\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'',
    ],
    correctAnswer: 0,
    explanation:
      'An SDS provides comprehensive information about a substance including its hazards, safe handling procedures, storage requirements, and emergency measures.',
    section: '1.4',
    topic: 'COSHH 2002',
    difficulty: 'basic',
  },
  {
    id: 85,
    question: 'What is a Workplace Exposure Limit (WEL)?',
    options: [
      'The remaining risk after control measures have been implemented',
      'The maximum concentration of an airborne substance averaged over a reference period',
      'Clear warning signs indicating work in progress and prohibition against re-energising',
      'You could become part of the circuit and also receive a shock',
    ],
    correctAnswer: 1,
    explanation:
      'A WEL is the maximum concentration of an airborne substance averaged over a reference period (typically 8 hours or 15 minutes) that workers should be exposed to.',
    section: '1.4',
    topic: 'COSHH 2002',
    difficulty: 'intermediate',
  },
  {
    id: 86,
    question: 'Which hazard classification symbol indicates a substance is corrosive?',
    options: [
      'When the employer has 5 or more employees',
      'The Health and Safety Executive (HSE)',
      'Hand being corroded and surface being attacked',
      'Control of Substances Hazardous to Health',
    ],
    correctAnswer: 2,
    explanation:
      'The corrosive symbol shows a hand and surface being attacked by a liquid, indicating the substance can cause severe burns to skin and eyes.',
    section: '1.4',
    topic: 'COSHH 2002',
    difficulty: 'basic',
  },
  {
    id: 87,
    question: 'What does the GHS flame symbol indicate?',
    options: [
      'Hot surface',
      'Fire exit nearby',
      'High temperature required',
      'Flammable substance',
    ],
    correctAnswer: 3,
    explanation:
      'The flame symbol indicates the substance is flammable, meaning it can catch fire easily when exposed to ignition sources.',
    section: '1.4',
    topic: 'COSHH 2002',
    difficulty: 'basic',
  },
  {
    id: 88,
    question: 'What control measures should be considered first under COSHH?',
    options: [
      'Elimination or substitution with a less hazardous substance',
      'Equipment shall be of sufficient strength and capability for its purpose',
      'Likelihood of harm occurring and the severity of consequences',
      'To describe the order of operations ensuring safety at each stage',
    ],
    correctAnswer: 0,
    explanation:
      'Under the hierarchy of control, elimination (not using the substance) or substitution (using a less hazardous alternative) should be considered first.',
    section: '1.4',
    topic: 'COSHH 2002',
    difficulty: 'intermediate',
  },
  {
    id: 89,
    question: 'When must employers provide health surveillance under COSHH?',
    options: [
      'A brief risk assessment carried out immediately before starting a task at the work location',
      'When exposure cannot be adequately controlled and specific health conditions can be identified',
      'Yes, if they result from work activity and require hospital treatment',
      'Reporting of Injuries, Diseases and Dangerous Occurrences Regulations',
    ],
    correctAnswer: 1,
    explanation:
      'Health surveillance is required when exposure to a substance listed in Schedule 6 cannot be adequately controlled and there is a reasonable likelihood of disease or adverse effects.',
    section: '1.4',
    topic: 'COSHH 2002',
    difficulty: 'advanced',
  },
  {
    id: 90,
    question: 'What is Local Exhaust Ventilation (LEV)?',
    options: [
      'To ensure it is working correctly and give confidence the circuit is dead',
      'Follow strict live working procedures if justified, or postpone work until isolation is possible',
      'An engineering control that captures airborne contaminants at source before they spread',
      'A building at least 18 metres high or with at least 7 storeys, containing at least two residential units',
    ],
    correctAnswer: 2,
    explanation:
      'LEV is an engineering control system that captures airborne contaminants (dust, fumes, vapours) at or near the source before they can spread into the workplace.',
    section: '1.4',
    topic: 'COSHH 2002',
    difficulty: 'intermediate',
  },
  {
    id: 91,
    question: 'How often must LEV systems be examined and tested?',
    options: [
      'A written document describing how work will be carried out safely, step by step',
      'To ensure articles are safe, tested, and accompanied by adequate information',
      'Protection against falling objects, punctures, and electrical hazards',
      'At least every 14 months, or as specified in COSHH Schedule 4',
    ],
    correctAnswer: 3,
    explanation:
      'LEV systems must be thoroughly examined and tested at least every 14 months, or more frequently as specified for specific processes in COSHH Schedule 4.',
    section: '1.4',
    topic: 'COSHH 2002',
    difficulty: 'intermediate',
  },
  {
    id: 92,
    question: 'What PPE might be needed when working with solvents?',
    options: [
      'Chemical-resistant gloves, eye protection, and respiratory protection if ventilation is inadequate',
      'Regularly and when there\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s reason to believe it\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s no longer valid, or when work conditions change',
      'A written document describing how work will be carried out safely, step by step',
      'Appropriate to the complexity of the task and identifies significant risks without being overly complicated',
    ],
    correctAnswer: 0,
    explanation:
      'Working with solvents may require chemical-resistant gloves, safety glasses or goggles, and respiratory protection if adequate ventilation cannot be achieved.',
    section: '1.4',
    topic: 'COSHH 2002',
    difficulty: 'basic',
  },
  {
    id: 93,
    question: 'What is the purpose of a COSHH assessment?',
    options: [
      'Collapse or overturning of lifting equipment, or electrical short circuit causing fire',
      'To identify hazards, who might be harmed, evaluate risks, and determine control measures',
      'A burn or scald covering more than 10% of the body or causing damage to eyes, respiratory system or vital organs',
      'Hot work, confined space entry, electrical isolation, working at height on roofs',
    ],
    correctAnswer: 1,
    explanation:
      'A COSHH assessment identifies what hazardous substances are used, who might be exposed, the routes of exposure, evaluates risks, and determines necessary control measures.',
    section: '1.4',
    topic: 'COSHH 2002',
    difficulty: 'intermediate',
  },
  {
    id: 94,
    question: 'What routes can hazardous substances enter the body?',
    options: [
      'When the employer has 5 or more employees',
      'Elimination or substitution with a less hazardous substance',
      'Inhalation, skin absorption, ingestion, and injection',
      'To identify recurring patterns and previously unidentified hazards',
    ],
    correctAnswer: 2,
    explanation:
      'Hazardous substances can enter the body through inhalation (breathing), skin absorption, ingestion (swallowing), and injection (through cuts or punctures).',
    section: '1.4',
    topic: 'COSHH 2002',
    difficulty: 'basic',
  },
  {
    id: 95,
    question: 'What must be recorded for a COSHH assessment?',
    options: [
      'Guidance with special legal status - failure to follow can be used as evidence of non-compliance',
      'Specify requirements for maintaining a clean, tidy workspace and waste disposal',
      'To ensure it is working correctly and give confidence the circuit is dead',
      'Significant findings including hazards identified, who is at risk, control measures, and review date',
    ],
    correctAnswer: 3,
    explanation:
      'COSHH assessments must record significant findings including hazards identified, who might be affected, existing controls, additional measures needed, and review dates.',
    section: '1.4',
    topic: 'COSHH 2002',
    difficulty: 'intermediate',
  },
  {
    id: 96,
    question: 'When should a COSHH assessment be reviewed?',
    options: [
      "Regularly and when there's reason to believe it's no longer valid, or when work conditions change",
      "To ensure, so far as is reasonably practicable, the health, safety and welfare of all employees",
      "A written document describing how work will be carried out safely, step by step",
      "Protection against falling objects, punctures, and electrical hazards",
    ],
    correctAnswer: 0,
    explanation:
      "COSHH assessments should be reviewed regularly and whenever there's reason to believe they're no longer valid, such as after incidents or changes to work processes.",
    section: '1.4',
    topic: 'COSHH 2002',
    difficulty: 'intermediate',
  },
  {
    id: 97,
    question: 'What information does a hazard pictogram convey?',
    options: [
      'Unlimited fine and/or imprisonment for up to 2 years',
      'The type of hazard posed by the substance',
      'Safe use of electrical test equipment',
      'Control of Substances Hazardous to Health',
    ],
    correctAnswer: 1,
    explanation:
      'Hazard pictograms are symbols that quickly convey the type of hazard a substance poses, such as flammable, toxic, corrosive, or environmental hazard.',
    section: '1.4',
    topic: 'COSHH 2002',
    difficulty: 'basic',
  },
  {
    id: 98,
    question: 'What does the skull and crossbones pictogram indicate?',
    options: [
      'The incident energy level and appropriate PPE category required',
      'A hazard that a competent person could reasonably predict might occur',
      'Acute toxicity - can cause death or serious harm with short exposure',
      'Continuous assessment of changing risks while work is in progress',
    ],
    correctAnswer: 2,
    explanation:
      'The skull and crossbones indicates acute toxicity - the substance can cause death or serious harm even with short or one-time exposure.',
    section: '1.4',
    topic: 'COSHH 2002',
    difficulty: 'basic',
  },
  {
    id: 99,
    question: 'What does the exclamation mark pictogram indicate?',
    options: [
      'At least every 14 months, or as specified in COSHH Schedule 4',
      'Training on hazards, safe use, control measures, emergency procedures, and PPE use',
      'Only HSE-licensed contractors holding a current asbestos licence',
      'Lower level hazards including irritant, skin sensitiser, or harmful',
    ],
    correctAnswer: 3,
    explanation:
      'The exclamation mark indicates lower-level hazards such as skin irritation, eye irritation, skin sensitisation, or substances harmful if swallowed.',
    section: '1.4',
    topic: 'COSHH 2002',
    difficulty: 'basic',
  },
  {
    id: 100,
    question: 'What are Signal Words on chemical labels?',
    options: [
      "'Danger' or 'Warning' indicating the severity of hazard",
      "Non-employees who may be affected by the work activities",
      "Charge their employer for safety equipment or training",
      "Pull pin, Aim at base, Squeeze handle, Sweep side to side",
    ],
    correctAnswer: 0,
    explanation:
      "Signal words are 'Danger' (for more severe hazards) or 'Warning' (for less severe hazards) that indicate the relative severity of the hazard.",
    section: '1.4',
    topic: 'COSHH 2002',
    difficulty: 'basic',
  },
  {
    id: 101,
    question: 'What are H-statements on chemical labels?',
    options: [
      'Fracture (other than fingers, thumbs, or toes)',
      'Hazard statements describing the nature of the hazard',
      'When the employer has 5 or more employees',
      'Actions needed, responsible person, target date, and completion date',
    ],
    correctAnswer: 1,
    explanation:
      "H-statements (Hazard statements) are standardised phrases describing the nature of the hazard, such as 'H225: Highly flammable liquid and vapour'.",
    section: '1.4',
    topic: 'COSHH 2002',
    difficulty: 'intermediate',
  },
  {
    id: 102,
    question: 'What are P-statements on chemical labels?',
    options: [
      'Chemical-resistant gloves, eye protection, and respiratory protection if ventilation is inadequate',
      'Only as a last resort when risks cannot be adequately controlled by other means',
      'Precautionary statements advising on handling, storage, and emergency response',
      'The employer must weigh the risk against the cost, time and effort of removing it',
    ],
    correctAnswer: 2,
    explanation:
      "P-statements (Precautionary statements) provide advice on safe handling, storage, disposal, and emergency measures, such as 'P210: Keep away from heat, sparks, open flame'.",
    section: '1.4',
    topic: 'COSHH 2002',
    difficulty: 'intermediate',
  },
  {
    id: 103,
    question: 'How should chemicals be stored under COSHH?',
    options: [
      'Regularly and when there\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s reason to believe it\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s no longer valid, or when work conditions change',
      'The method statement describes how to implement the controls identified in the risk assessment',
      'Equipment shall be of sufficient strength and capability for its purpose',
      'In appropriate containers, in designated areas, with incompatible substances segregated',
    ],
    correctAnswer: 3,
    explanation:
      'Chemicals should be stored in original or appropriate containers, in designated well-ventilated areas, with incompatible substances segregated, and away from ignition sources.',
    section: '1.4',
    topic: 'COSHH 2002',
    difficulty: 'basic',
  },
  {
    id: 104,
    question: 'What information must employers provide to employees about hazardous substances?',
    options: [
      'The risks, precautions, control measures, and results of any monitoring',
      'Stop, reassess, amend the method statement if needed, and brief workers on changes',
      'Electrical short circuit or overload causing fire or explosion',
      'The employer, or the person in control of the premises where the incident occurred',
    ],
    correctAnswer: 0,
    explanation:
      'Employers must provide employees with information about the risks, necessary precautions, control measures in place, and results of any exposure monitoring.',
    section: '1.4',
    topic: 'COSHH 2002',
    difficulty: 'intermediate',
  },
  {
    id: 105,
    question: 'What training must be provided under COSHH?',
    options: [
      'Protection against falling objects, punctures, and electrical hazards',
      'Training on hazards, safe use, control measures, emergency procedures, and PPE use',
      'Hot work, confined space entry, electrical isolation, working at height on roofs',
      'Stop, reassess, amend the method statement if needed, and brief workers on changes',
    ],
    correctAnswer: 1,
    explanation:
      'Employees must be trained on hazards of substances they work with, how to use control measures, proper use of PPE, emergency procedures, and storage requirements.',
    section: '1.4',
    topic: 'COSHH 2002',
    difficulty: 'basic',
  },

  // ============================================
  // Section 1.5: Risk Assessment (Questions 106-135)
  // ============================================
  {
    id: 106,
    question: 'What is the legal requirement for risk assessment?',
    options: [
      'Only as a last resort when risks cannot be adequately controlled by other means',
      'Each person applies their own lock (multi-lock hasp) and keeps their own key',
      'All employers must make a suitable and sufficient assessment of risks to employees and others',
      'A formal documented authorisation for work on or near isolated electrical equipment',
    ],
    correctAnswer: 2,
    explanation:
      'The Management of Health and Safety at Work Regulations 1999 require all employers to make suitable and sufficient assessments of risks to employees and others.',
    section: '1.5',
    topic: 'Risk Assessment',
    difficulty: 'basic',
  },
  {
    id: 107,
    question: 'What are the five steps of risk assessment?',
    options: [
      'Equipment shall be of sufficient strength and capability for its purpose',
      'Taking all reasonable precautions to prevent harm and demonstrating this',
      'Weather, lighting, temperature, noise, ventilation, and access conditions',
      'Identify hazards, Decide who might be harmed, Evaluate risks, Record findings, Review',
    ],
    correctAnswer: 3,
    explanation:
      'The five steps are: (1) Identify hazards, (2) Decide who might be harmed and how, (3) Evaluate risks and decide on precautions, (4) Record findings, (5) Review regularly.',
    section: '1.5',
    topic: 'Risk Assessment',
    difficulty: 'basic',
  },
  {
    id: 108,
    question: 'What is the difference between a hazard and a risk?',
    options: [
      'A hazard is something with potential to cause harm; risk is the likelihood of harm occurring',
      'Include specific emergency actions, evacuation routes, emergency contacts, and first aid arrangements',
      'Equipment must be suitable for adverse or hazardous environments or adequately protected',
      'Electric shock, burns, fire, explosion, falls from height, manual handling',
    ],
    correctAnswer: 0,
    explanation:
      'A hazard is anything with potential to cause harm. Risk is the chance (high, medium, low) that somebody could be harmed by the hazard, along with the severity.',
    section: '1.5',
    topic: 'Risk Assessment',
    difficulty: 'basic',
  },
  {
    id: 109,
    question: 'When must a risk assessment be recorded in writing?',
    options: [
      'Written health and safety policy',
      'When the employer has 5 or more employees',
      'Fracture (other than fingers, thumbs, or toes)',
      'The Health and Safety Executive (HSE)',
    ],
    correctAnswer: 1,
    explanation:
      'Employers with 5 or more employees must record the significant findings of their risk assessments in writing.',
    section: '1.5',
    topic: 'Risk Assessment',
    difficulty: 'basic',
  },
  {
    id: 110,
    question: "What does 'suitable and sufficient' mean for a risk assessment?",
    options: [
      'Dust suppression, noise control, waste management, and prevention of pollution',
      'Equipment must be suitable for adverse or hazardous environments or adequately protected',
      'Appropriate to the complexity of the task and identifies significant risks without being overly complicated',
      'Competent person(s) with knowledge of the work, often involving workers who do the task',
    ],
    correctAnswer: 2,
    explanation:
      'A suitable and sufficient assessment identifies significant risks, is appropriate to the nature and scale of the work, and remains valid for a reasonable time.',
    section: '1.5',
    topic: 'Risk Assessment',
    difficulty: 'intermediate',
  },
  {
    id: 111,
    question: 'Who should be involved in carrying out a risk assessment?',
    options: [
      'Reporting of Injuries, Diseases and Dangerous Occurrences Regulations',
      'To issue improvement notices, prohibition notices, and prosecute',
      'To ensure, so far as is reasonably practicable, the health, safety and welfare of all employees',
      'Competent person(s) with knowledge of the work, often involving workers who do the task',
    ],
    correctAnswer: 3,
    explanation:
      'Risk assessments should be carried out by competent people with knowledge of the work. Involving workers who do the task provides valuable practical insight.',
    section: '1.5',
    topic: 'Risk Assessment',
    difficulty: 'intermediate',
  },
  {
    id: 112,
    question: 'What factors should be considered when evaluating risk?',
    options: [
      'Likelihood of harm occurring and the severity of consequences',
      'Protection against falling objects, punctures, and electrical hazards',
      'Pull pin, Aim at base, Squeeze handle, Sweep side to side',
      'Electrical short circuit or overload causing fire or explosion',
    ],
    correctAnswer: 0,
    explanation:
      'Risk evaluation considers both the likelihood of harm occurring and the potential severity of that harm. Controls should reduce risk to as low as reasonably practicable.',
    section: '1.5',
    topic: 'Risk Assessment',
    difficulty: 'basic',
  },
  {
    id: 113,
    question: "What is a 'dynamic risk assessment'?",
    options: [
      'Make the area safe, provide first aid, preserve evidence, and report to RIDDOR',
      'Continuous assessment of changing risks while work is in progress',
      'For complex, high-risk activities or when required by clients/principal contractors',
      'Use it properly, report defects, store it correctly, and not misuse it',
    ],
    correctAnswer: 1,
    explanation:
      'A dynamic risk assessment is the continuous process of identifying hazards and assessing risks as work progresses, particularly when conditions change unexpectedly.',
    section: '1.5',
    topic: 'Risk Assessment',
    difficulty: 'intermediate',
  },
  {
    id: 114,
    question: "What is a 'generic' risk assessment?",
    options: [
      'Specialised PPE protecting against thermal hazards from electrical arc flash incidents',
      'Absolute duties must be complied with; qualified duties are subject to \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'reasonably practicable\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'',
      'A risk assessment that covers common activities across multiple similar situations',
      'Competent person(s) with knowledge of the work, often involving workers who do the task',
    ],
    correctAnswer: 2,
    explanation:
      'A generic risk assessment covers common activities that remain consistent across different sites or situations, requiring site-specific additions when used.',
    section: '1.5',
    topic: 'Risk Assessment',
    difficulty: 'intermediate',
  },
  {
    id: 115,
    question: 'What hazards should be considered in electrical work risk assessments?',
    options: [
      'All employers, employees, and self-employed persons who work with or near electricity',
      'Without delay (immediately) by quickest practicable means',
      'To ensure articles are safe, tested, and accompanied by adequate information',
      'Electric shock, burns, fire, explosion, falls from height, manual handling',
    ],
    correctAnswer: 3,
    explanation:
      'Electrical work risk assessments should consider electric shock, burns, fire, explosion, falls from height, manual handling, confined spaces, and other relevant hazards.',
    section: '1.5',
    topic: 'Risk Assessment',
    difficulty: 'basic',
  },
  {
    id: 116,
    question: 'How should vulnerable workers be considered in risk assessments?',
    options: [
      'Additional controls may be needed for young workers, pregnant women, or those with disabilities',
      'Make the area safe, provide first aid, preserve evidence, and report to RIDDOR',
      'When there are significant changes, after incidents, or if it\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s no longer valid',
      'The employer must weigh the risk against the cost, time and effort of removing it',
    ],
    correctAnswer: 0,
    explanation:
      'Risk assessments must consider vulnerable workers such as young people, new or expectant mothers, and those with disabilities who may need additional protective measures.',
    section: '1.5',
    topic: 'Risk Assessment',
    difficulty: 'intermediate',
  },
  {
    id: 117,
    question: 'What is a risk matrix used for?',
    options: [
      'To ensure it is working correctly and give confidence the circuit is dead',
      'Evaluating and prioritising risks by plotting likelihood against severity',
      'A written document describing how work will be carried out safely, step by step',
      'A brief risk assessment carried out immediately before starting a task at the work location',
    ],
    correctAnswer: 1,
    explanation:
      'A risk matrix helps evaluate and prioritise risks by plotting the likelihood of occurrence against the severity of consequences to give a risk rating.',
    section: '1.5',
    topic: 'Risk Assessment',
    difficulty: 'basic',
  },
  {
    id: 118,
    question: 'What does ALARP stand for?',
    options: [
      'Always Look At Risk Properly',
      'All Locations Are Risk Prone',
      'As Low As Reasonably Practicable',
      'Assessment Leads to Appropriate Risk Prevention',
    ],
    correctAnswer: 2,
    explanation:
      "ALARP stands for 'As Low As Reasonably Practicable' - the principle that risks should be reduced to the lowest level that is reasonably practicable.",
    section: '1.5',
    topic: 'Risk Assessment',
    difficulty: 'intermediate',
  },
  {
    id: 119,
    question: 'When should a risk assessment be reviewed?',
    options: [
      "Chemical-resistant gloves, eye protection, and respiratory protection if ventilation is inadequate",
      "The maximum concentration of an airborne substance averaged over a reference period",
      "Identify circuit, isolate, secure isolation, prove dead, apply lock-off, work safely",
      "When there are significant changes, after incidents, or if it's no longer valid",
    ],
    correctAnswer: 3,
    explanation:
      "Risk assessments should be reviewed when there are significant changes to work, after accidents or near misses, or when there's reason to believe they're no longer valid.",
    section: '1.5',
    topic: 'Risk Assessment',
    difficulty: 'basic',
  },
  {
    id: 120,
    question: 'What is residual risk?',
    options: [
      'The remaining risk after control measures have been implemented',
      'Online via the HSE website, or by phone for fatal and specified injuries',
      'Hazard statements describing the nature of the hazard',
      'Electrical short circuit or overload causing fire or explosion',
    ],
    correctAnswer: 0,
    explanation:
      'Residual risk is the level of risk that remains after control measures have been implemented. It should be as low as reasonably practicable.',
    section: '1.5',
    topic: 'Risk Assessment',
    difficulty: 'intermediate',
  },
  {
    id: 121,
    question: 'What is the purpose of the control measures section in a risk assessment?',
    options: [
      'Only as a last resort when risks cannot be adequately controlled by other means',
      'To specify actions taken or needed to eliminate or reduce risks',
      'To ensure articles are safe, tested, and accompanied by adequate information',
      'Duties of persons concerned with premises to persons other than their employees',
    ],
    correctAnswer: 1,
    explanation:
      'The control measures section specifies the actions taken or needed to eliminate hazards or reduce risks to an acceptable level.',
    section: '1.5',
    topic: 'Risk Assessment',
    difficulty: 'basic',
  },
  {
    id: 122,
    question: 'Why is it important to identify who might be harmed in a risk assessment?',
    options: [
      'A prioritised approach: eliminate, substitute, engineering controls, administrative controls, PPE',
      'A committee where employers and employee representatives discuss and review health and safety measures',
      'To ensure control measures protect everyone affected including employees, contractors, and public',
      'Competent person(s) with knowledge of the work, often involving workers who do the task',
    ],
    correctAnswer: 2,
    explanation:
      'Identifying who might be harmed ensures control measures adequately protect everyone who could be affected, including employees, contractors, visitors, and the public.',
    section: '1.5',
    topic: 'Risk Assessment',
    difficulty: 'intermediate',
  },
  {
    id: 123,
    question: "What is a 'point of work' risk assessment?",
    options: [
      'A burn or scald covering more than 10% of the body or causing damage to eyes, respiratory system or vital organs',
      'A detailed assessment focused on a particular activity or operation',
      'Equipment shall be of sufficient strength and capability for its purpose',
      'A brief risk assessment carried out immediately before starting a task at the work location',
    ],
    correctAnswer: 3,
    explanation:
      'A point of work risk assessment is a brief check done at the actual location immediately before starting work to identify any site-specific hazards.',
    section: '1.5',
    topic: 'Risk Assessment',
    difficulty: 'intermediate',
  },
  {
    id: 124,
    question: 'What information sources can help identify hazards?',
    options: [
      'Manufacturer instructions, safety data sheets, accident records, industry guidance, and worker input',
      'Equipment must be suitable for adverse or hazardous environments or adequately protected',
      'Evaluating and prioritising risks by plotting likelihood against severity',
      'A risk assessment that covers common activities across multiple similar situations',
    ],
    correctAnswer: 0,
    explanation:
      'Hazard identification can use manufacturer instructions, SDSs, accident records, near-miss reports, industry guidance, HSE publications, and input from workers.',
    section: '1.5',
    topic: 'Risk Assessment',
    difficulty: 'intermediate',
  },
  {
    id: 125,
    question: "What is a 'reasonably foreseeable' hazard?",
    options: [
      'A known voltage source to test voltage indicators work correctly before and after use',
      'A hazard that a competent person could reasonably predict might occur',
      'The risks, precautions, control measures, and results of any monitoring',
      'Duties to comply with regulations to prevent danger and injury from electricity',
    ],
    correctAnswer: 1,
    explanation:
      'A reasonably foreseeable hazard is one that a competent person could predict might occur given the nature of the work and circumstances.',
    section: '1.5',
    topic: 'Risk Assessment',
    difficulty: 'intermediate',
  },
  {
    id: 126,
    question: 'How should control measures be prioritised?',
    options: [
      'A written document describing how work will be carried out safely, step by step',
      'A prioritised approach: eliminate, substitute, engineering controls, administrative controls, PPE',
      'Using the hierarchy of control: eliminate, substitute, engineer, administrate, PPE',
      'An employer\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s liability for acts or omissions of their employees performed in the course of employment',
    ],
    correctAnswer: 2,
    explanation:
      'Control measures should follow the hierarchy: eliminate the hazard, substitute with less hazardous, engineering controls, administrative controls, then PPE as last resort.',
    section: '1.5',
    topic: 'Risk Assessment',
    difficulty: 'basic',
  },
  {
    id: 127,
    question: 'What should a risk assessment action plan include?',
    options: [
      'The employer must weigh the risk against the cost, time and effort of removing it',
      'Non-employees who may be affected by the work activities',
      'All work-related accidents and injuries, however minor',
      'Actions needed, responsible person, target date, and completion date',
    ],
    correctAnswer: 3,
    explanation:
      'An action plan should specify what actions are needed, who is responsible for implementing them, target completion dates, and actual completion dates.',
    section: '1.5',
    topic: 'Risk Assessment',
    difficulty: 'basic',
  },
  {
    id: 128,
    question:
      'What is the significance of reviewing accident and near-miss data in risk assessment?',
    options: [
      'To identify recurring patterns and previously unidentified hazards',
      'Raise the alarm and isolate the power supply if safe to do so',
      'Duties to comply with regulations to prevent danger and injury from electricity',
      'Charge their employer for safety equipment or training',
    ],
    correctAnswer: 0,
    explanation:
      'Reviewing accident and near-miss data helps identify recurring hazards, patterns of incidents, and potential risks that may not have been previously recognised.',
    section: '1.5',
    topic: 'Risk Assessment',
    difficulty: 'intermediate',
  },
  {
    id: 129,
    question: 'What role does consultation play in risk assessment?',
    options: [
      'Elimination or substitution with a less hazardous substance',
      'Workers must be consulted on health and safety matters including risk assessment',
      'The HSE service for receiving RIDDOR reports and providing reporting guidance',
      'Electric shock, burns, fire, explosion, falls from height, manual handling',
    ],
    correctAnswer: 1,
    explanation:
      'Employers must consult workers or their representatives on health and safety matters. Workers often have valuable insight into hazards and practical control measures.',
    section: '1.5',
    topic: 'Risk Assessment',
    difficulty: 'intermediate',
  },
  {
    id: 130,
    question: 'What is task-specific risk assessment?',
    options: [
      'Through briefings, toolbox talks, and making them available at the work location',
      'When requested in writing by two or more Safety Representatives',
      'A detailed assessment focused on a particular activity or operation',
      'Regularly and whenever there are significant changes',
    ],
    correctAnswer: 2,
    explanation:
      'A task-specific risk assessment focuses on the particular hazards and risks associated with a specific activity or operation being carried out.',
    section: '1.5',
    topic: 'Risk Assessment',
    difficulty: 'basic',
  },
  {
    id: 131,
    question: 'What environmental factors should be considered in risk assessments?',
    options: [
      'A hazard is something with potential to cause harm; risk is the likelihood of harm occurring',
      'Regularly, with fire drills at least annually and more frequent briefings',
      'Evaluating and prioritising risks by plotting likelihood against severity',
      'Weather, lighting, temperature, noise, ventilation, and access conditions',
    ],
    correctAnswer: 3,
    explanation:
      'Environmental factors include weather conditions, lighting levels, temperature extremes, noise, ventilation, working at height access, confined spaces, and similar conditions.',
    section: '1.5',
    topic: 'Risk Assessment',
    difficulty: 'intermediate',
  },
  {
    id: 132,
    question: "What is a 'safe system of work'?",
    options: [
      'A formal procedure resulting from systematic examination of work to identify hazards and methods to eliminate or minimise them',
      'All employers must make a suitable and sufficient assessment of risks to employees and others',
      'Equipment needed, inspection requirements, safe use procedures, and any specific limitations',
      'Ensuring work is planned, supervised, and carried out safely by people with appropriate skills',
    ],
    correctAnswer: 0,
    explanation:
      'A safe system of work is a formal procedure based on systematic examination to identify hazards and define methods to eliminate or minimise risks.',
    section: '1.5',
    topic: 'Risk Assessment',
    difficulty: 'intermediate',
  },
  {
    id: 133,
    question: 'How should lone working be addressed in risk assessments?',
    options: [
      'A building at least 18 metres high or with at least 7 storeys, containing at least two residential units',
      'Specific consideration of communication, emergency procedures, and additional controls needed',
      'To ensure, so far as is reasonably practicable, the health, safety and welfare of all employees',
      'The employer must weigh the risk against the cost, time and effort of removing it',
    ],
    correctAnswer: 1,
    explanation:
      'Lone working requires specific assessment of communication means, emergency procedures, supervision arrangements, and any additional controls needed for isolated work.',
    section: '1.5',
    topic: 'Risk Assessment',
    difficulty: 'intermediate',
  },
  {
    id: 134,
    question: 'What training is required regarding risk assessments?',
    options: [
      'Without delay (immediately) by quickest practicable means',
      'Identify the circuit, isolate, secure isolation, prove dead, and apply necessary safeguards',
      'Workers must understand the risks, control measures, and their responsibilities',
      'To issue improvement notices, prohibition notices, and prosecute',
    ],
    correctAnswer: 2,
    explanation:
      'Workers must be trained to understand the risks they face, the control measures in place, how to use them correctly, and their responsibilities.',
    section: '1.5',
    topic: 'Risk Assessment',
    difficulty: 'basic',
  },
  {
    id: 135,
    question: 'What should happen if new hazards are identified during work?',
    options: [
      'Only if trained, it\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s safe to do so, you have the right extinguisher, and the fire is small',
      'Competent person(s) with knowledge of the work, often involving workers who do the task',
      'To ensure, so far as is reasonably practicable, the health, safety and welfare of all employees',
      'Stop, reassess the risks, implement additional controls if needed, and update the risk assessment',
    ],
    correctAnswer: 3,
    explanation:
      'If new hazards are identified, work should stop for reassessment. Additional controls should be implemented if needed and the risk assessment updated.',
    section: '1.5',
    topic: 'Risk Assessment',
    difficulty: 'intermediate',
  },

  // ============================================
  // Section 1.6: Method Statements (Questions 136-160)
  // ============================================
  {
    id: 136,
    question: 'What is a method statement?',
    options: [
      'A written document describing how work will be carried out safely, step by step',
      'Accidental leakage of gas causing death/injury or posing an immediate risk',
      'To confirm work is complete, the area is safe, and controls can be removed',
      'Regularly and when there\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s reason to believe it\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s no longer valid, or when work conditions change',
    ],
    correctAnswer: 0,
    explanation:
      'A method statement (also called safe system of work document) describes in detail how work will be done safely, including the sequence of operations and controls.',
    section: '1.6',
    topic: 'Method Statements',
    difficulty: 'basic',
  },
  {
    id: 137,
    question: 'What is the relationship between risk assessment and method statement?',
    options: [
      'The hazard, level of protection needed, fit, compatibility with other PPE, comfort',
      'The method statement describes how to implement the controls identified in the risk assessment',
      'Accidental leakage of gas causing death/injury or posing an immediate risk',
      'A burn or scald covering more than 10% of the body or causing damage to eyes, respiratory system or vital organs',
    ],
    correctAnswer: 1,
    explanation:
      'A method statement describes how to implement the control measures identified in the risk assessment, providing step-by-step safe working procedures.',
    section: '1.6',
    topic: 'Method Statements',
    difficulty: 'intermediate',
  },
  {
    id: 138,
    question: 'What information should a method statement contain?',
    options: [
      'Extinguish any burning clothing, cool burns with water, cover loosely, treat for shock, get emergency help',
      'A prioritised approach: eliminate, substitute, engineering controls, administrative controls, PPE',
      'Description of work, sequence of operations, equipment, control measures, responsible persons',
      'Duties of persons concerned with premises to persons other than their employees',
    ],
    correctAnswer: 2,
    explanation:
      'Method statements should include work description, sequence of operations, equipment and materials, control measures, responsibilities, and emergency procedures.',
    section: '1.6',
    topic: 'Method Statements',
    difficulty: 'basic',
  },
  {
    id: 139,
    question: 'When is a method statement typically required?',
    options: [
      'Risk of injury from electric shock, burns, fire, or explosion arising from electricity',
      'Each person applies their own lock (multi-lock hasp) and keeps their own key',
      'Specific consideration of communication, emergency procedures, and additional controls needed',
      'For complex, high-risk activities or when required by clients/principal contractors',
    ],
    correctAnswer: 3,
    explanation:
      'Method statements are typically required for complex or high-risk activities, permit-controlled work, or when specified by clients or principal contractors.',
    section: '1.6',
    topic: 'Method Statements',
    difficulty: 'basic',
  },
  {
    id: 140,
    question: 'What does RAMS stand for in construction?',
    options: [
      'Risk Assessment and Method Statement',
      'Risk Assessment Methods Standard',
      'Regulations for All Manufacturing Sites',
      'Records of All Material Supplies',
    ],
    correctAnswer: 0,
    explanation:
      'RAMS stands for Risk Assessment and Method Statement - the combined documentation of hazards, risks, and safe working procedures for a task.',
    section: '1.6',
    topic: 'Method Statements',
    difficulty: 'basic',
  },
  {
    id: 141,
    question: 'Who should prepare method statements?',
    options: [
      'Dust suppression, noise control, waste management, and prevention of pollution',
      'A competent person with knowledge of the work, often involving those who will do the task',
      'The employer, or the person in control of the premises where the incident occurred',
      'A risk assessment that covers common activities across multiple similar situations',
    ],
    correctAnswer: 1,
    explanation:
      'Method statements should be prepared by competent persons with relevant knowledge and experience, ideally involving the workers who will carry out the task.',
    section: '1.6',
    topic: 'Method Statements',
    difficulty: 'intermediate',
  },
  {
    id: 142,
    question: 'How should method statements be communicated to workers?',
    options: [
      'A brief verbal review of the method statement at the work location before starting',
      'Identify circuit, isolate, secure isolation, prove dead, apply lock-off, work safely',
      'Through briefings, toolbox talks, and making them available at the work location',
      'Raise the alarm and isolate the power supply if safe to do so',
    ],
    correctAnswer: 2,
    explanation:
      'Method statements should be communicated through briefings or toolbox talks before work starts and be available at the work location for reference.',
    section: '1.6',
    topic: 'Method Statements',
    difficulty: 'basic',
  },
  {
    id: 143,
    question: 'What is a toolbox talk?',
    options: [
      'Information, instruction, training and supervision necessary for health and safety',
      'Acute toxicity - can cause death or serious harm with short exposure',
      'Yes, if they result from work activity and require hospital treatment',
      'A short, focused safety briefing on a specific topic relevant to the work',
    ],
    correctAnswer: 3,
    explanation:
      'A toolbox talk is a short, focused briefing (typically 5-15 minutes) on a specific health and safety topic relevant to the work being undertaken.',
    section: '1.6',
    topic: 'Method Statements',
    difficulty: 'basic',
  },
  {
    id: 144,
    question: 'What is a permit to work system?',
    options: [
      'A formal system ensuring high-risk work is properly planned, authorised, and controlled',
      'Provide suitable PPE free of charge, ensure it\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s maintained, provide storage, training, and enforce use',
      'An engineering control that captures airborne contaminants at source before they spread',
      'Every part of a system shall be protected from excess current',
    ],
    correctAnswer: 0,
    explanation:
      'A permit to work is a formal documented system that ensures high-risk work is properly planned, all hazards identified, and appropriate controls in place before work starts.',
    section: '1.6',
    topic: 'Method Statements',
    difficulty: 'intermediate',
  },
  {
    id: 145,
    question: 'For which activities might a permit to work be required?',
    options: [
      'A formal system ensuring high-risk work is properly planned, authorised, and controlled',
      'Hot work, confined space entry, electrical isolation, working at height on roofs',
      'Unable to perform their normal work duties, even if they can do other work',
      'The maximum concentration of an airborne substance averaged over a reference period',
    ],
    correctAnswer: 1,
    explanation:
      'Permits to work are typically required for hot work, confined space entry, electrical isolation work, excavations, and work on fragile roofs or at significant height.',
    section: '1.6',
    topic: 'Method Statements',
    difficulty: 'intermediate',
  },
  {
    id: 146,
    question: 'What are the key elements of a permit to work?',
    options: [
      'Accidental leakage of gas causing death/injury or posing an immediate risk',
      'Carpal tunnel syndrome, occupational dermatitis, occupational asthma, and hand-arm vibration syndrome',
      'Description of work, hazards, precautions, isolation details, time limits, authorisation signatures',
      'Investigate hazards, complaints, accidents; inspect workplace; represent employees; receive HSE information',
    ],
    correctAnswer: 2,
    explanation:
      'Key elements include work description, identified hazards, required precautions, isolation/lockout details, time validity, authorisation signatures, and completion sign-off.',
    section: '1.6',
    topic: 'Method Statements',
    difficulty: 'intermediate',
  },
  {
    id: 147,
    question: "What is the purpose of a 'work sequence' in a method statement?",
    options: [
      'Only HSE-licensed contractors holding a current asbestos licence',
      'Precautionary statements advising on handling, storage, and emergency response',
      'Inhalation, skin absorption, ingestion, and injection',
      'To describe the order of operations ensuring safety at each stage',
    ],
    correctAnswer: 3,
    explanation:
      'The work sequence describes the step-by-step order of operations, ensuring hazards are controlled at each stage and work proceeds safely and logically.',
    section: '1.6',
    topic: 'Method Statements',
    difficulty: 'basic',
  },
  {
    id: 148,
    question: 'What PPE requirements should be included in a method statement?',
    options: [
      'Specific PPE required for each stage of the work',
      'Risk Assessment and Method Statement',
      'Without delay (immediately) by quickest practicable means',
      'Non-employees who may be affected by the work activities',
    ],
    correctAnswer: 0,
    explanation:
      'Method statements should specify the PPE required for each stage of the work, ensuring workers are properly protected throughout the task.',
    section: '1.6',
    topic: 'Method Statements',
    difficulty: 'basic',
  },
  {
    id: 149,
    question: 'How should emergency procedures be addressed in method statements?',
    options: [
      'Using the hierarchy of control: eliminate, substitute, engineer, administrate, PPE',
      'Include specific emergency actions, evacuation routes, emergency contacts, and first aid arrangements',
      'To ensure control measures protect everyone affected including employees, contractors, and public',
      'Additional controls may be needed for young workers, pregnant women, or those with disabilities',
    ],
    correctAnswer: 1,
    explanation:
      'Method statements should include specific emergency procedures for the task, including emergency actions, evacuation routes, emergency contacts, and first aid arrangements.',
    section: '1.6',
    topic: 'Method Statements',
    difficulty: 'intermediate',
  },
  {
    id: 150,
    question: 'What supervision requirements should method statements address?',
    options: [
      'Stop, reassess the risks, implement additional controls if needed, and update the risk assessment',
      'Identify the circuit, isolate, secure isolation, prove dead, and apply necessary safeguards',
      'Level and type of supervision needed, who the supervisor is, and their responsibilities',
      'Every part of a system shall be protected from excess current',
    ],
    correctAnswer: 2,
    explanation:
      'Method statements should specify the level of supervision required, identify the supervisor, and define their responsibilities for overseeing safe work.',
    section: '1.6',
    topic: 'Method Statements',
    difficulty: 'intermediate',
  },
  {
    id: 151,
    question: "What is a 'point of work briefing'?",
    options: [
      'Using the hierarchy of control: eliminate, substitute, engineer, administrate, PPE',
      'Online via the HSE website, or by phone for fatal and specified injuries',
      'To ensure articles are safe, tested, and accompanied by adequate information',
      'A brief verbal review of the method statement at the work location before starting',
    ],
    correctAnswer: 3,
    explanation:
      'A point of work briefing is a short verbal review of the method statement and risk assessment at the work location immediately before starting the task.',
    section: '1.6',
    topic: 'Method Statements',
    difficulty: 'basic',
  },
  {
    id: 152,
    question: 'How should changes to planned work be handled?',
    options: [
      'Stop, reassess, amend the method statement if needed, and brief workers on changes',
      'Measures affecting health and safety, including arrangements for competent assistance',
      'Safety glasses or goggles rated for impact and potentially arc flash',
      'Competent person(s) with knowledge of the work, often involving workers who do the task',
    ],
    correctAnswer: 0,
    explanation:
      'Changes should trigger a stop to reassess risks. The method statement should be amended if needed and workers briefed on any changes before proceeding.',
    section: '1.6',
    topic: 'Method Statements',
    difficulty: 'intermediate',
  },
  {
    id: 153,
    question: "What is the role of the 'competent person' in method statements?",
    options: [
      'A written document describing how work will be carried out safely, step by step',
      'Ensuring work is planned, supervised, and carried out safely by people with appropriate skills',
      'Identify the circuit, isolate, secure isolation, prove dead, and apply necessary safeguards',
      'Exceeding 50V AC or 120V DC but not exceeding 1000V AC or 1500V DC',
    ],
    correctAnswer: 1,
    explanation:
      'The competent person ensures work is properly planned, appropriately supervised, and carried out by people with the necessary skills, knowledge, and experience.',
    section: '1.6',
    topic: 'Method Statements',
    difficulty: 'intermediate',
  },
  {
    id: 154,
    question: 'What information about equipment should be in a method statement?',
    options: [
      'Include specific emergency actions, evacuation routes, emergency contacts, and first aid arrangements',
      'Carpal tunnel syndrome, occupational dermatitis, occupational asthma, and hand-arm vibration syndrome',
      'Equipment needed, inspection requirements, safe use procedures, and any specific limitations',
      'All employers, employees, and self-employed persons who work with or near electricity',
    ],
    correctAnswer: 2,
    explanation:
      'Method statements should specify equipment needed, pre-use inspection requirements, safe operating procedures, weight/load limits, and maintenance requirements.',
    section: '1.6',
    topic: 'Method Statements',
    difficulty: 'basic',
  },
  {
    id: 155,
    question: 'How should interface risks with other trades be addressed?',
    options: [
      'A summary of key points from the method statement communicated to workers before starting',
      'Without delay (immediately) by quickest practicable means',
      'Pull pin, Aim at base, Squeeze handle, Sweep side to side',
      'Identify where work interfaces with others and specify coordination measures',
    ],
    correctAnswer: 3,
    explanation:
      'Method statements should identify where work interfaces with other trades or activities and specify coordination measures to prevent conflicts and maintain safety.',
    section: '1.6',
    topic: 'Method Statements',
    difficulty: 'intermediate',
  },
  {
    id: 156,
    question: 'What records should be kept related to method statements?',
    options: [
      'The method statement, briefing records, permits, completion records, and any amendments',
      'Regularly, with fire drills at least annually and more frequent briefings',
      'That adequate precautions are taken to prevent reconnection during work',
      'Equipment must be suitable for adverse or hazardous environments or adequately protected',
    ],
    correctAnswer: 0,
    explanation:
      'Records should include the method statement, evidence of worker briefings, associated permits, completion/handback records, and documentation of any amendments.',
    section: '1.6',
    topic: 'Method Statements',
    difficulty: 'intermediate',
  },
  {
    id: 157,
    question: "What is a 'task brief' in relation to method statements?",
    options: [
      'A short, focused safety briefing on a specific topic relevant to the work',
      'A summary of key points from the method statement communicated to workers before starting',
      'A hazard is something with potential to cause harm; risk is the likelihood of harm occurring',
      'To issue improvement notices, prohibition notices, and prosecute',
    ],
    correctAnswer: 1,
    explanation:
      'A task brief is a summary of key safety points from the method statement communicated to workers to ensure they understand the safe system of work.',
    section: '1.6',
    topic: 'Method Statements',
    difficulty: 'basic',
  },
  {
    id: 158,
    question: 'How should housekeeping be addressed in method statements?',
    options: [
      'A person with sufficient training, knowledge, experience and other qualities to properly assist',
      'To ensure, so far as is reasonably practicable, the health, safety and welfare of all employees',
      'Specify requirements for maintaining a clean, tidy workspace and waste disposal',
      'Dust suppression, noise control, waste management, and prevention of pollution',
    ],
    correctAnswer: 2,
    explanation:
      'Good housekeeping prevents accidents. Method statements should specify requirements for maintaining a tidy workspace, material storage, and waste disposal.',
    section: '1.6',
    topic: 'Method Statements',
    difficulty: 'basic',
  },
  {
    id: 159,
    question: 'What is the purpose of sign-off at completion in a permit system?',
    options: [
      'Only as a last resort when risks cannot be adequately controlled by other means',
      'All employers, employees, and self-employed persons who work with or near electricity',
      'To set out the organisation\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s commitment and arrangements for managing health and safety',
      'To confirm work is complete, the area is safe, and controls can be removed',
    ],
    correctAnswer: 3,
    explanation:
      'Sign-off confirms work is complete, the area is left in a safe condition, and any isolation or barriers can be removed, allowing normal operations to resume.',
    section: '1.6',
    topic: 'Method Statements',
    difficulty: 'intermediate',
  },
  {
    id: 160,
    question: 'What environmental controls might be specified in a method statement?',
    options: [
      'Dust suppression, noise control, waste management, and prevention of pollution',
      'Follow strict live working procedures if justified, or postpone work until isolation is possible',
      'Joints and connections must be properly made to be mechanically and electrically sound',
      'The employer must weigh the risk against the cost, time and effort of removing it',
    ],
    correctAnswer: 0,
    explanation:
      'Environmental controls might include dust suppression methods, noise barriers, waste segregation and disposal, and measures to prevent water or soil pollution.',
    section: '1.6',
    topic: 'Method Statements',
    difficulty: 'intermediate',
  },

  // ============================================
  // Section 1.7: PPE & Safe Systems (Questions 161-185)
  // ============================================
  {
    id: 161,
    question: 'What does PPE stand for?',
    options: [
      'Professional Performance Evaluation',
      'Personal Protective Equipment',
      'Primary Protection Enforcement',
      'Protective Policy Enforcement',
    ],
    correctAnswer: 1,
    explanation:
      'PPE stands for Personal Protective Equipment - equipment worn or held to protect against risks to health and safety.',
    section: '1.7',
    topic: 'PPE and Safe Systems',
    difficulty: 'basic',
  },
  {
    id: 162,
    question: 'According to PPE regulations, when should PPE be used?',
    options: [
      'Absolute duties must be complied with; qualified duties are subject to \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'reasonably practicable\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'',
      'Include specific emergency actions, evacuation routes, emergency contacts, and first aid arrangements',
      'Only as a last resort when risks cannot be adequately controlled by other means',
      'To identify hazards, who might be harmed, evaluate risks, and determine control measures',
    ],
    correctAnswer: 2,
    explanation:
      'PPE should only be used as a last resort when risks cannot be adequately controlled by other means such as elimination, substitution, or engineering controls.',
    section: '1.7',
    topic: 'PPE and Safe Systems',
    difficulty: 'basic',
  },
  {
    id: 163,
    question: "What are employers' duties regarding PPE?",
    options: [
      "Information, instruction, training and supervision necessary for health and safety",
      "All systems shall be constructed to prevent danger so far as is reasonably practicable",
      "A document providing information about a hazardous substance including hazards, handling, and emergency measures",
      "Provide suitable PPE free of charge, ensure it's maintained, provide storage, training, and enforce use",
    ],
    correctAnswer: 3,
    explanation:
      'Employers must provide suitable PPE free of charge, maintain it properly, provide storage, train workers in its use, and ensure it is worn.',
    section: '1.7',
    topic: 'PPE and Safe Systems',
    difficulty: 'intermediate',
  },
  {
    id: 164,
    question: 'What does the CE/UKCA mark on PPE indicate?',
    options: [
      'Conformity with relevant health and safety standards',
      'Specific PPE required for each stage of the work',
      'Inhalation, skin absorption, ingestion, and injection',
      'Only if on a private road or part of construction work',
    ],
    correctAnswer: 0,
    explanation:
      'CE (or UKCA for UK) marking indicates the PPE meets essential health and safety requirements of relevant regulations and standards.',
    section: '1.7',
    topic: 'PPE and Safe Systems',
    difficulty: 'basic',
  },
  {
    id: 165,
    question: 'What PPE is typically required for electrical work?',
    options: [
      'Guidance with special legal status - failure to follow can be used as evidence of non-compliance',
      'Safety footwear, insulating gloves (if appropriate), eye protection, suitable clothing',
      'Unable to perform their normal work duties, even if they can do other work',
      'Continuous assessment of changing risks while work is in progress',
    ],
    correctAnswer: 1,
    explanation:
      'Electrical work typically requires safety footwear, insulating gloves for live working, eye protection, non-flammable clothing, and sometimes arc flash protection.',
    section: '1.7',
    topic: 'PPE and Safe Systems',
    difficulty: 'basic',
  },
  {
    id: 166,
    question: "What is the employee's duty regarding PPE?",
    options: [
      'The hazard, level of protection needed, fit, compatibility with other PPE, comfort',
      'A risk assessment that covers common activities across multiple similar situations',
      'Use it properly, report defects, store it correctly, and not misuse it',
      'Identify where work interfaces with others and specify coordination measures',
    ],
    correctAnswer: 2,
    explanation:
      'Employees must use PPE properly in accordance with training, report defects or loss, store it correctly, and not intentionally misuse it.',
    section: '1.7',
    topic: 'PPE and Safe Systems',
    difficulty: 'basic',
  },
  {
    id: 167,
    question: 'What factors should be considered when selecting PPE?',
    options: [
      'Hot work, confined space entry, electrical isolation, working at height on roofs',
      'Ensure the power is off, check for response, call for help, and perform CPR if needed',
      'Specify requirements for maintaining a clean, tidy workspace and waste disposal',
      'The hazard, level of protection needed, fit, compatibility with other PPE, comfort',
    ],
    correctAnswer: 3,
    explanation:
      'PPE selection should consider the hazard type and level, required protection level, proper fit for the wearer, compatibility with other PPE, and wearer comfort.',
    section: '1.7',
    topic: 'PPE and Safe Systems',
    difficulty: 'intermediate',
  },
  {
    id: 168,
    question: 'What class of insulating gloves is typically used for low voltage work?',
    options: [
      'Class 00 or Class 0',
      'Class 3 or Class 4',
      'Any leather gloves',
      'No gloves needed',
    ],
    correctAnswer: 0,
    explanation:
      'Class 00 (up to 500V) or Class 0 (up to 1000V) insulating gloves are typically used for low voltage electrical work, tested to relevant standards.',
    section: '1.7',
    topic: 'PPE and Safe Systems',
    difficulty: 'intermediate',
  },
  {
    id: 169,
    question: 'How often should insulating gloves be tested?',
    options: [
      'An engineering control that captures airborne contaminants at source before they spread',
      'At regular intervals as specified by the manufacturer, typically every 6 months',
      'Equipment must be suitable for adverse or hazardous environments or adequately protected',
      'To ensure, so far as is reasonably practicable, the health, safety and welfare of all employees',
    ],
    correctAnswer: 1,
    explanation:
      'Insulating gloves must be tested regularly as specified by the manufacturer (typically every 6 months) and inspected before each use.',
    section: '1.7',
    topic: 'PPE and Safe Systems',
    difficulty: 'intermediate',
  },
  {
    id: 170,
    question: 'What is arc flash protection?',
    options: [
      'Regularly and when there\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s reason to believe it\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s no longer valid, or when work conditions change',
      'A formal system ensuring high-risk work is properly planned, authorised, and controlled',
      'Specialised PPE protecting against thermal hazards from electrical arc flash incidents',
      'Collapse or overturning of lifting equipment, or electrical short circuit causing fire',
    ],
    correctAnswer: 2,
    explanation:
      'Arc flash protection is specialised PPE (clothing, face shields, gloves) designed to protect against the intense heat and light from electrical arc flash incidents.',
    section: '1.7',
    topic: 'PPE and Safe Systems',
    difficulty: 'intermediate',
  },
  {
    id: 171,
    question: 'What does an arc flash risk assessment determine?',
    options: [
      'Yes, if they result from work activity and require hospital treatment',
      'Specific PPE required for each stage of the work',
      'Specify requirements for maintaining a clean, tidy workspace and waste disposal',
      'The incident energy level and appropriate PPE category required',
    ],
    correctAnswer: 3,
    explanation:
      'Arc flash risk assessment calculates the potential incident energy (cal/cm²) to determine the appropriate arc-rated PPE category for worker protection.',
    section: '1.7',
    topic: 'PPE and Safe Systems',
    difficulty: 'advanced',
  },
  {
    id: 172,
    question: 'What type of eye protection is suitable for electrical work?',
    options: [
      'Safety glasses or goggles rated for impact and potentially arc flash',
      'To physically prevent an isolator being switched back on while work is in progress',
      'A short, focused safety briefing on a specific topic relevant to the work',
      'Joints and connections must be properly made to be mechanically and electrically sound',
    ],
    correctAnswer: 0,
    explanation:
      'Safety glasses or goggles rated for impact protection are required, with arc-rated protection for work where arc flash is a risk.',
    section: '1.7',
    topic: 'PPE and Safe Systems',
    difficulty: 'basic',
  },
  {
    id: 173,
    question: 'Why is synthetic clothing not recommended for electrical work?',
    options: [
      'Fracture (other than fingers, thumbs, or toes)',
      'It can melt and adhere to skin in an arc flash, worsening burns',
      'Technical knowledge and experience to prevent danger and injury',
      'Precautionary statements advising on handling, storage, and emergency response',
    ],
    correctAnswer: 1,
    explanation:
      'Synthetic materials can melt in an arc flash and adhere to skin, significantly worsening burn injuries. Natural fibres or arc-rated materials are preferred.',
    section: '1.7',
    topic: 'PPE and Safe Systems',
    difficulty: 'intermediate',
  },
  {
    id: 174,
    question: 'What is the purpose of safety footwear in electrical work?',
    options: [
      'To ensure articles are safe, tested, and accompanied by adequate information',
      'To physically prevent an isolator being switched back on while work is in progress',
      'Protection against falling objects, punctures, and electrical hazards',
      'Risk of injury from electric shock, burns, fire, or explosion arising from electricity',
    ],
    correctAnswer: 2,
    explanation:
      'Safety footwear provides protection against falling objects, puncture hazards, and may include electrical hazard (EH) rating for protection against electrical contact.',
    section: '1.7',
    topic: 'PPE and Safe Systems',
    difficulty: 'basic',
  },
  {
    id: 175,
    question: 'What is a safe isolation procedure?',
    options: [
      'Trained authorised persons, HV switching procedures, earthing equipment, additional testing',
      'The employer, or the person in control of the premises where the incident occurred',
      'Investigate hazards, complaints, accidents; inspect workplace; represent employees; receive HSE information',
      'A step-by-step procedure to ensure electrical equipment is safely disconnected from supply before work',
    ],
    correctAnswer: 3,
    explanation:
      'Safe isolation is a systematic procedure to safely disconnect electrical equipment from all sources of supply and verify it is dead before work begins.',
    section: '1.7',
    topic: 'PPE and Safe Systems',
    difficulty: 'basic',
  },
  {
    id: 176,
    question: 'What are the key steps in safe isolation?',
    options: [
      'Identify circuit, isolate, secure isolation, prove dead, apply lock-off, work safely',
      'Workers must be consulted on health and safety matters including risk assessment',
      'The incident energy level and appropriate PPE category required',
      'When there are significant changes, after incidents, or if it\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s no longer valid',
    ],
    correctAnswer: 0,
    explanation:
      'Steps: identify the circuit, switch off and isolate, secure the isolation (lock-off), prove dead with a tested voltage indicator, then apply lock-off/warning notices.',
    section: '1.7',
    topic: 'PPE and Safe Systems',
    difficulty: 'intermediate',
  },
  {
    id: 177,
    question: 'Why must a voltage indicator be tested before and after use?',
    options: [
      'Identify where work interfaces with others and specify coordination measures',
      'To ensure it is working correctly and give confidence the circuit is dead',
      'The maximum concentration of an airborne substance averaged over a reference period',
      'A hazard that a competent person could reasonably predict might occur',
    ],
    correctAnswer: 1,
    explanation:
      "Testing the voltage indicator on a known live source before and after use confirms it is working correctly, giving confidence that a 'dead' reading is accurate.",
    section: '1.7',
    topic: 'PPE and Safe Systems',
    difficulty: 'intermediate',
  },
  {
    id: 178,
    question: 'What is a proving unit used for?',
    options: [
      'Description of work, sequence of operations, equipment, control measures, responsible persons',
      'Carpal tunnel syndrome, occupational dermatitis, occupational asthma, and hand-arm vibration syndrome',
      'A known voltage source to test voltage indicators work correctly before and after use',
      'An engineering control that captures airborne contaminants at source before they spread',
    ],
    correctAnswer: 2,
    explanation:
      'A proving unit provides a known voltage to verify a voltage indicator is working correctly before testing a circuit and confirming it after proving dead.',
    section: '1.7',
    topic: 'PPE and Safe Systems',
    difficulty: 'intermediate',
  },
  {
    id: 179,
    question: 'What is the purpose of lock-off devices?',
    options: [
      'A brief risk assessment carried out immediately before starting a task at the work location',
      'Hot work, confined space entry, electrical isolation, working at height on roofs',
      'A step-by-step procedure to ensure electrical equipment is safely disconnected from supply before work',
      'To physically prevent an isolator being switched back on while work is in progress',
    ],
    correctAnswer: 3,
    explanation:
      'Lock-off devices physically prevent an isolator or circuit breaker being switched back on while work is in progress, maintaining safe isolation.',
    section: '1.7',
    topic: 'PPE and Safe Systems',
    difficulty: 'basic',
  },
  {
    id: 180,
    question:
      'When multiple people are working on an isolated circuit, what lock-off approach should be used?',
    options: [
      'Each person applies their own lock (multi-lock hasp) and keeps their own key',
      'The HSE service for receiving RIDDOR reports and providing reporting guidance',
      'Additional controls may be needed for young workers, pregnant women, or those with disabilities',
      'Details of injured person, accident circumstances, location, date/time, nature of injury',
    ],
    correctAnswer: 0,
    explanation:
      'When multiple people work on an isolated circuit, each person should apply their own padlock using a multi-lock hasp, keeping their own key until their work is complete.',
    section: '1.7',
    topic: 'PPE and Safe Systems',
    difficulty: 'intermediate',
  },
  {
    id: 181,
    question: 'What warning notices should be displayed during isolation?',
    options: [
      'Electrical short circuit or overload causing fire or explosion',
      'Clear warning signs indicating work in progress and prohibition against re-energising',
      'Guidance with special legal status - failure to follow can be used as evidence of non-compliance',
      'Significant findings including hazards identified, who is at risk, control measures, and review date',
    ],
    correctAnswer: 1,
    explanation:
      'Clear warning signs should be displayed at the isolation point indicating work is in progress and that the circuit must not be re-energised.',
    section: '1.7',
    topic: 'PPE and Safe Systems',
    difficulty: 'basic',
  },
  {
    id: 182,
    question: 'What is a permit to work for electrical isolation?',
    options: [
      'All reasonable steps were taken and all due diligence exercised to avoid the commission of the offence',
      'Specialised PPE protecting against thermal hazards from electrical arc flash incidents',
      'A formal documented authorisation for work on or near isolated electrical equipment',
      'The employer, or the person in control of the premises where the incident occurred',
    ],
    correctAnswer: 2,
    explanation:
      'An electrical permit to work is a formal document authorising specific work, detailing isolation points, precautions, and requiring sign-off before and after work.',
    section: '1.7',
    topic: 'PPE and Safe Systems',
    difficulty: 'intermediate',
  },
  {
    id: 183,
    question: 'What should be done if a circuit cannot be isolated?',
    options: [
      'The employer must weigh the risk against the cost, time and effort of removing it',
      'A summary of key points from the method statement communicated to workers before starting',
      'Description of work, hazards, precautions, isolation details, time limits, authorisation signatures',
      'Follow strict live working procedures if justified, or postpone work until isolation is possible',
    ],
    correctAnswer: 3,
    explanation:
      "If isolation isn't possible and live working is justified under EAWR Regulation 14, strict live working procedures with appropriate controls must be followed.",
    section: '1.7',
    topic: 'PPE and Safe Systems',
    difficulty: 'advanced',
  },
  {
    id: 184,
    question: 'What is the three-point test procedure for voltage indicators?',
    options: [
      'Test on known live source, test the circuit, retest on known live source',
      'To ensure it is working correctly and give confidence the circuit is dead',
      'At regular intervals as specified by the manufacturer, typically every 6 months',
      'Clear warning signs indicating work in progress and prohibition against re-energising',
    ],
    correctAnswer: 0,
    explanation:
      'The three-point test: verify the indicator works on a known live source, test the isolated circuit, then verify the indicator still works on the known live source.',
    section: '1.7',
    topic: 'PPE and Safe Systems',
    difficulty: 'intermediate',
  },
  {
    id: 185,
    question: 'What additional precautions are needed for HV (high voltage) safe isolation?',
    options: [
      'Equipment shall be of sufficient strength and capability for its purpose',
      'Trained authorised persons, HV switching procedures, earthing equipment, additional testing',
      'Test on known live source, test the circuit, retest on known live source',
      'Intentionally or recklessly interfering with or misusing anything provided for health, safety or welfare',
    ],
    correctAnswer: 1,
    explanation:
      'HV work requires specially trained authorised persons, formal switching programmes, application of circuit main earths, and HV-rated testing equipment.',
    section: '1.7',
    topic: 'PPE and Safe Systems',
    difficulty: 'advanced',
  },

  // ============================================
  // Section 1.8: Emergency Procedures (Questions 186-200)
  // ============================================
  {
    id: 186,
    question: 'What is the first action on discovering an electrical fire?',
    options: [
      'Each person applies their own lock (multi-lock hasp) and keeps their own key',
      'Only as a last resort when risks cannot be adequately controlled by other means',
      'Raise the alarm and isolate the power supply if safe to do so',
      'To specify actions taken or needed to eliminate or reduce risks',
    ],
    correctAnswer: 2,
    explanation:
      'On discovering an electrical fire: raise the alarm immediately, isolate the power supply if it is safe to do so, then evacuate and call the fire service.',
    section: '1.8',
    topic: 'Emergency Procedures',
    difficulty: 'basic',
  },
  {
    id: 187,
    question: 'Which type of fire extinguisher is safe to use on electrical fires?',
    options: [
      'The Health and Safety Executive (HSE)',
      'Working space, access, and lighting',
      'Means for cutting off supply and isolation',
      'CO2 (carbon dioxide) or dry powder',
    ],
    correctAnswer: 3,
    explanation:
      'CO2 and dry powder extinguishers are safe for electrical fires. Water and foam must not be used as they conduct electricity. CO2 is preferred as it leaves no residue.',
    section: '1.8',
    topic: 'Emergency Procedures',
    difficulty: 'basic',
  },
  {
    id: 188,
    question: 'What is the immediate first aid response to electric shock?',
    options: [
      'Ensure the power is off, check for response, call for help, and perform CPR if needed',
      'To enable HSE and local authorities to identify workplace risks and investigate serious accidents',
      'Ensuring work is planned, supervised, and carried out safely by people with appropriate skills',
      'Carpal tunnel syndrome, occupational dermatitis, occupational asthma, and hand-arm vibration syndrome',
    ],
    correctAnswer: 0,
    explanation:
      'Ensure the power source is isolated, check if the casualty is responsive, call for help (999), and begin CPR if they are not breathing normally.',
    section: '1.8',
    topic: 'Emergency Procedures',
    difficulty: 'basic',
  },
  {
    id: 189,
    question: 'Why should you never touch someone receiving an electric shock?',
    options: [
      'Statement of intent, organisation, and arrangements',
      'You could become part of the circuit and also receive a shock',
      'To ensure articles are safe, tested, and accompanied by adequate information',
      'The risks, precautions, control measures, and results of any monitoring',
    ],
    correctAnswer: 1,
    explanation:
      'Touching someone receiving a shock can make you part of the electrical circuit, giving you a shock too. Isolate the power first or use a dry non-conductive material.',
    section: '1.8',
    topic: 'Emergency Procedures',
    difficulty: 'basic',
  },
  {
    id: 190,
    question: 'What burns may result from electric shock?',
    options: [
      'The hazard, level of protection needed, fit, compatibility with other PPE, comfort',
      'Report as soon as you become aware the injury meets the criteria, within 15 days of becoming aware',
      'Entry and exit burns, as well as internal tissue damage along the current path',
      'Equipment must be suitable for adverse or hazardous environments or adequately protected',
    ],
    correctAnswer: 2,
    explanation:
      'Electric shock can cause burns at entry and exit points, plus internal tissue damage along the path the current takes through the body.',
    section: '1.8',
    topic: 'Emergency Procedures',
    difficulty: 'intermediate',
  },
  {
    id: 191,
    question: 'What is the emergency procedure for an arc flash injury?',
    options: [
      'Investigate hazards, complaints, accidents; inspect workplace; represent employees; receive HSE information',
      'All systems shall be constructed to prevent danger so far as is reasonably practicable',
      'When exposure cannot be adequately controlled and specific health conditions can be identified',
      'Extinguish any burning clothing, cool burns with water, cover loosely, treat for shock, get emergency help',
    ],
    correctAnswer: 3,
    explanation:
      'For arc flash: extinguish burning clothing, cool burns with clean water, cover loosely with non-adhesive dressing, treat for shock, and seek emergency medical help.',
    section: '1.8',
    topic: 'Emergency Procedures',
    difficulty: 'intermediate',
  },
  {
    id: 192,
    question: 'What should an emergency evacuation plan include?',
    options: [
      'Escape routes, assembly points, roll call procedures, emergency contacts, and procedures for assisting those needing help',
      'Equipment must be suitable for adverse or hazardous environments or adequately protected',
      'They must have, or organisations must ensure they have, the skills, knowledge, training and experience appropriate to their role — and behavioural capability',
      'To identify hazards, who might be harmed, evaluate risks, and determine control measures',
    ],
    correctAnswer: 0,
    explanation:
      'Emergency plans should include escape routes, assembly points, roll call procedures, emergency service contacts, and arrangements for those needing assistance to evacuate.',
    section: '1.8',
    topic: 'Emergency Procedures',
    difficulty: 'intermediate',
  },
  {
    id: 193,
    question: 'How often should emergency procedures be practised?',
    options: [
      'Competent person(s) with knowledge of the work, often involving workers who do the task',
      'Regularly, with fire drills at least annually and more frequent briefings',
      'Accidental leakage of gas causing death/injury or posing an immediate risk',
      'All employers, employees, and self-employed persons who work with or near electricity',
    ],
    correctAnswer: 1,
    explanation:
      'Emergency procedures should be practised regularly. Fire drills should occur at least annually, with more frequent briefings for new starters and when procedures change.',
    section: '1.8',
    topic: 'Emergency Procedures',
    difficulty: 'basic',
  },
  {
    id: 194,
    question: 'What information must be displayed at the workplace regarding emergencies?',
    options: [
      'Measures affecting health and safety, including arrangements for competent assistance',
      'Ensuring work is planned, supervised, and carried out safely by people with appropriate skills',
      'Fire action notices, evacuation routes, assembly points, emergency contacts',
      'To issue improvement notices, prohibition notices, and prosecute',
    ],
    correctAnswer: 2,
    explanation:
      'Workplaces must display fire action notices, indicate evacuation routes and fire exits, show assembly points, and provide emergency contact information.',
    section: '1.8',
    topic: 'Emergency Procedures',
    difficulty: 'basic',
  },
  {
    id: 195,
    question: 'What is the role of a fire warden?',
    options: [
      'A known voltage source to test voltage indicators work correctly before and after use',
      'Measures affecting health and safety, including arrangements for competent assistance',
      'Workers must understand the risks, control measures, and their responsibilities',
      'To assist with evacuation, check designated areas are clear, and report to the assembly point',
    ],
    correctAnswer: 3,
    explanation:
      'Fire wardens assist with evacuation, check their designated areas are clear, direct people to exits, help those needing assistance, and report status at the assembly point.',
    section: '1.8',
    topic: 'Emergency Procedures',
    difficulty: 'basic',
  },
  {
    id: 196,
    question: 'When should you attempt to fight a fire?',
    options: [
      "Only if trained, it's safe to do so, you have the right extinguisher, and the fire is small",
      "All systems shall be constructed to prevent danger so far as is reasonably practicable",
      "A summary of key points from the method statement communicated to workers before starting",
      "Working on electrical systems that have been safely isolated from all sources of supply",
    ],
    correctAnswer: 0,
    explanation:
      'Only attempt to fight a fire if trained, you have a safe escape route, the right type of extinguisher, and the fire is small enough to tackle safely.',
    section: '1.8',
    topic: 'Emergency Procedures',
    difficulty: 'intermediate',
  },
  {
    id: 197,
    question: 'What is the primary purpose of the assembly point?',
    options: [
      'The maximum concentration of an airborne substance averaged over a reference period',
      'A safe location where evacuated personnel gather to be accounted for',
      'To ensure articles are safe, tested, and accompanied by adequate information',
      'Risk of injury from electric shock, burns, fire, or explosion arising from electricity',
    ],
    correctAnswer: 1,
    explanation:
      'The assembly point is a predetermined safe location away from the building where evacuated personnel gather to be accounted for and receive further instructions.',
    section: '1.8',
    topic: 'Emergency Procedures',
    difficulty: 'basic',
  },
  {
    id: 198,
    question: 'What is the PASS technique for using a fire extinguisher?',
    options: [
      'Yes, if they result from work activity and require hospital treatment',
      'Non-employees who may be affected by the work activities',
      'Pull pin, Aim at base, Squeeze handle, Sweep side to side',
      'Inhalation, skin absorption, ingestion, and injection',
    ],
    correctAnswer: 2,
    explanation:
      'PASS: Pull the pin, Aim the nozzle at the base of the fire, Squeeze the handle, and Sweep from side to side at the base of the flames.',
    section: '1.8',
    topic: 'Emergency Procedures',
    difficulty: 'basic',
  },
  {
    id: 199,
    question: 'What should be reported after any emergency incident?',
    options: [
      'Electric shock, burns, fire, explosion, falls from height, manual handling',
      'A known voltage source to test voltage indicators work correctly before and after use',
      'To confirm work is complete, the area is safe, and controls can be removed',
      'Details of the incident, actions taken, injuries, and lessons learned',
    ],
    correctAnswer: 3,
    explanation:
      'All emergency incidents should be reported with details of what happened, actions taken, any injuries, damage, near misses, and lessons learned for improvement.',
    section: '1.8',
    topic: 'Emergency Procedures',
    difficulty: 'intermediate',
  },
  {
    id: 200,
    question: 'What are the symptoms of secondary shock (psychological shock) after an accident?',
    options: [
      'Pale, cold clammy skin, rapid weak pulse, nausea, confusion, and anxiety',
      'A safe location where evacuated personnel gather to be accounted for',
      'The hazard, level of protection needed, fit, compatibility with other PPE, comfort',
      'A known voltage source to test voltage indicators work correctly before and after use',
    ],
    correctAnswer: 0,
    explanation:
      'Shock symptoms include pale grey skin, cold and clammy feel, rapid weak pulse, rapid shallow breathing, nausea, thirst, and mental confusion or anxiety.',
    section: '1.8',
    topic: 'Emergency Procedures',
    difficulty: 'intermediate',
  },

  // ============================================
  // Section 1.9: Asbestos and CDM 2015 (Questions 201-225)
  // ============================================
  {
    id: 201,
    question: 'Under CDM 2015 Regulation 9, what is the principal designer\'s duty when planning the pre-construction phase?',
    options: [
      'Provide suitable PPE free of charge, ensure it\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s maintained, provide storage, training, and enforce use',
      'To plan, manage, monitor and coordinate health and safety in the pre-construction phase, including identifying and eliminating foreseeable risks',
      'Personal exposure records for at least 40 years and health surveillance records, with workers having access to their own records',
      'Intentionally or recklessly interfering with or misusing anything provided for health, safety or welfare',
    ],
    correctAnswer: 1,
    explanation:
      'CDM 2015 Reg 9 places the principal designer in charge of health and safety during pre-construction. They must plan, manage, monitor and coordinate work to identify, eliminate or control foreseeable risks for those building, using and maintaining the structure.',
    section: '1.9',
    topic: 'Asbestos and CDM 2015',
    difficulty: 'advanced',
  },
  {
    id: 202,
    question: 'Under CDM 2015 Reg 13, when does a contractor become a principal contractor?',
    options: [
      'Directors, managers, and other officers if the offence was committed with their consent, connivance, or neglect',
      'Cover purpose, scope, step-by-step procedure, equipment required, hazards if not followed, individual responsibilities, allow questions, get signed acknowledgement, and check understanding',
      'When more than one contractor is, or is reasonably foreseeable to be, working on the project at the same time — the client must appoint one in writing',
      'To take reasonable care of their own health and safety and that of others affected by their acts or omissions, and cooperate with the employer',
    ],
    correctAnswer: 2,
    explanation:
      'CDM 2015 Reg 5 requires the client to appoint a principal contractor in writing whenever more than one contractor is involved (or foreseeably will be). The principal contractor then takes on Reg 13 duties — planning, managing, monitoring and coordinating the construction phase.',
    section: '1.9',
    topic: 'Asbestos and CDM 2015',
    difficulty: 'advanced',
  },
  {
    id: 203,
    question: 'Under CDM 2015 Reg 15, what must a contractor do before starting work on site?',
    options: [
      'Reject it, require a site-specific RAMS, brief the team only after it\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s been revised, and document the rejection',
      'When construction work is scheduled to last longer than 30 working days with more than 20 workers on site simultaneously, or exceed 500 person-days',
      'A formal procedure resulting from systematic examination of work to identify hazards and methods to eliminate or minimise them',
      'Plan, manage and monitor construction work under their control so it is carried out without risks to health and safety, and provide site-specific induction',
    ],
    correctAnswer: 3,
    explanation:
      'CDM 2015 Reg 15 says every contractor must plan, manage and monitor their own work and ensure workers under their control receive a site-specific induction, suitable training and information before starting.',
    section: '1.9',
    topic: 'Asbestos and CDM 2015',
    difficulty: 'intermediate',
  },
  {
    id: 204,
    question: 'Under CAR 2012 (Control of Asbestos Regulations), what is a refurbishment and demolition (R&D) survey for?',
    options: [
      'To locate and describe all asbestos-containing materials before refurbishment or demolition, so they can be removed before work starts',
      'Investigate, record it in the accident book / near-miss log, review the safe-isolation procedure, brief the team, and use it as a positive learning event',
      'Directors, managers, and other officers if the offence was committed with their consent, connivance, or neglect',
      'Include specific emergency actions, evacuation routes, emergency contacts, and first aid arrangements',
    ],
    correctAnswer: 0,
    explanation:
      'CAR 2012 Reg 5 requires an R&D survey before any refurbishment or demolition. It is fully intrusive and is designed to find all ACMs so they can be safely removed before the work begins, protecting workers from disturbance.',
    section: '1.9',
    topic: 'Asbestos and CDM 2015',
    difficulty: 'advanced',
  },
  {
    id: 205,
    question: 'Under CAR 2012, who can carry out licensed asbestos work such as removing sprayed coatings or asbestos insulating board (AIB) in poor condition?',
    options: [
      'A short, focused safety briefing on a specific topic relevant to the work',
      'Only HSE-licensed contractors holding a current asbestos licence',
      'Evaluating and prioritising risks by plotting likelihood against severity',
      'Each person applies their own lock (multi-lock hasp) and keeps their own key',
    ],
    correctAnswer: 1,
    explanation:
      'Higher-risk asbestos work (sprayed coatings, lagging, most AIB work) is licensable under CAR 2012. Only contractors holding a current HSE asbestos licence may do it. Electricians who suspect ACMs must stop work and report — never proceed.',
    section: '1.9',
    topic: 'Asbestos and CDM 2015',
    difficulty: 'advanced',
  },
  {
    id: 206,
    question: 'You\'re a supervisor on a 1970s commercial refurb. An apprentice drills into a ceiling tile and a grey fibrous dust falls out. What do you do first?',
    options: [
      'Plan, manage and monitor construction work under their control so it is carried out without risks to health and safety, and provide site-specific induction',
      'They must have, or organisations must ensure they have, the skills, knowledge, training and experience appropriate to their role — and behavioural capability',
      'Stop work immediately, prevent access to the area, isolate the suspect material from disturbance, and report it to the client and duty holder',
      'Investigate, record it in the accident book / near-miss log, review the safe-isolation procedure, brief the team, and use it as a positive learning event',
    ],
    correctAnswer: 2,
    explanation:
      'CAR 2012 Reg 16 requires immediate cessation if asbestos is suspected. Stop work, prevent further disturbance, restrict access, and notify the duty holder. Do not attempt to clean up — sampling and any removal must be done by a competent or licensed contractor.',
    section: '1.9',
    topic: 'Asbestos and CDM 2015',
    difficulty: 'intermediate',
  },
  {
    id: 207,
    question: 'Under CDM 2015, when does the client need to notify HSE using an F10?',
    options: [
      'Suitable precautions shall be taken to prevent danger from charge on exposed metalwork, preferably by earthing',
      'Culpability (very high to low), seriousness of harm risked, likelihood of harm, plus the offender\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s turnover and aggravating/mitigating factors',
      'Where an offence by the company is committed with their consent, connivance or attributable to their neglect — they may be charged personally as well',
      'When construction work is scheduled to last longer than 30 working days with more than 20 workers on site simultaneously, or exceed 500 person-days',
    ],
    correctAnswer: 3,
    explanation:
      'CDM 2015 Reg 6 requires F10 notification when work is scheduled to last more than 30 working days with more than 20 workers on site at the same time, OR exceeds 500 person-days in total. The client is responsible for the notification.',
    section: '1.9',
    topic: 'Asbestos and CDM 2015',
    difficulty: 'advanced',
  },
  {
    id: 208,
    question: 'Under CDM 2015, what is the construction phase plan and who prepares it?',
    options: [
      'A document setting out how health and safety will be managed during construction, prepared by the principal contractor (or sole contractor)',
      'All reasonable steps were taken and all due diligence exercised to avoid the commission of the offence',
      'When more than one contractor is, or is reasonably foreseeable to be, working on the project at the same time — the client must appoint one in writing',
      'Suitable means shall be available for protecting from excess current and for cutting off supply in an emergency',
    ],
    correctAnswer: 0,
    explanation:
      'The construction phase plan is required under CDM 2015 Reg 12. The principal contractor (or sole contractor on smaller jobs) prepares it before the construction phase begins. It covers the arrangements for managing significant health and safety risks during the build.',
    section: '1.9',
    topic: 'Asbestos and CDM 2015',
    difficulty: 'intermediate',
  },
  {
    id: 209,
    question: 'What is the health and safety file under CDM 2015 and who keeps it?',
    options: [
      'When construction work is scheduled to last longer than 30 working days with more than 20 workers on site simultaneously, or exceed 500 person-days',
      'A file containing information needed to manage health and safety during future construction, maintenance and demolition — handed to the client at project end and kept by them for the life of the structure',
      'Ensure equipment is suitable for purpose, used only by trained and competent persons, maintained, inspected, with controls, isolation, stability and lighting',
      'It targets the organisation as a whole where a gross breach of duty causes death and substantially involves senior management — focuses on culture, not individuals',
    ],
    correctAnswer: 1,
    explanation:
      'CDM 2015 Reg 12(5) requires the principal designer (or principal contractor) to compile the health and safety file. It contains residual hazard information for future works and is handed to the client at handover. The client must keep it for the lifetime of the structure.',
    section: '1.9',
    topic: 'Asbestos and CDM 2015',
    difficulty: 'advanced',
  },
  {
    id: 210,
    question: 'Under the Building Safety Act 2022, what is a higher-risk residential building (HRRB)?',
    options: [
      'At regular intervals as specified by the manufacturer, typically every 6 months',
      'The maximum concentration of an airborne substance averaged over a reference period',
      'A building at least 18 metres high or with at least 7 storeys, containing at least two residential units',
      'Report as soon as you become aware the injury meets the criteria, within 15 days of becoming aware',
    ],
    correctAnswer: 2,
    explanation:
      'The Building Safety Act 2022 defines HRRBs as buildings of at least 18m or 7 storeys containing two or more residential units. They are subject to enhanced duty-holder regimes, the golden thread of information, and Building Safety Regulator oversight.',
    section: '1.9',
    topic: 'Asbestos and CDM 2015',
    difficulty: 'advanced',
  },
  {
    id: 211,
    question: 'What is the "golden thread" required by the Building Safety Act 2022?',
    options: [
      'All reasonable steps were taken and all due diligence exercised to avoid the commission of the offence',
      'To ensure, so far as is reasonably practicable, the health, safety and welfare of all employees',
      'Carpal tunnel syndrome, occupational dermatitis, occupational asthma, and hand-arm vibration syndrome',
      'A digital, accurate, accessible record of building information that supports safe design, construction and ongoing management of HRRBs',
    ],
    correctAnswer: 3,
    explanation:
      'The golden thread is a structured digital information record required by the BSA 2022 for HRRBs. It must be accurate, up-to-date, accessible to dutyholders, and supports safe design, construction, occupation and remediation throughout the building\'s life.',
    section: '1.9',
    topic: 'Asbestos and CDM 2015',
    difficulty: 'advanced',
  },
  {
    id: 212,
    question: 'The asbestos duty holder under CAR 2012 Reg 4 is responsible for what?',
    options: [
      'Managing the risk from ACMs in non-domestic premises — finding them, recording them, assessing risk, planning management, and providing the information to anyone liable to disturb them',
      'Stop the activity, formally re-brief the requirement and consequences (employee duty under HASAWA s.7 and PUWER), document refusal, and apply the company disciplinary procedure if continued',
      'To locate and describe all asbestos-containing materials before refurbishment or demolition, so they can be removed before work starts',
      'Plan, manage and monitor construction work under their control so it is carried out without risks to health and safety, and provide site-specific induction',
    ],
    correctAnswer: 0,
    explanation:
      'CAR 2012 Reg 4 places a duty on the person in control of non-domestic premises (typically the owner or occupier) to manage asbestos. They must locate, record, assess, plan, and share the information — including with contractors before work starts.',
    section: '1.9',
    topic: 'Asbestos and CDM 2015',
    difficulty: 'advanced',
  },
  {
    id: 213,
    question: 'You arrive on a domestic CU change in a 1960s flat. The client has no R&D survey. What\'s your supervisor-grade response?',
    options: [
      'A file containing information needed to manage health and safety during future construction, maintenance and demolition — handed to the client at project end and kept by them for the life of the structure',
      'Refuse to start until the client confirms in writing whether ACMs are present in the area you\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'ll disturb, or commissions an appropriate survey',
      'Make safe (isolate hazard), administer first aid / call emergency services, preserve the scene, notify employer and client, secure witnesses, report under RIDDOR if applicable, start investigation',
      'Avoid risks; evaluate unavoidable risks; combat at source; adapt work to the individual; adapt to technical progress; replace dangerous with less dangerous; develop coherent prevention policy; collective over individual measures; instruct workers',
    ],
    correctAnswer: 1,
    explanation:
      'Pre-2000 buildings can contain ACMs. CAR 2012 Reg 5 requires you to identify ACMs before disturbing them. As supervisor you must refuse to start without that information — proceeding regardless exposes both you and your worker to enforcement and prosecution.',
    section: '1.9',
    topic: 'Asbestos and CDM 2015',
    difficulty: 'advanced',
  },
  {
    id: 214,
    question: 'What is the difference between licensable, notifiable non-licensed (NNLW) and non-licensed asbestos work?',
    options: [
      'A statutory cost recovery scheme charging a hourly fee for HSE inspector time spent identifying and helping to address material breaches of H&S law',
      'Management survey identifies ACMs likely to be disturbed in normal use; R&D survey is fully intrusive and locates all ACMs prior to refurbishment or demolition',
      'Licensable = highest risk, requires HSE licence; NNLW = sporadic/low intensity but still requires notification, training, medicals, records; Non-licensed = lowest risk asbestos work with limited controls',
      'Effective arrangements for the planning, organisation, control, monitoring and review of preventive and protective measures — recorded by employers with 5+ employees',
    ],
    correctAnswer: 2,
    explanation:
      'CAR 2012 sets a three-tier system. Licensable work (sprayed coatings, lagging, most AIB) needs an HSE licence. NNLW (sporadic disturbance of higher-risk material) requires HSE notification, medical surveillance and records. Non-licensed covers low-risk work like undamaged cement products.',
    section: '1.9',
    topic: 'Asbestos and CDM 2015',
    difficulty: 'advanced',
  },
  {
    id: 215,
    question: 'Under CAR 2012, what training must any worker who may disturb asbestos receive?',
    options: [
      'All reasonable steps were taken and all due diligence exercised to avoid the commission of the offence',
      'Where an offence by the company is committed with their consent, connivance or attributable to their neglect — they may be charged personally as well',
      'Continuous mental reassessment of changing site conditions — new hazards, changing weather, fatigue, time pressure — adapting controls in real time and stopping work if needed',
      'Asbestos awareness training, refreshed regularly, before starting work — covering risks, types of ACMs, and what to do if they are encountered',
    ],
    correctAnswer: 3,
    explanation:
      'CAR 2012 Reg 10 requires anyone whose work may foreseeably expose them to asbestos to receive suitable asbestos awareness training. This includes electricians and apprentices working in pre-2000 buildings. Refresher training is required and records must be kept.',
    section: '1.9',
    topic: 'Asbestos and CDM 2015',
    difficulty: 'intermediate',
  },
  {
    id: 216,
    question: 'Under CDM 2015 Reg 4, what is a domestic client and how do their duties pass to the contractor?',
    options: [
      'A client having work done in their own home not connected to a business — most CDM duties pass automatically to the contractor (or principal contractor where there are several)',
      'Improvement notices give time to remedy a contravention; prohibition notices stop activities involving serious risk immediately',
      'Stop work immediately, prevent access to the area, isolate the suspect material from disturbance, and report it to the client and duty holder',
      'Personal exposure records for at least 40 years and health surveillance records, with workers having access to their own records',
    ],
    correctAnswer: 0,
    explanation:
      'A domestic client under CDM 2015 has work done on their own home unconnected with any business. The Regulations transfer most client duties to the contractor (or principal contractor on multi-contractor jobs), so the contractor effectively assumes the client role.',
    section: '1.9',
    topic: 'Asbestos and CDM 2015',
    difficulty: 'advanced',
  },
  {
    id: 217,
    question: 'A client tells you "we don\'t have an asbestos register, just get on with it" before a commercial rewire. What do you, as supervisor, do?',
    options: [
      'Culpability (very high to low), seriousness of harm risked, likelihood of harm, plus the offender\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s turnover and aggravating/mitigating factors',
      'Refuse to start. Inform the client in writing that under CAR 2012 Reg 4 they have a duty to manage asbestos and provide the information; without it the work cannot proceed safely or lawfully',
      'A client having work done in their own home not connected to a business — most CDM duties pass automatically to the contractor (or principal contractor where there are several)',
      'Stop work immediately, prevent access to the area, isolate the suspect material from disturbance, and report it to the client and duty holder',
    ],
    correctAnswer: 1,
    explanation:
      'Without the duty holder\'s asbestos information you cannot plan safe work in a non-domestic premises. As supervisor you must refuse to start and put it in writing. Proceeding without the survey/register is a CAR 2012 breach for both client and contractor.',
    section: '1.9',
    topic: 'Asbestos and CDM 2015',
    difficulty: 'advanced',
  },
  {
    id: 218,
    question: 'Under CDM 2015 Reg 8, what general duty does every dutyholder have around competence?',
    options: [
      'Management survey identifies ACMs likely to be disturbed in normal use; R&D survey is fully intrusive and locates all ACMs prior to refurbishment or demolition',
      'Culpability (very high to low), seriousness of harm risked, likelihood of harm, plus the offender\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s turnover and aggravating/mitigating factors',
      'They must have, or organisations must ensure they have, the skills, knowledge, training and experience appropriate to their role — and behavioural capability',
      'Where an offence by the company is committed with their consent, connivance or attributable to their neglect — they may be charged personally as well',
    ],
    correctAnswer: 2,
    explanation:
      'CDM 2015 Reg 8 (general duties) requires every dutyholder — designers, contractors, principal contractors, principal designers — to have appropriate skills, knowledge, training, experience and (for organisations) the capability to discharge their role.',
    section: '1.9',
    topic: 'Asbestos and CDM 2015',
    difficulty: 'intermediate',
  },
  {
    id: 219,
    question: 'You discover ACM dust spread through a corridor after an unrelated trade has drilled a wall. As supervisor, what is your sequence of actions?',
    options: [
      'Reject the RAMS, require it to be revised to address ACMs based on the duty holder\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s register/survey, and verify it before allowing the subcontractor on site',
      'Defined serious injuries including fractures (other than fingers, thumbs, toes), amputations, loss of sight, crush injury to head/torso, serious burns, scalpings, loss of consciousness from head injury or asphyxia, and any injury requiring resuscitation',
      'Refuse to start until the client confirms in writing whether ACMs are present in the area you\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'ll disturb, or commissions an appropriate survey',
      'Evacuate and seal the area, stop all work, notify the duty holder and HSE if appropriate, arrange licensed clean-up, retain workers\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\' clothing for assessment, log near miss and review',
    ],
    correctAnswer: 3,
    explanation:
      'A spread of suspected asbestos dust is a serious uncontrolled exposure. Evacuate and seal the area, stop work, escalate to the duty holder, secure clothing/PPE, arrange licensed decontamination, and report to HSE. Document as RIDDOR-relevant if exposure is confirmed.',
    section: '1.9',
    topic: 'Asbestos and CDM 2015',
    difficulty: 'advanced',
  },
  {
    id: 220,
    question: 'What is a management asbestos survey and how does it differ from an R&D survey?',
    options: [
      'Management survey identifies ACMs likely to be disturbed in normal use; R&D survey is fully intrusive and locates all ACMs prior to refurbishment or demolition',
      'A document setting out how health and safety will be managed during construction, prepared by the principal contractor (or sole contractor)',
      'The "responsible person" (typically the employer) must report — online via HSE\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s reporting portal, equivalent to F2508',
      'Plan, manage and monitor construction work under their control so it is carried out without risks to health and safety, and provide site-specific induction',
    ],
    correctAnswer: 0,
    explanation:
      'A management survey supports the day-to-day management of ACMs and is non- or minimally intrusive. An R&D survey is fully intrusive (in HSG264 terms) and is mandatory before refurbishment or demolition to ensure no ACMs are missed.',
    section: '1.9',
    topic: 'Asbestos and CDM 2015',
    difficulty: 'advanced',
  },
  {
    id: 221,
    question: 'Under CDM 2015, what is the principal designer\'s duty regarding designers under their control?',
    options: [
      'No person shall work on or near live conductors unless unreasonable to dead, reasonable to work live, and suitable precautions taken',
      'To coordinate matters relating to health and safety and ensure designers cooperate, share information and apply the general principles of prevention',
      'A burn or scald covering more than 10% of the body or causing damage to eyes, respiratory system or vital organs',
      'To conduct their undertaking so as to ensure, so far as is reasonably practicable, that persons not in their employment are not exposed to risks to their health or safety',
    ],
    correctAnswer: 1,
    explanation:
      'Under CDM 2015 Reg 11, the principal designer must plan, manage, monitor and coordinate the pre-construction phase, ensure designers cooperate and share information, and apply the general principles of prevention from MHSWR Sch 1.',
    section: '1.9',
    topic: 'Asbestos and CDM 2015',
    difficulty: 'advanced',
  },
  {
    id: 222,
    question: 'A subcontractor\'s RAMS does not address asbestos at all on a 1980s commercial site. As principal contractor what do you do?',
    options: [
      'Evacuate and seal the area, stop all work, notify the duty holder and HSE if appropriate, arrange licensed clean-up, retain workers\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\' clothing for assessment, log near miss and review',
      'Refuse to start until the client confirms in writing whether ACMs are present in the area you\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'ll disturb, or commissions an appropriate survey',
      'Reject the RAMS, require it to be revised to address ACMs based on the duty holder\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s register/survey, and verify it before allowing the subcontractor on site',
      'Culpability (very high to low), seriousness of harm risked, likelihood of harm, plus the offender\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s turnover and aggravating/mitigating factors',
    ],
    correctAnswer: 2,
    explanation:
      'Approving deficient RAMS is a principal contractor failing under CDM 2015 Reg 13. Reject it, share the duty holder\'s asbestos register, and require revision. Don\'t allow the subcontractor on site until the RAMS adequately addresses identified ACMs.',
    section: '1.9',
    topic: 'Asbestos and CDM 2015',
    difficulty: 'advanced',
  },
  {
    id: 223,
    question: 'Under CDM 2015, what is "pre-construction information" (PCI) and who provides it?',
    options: [
      'Ensure equipment is suitable for purpose, used only by trained and competent persons, maintained, inspected, with controls, isolation, stability and lighting',
      'A formal procedure resulting from systematic examination of work to identify hazards and methods to eliminate or minimise them',
      'Suitable precautions shall be taken to prevent danger from charge on exposed metalwork, preferably by earthing',
      'Information about the project, including known hazards, that the client must provide to designers and contractors as soon as practicable',
    ],
    correctAnswer: 3,
    explanation:
      'CDM 2015 Reg 4(4) requires the client to provide pre-construction information — site details, known hazards (including asbestos register), existing drawings and any health and safety file — as early as practicable to inform design and planning.',
    section: '1.9',
    topic: 'Asbestos and CDM 2015',
    difficulty: 'advanced',
  },
  {
    id: 224,
    question: 'Under CAR 2012, what records must be kept after non-licensed but notifiable asbestos work (NNLW)?',
    options: [
      'Personal exposure records for at least 40 years and health surveillance records, with workers having access to their own records',
      'They must have, or organisations must ensure they have, the skills, knowledge, training and experience appropriate to their role — and behavioural capability',
      'Ensuring work is planned, supervised, and carried out safely by people with appropriate skills',
      'When construction work is scheduled to last longer than 30 working days with more than 20 workers on site simultaneously, or exceed 500 person-days',
    ],
    correctAnswer: 0,
    explanation:
      'CAR 2012 Regs 19 and 22 require employers to keep personal exposure records for at least 40 years (because of the long latency of asbestos disease) and health surveillance records. Workers can access their own records.',
    section: '1.9',
    topic: 'Asbestos and CDM 2015',
    difficulty: 'advanced',
  },
  {
    id: 225,
    question: 'You are the appointed supervisor on a small commercial refurb under CDM 2015. The client has not appointed a principal designer. What do you do?',
    options: [
      'It targets the organisation as a whole where a gross breach of duty causes death and substantially involves senior management — focuses on culture, not individuals',
      'Inform the client in writing that they must appoint a principal designer (Reg 5) where more than one contractor is involved, and that without it the project cannot lawfully proceed',
      'Ensure equipment is suitable for purpose, used only by trained and competent persons, maintained, inspected, with controls, isolation, stability and lighting',
      'Improvement notices give time to remedy a contravention; prohibition notices stop activities involving serious risk immediately',
    ],
    correctAnswer: 1,
    explanation:
      'CDM 2015 Reg 5 makes appointment of a principal designer (and principal contractor) a client duty whenever there is more than one contractor. Failure is a client breach. As supervisor you must escalate it in writing — the project should not start until appointments are made.',
    section: '1.9',
    topic: 'Asbestos and CDM 2015',
    difficulty: 'advanced',
  },

  // ============================================
  // Section 1.10: Supervisor Responsibilities (Questions 226-250)
  // ============================================
  {
    id: 226,
    question: 'Under HASAWA Section 7, what duty does an employee owe to themselves and others while at work?',
    options: [
      'Evacuate and seal the area, stop all work, notify the duty holder and HSE if appropriate, arrange licensed clean-up, retain workers\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\' clothing for assessment, log near miss and review',
      'A burn or scald covering more than 10% of the body or causing damage to eyes, respiratory system or vital organs',
      'To take reasonable care of their own health and safety and that of others affected by their acts or omissions, and cooperate with the employer',
      'Investigate hazards, complaints, accidents; inspect workplace; represent employees; receive HSE information',
    ],
    correctAnswer: 2,
    explanation:
      'Section 7 places personal criminal duties on every employee: take reasonable care of own and others\' health and safety, and cooperate with the employer. Breach can lead to individual prosecution — supervisors and apprentices alike are liable.',
    section: '1.10',
    topic: 'Supervisor Responsibilities',
    difficulty: 'advanced',
  },
  {
    id: 227,
    question: 'Under HASAWA Section 37, when can a director or senior manager be personally prosecuted alongside the company?',
    options: [
      'Ensure equipment is suitable for purpose, used only by trained and competent persons, maintained, inspected, with controls, isolation, stability and lighting',
      'Stop work immediately, prevent access to the area, isolate the suspect material from disturbance, and report it to the client and duty holder',
      'Appropriate to the complexity of the task and identifies significant risks without being overly complicated',
      'Where an offence by the company is committed with their consent, connivance or attributable to their neglect — they may be charged personally as well',
    ],
    correctAnswer: 3,
    explanation:
      'Section 37 HASAWA exposes directors and senior managers personally where the company\'s offence was committed with their consent, connivance, or due to their neglect. This is the basis for many personal H&S prosecutions and disqualifications.',
    section: '1.10',
    topic: 'Supervisor Responsibilities',
    difficulty: 'advanced',
  },
  {
    id: 228,
    question: 'Under the Sentencing Council Definitive Guideline 2016 (Health and Safety Offences), what factors determine the level of fine?',
    options: [
      'Culpability (very high to low), seriousness of harm risked, likelihood of harm, plus the offender\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s turnover and aggravating/mitigating factors',
      'Reject it, require a site-specific RAMS, brief the team only after it\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s been revised, and document the rejection',
      'Defined serious injuries including fractures (other than fingers, thumbs, toes), amputations, loss of sight, crush injury to head/torso, serious burns, scalpings, loss of consciousness from head injury or asphyxia, and any injury requiring resuscitation',
      'Avoid risks; evaluate unavoidable risks; combat at source; adapt work to the individual; adapt to technical progress; replace dangerous with less dangerous; develop coherent prevention policy; collective over individual measures; instruct workers',
    ],
    correctAnswer: 0,
    explanation:
      'The 2016 Definitive Guideline produces fines linked to culpability, harm category and turnover band. Large organisations can face fines into the millions. The structured approach has driven a step-change in penalty levels since 2016.',
    section: '1.10',
    topic: 'Supervisor Responsibilities',
    difficulty: 'advanced',
  },
  {
    id: 229,
    question: 'What is the Fee For Intervention (FFI) and when does HSE charge it?',
    options: [
      'Avoid the work at height; if unavoidable, use work equipment that prevents falls; if not possible, use work equipment that minimises distance and consequences of falls — fall arrest is last',
      'A statutory cost recovery scheme charging a hourly fee for HSE inspector time spent identifying and helping to address material breaches of H&S law',
      'Managing the risk from ACMs in non-domestic premises — finding them, recording them, assessing risk, planning management, and providing the information to anyone liable to disturb them',
      'Ensure equipment is suitable for purpose, used only by trained and competent persons, maintained, inspected, with controls, isolation, stability and lighting',
    ],
    correctAnswer: 1,
    explanation:
      'FFI lets HSE recover its costs for time spent dealing with material breaches at an hourly rate set by Parliament. The bill goes to the dutyholder and is payable even if no formal enforcement action follows.',
    section: '1.10',
    topic: 'Supervisor Responsibilities',
    difficulty: 'advanced',
  },
  {
    id: 230,
    question: 'What is the difference between an improvement notice and a prohibition notice?',
    options: [
      'Lower 80 dB(A) daily/weekly exposure with peak 135 dB(C); upper 85 dB(A) with peak 137 dB(C); exposure limit 87 dB(A) with peak 140 dB(C)',
      'Provide suitable PPE free of charge, ensure it\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s maintained, provide storage, training, and enforce use',
      'Improvement notice gives time to remedy a breach; prohibition notice immediately stops an activity that involves a risk of serious personal injury',
      'A building at least 18 metres high or with at least 7 storeys, containing at least two residential units',
    ],
    correctAnswer: 2,
    explanation:
      'Improvement notices (HSWA s.21) require a breach to be remedied within a stated period. Prohibition notices (s.22) take immediate effect to stop activity involving risk of serious personal injury and remain in force until conditions are met.',
    section: '1.10',
    topic: 'Supervisor Responsibilities',
    difficulty: 'advanced',
  },
  {
    id: 231,
    question: 'Under RIDDOR 2013, what is a "specified injury" listed in Schedule 1?',
    options: [
      'A file containing information needed to manage health and safety during future construction, maintenance and demolition — handed to the client at project end and kept by them for the life of the structure',
      'Licensable = highest risk, requires HSE licence; NNLW = sporadic/low intensity but still requires notification, training, medicals, records; Non-licensed = lowest risk asbestos work with limited controls',
      'Cover purpose, scope, step-by-step procedure, equipment required, hazards if not followed, individual responsibilities, allow questions, get signed acknowledgement, and check understanding',
      'Defined serious injuries including fractures (other than fingers, thumbs, toes), amputations, loss of sight, crush injury to head/torso, serious burns, scalpings, loss of consciousness from head injury or asphyxia, and any injury requiring resuscitation',
    ],
    correctAnswer: 3,
    explanation:
      'RIDDOR Schedule 1 lists specified injuries that must be reported regardless of whether the worker is off work. They include serious fractures, amputations, sight loss, crushing of head/torso, serious burns, scalpings, loss of consciousness and injuries requiring resuscitation.',
    section: '1.10',
    topic: 'Supervisor Responsibilities',
    difficulty: 'advanced',
  },
  {
    id: 232,
    question: 'Under RIDDOR 2013, who has the duty to report and what form is used for an over-7-day injury to an employee?',
    options: [
      'The "responsible person" (typically the employer) must report — online via HSE\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s reporting portal, equivalent to F2508',
      'Management survey identifies ACMs likely to be disturbed in normal use; R&D survey is fully intrusive and locates all ACMs prior to refurbishment or demolition',
      'Plan, manage and monitor construction work under their control so it is carried out without risks to health and safety, and provide site-specific induction',
      'To coordinate matters relating to health and safety and ensure designers cooperate, share information and apply the general principles of prevention',
    ],
    correctAnswer: 0,
    explanation:
      'RIDDOR places the reporting duty on the "responsible person" — usually the employer or person in control. Reports of over-7-day absence injuries are submitted online to HSE via the F2508 system within 15 days of the incident.',
    section: '1.10',
    topic: 'Supervisor Responsibilities',
    difficulty: 'intermediate',
  },
  {
    id: 233,
    question: 'A near-miss happens on your site — a live conductor is touched but no shock occurs because of insulated tools. As supervisor, what do you do?',
    options: [
      'Suitable means shall be available for protecting from excess current and for cutting off supply in an emergency',
      'Investigate, record it in the accident book / near-miss log, review the safe-isolation procedure, brief the team, and use it as a positive learning event',
      'Plan, manage and monitor construction work under their control so it is carried out without risks to health and safety, and provide site-specific induction',
      'Refuse to start. Inform the client in writing that under CAR 2012 Reg 4 they have a duty to manage asbestos and provide the information; without it the work cannot proceed safely or lawfully',
    ],
    correctAnswer: 1,
    explanation:
      'A strong near-miss culture catches risks before they become incidents. As supervisor you must investigate root cause, log it, share learning with the team, and review controls. Even if not RIDDOR-reportable, it\'s the best free data you\'ll get.',
    section: '1.10',
    topic: 'Supervisor Responsibilities',
    difficulty: 'intermediate',
  },
  {
    id: 234,
    question: 'A new RAMS arrives from a designer that you, as supervisor, can see is generic and doesn\'t reflect site conditions. What\'s the correct action?',
    options: [
      'Refuse to start until the client confirms in writing whether ACMs are present in the area you\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'ll disturb, or commissions an appropriate survey',
      'Continuous mental reassessment of changing site conditions — new hazards, changing weather, fatigue, time pressure — adapting controls in real time and stopping work if needed',
      'Reject it, require a site-specific RAMS, brief the team only after it\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s been revised, and document the rejection',
      'A client having work done in their own home not connected to a business — most CDM duties pass automatically to the contractor (or principal contractor where there are several)',
    ],
    correctAnswer: 2,
    explanation:
      'A generic RAMS doesn\'t discharge anyone\'s MHSWR Reg 3 duty. As supervisor you must reject it, request a site-specific version, and only brief once it reflects actual hazards. Document the rejection — it protects you and forces good practice upstream.',
    section: '1.10',
    topic: 'Supervisor Responsibilities',
    difficulty: 'advanced',
  },
  {
    id: 235,
    question: 'How does the Corporate Manslaughter and Corporate Homicide Act 2007 differ from HASAWA prosecution?',
    options: [
      'Stop work immediately, prevent access to the area, isolate the suspect material from disturbance, and report it to the client and duty holder',
      'A digital, accurate, accessible record of building information that supports safe design, construction and ongoing management of HRRBs',
      'To take reasonable care of their own health and safety and that of others affected by their acts or omissions, and cooperate with the employer',
      'It targets the organisation as a whole where a gross breach of duty causes death and substantially involves senior management — focuses on culture, not individuals',
    ],
    correctAnswer: 3,
    explanation:
      'The 2007 Act allows prosecution of an organisation where its activities causing death amount to a gross breach and senior management failure was a substantial element. It targets corporate culture, not individuals — and carries unlimited fines plus publicity orders.',
    section: '1.10',
    topic: 'Supervisor Responsibilities',
    difficulty: 'advanced',
  },
  {
    id: 236,
    question: 'Under MHSWR 1999 Reg 3, what is the employer\'s risk assessment duty?',
    options: [
      'A suitable and sufficient assessment of risks to employees and others affected by their work, recorded if 5+ employees, reviewed when significant changes occur',
      'A statutory cost recovery scheme charging a hourly fee for HSE inspector time spent identifying and helping to address material breaches of H&S law',
      'Effective arrangements for the planning, organisation, control, monitoring and review of preventive and protective measures — recorded by employers with 5+ employees',
      'Avoid hazardous manual handling so far as is reasonably practicable; assess what cannot be avoided; reduce risk to lowest level reasonably practicable',
    ],
    correctAnswer: 0,
    explanation:
      'Management of Health and Safety at Work Regulations 1999 Reg 3 requires a "suitable and sufficient" risk assessment. Significant findings must be recorded by employers with 5 or more workers, and the assessment reviewed when there is reason to suspect it\'s no longer valid.',
    section: '1.10',
    topic: 'Supervisor Responsibilities',
    difficulty: 'intermediate',
  },
  {
    id: 237,
    question: 'Under MHSWR Reg 5, what arrangements must employers have in place?',
    options: [
      'Improvement notices give time to remedy a contravention; prohibition notices stop activities involving serious risk immediately',
      'Effective arrangements for the planning, organisation, control, monitoring and review of preventive and protective measures — recorded by employers with 5+ employees',
      'Plan, manage and monitor construction work under their control so it is carried out without risks to health and safety, and provide site-specific induction',
      'Reject the RAMS, require it to be revised to address ACMs based on the duty holder\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s register/survey, and verify it before allowing the subcontractor on site',
    ],
    correctAnswer: 1,
    explanation:
      'MHSWR Reg 5 requires employers to have effective arrangements for the planning, organisation, control, monitoring and review of their preventive and protective measures (the "POCMR" wheel). Like Reg 3, they must be recorded if 5+ workers.',
    section: '1.10',
    topic: 'Supervisor Responsibilities',
    difficulty: 'intermediate',
  },
  {
    id: 238,
    question: 'Under MHSWR Schedule 1, what are the general principles of prevention?',
    options: [
      'Managing the risk from ACMs in non-domestic premises — finding them, recording them, assessing risk, planning management, and providing the information to anyone liable to disturb them',
      'Stop the activity, formally re-brief the requirement and consequences (employee duty under HASAWA s.7 and PUWER), document refusal, and apply the company disciplinary procedure if continued',
      'Avoid risks; evaluate unavoidable risks; combat at source; adapt work to the individual; adapt to technical progress; replace dangerous with less dangerous; develop coherent prevention policy; collective over individual measures; instruct workers',
      'A file containing information needed to manage health and safety during future construction, maintenance and demolition — handed to the client at project end and kept by them for the life of the structure',
    ],
    correctAnswer: 2,
    explanation:
      'MHSWR Schedule 1 lists 9 principles in order — avoid, evaluate, combat at source, adapt to individual, follow technical progress, replace, prevention policy, collective measures over individual (PPE), instructions. PPE is the LAST resort, not the first.',
    section: '1.10',
    topic: 'Supervisor Responsibilities',
    difficulty: 'advanced',
  },
  {
    id: 239,
    question: 'A worker refuses to wear safety glasses during drilling overhead. As supervisor what is your response?',
    options: [
      'A file containing information needed to manage health and safety during future construction, maintenance and demolition — handed to the client at project end and kept by them for the life of the structure',
      'To locate and describe all asbestos-containing materials before refurbishment or demolition, so they can be removed before work starts',
      'Continuous mental reassessment of changing site conditions — new hazards, changing weather, fatigue, time pressure — adapting controls in real time and stopping work if needed',
      'Stop the activity, formally re-brief the requirement and consequences (employee duty under HASAWA s.7 and PUWER), document refusal, and apply the company disciplinary procedure if continued',
    ],
    correctAnswer: 3,
    explanation:
      'PPE refusal is an employee breach of HASAWA s.7. As supervisor you must stop the work, re-brief, document and (if persistent) escalate disciplinary action. Continuing while a worker refuses leaves both you and the company exposed to enforcement.',
    section: '1.10',
    topic: 'Supervisor Responsibilities',
    difficulty: 'intermediate',
  },
  {
    id: 240,
    question: 'Under PUWER 1998 Reg 4, what duty does an employer have for work equipment?',
    options: [
      'Ensure equipment is suitable for purpose, used only by trained and competent persons, maintained, inspected, with controls, isolation, stability and lighting',
      'A document providing information about a hazardous substance including hazards, handling, and emergency measures',
      'To locate and describe all asbestos-containing materials before refurbishment or demolition, so they can be removed before work starts',
      'Licensable = highest risk, requires HSE licence; NNLW = sporadic/low intensity but still requires notification, training, medicals, records; Non-licensed = lowest risk asbestos work with limited controls',
    ],
    correctAnswer: 0,
    explanation:
      'PUWER 1998 covers all work equipment from drills to plant. Reg 4 (suitability) plus the regs covering training, maintenance, inspection, controls, isolation and protection apply. Supervisors must verify all are in place — paperwork alone is not enough.',
    section: '1.10',
    topic: 'Supervisor Responsibilities',
    difficulty: 'intermediate',
  },
  {
    id: 241,
    question: 'Under Working at Height Regulations 2005, what is the order of priority for managing falls?',
    options: [
      'To coordinate matters relating to health and safety and ensure designers cooperate, share information and apply the general principles of prevention',
      'Avoid the work at height; if unavoidable, use work equipment that prevents falls; if not possible, use work equipment that minimises distance and consequences of falls — fall arrest is last',
      'Refuse to start until the client confirms in writing whether ACMs are present in the area you\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'ll disturb, or commissions an appropriate survey',
      'Culpability (very high to low), seriousness of harm risked, likelihood of harm, plus the offender\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s turnover and aggravating/mitigating factors',
    ],
    correctAnswer: 1,
    explanation:
      'WAHR 2005 follows the prevention hierarchy. First avoid; then prevent (e.g. scaffold, MEWP with edge protection); then minimise (collective measures like nets); only then personal fall arrest. PPE/harness is last — not the default.',
    section: '1.10',
    topic: 'Supervisor Responsibilities',
    difficulty: 'advanced',
  },
  {
    id: 242,
    question: 'A scaffold tag is missing on a tower delivered to your site this morning. As supervisor what do you do?',
    options: [
      'Appropriate to the complexity of the task and identifies significant risks without being overly complicated',
      'The injury must be caused by work activity, conditions created by work, or the manner of conducting the work',
      'Quarantine the tower and refuse use until a competent person inspects and tags it under WAHR 2005 / PASMA — log the incident',
      'A hazard is something with potential to cause harm; risk is the likelihood of harm occurring',
    ],
    correctAnswer: 2,
    explanation:
      'Working at height equipment must be inspected before use. A missing tag means it cannot be verified as safe — quarantine it, get a competent inspection (PASMA-trained where applicable), and log the failure for follow-up with the supplier.',
    section: '1.10',
    topic: 'Supervisor Responsibilities',
    difficulty: 'intermediate',
  },
  {
    id: 243,
    question: 'Under the Manual Handling Operations Regulations 1992, what is the order of duties on the employer?',
    options: [
      'A suitable and sufficient assessment of risks to employees and others affected by their work, recorded if 5+ employees, reviewed when significant changes occur',
      'Ensure equipment is suitable for purpose, used only by trained and competent persons, maintained, inspected, with controls, isolation, stability and lighting',
      'Continuous mental reassessment of changing site conditions — new hazards, changing weather, fatigue, time pressure — adapting controls in real time and stopping work if needed',
      'Avoid hazardous manual handling so far as is reasonably practicable; assess what cannot be avoided; reduce risk to lowest level reasonably practicable',
    ],
    correctAnswer: 3,
    explanation:
      'MHOR 1992 follows a three-step hierarchy — Avoid, Assess, Reduce. Reduction can include mechanical aids, redesign, splitting loads, team handling, and training. Assessment must consider task, individual, load and environment (TILE).',
    section: '1.10',
    topic: 'Supervisor Responsibilities',
    difficulty: 'intermediate',
  },
  {
    id: 244,
    question: 'Under the Control of Noise at Work Regulations 2005, what are the lower and upper exposure action values?',
    options: [
      'Lower 80 dB(A) daily/weekly exposure with peak 135 dB(C); upper 85 dB(A) with peak 137 dB(C); exposure limit 87 dB(A) with peak 140 dB(C)',
      'A suitable and sufficient assessment of risks to employees and others affected by their work, recorded if 5+ employees, reviewed when significant changes occur',
      'Intentionally or recklessly interfering with or misusing anything provided for health, safety or welfare',
      'Regularly and when there\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s reason to believe it\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s no longer valid, or when work conditions change',
    ],
    correctAnswer: 0,
    explanation:
      'CNWR 2005 sets a lower action value of 80 dB(A), upper of 85 dB(A) (where hearing protection becomes mandatory and zones must be marked), and a personal exposure limit of 87 dB(A) at the ear (factoring in hearing protection).',
    section: '1.10',
    topic: 'Supervisor Responsibilities',
    difficulty: 'advanced',
  },
  {
    id: 245,
    question: 'Under the Control of Vibration at Work Regulations 2005, what are the daily exposure action and limit values for hand-arm vibration?',
    options: [
      'Acute toxicity - can cause death or serious harm with short exposure',
      'Action value 2.5 m/s² A(8); limit value 5 m/s² A(8) — over which exposure is prohibited',
      'Specify requirements for maintaining a clean, tidy workspace and waste disposal',
      'Every part of a system shall be protected from excess current',
    ],
    correctAnswer: 1,
    explanation:
      'CVAWR 2005 sets a daily exposure action value of 2.5 m/s² A(8), at which controls must start, and a daily exposure limit value of 5 m/s² A(8) above which exposure must not occur. Risk assessment must consider trigger time and tool emission data.',
    section: '1.10',
    topic: 'Supervisor Responsibilities',
    difficulty: 'advanced',
  },
  {
    id: 246,
    question: 'What is the dynamic risk assessment that supervisors are expected to do continuously on site?',
    options: [
      'Refuse to start. Inform the client in writing that under CAR 2012 Reg 4 they have a duty to manage asbestos and provide the information; without it the work cannot proceed safely or lawfully',
      'A file containing information needed to manage health and safety during future construction, maintenance and demolition — handed to the client at project end and kept by them for the life of the structure',
      'Continuous mental reassessment of changing site conditions — new hazards, changing weather, fatigue, time pressure — adapting controls in real time and stopping work if needed',
      'Management survey identifies ACMs likely to be disturbed in normal use; R&D survey is fully intrusive and locates all ACMs prior to refurbishment or demolition',
    ],
    correctAnswer: 2,
    explanation:
      'Written RAMS sets the baseline; dynamic risk assessment is the supervisor\'s continuous duty to monitor changing conditions and adjust. New trades arriving, weather change, equipment failure, fatigue — any of these can trigger a stop or revision.',
    section: '1.10',
    topic: 'Supervisor Responsibilities',
    difficulty: 'advanced',
  },
  {
    id: 247,
    question: 'You are tasked with toolbox-talking a brand new safe-isolation procedure. What makes the briefing effective?',
    options: [
      'Refuse to start until the client confirms in writing whether ACMs are present in the area you\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'ll disturb, or commissions an appropriate survey',
      'No person shall work on or near live conductors unless unreasonable to dead, reasonable to work live, and suitable precautions taken',
      'Management survey identifies ACMs likely to be disturbed in normal use; R&D survey is fully intrusive and locates all ACMs prior to refurbishment or demolition',
      'Cover purpose, scope, step-by-step procedure, equipment required, hazards if not followed, individual responsibilities, allow questions, get signed acknowledgement, and check understanding',
    ],
    correctAnswer: 3,
    explanation:
      'Effective toolbox talks are interactive — purpose, scope, steps, equipment, consequences, responsibilities. Allow questions, check understanding (don\'t just ask "any questions?"), and get acknowledgement signatures. Briefing without comprehension is not training.',
    section: '1.10',
    topic: 'Supervisor Responsibilities',
    difficulty: 'intermediate',
  },
  {
    id: 248,
    question: 'Under Section 3 of HASAWA, what duty does an employer owe to people who are NOT their employees?',
    options: [
      'To conduct their undertaking so as to ensure, so far as is reasonably practicable, that persons not in their employment are not exposed to risks to their health or safety',
      'They must have, or organisations must ensure they have, the skills, knowledge, training and experience appropriate to their role — and behavioural capability',
      'Refuse to start. Inform the client in writing that under CAR 2012 Reg 4 they have a duty to manage asbestos and provide the information; without it the work cannot proceed safely or lawfully',
      'Personal exposure records for at least 40 years and health surveillance records, with workers having access to their own records',
    ],
    correctAnswer: 0,
    explanation:
      'HASAWA s.3 extends the employer\'s duty to anyone affected by the work — clients, the public, other contractors, visitors. It is the basis for many prosecutions where work harms a non-employee. Self-employed have an equivalent s.3(2) duty.',
    section: '1.10',
    topic: 'Supervisor Responsibilities',
    difficulty: 'advanced',
  },
  {
    id: 249,
    question: 'A serious incident has just happened on your site — an electrician suffers a flash burn during fault-finding on live equipment. As supervisor, what is your immediate sequence of actions?',
    options: [
      'Avoid risks; evaluate unavoidable risks; combat at source; adapt work to the individual; adapt to technical progress; replace dangerous with less dangerous; develop coherent prevention policy; collective over individual measures; instruct workers',
      'Make safe (isolate hazard), administer first aid / call emergency services, preserve the scene, notify employer and client, secure witnesses, report under RIDDOR if applicable, start investigation',
      'Continuous mental reassessment of changing site conditions — new hazards, changing weather, fatigue, time pressure — adapting controls in real time and stopping work if needed',
      'Refuse to start. Inform the client in writing that under CAR 2012 Reg 4 they have a duty to manage asbestos and provide the information; without it the work cannot proceed safely or lawfully',
    ],
    correctAnswer: 1,
    explanation:
      'After casualty care comes scene preservation. As supervisor you must isolate the hazard, get medical help, preserve evidence (HSE may attend), notify upwards, secure witness statements before memories fade, RIDDOR-report if specified-injury or 7-day absence, and trigger investigation.',
    section: '1.10',
    topic: 'Supervisor Responsibilities',
    difficulty: 'advanced',
  },
  {
    id: 250,
    question: 'Looking at HSE prosecution data, what is consistently the most common cause of electrical fatalities in the workplace?',
    options: [
      'A committee where employers and employee representatives discuss and review health and safety measures',
      'Information about the project, including known hazards, that the client must provide to designers and contractors as soon as practicable',
      'Working on or near live equipment without adequate isolation or precautions — a failure to apply EAWR Reg 14 and proven safe-isolation procedure',
      'No person shall work on or near live conductors unless unreasonable to dead, reasonable to work live, and suitable precautions taken',
    ],
    correctAnswer: 2,
    explanation:
      'HSE data and the IET Wiring Regulations consistently show working live or with inadequate isolation as the dominant cause of workplace electrical fatalities. EAWR Reg 14 effectively presumes work shall be dead unless live work is justified, planned, and supervised.',
    section: '1.10',
    topic: 'Supervisor Responsibilities',
    difficulty: 'advanced',
  },
];

// ============================================================================
// Helper functions
// ============================================================================

const DEFAULT_WEIGHTS = { basic: 0.4, intermediate: 0.45, advanced: 0.15 };

/**
 * Get random questions weighted by difficulty.
 * Default weights: 40% basic, 45% intermediate, 15% advanced.
 */
export const getRandomQuestions = (
  count: number = 60,
  weights: { basic: number; intermediate: number; advanced: number } = DEFAULT_WEIGHTS
): QuestionBank[] => {
  const basic = module1Questions.filter((q) => q.difficulty === 'basic');
  const intermediate = module1Questions.filter((q) => q.difficulty === 'intermediate');
  const advanced = module1Questions.filter((q) => q.difficulty === 'advanced');

  const targetBasic = Math.round(count * weights.basic);
  const targetInter = Math.round(count * weights.intermediate);
  const targetAdvanced = count - targetBasic - targetInter;

  const pickFrom = (pool: QuestionBank[], n: number): QuestionBank[] => {
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(n, shuffled.length));
  };

  const selected = [
    ...pickFrom(basic, targetBasic),
    ...pickFrom(intermediate, targetInter),
    ...pickFrom(advanced, targetAdvanced),
  ];

  // If we couldn't fill (e.g. pool too small), top up from any difficulty
  if (selected.length < count) {
    const remaining = module1Questions.filter((q) => !selected.includes(q));
    const topUp = pickFrom(remaining, count - selected.length);
    selected.push(...topUp);
  }

  // Final shuffle so difficulty isn't grouped
  return selected.sort(() => Math.random() - 0.5);
};

/** Filter questions by section code (e.g. '1.1', '2.3'). */
export const getQuestionsBySection = (section: string): QuestionBank[] => {
  return module1Questions.filter((q) => q.section === section);
};

/** Filter questions by difficulty band. */
export const getQuestionsByDifficulty = (
  difficulty: 'basic' | 'intermediate' | 'advanced'
): QuestionBank[] => {
  return module1Questions.filter((q) => q.difficulty === difficulty);
};

/** Filter questions by topic name. */
export const getQuestionsByTopic = (topic: string): QuestionBank[] => {
  return module1Questions.filter((q) => q.topic === topic);
};

/**
 * Validate the question bank for structural integrity.
 * Returns { isValid, errors[] } — used by tests/spot-checks.
 */
export const validateQuestionBank = (): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  const seenIds = new Set<number>();

  module1Questions.forEach((q, idx) => {
    if (typeof q.id !== 'number') errors.push(`Q[${idx}]: id must be a number`);
    if (seenIds.has(q.id)) errors.push(`Q[${idx}]: duplicate id ${q.id}`);
    seenIds.add(q.id);
    if (!q.question || typeof q.question !== 'string') errors.push(`Q${q.id}: question text missing`);
    if (!Array.isArray(q.options) || q.options.length < 2) errors.push(`Q${q.id}: options must have at least 2 entries`);
    if (typeof q.correctAnswer !== 'number' || q.correctAnswer < 0 || q.correctAnswer >= (q.options?.length || 0))
      errors.push(`Q${q.id}: correctAnswer index out of range`);
    if (!q.explanation || typeof q.explanation !== 'string') errors.push(`Q${q.id}: explanation missing`);
    if (!q.section || typeof q.section !== 'string') errors.push(`Q${q.id}: section missing`);
    if (!q.topic || typeof q.topic !== 'string') errors.push(`Q${q.id}: topic missing`);
    if (!['basic', 'intermediate', 'advanced'].includes(q.difficulty as string))
      errors.push(`Q${q.id}: difficulty invalid`);
  });

  return { isValid: errors.length === 0, errors };
};

export default module1Questions;
