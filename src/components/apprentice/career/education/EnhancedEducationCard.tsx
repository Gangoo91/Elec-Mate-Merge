import { Button } from '@/components/ui/button';
import { EnhancedEducationOption } from './enhancedEducationData';

interface EnhancedEducationCardProps {
  option: EnhancedEducationOption;
  onViewDetails: (option: EnhancedEducationOption) => void;
  onSaveToFavorites?: (id: number) => void;
  isFavorite?: boolean;
}

const EnhancedEducationCard = ({ option, onViewDetails }: EnhancedEducationCardProps) => {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 h-full flex flex-col gap-4">
      <div className="space-y-2">
        <div className="flex items-baseline gap-3 text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          <span>{option.level}</span>
          <span className="text-white/25">·</span>
          <span>Rated {option.rating}</span>
        </div>
        <h3 className="text-[18px] font-semibold text-white leading-tight">{option.title}</h3>
        <p className="text-[14px] text-white/70">{option.institution}</p>
      </div>

      <p className="text-[14px] text-white/85 leading-relaxed line-clamp-2">{option.description}</p>

      <div className="space-y-2 text-[14px] text-white/85 leading-relaxed">
        <div>
          <span className="text-white/55">Duration: </span>
          {option.duration}
        </div>
        <div>
          <span className="text-white/55">Cost: </span>
          {option.cost}
        </div>
        <div>
          <span className="text-white/55">Employment rate: </span>
          {option.employmentRate}%
        </div>
        <div>
          <span className="text-white/55">Next intake: </span>
          {option.nextIntakes[0]}
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
          {option.studyMode}
        </span>
        <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
          {option.industryDemand} demand
        </span>
      </div>

      <div className="space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Key topics
        </span>
        <div className="flex flex-wrap gap-1.5">
          {option.keyTopics.slice(0, 3).map((topic, idx) => (
            <span
              key={idx}
              className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]"
            >
              {topic}
            </span>
          ))}
          {option.keyTopics.length > 3 && (
            <span className="text-[12px] text-white/55">+{option.keyTopics.length - 3} more</span>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Career outcomes
        </span>
        <ul className="space-y-1.5">
          {option.careerOutcomes.slice(0, 2).map((outcome, idx) => (
            <li
              key={idx}
              className="text-[13px] text-white/85 leading-relaxed flex items-start gap-2"
            >
              <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
              <span>{outcome}</span>
            </li>
          ))}
          {option.careerOutcomes.length > 2 && (
            <li className="text-[12px] text-white/55">
              +{option.careerOutcomes.length - 2} more roles
            </li>
          )}
        </ul>
      </div>

      <div className="mt-auto pt-3 border-t border-white/[0.06] space-y-3">
        <div className="flex items-baseline justify-between text-[14px]">
          <span className="text-white/55">Starting salary</span>
          <span className="text-white/85">{option.averageStartingSalary}</span>
        </div>
        <Button
          className="w-full h-10 bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation"
          onClick={() => onViewDetails(option)}
        >
          View full details
        </Button>
      </div>
    </div>
  );
};

export default EnhancedEducationCard;
