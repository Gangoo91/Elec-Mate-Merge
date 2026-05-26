export const emergencyHighRiskQuizData = {
  title: 'High-Risk Task Area Lighting Assessment',
  description:
    'Test your understanding of high-risk task area lighting requirements and applications',
  questions: [
    {
      id: 1,
      question: 'What is the primary purpose of high-risk task area lighting?',
      options: [
        'Delta primary, star secondary with neutral, 330 degrees (11 o\\\\\\\\\\\\\\\'clock) phase shift',
        'To allow safe shutdown of dangerous processes before evacuation',
        'Connect it to earth and provide mechanical protection',
        'To provide international guidance for BMS design and operation',
      ],
      correctAnswer: 1,
      explanation:
        'High-risk task area lighting enables workers to safely shut down dangerous processes, machinery, or equipment before evacuating, preventing accidents and injuries.',
    },
    {
      id: 2,
      question:
        'What is the minimum maintained lux level required for high-risk task area lighting under BS 5266?',
      options: [
        '0.5 lux',
        '5 lux',
        '15 lux',
        '50 lux',
      ],
      correctAnswer: 2,
      explanation:
        'BS 5266 requires a minimum of 15 lux maintained illuminance for high-risk task areas, significantly higher than the 0.5 lux required for escape routes.',
    },
    {
      id: 3,
      question:
        'High-risk task area lighting must provide what percentage of normal task illuminance?',
      options: [
        '5%',
        '50%',
        '20%',
        '10%',
      ],
      correctAnswer: 3,
      explanation:
        'The lighting must provide at least 10% of the normal task illuminance, with a minimum of 15 lux, whichever is greater.',
    },
    {
      id: 4,
      question: 'Which of these would NOT typically require high-risk task area lighting?',
      options: [
        'General office administration',
        'Chemical laboratory work',
        'Industrial lathe operation',
        'Welding operations',
      ],
      correctAnswer: 0,
      explanation:
        'General office work does not involve hazardous processes or dangerous machinery that would require high-risk task area lighting.',
    },
    {
      id: 5,
      question: 'Why is glare reduction particularly important in high-risk task lighting?',
      options: [
        'Electrical Installation Certificate (EIC) or Minor Works Certificate',
        'To prevent accidents during critical shutdown procedures',
        'Outdoor cables - moisture and UV resistant',
        'Increases by the highest of earnings, inflation, or 2.5%',
      ],
      correctAnswer: 1,
      explanation:
        'Glare can impair vision and cause accidents when workers need to safely shutdown dangerous equipment or processes during an emergency.',
    },
    {
      id: 6,
      question:
        'What is the typical minimum duration for emergency lighting in industrial settings?',
      options: [
        '8 hours',
        '1 hour',
        '3 hours',
        '30 minutes',
      ],
      correctAnswer: 2,
      explanation:
        'While the minimum is 1 hour, industrial settings often require 3 hours duration to allow for complex shutdown procedures and potential rescue operations.',
    },
    {
      id: 7,
      question: 'What type of assessment determines the need for high-risk task lighting?',
      options: [
        'Serpentine and amphibole groups',
        'Issue corrected certificates',
        'To save space for materials',
        'Risk evaluation/assessment',
      ],
      correctAnswer: 3,
      explanation:
        'A formal risk evaluation must assess where dangerous processes occur and determine the need for high-risk task area lighting.',
    },
    {
      id: 8,
      question: 'Why cannot anti-panic lighting substitute for high-risk task area lighting?',
      options: [
        'All of the above',
        'They serve different purposes - movement vs task completion',
        'Anti-panic lighting covers different areas',
        'Anti-panic lighting is too dim for task completion',
      ],
      correctAnswer: 0,
      explanation:
        'Anti-panic lighting (0.5 lux) is designed for safe movement through open areas, not for completing dangerous tasks which require much higher illuminance (15+ lux) and precise coverage.',
    },
    {
      id: 9,
      question: 'How often should lux levels be measured in high-risk task areas?',
      options: [
        'Do not energise until fault is found and rectified',
        'Periodically as part of maintenance schedule',
        'Consider instrument accuracy in borderline cases',
        'Reduce contact resistance and prevent oxidation',
      ],
      correctAnswer: 1,
      explanation:
        'Lux levels should be measured periodically (not just monthly/annually) as part of the maintenance schedule to ensure continued compliance with safety requirements.',
    },
    {
      id: 10,
      question: 'Who should be consulted when planning high-risk task lighting around machinery?',
      options: [
        'Building managers only',
        'Electrical contractors only',
        'Supervisors and machine operators',
        'Insurance companies only',
      ],
      correctAnswer: 2,
      explanation:
        'Supervisors and machine operators have essential knowledge about shutdown procedures, hazard locations, and operational requirements that inform proper lighting design.',
    },
  ],
};
