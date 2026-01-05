export interface RiskAssessmentQuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export const riskAssessmentQuizQuestions: RiskAssessmentQuizQuestion[] = [
  {
    id: 1,
    question: "What is the main purpose of including emergency lighting in a fire risk assessment?",
    options: [
      "To calculate electrical costs",
      "To ensure safe evacuation lighting tailored to specific building risks",
      "To determine the number of light fittings needed",
      "To comply with building aesthetics requirements"
    ],
    correct: 1,
    explanation: "The fire risk assessment identifies specific hazards and occupant characteristics that determine where emergency lighting is needed, how long it must operate, and what illuminance levels are required for safe evacuation."
  },
  {
    id: 2,
    question: "Which of the following is NOT a factor the fire risk assessor must consider?",
    options: [
      "Occupant type and familiarity with layout",
      "Building use and layout complexity",
      "The colour scheme of the interior decoration",
      "Environmental conditions and smoke risk"
    ],
    correct: 2,
    explanation: "Interior decoration colours are not relevant to fire risk assessment. The assessor must focus on safety-critical factors: occupant characteristics, building use, layout complexity, and environmental hazards."
  },
  {
    id: 3,
    question: "What standard defines how fire risk findings are applied to emergency lighting design?",
    options: [
      "BS 7671",
      "BS 5266-1",
      "BS 5839",
      "BS 6423"
    ],
    correct: 1,
    explanation: "BS 5266-1 is the Code of Practice for emergency lighting that translates fire risk assessment findings into specific technical requirements for illuminance, duration, and coverage."
  },
  {
    id: 4,
    question: "What is the minimum illuminance required for open areas according to BS 5266-1?",
    options: [
      "0.5 lux",
      "1 lux",
      "5 lux",
      "15 lux"
    ],
    correct: 0,
    explanation: "BS 5266-1 specifies 0.5 lux for open areas (anti-panic lighting), 1 lux for escape routes, and 15 lux for high-risk task areas."
  },
  {
    id: 5,
    question: "What duration is typically required for high-risk premises such as hospitals?",
    options: [
      "30 minutes",
      "1 hour",
      "2 hours",
      "3 hours minimum"
    ],
    correct: 3,
    explanation: "High-risk premises such as hospitals, care homes, and theatres require a minimum 3-hour duration to account for evacuation complexity, vulnerable occupants, and potential delays."
  },
  {
    id: 6,
    question: "When must a fire risk assessment be reviewed or updated?",
    options: [
      "Only when a fire occurs",
      "Every 5 years",
      "At least annually or after building changes",
      "Only when requested by the fire service"
    ],
    correct: 2,
    explanation: "Risk assessments must be reviewed at least annually, and whenever there are changes to building use, layout, occupancy, or after incidents. Waiting 5 years or only after a fire is non-compliant."
  },
  {
    id: 7,
    question: "Why should electricians liaise with the fire risk assessor during design?",
    options: [
      "To share coffee breaks",
      "To ensure the lighting design matches the assessed risks and findings",
      "To reduce installation costs",
      "To avoid doing a site survey"
    ],
    correct: 1,
    explanation: "Early engagement with the fire risk assessor ensures the emergency lighting design aligns with the identified risks, occupant needs, and building characteristics, preventing costly redesigns and compliance failures."
  },
  {
    id: 8,
    question: "A school building would typically be classified as which risk category?",
    options: [
      "Low risk",
      "Medium risk",
      "High risk",
      "No risk"
    ],
    correct: 1,
    explanation: "Schools are typically medium risk, requiring 3-hour duration and anti-panic lighting in open areas such as halls and assembly spaces, due to the presence of children and public access."
  },
  {
    id: 9,
    question: "What legal consequence may arise from ignoring risk assessment findings?",
    options: [
      "A polite warning only",
      "Fines, prohibition notices, or prosecution under the Fire Safety Order",
      "Nothing — risk assessments are optional",
      "A discount on insurance premiums"
    ],
    correct: 1,
    explanation: "Ignoring risk assessment findings breaches the Regulatory Reform (Fire Safety) Order 2005, which can result in improvement notices, prohibition notices, fines, or prosecution. In serious cases, it can lead to imprisonment."
  },
  {
    id: 10,
    question: "What was the compliance issue in the Derby warehouse case study?",
    options: [
      "The lights were the wrong colour",
      "A 1-hour system was installed in a high-risk building requiring 3-hour duration",
      "There were too many emergency lights",
      "The logbook was printed in the wrong font"
    ],
    correct: 1,
    explanation: "The Derby warehouse ignored the fire risk assessment's high-risk classification and installed a cheaper 1-hour system instead of the required 3-hour system with enhanced cabling. This led to forced redesign at double the original cost."
  }
];
