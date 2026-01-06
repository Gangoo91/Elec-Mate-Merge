
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

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (currentQuestion >= questions.length) {
    const scorePercentage = (score / questions.length) * 100;
    const isGoodScore = scorePercentage >= 50;

    return (
      <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-cyan-500/20 overflow-hidden relative animate-fade-in">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="text-white flex items-center gap-3">
            <div className={`p-2.5 rounded-xl bg-gradient-to-br ${isGoodScore ? 'from-green-500/20 to-green-500/5 border-green-500/30' : 'from-orange-500/20 to-orange-500/5 border-orange-500/30'} border`}>
              <Globe className={`h-5 w-5 ${isGoodScore ? 'text-green-400' : 'text-orange-400'}`} />
            </div>
            Quiz Complete!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 relative">
          <div className={`p-6 rounded-xl text-center ${isGoodScore ? 'bg-green-500/10 border border-green-500/20' : 'bg-orange-500/10 border border-orange-500/20'}`}>
            <div className={`text-4xl font-bold mb-2 ${isGoodScore ? 'text-green-400' : 'text-orange-400'}`}>
              {score}/{questions.length}
            </div>
            <p className="text-white/70">
              {isGoodScore
                ? "Great job! You have a good understanding of UK workplace culture."
                : "Keep learning! Review the materials and try again."}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={resetQuiz} className="h-11 bg-cyan-500 hover:bg-cyan-500/90 text-black touch-manipulation active:scale-95 transition-all">
              Take Again
            </Button>
            <Button variant="outline" onClick={onBack} className="h-11 border-white/20 hover:border-cyan-500/50 hover:bg-cyan-500/10 touch-manipulation active:scale-95 transition-all">
              Back to Tools
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-cyan-500/20 overflow-hidden relative animate-fade-in">
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <CardHeader className="relative">
        <div className="flex items-center justify-between mb-2">
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 border border-cyan-500/30">
              <Globe className="h-5 w-5 text-cyan-400" />
            </div>
            Cultural Awareness Quiz
          </CardTitle>
          <span className="text-sm text-white/60">Question {currentQuestion + 1}/{questions.length}</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 transition-all duration-500 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-4 relative">
        <div className="p-4 rounded-xl bg-white/10 border border-white/10">
          <p className="text-white/90 font-medium">{question.question}</p>
        </div>

        <RadioGroup value={selectedAnswer} onValueChange={handleAnswerSelect} className="space-y-2">
          {question.options.map((option) => (
            <div
              key={option.id}
              className={`flex items-start space-x-3 p-3 rounded-xl border transition-all cursor-pointer ${
                selectedAnswer === option.id
                  ? 'bg-cyan-500/10 border-cyan-500/40'
                  : 'bg-white/10 border-white/10 hover:border-white/20'
              }`}
            >
              <RadioGroupItem value={option.id} id={option.id} className="mt-0.5" />
              <Label htmlFor={option.id} className="flex-1 text-sm text-white/80 cursor-pointer">
                {option.text}
              </Label>
            </div>
          ))}
        </RadioGroup>

        {showResult && selectedOption && (
          <div className={`mt-4 p-4 rounded-xl ${selectedOption.correct ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg ${selectedOption.correct ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                {selectedOption.correct ? (
                  <CheckCircle className="h-4 w-4 text-green-400" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-400" />
                )}
              </div>
              <div>
                <h5 className={`font-semibold ${selectedOption.correct ? 'text-green-400' : 'text-red-400'}`}>
                  {selectedOption.correct ? "Correct!" : "Not quite right"}
                </h5>
                <p className="text-sm text-white/70 mt-1">
                  {question.explanation}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2 pt-4">
          {!showResult && selectedAnswer && (
            <Button onClick={submitAnswer} className="h-11 bg-cyan-500 hover:bg-cyan-500/90 text-black touch-manipulation active:scale-95 transition-all">
              Submit Answer
            </Button>
          )}
          {showResult && currentQuestion < questions.length - 1 && (
            <Button onClick={nextQuestion} className="h-11 bg-cyan-500 hover:bg-cyan-500/90 text-black touch-manipulation active:scale-95 transition-all">
              Next Question
            </Button>
          )}
          {showResult && currentQuestion === questions.length - 1 && (
            <Button onClick={() => setCurrentQuestion(questions.length)} className="h-11 bg-green-500 hover:bg-green-500/90 text-white touch-manipulation active:scale-95 transition-all">
              View Results
            </Button>
          )}
          <Button variant="outline" onClick={onBack} className="h-11 border-white/20 hover:border-cyan-500/50 hover:bg-cyan-500/10 touch-manipulation active:scale-95 transition-all">
            Back to Tools
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CulturalAwarenessQuiz;
