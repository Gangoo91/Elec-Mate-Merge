import { useState, type ReactNode } from "react";
import { SmartBackButton } from "@/components/ui/smart-back-button";
import { AlertTriangle, type LucideIcon } from "lucide-react";
import type { ToggleCardDef, SafetyNotice } from "@/types/installation-guides";

interface InstallationGuidePageShellProps {
  title: string;
  icon: LucideIcon;
  cards: ToggleCardDef[];
  renderPanel: (cardId: string) => ReactNode;
  safetyNotice?: SafetyNotice;
}

const InstallationGuidePageShell = ({
  title,
  icon: Icon,
  cards,
  renderPanel,
  safetyNotice,
}: InstallationGuidePageShellProps) => {
  const [activeCardId, setActiveCardId] = useState<string | null>(
    cards[0]?.id ?? null,
  );

  const toggleCard = (id: string) => {
    setActiveCardId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in px-4 pb-20">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-3">
        <SmartBackButton />
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-bold text-white">{title}</h1>
          <Icon className="h-5 w-5 text-elec-yellow shrink-0" />
        </div>
      </div>

      {/* ── Toggle Card Grid ───────────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-2">
        {cards.map((card) => {
          const isActive = card.id === activeCardId;
          const CardIcon = card.icon;
          return (
            <button
              key={card.id}
              onClick={() => toggleCard(card.id)}
              className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border p-3 min-h-[72px] transition-all touch-manipulation ${
                isActive
                  ? `${card.bgColour} ${card.borderColour} ring-2 ${card.ringColour}`
                  : "bg-white/5 border-white/10 active:bg-white/10"
              }`}
            >
              <CardIcon
                className={`h-5 w-5 ${isActive ? card.textColour : "text-white"}`}
              />
              <span
                className={`text-[11px] leading-tight text-center font-medium ${isActive ? card.textColour : "text-white"}`}
              >
                {card.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Active Panel ───────────────────────────────────────────── */}
      {activeCardId && renderPanel(activeCardId)}

      {/* ── Safety Notice Banner ───────────────────────────────────── */}
      {safetyNotice && (
        <div className="flex items-start gap-3 p-4 rounded-xl border border-red-500/30 bg-red-500/10">
          <AlertTriangle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
          <div className="space-y-3">
            <p className="text-white text-sm font-semibold">
              {safetyNotice.title}
            </p>
            {safetyNotice.points.map((point, idx) => (
              <div key={idx} className="space-y-0.5">
                <p className="text-white text-sm font-medium">{point.title}</p>
                <p className="text-white text-sm">{point.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default InstallationGuidePageShell;
