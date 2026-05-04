import { ArrowRight } from 'lucide-react';

interface CareerSectionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const CareerSectionCard = ({ title, description, icon, onClick }: CareerSectionCardProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors h-full w-full text-left p-4 sm:p-5 flex flex-col gap-3 group touch-manipulation active:scale-[0.98]"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-[16px] sm:text-[17px] font-semibold text-white leading-tight">
          {title}
        </h3>
        <ArrowRight className="h-4 w-4 text-white/40 group-hover:text-white/70 transition-colors flex-shrink-0" />
      </div>

      <p className="text-[13px] text-white/70 leading-relaxed flex-1">{description}</p>

      <div className="text-white/55">{icon}</div>
    </button>
  );
};

export default CareerSectionCard;
