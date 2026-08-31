/**
 * The section header used across the off-the-job pages.
 *
 * Keeps the prop shape of the portfolio `SectionHeader` it replaces so call
 * sites did not have to change, but renders in the hub's language — a 15px
 * volt heading, matching `HubSectionHeading`. The top of OJTHub is built from
 * the hub primitives, and having the sections below it keep the portfolio
 * dialect (a small eyebrow over a 20px white title) was the visible seam
 * between the two halves of the page.
 *
 * The eyebrow is dropped rather than restyled: over a heading that already
 * names the section it was the same words twice — "GOALS / Your OTJ goals",
 * "ASSESSMENTS / Assessment deadlines".
 *
 * `meta` renders in full white. It was `text-white/55`, and grey body text is
 * not allowed (CLAUDE.md → Key UI rules).
 */
import type { ReactNode } from 'react';

export const OjtSectionHeader = ({
  title,
  meta,
  action,
}: {
  /** Accepted and ignored — see above. Kept so call sites stay untouched. */
  eyebrow?: string;
  title: string;
  meta?: string;
  action?: ReactNode;
}) => (
  <div className="flex items-end justify-between gap-3 pb-1">
    <div className="min-w-0 space-y-1">
      <h2 className="text-[15px] font-semibold tracking-tight text-elec-yellow">{title}</h2>
      {meta && <p className="text-[12.5px] leading-snug text-white">{meta}</p>}
    </div>
    {action && <div className="shrink-0">{action}</div>}
  </div>
);

/**
 * The empty state for a section that has nothing in it yet.
 *
 * Made of the same material as every other card (`CARD_SURFACE` + a volt
 * hairline) rather than the flat `bg-[hsl(0_0%_10%)]` slab these used to be.
 * On a near-black page a fill plus a grey outline has no light in it at all,
 * which is why a screen of them read as one continuous dark panel.
 */
export const OjtEmptyState = ({ icon, children }: { icon?: ReactNode; children: ReactNode }) => (
  <div className="flex flex-col items-center gap-2 rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-6 text-center shadow-[inset_0_1px_0_0_rgba(255,255,255,0.16),0_2px_10px_-4px_rgba(0,0,0,0.65)]">
    {icon}
    <p className="text-[13px] leading-relaxed text-white">{children}</p>
  </div>
);
