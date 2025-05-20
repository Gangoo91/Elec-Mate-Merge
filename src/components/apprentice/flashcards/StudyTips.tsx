
import { Info } from "lucide-react";

const StudyTips = () => {
  return (
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
  );
};

export default StudyTips;
