import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import {
  ChevronDown, Phone, Shield, FileText, AlertTriangle,
  Scale, Zap, HardHat, TestTube,
} from "lucide-react";
import { referenceCards, type ReferenceCard } from "./data/regulationsReference";

const iconMap: Record<string, React.ElementType> = {
  Phone,
  Shield,
  FileText,
  AlertTriangle,
  Scale,
  Zap,
  HardHat,
  TestTube,
};

const colorMap: Record<string, { bg: string; border: string; text: string; triggerBg: string }> = {
  red: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400', triggerBg: 'bg-red-500/10' },
  green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400', triggerBg: 'bg-green-500/10' },
  yellow: { bg: 'bg-elec-yellow/10', border: 'border-elec-yellow/30', text: 'text-elec-yellow', triggerBg: 'bg-elec-yellow/10' },
  blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', triggerBg: 'bg-blue-500/10' },
  amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', triggerBg: 'bg-amber-500/10' },
  orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-400', triggerBg: 'bg-orange-500/10' },
};

const priorityColors: Record<string, string> = {
  High: 'bg-red-500/20 text-red-400 border-red-500/30',
  Medium: 'bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30',
  Low: 'bg-green-500/20 text-green-400 border-green-500/30',
};

const renderContent = (card: ReferenceCard) => {
  const { content } = card;

  switch (content.type) {
    case 'emergency-numbers':
      return (
        <div className="px-4 pb-4 pt-2 space-y-2 text-sm">
          {content.numbers.map((num, idx) => (
            <div key={idx} className="flex justify-between">
              <span className="text-white">{num.label}:</span>
              <span className={`font-mono font-bold ${idx === 0 ? 'text-red-400' : 'text-white'}`}>{num.number}</span>
            </div>
          ))}
        </div>
      );

    case 'steps':
      return (
        <div className="px-4 pb-4 pt-2 space-y-2 text-sm">
          {content.steps.map((step, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <span className="bg-green-500/30 text-white px-2 py-0.5 rounded text-xs font-bold min-w-[24px] text-center flex-shrink-0">
                {idx + 1}
              </span>
              <span className="text-white">{step}</span>
            </div>
          ))}
        </div>
      );

    case 'key-points':
      return (
        <div className="px-4 pb-4 pt-2 space-y-2 text-sm">
          {content.source && (
            <p className="text-xs text-blue-400 font-medium mb-2">{content.source}</p>
          )}
          {content.points.map((point, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-white/40 rounded-full mt-1.5 flex-shrink-0" />
              <span className="text-white">{point}</span>
            </div>
          ))}
        </div>
      );

    case 'table':
      return (
        <div className="px-4 pb-4 pt-2 space-y-2 text-sm">
          {content.rows.map((row, idx) => (
            <div key={idx} className="flex justify-between">
              <span className="text-white">{row.label}:</span>
              <span className="text-white">{row.value}</span>
            </div>
          ))}
        </div>
      );

    case 'testing-priorities':
      return (
        <div className="px-4 pb-4 pt-2 space-y-3 text-sm">
          {content.tests.map((test, idx) => (
            <div key={idx} className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="font-medium text-white">{test.test}</div>
                <div className="text-xs text-white mt-0.5">{test.reason}</div>
              </div>
              <Badge className={`flex-shrink-0 ${priorityColors[test.priority]}`}>
                {test.priority}
              </Badge>
            </div>
          ))}
        </div>
      );

    default:
      return null;
  }
};

const QuickReferenceCards = () => {
  return (
    <div className="space-y-3">
      {referenceCards.map(card => {
        const Icon = iconMap[card.icon] || AlertTriangle;
        const colors = colorMap[card.color] || colorMap.blue;

        return (
          <Collapsible key={card.id}>
            <CollapsibleTrigger className={`w-full flex items-center justify-between p-4 rounded-xl ${colors.triggerBg} border ${colors.border} touch-manipulation h-auto min-h-[44px]`}>
              <div className="flex items-center gap-2">
                <Icon className={`h-4 w-4 ${colors.text}`} />
                <span className={`${colors.text.replace('text-', 'text-').replace('-400', '-300').replace('text-elec-yellow', 'text-elec-yellow')} font-semibold text-sm`}>
                  {card.title}
                </span>
              </div>
              <ChevronDown className={`h-4 w-4 ${colors.text} transition-transform [[data-state=open]>&]:rotate-180`} />
            </CollapsibleTrigger>
            <CollapsibleContent>
              {renderContent(card)}
            </CollapsibleContent>
          </Collapsible>
        );
      })}
    </div>
  );
};

export default QuickReferenceCards;
