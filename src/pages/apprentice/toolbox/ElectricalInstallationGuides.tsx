import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Zap,
  Home,
  Building,
  Factory,
  Sparkles,
  ChevronRight,
  Shield,
  type LucideIcon,
} from "lucide-react";
import { SmartBackButton } from "@/components/ui/smart-back-button";
import { quickRefCards } from "@/data/installation-guides/installationQuickRefData";
import { QuickReferencePanel } from "@/components/apprentice/installation-guides/QuickReferencePanel";

// ── Installation type link cards ──────────────────────────────────────

interface InstallationType {
  title: string;
  icon: LucideIcon;
  path: string;
  colour: string;
  borderColour: string;
  bgColour: string;
  textColour: string;
}

const installationTypes: InstallationType[] = [
  {
    title: "Domestic",
    icon: Home,
    path: "/apprentice/on-job-tools/electrical-installation-guides/domestic",
    colour: "blue",
    borderColour: "border-blue-500/30",
    bgColour: "bg-blue-500/10",
    textColour: "text-blue-400",
  },
  {
    title: "Commercial",
    icon: Building,
    path: "/apprentice/on-job-tools/electrical-installation-guides/commercial",
    colour: "green",
    borderColour: "border-green-500/30",
    bgColour: "bg-green-500/10",
    textColour: "text-green-400",
  },
  {
    title: "Industrial",
    icon: Factory,
    path: "/apprentice/on-job-tools/electrical-installation-guides/industrial",
    colour: "orange",
    borderColour: "border-orange-500/30",
    bgColour: "bg-orange-500/10",
    textColour: "text-orange-400",
  },
  {
    title: "Specialist",
    icon: Sparkles,
    path: "/apprentice/on-job-tools/electrical-installation-guides/specialist",
    colour: "amber",
    borderColour: "border-amber-500/30",
    bgColour: "bg-amber-500/10",
    textColour: "text-amber-400",
  },
];

// ── Main Component ────────────────────────────────────────────────────

const ElectricalInstallationGuides = () => {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const toggleCard = (id: string) => {
    setActiveCardId((prev) => (prev === id ? null : id));
  };

  const activeCard = quickRefCards.find((c) => c.id === activeCardId) ?? null;

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in px-4 pb-20">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-3">
        <SmartBackButton />
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-bold text-white">
            Electrical Installation Guides
          </h1>
          <Zap className="h-5 w-5 text-elec-yellow shrink-0" />
        </div>
      </div>

      {/* ── Stats Strip ────────────────────────────────────────────── */}
      <div className="flex items-center justify-center gap-2 text-white text-xs flex-wrap">
        <span className="bg-white/10 border border-white/10 rounded-full px-3 py-1">
          7 references
        </span>
        <span className="bg-white/10 border border-white/10 rounded-full px-3 py-1">
          4 installation types
        </span>
        <span className="bg-white/10 border border-white/10 rounded-full px-3 py-1">
          BS 7671:2018+A3:2024
        </span>
      </div>

      {/* ── Quick Reference Toggle Grid ────────────────────────────── */}
      <section className="space-y-3">
        <h2 className="text-white text-sm font-semibold uppercase tracking-wider">
          Quick Reference
        </h2>

        <div className="grid grid-cols-3 gap-2">
          {quickRefCards.map((card) => {
            const isActive = card.id === activeCardId;
            const Icon = card.icon;
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
                <Icon
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
      </section>

      {/* ── Active Quick Reference Panel ───────────────────────────── */}
      {activeCard && <QuickReferencePanel card={activeCard} />}

      {/* ── Installation Types ─────────────────────────────────────── */}
      <section className="space-y-3">
        <h2 className="text-white text-sm font-semibold uppercase tracking-wider">
          Installation Types
        </h2>

        <div className="space-y-2">
          {installationTypes.map((type) => {
            const Icon = type.icon;
            return (
              <Link
                key={type.title}
                to={type.path}
                className={`flex items-center gap-3 h-14 px-4 rounded-xl border ${type.borderColour} ${type.bgColour} active:opacity-80 transition-all touch-manipulation group`}
              >
                <div className="p-2 rounded-lg bg-white/10">
                  <Icon className={`h-5 w-5 ${type.textColour}`} />
                </div>
                <span className="text-white text-sm font-medium flex-1">
                  {type.title}
                </span>
                <ChevronRight className="h-4 w-4 text-white" />
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── Compliance Banner ──────────────────────────────────────── */}
      <div className="flex items-start gap-3 p-4 rounded-xl border border-elec-yellow/30 bg-elec-yellow/10">
        <Shield className="h-5 w-5 text-elec-yellow shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="text-white text-sm font-semibold">
            Compliance Reminder
          </p>
          <p className="text-white text-sm">
            All electrical work must comply with BS 7671:2018+A3:2024, Part P
            Building Regulations, and GN3 Inspection &amp; Testing guidance.
            Always check for the latest amendments.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ElectricalInstallationGuides;
