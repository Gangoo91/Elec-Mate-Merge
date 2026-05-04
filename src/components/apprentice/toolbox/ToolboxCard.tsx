import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';

interface ToolboxCardProps {
  title: string;
  icon: React.ReactNode;
  link?: string;
  onSelect?: () => void;
  description?: string;
  comingSoon?: boolean;
}

const ToolboxCard = ({
  title,
  icon,
  link,
  onSelect,
  description,
  comingSoon,
}: ToolboxCardProps) => {
  const cardContent = (
    <div
      className={`rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 h-full flex flex-col gap-3 transition-colors ${
        comingSoon ? 'opacity-70' : 'hover:bg-white/[0.04] cursor-pointer'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="text-white/85 flex-shrink-0">{icon}</div>
        <h3 className="text-[16px] font-semibold text-white leading-tight flex-1">{title}</h3>
        {comingSoon && (
          <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Coming soon
          </span>
        )}
      </div>

      {description && (
        <p className="text-[14px] text-white/85 leading-relaxed flex-1">{description}</p>
      )}

      <Button
        className={`w-full h-11 mt-auto touch-manipulation ${
          comingSoon
            ? 'bg-white/[0.03] border border-white/10 text-white/55 hover:bg-white/[0.03] cursor-not-allowed'
            : 'bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold active:scale-[0.98]'
        }`}
        disabled={comingSoon}
        variant={comingSoon ? 'outline' : 'default'}
      >
        {comingSoon ? 'Coming soon' : link ? 'View details' : `Open ${title}`}
      </Button>
    </div>
  );

  if (comingSoon) {
    return <div className="h-full">{cardContent}</div>;
  }

  if (link) {
    return (
      <Link to={link} className="block h-full">
        {cardContent}
      </Link>
    );
  }

  return (
    <div onClick={onSelect} className="h-full">
      {cardContent}
    </div>
  );
};

export default ToolboxCard;
