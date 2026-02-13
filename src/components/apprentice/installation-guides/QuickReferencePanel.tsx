import { AlertTriangle, Info } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { QuickRefCard } from "@/data/installation-guides/installationQuickRefData";
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
} from "@/data/installation-guides/installationQuickRefData";

interface QuickReferencePanelProps {
  card: QuickRefCard;
}

// ── Tip Banner ────────────────────────────────────────────────────────

function TipBanner({ text, colour }: { text: string; colour: string }) {
  return (
    <div className={`flex items-start gap-3 p-3 rounded-lg border border-${colour}-500/30 bg-${colour}-500/10`}>
      <Info className={`h-5 w-5 text-${colour}-400 shrink-0 mt-0.5`} />
      <p className="text-white text-sm leading-relaxed">{text}</p>
    </div>
  );
}

// ── Collapsible Section ───────────────────────────────────────────────

function Section({
  title,
  colour,
  defaultOpen = false,
  children,
}: {
  title: string;
  colour: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="flex items-center justify-between w-full h-11 px-3 rounded-lg bg-white/5 border border-white/10 touch-manipulation">
        <span className="text-white text-sm font-medium">{title}</span>
        <ChevronDown
          className={`h-4 w-4 text-${colour}-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-3 space-y-3">{children}</CollapsibleContent>
    </Collapsible>
  );
}

// ── Data Table (responsive card layout) ───────────────────────────────

function DataCard({ items }: { items: { label: string; value: string }[] }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-3 space-y-1.5">
      {items.map((item, i) => (
        <div key={i} className="flex justify-between gap-2">
          <span className="text-white text-sm">{item.label}</span>
          <span className="text-white text-sm font-medium text-right">{item.value}</span>
        </div>
      ))}
    </div>
  );
}

// ── Panel: Cable Sizing ───────────────────────────────────────────────

function CableSizingPanel() {
  return (
    <div className="space-y-3">
      <h3 className="text-white font-semibold">Cable Sizing Quick Reference</h3>
      <p className="text-white text-sm">T&E current ratings (Reference Method C — clipped direct) from BS 7671 Table 4D5.</p>
      {cableSizingData.map((row, i) => (
        <DataCard
          key={i}
          items={[
            { label: "Cable", value: row.cable },
            { label: "Rating (Clipped)", value: row.ratingClipped },
            { label: "Rating (Enclosed)", value: row.ratingEnclosed },
            { label: "Volt Drop (mV/A/m)", value: row.voltDrop },
            { label: "Common Circuit", value: row.commonCircuit },
            { label: "MCB", value: row.mcb },
          ]}
        />
      ))}
      <TipBanner text={cableSizingTip} colour="cyan" />
    </div>
  );
}

// ── Panel: Circuit Essentials ─────────────────────────────────────────

function CircuitEssentialsPanel() {
  return (
    <div className="space-y-3">
      <h3 className="text-white font-semibold">Circuit Essentials</h3>
      {circuitData.map((circuit, i) => (
        <Section key={i} title={circuit.name} colour="blue" defaultOpen={i === 0}>
          <DataCard
            items={[
              { label: "Cable", value: circuit.cable },
              { label: "Protection", value: circuit.protection },
              ...(circuit.maxArea ? [{ label: "Max Floor Area", value: circuit.maxArea }] : []),
              ...(circuit.maxPoints ? [{ label: "Max Points", value: circuit.maxPoints }] : []),
            ]}
          />
          {circuit.extras && (
            <ul className="space-y-1 pl-1">
              {circuit.extras.map((e, j) => (
                <li key={j} className="flex items-center gap-2 text-white text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                  {e}
                </li>
              ))}
            </ul>
          )}
          <TipBanner text={circuit.tip} colour="blue" />
        </Section>
      ))}
    </div>
  );
}

// ── Panel: IP Ratings ─────────────────────────────────────────────────

function IPRatingsPanel() {
  return (
    <div className="space-y-3">
      <h3 className="text-white font-semibold">IP Rating Reference</h3>
      {ipRatingsData.map((row, i) => (
        <DataCard
          key={i}
          items={[
            { label: "IP Code", value: row.code },
            { label: "Solids", value: row.solids },
            { label: "Liquids", value: row.liquids },
            { label: "Example", value: row.example },
          ]}
        />
      ))}

      <Section title="Bathroom Zones" colour="green" defaultOpen>
        {bathroomZones.map((zone, i) => (
          <DataCard
            key={i}
            items={[
              { label: "Zone", value: zone.zone },
              { label: "IP Minimum", value: zone.ipMin },
              { label: "Notes", value: zone.notes },
            ]}
          />
        ))}
      </Section>

      <TipBanner text={ipRatingsTip} colour="green" />
    </div>
  );
}

// ── Panel: Earthing Systems ───────────────────────────────────────────

function EarthingSystemsPanel() {
  return (
    <div className="space-y-3">
      <h3 className="text-white font-semibold">UK Earthing Systems</h3>
      {earthingSystems.map((sys, i) => (
        <Section key={i} title={sys.shortName} colour="amber" defaultOpen={i === 0}>
          <div className="space-y-2">
            <p className="text-white text-sm font-medium">{sys.prevalence}</p>
            <p className="text-white text-sm">{sys.description}</p>
            <DataCard items={[{ label: "Typical Ze", value: sys.ze }]} />
            <TipBanner text={sys.tip} colour="amber" />
          </div>
        </Section>
      ))}
    </div>
  );
}

// ── Panel: Cable Colours ──────────────────────────────────────────────

function ColourTable({
  title,
  rows,
  colour,
}: {
  title: string;
  rows: { function: string; fixedWiring: string; flexibleCable: string }[];
  colour: string;
}) {
  return (
    <Section title={title} colour={colour} defaultOpen>
      {rows.map((row, i) => (
        <DataCard
          key={i}
          items={[
            { label: "Function", value: row.function },
            { label: "Fixed Wiring", value: row.fixedWiring },
            { label: "Flexible Cable", value: row.flexibleCable },
          ]}
        />
      ))}
    </Section>
  );
}

function CableColoursPanel() {
  return (
    <div className="space-y-3">
      <h3 className="text-white font-semibold">Cable Colour Identification</h3>
      <ColourTable title="Current Harmonised Colours (post-2004)" rows={newColours} colour="purple" />
      <ColourTable title="Old Colours (pre-2004)" rows={oldColours} colour="purple" />

      <Section title="Key Safety Points" colour="red">
        <ul className="space-y-2">
          {colourSafetyPoints.map((point, i) => (
            <li key={i} className="flex items-start gap-2 text-white text-sm">
              <AlertTriangle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
              {point}
            </li>
          ))}
        </ul>
      </Section>

      <TipBanner text={coloursTip} colour="purple" />
    </div>
  );
}

// ── Panel: Safe Isolation ─────────────────────────────────────────────

function SafeIsolationPanel() {
  return (
    <div className="space-y-3">
      <h3 className="text-white font-semibold">Safe Isolation Procedure (GS38)</h3>
      <p className="text-white text-sm">The 8 Steps — In Order, Every Time:</p>

      <div className="space-y-2">
        {safeIsolationSteps.map((s) => (
          <div key={s.step} className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-lg p-3">
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-red-500/20 text-red-400 text-sm font-bold shrink-0">
              {s.step}
            </span>
            <div>
              <p className="text-white text-sm font-semibold">{s.title}</p>
              <p className="text-white text-sm">{s.description}</p>
            </div>
          </div>
        ))}
      </div>

      <Section title="Critical Rules" colour="red">
        <ul className="space-y-2">
          {safeIsolationRules.map((rule, i) => (
            <li key={i} className="flex items-start gap-2 text-white text-sm">
              <AlertTriangle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
              {rule}
            </li>
          ))}
        </ul>
      </Section>

      <TipBanner text={safeIsolationTip} colour="red" />
    </div>
  );
}

// ── Panel: Accessory Heights ──────────────────────────────────────────

function AccessoryHeightsPanel() {
  return (
    <div className="space-y-3">
      <h3 className="text-white font-semibold">Accessory Heights (BS 7671 / Building Regulations)</h3>

      {accessoryHeights.map((row, i) => (
        <DataCard
          key={i}
          items={[
            { label: "Accessory", value: row.accessory },
            { label: "Standard Height", value: row.standardHeight },
            { label: "Accessible (Part M)", value: row.accessibleHeight },
            { label: "Notes", value: row.notes },
          ]}
        />
      ))}

      <Section title="Part M Key Points" colour="teal">
        <ul className="space-y-2">
          {partMKeyPoints.map((point, i) => (
            <li key={i} className="flex items-start gap-2 text-white text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0 mt-1.5" />
              {point}
            </li>
          ))}
        </ul>
      </Section>

      <TipBanner text={accessoryHeightsTip} colour="teal" />
    </div>
  );
}

// ── Main Panel Router ─────────────────────────────────────────────────

export function QuickReferencePanel({ card }: QuickReferencePanelProps) {
  const panels: Record<string, React.ReactNode> = {
    "cable-sizing": <CableSizingPanel />,
    "circuit-essentials": <CircuitEssentialsPanel />,
    "ip-ratings": <IPRatingsPanel />,
    "earthing-systems": <EarthingSystemsPanel />,
    "cable-colours": <CableColoursPanel />,
    "safe-isolation": <SafeIsolationPanel />,
    "accessory-heights": <AccessoryHeightsPanel />,
  };

  return (
    <div className={`border ${card.borderColour} bg-white/5 rounded-xl p-4 space-y-4 animate-fade-in`}>
      {panels[card.id] ?? null}
    </div>
  );
}
