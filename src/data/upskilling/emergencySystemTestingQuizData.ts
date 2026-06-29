import { QuizQuestion } from '@/types/quiz';

export const emergencySystemTestingQuizData: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is the main function of emergency exit signage?',
    options: [
      'To provide general illumination during power cuts',
      'To guide occupants safely towards final exits in an emergency',
      'To provide decorative lighting in corridors',
      'To indicate room numbers and functions',
    ],
    correctAnswer: 1,
    explanation:
      'Emergency exit signage guides occupants safely towards final exits during emergencies, ensuring clear direction even in smoke or low visibility conditions.',
  },
  {
    id: 2,
    question: 'Which ISO standard governs emergency exit sign symbols in the UK?',
    options: [
      'ISO 9001',
      'ISO 14001',
      'ISO 7010',
      'ISO 27001',
    ],
    correctAnswer: 2,
    explanation:
      'ISO 7010 governs emergency exit sign symbols, requiring the standard running man pictogram with directional arrows for consistency and clarity.',
  },
  {
    id: 3,
    question: 'How often must functional tests be carried out on emergency lighting systems?',
    options: [
      'Weekly',
      'Annually',
      'Quarterly',
      'Monthly',
    ],
    correctAnswer: 3,
    explanation:
      'BS 5266 requires monthly functional tests where mains failure is simulated and each luminaire is checked to operate from emergency supply.',
  },
  {
    id: 4,
    question: 'What is the difference between maintained and non-maintained exit signs?',
    options: [
      'Maintained signs remain illuminated at all times, non-maintained only illuminate when mains supply fails',
      'Non-maintained signs remain illuminated at all times, maintained only illuminate when mains supply fails',
      'Maintained signs run from a central battery, non-maintained have self-contained batteries',
      'Maintained signs use LED sources, non-maintained always use fluorescent tubes',
    ],
    correctAnswer: 0,
    explanation:
      'Maintained signs remain illuminated continuously (essential in public buildings), while non-maintained signs only illuminate during mains failure (suitable where staff know escape routes).',
  },
  {
    id: 5,
    question: 'How long must the annual full-duration test run in most buildings?',
    options: [
      '1 hour',
      '3 hours',
      '2 hours',
      '4 hours',
    ],
    correctAnswer: 1,
    explanation:
      'The annual full-duration test typically runs for 3 hours to confirm battery capacity meets the standard emergency lighting duration requirement.',
  },
  {
    id: 6,
    question:
      'Who holds ultimate responsibility for ensuring emergency lighting tests are carried out?',
    options: [
      'The electrical contractor who originally installed the system',
      'The local fire and rescue service who inspect the premises',
      'The duty holder (building owner, employer, or responsible person)',
      'The manufacturer of the emergency luminaires',
    ],
    correctAnswer: 2,
    explanation:
      'The duty holder (building owner, employer, or responsible person) is legally accountable for ensuring tests are carried out, though testing may be performed by trained staff or contractors.',
  },
  {
    id: 7,
    question: 'Which detail is NOT required to be recorded in the emergency lighting logbook?',
    options: [
      'Date and time of test',
      'Name of person carrying out test',
      'Any faults found',
      'Weather conditions during test',
    ],
    correctAnswer: 3,
    explanation:
      'Weather conditions are not required in the logbook. Required details include date/time, tester name, test type, faults found, and corrective action taken.',
  },
  {
    id: 8,
    question: 'Why must batteries be recharged immediately after a duration test?',
    options: [
      'To restore system readiness for emergencies',
      'To prevent battery damage from deep discharge',
      'To comply with manufacturer warranties',
      'To reduce electricity costs',
    ],
    correctAnswer: 0,
    explanation:
      'Batteries must be recharged immediately after duration testing to restore system readiness, ensuring the emergency lighting is available if a real emergency occurs.',
  },
  {
    id: 9,
    question: 'What is one advantage of automated emergency lighting test systems?',
    options: [
      'They remove the legal requirement for an annual duration test',
      'They provide reliability and efficiency in large buildings',
      'They allow luminaires to run indefinitely without battery replacement',
      'They eliminate the need to keep a written test logbook',
    ],
    correctAnswer: 1,
    explanation:
      'Automated test systems provide reliability and efficiency, especially in large buildings, by conducting regular tests automatically and providing detailed reports.',
  },
  {
    id: 10,
    question: 'Where should the emergency lighting logbook be stored?',
    options: [
      'Off-site at the testing contractor’s registered office',
      'In the building owner’s home for safekeeping',
      'On-site in an accessible location near the fire panel or site office',
      'Filed digitally only, with no physical copy kept on site',
    ],
    correctAnswer: 2,
    explanation:
      'The emergency lighting logbook must be kept on-site in an accessible location (typically near the fire panel or site office) for inspection by authorities, insurers, or fire service.',
  },
];
