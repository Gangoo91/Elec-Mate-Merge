import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { storageGetSync, storageSetSync, storageGetJSONSync, storageSetJSONSync } from '@/utils/storage';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Cookie, Shield, BarChart3, Megaphone, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CookiePreferences {
  essential: boolean; // Always true, cannot be changed
  analytics: boolean;
  marketing: boolean;
}

const COOKIE_CONSENT_KEY = 'elec-mate-cookie-consent';
const COOKIE_PREFERENCES_KEY = 'elec-mate-cookie-preferences';

export const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = storageGetSync(COOKIE_CONSENT_KEY);
    if (!hasConsented) {
      // Small delay to prevent banner flashing on fast page loads
      const timer = setTimeout(() => setShowBanner(true), 500);
      return () => clearTimeout(timer);
    } else {
      // Load saved preferences
      const savedPrefs = storageGetJSONSync<CookiePreferences | null>(COOKIE_PREFERENCES_KEY, null);
      if (savedPrefs) {
        setPreferences(savedPrefs);
      }
    }
  }, []);

  const saveConsent = (prefs: CookiePreferences) => {
    storageSetSync(COOKIE_CONSENT_KEY, 'true');
    storageSetJSONSync(COOKIE_PREFERENCES_KEY, prefs);
    setPreferences(prefs);
    setShowBanner(false);

    // Dispatch event for analytics providers to respond to
    window.dispatchEvent(new CustomEvent('cookieConsentUpdated', { detail: prefs }));
  };

  const handleAcceptAll = () => {
    saveConsent({
      essential: true,
      analytics: true,
      marketing: true,
    });
  };

  const handleAcceptSelected = () => {
    saveConsent(preferences);
  };

  const handleRejectNonEssential = () => {
    saveConsent({
      essential: true,
      analytics: false,
      marketing: false,
    });
  };

  if (!showBanner) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed bottom-0 left-0 right-0 z-[9999] p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:p-4"
      >
        <div className="relative mx-auto max-w-lg">
          {/* Compact strip — visitors decide in seconds; the banner must not
              own a third of the screen (it also sat exactly where the landing
              page's sticky CTA lives). Equal-prominence accept/decline kept. */}
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#161616]/95 shadow-2xl shadow-black/50 backdrop-blur-xl">
            <div className="px-4 pb-3.5 pt-3.5 sm:px-5">
              <p className="text-[13px] leading-snug text-white/85">
                <Cookie className="mr-1.5 inline h-3.5 w-3.5 text-yellow-400" aria-hidden />
                We use cookies to improve the app and measure what works.{' '}
                <Link
                  to="/cookies"
                  className="text-yellow-400 underline underline-offset-2 hover:text-yellow-300"
                >
                  Cookie Policy
                </Link>
              </p>

              <div className="mt-3 flex items-center gap-2">
                <Button
                  onClick={handleAcceptAll}
                  className="h-11 flex-1 touch-manipulation rounded-xl bg-yellow-500 text-[14px] font-semibold text-black hover:bg-yellow-400"
                >
                  Accept all
                </Button>
                <Button
                  onClick={handleRejectNonEssential}
                  variant="outline"
                  className="h-11 flex-1 touch-manipulation rounded-xl border-white/20 bg-white/5 text-[14px] text-white hover:bg-white/10"
                >
                  Essential only
                </Button>
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  aria-label="Customise cookie preferences"
                  aria-expanded={showDetails}
                  className="flex h-11 w-11 flex-shrink-0 touch-manipulation items-center justify-center rounded-xl border border-white/10 text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {showDetails ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Detailed Preferences Panel */}
            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6 border-t border-white/10 pt-4 space-y-3">
                    {/* Essential Cookies */}
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                      <div className="w-9 h-9 rounded-xl bg-green-500/20 flex items-center justify-center shrink-0">
                        <Shield className="h-4 w-4 text-green-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-white">Essential</p>
                          <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-green-500/20 text-green-400 font-medium">
                            Always on
                          </span>
                        </div>
                        <p className="text-xs text-white mt-0.5 line-clamp-1">
                          Authentication &amp; security
                        </p>
                      </div>
                      <Switch
                        checked={true}
                        disabled
                        className="data-[state=checked]:bg-green-500 opacity-50"
                      />
                    </div>

                    {/* Analytics Cookies */}
                    <div
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer touch-manipulation active:bg-white/[0.08] transition-colors"
                      onClick={() => setPreferences((p) => ({ ...p, analytics: !p.analytics }))}
                    >
                      <div className="w-9 h-9 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
                        <BarChart3 className="h-4 w-4 text-blue-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white">Analytics</p>
                        <p className="text-xs text-white mt-0.5 line-clamp-1">
                          Help us improve the platform
                        </p>
                      </div>
                      <Switch
                        checked={preferences.analytics}
                        onCheckedChange={(checked) =>
                          setPreferences((p) => ({ ...p, analytics: checked }))
                        }
                        className="data-[state=checked]:bg-yellow-400"
                      />
                    </div>

                    {/* Marketing Cookies */}
                    <div
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer touch-manipulation active:bg-white/[0.08] transition-colors"
                      onClick={() => setPreferences((p) => ({ ...p, marketing: !p.marketing }))}
                    >
                      <div className="w-9 h-9 rounded-xl bg-purple-500/20 flex items-center justify-center shrink-0">
                        <Megaphone className="h-4 w-4 text-purple-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white">Marketing</p>
                        <p className="text-xs text-white mt-0.5 line-clamp-1">
                          Personalised content &amp; ads
                        </p>
                      </div>
                      <Switch
                        checked={preferences.marketing}
                        onCheckedChange={(checked) =>
                          setPreferences((p) => ({ ...p, marketing: checked }))
                        }
                        className="data-[state=checked]:bg-yellow-400"
                      />
                    </div>

                    {/* Save Button */}
                    <Button
                      onClick={handleAcceptSelected}
                      className="w-full h-12 sm:h-11 bg-white/10 hover:bg-white/15 text-white font-medium rounded-xl touch-manipulation mt-1"
                    >
                      Save Preferences
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

// Hook to check cookie consent status
export const useCookieConsent = () => {
  const [preferences, setPreferences] = useState<CookiePreferences | null>(null);

  useEffect(() => {
    const loadPreferences = () => {
      const savedPrefs = storageGetJSONSync<CookiePreferences | null>(COOKIE_PREFERENCES_KEY, null);
      setPreferences(savedPrefs);
    };

    loadPreferences();

    // Listen for consent updates
    const handleUpdate = (e: CustomEvent<CookiePreferences>) => {
      setPreferences(e.detail);
    };

    window.addEventListener('cookieConsentUpdated', handleUpdate as EventListener);
    return () => window.removeEventListener('cookieConsentUpdated', handleUpdate as EventListener);
  }, []);

  return {
    hasConsented: preferences !== null,
    analyticsAllowed: preferences?.analytics ?? false,
    marketingAllowed: preferences?.marketing ?? false,
    preferences,
  };
};

export default CookieConsent;
