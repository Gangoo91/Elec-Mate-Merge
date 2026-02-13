import { type LucideIcon, Sparkles } from "lucide-react";

interface SafetyEmptyStateProps {
  icon: LucideIcon;
  heading: string;
  description: string;
  ctaLabel?: string;
  onCta?: () => void;
  tip?: string;
}

export function SafetyEmptyState({
  icon: Icon,
  heading,
  description,
  ctaLabel,
  onCta,
  tip,
}: SafetyEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="w-24 h-24 rounded-3xl bg-elec-yellow/10 border border-elec-yellow/20 flex items-center justify-center mb-6">
        <Icon className="w-12 h-12 text-elec-yellow" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{heading}</h3>
      <p className="text-white text-center max-w-xs mb-6 text-sm leading-relaxed">
        {description}
      </p>
      {ctaLabel && onCta && (
        <button
          onClick={onCta}
          className="h-11 px-6 rounded-xl bg-elec-yellow text-black font-semibold text-sm touch-manipulation active:scale-[0.97] active:opacity-90 transition-all"
        >
          {ctaLabel}
        </button>
      )}
      {tip && (
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] mt-4">
          <Sparkles className="w-4 h-4 text-elec-yellow" />
          <span className="text-sm text-white">{tip}</span>
        </div>
      )}
    </div>
  );
}
