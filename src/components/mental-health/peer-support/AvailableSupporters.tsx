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
        <p className="text-white/80 text-sm">Finding available supporters...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="bg-red-500/10 border-red-500/30">
        <CardContent className="py-8 text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <Button variant="outline" onClick={loadSupporters} className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (supporters.length === 0) {
    return (
      <Card className="bg-white/[0.02] border-white/10">
        <CardContent className="py-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-500/10 flex items-center justify-center">
            <Users className="w-8 h-8 text-purple-400/50" />
          </div>
          <h3 className="font-semibold text-white mb-2">No one available right now</h3>
          <p className="text-sm text-white/80 max-w-xs mx-auto">
            All our Mental Health Mates are currently offline. Check back later or consider
            becoming a supporter yourself!
          </p>
          <Button
            variant="ghost"
            onClick={loadSupporters}
            className="mt-4 gap-2 text-white/80 hover:text-white"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
        </CardContent>
      </Card>
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
          <h3 className="text-sm font-medium text-white/70">
            Available Now ({supporters.length})
          </h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={loadSupporters}
          className="gap-1.5 text-white/70 hover:text-white"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Refresh
        </Button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {supporters.map((supporter) => (
          <SupporterCard
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
