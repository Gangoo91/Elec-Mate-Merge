
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FlashcardCategory } from "./FlashcardCategories";
import FlashcardCard from "./FlashcardCard";
import FlashcardNavigation from "./FlashcardNavigation";

interface FlashcardContentProps {
  categories: FlashcardCategory[];
}

const FlashcardContent = ({ categories }: FlashcardContentProps) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<string>(categories[0].id);
  
  const getCurrentCategoryCards = () => {
    return categories.find(category => category.id === currentCategory)?.cards || [];
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
    <Tabs defaultValue={currentCategory} onValueChange={handleTabChange} className="w-full">
      <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6">
        {categories.map((category) => (
          <TabsTrigger key={category.id} value={category.id}>
            {category.title}
          </TabsTrigger>
        ))}
      </TabsList>
      
      {categories.map((category) => (
        <TabsContent key={category.id} value={category.id} className="mt-0">
          <div className="flex flex-col items-center">
            {currentCard && (
              <FlashcardCard 
                card={currentCard}
                flipped={flipped}
                onClick={handleFlip}
              />
            )}
            
            <FlashcardNavigation 
              currentIndex={currentCardIndex}
              totalCards={currentCards.length}
              onPrevious={handlePrevious}
              onNext={handleNext}
            />
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default FlashcardContent;
