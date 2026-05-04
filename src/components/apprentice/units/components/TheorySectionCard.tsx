import { Link } from 'react-router-dom';

interface TheorySectionCardProps {
  sectionNumber: string | number;
  title: string;
  description: string;
  courseSlug: string;
  unitCode: string;
  onClick: () => void;
}

const TheorySectionCard = ({
  sectionNumber,
  title,
  description,
  courseSlug,
  unitCode,
  onClick,
}: TheorySectionCardProps) => {
  const unitCodeFormatted = unitCode.toLowerCase().replace('/', '-');

  return (
    <Link
      to={`/apprentice/study/eal/${courseSlug}/unit/${unitCodeFormatted}/section/${sectionNumber}`}
      onClick={onClick}
      className="block h-full touch-manipulation"
    >
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 h-full active:bg-white/[0.04] transition-colors">
        <div className="flex flex-col space-y-2">
          <div className="flex items-baseline gap-3">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55 font-mono">
              {sectionNumber}
            </span>
            <h3 className="text-[16px] font-semibold text-white leading-tight">{title}</h3>
          </div>
          <p className="text-[14px] text-white/70 leading-relaxed">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default TheorySectionCard;
