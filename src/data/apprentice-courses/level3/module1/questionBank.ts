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

import { drawWeighted } from '@/utils/apprenticeQuestionDraw';

export const module1Questions: QuestionBank[] = [
  // ============================================
  // Section 1.1: HASAWA 1974 (Questions 1-30)
  // ============================================
  {
    id: 1,
    question: "Under Section 2 of HASAWA 1974, what is the employer's general duty?",
    options: [
      'To provide the Health and Safety Executive with written notice of every project lasting over 30 days',
      'To ensure, so far as is reasonably practicable, the health, safety and welfare of all employees',
      'To insure each employee against injury and display the certificate at the company head office',
      'To appoint a trade union safety representative for every twenty employees engaged on the site',
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
      'The employer must remove every risk however small, whatever the cost or difficulty',
      "The employer need only follow the manufacturer's instructions and any British Standard",
      'The employer must weigh the risk against the cost, time and effort of removing it',
      'The employer must act only once a written complaint or an HSE notice has been received',
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
      'Employees and agency staff, but not visitors or members of the public',
      'Their own employees and any subcontractors under their direct control',
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
    options: ['Section 7', 'Section 5', 'Section 2', 'Section 9'],
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
      'Declining to attend a health and safety committee meeting convened by two appointed safety representatives',
      'Intentionally or recklessly interfering with or misusing anything provided for health, safety or welfare',
      'Working paid overtime on site without first obtaining written authorisation from the principal contractor',
      'Using personally owned hand tools on site without first entering them in the employer\'s equipment register',
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
      "An employers' liability insurance certificate",
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
      'To dismiss on the spot any employee found breaching a site safety rule',
      'To impose fixed-penalty fines payable in cash during the visit',
      'To withdraw an electrician\'s competent person registration card',
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
      'Improvement notices stop the activity immediately; prohibition notices allow a fixed 15 days in which to remedy the contravention',
      'Improvement notices are served on employers only and prohibition notices on employees only, both of them taking effect at once',
      'Improvement notices carry an automatic fixed penalty fine; prohibition notices are advisory guidance and have no legal force',
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
    options: ['£20,000', 'Unlimited', '£1,000,000', '£50,000'],
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
      'Only the company itself as a legal entity, since HASAWA duties attach to the undertaking and never to an individual',
      'The appointed health and safety officer alone, because competent assistance under MHSWR carries the personal liability',
      'Directors, managers, and other officers if the offence was committed with their consent, connivance, or neglect',
      'Shareholders holding more than 25% of the issued share capital, as they are treated as controlling the business',
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
      'A copy of the employer liability insurance certificate and the annual company accounts',
      'Written confirmation of pension contributions and the statutory sick pay entitlement',
      'The postal address of the enforcing authority for the area, and nothing more',
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
      'The general duty of every employee to take reasonable care while they are at work',
      'The prohibition on an employer charging employees for anything provided for safety',
      'The duties of designers, manufacturers and suppliers of articles used at work',
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
      'Any worker over 18 who has completed the site induction and holds a valid CSCS card in their trade',
      'Any person holding a current first aid at work certificate issued in the last three years',
      'A person with sufficient training, knowledge, experience and other qualities to properly assist',
      'A person named on the register of competent persons approved in writing by an HSE inspector',
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
      'Rates of pay, shift patterns and the overtime allowance paid for work classed as hazardous',
      'The choice of supplier providing the site welfare facilities and the canteen arrangements',
      'The selection of subcontractors and the tender prices accepted for each package of the work',
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
      'To provide a free repair warranty for the working life of every article supplied',
      'To register every article sold with the enforcing authority before it is supplied',
      'To indemnify the employer against any prosecution arising from the use of the article',
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
      'To record every accident and near miss occurring at the workplace during the calendar year',
      "To set out the organisation's commitment and arrangements for managing health and safety",
      'To list the names, job titles and home addresses of everyone the company employs',
      'To set out the company\'s terms of business and the insurance cover held for clients',
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
      'Introduction, main body, and conclusion with appendices',
      'Risk assessment, method statement, and permit to work',
      'Statement of intent, organisation, and arrangements',
      'Names, home addresses, and emergency telephone numbers',
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
      'Whenever the HSE serves an improvement notice, and not before',
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
      'An employee\'s personal liability for the unsafe instructions given to them by their own employer',
      'A client\'s liability for the acts of the principal contractor once the F10 notice has been submitted',
      'The liability shared equally between all the company directors, whatever their individual fault or knowledge',
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
      "Use their own personal protective equipment instead of the employer's",
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
      'Completing the work as quickly as the client and the site programme demand',
      'Carrying out the legal minimum required and nothing more than that',
      'Passing every safety responsibility to a subcontractor in writing',
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
      'A manager appointed by the employer to enforce the site safety rules and discipline any staff who breach them',
      'An HSE inspector allocated to a particular site to monitor compliance throughout the whole of the project',
      'An outside consultant engaged by the company to write all of its risk assessments and method statements',
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
      'Serve improvement and prohibition notices on the employer and bring a prosecution for serious breaches',
      'Investigate hazards, complaints, accidents; inspect workplace; represent employees; receive HSE information',
      'Suspend or dismiss any employee who repeatedly ignores safety instructions, and issue them with written warnings',
      'Set the company\'s annual health and safety budget and approve all spending on control measures across the site',
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
      'A panel of HSE inspectors who audit the whole workplace each year and publish their written findings',
      'A board of directors who sign the safety policy and approve the annual health and safety budget',
      'A committee where employers and employee representatives discuss and review health and safety measures',
      'A group of external consultants retained to write the risk assessments and method statements for the site',
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
      'Whenever the workforce on the site exceeds five employees',
      'When an HSE inspector serves a notice directing the employer to do so',
      'Automatically on any construction project with a value of over £1m',
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
      'A voluntary commitment set out in an employer\'s own safety policy',
      'A recommendation contained in industry guidance issued by a trade body',
      'A duty that applies only to self-employed persons working alone',
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
      'A legally binding regulation that must be followed exactly, with no alternative method ever permitted',
      'Guidance with special legal status - failure to follow can be used as evidence of non-compliance',
      'An internal company procedure with no legal standing outside the organisation that wrote it',
      'A British Standard applying only to electrical installations and enforced through BS 7671',
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
      'Absolute duties apply only to employers, while qualified duties apply only to the self-employed person',
      'Absolute duties are voluntary, while qualified duties are the only ones enforceable in a court of law',
      "Absolute duties must be complied with; qualified duties are subject to 'reasonably practicable'",
      'Absolute duties are subject to what is reasonably practicable, while qualified duties must always be met',
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
      'The maximum voltage at which live working is permitted on any low voltage installation',
      'The frequency of periodic inspection and testing for every installation on site',
      'The requirement to display warning notices at each isolating device on site',
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
      'Any voltage exceeding 230 V a.c. when measured to earth, whatever the actual risk involved',
      'Risk of injury from electric shock, burns, fire, or explosion arising from electricity',
      'The presence of exposed live conductors alone, excluding any fire or explosion risk',
      'Financial loss to the employer from an unplanned failure of the electrical plant',
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
      'That live working is prohibited in every circumstance, including testing and fault-finding',
      'That only electricians holding membership of a competent person scheme may enter a plant room',
      'All systems shall be constructed to prevent danger so far as is reasonably practicable',
      'That every final circuit is inspected and tested at intervals not exceeding twelve months',
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
      'That isolation is carried out only by an authorised manager or supervisor',
      'That every isolating device is colour-coded to show its voltage band',
      'That circuits are re-energised within four hours of being isolated',
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
      'Live working is permitted on any system provided that two competent persons are present and a signed permit to work has been issued first',
      'No person shall work on or near live conductors unless unreasonable to dead, reasonable to work live, and suitable precautions taken',
      'Live working is allowed without any further precautions on any circuit at or below 230 V, since this voltage is classed as low voltage',
      'Live working is prohibited absolutely in every workplace, with no exception for testing, fault-finding or commissioning tasks',
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
      'A recognised apprenticeship completed within the previous five years',
      'Current membership of an approved competent person scheme',
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
      'Equipment shall be tested for insulation resistance before every single use',
      'Equipment shall carry the manufacturer\'s lifetime repair guarantee',
      'Equipment shall be replaced after five years whatever its condition',
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
      'Equipment must be switched off and covered over whenever the weather turns wet or windy',
      'Equipment must be used indoors only, as no enclosure is ever suitable for outdoor conditions',
      'Equipment must be earthed only where it is used in damp, wet or corrosive locations',
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
      'Earthing is required only on systems operating above 1000 V, since lower voltages cannot give rise to danger at all',
      'Earthing conductors must be replaced in full at every periodic inspection and test carried out on the installation',
      'Suitable precautions shall be taken to prevent danger from charge on exposed metalwork, preferably by earthing',
      'Only the distributor may install or alter any earthing arrangement, including the main protective bonding conductors',
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
      'Every final circuit must be protected by a 30mA residual current device without any exception',
      'Every joint in a final circuit must be soldered rather than mechanically clamped or crimped',
      'Connections may only be made by the original equipment manufacturer or by its appointed agent',
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
      'Protection against excess current is only required at the origin of the installation and not at the final circuits',
      'Suitable means shall be available for protecting from excess current and for cutting off supply in an emergency',
      'Emergency switching devices must be capable of being locked in the closed position, never in the open position',
      'A single main switch at the intake is sufficient for an entire multi-storey building, whatever its size',
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
      'Working on equipment switched off at its local control but still connected to the supply',
      'Working outside normal business hours when the premises are empty and the load is low',
      'Working on electrical systems that have been safely isolated from all sources of supply',
      'Working on equipment that has reached the end of its service life and is due for removal',
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
      'Switch off at the main switch, then begin work at once as the whole installation is now dead',
      'Obtain the client\'s verbal permission to start and record the time work began in the site log',
      'Isolate and prove dead, then start work and fit the lock-off device once the job is finished',
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
      'Only the fixed wiring of an installation, excluding any connected equipment',
      'Any equipment operating above 1000 V that is connected to a common source of supply',
      'Any documented method of recording and filing the electrical test results',
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
      'Only qualified electricians registered with an approved competent person scheme',
      'All employers, employees, and self-employed persons who work with or near electricity',
      'Employers whose electrical equipment operates above low voltage, and their own employees',
      'Contractors carrying out new installation work, but not those doing maintenance',
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
      'That the work was carried out by a subcontractor, so the duty passed to them under the terms of the contract',
      'That the duty holder was unaware of the regulation, having had no guidance from the enforcing authority',
      'All reasonable steps were taken and all due diligence exercised to avoid the commission of the offence',
      'That no injury or damage actually resulted, so the breach caused harm to no person on the site at all',
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
      'Not exceeding 50V AC or 120V DC measured between any two conductors',
      'Exceeding 1000V AC or 1500V DC measured between conductors or to earth',
      'Any voltage lying between 230V and 400V measured between line conductors',
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
      'Equipment must be returned to the manufacturer for calibration at least once every month',
      'Equipment must be no more than two years old and then replaced on its second anniversary',
      'Equipment must be PAT tested immediately before each individual measurement is taken at the origin',
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
      'The maximum number of circuits per distribution board',
      'Safe use of electrical test equipment',
      'The procedure for isolating a high-voltage supply',
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
      'Bare metal probe tips at least 10mm long, to give a reliable contact on terminals',
      'Uninsulated leads colour-coded brown, blue and green for ready identification on site',
      'Finger barriers, insulated tips with maximum 4mm exposed, and HRC fused leads',
      'Retractable spikes for piercing cable insulation while the conductor remains under load',
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
      'Cutting off the supply and isolating equipment',
      'Insulating and protecting live conductors',
      'Assessing competence for electrical work',
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
      'Within 15 days of the incident, whatever the severity of the injury',
      'Without delay (immediately) by quickest practicable means',
      'Within 30 days of the incident, in writing to the local authority',
      'At the next routine HSE inspection visit to the site, in writing',
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
      'Any injury keeping a worker in hospital as an in-patient for more than 7 consecutive days',
      'An injury leaving a worker with more than 7% permanent disability as assessed by a doctor',
      'Incapacity for normal work duties for more than 7 working hours, counting the day of the accident',
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
      'A worker taking an unauthorised break away from the designated work area during a night shift',
      'Collapse or overturning of lifting equipment, or electrical short circuit causing fire',
      'A cordless power tool failing to start on site because its battery pack has fully discharged',
      'A minor water spillage in a plant room that was cleaned up straight away by the operative',
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
      'To compensate injured workers for the earnings they lose while they are off work after an accident',
      'To set the maximum fines and the prison terms available for the most serious safety offences',
      'To enable HSE and local authorities to identify workplace risks and investigate serious accidents',
      'To require employers to provide first aid facilities and trained first aiders on every site',
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
      'The injured worker themselves, once they have returned to their normal duties',
      'The first aider who treated the casualty, or the site nurse where one is employed',
      'The HSE inspector allocated to the geographical area covering the site and its offices',
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
      'By recording the incident in the workplace accident book, and nothing more',
      'By posting a completed F2508 form to the local council offices',
      'By email direct to the HSE inspector assigned to that particular site',
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
      'Seasonal influenza, the common cold and any case of food poisoning contracted from the canteen on the site',
      'Carpal tunnel syndrome, occupational dermatitis, occupational asthma, and hand-arm vibration syndrome',
      'High blood pressure, type 2 diabetes and heart disease found during a routine occupational health check',
      'Work-related stress, anxiety and general fatigue arising from the long shifts worked on the site',
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
      'Accidents resulting in more than three days away from normal work',
      'Accidents to employees, but not those to visitors or the public',
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
      'Any gas appliance that fails its annual service inspection at a domestic property',
      'A gas meter reading that is higher than the reading for the previous quarter',
      'Accidental leakage of gas causing death/injury or posing an immediate risk',
      'The replacement of a gas appliance with an electric one by the same installer',
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
      'A lamp that fails at the end of its rated burning life',
      'A minor static shock received from touching a metal stair handrail',
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
      'The injured person\'s salary, employment history and length of service with the firm',
      'A full risk assessment and method statement for every task carried out on the site',
      'The names, home addresses and written statements of every person who witnessed the incident',
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
      'Amputations requiring an overnight stay in hospital for treatment',
      'Amputations caused by machinery, but not those caused by hand tools',
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
      'No further report is required once 15 days have passed from the date on which the accident occurred',
      'The injury is entered in the accident book only, as the window for reporting it to the HSE has closed',
      'Report as soon as you become aware the injury meets the criteria, within 15 days of becoming aware',
      'The duty to report passes to the injured worker themselves once they have been away from work for 7 days',
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
      'Permanently unable to return to their trade or any other employment',
      'Admitted to hospital for treatment, regardless of their ability to work',
      'Unable to attend the workplace but still able to perform their normal duties',
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
      'Any minor burn requiring a dressing from the site first aid kit and a follow-up visit to a local minor injuries unit',
      'A burn or scald covering more than 10% of the body or causing damage to eyes, respiratory system or vital organs',
      'Sunburn sustained by an operative working outdoors all day for which treatment is obtained from a pharmacist',
      'A burn covering less than 1% of the body surface that requires one outpatient appointment at a local hospital',
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
      'The injury must have occurred within the contracted working hours, excluding any meal break and any travel to site',
      'The injury must have happened on premises owned or occupied by the employer themselves, not on a client\'s site',
      'The injury must be caused by work activity, conditions created by work, or the manner of conducting the work',
      'The injury must have been witnessed by at least one other person able to confirm the account given to the employer',
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
      'A 24-hour emergency line for summoning an ambulance to a construction site incident',
      'A free helpline giving legal advice to workers who have been injured at their work',
      'A drop-in centre where inspectors take written statements from witnesses',
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
      'Clear away all the tools and equipment and tidy the scene before the ambulance arrives',
      'Wait for an HSE inspector to attend the site before taking any action whatsoever',
      'Move the casualty away from the area at once, whatever injuries they have suffered',
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
      'Inert building rubble awaiting removal from the site',
      'Sealed lead-acid batteries kept in normal storage',
      'Solvents, chemicals, dusts, fumes, and biological agents',
      'Cold drinking water supplied to the site welfare facilities',
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
      'A certificate confirming that a substance has passed the quality control checks of the supplier before it was despatched',
      'A purchase invoice listing the quantity, the unit cost and the total cost of each hazardous substance delivered to site',
      'A written record showing which workers have been issued with the personal protective equipment needed for the substance',
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
      'The greatest number of workers permitted in a confined space where fumes are present',
      'The maximum concentration of an airborne substance averaged over a reference period',
      'The longest continuous period a worker may handle a substance in any single shift',
      'The minimum rate of mechanical ventilation required in any enclosed workplace',
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
      'A skull and crossbones inside a white diamond border',
      'A flame burning above a horizontal black line',
      'Hand being corroded and surface being attacked',
      'An exclamation mark inside a white diamond',
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
      'Issue of respiratory protective equipment to all exposed workers',
      'Health surveillance for all employees exposed to the substance',
      'Local exhaust ventilation installed at the point of release',
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
      'For every employee on the company payroll, whether or not they are exposed to a hazardous substance',
      'When exposure cannot be adequately controlled and specific health conditions can be identified',
      'Only once a worker has already developed a diagnosed illness that is linked to the substance used',
      'Where an employee has asked their employer in writing for a medical examination every 14 months',
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
      'A general-purpose fan that circulates fresh air around the whole of the plant room',
      'A respirator worn by the worker to filter the air that is breathed in during the task',
      'An engineering control that captures airborne contaminants at source before they spread',
      'An alarm that sounds when the level of airborne contaminant in the room rises above the limit',
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
      'At least every 6 months, whatever type of system has been installed',
      'At least every 3 years, or as specified in COSHH Schedule 4',
      'Only when a fault is suspected or one has been reported',
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
      'A hard hat, hi-vis vest and steel toe-capped boots, which is the standard PPE issued to everyone on site',
      'Hearing protection and an FFP1 dust mask, which is correctly rated for use against organic solvent vapours',
      'An arc-rated face shield and insulating rubber gloves of the correct voltage class for the work',
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
      'To calculate the cost of storing and of disposing of the hazardous waste from the site',
      'To identify hazards, who might be harmed, evaluate risks, and determine control measures',
      'To record which workers have been issued with PPE and when each item was last replaced',
      'To compare the purchase prices of the substances offered by the different approved suppliers',
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
      'Inhalation and ingestion, as the skin blocks all substances',
      'Absorption through an untreated cut or graze, and no other route',
      'Inhalation, skin absorption, ingestion, and injection',
      'Swallowing the substance during a meal break, and nothing else',
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
      'Only the trade names of the substances held in the site store and the price that was paid for each one',
      'The contact details of the supplier, the delivery dates and the batch number of each drum received',
      'The total quantity of each hazardous substance that is kept in the site store at any one time',
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
      'Only once, when the substance is first brought into the workplace by the employer\'s own buyer',
      'Strictly every five years, in line with the periodic inspection cycle, and at no other time',
      'After an improvement notice has been served on the employer by the enforcing authority, but not before',
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
      'A substance that is corrosive to metals and causes serious burns to the skin',
      'A substance that is harmful to fish and to the wider aquatic environment',
      'Acute toxicity - can cause death or serious harm with short exposure',
      'A substance that acts as a mild irritant to the skin or to the eyes only',
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
      'A substance that is highly flammable in air or in pure oxygen',
      'A substance that can cause death from one single short exposure',
      'A substance that becomes explosive when subjected to heat or pressure',
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
      'Product statements giving the chemical\'s trade name and its product code number',
      'Pricing statements showing the cost per litre of the substance supplied',
      'Precautionary statements advising on handling, storage, and emergency response',
      'Performance statements describing how effective the product is in use',
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
      'Decanted together into one large container so that less storage space is needed',
      'In unlabelled containers so that the contents cannot be identified by thieves',
      'Close to the point of use, including next to heaters and boilers, so that no time is lost',
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
      'The purchase cost, the supplier details and the delivery date of each substance',
      'The disposal arrangements and the name of the waste contractor being used',
      'Only the trade name of the substance, with no other detail provided to them',
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
      'Training on manual handling and safe lifting techniques and nothing else',
      'Training on hazards, safe use, control measures, emergency procedures, and PPE use',
      'Training on how to dispose of the substances safely at the end of their working life',
      'Training on the purchase cost of the substances and the annual budget for them',
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
      'Only employers carrying out construction work are required to assess their risks formally in writing',
      'Risk assessment is recommended good practice in HSE guidance but is not a legal duty on employers',
      'All employers must make a suitable and sufficient assessment of risks to employees and others',
      'Employers with more than 50 employees on their payroll must assess all the risks in writing',
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
      'Plan, Do, Check, Act and then Repeat, as set out in HSG65 for managing health and safety',
      'Eliminate, Substitute, Isolate, Control, Protect - which is the hierarchy of control measures',
      'Assess, Authorise, Approve, Audit and Archive, as used in permit to work systems on site',
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
      'A hazard is the likelihood of harm occurring, while a risk is anything that can cause harm to people',
      'A hazard applies only to people, while a risk applies only to the plant, equipment and buildings',
      'There is no real difference between the two terms, since in law they mean exactly the same thing',
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
      'It must list every conceivable hazard, however trivial, so that nothing is left out of the record',
      'It must run to at least ten pages and be countersigned by a company director to be legally acceptable',
      'Appropriate to the complexity of the task and identifies significant risks without being overly complicated',
      'It must be submitted to the HSE and approved in writing by an inspector before any of the work begins on site',
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
      'Only an external health and safety consultant who holds a NEBOSH diploma and is fully insured',
      'The most senior company director alone, since the duty under HASAWA rests with them personally',
      'An HSE inspector, during either a routine visit or a complaint-driven inspection of the site',
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
      'An assessment that applies only to one unique task carried out on a single site',
      'An assessment carried out at the point of work immediately before the task is started',
      'A risk assessment that covers common activities across multiple similar situations',
      'An assessment that is updated continuously as the conditions on the site change',
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
      'Only the risk of electric shock, as it is the sole hazard of electrical work',
      'Financial hazards such as the cost of materials and the lost production',
      'Hazards to the public and other trades, but not to the electricians',
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
      'Vulnerable workers should be excluded from site work altogether rather than being individually assessed',
      'The same set of controls protects everyone equally, so no separate consideration is ever required',
      'Only physical disability need be considered, as age and pregnancy are matters for the HR team',
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
      'Recording which workers have been issued with their personal protective equipment',
      'Evaluating and prioritising risks by plotting likelihood against severity',
      'Calculating the financial cost of implementing each of the control measures needed',
      'Listing the legislation and the guidance that applies to a particular work activity',
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
      'Only when the company changes its name, ownership or its registered office address',
      'Strictly every five years, to match the fixed wiring inspection interval',
      'Once only, before the work on site begins, since it is a one-off exercise',
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
      'The total risk that is present before any control measures are applied',
      'The risk that has been transferred to a subcontractor by agreement',
      'The risk that affects members of the public and no one else',
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
      'To list the names of everyone who has signed off on the assessment',
      'To specify actions taken or needed to eliminate or reduce risks',
      'To record the cost of carrying out the assessment and the later review',
      'To set out the overall health and safety policy of the employing company',
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
      'So that the likely cost of any future compensation claims can be estimated well in advance',
      'So that protection can be concentrated on the most senior members of staff who are attending the site',
      'To ensure control measures protect everyone affected including employees, contractors, and public',
      'So that responsibility can be allocated in advance should an incident occur later on site',
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
      'An assessment prepared at head office and issued to each of the workers before they leave the depot',
      'A generic assessment written once and then used unchanged on many other similar sites elsewhere',
      'A formal written assessment reviewed each year by management and filed at the head office',
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
      'The personal judgement of the most senior manager on the site, since it is they who carry the legal duty',
      'The annual financial accounts of the company, its budget reports and the history of its insurance claims',
      'The verbal description given by the client of the building and of the uses that it was previously put to',
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
      'A hazard that could not be identified until the work has already started',
      'A hazard that a competent person could reasonably predict might occur',
      'A hazard that could never realistically be anticipated by anybody',
      'A hazard that arises only from extremely rare and freak events',
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
      'Selecting whichever control measure is the cheapest and the quickest one to put in place',
      'Starting with PPE and treating elimination of the hazard as the very last resort',
      'Using the hierarchy of control: eliminate, substitute, engineer, administrate, PPE',
      'Applying every available control measure at the same time, whatever the level of risk',
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
      'The names and the pay rates of every worker employed on the project site',
      'A full list of all the legislation that was in force at the time of the work',
      'The contact details of the local enforcing authority and of the HSE office',
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
      'To decide which workers should be disciplined for their past incidents',
      'To calculate the insurance premium payable the following year',
      'To prove that the workplace has never once had an accident',
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
      'Consultation is entirely optional and is needed only on the largest construction sites',
      'Workers must be consulted on health and safety matters including risk assessment',
      'Only the managers and supervisors need to be consulted, never the workforce on site',
      'Consultation is only required after an accident has actually occurred on site',
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
      'A broad assessment covering the whole of the site in only general terms',
      'An assessment that applies to every task the company ever carries out on site',
      'A detailed assessment focused on a particular activity or operation',
      'An assessment carried out only by an external consultant engaged by the client',
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
      'The age, the experience and the full training record of each individual worker',
      'The brand and the model of each of the tools and equipment being used',
      'The financial budget allocated to the project by the main contractor',
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
      'An informal spoken agreement between all of the workers on the site to look out for one another while the job is being carried out',
      'A list of all the items of plant and equipment on the whole project that must be inspected and tagged before they are taken into use',
      'The set of personal protective equipment that is issued to each worker at the start of every single shift worked on the site',
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
      'Lone working is prohibited outright by MHSWR, so the activity never needs to be assessed at all',
      'Specific consideration of communication, emergency procedures, and additional controls needed',
      'No separate consideration is needed, since exactly the same controls apply to any worker on site',
      'Only the rate of pay and the travel allowance of the lone worker need to be reviewed by the employer',
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
      'Only the managers need training, as the workers do not need to be informed at all',
      'Workers only need to sign the assessment, and do not need to understand it',
      'Workers must understand the risks, control measures, and their responsibilities',
      'Training is only required for the people who write the risk assessments',
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
      'Continue working and note the hazard on the daily site report at the end of the shift for the supervisor',
      'Write the hazard up on the site hazard board and leave the next shift coming on site to deal with it',
      'Wait until the next scheduled review date arrives before changing anything on the assessment',
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
      'A document that lists only the hazards which are present in the work area on site',
      'A certificate confirming that a worker is competent to carry out the particular task',
      'A record of the materials used on the project and the cost of each of them to the job',
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
      'They are simply two names for the same one document, which is why they are issued together as RAMS',
      'The method statement describes how to implement the controls identified in the risk assessment',
      'The risk assessment is written afterwards to justify the method statement that was agreed',
      'A method statement removes the need for a risk assessment of the activity that it covers',
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
      'Only the start and finish dates of the project and the agreed contract programme',
      'A list of the legislation and standards that apply to the work being done',
      'Description of work, sequence of operations, equipment, control measures, responsible persons',
      'The cost of the labour, plant and materials needed to complete the work',
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
      'For every task on site, however trivial, before any tool may be picked up',
      'Only after an accident has already occurred and been investigated on site',
      'Never, because a suitable and sufficient risk assessment always suffices',
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
      'Any administrative member of staff at head office using the standard template',
      'A competent person with knowledge of the work, often involving those who will do the task',
      'The client, who commissioned the project and holds the pre-construction information',
      'An HSE inspector, who must approve it in writing before work is allowed to start',
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
      'By keeping them locked in the site office, where the workers cannot see them',
      'By emailing them to the client alone, and not to the workforce on the site',
      'Through briefings, toolbox talks, and making them available at the work location',
      'By relying on the workers to ask for a copy if they ever wish to see one',
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
      'A written document confirming that a worker has the legal right to work in the UK',
      'A licence issued by the local authority to trade in the area as an electrician',
      'A timesheet recording the hours that each worker spends on each task on the job',
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
      'Routine office filing, photocopying and general administrative work',
      'Hot work, confined space entry, electrical isolation, working at height on roofs',
      'Sweeping floors, clearing offcuts and basic site housekeeping tasks',
      'Ordering materials and arranging deliveries to the site compound',
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
      "The worker's pay rate, the hours worked, the overtime claimed and any travel allowance",
      'The cost of materials and labour, the agreed profit margin and the retention held',
      'Description of work, hazards, precautions, isolation details, time limits, authorisation signatures',
      "The client's contact details, the project completion date and the retention period",
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
      'The brand names of the PPE manufacturers approved for use',
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
      'Leave them out, since emergencies cannot be predicted and the site plan already covers them',
      'Include specific emergency actions, evacuation routes, emergency contacts, and first aid arrangements',
      'A single line instructing workers to call 999 in an emergency is sufficient detail',
      'Add them only after an incident has occurred, when the actual risks are known',
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
      'The number and timing of the rest breaks the supervisor is entitled to take',
      'The salary, benefits and notice period agreed with the site supervisor',
      'Level and type of supervision needed, who the supervisor is, and their responsibilities',
      'The disciplinary and training record of the supervisor named on the job',
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
      'A weekly meeting held in the site office for supervisors and managers',
      'A written report submitted to the client once the work has been finished',
      'A formal training course that must be completed before joining the site',
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
      'Carry on with the original plan regardless of the change that has occurred',
      'Make the change but only update the paperwork at the end of the whole job',
      'Allow each worker on the job to decide individually how to adapt to it',
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
      'Signing the document to confirm receipt, without needing to read through its contents',
      'Ensuring work is planned, supervised, and carried out safely by people with appropriate skills',
      'Approving the project budget, ordering materials and arranging plant hire',
      'Negotiating the contract price and the payment terms with the client',
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
      'Only the purchase price paid for each item of equipment and its current depreciation value',
      'The name of the hire company supplying the equipment and the agreed date of delivery',
      'Equipment needed, inspection requirements, safe use procedures, and any specific limitations',
      'The serial numbers of each item of equipment, recorded for insurance purposes on site',
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
      'Each trade should work independently of the others and just ignore them',
      'Interface risks are the sole responsibility of the client, not the trades',
      'They should be considered only after a conflict has actually occurred',
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
      'Only the final invoice issued to the client at practical completion of the job',
      'The names of the workers who signed in at the site gate that day',
      'The delivery notes for the materials used on the job and their prices',
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
      'A full rewrite of the method statement produced after the work has been done',
      'A summary of key points from the method statement communicated to workers before starting',
      'A written test on the method statement that every worker must pass to start',
      'A record of how long the task took, compared against the tender allowance',
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
      "Housekeeping is the client's responsibility, not the contractor's",
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
      'To record the hours that each worker has spent on the task that day',
      'To confirm that the final invoice has been paid by the client in full',
      'To transfer all liability for the work to the worker who did it',
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
      'The temperature and humidity preferred by the workers in the area',
      'The choice of paint colour and finish for the completed installation',
      'The brand of refreshments provided in the site welfare facility',
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
      'On construction sites and in workshops, but not in domestic premises',
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
      'Recover the cost of the PPE from employees through agreed deductions from their weekly wages',
      'Provide PPE to supervisors and managers only, since operatives supply their own on site',
      'Supply the PPE but leave its inspection, maintenance and replacement to each individual worker',
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
      'A hi-vis vest and hard hat alone, since these cover every electrical situation',
      'Safety footwear, insulating gloves (if appropriate), eye protection, suitable clothing',
      'Ear defenders and an FFP3 dust mask, worn for every electrical task on site',
      'No PPE at all, once the circuit has been isolated and proved dead',
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
      'Whichever option is the cheapest one available from the nominated PPE supplier',
      'The colour, the appearance and the branding of the equipment worn on site',
      'The reputation of the manufacturer and the length of the warranty offered',
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
      'Only once when they are first purchased, and then never again after that',
      'At regular intervals as specified by the manufacturer, typically every 6 months',
      'After each use on a live circuit only, and at no other interval at all',
      'Every five years, in line with the fixed-wiring inspection interval',
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
      'A protective device that detects series and parallel arc faults and disconnects',
      'A flame-retardant coating applied to cables to prevent arc tracking on terminals',
      'Specialised PPE protecting against thermal hazards from electrical arc flash incidents',
      'A high-output camera flash used when photographing faults in dark switchrooms',
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
      "To keep the wearer's feet warm in cold conditions",
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
      'A method allowing work to continue safely on equipment that deliberately remains energised',
      'A procedure for keeping the different trades physically apart on a congested site',
      'A way of removing from the job a worker who is behaving dangerously on site',
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
      'Switch off, start work immediately, then prove the circuit dead once it is exposed',
      'Prove dead first, then isolate the circuit, apply the lock-off and begin the work',
      'Isolate the circuit and rely on a warning notice at the board instead of a lock',
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
      'To calibrate the indicator against the exact supply voltage present',
      'To ensure it is working correctly and give confidence the circuit is dead',
      'To discharge any charge stored in the battery of the indicator',
      'To record the test result on the certification paperwork later',
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
      'A test instrument used to measure the insulation resistance of a circuit already isolated',
      'A device used to discharge the stored energy from capacitors before work can begin',
      'A known voltage source to test voltage indicators work correctly before and after use',
      'A logger that records the voltage at the supply intake across a 24 hour period',
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
      'To secure hand tools and test instruments inside the locked site container against theft',
      'To hold the consumer unit cover closed once the final testing work has been completed',
      'To identify which ways on the distribution board are currently spare and unused',
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
      'The supervisor applies a single lock and keeps the only key on behalf of the whole team',
      'Whoever finishes their part of the work first removes the lock for the whole team',
      'Each person signs a register at the board instead of fitting a lock of their own',
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
      'Notices showing the rated current and the type of every protective device that is fitted',
      'Clear warning signs indicating work in progress and prohibition against re-energising',
      'Notices stating the date of the last periodic inspection and the next date it is due',
      'Fire exit notices, assembly point signs and the escape route direction arrows',
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
      'A licence issued by the enforcing authority confirming that the electrician may isolate',
      'A label fixed to the isolator showing its rated current and the circuit that it feeds',
      'A formal documented authorisation for work on or near isolated electrical equipment',
      'A certificate issued to the client once the whole installation has been tested',
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
      'Proceed with the work live, since EAWR Reg 14 treats safe isolation as advisory guidance for supervisors',
      'Ask a second person to stand by and hold the live conductors clear for you while the work is carried out',
      'Switch off at the main switch and treat the whole circuit as dead without proving it dead beforehand',
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
      'Test the circuit first, then test on a source known to be live twice afterwards',
      'Test each of the line, neutral and earth terminals of the circuit once',
      'Test on a known live source once, then test the circuit itself only',
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
      'No additional precautions are needed, since the low voltage isolation procedure covers HV work too',
      'Trained authorised persons, HV switching procedures, earthing equipment, additional testing',
      'A single padlock fitted to the HV isolator is enough to secure the point of isolation safely',
      'Insulating gloves rated for low voltage work, plus a hi-vis vest, hard hat and site boots',
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
      'Throw a bucket of water over the fire to cool the burning equipment down',
      'Open all of the windows so that the smoke can escape from the room',
      'Raise the alarm and isolate the power supply if safe to do so',
      'Carry the burning equipment out of the building yourself first',
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
      'Water (red label), as it cools the equipment',
      'Foam (cream label), as it smothers the flames',
      'Wet chemical (yellow label), for cooking-oil fires',
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
      'Pull the casualty clear of the supply by hand first, then check whether they respond at all',
      'Give the casualty a warm sweet drink and let them rest until they feel better again',
      'Wait for the casualty to recover unaided before you approach the equipment at all',
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
      'You might disturb their clothing and make any burns they have worse',
      'You could become part of the circuit and also receive a shock',
      'You could be accused of assault if they later make a complaint',
      'You might startle them and cause them to panic and fall',
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
      'Superficial reddening of the skin only, which heals within a day or two without treatment',
      'Surface burns to the hands and the forearms only, and never to the internal tissues',
      'Entry and exit burns, as well as internal tissue damage along the current path',
      'Burns arise only where the supply voltage exceeds 1000V at the point of contact',
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
      'Apply butter or a greasy ointment to the burn, bandage it firmly and send the casualty home to rest for the day',
      'Burst any blisters that form and peel away any clothing that has stuck to the burnt skin underneath it',
      'Leave the casualty seated until the swelling has subsided, then return them to their normal duties',
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
      'The location of the nearest fire extinguisher, the class of fire it is suited to and the date it was last serviced and tested',
      'The names of the site\'s appointed first aiders, the location of the first aid kit and where the accident book is kept on site',
      'The telephone number for the local fire service, the full site postcode and the location of the nearest hospital',
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
      'Once only, when the workplace is first brought into use, and never again afterwards',
      'Regularly, with fire drills at least annually and more frequent briefings',
      'Only after a real fire or emergency has actually occurred on the premises itself',
      'Whenever a new fire risk assessment is carried out by a competent fire assessor',
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
      'The names, job titles and home addresses of everyone currently employed on site',
      'The company\'s annual turnover, its profit figures and its insurance cover',
      'Fire action notices, evacuation routes, assembly points, emergency contacts',
      'The cost of the building\'s insurance policy and its date of renewal',
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
      'To re-enter the building once it has been cleared in order to retrieve valuable tools and equipment',
      'To tackle any fire single-handedly, whatever its size or type, before calling the fire brigade out',
      'To carry out the annual service and pressure testing of every fire extinguisher on site',
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
      'Always, whatever the size or type of the fire, since the extinguishers on site are provided for use',
      'Only once the fire service has arrived on the site and has asked the site team for assistance',
      'If the fire is blocking your only escape route, whatever its size, type or the training you hold',
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
      'A place in which fire-fighting equipment for the whole building is stored',
      'A safe location where evacuated personnel gather to be accounted for',
      'A meeting room used for the daily briefings given to the site team',
      'A designated area for parking site vehicles and plant safely',
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
      'The names of staff who failed to evacuate within the target time',
      'The evacuation time achieved and nothing further, unless there was an injury',
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
      'Flushed warm skin, a slow but strong pulse, and a noticeably increased appetite',
      'Sudden bursts of energy, unusually clear thinking, and slow steady breathing',
      'Raised body temperature, dry skin, and a strong feeling of euphoria',
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
    question:
      "Under CDM 2015 Regulation 9, what is the principal designer's duty when planning the pre-construction phase?",
    options: [
      'To supervise the day-to-day construction work physically on site and to sign off in writing each contractor\'s method statement before it starts on site',
      'To plan, manage, monitor and coordinate health and safety in the pre-construction phase, including identifying and eliminating foreseeable risks',
      'To prepare the construction phase plan before the work begins and to keep it under review for the whole of the build programme on the client\'s behalf',
      'To notify the HSE on an F10 form before any construction work starts and to update that notification whenever the project changes during the build',
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
      'Whenever the total contract value exceeds £100,000, at which point the client must make the appointment in writing under Reg 5 before any work starts on site',
      'Whenever the contractor directly employs more than ten workers on the site at any one time, whatever the number of other contractors on the project',
      'When more than one contractor is, or is reasonably foreseeable to be, working on the project at the same time — the client must appoint one in writing',
      'Automatically on any project scheduled to last longer than 30 working days, regardless of how many contractors are engaged on the site at the time',
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
      'Appoint a principal designer and a principal contractor on the client\'s behalf, and notify the HSE on an F10 form before any construction work begins on the site',
      'Compile the health and safety file for handover to the client at the end of the project and keep a copy of it in the office for the whole life of the structure',
      'Obtain written confirmation from the client that the whole site has been surveyed and is entirely free of asbestos-containing materials before starting',
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
    question:
      'Under CAR 2012 (Control of Asbestos Regulations), what is a refurbishment and demolition (R&D) survey for?',
    options: [
      'To locate and describe all asbestos-containing materials before refurbishment or demolition, so they can be removed before work starts',
      'To support the day-to-day management of asbestos left in place during the normal occupation of the building, without disturbing it at all',
      'To estimate the cost of removing all of the asbestos from the building so that the refurbishment contract can be priced accurately at tender',
      'To confirm that the building has never contained any asbestos, so that no asbestos register needs to be kept for the premises in future',
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
    question:
      'Under CAR 2012, who can carry out licensed asbestos work such as removing sprayed coatings or asbestos insulating board (AIB) in poor condition?',
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
    question:
      "You're a supervisor on a 1970s commercial refurb. An apprentice drills into a ceiling tile and a grey fibrous dust falls out. What do you do first?",
    options: [
      'Carry on drilling but instruct the apprentice to put on a disposable dust mask and to open the windows to ventilate the room while work continues',
      'Sweep up and damp down the dust quickly to stop the fibres spreading through the building, then carry on with the installation as planned',
      'Stop work immediately, prevent access to the area, isolate the suspect material from disturbance, and report it to the client and duty holder',
      'Take a sample of the dust yourself, send it to a laboratory for analysis, and carry on working while you wait for the result to arrive',
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
      'For every construction project, whatever its duration or the number of workers on site, as soon as the contract has been signed and before any work starts',
      'Only where asbestos-containing materials are present on the site, so that a licensed removal contractor can be appointed and notified in advance of it',
      'When the total contract value exceeds £250,000, whatever the duration of the work or the number of workers engaged on the site at any one time',
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
      'A document setting out how the design risks will be managed during the project, prepared by the principal designer before any work starts on the site',
      'A record of the residual hazards handed to the client at the end of the project, prepared and kept by the client themselves for future maintenance',
      'A notification of the project sent to the HSE on an F10 form, prepared by the principal designer on the client\'s behalf before any work starts',
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
      'A file of method statements compiled by each contractor as the work proceeds, kept on site only for the duration of the build and then destroyed at practical completion unless the client asks for a copy of it',
      'A file containing information needed to manage health and safety during future construction, maintenance and demolition — handed to the client at project end and kept by them for the life of the structure',
      'A file of risk assessments prepared by the client before the project starts on site, issued to the principal contractor at mobilisation and destroyed once the works have been handed over to the client',
      'A file of design drawings and calculations retained by the principal designer for their own records, which the client and any future owner have no right to see once the project has been completed',
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
    question:
      'Under the Building Safety Act 2022, what is a higher-risk residential building (HRRB)?',
    options: [
      'Any building used mainly for industrial or commercial purposes, whatever its height or the number of storeys',
      'Any building that is at least 11 metres high containing any number of residential units, whatever its storeys',
      'A building at least 18 metres high or with at least 7 storeys, containing at least two residential units',
      'Any residential building that is more than 30 years old, whatever its height or number of storeys',
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
      'A continuous protective earth conductor run through the whole building to bond every metallic service together at a single point of connection',
      'A fire-resisting cable that maintains circuit integrity for the fire alarm and emergency evacuation systems in the building during a fire',
      'A single named contractor made responsible for the building from the initial design through to its eventual demolition many years afterwards',
      'A digital, accurate, accessible record of building information that supports safe design, construction and ongoing management of HRRBs',
    ],
    correctAnswer: 3,
    explanation:
      "The golden thread is a structured digital information record required by the BSA 2022 for HRRBs. It must be accurate, up-to-date, accessible to dutyholders, and supports safe design, construction, occupation and remediation throughout the building's life.",
    section: '1.9',
    topic: 'Asbestos and CDM 2015',
    difficulty: 'advanced',
  },
  {
    id: 212,
    question: 'The asbestos duty holder under CAR 2012 Reg 4 is responsible for what?',
    options: [
      'Managing the risk from ACMs in non-domestic premises — finding them, recording them, assessing risk, planning management, and providing the information to anyone liable to disturb them',
      'Physically removing all asbestos-containing materials from the premises within 12 months of the survey, whatever their type, location or condition, and certifying the building clear afterwards',
      'Notifying every visitor and contractor entering the premises in writing that asbestos is present, and obtaining their signed acknowledgement before they are allowed into the building',
      'Commissioning a full refurbishment and demolition survey of the whole premises every year and sending a copy of the report to both the HSE and the local authority for their records',
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
    question:
      "You arrive on a domestic CU change in a 1960s flat. The client has no R&D survey. What's your supervisor-grade response?",
    options: [
      'Proceed with the work, since domestic dwellings sit outside the Control of Asbestos Regulations and the householder is not a duty holder under them',
      "Refuse to start until the client confirms in writing whether ACMs are present in the area you'll disturb, or commissions an appropriate survey",
      'Carry on with the consumer unit change but wear a disposable dust mask and damp down the wall while drilling the fixings for the new consumer unit',
      'Take a sample of any suspect material yourself, send it away for analysis and carry on with the job while you wait for the results to arrive',
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
    question:
      'What is the difference between licensable, notifiable non-licensed (NNLW) and non-licensed asbestos work?',
    options: [
      'Licensable work is the lowest risk category; NNLW is medium risk; non-licensed work is the highest risk and is the category that requires an HSE licence, notification and medical surveillance for those workers',
      'They are three interchangeable names for the same category of asbestos work, with no real difference in the controls, training, medicals or records required for any of them, whichever of them is being used',
      'Licensable = highest risk, requires HSE licence; NNLW = sporadic/low intensity but still requires notification, training, medicals, records; Non-licensed = lowest risk asbestos work with limited controls',
      'Licensable work applies to domestic premises, NNLW applies to commercial premises and non-licensed work applies to industrial premises, the category following the building type, rather than the risk involved',
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
      'A full asbestos removal licence issued by the HSE and renewed every three years, held before any work is carried out near ACMs on the site first',
      'No specific training is required, provided suitable respiratory protective equipment is worn whenever ACMs may be disturbed on the site',
      'Manual handling training only, so that asbestos cement sheets can be lifted and carried away whole without being broken up on the site',
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
    question:
      'Under CDM 2015 Reg 4, what is a domestic client and how do their duties pass to the contractor?',
    options: [
      'A client having work done in their own home not connected to a business — most CDM duties pass automatically to the contractor (or principal contractor where there are several)',
      'A client running a business from their own home, who therefore keeps every client duty personally and must appoint the principal designer and principal contractor in writing themselves',
      'A landlord having work done on a property they rent out, who keeps all the client duties because the property is not the home that they themselves occupy, whatever the size of the job',
      'A commercial client whose duties pass in full to the principal designer alone, leaving the principal contractor with no client duties at all, whatever the size of the project',
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
    question:
      'A client tells you "we don\'t have an asbestos register, just get on with it" before a commercial rewire. What do you, as supervisor, do?',
    options: [
      'Get on with the rewire as instructed, since the client has accepted the risk and under CAR 2012 the duty to manage asbestos sits with the occupier of the premises alone, not with the contractor',
      'Refuse to start. Inform the client in writing that under CAR 2012 Reg 4 they have a duty to manage asbestos and provide the information; without it the work cannot proceed safely or lawfully',
      'Start the rewire but issue the whole team with respiratory protective equipment and instruct them to stop work if any suspect material is disturbed, recording any such incident in the site diary',
      'Commission and pay for the asbestos survey yourself so the programme is not delayed, then start the rewire while the surveyor is still working through the building, and recover the cost afterwards',
    ],
    correctAnswer: 1,
    explanation:
      "Without the duty holder's asbestos information you cannot plan safe work in a non-domestic premises. As supervisor you must refuse to start and put it in writing. Proceeding without the survey/register is a CAR 2012 breach for both client and contractor.",
    section: '1.9',
    topic: 'Asbestos and CDM 2015',
    difficulty: 'advanced',
  },
  {
    id: 218,
    question:
      'Under CDM 2015 Reg 8, what general duty does every dutyholder have around competence?',
    options: [
      'They must hold at least ten years\' documented experience in their trade and a recognised qualification before being appointed to the role on a project of this kind',
      'They must be a registered member of an approved competent person scheme, which the client is required to verify in writing before making the appointment',
      'They must have, or organisations must ensure they have, the skills, knowledge, training and experience appropriate to their role — and behavioural capability',
      'They must be assessed and approved in writing by the HSE or the local authority before anyone is permitted to start work on site on a notifiable project',
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
    question:
      'You discover ACM dust spread through a corridor after an unrelated trade has drilled a wall. As supervisor, what is your sequence of actions?',
    options: [
      'Carry on with the works but instruct everyone in the corridor to wear disposable dust masks and open the windows until the dust has settled and been swept up at the end of the working shift',
      'Sweep up the dust quickly, bag it and dispose of it in the general site waste skip, then hose down the whole corridor before anyone else walks through the area, and carry on with the works',
      'Wait until the end of the shift, then report the spread to the duty holder so the day\'s works are not disrupted, and let the cleaners deal with it overnight instead of stopping',
      "Evacuate and seal the area, stop all work, notify the duty holder and HSE if appropriate, arrange licensed clean-up, retain workers' clothing for assessment, log near miss and review",
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
      'A management survey is fully intrusive and carried out before demolition; an R&D survey is a quick visual check made while the building is still occupied and in use',
      'Both surveys are identical in scope and method; the two names are simply used interchangeably by different surveying companies for the same report on a building',
      'A management survey is used for domestic premises and an R&D survey only for commercial premises, the type of building deciding which of the two applies to the job',
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
    question:
      "Under CDM 2015, what is the principal designer's duty regarding designers under their control?",
    options: [
      'To physically supervise each designer at their desk and personally check and sign every drawing before it is issued for construction work on the site',
      'To coordinate matters relating to health and safety and ensure designers cooperate, share information and apply the general principles of prevention',
      'To approve the fee charged by each designer on the project and to certify their invoices before the client makes any payment to them for the work',
      'To carry out all of the design work personally rather than delegating any part of it to the other designers on the design team for the project',
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
    question:
      "A subcontractor's RAMS does not address asbestos at all on a 1980s commercial site. As principal contractor what do you do?",
    options: [
      'Approve the RAMS as it stands, since asbestos is the client\'s concern under CAR 2012 and the duty to manage it does not sit with the principal contractor at all',
      'Let the subcontractor start on the low-risk areas and have the asbestos section added to the RAMS later in the week once the asbestos register arrives on site',
      "Reject the RAMS, require it to be revised to address ACMs based on the duty holder's register/survey, and verify it before allowing the subcontractor on site",
      'Write the missing asbestos section yourself on the subcontractor\'s behalf, issue it back to them as approved and keep a copy of it in the site file',
    ],
    correctAnswer: 2,
    explanation:
      "Approving deficient RAMS is a principal contractor failing under CDM 2015 Reg 13. Reject it, share the duty holder's asbestos register, and require revision. Don't allow the subcontractor on site until the RAMS adequately addresses identified ACMs.",
    section: '1.9',
    topic: 'Asbestos and CDM 2015',
    difficulty: 'advanced',
  },
  {
    id: 223,
    question: 'Under CDM 2015, what is "pre-construction information" (PCI) and who provides it?',
    options: [
      'A plan prepared by the principal contractor before construction begins, setting out how the work on the site will be managed safely throughout',
      'A record of the residual hazards compiled at the end of the project and handed to the client for any future maintenance and demolition work',
      'The notification of the project sent to the HSE on an F10 form by the client before any construction work starts on the site, whatever its duration',
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
    question:
      'Under CAR 2012, what records must be kept after non-licensed but notifiable asbestos work (NNLW)?',
    options: [
      'Personal exposure records for at least 40 years and health surveillance records, with workers having access to their own records',
      'Personal exposure records must be kept for 3 years only, after which the employer may destroy them without notice to the worker at all',
      'No records at all are required, since NNLW is classed as low risk and falls entirely outside the record-keeping duty for it',
      'Only a verbal notification to the worker that they were exposed, with nothing kept in writing by the employer at any time',
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
    question:
      'You are the appointed supervisor on a small commercial refurb under CDM 2015. The client has not appointed a principal designer. What do you do?',
    options: [
      'Carry on without a principal designer, since the appointment is optional on any project that is not notifiable to the HSE under Reg 6 and lasts fewer than 30 working days in any event',
      'Inform the client in writing that they must appoint a principal designer (Reg 5) where more than one contractor is involved, and that without it the project cannot lawfully proceed',
      'Appoint yourself as principal designer to keep the project moving, tell the client afterwards and record the appointment in the site file, so that the programme is not delayed at all',
      'Notify the HSE on an F10 form instead of appointing anyone, since notification removes the need to make the dutyholder appointments in writing before any work starts on site',
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
    question:
      'Under HASAWA Section 7, what duty does an employee owe to themselves and others while at work?',
    options: [
      'To carry out a written risk assessment for every task before starting it and to file a copy of it with their employer at the end of each day worked',
      'To provide their own personal protective equipment at their own cost and to replace it whenever it becomes worn or damaged while in use on site',
      'To take reasonable care of their own health and safety and that of others affected by their acts or omissions, and cooperate with the employer',
      'To report every accident directly to the HSE under RIDDOR within ten days of it happening, whatever the severity of the injury to the person concerned',
    ],
    correctAnswer: 2,
    explanation:
      "Section 7 places personal criminal duties on every employee: take reasonable care of own and others' health and safety, and cooperate with the employer. Breach can lead to individual prosecution — supervisors and apprentices alike are liable.",
    section: '1.10',
    topic: 'Supervisor Responsibilities',
    difficulty: 'advanced',
  },
  {
    id: 227,
    question:
      'Under HASAWA Section 37, when can a director or senior manager be personally prosecuted alongside the company?',
    options: [
      'Only where the director was physically present on the site at the time the offence was committed and took no steps at all to stop the work being carried out',
      'Where the director personally carried out the dangerous work, since liability under HASAWA follows the person actually doing the task on the day',
      'Never; only the company itself can be prosecuted, as HASAWA duties attach to the undertaking and never to an individual officer of it personally',
      'Where an offence by the company is committed with their consent, connivance or attributable to their neglect — they may be charged personally as well',
    ],
    correctAnswer: 3,
    explanation:
      "Section 37 HASAWA exposes directors and senior managers personally where the company's offence was committed with their consent, connivance, or due to their neglect. This is the basis for many personal H&S prosecutions and disqualifications.",
    section: '1.10',
    topic: 'Supervisor Responsibilities',
    difficulty: 'advanced',
  },
  {
    id: 228,
    question:
      'Under the Sentencing Council Definitive Guideline 2016 (Health and Safety Offences), what factors determine the level of fine?',
    options: [
      "Culpability (very high to low), seriousness of harm risked, likelihood of harm, plus the offender's turnover and aggravating/mitigating factors",
      'Solely the number of previous health and safety convictions recorded against the company over the preceding five years, counted from the date of sentence',
      'Solely the number of employees the company had on its payroll on the date the offence was committed and reported',
      'Solely whether the breach was reported voluntarily to the HSE before an inspector attended and served any notice',
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
      'A fixed penalty notice of £5,000 issued on the spot by an inspector for any material breach of health and safety law found on site',
      'A statutory cost recovery scheme charging a hourly fee for HSE inspector time spent identifying and helping to address material breaches of H&S law',
      "A registration fee paid annually by every employer so that their workplace appears on the HSE's national register of premises",
      "A charge made only after a successful prosecution in the courts, used to recover the HSE's legal costs from the convicted offender",
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
      'An improvement notice immediately stops the dangerous work; a prohibition notice gives the employer a period, usually 21 days, to remedy the breach',
      'Both notices stop work immediately, but an improvement notice lasts 21 days while a prohibition notice lasts indefinitely',
      'Improvement notice gives time to remedy a breach; prohibition notice immediately stops an activity that involves a risk of serious personal injury',
      "An improvement notice is issued by the magistrates' court after conviction; a prohibition notice is issued by the inspector on site",
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
      'Any injury treated on site using the first aid kit, including cuts, bruises, sprains, minor burns and anything written in the accident book, provided the worker returns to their normal duties before the end of the same working shift without further treatment',
      'Any injury that keeps a worker away from their normal duties for more than three consecutive days, including strains, sprains and soft-tissue damage, whether or not the worker attended hospital or was seen by a doctor at the time',
      'Only injuries that result in the death of a worker or a member of the public, together with any injury to a self-employed person that leads to a hospital admission lasting longer than 24 hours after the incident',
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
    question:
      'Under RIDDOR 2013, who has the duty to report and what form is used for an over-7-day injury to an employee?',
    options: [
      'The "responsible person" (typically the employer) must report — online via HSE\'s reporting portal, equivalent to F2508',
      'The injured worker must report it themselves, using form F10 online within ten days of the accident happening',
      'The site first aider must report it by telephone to the HSE within 24 hours of treating the casualty',
      "The HSE inspector for the area must report it on the employer's behalf once they have investigated",
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
    question:
      'A near-miss happens on your site — a live conductor is touched but no shock occurs because of insulated tools. As supervisor, what do you do?',
    options: [
      'Note it in the site diary and take no further action, since a near miss with no injury falls outside RIDDOR reporting requirements',
      'Investigate, record it in the accident book / near-miss log, review the safe-isolation procedure, brief the team, and use it as a positive learning event',
      'Report it immediately to the HSE under RIDDOR as a specified injury, using the online portal, and take no further action as the matter is closed',
      'Discipline the worker for touching a live conductor and issue a written warning before carrying out any investigation into it',
    ],
    correctAnswer: 1,
    explanation:
      "A strong near-miss culture catches risks before they become incidents. As supervisor you must investigate root cause, log it, share learning with the team, and review controls. Even if not RIDDOR-reportable, it's the best free data you'll get.",
    section: '1.10',
    topic: 'Supervisor Responsibilities',
    difficulty: 'intermediate',
  },
  {
    id: 234,
    question:
      "A new RAMS arrives from a designer that you, as supervisor, can see is generic and doesn't reflect site conditions. What's the correct action?",
    options: [
      'Accept it as written, since a generic RAMS covering the activity is enough to satisfy the legal duty',
      'Brief the team on the generic RAMS exactly as issued and start the work straight away',
      "Reject it, require a site-specific RAMS, brief the team only after it's been revised, and document the rejection",
      'Amend the generic RAMS yourself on site without telling the designer who issued it',
    ],
    correctAnswer: 2,
    explanation:
      "A generic RAMS doesn't discharge anyone's MHSWR Reg 3 duty. As supervisor you must reject it, request a site-specific version, and only brief once it reflects actual hazards. Document the rejection — it protects you and forces good practice upstream.",
    section: '1.10',
    topic: 'Supervisor Responsibilities',
    difficulty: 'advanced',
  },
  {
    id: 235,
    question:
      'How does the Corporate Manslaughter and Corporate Homicide Act 2007 differ from HASAWA prosecution?',
    options: [
      'It targets individual directors and senior managers personally rather than the organisation, and on conviction carries an unlimited fine and a prison term',
      'It applies only where a worker is seriously injured but survives, whereas HASAWA is used for prosecutions following a workplace fatality',
      'It replaces HASAWA entirely for all health and safety offences committed after 2007, so the two Acts are never used together',
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
    question: "Under MHSWR 1999 Reg 3, what is the employer's risk assessment duty?",
    options: [
      'A suitable and sufficient assessment of risks to employees and others affected by their work, recorded if 5+ employees, reviewed when significant changes occur',
      'A suitable and sufficient assessment of the risks to their own employees only, with no duty owed to contractors, visitors or members of the public affected by the work',
      'A single written assessment carried out annually which, once signed, cannot be altered until the next annual review falls due',
      'An assessment that only needs to be recorded in writing where the employer has 50 or more employees on the payroll',
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
      "Arrangements to pay compensation to any worker injured at work, funded through the employers' liability insurance policy the law requires every employer to hold",
      'Effective arrangements for the planning, organisation, control, monitoring and review of preventive and protective measures — recorded by employers with 5+ employees',
      "Arrangements to notify the HSE in writing before any new work activity begins on the employer's premises, and to await written approval",
      'Arrangements to insure the workplace and everything in it against loss caused by fire, flood, storm damage and malicious acts',
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
      'Provide personal protective equipment to every worker first, and only consider eliminating or substituting the hazard where the PPE issued proves inadequate in use; collective measures are then applied last of all once individual protection has failed',
      'Identify the hazards; decide who might be harmed and how; evaluate the risks and decide on precautions; record your significant findings; and review the assessment, updating it whenever anything changes on site',
      'Avoid risks; evaluate unavoidable risks; combat at source; adapt work to the individual; adapt to technical progress; replace dangerous with less dangerous; develop coherent prevention policy; collective over individual measures; instruct workers',
      'Plan the work; do the work in accordance with the plan; check that the controls put in place are working; act on what the check shows; and repeat the cycle continuously throughout the whole of the project',
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
    question:
      'A worker refuses to wear safety glasses during drilling overhead. As supervisor what is your response?',
    options: [
      'Let the work continue, since the choice of whether to wear eye protection rests with the individual worker under the Personal Protective Equipment at Work Regulations 1992 themselves',
      'Carry out the overhead drilling yourself so that the worker does not need to wear safety glasses, and note the arrangement in the site diary for the record at the end of the day',
      'Accept a written disclaimer from the worker accepting the risk of eye injury, keep it in the site file, and allow the overhead drilling to continue to the end of the working shift',
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
      'Replace all work equipment with new items every five years, whether or not it remains in serviceable condition, and scrap the old items on site',
      "Provide the work equipment free of charge but recover the cost of any operator training from the employee's wages by agreement",
      'Allow any worker to use any item of equipment without restriction, provided a generic risk assessment for the activity exists',
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
    question:
      'Under Working at Height Regulations 2005, what is the order of priority for managing falls?',
    options: [
      'Always fit a harness and fall-arrest system as the first control on any work at height, since personal protection follows the individual and works whatever the task being carried out',
      'Avoid the work at height; if unavoidable, use work equipment that prevents falls; if not possible, use work equipment that minimises distance and consequences of falls — fall arrest is last',
      'Provide collective measures such as guard rails and edge protection only after a personal fall-arrest system has been tried on site and found to be inadequate',
      'Minimise the consequences of a fall first using airbags or safety netting, then consider whether the fall could have been prevented by other means',
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
    question:
      'A scaffold tag is missing on a tower delivered to your site this morning. As supervisor what do you do?',
    options: [
      'Use the tower as normal, since a missing tag is only an administrative matter for the hire company to sort out',
      'Write out your own tag from the delivery note and attach it to the tower before allowing anyone to use it',
      'Quarantine the tower and refuse use until a competent person inspects and tags it under WAHR 2005 / PASMA — log the incident',
      'Use the tower but only at the lower platform heights, where a fall would not be serious enough to injure',
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
    question:
      'Under the Manual Handling Operations Regulations 1992, what is the order of duties on the employer?',
    options: [
      'Set a fixed maximum weight limit of 25kg per person which no worker may exceed under any circumstances, whatever the load or the task involved',
      'Provide a back-support belt to every worker and require it to be worn whenever any lifting or carrying by hand is carried out on the site',
      'Train workers to lift heavier loads safely so that the manual handling can continue unchanged, and record the training given to each of them',
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
    question:
      'Under the Control of Noise at Work Regulations 2005, what are the lower and upper exposure action values?',
    options: [
      'Lower 80 dB(A) daily/weekly exposure with peak 135 dB(C); upper 85 dB(A) with peak 137 dB(C); exposure limit 87 dB(A) with peak 140 dB(C)',
      'Lower 85 dB(A) daily or weekly exposure with peak 137 dB(C); upper 90 dB(A) with peak 140 dB(C); exposure limit 95 dB(A)',
      'Lower 70 dB(A) daily or weekly exposure with peak 130 dB(C); upper 75 dB(A) with peak 135 dB(C); exposure limit 80 dB(A)',
      'A single action value of 85 dB(A) at the ear with a peak of 137 dB(C), and no separate upper action or exposure limit value',
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
    question:
      'Under the Control of Vibration at Work Regulations 2005, what are the daily exposure action and limit values for hand-arm vibration?',
    options: [
      'Action value 5 m/s² A(8); limit value 2.5 m/s² A(8) — the two values reversed',
      'Action value 2.5 m/s² A(8); limit value 5 m/s² A(8) — over which exposure is prohibited',
      'Action value 80 dB(A); limit value 87 dB(A), the same values used for noise',
      'Action value 1 m/s² A(8); limit value 10 m/s² A(8) — above which gloves are worn',
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
    question:
      'What is the dynamic risk assessment that supervisors are expected to do continuously on site?',
    options: [
      'A single written assessment completed once at the start of the project, filed with the construction phase plan and not revisited unless an accident or near miss occurs',
      'A formal documented review carried out only at the end of each working week, signed off by the site manager and filed with the weekly progress report',
      'Continuous mental reassessment of changing site conditions — new hazards, changing weather, fatigue, time pressure — adapting controls in real time and stopping work if needed',
      'An assessment carried out by the client before work begins, which the contractor is not permitted to alter on site whatever conditions they find there',
    ],
    correctAnswer: 2,
    explanation:
      "Written RAMS sets the baseline; dynamic risk assessment is the supervisor's continuous duty to monitor changing conditions and adjust. New trades arriving, weather change, equipment failure, fatigue — any of these can trigger a stop or revision.",
    section: '1.10',
    topic: 'Supervisor Responsibilities',
    difficulty: 'advanced',
  },
  {
    id: 247,
    question:
      'You are tasked with toolbox-talking a brand new safe-isolation procedure. What makes the briefing effective?',
    options: [
      'Read the written procedure aloud quickly from start to finish, move straight on to the work so that the programme is not delayed, and file the attendance sheet for the record afterwards',
      'Hand out the written procedure and let the workers read it through in their own time before they start the job, collecting the signed sheets for the site file at the end of the week',
      'Email the procedure to the workers the night before, assume they have read and understood it, and keep the sent message in the site file as the record of the briefing afterwards',
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
    question:
      'Under Section 3 of HASAWA, what duty does an employer owe to people who are NOT their employees?',
    options: [
      'To conduct their undertaking so as to ensure, so far as is reasonably practicable, that persons not in their employment are not exposed to risks to their health or safety',
      'No duty at all is owed, since the duties under HASAWA run only between an employer and the people they employ under a contract of employment and to no one else at all',
      'A duty owed only to other contractors working on the same site under the same principal contractor, and not to visitors or members of the public passing by nearby',
      'A duty to provide personal protective equipment and a site induction to any non-employee who comes onto the premises at any time while the works are under way',
    ],
    correctAnswer: 0,
    explanation:
      "HASAWA s.3 extends the employer's duty to anyone affected by the work — clients, the public, other contractors, visitors. It is the basis for many prosecutions where work harms a non-employee. Self-employed have an equivalent s.3(2) duty.",
    section: '1.10',
    topic: 'Supervisor Responsibilities',
    difficulty: 'advanced',
  },
  {
    id: 249,
    question:
      'A serious incident has just happened on your site — an electrician suffers a flash burn during fault-finding on live equipment. As supervisor, what is your immediate sequence of actions?',
    options: [
      'Tidy and clear the scene first so that the area looks safe and presentable before any inspector attends, then take statements from the witnesses and telephone the client and the employer',
      'Make safe (isolate hazard), administer first aid / call emergency services, preserve the scene, notify employer and client, secure witnesses, report under RIDDOR if applicable, start investigation',
      'Send everyone home immediately, lock the site up and deal with the whole thing the following morning when the facts are clearer and people are calmer',
      'Move the casualty away from the equipment straight away whatever the nature of their injuries, then drive them to hospital yourself rather than waiting for an ambulance',
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
    question:
      'Looking at HSE prosecution data, what is consistently the most common cause of electrical fatalities in the workplace?',
    options: [
      'Faulty portable appliances that have remained in service since failing their last portable appliance test and were never withdrawn',
      'Lightning strikes on overhead distribution lines feeding rural workplaces and agricultural buildings during summer storms',
      'Working on or near live equipment without adequate isolation or precautions — a failure to apply EAWR Reg 14 and proven safe-isolation procedure',
      'Static electricity discharge from synthetic work clothing and floor coverings in dry, heated indoor environments',
    ],
    correctAnswer: 2,
    explanation:
      'HSE data and the IET Wiring Regulations consistently show working live or with inadequate isolation as the dominant cause of workplace electrical fatalities. EAWR Reg 14 effectively presumes work shall be dead unless live work is justified, planned, and supervised.',
    section: '1.10',
    topic: 'Supervisor Responsibilities',
    difficulty: 'advanced',
  },
  {
    id: 251,
    question:
      'On a multi-contractor refurbishment your firm is one of several contractors. Under CDM 2015, who must plan, manage, monitor and coordinate health and safety during the construction phase?',
    options: [
      'The principal designer appointed by the client for the project',
      'The principal contractor appointed by the client for that job',
      'The client, who retains all site coordination duties throughout',
      'Each contractor separately, with no single lead coordinating',
    ],
    correctAnswer: 1,
    explanation:
      'CDM 2015 gives the principal contractor the duty to plan, manage, monitor and coordinate health and safety in the construction phase, and to prepare the construction phase plan. The principal designer is the attractive wrong answer because it carries the same wording, but that role coordinates the pre-construction phase and the health and safety file, not the work on site.',
    section: '1.1',
    topic: 'Duty Holders',
    difficulty: 'advanced',
  },
  {
    id: 252,
    question:
      'A householder engages you to rewire their home and two other contractors are also engaged, but no appointments have been made in writing. Under CDM 2015, where do the client duties sit?',
    options: [
      'They stay with the householder, who must appoint the duty holders',
      'They pass to the principal contractor for that construction work',
      'They lapse entirely because the work is domestic and not a business',
      'They pass to the building control body notified for the works',
    ],
    correctAnswer: 1,
    explanation:
      'Domestic clients are in scope of CDM 2015, but where they do not make the appointments their client duties transfer automatically to the contractor on a single contractor project or to the principal contractor where there is more than one. The idea that domestic work falls outside CDM is a common misreading: the duties do not disappear, they simply move to the contractor side.',
    section: '1.1',
    topic: 'Duty Holders',
    difficulty: 'advanced',
  },
  {
    id: 253,
    question:
      'A manager asks you to work on exposed live conductors. Under the Electricity at Work Regulations, live working may only proceed where which set of conditions is satisfied?',
    options: [
      'It is unreasonable for it to be dead, reasonable to work live, and precautions are taken',
      'A permit is issued, insulated tools are used, and a colleague stands by as an observer',
      'The voltage is below 400 V, the work is short, and the operative holds a skills card',
      'The client accepts the risk in writing, gloves are worn, and the area is barriered off',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 14 sets three conditions and all three must be met: it is unreasonable in all the circumstances for the conductor to be dead, it is reasonable for the person to be at work on or near it live, and suitable precautions have been taken to prevent injury. If one fails, dead working is compulsory. A permit plus an observer is attractive because those are real controls, but they only satisfy the third condition and cannot make live work lawful on their own.',
    section: '1.1',
    topic: 'Electricity at Work Regulations',
    difficulty: 'advanced',
  },
  {
    id: 254,
    question:
      'You are isolating a final circuit at a distribution board before altering it. What is the correct order of the key steps?',
    options: [
      'Identify, isolate, prove dead, then secure the isolator with lock and notice',
      'Identify, isolate, secure against reconnection, then prove the circuit dead',
      'Isolate, identify the circuit, prove dead, then fit a lock and warning notice',
      'Isolate, prove dead, identify the circuit, then secure with lock and notice',
    ],
    correctAnswer: 1,
    explanation:
      'The circuit is identified, isolated, then locked off and labelled so it cannot be re-energised, and only then proved dead. Securing must come before proving dead: if the lock goes on last, someone can switch the supply back on in the window between your dead test and your first touch on the conductors, and your test result is then worthless. Proving dead is the final confirmation that the securing worked, not a step that replaces it.',
    section: '1.3',
    topic: 'Safe Isolation',
    difficulty: 'advanced',
  },
  {
    id: 255,
    question:
      'You are using an approved voltage indicator with a proving unit to prove a circuit dead. How should the proving unit be used?',
    options: [
      'Prove the indicator before testing the circuit and again afterwards',
      'Prove the indicator once at the start of each working day on site',
      'Prove the indicator if it fails to show a reading during the test',
      'Prove the indicator after the test, as a pre-check adds nothing',
    ],
    correctAnswer: 0,
    explanation:
      'The indicator is proved on a known source before the dead test and re-proved after it. The pre-check shows the instrument was working when you started; the post-check shows it did not fail during the test, which is the failure mode that would let a live circuit read as dead. Proving once a day is the attractive wrong answer because it feels systematic, but an indicator can fail at any point between checks, and every dead test in between would be unverified.',
    section: '1.3',
    topic: 'Safe Isolation',
    difficulty: 'advanced',
  },
  {
    id: 256,
    question:
      'Which arrangement best secures an isolated circuit against reconnection while you work on it?',
    options: [
      'A padlock you fit to the isolator, with you holding the only key',
      'A warning notice on the board asking others not to switch it on',
      'A verbal instruction to the site team that the circuit stays off',
      'Removing the fuse and leaving it on the bench beside the board',
    ],
    correctAnswer: 0,
    explanation:
      'Securing means physically preventing re-energisation, and a lock whose only key is in your pocket does that. Removing the fuse is the attractive wrong answer because it does break the supply, but a loose fuse sitting next to the board can be refitted by anyone, so it secures nothing unless the carrier itself is locked or the fuse is kept on your person. Notices and verbal instructions inform people but cannot stop a switching operation.',
    section: '1.3',
    topic: 'Safe Isolation',
    difficulty: 'intermediate',
  },
  {
    id: 257,
    question:
      'Your electrical permit to work lists a single point of isolation, but on site you find the panel is also fed from a second supply. What should you do?',
    options: [
      'Isolate the second supply yourself and note the change on the permit',
      'Stop, return the permit to the issuing authority and have it reissued',
      'Continue, since the permit is still valid for the work it describes',
      'Carry on but treat the second supply as live and keep well clear',
    ],
    correctAnswer: 1,
    explanation:
      'A permit states the exact equipment made dead and the points of isolation. Once the site does not match the permit, the permit is wrong and the work stops until the issuing authority reassesses and reissues it. Amending it yourself is the attractive wrong answer because the isolation may be within your competence, but the permit is a formal record issued by someone else and a self-written change destroys the control the system exists to provide.',
    section: '1.4',
    topic: 'Permits to Work',
    difficulty: 'advanced',
  },
  {
    id: 258,
    question:
      'You are a self-employed electrician working alone on a site run by a principal contractor. Which statement describes your legal position?',
    options: [
      'You must follow the site rules and control the risks from your work',
      'You are covered by the principal contractor and carry no duties',
      'You owe duties only to yourself, as no employees are put at risk',
      'You must give your risk assessments to the client for approval',
    ],
    correctAnswer: 0,
    explanation:
      'A self-employed contractor carries duties in their own right: to plan and carry out their work without creating danger, to cooperate with the principal contractor and to follow the site rules. The idea that the principal contractor absorbs your duties is attractive because they coordinate the site, but coordination does not transfer liability. Your work also affects others on site, so duties to persons other than yourself clearly apply.',
    section: '1.1',
    topic: 'Duty Holders',
    difficulty: 'advanced',
  },
  {
    id: 259,
    question:
      'Under the Management of Health and Safety at Work Regulations, when must an employer record the significant findings of a risk assessment?',
    options: [
      'When the employer has five or more employees in the undertaking',
      'When the work on the site involves electrical systems or supplies',
      'When the assessment identifies a hazard rated as high or severe',
      'When the client or principal contractor asks to see the paperwork',
    ],
    correctAnswer: 0,
    explanation:
      'The trigger for recording significant findings is the size of the employer, at five or more employees. Every employer must assess the risk whatever their size; only the recording duty is tied to headcount. Rating a hazard as high is the attractive wrong answer because a serious hazard obviously deserves writing down, but severity does not create the legal recording duty, and a small firm still has to assess risks it never records.',
    section: '1.2',
    topic: 'Risk Assessment',
    difficulty: 'intermediate',
  },
  {
    id: 260,
    question:
      'It has been decided that a particular job cannot reasonably be carried out dead. Who should carry out the risk assessment for the live work?',
    options: [
      'Any site supervisor holding a current first aid and safety certificate',
      'Someone with thorough knowledge and experience of that type of work',
      'The client representative who signs off the programme for the works',
      'The safety adviser for the company, whatever their trade background',
    ],
    correctAnswer: 1,
    explanation:
      'Guidance on safe electrical working is explicit that the live working risk assessment must be done by someone with comprehensive knowledge and experience of that type of work and of the means of controlling its risks. A safety adviser is the attractive wrong answer because assessing risk is their profession, but without the electrical knowledge they cannot judge whether the proposed precautions actually prevent injury on that equipment.',
    section: '1.2',
    topic: 'Risk Assessment',
    difficulty: 'advanced',
  },
  {
    id: 261,
    question:
      'You are planning a safe system of work for an alteration in an occupied switchroom. Which factor must be established before the job is programmed?',
    options: [
      'The hazards of the system and the risks arising from the work itself',
      'The lead time on the replacement gear and the agreed handover date',
      'The labour available in the depot during the week of the shutdown',
      'The welfare and parking arrangements for the team while on that site',
    ],
    correctAnswer: 0,
    explanation:
      'Planning a safe system of work starts from the work to be done and the hazards of the system being worked on, because everything else follows from that: who is competent to do it, what supervision is needed and what precautions apply. Programme and resourcing are the attractive wrong answers because they genuinely are planning inputs, but they shape when the work happens rather than whether it can be done safely at all.',
    section: '1.4',
    topic: 'Safe Systems of Work',
    difficulty: 'advanced',
  },
  {
    id: 262,
    question:
      'You are supervising a second-year apprentice who is asked to carry out a task you have never seen them do. What is the correct supervisory response?',
    options: [
      'Set the supervision from their competence and work alongside them',
      'Let them attempt it alone and check the finished work afterwards',
      'Give them the maker instructions and a phone number if stuck',
      'Refuse the task until they hold the full craft qualification',
    ],
    correctAnswer: 0,
    explanation:
      'Planning work has to take account of the people doing it, their competence and the level of supervision necessary, and an unfamiliar task means close supervision until competence is demonstrated. Refusing outright is the attractive wrong answer because it feels cautious, but qualifications are earned through supervised work, and a blanket refusal simply pushes the learning to a job where nobody is watching.',
    section: '1.8',
    topic: 'Supervision',
    difficulty: 'advanced',
  },
  {
    id: 263,
    question:
      'A client is pressing you to energise a new board before the protective conductor connections have been verified. What is the correct course of action?',
    options: [
      'Energise it and complete the earthing checks first thing next morning',
      'Refuse to energise until the checks are done, and explain the reason',
      'Energise it but post a notice warning others not to use the circuits',
      'Ask the client to sign a disclaimer accepting the risk of energising',
    ],
    correctAnswer: 1,
    explanation:
      'Commercial pressure does not displace a statutory duty, and energising an installation whose protective conductors are unverified exposes users to shock risk from the moment it is live. The disclaimer is the attractive wrong answer because it looks like the client is taking the risk on, but a client cannot sign away your duty to people who may be harmed, and the document would offer you no protection at all.',
    section: '1.8',
    topic: 'Stopping Unsafe Work',
    difficulty: 'advanced',
  },
  {
    id: 264,
    question:
      'While chasing a wall in a 1970s building you break into an unidentified board that may contain asbestos. What is the correct immediate action?',
    options: [
      'Stop work, leave the area and report it so the material is identified',
      'Damp the debris down, bag it up and carry on with the chase as planned',
      'Fit a disposable dust mask and finish the chase to limit the exposure',
      'Sweep the debris clear and photograph the board for the site records',
    ],
    correctAnswer: 0,
    explanation:
      'Suspected asbestos means stopping, withdrawing and getting the material identified before anything else happens, because further disturbance releases more fibres. Damping down and bagging up is the attractive wrong answer because those are genuine control techniques, but they belong to a planned job done by trained people under a written plan of work, not to an unplanned discovery by an electrician mid-chase.',
    section: '1.5',
    topic: 'Asbestos',
    difficulty: 'intermediate',
  },
  {
    id: 265,
    question:
      'Before maintenance work liable to disturb asbestos begins, what does the Control of Asbestos Regulations require of the employer?',
    options: [
      'To identify the presence, type and condition of asbestos beforehand',
      'To provide face-fit tested respirators to all entering the building',
      'To notify the enforcing authority of any job in a pre-2000 building',
      'To arrange air monitoring throughout the whole duration of the work',
    ],
    correctAnswer: 0,
    explanation:
      'The duty is to establish whether asbestos is present, and its type and condition, before work starts, arranging a survey where the existing information is incomplete or looks unreliable. Issuing respirators is the attractive wrong answer because respiratory protection is a real control, but it is chosen on the strength of an assessment that can only be made once the material has been identified.',
    section: '1.5',
    topic: 'Asbestos',
    difficulty: 'advanced',
  },
  {
    id: 266,
    question:
      'You must terminate a cable on a high level tray run. Which sequence reflects the approach required by the Work at Height Regulations?',
    options: [
      'Avoid the work at height, then prevent a fall, then minimise its effects',
      'Issue a harness, then write a rescue plan, then permit the work to start',
      'Assess the drop height, then choose a ladder, then brief the operative',
      'Barrier off the floor below, then post a signaller, then start the work',
    ],
    correctAnswer: 0,
    explanation:
      'The regulations follow a fixed order: avoid working at height where the job can be done from the ground, prevent falls where it cannot, and minimise the distance and consequences of a fall where a risk remains. Going straight to a harness and rescue plan is the attractive wrong answer because those are proper controls, but reaching for them first skips the two steps that would have removed the exposure.',
    section: '1.6',
    topic: 'Work at Height',
    difficulty: 'advanced',
  },
  {
    id: 267,
    question:
      'You are choosing fall protection for installing containment above an open stairwell. Which principle should guide the selection?',
    options: [
      'Choose collective protection in preference to personal protection',
      'Choose personal protection because it is issued to the individual',
      'Choose whichever measure the operatives are already trained to use',
      'Choose the option that keeps the programme on the agreed timescale',
    ],
    correctAnswer: 0,
    explanation:
      'Collective protection such as a guard rail protects everyone in the area and works without anyone having to do anything, whereas personal protection only works if the individual puts it on and clips it correctly every time. Existing training is the attractive wrong answer because competence matters, but it is a reason to train people for the right measure, not a reason to pick the weaker one.',
    section: '1.6',
    topic: 'Work at Height',
    difficulty: 'intermediate',
  },
  {
    id: 268,
    question:
      'You are proving dead at a three-phase board that is fed from more than one source. What does this mean for your dead testing?',
    options: [
      'Every supply conductor must be proved dead, not just the expected one',
      'Only the line conductor feeding your own circuit needs to be tested',
      'The main switch position can be read instead of testing conductors',
      'An interlocked isolator removes the need to prove conductors dead',
    ],
    correctAnswer: 0,
    explanation:
      'Where equipment has more than one supply, or is three-phase, all supply conductors must be proved dead, since one isolation can leave another source live on the same terminals. Relying on an interlock is the attractive wrong answer because interlocking is a designed safety feature, but guidance is explicit that you still check the parts to be worked on are genuinely dead even when isolation was achieved automatically.',
    section: '1.3',
    topic: 'Safe Isolation',
    difficulty: 'advanced',
  },
  {
    id: 269,
    question:
      'The Electricity at Work Regulations restrict who may do work where technical knowledge or experience is needed. What must apply to the person doing it?',
    options: [
      'They have that knowledge or experience, or are properly supervised',
      'They hold a recognised qualification in electrical installation work',
      'They are named on the construction phase plan drawn up for the site',
      'They have completed a qualifying period of employment with the firm',
    ],
    correctAnswer: 0,
    explanation:
      'The competence requirement is satisfied either by the person possessing the technical knowledge or experience the work demands, or by them being under a degree of supervision appropriate to the nature of that work. Holding a qualification is the attractive wrong answer because it is strong evidence of competence, but the test is knowledge and experience for that particular work, and a certificate alone does not prove it.',
    section: '1.1',
    topic: 'Electricity at Work Regulations',
    difficulty: 'intermediate',
  },
  {
    id: 270,
    question:
      'Which information must an electrical permit to work state if it is to control the work properly?',
    options: [
      'The exact equipment made dead, its location and the points of isolation',
      'A copy of the risk assessment and method statement signed by the client',
      'The full set of test results recorded at the previous inspection visit',
      'The insurance certificate reference covering the contractor on that site',
    ],
    correctAnswer: 0,
    explanation:
      'A permit has to identify precisely which equipment has been made dead, where it is, where it has been isolated and earthed, where notices and locks are fitted, and what work is authorised. The method statement is the attractive wrong answer because it usually accompanies the job, but it describes how work will be done in general, whereas the permit records the specific state of the plant at that moment.',
    section: '1.4',
    topic: 'Permits to Work',
    difficulty: 'advanced',
  },
  {
    id: 271,
    question:
      'A generic method statement written for a similar job last year is handed to you for the work starting today. How should you treat it?',
    options: [
      'Sign it, as the tasks are close enough for the same controls to apply',
      'Reject any written method statement and rely on dynamic assessment',
      'Check it against this job and this site, and have it revised as needed',
      'File it with the site paperwork and brief the team from the induction',
    ],
    correctAnswer: 2,
    explanation:
      'A method statement only controls risk if it describes the actual task, the actual equipment and the actual site conditions, so it has to be reviewed against the job in front of you and amended where it does not fit. Signing it because the work looks similar is the attractive wrong answer: a recycled document that misses one supply, one access restriction or one occupied area gives false assurance to everyone who reads it.',
    section: '1.4',
    topic: 'Safe Systems of Work',
    difficulty: 'advanced',
  },
  {
    id: 272,
    question:
      'You are trenching for a supply to an outbuilding on a site where the service plans are known to be incomplete. What is the correct approach?',
    options: [
      'Excavate with the machine and stop the moment a service is exposed',
      'Work from the plans you have and treat unmarked ground as clear',
      'Post a spotter beside the machine to watch for cables in the spoil',
      'Locate and mark services, then dig by hand close to anything found',
    ],
    correctAnswer: 3,
    explanation:
      'Incomplete plans mean the ground must be scanned with a locator, the findings marked up, and the excavation taken carefully by hand near anything detected, because power tools and machine buckets near buried services are what cause strikes. A spotter is the attractive wrong answer because supervision helps, but by the time a cable is visible in the spoil the bucket has usually already reached it.',
    section: '1.5',
    topic: 'Buried Services',
    difficulty: 'advanced',
  },
  {
    id: 273,
    question:
      'A mobile access tower is to be erected in a yard crossed by an overhead line. What must be settled before the tower is built?',
    options: [
      'That operatives have been briefed to look upward before each lift',
      'That the tower is fitted with insulated wheels and outrigger pads',
      'That a safe clearance from the line is established and enforced',
      'That the line owner has been sent a copy of the method statement',
    ],
    correctAnswer: 2,
    explanation:
      'Overhead lines are controlled by keeping people and equipment outside a defined exclusion zone, physically enforced by barriers, goalposts or repositioning the work, because flashover can occur without contact. Insulated wheels are the attractive wrong answer because insulation sounds protective, but nothing on the tower prevents an arc from the line to the frame or to the person on the platform.',
    section: '1.5',
    topic: 'Overhead Lines',
    difficulty: 'intermediate',
  },
  {
    id: 274,
    question:
      'Under PUWER, what is the purpose of inspecting work equipment whose safety depends on installation conditions or which is exposed to deteriorating conditions?',
    options: [
      'To satisfy the insurer that the equipment carries a current test label',
      'To record the hours run so that servicing can be scheduled cheaply',
      'To confirm that the operator has been trained on that type of machine',
      'To detect deterioration and have it remedied before risks become real',
    ],
    correctAnswer: 3,
    explanation:
      'An inspection exists to establish that the equipment can still be operated, adjusted and maintained safely, and to catch defects, damage and wear before they create an unacceptable risk. Operator training is the attractive wrong answer because it is a genuine PUWER duty, but it sits under the information and training requirements and tells you nothing about the condition of the machine.',
    section: '1.7',
    topic: 'Work Equipment',
    difficulty: 'advanced',
  },
  {
    id: 275,
    question:
      'A 110 V single-phase site transformer supplies portable tools. What is the nominal voltage between a line conductor and earth?',
    options: [
      '110 V, because the whole secondary winding sits above earth potential',
      '63.5 V, which is the value used for three-phase site distribution',
      '55 V, because the midpoint of the secondary winding is earthed',
      '230 V, since the transformer does not alter the earth reference',
    ],
    correctAnswer: 2,
    explanation:
      'BS 7671 limits reduced low voltage to 110 V between lines, with the single-phase arrangement earthed at the midpoint so that either line sits at 55 V to earth. The 63.5 V figure is the attractive wrong answer because it is a real value from the same regulation, but it belongs to the three-phase case where the earthed star point gives 63.5 V to earth.',
    section: '1.7',
    topic: 'Reduced Low Voltage',
    difficulty: 'intermediate',
  },
  {
    id: 276,
    question:
      'You find a colleague in contact with a live conductor and apparently unable to let go. What should you do first?',
    options: [
      'Pull them clear using their clothing, keeping your own hands dry',
      'Begin resuscitation as soon as you can safely reach the casualty',
      'Call the emergency services and wait outside to direct them in',
      'Switch off the supply at the isolator or pull the plug from it',
    ],
    correctAnswer: 3,
    explanation:
      'Removing the source of the electricity is the first action, because until the supply is off the casualty is still energised and anyone who touches them becomes a second casualty. Pulling on clothing is the attractive wrong answer because it appears to keep you insulated, but damp or contaminated fabric conducts, and the delay in getting the supply off prolongs the current flow through the casualty.',
    section: '1.8',
    topic: 'Incident Response',
    difficulty: 'advanced',
  },
  {
    id: 277,
    question:
      'A risk assessment for drilling into a concrete slab identifies airborne dust as a hazard. Which control should be preferred?',
    options: [
      'Issue disposable respirators to everyone working in the room',
      'Rotate the operatives so no one is exposed for a whole shift',
      'Use on-tool extraction so the dust is captured at its source',
      'Damp the area down and sweep up the debris at every break',
    ],
    correctAnswer: 2,
    explanation:
      'Controlling the hazard at source is preferred over anything that depends on people, so extraction that captures dust as it is created ranks above job rotation and above respiratory protection. Respirators are the attractive wrong answer because they feel like the obvious dust control, but personal protection is the last resort and only works when it fits, is worn and is maintained.',
    section: '1.2',
    topic: 'Hierarchy of Control',
    difficulty: 'advanced',
  },
  {
    id: 278,
    question:
      'Which duty falls on you personally as an employed electrician rather than on your employer?',
    options: [
      'Providing risk assessments and safe systems of work for each job',
      'Taking reasonable care of yourself and others, and cooperating',
      'Funding the training needed to keep the workforce competent',
      'Appointing the competent person who advises the firm on safety',
    ],
    correctAnswer: 1,
    explanation:
      'Employees have general legal duties to take reasonable care of themselves and of others who may be affected by what they do, and to cooperate with their employer so the employer can meet its own duties. Providing risk assessments is the attractive wrong answer because you may well help write one, but the duty to produce and maintain them rests with the employer, not with the individual operative.',
    section: '1.1',
    topic: 'Duty Holders',
    difficulty: 'intermediate',
  },
  {
    id: 279,
    question:
      'You are fault finding on a control panel and a manager suggests you take readings live to save time. What must be considered first?',
    options: [
      'Whether the readings can be taken fast enough to limit the exposure',
      'Whether a second person can stand by to isolate in an emergency',
      'Whether insulated gloves and a face shield are available on site',
      'Whether the work can be done dead or through built-in test points',
    ],
    correctAnswer: 3,
    explanation:
      'Guidance on electrical testing says live working must be avoided where possible, including by using equipment with built-in test facilities and diagnostic aids, so the first question is always whether the reading can be obtained without exposing live parts. A standby person is the attractive wrong answer because accompaniment is a recognised precaution, but precautions only come into play once it has been established that dead working is genuinely not reasonable.',
    section: '1.4',
    topic: 'Safe Systems of Work',
    difficulty: 'advanced',
  },
  {
    id: 280,
    question:
      'What is an approved voltage indicator used for during safe isolation?',
    options: [
      'Measuring the insulation resistance of the isolated circuit',
      'Recording the load current drawn before the supply is cut',
      'Confirming that the conductors to be worked on are dead',
      'Checking the tightness of the terminations at the board',
    ],
    correctAnswer: 2,
    explanation:
      'The voltage indicator is the instrument used to prove that the conductors you are about to work on carry no voltage, once it has itself been proved on a known source. Insulation resistance testing is the attractive wrong answer because it is done at the same board with a different instrument, but it is part of verifying the installation and tells you nothing about whether the circuit is live right now.',
    section: '1.3',
    topic: 'Safe Isolation',
    difficulty: 'basic',
  },
  {
    id: 281,
    question:
      'An inspector judges that a temporary supply on your site presents a risk of serious personal injury. Which enforcement action stops that activity at once?',
    options: [
      'An improvement notice, giving a period in which to put things right',
      'A prohibition notice, halting the activity until the risk is dealt with',
      'A prosecution brought against the firm and its responsible managers',
      'A written warning recorded on the site file for reference at a revisit',
    ],
    correctAnswer: 1,
    explanation:
      'A prohibition notice stops a practice the inspector considers too risky, and it bites immediately rather than waiting for anyone to be hurt. An improvement notice is the attractive wrong answer because it is the other formal notice, but it allows a stated period to make improvements, so the dangerous activity could lawfully continue in the meantime, which is not what a serious injury risk demands.',
    section: '1.1',
    topic: 'Enforcement',
    difficulty: 'advanced',
  },
  {
    id: 282,
    question:
      'Operatives cutting chases are likely to be exposed to noise at or above the upper exposure action value. What does the law require the employer to do?',
    options: [
      'Issue hearing protection and record the issue in the training file',
      'Arrange health surveillance and act on the results as they arrive',
      'Reduce exposure by technical and organisational measures, not by PPE',
      'Mark the area with signs so others know hearing protection is worn',
    ],
    correctAnswer: 2,
    explanation:
      'At or above the upper exposure action value the employer must reduce exposure as low as is reasonably practicable through a programme of organisational and technical measures, and the regulations specifically exclude hearing protectors from counting as that programme. Issuing protectors is the attractive wrong answer because it is also required at that level, but it sits alongside the control programme rather than replacing it.',
    section: '1.5',
    topic: 'Noise',
    difficulty: 'advanced',
  },
  {
    id: 283,
    question:
      'A solvent cleaner used during cable pulling is classed as hazardous to health. What must the employer consider first under COSHH?',
    options: [
      'Which respirator and gloves are suitable for that particular solvent',
      'How often health surveillance should be offered to the operatives',
      'What first aid provision is needed for skin or eye contact with it',
      'Whether exposure can be prevented, by substitution or other means',
    ],
    correctAnswer: 3,
    explanation:
      'The overriding duty is to prevent exposure, and that has to be achieved by means other than personal protective equipment, typically by eliminating the substance or substituting something less hazardous. Selecting gloves and a respirator is the attractive wrong answer because it is what you actually put on, but PPE is the last line of defence and is only reached once prevention has been shown not to be reasonably practicable.',
    section: '1.5',
    topic: 'COSHH',
    difficulty: 'intermediate',
  },
  {
    id: 284,
    question:
      'Under the Manual Handling Operations Regulations, what must an employer do before assessing a handling operation that carries a risk of injury?',
    options: [
      'Consider whether the handling operation can be avoided altogether',
      'Provide a back support belt to every operative doing the handling',
      'Set a maximum weight no operative may lift without a second pair',
      'Train every operative in the recognised kinetic method of lifting',
    ],
    correctAnswer: 0,
    explanation:
      'The duty runs avoid, then assess, then reduce: so far as is reasonably practicable the need for risky manual handling is designed out first, and only where that is not practicable is a suitable and sufficient assessment made. Training in lifting technique is the attractive wrong answer because it is familiar and useful, but technique does not remove the load, and relying on it puts the burden back on the individual.',
    section: '1.6',
    topic: 'Manual Handling',
    difficulty: 'intermediate',
  },
  {
    id: 285,
    question:
      'Cabling is required inside a large sealed tank that qualifies as a confined space. What must be settled before anyone enters?',
    options: [
      'That two operatives enter together so that each can watch the other',
      'That the atmosphere is tested at the moment the entry is made',
      'That entry is avoided if it can be, and that rescue is arranged',
      'That the tank is ventilated for a full shift before work begins',
    ],
    correctAnswer: 2,
    explanation:
      'The law requires that entry into a confined space is avoided where the work can reasonably be done another way, and where entry is unavoidable there must be a safe system of work plus suitable and sufficient emergency arrangements in place beforehand. Sending two people in is the attractive wrong answer because company sounds safer, but without a rescue plan it simply doubles the number of casualties.',
    section: '1.4',
    topic: 'Confined Spaces',
    difficulty: 'advanced',
  },
  {
    id: 286,
    question:
      'You find a circuit locked off by an operative who is working on it, but the padlock key is hanging on a hook beside the board. What should you do?',
    options: [
      'Accept it, since the padlock is fitted and a notice is displayed',
      'Move the key to the site office and log who is holding it there',
      'Raise it at the next toolbox talk as a point of general learning',
      'Stop the work and have the operative keep the only key on them',
    ],
    correctAnswer: 3,
    explanation:
      'Securing against reconnection only works while the person at risk controls the means of re-energising, so the key belongs on the operative, not on a hook where anyone can reach it. Moving the key to the office is the attractive wrong answer because it feels more controlled, but it hands the decision to re-energise to someone who cannot see whether hands are still on the conductors.',
    section: '1.8',
    topic: 'Supervision',
    difficulty: 'advanced',
  },
  {
    id: 287,
    question:
      'A 110 V drill has a cracked plug body and the cord grip has pulled loose. What is the correct action?',
    options: [
      'Wrap the plug body in tape and use the drill for the rest of the day',
      'Use it only for light drilling until a replacement can be obtained',
      'Take it out of use, label it clearly and send it for repair or scrap',
      'Test it with an insulation tester and keep using it if it passes',
    ],
    correctAnswer: 2,
    explanation:
      'Damaged equipment is removed from service and labelled so nobody picks it up again, then repaired by someone competent or replaced. Passing an insulation test is the attractive wrong answer because it produces a reassuring number, but a loose cord grip means the conductors can be pulled off their terminals in use, and no instrument reading taken beforehand tells you anything about that.',
    section: '1.7',
    topic: 'Portable Equipment',
    difficulty: 'intermediate',
  },
  {
    id: 288,
    question:
      'Halfway through a job the client changes the scope so that you must now work in an occupied ward rather than an empty room. What does this require?',
    options: [
      'A note added to the site diary recording the change of location',
      'The risk assessment reviewed and revised before work continues',
      'A fresh permit issued by the client covering the new work area',
      'Extra insurance cover arranged for the occupied part of the site',
    ],
    correctAnswer: 1,
    explanation:
      'A risk assessment is only valid for the circumstances it was written for, and a change of location that introduces members of the public, patients and different access constraints invalidates it until it is reviewed. Recording the change in the diary is the attractive wrong answer because documentation matters, but writing something down changes no control measure on the ground.',
    section: '1.2',
    topic: 'Risk Assessment',
    difficulty: 'advanced',
  },
  {
    id: 289,
    question:
      'Which piece of legislation places general duties on employers, employees and the self-employed across all work activities?',
    options: [
      'The Construction Design and Management Regulations',
      'The Health and Safety at Work etc Act of 1974',
      'The Electricity at Work Regulations of 1989',
      'The Provision and Use of Work Equipment Regs',
    ],
    correctAnswer: 1,
    explanation:
      'The Health and Safety at Work etc Act is the enabling Act that sets the general duties from which the regulations below it are made, and it covers every work activity and every category of worker. The Electricity at Work Regulations are the attractive wrong answer for an electrician because they govern our trade directly, but they are made under the Act and apply only to electrical systems.',
    section: '1.1',
    topic: 'Legislation',
    difficulty: 'basic',
  },
  {
    id: 290,
    question:
      'Work covered by an electrical permit is finished, but a second team now wants to start a different task on the same equipment. What is correct?',
    options: [
      'The second team signs onto the existing permit and begins work',
      'The permit is left open until every team has finished on the gear',
      'The first permit is cleared and returned before any new work starts',
      'The permit holder hands the permit over to the second team leader',
    ],
    correctAnswer: 2,
    explanation:
      'A permit is issued to a named person for defined work on defined equipment, so it must be signed back and cancelled when that work ends, and a new permit issued for the new task after the isolation has been reassessed. Handing the permit on is the attractive wrong answer because it looks efficient, but it transfers a document whose stated scope no longer matches what will be done.',
    section: '1.4',
    topic: 'Permits to Work',
    difficulty: 'advanced',
  },
  {
    id: 291,
    question:
      'An apprentice receives an electric shock at work and is taken to hospital. What should the employer do about reporting the incident?',
    options: [
      'Record it in the accident book only, since no working time is lost',
      'Report it to the client so it appears in their monthly site figures',
      'Wait until the apprentice is back at work before deciding anything',
      'Record it and check whether RIDDOR makes it reportable to the HSE',
    ],
    correctAnswer: 3,
    explanation:
      'Every incident is recorded internally, and the employer must then test it against the reporting categories in RIDDOR and notify the enforcing authority where it falls within one. Recording it in the accident book alone is the attractive wrong answer because that step is genuinely required, but internal recording never discharges the separate statutory duty to report, and delaying the decision risks missing the reporting window.',
    section: '1.8',
    topic: 'Accident Reporting',
    difficulty: 'intermediate',
  },
  {
    id: 292,
    question:
      'You need to use an angle grinder close to stored packaging inside an occupied building. Which control matters most?',
    options: [
      'Keep a fire extinguisher in the van parked outside the building',
      'Tell the occupier that you will be making sparks that morning',
      'Clear combustibles from the area and keep watch after finishing',
      'Work at the end of the day when the building is empty of people',
    ],
    correctAnswer: 2,
    explanation:
      'Separating the ignition source from the fuel is the control that prevents the fire, and a period of watching afterwards catches smouldering material that has not yet flamed. Working when the building is empty is the attractive wrong answer because fewer people are at risk, but an unattended fire started at the end of the day is the worst possible outcome for the building and for anyone in it later.',
    section: '1.5',
    topic: 'Fire Safety',
    difficulty: 'intermediate',
  },
  {
    id: 293,
    question:
      'A mobile elevating work platform arrives on site from a hire company. What must accompany it before you put it to use?',
    options: [
      'A copy of the operator licence held by the person who will use it',
      'Clear evidence of when it was last thoroughly examined for use',
      'A method statement written by the hire company for your own site',
      'A certificate showing the insulation resistance of the machine',
    ],
    correctAnswer: 1,
    explanation:
      'Equipment coming from another business or a hire fleet must arrive with an indication, clear to everyone involved, of when its last thorough examination was carried out, because that is the evidence its lifting parts are still fit for use. Operator training is the attractive wrong answer because it is also required, but it says nothing about the condition of the machine you have just been sent.',
    section: '1.6',
    topic: 'Access Equipment',
    difficulty: 'intermediate',
  },
  {
    id: 294,
    question:
      'Two employers share a workplace and each has staff exposed to risks created by the other. What does health and safety law require of them?',
    options: [
      'Each employer manages only the risks arising from its own work',
      'The larger employer takes charge of safety across the whole site',
      'The occupier of the building takes on all of the shared duties',
      'They cooperate and exchange information about the shared risks',
    ],
    correctAnswer: 3,
    explanation:
      'Where a workplace is shared, employers must cooperate, coordinate their measures and tell each other about the risks their work creates, because neither can assess a hazard it does not know exists. Each managing only its own work is the attractive wrong answer because it sounds like a clean division of duty, but it leaves the interface between the two activities uncontrolled, and that is where shared workplace incidents happen.',
    section: '1.1',
    topic: 'Cooperation',
    difficulty: 'advanced',
  },
  {
    id: 295,
    question:
      'After locking off an isolator, why is a caution notice fitted at the point of isolation?',
    options: [
      'It satisfies the duty to label every circuit at the distribution board',
      'It removes the need to prove the circuit dead before starting work',
      'It tells others why the supply is off and who is responsible for it',
      'It records the readings obtained during the dead testing sequence',
    ],
    correctAnswer: 2,
    explanation:
      'The notice communicates: it warns anyone at the board not to operate the device and, where it carries a name and date, identifies who is working and when. Treating it as a substitute for proving dead is the attractive wrong answer because a locked and labelled isolator looks conclusive, but a notice is only paper and cannot show whether the conductors you will touch are actually free of voltage.',
    section: '1.3',
    topic: 'Safe Isolation',
    difficulty: 'intermediate',
  },
  {
    id: 296,
    question:
      'What distinguishes a method statement from a risk assessment?',
    options: [
      'It lists the hazards present and scores each of them for severity',
      'It is a legal requirement on every job, whereas the other is not',
      'It is produced by the client, whereas the other is produced by us',
      'It sets out the sequence of work and how the controls are applied',
    ],
    correctAnswer: 3,
    explanation:
      'The risk assessment identifies hazards, who might be harmed and what controls are needed; the method statement then describes, step by step, how the job will actually be carried out with those controls in place. Listing and scoring hazards is the attractive wrong answer because that content does appear in the paperwork, but it belongs to the assessment, which the method statement builds on.',
    section: '1.2',
    topic: 'Method Statements',
    difficulty: 'intermediate',
  },
  {
    id: 297,
    question:
      'A principal contractor instructs you to use a visibly damaged scaffold because the scaffolder cannot attend until next week. How should you respond?',
    options: [
      'Use it carefully, since the instruction came from the site controller',
      'Use it for light work only and keep off the damaged lift entirely',
      'Sign a disclaimer with the principal contractor and then proceed',
      'Decline to use it, report the defect and agree another safe means',
    ],
    correctAnswer: 3,
    explanation:
      'You carry duties in your own right, so an instruction from the principal contractor cannot make defective access equipment safe or transfer the consequences away from you. Restricting yourself to light work is the attractive wrong answer because it sounds like a proportionate compromise, but the structural defect is not related to the weight of your tools, and the scaffold can fail regardless of how carefully it is used.',
    section: '1.8',
    topic: 'Stopping Unsafe Work',
    difficulty: 'advanced',
  },
  {
    id: 298,
    question:
      'When should personal protective equipment be relied on to control a risk at work?',
    options: [
      'Whenever it is quicker than changing the way the work is done',
      'After other measures are applied and a residual risk remains',
      'Where the client has specifically asked for it to be provided',
      'At all times, because it is the simplest control to put in place',
    ],
    correctAnswer: 1,
    explanation:
      'PPE is the last resort in the hierarchy: it protects only the wearer, only when correctly worn and maintained, and it does nothing to the hazard itself. Using it because it is quicker is the attractive wrong answer because that is exactly how it gets used on site, but choosing PPE over a control that removes the hazard leaves everyone else nearby completely unprotected.',
    section: '1.7',
    topic: 'PPE',
    difficulty: 'basic',
  },
  {
    id: 299,
    question:
      'You are asked to work on an open panel in a cramped cupboard where the light fitting overhead has failed. What must be in place before work starts?',
    options: [
      'A second operative to hold a torch steady while you are working',
      'A written record of the poor conditions kept on the site file',
      'Adequate working space, safe means of access and good lighting',
      'A shorter working spell to limit the time spent in the cupboard',
    ],
    correctAnswer: 2,
    explanation:
      'The Electricity at Work Regulations require adequate working space, adequate means of access and adequate lighting wherever work is done on or near a system that may give rise to danger. A held torch is the attractive wrong answer because it appears to solve the lighting problem, but it occupies a second person in an already cramped space and leaves the access and space failings untouched.',
    section: '1.4',
    topic: 'Safe Systems of Work',
    difficulty: 'advanced',
  },
  {
    id: 300,
    question:
      'Trailing 110 V leads run across a corridor used by staff throughout the day in an occupied office. What is the best control?',
    options: [
      'Tape the leads down along the whole length of that corridor',
      'Set out cone signs warning of the leads at each end of the run',
      'Ask the staff to use another route while the leads are in place',
      'Reroute the leads clear of the walkway, or run them overhead',
    ],
    correctAnswer: 3,
    explanation:
      'Removing the trip hazard from the walkway removes the risk for everyone, including visitors who never see a briefing and staff carrying loads. Taping the leads down is the attractive wrong answer because it is the usual site fix, but tape lifts under foot traffic, the raised lead remains a hazard to anyone not looking down, and the cable is still liable to mechanical damage.',
    section: '1.5',
    topic: 'Housekeeping',
    difficulty: 'intermediate',
  },
];

// ============================================================================
// Helper functions
// ============================================================================

const DEFAULT_WEIGHTS = { basic: 0.4, intermediate: 0.45, advanced: 0.15 };

/**
 * Draws a paper honouring the difficulty tags.
 *
 * The weighting here was always correct; the shuffle was not. It used
 * `sort(() => Math.random() - 0.5)`, which is not a uniform permutation — the
 * comparator is inconsistent, so some positions are systematically favoured and
 * taking the first N means some questions are quietly likelier to be examined.
 * Now delegates to the shared Fisher-Yates draw.
 * See src/utils/apprenticeQuestionDraw.ts.
 */
export const getRandomQuestions = (
  count: number = 60,
  weights: { basic: number; intermediate: number; advanced: number } = DEFAULT_WEIGHTS
): QuestionBank[] => drawWeighted(module1Questions, count, weights);

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
    if (!q.question || typeof q.question !== 'string')
      errors.push(`Q${q.id}: question text missing`);
    if (!Array.isArray(q.options) || q.options.length < 2)
      errors.push(`Q${q.id}: options must have at least 2 entries`);
    if (
      typeof q.correctAnswer !== 'number' ||
      q.correctAnswer < 0 ||
      q.correctAnswer >= (q.options?.length || 0)
    )
      errors.push(`Q${q.id}: correctAnswer index out of range`);
    if (!q.explanation || typeof q.explanation !== 'string')
      errors.push(`Q${q.id}: explanation missing`);
    if (!q.section || typeof q.section !== 'string') errors.push(`Q${q.id}: section missing`);
    if (!q.topic || typeof q.topic !== 'string') errors.push(`Q${q.id}: topic missing`);
    if (!['basic', 'intermediate', 'advanced'].includes(q.difficulty as string))
      errors.push(`Q${q.id}: difficulty invalid`);
  });

  return { isValid: errors.length === 0, errors };
};

export default module1Questions;
