import React from 'react';
import { WifiOff, Cloud, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface OfflineBannerProps {
  queuedChanges: number;
  isOnline: boolean;
  onRetry?: () => void;
}

const OfflineBanner: React.FC<OfflineBannerProps> = ({ queuedChanges, isOnline, onRetry }) => {
  const navigate = useNavigate();

  if (queuedChanges === 0) return null;

  // Show different messages based on online status
  if (!isOnline) {
    // User is actually offline
    return (
      <Alert className="border-destructive/50 bg-destructive/10">
        <WifiOff className="h-4 w-4 text-destructive" />
        <AlertDescription className="text-sm text-destructive flex items-center justify-between">
          <span>
            You're offline. {queuedChanges} change{queuedChanges !== 1 ? 's' : ''} will be saved when you reconnect.
          </span>
        </AlertDescription>
      </Alert>
    );
  }

  // User is online but has queued changes
  return (
    <Alert 
      className="border-blue-500/50 bg-blue-500/10 cursor-pointer hover:bg-blue-500/20 transition-colors"
      onClick={() => navigate('/sync-status')}
    >
      <Cloud className="h-4 w-4 text-blue-500 animate-pulse" />
      <AlertDescription className="text-sm text-blue-500 flex items-center justify-between">
        <span>
          Syncing {queuedChanges} change{queuedChanges !== 1 ? 's' : ''}... Click to view details.
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
