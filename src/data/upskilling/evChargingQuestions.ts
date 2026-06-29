import { QuizQuestion } from '@/types/quiz';

export const evChargingQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the maximum DC voltage typically used in rapid charging systems?",
    options: [
      "1200V",
      "1000V",
      "400V",
      "800V",
    ],
    correctAnswer: 1,
    explanation: "Most rapid charging systems operate at up to 1000V DC to enable faster charging times while maintaining safety standards.",
    moduleId: 1
  },
  {
    id: 2,
    question: "Which type of connector is standard for Type 2 AC charging in the UK?",
    options: [
      "CCS",
      "CHAdeMO",
      "Mennekes",
      "Tesla Supercharger",
    ],
    correctAnswer: 2,
    explanation: "The Mennekes (Type 2) connector is the European standard for AC charging and is widely used in the UK.",
    moduleId: 1
  },
  {
    id: 3,
    question: "What is the minimum cable cross-sectional area required for a 32A EV charging point?",
    options: [
      "2.5mm²",
      "4mm²",
      "10mm²",
      "6mm²",
    ],
    correctAnswer: 3,
    explanation: "For 32A charging, 6mm² cable is typically required to handle the current safely according to BS7671.",
    moduleId: 3
  },
  {
    id: 4,
    question: "Which protective device is specifically required for EV charging installations?",
    options: [
      "RCD Type B",
      "RCD Type A",
      "RCBO",
      "MCB only",
    ],
    correctAnswer: 0,
    explanation: "EV charging requires protection against smooth DC residual current. A Type B RCD achieves this; alternatively a Type A RCD may be used where the charging point incorporates a 6mA DC fault detection device (RDC-DD).",
    moduleId: 4
  },
  {
    id: 5,
    question: "What is the maximum charging current for a standard domestic Type 2 socket?",
    options: [
      "16A",
      "32A",
      "63A",
      "125A",
    ],
    correctAnswer: 1,
    explanation: "Standard domestic Type 2 sockets are typically rated at 32A for single-phase charging.",
    moduleId: 2
  },
  {
    id: 6,
    question: "Which British Standard covers the installation of EV charging equipment?",
    options: [
      "BS 6004",
      "BS 1362",
      "BS 7671",
      "BS 546",
    ],
    correctAnswer: 2,
    explanation: "BS 7671 (IET Wiring Regulations) covers the electrical installation requirements for EV charging equipment.",
    moduleId: 1
  },
  {
    id: 7,
    question: "What is the typical power rating of a rapid DC charger?",
    options: [
      "7kW",
      "22kW",
      "3.6kW",
      "50kW+",
    ],
    correctAnswer: 3,
    explanation: "Rapid DC chargers typically start at 50kW and can go up to 350kW or more for ultra-rapid charging.",
    moduleId: 2
  },
  {
    id: 8,
    question: "Which communication protocol is commonly used in EV charging infrastructure?",
    options: [
      "OCPP",
      "Modbus",
      "BACnet",
      "KNX",
    ],
    correctAnswer: 0,
    explanation: "OCPP (Open Charge Point Protocol) is the standard communication protocol for EV charging infrastructure.",
    moduleId: 5
  },
  {
    id: 9,
    question: "Where a PME (TN-C-S) supply cannot safely be used, what earthing arrangement is the conventional solution for an outdoor EV charging point?",
    options: [
      "IT",
      "TN-S",
      "TN-C-S",
      "TT",
    ],
    correctAnswer: 3,
    explanation: "Section 722 restricts the use of a PME earth on EV points because of the danger from an open PEN conductor; a local TT island with its own earth electrode and 30 mA RCD is the conventional alternative where an open-PEN protective device is not used.",
    moduleId: 4
  },
  {
    id: 10,
    question: "What is the minimum IP rating required for outdoor EV charging equipment?",
    options: [
      "IP44",
      "IP65",
      "IP54",
      "IP67",
    ],
    correctAnswer: 2,
    explanation: "IP54 is the minimum rating for outdoor EV charging equipment to protect against dust and water ingress.",
    moduleId: 3
  },
  {
    id: 11,
    question: "Which type of cable is recommended for buried EV charging installations?",
    options: [
      "MICC",
      "PVC/PVC",
      "FP200",
      "SWA",
    ],
    correctAnswer: 3,
    explanation: "SWA (Steel Wire Armoured) cable provides mechanical protection and is ideal for buried installations.",
    moduleId: 3
  },
  {
    id: 12,
    question: "What is the maximum earth fault loop impedance (Zs) for a 32A Type B circuit-breaker on the final circuit feeding an EV charger (230V, 0.4s)?",
    options: [
      "1.44Ω",
      "1.37Ω",
      "0.87Ω",
      "0.35Ω",
    ],
    correctAnswer: 1,
    explanation: "For a 32A Type B MCB, maximum Zs is 1.37Ω per Table 41.3, which applies the Cmin factor of 0.95 (230 × 0.95 ÷ (5 × 32)). 1.44Ω is the older pre-Cmin figure.",
    moduleId: 4
  }
];
