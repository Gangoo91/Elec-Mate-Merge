
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Which regulation places a legal duty on employers to maintain electrical systems?",
    options: [
      "Building Regulations Part P",
      "BS 7671",
      "Electricity at Work Regulations 1989",
      "Management of Health and Safety at Work Regulations 1999"
    ],
    correctAnswer: 2,
    explanation: "The Electricity at Work Regulations 1989 place a legal duty on employers to ensure electrical systems are maintained so as to prevent danger. This is a statutory requirement with legal backing."
  },
  {
    id: 2,
    question: "What does Building Regulations Part P primarily cover?",
    options: [
      "All electrical work in domestic properties",
      "Electrical safety in design of electrical installations in dwellings",
      "Commercial electrical installations only",
      "Portable appliance testing requirements"
    ],
    correctAnswer: 1,
    explanation: "Building Regulations Part P covers electrical safety in the design and installation of electrical installations in dwellings, ensuring they are designed and installed safely."
  },
  {
    id: 3,
    question: "Under the Electricity at Work Regulations, who is responsible for electrical safety?",
    options: [
      "Only qualified electricians",
      "Building control officers",
      "Duty holders (employers, employees, self-employed)",
      "Insurance companies"
    ],
    correctAnswer: 2,
    explanation: "The Electricity at Work Regulations place duties on all duty holders including employers, employees, and self-employed persons. Everyone has responsibilities for electrical safety."
  },
  {
    id: 4,
    question: "What is the primary purpose of BS 7671?",
    options: [
      "To provide legal requirements for electrical work",
      "To provide technical standards for electrical installations",
      "To replace the Electricity at Work Regulations",
      "To define insurance requirements"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 provides the technical standards and requirements for electrical installations. Whilst not law itself, it's recognised as the standard of good practice and compliance with it can demonstrate due diligence."
  },
  {
    id: 5,
    question: "What happens if electrical work doesn't comply with Building Regulations Part P?",
    options: [
      "Nothing, as it's only guidance",
      "The work may need to be redone and certified properly",
      "Only the electrician is liable",
      "Insurance automatically covers any issues"
    ],
    correctAnswer: 1,
    explanation: "Non-compliance with Building Regulations Part P can result in enforcement action, requirements to remedy the work, and potential legal consequences. Proper certification and compliance are essential."
  }
];

const LegalFrameworkQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
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
    setQuizCompleted(false);
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === quizQuestions[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  const getScoreMessage = (score: number) => {
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage >= 80) return "Excellent! You have a strong understanding of the legal and regulatory framework.";
    if (percentage >= 60) return "Good work! You have a solid grasp of the legal requirements with room for improvement.";
    if (percentage >= 40) return "Fair effort. Consider reviewing the legal framework material to strengthen your understanding.";
    return "You may need to review the legal and regulatory content more thoroughly.";
  };

  if (showResults) {
    const score = calculateScore();
    return (
      <div className="space-y-6">
        <Card className="bg-[#323232] border-transparent">
          <CardHeader>
            <CardTitle className="text-foreground text-center">Quiz Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-elec-yellow mb-2">
                {score} / {quizQuestions.length}
              </div>
              <div className="text-gray-300 mb-4">
                {getScoreMessage(score)}
              </div>
            </div>
            
            <div className="space-y-4">
              {quizQuestions.map((question, index) => {
                const userAnswer = selectedAnswers[index];
                const isCorrect = userAnswer === question.correctAnswer;
                
                return (
                  <Card key={question.id} className="bg-elec-gray border-transparent">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3 mb-3">
                        {isCorrect ? (
                          <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <p className="text-foreground font-medium text-sm mb-2">
                            {question.question}
                          </p>
                          <p className="text-gray-300 text-xs mb-2">
                            <strong>Your answer:</strong> {question.options[userAnswer]}
                          </p>
                          {!isCorrect && (
                            <p className="text-gray-300 text-xs mb-2">
                              <strong>Correct answer:</strong> {question.options[question.correctAnswer]}
                            </p>
                          )}
                          <p className="text-gray-400 text-xs">
                            <strong>Explanation:</strong> {question.explanation}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            
            <div className="text-center pt-4">
              <Button 
                onClick={handleRestart}
                className="bg-elec-yellow text-black hover:bg-yellow-400"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Retake Quiz
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div 
          className="bg-elec-yellow h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      {/* Question Counter */}
      <div className="text-center text-gray-400 text-sm">
        Question {currentQuestion + 1} of {quizQuestions.length}
      </div>

      {/* Question Card */}
      <Card className="bg-[#323232] border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground text-lg">
            {question.question}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                selectedAnswers[currentQuestion] === index
                  ? 'border-elec-yellow bg-yellow-600/20 text-foreground'
                  : 'border-gray-600 bg-elec-gray text-gray-300 hover:border-gray-500 hover:bg-[#323232]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  selectedAnswers[currentQuestion] === index
                    ? 'border-elec-yellow bg-elec-yellow'
                    : 'border-gray-600'
                }`}>
                  {selectedAnswers[currentQuestion] === index && (
                    <div className="w-2 h-2 rounded-full bg-black"></div>
                  )}
                </div>
                <span className="text-sm">{option}</span>
              </div>
            </button>
          ))}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          variant="outline"
          className="border-gray-600 text-gray-300 hover:bg-[#323232] hover:text-foreground disabled:opacity-50"
        >
          Previous
        </Button>
        
        <Button
          onClick={handleNext}
          disabled={selectedAnswers[currentQuestion] === undefined}
          className="bg-elec-yellow text-black hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {currentQuestion === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

export default LegalFrameworkQuiz;
