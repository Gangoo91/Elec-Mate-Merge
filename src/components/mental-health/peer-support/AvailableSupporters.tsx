import React, { useEffect, useRef } from 'react';
import { Users, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import SupporterCard from './SupporterCard';
import { PeerSupporter, peerPresenceService } from '@/services/peerSupportService';
import { useAvailableSupporters } from '@/hooks/usePeerChat';
import { useQueryClient } from '@tanstack/react-query';

interface AvailableSupportersProps {
  onConnect: (supporterId: string) => void;
  onViewProfile?: (supporter: PeerSupporter) => void;
  connectingId?: string | null;
  excludeUserId?: string;
}

// Skeleton card for loading state - matches compact SupporterCard design
const SupporterCardSkeleton = () => (
  <div className="bg-gradient-to-br from-white/[0.06] to-white/[0.02] rounded-xl border border-purple-500/20 p-3">
    {/* Top section: Avatar + Info */}
    <div className="flex gap-3">
      <Skeleton className="w-11 h-11 rounded-xl bg-white/10 shrink-0" />
      <div className="flex-1 space-y-1.5">
        <Skeleton className="h-4 w-20 bg-white/10" />
        <Skeleton className="h-3 w-28 bg-white/10" />
      </div>
    </div>
    {/* Bio skeleton */}
    <Skeleton className="h-8 w-full mt-2 bg-white/10" />
    {/* Topics skeleton */}
    <div className="flex gap-1 mt-2">
      <Skeleton className="h-4 w-12 rounded-full bg-white/10" />
      <Skeleton className="h-4 w-14 rounded-full bg-white/10" />
      <Skeleton className="h-4 w-10 rounded-full bg-white/10" />
    </div>
    {/* Bottom: Stats + CTA */}
    <div className="flex justify-between items-center mt-3 pt-2 border-t border-white/5">
      <Skeleton className="h-3 w-14 bg-white/10" />
      <Skeleton className="h-8 w-16 rounded-md bg-white/10" />
    </div>
  </div>
);

const AvailableSupporters: React.FC<AvailableSupportersProps> = ({
  onConnect,
  onViewProfile,
  connectingId,
  excludeUserId,
}) => {
  const queryClient = useQueryClient();
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Use cached hook for supporters
  const { data: supporters = [], isLoading, isError, refetch } = useAvailableSupporters(excludeUserId);

  // Subscribe to real-time presence updates - OPTIMIZED: Single record updates
  useEffect(() => {
    const unsubscribe = peerPresenceService.subscribeToAvailability((updatedSupporter, eventType) => {
      // Skip if this is the excluded user
      if (excludeUserId && updatedSupporter.user_id === excludeUserId) return;

      // Clear existing debounce timer
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      // Debounce updates by 200ms to batch rapid changes
      debounceTimerRef.current = setTimeout(() => {
        queryClient.setQueryData<PeerSupporter[]>(['available-supporters', excludeUserId], (old) => {
          if (!old) return old;

          // Handle different event types
          if (eventType === 'DELETE') {
            return old.filter(s => s.id !== updatedSupporter.id);
          }

          if (eventType === 'INSERT') {
            // Only add if available and active
            if (updatedSupporter.is_available && updatedSupporter.is_active) {
              return [...old, updatedSupporter];
            }
            return old;
          }

          // UPDATE event
          if (updatedSupporter.is_available && updatedSupporter.is_active) {
            // Update existing or add if not found
            const exists = old.find(s => s.id === updatedSupporter.id);
            if (exists) {
              return old.map(s => s.id === updatedSupporter.id ? updatedSupporter : s);
            }
            return [...old, updatedSupporter];
          } else {
            // Remove if no longer available/active
            return old.filter(s => s.id !== updatedSupporter.id);
          }
        });
      }, 200);
    });

    return () => {
      unsubscribe();
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [excludeUserId, queryClient]);

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
        <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 snap-x hide-scrollbar md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible">
          <div className="min-w-[220px] snap-start md:min-w-0">
            <SupporterCardSkeleton />
          </div>
          <div className="min-w-[220px] snap-start md:min-w-0">
            <SupporterCardSkeleton />
          </div>
          <div className="min-w-[220px] snap-start md:min-w-0 md:hidden lg:block">
            <SupporterCardSkeleton />
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-8 text-center px-4">
        <p className="text-red-400 mb-4">Failed to load supporters</p>
        <Button
          variant="outline"
          onClick={() => refetch()}
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
          onClick={() => refetch()}
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
          onClick={() => refetch()}
          className="h-11 gap-1.5 text-white hover:text-white touch-manipulation active:scale-[0.98] transition-all"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </Button>
      </div>

      {/* Horizontal Scroll on Mobile, Grid on Desktop */}
      <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 snap-x hide-scrollbar md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible">
        {supporters.map((supporter) => (
          <div key={supporter.id} className="min-w-[220px] snap-start md:min-w-0">
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
