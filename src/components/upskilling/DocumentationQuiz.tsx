
import { useState } from 'react';
import { HelpCircle, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const DocumentationQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([]);

  const questions = [
    {
      question: "Which document is legally required to be retained for the life of the electrical installation?",
      options: [
        "Periodic inspection report",
        "Electrical Installation Certificate", 
        "Minor works certificate",
        "Risk assessment"
      ],
      correct: 1,
      explanation: "BS 7671 requires Electrical Installation Certificates to be retained for the life of the installation as they provide essential design and compliance information."
    },
    {
      question: "What should you do if critical design documentation is missing before visual inspection?",
      options: [
        "Proceed anyway and note limitations",
        "Refuse to carry out the inspection",
        "Create as-built drawings during inspection",
        "Both A and C are correct approaches"
      ],
      correct: 3,
      explanation: "You can proceed but must clearly document limitations and may need to create as-built drawings, significantly increasing inspection time."
    },
    {
      question: "According to BS 7671, what information must be provided to enable proper inspection?",
      options: [
        "Only the circuit schedules",
        "Just the protective device ratings",
        "Diagrams, charts or tables showing circuit composition",
        "Only previous test certificates"
      ],
      correct: 2,
      explanation: "BS 7671 Regulation 514.9.1 requires diagrams, charts, or tables showing the type and composition of circuits, protective devices, and their characteristics."
    },
    {
      question: "What information should building plans show for electrical inspection purposes?",
      options: [
        "Only room dimensions",
        "Socket outlet and lighting positions plus routing",
        "Just structural elements", 
        "Colour schemes only"
      ],
      correct: 1,
      explanation: "Building plans for electrical inspection should show socket outlets, lighting positions, and cable routing to enable proper verification of the installation."
    },
    {
      question: "When is it acceptable to inspect without any documentation?",
      options: [
        "Always acceptable if you're experienced",
        "Never - some documentation is always required",
        "Only for simple domestic properties",
        "When creating as-built drawings during inspection"
      ],
      correct: 3,
      explanation: "While some documentation is always preferable, you may proceed with creating as-built drawings during inspection, but this must be clearly noted as a limitation."
    },
    {
      question: "What is the minimum information required on circuit charts according to BS 7671?",
      options: [
        "Circuit number only",
        "Circuit designation, protective device type and rating",
        "Just the cable type",
        "Only the final circuit length"
      ],
      correct: 1,
      explanation: "BS 7671 requires circuit charts to show circuit designation, protective device type and rating, plus other essential information for proper identification and safety."
    },
    {
      question: "How long must Minor Works Certificates be retained?",
      options: [
        "6 months",
        "2 years", 
        "Life of the installation",
        "Until next inspection"
      ],
      correct: 2,
      explanation: "Minor Works Certificates must be retained for 2 years as they document important changes and additions to the electrical installation."
    },
    {
      question: "What should be done if as-built drawings differ significantly from design drawings?",
      options: [
        "Use the design drawings anyway",
        "Create new as-built drawings during inspection",
        "Estimate the differences",
        "Skip the visual inspection"
      ],
      correct: 1,
      explanation: "If as-built drawings differ significantly from design drawings, new as-built drawings should be created during inspection to ensure accurate documentation."
    },
    {
      question: "Which regulation covers the provision of diagrams and documentation?",
      options: [
        "Regulation 514.9.1",
        "Regulation 611.3",
        "Regulation 132.13",
        "Regulation 421.1.7"
      ],
      correct: 0,
      explanation: "Regulation 514.9.1 specifically covers the provision of diagrams, charts, and tables for electrical installations."
    },
    {
      question: "What must be included on protective device schedules?",
      options: [
        "Device rating only",
        "Device type, rating, and circuit protected",
        "Just the manufacturer name",
        "Only the installation date"
      ],
      correct: 1,
      explanation: "Protective device schedules must include device type, rating, and the circuit protected to ensure proper identification and maintenance."
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    const newAnsweredQuestions = [...answeredQuestions];
    newAnsweredQuestions[currentQuestion] = true;
    setAnsweredQuestions(newAnsweredQuestions);
    
    if (selectedAnswer === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions([]);
  };

  const isQuizComplete = answeredQuestions.length === questions.length && answeredQuestions.every(Boolean);

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-foreground">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-elec-yellow" />
            Quick Knowledge Check
          </div>
          <span className="text-sm text-foreground">
            {currentQuestion + 1} of {questions.length}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isQuizComplete ? (
          <>
            <div className="space-y-4">
              <h3 className="text-foreground font-medium">
                {questions[currentQuestion].question}
              </h3>
              <div className="space-y-2">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showResult}
                    className={`w-full p-3 text-left rounded-lg border transition-colors ${
                      selectedAnswer === index
                        ? showResult
                          ? index === questions[currentQuestion].correct
                            ? 'bg-green-600/20 border-green-600/40 text-green-200'
                            : 'bg-red-600/20 border-red-600/40 text-red-200'
                          : 'bg-elec-yellow/20 border-elec-yellow/40 text-foreground'
                        : showResult && index === questions[currentQuestion].correct
                        ? 'bg-green-600/20 border-green-600/40 text-green-200'
                        : 'bg-[#323232] border-gray-600 text-foreground hover:border-gray-500'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {showResult && (
                        <>
                          {index === questions[currentQuestion].correct ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : selectedAnswer === index ? (
                            <XCircle className="h-4 w-4 text-red-500" />
                          ) : null}
                        </>
                      )}
                      {option}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {showResult && (
              <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
                <p className="text-blue-200 font-medium mb-2">Explanation:</p>
                <p className="text-foreground text-sm">
                  {questions[currentQuestion].explanation}
                </p>
              </div>
            )}

            <div className="flex gap-2">
              {!showResult ? (
                <Button
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswer === null}
                  className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
                >
                  Submit Answer
                </Button>
              ) : (
                <Button
                  onClick={handleNextQuestion}
                  className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
                >
                  {currentQuestion < questions.length - 1 ? 'Next Question' : 'Complete Quiz'}
                </Button>
              )}
            </div>
          </>
        ) : (
          <div className="text-center space-y-4">
            <div className="text-2xl font-bold text-foreground">
              Quiz Complete!
            </div>
            <div className="text-lg text-foreground">
              Your Score: {score} out of {questions.length}
            </div>
            <div className="text-sm text-foreground">
              {score === questions.length 
                ? "Excellent! You have a strong understanding of documentation requirements."
                : score >= questions.length * 0.7
                ? "Good work! Review the explanations for questions you missed."
                : "Consider reviewing the material again to strengthen your understanding."
              }
            </div>
            <Button
              onClick={handleRestart}
              variant="outline"
              className="bg-transparent border-elec-yellow text-elec-yellow hover:bg-elec-yellow hover:text-black"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Retake Quiz
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
