import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, CheckCircle, XCircle, RotateCcw } from 'lucide-react';

export const SmartHomeModule5Section3Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(string | null)[]>(new Array(10).fill(null));
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions = [
    {
      question: "How do door/window contact sensors work?",
      options: [
        "Magnetic reed switch opens when separated",
        "Detect sound waves from door movement",
        "Use built-in camera for visual detection",
        "Pressure sensors on door handle"
      ],
      correct: 0,
      explanation: "Contact sensors use a magnet and reed switch. When the door opens, the magnet separates from the switch, opening the circuit and triggering an alert."
    },
    {
      question: "Give one advantage of contact sensors:",
      options: [
        "Simple and reliable alerts at entry points",
        "Cover very large rooms without line of sight",
        "Detect temperature changes in the room",
        "Are completely invisible to intruders"
      ],
      correct: 0,
      explanation: "Contact sensors are simple, reliable, and ideal for securing doors and windows as the first line of defence."
    },
    {
      question: "Give one limitation of contact sensors:",
      options: [
        "Won't detect an intruder already inside",
        "Require permanent mains power connection",
        "Don't work on metal door frames",
        "Always require Wi-Fi connectivity"
      ],
      correct: 0,
      explanation: "Contact sensors only secure the perimeter and won't detect movement inside. This is why they should be combined with PIR sensors for interior coverage."
    },
    {
      question: "What does PIR stand for?",
      options: [
        "Passive Infrared",
        "Passive Internal Radar",
        "Proactive Infrared",
        "Peripheral Infrared"
      ],
      correct: 0,
      explanation: "PIR stands for Passive Infrared - these sensors passively detect infrared radiation changes without emitting any signals."
    },
    {
      question: "How do PIR sensors detect motion?",
      options: [
        "Sense changes in infrared radiation from warm bodies",
        "Detect vibrations in the floor structure",
        "Use ultrasound reflections to map movement",
        "Rely on magnetic field disturbances"
      ],
      correct: 0,
      explanation: "PIR sensors detect changes in infrared (heat) radiation. When a warm body moves through the detection zone, it creates IR changes that trigger the sensor."
    },
    {
      question: "Name a common cause of false PIR triggers:",
      options: [
        "Pets and small animals",
        "Low battery always triggers motion alerts",
        "Nylon carpets generating static electricity",
        "Closed windows blocking airflow"
      ],
      correct: 0,
      explanation: "Pets, sunlight, and heat sources like radiators are common causes of false PIR triggers. Pet-immune models are available to address this issue."
    },
    {
      question: "Where should PIRs typically be placed?",
      options: [
        "Hallways and main routes at ~2–2.5m high",
        "Facing radiators for heat detection",
        "Pointed directly at windows for light sensing",
        "On floor level under furniture for concealment"
      ],
      correct: 0,
      explanation: "PIRs work best when mounted at 2-2.5m height in hallways and main routes where they can detect cross-movement effectively."
    },
    {
      question: "True or False: PIR sensors detect through glass.",
      options: [
        "True - they can see through any transparent material",
        "False - glass blocks infrared radiation",
        "True - but only through thin glass",
        "False - they use magnetic fields instead"
      ],
      correct: 1,
      explanation: "False. Glass blocks infrared radiation, so PIR sensors cannot detect movement through windows or glass doors."
    },
    {
      question: "Why combine contact sensors with PIRs?",
      options: [
        "Create layered security: perimeter + interior detection",
        "Avoid CCTV regulations and compliance issues",
        "Reduce battery usage to zero maintenance",
        "Make the system cheaper in all installations"
      ],
      correct: 0,
      explanation: "Combining contact sensors (perimeter) with PIRs (interior) creates layered security that reduces blind spots and provides comprehensive coverage."
    },
    {
      question: "Scenario: Night-time false alarms due to a cat. Best solution?",
      options: [
        "Use pet-immune PIR and/or adjust mounting height and sensitivity",
        "Replace PIR with camera-only detection",
        "Turn the security system off at night",
        "Confine the cat to a single room permanently"
      ],
      correct: 0,
      explanation: "Pet-immune PIRs are designed to ignore small animals, and proper mounting height with adjusted sensitivity can reduce false triggers while maintaining security coverage."
    }
  ];

  const handleAnswerSelect = (answerIndex: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
      setShowResults(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer !== null && parseInt(answer) === questions[index].correct ? 1 : 0);
    }, 0);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers(new Array(10).fill(null));
    setShowResults(false);
    setQuizCompleted(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-400';
    if (score >= 6) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 8) return 'Excellent! You have a strong understanding of sensor systems and layered security.';
    if (score >= 6) return 'Good work! Review the areas you missed to strengthen your knowledge.';
    return 'Keep studying! Review the content and retake the quiz to improve your score.';
  };

  if (showResults) {
    const score = calculateScore();
    return (
      <Card className="bg-elec-gray border-gray-700">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Brain className="h-5 w-5 text-elec-yellow" />
            Quiz Results
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className={`text-4xl font-bold mb-2 ${getScoreColor(score)}`}>
              {score}/10
            </div>
            <p className="text-foreground">
              {getScoreMessage(score)}
            </p>
          </div>

          <div className="space-y-4">
            {questions.map((question, index) => {
              const userAnswer = selectedAnswers[index];
              const isCorrect = userAnswer !== null && parseInt(userAnswer) === question.correct;
              
              return (
                <div key={index} className={`p-4 rounded-lg border ${isCorrect ? 'border-green-600 bg-green-900/20' : 'border-red-600 bg-red-900/20'}`}>
                  <div className="flex items-start gap-3">
                    {isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="text-foreground font-medium mb-2">
                        Question {index + 1}: {question.question}
                      </p>
                      <p className="text-sm text-foreground mb-2">
                        <strong>Correct answer:</strong> {question.options[question.correct]}
                      </p>
                      {!isCorrect && userAnswer !== null && (
                        <p className="text-sm text-red-300 mb-2">
                          <strong>Your answer:</strong> {question.options[parseInt(userAnswer)]}
                        </p>
                      )}
                      <p className="text-xs text-foreground">
                        {question.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center">
            <Button 
              onClick={resetQuiz}
              className="bg-elec-yellow text-elec-dark hover:bg-yellow-500"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Retake Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Brain className="h-5 w-5 text-elec-yellow" />
          Knowledge Check Quiz
          <Badge variant="outline" className="ml-auto border-gray-600 text-foreground">
            Question {currentQuestion + 1} of {questions.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            {questions[currentQuestion].question}
          </h3>
          
          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className={`w-full justify-start text-left p-4 h-auto border-gray-600 hover:border-elec-yellow hover:bg-elec-yellow/10 ${
                  selectedAnswers[currentQuestion] === index.toString() 
                    ? 'border-elec-yellow bg-elec-yellow/10 text-elec-yellow' 
                    : 'text-foreground'
                }`}
                onClick={() => handleAnswerSelect(index.toString())}
              >
                <span className="font-medium mr-3">{String.fromCharCode(65 + index)}.</span>
                <span>{option}</span>
              </Button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 0}
            className="border-gray-600 text-foreground hover:border-gray-500"
          >
            Previous
          </Button>
          
          <Button
            onClick={handleNextQuestion}
            disabled={selectedAnswers[currentQuestion] === null}
            className="bg-elec-yellow text-elec-dark hover:bg-yellow-500"
          >
            {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </Button>
        </div>

        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-elec-yellow h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </CardContent>
    </Card>
  );
};