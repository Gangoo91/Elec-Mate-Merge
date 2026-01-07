import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Users, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SupporterCard from './SupporterCard';
import { PeerSupporter, peerSupporterService, peerPresenceService } from '@/services/peerSupportService';

interface AvailableSupportersProps {
  onConnect: (supporterId: string) => void;
  onViewProfile?: (supporter: PeerSupporter) => void;
  connectingId?: string | null;
  excludeUserId?: string;
}

const AvailableSupporters: React.FC<AvailableSupportersProps> = ({
  onConnect,
  onViewProfile,
  connectingId,
  excludeUserId,
}) => {
  const [supporters, setSupporters] = useState<PeerSupporter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadSupporters = async () => {
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
  };

  useEffect(() => {
    loadSupporters();

    // Subscribe to real-time updates
    const unsubscribe = peerPresenceService.subscribeToAvailability((updated) => {
      const filtered = excludeUserId
        ? updated.filter(s => s.user_id !== excludeUserId)
        : updated;
      setSupporters(filtered);
    });

    return unsubscribe;
  }, [excludeUserId]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Loader2 className="w-8 h-8 text-purple-400 animate-spin mb-3" />
        <p className="text-white text-sm">Finding available supporters...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 text-center px-4">
        <p className="text-red-400 mb-4">{error}</p>
        <Button variant="outline" onClick={loadSupporters} className="gap-2 text-white border-white/20 hover:bg-white/10">
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
          className="mt-4 gap-2 text-white hover:text-white"
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
          size="sm"
          onClick={loadSupporters}
          className="gap-1.5 text-white hover:text-white"
        >
          <RefreshCw className="w-3.5 h-3.5" />
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
