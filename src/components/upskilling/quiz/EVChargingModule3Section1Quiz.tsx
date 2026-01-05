import SingleQuestionQuiz from './SingleQuestionQuiz';

const questions = [
  {
    id: 1,
    question: "What is the typical diversity factor for 3 domestic EV chargers?",
    options: [
      "100% (no diversity)",
      "85-90%", 
      "70-75%",
      "60-65%"
    ],
    correct: 1,
    explanation: "For 2-5 domestic EV chargers, typical diversity factors range from 80-90% (with 85-90% being most common for 3 chargers) because domestic charging patterns mean not all chargers operate simultaneously at full load."
  },
  {
    id: 2,
    question: "When calculating maximum demand, what should be included in the safety factor?",
    options: [
      "Only measurement uncertainties",
      "Future load growth and operational variations",
      "Temperature derating only",
      "Cable voltage drop compensation"
    ],
    correct: 1,
    explanation: "Safety factors (typically 10-20%) should account for future load growth, measurement uncertainties, operational variations, and ensure safe operation under all conditions, not just single factors like temperature or voltage drop."
  },
  {
    id: 3,
    question: "A 10-house development has 7kW chargers. With 75% diversity and 15% safety factor, what is the maximum demand?",
    options: [
      "52.5 kW",
      "60.4 kW",
      "70 kW",
      "80.5 kW"
    ],
    correct: 1,
    explanation: "Connected load: 10 × 7kW = 70kW. After diversity: 70 × 0.75 = 52.5kW. With safety factor: 52.5 × 1.15 = 60.4kW."
  },
  {
    id: 4,
    question: "According to BS 7671, what is the primary consideration when determining diversity factors?",
    options: [
      "Manufacturer's recommendations only",
      "Fixed percentages from tables",
      "Actual usage patterns and intended operation",
      "Cable cross-sectional area"
    ],
    correct: 2,
    explanation: "BS 7671 requires that diversity factors be based on actual usage patterns and intended operation of the installation, not just fixed percentages, though industry guidance provides typical ranges."
  },
  {
    id: 5,
    question: "For workplace charging with 15 chargers at 22kW each, what would be a typical diversity factor?",
    options: [
      "90-95%",
      "80-85%",
      "70-75%",
      "60-65%"
    ],
    correct: 3,
    explanation: "For 11+ workplace chargers at higher power ratings (22kW), typical diversity factors are 60-70% due to workplace charging patterns and the higher number of charging points."
  },
  {
    id: 6,
    question: "What is the main difference between rapid chargers and domestic chargers in load calculations?",
    options: [
      "Rapid chargers always require 100% diversity",
      "Rapid chargers have shorter connection times but higher power draws",
      "Rapid chargers don't require safety factors",
      "Rapid chargers use different voltage levels only"
    ],
    correct: 1,
    explanation: "Rapid chargers typically have shorter connection times but much higher power draws, leading to different usage patterns that often require lower diversity factors (50-70%) due to concentrated usage."
  },
  {
    id: 7,
    question: "When would you need to contact the Distribution Network Operator (DNO)?",
    options: [
      "For any EV charging installation",
      "Only for three-phase installations",
      "When maximum demand exceeds existing supply capacity",
      "Only for commercial installations"
    ],
    correct: 2,
    explanation: "You need to contact the DNO when your calculated maximum demand exceeds the existing supply capacity, as this may require a supply upgrade regardless of installation type."
  },
  {
    id: 8,
    question: "How do load management systems affect diversity calculations?",
    options: [
      "They eliminate the need for diversity factors",
      "They allow higher diversity factors by preventing simultaneous operation",
      "They require lower diversity factors for safety",
      "They don't affect diversity calculations"
    ],
    correct: 1,
    explanation: "Load management systems actively control when chargers operate, preventing simultaneous full-load operation, which allows for higher diversity factors (potentially 50-60% even for larger installations)."
  },
  {
    id: 9,
    question: "What is the typical current demand for a 60kW EV charging installation at 400V three-phase?",
    options: [
      "87 A",
      "150 A",
      "261 A",
      "104 A"
    ],
    correct: 0,
    explanation: "Current = Power ÷ (√3 × Voltage) = 60,000W ÷ (1.732 × 400V) = 87A. This formula accounts for the three-phase power factor."
  },
  {
    id: 10,
    question: "When retrofitting EV charging to an existing domestic installation, what is the most critical first step?",
    options: [
      "Installing the charging point immediately",
      "Assessing existing loads and available supply capacity",
      "Upgrading all cables to larger sizes",
      "Installing a new consumer unit"
    ],
    correct: 1,
    explanation: "The most critical first step is assessing existing loads and available supply capacity to determine if the existing supply can handle the additional EV charging load without upgrade or load management."
  }
];

export const EVChargingModule3Section1Quiz = () => {
  return (
    <SingleQuestionQuiz
      questions={questions}
      title="EV Charging Load Estimation Quiz"
    />
  );
};