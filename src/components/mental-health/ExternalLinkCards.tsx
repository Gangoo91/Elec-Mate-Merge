/**
 * ExternalLinkCards — calm 2-up card grid for curated outbound links
 * (trusted charities, guides, directories) across the Mental Health Hub.
 * One column on mobile, two on desktop. House style: dark card, hairline
 * border, tone rail — no glows, no gradients.
 */
import { openExternalUrl } from '@/utils/open-external-url';
import { cn } from '@/lib/utils';
import type { Tone } from '@/components/college/primitives';

const toneRail: Record<string, string> = {
  yellow: 'bg-elec-yellow/70',
  blue: 'bg-blue-400/70',
  emerald: 'bg-emerald-400/70',
  purple: 'bg-purple-400/70',
  red: 'bg-red-400/70',
  orange: 'bg-orange-400/70',
  amber: 'bg-amber-400/70',
  cyan: 'bg-cyan-400/70',
  indigo: 'bg-indigo-400/70',
  green: 'bg-green-400/70',
};

export interface ExternalLinkCardItem {
  title: string;
  description: string;
  url: string;
  tone?: Tone;
  cta?: string;
}

const ExternalLinkCards = ({ items }: { items: ExternalLinkCardItem[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {items.map((item) => (
        <button
          key={`${item.title}-${item.url}`}
          type="button"
          onClick={() => openExternalUrl(item.url)}
          className="group flex items-stretch gap-4 rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06] hover:bg-[hsl(0_0%_14%)] p-5 text-left transition-colors touch-manipulation"
        >
          <span
            aria-hidden
            className={cn(
              'w-[3px] rounded-full shrink-0 self-stretch',
              toneRail[item.tone ?? 'cyan']
            )}
          />
          <span className="flex-1 min-w-0 flex flex-col">
            <span className="text-[14px] font-semibold text-white leading-snug">{item.title}</span>
            <span className="mt-1 text-[12.5px] text-white/65 leading-relaxed">
              {item.description}
            </span>
            <span className="mt-3 text-[12px] font-medium text-elec-yellow/90 group-hover:text-elec-yellow transition-colors">
              {item.cta ?? 'Open'} →
            </span>
          </span>
        </button>
      ))}
    </div>
  );
};

export default ExternalLinkCards;
