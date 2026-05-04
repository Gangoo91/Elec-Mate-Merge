import { AlertTriangle } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import type { QuickRefCard } from '@/data/installation-guides/installationQuickRefData';
import {
  cableSizingData,
  cableSizingTip,
  circuitData,
  ipRatingsData,
  bathroomZones,
  ipRatingsTip,
  earthingSystems,
  newColours,
  oldColours,
  colourSafetyPoints,
  coloursTip,
  safeIsolationSteps,
  safeIsolationRules,
  safeIsolationTip,
  accessoryHeights,
  partMKeyPoints,
  accessoryHeightsTip,
} from '@/data/installation-guides/installationQuickRefData';

interface QuickReferencePanelProps {
  card: QuickRefCard;
}

function TipBanner({ text }: { text: string }) {
  return (
    <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">Tip</span>
      <p className="text-[14px] text-white/85 leading-relaxed">{text}</p>
    </div>
  );
}

function Section({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="flex items-center justify-between w-full h-11 px-3 rounded-lg border border-white/[0.06] bg-white/[0.02] touch-manipulation">
        <span className="text-[14px] text-white font-medium">{title}</span>
        <ChevronDown
          className={`h-4 w-4 text-white/55 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-3 space-y-3">{children}</CollapsibleContent>
    </Collapsible>
  );
}

function DataCard({ items }: { items: { label: string; value: string }[] }) {
  return (
    <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1.5">
      {items.map((item, i) => (
        <div key={i} className="flex justify-between gap-2">
          <span className="text-[13px] text-white/55">{item.label}</span>
          <span className="text-[13px] text-white text-right">{item.value}</span>
        </div>
      ))}
    </div>
  );
}

function CableSizingPanel() {
  return (
    <div className="space-y-3">
      <h3 className="text-[16px] font-semibold text-white">Cable sizing quick reference</h3>
      <p className="text-[14px] text-white/85 leading-relaxed">
        T&E current ratings (Reference Method C — clipped direct) from BS 7671 Table 4D5.
      </p>
      {cableSizingData.map((row, i) => (
        <DataCard
          key={i}
          items={[
            { label: 'Cable', value: row.cable },
            { label: 'Rating (clipped)', value: row.ratingClipped },
            { label: 'Rating (enclosed)', value: row.ratingEnclosed },
            { label: 'Volt drop (mV/A/m)', value: row.voltDrop },
            { label: 'Common circuit', value: row.commonCircuit },
            { label: 'MCB', value: row.mcb },
          ]}
        />
      ))}
      <TipBanner text={cableSizingTip} />
    </div>
  );
}

function CircuitEssentialsPanel() {
  return (
    <div className="space-y-3">
      <h3 className="text-[16px] font-semibold text-white">Circuit essentials</h3>
      {circuitData.map((circuit, i) => (
        <Section key={i} title={circuit.name} defaultOpen={i === 0}>
          <DataCard
            items={[
              { label: 'Cable', value: circuit.cable },
              { label: 'Protection', value: circuit.protection },
              ...(circuit.maxArea ? [{ label: 'Max floor area', value: circuit.maxArea }] : []),
              ...(circuit.maxPoints ? [{ label: 'Max points', value: circuit.maxPoints }] : []),
            ]}
          />
          {circuit.extras && (
            <ul className="space-y-1 pl-1">
              {circuit.extras.map((e, j) => (
                <li
                  key={j}
                  className="flex items-start gap-2 text-[14px] text-white/85 leading-relaxed"
                >
                  <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                  <span>{e}</span>
                </li>
              ))}
            </ul>
          )}
          <TipBanner text={circuit.tip} />
        </Section>
      ))}
    </div>
  );
}

function IPRatingsPanel() {
  return (
    <div className="space-y-3">
      <h3 className="text-[16px] font-semibold text-white">IP rating reference</h3>
      {ipRatingsData.map((row, i) => (
        <DataCard
          key={i}
          items={[
            { label: 'IP code', value: row.code },
            { label: 'Solids', value: row.solids },
            { label: 'Liquids', value: row.liquids },
            { label: 'Example', value: row.example },
          ]}
        />
      ))}

      <Section title="Bathroom zones" defaultOpen>
        {bathroomZones.map((zone, i) => (
          <DataCard
            key={i}
            items={[
              { label: 'Zone', value: zone.zone },
              { label: 'IP minimum', value: zone.ipMin },
              { label: 'Notes', value: zone.notes },
            ]}
          />
        ))}
      </Section>

      <TipBanner text={ipRatingsTip} />
    </div>
  );
}

function EarthingSystemsPanel() {
  return (
    <div className="space-y-3">
      <h3 className="text-[16px] font-semibold text-white">UK earthing systems</h3>
      {earthingSystems.map((sys, i) => (
        <Section key={i} title={sys.shortName} defaultOpen={i === 0}>
          <div className="space-y-2">
            <p className="text-[13px] text-white/85 font-medium">{sys.prevalence}</p>
            <p className="text-[14px] text-white/85 leading-relaxed">{sys.description}</p>
            <DataCard items={[{ label: 'Typical Ze', value: sys.ze }]} />
            <TipBanner text={sys.tip} />
          </div>
        </Section>
      ))}
    </div>
  );
}

function ColourTable({
  title,
  rows,
}: {
  title: string;
  rows: { function: string; fixedWiring: string; flexibleCable: string }[];
}) {
  return (
    <Section title={title} defaultOpen>
      {rows.map((row, i) => (
        <DataCard
          key={i}
          items={[
            { label: 'Function', value: row.function },
            { label: 'Fixed wiring', value: row.fixedWiring },
            { label: 'Flexible cable', value: row.flexibleCable },
          ]}
        />
      ))}
    </Section>
  );
}

function CableColoursPanel() {
  return (
    <div className="space-y-3">
      <h3 className="text-[16px] font-semibold text-white">Cable colour identification</h3>
      <ColourTable title="Current harmonised colours (post-2004)" rows={newColours} />
      <ColourTable title="Old colours (pre-2004)" rows={oldColours} />

      <div className="rounded-xl border border-red-500/30 bg-red-500/[0.04] p-3 space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-300">
          Key safety points
        </span>
        <ul className="space-y-1.5">
          {colourSafetyPoints.map((point, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-[14px] text-white/85 leading-relaxed"
            >
              <AlertTriangle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      <TipBanner text={coloursTip} />
    </div>
  );
}

function SafeIsolationPanel() {
  return (
    <div className="space-y-3">
      <h3 className="text-[16px] font-semibold text-white">Safe isolation procedure (GS38)</h3>
      <p className="text-[14px] text-white/85 leading-relaxed">
        The 8 steps — in order, every time:
      </p>

      <div className="space-y-2">
        {safeIsolationSteps.map((s) => (
          <div
            key={s.step}
            className="flex items-start gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] p-3"
          >
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white/[0.05] text-white/85 text-[13px] font-semibold shrink-0">
              {s.step}
            </span>
            <div className="space-y-0.5">
              <p className="text-[14px] text-white font-semibold">{s.title}</p>
              <p className="text-[14px] text-white/85 leading-relaxed">{s.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-red-500/30 bg-red-500/[0.04] p-3 space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-300">
          Critical rules
        </span>
        <ul className="space-y-1.5">
          {safeIsolationRules.map((rule, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-[14px] text-white/85 leading-relaxed"
            >
              <AlertTriangle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
              <span>{rule}</span>
            </li>
          ))}
        </ul>
      </div>

      <TipBanner text={safeIsolationTip} />
    </div>
  );
}

function AccessoryHeightsPanel() {
  return (
    <div className="space-y-3">
      <h3 className="text-[16px] font-semibold text-white">
        Accessory heights (BS 7671 / Building Regulations)
      </h3>

      {accessoryHeights.map((row, i) => (
        <DataCard
          key={i}
          items={[
            { label: 'Accessory', value: row.accessory },
            { label: 'Standard height', value: row.standardHeight },
            { label: 'Accessible (Part M)', value: row.accessibleHeight },
            { label: 'Notes', value: row.notes },
          ]}
        />
      ))}

      <Section title="Part M key points">
        <ul className="space-y-1.5">
          {partMKeyPoints.map((point, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-[14px] text-white/85 leading-relaxed"
            >
              <span className="w-1 h-1 rounded-full bg-white/55 mt-2 shrink-0" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </Section>

      <TipBanner text={accessoryHeightsTip} />
    </div>
  );
}

export function QuickReferencePanel({ card }: QuickReferencePanelProps) {
  const panels: Record<string, React.ReactNode> = {
    'cable-sizing': <CableSizingPanel />,
    'circuit-essentials': <CircuitEssentialsPanel />,
    'ip-ratings': <IPRatingsPanel />,
    'earthing-systems': <EarthingSystemsPanel />,
    'cable-colours': <CableColoursPanel />,
    'safe-isolation': <SafeIsolationPanel />,
    'accessory-heights': <AccessoryHeightsPanel />,
  };

  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-4 animate-fade-in">
      {panels[card.id] ?? null}
    </div>
  );
}
