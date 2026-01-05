import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';

const quizData = [
  {
    question: "Which earthing system is most suitable for public EV charging stations?",
    answers: [
      "TN-S system with standard RCD protection",
      "TN-C-S (PME) system with equipotential bonding",
      "TT system with independent earth electrode",
      "TN-C-S system with additional earth electrode"
    ],
    correctAnswer: 2,
    explanation: "TT systems are most suitable for public EV charging as they eliminate PME restrictions and provide enhanced safety through complete isolation from the supply earthing system."
  },
  {
    question: "What is the maximum earth fault loop impedance (Zs) for a 32A Type B MCB in a TN system?",
    answers: [
      "0.87Ω",
      "1.44Ω", 
      "2.87Ω",
      "0.55Ω"
    ],
    correctAnswer: 1,
    explanation: "According to BS 7671 Appendix 3, the maximum Zs for a 32A Type B MCB is 1.44Ω to ensure disconnection within 0.4 seconds for circuits ≤32A."
  },
  {
    question: "For a TT earthing system with a 200Ω earth electrode, what is the minimum RCD rating required?",
    answers: [
      "10mA",
      "30mA",
      "100mA", 
      "300mA"
    ],
    correctAnswer: 1,
    explanation: "With 200Ω earth resistance, fault current would be 230V/200Ω = 1.15A. A 30mA RCD provides adequate sensitivity while ensuring reliable operation for EV charging circuits."
  },
  {
    question: "Which regulation specifically addresses PME restrictions for EV charging equipment?",
    answers: [
      "Regulation 411.3.2",
      "Regulation 722.411.4.1",
      "Regulation 544.1.1",
      "Regulation 531.2.4"
    ],
    correctAnswer: 1,
    explanation: "Regulation 722.411.4.1 specifically addresses the restrictions on using PME earthing for EV charging where accessible conductive parts may be touched simultaneously with earthed metallic masses."
  },
  {
    question: "What type of RCD is preferred for EV charging circuits to handle DC fault currents?",
    answers: [
      "Type AC",
      "Type A",
      "Type F", 
      "Type B"
    ],
    correctAnswer: 3,
    explanation: "Type B RCDs are preferred for EV charging as they can detect AC, pulsating DC, and smooth DC fault currents, providing comprehensive protection for modern EV charging systems."
  },
  {
    question: "What is the typical soil resistivity range where rod electrodes perform well?",
    answers: [
      "Less than 50 Ω⋅m",
      "50-200 Ω⋅m",
      "200-500 Ω⋅m",
      "Above 1000 Ω⋅m"
    ],
    correctAnswer: 1,
    explanation: "Rod electrodes typically perform well in soil with resistivity between 50-200 Ω⋅m. Higher resistivity soils may require multiple rods or alternative electrode designs to achieve adequate resistance values."
  },
  {
    question: "In a TN-C-S system, what is the main safety concern for outdoor EV charging?",
    answers: [
      "High earth fault loop impedance",
      "Open PEN conductor creating dangerous voltages",
      "Inadequate RCD sensitivity",
      "Poor equipotential bonding"
    ],
    correctAnswer: 1,
    explanation: "The main concern is open PEN conductor faults which can result in dangerous voltages appearing on the installation earthing system and exposed metalwork, creating serious shock risks."
  },
  {
    question: "What is the preferred minimum earth electrode resistance for commercial EV charging installations?",
    answers: [
      "1000Ω or less",
      "500Ω or less",
      "200Ω or less",
      "50Ω or less"
    ],
    correctAnswer: 3,
    explanation: "For commercial installations, 50Ω or less provides excellent performance, low touch voltages during faults, and good safety margins. This also allows for future expansion without resistance issues."
  },
  {
    question: "Which earthing system provides the most predictable fault current paths?",
    answers: [
      "TT system",
      "TN-S system",
      "TN-C-S system",
      "IT system"
    ],
    correctAnswer: 1,
    explanation: "TN-S systems provide the most predictable fault current paths as the protective earth conductor is separate from the neutral throughout, with direct connection to the supply transformer earth point."
  },
  {
    question: "What additional protection is required when using PME earthing for EV charging near metallic structures?",
    answers: [
      "Higher rated RCDs only",
      "Equipotential bonding of all metallic parts within reach",
      "Additional earth electrodes only",
      "Surge protection devices"
    ],
    correctAnswer: 1,
    explanation: "Equipotential bonding of all metallic structures within simultaneous reach is essential to prevent dangerous potential differences during fault conditions in PME systems."
  }
];

export const EVChargingModule4Section1Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    if (quizCompleted) return;
    
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newSelectedAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
      setQuizCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setQuizCompleted(false);
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === quizData[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  const getScoreColor = (score: number) => {
    const percentage = (score / quizData.length) * 100;
    if (percentage >= 80) return "text-green-400";
    if (percentage >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  if (showResults) {
    const score = calculateScore();
    const percentage = (score / quizData.length) * 100;

    return (
      <Card className="bg-elec-gray border-gray-700">
        <CardHeader>
          <CardTitle className="text-foreground">Quiz Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className={`text-3xl font-bold ${getScoreColor(score)}`}>
              {score}/{quizData.length}
            </div>
            <div className="text-gray-400 text-lg">
              {percentage.toFixed(0)}% Correct
            </div>
          </div>
          
          <div className="space-y-4">
            {quizData.map((question, index) => {
              const isCorrect = selectedAnswers[index] === question.correctAnswer;
              return (
                <div key={index} className="border border-gray-600 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-2">
                    {isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <div className="font-medium text-foreground mb-2">
                        {question.question}
                      </div>
                      <div className="text-sm text-gray-400 mb-2">
                        Your answer: {question.answers[selectedAnswers[index]]}
                      </div>
                      {!isCorrect && (
                        <div className="text-sm text-green-400 mb-2">
                          Correct answer: {question.answers[question.correctAnswer]}
                        </div>
                      )}
                      <div className="text-sm text-gray-300">
                        {question.explanation}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center">
            <Button 
              onClick={handleRestart}
              className="bg-elec-yellow text-black hover:bg-yellow-600"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Retake Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentQ = quizData[currentQuestion];
  const isAnswered = selectedAnswers[currentQuestion] !== undefined;

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-foreground">Knowledge Check</CardTitle>
          <Badge variant="outline" className="border-gray-600 text-gray-300">
            {currentQuestion + 1} of {quizData.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4">
            {currentQ.question}
          </h3>
          
          <div className="space-y-3">
            {currentQ.answers.map((answer, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-4 rounded-lg border transition-all ${
                  selectedAnswers[currentQuestion] === index
                    ? 'border-elec-yellow bg-yellow-600/10 text-foreground'
                    : 'border-gray-600 bg-gray-800/50 text-gray-300 hover:border-gray-500'
                }`}
                disabled={quizCompleted}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswers[currentQuestion] === index
                      ? 'border-elec-yellow bg-elec-yellow text-black'
                      : 'border-gray-500'
                  }`}>
                    {selectedAnswers[currentQuestion] === index && (
                      <CheckCircle className="h-4 w-4" />
                    )}
                  </div>
                  <span>{answer}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="bg-elec-gray border-gray-600 text-foreground hover:bg-gray-700"
          >
            Previous
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={!isAnswered}
            className="bg-elec-yellow text-black hover:bg-yellow-600"
          >
            {currentQuestion === quizData.length - 1 ? 'Finish Quiz' : 'Next'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};