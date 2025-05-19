
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BackButton from "@/components/common/BackButton";
import { ArrowLeft, ArrowRight, BookOpen, ChevronLeft, ChevronRight, Info, RotateCw, Bookmark, Check, AlertTriangle } from "lucide-react";
import { useState, useEffect } from "react";

interface Flashcard {
  id: string;
  question: string;
  answer: string;
}

interface FlashcardCategory {
  id: string;
  title: string;
  icon?: React.ReactNode;
  cards: Flashcard[];
}

const FlashcardsLearning = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [mastered, setMastered] = useState<Record<string, string[]>>({});
  const [fadeEffect, setFadeEffect] = useState(false);
  
  const flashcardCategories: FlashcardCategory[] = [
    {
      id: "cable-colors",
      title: "Cable Colors",
      icon: <div className="w-3 h-3 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full mr-1.5" />,
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
        },
        {
          id: "c6",
          question: "What is the color for Line 1 in a 3-phase system?",
          answer: "Brown"
        },
        {
          id: "c7",
          question: "What is the color for Line 2 in a 3-phase system?",
          answer: "Black"
        },
        {
          id: "c8",
          question: "What is the color for Line 3 in a 3-phase system?",
          answer: "Grey"
        },
        {
          id: "c9",
          question: "What is the color for the switched live wire in new installations?",
          answer: "Blue with brown sleeve/tape at terminations"
        },
        {
          id: "c10",
          question: "What colors are used for low voltage circuits (SELV)?",
          answer: "No specific requirement, but typically orange or white"
        }
      ]
    },
    {
      id: "regs-references",
      title: "Regulations References",
      icon: <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mr-1.5" />,
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
        },
        {
          id: "r6",
          question: "What is the regulation number for RCDs in BS 7671?",
          answer: "Regulation 531.3"
        },
        {
          id: "r7",
          question: "Maximum Zs for a 6A C-type MCB?",
          answer: "7.67Ω"
        },
        {
          id: "r8",
          question: "Which regulation section covers equipotential bonding?",
          answer: "Section 411.3.1.2"
        },
        {
          id: "r9", 
          question: "Which regulation covers isolation and switching?",
          answer: "Regulation 537 (Chapter 53)"
        },
        {
          id: "r10",
          question: "Which regulation section covers periodic inspection and testing?",
          answer: "Regulation 651 (Chapter 65)"
        }
      ]
    },
    {
      id: "eicr-codes",
      title: "EICR Codes",
      icon: <div className="w-3 h-3 bg-gradient-to-r from-red-400 to-red-600 rounded-full mr-1.5" />,
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
        },
        {
          id: "e6",
          question: "What is the recommended remedial timeframe for a C2 code?",
          answer: "As soon as practical - typically within 28 days"
        },
        {
          id: "e7",
          question: "Is a C3 observation a fail on an EICR?",
          answer: "No, an installation can be deemed satisfactory with C3 codes present"
        },
        {
          id: "e8",
          question: "What classification should be given to damaged socket outlets?",
          answer: "C2 - potentially dangerous"
        }, 
        {
          id: "e9",
          question: "What classification should be given to exposed live parts?",
          answer: "C1 - danger present"
        },
        {
          id: "e10",
          question: "What classification is given to a lack of RCD protection on a socket outlet in a bathroom?",
          answer: "C2 - potentially dangerous"
        }
      ]
    },
    {
      id: "ir-values",
      title: "IR Test Values",
      icon: <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-green-600 rounded-full mr-1.5" />,
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
        },
        {
          id: "i6",
          question: "What is the minimum IR value between live conductors?",
          answer: "1.0 MΩ"
        },
        {
          id: "i7", 
          question: "What is the minimum IR value for a 400V 3-phase circuit?",
          answer: "1.0 MΩ"
        },
        {
          id: "i8",
          question: "What IR test voltage is used for 110V reduced low voltage systems?",
          answer: "250V DC"
        },
        {
          id: "i9",
          question: "What happens to IR values as cable length increases?",
          answer: "Values typically decrease with increased cable length"
        },
        {
          id: "i10",
          question: "What's the recommended practice for testing IR on electronic equipment?",
          answer: "Disconnect sensitive equipment before testing or use the 'equipment off' method"
        }
      ]
    },
    {
      id: "safety-procedures",
      title: "Safety Procedures",
      icon: <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full mr-1.5" />,
      cards: [
        {
          id: "s1",
          question: "What are the 5 steps of safe isolation?",
          answer: "1. Identify circuit, 2. Isolate, 3. Secure isolation, 4. Verify isolation, 5. Post warning notices"
        },
        {
          id: "s2",
          question: "What PPE should be worn when working with live exposed conductors?",
          answer: "Insulating gloves, eye protection, flame-resistant clothing, insulated tools"
        },
        {
          id: "s3",
          question: "What document is used to record safe isolation procedures on-site?",
          answer: "Permit to Work"
        },
        {
          id: "s4",
          question: "How should you verify an isolation has been successful?",
          answer: "Use a proven voltage indicator and prove the tester before and after on a known live source"
        },
        {
          id: "s5",
          question: "When is it acceptable to work on live equipment?",
          answer: "Only when it's unreasonable to work dead, suitable precautions are taken, and risk assessment completed"
        },
        {
          id: "s6",
          question: "What regulation covers safe isolation procedures?",
          answer: "Regulation 14 of the Electricity at Work Regulations 1989"
        },
        {
          id: "s7",
          question: "What is the purpose of a lock-out kit?",
          answer: "To secure isolation devices in the off position and prevent unauthorized re-energization"
        },
        {
          id: "s8",
          question: "Who can remove a lock during a lockout procedure?",
          answer: "Only the person who applied it or their authorized supervisor in emergency situations"
        },
        {
          id: "s9",
          question: "What should you do before beginning work on an electrical installation?",
          answer: "Complete a risk assessment and method statement"
        },
        {
          id: "s10",
          question: "What is the minimum safe distance from overhead lines up to 33kV?",
          answer: "3 meters (horizontally)"
        }
      ]
    }
  ];

  const [currentCategory, setCurrentCategory] = useState<string>(() => {
    // Try to load last selected category from localStorage
    const savedCategory = localStorage.getItem('flashcards-category');
    return savedCategory && flashcardCategories.some(c => c.id === savedCategory) 
      ? savedCategory 
      : flashcardCategories[0].id;
  });

  // Save selected category to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('flashcards-category', currentCategory);
  }, [currentCategory]);

  // Load mastered cards from localStorage
  useEffect(() => {
    const savedMastered = localStorage.getItem('flashcards-mastered');
    if (savedMastered) {
      setMastered(JSON.parse(savedMastered));
    }
  }, []);

  // Save mastered cards to localStorage when they change
  useEffect(() => {
    localStorage.setItem('flashcards-mastered', JSON.stringify(mastered));
  }, [mastered]);

  const getCurrentCategoryCards = () => {
    return flashcardCategories.find(category => category.id === currentCategory)?.cards || [];
  };

  const handleNext = () => {
    setFadeEffect(true);
    setTimeout(() => {
      if (flipped) setFlipped(false);
      setCurrentCardIndex((prevIndex) => 
        prevIndex === getCurrentCategoryCards().length - 1 ? 0 : prevIndex + 1
      );
      setFadeEffect(false);
    }, 300);
  };

  const handlePrevious = () => {
    setFadeEffect(true);
    setTimeout(() => {
      if (flipped) setFlipped(false);
      setCurrentCardIndex((prevIndex) => 
        prevIndex === 0 ? getCurrentCategoryCards().length - 1 : prevIndex - 1
      );
      setFadeEffect(false);
    }, 300);
  };

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const handleTabChange = (value: string) => {
    setCurrentCategory(value);
    setCurrentCardIndex(0);
    setFlipped(false);
  };

  const handleMarkMastered = (e: React.MouseEvent) => {
    e.stopPropagation();
    const currentCards = getCurrentCategoryCards();
    const currentCardId = currentCards[currentCardIndex]?.id;
    
    if (currentCardId) {
      setMastered(prev => {
        const categoryMastered = prev[currentCategory] || [];
        
        // Check if card is already mastered
        if (categoryMastered.includes(currentCardId)) {
          return {
            ...prev,
            [currentCategory]: categoryMastered.filter(id => id !== currentCardId)
          };
        } else {
          return {
            ...prev,
            [currentCategory]: [...categoryMastered, currentCardId]
          };
        }
      });
    }
  };

  const isCardMastered = (cardId: string) => {
    return (mastered[currentCategory] || []).includes(cardId);
  };

  const handleResetMastered = () => {
    setMastered(prev => ({
      ...prev,
      [currentCategory]: []
    }));
  };

  const currentCards = getCurrentCategoryCards();
  const currentCard = currentCards[currentCardIndex];
  const masteredCount = (mastered[currentCategory] || []).length;
  const totalCards = currentCards.length;
  const masteredPercentage = totalCards > 0 ? Math.round((masteredCount / totalCards) * 100) : 0;

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
              Swipeable, quick-fire revision flashcards covering key electrical knowledge.
              Master the cards by marking them as learned, and track your progress.
            </p>
          </div>
        </div>
      </div>

      <Tabs defaultValue={currentCategory} onValueChange={handleTabChange} className="w-full">
        <TabsList className="mb-6 p-1.5 gap-1.5 grid grid-cols-3 md:grid-cols-5 bg-elec-gray/80 rounded-xl border border-gray-700/20">
          {flashcardCategories.map((category) => (
            <TabsTrigger 
              key={category.id} 
              value={category.id}
              className="flex items-center gap-1.5 data-[state=active]:bg-gradient-to-r data-[state=active]:from-elec-yellow/90 data-[state=active]:to-amber-500 data-[state=active]:text-black rounded-lg transition-all duration-300 shadow-sm py-2.5"
            >
              {category.icon}
              <span className="truncate">{category.title}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        
        {flashcardCategories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-0">
            <div className="flex flex-col items-center">
              <div className="flex justify-between items-center w-full max-w-md mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground">
                    Card {currentCardIndex + 1} of {currentCards.length}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-sm text-muted-foreground">
                    Mastered: {masteredCount}/{totalCards} ({masteredPercentage}%)
                  </span>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-7 w-7"
                    onClick={handleResetMastered}
                    title="Reset mastered cards"
                  >
                    <RotateCw size={14} />
                  </Button>
                </div>
              </div>
              
              <div 
                className={`w-full max-w-md h-64 md:h-80 cursor-pointer perspective-1000 my-2 transition-opacity ${fadeEffect ? 'opacity-0' : 'opacity-100'}`}
                onClick={handleFlip}
              >
                <div className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${flipped ? 'rotate-y-180' : ''}`}>
                  {/* Front of card */}
                  <Card className={`absolute w-full h-full backface-hidden border-elec-yellow/20 bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col justify-center items-center p-6 ${flipped ? 'invisible' : ''}`}>
                    <CardContent className="flex flex-col justify-center items-center h-full w-full p-0">
                      <div className="text-center space-y-4">
                        <p className="text-xl font-medium text-white">{currentCard?.question}</p>
                        <div className="mt-auto pt-6 text-blue-300/70 text-sm flex items-center justify-center">
                          <span>Tap to reveal answer</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Back of card */}
                  <Card className={`absolute w-full h-full backface-hidden rotate-y-180 border-elec-yellow/20 bg-gradient-to-br from-blue-600 to-blue-800 flex flex-col justify-center items-center p-6 ${!flipped ? 'invisible' : ''}`}>
                    <CardContent className="flex flex-col justify-center items-center h-full w-full p-0">
                      <div className="text-center space-y-4">
                        <p className="text-xl font-medium text-white">{currentCard?.answer}</p>
                        <div className="mt-auto pt-6 text-white/70 text-sm flex items-center justify-center">
                          <span>Tap to see question</span>
                        </div>
                      </div>
                    </CardContent>
                    
                    {/* Mastery button - only shown on back of card */}
                    <div 
                      className="absolute top-3 right-3 z-10" 
                      onClick={handleMarkMastered}
                    >
                      <Button 
                        size="sm" 
                        variant={isCardMastered(currentCard?.id) ? "default" : "outline"}
                        className={`h-8 px-2 ${isCardMastered(currentCard?.id) ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-700/40 hover:bg-blue-700/70 border-blue-400/30'}`}
                      >
                        {isCardMastered(currentCard?.id) ? (
                          <Check size={14} className="mr-1" />
                        ) : (
                          <Bookmark size={14} className="mr-1" />
                        )}
                        {isCardMastered(currentCard?.id) ? 'Mastered' : 'Mark as mastered'}
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>
              
              {/* Swipe hint */}
              <div className="flex justify-center items-center mb-4 text-muted-foreground text-sm">
                <ArrowLeft className="h-4 w-4 mr-1" />
                <span>Swipe or use buttons to navigate</span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </div>
              
              <div className="flex justify-between w-full max-w-md mt-2">
                <Button 
                  variant="outline" 
                  onClick={handlePrevious}
                  className="flex-1 mr-2 border-gray-700/30 hover:bg-gray-800"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleNext}
                  className="flex-1 ml-2 border-gray-700/30 hover:bg-gray-800"
                >
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              
              {/* Progress bar */}
              <div className="w-full max-w-md mt-6">
                <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-elec-yellow to-amber-500 rounded-full transition-all duration-300"
                    style={{ width: `${((currentCardIndex + 1) / currentCards.length) * 100}%` }}
                  ></div>
                </div>
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
              <li>Mark cards as mastered to track your progress</li>
              <li>Use these flashcards during short breaks on site for effective microlearning</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Alert for mastery completion */}
      {masteredPercentage === 100 && (
        <div className="bg-green-900/30 border border-green-500/30 rounded-md p-6 animate-fade-in">
          <div className="flex items-start gap-4">
            <AlertTriangle className="h-5 w-5 text-green-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-green-300 mb-2">Category Mastered!</h3>
              <p className="text-sm text-green-200/90">
                Excellent work! You've mastered all flashcards in this category. Try another category 
                or reset this one to test your knowledge again.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlashcardsLearning;
