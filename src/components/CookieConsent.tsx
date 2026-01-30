import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Cookie, X, Settings, ChevronDown, ChevronUp } from 'lucide-react';
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
        className="fixed bottom-0 left-0 right-0 z-[9999] p-4 sm:p-6"
      >
        <div className="max-w-2xl mx-auto bg-neutral-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
          {/* Main Banner */}
          <div className="p-4 sm:p-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-yellow-400/20 flex items-center justify-center flex-shrink-0">
                <Cookie className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold text-white mb-1">We use cookies</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  We use cookies to improve your experience and analyse how our platform is used.
                  You can accept all cookies or customise your preferences.{' '}
                  <Link to="/cookies" className="text-yellow-400 hover:underline">
                    Learn more
                  </Link>
                </p>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 mb-3">
              <Button
                onClick={handleAcceptAll}
                className="flex-1 h-11 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold touch-manipulation"
              >
                Accept All
              </Button>
              <Button
                onClick={handleRejectNonEssential}
                variant="outline"
                className="flex-1 h-11 border-white/20 text-white hover:bg-white/5 touch-manipulation"
              >
                Essential Only
              </Button>
            </div>

            {/* Manage Preferences Toggle */}
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="w-full flex items-center justify-center gap-2 py-2 text-sm text-gray-400 hover:text-white transition-colors touch-manipulation"
            >
              <Settings className="h-4 w-4" />
              Manage Preferences
              {showDetails ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          </div>

          {/* Detailed Preferences */}
          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="px-4 sm:px-6 pb-4 sm:pb-6 border-t border-white/10 pt-4 space-y-4">
                  {/* Essential Cookies */}
                  <div className="flex items-center justify-between gap-4 p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-white">Essential Cookies</p>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-yellow-400/20 text-yellow-400 font-medium">
                          Required
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Necessary for the platform to function (authentication, security)
                      </p>
                    </div>
                    <Switch
                      checked={true}
                      disabled
                      className="data-[state=checked]:bg-yellow-400"
                    />
                  </div>

                  {/* Analytics Cookies */}
                  <div
                    className="flex items-center justify-between gap-4 p-3 rounded-lg bg-white/5 border border-white/10 cursor-pointer touch-manipulation active:bg-white/[0.08]"
                    onClick={() => setPreferences(p => ({ ...p, analytics: !p.analytics }))}
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white">Analytics Cookies</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Help us understand how you use the platform to improve it
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
                    className="flex items-center justify-between gap-4 p-3 rounded-lg bg-white/5 border border-white/10 cursor-pointer touch-manipulation active:bg-white/[0.08]"
                    onClick={() => setPreferences(p => ({ ...p, marketing: !p.marketing }))}
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white">Marketing Cookies</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Allow personalised content and advertisements
                      </p>
                    </div>
                    <Switch
                      checked={preferences.marketing}
                      onCheckedChange={(checked) => setPreferences(p => ({ ...p, marketing: checked }))}
                      className="data-[state=checked]:bg-yellow-400"
                    />
                  </div>

                  {/* Save Preferences Button */}
                  <Button
                    onClick={handleAcceptSelected}
                    className="w-full h-11 bg-white/10 hover:bg-white/20 text-white font-medium touch-manipulation"
                  >
                    Save Preferences
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
