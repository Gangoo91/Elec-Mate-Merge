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
  icon: Icon,
  features,
  href,
  gradient,
  iconColor,
  comingSoon = false,
}: HubCardProps) => {
  const CardWrapper = comingSoon ? 'div' : Link;
  const cardProps = comingSoon ? {} : { to: href };

  return (
    <CardWrapper {...cardProps} className={`block group touch-manipulation ${comingSoon ? 'cursor-default' : ''}`}>
      <div
        className={`relative overflow-hidden rounded-2xl p-5 sm:p-6 ${gradient} border border-white/[0.06] h-full transition-all duration-200 ${!comingSoon ? 'hover:border-white/15 active:scale-[0.98]' : ''}`}
      >
        {/* Coming Soon Banner */}
        {comingSoon && (
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-purple-500/90 text-white text-[10px] sm:text-xs font-semibold">
            Coming Soon
          </div>
        )}

        {/* Icon */}
        <div className={`inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl ${iconColor} bg-white/10 mb-3 sm:mb-4`}>
          <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5 sm:mb-2">{title}</h3>

        {/* Description */}
        <p className="text-white/50 mb-3 sm:mb-4 text-sm leading-relaxed line-clamp-2">{description}</p>

        {/* Features */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
          {features.map((feature) => (
            <span
              key={feature}
              className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-white/[0.06] text-white/70 text-[10px] sm:text-xs font-medium"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* Arrow indicator */}
        {comingSoon ? (
          <div className="h-4" />
        ) : (
          <div className="flex items-center text-white/40 group-hover:text-white/70 transition-colors duration-200">
            <span className="text-xs sm:text-sm font-medium">Explore</span>
            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-0.5 group-hover:translate-x-1 transition-transform duration-200" />
          </div>
        )}
      </div>
    </CardWrapper>
  );
};
