import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, RotateCcw, CheckCircle, X, SkipForward, Clock, Target, TrendingUp } from "lucide-react";

interface Flashcard {
  id: string;
  front: string;
  back: string;
  category?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

interface FlashcardSessionProps {
  setTitle: string;
  cards: Flashcard[];
  onExit: () => void;
}

type AnswerResult = 'correct' | 'incorrect' | 'skipped';

const FlashcardSession = ({ setTitle, cards, onExit }: FlashcardSessionProps) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [sessionStats, setSessionStats] = useState({
    correct: 0,
    incorrect: 0,
    skipped: 0
  });
  const [sessionStartTime] = useState(Date.now());
  const [studyTime, setStudyTime] = useState(0);

  // Update study time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setStudyTime(Math.floor((Date.now() - sessionStartTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [sessionStartTime]);

  const currentCard = cards[currentCardIndex];
  const progress = ((currentCardIndex + (showAnswer ? 0.5 : 0)) / cards.length) * 100;
  const isLastCard = currentCardIndex === cards.length - 1;

  const handleAnswer = (result: AnswerResult) => {
    setSessionStats(prev => ({
      ...prev,
      [result]: prev[result] + 1
    }));

    if (isLastCard) {
      // Show final results
      handleSessionComplete();
    } else {
      setCurrentCardIndex(prev => prev + 1);
      setShowAnswer(false);
    }
  };

  const handleSessionComplete = () => {
    // Here you could save the session results to localStorage or database
    console.log('Session completed:', sessionStats);
    onExit();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleSkip = () => {
    handleAnswer('skipped');
  };

  const totalAnswered = sessionStats.correct + sessionStats.incorrect + sessionStats.skipped;
  const accuracy = totalAnswered > 0 ? Math.round((sessionStats.correct / totalAnswered) * 100) : 0;

  if (isLastCard && showAnswer) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <CheckCircle className="h-8 w-8 text-green-400" />
            <h1 className="text-3xl font-bold">Session Complete!</h1>
          </div>
          <p className="text-muted-foreground">Great work studying {setTitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-green-500/20 bg-elec-gray">
            <CardHeader className="pb-3">
              <CardTitle className="text-center flex items-center justify-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                Correct
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-3xl font-bold text-green-400">{sessionStats.correct}</div>
            </CardContent>
          </Card>

          <Card className="border-red-500/20 bg-elec-gray">
            <CardHeader className="pb-3">
              <CardTitle className="text-center flex items-center justify-center gap-2">
                <X className="h-5 w-5 text-red-400" />
                Incorrect
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-3xl font-bold text-red-400">{sessionStats.incorrect}</div>
            </CardContent>
          </Card>

          <Card className="border-yellow-500/20 bg-elec-gray">
            <CardHeader className="pb-3">
              <CardTitle className="text-center flex items-center justify-center gap-2">
                <SkipForward className="h-5 w-5 text-yellow-400" />
                Skipped
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-3xl font-bold text-yellow-400">{sessionStats.skipped}</div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-elec-yellow" />
              Session Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-elec-yellow">{accuracy}%</div>
                <div className="text-sm text-muted-foreground">Accuracy</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-elec-yellow">{formatTime(studyTime)}</div>
                <div className="text-sm text-muted-foreground">Study Time</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-elec-yellow">{cards.length}</div>
                <div className="text-sm text-muted-foreground">Total Cards</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-elec-yellow">{Math.round(cards.length / (studyTime / 60)) || 0}</div>
                <div className="text-sm text-muted-foreground">Cards/Min</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center gap-4">
          <Button onClick={onExit} className="bg-elec-yellow/10 hover:bg-elec-yellow hover:text-black">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Sets
          </Button>
          <Button 
            variant="outline" 
            onClick={() => window.location.reload()}
            className="border-elec-yellow/30"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Study Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Header with progress */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onExit}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Exit
          </Button>
          <div>
            <h1 className="text-xl font-bold">{setTitle}</h1>
            <p className="text-sm text-muted-foreground">
              Card {currentCardIndex + 1} of {cards.length}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {formatTime(studyTime)}
          </div>
          <div className="flex items-center gap-1">
            <Target className="h-4 w-4" />
            {accuracy}% accuracy
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="space-y-2">
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Progress: {Math.round(progress)}%</span>
          <span>{sessionStats.correct}✓ {sessionStats.incorrect}✗ {sessionStats.skipped}⏭</span>
        </div>
      </div>

      {/* Flashcard */}
      <Card className="border-elec-yellow/20 bg-elec-gray min-h-[400px]">
        <CardHeader>
          <CardTitle className="text-center text-lg">
            {showAnswer ? 'Answer' : 'Question'}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center min-h-[300px]">
          <div className="text-center space-y-4">
            <div className="text-xl leading-relaxed">
              {showAnswer ? currentCard.back : currentCard.front}
            </div>
            
            {currentCard.category && (
              <div className="text-sm text-muted-foreground">
                Category: {currentCard.category}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Action buttons */}
      <div className="flex justify-center gap-4">
        {!showAnswer ? (
          <>
            <Button variant="outline" onClick={handleSkip} className="border-yellow-500/30">
              <SkipForward className="mr-2 h-4 w-4" />
              Skip
            </Button>
            <Button onClick={handleShowAnswer} className="bg-elec-yellow/10 hover:bg-elec-yellow hover:text-black">
              Show Answer
            </Button>
          </>
        ) : (
          <>
            <Button 
              variant="outline" 
              onClick={() => handleAnswer('incorrect')}
              className="border-red-500/30 text-red-400 hover:bg-red-500/10"
            >
              <X className="mr-2 h-4 w-4" />
              Incorrect
            </Button>
            <Button 
              onClick={() => handleAnswer('correct')}
              className="bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/30"
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Correct
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default FlashcardSession;
