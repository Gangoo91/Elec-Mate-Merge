import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import FixingsReferenceTable from './FixingsReferenceTable';
import {
  rawlPlugs,
  rawlPlugTip,
  boltNutSizes,
  boltNutTip,
  boltTypes,
  boltTypesTip,
  cableGlands,
  cableGlandTip,
  conduitSizes,
  conduitTip,
  trunkingSizes,
  trunkingTip,
  surfaceFixings,
  surfaceFixingsTip,
  screwHeadTypes,
  screwHeadTip,
  screwCategories,
  screwCategoriesTip,
  vanStockEssentials,
} from '@/data/professional-tools/fixingsData';

interface SectionConfig {
  id: string;
  title: string;
  count: string;
}

const sections: SectionConfig[] = [
  { id: 'rawl-plugs', title: 'Rawl Plugs / Wall Plugs', count: '5 colours' },
  { id: 'bolt-sizes', title: 'Bolt & Nut Sizes (Metric)', count: '8 sizes' },
  { id: 'bolt-types', title: 'Bolt Types', count: '7 types' },
  { id: 'cable-glands', title: 'Cable Glands', count: '7 sizes' },
  { id: 'conduit', title: 'Conduit Sizes', count: '3 sizes' },
  { id: 'trunking', title: 'Trunking Sizes', count: '9 sizes' },
  { id: 'surface-fixings', title: 'Fixings by Surface Type', count: '5 surfaces' },
  { id: 'screw-heads', title: 'Screw Head Types', count: '6 types' },
  { id: 'screw-categories', title: 'Screw Categories', count: '7 types' },
  { id: 'van-stock', title: 'Van Stock Essentials', count: '10 items' },
];

const TipBox = ({ tip }: { tip: string }) => (
  <div className="rounded-xl border border-elec-yellow/20 bg-elec-yellow/[0.04] p-4 sm:p-5 space-y-2">
    <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
      Tip
    </span>
    <p className="text-[14px] text-white/85 leading-relaxed">{tip}</p>
  </div>
);

const FixingsHardwarePanel = () => {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());

  const toggleSection = (id: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const rawlPlugColumns = [
    { header: 'Colour', accessor: 'colour', colourSwatch: true },
    { header: 'Drill Bit', accessor: 'drillBit' },
    { header: 'Screw Size', accessor: 'screwSize' },
    { header: 'Load (Brick)', accessor: 'loadBrick' },
    { header: 'Load (Block)', accessor: 'loadBlock' },
    { header: 'Wall Types', accessor: 'wallTypes' },
  ];

  const rawlPlugData = rawlPlugs.map((p) => ({
    colour: p.colour,
    colourHex: p.colourHex,
    drillBit: p.drillBit,
    screwSize: p.screwSize,
    loadBrick: p.loadBrick,
    loadBlock: p.loadBlock,
    wallTypes: p.wallTypes,
  }));

  const boltColumns = [
    { header: 'Metric', accessor: 'metric' },
    { header: 'Spanner', accessor: 'spannerSize' },
    { header: 'Pitch', accessor: 'pitch' },
    { header: 'Common Electrical Uses', accessor: 'commonUses' },
  ];

  const glandColumns = [
    { header: 'Size', accessor: 'size' },
    { header: 'Cable OD', accessor: 'cableODRange' },
    { header: 'Common Cables', accessor: 'commonCables' },
    { header: 'Material', accessor: 'material' },
    { header: 'IP', accessor: 'ipRating' },
  ];

  const conduitColumns = [
    { header: 'Size', accessor: 'size' },
    { header: 'Cable Capacity', accessor: 'cableCapacity' },
    { header: 'Accessories', accessor: 'commonAccessories' },
    { header: 'Standard', accessor: 'standard' },
  ];

  const trunkingColumns = [
    { header: 'Size', accessor: 'size' },
    { header: 'Cable Capacity', accessor: 'cableCapacity' },
    { header: 'Common Uses', accessor: 'commonUses' },
    { header: 'Accessories', accessor: 'accessories' },
  ];

  const renderSectionContent = (id: string) => {
    switch (id) {
      case 'rawl-plugs':
        return (
          <div className="space-y-3">
            <FixingsReferenceTable
              columns={rawlPlugColumns}
              data={rawlPlugData}
              colourKey="colourHex"
            />
            <TipBox tip={rawlPlugTip} />
          </div>
        );

      case 'bolt-sizes':
        return (
          <div className="space-y-3">
            <FixingsReferenceTable
              columns={boltColumns}
              data={boltNutSizes as unknown as Record<string, string>[]}
            />
            <TipBox tip={boltNutTip} />
          </div>
        );

      case 'bolt-types':
        return (
          <div className="space-y-3">
            {boltTypes.map((bolt) => (
              <div
                key={bolt.name}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-[14px] font-semibold text-white">{bolt.name}</h4>
                  <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] whitespace-nowrap">
                    {bolt.headType}
                  </span>
                </div>
                <p className="text-[14px] text-white/85 leading-relaxed">{bolt.description}</p>
                <div className="text-[13px] text-white/85 space-y-1">
                  <div>
                    <span className="font-medium">When to use:</span> {bolt.whenToUse}
                  </div>
                  <div>
                    <span className="font-medium">Common sizes:</span> {bolt.commonSizes}
                  </div>
                </div>
              </div>
            ))}
            <TipBox tip={boltTypesTip} />
          </div>
        );

      case 'cable-glands':
        return (
          <div className="space-y-3">
            <FixingsReferenceTable
              columns={glandColumns}
              data={cableGlands as unknown as Record<string, string>[]}
            />
            <TipBox tip={cableGlandTip} />
          </div>
        );

      case 'conduit':
        return (
          <div className="space-y-3">
            <FixingsReferenceTable
              columns={conduitColumns}
              data={conduitSizes as unknown as Record<string, string>[]}
            />
            <TipBox tip={conduitTip} />
          </div>
        );

      case 'trunking':
        return (
          <div className="space-y-3">
            <FixingsReferenceTable
              columns={trunkingColumns}
              data={trunkingSizes as unknown as Record<string, string>[]}
            />
            <TipBox tip={trunkingTip} />
          </div>
        );

      case 'surface-fixings':
        return (
          <div className="space-y-3">
            {surfaceFixings.map((surface) => (
              <div
                key={surface.surface}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2"
              >
                <h4 className="text-[14px] font-semibold text-white">{surface.surface}</h4>
                <div className="space-y-2">
                  {surface.methods.map((method) => (
                    <div key={method.name} className="pl-3 border-l-2 border-white/10 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[13px] font-semibold text-white">{method.name}</span>
                        <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] whitespace-nowrap">
                          {method.maxLoad}
                        </span>
                      </div>
                      <p className="text-[14px] text-white/85 leading-relaxed">{method.description}</p>
                      <p className="text-[13px] text-elec-yellow">{method.tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <TipBox tip={surfaceFixingsTip} />
          </div>
        );

      case 'screw-heads':
        return (
          <div className="space-y-3">
            {screwHeadTypes.map((head) => (
              <div
                key={head.name}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2"
              >
                <h4 className="text-[14px] font-semibold text-white">{head.name}</h4>
                <p className="text-[14px] text-white/85 leading-relaxed">{head.identificationTip}</p>
                <div className="text-[13px] text-white/85 space-y-1">
                  <div>
                    <span className="font-medium">Driver sizes:</span> {head.driverSizes}
                  </div>
                  <div>
                    <span className="font-medium">Common uses:</span> {head.commonUses}
                  </div>
                </div>
              </div>
            ))}
            <TipBox tip={screwHeadTip} />
          </div>
        );

      case 'screw-categories':
        return (
          <div className="space-y-3">
            {screwCategories.map((cat) => (
              <div
                key={cat.name}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2"
              >
                <h4 className="text-[14px] font-semibold text-white">{cat.name}</h4>
                <p className="text-[14px] text-white/85 leading-relaxed">{cat.description}</p>
                <div className="text-[13px] text-white/85 space-y-1">
                  <div>
                    <span className="font-medium">When to use:</span> {cat.whenToUse}
                  </div>
                  <div>
                    <span className="font-medium">Common sizes:</span> {cat.commonSizes}
                  </div>
                </div>
              </div>
            ))}
            <TipBox tip={screwCategoriesTip} />
          </div>
        );

      case 'van-stock':
        return (
          <div className="space-y-3">
            <p className="text-[14px] text-white/85 leading-relaxed">
              Keep these items stocked in your van at all times. Running out on site means a trip to
              the wholesaler and wasted time.
            </p>
            {vanStockEssentials.map((item) => (
              <div
                key={item.item}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 flex items-start gap-3"
              >
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[14px] font-semibold text-white">{item.item}</span>
                    <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] whitespace-nowrap">
                      {item.approxCost}
                    </span>
                  </div>
                  <div className="text-[13px] text-white/85">
                    <span className="font-medium">Qty:</span> {item.quantity}
                  </div>
                  <p className="text-[13px] text-white/85">{item.notes}</p>
                </div>
              </div>
            ))}
            <TipBox tip="Do a van stock check every Friday. Reorder anything running low over the weekend so it arrives Monday. A well-stocked van means fewer trips to the wholesaler and more billable hours." />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-3 animate-fade-in">
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Fixings & hardware quick reference
        </span>
        <p className="text-[14px] text-white/85 leading-relaxed">
          Everything you need to know about rawl plugs, bolts, glands, conduit, trunking, and
          screws. The practical knowledge that separates a good sparky from a great one.
        </p>
      </div>

      {sections.map((section) => {
        const isOpen = openSections.has(section.id);
        return (
          <Collapsible
            key={section.id}
            open={isOpen}
            onOpenChange={() => toggleSection(section.id)}
          >
            <CollapsibleTrigger asChild>
              <button className="w-full flex items-center justify-between p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] transition-all touch-manipulation active:scale-[0.99] hover:bg-white/[0.04] min-h-[44px]">
                <div className="flex items-center gap-2">
                  <span className="text-[14px] font-semibold text-white">{section.title}</span>
                  <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
                    {section.count}
                  </span>
                </div>
                {isOpen ? (
                  <ChevronDown className="h-4 w-4 text-white/55" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-white/55" />
                )}
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="pt-3">{renderSectionContent(section.id)}</div>
            </CollapsibleContent>
          </Collapsible>
        );
      })}
    </div>
  );
};

export default FixingsHardwarePanel;
