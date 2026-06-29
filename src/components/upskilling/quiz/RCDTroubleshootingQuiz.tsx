import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';

const RCDTroubleshootingQuiz = () => {
  const questions = [
    {
      id: 1,
      question:
        'What is the first step when troubleshooting an RCD that trips immediately upon reset?',
      options: [
        'Disconnect all loads and test for earth faults',
        'Replace the RCD before any further checks',
        'Operate the RCD test button repeatedly',
        'Reset the RCD several times in succession',
      ],
      correct: 0,
      explanation:
        'Disconnecting all loads and testing for earth faults shows whether the fault lies in the RCD itself or in a connected circuit, allowing safe and systematic diagnosis.',
    },
    {
      id: 2,
      question:
        'Which test voltage is used for insulation resistance testing of a 230/400V circuit when locating earth faults?',
      options: ['250V DC', '500V DC', '1000V DC', '500V AC'],
      correct: 1,
      explanation:
        'For circuits up to and including 500V (other than SELV/PELV), BS 7671 Table 64 specifies a 500V DC insulation resistance test.',
    },
    {
      id: 3,
      question: 'What typically causes RCD nuisance tripping during motor starting?',
      options: [
        'A sustained mechanical overload on the motor',
        'An incorrectly rated motor for the load',
        'Slow drift in the supply voltage',
        'Switching transients and brief earth leakage during start-up',
      ],
      correct: 3,
      explanation:
        'Motor starting produces switching transients and a momentary rise in earth leakage current, which can cause a sensitive RCD to trip even with no genuine fault.',
    },
    {
      id: 4,
      question:
        'If the RCD test button operates but an instrument test shows no trip, what is the most likely cause?',
      options: [
        'Test equipment fault or incorrect test connections',
        'An internal failure of the RCD mechanism',
        'External electromagnetic interference',
        'A problem with the incoming supply voltage',
      ],
      correct: 0,
      explanation:
        'If the test button works, the mechanical trip is sound, so a failure to trip during instrument testing usually points to the test equipment or connections rather than the RCD.',
    },
    {
      id: 5,
      question:
        'What is the minimum acceptable insulation resistance for a 230/400V circuit tested at 500V DC?',
      options: ['1.0MΩ', '0.25MΩ', '0.5MΩ', '2.0MΩ'],
      correct: 0,
      explanation:
        'BS 7671 Table 64 requires a minimum of 1.0MΩ for circuits up to and including 500V tested at 500V DC; lower readings warrant investigation.',
    },
    {
      id: 6,
      question: 'When several RCDs trip simultaneously, what should be investigated first?',
      options: [
        'The loads on each individual final circuit',
        'The calibration of each RCD in turn',
        'The main earthing system and supply conditions',
        'Local environmental factors at each board',
      ],
      correct: 2,
      explanation:
        'Simultaneous tripping points to a common cause, most often the main earthing arrangement, a supply disturbance or an upstream fault rather than each individual circuit.',
    },
    {
      id: 7,
      question:
        'Which diagnostic tool is most effective for capturing intermittent RCD tripping events?',
      options: [
        'A digital multimeter',
        'An insulation resistance tester',
        'A dedicated RCD tester',
        'A storage oscilloscope or data logger',
      ],
      correct: 3,
      explanation:
        'A storage oscilloscope or data logger can record transient events that cause intermittent tripping, allowing the triggering conditions to be analysed later.',
    },
    {
      id: 8,
      question: 'How should circuits with a borrowed (shared) neutral be handled during troubleshooting?',
      options: [
        'Test each affected circuit completely independently',
        'Disregard the neutral arrangement during testing',
        'Isolate all circuits sharing the neutral together',
        'Test the neutrals separately from the line conductors',
      ],
      correct: 2,
      explanation:
        'Circuits sharing a neutral must be isolated together, otherwise return current via the shared neutral produces misleading readings and unreliable fault diagnosis.',
    },
    {
      id: 9,
      question: 'What is the primary safety consideration during RCD troubleshooting?',
      options: [
        'Treating RCD protection as potentially compromised',
        'Using only calibrated test instruments',
        'Documenting all readings as you go',
        'Working quickly to reduce circuit downtime',
      ],
      correct: 0,
      explanation:
        'While troubleshooting, the RCD protection may not be reliable, so additional precautions must be taken to protect against electric shock throughout the work.',
    },
    {
      id: 10,
      question: 'Which condition requires immediate RCD replacement without further testing?',
      options: [
        'A trip time of 280ms at rated residual current',
        'Complete failure to trip at any test current',
        'Occasional nuisance tripping under load',
        'Slight discolouration of the device housing',
      ],
      correct: 1,
      explanation:
        'A device that fails to trip at any test current offers no protection and presents an immediate danger, so it must be replaced regardless of any other factor.',
    },
  ];

  return (
    <SingleQuestionQuiz
      questions={questions}
      title="Knowledge Check: RCD Troubleshooting & Documentation"
    />
  );
};

export default RCDTroubleshootingQuiz;
