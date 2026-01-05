import { QuizQuestion } from '@/types/quiz';

export const documentationAuditsQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Why is documentation considered part of compliance for emergency lighting systems?",
    options: [
      "It makes the system look more professional",
      "It provides legal evidence that the system was designed, installed, tested, and maintained correctly",
      "It is optional but recommended by insurers",
      "It only matters during the initial installation"
    ],
    correctAnswer: 1,
    explanation: "Documentation serves as legal evidence that the system was designed and installed to the correct standards, has been tested and maintained, and is under the control of a Responsible Person meeting their obligations under the RRO. Without this paper trail, compliance cannot be demonstrated regardless of system performance."
  },
  {
    id: 2,
    question: "Which law requires records to be maintained for fire safety systems?",
    options: [
      "Health and Safety at Work Act 1974",
      "Regulatory Reform (Fire Safety) Order 2005",
      "Building Regulations 2010",
      "Electricity at Work Regulations 1989"
    ],
    correctAnswer: 1,
    explanation: "The Regulatory Reform (Fire Safety) Order 2005 (RRO) requires that accurate records, certificates, and test results are maintained and available to Fire and Rescue Authorities at any time."
  },
  {
    id: 3,
    question: "What standard provides the framework for emergency lighting documentation?",
    options: [
      "BS 7671",
      "BS 5839",
      "BS 5266-1 and BS 5266-8",
      "EN 54"
    ],
    correctAnswer: 2,
    explanation: "BS 5266-1 and BS 5266-8 provide the framework for emergency lighting documentation, specifying what records must be maintained and how they should be presented."
  },
  {
    id: 4,
    question: "Name three documents a Fire Authority will always ask for during an audit.",
    options: [
      "Building blueprints, insurance policy, and contractor invoices",
      "System design drawings, emergency lighting logbook, and commissioning certificate",
      "Staff training records, evacuation plans, and fire extinguisher certificates",
      "Electrical schematics, contractor licenses, and maintenance quotes"
    ],
    correctAnswer: 1,
    explanation: "Fire Authorities typically expect to review system design drawings, emergency lighting logbooks showing all test entries, and commissioning certificates (BS 5266-1 Annex G) as core documentation proving compliance."
  },
  {
    id: 5,
    question: "Where should emergency lighting records be stored on-site?",
    options: [
      "In the building manager's personal office only",
      "Off-site at the contractor's premises",
      "Near the main fire alarm panel or security office for easy access during inspections",
      "In a locked safe that only senior management can access"
    ],
    correctAnswer: 2,
    explanation: "All documents must be kept on-site and accessible—typically near the main fire alarm panel or security office. They must be readily available during inspections, with both digital and paper copies accessible."
  },
  {
    id: 6,
    question: "How long must emergency lighting records be retained?",
    options: [
      "One year minimum",
      "Three years minimum",
      "At least six years, though ideally for the life of the installation",
      "Only until the next inspection"
    ],
    correctAnswer: 2,
    explanation: "Emergency lighting records must be retained for at least six years to demonstrate system history, though ideally they should be kept for the life of the installation."
  },
  {
    id: 7,
    question: "What is the purpose of an emergency lighting logbook?",
    options: [
      "To record electrical contractor contact details",
      "To show all monthly and annual test entries, remedial work, and component replacements",
      "To list all luminaire manufacturers and model numbers",
      "To document building occupancy levels"
    ],
    correctAnswer: 1,
    explanation: "The emergency lighting logbook must show all monthly and annual test entries, records of remedial work or component replacement, and proof that any failed luminaires were repaired or retested. It provides a complete testing and maintenance history."
  },
  {
    id: 8,
    question: "List two common documentation errors that cause compliance failures.",
    options: [
      "Using the wrong font size and incorrect paper colour",
      "Missing or incomplete logbook entries and certificates not signed or incorrectly dated",
      "Too much detail and excessive cross-referencing",
      "Digital format instead of handwritten records"
    ],
    correctAnswer: 1,
    explanation: "Common audit failures include missing or incomplete logbook entries, certificates not signed or incorrectly dated, out-of-date fire risk assessments, mismatch between system drawings and actual installation, and no evidence of 3-hour duration testing."
  },
  {
    id: 9,
    question: "What types of enforcement action can Fire Authorities issue for missing records?",
    options: [
      "Written warnings only",
      "Improvement Notices, Prohibition Notices, and fines or prosecution",
      "Mandatory staff retraining",
      "Building insurance cancellation"
    ],
    correctAnswer: 1,
    explanation: "Fire Authorities can issue Improvement Notices (requiring corrective action), Prohibition Notices (restricting building use), and pursue fines or prosecution for serious breaches when documentation is missing or inadequate."
  },
  {
    id: 10,
    question: "What happened during the Liverpool hotel case study?",
    options: [
      "The emergency lights failed during a fire drill",
      "The logbook hadn't been updated for nine months and certificates were missing, resulting in a £6,000 enforcement notice",
      "The system was upgraded to LED luminaires",
      "The hotel received an award for excellent fire safety"
    ],
    correctAnswer: 1,
    explanation: "During a fire safety audit of a hotel in Liverpool, while all emergency lights were functional, the logbook had not been updated for nine months and several test certificates were missing. The Responsible Person was issued with an enforcement notice, and the cost of the audit failure and re-certification exceeded £6,000—highlighting that missing paperwork is treated the same as a failed system."
  }
];
