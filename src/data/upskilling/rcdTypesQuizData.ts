import type { QuizQuestion } from '@/types/quiz';

export const rcdTypesQuizData: QuizQuestion[] = [
  {
    id: 1,
    question:
      'EV charging installations require protection against smooth DC residual current. Which RCD type provides this when a separate 6 mA DC detection device is not fitted?',
    options: [
      'Type A',
      'Type B',
      'Type AC',
      'Type F',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 722.531.3.101 requires protection against DC fault current for EV charging. A Type B RCD detects smooth DC residual current directly; alternatively a Type A RCD may be combined with a 6 mA RDC-DD (BS IEC 62955).',
  },
  {
    id: 2,
    question: 'What does a Type A RCD detect that Type AC cannot?',
    options: [
      'High frequency currents',
      'Pure DC currents',
      'Pulsating DC currents',
      'All AC currents',
    ],
    correctAnswer: 2,
    explanation:
      'Type A RCDs can detect both AC and pulsating DC residual currents, while Type AC can only detect pure AC currents.',
  },
  {
    id: 3,
    question: 'Why is Type AC becoming unsuitable for many modern installations?',
    options: [
      'It has a slower disconnection time than other RCD types',
      'It cannot be used on TN-S earthing systems',
      'It has a lower rated residual operating current than Type A',
      'Electronic equipment can create DC components it cannot detect',
    ],
    correctAnswer: 3,
    explanation:
      'Modern electronic equipment with switch-mode power supplies can produce DC components in residual currents, which a Type AC RCD cannot detect reliably. Regulation 531.3.3 restricts Type AC to circuits where such DC components cannot occur.',
  },
  {
    id: 4,
    question: 'Which RCD type is required for variable frequency drives?',
    options: [
      'Type F',
      'Type A',
      'Type AC',
      'Type B',
    ],
    correctAnswer: 0,
    explanation:
      'Type F RCDs are designed for single-phase equipment fed through frequency converters, tripping on composite (mixed-frequency) residual currents and pulsating DC. Where a frequency converter can produce smooth DC residual current, a Type B device is required instead.',
  },
  {
    id: 5,
    question: 'What is the main application for Type F RCDs?',
    options: [
      'Final circuits supplying only fixed resistive heating loads',
      'Single-phase equipment with frequency converters, such as inverter-drive appliances',
      'Three-phase motor circuits on a TN-C-S supply',
      'Socket-outlet circuits in domestic bathrooms',
    ],
    correctAnswer: 1,
    explanation:
      'Type F RCDs are specifically designed for equipment with frequency converters, such as heat pumps with inverter drives and VFDs.',
  },
  {
    id: 6,
    question: 'Which equipment would require Type B RCD protection?',
    options: [
      'Electric oven',
      'LED lighting',
      'Solar PV inverter system',
      'Standard washing machine',
    ],
    correctAnswer: 2,
    explanation:
      'Solar PV inverter systems can generate pure DC residual currents, requiring Type B RCD protection that can detect all current types including pure DC.',
  },
  {
    id: 7,
    question: 'What happens if the wrong RCD type is installed for an application?',
    options: [
      'Faster wear of equipment',
      'Higher electricity bills',
      'Better protection than needed',
      'Potential failure to provide protection',
    ],
    correctAnswer: 3,
    explanation:
      'Installing the wrong RCD type can result in failure to detect certain types of residual currents, potentially leaving dangerous conditions undetected.',
  },
  {
    id: 8,
    question: 'Which BS 7671 regulation covers RCD type selection?',
    options: [
      'Regulation 531.3.3',
      'Regulation 411.3.3',
      'Regulation 522.6.202',
      'Regulation 314.1',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 531.3.3 specifies the requirements for RCD type selection based on the type of residual currents that may occur.',
  },
  {
    id: 9,
    question: 'What is the minimum acceptable RCD type for general new installations?',
    options: [
      'Type B',
      'Type A',
      'Type F',
      'Type AC',
    ],
    correctAnswer: 1,
    explanation:
      'Type A is the minimum acceptable standard for new installations as it can handle both AC and pulsating DC residual currents from modern electronic equipment.',
  },
  {
    id: 10,
    question: 'Which RCD type provides universal protection against all residual current types?',
    options: [
      'Type AC',
      'Type A',
      'Type B',
      'Type F',
    ],
    correctAnswer: 2,
    explanation:
      'Type B RCDs provide universal protection, detecting AC, pulsating DC, high-frequency, and pure DC residual currents - covering all possible fault current types.',
  },
];
