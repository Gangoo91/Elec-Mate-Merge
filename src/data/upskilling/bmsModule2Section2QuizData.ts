import { QuizQuestion } from '@/types/quiz';

export const bmsModule2Section2QuizData: QuizQuestion[] = [
  {
    id: 1,
    question: 'Name one type of temperature sensor commonly used in BMS applications.',
    options: [
      'Ultrasonic sensor',
      'Thermistor (NTC/PTC)',
      'PIR sensor',
      'CO₂ sensor',
    ],
    correctAnswer: 1,
    explanation:
      'Thermistors (NTC/PTC) are common temperature sensors in BMS systems. NTC (Negative Temperature Coefficient) resistance decreases as temperature increases, while PTC (Positive Temperature Coefficient) resistance increases with temperature.',
  },
  {
    id: 2,
    question: 'What is an RTD sensor primarily used for in building systems?',
    options: [
      'Detecting occupancy in rooms',
      'Measuring CO₂ levels',
      'Accurate temperature measurement',
      'Monitoring humidity levels',
    ],
    correctAnswer: 2,
    explanation:
      'RTD (Resistance Temperature Detector) sensors like Pt100 and Pt1000 are used for highly accurate temperature measurement. They offer excellent stability and repeatability, making them ideal for critical temperature monitoring applications.',
  },
  {
    id: 3,
    question: 'Why might a thermocouple be chosen over a thermistor for certain applications?',
    options: [
      'Thermocouples are cheaper to install',
      'Thermocouples are more accurate at room temperature',
      'Thermocouples use less power',
      'Thermocouples can measure much higher temperatures',
    ],
    correctAnswer: 3,
    explanation:
      'Thermocouples can measure very high temperatures (up to 1000°C+) making them suitable for industrial applications, boiler monitoring, and high-temperature processes where thermistors would be damaged.',
  },
  {
    id: 4,
    question: 'What does RH stand for in humidity measurements?',
    options: [
      'Relative Humidity',
      'Radiant Heat',
      'Room Heating',
      'Resistance Heating',
    ],
    correctAnswer: 0,
    explanation:
      'RH stands for Relative Humidity, which is the amount of moisture in the air expressed as a percentage of the maximum amount of moisture the air can hold at that temperature.',
  },
  {
    id: 5,
    question: 'What type of signal do humidity sensors typically provide to a BMS?',
    options: [
      'Digital on/off signals only',
      'Analog signals (0-10V or 4-20mA)',
      'High-frequency pulse signals',
      '230V AC switching signals',
    ],
    correctAnswer: 1,
    explanation:
      'Humidity sensors typically provide analog output signals (0-10V or 4-20mA) that correspond to the relative humidity percentage, allowing the BMS to monitor and control humidity levels precisely.',
  },
  {
    id: 6,
    question: 'At what CO₂ level might a BMS typically increase ventilation in office spaces?',
    options: [
      '2500 ppm',
      '500 ppm',
      '1000 ppm',
      '200 ppm',
    ],
    correctAnswer: 2,
    explanation:
      'Most BMS systems increase ventilation when CO₂ levels reach around 1000 ppm. This helps maintain good indoor air quality and occupant comfort, as levels above 1000 ppm can cause drowsiness and reduced cognitive performance.',
  },
  {
    id: 7,
    question: 'Why is CO₂ monitoring important in classrooms and offices?',
    options: [
      'To monitor heating system efficiency',
      'To control lighting levels automatically',
      'To detect fire hazards early',
      'To ensure good air quality and prevent drowsiness',
    ],
    correctAnswer: 3,
    explanation:
      'CO₂ monitoring ensures good indoor air quality. High CO₂ levels indicate poor ventilation and can cause drowsiness, reduced concentration, and health issues. Monitoring allows the BMS to increase fresh air supply when needed.',
  },
  {
    id: 8,
    question: 'What type of sensor is typically used to detect occupancy in offices?',
    options: [
      'PIR (Passive Infrared) sensor',
      '3 minutes (or 5 minutes per BS 7671)',
      'Insulated gloves and safety glasses',
      'When indicator shows fault',
    ],
    correctAnswer: 0,
    explanation:
      'PIR (Passive Infrared) sensors are commonly used for occupancy detection in offices. They detect movement by sensing changes in infrared radiation from warm bodies moving through their detection zone.',
  },
  {
    id: 9,
    question: 'Why must sensor placement be considered carefully during installation?',
    options: [
      'To reduce the cost of installation',
      'To avoid interference and ensure accurate readings',
      'To comply with fire safety regulations only',
      'To make wiring easier for electricians',
    ],
    correctAnswer: 1,
    explanation:
      'Careful sensor placement is crucial to avoid interference and ensure accurate readings. For example, temperature sensors near heat sources, humidity sensors in draughts, or CO₂ sensors near windows can give false readings and cause system malfunction.',
  },
  {
    id: 10,
    question: "In the real-world example, why did the school's ventilation system fail initially?",
    options: [
      'The sensors were not calibrated properly',
      'The BMS software had a programming error',
      'CO₂ sensors were placed too close to open windows',
      'The ventilation fans were undersized',
    ],
    correctAnswer: 2,
    explanation:
      'The CO₂ sensors were placed too close to open windows, causing false low readings from fresh air diluting the CO₂ levels. This prevented the ventilation system from activating when actually needed, leading to poor indoor air quality.',
  },
];
