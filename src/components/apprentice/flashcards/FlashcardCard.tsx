
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { Flashcard } from "./FlashcardCategories";

interface FlashcardCardProps {
  card: Flashcard;
  flipped: boolean;
  onClick: () => void;
}

const FlashcardCard = ({ card, flipped, onClick }: FlashcardCardProps) => {
  return (
    <div 
      className="w-full max-w-md h-64 md:h-80 cursor-pointer perspective-1000 my-6"
      onClick={onClick}
    >
      <div className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${flipped ? 'rotate-y-180' : ''}`}>
        {/* Front of card */}
        <Card className={`absolute w-full h-full backface-hidden border-elec-yellow/20 bg-elec-gray flex flex-col justify-center items-center p-6 ${flipped ? 'invisible' : ''}`}>
          <CardContent className="flex flex-col justify-center items-center h-full w-full p-0">
            <div className="text-center space-y-4">
              <p className="text-xl font-medium">{card?.question}</p>
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
              <p className="text-xl font-medium text-elec-yellow">{card?.answer}</p>
              <div className="mt-auto pt-6 text-muted-foreground text-sm">
                <p>Tap to see question</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FlashcardCard;
