import { QuizQuestion } from '@/types/quiz';

export const bmsModule3Section6QuizData: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is the difference between an alarm response and a safety shutdown?',
    options: [
      'An alarm response shuts plant down immediately; a safety shutdown only logs the event for later review',
      'Alarm responses notify and may trigger corrective actions; safety shutdowns override normal operation to protect life and property',
      'There is no difference; the two terms describe the same BMS action',
      'An alarm response is hard-wired; a safety shutdown is always actioned manually by the operator',
    ],
    correctAnswer: 1,
    explanation:
      'Alarm responses notify operators of abnormal conditions and may trigger corrective actions, while safety shutdowns override normal BMS operation to protect life, property, and equipment during hazardous conditions.',
  },
  {
    id: 2,
    question: 'Give one example of an equipment alarm.',
    options: [
      'High CO₂ level detected in an occupied office',
      'Room temperature drifting above its comfort setpoint',
      'Fan failure or pump fault detected by the BMS',
      'Occupancy detected outside of normal working hours',
    ],
    correctAnswer: 2,
    explanation:
      'Fan failure or pump fault is a typical equipment alarm where the BMS detects equipment malfunction through status monitoring via current sensors or auxiliary contacts, triggering maintenance alerts and possibly switching to standby equipment.',
  },
  {
    id: 3,
    question: 'What type of alarm occurs if CO₂ levels become too high?',
    options: [
      'Equipment alarm',
      'Fire alarm',
      'Electrical alarm',
      'Environmental alarm',
    ],
    correctAnswer: 3,
    explanation:
      'High CO₂ levels trigger an environmental alarm because it relates to indoor air quality conditions. The BMS typically responds by increasing ventilation rates to bring CO₂ levels back within acceptable limits.',
  },
  {
    id: 4,
    question: 'Why are safety shutdowns more critical than standard alarms?',
    options: [
      'They override normal operation to prevent life-threatening situations or equipment damage',
      'They are logged to the trend history, whereas standard alarms are not',
      'They can be acknowledged remotely, whereas standard alarms cannot',
      'They occur far more frequently than standard alarms during normal operation',
    ],
    correctAnswer: 0,
    explanation:
      'Safety shutdowns are more critical because they override normal BMS operation to prevent life-threatening situations, property damage, or equipment failures from escalating into catastrophic events.',
  },
  {
    id: 5,
    question: 'What happens to AHUs during a fire alarm?',
    options: [
      'They ramp up to full speed to purge the building of smoke',
      'They shut down to prevent smoke spread through ductwork',
      'They continue running on their normal occupancy schedule',
      'They switch to recirculation mode to maintain comfort conditions',
    ],
    correctAnswer: 1,
    explanation:
      'During a fire alarm, AHUs typically shut down to prevent smoke spread through the ductwork system, while designated smoke extract fans may start to maintain proper pressure differentials according to the fire strategy.',
  },
  {
    id: 6,
    question: 'What protective action might the BMS take if a chiller overheats?',
    options: [
      'Increase the chilled water setpoint to reduce the load',
      'Log the high temperature but allow the chiller to keep running',
      'Shut down the chiller to prevent catastrophic damage',
      'Switch the chiller to its maximum cooling output',
    ],
    correctAnswer: 2,
    explanation:
      'If a chiller overheats, the BMS shuts it down immediately to prevent catastrophic damage such as compressor failure, which could be extremely expensive to repair and potentially dangerous.',
  },
  {
    id: 7,
    question: 'What devices do electricians install to allow safe shutdown of circuits?',
    options: [
      'Passive infrared occupancy sensors',
      'Analogue 4-20 mA pressure transmitters',
      'Daylight-linked dimming photocells',
      'Emergency relays and contactors',
    ],
    correctAnswer: 3,
    explanation:
      'Electricians install emergency relays and contactors that allow the BMS to interrupt power safely during emergency conditions while maintaining proper electrical isolation and safety standards.',
  },
  {
    id: 8,
    question: 'Why must alarm circuits be labelled separately from control wiring?',
    options: [
      'To prevent confusion during maintenance and ensure safety circuits are not accidentally modified',
      'To allow the alarm circuits to be run at a higher voltage than control wiring',
      'To reduce the total length of cable needed across the installation',
      'Because alarm circuits do not require any cable identification under the regulations',
    ],
    correctAnswer: 0,
    explanation:
      'Alarm and shutdown circuits must be clearly labelled to prevent confusion during maintenance and ensure safety-critical circuits are not accidentally modified, disconnected, or interfered with during routine work.',
  },
  {
    id: 9,
    question: 'What commissioning step is required to test shutdown sequences?',
    options: [
      'Review the trend logs from the previous month for any past alarms',
      'Simulate fire, gas, and fault alarms to prove sequences work correctly',
      'Increase every sensor logging frequency to its maximum setting',
      'Disable the safety interlocks so the plant can run continuously',
    ],
    correctAnswer: 1,
    explanation:
      'Commissioning must include simulating fire, gas, and fault alarms using appropriate test equipment to prove that all shutdown sequences work correctly, respond within acceptable time limits, and operate in the proper sequence.',
  },
  {
    id: 10,
    question:
      'In the real-world example, what prevented the AHU from shutting down during a fire alarm test?',
    options: [
      'The AHU time delay had been set too long to react in time',
      'The fire alarm panel battery was flat during the test',
      'A miswired relay connecting the fire alarm output to the wrong BMS input',
      'The BMS controller had lost its network connection to the head-end',
    ],
    correctAnswer: 2,
    explanation:
      'In the shopping mall example, a miswired relay connected the fire alarm Zone 7 output to the wrong BMS input terminal, preventing the AHU from receiving the shutdown command during fire alarm activation.',
  },
];
