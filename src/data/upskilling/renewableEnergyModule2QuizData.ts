import { QuizQuestion } from '@/types/quiz';

// Section 1: PV Panel Types Quiz Data
export const section1Questions: QuizQuestion[] = [
  {
    id: 1,
    question: 'Which panel type is typically the most efficient?',
    options: [
      'All are equally efficient',
      'Monocrystalline',
      'Polycrystalline',
      'Thin-film',
    ],
    correctAnswer: 1,
    explanation:
      'Monocrystalline panels typically achieve the highest efficiency ratings (18-22%) due to their single-crystal silicon structure, which allows electrons to flow more freely.',
  },
  {
    id: 2,
    question: 'What makes thin-film better in low-light conditions?',
    options: [
      'Higher voltage output',
      'Lower temperature coefficient',
      'Better performance in diffuse light',
      'Thicker semiconductor layers',
    ],
    correctAnswer: 2,
    explanation:
      'Thin-film technologies, particularly amorphous silicon, perform better in diffuse light conditions because they can capture a broader spectrum of light and maintain output even when direct sunlight is limited.',
  },
  {
    id: 3,
    question: 'Which panel type has a bluish hue?',
    options: [
      'Monocrystalline',
      'PERC panels',
      'Thin-film',
      'Polycrystalline',
    ],
    correctAnswer: 3,
    explanation:
      'Polycrystalline panels have a distinctive bluish appearance due to the way light reflects off the multiple silicon crystals in their structure.',
  },
  {
    id: 4,
    question: 'Why would someone choose polycrystalline over monocrystalline panels?',
    options: [
      'Lower cost per watt',
      'Better aesthetics',
      'Higher efficiency',
      'Longer warranty',
    ],
    correctAnswer: 0,
    explanation:
      'Polycrystalline panels are typically chosen for their lower cost per watt, making them more budget-friendly despite their slightly lower efficiency compared to monocrystalline panels.',
  },
  {
    id: 5,
    question: 'What factor affects solar panel performance at high temperatures?',
    options: [
      'Voltage rating',
      'Temperature coefficient',
      'Panel thickness',
      'Frame material',
    ],
    correctAnswer: 1,
    explanation:
      "The temperature coefficient determines how much a panel's output decreases as temperature rises above standard test conditions (25°C). Lower temperature coefficients mean better high-temperature performance.",
  },
];

// Section 3: String Design Quiz Data
export const section3Questions: QuizQuestion[] = [
  {
    id: 1,
    question: 'What does VOC stand for in solar panel specifications?',
    options: [
      'Voltage Operating Capacity',
      'Voltage Open Circuit',
      'Voltage of Current',
      'Variable Output Current',
    ],
    correctAnswer: 1,
    explanation:
      'VOC stands for Voltage Open Circuit, which is the maximum voltage a solar panel produces when no current is flowing (open circuit conditions).',
  },
  {
    id: 2,
    question: 'What happens if panel voltage exceeds inverter input voltage limits?',
    options: [
      'The system operates normally',
      'Power output increases',
      'The inverter can be damaged',
      'The panels become more efficient',
    ],
    correctAnswer: 2,
    explanation:
      "If panel voltage exceeds the inverter's maximum input voltage, the inverter can be permanently damaged. This is why proper string design within MPPT voltage windows is critical.",
  },
  {
    id: 3,
    question: 'Parallel strings primarily affect which electrical parameter?',
    options: [
      'Voltage',
      'Frequency',
      'Power factor',
      'Current',
    ],
    correctAnswer: 3,
    explanation:
      'Parallel strings add their currents together while maintaining the same voltage. Each additional parallel string increases the total current output of the array.',
  },
  {
    id: 4,
    question: 'What factor causes VOC to decrease in hot climates?',
    options: [
      'Higher ambient temperature',
      'Lower humidity',
      'Increased sunlight intensity',
      'Increased wind speed',
    ],
    correctAnswer: 0,
    explanation:
      'Higher ambient temperatures cause VOC to decrease due to the negative temperature coefficient of voltage in photovoltaic cells. This is why temperature derating is essential in system design.',
  },
  {
    id: 5,
    question: 'What does MPPT stand for?',
    options: [
      'Multiple Panel Power Transfer',
      'Maximum Power Point Tracking',
      'Minimum Power Point Tolerance',
      'Maximum Panel Power Technology',
    ],
    correctAnswer: 1,
    explanation:
      "MPPT stands for Maximum Power Point Tracking. It's a technology used in inverters to continuously adjust the operating point to extract maximum power from solar panels under varying conditions.",
  },
];

// Section 5: PV System Layouts Quiz Data
export const section5Questions: QuizQuestion[] = [
  {
    id: 1,
    question: 'Where should a DC isolator be located?',
    options: [
      'Underground for safety',
      'Close to the PV array and accessible',
      'Inside the house near the consumer unit',
      'At the inverter only',
    ],
    correctAnswer: 1,
    explanation:
      'DC isolators should be located close to the PV array and remain accessible for maintenance while being clearly visible and marked for safety.',
  },
  {
    id: 2,
    question: 'What component separates the AC and DC sides of a PV system?',
    options: [
      'The combiner box',
      'The DC isolator',
      'The inverter',
      'The generation meter',
    ],
    correctAnswer: 2,
    explanation:
      'The inverter converts DC electricity from the solar panels to AC electricity for use in the building and grid connection, effectively separating the DC and AC sides.',
  },
  {
    id: 3,
    question: 'Why is proper cable containment important in PV installations?',
    options: [
      'Current type they can safely interrupt',
      'Combining multiple DC string outputs',
      'Close to the PV array and accessible',
      'To meet safety regulations and prevent damage',
    ],
    correctAnswer: 3,
    explanation:
      'Proper cable containment protects cables from physical damage, UV exposure, and weather while meeting safety regulations and maintaining system reliability.',
  },
  {
    id: 4,
    question: 'Which is a key electrical regulation for PV installations?',
    options: [
      'IEC 60364',
      'ISO 9001',
      'BS 7909',
      'EN 50110',
    ],
    correctAnswer: 0,
    explanation:
      'IEC 60364 is the international standard for electrical installations of buildings, including requirements for PV systems, isolation, and safety.',
  },
  {
    id: 5,
    question: 'What is a combiner box used for in PV systems?',
    options: [
      'Converting DC to AC power',
      'Combining multiple DC string outputs',
      'Monitoring system performance',
      'Isolating the AC side',
    ],
    correctAnswer: 1,
    explanation:
      'A combiner box safely combines multiple DC string outputs into a single DC circuit, often including overcurrent protection and monitoring capabilities.',
  },
];

// Section 6: Single-Line Diagrams Quiz Data
export const section6Questions: QuizQuestion[] = [
  {
    id: 1,
    question: 'What does SLD stand for in electrical design?',
    options: [
      'Standard Legal Document',
      'Single-Line Diagram',
      'Solar Layout Diagram',
      'System Load Diagram',
    ],
    correctAnswer: 1,
    explanation:
      'SLD stands for Single-Line Diagram, which is a simplified electrical schematic that shows the connections and components in a power system using single lines.',
  },
  {
    id: 2,
    question: 'Name three components found on every PV system SLD:',
    options: [
      'Transformers, relays, switches',
      'Batteries, controllers, monitors',
      'Panels, inverter, isolators',
      'Meters, fuses, contactors',
    ],
    correctAnswer: 2,
    explanation:
      'Every PV system SLD includes solar panels, inverter(s), and isolation devices (DC and AC isolators) as fundamental safety and operational components.',
  },
  {
    id: 3,
    question: 'Why is inverter placement important in system design?',
    options: [
      'For aesthetic reasons only',
      'To improve panel efficiency',
      'To reduce installation costs',
      'To minimise DC cable runs and losses',
    ],
    correctAnswer: 3,
    explanation:
      'Inverter placement should minimise DC cable runs to reduce power losses, installation costs, and voltage drop while maintaining accessibility for maintenance.',
  },
  {
    id: 4,
    question: 'What system component provides energy feedback data to the grid?',
    options: [
      'The generation meter',
      'The DC isolator',
      'The inverter display',
      'The combiner box',
    ],
    correctAnswer: 0,
    explanation:
      'The generation meter (export meter) measures and records the amount of electricity fed back into the grid, providing data for feed-in tariffs and grid management.',
  },
  {
    id: 5,
    question: 'What is the key difference between AC and DC isolators?',
    options: [
      'To minimise DC cable runs and losses',
      'Current type they can safely interrupt',
      'Better performance in diffuse light',
      'Combining multiple DC string outputs',
    ],
    correctAnswer: 1,
    explanation:
      "AC and DC isolators are designed for different current types - DC isolators can safely interrupt direct current (which doesn't naturally cross zero), while AC isolators are for alternating current.",
  },
];

// Section 4: Mounting Systems Quiz Data
export const section4Questions: QuizQuestion[] = [
  {
    id: 1,
    question: 'What forces are most critical to consider in wind-prone areas?',
    options: [
      'Gravitational and magnetic forces',
      'Uplift and lateral forces',
      'Compressive and tensile forces',
      'Shear and torsional forces',
    ],
    correctAnswer: 1,
    explanation:
      'In wind-prone areas, uplift forces (attempting to lift panels off the roof) and lateral forces (horizontal wind loads) are most critical for structural design and mounting system selection.',
  },
  {
    id: 2,
    question: 'What is the most common material for solar panel mounting rails?',
    options: [
      'Steel',
      'Plastic composite',
      'Aluminium',
      'Stainless steel',
    ],
    correctAnswer: 2,
    explanation:
      'Aluminium is the most common material for solar mounting rails due to its excellent strength-to-weight ratio, corrosion resistance, and ease of installation.',
  },
  {
    id: 3,
    question: 'Which mounting type is typically heavier?',
    options: [
      'Weight depends on panel type',
      'Fixed/penetrative mount',
      'Both are equal weight',
      'Ballasted mount',
    ],
    correctAnswer: 3,
    explanation:
      'Ballasted mounting systems are typically heavier because they rely on concrete blocks or other heavy materials to provide stability without penetrating the roof membrane.',
  },
  {
    id: 4,
    question: 'What is a key structural consideration for flat roof installations?',
    options: [
      'All of the above',
      'Building load limits',
      'Wind uplift resistance',
      'Snow load capacity',
    ],
    correctAnswer: 0,
    explanation:
      'Flat roof installations must consider wind uplift resistance, snow load capacity, and building structural load limits. All these factors are critical for safe and compliant installations.',
  },
  {
    id: 5,
    question: 'Why might you choose ground mount over roof mount installation?',
    options: [
      'Easier maintenance access',
      'All of the above',
      'Structural limitations of building',
      'Better orientation options',
    ],
    correctAnswer: 1,
    explanation:
      'Ground mount installations offer easier maintenance access, optimal orientation regardless of building direction, and avoid structural limitations of existing buildings, making them ideal for many applications.',
  },
];

// Section 2: Site Assessment Quiz Data
export const section2Questions: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is the optimal orientation for solar panels in the UK?',
    options: [
      'North-facing',
      'South-facing',
      'East-facing',
      'West-facing',
    ],
    correctAnswer: 1,
    explanation:
      'South-facing orientation is optimal in the UK as it maximises exposure to the sun throughout the day, capturing the most solar irradiance in the Northern Hemisphere.',
  },
  {
    id: 2,
    question: 'Name a tool commonly used for shading analysis:',
    options: [
      'Oscilloscope',
      'Digital multimeter',
      'Solar pathfinder',
      'Power meter',
    ],
    correctAnswer: 2,
    explanation:
      'A solar pathfinder is a specialised tool that uses a transparent dome with sun-path overlays to identify and quantify shading throughout the year at a specific location.',
  },
  {
    id: 3,
    question: 'What is solar irradiance measured in?',
    options: [
      'Kilojoules per hour (kJ/h)',
      'Volts per metre (V/m)',
      'Amperes per square metre (A/m²)',
      'Watts per square metre (W/m²)',
    ],
    correctAnswer: 3,
    explanation:
      'Solar irradiance is measured in watts per square metre (W/m²), representing the power of solar radiation incident on a surface area.',
  },
  {
    id: 4,
    question: 'Why does tilt angle matter for solar panel installation?',
    options: [
      'It optimises solar irradiance capture',
      'It improves aesthetics',
      'It affects wind resistance',
      'It reduces installation costs',
    ],
    correctAnswer: 0,
    explanation:
      "Tilt angle is critical because it affects how much solar irradiance the panels receive. The optimal tilt angle varies by latitude and season, typically matching the site's latitude for year-round optimisation.",
  },
  {
    id: 5,
    question: "What's generally worse for solar panel performance: winter or summer shading?",
    options: [
      'Summer shading',
      'Winter shading',
      'Both are equally problematic',
      'Neither affects performance significantly',
    ],
    correctAnswer: 1,
    explanation:
      'Winter shading is generally worse because the sun is lower in the sky, creating longer shadows. Additionally, winter shading affects performance when solar generation is already reduced due to shorter days and lower irradiance levels.',
  },
];
