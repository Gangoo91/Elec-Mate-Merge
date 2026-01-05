import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WifiOff, Wifi, Cloud, CloudOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { offlineQueue } from '@/utils/offlineQueue';

export const OfflineIndicator = () => {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [queuedChanges, setQueuedChanges] = useState(0);

  useEffect(() => {
    const updateOnlineStatus = () => setIsOnline(navigator.onLine);
    
    const updateQueueCount = async () => {
      const count = await offlineQueue.getQueueCount();
      setQueuedChanges(count);
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    
    // Update queue count every 2 seconds
    const interval = setInterval(updateQueueCount, 2000);
    updateQueueCount(); // Initial check

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
      clearInterval(interval);
    };
  }, []);

  if (isOnline && queuedChanges === 0) return null;

  return (
    <div
      onClick={() => queuedChanges > 0 && navigate('/sync-status')}
      className={cn(
        "fixed bottom-4 right-4 z-50 px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 text-sm font-medium transition-all",
        queuedChanges > 0 && "cursor-pointer hover:scale-105",
        !isOnline 
          ? "bg-red-500 text-foreground" 
          : "bg-amber-500 text-foreground"
      )}
    >
      {!isOnline ? (
        <>
          <WifiOff className="h-4 w-4" />
          <span>Offline Mode</span>
          {queuedChanges > 0 && (
            <span className="ml-2 px-2 py-0.5 bg-white/20 rounded">
              {queuedChanges} queued
            </span>
          )}
        </>
      ) : (
        <>
          <Cloud className="h-4 w-4 animate-pulse" />
          <span>Syncing {queuedChanges} changes...</span>
        </>
      )}
    </div>
  );
};
