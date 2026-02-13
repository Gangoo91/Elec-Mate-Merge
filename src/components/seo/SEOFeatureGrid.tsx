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

const iconColors = [
  { bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', text: 'text-yellow-400' },
  { bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-400' },
  { bg: 'bg-green-500/10', border: 'border-green-500/20', text: 'text-green-400' },
  { bg: 'bg-purple-500/10', border: 'border-purple-500/20', text: 'text-purple-400' },
  { bg: 'bg-orange-500/10', border: 'border-orange-500/20', text: 'text-orange-400' },
  { bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', text: 'text-cyan-400' },
  { bg: 'bg-rose-500/10', border: 'border-rose-500/20', text: 'text-rose-400' },
  { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400' },
  { bg: 'bg-amber-500/10', border: 'border-amber-500/20', text: 'text-amber-400' },
];

export function SEOFeatureGrid({ features, columns = 3 }: SEOFeatureGridProps) {
  return (
    <div
      className={`grid gap-4 sm:gap-5 ${columns === 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2'}`}
    >
      {features.map((feature, index) => {
        const Icon = feature.icon;
        const color = iconColors[index % iconColors.length];
        return (
          <div
            key={feature.title}
            className="group relative p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/8 hover:border-yellow-500/25 hover:bg-white/[0.05] transition-all duration-300"
          >
            {/* Subtle top gradient line on hover */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-yellow-500/0 group-hover:via-yellow-500/40 to-transparent transition-all duration-300 rounded-t-2xl" />

            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color.bg} border ${color.border}`}
            >
              <Icon className={`w-6 h-6 ${color.text}`} />
            </div>
            <h3 className="font-bold text-white text-lg mb-2">{feature.title}</h3>
            <p className="text-sm text-white leading-relaxed">{feature.description}</p>
          </div>
        );
      })}
    </div>
  );
}
