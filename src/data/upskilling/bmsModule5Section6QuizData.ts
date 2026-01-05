import { QuizQuestion } from '@/components/quiz/types';

export const bmsModule5Section6QuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Why is network planning essential in BMS?",
    options: [
      "To reduce installation costs only",
      "To ensure all devices can communicate efficiently and prevent data clashes",
      "To eliminate the need for termination resistors",
      "To allow unlimited device connections"
    ],
    correctAnswer: 1,
    explanation: "Network planning ensures reliable communication by respecting device limits, cable lengths, and topology rules. Poor planning leads to data clashes, delays, and communication failures."
  },
  {
    id: 2,
    question: "What is the maximum recommended cable length for RS-485?",
    options: [
      "500m",
      "1200m",
      "2000m",
      "100m"
    ],
    correctAnswer: 1,
    explanation: "RS-485 has a maximum recommended cable length of approximately 1200m per segment. Beyond this distance, signal quality degrades significantly and communication becomes unreliable."
  },
  {
    id: 3,
    question: "How many devices can typically be on a Modbus RTU segment?",
    options: [
      "Up to 16 devices",
      "Up to 32 devices",
      "Up to 64 devices",
      "Up to 127 devices"
    ],
    correctAnswer: 1,
    explanation: "Modbus RTU typically supports up to 32 devices per segment. This limit ensures reliable communication and manageable response times across the network."
  },
  {
    id: 4,
    question: "Why should RS-485 be daisy-chained rather than star-wired?",
    options: [
      "To reduce cable costs",
      "To prevent signal reflections and maintain proper impedance",
      "To allow more devices per segment",
      "To eliminate termination requirements"
    ],
    correctAnswer: 1,
    explanation: "RS-485 must be daisy-chained to maintain proper 120Ω characteristic impedance and prevent signal reflections. Star wiring creates impedance mismatches that cause communication problems."
  },
  {
    id: 5,
    question: "What does segmentation mean in network design?",
    options: [
      "Using different cable types for different devices",
      "Breaking a large network into smaller, manageable sections",
      "Installing devices in separate buildings only",
      "Using star topology instead of daisy-chain"
    ],
    correctAnswer: 1,
    explanation: "Segmentation means dividing a large network into smaller sections, each with fewer devices. This reduces traffic congestion, isolates faults, and improves overall system performance."
  },
  {
    id: 6,
    question: "Give one benefit of segmentation in large networks.",
    options: [
      "Eliminates the need for protocol conversion",
      "Reduces traffic congestion and improves response times",
      "Allows unlimited cable lengths",
      "Removes termination requirements"
    ],
    correctAnswer: 1,
    explanation: "Segmentation reduces traffic congestion by distributing devices across multiple network sections. This dramatically improves response times and overall system performance."
  },
  {
    id: 7,
    question: "What is latency in a BMS network?",
    options: [
      "The maximum cable length allowed",
      "The delay between sending a message and receiving a response",
      "The number of devices on a segment",
      "The type of cable termination used"
    ],
    correctAnswer: 1,
    explanation: "Latency is the time delay between sending a command and receiving a response. High latency in BMS means commands take too long to execute, which can be critical in safety systems."
  },
  {
    id: 8,
    question: "Give one cause of high latency.",
    options: [
      "Using shielded cables",
      "Proper cable termination",
      "Too many devices on a single bus segment",
      "Regular network maintenance"
    ],
    correctAnswer: 2,
    explanation: "Having too many devices on a single bus segment creates data bottlenecks where devices must wait their turn to communicate, significantly increasing response times and latency."
  },
  {
    id: 9,
    question: "How can electricians reduce interference on comms cabling?",
    options: [
      "Use unshielded cables near motors",
      "Keep communications cables separate from mains power cables",
      "Install cables in the same tray as power cables",
      "Remove all cable terminations"
    ],
    correctAnswer: 1,
    explanation: "Electricians should maintain minimum 300mm separation between communications and power cables, especially near VSDs and motors. This prevents electromagnetic interference that can cause communication errors."
  },
  {
    id: 10,
    question: "In the real-world example, what change reduced latency from 20–30 seconds to under 1 second?",
    options: [
      "Replacing all devices with newer models",
      "Using different communication protocols",
      "Splitting the single loop into five properly terminated segments",
      "Installing more powerful routers"
    ],
    correctAnswer: 2,
    explanation: "The shopping centre project split 150+ devices from one overloaded MSTP loop into five segments of 30 devices each, with proper termination. This eliminated the communication bottleneck and restored normal response times."
  }
];