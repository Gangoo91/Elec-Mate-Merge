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
    question: 'How does ceiling height affect light distribution?',
    options: [
      'Higher ceilings spread light over wider areas but reduce floor-level intensity',
      'Higher ceilings increase light intensity uniformly across the whole space',
      'Ceiling height has no measurable effect on light distribution',
      'Higher ceilings affect only the perceived colour temperature',
    ],
    correct: 0,
    explanation:
      'Higher mounting heights spread light over larger areas but reduce intensity at floor level due to the inverse square law. This affects spacing calculations and luminaire selection.',
  },
  {
    id: 2,
    question: 'What risk occurs if luminaires are mounted too high?',
    options: [
      'They become more expensive to run because the lamps draw more current',
      'Light intensity at floor level may be insufficient to meet required lux levels',
      'They produce too much heat for the surrounding ceiling void to dissipate',
      'Battery life is reduced because the emergency duration test runs longer',
    ],
    correct: 1,
    explanation:
      'Mounting luminaires above their recommended height can result in insufficient light intensity at floor level, creating dark patches and failing to meet the minimum 1 lux requirement for escape routes.',
  },
  {
    id: 3,
    question: 'What risk occurs if luminaires are mounted too low?',
    options: [
      'Increased risk of overheating the luminaire',
      'Glare and uneven light distribution',
      'Higher standby power consumption',
      'Reduced emergency duration',
    ],
    correct: 1,
    explanation:
      'Low mounting can cause glare, uneven distribution, and potential damage from people or equipment. It may also create harsh shadows and uncomfortable lighting conditions.',
  },
  {
    id: 4,
    question: 'What is the purpose of polar curve diagrams?',
    options: [
      'To show the energy consumption patterns of the luminaire',
      'To display beam spread and light intensity distribution in all directions',
      'To indicate the battery charging cycles of the fitting',
      'To show colour temperature variations across the beam',
    ],
    correct: 1,
    explanation:
      'Polar curve diagrams show how light is distributed from a luminaire at different angles, helping designers understand beam patterns and predict light distribution in the space.',
  },
  {
    id: 5,
    question: 'What information do spacing tables provide?',
    options: [
      'The cable lengths required for the installation runs',
      'Maximum spacing between luminaires to achieve required lux levels',
      'The recommended battery replacement schedules for the fittings',
      'The mounting bracket specifications for each luminaire type',
    ],
    correct: 1,
    explanation:
      'Spacing tables indicate the maximum distance between luminaires at different mounting heights to ensure adequate illumination levels and uniformity across the area.',
  },
  {
    id: 6,
    question: 'Why is uniformity important in emergency lighting design?',
    options: [
      'It reduces the installation cost of the emergency lighting system',
      'It prevents bright and dark patches that can impair visibility during evacuation',
      'It improves the battery life of the emergency luminaires',
      'It meets the building’s aesthetic and architectural requirements',
    ],
    correct: 1,
    explanation:
      'Good uniformity prevents confusing bright and dark areas that could impair vision and navigation during emergency evacuation. BS 5266 specifies maximum uniformity ratios.',
  },
  {
    id: 7,
    question: 'What type of beam is most suitable for corridors?',
    options: [
      'Very wide beam (120°+)',
      'Narrow to medium beam (15-60°)',
      'Circular beam pattern only',
      'Adjustable beam width',
    ],
    correct: 1,
    explanation:
      'Corridors benefit from narrow to medium beams that efficiently light the linear path without wasting light on walls. Wide beams would create inefficient light distribution.',
  },
  {
    id: 8,
    question: 'Why must obstructions be considered in light distribution design?',
    options: [
      'They affect the overall aesthetic appearance of the space',
      'They can block light paths and create shadows, affecting required illumination levels',
      'They increase the ongoing maintenance costs of the system',
      'They change the cable routing requirements for the circuit',
    ],
    correct: 1,
    explanation:
      'Obstructions like shelving, equipment, or structural elements can block light and create shadows, potentially leaving areas below required illumination levels.',
  },
  {
    id: 9,
    question: 'How do wall and ceiling colours affect lighting performance?',
    options: [
      'Surface colour has no measurable effect on lighting performance',
      'Light surfaces reflect more light while dark surfaces absorb it',
      'Only the ceiling colour affects how light is distributed',
      'Surface colour affects aesthetics but not lighting performance',
    ],
    correct: 1,
    explanation:
      'Surface reflectances significantly impact light distribution. Light surfaces (70% reflectance) help distribute light effectively, while dark surfaces (10% reflectance) absorb light and reduce performance.',
  },
  {
    id: 10,
    question: 'Why should mounting heights be recorded in design drawings?',
    options: [
      'For aesthetic coordination with the architect’s ceiling layout',
      'To ensure installers mount fittings correctly and enable verification of design intent',
      'To calculate the cable lengths needed for each luminaire run',
      'To determine the manufacturer warranty period for the fittings',
    ],
    correct: 1,
    explanation:
      'Documenting mounting heights ensures correct installation, enables inspectors to verify compliance with design calculations, and provides reference for future maintenance and modifications.',
  },
];
