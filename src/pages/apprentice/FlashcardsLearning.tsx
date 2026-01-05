
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BackButton from "@/components/common/BackButton";
import { BookOpen, ChevronLeft, ChevronRight, Info, RotateCcw, Zap } from "lucide-react";
import { useState } from "react";

interface Flashcard {
  id: string;
  question: string;
  answer: string;
}

interface FlashcardCategory {
  id: string;
  title: string;
  cards: Flashcard[];
}

const FlashcardsLearning = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const flashcardCategories: FlashcardCategory[] = [
    {
      id: "cable-colors",
      title: "Cable Colours",
      cards: [
        {
          id: "c1",
          question: "What is the colour for the Line/Phase conductor in a fixed wiring installation?",
          answer: "Brown"
        },
        {
          id: "c2",
          question: "What is the colour for the Neutral conductor in a fixed wiring installation?",
          answer: "Blue"
        },
        {
          id: "c3",
          question: "What is the colour for the Earth/CPC conductor in a fixed wiring installation?",
          answer: "Green and Yellow"
        },
        {
          id: "c4",
          question: "What was the old colour for the Line/Phase conductor before harmonisation?",
          answer: "Red"
        },
        {
          id: "c5",
          question: "What was the old colour for the Neutral conductor before harmonisation?",
          answer: "Black"
        }
      ]
    },
    {
      id: "regs-references",
      title: "Regulations",
      cards: [
        {
          id: "r1",
          question: "Maximum Earth Loop Impedance (Zs) for a 32A B type circuit breaker?",
          answer: "1.44\u03A9"
        },
        {
          id: "r2",
          question: "Maximum Earth Loop Impedance (Zs) for a 20A B type circuit breaker?",
          answer: "2.3\u03A9"
        },
        {
          id: "r3",
          question: "Maximum disconnection time for a 230V final circuit not exceeding 32A?",
          answer: "0.4 seconds"
        },
        {
          id: "r4",
          question: "Maximum disconnection time for a 230V distribution circuit?",
          answer: "5 seconds"
        },
        {
          id: "r5",
          question: "Which regulation covers basic protection (protection against electric shock)?",
          answer: "Regulation 410 (Chapter 41)"
        }
      ]
    },
    {
      id: "eicr-codes",
      title: "EICR Codes",
      cards: [
        {
          id: "e1",
          question: "What does a C1 code on an EICR mean?",
          answer: "Danger present. Risk of injury. Immediate remedial action required."
        },
        {
          id: "e2",
          question: "What does a C2 code on an EICR mean?",
          answer: "Potentially dangerous. Urgent remedial action required."
        },
        {
          id: "e3",
          question: "What does a C3 code on an EICR mean?",
          answer: "Improvement recommended."
        },
        {
          id: "e4",
          question: "What does FI on an EICR mean?",
          answer: "Further Investigation required."
        },
        {
          id: "e5",
          question: "How soon should a C1 defect be addressed?",
          answer: "Immediately - the danger should be removed at once."
        }
      ]
    },
    {
      id: "ir-values",
      title: "IR Values",
      cards: [
        {
          id: "i1",
          question: "Minimum IR value for 230V circuits with test voltage of 500V DC?",
          answer: "1.0 M\u03A9"
        },
        {
          id: "i2",
          question: "Minimum IR value for circuits up to 500V with test voltage of 500V DC?",
          answer: "1.0 M\u03A9"
        },
        {
          id: "i3",
          question: "Minimum IR value for circuits above 500V with test voltage of 1000V DC?",
          answer: "1.0 M\u03A9"
        },
        {
          id: "i4",
          question: "IR test voltage for SELV and PELV circuits?",
          answer: "250V DC"
        },
        {
          id: "i5",
          question: "What factors can affect IR test results?",
          answer: "Temperature, humidity, cable length, parallel paths, connected loads/equipment"
        }
      ]
    }
  ];

  const [currentCategory, setCurrentCategory] = useState<string>(flashcardCategories[0].id);

  const getCurrentCategoryCards = () => {
    return flashcardCategories.find(category => category.id === currentCategory)?.cards || [];
  };

  const handleNext = () => {
    if (flipped) setFlipped(false);
    setTimeout(() => {
      setCurrentCardIndex((prevIndex) =>
        prevIndex === getCurrentCategoryCards().length - 1 ? 0 : prevIndex + 1
      );
    }, flipped ? 200 : 0);
  };

  const handlePrevious = () => {
    if (flipped) setFlipped(false);
    setTimeout(() => {
      setCurrentCardIndex((prevIndex) =>
        prevIndex === 0 ? getCurrentCategoryCards().length - 1 : prevIndex - 1
      );
    }, flipped ? 200 : 0);
  };

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const handleTabChange = (value: string) => {
    setCurrentCategory(value);
    setCurrentCardIndex(0);
    setFlipped(false);
  };

  const currentCards = getCurrentCategoryCards();
  const currentCard = currentCards[currentCardIndex];

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in px-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Flashcards</h1>
          <p className="text-muted-foreground text-sm mt-1">Quick revision for key electrical concepts</p>
        </div>
        <BackButton customUrl="/apprentice/on-job-tools" label="Back to Tools" />
      </div>

      {/* Header Card */}
      <div className="bg-gradient-to-br from-elec-gray to-elec-gray/80 p-4 sm:p-6 rounded-xl border border-elec-yellow/20">
        <div className="flex gap-4 items-start">
          <div className="bg-elec-yellow/20 p-3 rounded-lg shrink-0">
            <Zap className="h-6 w-6 text-elec-yellow" />
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-1">Quick Revision Cards</h2>
            <p className="text-muted-foreground text-sm">
              Tap cards to flip. Use these during breaks for effective microlearning.
            </p>
          </div>
        </div>
      </div>

      <Tabs defaultValue={currentCategory} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid grid-cols-2 sm:grid-cols-4 h-auto gap-1 bg-elec-gray p-1">
          {flashcardCategories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="text-xs sm:text-sm py-2 data-[state=active]:bg-elec-yellow/20 data-[state=active]:text-elec-yellow"
            >
              {category.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {flashcardCategories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-6">
            <div className="flex flex-col items-center">
              {/* Flashcard Container */}
              <div
                className="w-full max-w-lg cursor-pointer select-none"
                onClick={handleFlip}
                style={{ perspective: '1000px' }}
              >
                <div
                  className="relative w-full transition-transform duration-500"
                  style={{
                    minHeight: '280px',
                    transformStyle: 'preserve-3d',
                    transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                  }}
                >
                  {/* Front of card (Question) */}
                  <Card
                    className="absolute inset-0 border-elec-yellow/30 bg-gradient-to-br from-elec-gray via-elec-gray to-elec-yellow/5 shadow-lg"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <CardContent className="flex flex-col justify-between h-full p-6">
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                        <span className="bg-elec-yellow/10 px-2 py-1 rounded text-elec-yellow">
                          Question
                        </span>
                        <span>{currentCardIndex + 1} / {currentCards.length}</span>
                      </div>
                      <div className="flex-1 flex items-center justify-center">
                        <p className="text-lg sm:text-xl font-medium text-center leading-relaxed">
                          {currentCard?.question}
                        </p>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm mt-4">
                        <RotateCcw className="h-4 w-4" />
                        <span>Tap to reveal answer</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Back of card (Answer) */}
                  <Card
                    className="absolute inset-0 border-elec-yellow/50 bg-gradient-to-br from-elec-yellow/20 via-elec-gray to-elec-gray shadow-lg"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}
                  >
                    <CardContent className="flex flex-col justify-between h-full p-6">
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                        <span className="bg-green-500/20 px-2 py-1 rounded text-green-400">
                          Answer
                        </span>
                        <span>{currentCardIndex + 1} / {currentCards.length}</span>
                      </div>
                      <div className="flex-1 flex items-center justify-center">
                        <p className="text-xl sm:text-2xl font-bold text-center text-elec-yellow leading-relaxed">
                          {currentCard?.answer}
                        </p>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm mt-4">
                        <RotateCcw className="h-4 w-4" />
                        <span>Tap to see question</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-3 w-full max-w-lg mt-6">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  className="flex-1 h-12 border-elec-yellow/30 hover:bg-elec-yellow/10"
                >
                  <ChevronLeft className="mr-2 h-5 w-5" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  onClick={handleNext}
                  className="flex-1 h-12 border-elec-yellow/30 hover:bg-elec-yellow/10"
                >
                  Next
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </div>

              {/* Progress Indicator */}
              <div className="flex gap-1.5 mt-4">
                {currentCards.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentCardIndex
                        ? 'w-6 bg-elec-yellow'
                        : 'w-2 bg-elec-yellow/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Study Tips */}
      <Card className="border-blue-500/30 bg-gradient-to-r from-blue-500/10 to-blue-500/5">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-start gap-3">
            <div className="bg-blue-500/20 p-2 rounded-lg shrink-0">
              <Info className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-blue-300 mb-2">Study Tips</h3>
              <ul className="text-sm text-blue-200/80 space-y-1.5">
                <li>- Test yourself daily to build memory retention</li>
                <li>- Review cards you struggle with more frequently</li>
                <li>- Try explaining answers before revealing them</li>
                <li>- Use during short breaks on site for microlearning</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FlashcardsLearning;
