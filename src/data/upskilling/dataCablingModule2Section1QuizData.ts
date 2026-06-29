import { QuizQuestion } from '@/types/quiz';

export const dataCablingModule2Section1QuizData: QuizQuestion[] = [
  {
    id: 1,
    question: 'Why are the wire pairs twisted in twisted pair cables?',
    options: [
      'To reduce the overall diameter of the cable',
      'To reduce electromagnetic interference and crosstalk between pairs',
      'To make the cable more flexible and easier to install',
      "To increase the cable's tensile strength",
    ],
    correctAnswer: 1,
    explanation:
      'Wire pairs are twisted to reduce electromagnetic interference and crosstalk. The twisting creates a balanced transmission line where external interference affects both wires equally, allowing it to be cancelled at the receiver.',
  },
  {
    id: 2,
    question: 'What is the maximum guaranteed distance for 10 Gigabit Ethernet over Cat6 cable?',
    options: [
      '100 metres',
      '90 metres',
      '37 metres',
      '55 metres',
    ],
    correctAnswer: 3,
    explanation:
      'Cat6 supports 10GBASE-T up to 55 metres in a low-noise environment (37 metres where alien crosstalk is high). For the full 100-metre permanent link at 10 Gbps, Cat6A or higher is required.',
  },
  {
    id: 3,
    question:
      'Which cable category has a bandwidth of 500 MHz and supports 10 Gbps over 100 metres?',
    options: [
      'Cat6A',
      'Cat5e',
      'Cat6',
      'Cat7',
    ],
    correctAnswer: 0,
    explanation:
      'Cat6A (Augmented Category 6) is specified to 500 MHz and supports 10GBASE-T over the full 100-metre channel. Cat6 only reaches 250 MHz, while Cat7 (600 MHz) is an ISO/IEC class not recognised by TIA structured-cabling standards.',
  },
  {
    id: 4,
    question: 'What is the maximum amount of untwisting allowed at terminations for Cat6 cable?',
    options: [
      '13mm (0.5 inch)',
      '6mm (0.25 inch)',
      '25mm (1 inch)',
      '50mm (2 inches)',
    ],
    correctAnswer: 0,
    explanation:
      'For Cat6 cable, the maximum untwisting allowed at terminations is 13mm (0.5 inch). Excessive untwisting can significantly degrade performance by increasing crosstalk.',
  },
  {
    id: 5,
    question:
      'Which level of copper cable testing fully certifies a permanent link against the parameters of its category standard?',
    options: [
      'Verification testing (wiremap and length only)',
      'Qualification testing (data-rate capability)',
      'Certification testing (full parameter sweep)',
      'Visual inspection of terminations',
    ],
    correctAnswer: 2,
    explanation:
      'Certification testing performs a full frequency sweep, measuring insertion loss, NEXT, return loss and delay against the category standard. Verification and qualification testers only confirm connectivity or data-rate capability, not full compliance.',
  },
];
