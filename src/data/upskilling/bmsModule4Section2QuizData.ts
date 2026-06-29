import { QuizQuestion } from '@/types/quiz';

export const bmsModule4Section2QuizData: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is daylight harvesting?',
    options: [
      'Storing surplus daylight in batteries for use after dark',
      'Adjusting artificial lighting based on available natural light',
      'Switching lights on and off purely on a fixed time schedule',
      'Using mirrors and light pipes to bring daylight deeper into a building',
    ],
    correctAnswer: 1,
    explanation:
      'Daylight harvesting is the practice of adjusting artificial lighting levels automatically based on the amount of natural light available in a space, typically using light sensors to maintain consistent illumination whilst reducing energy consumption.',
  },
  {
    id: 2,
    question: 'Why might only some lights dim in a daylight harvesting system?',
    options: [
      'Because dimmable drivers are only fitted to a few luminaires',
      'Because the BMS dims lights in strict rotation to balance lamp wear',
      'Because natural light distribution varies across the space',
      'Because interior luminaires use a higher voltage than perimeter ones',
    ],
    correctAnswer: 2,
    explanation:
      'Natural light distribution varies significantly across a space - areas near windows receive more daylight than interior zones. Therefore, only lights in well-lit areas need to dim whilst interior lights maintain full output to ensure consistent illumination throughout the space.',
  },
  {
    id: 3,
    question: 'What device measures natural light levels?',
    options: [
      'PIR occupancy sensor',
      'CO₂ air quality sensor',
      'Thermistor temperature sensor',
      'Lux sensor (light sensor)',
    ],
    correctAnswer: 3,
    explanation:
      'Lux sensors (also called light sensors or photosensors) measure the intensity of natural light in a space, typically in lux units. This measurement is used by the BMS to determine how much artificial lighting is needed to maintain target illumination levels.',
  },
  {
    id: 4,
    question: 'What does PIR stand for?',
    options: [
      'Passive Infrared Sensor',
      'Primary Installation Relay',
      'Power Infrared Resistor',
      'Programmable Integration Router',
    ],
    correctAnswer: 0,
    explanation:
      'PIR stands for Passive Infrared Sensor. These sensors detect changes in infrared radiation (heat) emitted by moving objects, particularly human body heat, making them ideal for occupancy detection in lighting control systems.',
  },
  {
    id: 5,
    question: 'Why do PIR sensors use a time delay before switching off lights?',
    options: [
      'To give the lamps time to cool down before being switched off',
      'To prevent nuisance switching when occupants are still but not moving',
      'To allow the daylight sensor to take a fresh lux reading first',
      'To stagger switching so that not all lights turn off at once',
    ],
    correctAnswer: 1,
    explanation:
      'PIR sensors use time delays to prevent lights from switching off when people are present but stationary (e.g., reading, working at a desk, sitting in meetings). Without this delay, lights would frequently turn off, causing annoyance and disruption.',
  },
  {
    id: 6,
    question: 'Give one example of a space where PIR logic is effective.',
    options: [
      'Street lighting',
      '24-hour control rooms',
      'Meeting rooms',
      'Emergency lighting',
    ],
    correctAnswer: 2,
    explanation:
      'Meeting rooms are ideal for PIR logic because they are intermittently occupied with clear periods of vacancy between meetings. This allows significant energy savings by automatically switching lights off when rooms are empty.',
  },
  {
    id: 7,
    question: 'Why should PIR sensors not be installed near HVAC vents?',
    options: [
      'Condensation from the vent can short the sensor terminals',
      'The vent blocks the sensor’s line of sight to the floor',
      'The metal ductwork interferes with the sensor’s wiring',
      'Air movement can cause false triggering',
    ],
    correctAnswer: 3,
    explanation:
      'HVAC air movement can cause false triggering of PIR sensors by moving papers, blinds, or other objects that change temperature, leading to unnecessary activation of lights in unoccupied spaces and reduced energy savings.',
  },
  {
    id: 8,
    question: 'How can electricians calibrate daylight sensors accurately?',
    options: [
      'Using a lux meter to set light levels to industry standards',
      'By estimating the light level by eye against a reference chart',
      'By setting the sensor to the manufacturer’s default value and leaving it',
      'By matching the sensor output to the nearest PIR occupancy zone',
    ],
    correctAnswer: 0,
    explanation:
      'Electricians should use calibrated lux meters to measure actual light levels and set sensors to maintain industry-standard illumination levels (e.g., 300-500 lux for offices) ensuring both energy efficiency and adequate lighting for tasks.',
  },
  {
    id: 9,
    question: 'Why should PIR and daylight zones be grouped logically?',
    options: [
      'To reduce the total number of dimmable drivers required',
      'To avoid conflicts like lights switching on at full brightness in bright daylight',
      'To allow every luminaire to be controlled from a single switch',
      'To ensure all zones share the same logging frequency',
    ],
    correctAnswer: 1,
    explanation:
      'Logical grouping prevents conflicting control actions, such as PIR sensors switching lights to full brightness in spaces where daylight harvesting should keep them dimmed, ensuring coordinated and efficient lighting control.',
  },
  {
    id: 10,
    question: 'In the real-world example, what was the annual energy saving after corrections?',
    options: [
      '25%',
      '30%',
      '35%',
      '40%',
    ],
    correctAnswer: 2,
    explanation:
      'After repositioning the daylight sensors and properly commissioning the combined PIR and daylight harvesting system, the secondary school achieved a 35% annual lighting energy saving.',
  },
];
