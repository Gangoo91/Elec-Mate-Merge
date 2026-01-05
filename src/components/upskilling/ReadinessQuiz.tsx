
import { useState } from 'react';
import { Brain, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const ReadinessQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(Array(10).fill(null));
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      question: "What should be verified before starting any electrical testing?",
      options: [
        "That all tools are calibrated",
        "That the visual inspection is complete and the circuit is safe and isolated",
        "That the client has paid",
        "That lunch break is over"
      ],
      correct: 1,
      explanation: "Before any testing begins, the visual inspection must be complete, and you must ensure the circuit is safe to work on and properly isolated."
    },
    {
      question: "Why should loads be disconnected during insulation resistance testing?",
      options: [
        "To save electricity",
        "To avoid damaging connected equipment and obtain accurate readings",
        "To make the test faster",
        "It's not necessary"
      ],
      correct: 1,
      explanation: "Loads must be disconnected to prevent damage to electronic equipment and ensure accurate insulation resistance readings."
    },
    {
      question: "What is the minimum acceptable insulation resistance for most circuits?",
      options: [
        "0.5 MΩ",
        "1.0 MΩ", 
        "2.0 MΩ",
        "5.0 MΩ"
      ],
      correct: 1,
      explanation: "BS 7671 requires a minimum insulation resistance of 1.0 MΩ for most electrical circuits, though higher values are often achieved."
    },
    {
      question: "When should test instruments be verified with a proving unit?",
      options: [
        "Once per day",
        "Before and after each use",
        "Once per week",
        "Only when calibration is due"
      ],
      correct: 1,
      explanation: "Test instruments, especially voltage testers, must be verified with a proving unit before and after each use to ensure they are working correctly."
    },
    {
      question: "What should you do if the installation earthing arrangements are unclear?",
      options: [
        "Assume standard TN-S arrangement",
        "Record as a limitation and investigate before proceeding",
        "Skip earth testing",
        "Guess based on building age"
      ],
      correct: 1,
      explanation: "Unclear earthing arrangements must be investigated and understood before testing can proceed safely. Record any limitations clearly."
    },
    {
      question: "Which protective devices should be checked before testing begins?",
      options: [
        "Only the main switch",
        "RCDs/RCBOs, MCBs, and isolation switches",
        "Just emergency lighting circuits",
        "Only recently installed devices"
      ],
      correct: 1,
      explanation: "All protective devices including RCDs, RCBOs, MCBs, and isolation switches should be visually checked and functionally tested before electrical testing."
    },
    {
      question: "What is the correct sequence for safe isolation?",
      options: [
        "Switch off, lock off, test dead, test tester",
        "Test tester, switch off, test dead, lock off",
        "Lock off, switch off, test dead, test tester",
        "Test dead, switch off, lock off, test tester"
      ],
      correct: 1,
      explanation: "The correct sequence is: Switch off, secure (lock off), test dead with voltage tester, then test the tester with a proving unit."
    },
    {
      question: "Why must all parallel paths be identified before testing?",
      options: [
        "To calculate circuit length",
        "To ensure accurate test results and prevent false readings",
        "To determine cable size",
        "For cost estimation"
      ],
      correct: 1,
      explanation: "Parallel paths can affect test results, particularly for insulation resistance and earth fault loop impedance tests, leading to false readings."
    },
    {
      question: "What documentation must be available before commencing testing?",
      options: [
        "Just the electrical certificate",
        "Circuit schedules, installation certificates, and previous test results",
        "Only building plans",
        "Insurance documents"
      ],
      correct: 1,
      explanation: "Complete documentation including circuit schedules, installation certificates, and previous test results is essential for proper testing."
    },
    {
      question: "When should you refuse to proceed with testing?",
      options: [
        "If the client seems difficult",
        "If safety cannot be assured or isolation is impossible",
        "If it's raining outside",
        "If documentation is in a different language"
      ],
      correct: 1,
      explanation: "Testing should never proceed if safety cannot be assured, proper isolation is impossible, or if there are significant safety concerns."
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers(Array(10).fill(null));
    setShowResults(false);
  };

  const correctAnswers = selectedAnswers.filter((answer, index) => answer === questions[index].correct).length;
  const percentage = Math.round((correctAnswers / questions.length) * 100);

  if (showResults) {
    return (
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Brain className="h-5 w-5 text-elec-yellow" />
            Quiz Results
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-elec-yellow mb-2">
              {percentage}%
            </div>
            <p className="text-foreground">
              You got {correctAnswers} out of {questions.length} questions correct
            </p>
            <Badge 
              variant="secondary" 
              className={`mt-3 ${percentage >= 80 ? 'bg-green-600/40 text-green-200' : 'bg-red-600/40 text-red-200'}`}
            >
              {percentage >= 80 ? 'Well Done!' : 'Keep Learning!'}
            </Badge>
          </div>
          
          <div className="space-y-4">
            {questions.map((q, index) => (
              <div key={index} className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
                <div className="flex items-start gap-2 mb-2">
                  {selectedAnswers[index] === q.correct ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="text-foreground font-medium mb-2">{q.question}</p>
                    <p className="text-green-200 text-sm mb-2">
                      <strong>Correct answer:</strong> {q.options[q.correct]}
                    </p>
                    {selectedAnswers[index] !== q.correct && selectedAnswers[index] !== null && (
                      <p className="text-red-200 text-sm mb-2">
                        <strong>Your answer:</strong> {q.options[selectedAnswers[index]!]}
                      </p>
                    )}
                    <p className="text-gray-300 text-sm">
                      <strong>Explanation:</strong> {q.explanation}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Button 
              onClick={resetQuiz}
              className="bg-elec-yellow text-elec-dark hover:bg-yellow-400"
            >
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Brain className="h-5 w-5 text-elec-yellow" />
          Quick Quiz
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between items-center text-sm text-foreground">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete</span>
        </div>
        
        <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
          <h3 className="text-foreground font-medium mb-4">{questions[currentQuestion].question}</h3>
          <div className="space-y-2">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                  className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
                    selectedAnswers[currentQuestion] === index
                      ? 'border-elec-yellow bg-yellow-600/20 text-elec-yellow'
                      : 'border-gray-600 text-foreground hover:border-gray-500 hover:bg-gray-800'
                  }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button 
            onClick={nextQuestion}
            disabled={selectedAnswers[currentQuestion] === null}
            className="bg-elec-yellow text-elec-dark hover:bg-yellow-400 disabled:opacity-50"
          >
            {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
