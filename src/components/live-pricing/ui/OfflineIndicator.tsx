import { useState, useEffect } from "react";
import { WifiOff, Wifi } from "lucide-react";
import { cn } from "@/lib/utils";

interface OfflineIndicatorProps {
  className?: string;
}

const OfflineIndicator = ({ className }: OfflineIndicatorProps) => {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== "undefined" ? navigator.onLine : true
  );
  const [showReconnected, setShowReconnected] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowReconnected(true);
      // Hide the "Back online" message after 3 seconds
      setTimeout(() => setShowReconnected(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowReconnected(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Show nothing if online and not recently reconnected
  if (isOnline && !showReconnected) return null;

  return (
    <div
      className={cn(
        "fixed top-16 left-0 right-0 z-50 px-4 py-2",
        "animate-in slide-in-from-top duration-300",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center gap-2 py-2 px-4 rounded-xl mx-auto max-w-sm",
          "text-sm font-medium shadow-lg",
          isOnline
            ? "bg-emerald-500/20 border border-emerald-500/30 text-emerald-400"
            : "bg-rose-500/20 border border-rose-500/30 text-rose-400"
        )}
      >
        {isOnline ? (
          <>
            <Wifi className="h-4 w-4" />
            <span>Back online</span>
          </>
        ) : (
          <>
            <WifiOff className="h-4 w-4" />
            <span>You're offline - Some features may be limited</span>
          </>
        )}
      </div>
    </div>
  );
};

export default OfflineIndicator;
