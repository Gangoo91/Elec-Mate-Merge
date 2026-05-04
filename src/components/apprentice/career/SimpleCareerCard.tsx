import { ChevronRight } from 'lucide-react';

interface SimpleCareerCardProps {
  title: string;
  description?: string;
  icon: React.ReactNode;
  onClick: () => void;
  showComingSoon?: boolean;
  stats?: {
    label: string;
    value: string;
  }[];
  badge?: string;
  accentColor?: 'yellow' | 'green' | 'blue' | 'purple' | 'orange';
}

const SimpleCareerCard = ({
  title,
  description,
  icon,
  onClick,
  showComingSoon,
  stats,
  badge,
}: SimpleCareerCardProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors h-full w-full text-left p-4 sm:p-5 flex flex-col gap-3 touch-manipulation active:scale-[0.98]"
    >
      {(showComingSoon || badge) && (
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          {showComingSoon ? 'Coming soon' : badge}
        </span>
      )}

      <div className="flex items-start justify-between gap-3">
        <div className="text-white/70">{icon}</div>
        <ChevronRight className="h-4 w-4 text-white/40 group-hover:text-white/70 transition-colors" />
      </div>

      <h3 className="text-[16px] sm:text-[17px] font-semibold leading-tight text-white">
        {title}
      </h3>

      {description && (
        <p className="text-[13px] text-white/70 leading-relaxed line-clamp-2">{description}</p>
      )}

      {stats && stats.length > 0 && (
        <div className={`grid ${stats.length === 1 ? 'grid-cols-1' : 'grid-cols-2'} gap-2 mt-auto`}>
          {stats.map((stat, index) => (
            <div
              key={index}
              className="rounded-md border border-white/10 bg-white/[0.03] p-2 text-center"
            >
              <div className="text-[14px] font-semibold text-white">{stat.value}</div>
              <div className="text-[10px] text-white/55 uppercase tracking-[0.12em]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      )}
    </button>
  );
};

export default SimpleCareerCard;
