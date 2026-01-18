import React, { useState, useEffect } from 'react';
import { Bell, X, BellRing } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePushNotifications } from '@/hooks/usePushNotifications';
import { useAuth } from '@/contexts/AuthContext';

interface PushNotificationPromptProps {
  /** When to show the prompt. Default shows after 3 seconds */
  delay?: number;
  /** Context message - why they should enable notifications here */
  context?: string;
  /** Compact mode for inline use */
  compact?: boolean;
}

/**
 * Smart push notification prompt that only shows when:
 * - Push is supported
 * - User is logged in
 * - User hasn't already subscribed
 * - User hasn't dismissed it recently (24h localStorage)
 */
const PushNotificationPrompt: React.FC<PushNotificationPromptProps> = ({
  delay = 3000,
  context = "Never miss important messages",
  compact = false
}) => {
  const { user } = useAuth();
  const { isSupported, isSubscribed, isLoading, subscribe } = usePushNotifications();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const DISMISS_KEY = 'push_prompt_dismissed_at';

  useEffect(() => {
    // Check if recently dismissed (within 24 hours)
    const dismissedAt = localStorage.getItem(DISMISS_KEY);
    if (dismissedAt) {
      const hoursSince = (Date.now() - parseInt(dismissedAt)) / (1000 * 60 * 60);
      if (hoursSince < 24) {
        setDismissed(true);
        return;
      }
    }

    // Show after delay if conditions are met
    const timer = setTimeout(() => {
      if (isSupported && user && !isSubscribed && !dismissed) {
        setVisible(true);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [isSupported, isSubscribed, user, delay, dismissed]);

  const handleDismiss = () => {
    localStorage.setItem(DISMISS_KEY, Date.now().toString());
    setDismissed(true);
    setVisible(false);
  };

  const handleEnable = async () => {
    try {
      await subscribe();
      setVisible(false);
    } catch {
      // Permission denied or error - hide prompt
      handleDismiss();
    }
  };

  // Don't render if conditions not met
  if (!visible || isSubscribed || !isSupported || !user) {
    return null;
  }

  if (compact) {
    return (
      <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-500/10 to-elec-yellow/10 rounded-lg border border-purple-500/20">
        <Bell className="w-5 h-5 text-elec-yellow flex-shrink-0" />
        <p className="text-sm text-white/80 flex-1">{context}</p>
        <Button
          size="sm"
          onClick={handleEnable}
          disabled={isLoading}
          className="bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium h-8 px-3"
        >
          {isLoading ? 'Enabling...' : 'Enable'}
        </Button>
        <button
          onClick={handleDismiss}
          className="text-white/40 hover:text-white/60 p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-sm z-50 animate-in slide-in-from-bottom-4 duration-300">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl border border-purple-500/30 shadow-2xl shadow-purple-500/10 overflow-hidden">
        <div className="p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-elec-yellow/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
              <BellRing className="w-5 h-5 text-elec-yellow" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-white text-sm">Enable Push Notifications</h4>
              <p className="text-xs text-white/60 mt-1">{context}</p>
            </div>
            <button
              onClick={handleDismiss}
              className="text-white/40 hover:text-white/60 p-1 -mt-1 -mr-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex gap-2 mt-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
              className="flex-1 h-10 text-white/60 hover:text-white hover:bg-white/5"
            >
              Not Now
            </Button>
            <Button
              size="sm"
              onClick={handleEnable}
              disabled={isLoading}
              className="flex-1 h-10 bg-gradient-to-r from-elec-yellow to-amber-500 hover:from-elec-yellow/90 hover:to-amber-500/90 text-black font-semibold"
            >
              {isLoading ? 'Enabling...' : 'Enable'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PushNotificationPrompt;
