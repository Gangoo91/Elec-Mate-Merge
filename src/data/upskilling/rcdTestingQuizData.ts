export const rcdTestingQuizData = [
  {
    question: "What test current should NEVER cause an RCD to trip?",
    options: [
      "¼ × IΔn (7.5mA for 30mA RCD)",
      "½ × IΔn (15mA for 30mA RCD)",
      "1 × IΔn (30mA for 30mA RCD)",
      "5 × IΔn (150mA for 30mA RCD)"
    ],
    correctAnswer: 1,
    explanation: "An RCD should never trip at ½ × IΔn. If it does, the device is over-sensitive and requires replacement to prevent nuisance tripping."
  },
  {
    question: "What is the maximum permitted trip time for a 30mA RCD at rated current (1 × IΔn)?",
    options: [
      "40ms",
      "150ms", 
      "300ms",
      "500ms"
    ],
    correctAnswer: 2,
    explanation: "For general purpose RCDs, the maximum trip time at rated current is 300ms according to BS 7671."
  },
  {
    question: "Why must RCDs be tested at both 0° and 180° phase angles?",
    options: [
      "To check both directions of current flow",
      "Because RCD sensitivity varies with AC waveform phase",
      "To test both live and neutral conductors",
      "It's a regulatory requirement with no technical reason"
    ],
    correctAnswer: 1,
    explanation: "RCD sensitivity varies with the phase angle of the residual current. The 180° test often represents worst-case conditions and may reveal marginal devices."
  },
  {
    question: "Is testing the RCD test button sufficient for compliance verification?",
    options: [
      "Yes, if it operates correctly",
      "Yes, but only for periodic testing",
      "No, proper testing with measured currents is required",
      "Only for domestic installations"
    ],
    correctAnswer: 2,
    explanation: "The test button only proves the tripping mechanism works, not the electronic detection circuit. Proper testing with measured currents and timed responses is required."
  },
  {
    question: "Where should RCD testing ideally be performed on a circuit?",
    options: [
      "At the distribution board terminals",
      "At the RCD device itself",
      "At the furthest practical point from the RCD",
      "At any convenient socket outlet"
    ],
    correctAnswer: 2,
    explanation: "Testing should be performed from the furthest practical point to prove circuit integrity and demonstrate protection coverage throughout the installation."
  },
  {
    question: "What is the maximum trip time for the 5 × IΔn test on socket circuits?",
    options: [
      "40ms",
      "150ms",
      "300ms",
      "There is no 5 × IΔn test requirement"
    ],
    correctAnswer: 0,
    explanation: "The 5 × IΔn test must trip within 40ms and is required for socket outlets rated 20A or less to ensure rapid disconnection for personal protection."
  },
  {
    question: "When is the 5 × IΔn test required?",
    options: [
      "For all RCD protected circuits",
      "Only for socket outlets rated 20A or less",
      "Only for bathroom circuits",
      "Only during initial verification"
    ],
    correctAnswer: 1,
    explanation: "The 5 × IΔn test is required for socket outlets rated 20A or less and circuits supplying mobile equipment to ensure rapid fault clearance for personal protection."
  },
  {
    question: "What should you do if an RCD trips during the ½ × IΔn test?",
    options: [
      "Record the trip time and continue",
      "Increase the test current and repeat",
      "Replace the RCD as it's over-sensitive",
      "Check the test equipment calibration"
    ],
    correctAnswer: 2,
    explanation: "An RCD that trips at ½ × IΔn is over-sensitive and must be replaced to prevent nuisance tripping in service."
  },
  {
    question: "For three-phase RCDs, how should testing be performed?",
    options: [
      "Test only one phase as they're all the same",
      "Test between all three phases simultaneously",
      "Test each line to neutral separately",
      "Test only the phase with the highest load"
    ],
    correctAnswer: 2,
    explanation: "Each line conductor must be tested to neutral separately to ensure balanced protection. Record the longest trip time found across all phases."
  },
  {
    question: "What is the typical current for the ½ × IΔn test on a 30mA RCD?",
    options: [
      "10mA",
      "15mA",
      "20mA",
      "25mA"
    ],
    correctAnswer: 1,
    explanation: "For a 30mA RCD, the ½ × IΔn test uses 15mA (half of 30mA) and should not cause the device to trip."
  }
];