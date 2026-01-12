import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Users, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import SupporterCard from './SupporterCard';
import { PeerSupporter, peerSupporterService, peerPresenceService } from '@/services/peerSupportService';

interface AvailableSupportersProps {
  onConnect: (supporterId: string) => void;
  onViewProfile?: (supporter: PeerSupporter) => void;
  connectingId?: string | null;
  excludeUserId?: string;
}

// Skeleton card for loading state
const SupporterCardSkeleton = () => (
  <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl rounded-2xl border border-purple-500/20 overflow-hidden p-5">
    {/* Avatar skeleton */}
    <div className="w-16 h-16 mx-auto mb-3">
      <Skeleton className="w-16 h-16 rounded-2xl bg-white/10" />
    </div>

    {/* Name skeleton */}
    <Skeleton className="h-6 w-32 mx-auto mb-2 bg-white/10" />

    {/* Badge skeleton */}
    <Skeleton className="h-5 w-24 mx-auto mb-2 bg-white/10" />

    {/* Response time skeleton */}
    <Skeleton className="h-4 w-40 mx-auto mb-3 bg-white/10" />

    {/* Bio skeleton */}
    <Skeleton className="h-10 w-full mb-3 bg-white/10" />

    {/* Topics skeleton */}
    <div className="flex gap-2 justify-center mb-3">
      <Skeleton className="h-6 w-16 rounded-full bg-white/10" />
      <Skeleton className="h-6 w-20 rounded-full bg-white/10" />
      <Skeleton className="h-6 w-14 rounded-full bg-white/10" />
    </div>

    {/* Button skeleton */}
    <Skeleton className="h-12 w-full rounded-md bg-white/10" />
  </div>
);

const AvailableSupporters: React.FC<AvailableSupportersProps> = ({
  onConnect,
  onViewProfile,
  connectingId,
  excludeUserId,
}) => {
  const [supporters, setSupporters] = useState<PeerSupporter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Debounce timer ref for presence updates
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const loadSupporters = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await peerSupporterService.getAvailableSupporters();
      // Filter out current user if they're also a supporter
      const filtered = excludeUserId
        ? data.filter(s => s.user_id !== excludeUserId)
        : data;
      setSupporters(filtered);
    } catch (err) {
      console.error('Error loading supporters:', err);
      setError('Failed to load supporters');
    } finally {
      setIsLoading(false);
    }
  }, [excludeUserId]);

  useEffect(() => {
    loadSupporters();

    // Subscribe to real-time updates with debouncing
    const unsubscribe = peerPresenceService.subscribeToAvailability((updated) => {
      // Clear existing debounce timer
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      // Debounce updates by 500ms to prevent excessive re-renders
      debounceTimerRef.current = setTimeout(() => {
        const filtered = excludeUserId
          ? updated.filter(s => s.user_id !== excludeUserId)
          : updated;
        setSupporters(filtered);
      }, 500);
    });

    return () => {
      unsubscribe();
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [excludeUserId, loadSupporters]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {/* Header skeleton */}
        <div className="flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <Skeleton className="h-4 w-32 bg-white/10" />
          </div>
          <Skeleton className="h-10 w-20 bg-white/10" />
        </div>

        {/* Skeleton cards */}
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 snap-x hide-scrollbar md:grid md:grid-cols-2 md:overflow-visible">
          <div className="min-w-[280px] snap-start md:min-w-0">
            <SupporterCardSkeleton />
          </div>
          <div className="min-w-[280px] snap-start md:min-w-0">
            <SupporterCardSkeleton />
          </div>
          <div className="min-w-[280px] snap-start md:min-w-0 md:hidden">
            <SupporterCardSkeleton />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 text-center px-4">
        <p className="text-red-400 mb-4">{error}</p>
        <Button
          variant="outline"
          onClick={loadSupporters}
          className="gap-2 text-white border-white/20 hover:bg-white/10 h-11 touch-manipulation active:scale-[0.98]"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </Button>
      </div>
    );
  }

  if (supporters.length === 0) {
    return (
      <div className="py-12 text-center px-4">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-500/10 flex items-center justify-center">
          <Users className="w-8 h-8 text-purple-400/50" />
        </div>
        <h3 className="font-semibold text-white mb-2">No one available right now</h3>
        <p className="text-sm text-white max-w-xs mx-auto">
          All our Mental Health Mates are currently offline. Check back later or consider
          becoming a supporter yourself!
        </p>
        <Button
          variant="ghost"
          onClick={loadSupporters}
          className="mt-4 gap-2 text-white hover:text-white h-11 touch-manipulation active:scale-[0.98]"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </span>
          <h3 className="text-sm font-medium text-white">
            Available Now ({supporters.length})
          </h3>
        </div>
        <Button
          variant="ghost"
          onClick={loadSupporters}
          className="h-11 gap-1.5 text-white hover:text-white touch-manipulation active:scale-[0.98] transition-all"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </Button>
      </div>

      {/* Horizontal Scroll on Mobile, Grid on Desktop */}
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 snap-x hide-scrollbar md:grid md:grid-cols-2 md:overflow-visible">
        {supporters.map((supporter) => (
          <div key={supporter.id} className="min-w-[280px] snap-start md:min-w-0">
            <SupporterCard
              supporter={supporter}
              onConnect={onConnect}
              onViewProfile={onViewProfile}
              isConnecting={connectingId === supporter.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableSupporters;
