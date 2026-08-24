import { QuizQuestion } from '@/types/quiz';

export const documentationAuditsQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'Why is documentation considered part of compliance for emergency lighting systems?',
    options: [
      'It is needed only when the building changes ownership or when its use class alters',
      'It provides legal evidence that the system was designed, installed, tested, and maintained correctly',
      'It removes the need for any physical testing of the luminaires once they are installed',
      'It is required by the system manufacturer as a condition of warranty, not by law',
    ],
    correctAnswer: 1,
    explanation:
      'Documentation serves as legal evidence that the system was designed and installed to the correct standards, has been tested and maintained, and is under the control of a Responsible Person meeting their obligations under the RRO. Without this paper trail, compliance cannot be demonstrated regardless of system performance.',
  },
  {
    id: 2,
    question: 'Which law requires records to be maintained for fire safety systems?',
    options: [
      'Health and Safety at Work Act 1974',
      'Building Regulations 2010',
      'Regulatory Reform (Fire Safety) Order 2005',
      'Electricity at Work Regulations 1989',
    ],
    correctAnswer: 2,
    explanation:
      'The Regulatory Reform (Fire Safety) Order 2005 (RRO) requires that accurate records, certificates, and test results are maintained and available to Fire and Rescue Authorities at any time.',
  },
  {
    id: 3,
    question: 'What standard provides the framework for emergency lighting documentation?',
    options: [
      'BS 7671',
      'BS 5839',
      'EN 54',
      'BS 5266-1 and BS 5266-8',
    ],
    correctAnswer: 3,
    explanation:
      'BS 5266-1 and BS 5266-8 provide the framework for emergency lighting documentation, specifying what records must be maintained and how they should be presented.',
  },
  {
    id: 4,
    question: 'Name three documents a Fire Authority will always ask for during an audit.',
    options: [
      'System design drawings, emergency lighting logbook, and commissioning certificate',
      'Staff training records, evacuation plans, and fire extinguisher certificates',
      'Building blueprints, insurance policy, and contractor invoices',
      'Electrical schematics, contractor licenses, and maintenance quotes',
    ],
    correctAnswer: 0,
    explanation:
      'Fire Authorities typically expect to review system design drawings, emergency lighting logbooks showing all test entries, and commissioning certificates (BS 5266-1 Annex G) as core documentation proving compliance.',
  },
  {
    id: 5,
    question: 'Where should emergency lighting records be stored on-site?',
    options: [
      'Off-site at the maintenance contractor’s head office, away from the building',
      'Near the main fire alarm panel or security office for easy access during inspections',
      'In a locked archive room that only the senior management team can access',
      'With the local fire and rescue authority, who retain them for safekeeping',
    ],
    correctAnswer: 1,
    explanation:
      'All documents must be kept on-site and accessible—typically near the main fire alarm panel or security office. They must be readily available during inspections, with both digital and paper copies accessible.',
  },
  {
    id: 6,
    question: 'How long must emergency lighting records be retained?',
    options: [
      'At least twelve months from the last test',
      'Until the next annual inspection only',
      'At least six years, though ideally for the life of the installation',
      'Only while the original installer remains responsible',
    ],
    correctAnswer: 2,
    explanation:
      'Emergency lighting records must be retained for at least six years to demonstrate system history, though ideally they should be kept for the life of the installation.',
  },
  {
    id: 7,
    question: 'What is the main purpose of an emergency lighting logbook?',
    options: [
      'To list the manufacturer’s warranty terms and conditions for each luminaire',
      'To record the building’s annual energy consumption for the lighting circuits',
      'To hold the original system design calculations and the lux level drawings',
      'To show all monthly and annual test entries, remedial work, and component replacements',
    ],
    correctAnswer: 3,
    explanation:
      'The emergency lighting logbook must show all monthly and annual test entries, records of remedial work or component replacement, and proof that any failed luminaires were repaired or retested. It provides a complete testing and maintenance history.',
  },
  {
    id: 8,
    question: 'Which of the following are common documentation errors that cause compliance failures?',
    options: [
      'Missing or incomplete logbook entries and certificates not signed or incorrectly dated',
      'Using black ink rather than blue ink when signing the entries in the logbook',
      'Storing the logbook digitally on a tablet instead of keeping printed paper',
      'Recording the test results more often than the maintenance schedule requires',
    ],
    correctAnswer: 0,
    explanation:
      'Common audit failures include missing or incomplete logbook entries, certificates not signed or incorrectly dated, out-of-date fire risk assessments, mismatch between system drawings and actual installation, and no evidence of 3-hour duration testing.',
  },
  {
    id: 9,
    question: 'What types of enforcement action can Fire Authorities issue for missing records?',
    options: [
      'Verbal cautions and a written apology to occupants',
      'Improvement Notices, Prohibition Notices, and fines or prosecution',
      'Mandatory re-training of the installing electrician',
      'Suspension of the building’s electrical supply by the DNO',
    ],
    correctAnswer: 1,
    explanation:
      'Fire Authorities can issue Improvement Notices (requiring corrective action), Prohibition Notices (restricting building use), and pursue fines or prosecution for serious breaches when documentation is missing or inadequate.',
  },
  {
    id: 10,
    question: 'What happened during the Liverpool hotel case study?',
    options: [
      'The emergency luminaires failed their annual duration test part-way through the fire officer’s inspection',
      'The wrong type of luminaire had been fitted throughout the building and every one of them had to be replaced',
      "The logbook hadn't been updated for nine months and certificates were missing, resulting in a £6,000 enforcement notice",
      'The system had never been commissioned after installation, so no certificate had ever been issued for it',
    ],
    correctAnswer: 2,
    explanation:
      'During a fire safety audit of a hotel in Liverpool, while all emergency lights were functional, the logbook had not been updated for nine months and several test certificates were missing. The Responsible Person was issued with an enforcement notice, and the cost of the audit failure and re-certification exceeded £6,000—highlighting that missing paperwork is treated the same as a failed system.',
  },
];
