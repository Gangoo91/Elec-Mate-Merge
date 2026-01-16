import { LucideIcon } from 'lucide-react';

interface AIAgentCardProps {
  name: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  iconBg: string;
  delay?: number;
}

export const AIAgentCard = ({
  name,
  description,
  icon: Icon,
  gradient,
  iconBg,
}: AIAgentCardProps) => {
  return (
    <div
      className={`flex-shrink-0 w-[240px] sm:w-auto rounded-xl p-4 sm:p-5 ${gradient} border border-white/[0.06] touch-manipulation transition-all duration-200 active:scale-[0.98]`}
    >
      <div className={`inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-lg ${iconBg} mb-2.5 sm:mb-3`}>
        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </div>
      <h4 className="text-base sm:text-lg font-semibold text-white mb-1">{name}</h4>
      <p className="text-xs sm:text-sm text-white/50 leading-relaxed line-clamp-2">{description}</p>
    </div>
  );
};
