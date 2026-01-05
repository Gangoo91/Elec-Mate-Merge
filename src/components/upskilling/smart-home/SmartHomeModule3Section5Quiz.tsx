import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, RotateCcw, Award } from 'lucide-react';

export const SmartHomeModule3Section5Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  const questions = [
    {
      question: "What does grouping lights mean?",
      options: [
        "Installing lights close together physically",
        "Connecting multiple lights to be controlled as a single unit",
        "Using the same type of bulbs throughout",
        "Wiring lights on the same circuit"
      ],
      correct: 1
    },
    {
      question: "Give one benefit of grouping lights.",
      options: [
        "Reduces electricity bills automatically",
        "Makes lights brighter",
        "Allows one command to control multiple lights",
        "Prevents lights from burning out"
      ],
      correct: 2
    },
    {
      question: "What does linking lighting to security systems achieve?",
      options: [
        "Makes lights more secure from theft",
        "Automated lighting responses to security events",
        "Prevents electrical faults",
        "Reduces false alarms"
      ],
      correct: 1
    },
    {
      question: "Give an example of entertainment-linked lighting.",
      options: [
        "Brighter lights for reading",
        "Motion sensors in hallways",
        "Lights that dim when TV starts",
        "Timer-controlled garden lights"
      ],
      correct: 2
    },
    {
      question: "What is basic motion logic?",
      options: [
        "Motion detected → light on, no motion → light off",
        "Lights that change colour with movement",
        "Sensors that detect multiple types of movement",
        "Motion that controls multiple rooms"
      ],
      correct: 0
    },
    {
      question: "What is conditional motion logic?",
      options: [
        "Motion sensors that work faster",
        "Multiple motion sensors working together",
        "Motion response only under specific conditions",
        "Motion sensors that learn user behaviour"
      ],
      correct: 2
    },
    {
      question: "Name one drawback of motion sensors.",
      options: [
        "They use too much electricity",
        "They're too expensive to maintain",
        "They can create false triggers (pets, air movement)",
        "They only work in the dark"
      ],
      correct: 2
    },
    {
      question: "Why is over-automation a risk?",
      options: [
        "It damages the electrical system",
        "It creates user frustration with unnecessary switching",
        "It uses more energy than manual control",
        "It requires constant internet connection"
      ],
      correct: 1
    },
    {
      question: "What's one best practice when setting up automations?",
      options: [
        "Install as many sensors as possible",
        "Start simple and expand complexity gradually",
        "Never allow manual overrides",
        "Use only wireless components"
      ],
      correct: 1
    },
    {
      question: "Scenario: A family complains their hallway light keeps switching on at night when the dog walks past. How would you fix this?",
      options: [
        "Remove the motion sensor completely",
        "Adjust sensor sensitivity or use pet-immune sensors",
        "Move the dog to a different room",
        "Install brighter lights"
      ],
      correct: 1
    }
  ];

  const handleAnswerSelect = (answerIndex: string) => {
    if (!showResult) {
      setSelectedAnswer(answerIndex);
    }
  };

  const handleSubmit = () => {
    if (selectedAnswer !== null) {
      setShowResult(true);
      const newAnswers = [...userAnswers, selectedAnswer];
      setUserAnswers(newAnswers);
      
      if (parseInt(selectedAnswer) === questions[currentQuestion].correct) {
        setScore(score + 1);
      }
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
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

  if (quizComplete) {
    return (
      <Card className="bg-elec-gray border-gray-700">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Award className="h-6 w-6 text-elec-yellow" />
            Quiz Complete!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="text-6xl">🎉</div>
          <h3 className="text-2xl font-bold text-foreground">Well Done!</h3>
          <p className="text-xl">
            Your Score: <span className={`font-bold ${getScoreColor()}`}>
              {score}/{questions.length} ({Math.round((score/questions.length)*100)}%)
            </span>
          </p>
          <div className="space-y-2">
            {score === questions.length && (
              <p className="text-green-400">Perfect score! Excellent understanding of automation principles.</p>
            )}
            {score >= questions.length * 0.8 && score < questions.length && (
              <p className="text-yellow-400">Great work! Strong grasp of grouping, linking, and motion logic.</p>
            )}
            {score < questions.length * 0.8 && (
              <p className="text-red-400">Good effort. Review the material and try again to improve your score.</p>
            )}
          </div>
          <Button 
            onClick={resetQuiz}
            className="bg-elec-yellow text-elec-dark hover:bg-yellow-400"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Retake Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Award className="h-6 w-6 text-elec-yellow" />
            Grouping, Linking & Motion Logic Quiz
          </span>
          <span className="text-sm text-gray-400">
            {currentQuestion + 1}/{questions.length}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">
              {questions[currentQuestion].question}
            </h3>
            
            <div className="grid gap-3">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index.toString())}
                  disabled={showResult}
                  className={`p-4 text-left rounded-lg border transition-all ${
                    showResult
                      ? index === questions[currentQuestion].correct
                        ? 'bg-green-900/30 border-green-600 text-green-200'
                        : selectedAnswer === index.toString()
                        ? 'bg-red-900/30 border-red-600 text-red-200'
                        : 'bg-elec-gray border-gray-600 text-gray-400'
                      : selectedAnswer === index.toString()
                      ? 'bg-elec-yellow/20 border-elec-yellow text-foreground'
                      : 'bg-elec-gray border-gray-600 text-gray-300 hover:border-gray-500'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {showResult && index === questions[currentQuestion].correct && (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    )}
                    {showResult && selectedAnswer === index.toString() && index !== questions[currentQuestion].correct && (
                      <XCircle className="h-5 w-5 text-red-400" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {!showResult ? (
            <Button 
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
              className="w-full bg-elec-yellow text-elec-dark hover:bg-yellow-400"
            >
              Submit Answer
            </Button>
          ) : (
            <div className="space-y-4">
              {parseInt(selectedAnswer!) === questions[currentQuestion].correct ? (
                <div className="bg-green-900/20 border border-green-600/50 p-4 rounded-lg">
                  <p className="text-green-200 text-sm">✓ Correct! Great understanding.</p>
                </div>
              ) : (
                <div className="bg-red-900/20 border border-red-600/50 p-4 rounded-lg">
                  <p className="text-red-200 text-sm">
                    ✗ Incorrect. The correct answer is: {questions[currentQuestion].options[questions[currentQuestion].correct]}
                  </p>
                </div>
              )}
              <Button 
                onClick={handleNext}
                className="w-full bg-elec-yellow text-elec-dark hover:bg-yellow-400"
              >
                {currentQuestion < questions.length - 1 ? 'Next Question' : 'Complete Quiz'}
              </Button>
            </div>
          )}

          <div className="flex justify-center">
            <div className="text-sm text-gray-400">
              Score: {score}/{currentQuestion + (showResult ? 1 : 0)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};