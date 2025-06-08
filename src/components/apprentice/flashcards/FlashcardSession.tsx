
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  RotateCcw, 
  Shuffle, 
  ChevronLeft, 
  ChevronRight, 
  Home, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Target,
  TrendingUp,
  RefreshCw
} from "lucide-react";

interface FlashcardData {
  front: string;
  back: string;
  category?: string;
  difficulty?: string;
}

interface FlashcardSessionProps {
  setTitle: string;
  cards: FlashcardData[];
  onExit: () => void;
}

interface CardStats {
  correct: number;
  incorrect: number;
  skipped: number;
}

const FlashcardSession = ({ setTitle, cards, onExit }: FlashcardSessionProps) => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [shuffledCards, setShuffledCards] = useState(cards);
  const [answeredCards, setAnsweredCards] = useState<Set<number>>(new Set());
  const [cardStats, setCardStats] = useState<CardStats>({ correct: 0, incorrect: 0, skipped: 0 });
  const [sessionStartTime, setSessionStartTime] = useState<number>(Date.now());
  const [studyMode, setStudyMode] = useState<'study' | 'quiz'>('study');
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    setSessionStartTime(Date.now());
  }, []);

  const shuffleCards = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setShuffledCards(shuffled);
    setCurrentCard(0);
    setIsFlipped(false);
    setAnsweredCards(new Set());
    setCardStats({ correct: 0, incorrect: 0, skipped: 0 });
  };

  const nextCard = () => {
    if (currentCard < shuffledCards.length - 1) {
      setCurrentCard(prev => prev + 1);
      setIsFlipped(false);
      setShowAnswer(false);
    }
  };

  const previousCard = () => {
    if (currentCard > 0) {
      setCurrentCard(prev => prev - 1);
      setIsFlipped(false);
      setShowAnswer(false);
    }
  };

  const markAsAnswered = (result?: 'correct' | 'incorrect' | 'skipped') => {
    setAnsweredCards(prev => new Set(prev).add(currentCard));
    if (result && studyMode === 'quiz') {
      setCardStats(prev => ({
        ...prev,
        [result]: prev[result] + 1
      }));
    }
  };

  const handleCardResponse = (response: 'correct' | 'incorrect' | 'skip') => {
    markAsAnswered(response);
    if (response === 'skip') {
      setCardStats(prev => ({ ...prev, skipped: prev.skipped + 1 }));
    }
    nextCard();
  };

  const toggleStudyMode = () => {
    setStudyMode(prev => prev === 'study' ? 'quiz' : 'study');
    setShowAnswer(false);
    setIsFlipped(false);
  };

  const progress = ((currentCard + 1) / shuffledCards.length) * 100;
  const card = shuffledCards[currentCard];
  const sessionTime = Math.floor((Date.now() - sessionStartTime) / 1000 / 60);
  const cardsPerMinute = sessionTime > 0 ? Math.round(answeredCards.size / sessionTime) : 0;

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500/20 text-green-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'hard': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Enhanced Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-bold">{setTitle}</h2>
            <Badge variant="outline" className="text-xs">
              {studyMode === 'study' ? 'Study Mode' : 'Quiz Mode'}
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Card {currentCard + 1} of {shuffledCards.length} • {sessionTime} min • {cardsPerMinute} cards/min
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={toggleStudyMode}
            className="border-elec-yellow/20"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            {studyMode === 'study' ? 'Quiz Mode' : 'Study Mode'}
          </Button>
          <Button variant="outline" onClick={onExit}>
            <Home className="mr-2 h-4 w-4" />
            Exit Session
          </Button>
        </div>
      </div>

      {/* Progress Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-elec-yellow/20 bg-elec-gray/50">
          <CardContent className="p-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Progress</span>
              <span className="text-elec-yellow font-medium">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>
        
        <Card className="border-elec-yellow/20 bg-elec-gray/50">
          <CardContent className="p-4 text-center">
            <Target className="h-5 w-5 text-elec-yellow mx-auto mb-1" />
            <div className="text-lg font-bold text-white">{answeredCards.size}</div>
            <div className="text-xs text-muted-foreground">Cards Reviewed</div>
          </CardContent>
        </Card>
        
        <Card className="border-elec-yellow/20 bg-elec-gray/50">
          <CardContent className="p-4 text-center">
            <Clock className="h-5 w-5 text-elec-yellow mx-auto mb-1" />
            <div className="text-lg font-bold text-white">{sessionTime}m</div>
            <div className="text-xs text-muted-foreground">Study Time</div>
          </CardContent>
        </Card>
      </div>

      {/* Quiz Mode Stats */}
      {studyMode === 'quiz' && (cardStats.correct + cardStats.incorrect + cardStats.skipped > 0) && (
        <Card className="border-elec-yellow/20 bg-elec-gray/50">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-elec-yellow" />
              Quiz Statistics
            </h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <CheckCircle className="h-5 w-5 text-green-400 mx-auto mb-1" />
                <div className="text-lg font-bold text-green-400">{cardStats.correct}</div>
                <div className="text-xs text-muted-foreground">Correct</div>
              </div>
              <div>
                <XCircle className="h-5 w-5 text-red-400 mx-auto mb-1" />
                <div className="text-lg font-bold text-red-400">{cardStats.incorrect}</div>
                <div className="text-xs text-muted-foreground">Incorrect</div>
              </div>
              <div>
                <RotateCcw className="h-5 w-5 text-yellow-400 mx-auto mb-1" />
                <div className="text-lg font-bold text-yellow-400">{cardStats.skipped}</div>
                <div className="text-xs text-muted-foreground">Skipped</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Enhanced Flashcard */}
      <div className="flex justify-center">
        <Card 
          className="w-full max-w-3xl h-96 cursor-pointer transition-all duration-300 hover:scale-105 border-elec-yellow/20 bg-gradient-to-br from-elec-gray to-elec-dark shadow-xl"
          onClick={() => {
            if (studyMode === 'study') {
              setIsFlipped(!isFlipped);
              if (!isFlipped) markAsAnswered();
            } else {
              setShowAnswer(!showAnswer);
            }
          }}
        >
          <CardContent className="h-full flex flex-col justify-center p-8">
            <div className="text-center space-y-6">
              {/* Card Content */}
              {!isFlipped && !showAnswer ? (
                <>
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold leading-relaxed text-white">
                      {card.front}
                    </h3>
                    <p className="text-elec-light/60 text-sm">
                      {studyMode === 'study' ? 'Click to reveal answer' : 'Think about your answer, then click to reveal'}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold leading-relaxed text-elec-yellow">
                      {card.back}
                    </h3>
                    <p className="text-elec-light/60 text-sm">
                      {studyMode === 'study' ? 'Click to see question' : 'How did you do?'}
                    </p>
                  </div>
                </>
              )}
              
              {/* Card Metadata */}
              <div className="flex justify-center items-center gap-4 pt-4 border-t border-elec-yellow/20">
                {card.category && (
                  <Badge variant="outline" className="text-xs bg-elec-yellow/10 border-elec-yellow/30">
                    {card.category}
                  </Badge>
                )}
                {card.difficulty && (
                  <Badge className={`text-xs ${getDifficultyColor(card.difficulty)}`}>
                    {card.difficulty}
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quiz Mode Response Buttons */}
      {studyMode === 'quiz' && showAnswer && (
        <div className="flex justify-center gap-3">
          <Button 
            variant="outline"
            onClick={() => handleCardResponse('incorrect')}
            className="border-red-500/30 text-red-400 hover:bg-red-500/10"
          >
            <XCircle className="mr-2 h-4 w-4" />
            Incorrect
          </Button>
          <Button 
            variant="outline"
            onClick={() => handleCardResponse('skip')}
            className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Skip
          </Button>
          <Button 
            onClick={() => handleCardResponse('correct')}
            className="bg-green-500/20 border-green-500/30 text-green-400 hover:bg-green-500/30"
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Correct
          </Button>
        </div>
      )}

      {/* Enhanced Controls */}
      <div className="flex flex-wrap justify-center gap-3">
        <Button 
          variant="outline" 
          onClick={previousCard}
          disabled={currentCard === 0}
          className="border-elec-yellow/20"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        
        <Button 
          variant="outline" 
          onClick={shuffleCards}
          className="border-elec-yellow/20"
        >
          <Shuffle className="mr-2 h-4 w-4" />
          Shuffle
        </Button>
        
        {studyMode === 'study' && (
          <Button 
            variant="outline" 
            onClick={() => setIsFlipped(!isFlipped)}
            className="border-elec-yellow/20"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Flip
          </Button>
        )}
        
        <Button 
          onClick={nextCard}
          disabled={currentCard === shuffledCards.length - 1}
          className="bg-elec-yellow/10 hover:bg-elec-yellow hover:text-black"
        >
          Next
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default FlashcardSession;
