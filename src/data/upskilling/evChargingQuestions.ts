import { QuizQuestion } from '@/types/quiz';

export const evChargingQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the maximum DC voltage typically used in rapid charging systems?",
    options: ["400V", "800V", "1000V", "1200V"],
    correctAnswer: 2,
    explanation: "Most rapid charging systems operate at up to 1000V DC to enable faster charging times while maintaining safety standards.",
    moduleId: 1
  },
  {
    id: 2,
    question: "Which type of connector is standard for Type 2 AC charging in the UK?",
    options: ["CCS", "CHAdeMO", "Mennekes", "Tesla Supercharger"],
    correctAnswer: 2,
    explanation: "The Mennekes (Type 2) connector is the European standard for AC charging and is widely used in the UK.",
    moduleId: 1
  },
  {
    id: 3,
    question: "What is the minimum cable cross-sectional area required for a 32A EV charging point?",
    options: ["2.5mm²", "4mm²", "6mm²", "10mm²"],
    correctAnswer: 2,
    explanation: "For 32A charging, 6mm² cable is typically required to handle the current safely according to BS7671.",
    moduleId: 3
  },
  {
    id: 4,
    question: "Which protective device is specifically required for EV charging installations?",
    options: ["RCBO", "RCD Type A", "RCD Type B", "MCB only"],
    correctAnswer: 2,
    explanation: "RCD Type B is required for EV charging as it can detect DC residual currents that may occur during charging.",
    moduleId: 4
  },
  {
    id: 5,
    question: "What is the maximum charging current for a standard domestic Type 2 socket?",
    options: ["16A", "32A", "63A", "125A"],
    correctAnswer: 1,
    explanation: "Standard domestic Type 2 sockets are typically rated at 32A for single-phase charging.",
    moduleId: 2
  },
  {
    id: 6,
    question: "Which British Standard covers the installation of EV charging equipment?",
    options: ["BS 7671", "BS 1362", "BS 546", "BS 6004"],
    correctAnswer: 0,
    explanation: "BS 7671 (IET Wiring Regulations) covers the electrical installation requirements for EV charging equipment.",
    moduleId: 1
  },
  {
    id: 7,
    question: "What is the typical power rating of a rapid DC charger?",
    options: ["7kW", "22kW", "50kW+", "3.6kW"],
    correctAnswer: 2,
    explanation: "Rapid DC chargers typically start at 50kW and can go up to 350kW or more for ultra-rapid charging.",
    moduleId: 2
  },
  {
    id: 8,
    question: "Which communication protocol is commonly used in EV charging infrastructure?",
    options: ["Modbus", "OCPP", "BACnet", "KNX"],
    correctAnswer: 1,
    explanation: "OCPP (Open Charge Point Protocol) is the standard communication protocol for EV charging infrastructure.",
    moduleId: 5
  },
  {
    id: 9,
    question: "What type of earthing arrangement is required for outdoor EV charging points?",
    options: ["TT", "TN-S", "TN-C-S", "IT"],
    correctAnswer: 1,
    explanation: "TN-S earthing is preferred for EV charging installations to ensure proper protective conductor integrity.",
    moduleId: 4
  },
  {
    id: 10,
    question: "What is the minimum IP rating required for outdoor EV charging equipment?",
    options: ["IP44", "IP54", "IP65", "IP67"],
    correctAnswer: 1,
    explanation: "IP54 is the minimum rating for outdoor EV charging equipment to protect against dust and water ingress.",
    moduleId: 3
  },
  {
    id: 11,
    question: "Which type of cable is recommended for buried EV charging installations?",
    options: ["SWA", "FP200", "MICC", "PVC/PVC"],
    correctAnswer: 0,
    explanation: "SWA (Steel Wire Armoured) cable provides mechanical protection and is ideal for buried installations.",
    moduleId: 3
  },
  {
    id: 12,
    question: "What is the maximum loop impedance for a 32A Type B RCD protecting an EV charger?",
    options: ["1.44Ω", "1.15Ω", "0.87Ω", "0.35Ω"],
    correctAnswer: 0,
    explanation: "For 32A Type B RCD, maximum Zs is 1.44Ω to ensure disconnection within required time limits.",
    moduleId: 4
  },
  {

