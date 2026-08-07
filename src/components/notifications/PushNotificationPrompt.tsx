import React, { useState, useEffect } from 'react';
import { BellRing, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePushNotifications } from '@/hooks/usePushNotifications';
import { useAuth } from '@/contexts/AuthContext';
import { storageGetSync, storageSetSync } from '@/utils/storage';

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
    if (storageGetSync(DISMISS_KEY)) {
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
    storageSetSync(DISMISS_KEY, '1');
    setDismissed(true);
    setVisible(false);
  };

  const handleEnable = async () => {
    try {
      const success = await subscribe();
      if (success) {
        storageSetSync(DISMISS_KEY, '1');
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
    // A dismissible permission prompt should not be the loudest thing on the
    // page. This was a volt-to-amber gradient with a volt icon tile and a
    // SOLID volt button, so it outshouted the £6,027 the user actually came to
    // see — and every one of those volt values was translucent, which goes
    // muddy brown on this ground (see `card-recipe`), hence the olive cast.
    //
    // Now it sits on the same neutral surface as everything else, and "Enable"
    // is an outline button: solid volt is reserved for the page's primary
    // action, which here is "New quote".
    <div className="mb-3 flex items-center gap-3 rounded-xl border border-white/[0.14] bg-white/[0.05] p-3 animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-white/[0.10] bg-white/[0.06]">
        <BellRing className="h-4 w-4 text-white" />
      </div>
      {/* On a 390px screen the title wrapped to two lines and this context
          line to FOUR, so a dismissible prompt ate ~120px of the fold and was
          the worst-looking thing on the page. The explanation is the first
          thing to go when space is tight — the title already says what the
          button does. */}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium leading-tight text-white">Enable notifications</p>
        <p className="mt-0.5 hidden text-xs leading-snug text-white sm:block">{context}</p>
      </div>
      <Button
        size="sm"
        onClick={handleEnable}
        disabled={isLoading}
        className="h-11 flex-shrink-0 border border-elec-yellow/40 bg-transparent px-4 font-semibold text-elec-yellow touch-manipulation hover:border-elec-yellow hover:bg-elec-yellow/[0.08]"
      >
        {isLoading ? 'Enabling…' : 'Enable'}
      </Button>
      <button
        onClick={handleDismiss}
        className="-mr-1 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg text-white touch-manipulation hover:bg-white/10"
        aria-label="Dismiss"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default PushNotificationPrompt;
