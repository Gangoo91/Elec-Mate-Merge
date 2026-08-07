import React from 'react';
import { WifiOff, Cloud } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface OfflineBannerProps {
  queuedChanges: number;
  isOnline: boolean;
  onRetry?: () => void;
}

const OfflineBanner: React.FC<OfflineBannerProps> = ({ queuedChanges, isOnline, onRetry }) => {
  if (queuedChanges === 0) return null;

  // Show different messages based on online status
  if (!isOnline) {
    // User is actually offline
    return (
      <Alert className="border-destructive/50 bg-destructive/10">
        <WifiOff className="h-4 w-4 text-destructive" />
        <AlertDescription className="text-sm text-destructive flex items-center justify-between">
          <span>
            You're offline. {queuedChanges} change{queuedChanges !== 1 ? 's' : ''} will be saved
            when you reconnect.
          </span>
        </AlertDescription>
      </Alert>
    );
  }

  /*
   * Online, with changes still queued.
   *
   * Three things were wrong here. It invited a click — "Click to view details"
   * — that went nowhere: the banner has no handler, and the `useNavigate` it
   * imported for the purpose was never called. It pulsed indefinitely, which is
   * what made a stuck queue read as a blinking bar rather than a status. And it
   * said "Syncing", which is only true while a request is in flight; a queue
   * that is not draining is not syncing, and telling the electrician it is
   * hides the one fact they need.
   *
   * Now it states what is true — the work is saved on this device and not yet
   * on the server — and offers the only action that helps.
   */
  return (
    <Alert className="border-blue-500/50 bg-blue-500/10">
      <Cloud className="h-4 w-4 text-blue-500" />
      <AlertDescription className="text-sm text-blue-500 flex items-center justify-between gap-3">
        <span>
          {queuedChanges} change{queuedChanges !== 1 ? 's' : ''} saved on this device, waiting to
          reach the server.
        </span>
        {onRetry && (
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onRetry();
            }}
            className="h-7 text-blue-500 hover:text-blue-600 hover:bg-blue-500/20"
          >
            Retry Now
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
};

export default OfflineBanner;
