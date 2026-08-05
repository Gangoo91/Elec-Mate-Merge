import { LABEL } from '@/components/seo/seoSurface';

interface SEOSectionHeadingProps {
  /** Small-caps line above the heading, e.g. "03 · TESTING GUIDE". */
  eyebrow?: string;
  title: string;
}

/**
 * Section heading for every public/SEO page template.
 *
 * The heading carries the page's colour. On a long near-black article the
 * sub-headings are what the eye scans, so putting the brand yellow there
 * breaks up the black-and-white without tinting a single surface — which is
 * the rule that keeps these pages out of the muddy-brown territory they were
 * in before (see seoSurface.ts).
 *
 * Deliberately NOT the `SectionHeader` primitive from the College Hub: that
 * one is shared with a different product area and a public-marketing colour
 * decision shouldn't leak into it.
 */
export function SEOSectionHeading({ eyebrow, title }: SEOSectionHeadingProps) {
  return (
    <div>
      {eyebrow && <p className={`${LABEL} text-white`}>{eyebrow}</p>}
      <h2 className="mt-2 text-[26px] font-bold leading-[1.1] tracking-[-0.03em] text-elec-yellow sm:text-[30px] lg:text-[34px]">
        {title}
      </h2>
    </div>
  );
}

export default SEOSectionHeading;
