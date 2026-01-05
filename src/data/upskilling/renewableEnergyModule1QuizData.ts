import { QuizQuestion } from '@/types/quiz';

// Section 1: Introduction to Renewables Quiz
export const section1Questions: QuizQuestion[] = [
  {
    id: 1,
    question: 'Name one environmental benefit of renewables',
    options: [
      'Reduced carbon emissions and greenhouse gases',
      'Increased reliance on fossil fuels',
      'Higher operational costs',
      'Increased visual pollution'
    ],
    correctAnswer: 0,
    explanation: 'Renewable energy sources significantly reduce carbon emissions and greenhouse gases compared to fossil fuel-based generation, helping combat climate change.'
  },
  {
    id: 2,
    question: "What's a common challenge for grids with high solar input?",
    options: [
      'Increased stability throughout the day',
      'Variable output causing grid balancing issues',
      'Reduced maintenance requirements',
      'Lower electricity costs for consumers'
    ],
    correctAnswer: 1,
    explanation: 'Solar power creates variable output that can cause grid balancing challenges, especially during changing weather conditions and daily cycles.'
  },
  {
    id: 3,
    question: 'How can renewables improve energy security?',
    options: [
      'By increasing dependence on imports',
      'By reducing domestic energy production',
      'By diversifying energy sources and reducing import dependence',
      'By limiting energy storage options'
    ],
    correctAnswer: 2,
    explanation: 'Renewables improve energy security by diversifying the energy mix and reducing dependence on imported fossil fuels, creating domestic energy independence.'
  },
  {
    id: 4,
    question: 'Define decentralised generation',
    options: [
      'Large power stations owned by one company',
      'Small-scale generation located close to consumers',
      'Centralised fossil fuel power plants',
      'Nuclear power stations only'
    ],
    correctAnswer: 1,
    explanation: 'Decentralised generation refers to small-scale power generation systems located close to where the energy is consumed, often using renewable sources.'
  },
  {
    id: 5,
    question: 'Why are fossil fuel comparisons still relevant?',
    options: [
      'They are completely irrelevant',
      'To understand cost, reliability, and transition challenges',
      'Only for historical purposes',
      'To promote fossil fuel use'
    ],
    correctAnswer: 1,
    explanation: 'Fossil fuel comparisons remain relevant to understand the economic, reliability, and infrastructure transition challenges when replacing existing systems with renewables.'
  }
];

// Section 2: Key Systems Quiz
export const section2Questions: QuizQuestion[] = [
  {
    id: 6,
    question: 'Which system uses photovoltaic cells?',
    options: [
      'Wind turbines',
      'Solar PV panels',
      'Hydroelectric systems',
      'Biomass generators'
    ],
    correctAnswer: 1,
    explanation: 'Solar PV (photovoltaic) systems use photovoltaic cells to convert sunlight directly into electricity through the photovoltaic effect.'
  },
  {
    id: 7,
    question: 'What makes hydro more stable than wind?',
    options: [
      'Higher installation costs',
      'Better visual appeal',
      'Consistent water flow provides steady generation',
      'Lower environmental impact'
    ],
    correctAnswer: 2,
    explanation: 'Hydroelectric systems benefit from consistent water flow, providing more predictable and steady power generation compared to variable wind patterns.'
  },
  {
    id: 8,
    question: 'Name a benefit of biomass beyond power generation',
    options: [
      'Increased carbon emissions',
      'Waste disposal and recycling organic materials',
      'Reduced agricultural productivity',
      'Higher maintenance costs'
    ],
    correctAnswer: 1,
    explanation: 'Biomass systems provide waste disposal benefits by recycling organic materials that would otherwise decompose and release methane or require disposal.'
  },
  {
    id: 9,
    question: "What's a key drawback of wind power?",
    options: [
      'Zero environmental impact',
      'Consistent power output',
      'Visual and noise impact on communities',
      'Low electricity generation capacity'
    ],
    correctAnswer: 2,
    explanation: 'Wind power can create visual and noise impacts on local communities, which is often a consideration in planning and public acceptance.'
  },
  {
    id: 10,
    question: 'Which system has the lowest maintenance needs?',
    options: [
      'Wind turbines with moving parts',
      'Solar PV with no moving parts',
      'Biomass systems requiring fuel handling',
      'Hydro systems with mechanical components'
    ],
    correctAnswer: 1,
    explanation: 'Solar PV systems have the lowest maintenance needs because they have no moving parts, unlike wind, hydro, or biomass systems.'
  }
];

// Section 3: Generation vs Storage Quiz
export const section3Questions: QuizQuestion[] = [
  {
    id: 11,
    question: 'Why is energy storage important for solar?',
    options: [
      'To increase installation costs',
      'To match supply with demand timing',
      'To reduce efficiency',
      'To limit grid connection'
    ],
    correctAnswer: 1,
    explanation: 'Energy storage is crucial for solar because it allows energy generated during peak sunlight hours to be used when demand is high, typically in the evening.'
  },
  {
    id: 12,
    question: 'Name one grid-scale storage technology',
    options: [
      'Small residential batteries',
      'Pumped hydro storage',
      'Mobile phone batteries',
      'Car fuel tanks'
    ],
    correctAnswer: 1,
    explanation: 'Pumped hydro storage is a major grid-scale technology that uses excess electricity to pump water uphill, then releases it through turbines when power is needed.'
  },
  {
    id: 13,
    question: 'How does storage support frequency control?',
    options: [
      'By reducing grid connections',
      'By providing rapid response to balance supply and demand',
      'By limiting renewable generation',
      'By increasing transmission losses'
    ],
    correctAnswer: 1,
    explanation: 'Storage systems can rapidly inject or absorb power to help maintain grid frequency within acceptable limits, providing essential grid stability services.'
  },
  {
    id: 14,
    question: "What's the difference between base load and peak demand?",
    options: [
      'No difference - they are the same',
      'Base load is minimum continuous demand; peak is maximum demand',
      'Base load is higher than peak demand',
      'Peak demand only occurs at night'
    ],
    correctAnswer: 1,
    explanation: 'Base load is the minimum level of demand that must be met continuously, while peak demand is the highest level of electricity consumption during specific periods.'
  },
  {
    id: 15,
    question: 'What does "behind-the-meter" refer to?',
    options: [
      'Storage located before the electricity meter',
      'Storage systems located on the customer side of the meter',
      'Storage in electricity substations',
      'Storage that cannot be measured'
    ],
    correctAnswer: 1,
    explanation: 'Behind-the-meter storage refers to energy storage systems installed on the customer side of the electricity meter, typically for self-consumption and backup power.'
  }
];

// Section 4: Regulatory Landscape Quiz
export const section4Questions: QuizQuestion[] = [
  {
    id: 16,
    question: 'What year is the UK aiming for Net Zero?',
    options: [
      '2030',
      '2040',
      '2050',
      '2060'
    ],
    correctAnswer: 2,
    explanation: 'The UK has committed to achieving Net Zero carbon emissions by 2050, as legally binding target set in the Climate Change Act.'
  },
  {
    id: 17,
    question: 'Name a policy tool that guarantees renewable pricing',
    options: [
      'Carbon tax only',
      'Contracts for Difference (CfD)',
      'Building regulations',
      'Planning permission'
    ],
    correctAnswer: 1,
    explanation: 'Contracts for Difference (CfD) provide long-term price certainty for renewable energy generators by guaranteeing a minimum price for electricity generated.'
  },
  {
    id: 18,
    question: "What's a VPP?",
    options: [
      'Very Powerful Plant',
      'Virtual Private Partnership',
      'Virtual Power Plant',
      'Variable Peak Performance'
    ],
    correctAnswer: 2,
    explanation: 'A Virtual Power Plant (VPP) aggregates multiple distributed energy resources like solar panels, batteries, and flexible loads to operate as a unified power plant.'
  },
  {
    id: 19,
    question: 'Why are building regulations relevant for renewables?',
    options: [
      'They limit all renewable installations',
      'They set standards for integration and safety requirements',
      'They only apply to large solar farms',
      'They prevent renewable energy development'
    ],
    correctAnswer: 1,
    explanation: 'Building regulations set important standards for how renewable energy systems can be safely integrated into buildings, covering structural, electrical, and safety requirements.'
  },
  {
    id: 20,
    question: 'What global initiative addresses climate targets?',
    options: [
      'World Trade Organization',
      'COP (Conference of the Parties) agreements',
      'International Monetary Fund',
      'World Health Organization'
    ],
    correctAnswer: 1,
    explanation: 'COP (Conference of the Parties) agreements, such as the Paris Agreement from COP21, set global climate targets and frameworks for international cooperation on climate action.'
  }
];