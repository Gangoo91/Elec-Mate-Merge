import { useState } from 'react';
import { HelpCircle, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "What is the purpose of emergency lighting layout drawings?",
    options: [
      "To provide decorative installation plans",
      "To bridge design intent and installation with visual compliance documentation",
      "To estimate project costs only",
      "To show electrical supply arrangements"
    ],
    correctAnswer: 1,
    explanation: "Layout drawings bridge the gap between design intent and installation, providing essential visual documentation for compliance and installation guidance."
  },
  {
    id: 2,
    question: "Name two groups who rely on these drawings for compliance and inspection.",
    options: [
      "Architects and quantity surveyors",
      "Inspectors and fire officers",
      "Suppliers and manufacturers",
      "Accountants and project managers"
    ],
    correctAnswer: 1,
    explanation: "Inspectors and fire officers rely on layout drawings to verify compliance with fire safety regulations and building standards."
  },
  {
    id: 3,
    question: "What information must be shown about escape routes?",
    options: [
      "Only the width measurements",
      "Escape routes must be clearly marked and shown in bold",
      "Just the door locations",
      "Only the floor materials"
    ],
    correctAnswer: 1,
    explanation: "Escape routes must be clearly marked on drawings and shown in bold to make the evacuation paths immediately obvious to all users."
  },
  {
    id: 4,
    question: "Why should luminaire types be indicated on drawings?",
    options: [
      "For aesthetic purposes only",
      "To show power consumption",
      "To identify maintained, non-maintained, exit signs, and bulkheads for proper installation and compliance",
      "To calculate installation time"
    ],
    correctAnswer: 2,
    explanation: "Luminaire types must be indicated to ensure correct installation of maintained, non-maintained, exit signs, and bulkheads according to design specifications."
  },
  {
    id: 5,
    question: "What symbol must be used for exit signage?",
    options: [
      "Arrow symbols only",
      "Text-based EXIT signs",
      "The running man pictogram with arrows",
      "Red circle symbols"
    ],
    correctAnswer: 2,
    explanation: "BS EN ISO 7010 requires the running man pictogram with arrows for exit signage to ensure universal recognition and compliance."
  },
  {
    id: 6,
    question: "What is the difference between design drawings and as-built drawings?",
    options: [
      "No difference, they are the same",
      "Design shows intended positions before work; as-built records actual installation",
      "Design drawings are in colour, as-built are black and white",
      "Design drawings show electrical details, as-built show structural details"
    ],
    correctAnswer: 1,
    explanation: "Design drawings show intended positions before work begins, while as-built drawings record the actual installation including any variations made during construction."
  },
  {
    id: 7,
    question: "Why must as-built drawings be handed over to the client?",
    options: [
      "For warranty purposes only",
      "To form part of permanent fire safety records and enable future maintenance",
      "For insurance claims",
      "For decoration purposes"
    ],
    correctAnswer: 1,
    explanation: "As-built drawings form part of the building's permanent fire safety records and are essential for compliance, future maintenance, and modifications."
  },
  {
    id: 8,
    question: "What is a common failure during fire audits regarding layout drawings?",
    options: [
      "Drawings are too detailed",
      "Missing or outdated as-built documentation",
      "Drawings are in the wrong scale",
      "Too many symbols used"
    ],
    correctAnswer: 1,
    explanation: "Missing or outdated as-built documentation is a common compliance failure, as changes made during installation or refurbishment are not properly recorded."
  },
  {
    id: 9,
    question: "Why should drawings be kept uncluttered and scaled properly?",
    options: [
      "To save printing costs",
      "For aesthetic appeal",
      "To improve readability and accurate interpretation by contractors and inspectors",
      "To reduce file sizes"
    ],
    correctAnswer: 2,
    explanation: "Uncluttered, properly scaled drawings improve readability and ensure accurate interpretation by contractors and inspectors, reducing installation errors."
  },
  {
    id: 10,
    question: "In what file formats should digital layout drawings typically be supplied?",
    options: [
      "Only proprietary CAD formats",
      "PDF and DWG for accessibility and standard compliance",
      "Image files only (JPG, PNG)",
      "Spreadsheet formats"
    ],
    correctAnswer: 1,
    explanation: "PDF and DWG formats should be supplied as they are standard formats that ensure accessibility to clients and compliance with industry requirements."
  }
];

export const LayoutDrawingsQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(new Array(questions.length).fill(-1));
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
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
    setSelectedAnswers(new Array(questions.length).fill(-1));
    setShowResults(false);
    setQuizCompleted(false);
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === questions[index].correctAnswer ? 1 : 0);
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
    const percentage = (score / questions.length) * 100;

    return (
      <Card className="bg-gradient-to-br from-elec-gray to-[#1a1a1a] border border-gray-600 shadow-lg">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-elec-yellow drop-shadow-md" />
            Quiz Results: Layout Drawings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <div className={`text-4xl font-bold ${getScoreColor(score)} mb-2`}>
              {score}/{questions.length}
            </div>
            <div className={`text-2xl ${getScoreColor(score)} mb-4`}>
              {percentage.toFixed(0)}%
            </div>
            <p className="text-gray-300">
              {percentage >= 80 ? 'Excellent work! You have a strong understanding of emergency lighting layout drawings.' :
               percentage >= 60 ? 'Good effort! Review the areas you missed to strengthen your knowledge.' :
               'Keep studying! Review the content and retake the quiz to improve your understanding.'}
            </p>
          </div>

          <div className="space-y-4 mb-6">
            {questions.map((question, index) => {
              const userAnswer = selectedAnswers[index];
              const isCorrect = userAnswer === question.correctAnswer;
              
              return (
                <div key={question.id} className="p-4 bg-gradient-to-br from-gray-700/50 to-gray-800/30 border border-gray-600/50 rounded-lg">
                  <div className="flex items-start gap-3 mb-2">
                    {isCorrect ? 
                      <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" /> : 
                      <XCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                    }
                    <div className="flex-1">
                      <p className="text-foreground font-medium mb-2">{question.question}</p>
                      <p className="text-sm text-gray-300 mb-2">
                        <span className="font-medium">Your answer:</span> {question.options[userAnswer]} 
                        {!isCorrect && (
                          <span className="text-red-400"> ✗</span>
                        )}
                      </p>
                      {!isCorrect && (
                        <p className="text-sm text-gray-300 mb-2">
                          <span className="font-medium">Correct answer:</span> {question.options[question.correctAnswer]} ✓
                        </p>
                      )}
                      <p className="text-sm text-gray-400">{question.explanation}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center">
            <Button onClick={handleRestart} className="bg-elec-yellow text-elec-dark hover:bg-yellow-600">
              <RotateCcw className="mr-2 h-4 w-4" />
              Retake Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Card className="bg-gradient-to-br from-elec-gray to-[#1a1a1a] border border-gray-600 shadow-lg">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-elec-yellow drop-shadow-md" />
          Quiz: Layout Drawings
        </CardTitle>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-elec-yellow h-2 rounded-full transition-all duration-300" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-gray-300 text-sm">
          Question {currentQuestion + 1} of {questions.length}
        </p>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h3 className="text-foreground text-lg font-semibold mb-4">{question.question}</h3>
          
          <RadioGroup 
            value={selectedAnswers[currentQuestion]?.toString()} 
            onValueChange={(value) => handleAnswerSelect(parseInt(value))}
          >
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-700/30 transition-colors">
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="text-gray-300 cursor-pointer flex-1">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="flex justify-between">
          <Button 
            onClick={handlePrevious} 
            disabled={currentQuestion === 0}
            variant="outline" 
            className="border-gray-600 text-foreground hover:bg-gray-700"
          >
            Previous
          </Button>
          
          <Button 
            onClick={handleNext}
            disabled={selectedAnswers[currentQuestion] === -1}
            className="bg-elec-yellow text-elec-dark hover:bg-yellow-600"
          >
            {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};