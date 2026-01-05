import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
    question: "What is the primary benefit of becoming an OZEV approved installer?",
    options: [
      "Higher hourly rates",
      "Access to grant-funded projects",
      "Exemption from building regulations",
      "Guaranteed work allocation"
    ],
    correctAnswer: 1,
    explanation: "The primary benefit of OZEV approval is access to grant-funded projects, which significantly expands market opportunities and provides access to customers who can benefit from government funding."
  },
  {
    id: 2,
    question: "Which qualification is essential for OZEV installer approval?",
    options: [
      "City & Guilds Level 2",
      "HNC in Electrical Engineering",
      "18th Edition Wiring Regulations (BS 7671)",
      "Degree in Electrical Engineering"
    ],
    correctAnswer: 2,
    explanation: "The 18th Edition Wiring Regulations (BS 7671) is essential for OZEV approval as it ensures installers understand current electrical safety requirements and installation standards."
  },
  {
    id: 3,
    question: "What type of business registration is typically required for OZEV approval?",
    options: [
      "Limited company registration only",
      "Sole trader registration",
      "Valid electrical contractor registration",
      "Charity registration"
    ],
    correctAnswer: 2,
    explanation: "Valid electrical contractor registration with an appropriate trade body is required to demonstrate professional standing and competency in electrical installation work."
  },
  {
    id: 4,
    question: "How long does the typical OZEV approval process take?",
    options: [
      "2-4 weeks",
      "4-6 weeks",
      "6-12 weeks",
      "3-6 months"
    ],
    correctAnswer: 2,
    explanation: "The OZEV approval process typically takes 6-12 weeks, depending on the completeness of the application and the time required for document review and assessment."
  },
  {
    id: 5,
    question: "What happens if an OZEV approved installer fails to maintain standards?",
    options: [
      "Warning letter only",
      "Temporary suspension",
      "Approval may be revoked",
      "Financial penalty"
    ],
    correctAnswer: 2,
    explanation: "OZEV approval may be revoked if installers fail to maintain required standards, comply with obligations, or meet ongoing requirements, as this protects the integrity of grant schemes."
  },
  {
    id: 6,
    question: "What type of insurance is typically required for OZEV approval?",
    options: [
      "Public liability only",
      "Professional indemnity only",
      "Product liability only",
      "Comprehensive coverage including EV work"
    ],
    correctAnswer: 3,
    explanation: "Comprehensive insurance coverage that specifically includes EV charging installation work is required to protect both the installer and customers from potential risks and liabilities."
  },
  {
    id: 7,
    question: "Which document must approved installers submit after each installation?",
    options: [
      "Customer satisfaction survey",
      "Installation report with compliance certification",
      "Financial invoice only",
      "Marketing brochure"
    ],
    correctAnswer: 1,
    explanation: "Approved installers must submit detailed installation reports with compliance certification to demonstrate that work meets OZEV standards and grant scheme requirements."
  },
  {
    id: 8,
    question: "What is required regarding ongoing professional development?",
    options: [
      "Annual conference attendance",
      "University qualification updates",
      "Commitment to continuing professional development",
      "Membership renewal only"
    ],
    correctAnswer: 2,
    explanation: "OZEV requires a commitment to continuing professional development to ensure approved installers stay current with evolving technologies, regulations, and best practices."
  },
  {
    id: 9,
    question: "How often might OZEV conduct audits of approved installers?",
    options: [
      "Weekly",
      "Monthly",
      "Annually",
      "As required for compliance monitoring"
    ],
    correctAnswer: 3,
    explanation: "OZEV conducts audits as required for compliance monitoring, which may be triggered by customer complaints, quality issues, or routine compliance checks to maintain standards."
  },
  {
    id: 10,
    question: "What should an installer do if their business circumstances change?",
    options: [
      "Wait for the next audit",
      "Report changes to OZEV promptly",
      "Update their website only",
      "Inform customers only"
    ],
    correctAnswer: 1,
    explanation: "Approved installers must report any changes to their business circumstances promptly to OZEV to ensure their approval status remains valid and compliant with current requirements."
  }
];

export const EVChargingModule7Section2Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(new Array(quizQuestions.length).fill(-1));
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
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
    setSelectedAnswers(new Array(quizQuestions.length).fill(-1));
    setShowResults(false);
    setQuizStarted(false);
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === quizQuestions[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-400";
    if (score >= 6) return "text-yellow-400";
    return "text-red-400";
  };

  if (!quizStarted) {
    return (
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-elec-yellow" />
            Section Quiz: Approved Installer Registration Process
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-4">
          <p>Test your knowledge of the OZEV approved installer registration process with this 10-question quiz.</p>
          <div className="flex justify-center">
            <Button 
              onClick={() => setQuizStarted(true)}
              className="bg-elec-yellow text-elec-dark hover:bg-yellow-600"
            >
              Start Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (showResults) {
    const score = calculateScore();
    return (
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-elec-yellow" />
            Quiz Results
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className={`text-4xl font-bold ${getScoreColor(score)}`}>
              {score}/{quizQuestions.length}
            </div>
            <p className="text-gray-300 mt-2">
              {score >= 8 ? "Excellent work!" : score >= 6 ? "Good effort!" : "Review the material and try again."}
            </p>
          </div>

          <div className="space-y-4">
            {quizQuestions.map((question, index) => {
              const userAnswer = selectedAnswers[index];
              const isCorrect = userAnswer === question.correctAnswer;
              
              return (
                <div key={question.id} className="bg-elec-dark p-4 rounded-lg border border-gray-600">
                  <div className="flex items-start gap-2 mb-2">
                    {isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="text-foreground font-medium text-sm">{question.question}</p>
                      <p className="text-gray-300 text-sm mt-1">
                        Your answer: {question.options[userAnswer]}
                      </p>
                      {!isCorrect && (
                        <p className="text-green-400 text-sm">
                          Correct answer: {question.options[question.correctAnswer]}
                        </p>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm ml-7">{question.explanation}</p>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center">
            <Button 
              onClick={handleRestart}
              variant="outline" 
              className="border-gray-600 text-gray-300 hover:bg-elec-gray"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Retake Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentQ = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-foreground">Section Quiz</CardTitle>
          <Badge variant="outline" className="border-gray-600 text-gray-300">
            {currentQuestion + 1} of {quizQuestions.length}
          </Badge>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-2 mt-4">
          <div 
            className="bg-elec-yellow h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <h3 className="text-foreground text-lg font-medium mb-4">{currentQ.question}</h3>
          
          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                  selectedAnswers[currentQuestion] === index
                    ? 'border-elec-yellow bg-yellow-600/20 text-foreground'
                    : 'border-gray-600 bg-elec-dark text-gray-300 hover:border-gray-500 hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-bold ${
                    selectedAnswers[currentQuestion] === index
                      ? 'border-elec-yellow bg-elec-yellow text-elec-dark'
                      : 'border-gray-600 text-gray-400'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="text-sm">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-elec-gray disabled:opacity-50"
          >
            Previous
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={selectedAnswers[currentQuestion] === -1}
            className="bg-elec-yellow text-elec-dark hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentQuestion === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};