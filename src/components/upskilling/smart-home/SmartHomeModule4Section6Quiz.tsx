import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, RotateCcw, Trophy } from 'lucide-react';

export const SmartHomeModule4Section6Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(string | null)[]>(new Array(10).fill(null));
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions = [
    {
      question: "What does BMS stand for?",
      options: [
        { id: 'a', text: 'Building Monitoring System', correct: false },
        { id: 'b', text: 'Building Management System', correct: true },
        { id: 'c', text: 'Boiler Management System', correct: false },
        { id: 'd', text: 'Basic Maintenance System', correct: false }
      ]
    },
    {
      question: "Where are BMS systems typically used?",
      options: [
        { id: 'a', text: 'Only in residential homes', correct: false },
        { id: 'b', text: 'In commercial buildings, schools, and large facilities', correct: true },
        { id: 'c', text: 'Only in industrial plants', correct: false },
        { id: 'd', text: 'Only in new construction', correct: false }
      ]
    },
    {
      question: "Name one protocol commonly used in BMS for HVAC integration.",
      options: [
        { id: 'a', text: 'HTTP', correct: false },
        { id: 'b', text: 'BACnet', correct: true },
        { id: 'c', text: 'WiFi', correct: false },
        { id: 'd', text: 'Bluetooth', correct: false }
      ]
    },
    {
      question: "Name one protocol used for lighting control.",
      options: [
        { id: 'a', text: 'DALI', correct: true },
        { id: 'b', text: 'TCP/IP', correct: false },
        { id: 'c', text: 'USB', correct: false },
        { id: 'd', text: 'HDMI', correct: false }
      ]
    },
    {
      question: "How can BMS link occupancy sensors to both lighting and HVAC?",
      options: [
        { id: 'a', text: 'By using separate systems for each', correct: false },
        { id: 'b', text: 'Through centralised control that coordinates both systems based on occupancy', correct: true },
        { id: 'c', text: 'By manual switching only', correct: false },
        { id: 'd', text: 'Through timer controls only', correct: false }
      ]
    },
    {
      question: "What is DALI used for?",
      options: [
        { id: 'a', text: 'HVAC control', correct: false },
        { id: 'b', text: 'Digital Addressable Lighting Interface', correct: true },
        { id: 'c', text: 'Security systems', correct: false },
        { id: 'd', text: 'Fire alarms', correct: false }
      ]
    },
    {
      question: "What is one benefit of integrating HVAC and lighting in BMS?",
      options: [
        { id: 'a', text: 'Increased energy consumption', correct: false },
        { id: 'b', text: 'Reduced energy bills and improved efficiency', correct: true },
        { id: 'c', text: 'More complex operation', correct: false },
        { id: 'd', text: 'Higher maintenance costs', correct: false }
      ]
    },
    {
      question: "True or False: BMS is commonly installed in residential homes.",
      options: [
        { id: 'a', text: 'True', correct: false },
        { id: 'b', text: 'False', correct: true }
      ]
    },
    {
      question: "What is one challenge of BMS integration in existing buildings?",
      options: [
        { id: 'a', text: 'No challenges exist', correct: false },
        { id: 'b', text: 'Retrofits can be disruptive and expensive', correct: true },
        { id: 'c', text: 'Systems work automatically without issues', correct: false },
        { id: 'd', text: 'No specialist knowledge required', correct: false }
      ]
    },
    {
      question: "A school wants to cut energy costs. Which BMS features would you recommend?",
      options: [
        { id: 'a', text: 'Only lighting control', correct: false },
        { id: 'b', text: 'Occupancy-based control, scheduling, and HVAC-lighting coordination', correct: true },
        { id: 'c', text: 'Only HVAC control', correct: false },
        { id: 'd', text: 'Manual controls only', correct: false }
      ]
    }
  ];

  const handleAnswerSelect = (optionId: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = optionId;
    setSelectedAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
      setShowResults(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers(new Array(10).fill(null));
    setShowResults(false);
    setQuizCompleted(false);
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      const correct = questions[index].options.find(opt => opt.correct);
      return answer === correct?.id ? score + 1 : score;
    }, 0);
  };

  const currentQ = questions[currentQuestion];
  const selectedAnswer = selectedAnswers[currentQuestion];
  const score = calculateScore();

  if (showResults) {
    return (
      <Card className="bg-elec-gray border-gray-700">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Trophy className="h-5 w-5 text-elec-yellow" />
            Quiz Results
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="text-4xl font-bold text-foreground">{score}/10</div>
          <div className="text-lg text-gray-300">
            {score >= 8 ? 'Excellent work!' : score >= 6 ? 'Good job!' : 'Keep studying!'}
          </div>
          <div className="space-y-2">
            {score >= 8 && (
              <p className="text-green-400">You have a strong understanding of BMS integration!</p>
            )}
            {score >= 6 && score < 8 && (
              <p className="text-yellow-400">Good grasp of the concepts. Review the areas you missed.</p>
            )}
            {score < 6 && (
              <p className="text-red-400">Consider reviewing the section content before proceeding.</p>
            )}
          </div>
          <Button onClick={resetQuiz} className="bg-elec-yellow text-elec-dark hover:bg-yellow-600">
            <RotateCcw className="h-4 w-4 mr-2" />
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
            <Trophy className="h-5 w-5 text-elec-yellow" />
            Section Quiz
          </span>
          <span className="text-sm text-gray-400">
            {currentQuestion + 1} / {questions.length}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">{currentQ.question}</h3>
          
          <div className="grid gap-3">
            {currentQ.options.map((option) => (
              <Button
                key={option.id}
                variant="outline"
                onClick={() => handleAnswerSelect(option.id)}
                className={`justify-start text-left h-auto p-3 border-gray-600 text-gray-300 hover:bg-elec-gray hover:text-foreground ${
                  selectedAnswer === option.id ? 'border-elec-yellow bg-elec-yellow/10' : ''
                }`}
              >
                {option.text}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center pt-4">
          <Button
            variant="outline"
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className="border-gray-600 text-gray-300 hover:bg-elec-gray"
          >
            Previous
          </Button>
          
          <div className="text-sm text-gray-400">
            {selectedAnswers.filter(a => a !== null).length} / {questions.length} answered
          </div>
          
          <Button
            onClick={nextQuestion}
            disabled={!selectedAnswer}
            className="bg-elec-yellow text-elec-dark hover:bg-yellow-600"
          >
            {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};