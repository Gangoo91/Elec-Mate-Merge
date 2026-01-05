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
    question: "What is the most significant environmental hazard when conducting electrical testing?",
    options: [
      "Excessive noise from machinery",
      "Poor lighting conditions",
      "Moisture and wet surfaces",
      "Dust accumulation"
    ],
    correctAnswer: 2,
    explanation: "Moisture creates conductive paths that can bypass safety measures, significantly increasing the risk of electric shock and potentially causing equipment damage during testing procedures."
  },
  {
    id: 2,
    question: "When should electrical testing be postponed due to environmental conditions?",
    options: [
      "When temperature exceeds 25°C",
      "When there's any moisture present in the work area",
      "When noise levels exceed 80dB",
      "When working in artificial lighting"
    ],
    correctAnswer: 1,
    explanation: "Any moisture in electrical work areas creates serious safety risks. Testing should be postponed until conditions are completely dry to ensure safe working practices."
  },
  {
    id: 3,
    question: "What is the primary risk of testing in poorly ventilated spaces?",
    options: [
      "Equipment overheating",
      "Reduced test accuracy",
      "Accumulation of hazardous gases and reduced oxygen",
      "Increased humidity affecting readings"
    ],
    correctAnswer: 2,
    explanation: "Poor ventilation in confined spaces can lead to dangerous accumulation of gases, reduced oxygen levels, and impaired decision-making, creating serious health risks for workers."
  },
  {
    id: 4,
    question: "What should be done before testing in areas with obstructed access to distribution boards?",
    options: [
      "Use longer test leads",
      "Clear access routes and ensure adequate workspace",
      "Work from available positions only",
      "Request assistance from building occupants"
    ],
    correctAnswer: 1,
    explanation: "Clear access routes are essential for safety. Obstructions prevent proper visual inspection, force uncomfortable positions that increase error risk, and restrict emergency evacuation routes."
  },
  {
    id: 5,
    question: "How can interference from other trades during testing be prevented?",
    options: [
      "Work only during off-hours",
      "Use warning signs and establish communication protocols",
      "Complete testing as quickly as possible",
      "Work only on isolated circuits"
    ],
    correctAnswer: 1,
    explanation: "Proper communication protocols, warning signage, and coordination with other trades prevents unexpected re-energisation of circuits during testing, which is a major safety hazard."
  },
  {
    id: 6,
    question: "What is the most important factor when assessing temperature extremes for electrical testing?",
    options: [
      "Personal comfort levels",
      "Equipment operating specifications and worker safety",
      "Building occupant preferences",
      "Time of day considerations"
    ],
    correctAnswer: 1,
    explanation: "Test equipment has specified operating temperature ranges, and extreme temperatures can affect accuracy and worker performance, making this assessment critical for reliable results."
  },
  {
    id: 7,
    question: "When working at height during electrical testing, what is the primary safety requirement?",
    options: [
      "Use the quickest access method available",
      "Ensure access equipment is inspected, stable, and appropriate",
      "Always use a harness system",
      "Have a colleague present at all times"
    ],
    correctAnswer: 1,
    explanation: "All access equipment must be properly inspected, positioned correctly, and suitable for the specific task and environment to prevent falls, which are among the most serious workplace accidents."
  },
  {
    id: 8,
    question: "What should be done if poor circuit identification is discovered during site assessment?",
    options: [
      "Proceed with testing using best judgment",
      "Test all circuits to identify them",
      "Stop work until proper identification is established",
      "Use only low-voltage testing methods"
    ],
    correctAnswer: 2,
    explanation: "Poor circuit identification creates serious safety risks including testing wrong circuits, incomplete isolation, and potential equipment damage. Work should not proceed until proper identification is established."
  },
  {
    id: 9,
    question: "What is the recommended approach for managing trip and slip hazards during testing?",
    options: [
      "Accept them as unavoidable",
      "Work around them carefully",
      "Use proper lead management and maintain clear pathways",
      "Complete testing quickly to minimise exposure"
    ],
    correctAnswer: 2,
    explanation: "Active management through proper lead positioning, cable protectors, equipment securing, and maintaining clear pathways prevents accidents and protects both personnel and equipment."
  },
  {
    id: 10,
    question: "When should environmental conditions be reassessed during electrical testing work?",
    options: [
      "Only at the start of each day",
      "Continuously throughout the testing process",
      "When specifically requested by site management",
      "Only if problems are reported"
    ],
    correctAnswer: 1,
    explanation: "Site conditions can change rapidly due to weather, other work activities, or equipment failures. Continuous reassessment ensures immediate response to changing hazards and maintains safe working conditions."
  }
];

const Module2Section6Quiz = () => {
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
    if (percentage >= 80) return 'Excellent! You have a strong understanding of environmental and site-specific hazards.';
    if (percentage >= 60) return 'Good work! Review the areas you missed to strengthen your hazard recognition skills.';
    return 'Consider reviewing the material again to improve your understanding of site safety assessment.';
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
          <div className="text-xl text-gray-300">
            Score: <span className={getScoreColor(percentage)}>{percentage.toFixed(0)}%</span>
          </div>
          <p className="text-gray-300 max-w-md mx-auto">
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
        <div className="flex justify-between text-sm text-gray-400">
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
                buttonClass += "border-gray-600 bg-elec-gray text-gray-400";
              }
            } else {
              if (selectedAnswer === index) {
                buttonClass += "border-elec-yellow bg-yellow-600/20 text-foreground";
              } else {
                buttonClass += "border-gray-600 bg-elec-gray text-gray-300 hover:border-gray-500 hover:bg-[#323232]";
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
        <div className="text-sm text-gray-400">
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

export default Module2Section6Quiz;