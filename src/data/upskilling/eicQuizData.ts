export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export const eicQuizData: QuizQuestion[] = [
  {
    id: 1,
    question: "When is an Electrical Installation Certificate (EIC) required?",
    options: [
      "Only for completely new installations",
      "For new installations and major alterations including new circuits",
      "Only when Building Regulations notification is required",
      "For any electrical work in domestic properties"
    ],
    correct: 1,
    explanation: "An EIC is required for new installations and major alterations including the addition of new circuits. Minor additions on existing circuits would use a Minor Works Certificate."
  },
  {
    id: 2,
    question: "Who must sign the Design section of an EIC?",
    options: [
      "The person who installed the work",
      "The person who tested the installation",
      "The person responsible for the design",
      "Any qualified electrician"
    ],
    correct: 2,
    explanation: "The Design section must be signed by the person responsible for the design of the installation, who accepts responsibility for ensuring the design complies with BS 7671."
  },
  {
    id: 3,
    question: "What information must be included in the circuit schedule?",
    options: [
      "Only circuit references and cable sizes",
      "Circuit details, wiring types, protective devices and test results",
      "Just the test results for each circuit",
      "Only the protective device ratings"
    ],
    correct: 1,
    explanation: "The circuit schedule must include comprehensive details: circuit references, descriptions, wiring types, conductor sizes, protective device details, and relevant test results."
  },
  {
    id: 4,
    question: "Which tests are mandatory before completing an EIC?",
    options: [
      "Only continuity and insulation resistance tests",
      "All tests specified in BS 7671 Part 6",
      "Only RCD tests if RCDs are installed",
      "Basic safety tests only"
    ],
    correct: 1,
    explanation: "All tests specified in BS 7671 Part 6 must be completed, including continuity, insulation resistance, polarity, earth fault loop impedance, and RCD operation where applicable."
  },
  {
    id: 5,
    question: "What should be done if test results do not meet BS 7671 requirements?",
    options: [
      "Complete the certificate anyway",
      "Do not complete the certificate until defects are rectified",
      "Note the defects but still issue the certificate",
      "Reduce the test requirements to pass"
    ],
    correct: 1,
    explanation: "The certificate should not be completed until all defects are rectified and test results comply with BS 7671. The installation must be safe before energisation."
  },
  {
    id: 6,
    question: "How should design calculations be documented for an EIC?",
    options: [
      "They are not required for domestic installations",
      "Basic calculations only are needed",
      "Comprehensive calculations including demand, cable selection, and protection",
      "Only cable sizes need to be recorded"
    ],
    correct: 2,
    explanation: "Comprehensive design calculations must include maximum demand assessment, cable selection criteria, volt drop calculations, and protective device coordination."
  },
  {
    id: 7,
    question: "What is the purpose of the Inspector/Tester signature on an EIC?",
    options: [
      "To confirm the work was completed on time",
      "To verify that inspection and testing confirm compliance",
      "To approve the design calculations",
      "To certify the installation cost"
    ],
    correct: 1,
    explanation: "The Inspector/Tester signature confirms that thorough inspection and testing have been carried out and that the results demonstrate compliance with BS 7671."
  },
  {
    id: 8,
    question: "When must an EIC be provided to the client?",
    options: [
      "Within 30 days of completion",
      "Upon completion of the work before final payment",
      "Only if requested by the client",
      "When the installation is first energised"
    ],
    correct: 1,
    explanation: "The EIC must be provided to the client upon completion of the work, typically before final payment, as evidence that the installation complies with BS 7671."
  },
  {
    id: 9,
    question: "What action is required if the original design needs to be modified during installation?",
    options: [
      "Continue with original design regardless",
      "Make changes without documentation",
      "Update the design and ensure the designer approves changes",
      "Complete a separate certificate for changes"
    ],
    correct: 2,
    explanation: "Any design modifications must be properly documented and approved by the designer to ensure continued compliance. The designer must accept responsibility for changes."
  },
  {
    id: 10,
    question: "How should limitations in inspection or testing be handled on an EIC?",
    options: [
      "Ignore any limitations",
      "Clearly document all limitations and their reasons",
      "Cancel the certificate if any limitations exist",
      "Only note major limitations"
    ],
    correct: 1,
    explanation: "All limitations in inspection or testing must be clearly documented on the certificate with reasons, so users understand the scope of verification undertaken."
  }
];