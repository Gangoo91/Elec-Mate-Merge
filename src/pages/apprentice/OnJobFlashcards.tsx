
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, RotateCcw, Shuffle, Play, BookOpen, Zap, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const OnJobFlashcards = () => {
  const [currentSet, setCurrentSet] = useState<string | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);

  const flashcardSets = [
    {
      id: "cable-colors",
      title: "Cable Colour Codes",
      icon: Zap,
      description: "UK electrical cable colour identification",
      count: 12,
      cards: [
        { front: "Brown cable colour represents?", back: "Live (L) conductor in single phase AC" },
        { front: "Blue cable colour represents?", back: "Neutral (N) conductor" },
        { front: "Green/Yellow cable colour represents?", back: "Earth (E) protective conductor" }
      ]
    },
    {
      id: "eicr-codes",
      title: "EICR Codes",
      icon: BookOpen,
      description: "Electrical Installation Condition Report codes",
      count: 8,
      cards: [
        { front: "What does C1 code mean?", back: "Danger present - immediate remedial action required" },
        { front: "What does C2 code mean?", back: "Potentially dangerous - urgent remedial action required" },
        { front: "What does C3 code mean?", back: "Improvement recommended" }
      ]
    },
    {
      id: "safety-signs",
      title: "Safety Signs",
      icon: Shield,
      description: "Electrical safety warning signs and meanings",
      count: 15,
      cards: [
        { front: "Red circular sign with diagonal line means?", back: "Prohibition - something must not be done" },
        { front: "Yellow triangular sign means?", back: "Warning of hazard or danger" },
        { front: "Blue circular sign means?", back: "Mandatory action required" }
      ]
    }
  ];

  const currentSetData = flashcardSets.find(set => set.id === currentSet);

  const nextCard = () => {
    if (currentSetData) {
      setCurrentCard((prev) => (prev + 1) % currentSetData.cards.length);
      setIsFlipped(false);
    }
  };

  const previousCard = () => {
    if (currentSetData) {
      setCurrentCard((prev) => (prev - 1 + currentSetData.cards.length) % currentSetData.cards.length);
      setIsFlipped(false);
    }
  };

  const shuffleCards = () => {
    // In a real implementation, this would shuffle the cards array
    setCurrentCard(0);
    setIsFlipped(false);
  };

  if (currentSet && currentSetData) {
    const card = currentSetData.cards[currentCard];
    
    return (
      <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{currentSetData.title}</h1>
            <p className="text-muted-foreground">Card {currentCard + 1} of {currentSetData.cards.length}</p>
          </div>
          <Button variant="outline" onClick={() => setCurrentSet(null)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Sets
          </Button>
        </div>

        {/* Flashcard */}
        <div className="flex justify-center">
          <Card 
            className="w-full max-w-2xl h-64 cursor-pointer transition-transform hover:scale-105 border-elec-yellow/20 bg-elec-gray"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <CardContent className="h-full flex items-center justify-center p-8">
              <div className="text-center">
                {!isFlipped ? (
                  <>
                    <h2 className="text-2xl font-bold mb-4">{card.front}</h2>
                    <p className="text-elec-light/60">Click to reveal answer</p>
                  </>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold mb-4 text-elec-yellow">{card.back}</h2>
                    <p className="text-elec-light/60">Click to see question</p>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4">
          <Button variant="outline" onClick={previousCard}>
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
          <Button onClick={nextCard}>
            Next
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Flashcards & Microlearning</h1>
          <p className="text-muted-foreground">Quick-fire revision for cable colours, regulations, and codes</p>
        </div>
        <Link to="/apprentice/on-job-tools" className="flex-shrink-0">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tools
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {flashcardSets.map((set) => (
          <Card key={set.id} className="border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/80 transition-colors cursor-pointer">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-md bg-elec-yellow/10">
                  <set.icon className="h-6 w-6 text-elec-yellow" />
                </div>
                <CardTitle className="text-lg">{set.title}</CardTitle>
              </div>
              <p className="text-elec-light/80 text-sm">{set.description}</p>
              <p className="text-elec-yellow text-sm font-medium">{set.count} cards</p>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full" 
                size="sm"
                onClick={() => {
                  setCurrentSet(set.id);
                  setCurrentCard(0);
                  setIsFlipped(false);
                }}
              >
                <Play className="mr-2 h-4 w-4" />
                Start Learning
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle>Learning Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Effective Study Techniques</h3>
              <ul className="text-sm space-y-1 text-elec-light/80">
                <li>• Review cards regularly for better retention</li>
                <li>• Focus on cards you find challenging</li>
                <li>• Use spaced repetition for long-term memory</li>
                <li>• Test yourself without looking at answers first</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Quick Sessions</h3>
              <ul className="text-sm space-y-1 text-elec-light/80">
                <li>• 5-10 minutes between tasks</li>
                <li>• During breaks on site</li>
                <li>• Before starting your shift</li>
                <li>• Perfect for mobile learning</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnJobFlashcards;
