import { QuizQuestion } from '@/types/quiz';

export const bmsModule2Section4QuizData: QuizQuestion[] = [
  {
    id: 1,
    question: "Why is correct sensor placement important in BMS installations?",
    options: [
      "To reduce installation costs and time",
      "To ensure sensors provide accurate readings for proper system control",
      "To make the sensors look aesthetically pleasing",
      "To comply with electrical safety regulations only"
    ],
    correctAnswer: 1,
    explanation: "Correct sensor placement is crucial because sensors must provide accurate readings that represent true environmental conditions. Poor placement leads to false readings, which cause poor system control, energy waste, and occupant discomfort."
  },
  {
    id: 2,
    question: "What is the typical mounting height for room temperature sensors?",
    options: [
      "0.5-0.8m above floor level",
      "1.2-1.5m above floor level",
      "2.0-2.5m above floor level",
      "At ceiling level for best coverage"
    ],
    correctAnswer: 1,
    explanation: "Room temperature sensors should typically be mounted at 1.2-1.5m above floor level, which represents the average occupant height and provides readings representative of the conditions people actually experience."
  },
  {
    id: 3,
    question: "Why should temperature sensors not be placed near windows?",
    options: [
      "Windows are difficult to access for maintenance",
      "Windows may cause condensation problems",
      "Solar gain and draughts cause false temperature readings",
      "Windows may interfere with sensor radio signals"
    ],
    correctAnswer: 2,
    explanation: "Temperature sensors should not be placed near windows because solar heat gain during sunny periods and cold draughts can cause false readings that don't represent the actual room conditions, leading to poor temperature control."
  },
  {
    id: 4,
    question: "Where should CO₂ sensors be installed for accurate readings?",
    options: [
      "Next to ventilation grilles for fresh air detection",
      "In breathing zones, 1-2m above floor level in occupied spaces",
      "At ceiling level for maximum coverage",
      "Near windows for outside air comparison"
    ],
    correctAnswer: 1,
    explanation: "CO₂ sensors should be installed in breathing zones (1-2m above floor level) in occupied spaces to accurately measure the CO₂ levels that occupants are actually breathing, providing proper input for ventilation control."
  },
  {
    id: 5,
    question: "Why should CO₂ sensors not be placed near ventilation grilles?",
    options: [
      "Ventilation grilles are too noisy for sensor operation",
      "Fresh air from grilles can cause false low CO₂ readings",
      "Ventilation grilles may damage the sensors",
      "Grilles interfere with sensor calibration"
    ],
    correctAnswer: 1,
    explanation: "CO₂ sensors should not be placed near ventilation grilles because fresh air from the grilles will cause false low CO₂ readings, making the sensor reading non-representative of actual occupied space conditions."
  },
  {
    id: 6,
    question: "What kind of area must occupancy sensors have to work correctly?",
    options: [
      "A heated area to detect temperature changes",
      "A clear line of sight with no obstructions",
      "An area with good natural lighting",
      "A quiet area without vibrations"
    ],
    correctAnswer: 1,
    explanation: "Occupancy sensors must have a clear line of sight of the area to be monitored, without obstructions such as furniture, partitions, or equipment that could block detection of occupant movement."
  },
  {
    id: 7,
    question: "Name one factor that can cause false triggers in PIR sensors.",
    options: [
      "Low ambient temperature in the room",
      "Direct sunlight or heat sources affecting the sensor",
      "High humidity levels in the environment",
      "Background noise from electrical equipment"
    ],
    correctAnswer: 1,
    explanation: "PIR (Passive Infrared) sensors can be caused to false trigger by direct sunlight or heat sources such as radiators, as they detect changes in infrared radiation which can be affected by these heat sources."
  },
  {
    id: 8,
    question: "Why is it important to walk the space before installing sensors?",
    options: [
      "To measure the exact room dimensions",
      "To understand how the space is used and identify potential interference sources",
      "To check the structural integrity of mounting surfaces",
      "To verify electrical supply availability"
    ],
    correctAnswer: 1,
    explanation: "Walking the space before installation helps understand how the area is actually used, identify potential sources of interference (heat sources, draughts, obstructions), and determine optimal sensor locations for accurate readings."
  },
  {
    id: 9,
    question: "Why should sensor locations be labelled and documented?",
    options: [
      "To comply with building insurance requirements",
      "For future maintenance, troubleshooting, and system modifications",
      "To make the installation look professional",
      "To meet fire safety regulations"
    ],
    correctAnswer: 1,
    explanation: "Sensor locations should be labelled and documented for future maintenance teams, troubleshooting activities, system modifications, and to provide clear reference information for ongoing building management."
  },
  {
    id: 10,
    question: "In the real-world example, why did the office ventilation system underperform?",
    options: [
      "The sensors were not calibrated properly",
      "CO₂ sensors near windows gave false low readings when windows opened",
      "The ventilation fans were undersized for the space",
      "The BMS software had programming errors"
    ],
    correctAnswer: 1,
    explanation: "The CO₂ sensors were installed near openable windows, so when windows were opened, the sensors detected low CO₂ levels from outside air and the BMS incorrectly reduced ventilation, leading to poor air quality when windows were closed."
  }
];