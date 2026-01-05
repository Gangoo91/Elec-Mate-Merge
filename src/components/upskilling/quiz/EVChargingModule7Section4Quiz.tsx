import { CheckCircle, Award, AlertTriangle, FileText, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const quizData: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the minimum retention period for OZEV installation records?",
    options: [
      "5 years",
      "7 years", 
      "10 years",
      "15 years"
    ],
    correctAnswer: 2,
    explanation: "Installation records must be retained for a minimum of 10 years to comply with OZEV requirements."
  },
  {
    id: 2,
    question: "Which backup strategy is recommended for document management systems?",
    options: [
      "Daily backups only",
      "Weekly backups with cloud storage",
      "3-2-1 backup rule implementation", 
      "Monthly physical backups"
    ],
    correctAnswer: 2,
    explanation: "The 3-2-1 backup rule (3 copies, 2 different media, 1 offsite) provides comprehensive data protection."
  },
  {
    id: 3,
    question: "What is the target customer satisfaction score for quality performance monitoring?",
    options: [
      "Greater than 3.5/5",
      "Greater than 4.0/5",
      "Greater than 4.5/5",
      "Greater than 4.8/5"
    ],
    correctAnswer: 2,
    explanation: "A customer satisfaction score greater than 4.5/5 is the target KPI for quality performance monitoring."
  },
  {
    id: 4,
    question: "Under GDPR, what is required when a data subject requests access to their personal data?",
    options: [
      "Response within 72 hours",
      "Response within 1 month",
      "Response within 2 months", 
      "No specific timeframe"
    ],
    correctAnswer: 1,
    explanation: "Under GDPR, data controllers must respond to subject access requests within one month of receipt."
  },
  {
    id: 5,
    question: "What is the Recovery Time Objective (RTO) for critical systems in business continuity planning?",
    options: [
      "2 hours",
      "4 hours",
      "8 hours",
      "24 hours"
    ],
    correctAnswer: 1,
    explanation: "The recommended RTO for critical systems is 4 hours to minimise business disruption during incidents."
  }
];

export const EVChargingModule7Section4Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
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
    setQuizStarted(false);
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === quizData[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  const getScoreColor = (score: number) => {
    const percentage = (score / quizData.length) * 100;
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  if (!quizStarted) {
    return (
      <Card className="bg-elec-gray border-gray-700">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Award className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-foreground">Section 4 Knowledge Check</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-300">
            Test your understanding of record-keeping best practices and audit readiness.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              {quizData.length} Questions
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              ~5 minutes
            </span>
          </div>
          <Button 
            onClick={() => setQuizStarted(true)}
            className="bg-elec-yellow text-elec-dark hover:bg-yellow-600"
          >
            Start Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / quizData.length) * 100);

    return (
      <Card className="bg-elec-gray border-gray-700">
        <CardHeader>
          <div className="flex items-center gap-3">
            <CheckCircle className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-foreground">Quiz Results</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className={`text-4xl font-bold mb-2 ${getScoreColor(score)}`}>
              {score}/{quizData.length}
            </div>
            <div className={`text-xl mb-4 ${getScoreColor(score)}`}>
              {percentage}% Correct
            </div>
            <p className="text-gray-300">
              {percentage >= 80 ? "Excellent work! You have a strong understanding of the material." :
               percentage >= 60 ? "Good job! Review the areas you missed to strengthen your knowledge." :
               "Consider reviewing the material and retaking the quiz to improve your understanding."}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Review Your Answers:</h3>
            {quizData.map((question, index) => (
              <div key={question.id} className="bg-[#323232] p-4 rounded-lg">
                <p className="font-medium text-foreground mb-2">
                  {index + 1}. {question.question}
                </p>
                <div className="space-y-2">
                  <div className={`p-2 rounded ${
                    selectedAnswers[index] === question.correctAnswer 
                      ? 'bg-green-900/30 border border-green-600' 
                      : 'bg-red-900/30 border border-red-600'
                  }`}>
                    <span className="text-sm">
                      Your answer: {question.options[selectedAnswers[index]]}
                    </span>
                  </div>
                  {selectedAnswers[index] !== question.correctAnswer && (
                    <div className="bg-green-900/30 border border-green-600 p-2 rounded">
                      <span className="text-sm">
                        Correct answer: {question.options[question.correctAnswer]}
                      </span>
                    </div>
                  )}
                  <p className="text-sm text-gray-300 mt-2">
                    {question.explanation}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <Button 
              onClick={handleRestart}
              className="bg-elec-yellow text-elec-dark hover:bg-yellow-600"
            >
              Retake Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentQ = quizData[currentQuestion];
  const progress = ((currentQuestion + 1) / quizData.length) * 100;

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Award className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-foreground">
              Question {currentQuestion + 1} of {quizData.length}
            </CardTitle>
          </div>
          <div className="text-sm text-gray-400">
            {Math.round(progress)}% Complete
          </div>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-elec-yellow h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4">
            {currentQ.question}
          </h3>
          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                  selectedAnswers[currentQuestion] === index
                    ? 'border-elec-yellow bg-yellow-900/20 text-foreground'
                    : 'border-gray-600 bg-gray-800/50 text-gray-300 hover:border-gray-500 hover:bg-gray-700/50'
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-sm ${
                    selectedAnswers[currentQuestion] === index
                      ? 'border-elec-yellow bg-elec-yellow text-elec-dark'
                      : 'border-gray-500'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-800 disabled:opacity-50"
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={selectedAnswers[currentQuestion] === undefined}
            className="bg-elec-yellow text-elec-dark hover:bg-yellow-600 disabled:opacity-50"
          >
            {currentQuestion === quizData.length - 1 ? 'View Results' : 'Next'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};