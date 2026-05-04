import { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CourseCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href?: string;
  number?: string;
  comingSoon?: boolean;
}

export function CourseCard({
  title,
  description,
  icon: _Icon,
  href,
  number,
  comingSoon,
}: CourseCardProps) {
  const Inner = (
    <div
      className={`relative rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 h-full space-y-2 ${comingSoon ? 'opacity-70' : 'active:bg-white/[0.04] transition-colors'}`}
    >
      {comingSoon && (
        <span className="absolute top-3 right-3 text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow">
          Coming soon
        </span>
      )}
      {number && (
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55 font-mono">
          {number}
        </span>
      )}
      <h3 className="text-[16px] font-semibold text-white leading-tight">{title}</h3>
      <p className="text-[14px] text-white/70 leading-relaxed line-clamp-4">{description}</p>
    </div>
  );

  if (href && !comingSoon) {
    return (
      <Link to={href} className="block h-full touch-manipulation">
        {Inner}
      </Link>
    );
  }

  return <div className="block h-full">{Inner}</div>;
}
