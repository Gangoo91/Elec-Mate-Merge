
import { Button } from "@/components/ui/button";
import BackButton from "@/components/common/BackButton";
import { BookOpen } from "lucide-react";

const FlashcardHeader = () => {
  return (
    <>
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
    </>
  );
};

export default FlashcardHeader;
