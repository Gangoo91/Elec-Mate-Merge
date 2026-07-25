import React, { useEffect, useRef } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import SupporterListItem from './SupporterListItem';
import { PeerSupporter, peerPresenceService } from '@/services/peerSupportService';
import { useAvailableSupporters } from '@/hooks/usePeerChat';
import { useQueryClient } from '@tanstack/react-query';
import { SectionHeader, ListCard, EmptyState, TextAction } from '@/components/college/primitives';

interface AvailableSupportersProps {
  onConnect: (supporterId: string) => void;
  onViewProfile?: (supporter: PeerSupporter) => void;
  connectingId?: string | null;
  excludeUserId?: string;
}

const SupporterListSkeleton = () => (
  <ListCard>
    {[1, 2, 3].map((i) => (
      <div key={i} className="flex items-start gap-4 px-5 sm:px-6 py-5">
        <Skeleton className="h-12 w-12 rounded-full bg-white/[0.06] shrink-0" />
        <div className="flex-1 space-y-2 pt-1">
          <Skeleton className="h-4 w-32 bg-white/[0.06]" />
          <Skeleton className="h-3 w-full max-w-[260px] bg-white/[0.06]" />
          <div className="flex gap-1.5">
            <Skeleton className="h-5 w-16 rounded-full bg-white/[0.06]" />
            <Skeleton className="h-5 w-12 rounded-full bg-white/[0.06]" />
          </div>
        </div>
        <Skeleton className="h-9 w-16 rounded-full bg-white/[0.06] shrink-0 self-center" />
      </div>
    ))}
  </ListCard>
);

const AvailableSupporters: React.FC<AvailableSupportersProps> = ({
  onConnect,
  onViewProfile,
  connectingId,
  excludeUserId,
}) => {
  const queryClient = useQueryClient();
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const {
    data: supporters = [],
    isLoading,
    isError,
    refetch,
  } = useAvailableSupporters(excludeUserId);

  useEffect(() => {
    const unsubscribe = peerPresenceService.subscribeToAvailability(
      (updatedSupporter, eventType) => {
        if (excludeUserId && updatedSupporter.user_id === excludeUserId) return;

        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current);
        }

        debounceTimerRef.current = setTimeout(() => {
          queryClient.setQueryData<PeerSupporter[]>(
            ['available-supporters', excludeUserId],
            (old) => {
              if (!old) return old;
              if (eventType === 'DELETE') {
                return old.filter((s) => s.id !== updatedSupporter.id);
              }
              if (eventType === 'INSERT') {
                if (updatedSupporter.is_available && updatedSupporter.is_active) {
                  return [...old, updatedSupporter];
                }
                return old;
              }
              if (updatedSupporter.is_available && updatedSupporter.is_active) {
                const exists = old.find((s) => s.id === updatedSupporter.id);
                if (exists) {
                  return old.map((s) => (s.id === updatedSupporter.id ? updatedSupporter : s));
                }
                return [...old, updatedSupporter];
              } else {
                return old.filter((s) => s.id !== updatedSupporter.id);
              }
            }
          );
        }, 200);
      }
    );

    return () => {
      unsubscribe();
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [excludeUserId, queryClient]);

  if (isLoading) {
    return (
      <section className="space-y-5">
        <SectionHeader eyebrow="Available now" title="Mental Health Mates online" />
        <SupporterListSkeleton />
      </section>
    );
  }

  if (isError) {
    return (
      <section className="space-y-5">
        <SectionHeader eyebrow="Available now" title="Mental Health Mates online" />
        <EmptyState
          title="Couldn't load supporters"
          description="Something went wrong on our side. Try again in a moment."
          action="Try again"
          onAction={() => refetch()}
        />
      </section>
    );
  }

  if (supporters.length === 0) {
    return (
      <section className="space-y-5">
        <SectionHeader eyebrow="Available now" title="Mental Health Mates online" />
        <EmptyState
          title="No one available right now"
          description="All Mental Health Mates are offline. Check back later — or set up your own profile and help someone else."
          action="Refresh"
          onAction={() => refetch()}
        />
        {/* Never a dead end — the 24/7 lines are always open */}
        <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
          <p className="text-[12.5px] text-white/85 leading-relaxed mb-3">
            Don't want to wait? These are free, confidential and open all night.
          </p>
          <div className="flex flex-wrap gap-2">
            <a
              href="tel:116123"
              className="inline-flex items-center gap-1.5 h-11 px-4 rounded-full bg-elec-yellow/15 border border-elec-yellow/25 text-elec-yellow text-[13px] font-semibold touch-manipulation active:scale-[0.98]"
            >
              Call Samaritans 116 123
            </a>
            <a
              href="sms:85258?body=SHOUT"
              className="inline-flex items-center gap-1.5 h-11 px-4 rounded-full bg-white/[0.06] border border-white/[0.12] text-white text-[13px] font-medium touch-manipulation active:scale-[0.98]"
            >
              Text SHOUT to 85258
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-5">
      <div className="flex items-end justify-between gap-4">
        <SectionHeader
          eyebrow={`Available now · ${supporters.length}`}
          title="Mental Health Mates online"
        />
        <TextAction onClick={() => refetch()}>Refresh →</TextAction>
      </div>
      <ListCard>
        {supporters.map((supporter) => (
          <SupporterListItem
            key={supporter.id}
            supporter={supporter}
            onConnect={onConnect}
            onViewProfile={onViewProfile}
            isConnecting={connectingId === supporter.id}
          />
        ))}
      </ListCard>
    </section>
  );
};

export default AvailableSupporters;
