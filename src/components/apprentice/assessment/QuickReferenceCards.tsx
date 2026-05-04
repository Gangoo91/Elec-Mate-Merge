import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import { referenceCards, type ReferenceCard } from './data/regulationsReference';

const renderContent = (card: ReferenceCard) => {
  const { content } = card;

  switch (content.type) {
    case 'emergency-numbers':
      return (
        <div className="px-4 pb-4 pt-2 space-y-2">
          {content.numbers.map((num, idx) => (
            <div key={idx} className="flex items-baseline justify-between text-[13px]">
              <span className="text-white/85">{num.label}</span>
              <span className={`font-mono font-bold ${idx === 0 ? 'text-red-300' : 'text-white'}`}>
                {num.number}
              </span>
            </div>
          ))}
        </div>
      );

    case 'steps':
      return (
        <div className="px-4 pb-4 pt-2 space-y-2">
          {content.steps.map((step, idx) => (
            <div key={idx} className="flex items-start gap-2 text-[14px] text-white/85 leading-relaxed">
              <span className="text-[12px] font-mono text-white/55 min-w-[20px] mt-0.5">
                {idx + 1}.
              </span>
              <span>{step}</span>
            </div>
          ))}
        </div>
      );

    case 'key-points':
      return (
        <div className="px-4 pb-4 pt-2 space-y-2">
          {content.source && (
            <p className="text-[11px] text-white/55 font-mono mb-2">{content.source}</p>
          )}
          {content.points.map((point, idx) => (
            <div key={idx} className="flex items-start gap-2 text-[14px] text-white/85 leading-relaxed">
              <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
              <span>{point}</span>
            </div>
          ))}
        </div>
      );

    case 'table':
      return (
        <div className="px-4 pb-4 pt-2 space-y-2">
          {content.rows.map((row, idx) => (
            <div key={idx} className="flex items-baseline justify-between text-[13px]">
              <span className="text-white/85">{row.label}</span>
              <span className="text-white font-mono">{row.value}</span>
            </div>
          ))}
        </div>
      );

    case 'testing-priorities':
      return (
        <div className="px-4 pb-4 pt-2 space-y-3">
          {content.tests.map((test, idx) => (
            <div key={idx} className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-[14px] text-white">{test.test}</div>
                <div className="text-[12px] text-white/55 mt-0.5 leading-relaxed">{test.reason}</div>
              </div>
              <span className="flex-shrink-0 text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
                {test.priority}
              </span>
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
      {referenceCards.map((card) => {
        const isEmergency = card.color === 'red';

        return (
          <Collapsible key={card.id}>
            <CollapsibleTrigger
              className={`w-full flex items-center justify-between p-4 rounded-xl border touch-manipulation h-auto min-h-[44px] ${
                isEmergency
                  ? 'border-red-500/30 bg-red-500/[0.04]'
                  : 'border-white/[0.06] bg-white/[0.02]'
              }`}
            >
              <div className="flex flex-col items-start gap-1">
                <span
                  className={`text-[10px] font-medium uppercase tracking-[0.18em] ${
                    isEmergency ? 'text-red-300' : 'text-white/55'
                  }`}
                >
                  {isEmergency ? 'Emergency' : 'Reference'}
                </span>
                <span className="text-[14px] font-medium text-white text-left">{card.title}</span>
              </div>
              <ChevronDown className="h-4 w-4 text-white/55 transition-transform [[data-state=open]>&]:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent>{renderContent(card)}</CollapsibleContent>
          </Collapsible>
        );
      })}
    </div>
  );
};

export default QuickReferenceCards;
