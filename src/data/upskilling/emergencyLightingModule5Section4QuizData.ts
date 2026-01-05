import { QuizQuestion } from '@/types/quiz';

export const emergencyLightingModule5Section4QuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Why is labelling important in emergency lighting installations?",
    options: [
      "To make the installation look professional",
      "To ensure safe isolation, rapid testing, and efficient inspections",
      "To meet building aesthetics requirements",
      "To identify the manufacturer of the equipment"
    ],
    correctAnswer: 1,
    explanation: "Labelling ensures circuits can be safely isolated during maintenance, test points are quickly identified, emergency fittings are distinguished from standard lighting, and fire inspectors can verify compliance efficiently."
  },
  {
    id: 2,
    question: "What international standard governs exit signage pictograms?",
    options: [
      "BS 5266-1",
      "BS 7671",
      "ISO 7010",
      "EN 50172"
    ],
    correctAnswer: 2,
    explanation: "ISO 7010 is the international standard for safety signs and pictograms, including emergency exit signs. Exit signs must comply with ISO 7010 to ensure international recognition and consistency."
  },
  {
    id: 3,
    question: "How should emergency distribution boards be labelled?",
    options: [
      "With a handwritten label",
      "Clearly marked as 'Emergency Lighting Circuits Only'",
      "With a temporary sticker",
      "Only with circuit numbers"
    ],
    correctAnswer: 1,
    explanation: "Distribution boards must be clearly marked as 'Emergency Lighting Circuits Only' using durable, permanent labels. This prevents accidental disconnection and ensures electricians can quickly identify emergency circuits during maintenance."
  },
  {
    id: 4,
    question: "Name three system components that require labels.",
    options: [
      "Cables, switches, and fuses only",
      "Luminaires, distribution boards, and test points",
      "Walls, ceilings, and floors",
      "Only the main control panel"
    ],
    correctAnswer: 1,
    explanation: "Luminaires (with circuit references and maintained/non-maintained status), distribution boards (clearly marked as emergency circuits), and test points/key switches (identified for monthly checks) are three critical components that must be labelled. Additional labelling may include cabling and central battery systems."
  },
  {
    id: 5,
    question: "What information should be included in a maintenance logbook entry?",
    options: [
      "Only the test date",
      "Date, test type, results, faults, remedial action, and engineer details",
      "Just the pass or fail result",
      "Only failed tests need to be recorded"
    ],
    correctAnswer: 1,
    explanation: "Complete logbook entries must include: date of test, test type (monthly/annual), luminaire reference, test result (pass/fail), details of any faults found, remedial action taken, who carried out the work, and re-test results. This creates a complete audit trail for compliance."
  },
  {
    id: 6,
    question: "Why must failed tests always be recorded?",
    options: [
      "To keep track of faulty equipment only",
      "To provide legal evidence of compliance and demonstrate ongoing maintenance",
      "It's optional if the fault is fixed immediately",
      "Only for insurance purposes"
    ],
    correctAnswer: 1,
    explanation: "Recording failed tests provides legal evidence that the system is being properly maintained, faults are being identified and rectified, and the Responsible Person is fulfilling their duty under the Fire Safety Order. This creates an essential audit trail for inspections and demonstrates due diligence."
  },
  {
    id: 7,
    question: "What regulations require fire safety documentation to be maintained?",
    options: [
      "Building Regulations only",
      "The Regulatory Reform (Fire Safety) Order 2005",
      "Health and Safety at Work Act only",
      "No regulations require documentation"
    ],
    correctAnswer: 1,
    explanation: "The Regulatory Reform (Fire Safety) Order 2005 requires the Responsible Person to maintain life-safety systems in efficient working order and keep records as evidence of compliance. Records must be available for inspection by fire authorities and insurers."
  },
  {
    id: 8,
    question: "What is the legal consequence of missing records during inspection?",
    options: [
      "Just a warning",
      "Enforcement notices, invalid insurance, prosecution, fines, and imprisonment",
      "Nothing if the system works",
      "A small fine only"
    ],
    correctAnswer: 1,
    explanation: "Missing or incomplete records can result in enforcement notices from the Fire and Rescue Authority, invalid insurance policies, criminal prosecution of the Responsible Person, unlimited fines, up to 2 years' imprisonment, and significantly increased civil liability in the event of fire-related injury or death."
  },
  {
    id: 9,
    question: "Why are digital logbooks useful in large installations?",
    options: [
      "They look more modern",
      "They provide automated reminders, fault alerts, cloud backup, and instant compliance reports",
      "They are required by law",
      "They are cheaper than paper"
    ],
    correctAnswer: 1,
    explanation: "Digital maintenance software offers automated test reminders and scheduling, instant fault reporting and email alerts, cloud backup to prevent data loss, mobile app access for on-site testing, automatic generation of compliance reports, and integration with CAFM systems — all essential for managing large-scale installations efficiently."
  },
  {
    id: 10,
    question: "What compliance issue was found in the London leisure centre case study?",
    options: [
      "The system didn't work",
      "No circuit labelling, unlabelled luminaires, incomplete logbook, and missing commissioning records",
      "The equipment was too old",
      "Wrong type of luminaires installed"
    ],
    correctAnswer: 1,
    explanation: "Despite the physical system working correctly, the leisure centre had: no circuit labelling at distribution boards, unlabelled luminaires with no reference numbers, incomplete logbook with gaps of 3-6 months, missing commissioning records, and no proof of remedial work. This resulted in an enforcement notice and £12,000-£15,000 in remedial costs."
  }
];
