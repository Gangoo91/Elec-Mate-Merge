import { Link } from 'react-router-dom';
import { ArrowRight, type LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PreviewFeature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface SEOAppPreviewProps {
  heading?: string;
  subheading?: string;
  features: PreviewFeature[];
}

export function SEOAppPreview({
  heading = 'What You Get Inside Elec-Mate',
  subheading = 'This is just one tool inside the complete platform. Here\u2019s what\u2019s waiting for you:',
  features,
}: SEOAppPreviewProps) {
  return (
    <section className="py-12 sm:py-16 px-5">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-sm font-medium text-yellow-400 mb-4">
            Inside the App
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">{heading}</h2>
          <p className="text-white max-w-2xl mx-auto leading-relaxed">{subheading}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="relative p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-yellow-500/[0.06] to-transparent border border-yellow-500/15 hover:border-yellow-500/30 transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-3 bg-yellow-500/15 border border-yellow-500/25">
                  <Icon className="w-5 h-5 text-yellow-400" />
                </div>
                <h3 className="font-bold text-white text-base mb-1.5">{feature.title}</h3>
                <p className="text-sm text-white leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center mt-8">
          <Link to="/auth/signup">
            <Button className="h-12 px-8 text-base font-semibold bg-yellow-500 hover:bg-yellow-400 active:scale-[0.97] text-black rounded-xl shadow-lg shadow-yellow-500/25 touch-manipulation transition-all">
              Try It Free for 7 Days
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
