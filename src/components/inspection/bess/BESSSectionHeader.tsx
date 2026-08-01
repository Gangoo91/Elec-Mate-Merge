/**
 * Shared BESS section header — plain typographic heading (no icons, no accent
 * rules; typography carries hierarchy). Optional badge renders as quiet inline text.
 */
export const SectionHeader = ({ title, badge }: { title: string; badge?: string }) => (
  <h2 className="mb-3 text-[15px] font-semibold tracking-tight text-white">
    {title}
    {badge && <span className="ml-2 text-[12px] font-medium text-white/80">{badge}</span>}
  </h2>
);

export default SectionHeader;
