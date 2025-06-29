
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, RotateCcw, CheckCircle, Trophy, Clock, Target } from "lucide-react";

interface FlashcardData {
  id: string;
  question: string;
  answer: string;
  category?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

interface FlashcardStudySessionProps {
  setId: string;
  studyMode: string;
  onExit: () => void;
}

const FlashcardStudySession = ({ setId, studyMode, onExit }: FlashcardStudySessionProps) => {
  const [flashcards, setFlashcards] = useState<FlashcardData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [masteredCards, setMasteredCards] = useState<Set<string>>(new Set());
  const [isCompleted, setIsCompleted] = useState(false);
  const [sessionStartTime] = useState(Date.now());
  const [correctAnswers, setCorrectAnswers] = useState(0);

  // Mock flashcard data - in a real app, this would come from an API or database
  const flashcardSets = {
    "cable-colors": [
      { id: "cc1", question: "What colour is the live wire in a UK domestic installation?", answer: "Brown", category: "Cable Colours", difficulty: "easy" as const },
      { id: "cc2", question: "What colour is the neutral wire in a UK domestic installation?", answer: "Blue", category: "Cable Colours", difficulty: "easy" as const },
      { id: "cc3", question: "What colour is the earth wire in a UK domestic installation?", answer: "Green and Yellow", category: "Cable Colours", difficulty: "easy" as const },
      { id: "cc4", question: "In a three-phase system, what are the three line colours?", answer: "Brown, Black, Grey", category: "Cable Colours", difficulty: "medium" as const },
      { id: "cc5", question: "What colour was the old live wire before harmonisation?", answer: "Red", category: "Cable Colours", difficulty: "medium" as const }
    ],
    "bs7671-regulations": [
      { id: "bs1", question: "What is the current edition of BS 7671?", answer: "18th Edition (2018)", category: "BS 7671", difficulty: "easy" as const },
      { id: "bs2", question: "What does SELV stand for?", answer: "Separated Extra Low Voltage", category: "BS 7671", difficulty: "medium" as const },
      { id: "bs3", question: "What is the maximum disconnection time for a 32A circuit in a TN system?", answer: "0.4 seconds", category: "BS 7671", difficulty: "hard" as const },
      { id: "bs4", question: "What is the minimum cross-sectional area for a main earthing conductor in copper?", answer: "16mm²", category: "BS 7671", difficulty: "medium" as const },
      { id: "bs5", question: "What is the purpose of RCD protection?", answer: "Protection against electric shock and fire caused by earth faults", category: "BS 7671", difficulty: "easy" as const }
    ]
  };

  useEffect(() => {
    const cards = flashcardSets[setId as keyof typeof flashcardSets] || [];
    let orderedCards = [...cards];
    
    // Apply study mode logic
    if (studyMode === 'random') {
      orderedCards = orderedCards.sort(() => Math.random() - 0.5);
    } else if (studyMode === 'spaced') {
      // For spaced repetition, we might want to show harder cards more often
      orderedCards = orderedCards.sort((a, b) => {
        const difficultyWeight = { easy: 1, medium: 2, hard: 3 };
        return difficultyWeight[b.difficulty] - difficultyWeight[a.difficulty];
      });
    }
    
    setFlashcards(orderedCards);
  }, [setId, studyMode]);

  const currentCard = flashcards[currentIndex];
  const progress = flashcards.length > 0 ? ((currentIndex + 1) / flashcards.length) * 100 : 0;

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleMarkCorrect = () => {
    if (currentCard) {
      setMasteredCards(prev => new Set([...prev, currentCard.id]));
      setCorrectAnswers(prev => prev + 1);
    }
    handleNextCard();
  };

  const handleMarkIncorrect = () => {
    handleNextCard();
  };

  const handleNextCard = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowAnswer(false);
    } else {
      // Session completed
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setShowAnswer(false);
    setMasteredCards(new Set());
    setIsCompleted(false);
    setCorrectAnswers(0);
  };

  if (flashcards.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-elec-yellow mx-auto mb-4"></div>
          <p className="text-elec-light/70">Loading flashcards...</p>
        </div>
      </div>
    );
  }

  // Completion screen
  if (isCompleted) {
    const sessionDuration = Math.round((Date.now() - sessionStartTime) / 1000 / 60);
    const successRate = Math.round((correctAnswers / flashcards.length) * 100);

    return (
      <div className="space-y-6 max-w-2xl mx-auto">
        <Card className="border-elec-yellow/20 bg-elec-gray text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="p-4 rounded-full bg-elec-yellow/20">
                <Trophy className="h-12 w-12 text-elec-yellow" />
              </div>
            </div>
            <CardTitle className="text-2xl text-elec-yellow">Session Complete!</CardTitle>
            <p className="text-elec-light/70">Well done on completing your flashcard session</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-elec-dark/30 rounded-lg p-4">
                <div className="text-2xl font-bold text-elec-yellow">{flashcards.length}</div>
                <div className="text-sm text-elec-light/70">Cards Studied</div>
              </div>
              <div className="bg-elec-dark/30 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-400">{successRate}%</div>
                <div className="text-sm text-elec-light/70">Success Rate</div>
              </div>
              <div className="bg-elec-dark/30 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-400">{sessionDuration}m</div>
                <div className="text-sm text-elec-light/70">Time Spent</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                onClick={handleRestart}
                className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Study Again
              </Button>
              <Button 
                variant="outline" 
                onClick={onExit}
                className="border-elec-yellow/30 hover:bg-elec-yellow/10"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Sets
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-lg text-elec-light">Study Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-elec-light/80">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Review incorrect answers to reinforce learning</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Come back tomorrow for spaced repetition</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Try a different study mode for variety</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Study session interface
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button 
          variant="outline" 
          size="sm"
          onClick={onExit}
          className="border-elec-yellow/30 hover:bg-elec-yellow/10"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Exit
        </Button>
        <div className="flex items-center gap-4 text-sm text-elec-light/70">
          <div className="flex items-center gap-1">
            <Target className="h-4 w-4" />
            <span>{currentIndex + 1} of {flashcards.length}</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle className="h-4 w-4" />
            <span>{masteredCards.size} mastered</span>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-elec-light/70">Progress</span>
          <span className="text-sm text-elec-yellow font-medium">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2 bg-elec-dark/50" />
      </div>

      {/* Flashcard */}
      <Card className="border-elec-yellow/20 bg-elec-gray min-h-[300px]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg text-elec-light">
              {currentCard?.category || 'Flashcard'}
            </CardTitle>
            {currentCard?.difficulty && (
              <span className={`text-xs px-2 py-1 rounded border ${
                currentCard.difficulty === 'easy' ? 'bg-green-500/20 text-green-300 border-green-500/30' :
                currentCard.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' :
                'bg-red-500/20 text-red-300 border-red-500/30'
              }`}>
                {currentCard.difficulty}
              </span>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="text-lg text-elec-light font-medium">
              {currentCard?.question}
            </div>
            
            {showAnswer && (
              <div className="p-4 bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg">
                <div className="text-elec-yellow font-medium mb-2">Answer:</div>
                <div className="text-elec-light">{currentCard?.answer}</div>
              </div>
            )}
          </div>

          <div className="flex justify-center">
            {!showAnswer ? (
              <Button 
                onClick={handleShowAnswer}
                className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
                size="lg"
              >
                Show Answer
              </Button>
            ) : (
              <div className="flex gap-3">
                <Button 
                  onClick={handleMarkIncorrect}
                  variant="outline"
                  className="border-red-500/30 hover:bg-red-500/10 text-red-300"
                >
                  Need More Practice
                </Button>
                <Button 
                  onClick={handleMarkCorrect}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Got It Right
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FlashcardStudySession;
