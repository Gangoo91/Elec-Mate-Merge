// Level 3 Module 7: Career Development - Question Bank
// 200 Questions covering industry roles, qualifications, JIB grading, and career pathways

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  section?: string;
  difficulty?: 'basic' | 'intermediate' | 'advanced';
}

import {
  drawWeighted,
  LEVEL3_WEIGHTS,
  type DifficultyWeights,
} from '@/utils/apprenticeQuestionDraw';

export const module7Questions: Question[] = [
  // Section 7.1: Industry Roles (Questions 1-30)
  {
    id: 1,
    question: 'What is the primary role of a domestic electrician?',
    options: [
      'Designing control systems for factory production lines',
      'Electrical work in homes and residential properties',
      'Periodic inspection of substations and switchgear',
      'Installing HV distribution networks and grid links',
    ],
    correctAnswer: 1,
    explanation:
      'Domestic electricians specialise in electrical installations, maintenance, and repairs in residential properties.',
    section: '7.1',
    difficulty: 'basic',
  },
  {
    id: 2,
    question: 'A commercial electrician typically works in:',
    options: [
      'Homes, flats, and consumer unit upgrades',
      'Power stations, grids, and substations',
      'Shops, offices, and business premises',
      'Mines, quarries, and underground works',
    ],
    correctAnswer: 2,
    explanation: 'Commercial electricians work in retail, office, and other business environments.',
    section: '7.1',
    difficulty: 'basic',
  },
  {
    id: 3,
    question: 'Industrial electricians are distinguished by their work in:',
    options: [
      'Residential refurbishments, rewires, and consumer unit replacements',
      'Independent retail units, salons, and shop fit-outs',
      'Small-scale rewires, repairs, and tenanted-property work',
      'Manufacturing plants, factories, and heavy industry',
    ],
    correctAnswer: 3,
    explanation:
      'Industrial electricians work with heavy machinery, process control, and manufacturing equipment.',
    section: '7.1',
    difficulty: 'basic',
  },
  {
    id: 4,
    question: 'What does a maintenance electrician primarily do?',
    options: [
      'Keep existing systems operational through repairs and planned maintenance',
      'Produces circuit design calculations and protective device coordination',
      'Carries out first-fix installation on new-build commercial projects',
      'Sources electrical materials and negotiates supplier framework agreements',
    ],
    correctAnswer: 0,
    explanation:
      'Maintenance electricians ensure continued safe operation through preventive and corrective maintenance.',
    section: '7.1',
    difficulty: 'basic',
  },
  {
    id: 5,
    question: 'What does the JIB Approved Electrician grade indicate about the holder?',
    options: [
      'Work only on local authority contracts',
      'Self-certify notifiable electrical work',
      'Alter existing circuits but not add new ones',
      'Issue minor works certificates but not EICs',
    ],
    correctAnswer: 1,
    explanation:
      'Approved electricians registered with competent person schemes can self-certify notifiable work.',
    section: '7.1',
    difficulty: 'intermediate',
  },
  {
    id: 6,
    question: 'The role of an electrical supervisor includes:',
    options: [
      'Managing timesheets, certificates, and other office-based paperwork',
      'Carrying out the same hands-on installation as the rest of the team',
      'Overseeing work quality and supporting less experienced staff',
      'Coordinating logistics remotely without attending the working site',
    ],
    correctAnswer: 2,
    explanation: 'Supervisors oversee work quality, ensure compliance, and support team members.',
    section: '7.1',
    difficulty: 'intermediate',
  },
  {
    id: 7,
    question: 'An electrical project manager is responsible for:',
    options: [
      'Material take-offs, supplier orders, and goods-inwards reconciliation',
      'Carrying out first-fix, second-fix, and final installation work',
      'Signing off completion certificates, once inspection and testing are done',
      'Planning, coordinating, and delivering electrical projects',
    ],
    correctAnswer: 3,
    explanation:
      'Project managers coordinate all aspects of electrical projects from planning to completion.',
    section: '7.1',
    difficulty: 'intermediate',
  },
  {
    id: 8,
    question: 'What distinguishes a data cabling installer from general electricians?',
    options: [
      'Specialisation in structured cabling and network infrastructure',
      'Generally requires a lower level of formal training and qualification',
      'Works almost exclusively on external infrastructure and street ducting',
      'Operates without needing any underlying electrical theory or safety knowledge',
    ],
    correctAnswer: 0,
    explanation:
      'Data cablers specialise in network infrastructure, structured cabling, and communication systems.',
    section: '7.1',
    difficulty: 'basic',
  },
  {
    id: 9,
    question: 'Fire alarm installers require:',
    options: [
      'Only emergency lighting competence to BS 5266',
      'Specific training in fire alarm systems to BS 5839',
      'General electrical knowledge plus first aid',
      'No training beyond the standard apprenticeship',
    ],
    correctAnswer: 1,
    explanation:
      'Fire alarm work requires specific competence in BS 5839 and fire detection systems.',
    section: '7.1',
    difficulty: 'intermediate',
  },
  {
    id: 10,
    question: 'EV charger installation specialists need knowledge of:',
    options: [
      'BS 1363 13 A socket-outlet wiring, fusing, and nothing else',
      'Domestic radial circuits, ring finals, and their protection',
      'Charging standards, load management, and vehicle integration',
      'Three-phase motor starters, star-delta, and power factor correction',
    ],
    correctAnswer: 2,
    explanation:
      'EV specialists need knowledge of charging protocols, load management, and integration with vehicles and grid.',
    section: '7.1',
    difficulty: 'intermediate',
  },
  {
    id: 11,
    question: "A solar PV installer's role includes:",
    options: [
      'Carrying out mainly roof access, fixing, and weatherproofing work',
      'Installing only standalone home battery storage and inverter units',
      'Working solely on AC-side cabling once arrays are mounted by others',
      'Installing and commissioning solar photovoltaic systems',
    ],
    correctAnswer: 3,
    explanation: 'PV installers design, install, and commission complete solar generation systems.',
    section: '7.1',
    difficulty: 'basic',
  },
  {
    id: 12,
    question: 'What does a building services engineer do differently from an electrician?',
    options: [
      'Designs building systems at a higher technical/professional level',
      'Carries out essentially the same on-site installation/testing duties',
      'Performs hands-on installation/wiring rather than design work',
      'Works only on educational buildings such as schools/colleges',
    ],
    correctAnswer: 0,
    explanation:
      'Building services engineers typically design systems rather than install them, requiring degree-level qualifications.',
    section: '7.1',
    difficulty: 'intermediate',
  },
  {
    id: 13,
    question: 'Highway electrical operatives specialise in:',
    options: [
      'Domestic rewires, consumer unit changes, and residential additions',
      'Street lighting, traffic signals, and highway infrastructure',
      'Heavy plant control wiring, panels, and factory machinery',
      'Internal installations in shops, offices, and public buildings',
    ],
    correctAnswer: 1,
    explanation:
      'Highway electricians work on public infrastructure including street lighting and traffic systems.',
    section: '7.1',
    difficulty: 'intermediate',
  },
  {
    id: 14,
    question: "An electrical estimator's primary role is:",
    options: [
      'First-fix and second-fix installation on commercial projects',
      'Producing circuit design schematics and protective device schedules',
      'Calculating costs and preparing quotations for electrical work',
      'Conducting periodic inspection and testing under BS 7671 Chapter 65',
    ],
    correctAnswer: 2,
    explanation:
      'Estimators analyse project requirements and produce accurate cost estimates for tenders.',
    section: '7.1',
    difficulty: 'intermediate',
  },
  {
    id: 15,
    question: 'Commissioning engineers are responsible for:',
    options: [
      'Carrying out the physical installation of new electrical systems',
      'Planned and reactive maintenance of existing electrical installations',
      'Producing design calculations and CAD layouts for new projects',
      'Testing and bringing electrical systems into operation',
    ],
    correctAnswer: 3,
    explanation:
      'Commissioning engineers verify systems work correctly before handover to the client.',
    section: '7.1',
    difficulty: 'intermediate',
  },
  {
    id: 16,
    question: 'The role of an electrical CAD technician involves:',
    options: [
      'Creating technical drawings and designs using computer software',
      'Performing initial verification and periodic inspection testing',
      'Carrying out first-fix wiring and second-fix accessory installation',
      'Supervising trades on site and managing day-to-day work allocation',
    ],
    correctAnswer: 0,
    explanation: 'CAD technicians produce detailed electrical drawings using specialist software.',
    section: '7.1',
    difficulty: 'intermediate',
  },
  {
    id: 17,
    question: 'Health and safety advisors in electrical contractors:',
    options: [
      'Need no specific qualification beyond standard electrical experience',
      'Ensure compliance with safety legislation and best practices',
      'Carry out the same installation duties as the operative team',
      'Concentrate on payroll, timesheets, and other office administration',
    ],
    correctAnswer: 1,
    explanation: 'H&S advisors develop and monitor safety policies, procedures, and compliance.',
    section: '7.1',
    difficulty: 'intermediate',
  },
  {
    id: 18,
    question: 'An electrical trainer/assessor typically:',
    options: [
      'Spends the majority of their working time on live installation sites',
      'Comes from a non-electrical background with no field experience',
      'Delivers training and assesses learner competence',
      'Focuses solely on administrative learner records and registration',
    ],
    correctAnswer: 2,
    explanation:
      'Trainers deliver electrical training and assess competence, usually with significant industry experience.',
    section: '7.1',
    difficulty: 'intermediate',
  },
  {
    id: 19,
    question: 'Technical sales representatives in the electrical industry:',
    options: [
      'Work as account managers with no technical depth',
      'Deal with customers remotely and rarely visit sites',
      'Are based only in wholesale trade counters',
      'Combine product knowledge with sales skills',
    ],
    correctAnswer: 3,
    explanation:
      'Technical sales requires understanding products and applications to advise customers effectively.',
    section: '7.1',
    difficulty: 'intermediate',
  },
  {
    id: 20,
    question: 'Quality assurance managers in electrical contracting:',
    options: [
      'Ensure work meets required standards and specifications',
      'Spend the majority of their time on first-fix and second-fix installation',
      'Come from a non-electrical background with no technical training',
      'Limit their work to certificate paperwork checks at project close-out',
    ],
    correctAnswer: 0,
    explanation: 'QA managers implement systems to ensure consistent quality and compliance.',
    section: '7.1',
    difficulty: 'intermediate',
  },
  {
    id: 21,
    question: 'A facilities manager with electrical responsibilities:',
    options: [
      'Oversees cleaning, waste, and general housekeeping contracts only',
      'Manages building services including electrical systems',
      'Operates exclusively on overnight and out-of-hours shift patterns',
      'Performs an administrative function with no technical responsibility',
    ],
    correctAnswer: 1,
    explanation:
      'Facilities managers oversee building operations including electrical systems management.',
    section: '7.1',
    difficulty: 'intermediate',
  },
  {
    id: 22,
    question: 'Control panel builders work primarily with:',
    options: [
      'Domestic radial and ring final circuits in residential consumer units',
      'Lighting circuit installations in commercial offices and retail premises',
      'Assembling electrical control panels for industrial applications',
      'External infrastructure such as street lighting and highway gear',
    ],
    correctAnswer: 2,
    explanation:
      'Panel builders assemble control systems following electrical schematics and specifications.',
    section: '7.1',
    difficulty: 'intermediate',
  },
  {
    id: 23,
    question: "An electrical inspector's role includes:",
    options: [
      'Producing design schematics and protective device coordination studies',
      'Carrying out first-fix wiring and second-fix accessory installation',
      'Account-managing customers and quoting for new contracts',
      'Verifying compliance with regulations through inspection and testing',
    ],
    correctAnswer: 3,
    explanation:
      'Inspectors verify electrical installations comply with regulations through inspection and testing.',
    section: '7.1',
    difficulty: 'basic',
  },
  {
    id: 24,
    question: 'Theatre and entertainment electricians require knowledge of:',
    options: [
      'Temporary installations, special effects, and performance requirements',
      'Domestic ring finals, radials, and consumer unit changes only',
      'Permanent shop, office, and commercial lighting only',
      'Industrial control wiring, panels, and motor starter circuits only',
    ],
    correctAnswer: 0,
    explanation:
      'Entertainment electricians work with temporary supplies, rigging, and performance-specific requirements.',
    section: '7.1',
    difficulty: 'intermediate',
  },
  {
    id: 25,
    question: 'A lift installation electrician specialises in:',
    options: [
      'Escalators and moving walkway systems',
      'Elevator electrical systems and controls',
      'Domestic rewires and consumer unit upgrades',
      'Fire alarm and detection systems to BS 5839',
    ],
    correctAnswer: 1,
    explanation:
      'Lift electricians specialise in elevator control systems, safety circuits, and related equipment.',
    section: '7.1',
    difficulty: 'intermediate',
  },
  {
    id: 26,
    question: 'Marine electricians work primarily on:',
    options: [
      'Offshore oil, gas, and rig platforms only',
      'Ports, quaysides, and container gear',
      'Ships, boats, and marine vessels',
      'Naval bases, dockyards, and submarines',
    ],
    correctAnswer: 2,
    explanation: 'Marine electricians install and maintain electrical systems on watercraft.',
    section: '7.1',
    difficulty: 'intermediate',
  },
  {
    id: 27,
    question: 'Rail traction electricians work with:',
    options: [
      'Station building lighting, small power, and passenger amenity systems',
      'Self-service ticket vending machines and passenger gateline equipment',
      'Trackside signalling and interlocking systems used for train movements',
      'Train electrical systems and railway infrastructure',
    ],
    correctAnswer: 3,
    explanation:
      'Rail electricians work on traction systems, rolling stock, and railway electrical infrastructure.',
    section: '7.1',
    difficulty: 'intermediate',
  },
  {
    id: 28,
    question: 'HVAC electricians combine electrical skills with:',
    options: [
      'Heating, ventilation, and air conditioning system knowledge',
      'Plumbing, pipefitting, and hot and cold water distribution systems',
      'Carpentry, joinery, and first-fix structural timber installations',
      'Painting, decoration, and final-fix surface finishing trades',
    ],
    correctAnswer: 0,
    explanation: 'HVAC electricians specialise in electrical aspects of climate control systems.',
    section: '7.1',
    difficulty: 'intermediate',
  },
  {
    id: 29,
    question: 'Renewable energy electricians focus on:',
    options: [
      'Traditional fixed wiring in domestic, commercial, and retail premises',
      'Solar, wind, and other renewable energy installations',
      'Fossil-fuel power stations, boilers, and thermal generation plant',
      'Nuclear generation systems, reactors, and safety-critical controls',
    ],
    correctAnswer: 1,
    explanation: 'Renewable energy specialists install and maintain green energy systems.',
    section: '7.1',
    difficulty: 'basic',
  },
  {
    id: 30,
    question: 'Building automation specialists work with:',
    options: [
      'Standard manually-operated switching gear and rotary controllers',
      'Domestic accessories such as light switches and socket-outlets',
      'Smart building systems including BMS and integrated controls',
      'Emergency lighting installations commissioned under BS 5266',
    ],
    correctAnswer: 2,
    explanation:
      'Automation specialists work with building management systems and smart building technologies.',
    section: '7.1',
    difficulty: 'intermediate',
  },

  // Section 7.2: JIB Grading (Questions 31-60)
  {
    id: 31,
    question: 'What does JIB stand for?',
    options: [
      'Joint Insurance Brokerage',
      'Junior Installer Bureau',
      'Joint Inspection Body',
      'Joint Industry Board',
    ],
    correctAnswer: 3,
    explanation: 'JIB is the Joint Industry Board for the Electrical Contracting Industry.',
    section: '7.2',
    difficulty: 'basic',
  },
  {
    id: 32,
    question: 'What does an electrician\'s JIB grade primarily determine?',
    options: [
      'Skill level and corresponding pay rates',
      'Minimum age for working on live sites',
      'Regions where contractors may operate',
      'Company turnover banding for registration',
    ],
    correctAnswer: 0,
    explanation: 'JIB grades reflect competence levels and set minimum pay rates for each grade.',
    section: '7.2',
    difficulty: 'basic',
  },
  {
    id: 33,
    question: 'An ECS card (Electrotechnical Certification Scheme) is:',
    options: [
      'A trade credit account for electrical wholesalers',
      'An ID card confirming qualifications and competence',
      'A driving permit for mobile elevating platforms',
      'A site visitor pass issued at induction',
    ],
    correctAnswer: 1,
    explanation:
      "ECS cards confirm the holder's qualifications, competence, and identity in the electrical industry.",
    section: '7.2',
    difficulty: 'basic',
  },
  {
    id: 34,
    question: 'To achieve JIB Approved Electrician grade, you typically need:',
    options: [
      'An ECS interview but no qualification',
      'The Level 2 Diploma on its own',
      'Level 3 NVQ and AM2s assessment',
      'Two years of logged site experience',
    ],
    correctAnswer: 2,
    explanation:
      'Approved Electrician requires NVQ Level 3 plus successful completion of AM2s practical assessment.',
    section: '7.2',
    difficulty: 'intermediate',
  },
  {
    id: 35,
    question: 'The AM2s assessment tests:',
    options: [
      'Theory knowledge of BS 7671 by written paper',
      'Customer service skills for domestic work',
      'Site safety awareness like the CSCS test',
      'Practical installation and testing skills',
    ],
    correctAnswer: 3,
    explanation:
      'AM2s is a practical assessment of installation, inspection, and testing competence.',
    section: '7.2',
    difficulty: 'basic',
  },
  {
    id: 36,
    question: 'JIB Electrician grade requires:',
    options: [
      'Level 3 qualification without AM2s',
      'Prior learning with no NVQ submission',
      'An apprenticeship logbook with no end-point',
      'Five years of site experience instead',
    ],
    correctAnswer: 0,
    explanation:
      'Electrician grade requires Level 3 technical qualification but not the AM2s assessment.',
    section: '7.2',
    difficulty: 'intermediate',
  },
  {
    id: 37,
    question: 'What distinguishes the Approved Electrician grade from the Installation Electrician grade?',
    options: [
      'Approved is paid at the JIB rate, Installation at the SJIB rate',
      'Approved requires further post-qualification experience and responsibility, on top of the Electrician grade',
      'Approved is awarded on employer nomination, Installation by examination',
      'The two grades describe the same competence, under different titles',
    ],
    correctAnswer: 1,
    explanation:
      // Was: "Approved Electricians complete AM2s; Installation Electricians
      // complete AM2e assessment." That is not the distinction — AM2S and AM2E
      // are two routes to the SAME grade. Corrected 2026-08-27; ⚠️ JIB grading
      // sits outside the BS 7671 RAG, so this wording is from general knowledge
      // and is worth checking against a JIB source.
      'AM2S and AM2E are two routes to the same Electrician grade — AM2S through the apprenticeship, AM2E as the Experienced Worker Assessment. Approved Electrician sits above that grade and calls for further post-qualification experience and responsibility, not a different end-point assessment.',
    section: '7.2',
    difficulty: 'intermediate',
  },
  {
    id: 38,
    question: 'A JIB Technician grade indicates:',
    options: [
      'Skill level below that of a standard JIB Electrician grade holder',
      'A purely office-based administrative role with no technical content',
      'Higher technical competence often with design capability',
      'An entry-level grade equivalent to first-year electrical apprentice',
    ],
    correctAnswer: 2,
    explanation:
      'Technician grade indicates higher technical competence, often including design responsibilities.',
    section: '7.2',
    difficulty: 'intermediate',
  },
  {
    id: 39,
    question: 'Electrical Improver is a grade for:',
    options: [
      'Fully qualified electricians at the Approved Electrician grade and above',
      'Semi-retired electricians returning to industry on reduced hours',
      'Site supervisors with several years of post-AM2 experience',
      'Those working towards qualification with basic competence',
    ],
    correctAnswer: 3,
    explanation:
      'Improver grade is for those developing skills and working towards full qualification.',
    section: '7.2',
    difficulty: 'basic',
  },
  {
    id: 40,
    question: 'What does a gold ECS card indicate about its holder?',
    options: [
      'Highest level of qualification and competence',
      'Entry-level grade equivalent to a labourer',
      'Temporary status while paperwork is processed',
      'An expired qualification awaiting CPD evidence',
    ],
    correctAnswer: 0,
    explanation:
      'Gold card is the highest ECS level, indicating advanced qualifications and competence.',
    section: '7.2',
    difficulty: 'basic',
  },
  {
    id: 41,
    question: 'The JIB National Working Rules set:',
    options: [
      'Internal employee handbook policies specific to one electrical contractor',
      'Industry-wide terms and conditions including pay rates',
      'Site safety procedures aligned with Construction Design Management rules',
      'Daily working hour limits and overtime rates without any pay framework',
    ],
    correctAnswer: 1,
    explanation:
      'National Working Rules establish pay rates, conditions, and benefits across the industry.',
    section: '7.2',
    difficulty: 'intermediate',
  },
  {
    id: 42,
    question: 'To maintain ECS card validity, you must:',
    options: [
      'Take no further action once the card has been issued by the scheme',
      'Pay an annual renewal fee with no further qualification or CPD evidence',
      'Provide evidence of ongoing professional development',
      'Retake the full Level 3 qualification and AM2 assessment annually',
    ],
    correctAnswer: 2,
    explanation: 'ECS card renewal requires evidence of CPD to maintain industry recognition.',
    section: '7.2',
    difficulty: 'intermediate',
  },
  {
    id: 43,
    question: 'JIB Labourer Electrical grade covers:',
    options: [
      'Fully qualified Approved Electricians',
      'Degree-qualified electrical design engineers',
      'Site supervisors overseeing qualified teams',
      'Support roles assisting qualified electricians',
    ],
    correctAnswer: 3,
    explanation:
      'Labourer grade covers those providing support and assistance to qualified electricians.',
    section: '7.2',
    difficulty: 'basic',
  },
  {
    id: 44,
    question: 'The Trainee grading within JIB is for:',
    options: [
      'Those in formal training programmes like apprenticeships',
      'Semi-retired workers returning to the industry on a part-time basis',
      'Time-served electricians with multiple years of post-AM2 experience',
      'Agency or labour-only sub-contract staff outside of direct employment',
    ],
    correctAnswer: 0,
    explanation:
      'Trainee grades apply to those in structured training programmes working towards qualification.',
    section: '7.2',
    difficulty: 'basic',
  },
  {
    id: 45,
    question: 'JIB grading affects employers because:',
    options: [
      'It has little impact beyond issuing ID cards',
      'It determines minimum pay rates that must be paid',
      'It applies only above a turnover threshold',
      'It is voluntary and creates no obligation',
    ],
    correctAnswer: 1,
    explanation: 'JIB registered employers must pay at least the minimum rates for each grade.',
    section: '7.2',
    difficulty: 'intermediate',
  },
  {
    id: 46,
    question: 'Which grade would an apprentice normally hold in the final year of their apprenticeship?',
    options: [
      'The Labourer Electrical rate in every year',
      'No set structure, agreed with the employer',
      'Percentage of adult rate progressing annually',
      'The full Installation Electrician rate',
    ],
    correctAnswer: 2,
    explanation:
      'Apprentice pay progresses through set percentages of qualified rates as training advances.',
    section: '7.2',
    difficulty: 'basic',
  },
  {
    id: 47,
    question: 'The JIB Supervisor grade requires:',
    options: [
      'No prior electrical qualification beyond a CSCS site safety card',
      'Level 2 Diploma in Electrical Installation as the highest requirement',
      'Office-based administrative skills with no on-site competence assessment',
      'Approved Electrician plus supervisory experience and training',
    ],
    correctAnswer: 3,
    explanation:
      'Supervisor grade builds on Approved Electrician with additional supervisory competence.',
    section: '7.2',
    difficulty: 'intermediate',
  },
  {
    id: 48,
    question: 'Provisional ECS cards are issued to:',
    options: [
      'Those awaiting full card while meeting requirements',
      'Fully qualified workers holding NVQ Level 3 and AM2 already',
      'Card holders whose existing ECS card has lapsed beyond renewal',
      'Workers based outside the United Kingdom on a temporary basis only',
    ],
    correctAnswer: 0,
    explanation: 'Provisional cards are temporary while permanent cards are processed.',
    section: '7.2',
    difficulty: 'basic',
  },
  {
    id: 49,
    question: 'JIB grading recognition extends to:',
    options: [
      'United Kingdom only, with no recognition outside national borders',
      'Increasingly internationally through recognition agreements',
      'Scotland only, applied through SJIB in place of JIB for the whole industry',
      'England only, with separate frameworks operating in the devolved nations',
    ],
    correctAnswer: 1,
    explanation:
      'JIB qualifications have growing international recognition through various agreements.',
    section: '7.2',
    difficulty: 'intermediate',
  },
  {
    id: 50,
    question: 'The Electrical Contracting Industry Welfare Benefits provide:',
    options: [
      'Holiday entitlement only, with no other cover',
      'A pension contribution, with no other cover',
      'Death benefits, injury cover, and welfare support',
      'No cover at all, beyond minimum statutory rights',
    ],
    correctAnswer: 2,
    explanation:
      'JIB welfare benefits include death-in-service, injury cover, and various support programmes.',
    section: '7.2',
    difficulty: 'intermediate',
  },
  {
    id: 51,
    question: 'Site Technician grade typically includes:',
    options: [
      'General labouring and assistance with material handling duties',
      'A non-electrical project support role with no installation duties',
      'Office-based administrative tasks with no presence on site',
      'Technical problem-solving and site coordination responsibilities',
    ],
    correctAnswer: 3,
    explanation:
      'Site Technicians have enhanced technical and coordination responsibilities beyond standard electrician roles.',
    section: '7.2',
    difficulty: 'intermediate',
  },
  {
    id: 52,
    question: 'JIB grading is updated to reflect:',
    options: [
      'Industry developments and new technology requirements',
      'A fixed framework that has not been amended since its original creation',
      'Annual inflation indexing applied uniformly across every grade band',
      'European Union directives transposed into UK electrotechnical schemes',
    ],
    correctAnswer: 0,
    explanation: 'Grading evolves to reflect changing industry needs and new technologies.',
    section: '7.2',
    difficulty: 'intermediate',
  },
  {
    id: 53,
    question: 'The JIB pension scheme provides:',
    options: [
      'A signpost to the state pension only',
      'Industry-wide retirement savings scheme',
      'Pensions for managerial grades only',
      'No scheme, so workers arrange their own',
    ],
    correctAnswer: 1,
    explanation: 'The JIB/EJP pension scheme provides retirement benefits for industry workers.',
    section: '7.2',
    difficulty: 'intermediate',
  },
  {
    id: 54,
    question: 'Electrical Design Engineer JIB grade requires:',
    options: [
      'A short ECS interview without any higher-level academic qualification',
      'Completion of an apprenticeship logbook with no further study required',
      'Typically degree-level qualification plus relevant experience',
      'NVQ Level 3 in Electrical Installation as the highest required qualification',
    ],
    correctAnswer: 2,
    explanation:
      'Design Engineer grade typically requires degree-level qualification and design experience.',
    section: '7.2',
    difficulty: 'intermediate',
  },
  {
    id: 55,
    question: 'SJIB in Scotland operates:',
    options: [
      'With a grading framework unrelated to JIB',
      'As a regional office of the JIB itself',
      'As a plumbing and heating industry body',
      'As the Scottish equivalent with similar structures',
    ],
    correctAnswer: 3,
    explanation:
      'SJIB (Scottish Joint Industry Board) operates separately but with similar functions in Scotland.',
    section: '7.2',
    difficulty: 'intermediate',
  },
  {
    id: 56,
    question: 'JIB travel and lodging allowances are:',
    options: [
      'Available when working away from normal workplace',
      'Outside the National Working Rules entirely',
      'Paid to supervisory grades but not operatives',
      'Paid only to apprentices in their final year',
    ],
    correctAnswer: 0,
    explanation:
      'Travel and lodging allowances apply when working significant distances from the normal workplace.',
    section: '7.2',
    difficulty: 'intermediate',
  },
  {
    id: 57,
    question: 'Mature candidate entry to JIB grades is possible through:',
    options: [
      'No route, apprenticeship completion only',
      'Assessment of prior learning and relevant experience',
      'A full four-year apprenticeship with EPA',
      'A degree in electrical engineering only',
    ],
    correctAnswer: 1,
    explanation:
      'Mature candidates can achieve recognition through RPL (Recognition of Prior Learning) routes.',
    section: '7.2',
    difficulty: 'intermediate',
  },
  {
    id: 58,
    question: 'ECS card colours indicate:',
    options: [
      'A design colour chosen by the cardholder',
      'The branding colours of the employer',
      'Different qualification and competence levels',
      'A random colour with no link to grade',
    ],
    correctAnswer: 2,
    explanation: 'Card colours (gold, blue, green, etc.) indicate different qualification levels.',
    section: '7.2',
    difficulty: 'basic',
  },
  {
    id: 59,
    question: 'JIB dispute resolution procedures help:',
    options: [
      'Eliminate every type of workplace disagreement before it can arise',
      'Pursue claims through county court litigation rather than internal procedures',
      'Address only disputes specifically about pay rates and overtime allowances',
      'Resolve workplace disagreements through structured processes',
    ],
    correctAnswer: 3,
    explanation: 'JIB provides dispute resolution procedures for various workplace issues.',
    section: '7.2',
    difficulty: 'intermediate',
  },
  {
    id: 60,
    question: 'Regular JIB rate increases are typically:',
    options: [
      'Negotiated annually between industry representatives',
      'Frozen for multi-year cycles with no annual review of the figures',
      'Set centrally by the Department for Business and Trade each April',
      'Determined ad-hoc with no fixed cycle or formal negotiation process',
    ],
    correctAnswer: 0,
    explanation:
      'Pay rates are negotiated between employer associations and trade unions annually.',
    section: '7.2',
    difficulty: 'intermediate',
  },

  // Section 7.3: Qualifications (Questions 61-90)
  {
    id: 61,
    question: 'Which combination of achievements makes someone a qualified electrician in the UK?',
    options: [
      'On-the-job experience with no formal award',
      'Level 3 Diploma in Installing Electrotechnical Systems',
      'City & Guilds 2360, withdrawn as an entry route',
      'No qualification where work is supervised',
    ],
    correctAnswer: 1,
    explanation:
      'The Level 3 Diploma is the current main qualification for installation electricians.',
    section: '7.3',
    difficulty: 'basic',
  },
  {
    id: 62,
    question: 'City & Guilds 2382 covers:',
    options: [
      'Practical cable routing and termination',
      'Initial verification and periodic testing',
      'BS 7671 Wiring Regulations requirements',
      'Site safety covering CDM and PPE duties',
    ],
    correctAnswer: 2,
    explanation:
      '2382 is the qualification specifically covering BS 7671 Requirements for Electrical Installations.',
    section: '7.3',
    difficulty: 'basic',
  },
  {
    id: 63,
    question: 'City & Guilds 2391 focuses on:',
    options: [
      'Circuit design and protective device selection for new installations',
      'Theory of BS 7671 wiring regulations without practical assessment',
      'Practical first-fix and second-fix installation methods',
      'Inspection and Testing of Electrical Installations',
    ],
    correctAnswer: 3,
    explanation: '2391 is the inspection and testing qualification for electrical installations.',
    section: '7.3',
    difficulty: 'basic',
  },
  {
    id: 64,
    question: 'The Level 2 Diploma in Electrical Installation is appropriate for:',
    options: [
      'Those entering the trade and working towards Level 3',
      'Approved Electricians refreshing regulations',
      'Degree-qualified design engineers on site',
      'Project managers from non-electrical trades',
    ],
    correctAnswer: 0,
    explanation: 'Level 2 provides foundation knowledge for those entering the electrical trade.',
    section: '7.3',
    difficulty: 'basic',
  },
  {
    id: 65,
    question: 'NVQ qualifications are based on:',
    options: [
      'Timed written exams at an assessment centre',
      'Demonstration of competence in the workplace',
      'Classroom theory delivered by a college',
      'A short online multiple-choice assessment',
    ],
    correctAnswer: 1,
    explanation: 'NVQs assess practical competence demonstrated in real workplace situations.',
    section: '7.3',
    difficulty: 'basic',
  },
  {
    id: 67,
    question: 'City & Guilds 2377 relates to:',
    options: [
      'First-fix and second-fix domestic work',
      'Commercial and emergency lighting design',
      'Circuit design and device coordination',
      'PAT Testing and In-Service Inspection',
    ],
    correctAnswer: 3,
    explanation:
      '2377 covers portable appliance testing and in-service inspection of electrical equipment.',
    section: '7.3',
    difficulty: 'intermediate',
  },
  {
    id: 68,
    question: 'For EV charging installation, relevant qualifications include:',
    options: [
      'City & Guilds 2919 or equivalent',
      'No EV-specific training is needed',
      'A general installation qualification',
      'A motor vehicle technician award',
    ],
    correctAnswer: 0,
    explanation:
      'EV installation requires specific qualifications like 2919 covering electric vehicle charging.',
    section: '7.3',
    difficulty: 'intermediate',
  },
  {
    id: 69,
    question: 'Solar PV installation qualifications include:',
    options: [
      'No award beyond the standard installation route',
      'MCS-specific qualifications and general electrical competence',
      'Roofing and working-at-height awards alone',
      'A degree in sustainable energy science',
    ],
    correctAnswer: 1,
    explanation:
      'PV installation requires electrical competence plus specific renewables qualifications for MCS registration.',
    section: '7.3',
    difficulty: 'intermediate',
  },
  {
    id: 70,
    question: 'Part P Building Regulations competence can be demonstrated through:',
    options: [
      'Documented site experience signed off by the employing electrical contractor',
      'No requirement applies to electrical installation work in dwellings',
      'Competent person scheme membership or building control notification',
      'A verbal declaration of competence at the point of starting the work',
    ],
    correctAnswer: 2,
    explanation:
      'Part P compliance requires either competent person scheme registration or building control involvement.',
    section: '7.3',
    difficulty: 'intermediate',
  },
  {
    id: 71,
    question: 'Fire alarm installation typically requires:',
    options: [
      'No specific qualification beyond the standard Level 3 Diploma route',
      'First aid at work certification as the primary competence evidence',
      'General electrical installation competence with no fire-specific training',
      'FIA or equivalent qualifications plus BS 5839 competence',
    ],
    correctAnswer: 3,
    explanation:
      'Fire alarm installers need specific competence in BS 5839 and fire detection systems.',
    section: '7.3',
    difficulty: 'intermediate',
  },
  {
    id: 72,
    question: 'Data cabling qualifications like BICSI or City & Guilds 3667 cover:',
    options: [
      'Structured cabling and network infrastructure',
      'General power installation in homes and offices',
      'Fibre optic splicing and termination only',
      'Copper twisted-pair work with no fibre content',
    ],
    correctAnswer: 0,
    explanation:
      'Data cabling qualifications cover structured cabling systems, testing, and network infrastructure.',
    section: '7.3',
    difficulty: 'intermediate',
  },
  {
    id: 73,
    question: 'Higher education routes into electrical careers include:',
    options: [
      'Apprenticeships only, with no academic/HE pathway available post-Level 3',
      'HNC, HND, and degree programmes in electrical/building services',
      'Nothing beyond Level 3, as no HNC/HND provision exists in the sector',
      'Academic research routes only, leading straight to a PhD/EngD',
    ],
    correctAnswer: 1,
    explanation: 'Higher education options include technician and engineer-level qualifications.',
    section: '7.3',
    difficulty: 'intermediate',
  },
  {
    id: 74,
    question: 'The difference between City & Guilds 2391-50 and 2391-52 is:',
    options: [
      'They are alternative codes, for one identical inspection and testing qualification',
      'They differ only in the awarding body fee, not in the syllabus covered',
      '2391-50 covers initial verification only, 2391-52 includes periodic inspection',
      'They have different course durations, but cover the same syllabus material',
    ],
    correctAnswer: 2,
    explanation:
      '2391-50 covers initial verification; 2391-52 adds periodic inspection and testing.',
    section: '7.3',
    difficulty: 'intermediate',
  },
  {
    id: 75,
    question: 'Functional Skills requirements in apprenticeships cover:',
    options: [
      'Hand tool dexterity, tested practically',
      'Theory, practical skills, and nothing else',
      'Customer role-play, scored by an assessor',
      'Maths, English, and sometimes ICT',
    ],
    correctAnswer: 3,
    explanation:
      'Apprenticeships require Functional Skills in maths and English plus technical learning.',
    section: '7.3',
    difficulty: 'basic',
  },
  {
    id: 76,
    question: 'The EPA (End Point Assessment) in apprenticeships:',
    options: [
      'Is the final assessment confirming overall competence',
      'Is an optional add-on chosen by the apprentice if desired',
      'Covers only the theoretical knowledge component without practical work',
      'Can be retaken indefinitely with no cap on the number of attempts',
    ],
    correctAnswer: 0,
    explanation:
      'EPA is the mandatory final assessment confirming apprentices meet occupational standards.',
    section: '7.3',
    difficulty: 'intermediate',
  },
  {
    id: 77,
    question: 'Design qualifications in electrical engineering typically require:',
    options: [
      'Documented site experience as the only evidence',
      'Degree or equivalent in electrical engineering',
      'Several years of first-fix and second-fix work',
      'Logged supervision experience with no study',
    ],
    correctAnswer: 1,
    explanation:
      'Design roles typically require degree-level qualifications in electrical engineering.',
    section: '7.3',
    difficulty: 'intermediate',
  },
  {
    id: 78,
    question: 'Hazardous area qualifications (CompEx) are required for:',
    options: [
      'All commercial and industrial installation work',
      'Offshore oil and gas installations only',
      'Work in potentially explosive atmospheres',
      'Chemical plants only, not fuel storage sites',
    ],
    correctAnswer: 2,
    explanation:
      'CompEx certification is required for electrical work in hazardous (explosive atmosphere) locations.',
    section: '7.3',
    difficulty: 'intermediate',
  },
  {
    id: 79,
    question: 'LV (Low Voltage) switching authorisation typically requires:',
    options: [
      'No training beyond the Level 3 qualification',
      'A general award with no site authorisation',
      'A short awareness video with no assessment',
      'Specific training and assessment by the employer',
    ],
    correctAnswer: 3,
    explanation:
      'Switching authorisation requires specific training and employer assessment of competence.',
    section: '7.3',
    difficulty: 'intermediate',
  },
  {
    id: 80,
    question: 'Assessment methods in electrical qualifications include:',
    options: [
      'Written exams, practical assessments, and portfolio evidence',
      'A single multiple-choice paper, taken as the sole assessment',
      'Observation of site work only, without any written or portfolio component',
      'A structured verbal interview, used as the only measure of competence',
    ],
    correctAnswer: 0,
    explanation:
      'Assessment combines multiple methods including written, practical, and work-based evidence.',
    section: '7.3',
    difficulty: 'basic',
  },
  {
    id: 81,
    question: 'IOSH or NEBOSH qualifications relate to:',
    options: [
      'Fire safety risk assessment only',
      'Health and safety management',
      'Practical installation and BS 7671',
      'Manual handling techniques only',
    ],
    correctAnswer: 1,
    explanation: 'IOSH and NEBOSH provide health and safety management qualifications.',
    section: '7.3',
    difficulty: 'intermediate',
  },
  {
    id: 82,
    question: 'First Aid at Work certification is:',
    options: [
      'Never required in electrical contracting roles',
      'Limited to managerial and supervisory grades',
      'Often required or beneficial for electrical workers',
      'Restricted to healthcare environments only',
    ],
    correctAnswer: 2,
    explanation:
      'First aid training is valuable for responding to electrical incidents and site requirements.',
    section: '7.3',
    difficulty: 'basic',
  },
  {
    id: 83,
    question: 'CSCS cards for electricians require:',
    options: [
      'Photographic ID, with no safety test',
      'A full UK driving licence, as ID proof',
      'A trade certificate, with no assessment',
      'CITB Health, Safety and Environment test',
    ],
    correctAnswer: 3,
    explanation: 'CSCS cards require passing the CITB HSE test plus relevant trade qualification.',
    section: '7.3',
    difficulty: 'basic',
  },
  {
    id: 84,
    question: 'Continuing qualification relevance means:',
    options: [
      'Ongoing learning is needed as standards and technology change',
      'A single completed qualification is sufficient across a full electrical career',
      'Only awarding-body updates to the wiring regulations require any further study',
      'Once awarded, an electrical qualification remains current for life with no review',
    ],
    correctAnswer: 0,
    explanation: 'Electrical qualifications need updating as regulations and technology evolve.',
    section: '7.3',
    difficulty: 'intermediate',
  },
  {
    id: 85,
    question: 'Recognition of overseas qualifications typically requires:',
    options: [
      'Automatic acceptance of any equivalent international electrotechnical qualification',
      'Assessment against UK standards and possible bridging requirements',
      'No recognition route — overseas qualifications cannot be used in UK practice',
      'Complete retraining via a full Level 3 Diploma with no credit for prior learning',
    ],
    correctAnswer: 1,
    explanation:
      'Overseas qualifications are assessed against UK standards, with bridging where needed.',
    section: '7.3',
    difficulty: 'intermediate',
  },
  {
    id: 86,
    question: 'Specialist manufacturer training provides:',
    options: [
      'General qualifications equivalent to an NVQ',
      'Warranty registration with no technical content',
      'Product-specific knowledge and installation competence',
      'Marketing of the product range and nothing more',
    ],
    correctAnswer: 2,
    explanation:
      'Manufacturer training provides specific knowledge for their products and systems.',
    section: '7.3',
    difficulty: 'basic',
  },
  {
    id: 88,
    question: 'What do the levels of the Regulated Qualifications Framework indicate?',
    options: [
      'Complexity and achievement levels of qualifications',
      'The subjective difficulty of an assessment',
      'The guided learning hours and course length',
      'The awarding body registration fee',
    ],
    correctAnswer: 0,
    explanation:
      'QCF levels indicate relative complexity and achievement - Level 3 is equivalent to A-level.',
    section: '7.3',
    difficulty: 'intermediate',
  },
  {
    id: 89,
    question: 'Apprenticeship standards define:',
    options: [
      'Statutory minimum pay rates, set for each year of training',
      'Knowledge, skills, and behaviours required for the occupation',
      'The mandatory training duration, in months, for each occupational role',
      'The geographical location, region by region, where providers must deliver',
    ],
    correctAnswer: 1,
    explanation:
      'Standards set out the knowledge, skills, and behaviours apprentices must demonstrate.',
    section: '7.3',
    difficulty: 'intermediate',
  },
  {
    id: 90,
    question: 'Prior learning recognition (RPL) allows:',
    options: [
      'No reduction whatever the prior experience',
      'Exemption from all assessment without evidence',
      'Credit for relevant previous learning and experience',
      'Automatic award of the full qualification',
    ],
    correctAnswer: 2,
    explanation:
      'RPL gives credit for previous relevant learning, reducing duplication in training.',
    section: '7.3',
    difficulty: 'intermediate',
  },

  // Section 7.4: Career Pathways (Questions 91-120)
  {
    id: 91,
    question: 'A typical career pathway for an electrician starts with:',
    options: [
      'A design role producing circuit schematics',
      'Setting up a contracting business first',
      'Direct entry into project management',
      'Apprenticeship or training programme',
    ],
    correctAnswer: 3,
    explanation:
      'Most electricians begin with formal training through apprenticeship or college programmes.',
    section: '7.4',
    difficulty: 'basic',
  },
  {
    id: 92,
    question: 'After qualifying as an electrician, common progression includes:',
    options: [
      'Specialisation, supervision, or technical roles',
      'Leaving the industry, for an unrelated trade',
      'Part-time hours only, with no progression',
      'Staying at Installation grade, permanently',
    ],
    correctAnswer: 0,
    explanation:
      'Qualified electricians can progress to specialist, supervisory, or technical positions.',
    section: '7.4',
    difficulty: 'basic',
  },
  {
    id: 93,
    question: 'Becoming self-employed as an electrician requires:',
    options: [
      'Nothing, beyond a recognised trade qualification',
      'Business skills, insurance, and scheme registration',
      'A government licence, rather than scheme entry',
      'Technical competence, with no business setup',
    ],
    correctAnswer: 1,
    explanation:
      'Self-employment requires business management skills, appropriate insurance, and compliance with scheme requirements.',
    section: '7.4',
    difficulty: 'intermediate',
  },
  {
    id: 94,
    question: 'Moving into electrical contracting management typically requires:',
    options: [
      'A business or management degree without prior electrical site experience',
      'Financial and accounting skills as the primary qualification for the role',
      'Technical competence plus management and leadership skills',
      'Technical site competence alone with no leadership or business element',
    ],
    correctAnswer: 2,
    explanation:
      'Management combines technical knowledge with people management and business skills.',
    section: '7.4',
    difficulty: 'intermediate',
  },
  {
    id: 95,
    question: 'Specialising in renewable energy offers opportunities in:',
    options: [
      'A contracting sector in long-term structural decline across the UK',
      'Overseas project work only, with no domestic UK installation market',
      'Academic research positions rather than commercial installation roles',
      'Growing sector with government support and demand',
    ],
    correctAnswer: 3,
    explanation:
      'Renewable energy is a growing sector with strong government support and increasing demand.',
    section: '7.4',
    difficulty: 'basic',
  },
  {
    id: 96,
    question: 'Technical sales career paths utilise electrical knowledge by:',
    options: [
      'Applying technical expertise to advise customers on products',
      'Abandoning technical skills for sales training',
      'Handling sales admin with no customer contact',
      'Working in wholesale warehouse goods handling',
    ],
    correctAnswer: 0,
    explanation:
      'Technical sales combines product knowledge with communication skills to help customers.',
    section: '7.4',
    difficulty: 'intermediate',
  },
  {
    id: 97,
    question: 'Moving into electrical training/education requires:',
    options: [
      'Long site experience with no assessor award',
      'Technical competence plus teaching qualifications',
      'On-site competence and nothing further',
      'A teaching role with no assessor requirement',
    ],
    correctAnswer: 1,
    explanation:
      'Training roles need technical competence plus assessor and teaching qualifications.',
    section: '7.4',
    difficulty: 'intermediate',
  },
  {
    id: 98,
    question: 'Health and safety career paths from electrical background include:',
    options: [
      'No route at all, from contracting into safety roles',
      'First aid response only, with no risk assessment',
      'Safety advisor, CDM coordinator, or compliance roles',
      'Technical authoring, with no safety remit',
    ],
    correctAnswer: 2,
    explanation:
      'Electrical experience can lead to broader H&S roles including CDM and compliance.',
    section: '7.4',
    difficulty: 'intermediate',
  },
  {
    id: 99,
    question: 'Estimating and quantity surveying in electrical contracting:',
    options: [
      'Needs only numeracy and pricing skills',
      'Is fully automated with no human judgement',
      'Is an accounting role away from site work',
      'Benefits greatly from hands-on electrical experience',
    ],
    correctAnswer: 3,
    explanation:
      'Estimators with installation experience better understand work requirements and costs.',
    section: '7.4',
    difficulty: 'intermediate',
  },
  {
    id: 100,
    question: 'Building services engineering from an electrical background typically requires:',
    options: [
      'Degree or higher qualification in building services',
      'Site installation experience and nothing more',
      'Project management training with no degree',
      'No study beyond the Level 3 Diploma',
    ],
    correctAnswer: 0,
    explanation:
      'Engineering roles typically require degree-level qualifications building on practical experience.',
    section: '7.4',
    difficulty: 'intermediate',
  },
  {
    id: 101,
    question: 'Facility management roles suit electricians because:',
    options: [
      'No electrical knowledge is needed in the role',
      'Technical understanding helps manage building services',
      'The role covers cleaning contracts only',
      'Security gate operation is the main duty',
    ],
    correctAnswer: 1,
    explanation: 'FM roles benefit from technical understanding of building electrical systems.',
    section: '7.4',
    difficulty: 'intermediate',
  },
  {
    id: 102,
    question: 'Starting your own electrical business requires consideration of:',
    options: [
      'Electrical competence alone, with no business administration setup',
      'A reliable vehicle for site travel, with no further registration steps',
      'Registration, insurance, accounts, marketing, and legal requirements',
      'A complete toolkit, plus stock of consumables, as the main requirement',
    ],
    correctAnswer: 2,
    explanation:
      'Business ownership requires comprehensive planning across registration, insurance, and operations.',
    section: '7.4',
    difficulty: 'intermediate',
  },
  {
    id: 103,
    question: 'Career progression in large contractors typically offers:',
    options: [
      'First-fix and second-fix work with no development',
      'Limited progression beyond Approved grade',
      'No internal training or sponsored study',
      'Structured progression paths through grades and roles',
    ],
    correctAnswer: 3,
    explanation:
      'Large contractors often have clear progression structures and training programmes.',
    section: '7.4',
    difficulty: 'intermediate',
  },
  {
    id: 104,
    question: 'International work opportunities for UK electricians include:',
    options: [
      'Project work abroad, especially in similar regulatory environments',
      'No international opportunities exist, anywhere outside the UK',
      'European Union member states only, with no recognition further afield',
      'Commonwealth countries only, with no opportunities elsewhere in the world',
    ],
    correctAnswer: 0,
    explanation:
      'UK qualifications are recognised in many countries, particularly those with similar standards.',
    section: '7.4',
    difficulty: 'intermediate',
  },
  {
    id: 105,
    question: 'Consultancy work in electrical industry typically requires:',
    options: [
      'One year of post-apprenticeship experience',
      'Extensive experience and specialist knowledge',
      'An academic qualification and no site work',
      'A Level 3 Diploma with no site experience',
    ],
    correctAnswer: 1,
    explanation:
      'Consultancy requires deep experience and expertise to advise clients effectively.',
    section: '7.4',
    difficulty: 'intermediate',
  },
  {
    id: 106,
    question: 'Quality management career paths suit electricians who:',
    options: [
      'Find detail-orientated tasks frustrating and prefer broad-brush oversight',
      'Want to remain on the tools full-time without any compliance role',
      'Have attention to detail and understanding of standards',
      'Tend to avoid written documentation and prefer entirely verbal handovers',
    ],
    correctAnswer: 2,
    explanation:
      'QA roles suit those with attention to detail and understanding of compliance requirements.',
    section: '7.4',
    difficulty: 'intermediate',
  },
  {
    id: 107,
    question: 'Combining electrical work with IT/smart building systems offers:',
    options: [
      'A limited future as smart-building demand stalls',
      'No benefit over standard electrician work',
      'Fixed-wiring work with no network integration',
      'Growing opportunities in building automation',
    ],
    correctAnswer: 3,
    explanation:
      'Integration of electrical and IT skills is increasingly valuable for smart building systems.',
    section: '7.4',
    difficulty: 'intermediate',
  },
  {
    id: 108,
    question: 'Union representation roles suit electricians who:',
    options: [
      'Want to support colleagues and negotiate on industry issues',
      'Operate independently with no engagement in workplace consultation forums',
      'Tend to avoid meetings and structured employee representation activity',
      'Prefer to work in isolation rather than communicate with colleagues',
    ],
    correctAnswer: 0,
    explanation: 'Union roles suit those wanting to represent and support fellow workers.',
    section: '7.4',
    difficulty: 'intermediate',
  },
  {
    id: 109,
    question: 'Career change timing considerations include:',
    options: [
      'Chronological age alone, regardless of experience or market conditions',
      'Experience level, market conditions, and personal circumstances',
      'Random opportunity, rather than structured planning of the transition',
      'Employer-initiated decisions only, with no input from the individual',
    ],
    correctAnswer: 1,
    explanation:
      'Career changes should consider multiple factors including experience and opportunities.',
    section: '7.4',
    difficulty: 'intermediate',
  },
  {
    id: 110,
    question: 'Which working pattern would best suit an electrician who needs predictable hours?',
    options: [
      'Have no bearing on which role or sector an electrician pursues',
      'Apply only to managerial grades and not to on-site operatives',
      'Should influence role choices and career direction',
      'Should be discounted entirely from career planning decisions',
    ],
    correctAnswer: 2,
    explanation: 'Different electrical roles offer varying work patterns affecting life balance.',
    section: '7.4',
    difficulty: 'intermediate',
  },
  {
    id: 111,
    question: 'Portfolio careers combining employed and self-employed work:',
    options: [
      'Are not feasible due to scheme membership or insurance restrictions',
      'Apply only to semi-retired workers returning on a part-time basis',
      'Are prohibited under UK employment and tax legislation',
      'Offer flexibility and variety for some electricians',
    ],
    correctAnswer: 3,
    explanation: 'Some electricians successfully combine different work arrangements.',
    section: '7.4',
    difficulty: 'intermediate',
  },
  {
    id: 112,
    question: 'Mentoring roles for experienced electricians involve:',
    options: [
      'Supporting development of less experienced colleagues',
      'Performance criticism of junior staff rather than structured development',
      'Office-based administration with no on-tools coaching component',
      'Pure project supervision with no requirement to coach or teach skills',
    ],
    correctAnswer: 0,
    explanation: 'Mentors share experience and support the development of others.',
    section: '7.4',
    difficulty: 'intermediate',
  },
  {
    id: 113,
    question: 'Career networking benefits include:',
    options: [
      'No measurable career value beyond friendly social interaction',
      'Learning about opportunities and industry developments',
      'Attending social events without any professional benefit attached',
      'Active job-hunting only, with no broader knowledge or development benefit',
    ],
    correctAnswer: 1,
    explanation:
      'Networking provides industry knowledge, opportunities, and professional connections.',
    section: '7.4',
    difficulty: 'intermediate',
  },
  {
    id: 114,
    question: 'Transitioning to office-based electrical roles may suit those who:',
    options: [
      'Want to remain on tools full-time with no reduction in physical workload',
      'Have no electrical industry experience to bring to the office role',
      'Want to reduce physical demands while using electrical knowledge',
      'Find software, schematics, and other electronic tools difficult to use',
    ],
    correctAnswer: 2,
    explanation:
      'Office roles like design or estimating use technical knowledge without physical demands.',
    section: '7.4',
    difficulty: 'intermediate',
  },
  {
    id: 115,
    question: 'Emergency and breakdown services offer:',
    options: [
      'Fixed office hours with no callout duty',
      'Part-time work only, with no contracts',
      'A dead-end with no specialist routes',
      'Variable hours but often premium rates',
    ],
    correctAnswer: 3,
    explanation: 'Emergency services typically involve variable hours compensated by higher rates.',
    section: '7.4',
    difficulty: 'intermediate',
  },
  {
    id: 116,
    question: 'Sector specialisation (healthcare, data centres, etc.) can provide:',
    options: [
      'Higher rates and consistent demand in specialist areas',
      'Fewer opportunities than general contracting',
      'Routine basic work with no advanced skills',
      'No earnings benefit over general work',
    ],
    correctAnswer: 0,
    explanation: 'Specialist sectors often offer premium rates and steady demand for expertise.',
    section: '7.4',
    difficulty: 'intermediate',
  },
  {
    id: 117,
    question: 'Geographic mobility in electrical careers:',
    options: [
      'Is a drawback that limits career stability',
      'Can significantly increase opportunities and earnings',
      'Is mandatory for every UK electrical role',
      'Has no effect on the roles available',
    ],
    correctAnswer: 1,
    explanation: 'Willingness to travel or relocate can open up more opportunities.',
    section: '7.4',
    difficulty: 'intermediate',
  },
  {
    id: 118,
    question: 'Later career options for electricians include:',
    options: [
      'Full retirement, with no transitional roles',
      'First-fix work only, with no lighter alternative',
      'Consulting, training, inspection, or reduced-hours roles',
      'No options at all, once Approved grade is reached',
    ],
    correctAnswer: 2,
    explanation:
      'Later careers can transition to less physical roles utilising accumulated experience.',
    section: '7.4',
    difficulty: 'intermediate',
  },
  {
    id: 119,
    question: 'Industry body involvement can benefit careers by:',
    options: [
      'Consuming time, which would be better spent on billable site work',
      'Adding no measurable benefit, at any stage of a qualified electrician\'s career',
      'Limiting engagement to committee meetings, with no broader value',
      'Providing networking, influence, and development opportunities',
    ],
    correctAnswer: 3,
    explanation:
      'Industry body involvement provides connections and demonstrates professional commitment.',
    section: '7.4',
    difficulty: 'intermediate',
  },
  {
    id: 120,
    question: 'Which factor should be settled first when drawing up a career plan?',
    options: [
      'Personal goals, industry trends, and skill development needs',
      'The current employer\'s preferences, taken as the sole basis',
      'Currently available vacancies alone, without forward-looking trend analysis',
      'Short-term pay rates and bonuses, as the only planning input',
    ],
    correctAnswer: 0,
    explanation: 'Effective career planning balances personal aspirations with industry realities.',
    section: '7.4',
    difficulty: 'intermediate',
  },

  // Section 7.5: CPD Requirements (Questions 121-145)
  {
    id: 121,
    question: 'CPD stands for:',
    options: [
      'Company Performance Department',
      'Continuing Professional Development',
      'Current Professional Duties',
      'Central Power Distribution',
    ],
    correctAnswer: 1,
    explanation:
      'CPD is Continuing Professional Development - ongoing learning to maintain competence.',
    section: '7.5',
    difficulty: 'basic',
  },
  {
    id: 122,
    question: 'CPD in the electrical industry is important because:',
    options: [
      'Qualified electricians rarely revisit the regs',
      'It is the only way to raise an hourly rate',
      'Technology and regulations constantly change',
      'Employers must fund all training by law',
    ],
    correctAnswer: 2,
    explanation:
      'CPD keeps electricians current with evolving technology, regulations, and best practices.',
    section: '7.5',
    difficulty: 'basic',
  },
  {
    id: 123,
    question: 'ECS card renewal typically requires:',
    options: [
      'Resitting the Level 3 Diploma exams',
      'A fresh AM2s every three years',
      'A new apprenticeship logbook',
      'Evidence of CPD activities',
    ],
    correctAnswer: 3,
    explanation: 'ECS card renewal requires demonstrating ongoing professional development.',
    section: '7.5',
    difficulty: 'intermediate',
  },
  {
    id: 124,
    question: 'Which activity would be recorded as continuing professional development?',
    options: [
      'Training, reading, conferences, and practical skill development',
      'Only formal classroom courses, delivered by an awarding body',
      'Routine repetition of work already mastered, without reflection',
      'Renewing tool insurance, plus updating vehicle documentation',
    ],
    correctAnswer: 0,
    explanation:
      'CPD can include various activities: formal training, self-study, conferences, and on-job learning.',
    section: '7.5',
    difficulty: 'basic',
  },
  {
    id: 125,
    question: 'When BS 7671 is amended, electricians should:',
    options: [
      'Continue working to the superseded edition until it is withdrawn',
      'Update their knowledge through appropriate training',
      'Wait until their next ECS card renewal before reviewing changes',
      'Rely on wholesalers to advise them of any relevant changes',
    ],
    correctAnswer: 1,
    explanation: 'Regulation changes require prompt updating of knowledge to maintain competence.',
    section: '7.5',
    difficulty: 'basic',
  },
  {
    id: 126,
    question: 'CPD records should include:',
    options: [
      'Only the total number of hours, with no further detail',
      'Personal opinions on colleagues, rather than learning gained',
      'Details of activities, dates, and learning outcomes',
      'Copies of pay slips, evidencing time spent away from site',
    ],
    correctAnswer: 2,
    explanation: 'CPD records should document what was learned, when, and how it applies to work.',
    section: '7.5',
    difficulty: 'intermediate',
  },
  {
    id: 127,
    question: 'Employer support for CPD typically includes:',
    options: [
      'A legal duty, to fund every external qualification in full',
      'Guaranteed promotion, on completion of any training course',
      'Unpaid leave, as the only mechanism for attending courses',
      'Training budgets, time allowance, and development planning',
    ],
    correctAnswer: 3,
    explanation: 'Good employers provide resources and time for professional development.',
    section: '7.5',
    difficulty: 'intermediate',
  },
  {
    id: 128,
    question: 'Online learning for CPD offers:',
    options: [
      'Flexible access to training at convenient times',
      'Recognition that always exceeds equivalent classroom courses',
      'Guaranteed exemption from any practical assessment',
      'A complete replacement for all hands-on site experience',
    ],
    correctAnswer: 0,
    explanation:
      'Online learning provides flexible CPD options that can fit around work schedules.',
    section: '7.5',
    difficulty: 'basic',
  },
  {
    id: 129,
    question: 'Manufacturer product training contributes to CPD by:',
    options: [
      'Replacing the need for any awarding-body qualification',
      'Providing specific knowledge for products installed',
      'Counting only towards a manufacturer warranty, not CPD',
      'Guaranteeing exclusive rights to install that product range',
    ],
    correctAnswer: 1,
    explanation: 'Manufacturer training ensures competent installation of their products.',
    section: '7.5',
    difficulty: 'basic',
  },
  {
    id: 130,
    question: 'Reading technical publications counts as CPD when:',
    options: [
      'The publication is purchased rather than borrowed',
      'It is read during contracted working hours only',
      'It contributes to professional knowledge and is documented',
      'It is written by a recognised professional body alone',
    ],
    correctAnswer: 2,
    explanation:
      'Self-directed reading contributes to CPD when it develops professional knowledge.',
    section: '7.5',
    difficulty: 'intermediate',
  },
  {
    id: 131,
    question: 'Trade exhibitions and conferences provide CPD through:',
    options: [
      'Free product samples, taken away from supplier stands',
      'Reduced wholesale pricing, offered to attendees',
      'Attendance certificates alone, regardless of content',
      'Seminars, demonstrations, and networking',
    ],
    correctAnswer: 3,
    explanation:
      'Industry events offer learning through presentations, product demos, and peer exchange.',
    section: '7.5',
    difficulty: 'intermediate',
  },
  {
    id: 132,
    question: 'Informal workplace learning can count as CPD if:',
    options: [
      'It develops skills and is reflected upon and recorded',
      'It takes place outside of normal contracted hours',
      'It is signed off by a registered awarding body',
      'It involves only tasks the worker has never done before',
    ],
    correctAnswer: 0,
    explanation:
      'On-job learning counts as CPD when it contributes to development and is documented.',
    section: '7.5',
    difficulty: 'intermediate',
  },
  {
    id: 133,
    question: 'CPD planning should consider:',
    options: [
      'Only those activities an employer will fund, and no others',
      'Career goals, skill gaps, and industry developments',
      'The lowest-cost courses available, regardless of relevance',
      'Past achievements, rather than future development needs',
    ],
    correctAnswer: 1,
    explanation:
      'Effective CPD planning addresses personal development needs and career objectives.',
    section: '7.5',
    difficulty: 'intermediate',
  },
  {
    id: 134,
    question: 'Professional body membership often includes CPD requirements of:',
    options: [
      'A one-off assessment with no further ongoing obligation',
      'Completing CPD only in the first year of membership',
      'Minimum annual hours of recorded development',
      'CPD that need not be recorded or evidenced on request',
    ],
    correctAnswer: 2,
    explanation:
      'Professional bodies typically require minimum documented CPD hours for membership.',
    section: '7.5',
    difficulty: 'intermediate',
  },
  {
    id: 135,
    question: 'Reflection on learning experiences helps CPD by:',
    options: [
      'Increasing the total number of hours that can be claimed',
      'Removing the need to keep any written CPD record',
      'Allowing past activities to be counted more than once',
      'Identifying what was learned and how to apply it',
    ],
    correctAnswer: 3,
    explanation: 'Reflection helps consolidate learning and identify how to apply new knowledge.',
    section: '7.5',
    difficulty: 'intermediate',
  },
  {
    id: 136,
    question: 'CPD audits by professional bodies:',
    options: [
      'Check members maintain their development commitments',
      'Replace the need for members to keep their own records',
      'Apply only to those applying for Fellow grade',
      'Are carried out by the employer rather than the body',
    ],
    correctAnswer: 0,
    explanation: 'Bodies audit CPD records to ensure members maintain professional standards.',
    section: '7.5',
    difficulty: 'intermediate',
  },
  {
    id: 137,
    question: 'Teaching or presenting to others counts as CPD because:',
    options: [
      'It removes the need for the presenter to do other CPD',
      'It requires preparation and deepens understanding',
      'It only benefits the audience, not the presenter',
      'It can be claimed without preparing any material',
    ],
    correctAnswer: 1,
    explanation:
      'Teaching requires mastery of subject matter and contributes to professional development.',
    section: '7.5',
    difficulty: 'intermediate',
  },
  {
    id: 138,
    question: 'Toolbox talks on site can contribute to CPD when:',
    options: [
      'They are delivered only by an external training provider',
      'They are recorded for payroll rather than learning purposes',
      'They address relevant technical or safety topics',
      'They last a minimum of a full working day',
    ],
    correctAnswer: 2,
    explanation:
      'Workplace briefings on relevant topics contribute to ongoing professional knowledge.',
    section: '7.5',
    difficulty: 'intermediate',
  },
  {
    id: 139,
    question: 'Structured CPD typically requires:',
    options: [
      'Unplanned activities undertaken purely as they arise',
      'Only on-the-job experience with no formal element',
      'Attendance at events without any defined objectives',
      'Planned activities aligned with development needs',
    ],
    correctAnswer: 3,
    explanation:
      'Structured CPD involves planned activities addressing identified development needs.',
    section: '7.5',
    difficulty: 'intermediate',
  },
  {
    id: 140,
    question: 'CPD benefits employers by:',
    options: [
      'Maintaining skilled workforce current with developments',
      'Removing the need for any supervision on site',
      'Guaranteeing staff will never leave the business',
      'Reducing the requirement to hold valid insurance',
    ],
    correctAnswer: 0,
    explanation:
      'CPD ensures workforce competence, benefiting quality, compliance, and reputation.',
    section: '7.5',
    difficulty: 'intermediate',
  },
  {
    id: 141,
    question: 'Self-assessment in CPD helps identify:',
    options: [
      'The pay rate due for a given JIB grade',
      'Both strengths and areas for development',
      'The cost of professional body membership',
      'Which colleagues require the most supervision',
    ],
    correctAnswer: 1,
    explanation: 'Self-assessment identifies strengths to build on and gaps requiring development.',
    section: '7.5',
    difficulty: 'intermediate',
  },
  {
    id: 142,
    question: 'Technical webinars and podcasts can provide CPD if:',
    options: [
      'They are paid for rather than accessed free of charge',
      'They are watched outside of contracted working hours',
      'They address professional topics and learning is documented',
      'They are produced by an awarding body exclusively',
    ],
    correctAnswer: 2,
    explanation: 'Digital content contributes to CPD when it develops professional knowledge.',
    section: '7.5',
    difficulty: 'intermediate',
  },
  {
    id: 143,
    question: 'Mentoring activities contribute to CPD for:',
    options: [
      'Neither party',
      'Only the mentee',
      'Senior staff only',
      'Both mentor and mentee',
    ],
    correctAnswer: 3,
    explanation: 'Mentoring develops skills for both parties through sharing and reflection.',
    section: '7.5',
    difficulty: 'intermediate',
  },
  {
    id: 144,
    question: 'Cross-training in related disciplines provides CPD by:',
    options: [
      'Broadening knowledge and understanding of integrated systems',
      'Replacing the need for any electrical qualification',
      'Allowing work outside the limits of one’s competence',
      'Counting double towards minimum recorded CPD hours',
    ],
    correctAnswer: 0,
    explanation: 'Understanding related disciplines improves overall professional capability.',
    section: '7.5',
    difficulty: 'intermediate',
  },
  {
    id: 145,
    question: 'Maintaining a CPD portfolio demonstrates:',
    options: [
      'Entitlement to a higher JIB grade and pay rate',
      'Commitment to professional standards and ongoing development',
      'Exemption from future professional body audits',
      'That no further learning will be needed in future',
    ],
    correctAnswer: 1,
    explanation:
      'A CPD portfolio demonstrates professional commitment and tracks development progress.',
    section: '7.5',
    difficulty: 'intermediate',
  },

  // Section 7.6: Professional Bodies (Questions 146-170)
  {
    id: 146,
    question: 'The IET (Institution of Engineering and Technology) is:',
    options: [
      'A competent person scheme for self-certifying domestic work',
      'A trade union representing electricians in pay negotiations',
      'A professional body for engineers and technicians',
      'A government regulator that issues electrical licences',
    ],
    correctAnswer: 2,
    explanation: 'The IET is the professional body for engineering and technology professionals.',
    section: '7.6',
    difficulty: 'basic',
  },
  {
    id: 147,
    question: 'IET membership levels include:',
    options: [
      'Apprentice, Improver, and Approved grades',
      'Bronze, Silver, and Gold card tiers',
      'Labourer, Operative, and Supervisor grades',
      'Student, Technician, Member, and Fellow grades',
    ],
    correctAnswer: 3,
    explanation:
      'IET has various membership grades reflecting different qualification and experience levels.',
    section: '7.6',
    difficulty: 'intermediate',
  },
  {
    id: 148,
    question: 'The ECA (Electrical Contractors Association) is:',
    options: [
      'A trade association for electrical contractors',
      'The awarding body for electrical NVQ qualifications',
      'A competent person scheme for self-certifying work',
      'The body that sets the BS 7671 wiring regulations',
    ],
    correctAnswer: 0,
    explanation:
      'ECA is a trade association representing electrical contractors and promoting standards.',
    section: '7.6',
    difficulty: 'basic',
  },
  {
    id: 149,
    question: 'SELECT in Scotland is:',
    options: [
      'The Scottish awarding body for electrical qualifications',
      'The trade association for Scottish electrical contractors',
      'A Scottish competent person scheme for domestic work',
      'The Scottish equivalent of the JIB grading board',
    ],
    correctAnswer: 1,
    explanation: 'SELECT represents electrical contractors in Scotland, similar to ECA in England.',
    section: '7.6',
    difficulty: 'intermediate',
  },
  {
    id: 150,
    question: 'Unite the Union represents electricians by:',
    options: [
      'Issuing ECS cards confirming qualifications and identity',
      'Assessing competence for competent person scheme entry',
      'Negotiating terms and conditions and supporting members',
      'Setting the technical requirements of BS 7671',
    ],
    correctAnswer: 2,
    explanation: 'Unite represents workers in negotiations and provides member support services.',
    section: '7.6',
    difficulty: 'basic',
  },
  {
    id: 151,
    question: 'NICEIC is primarily:',
    options: [
      'A trade union negotiating electricians’ pay and conditions',
      'The awarding body that issues the Level 3 Diploma',
      'A wholesaler supplying electrical materials to the trade',
      'An approved body for electrical contractor registration',
    ],
    correctAnswer: 3,
    explanation: 'NICEIC registers and assesses electrical contractors as an approved body.',
    section: '7.6',
    difficulty: 'basic',
  },
  {
    id: 152,
    question: 'Benefits of professional body membership include:',
    options: [
      'Recognition, networking, resources, and professional development',
      'A legal right, to self-certify all notifiable work',
      'Automatic award of Approved Electrician grade, on joining',
      'Exemption from holding professional indemnity insurance, by law',
    ],
    correctAnswer: 0,
    explanation:
      'Membership provides professional recognition, networking, and development resources.',
    section: '7.6',
    difficulty: 'intermediate',
  },
  {
    id: 153,
    question: 'NAPIT provides:',
    options: [
      'Trade union representation in pay negotiations',
      'Competent person scheme registration and assessment',
      'The Level 3 Diploma as an awarding body',
      'Chartered Engineer registration for designers',
    ],
    correctAnswer: 1,
    explanation: 'NAPIT is a competent person scheme provider for various technical sectors.',
    section: '7.6',
    difficulty: 'intermediate',
  },
  {
    id: 154,
    question: 'Chartered Engineer (CEng) status requires:',
    options: [
      'Completion of an apprenticeship and AM2s assessment only',
      'A Level 3 Diploma plus two years of site experience',
      'Degree-level qualification plus professional development review',
      'Competent person scheme registration with an approved body',
    ],
    correctAnswer: 2,
    explanation:
      'CEng requires appropriate qualifications plus professional competence demonstration.',
    section: '7.6',
    difficulty: 'intermediate',
  },
  {
    id: 155,
    question: 'Engineering Technician (EngTech) registration is suitable for:',
    options: [
      'Degree-qualified design engineers seeking Chartered status',
      'Apprentices in their first year of training',
      'Labourers assisting qualified electricians on site',
      'Electricians with Level 3 qualifications and experience',
    ],
    correctAnswer: 3,
    explanation: 'EngTech recognises technician-level competence with Level 3 qualifications.',
    section: '7.6',
    difficulty: 'intermediate',
  },
  {
    id: 156,
    question: 'What does a competent person scheme operator do for its registered businesses?',
    options: [
      'A competent person scheme for electrical work',
      'A trade union for electrical operatives',
      'An awarding body for electrical qualifications',
      'A wholesaler of electrical accessories and cable',
    ],
    correctAnswer: 0,
    explanation: 'ELECSA provides competent person scheme registration for electrical contractors.',
    section: '7.6',
    difficulty: 'intermediate',
  },
  {
    id: 157,
    question: 'Professional body codes of conduct require members to:',
    options: [
      'Undercut competitors to win as much work as possible',
      'Maintain standards and act professionally',
      'Work exclusively for other members of the same body',
      'Accept all work offered regardless of competence',
    ],
    correctAnswer: 1,
    explanation: 'Members must adhere to professional standards and ethical requirements.',
    section: '7.6',
    difficulty: 'intermediate',
  },
  {
    id: 158,
    question: 'The Construction Industry Council (CIC) includes:',
    options: [
      'Only architectural practices and surveying firms',
      'Individual tradespeople rather than professional bodies',
      'Multiple professional bodies including electrical sector representatives',
      'Electrical wholesalers and equipment manufacturers',
    ],
    correctAnswer: 2,
    explanation:
      'CIC represents construction sector professional bodies including those for electrical.',
    section: '7.6',
    difficulty: 'intermediate',
  },
  {
    id: 159,
    question: 'How does industry grading relate to registration with a professional institution?',
    options: [
      'JIB grades replace the need for any professional registration',
      'JIB grades and professional registration are mutually exclusive',
      'JIB grading bars holders from registering with the IET',
      'JIB grades support evidence for professional registration',
    ],
    correctAnswer: 3,
    explanation: 'JIB grades and experience support applications for professional registration.',
    section: '7.6',
    difficulty: 'intermediate',
  },
  {
    id: 160,
    question: 'Why might an electrician belong to both a trade association and a professional institution?',
    options: [
      'Common and can provide different benefits',
      'Prohibited by professional body codes of conduct',
      'Restricted to those holding Chartered status',
      'Limited to one body per registered contractor',
    ],
    correctAnswer: 0,
    explanation: 'Many professionals belong to multiple organisations for different benefits.',
    section: '7.6',
    difficulty: 'intermediate',
  },
  {
    id: 161,
    question: 'Professional indemnity benefits through organisation membership:',
    options: [
      'Are mandatory and identical across every professional body',
      'May be available through some memberships',
      'Replace the need to hold public liability insurance',
      'Are only offered to Chartered Engineer members',
    ],
    correctAnswer: 1,
    explanation:
      'Some organisations provide or facilitate professional indemnity cover for members.',
    section: '7.6',
    difficulty: 'intermediate',
  },
  {
    id: 162,
    question: 'Technical guidance and publications from professional bodies:',
    options: [
      'Carry the full legal force of statutory regulations',
      'Are aimed only at students rather than practitioners',
      'Provide authoritative guidance on standards and practice',
      'Replace the need to consult BS 7671 itself',
    ],
    correctAnswer: 2,
    explanation: 'Professional bodies produce valuable technical guidance and publications.',
    section: '7.6',
    difficulty: 'intermediate',
  },
  {
    id: 163,
    question: 'Professional registration demonstrates:',
    options: [
      'A legal licence required before any electrical work',
      'Membership of a trade union and its benefits',
      'Entitlement to a specific JIB pay rate',
      'Competence recognised against national standards',
    ],
    correctAnswer: 3,
    explanation: 'Registration recognises competence against nationally recognised standards.',
    section: '7.6',
    difficulty: 'intermediate',
  },
  {
    id: 164,
    question: 'Disciplinary procedures of professional bodies:',
    options: [
      'Address complaints about member conduct',
      'Set the minimum pay rates for each grade',
      'Determine which members receive work first',
      'Replace the role of the courts in legal disputes',
    ],
    correctAnswer: 0,
    explanation: 'Professional bodies have procedures to address complaints about member conduct.',
    section: '7.6',
    difficulty: 'intermediate',
  },
  {
    id: 165,
    question: 'Advocacy by professional bodies involves:',
    options: [
      'Negotiating individual members’ wages with employers',
      'Representing industry interests to government and regulators',
      'Assessing candidates for competent person schemes',
      'Supplying technical materials to electrical contractors',
    ],
    correctAnswer: 1,
    explanation:
      'Bodies advocate for the industry in policy discussions and regulatory consultations.',
    section: '7.6',
    difficulty: 'intermediate',
  },
  {
    id: 166,
    question: 'Early career membership of professional bodies:',
    options: [
      'Is only possible once fully qualified and experienced',
      'Requires Chartered Engineer status to join',
      'Provides development support and networking from the start',
      'Offers no benefit until a member reaches senior grades',
    ],
    correctAnswer: 2,
    explanation: 'Early membership provides support and connections from career start.',
    section: '7.6',
    difficulty: 'intermediate',
  },
  {
    id: 167,
    question: 'Regional branches of professional bodies offer:',
    options: [
      'Lower fees, cheaper than the national body',
      'Mandatory weekly attendance, for all local members',
      'Scheme assessments, carried out for the region',
      'Local networking, events, and professional support',
    ],
    correctAnswer: 3,
    explanation: 'Local branches provide accessible networking and professional events.',
    section: '7.6',
    difficulty: 'intermediate',
  },
  {
    id: 168,
    question: 'Volunteering with professional bodies provides:',
    options: [
      'Development opportunities and industry influence',
      'A guaranteed salary from the professional body',
      'Automatic progression to Fellow grade',
      'Exemption from annual membership fees only',
    ],
    correctAnswer: 0,
    explanation:
      'Volunteering develops skills and provides networking and influence opportunities.',
    section: '7.6',
    difficulty: 'intermediate',
  },
  {
    id: 169,
    question: 'Professional body awards and recognition programmes:',
    options: [
      'Set the statutory pay rates across the industry',
      'Recognise excellence and raise professional profile',
      'Replace the need for formal qualifications',
      'Are open only to Chartered Engineer members',
    ],
    correctAnswer: 1,
    explanation: 'Awards recognise excellence and can enhance professional reputation.',
    section: '7.6',
    difficulty: 'intermediate',
  },
  {
    id: 170,
    question: 'Digital resources provided by professional bodies include:',
    options: [
      'Discounted materials, cable, and tools',
      'Free professional indemnity insurance, for all members',
      'Online learning, forums, and technical databases',
      'Automated certification of work, without inspection',
    ],
    correctAnswer: 2,
    explanation: 'Modern bodies provide extensive digital resources for member development.',
    section: '7.6',
    difficulty: 'intermediate',
  },

  // Section 7.7: Business Skills (Questions 171-200)
  {
    id: 171,
    question: 'Customer service skills are important for electricians because:',
    options: [
      'They remove the need to comply with BS 7671',
      'They allow higher prices to be charged without justification',
      'They are only relevant to office-based staff',
      'Good service leads to recommendations and repeat business',
    ],
    correctAnswer: 3,
    explanation:
      'Customer satisfaction drives referrals and reputation, essential for career success.',
    section: '7.7',
    difficulty: 'basic',
  },
  {
    id: 172,
    question: 'Effective communication with clients includes:',
    options: [
      'Clear explanations, listening, and managing expectations',
      'Using technical jargon, to demonstrate expertise',
      'Avoiding discussion of costs, until work is complete',
      'Limiting contact, to the initial quotation only',
    ],
    correctAnswer: 0,
    explanation: 'Good communication involves clear explanation and understanding client needs.',
    section: '7.7',
    difficulty: 'basic',
  },
  {
    id: 173,
    question: 'Time management for electricians affects:',
    options: [
      'The technical requirements, as set out in BS 7671',
      'Productivity, profitability, and customer satisfaction',
      'The JIB grade, and the rate, a worker may hold',
      'The validity period, in years, of an ECS card',
    ],
    correctAnswer: 1,
    explanation: 'Effective time management improves efficiency and customer satisfaction.',
    section: '7.7',
    difficulty: 'intermediate',
  },
  {
    id: 174,
    question: 'Quoting and estimating skills enable electricians to:',
    options: [
      'Avoid the need to inspect a site before pricing',
      'Win every tender by always quoting the lowest price',
      'Accurately price work for profitability',
      'Charge customers without itemising the work',
    ],
    correctAnswer: 2,
    explanation: 'Accurate quoting ensures fair pricing and sustainable business operation.',
    section: '7.7',
    difficulty: 'intermediate',
  },
  {
    id: 175,
    question: 'Basic accounting knowledge helps electricians understand:',
    options: [
      'The technical content of the wiring regulations, in detail',
      'How to inspect, test, and certify correctly',
      'The competence levels required, for each JIB grade',
      'Profit, costs, and financial health of their work',
    ],
    correctAnswer: 3,
    explanation: 'Financial understanding is essential for running profitable work or business.',
    section: '7.7',
    difficulty: 'intermediate',
  },
  {
    id: 176,
    question: 'Marketing for electrical services includes:',
    options: [
      'Word of mouth, online presence, and professional reputation',
      'Holding a valid ECS card, and trade qualifications',
      'Maintaining accurate records, job by job',
      'Registering with a competent person scheme, and nothing else',
    ],
    correctAnswer: 0,
    explanation: 'Effective marketing combines reputation, presence, and customer recommendations.',
    section: '7.7',
    difficulty: 'intermediate',
  },
  {
    id: 177,
    question: 'Handling complaints professionally:',
    options: [
      'Is unnecessary once a job has been paid for',
      'Can turn negative situations into positive outcomes',
      'Should be left entirely to a professional body',
      'Only matters for large commercial contracts',
    ],
    correctAnswer: 1,
    explanation:
      'Professional complaint handling can restore relationships and improve reputation.',
    section: '7.7',
    difficulty: 'intermediate',
  },
  {
    id: 178,
    question: 'Negotiation skills help electricians to:',
    options: [
      'Avoid having to provide written quotations',
      'Win disputes regardless of the merits of each side',
      'Reach fair agreements with customers and suppliers',
      'Set the industry minimum pay rates',
    ],
    correctAnswer: 2,
    explanation: 'Negotiation achieves fair outcomes for all parties in business relationships.',
    section: '7.7',
    difficulty: 'intermediate',
  },
  {
    id: 179,
    question: 'Self-employed electricians need to understand:',
    options: [
      'Only the technical content of BS 7671, and nothing more',
      'The JIB grading structure, for employed operatives',
      'Trade union negotiation procedures, and pay bargaining',
      'Tax, insurance, and business legal requirements',
    ],
    correctAnswer: 3,
    explanation: 'Self-employment requires understanding of tax, insurance, and legal compliance.',
    section: '7.7',
    difficulty: 'intermediate',
  },
  {
    id: 180,
    question: 'Record keeping for electrical work should include:',
    options: [
      'Job details, materials, time, and financial records',
      'Only the final invoice, as issued to the customer',
      'Personal opinions of the client, and of other trades',
      'Nothing, provided the work meets BS 7671',
    ],
    correctAnswer: 0,
    explanation:
      'Comprehensive records support business operation, compliance, and dispute resolution.',
    section: '7.7',
    difficulty: 'intermediate',
  },
  {
    id: 181,
    question: 'Why does a customer\'s judgement of an electrician start before any work is done?',
    options: [
      'Has no bearing on winning repeat work',
      'Affects customer confidence and professional image',
      'Is only required when working on commercial sites',
      'Matters less than holding the correct ECS card',
    ],
    correctAnswer: 1,
    explanation: 'Professional presentation builds customer confidence and trust.',
    section: '7.7',
    difficulty: 'basic',
  },
  {
    id: 182,
    question: 'Digital skills for modern electricians include:',
    options: [
      'Replacing all paper certificates, with verbal sign-off',
      'Avoiding test instruments, and relying on inspection alone',
      'Using apps, software, and digital tools for efficiency',
      'Relying solely on memory, rather than reference material',
    ],
    correctAnswer: 2,
    explanation:
      'Digital tools improve efficiency in quoting, scheduling, and customer communication.',
    section: '7.7',
    difficulty: 'intermediate',
  },
  {
    id: 183,
    question: 'Building long-term customer relationships:',
    options: [
      'Is less profitable than constantly seeking new clients',
      'Removes the need to quote accurately for work',
      'Only applies to commercial and industrial clients',
      'Provides steady work and referrals',
    ],
    correctAnswer: 3,
    explanation: 'Long-term relationships provide reliable income and recommendation network.',
    section: '7.7',
    difficulty: 'intermediate',
  },
  {
    id: 184,
    question: 'Problem-solving skills in electrical work extend to:',
    options: [
      'Technical, customer, and business challenges',
      'Only fault-finding, and nothing wider',
      'Matters that fall within BS 7671, and no others',
      'Tasks a supervisor delegates, and nothing else',
    ],
    correctAnswer: 0,
    explanation: 'Problem-solving applies to technical, interpersonal, and business situations.',
    section: '7.7',
    difficulty: 'intermediate',
  },
  {
    id: 185,
    question: 'Understanding contracts and terms helps electricians to:',
    options: [
      "Avoid the need to issue written quotations",
      "Protect themselves and deliver what's agreed",
      "Charge clients more than the agreed price",
      "Transfer all liability to the customer",
    ],
    correctAnswer: 1,
    explanation: 'Contract understanding protects interests and ensures clear agreements.',
    section: '7.7',
    difficulty: 'intermediate',
  },
  {
    id: 186,
    question: 'Invoice presentation should be:',
    options: [
      'Issued verbally, to avoid creating a paper trail',
      'Left for several months, well after the work is done',
      'Clear, professional, and detailed appropriately',
      'A single total, with no breakdown of charges',
    ],
    correctAnswer: 2,
    explanation: 'Professional invoices support timely payment and business credibility.',
    section: '7.7',
    difficulty: 'intermediate',
  },
  {
    id: 187,
    question: 'Managing cash flow is important because:',
    options: [
      'Profit alone guarantees a business can pay its bills',
      'Cash flow only matters for very large contractors',
      'It removes the need to keep financial records',
      'Even profitable businesses can fail without cash',
    ],
    correctAnswer: 3,
    explanation:
      'Cash flow management ensures ability to meet obligations regardless of profitability.',
    section: '7.7',
    difficulty: 'intermediate',
  },
  {
    id: 188,
    question: 'Supplier relationships affect business by:',
    options: [
      'Influencing prices, availability, and support received',
      'Determining the JIB grade, and rate, of employed staff',
      'Setting the technical standards, that work must meet',
      'Replacing the need for professional indemnity cover, entirely',
    ],
    correctAnswer: 0,
    explanation: 'Good supplier relationships provide better prices, availability, and support.',
    section: '7.7',
    difficulty: 'intermediate',
  },
  {
    id: 189,
    question: 'Site and project coordination skills enable electricians to:',
    options: [
      'Work in isolation from other trades on site',
      'Work effectively with other trades and stakeholders',
      'Avoid attending site progress meetings',
      'Delegate all planning to the main contractor',
    ],
    correctAnswer: 1,
    explanation: 'Coordination skills ensure smooth integration with other project participants.',
    section: '7.7',
    difficulty: 'intermediate',
  },
  {
    id: 190,
    question: 'Risk management in electrical business includes:',
    options: [
      'Only the technical risks, as covered by BS 7671',
      'Risks faced by employees, but not the business itself',
      'Financial, reputational, and operational risks',
      'Risks that can be transferred, entirely, to the client',
    ],
    correctAnswer: 2,
    explanation:
      'Business risk management covers financial, operational, and reputational considerations.',
    section: '7.7',
    difficulty: 'intermediate',
  },
  {
    id: 191,
    question: 'Stress management is important in electrical work because:',
    options: [
      'Stress affects office-based staff, but not site staff',
      'Managing it removes the need, in law, to work safely',
      'Pressure has no effect, either way, on the quality of work',
      'Deadlines, complexity, and responsibility can create pressure',
    ],
    correctAnswer: 3,
    explanation: 'Managing stress maintains wellbeing and performance under pressure.',
    section: '7.7',
    difficulty: 'intermediate',
  },
  {
    id: 192,
    question: 'Leadership skills benefit electricians by:',
    options: [
      'Supporting team working and project success at all levels',
      'Being relevant only once a formal manager role is held',
      'Removing the need to consult colleagues on decisions',
      'Applying solely to large contracting businesses',
    ],
    correctAnswer: 0,
    explanation: 'Leadership skills improve team effectiveness regardless of formal position.',
    section: '7.7',
    difficulty: 'intermediate',
  },
  {
    id: 193,
    question: 'What does a continuous improvement approach require an electrician to do after a job?',
    options: [
      'Keeping working methods unchanged once established',
      'Always looking for ways to improve work and service',
      'Improving only when a customer complains',
      'Reviewing practice solely at annual appraisals',
    ],
    correctAnswer: 1,
    explanation:
      'Continuous improvement drives better quality, efficiency, and customer satisfaction.',
    section: '7.7',
    difficulty: 'intermediate',
  },
  {
    id: 194,
    question: 'Understanding insurance requirements includes:',
    options: [
      'Vehicle breakdown, tool replacement, and nothing more',
      'A single policy, covering every possible business risk',
      "Public liability, employer's liability, and professional indemnity",
      'Cover needed only by limited companies, not sole traders',
    ],
    correctAnswer: 2,
    explanation: 'Appropriate insurance protects against various business and professional risks.',
    section: '7.7',
    difficulty: 'intermediate',
  },
  {
    id: 195,
    question: 'Adaptability in the electrical industry helps with:',
    options: [
      'Avoiding the need to learn any new technology',
      'Keeping to the same methods regardless of change',
      'Resisting changes to regulations and standards',
      'Responding to changing technology and market conditions',
    ],
    correctAnswer: 3,
    explanation: 'Adaptability enables response to industry evolution and changing client needs.',
    section: '7.7',
    difficulty: 'intermediate',
  },
  {
    id: 196,
    question: 'Decision-making skills for electricians involve:',
    options: [
      'Balancing technical, practical, and business factors',
      'Considering only the lowest-cost option, every time',
      'Following the customer\'s wishes, regardless of safety',
      'Deferring every choice, to a supervisor or manager',
    ],
    correctAnswer: 0,
    explanation: 'Good decision-making balances multiple factors for optimal outcomes.',
    section: '7.7',
    difficulty: 'intermediate',
  },
  {
    id: 197,
    question: 'Quality focus in electrical work means:',
    options: [
      'Doing the minimum needed to pass an inspection',
      'Consistently delivering work that meets or exceeds standards',
      'Prioritising speed of completion over compliance',
      'Cutting corners where the customer will not notice',
    ],
    correctAnswer: 1,
    explanation: 'Quality focus ensures consistent delivery of compliant, well-executed work.',
    section: '7.7',
    difficulty: 'intermediate',
  },
  {
    id: 198,
    question: 'Ethics in electrical business includes:',
    options: [
      'Maximising profit, by whatever means available',
      'Charging the highest price, that the customer will accept',
      'Honesty, fair dealing, and professional integrity',
      'Disclosing only what a client asks for, and no more',
    ],
    correctAnswer: 2,
    explanation: 'Ethical practice builds trust and sustainable business relationships.',
    section: '7.7',
    difficulty: 'intermediate',
  },
  {
    id: 199,
    question: 'How does building industry contacts most directly help an electrician find work?',
    options: [
      'Offers no benefit to a self-employed electrician',
      'Is only useful when actively seeking a new job',
      'Should be avoided to prevent sharing trade secrets',
      'Creates opportunities and support networks',
    ],
    correctAnswer: 3,
    explanation: 'Professional networks provide opportunities, support, and industry connections.',
    section: '7.7',
    difficulty: 'intermediate',
  },
  {
    id: 200,
    question: 'Personal development planning should:',
    options: [
      'Identify goals and actions for career advancement',
      'Focus only on the employer’s immediate needs',
      'Be completed once and never revisited',
      'List past achievements rather than future aims',
    ],
    correctAnswer: 0,
    explanation:
      'Personal planning drives career development through identified goals and actions.',
    section: '7.7',
    difficulty: 'intermediate',
  },
  {
    id: 201,
    question:
      'An electrician registered with a competent person scheme for domestic installation work is asked to change a distribution board in a commercial kitchen. What should be checked first?',
    options: [
      'Self-certify it, since a board change is always notifiable work',
      'Check the scope of the registration covers that work and premises',
      'Notify building control afterwards and carry on with the work',
      'Treat the job as exempt because commercial work is not notifiable',
    ],
    correctAnswer: 1,
    explanation:
      'Scheme registration is granted against a defined scope of work types and premises that the assessment actually covered, so the first question is whether this job falls inside it. Self-certification is the attractive wrong answer because the electrician does hold registration, but a domestic scope does not extend to commercial premises, and self-certification exists to satisfy building regulations for dwellings rather than to authorise any job anywhere.',
    section: '7.3',
    difficulty: 'intermediate',
  },
  {
    id: 202,
    question:
      'A time served electrician trades as a sole trader with no employees and subcontracts to a main contractor. Under health and safety law, where do the duties sit?',
    options: [
      'The main contractor carries every duty, so the sole trader has none',
      'Duties fall only on the client because the client owns the premises',
      'The sole trader holds duties for own safety and for others affected',
      'No duties apply until the sole trader takes on a first employee',
    ],
    correctAnswer: 2,
    explanation:
      'The Health and Safety at Work etc Act 1974 places duties on employers and on the self employed to protect themselves and anyone else affected by what they do. The tempting answer is that the main contractor carries everything, because the main contractor does hold coordination duties on site, but those duties sit alongside rather than replace the duty carried personally by the self employed worker.',
    section: '7.3',
    difficulty: 'intermediate',
  },
  {
    id: 203,
    question:
      'A contractor is sued because a design error left a distribution board undersized, causing costly rework but no injury and no damage to property. Which cover is intended for this claim?',
    options: [
      'Public liability, which covers injury or damage to third parties',
      'Employers liability, which covers claims brought by employees',
      'Contract works cover, which covers damage to work in progress',
      'Professional indemnity, which covers advice and design failings',
    ],
    correctAnswer: 3,
    explanation:
      'Professional indemnity responds to financial loss caused by professional advice, specification or design that turns out to be wrong. Public liability is the attractive distractor because contractors carry it routinely, but it is triggered by injury to people or damage to property belonging to others, and here the loss is purely the cost of putting a faulty design right.',
    section: '7.7',
    difficulty: 'intermediate',
  },
  {
    id: 204,
    question:
      'A limited company that has always been a one person operation takes on its first apprentice as an employee. Which insurance moves from optional to legally required?',
    options: [
      'Professional indemnity insurance, for design and advice claims',
      'Employers liability insurance, for claims by that employee',
      'Public liability insurance, for claims by members of the public',
      'Tool and van insurance, for loss of company owned equipment',
    ],
    correctAnswer: 1,
    explanation:
      'Employers liability insurance becomes a legal requirement once a business employs somebody, because it funds compensation if that worker is injured or made ill by the work. Public liability is the common wrong answer because almost every contractor holds it and clients often insist on it, but that pressure is commercial and contractual rather than a general statutory duty.',
    section: '7.7',
    difficulty: 'intermediate',
  },
  {
    id: 205,
    question:
      'Which description best fits the role of an electrical designer as distinct from an installing electrician?',
    options: [
      'Selects and sizes the installation on paper before work starts',
      'Fixes containment and pulls in cables along the agreed route',
      'Carries out initial verification testing before energising work',
      'Supervises apprentices on site and books material deliveries',
    ],
    correctAnswer: 0,
    explanation:
      'The designer decides the arrangement of the installation, including cable sizes, protective devices and earthing arrangements, before anyone lifts a tool. Initial verification is the plausible distractor because it also involves calculation and judgement, but it is a check carried out on completed work rather than the up front design decision.',
    section: '7.1',
    difficulty: 'intermediate',
  },
  {
    id: 206,
    question:
      'A householder in England wants a new socket circuit run in a kitchen. The electrician is competent but is not registered with any competent person scheme. What is the compliant route?',
    options: [
      'Carry out the work and issue an installation certificate only',
      'Refuse the work because only registered installers may do it',
      'Notify the local authority building control before starting work',
      'Ask the customer to notify the electricity supplier in advance',
    ],
    correctAnswer: 2,
    explanation:
      'Registration with a competent person scheme buys the right to self certify notifiable domestic work; without it the same work is still lawful, but it has to be notified to building control instead. Issuing a certificate is the attractive wrong answer because certification is genuinely required, yet a certificate satisfies the wiring standard and says nothing about the separate building regulations notification.',
    section: '7.3',
    difficulty: 'intermediate',
  },
  {
    id: 207,
    question:
      'Which of these jobs is best described as industrial sector work rather than domestic sector work?',
    options: [
      'Rewiring a three bedroom house for a private homeowner',
      'Maintaining motor control panels in a bottling factory',
      'Adding outside lights to a residential rear garden area',
      'Replacing a consumer unit in a private rented flat',
    ],
    correctAnswer: 1,
    explanation:
      'Industrial work centres on production plant and process equipment such as motors, control panels and machinery supplies. The rented flat is the distractor that catches people out because it is let commercially, but the sector is judged by the type of premises and installation, and a flat remains a dwelling however it is occupied.',
    section: '7.1',
    difficulty: 'basic',
  },
  {
    id: 208,
    question:
      'Why does an experienced electrician still need continuing professional development long after qualifying?',
    options: [
      'Standards, technology and guidance change after qualification',
      'Qualifications expire, and have to be retaken every single year',
      'Employers must, by law, fund a fixed number of training days',
      'It replaces supervision, when working on unfamiliar job types',
    ],
    correctAnswer: 0,
    explanation:
      'Competence is not a fixed possession: wiring standards are amended, new technologies such as storage and charging equipment arrive, and guidance is reissued, so knowledge decays unless it is refreshed. The idea that qualifications expire yearly is superficially attractive because some certificates are dated, but the real driver for development is change in the work itself.',
    section: '7.6',
    difficulty: 'intermediate',
  },
  {
    id: 209,
    question:
      'What is the main purpose of third party certification of an electrical contracting business?',
    options: [
      'It guarantees that every job the contractor does is fault free',
      'It transfers legal responsibility for the work to the scheme body',
      'It removes the need to issue certification for completed work',
      'It gives independent evidence the contractor was assessed as competent',
    ],
    correctAnswer: 3,
    explanation:
      'Third party certification exists so that a customer who cannot judge technical competence can rely on an independent body having assessed it against published criteria. The transfer of responsibility option appeals because scheme bodies do run complaints procedures, but legal responsibility for the work stays with the contractor who carried it out and signed for it.',
    section: '7.3',
    difficulty: 'basic',
  },
  {
    id: 210,
    question:
      'A worker invoices weekly, is told exactly when and where to attend, uses the firm van and cannot send a substitute. What does this pattern suggest about employment status?',
    options: [
      'Self employed, because invoices are raised instead of payslips',
      'Self employed, because the trade is a skilled manual trade',
      'Employed in practice, because control and personal service apply',
      'Neither, because status depends only on the written contract',
    ],
    correctAnswer: 2,
    explanation:
      'Status is judged on how the relationship actually works, and the classic markers of employment are control over when and how the work is done, personal service with no right of substitution, and equipment provided by the engager. Invoicing is the attractive wrong answer because it looks like self employment on paper, but paperwork does not override the reality of the arrangement.',
    section: '7.7',
    difficulty: 'intermediate',
  },
  {
    id: 211,
    question:
      'An electrician is asked on site to produce an industry grading card. What does holding that card actually demonstrate?',
    options: [
      'A legal licence without which electrical work cannot be done',
      'That every installation the holder signs off will be compliant',
      'That the holder business is registered as a scheme member',
      'That the holder qualifications and status have been verified',
    ],
    correctAnswer: 3,
    explanation:
      'A grading card is a means of confirming that the qualifications, training and status claimed by an individual have been checked by the issuing body, which is why sites ask for it at induction. Calling it a legal licence is the attractive error because many sites refuse entry without one, but that is a site access rule imposed by the contractor rather than a statutory requirement to hold a card before working.',
    section: '7.3',
    difficulty: 'basic',
  },
  {
    id: 212,
    question:
      'An electrician has just passed the AM2 and wants to move towards inspection and testing work. What is the most realistic next step?',
    options: [
      'Apply straight away to lead periodic inspection on large sites',
      'Gain a further qualification and supervised testing experience',
      'Wait until the next edition of the wiring standard is published',
      'Register a limited company so the work can be self certified',
    ],
    correctAnswer: 1,
    explanation:
      'Competence for inspection and testing is built from underpinning knowledge plus real experience of the work under someone who already holds it, which is why the recognised route pairs a qualification with supervised practice. Registering a company is the tempting shortcut because it changes what can be signed, but forming a business does not create the technical competence that signing an inspection report depends on.',
    section: '7.2',
    difficulty: 'basic',
  },
  {
    id: 213,
    question:
      'An electrician is deciding whether to trade as a sole trader or through a limited company. What is the key practical difference?',
    options: [
      'A limited company separates business and personal liability',
      'A sole trader cannot employ anybody or take on an apprentice',
      'A limited company is exempt from health and safety duties',
      'A sole trader is unable to register for value added tax',
    ],
    correctAnswer: 0,
    explanation:
      'A limited company is a separate legal person, so business debts and most claims sit against the company rather than against the owner personally, which is the main reason contractors incorporate. The idea that a sole trader cannot employ people is a common misunderstanding, because a sole trader can take on staff and apprentices and then carries full employer duties for them.',
    section: '7.7',
    difficulty: 'basic',
  },
  {
    id: 214,
    question:
      'Midway through a fixed price job a customer verbally asks for two extra sockets. What is the correct commercial practice?',
    options: [
      'Add them and mention the extra cost on the final invoice',
      'Refuse any change once the price has been agreed in writing',
      'Confirm the change and the revised price in writing first',
      'Add them free of charge to protect the customer relationship',
    ],
    correctAnswer: 2,
    explanation:
      'A variation should be recorded and priced before it is carried out, so that both sides agree what has changed and disputes at invoice stage are avoided. Adding the cost to the final invoice is the attractive answer because the work genuinely is extra, but a charge the customer never agreed to in advance is the single most common cause of payment disputes on small works.',
    section: '7.5',
    difficulty: 'intermediate',
  },
  {
    id: 215,
    question:
      'A client insists a distribution board is changed live because the shop cannot lose trading hours. The electrician judges that safe isolation is entirely practicable. What governs the decision?',
    options: [
      'The client instruction, since the client pays for the works',
      'The contract programme, since delay costs are the priority',
      'The scheme rules, since registration overrides safety law',
      'The legal duty, since live work needs isolation to be unreasonable',
    ],
    correctAnswer: 3,
    explanation:
      'Electrical safety law prohibits work on or near live conductors unless it is unreasonable for them to be dead, it is reasonable for the work to proceed live, and suitable precautions have been taken. Commercial pressure is the attractive answer because lost trading is a genuine cost, but inconvenience to the client does not make isolation unreasonable and cannot satisfy that test.',
    section: '7.3',
    difficulty: 'intermediate',
  },
  {
    id: 216,
    question:
      'A homeowner asks why the installer of a new solar photovoltaic system needs to be certified under the microgeneration scheme. The accurate answer is that',
    options: [
      'the certification is the only way the work can be notified',
      'the certification proves the installer never makes any mistakes',
      'the certification is needed to access certain support schemes',
      'the certification removes the need for electrical testing on site',
    ],
    correctAnswer: 2,
    explanation:
      'Microgeneration certification is a product and installer standard that customers and funding bodies rely on, and access to certain support and incentive arrangements is conditional on the installation being certified. Treating it as the only notification route is wrong because building regulations notification is a separate matter handled through building control or a competent person scheme.',
    section: '7.4',
    difficulty: 'basic',
  },
  {
    id: 217,
    question:
      'A newly employed improver asks what the employer must give them setting out the job they have accepted. The correct answer is',
    options: [
      'a written statement setting out the main terms of employment',
      'a verbal summary given by the supervisor on the first site',
      'a copy of the health and safety policy and nothing further',
      'a trade union membership form that covers the terms of work',
    ],
    correctAnswer: 0,
    explanation:
      'Employees are entitled to a written statement of the main particulars of employment, covering matters such as pay, hours, holiday and place of work, so that the terms are not left to memory. The health and safety policy is a genuine document the employer may have to provide, but it addresses safety arrangements rather than the terms on which the person is employed.',
    section: '7.7',
    difficulty: 'basic',
  },
  {
    id: 218,
    question:
      'On a construction project, which duty holder is appointed to plan, manage and coordinate health and safety during the construction phase?',
    options: [
      'The principal designer appointed for the project',
      'The principal contractor appointed by the client',
      'The client who commissions the construction work',
      'The site electrician who holds the grading card',
    ],
    correctAnswer: 1,
    explanation:
      'The principal contractor is the duty holder responsible for planning, managing, monitoring and coordinating health and safety while the construction work is actually being carried out. The principal designer is the close distractor because the role sounds equivalent, but its focus is the pre construction phase, where design risk is identified and eliminated before work starts.',
    section: '7.1',
    difficulty: 'intermediate',
  },
  {
    id: 219,
    question:
      'An electrician registered for domestic work self certifies a full rewire. Which of these does that self certification NOT achieve?',
    options: [
      'Confirming the work complies with the wiring standard used',
      'Recording the notification with the local building authority',
      'Removing the duty to inspect and test the completed work',
      'Giving the customer written evidence of the completed works',
    ],
    correctAnswer: 2,
    explanation:
      'Self certification is a route for satisfying building regulations notification and issuing certification, but the inspection and testing that supports the declaration still has to be done in full. The notification option looks like the odd one out because building control was never contacted directly, yet the scheme reports the work to the authority on behalf of the member.',
    section: '7.4',
    difficulty: 'advanced',
  },
  {
    id: 220,
    question:
      'Which activity gives the strongest evidence of continuing professional development for an electrician?',
    options: [
      'Attending a structured update course on the current standard',
      'Working steadily on the same type of job for several years',
      'Buying a new set of test instruments for the company van',
      'Reading a manufacturer leaflet found in a consumer unit box',
    ],
    correctAnswer: 0,
    explanation:
      'Development means acquiring knowledge or skill that was not there before, and a structured course produces both new learning and a record that can be shown to an assessor or employer. Long experience is the attractive answer because it plainly builds skill, but repeating familiar work consolidates what is already known rather than closing gaps opened up by change.',
    section: '7.6',
    difficulty: 'intermediate',
  },
  {
    id: 221,
    question:
      'An apprentice employed by a subcontracting firm suffers a reportable injury while working on a main contractor site. Who carries the duty to make the statutory report?',
    options: [
      'The principal contractor who controls the site induction',
      'The client who owns the premises where the work took place',
      'The apprentice, who must report the injury personally',
      'The employer of the injured apprentice who was hurt',
    ],
    correctAnswer: 3,
    explanation:
      'Reporting duties for injuries, diseases and dangerous occurrences fall on employers, on the self employed and on those in control of premises, and for an injured employee the reporting duty belongs to that persons employer. The principal contractor is the attractive answer because the site is under their control, but control of the site does not transfer the employer reporting duty for their own staff.',
    section: '7.3',
    difficulty: 'advanced',
  },
  {
    id: 222,
    question:
      'A customer accepts a written quotation for a rewire and later argues the final bill is too high. Why does it matter that the document was a quotation and not an estimate?',
    options: [
      'A quotation is a fixed price offer that can be accepted',
      'A quotation is only a rough guide to the likely price',
      'A quotation can be changed freely once the work begins',
      'A quotation is legally required before any works start',
    ],
    correctAnswer: 0,
    explanation:
      'A quotation states a fixed price which, once accepted, forms part of the contract and cannot be raised unless the customer agrees a variation. Confusing it with an estimate is the classic error, because an estimate is a considered guide that can move as the job unfolds, and contractors who use the words interchangeably end up unable to justify their final figure.',
    section: '7.7',
    difficulty: 'intermediate',
  },
  {
    id: 223,
    question:
      'While fault finding, an electrician discovers a dangerous defect plainly left behind by a previous contractor. What is the correct first action?',
    options: [
      'Say nothing, as the defect is another firm responsibility',
      'Make it safe and inform the customer of what was found',
      'Remove the whole circuit before speaking to the customer',
      'Report the previous firm to the police as a criminal act',
    ],
    correctAnswer: 1,
    explanation:
      'Danger that is found has to be made safe and communicated to the person responsible for the installation, because knowledge of a hazard creates a duty to act on it. Staying silent because someone else caused it is the tempting response, but the duty attaches to the person who has found the danger, not only to whoever created it.',
    section: '7.5',
    difficulty: 'intermediate',
  },
  {
    id: 224,
    question:
      'During a periodic inspection an electrician finds a danger present and the customer refuses permission for any remedial work. What must the electrician do?',
    options: [
      'Complete the report and leave the danger for the customer',
      'Carry out the repair anyway without any customer agreement',
      'Record the danger and warn the responsible person at once',
      'Abandon the inspection and issue no documentation at all',
    ],
    correctAnswer: 2,
    explanation:
      'Where an immediate danger is identified, it must be recorded and the person responsible for the installation warned without delay, in writing as well as verbally, so that the risk is not left unknown. Carrying out repairs regardless is wrong because work needs the consent of the person who controls the installation, but consent being refused never excuses failing to warn.',
    section: '7.4',
    difficulty: 'intermediate',
  },
  {
    id: 225,
    question:
      'What best distinguishes a maintenance electrician from an installation electrician?',
    options: [
      'Works mainly on keeping existing systems running',
      'Works only on new build projects from first fix',
      'Works exclusively on design and specification tasks',
      'Works entirely on testing and certification duties',
    ],
    correctAnswer: 0,
    explanation:
      'Maintenance work centres on keeping installations and plant that already exist in service, through planned servicing, fault finding and repair. The new build option is the natural opposite and therefore attractive, but that describes the installation role, and many maintenance electricians also carry out small installation works as part of the job.',
    section: '7.1',
    difficulty: 'intermediate',
  },
  {
    id: 226,
    question:
      'An electrician with no experience of electric vehicle charging equipment is offered a charge point installation. What is the professional response?',
    options: [
      'Accept and learn from the manufacturer instructions on site',
      'Accept, because a charge point is only a radial circuit',
      'Decline all such work permanently as it is a specialism',
      'Get training first or work with someone already competent',
    ],
    correctAnswer: 3,
    explanation:
      'Competence means having the knowledge, skill and experience for the specific work, and the honest route into unfamiliar work is training or working alongside someone who already holds that competence. Treating a charge point as just a radial circuit is the seductive error, because the supply arrangement and protective measures involved go well beyond a standard final circuit.',
    section: '7.6',
    difficulty: 'basic',
  },
  {
    id: 227,
    question:
      'What is a continuing professional development record used for?',
    options: [
      'Proving how much a company earned in a trading year',
      'Showing what training and learning has been undertaken',
      'Listing the tools and instruments owned by a business',
      'Recording the hours worked on site during each week',
    ],
    correctAnswer: 1,
    explanation:
      'A development record is evidence of the learning a person has completed, which is what an employer, an assessor or a scheme assessment wants to see. The timesheet option is plausible because both are ongoing records kept over time, but hours worked show only that a person was present, not that their knowledge has moved on.',
    section: '7.6',
    difficulty: 'basic',
  },
  {
    id: 228,
    question:
      'A self employed electrician starts subcontracting to a builder with nothing at all agreed in writing. Which risk does that create above all others?',
    options: [
      'The work cannot be certified without a written contract',
      'Disputes over scope and payment become hard to resolve',
      'The electrician automatically becomes an employee at law',
      'Health and safety duties pass entirely to the builder firm',
    ],
    correctAnswer: 1,
    explanation:
      'Without written terms there is no agreed record of what was to be done or what was to be paid, so any later disagreement comes down to one word against another. The certification option is wrong because a certificate depends on the work and the testing rather than on the commercial paperwork, and it can be issued whatever the contract arrangements.',
    section: '7.7',
    difficulty: 'basic',
  },
  {
    id: 229,
    question:
      'An experienced electrician wants to move into training apprentices at a college. What normally has to be added to their trade background?',
    options: [
      'A teaching or assessing qualification and current knowledge',
      'A management qualification in construction site supervision',
      'Registration with a domestic competent person scheme body',
      'A further period of time served on large industrial sites',
    ],
    correctAnswer: 0,
    explanation:
      'Teaching and assessing are separate skills from doing the work, so the move into training normally means gaining a teaching or assessor qualification while keeping trade knowledge up to date. Scheme registration is the plausible wrong answer because it signals competence to customers, but it certifies installation work rather than any ability to teach or assess others.',
    section: '7.2',
    difficulty: 'basic',
  },
  {
    id: 230,
    question:
      'An electrical installation certificate carries separate declarations for design, construction, and inspection and testing. Why are the three kept separate?',
    options: [
      'Because three different people must always be involved',
      'Because each declaration covers a different responsibility',
      'Because the customer needs three copies of the document',
      'Because the scheme body signs one part of the document',
    ],
    correctAnswer: 1,
    explanation:
      'The three declarations exist because design, construction and verification are distinct responsibilities, and whoever signs each one is accepting responsibility for that part of the work. Assuming three people are always needed is the common misreading, since on a small job one competent person may properly sign all three, and the split is about accountability rather than headcount.',
    section: '7.3',
    difficulty: 'intermediate',
  },
  {
    id: 231,
    question:
      'A site electrician is issued with the correct protective clothing for the task but chooses not to wear it. In legal terms, who has failed in a duty?',
    options: [
      'The manufacturer, for supplying uncomfortable clothing',
      'Nobody, since wearing the clothing is a personal choice',
      'The employee, who must use safety equipment provided',
      'The employer alone, for not supervising every single task',
    ],
    correctAnswer: 2,
    explanation:
      'Employees are required by law to co-operate with their employer and to use safety equipment fully and correctly, so refusing to wear issued protection is a breach by the worker. Blaming the employer alone is attractive because employers do carry supervision duties, but the duty to provide and the duty to use sit on different people and both apply at once.',
    section: '7.3',
    difficulty: 'basic',
  },
  {
    id: 232,
    question:
      'A newly self employed electrician sets an hourly charge by simply copying the hourly pay received in the last employed job. What is wrong with that approach?',
    options: [
      'It ignores that customers, in general, expect a lower rate',
      'It ignores that employed rates, as paid, include profit',
      'It ignores materials, which must be charged separately',
      'It ignores overheads, holidays and unbilled time',
    ],
    correctAnswer: 3,
    explanation:
      'A charge out rate has to carry van costs, insurance, tools, training, quoting time and unpaid holidays as well as the earnings the person wants, so it is always well above an employed hourly wage. Forgetting materials is the plausible distractor, but materials are normally charged separately and the real gap is the cost of running the business itself.',
    section: '7.7',
    difficulty: 'basic',
  },
  {
    id: 233,
    question:
      'An apprentice has completed the college units and the workplace portfolio but has not yet taken the final practical assessment. What is their position?',
    options: [
      'They may be graded as a fully qualified electrician now',
      'They must restart the apprenticeship from the beginning',
      'They are not yet fully qualified until that assessment',
      'They can self certify domestic work in the meantime',
    ],
    correctAnswer: 2,
    explanation:
      'The final practical assessment is the point at which the apprentice demonstrates the whole of the trade under test conditions, so qualified status and the grading that follows it depend on passing it. Claiming full status early is the tempting answer because the coursework is finished, yet the portfolio evidences progress rather than replacing the independent assessment.',
    section: '7.2',
    difficulty: 'basic',
  },
  {
    id: 234,
    question:
      'An employer asks an electrician to sign the inspection and testing declaration for work carried out by somebody else, which the electrician has never seen. What should happen?',
    options: [
      'Sign it, as the employer carries the legal responsibility',
      'Sign it, provided the other person confirms it was tested',
      'Sign it, adding a note that the work was not witnessed',
      'Decline, as the signature confirms personal verification',
    ],
    correctAnswer: 3,
    explanation:
      'Signing the inspection and testing declaration is a personal statement that the signatory has verified the work, so signing for results someone else obtained is false certification whatever the employer says. Adding a caveat is the attractive compromise, but a note does not undo a declaration that the reader will rely on as evidence the installation was actually verified.',
    section: '7.3',
    difficulty: 'intermediate',
  },
  {
    id: 235,
    question:
      'What is the most effective way to explain an inspection outcome to a domestic customer with no technical background?',
    options: [
      'Read out the observation codes exactly as recorded',
      'Say in plain terms what is unsafe and what is needed',
      'Hand over the report and leave them to read it alone',
      'List every regulation number that has been breached',
    ],
    correctAnswer: 1,
    explanation:
      'The customer has to make a decision about spending money on remedial work, so the explanation must connect each finding to the risk it creates and the action it calls for. Quoting codes and regulation numbers feels rigorous and is often done, but it transfers no understanding and usually leaves the customer unable to judge what matters most.',
    section: '7.5',
    difficulty: 'intermediate',
  },
  {
    id: 236,
    question:
      'A new amendment to the wiring standard is published. What is the appropriate response for a practising electrician?',
    options: [
      'Wait until an employer arranges formal training on it',
      'Ignore it until existing installations require rewiring',
      'Obtain the amended standard and update working practice',
      'Keep using the previous edition until it is withdrawn',
    ],
    correctAnswer: 2,
    explanation:
      'New design work is expected to follow the current standard, so an electrician needs the amended document and needs to know what actually changed before the next job is designed or certified. Waiting for the employer to organise training is the passive answer many give, but responsibility for keeping personal competence current rests with the individual as well.',
    section: '7.6',
    difficulty: 'basic',
  },
  {
    id: 237,
    question:
      'An employer refuses to interview a suitably qualified applicant purely because of the age shown on the application. How should this be described?',
    options: [
      'Acceptable, as employers may choose whoever they wish',
      'Acceptable, provided the reason is not written anywhere',
      'A matter only for the trade union to raise internally',
      'Unlawful discrimination under equality legislation',
    ],
    correctAnswer: 3,
    explanation:
      'Age is a protected characteristic, so rejecting an applicant on that basis is unlawful discrimination regardless of how informally the decision was made. The idea that it is safe if nothing is written down is a widespread and dangerous belief, because a decision can be shown to be discriminatory from the pattern of behaviour and evidence given by witnesses.',
    section: '7.7',
    difficulty: 'basic',
  },
  {
    id: 238,
    question:
      'What is the clearest advantage of an apprenticeship route compared with a purely classroom based route into the trade?',
    options: [
      'Skills are built on real jobs alongside the underpinning theory',
      'It removes the need to sit any written examinations at all',
      'It guarantees a permanent job with the training employer',
      'It allows the learner to skip the practical assessments',
    ],
    correctAnswer: 0,
    explanation:
      'An apprenticeship pairs classroom theory with supervised work on live jobs, so the learner builds the practical judgement that employers and assessors are ultimately looking for. The guaranteed job option is attractive because many apprentices are kept on, but employment after training depends on the workload of the business and is never automatic.',
    section: '7.2',
    difficulty: 'intermediate',
  },
  {
    id: 239,
    question:
      'An electrician must leave a distribution board open in an occupied office while fetching parts from the van. What does that situation require?',
    options: [
      'Nothing, provided the job is finished before the day ends',
      'A verbal warning to the nearest member of office staff',
      'The board secured or a competent person left in attendance',
      'A written permit issued by the person managing the office',
    ],
    correctAnswer: 2,
    explanation:
      'Opened electrical equipment must not be left unattended: it is either secured against access or a competent person stays with it, because live parts may be exposed to people who cannot recognise the danger. A verbal warning is the tempting minimum, but a spoken caution to one person does not control access by everyone else who may walk past.',
    section: '7.3',
    difficulty: 'intermediate',
  },
  {
    id: 240,
    question:
      'Which of these is a role within the electrical industry rather than another construction trade or profession?',
    options: [
      'Structural engineer designing the building frame',
      'Quantity surveyor pricing the building materials',
      'Site joiner fitting the doors and the skirtings',
      'Approved electrician carrying out installations',
    ],
    correctAnswer: 3,
    explanation:
      'The approved electrician is an electrical industry role, working on the installation and its associated systems. The others are genuine construction roles and appear on the same sites, which is what makes them plausible, but their work sits with the structure, the commercial side or the joinery rather than the electrical installation.',
    section: '7.1',
    difficulty: 'basic',
  },
  {
    id: 241,
    question:
      'Which development has most expanded the range of work available to electricians in recent years?',
    options: [
      'Growth in renewable generation, storage and vehicle charging',
      'A general reduction, year on year, in homes being rewired',
      'The move from steel conduit, to plastic trunking, on sites',
      'The reduction, on most jobs, in test instruments needed',
    ],
    correctAnswer: 0,
    explanation:
      'Solar generation, battery storage, heat pumps and vehicle charging have created whole categories of installation, maintenance and certification work that did not exist at this scale before. The containment option describes a real change in materials, but changing what cables run in alters how a job is done rather than creating new markets to work in.',
    section: '7.1',
    difficulty: 'intermediate',
  },
  {
    id: 242,
    question:
      'Why does a written handover matter when an installation passes from one electrician to another part way through?',
    options: [
      'It proves who should be paid, hour by hour, on the job',
      'It records what is complete, tested and still isolated',
      'It replaces certification, at the point of handover',
      'It allows the second electrician, on arrival, to reprice',
    ],
    correctAnswer: 1,
    explanation:
      'The incoming electrician has to know what has been finished, what has already been tested and what is left isolated or incomplete, because assumptions at handover are where dangerous mistakes are made. The payment answer is plausible since handovers often coincide with timesheets, but the safety information is what protects both workers and the installation.',
    section: '7.5',
    difficulty: 'intermediate',
  },
  {
    id: 243,
    question:
      'What is the practical difference between joining a trade association and registering with a competent person scheme?',
    options: [
      'A trade association assesses the work, a scheme does not',
      'A competent person scheme, like an association, is marketing',
      'A scheme assesses the work, an association gives support',
      'A trade association, not the scheme, notifies building control',
    ],
    correctAnswer: 2,
    explanation:
      'A competent person scheme carries out technical assessment against defined criteria and is the route to self certifying notifiable work, whereas a trade association mainly offers representation, guidance and business support. Both display a logo on a van, which is exactly why customers and candidates confuse them, but only one involves the work itself being assessed.',
    section: '7.4',
    difficulty: 'intermediate',
  },
  {
    id: 244,
    question:
      'Why must a self employed electrician keep proper records of income and expenditure?',
    options: [
      'To satisfy the customer that the price charged was fair',
      'To prove to a scheme body that testing was carried out',
      'To let a wholesaler decide what credit limit to allow',
      'To report earnings correctly and claim allowable costs',
    ],
    correctAnswer: 3,
    explanation:
      'Accurate records are what a tax return is built from, and without them genuine business costs cannot be claimed and declared profit cannot be defended if it is questioned. Wholesale credit is a real use for accounts, but a supplier reference is a by-product of good records rather than the reason the law requires them to be kept.',
    section: '7.7',
    difficulty: 'intermediate',
  },
  {
    id: 245,
    question:
      'An apprentice is told by a supervisor to work alone inside an energised control panel. What should the apprentice do?',
    options: [
      'Refuse and raise it, as the instruction creates danger',
      'Carry it out, since a supervisor gave the instruction',
      'Do it, but ask a colleague to watch from a distance',
      'Do it, then record the concern in the site diary later',
    ],
    correctAnswer: 0,
    explanation:
      'An instruction does not make unsafe work lawful, and an apprentice working alone on live equipment fails both the live working test and the requirement for adequate supervision of someone still training. Having a colleague watch is the tempting halfway house, because accompaniment sounds safer, but it does not address the fact that the work should be done dead.',
    section: '7.3',
    difficulty: 'basic',
  },
  {
    id: 246,
    question:
      'An electrician attends manufacturer training on a new range of protective devices. How does that contribute to competence?',
    options: [
      'It removes the need to read the wiring standard itself',
      'It gives product knowledge that supports correct use',
      'It certifies the electrician to install any brand at all',
      'It replaces the need for inspection and testing skills',
    ],
    correctAnswer: 1,
    explanation:
      'Manufacturer training gives the detailed product knowledge, such as installation limits and settings, that general standards cannot supply for every device on the market. Treating it as a substitute for the standard is the common error, because the standard sets the requirements the device has to satisfy while the training explains how that particular product meets them.',
    section: '7.6',
    difficulty: 'intermediate',
  },
  {
    id: 247,
    question:
      'An employed electrician believes they have been disciplined unfairly by a supervisor. What is the appropriate first step?',
    options: [
      'Leave the job immediately and look for other work',
      'Contact the enforcing authority to inspect the site',
      'Raise it through the employer grievance procedure',
      'Refuse further instructions until it is put right',
    ],
    correctAnswer: 2,
    explanation:
      'Grievance procedures exist so that a complaint is put in writing, investigated and answered inside the business, and using them first is expected before any external step is taken. Resigning on the spot is the emotional response, but leaving voluntarily weakens any later claim and removes the chance for the matter to be corrected internally.',
    section: '7.7',
    difficulty: 'basic',
  },
  {
    id: 248,
    question:
      'What does an estimator do within an electrical contracting business?',
    options: [
      'Prices work from drawings and specifications before tender',
      'Tests completed installations and issues certification',
      'Supervises the site labour and orders the site materials',
      'Designs the protective device settings for each circuit',
    ],
    correctAnswer: 0,
    explanation:
      'The estimator works out the labour, materials and preliminaries needed from the drawings and specification so that the business can submit a price it can afford to honour. The supervision answer is attractive because both roles think about resources, but supervision manages work already won rather than pricing work the company is bidding for.',
    section: '7.1',
    difficulty: 'intermediate',
  },
  {
    id: 249,
    question:
      'A contractor registered under a scheme covering domestic work advertises that all work of every kind is approved and certified. Why can that claim mislead?',
    options: [
      'Because certification is never issued for domestic work',
      'Because approval covers only the tools that are in use',
      'Because a registration can never be advertised at all',
      'Because registration covers a defined scope of work',
    ],
    correctAnswer: 3,
    explanation:
      'Registration is granted against the categories of work that were assessed, so advertising it as blanket approval for everything the business does overstates what the assessment covered. Saying registration cannot be advertised is wrong, because schemes actively encourage members to display their status, provided the claim reflects the scope actually held.',
    section: '7.4',
    difficulty: 'intermediate',
  },
  {
    id: 250,
    question:
      'Why should an electrician confirm cable route positions with the other trades before first fix begins?',
    options: [
      'To make sure the builder, not the electrician, pays for waste',
      'To avoid clashes with pipework, ducts and structural parts',
      'To decide who signs the installation certificate, at the end',
      'To agree which trade, of those on site, does the paperwork',
    ],
    correctAnswer: 1,
    explanation:
      'Routes agreed in advance prevent cables being run where pipework, ductwork or structural members will later need the same space, which is what causes rework and unauthorised notching of timbers. Arguing about wasted materials afterwards is the reactive answer, but coordination before first fix avoids the cost and the programme delay entirely.',
    section: '7.5',
    difficulty: 'intermediate',
  },
  {
    id: 251,
    question: 'What is a curriculum vitae used for when applying for electrical work?',
    options: [
      'To set out your experience and qualifications',
      'To confirm your identity and right to work',
      'To record the training your employer funded',
      'To prove the work you claim to have done',
    ],
    correctAnswer: 0,
    explanation: 'A CV presents your background so an employer can judge whether to interview you. Proving the work you carried out is the tempting answer, but that is what a portfolio of evidence signed off by an assessor does; a CV only states a claim.',
    section: '7.4',
    difficulty: 'basic',
  },
  {
    id: 252,
    question: 'What does a job description tell an applicant?',
    options: [
      'The qualifications the employer expects',
      'The duties the post holder will carry out',
      'The rate of pay for the industry grade',
      'The hours and holiday that are offered',
    ],
    correctAnswer: 1,
    explanation: 'A job description sets out what the role involves day to day. The qualifications expected are the tempting answer, but those appear in the person specification, which is a separate document written alongside it.',
    section: '7.4',
    difficulty: 'basic',
  },
  {
    id: 253,
    question: 'What is the purpose of writing a goal in the SMART form?',
    options: [
      'So it can be added to a training record',
      'So it can be agreed with your employer',
      'So progress towards it can be checked',
      'So it can be achieved without any support',
    ],
    correctAnswer: 2,
    explanation: 'Writing a goal so it is specific, measurable, achievable, relevant and time bound means you can tell whether you are on track. Agreeing it with an employer is the tempting answer because that often happens, but a goal can be SMART whether or not anyone else sees it.',
    section: '7.4',
    difficulty: 'basic',
  },
  {
    id: 254,
    question: 'What does registration with a competent person scheme allow a business to do?',
    options: [
      'Employ apprentices without a training agreement',
      'Carry out electrical work in domestic premises lawfully',
      'Issue installation certificates for its completed work',
      'Self-certify that work meets the Building Regulations',
    ],
    correctAnswer: 3,
    explanation: 'Registration lets a business certify its own notifiable work as compliant with the Building Regulations and notify the local authority through the scheme. Being allowed to work in domestic premises is the tempting answer, but anyone competent may do the work; registration changes only how compliance is notified and certified.',
    section: '7.6',
    difficulty: 'basic',
  },
  {
    id: 255,
    question: 'What is a portfolio of evidence built up during an apprenticeship?',
    options: [
      'A record of real work with proof it was done',
      'A summary of the units passed at the college',
      'A logbook of the hours spent on each site',
      'A collection of manufacturer training records',
    ],
    correctAnswer: 0,
    explanation: 'The portfolio gathers evidence of workplace tasks actually performed, witnessed and signed off, which is what an assessor judges. A summary of college units is the tempting answer, but those are recorded on certificates and prove classroom achievement rather than site competence.',
    section: '7.3',
    difficulty: 'basic',
  },
  {
    id: 256,
    question: 'Which of these is a short-term goal for a second-year apprentice?',
    options: [
      'Become a qualified electrician within four years',
      'Complete the inspection unit by the end of term',
      'Run an electrical contracting business one day',
      'Move into design work later in their career',
    ],
    correctAnswer: 1,
    explanation: 'A short-term goal has a near deadline and a definite finishing point, which the term-end unit has. Qualifying within four years is the tempting answer because it has a timescale, but a multi-year target is a long-term goal that short-term goals build towards.',
    section: '7.4',
    difficulty: 'basic',
  },
  {
    id: 257,
    question: 'What is a reference from a previous employer used for?',
    options: [
      'To prove the applicant holds a current ECS card',
      'To describe the duties of the post being applied for',
      'To confirm the applicant\'s record of employment',
      'To set out the pay the applicant last received',
    ],
    correctAnswer: 2,
    explanation: 'A reference lets a new employer confirm that what the applicant says about their previous work is accurate. Proving an ECS card is the tempting answer, but a card is checked directly against the issuing register rather than through a referee.',
    section: '7.4',
    difficulty: 'basic',
  },
  {
    id: 258,
    question: 'Which source gives independent information on routes into the electrical trade?',
    options: [
      'A manufacturer\'s approval scheme',
      'A recruitment advert for a vacancy',
      'A wholesaler\'s training catalogue',
      'The National Careers Service',
    ],
    correctAnswer: 3,
    explanation: 'The National Careers Service publishes route, entry requirement and pay information across occupations without an interest in the outcome. A single recruitment advert is the tempting answer because it is about a real job, but it describes one employer\'s vacancy rather than the routes available.',
    section: '7.4',
    difficulty: 'basic',
  },
  {
    id: 259,
    question: 'An applicant wants to know exactly what an employer expects of the person appointed. Which document should they read?',
    options: [
      'The person specification',
      'The job description',
      'The contract of employment',
      'The company training policy',
    ],
    correctAnswer: 0,
    explanation: 'The person specification lists the qualifications, experience and attributes the employer is looking for, and it is what the shortlisting is done against. The job description is the tempting answer because it comes in the same pack, but it describes the work rather than the person.',
    section: '7.4',
    difficulty: 'intermediate',
  },
  {
    id: 260,
    question: 'Which source shows an apprentice which electrical roles are in demand in their region?',
    options: [
      'The vacancy list on one firm\'s website',
      'Labour market information for the area',
      'The college\'s course list for the year',
      'The industry pay rates published',
    ],
    correctAnswer: 1,
    explanation: 'Labour market information reports what employers in an area are recruiting for and where shortages sit, which is what the question asks. Published pay rates are the tempting answer because they look like market data, but a rate tells you what a job pays, not whether anyone is hiring.',
    section: '7.4',
    difficulty: 'intermediate',
  },
  {
    id: 261,
    question: 'Which of these areas of building services work runs a competent person scheme?',
    options: [
      'Removal of asbestos containing materials',
      'Erection of scaffolding on a construction site',
      'Installation of heating and hot water systems',
      'Operation of a mobile elevating work platform',
    ],
    correctAnswer: 2,
    explanation: 'Schemes exist for the building work covered by the Building Regulations, which includes heating and hot water, gas, oil firing, solid fuel, ventilation, microgeneration, plumbing, glazing and electrical work. Asbestos removal is the tempting answer because it is also tightly controlled, but it is licensed under separate health and safety law rather than certified under a scheme.',
    section: '7.6',
    difficulty: 'intermediate',
  },
  {
    id: 262,
    question: 'Who holds the registration when a contracting business joins a competent person scheme?',
    options: [
      'The apprentice, once they have completed training',
      'Each electrician, individually, that the business employs',
      'The individual, whoever signs the certificates',
      'The business, with a named qualified supervisor',
    ],
    correctAnswer: 3,
    explanation: 'It is the enterprise that is registered, and the scheme requires it to have a nominated qualified supervisor with the technical competence to stand behind the work. Assuming each electrician is registered is the tempting error, because the card an individual carries is a grading, not a scheme registration.',
    section: '7.6',
    difficulty: 'intermediate',
  },
  {
    id: 263,
    question: 'What does a scheme assessor examine when a registered business is reassessed?',
    options: [
      'A sample of recent work with its records',
      'The bank statements for the last year',
      'The pay rates offered to each operative',
      'The marketing material it publishes',
    ],
    correctAnswer: 0,
    explanation: 'Reassessment looks at completed jobs, the certification issued for them and the test instruments and records behind them. Checking pay rates is the tempting answer because employment matters do get audited elsewhere, but a scheme assesses technical compliance, not wages.',
    section: '7.6',
    difficulty: 'intermediate',
  },
  {
    id: 264,
    question: 'An apprentice writes the goal \'get better at inspection and testing\'. What is missing from it?',
    options: [
      'A reason for wanting to improve at it',
      'A measure and a date to reach it by',
      'The agreement of their line supervisor',
      'The cost of the training that it needs',
    ],
    correctAnswer: 1,
    explanation: 'Without something to measure and a deadline there is no way to tell whether the goal has been met, which is what makes it unusable. The supervisor\'s agreement is the tempting answer because goals are often agreed at review, but agreement does not make a vague goal any more checkable.',
    section: '7.4',
    difficulty: 'intermediate',
  },
  {
    id: 265,
    question: 'Why is a long-term career goal normally broken into smaller steps?',
    options: [
      'Each step must be funded by an employer',
      'Each step earns a separate qualification',
      'Each step can be reviewed and adjusted',
      'Each step removes the need for a deadline',
    ],
    correctAnswer: 2,
    explanation: 'Breaking the goal down gives points where progress can be judged and the plan changed before time is wasted. Assuming each step earns a qualification is the tempting error, because many useful steps are experience or responsibility rather than a certificate.',
    section: '7.4',
    difficulty: 'intermediate',
  },
  {
    id: 266,
    question: 'What is the difference between an apprenticeship agreement and a training plan?',
    options: [
      'One applies at college, one applies on site',
      'One is signed by the college, one by the firm',
      'One covers pay, the other covers holiday',
      'One is the employment terms, one the programme',
    ],
    correctAnswer: 3,
    explanation: 'The agreement sets out the employment relationship for the apprenticeship, while the training plan sets out what will be learned, where and when. Dividing them by who signs is the tempting answer, because the employer, apprentice and provider are all party to the arrangements.',
    section: '7.3',
    difficulty: 'intermediate',
  },
  {
    id: 267,
    question: 'An electrician wants to progress towards design work. Which step serves that aim most directly?',
    options: [
      'Study installation design and verification',
      'Sit another inspection and testing course',
      'Take a supervisory qualification',
      'Attend a manufacturer\'s training day',
    ],
    correctAnswer: 0,
    explanation: 'Design work turns on calculating and specifying installations, which is what the design and verification study covers. Further inspection and testing study is the tempting answer because it is the usual next step after qualifying, but it develops the ability to report on installations rather than to design them.',
    section: '7.4',
    difficulty: 'intermediate',
  },
  {
    id: 268,
    question: 'What does a covering letter add to an application that a CV does not?',
    options: [
      'A full history of the applicant\'s employment',
      'Why this applicant suits this particular role',
      'A list of the qualifications the applicant holds',
      'The names of two referees the employer may ask',
    ],
    correctAnswer: 1,
    explanation: 'The covering letter connects the applicant\'s background to the specific vacancy, which a general CV cannot do. Listing qualifications is the tempting answer because letters often mention them, but repeating the CV is exactly what a covering letter should avoid.',
    section: '7.4',
    difficulty: 'intermediate',
  },
  {
    id: 269,
    question: 'Why do many employers insist on their own application form rather than a CV?',
    options: [
      'It proves the applicant\'s qualifications are real',
      'It removes the need to hold an interview',
      'Every applicant answers the same questions',
      'It commits the applicant to the terms offered',
    ],
    correctAnswer: 2,
    explanation: 'A common form lets an employer compare applicants against the same information rather than against differently structured CVs. Assuming it proves qualifications is the tempting error, because the form is still the applicant\'s own statement until certificates are checked.',
    section: '7.4',
    difficulty: 'intermediate',
  },
  {
    id: 270,
    question: 'An apprentice asks who decides what work they are given each day on a large site.',
    options: [
      'The client\'s representative on site',
      'The main contractor\'s site manager on the job',
      'The college assessor when they visit',
      'The electrical supervisor for their employer',
    ],
    correctAnswer: 3,
    explanation: 'The apprentice takes their instructions through their own employer\'s supervisory line, which is who is answerable for their work and their training. The main contractor\'s site manager is the tempting answer because they run the site, but they coordinate trades rather than direct another firm\'s apprentice.',
    section: '7.1',
    difficulty: 'intermediate',
  },
  {
    id: 271,
    question: 'A learner has completed the classroom diploma but has never worked on site. Are they a qualified electrician?',
    options: [
      'No, workplace competence must also be evidenced',
      'Yes, the diploma is the trade qualification',
      'Yes, provided they hold a current ECS card',
      'No, unless they register with a scheme',
    ],
    correctAnswer: 0,
    explanation: 'The classroom diploma proves knowledge and workshop skill, but recognition as a qualified electrician also requires assessed competence on real work and the final practical assessment. Adding an ECS card is the tempting answer because a card looks like proof, but the card is issued on the strength of those achievements rather than instead of them.',
    section: '7.3',
    difficulty: 'basic',
  },
  {
    id: 272,
    question: 'A registered business loses the person named as its qualified supervisor. What is the immediate effect on the registration?',
    options: [
      'The registration lapses at the next renewal',
      'The scheme must be told and a replacement named',
      'The registration continues until work ends',
      'The scheme transfers the role to the owner',
    ],
    correctAnswer: 1,
    explanation: 'Registration rests on having a qualified supervisor in place, so the operator has to be notified and a suitable replacement identified rather than the business carrying on quietly. Waiting until renewal is the tempting answer because that is when paperwork is normally checked, but the condition is a continuing one.',
    section: '7.6',
    difficulty: 'intermediate',
  },
  {
    id: 273,
    question: 'A homeowner cannot produce a compliance certificate for a rewire when selling the house. What is the practical consequence?',
    options: [
      'The local authority will disconnect the supply',
      'The sale cannot legally proceed without one',
      'The buyer\'s solicitor will raise it pre-exchange',
      'The installer is required to buy the property back',
    ],
    correctAnswer: 2,
    explanation: 'Missing certification surfaces as a conveyancing enquiry, which usually leads to an indemnity policy, a retention or a demand for inspection before completion. Saying the sale cannot proceed is the tempting overstatement, because it is a commercial obstacle rather than a legal bar.',
    section: '7.6',
    difficulty: 'intermediate',
  },
  {
    id: 274,
    question: 'An experienced electrician wants professional registration as an engineering technician. How is that achieved?',
    options: [
      'Through an employer\'s internal grading committee',
      'By holding a level three qualification for five years',
      'By registering with a building regulations scheme',
      'Through a licensed institution against a standard',
    ],
    correctAnswer: 3,
    explanation: 'Professional registration is awarded by an institution licensed to assess candidates against the national competence standard, on evidence and interview. Assuming a qualification plus time is enough is the tempting error, because registration is assessed on demonstrated competence rather than on years served.',
    section: '7.6',
    difficulty: 'intermediate',
  },
  {
    id: 275,
    question: 'An electrician\'s stated goal is \'to be given more responsibility by my employer\'. Why is that a poor goal?',
    options: [
      'The outcome depends on someone else\'s decision',
      'The goal has no financial value attached to it',
      'The goal cannot be written in a development record',
      'The goal will not be recognised by the industry',
    ],
    correctAnswer: 0,
    explanation: 'A goal you cannot act on directly leaves you waiting rather than working, so it should be restated as something you control, such as taking on a named task or qualification. Saying it cannot be recorded is the tempting answer, but anything can be written down; the problem is that it cannot be achieved by your own effort.',
    section: '7.4',
    difficulty: 'basic',
  },
  {
    id: 276,
    question: 'Two apprentices set the same goal but only one achieves it. Which difference in how the goal was written most likely explains that?',
    options: [
      'One was written down and the other was spoken',
      'One had a deadline and a checkpoint set',
      'One goal was ambitious and the other was modest',
      'One was shared with a supervisor and one was not',
    ],
    correctAnswer: 1,
    explanation: 'A goal with a date and a point at which progress is reviewed forces action while there is still time to correct course. Writing it down rather than saying it is the tempting answer because recording helps, but a written goal with no deadline drifts just as easily as a spoken one.',
    section: '7.4',
    difficulty: 'basic',
  },
  {
    id: 277,
    question: 'An apprentice\'s long-term goal is to run their own contracting business. Which medium-term step supports it best?',
    options: [
      'Attend as many manufacturer training days as possible',
      'Buy a van and a full set of installation tools',
      'Take on estimating and job costing responsibility',
      'Change employer every year to widen experience',
    ],
    correctAnswer: 2,
    explanation: 'The skill that separates a working electrician from a business owner is pricing and controlling jobs, so learning it inside someone else\'s business is the natural bridge. Buying a van and tools is the tempting answer because it feels like starting up, but equipment does not teach anyone how to price work.',
    section: '7.4',
    difficulty: 'basic',
  },
  {
    id: 278,
    question: 'A career plan written two years ago no longer matches the work available. What should the electrician do with it?',
    options: [
      'Ask the employer to write a replacement plan for them',
      'Keep to the plan, since changing it wastes the effort',
      'Abandon planning and take whatever work is offered',
      'Review the goals and revise them against the market',
    ],
    correctAnswer: 3,
    explanation: 'A plan is a working document, and reviewing it against what employers are actually recruiting for is the step that keeps it useful. Asking the employer to write a new one is the tempting answer because employers do support development, but a career plan that belongs to someone else stops being a career plan.',
    section: '7.4',
    difficulty: 'basic',
  },
  {
    id: 279,
    question: 'Which document should an apprentice take to a progress review to show what they have achieved on site?',
    options: [
      'The portfolio with signed workplace evidence',
      'The certificates for the units passed at college',
      'The timesheets submitted to the employer',
      'The training plan agreed at the start of the year',
    ],
    correctAnswer: 0,
    explanation: 'The portfolio is the record of workplace tasks performed and witnessed, which is what a review of on-site progress turns on. The training plan is the tempting answer because it comes to every review, but it states what was intended rather than what has been achieved.',
    section: '7.3',
    difficulty: 'basic',
  },
  {
    id: 280,
    question: 'Which career step would suit an electrician whose stated aim is to stop working at height and on site?',
    options: [
      'Move into commissioning of building systems',
      'Move into estimating or technical support work',
      'Move into installing solar generation equipment',
      'Move into supervising apprentices on live sites',
    ],
    correctAnswer: 1,
    explanation: 'Estimating and technical support use the same knowledge from an office, which is what the stated aim requires. Supervision is the tempting answer because it sounds like a step up from tools, but a supervisor is still on site and often at height.',
    section: '7.4',
    difficulty: 'basic',
  },
  {
    id: 281,
    question: 'An electrician wants to specialise in periodic inspection of commercial premises. Which experience matters most to that aim?',
    options: [
      'Time spent supervising apprentices',
      'Time spent installing new distribution',
      'Time spent testing and reporting on systems',
      'Time spent estimating refurbishment work',
    ],
    correctAnswer: 2,
    explanation: 'Reporting on existing installations calls for judgement about what is found in service, which is built by doing exactly that work. Installation experience is the tempting answer because it teaches how systems are built, but knowing how something should be built is only half of judging what has degraded.',
    section: '7.4',
    difficulty: 'basic',
  },
  {
    id: 282,
    question: 'What is a personal statement on a job application used for?',
    options: [
      'To confirm the dates of previous employment',
      'To list every qualification ever gained',
      'To give contact details for two referees',
      'To say why you want the role and what you bring',
    ],
    correctAnswer: 3,
    explanation: 'The personal statement is where an applicant argues their case for this particular vacancy in their own words. Listing qualifications is the tempting answer because they often appear there, but the form already collects them and repeating them wastes the one section where you can persuade.',
    section: '7.4',
    difficulty: 'basic',
  },
  {
    id: 283,
    question: 'What is a career action plan?',
    options: [
      'A list of steps with dates towards a goal',
      'A summary of the roles held so far',
      'A record of the training an employer funds',
      'A statement of the pay expected each year',
    ],
    correctAnswer: 0,
    explanation: 'An action plan turns an intention into dated steps that can be worked through and reviewed. A summary of roles held is the tempting answer because it also describes a career, but it looks backwards rather than setting out what happens next.',
    section: '7.4',
    difficulty: 'basic',
  },
  {
    id: 284,
    question: 'What does the certificate issued through a competent person scheme state?',
    options: [
      'That the installation meets the wiring standard',
      'That the work complies with the Building Regulations',
      'That the installer holds a current grading card',
      'That the business carries insurance cover',
    ],
    correctAnswer: 1,
    explanation: 'The scheme certificate is the notification that the notifiable work meets the Building Regulations, which is why a copy reaches the local authority. Compliance with the wiring standard is the tempting answer because both documents often arrive together, but that declaration belongs on the electrical installation certificate.',
    section: '7.6',
    difficulty: 'intermediate',
  },
  {
    id: 285,
    question: 'When is the local authority told about notifiable work carried out by a registered business?',
    options: [
      'At the design stage, by the customer\'s agent',
      'Before work starts, by the business directly',
      'After completion, through the scheme',
      'Never, unless the customer asks for confirmation',
    ],
    correctAnswer: 2,
    explanation: 'A registered business certifies its own work and the scheme passes the notification to the authority after the job, which is the whole convenience of registration. Notifying before work starts is the tempting answer because that is exactly what an unregistered installer must do.',
    section: '7.6',
    difficulty: 'intermediate',
  },
  {
    id: 286,
    question: 'A ventilation installer asks whether they can certify their own work under a scheme. What is the answer?',
    options: [
      'Yes, but only in a new dwelling',
      'No, only gas and electrical have schemes',
      'No, ventilation is outside the rules',
      'Yes, ventilation work has its own scheme',
    ],
    correctAnswer: 3,
    explanation: 'Schemes cover a spread of building services work including ventilation, heating and hot water, oil firing, solid fuel, plumbing, microgeneration and glazing, not only electrical and gas. Restricting them to electrical and gas is the tempting answer because those are the two most people have heard of.',
    section: '7.6',
    difficulty: 'intermediate',
  },
  {
    id: 287,
    question: 'Why does a scheme want to see calibration records for a member\'s test instruments?',
    options: [
      'Results are only as reliable as the instrument',
      'Instruments must be replaced at fixed intervals',
      'Calibration proves the operative is competent',
      'Records are needed for the insurance renewal',
    ],
    correctAnswer: 0,
    explanation: 'A certificate rests on measured values, so an instrument reading outside its stated accuracy makes the whole record worthless. Saying calibration proves competence is the tempting answer because both are checked at assessment, but a calibrated instrument in untrained hands proves nothing.',
    section: '7.6',
    difficulty: 'intermediate',
  },
  {
    id: 288,
    question: 'An apprentice is choosing optional units. What should guide the choice most strongly?',
    options: [
      'The units their friends in the group have picked',
      'The work their employer actually carries out',
      'The units with the smallest amount of coursework',
      'The tutor\'s opinion of which unit is most useful',
    ],
    correctAnswer: 1,
    explanation: 'Optional units are only worth taking if the apprentice can practise the content on real jobs and gather evidence for it. The tutor\'s opinion is the tempting answer because it is expert, but a tutor cannot know what work is coming through a particular employer.',
    section: '7.4',
    difficulty: 'intermediate',
  },
  {
    id: 289,
    question: 'A person specification lists an inspection qualification as desirable rather than essential. What does that mean for an applicant without it?',
    options: [
      'They must obtain it before the interview date',
      'They will be rejected before the shortlisting stage',
      'They can still apply and may still be shortlisted',
      'They should apply for a lower graded post instead',
    ],
    correctAnswer: 2,
    explanation: 'Essential requirements screen applicants out; desirable ones separate the shortlisted candidates from each other. Assuming rejection is the tempting error, and it stops good applicants from applying for roles they could get.',
    section: '7.4',
    difficulty: 'intermediate',
  },
  {
    id: 290,
    question: 'Which evidence at interview best shows that an applicant has worked without supervision?',
    options: [
      'A list of the sites they attended',
      'A reference calling them reliable',
      'Certificates for the college units',
      'Signed workplace records naming them',
    ],
    correctAnswer: 3,
    explanation: 'Records that name the applicant as the person responsible for a task tie the claim to identifiable work. A reference describing them as reliable is the tempting answer because it comes from an employer, but a general character comment evidences nothing specific.',
    section: '7.3',
    difficulty: 'intermediate',
  },
  {
    id: 291,
    question: 'Why does an electrician keep a dated record of training completed each year?',
    options: [
      'It evidences competence when it is questioned',
      'It entitles them to a higher rate of pay',
      'It replaces the need to retake any assessment',
      'It is required before any job can be certified',
    ],
    correctAnswer: 0,
    explanation: 'When competence is challenged, whether by a scheme, an employer or a client, a dated record of what was learned is the evidence that answers it. Linking it to pay is the tempting answer because development often precedes progression, but the record itself carries no pay entitlement.',
    section: '7.5',
    difficulty: 'intermediate',
  },
  {
    id: 292,
    question: 'A registered business subcontracts a notifiable job to an electrician who is not registered. Who may certify the work?',
    options: [
      'The subcontractor, since they carried out the work',
      'The registered business, if it controlled the work',
      'Either party, provided the customer is told which',
      'Neither, so building control must be notified first',
    ],
    correctAnswer: 1,
    explanation: 'A registration reaches work carried out under the registered business\'s own supervision and control, so it can certify a subcontracted job it genuinely managed. Letting the subcontractor certify is the tempting answer because they did the work, but they hold no registration to certify under.',
    section: '7.6',
    difficulty: 'advanced',
  },
  {
    id: 293,
    question: 'A consumer unit was replaced in a dwelling and never notified to anyone. What power does the local authority have?',
    options: [
      'It can disconnect the property supply',
      'It can prosecute the householder',
      'It can require the work to be put right',
      'It can order the installer to refund',
    ],
    correctAnswer: 2,
    explanation: 'Where notifiable work has gone through unnotified, the authority can require alteration or removal so that the work complies. Disconnection is the tempting answer because it sounds like the strongest sanction, but supply disconnection is a matter for the network operator on safety grounds.',
    section: '7.6',
    difficulty: 'intermediate',
  },
  {
    id: 294,
    question: 'A scheme suspends a member while it investigates a complaint. What can the member no longer do?',
    options: [
      'Hold an industry grading card meanwhile',
      'Carry out any electrical work for customers',
      'Employ apprentices while suspended',
      'Certify notifiable work through the scheme',
    ],
    correctAnswer: 3,
    explanation: 'Suspension removes the ability to self-certify, so notifiable jobs have to go to building control in the ordinary way until it is lifted. Assuming all work must stop is the tempting error, because the suspension affects certification rather than the right to trade.',
    section: '7.6',
    difficulty: 'advanced',
  },
  {
    id: 295,
    question: 'A business registered for domestic work is asked to quote for industrial installation. What must it do first?',
    options: [
      'Check whether its registration covers it',
      'Notify the customer that it will not be certifying',
      'Apply to a second scheme for the same category',
      'Ask the customer to notify building control instead',
    ],
    correctAnswer: 0,
    explanation: 'Registrations are granted category by category, so the first step is to establish whether the work sits inside the one held and, if not, apply to extend it. Applying to a second operator is the tempting answer because more registrations sound safer, but the extension is made through the existing operator.',
    section: '7.6',
    difficulty: 'intermediate',
  },
  {
    id: 296,
    question: 'Which condition must a registered business keep meeting between assessment visits?',
    options: [
      'Completing a set number of notifiable jobs a year',
      'Holding a qualified supervisor and current cover',
      'Employing at least two graded electricians',
      'Submitting every certificate for scheme approval',
    ],
    correctAnswer: 1,
    explanation: 'Registration depends on continuing conditions, principally having a qualified supervisor in post and maintaining insurance and calibrated instruments, not just on passing the visit. Submitting every certificate for approval is the tempting answer because schemes do sample them, but sampling is not prior approval.',
    section: '7.6',
    difficulty: 'intermediate',
  },
  {
    id: 297,
    question: 'A customer compares two contractors registered with different scheme operators. What actually differs for the customer?',
    options: [
      'The regulations, under which each certificate is issued',
      'The standard, against which the work is assessed',
      'The operator, not the compliance route itself',
      'The categories of work, and the depth of assessment',
    ],
    correctAnswer: 2,
    explanation: 'All operators certify against the same Building Regulations requirement, so the choice of operator does not change what the customer receives in compliance terms. Assuming the standard differs is the tempting error that scheme marketing can encourage.',
    section: '7.6',
    difficulty: 'intermediate',
  },
  {
    id: 298,
    question: 'The only microgeneration certified installer in a small firm resigns. What is the effect on future solar installations?',
    options: [
      'The certification transfers to the owner',
      'Existing customers lose export payments',
      'The firm must stop all electrical work',
      'The firm cannot offer certified installation',
    ],
    correctAnswer: 3,
    explanation: 'Certification rests on the firm holding the assessed competence, so without it new work cannot be offered as certified and customers cannot access export payments or grant funding for it. Existing customers losing payments is the tempting answer, but their installations were certified when they were completed.',
    section: '7.6',
    difficulty: 'intermediate',
  },
  {
    id: 299,
    question: 'What does a scheme expect of the qualified supervisor in a business that carries out periodic inspection?',
    options: [
      'Competence in inspection and reporting',
      'A management qualification at level four',
      'Ten years of continuous trade experience',
      'Membership of a professional institution',
    ],
    correctAnswer: 0,
    explanation: 'The supervisor has to be technically competent in the work the registration covers, which for periodic inspection means inspecting, testing and coding what is found. A management qualification is the tempting answer because the title contains the word supervisor, but the role is technical rather than managerial.',
    section: '7.6',
    difficulty: 'basic',
  },
  {
    id: 300,
    question: 'A customer asks whether scheme registration means their installation is guaranteed. What is the accurate answer?',
    options: [
      'Registration guarantees the work; six years minimum',
      'Registration certifies compliance; cover varies',
      'Registration transfers liability; the operator carries it',
      'Registration replaces insurance; no cover needed',
    ],
    correctAnswer: 1,
    explanation: 'The registration is about certifying compliance; any workmanship warranty is a separate benefit that differs between operators and has its own conditions. Assuming a fixed guarantee period is the tempting answer because warranties are heavily advertised, but they are not what registration itself provides.',
    section: '7.6',
    difficulty: 'intermediate',
  },
  {
    id: 301,
    question: 'An apprentice finds the work they are given no longer matches their training plan. Who should they raise it with first?',
    options: [
      'The main contractor running the site they are on',
      'The awarding body that issues the qualification',
      'Their employer\'s training contact for the programme',
      'The scheme operator their employer is registered with',
    ],
    correctAnswer: 2,
    explanation: 'The employer and the training provider own the plan between them, so the employer\'s training contact is the person who can change what work the apprentice is given. Going to the awarding body is the tempting answer because they own the qualification, but they have no say in what an employer allocates.',
    section: '7.3',
    difficulty: 'basic',
  },
  {
    id: 302,
    question: 'Which source best indicates whether a specialism will provide steady work in an area?',
    options: [
      'The pay rate quoted in a single job advert',
      'A manufacturer\'s sales literature for the equipment',
      'The number of training courses being advertised',
      'Regional labour market and vacancy information',
    ],
    correctAnswer: 3,
    explanation: 'Vacancy and skills shortage data show what employers are actually recruiting for over time, which is the question being asked. Course availability is the tempting answer because training providers respond to demand, but courses are also created ahead of demand that never arrives.',
    section: '7.4',
    difficulty: 'basic',
  },
  {
    id: 303,
    question: 'Why does an employer take up references as well as reading a CV?',
    options: [
      'A reference tests the claims independently',
      'A reference sets out the role\'s duties',
      'A reference records their training needs',
      'A reference confirms their card is valid',
    ],
    correctAnswer: 0,
    explanation: 'Everything on a CV is the applicant\'s own account, and a referee is the first independent check on it. Confirming the card is the tempting answer because employers do verify cards, but that is done against the issuing register rather than through a referee.',
    section: '7.4',
    difficulty: 'basic',
  },
  {
    id: 304,
    question: 'An apprentice sets five career goals all falling due in the same month. What is the flaw in that plan?',
    options: [
      'The goals, as written, cannot be measured at all',
      'Nothing is sequenced, so all five compete',
      'The goals, being five, cannot sit in one document',
      'The employer, in any case, will not fund all five',
    ],
    correctAnswer: 1,
    explanation: 'Goals that all mature together leave no order of work and no capacity to complete any of them properly, so a plan needs staging as well as deadlines. Saying they are not measurable is the tempting answer, but each one may be perfectly measurable on its own.',
    section: '7.4',
    difficulty: 'basic',
  },
  {
    id: 305,
    question: 'An electrician aiming for industrial control work books a course on domestic heating controls. Which part of the goal has failed?',
    options: [
      'Its achievability within the time allowed',
      'Its measurability against a clear outcome',
      'Its relevance to the route being followed',
      'Its specificity about what will be learned',
    ],
    correctAnswer: 2,
    explanation: 'The course may be specific, measurable, achievable and timed, and still take the electrician away from where they said they were going. Measurability is the tempting answer because it is the element people check first, but nothing about the measurement is at fault here.',
    section: '7.4',
    difficulty: 'basic',
  },
  {
    id: 306,
    question: 'An electrician reaches a goal they set twelve months ago. What should happen next?',
    options: [
      'Remove it from the plan and start again',
      'Repeat the same goal for the following year',
      'Wait for the employer to propose a new goal',
      'Record it and set the next step',
    ],
    correctAnswer: 3,
    explanation: 'A completed goal is both evidence of development and the point from which the next step is set, so it is recorded and built on. Waiting for the employer is the tempting answer because reviews are often employer led, but the plan belongs to the individual.',
    section: '7.4',
    difficulty: 'basic',
  },
  {
    id: 307,
    question: 'A goal reads \'improve my fault finding by December\'. Which element is still missing?',
    options: [
      'A way of telling whether it is met',
      'A date by which it should be achieved',
      'A reason for choosing that area of work',
      'A link to the electrician\'s current role',
    ],
    correctAnswer: 0,
    explanation: 'There is a deadline but nothing to measure against, so in December nobody can say whether the goal was reached. The missing date is the tempting answer because that is the usual fault, but a date is present here.',
    section: '7.4',
    difficulty: 'basic',
  },
  {
    id: 308,
    question: 'A dispute arises on site over the value of a variation. Which role values it?',
    options: [
      'The estimator who priced the tender',
      'The quantity surveyor for the job',
      'The site supervisor who ordered it',
      'The contracts manager for the region',
    ],
    correctAnswer: 1,
    explanation: 'Valuing varied work against the contract is the quantity surveyor\'s function, which is why they hold the measured record. The estimator is the tempting answer because they set the original prices, but their work finished when the tender was submitted.',
    section: '7.1',
    difficulty: 'intermediate',
  },
  {
    id: 309,
    question: 'Which progression route suits an electrician who wants to influence what is installed before it is built?',
    options: [
      'Site supervision of installation teams',
      'Commissioning of completed installations',
      'Design and consultancy work on projects',
      'Periodic inspection of existing systems',
    ],
    correctAnswer: 2,
    explanation: 'Design and consultancy decide the arrangement, capacity and protection before anything reaches site, which is the influence described. Site supervision is the tempting answer because it carries authority, but a supervisor delivers a design that has already been settled.',
    section: '7.4',
    difficulty: 'basic',
  },
  {
    id: 310,
    question: 'Which type of work suits an electrician who wants regular indoor hours in occupied buildings?',
    options: [
      'Emergency call-out work for a small firm',
      'New build installation for a main contractor',
      'External infrastructure and street lighting',
      'Planned maintenance for a facilities team',
    ],
    correctAnswer: 3,
    explanation: 'Planned maintenance in occupied buildings runs to a schedule, indoors, on predictable hours, which is what the stated aim requires. Emergency call-out work is the tempting answer because it is also away from new build sites, but it is by nature unplanned and out of hours.',
    section: '7.4',
    difficulty: 'basic',
  },
  {
    id: 311,
    question: 'Who is responsible for making sure an apprentice\'s off-the-job learning actually takes place?',
    options: [
      'The employer, with the training provider',
      'The apprentice, in their own unpaid time',
      'The awarding body, which issues the certificate',
      'The main contractor, who controls the site',
    ],
    correctAnswer: 0,
    explanation: 'Off-the-job learning is part of the apprenticeship the employer signed up to deliver, planned and evidenced jointly with the provider. Placing it on the apprentice\'s own time is the tempting answer because study does spill over, but it is a duty of the employer, not a favour to the apprentice.',
    section: '7.3',
    difficulty: 'intermediate',
  },
  {
    id: 312,
    question: 'An experienced worker qualified years ago but never sat the final practical assessment. How can they be graded now?',
    options: [
      'By retaking the whole apprenticeship from the start',
      'Through an experienced worker assessment route',
      'By producing references from previous employers',
      'By registering their business with a scheme',
    ],
    correctAnswer: 1,
    explanation: 'Routes exist for experienced workers to have their competence assessed and gaps filled without repeating training they have long since exceeded. References are the tempting answer because they evidence the years worked, but grading turns on assessed competence rather than testimony.',
    section: '7.2',
    difficulty: 'intermediate',
  },
  {
    id: 313,
    question: 'An applicant has an eighteen month gap in their employment history. What should the CV do about it?',
    options: [
      'Give only the years worked, not the months',
      'Leave the dates out so the gap is not visible',
      'State the period and what was done during it',
      'Explain it only if the employer asks at interview',
    ],
    correctAnswer: 2,
    explanation: 'An accounted-for gap is a fact; an unexplained one invites the reader to imagine the worst, so it is better addressed in the document. Using years only is the tempting answer because it hides the gap, but a reader who notices the technique distrusts the whole CV.',
    section: '7.4',
    difficulty: 'basic',
  },
  {
    id: 314,
    question: 'Why is a person specification written before a vacancy is advertised?',
    options: [
      'It satisfies a requirement of employment law',
      'It fixes the salary that will be offered',
      'It records who previously held the post',
      'It sets what shortlisting is judged against',
    ],
    correctAnswer: 3,
    explanation: 'Writing down the requirements first means every applicant is measured against the same stated standard rather than against each other\'s impressions. Calling it a legal requirement is the tempting answer, because using one does help demonstrate fair recruitment without being compulsory.',
    section: '7.4',
    difficulty: 'basic',
  },
  {
    id: 315,
    question: 'What distinguishes an apprenticeship progress review from an employer\'s performance appraisal?',
    options: [
      'It measures progress against the programme',
      'It is conducted only when problems have arisen',
      'It results in a change to the rate of pay',
      'It replaces the need for any workplace assessment',
    ],
    correctAnswer: 0,
    explanation: 'The progress review checks how far the apprentice has moved through the planned programme, with the employer and provider both present. Linking it to pay is the tempting answer because appraisals often are, but a progress review is about learning rather than reward.',
    section: '7.3',
    difficulty: 'basic',
  },
  {
    id: 316,
    question: 'An electrician moving from domestic work into industrial work should check what about their existing qualifications?',
    options: [
      'Whether they were awarded within the last five years',
      'Whether they cover the systems and hazards involved',
      'Whether the awarding body still exists today',
      'Whether the certificates were issued on paper',
    ],
    correctAnswer: 1,
    explanation: 'Moving sector changes the systems, voltages and hazards encountered, so the honest question is whether existing competence reaches them. Assuming qualifications expire after a period is the tempting error, because a qualification records what was achieved and does not lapse.',
    section: '7.3',
    difficulty: 'basic',
  },
  {
    id: 317,
    question: 'Why should an apprentice keep personal copies of their certificates and workplace records?',
    options: [
      'They must be produced before entering any site',
      'They are needed to renew an industry card yearly',
      'Employers and providers may not retain them',
      'They prove the hours worked on each contract',
    ],
    correctAnswer: 2,
    explanation: 'Firms close, providers archive and records go missing, and an apprentice who cannot produce evidence years later may have to redo work already completed. Site access is the tempting answer because cards are checked at the gate, but certificates are not what the gate asks for.',
    section: '7.3',
    difficulty: 'basic',
  },
  {
    id: 318,
    question: 'An electrician is told their industry grade will rise automatically with years served. Is that correct?',
    options: [
      'No, unless the employer applies for them',
      'Yes, grades move up on each anniversary',
      'Yes, once the employer confirms the years',
      'No, higher grades rest on assessed competence',
    ],
    correctAnswer: 3,
    explanation: 'Grades reflect assessed qualifications and the competence they evidence, so time served alone moves nobody up. Saying the employer must apply is the tempting answer because employers do support applications, but the barrier is the evidence, not who submits it.',
    section: '7.2',
    difficulty: 'intermediate',
  },
  {
    id: 319,
    question: 'An electrician wants to move into estimating. Which existing experience counts for most?',
    options: [
      'Having taken jobs off drawings and specifications',
      'Having supervised apprentices on large projects',
      'Having held a scheme registration for the business',
      'Having attended manufacturer product training days',
    ],
    correctAnswer: 0,
    explanation: 'Estimating starts with reading drawings and specifications and turning them into quantities, so experience of doing exactly that transfers directly. Supervision is the tempting answer because it shows responsibility, but managing people is a different skill from measuring work.',
    section: '7.4',
    difficulty: 'basic',
  },
  {
    id: 320,
    question: 'A firm asks an electrician to name their development needs for the coming year. What should the answer be based on?',
    options: [
      'The courses the employer funded before',
      'The gap between current work and the goal',
      'The subjects found easiest at college',
      'The technologies in the trade press',
    ],
    correctAnswer: 1,
    explanation: 'Development needs are the distance between where someone is and where they said they were going, which is what makes them worth funding. Trade press coverage is the tempting answer because it signals where the industry is moving, but it says nothing about this individual\'s gap.',
    section: '7.5',
    difficulty: 'basic',
  },
  {
    id: 321,
    question:
      'A householder engages one electrician to rewire their own home and appoints nobody else. Under CDM 2015 who then carries the client duties?',
    options: [
      'The householder as the client',
      'Nobody as CDM excludes domestic work',
      'The local authority building control body',
      'The contractor carrying out the work',
    ],
    correctAnswer: 3,
    explanation:
      'A domestic client is in scope of CDM 2015, but Regulation 7 passes the client duties on: where only one contractor is involved that contractor carries them alongside its own contractor duties. Leaving the duties with the householder is the tempting answer because they commissioned the job and are paying for it, but the Regulations deliberately move them to the party who actually controls the work.',
    section: '7.4',
    difficulty: 'advanced',
  },
  {
    id: 322,
    question: 'A landlord has a rented flat rewired. How is the landlord treated under CDM 2015?',
    options: [
      'As a domestic client because a flat is a dwelling',
      'As a commercial client because the work serves a business',
      'As a designer because the landlord picked the specification',
      'As outside CDM because only one contractor attends',
    ],
    correctAnswer: 1,
    explanation:
      'A domestic client is someone having work done on their own home, or the home of a family member, not in connection with a business. Letting property is a business whether or not it turns a profit, so a landlord is a commercial client and keeps the full client duties. The building type is the tempting answer because the work is plainly in a dwelling, but CDM classifies the client by why the work is being done, not by what is being worked on.',
    section: '7.4',
    difficulty: 'advanced',
  },
  {
    id: 323,
    question:
      'A two day consumer unit replacement falls far below every CDM notification threshold. What follows for the construction phase plan?',
    options: [
      'One is still needed as every construction project requires it',
      'One is needed once the project has been notified',
      'One is needed where more than one contractor attends',
      'One is replaced by the risk assessment on jobs this small',
    ],
    correctAnswer: 0,
    explanation:
      'A construction phase plan is required for every construction project however small, and the requirements of CDM 2015 apply whether or not a project is notifiable. Tying the plan to notification is the tempting error because both look like paperwork triggered by scale, but only notification has a threshold. On a job this size a short written plan is enough to satisfy it.',
    section: '7.3',
    difficulty: 'advanced',
  },
  {
    id: 324,
    question:
      'A project is scheduled to last 40 working days, with at most 12 workers on site at once and 300 person days in total. Is it notifiable to the Executive?',
    options: [
      'Yes because it exceeds 30 working days',
      'Yes because a principal contractor is needed',
      'No because neither condition is fully met',
      'No because notification covers only new build',
    ],
    correctAnswer: 2,
    explanation:
      'Notification is triggered by work scheduled to last longer than 30 working days and to have more than 20 workers on site simultaneously, or alternatively to exceed 500 person days. This job passes the day count but never reaches 20 workers, and 300 person days is well short, so neither limb closes. Reading the 30 days on its own is the usual mistake, because it is the figure people remember and the worker count is quietly dropped.',
    section: '7.3',
    difficulty: 'advanced',
  },
  {
    id: 325,
    question:
      'CDM 2015 stops a contractor starting construction work until it is satisfied of one thing about the client. What is that thing?',
    options: [
      'That welfare facilities have been arranged on site',
      'That the client knows the duties the client owes',
      'That the work has been notified to the Executive',
      'That the client insures the construction work',
    ],
    correctAnswer: 1,
    explanation:
      'A contractor must not carry out construction work unless satisfied that the client is aware of the duties the client owes. Where the contractor is the only one involved that means raising it directly, early, and having enough knowledge of client duties to advise. Welfare and notification are the tempting picks because both are genuine client responsibilities, but the duty here is about the client understanding their position rather than any one arrangement being in place.',
    section: '7.4',
    difficulty: 'advanced',
  },
  {
    id: 326,
    question:
      'A contractor sublets the containment on a job to another firm. What must the contractor establish before appointing it?',
    options: [
      'That the firm belongs to a competent person scheme',
      'That the firm has been notified to the enforcing authority',
      'That the firm will adopt the method statement supplied',
      'That the firm has the skills and experience for the work',
    ],
    correctAnswer: 3,
    explanation:
      'The duty on anyone appointing a contractor reaches a contractor appointing its own subcontractor. Reasonable steps must be taken to satisfy itself that the firm has the skills, knowledge and experience, and where it is an organisation the capability, to do the work safely. Scheme membership is the tempting answer because it is the credential the trade quotes most often, but the question CDM asks is whether they can do this particular work, not what they are registered for.',
    section: '7.7',
    difficulty: 'advanced',
  },
  {
    id: 327,
    question:
      'An electrician is the only contractor on a small refurbishment. Who draws up the construction phase plan?',
    options: [
      'The client who commissioned the project',
      'The principal designer for the project',
      'The electrician',
      'Nobody until a second contractor arrives',
    ],
    correctAnswer: 2,
    explanation:
      'Where a contractor is the only contractor on a project, that contractor prepares the construction phase plan. A principal designer and a principal contractor are appointed only where more than one contractor is involved, so on a single contractor job there is nobody else to hand it to. Looking up the chain to the client is the tempting move, but the client duty is to make suitable arrangements for managing the project, not to write the plan.',
    section: '7.4',
    difficulty: 'advanced',
  },
  {
    id: 328,
    question:
      'On a job with no consultant an electrician selects the cable routes and fixes the position of every accessory. What is that electrician under CDM 2015?',
    options: [
      'A contractor only as the work is installation',
      'A principal designer as nobody else designed',
      'Neither as design means drawings by an architect',
      'A designer as well as a contractor',
    ],
    correctAnswer: 3,
    explanation:
      'A designer is anyone who prepares or modifies a design, and design covers specifications as well as drawings, so an electrician choosing routes and positions is designing and picks up the designer duties too. Reaching for principal designer is the tempting step up, but that is an appointment made by the client where more than one contractor is involved, not a title you fall into by being the only person making decisions.',
    section: '7.4',
    difficulty: 'advanced',
  },
  {
    id: 329,
    question:
      "A labour only subcontractor turns up for the same firm every week on an hourly rate, uses the firm's tools and may not send anyone in his place. He pays his own tax and national insurance. How does health and safety law treat him?",
    options: [
      'As self employed because he settles his own tax',
      'As self employed because the contract is labour only',
      'As an employee on the balance of the indicators',
      'As an employee only if he asks to be treated so',
    ],
    correctAnswer: 2,
    explanation:
      'Paying your own tax and national insurance does not make you self employed under health and safety law. The indicators here point the other way: he works regularly for the same firm, on an hourly rate, with their tools, and cannot subcontract his place. His tax position is the tempting answer because it is the one piece of paperwork everybody can see, but status is decided on the substance of the working arrangement.',
    section: '7.7',
    difficulty: 'advanced',
  },
  {
    id: 330,
    question:
      'A one man firm takes on a single apprentice and employs nobody else. What does the Employers Liability Compulsory Insurance Act 1969 require?',
    options: [
      'Cover is required once five or more are employed',
      'Cover is optional while the apprentice remains at college',
      'Cover is required and the current certificate displayed',
      'Cover is provided by the public liability policy held',
    ],
    correctAnswer: 2,
    explanation:
      'Wherever anyone is employed the cover is needed, and the current certificate has to be displayed by the employer. There is no headcount below which it stops applying, and an apprentice is an employee. Leaning on the public liability policy is the tempting answer because almost every firm holds one, but public liability answers claims by third parties such as customers and the public, while this Act is about claims by your own staff.',
    section: '7.7',
    difficulty: 'advanced',
  },
  {
    id: 331,
    question:
      'An electrician is injured at work on a Monday and cannot do his normal work for the next ten days, counting the weekend. What does RIDDOR require?',
    options: [
      'Notification by the quickest practicable means',
      'An accident book entry with no report at all',
      'A report only where the injury is a specified one',
      'A report to the enforcing authority within 15 days',
    ],
    correctAnswer: 3,
    explanation:
      'Where someone is incapacitated for more than seven consecutive days the report goes to the enforcing authority within 15 days of the accident. The seven days exclude the day of the accident but include days that would not have been working days, so the weekend counts. Three days is the figure that sticks in most people’s minds because that was the trigger before April 2013, and it has not been the rule for years.',
    section: '7.3',
    difficulty: 'advanced',
  },
  {
    id: 332,
    question:
      'A member of the public walking past an electrician working in an occupied office is struck by falling trunking and taken to hospital for treatment. What does RIDDOR require?',
    options: [
      'Notification by the quickest practicable means',
      'Nothing as the person injured was not at work',
      'A report within 15 days if they lose a week',
      'An accident book entry once the injury is confirmed',
    ],
    correctAnswer: 0,
    explanation:
      'An accident taking someone who is not at work to hospital for treatment must be notified without delay by the quickest practicable means, with a written report to follow. How badly they turn out to be hurt does not enter into it, and neither does whether they were ever admitted. Assuming a non worker falls outside RIDDOR is the tempting error, because the rest of the injury reporting rules are written around people at work.',
    section: '7.3',
    difficulty: 'advanced',
  },
  {
    id: 333,
    question:
      "A doctor confirms that an electrician's mate has fractured a finger on site. He is back on full duties two days later. What does RIDDOR require?",
    options: [
      'Immediate notification as a fracture was diagnosed',
      'No report as neither reporting trigger is met',
      'A report within 15 days as a doctor was involved',
      'A dangerous occurrence report as it happened on site',
    ],
    correctAnswer: 1,
    explanation:
      'The specified injury list covers any bone fracture other than one to a finger, a thumb or a toe, so this diagnosis sits outside it. Two days off is also well short of the more than seven consecutive days that triggers the fifteen day report. Reporting anyway is the tempting call, because a confirmed fracture sounds serious and over reporting feels like the safe error, but the two triggers are drawn deliberately and this injury meets neither.',
    section: '7.3',
    difficulty: 'advanced',
  },
  {
    id: 334,
    question:
      'A doctor diagnoses hand arm vibration syndrome in an electrician who uses breakers and rotary hammers most weeks. Why is that reportable under RIDDOR?',
    options: [
      'Because the diagnosis is linked to regular use of vibrating tools',
      'Because any diagnosis by a doctor is reportable',
      'Because he will lose more than seven days of work',
      'Because the employer never measured the vibration',
    ],
    correctAnswer: 0,
    explanation:
      'Occupational disease reports turn on two things together: a diagnosis from the named list, and a work activity of the kind the listing attaches to it. Hand arm vibration syndrome qualifies where the work involves regular use of percussive or vibrating tools, which breakers and rotary hammers plainly are. The diagnosis on its own is the tempting answer, but without the work link there is nothing to report.',
    section: '7.3',
    difficulty: 'advanced',
  },
  {
    id: 335,
    question:
      'A domestic client has used the same designer before and wants that designer rather than the builder to carry the client duties. When is that possible under CDM 2015?',
    options: [
      'When the designer is appointed principal designer',
      'When the designer is the only person visiting site',
      'When the local authority approves the arrangement',
      'When client and designer agree it in writing beforehand',
    ],
    correctAnswer: 3,
    explanation:
      'Where a domestic client already has a relationship with their designer before the work starts, that designer can take the client duties on, but only if there is a written agreement between them saying so. Without it the duties pass to the contractor or the principal contractor by default. Appointment as principal designer is the tempting answer because it sounds like the senior role, but those duties are a separate set and do not absorb the client duties.',
    section: '7.4',
    difficulty: 'advanced',
  },
  {
    id: 336,
    question:
      'An installation is found to conform fully with BS 7671. What does that establish about the Electricity at Work Regulations 1989?',
    options: [
      'Compliance is proved because the standard was written to satisfy them',
      'Nothing as the two documents address different subjects',
      'It is likely to satisfy the relevant parts but is no guarantee',
      'It removes the duty to keep the system in a safe condition',
    ],
    correctAnswer: 2,
    explanation:
      'An installation conforming to BS 7671 is likely to satisfy the relevant parts of the statutory regulations, but that is a general likelihood rather than a guarantee, and the statutory duty is the one that is enforced. Treating conformity as proof is the tempting shortcut, because the standard is written with those duties in mind, yet BS 7671 is not a statutory instrument and cannot discharge a duty on its own.',
    section: '7.4',
    difficulty: 'advanced',
  },
];

// Helper function to get random questions for mock exams
/**
 * Draws a paper honouring the difficulty tags.
 *
 * Previously this was a flat `sort(() => Math.random() - 0.5)` slice, which
 * ignored `difficulty` entirely — the tags were decorative and a paper's
 * difficulty was pure luck — and used the broken sort-shuffle idiom, which is
 * not a uniform permutation. See src/utils/apprenticeQuestionDraw.ts.
 */
export const getRandomQuestions = (
  count: number,
  weights: DifficultyWeights = LEVEL3_WEIGHTS
): Question[] => drawWeighted(module7Questions, count, weights);

// Helper function to get questions by section
export const getQuestionsBySection = (section: string): Question[] => {
  return module7Questions.filter((q) => q.section === section);
};

// Helper function to get questions by difficulty
export const getQuestionsByDifficulty = (
  difficulty: 'basic' | 'intermediate' | 'advanced'
): Question[] => {
  return module7Questions.filter((q) => q.difficulty === difficulty);
};

// Map section codes to broader topic labels (used by getQuestionsByTopic).
/**
 * Section number → readable topic. Exported for the results screen, which
 * otherwise lists bare outline numbers ("7.2") as study targets.
 */
export const M7_SECTION_TOPIC: Record<string, string> = {
  '7.1': 'Industry & Career',
  '7.2': 'Industry & Career',
  '7.3': 'Standards & Responsibilities',
  '7.4': 'Standards & Responsibilities',
  '7.5': 'Communication & Teamwork',
  '7.6': 'CPD',
  '7.7': 'Employment & Business',
};

// Filter questions by topic, mapped from section.
export const getQuestionsByTopic = (topic: string): Question[] => {
  return module7Questions.filter((q) => M7_SECTION_TOPIC[q.section || ''] === topic);
};

// Structural validation — used by tests / spot-checks.
export const validateQuestionBank = (): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  const seenIds = new Set<number>();
  module7Questions.forEach((q, idx) => {
    if (typeof q.id !== 'number') errors.push(`Q[${idx}]: id must be a number`);
    if (seenIds.has(q.id)) errors.push(`Q[${idx}]: duplicate id ${q.id}`);
    seenIds.add(q.id);
    if (!q.question) errors.push(`Q${q.id}: question text missing`);
    if (!Array.isArray(q.options) || q.options.length < 2)
      errors.push(`Q${q.id}: options must have at least 2 entries`);
    if (
      typeof q.correctAnswer !== 'number' ||
      q.correctAnswer < 0 ||
      q.correctAnswer >= (q.options?.length || 0)
    )
      errors.push(`Q${q.id}: correctAnswer index out of range`);
    if (!q.explanation) errors.push(`Q${q.id}: explanation missing`);
  });
  return { isValid: errors.length === 0, errors };
};

export default module7Questions;
