
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface FlashcardNavigationProps {
  currentIndex: number;
  totalCards: number;
  onPrevious: () => void;
  onNext: () => void;
}

const FlashcardNavigation = ({ currentIndex, totalCards, onPrevious, onNext }: FlashcardNavigationProps) => {
  return (
    <>
      <div className="flex justify-between w-full max-w-md mt-4">
        <Button 
          variant="outline" 
          onClick={onPrevious}
          className="flex-1 mr-2"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        <Button 
          variant="outline" 
          onClick={onNext}
          className="flex-1 ml-2"
        >
          Next
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <div className="text-center mt-4 text-muted-foreground">
        {currentIndex + 1} of {totalCards}
      </div>
    </>
  );
};

export default FlashcardNavigation;
