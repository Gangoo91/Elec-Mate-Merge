import { useState } from 'react';
import { Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';

const tips = [
  'Study 10-15 minutes daily — consistency beats cramming.',
  'Use spaced repetition to boost long-term retention.',
  'Try to recall the answer before flipping — active recall strengthens memory.',
  'Mix up different flashcard sets for better learning.',
  'Focus extra time on cards you find challenging.',
  'Link flashcard content to your real on-site experience.',
  'Study at the same time each day to build a habit.',
  'Take strategic breaks — 25 mins study, 5 mins rest.',
  'Find a quiet space and minimise distractions.',
];

const StudyTipsCard = () => {
  const [expanded, setExpanded] = useState(false);
  const dailyIndex = new Date().getDate() % tips.length;
  const todayTip = tips[dailyIndex];

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 p-3 touch-manipulation text-left"
      >
        <Lightbulb className="h-4 w-4 text-elec-yellow flex-shrink-0" />
        <p className="text-xs text-white flex-1">
          <span className="font-medium text-elec-yellow">Tip of the Day:</span> {todayTip}
        </p>
        {expanded ? (
          <ChevronUp className="h-4 w-4 text-white flex-shrink-0" />
        ) : (
          <ChevronDown className="h-4 w-4 text-white flex-shrink-0" />
        )}
      </button>

      {expanded && (
        <div className="px-3 pb-3 space-y-1.5 border-t border-white/10 pt-2">
          {tips.map((tip, i) => (
            <div
              key={i}
              className={`text-xs text-white flex items-start gap-2 ${
                i === dailyIndex ? 'font-medium text-elec-yellow' : ''
              }`}
            >
              <span className="text-white flex-shrink-0">{i + 1}.</span>
              <span>{tip}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudyTipsCard;
