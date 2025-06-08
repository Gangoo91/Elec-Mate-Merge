
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RotateCcw, Shuffle, ChevronLeft, ChevronRight, Home } from "lucide-react";

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

const FlashcardSession = ({ setTitle, cards, onExit }: FlashcardSessionProps) => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [shuffledCards, setShuffledCards] = useState(cards);
  const [answeredCards, setAnsweredCards] = useState<Set<number>>(new Set());

  const shuffleCards = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setShuffledCards(shuffled);
    setCurrentCard(0);
    setIsFlipped(false);
    setAnsweredCards(new Set());
  };

  const nextCard = () => {
    if (currentCard < shuffledCards.length - 1) {
      setCurrentCard(prev => prev + 1);
      setIsFlipped(false);
    }
  };

  const previousCard = () => {
    if (currentCard > 0) {
      setCurrentCard(prev => prev - 1);
      setIsFlipped(false);
    }
  };

  const markAsAnswered = () => {
    setAnsweredCards(prev => new Set(prev).add(currentCard));
  };

  const progress = ((currentCard + 1) / shuffledCards.length) * 100;
  const card = shuffledCards[currentCard];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">{setTitle}</h2>
          <p className="text-muted-foreground">
            Card {currentCard + 1} of {shuffledCards.length}
          </p>
        </div>
        <Button variant="outline" onClick={onExit}>
          <Home className="mr-2 h-4 w-4" />
          Exit Session
        </Button>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Flashcard */}
      <div className="flex justify-center">
        <Card 
          className="w-full max-w-2xl h-80 cursor-pointer transition-all duration-300 hover:scale-105 border-elec-yellow/20 bg-elec-gray shadow-lg"
          onClick={() => {
            setIsFlipped(!isFlipped);
            if (!isFlipped) markAsAnswered();
          }}
        >
          <CardContent className="h-full flex items-center justify-center p-8">
            <div className="text-center space-y-4">
              {!isFlipped ? (
                <>
                  <h3 className="text-xl font-bold leading-relaxed">{card.front}</h3>
                  <p className="text-elec-light/60 text-sm">Click to reveal answer</p>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-bold leading-relaxed text-elec-yellow">{card.back}</h3>
                  <p className="text-elec-light/60 text-sm">Click to see question</p>
                </>
              )}
              
              {card.category && (
                <div className="pt-4 border-t border-elec-yellow/20">
                  <span className="text-xs text-elec-yellow/70 bg-elec-yellow/10 px-2 py-1 rounded">
                    {card.category}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap justify-center gap-3">
        <Button 
          variant="outline" 
          onClick={previousCard}
          disabled={currentCard === 0}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        
        <Button variant="outline" onClick={shuffleCards}>
          <Shuffle className="mr-2 h-4 w-4" />
          Shuffle
        </Button>
        
        <Button variant="outline" onClick={() => setIsFlipped(!isFlipped)}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Flip
        </Button>
        
        <Button 
          onClick={nextCard}
          disabled={currentCard === shuffledCards.length - 1}
        >
          Next
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {/* Session Stats */}
      <Card className="border-elec-yellow/20 bg-elec-gray/50">
        <CardContent className="p-4">
          <div className="flex justify-between items-center text-sm">
            <span>Cards reviewed: {answeredCards.size}/{shuffledCards.length}</span>
            <span>Completion: {Math.round((answeredCards.size / shuffledCards.length) * 100)}%</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FlashcardSession;
