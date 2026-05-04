interface BrandComparison {
  brand: string;
  model: string;
  price: string;
  rating: number;
  warranty: string;
  features: string[];
  pros: string[];
  cons: string[];
  bestFor: string;
}

interface ToolComparisonChartProps {
  title: string;
  tools: BrandComparison[];
  category: string;
}

const ToolComparisonChart = ({ title, tools, category }: ToolComparisonChartProps) => {
  const getValueLabel = (index: number) => {
    if (index === 0) return 'Best overall';
    if (index === 1) return 'Best value';
    if (index === 2) return 'Budget pick';
    return null;
  };

  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
      <div className="space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Comparison
        </span>
        <h3 className="text-[18px] font-semibold text-white leading-tight">{title}</h3>
        <p className="text-[14px] text-white/85 leading-relaxed">
          Professional comparison of top {category} tools for UK electricians.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {tools.map((tool, index) => {
          const label = getValueLabel(index);
          return (
            <div
              key={index}
              className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                  <h4 className="text-[14px] font-medium text-white">{tool.brand}</h4>
                  <p className="text-[13px] text-white/85">{tool.model}</p>
                </div>
                {label && (
                  <span className="text-[10px] uppercase tracking-[0.18em] text-white/55 flex-shrink-0">
                    {label}
                  </span>
                )}
              </div>

              <div className="space-y-1 text-[13px] text-white/85">
                <div className="flex justify-between">
                  <span>Price</span>
                  <span className="font-mono text-white">{tool.price}</span>
                </div>
                <div className="flex justify-between">
                  <span>Rating</span>
                  <span className="font-mono text-white">{tool.rating}/5</span>
                </div>
                <div className="flex justify-between">
                  <span>Warranty</span>
                  <span>{tool.warranty}</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  Key features
                </span>
                <ul className="text-[13px] text-white/85 space-y-0.5">
                  {tool.features.slice(0, 3).map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2 space-y-1">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  Best for
                </span>
                <p className="text-[13px] text-white/85 leading-relaxed">{tool.bestFor}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ToolComparisonChart;
