import { QuizQuestion } from '@/types/quiz';

export const emergencyLightingModule6Section2QuizData: QuizQuestion[] = [
  {
    id: 1,
    question: "What legislation governs emergency lighting responsibilities in the UK?",
    options: [
      "Health and Safety at Work Act 1974",
      "Regulatory Reform (Fire Safety) Order 2005",
      "BS 7671 Wiring Regulations",
      "Building Regulations Approved Document M"
    ],
    correctAnswer: 1,
    explanation: "The Regulatory Reform (Fire Safety) Order 2005 (RRO) is the primary legislation governing fire safety, including emergency lighting, in England and Wales. It places legal duties on the Responsible Person to ensure adequate emergency lighting for safe evacuation. Similar legislation applies in Scotland (Fire Scotland Act 2005) and Northern Ireland (Fire Safety Regulations NI 2010)."
  },
  {
    id: 2,
    question: "Who is defined as the Responsible Person under the Fire Safety Order?",
    options: [
      "Only the building owner",
      "The person having control of the premises (employer, owner, landlord, or delegated manager)",
      "The emergency lighting installer",
      "The local fire authority"
    ],
    correctAnswer: 1,
    explanation: "Article 3 of the RRO defines the Responsible Person as whoever has control of the premises. This is typically the employer (for workplaces), building owner, landlord, or a formally delegated facilities manager. In complex buildings, multiple people may share Responsible Person duties. The duty cannot be completely delegated away — ultimate accountability remains with the person who has control."
  },
  {
    id: 3,
    question: "Why must emergency lighting activate independently of the fire alarm system?",
    options: [
      "Because it's easier to install",
      "Because power failure may occur without fire, and fire may occur without triggering alarms immediately",
      "To reduce installation costs",
      "Because fire alarms are not reliable"
    ],
    correctAnswer: 1,
    explanation: "Emergency lighting must operate independently because power failures can occur without fire (electrical faults, maintenance, power cuts), and fires may not trigger alarms immediately (slow-developing fires, detector failures). Emergency lighting must protect during all evacuation scenarios, not just confirmed fires. Systems may share control interfaces for coordination, but must have separate, independent power supplies to ensure reliability."
  },
  {
    id: 4,
    question: "Which location must always be illuminated as part of the fire strategy?",
    options: [
      "Staff rest areas",
      "Car parks",
      "Fire alarm control panels and fire-fighting equipment",
      "Landscaped areas"
    ],
    correctAnswer: 2,
    explanation: "Fire alarm control panels and fire-fighting equipment (extinguishers, hose reels, call points) must always be illuminated with minimum 5 lux. This enables fire wardens and fire service personnel to operate equipment, read panel indicators, and manage the emergency effectively even during power failure. Escape routes and final exits are also critical, along with refuges for disabled evacuation."
  },
  {
    id: 5,
    question: "What document determines the specific emergency lighting requirements for a building?",
    options: [
      "The building's architectural drawings only",
      "The fire risk assessment (FRA) conducted under the Fire Safety Order",
      "The electrical contractor's experience and judgment",
      "Insurance company recommendations"
    ],
    correctAnswer: 1,
    explanation: "The fire risk assessment (FRA), required under Article 9 of the RRO, determines specific emergency lighting requirements. The FRA evaluates building type, occupancy, evacuation complexity, vulnerable persons, and fire hazards to establish what provision is 'suitable and sufficient.' Emergency lighting design must align with FRA findings. BS 5266-1 and EN 1838 then define how to achieve the required provision technically."
  },
  {
    id: 6,
    question: "What authority enforces compliance with fire safety regulations in England and Wales?",
    options: [
      "HSE (Health and Safety Executive)",
      "Local Building Control",
      "Fire and Rescue Authorities (local Fire and Rescue Services)",
      "Trading Standards"
    ],
    correctAnswer: 2,
    explanation: "Fire and Rescue Authorities (FRAs) — typically local Fire and Rescue Services — enforce the RRO in England and Wales. Fire Safety Officers have powers to enter premises, inspect fire precautions, request documentation, issue Enforcement Notices and Prohibition Notices, and prosecute non-compliance. Similar arrangements exist in Scotland and Northern Ireland under their respective legislation."
  },
  {
    id: 7,
    question: "Which three records will fire inspectors typically request during an audit?",
    options: [
      "Employee contracts, payroll records, and business insurance",
      "Architectural drawings, furniture layouts, and colour schemes",
      "Fire risk assessment, emergency lighting test records, and installation certificates",
      "Supplier invoices, product warranties, and delivery notes"
    ],
    correctAnswer: 2,
    explanation: "Fire inspectors routinely request: (1) the current fire risk assessment showing emergency lighting provision; (2) test records and logbooks (monthly tests, annual discharge tests per BS 5266-8); and (3) installation certificates and commissioning documents proving system compliance with BS 5266-1. Additional documents may include as-built drawings, maintenance contracts, and fire evacuation procedures. Missing documentation is treated as non-compliance."
  },
  {
    id: 8,
    question: "Why is it essential to link emergency lighting drawings with the fire strategy?",
    options: [
      "To make the drawings look more professional",
      "Because fire authorities require it, and it proves integration with evacuation strategy",
      "To reduce design time",
      "To satisfy insurance companies only"
    ],
    correctAnswer: 1,
    explanation: "Linking emergency lighting drawings with the Fire Safety Strategy demonstrates that lighting provision supports the documented evacuation methodology. Fire authorities need to verify that lighting coverage aligns with designated escape routes, supports staged or simultaneous evacuation as appropriate, and integrates with other fire precautions. Without documented integration, compliance cannot be verified even if the physical system works. The Manchester retail complex case study demonstrated this: adequate lighting failed audit due to missing fire strategy integration."
  },
  {
    id: 9,
    question: "What penalty can occur for failing to maintain compliant emergency lighting?",
    options: [
      "A polite warning letter only",
      "Unlimited fines, imprisonment up to 2 years, Prohibition Notices closing premises, and potential corporate manslaughter charges",
      "A small fixed penalty notice",
      "No penalties — it's only a guideline"
    ],
    correctAnswer: 1,
    explanation: "The RRO carries serious penalties: Magistrates' Court fines up to £5,000 per offence, Crown Court unlimited fines (£250,000+ in serious cases), imprisonment up to 2 years, Prohibition Notices immediately closing premises, Enforcement Notices requiring works, and potential Corporate Manslaughter charges if death results from gross negligence. Recent prosecutions have resulted in substantial fines, directors receiving suspended prison sentences, and businesses closed. Compliance is not optional — it's a criminal legal requirement."
  },
  {
    id: 10,
    question: "What was the compliance issue in the Manchester retail complex case study?",
    options: [
      "The lights didn't work at all",
      "The system achieved adequate lighting but documentation wasn't integrated with the fire safety strategy",
      "The wrong type of luminaires were installed",
      "The duration was too short"
    ],
    correctAnswer: 1,
    explanation: "The Manchester retail complex case study highlighted that the emergency lighting system functioned correctly and passed commissioning tests, but documentation was not included in the site's Fire Safety Strategy folder. Despite adequate physical performance, fire inspectors classified the system as non-compliant because integration could not be demonstrated. This resulted in an Enforcement Notice, £15,200 in fines and costs, and expensive retrospective documentation. The lesson: documentation of integration is as critical as correct installation."
  }
];
