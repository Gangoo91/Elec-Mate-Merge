import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  ChevronDown,
  ListOrdered,
  ShieldAlert,
  Gauge,
  Anchor,
  Table,
  ShieldCheck,
  Palette,
  Wrench,
  HeartPulse,
  AlertTriangle,
} from 'lucide-react';
import {
  bs7671ReferenceCards,
  type BS7671ReferenceCard,
  type BS7671ReferenceContent,
} from './data/bs7671ReferenceData';

const iconMap: Record<string, React.ElementType> = {
  ListOrdered,
  ShieldAlert,
  Gauge,
  Anchor,
  Table,
  ShieldCheck,
  Palette,
  Wrench,
  HeartPulse,
};

const colorMap: Record<string, { bg: string; border: string; text: string; triggerBg: string }> = {
  cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400', triggerBg: 'bg-cyan-500/10' },
  red: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400', triggerBg: 'bg-red-500/10' },
  green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400', triggerBg: 'bg-green-500/10' },
  yellow: { bg: 'bg-elec-yellow/10', border: 'border-elec-yellow/30', text: 'text-elec-yellow', triggerBg: 'bg-elec-yellow/10' },
  blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', triggerBg: 'bg-blue-500/10' },
  purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400', triggerBg: 'bg-purple-500/10' },
  amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', triggerBg: 'bg-amber-500/10' },
  orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-400', triggerBg: 'bg-orange-500/10' },
};

const renderContent = (card: BS7671ReferenceCard) => {
  const { content } = card;
  const colors = colorMap[card.color] || colorMap.cyan;

  switch (content.type) {
    case 'steps':
      return (
        <div className="px-4 pb-4 pt-3 mt-1 space-y-2 text-sm rounded-b-xl bg-white/[0.02]">
          {content.steps.map((step, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <span className={`${colors.bg} ${colors.text} px-2 py-0.5 rounded text-xs font-bold min-w-[24px] text-center flex-shrink-0`}>
                {idx + 1}
              </span>
              <span className="text-white">{step}</span>
            </div>
          ))}
        </div>
      );

    case 'key-points':
      return (
        <div className="px-4 pb-4 pt-3 mt-1 space-y-2 text-sm rounded-b-xl bg-white/[0.02]">
          {content.source && (
            <p className={`text-xs ${colors.text} font-medium mb-2`}>{content.source}</p>
          )}
          {content.points.map((point, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-white rounded-full mt-1.5 flex-shrink-0" />
              <span className="text-white">{point}</span>
            </div>
          ))}
        </div>
      );

    case 'table':
      return (
        <div className="px-4 pb-4 pt-3 mt-1 space-y-2 text-sm rounded-b-xl bg-white/[0.02]">
          {content.rows.map((row, idx) => (
            <div key={idx} className="p-2 rounded bg-white/[0.03] text-left">
              <span className="text-white">{row.label}: </span>
              <span className="text-white font-medium">{row.value}</span>
            </div>
          ))}
        </div>
      );

    case 'grouped-table':
      return (
        <div className="px-4 pb-4 pt-3 mt-1 space-y-4 text-sm rounded-b-xl bg-white/[0.02]">
          {content.groups.map((group, gIdx) => (
            <div key={gIdx}>
              <h4 className={`text-xs font-semibold ${colors.text} uppercase tracking-wide mb-2`}>
                {group.heading}
              </h4>
              <div className="space-y-1">
                {group.rows.map((row, rIdx) => (
                  <div key={rIdx} className="p-2 rounded bg-white/[0.03] text-left">
                    <span className="text-white">{row.label}: </span>
                    <span className="text-white font-mono">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      );

    case 'colour-codes':
      return (
        <div className="px-4 pb-4 pt-3 mt-1 space-y-4 text-sm rounded-b-xl bg-white/[0.02]">
          {content.sections.map((section, sIdx) => (
            <div key={sIdx}>
              <h4 className={`text-xs font-semibold ${colors.text} uppercase tracking-wide mb-2`}>
                {section.heading}
              </h4>
              <div className="space-y-1.5">
                {section.codes.map((code, cIdx) => (
                  <div key={cIdx} className="flex items-center gap-3 p-2 rounded bg-white/5">
                    <div className={`w-6 h-6 rounded ${code.tailwindBg} flex-shrink-0 border border-white/20`} />
                    <div className="min-w-0">
                      <span className="text-white font-medium">{code.colour}</span>
                      <span className="text-white"> — {code.function}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      );

    default:
      return null;
  }
};

const BS7671QuickReferencePanel = () => {
  return (
    <div className="space-y-3 text-left">
      {bs7671ReferenceCards.map(card => {
        const Icon = iconMap[card.icon] || AlertTriangle;
        const colors = colorMap[card.color] || colorMap.cyan;

        return (
          <Collapsible key={card.id}>
            <CollapsibleTrigger className={`w-full flex items-center justify-between p-4 rounded-xl ${colors.triggerBg} border ${colors.border} touch-manipulation h-auto min-h-[44px]`}>
              <div className="flex items-center gap-2">
                <Icon className={`h-4 w-4 ${colors.text}`} />
                <span className="font-semibold text-sm text-white">
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

export default BS7671QuickReferencePanel;
