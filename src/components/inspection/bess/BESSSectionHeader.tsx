/**
 * Shared BESS section header — a clean accent bar + title (no icons). Used across
 * all BESS tabs so headers are consistent inside the desktop cards / flat mobile.
 */
export const SectionHeader = ({ title, badge }: { title: string; badge?: string }) => (
  <div className="flex items-center gap-2.5 mb-3 pb-2 border-b border-white/[0.06]">
    <span className="h-4 w-[3px] rounded-full bg-gradient-to-b from-elec-yellow to-amber-600 flex-shrink-0" />
    <h2 className="text-sm font-semibold text-white tracking-tight">{title}</h2>
    {badge && (
      <span className="text-[9px] font-bold uppercase tracking-wider text-elec-yellow bg-elec-yellow/10 border border-elec-yellow/20 px-1.5 py-0.5 rounded">
        {badge}
      </span>
    )}
  </div>
);

export default SectionHeader;
