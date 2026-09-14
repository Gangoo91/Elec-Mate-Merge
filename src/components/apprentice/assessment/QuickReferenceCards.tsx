import { referenceCards, type ReferenceCard } from './data/regulationsReference';

const renderContent = (card: ReferenceCard) => {
  const { content } = card;

  switch (content.type) {
    case 'emergency-numbers':
      return (
        <div className="px-4 pb-4 pt-2 space-y-2">
          {content.numbers.map((num, idx) => (
            <div key={idx} className="flex items-baseline justify-between text-[13px]">
              <span className="text-white">{num.label}</span>
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
            <div
              key={idx}
              className="flex items-start gap-2 text-[14px] text-white leading-relaxed"
            >
              <span className="text-[12px] font-mono text-white min-w-[20px] mt-0.5">
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
            <p className="text-[11px] text-white font-mono mb-2">{content.source}</p>
          )}
          {content.points.map((point, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2 text-[14px] text-white leading-relaxed"
            >
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
              <span className="text-white">{row.label}</span>
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
                <div className="text-[12px] text-white mt-0.5 leading-relaxed">{test.reason}</div>
              </div>
              <span className="flex-shrink-0 text-[12px] text-white px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.07]">
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

/**
 * Nothing here collapses, and the emergency card is pinned.
 *
 * All nine cards were accordions, closed by default — including "Emergency
 * Numbers" and "Safe Isolation Procedure". A quick reference you have to open
 * is not quick, and emergency numbers behind a tap are worse than that: the
 * moment you need them is the moment you cannot be working a disclosure
 * one-handed.
 */
const QuickReferenceCards = () => {
  const emergency = referenceCards.filter((c) => c.color === 'red');
  const rest = referenceCards.filter((c) => c.color !== 'red');

  return (
    <div className="space-y-4">
      {emergency.map((card) => (
        <section
          key={card.id}
          className="space-y-2.5 rounded-xl border border-red-500/40 bg-red-500/[0.05] p-4 sm:p-5"
        >
          <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-300">
              Emergency
            </span>
            <h3 className="text-[15px] font-semibold tracking-tight text-white">{card.title}</h3>
          </div>
          {renderContent(card)}
        </section>
      ))}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {rest.map((card) => (
          <section
            key={card.id}
            className="space-y-2.5 rounded-xl border border-white/[0.10] bg-white/[0.04] p-4 sm:p-5"
          >
            <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
                Reference
              </span>
              <h3 className="text-[15px] font-semibold tracking-tight text-white">{card.title}</h3>
            </div>
            {renderContent(card)}
          </section>
        ))}
      </div>
    </div>
  );
};

export default QuickReferenceCards;
