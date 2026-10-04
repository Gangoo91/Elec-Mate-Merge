import { Link } from 'react-router-dom';
import { ArrowRight, type LucideIcon } from 'lucide-react';

export interface RelatedPage {
  href: string;
  title: string;
  description: string;
  icon: LucideIcon;
  category: string;
}

interface SEORelatedPagesProps {
  pages: RelatedPage[];
  heading?: string;
}

export function SEORelatedPages({ pages, heading = 'Related Pages' }: SEORelatedPagesProps) {
  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">{heading}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pages.map((page) => (
          <Link
            key={page.href}
            to={page.href}
            className="group rounded-2xl bg-white/[0.04] border border-white/10 p-5 hover:border-white/[0.1] hover:bg-white/[0.06] transition-all touch-manipulation"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center shrink-0">
                <page.icon className="w-5 h-5 text-elec-yellow" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-xs font-medium text-elec-yellow uppercase tracking-wider">
                  {page.category}
                </span>
                <h3 className="font-semibold text-white mt-1 group-hover:text-elec-yellow transition-colors leading-snug">
                  {page.title}
                </h3>
                <p className="text-sm text-white mt-1.5 leading-relaxed line-clamp-2">
                  {page.description}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-elec-yellow mt-3 group-hover:gap-2 transition-all">
                  Read more <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
