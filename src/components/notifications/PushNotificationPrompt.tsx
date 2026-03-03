import React, { useState, useEffect } from 'react';
import { BellRing, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePushNotifications } from '@/hooks/usePushNotifications';
import { useAuth } from '@/contexts/AuthContext';

interface PushNotificationPromptProps {
  /** When to show the prompt. Default shows after 1 second */
  delay?: number;
  /** Context message - why they should enable notifications here */
  context?: string;
}

/**
 * Top banner push notification prompt. Shows once, then gone forever
 * once user enables or dismisses. Non-invasive inline banner.
 */
const PushNotificationPrompt: React.FC<PushNotificationPromptProps> = ({
  delay = 1000,
  context = 'Never miss important messages',
}) => {
  const { user } = useAuth();
  const { isSupported, isSubscribed, isLoading, subscribe } = usePushNotifications();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const DISMISS_KEY = 'push_prompt_dismissed';

  useEffect(() => {
    // Permanently dismissed or already enabled
    if (localStorage.getItem(DISMISS_KEY)) {
      setDismissed(true);
      return;
    }

    // Show after short delay
    const timer = setTimeout(() => {
      if (isSupported && user && !isSubscribed && !dismissed) {
        setVisible(true);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [isSupported, isSubscribed, user, delay, dismissed]);

  const handleDismiss = () => {
    localStorage.setItem(DISMISS_KEY, '1');
    setDismissed(true);
    setVisible(false);
  };

  const handleEnable = async () => {
    try {
      const success = await subscribe();
      if (success) {
        localStorage.setItem(DISMISS_KEY, '1');
        setVisible(false);
      } else {
        handleDismiss();
      }
    } catch {
      handleDismiss();
    }
  };

  if (!visible || isSubscribed || !isSupported || !user) {
    return null;
  }

  return (
    <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-elec-yellow/10 to-amber-500/10 rounded-xl border border-elec-yellow/20 mb-3 animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="w-9 h-9 rounded-lg bg-elec-yellow/15 flex items-center justify-center flex-shrink-0">
        <BellRing className="w-4.5 h-4.5 text-elec-yellow" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white">Enable notifications</p>
        <p className="text-xs text-white mt-0.5">{context}</p>
      </div>
      <Button
        size="sm"
        onClick={handleEnable}
        disabled={isLoading}
        className="bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold h-9 px-4 touch-manipulation flex-shrink-0"
      >
        {isLoading ? 'Enabling...' : 'Enable'}
      </Button>
      <button
        onClick={handleDismiss}
        className="text-white hover:bg-white/10 rounded-lg h-11 w-11 flex items-center justify-center touch-manipulation flex-shrink-0 -mr-1"
        aria-label="Dismiss"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default PushNotificationPrompt;
