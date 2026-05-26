export const quizData = [
  {
    question: 'What is the key difference between self-contained and central battery systems?',
    options: [
      'Sensible heat changes temperature without phase change; latent heat changes phase without temperature change',
      'Self-contained systems have integrated batteries in each luminaire, central systems use a single battery bank',
      'A possible inter-turn short circuit on that winding, reducing the effective number of turns',
      'Two quick inhales through the nose followed by a long exhale through the mouth',
    ],
    correctAnswer:
      'Self-contained systems have integrated batteries in each luminaire, central systems use a single battery bank',
    explanation:
      'The fundamental difference is that self-contained systems have a battery and charger integrated into each individual luminaire, whilst central battery systems supply multiple luminaires from a single, centralised battery bank located in a dedicated room.',
  },
  {
    question: 'State one advantage of self-contained systems.',
    options: [
      'Longer battery life than central systems',
      'Simple to install with standard wiring',
      'No battery replacement required',
      'Always cheaper in the long term',
    ],
    correctAnswer: 'Simple to install with standard wiring',
    explanation:
      "Self-contained systems are simple to install using standard final circuit wiring, don't require dedicated battery rooms, and offer independent operation where failure of one unit doesn't affect others. This makes them cost-effective for smaller installations.",
  },
  {
    question: 'State one disadvantage of self-contained systems.',
    options: [
      'They cannot be used in schools',
      'Batteries require replacement every 3–5 years',
      "They don't comply with BS 5266",
      'They cannot provide 3-hour duration',
    ],
    correctAnswer: 'Batteries require replacement every 3–5 years',
    explanation:
      "Self-contained system batteries typically need replacing every 3–5 years across all fittings, which increases maintenance labour costs. They're also temperature-sensitive, and testing multiple individual units throughout a building is time-consuming.",
  },
  {
    question: 'Why are central battery systems easier to maintain?',
    options: [
      "They don't require any testing",
      'All batteries are in one location for servicing',
      'They never need battery replacement',
      'They are smaller than self-contained units',
    ],
    correctAnswer: 'All batteries are in one location for servicing',
    explanation:
      'Central battery systems concentrate all batteries in a single, dedicated room, making inspection, testing, and replacement significantly easier. Technicians can service the entire system from one location rather than visiting multiple luminaires throughout the building.',
  },
  {
    question: 'Which system generally has a longer battery life?',
    options: [
      'Self-contained systems (15–20 years)',
      'Central battery systems (10–25 years)',
      'Both have the same battery life',
      'It depends on the building size only',
    ],
    correctAnswer: 'Central battery systems (10–25 years)',
    explanation:
      'Central battery systems typically have battery lifespans of 10–25 years depending on the battery type, significantly longer than the 3–5 year lifespan of self-contained system batteries. This extended life reduces replacement frequency and long-term costs.',
  },
  {
    question: 'What type of buildings are best suited to self-contained systems?',
    options: [
      'To maintain circuit integrity during fire conditions',
      'Small to medium-sized buildings like offices and schools',
      'All batteries are in one location for servicing',
      'Large, complex, or high-occupancy sites like hospitals and airports',
    ],
    correctAnswer: 'Small to medium-sized buildings like offices and schools',
    explanation:
      'Self-contained systems are ideal for small to medium-sized buildings such as offices, retail spaces, and schools where low installation costs, simple wiring, and no requirement for dedicated battery rooms make them the practical choice.',
  },
  {
    question: 'What type of buildings are best suited to central battery systems?',
    options: [
      'Small to medium-sized buildings like offices and schools',
      'To maintain circuit integrity during fire conditions',
      'Large, complex, or high-occupancy sites like hospitals and airports',
      'All batteries are in one location for servicing',
    ],
    correctAnswer: 'Large, complex, or high-occupancy sites like hospitals and airports',
    explanation:
      'Central battery systems are best for large, complex, or high-occupancy buildings such as airports, hospitals, and shopping centres where higher reliability, easier centralised maintenance, and long battery life justify the higher installation costs.',
  },
  {
    question: 'Why do central battery systems require fire-resistant cabling?',
    options: [
      'To reduce installation costs',
      'To maintain circuit integrity during fire conditions',
      "Because it's cheaper than standard cable",
      'To comply with outdoor installation standards',
    ],
    correctAnswer: 'To maintain circuit integrity during fire conditions',
    explanation:
      "Central battery systems require enhanced fire-resistant cabling (such as FP200 or FP Plus) to maintain circuit integrity during fire emergencies, ensuring the emergency lighting continues to operate when it's needed most — during evacuation.",
  },
  {
    question: 'Which standard outlines maintenance requirements for both system types?',
    options: ['BS 7671', 'BS 5266-8 (EN 50172)', 'BS 5499', 'BS EN 60598'],
    correctAnswer: 'BS 5266-8 (EN 50172)',
    explanation:
      'BS 5266-8 (EN 50172) specifies maintenance and testing requirements for emergency lighting systems, mandating monthly functional tests and annual duration tests for both self-contained and central battery systems to ensure readiness.',
  },
  {
    question: 'Why might a mixed system be chosen in a large building?',
    options: [
      'The average exposure over an 8-hour working day must not exceed 5 mg/m³',
      'To balance cost, reliability, and maintenance efficiency based on risk assessment',
      'It receives signals from detection devices and controls the alarm outputs',
      'Motor circuits and equipment with moderate inrush current',
    ],
    correctAnswer:
      'To balance cost, reliability, and maintenance efficiency based on risk assessment',
    explanation:
      'A mixed approach uses central battery systems for critical high-risk areas (operating theatres, main escape routes) and self-contained systems for less critical zones (offices, storage). This balances reliability where it matters most with cost-effectiveness in lower-risk areas.',
  },
];
