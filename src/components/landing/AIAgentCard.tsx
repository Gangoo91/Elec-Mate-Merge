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
      className={`flex-shrink-0 w-[280px] sm:w-auto rounded-2xl p-5 ${gradient} border border-white/10 touch-manipulation transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.98]`}
    >
      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${iconBg} mb-3`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h4 className="text-lg font-semibold text-white mb-1">{name}</h4>
      <p className="text-sm text-white/70 leading-relaxed">{description}</p>
    </div>
  );
};
