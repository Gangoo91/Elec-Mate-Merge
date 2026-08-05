import { Link } from 'react-router-dom';
import { StoreBadges } from '@/components/seo/StoreBadges';
import { USER_COUNT_LABEL, TESTIMONIALS } from '@/constants/social-proof';
import { CARD, DIVIDE } from '@/components/seo/seoSurface';

interface SEOCTASectionProps {
  heading?: string;
  subheading?: string;
}

/**
 * End-of-page conversion block — and the one block of colour on the page.
 *
 * A guide runs long on near-black. Rather than sprinkle tint around (which is
 * what produced the muddy brown panels), the page stays neutral throughout and
 * then commits completely here: a full-bleed elec-yellow band with black type.
 * It breaks the black-and-white, it lands exactly where we want the eye to
 * stop, and it uses the brand colour at full strength — the opposite of a 10%
 * wash. Yellow appears nowhere else on the page as a surface, so this reads as
 * deliberate rather than decorative.
 *
 * Full-bleed via the left-1/2 + -ml-[50vw] technique because this renders
 * inside SEOPageShell's max-w-6xl container.
 *
 * Rebuilt 2026-08-05. The previous version stacked most of the house's
 * "looks AI-generated" tells into one component: an outer blurred glow, a
 * yellow→amber→orange gradient wash, a rounded pill badge with a lightning
 * icon, star glyphs, green ticks, a blue phone and a yellow shield, all
 * centred.
 */
export function SEOCTASection({
  heading = 'Ready to work smarter?',
  subheading = `Join ${USER_COUNT_LABEL} saving hours every week with 16 certificate types, 70+ calculators, RAMS, quoting, invoicing, AI agents, and 46+ training courses.`,
}: SEOCTASectionProps) {
  const t = TESTIMONIALS[0];

  const terms = [
    '7 days free, then from £6.99/mo',
    'Cancel in one tap — no calls, no hassle',
    'iOS, Android and web',
    'Built to BS 7671:2018+A4:2026',
  ];

  return (
    <>
      {/* THE ASK — a tight full-bleed yellow stripe.
          Deliberately short. The first version put the proof column inside the
          yellow too, which on desktop read as a confident band but on a phone
          became three screens of unbroken yellow you had to scroll through —
          at which point it is not an accent, it is the page, and there is
          nothing left for it to contrast against. Keeping only the ask in
          colour holds it to roughly one screen on mobile. */}
      <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-elec-yellow text-black">
        <div className="mx-auto max-w-3xl px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-black">
            7-day free trial
          </p>
          <h2 className="mt-3 max-w-[16ch] text-[32px] font-bold leading-[1.02] tracking-[-0.04em] text-black sm:text-[42px] lg:text-[48px]">
            {heading}
          </h2>
          <p className="mt-4 max-w-[50ch] text-[15.5px] font-medium leading-relaxed text-black sm:text-[16px]">
            {subheading}
          </p>
          <Link
            to="/auth/signup"
            className="mt-7 inline-flex h-14 w-full touch-manipulation items-center justify-center rounded-xl bg-black px-8 text-[16px] font-bold text-elec-yellow transition-opacity hover:opacity-90 sm:w-auto"
          >
            Start your free trial
          </Link>
          <p className="mt-3 text-[13.5px] font-medium text-black">
            From <span className="font-bold">£6.99/mo</span> after the trial — no charge until day 8.
          </p>
        </div>
      </section>

      {/* THE PROOF — back on the dark ground, so the yellow stays a stripe. */}
      <section className="px-4 py-12 sm:px-5 sm:py-14">
        <div className={`${CARD} mx-auto max-w-3xl p-5 sm:p-7`}>
          <blockquote>
            <p className="text-[16px] leading-relaxed text-white">&ldquo;{t.quote}&rdquo;</p>
            <footer className="mt-2.5 text-[13px] text-white">
              {t.name}, {t.company} · {t.stars} out of 5
            </footer>
          </blockquote>

          <ul className={`mt-6 border-y border-white/[0.08] ${DIVIDE}`}>
            {terms.map((line) => (
              <li key={line} className="py-2.5 text-[13.5px] leading-snug text-white">
                {line}
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <p className="mb-3 text-[12.5px] text-white">Or download the app</p>
            <StoreBadges size="md" />
          </div>
        </div>
      </section>
    </>
  );
}
