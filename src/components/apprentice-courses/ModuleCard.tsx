import { LucideIcon, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface ModuleCardProps {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  href?: string;
  comingSoon?: boolean;
}

export function ModuleCard({
  number,
  title,
  description,
  icon: Icon,
  href,
  comingSoon,
}: ModuleCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (comingSoon) return;
    if (href) navigate(href);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={comingSoon || !href}
      className={cn(
        'group relative w-full text-left h-full min-h-[140px] rounded-2xl overflow-hidden',
        'bg-[hsl(0_0%_12%)] border border-white/[0.06]',
        'p-5 flex flex-col',
        comingSoon
          ? 'opacity-60 cursor-not-allowed'
          : 'hover:bg-[hsl(0_0%_15%)] active:scale-[0.99] cursor-pointer touch-manipulation transition-colors'
      )}
    >
      {/* Hairline top accent — matches the editorial system */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/70 via-amber-400/70 to-orange-400/70 opacity-70 group-hover:opacity-100 transition-opacity" />

      {/* Header — eyebrow + coming-soon pill */}
      <div className="flex items-start justify-between gap-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
          {number}
        </span>
        {comingSoon && (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-300 border border-amber-500/30">
            Soon
          </span>
        )}
      </div>

      {/* Icon + title */}
      <div className="mt-4 flex items-start gap-3">
        <div className="shrink-0 h-8 w-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
          <Icon className="h-3.5 w-3.5 text-white" strokeWidth={1.8} />
        </div>
        <h3 className="text-[14.5px] sm:text-[15px] font-semibold text-white leading-snug tracking-tight line-clamp-2 flex-1 min-w-0">
          {title}
        </h3>
      </div>

      {description && (
        <p className="mt-2.5 text-[12px] text-white leading-relaxed line-clamp-2">
          {description}
        </p>
      )}

      <div className="flex-grow" />

      {/* CTA */}
      <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-end gap-2">
        <span
          className={cn(
            'text-[12px] font-medium transition-all',
            comingSoon
              ? 'text-amber-300/80'
              : 'text-elec-yellow/90 group-hover:text-elec-yellow group-hover:translate-x-0.5'
          )}
        >
          {comingSoon ? 'Coming soon' : 'Open'}
        </span>
        {!comingSoon && (
          <ChevronRight className="h-3.5 w-3.5 text-elec-yellow/90 group-hover:text-elec-yellow group-hover:translate-x-0.5 transition-all" />
        )}
      </div>
    </button>
  );
}
