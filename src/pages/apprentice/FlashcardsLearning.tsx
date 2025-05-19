
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BackButton from "@/components/common/BackButton";
import { BookOpen, ChevronLeft, ChevronRight, Info } from "lucide-react";
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
      title: "Cable Colors",
      cards: [
        {
          id: "c1",
          question: "What is the color for the Line/Phase conductor in a fixed wiring installation?",
          answer: "Brown"
        },
        {
          id: "c2",
          question: "What is the color for the Neutral conductor in a fixed wiring installation?",
          answer: "Blue"
        },
        {
          id: "c3",
          question: "What is the color for the Earth/CPC conductor in a fixed wiring installation?",
          answer: "Green and Yellow"
        },
        {
          id: "c4",
          question: "What was the old color for the Line/Phase conductor before harmonization?",
          answer: "Red"
        },
        {
          id: "c5",
          question: "What was the old color for the Neutral conductor before harmonization?",
          answer: "Black"
        }
      ]
    },
    {
      id: "regs-references",
      title: "Regulations References",
      cards: [
        {
          id: "r1",
          question: "Maximum Earth Loop Impedance (Zs) for a 32A B type circuit breaker?",
          answer: "1.44Ω"
        },
        {
          id: "r2",
          question: "Maximum Earth Loop Impedance (Zs) for a 20A B type circuit breaker?",
          answer: "2.3Ω"
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
      title: "IR Test Values",
      cards: [
        {
          id: "i1",
          question: "Minimum IR value for 230V circuits with test voltage of 500V DC?",
          answer: "1.0 MΩ"
        },
        {
          id: "i2",
          question: "Minimum IR value for circuits up to 500V with test voltage of 500V DC?",
          answer: "1.0 MΩ"
        },
        {
          id: "i3",
          question: "Minimum IR value for circuits above 500V with test voltage of 1000V DC?",
          answer: "1.0 MΩ"
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
    setCurrentCardIndex((prevIndex) => 
      prevIndex === getCurrentCategoryCards().length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    if (flipped) setFlipped(false);
    setCurrentCardIndex((prevIndex) => 
      prevIndex === 0 ? getCurrentCategoryCards().length - 1 : prevIndex - 1
    );
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
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Flashcards & Microlearning</h1>
        <BackButton customUrl="/apprentice/on-job-tools" label="Back to Tools" />
      </div>
      
      <div className="bg-elec-gray p-4 sm:p-6 rounded-lg border border-elec-yellow/20">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="bg-elec-yellow/10 p-3 rounded-md">
            <BookOpen size={36} className="text-elec-yellow" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-2">Quick Revision Cards</h2>
            <p className="text-muted-foreground">
              Swipeable, quick-fire revision flashcards for cable colors, regulations references, EICR codes, and minimum IR test values. 
              Perfect for site tasks or exam preparation.
            </p>
          </div>
        </div>
      </div>

      <Tabs defaultValue={currentCategory} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6">
          {flashcardCategories.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.title}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {flashcardCategories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-0">
            <div className="flex flex-col items-center">
              <div 
                className="w-full max-w-md h-64 md:h-80 cursor-pointer perspective-1000 my-6"
                onClick={handleFlip}
              >
                <div className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${flipped ? 'rotate-y-180' : ''}`}>
                  {/* Front of card */}
                  <Card className={`absolute w-full h-full backface-hidden border-elec-yellow/20 bg-elec-gray flex flex-col justify-center items-center p-6 ${flipped ? 'invisible' : ''}`}>
                    <CardContent className="flex flex-col justify-center items-center h-full w-full p-0">
                      <div className="text-center space-y-4">
                        <p className="text-xl font-medium">{currentCard?.question}</p>
                        <div className="mt-auto pt-6 text-muted-foreground text-sm">
                          <p>Tap to reveal answer</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Back of card */}
                  <Card className={`absolute w-full h-full backface-hidden rotate-y-180 border-elec-yellow/20 bg-elec-yellow/10 flex flex-col justify-center items-center p-6 ${!flipped ? 'invisible' : ''}`}>
                    <CardContent className="flex flex-col justify-center items-center h-full w-full p-0">
                      <div className="text-center space-y-4">
                        <p className="text-xl font-medium text-elec-yellow">{currentCard?.answer}</p>
                        <div className="mt-auto pt-6 text-muted-foreground text-sm">
                          <p>Tap to see question</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div className="flex justify-between w-full max-w-md mt-4">
                <Button 
                  variant="outline" 
                  onClick={handlePrevious}
                  className="flex-1 mr-2"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleNext}
                  className="flex-1 ml-2"
                >
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="text-center mt-4 text-muted-foreground">
                {currentCardIndex + 1} of {currentCards.length}
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
      
      <div className="bg-blue-950/20 border border-blue-500/30 rounded-md p-6">
        <div className="flex items-start gap-4">
          <Info className="h-5 w-5 text-blue-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-blue-300 mb-2">Study Tips</h3>
            <ul className="text-sm text-blue-200/90 space-y-2 list-disc pl-4">
              <li>Test yourself daily with these flashcards to build memory retention</li>
              <li>Review any cards you struggle with more frequently</li>
              <li>Try to explain the answer in your own words before revealing it</li>
              <li>Create your own flashcards for topics you find challenging</li>
              <li>Use these flashcards during short breaks on site for effective microlearning</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashcardsLearning;
