import SingleQuestionQuiz from './SingleQuestionQuiz';

const questions = [
  {
    id: 1,
    question: 'What is a typical diversity factor applied to 3 domestic EV chargers?',
    options: ['100% (no diversity applied)', '60-65%', '70-75%', '85-90%'],
    correct: 3,
    explanation:
      'For a small group of 2-5 domestic chargers a high diversity factor of around 85-90% is typical, because domestic charging patterns mean they rarely all run at full load at once.',
  },
  {
    id: 2,
    question: 'When calculating maximum demand, what should the safety factor account for?',
    options: [
      'Measurement uncertainties only',
      'Cable voltage-drop compensation only',
      'Future load growth and operational variations',
      'Temperature derating only',
    ],
    correct: 2,
    explanation:
      'A safety factor (typically 10-20%) covers future load growth, measurement uncertainty and operational variation, rather than a single factor such as temperature or voltage drop.',
  },
  {
    id: 3,
    question:
      'A 10-house development has 7kW chargers. With 75% diversity and 15% safety factor, what is the maximum demand?',
    options: ['52.5 kW', '60.4 kW', '70 kW', '80.5 kW'],
    correct: 1,
    explanation:
      'Connected load: 10 × 7kW = 70kW. After diversity: 70 × 0.75 = 52.5kW. With safety factor: 52.5 × 1.15 = 60.4kW.',
  },
  {
    id: 4,
    question:
      'When determining diversity for an installation, what should the primary consideration be?',
    options: [
      'The actual usage patterns and intended operation',
      "The manufacturer's recommendations only",
      'Fixed percentages taken straight from tables',
      'The cable cross-sectional area',
    ],
    correct: 0,
    explanation:
      'Diversity should reflect the actual usage patterns and intended operation of the installation, with published guidance providing typical ranges rather than rigid figures.',
  },
  {
    id: 5,
    question:
      'For workplace charging with 15 chargers at 22kW each, what would be a typical diversity factor?',
    options: ['90-95%', '80-85%', '70-75%', '60-65%'],
    correct: 3,
    explanation:
      'For 11+ workplace chargers at higher power ratings (22kW), typical diversity factors are 60-70% due to workplace charging patterns and the higher number of charging points.',
  },
  {
    id: 6,
    question:
      'What is the main difference between rapid and domestic chargers in load calculations?',
    options: [
      'Rapid chargers always require 100% diversity',
      'Rapid chargers do not require any safety factor',
      'Rapid chargers have shorter connection times but much higher power draws',
      'Rapid chargers simply use a different voltage level',
    ],
    correct: 2,
    explanation:
      'Rapid chargers have short connection times but very high power draws, giving concentrated usage that often justifies a lower diversity factor (around 50-70%).',
  },
  {
    id: 7,
    question: 'When must the Distribution Network Operator (DNO) be contacted?',
    options: [
      'When the calculated maximum demand exceeds the existing supply capacity',
      'For any EV charging installation whatsoever',
      'Only for three-phase installations',
      'Only for commercial installations',
    ],
    correct: 0,
    explanation:
      'The DNO must be involved when the calculated maximum demand exceeds the existing supply capacity, as a supply upgrade or reinforcement may be needed.',
  },
  {
    id: 8,
    question: 'How do load management systems affect diversity calculations?',
    options: [
      'They remove the need for any diversity factor',
      'They allow a lower assumed demand by preventing simultaneous full-load operation',
      'They force a more conservative (lower) diversity factor for safety',
      'They have no effect on diversity calculations',
    ],
    correct: 1,
    explanation:
      'Load management actively staggers charging so chargers do not all run at full load together, which justifies assuming a lower simultaneous demand even on larger schemes.',
  },
  {
    id: 9,
    question:
      'What is the typical current demand for a 60kW EV charging installation at 400V three-phase?',
    options: ['87 A', '150 A', '261 A', '104 A'],
    correct: 0,
    explanation:
      'Current = Power ÷ (√3 × Voltage) = 60,000W ÷ (1.732 × 400V) = 87A. This formula accounts for the three-phase power factor.',
  },
  {
    id: 10,
    question:
      'When retrofitting EV charging to an existing domestic installation, what is the most critical first step?',
    options: [
      'Installing the charging point immediately',
      'Assessing existing loads and available supply capacity',
      'Upgrading all cables to larger sizes',
      'Installing a new consumer unit',
    ],
    correct: 1,
    explanation:
      'The most critical first step is assessing existing loads and available supply capacity to determine if the existing supply can handle the additional EV charging load without upgrade or load management.',
  },
];

export const EVChargingModule3Section1Quiz = () => {
  return <SingleQuestionQuiz questions={questions} title="EV Charging Load Estimation Quiz" />;
};
