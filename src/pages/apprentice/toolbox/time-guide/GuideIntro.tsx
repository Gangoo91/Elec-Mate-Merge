import { HubSectionHeading } from '@/components/hub/HubPrimitives';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { cn } from '@/lib/utils';

interface GuideIntroProps {
  /** Mono uppercase eyebrow above the heading. */
  eyebrow: string;
  /** Section heading. */
  title: string;
  /** Intro paragraph. */
  blurb: string;
  /** Mono uppercase label above the bullet list. */
  listLabel: string;
  /** Bullet items — rendered as a mono dot list, no icons. */
  items: string[];
}

/**
 * Shared intro block for the six time-guide pages.
 * Editorial primitives: SectionHeader + mono-dot callout. Mobile-flat
 * (edge-to-edge, no card chrome until sm:).
 */
const GuideIntro = ({ eyebrow, title, blurb, listLabel, items }: GuideIntroProps) => (
  <section className="space-y-4 sm:space-y-5">
    <HubSectionHeading>{title}</HubSectionHeading>
    <p className="text-white text-sm leading-relaxed">{blurb}</p>

    <div
      className={cn(
        '-mx-4 space-y-2.5 border-y border-elec-yellow/35 px-4 py-4 sm:mx-0 sm:rounded-2xl sm:border sm:p-4',
        CARD_SURFACE
      )}
    >
      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow">
        {listLabel}
      </span>
      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2.5 text-[12.5px] text-white leading-relaxed"
          >
            <span className="mt-[7px] h-1 w-1 rounded-full bg-elec-yellow flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default GuideIntro;
