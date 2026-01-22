import React, { useEffect, useRef } from 'react';
import { Users, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import SupporterListItem from './SupporterListItem';
import { PeerSupporter, peerPresenceService } from '@/services/peerSupportService';
import { useAvailableSupporters } from '@/hooks/usePeerChat';
import { useQueryClient } from '@tanstack/react-query';

interface AvailableSupportersProps {
  onConnect: (supporterId: string) => void;
  onViewProfile?: (supporter: PeerSupporter) => void;
  connectingId?: string | null;
  excludeUserId?: string;
}

// Skeleton for loading state - matches list item design
const SupporterListSkeleton = () => (
  <div className="space-y-3">
    {[1, 2, 3].map((i) => (
      <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
        <Skeleton className="w-14 h-14 rounded-xl bg-white/10 shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-24 bg-white/10" />
            <Skeleton className="h-4 w-16 rounded-full bg-white/10" />
          </div>
          <Skeleton className="h-3 w-full bg-white/10" />
          <div className="flex gap-1.5 mt-1">
            <Skeleton className="h-5 w-14 rounded-full bg-white/10" />
            <Skeleton className="h-5 w-12 rounded-full bg-white/10" />
          </div>
        </div>
        <Skeleton className="h-12 w-12 rounded-xl bg-white/10" />
      </div>
    ))}
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

  // Subscribe to real-time presence updates
  useEffect(() => {
    const unsubscribe = peerPresenceService.subscribeToAvailability((updatedSupporter, eventType) => {
      if (excludeUserId && updatedSupporter.user_id === excludeUserId) return;

      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      debounceTimerRef.current = setTimeout(() => {
        queryClient.setQueryData<PeerSupporter[]>(['available-supporters', excludeUserId], (old) => {
          if (!old) return old;

          if (eventType === 'DELETE') {
            return old.filter(s => s.id !== updatedSupporter.id);
          }

          if (eventType === 'INSERT') {
            if (updatedSupporter.is_available && updatedSupporter.is_active) {
              return [...old, updatedSupporter];
            }
            return old;
          }

          // UPDATE event
          if (updatedSupporter.is_available && updatedSupporter.is_active) {
            const exists = old.find(s => s.id === updatedSupporter.id);
            if (exists) {
              return old.map(s => s.id === updatedSupporter.id ? updatedSupporter : s);
            }
            return [...old, updatedSupporter];
          } else {
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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <Skeleton className="h-4 w-32 bg-white/10" />
          </div>
          <Skeleton className="h-11 w-20 bg-white/10 rounded-lg" />
        </div>
        <SupporterListSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-12 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-red-500/10 flex items-center justify-center">
          <Users className="w-8 h-8 text-red-400" />
        </div>
        <h3 className="font-semibold text-white mb-2">Failed to load supporters</h3>
        <p className="text-sm text-white/60 max-w-xs mx-auto mb-4">
          Something went wrong. Please try again.
        </p>
        <Button
          variant="outline"
          onClick={() => refetch()}
          className="gap-2 text-white border-white/20 hover:bg-white/10 h-12 touch-manipulation active:scale-[0.98]"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </Button>
      </div>
    );
  }

  if (supporters.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-purple-500/10 flex items-center justify-center">
          <Users className="w-8 h-8 text-purple-400/50" />
        </div>
        <h3 className="font-semibold text-white mb-2">No one available right now</h3>
        <p className="text-sm text-white/60 max-w-xs mx-auto mb-4">
          All our Mental Health Mates are currently offline. Check back later or consider
          becoming a supporter yourself!
        </p>
        <Button
          variant="ghost"
          onClick={() => refetch()}
          className="gap-2 text-white hover:text-white h-12 touch-manipulation active:scale-[0.98]"
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
      <div className="flex items-center justify-between">
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
          className="h-11 gap-1.5 text-white/60 hover:text-white touch-manipulation active:scale-[0.98] transition-all"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </Button>
      </div>

      {/* Vertical List */}
      <div className="space-y-3">
        {supporters.map((supporter) => (
          <SupporterListItem
            key={supporter.id}
            supporter={supporter}
            onConnect={onConnect}
            onViewProfile={onViewProfile}
            isConnecting={connectingId === supporter.id}
          />
        ))}
      </div>
    </div>
  );
};

export default AvailableSupporters;
