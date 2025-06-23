
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, CheckSquare, Clock, RotateCcw } from "lucide-react";

interface CulturalAwarenessQuizProps {
  onBack: () => void;
}

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
    question: "What's the most appropriate way to address a senior electrician you've just met on site?",
    options: [
      "Hey mate, how's it going?",
      "Good morning, I'm [your name], the new apprentice",
      "Alright boss, what do you want me to do?",
      "Hi there, nice to meet you"
    ],
    correctAnswer: 1,
    explanation: "A professional introduction that includes your name and role shows respect and helps establish your identity on site."
  },
  {
    id: 2,
    question: "During a tea break, what's the best way to join the conversation?",
    options: [
      "Jump in with your own stories immediately",
      "Sit quietly and don't say anything",
      "Listen first, then contribute when appropriate",
      "Start talking about your college coursework"
    ],
    correctAnswer: 2,
    explanation: "Listening first helps you understand the group dynamics and contribute meaningfully to the conversation."
  },
  {
    id: 3,
    question: "If you make a mistake, what's the best approach?",
    options: [
      "Hide it and hope no one notices",
      "Blame the tools or materials",
      "Admit it immediately and ask how to fix it",
      "Wait for someone else to find it"
    ],
    correctAnswer: 2,
    explanation: "Honesty and taking responsibility shows maturity and helps prevent larger problems. Safety is always the priority."
  },
  {
    id: 4,
    question: "What's considered proper site etiquette when using tools?",
    options: [
      "Use any tool you find lying around",
      "Ask before borrowing someone's personal tools",
      "Take tools from the van without asking",
      "Return tools whenever you feel like it"
    ],
    correctAnswer: 1,
    explanation: "Respecting others' tools and asking permission shows professionalism and helps maintain good working relationships."
  },
  {
    id: 5,
    question: "How should you respond to workplace banter or jokes?",
    options: [
      "Always laugh even if you don't understand",
      "Never participate in any banter",
      "Use good judgment - join in appropriately but know your boundaries",
      "Try to be the funniest person on site"
    ],
    correctAnswer: 2,
    explanation: "Workplace banter can build relationships, but it's important to be respectful and professional while participating."
  }
];

const CulturalAwarenessQuiz = ({ onBack }: CulturalAwarenessQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleAnswerSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleNextQuestion = () => {
    if (selectedOption !== null) {
      const newAnswers = [...selectedAnswers];
      newAnswers[currentQuestion] = selectedOption;
      setSelectedAnswers(newAnswers);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        setShowResults(true);
      }
    }
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  const getScoreMessage = (score: number) => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return "Excellent! You have a strong understanding of workplace culture.";
    if (percentage >= 60) return "Good job! You're on the right track with most workplace situations.";
    if (percentage >= 40) return "Not bad, but there's room for improvement in understanding workplace culture.";
    return "Consider reviewing workplace etiquette and cultural norms before starting on site.";
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setSelectedOption(null);
  };

  if (showResults) {
    const score = calculateScore();
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Tools
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-white">Quiz Results</h2>
            <p className="text-muted-foreground">Cultural Awareness Quiz Complete</p>
          </div>
        </div>

        <Card className="border-green-500/20 bg-green-500/10">
          <CardHeader>
            <CardTitle className="text-green-300 text-center">Your Score</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-6xl font-bold text-green-400 mb-4">
              {score}/{questions.length}
            </div>
            <div className="text-2xl text-green-300 mb-4">
              {Math.round((score / questions.length) * 100)}%
            </div>
            <p className="text-green-200">{getScoreMessage(score)}</p>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-elec-yellow">Review Your Answers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {questions.map((question, index) => (
                <div key={question.id} className="border border-muted/20 rounded-lg p-4">
                  <h4 className="font-medium text-white mb-3">{question.question}</h4>
                  <div className="space-y-2 mb-3">
                    {question.options.map((option, optionIndex) => (
                      <div
                        key={optionIndex}
                        className={`p-2 rounded text-sm ${
                          optionIndex === question.correctAnswer
                            ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                            : selectedAnswers[index] === optionIndex && optionIndex !== question.correctAnswer
                            ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                            : 'text-muted-foreground'
                        }`}
                      >
                        {option}
                        {optionIndex === question.correctAnswer && ' ✓'}
                        {selectedAnswers[index] === optionIndex && optionIndex !== question.correctAnswer && ' ✗'}
                      </div>
                    ))}
                  </div>
                  <div className="bg-blue-500/10 rounded p-3">
                    <p className="text-blue-200 text-sm"><strong>Explanation:</strong> {question.explanation}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button onClick={resetQuiz} className="flex items-center gap-2">
            <RotateCcw className="h-4 w-4" />
            Retake Quiz
          </Button>
          <Button variant="outline" onClick={onBack}>
            Back to Tools
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Tools
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-white">Cultural Awareness Quiz</h2>
          <p className="text-muted-foreground">Test your workplace culture knowledge</p>
        </div>
      </div>

      <Card className="border-blue-500/20 bg-blue-500/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-blue-300 flex items-center gap-2">
              <CheckSquare className="h-5 w-5" />
              Question {currentQuestion + 1} of {questions.length}
            </CardTitle>
            <div className="flex items-center gap-2 text-blue-300">
              <Clock className="h-4 w-4" />
              <span className="text-sm">No time limit</span>
            </div>
          </div>
          <Progress 
            value={((currentQuestion) / questions.length) * 100} 
            className="mt-4"
          />
        </CardHeader>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-white text-lg">
            {questions[currentQuestion].question}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className={`w-full text-left p-4 h-auto whitespace-normal justify-start ${
                  selectedOption === index ? 'border-elec-yellow bg-elec-yellow/10' : ''
                }`}
                onClick={() => handleAnswerSelect(index)}
              >
                <span className="block">{option}</span>
              </Button>
            ))}
          </div>
          
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-muted/20">
            <span className="text-sm text-muted-foreground">
              Select an answer to continue
            </span>
            <Button 
              onClick={handleNextQuestion}
              disabled={selectedOption === null}
            >
              {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CulturalA
