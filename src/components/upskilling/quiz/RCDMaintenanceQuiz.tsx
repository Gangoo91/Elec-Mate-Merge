import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';

const RCDMaintenanceQuiz = () => {
  const questions = [
    {
      id: 1,
      question: 'How often does the BS 7671 RCD notice instruct users to press the test button?',
      options: ['Weekly', 'Monthly', 'Six-monthly', 'Annually'],
      correct: 2,
      explanation:
        'The RCD instruction notice required by BS 7671 (Regulation 514.12.1) tells users to test six-monthly by pressing the test button and then manually switching the device back on.',
    },
    {
      id: 2,
      question: 'What is a recommended minimum retention period for RCD test records?',
      options: ['3 years', '1 year', '2 years', '6 months'],
      correct: 0,
      explanation:
        'RCD test records should be kept for at least 3 years (ideally until the next inspection) to demonstrate ongoing compliance and maintenance history.',
    },
    {
      id: 3,
      question: 'Which maintenance activity requires a qualified electrician?',
      options: [
        'Operating the test button periodically',
        'A visual inspection of the RCD housing',
        'Annual electrical testing with instruments',
        'Recording the test results in the logbook',
      ],
      correct: 2,
      explanation:
        'Annual instrument testing requires a qualified electrician with calibrated test equipment and knowledge of the BS 7671 test procedures.',
    },
    {
      id: 4,
      question: 'What should be done if an RCD fails to trip when the test button is pressed?',
      options: [
        'Press the button harder a few times',
        'Reset the device and try once more',
        'Wait 24 hours and test again',
        'Treat the protection as failed and contact a qualified electrician',
      ],
      correct: 3,
      explanation:
        'A failed test button means the RCD may not provide protection, so the protection should be treated as compromised and an electrician called.',
    },
    {
      id: 5,
      question: 'Which environmental factor most commonly affects RCD performance?',
      options: [
        'The ambient lighting level',
        'Temperature and humidity',
        'Nearby electromagnetic fields',
        'Variations in air pressure',
      ],
      correct: 1,
      explanation:
        'Temperature and humidity have the greatest effect, with extremes able to alter trip times and accelerate component degradation.',
    },
    {
      id: 6,
      question: 'At what age is an RCD typically considered for replacement?',
      options: ['After 5 years', 'After 15 years', 'After 10 years', 'After 25 years'],
      correct: 1,
      explanation:
        'Although RCDs can last longer, replacement is commonly considered around 15 years as ageing components can become less reliable.',
    },
    {
      id: 7,
      question: 'What is the primary purpose of RCD maintenance documentation?',
      options: [
        'To satisfy insurers only',
        'To track the product warranty period',
        'To demonstrate ongoing compliance and safety',
        'To plan unrelated future electrical work',
      ],
      correct: 2,
      explanation:
        'The records demonstrate ongoing compliance, provide evidence of due diligence and support the wider safety management system.',
    },
    {
      id: 8,
      question: 'Which condition requires the RCD to be replaced immediately?',
      options: [
        'Slight discolouration of the housing',
        'A trip time of 250ms at rated residual current',
        'Occasional nuisance tripping',
        'Complete failure to trip at any test current',
      ],
      correct: 3,
      explanation:
        'A complete failure to trip means there is no residual current protection, which is a serious safety risk requiring immediate replacement.',
    },
    {
      id: 9,
      question: 'How should environmental conditions be recorded during RCD maintenance?',
      options: [
        'As part of the routine maintenance records',
        'Only if a problem is found',
        'Only during extreme weather',
        'Only for outdoor installations',
      ],
      correct: 0,
      explanation:
        'Conditions should be logged routinely because they affect RCD performance and help reveal trends that may impact reliability.',
    },
    {
      id: 10,
      question: 'What training should building users receive for RCD upkeep?',
      options: [
        'Full instrument testing procedures',
        'How to operate the test button and what to do if it fails',
        'RCD replacement techniques',
        'Complex fault diagnosis methods',
      ],
      correct: 1,
      explanation:
        'Users only need to know how to operate the test button, recognise a failure and when to call a professional, not how to test or replace the device.',
    },
  ];

  return (
    <SingleQuestionQuiz
      questions={questions}
      title="Knowledge Check: RCD Maintenance & Compliance"
    />
  );
};

export default RCDMaintenanceQuiz;
