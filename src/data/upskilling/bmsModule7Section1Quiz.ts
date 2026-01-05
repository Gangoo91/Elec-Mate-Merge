import { QuizQuestion } from '@/components/quiz/types';

export const bmsModule7Section1Quiz: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the difference between a digital and an analog input in a BMS?",
    options: [
      "Digital inputs are on/off signals, analog inputs are variable signals like 0-10V or 4-20mA",
      "Digital inputs use ethernet cables, analog inputs use standard cable",
      "Digital inputs are faster, analog inputs are slower",
      "There is no difference, both terms mean the same thing"
    ],
    correctAnswer: 0,
    explanation: "Digital inputs provide simple on/off or high/low signals (like switches), while analog inputs provide variable signals that represent measured values like temperature or pressure using standards like 0-10V or 4-20mA."
  },
  {
    id: 2,
    question: "Give one example of an analog output device.",
    options: [
      "On/off relay",
      "Modulating valve actuator",
      "Digital switch",
      "Status indicator light"
    ],
    correctAnswer: 1,
    explanation: "A modulating valve actuator is an analog output device that receives variable control signals (like 0-10V) to position the valve at different opening positions, not just fully open or closed."
  },
  {
    id: 3,
    question: "Why must polarity be observed when wiring analog signals?",
    options: [
      "To prevent electrical shocks",
      "To ensure correct signal transmission and prevent reversed readings",
      "To comply with colour coding standards",
      "To reduce cable costs"
    ],
    correctAnswer: 1,
    explanation: "Analog signals depend on correct polarity for accurate signal transmission. Reversed polarity can cause inverted readings, signal errors, or complete loss of communication."
  },
  {
    id: 4,
    question: "What supply voltage is commonly used for BMS controllers?",
    options: [
      "12V DC",
      "24V AC or 24V DC",
      "48V DC",
      "110V AC"
    ],
    correctAnswer: 1,
    explanation: "24V AC or 24V DC are the most common supply voltages for BMS controllers. These low voltages provide safety benefits while being sufficient for controller operation and I/O interfacing."
  },
  {
    id: 5,
    question: "Why should BMS controllers sometimes be connected to a UPS?",
    options: [
      "To reduce electricity costs",
      "To ensure continuity during power outages for critical systems",
      "To improve signal quality",
      "To meet manufacturer warranty requirements"
    ],
    correctAnswer: 1,
    explanation: "UPS systems ensure critical BMS controllers (like those managing fire safety systems or essential plant) continue operating during power outages, maintaining monitoring and control capabilities."
  },
  {
    id: 6,
    question: "Why must mains cables be segregated from LV control wiring?",
    options: [
      "To reduce installation costs",
      "To prevent electromagnetic interference and ensure safety",
      "To make the installation look neater",
      "To comply with manufacturer preferences"
    ],
    correctAnswer: 1,
    explanation: "Mains voltage cables can induce electromagnetic interference in low voltage control circuits, causing signal errors or equipment malfunction. Segregation also provides safety separation between different voltage bands."
  },
  {
    id: 7,
    question: "What standard governs electrical safety for BMS wiring in the UK?",
    options: [
      "BS 5839",
      "BS 7671",
      "BS 6266",
      "BS 5266"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 (Requirements for Electrical Installations - IET Wiring Regulations) is the UK standard that governs electrical safety for all electrical installations, including BMS wiring."
  },
  {
    id: 8,
    question: "What percentage spare capacity should typically be left in trunking?",
    options: [
      "20%",
      "30%",
      "40%",
      "50%"
    ],
    correctAnswer: 2,
    explanation: "40% spare capacity should be maintained in trunking to avoid overcrowding, allow for future additions, maintain proper heat dissipation, and facilitate cable installation and maintenance."
  },
  {
    id: 9,
    question: "Why are ferrules used on stranded conductors?",
    options: [
      "To change the wire colour",
      "To prevent loose strands causing faults and ensure secure terminations",
      "To increase the wire resistance",
      "To make wires easier to bend"
    ],
    correctAnswer: 1,
    explanation: "Ferrules prevent individual strands from breaking away and causing short circuits or poor connections. They ensure all strands are captured in the termination, providing a secure and reliable connection."
  },
  {
    id: 10,
    question: "In the real-world example, what caused the CO₂ sensors to give unstable readings?",
    options: [
      "Faulty sensors",
      "Incorrect power supply voltage",
      "Electromagnetic interference from nearby mains cables",
      "Poor network connectivity"
    ],
    correctAnswer: 2,
    explanation: "The CO₂ sensors' 0-10V signal cables were run in the same trunking as 230V fan power supplies. The electromagnetic interference from the mains cables caused noise in the analog signals, resulting in unstable readings."
  }
];