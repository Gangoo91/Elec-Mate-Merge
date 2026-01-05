import { QuizQuestion } from '@/types/quiz';

export const bmsModule7Section2Quiz: QuizQuestion[] = [
  {
    id: 1,
    question: "What are function blocks in BMS programming?",
    options: [
      "Physical building blocks used in construction",
      "Graphical building blocks used to create control logic",
      "Electrical connection blocks",
      "Network communication modules"
    ],
    correctAnswer: 1,
    explanation: "Function blocks are graphical building blocks used to create control logic in BMS programming. They represent specific functions that process inputs and generate outputs, making complex control sequences easier to understand and maintain."
  },
  {
    id: 2,
    question: "Give one example of a common function block.",
    options: [
      "Electrical panel",
      "AND/OR gate",
      "Cable tray",
      "Power supply"
    ],
    correctAnswer: 1,
    explanation: "AND/OR gates are common function blocks used in BMS programming for logic decisions. Other examples include timers, comparators, and switching blocks."
  },
  {
    id: 3,
    question: "What does Boolean logic use as its two states?",
    options: [
      "On and Off",
      "True (1) and False (0)",
      "High and Low",
      "Yes and No"
    ],
    correctAnswer: 1,
    explanation: "Boolean logic uses True (1) and False (0) as its two basic states. These binary conditions form the foundation of all digital decision-making in BMS systems."
  },
  {
    id: 4,
    question: "What does an AND logic require for a true output?",
    options: [
      "Any one condition to be true",
      "All conditions must be true",
      "No conditions to be true",
      "Alternating true and false conditions"
    ],
    correctAnswer: 1,
    explanation: "AND logic requires ALL conditions to be true for the output to be true. If any condition is false, the output will be false."
  },
  {
    id: 5,
    question: "What does an OR logic require for a true output?",
    options: [
      "All conditions must be true",
      "Any one condition to be true",
      "No conditions to be true",
      "Exactly two conditions to be true"
    ],
    correctAnswer: 1,
    explanation: "OR logic requires only ANY one condition to be true for the output to be true. If at least one input is true, the output will be true."
  },
  {
    id: 6,
    question: "What does a NOT logic do to an input?",
    options: [
      "Amplifies the signal",
      "Inverts the input signal",
      "Delays the signal",
      "Filters the signal"
    ],
    correctAnswer: 1,
    explanation: "NOT logic inverts the input signal. If the input is True (1), the output becomes False (0), and if the input is False (0), the output becomes True (1)."
  },
  {
    id: 7,
    question: "What are the three components of PID control?",
    options: [
      "Power, Input, Display",
      "Proportional, Integral, Derivative",
      "Primary, Internal, Direct",
      "Process, Interface, Device"
    ],
    correctAnswer: 1,
    explanation: "The three components of PID control are Proportional (reacts to current error), Integral (reacts to accumulated error over time), and Derivative (reacts to rate of change of error)."
  },
  {
    id: 8,
    question: "Which part of PID corrects long-term offset from setpoint?",
    options: [
      "Proportional (P)",
      "Integral (I)",
      "Derivative (D)",
      "All three equally"
    ],
    correctAnswer: 1,
    explanation: "The Integral (I) component corrects long-term offset from setpoint. It accumulates error over time and gradually increases the control output to eliminate steady-state drift."
  },
  {
    id: 9,
    question: "Why is programming/testing done with electricians present?",
    options: [
      "It's a legal requirement",
      "To verify wiring matches programming and test physical responses",
      "To operate the computer software",
      "To write the control programs"
    ],
    correctAnswer: 1,
    explanation: "Programming and testing is done with electricians present to verify that programmed logic matches the physical installation, test physical responses, and confirm that safety interlocks work correctly."
  },
  {
    id: 10,
    question: "In the real-world example, what programming error caused a fan to run during a fire alarm?",
    options: [
      "Missing timer function",
      "Incorrect OR logic instead of AND/NOT logic",
      "Wrong PID parameters",
      "Broken function block"
    ],
    correctAnswer: 1,
    explanation: "The programming error was using OR logic instead of proper AND/NOT logic. The incorrect OR logic meant the fan would run if ANY condition was true, including during a fire alarm when it should have stopped."
  }
];