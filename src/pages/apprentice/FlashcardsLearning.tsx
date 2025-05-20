
import FlashcardHeader from "@/components/apprentice/flashcards/FlashcardHeader";
import FlashcardContent from "@/components/apprentice/flashcards/FlashcardContent";
import StudyTips from "@/components/apprentice/flashcards/StudyTips";
import { flashcardCategories } from "@/components/apprentice/flashcards/FlashcardCategories";

const FlashcardsLearning = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      <FlashcardHeader />
      <FlashcardContent categories={flashcardCategories} />
      <StudyTips />
    </div>
  );
};

export default FlashcardsLearning;
