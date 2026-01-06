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

export const module7Questions: Question[] = [
  // Section 7.1: Industry Roles (Questions 1-30)
  {
    id: 1,
    question: "What is the primary role of a domestic electrician?",
    options: ["Only industrial installations", "Electrical work in homes and residential properties", "High voltage distribution", "Only commercial buildings"],
    correctAnswer: 1,
    explanation: "Domestic electricians specialise in electrical installations, maintenance, and repairs in residential properties.",
    section: "7.1",
    difficulty: "basic"
  },
  {
    id: 2,
    question: "A commercial electrician typically works in:",
    options: ["Only houses", "Shops, offices, and business premises", "Power stations only", "Underground mining"],
    correctAnswer: 1,
    explanation: "Commercial electricians work in retail, office, and other business environments.",
    section: "7.1",
    difficulty: "basic"
  },
  {
    id: 3,
    question: "Industrial electricians are distinguished by their work in:",
    options: ["Domestic properties", "Manufacturing plants, factories, and heavy industry", "Only domestic rewires", "Small retail shops"],
    correctAnswer: 1,
    explanation: "Industrial electricians work with heavy machinery, process control, and manufacturing equipment.",
    section: "7.1",
    difficulty: "basic"
  },
  {
    id: 4,
    question: "What does a maintenance electrician primarily do?",
    options: ["Only new installations", "Keep existing systems operational through repairs and planned maintenance", "Design work only", "Sales activities"],
    correctAnswer: 1,
    explanation: "Maintenance electricians ensure continued safe operation through preventive and corrective maintenance.",
    section: "7.1",
    difficulty: "basic"
  },
  {
    id: 5,
    question: "An approved electrician (under a competent person scheme) can:",
    options: ["Only work for councils", "Self-certify notifiable electrical work", "Only do minor works", "Never issue certificates"],
    correctAnswer: 1,
    explanation: "Approved electricians registered with competent person schemes can self-certify notifiable work.",
    section: "7.1",
    difficulty: "intermediate"
  },
  {
    id: 6,
    question: "The role of an electrical supervisor includes:",
    options: ["Only doing physical work", "Overseeing work quality and supporting less experienced staff", "Avoiding site visits", "Only administrative duties"],
    correctAnswer: 1,
    explanation: "Supervisors oversee work quality, ensure compliance, and support team members.",
    section: "7.1",
    difficulty: "intermediate"
  },
  {
    id: 7,
    question: "An electrical project manager is responsible for:",
    options: ["Only physical installation", "Planning, coordinating, and delivering electrical projects", "Only ordering materials", "Just signing certificates"],
    correctAnswer: 1,
    explanation: "Project managers coordinate all aspects of electrical projects from planning to completion.",
    section: "7.1",
    difficulty: "intermediate"
  },
  {
    id: 8,
    question: "What distinguishes a data cabling installer from general electricians?",
    options: ["Lower qualifications needed", "Specialisation in structured cabling and network infrastructure", "Only works outside", "No electrical knowledge needed"],
    correctAnswer: 1,
    explanation: "Data cablers specialise in network infrastructure, structured cabling, and communication systems.",
    section: "7.1",
    difficulty: "basic"
  },
  {
    id: 9,
    question: "Fire alarm installers require:",
    options: ["No additional training", "Specific training in fire alarm systems to BS 5839", "Only general electrical", "Only first aid certification"],
    correctAnswer: 1,
    explanation: "Fire alarm work requires specific competence in BS 5839 and fire detection systems.",
    section: "7.1",
    difficulty: "intermediate"
  },
  {
    id: 10,
    question: "EV charger installation specialists need knowledge of:",
    options: ["Only 13A sockets", "Charging standards, load management, and vehicle integration", "Only domestic circuits", "Only three-phase systems"],
    correctAnswer: 1,
    explanation: "EV specialists need knowledge of charging protocols, load management, and integration with vehicles and grid.",
    section: "7.1",
    difficulty: "intermediate"
  },
  {
    id: 11,
    question: "A solar PV installer's role includes:",
    options: ["Only roof work", "Installing and commissioning solar photovoltaic systems", "Only AC electrical work", "Only battery systems"],
    correctAnswer: 1,
    explanation: "PV installers design, install, and commission complete solar generation systems.",
    section: "7.1",
    difficulty: "basic"
  },
  {
    id: 12,
    question: "What does a building services engineer do differently from an electrician?",
    options: ["Nothing different", "Designs building systems at a higher technical/professional level", "Only does physical work", "Only works in schools"],
    correctAnswer: 1,
    explanation: "Building services engineers typically design systems rather than install them, requiring degree-level qualifications.",
    section: "7.1",
    difficulty: "intermediate"
  },
  {
    id: 13,
    question: "Highway electrical operatives specialise in:",
    options: ["Domestic properties", "Street lighting, traffic signals, and highway infrastructure", "Only industrial plants", "Indoor installations only"],
    correctAnswer: 1,
    explanation: "Highway electricians work on public infrastructure including street lighting and traffic systems.",
    section: "7.1",
    difficulty: "intermediate"
  },
  {
    id: 14,
    question: "An electrical estimator's primary role is:",
    options: ["Only installation work", "Calculating costs and preparing quotations for electrical work", "Only design work", "Only inspection work"],
    correctAnswer: 1,
    explanation: "Estimators analyse project requirements and produce accurate cost estimates for tenders.",
    section: "7.1",
    difficulty: "intermediate"
  },
  {
    id: 15,
    question: "Commissioning engineers are responsible for:",
    options: ["Only installation", "Testing and bringing electrical systems into operation", "Only design", "Only maintenance"],
    correctAnswer: 1,
    explanation: "Commissioning engineers verify systems work correctly before handover to the client.",
    section: "7.1",
    difficulty: "intermediate"
  },
  {
    id: 16,
    question: "The role of an electrical CAD technician involves:",
    options: ["Physical installation", "Creating technical drawings and designs using computer software", "Only site supervision", "Only testing work"],
    correctAnswer: 1,
    explanation: "CAD technicians produce detailed electrical drawings using specialist software.",
    section: "7.1",
    difficulty: "intermediate"
  },
  {
    id: 17,
    question: "Health and safety advisors in electrical contractors:",
    options: ["Only do electrical work", "Ensure compliance with safety legislation and best practices", "Only admin work", "No specific training needed"],
    correctAnswer: 1,
    explanation: "H&S advisors develop and monitor safety policies, procedures, and compliance.",
    section: "7.1",
    difficulty: "intermediate"
  },
  {
    id: 18,
    question: "An electrical trainer/assessor typically:",
    options: ["Only works on site", "Delivers training and assesses learner competence", "Has no industry experience", "Only does paperwork"],
    correctAnswer: 1,
    explanation: "Trainers deliver electrical training and assess competence, usually with significant industry experience.",
    section: "7.1",
    difficulty: "intermediate"
  },
  {
    id: 19,
    question: "Technical sales representatives in the electrical industry:",
    options: ["Need no technical knowledge", "Combine product knowledge with sales skills", "Only work in shops", "Never visit sites"],
    correctAnswer: 1,
    explanation: "Technical sales requires understanding products and applications to advise customers effectively.",
    section: "7.1",
    difficulty: "intermediate"
  },
  {
    id: 20,
    question: "Quality assurance managers in electrical contracting:",
    options: ["Only do installation", "Ensure work meets required standards and specifications", "No electrical knowledge needed", "Only check paperwork"],
    correctAnswer: 1,
    explanation: "QA managers implement systems to ensure consistent quality and compliance.",
    section: "7.1",
    difficulty: "intermediate"
  },
  {
    id: 21,
    question: "A facilities manager with electrical responsibilities:",
    options: ["Only does cleaning", "Manages building services including electrical systems", "Only works night shifts", "Has no technical role"],
    correctAnswer: 1,
    explanation: "Facilities managers oversee building operations including electrical systems management.",
    section: "7.1",
    difficulty: "intermediate"
  },
  {
    id: 22,
    question: "Control panel builders work primarily with:",
    options: ["Only domestic circuits", "Assembling electrical control panels for industrial applications", "Only lighting circuits", "Only outside work"],
    correctAnswer: 1,
    explanation: "Panel builders assemble control systems following electrical schematics and specifications.",
    section: "7.1",
    difficulty: "intermediate"
  },
  {
    id: 23,
    question: "An electrical inspector's role includes:",
    options: ["Only installation work", "Verifying compliance with regulations through inspection and testing", "Only design", "Only sales"],
    correctAnswer: 1,
    explanation: "Inspectors verify electrical installations comply with regulations through inspection and testing.",
    section: "7.1",
    difficulty: "basic"
  },
  {
    id: 24,
    question: "Theatre and entertainment electricians require knowledge of:",
    options: ["Only domestic wiring", "Temporary installations, special effects, and performance requirements", "Only permanent installations", "Only industrial systems"],
    correctAnswer: 1,
    explanation: "Entertainment electricians work with temporary supplies, rigging, and performance-specific requirements.",
    section: "7.1",
    difficulty: "intermediate"
  },
  {
    id: 25,
    question: "A lift installation electrician specialises in:",
    options: ["Only escalators", "Elevator electrical systems and controls", "Only domestic work", "Only fire alarms"],
    correctAnswer: 1,
    explanation: "Lift electricians specialise in elevator control systems, safety circuits, and related equipment.",
    section: "7.1",
    difficulty: "intermediate"
  },
  {
    id: 26,
    question: "Marine electricians work primarily on:",
    options: ["Only offshore platforms", "Ships, boats, and marine vessels", "Only in ports", "Only submarines"],
    correctAnswer: 1,
    explanation: "Marine electricians install and maintain electrical systems on watercraft.",
    section: "7.1",
    difficulty: "intermediate"
  },
  {
    id: 27,
    question: "Rail traction electricians work with:",
    options: ["Only stations", "Train electrical systems and railway infrastructure", "Only signals", "Only ticket machines"],
    correctAnswer: 1,
    explanation: "Rail electricians work on traction systems, rolling stock, and railway electrical infrastructure.",
    section: "7.1",
    difficulty: "intermediate"
  },
  {
    id: 28,
    question: "HVAC electricians combine electrical skills with:",
    options: ["Only plumbing", "Heating, ventilation, and air conditioning system knowledge", "Only carpentry", "Only painting"],
    correctAnswer: 1,
    explanation: "HVAC electricians specialise in electrical aspects of climate control systems.",
    section: "7.1",
    difficulty: "intermediate"
  },
  {
    id: 29,
    question: "Renewable energy electricians focus on:",
    options: ["Only traditional systems", "Solar, wind, and other renewable energy installations", "Only fossil fuel plants", "Only nuclear systems"],
    correctAnswer: 1,
    explanation: "Renewable energy specialists install and maintain green energy systems.",
    section: "7.1",
    difficulty: "basic"
  },
  {
    id: 30,
    question: "Building automation specialists work with:",
    options: ["Only manual controls", "Smart building systems including BMS and integrated controls", "Only domestic switches", "Only emergency lighting"],
    correctAnswer: 1,
    explanation: "Automation specialists work with building management systems and smart building technologies.",
    section: "7.1",
    difficulty: "intermediate"
  },

  // Section 7.2: JIB Grading (Questions 31-60)
  {
    id: 31,
    question: "What does JIB stand for?",
    options: ["Joint Insurance Board", "Joint Industry Board", "Junction Installation Board", "Junior Industry Body"],
    correctAnswer: 1,
    explanation: "JIB is the Joint Industry Board for the Electrical Contracting Industry.",
    section: "7.2",
    difficulty: "basic"
  },
  {
    id: 32,
    question: "The JIB grading system primarily determines:",
    options: ["Only age requirements", "Skill level and corresponding pay rates", "Only work locations", "Only company size"],
    correctAnswer: 1,
    explanation: "JIB grades reflect competence levels and set minimum pay rates for each grade.",
    section: "7.2",
    difficulty: "basic"
  },
  {
    id: 33,
    question: "An ECS card (Electrotechnical Certification Scheme) is:",
    options: ["A credit card", "An ID card confirming qualifications and competence", "A driving licence", "A library card"],
    correctAnswer: 1,
    explanation: "ECS cards confirm the holder's qualifications, competence, and identity in the electrical industry.",
    section: "7.2",
    difficulty: "basic"
  },
  {
    id: 34,
    question: "To achieve JIB Approved Electrician grade, you typically need:",
    options: ["No formal qualifications", "Level 3 NVQ and AM2s assessment", "Only Level 2", "No assessment required"],
    correctAnswer: 1,
    explanation: "Approved Electrician requires NVQ Level 3 plus successful completion of AM2s practical assessment.",
    section: "7.2",
    difficulty: "intermediate"
  },
  {
    id: 35,
    question: "The AM2s assessment tests:",
    options: ["Only theory knowledge", "Practical installation and testing skills", "Only health and safety", "Only customer service"],
    correctAnswer: 1,
    explanation: "AM2s is a practical assessment of installation, inspection, and testing competence.",
    section: "7.2",
    difficulty: "basic"
  },
  {
    id: 36,
    question: "JIB Electrician grade requires:",
    options: ["No qualifications", "Level 3 qualification without AM2s", "Only apprenticeship completion", "Only experience"],
    correctAnswer: 1,
    explanation: "Electrician grade requires Level 3 technical qualification but not the AM2s assessment.",
    section: "7.2",
    difficulty: "intermediate"
  },
  {
    id: 37,
    question: "The difference between Approved and Installation Electrician is:",
    options: ["Only pay rate", "Approved requires AM2s assessment, Installation requires AM2e", "Only experience level", "No difference"],
    correctAnswer: 1,
    explanation: "Approved Electricians complete AM2s; Installation Electricians complete AM2e assessment.",
    section: "7.2",
    difficulty: "intermediate"
  },
  {
    id: 38,
    question: "A JIB Technician grade indicates:",
    options: ["Lower skills than electrician", "Higher technical competence often with design capability", "Only administrative role", "Only apprentice level"],
    correctAnswer: 1,
    explanation: "Technician grade indicates higher technical competence, often including design responsibilities.",
    section: "7.2",
    difficulty: "intermediate"
  },
  {
    id: 39,
    question: "Electrical Improver is a grade for:",
    options: ["Fully qualified electricians", "Those working towards qualification with basic competence", "Supervisors only", "Retired electricians"],
    correctAnswer: 1,
    explanation: "Improver grade is for those developing skills and working towards full qualification.",
    section: "7.2",
    difficulty: "basic"
  },
  {
    id: 40,
    question: "ECS gold card indicates:",
    options: ["Lowest grade", "Highest level of qualification and competence", "Provisional status", "Expired qualification"],
    correctAnswer: 1,
    explanation: "Gold card is the highest ECS level, indicating advanced qualifications and competence.",
    section: "7.2",
    difficulty: "basic"
  },
  {
    id: 41,
    question: "The JIB National Working Rules set:",
    options: ["Only company policies", "Industry-wide terms and conditions including pay rates", "Only safety rules", "Only working hours"],
    correctAnswer: 1,
    explanation: "National Working Rules establish pay rates, conditions, and benefits across the industry.",
    section: "7.2",
    difficulty: "intermediate"
  },
  {
    id: 42,
    question: "To maintain ECS card validity, you must:",
    options: ["Do nothing", "Provide evidence of ongoing professional development", "Retake all exams annually", "Only pay renewal fee"],
    correctAnswer: 1,
    explanation: "ECS card renewal requires evidence of CPD to maintain industry recognition.",
    section: "7.2",
    difficulty: "intermediate"
  },
  {
    id: 43,
    question: "JIB Labourer Electrical grade covers:",
    options: ["Qualified electricians", "Support roles assisting qualified electricians", "Supervisory roles", "Design engineers"],
    correctAnswer: 1,
    explanation: "Labourer grade covers those providing support and assistance to qualified electricians.",
    section: "7.2",
    difficulty: "basic"
  },
  {
    id: 44,
    question: "The Trainee grading within JIB is for:",
    options: ["Experienced electricians", "Those in formal training programmes like apprenticeships", "Semi-retired workers", "Agency workers only"],
    correctAnswer: 1,
    explanation: "Trainee grades apply to those in structured training programmes working towards qualification.",
    section: "7.2",
    difficulty: "basic"
  },
  {
    id: 45,
    question: "JIB grading affects employers because:",
    options: ["It has no effect", "It determines minimum pay rates that must be paid", "Only for large companies", "Only voluntary"],
    correctAnswer: 1,
    explanation: "JIB registered employers must pay at least the minimum rates for each grade.",
    section: "7.2",
    difficulty: "intermediate"
  },
  {
    id: 46,
    question: "An Electrical Apprentice at year 4 would typically be at:",
    options: ["Full electrician rate", "Percentage of adult rate progressing annually", "Labourer rate", "No pay structure exists"],
    correctAnswer: 1,
    explanation: "Apprentice pay progresses through set percentages of qualified rates as training advances.",
    section: "7.2",
    difficulty: "basic"
  },
  {
    id: 47,
    question: "The JIB Supervisor grade requires:",
    options: ["No electrical qualification", "Approved Electrician plus supervisory experience and training", "Only admin skills", "Only Level 2 qualification"],
    correctAnswer: 1,
    explanation: "Supervisor grade builds on Approved Electrician with additional supervisory competence.",
    section: "7.2",
    difficulty: "intermediate"
  },
  {
    id: 48,
    question: "Provisional ECS cards are issued to:",
    options: ["Fully qualified workers", "Those awaiting full card while meeting requirements", "Those with expired cards", "Foreign workers only"],
    correctAnswer: 1,
    explanation: "Provisional cards are temporary while permanent cards are processed.",
    section: "7.2",
    difficulty: "basic"
  },
  {
    id: 49,
    question: "JIB grading recognition extends to:",
    options: ["Only UK", "Increasingly internationally through recognition agreements", "Only England", "Only Scotland"],
    correctAnswer: 1,
    explanation: "JIB qualifications have growing international recognition through various agreements.",
    section: "7.2",
    difficulty: "intermediate"
  },
  {
    id: 50,
    question: "The Electrical Contracting Industry Welfare Benefits provide:",
    options: ["Only holiday pay", "Death benefits, injury cover, and welfare support", "Only pension", "No benefits"],
    correctAnswer: 1,
    explanation: "JIB welfare benefits include death-in-service, injury cover, and various support programmes.",
    section: "7.2",
    difficulty: "intermediate"
  },
  {
    id: 51,
    question: "Site Technician grade typically includes:",
    options: ["Only labouring work", "Technical problem-solving and site coordination responsibilities", "Only admin duties", "No electrical work"],
    correctAnswer: 1,
    explanation: "Site Technicians have enhanced technical and coordination responsibilities beyond standard electrician roles.",
    section: "7.2",
    difficulty: "intermediate"
  },
  {
    id: 52,
    question: "JIB grading is updated to reflect:",
    options: ["Never changes", "Industry developments and new technology requirements", "Only inflation", "Only EU directives"],
    correctAnswer: 1,
    explanation: "Grading evolves to reflect changing industry needs and new technologies.",
    section: "7.2",
    difficulty: "intermediate"
  },
  {
    id: 53,
    question: "The JIB pension scheme provides:",
    options: ["No pension", "Industry-wide retirement savings scheme", "Only for managers", "Only government pension"],
    correctAnswer: 1,
    explanation: "The JIB/EJP pension scheme provides retirement benefits for industry workers.",
    section: "7.2",
    difficulty: "intermediate"
  },
  {
    id: 54,
    question: "Electrical Design Engineer JIB grade requires:",
    options: ["No degree", "Typically degree-level qualification plus relevant experience", "Only apprenticeship", "Only NVQ Level 3"],
    correctAnswer: 1,
    explanation: "Design Engineer grade typically requires degree-level qualification and design experience.",
    section: "7.2",
    difficulty: "intermediate"
  },
  {
    id: 55,
    question: "SJIB in Scotland operates:",
    options: ["Independently of JIB", "As the Scottish equivalent with similar structures", "Only for plumbers", "As part of JIB directly"],
    correctAnswer: 1,
    explanation: "SJIB (Scottish Joint Industry Board) operates separately but with similar functions in Scotland.",
    section: "7.2",
    difficulty: "intermediate"
  },
  {
    id: 56,
    question: "JIB travel and lodging allowances are:",
    options: ["Never paid", "Available when working away from normal workplace", "Only for managers", "Only for apprentices"],
    correctAnswer: 1,
    explanation: "Travel and lodging allowances apply when working significant distances from the normal workplace.",
    section: "7.2",
    difficulty: "intermediate"
  },
  {
    id: 57,
    question: "Mature candidate entry to JIB grades is possible through:",
    options: ["No pathway exists", "Assessment of prior learning and relevant experience", "Only full apprenticeship", "Only degree qualification"],
    correctAnswer: 1,
    explanation: "Mature candidates can achieve recognition through RPL (Recognition of Prior Learning) routes.",
    section: "7.2",
    difficulty: "intermediate"
  },
  {
    id: 58,
    question: "ECS card colours indicate:",
    options: ["Personal preference", "Different qualification and competence levels", "Company colours", "Random assignment"],
    correctAnswer: 1,
    explanation: "Card colours (gold, blue, green, etc.) indicate different qualification levels.",
    section: "7.2",
    difficulty: "basic"
  },
  {
    id: 59,
    question: "JIB dispute resolution procedures help:",
    options: ["Avoid all issues", "Resolve workplace disagreements through structured processes", "Only with pay disputes", "Only legal matters"],
    correctAnswer: 1,
    explanation: "JIB provides dispute resolution procedures for various workplace issues.",
    section: "7.2",
    difficulty: "intermediate"
  },
  {
    id: 60,
    question: "Regular JIB rate increases are typically:",
    options: ["Never happen", "Negotiated annually between industry representatives", "Set by government", "Random"],
    correctAnswer: 1,
    explanation: "Pay rates are negotiated between employer associations and trade unions annually.",
    section: "7.2",
    difficulty: "intermediate"
  },

  // Section 7.3: Qualifications (Questions 61-90)
  {
    id: 61,
    question: "The main qualification for electrical installation is:",
    options: ["Only experience", "Level 3 Diploma in Installing Electrotechnical Systems", "Only City & Guilds 2360", "No qualification needed"],
    correctAnswer: 1,
    explanation: "The Level 3 Diploma is the current main qualification for installation electricians.",
    section: "7.3",
    difficulty: "basic"
  },
  {
    id: 62,
    question: "City & Guilds 2382 covers:",
    options: ["Installation work", "BS 7671 Wiring Regulations requirements", "Only testing", "Only safety"],
    correctAnswer: 1,
    explanation: "2382 is the qualification specifically covering BS 7671 Requirements for Electrical Installations.",
    section: "7.3",
    difficulty: "basic"
  },
  {
    id: 63,
    question: "City & Guilds 2391 focuses on:",
    options: ["Design only", "Inspection and Testing of Electrical Installations", "Only installation", "Only theory"],
    correctAnswer: 1,
    explanation: "2391 is the inspection and testing qualification for electrical installations.",
    section: "7.3",
    difficulty: "basic"
  },
  {
    id: 64,
    question: "The Level 2 Diploma in Electrical Installation is appropriate for:",
    options: ["Fully qualified electricians", "Those entering the trade and working towards Level 3", "Design engineers", "Project managers"],
    correctAnswer: 1,
    explanation: "Level 2 provides foundation knowledge for those entering the electrical trade.",
    section: "7.3",
    difficulty: "basic"
  },
  {
    id: 65,
    question: "NVQ qualifications are based on:",
    options: ["Only written exams", "Demonstration of competence in the workplace", "Only classroom learning", "Only online tests"],
    correctAnswer: 1,
    explanation: "NVQs assess practical competence demonstrated in real workplace situations.",
    section: "7.3",
    difficulty: "basic"
  },
  {
    id: 66,
    question: "The AM2s assessment consists of:",
    options: ["Only theory test", "Practical installation, inspection, and testing scenarios", "Only verbal interview", "Only online assessment"],
    correctAnswer: 1,
    explanation: "AM2s is a practical assessment covering installation and testing in realistic scenarios.",
    section: "7.3",
    difficulty: "basic"
  },
  {
    id: 67,
    question: "City & Guilds 2377 relates to:",
    options: ["General installation", "PAT Testing and In-Service Inspection", "Only design work", "Only lighting"],
    correctAnswer: 1,
    explanation: "2377 covers portable appliance testing and in-service inspection of electrical equipment.",
    section: "7.3",
    difficulty: "intermediate"
  },
  {
    id: 68,
    question: "For EV charging installation, relevant qualifications include:",
    options: ["No specific qualification", "City & Guilds 2919 or equivalent", "Only general electrical", "Only automotive qualifications"],
    correctAnswer: 1,
    explanation: "EV installation requires specific qualifications like 2919 covering electric vehicle charging.",
    section: "7.3",
    difficulty: "intermediate"
  },
  {
    id: 69,
    question: "Solar PV installation qualifications include:",
    options: ["No requirements", "MCS-specific qualifications and general electrical competence", "Only roofing qualifications", "Only environmental studies"],
    correctAnswer: 1,
    explanation: "PV installation requires electrical competence plus specific renewables qualifications for MCS registration.",
    section: "7.3",
    difficulty: "intermediate"
  },
  {
    id: 70,
    question: "Part P Building Regulations competence can be demonstrated through:",
    options: ["Just experience", "Competent person scheme membership or building control notification", "No requirement exists", "Only verbal confirmation"],
    correctAnswer: 1,
    explanation: "Part P compliance requires either competent person scheme registration or building control involvement.",
    section: "7.3",
    difficulty: "intermediate"
  },
  {
    id: 71,
    question: "Fire alarm installation typically requires:",
    options: ["No specific qualification", "FIA or equivalent qualifications plus BS 5839 competence", "Only general electrical", "Only first aid training"],
    correctAnswer: 1,
    explanation: "Fire alarm installers need specific competence in BS 5839 and fire detection systems.",
    section: "7.3",
    difficulty: "intermediate"
  },
  {
    id: 72,
    question: "Data cabling qualifications like BICSI or City & Guilds 3667 cover:",
    options: ["Only electrical work", "Structured cabling and network infrastructure", "Only fibre optics", "Only copper cabling"],
    correctAnswer: 1,
    explanation: "Data cabling qualifications cover structured cabling systems, testing, and network infrastructure.",
    section: "7.3",
    difficulty: "intermediate"
  },
  {
    id: 73,
    question: "Higher education routes into electrical careers include:",
    options: ["Only apprenticeships", "HNC, HND, and degree programmes in electrical/building services", "No higher education routes", "Only academic research"],
    correctAnswer: 1,
    explanation: "Higher education options include technician and engineer-level qualifications.",
    section: "7.3",
    difficulty: "intermediate"
  },
  {
    id: 74,
    question: "The difference between City & Guilds 2391-50 and 2391-52 is:",
    options: ["No difference", "2391-50 covers initial verification only, 2391-52 includes periodic inspection", "Only price", "Only duration"],
    correctAnswer: 1,
    explanation: "2391-50 covers initial verification; 2391-52 adds periodic inspection and testing.",
    section: "7.3",
    difficulty: "intermediate"
  },
  {
    id: 75,
    question: "Functional Skills requirements in apprenticeships cover:",
    options: ["Only electrical skills", "Maths, English, and sometimes ICT", "Only manual dexterity", "Only communication"],
    correctAnswer: 1,
    explanation: "Apprenticeships require Functional Skills in maths and English plus technical learning.",
    section: "7.3",
    difficulty: "basic"
  },
  {
    id: 76,
    question: "The EPA (End Point Assessment) in apprenticeships:",
    options: ["Is optional", "Is the final assessment confirming overall competence", "Only covers theory", "Can be repeated indefinitely"],
    correctAnswer: 1,
    explanation: "EPA is the mandatory final assessment confirming apprentices meet occupational standards.",
    section: "7.3",
    difficulty: "intermediate"
  },
  {
    id: 77,
    question: "Design qualifications in electrical engineering typically require:",
    options: ["Only practical experience", "Degree or equivalent in electrical engineering", "Only installation experience", "Only site supervision experience"],
    correctAnswer: 1,
    explanation: "Design roles typically require degree-level qualifications in electrical engineering.",
    section: "7.3",
    difficulty: "intermediate"
  },
  {
    id: 78,
    question: "Hazardous area qualifications (CompEx) are required for:",
    options: ["All electrical work", "Work in potentially explosive atmospheres", "Only offshore work", "Only chemical plants"],
    correctAnswer: 1,
    explanation: "CompEx certification is required for electrical work in hazardous (explosive atmosphere) locations.",
    section: "7.3",
    difficulty: "intermediate"
  },
  {
    id: 79,
    question: "LV (Low Voltage) switching authorisation typically requires:",
    options: ["No training", "Specific training and assessment by the employer", "Only watching a video", "Only general electrical qualification"],
    correctAnswer: 1,
    explanation: "Switching authorisation requires specific training and employer assessment of competence.",
    section: "7.3",
    difficulty: "intermediate"
  },
  {
    id: 80,
    question: "Assessment methods in electrical qualifications include:",
    options: ["Only written exams", "Written exams, practical assessments, and portfolio evidence", "Only observation", "Only verbal questions"],
    correctAnswer: 1,
    explanation: "Assessment combines multiple methods including written, practical, and work-based evidence.",
    section: "7.3",
    difficulty: "basic"
  },
  {
    id: 81,
    question: "IOSH or NEBOSH qualifications relate to:",
    options: ["Electrical installation", "Health and safety management", "Only fire safety", "Only manual handling"],
    correctAnswer: 1,
    explanation: "IOSH and NEBOSH provide health and safety management qualifications.",
    section: "7.3",
    difficulty: "intermediate"
  },
  {
    id: 82,
    question: "First Aid at Work certification is:",
    options: ["Never required", "Often required or beneficial for electrical workers", "Only for managers", "Only in hospitals"],
    correctAnswer: 1,
    explanation: "First aid training is valuable for responding to electrical incidents and site requirements.",
    section: "7.3",
    difficulty: "basic"
  },
  {
    id: 83,
    question: "CSCS cards for electricians require:",
    options: ["No test", "CITB Health, Safety and Environment test", "Only driving licence", "Only photo ID"],
    correctAnswer: 1,
    explanation: "CSCS cards require passing the CITB HSE test plus relevant trade qualification.",
    section: "7.3",
    difficulty: "basic"
  },
  {
    id: 84,
    question: "Continuing qualification relevance means:",
    options: ["Qualifications last forever", "Ongoing learning is needed as standards and technology change", "One qualification is sufficient", "Only regs updates matter"],
    correctAnswer: 1,
    explanation: "Electrical qualifications need updating as regulations and technology evolve.",
    section: "7.3",
    difficulty: "intermediate"
  },
  {
    id: 85,
    question: "Recognition of overseas qualifications typically requires:",
    options: ["Automatic acceptance", "Assessment against UK standards and possible bridging requirements", "Complete retraining always", "No recognition possible"],
    correctAnswer: 1,
    explanation: "Overseas qualifications are assessed against UK standards, with bridging where needed.",
    section: "7.3",
    difficulty: "intermediate"
  },
  {
    id: 86,
    question: "Specialist manufacturer training provides:",
    options: ["General qualifications", "Product-specific knowledge and installation competence", "Only warranty benefits", "No practical value"],
    correctAnswer: 1,
    explanation: "Manufacturer training provides specific knowledge for their products and systems.",
    section: "7.3",
    difficulty: "basic"
  },
  {
    id: 87,
    question: "The TOTUM or NUS card is relevant for electrical students as:",
    options: ["A qualification", "It provides student discounts during training", "A work ID", "A safety certificate"],
    correctAnswer: 1,
    explanation: "TOTUM/NUS provides student benefits and discounts during the learning period.",
    section: "7.3",
    difficulty: "basic"
  },
  {
    id: 88,
    question: "QCF (Qualifications and Credit Framework) levels indicate:",
    options: ["Only difficulty", "Complexity and achievement levels of qualifications", "Only duration", "Only cost"],
    correctAnswer: 1,
    explanation: "QCF levels indicate relative complexity and achievement - Level 3 is equivalent to A-level.",
    section: "7.3",
    difficulty: "intermediate"
  },
  {
    id: 89,
    question: "Apprenticeship standards define:",
    options: ["Only pay rates", "Knowledge, skills, and behaviours required for the occupation", "Only duration", "Only location"],
    correctAnswer: 1,
    explanation: "Standards set out the knowledge, skills, and behaviours apprentices must demonstrate.",
    section: "7.3",
    difficulty: "intermediate"
  },
  {
    id: 90,
    question: "Prior learning recognition (RPL) allows:",
    options: ["No shortcuts", "Credit for relevant previous learning and experience", "Avoiding all assessment", "Automatic qualification"],
    correctAnswer: 1,
    explanation: "RPL gives credit for previous relevant learning, reducing duplication in training.",
    section: "7.3",
    difficulty: "intermediate"
  },

  // Section 7.4: Career Pathways (Questions 91-120)
  {
    id: 91,
    question: "A typical career pathway for an electrician starts with:",
    options: ["Project management", "Apprenticeship or training programme", "Company ownership", "Design engineering"],
    correctAnswer: 1,
    explanation: "Most electricians begin with formal training through apprenticeship or college programmes.",
    section: "7.4",
    difficulty: "basic"
  },
  {
    id: 92,
    question: "After qualifying as an electrician, common progression includes:",
    options: ["Only staying at same level", "Specialisation, supervision, or technical roles", "Leaving the industry", "Only part-time work"],
    correctAnswer: 1,
    explanation: "Qualified electricians can progress to specialist, supervisory, or technical positions.",
    section: "7.4",
    difficulty: "basic"
  },
  {
    id: 93,
    question: "Becoming self-employed as an electrician requires:",
    options: ["No additional considerations", "Business skills, insurance, and scheme registration", "Only technical skills", "Government permission"],
    correctAnswer: 1,
    explanation: "Self-employment requires business management skills, appropriate insurance, and compliance with scheme requirements.",
    section: "7.4",
    difficulty: "intermediate"
  },
  {
    id: 94,
    question: "Moving into electrical contracting management typically requires:",
    options: ["Only technical skills", "Technical competence plus management and leadership skills", "Only business degree", "Only financial skills"],
    correctAnswer: 1,
    explanation: "Management combines technical knowledge with people management and business skills.",
    section: "7.4",
    difficulty: "intermediate"
  },
  {
    id: 95,
    question: "Specialising in renewable energy offers opportunities in:",
    options: ["Declining sector", "Growing sector with government support and demand", "Only research", "Only overseas"],
    correctAnswer: 1,
    explanation: "Renewable energy is a growing sector with strong government support and increasing demand.",
    section: "7.4",
    difficulty: "basic"
  },
  {
    id: 96,
    question: "Technical sales career paths utilise electrical knowledge by:",
    options: ["Abandoning technical skills", "Applying technical expertise to advise customers on products", "Only admin work", "Only warehouse work"],
    correctAnswer: 1,
    explanation: "Technical sales combines product knowledge with communication skills to help customers.",
    section: "7.4",
    difficulty: "intermediate"
  },
  {
    id: 97,
    question: "Moving into electrical training/education requires:",
    options: ["Only technical skills", "Technical competence plus teaching qualifications", "No assessment skills", "Only experience"],
    correctAnswer: 1,
    explanation: "Training roles need technical competence plus assessor and teaching qualifications.",
    section: "7.4",
    difficulty: "intermediate"
  },
  {
    id: 98,
    question: "Health and safety career paths from electrical background include:",
    options: ["No opportunities", "Safety advisor, CDM coordinator, or compliance roles", "Only first aid", "Only manual writing"],
    correctAnswer: 1,
    explanation: "Electrical experience can lead to broader H&S roles including CDM and compliance.",
    section: "7.4",
    difficulty: "intermediate"
  },
  {
    id: 99,
    question: "Estimating and quantity surveying in electrical contracting:",
    options: ["Requires no technical knowledge", "Benefits greatly from hands-on electrical experience", "Is only for accountants", "Is automated completely"],
    correctAnswer: 1,
    explanation: "Estimators with installation experience better understand work requirements and costs.",
    section: "7.4",
    difficulty: "intermediate"
  },
  {
    id: 100,
    question: "Building services engineering from an electrical background typically requires:",
    options: ["No further education", "Degree or higher qualification in building services", "Only site experience", "Only management training"],
    correctAnswer: 1,
    explanation: "Engineering roles typically require degree-level qualifications building on practical experience.",
    section: "7.4",
    difficulty: "intermediate"
  },
  {
    id: 101,
    question: "Facility management roles suit electricians because:",
    options: ["No technical knowledge needed", "Technical understanding helps manage building services", "Only cleaning is involved", "Only security matters"],
    correctAnswer: 1,
    explanation: "FM roles benefit from technical understanding of building electrical systems.",
    section: "7.4",
    difficulty: "intermediate"
  },
  {
    id: 102,
    question: "Starting your own electrical business requires consideration of:",
    options: ["Only technical skills", "Registration, insurance, accounts, marketing, and legal requirements", "Only tools", "Only transport"],
    correctAnswer: 1,
    explanation: "Business ownership requires comprehensive planning across registration, insurance, and operations.",
    section: "7.4",
    difficulty: "intermediate"
  },
  {
    id: 103,
    question: "Career progression in large contractors typically offers:",
    options: ["Limited opportunities", "Structured progression paths through grades and roles", "No training support", "Only manual work"],
    correctAnswer: 1,
    explanation: "Large contractors often have clear progression structures and training programmes.",
    section: "7.4",
    difficulty: "intermediate"
  },
  {
    id: 104,
    question: "International work opportunities for UK electricians include:",
    options: ["No opportunities exist", "Project work abroad, especially in similar regulatory environments", "Only EU countries", "Only Commonwealth"],
    correctAnswer: 1,
    explanation: "UK qualifications are recognised in many countries, particularly those with similar standards.",
    section: "7.4",
    difficulty: "intermediate"
  },
  {
    id: 105,
    question: "Consultancy work in electrical industry typically requires:",
    options: ["No experience", "Extensive experience and specialist knowledge", "Only first year experience", "Only academic qualification"],
    correctAnswer: 1,
    explanation: "Consultancy requires deep experience and expertise to advise clients effectively.",
    section: "7.4",
    difficulty: "intermediate"
  },
  {
    id: 106,
    question: "Quality management career paths suit electricians who:",
    options: ["Dislike detail", "Have attention to detail and understanding of standards", "Only want physical work", "Avoid documentation"],
    correctAnswer: 1,
    explanation: "QA roles suit those with attention to detail and understanding of compliance requirements.",
    section: "7.4",
    difficulty: "intermediate"
  },
  {
    id: 107,
    question: "Combining electrical work with IT/smart building systems offers:",
    options: ["Limited future", "Growing opportunities in building automation", "Only traditional work", "No career benefit"],
    correctAnswer: 1,
    explanation: "Integration of electrical and IT skills is increasingly valuable for smart building systems.",
    section: "7.4",
    difficulty: "intermediate"
  },
  {
    id: 108,
    question: "Union representation roles suit electricians who:",
    options: ["Dislike communication", "Want to support colleagues and negotiate on industry issues", "Only work alone", "Avoid meetings"],
    correctAnswer: 1,
    explanation: "Union roles suit those wanting to represent and support fellow workers.",
    section: "7.4",
    difficulty: "intermediate"
  },
  {
    id: 109,
    question: "Career change timing considerations include:",
    options: ["Only age", "Experience level, market conditions, and personal circumstances", "Only luck", "Only employer decisions"],
    correctAnswer: 1,
    explanation: "Career changes should consider multiple factors including experience and opportunities.",
    section: "7.4",
    difficulty: "intermediate"
  },
  {
    id: 110,
    question: "Work-life balance considerations in electrical careers:",
    options: ["Are irrelevant", "Should influence role choices and career direction", "Only matter for managers", "Don't affect career choice"],
    correctAnswer: 1,
    explanation: "Different electrical roles offer varying work patterns affecting life balance.",
    section: "7.4",
    difficulty: "intermediate"
  },
  {
    id: 111,
    question: "Portfolio careers combining employed and self-employed work:",
    options: ["Are not possible", "Offer flexibility and variety for some electricians", "Are illegal", "Only for retired workers"],
    correctAnswer: 1,
    explanation: "Some electricians successfully combine different work arrangements.",
    section: "7.4",
    difficulty: "intermediate"
  },
  {
    id: 112,
    question: "Mentoring roles for experienced electricians involve:",
    options: ["Only criticism", "Supporting development of less experienced colleagues", "Only administrative work", "No teaching element"],
    correctAnswer: 1,
    explanation: "Mentors share experience and support the development of others.",
    section: "7.4",
    difficulty: "intermediate"
  },
  {
    id: 113,
    question: "Career networking benefits include:",
    options: ["No real value", "Learning about opportunities and industry developments", "Only social events", "Only job hunting"],
    correctAnswer: 1,
    explanation: "Networking provides industry knowledge, opportunities, and professional connections.",
    section: "7.4",
    difficulty: "intermediate"
  },
  {
    id: 114,
    question: "Transitioning to office-based electrical roles may suit those who:",
    options: ["Want only physical work", "Want to reduce physical demands while using electrical knowledge", "Have no experience", "Dislike technology"],
    correctAnswer: 1,
    explanation: "Office roles like design or estimating use technical knowledge without physical demands.",
    section: "7.4",
    difficulty: "intermediate"
  },
  {
    id: 115,
    question: "Emergency and breakdown services offer:",
    options: ["Only regular hours", "Variable hours but often premium rates", "No career opportunities", "Only part-time work"],
    correctAnswer: 1,
    explanation: "Emergency services typically involve variable hours compensated by higher rates.",
    section: "7.4",
    difficulty: "intermediate"
  },
  {
    id: 116,
    question: "Sector specialisation (healthcare, data centres, etc.) can provide:",
    options: ["Limited opportunities", "Higher rates and consistent demand in specialist areas", "Only basic work", "No career benefit"],
    correctAnswer: 1,
    explanation: "Specialist sectors often offer premium rates and steady demand for expertise.",
    section: "7.4",
    difficulty: "intermediate"
  },
  {
    id: 117,
    question: "Geographic mobility in electrical careers:",
    options: ["Is never beneficial", "Can significantly increase opportunities and earnings", "Is always required", "Has no effect"],
    correctAnswer: 1,
    explanation: "Willingness to travel or relocate can open up more opportunities.",
    section: "7.4",
    difficulty: "intermediate"
  },
  {
    id: 118,
    question: "Later career options for electricians include:",
    options: ["Only retirement", "Consulting, training, inspection, or reduced-hours roles", "Only physical work", "No options available"],
    correctAnswer: 1,
    explanation: "Later careers can transition to less physical roles utilising accumulated experience.",
    section: "7.4",
    difficulty: "intermediate"
  },
  {
    id: 119,
    question: "Industry body involvement can benefit careers by:",
    options: ["Wasting time", "Providing networking, influence, and development opportunities", "Only committee meetings", "No career benefit"],
    correctAnswer: 1,
    explanation: "Industry body involvement provides connections and demonstrates professional commitment.",
    section: "7.4",
    difficulty: "intermediate"
  },
  {
    id: 120,
    question: "Career planning should consider:",
    options: ["Only current opportunities", "Personal goals, industry trends, and skill development needs", "Only employer wishes", "Only financial factors"],
    correctAnswer: 1,
    explanation: "Effective career planning balances personal aspirations with industry realities.",
    section: "7.4",
    difficulty: "intermediate"
  },

  // Section 7.5: CPD Requirements (Questions 121-145)
  {
    id: 121,
    question: "CPD stands for:",
    options: ["Company Performance Department", "Continuing Professional Development", "Current Professional Duties", "Central Power Distribution"],
    correctAnswer: 1,
    explanation: "CPD is Continuing Professional Development - ongoing learning to maintain competence.",
    section: "7.5",
    difficulty: "basic"
  },
  {
    id: 122,
    question: "CPD in the electrical industry is important because:",
    options: ["It has no value", "Technology and regulations constantly change", "Only for promotion", "Only for managers"],
    correctAnswer: 1,
    explanation: "CPD keeps electricians current with evolving technology, regulations, and best practices.",
    section: "7.5",
    difficulty: "basic"
  },
  {
    id: 123,
    question: "ECS card renewal typically requires:",
    options: ["Only payment", "Evidence of CPD activities", "No requirements", "Only retaking exams"],
    correctAnswer: 1,
    explanation: "ECS card renewal requires demonstrating ongoing professional development.",
    section: "7.5",
    difficulty: "intermediate"
  },
  {
    id: 124,
    question: "Valid CPD activities include:",
    options: ["Only formal courses", "Training, reading, conferences, and practical skill development", "Only manufacturer training", "Only online learning"],
    correctAnswer: 1,
    explanation: "CPD can include various activities: formal training, self-study, conferences, and on-job learning.",
    section: "7.5",
    difficulty: "basic"
  },
  {
    id: 125,
    question: "When BS 7671 is amended, electricians should:",
    options: ["Ignore changes", "Update their knowledge through appropriate training", "Wait for employer to arrange", "Only update after several years"],
    correctAnswer: 1,
    explanation: "Regulation changes require prompt updating of knowledge to maintain competence.",
    section: "7.5",
    difficulty: "basic"
  },
  {
    id: 126,
    question: "CPD records should include:",
    options: ["Nothing specific", "Details of activities, dates, and learning outcomes", "Only certificates", "Only employer records"],
    correctAnswer: 1,
    explanation: "CPD records should document what was learned, when, and how it applies to work.",
    section: "7.5",
    difficulty: "intermediate"
  },
  {
    id: 127,
    question: "Employer support for CPD typically includes:",
    options: ["Nothing", "Training budgets, time allowance, and development planning", "Only criticism", "Only mandatory training"],
    correctAnswer: 1,
    explanation: "Good employers provide resources and time for professional development.",
    section: "7.5",
    difficulty: "intermediate"
  },
  {
    id: 128,
    question: "Online learning for CPD offers:",
    options: ["No valid learning", "Flexible access to training at convenient times", "Only basic content", "No certification possible"],
    correctAnswer: 1,
    explanation: "Online learning provides flexible CPD options that can fit around work schedules.",
    section: "7.5",
    difficulty: "basic"
  },
  {
    id: 129,
    question: "Manufacturer product training contributes to CPD by:",
    options: ["Having no value", "Providing specific knowledge for products installed", "Only sales benefit", "Only warranty benefit"],
    correctAnswer: 1,
    explanation: "Manufacturer training ensures competent installation of their products.",
    section: "7.5",
    difficulty: "basic"
  },
  {
    id: 130,
    question: "Reading technical publications counts as CPD when:",
    options: ["Never", "It contributes to professional knowledge and is documented", "Only peer-reviewed journals", "Only if employer requires"],
    correctAnswer: 1,
    explanation: "Self-directed reading contributes to CPD when it develops professional knowledge.",
    section: "7.5",
    difficulty: "intermediate"
  },
  {
    id: 131,
    question: "Trade exhibitions and conferences provide CPD through:",
    options: ["Only free samples", "Seminars, demonstrations, and networking", "Only socialising", "No learning value"],
    correctAnswer: 1,
    explanation: "Industry events offer learning through presentations, product demos, and peer exchange.",
    section: "7.5",
    difficulty: "intermediate"
  },
  {
    id: 132,
    question: "Informal workplace learning can count as CPD if:",
    options: ["Never", "It develops skills and is reflected upon and recorded", "Only formal training counts", "Only with certification"],
    correctAnswer: 1,
    explanation: "On-job learning counts as CPD when it contributes to development and is documented.",
    section: "7.5",
    difficulty: "intermediate"
  },
  {
    id: 133,
    question: "CPD planning should consider:",
    options: ["Only employer requirements", "Career goals, skill gaps, and industry developments", "Only mandatory updates", "Only free courses"],
    correctAnswer: 1,
    explanation: "Effective CPD planning addresses personal development needs and career objectives.",
    section: "7.5",
    difficulty: "intermediate"
  },
  {
    id: 134,
    question: "Professional body membership often includes CPD requirements of:",
    options: ["No specific hours", "Minimum annual hours of recorded development", "Only optional recommendations", "Unlimited requirements"],
    correctAnswer: 1,
    explanation: "Professional bodies typically require minimum documented CPD hours for membership.",
    section: "7.5",
    difficulty: "intermediate"
  },
  {
    id: 135,
    question: "Reflection on learning experiences helps CPD by:",
    options: ["Wasting time", "Identifying what was learned and how to apply it", "Only creating paperwork", "No practical value"],
    correctAnswer: 1,
    explanation: "Reflection helps consolidate learning and identify how to apply new knowledge.",
    section: "7.5",
    difficulty: "intermediate"
  },
  {
    id: 136,
    question: "CPD audits by professional bodies:",
    options: ["Never happen", "Check members maintain their development commitments", "Only for complaints", "Only at registration"],
    correctAnswer: 1,
    explanation: "Bodies audit CPD records to ensure members maintain professional standards.",
    section: "7.5",
    difficulty: "intermediate"
  },
  {
    id: 137,
    question: "Teaching or presenting to others counts as CPD because:",
    options: ["It doesn't count", "It requires preparation and deepens understanding", "Only formal teaching counts", "Only if paid"],
    correctAnswer: 1,
    explanation: "Teaching requires mastery of subject matter and contributes to professional development.",
    section: "7.5",
    difficulty: "intermediate"
  },
  {
    id: 138,
    question: "Toolbox talks on site can contribute to CPD when:",
    options: ["Never", "They address relevant technical or safety topics", "Only if externally certified", "Only for supervisors"],
    correctAnswer: 1,
    explanation: "Workplace briefings on relevant topics contribute to ongoing professional knowledge.",
    section: "7.5",
    difficulty: "intermediate"
  },
  {
    id: 139,
    question: "Structured CPD typically requires:",
    options: ["Random activities", "Planned activities aligned with development needs", "Only employer direction", "Only formal qualifications"],
    correctAnswer: 1,
    explanation: "Structured CPD involves planned activities addressing identified development needs.",
    section: "7.5",
    difficulty: "intermediate"
  },
  {
    id: 140,
    question: "CPD benefits employers by:",
    options: ["Increasing costs only", "Maintaining skilled workforce current with developments", "Only employee benefit", "No business benefit"],
    correctAnswer: 1,
    explanation: "CPD ensures workforce competence, benefiting quality, compliance, and reputation.",
    section: "7.5",
    difficulty: "intermediate"
  },
  {
    id: 141,
    question: "Self-assessment in CPD helps identify:",
    options: ["Only strengths", "Both strengths and areas for development", "Only weaknesses", "Nothing useful"],
    correctAnswer: 1,
    explanation: "Self-assessment identifies strengths to build on and gaps requiring development.",
    section: "7.5",
    difficulty: "intermediate"
  },
  {
    id: 142,
    question: "Technical webinars and podcasts can provide CPD if:",
    options: ["Never valid", "They address professional topics and learning is documented", "Only if very long", "Only from specific providers"],
    correctAnswer: 1,
    explanation: "Digital content contributes to CPD when it develops professional knowledge.",
    section: "7.5",
    difficulty: "intermediate"
  },
  {
    id: 143,
    question: "Mentoring activities contribute to CPD for:",
    options: ["Only the mentee", "Both mentor and mentee", "Neither party", "Only senior staff"],
    correctAnswer: 1,
    explanation: "Mentoring develops skills for both parties through sharing and reflection.",
    section: "7.5",
    difficulty: "intermediate"
  },
  {
    id: 144,
    question: "Cross-training in related disciplines provides CPD by:",
    options: ["Being irrelevant", "Broadening knowledge and understanding of integrated systems", "Only distracting from core skills", "Only if certified"],
    correctAnswer: 1,
    explanation: "Understanding related disciplines improves overall professional capability.",
    section: "7.5",
    difficulty: "intermediate"
  },
  {
    id: 145,
    question: "Maintaining a CPD portfolio demonstrates:",
    options: ["Nothing important", "Commitment to professional standards and ongoing development", "Only bureaucracy", "Only for inspections"],
    correctAnswer: 1,
    explanation: "A CPD portfolio demonstrates professional commitment and tracks development progress.",
    section: "7.5",
    difficulty: "intermediate"
  },

  // Section 7.6: Professional Bodies (Questions 146-170)
  {
    id: 146,
    question: "The IET (Institution of Engineering and Technology) is:",
    options: ["A trade union", "A professional body for engineers and technicians", "A government department", "An insurance company"],
    correctAnswer: 1,
    explanation: "The IET is the professional body for engineering and technology professionals.",
    section: "7.6",
    difficulty: "basic"
  },
  {
    id: 147,
    question: "IET membership levels include:",
    options: ["Only full membership", "Student, Technician, Member, and Fellow grades", "Only engineering grades", "Only academic levels"],
    correctAnswer: 1,
    explanation: "IET has various membership grades reflecting different qualification and experience levels.",
    section: "7.6",
    difficulty: "intermediate"
  },
  {
    id: 148,
    question: "The ECA (Electrical Contractors Association) is:",
    options: ["A qualification body", "A trade association for electrical contractors", "A testing organisation", "A government regulator"],
    correctAnswer: 1,
    explanation: "ECA is a trade association representing electrical contractors and promoting standards.",
    section: "7.6",
    difficulty: "basic"
  },
  {
    id: 149,
    question: "SELECT in Scotland is:",
    options: ["A software company", "The trade association for Scottish electrical contractors", "A testing centre", "A training provider only"],
    correctAnswer: 1,
    explanation: "SELECT represents electrical contractors in Scotland, similar to ECA in England.",
    section: "7.6",
    difficulty: "intermediate"
  },
  {
    id: 150,
    question: "Unite the Union represents electricians by:",
    options: ["Setting technical standards", "Negotiating terms and conditions and supporting members", "Issuing qualifications", "Inspecting work"],
    correctAnswer: 1,
    explanation: "Unite represents workers in negotiations and provides member support services.",
    section: "7.6",
    difficulty: "basic"
  },
  {
    id: 151,
    question: "NICEIC is primarily:",
    options: ["A trade union", "An approved body for electrical contractor registration", "A qualification awarding body", "A manufacturers association"],
    correctAnswer: 1,
    explanation: "NICEIC registers and assesses electrical contractors as an approved body.",
    section: "7.6",
    difficulty: "basic"
  },
  {
    id: 152,
    question: "Benefits of professional body membership include:",
    options: ["Only social events", "Recognition, networking, resources, and professional development", "Only discounts", "Only insurance"],
    correctAnswer: 1,
    explanation: "Membership provides professional recognition, networking, and development resources.",
    section: "7.6",
    difficulty: "intermediate"
  },
  {
    id: 153,
    question: "NAPIT provides:",
    options: ["Only training", "Competent person scheme registration and assessment", "Only certification", "Only insurance"],
    correctAnswer: 1,
    explanation: "NAPIT is a competent person scheme provider for various technical sectors.",
    section: "7.6",
    difficulty: "intermediate"
  },
  {
    id: 154,
    question: "Chartered Engineer (CEng) status requires:",
    options: ["Only experience", "Degree-level qualification plus professional development review", "Only membership fees", "Only practical skills"],
    correctAnswer: 1,
    explanation: "CEng requires appropriate qualifications plus professional competence demonstration.",
    section: "7.6",
    difficulty: "intermediate"
  },
  {
    id: 155,
    question: "Engineering Technician (EngTech) registration is suitable for:",
    options: ["Only graduates", "Electricians with Level 3 qualifications and experience", "Only designers", "Only managers"],
    correctAnswer: 1,
    explanation: "EngTech recognises technician-level competence with Level 3 qualifications.",
    section: "7.6",
    difficulty: "intermediate"
  },
  {
    id: 156,
    question: "ELECSA operates as:",
    options: ["A trade union", "A competent person scheme for electrical work", "A qualification body", "A manufacturer"],
    correctAnswer: 1,
    explanation: "ELECSA provides competent person scheme registration for electrical contractors.",
    section: "7.6",
    difficulty: "intermediate"
  },
  {
    id: 157,
    question: "Professional body codes of conduct require members to:",
    options: ["Only pay fees", "Maintain standards and act professionally", "Only attend meetings", "Only pass exams"],
    correctAnswer: 1,
    explanation: "Members must adhere to professional standards and ethical requirements.",
    section: "7.6",
    difficulty: "intermediate"
  },
  {
    id: 158,
    question: "The Construction Industry Council (CIC) includes:",
    options: ["Only civil engineers", "Multiple professional bodies including electrical sector representatives", "Only architects", "Only surveyors"],
    correctAnswer: 1,
    explanation: "CIC represents construction sector professional bodies including those for electrical.",
    section: "7.6",
    difficulty: "intermediate"
  },
  {
    id: 159,
    question: "JIB-SJIB relationship with professional registration is:",
    options: ["Unrelated", "JIB grades support evidence for professional registration", "JIB replaces professional registration", "Only administrative"],
    correctAnswer: 1,
    explanation: "JIB grades and experience support applications for professional registration.",
    section: "7.6",
    difficulty: "intermediate"
  },
  {
    id: 160,
    question: "Membership of multiple organisations is:",
    options: ["Prohibited", "Common and can provide different benefits", "Only for managers", "Only for trainers"],
    correctAnswer: 1,
    explanation: "Many professionals belong to multiple organisations for different benefits.",
    section: "7.6",
    difficulty: "intermediate"
  },
  {
    id: 161,
    question: "Professional indemnity benefits through organisation membership:",
    options: ["Are never provided", "May be available through some memberships", "Replace all insurance", "Are mandatory"],
    correctAnswer: 1,
    explanation: "Some organisations provide or facilitate professional indemnity cover for members.",
    section: "7.6",
    difficulty: "intermediate"
  },
  {
    id: 162,
    question: "Technical guidance and publications from professional bodies:",
    options: ["Have no value", "Provide authoritative guidance on standards and practice", "Are only for students", "Cost extra always"],
    correctAnswer: 1,
    explanation: "Professional bodies produce valuable technical guidance and publications.",
    section: "7.6",
    difficulty: "intermediate"
  },
  {
    id: 163,
    question: "Professional registration demonstrates:",
    options: ["Only payment ability", "Competence recognised against national standards", "Only academic achievement", "Only experience length"],
    correctAnswer: 1,
    explanation: "Registration recognises competence against nationally recognised standards.",
    section: "7.6",
    difficulty: "intermediate"
  },
  {
    id: 164,
    question: "Disciplinary procedures of professional bodies:",
    options: ["Don't exist", "Address complaints about member conduct", "Only apply to employers", "Only for criminal matters"],
    correctAnswer: 1,
    explanation: "Professional bodies have procedures to address complaints about member conduct.",
    section: "7.6",
    difficulty: "intermediate"
  },
  {
    id: 165,
    question: "Advocacy by professional bodies involves:",
    options: ["Only legal representation", "Representing industry interests to government and regulators", "Only individual support", "Only social events"],
    correctAnswer: 1,
    explanation: "Bodies advocate for the industry in policy discussions and regulatory consultations.",
    section: "7.6",
    difficulty: "intermediate"
  },
  {
    id: 166,
    question: "Early career membership of professional bodies:",
    options: ["Has no benefit", "Provides development support and networking from the start", "Is too expensive", "Only for university graduates"],
    correctAnswer: 1,
    explanation: "Early membership provides support and connections from career start.",
    section: "7.6",
    difficulty: "intermediate"
  },
  {
    id: 167,
    question: "Regional branches of professional bodies offer:",
    options: ["Only social events", "Local networking, events, and professional support", "Nothing of value", "Only committee meetings"],
    correctAnswer: 1,
    explanation: "Local branches provide accessible networking and professional events.",
    section: "7.6",
    difficulty: "intermediate"
  },
  {
    id: 168,
    question: "Volunteering with professional bodies provides:",
    options: ["Only unpaid work", "Development opportunities and industry influence", "No career benefit", "Only administrative burden"],
    correctAnswer: 1,
    explanation: "Volunteering develops skills and provides networking and influence opportunities.",
    section: "7.6",
    difficulty: "intermediate"
  },
  {
    id: 169,
    question: "Professional body awards and recognition programmes:",
    options: ["Are meaningless", "Recognise excellence and raise professional profile", "Only for large companies", "Only political"],
    correctAnswer: 1,
    explanation: "Awards recognise excellence and can enhance professional reputation.",
    section: "7.6",
    difficulty: "intermediate"
  },
  {
    id: 170,
    question: "Digital resources provided by professional bodies include:",
    options: ["Nothing online", "Online learning, forums, and technical databases", "Only social media", "Only email newsletters"],
    correctAnswer: 1,
    explanation: "Modern bodies provide extensive digital resources for member development.",
    section: "7.6",
    difficulty: "intermediate"
  },

  // Section 7.7: Business Skills (Questions 171-200)
  {
    id: 171,
    question: "Customer service skills are important for electricians because:",
    options: ["They're irrelevant to electrical work", "Good service leads to recommendations and repeat business", "Only managers need them", "Only in retail"],
    correctAnswer: 1,
    explanation: "Customer satisfaction drives referrals and reputation, essential for career success.",
    section: "7.7",
    difficulty: "basic"
  },
  {
    id: 172,
    question: "Effective communication with clients includes:",
    options: ["Only technical jargon", "Clear explanations, listening, and managing expectations", "Only written reports", "Only formal language"],
    correctAnswer: 1,
    explanation: "Good communication involves clear explanation and understanding client needs.",
    section: "7.7",
    difficulty: "basic"
  },
  {
    id: 173,
    question: "Time management for electricians affects:",
    options: ["Only personal life", "Productivity, profitability, and customer satisfaction", "Nothing important", "Only large projects"],
    correctAnswer: 1,
    explanation: "Effective time management improves efficiency and customer satisfaction.",
    section: "7.7",
    difficulty: "intermediate"
  },
  {
    id: 174,
    question: "Quoting and estimating skills enable electricians to:",
    options: ["Guess at prices", "Accurately price work for profitability", "Avoid responsibility", "Only work for others"],
    correctAnswer: 1,
    explanation: "Accurate quoting ensures fair pricing and sustainable business operation.",
    section: "7.7",
    difficulty: "intermediate"
  },
  {
    id: 175,
    question: "Basic accounting knowledge helps electricians understand:",
    options: ["Nothing useful", "Profit, costs, and financial health of their work", "Only tax returns", "Only VAT"],
    correctAnswer: 1,
    explanation: "Financial understanding is essential for running profitable work or business.",
    section: "7.7",
    difficulty: "intermediate"
  },
  {
    id: 176,
    question: "Marketing for electrical services includes:",
    options: ["Only expensive advertising", "Word of mouth, online presence, and professional reputation", "Only for large companies", "Only door-to-door sales"],
    correctAnswer: 1,
    explanation: "Effective marketing combines reputation, presence, and customer recommendations.",
    section: "7.7",
    difficulty: "intermediate"
  },
  {
    id: 177,
    question: "Handling complaints professionally:",
    options: ["Should be avoided", "Can turn negative situations into positive outcomes", "Only makes things worse", "Is only for managers"],
    correctAnswer: 1,
    explanation: "Professional complaint handling can restore relationships and improve reputation.",
    section: "7.7",
    difficulty: "intermediate"
  },
  {
    id: 178,
    question: "Negotiation skills help electricians to:",
    options: ["Only argue with clients", "Reach fair agreements with customers and suppliers", "Avoid all discussion", "Only reduce prices"],
    correctAnswer: 1,
    explanation: "Negotiation achieves fair outcomes for all parties in business relationships.",
    section: "7.7",
    difficulty: "intermediate"
  },
  {
    id: 179,
    question: "Self-employed electricians need to understand:",
    options: ["Only electrical regulations", "Tax, insurance, and business legal requirements", "Only installation work", "Only customer service"],
    correctAnswer: 1,
    explanation: "Self-employment requires understanding of tax, insurance, and legal compliance.",
    section: "7.7",
    difficulty: "intermediate"
  },
  {
    id: 180,
    question: "Record keeping for electrical work should include:",
    options: ["Only certificates", "Job details, materials, time, and financial records", "Only complaints", "Only positive feedback"],
    correctAnswer: 1,
    explanation: "Comprehensive records support business operation, compliance, and dispute resolution.",
    section: "7.7",
    difficulty: "intermediate"
  },
  {
    id: 181,
    question: "Professional appearance and presentation:",
    options: ["Doesn't matter", "Affects customer confidence and professional image", "Is only for interviews", "Only for sales roles"],
    correctAnswer: 1,
    explanation: "Professional presentation builds customer confidence and trust.",
    section: "7.7",
    difficulty: "basic"
  },
  {
    id: 182,
    question: "Digital skills for modern electricians include:",
    options: ["Only email", "Using apps, software, and digital tools for efficiency", "Only social media", "Nothing technical"],
    correctAnswer: 1,
    explanation: "Digital tools improve efficiency in quoting, scheduling, and customer communication.",
    section: "7.7",
    difficulty: "intermediate"
  },
  {
    id: 183,
    question: "Building long-term customer relationships:",
    options: ["Has no value", "Provides steady work and referrals", "Only benefits customers", "Is impossible in electrical work"],
    correctAnswer: 1,
    explanation: "Long-term relationships provide reliable income and recommendation network.",
    section: "7.7",
    difficulty: "intermediate"
  },
  {
    id: 184,
    question: "Problem-solving skills in electrical work extend to:",
    options: ["Only technical issues", "Technical, customer, and business challenges", "Only major faults", "Only design problems"],
    correctAnswer: 1,
    explanation: "Problem-solving applies to technical, interpersonal, and business situations.",
    section: "7.7",
    difficulty: "intermediate"
  },
  {
    id: 185,
    question: "Understanding contracts and terms helps electricians to:",
    options: ["Avoid all paperwork", "Protect themselves and deliver what's agreed", "Only large contracts matter", "Leave all to solicitors"],
    correctAnswer: 1,
    explanation: "Contract understanding protects interests and ensures clear agreements.",
    section: "7.7",
    difficulty: "intermediate"
  },
  {
    id: 186,
    question: "Invoice presentation should be:",
    options: ["Informal and brief", "Clear, professional, and detailed appropriately", "Only verbal", "Only at year end"],
    correctAnswer: 1,
    explanation: "Professional invoices support timely payment and business credibility.",
    section: "7.7",
    difficulty: "intermediate"
  },
  {
    id: 187,
    question: "Managing cash flow is important because:",
    options: ["It isn't important", "Even profitable businesses can fail without cash", "Only for large companies", "Only accountants need to understand"],
    correctAnswer: 1,
    explanation: "Cash flow management ensures ability to meet obligations regardless of profitability.",
    section: "7.7",
    difficulty: "intermediate"
  },
  {
    id: 188,
    question: "Supplier relationships affect business by:",
    options: ["Having no impact", "Influencing prices, availability, and support received", "Only for large orders", "Only being administrative"],
    correctAnswer: 1,
    explanation: "Good supplier relationships provide better prices, availability, and support.",
    section: "7.7",
    difficulty: "intermediate"
  },
  {
    id: 189,
    question: "Site and project coordination skills enable electricians to:",
    options: ["Only work alone", "Work effectively with other trades and stakeholders", "Avoid all meetings", "Only follow instructions"],
    correctAnswer: 1,
    explanation: "Coordination skills ensure smooth integration with other project participants.",
    section: "7.7",
    difficulty: "intermediate"
  },
  {
    id: 190,
    question: "Risk management in electrical business includes:",
    options: ["Only safety risks", "Financial, reputational, and operational risks", "Only insurance", "Only large projects"],
    correctAnswer: 1,
    explanation: "Business risk management covers financial, operational, and reputational considerations.",
    section: "7.7",
    difficulty: "intermediate"
  },
  {
    id: 191,
    question: "Stress management is important in electrical work because:",
    options: ["The work is never stressful", "Deadlines, complexity, and responsibility can create pressure", "Only for managers", "Only for safety critical work"],
    correctAnswer: 1,
    explanation: "Managing stress maintains wellbeing and performance under pressure.",
    section: "7.7",
    difficulty: "intermediate"
  },
  {
    id: 192,
    question: "Leadership skills benefit electricians by:",
    options: ["Only in management roles", "Supporting team working and project success at all levels", "Creating conflict", "Only for supervisors"],
    correctAnswer: 1,
    explanation: "Leadership skills improve team effectiveness regardless of formal position.",
    section: "7.7",
    difficulty: "intermediate"
  },
  {
    id: 193,
    question: "Continuous improvement mindset means:",
    options: ["Constant criticism", "Always looking for ways to improve work and service", "Never being satisfied", "Only for managers"],
    correctAnswer: 1,
    explanation: "Continuous improvement drives better quality, efficiency, and customer satisfaction.",
    section: "7.7",
    difficulty: "intermediate"
  },
  {
    id: 194,
    question: "Understanding insurance requirements includes:",
    options: ["Avoiding all insurance", "Public liability, employer's liability, and professional indemnity", "Only vehicle insurance", "Only building insurance"],
    correctAnswer: 1,
    explanation: "Appropriate insurance protects against various business and professional risks.",
    section: "7.7",
    difficulty: "intermediate"
  },
  {
    id: 195,
    question: "Adaptability in the electrical industry helps with:",
    options: ["Nothing specific", "Responding to changing technology and market conditions", "Only weather changes", "Only schedule changes"],
    correctAnswer: 1,
    explanation: "Adaptability enables response to industry evolution and changing client needs.",
    section: "7.7",
    difficulty: "intermediate"
  },
  {
    id: 196,
    question: "Decision-making skills for electricians involve:",
    options: ["Always asking others", "Balancing technical, practical, and business factors", "Only technical decisions", "Avoiding all decisions"],
    correctAnswer: 1,
    explanation: "Good decision-making balances multiple factors for optimal outcomes.",
    section: "7.7",
    difficulty: "intermediate"
  },
  {
    id: 197,
    question: "Quality focus in electrical work means:",
    options: ["Only passing inspection", "Consistently delivering work that meets or exceeds standards", "Only expensive materials", "Only new installations"],
    correctAnswer: 1,
    explanation: "Quality focus ensures consistent delivery of compliant, well-executed work.",
    section: "7.7",
    difficulty: "intermediate"
  },
  {
    id: 198,
    question: "Ethics in electrical business includes:",
    options: ["Only legal compliance", "Honesty, fair dealing, and professional integrity", "Only technical standards", "Only customer service"],
    correctAnswer: 1,
    explanation: "Ethical practice builds trust and sustainable business relationships.",
    section: "7.7",
    difficulty: "intermediate"
  },
  {
    id: 199,
    question: "Networking and relationship building:",
    options: ["Is only socialising", "Creates opportunities and support networks", "Only benefits salespeople", "Is a waste of time"],
    correctAnswer: 1,
    explanation: "Professional networks provide opportunities, support, and industry connections.",
    section: "7.7",
    difficulty: "intermediate"
  },
  {
    id: 200,
    question: "Personal development planning should:",
    options: ["Be ignored", "Identify goals and actions for career advancement", "Only be done by employers", "Focus only on technical skills"],
    correctAnswer: 1,
    explanation: "Personal planning drives career development through identified goals and actions.",
    section: "7.7",
    difficulty: "intermediate"
  }
];

// Helper function to get random questions for mock exams
export const getRandomQuestions = (count: number): Question[] => {
  const shuffled = [...module7Questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// Helper function to get questions by section
export const getQuestionsBySection = (section: string): Question[] => {
  return module7Questions.filter(q => q.section === section);
};

// Helper function to get questions by difficulty
export const getQuestionsByDifficulty = (difficulty: 'basic' | 'intermediate' | 'advanced'): Question[] => {
  return module7Questions.filter(q => q.difficulty === difficulty);
};

export default module7Questions;
