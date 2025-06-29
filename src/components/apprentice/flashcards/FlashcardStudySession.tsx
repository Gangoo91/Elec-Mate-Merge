
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, RotateCcw, CheckCircle, X, ChevronLeft, ChevronRight } from "lucide-react";

interface Flashcard {
  id: string;
  question: string;
  answer: string;
}

interface FlashcardStudySessionProps {
  setId: string;
  studyMode: string;
  onExit: () => void;
}

const FlashcardStudySession = ({ setId, studyMode, onExit }: FlashcardStudySessionProps) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredCards, setMasteredCards] = useState<string[]>([]);
  const [difficultCards, setDifficultCards] = useState<string[]>([]);

  // Mock flashcard data - in a real app, this would come from a data source
  const flashcardSets: Record<string, { title: string; cards: Flashcard[] }> = {
    "cable-colors": {
      title: "Cable Colours & Identification",
      cards: [
        { id: "1", question: "What colour is the live wire in UK single-phase installations?", answer: "Brown" },
        { id: "2", question: "What colour is the neutral wire in UK installations?", answer: "Blue" },
        { id: "3", question: "What colour is the earth wire in UK installations?", answer: "Green and Yellow striped" },
        { id: "4", question: "In three-phase systems, what colour represents L1?", answer: "Brown" },
        { id: "5", question: "In three-phase systems, what colour represents L2?", answer: "Black" },
        { id: "6", question: "In three-phase systems, what colour represents L3?", answer: "Grey" },
        { id: "7", question: "What was the old colour for live wire before harmonisation?", answer: "Red" },
        { id: "8", question: "What was the old colour for neutral wire before harmonisation?", answer: "Black" },
      ]
    },
    "bs7671-regulations": {
      title: "BS 7671 Key Regulations",
      cards: [
        { id: "1", question: "What does BS 7671 stand for?", answer: "British Standard 7671 - Requirements for Electrical Installations (IET Wiring Regulations)" },
        { id: "2", question: "What is the maximum earth fault loop impedance for a 32A Type B MCB?", answer: "1.44Ω" },
        { id: "3", question: "What is the minimum insulation resistance for circuits up to 500V?", answer: "1MΩ" },
        { id: "4", question: "How often should an EICR be carried out for domestic properties?", answer: "Every 10 years or at change of occupancy" },
      ]
    },
    "eicr-codes": {
      title: "EICR Observation Codes",
      cards: [
        { id: "1", question: "What does C1 mean in EICR?", answer: "Danger present - immediate remedial action required" },
        { id: "2", question: "What does C2 mean in EICR?", answer: "Potentially dangerous - urgent remedial action required" },
        { id: "3", question: "What does C3 mean in EICR?", answer: "Improvement recommended" },
        { id: "4", question: "What does FI mean in EICR?", answer: "Further Investigation required" },
      ]
    }
  };

  const currentSet = flashcardSets[setId];
  const cards = currentSet?.cards || [];
  const currentCard = cards[currentCardIndex];
  const progress = cards.length > 0 ? ((currentCardIndex + 1) / cards.length) * 100 : 0;

  const handleNextCard = () => {
    setIsFlipped(false);
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  const handleMarkDifficult = () => {
    if (currentCard && !difficultCards.includes(currentCard.id)) {
      setDifficultCards([...difficultCards, currentCard.id]);
    }
    handleNextCard();
  };

  const handleMarkMastered = () => {
    if (currentCard && !masteredCards.includes(currentCard.id)) {
      setMasteredCards([...masteredCards, currentCard.id]);
    }
    handleNextCard();
  };

  const handleFlipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const handleRestart = () => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setMasteredCards([]);
    setDifficultCards([]);
  };

  if (!currentSet) {
    return (
      <div className="text-center py-8">
        <p className="text-elec-light/70">Flashcard set not found.</p>
        <Button onClick={onExit} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Sets
        </Button>
      </div>
    );
  }

  if (currentCardIndex >= cards.length) {
    return (
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <div className="bg-elec-gray border border-elec-yellow/20 rounded-lg p-8">
          <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-elec-yellow mb-2">Study Session Complete!</h2>
          <p className="text-elec-light/80 mb-6">
            You've completed all {cards.length} cards in this set.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-elec-dark/30 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-400">{masteredCards.length}</div>
              <div className="text-sm text-elec-light/70">Cards Mastered</div>
            </div>
            <div className="bg-elec-dark/30 rounded-lg p-4">
              <div className="text-2xl font-bold text-yellow-400">{difficultCards.length}</div>
              <div className="text-sm text-elec-light/70">Need Review</div>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Button onClick={handleRestart} variant="outline" className="border-elec-yellow/30">
              <RotateCcw className="mr-2 h-4 w-4" />
              Study Again
            </Button>
            <Button onClick={onExit} className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Sets
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={onExit} className="border-elec-yellow/30">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h2 className="text-xl font-bold text-elec-yellow">{currentSet.title}</h2>
            <p className="text-sm text-elec-light/70 capitalize">{studyMode.replace("-", " ")} Mode</p>
          </div>
        </div>
        <div className="text-sm text-elec-light/70">
          {currentCardIndex + 1} of {cards.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between text-xs text-elec-light/60">
          <span>Progress: {Math.round(progress)}%</span>
          <span>Mastered: {masteredCards.length} | Review: {difficultCards.length}</span>
        </div>
      </div>

      {/* Flashcard */}
      <div className="relative">
        <Card 
          className="min-h-[400px] border-elec-yellow/20 bg-elec-gray cursor-pointer transition-all duration-300 hover:scale-[1.02]"
          onClick={handleFlipCard}
        >
          <CardContent className="p-8 flex flex-col justify-center items-center text-center min-h-[400px]">
            {!isFlipped ? (
              <div className="space-y-4">
                <div className="text-sm text-elec-yellow font-medium uppercase tracking-wide">Question</div>
                <div className="text-xl text-elec-light leading-relaxed">
                  {currentCard.question}
                </div>
                <div className="text-sm text-elec-light/60 mt-8">
                  Click to reveal answer
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-sm text-green-400 font-medium uppercase tracking-wide">Answer</div>
                <div className="text-xl text-elec-light leading-relaxed">
                  {currentCard.answer}
                </div>
                <div className="text-sm text-elec-light/60 mt-8">
                  How well did you know this?
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center">
        <Button 
          onClick={handlePrevCard}
          disabled={currentCardIndex === 0}
          variant="outline" 
          className="border-elec-yellow/30"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>

        {isFlipped && (
          <div className="flex gap-3">
            <Button 
              onClick={handleMarkDifficult}
              variant="outline"
              className="border-red-500/30 text-red-300 hover:bg-red-500/20"
            >
              <X className="h-4 w-4 mr-2" />
              Difficult
            </Button>
            <Button 
              onClick={handleMarkMastered}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Got it!
            </Button>
          </div>
        )}

        <Button 
          onClick={handleNextCard}
          disabled={currentCardIndex === cards.length - 1}
          className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
        >
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default FlashcardStudySession;
