import { useRegisterSW } from 'virtual:pwa-register/react';
import { Button } from '@/components/ui/button';
import { RefreshCw, X } from 'lucide-react';

const UPDATE_CHECK_INTERVAL = 60 * 60 * 1000; // Check for updates every hour

export function PWAUpdatePrompt() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(swUrl, registration) {
      console.log('SW Registered:', swUrl);
      if (registration) {
        // Periodically check for updates (catches new deploys during long sessions).
        // `registration.update()` can reject when the sw.js fetch fails — typically a
        // transient network blip, an in-flight deploy that swapped chunk hashes, or
        // a cached SW pointing at a removed file. The next tick (or a user refresh)
        // recovers automatically, so we swallow the rejection here to avoid
        // polluting Sentry with `Script .../sw.js load failed` (was Sentry issues
        // 2H/2S — 12 users / 79 events combined).
        setInterval(() => {
          registration.update().catch((err) => {
            // Keep visibility in dev / breadcrumb trail without escalating.
            console.debug('[SW] periodic update failed (recoverable):', err);
          });
        }, UPDATE_CHECK_INTERVAL);
      }
    },
    onRegisterError(error) {
      // VitePWA already swallows these into this callback rather than letting them
      // bubble — but log for breadcrumb visibility.
      console.log('SW registration error', error);
    },
  });

  const close = () => {
    setNeedRefresh(false);
  };

  if (!needRefresh) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 z-50 bg-card border border-border rounded-lg shadow-lg p-4 animate-in slide-in-from-bottom-5">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-primary/10 rounded-full">
          <RefreshCw className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-foreground">Update Available</h4>
          <p className="text-sm text-muted-foreground mt-1">
            A new version of Elec-Mate is available.
          </p>
          <div className="flex gap-2 mt-3">
            <Button size="sm" onClick={() => updateServiceWorker(true)} className="flex-1">
              Update Now
            </Button>
            <Button size="sm" variant="outline" onClick={close}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
