export const bmsModule6Section2Quiz = [
  {
    id: 1,
    question: 'What is trend logging in a BMS?',
    options: [
      'The automatic raising of an alarm when a value exceeds its setpoint',
      'The process of recording values at set intervals for historical analysis',
      'The live display of current sensor values on the head-end graphics',
      'The averaging of multiple sensors into a single control value',
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
      'Continuous data is stored on the controller, event-based on the server',
      'Continuous data is recorded at regular intervals, event-based only when something changes',
      'Continuous data is unprocessed, event-based has been scaled into units',
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
      'It automatically resets tripped equipment back to normal operation',
      'It removes the need to attend site to investigate intermittent faults',
      'It guarantees the sensor readings are correctly calibrated',
    ],
    correctAnswer: 0,
    explanation:
      'Historical data allows engineers to see the sequence of events leading up to a fault, helping identify root causes and prevent future occurrences.',
  },
  {
    id: 5,
    question: 'Give one compliance reason for logging historical data.',
    options: [
      'To reduce the storage capacity required on the BMS server',
      'To provide statutory testing records and regulatory compliance evidence',
      'To speed up the controller scan rate during normal operation',
      'To eliminate the need for periodic sensor calibration',
    ],
    correctAnswer: 1,
    explanation:
      'Many regulations require logged proof of operation, such as HVAC Legionella checks, energy reporting requirements, and safety system testing records.',
  },
  {
    id: 6,
    question: 'How can trend logs help identify wasted energy?',
    options: [
      'By raising an alarm the instant any energy meter exceeds its limit',
      'By automatically switching off plant that is not in use',
      'By showing equipment running outside of scheduled hours',
      'By increasing the logging frequency of every energy meter',
    ],
    correctAnswer: 2,
    explanation:
      'Trend logs can reveal patterns of energy waste, such as equipment running during unoccupied hours or systems operating unnecessarily, enabling targeted energy savings.',
  },
  {
    id: 7,
    question: 'Why is sensor calibration important in trend logging?',
    options: [
      'It reduces the amount of disk space the trend logs consume',
      'It increases the maximum logging frequency the controller supports',
      'It prevents the BMS from raising any false alarms',
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
      'A faster log frequency always improves sensor accuracy',
      'Too frequent creates data overload; too slow misses important events',
      'The log frequency must match the mains supply frequency of 50 Hz',
      'A slower log frequency increases the controller processing load',
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
