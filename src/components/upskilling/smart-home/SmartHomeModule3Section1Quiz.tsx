import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, RotateCcw } from 'lucide-react';

export const SmartHomeModule3Section1Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      question: "Name two examples of smart bulb brands.",
      options: ["Philips Hue and IKEA Tradfri", "Samsung and Apple", "BT and Sky", "Tesla and Google"],
      correct: 0,
      explanation: "Philips Hue and IKEA Tradfri are leading smart bulb brands offering Zigbee connectivity."
    },
    {
      question: "What is a key disadvantage of smart bulbs?",
      options: ["They don't work in winter", "They're expensive per bulb and need constant power", "They only work with Android", "They can't be dimmed"],
      correct: 1,
      explanation: "Smart bulbs cost £15-£50+ each and must have constant power to stay connected - wall switches can't be turned off."
    },
    {
      question: "What type of system controls all bulbs on a circuit?",
      options: ["Smart bulbs", "Smart switches", "Voice assistants", "Motion sensors"],
      correct: 1,
      explanation: "Smart switches replace wall switches and control all lights on that circuit simultaneously."
    },
    {
      question: "Which system requires structured cabling during installation?",
      options: ["Wi-Fi bulbs", "Smart switches", "Centralised wired systems", "Bluetooth bulbs"],
      correct: 2,
      explanation: "Centralised systems like KNX require dedicated bus cables run during construction."
    },
    {
      question: "True or False: Smart switches can control colour temperature of bulbs.",
      options: ["True - all smart switches do this", "False - only smart bulbs can change colour", "True - but only with compatible LED bulbs", "False - only voice assistants can do this"],
      correct: 2,
      explanation: "Smart switches can adjust colour temperature if paired with compatible tunable white LED bulbs."
    },
    {
      question: "What is a hybrid lighting system?",
      options: ["Solar-powered lights", "Mix of wired and wireless components", "Lights that work underwater", "Bulbs that change shape"],
      correct: 1,
      explanation: "Hybrid systems combine wired infrastructure for reliability with wireless devices for flexibility."
    },
    {
      question: "Which option is best for renters?",
      options: ["KNX wired system", "Smart bulbs", "Hardwired smart switches", "Centralised control panels"],
      correct: 1,
      explanation: "Smart bulbs require no rewiring and can be taken when moving house."
    },
    {
      question: "Give one advantage of centralised systems.",
      options: ["They're the cheapest option", "They work without electricity", "They're highly reliable with no wireless interference", "They only need one bulb"],
      correct: 2,
      explanation: "Centralised wired systems eliminate wireless interference issues and provide professional-grade reliability."
    },
    {
      question: "What is circadian rhythm lighting?",
      options: ["Lights that flash in patterns", "Lighting that adjusts to support natural sleep patterns", "Emergency lighting only", "Lights controlled by music"],
      correct: 1,
      explanation: "Circadian lighting adjusts colour temperature throughout the day to support natural sleep-wake cycles."
    },
    {
      question: "Scenario: A homeowner wants whole-house smart lighting with minimal disruption. Which system type would you recommend?",
      options: ["Individual smart bulbs in every fitting", "Smart switches for main circuits", "Full KNX rewiring", "Voice assistants only"],
      correct: 1,
      explanation: "Smart switches provide whole-house control with minimal disruption - one switch controls multiple bulbs per room."
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: answerIndex
    });
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
  };

  const calculateScore = () => {
    return Object.entries(selectedAnswers).reduce((score, [questionIndex, answerIndex]) => {
      return score + (questions[parseInt(questionIndex)].correct === answerIndex ? 1 : 0);
    }, 0);
  };

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <Card className="bg-elec-gray border-gray-700">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Award className="h-5 w-5 text-yellow-400" />
            Quiz Results
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold text-foreground">{percentage}%</div>
            <div className="text-foreground">
              You scored {score} out of {questions.length} questions correctly
            </div>
            <div className="text-foreground">
              {percentage >= 80 ? 'Excellent work!' : 
               percentage >= 60 ? 'Good job! Review the areas you missed.' : 
               'Consider reviewing the material and trying again.'}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Review your answers:</h4>
            {questions.map((question, index) => {
              const userAnswer = selectedAnswers[index];
              const isCorrect = userAnswer === question.correct;
              
              return (
                <div key={index} className={`p-3 rounded-lg border ${
                  isCorrect ? 'bg-green-600/10 border-green-600/20' : 'bg-red-600/10 border-red-600/20'
                }`}>
                  <div className="font-medium text-foreground mb-1">
                    Q{index + 1}: {question.question}
                  </div>
                  <div className={`text-sm ${isCorrect ? 'text-green-100' : 'text-red-100'}`}>
                    Your answer: {question.options[userAnswer]}
                  </div>
                  {!isCorrect && (
                    <div className="text-sm text-yellow-100 mt-1">
                      Correct: {question.options[question.correct]}
                    </div>
                  )}
                  <div className="text-xs text-foreground mt-2">
                    {question.explanation}
                  </div>
                </div>
              );
            })}
          </div>

          <Button
            onClick={resetQuiz}
            className="w-full bg-elec-yellow text-elec-dark hover:bg-yellow-400"
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
        <CardTitle className="text-foreground flex items-center gap-2">
          <Award className="h-5 w-5 text-blue-400" />
          Smart Lighting Systems Quiz
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm text-foreground mb-4">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <div className="flex space-x-1">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentQuestion ? 'bg-elec-yellow' : 
                  selectedAnswers[index] !== undefined ? 'bg-green-400' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            {questions[currentQuestion].question}
          </h3>

          <div className="space-y-2">
            {questions[currentQuestion].options.map((option, index) => (
              <label
                key={index}
                className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                  selectedAnswers[currentQuestion] === index
                    ? 'border-elec-yellow bg-elec-yellow/10'
                    : 'border-gray-600 hover:border-gray-500'
                }`}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestion}`}
                  value={index}
                  checked={selectedAnswers[currentQuestion] === index}
                  onChange={() => handleAnswerSelect(index)}
                  className="sr-only"
                />
                <span className="text-foreground">{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <Button
            onClick={previousQuestion}
            disabled={currentQuestion === 0}
            variant="outline"
            className="border-gray-600 text-foreground hover:bg-[#323232] hover:text-foreground disabled:opacity-50"
          >
            Previous
          </Button>
          <Button
            onClick={nextQuestion}
            disabled={!selectedAnswers[currentQuestion]}
            className="bg-elec-yellow text-elec-dark hover:bg-yellow-400"
          >
            {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};