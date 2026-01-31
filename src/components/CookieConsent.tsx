import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
    const hasConsented = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!hasConsented) {
      // Small delay to prevent banner flashing on fast page loads
      const timer = setTimeout(() => setShowBanner(true), 500);
      return () => clearTimeout(timer);
    } else {
      // Load saved preferences
      const savedPrefs = localStorage.getItem(COOKIE_PREFERENCES_KEY);
      if (savedPrefs) {
        try {
          setPreferences(JSON.parse(savedPrefs));
        } catch {
          // Invalid JSON, use defaults
        }
      }
    }
  }, []);

  const saveConsent = (prefs: CookiePreferences) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(prefs));
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
        className="fixed bottom-0 left-0 right-0 z-[9999] p-3 sm:p-4 md:p-6"
      >
        {/* Backdrop blur on mobile for better visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none sm:hidden" />

        <div className="relative max-w-lg mx-auto">
          {/* Main Card */}
          <div className="bg-[#1a1a1a]/95 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl shadow-black/50 overflow-hidden">
            {/* Drag handle - mobile only */}
            <div className="flex justify-center pt-2 pb-1 sm:hidden">
              <div className="w-8 h-1 rounded-full bg-white/20" />
            </div>

            {/* Header */}
            <div className="px-4 sm:px-6 pt-2 sm:pt-5 pb-4">
              {/* Icon and Title Row */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-yellow-400/20 to-amber-500/20 border border-yellow-400/20 flex items-center justify-center flex-shrink-0">
                  <Cookie className="h-5 w-5 sm:h-5.5 sm:w-5.5 text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-white">Cookie Preferences</h3>
                  <p className="text-xs text-white/50">Manage your privacy settings</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-white/70 leading-relaxed mb-4">
                We use cookies to enhance your experience and analyse platform usage.{' '}
                <Link to="/cookies" className="text-yellow-400 hover:text-yellow-300 underline underline-offset-2">
                  Cookie Policy
                </Link>
              </p>

              {/* Primary Actions */}
              <div className="flex gap-2 mb-3">
                <Button
                  onClick={handleAcceptAll}
                  className="flex-1 h-12 sm:h-11 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-black font-semibold rounded-xl touch-manipulation shadow-lg shadow-yellow-500/20"
                >
                  Accept All
                </Button>
                <Button
                  onClick={handleRejectNonEssential}
                  variant="outline"
                  className="flex-1 h-12 sm:h-11 border-white/20 bg-white/5 text-white hover:bg-white/10 rounded-xl touch-manipulation"
                >
                  Essential Only
                </Button>
              </div>

              {/* Customise Toggle */}
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-sm text-white/60 hover:text-white/90 transition-colors touch-manipulation rounded-lg hover:bg-white/5 active:bg-white/10"
              >
                Customise
                {showDetails ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
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
                        <p className="text-xs text-white/50 mt-0.5 line-clamp-1">
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
                      onClick={() => setPreferences(p => ({ ...p, analytics: !p.analytics }))}
                    >
                      <div className="w-9 h-9 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
                        <BarChart3 className="h-4 w-4 text-blue-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white">Analytics</p>
                        <p className="text-xs text-white/50 mt-0.5 line-clamp-1">
                          Help us improve the platform
                        </p>
                      </div>
                      <Switch
                        checked={preferences.analytics}
                        onCheckedChange={(checked) => setPreferences(p => ({ ...p, analytics: checked }))}
                        className="data-[state=checked]:bg-yellow-400"
                      />
                    </div>

                    {/* Marketing Cookies */}
                    <div
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer touch-manipulation active:bg-white/[0.08] transition-colors"
                      onClick={() => setPreferences(p => ({ ...p, marketing: !p.marketing }))}
                    >
                      <div className="w-9 h-9 rounded-xl bg-purple-500/20 flex items-center justify-center shrink-0">
                        <Megaphone className="h-4 w-4 text-purple-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white">Marketing</p>
                        <p className="text-xs text-white/50 mt-0.5 line-clamp-1">
                          Personalised content &amp; ads
                        </p>
                      </div>
                      <Switch
                        checked={preferences.marketing}
                        onCheckedChange={(checked) => setPreferences(p => ({ ...p, marketing: checked }))}
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
      const savedPrefs = localStorage.getItem(COOKIE_PREFERENCES_KEY);
      if (savedPrefs) {
        try {
          setPreferences(JSON.parse(savedPrefs));
        } catch {
          setPreferences(null);
        }
      }
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
