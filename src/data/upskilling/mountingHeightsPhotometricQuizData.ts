interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export const mountingHeightsPhotometricQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "How does ceiling height affect light distribution?",
    options: [
      "Higher ceilings reduce light intensity at floor level but spread light over wider areas",
      "Higher ceilings increase light intensity everywhere",
      "Ceiling height has no effect on light distribution",
      "Higher ceilings only affect colour temperature"
    ],
    correct: 0,
    explanation: "Higher mounting heights spread light over larger areas but reduce intensity at floor level due to the inverse square law. This affects spacing calculations and luminaire selection."
  },
  {
    id: 2,
    question: "What risk occurs if luminaires are mounted too high?",
    options: [
      "They become more expensive to operate",
      "Light intensity at floor level may be insufficient to meet required lux levels",
      "They produce too much heat",
      "Battery life is reduced"
    ],
    correct: 1,
    explanation: "Mounting luminaires above their recommended height can result in insufficient light intensity at floor level, creating dark patches and failing to meet the minimum 1 lux requirement for escape routes."
  },
  {
    id: 3,
    question: "What risk occurs if luminaires are mounted too low?",
    options: [
      "Insufficient coverage area",
      "Glare and uneven light distribution",
      "Higher electricity costs",
      "Reduced emergency duration"
    ],
    correct: 1,
    explanation: "Low mounting can cause glare, uneven distribution, and potential damage from people or equipment. It may also create harsh shadows and uncomfortable lighting conditions."
  },
  {
    id: 4,
    question: "What is the purpose of polar curve diagrams?",
    options: [
      "To show energy consumption patterns",
      "To display beam spread and light intensity distribution in all directions",
      "To indicate battery charging cycles",
      "To show colour temperature variations"
    ],
    correct: 1,
    explanation: "Polar curve diagrams show how light is distributed from a luminaire at different angles, helping designers understand beam patterns and predict light distribution in the space."
  },
  {
    id: 5,
    question: "What information do spacing tables provide?",
    options: [
      "Cable lengths required for installation",
      "Maximum spacing between luminaires to achieve required lux levels",
      "Battery replacement schedules",
      "Mounting bracket specifications"
    ],
    correct: 1,
    explanation: "Spacing tables indicate the maximum distance between luminaires at different mounting heights to ensure adequate illumination levels and uniformity across the area."
  },
  {
    id: 6,
    question: "Why is uniformity important in emergency lighting design?",
    options: [
      "It reduces installation costs",
      "It prevents bright and dark patches that can impair visibility during evacuation",
      "It improves battery life",
      "It meets aesthetic requirements"
    ],
    correct: 1,
    explanation: "Good uniformity prevents confusing bright and dark areas that could impair vision and navigation during emergency evacuation. BS 5266 specifies maximum uniformity ratios."
  },
  {
    id: 7,
    question: "What type of beam is most suitable for corridors?",
    options: [
      "Very wide beam (120°+)",
      "Narrow to medium beam (15-60°)",
      "Circular beam pattern only",
      "Adjustable beam width"
    ],
    correct: 1,
    explanation: "Corridors benefit from narrow to medium beams that efficiently light the linear path without wasting light on walls. Wide beams would create inefficient light distribution."
  },
  {
    id: 8,
    question: "Why must obstructions be considered in light distribution design?",
    options: [
      "They affect the aesthetic appearance",
      "They can block light paths and create shadows, affecting required illumination levels",
      "They increase maintenance costs",
      "They change cable routing requirements"
    ],
    correct: 1,
    explanation: "Obstructions like shelving, equipment, or structural elements can block light and create shadows, potentially leaving areas below required illumination levels."
  },
  {
    id: 9,
    question: "How do wall and ceiling colours affect lighting performance?",
    options: [
      "Dark colours have no effect on lighting",
      "Light-coloured surfaces reflect more light, improving distribution; dark surfaces absorb light",
      "Only ceiling colour matters",
      "Colour only affects aesthetics, not performance"
    ],
    correct: 1,
    explanation: "Surface reflectances significantly impact light distribution. Light surfaces (70% reflectance) help distribute light effectively, while dark surfaces (10% reflectance) absorb light and reduce performance."
  },
  {
    id: 10,
    question: "Why should mounting heights be recorded in design drawings?",
    options: [
      "For aesthetic coordination with architects",
      "To ensure installers mount fittings correctly and enable verification of design intent",
      "To calculate cable lengths",
      "To determine warranty periods"
    ],
    correct: 1,
    explanation: "Documenting mounting heights ensures correct installation, enables inspectors to verify compliance with design calculations, and provides reference for future maintenance and modifications."
  }
];