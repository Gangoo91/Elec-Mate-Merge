import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SEOCTASectionProps {
  heading?: string;
  subheading?: string;
}

export function SEOCTASection({
  heading = 'Ready to work smarter?',
  subheading = 'Join 430+ UK electricians saving hours every week. 7-day free trial, cancel anytime.',
}: SEOCTASectionProps) {
  return (
    <section className="py-16 px-5">
      <div className="max-w-2xl mx-auto text-center">
        <div className="rounded-2xl bg-gradient-to-br from-yellow-500/20 via-amber-500/15 to-orange-500/10 border border-yellow-500/30 p-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">{heading}</h2>
          <p className="text-white mb-6 max-w-md mx-auto">{subheading}</p>
          <Link to="/auth/signup">
            <Button className="h-14 px-10 text-base font-semibold bg-yellow-500 hover:bg-yellow-400 active:scale-[0.97] text-black touch-manipulation transition-transform">
              Start 7-Day Free Trial
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <div className="flex items-center justify-center gap-3 text-white text-sm mt-5">
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-green-500" />7 days free
            </span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-green-500" />
              Cancel anytime
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
