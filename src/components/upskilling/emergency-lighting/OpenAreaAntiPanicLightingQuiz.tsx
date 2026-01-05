import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import { useState } from 'react';

export const OpenAreaAntiPanicLightingQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  const questions = [
    {
      question: "At what area size does anti-panic lighting become mandatory?",
      options: ["30m²", "60m²", "100m²", "150m²"],
      correct: "60m²",
      explanation: "BS 5266 requires anti-panic lighting for open areas exceeding 60m² to prevent panic and enable safe movement toward escape routes."
    },
    {
      question: "What is the minimum illuminance level for anti-panic lighting?",
      options: ["0.2 lux", "0.5 lux", "1 lux", "2 lux"],
      correct: "0.5 lux",
      explanation: "Anti-panic lighting must provide a minimum of 0.5 lux at floor level anywhere within the open area to enable safe movement."
    },
    {
      question: "What is the maximum uniformity ratio for anti-panic lighting?",
      options: ["20:1", "40:1", "60:1", "100:1"],
      correct: "40:1",
      explanation: "The uniformity ratio between maximum and minimum illuminance levels must not exceed 40:1, the same as escape route lighting."
    },
    {
      question: "What is the maximum spacing for anti-panic luminaires?",
      options: ["2 x mounting height", "3 x mounting height", "4 x mounting height", "5 x mounting height"],
      correct: "4 x mounting height",
      explanation: "Anti-panic luminaires should be spaced at maximum intervals of 4 times their mounting height to ensure adequate coverage."
    },
    {
      question: "What grid size is typically used for illuminance calculations in large areas?",
      options: ["1m x 1m", "2m x 2m", "3m x 3m", "5m x 5m"],
      correct: "2m x 2m",
      explanation: "A 2m x 2m calculation grid is typically used to verify illuminance levels and uniformity across large open areas."
    },
    {
      question: "Which type of building commonly requires anti-panic lighting?",
      options: ["Small offices", "Domestic homes", "Large retail stores", "Single corridors"],
      correct: "Large retail stores",
      explanation: "Large retail stores with sales floors exceeding 60m² are prime examples of spaces requiring anti-panic lighting provision."
    },
    {
      question: "Can anti-panic lighting be combined with normal lighting?",
      options: ["Never allowed", "Only in emergencies", "Yes, using maintained systems", "Only in small areas"],
      correct: "Yes, using maintained systems",
      explanation: "Maintained emergency luminaires can serve as both normal and emergency lighting, providing cost-effective anti-panic coverage."
    },
    {
      question: "What is the primary purpose of anti-panic lighting?",
      options: ["Illuminate exits only", "Reduce panic and anxiety", "Replace escape lighting", "Provide task lighting"],
      correct: "Reduce panic and anxiety",
      explanation: "Anti-panic lighting is specifically designed to reduce panic and provide general illumination to help occupants move safely toward escape routes."
    },
    {
      question: "Where should luminaires be positioned to avoid shadows in retail areas?",
      options: ["Only at perimeter", "Between shelving aisles", "At ceiling centre only", "Random placement"],
      correct: "Between shelving aisles",
      explanation: "In retail areas with shelving, luminaires should be positioned to avoid shadows and ensure coverage between aisles and around obstacles."
    },
    {
      question: "How does anti-panic lighting relate to escape route lighting?",
      options: ["They are the same thing", "They replace each other", "They complement each other", "They never work together"],
      correct: "They complement each other",
      explanation: "Anti-panic lighting complements escape route lighting by providing area coverage while escape lighting specifically illuminates exit paths."
    }
  ];

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    const isCorrect = selectedAnswer === questions[currentQuestion].correct;
    const newAnswers = [...userAnswers, selectedAnswer];
    setUserAnswers(newAnswers);
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setShowResult(true);
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer('');
        setShowResult(false);
      } else {
        setQuizComplete(true);
      }
    }, 2000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer('');
    setShowResult(false);
    setScore(0);
    setQuizComplete(false);
    setUserAnswers([]);
  };

  const getScoreColor = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return 'Excellent! You understand anti-panic lighting requirements very well.';
    if (percentage >= 60) return 'Good progress! Review the missed topics to improve your knowledge.';
    return 'Keep learning! Review the section content and try the quiz again.';
  };

  if (quizComplete) {
    return (
      <Card className="bg-elec-gray/30 border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Brain className="h-5 w-5 text-elec-yellow" />
            Quiz Complete!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div>
            <div className={`text-4xl font-bold mb-2 ${getScoreColor()}`}>
              {score}/{questions.length}
            </div>
            <div className={`text-xl mb-4 ${getScoreColor()}`}>
              {((score / questions.length) * 100).toFixed(0)}%
            </div>
            <p className="text-gray-300">{getScoreMessage()}</p>
          </div>
          
          <button
            onClick={resetQuiz}
            className="bg-elec-yellow text-black px-6 py-2 rounded-lg hover:bg-elec-yellow/90 transition-colors flex items-center gap-2 mx-auto"
          >
            <RotateCcw className="h-4 w-4" />
            Try Again
          </button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-elec-gray/30 border-elec-yellow/20">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Brain className="h-5 w-5 text-elec-yellow" />
          Anti-Panic Lighting Quiz
          <Badge className="bg-elec-yellow/20 text-elec-yellow ml-auto">
            {currentQuestion + 1} / {questions.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="w-full bg-elec-dark rounded-full h-2">
          <div 
            className="bg-elec-yellow h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>

        <div>
          <h3 className="text-foreground text-lg font-medium mb-4">
            {questions[currentQuestion].question}
          </h3>
          
          <div className="grid grid-cols-1 gap-3">
            {questions[currentQuestion].options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswerSelect(option)}
                disabled={showResult}
                className={`p-4 rounded-lg text-left transition-all duration-200 border ${
                  showResult
                    ? option === questions[currentQuestion].correct
                      ? 'bg-green-500/20 border-green-500 text-green-400'
                      : option === selectedAnswer
                      ? 'bg-red-500/20 border-red-500 text-red-400'
                      : 'bg-elec-dark/50 border-gray-600 text-gray-500'
                    : selectedAnswer === option
                    ? 'bg-elec-yellow/20 border-elec-yellow text-foreground'
                    : 'bg-elec-dark/50 border-gray-600 text-gray-300 hover:bg-elec-dark hover:border-gray-500'
                } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-center gap-3">
                  {showResult && (
                    <>
                      {option === questions[currentQuestion].correct && (
                        <CheckCircle2 className="h-5 w-5 text-green-400" />
                      )}
                      {option === selectedAnswer && option !== questions[currentQuestion].correct && (
                        <XCircle className="h-5 w-5 text-red-400" />
                      )}
                    </>
                  )}
                  <span>{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {showResult && (
          <div className={`p-4 rounded-lg border ${
            selectedAnswer === questions[currentQuestion].correct
              ? 'bg-green-500/10 border-green-500/50'
              : 'bg-red-500/10 border-red-500/50'
          }`}>
            <p className="text-gray-300 text-sm">
              <strong>Explanation:</strong> {questions[currentQuestion].explanation}
            </p>
          </div>
        )}

        {selectedAnswer && !showResult && (
          <button
            onClick={handleNextQuestion}
            className="w-full bg-elec-yellow text-black py-3 px-4 rounded-lg hover:bg-elec-yellow/90 transition-colors font-medium"
          >
            {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </button>
        )}

        <div className="text-center">
          <Badge className="bg-elec-yellow/20 text-elec-yellow">
            Score: {score}/{currentQuestion + (showResult ? 1 : 0)}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};