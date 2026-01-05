import { QuizQuestion } from '@/types/quiz';

export const emergencyLightingModule5Section5QuizData: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the main purpose of emergency lighting certification?",
    options: [
      "To prove the system is physically installed",
      "To provide legal documentation that the system meets recognised standards and establish professional accountability",
      "To create paperwork for the client",
      "To satisfy the contractor's insurance requirements"
    ],
    correctAnswer: 1,
    explanation: "The main purpose of certification is to provide legal documentation that the emergency lighting system was designed, installed, and verified to recognised standards (BS 5266-1, BS 7671, BS EN 50172). It establishes professional accountability and is essential for compliance with fire safety legislation, insurance validity, and protecting against liability claims."
  },
  {
    id: 2,
    question: "Which certificate confirms compliance with BS 5266-1?",
    options: [
      "Electrical Installation Certificate",
      "Minor Works Certificate",
      "Emergency Lighting Completion Certificate",
      "Design Declaration Certificate"
    ],
    correctAnswer: 2,
    explanation: "The Emergency Lighting Completion Certificate (BS 5266-1, Annex G) confirms installation and testing compliance with BS 5266-1. It verifies that the system has been installed according to the design, all tests have been completed successfully, and the installation meets the performance requirements of the standard."
  },
  {
    id: 3,
    question: "What certificate verifies the wiring and electrical safety of the emergency lighting system?",
    options: [
      "Emergency Lighting Completion Certificate",
      "Electrical Installation Certificate (BS 7671)",
      "Commissioning Certificate",
      "Design Declaration Certificate"
    ],
    correctAnswer: 1,
    explanation: "The Electrical Installation Certificate (BS 7671) covers wiring and circuit integrity, verifying that all electrical work complies with the IET Wiring Regulations. It confirms cable selection, containment, terminations, earthing, and circuit protection are correct. This certificate must be issued before the Emergency Lighting Completion Certificate."
  },
  {
    id: 4,
    question: "When should a Minor Works Certificate be used?",
    options: [
      "For all emergency lighting installations",
      "For the initial installation only",
      "For small modifications, repairs, or additions to existing systems",
      "Only for temporary emergency lighting"
    ],
    correctAnswer: 2,
    explanation: "A Minor Works Certificate (BS 7671) is used for small modifications, repairs, or additions to existing emergency lighting systems. Examples include replacing a single luminaire, adding an exit sign to an existing circuit, or repairing damaged cabling. For new installations or major alterations, a full Electrical Installation Certificate is required."
  },
  {
    id: 5,
    question: "What standard governs emergency lighting completion certificates?",
    options: [
      "BS 7671",
      "BS 5266-1",
      "BS EN 50172",
      "ISO 7010"
    ],
    correctAnswer: 1,
    explanation: "BS 5266-1 governs emergency lighting completion certificates. Specifically, Annex G of BS 5266-1 provides the template and requirements for the Emergency Lighting Completion Certificate, which confirms that the installation and testing comply with the standard's requirements for design, installation, and performance."
  },
  {
    id: 6,
    question: "Which THREE of the following must appear on a commissioning checklist?",
    options: [
      "Battery capacity verified (3-hour test), system labelling verified, and professional sign-off obtained",
      "Contractor's insurance details, client payment confirmation, and warranty information",
      "Luminaire manufacturer details, purchase order numbers, and delivery dates",
      "Building planning permission, architect's approval, and structural engineer's sign-off"
    ],
    correctAnswer: 0,
    explanation: "A commissioning checklist must verify: (1) Battery capacity and autonomy (3-hour duration test), (2) System labelling, segregation, and containment, and (3) Professional sign-off from the designer, installer, and verifier. Other acceptable items include luminaire verification, exit sign compliance, and documentation package completion. Financial, procurement, and planning details are not part of the technical commissioning checklist."
  },
  {
    id: 7,
    question: "Who must sign the commissioning certificate?",
    options: [
      "Only the installer",
      "The client and the contractor",
      "The designer, installer, and verifier/commissioning engineer",
      "The fire authority and building control"
    ],
    correctAnswer: 2,
    explanation: "Three qualified professionals must sign the commissioning certificate: (1) Designer – confirms design meets required standards, (2) Installer – confirms installation follows design and regulations, and (3) Verifier/Commissioning Engineer – confirms system performance and functionality. This establishes clear accountability at every stage of the project."
  },
  {
    id: 8,
    question: "Why is certification still required even if all tests have been completed?",
    options: [
      "To create extra paperwork for administrative purposes",
      "Because testing proves the system works at a specific moment, but certification provides legal documentation of compliance with recognised standards",
      "To satisfy the client's insurance company only",
      "Because the fire authority won't visit the site without certificates"
    ],
    correctAnswer: 1,
    explanation: "Testing proves the system works at a specific moment in time, but certification provides legal documentation that the system was designed, installed, and verified to recognised standards (BS 5266-1, BS 7671, BS EN 50172). Certification establishes professional accountability and is essential for fire safety legislation compliance, insurance validity, fire authority inspections, and professional liability protection. Without certification, a working system is considered non-verified and non-compliant."
  },
  {
    id: 9,
    question: "What can happen if certification documents are missing?",
    options: [
      "Nothing, as long as the system works physically",
      "The system is considered non-compliant and non-verified, potentially preventing building occupation and invalidating insurance",
      "The client may request a small discount on the final invoice",
      "The fire authority will issue the certificates on behalf of the contractor"
    ],
    correctAnswer: 1,
    explanation: "If certification documents are missing, the emergency lighting system is considered non-compliant and non-verified under the Regulatory Reform (Fire Safety) Order 2005, even if physically operational. Consequences can include: prohibition of building occupation, invalidation of insurance coverage, fire authority enforcement action, project delays and financial penalties, and professional liability exposure for the contractor. The Birmingham school case study demonstrated these exact consequences."
  },
  {
    id: 10,
    question: "In the Birmingham school case study, why was the system considered non-compliant?",
    options: [
      "Because the luminaires were not installed correctly",
      "Because the 3-hour duration test failed",
      "Because no formal commissioning certificate had been issued, despite the system being physically operational",
      "Because the exit signs didn't comply with ISO 7010"
    ],
    correctAnswer: 2,
    explanation: "In the Birmingham school case study, the system was fully functional — all luminaires worked, duration tests passed, and exit signs complied with standards. However, no formal commissioning certificate had been issued. The contractor assumed verbal confirmation was sufficient. The fire authority deemed the installation 'non-verified' because without written certification, there was no legal proof that the system met BS 5266-1 requirements. This delayed the school's opening by three weeks and required complete re-testing and certification."
  }
];
