import { QuizQuestion } from '@/types/quiz';

export const bmsModule4Section2QuizData: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is daylight harvesting?',
    options: [
      'Using a lux meter to set light levels to industry standards',
      'Adjusting artificial lighting based on available natural light',
      'To prevent nuisance switching when occupants are still but not moving',
      'Because natural light distribution varies across the space',
    ],
    correctAnswer: 1,
    explanation:
      'Daylight harvesting is the practice of adjusting artificial lighting levels automatically based on the amount of natural light available in a space, typically using light sensors to maintain consistent illumination whilst reducing energy consumption.',
  },
  {
    id: 2,
    question: 'Why might only some lights dim in a daylight harvesting system?',
    options: [
      'Adjusting artificial lighting based on available natural light',
      'To prevent nuisance switching when occupants are still but not moving',
      'Because natural light distribution varies across the space',
      'Using a lux meter to set light levels to industry standards',
    ],
    correctAnswer: 2,
    explanation:
      'Natural light distribution varies significantly across a space - areas near windows receive more daylight than interior zones. Therefore, only lights in well-lit areas need to dim whilst interior lights maintain full output to ensure consistent illumination throughout the space.',
  },
  {
    id: 3,
    question: 'What device measures natural light levels?',
    options: [
      'Peak value divided by RMS value',
      'High resistance - investigate',
      'Not suitable for direct burial',
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
      'Passive Infrared Receiver',
      'Primary Installation Relay',
      'Power Infrared Receiver',
      'Programmable Integration Router',
    ],
    correctAnswer: 0,
    explanation:
      'PIR stands for Passive Infrared Receiver. These sensors detect infrared radiation (heat) emitted by moving objects, particularly human body heat, making them ideal for occupancy detection in lighting control systems.',
  },
  {
    id: 5,
    question: 'Why do PIR sensors use a time delay before switching off lights?',
    options: [
      'Using a lux meter to set light levels to industry standards',
      'To prevent nuisance switching when occupants are still but not moving',
      'Adjusting artificial lighting based on available natural light',
      'To avoid conflicts like lights switching on at full brightness in bright daylight',
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
      'Star wiring instead of daisy-chain topology',
      'Zero for perfectly balanced loads',
      'They are metal and within the building',
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
      'Because natural light distribution varies across the space',
      'Adjusting artificial lighting based on available natural light',
      'To prevent nuisance switching when occupants are still but not moving',
    ],
    correctAnswer: 0,
    explanation:
      'Electricians should use calibrated lux meters to measure actual light levels and set sensors to maintain industry-standard illumination levels (e.g., 300-500 lux for offices) ensuring both energy efficiency and adequate lighting for tasks.',
  },
  {
    id: 9,
    question: 'Why should PIR and daylight zones be grouped logically?',
    options: [
      'Because natural light distribution varies across the space',
      'To avoid conflicts like lights switching on at full brightness in bright daylight',
      'Adjusting artificial lighting based on available natural light',
      'Using a lux meter to set light levels to industry standards',
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
