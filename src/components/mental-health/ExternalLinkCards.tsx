/**
 * ExternalLinkCards — curated outbound links (trusted charities, guides,
 * directories) across the Mental Health Hub. A list on a phone (edge to
 * edge, hairline rows), a grid of same-height cards from sm: up. Sentence
 * case, all text white; `tone` is accepted for older callers but no longer
 * paints a coloured rail (10 Oct design language).
 */
import { ArrowUpRight } from 'lucide-react';
import { openExternalUrl } from '@/utils/open-external-url';
import type { Tone } from '@/components/college/primitives';

export interface ExternalLinkCardItem {
  title: string;
  description: string;
  url: string;
  tone?: Tone;
  cta?: string;
}

const ExternalLinkCards = ({ items }: { items: ExternalLinkCardItem[] }) => {
  return (
    <ul className="-mx-4 divide-y divide-white/[0.06] overflow-hidden border-y border-white/[0.06] bg-[hsl(0_0%_12%)] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-3 sm:divide-y-0 sm:overflow-visible sm:border-0 sm:bg-transparent xl:grid-cols-3">
      {items.map((item) => (
        <li key={`${item.title}-${item.url}`} className="sm:flex">
          <button
            type="button"
            onClick={() => openExternalUrl(item.url)}
            className="group flex w-full items-start gap-3 px-5 py-4 text-left transition-colors touch-manipulation active:bg-white/[0.07] sm:flex-col sm:gap-0 sm:rounded-2xl sm:border sm:border-white/[0.1] sm:bg-[hsl(0_0%_15%)] sm:p-5 sm:hover:border-white/[0.16] sm:hover:bg-[hsl(0_0%_17%)]"
          >
            <span className="min-w-0 flex-1">
              <span className="block text-[15px] font-semibold leading-snug text-white">
                {item.title}
              </span>
              <span className="mt-1 block text-[13px] leading-relaxed text-white">
                {item.description}
              </span>
            </span>
            <span className="mt-0.5 inline-flex shrink-0 items-center gap-1 text-[13px] font-semibold text-elec-yellow sm:mt-3">
              <span className="hidden sm:inline">{item.cta ?? 'Open'}</span>
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} aria-hidden />
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ExternalLinkCards;
