import { ReactNode } from 'react';
import BookmarkButton from '@/components/career/BookmarkButton';

interface CareerPathCardProps {
  title: string;
  requirements: string;
  description: string;
  icon: ReactNode;
  skills: string[];
  salaryRange: string;
  timeToAchieve: string;
}

const CareerPathCard = ({
  title,
  requirements,
  description,
  skills,
  salaryRange,
  timeToAchieve,
}: CareerPathCardProps) => {
  const careerPathId = title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');

  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 h-full flex flex-col gap-4 animate-fade-in">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            {requirements}
          </span>
          <h3 className="text-[18px] font-semibold text-white leading-tight">{title}</h3>
        </div>
        <BookmarkButton careerPathId={careerPathId} />
      </div>

      <p className="text-[14px] text-white/85 leading-relaxed">{description}</p>

      <div className="space-y-3 mt-auto">
        <div className="space-y-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Key skills
          </span>
          <ul className="grid grid-cols-2 gap-x-2 gap-y-1">
            {skills.map((skill, idx) => (
              <li key={idx} className="flex items-center gap-2 text-[13px] text-white/85">
                <span className="h-1 w-1 rounded-full bg-white/55 flex-shrink-0" />
                <span>{skill}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/[0.06]">
          <div className="space-y-1">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Salary range
            </span>
            <p className="text-[13px] text-white">{salaryRange}</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Time to achieve
            </span>
            <p className="text-[13px] text-white">{timeToAchieve}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerPathCard;
