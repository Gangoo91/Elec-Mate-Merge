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
      'Only their own directly employed full-time staff',
      'Only employees who have completed an induction',
      'Only agency workers and labour-only subcontractors',
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
      'Working overtime without prior written authorisation from a manager',
      'Intentionally or recklessly interfering with or misusing anything provided for health, safety or welfare',
      'Refusing to attend a health and safety committee meeting',
      'Bringing personal tools onto site without registering them first',
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
      'A written disciplinary and grievance procedure',
      'A signed contract of employment for each worker',
      'Written health and safety policy',
      'A public liability insurance certificate displayed on site',
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
      'To dismiss employees who breach safety rules on the spot',
      'To impose on-the-spot fixed-penalty fines payable in cash',
      'To revoke an electrician\'s competent-person scheme membership',
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
      'Improvement notices stop activities immediately; prohibition notices give time to remedy a contravention',
      'Improvement notices apply only to employers; prohibition notices apply only to employees',
      'Improvement notices carry an automatic fine; prohibition notices are advisory only',
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
      'Only the company as a legal entity, never any individual',
      'Only the appointed health and safety officer or adviser',
      'Directors, managers, and other officers if the offence was committed with their consent, connivance, or neglect',
      'Only shareholders holding more than 25% of the company',
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
      'A copy of the company\'s annual financial accounts',
      'Written confirmation of their pension contributions',
      'The contact details of the local enforcing authority only',
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
      'The general duty of employees to take reasonable care',
      'The prohibition on charging employees for safety provision',
      'The duties of manufacturers and suppliers of work articles',
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
      'The local authority environmental health department',
      'The Health and Safety Executive (HSE)',
      'The competent person scheme operator (e.g. NICEIC)',
      'The Health and Safety Commission policy board',
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
      'Any person over the age of 18 employed on the site',
      'A person who holds a current first aid certificate',
      'A person with sufficient training, knowledge, experience and other qualities to properly assist',
      'A person formally appointed in writing by the HSE',
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
      'Rates of pay and overtime allowances for hazardous work',
      'The choice of company providing site welfare facilities',
      'The selection of subcontractors for the project',
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
      'To provide a lifetime free repair warranty on every article',
      'To register every article sold with the enforcing authority',
      'To indemnify the employer against any prosecution arising from use',
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
      "To record every accident that has occurred at the workplace",
      "To set out the organisation's commitment and arrangements for managing health and safety",
      "To list the names and home addresses of all employees",
      "To detail the company's terms of business with its clients",
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
      'Only once, when the business is first established',
      'Strictly every five years and at no other time',
      'Only after the HSE has issued an improvement notice',
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
      "An employee's personal liability for the acts of their employer",
      "The liability of a client for the acts of their main contractor",
      "The shared liability of all directors regardless of fault",
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
      'Report a hazard directly to the HSE without telling their employer',
      'Interfere with or misuse anything provided for health and safety',
      'Refuse to carry out a task they consider unsafe',
      'Use their own personal protective equipment instead of the employer\'s',
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
      'A ranking of staff seniority used to decide who supervises whom',
      'A prioritised approach: PPE, administrative controls, engineering controls, substitution, elimination',
      'A prioritised approach: eliminate, substitute, engineering controls, administrative controls, PPE',
      'A list of legislation in order of when it was enacted',
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
      'Completing work as quickly as the client demands',
      'Carrying out the legal minimum and nothing more',
      'Delegating all safety responsibility to a subcontractor',
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
      'A manager appointed by the employer to enforce safety rules on staff',
      'An HSE inspector assigned to monitor a particular site',
      'An external consultant hired to write the risk assessments',
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
      'Issue prohibition notices and prosecute the employer for breaches',
      'Investigate hazards, complaints, accidents; inspect workplace; represent employees; receive HSE information',
      'Dismiss employees who repeatedly ignore safety instructions',
      'Set the company health and safety budget for the year',
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
      'A panel of HSE inspectors who audit the workplace annually',
      'A board of directors who sign off the company safety policy',
      'A committee where employers and employee representatives discuss and review health and safety measures',
      'A group of external consultants who write the risk assessments',
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
      'Whenever the workforce exceeds five employees',
      'Only when directed to do so by an HSE inspector',
      'Automatically on every construction site over £1m in value',
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
      'A voluntary commitment set out in a company\'s safety policy',
      'A recommendation contained in industry guidance only',
      'A duty that applies solely to self-employed persons',
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
      'A legally binding regulation that must be followed exactly as written',
      'Guidance with special legal status - failure to follow can be used as evidence of non-compliance',
      'An internal company procedure with no legal standing',
      'A British Standard that applies only to electrical installations',
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
      "Absolute duties apply to employers; qualified duties apply only to employees",
      "Absolute duties are voluntary; qualified duties are legally enforceable",
      "Absolute duties must be complied with; qualified duties are subject to 'reasonably practicable'",
      "Absolute duties are subject to 'reasonably practicable'; qualified duties are not",
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
      'The maximum voltage at which live working is permitted',
      'The frequency of periodic inspection and testing of installations',
      'The requirement to display warning notices at every isolator',
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
      'Any voltage exceeding 230V regardless of the consequences',
      'Risk of injury from electric shock, burns, fire, or explosion arising from electricity',
      'The presence of exposed live conductors only, not other hazards',
      'Financial loss to the employer arising from equipment failure',
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
      'That all live working is prohibited under every circumstance',
      'That only qualified electricians may enter an electrical workplace',
      'All systems shall be constructed to prevent danger so far as is reasonably practicable',
      'That every circuit is tested at intervals not exceeding 12 months',
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
      'The strength and capability of electrical equipment',
      'Earthing and integrity of referenced conductors',
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
      'That isolation may only be carried out by an authorised manager',
      'That every isolator is colour-coded according to its voltage',
      'That circuits are re-energised within four hours of isolation',
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
      'Live working is permitted provided two competent persons are present',
      'No person shall work on or near live conductors unless unreasonable to dead, reasonable to work live, and suitable precautions taken',
      'Live working is allowed on any circuit below 230V without precautions',
      'Live working is entirely prohibited in all workplaces without exception',
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
      'A recognised apprenticeship completed within the last five years',
      'Membership of an approved competent person scheme',
      'Technical knowledge and experience to prevent danger and injury',
      'A minimum of ten years\' experience in electrical installation',
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
      'Equipment shall be tested for insulation resistance before every use',
      'Equipment shall carry a manufacturer\'s lifetime guarantee',
      'Equipment shall be replaced every five years regardless of condition',
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
      'Equipment must be switched off whenever the weather is wet',
      'Equipment must be used only indoors and never outdoors',
      'Equipment must be earthed only when used in damp locations',
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
      'Means for cutting off the supply and isolation',
      'Insulation, protection and placing of conductors',
      'The competence of persons carrying out electrical work',
      'Adequate working space, access and lighting',
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
      'Earthing is required only on circuits operating above 1000V',
      'Earth conductors must be replaced at every periodic inspection',
      'Suitable precautions shall be taken to prevent danger from charge on exposed metalwork, preferably by earthing',
      'Only the supply company may install or alter an earthing arrangement',
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
      'All circuits must be protected by a 30mA residual current device',
      'Every joint must be soldered rather than mechanically clamped',
      'Connections may only be made by the original equipment manufacturer',
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
      'Only the main supply intake needs protection from excess current',
      'Excess current protection is required only on lighting circuits',
      'Protection is needed only where the supply exceeds 100A',
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
      'Protection against excess current is only required at the supply origin',
      'Suitable means shall be available for protecting from excess current and for cutting off supply in an emergency',
      'Emergency switching must be lockable in the closed position only',
      'A single main switch is sufficient for an entire multi-storey building',
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
      'Working on equipment switched off but not isolated from supply',
      'Working only outside normal business hours when the site is empty',
      'Working on electrical systems that have been safely isolated from all sources of supply',
      'Working on equipment that has reached the end of its service life',
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
      'Switch off at the main switch and begin work immediately',
      'Obtain verbal permission from the client to start work',
      'Confirm the circuit is live by touching it with the back of the hand',
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
      'Only the fixed wiring of an installation, excluding any equipment',
      'Only equipment operating above 1000V connected to a common supply',
      'Any documented method of recording electrical test results',
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
      'Only qualified electricians registered with a competent person scheme',
      'All employers, employees, and self-employed persons who work with or near electricity',
      'Only employers operating equipment above low-voltage levels',
      'Only contractors carrying out new electrical installation work',
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
      'That the work was carried out by a subcontractor, not directly',
      'That the duty holder was unaware of the regulation in question',
      'All reasonable steps were taken and all due diligence exercised to avoid the commission of the offence',
      'That no actual injury or damage resulted from the breach',
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
      'Not exceeding 50V AC or 120V DC under any condition',
      'Exceeding 1000V AC or 1500V DC between conductors',
      'Any voltage between 230V and 400V only',
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
      'Equipment must be calibrated by the manufacturer every month',
      'Equipment must be no more than two years old at time of use',
      'Equipment must be PAT tested before each individual measurement',
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
      'The maximum number of circuits permitted on one distribution board',
      'Safe use of electrical test equipment',
      'The procedure for safely isolating a high-voltage supply',
      'The earthing requirements for portable generators',
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
      'Bare metal tips at least 10mm long for reliable contact',
      'Uninsulated leads colour-coded brown, blue and green',
      'Finger barriers, insulated tips with maximum 4mm exposed, and HRC fused leads',
      'Retractable spikes for piercing cable insulation during testing',
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
      'Means for cutting off the supply and isolation',
      'Insulation and protection of conductors',
      'The competence of persons doing electrical work',
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
      'Within 15 days of the incident in all cases',
      'Without delay (immediately) by quickest practicable means',
      'Within 28 days, in writing only',
      'At the next routine HSE inspection visit',
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
      'A minor cut requiring a plaster from the first aid kit',
      'A sprained ankle keeping the worker off for two days',
      'Fracture (other than fingers, thumbs, or toes)',
      'A bruise sustained from a dropped tool',
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
      'Any injury keeping a worker in hospital for more than 7 days',
      'An injury causing more than 7 days of permanent disability',
      'Incapacity for normal work duties for more than 7 working hours',
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
      'Within 24 hours of the accident',
      'Within 10 days of the accident',
      'Within 30 days of the accident',
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
      'A worker taking an unauthorised break during a shift',
      'Collapse or overturning of lifting equipment, or electrical short circuit causing fire',
      'A tool failing to start due to a flat battery',
      'A minor spillage of water cleaned up immediately',
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
      'To compensate injured workers for time lost from work',
      'To set the maximum penalties for health and safety offences',
      'To enable HSE and local authorities to identify workplace risks and investigate serious accidents',
      'To require employers to provide first aid facilities on site',
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
      'The injured worker themselves once they have recovered',
      'The first aider who treated the casualty at the scene',
      'The HSE inspector assigned to the geographical area',
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
      'By recording the incident in the workplace accident book only',
      'By posting a written F2508 form to the local council',
      'By email directly to the assigned HSE inspector',
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
      'Seasonal influenza, the common cold, and food poisoning',
      'Carpal tunnel syndrome, occupational dermatitis, occupational asthma, and hand-arm vibration syndrome',
      'High blood pressure, diabetes, and heart disease',
      'Stress, anxiety, and general fatigue from long shifts',
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
      'At least 6 months from the date of the incident',
      'At least 1 year from the date of the incident',
      'At least 3 years from the date of the incident',
      'At least 10 years from the date of the incident',
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
      'Only accidents that are reportable under RIDDOR',
      'Only accidents resulting in more than 7 days off work',
      'Only accidents that occur to members of the public',
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
      'A fixed penalty notice capped at £5,000 with no custodial option',
      'A formal HSE caution only, with no fine or imprisonment',
      'A maximum fine of £20,000 but no possibility of imprisonment',
    ],
    correctAnswer: 0,
    explanation:
      'Failing to report under RIDDOR is a criminal offence prosecuted under HSWA 1974. On indictment it can result in an unlimited fine and imprisonment for up to 2 years.',
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
      'Any gas appliance that fails its annual service inspection',
      'A gas meter reading higher than the previous quarter',
      'Accidental leakage of gas causing death/injury or posing an immediate risk',
      'The replacement of a gas appliance with an electric one',
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
      'A circuit breaker tripping under normal overload conditions',
      'A lamp failing at the end of its rated life',
      'A minor static shock from touching a metal handrail',
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
      'The injured person\'s salary and employment history',
      'A full risk assessment for every task on the site',
      'The names and addresses of all witnesses to the incident',
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
      'Only amputation of an arm or a leg, not digits',
      'Any amputation including fingers, toes, or limbs',
      'Only amputations requiring an overnight hospital stay',
      'Only amputations caused by machinery, not hand tools',
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
      'No report is needed once the initial 15 days have passed',
      'The injury is recorded in the accident book but never reported to HSE',
      'Report as soon as you become aware the injury meets the criteria, within 15 days of becoming aware',
      'The reporting duty transfers to the injured worker after 7 days',
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
      'Yes, all road accidents involving a work vehicle are reportable',
      'Yes, but only if the driver was exceeding the speed limit',
      'No, road accidents are never reportable under any circumstances',
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
      'Permanently unable to return to any form of employment',
      'Admitted to hospital for treatment regardless of work ability',
      'Unable to attend work but still able to perform their normal duties',
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
      'Any minor burn requiring a dressing from the first aid kit',
      'A burn or scald covering more than 10% of the body or causing damage to eyes, respiratory system or vital organs',
      'A sunburn sustained while working outdoors in summer',
      'A burn covering less than 1% of the body surface',
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
      'The injury must have occurred during contracted working hours only',
      'The injury must have happened on the employer\'s own premises only',
      'The injury must be caused by work activity, conditions created by work, or the manner of conducting the work',
      'The injury must have been witnessed by at least one other person',
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
      'A 24-hour emergency line for summoning ambulances to a site',
      'A helpline giving free legal advice to injured workers',
      'A drop-in centre where inspectors take written witness statements',
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
      'Clear away all equipment and tidy the scene before help arrives',
      'Wait for the HSE inspector to arrive before doing anything',
      'Move the casualty immediately regardless of their injuries',
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
      'Inert building rubble awaiting removal from site',
      'Sealed lead-acid batteries in normal storage',
      'Solvents, chemicals, dusts, fumes, and biological agents',
      'Cold drinking water supplied to the welfare area',
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
      'Notify the local fire service of the substances held',
      'Obtain written consent from each employee to use them',
      'Register the substances with the Environment Agency',
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
      'A certificate confirming a substance has passed a quality check',
      'A purchase invoice listing the cost of the substances supplied',
      'A record of who has been issued PPE on the site',
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
      'The maximum number of workers allowed in a confined space',
      'The maximum concentration of an airborne substance averaged over a reference period',
      'The longest time a worker may handle a substance in one shift',
      'The minimum ventilation rate required in any workplace',
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
      'A skull and crossbones on a white diamond',
      'A flame above a horizontal line',
      'Hand being corroded and surface being attacked',
      'An exclamation mark on a white diamond',
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
      'Issuing respiratory protective equipment to all workers',
      'Providing health surveillance for exposed employees',
      'Installing local exhaust ventilation at the work area',
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
      'For every employee on the payroll, regardless of exposure',
      'When exposure cannot be adequately controlled and specific health conditions can be identified',
      'Only after a worker has already developed an illness',
      'Only when requested in writing by the employee',
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
      'A general-purpose fan that circulates fresh air around the room',
      'A respirator worn by the worker to filter inhaled air',
      'An engineering control that captures airborne contaminants at source before they spread',
      'An alarm that sounds when airborne contaminant levels rise too high',
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
      'At least every 6 months without exception',
      'At least every 3 years, or as specified in COSHH Schedule 4',
      'Only when a fault is suspected or reported',
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
      'A hard hat, hi-vis vest, and steel-toe-capped boots only',
      'Hearing protection and a dust mask rated FFP1',
      'An arc-rated face shield and insulating rubber gloves',
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
      'To calculate the cost of disposing of hazardous waste',
      'To identify hazards, who might be harmed, evaluate risks, and determine control measures',
      'To record which workers have been issued with PPE',
      'To set the price of substances purchased from suppliers',
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
      'Hearing, sight, and touch only',
      'Through the bloodstream from a previous injury only',
      'Inhalation, skin absorption, ingestion, and injection',
      'Only by direct swallowing of the substance',
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
      'Only the names of the substances and their purchase price',
      'Only the supplier\'s contact details and delivery dates',
      'Only the quantity of each substance held in storage',
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
      "Only once when the substance is first introduced to the workplace",
      "Strictly every five years and at no other interval",
      "Only after an enforcement notice has been served by the HSE",
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
      'The price and supplier of the substance',
      'The type of hazard posed by the substance',
      'The date the substance was manufactured',
      'The correct disposal route for empty containers',
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
      'A substance that is corrosive to metal and skin',
      'A substance that is harmful to the aquatic environment',
      'Acute toxicity - can cause death or serious harm with short exposure',
      'A substance that is a mild skin or eye irritant only',
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
      'A substance that is highly flammable',
      'A substance that can cause death from a single exposure',
      'A substance that is explosive under heat or pressure',
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
      "'Caution' or 'Notice' indicating the disposal method",
      "'Toxic' or 'Corrosive' naming the exact chemical hazard",
      "'Stop' or 'Go' indicating whether the substance may be used",
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
      'Handling statements giving the recommended storage temperature',
      'Hazard statements describing the nature of the hazard',
      'History statements listing previous owners of the container',
      'Health statements naming a doctor to contact in emergencies',
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
      'Product statements giving the chemical\'s trade name and code',
      'Pricing statements showing the cost per litre of the substance',
      'Precautionary statements advising on handling, storage, and emergency response',
      'Performance statements describing how effective the product is',
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
      'All together in one container to save storage space',
      'In unlabelled containers to prevent theft from site',
      'Next to ignition sources for ease of access during work',
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
      'The purchase cost and supplier details of each substance',
      'The disposal arrangements and waste contractor used',
      'Only the name of the substance, with no further detail',
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
      'Training on manual handling and lifting techniques only',
      'Training on hazards, safe use, control measures, emergency procedures, and PPE use',
      'Training on how to dispose of the substances at end of life only',
      'Training on the financial cost of the substances used',
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
      'Only employers on construction sites are required to assess risks',
      'Risk assessment is recommended good practice but not legally required',
      'All employers must make a suitable and sufficient assessment of risks to employees and others',
      'Only employers with more than 50 employees must assess risks',
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
      'Plan, Do, Check, Act, Repeat',
      'Eliminate, Substitute, Isolate, Control, Protect',
      'Assess, Authorise, Approve, Audit, Archive',
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
      'A hazard is the likelihood of harm; a risk is anything that can cause harm',
      'A hazard applies to people; a risk applies only to equipment',
      'There is no difference; the two terms mean exactly the same thing',
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
      'When the employer has 3 or more employees',
      'When the employer has 5 or more employees',
      'When the employer has 10 or more employees',
      'Only when an HSE inspector requests a written copy',
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
      'It must list every conceivable hazard no matter how trivial',
      'It must be at least ten pages long to be legally acceptable',
      'Appropriate to the complexity of the task and identifies significant risks without being overly complicated',
      'It must be approved and signed off by an HSE inspector',
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
      'Only an external health and safety consultant',
      'Only the most senior director in the company',
      'Only an HSE inspector during a site visit',
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
      'The cost of the equipment and the time taken to complete the task',
      'The number of employees on the payroll and their pay rates',
      'The age of the building and its insurance value',
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
      'A computer-generated assessment produced automatically from a template',
      'Continuous assessment of changing risks while work is in progress',
      'An assessment that is updated only once at the end of each project',
      'An assessment covering several similar tasks across different sites',
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
      'An assessment that applies only to a single unique task on one site',
      'An assessment carried out at the point of work just before starting',
      'A risk assessment that covers common activities across multiple similar situations',
      'An assessment that continuously updates as conditions change',
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
      'Only the risk of electric shock, as it is the sole electrical hazard',
      'Only financial hazards such as the cost of materials',
      'Only hazards to the public, not to the workers themselves',
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
      'Vulnerable workers should simply be excluded from all site work',
      'The same controls apply to everyone, so no special consideration is needed',
      'Only physical disabilities need to be considered, not age or pregnancy',
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
      'Recording which workers have been issued personal protective equipment',
      'Evaluating and prioritising risks by plotting likelihood against severity',
      'Calculating the financial cost of implementing control measures',
      'Listing the legislation that applies to a particular activity',
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
      "Only when the company changes its name or ownership",
      "Strictly every five years and at no other time",
      "Only once, before the work first begins",
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
      'The total risk present before any controls are applied',
      'The risk transferred to a subcontractor by agreement',
      'The risk that only affects members of the public',
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
      'To list the names of everyone who has signed the assessment',
      'To specify actions taken or needed to eliminate or reduce risks',
      'To record the cost of carrying out the assessment',
      'To set out the company\'s overall health and safety policy',
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
      'So that the cost of any compensation claims can be estimated',
      'So that only the most senior staff are given protection',
      'To ensure control measures protect everyone affected including employees, contractors, and public',
      'So that blame can be assigned in advance of any incident',
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
      'An assessment carried out at head office before workers leave',
      'A generic assessment used across many similar sites',
      'A formal written assessment reviewed annually by management',
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
      'Only the personal opinion of the most senior manager',
      'Only the company\'s financial accounts and budget reports',
      'Only the client\'s verbal description of the building',
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
      'A hazard that has actually caused an accident in the past month',
      'A hazard that a competent person could reasonably predict might occur',
      'A hazard that could never realistically be anticipated by anyone',
      'A hazard that only arises from extremely rare freak events',
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
      'By selecting whichever measure is cheapest to put in place',
      'By starting with PPE first and eliminating the hazard only as a last resort',
      'Using the hierarchy of control: eliminate, substitute, engineer, administrate, PPE',
      'By applying every possible control measure at the same time',
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
      'The names and pay rates of every worker on the project',
      'A full list of all legislation in force at the time',
      'The contact details of the local enforcing authority',
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
      'To decide which workers should be disciplined for past incidents',
      'To calculate the insurance premium for the following year',
      'To prove the workplace has never had any accidents',
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
      'Consultation is optional and only needed on construction sites',
      'Workers must be consulted on health and safety matters including risk assessment',
      'Only managers need to be consulted, never the workforce',
      'Consultation is only required after an accident has occurred',
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
      'A broad assessment covering the whole site in general terms',
      'An assessment that applies to every task a company ever does',
      'A detailed assessment focused on a particular activity or operation',
      'An assessment carried out only by an external consultant',
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
      'The age and experience of each individual worker',
      'The brand of tools and equipment being used',
      'The financial budget allocated to the project',
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
      'An informal agreement between workers to look out for each other',
      'A list of all the equipment that must be inspected before use',
      'The set of PPE issued to each worker at the start of a shift',
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
      'Lone working is always prohibited and need not be assessed',
      'Specific consideration of communication, emergency procedures, and additional controls needed',
      'No special consideration is needed as the same controls apply',
      'Only the lone worker\'s pay rate needs to be reviewed',
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
      'Only managers need training; workers do not need to be informed',
      'Workers only need to sign the assessment, not understand it',
      'Workers must understand the risks, control measures, and their responsibilities',
      'Training is only required for those who write the assessments',
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
      'Continue working and note the hazard at the end of the day',
      'Ignore the hazard if the work is nearly finished',
      'Wait until the next scheduled review before acting',
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
      'A document listing only the hazards present on a site',
      'A certificate confirming a worker is competent to do the task',
      'A record of the materials and their cost for a project',
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
      'They are two different names for exactly the same document',
      'The method statement describes how to implement the controls identified in the risk assessment',
      'The risk assessment is written after the method statement is finished',
      'The method statement replaces the need for a risk assessment',
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
      'Only the start and finish dates of the project',
      'Only a list of the legislation that applies to the work',
      'Description of work, sequence of operations, equipment, control measures, responsible persons',
      'Only the cost of the labour and materials required',
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
      'For every single task, however trivial or low-risk',
      'Only after an accident has already happened on site',
      'Never, as a risk assessment alone is always sufficient',
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
      'Any administrative member of staff at head office',
      'A competent person with knowledge of the work, often involving those who will do the task',
      'The client who commissioned the project',
      'An HSE inspector before work is allowed to start',
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
      'By keeping them locked in the site office, unavailable to workers',
      'By emailing them to the client but not to the workforce',
      'Through briefings, toolbox talks, and making them available at the work location',
      'By relying on workers to ask if they want to see them',
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
      'A formal week-long training course leading to a qualification',
      'A meeting to discuss the cost of tools and equipment',
      'A written examination on health and safety legislation',
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
      'A document confirming a worker has the legal right to work in the UK',
      'A licence issued by the local authority to trade as an electrician',
      'A timesheet recording the hours a worker spends on each task',
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
      'Routine office filing and general administrative tasks',
      'Hot work, confined space entry, electrical isolation, working at height on roofs',
      'Sweeping floors and basic site housekeeping',
      'Ordering materials and arranging deliveries to site',
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
      'The worker\'s pay rate, hours worked, and overtime claimed',
      'The cost of materials, labour, and the agreed profit margin',
      'Description of work, hazards, precautions, isolation details, time limits, authorisation signatures',
      'The client\'s contact details and the project completion date only',
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
      'To list the suppliers used for each part of the project',
      'To record how long each worker spent on the task',
      'To set out the price charged for each stage of the work',
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
      'Only the cost of the PPE supplied to workers',
      'Only the brand names of the PPE manufacturers',
      'A general note that "PPE must be worn at all times"',
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
      'They should be left out, as emergencies cannot be predicted',
      'Include specific emergency actions, evacuation routes, emergency contacts, and first aid arrangements',
      'A simple note to "call 999 in an emergency" is sufficient',
      'They should only be added after an incident has occurred',
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
      'The number of breaks a supervisor is entitled to take',
      'The salary and benefits package of the site supervisor',
      'Level and type of supervision needed, who the supervisor is, and their responsibilities',
      'The disciplinary record of the supervisor in question',
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
      'A weekly meeting held in the site office for all managers',
      'A written report submitted to the client after work finishes',
      'A formal training course completed before joining the site',
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
      'Carry on with the original plan regardless of the change',
      'Make the change but update the paperwork only at the end of the job',
      'Allow each worker to decide individually how to adapt',
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
      'To sign the document without reading its contents',
      'Ensuring work is planned, supervised, and carried out safely by people with appropriate skills',
      'To approve the project budget and order materials',
      'To negotiate the contract price with the client',
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
      'Only the purchase price of each item of equipment',
      'Only the name of the hire company supplying the equipment',
      'Equipment needed, inspection requirements, safe use procedures, and any specific limitations',
      'Only the serial numbers of the equipment for insurance',
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
      'Each trade should work independently and ignore the others',
      'Interface risks are the sole responsibility of the client',
      'They should only be considered after a conflict has occurred',
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
      'Only the final invoice issued to the client',
      'Only the names of the workers who were on site',
      'Only the delivery notes for materials used',
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
      'A full rewrite of the method statement after the work is done',
      'A summary of key points from the method statement communicated to workers before starting',
      'A written test on the method statement that workers must pass',
      'A record of how long the task took to complete',
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
      'Housekeeping is the client\'s responsibility, not the contractor\'s',
      'Housekeeping need not be mentioned as it is not a safety matter',
      'Specify requirements for maintaining a clean, tidy workspace and waste disposal',
      'Only the cost of cleaning the site at the end should be recorded',
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
      'To record the hours each worker spent on the task',
      'To confirm the final invoice has been paid by the client',
      'To transfer all liability for the work to the worker',
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
      'The temperature and humidity preferred by the workers',
      'The choice of paint colour for the finished installation',
      'The brand of refreshments provided in the welfare area',
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
      'As the very first control measure before considering any other',
      'Only when an HSE inspector is present on site',
      'Only as a last resort when risks cannot be adequately controlled by other means',
      'Only on construction sites, never in other workplaces',
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
      "Charge employees the cost of their PPE through payroll deductions",
      "Provide PPE only to supervisors and managers, not general workers",
      "Supply PPE but leave maintenance entirely to the individual worker",
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
      'The country in which the PPE was manufactured',
      'The maximum number of times the PPE may be reused',
      'The recommended retail price of the PPE item',
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
      'Only a hi-vis vest and a hard hat in all situations',
      'Safety footwear, insulating gloves (if appropriate), eye protection, suitable clothing',
      'Only ear defenders and a dust mask for every task',
      'No PPE is needed provided the circuit has been isolated',
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
      'To purchase their own PPE and claim the cost back later',
      'To choose whether or not to wear the PPE provided',
      'Use it properly, report defects, store it correctly, and not misuse it',
      'To repair any damaged PPE themselves before reporting it',
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
      'Only the cheapest option available from the supplier',
      'Only the colour and appearance of the equipment',
      'Only the brand name and reputation of the manufacturer',
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
      'Only once when they are first purchased, then never again',
      'At regular intervals as specified by the manufacturer, typically every 6 months',
      'Only after they have been used on a live circuit',
      'Every five years, in line with fixed-wiring inspection cycles',
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
      'A device that detects arcing faults and disconnects the supply',
      'A coating applied to cables to prevent arc tracking',
      'Specialised PPE protecting against thermal hazards from electrical arc flash incidents',
      'A type of camera flash used when photographing electrical faults',
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
      'The cost of replacing equipment damaged by an arc flash',
      'The number of workers permitted in the work area',
      'The time taken for a circuit breaker to reset after a fault',
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
      'Ordinary prescription spectacles with no impact rating',
      'Tinted sunglasses to reduce glare from the work area',
      'No eye protection is needed once the circuit is isolated',
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
      'It conducts electricity better than natural fibres do',
      'It can melt and adhere to skin in an arc flash, worsening burns',
      'It generates static that can trip residual current devices',
      'It is more expensive than equivalent natural-fibre clothing',
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
      'To improve grip when climbing ladders and scaffolds only',
      'To keep the wearer\'s feet warm in cold conditions',
      'Protection against falling objects, punctures, and electrical hazards',
      'To make the wearer taller and more visible on site',
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
      'A method of working safely on equipment that remains live',
      'A procedure for keeping different trades apart on a busy site',
      'A way of isolating a worker who is behaving dangerously',
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
      'Switch off, start work immediately, then prove dead afterwards',
      'Prove dead first, then isolate the circuit and begin work',
      'Isolate the circuit and rely on a warning notice alone',
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
      'To calibrate the indicator to the exact supply voltage',
      'To ensure it is working correctly and give confidence the circuit is dead',
      'To discharge any stored charge in the indicator\'s battery',
      'To record the test result for the certification paperwork',
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
      'Measuring the insulation resistance of a circuit',
      'Discharging stored energy from a capacitor before work',
      'A known voltage source to test voltage indicators work correctly before and after use',
      'Recording the voltage present at the supply intake',
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
      'To secure tools and equipment against theft from site',
      'To lock the consumer unit cover closed after testing',
      'To indicate which circuits are spare on a distribution board',
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
      'One supervisor applies a single lock and keeps the only key for everyone',
      'The first person to finish removes the lock for the whole team',
      'Each person signs a register instead of applying a physical lock',
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
      'Notices showing the rated current of each circuit breaker',
      'Clear warning signs indicating work in progress and prohibition against re-energising',
      'Notices stating the date of the last periodic inspection',
      'Fire exit and assembly point direction signs',
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
      'A licence confirming the electrician is qualified to isolate circuits',
      'A label attached to the isolator showing its rated current',
      'A formal documented authorisation for work on or near isolated electrical equipment',
      'A certificate issued after the installation has been tested',
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
      'Proceed with the work live, as isolation is only advisory',
      'Ask an apprentice to hold the conductors steady during the work',
      'Switch off at the main switch and assume the circuit is dead',
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
      'Test the circuit, then test on a known live source twice',
      'Test the line, neutral and earth terminals once each only',
      'Test on a known live source once, then test the circuit only',
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
      'No additional precautions beyond those used for low voltage',
      'Trained authorised persons, HV switching procedures, earthing equipment, additional testing',
      'A single padlock applied to the main HV isolator is sufficient',
      'Only insulating gloves rated for low voltage are required',
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
      'Throw water over the fire to cool the burning equipment',
      'Open all the windows to let the smoke escape',
      'Raise the alarm and isolate the power supply if safe to do so',
      'Move the burning equipment outside the building',
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
      'Water (red label), as it cools the burning equipment quickly',
      'Foam (cream label), as the blanket smothers the flames',
      'Wet chemical (yellow label), as used on cooking-oil fires',
      'CO2 (carbon dioxide) or dry powder',
    ],
    correctAnswer: 3,
    explanation:
      'CO2 and dry powder extinguishers are safe for electrical fires. Water, foam and wet chemical must not be used as they conduct electricity. CO2 is preferred as it leaves no residue.',
    section: '1.8',
    topic: 'Emergency Procedures',
    difficulty: 'basic',
  },
  {
    id: 188,
    question: 'What is the immediate first aid response to electric shock?',
    options: [
      'Ensure the power is off, check for response, call for help, and perform CPR if needed',
      'Grab the casualty immediately to pull them clear of the supply',
      'Give the casualty water to drink and let them rest quietly',
      'Wait for the casualty to recover on their own before acting',
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
      'You might disturb their clothing and worsen any burns',
      'You could become part of the circuit and also receive a shock',
      'You could be accused of assault if they later complain',
      'You might wake them and cause them to panic and fall',
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
      'Only superficial reddening of the skin that heals quickly',
      'Only burns to the hands, never to any other part of the body',
      'Entry and exit burns, as well as internal tissue damage along the current path',
      'Burns only occur if the voltage exceeds 1000V',
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
      'Apply butter or grease to the burns to soothe them',
      'Burst any blisters and remove clothing stuck to the burn',
      'Leave the casualty until the swelling has gone down',
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
      'Only the location of the nearest fire extinguisher',
      'Only the name of the site\'s appointed first aider',
      'Only the contact number for the local fire service',
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
      'Only once when the workplace first opens',
      'Regularly, with fire drills at least annually and more frequent briefings',
      'Only after a real fire or emergency has occurred',
      'Only when a new fire risk assessment is carried out',
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
      'The names and home addresses of all employees',
      'The company\'s annual turnover and profit figures',
      'Fire action notices, evacuation routes, assembly points, emergency contacts',
      'The cost of the building\'s insurance policy',
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
      'To re-enter the building to retrieve valuable equipment',
      'To attempt to extinguish any size of fire single-handedly',
      'To carry out the annual servicing of fire extinguishers',
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
      "Always, regardless of the size of the fire or your training",
      "Only after the fire service has arrived on site",
      "Only if the fire is blocking your only escape route",
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
      'A place to store fire-fighting equipment for the building',
      'A safe location where evacuated personnel gather to be accounted for',
      'A meeting room used for daily site briefings',
      'A designated area for parking site vehicles safely',
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
      'Point nozzle, Activate trigger, Stand back, Smother flames',
      'Prepare exit, Alert others, Shut doors, Stay low',
      'Pull pin, Aim at base, Squeeze handle, Sweep side to side',
      'Press handle, Angle upward, Spray top, Step forward',
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
      'Only the cost of any equipment damaged in the incident',
      'Only the names of staff who failed to evacuate quickly',
      'Nothing, provided no one was seriously injured',
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
      'Flushed warm skin, a slow strong pulse, and increased appetite',
      'Sudden bursts of energy, clear thinking, and steady breathing',
      'Raised body temperature, dry skin, and a feeling of euphoria',
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
      'To supervise the day-to-day construction work physically on site',
      'To plan, manage, monitor and coordinate health and safety in the pre-construction phase, including identifying and eliminating foreseeable risks',
      'To prepare the construction phase plan before work begins on site',
      'To notify the HSE using an F10 form before any work starts',
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
      'Whenever the contract value exceeds £100,000 in total',
      'Whenever the contractor employs more than ten workers directly',
      'When more than one contractor is, or is reasonably foreseeable to be, working on the project at the same time — the client must appoint one in writing',
      'Automatically on any project lasting longer than 30 working days',
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
      'Appoint a principal designer and notify the HSE on their behalf',
      'Compile the health and safety file for handover to the client',
      'Obtain written confirmation from the client that the site is asbestos-free',
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
      'To support the day-to-day management of asbestos left in place during normal occupation',
      'To estimate the cost of removing asbestos from the building',
      'To confirm that the building is entirely free of any asbestos',
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
      'Any electrician who has completed asbestos awareness training',
      'Only HSE-licensed contractors holding a current asbestos licence',
      'Any contractor provided they wear suitable respiratory protection',
      'The duty holder or building owner using in-house staff',
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
      'Carry on drilling but tell the apprentice to wear a dust mask',
      'Sweep up the dust quickly to stop it spreading further',
      'Stop work immediately, prevent access to the area, isolate the suspect material from disturbance, and report it to the client and duty holder',
      'Take a sample of the dust yourself and send it for testing',
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
      'For every project regardless of duration or workforce size',
      'Only when asbestos-containing materials are present on site',
      'When the contract value exceeds £250,000 in total',
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
      'A document setting out how the design risks will be managed, prepared by the principal designer',
      'A record of residual hazards handed to the client at the end of the project, prepared by the client',
      'A notification of the project sent to the HSE, prepared by the principal designer',
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
      'A file of method statements compiled by each contractor and kept on site only during the build',
      'A file containing information needed to manage health and safety during future construction, maintenance and demolition — handed to the client at project end and kept by them for the life of the structure',
      'A file of risk assessments prepared by the client before the project starts and destroyed at handover',
      'A file of design drawings kept by the principal designer and not shared with the client',
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
      'Any building used for industrial or commercial purposes',
      'A building at least 11 metres high containing any number of units',
      'A building at least 18 metres high or with at least 7 storeys, containing at least two residential units',
      'Any building older than 30 years containing residential units',
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
      'A continuous earth conductor running through the whole building',
      'A fireproof cable that maintains circuit integrity during a fire',
      'A single contractor responsible for the building from design to demolition',
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
      'Physically removing all asbestos from the premises within 12 months',
      'Notifying every visitor to the premises in writing about asbestos',
      'Carrying out a refurbishment and demolition survey every year',
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
      'Proceed with the work, as domestic dwellings are exempt from asbestos rules',
      'Refuse to start until the client confirms in writing whether ACMs are present in the area you\'ll disturb, or commissions an appropriate survey',
      'Carry on but wear a disposable dust mask while drilling',
      'Take a sample of any suspect material yourself before starting',
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
      'Licensable = lowest risk; NNLW = medium risk; Non-licensed = highest risk requiring an HSE licence',
      'They are three names for the same category of asbestos work, with no real difference',
      'Licensable = highest risk, requires HSE licence; NNLW = sporadic/low intensity but still requires notification, training, medicals, records; Non-licensed = lowest risk asbestos work with limited controls',
      'Licensable applies to domestic premises; NNLW to commercial; Non-licensed to industrial only',
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
      'A full asbestos removal licence issued by the HSE',
      'No specific training, provided they wear respiratory protection',
      'Manual handling training to safely lift asbestos sheets',
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
      'A client running a business from home, who retains all client duties personally',
      'A landlord having work done on a rented property, who keeps all client duties',
      'A commercial client whose duties pass to the principal designer alone',
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
      'Get on with the rewire as instructed, since the client accepts the risk',
      'Refuse to start. Inform the client in writing that under CAR 2012 Reg 4 they have a duty to manage asbestos and provide the information; without it the work cannot proceed safely or lawfully',
      'Start work but wear respiratory protection in case asbestos is present',
      'Commission and pay for the asbestos survey yourself to avoid delay',
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
      'They must hold a minimum of ten years\' experience in their trade',
      'They must be a member of an approved competent person scheme',
      'They must have, or organisations must ensure they have, the skills, knowledge, training and experience appropriate to their role — and behavioural capability',
      'They must be formally approved in writing by the HSE before starting',
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
      'Carry on working but instruct everyone to wear dust masks',
      'Sweep up the dust quickly and dispose of it in the general waste',
      'Wait until the end of the shift before reporting the spread',
      'Evacuate and seal the area, stop all work, notify the duty holder and HSE if appropriate, arrange licensed clean-up, retain workers\' clothing for assessment, log near miss and review',
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
      'Management survey is fully intrusive before demolition; R&D survey is a quick visual check during occupation',
      'Both surveys are identical; the names are simply used interchangeably',
      'Management survey is for domestic premises; R&D survey is for commercial premises only',
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
      'To physically supervise each designer working at their desk',
      'To coordinate matters relating to health and safety and ensure designers cooperate, share information and apply the general principles of prevention',
      'To approve the fee charged by each designer on the project',
      'To carry out all the design work personally rather than delegating it',
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
      'Approve the RAMS as it stands, since asbestos is the client\'s concern',
      'Let the subcontractor start and add the asbestos section later',
      'Reject the RAMS, require it to be revised to address ACMs based on the duty holder\'s register/survey, and verify it before allowing the subcontractor on site',
      'Write the missing asbestos section yourself on the subcontractor\'s behalf',
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
      'A plan prepared by the principal contractor before construction begins',
      'A record of residual hazards handed to the client at the end of the project',
      'The notification of the project sent to the HSE on an F10 form',
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
      'Personal exposure records for 3 years only, then they may be destroyed',
      'No records at all, since NNLW is low-risk and does not require them',
      'Only a verbal note to the worker that they were exposed to asbestos',
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
      'Carry on without a principal designer, as the appointment is optional',
      'Inform the client in writing that they must appoint a principal designer (Reg 5) where more than one contractor is involved, and that without it the project cannot lawfully proceed',
      'Appoint yourself as principal designer to keep the project moving',
      'Notify the HSE on an F10 form instead of appointing anyone',
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
      'To carry out a risk assessment for every task before starting it',
      'To provide their own personal protective equipment at their own cost',
      'To take reasonable care of their own health and safety and that of others affected by their acts or omissions, and cooperate with the employer',
      'To report all accidents directly to the HSE under RIDDOR',
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
      'Only if the director was physically present when the offence occurred',
      'Only if the director personally carried out the dangerous work',
      'Never; directors can never be held personally liable under HASAWA',
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
      'Culpability (very high to low), seriousness of harm risked, likelihood of harm, plus the offender\'s turnover and aggravating/mitigating factors',
      'Solely the number of previous convictions held by the company',
      'Solely the number of employees the company has on its payroll',
      'Solely whether the breach was reported to the HSE voluntarily',
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
      'A fixed penalty fine of £5,000 issued for any breach of H&S law',
      'A statutory cost recovery scheme charging a hourly fee for HSE inspector time spent identifying and helping to address material breaches of H&S law',
      'A fee paid by employers to register their workplace with the HSE',
      'A charge made only after a successful prosecution in the courts',
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
      'Improvement notice immediately stops dangerous work; prohibition notice gives time to remedy a breach',
      'Both notices stop work immediately but for different lengths of time',
      'Improvement notice gives time to remedy a breach; prohibition notice immediately stops an activity that involves a risk of serious personal injury',
      'Improvement notice is issued by the courts; prohibition notice by an inspector',
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
      'Any minor injury treated on site with the first aid kit',
      'Any injury keeping a worker off for more than three days',
      'Only injuries that result in the death of the worker',
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
      'The "responsible person" (typically the employer) must report — online via HSE\'s reporting portal, equivalent to F2508',
      'The injured worker must report it themselves using an F10 form',
      'The site first aider must report it by telephone within 24 hours',
      'The HSE inspector must report it on behalf of the employer',
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
      'Ignore it, since no one was actually hurt by the contact',
      'Investigate, record it in the accident book / near-miss log, review the safe-isolation procedure, brief the team, and use it as a positive learning event',
      'Report it immediately to the HSE under RIDDOR as a specified injury',
      'Discipline the worker for touching the conductor without investigating',
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
      'Accept it as written, since a generic RAMS satisfies the legal duty',
      'Brief the team on the generic RAMS and start work straight away',
      'Reject it, require a site-specific RAMS, brief the team only after it\'s been revised, and document the rejection',
      'Amend the generic RAMS yourself on site without telling the designer',
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
      'It targets individual directors only, never the organisation itself',
      'It applies only where a worker is injured but not killed',
      'It replaces HASAWA entirely for all health and safety offences',
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
      'An assessment of risks to employees only, never to the public or contractors',
      'A single annual assessment that cannot be changed once it is written',
      'An assessment that only needs recording if 50 or more are employed',
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
      'Arrangements to pay compensation to any worker who is injured',
      'Effective arrangements for the planning, organisation, control, monitoring and review of preventive and protective measures — recorded by employers with 5+ employees',
      'Arrangements to notify the HSE before any new work activity begins',
      'Arrangements to insure the workplace against fire and flood damage',
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
      'Provide PPE first; eliminate the hazard only if PPE proves inadequate',
      'Identify hazards; decide who is harmed; evaluate; record; review',
      'Avoid risks; evaluate unavoidable risks; combat at source; adapt work to the individual; adapt to technical progress; replace dangerous with less dangerous; develop coherent prevention policy; collective over individual measures; instruct workers',
      'Plan; do; check; act, repeated continuously throughout the work',
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
      'Let the work continue, as wearing safety glasses is the worker\'s choice',
      'Carry out the drilling yourself so the worker does not need glasses',
      'Ignore it provided the worker signs a disclaimer accepting the risk',
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
      'Replace all work equipment with new items every five years',
      'Provide work equipment free of charge but charge for any training',
      'Allow any worker to use any equipment without restriction',
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
      'Always use a harness and fall-arrest system as the first option',
      'Avoid the work at height; if unavoidable, use work equipment that prevents falls; if not possible, use work equipment that minimises distance and consequences of falls — fall arrest is last',
      'Provide collective measures only after personal fall arrest has failed',
      'Minimise the consequences of a fall first, then try to prevent it',
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
      'Use the tower as normal, since a missing tag is only an administrative issue',
      'Write your own tag and attach it to the tower before use',
      'Quarantine the tower and refuse use until a competent person inspects and tags it under WAHR 2005 / PASMA — log the incident',
      'Use the tower but only at low levels where a fall would not be serious',
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
      'Set a fixed maximum weight of 25kg that no worker may ever exceed',
      'Provide a back-support belt to every worker before any lifting',
      'Train workers to lift heavier loads so manual handling can continue',
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
      'Lower 85 dB(A); upper 90 dB(A); exposure limit 95 dB(A) at the ear',
      'Lower 70 dB(A); upper 75 dB(A); exposure limit 80 dB(A) at the ear',
      'A single action value of 85 dB(A) with no upper or limit value',
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
      'Action value 5 m/s² A(8); limit value 2.5 m/s² A(8)',
      'Action value 2.5 m/s² A(8); limit value 5 m/s² A(8) — over which exposure is prohibited',
      'Action value 80 dB(A); limit value 87 dB(A) at the ear',
      'Action value 1 m/s² A(8); limit value 10 m/s² A(8)',
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
      'A single written assessment completed once at the start of the project',
      'A formal review carried out only at the end of each working week',
      'Continuous mental reassessment of changing site conditions — new hazards, changing weather, fatigue, time pressure — adapting controls in real time and stopping work if needed',
      'An assessment carried out only by the client before work begins',
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
      'Read the procedure aloud quickly and move straight on to the work',
      'Hand out the written procedure and let workers read it in their own time',
      'Email the procedure to workers and assume they have understood it',
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
      'No duty at all; non-employees are outside the scope of HASAWA',
      'A duty owed only to other contractors, not to members of the public',
      'A duty to provide non-employees with personal protective equipment',
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
      'Tidy and clear the scene first so the area looks safe for inspectors',
      'Make safe (isolate hazard), administer first aid / call emergency services, preserve the scene, notify employer and client, secure witnesses, report under RIDDOR if applicable, start investigation',
      'Send everyone home immediately and deal with it the next morning',
      'Move the casualty straight away regardless of their injuries',
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
      'Faulty portable appliances that have failed their PAT test',
      'Lightning strikes on overhead distribution lines',
      'Working on or near live equipment without adequate isolation or precautions — a failure to apply EAWR Reg 14 and proven safe-isolation procedure',
      'Static electricity discharge from synthetic work clothing',
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
