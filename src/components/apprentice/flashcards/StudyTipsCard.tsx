import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

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
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02]">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 p-4 touch-manipulation text-left"
      >
        <div className="flex-1 min-w-0 space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Tip of the day
          </span>
          <p className="text-[14px] text-white/85 leading-relaxed">{todayTip}</p>
        </div>
        {expanded ? (
          <ChevronUp className="h-4 w-4 text-white/55 flex-shrink-0" />
        ) : (
          <ChevronDown className="h-4 w-4 text-white/55 flex-shrink-0" />
        )}
      </button>

      {expanded && (
        <div className="px-4 pb-4 pt-2 space-y-2 border-t border-white/[0.06]">
          {tips.map((tip, i) => (
            <div
              key={i}
              className={`text-[14px] leading-relaxed flex items-start gap-2 ${
                i === dailyIndex ? 'text-elec-yellow' : 'text-white/85'
              }`}
            >
              <span className="text-[12px] text-white/55 font-mono w-5 flex-shrink-0">{i + 1}.</span>
              <span>{tip}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudyTipsCard;
