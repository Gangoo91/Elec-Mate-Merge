import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Capacitor } from '@capacitor/core';
import {
  hasMarketingConsent,
  initMarketingPixels,
  shutdownMarketingPixels,
  trackPageView,
} from '@/lib/marketing-pixels';

/**
 * Loads Meta Pixel + Google Ads/GA4 gtag on web only, gated on marketing consent.
 * Fires PageView on route change. Server-side conversions (Subscribe etc.)
 * come from webhook handlers — this provider is browser-only.
 *
 * Skipped on Capacitor native — native attribution comes from RevenueCat's
 * ad-network integrations (Meta / Google Ads / TikTok) configured in the
 * RC dashboard.
 */
export default function MarketingPixelsProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isNative = Capacitor.isNativePlatform();

  useEffect(() => {
    if (isNative) return;
    if (hasMarketingConsent()) initMarketingPixels();

    const handleConsentUpdate = (event: CustomEvent) => {
      const marketing = event.detail?.marketing === true;
      if (marketing) {
        initMarketingPixels();
      } else {
        shutdownMarketingPixels();
      }
    };

    window.addEventListener('cookieConsentUpdated', handleConsentUpdate as EventListener);
    return () => {
      window.removeEventListener('cookieConsentUpdated', handleConsentUpdate as EventListener);
    };
  }, [isNative]);

  useEffect(() => {
    if (isNative) return;
    trackPageView(location.pathname);
  }, [location.pathname, isNative]);

  return <>{children}</>;
}
