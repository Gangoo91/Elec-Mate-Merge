export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const rcdInstallationQuizData: QuizQuestion[] = [
  {
    id: 1,
    question: 'Under BS 7671, additional protection by a 30 mA RCD is required for which socket-outlets?',
    options: [
      'Only socket-outlets installed within bathroom zones 1 and 2',
      'Socket-outlets with a rated current not exceeding 32 A',
      'Only socket-outlets supplying portable equipment used outdoors',
      'Socket-outlets with a rated current exceeding 32 A',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 411.3.3 of BS 7671 requires additional protection by a 30 mA RCD for socket-outlets with a rated current not exceeding 32 A (with limited stated exceptions). Socket-outlets above 32 A instead require an RCD not exceeding 100 mA where used for fault protection.',
  },
  {
    id: 2,
    question:
      'What is the maximum permitted residual operating current for additional protection RCDs?',
    options: [
      '100mA',
      '300mA',
      '30mA',
      '10mA',
    ],
    correctAnswer: 2,
    explanation:
      'For additional protection against electric shock, RCDs must have a rated residual operating current not exceeding 30mA according to BS 7671.',
  },
  {
    id: 3,
    question: 'Which RCD type is most appropriate for circuits supplying variable speed drives?',
    options: [
      'Type AC',
      'Type A',
      'Type F',
      'Type B',
    ],
    correctAnswer: 3,
    explanation:
      'Type B RCDs are required for variable speed drives and other equipment that may produce smooth DC fault currents.',
  },
  {
    id: 4,
    question:
      'How is selectivity (discrimination) between an upstream and a downstream RCD normally achieved?',
    options: [
      'By fitting a time-delayed Type S RCD at the upstream position',
      'By making the upstream RCD a lower IΔn than the downstream one',
      'By using identical 30 mA instantaneous RCDs at both positions',
      'By wiring the two RCDs on separate neutral bars only',
    ],
    correctAnswer: 0,
    explanation:
      'BS 7671 achieves selectivity by using a time-delayed Type S RCD (to BS EN 61008-1/61009-1) or a device with a time delay to BS EN 60947-2 upstream, so the downstream instantaneous RCD clears the fault first and the upstream device does not trip unnecessarily.',
  },
  {
    id: 5,
    question: 'What is the main advantage of using RCBOs instead of a shared front-end RCD?',
    options: [
      'They remove the need to test the residual current function',
      'A fault on one circuit only disconnects that circuit, not the whole board',
      'They allow a higher residual operating current to be used',
      'They eliminate the need for overcurrent protection on the circuit',
    ],
    correctAnswer: 1,
    explanation:
      'An RCBO combines RCD and overcurrent protection in a single device per circuit, so a residual-current or overload fault only disconnects the affected circuit rather than tripping every circuit sharing a common RCD.',
  },
  {
    id: 6,
    question: 'Which circuits require RCD protection in bathroom installations?',
    options: [
      'Only circuits in zones 1 and 2',
      'Only lighting circuits',
      'All low voltage circuits',
      'Only socket outlet circuits',
    ],
    correctAnswer: 2,
    explanation:
      'BS 7671 Section 701.411.3.3 requires RCD protection for all low voltage circuits in locations containing a bath or shower.',
  },
  {
    id: 7,
    question: 'What can cause unwanted RCD tripping in installations?',
    options: [
      'Using an RCD with too low a rated short-circuit capacity',
      'Fitting the RCD on the load side of the main switch',
      'Connecting all circuit CPCs to a single earth bar',
      'Mixing RCD-protected and non-protected neutrals',
    ],
    correctAnswer: 3,
    explanation:
      'Mixing RCD-protected and non-protected neutrals is a common cause of unwanted tripping and must be avoided through proper neutral management.',
  },
  {
    id: 8,
    question: 'What is the maximum operating time for a 30mA RCD at 5×IΔn (150mA)?',
    options: [
      '40ms',
      '100ms',
      '300ms',
      '10ms',
    ],
    correctAnswer: 0,
    explanation:
      'For additional protection, RCDs must operate within 40ms at 5×IΔn according to BS 7671 Section 415.1.1.',
  },
  {
    id: 9,
    question: 'When installing three-phase RCDs, what is essential to prevent nuisance tripping?',
    options: [
      'Fitting a separate neutral block for each outgoing circuit',
      'Ensuring balanced loading across all phases',
      'Selecting a device with the lowest available IΔn',
      'Connecting the phases in reverse rotation order',
    ],
    correctAnswer: 1,
    explanation:
      'Balanced loading across all three phases is essential to prevent nuisance tripping from natural load imbalance in three-phase RCD installations.',
  },
  {
    id: 10,
    question: 'What documentation must be completed after a new RCD-protected installation?',
    options: [
      'A risk assessment and method statement only',
      'A verbal handover note to the client',
      'An Electrical Installation Certificate with test results',
      'A manufacturer warranty card for the device',
    ],
    correctAnswer: 2,
    explanation:
      'An Electrical Installation Certificate must be completed along with RCD test results, circuit schedules, and compliance documentation.',
  },
];
