import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "What does a C1 defect classification indicate?",
    options: [
      "Improvement recommended for better compliance",
      "Danger present - risk of injury exists",
      "Potentially dangerous - urgent remedial action required",
      "Further investigation required"
    ],
    correctAnswer: 1,
    explanation: "C1 classification means 'Danger Present' - there is an immediate risk of injury and remedial action must be taken without delay to prevent harm."
  },
  {
    id: 2,
    question: "Which of the following would typically be classified as a C2 defect?",
    options: [
      "Missing circuit labels in a distribution board",
      "Exposed live parts accessible to touch",
      "Missing RCD protection on bathroom circuits",
      "Absence of electrical installation certificate"
    ],
    correctAnswer: 2,
    explanation: "Missing RCD protection on bathroom circuits is C2 (potentially dangerous) as it creates a serious shock risk if a fault occurs, requiring urgent remedial action."
  },
  {
    id: 3,
    question: "What should you do immediately upon discovering a C1 defect?",
    options: [
      "Complete the full inspection then address all defects",
      "Make the defect safe and stop further work until rectified",
      "Note it for the report and continue with testing",
      "Photograph it and advise the client by phone later"
    ],
    correctAnswer: 1,
    explanation: "C1 defects present immediate danger. Work must stop and the defect made safe immediately to prevent injury. No further work should proceed until the danger is eliminated."
  },
  {
    id: 4,
    question: "Which area of an electrical installation commonly contains the most serious defects?",
    options: [
      "Lighting circuits only",
      "Socket outlet circuits",
      "Consumer units and distribution boards",
      "Cable support systems"
    ],
    correctAnswer: 2,
    explanation: "Consumer units and distribution boards are common sources of serious defects as they contain live parts, protective devices, and critical earthing connections that can pose immediate dangers if faulty."
  },
  {
    id: 5,
    question: "What is the main safety concern with damaged cable insulation?",
    options: [
      "Reduced energy efficiency",
      "Exposed conductors creating shock and fire risks",
      "Poor circuit performance",
      "Increased maintenance requirements"
    ],
    correctAnswer: 1,
    explanation: "Damaged cable insulation exposes live conductors, creating immediate risks of electric shock to anyone who touches them and potential fire hazards from arcing or short circuits."
  },
  {
    id: 6,
    question: "In bathroom installations, what would be considered a C1 defect?",
    options: [
      "Missing warning labels on switches",
      "Socket outlets installed within zones 1 or 2",
      "Inadequate IP rating for zone 3 equipment",
      "Missing circuit identification schedule"
    ],
    correctAnswer: 1,
    explanation: "Socket outlets in bathroom zones 1 or 2 present immediate shock danger due to the combination of water and electricity, making this a C1 defect requiring immediate action."
  },
  {
    id: 7,
    question: "What does evidence of overheating at electrical connections typically indicate?",
    options: [
      "Normal operation under load",
      "Loose connections creating high resistance and fire risk",
      "Proper circuit protection operation",
      "Recent maintenance activity"
    ],
    correctAnswer: 1,
    explanation: "Overheating evidence (burn marks, discolouration) typically indicates loose connections creating high resistance, leading to dangerous heating that can cause fires."
  },
  {
    id: 8,
    question: "When should the FI (Further Investigation) classification be used?",
    options: [
      "For all minor defects found",
      "When defects are in inaccessible areas requiring specialist access",
      "For any non-compliance with current standards",
      "When the inspector is unsure about safety implications"
    ],
    correctAnswer: 1,
    explanation: "FI classification is used when defects are suspected but cannot be properly assessed due to access limitations, requiring specialist access or detailed investigation to determine if defects exist."
  },
  {
    id: 9,
    question: "What is the primary purpose of taking photographs during defect identification?",
    options: [
      "To create a complete installation record",
      "To replace written defect descriptions",
      "To provide supporting evidence for documented defects",
      "To show clients their electrical systems"
    ],
    correctAnswer: 2,
    explanation: "Photographs should support and provide evidence for documented defects, particularly for complex issues or to help explain the nature and location of problems to clients and contractors."
  },
  {
    id: 10,
    question: "Which factor is most important when classifying the severity of electrical defects?",
    options: [
      "Age of the installation",
      "Cost of remedial work required",
      "Immediate risk to safety and potential for injury",
      "Compliance with the latest standards"
    ],
    correctAnswer: 2,
    explanation: "The immediate risk to safety and potential for injury is the primary factor in defect classification. This determines whether immediate action (C1), urgent action (C2), or improvement (C3) is required."
  }
];

const Module3Section2Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | undefined>(undefined);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return;
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer === undefined) return;

    if (!showExplanation) {
      setShowExplanation(true);
      const newUserAnswers = [...userAnswers];
      newUserAnswers[currentQuestion] = selectedAnswer;
      setUserAnswers(newUserAnswers);

      if (selectedAnswer === questions[currentQuestion].correctAnswer) {
        setScore(score + 1);
      }
    } else {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(undefined);
        setShowExplanation(false);
      } else {
        setQuizComplete(true);
      }
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(undefined);
    setShowExplanation(false);
    setScore(0);
    setQuizComplete(false);
    setUserAnswers([]);
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreMessage = (percentage: number) => {
    if (percentage >= 80) return 'Excellent! You have a strong understanding of visual defect identification and classification.';
    if (percentage >= 60) return 'Good work! Review the areas you missed to strengthen your defect recognition skills.';
    return 'Consider reviewing the material again to improve your understanding of common electrical defects.';
  };

  if (quizComplete) {
    const percentage = (score / questions.length) * 100;
    
    return (
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground text-center">Quiz Complete!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="text-4xl font-bold">
            <span className={getScoreColor(percentage)}>
              {score}/{questions.length}
            </span>
          </div>
          <div className="text-xl text-foreground">
            Score: <span className={getScoreColor(percentage)}>{percentage.toFixed(0)}%</span>
          </div>
          <p className="text-foreground max-w-md mx-auto">
            {getScoreMessage(percentage)}
          </p>
          <Button 
            onClick={resetQuiz}
            className="bg-elec-yellow text-black hover:bg-yellow-400"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Retake Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-foreground">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-elec-yellow h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground text-lg">
            {currentQ.question}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {currentQ.options.map((option, index) => {
            let buttonClass = "w-full text-left p-4 rounded-lg border transition-all duration-200 ";
            
            if (showExplanation) {
              if (index === currentQ.correctAnswer) {
                buttonClass += "border-green-500 bg-green-500/20 text-foreground";
              } else if (index === selectedAnswer && index !== currentQ.correctAnswer) {
                buttonClass += "border-red-500 bg-red-500/20 text-foreground";
              } else {
                buttonClass += "border-gray-600 bg-elec-gray text-foreground";
              }
            } else {
              if (selectedAnswer === index) {
                buttonClass += "border-elec-yellow bg-yellow-600/20 text-foreground";
              } else {
                buttonClass += "border-gray-600 bg-elec-gray text-foreground hover:border-gray-500 hover:bg-[#323232]";
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={buttonClass}
                disabled={showExplanation}
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-6 h-6">
                    {showExplanation && index === currentQ.correctAnswer && (
                      <CheckCircle2 className="h-5 w-5 text-green-400" />
                    )}
                    {showExplanation && index === selectedAnswer && index !== currentQ.correctAnswer && (
                      <XCircle className="h-5 w-5 text-red-400" />
                    )}
                    {!showExplanation && (
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        selectedAnswer === index
                          ? 'border-elec-yellow bg-elec-yellow'
                          : 'border-gray-600'
                      }`}>
                        {selectedAnswer === index && (
                          <div className="w-2 h-2 rounded-full bg-black"></div>
                        )}
                      </div>
                    )}
                  </div>
                  <span className="text-sm">{option}</span>
                </div>
              </button>
            );
          })}
        </CardContent>
      </Card>

      {/* Explanation */}
      {showExplanation && (
        <Card className="bg-blue-900/20 border border-blue-600/30">
          <CardContent className="pt-6">
            <p className="text-blue-200 text-sm leading-relaxed">
              <strong>Explanation:</strong> {currentQ.explanation}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <div className="text-sm text-foreground">
          Score: {score}/{currentQuestion + (showExplanation ? 1 : 0)}
        </div>
        <Button
          onClick={handleNext}
          disabled={selectedAnswer === undefined}
          className="bg-elec-yellow text-black hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {!showExplanation ? 'Submit Answer' : 
           currentQuestion === questions.length - 1 ? 'Complete Quiz' : 'Next Question'}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Module3Section2Quiz;