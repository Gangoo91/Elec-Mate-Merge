import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import {
  bs7671ReferenceCards,
  type BS7671ReferenceCard,
} from './data/bs7671ReferenceData';

const renderContent = (card: BS7671ReferenceCard) => {
  const { content } = card;

  switch (content.type) {
    case 'steps':
      return (
        <div className="px-4 pb-4 pt-3 mt-1 space-y-2 text-[14px] rounded-b-xl bg-white/[0.02]">
          {content.steps.map((step, idx) => (
            <div key={idx} className="flex items-start gap-2.5">
              <span className="bg-white/5 text-white/85 px-2 py-0.5 rounded text-[11px] font-mono min-w-[24px] text-center flex-shrink-0">
                {idx + 1}
              </span>
              <span className="text-white/85 leading-relaxed">{step}</span>
            </div>
          ))}
        </div>
      );

    case 'key-points':
      return (
        <div className="px-4 pb-4 pt-3 mt-1 space-y-2 text-[14px] rounded-b-xl bg-white/[0.02]">
          {content.source && (
            <p className="text-[11px] text-white/55 font-mono mb-2">{content.source}</p>
          )}
          {content.points.map((point, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <span className="w-1 h-1 bg-white/55 rounded-full mt-2 flex-shrink-0" />
              <span className="text-white/85 leading-relaxed">{point}</span>
            </div>
          ))}
        </div>
      );

    case 'table':
      return (
        <div className="px-4 pb-4 pt-3 mt-1 space-y-1 text-[13px] rounded-b-xl bg-white/[0.02]">
          {content.rows.map((row, idx) => (
            <div
              key={idx}
              className="flex items-baseline justify-between gap-3 py-1.5 border-b border-white/[0.04] last:border-0"
            >
              <span className="text-white/70">{row.label}</span>
              <span className="text-white font-mono text-right">{row.value}</span>
            </div>
          ))}
        </div>
      );

    case 'grouped-table':
      return (
        <div className="px-4 pb-4 pt-3 mt-1 space-y-4 text-[13px] rounded-b-xl bg-white/[0.02]">
          {content.groups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1.5">
              <h4 className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                {group.heading}
              </h4>
              <div className="space-y-1">
                {group.rows.map((row, rIdx) => (
                  <div
                    key={rIdx}
                    className="flex items-baseline justify-between gap-3 py-1.5 border-b border-white/[0.04] last:border-0"
                  >
                    <span className="text-white/70">{row.label}</span>
                    <span className="text-white font-mono text-right">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      );

    case 'colour-codes':
      return (
        <div className="px-4 pb-4 pt-3 mt-1 space-y-4 text-[13px] rounded-b-xl bg-white/[0.02]">
          {content.sections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-2">
              <h4 className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                {section.heading}
              </h4>
              <div className="space-y-1.5">
                {section.codes.map((code, cIdx) => (
                  <div key={cIdx} className="flex items-center gap-3 py-1">
                    <div
                      className={`w-5 h-5 rounded ${code.tailwindBg} flex-shrink-0 border border-white/15`}
                    />
                    <div className="min-w-0">
                      <span className="text-white">{code.colour}</span>
                      <span className="text-white/55"> — {code.function}</span>
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
    <div className="space-y-2 text-left">
      {bs7671ReferenceCards.map((card) => (
        <Collapsible key={card.id}>
          <CollapsibleTrigger className="w-full flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] touch-manipulation h-auto min-h-[44px] transition-colors">
            <span className="text-[14px] font-medium text-white text-left">{card.title}</span>
            <ChevronDown className="h-4 w-4 text-white/55 transition-transform [[data-state=open]>&]:rotate-180 flex-shrink-0" />
          </CollapsibleTrigger>
          <CollapsibleContent>{renderContent(card)}</CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
};

export default BS7671QuickReferencePanel;
