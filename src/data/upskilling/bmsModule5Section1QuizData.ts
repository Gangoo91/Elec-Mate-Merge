export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export const bmsModule5Section1QuizData: QuizQuestion[] = [
  {
    question: 'What is a communication protocol in a BMS?',
    options: [
      'They can lock clients into using a single vendor',
      'A structured set of rules for devices to exchange data',
      'To prevent signal reflections that cause communication errors',
      'Termination resistors were not installed',
    ],
    correctAnswer: 'A structured set of rules for devices to exchange data',
  },
  {
    question: 'What is the difference between an open and a proprietary protocol?',
    options: [
      'Insurance may be invalid, enforcement notices issued, and Responsible Person may face prosecution',
      'Being able to identify the component\'s manufacturer, batch/lot number, date of manufacture, specification, and supply chain — from manufacture to installation',
      'Open protocols are standardised and support multiple manufacturers, while proprietary protocols are owned by a single manufacturer',
      'To vary the physical demands on different muscle groups, reducing cumulative loading on any single body area',
    ],
    correctAnswer:
      'Open protocols are standardised and support multiple manufacturers, while proprietary protocols are owned by a single manufacturer',
  },
  {
    question: 'Give one disadvantage of proprietary protocols.',
    options: [
      'A structured set of rules for devices to exchange data',
      'To prevent signal reflections that cause communication errors',
      'They can lock clients into using a single vendor',
      'Termination resistors were not installed',
    ],
    correctAnswer: 'They can lock clients into using a single vendor',
  },
  {
    question: 'Which protocol is most commonly used in HVAC systems?',
    options: ['KNX', 'Modbus', 'BACnet', 'DALI'],
    correctAnswer: 'BACnet',
  },
  {
    question: 'Which protocol is simple and widely used in energy meters?',
    options: ['BACnet', 'KNX', 'Modbus', 'LonWorks'],
    correctAnswer: 'Modbus',
  },
  {
    question: 'Which protocol is popular in Europe for lighting and blinds?',
    options: ['BACnet', 'Modbus', 'KNX', 'DALI'],
    correctAnswer: 'KNX',
  },
  {
    question: 'Why must RS-485 buses be terminated at both ends?',
    options: [
      'To report on the condition of an existing installation and identify defects',
      'To prevent signal reflections that cause communication errors',
      '5.6 weeks (28 days for a 5-day worker), which can include bank holidays',
      'Whether the learners enjoyed the training and found it relevant',
    ],
    correctAnswer: 'To prevent signal reflections that cause communication errors',
  },
  {
    question: 'What type of cabling is recommended for RS-485 communications?',
    options: ['Single core cable', 'Coaxial cable', 'Shielded twisted pair', 'Ribbon cable'],
    correctAnswer: 'Shielded twisted pair',
  },
  {
    question: 'Why should comms cables be kept separate from mains wiring?',
    options: [
      'To save space in cable trays',
      'To avoid electromagnetic interference',
      'To make installation easier',
      'To reduce cable costs',
    ],
    correctAnswer: 'To avoid electromagnetic interference',
  },
  {
    question: 'In the real-world example, what simple omission caused communication errors?',
    options: [
      'Wrong cable type was used',
      'Cables were run too close to power cables',
      'Termination resistors were not installed',
      'The wrong protocol was selected',
    ],
    correctAnswer: 'Termination resistors were not installed',
  },
];
