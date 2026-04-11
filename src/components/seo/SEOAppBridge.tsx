import { Link } from 'react-router-dom';
import { ArrowRight, Zap, type LucideIcon } from 'lucide-react';
import { StoreBadges } from '@/components/seo/StoreBadges';

interface SEOAppBridgeProps {
  title: string;
  description: string;
  ctaText?: string;
  ctaHref?: string;
  icon?: LucideIcon;
  showStoreBadges?: boolean;
}

export function SEOAppBridge({
  title,
  description,
  ctaText = 'Try it free for 7 days',
  ctaHref = '/auth/signup',
  icon: Icon = Zap,
  showStoreBadges = false,
}: SEOAppBridgeProps) {
  return (
    <div className="rounded-2xl bg-gradient-to-r from-yellow-500/10 to-yellow-600/5 border-l-4 border-l-yellow-500 border border-yellow-500/20 p-5 my-8">
      <div className="flex items-start gap-4">
        <div className="w-11 h-11 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5 text-yellow-400" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-white text-base mb-1">{title}</h4>
          <p className="text-sm text-white leading-relaxed mb-4">{description}</p>
          <Link
            to={ctaHref}
            className="inline-flex items-center gap-2 h-10 px-5 bg-yellow-500 hover:bg-yellow-400 text-black text-sm font-semibold rounded-lg touch-manipulation transition-colors active:scale-[0.97]"
          >
            {ctaText}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          {showStoreBadges && <StoreBadges size="sm" className="mt-4" />}
        </div>
      </div>
    </div>
  );
}
