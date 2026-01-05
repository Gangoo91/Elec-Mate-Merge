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
    question: "What does OZEV stand for?",
    options: [
      "Office for Zero Emission Vehicles",
      "Organisation for Zero Energy Vehicles", 
      "Office for Zero Energy Ventures",
      "Organisation for Zero Emission Ventures"
    ],
    correctAnswer: 0,
    explanation: "OZEV stands for Office for Zero Emission Vehicles, which is the government body responsible for supporting the transition to zero emission vehicles through various grant schemes and initiatives."
  },
  {
    id: 2,
    question: "What is the maximum grant available per socket under the Workplace Charging Scheme?",
    options: [
      "£250",
      "£300",
      "£350", 
      "£400"
    ],
    correctAnswer: 2,
    explanation: "The Workplace Charging Scheme provides up to £350 per socket to help with the upfront costs of purchasing and installing EV charge points for eligible organisations."
  },
  {
    id: 3,
    question: "How many sockets can an organisation claim for under the WCS?",
    options: [
      "20 sockets maximum",
      "30 sockets maximum",
      "40 sockets maximum",
      "50 sockets maximum"
    ],
    correctAnswer: 2,
    explanation: "Under the Workplace Charging Scheme, organisations can claim grants for a maximum of 40 sockets per applicant, providing significant support for larger charging installations."
  },
  {
    id: 4,
    question: "What percentage of total costs does the WCS typically cover?",
    options: [
      "Up to 50%",
      "Up to 65%",
      "Up to 75%",
      "Up to 85%"
    ],
    correctAnswer: 2,
    explanation: "The Workplace Charging Scheme covers up to 75% of the total costs of purchasing and installing charge points, making EV infrastructure more affordable for businesses."
  },
  {
    id: 5,
    question: "Who can install charge points under OZEV grant schemes?",
    options: [
      "Any qualified electrician",
      "Only OZEV approved installers",
      "Any EV charging specialist",
      "Licensed electrical contractors only"
    ],
    correctAnswer: 1,
    explanation: "Only OZEV approved installers can carry out installations under grant schemes. This ensures quality standards are maintained and proper procedures are followed for grant-funded projects."
  },
  {
    id: 6,
    question: "Which organisations are typically eligible for the Workplace Charging Scheme?",
    options: [
      "Private businesses only",
      "Public sector organisations only",
      "Charities only",
      "Businesses, charities, and public sector organisations"
    ],
    correctAnswer: 3,
    explanation: "The Workplace Charging Scheme is available to a wide range of UK-based organisations including businesses, charities, and public sector organisations that meet the eligibility criteria."
  },
  {
    id: 7,
    question: "What is a key requirement for WCS eligibility regarding parking?",
    options: [
      "Shared parking spaces",
      "Dedicated parking spaces",
      "Visitor parking only",
      "Street parking access"
    ],
    correctAnswer: 1,
    explanation: "Organisations must have dedicated parking spaces for their staff or fleet vehicles to be eligible for the Workplace Charging Scheme, ensuring the charge points serve their intended purpose."
  },
  {
    id: 8,
    question: "In the WCS application process, what happens after OZEV approval?",
    options: [
      "Immediate payment is made",
      "Installation must be completed within 6 months",
      "Installation proceeds with approved installer",
      "Another application round begins"
    ],
    correctAnswer: 2,
    explanation: "Once the WCS application is approved, the organisation can proceed with installation using an OZEV approved installer, followed by submitting evidence for reimbursement."
  },
  {
    id: 9,
    question: "What documentation is typically required for a WCS application?",
    options: [
      "Business registration only",
      "Proof of parking and site details",
      "Financial statements only",
      "Employee vehicle survey only"
    ],
    correctAnswer: 1,
    explanation: "WCS applications require comprehensive documentation including proof of dedicated parking spaces, site details, and evidence that the organisation meets eligibility criteria."
  },
  {
    id: 10,
    question: "What should installers check regarding WCS before making applications?",
    options: [
      "Local planning permissions",
      "Customer credit rating",
      "Latest OZEV guidance and scheme status",
      "Competitor pricing"
    ],
    correctAnswer: 2,
    explanation: "The WCS is subject to review and changes, so installers should always check the latest OZEV guidance and scheme status before making applications to ensure current requirements are met."
  }
];

export const EVChargingModule7Section1Quiz = () => {
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
            Section Quiz: OZEV and Workplace Charging Scheme
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-4">
          <p>Test your knowledge of OZEV grants and the Workplace Charging Scheme with this 10-question quiz.</p>
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