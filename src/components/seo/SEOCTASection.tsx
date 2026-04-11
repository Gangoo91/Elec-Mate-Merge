import { Link } from 'react-router-dom';
import { ArrowRight, Check, Shield, Smartphone, Zap, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StoreBadges } from '@/components/seo/StoreBadges';
import { USER_COUNT_LABEL, TESTIMONIALS } from '@/constants/social-proof';

interface SEOCTASectionProps {
  heading?: string;
  subheading?: string;
}

export function SEOCTASection({
  heading = 'Ready to work smarter?',
  subheading = `Join ${USER_COUNT_LABEL} saving hours every week with 70+ calculators, 8 certificate types, AI agents, and 36+ training courses.`,
}: SEOCTASectionProps) {
  // Pick a testimonial for the CTA
  const t = TESTIMONIALS[0];

  return (
    <section className="py-16 sm:py-20 px-5">
      <div className="max-w-3xl mx-auto">
        {/* Outer glow */}
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500/20 via-amber-500/10 to-yellow-500/20 rounded-3xl blur-xl" />

          <div className="relative rounded-2xl bg-gradient-to-br from-yellow-500/15 via-amber-500/10 to-orange-500/5 border border-yellow-500/20 p-8 sm:p-12">
            {/* Badge */}
            <div className="flex justify-center mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/15 border border-yellow-500/25 text-sm font-medium text-yellow-400">
                <Zap className="w-3.5 h-3.5" />
                7-Day Free Trial — Cancel Anytime, No Hassle
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center mb-4 leading-tight">
              {heading}
            </h2>
            <p className="text-white text-center mb-6 max-w-xl mx-auto leading-relaxed">
              {subheading}
            </p>

            {/* Testimonial quote */}
            <div className="flex flex-col items-center mb-6">
              <div className="flex items-center gap-0.5 mb-2">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-white/70 italic text-center max-w-md">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="text-[11px] text-white/40 mt-1">
                {t.name}, {t.company}
              </p>
            </div>

            {/* Primary CTA */}
            <div className="flex justify-center mb-6">
              <Link to="/auth/signup">
                <Button className="h-14 px-10 text-base font-semibold bg-yellow-500 hover:bg-yellow-400 active:scale-[0.97] text-black rounded-xl shadow-lg shadow-yellow-500/25 touch-manipulation transition-all">
                  Start Your Free Trial
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            {/* Price anchor */}
            <p className="text-center text-sm text-white/50 mb-6">
              From <span className="text-white font-semibold">£5.99/mo</span> after trial — less
              than a coffee a week
            </p>

            {/* Divider */}
            <div className="flex items-center gap-3 max-w-xs mx-auto mb-6">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-xs text-white/50 font-medium whitespace-nowrap">
                or download the app
              </span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Store badges */}
            <StoreBadges size="md" className="mb-8" />

            {/* Trust signals */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm text-white">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-green-400 shrink-0" />7 days free, then from £5.99/mo
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-green-400 shrink-0" />
                Cancel in one tap — no calls, no hassle
              </span>
              <span className="flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-blue-400 shrink-0" />
                iOS, Android & Web
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-yellow-400 shrink-0" />
                BS 7671 compliant
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
