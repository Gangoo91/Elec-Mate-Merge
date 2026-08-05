import { PANEL, LABEL, DIVIDE } from '@/components/seo/seoSurface';

interface SEOKeyTakeawaysProps {
  takeaways: string[];
  heading?: string;
}

/**
 * The page's points, as numbered spec rows on hairlines — the house
 * signature. The numbers earn their place here: these are the ordered
 * takeaways a reader scans before deciding to read on, so the sequence
 * carries meaning rather than decorating a bullet list.
 */
export function SEOKeyTakeaways({ takeaways, heading = 'Key takeaways' }: SEOKeyTakeawaysProps) {
  return (
    <section aria-labelledby="key-takeaways-heading">
      <h2 id="key-takeaways-heading" className={`${LABEL} mb-3 text-white`}>
        {heading}
      </h2>
      <ol className={`${PANEL} ${DIVIDE}`}>
        {takeaways.map((item, index) => (
          <li key={index} className="flex items-start gap-3 px-4 py-3.5 sm:px-5">
            <span className="w-5 shrink-0 pt-[3px] text-[11px] font-semibold tabular-nums text-white">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="flex-1 text-left text-[14.5px] leading-relaxed text-white">
              {item}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
