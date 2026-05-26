export const bmsModule6Section2Quiz = [
  {
    id: 1,
    question: 'What is trend logging in a BMS?',
    options: [
      'Too frequent creates data overload; too slow misses important events',
      'The process of recording values at set intervals for historical analysis',
      'Miscalibrated sensors create misleading historical data',
      'By showing equipment running outside of scheduled hours',
    ],
    correctAnswer: 1,
    explanation:
      'Trend logging is the process of recording values (like temperature, pressure, CO₂) at set intervals to create historical data for analysis, fault diagnosis, and compliance.',
  },
  {
    id: 2,
    question: 'What is the difference between continuous data and event-based data?',
    options: [
      'Continuous data is for temperatures, event-based is for pressures',
      'There is no difference between the two types',
      'Continuous data is recorded constantly, event-based only when something changes',
      'Event-based data is more accurate than continuous data',
    ],
    correctAnswer: 2,
    explanation:
      'Continuous data is recorded at regular intervals (e.g., temperature every 5 minutes), while event-based data is only recorded when specific events occur (e.g., pump switching on/off).',
  },
  {
    id: 3,
    question: 'Give one example of a parameter typically logged in continuous mode.',
    options: [
      'Pump start/stop events',
      'Alarm acknowledgements',
      'Door access events',
      'Temperature readings',
    ],
    correctAnswer: 3,
    explanation:
      'Temperature is typically logged continuously at regular intervals (e.g., every 5-15 minutes) to track trends and identify issues over time.',
  },
  {
    id: 4,
    question: 'Why is historical data useful for fault diagnosis?',
    options: [
      'It allows engineers to trace what happened before and after an alarm',
      'By showing equipment running outside of scheduled hours',
      'To provide statutory testing records and regulatory compliance evidence',
      'The process of recording values at set intervals for historical analysis',
    ],
    correctAnswer: 0,
    explanation:
      'Historical data allows engineers to see the sequence of events leading up to a fault, helping identify root causes and prevent future occurrences.',
  },
  {
    id: 5,
    question: 'Give one compliance reason for logging historical data.',
    options: [
      'Miscalibrated sensors create misleading historical data',
      'To provide statutory testing records and regulatory compliance evidence',
      'The process of recording values at set intervals for historical analysis',
      'By showing equipment running outside of scheduled hours',
    ],
    correctAnswer: 1,
    explanation:
      'Many regulations require logged proof of operation, such as HVAC Legionella checks, energy reporting requirements, and safety system testing records.',
  },
  {
    id: 6,
    question: 'How can trend logs help identify wasted energy?',
    options: [
      'It allows engineers to trace what happened before and after an alarm',
      'To provide statutory testing records and regulatory compliance evidence',
      'By showing equipment running outside of scheduled hours',
      'The CO₂ sensor was wired but never powered',
    ],
    correctAnswer: 2,
    explanation:
      'Trend logs can reveal patterns of energy waste, such as equipment running during unoccupied hours or systems operating unnecessarily, enabling targeted energy savings.',
  },
  {
    id: 7,
    question: 'Why is sensor calibration important in trend logging?',
    options: [
      'To provide statutory testing records and regulatory compliance evidence',
      'It allows engineers to trace what happened before and after an alarm',
      'The CO₂ sensor was wired but never powered',
      'Miscalibrated sensors create misleading historical data',
    ],
    correctAnswer: 3,
    explanation:
      'If sensors are not properly calibrated, the logged data will be inaccurate, making historical analysis unreliable and potentially leading to wrong decisions.',
  },
  {
    id: 8,
    question: 'What type of cabling should be used for analog signals to prevent noise?',
    options: [
      'Shielded cabling',
      'Standard twin and earth cable',
      'Coaxial cable only',
      'Fibre optic cable',
    ],
    correctAnswer: 0,
    explanation:
      'Shielded cabling should be used for analog signals (0-10V, 4-20mA) to prevent electrical noise interference that could corrupt the logged data.',
  },
  {
    id: 9,
    question: 'Why should log frequencies be chosen carefully?',
    options: [
      'To provide statutory testing records and regulatory compliance evidence',
      'Too frequent creates data overload; too slow misses important events',
      'By showing equipment running outside of scheduled hours',
      'Miscalibrated sensors create misleading historical data',
    ],
    correctAnswer: 1,
    explanation:
      'Logging frequency must be balanced - too frequent logging creates unnecessary data storage and processing overhead, while too slow logging might miss critical events or trends.',
  },
  {
    id: 10,
    question: 'In the real-world example, why did the CO₂ logs show a flat line?',
    options: [
      'The sensor was in the wrong location',
      'The BMS software had a bug',
      'The CO₂ sensor was wired but never powered',
      'The building had perfect air quality',
    ],
    correctAnswer: 2,
    explanation:
      'The CO₂ sensor had been wired to the BMS but never powered, so it was logging false zero readings (400 ppm default) instead of actual air quality measurements.',
  },
];
