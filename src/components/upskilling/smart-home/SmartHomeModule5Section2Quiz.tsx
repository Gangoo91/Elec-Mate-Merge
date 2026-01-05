import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { useState } from 'react';

export const SmartHomeModule5Section2Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(string | null)[]>(new Array(10).fill(null));
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions = [
    {
      question: "Which pair are both common CCTV camera types?",
      options: [
        "Dome + Bullet",
        "Thermal + Webcam",
        "Microphone + Speaker",
        "Lidar + Radar"
      ],
      correct: 0,
      explanation: "Dome and bullet are standard CCTV types used in domestic and commercial installs."
    },
    {
      question: "Which camera type can be remotely moved for wider coverage?",
      options: [
        "Dome",
        "PTZ",
        "Bullet", 
        "Turret"
      ],
      correct: 1,
      explanation: "PTZ stands for Pan‑Tilt‑Zoom."
    },
    {
      question: "What resolution is 'Full HD'?",
      options: [
        "720p",
        "1080p",
        "2K",
        "4K"
      ],
      correct: 1,
      explanation: "Full HD is 1920 × 1080 pixels."
    },
    {
      question: "Which resolution gives the sharpest image?",
      options: [
        "1080p",
        "2K",
        "4K",
        "They're all the same"
      ],
      correct: 2,
      explanation: "Higher pixel count improves detail (with storage/bandwidth trade‑offs)."
    },
    {
      question: "What does NVR stand for?",
      options: [
        "National Video Registry",
        "Network Visual Router",
        "Network Video Recorder",
        "Network Video Receiver"
      ],
      correct: 2,
      explanation: "NVR is used with IP cameras over the network (often PoE)."
    },
    {
      question: "Advantage of cloud storage:",
      options: [
        "Unlimited storage for free",
        "Remote access from anywhere",
        "Works without internet",
        "Eliminates all security risks"
      ],
      correct: 1,
      explanation: "Cloud provides remote access and offsite resilience but needs internet and a subscription."
    },
    {
      question: "Disadvantage of cloud storage:",
      options: [
        "Requires internet and subscription",
        "Lower reliability than NVRs in all cases",
        "Not compatible with IP cameras",
        "Reduces camera image quality"
      ],
      correct: 0,
      explanation: "Cloud needs reliable upstream bandwidth and ongoing fees."
    },
    {
      question: "SD card storage is ideal for long-term surveillance:",
      options: [
        "True",
        "False"
      ],
      correct: 1,
      explanation: "SD cards are limited capacity and prone to loss/theft; not suitable for long retention."
    },
    {
      question: "Why must installers consider GDPR?",
      options: [
        "It improves video quality",
        "Wi‑Fi won't work otherwise",
        "CCTV captures personal data, so privacy compliance is required",
        "It's an insurance-only requirement"
      ],
      correct: 2,
      explanation: "Lawful basis, signage, retention limits, and data protection apply."
    },
    {
      question: "Scenario — driveway, clear at night, limited internet. Best pick?",
      options: [
        "Doorbell camera with cloud-only storage",
        "PTZ 4K with cloud-only backup",
        "Wireless 720p camera with SD card",
        "Bullet camera with IR + local NVR storage"
      ],
      correct: 3,
      explanation: "IR bullet for night detail; local NVR avoids bandwidth constraints."
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
    if (score >= 8) return 'Excellent! You have a strong understanding of CCTV types, resolution, and storage options.';
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
            <p className="text-gray-300">
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
                      <p className="text-sm text-gray-300 mb-2">
                        <strong>Correct answer:</strong> {question.options[question.correct]}
                      </p>
                      {!isCorrect && userAnswer !== null && (
                        <p className="text-sm text-red-300 mb-2">
                          <strong>Your answer:</strong> {question.options[parseInt(userAnswer)]}
                        </p>
                      )}
                      <p className="text-xs text-gray-400">
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
          <Badge variant="outline" className="ml-auto border-gray-600 text-gray-300">
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
                    : 'text-gray-300'
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
            className="border-gray-600 text-gray-300 hover:border-gray-500"
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