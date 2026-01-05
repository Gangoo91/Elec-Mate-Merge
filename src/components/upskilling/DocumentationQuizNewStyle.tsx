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
    question: "Which document is legally required to be retained for the life of the electrical installation?",
    options: [
      "Periodic inspection report",
      "Electrical Installation Certificate", 
      "Minor works certificate",
      "Risk assessment"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 requires Electrical Installation Certificates to be retained for the life of the installation as they provide essential design and compliance information."
  },
  {
    id: 2,
    question: "What should you do if critical design documentation is missing before visual inspection?",
    options: [
      "Proceed anyway and note limitations",
      "Refuse to carry out the inspection",
      "Create as-built drawings during inspection",
      "Both A and C are correct approaches"
    ],
    correctAnswer: 3,
    explanation: "You can proceed but must clearly document limitations and may need to create as-built drawings, significantly increasing inspection time."
  },
  {
    id: 3,
    question: "According to BS 7671, what information must be provided to enable proper inspection?",
    options: [
      "Only the circuit schedules",
      "Just the protective device ratings",
      "Diagrams, charts or tables showing circuit composition",
      "Only previous test certificates"
    ],
    correctAnswer: 2,
    explanation: "BS 7671 Regulation 514.9.1 requires diagrams, charts, or tables showing the type and composition of circuits, protective devices, and their characteristics."
  },
  {
    id: 4,
    question: "What information should building plans show for electrical inspection purposes?",
    options: [
      "Only room dimensions",
      "Socket outlet and lighting positions plus routing",
      "Just structural elements", 
      "Colour schemes only"
    ],
    correctAnswer: 1,
    explanation: "Building plans for electrical inspection should show socket outlets, lighting positions, and cable routing to enable proper verification of the installation."
  },
  {
    id: 5,
    question: "When is it acceptable to inspect without any documentation?",
    options: [
      "Always acceptable if you're experienced",
      "Never - some documentation is always required",
      "Only for simple domestic properties",
      "When creating as-built drawings during inspection"
    ],
    correctAnswer: 3,
    explanation: "While some documentation is always preferable, you may proceed with creating as-built drawings during inspection, but this must be clearly noted as a limitation."
  },
  {
    id: 6,
    question: "What is the minimum information required on circuit charts according to BS 7671?",
    options: [
      "Circuit number only",
      "Circuit designation, protective device type and rating",
      "Just the cable type",
      "Only the final circuit length"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 requires circuit charts to show circuit designation, protective device type and rating, plus other essential information for proper identification and safety."
  },
  {
    id: 7,
    question: "How long must Minor Works Certificates be retained?",
    options: [
      "6 months",
      "2 years", 
      "Life of the installation",
      "Until next inspection"
    ],
    correctAnswer: 2,
    explanation: "Minor Works Certificates must be retained for 2 years as they document important changes and additions to the electrical installation."
  },
  {
    id: 8,
    question: "What should be done if as-built drawings differ significantly from design drawings?",
    options: [
      "Use the design drawings anyway",
      "Create new as-built drawings during inspection",
      "Estimate the differences",
      "Skip the visual inspection"
    ],
    correctAnswer: 1,
    explanation: "If as-built drawings differ significantly from design drawings, new as-built drawings should be created during inspection to ensure accurate documentation."
  },
  {
    id: 9,
    question: "Which regulation covers the provision of diagrams and documentation?",
    options: [
      "Regulation 514.9.1",
      "Regulation 611.3",
      "Regulation 132.13",
      "Regulation 421.1.7"
    ],
    correctAnswer: 0,
    explanation: "Regulation 514.9.1 specifically covers the provision of diagrams, charts, and tables for electrical installations."
  },
  {
    id: 10,
    question: "What must be included on protective device schedules?",
    options: [
      "Device rating only",
      "Device type, rating, and circuit protected",
      "Just the manufacturer name",
      "Only the installation date"
    ],
    correctAnswer: 1,
    explanation: "Protective device schedules must include device type, rating, and the circuit protected to ensure proper identification and maintenance."
  }
];

export const DocumentationQuizNewStyle = () => {
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
    if (percentage >= 80) return 'Excellent! You have a strong understanding of documentation requirements.';
    if (percentage >= 60) return 'Good work! Review the explanations for questions you missed.';
    return 'Consider reviewing the material again to strengthen your understanding.';
  };

  if (quizComplete) {
    const percentage = (score / questions.length) * 100;
    
    return (
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground text-center text-xl sm:text-2xl">Quiz Complete!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="text-4xl sm:text-5xl font-bold">
            <span className={getScoreColor(percentage)}>
              {score}/{questions.length}
            </span>
          </div>
          <div className="text-xl sm:text-2xl text-foreground">
            Score: <span className={getScoreColor(percentage)}>{percentage.toFixed(0)}%</span>
          </div>
          <p className="text-foreground text-base sm:text-lg max-w-md mx-auto leading-relaxed">
            {getScoreMessage(percentage)}
          </p>
          <Button 
            onClick={resetQuiz}
            className="bg-elec-yellow text-black hover:bg-yellow-400 text-base px-6 py-3"
          >
            <RotateCcw className="mr-2 h-5 w-5" />
            Retake Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="space-y-8">
      {/* Progress Bar */}
      <div className="space-y-3">
        <div className="flex justify-between text-sm sm:text-base text-foreground">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div 
            className="bg-elec-yellow h-3 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground text-lg sm:text-xl lg:text-2xl leading-relaxed">
            {currentQ.question}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentQ.options.map((option, index) => {
            let buttonClass = "w-full text-left p-4 sm:p-5 rounded-lg border transition-all duration-200 ";
            
            if (showExplanation) {
              if (index === currentQ.correctAnswer) {
                buttonClass += "border-green-500 bg-green-500/20 text-foreground";
              } else if (index === selectedAnswer && index !== currentQ.correctAnswer) {
                buttonClass += "border-red-500 bg-red-500/20 text-foreground";
              } else {
                buttonClass += "border-gray-600 bg-elec-gray text-gray-200";
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
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-6 h-6">
                    {showExplanation && index === currentQ.correctAnswer && (
                      <CheckCircle2 className="h-6 w-6 text-green-400" />
                    )}
                    {showExplanation && index === selectedAnswer && index !== currentQ.correctAnswer && (
                      <XCircle className="h-6 w-6 text-red-400" />
                    )}
                    {!showExplanation && (
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
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
                  <span className="text-sm sm:text-base leading-relaxed">{option}</span>
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
            <p className="text-blue-200 text-sm sm:text-base leading-relaxed">
              <strong>Explanation:</strong> {currentQ.explanation}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <div className="text-sm sm:text-base text-foreground">
          Score: {score}/{currentQuestion + (showExplanation ? 1 : 0)}
        </div>
        <Button
          onClick={handleNext}
          disabled={selectedAnswer === undefined}
          className="bg-elec-yellow text-black hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed text-base px-6 py-3"
        >
          {!showExplanation ? 'Submit Answer' : 
           currentQuestion === questions.length - 1 ? 'Complete Quiz' : 'Next Question'}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};