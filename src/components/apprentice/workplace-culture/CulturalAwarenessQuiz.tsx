
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Globe, CheckCircle, XCircle } from "lucide-react";

interface CulturalAwarenessQuizProps {
  onBack: () => void;
}

const CulturalAwarenessQuiz = ({ onBack }: CulturalAwarenessQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const questions = [
    {
      question: "What's the most appropriate way to greet a new colleague on a UK construction site?",
      options: [
        { id: "a", text: "A firm handshake and 'Good morning'", correct: true },
        { id: "b", text: "A casual wave from across the site", correct: false },
        { id: "c", text: "Wait for them to approach you first", correct: false },
        { id: "d", text: "Just nod and continue working", correct: false }
      ],
      explanation: "A firm handshake with a polite greeting shows professionalism and respect in UK workplace culture."
    },
    {
      question: "When having tea breaks on site, what's considered good etiquette?",
      options: [
        { id: "a", text: "Take breaks whenever you want", correct: false },
        { id: "b", text: "Offer to make tea for others when it's your turn", correct: true },
        { id: "c", text: "Always bring your own tea and don't share", correct: false },
        { id: "d", text: "Skip tea breaks to show dedication", correct: false }
      ],
      explanation: "Taking turns to make tea for the team is a traditional part of UK workplace culture that builds camaraderie."
    }
  ];

  const handleAnswerSelect = (answerId: string) => {
    setSelectedAnswer(answerId);
  };

  const submitAnswer = () => {
    const question = questions[currentQuestion];
    const isCorrect = question.options.find(opt => opt.id === selectedAnswer)?.correct;
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setShowResult(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
      setShowResult(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setShowResult(false);
    setScore(0);
  };

  const question = questions[currentQuestion];
  const selectedOption = question.options.find(opt => opt.id === selectedAnswer);

  if (currentQuestion >= questions.length) {
    return (
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Quiz Complete!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-white">
            You scored {score} out of {questions.length}!
          </p>
          <div className="flex gap-2">
            <Button onClick={resetQuiz}>Take Again</Button>
            <Button variant="outline" onClick={onBack}>Back to Tools</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="text-elec-yellow flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Cultural Awareness Quiz - Question {currentQuestion + 1} of {questions.length}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-white font-medium">{question.question}</p>
        
        <RadioGroup value={selectedAnswer} onValueChange={handleAnswerSelect}>
          {question.options.map((option) => (
            <div key={option.id} className="flex items-start space-x-2">
              <RadioGroupItem value={option.id} id={option.id} />
              <Label htmlFor={option.id} className="flex-1 text-sm text-white cursor-pointer">
                {option.text}
              </Label>
            </div>
          ))}
        </RadioGroup>

        {showResult && selectedOption && (
          <div className="mt-4 p-4 border border-elec-yellow/30 rounded-lg">
            <div className="flex items-start gap-2">
              {selectedOption.correct ? (
                <CheckCircle className="h-5 w-5 mt-0.5 text-green-400" />
              ) : (
                <XCircle className="h-5 w-5 mt-0.5 text-red-400" />
              )}
              <div>
                <h5 className={`font-medium ${selectedOption.correct ? 'text-green-400' : 'text-red-400'}`}>
                  {selectedOption.correct ? "Correct!" : "Not quite right"}
                </h5>
                <p className="text-sm text-muted-foreground mt-1">
                  {question.explanation}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-2 pt-4">
          {!showResult && selectedAnswer && (
            <Button onClick={submitAnswer}>Submit Answer</Button>
          )}
          {showResult && currentQuestion < questions.length - 1 && (
            <Button onClick={nextQuestion}>Next Question</Button>
          )}
          {showResult && currentQuestion === questions.length - 1 && (
            <Button onClick={() => setCurrentQuestion(questions.length)}>View Results</Button>
          )}
          <Button variant="outline" onClick={onBack}>Back to Tools</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CulturalAwarenessQuiz;
