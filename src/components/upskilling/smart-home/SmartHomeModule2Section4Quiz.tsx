import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, BookOpen } from 'lucide-react';

const quizData = [
  {
    id: 1,
    question: 'What is wireless interference?',
    options: [
      'When devices compete for the same frequency',
      'When a signal travels further than expected',
      'When device batteries run low',
      'When a cable becomes damaged',
    ],
    correct: 0,
    explanation:
      'Wireless interference occurs when multiple devices contend for the same frequency, degrading or disrupting their signals.',
  },
  {
    id: 2,
    question: 'Which pair are common causes of wireless interference in homes?',
    options: [
      'Power outages and broadband faults',
      'Cold weather and high humidity',
      'Overlapping Wi-Fi routers and microwave ovens',
      'A mix of old and new devices',
    ],
    correct: 2,
    explanation:
      'Overlapping Wi-Fi routers and microwave ovens both crowd the 2.4 GHz band, a common source of interference in homes.',
  },
  {
    id: 3,
    question: 'Which frequency band do both Wi-Fi and Zigbee commonly use?',
    options: ['5 GHz', 'Sub-1 GHz', '2.4 GHz', '6 GHz'],
    correct: 2,
    explanation:
      'Both Wi-Fi and Zigbee operate in the 2.4 GHz band, which is why they can interfere with each other if not planned carefully.',
  },
  {
    id: 4,
    question: 'How does Z-Wave largely avoid interference with Wi-Fi?',
    options: [
      'It operates in the sub-1 GHz band',
      'It shares the same 2.4 GHz band as Wi-Fi',
      'It only ever uses wired connections',
      'It transmits at much higher power',
    ],
    correct: 0,
    explanation:
      'Z-Wave uses the sub-1 GHz band, separate from the 2.4 GHz band used by Wi-Fi and Zigbee, which avoids most of that interference.',
  },
  {
    id: 5,
    question: 'What are Wi-Fi channels used for?',
    options: [
      'Extending the device battery life',
      'Separating wireless signals to reduce overlap',
      'Increasing the raw device speed',
      'Lowering overall power consumption',
    ],
    correct: 1,
    explanation:
      'Channels divide a Wi-Fi band into separate sub-bands, so choosing non-overlapping channels reduces interference between networks.',
  },
  {
    id: 6,
    question: 'Which is an example of a high-bandwidth smart home device?',
    options: ['A light switch', 'A temperature sensor', 'A door contact sensor', 'A security camera'],
    correct: 3,
    explanation:
      'A security camera streams video and so needs high bandwidth, unlike simple sensors that send only small amounts of data.',
  },
  {
    id: 7,
    question: 'Which is an example of a low-bandwidth smart home device?',
    options: ['A video doorbell', 'A smart speaker', 'A thermostat', 'A security camera'],
    correct: 2,
    explanation:
      'A thermostat sends only small, infrequent updates, making it a low-bandwidth device compared with cameras or speakers.',
  },
  {
    id: 8,
    question: 'Why might devices drop offline on a crowded network?',
    options: [
      'The devices are simply too old to work',
      'There is too much interference and contention for bandwidth',
      'The power supply to the devices is faulty',
      'The internet connection itself is too slow',
    ],
    correct: 1,
    explanation:
      'On a crowded network, interference and competition for bandwidth cause packets to be lost, so devices can drop offline.',
  },
  {
    id: 9,
    question: 'What is one strategy to reduce interference between Wi-Fi and Zigbee?',
    options: [
      'Set both systems to the same channel',
      'Place the hubs directly together',
      'Separate the channels used and the hub placement',
      'Switch off one of the two systems',
    ],
    correct: 2,
    explanation:
      'Using separate channels and keeping the hubs apart reduces overlap between Wi-Fi and Zigbee in the shared 2.4 GHz band.',
  },
  {
    id: 10,
    question:
      'You install 10 Wi-Fi cameras and they keep buffering. What is the most likely cause?',
    options: [
      'All of the cameras are defective',
      'Insufficient bandwidth on an overcrowded network',
      'The cameras have the wrong passwords',
      'There is poor lighting in the rooms',
    ],
    correct: 1,
    explanation:
      'Ten cameras streaming at once can overwhelm the available bandwidth, so an overcrowded network is the most likely cause of buffering.',
  },
];

export const SmartHomeModule2Section4Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(
    new Array(quizData.length).fill(false)
  );

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    setShowResult(true);
    const newAnsweredQuestions = [...answeredQuestions];
    newAnsweredQuestions[currentQuestion] = true;
    setAnsweredQuestions(newAnsweredQuestions);

    if (selectedAnswer === quizData[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions(new Array(quizData.length).fill(false));
  };

  const isQuizComplete = answeredQuestions.every((answered) => answered);
  const currentQ = quizData[currentQuestion];

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          Knowledge Check Quiz
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress indicators */}
        <div className="flex justify-between items-center">
          <span className="text-foreground">
            Question {currentQuestion + 1} of {quizData.length}
          </span>
          <span className="text-foreground">
            Score: {score}/{quizData.length}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-600 rounded-full h-2">
          <div
            className="bg-elec-yellow h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }}
          ></div>
        </div>

        {/* Question */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">{currentQ.question}</h3>

          {/* Answer options */}
          <div className="space-y-2">
            {currentQ.options.map((option, index) => {
              let buttonClass = 'w-full text-left p-3 rounded border transition-all duration-200 ';

              if (showResult) {
                if (index === currentQ.correct) {
                  buttonClass += 'bg-green-600/20 border-green-500 text-foreground';
                } else if (index === selectedAnswer && index !== currentQ.correct) {
                  buttonClass += 'bg-red-600/20 border-red-500 text-foreground';
                } else {
                  buttonClass += 'bg-gray-600/20 border-gray-500 text-gray-300';
                }
              } else {
                if (selectedAnswer === index) {
                  buttonClass += 'bg-elec-yellow/20 border-elec-yellow text-foreground';
                } else {
                  buttonClass +=
                    'bg-gray-600/20 border-gray-500 text-foreground hover:bg-gray-500/20';
                }
              }

              return (
                <Button
                  key={index}
                  variant="ghost"
                  className={buttonClass}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                >
                  <div className="flex items-center justify-between w-full">
                    <span>{option}</span>
                    {showResult && index === currentQ.correct && (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    )}
                    {showResult && index === selectedAnswer && index !== currentQ.correct && (
                      <XCircle className="h-5 w-5 text-red-400" />
                    )}
                  </div>
                </Button>
              );
            })}
          </div>

          {/* Action buttons */}
          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="border-gray-600 text-foreground hover:bg-elec-gray"
            >
              Previous
            </Button>

            <div className="flex gap-2">
              {!showResult && selectedAnswer !== null && (
                <Button
                  onClick={handleSubmit}
                  className="bg-elec-yellow text-elec-dark hover:bg-yellow-600"
                >
                  Submit Answer
                </Button>
              )}

              {showResult && currentQuestion < quizData.length - 1 && (
                <Button
                  onClick={handleNext}
                  className="bg-elec-yellow text-elec-dark hover:bg-yellow-600"
                >
                  Next Question
                </Button>
              )}

              {isQuizComplete && currentQuestion === quizData.length - 1 && (
                <Button
                  onClick={resetQuiz}
                  variant="outline"
                  className="border-gray-600 text-foreground hover:bg-elec-gray"
                >
                  Restart Quiz
                </Button>
              )}
            </div>
          </div>

          {/* Final score */}
          {isQuizComplete && showResult && currentQuestion === quizData.length - 1 && (
            <div className="mt-6 p-4 bg-elec-yellow/10 border border-elec-yellow rounded-lg">
              <h4 className="text-foreground font-bold text-lg mb-2">Quiz Complete!</h4>
              <p className="text-foreground">
                Your final score: {score} out of {quizData.length} (
                {Math.round((score / quizData.length) * 100)}%)
              </p>
              <p className="text-foreground mt-2">
                {score >= quizData.length * 0.8
                  ? 'Excellent work! You have a strong understanding of interference, channels, and bandwidth.'
                  : score >= quizData.length * 0.6
                    ? 'Good job! Consider reviewing the material to strengthen your understanding.'
                    : 'You may want to review the section content and try the quiz again.'}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
