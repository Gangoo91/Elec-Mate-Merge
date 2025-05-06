
// Sample quiz data
export const healthAndSafetyQuizzes = [
  {
    id: "quiz-health-1",
    title: "Health and Safety Fundamentals",
    questions: [
      {
        id: "q1",
        text: "Which of the following is a key piece of legislation governing electrical safety in the UK?",
        options: [
          { id: "a", text: "Health and Safety at Work Act" },
          { id: "b", text: "Electrical Safety Protocol" },
          { id: "c", text: "Building Regulations Act" },
          { id: "d", text: "National Construction Code" }
        ],
        correctOptionId: "a"
      },
      {
        id: "q2",
        text: "What should be your first action when arriving at a site to perform electrical work?",
        options: [
          { id: "a", text: "Begin work immediately" },
          { id: "b", text: "Conduct a risk assessment" },
          { id: "c", text: "Call your supervisor" },
          { id: "d", text: "Test existing circuits" }
        ],
        correctOptionId: "b"
      }
    ]
  }
];

export const electricalTheoryQuizzes = [
  {
    id: "quiz-theory-1",
    title: "Basic Electrical Theory",
    questions: [
      {
        id: "q1",
        text: "What is the unit of electrical current?",
        options: [
          { id: "a", text: "Volt" },
          { id: "b", text: "Watt" },
          { id: "c", text: "Ampere" },
          { id: "d", text: "Ohm" }
        ],
        correctOptionId: "c"
      },
      {
        id: "q2",
        text: "What is the formula for Ohm's Law?",
        options: [
          { id: "a", text: "V = I × R" },
          { id: "b", text: "P = V × I" },
          { id: "c", text: "R = P ÷ I²" },
          { id: "d", text: "I = P ÷ V" }
        ],
        correctOptionId: "a"
      }
    ]
  }
];

export const installationMethodsQuizzes = [
  {
    id: "quiz-installation-1",
    title: "Installation Methods Basics",
    questions: [
      {
        id: "q1",
        text: "What is the minimum depth at which underground cables should be buried?",
        options: [
          { id: "a", text: "150mm" },
          { id: "b", text: "450mm" },
          { id: "c", text: "600mm" },
          { id: "d", text: "900mm" }
        ],
        correctOptionId: "b"
      },
      {
        id: "q2",
        text: "Which of these is NOT a type of cable containment system?",
        options: [
          { id: "a", text: "Trunking" },
          { id: "b", text: "Conduit" },
          { id: "c", text: "Cable tray" },
          { id: "d", text: "Circuit breaker" }
        ],
        correctOptionId: "d"
      }
    ]
  }
];

export const craftSkillsQuizzes = [
  {
    id: "quiz-craft-1",
    title: "Craft Skills Assessment",
    questions: [
      {
        id: "q1",
        text: "Which tool is used for measuring insulation resistance?",
        options: [
          { id: "a", text: "Multimeter" },
          { id: "b", text: "Voltage indicator" },
          { id: "c", text: "Insulation resistance tester" },
          { id: "d", text: "Clamp meter" }
        ],
        correctOptionId: "c"
      },
      {
        id: "q2",
        text: "What is the correct sequence for safe isolation?",
        options: [
          { id: "a", text: "Identify, lock off, test, prove dead, re-test" },
          { id: "b", text: "Isolate, lock off, test, earth, verify" },
          { id: "c", text: "Inform, isolate, secure, test, earth, verify" },
          { id: "d", text: "Identify, isolate, secure, test, prove dead, work" }
        ],
        correctOptionId: "d"
      }
    ]
  }
];
