import { Link } from 'react-router-dom';
import { ArrowRight, Check, Shield, Smartphone, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SEOCTASectionProps {
  heading?: string;
  subheading?: string;
}

export function SEOCTASection({
  heading = 'Ready to work smarter?',
  subheading = 'Join 430+ UK electricians saving hours every week with 70 calculators, 8 certificate types, 8 Elec-AI agents, and 36+ training courses.',
}: SEOCTASectionProps) {
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
                7-Day Free Trial
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center mb-4 leading-tight">
              {heading}
            </h2>
            <p className="text-white text-center mb-8 max-w-xl mx-auto leading-relaxed">
              {subheading}
            </p>

            {/* CTA Button */}
            <div className="flex justify-center mb-8">
              <Link to="/auth/signup">
                <Button className="h-14 px-10 text-base font-semibold bg-yellow-500 hover:bg-yellow-400 active:scale-[0.97] text-black rounded-xl shadow-lg shadow-yellow-500/25 touch-manipulation transition-all">
                  Start 7-Day Free Trial
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm text-white">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-green-400 shrink-0" />7 days free
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-green-400 shrink-0" />
                Cancel anytime
              </span>
              <span className="flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-blue-400 shrink-0" />
                Works on any device
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
