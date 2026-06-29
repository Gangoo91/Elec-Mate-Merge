// Functional Skills Mock Exam - Question Bank Part 1
// Questions 1-100: Mathematics (1-40), English (41-80), Digital Skills (81-100)
// Contextualised for UK electrical trade apprentices

import type { StandardMockQuestion } from '@/types/standardMockExam';

export const questionsPart1: StandardMockQuestion[] = [
  // ============================================================
  // MATHEMATICS (Questions 1-40)
  // ============================================================

  // ---- Number Systems (Questions 1-10) ----

  {
    id: 1,
    question: 'An electrician buys 3 rolls of cable at £48.50 each. What is the total cost?',
    options: [
      '£151.50',
      '£145.50',
      '£142.50',
      '£148.50',
    ],
    correctAnswer: 1,
    explanation:
      '3 × £48.50 = £145.50. When multiplying decimals, multiply as whole numbers first (3 × 4850 = 14550) then place the decimal point to give two decimal places.',
    section: 'Number Systems',
    difficulty: 'basic',
    topic: 'Arithmetic',
    category: 'Mathematics',
  },
  {
    id: 2,
    question: 'Using BIDMAS, calculate: 12 + 3 × (8 - 2)',
    options: [
      '90',
      '54',
      '30',
      '18',
    ],
    correctAnswer: 2,
    explanation:
      'Following BIDMAS: Brackets first (8 - 2 = 6), then Multiplication (3 × 6 = 18), then Addition (12 + 18 = 30). The correct answer is 30.',
    section: 'Number Systems',
    difficulty: 'basic',
    topic: 'BIDMAS',
    category: 'Mathematics',
  },
  {
    id: 3,
    question:
      'An electrician measures a cable run as 14.375 metres. What is this rounded to one decimal place?',
    options: [
      '14.3m',
      '14.0m',
      '14.5m',
      '14.4m',
    ],
    correctAnswer: 3,
    explanation:
      'To round 14.375 to one decimal place, look at the second decimal digit (7). Since 7 ≥ 5, round up the first decimal place from 3 to 4, giving 14.4m.',
    section: 'Number Systems',
    difficulty: 'basic',
    topic: 'Decimals',
    category: 'Mathematics',
  },
  {
    id: 4,
    question:
      'A consumer unit has 12 ways. If ¾ of the ways are currently used, how many spare ways remain?',
    options: [
      '3',
      '6',
      '4',
      '8',
    ],
    correctAnswer: 0,
    explanation:
      '¾ of 12 = 9 ways used. 12 - 9 = 3 spare ways remaining. To find a fraction of a number, divide by the denominator and multiply by the numerator.',
    section: 'Number Systems',
    difficulty: 'basic',
    topic: 'Fractions',
    category: 'Mathematics',
  },
  {
    id: 5,
    question: 'A job is quoted at £2,400 plus VAT at 20%. What is the total cost including VAT?',
    options: [
      '£2,640',
      '£2,880',
      '£2,800',
      '£2,920',
    ],
    correctAnswer: 1,
    explanation:
      '20% of £2,400 = £480. Total = £2,400 + £480 = £2,880. To find 20%, multiply the amount by 0.20 and add it to the original.',
    section: 'Number Systems',
    difficulty: 'basic',
    topic: 'Percentages',
    category: 'Mathematics',
  },
  {
    id: 6,
    question:
      'If a cable costs £1.85 per metre and you need 47 metres, estimate the cost to the nearest £10.',
    options: [
      '£70',
      '£80',
      '£90',
      '£100',
    ],
    correctAnswer: 2,
    explanation:
      '£1.85 × 47 = £86.95. Rounded to the nearest £10, this is £90. Estimation is a key skill for providing quick quotes on site.',
    section: 'Number Systems',
    difficulty: 'intermediate',
    topic: 'Arithmetic',
    category: 'Mathematics',
  },
  {
    id: 7,
    question: 'Calculate: 4² + 3 × (15 - 7) ÷ 2',
    options: [
      '16',
      '20',
      '24',
      '28',
    ],
    correctAnswer: 3,
    explanation:
      'Following BIDMAS: Brackets (15 - 7 = 8), Indices (4² = 16), Division and Multiplication left to right (3 × 8 = 24, 24 ÷ 2 = 12), Addition (16 + 12 = 28).',
    section: 'Number Systems',
    difficulty: 'intermediate',
    topic: 'BIDMAS',
    category: 'Mathematics',
  },
  {
    id: 8,
    question:
      'An apprentice earns £8.60 per hour for a 37.5-hour week. What is the weekly gross pay?',
    options: [
      '£322.50',
      '£310.50',
      '£315.00',
      '£325.00',
    ],
    correctAnswer: 0,
    explanation:
      '£8.60 × 37.5 = £322.50. Break this into easier steps: £8.60 × 37 = £318.20, plus £8.60 × 0.5 = £4.30, total £322.50.',
    section: 'Number Systems',
    difficulty: 'intermediate',
    topic: 'Decimals',
    category: 'Mathematics',
  },
  {
    id: 9,
    question: 'A 100m drum of cable has ⅜ remaining. How many metres are left on the drum?',
    options: [
      '35.0m',
      '37.5m',
      '38.0m',
      '33.5m',
    ],
    correctAnswer: 1,
    explanation:
      '⅜ of 100m = 100 ÷ 8 × 3 = 12.5 × 3 = 37.5m. This is a common calculation when checking stock levels on site.',
    section: 'Number Systems',
    difficulty: 'intermediate',
    topic: 'Fractions',
    category: 'Mathematics',
  },
  {
    id: 10,
    question:
      'An electrical wholesaler offers a 15% trade discount on a £680 order. What is the discounted price?',
    options: [
      '£568.00',
      '£588.00',
      '£578.00',
      '£598.00',
    ],
    correctAnswer: 2,
    explanation:
      '15% of £680 = £102. Discounted price = £680 - £102 = £578.00. Alternatively, multiply £680 by 0.85 (100% - 15% = 85%).',
    section: 'Number Systems',
    difficulty: 'intermediate',
    topic: 'Percentages',
    category: 'Mathematics',
  },

  // ---- Units & Measurement (Questions 11-20) ----

  {
    id: 11,
    question: 'What is the SI unit of electrical resistance?',
    options: [
      'Ampere (A)',
      'Watt (W)',
      'Volt (V)',
      'Ohm (Ω)',
    ],
    correctAnswer: 3,
    explanation:
      'The ohm (Ω) is the SI unit of electrical resistance, named after Georg Ohm. It describes the opposition to current flow in a circuit.',
    section: 'Units & Measurement',
    difficulty: 'basic',
    topic: 'SI Units',
    category: 'Mathematics',
  },
  {
    id: 12,
    question: 'Convert 2,500mm to metres.',
    options: [
      '2.5m',
      '25m',
      '0.25m',
      '250m',
    ],
    correctAnswer: 0,
    explanation:
      'There are 1,000mm in 1 metre. 2,500 ÷ 1,000 = 2.5m. This conversion is essential when reading technical drawings where dimensions may be in millimetres.',
    section: 'Units & Measurement',
    difficulty: 'basic',
    topic: 'Conversion',
    category: 'Mathematics',
  },
  {
    id: 13,
    question: 'A room measures 4.2m × 3.8m. Calculate the floor area.',
    options: [
      '16.00m²',
      '15.96m²',
      '15.86m²',
      '16.06m²',
    ],
    correctAnswer: 1,
    explanation:
      'Area = length × width = 4.2 × 3.8 = 15.96m². Knowing floor areas helps when calculating the number of socket outlets required per room.',
    section: 'Units & Measurement',
    difficulty: 'basic',
    topic: 'Area',
    category: 'Mathematics',
  },
  {
    id: 14,
    question:
      'A cable trunking has internal dimensions of 50mm × 100mm. What is its cross-sectional area in mm²?',
    options: [
      '500mm²',
      '150mm²',
      '5,000mm²',
      '50,000mm²',
    ],
    correctAnswer: 2,
    explanation:
      'Cross-sectional area = width × height = 50 × 100 = 5,000mm². This calculation is needed when applying cable capacity factors to trunking.',
    section: 'Units & Measurement',
    difficulty: 'intermediate',
    topic: 'Area',
    category: 'Mathematics',
  },
  {
    id: 15,
    question: 'A hot water cylinder has a capacity of 120 litres. How many cubic metres is this?',
    options: [
      '1.2m³',
      '12m³',
      '0.012m³',
      '0.12m³',
    ],
    correctAnswer: 3,
    explanation:
      '1 cubic metre = 1,000 litres. Therefore 120 litres = 120 ÷ 1,000 = 0.12m³. Understanding volume conversions is important for heating system calculations.',
    section: 'Units & Measurement',
    difficulty: 'intermediate',
    topic: 'Volume',
    category: 'Mathematics',
  },
  {
    id: 16,
    question: 'On a drawing at 1:50 scale, a cable run measures 6cm. What is the actual length?',
    options: [
      '3m',
      '0.3m',
      '30m',
      '300m',
    ],
    correctAnswer: 0,
    explanation:
      'At 1:50 scale, actual length = drawing length × 50. So 6cm × 50 = 300cm = 3m. Scale drawings are used daily to plan cable routes.',
    section: 'Units & Measurement',
    difficulty: 'intermediate',
    topic: 'Scale Drawings',
    category: 'Mathematics',
  },
  {
    id: 17,
    question: 'Convert 0.47kW to watts.',
    options: [
      '4,700W',
      '470W',
      '4.7W',
      '47W',
    ],
    correctAnswer: 1,
    explanation:
      '1kW = 1,000W. Therefore 0.47kW = 0.47 × 1,000 = 470W. The prefix "kilo" means 1,000.',
    section: 'Units & Measurement',
    difficulty: 'basic',
    topic: 'SI Units',
    category: 'Mathematics',
  },
  {
    id: 18,
    question:
      'A conduit run on a drawing at 1:100 scale measures 4.5cm. What is the real length in metres?',
    options: [
      '0.45m',
      '450m',
      '4.5m',
      '45m',
    ],
    correctAnswer: 2,
    explanation:
      'At 1:100 scale, real length = 4.5cm × 100 = 450cm = 4.5m. Always check the scale on drawings before taking measurements.',
    section: 'Units & Measurement',
    difficulty: 'intermediate',
    topic: 'Scale Drawings',
    category: 'Mathematics',
  },
  {
    id: 19,
    question:
      'An enclosure measures 300mm × 200mm × 150mm internally. What is its internal volume in litres?',
    options: [
      '90 litres',
      '900 litres',
      '0.9 litres',
      '9 litres',
    ],
    correctAnswer: 3,
    explanation:
      'Volume = 300 × 200 × 150 = 9,000,000mm³. Since 1 litre = 1,000,000mm³ (or 1,000cm³), the volume is 9 litres.',
    section: 'Units & Measurement',
    difficulty: 'advanced',
    topic: 'Volume',
    category: 'Mathematics',
  },
  {
    id: 20,
    question: 'How many metres are in 3.75 kilometres?',
    options: [
      '3,750m',
      '37.5m',
      '375m',
      '37,500m',
    ],
    correctAnswer: 0,
    explanation:
      '1 kilometre = 1,000 metres. Therefore 3.75km × 1,000 = 3,750m. Kilometre-to-metre conversion is needed when planning long cable runs for external supplies.',
    section: 'Units & Measurement',
    difficulty: 'basic',
    topic: 'Conversion',
    category: 'Mathematics',
  },

  // ---- Algebra & Formulae (Questions 21-30) ----

  {
    id: 21,
    question:
      "A circuit has a resistance of 0.8Ω and carries 13A. Using Ohm's law (V = IR), what is the voltage drop?",
    options: [
      '16.25V',
      '10.4V',
      '8.0V',
      '13.8V',
    ],
    correctAnswer: 1,
    explanation:
      'V = I × R = 13 × 0.8 = 10.4V. Voltage drop calculations are essential to ensure circuits comply with the maximum voltage drop limits in BS 7671.',
    section: 'Algebra & Formulae',
    difficulty: 'intermediate',
    topic: "Ohm's Law",
    category: 'Mathematics',
  },
  {
    id: 22,
    question:
      'Using the power formula P = IV, calculate the current drawn by a 2,300W appliance connected to a 230V supply.',
    options: [
      '5A',
      '15A',
      '10A',
      '20A',
    ],
    correctAnswer: 2,
    explanation:
      'Rearranging P = IV gives I = P ÷ V = 2,300 ÷ 230 = 10A. This is how we determine the correct fuse or MCB rating for an appliance.',
    section: 'Algebra & Formulae',
    difficulty: 'intermediate',
    topic: 'Power Formula',
    category: 'Mathematics',
  },
  {
    id: 23,
    question: 'Rearrange the formula V = IR to make R the subject.',
    options: [
      'R = V + I',
      'R = V × I',
      'R = I ÷ V',
      'R = V ÷ I',
    ],
    correctAnswer: 3,
    explanation:
      'Starting with V = IR, divide both sides by I to isolate R, giving R = V ÷ I. Transposition of formulae is a key algebraic skill for electrical calculations.',
    section: 'Algebra & Formulae',
    difficulty: 'basic',
    topic: 'Transposition',
    category: 'Mathematics',
  },
  {
    id: 24,
    question: 'If P = I²R, and I = 5A and R = 10Ω, what is the power dissipated?',
    options: [
      '250W',
      '50W',
      '500W',
      '100W',
    ],
    correctAnswer: 0,
    explanation:
      'P = I²R = 5² × 10 = 25 × 10 = 250W. This formula is used to calculate power loss in cables, which causes heating.',
    section: 'Algebra & Formulae',
    difficulty: 'intermediate',
    topic: 'Substitution',
    category: 'Mathematics',
  },
  {
    id: 25,
    question:
      "Using Ohm's law, a 230V supply feeds a circuit with 23Ω resistance. What current flows?",
    options: [
      '5A',
      '10A',
      '15A',
      '20A',
    ],
    correctAnswer: 1,
    explanation:
      'I = V ÷ R = 230 ÷ 23 = 10A. This is a fundamental calculation used when designing circuits and selecting protective devices.',
    section: 'Algebra & Formulae',
    difficulty: 'basic',
    topic: "Ohm's Law",
    category: 'Mathematics',
  },
  {
    id: 26,
    question:
      'A 3kW immersion heater operates on a 230V supply. Using P = V²/R, calculate the heater resistance.',
    options: [
      '13.0Ω',
      '76.7Ω',
      '17.6Ω',
      '23.0Ω',
    ],
    correctAnswer: 2,
    explanation:
      'Rearranging P = V²/R gives R = V²/P = 230² ÷ 3,000 = 52,900 ÷ 3,000 = 17.63Ω (approximately 17.6Ω). This combines transposition with substitution.',
    section: 'Algebra & Formulae',
    difficulty: 'advanced',
    topic: 'Transposition',
    category: 'Mathematics',
  },
  {
    id: 27,
    question:
      'The total resistance of two resistors in series is R = R₁ + R₂. If R₁ = 4.7Ω and R₂ = 6.8Ω, what is the total resistance?',
    options: [
      '5.75Ω',
      '2.1Ω',
      '31.96Ω',
      '11.5Ω',
    ],
    correctAnswer: 3,
    explanation:
      'R = R₁ + R₂ = 4.7 + 6.8 = 11.5Ω. In a series circuit, the total resistance is simply the sum of individual resistances.',
    section: 'Algebra & Formulae',
    difficulty: 'basic',
    topic: 'Substitution',
    category: 'Mathematics',
  },
  {
    id: 28,
    question:
      'Using the power formula P = IV, what power is consumed by a circuit drawing 13A from a 230V supply?',
    options: [
      '2,990W',
      '2,760W',
      '2,530W',
      '3,220W',
    ],
    correctAnswer: 0,
    explanation:
      'P = I × V = 13 × 230 = 2,990W (approximately 3kW). This is a typical calculation for determining the load on a ring final circuit.',
    section: 'Algebra & Formulae',
    difficulty: 'intermediate',
    topic: 'Power Formula',
    category: 'Mathematics',
  },
  {
    id: 29,
    question:
      'The voltage drop formula is Vd = (mV/A/m × Ib × L) ÷ 1,000. If mV/A/m = 18, Ib = 20A, and L = 25m, what is the voltage drop?',
    options: [
      '7.2V',
      '9.0V',
      '10.8V',
      '5.4V',
    ],
    correctAnswer: 1,
    explanation:
      'Vd = (18 × 20 × 25) ÷ 1,000 = 9,000 ÷ 1,000 = 9.0V. This must be checked against BS 7671 limits (typically 3% or 5% of supply voltage).',
    section: 'Algebra & Formulae',
    difficulty: 'advanced',
    topic: 'Substitution',
    category: 'Mathematics',
  },
  {
    id: 30,
    question: 'Rearrange P = I²R to make I the subject.',
    options: [
      'I = P ÷ R',
      'I = P × R',
      'I = √(P ÷ R)',
      'I = √(P × R)',
    ],
    correctAnswer: 2,
    explanation:
      'Starting with P = I²R, divide both sides by R to get P/R = I², then take the square root of both sides to give I = √(P/R).',
    section: 'Algebra & Formulae',
    difficulty: 'advanced',
    topic: 'Transposition',
    category: 'Mathematics',
  },

  // ---- Data & Statistics (Questions 31-40) ----

  {
    id: 31,
    question:
      'An electrician records insulation resistance readings of 200MΩ, 180MΩ, 220MΩ, 190MΩ, and 210MΩ. What is the mean average?',
    options: [
      '190MΩ',
      '180MΩ',
      '210MΩ',
      '200MΩ',
    ],
    correctAnswer: 3,
    explanation:
      'Mean = sum of values ÷ number of values = (200 + 180 + 220 + 190 + 210) ÷ 5 = 1,000 ÷ 5 = 200MΩ.',
    section: 'Data & Statistics',
    difficulty: 'basic',
    topic: 'Averages',
    category: 'Mathematics',
  },
  {
    id: 32,
    question:
      'A bar chart shows energy usage over 4 quarters: Q1 = 450kWh, Q2 = 380kWh, Q3 = 320kWh, Q4 = 510kWh. Which quarter had the highest usage?',
    options: [
      'Q4',
      'Q1',
      'Q3',
      'Q2',
    ],
    correctAnswer: 0,
    explanation:
      'Q4 had the highest usage at 510kWh. Bar charts are commonly used in energy audits and building management reports to visualise consumption patterns.',
    section: 'Data & Statistics',
    difficulty: 'basic',
    topic: 'Charts',
    category: 'Mathematics',
  },
  {
    id: 33,
    question:
      'Earth fault loop impedance readings for five circuits are: 0.35Ω, 0.42Ω, 0.38Ω, 0.45Ω, 0.40Ω. What is the range of these readings?',
    options: [
      '0.07Ω',
      '0.10Ω',
      '0.05Ω',
      '0.12Ω',
    ],
    correctAnswer: 1,
    explanation:
      'Range = highest value - lowest value = 0.45 - 0.35 = 0.10Ω. The range shows the spread in test results and helps identify potential issues.',
    section: 'Data & Statistics',
    difficulty: 'intermediate',
    topic: 'Test Results',
    category: 'Mathematics',
  },
  {
    id: 34,
    question:
      'A pie chart shows energy consumption: lighting 35%, heating 40%, power 20%, other 5%. If the total annual cost is £12,000, how much is spent on lighting?',
    options: [
      '£3,600',
      '£4,800',
      '£4,200',
      '£2,400',
    ],
    correctAnswer: 2,
    explanation:
      '35% of £12,000 = 0.35 × £12,000 = £4,200. Reading percentages from pie charts is useful when analysing energy bills and recommending efficiency improvements.',
    section: 'Data & Statistics',
    difficulty: 'intermediate',
    topic: 'Energy Data',
    category: 'Mathematics',
  },
  {
    id: 35,
    question:
      'Five RCD trip time test results are: 28ms, 32ms, 25ms, 30ms, 30ms. What is the median value?',
    options: [
      '28ms',
      '32ms',
      '29ms',
      '30ms',
    ],
    correctAnswer: 3,
    explanation:
      'To find the median, arrange in order: 25, 28, 30, 30, 32. The middle (3rd) value is 30ms. The median is less affected by extreme values than the mean.',
    section: 'Data & Statistics',
    difficulty: 'intermediate',
    topic: 'Averages',
    category: 'Mathematics',
  },
  {
    id: 36,
    question:
      'A line graph shows monthly electricity consumption dropping from 800kWh in January to 480kWh in June. What is the percentage decrease?',
    options: [
      '40%',
      '35%',
      '30%',
      '45%',
    ],
    correctAnswer: 0,
    explanation:
      'Decrease = 800 - 480 = 320kWh. Percentage decrease = (320 ÷ 800) × 100 = 40%. This type of analysis is used when assessing the impact of energy-saving measures.',
    section: 'Data & Statistics',
    difficulty: 'intermediate',
    topic: 'Energy Data',
    category: 'Mathematics',
  },
  {
    id: 37,
    question:
      'An apprentice scores 72%, 85%, 68%, 78%, and 92% across five mock exams. How many scores are above the mean?',
    options: [
      '1',
      '2',
      '3',
      '4',
    ],
    correctAnswer: 1,
    explanation:
      'Mean = (72 + 85 + 68 + 78 + 92) ÷ 5 = 395 ÷ 5 = 79%. Scores above 79% are 85% and 92%, so 2 scores are above the mean.',
    section: 'Data & Statistics',
    difficulty: 'advanced',
    topic: 'Test Results',
    category: 'Mathematics',
  },
  {
    id: 38,
    question:
      'A dual-axis chart shows temperature and energy usage. If temperature rises from 15°C to 25°C and energy usage drops from 900kWh to 600kWh, what type of correlation is shown?',
    options: [
      'Positive correlation',
      'No correlation',
      'Negative correlation',
      'Random correlation',
    ],
    correctAnswer: 2,
    explanation:
      'When one variable increases and the other decreases, this is a negative correlation. As outdoor temperature rises, heating energy usage typically falls.',
    section: 'Data & Statistics',
    difficulty: 'advanced',
    topic: 'Charts',
    category: 'Mathematics',
  },
  {
    id: 39,
    question:
      'Test results for R1+R2 on 6 radial circuits are: 1.2Ω, 1.1Ω, 1.3Ω, 1.1Ω, 1.2Ω, 1.1Ω. What is the mode?',
    options: [
      '1.2Ω',
      '1.15Ω',
      '1.3Ω',
      '1.1Ω',
    ],
    correctAnswer: 3,
    explanation:
      'The mode is the most frequently occurring value. 1.1Ω appears 3 times, 1.2Ω appears 2 times, and 1.3Ω appears once. So the mode is 1.1Ω.',
    section: 'Data & Statistics',
    difficulty: 'basic',
    topic: 'Test Results',
    category: 'Mathematics',
  },
  {
    id: 40,
    question:
      'A building uses 15,000kWh of electricity per year at a cost of 34p per kWh. If LED lighting reduces consumption by 18%, what is the annual saving?',
    options: [
      '£918',
      '£810',
      '£720',
      '£1,020',
    ],
    correctAnswer: 0,
    explanation:
      '18% of 15,000kWh = 2,700kWh saved. Cost saving = 2,700 × £0.34 = £918. This multi-step calculation combines percentages with unit costs, common in energy assessments.',
    section: 'Data & Statistics',
    difficulty: 'advanced',
    topic: 'Energy Data',
    category: 'Mathematics',
  },

  // ============================================================
  // ENGLISH (Questions 41-80)
  // ============================================================

  // ---- Technical Reading (Questions 41-50) ----

  {
    id: 41,
    question: 'In BS 7671, what does the abbreviation "RCD" stand for?',
    options: [
      'Residual Circuit Device',
      'Residual Current Device',
      'Residual Current Detector',
      'Regulated Current Device',
    ],
    correctAnswer: 1,
    explanation:
      'RCD stands for Residual Current Device. It is a protective device that disconnects the circuit when it detects a difference between live and neutral currents, indicating a fault to earth.',
    section: 'Technical Reading',
    difficulty: 'basic',
    topic: 'BS 7671',
    category: 'English',
  },
  {
    id: 42,
    question: 'When reading a product datasheet for a cable, what does "CSA" typically refer to?',
    options: [
      'Cable Safety Assessment',
      'Circuit Specification Appendix',
      'Cross-Sectional Area',
      'Current Supply Amperage',
    ],
    correctAnswer: 2,
    explanation:
      'CSA stands for Cross-Sectional Area, measured in mm². It is one of the most important specifications on a cable datasheet, determining the current-carrying capacity.',
    section: 'Technical Reading',
    difficulty: 'basic',
    topic: 'Datasheets',
    category: 'English',
  },
  {
    id: 43,
    question: 'A method statement should contain which of the following?',
    options: [
      'A list of the test instruments and their calibration certificate dates',
      'A priced breakdown of labour and materials for the whole project',
      'The contact details of the client and the supply network operator',
      'A step-by-step description of how the work will be carried out safely',
    ],
    correctAnswer: 3,
    explanation:
      'A method statement describes how a job will be carried out safely, including the sequence of work, hazards identified, control measures, and personnel responsible.',
    section: 'Technical Reading',
    difficulty: 'basic',
    topic: 'Method Statements',
    category: 'English',
  },
  {
    id: 44,
    question: 'What does "C2" mean on an Electrical Installation Condition Report (EICR)?',
    options: [
      'Potentially dangerous — urgent remedial action required',
      'Improvement recommended but not immediately dangerous',
      'The installation is safe and satisfactory',
      'Further investigation required without delay',
    ],
    correctAnswer: 0,
    explanation:
      'C2 means "Potentially dangerous" and requires urgent remedial action. The classification codes on an EICR are: C1 (danger present), C2 (potentially dangerous), C3 (improvement recommended), and FI (further investigation required).',
    section: 'Technical Reading',
    difficulty: 'intermediate',
    topic: 'Regulations',
    category: 'English',
  },
  {
    id: 45,
    question: 'When reading BS 7671, the term "shall" indicates what level of requirement?',
    options: [
      '"The circuits were tested and found to be satisfactory."',
      'It is a mandatory requirement that must be followed',
      '"The installation includes lighting, power, and heating circuits."',
      'Potentially dangerous — urgent remedial action required',
    ],
    correctAnswer: 1,
    explanation:
      'In BS 7671, "shall" denotes a mandatory requirement. "Should" indicates a recommendation, and "may" indicates permission or an option. Understanding this distinction is critical for compliance.',
    section: 'Technical Reading',
    difficulty: 'intermediate',
    topic: 'BS 7671',
    category: 'English',
  },
  {
    id: 46,
    question:
      'A cable datasheet states "operating temperature: -5°C to +70°C". What does this mean?',
    options: [
      'The cable must be stored at these temperatures before installation',
      'The cable can carry any current as long as temperature stays in this range',
      'The cable insulation is rated to function safely within this temperature range',
      'The cable can only be installed when the ambient temperature is between these values',
    ],
    correctAnswer: 2,
    explanation:
      'The operating temperature range on a datasheet indicates the temperatures at which the cable insulation will function safely and maintain its rated performance. Exceeding this range can degrade insulation and create a fire risk.',
    section: 'Technical Reading',
    difficulty: 'intermediate',
    topic: 'Datasheets',
    category: 'English',
  },
  {
    id: 47,
    question: 'In a risk assessment, what is a "control measure"?',
    options: [
      'A device that controls electrical circuits',
      'A financial limit on project expenditure',
      'A measurement taken using calibrated test instruments',
      'An action or precaution taken to reduce a risk to an acceptable level',
    ],
    correctAnswer: 3,
    explanation:
      'A control measure is any action, procedure, or equipment used to eliminate or reduce a risk. Examples include wearing PPE, implementing safe isolation procedures, or using barriers around excavations.',
    section: 'Technical Reading',
    difficulty: 'intermediate',
    topic: 'Method Statements',
    category: 'English',
  },
  {
    id: 48,
    question:
      'According to the Electricity at Work Regulations 1989, who has a duty to ensure electrical safety in the workplace?',
    options: [
      'All persons at work who may be affected by electrical danger',
      'Only the qualified electrician who carries out the installation work',
      'Only the employer or company director who owns the business',
      'Only the client or building owner where the work is carried out',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 3 of the Electricity at Work Regulations 1989 places duties on employers, self-employed persons, and employees. The duty applies to all persons at work who could be affected by electrical danger.',
    section: 'Technical Reading',
    difficulty: 'advanced',
    topic: 'Regulations',
    category: 'English',
  },
  {
    id: 49,
    question:
      'A manufacturer\'s installation guide states: "Ensure minimum 50mm clearance from thermal insulation." Why is this instruction included?',
    options: [
      'To make the cable easier to access for maintenance',
      'To prevent the cable from overheating due to reduced heat dissipation',
      'To allow space for additional cables in the future',
      'To comply with building regulations for aesthetics',
    ],
    correctAnswer: 1,
    explanation:
      'Thermal insulation prevents heat from dissipating from a cable, causing it to overheat. Maintaining clearance ensures the cable can cool properly and operate within its rated temperature.',
    section: 'Technical Reading',
    difficulty: 'advanced',
    topic: 'Datasheets',
    category: 'English',
  },
  {
    id: 50,
    question:
      'In BS 7671, Part 1 covers "Scope, Object and Fundamental Principles". What is the main purpose of this part?',
    options: [
      'To list every type of cable and accessory approved for use in the UK',
      'To provide the detailed wiring methods and test procedures for each circuit',
      'To define what the regulations cover and the basic safety principles that underpin all requirements',
      'To set out the certification forms and model schedules used for inspection',
    ],
    correctAnswer: 2,
    explanation:
      'Part 1 of BS 7671 establishes the scope of the regulations (which types of installations are covered), the objectives (protection against electric shock, fire, burns, etc.), and the fundamental safety principles.',
    section: 'Technical Reading',
    difficulty: 'advanced',
    topic: 'BS 7671',
    category: 'English',
  },

  // ---- Technical Writing (Questions 51-60) ----

  {
    id: 51,
    question:
      'When completing a Schedule of Test Results, which of the following is the most important principle?',
    options: [
      'Use colourful highlighting to make it visually appealing',
      'Leave blank any readings you are unsure about',
      'Write in pencil so corrections can be made easily',
      'Record results accurately and legibly at the time of testing',
    ],
    correctAnswer: 3,
    explanation:
      "Test results must be recorded accurately and legibly at the time of testing. They form a legal record of the installation's safety and can be scrutinised during disputes or investigations.",
    section: 'Technical Writing',
    difficulty: 'basic',
    topic: 'Forms',
    category: 'English',
  },
  {
    id: 52,
    question:
      'Which of the following is the most appropriate way to report a fault on a job sheet?',
    options: [
      '"Double socket outlet in kitchen — no earth continuity detected. Requires rewire of circuit from JB to accessory."',
      '"Found a problem with one of the sockets in the kitchen, will need to come back and sort it out."',
      '"Kitchen socket not working properly — looks dodgy, probably needs a new one fitting at some point."',
      '"There is an issue with the wiring in the kitchen that the customer should get looked at soon."',
    ],
    correctAnswer: 0,
    explanation:
      'Fault reports should be specific, technical, and factual. They should describe the location, the fault found, and the remedial action required. Vague or informal language is unprofessional and unhelpful.',
    section: 'Technical Writing',
    difficulty: 'intermediate',
    topic: 'Reports',
    category: 'English',
  },
  {
    id: 53,
    question: 'Which is the most appropriate opening for a formal email to a new client?',
    options: [
      '"Hiya, just dropping you a quick line about the job we talked about"',
      '"Dear Mr Thompson, I am writing to confirm the details of the electrical work discussed"',
      '"To whom it may concern, please find attached our quote for the works"',
      '"Hello there, hope you are well, wanted to chat about your rewire"',
    ],
    correctAnswer: 1,
    explanation:
      "Formal emails should begin with a proper salutation using the client's name and title, followed by a clear, professional opening statement that establishes the purpose of the communication.",
    section: 'Technical Writing',
    difficulty: 'basic',
    topic: 'Emails',
    category: 'English',
  },
  {
    id: 54,
    question:
      'When writing a variation order for additional work discovered on site, which information is essential?',
    options: [
      'Only the name of the apprentice who first noticed the additional work',
      'A copy of the original quotation with the prices crossed out by hand',
      'A description of the extra work, the reason it is needed, and the additional cost',
      'The manufacturer details of the accessories used elsewhere on the job',
    ],
    correctAnswer: 2,
    explanation:
      'A variation order must clearly describe the additional work required, explain why it was not included in the original scope, and state the additional cost and any impact on the programme.',
    section: 'Technical Writing',
    difficulty: 'intermediate',
    topic: 'Documentation',
    category: 'English',
  },
  {
    id: 55,
    question:
      'An EIC (Electrical Installation Certificate) requires a "Description of the Installation". Which of the following is most appropriate?',
    options: [
      '"Some new wiring and a few sockets fitted in the house as requested"',
      '"Electrical work carried out to a good standard as per the customer\'s wishes"',
      '"Rewire job completed, everything tested and working, certificate enclosed"',
      '"New domestic single-phase installation comprising consumer unit, 6 lighting circuits, 4 ring final circuits, cooker circuit, and shower circuit"',
    ],
    correctAnswer: 3,
    explanation:
      'The description should be detailed and technical, specifying the type of installation, supply details, and the circuits included. This provides a clear record for future reference and inspection.',
    section: 'Technical Writing',
    difficulty: 'intermediate',
    topic: 'Forms',
    category: 'English',
  },
  {
    id: 56,
    question: 'When writing a daily site diary entry, which of the following should be included?',
    options: [
      'Date, weather, work carried out, materials used, personnel on site, and any issues encountered',
      'Only a list of the tools and test instruments brought to site that morning',
      'A detailed breakdown of every price quoted to the client for the works',
      'Personal opinions about the other trades and how the client behaved on site',
    ],
    correctAnswer: 0,
    explanation:
      'A site diary is a factual, contemporaneous record. It should include the date, weather, labour on site, work carried out, materials delivered or used, visitors, and any problems or delays.',
    section: 'Technical Writing',
    difficulty: 'basic',
    topic: 'Reports',
    category: 'English',
  },
  {
    id: 57,
    question:
      'Which sign-off is most appropriate for a formal letter to a building control officer whose name you know?',
    options: [
      '"Cheers, Dave"',
      '"Yours sincerely,"',
      '"Yours faithfully,"',
      '"Best wishes,"',
    ],
    correctAnswer: 1,
    explanation:
      'When you know the recipient\'s name (Dear Mr/Mrs/Ms...), the correct formal closing is "Yours sincerely". "Yours faithfully" is used when the recipient\'s name is not known (Dear Sir/Madam).',
    section: 'Technical Writing',
    difficulty: 'basic',
    topic: 'Emails',
    category: 'English',
  },
  {
    id: 58,
    question:
      'A client asks for a written quote. Which of the following elements should be included?',
    options: [
      'Just a single total figure so the client cannot question individual prices',
      'The test results from the last job to show the quality of your work',
      'Scope of work, itemised costs, payment terms, validity period, and exclusions',
      'A rough verbal estimate confirmed later by text message once on site',
    ],
    correctAnswer: 2,
    explanation:
      'A professional written quote should include a clear scope of work, itemised costs (labour and materials), payment terms, how long the quote is valid for, and what is excluded from the price.',
    section: 'Technical Writing',
    difficulty: 'intermediate',
    topic: 'Documentation',
    category: 'English',
  },
  {
    id: 59,
    question:
      'When completing an EICR, observations must be recorded using specific classification codes. Which response best demonstrates correct technical writing?',
    options: [
      '"The board looked a bit dodgy and the earthing did not seem right to me."',
      '"There is a problem at the distribution board that needs sorting out soon."',
      '"Distribution board not great — earthing issue, customer should get it fixed."',
      '"C2 — Lack of earthing to exposed-conductive-parts at distribution board. Remedial action: install main earthing conductor to meet Regulation 411.3.1.1."',
    ],
    correctAnswer: 3,
    explanation:
      'EICR observations must include the classification code, a clear description of the deficiency, the specific regulation reference, and the recommended remedial action. This creates a precise, auditable record.',
    section: 'Technical Writing',
    difficulty: 'advanced',
    topic: 'Forms',
    category: 'English',
  },
  {
    id: 60,
    question:
      'Which of the following statements is correctly written for inclusion in a technical report?',
    options: [
      '"All circuits were tested in accordance with BS 7671 and the results are recorded in the attached schedule"',
      '"All circuits was tested in accordance with BS 7671 and the results is recorded in the attached schedule"',
      '"We done all the testing to BS 7671 and wrote the results down on the schedule"',
      '"The circuits, were tested in accordance with BS 7671, and the results recorded"',
    ],
    correctAnswer: 0,
    explanation:
      'Technical reports require correct grammar, formal register, reference to standards, and clear factual statements. The correct option uses proper subject-verb agreement and references the relevant standard.',
    section: 'Technical Writing',
    difficulty: 'advanced',
    topic: 'Reports',
    category: 'English',
  },

  // ---- Communication (Questions 61-70) ----

  {
    id: 61,
    question:
      'A homeowner asks you to explain why their lights keep flickering. Which response is most professional?',
    options: [
      '"It is probably nothing serious, I would not worry about it too much if I were you."',
      '"There could be several causes, such as a loose connection or a faulty switch. I\'ll carry out some tests to identify the exact issue and let you know what I find."',
      '"Honestly, flickering lights could be anything — these things are very hard to predict."',
      '"That will be the old wiring, the whole house probably needs a full rewire doing."',
    ],
    correctAnswer: 1,
    explanation:
      'Professional communication with clients should be reassuring, informative, and honest. Explain possible causes without alarming the client, and outline the next steps you will take.',
    section: 'Communication',
    difficulty: 'basic',
    topic: 'Client Skills',
    category: 'English',
  },
  {
    id: 62,
    question:
      "During a site meeting, you disagree with the main contractor's proposed cable route. What is the most appropriate way to raise your concern?",
    options: [
      'Say nothing in the meeting but install the cable your own way regardless',
      'Wait until after the meeting and complain about the route to the other trades',
      'Clearly explain your technical reasoning and suggest an alternative route, referencing relevant regulations',
      'Refuse to continue with the job until the contractor changes the route',
    ],
    correctAnswer: 2,
    explanation:
      'Professional disagreements should be raised constructively in the meeting, supported by technical reasoning and regulation references. This demonstrates competence and protects all parties.',
    section: 'Communication',
    difficulty: 'intermediate',
    topic: 'Meetings',
    category: 'English',
  },
  {
    id: 63,
    question:
      'Which of the following demonstrates good professional practice when communicating with a client?',
    options: [
      'Using complex technical jargon to show your expertise',
      'Avoiding all technical detail and just stating the price',
      'Telling the client only what they want to hear to win the job',
      'Explaining work in clear, simple terms while being honest about costs and timescales',
    ],
    correctAnswer: 3,
    explanation:
      'Clients value clear, honest communication. Explain technical matters in plain language, be upfront about costs and timescales, and set realistic expectations. This builds trust and repeat business.',
    section: 'Communication',
    difficulty: 'basic',
    topic: 'Professionalism',
    category: 'English',
  },
  {
    id: 64,
    question:
      'A client phones to complain that a socket outlet you installed yesterday has stopped working. What is the best initial response?',
    options: [
      "\"I'm sorry to hear that. I'll come back at the earliest opportunity to investigate and resolve the issue for you.\"",
      '"That socket was working perfectly when I left, so you must have done something to it."',
      '"It is out of my hands now the job is signed off — you will need to book a new visit."',
      '"These things happen with electrics, there is not really much I can do about it."',
    ],
    correctAnswer: 0,
    explanation:
      "When handling complaints, acknowledge the client's frustration, apologise for the inconvenience, and commit to resolving the issue promptly. Never be dismissive or defensive.",
    section: 'Communication',
    difficulty: 'intermediate',
    topic: 'Client Skills',
    category: 'English',
  },
  {
    id: 65,
    question: 'What is the purpose of a toolbox talk on a construction site?',
    options: [
      'To agree the prices and payment terms for the work with the client',
      "To give a brief, focused safety briefing on a specific hazard relevant to the day's work",
      'To record the test results from the circuits completed that day',
      'To formally discipline workers who have breached site safety rules',
    ],
    correctAnswer: 1,
    explanation:
      'A toolbox talk is a short, informal health and safety briefing delivered on site. It focuses on a specific hazard or procedure relevant to the work being carried out that day.',
    section: 'Communication',
    difficulty: 'basic',
    topic: 'Meetings',
    category: 'English',
  },
  {
    id: 66,
    question:
      "You discover that a previous electrician's work does not comply with current regulations. How should you communicate this to the client?",
    options: [
      '"Whoever did this last time has made a real mess and clearly had no idea what they were doing."',
      'Say nothing to avoid embarrassing the client and simply correct the work yourself',
      "\"I've identified some areas of the installation that do not meet current safety standards. I can provide a written report detailing the issues and recommended remedial work.\"",
      'Tell the client the installation is dangerous and must be completely rewired immediately',
    ],
    correctAnswer: 2,
    explanation:
      'When reporting non-compliant work, be factual and professional. Do not criticise previous electricians. Focus on the current condition, the safety implications, and the recommended actions.',
    section: 'Communication',
    difficulty: 'intermediate',
    topic: 'Professionalism',
    category: 'English',
  },
  {
    id: 67,
    question:
      'When attending a progress meeting with the main contractor and other trades, what should you prepare in advance?',
    options: [
      'A detailed price for all the remaining work to hand to the client',
      'A list of complaints about the other trades to raise in front of everyone',
      'Nothing in particular, as these meetings are mainly informal catch-ups',
      'An update on your progress, any issues or delays, upcoming requirements, and coordination needs with other trades',
    ],
    correctAnswer: 3,
    explanation:
      'Being prepared for meetings demonstrates professionalism. Prepare updates on progress, flag any issues early, identify upcoming needs, and coordinate with other trades to avoid clashes.',
    section: 'Communication',
    difficulty: 'intermediate',
    topic: 'Meetings',
    category: 'English',
  },
  {
    id: 68,
    question:
      'An apprentice on site tells you they are struggling to understand a wiring diagram. What is the most appropriate response?',
    options: [
      '"Let me take some time to walk you through it. Understanding these diagrams is an important skill we can develop together."',
      '"You should already know this by now, just figure it out for yourself."',
      '"Do not worry about the diagram, just copy what I do and you will be fine."',
      '"That is not really my job to teach you, ask the college about it instead."',
    ],
    correctAnswer: 0,
    explanation:
      'Supporting apprentice development is a professional responsibility. Take time to explain technical concepts, encourage questions, and create a positive learning environment.',
    section: 'Communication',
    difficulty: 'basic',
    topic: 'Professionalism',
    category: 'English',
  },
  {
    id: 69,
    question:
      'A client requests work that you believe is unsafe and non-compliant with BS 7671. What should you do?',
    options: [
      'Carry out the work as requested, as the client is paying and it is their property',
      "Explain clearly why the request is unsafe, reference the relevant regulation, and offer a compliant alternative that meets the client's needs",
      'Do the work but leave it off the certificate so you are not held responsible',
      'Walk off the job immediately without explaining why to the client',
    ],
    correctAnswer: 1,
    explanation:
      'You have a legal and professional duty not to carry out unsafe work. Explain the safety concern clearly, reference the relevant regulation, and always try to offer a compliant alternative.',
    section: 'Communication',
    difficulty: 'advanced',
    topic: 'Client Skills',
    category: 'English',
  },
  {
    id: 70,
    question:
      'During a handover meeting with a facilities manager, you need to explain the operation of a new lighting control system. Which approach is best?',
    options: [
      'Hand over the manufacturer manuals and let the manager read them on their own',
      'Give a quick verbal explanation only, as written notes are rarely needed',
      'Provide a verbal walkthrough at the panel, a written operating guide, and offer to answer any follow-up questions',
      'Email a link to the manufacturer website and assume the manager can work it out',
    ],
    correctAnswer: 2,
    explanation:
      'A thorough handover includes a face-to-face demonstration, written documentation, and an offer of ongoing support. This ensures the client can operate the system safely and effectively.',
    section: 'Communication',
    difficulty: 'advanced',
    topic: 'Meetings',
    category: 'English',
  },

  // ---- Spelling & Grammar (Questions 71-80) ----

  {
    id: 71,
    question: 'Which of these is the correct spelling of an item installed in a consumer unit?',
    options: [
      'Accessorie',
      'Acessory',
      'Accesory',
      'Accessory',
    ],
    correctAnswer: 3,
    explanation:
      '"Accessory" is the correct spelling. In electrical terminology, accessories include items such as socket outlets, switches, and fused connection units.',
    section: 'Spelling & Grammar',
    difficulty: 'basic',
    topic: 'Vocabulary',
    category: 'English',
  },
  {
    id: 72,
    question: 'Which sentence uses correct grammar?',
    options: [
      '"The circuits were tested and found to be satisfactory."',
      '"The circuits was tested and found to be satisfactory."',
      '"The circuits is tested and found to be satisfactory."',
      '"The circuits been tested and found to be satisfactory."',
    ],
    correctAnswer: 0,
    explanation:
      '"Circuits" is plural, so it requires the plural verb "were" (not "was", "is", or "been"). Subject-verb agreement is essential in professional technical writing.',
    section: 'Spelling & Grammar',
    difficulty: 'basic',
    topic: 'Grammar',
    category: 'English',
  },
  {
    id: 73,
    question: 'Which of the following words is correctly spelt in UK English?',
    options: [
      'Organization',
      'Organisation',
      'Organizaton',
      'Organisasion',
    ],
    correctAnswer: 1,
    explanation:
      'UK English uses "organisation" with an "s", whereas American English uses "organization" with a "z". All professional documentation should use UK English spelling.',
    section: 'Spelling & Grammar',
    difficulty: 'basic',
    topic: 'Vocabulary',
    category: 'English',
  },
  {
    id: 74,
    question: 'Which sentence is correctly punctuated?',
    options: [
      '"The installation includes, lighting power and heating circuits."',
      '"The installation includes lighting power and, heating circuits."',
      '"The installation includes lighting, power, and heating circuits."',
      '"The installation, includes lighting power and heating circuits."',
    ],
    correctAnswer: 2,
    explanation:
      'Items in a list should be separated by commas. The Oxford comma (before "and") is optional but recommended for clarity. The comma should never come before or after the verb.',
    section: 'Spelling & Grammar',
    difficulty: 'basic',
    topic: 'Punctuation',
    category: 'English',
  },
  {
    id: 75,
    question: 'Identify the correctly spelt technical term:',
    options: [
      'Continueity',
      'Continuety',
      'Continuaty',
      'Continuity',
    ],
    correctAnswer: 3,
    explanation:
      '"Continuity" is the correct spelling. Continuity testing is one of the fundamental tests carried out on electrical installations to verify that protective conductors are intact.',
    section: 'Spelling & Grammar',
    difficulty: 'basic',
    topic: 'Vocabulary',
    category: 'English',
  },
  {
    id: 76,
    question: 'Which sentence correctly uses the apostrophe?',
    options: [
      "\"The electrician's tools were left on site.\"",
      '"The electricians tools were left on site."',
      "\"The electricians' tool's were left on site.\"",
      "\"The electrician's tool's were left on site.\"",
    ],
    correctAnswer: 0,
    explanation:
      '"Electrician\'s" (singular possessive) shows the tools belong to one electrician. The apostrophe goes before the "s" for singular possession. "Tools" is a simple plural and does not need an apostrophe.',
    section: 'Spelling & Grammar',
    difficulty: 'intermediate',
    topic: 'Punctuation',
    category: 'English',
  },
  {
    id: 77,
    question: 'Which of the following sentences contains a spelling error?',
    options: [
      '"The insulation resistance was measured at each distribution board."',
      '"The earth fault loop impedence was within acceptable limits."',
      '"The RCD operated within the required disconnection time."',
      '"The prospective fault current was recorded on the schedule."',
    ],
    correctAnswer: 1,
    explanation:
      'The correct spelling is "impedance" not "impedence". This is a commonly misspelt technical term. Earth fault loop impedance is a critical measurement in electrical testing.',
    section: 'Spelling & Grammar',
    difficulty: 'intermediate',
    topic: 'Proofreading',
    category: 'English',
  },
  {
    id: 78,
    question:
      'Which word correctly completes this sentence? "The cable must be installed _____ to the manufacturer\'s instructions."',
    options: [
      'in acordance',
      'in accordence',
      'in accordance',
      'in accordanse',
    ],
    correctAnswer: 2,
    explanation:
      '"In accordance" is the correct phrase. It means "following" or "in agreement with". This phrase appears frequently in technical specifications and regulations.',
    section: 'Spelling & Grammar',
    difficulty: 'intermediate',
    topic: 'Vocabulary',
    category: 'English',
  },
  {
    id: 79,
    question: 'Which of the following sentences uses the correct form of "their/there/they\'re"?',
    options: [
      '"The apprentices left there tools in the van overnight."',
      '"They\'re consumer unit needs replacing before the next inspection."',
      '"Put the new sockets over their by the kitchen window."',
      "\"They're planning to complete the first fix by Friday.\"",
    ],
    correctAnswer: 3,
    explanation:
      '"They\'re" is a contraction of "they are". "Their" shows possession (their tools). "There" refers to a place (over there). Using the wrong form is a common error in written communication.',
    section: 'Spelling & Grammar',
    difficulty: 'intermediate',
    topic: 'Grammar',
    category: 'English',
  },
  {
    id: 80,
    question:
      'Proofread the following: "The contractor have completed there scope of works and are now requesting a extention to the programme." How many errors are there?',
    options: [
      '3',
      '2',
      '1',
      '4',
    ],
    correctAnswer: 0,
    explanation:
      'There are 3 errors: "have" should be "has" (singular subject "contractor"), "there" should be "their" (possessive), and "extention" should be "extension". Proofreading technical documents is a vital skill.',
    section: 'Spelling & Grammar',
    difficulty: 'advanced',
    topic: 'Proofreading',
    category: 'English',
  },

  // ============================================================
  // DIGITAL SKILLS (Questions 81-100) — first 20 of 40
  // ============================================================

  // ---- Computer Basics (Questions 81-90) ----

  {
    id: 81,
    question:
      'When saving an electrical test certificate as a PDF, which file naming convention is most professional and organised?',
    options: [
      '"document1.pdf"',
      '"EICR_2024_Thompson_42-High-Street.pdf"',
      '"test cert.pdf"',
      '"scan20240115.pdf"',
    ],
    correctAnswer: 1,
    explanation:
      'A clear, descriptive file name including the document type, date, client name, and property address makes files easy to find and identify. Avoid generic names like "document1".',
    section: 'Computer Basics',
    difficulty: 'basic',
    topic: 'File Management',
    category: 'Digital Skills',
  },
  {
    id: 82,
    question: "Which folder structure would best organise an electrician's digital records?",
    options: [
      'All files saved loose on the desktop so they are quick to see',
      'One single folder containing every file from every job mixed together',
      'Folders by client name, with subfolders for quotes, certificates, photos, and invoices',
      'Folders named only by the date each file happened to be created',
    ],
    correctAnswer: 2,
    explanation:
      'A logical folder hierarchy (Client > Document Type) makes retrieval efficient. This mirrors how physical records should be organised and supports compliance with record-keeping requirements.',
    section: 'Computer Basics',
    difficulty: 'basic',
    topic: 'File Management',
    category: 'Digital Skills',
  },
  {
    id: 83,
    question: 'What does the keyboard shortcut Ctrl+Z (or Cmd+Z on Mac) do in most applications?',
    options: [
      'Save the current file',
      'Close the application',
      'Zoom in on the document',
      'Undo the last action',
    ],
    correctAnswer: 3,
    explanation:
      'Ctrl+Z (Cmd+Z on Mac) is the universal shortcut for "Undo". It reverses the most recent action, which is useful if you accidentally delete text or make an error in a document.',
    section: 'Computer Basics',
    difficulty: 'basic',
    topic: 'OS Navigation',
    category: 'Digital Skills',
  },
  {
    id: 84,
    question:
      'An electrician needs to share large project files (photos, drawings, certificates) with a client. Which method is most appropriate?',
    options: [
      'Upload files to a shared cloud storage folder and send the link',
      'Send each file as a separate text message to the client\'s mobile phone',
      'Print every file out and post the hard copies to the client by mail',
      'Copy all the files onto a USB stick and drop it through the letterbox',
    ],
    correctAnswer: 0,
    explanation:
      'Cloud storage (e.g., Google Drive, OneDrive, Dropbox) allows large files to be shared via a link. This is faster, more professional, and more secure than multiple email attachments.',
    section: 'Computer Basics',
    difficulty: 'basic',
    topic: 'Cloud Storage',
    category: 'Digital Skills',
  },
  {
    id: 85,
    question:
      'What file format is best for sending a completed electrical certificate to a client, ensuring it cannot be easily altered?',
    options: [
      '.docx (Word)',
      '.pdf (PDF)',
      '.txt (Text)',
      '.xlsx (Excel)',
    ],
    correctAnswer: 1,
    explanation:
      'PDF is the preferred format for certificates and formal documents because it preserves formatting across all devices and is difficult to alter without specialist software, protecting document integrity.',
    section: 'Computer Basics',
    difficulty: 'basic',
    topic: 'File Management',
    category: 'Digital Skills',
  },
  {
    id: 86,
    question:
      'You need to find a specific EICR you completed last year. The file is somewhere on your computer. What is the fastest way to locate it?',
    options: [
      'Open every folder one by one until you happen to find the right file',
      'Reinstall the application you used to create the certificate last year',
      "Use the operating system's search function (Windows Search or Spotlight) and type the client name or address",
      'Restart the computer and check whether the file appears on the desktop',
    ],
    correctAnswer: 2,
    explanation:
      'The built-in search function (Windows key + type, or Cmd + Space on Mac) can quickly locate files by name, type, or content. This is much faster than browsing through folders manually.',
    section: 'Computer Basics',
    difficulty: 'intermediate',
    topic: 'OS Navigation',
    category: 'Digital Skills',
  },
  {
    id: 87,
    question: 'Which of the following is a benefit of backing up your work files to cloud storage?',
    options: [
      'Files can only be accessed from one device',
      'Files stored in the cloud never need to be organised',
      'Cloud storage is always free with unlimited space',
      'Files are protected if your computer is lost, stolen, or damaged',
    ],
    correctAnswer: 3,
    explanation:
      'Cloud backup protects your data against hardware failure, theft, or damage. Certificates, test results, and client records are legal documents that must be retained and cannot easily be recreated.',
    section: 'Computer Basics',
    difficulty: 'intermediate',
    topic: 'Cloud Storage',
    category: 'Digital Skills',
  },
  {
    id: 88,
    question:
      'Your tablet is running slowly while you try to complete a digital EICR on site. Which is the best first step to improve performance?',
    options: [
      'Close unused apps running in the background and clear temporary files',
      'Immediately factory reset the tablet to wipe everything and start again',
      'Delete the EICR app and reinstall it part way through the inspection',
      'Switch the tablet off and leave it for an hour before continuing the job',
    ],
    correctAnswer: 0,
    explanation:
      'Background apps consume memory and processing power. Closing unused apps and clearing temporary files is the quickest way to improve device performance without losing any data.',
    section: 'Computer Basics',
    difficulty: 'intermediate',
    topic: 'OS Navigation',
    category: 'Digital Skills',
  },
  {
    id: 89,
    question:
      'You receive an email claiming to be from your electrical wholesaler asking you to "verify your account" by clicking a link. What should you do?',
    options: [
      'Click the link and enter your account details so your account is not suspended',
      'Do not click the link. Contact the wholesaler directly using their known phone number to verify the request',
      'Reply to the email asking the sender to confirm that they are genuine',
      'Forward the email to all your contacts to warn them about the message',
    ],
    correctAnswer: 1,
    explanation:
      'This is likely a phishing attempt. Never click links in suspicious emails. Instead, contact the company directly using a phone number you already have (not one from the email) to verify the request.',
    section: 'Computer Basics',
    difficulty: 'advanced',
    topic: 'OS Navigation',
    category: 'Digital Skills',
  },
  {
    id: 90,
    question:
      'You need to share a cloud folder containing sensitive client data (personal addresses, electrical certificates) with a colleague. What is the safest approach?',
    options: [
      'Create a public link to the folder and post it so the colleague can find it',
      'Email the certificates as attachments to the whole company distribution list',
      "Share the folder with specific permission settings, granting access only to your colleague's email address",
      'Set the folder so that anyone with the link can edit the contents',
    ],
    correctAnswer: 2,
    explanation:
      'When sharing sensitive data, always use specific sharing permissions rather than public links. This ensures only authorised individuals can access the files, complying with GDPR data protection requirements.',
    section: 'Computer Basics',
    difficulty: 'advanced',
    topic: 'Cloud Storage',
    category: 'Digital Skills',
  },

  // ---- Spreadsheets (Questions 91-100) ----

  {
    id: 91,
    question:
      'In a spreadsheet used to track cable lengths for a project, which formula correctly adds cells B2 to B10?',
    options: [
      '=COUNT(B2:B10)',
      '=TOTAL(B2:B10)',
      '=ADD(B2:B10)',
      '=SUM(B2:B10)',
    ],
    correctAnswer: 3,
    explanation:
      '=SUM(B2:B10) adds all values in cells B2 through B10. SUM is the standard function for addition in spreadsheet applications. COUNT counts the number of entries, not their total.',
    section: 'Spreadsheets',
    difficulty: 'basic',
    topic: 'Formulae',
    category: 'Digital Skills',
  },
  {
    id: 92,
    question:
      'When entering test results into a spreadsheet, why is it important to format cells containing resistance values as "Number" with appropriate decimal places?',
    options: [
      'It ensures consistent, accurate data that can be used in calculations and comparisons',
      'It automatically colours each cell so the spreadsheet looks more professional',
      'It prevents anyone else from being able to edit the test results later',
      'It converts the resistance values into the correct units for you',
    ],
    correctAnswer: 0,
    explanation:
      'Proper number formatting ensures data consistency, prevents rounding errors, and allows the values to be used reliably in calculations such as averages and comparisons against maximum permitted values.',
    section: 'Spreadsheets',
    difficulty: 'basic',
    topic: 'Formatting',
    category: 'Digital Skills',
  },
  {
    id: 93,
    question:
      'An electrician creates a spreadsheet to track job costs. Column A has item descriptions, Column B has quantities, and Column C has unit prices. Which formula in cell D2 calculates the line total?',
    options: [
      '=B2+C2',
      '=B2*C2',
      '=B2-C2',
      '=B2/C2',
    ],
    correctAnswer: 1,
    explanation:
      '=B2*C2 multiplies the quantity by the unit price to give the line total. The asterisk (*) is the multiplication operator in spreadsheets.',
    section: 'Spreadsheets',
    difficulty: 'basic',
    topic: 'Formulae',
    category: 'Digital Skills',
  },
  {
    id: 94,
    question:
      'When entering a list of circuit reference numbers into a spreadsheet (e.g., "C1", "C2", "C3"), the application changes them to dates. How do you prevent this?',
    options: [
      'Type the entries in capital letters so they are not mistaken for dates',
      'Add a full stop after each reference number to stop the conversion',
      'Format the cells as "Text" before entering the data',
      'Change the regional date settings on the computer before typing',
    ],
    correctAnswer: 2,
    explanation:
      'Spreadsheet applications often auto-format entries that resemble dates. Pre-formatting cells as "Text" tells the application to treat all entries as plain text, preventing unwanted conversions.',
    section: 'Spreadsheets',
    difficulty: 'intermediate',
    topic: 'Data Entry',
    category: 'Digital Skills',
  },
  {
    id: 95,
    question:
      'Which spreadsheet formula would calculate the average of insulation resistance readings in cells E2 to E20?',
    options: [
      '=MEAN(E2:E20)',
      '=SUM(E2:E20)/COUNT(E2:E20)',
      '=AVG(E2:E20)',
      '=AVERAGE(E2:E20)',
    ],
    correctAnswer: 3,
    explanation:
      '=AVERAGE(E2:E20) is the standard function for calculating the arithmetic mean in spreadsheet applications. While =SUM/COUNT would also work, AVERAGE is the correct built-in function.',
    section: 'Spreadsheets',
    difficulty: 'intermediate',
    topic: 'Formulae',
    category: 'Digital Skills',
  },
  {
    id: 96,
    question:
      'You want to highlight any earth fault loop impedance readings that exceed the maximum permitted value in a spreadsheet. Which feature should you use?',
    options: [
      'Conditional formatting',
      'Spell check',
      'Page layout',
      'Mail merge',
    ],
    correctAnswer: 0,
    explanation:
      'Conditional formatting automatically changes the appearance of cells based on rules you set. For example, you can highlight any Zs reading that exceeds 80% of the maximum permitted value in red.',
    section: 'Spreadsheets',
    difficulty: 'intermediate',
    topic: 'Formatting',
    category: 'Digital Skills',
  },
  {
    id: 97,
    question:
      'In a material ordering spreadsheet, you want cell C2 to always reference the VAT rate in cell G1, even when copying the formula to other rows. Which cell reference should you use?',
    options: [
      '$G1',
      '$G$1',
      'G1',
      'G$1',
    ],
    correctAnswer: 1,
    explanation:
      '$G$1 is an absolute cell reference. The dollar signs lock both the column (G) and row (1) so the reference does not change when the formula is copied to other cells. This is essential for referencing fixed values like tax rates.',
    section: 'Spreadsheets',
    difficulty: 'advanced',
    topic: 'Formulae',
    category: 'Digital Skills',
  },
  {
    id: 98,
    question:
      'An electrician uses a spreadsheet to log weekly hours across multiple sites. To quickly create a visual summary showing the proportion of time spent at each site, which chart type is most appropriate?',
    options: [
      'Line chart',
      'Scatter plot',
      'Pie chart',
      'Histogram',
    ],
    correctAnswer: 2,
    explanation:
      'A pie chart is ideal for showing proportions of a whole. Each slice represents the percentage of total hours spent at each site, giving a clear visual breakdown at a glance.',
    section: 'Spreadsheets',
    difficulty: 'intermediate',
    topic: 'Formatting',
    category: 'Digital Skills',
  },
  {
    id: 99,
    question:
      'You are entering data into a shared spreadsheet for a project. Another team member is entering data at the same time. What should you be aware of?',
    options: [
      'Only one person can ever have the spreadsheet open at any one time',
      'Your changes will not be saved until the other person closes the file',
      'The spreadsheet will automatically lock you out until they have finished',
      "Changes may conflict if you edit the same cell simultaneously — communicate to avoid overwriting each other's work",
    ],
    correctAnswer: 3,
    explanation:
      'Modern cloud-based spreadsheets (Google Sheets, Excel Online) support simultaneous editing, but conflicts can occur if two users edit the same cell. Communication and assigning specific areas to each person prevents data loss.',
    section: 'Spreadsheets',
    difficulty: 'advanced',
    topic: 'Data Entry',
    category: 'Digital Skills',
  },
  {
    id: 100,
    question:
      'Which spreadsheet function would you use to find the highest Zs reading from a column of earth fault loop impedance results in cells F2 to F50?',
    options: [
      '=MAX(F2:F50)',
      '=HIGH(F2:F50)',
      '=TOP(F2:F50)',
      '=LARGE(F2:F50)',
    ],
    correctAnswer: 0,
    explanation:
      '=MAX(F2:F50) returns the highest value in the specified range. This is useful for quickly identifying the worst-case Zs reading to compare against maximum permitted values in BS 7671.',
    section: 'Spreadsheets',
    difficulty: 'basic',
    topic: 'Formulae',
    category: 'Digital Skills',
  },
];
