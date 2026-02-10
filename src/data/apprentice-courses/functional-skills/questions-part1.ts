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
    question:
      'An electrician buys 3 rolls of cable at £48.50 each. What is the total cost?',
    options: ['£142.50', '£145.50', '£148.50', '£151.50'],
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
    question:
      'Using BIDMAS, calculate: 12 + 3 × (8 - 2)',
    options: ['90', '30', '54', '18'],
    correctAnswer: 1,
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
    options: ['14.3m', '14.4m', '14.5m', '14.0m'],
    correctAnswer: 1,
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
    options: ['4', '3', '6', '8'],
    correctAnswer: 1,
    explanation:
      '¾ of 12 = 9 ways used. 12 - 9 = 3 spare ways remaining. To find a fraction of a number, divide by the denominator and multiply by the numerator.',
    section: 'Number Systems',
    difficulty: 'basic',
    topic: 'Fractions',
    category: 'Mathematics',
  },
  {
    id: 5,
    question:
      'A job is quoted at £2,400 plus VAT at 20%. What is the total cost including VAT?',
    options: ['£2,640', '£2,880', '£2,800', '£2,920'],
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
    options: ['£80', '£90', '£100', '£70'],
    correctAnswer: 1,
    explanation:
      '£1.85 × 47 = £86.95. Rounded to the nearest £10, this is £90. Estimation is a key skill for providing quick quotes on site.',
    section: 'Number Systems',
    difficulty: 'intermediate',
    topic: 'Arithmetic',
    category: 'Mathematics',
  },
  {
    id: 7,
    question:
      'Calculate: 4² + 3 × (15 - 7) ÷ 2',
    options: ['28', '20', '16', '24'],
    correctAnswer: 0,
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
    options: ['£310.50', '£322.50', '£315.00', '£325.00'],
    correctAnswer: 1,
    explanation:
      '£8.60 × 37.5 = £322.50. Break this into easier steps: £8.60 × 37 = £318.20, plus £8.60 × 0.5 = £4.30, total £322.50.',
    section: 'Number Systems',
    difficulty: 'intermediate',
    topic: 'Decimals',
    category: 'Mathematics',
  },
  {
    id: 9,
    question:
      'A 100m drum of cable has ⅜ remaining. How many metres are left on the drum?',
    options: ['33.5m', '37.5m', '38.0m', '35.0m'],
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
    options: ['£568.00', '£578.00', '£588.00', '£598.00'],
    correctAnswer: 1,
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
    question:
      'What is the SI unit of electrical resistance?',
    options: ['Ampere (A)', 'Volt (V)', 'Ohm (Ω)', 'Watt (W)'],
    correctAnswer: 2,
    explanation:
      'The ohm (Ω) is the SI unit of electrical resistance, named after Georg Ohm. It describes the opposition to current flow in a circuit.',
    section: 'Units & Measurement',
    difficulty: 'basic',
    topic: 'SI Units',
    category: 'Mathematics',
  },
  {
    id: 12,
    question:
      'Convert 2,500mm to metres.',
    options: ['0.25m', '25m', '2.5m', '250m'],
    correctAnswer: 2,
    explanation:
      'There are 1,000mm in 1 metre. 2,500 ÷ 1,000 = 2.5m. This conversion is essential when reading technical drawings where dimensions may be in millimetres.',
    section: 'Units & Measurement',
    difficulty: 'basic',
    topic: 'Conversion',
    category: 'Mathematics',
  },
  {
    id: 13,
    question:
      'A room measures 4.2m × 3.8m. Calculate the floor area.',
    options: ['16.00m²', '15.96m²', '15.86m²', '16.06m²'],
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
    options: ['500mm²', '5,000mm²', '150mm²', '50,000mm²'],
    correctAnswer: 1,
    explanation:
      'Cross-sectional area = width × height = 50 × 100 = 5,000mm². This calculation is needed when applying cable capacity factors to trunking.',
    section: 'Units & Measurement',
    difficulty: 'intermediate',
    topic: 'Area',
    category: 'Mathematics',
  },
  {
    id: 15,
    question:
      'A hot water cylinder has a capacity of 120 litres. How many cubic metres is this?',
    options: ['1.2m³', '0.12m³', '0.012m³', '12m³'],
    correctAnswer: 1,
    explanation:
      '1 cubic metre = 1,000 litres. Therefore 120 litres = 120 ÷ 1,000 = 0.12m³. Understanding volume conversions is important for heating system calculations.',
    section: 'Units & Measurement',
    difficulty: 'intermediate',
    topic: 'Volume',
    category: 'Mathematics',
  },
  {
    id: 16,
    question:
      'On a drawing at 1:50 scale, a cable run measures 6cm. What is the actual length?',
    options: ['30m', '3m', '300m', '0.3m'],
    correctAnswer: 1,
    explanation:
      'At 1:50 scale, actual length = drawing length × 50. So 6cm × 50 = 300cm = 3m. Scale drawings are used daily to plan cable routes.',
    section: 'Units & Measurement',
    difficulty: 'intermediate',
    topic: 'Scale Drawings',
    category: 'Mathematics',
  },
  {
    id: 17,
    question:
      'Convert 0.47kW to watts.',
    options: ['4.7W', '47W', '470W', '4,700W'],
    correctAnswer: 2,
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
    options: ['0.45m', '45m', '4.5m', '450m'],
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
    options: ['90 litres', '9 litres', '0.9 litres', '900 litres'],
    correctAnswer: 1,
    explanation:
      'Volume = 300 × 200 × 150 = 9,000,000mm³. Since 1 litre = 1,000,000mm³ (or 1,000cm³), the volume is 9 litres.',
    section: 'Units & Measurement',
    difficulty: 'advanced',
    topic: 'Volume',
    category: 'Mathematics',
  },
  {
    id: 20,
    question:
      'How many metres are in 3.75 kilometres?',
    options: ['375m', '37.5m', '3,750m', '37,500m'],
    correctAnswer: 2,
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
    options: ['16.25V', '10.4V', '8.0V', '13.8V'],
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
    options: ['5A', '10A', '15A', '20A'],
    correctAnswer: 1,
    explanation:
      'Rearranging P = IV gives I = P ÷ V = 2,300 ÷ 230 = 10A. This is how we determine the correct fuse or MCB rating for an appliance.',
    section: 'Algebra & Formulae',
    difficulty: 'intermediate',
    topic: 'Power Formula',
    category: 'Mathematics',
  },
  {
    id: 23,
    question:
      'Rearrange the formula V = IR to make R the subject.',
    options: ['R = V + I', 'R = V × I', 'R = V ÷ I', 'R = I ÷ V'],
    correctAnswer: 2,
    explanation:
      'Starting with V = IR, divide both sides by I to isolate R, giving R = V ÷ I. Transposition of formulae is a key algebraic skill for electrical calculations.',
    section: 'Algebra & Formulae',
    difficulty: 'basic',
    topic: 'Transposition',
    category: 'Mathematics',
  },
  {
    id: 24,
    question:
      'If P = I²R, and I = 5A and R = 10Ω, what is the power dissipated?',
    options: ['50W', '100W', '250W', '500W'],
    correctAnswer: 2,
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
    options: ['5A', '10A', '15A', '20A'],
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
    options: ['17.6Ω', '76.7Ω', '13.0Ω', '23.0Ω'],
    correctAnswer: 0,
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
    options: ['11.5Ω', '2.1Ω', '31.96Ω', '5.75Ω'],
    correctAnswer: 0,
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
    options: ['2,760W', '2,990W', '2,530W', '3,220W'],
    correctAnswer: 1,
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
    options: ['9.0V', '7.2V', '10.8V', '5.4V'],
    correctAnswer: 0,
    explanation:
      'Vd = (18 × 20 × 25) ÷ 1,000 = 9,000 ÷ 1,000 = 9.0V. This must be checked against BS 7671 limits (typically 3% or 5% of supply voltage).',
    section: 'Algebra & Formulae',
    difficulty: 'advanced',
    topic: 'Substitution',
    category: 'Mathematics',
  },
  {
    id: 30,
    question:
      'Rearrange P = I²R to make I the subject.',
    options: ['I = P ÷ R', 'I = √(P ÷ R)', 'I = P × R', 'I = √(P × R)'],
    correctAnswer: 1,
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
    options: ['190MΩ', '200MΩ', '210MΩ', '180MΩ'],
    correctAnswer: 1,
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
    options: ['Q1', 'Q2', 'Q3', 'Q4'],
    correctAnswer: 3,
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
    options: ['0.07Ω', '0.10Ω', '0.05Ω', '0.12Ω'],
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
    options: ['£3,600', '£4,200', '£4,800', '£2,400'],
    correctAnswer: 1,
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
    options: ['28ms', '30ms', '29ms', '32ms'],
    correctAnswer: 1,
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
    options: ['30%', '35%', '40%', '45%'],
    correctAnswer: 2,
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
    options: ['1', '2', '3', '4'],
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
    options: ['1.2Ω', '1.1Ω', '1.3Ω', '1.15Ω'],
    correctAnswer: 1,
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
    options: ['£918', '£810', '£720', '£1,020'],
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
    question:
      'In BS 7671, what does the abbreviation "RCD" stand for?',
    options: [
      'Residual Circuit Device',
      'Residual Current Detector',
      'Residual Current Device',
      'Regulated Current Device',
    ],
    correctAnswer: 2,
    explanation:
      'RCD stands for Residual Current Device. It is a protective device that disconnects the circuit when it detects a difference between live and neutral currents, indicating a fault to earth.',
    section: 'Technical Reading',
    difficulty: 'basic',
    topic: 'BS 7671',
    category: 'English',
  },
  {
    id: 42,
    question:
      'When reading a product datasheet for a cable, what does "CSA" typically refer to?',
    options: [
      'Cable Safety Assessment',
      'Cross-Sectional Area',
      'Current Supply Amperage',
      'Circuit Specification Appendix',
    ],
    correctAnswer: 1,
    explanation:
      'CSA stands for Cross-Sectional Area, measured in mm². It is one of the most important specifications on a cable datasheet, determining the current-carrying capacity.',
    section: 'Technical Reading',
    difficulty: 'basic',
    topic: 'Datasheets',
    category: 'English',
  },
  {
    id: 43,
    question:
      'A method statement should contain which of the following?',
    options: [
      'A list of all company employees',
      'A step-by-step description of how the work will be carried out safely',
      'The client\'s bank details for payment',
      'A record of completed work and test results',
    ],
    correctAnswer: 1,
    explanation:
      'A method statement describes how a job will be carried out safely, including the sequence of work, hazards identified, control measures, and personnel responsible.',
    section: 'Technical Reading',
    difficulty: 'basic',
    topic: 'Method Statements',
    category: 'English',
  },
  {
    id: 44,
    question:
      'What does "C2" mean on an Electrical Installation Condition Report (EICR)?',
    options: [
      'The installation is safe and satisfactory',
      'Potentially dangerous — urgent remedial action required',
      'Improvement recommended but not immediately dangerous',
      'Further investigation required without delay',
    ],
    correctAnswer: 1,
    explanation:
      'C2 means "Potentially dangerous" and requires urgent remedial action. The classification codes on an EICR are: C1 (danger present), C2 (potentially dangerous), C3 (improvement recommended), and FI (further investigation required).',
    section: 'Technical Reading',
    difficulty: 'intermediate',
    topic: 'Regulations',
    category: 'English',
  },
  {
    id: 45,
    question:
      'When reading BS 7671, the term "shall" indicates what level of requirement?',
    options: [
      'It is optional guidance',
      'It is a recommendation that may be varied',
      'It is a mandatory requirement that must be followed',
      'It is advisory information for reference only',
    ],
    correctAnswer: 2,
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
      'The cable can only be installed when the ambient temperature is between these values',
      'The cable insulation is rated to function safely within this temperature range',
      'The cable must be stored at these temperatures before installation',
      'The cable can carry any current as long as temperature stays in this range',
    ],
    correctAnswer: 1,
    explanation:
      'The operating temperature range on a datasheet indicates the temperatures at which the cable insulation will function safely and maintain its rated performance. Exceeding this range can degrade insulation and create a fire risk.',
    section: 'Technical Reading',
    difficulty: 'intermediate',
    topic: 'Datasheets',
    category: 'English',
  },
  {
    id: 47,
    question:
      'In a risk assessment, what is a "control measure"?',
    options: [
      'A device that controls electrical circuits',
      'An action or precaution taken to reduce a risk to an acceptable level',
      'A measurement taken using calibrated test instruments',
      'A financial limit on project expenditure',
    ],
    correctAnswer: 1,
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
      'Only the building owner',
      'Only qualified electricians',
      'All persons at work who may be affected by electrical danger',
      'Only the Health and Safety Executive',
    ],
    correctAnswer: 2,
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
      'To comply with building regulations for aesthetics',
      'To allow space for additional cables in the future',
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
      'To list all approved cable types and sizes',
      'To define what the regulations cover and the basic safety principles that underpin all requirements',
      'To provide test procedures for electrical installations',
      'To set out the qualifications required for electricians',
    ],
    correctAnswer: 1,
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
      'Record results accurately and legibly at the time of testing',
      'Write in pencil so corrections can be made easily',
      'Leave blank any readings you are unsure about',
    ],
    correctAnswer: 1,
    explanation:
      'Test results must be recorded accurately and legibly at the time of testing. They form a legal record of the installation\'s safety and can be scrutinised during disputes or investigations.',
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
      '"Socket in kitchen is broken"',
      '"Double socket outlet in kitchen — no earth continuity detected. Requires rewire of circuit from JB to accessory."',
      '"Fixed that dodgy socket in the kitchen, should be fine now"',
      '"Kitchen socket sorted. Next please."',
    ],
    correctAnswer: 1,
    explanation:
      'Fault reports should be specific, technical, and factual. They should describe the location, the fault found, and the remedial action required. Vague or informal language is unprofessional and unhelpful.',
    section: 'Technical Writing',
    difficulty: 'intermediate',
    topic: 'Reports',
    category: 'English',
  },
  {
    id: 53,
    question:
      'Which is the most appropriate opening for a formal email to a new client?',
    options: [
      '"Hi mate, just wanted to touch base about your electrics"',
      '"Dear Mr Thompson, I am writing to confirm the details of the electrical work discussed"',
      '"Hey there, following up on our chat"',
      '"To whoever is in charge, we need to sort out your wiring"',
    ],
    correctAnswer: 1,
    explanation:
      'Formal emails should begin with a proper salutation using the client\'s name and title, followed by a clear, professional opening statement that establishes the purpose of the communication.',
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
      'The weather conditions that day',
      'A description of the extra work, the reason it is needed, and the additional cost',
      'The names of all other trades on site',
      'A full history of the original contract negotiations',
    ],
    correctAnswer: 1,
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
      '"Did a full rewire of the house"',
      '"New domestic single-phase installation comprising consumer unit, 6 lighting circuits, 4 ring final circuits, cooker circuit, and shower circuit"',
      '"Put in new electrics throughout"',
      '"Standard rewire job — nothing unusual"',
    ],
    correctAnswer: 1,
    explanation:
      'The description should be detailed and technical, specifying the type of installation, supply details, and the circuits included. This provides a clear record for future reference and inspection.',
    section: 'Technical Writing',
    difficulty: 'intermediate',
    topic: 'Forms',
    category: 'English',
  },
  {
    id: 56,
    question:
      'When writing a daily site diary entry, which of the following should be included?',
    options: [
      'Personal opinions about other trades on site',
      'Date, weather, work carried out, materials used, personnel on site, and any issues encountered',
      'Only a summary of hours worked for payroll purposes',
      'A list of personal expenses for the day',
    ],
    correctAnswer: 1,
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
      'Scope of work, itemised costs, payment terms, validity period, and exclusions',
      'Only the total price and your bank details',
      'A rough estimate and a promise to confirm later',
      'A description of your qualifications and experience only',
    ],
    correctAnswer: 0,
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
      '"The wiring looks a bit old and could do with replacing"',
      '"C2 — Lack of earthing to exposed-conductive-parts at distribution board. Remedial action: install main earthing conductor to meet Regulation 411.3.1.1."',
      '"Problem found — needs fixing ASAP"',
      '"Some issues spotted, will discuss on site"',
    ],
    correctAnswer: 1,
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
      '"The circuits was tested and they is all fine"',
      '"All circuits were tested in accordance with BS 7671 and the results are recorded in the attached schedule"',
      '"We done the testing and everything passed no problems"',
      '"Testing complete. All good."',
    ],
    correctAnswer: 1,
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
      '"It\'s probably a loose connection somewhere. These old houses are always a nightmare."',
      '"There could be several causes, such as a loose connection or a faulty switch. I\'ll carry out some tests to identify the exact issue and let you know what I find."',
      '"No idea mate, could be anything. I\'ll have a look."',
      '"You need a full rewire. That\'s the only way to fix it properly."',
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
      'During a site meeting, you disagree with the main contractor\'s proposed cable route. What is the most appropriate way to raise your concern?',
    options: [
      'Stay silent to avoid conflict and install it as instructed',
      'Argue loudly to make your point heard by everyone',
      'Clearly explain your technical reasoning and suggest an alternative route, referencing relevant regulations',
      'Send a text message to the contractor after the meeting',
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
      'Explaining work in clear, simple terms while being honest about costs and timescales',
      'Telling the client only what they want to hear to win the job',
      'Avoiding all technical detail and just stating the price',
    ],
    correctAnswer: 1,
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
      '"That\'s impossible, I tested it before I left"',
      '"I\'m sorry to hear that. I\'ll come back at the earliest opportunity to investigate and resolve the issue for you."',
      '"It\'s not my problem now, the warranty is with the manufacturer"',
      '"Just reset the trip switch and it\'ll be fine"',
    ],
    correctAnswer: 1,
    explanation:
      'When handling complaints, acknowledge the client\'s frustration, apologise for the inconvenience, and commit to resolving the issue promptly. Never be dismissive or defensive.',
    section: 'Communication',
    difficulty: 'intermediate',
    topic: 'Client Skills',
    category: 'English',
  },
  {
    id: 65,
    question:
      'What is the purpose of a toolbox talk on a construction site?',
    options: [
      'To discuss which tools each person should bring to site',
      'To give a brief, focused safety briefing on a specific hazard relevant to the day\'s work',
      'To allocate parking spaces for the week',
      'To distribute new tools to the workforce',
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
      'You discover that a previous electrician\'s work does not comply with current regulations. How should you communicate this to the client?',
    options: [
      '"The last sparky was useless — look at the state of this!"',
      '"I\'ve identified some areas of the installation that do not meet current safety standards. I can provide a written report detailing the issues and recommended remedial work."',
      '"It\'s all illegal wiring, you need to sue whoever did this"',
      '"Don\'t worry about it, I\'ll just work around it"',
    ],
    correctAnswer: 1,
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
      'Nothing — just listen and respond to questions',
      'An update on your progress, any issues or delays, upcoming requirements, and coordination needs with other trades',
      'A list of complaints about other trades',
      'Only a request for more time on the programme',
    ],
    correctAnswer: 1,
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
      '"You should have learned that at college — go and read your textbook"',
      '"Don\'t worry, I\'ll just do it myself"',
      '"Let me take some time to walk you through it. Understanding these diagrams is an important skill we can develop together."',
      '"Just copy what I do and don\'t ask questions"',
    ],
    correctAnswer: 2,
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
      'Do the work as requested — the client is always right',
      'Refuse the work without any explanation and leave site',
      'Explain clearly why the request is unsafe, reference the relevant regulation, and offer a compliant alternative that meets the client\'s needs',
      'Do the work but don\'t sign it off on any certification',
    ],
    correctAnswer: 2,
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
      'Send a quick text message with a photo of the control panel',
      'Provide a verbal walkthrough at the panel, a written operating guide, and offer to answer any follow-up questions',
      'Leave the manufacturer\'s instruction manual and assume they will read it',
      'Tell them to phone you if anything goes wrong',
    ],
    correctAnswer: 1,
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
    question:
      'Which of these is the correct spelling of an item installed in a consumer unit?',
    options: ['Accessory', 'Acessory', 'Accesory', 'Accessorie'],
    correctAnswer: 0,
    explanation:
      '"Accessory" is the correct spelling. In electrical terminology, accessories include items such as socket outlets, switches, and fused connection units.',
    section: 'Spelling & Grammar',
    difficulty: 'basic',
    topic: 'Vocabulary',
    category: 'English',
  },
  {
    id: 72,
    question:
      'Which sentence uses correct grammar?',
    options: [
      '"The circuits was tested and found to be satisfactory."',
      '"The circuits were tested and found to be satisfactory."',
      '"The circuits is tested and found to be satisfactory."',
      '"The circuits been tested and found to be satisfactory."',
    ],
    correctAnswer: 1,
    explanation:
      '"Circuits" is plural, so it requires the plural verb "were" (not "was", "is", or "been"). Subject-verb agreement is essential in professional technical writing.',
    section: 'Spelling & Grammar',
    difficulty: 'basic',
    topic: 'Grammar',
    category: 'English',
  },
  {
    id: 73,
    question:
      'Which of the following words is correctly spelt in UK English?',
    options: ['Organization', 'Organisation', 'Organizaton', 'Organisasion'],
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
    question:
      'Which sentence is correctly punctuated?',
    options: [
      '"The installation includes, lighting power and heating circuits."',
      '"The installation includes lighting, power, and heating circuits."',
      '"The installation includes lighting power and, heating circuits."',
      '"The installation, includes lighting power and heating circuits."',
    ],
    correctAnswer: 1,
    explanation:
      'Items in a list should be separated by commas. The Oxford comma (before "and") is optional but recommended for clarity. The comma should never come before or after the verb.',
    section: 'Spelling & Grammar',
    difficulty: 'basic',
    topic: 'Punctuation',
    category: 'English',
  },
  {
    id: 75,
    question:
      'Identify the correctly spelt technical term:',
    options: ['Continuety', 'Continuity', 'Continueity', 'Continuaty'],
    correctAnswer: 1,
    explanation:
      '"Continuity" is the correct spelling. Continuity testing is one of the fundamental tests carried out on electrical installations to verify that protective conductors are intact.',
    section: 'Spelling & Grammar',
    difficulty: 'basic',
    topic: 'Vocabulary',
    category: 'English',
  },
  {
    id: 76,
    question:
      'Which sentence correctly uses the apostrophe?',
    options: [
      '"The electricians tools were left on site."',
      '"The electrician\'s tools were left on site."',
      '"The electricians\' tool\'s were left on site."',
      '"The electrician\'s tool\'s were left on site."',
    ],
    correctAnswer: 1,
    explanation:
      '"Electrician\'s" (singular possessive) shows the tools belong to one electrician. The apostrophe goes before the "s" for singular possession. "Tools" is a simple plural and does not need an apostrophe.',
    section: 'Spelling & Grammar',
    difficulty: 'intermediate',
    topic: 'Punctuation',
    category: 'English',
  },
  {
    id: 77,
    question:
      'Which of the following sentences contains a spelling error?',
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
    options: ['in accordance', 'in accordence', 'in acordance', 'in accordanse'],
    correctAnswer: 0,
    explanation:
      '"In accordance" is the correct phrase. It means "following" or "in agreement with". This phrase appears frequently in technical specifications and regulations.',
    section: 'Spelling & Grammar',
    difficulty: 'intermediate',
    topic: 'Vocabulary',
    category: 'English',
  },
  {
    id: 79,
    question:
      'Which of the following sentences uses the correct form of "their/there/they\'re"?',
    options: [
      '"Their going to install the new distribution board tomorrow."',
      '"The electricians left there tools in the van."',
      '"They\'re planning to complete the first fix by Friday."',
      '"The cables are over they\'re by the consumer unit."',
    ],
    correctAnswer: 2,
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
    options: ['1', '2', '3', '4'],
    correctAnswer: 2,
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
      '"test cert.pdf"',
      '"EICR_2024_Thompson_42-High-Street.pdf"',
      '"document1.pdf"',
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
    question:
      'Which folder structure would best organise an electrician\'s digital records?',
    options: [
      'All files saved to the Desktop',
      'Folders by client name, with subfolders for quotes, certificates, photos, and invoices',
      'One folder called "Work" with everything in it',
      'Files organised by date only, with no subfolders',
    ],
    correctAnswer: 1,
    explanation:
      'A logical folder hierarchy (Client > Document Type) makes retrieval efficient. This mirrors how physical records should be organised and supports compliance with record-keeping requirements.',
    section: 'Computer Basics',
    difficulty: 'basic',
    topic: 'File Management',
    category: 'Digital Skills',
  },
  {
    id: 83,
    question:
      'What does the keyboard shortcut Ctrl+Z (or Cmd+Z on Mac) do in most applications?',
    options: [
      'Zoom in on the document',
      'Close the application',
      'Undo the last action',
      'Save the current file',
    ],
    correctAnswer: 2,
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
      'Send 50 separate email attachments',
      'Upload files to a shared cloud storage folder and send the link',
      'Save files to a USB stick and post it',
      'Print everything and deliver in person',
    ],
    correctAnswer: 1,
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
    options: ['.docx (Word)', '.xlsx (Excel)', '.pdf (PDF)', '.txt (Text)'],
    correctAnswer: 2,
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
      'Manually open every folder until you find it',
      'Use the operating system\'s search function (Windows Search or Spotlight) and type the client name or address',
      'Re-create the document from scratch',
      'Phone the client and ask them for their copy',
    ],
    correctAnswer: 1,
    explanation:
      'The built-in search function (Windows key + type, or Cmd + Space on Mac) can quickly locate files by name, type, or content. This is much faster than browsing through folders manually.',
    section: 'Computer Basics',
    difficulty: 'intermediate',
    topic: 'OS Navigation',
    category: 'Digital Skills',
  },
  {
    id: 87,
    question:
      'Which of the following is a benefit of backing up your work files to cloud storage?',
    options: [
      'Files can only be accessed from one device',
      'Files are protected if your computer is lost, stolen, or damaged',
      'Cloud storage is always free with unlimited space',
      'Files stored in the cloud never need to be organised',
    ],
    correctAnswer: 1,
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
      'Buy a new tablet immediately',
      'Close unused apps running in the background and clear temporary files',
      'Delete the EICR app and reinstall it',
      'Connect to a different Wi-Fi network',
    ],
    correctAnswer: 1,
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
      'Click the link and enter your details — they need verifying',
      'Forward the email to all your contacts to warn them',
      'Do not click the link. Contact the wholesaler directly using their known phone number to verify the request',
      'Reply to the email asking if it is genuine',
    ],
    correctAnswer: 2,
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
      'Make the folder public so anyone with the link can access it',
      'Share the folder with specific permission settings, granting access only to your colleague\'s email address',
      'Post the link on social media so your colleague can find it',
      'Email all the files as unencrypted attachments instead',
    ],
    correctAnswer: 1,
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
    options: ['=ADD(B2:B10)', '=SUM(B2:B10)', '=TOTAL(B2:B10)', '=COUNT(B2:B10)'],
    correctAnswer: 1,
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
      'It makes the spreadsheet look more colourful',
      'It ensures consistent, accurate data that can be used in calculations and comparisons',
      'It automatically converts the values to different units',
      'It is required by the spreadsheet licence agreement',
    ],
    correctAnswer: 1,
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
    options: ['=B2+C2', '=B2*C2', '=B2/C2', '=B2-C2'],
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
      'Type the numbers faster',
      'Format the cells as "Text" before entering the data',
      'Use a different spreadsheet application',
      'Add a space after each entry',
    ],
    correctAnswer: 1,
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
      '=AVERAGE(E2:E20)',
      '=AVG(E2:E20)',
      '=SUM(E2:E20)/COUNT(E2:E20)',
    ],
    correctAnswer: 1,
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
      'Spell check',
      'Conditional formatting',
      'Page layout',
      'Mail merge',
    ],
    correctAnswer: 1,
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
    options: ['G1', '$G$1', 'G$1', '$G1'],
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
    options: ['Line chart', 'Scatter plot', 'Pie chart', 'Histogram'],
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
      'Only one person can ever use a spreadsheet at a time',
      'Changes may conflict if you edit the same cell simultaneously — communicate to avoid overwriting each other\'s work',
      'Shared spreadsheets cannot contain formulae',
      'The file will corrupt if two people access it',
    ],
    correctAnswer: 1,
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
    options: ['=LARGE(F2:F50)', '=MAX(F2:F50)', '=HIGH(F2:F50)', '=TOP(F2:F50)'],
    correctAnswer: 1,
    explanation:
      '=MAX(F2:F50) returns the highest value in the specified range. This is useful for quickly identifying the worst-case Zs reading to compare against maximum permitted values in BS 7671.',
    section: 'Spreadsheets',
    difficulty: 'basic',
    topic: 'Formulae',
    category: 'Digital Skills',
  },
];
