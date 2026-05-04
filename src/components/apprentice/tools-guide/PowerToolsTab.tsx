import ToolCard from './ToolCard';

const PowerToolsTab = () => {
  const drillTools = [
    {
      name: '18V cordless drill/driver',
      description: 'Essential for most electrical installation work',
      priceRange: '£80-200',
      priority: 'essential' as const,
      ukStandard: 'Two-speed gearbox',
    },
    {
      name: 'Lithium-ion batteries (2x minimum)',
      description: 'One charging whilst one in use',
      priceRange: '£30-60 each',
      priority: 'essential' as const,
      ukStandard: '3.0Ah+ capacity',
    },
    {
      name: 'Fast charger (1-hour type)',
      description: 'Minimise downtime with quick charging',
      priceRange: '£40-80',
      priority: 'recommended' as const,
    },
    {
      name: 'HSS drill bit set (1-13mm)',
      description: 'High-speed steel for metalwork',
      priceRange: '£15-30',
      priority: 'essential' as const,
      ukStandard: 'Cobalt tipped preferred',
    },
    {
      name: 'Screwdriver bit set with holder',
      description: 'PZ1, PZ2, PH1, PH2, flat bits with magnetic holder',
      priceRange: '£10-25',
      priority: 'essential' as const,
    },
  ];

  const inspectionTools = [
    {
      name: 'LED inspection torch (rechargeable)',
      description: 'Essential for fault-finding and dark areas',
      priceRange: '£15-40',
      priority: 'essential' as const,
      ukStandard: '1000+ lumens',
    },
    {
      name: 'Telescopic inspection mirror',
      description: 'See behind panels and in tight spaces',
      priceRange: '£8-20',
      priority: 'recommended' as const,
    },
    {
      name: 'Magnetic pick-up tool (telescopic)',
      description: 'Retrieve dropped screws and small parts',
      priceRange: '£5-15',
      priority: 'recommended' as const,
      ukStandard: '4.5kg lift capacity',
    },
    {
      name: 'Cable fishing rods (fiberglass)',
      description: 'Pull cables through conduit and voids',
      priceRange: '£20-50',
      priority: 'optional' as const,
      ukStandard: '10m+ length',
    },
    {
      name: 'Digital borescope/inspection camera',
      description: 'Advanced inspections in inaccessible areas',
      priceRange: '£50-200',
      priority: 'optional' as const,
      ukStandard: '5mm+ cable diameter',
    },
  ];

  const specialistTools = [
    {
      name: 'Angle grinder (115mm)',
      description: 'Cutting trunking, conduit, and metalwork',
      priceRange: '£40-100',
      priority: 'optional' as const,
      ukStandard: 'Safety guard essential',
    },
    {
      name: 'SDS drill (corded)',
      description: 'Heavy-duty drilling in masonry',
      priceRange: '£60-150',
      priority: 'optional' as const,
      ukStandard: '3-function minimum',
    },
    {
      name: 'Reciprocating saw',
      description: 'Cutting in tight spaces and demolition work',
      priceRange: '£50-120',
      priority: 'optional' as const,
    },
    {
      name: 'Cable puller/winch',
      description: 'Heavy cable installation in long runs',
      priceRange: '£100-300',
      priority: 'optional' as const,
      ukStandard: '1000kg+ capacity',
    },
  ];

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6">
      <div className="space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Power tools
        </span>
        <h2 className="text-[22px] sm:text-[26px] font-semibold text-white leading-tight">
          Power tools
        </h2>
        <p className="text-[14px] text-white/85 leading-relaxed max-w-2xl">
          Whilst your employer often provides larger power tools, having some basics of your own
          gives you flexibility and ensures you're never without essential equipment.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        <ToolCard
          title="Cordless drill system"
          icon={null}
          description="An essential power tool for electrical installations. Modern 18V systems offer excellent power-to-weight ratios."
          items={drillTools}
          apprenticeTip="Stick to one battery platform - batteries are expensive! Many brands offer starter kits with drill, battery, and charger. Check if your employer uses a specific brand."
          ukConsideration="18V is the UK standard for professional tools. Lower voltages lack power for demanding work. Higher voltages are unnecessarily heavy for electrical work."
        />

        <ToolCard
          title="Inspection & access"
          icon={null}
          description="For accessing and examining difficult-to-reach areas safely. Essential for fault-finding and inspection work."
          items={inspectionTools}
          apprenticeTip="A good torch is used multiple times daily. Rechargeable LED torches save money on batteries and provide consistent brightness. Keep it charged!"
          ukConsideration="UK building regulations require access for inspection. These tools help you work safely without damaging property or structures."
        />

        <ToolCard
          title="Specialist power tools"
          icon={null}
          description="Heavier tools usually provided by employers but useful to understand for future investment."
          items={specialistTools}
          apprenticeTip="Don't buy these until you're established - they're expensive and employers usually provide them. Learn to use them safely first."
          ukConsideration="These tools require additional safety training. Never use without proper instruction and appropriate PPE. Some require 110V supply on construction sites."
        />
      </div>

      <div className="rounded-xl border border-red-500/30 bg-red-500/[0.04] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-300">
          Power tool safety & maintenance
        </span>
        <div className="space-y-2 text-[14px] text-white/85 leading-relaxed">
          <p>
            <strong>PAT testing:</strong> All portable electrical tools must be PAT tested annually
            (or as per company policy). Keep records and labels up to date.
          </p>
          <p>
            <strong>Daily checks:</strong> Inspect tools before use - check casings, cables, and
            switches. Damaged tools must be immediately taken out of service.
          </p>
          <p>
            <strong>110V on sites:</strong> Many construction sites require 110V tools for safety.
            Check site requirements and use appropriate transformers if needed.
          </p>
          <p>
            <strong>Battery care:</strong> Store batteries at room temperature, charge regularly, and
            replace when capacity drops significantly. Quality batteries last 3-5 years with proper
            care.
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Investment timeline for apprentices
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[14px] text-white/85 leading-relaxed">
          <div className="space-y-2">
            <p className="font-medium text-white">Year 1-2: basics (£150-250)</p>
            <ul className="space-y-1">
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                <span>Cordless drill with 2 batteries</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                <span>LED torch</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                <span>Basic drill bits and screwdriver bits</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                <span>Simple inspection tools</span>
              </li>
            </ul>
          </div>
          <div className="space-y-2">
            <p className="font-medium text-white">Year 3-4: expansion (£200-400)</p>
            <ul className="space-y-1">
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                <span>Additional batteries and faster charger</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                <span>More comprehensive bit sets</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                <span>Advanced inspection equipment</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                <span>Specialist tools as needed</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PowerToolsTab;
