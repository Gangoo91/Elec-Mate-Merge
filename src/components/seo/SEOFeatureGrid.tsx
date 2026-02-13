import { type LucideIcon } from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface SEOFeatureGridProps {
  features: Feature[];
  columns?: 2 | 3;
}

export function SEOFeatureGrid({ features, columns = 3 }: SEOFeatureGridProps) {
  return (
    <div
      className={`grid gap-4 ${columns === 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2'}`}
    >
      {features.map((feature) => {
        const Icon = feature.icon;
        return (
          <div
            key={feature.title}
            className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-yellow-500/30 transition-colors"
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-yellow-500/10 border border-yellow-500/20">
              <Icon className="w-6 h-6 text-yellow-400" />
            </div>
            <h3 className="font-bold text-white text-lg mb-2">{feature.title}</h3>
            <p className="text-sm text-white leading-relaxed">{feature.description}</p>
          </div>
        );
      })}
    </div>
  );
}
