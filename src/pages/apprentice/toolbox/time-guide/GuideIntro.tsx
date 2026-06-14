import { SectionHeader } from '@/components/college/primitives';

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
    <SectionHeader eyebrow={eyebrow} title={title} />
    <p className="text-white/85 text-sm leading-relaxed">{blurb}</p>

    <div className="border-y sm:border sm:rounded-md border-elec-yellow/20 bg-transparent sm:bg-elec-yellow/[0.04] -mx-4 px-4 py-4 sm:mx-0 sm:p-4 space-y-2.5">
      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
        {listLabel}
      </span>
      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2.5 text-[12.5px] text-white/85 leading-relaxed"
          >
            <span className="mt-[7px] h-1 w-1 rounded-full bg-elec-yellow/85 flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default GuideIntro;
