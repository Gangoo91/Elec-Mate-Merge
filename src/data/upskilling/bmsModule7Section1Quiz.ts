import { QuizQuestion } from '@/components/quiz/types';

export const bmsModule7Section1Quiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is the difference between a digital and an analog input in a BMS?',
    options: [
      'There is no difference, both terms mean the same thing',
      'Digital inputs are on/off signals, analog inputs are variable signals like 0-10V or 4-20mA',
      'Digital inputs use ethernet cables, analog inputs use standard cable',
      'Digital inputs are faster, analog inputs are slower',
    ],
    correctAnswer: 1,
    explanation:
      'Digital inputs provide simple on/off or high/low signals (like switches), while analog inputs provide variable signals that represent measured values like temperature or pressure using standards like 0-10V or 4-20mA.',
  },
  {
    id: 2,
    question: 'Which of the following is an example of an analog output device in a BMS?',
    options: [
      'A door contact switch',
      'A push-button override station',
      'A modulating valve actuator',
      'A volt-free alarm relay',
    ],
    correctAnswer: 2,
    explanation:
      'A modulating valve actuator is an analog output device that receives variable control signals (like 0-10V) to position the valve at different opening positions, not just fully open or closed.',
  },
  {
    id: 3,
    question: 'Why must polarity be observed when wiring analog signals?',
    options: [
      'It increases the signal voltage to overcome cable resistance',
      'It allows the controller to draw less current from the supply',
      'It converts the 4-20mA signal into a digital on/off state',
      'To ensure correct signal transmission and prevent reversed readings',
    ],
    correctAnswer: 3,
    explanation:
      'Analog signals depend on correct polarity for accurate signal transmission. Reversed polarity can cause inverted readings, signal errors, or complete loss of communication.',
  },
  {
    id: 4,
    question: 'What supply voltage is commonly used for BMS controllers?',
    options: [
      '24V AC or 24V DC',
      '48V DC',
      '12V DC',
      '110V AC',
    ],
    correctAnswer: 0,
    explanation:
      '24V AC or 24V DC are the most common supply voltages for BMS controllers. These low voltages provide safety benefits while being sufficient for controller operation and I/O interfacing.',
  },
  {
    id: 5,
    question: 'Why should BMS controllers sometimes be connected to a UPS?',
    options: [
      'To step the mains voltage down to the 24V the controller needs',
      'To ensure continuity during power outages for critical systems',
      'To provide a return path for the analog signal conductors',
      'To suppress electromagnetic interference on the supply',
    ],
    correctAnswer: 1,
    explanation:
      'UPS systems ensure critical BMS controllers (like those managing fire safety systems or essential plant) continue operating during power outages, maintaining monitoring and control capabilities.',
  },
  {
    id: 6,
    question: 'Why must mains (Band II) cables be segregated from extra-low-voltage (Band I) control wiring?',
    options: [
      'To balance the load evenly across all three phases',
      'To allow both cable types to share the same earth conductor',
      'To prevent electromagnetic interference and ensure safety separation',
      'To reduce the overall voltage drop on the control circuit',
    ],
    correctAnswer: 2,
    explanation:
      'BS 7671 requires Band I (ELV) and Band II (LV) circuits to be segregated; mains cables can induce interference in low-voltage signal circuits, and separation maintains safe isolation between voltage bands.',
  },
  {
    id: 7,
    question: 'What standard governs electrical safety for BMS wiring in the UK?',
    options: [
      'BS 6266',
      'BS 5839',
      'BS 5266',
      'BS 7671',
    ],
    correctAnswer: 3,
    explanation:
      'BS 7671 (Requirements for Electrical Installations - IET Wiring Regulations) is the UK standard that governs electrical safety for all electrical installations, including BMS wiring.',
  },
  {
    id: 8,
    question: 'What percentage spare capacity should typically be left in trunking?',
    options: [
      '40%',
      '30%',
      '20%',
      '50%',
    ],
    correctAnswer: 0,
    explanation:
      'As a design convention, around 40% spare capacity is left in trunking to allow for future additions, ease cable installation, and avoid overcrowding that hinders heat dissipation.',
  },
  {
    id: 9,
    question: 'Why are ferrules used on stranded conductors?',
    options: [
      'To increase the current-carrying capacity of the conductor',
      'To prevent loose strands causing faults and ensure secure terminations',
      'To provide electrical screening against interference',
      'To colour-code conductors for identification',
    ],
    correctAnswer: 1,
    explanation:
      'Ferrules prevent individual strands from breaking away and causing short circuits or poor connections. They ensure all strands are captured in the termination, providing a secure and reliable connection.',
  },
  {
    id: 10,
    question: 'In the real-world example, what caused the CO₂ sensors to give unstable readings?',
    options: [
      'Reversed polarity on the sensor signal terminals',
      'A controller supply voltage set too low for the sensors',
      'Electromagnetic interference from nearby mains cables',
      'Ferrules omitted from the stranded signal conductors',
    ],
    correctAnswer: 2,
    explanation:
      "The CO₂ sensors' 0-10V signal cables were run in the same trunking as 230V fan power supplies. The electromagnetic interference from the mains cables caused noise in the analog signals, resulting in unstable readings.",
  },
];
