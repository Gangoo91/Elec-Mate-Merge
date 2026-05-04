import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';
import { ExternalLink } from 'lucide-react';

interface Tool {
  name: string;
  description: string;
  priceRange: string;
  priority: 'essential' | 'recommended' | 'optional';
  ukStandard?: string;
}

interface ToolCardProps {
  title: string;
  icon: ReactNode;
  description: string;
  items: Tool[];
  apprenticeTip: string;
  ukConsideration: string;
}

const ToolCard = ({
  title,
  description,
  items,
  apprenticeTip,
  ukConsideration,
}: ToolCardProps) => {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4 h-full">
      <div className="space-y-2">
        <h3 className="text-[18px] font-semibold text-white leading-tight">{title}</h3>
        <p className="text-[14px] text-white/85 leading-relaxed">{description}</p>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-2"
          >
            <div className="flex items-baseline justify-between gap-3">
              <h4 className="text-[14px] font-medium text-white">{item.name}</h4>
              <span className="text-[10px] uppercase tracking-[0.18em] text-white/55 flex-shrink-0">
                {item.priority}
              </span>
            </div>
            <p className="text-[13px] text-white/85 leading-relaxed">{item.description}</p>
            {item.ukStandard && (
              <p className="text-[12px] text-white/55">{item.ukStandard}</p>
            )}
            <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
              <span className="text-[14px] font-semibold text-white">{item.priceRange}</span>
              <Button
                size="sm"
                className="h-9 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation"
              >
                View product
                <ExternalLink className="w-3 h-3 ml-1" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3 pt-2 border-t border-white/[0.06]">
        <div className="space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Apprentice tip
          </span>
          <p className="text-[13px] text-white/85 leading-relaxed">{apprenticeTip}</p>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            UK consideration
          </span>
          <p className="text-[13px] text-white/85 leading-relaxed">{ukConsideration}</p>
        </div>
      </div>
    </div>
  );
};

export default ToolCard;
