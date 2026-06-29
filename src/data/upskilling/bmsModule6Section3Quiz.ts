export const bmsModule6Section3Quiz = [
  {
    id: 1,
    question: 'What is the main purpose of a BMS dashboard?',
    options: [
      'To store the building electrical test certificates',
      'To convert technical data into actionable information for decision-making',
      'To replace the field controllers that run the plant',
      'To log every keystroke made by maintenance engineers',
    ],
    correctAnswer: 1,
    explanation:
      'BMS dashboards convert complex technical data into clear, actionable information that allows facility managers and operators to quickly assess building performance and make informed decisions.',
  },
  {
    id: 2,
    question: 'Why do dashboards simplify building data?',
    options: [
      'They hide alarm conditions so operators are not distracted',
      'They reduce the number of sensors the system needs',
      'They present complex control systems as easy-to-read graphics and summaries',
      'They compress historical data so it cannot be reviewed later',
    ],
    correctAnswer: 2,
    explanation:
      'Dashboards simplify building data by presenting complex control systems and hundreds of data points as easy-to-read graphics, charts, and visual summaries that non-technical users can understand.',
  },
  {
    id: 3,
    question: 'Give one example of information displayed on a dashboard floor plan.',
    options: [
      'The wiring schematic of each distribution board',
      'The annual electricity bill for the building',
      'The make and model of every installed controller',
      'Room temperatures with colour-coded zones showing normal/alarm status',
    ],
    correctAnswer: 3,
    explanation:
      'Dashboard floor plans typically display live data overlays such as room temperatures, occupancy status, equipment status, or alarm conditions using colour coding (green=normal, red=alarm, yellow=warning).',
  },
  {
    id: 4,
    question: 'What is one KPI that might be used in a dashboard?',
    options: [
      'Percentage of time within comfort temperature band',
      'The colour scheme used for the floor-plan graphics',
      'The number of operators logged into the system',
      'The cable type used between sensors and controllers',
    ],
    correctAnswer: 0,
    explanation:
      "A common KPI displayed on BMS dashboards is '% time within comfort band' which shows how often building conditions meet target ranges, helping assess system performance and occupant comfort.",
  },
  {
    id: 5,
    question: 'Why is remote access important for modern dashboards?',
    options: [
      'It removes the need for any on-site maintenance staff',
      'It allows operators to monitor and respond to building issues from anywhere',
      'It speeds up the field controllers that run the plant',
      'It stops unauthorised users from viewing building data',
    ],
    correctAnswer: 1,
    explanation:
      'Remote access through web-based dashboards allows facility managers to monitor building performance, respond to alarms, and make adjustments from anywhere using tablets, phones, or laptops.',
  },
  {
    id: 6,
    question: 'What is one risk of miswired sensors feeding into dashboards?',
    options: [
      'The dashboard graphics load more slowly than normal',
      'The trend charts display data in the wrong colour',
      'Operators make incorrect decisions based on false data displayed',
      'The remote access feature is automatically disabled',
    ],
    correctAnswer: 2,
    explanation:
      'Miswired sensors can display false values on dashboards, leading operators to make incorrect decisions about building systems, potentially affecting comfort, efficiency, and safety.',
  },
  {
    id: 7,
    question: 'Why is accurate labelling important for dashboards?',
    options: [
      'It makes the dashboard graphics load faster',
      'It reduces the number of sensors needed in the building',
      'It allows the dashboard to run without an internet connection',
      'It ensures dashboard displays correspond to the correct equipment and locations',
    ],
    correctAnswer: 3,
    explanation:
      'Accurate labelling ensures that dashboard displays show data from the correct sensors and equipment, preventing confusion and ensuring operators can identify exactly which systems or locations need attention.',
  },
  {
    id: 8,
    question: "What is the electrician's role in dashboard commissioning?",
    options: [
      'Testing devices and verifying that field changes appear correctly on dashboards',
      'Designing the dashboard graphics and choosing the colour scheme',
      'Setting the KPI targets used to judge building performance',
      'Writing the control logic that runs inside the BMS software',
    ],
    correctAnswer: 0,
    explanation:
      'During commissioning, electricians test devices and verify that changes in the field (like adjusting thermostats or switching equipment) are reflected accurately and immediately on dashboard displays.',
  },
  {
    id: 9,
    question: 'What type of chart might be used for historical performance in dashboards?',
    options: [
      'A single-point gauge showing the current value only',
      'Interactive trend charts showing data over time',
      'A static floor plan with no live data overlay',
      'An on/off status indicator for each item of plant',
    ],
    correctAnswer: 1,
    explanation:
      'Interactive trend charts are commonly used in dashboards to display historical performance data over time, allowing operators to analyze patterns, identify issues, and track improvements.',
  },
  {
    id: 10,
    question: 'In the real-world example, why did CO₂ levels appear low on the dashboard?',
    options: [
      'The CO₂ sensor had been set to display in the wrong units',
      'The dashboard refresh rate was set too slowly',
      'The CO₂ sensor had been wired into the wrong input channel',
      'The ventilation fans were running at full speed',
    ],
    correctAnswer: 2,
    explanation:
      'The CO₂ sensor had been wired into the wrong input channel, causing the dashboard to display values from an unused spare channel instead of the actual sensor readings, masking the real air quality problems.',
  },
];
