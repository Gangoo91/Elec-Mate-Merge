import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS } from '@/constants/social-proof';

/**
 * Full testimonial section — placed before the final CTA on every SEO page.
 * Shows 3 real testimonials with stars, names, and companies.
 */
export function SEOTestimonialStrip() {
  // Show first 3 testimonials
  const shown = TESTIMONIALS.slice(0, 3);

  return (
    <section className="pb-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Trusted by electricians across the UK
        </h2>
        <p className="text-white text-sm">Real feedback from real sparks</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {shown.map((t, i) => (
          <div
            key={i}
            className="relative rounded-2xl bg-white/[0.04] border border-white/[0.08] p-5 flex flex-col"
          >
            {/* Quote mark */}
            <Quote className="w-5 h-5 text-yellow-400/30 mb-3" />

            {/* Stars */}
            <div className="flex items-center gap-0.5 mb-3">
              {Array.from({ length: t.stars }).map((_, j) => (
                <Star key={j} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>

            {/* Quote */}
            <p className="text-sm text-white leading-relaxed flex-1 mb-4">
              &ldquo;{t.quote}&rdquo;
            </p>

            {/* Author */}
            <div className="border-t border-white/[0.06] pt-3">
              <p className="text-sm font-semibold text-white">{t.name}</p>
              <p className="text-[11px] text-white">
                {t.role} · {t.company}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
