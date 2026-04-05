import { LucideIcon, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HubCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  href: string;
  gradient: string;
  iconColor: string;
  delay?: number;
  comingSoon?: boolean;
}

export const HubCard = ({
  title,
  description,
  icon: _Icon,
  features,
  href,
  gradient: _gradient,
  iconColor: _iconColor,
  comingSoon = false,
}: HubCardProps) => {
  const CardWrapper = comingSoon ? 'div' : Link;
  const cardProps = comingSoon ? {} : { to: href };

  return (
    <CardWrapper
      {...cardProps}
      className={`block group touch-manipulation ${comingSoon ? 'cursor-default' : ''}`}
    >
      <div
        className={`relative overflow-hidden card-surface-interactive rounded-2xl h-full transition-all duration-200 active:scale-[0.98] ${comingSoon ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {/* Top accent line */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-elec-yellow via-amber-400 to-orange-400 opacity-30 group-hover:opacity-80 transition-opacity duration-200" />

        <div className="relative z-10 flex flex-col h-full p-4 sm:p-5">
          {/* Coming Soon pill */}
          {comingSoon && (
            <span className="absolute top-3 right-3 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-elec-yellow text-black rounded-full z-20">
              Soon
            </span>
          )}

          {/* Title */}
          <h3 className="text-sm sm:text-base font-semibold text-white leading-tight group-hover:text-elec-yellow transition-colors">
            {title}
          </h3>

          {/* Description */}
          <p className="mt-0.5 text-[11px] sm:text-[12px] text-white leading-tight line-clamp-2">
            {description}
          </p>

          {/* Features */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {features.map((feature) => (
              <span
                key={feature}
                className="px-2 py-0.5 rounded-full bg-white/[0.06] text-white text-[10px] font-medium"
              >
                {feature}
              </span>
            ))}
          </div>

          <div className="flex-grow" />

          {/* Bottom action row */}
          {!comingSoon && (
            <div className="mt-3 flex items-center justify-between">
              <span className="text-[11px] sm:text-xs font-medium text-elec-yellow">Open</span>
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/[0.05] border border-elec-yellow/20 flex items-center justify-center group-hover:bg-elec-yellow group-hover:border-elec-yellow transition-all duration-200">
                <ChevronRight className="w-3.5 h-3.5 text-white group-hover:text-black group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>
          )}
        </div>
      </div>
    </CardWrapper>
  );
};
