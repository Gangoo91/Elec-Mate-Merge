import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, CheckCircle, XCircle, RotateCcw } from 'lucide-react';

export const SmartHomeModule5Section1Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(string | null)[]>(new Array(10).fill(null));
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions = [
    {
      question: "What is a smart lock?",
      options: [
        "A lock that can only be opened with a smartphone",
        "An electronic lock controlled via app, keypad, biometrics, or key fob",
        "A mechanical lock with Bluetooth capability",
        "A lock that automatically opens when you approach"
      ],
      correct: 1,
      explanation: "Smart locks are electronic locks that can be controlled through multiple methods including apps, keypads, biometrics, or key fobs."
    },
    {
      question: "Name two connectivity methods used in smart locks:",
      options: [
        "Bluetooth and NFC",
        "Wi-Fi and Ethernet", 
        "Bluetooth and Wi-Fi",
        "Zigbee and infrared"
      ],
      correct: 2,
      explanation: "Bluetooth and Wi-Fi are the two most common connectivity methods, though Zigbee and Z-Wave are also used."
    },
    {
      question: "What is the difference between retrofit and replacement locks?",
      options: [
        "Retrofit locks are wireless, replacement locks are wired",
        "Retrofit locks fit over existing deadbolts, replacement locks fully replace the original lock",
        "Retrofit locks are cheaper, replacement locks are more expensive",
        "There is no difference"
      ],
      correct: 1,
      explanation: "Retrofit locks fit over existing deadbolts while replacement locks completely replace the traditional lock mechanism."
    },
    {
      question: "Give one example of a biometric smart lock feature:",
      options: [
        "PIN code entry",
        "Bluetooth connectivity",
        "Fingerprint recognition",
        "Mobile app control"
      ],
      correct: 2,
      explanation: "Fingerprint recognition is a biometric feature that identifies users based on their unique biological characteristics."
    },
    {
      question: "What is a benefit of keypad PIN entry?",
      options: [
        "Faster entry than keys",
        "No physical keys needed and ability to create temporary codes",
        "Better security than biometrics",
        "Lower cost than traditional locks"
      ],
      correct: 1,
      explanation: "Keypad PIN entry eliminates the need for physical keys and allows creation of temporary codes for guests or service providers."
    },
    {
      question: "What is a drawback of using PIN codes?",
      options: [
        "They are too expensive to implement",
        "Codes must be managed and changed for security, and code sharing reduces security",
        "They don't work in cold weather",
        "They require internet connection"
      ],
      correct: 1,
      explanation: "PIN codes need regular management and updates, and sharing codes carelessly can compromise security."
    },
    {
      question: "Name one way smart locks integrate with wider smart homes:",
      options: [
        "They make other devices work faster",
        "Unlocking can trigger security scenes like disarming alarms and turning on lights",
        "They control the heating system",
        "They manage internet connectivity"
      ],
      correct: 1,
      explanation: "Smart locks can trigger automation scenes, such as disarming security systems and turning on lights when unlocked."
    },
    {
      question: "True or False: Smart locks never need battery changes.",
      options: [
        "True - they are powered by the door mechanism",
        "False - most smart locks are battery-powered and need regular replacement",
        "True - they are always hardwired",
        "False - they use solar power"
      ],
      correct: 1,
      explanation: "Most smart locks are battery-powered and require regular battery replacement, typically every 6-12 months."
    },
    {
      question: "What should always be provided as a backup with smart locks?",
      options: [
        "A second smart lock",
        "A mechanical key override",
        "A smartphone app",
        "A PIN code"
      ],
      correct: 1,
      explanation: "A mechanical key override is essential as a backup in case of electronic failure or battery depletion."
    },
    {
      question: "Scenario: A family wants to let their cleaner in once a week without giving them a key. Which smart lock feature would you recommend?",
      options: [
        "Permanent PIN code that never changes",
        "Temporary or scheduled PIN codes that can be time-limited",
        "Biometric fingerprint access",
        "Bluetooth proximity unlock"
      ],
      correct: 1,
      explanation: "Temporary or scheduled PIN codes provide secure access for service providers without the security risks of permanent codes or physical keys."
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
    if (score >= 8) return 'Excellent! You have a strong understanding of smart locks and keypads.';
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