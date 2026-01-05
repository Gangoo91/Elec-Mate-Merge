
import { useState } from 'react';
import { QuizQuestion } from '@/types/quiz';
import QuizQuestionComponent from './quiz/QuizQuestion';
import QuizResults from './quiz/QuizResults';
import QuizNavigation from './quiz/QuizNavigation';
import QuizProgress from './quiz/QuizProgress';

const typesOfTestingQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Which test must always be performed before applying power?",
    options: [
      "RCD test",
      "Functional test", 
      "Insulation resistance",
      "Visual inspection"
    ],
    correctAnswer: 3,
    explanation: "Visual inspection must always come first to identify any obvious faults, damage, or safety issues before any electrical testing begins."
  },
  {
    id: 2,
    question: "What is the minimum insulation resistance value for circuits rated up to 500V?",
    options: [
      "0.5 MΩ",
      "1 MΩ",
      "2 MΩ",
      "5 MΩ"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 requires a minimum insulation resistance of 1 MΩ for circuits rated up to 500V to ensure adequate insulation between conductors and to earth."
  },
  {
    id: 3,
    question: "What does an insulation resistance test help detect?",
    options: [
      "Overheating of conductors",
      "Damaged insulation or short paths",
      "Loose terminals",
      "Incorrect RCD rating"
    ],
    correctAnswer: 1,
    explanation: "Insulation resistance testing detects damaged insulation or unintentional connection paths between conductors or to earth, which could cause dangerous conditions."
  },
  {
    id: 4,
    question: "Which test confirms that a fault would disconnect the supply fast enough?",
    options: [
      "Continuity",
      "RCD test",
      "Earth fault loop impedance (Zs)",
      "Visual inspection"
    ],
    correctAnswer: 2,
    explanation: "Earth fault loop impedance (Zs) testing confirms that fault current can flow quickly enough to operate protective devices within the required disconnection times."
  },
  {
    id: 5,
    question: "What is the correct order to begin testing after visual inspection?",
    options: [
      "RCD > Functional > Continuity",
      "Continuity > Insulation > Polarity",
      "Earth loop > PSC > Continuity", 
      "Functional > PSC > Insulation"
    ],
    correctAnswer: 1,
    explanation: "The correct testing sequence after visual inspection is: Continuity, then Insulation Resistance, then Polarity. This follows the BS7671 prescribed order."
  },
  {
    id: 6,
    question: "At what percentage of rated current should an RCD not trip during testing?",
    options: [
      "25%",
      "50%",
      "75%",
      "100%"
    ],
    correctAnswer: 1,
    explanation: "An RCD should NOT trip at 50% of its rated tripping current. This test ensures the RCD is not over-sensitive and won't cause nuisance tripping."
  },
  {
    id: 7,
    question: "What does PSC stand for in electrical testing?",
    options: [
      "Protective Safety Current",
      "Prospective Short Circuit (current)",
      "Primary Supply Connection",
      "Power System Continuity"
    ],
    correctAnswer: 1,
    explanation: "PSC stands for Prospective Short Circuit current - the maximum current that could flow during a short circuit fault between live conductors."
  },
  {
    id: 8,
    question: "During continuity testing of a ring final circuit, what should you measure?",
    options: [
      "Only the CPC continuity",
      "Line to neutral resistance",
      "Line, neutral, and CPC continuity separately",
      "Earth fault loop impedance"
    ],
    correctAnswer: 2,
    explanation: "Ring final circuit continuity testing requires measuring the line, neutral, and CPC (circuit protective conductor) continuity separately to ensure the ring is complete."
  },
  {
    id: 9,
    question: "Why must polarity testing be carried out?",
    options: [
      "To check cable colours are correct",
      "To ensure protective devices are in the line conductor",
      "To measure voltage levels",
      "To test RCD sensitivity"
    ],
    correctAnswer: 1,
    explanation: "Polarity testing ensures that protective devices (fuses, MCBs) are connected in the line conductor and that single-pole switches control the line conductor, not the neutral."
  },
  {
    id: 10,
    question: "What should you do if insulation resistance readings are below the minimum required values?",
    options: [
      "Continue with testing and note it on the certificate",
      "Stop testing and investigate the cause before proceeding",
      "Increase the test voltage and re-test",
      "Only test the functional operation"
    ],
    correctAnswer: 1,
    explanation: "Low insulation resistance indicates a potentially dangerous condition. Testing must stop and the fault must be investigated and corrected before proceeding with further tests."
  }
];

const TypesOfTestingQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < typesOfTestingQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
  };

  if (showResults) {
    return (
      <QuizResults 
        questions={typesOfTestingQuestions}
        selectedAnswers={selectedAnswers}
        onRestart={handleRestart}
      />
    );
  }

  const question = typesOfTestingQuestions[currentQuestion];

  return (
    <div className="space-y-6">
      <QuizProgress 
        currentQuestion={currentQuestion}
        totalQuestions={typesOfTestingQuestions.length}
      />

      <QuizQuestionComponent
        question={question}
        selectedAnswer={selectedAnswers[currentQuestion]}
        onAnswerSelect={handleAnswerSelect}
      />

      <QuizNavigation
        currentQuestion={currentQuestion}
        totalQuestions={typesOfTestingQuestions.length}
        selectedAnswer={selectedAnswers[currentQuestion]}
        onPrevious={handlePrevious}
        onNext={handleNext}
        isLastQuestion={currentQuestion === typesOfTestingQuestions.length - 1}
      />
    </div>
  );
};

export default TypesOfTestingQuiz;
