import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';

const BS7671Module8Section2Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      question: "What's the purpose of an MEIWC?",
      options: ["New installations", "Minor electrical works", "Periodic inspection", "Major alterations"],
      correct: 1,
      explanation: "MEIWC (Minor Electrical Installation Works Certificate) is used for minor works like adding sockets or lighting points to existing circuits."
    },
    {
      question: "When do you use a disconnection time chart?",
      options: ["For voltage drop", "For cable sizing", "For fault protection verification", "For load calculations"],
      correct: 2,
      explanation: "Disconnection time charts are used to verify that protective devices provide adequate fault protection within required time limits."
    },
    {
      question: "What's listed on a visual inspection checklist?",
      options: ["Only test results", "Equipment condition and compliance items", "Load calculations", "Cable specifications"],
      correct: 1,
      explanation: "Visual inspection checklists include items like equipment condition, proper installation, labelling, and compliance with regulations."
    },
    {
      question: "Name a chart used for derating cable capacity.",
      options: ["Zs tables", "Grouping factor (Cg) charts", "Voltage drop tables", "Time/current curves"],
      correct: 1,
      explanation: "Grouping factor (Cg) charts show derating factors when multiple cables are grouped together, reducing their current-carrying capacity."
    },
    {
      question: "How do checklists assist with audits?",
      options: ["They replace testing", "They provide systematic verification", "They reduce costs", "They speed up work"],
      correct: 1,
      explanation: "Checklists provide systematic verification that all required checks have been completed, making audits more thorough and consistent."
    }
  ];

  const handleAnswerSelect = (value: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = value;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
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
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (parseInt(answer) === questions[index].correct ? 1 : 0);
    }, 0);
  };

  const getScoreColor = (score: number) => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground text-center">Quiz Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className={`text-4xl font-bold ${getScoreColor(score)}`}>
              {score}/{questions.length}
            </div>
            <div className={`text-xl ${getScoreColor(score)}`}>
              {percentage}%
            </div>
          </div>

          <div className="space-y-4">
            {questions.map((question, index) => {
              const userAnswer = parseInt(selectedAnswers[index]);
              const isCorrect = userAnswer === question.correct;
              
              return (
                <div key={index} className="bg-elec-dark p-4 rounded-md border border-gray-600">
                  <div className="flex items-start gap-3">
                    {isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <h4 className="text-foreground font-medium mb-2">
                        Question {index + 1}: {question.question}
                      </h4>
                      <p className={`text-sm mb-2 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                        Your answer: {question.options[userAnswer]}
                      </p>
                      {!isCorrect && (
                        <p className="text-sm text-green-400 mb-2">
                          Correct answer: {question.options[question.correct]}
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
              onClick={handleRestart}
              className="bg-elec-yellow text-elec-dark hover:bg-yellow-600"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Retake Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground">Knowledge Check</CardTitle>
        <div className="flex justify-between text-sm text-gray-400">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-elec-yellow h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4">
            {questions[currentQuestion].question}
          </h3>
          
          <RadioGroup 
            value={selectedAnswers[currentQuestion] || ""} 
            onValueChange={handleAnswerSelect}
            className="space-y-3"
          >
            {questions[currentQuestion].options.map((option, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-md hover:bg-elec-dark transition-colors">
                <RadioGroupItem 
                  value={index.toString()} 
                  id={`option-${index}`}
                  className="border-gray-400 text-elec-yellow"
                />
                <Label 
                  htmlFor={`option-${index}`} 
                  className="text-gray-300 cursor-pointer flex-1"
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="flex justify-between pt-4">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-elec-dark"
          >
            Previous
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={!selectedAnswers[currentQuestion]}
            className="bg-elec-yellow text-elec-dark hover:bg-yellow-600"
          >
            {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BS7671Module8Section2Quiz;