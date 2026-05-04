interface ToolSpec {
  name: string;
  description: string;
  specifications: {
    standard?: string;
    voltage?: string;
    capacity?: string;
    material?: string;
    certification?: string;
  };
  priceRange: string;
  priority: 'essential' | 'recommended' | 'optional';
  pros: string[];
  cons: string[];
  buyingTips: string[];
  maintenanceNotes?: string;
}

interface ToolSpecificationCardProps {
  tool: ToolSpec;
}

const ToolSpecificationCard = ({ tool }: ToolSpecificationCardProps) => {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <h3 className="text-[18px] font-semibold text-white leading-tight">{tool.name}</h3>
          <p className="text-[14px] text-white/85 leading-relaxed">{tool.description}</p>
        </div>
        <span className="text-[10px] uppercase tracking-[0.18em] text-white/55 flex-shrink-0">
          {tool.priority}
        </span>
      </div>

      <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Specifications
        </span>
        <div className="grid grid-cols-2 gap-2 text-[13px] text-white/85">
          {Object.entries(tool.specifications).map(
            ([key, value]) =>
              value && (
                <div key={key} className="flex justify-between">
                  <span className="capitalize text-white/55">{key}</span>
                  <span>{value}</span>
                </div>
              )
          )}
          <div className="flex justify-between col-span-2 pt-2 border-t border-white/[0.06]">
            <span className="text-white/55">Price range</span>
            <span className="font-mono text-white">{tool.priceRange}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Advantages
          </span>
          <ul className="space-y-1 text-[13px] text-white/85 leading-relaxed">
            {tool.pros.map((pro, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Considerations
          </span>
          <ul className="space-y-1 text-[13px] text-white/85 leading-relaxed">
            {tool.cons.map((con, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Buying tips
        </span>
        <ul className="space-y-1 text-[13px] text-white/85 leading-relaxed">
          {tool.buyingTips.map((tip, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      {tool.maintenanceNotes && (
        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Maintenance notes
          </span>
          <p className="text-[13px] text-white/85 leading-relaxed">{tool.maintenanceNotes}</p>
        </div>
      )}
    </div>
  );
};

export default ToolSpecificationCard;
