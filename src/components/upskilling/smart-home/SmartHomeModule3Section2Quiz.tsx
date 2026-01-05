import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, RotateCcw } from 'lucide-react';

export const SmartHomeModule3Section2Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      question: "What is a lighting scene?",
      options: ["A room with smart lights", "A predefined combination of brightness, colour, and zones", "A type of light switch", "A wireless protocol"],
      correct: 1,
      explanation: "A lighting scene is a predefined combination of brightness, colour, and zones that creates specific ambience for activities."
    },
    {
      question: "Give an example of a common household scene.",
      options: ["Movie Night with dimmed lights", "Turn all lights off", "Replace bulbs", "Update firmware"],
      correct: 0,
      explanation: "Movie Night is a classic scene example - dimming lounge lights while keeping hallway navigation lighting."
    },
    {
      question: "What is a schedule in smart lighting?",
      options: ["A list of bulb brands", "Automated control based on time or triggers", "An installation timeline", "A maintenance plan"],
      correct: 1,
      explanation: "A schedule is automated lighting control triggered by time, events, or environmental conditions."
    },
    {
      question: "List two types of schedules.",
      options: ["Fast and slow", "Time-based and event-based", "Wired and wireless", "Indoor and outdoor"],
      correct: 1,
      explanation: "Time-based schedules use clock/solar time, while event-based schedules respond to sensors or device states."
    },
    {
      question: "How can scenes improve security?",
      options: ["They make lights brighter", "They can simulate occupancy when away", "They save more energy", "They last longer"],
      correct: 1,
      explanation: "Security scenes can simulate normal occupancy patterns with random lighting when the house is empty."
    },
    {
      question: "What tools can be used to program schedules?",
      options: ["Only expensive professional systems", "Mobile apps, voice assistants, and smart hubs", "Manual switches only", "Computer programming only"],
      correct: 1,
      explanation: "Many tools exist for schedule programming, from simple mobile apps to advanced home automation hubs."
    },
    {
      question: "True or False: Over-automation always improves convenience.",
      options: ["True - more automation is always better", "False - it can frustrate users with unexpected behaviour", "True - if it's programmed correctly", "False - it uses too much energy"],
      correct: 1,
      explanation: "Over-automation can annoy users when lights behave unexpectedly or don't respond as wanted."
    },
    {
      question: "What's one best practice for naming scenes?",
      options: ["Use numbers like Scene 1, Scene 2", "Keep names clear and activity-based", "Use technical terms only", "Use random names"],
      correct: 1,
      explanation: "Clear, activity-based names like 'Reading Light' or 'Movie Night' make scenes intuitive to use."
    },
    {
      question: "Why might a cloud-based schedule fail?",
      options: ["Bulbs are too old", "No internet connection", "Lights are too bright", "Wrong colour temperature"],
      correct: 1,
      explanation: "Cloud-based schedules depend on internet connectivity and will fail when offline."
    },
    {
      question: "Scenario: A client works night shifts and sleeps during the day. What kind of schedule would you recommend for their bedroom lighting?",
      options: ["Standard sunrise wake-up schedule", "Blackout mode during day with gradual evening wake-up", "Always bright lights", "Random lighting patterns"],
      correct: 1,
      explanation: "Night shift workers need blackout during normal daytime hours and gradual brightening in the evening when they wake up."
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
              {percentage >= 80 ? 'Excellent understanding of scenes and schedules!' : 
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
          Scene-Based Control Quiz
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